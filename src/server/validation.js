import crypto from 'node:crypto';
import { query, initDb } from './db.js';
import { getClientIp } from './auth.js';

/**
 * Basic HTML escaping to prevent stored XSS attacks
 */
export function sanitizeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Clean and trim string
 */
export function cleanString(str, maxLength = 255) {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, maxLength);
}

/**
 * Basic email format regex validation
 */
export function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(email.trim()) && email.length <= 255;
}

/**
 * Validate Contact Form input and honeypot
 */
export async function validateContactSubmission(body, req) {
  await initDb();
  const ip = getClientIp(req);

  // 1. Honeypot check: Bots fill hidden fields
  if (body.hp_company_field || body.hp_website || body._hp_check) {
    // Silently drop spam without notifying bot
    return {
      isValid: false,
      isSpam: true,
      error: 'Form submission rejected.'
    };
  }

  // 2. Submission Rate Limiting: Max 5 submissions per IP in 10 minutes
  const tenMinsAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const recentSubmissions = await query(
    'SELECT COUNT(*) as count FROM inquiries WHERE ip_address = $1 AND created_at > $2',
    [ip, tenMinsAgo]
  );
  const count = parseInt(recentSubmissions.rows[0]?.count || '0', 10);
  if (count >= 5) {
    return {
      isValid: false,
      error: 'Too many inquiries submitted from this connection. Please wait a few minutes before submitting again.'
    };
  }

  // 3. Field Extractions and Sanitization
  const name = cleanString(body.name, 100);
  const email = cleanString(body.email, 255);
  const company = cleanString(body.company, 150);
  const phone = cleanString(body.phone, 50);
  const website = cleanString(body.website, 200);
  const budget = cleanString(body.budget, 100);
  const timeline = cleanString(body.timeline, 100);
  const details = cleanString(body.details, 3000);

  // Services array or string
  let services = '';
  if (Array.isArray(body.services)) {
    services = body.services
      .map((s) => cleanString(String(s), 100))
      .filter(Boolean)
      .slice(0, 15)
      .join(', ');
  } else if (typeof body.services === 'string') {
    services = cleanString(body.services, 500);
  }

  // 4. Required Field Validations
  if (!name || name.length < 2) {
    return { isValid: false, error: 'Please enter a valid full name (minimum 2 characters).' };
  }

  if (!email || !isValidEmail(email)) {
    return { isValid: false, error: 'Please enter a valid business email address.' };
  }

  // 5. Duplicate Submission Check (exact same email & name within 60 seconds from same IP)
  const oneMinAgo = new Date(Date.now() - 60 * 1000).toISOString();
  const duplicateCheck = await query(
    'SELECT id FROM inquiries WHERE ip_address = $1 AND email = $2 AND created_at > $3 LIMIT 1',
    [ip, email, oneMinAgo]
  );
  if (duplicateCheck.rows.length > 0) {
    return {
      isValid: false,
      error: 'A duplicate inquiry was recently received. Our systems are already processing your request.'
    };
  }

  return {
    isValid: true,
    data: {
      name,
      email,
      company: company || 'N/A',
      phone: phone || '',
      website: website || '',
      budget: budget || 'Not specified',
      timeline: timeline || 'Not specified',
      services: services || 'None specified',
      details: details || '',
      ipAddress: ip,
      userAgent: req.headers['user-agent'] || ''
    }
  };
}

/**
 * Generate unique, professional Inquiry ID
 * e.g. INQ-26-89412
 */
export function generateInquiryId() {
  const yearSuffix = new Date().getFullYear().toString().slice(-2);
  const rand = crypto.randomInt(10000, 99999);
  return `INQ-${yearSuffix}-${rand}`;
}
