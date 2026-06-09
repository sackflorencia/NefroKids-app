export default class User {

    constructor(
        id,
        birth_date,
        full_name,
        total_xp = 0,
        urinates = 1,
        avatar_id = null
    ) {

        this.id = id;

        this.birth_date = birth_date;
        this.full_name = full_name;

        this.total_xp = total_xp;

        this.urinates = urinates;

        this.avatar_id = avatar_id;
    }

}