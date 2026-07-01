export default class LevelRepository {

  constructor(db) {
    this.db = db;
  }

  async insert(level) {

    const query = `
      INSERT INTO level (
        id,
        numero,
        nombre,
        descripcion,
        xp_reward
      )
      VALUES (?, ?, ?, ?, ?);
    `;

    await this.db.runAsync(query, [
      level.id,
      level.numero,
      level.nombre,
      level.descripcion,
      level.xp_reward
    ]);
  }

  async getAll() {

    const query = `
      SELECT *
      FROM level
      ORDER BY numero ASC;
    `;

    return await this.db.getAllAsync(query);
  }

  async getById(id) {

    const query = `
      SELECT *
      FROM level
      WHERE id = ?;
    `;

    return await this.db.getFirstAsync(query, [id]);
  }

  async getByNumber(numero) {

    const query = `
      SELECT *
      FROM level
      WHERE numero = ?;
    `;

    return await this.db.getFirstAsync(query, [numero]);
  }

  async update(level) {

    const query = `
      UPDATE level
      SET
        numero = ?,
        nombre = ?,
        descripcion = ?,
        xp_reward = ?
      WHERE id = ?;
    `;

    await this.db.runAsync(query, [
      level.numero,
      level.nombre,
      level.descripcion,
      level.xp_reward,
      level.id
    ]);
  }

  async delete(id) {

    const query = `
      DELETE FROM level
      WHERE id = ?;
    `;

    await this.db.runAsync(query, [id]);
  }
}