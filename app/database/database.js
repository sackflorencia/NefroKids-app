import { SQLiteProvider } from 'expo-sqlite';

export const db = SQLite.openDatabase('miDB.db');


export default function initDB({ children }) {
  return (
    <SQLiteProvider
      databaseName="NefroKids.db"
      onInit={async (db) => {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS symptom_logs (
            id            TEXT     PRIMARY KEY,
            child_id      TEXT     NOT NULL,
            general_mood  TEXT     NOT NULL
                          CHECK(general_mood IN ('feliz','cansado','dolor','hinchado')),
            pain_level    INTEGER  NOT NULL
                          CHECK(pain_level BETWEEN 0 AND 10),
            energy_level  INTEGER  NOT NULL
                          CHECK(energy_level BETWEEN 0 AND 10),
            urine_color   TEXT     NOT NULL
                          CHECK(urine_color IN ('normal','oscura','rojiza','sin_orina')),
            is_swollen    INTEGER  NOT NULL
                          CHECK(is_swollen IN (0, 1)),
            notes         TEXT,
            alert_sent    INTEGER  NOT NULL DEFAULT 0
                          CHECK(alert_sent IN (0, 1)),
            logged_at     TEXT     NOT NULL
                          DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
            FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE
          );

          CREATE INDEX IF NOT EXISTS idx_symptom_logs_child_id
            ON symptom_logs (child_id);

          CREATE INDEX IF NOT EXISTS idx_symptom_logs_logged_at
            ON symptom_logs (logged_at DESC);
        `);
      }}
    >
      {children}
    </SQLiteProvider>
  );
}