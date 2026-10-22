import { initDb, isPostgresConfigured } from '../src/server/db.js';

async function main() {
  console.log('[CornerStone DB Migration] Running schema migration...');
  const isPg = isPostgresConfigured();
  console.log(`[CornerStone DB Migration] Target: ${isPg ? 'PostgreSQL Database' : 'Local SQLite (.data/cornerstone_dev.db)'}`);

  try {
    await initDb();
    console.log('[CornerStone DB Migration] Successfully migrated all schemas, tables, and indexes.');
    process.exit(0);
  } catch (err) {
    console.error('[CornerStone DB Migration ERROR]', err);
    process.exit(1);
  }
}

main();
