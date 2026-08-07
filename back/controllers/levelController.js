
import LevelRepository from "../repositories/LevelRepository";

export default class LevelController {

  constructor(db) {
    this.repository = new LevelRepository(db);
  }

  async getLevels() {
    return await this.repository.getAll();
  }

}