export const rankDefinitionsTable = `
CREATE TABLE IF NOT EXISTS rank_definitions (

  id TEXT PRIMARY KEY,

  title TEXT NOT NULL,

  min_xp INTEGER NOT NULL
    CHECK(min_xp >= 0),

  max_xp INTEGER NOT NULL
    CHECK(max_xp >= min_xp),

  badge_url TEXT,

  description TEXT
);
`;