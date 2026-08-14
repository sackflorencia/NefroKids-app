import FirestoreService from "./FirestoreService";

export default class SyncService {

    constructor() {

        this.firestoreService =
            new FirestoreService();

    }

    async uploadRegistration(
        child,

        primaryTutor,

        tutorUid,

        guardians

    ) {
        console.log("UPLOAD REGISTRATION");
        console.log(child);
        console.log(primaryTutor);
        console.log(tutorUid);

        await this.firestoreService.createChild(

            child,

            tutorUid

        );

        await this.firestoreService.createTutor(

            primaryTutor,

            tutorUid

        );

        for (let i = 1; i < guardians.length; i++) {

            const guardian = guardians[i];

            await this.firestoreService.createInvitation({

                child_id: child.id,
                full_name: guardian.full_name,
                email: guardian.email,
                phone: guardian.phone,
                relationship: guardian.relationship,
                invited_by: tutorUid,

                status: "pending"

            });

        }

    }

    async uploadSymptomLog(log) {

        await this.firestoreService
            .createSymptomLog(log);

    }

    async uploadAlert(
        childId,
        symptomLogId,
        alert
    ) {

        await this.firestoreService
            .createAlert(
                childId,
                symptomLogId,
                alert
            );

    }

    async uploadProgress(progress) {

        await this.firestoreService
            .createProgress(progress);

    }

    async uploadReport(report) {

        await this.firestoreService
            .createReport(report);

    }


    async uploadAppointmentRule(rule) {

        await this.firestoreService
            .createAppointmentRule(rule);

    }

    async syncTutorFromFirestore(firebaseUid) {

        console.log("SYNC TUTOR DESDE FIRESTORE:", firebaseUid);

        const tutor =
            await this.firestoreService
                .getTutorByUid(firebaseUid);

        if (!tutor) {
            console.log("Tutor no encontrado en Firestore");
            return null;
        }

        console.log("Tutor encontrado en Firestore:", tutor);

        const child =
            await this.firestoreService
                .getChildById(tutor.child_id);

        if (!child) {
            console.log(
                "Child no encontrado en Firestore:",
                tutor.child_id
            );

            return null;
        }

        console.log("Child encontrado:", child);

        return {
            tutor,
            child
        };
    }

}