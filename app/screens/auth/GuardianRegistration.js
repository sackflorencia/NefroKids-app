import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../styles/colors";

import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";
import Header from "../../components/header/Header";
import { useSQLiteContext } from "expo-sqlite";
import RegistrationService from "../../../back/services/RegistrationService";
import { useUser } from "../../context/UserContext";

const MAX_GUARDIANS = 5;

export default function GuardianRegistration({
    route,
    navigation,
}) {
    const {
        register,
        refreshUser,
        user
    } = useUser();

    const [registering, setRegistering] = useState(false);

    const { userData } = route.params;

    const db = useSQLiteContext();

    const [guardians, setGuardians] = useState([
        {
            full_name: "",
            email: "",
            relationship: "",
            phone: ""
        },
    ]);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function updateGuardian(index, field, value) {
        const updated = [...guardians];

        updated[index][field] = value;

        setGuardians(updated);
    }

    function addGuardian() {
        if (guardians.length >= MAX_GUARDIANS) {
            return;
        }

        setGuardians([
            ...guardians,
            {
                full_name: "",
                email: "",
                relationship: "",
                phone: "",
            },
        ]);
    }

    function validateGuardians() {
        // Solo validar el primer tutor (requerido)
        const primaryGuardian = guardians[0];

        if (
            !primaryGuardian.full_name?.trim() ||
            !primaryGuardian.email?.trim() ||
            !primaryGuardian.phone?.trim()
        ) {
            return false;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(primaryGuardian.email)) {
            return false;
        }

        // Validar teléfono
        const phoneNumbers =
            primaryGuardian.phone.replace(/\D/g, "");

        if (phoneNumbers.length < 8) {
            return false;
        }

        // Validar tutores adicionales
        for (let i = 1; i < guardians.length; i++) {
            const guardian = guardians[i];

            const hasAnyField =
                guardian.full_name?.trim() ||
                guardian.email?.trim() ||
                guardian.phone?.trim();

            if (hasAnyField) {
                // Si tiene algún campo, debe completar todos
                if (
                    !guardian.full_name?.trim() ||
                    !guardian.email?.trim() ||
                    !guardian.phone?.trim()
                ) {
                    return false;
                }

                if (!emailRegex.test(guardian.email)) {
                    return false;
                }

                const guardianPhoneNumbers =
                    guardian.phone.replace(/\D/g, "");

                if (guardianPhoneNumbers.length < 8) {
                    return false;
                }
            }
        }

        return true;
    }

    async function handleNext() {
        console.log(
            "========================================"
        );

        console.log(
            "SIGN UP - handleNext INICIADO"
        );

        console.log(
            "SIGN UP - Email:",
            guardians[0].email.trim()
        );

        console.log(
            "SIGN UP - Cantidad de tutores:",
            guardians.length
        );

        console.log(
            "SIGN UP - UserContext ANTES:",
            user
        );

        if (registering) {
            console.log(
                "SIGN UP - Registro ya en progreso. Se cancela segundo click."
            );

            return;
        }

        if (!validateGuardians()) {
            console.log(
                "SIGN UP - Validación fallida: campos incompletos"
            );

            Alert.alert(
                "Datos incompletos",
                "Por favor completá todos los campos del tutor principal con datos válidos (nombre, email y teléfono)."
            );

            return;
        }

        if (!password?.trim()) {
            console.log(
                "SIGN UP - Validación fallida: contraseña vacía"
            );

            Alert.alert(
                "Contraseña",
                "Ingresá una contraseña para el tutor principal."
            );

            return;
        }

        if (password.length < 6) {
            Alert.alert(
                "Contraseña débil",
                "La contraseña debe tener al menos 6 caracteres."
            );

            return;
        }

        if (password !== confirmPassword) {
            console.log(
                "SIGN UP - Validación fallida: contraseñas diferentes"
            );

            Alert.alert(
                "Contraseña",
                "Las contraseñas no coinciden."
            );

            return;
        }

        try {
            setRegistering(true);

            console.log(
                "SIGN UP - 1: Iniciando registro en Firebase"
            );

            const firebaseUser = await register(
                guardians[0].email.trim(),
                password
            );

            console.log(
                "SIGN UP - 2: Firebase register() TERMINÓ"
            );

            console.log(
                "SIGN UP - Firebase UID:",
                firebaseUser?.uid
            );

            console.log(
                "SIGN UP - Firebase email:",
                firebaseUser?.email
            );

            console.log(
                "SIGN UP - 3: Creando RegistrationService"
            );

            const registrationService =
                new RegistrationService(db);

            console.log(
                "SIGN UP - 4: Iniciando completeRegistration()"
            );

            await registrationService.completeRegistration(
                userData,
                guardians,
                firebaseUser.uid
            );

            console.log(
                "SIGN UP - 5: completeRegistration() TERMINÓ OK"
            );

            console.log(
                "SIGN UP - 6: Antes de refreshUser()"
            );

            await refreshUser();

            console.log(
                "SIGN UP - 7: refreshUser() TERMINÓ"
            );

            console.log(
                "SIGN UP - UserContext DESPUÉS:",
                user
            );

            console.log(
                "SIGN UP - 8: REGISTRO COMPLETADO CORRECTAMENTE"
            );

            console.log(
                "========================================"
            );

        } catch (error) {
            let errorMessage =
                "No se pudo completar el registro.";

            if (error.message?.includes("email")) {
                errorMessage =
                    "Este email ya está registrado. Intentá con otro.";
            } else if (error.message?.includes("password")) {
                errorMessage =
                    "La contraseña no es válida.";
            }

            Alert.alert(
                "Error en el registro",
                errorMessage
            );

        } finally {
            setRegistering(false);

            console.log(
                "SIGN UP - finally → registering = false"
            );
        }
    }

    function removeGuardian(index) {
        if (guardians.length === 1) {
            return;
        }

        const updated = guardians.filter(
            (_, i) => i !== index
        );

        setGuardians(updated);
    }

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
        >
            <SafeAreaView style={styles.safeArea}>
                <Header />

                <View style={styles.topBar}>
                    <Button
                        variant="back"
                        colorVariant="secondary"
                        direction="left"
                        onPress={() =>
                            navigation.navigate("Register")
                        }
                        style={styles.backButton}
                    />

                    <Text style={styles.title}>
                        Tutores
                    </Text>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                >
                    <Text style={styles.subtitle}>
                        Agregá al tutor que recibirá información
                        médica del niño y podrá acceder a la
                        aplicación.
                    </Text>

                    {guardians.map((guardian, index) => (
                        <View
                            key={index}
                            style={[
                                styles.guardianCard,
                                index > 0 &&
                                (index + 1) % 2 === 0
                                    ? styles.evenCard
                                    : null,
                            ]}
                        >
                            <View style={styles.headerRow}>
                                <Text style={styles.guardianTitle}>
                                    {index === 0
                                        ? "Tutor principal"
                                        : `Tutor adicional ${index}`}
                                </Text>

                                {index > 0 && (
                                    <TouchableOpacity
                                        onPress={() =>
                                            removeGuardian(index)
                                        }
                                    >
                                        <Text style={styles.deleteText}>
                                            ✕
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            <View style={styles.fieldRow}>
                                <Text style={styles.inputLabel}>
                                    Nombre completo{" "}
                                    {index === 0 ? "*" : ""}
                                </Text>

                                <CustomInput
                                    type="default"
                                    value={guardian.full_name}
                                    onChangeText={(text) =>
                                        updateGuardian(
                                            index,
                                            "full_name",
                                            text
                                        )
                                    }
                                    autoCapitalize="words"
                                    placeholder="Nombre del tutor"
                                />
                            </View>

                            <View style={styles.fieldRow}>
                                <Text style={styles.inputLabel}>
                                    Email{" "}
                                    {index === 0 ? "*" : ""}
                                </Text>

                                <CustomInput
                                    type="email"
                                    value={guardian.email}
                                    onChangeText={(text) =>
                                        updateGuardian(
                                            index,
                                            "email",
                                            text
                                        )
                                    }
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    placeholder="ejemplo@correo.com"
                                />
                            </View>

                            <View style={styles.fieldRow}>
                                <Text style={styles.inputLabel}>
                                    Teléfono{" "}
                                    {index === 0 ? "*" : ""}
                                </Text>

                                <CustomInput
                                    type="default"
                                    value={guardian.phone}
                                    onChangeText={(text) =>
                                        updateGuardian(
                                            index,
                                            "phone",
                                            text
                                        )
                                    }
                                    keyboardType="phone-pad"
                                    placeholder="11 1234-5678"
                                />
                            </View>

                            {index === 0 && (
                                <>
                                    <View style={styles.fieldRow}>
                                        <Text style={styles.inputLabel}>
                                            Contraseña *
                                        </Text>

                                        <CustomInput
                                            type="password"
                                            value={password}
                                            onChangeText={setPassword}
                                            placeholder="Mínimo 6 caracteres"
                                        />
                                    </View>

                                    <View style={styles.fieldRow}>
                                        <Text style={styles.inputLabel}>
                                            Repetir contraseña *
                                        </Text>

                                        <CustomInput
                                            type="password"
                                            value={confirmPassword}
                                            onChangeText={
                                                setConfirmPassword
                                            }
                                            placeholder="Confirmá tu contraseña"
                                        />
                                    </View>
                                </>
                            )}

                            {index > 0 && (
                                <View style={styles.fieldRow}>
                                    <Text style={styles.inputLabel}>
                                        Relación con el niño
                                    </Text>

                                    <CustomInput
                                        type="default"
                                        value={guardian.relationship}
                                        onChangeText={(text) =>
                                            updateGuardian(
                                                index,
                                                "relationship",
                                                text
                                            )
                                        }
                                        placeholder="Madre, Padre, Abuelo, Tía..."
                                    />
                                </View>
                            )}
                        </View>
                    ))}

                    {guardians.length < MAX_GUARDIANS && (
                        <Button
                            title="Agregar otro tutor (opcional)"
                            variant="secondary"
                            onPress={addGuardian}
                            style={styles.button}
                        />
                    )}

                    <Button
                        title={
                            registering
                                ? "Creando cuenta..."
                                : "Finalizar registro"
                        }
                        onPress={handleNext}
                        style={styles.button}
                        disabled={registering}
                    />
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
        paddingBottom: 0,
        flexDirection: "row",
        alignItems: "center",
    },

    backButton: {
        marginRight: 10,
    },

    content: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        paddingTop: 0,
    },

    title: {
        fontSize: 28,
        fontWeight: "800",
        color: colors.textDark,
        textAlign: "left",
        marginTop: 0,
        marginBottom: 12,
        lineHeight: 36,
        marginLeft: 12,
    },

    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.textDark,
        textAlign: "left",
        marginBottom: 18,
        fontWeight: "500",
    },

    guardianCard: {
        borderRadius: 16,
        padding: 20,
        marginBottom: 12,
        backgroundColor: "#F9F9F9",
        borderWidth: 1,
        borderColor: "#E8E8E8",
    },

    evenCard: {
        backgroundColor: "rgba(164, 241, 204, 0.15)",
        borderRadius: 16,
        padding: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "rgba(164, 241, 204, 0.3)",
    },

    guardianTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 0,
        color: colors.primaryShadow,
    },

    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 18,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
    },

    deleteText: {
        fontSize: 28,
        color: "#E53935",
        fontWeight: "300",
    },

    inputLabel: {
        color: colors.textDark,
        fontSize: 16,
        marginBottom: 8,
        marginTop: 6,
        fontWeight: "700",
    },

    fieldRow: {
        marginBottom: 16,
    },

    button: {
        marginTop: 6,
        marginBottom: 6,
    },

    scrollView: {
        flex: 1,
    },

    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        paddingTop: 0,
        flexGrow: 1,
    },
});
