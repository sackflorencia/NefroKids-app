import { SQLiteProvider } from "expo-sqlite";

import { usersTable } from "./database/schemas/userSchema";
import { alertsTable } from "./database/schemas/alertsSchema";
import { symptomLogsTable } from "./database/schemas/symptomsSchema";
import { gameTable } from "./database/schemas/gameSchema";
import { progressTable } from "./database/schemas/progressSchema";
import { rankDefinitionsTable } from "./database/schemas/rankDefinitionsSchema";

export default function InitDB({ children }) {

  async function setupDatabase(db) {

    await db.execAsync(`
      PRAGMA foreign_keys = ON;
    `);

    await db.execAsync(usersTable);
    await db.execAsync(alertsTable);
    await db.execAsync(symptomLogsTable);
    await db.execAsync(gameTable);
    await db.execAsync(progressTable);
    await db.execAsync(rankDefinitionsTable);
  }

  return (
    <SQLiteProvider
      databaseName="NefroKids.db"
      onInit={setupDatabase}
    >
      {children}
    </SQLiteProvider>
  );
}