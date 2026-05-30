export const appointmentWeekdaysTable = `
CREATE TABLE IF NOT EXISTS appointmentWeekdays (

   id TEXT PRIMARY KEY,

  rule_id TEXT NOT NULL,

  weekday INTEGER NOT NULL,

  time TEXT NOT NULL
);
`;