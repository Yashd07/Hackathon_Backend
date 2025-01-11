import sqlite3 from 'sqlite3';
import { resolve } from 'path';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';

// Resolve directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

const dbDirectory = resolve(__dirname, '../');
mkdirSync(dbDirectory, { recursive: true });

const dbPath = resolve(dbDirectory, 'database.db');

// Create or open the database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log(`Database created or opened successfully at ${dbPath}`);
  }
});

// Create the `users` table if it doesn't exist
db.serialize(() => {
  db.run(`
      CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL
      )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table "users" created successfully');
    }
  });
});

// Keep the database connection open
export default db;
