export default class GameRepository {

  constructor(db) {
    this.db = db;
  }

  async insert(game) {

    const query = `
      INSERT INTO game (
        id,
        Numero,
        nombre,
        descripcion,
        xp_reward
      )
      VALUES (?, ?, ?, ?, ?);
    `;

    await this.db.runAsync(
      query,
      [
        game.id,
        game.numero,
        game.nombre,
        game.descripcion,
        game.xp_reward
      ]
    );
  }

  async getAll() {

    const query = `
      SELECT *
      FROM game
      ORDER BY Numero ASC;
    `;

    return await this.db.getAllAsync(query);
  }

  async getById(id) {

    const query = `
      SELECT *
      FROM game
      WHERE id = ?;
    `;

    return await this.db.getFirstAsync(query, [id]);
  }

  async update(game) {

    const query = `
      UPDATE game
      SET
        Numero = ?,
        nombre = ?,
        descripcion = ?,
        xp_reward = ?
      WHERE id = ?;
    `;

    await this.db.runAsync(
      query,
      [
        game.numero,
        game.nombre,
        game.descripcion,
        game.xp_reward,
        game.id
      ]
    );
  }

  async delete(id) {

    const query = `
      DELETE FROM game
      WHERE id = ?;
    `;

    await this.db.runAsync(query, [id]);
  }

}