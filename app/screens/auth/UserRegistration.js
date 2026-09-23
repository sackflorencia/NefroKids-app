import React, { useState } from "react";
import {
    View,
    Image,
    StyleSheet,
    Alert,
    TextInput,
    Text,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";
import BackButton from "../../components/BackButton";
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
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
        >
            <SafeAreaView style={styles.safeArea}>
                <Header />

                <View style={styles.topBar}>
                    <BackButton />
                </View>

                <ScrollView
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Avatar */}
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Image
                                source={PerfilVacio}
                                style={styles.avatarImage}
                                resizeMode="cover"
                            />
                        </View>
                    </View>

                    {/* Sección Nombre */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>Nombre del niño</Text>
                        <TextInput
                            placeholder="Escribe aquí"
                            value={fullName}
                            onChangeText={(text) => {
                                setFullName(text);
                                if (errors.fullName) {
                                    setErrors({ ...errors, fullName: "" });
                                }
                            }}
                            autoCapitalize="words"
                            style={[styles.nameInput, errors.fullName && styles.inputError]}
                            placeholderTextColor="#BDBDBD"
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

                    {/* Mascota y mensaje */}
                    <View style={styles.petRow}>
                        <View style={styles.speechWrapper}>
                            <SpeechBubble
                                message="¿Listo para explorar?"
                                direction="right"
                                backgroundColor="#FFFFFF"
                                textColor="#999"
                            />
                        </View>

                        <View style={styles.petImageWrapper}>
                            <Image
                                source={images.confusedRiku}
                                style={styles.petImage}
                            />
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Button
                            title="Siguiente"
                            onPress={handleNext}
                            style={styles.submitButton}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
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
        paddingBottom: 4,
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

    avatarContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 6,
    },

    avatar: {
        width: 145,
        height: 145,
        borderRadius: 72.5,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
    },

    avatarImage: {
        width: "100%",
        height: "100%",
        borderRadius: 72.5,
    },

    nameInput: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "600",
        color: colors.textLight,
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#E8E8E8",
    },

    inputError: {
        borderColor: "#E53935",
        backgroundColor: "rgba(229, 57, 53, 0.05)",
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
    },

    submitButton: {
        width: "100%",
    },
});