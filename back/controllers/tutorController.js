import TutorRepository from "../repositories/TutorRepository";

export default class TutorController {

  constructor(db) {
    this.repository = new TutorRepository(db);
  }

  async getAllTutors() {
    return await this.repository.getAll();
  }

  async getTutorById(id) {
    return await this.repository.getById(id);
  }

  async getTutorsByChildId(childId) {
    return await this.repository.getByChildId(childId);
  }

  async createTutor(tutor) {
    await this.repository.insert(tutor);
  }

  async updateTutor(tutor) {
    await this.repository.update(tutor);
  }

  async deleteTutor(id) {
    await this.repository.delete(id);
  }
}