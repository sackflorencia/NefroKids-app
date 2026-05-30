import AppointmentWeekdayRepository from "../repositories/AppointmentWeekdayRepository";

export default class AppointmentWeekdayController {

  constructor(db) {
    this.repository = new AppointmentWeekdayRepository(db);
  }

  async createWeekday(weekday) {
    await this.repository.insert(weekday);
  }

  async getWeekday(id) {
    return await this.repository.getById(id);
  }

  async getRuleWeekdays(ruleId) {
    return await this.repository.getByRuleId(ruleId);
  }

  async updateWeekday(weekday) {
    await this.repository.update(weekday);
  }

  async deleteWeekday(id) {
    await this.repository.delete(id);
  }
  async deleteRuleWeekdays(ruleId) {
    await this.repository.deleteByRuleId(ruleId);
  }

}