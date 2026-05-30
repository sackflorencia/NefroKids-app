export default class UserRepository {

  constructor(db) {
    this.db = db;
  }

  async insert(users) {

    const query = `
      INSERT INTO users (
        id,
        birth_date,
        full_name,
        total_xp,
        urinates,
        diagnosis,
        avatar_id
      )
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    await this.db.runAsync(
      query,
      [
        users.id,
        users.birth_date,
        users.full_name,
        users.total_xp,
        users.urinates,
        users.diagnosis,
        users.avatar_id
      ]
    );
  }

  async getAll() {

    const query = `
      SELECT *
      FROM users
      ORDER BY id ASC;
    `;

    return await this.db.getAllAsync(query);
  }

  async getById(id) {

    const query = `
      SELECT *
      FROM users
      WHERE id = ?;
    `;

    return await this.db.getFirstAsync(query, [id]);
  }

  async getCurrentUser() {

    const query = `
      SELECT *
      FROM users
      LIMIT 1;
    `;

    return await this.db.getFirstAsync(query);
  }

  async update(users) {

    const query = `
      UPDATE users
      SET
        birth_date= ?,
        full_name= ?,
        total_xp= ?,
        urinates= ?,
        diagnosis= ?,
        avatar_id = ?
      WHERE id = ?;
    `;

    await this.db.runAsync(
      query,
      [
        users.birth_date,
        users.full_name,
        users.total_xp,
        users.urinates,
        users.diagnosis,
        users.avatar_id,
        users.id
      ]
    );
  }

  async delete(id) {

    const query = `
      DELETE FROM users
      WHERE id = ?;
    `;

    await this.db.runAsync(query, [id]);

  }

}