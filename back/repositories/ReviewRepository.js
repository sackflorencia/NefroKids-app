import Db from './database.js';

export default class ReviewRepository {
    constructor() {
    this.db = new Db();
    }
    getAllAsync = async () => {
        console.log(`ReviewRepository.getAllAsync()`);
        const sql = `SELECT * FROM review`;
        return await this.db.queryAll(sql);
    }
    getByIdAsync = async (id) => {
        console.log(`ReviewRepository.getByIdAsync(${id})`);
        const sql = `SELECT * FROM review WHERE id= ?`;
        return await this.db.queryOne(sql, [id]);
    }
    
    createAsync = async (entity) => {
        console.log(`ReviewRepository.createAsync(${JSON.stringify(entity)})`);
        const sql = `INSERT INTO review (
        id,
        Question,
        correct_answer,
        incorrect_answer1,
        incorrect_answer2,
        incorrect_answer3)
        VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [
            entity.id,
            entity.Question ?? 'Incompleto',
            entity.correct_answer ?? 'Incompleto',
            entity.incorrect_answer1 ?? 'Incompleto',
            entity.incorrect_answer2 ?? null,
            entity.incorrect_answer3 ?? null
        ];

        return await this.db.queryRowCount(sql, values);
    }
    updateAsync = async (entity) => {
        console.log(`ReviewRepository.updateAsync(${JSON.stringify(entity)})`);
        const sql = `
        UPDATE child_progress
            SET
                Question = ?,
                correct_answer = ?,
                incorrect_answer1 = ?,
                incorrect_answer2 = ?,
                incorrect_answer3 = ?
            WHERE id = ?
        `;

        const values = [
            entity.Question,
            entity.correct_answer,
            entity.incorrect_answer1,
            entity.incorrect_answer2,
            entity.incorrect_answer3,
            entity.id
        ];
        return await this.db.queryRowCount(sql, values);
    }
}