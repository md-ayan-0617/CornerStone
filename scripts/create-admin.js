import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import { query, initDb } from '../src/server/db.js';

async function main() {
  const args = process.argv.slice(2);
  const username = (args[0] || process.env.ADMIN_USERNAME || 'ayanmd0617').trim().toLowerCase();
  const rawPassword = args[1] || process.env.ADMIN_INITIAL_PASSWORD || 'takshhskat';

  if (!rawPassword) {
    console.error('Error: Please provide a password.');
    console.log('Usage: node scripts/create-admin.js <username> <password>');
    process.exit(1);
  }

  if (rawPassword.length < 8) {
    console.error('Error: Password must be at least 8 characters long.');
    process.exit(1);
  }

  await initDb();

  const hash = await bcrypt.hash(rawPassword, 12);
  const existing = await query('SELECT id FROM admin_users WHERE username = $1', [username]);

  if (existing.rows.length > 0) {
    await query(
      'UPDATE admin_users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE username = $2',
      [hash, username]
    );
    console.log(`[CornerStone Auth] Password successfully updated for existing admin: "${username}"`);
  } else {
    const adminId = 'adm_' + crypto.randomBytes(12).toString('hex');
    await query(
      'INSERT INTO admin_users (id, username, password_hash, created_at, updated_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
      [adminId, username, hash]
    );
    console.log(`[CornerStone Auth] New admin created successfully: "${username}"`);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error('[CornerStone Auth ERROR]', err);
  process.exit(1);
});
