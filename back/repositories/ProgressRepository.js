export default class ProgressRepository {

  constructor(db) {
    this.db = db;
  }

  async insert(progress) {

    const query = `
      INSERT INTO child_progress (
        id,
        child_id,
        level_id,
        status,
        section1_completed,
        section2_completed,
        quiz_score,
        quiz_total,
        stars,
        xp_gained,
        started_at,
        completed_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    await this.db.runAsync(query, [
      progress.id,
      progress.child_id,
      progress.level_id,
      progress.status,
      progress.section1_completed,
      progress.section2_completed,
      progress.quiz_score,
      progress.quiz_total,
      progress.stars,
      progress.xp_gained,
      progress.started_at,
      progress.completed_at,
    ]);

  }

  async getAll() {

    return await this.db.getAllAsync(`
      SELECT *
      FROM child_progress
      ORDER BY level_id ASC;
    `);

  }

  async getById(id) {

    return await this.db.getFirstAsync(`
      SELECT *
      FROM child_progress
      WHERE id = ?;
    `, [id]);

  }
  async getByChild(childId) {

    const query = `
        SELECT *
        FROM child_progress
        WHERE child_id = ?
        ORDER BY level_id;
    `;

    return await this.db.getAllAsync(query, [childId]);

  }

  async getByChildAndLevel(childId, levelId) {

    return await this.db.getFirstAsync(`
      SELECT *
      FROM child_progress
      WHERE child_id = ?
      AND level_id = ?;
    `, [childId, levelId]);

  }

  async update(progress) {

    const query = `
      UPDATE child_progress
      SET
        child_id = ?,
        level_id = ?,
        status = ?,
        section1_completed = ?,
        section2_completed = ?,
        quiz_score = ?,
        quiz_total = ?,
        stars = ?,
        xp_gained = ?,
        started_at = ?,
        completed_at = ?
      WHERE id = ?;
    `;

    await this.db.runAsync(query, [
      progress.child_id,
      progress.level_id,
      progress.status,
      progress.section1_completed,
      progress.section2_completed,
      progress.quiz_score,
      progress.quiz_total,
      progress.stars,
      progress.xp_gained,
      progress.started_at,
      progress.completed_at,
      progress.id,
    ]);

  }

  async completeSection1(progressId) {

    await this.db.runAsync(
      `
      UPDATE child_progress
      SET
        section1_completed = 1
      WHERE id = ?;
      `,
      [progressId]
    );

  }

  async saveQuiz(progressId, score, total, stars, xp, completed) {

    await this.db.runAsync(
      `
      UPDATE child_progress
      SET
        section2_completed = 1,
        quiz_score = ?,
        quiz_total = ?,
        stars = ?,
        xp_gained = ?,
        status = ?,
        completed_at = ?
      WHERE id = ?;
      `,
      [
        score,
        total,
        stars,
        xp,
        completed ? "completado" : "en_progreso",
        completed ? new Date().toISOString() : null,
        progressId,
      ]
    );

  }

  async delete(id) {

    await this.db.runAsync(
      `
      DELETE FROM child_progress
      WHERE id = ?;
      `,
      [id]
    );

  }

}