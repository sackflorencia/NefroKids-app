export default class RankRepository {

  constructor(db) {
    this.db = db;
  }

  async insert(rank_definitions) {

    const query = `
      INSERT INTO rank_definitions (
        id,
        title,
        min_xp,
        max_xp,
        badge_url
      )
      VALUES (?, ?, ?, ?, ?);
    `;

    await this.db.runAsync(
      query,
      [
        rank_definitions.id,
        rank_definitions.title,
        rank_definitions.min_xp,
        rank_definitions.max_xp,
        rank_definitions.badge_url
      ]
    );
  }

  async getAll() {

    const query = `
      SELECT *
      FROM rank_definitions
      ORDER BY id ASC;
    `;

    return await this.db.getAllAsync(query);
  }

  async getById(id) {

    const query = `
      SELECT *
      FROM rank_definitions
      WHERE id = ?;
    `;

    return await this.db.getFirstAsync(query, [id]);
  }

  async update(rank_definitions) {

    const query = `
      UPDATE rank_definitions
      SET
        title = ?,
        min_xp = ?,
        max_xp = ?,
        badge_url = ?
      WHERE id = ?;
    `;

    await this.db.runAsync(
      query,
      [
        rank_definitions.title,
        rank_definitions.min_xp,
        rank_definitions.max_xp,
        rank_definitions.badge_url,
        rank_definitions.id
      ]
    );
  }

  async delete(id) {

    const query = `
      DELETE FROM rank_definitions
      WHERE id = ?;
    `;

    await this.db.runAsync(query, [id]);
    
  }

}