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

    const query = `
      SELECT *
      FROM child_progress
      ORDER BY level_id ASC;
    `;

    return await this.db.getAllAsync(query);

  }

  async getById(id) {

    const query = `
      SELECT *
      FROM child_progress
      WHERE id = ?;
    `;

    return await this.db.getFirstAsync(query, [id]);

  }

  async getByChildAndLevel(childId, levelId) {

    const query = `
      SELECT *
      FROM child_progress
      WHERE child_id = ?
      AND level_id = ?;
    `;

    return await this.db.getFirstAsync(query, [
      childId,
      levelId,
    ]);

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

  async delete(id) {

    const query = `
      DELETE FROM child_progress
      WHERE id = ?;
    `;

    await this.db.runAsync(query, [id]);

  }

}