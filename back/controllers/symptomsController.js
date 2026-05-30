import { v4 as uuidv4 } from "uuid";

import SymptomLogRepository from "../repositories/SymptomLogRepository";

export default class SymptomLogController {

  constructor(db) {
    this.repository = new SymptomLogRepository(db);
  }

  async createCheckIn(data) {

    const symptomLog = {

      id: uuidv4(),

      child_id: data.child_id,

      general_mood: data.general_mood ?? null,

      pain_location: data.pain_location ?? null,

      urine_color: data.urine_color ?? null

    };

    await this.repository.insert(symptomLog);
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async getById(id) {
    return await this.repository.getById(id);
  }

  async getByChildId(childId) {
    return await this.repository.getByChildId(childId);
  }

  async getTodayCheckIn(childId) {
    return await this.repository.getTodayCheckIn(childId);
  }

}