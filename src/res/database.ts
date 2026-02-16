import Database from 'better-sqlite3';

const db = new Database('hina.db');
db.pragma('journal_mode = WAL');

db.prepare(
    `
    CREATE TABLE IF NOT EXISTS avatar_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        avatar_url TEXT NOT NULL
    );
`
).run();

export default db;

