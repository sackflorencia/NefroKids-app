import UserController from "../controllers/userController";
import TutorController from "../controllers/tutorController";

export default class RegistrationService {

    constructor(db) {
        this.userController = new UserController(db);
        this.tutorController = new TutorController(db);
    }

    async completeRegistration(
        userData,
        guardiansData
    ) {

        const user =
            await this.userController.createUser(
                userData
            );

        for (let i = 0; i < guardiansData.length; i++) {

            const guardian = guardiansData[i];

            await this.tutorController.createTutor({

                child_id: user.id,

                full_name: guardian.full_name,

                email: guardian.email,

                relationship: guardian.relationship,

                phone: guardian.phone ?? null,

                is_primary: i === 0 ? 1 : 0,

            });

        }

        return user;
    }
}