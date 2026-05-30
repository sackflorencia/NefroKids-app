export const usersTable = `
CREATE TABLE IF NOT EXISTS users (

  id TEXT PRIMARY KEY,

  birth_date TEXT NOT NULL,

  full_name TEXT NOT NULL,

  first_register_date TEXT NOT NULL
    DEFAULT CURRENT_TIMESTAMP,

  total_xp INTEGER NOT NULL
    DEFAULT 0
    CHECK(total_xp >= 0),

  urinates INTEGER NOT NULL
    DEFAULT 1
    CHECK(urinates IN (0,1)),

  diagnosis TEXT NOT NULL,

  avatar_id TEXT
);
`;