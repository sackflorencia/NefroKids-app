export default class Review {

    constructor(
        id,
        question,
        correct_answer,
        incorrect_answer1,
        incorrect_answer2 = null,
        incorrect_answer3 = null
    ) {
        this.id = id;
        this.question = question;

        this.correct_answer = correct_answer;

        this.incorrect_answer1 = incorrect_answer1;
        this.incorrect_answer2 = incorrect_answer2;
        this.incorrect_answer3 = incorrect_answer3;
    }
}