import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import { query, initDb } from './db.js';

const SESSION_COOKIE_NAME = 'cs_admin_session';
const SESSION_DURATION_DAYS = 7;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

/**
 * Robust RFC 6265 cookie serialization
 */
export function serializeCookie(name, val, options = {}) {
  let str = `${name}=${encodeURIComponent(val)}`;
  if (options.maxAge != null) {
    str += `; Max-Age=${Math.floor(options.maxAge)}`;
  }
  if (options.domain) {
    str += `; Domain=${options.domain}`;
  }
  if (options.path) {
    str += `; Path=${options.path}`;
  }
  if (options.expires) {
    str += `; Expires=${options.expires.toUTCString()}`;
  }
  if (options.httpOnly) {
    str += '; HttpOnly';
  }
  if (options.secure) {
    str += '; Secure';
  }
  if (options.sameSite) {
    const sameSite = typeof options.sameSite === 'string' ? options.sameSite.toLowerCase() : options.sameSite;
    switch (sameSite) {
      case true:
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
    }
  }
  return str;
}

/**
 * Robust RFC 6265 cookie parser
 */
export function parseCookies(cookieHeader) {
  const out = {};
  if (!cookieHeader) return out;
  const pairs = cookieHeader.split(';');
  for (const pair of pairs) {
    const idx = pair.indexOf('=');
    if (idx < 0) continue;
    const key = pair.substring(0, idx).trim();
    const val = pair.substring(idx + 1).trim();
    try {
      out[key] = decodeURIComponent(val);
    } catch {
      out[key] = val;
    }
  }
  return out;
}

/**
 * Extract client IP address reliably from request headers or socket
 */
export function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || '127.0.0.1';
}

/**
 * Check if the given IP address is currently locked out due to excessive failed attempts
 */
export async function checkRateLimit(ip) {
  await initDb();
  const windowTime = new Date(Date.now() - LOCKOUT_MINUTES * 60 * 1000).toISOString();

  // Count failed attempts within lockout window
  const res = await query(
    'SELECT COUNT(*) as count FROM login_attempts WHERE ip_address = $1 AND success = 0 AND attempt_time > $2',
    [ip, windowTime]
  );

  const count = parseInt(res.rows[0]?.count || '0', 10);
  if (count >= MAX_LOGIN_ATTEMPTS) {
    return {
      locked: true,
      remainingMinutes: LOCKOUT_MINUTES,
      message: `Too many failed attempts. Temporary lockout for ${LOCKOUT_MINUTES} minutes.`
    };
  }

  return { locked: false, remainingAttempts: MAX_LOGIN_ATTEMPTS - count };
}

/**
 * Record a login attempt
 */
export async function recordLoginAttempt(ip, success) {
  await initDb();
  const id = 'att_' + crypto.randomBytes(12).toString('hex');
  await query(
    'INSERT INTO login_attempts (id, ip_address, attempt_time, success) VALUES ($1, $2, CURRENT_TIMESTAMP, $3)',
    [id, ip, success ? 1 : 0]
  );

  if (success) {
    // Clear recent failed attempts for this IP after successful login
    await query('DELETE FROM login_attempts WHERE ip_address = $1 AND success = 0', [ip]);
  }
}

/**
 * Authenticate administrator with username and password
 */
export async function authenticateAdmin(username, password, req) {
  await initDb();
  const cleanUsername = (username || '').trim().toLowerCase();
  const ip = getClientIp(req);

  // Check rate limit
  const rateLimit = await checkRateLimit(ip);
  if (rateLimit.locked) {
    return { success: false, rateLimited: true, error: rateLimit.message };
  }

  const res = await query('SELECT * FROM admin_users WHERE username = $1 LIMIT 1', [cleanUsername]);
  const user = res.rows[0];

  if (!user) {
    await recordLoginAttempt(ip, false);
    return { success: false, error: 'Invalid administrator credentials.' };
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch) {
    await recordLoginAttempt(ip, false);
    return { success: false, error: 'Invalid administrator credentials.' };
  }

  // Record successful login
  await recordLoginAttempt(ip, true);

  // Update last_login_at
  await query('UPDATE admin_users SET last_login_at = CURRENT_TIMESTAMP WHERE id = $1', [user.id]);

  // Create session
  const sessionId = 'cs_sess_' + crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const userAgent = req.headers['user-agent'] || 'Unknown';

  await query(
    'INSERT INTO admin_sessions (id, admin_id, username, ip_address, user_agent, created_at, expires_at) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, $6)',
    [sessionId, user.id, user.username, ip, userAgent, expiresAt]
  );

  // Serialize HTTP-only cookie
  const isProd = process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL);
  const cookieHeader = serializeCookie(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION_DAYS * 24 * 60 * 60
  });

  return {
    success: true,
    user: {
      id: user.id,
      username: user.username,
      lastLoginAt: user.last_login_at
    },
    cookieHeader
  };
}

/**
 * Validate current session from request cookies
 */
export async function getSession(req) {
  await initDb();
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;

  const cookies = parseCookies(cookieHeader);
  const sessionId = cookies[SESSION_COOKIE_NAME];
  if (!sessionId) return null;

  const res = await query('SELECT * FROM admin_sessions WHERE id = $1 LIMIT 1', [sessionId]);
  const session = res.rows[0];
  if (!session) return null;

  // Check expiration
  const now = new Date();
  const expiresAt = new Date(session.expires_at);
  if (expiresAt < now) {
    // Delete expired session
    await query('DELETE FROM admin_sessions WHERE id = $1', [sessionId]);
    return null;
  }

  return {
    sessionId: session.id,
    adminId: session.admin_id,
    username: session.username,
    createdAt: session.created_at,
    expiresAt: session.expires_at
  };
}

/**
 * Destroy active session (logout)
 */
export async function destroySession(req) {
  const session = await getSession(req);
  if (session) {
    await query('DELETE FROM admin_sessions WHERE id = $1', [session.sessionId]);
  }

  const isProd = process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL);
  const cookieHeader = serializeCookie(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: 0
  });

  return { success: true, cookieHeader };
}

/**
 * Change administrator password
 */
export async function changePassword(adminId, currentPassword, newPassword) {
  await initDb();

  if (!newPassword || newPassword.length < 8) {
    return { success: false, error: 'New password must be at least 8 characters long.' };
  }

  const res = await query('SELECT * FROM admin_users WHERE id = $1 LIMIT 1', [adminId]);
  const user = res.rows[0];
  if (!user) {
    return { success: false, error: 'Admin account not found.' };
  }

  const matches = await bcrypt.compare(currentPassword, user.password_hash);
  if (!matches) {
    return { success: false, error: 'Current password does not match.' };
  }

  const newHash = await bcrypt.hash(newPassword, 12);
  await query('UPDATE admin_users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [
    newHash,
    adminId
  ]);

  return { success: true };
}

/**
 * CSRF validation for state-changing requests
 */
export function validateCsrf(req) {
  const method = req.method?.toUpperCase();
  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
    return true;
  }

  // Check standard anti-CSRF request header
  const customHeader = req.headers['x-requested-with'] || req.headers['x-csrf-protection'];
  if (customHeader) return true;

  // Check origin / referer header
  const origin = req.headers.origin || req.headers.referer;
  const host = req.headers.host;
  if (origin && host) {
    try {
      const originUrl = new URL(origin);
      if (originUrl.host === host) return true;
    } catch {
      // invalid URL
    }
  }

  return false;
}
