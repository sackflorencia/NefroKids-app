export const progressTable = `
CREATE TABLE IF NOT EXISTS child_progress (

  id TEXT PRIMARY KEY,

  child_id TEXT NOT NULL,

  level_id TEXT NOT NULL,

  status TEXT NOT NULL
    CHECK(status IN (
      'en_progreso',
      'completado'
    )),

  started_at TEXT,

  completed_at TEXT,

  FOREIGN KEY (child_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  FOREIGN KEY (level_id)
    REFERENCES level(id)
    ON DELETE CASCADE,

  UNIQUE(child_id, level_id)

);
`;