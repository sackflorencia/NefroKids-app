import LevelRepository from "../repositories/LevelRepository";
import Level from "../models/levelModel";

export async function seedGames(db) {

  const repository = new LevelRepository(db);

  const games = await repository.getAll();

  if (games.length > 0) {
    return;
  }

  const initialGames = [

    new Level(
      "level1",
      1,
      "Conexión del Sistema",
      "Lavarse las manos y prepararse correctamente.",
      50
    ),
    new Level(
      "level2",
      2,
      "Preparación de materiales",
      "Lavarse las manos y prepararse correctamente.",
      50
    ),

  ];

  for (const game of initialGames) {
    await repository.insert(game);
  }

  console.log("GAMES SEEDED");
}