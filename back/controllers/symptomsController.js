import SymptomLogRepository from "../repositories/SymptomLogRepository";

export default class SymptomLogController {

  constructor(db) {
    this.repository = new SymptomLogRepository(db);
  }

  async createCheckIn(data) {

    const symptomLog = {
      id: crypto.randomUUID(),

      child_id: data.child_id,

      general_mood: data.general_mood,

      pain_level: data.pain_level ?? 0,

      energy_level: data.energy_level ?? 5,

      urine_color: data.urine_color,

      is_swollen: data.is_swollen ?? 0,

      notes: data.notes ?? ""
    };

    await this.repository.insert(symptomLog);
  }

}