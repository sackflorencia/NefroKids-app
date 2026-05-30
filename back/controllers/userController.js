import UserRepository from "../repositories/UserRepository";

export default class UserController {

  constructor(db) {
    this.repository = new UserRepository(db);
  }

  async createUser(user) {
    await this.repository.insert(user);
  }

  async getAllUsers() {
    return await this.repository.getAll();
  }

  async getUserById(id) {
    return await this.repository.getById(id);
  }

  async getCurrentUser() {
    return await this.repository.getCurrentUser();
  }

  async updateUser(user) {
    await this.repository.update(user);
  }

  async deleteUser(id) {
    await this.repository.delete(id);
  }

}