export const gameTable = `
CREATE TABLE IF NOT EXISTS game (

  numero INTEGER NOT NULL,
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
    descripcion TEXT NOT NULL,
  xp_reward INTEGER NOT NULL DEFAULT 0

);
`;