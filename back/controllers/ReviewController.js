import ReviewRepository from "../repositories/ReviewRepository";

export default class ReviewController {

  constructor(db) {
    this.repository = new ReviewRepository(db);
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

}