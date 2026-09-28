import React, { useState } from "react";
import {
    StyleSheet,
    Alert,
    View,
    Text,
    Image,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";
import Header from "../../components/header/Header";
import SpeechBubble from "../../components/speechBubble.js/SpeechBubble";

import images from "../../../assets/images";
import colors from "../../styles/colors";

import { useUser } from "../../context/UserContext";
import Welcome from "./Welcome";

const LogIn = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useUser();

    const handleRegister = () => {
        navigation.navigate("Register");
    };

    async function handleLogin() {
        try {
            await login(
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.safeArea}>
                <Header />

                <View style={styles.topBar}>
                    <Button
                        variant="back"
                        colorVariant="secondary"
                        direction="left"
                        onPress={() => navigation.navigate("Welcome")}
                        style={styles.backButton}
                    />
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
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
                        <Button
                            title="Registrarte"
                            onPress={handleRegister}
                            variant="primary"
                            style={styles.submitButton}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default LogIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    safeArea: {
        flex: 1,
    },
    topBar: {
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 0,
    },
    backButton: {
        width: 90,
        alignSelf: "flex-start",
    },
    scrollContent: {
        flexGrow: 1,
    },
    form: {
        paddingHorizontal: 24,
        paddingTop: 0,
        gap: 12,
    },
    label: {
        color: colors.textDark,
        fontSize: 18,
        marginLeft: 4,
        fontWeight: "600",
    },
    submitButton: {
        marginTop: 0,
        alignSelf: "center",
        width: "100%",
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