import AppointmentRuleRepository from "../repositories/AppointmentRuleRepository";

export default class AppointmentRuleController {

  constructor(db) {
    this.repository = new AppointmentRuleRepository(db);
  }

  async createRule(rule) {
    await this.repository.insert(rule);
  }

  async getRule(id) {
    return await this.repository.getById(id);
  }

  async getRulesByChild(childId) {
    return await this.repository.getByChildId(childId);
  }

  async getActiveRules(childId) {
    return await this.repository.getActiveByChildId(childId);
  }

  async updateRule(rule) {
    await this.repository.update(rule);
  }

  async deactivateRule(id) {
    await this.repository.deactivate(id);
  }

}