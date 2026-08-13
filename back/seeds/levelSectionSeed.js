import LevelSectionRepository from "../repositories/LevelSectionRepository";

const sections = [
  {
    id: "level1_section1",
    level_id: "level1",
    number: 1,
    name: "Game",
    type: "game",
    display_order: 1
  },

  {
    id: "level1_section2",
    level_id: "level1",
    number: 2,
    name: "Quiz",
    type: "quiz",
    display_order: 2
  },
  {
    id: "level2_section1",
    level_id: "level2",
    number: 1,
    name: "Game",
    type: "game",
    display_order: 1
  },
  {
    id: "level2_section2",
    level_id: "level2",
    number: 2,
    name: "Quiz",
    type: "quiz",
    display_order: 2
  },
  {
    id: "level3_section1",
    level_id: "level3",
    number: 1,
    name: "Game",
    type: "game",
    display_order: 1
  },
  {
    id: "level3_section2",
    level_id: "level3",
    number: 2,
    name: "Quiz",
    type: "quiz",
    display_order: 2
  },
  {
    id: "level4_section1",
    level_id: "level4",
    number: 1,
    name: "Game",
    type: "game",
    display_order: 1
  },
  {
    id: "level4_section2",
    level_id: "level4",
    number: 2,
    name: "Quiz",
    type: "quiz",
    display_order: 2
  }
];
export async function seedLevelSections(db) {
  const repository = new LevelSectionRepository(db);

  for (const section of sections) {
    console.log("INSERTANDO SECTION:", section);

    const existing = await repository.getById(section.id);

    if (!existing) {
      console.log(
        "INSERTANDO - level_id:",
        section.level_id
      );

      await repository.insert(section);

      console.log(`SECTION SEEDED: ${section.id}`);
    } else {
      console.log(`SECTION YA EXISTE: ${section.id}`);
    }
  }

  console.log("LEVEL SECTIONS SEEDED");
}