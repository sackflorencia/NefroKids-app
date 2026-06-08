import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InputField from "../../components/InputField";
import Button from "../../components/Button";

import AuthService from "../../../back/services/AuthService";

const Register = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleRegister() {
        const authService = new AuthService();
        if (password !== confirmPassword) {

            Alert.alert(
                "Error",
                "Las contraseñas no coinciden"
            );

            return;
        }

        try {

            await authService.registerTutor(
                email,
                password
            );

            Alert.alert(
                "Éxito",
                "Cuenta creada correctamente"
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
                label="Nombre"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
            />

            <InputField
                label="Apellido"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
            />

            <InputField
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <InputField
                label="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />

            <InputField
                label="Confirmar contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
            />

            <Button
                title="Crear cuenta"
                onPress={handleRegister}
            />

        </SafeAreaView>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        gap: 12,
    },
});