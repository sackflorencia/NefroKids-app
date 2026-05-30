import UserRepository from "../repositories/UserRepository";
import User from "../models/User";

export async function seedUsers(db) {

  const repository = new UserRepository(db);

  const users = await repository.getAll();

  if (users.length > 0) {
    return;
  }

  const initialUser = new User(
    "child_1",
    "2018-04-15",
    "Mateo González",
    "Enfermedad Renal Crónica",
    0,
    1,
    null
  );

  await repository.insert(initialUser);

  console.log("USER SEEDED");
}