export default class SymptomLogRepository {

  constructor(db) {
    this.db = db;
  }

  async insert(symptomLog) {

    const query = `
      INSERT INTO symptom_logs (
        id,
        child_id,
        general_mood,
        pain_level,
        energy_level,
        urine_color,
        is_swollen,
        notes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;

    await this.db.runAsync(
      query,
      [
        symptomLog.id,
        symptomLog.child_id,
        symptomLog.general_mood,
        symptomLog.pain_level,
        symptomLog.energy_level,
        symptomLog.urine_color,
        symptomLog.is_swollen,
        symptomLog.notes
      ]
    );
  }

}