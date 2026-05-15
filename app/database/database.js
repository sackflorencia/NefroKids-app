import { SQLiteProvider } from 'expo-sqlite';
import { usersTable } from './schemas/userSchema';
await db.execAsync(usersTable);
import { alertsTable } from './schemas/alertsSchema';
await db.execAsync(alertsTable);
import { symptomLogsTable } from './schemas/symptomsSchema';
await db.execAsync(symptomLogsTable);
import { gameTable } from './schemas/gameSchema';
await db.execAsync(gameTable);
import { progressTable } from './schemas/progressSchema';
await db.execAsync(progressTable);
import { rankDefinitionsTable  } from './schemas/rankDefinitionsSchema';
await db.execAsync(rankDefinitionsTable );
export default function InitDB({ children }) {

  async function setupDatabase(db) {

    await db.execAsync(`
      PRAGMA foreign_keys = ON;
    `);

    await db.execAsync(symptomLogsTable);
    await db.execAsync(alertsTable);
    await db.execAsync(gamesTable);
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