import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../styles/colors";

import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";
import Header from "../../components/header/Header";
import { useSQLiteContext } from "expo-sqlite";
import RegistrationService from "../../../back/services/RegistrationService";
import { useUser } from "../../context/UserContext";
import images from "../../../assets/images";
import TutorController from "../../../back/controllers/tutorController";

const MAX_GUARDIANS = 5;

export default function GuardianRegistration({
    route,
    navigation,
}) {
    const { register, refreshUser } = useUser();
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

            const firebaseUser = await register(
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
            const users = await db.getAllAsync(
                "SELECT * FROM users"
            );

            const tutorsLog = await db.getAllAsync(
                "SELECT * FROM tutors"
            );

            console.log("USERS SQLITE:", users);
            console.log("TUTORS SQLITE:", tutorsLog);
            const tutors = await new TutorController(db).getAllTutors();

            console.log("TUTORES DESPUÉS DEL SIGNUP:", tutors);

            console.log("4 - Registro completo");

            await refreshUser();

            console.log("5 - Context actualizado");

            // Si corresponde:
            // navigation.replace("Home");

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
            <Header />

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
                        style={[
                            styles.guardianCard,
                            (index + 1) % 2 === 0 ? styles.evenCard : null,
                        ]}
                    >

                        <View style={styles.headerRow}>
                            <Text style={styles.guardianTitle}>
                                Tutor {index + 1}:
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
                        </View>

                        <View style={styles.fieldRow}>
                            <Text style={styles.inputLabel}>Nombre completo:</Text>
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
                            />
                        </View>

                        <View style={styles.fieldRow}>
                            <Text style={styles.inputLabel}>Email:</Text>
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
                            />

                        </View>

                        <View style={styles.fieldRow}>
                            <Text style={styles.inputLabel}>Teléfono:</Text>
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
                                placeholder="Ej. 11 1234-5678"
                            />
                        </View>

                        {index === 0 && (
                            <>
                                <View style={styles.fieldRow}>
                                    <Text style={styles.inputLabel}>Contraseña:</Text>
                                    <CustomInput
                                        type="password"
                                        value={password}
                                        onChangeText={setPassword}
                                    />
                                </View>

                                <View style={styles.fieldRow}>
                                    <Text style={styles.inputLabel}>Repetir contraseña:</Text>
                                    <CustomInput
                                        type="password"
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                    />
                                </View>
                            </>
                        )}

                        <View style={styles.fieldRow}>
                            <Text style={styles.inputLabel}>Relación con el niño:</Text>
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

                    </View>

                ))}

                {guardians.length < MAX_GUARDIANS && (

                    <Button
                        title="Agregar familiar"
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
    guardianTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 0,
        color: colors.textLight,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    deleteText: {
        fontSize: 24,
    },
    inputLabel: {
        color: '#000',
        fontSize: 15,
        marginBottom: 6,
        marginTop: 2,
        fontWeight: '600',
    },
    oddCard: {
        backgroundColor: colors.secondary,
        borderRadius: 12,
        padding: 12,
    },
    inputWrapper: {
        marginBottom: 14,
    },
    fieldRow: {
        marginBottom: 12,
    },
    evenCard: {
        backgroundColor: colors.secondary,
        borderRadius: 12,
        padding: 12,
    },
});
