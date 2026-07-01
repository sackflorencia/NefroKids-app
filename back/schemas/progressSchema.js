export const progressTable = `
CREATE TABLE IF NOT EXISTS child_progress (

  id TEXT PRIMARY KEY,

  child_id TEXT NOT NULL,

  level_id TEXT NOT NULL,

  status TEXT NOT NULL
    CHECK(status IN (
      'bloqueado',
      'disponible',
      'completado'
    )),

  time_record INTEGER NOT NULL
    DEFAULT 0
    CHECK(time_record >= 0),

  stars INTEGER NOT NULL,

  xp_gained INTEGER NOT NULL
    DEFAULT 0
    CHECK(xp_gained >= 0),

  started_at TEXT,

  completed_at TEXT,

  FOREIGN KEY (child_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  FOREIGN KEY (level_id)
    REFERENCES game(id)
    ON DELETE CASCADE
);
`;