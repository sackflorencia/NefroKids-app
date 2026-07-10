export default class SectionProgressRepository {

  constructor(db) {
    this.db = db;
  }

  async insert(progress) {

    await this.db.runAsync(
      `
      INSERT INTO child_section_progress (
        id,
        child_progress_id,
        level_section_id,
        status,
        score,
        total,
        stars,
        xp_gained,
        started_at,
        completed_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
      [
        progress.id,
        progress.child_progress_id,
        progress.level_section_id,
        progress.status,
        progress.score,
        progress.total,
        progress.stars,
        progress.xp_gained,
        progress.started_at,
        progress.completed_at,
      ]
    );

  }

  async getById(id) {

    return await this.db.getFirstAsync(
      `
      SELECT *
      FROM child_section_progress
      WHERE id = ?;
      `,
      [id]
    );

  }

  async getByProgress(childProgressId) {

    return await this.db.getAllAsync(
      `
      SELECT *
      FROM child_section_progress
      WHERE child_progress_id = ?
      ORDER BY level_section_id;
      `,
      [childProgressId]
    );

  }

  async getByProgressAndSection(
    childProgressId,
    levelSectionId
  ) {

    return await this.db.getFirstAsync(
      `
      SELECT *
      FROM child_section_progress
      WHERE child_progress_id = ?
      AND level_section_id = ?;
      `,
      [
        childProgressId,
        levelSectionId
      ]
    );

  }

  async update(progress) {

    await this.db.runAsync(
      `
      UPDATE child_section_progress
      SET
        status = ?,
        score = ?,
        total = ?,
        stars = ?,
        xp_gained = ?,
        started_at = ?,
        completed_at = ?
      WHERE id = ?;
      `,
      [
        progress.status,
        progress.score,
        progress.total,
        progress.stars,
        progress.xp_gained,
        progress.started_at,
        progress.completed_at,
        progress.id,
      ]
    );

  }

  async delete(id) {

    await this.db.runAsync(
      `
      DELETE FROM child_section_progress
      WHERE id = ?;
      `,
      [id]
    );

  }

}