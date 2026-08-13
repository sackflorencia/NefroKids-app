import LevelRepository from "../repositories/LevelRepository";
import Level from "../models/levelModel";

export async function seedLevels(db) {

  const repository = new LevelRepository(db);

  const initialLevels = [

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
    new Level(
      "level3",
      3,
      "Preparado de bolsas",
      "Preparar correctamente la bolsa de diálisis antes de la conexión",
      50
    ),
    new Level(
      "level4",
      4,
      "Conexión de las bolsas",
      "Conectar correctamente todo el sistema",
      50
    )

  ];

  for (const level of initialLevels) {
    const existing = await repository.getById(level.id);

    if (!existing) {
      await repository.insert(level);
      console.log(`LEVEL SEEDED: ${level.id}`);
    }
  }

  console.log("LEVELS SEEDED");
}