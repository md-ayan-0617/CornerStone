import http from 'node:http';
import { handleApiRequest } from '../src/server/apiHandler.js';
import { initDb, query } from '../src/server/db.js';

let server;
const PORT = 48291;
const BASE_URL = `http://localhost:${PORT}`;

function startTestServer() {
  return new Promise((resolve) => {
    server = http.createServer(async (req, res) => {
      await handleApiRequest(req, res);
    });
    server.listen(PORT, () => {
      resolve();
    });
  });
}

function stopTestServer() {
  return new Promise((resolve) => {
    server.close(() => resolve());
  });
}

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    ...(options.headers || {})
  };

  const res = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const contentType = res.headers.get('content-type') || '';
  let data;
  if (contentType.includes('application/json')) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  // Extract set-cookie if any
  const cookieHeader = res.headers.get('set-cookie');

  return {
    status: res.status,
    headers: res.headers,
    data,
    cookie: cookieHeader ? cookieHeader.split(';')[0] : null
  };
}

async function runTests() {
  console.log('--- STARTING CORNERSTONE END-TO-END TEST SUITE ---');
  await initDb();
  await startTestServer();

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`✓ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`✗ FAIL: ${testName}`);
      failed++;
    }
  }

  try {
    // -------------------------------------------------------------------------
    // TEST 1: Public Contact Submission (Valid)
    // -------------------------------------------------------------------------
    const contactPayload = {
      name: 'Elena Rostova',
      company: 'Rostova Capital',
      email: 'elena@rostovacapital.com',
      phone: '+1 (555) 234-5678',
      website: 'https://rostovacapital.com',
      budget: '$35,000 — $75,000',
      timeline: 'Next 30–60 Days',
      services: ['AI Receptionist & Voice Assistant', 'Business Websites'],
      details: 'We require an enterprise AI voice receptionist system integrated with our website and scheduling desk.',
      hp_company_field: '' // empty honeypot
    };

    const res1 = await request('/api/contact', {
      method: 'POST',
      body: contactPayload
    });

    assert(res1.status === 201, 'Contact submission returns HTTP 201');
    assert(res1.data.success === true, 'Contact submission returns success: true');
    assert(Boolean(res1.data.inquiryId), `Generated Inquiry ID: ${res1.data.inquiryId}`);

    const createdInquiryId = res1.data.inquiryId;

    // Verify DB persistence directly
    const dbCheck = await query('SELECT * FROM inquiries WHERE id = $1', [createdInquiryId]);
    assert(dbCheck.rows.length === 1, 'Inquiry successfully committed to database');
    assert(dbCheck.rows[0].email === 'elena@rostovacapital.com', 'Database stored correct email address');
    assert(dbCheck.rows[0].status === 'new', 'Initial inquiry status is "new"');

    // -------------------------------------------------------------------------
    // TEST 2: Contact Form Validation (Missing / Invalid Email)
    // -------------------------------------------------------------------------
    const invalidPayload = {
      name: 'Invalid Test',
      email: 'not-an-email',
      company: 'Bad Corp'
    };
    const res2 = await request('/api/contact', {
      method: 'POST',
      body: invalidPayload
    });
    assert(res2.status === 400, 'Invalid email rejected with HTTP 400');
    assert(res2.data.success === false, 'Invalid submission returns success: false');

    // -------------------------------------------------------------------------
    // TEST 3: Honeypot Anti-Spam Protection
    // -------------------------------------------------------------------------
    const spamPayload = {
      name: 'Bot Spammer',
      email: 'spammer@botnet.ru',
      company: 'Spam Corp',
      hp_company_field: 'I am a bot filling hidden fields'
    };
    const res3 = await request('/api/contact', {
      method: 'POST',
      body: spamPayload
    });
    assert(res3.status === 200, 'Honeypot returns 200 to fool bot');
    const spamDbCheck = await query('SELECT * FROM inquiries WHERE email = $1', ['spammer@botnet.ru']);
    assert(spamDbCheck.rows.length === 0, 'Spam submission dropped and not persisted in database');

    // -------------------------------------------------------------------------
    // TEST 4: Protected API Rejects Unauthenticated Request
    // -------------------------------------------------------------------------
    const res4 = await request('/api/inquiries');
    assert(res4.status === 401, 'Protected /api/inquiries returns HTTP 401 when unauthenticated');

    // -------------------------------------------------------------------------
    // TEST 5: Admin Login with Invalid Password
    // -------------------------------------------------------------------------
    const res5 = await request('/api/auth/login', {
      method: 'POST',
      body: { username: 'ayanmd0617', password: 'WrongPassword999!' }
    });
    assert(res5.status === 401, 'Invalid credentials rejected with HTTP 401');
    assert(res5.data.error === 'Invalid administrator credentials.', 'Generic authentication error returned');

    // -------------------------------------------------------------------------
    // TEST 6: Admin Login with Valid Credentials
    // -------------------------------------------------------------------------
    const res6 = await request('/api/auth/login', {
      method: 'POST',
      body: { username: 'ayanmd0617', password: 'takshhskat' }
    });
    assert(res6.status === 200, 'Admin login succeeded with HTTP 200');
    assert(Boolean(res6.cookie), 'Admin login returned session cookie');
    const sessionCookie = res6.cookie;

    // -------------------------------------------------------------------------
    // TEST 7: Auth Check (/api/auth/me) with Session Cookie
    // -------------------------------------------------------------------------
    const res7 = await request('/api/auth/me', {
      headers: { Cookie: sessionCookie }
    });
    assert(res7.status === 200, '/api/auth/me returns HTTP 200');
    assert(res7.data.authenticated === true, 'Session successfully verified');
    assert(res7.data.user.username === 'ayanmd0617', 'Returned correct admin user');

    // -------------------------------------------------------------------------
    // TEST 8: List Inquiries with Session Cookie
    // -------------------------------------------------------------------------
    const res8 = await request('/api/inquiries?status=all', {
      headers: { Cookie: sessionCookie }
    });
    assert(res8.status === 200, 'Authenticated /api/inquiries returns HTTP 200');
    assert(res8.data.inquiries.length >= 1, `Retrieved ${res8.data.inquiries.length} inquiries from database`);
    assert(typeof res8.data.counts.total === 'number', `Real database counts total: ${res8.data.counts.total}`);

    // -------------------------------------------------------------------------
    // TEST 9: Inspect Single Inquiry & Auto Mark As Read
    // -------------------------------------------------------------------------
    const res9 = await request(`/api/inquiries/${createdInquiryId}`, {
      headers: { Cookie: sessionCookie }
    });
    assert(res9.status === 200, `Fetched single inquiry ${createdInquiryId}`);
    assert(res9.data.inquiry.name === 'Elena Rostova', 'Retrieved exact inquiry details');
    assert(res9.data.inquiry.is_read === true, 'Inquiry automatically marked read upon inspection');

    // -------------------------------------------------------------------------
    // TEST 10: Update Inquiry Status & Save Confidential Notes
    // -------------------------------------------------------------------------
    const res10 = await request(`/api/inquiries/${createdInquiryId}`, {
      method: 'PATCH',
      headers: { Cookie: sessionCookie },
      body: {
        status: 'in_progress',
        internal_notes: 'Spoke with Elena Rostova. Project kickoff scheduled for Monday.'
      }
    });
    assert(res10.status === 200, 'Inquiry status & internal notes updated');

    const dbCheckUpdated = await query('SELECT status, internal_notes FROM inquiries WHERE id = $1', [
      createdInquiryId
    ]);
    assert(dbCheckUpdated.rows[0].status === 'in_progress', 'Status updated to in_progress in DB');
    assert(
      dbCheckUpdated.rows[0].internal_notes.includes('Spoke with Elena'),
      'Confidential notes persisted in DB'
    );

    // -------------------------------------------------------------------------
    // TEST 11: Analytics Endpoint
    // -------------------------------------------------------------------------
    const res11 = await request('/api/inquiries/analytics', {
      headers: { Cookie: sessionCookie }
    });
    assert(res11.status === 200, 'Analytics endpoint returns HTTP 200');
    assert(Array.isArray(res11.data.analytics.dailyTrends), 'Daily trends array returned');

    // -------------------------------------------------------------------------
    // TEST 12: CSV Export
    // -------------------------------------------------------------------------
    const res12 = await request('/api/inquiries/export?status=all', {
      headers: { Cookie: sessionCookie }
    });
    assert(res12.status === 200, 'CSV export returned HTTP 200');
    assert(typeof res12.data === 'string' && res12.data.includes('Inquiry ID'), 'CSV headers formatted properly');
    assert(res12.data.includes('Elena Rostova'), 'CSV contains inquiry record');

    // -------------------------------------------------------------------------
    // TEST 13: Soft Delete to Trash & Restore
    // -------------------------------------------------------------------------
    const res13a = await request(`/api/inquiries/${createdInquiryId}?permanent=false`, {
      method: 'DELETE',
      headers: { Cookie: sessionCookie }
    });
    assert(res13a.status === 200, 'Inquiry moved to trash');

    const res13b = await request(`/api/inquiries/${createdInquiryId}`, {
      method: 'PATCH',
      headers: { Cookie: sessionCookie },
      body: { is_deleted: false, status: 'new' }
    });
    assert(res13b.status === 200, 'Inquiry restored from trash');

    // -------------------------------------------------------------------------
    // TEST 14: Gmail Integration Status
    // -------------------------------------------------------------------------
    const res14 = await request('/api/gmail/status', {
      headers: { Cookie: sessionCookie }
    });
    assert(res14.status === 200, 'Gmail status endpoint returns HTTP 200');
    assert('configured' in res14.data && 'connected' in res14.data, 'Gmail status contains configured & connected flags');

    // -------------------------------------------------------------------------
    // TEST 15: Reply via Gmail Fails Gracefully When Not Connected
    // -------------------------------------------------------------------------
    const res15 = await request(`/api/inquiries/${createdInquiryId}/reply`, {
      method: 'POST',
      headers: { Cookie: sessionCookie },
      body: {
        to: 'elena@rostovacapital.com',
        subject: 'Re: Project Brief',
        message: 'Hi Elena, testing Gmail reply before authorization.'
      }
    });
    assert(res15.status === 400, 'Sending reply without Gmail auth returns HTTP 400');
    assert(res15.data.success === false, 'Failed send returns success: false');
    assert(
      typeof res15.data.error === 'string' && res15.data.error.includes('Gmail'),
      `Clear error returned: "${res15.data.error}"`
    );

    // -------------------------------------------------------------------------
    // TEST 16: Update Status to "Replied"
    // -------------------------------------------------------------------------
    const res16 = await request(`/api/inquiries/${createdInquiryId}`, {
      method: 'PATCH',
      headers: { Cookie: sessionCookie },
      body: { status: 'replied' }
    });
    assert(res16.status === 200, 'Inquiry status updated to "replied"');
    assert(res16.data.inquiry.status === 'replied', 'Returned inquiry has status "replied"');

    // -------------------------------------------------------------------------
    // TEST 17: Fetch Inquiry Details Includes Reply History Array
    // -------------------------------------------------------------------------
    const res17 = await request(`/api/inquiries/${createdInquiryId}`, {
      headers: { Cookie: sessionCookie }
    });
    assert(res17.status === 200, 'Fetched inquiry details returns HTTP 200');
    assert(Array.isArray(res17.data.inquiry.replies), 'Inquiry object includes replies history array');

    // -------------------------------------------------------------------------
    // TEST 18: Inquiry Counts Includes "Replied" Count
    // -------------------------------------------------------------------------
    const res18 = await request('/api/inquiries?status=all', {
      headers: { Cookie: sessionCookie }
    });
    assert(res18.status === 200, 'Fetched inquiries list returns HTTP 200');
    assert(typeof res18.data.counts.replied === 'number', `Counts includes replied: ${res18.data.counts.replied}`);
    assert(res18.data.counts.replied >= 1, 'Real database count for replied is >= 1');

    // -------------------------------------------------------------------------
    // TEST 19: Reply History Endpoint
    // -------------------------------------------------------------------------
    const res19 = await request(`/api/inquiries/${createdInquiryId}/replies`, {
      headers: { Cookie: sessionCookie }
    });
    assert(res19.status === 200, 'Reply history endpoint returns HTTP 200');
    assert(Array.isArray(res19.data.replies), 'Reply history returns array of records');

    // -------------------------------------------------------------------------
    // TEST 20: Logout & Session Invalidation
    // -------------------------------------------------------------------------
    const res20 = await request('/api/auth/logout', {
      method: 'POST',
      headers: { Cookie: sessionCookie }
    });
    assert(res20.status === 200, 'Logout succeeded with HTTP 200');

    // Verify session is invalidated
    const res21 = await request('/api/inquiries', {
      headers: { Cookie: sessionCookie }
    });
    assert(res21.status === 401, 'Logged-out session cookie rejected with HTTP 401');

  } catch (err) {
    console.error('Test execution error:', err);
    failed++;
  } finally {
    await stopTestServer();
  }

  console.log(`\n========================================`);
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
