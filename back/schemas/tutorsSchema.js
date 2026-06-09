export const tutorsTable = `
CREATE TABLE IF NOT EXISTS tutors (

  id TEXT PRIMARY KEY,

  child_id TEXT NOT NULL,

  full_name TEXT NOT NULL,

  email TEXT NOT NULL,

  phone TEXT,

  relationship TEXT NOT NULL,

  is_primary INTEGER NOT NULL
    DEFAULT 0
    CHECK(is_primary IN (0,1)),

  FOREIGN KEY (child_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);
`;