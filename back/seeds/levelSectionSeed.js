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
  }
];
export async function seedLevelSections(db) {
  const repository = new LevelSectionRepository(db);
  for (const section of sections) {
    const existing = await repository.getById(section.id);
    if (!existing) {
      await repository.insert(section);
    }
  }
  console.log("LEVEL SECTIONS SEEDED");
}