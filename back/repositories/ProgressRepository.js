import Db from './database.js';

export default class ProgressRepository {
    constructor() {
    this.db = new Db();
    }
    getAllAsync = async () => {
        console.log(`ProgressRepository.getAllAsync()`);
        const sql = `SELECT * FROM child_progress`;
        return await this.db.queryAll(sql);
    }
    getByIdAsync = async (id) => {
        console.log(`ProgressRepository.getByIdAsync(${id})`);
        const sql = `SELECT * FROM child_progress WHERE id= ?`;
        return await this.db.queryOne(sql, [id]);
    }
    
    createAsync = async (entity) => {
        console.log(`ProgressRepository.createAsync(${JSON.stringify(entity)})`);
        const sql = `INSERT INTO child_progress (
        id,
        child_id,
        level_id,
        status,
        attempts,
        xp_gained,
        started_at,
        completed_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            entity.id,
            entity.child_id,
            entity.level_id,
            entity.status ?? 'bloqueado',
            entity.attempts ?? 0,
            entity.xp_gained ?? 0,
            entity.started_at ?? null,
            entity.completed_at ?? null
        ];

        return await this.db.queryRowCount(sql, values);
    }
    updateAsync = async (entity) => {
        console.log(`ProgressRepository.updateAsync(${JSON.stringify(entity)})`);
        const sql = `
        UPDATE child_progress
            SET
                child_id = ?,
                level_id = ?,
                status = ?,
                attempts = ?,
                xp_gained = ?,
                started_at = ?,
                completed_at = ?
            WHERE id = ?
        `;

        const values = [
            entity.child_id,
            entity.level_id,
            entity.status,
            entity.attempts,
            entity.xp_gained,
            entity.started_at,
            entity.completed_at,
            entity.id
        ];
        return await this.db.queryRowCount(sql, values);
    }
}