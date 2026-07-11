import { v4 as uuidv4 } from "uuid";

import SectionProgressRepository from "../repositories/SectionProgressRepository";

import LevelSectionController from "./LevelSectionController";

export default class SectionProgressController {

    constructor(db) {

        this.sectionProgressRepository =
            new SectionProgressRepository(db);

        this.levelSectionController =
            new LevelSectionController(db);

    }

    async getSectionsForProgress(
        childProgressId
    ) {

        return await this.sectionProgressRepository
            .getByProgress(
                childProgressId
            );

    }

    async getSectionProgress(
        childProgressId,
        levelSectionId
    ) {

        return await this.sectionProgressRepository
            .getByProgressAndSection(
                childProgressId,
                levelSectionId
            );

    }

    async startSection(
        childProgressId,
        levelSectionId
    ) {

        let progress =
            await this.getSectionProgress(
                childProgressId,
                levelSectionId
            );

        if (progress) {
            return progress;
        }

        progress = {
            id: uuidv4(),
            child_progress_id:
                childProgressId,
            level_section_id:
                levelSectionId,
            status: "en_progreso",
            score: null,
            total: null,
            stars: null,
            xp_gained: 0,
            started_at:
                new Date().toISOString(),
            completed_at: null
        };

        await this.sectionProgressRepository.insert(
            progress
        );

        return progress;

    }

    async completeSection(
        childProgressId,
        levelSectionId,
        data = {}
    ) {

        const progress =
            await this.startSection(
                childProgressId,
                levelSectionId
            );

        const section =
            await this.levelSectionController
                .getSectionById(
                    levelSectionId
                );

        progress.status =
            "completado";

        progress.completed_at =
            new Date().toISOString();

        if (section.type === "quiz") {

            progress.score =
                data.score;

            progress.total =
                data.total;

            progress.stars =
                this.calculateStars(
                    data.score,
                    data.total
                );

            progress.xp_gained =
                this.calculateXp(
                    progress.stars
                );

        }

        await this.sectionProgressRepository.update(
            progress
        );

        return progress;

    }

    async areAllSectionsCompleted(
        childProgressId,
        levelId
    ) {

        const sections =
            await this.levelSectionController
                .getSectionsByLevelId(
                    levelId
                );

        const progress =
            await this.getSectionsForProgress(
                childProgressId
            );

        return sections.every(section =>
            progress.some(p =>
                p.level_section_id === section.id &&
                p.status === "completado"
            )
        );

    }

    async getSectionsForLevel(
        levelId,
        childProgress,
        levelState
    ) {

        const sections =
            await this.levelSectionController
                .getSectionsByLevelId(
                    levelId
                );

        if (levelState === "bloqueado") {

            return sections.map(section => ({
                ...section,
                state: "blocked"
            }));

        }

        if (!childProgress) {

            return sections.map((section, index) => ({
                ...section,
                state:
                    index === 0
                        ? "available"
                        : "blocked"
            }));

        }

        const sectionsProgress =
            await this.getSectionsForProgress(
                childProgress.id
            );

        return sections.map((section, index) => {

            const current =
                sectionsProgress.find(
                    p =>
                        p.level_section_id ===
                        section.id
                );

            if (current) {

                return {
                    ...section,
                    state:
                        current.status ===
                        "completado"
                            ? "completed"
                            : "available"
                };

            }

            if (index === 0) {

                return {
                    ...section,
                    state: "available"
                };

            }

            const previous =
                sectionsProgress.find(
                    p =>
                        p.level_section_id ===
                        sections[index - 1].id
                );

            return {
                ...section,
                state:
                    previous?.status ===
                    "completado"
                        ? "available"
                        : "blocked"
            };

        });

    }

    async updateSectionProgress(
        progress
    ) {

        return await this.sectionProgressRepository
            .update(progress);

    }

    async deleteSectionProgress(
        id
    ) {

        return await this.sectionProgressRepository
            .delete(id);

    }

    calculateStars(
        score,
        total
    ) {

        if (score === total) {
            return 3;
        }

        if (
            score >=
            Math.ceil(total * 0.7)
        ) {
            return 2;
        }

        if (score > 0) {
            return 1;
        }

        return 0;

    }

    calculateXp(
        stars
    ) {

        switch (stars) {

            case 3:
                return 50;

            case 2:
                return 30;

            case 1:
                return 10;

            default:
                return 0;

        }

    }

}