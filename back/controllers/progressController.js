import { v4 as uuidv4 } from "uuid";

import ProgressRepository from "../repositories/ProgressRepository";
import LevelController from "./levelController";
import SectionProgressController from "./sectionProgressController";

export default class ProgressController {

    constructor(db) {

        this.db = db;

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

            const currentProgress =
                allProgress.find(
                    p => p.level_id === level.id
                );

            const state =
                this.getLevelState(
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

        // Primer nivel
        if (index === 0) {

            if (currentProgress) {
                return currentProgress.status;
            }

            return "disponible";
        }

        const previousLevel =
            levels[index - 1];

        const previousProgress =
            allProgress.find(
                p => p.level_id === previousLevel.id
            );

        // El nivel anterior tiene que estar completo
        if (previousProgress?.status !== "completado") {
            return "bloqueado";
        }

        if (currentProgress) {
            return currentProgress.status;
        }

        return "disponible";
    }

    async startLevel(
        childId,
        levelId
    ) {

        console.log("=== START LEVEL ===");
        console.log("childId:", childId);
        console.log("levelId:", levelId);

        // ==========================================
        // VERIFICAR CHILD
        // ==========================================

        const child =
            await this.db.getFirstAsync(
                `
                SELECT *
                FROM users
                WHERE id = ?
                `,
                [childId]
            );

        console.log("CHILD EN DB:", child);

        if (!child) {
            throw new Error(
                `El child ${childId} no existe en users`
            );
        }

        // ==========================================
        // VERIFICAR GAME
        // ==========================================

        const game =
            await this.db.getFirstAsync(
                `
                SELECT *
                FROM level
                WHERE id = ?
                `,
                [levelId]
            );

        console.log("GAME EN DB:", game);

        if (!game) {
            throw new Error(
                `El game ${levelId} no existe en levels`
            );
        }

        // ==========================================
        // OBTENER TODOS LOS NIVELES
        // ==========================================

        const levels =
            await this.levelController.getLevels();

        console.log("LEVELS:", levels);

        const levelIndex =
            levels.findIndex(
                level => level.id === levelId
            );

        if (levelIndex === -1) {

            throw new Error(
                "Nivel no encontrado"
            );
        }

        // ==========================================
        // VERIFICAR NIVEL ANTERIOR
        // ==========================================

        if (levelIndex > 0) {

            const previousLevel =
                levels[levelIndex - 1];

            const previousProgress =
                await this.getProgressByChildAndLevel(
                    childId,
                    previousLevel.id
                );

            console.log(
                "PROGRESS NIVEL ANTERIOR:",
                previousProgress
            );

            if (
                previousProgress?.status !==
                "completado"
            ) {

                throw new Error(
                    "El nivel anterior todavía no está completado"
                );
            }
        }

        // ==========================================
        // BUSCAR PROGRESS EXISTENTE
        // ==========================================

        let progress =
            await this.getProgressByChildAndLevel(
                childId,
                levelId
            );

        if (progress) {

            console.log(
                "PROGRESS YA EXISTE:",
                progress
            );

            return progress;
        }

        // ==========================================
        // CREAR PROGRESS
        // ==========================================

        progress = {
            id: uuidv4(),
            child_id: childId,
            level_id: levelId,
            status: "disponible",
            started_at: new Date().toISOString(),
            completed_at: null
        };

        console.log(
            "PROGRESS A INSERTAR:",
            progress
        );

        await this.progressRepository.insert(
            progress
        );

        console.log(
            "PROGRESS INSERTADO CORRECTAMENTE"
        );

        return progress;
    }

    async completeSection(
        childId,
        levelId,
        levelSectionId,
        data = {}
    ) {

        console.log(
            "=== COMPLETE SECTION ==="
        );

        console.log("childId:", childId);
        console.log("levelId:", levelId);
        console.log("sectionId:", levelSectionId);

        // ==========================================
        // 1. START LEVEL
        // ==========================================

        const levelProgress =
            await this.startLevel(
                childId,
                levelId
            );

        console.log(
            "LEVEL PROGRESS:",
            levelProgress
        );

        // ==========================================
        // 2. COMPLETAR SECTION
        // ==========================================

        const sectionProgress =
            await this.sectionProgressController
                .completeSection(
                    levelProgress.id,
                    levelSectionId,
                    data
                );

        console.log(
            "SECTION PROGRESS:",
            sectionProgress
        );

        // ==========================================
        // 3. VERIFICAR SI TODAS LAS SECTIONS
        //    ESTÁN COMPLETAS
        // ==========================================

        const completed =
            await this.sectionProgressController
                .areAllSectionsCompleted(
                    levelProgress.id,
                    levelId
                );

        console.log(
            "ALL SECTIONS COMPLETED:",
            completed
        );

        // ==========================================
        // 4. COMPLETAR LEVEL
        // ==========================================

        if (completed) {

            console.log(
                "COMPLETANDO LEVEL"
            );

            await this.completeLevel(
                levelProgress.id
            );
        }

        return sectionProgress;
    }

    async completeLevel(
        progressId
    ) {

        console.log(
            "COMPLETANDO PROGRESS:",
            progressId
        );

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