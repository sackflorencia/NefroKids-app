import GameRepository from "../repositories/GameRepository";
import Game from "../models/gameModel";

export async function seedGames(db) {

  const repository = new GameRepository(db);

  const games = await repository.getAll();

  if (games.length > 0) {
    return;
  }

  const initialGames = [

    new Game(
      "conexion_sistema_lvl1",
      1,
      "Conexión del Sistema",
      "Lavarse las manos y prepararse correctamente.",
      50
    ),
    new Game(
      "Preparación_materiales_lvl2",
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