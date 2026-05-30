export const reportHistoryTable = `
CREATE TABLE IF NOT EXISTS reportHistory (

  id TEXT PRIMARY KEY,

    child_id TEXT NOT NULL,

    generated_at TEXT NOT NULL,

    period_start TEXT NOT NULL,

    period_end TEXT NOT NULL,

    status TEXT
);
`;