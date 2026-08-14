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
      urinates: data.urinates,
      total_xp: 0,
      avatar_id: null,
      first_register_date: new Date().toISOString(),
    };
    await this.repository.insert(user);
    return user;
  }

  async createUserFromFirestore(child) {

    const user = {
      id: child.id,
      birth_date: child.birth_date,
      full_name: child.full_name,
      urinates: child.urinates ? 1 : 0,
      total_xp: child.total_xp ?? 0,
      avatar_id: child.avatar_id ?? null,
      first_register_date:
        child.first_register_date ??
        new Date().toISOString(),
    };

    console.log(
      "USER DESDE FIRESTORE:",
      user
    );

    await this.repository.insert(user);

    return user;
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