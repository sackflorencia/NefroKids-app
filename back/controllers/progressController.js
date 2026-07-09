import { v4 as uuidv4 } from "uuid";

import ProgressRepository from "../repositories/ProgressRepository";
import LevelRepository from "../repositories/LevelRepository";

export default class ProgressController {

    constructor(db) {
        this.progressRepository = new ProgressRepository(db);
        this.levelRepository = new LevelRepository(db);
    }

    async getAllProgress() {
        return await this.progressRepository.getAll();
    }

    async getProgressById(id) {
        return await this.progressRepository.getById(id);
    }

    async getProgressByChildAndLevel(childId, levelId) {
        return await this.progressRepository.getByChildAndLevel(
            childId,
            levelId
        );
    }

    async getLevelsForChild(childId) {

        const levels = await this.levelRepository.getAll();

        const progress = await this.progressRepository.getByChild(childId);

        return levels.map((level, index) => {

            const currentProgress = progress.find(
                p => p.level_id === level.id
            );

            const state = this.getLevelState(
                currentProgress,
                progress,
                levels,
                index
            );

            return {
                ...level,
                state,
                sections: this.getSections(
                    state,
                    currentProgress
                )
            };

        });

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

        const previousProgress = allProgress.find(
            p => p.level_id === previousLevel.id
        );

        return previousProgress?.status === "completado"
            ? "disponible"
            : "bloqueado";

    }
    getSections(levelState, progress) {

        if (levelState === "bloqueado") {

            return [
                {
                    number: 1,
                    state: "blocked"
                },
                {
                    number: 2,
                    state: "blocked"
                }
            ];

        }

        if (!progress) {

            return [
                {
                    number: 1,
                    state: "available"
                },
                {
                    number: 2,
                    state: "blocked"
                }
            ];

        }

        return [
            {
                number: 1,
                state: progress.section1_completed
                    ? "completed"
                    : "available"
            },
            {
                number: 2,
                state: progress.section1_completed
                    ? (
                        progress.section2_completed
                            ? "completed"
                            : "available"
                    )
                    : "blocked"
            }
        ];

    }
    async createProgress(progress) {
        return await this.progressRepository.insert(progress);
    }
    async updateProgress(progress) {
        return await this.progressRepository.update(progress);
    }
    async deleteProgress(id) {
        return await this.progressRepository.delete(id);
    }
    async completeSection1(childId, levelId) {
        const progress = await this.startLevel(childId, levelId);
        return await this.progressRepository.completeSection1(
            progress.id
        );
    }
    async saveQuiz(childId, levelId, score, total) {
        const progress = await this.startLevel(childId, levelId);
        const stars = this.calculateStars(score, total);
        const xp = this.calculateXp(stars);
        const completed = progress.section1_completed === 1;
        return await this.progressRepository.saveQuiz(
            progress.id,
            score,
            total,
            stars,
            xp,
            completed
        );
    }
    async startLevel(childId, levelId) {
        let progress = await this.progressRepository.getByChildAndLevel(
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
            section1_completed: 0,
            section2_completed: 0,
            quiz_score: 0,
            quiz_total: 0,
            stars: 0,
            xp_gained: 0,
            started_at: new Date().toISOString(),
            completed_at: null
        };
        await this.progressRepository.insert(progress);
        return progress;
    }

    calculateStars(score, total) {
        if (score === total) {
            return 3;
        }
        if (score >= Math.ceil(total * 0.7)) {
            return 2;
        }
        if (score > 0) {
            return 1;
        }
        return 0;
    }
    calculateXp(stars) {
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