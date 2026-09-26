import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import FirebaseService from "./FirebaseService";

function getAuthErrorMessage(error) {

    switch (error.code) {

        // LOGIN

        case "auth/invalid-credential":
            return "El email o la contraseña son incorrectos.";

        case "auth/user-not-found":
            return "No encontramos una cuenta con ese email.";

        case "auth/wrong-password":
            return "La contraseña es incorrecta.";

        case "auth/invalid-email":
            return "Ingresá un email válido.";

        case "auth/user-disabled":
            return "Esta cuenta está deshabilitada.";

        // REGISTRO

        case "auth/email-already-in-use":
            return "Ya existe una cuenta registrada con este email.";

        case "auth/weak-password":
            return "La contraseña es demasiado débil.";

        // CONEXIÓN

        case "auth/network-request-failed":
            return "No pudimos conectarnos. Revisá tu conexión e intentá nuevamente.";

        default:
            return "Ocurrió un error. Intentá nuevamente.";
    }
}

export default class AuthService {

    constructor() {
        this.auth = FirebaseService.getAuth();
    }

    async registerTutor(email, password) {

        try {

            const credential =
                await createUserWithEmailAndPassword(
                    this.auth,
                    email,
                    password
                );

            return credential.user;

        } catch (error) {

            console.error(
                "Firebase register error:",
                error
            );

            throw new Error(
                getAuthErrorMessage(error)
            );
        }
    }

    async login(email, password) {

        try {

            const credential =
                await signInWithEmailAndPassword(
                    this.auth,
                    email,
                    password
                );

            return credential.user;

        } catch (error) {

            throw new Error(
                getAuthErrorMessage(error)
            );
        }
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