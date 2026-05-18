
import GameRepository from "../repositories/GameRepository";

export default class GameController {

  constructor(db) {
    this.repository = new GameRepository(db);
  }

  async getLevels() {
    return await this.repository.getAll();
  }

}