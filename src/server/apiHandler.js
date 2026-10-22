import {
  authenticateAdmin,
  getSession,
  destroySession,
  changePassword,
  validateCsrf
} from './auth.js';
import { validateContactSubmission } from './validation.js';
import {
  createInquiry,
  getInquiries,
  getInquiryById,
  updateInquiry,
  deleteInquiry,
  bulkUpdateInquiries,
  exportInquiriesCsv,
  getInquiryAnalytics
} from './inquiries.js';
import {
  isGmailConfigured,
  getGoogleAuthUrl,
  handleOAuthCallback,
  getGmailStatus,
  disconnectGmail,
  sendGmailReply,
  getInquiryReplies
} from './gmail.js';

/**
 * Helper to read JSON request body
 */
async function parseBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      // Protect against overly large payloads (max 1MB)
      if (raw.length > 1e6) {
        req.destroy();
        resolve({});
      }
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

/**
 * Helper to send JSON response
 */
function sendJson(res, statusCode, data, headers = {}) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  for (const [k, v] of Object.entries(headers)) {
    if (v) res.setHeader(k, v);
  }
  res.end(JSON.stringify(data));
}

/**
 * Helper to send text/csv or other raw content
 */
function sendRaw(res, statusCode, body, contentType, headers = {}) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', contentType);
  for (const [k, v] of Object.entries(headers)) {
    if (v) res.setHeader(k, v);
  }
  res.end(body);
}

/**
 * Main API Request Dispatcher
 */
export async function handleApiRequest(req, res) {
  // CORS & Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, X-CSRF-Protection');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.end();
    return;
  }

  const host = req.headers.host || 'localhost';
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const parsed = new URL(req.url, `${protocol}://${host}`);

  let pathname = parsed.pathname.replace(/\/+$/, '') || '/';

  // Only rewrite pathname if it's the root /api or /api/index and __vpath was passed by rewrite
  const queryParamVpath = parsed.searchParams.get('__vpath');
  if (queryParamVpath && (pathname === '/api' || pathname === '/api/index')) {
    pathname = `/api/${String(queryParamVpath).replace(/^\/+/, '')}`;
  } else if (req.headers['x-matched-path'] && req.headers['x-matched-path'].startsWith('/api')) {
    pathname = req.headers['x-matched-path'];
  }

  pathname = pathname.replace(/\/+$/, '') || '/';

  const query = Object.fromEntries(parsed.searchParams.entries());
  delete query.__vpath;
  const method = (req.method || 'GET').toUpperCase();

  try {
    // -------------------------------------------------------------------------
    // 1. PUBLIC: POST /api/contact (Contact Form Submission)
    // -------------------------------------------------------------------------
    if (pathname === '/api/contact' && method === 'POST') {
      const body = await parseBody(req);
      const validation = await validateContactSubmission(body, req);

      if (!validation.isValid) {
        if (validation.isSpam) {
          // Fake success for bots caught in honeypot
          return sendJson(res, 200, {
            success: true,
            inquiryId: 'INQ-ACK-99999',
            message: 'Inquiry received successfully.'
          });
        }
        return sendJson(res, 400, {
          success: false,
          error: validation.error || 'Invalid form submission.'
        });
      }

      const result = await createInquiry(validation.data);
      return sendJson(res, 201, {
        success: true,
        inquiryId: result.inquiryId,
        message: 'Your inquiry has been successfully received by our systems desk.'
      });
    }

    // -------------------------------------------------------------------------
    // 2. AUTH: POST /api/auth/login
    // -------------------------------------------------------------------------
    if (pathname === '/api/auth/login' && method === 'POST') {
      const body = await parseBody(req);
      const { username, password } = body;

      if (!username || !password) {
        return sendJson(res, 400, {
          success: false,
          error: 'Please provide both username and password.'
        });
      }

      const authResult = await authenticateAdmin(username, password, req);
      if (!authResult.success) {
        const status = authResult.rateLimited ? 429 : 401;
        return sendJson(res, status, {
          success: false,
          error: authResult.error
        });
      }

      return sendJson(
        res,
        200,
        {
          success: true,
          user: authResult.user
        },
        { 'Set-Cookie': authResult.cookieHeader }
      );
    }

    // -------------------------------------------------------------------------
    // 3. AUTH: POST /api/auth/logout
    // -------------------------------------------------------------------------
    if (pathname === '/api/auth/logout' && method === 'POST') {
      const logoutResult = await destroySession(req);
      return sendJson(
        res,
        200,
        { success: true, message: 'Logged out successfully.' },
        { 'Set-Cookie': logoutResult.cookieHeader }
      );
    }

    // -------------------------------------------------------------------------
    // 4. AUTH: GET /api/auth/me
    // -------------------------------------------------------------------------
    if (pathname === '/api/auth/me' && method === 'GET') {
      const session = await getSession(req);
      if (!session) {
        return sendJson(res, 200, { authenticated: false });
      }
      return sendJson(res, 200, {
        authenticated: true,
        user: {
          adminId: session.adminId,
          username: session.username
        }
      });
    }

    // -------------------------------------------------------------------------
    // 4b. GOOGLE OAUTH CALLBACK: GET /api/auth/google/callback
    // -------------------------------------------------------------------------
    if (pathname === '/api/auth/google/callback' && method === 'GET') {
      const code = query.code;
      const oauthError = query.error;

      if (oauthError || !code) {
        const errorMsg = encodeURIComponent(oauthError || 'Access authorization was declined.');
        res.statusCode = 302;
        res.setHeader('Location', `/admin/9827988375?gmail_error=${errorMsg}`);
        res.end();
        return;
      }

      try {
        const result = await handleOAuthCallback(code, req);
        const emailParam = encodeURIComponent(result.email || '');
        res.statusCode = 302;
        res.setHeader('Location', `/admin/9827988375?gmail_connected=true&email=${emailParam}`);
        res.end();
        return;
      } catch (err) {
        console.error('[Google OAuth Callback Error]', err);
        const errorMsg = encodeURIComponent(err.message || 'Failed to exchange authorization tokens.');
        res.statusCode = 302;
        res.setHeader('Location', `/admin/9827988375?gmail_error=${errorMsg}`);
        res.end();
        return;
      }
    }

    // =========================================================================
    // PROTECTED ADMIN ENDPOINTS — Require valid session
    // =========================================================================
    const session = await getSession(req);
    if (!session) {
      return sendJson(res, 401, {
        success: false,
        error: 'Unauthorized: Administrator session required.'
      });
    }

    // State-changing requests must pass CSRF validation
    if (['POST', 'PATCH', 'DELETE'].includes(method) && !validateCsrf(req)) {
      return sendJson(res, 403, {
        success: false,
        error: 'Forbidden: CSRF verification failed.'
      });
    }

    // -------------------------------------------------------------------------
    // 5. AUTH: POST /api/auth/change-password
    // -------------------------------------------------------------------------
    if (pathname === '/api/auth/change-password' && method === 'POST') {
      const body = await parseBody(req);
      const { currentPassword, newPassword } = body;

      const result = await changePassword(session.adminId, currentPassword, newPassword);
      if (!result.success) {
        return sendJson(res, 400, { success: false, error: result.error });
      }
      return sendJson(res, 200, { success: true, message: 'Password updated successfully.' });
    }

    // -------------------------------------------------------------------------
    // 6. INQUIRIES: GET /api/inquiries/analytics
    // -------------------------------------------------------------------------
    if (pathname === '/api/inquiries/analytics' && method === 'GET') {
      const analytics = await getInquiryAnalytics();
      return sendJson(res, 200, { success: true, analytics });
    }

    // -------------------------------------------------------------------------
    // 7. INQUIRIES: GET /api/inquiries/export (CSV Download)
    // -------------------------------------------------------------------------
    if (pathname === '/api/inquiries/export' && method === 'GET') {
      const status = query.status || 'all';
      const csvContent = await exportInquiriesCsv(status);
      const dateStr = new Date().toISOString().slice(0, 10);
      return sendRaw(
        res,
        200,
        csvContent,
        'text/csv; charset=utf-8',
        {
          'Content-Disposition': `attachment; filename="cornerstone-inquiries-${status}-${dateStr}.csv"`
        }
      );
    }

    // -------------------------------------------------------------------------
    // 8. INQUIRIES: POST /api/inquiries/bulk
    // -------------------------------------------------------------------------
    if (pathname === '/api/inquiries/bulk' && method === 'POST') {
      const body = await parseBody(req);
      const { ids, action } = body;
      const result = await bulkUpdateInquiries(ids, action);
      if (!result.success) {
        return sendJson(res, 400, { success: false, error: result.error });
      }
      return sendJson(res, 200, { success: true, count: result.count });
    }

    // -------------------------------------------------------------------------
    // 9. INQUIRIES: GET /api/inquiries (List with filters & pagination)
    // -------------------------------------------------------------------------
    if (pathname === '/api/inquiries' && method === 'GET') {
      const data = await getInquiries({
        status: query.status || 'all',
        search: query.search || '',
        dateRange: query.dateRange || 'all',
        sortBy: query.sortBy || 'created_at',
        sortOrder: query.sortOrder || 'desc',
        page: query.page || 1,
        limit: query.limit || 15
      });
      return sendJson(res, 200, { success: true, ...data });
    }

    // -------------------------------------------------------------------------
    // 10. INQUIRIES: Routes matching /api/inquiries/:id
    // -------------------------------------------------------------------------
    const inquiryIdMatch = pathname.match(/^\/api\/inquiries\/([^/]+)$/);
    if (inquiryIdMatch) {
      const inquiryId = decodeURIComponent(inquiryIdMatch[1]);

      if (method === 'GET') {
        const inquiry = await getInquiryById(inquiryId);
        if (!inquiry) {
          return sendJson(res, 404, { success: false, error: 'Inquiry not found.' });
        }
        return sendJson(res, 200, { success: true, inquiry });
      }

      if (method === 'PATCH') {
        const body = await parseBody(req);
        const result = await updateInquiry(inquiryId, body);
        if (!result.success) {
          return sendJson(res, 400, { success: false, error: result.error });
        }
        const updated = await getInquiryById(inquiryId);
        return sendJson(res, 200, { success: true, inquiry: updated });
      }

      if (method === 'DELETE') {
        const permanent = query.permanent === 'true';
        await deleteInquiry(inquiryId, permanent);
        return sendJson(res, 200, {
          success: true,
          message: permanent ? 'Inquiry permanently deleted.' : 'Inquiry moved to trash.'
        });
      }
    }

    // -------------------------------------------------------------------------
    // 11. GMAIL INTEGRATION: GET /api/gmail/status
    // -------------------------------------------------------------------------
    if (pathname === '/api/gmail/status' && method === 'GET') {
      const status = await getGmailStatus();
      return sendJson(res, 200, { success: true, ...status });
    }

    // -------------------------------------------------------------------------
    // 12. GMAIL INTEGRATION: GET /api/gmail/auth-url
    // -------------------------------------------------------------------------
    if (pathname === '/api/gmail/auth-url' && method === 'GET') {
      try {
        const auth = getGoogleAuthUrl(req);
        return sendJson(res, 200, { success: true, url: auth.url });
      } catch (err) {
        return sendJson(res, 400, { success: false, error: err.message });
      }
    }

    // -------------------------------------------------------------------------
    // 13. GMAIL INTEGRATION: POST /api/gmail/disconnect
    // -------------------------------------------------------------------------
    if (pathname === '/api/gmail/disconnect' && method === 'POST') {
      await disconnectGmail();
      return sendJson(res, 200, { success: true, message: 'Authorized Gmail account disconnected successfully.' });
    }

    // -------------------------------------------------------------------------
    // 14. INQUIRY REPLIES: Routes matching /api/inquiries/:id/reply or /api/inquiries/:id/replies
    // -------------------------------------------------------------------------
    const replyMatch = pathname.match(/^\/api\/inquiries\/([^/]+)\/reply$/);
    if (replyMatch && method === 'POST') {
      const inquiryId = decodeURIComponent(replyMatch[1]);
      const body = await parseBody(req);
      const result = await sendGmailReply({
        inquiryId,
        to: body.to,
        subject: body.subject,
        messageBody: body.messageBody || body.message,
        inReplyToMessageId: body.inReplyToMessageId
      });

      if (!result.success) {
        return sendJson(res, 400, { success: false, error: result.error });
      }

      return sendJson(res, 200, {
        success: true,
        message: 'Reply sent successfully via authorized Gmail account.',
        ...result
      });
    }

    const repliesMatch = pathname.match(/^\/api\/inquiries\/([^/]+)\/replies$/);
    if (repliesMatch && method === 'GET') {
      const inquiryId = decodeURIComponent(repliesMatch[1]);
      const replies = await getInquiryReplies(inquiryId);
      return sendJson(res, 200, { success: true, replies });
    }

    // 404 for unknown API endpoints
    return sendJson(res, 404, {
      success: false,
      error: `API route not found: ${method} ${pathname}`
    });
  } catch (err) {
    console.error('[CornerStone API Error]', err);
    // Generic production error message - never leak stack traces
    return sendJson(res, 500, {
      success: false,
      error: 'An internal server error occurred. Please try again later.'
    });
  }
}
