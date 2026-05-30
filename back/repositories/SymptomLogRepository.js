export default class SymptomLogRepository {

  constructor(db) {
    this.db = db;
  }
  async getAll() {

    const query = `
    SELECT *
    FROM symptom_logs
    ORDER BY logged_at DESC;
  `;

    return await this.db.getAllAsync(query);
  }
  async getById(id) {

    const query = `
    SELECT *
    FROM symptom_logs
    WHERE id = ?;
  `;

    return await this.db.getFirstAsync(query, [id]);
  }
  async getByChildId(childId) {

    const query = `
    SELECT *
    FROM symptom_logs
    WHERE child_id = ?
    ORDER BY logged_at DESC;
  `;

    return await this.db.getAllAsync(query, [childId]);
  }
  async getTodayCheckIn(childId) {

    const query = `
    SELECT *
    FROM symptom_logs
    WHERE child_id = ?
      AND DATE(logged_at) = DATE('now', 'localtime')
    LIMIT 1;
  `;

    return await this.db.getFirstAsync(
      query,
      [childId]
    );
  }
  async insert(symptomLog) {

    const query = `
      INSERT INTO symptom_logs (
        id,
        child_id,
        general_mood,
        pain_location,
        urine_color
      )
      VALUES (?, ?, ?, ?, ?);
    `;

    await this.db.runAsync(
      query,
      [
        symptomLog.id,
        symptomLog.child_id,
        symptomLog.general_mood,
        symptomLog.pain_location,
        symptomLog.urine_color
      ]
    );
  }

}