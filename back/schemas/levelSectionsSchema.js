export const levelSectionsTable = `
CREATE TABLE IF NOT EXISTS level_sections (

  id TEXT PRIMARY KEY,

  level_id TEXT NOT NULL,

  number INTEGER NOT NULL,

  name TEXT NOT NULL,

  type TEXT NOT NULL
    CHECK(type IN ('game', 'quiz')),

  display_order INTEGER NOT NULL,

  FOREIGN KEY(level_id)
    REFERENCES level(id)
    ON DELETE CASCADE
);
`;