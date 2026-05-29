export default class ReviewRepository {

  constructor(db) {
    this.db = db;
  }

  async insert(review) {

    const query = `
      INSERT INTO review (
        id,
        question,
        correct_answer,
        incorrect_answer1,
        incorrect_answer2,
        incorrect_answer3
      )
      VALUES (?, ?, ?, ?, ?, ?);
    `;

    await this.db.runAsync(
      query,
      [
        review.id,
        review.question,
        review.correct_answer,
        review.incorrect_answer1,
        review.incorrect_answer2,
        review.incorrect_answer3
      ]
    );
  }

  async getAll() {

    const query = `
      SELECT *
      FROM review;
    `;

    return await this.db.getAllAsync(query);
  }

  async getById(id) {

    const query = `
      SELECT *
      FROM review
      WHERE id = ?;
    `;

    return await this.db.getFirstAsync(query, [id]);
  }

  async update(review) {

    const query = `
      UPDATE review
      SET
        question = ?,
        correct_answer = ?,
        incorrect_answer1 = ?,
        incorrect_answer2 = ?,
        incorrect_answer3 = ?
      WHERE id = ?;
    `;

    await this.db.runAsync(
      query,
      [
        review.question,
        review.correct_answer,
        review.incorrect_answer1,
        review.incorrect_answer2,
        review.incorrect_answer3,
        review.id
      ]
    );
  }

  async delete(id) {

    const query = `
      DELETE FROM review
      WHERE id = ?;
    `;

    await this.db.runAsync(query, [id]);
  }
}