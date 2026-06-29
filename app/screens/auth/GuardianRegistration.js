import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InputField from "../../components/InputField";
import Button from "../../components/Button";
import AuthService from "../../../back/services/AuthService";
import { useSQLiteContext } from "expo-sqlite";
import RegistrationService from "../../../back/services/RegistrationService";

const MAX_GUARDIANS = 5;

export default function GuardianRegistration({
    route,
    navigation,
}) {

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

    function updateGuardian(
        index,
        field,
        value
    ) {

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

        for (const guardian of guardians) {

            if (
                !guardian.full_name.trim() ||
                !guardian.email.trim() ||
                !guardian.phone.trim() ||
                !guardian.relationship.trim()
            ) {

                return false;
            }
        }

        return true;
    }

    async function handleNext() {

        if (!validateGuardians()) {

            Alert.alert(
                "Datos incompletos",
                "Completá todos los campos de los tutores."
            );

            return;
        }
        if (!password.trim()) {

            Alert.alert(
                "Contraseña",
                "Ingresá una contraseña para el tutor principal."
            );

            return;
        }

        if (password !== confirmPassword) {

            Alert.alert(
                "Contraseña",
                "Las contraseñas no coinciden."
            );

            return;
        }

        try {
            console.log("1 - Empieza registro");
            const authService =
                new AuthService();

            const firebaseUser =
                await authService.registerTutor(

                    guardians[0].email,

                    password

                );
            console.log("2 - Usuario Firebase creado");

            const registrationService =
                new RegistrationService(db);
            console.log("3 - Antes de completeRegistration");

            await registrationService.completeRegistration(

                userData,

                guardians,

                firebaseUser.uid

            );
            console.log("4 - Registro completo");

        } catch (error) {

            console.error(error);

            Alert.alert(
                "Error",
                "No se pudo completar el registro."
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
        <SafeAreaView style={styles.container}>

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >

                <Text style={styles.title}>
                    ¿Quién te acompaña a los turnos médicos?
                </Text>

                <Text style={styles.subtitle}>
                    Agrega a las personas que ayudan a manejar el tratamiento del niño y deberían recibir su información médica.
                </Text>

                {guardians.map((guardian, index) => (

                    <View
                        key={index}
                        style={styles.guardianCard}
                    >

                        <Text style={styles.guardianTitle}>
                            Tutor #{index + 1}
                        </Text>

                        {guardians.length > 1 && (
                            <TouchableOpacity
                                onPress={() => removeGuardian(index)}
                            >
                                <Text style={styles.deleteText}>
                                    ✕
                                </Text>
                            </TouchableOpacity>
                        )}

                        <InputField
                            label="Nombre completo"
                            value={guardian.full_name}
                            onChangeText={(text) =>
                                updateGuardian(
                                    index,
                                    "full_name",
                                    text
                                )
                            }
                            autoCapitalize="words"
                        />

                        <InputField
                            label="Email"
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
                        />
                        <InputField
                            label="Teléfono"
                            value={guardian.phone}
                            onChangeText={(text) =>
                                updateGuardian(
                                    index,
                                    "phone",
                                    text
                                )
                            }
                            keyboardType="phone-pad"
                        />
                        {index === 0 && (
                            <>
                                <InputField
                                    label="Contraseña"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                />

                                <InputField
                                    label="Confirmar contraseña"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry
                                />
                            </>
                        )}

                        <InputField
                            label="Relacion con el niño"
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

                ))}

                {guardians.length < MAX_GUARDIANS && (

                    <Button
                        title="+ Agrega otro tutor"
                        variant="secondary"
                        onPress={addGuardian}
                    />

                )}

                <Button
                    title="Siguiente"
                    onPress={handleNext}
                />

            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    content: {
        padding: 24,
        gap: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
    },

    subtitle: {
        fontSize: 16,
        lineHeight: 22,
        opacity: 0.7,
    },

    guardianCard: {
        marginTop: 12,
    },

    guardianTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 16,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    deleteText: {
        fontSize: 24,
    },
});