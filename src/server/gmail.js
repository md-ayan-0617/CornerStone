import crypto from 'node:crypto';
import { query, initDb } from './db.js';

const PRIMARY_AUTH_ID = 'gmail_primary';
const GMAIL_SEND_SCOPE = 'https://www.googleapis.com/auth/gmail.send';
const USERINFO_EMAIL_SCOPE = 'https://www.googleapis.com/auth/userinfo.email';

/**
 * Check if Google OAuth application credentials are set in environment
 */
export function isGmailConfigured() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  return Boolean(clientId && clientSecret && clientId.trim() && clientSecret.trim());
}

/**
 * Determine Google OAuth redirect URI
 */
export function getRedirectUri(req) {
  if (process.env.GOOGLE_REDIRECT_URI && process.env.GOOGLE_REDIRECT_URI.trim()) {
    return process.env.GOOGLE_REDIRECT_URI.trim();
  }
  const host = req?.headers?.host || 'localhost:5173';
  const proto = req?.headers?.['x-forwarded-proto'] || (host.includes('localhost') ? 'http' : 'https');
  return `${proto}://${host}/api/auth/google/callback`;
}

/**
 * Generate Google OAuth 2.0 Authorization URL
 */
export function getGoogleAuthUrl(req) {
  if (!isGmailConfigured()) {
    throw new Error('Google OAuth credentials (GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET) are not configured in environment variables.');
  }

  const clientId = process.env.GOOGLE_CLIENT_ID.trim();
  const redirectUri = getRedirectUri(req);
  const state = crypto.randomBytes(16).toString('hex');

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: `${GMAIL_SEND_SCOPE} ${USERINFO_EMAIL_SCOPE}`,
    access_type: 'offline',
    prompt: 'consent',
    state
  });

  return {
    url: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
    state
  };
}

/**
 * Exchange OAuth authorization code for tokens and persist them
 */
export async function handleOAuthCallback(code, req) {
  await initDb();

  if (!isGmailConfigured()) {
    throw new Error('Google OAuth credentials are not configured in environment variables.');
  }

  const clientId = process.env.GOOGLE_CLIENT_ID.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET.trim();
  const redirectUri = getRedirectUri(req);

  // Exchange code for tokens
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    })
  });

  const tokenData = await tokenRes.json().catch(() => ({}));
  if (!tokenRes.ok || !tokenData.access_token) {
    const errorDesc = tokenData.error_description || tokenData.error || 'Failed to exchange Google OAuth code';
    throw new Error(`Google OAuth error: ${errorDesc}`);
  }

  // Fetch authorized user's email address
  const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` }
  });
  const userInfo = await userInfoRes.json().catch(() => ({}));
  const email = userInfo.email || 'authorized_user@gmail.com';

  const expiryDate = Date.now() + (parseInt(tokenData.expires_in, 10) || 3600) * 1000;
  const refreshToken = tokenData.refresh_token || null;

  // Persist into database (upsert primary auth row)
  const existing = await query('SELECT id, refresh_token FROM gmail_auth WHERE id = $1', [PRIMARY_AUTH_ID]);

  if (existing.rows.length > 0) {
    const savedRefreshToken = refreshToken || existing.rows[0].refresh_token;
    await query(
      `UPDATE gmail_auth SET
        email = $1,
        access_token = $2,
        refresh_token = $3,
        scope = $4,
        token_type = $5,
        expiry_date = $6,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $7`,
      [
        email,
        tokenData.access_token,
        savedRefreshToken,
        tokenData.scope || `${GMAIL_SEND_SCOPE} ${USERINFO_EMAIL_SCOPE}`,
        tokenData.token_type || 'Bearer',
        expiryDate,
        PRIMARY_AUTH_ID
      ]
    );
  } else {
    await query(
      `INSERT INTO gmail_auth (
        id, email, access_token, refresh_token, scope, token_type, expiry_date, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [
        PRIMARY_AUTH_ID,
        email,
        tokenData.access_token,
        refreshToken,
        tokenData.scope || `${GMAIL_SEND_SCOPE} ${USERINFO_EMAIL_SCOPE}`,
        tokenData.token_type || 'Bearer',
        expiryDate
      ]
    );
  }

  return {
    success: true,
    email
  };
}

/**
 * Get current Gmail authorization status
 */
export async function getGmailStatus() {
  await initDb();
  const configured = isGmailConfigured();

  const res = await query('SELECT email, updated_at FROM gmail_auth WHERE id = $1 LIMIT 1', [PRIMARY_AUTH_ID]);
  const connected = res.rows.length > 0;
  const email = connected ? res.rows[0].email : null;
  const lastUpdated = connected ? res.rows[0].updated_at : null;

  return {
    configured,
    connected,
    email,
    lastUpdated
  };
}

/**
 * Disconnect/revoke authorized Gmail account
 */
export async function disconnectGmail() {
  await initDb();
  await query('DELETE FROM gmail_auth WHERE id = $1', [PRIMARY_AUTH_ID]);
  return { success: true };
}

/**
 * Retrieve a valid, fresh access token (auto-refreshing if expired)
 */
export async function getValidAccessToken() {
  await initDb();
  const res = await query('SELECT * FROM gmail_auth WHERE id = $1 LIMIT 1', [PRIMARY_AUTH_ID]);
  const auth = res.rows[0];

  if (!auth) {
    throw new Error('No Gmail account is currently authorized. Please authorize your Gmail account in the Admin Dashboard.');
  }

  const now = Date.now();
  const expiryDate = Number(auth.expiry_date);

  // If token is valid for at least 2 more minutes, reuse it
  if (expiryDate && now < expiryDate - 120000) {
    return {
      accessToken: auth.access_token,
      senderEmail: auth.email
    };
  }

  // Token is expired or expiring soon; refresh using refresh_token
  if (!auth.refresh_token) {
    throw new Error('Gmail authorization expired and no refresh token is stored. Please re-authorize your Gmail account.');
  }

  if (!isGmailConfigured()) {
    throw new Error('Cannot refresh Gmail token: GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are not set in environment.');
  }

  const clientId = process.env.GOOGLE_CLIENT_ID.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET.trim();

  const refreshRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: auth.refresh_token,
      grant_type: 'refresh_token'
    })
  });

  const refreshData = await refreshRes.json().catch(() => ({}));
  if (!refreshRes.ok || !refreshData.access_token) {
    const errorDesc = refreshData.error_description || refreshData.error || 'Failed to refresh access token';
    throw new Error(`Gmail authorization expired: ${errorDesc}. Please re-authorize in dashboard.`);
  }

  const newExpiryDate = Date.now() + (parseInt(refreshData.expires_in, 10) || 3600) * 1000;
  await query(
    'UPDATE gmail_auth SET access_token = $1, expiry_date = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3',
    [refreshData.access_token, newExpiryDate, PRIMARY_AUTH_ID]
  );

  return {
    accessToken: refreshData.access_token,
    senderEmail: auth.email
  };
}

/**
 * Format RFC 2822 email message and encode in base64url
 */
function createRawEmail({ from, to, subject, body, inReplyTo }) {
  const lines = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: =?UTF-8?B?${Buffer.from(subject).toString('base64')}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit'
  ];

  if (inReplyTo) {
    lines.push(`In-Reply-To: <${inReplyTo}>`);
    lines.push(`References: <${inReplyTo}>`);
  }

  lines.push('');
  lines.push(body);

  const rawMessage = lines.join('\r\n');
  return Buffer.from(rawMessage, 'utf-8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Send reply email through authorized Gmail account
 */
export async function sendGmailReply({ inquiryId, to, subject, messageBody, inReplyToMessageId = null }) {
  await initDb();

  // Validate fields
  if (!inquiryId) {
    return { success: false, error: 'Inquiry ID is required.' };
  }
  if (!to || !to.includes('@')) {
    return { success: false, error: 'A valid recipient email address is required.' };
  }
  if (!subject || !subject.trim()) {
    return { success: false, error: 'Email subject line cannot be empty.' };
  }
  if (!messageBody || !messageBody.trim()) {
    return { success: false, error: 'Reply message body cannot be empty.' };
  }

  // Verify inquiry exists
  const inqRes = await query('SELECT * FROM inquiries WHERE id = $1 LIMIT 1', [inquiryId]);
  const inquiry = inqRes.rows[0];
  if (!inquiry) {
    return { success: false, error: `Inquiry with ID ${inquiryId} was not found.` };
  }

  // Get valid token and authorized sender email
  let authContext;
  try {
    authContext = await getValidAccessToken();
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Gmail account not authorized. Please connect your Gmail account in the Admin Dashboard.'
    };
  }

  const { accessToken, senderEmail } = authContext;
  const replyId = 'rep_' + crypto.randomBytes(12).toString('hex');
  const cleanTo = to.trim();
  const cleanSubject = subject.trim();
  const cleanBody = messageBody.trim();

  const raw = createRawEmail({
    from: senderEmail,
    to: cleanTo,
    subject: cleanSubject,
    body: cleanBody,
    inReplyTo: inReplyToMessageId
  });

  try {
    const gmailRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ raw })
    });

    const gmailData = await gmailRes.json().catch(() => ({}));

    if (!gmailRes.ok) {
      const errDetail = gmailData?.error?.message || gmailRes.statusText || 'Google Gmail API request failed';
      // Record failed attempt in database
      await query(
        `INSERT INTO inquiry_replies (
          id, inquiry_id, sender_email, recipient_email, subject, message_body,
          gmail_message_id, gmail_thread_id, status, error_message, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP)`,
        [
          replyId,
          inquiryId,
          senderEmail,
          cleanTo,
          cleanSubject,
          cleanBody,
          null,
          null,
          'failed',
          errDetail
        ]
      );

      return {
        success: false,
        error: `Gmail API Error: ${errDetail}`
      };
    }

    // Gmail send succeeded!
    const gmailMsgId = gmailData.id || null;
    const gmailThreadId = gmailData.threadId || null;

    // Persist successful reply record in DB
    await query(
      `INSERT INTO inquiry_replies (
        id, inquiry_id, sender_email, recipient_email, subject, message_body,
        gmail_message_id, gmail_thread_id, status, error_message, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP)`,
      [
        replyId,
        inquiryId,
        senderEmail,
        cleanTo,
        cleanSubject,
        cleanBody,
        gmailMsgId,
        gmailThreadId,
        'sent',
        null
      ]
    );

    // Mark the inquiry as 'replied' in the database
    await query(
      `UPDATE inquiries SET status = 'replied', updated_at = CURRENT_TIMESTAMP WHERE id = $1`,
      [inquiryId]
    );

    return {
      success: true,
      replyId,
      gmailMessageId: gmailMsgId,
      recipient: cleanTo,
      sender: senderEmail,
      status: 'replied'
    };
  } catch (err) {
    // Record network or server failure in replies
    await query(
      `INSERT INTO inquiry_replies (
        id, inquiry_id, sender_email, recipient_email, subject, message_body,
        gmail_message_id, gmail_thread_id, status, error_message, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP)`,
      [
        replyId,
        inquiryId,
        senderEmail,
        cleanTo,
        cleanSubject,
        cleanBody,
        null,
        null,
        'failed',
        err.message || 'Network error communicating with Gmail API'
      ]
    );

    return {
      success: false,
      error: `Network transmission error: ${err.message}`
    };
  }
}

/**
 * Fetch all replies sent for a specific inquiry
 */
export async function getInquiryReplies(inquiryId) {
  await initDb();
  const res = await query(
    'SELECT * FROM inquiry_replies WHERE inquiry_id = $1 ORDER BY created_at DESC',
    [inquiryId]
  );
  return res.rows;
}
