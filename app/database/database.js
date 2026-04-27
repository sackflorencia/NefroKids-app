import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('miDB.db');

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      ``
    );
  });
};