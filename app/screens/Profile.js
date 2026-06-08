import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import Button from "../components/Button";
import AuthService from "../../back/services/AuthService";

export default function Profile() {

    const authService = new AuthService();

    const user =
        authService.getCurrentTutor();

    async function handleLogout() {
        try {
            await authService.logout();
            setUser(null);
            Alert.alert(
                "Éxito",
                "Sesión cerrada"
            );
        } catch (error) {
            Alert.alert(
                "Error",
                error.message
            );
        }
    }

    return (
        <SafeAreaView>

            <Text>
                {user?.email}
            </Text>

            <Button
                title="Cerrar sesión"
                onPress={handleLogout}
            />

        </SafeAreaView>
    );
}