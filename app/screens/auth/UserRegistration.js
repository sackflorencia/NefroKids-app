import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Alert,
    ScrollView,
    TextInput
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";
import ToggleSwitch from "../../components/ToggleSwitch";
import colors from "../../styles/colors";
import Header from "../../components/header/Header";


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
        navigation.navigate(
            "GuardianRegistration",
            {
                userData: {
                    full_name: fullName,
                    birth_date: birthDate.toISOString().split("T")[0],
                    urinates: urinates ? 1 : 0,
                }
            }
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Avatar */}
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Ionicons
                            name="person"
                            size={60}
                            color="#FFFFFF"
                        />
                    </View>
                </View>

                {/* Nombre centrado en naranja */}
                <TextInput
                    placeholder="Nombre del niño"
                    value={fullName}
                    onChangeText={setFullName}
                    autoCapitalize="words"
                    style={styles.nameInput}
                    placeholderTextColor={colors.textLight}
                />

                <CustomInput
                    type="date"
                    placeholder="Seleccionar fecha"
                    label="Fecha de nacimiento"
                    value={birthDate}
                    onChange={setBirthDate}
                />
                

                <ToggleSwitch
                    value={urinates}
                    onValueChange={setUrinates}
                    leftLabel="Sí orino"
                    rightLabel="No orino"
                />

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
        paddingBottom: 40,
    },
    avatarContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 8,
        borderColor: colors.primary,
    },
    nameInput: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "600",
        color: colors.textLight,
        paddingVertical: 10,
    },
});