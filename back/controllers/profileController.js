import TutorController from "./tutorController";
import UserController from "./userController";

export default class ProfileController {

    constructor(db) {
        this.tutorController = new TutorController(db);
        this.userController = new UserController(db);
    }

    async getProfile(firebaseUid) {

        // 1. Buscar al tutor que está logueado
        const currentTutor =
            await this.tutorController.getTutorByFirebaseUid(
                firebaseUid
            );

        if (!currentTutor) {
            return null;
        }

        // 2. Obtener al chico asociado
        const child =
            await this.userController.getUserById(
                currentTutor.child_id
            );

        // 3. Obtener todos los tutores del chico
        const tutors =
            await this.tutorController.getTutorsByChildId(
                currentTutor.child_id
            );

        return {
            child,
            currentTutor,
            tutors,
        };
    }
}