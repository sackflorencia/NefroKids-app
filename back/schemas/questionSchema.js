export const questionTable = `
CREATE TABLE IF NOT EXISTS question (
  id TEXT PRIMARY KEY,
  level_id TEXT,
  question TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  incorrect_answer1 TEXT NOT NULL,
  incorrect_answer2 TEXT,
  incorrect_answer3 TEXT,
  correct_feedback TEXT NOT NULL,
  incorrect_feedback1 TEXT NOT NULL,
  incorrect_feedback2 TEXT,
  incorrect_feedback3 TEXT,

  explanation TEXT NOT NULL,
  difficulty INTEGER NOT NULL
);
`;