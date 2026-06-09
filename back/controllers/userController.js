import UserRepository from "../repositories/UserRepository";
import { v4 as uuidv4 } from "uuid";

export default class UserController {

  constructor(db) {
    this.repository = new UserRepository(db);
  }

  async createUser(data) {
    const user = {
      id: uuidv4(),
      birth_date: data.birth_date,
      full_name: data.full_name,
      diagnosis: data.diagnosis,
      urinates: data.urinates,
    };
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