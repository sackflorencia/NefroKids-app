export const symptomLogsTable = `
CREATE TABLE IF NOT EXISTS symptom_logs (
  id TEXT PRIMARY KEY,
  child_id TEXT NOT NULL,
  general_mood TEXT NOT NULL
    CHECK(general_mood IN (
      'feliz',
      'cansado',
      'dolor',
      'hinchado'
    )),
  pain_level INTEGER NOT NULL
    CHECK(pain_level BETWEEN 0 AND 10),
  energy_level INTEGER NOT NULL
    CHECK(energy_level BETWEEN 0 AND 10),
  urine_color TEXT NOT NULL
    CHECK(urine_color IN (
      'normal',
      'oscura',
      'rojiza',
      'sin_orina'
    )),

  is_swollen INTEGER NOT NULL
    CHECK(is_swollen IN (0,1)),

  notes TEXT,

  alert_sent INTEGER DEFAULT 0
    CHECK(alert_sent IN (0,1)),

  logged_at TEXT NOT NULL
    DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (child_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);
`;