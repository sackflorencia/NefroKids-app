export default class AppointmentRuleRepository {

  constructor(db) {
    this.db = db;
  }

  async insert(rule) {

    const query = `
      INSERT INTO appointmentRules (
        id,
        child_id,
        recurrence_type,
        recurrence_interval,
        start_datetime,
        report_hours_before,
        active
      )
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    await this.db.runAsync(
      query,
      [
        rule.id,
        rule.child_id,
        rule.recurrence_type,
        rule.recurrence_interval,
        rule.start_datetime,
        rule.report_hours_before,
        rule.active ?? 1
      ]
    );
  }

  async getById(id) {

    const query = `
      SELECT *
      FROM appointmentRules
      WHERE id = ?;
    `;

    return await this.db.getFirstAsync(
      query,
      [id]
    );
  }

  async getByChildId(childId) {

    const query = `
      SELECT *
      FROM appointmentRules
      WHERE child_id = ?;
    `;

    return await this.db.getAllAsync(
      query,
      [childId]
    );
  }

  async getActiveByChildId(childId) {

    const query = `
      SELECT *
      FROM appointmentRules
      WHERE child_id = ?
      AND active = 1;
    `;

    return await this.db.getAllAsync(
      query,
      [childId]
    );
  }

  async update(rule) {

    const query = `
      UPDATE appointmentRules
      SET
        recurrence_type = ?,
        recurrence_interval = ?,
        start_datetime = ?,
        report_hours_before = ?,
        active = ?
      WHERE id = ?;
    `;

    await this.db.runAsync(
      query,
      [
        rule.recurrence_type,
        rule.recurrence_interval,
        rule.start_datetime,
        rule.report_hours_before,
        rule.active,
        rule.id
      ]
    );
  }

  async deactivate(id) {

    const query = `
      UPDATE appointmentRules
      SET active = 0
      WHERE id = ?;
    `;

    await this.db.runAsync(query, [id]);
  }

}