import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';

let pgPool = null;
let sqliteDb = null;
let isInitialized = false;

/**
 * Determine if PostgreSQL is configured via DATABASE_URL
 */
export function isPostgresConfigured() {
  const url = process.env.DATABASE_URL;
  return Boolean(url && (url.startsWith('postgres://') || url.startsWith('postgresql://')));
}

/**
 * Get or initialize database connection
 */
export async function getDb() {
  if (isPostgresConfigured()) {
    if (!pgPool) {
      const { default: pg } = await import('pg');
      const connectionString = process.env.DATABASE_URL;
      const isLocal = connectionString.includes('localhost') || connectionString.includes('127.0.0.1');

      pgPool = new pg.Pool({
        connectionString,
        ssl: isLocal ? false : { rejectUnauthorized: false },
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 8000
      });

      pgPool.on('error', (err) => {
        console.error('[CornerStone DB] Unexpected PostgreSQL pool error:', err.message);
      });
    }
    return { type: 'postgres', pool: pgPool };
  }

  // Fallback to SQLite for zero-config local development and testing
  if (!sqliteDb) {
    if (process.env.VERCEL) {
      console.warn(
        '[CornerStone DB WARNING] DATABASE_URL is not set in production Vercel environment! In serverless environments, an external PostgreSQL database (Neon, Supabase, etc.) is required for persistent storage.'
      );
    }

    const { DatabaseSync } = await import('node:sqlite');
    const dataDir = path.resolve(process.cwd(), '.data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const dbPath = path.join(dataDir, 'cornerstone_dev.db');
    sqliteDb = new DatabaseSync(dbPath);
    sqliteDb.exec('PRAGMA journal_mode = WAL;');
    sqliteDb.exec('PRAGMA synchronous = NORMAL;');
  }

  return { type: 'sqlite', db: sqliteDb };
}

/**
 * Execute a parameterized query compatible with both PostgreSQL and SQLite
 */
export async function query(sql, params = []) {
  const { type, pool, db } = await getDb();

  if (type === 'postgres') {
    const result = await pool.query(sql, params);
    return {
      rows: result.rows,
      rowCount: result.rowCount
    };
  }

  // SQLite execution
  // Convert Postgres $1, $2, $3 to ?
  let sqliteSql = sql.replace(/\$(\d+)/g, '?');

  // Convert RETURNING * or RETURNING id if used in SQLite
  const hasReturning = /RETURNING\s+/i.test(sqliteSql);

  const trimmedSql = sqliteSql.trim();
  const isSelect = /^SELECT/i.test(trimmedSql) || hasReturning;

  // Prepare parameters: convert boolean to 1/0, arrays/objects to JSON strings
  const normalizedParams = params.map((p) => {
    if (typeof p === 'boolean') return p ? 1 : 0;
    if (Array.isArray(p)) return JSON.stringify(p);
    if (p !== null && typeof p === 'object' && !(p instanceof Date)) return JSON.stringify(p);
    if (p instanceof Date) return p.toISOString();
    return p;
  });

  const stmt = db.prepare(sqliteSql);

  if (isSelect) {
    const rows = stmt.all(...normalizedParams);
    // Normalize SQLite row booleans and JSON
    const normalizedRows = rows.map((row) => normalizeRow(row));
    return {
      rows: normalizedRows,
      rowCount: normalizedRows.length
    };
  } else {
    const info = stmt.run(...normalizedParams);
    return {
      rows: [],
      rowCount: info.changes
    };
  }
}

/**
 * Normalize SQLite row values to match PostgreSQL types
 */
function normalizeRow(row) {
  if (!row) return row;
  const out = { ...row };
  for (const [key, val] of Object.entries(out)) {
    if (key.startsWith('is_') && (val === 1 || val === 0)) {
      out[key] = Boolean(val);
    }
    if (key === 'services' && typeof val === 'string' && (val.startsWith('[') || val.startsWith('{'))) {
      try {
        out[key] = JSON.parse(val);
      } catch {
        // keep as string
      }
    }
  }
  return out;
}

/**
 * Run schema migrations and create necessary tables & indexes
 */
export async function initDb() {
  if (isInitialized) return;

  const { type, pool, db } = await getDb();

  if (type === 'postgres') {
    // PostgreSQL Migration
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS admin_users (
          id VARCHAR(64) PRIMARY KEY,
          username VARCHAR(100) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
          updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
          last_login_at TIMESTAMPTZ
        );

        CREATE TABLE IF NOT EXISTS inquiries (
          id VARCHAR(64) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          company VARCHAR(255),
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(100),
          website VARCHAR(255),
          budget VARCHAR(100),
          timeline VARCHAR(100),
          services TEXT,
          details TEXT,
          status VARCHAR(50) DEFAULT 'new' NOT NULL,
          is_read BOOLEAN DEFAULT FALSE NOT NULL,
          is_spam BOOLEAN DEFAULT FALSE NOT NULL,
          is_deleted BOOLEAN DEFAULT FALSE NOT NULL,
          internal_notes TEXT DEFAULT '',
          ip_address VARCHAR(100),
          user_agent TEXT,
          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
          updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
        );

        CREATE TABLE IF NOT EXISTS admin_sessions (
          id VARCHAR(128) PRIMARY KEY,
          admin_id VARCHAR(64) NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
          username VARCHAR(100) NOT NULL,
          ip_address VARCHAR(100),
          user_agent TEXT,
          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
          expires_at TIMESTAMPTZ NOT NULL
        );

        CREATE TABLE IF NOT EXISTS login_attempts (
          id VARCHAR(64) PRIMARY KEY,
          ip_address VARCHAR(100) NOT NULL,
          attempt_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
          success BOOLEAN DEFAULT FALSE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS gmail_auth (
          id VARCHAR(64) PRIMARY KEY,
          email VARCHAR(255) NOT NULL,
          access_token TEXT NOT NULL,
          refresh_token TEXT,
          scope TEXT,
          token_type VARCHAR(50) DEFAULT 'Bearer',
          expiry_date BIGINT NOT NULL,
          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
          updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
        );

        CREATE TABLE IF NOT EXISTS inquiry_replies (
          id VARCHAR(64) PRIMARY KEY,
          inquiry_id VARCHAR(64) NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
          sender_email VARCHAR(255) NOT NULL,
          recipient_email VARCHAR(255) NOT NULL,
          subject VARCHAR(255) NOT NULL,
          message_body TEXT NOT NULL,
          gmail_message_id VARCHAR(255),
          gmail_thread_id VARCHAR(255),
          status VARCHAR(50) NOT NULL,
          error_message TEXT,
          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
        CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(email);
        CREATE INDEX IF NOT EXISTS idx_inquiries_is_deleted ON inquiries(is_deleted);
        CREATE INDEX IF NOT EXISTS idx_inquiry_replies_inquiry_id ON inquiry_replies(inquiry_id);
        CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);
        CREATE INDEX IF NOT EXISTS idx_login_attempts_ip ON login_attempts(ip_address, attempt_time);
      `);
    } finally {
      client.release();
    }
  } else {
    // SQLite Migration
    db.exec(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
        last_login_at TEXT
      );

      CREATE TABLE IF NOT EXISTS inquiries (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        company TEXT,
        email TEXT NOT NULL,
        phone TEXT,
        website TEXT,
        budget TEXT,
        timeline TEXT,
        services TEXT,
        details TEXT,
        status TEXT DEFAULT 'new' NOT NULL,
        is_read INTEGER DEFAULT 0 NOT NULL,
        is_spam INTEGER DEFAULT 0 NOT NULL,
        is_deleted INTEGER DEFAULT 0 NOT NULL,
        internal_notes TEXT DEFAULT '',
        ip_address TEXT,
        user_agent TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL
      );

      CREATE TABLE IF NOT EXISTS admin_sessions (
        id TEXT PRIMARY KEY,
        admin_id TEXT NOT NULL,
        username TEXT NOT NULL,
        ip_address TEXT,
        user_agent TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
        expires_at TEXT NOT NULL,
        FOREIGN KEY(admin_id) REFERENCES admin_users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS login_attempts (
        id TEXT PRIMARY KEY,
        ip_address TEXT NOT NULL,
        attempt_time TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
        success INTEGER DEFAULT 0 NOT NULL
      );

      CREATE TABLE IF NOT EXISTS gmail_auth (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        access_token TEXT NOT NULL,
        refresh_token TEXT,
        scope TEXT,
        token_type TEXT DEFAULT 'Bearer',
        expiry_date INTEGER NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL
      );

      CREATE TABLE IF NOT EXISTS inquiry_replies (
        id TEXT PRIMARY KEY,
        inquiry_id TEXT NOT NULL,
        sender_email TEXT NOT NULL,
        recipient_email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message_body TEXT NOT NULL,
        gmail_message_id TEXT,
        gmail_thread_id TEXT,
        status TEXT NOT NULL,
        error_message TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
        FOREIGN KEY(inquiry_id) REFERENCES inquiries(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
      CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(email);
      CREATE INDEX IF NOT EXISTS idx_inquiries_is_deleted ON inquiries(is_deleted);
      CREATE INDEX IF NOT EXISTS idx_inquiry_replies_inquiry_id ON inquiry_replies(inquiry_id);
      CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);
      CREATE INDEX IF NOT EXISTS idx_login_attempts_ip ON login_attempts(ip_address, attempt_time);
    `);
  }

  // Seed initial administrator account if no admin exists
  await seedInitialAdmin();

  isInitialized = true;
}

/**
 * Seed initial administrator account securely
 */
async function seedInitialAdmin() {
  const check = await query('SELECT id FROM admin_users LIMIT 1');
  if (check.rows.length === 0) {
    const adminId = 'adm_' + crypto.randomBytes(12).toString('hex');
    const username = (process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase();
    const rawPassword = process.env.ADMIN_INITIAL_PASSWORD || 'CornerStone@Admin2026';
    const hash = await bcrypt.hash(rawPassword, 12);

    await query(
      'INSERT INTO admin_users (id, username, password_hash, created_at, updated_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
      [adminId, username, hash]
    );

    console.log(`[CornerStone Auth] Initial administrator account created for username: "${username}"`);
  }
}
