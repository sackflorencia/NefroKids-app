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
            if (firebaseUser) {
                const tutorController = new TutorController(db);
                const tutor =
                    await tutorController.getTutorByFirebaseUid(
                        firebaseUser.uid
                    );
                setUser({
                    tutorId: tutor.id,
                    firebaseUid: firebaseUser.uid,
                    childId: tutor.child_id,
                    fullName: tutor.full_name,
                    email: tutor.email
                });

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

        //setUser(firebaseUser);

    }
    async function logout() {
        const authService = new AuthService();
        await authService.logout();
        setUser(null);
    }
    async function register(email, password) {

        const authService = new AuthService();

        return await authService.registerTutor(
            email,
            password
        );

    }

    return (
        <UserContext.Provider value={{ user, login, logout, loading, register }}>
            {children}
        </UserContext.Provider>
    );

}

export const useUser = () => useContext(UserContext);