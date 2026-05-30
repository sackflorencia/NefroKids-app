export default class AvatarRepository {

  constructor(db) {
    this.db = db;
  }

  async getAll() {

    const query = `
      SELECT *
      FROM avatars;
    `;

    return await this.db.getAllAsync(query);
  }

  async getById(id) {

    const query = `
      SELECT *
      FROM avatars
      WHERE id = ?;
    `;

    return await this.db.getFirstAsync(
      query,
      [id]
    );
  }

}