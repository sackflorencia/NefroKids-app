import FirebaseService from "./FirebaseService";
import {
    doc,
    collection,
    setDoc,
    addDoc,
    serverTimestamp
} from "firebase/firestore";
export default class FirestoreService {

    constructor() {

        this.db =
            FirebaseService.getFirestore();

    }
    async createChild(
        child,
        tutorUid
    ) {

        await setDoc(

            doc(
                this.db,
                "children",
                child.id
            ),
            {

                full_name:
                    child.full_name,

                birth_date:
                    child.birth_date,

                first_register_date:
                    child.first_register_date,

                total_xp:
                    child.total_xp,

                urinates:
                    Boolean(child.urinates),

                avatar_id:
                    child.avatar_id,

                tutor_uids: [
                    tutorUid
                ],

                created_at:
                    serverTimestamp(),

                updated_at:
                    serverTimestamp()

            }

        );

    }
    async createTutor(
        tutor,
        tutorUid
    ) {

        await setDoc(

            doc(
                this.db,
                "tutors",
                tutorUid
            ),

            {

                child_id:
                    tutor.child_id,

                full_name:
                    tutor.full_name,

                email:
                    tutor.email,

                phone:
                    tutor.phone,

                relationship:
                    tutor.relationship,

                is_primary:
                    Boolean(tutor.is_primary),

                created_at:
                    serverTimestamp(),

                updated_at:
                    serverTimestamp()

            }

        );

    }
    async createInvitation(invitation) {

        await addDoc(

            collection(
                this.db,
                "guardian_invitations"
            ),

            {

                child_id:
                    invitation.child_id,

                email:
                    invitation.email,

                relationship:
                    invitation.relationship,

                invited_by:
                    invitation.invited_by,

                status:
                    invitation.status,

                created_at:
                    serverTimestamp()

            }

        );

    }

    async createSymptomLog(log) {

        await setDoc(

            doc(

                this.db,

                "children",

                log.child_id,

                "symptom_logs",

                log.id

            ),

            {

                general_mood:
                    log.general_mood,

                pain_location:
                    log.pain_location,

                urine_color:
                    log.urine_color,

                alert_sent:
                    Boolean(log.alert_sent),

                logged_at:
                    log.logged_at

            }

        );

    }


    async createAlert(
        childId,
        symptomLogId,
        alert
    ) {

        await setDoc(

            doc(

                this.db,

                "children",

                childId,

                "symptom_logs",

                symptomLogId,

                "alerts",

                alert.id

            ),

            {

                alert_type:
                    alert.alert_type,

                message:
                    alert.message,

                triggered_at:
                    alert.triggered_at

            }

        );

    }

    async createProgress(progress) {

        await setDoc(

            doc(

                this.db,

                "children",

                progress.child_id,

                "progress",

                progress.id

            ),

            {

                level_id:
                    progress.level_id,

                status:
                    progress.status,

                attempts:
                    progress.attempts,

                xp_gained:
                    progress.xp_gained,

                started_at:
                    progress.started_at,

                completed_at:
                    progress.completed_at

            }

        );

    }


    async createReport(report) {

        await setDoc(

            doc(

                this.db,

                "children",

                report.child_id,

                "reports",

                report.id

            ),

            {

                generated_at:
                    report.generated_at,

                period_start:
                    report.period_start,

                period_end:
                    report.period_end,

                status:
                    report.status

            }

        );

    }

    async createAppointmentRule(rule) {

        await setDoc(

            doc(

                this.db,

                "children",

                rule.child_id,

                "appointment_rules",

                rule.id

            ),

            {

                recurrence_type:
                    rule.recurrence_type,

                recurrence_interval:
                    rule.recurrence_interval,

                start_datetime:
                    rule.start_datetime,

                report_hours_before:
                    rule.report_hours_before,

                active:
                    Boolean(rule.active)

            }

        );

    }
}