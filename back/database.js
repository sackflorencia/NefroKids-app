import { SQLiteProvider } from "expo-sqlite";

import { usersTable } from "./schemas/userSchema";
import { alertsTable } from "./schemas/alertsSchema";
import { symptomLogsTable } from "./schemas/symptomsSchema";
import { levelTable } from "./schemas/levelSchema";
import { progressTable } from "./schemas/progressSchema";
import { rankDefinitionsTable } from "./schemas/rankDefinitionsSchema";
import { questionTable } from "./schemas/questionSchema";
import { avatarsTable } from "./schemas/avatarsSchema";
import { reportHistoryTable } from "./schemas/reportHistorySchema";
import { appointmentRulesTable } from "./schemas/appointmentRulesSchema";
import { appointmentWeekdaysTable } from "./schemas/appointmentWeekdaysSchema";
import { tutorsTable } from "./schemas/tutorsSchema";

import { seedLevels } from "./seeds/levelSeed";
import { seedQuestions } from "./seeds/questionSeed";
import { seedUsers } from "./seeds/userSeed";
import { levelSectionsTable } from "./schemas/levelSectionsSchema";
import { seedLevelSections } from "./seeds/levelSectionSeed";
import { sectionProgressTable } from "./schemas/sectionProgressSchema";

export default function InitDB({ children }) {

  async function setupDatabase(db) {

    try {

      console.log("INIT DATABASE");

      await db.execAsync(`
        PRAGMA foreign_keys = ON;
      `);
      //       await db.execAsync(`
      //   DROP TABLE IF EXISTS alerts;
      //   DROP TABLE IF EXISTS symptom_logs;
      //   DROP TABLE IF EXISTS child_progress;
      //   DROP TABLE IF EXISTS reportHistory;
      //   DROP TABLE IF EXISTS appointmentWeekdays;
      //   DROP TABLE IF EXISTS appointmentRules;
      //   DROP TABLE IF EXISTS tutors;
      //   DROP TABLE IF EXISTS users;
      // `);
      // //OJO CON ESTO: SOLO CUANDO PROBAMOS, DESP HAY Q HACER UNA BUENA MIGRACION PARA QUE NO SE BORREN LOS DATOS*/

      console.log("PRAGMA OK");

      await db.execAsync(usersTable);
      console.log("usersTable OK");

      await db.execAsync(levelTable);
      console.log("levelTable OK");

      await db.execAsync(rankDefinitionsTable);
      console.log("rankDefinitionsTable OK");

      await db.execAsync(symptomLogsTable);
      console.log("symptomLogsTable OK");

      await db.execAsync(alertsTable);
      console.log("alertsTable OK");

      // await db.execAsync(`
      //    DROP TABLE IF EXISTS child_progress;
      //  `); 
      await db.execAsync(progressTable);
      console.log("progressTable OK");

      await db.execAsync(sectionProgressTable)
      console.log("sectionprogressTable OK");

      // await db.execAsync(`
      //   DROP TABLE IF EXISTS question;
      // `); 
      await db.execAsync(questionTable);
      console.log("questionTable OK");

      await db.execAsync(levelSectionsTable)
      console.log("level section ok")

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

      console.log("ANTES seedLevels");
      await seedLevels(db);
      console.log("DESPUES seedLevels");

      console.log("ANTES seedLevelSections");
      await seedLevelSections(db);
      console.log("DESPUES seedLevelSections");

      console.log("ANTES seedQuestions");
      await seedQuestions(db);
      console.log("DESPUES seedQuestions");

      console.log("ANTES seedUsers");
      await seedUsers(db);
      console.log("DESPUES seedUsers");

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