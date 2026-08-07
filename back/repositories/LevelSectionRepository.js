export default class LevelSectionRepository {

  constructor(db) {
    this.db = db;
  }

  async insert(section) {

    const query = `
      INSERT INTO level_sections (
        id,
        level_id,
        number,
        name,
        type,
        display_order
      )
      VALUES (?, ?, ?, ?, ?, ?);
    `;

    await this.db.runAsync(query, [
      section.id,
      section.level_id,
      section.number,
      section.name,
      section.type,
      section.display_order
    ]);

  }

  async getAll() {

    const query = `
      SELECT *
      FROM level_sections
      ORDER BY level_id, display_order;
    `;

    return await this.db.getAllAsync(query);

  }

  async getById(id) {

    const query = `
      SELECT *
      FROM level_sections
      WHERE id = ?;
    `;

    return await this.db.getFirstAsync(query, [id]);

  }

  async getByLevelId(levelId) {

    const query = `
      SELECT *
      FROM level_sections
      WHERE level_id = ?
      ORDER BY display_order;
    `;

    return await this.db.getAllAsync(query, [levelId]);

  }

  async update(section) {

    const query = `
      UPDATE level_sections
      SET
        level_id = ?,
        number = ?,
        name = ?,
        type = ?,
        display_order = ?
      WHERE id = ?;
    `;

    await this.db.runAsync(query, [
      section.level_id,
      section.number,
      section.name,
      section.type,
      section.display_order,
      section.id
    ]);

  }

  async delete(id) {

    const query = `
      DELETE FROM level_sections
      WHERE id = ?;
    `;

    await this.db.runAsync(query, [id]);

  }

}