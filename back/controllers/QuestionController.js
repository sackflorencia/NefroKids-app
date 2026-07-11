import QuestionRepository from "../repositories/QuestionRepository";

export default class QuestionController {

  constructor(db) {
    this.repository = new QuestionRepository(db);
  }

  async getAllQuestions() {
    return await this.repository.getAll();
  }

  async getQuestionById(id) {
    return await this.repository.getById(id);
  }

  async createQuestion(question) {
    return await this.repository.insert(question);
  }

  async updateQuestion(question) {
    return await this.repository.update(question);
  }

  async deleteQuestion(id) {
    return await this.repository.delete(id);
  }
  async getSectionQuestions(sectionId, amount = 3) {
  return await this.repository.getRandomBySection(
    sectionId,
    amount
  );
}

}