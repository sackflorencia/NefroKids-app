import * as SQLite from 'expo-sqlite';
import { SQLiteProvider } from 'expo-sqlite';
export const db = SQLite.openDatabase('miDB.db');

export default function initDB () { 
  return(
  <SQLiteProvider
  databasename="NefroKids.db"
  onInit={async (db) => {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT NOT NULL,
    );
    PRAGMA journal_mode=WAL;
    `);
  }}
  options={{useNewConnection: false }}
>
  );
}