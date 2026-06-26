import UserController from "../controllers/userController";
import TutorController from "../controllers/tutorController";

import SyncService from "./SyncService";

export default class RegistrationService {

    constructor(db) {

        this.userController =
            new UserController(db);

        this.tutorController =
            new TutorController(db);

        this.syncService =
            new SyncService();

    }

    async completeRegistration(
        userData,
        guardiansData,
        tutorUid
    ) {


        const child =
            await this.userController.createUser(
                userData
            );

        let primaryTutor = null;

        for (let i = 0; i < guardiansData.length; i++) {

            const guardian =
                guardiansData[i];

            
        const tutor =
        await this.tutorController.createTutor({

        child_id: child.id,

        full_name: guardian.full_name,

        email: guardian.email,

        relationship: guardian.relationship,

        phone: guardian.phone ?? null,

        is_primary: i === 0 ? 1 : 0,

    });

    if (i === 0) {

    primaryTutor = tutor;

}


        }

        await this.syncService.uploadRegistration(

            child,

            primaryTutor,

            tutorUid

        );

        return child;

    }

}