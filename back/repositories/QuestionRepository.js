export default class QuestionRepository {

  constructor(db) {
    this.db = db;
  }

  async insert(q) {
    const query = `
      INSERT INTO question (
        id,
        level_id,
        question,
        correct_answer,
        incorrect_answer1,
        incorrect_answer2,
        incorrect_answer3,
        correct_feedback,
        incorrect_feedback1,
        incorrect_feedback2,
        incorrect_feedback3,
        explanation,
        difficulty
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    await this.db.runAsync(query, [
      q.id,
      q.game_id,
      q.question,
      q.correct_answer,
      q.incorrect_answer1,
      q.incorrect_answer2,
      q.incorrect_answer3,
      q.correct_feedback,
      q.incorrect_feedback1,
      q.incorrect_feedback2,
      q.incorrect_feedback3,
      q.explanation,
      q.difficulty
    ]);
  }

  async getById(id) {
    return this.db.getFirstAsync(
      `SELECT * FROM question WHERE id = ?`,
      [id]
    );
  }

  async getByLevel(levelId) {
    return this.db.getAllAsync(
      `SELECT * FROM question WHERE level_id = ?`,
      [levelId]
    );
  }

  async getRandomByLevel(levelId, limit = 3) {
    return this.db.getAllAsync(
      `
      SELECT *
      FROM question
      WHERE level_id = ?
      ORDER BY RANDOM()
      LIMIT ?
      `,
      [levelId, limit]
    );
  }
}