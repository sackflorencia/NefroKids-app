import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Alert,
    ScrollView
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import InputField from "../../components/InputField";
import Button from "../../components/Button";
import DatePickerField from "../../components/DatePickerField";

const UserRegistration = ({ navigation }) => {

    const [fullName, setFullName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [urinates, setUrinates] = useState(true);

    async function handleNext() {

        if (
            !fullName.trim() ||
            !birthDate
        ) {

            Alert.alert(
                "Datos incompletos",
                "Completá todos los campos"
            );

            return;
        }
        console.log("handlenext activated"
        );

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

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >

                <InputField
                    label="Nombre completo"
                    value={fullName}
                    onChangeText={setFullName}
                    autoCapitalize="words"
                />

                <DatePickerField
                    label="Fecha de nacimiento"
                    value={birthDate}
                    onChange={setBirthDate}
                />

                <View style={styles.section}>

                    <Button
                        title="Sí orino"
                        variant="option"
                        selected={urinates}
                        onPress={() => setUrinates(true)}
                    />

                    <Button
                        title="No orino"
                        variant="option"
                        selected={!urinates}
                        onPress={() => setUrinates(false)}
                    />

                </View>

                <Button
                    title="Siguiente"
                    onPress={handleNext}
                />

            </ScrollView>

        </SafeAreaView>
    );
};

export default UserRegistration;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    content: {
        padding: 24,
        gap: 20,
    },

    section: {
        gap: 12,
    },
});