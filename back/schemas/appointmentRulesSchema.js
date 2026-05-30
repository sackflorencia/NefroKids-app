export const appointmentRulesTable = `
CREATE TABLE IF NOT EXISTS appointmentRules (

  id TEXT PRIMARY KEY,

  child_id TEXT NOT NULL,

  recurrence_type TEXT NOT NULL,

  recurrence_interval INTEGER,

  start_datetime TEXT NOT NULL,

  report_hours_before INTEGER NOT NULL,
  active INTEGER NOT NULL
  DEFAULT 1
    CHECK(active IN (0,1))
);
`;