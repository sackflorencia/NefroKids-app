import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import FirebaseService from "./FirebaseService";

export default class AuthService {

    constructor() {
        console.log("AuthService initialized");

        this.auth = FirebaseService.getAuth();

        console.log("AUTH IN SERVICE =", this.auth);
    }

    async registerTutor(email, password) {
        const credential =
            await createUserWithEmailAndPassword(
                this.auth,
                email,
                password
            );

        return credential.user;
    }

    async login(email, password) {
        const credential =
            await signInWithEmailAndPassword(
                this.auth,
                email,
                password
            );

        return credential.user;
    }

    async logout() {
        await signOut(this.auth);
    }

    getCurrentTutor() {
        return this.auth.currentUser;
    }

    getCurrentTutorUid() {
        return this.auth.currentUser?.uid ?? null;
    }

    subscribeToAuthChanges(callback) {
        return onAuthStateChanged(
            this.auth,
            callback
        );
    }
}