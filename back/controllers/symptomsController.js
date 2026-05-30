import { v4 as uuidv4 } from "uuid";
import SymptomLogRepository from "../repositories/SymptomLogRepository";
import UserController from "./userController";
export default class SymptomLogController {

  constructor(db) {
    this.db = db;
    this.repository =
      new SymptomLogRepository(db);
  }

  async createCheckIn(data) {
    const userController = new UserController(this.db);
    const currentUser = await userController.getCurrentUser();

    const symptomLog = {
      id: uuidv4(),
      child_id: currentUser.id,
      general_mood: data.general_mood ?? null,
      pain_location: data.pain_location ?? null,
      urine_color: data.urine_color ?? null
    };
    await this.repository.insert(
      symptomLog
    );
    return symptomLog;
  }

  async updateCheckIn(id, data) {
    const symptomLog = {
      id,
      general_mood: data.general_mood ?? null,
      pain_location: data.pain_location ?? null,
      urine_color: data.urine_color ?? null
    };

    await this.repository.update(
      symptomLog
    );

    return symptomLog;
  }

  async updateTodayCheckIn(data) {
    const todayCheckIn = await this.getCurrentUserTodayCheckIn();
    if (!todayCheckIn) {
      throw new Error(
        "No existe check-in para hoy"
      );
    }
    return await this.updateCheckIn(
      todayCheckIn.id,
      data
    );
  }

  async hasCurrentUserCheckInToday() {
    const checkIn = await this.getCurrentUserTodayCheckIn();
    return checkIn !== null;
  }

  async getCurrentUserTodayCheckIn() {
    const userController = new UserController(this.db);
    const currentUser = await userController.getCurrentUser();
    return await this.repository.getTodayCheckIn(
      currentUser.id
    );
  }

  async getAll() {
    return await this.repository.getAll();
  }
  async getById(id) {
    return await this.repository.getById(id);
  }

  async getByChildId(childId) {
    return await this.repository.getByChildId(
      childId
    );
  }

  async delete(id) {
    await this.repository.delete(id);
  }
  
  async saveTodayCheckIn(data) {

    const hasCheckIn =
      await this.hasCurrentUserCheckInToday();

    if (hasCheckIn) {

      return await this.updateTodayCheckIn(
        data
      );
    }

    return await this.createCheckIn(
      data
    );
  }

}