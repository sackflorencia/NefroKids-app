import { createContext, useContext, useState, useEffect } from "react";
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

        const unsubscribe = authService.subscribeToAuthChanges(async (firebaseUser) => {
            console.log("Firebase cambió:", firebaseUser);
            if (firebaseUser) {
                const tutorController = new TutorController(db);

                console.log("Firebase UID:", firebaseUser.uid);

                const tutor =
                    await tutorController.getTutorByFirebaseUid(
                        firebaseUser.uid
                    );

                console.log("Tutor encontrado:", tutor);

                if (!tutor) {
                    console.log("Tutor todavía no creado");
                    setLoading(false);
                    return;
                }

                setUser({
                    tutorId: tutor.id,
                    firebaseUid: firebaseUser.uid,
                    childId: tutor.child_id,
                    fullName: tutor.full_name,
                    email: tutor.email
                });

                setLoading(false);

            } else {
                console.log("NO USER");
                setUser(null);
            }

            setLoading(false);
        });
        return unsubscribe;
    }, [])
    async function login(email, password) {

        const authService = new AuthService();

        const firebaseUser = await authService.login(
            email,
            password
        );

        console.log("Firebase UID:", firebaseUser.uid);

        const tutorController = new TutorController(db);

        const tutor = await tutorController.getTutorByFirebaseUid(
            firebaseUser.uid
        );

        console.log("Tutor encontrado:", tutor);

        if (!tutor) {
            console.log("No existe tutor local");
            return;
        }

        setUser({
            tutorId: tutor.id,
            firebaseUid: firebaseUser.uid,
            childId: tutor.child_id,
            fullName: tutor.full_name,
            email: tutor.email
        });
    }
    async function logout() {
        const authService = new AuthService();
        await authService.logout();
        setUser(null);
        setLoading(false);
    }
    async function register(email, password) {

        const authService = new AuthService();

        return await authService.registerTutor(
            email,
            password
        );

    }
    async function refreshUser() {
        const authService = new AuthService();

        const firebaseUser = authService.getCurrentTutor();

        if (!firebaseUser) {
            setUser(null);
            return;
        }

        const tutorController = new TutorController(db);
        const tutor =
            await tutorController.getTutorByFirebaseUid(
                firebaseUser.uid
            );

        if (!tutor) {
            console.log("Tutor todavía no creado");
            setLoading(false);
            return;
        }

        setUser({
            tutorId: tutor.id,
            firebaseUid: firebaseUser.uid,
            childId: tutor.child_id,
            fullName: tutor.full_name,
            email: tutor.email
        });

        setLoading(false);
    }
    return (
        <UserContext.Provider value={{ user, login, logout, loading, register, refreshUser }}>
            {children}
        </UserContext.Provider>
    );

}

export const useUser = () => useContext(UserContext);