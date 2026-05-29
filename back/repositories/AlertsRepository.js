export default class AlertsRepository {

  constructor(db) {
    this.db = db;
  }

  async insert(alerts) {

    const query = `
      INSERT INTO alerts (
        id,
        symptom_log_id,
        alert_type,
        message,
        triggered_at
      )
      VALUES (?, ?, ?, ?, ?);
    `;

    await this.db.runAsync(
      query,
      [
        alerts.id,
        alerts.symptom_log_id,
        alerts.alert_type,
        alerts.message,
        alerts.triggered_at
      ]
    );
  }

  async getAll() {

    const query = `
      SELECT *
      FROM alerts
      ORDER BY id ASC;
    `;

    return await this.db.getAllAsync(query);
  }

  async getById(id) {

    const query = `
      SELECT *
      FROM alerts
      WHERE id = ?;
    `;

    return await this.db.getFirstAsync(query, [id]);
  }

  async update(alerts) {

    const query = `
      UPDATE alerts
      SET
        symptom_log_id = ?,
        alert_type = ?,
        message = ?,
        triggered_at = ?
      WHERE id = ?;
    `;

    await this.db.runAsync(
      query,
      [
        alerts.symptom_log_id,
        alerts.alert_type,
        alerts.message,
        alerts.triggered_at,
        alerts.id
      ]
    );
  }

  async delete(id) {

    const query = `
      DELETE FROM alerts
      WHERE id = ?;
    `;

    await this.db.runAsync(query, [id]);
    
  }

}