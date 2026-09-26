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
                "Completá todos los campos de los tutores."
            );

            return;
        }


        if (!password.trim()) {

            console.log(
                "SIGN UP - Validación fallida: contraseña vacía"
            );

            Alert.alert(
                "Contraseña",
                "Ingresá una contraseña para el tutor principal."
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


            /*
             * ==================================================
             * FIREBASE
             * ==================================================
             */

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


            /*
             * ==================================================
             * REGISTRATION SERVICE
             * ==================================================
             */

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


            /*
             * ==================================================
             * REFRESH USER
             * ==================================================
             */

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


            /*
             * ==================================================
             * FIN
             * ==================================================
             */

            console.log(
                "SIGN UP - 8: REGISTRO COMPLETADO CORRECTAMENTE"
            );

            console.log(
                "========================================"
            );


        } catch (error) {

            Alert.alert(
                "No pudimos crear la cuenta",
                error?.message ||
                "Ocurrió un error al completar el registro."
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
                            (index + 1) % 2 === 0
                                ? styles.evenCard
                                : null,
                        ]}
                    >

                        <View style={styles.headerRow}>

                            <Text style={styles.guardianTitle}>
                                Tutor {index + 1}:
                            </Text>

                            {guardians.length > 1 && (

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
                                Nombre completo:
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
                            />

                        </View>


                        <View style={styles.fieldRow}>

                            <Text style={styles.inputLabel}>
                                Email:
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
                            />

                        </View>


                        <View style={styles.fieldRow}>

                            <Text style={styles.inputLabel}>
                                Teléfono:
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
                                placeholder="Ej. 11 1234-5678"
                            />

                        </View>


                        {index === 0 && (

                            <>

                                <View style={styles.fieldRow}>

                                    <Text style={styles.inputLabel}>
                                        Contraseña:
                                    </Text>

                                    <CustomInput
                                        type="password"
                                        value={password}
                                        onChangeText={setPassword}
                                    />

                                </View>


                                <View style={styles.fieldRow}>

                                    <Text style={styles.inputLabel}>
                                        Repetir contraseña:
                                    </Text>

                                    <CustomInput
                                        type="password"
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                    />

                                </View>

                            </>

                        )}


                        <View style={styles.fieldRow}>

                            <Text style={styles.inputLabel}>
                                Relación con el niño:
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

                    </View>

                ))}


                {guardians.length < MAX_GUARDIANS && (

                    <Button
                        title="Agregar familiar"
                        variant="secondary"
                        onPress={addGuardian}
                        style={styles.button}
                        disabled={registering}
                    />

                )}


                <Button
                    title={
                        registering
                            ? "Creando cuenta..."
                            : "Siguiente"
                    }
                    onPress={handleNext}
                    disabled={registering}
                    style={styles.button}
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
        paddingHorizontal: 20,
        paddingBottom: 30,
    },

    title: {
        fontSize: 26,
        fontWeight: "700",
        color: colors.textLight,
        textAlign: "left",
        marginTop: 20,
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 15,
        lineHeight: 22,
        color: colors.textDark,
        textAlign: "left",
        marginBottom: 10,
    },

    guardianCard: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 18,
    },

    evenCard: {
        backgroundColor: colors.secondary,
        borderRadius: 12,
        padding: 16,
        marginBottom: 18,
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
        marginBottom: 16,
    },

    deleteText: {
        fontSize: 24,
    },

    inputLabel: {
        color: "#000",
        fontSize: 15,
        marginBottom: 6,
        marginTop: 2,
        fontWeight: "600",
    },

    fieldRow: {
        marginBottom: 12,
    },

    button: {
        marginTop: 6,
        marginBottom: 10,
    },
});
