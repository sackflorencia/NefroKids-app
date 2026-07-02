import ProgressRepository from "../repositories/ProgressRepository";
import LevelRepository from "../repositories/LevelRepository";

export default class ProgressController {

    constructor(db) {
        this.repository = new ProgressRepository(db);
        this.levelRepository = new LevelRepository(db);
    }

    async getAllProgress() {
        return await this.repository.getAll();
    }

    async getProgressById(id) {
        return await this.repository.getById(id);
    }

    async getProgressByChildAndLevel(childId, levelId) {
        return await this.repository.getByChildAndLevel(
            childId,
            levelId
        );
    }
    async getLevelsForChild(childId) {

        const levels =
            await this.levelRepository.getAll();

        const progress =
            await this.progressRepository.getByChild(childId);

        return levels.map((level, index) => {

            const currentProgress = progress.find(
                p => p.level_id === level.id
            );

            if (currentProgress) {

                return {
                    ...level,
                    state: currentProgress.status
                };

            }

            // El primer nivel siempre está disponible
            if (index === 0) {

                return {
                    ...level,
                    state: "disponible"
                };

            }

            // Buscamos el progreso del nivel anterior
            const previousLevel = levels[index - 1];

            const previousProgress = progress.find(
                p => p.level_id === previousLevel.id
            );

            return {
                ...level,
                state:
                    previousProgress &&
                        previousProgress.status === "completado"
                        ? "disponible"
                        : "bloqueado"
            };

        });

    }

    async createProgress(progress) {
        return await this.repository.insert(progress);
    }

    async updateProgress(progress) {
        return await this.repository.update(progress);
    }

    async deleteProgress(id) {
        return await this.repository.delete(id);
    }

    async completeSection1(childId, levelId) {

        const progress = await this.startLevel(
            childId,
            levelId
        );

        return await this.repository.completeSection1(
            progress.id
        );

    }

    async saveQuiz(childId, levelId, score, total) {

        const progress = await this.startLevel(
            childId,
            levelId
        );

        let stars = 0;

        if (score === total) {
            stars = 3;
        } else if (score >= Math.ceil(total * 0.7)) {
            stars = 2;
        } else if (score > 0) {
            stars = 1;
        }

        let xp = 0;

        switch (stars) {
            case 3:
                xp = 50;
                break;
            case 2:
                xp = 30;
                break;
            case 1:
                xp = 10;
                break;
        }

        const completed = progress.section1_completed === 1;

        return await this.repository.saveQuiz(
            progress.id,
            score,
            total,
            stars,
            xp,
            completed
        );

    }
    async startLevel(childId, levelId) {

        let progress = await this.repository.getByChildAndLevel(
            childId,
            levelId
        );

        if (progress) {
            return progress;
        }

        progress = {
            id: crypto.randomUUID(),
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

        await this.repository.insert(progress);

        return progress;

    }

}