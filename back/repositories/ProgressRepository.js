export default class ProgressRepository {

  constructor(db) {
    this.db = db;
  }

  async insert(child_progress) {

    const query = `
      INSERT INTO child_progress (
        id,
        child_id,
        level_id,
        status,
        attempts,
        xp_gained,
        started_at,
        completed_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;

    await this.db.runAsync(
      query,
      [
        child_progress.id,
        child_progress.child_id,
        child_progress.level_id,
        child_progress.status,
        child_progress. attempts,
        child_progress.xp_gained,
        child_progress.started_at,
        child_progress.completed_at
      ]
    );
  }

  async getAll() {

    const query = `
      SELECT *
      FROM child_progress
      ORDER BY id ASC;
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

  async update(child_progress) {

    const query = `
      UPDATE child_progress
      SET
       child_id= ?,
        level_id= ?,
        status= ?,
        attempts= ?,
        xp_gained= ?,
        started_at= ?,
        completed_at = ?
      WHERE id = ?;
    `;

    await this.db.runAsync(
      query,
      [
        child_progress.child_id,
        child_progress.level_id,
        child_progress.status,
        child_progress. attempts,
        child_progress.xp_gained,
        child_progress.started_at,
        child_progress.completed_at,
        child_progress.id
      ]
    );
  }

  async delete(id) {

    const query = `
      DELETE FROM child_progress
      WHERE id = ?;
    `;

    await this.db.runAsync(query, [id]);
    
  }

}