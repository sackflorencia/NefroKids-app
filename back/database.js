import { SQLiteProvider } from "expo-sqlite";

import { usersTable } from "./schemas/userSchema";
import { alertsTable } from "./schemas/alertsSchema";
import { symptomLogsTable } from "./schemas/symptomsSchema";
import { gameTable } from "./schemas/gameSchema";
import { progressTable } from "./schemas/progressSchema";
import { rankDefinitionsTable } from "./schemas/rankDefinitionsSchema";
import { seedGames } from "./seeds/gameSeed";

export default function InitDB({ children }) {

  async function setupDatabase(db) {

    try {

      console.log("INIT DATABASE");

      await db.execAsync(`
        PRAGMA foreign_keys = ON;
      `);

      console.log("PRAGMA OK");

      await db.execAsync(usersTable);
      console.log("usersTable OK");

      await db.execAsync(gameTable);
      console.log("gameTable OK");

      await db.execAsync(rankDefinitionsTable);
      console.log("rankDefinitionsTable OK");

      await db.execAsync(symptomLogsTable);
      console.log("symptomLogsTable OK");

      await db.execAsync(alertsTable);
      console.log("alertsTable OK");

      await db.execAsync(progressTable);
      console.log("progressTable OK");

      await seedGames(db);

      console.log("DATABASE READY");

    } catch (error) {

      console.error("DATABASE ERROR:");
      console.error(error);

    }
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