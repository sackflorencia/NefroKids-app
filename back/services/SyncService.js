import FirestoreService from "./FirestoreService";

export default class SyncService {

    constructor() {

        this.firestoreService =
            new FirestoreService();

    }

    async uploadRegistration(
        child,
        primaryTutor,
        tutorUid
    ) {

        await this.firestoreService
            .createChild(
                child,
                tutorUid
            );

        await this.firestoreService
            .createTutor(
                primaryTutor,
                tutorUid
            );

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