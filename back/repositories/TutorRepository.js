export default class TutorRepository {

  constructor(db) {
    this.db = db;
  }

  async insert(tutor) {

    const query = `
      INSERT INTO tutors (
        id,
        child_id,
        full_name,
        email,
        phone,
        password_hash,
        is_primary
      )
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    await this.db.runAsync(
      query,
      [
        tutor.id,
        tutor.child_id,
        tutor.full_name,
        tutor.email,
        tutor.phone,
        tutor.password_hash,
        tutor.is_primary
      ]
    );
  }

  async getAll() {

    const query = `
      SELECT *
      FROM tutors;
    `;

    return await this.db.getAllAsync(query);
  }

  async getById(id) {

    const query = `
      SELECT *
      FROM tutors
      WHERE id = ?;
    `;

    return await this.db.getFirstAsync(query, [id]);
  }

  async getByChildId(childId) {

    const query = `
      SELECT *
      FROM tutors
      WHERE child_id = ?;
    `;

    return await this.db.getAllAsync(query, [childId]);
  }

  async update(tutor) {

    const query = `
      UPDATE tutors
      SET
        full_name = ?,
        email = ?,
        phone = ?,
        password_hash = ?,
        is_primary = ?
      WHERE id = ?;
    `;

    await this.db.runAsync(
      query,
      [
        tutor.full_name,
        tutor.email,
        tutor.phone,
        tutor.password_hash,
        tutor.is_primary,
        tutor.id
      ]
    );
  }

  async delete(id) {

    const query = `
      DELETE FROM tutors
      WHERE id = ?;
    `;

    await this.db.runAsync(query, [id]);
  }
}