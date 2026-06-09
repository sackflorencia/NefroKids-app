import TutorRepository from "../repositories/TutorRepository";
import { v4 as uuidv4 } from "uuid";

export default class TutorController {

  constructor(db) {
    this.repository = new TutorRepository(db);
  }

  async createTutor(data) {

    const tutor = {
      id: uuidv4(),
      child_id: data.child_id,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone ?? null,
      relationship: data.relationship,
      is_primary: data.is_primary ?? 0,
    };

    await this.repository.insert(tutor);

    return tutor;
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

  async updateTutor(tutor) {
    await this.repository.update(tutor);
  }

  async deleteTutor(id) {
    await this.repository.delete(id);
  }
}