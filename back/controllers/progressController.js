import ProgressRepository from "../repositories/ProgressRepository";

export default class ProgressController {

  constructor(db) {
    this.repository = new ProgressRepository(db);
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

  async createProgress(progress) {
    return await this.repository.insert(progress);
  }

  async updateProgress(progress) {
    return await this.repository.update(progress);
  }

  async deleteProgress(id) {
    return await this.repository.delete(id);
  }

  async completeSection1(progressId) {
    return await this.repository.completeSection1(progressId);
  }

  async saveQuiz(progressId, score, total, stars) {
    return await this.repository.saveQuiz(
      progressId,
      score,
      total,
      stars
    );
  }

}