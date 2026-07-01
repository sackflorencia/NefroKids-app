export default class Question {

  constructor(
    id,
    level_id,
    question,
    correct_answer,
    incorrect_answer1,
    incorrect_answer2 = null,
    incorrect_answer3 = null,
    correct_feedback,
    incorrect_feedback1,
    incorrect_feedback2 = null,
    incorrect_feedback3 = null,
    explanation,
    difficulty
  ) {
    this.id = id;

    this.level_id = level_id;

    this.question = question;

    this.correct_answer = correct_answer;

    this.incorrect_answer1 = incorrect_answer1;
    this.incorrect_answer2 = incorrect_answer2;
    this.incorrect_answer3 = incorrect_answer3;

    this.correct_feedback = correct_feedback;
    this.incorrect_feedback1 = incorrect_feedback1;
    this.incorrect_feedback2 = incorrect_feedback2;
    this.incorrect_feedback3 = incorrect_feedback3;

    this.explanation = explanation;

    this.difficulty = difficulty;
  }
}