import QuestionRepository from "../repositories/QuestionRepository";

export default class ReviewController {

  constructor(db) {
    this.repository = new QuestionRepository(db);
  }

  async getAllReviews() {
    return await this.repository.getAll();
  }

  async getReviewById(id) {
    return await this.repository.getById(id);
  }

  async createReview(review) {
    return await this.repository.insert(review);
  }

  async updateReview(review) {
    return await this.repository.update(review);
  }

  async deleteReview(id) {
    return await this.repository.delete(id);
  }
  async getLevelQuestions(levelId, amount = 3) {
    const questions = await this.repository.getRandomByLevel(levelId, amount);
    return questions;
  }
}