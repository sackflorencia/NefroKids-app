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

        console.log("GET LEVELS FOR CHILD:", childId);

        const levels =
            await this.levelController.getLevels();

        console.log("LEVELS:", levels);

        const allProgress =
            await this.progressRepository.getByChild(
                childId
            );

        console.log("PROGRESS:", allProgress);

        const result = [];

        for (let index = 0; index < levels.length; index++) {

            const level = levels[index];

            console.log("CURRENT LEVEL:", level);

            const currentProgress =
                allProgress.find(
                    p => p.level_id === level.id
                );

            console.log("CURRENT PROGRESS:", currentProgress);

            const state = this.getLevelState(
                currentProgress,
                allProgress,
                levels,
                index
            );

            console.log("STATE:", state);

            const sections =
                await this.sectionProgressController
                    .getSectionsForLevel(
                        level.id,
                        currentProgress,
                        state
                    );

            console.log("SECTIONS:", sections);

            console.log("ANTES DEL SPREAD LEVEL:", level);

            result.push({
                ...level,
                state,
                sections
            });

            console.log("DESPUES DEL SPREAD");
        }

        console.log("FINAL RESULT:", result);

        return result;
    }


    getLevelState(
        currentProgress,
        allProgress,
        levels,
        index
    ) {

        // LEVEL 1
        if (index === 0) {

            if (currentProgress) {
                return currentProgress.status;
            }

            return "disponible";
        }

        // NIVEL ANTERIOR
        const previousLevel = levels[index - 1];

        const previousProgress =
            allProgress.find(
                p => p.level_id === previousLevel.id
            );

        // El nivel anterior debe estar COMPLETAMENTE terminado
        if (previousProgress?.status !== "completado") {
            return "bloqueado";
        }

        // Llegamos acá solamente si el nivel anterior está completo

        if (currentProgress) {
            return currentProgress.status;
        }

        return "disponible";
    }

    async startLevel(
        childId,
        levelId
    ) {

        const levels =
            await this.levelController.getLevels();

        const levelIndex =
            levels.findIndex(
                level => level.id === levelId
            );

        if (levelIndex === -1) {
            throw new Error("Nivel no encontrado");
        }

        // Si no es el primer nivel,
        // verificar que el anterior esté completado
        if (levelIndex > 0) {

            const previousLevel =
                levels[levelIndex - 1];

            const previousProgress =
                await this.getProgressByChildAndLevel(
                    childId,
                    previousLevel.id
                );

            if (previousProgress?.status !== "completado") {
                throw new Error(
                    "El nivel anterior todavía no está completado"
                );
            }
        }

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

        await this.progressRepository.insert(progress);

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