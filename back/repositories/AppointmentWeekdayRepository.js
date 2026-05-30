export default class AppointmentWeekdayRepository {

    constructor(db) {
        this.db = db;
    }

    async insert(weekday) {

        const query = `
      INSERT INTO appointmentWeekdays (
        id,
        rule_id,
        weekday,
        time
      )
      VALUES (?, ?, ?, ?);
    `;

        await this.db.runAsync(
            query,
            [
                weekday.id,
                weekday.rule_id,
                weekday.weekday,
                weekday.time
            ]
        );
    }

    async getById(id) {

        const query = `
      SELECT *
      FROM appointmentWeekdays
      WHERE id = ?;
    `;

        return await this.db.getFirstAsync(
            query,
            [id]
        );
    }

    async getByRuleId(ruleId) {

        const query = `
      SELECT *
      FROM appointmentWeekdays
      WHERE rule_id = ?
      ORDER BY weekday ASC;
    `;

        return await this.db.getAllAsync(
            query,
            [ruleId]
        );
    }

    async update(weekday) {

        const query = `
      UPDATE appointmentWeekdays
      SET
        weekday = ?,
        time = ?
      WHERE id = ?;
    `;

        await this.db.runAsync(
            query,
            [
                weekday.weekday,
                weekday.time,
                weekday.id
            ]
        );
    }

    async delete(id) {

        const query = `
      DELETE FROM appointmentWeekdays
      WHERE id = ?;
    `;

        await this.db.runAsync(
            query,
            [id]
        );
    }

    async deleteByRuleId(ruleId) {

        const query = `
            DELETE FROM appointmentWeekdays
            WHERE rule_id = ?;
        `;

        await this.db.runAsync(
            query,
            [ruleId]
        );
    }

}