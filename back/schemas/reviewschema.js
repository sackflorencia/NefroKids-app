export const reviewTable = `
CREATE TABLE IF NOT EXISTS review (

  id TEXT PRIMARY KEY,

  Question TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  incorrect_answer1 TEXT NOT NULL,
  incorrect_answer2 TEXT
  incorrect_answer3 TEXT
);
`;