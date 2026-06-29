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

            email: guardian.email,

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

}