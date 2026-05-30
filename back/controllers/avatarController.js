import AvatarRepository from "../repositories/AvatarRepository";

export default class AvatarController {

  constructor(db) {
    this.repository = new AvatarRepository(db);
  }

  async getAvatars() {
    return await this.repository.getAll();
  }

  async getAvatar(id) {
    return await this.repository.getById(id);
  }

}