import { v4 as uuidv4 } from "uuid";

import LevelSectionRepository from "../repositories/LevelSectionRepository";

export default class LevelSectionController {

  constructor(db) {
    this.repository = new LevelSectionRepository(db);
  }

  async createSection(data) {

    const section = {
      id: uuidv4(),
      level_id: data.level_id,
      number: data.number,
      name: data.name,
      type: data.type,
      display_order: data.display_order,
    };

    await this.repository.insert(section);

    return section;

  }

  async getAllSections() {
    return await this.repository.getAll();
  }

  async getSectionById(id) {
    return await this.repository.getById(id);
  }

  async getSectionsByLevelId(levelId) {
    return await this.repository.getByLevelId(levelId);
  }

  async updateSection(section) {
    await this.repository.update(section);
  }

  async deleteSection(id) {
    await this.repository.delete(id);
  }

}