export const progressTable = `
CREATE TABLE IF NOT EXISTS child_progress (

  id TEXT PRIMARY KEY,

  child_id TEXT NOT NULL,

  level_id TEXT NOT NULL,

  status TEXT NOT NULL
    CHECK(status IN (
      'bloqueado',
      'disponible',
      'en_progreso',
      'completado'
    )),

  section1_completed INTEGER NOT NULL DEFAULT 0
    CHECK(section1_completed IN (0,1)),

  section2_completed INTEGER NOT NULL DEFAULT 0
    CHECK(section2_completed IN (0,1)),

  quiz_score INTEGER NOT NULL DEFAULT 0
    CHECK(quiz_score >= 0),

  quiz_total INTEGER NOT NULL DEFAULT 0
    CHECK(quiz_total >= 0),

  stars INTEGER NOT NULL DEFAULT 0,

  xp_gained INTEGER NOT NULL DEFAULT 0
    CHECK(xp_gained >= 0),

  started_at TEXT,

  completed_at TEXT,

  FOREIGN KEY (child_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  FOREIGN KEY (level_id)
    REFERENCES level(id)
    ON DELETE CASCADE
);
`;
