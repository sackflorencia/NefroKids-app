import React, { useState } from "react";
import {
    StyleSheet,
    Alert,
    View,
    Text,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";
import Header from "../../components/header/Header";
import SpeechBubble from "../../components/speechBubble.js/SpeechBubble";

import images from "../../../assets/images";
import colors from "../../styles/colors";

import AuthService from "../../../back/services/AuthService";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        const authService = new AuthService();
        try {
            await authService.login(email, password);
            Alert.alert("Éxito", "Login correcto");
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <Header />

            <View style={styles.form}>
                <Text style={styles.label}>Email del tutor</Text>
                <CustomInput
                    type="email"
                    placeholder="Escribe aqui"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Contraseña</Text>
                <CustomInput
                    type="password"
                    placeholder="Escribe aqui"
                    value={password}
                    onChangeText={setPassword}
                />

                <Button
                    title="Siguiente"
                    onPress={handleLogin}
                    variant="secondary"
                    style={styles.submitButton}
                />
            </View>

            <View style={styles.petWrapper} pointerEvents="none">
                <Image source={images.happyRiku} style={styles.petImage} resizeMode="contain" />
                <View style={styles.speechWrapper}>
                    <SpeechBubble message="¡Bienvenido!" direction="left" backgroundColor="#fff" textColor="#666" /> 
                    {/* cuando pueda solucionar esto */}
                </View>
            </View>

        </SafeAreaView>
    );
};

export default LogIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    form: {
        paddingHorizontal: 24,
        paddingTop: 12,
        gap: 18,
    },
    label: {
        color: colors.primaryShadow,
        fontSize: 18,
        marginBottom: 6,
        marginLeft: 6,
        fontWeight: "600",
    },
    submitButton: {
        marginTop: 18,
        alignSelf: "center",
        width: "70%",
        borderRadius: 28,
    },
    petWrapper: {
        position: "absolute",
        left: 8,
        bottom: 0,
        width: 200,
        height: 340,
        alignItems: "flex-start",
        justifyContent: "flex-end",
    },
    petImage: {
        width: 280,
        height: 300,
        opacity: 0.95,
    },
    speechWrapper: {
        position: "absolute",
        top: 30,
        left: 150,
        transform: [{ translateY: -10 }],
    },
});