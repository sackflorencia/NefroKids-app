import { SQLiteProvider } from "expo-sqlite";

import { usersTable } from "./schemas/userSchema";
import { alertsTable } from "./schemas/alertsSchema";
import { symptomLogsTable } from "./schemas/symptomsSchema";
import { gameTable } from "./schemas/gameSchema";
import { progressTable } from "./schemas/progressSchema";
import { rankDefinitionsTable } from "./schemas/rankDefinitionsSchema";
import { reviewTable } from "./schemas/reviewschema";
import { avatarsTable } from "./schemas/avatarsSchema";
import { reportHistoryTable } from "./schemas/reportHistorySchema";
import { appointmentRulesTable } from "./schemas/appointmentRulesSchema";
import { appointmentWeekdaysTable } from "./schemas/appointmentWeekdaysSchema";
import { tutorsTable } from "./schemas/tutorsSchema";

import { seedGames } from "./seeds/gameSeed";
import { seedReviews } from "./seeds/reviewSeed";
import { seedUsers } from "./seeds/userSeed";

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

      await db.execAsync(reviewTable);
      console.log("reviewTable OK");

      await db.execAsync(avatarsTable);
      console.log("avatarsTable OK");

      await db.execAsync(reportHistoryTable);
      console.log("reportHistoryTable OK");

      await db.execAsync(appointmentRulesTable);
      console.log("appointmentRulesTable OK");

      await db.execAsync(appointmentWeekdaysTable);
      console.log("appointmentWeekdaysTable OK");

      await db.execAsync(tutorsTable);
      console.log("tutorsTable OK");

      await seedGames(db);
      await seedReviews(db);
      await seedUsers(db);

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