import React, { useState } from "react";
import {
    View,
    Image,
    StyleSheet,
    Alert,
    Text,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";
import colors from "../../styles/colors";
import Header from "../../components/header/Header";
import PerfilVacio from "../../../assets/images/PerfilVacio.png";
import SpeechBubble from "../../components/speechBubble.js/SpeechBubble";
import images from "../../../assets/images";

export default function UserRegistration({ navigation }) {
    const [fullName, setFullName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [urinates, setUrinates] = useState(true);
    const [errors, setErrors] = useState({});

    const handleLogin = () => {
        navigation.navigate("LogIn");
    };

    function validateForm() {
        const newErrors = {};

        if (!fullName || fullName.trim() === "") {
            newErrors.fullName = "El nombre es requerido";
        } else if (fullName.trim().length < 2) {
            newErrors.fullName = "El nombre debe tener al menos 2 caracteres";
        }

        if (!birthDate) {
            newErrors.birthDate = "La fecha de nacimiento es requerida";
        }

        return newErrors;
    }

    async function handleNext() {
        try {
            const newErrors = validateForm();
            
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                const errorList = Object.values(newErrors).join("\n");
                Alert.alert("Datos incompletos", errorList);
                return;
            }

            setErrors({});

            navigation.navigate("GuardianRegistration", {
                userData: {
                    full_name: fullName.trim(),
                    birth_date: birthDate instanceof Date 
                        ? birthDate.toISOString().split("T")[0]
                        : birthDate,
                    urinates: urinates ? 1 : 0,
                },
            });
        } catch (error) {
            console.error("Error en UserRegistration:", error);
            Alert.alert("Error", "Ocurrió un error al procesar tus datos. Por favor intenta nuevamente.");
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
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >

                    {/* Sección Nombre */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>Nombre del niño</Text>
                        <CustomInput
                            type="default"
                            placeholder="Escribe aquí"
                            value={fullName}
                            onChangeText={(text) => {
                                setFullName(text);
                                if (errors.fullName) {
                                    setErrors({ ...errors, fullName: "" });
                                }
                            }}
                            autoCapitalize="words"
                            inputStyle={styles.nameInputText}
                            containerStyle={[styles.nameInputContainer, errors.fullName && styles.customInputError]}
                            error={errors.fullName}
                            maxLength={50}
                        />
                        {errors.fullName && (
                            <Text style={styles.errorText}>{errors.fullName}</Text>
                        )}
                    </View>

                    {/* Sección Fecha de nacimiento */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>Fecha de nacimiento</Text>
                        <CustomInput
                            type="date"
                            placeholder="Selecciona tu fecha"
                            value={birthDate}
                            onChangeText={(date) => {
                                setBirthDate(date);
                                if (errors.birthDate) {
                                    setErrors({ ...errors, birthDate: "" });
                                }
                            }}
                            containerStyle={errors.birthDate && styles.customInputError}
                        />
                        {errors.birthDate && (
                            <Text style={styles.errorText}>{errors.birthDate}</Text>
                        )}
                    </View>

                    {/* Sección Orinado */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>¿Eres una persona que orina?</Text>
                        <View style={styles.urinatesContainer}>
                            <Button
                                title="Sí orino"
                                variant="option"
                                selected={urinates === true}
                                onPress={() => setUrinates(true)}
                                style={styles.optionButton}
                            />

                            <Button
                                title="No orino"
                                variant="option"
                                selected={urinates === false}
                                onPress={() => setUrinates(false)}
                                style={styles.optionButton}
                            />
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Button
                            title="Siguiente"
                            variant="secondary"
                            onPress={handleNext}
                            style={styles.submitButton}
                        />
                        <Button
                            title="Iniciar sesión"
                            variant="primary"
                            onPress={handleLogin}
                            style={[styles.submitButton, styles.loginButton]}
                        />
                    </View>
                    
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    safeArea: {
        flex: 1,
    },
    topBar: {
        paddingHorizontal: 20,
        paddingTop: 8,
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 0,
        paddingBottom: 16,
        gap: 10,
    },

    section: {
        gap: 8,
        marginBottom: 4,
    },

    sectionLabel: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.textDark,
        marginLeft: 4,
    },

    nameInputContainer: {
        width: "100%",
    },

    nameInputText: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.textDark,
        textAlign: "left",
        backgroundColor: "transparent",
        borderWidth: 0,
    },

    customInputError: {
        borderColor: "#E53935",
    },

    errorText: {
        fontSize: 14,
        color: "#E53935",
        marginLeft: 4,
        fontWeight: "500",
    },

    urinatesContainer: {
        flexDirection: "row",
        gap: 12,
        justifyContent: "space-between",
        width: "100%",
    },

    optionButton: {
        flex: 1,
    },

    petRow: {
        flexShrink: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        minHeight: 150,
        marginTop: 1,
        paddingHorizontal: 4,
    },

    petImageWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "auto",
    },

    petImage: {
        width: 120,
        height: 170,
        opacity: 0.95,
    },

    speechWrapper: {
        position: "relative",
        top: 8,
        left: 0,
        marginRight: 4,
        alignSelf: "flex-start",
    },

    footer: {
        paddingHorizontal: 0,
        paddingBottom: 8,
        gap: 12,
    },

    submitButton: {
        width: "100%",
    },

    loginButton: {
        marginTop: 0,
    },
});