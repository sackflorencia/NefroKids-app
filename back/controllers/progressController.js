import { v4 as uuidv4 } from "uuid";

import ProgressRepository from "../repositories/ProgressRepository";

import LevelController from "./levelController";
import SectionProgressController from "./sectionProgressController";

export default class ProgressController {

    constructor(db) {

        this.progressRepository =
            new ProgressRepository(db);

        this.levelController =
            new LevelController(db);

        this.sectionProgressController =
            new SectionProgressController(db);

    }

    async getAllProgress() {

        return await this.progressRepository.getAll();

    }

    async getProgressById(id) {

        return await this.progressRepository.getById(id);

    }

    async getProgressByChildAndLevel(
        childId,
        levelId
    ) {

        return await this.progressRepository
            .getByChildAndLevel(
                childId,
                levelId
            );

    }

    async getLevelsForChild(childId) {

        const levels =
            await this.levelController.getLevels();

        const allProgress =
            await this.progressRepository.getByChild(
                childId
            );

        const result = [];

        for (let index = 0; index < levels.length; index++) {

            const level = levels[index];

            const currentProgress =
                allProgress.find(
                    p => p.level_id === level.id
                );

            const state = this.getLevelState(
                currentProgress,
                allProgress,
                levels,
                index
            );

            const sections =
                await this.sectionProgressController
                    .getSectionsForLevel(
                        level.id,
                        currentProgress,
                        state
                    );

            result.push({
                ...level,
                state,
                sections
            });

        }

        return result;

    }

    getLevelState(
        currentProgress,
        allProgress,
        levels,
        index
    ) {

        if (currentProgress) {
            return currentProgress.status;
        }

        if (index === 0) {
            return "disponible";
        }

        const previousLevel = levels[index - 1];

        const previousProgress =
            allProgress.find(
                p => p.level_id === previousLevel.id
            );

        return previousProgress?.status === "completado"
            ? "disponible"
            : "bloqueado";

    }

    async startLevel(
        childId,
        levelId
    ) {

        let progress =
            await this.getProgressByChildAndLevel(
                childId,
                levelId
            );

        if (progress) {
            return progress;
        }

        progress = {
            id: uuidv4(),
            child_id: childId,
            level_id: levelId,
            status: "en_progreso",
            started_at: new Date().toISOString(),
            completed_at: null
        };

        await this.progressRepository.insert(
            progress
        );

        return progress;

    }

    async completeSection(
        childId,
        levelId,
        levelSectionId,
        data = {}
    ) {

        const levelProgress =
            await this.startLevel(
                childId,
                levelId
            );

        const sectionProgress =
            await this.sectionProgressController
                .completeSection(
                    levelProgress.id,
                    levelSectionId,
                    data
                );

        const completed =
            await this.sectionProgressController
                .areAllSectionsCompleted(
                    levelProgress.id,
                    levelId
                );

        if (completed) {

            await this.completeLevel(
                levelProgress.id
            );

        }

        return sectionProgress;

    }

    async completeLevel(
        progressId
    ) {

        await this.progressRepository.complete(
            progressId
        );

    }

    async createProgress(progress) {

        return await this.progressRepository.insert(
            progress
        );

    }

    async updateProgress(progress) {

        return await this.progressRepository.update(
            progress
        );

    }

    async deleteProgress(id) {

        return await this.progressRepository.delete(
            id
        );

    }

}