import { query, initDb } from './db.js';
import { generateInquiryId } from './validation.js';

/**
 * Save new inquiry to the database
 */
export async function createInquiry(data) {
  await initDb();
  const id = generateInquiryId();

  await query(
    `INSERT INTO inquiries (
      id, name, company, email, phone, website, budget, timeline, services, details,
      status, is_read, is_spam, is_deleted, internal_notes, ip_address, user_agent,
      created_at, updated_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
      'new', 0, 0, 0, '', $11, $12,
      CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    )`,
    [
      id,
      data.name,
      data.company,
      data.email,
      data.phone,
      data.website,
      data.budget,
      data.timeline,
      data.services,
      data.details,
      data.ipAddress,
      data.userAgent
    ]
  );

  return { success: true, inquiryId: id };
}

/**
 * Fetch inquiries with robust filtering, search, sorting, and pagination
 */
export async function getInquiries({
  status = 'all',
  search = '',
  dateRange = 'all',
  sortBy = 'created_at',
  sortOrder = 'desc',
  page = 1,
  limit = 15
}) {
  await initDb();

  const conditions = [];
  const params = [];
  let paramIdx = 1;

  // Status & Trash handling
  if (status === 'trash') {
    conditions.push(`is_deleted = 1`);
  } else if (status === 'spam') {
    conditions.push(`is_spam = 1 AND is_deleted = 0`);
  } else {
    // Normal tabs exclude soft-deleted items and spam (unless explicitly requested)
    conditions.push(`is_deleted = 0`);
    if (status === 'new') {
      conditions.push(`status = 'new' AND is_spam = 0`);
    } else if (status === 'in_progress') {
      conditions.push(`status = 'in_progress' AND is_spam = 0`);
    } else if (status === 'replied') {
      conditions.push(`status = 'replied' AND is_spam = 0`);
    } else if (status === 'completed') {
      conditions.push(`(status = 'completed' OR status = 'replied') AND is_spam = 0`);
    } else {
      // 'all' excludes spam by default
      conditions.push(`is_spam = 0`);
    }
  }

  // Date Range filter
  if (dateRange === 'today') {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    conditions.push(`created_at >= $${paramIdx++}`);
    params.push(todayStart.toISOString());
  } else if (dateRange === '7days') {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    conditions.push(`created_at >= $${paramIdx++}`);
    params.push(sevenDaysAgo);
  } else if (dateRange === '30days') {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    conditions.push(`created_at >= $${paramIdx++}`);
    params.push(thirtyDaysAgo);
  }

  // Search filter
  if (search && search.trim()) {
    const term = `%${search.trim().toLowerCase()}%`;
    conditions.push(
      `(LOWER(name) LIKE $${paramIdx} OR LOWER(email) LIKE $${paramIdx} OR LOWER(company) LIKE $${paramIdx} OR LOWER(phone) LIKE $${paramIdx} OR LOWER(details) LIKE $${paramIdx} OR LOWER(id) LIKE $${paramIdx})`
    );
    params.push(term);
    paramIdx++;
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // Safe sorting
  const validSortFields = {
    created_at: 'created_at',
    name: 'name',
    status: 'status',
    company: 'company'
  };
  const safeSortField = validSortFields[sortBy] || 'created_at';
  const safeSortOrder = sortOrder.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

  // Count total matching records
  const countSql = `SELECT COUNT(*) as total FROM inquiries ${whereClause}`;
  const countRes = await query(countSql, params);
  const total = parseInt(countRes.rows[0]?.total || '0', 10);

  // Pagination calculation
  const safeLimit = Math.max(1, Math.min(100, parseInt(limit, 10) || 15));
  const totalPages = Math.ceil(total / safeLimit) || 1;
  const safePage = Math.max(1, Math.min(totalPages, parseInt(page, 10) || 1));
  const offset = (safePage - 1) * safeLimit;

  // Fetch paginated records
  const dataSql = `
    SELECT * FROM inquiries
    ${whereClause}
    ORDER BY ${safeSortField} ${safeSortOrder}
    LIMIT $${paramIdx++} OFFSET $${paramIdx++}
  `;
  const dataParams = [...params, safeLimit, offset];
  const dataRes = await query(dataSql, dataParams);

  // Global counts for badges and metrics
  const counts = await getInquiryCounts();

  return {
    inquiries: dataRes.rows,
    pagination: {
      total,
      page: safePage,
      limit: safeLimit,
      totalPages
    },
    counts
  };
}

/**
 * Calculate accurate system inquiry metrics directly from database
 */
export async function getInquiryCounts() {
  await initDb();

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayIso = todayStart.toISOString();

  const weekStart = new Date();
  const day = weekStart.getDay();
  const diff = weekStart.getDate() - day + (day === 0 ? -6 : 1); // Monday
  weekStart.setDate(diff);
  weekStart.setHours(0, 0, 0, 0);
  const weekIso = weekStart.toISOString();

  // Single aggregation query for high performance
  const res = await query(`
    SELECT
      COUNT(CASE WHEN is_deleted = 0 AND is_spam = 0 THEN 1 END) as total,
      COUNT(CASE WHEN status = 'new' AND is_deleted = 0 AND is_spam = 0 THEN 1 END) as new,
      COUNT(CASE WHEN status = 'in_progress' AND is_deleted = 0 AND is_spam = 0 THEN 1 END) as in_progress,
      COUNT(CASE WHEN (status = 'replied' OR status = 'completed') AND is_deleted = 0 AND is_spam = 0 THEN 1 END) as replied,
      COUNT(CASE WHEN status = 'completed' AND is_deleted = 0 AND is_spam = 0 THEN 1 END) as completed,
      COUNT(CASE WHEN is_spam = 1 AND is_deleted = 0 THEN 1 END) as spam,
      COUNT(CASE WHEN is_deleted = 1 THEN 1 END) as trash,
      COUNT(CASE WHEN is_read = 0 AND is_deleted = 0 AND is_spam = 0 THEN 1 END) as unread,
      COUNT(CASE WHEN created_at >= '${todayIso}' AND is_deleted = 0 AND is_spam = 0 THEN 1 END) as today,
      COUNT(CASE WHEN created_at >= '${weekIso}' AND is_deleted = 0 AND is_spam = 0 THEN 1 END) as this_week
    FROM inquiries
  `);

  const row = res.rows[0] || {};
  return {
    total: parseInt(row.total || '0', 10),
    new: parseInt(row.new || '0', 10),
    in_progress: parseInt(row.in_progress || '0', 10),
    replied: parseInt(row.replied || '0', 10),
    completed: parseInt(row.completed || '0', 10),
    spam: parseInt(row.spam || '0', 10),
    trash: parseInt(row.trash || '0', 10),
    unread: parseInt(row.unread || '0', 10),
    today: parseInt(row.today || '0', 10),
    this_week: parseInt(row.this_week || '0', 10)
  };
}

/**
 * Fetch detailed analytics for charts and reporting
 */
export async function getInquiryAnalytics() {
  await initDb();

  // 1. Daily volume for last 30 days
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const res = await query(
    `SELECT id, created_at, status, services FROM inquiries WHERE created_at >= $1 AND is_deleted = 0 ORDER BY created_at ASC`,
    [thirtyDaysAgo]
  );

  const dailyMap = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const key = d.toISOString().slice(0, 10);
    dailyMap[key] = { date: key, count: 0, new: 0, completed: 0 };
  }

  res.rows.forEach((r) => {
    const dateKey = (r.created_at || '').slice(0, 10);
    if (dailyMap[dateKey]) {
      dailyMap[dateKey].count++;
      if (r.status === 'new') dailyMap[dateKey].new++;
      if (r.status === 'completed') dailyMap[dateKey].completed++;
    }
  });

  const dailyTrends = Object.values(dailyMap);

  // 2. Status distribution
  const statusCounts = await getInquiryCounts();

  return {
    dailyTrends,
    statusCounts,
    lastUpdated: new Date().toISOString()
  };
}

/**
 * Get single inquiry by ID and mark read
 */
export async function getInquiryById(id) {
  await initDb();
  const res = await query('SELECT * FROM inquiries WHERE id = $1 LIMIT 1', [id]);
  const inquiry = res.rows[0];
  if (!inquiry) return null;

  if (!inquiry.is_read) {
    await query('UPDATE inquiries SET is_read = 1, updated_at = CURRENT_TIMESTAMP WHERE id = $1', [id]);
    inquiry.is_read = true;
  }

  // Attach reply history
  const repliesRes = await query(
    'SELECT * FROM inquiry_replies WHERE inquiry_id = $1 ORDER BY created_at DESC',
    [id]
  );
  inquiry.replies = repliesRes.rows || [];

  return inquiry;
}

/**
 * Update inquiry fields (status, internal notes, spam, soft deletion)
 */
export async function updateInquiry(id, updates) {
  await initDb();

  const validStatuses = ['new', 'in_progress', 'replied', 'completed'];
  const setClauses = [];
  const params = [];
  let paramIdx = 1;

  if (updates.status && validStatuses.includes(updates.status)) {
    setClauses.push(`status = $${paramIdx++}`);
    params.push(updates.status);
  }

  if (typeof updates.internal_notes === 'string') {
    setClauses.push(`internal_notes = $${paramIdx++}`);
    params.push(updates.internal_notes);
  }

  if (typeof updates.is_spam === 'boolean') {
    setClauses.push(`is_spam = $${paramIdx++}`);
    params.push(updates.is_spam ? 1 : 0);
  }

  if (typeof updates.is_deleted === 'boolean') {
    setClauses.push(`is_deleted = $${paramIdx++}`);
    params.push(updates.is_deleted ? 1 : 0);
  }

  if (setClauses.length === 0) {
    return { success: false, error: 'No valid update fields provided.' };
  }

  setClauses.push(`updated_at = CURRENT_TIMESTAMP`);
  params.push(id);

  const sql = `UPDATE inquiries SET ${setClauses.join(', ')} WHERE id = $${paramIdx}`;
  await query(sql, params);

  return { success: true };
}

/**
 * Delete inquiry: soft delete (to trash) or permanent purge
 */
export async function deleteInquiry(id, permanent = false) {
  await initDb();

  if (permanent) {
    await query('DELETE FROM inquiries WHERE id = $1', [id]);
  } else {
    await query('UPDATE inquiries SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE id = $1', [id]);
  }

  return { success: true };
}

/**
 * Bulk action handler
 */
export async function bulkUpdateInquiries(ids, action) {
  await initDb();
  if (!Array.isArray(ids) || ids.length === 0) {
    return { success: false, error: 'No inquiry IDs specified.' };
  }

  for (const id of ids) {
    if (action === 'mark_in_progress') {
      await updateInquiry(id, { status: 'in_progress' });
    } else if (action === 'mark_replied') {
      await updateInquiry(id, { status: 'replied' });
    } else if (action === 'mark_completed') {
      await updateInquiry(id, { status: 'completed' });
    } else if (action === 'mark_new') {
      await updateInquiry(id, { status: 'new' });
    } else if (action === 'mark_spam') {
      await updateInquiry(id, { is_spam: true });
    } else if (action === 'trash') {
      await updateInquiry(id, { is_deleted: true });
    } else if (action === 'restore') {
      await updateInquiry(id, { is_deleted: false, is_spam: false });
    } else if (action === 'delete_permanent') {
      await deleteInquiry(id, true);
    }
  }

  return { success: true, count: ids.length };
}

/**
 * Generate CSV formatted string from inquiries
 */
export async function exportInquiriesCsv(status = 'all') {
  await initDb();
  let whereClause = 'WHERE is_deleted = 0';
  if (status === 'trash') {
    whereClause = 'WHERE is_deleted = 1';
  } else if (status === 'spam') {
    whereClause = 'WHERE is_spam = 1 AND is_deleted = 0';
  } else if (status !== 'all') {
    whereClause = `WHERE status = '${status}' AND is_deleted = 0 AND is_spam = 0`;
  }

  const res = await query(`SELECT * FROM inquiries ${whereClause} ORDER BY created_at DESC LIMIT 2000`);

  const escapeCsv = (str) => {
    if (str === null || str === undefined) return '""';
    const clean = String(str).replace(/"/g, '""');
    return `"${clean}"`;
  };

  const headers = [
    'Inquiry ID',
    'Date Submitted',
    'Name',
    'Company',
    'Email',
    'Phone',
    'Website',
    'Budget',
    'Timeline',
    'Services',
    'Details',
    'Status',
    'Read',
    'Internal Notes'
  ];

  const rows = [headers.join(',')];

  res.rows.forEach((r) => {
    rows.push(
      [
        escapeCsv(r.id),
        escapeCsv(r.created_at),
        escapeCsv(r.name),
        escapeCsv(r.company),
        escapeCsv(r.email),
        escapeCsv(r.phone),
        escapeCsv(r.website),
        escapeCsv(r.budget),
        escapeCsv(r.timeline),
        escapeCsv(r.services),
        escapeCsv(r.details),
        escapeCsv(r.status),
        escapeCsv(r.is_read ? 'Yes' : 'No'),
        escapeCsv(r.internal_notes)
      ].join(',')
    );
  });

  return rows.join('\r\n');
}
