import {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";

import AuthService from "../../back/services/AuthService";
import TutorController from "../../back/controllers/tutorController";
import { useSQLiteContext } from "expo-sqlite";

const UserContext = createContext();

export function UserProvider({ children }) {

    const db = useSQLiteContext();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const authService = new AuthService();

        const unsubscribe =
            authService.subscribeToAuthChanges(
                async (firebaseUser) => {

                    try {

                        console.log(
                            "AUTH CHANGE:",
                            firebaseUser
                        );

                        setLoading(true);

                        if (!firebaseUser) {

                            console.log("NO USER");

                            setUser(null);

                            return;
                        }

                        console.log(
                            "Firebase UID:",
                            firebaseUser.uid
                        );

                        const tutorController =
                            new TutorController(db);

                        const tutor =
                            await tutorController
                                .getTutorByFirebaseUid(
                                    firebaseUser.uid
                                );

                        console.log("================================");
                        console.log("FIREBASE UID:", firebaseUser.uid);
                        console.log("TUTOR BUSCADO:", tutor);
                        console.log("================================");

                        if (!tutor) {

                            console.log(
                                "Tutor todavía no creado"
                            );

                            setUser(null);

                            return;
                        }

                        const localUser = {
                            tutorId: tutor.id,
                            firebaseUid: firebaseUser.uid,
                            childId: tutor.child_id,
                            fullName: tutor.full_name,
                            email: tutor.email
                        };

                        console.log(
                            "USER CONTEXT:",
                            localUser
                        );

                        setUser(localUser);

                    } catch (error) {

                        console.error(
                            "ERROR CARGANDO USER:",
                            error
                        );

                        setUser(null);

                    } finally {

                        setLoading(false);

                    }

                }
            );

        return unsubscribe;

    }, [db]);


    async function login(email, password) {

        const authService =
            new AuthService();

        await authService.login(
            email,
            password
        );

        // NO setUser acá.
        // Firebase disparará subscribeToAuthChanges().
    }


    async function logout() {

        const authService =
            new AuthService();

        await authService.logout();

        // onAuthStateChanged se encargará
        // de poner user en null.
    }


    async function register(email, password) {

        const authService =
            new AuthService();

        return await authService.registerTutor(
            email,
            password
        );

    }


    async function refreshUser() {

        const authService =
            new AuthService();

        const firebaseUser =
            authService.getCurrentTutor();

        if (!firebaseUser) {

            setUser(null);
            return;

        }

        try {

            setLoading(true);

            const tutorController =
                new TutorController(db);

            const tutor =
                await tutorController
                    .getTutorByFirebaseUid(
                        firebaseUser.uid
                    );

            if (!tutor) {

                console.log(
                    "Tutor todavía no creado"
                );

                setUser(null);
                return;

            }

            setUser({
                tutorId: tutor.id,
                firebaseUid: firebaseUser.uid,
                childId: tutor.child_id,
                fullName: tutor.full_name,
                email: tutor.email
            });

        } finally {

            setLoading(false);

        }

    }


    return (
        <UserContext.Provider
            value={{
                user,
                login,
                logout,
                loading,
                register,
                refreshUser
            }}
        >
            {children}
        </UserContext.Provider>
    );

}

export const useUser = () =>
    useContext(UserContext);