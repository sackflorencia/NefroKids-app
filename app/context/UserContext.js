import { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../back/services/AuthService";

const UserContext = createContext();

export function UserProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authService = new AuthService();
        const unsubscribe =
            authService.subscribeToAuthChanges((firebaseUser) => {
                setUser(firebaseUser);
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