export const symptomLogsTable = `
CREATE TABLE IF NOT EXISTS symptom_logs (

  id TEXT PRIMARY KEY,

  child_id TEXT NOT NULL,

  general_mood TEXT
  CHECK(general_mood IN (
    'happy',
    'tired',
    'pain',
    'swollen'
  )),

  pain_location TEXT
    CHECK(pain_location IN (
      'head',
      'stomach',
      'arm',
      'leg',
      'none'
    )),

  urine_color TEXT
  CHECK(urine_color IN (
    'normal',
    'dark',
    'reddish',
    'no_urine',
    'pending'
  )),

  alert_sent INTEGER NOT NULL
    DEFAULT 0
    CHECK(alert_sent IN (0,1)),

  logged_at TEXT NOT NULL
    DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (child_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);
`;