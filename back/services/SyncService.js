import FirebaseService from "./FirebaseService";

import {
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

export default class SyncService {

  constructor() {
    this.db = FirebaseService.getFirestore();
  }


  async createChild(child) {

    await setDoc(
      doc(this.db, "children", child.id),
      {
        full_name: child.full_name,

        birth_date: child.birth_date,

        first_register_date: new Date(child.first_register_date),

        total_xp: child.total_xp,

        urinates: Boolean(child.urinates),

        avatar_id: child.avatar_id,

        tutor_uids: [],

        created_at: serverTimestamp(),

        updated_at: serverTimestamp()
      }
    );

  }
  async createTutor(uid, tutor) {

    await setDoc(
      doc(this.db, "tutors", uid),
      {
        child_id: tutor.child_id,

        full_name: tutor.full_name,

        email: tutor.email,

        phone: tutor.phone,

        relationship: tutor.relationship,

        is_primary:
          Boolean(tutor.is_primary),

        created_at:
          serverTimestamp(),

        updated_at:
          serverTimestamp()
      }
    );
  }

}