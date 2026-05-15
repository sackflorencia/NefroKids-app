export const alertsTable = `
CREATE TABLE IF NOT EXISTS alerts (

  id TEXT PRIMARY KEY,

  symptom_log_id TEXT NOT NULL,

  alert_type TEXT NOT NULL
    CHECK(alert_type IN (
      'dolor',
      'orina',
      'hinchazon',
      'energia'
    )),

  message TEXT NOT NULL,

  triggered_at TEXT NOT NULL
    DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (symptom_log_id)
    REFERENCES symptom_logs(id)
    ON DELETE CASCADE
);
`;