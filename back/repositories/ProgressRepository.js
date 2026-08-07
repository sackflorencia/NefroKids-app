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
        started_at,
        completed_at
      )
      VALUES (?, ?, ?, ?, ?, ?);
    `;

    await this.db.runAsync(query, [
      progress.id,
      progress.child_id,
      progress.level_id,
      progress.status,
      progress.started_at,
      progress.completed_at,
    ]);

  }

  async getAll() {

    return await this.db.getAllAsync(`
      SELECT *
      FROM child_progress
      ORDER BY level_id;
    `);

  }

  async getById(id) {

    return await this.db.getFirstAsync(
      `
      SELECT *
      FROM child_progress
      WHERE id = ?;
      `,
      [id]
    );

  }

  async getByChild(childId) {

    return await this.db.getAllAsync(
      `
      SELECT *
      FROM child_progress
      WHERE child_id = ?
      ORDER BY level_id;
      `,
      [childId]
    );

  }

  async getByChildAndLevel(childId, levelId) {

    return await this.db.getFirstAsync(
      `
      SELECT *
      FROM child_progress
      WHERE child_id = ?
      AND level_id = ?;
      `,
      [childId, levelId]
    );

  }

  async update(progress) {

    await this.db.runAsync(
      `
      UPDATE child_progress
      SET
        child_id = ?,
        level_id = ?,
        status = ?,
        started_at = ?,
        completed_at = ?
      WHERE id = ?;
      `,
      [
        progress.child_id,
        progress.level_id,
        progress.status,
        progress.started_at,
        progress.completed_at,
        progress.id,
      ]
    );

  }

  async complete(progressId) {

    await this.db.runAsync(
      `
      UPDATE child_progress
      SET
        status = 'completado',
        completed_at = ?
      WHERE id = ?;
      `,
      [
        new Date().toISOString(),
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