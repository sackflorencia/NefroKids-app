export const sectionProgressTable = `
CREATE TABLE IF NOT EXISTS child_section_progress (

  id TEXT PRIMARY KEY,

  child_progress_id TEXT NOT NULL,

  level_section_id TEXT NOT NULL,

  status TEXT NOT NULL
    CHECK(status IN (
      'bloqueado',
      'disponible',
      'en_progreso',
      'completado'
    )),

  score INTEGER,

  total INTEGER,

  stars INTEGER,

  xp_gained INTEGER NOT NULL DEFAULT 0
    CHECK(xp_gained >= 0),

  started_at TEXT,

  completed_at TEXT,

  FOREIGN KEY (child_progress_id)
    REFERENCES child_progress(id)
    ON DELETE CASCADE,

  FOREIGN KEY (level_section_id)
    REFERENCES level_sections(id)
    ON DELETE CASCADE,

  UNIQUE(child_progress_id, level_section_id)

);
`;