import React, { useState } from "react";
import {
    View,
    Image,
    StyleSheet,
    Alert,
    TextInput,
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

    async function handleNext() {
        if (!fullName || !birthDate) {
            Alert.alert(
                "Datos incompletos",
                "Completá todos los campos"
            );
            return;
        }

        console.log("handlenext activated");

        navigation.navigate("GuardianRegistration", {
            userData: {
                full_name: fullName,
                birth_date: birthDate.toISOString().split("T")[0],
                urinates: urinates ? 1 : 0,
            },
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header />

            <View style={styles.content}>
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

                {/* Nombre */}
                <TextInput
                    placeholder="Nombre del niño"
                    value={fullName}
                    onChangeText={setFullName}
                    autoCapitalize="words"
                    style={styles.nameInput}
                    placeholderTextColor={colors.textLight}
                />

                {/* Fecha de nacimiento */}
                <CustomInput
                    type="date"
                    placeholder="Fecha de nacimiento"
                    label="Fecha de nacimiento"
                    value={birthDate}
                    onChangeText={setBirthDate}
                />

                {/* Sí / No */}
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

                {/* Siguiente */}
                <Button
                    title="Siguiente"
                    onPress={handleNext}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 8,
        paddingBottom: 20,
        gap: 14,
    },

    avatarContainer: {
        alignItems: "center",
        justifyContent: "center",
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
        fontSize: 18,
        fontWeight: "600",
        color: colors.textLight,
        paddingVertical: 6,
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
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        width: "100%",
        minHeight: 170,
    },

    petImageWrapper: {
        alignItems: "center",
        justifyContent: "flex-end",
        marginLeft: "auto",
    },

    petImage: {
        width: 190,
        height: 245,
        opacity: 0.95,
    },

    speechWrapper: {
        position: "absolute",
        top: 25,
        left: 0,
    },
});