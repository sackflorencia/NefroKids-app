import React, { useState } from "react";
import {
    StyleSheet, Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InputField from "../../components/InputField";
import Button from "../../components/Button";

import AuthService from "../../../back/services/AuthService";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {

        const authService = new AuthService();
        try {

            await authService.login(
                email,
                password
            );

            Alert.alert(
                "Éxito",
                "Login correcto"
            );

        } catch (error) {

            Alert.alert(
                "Error",
                error.message
            );

        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <InputField
                label="Email del tutor"
                placeholder="ejemplo@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <InputField
                label="Contraseña"
                placeholder="Ingresá tu contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />

            <Button
                title="Siguiente"
                onPress={handleLogin}
            />

        </SafeAreaView>
    );
};

export default LogIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        gap: 12,
    },
});