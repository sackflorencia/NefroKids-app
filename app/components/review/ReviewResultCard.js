import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../styles/colors";
import Button from "../Button";

export default function ReviewResultCard({ score, total }) {

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.content}>
                <Text style={styles.title}>¡Review completado!</Text>
                <Text style={styles.score}>{score} / {total}</Text>
            </View>

            <View style={styles.footer}>
                <Button
                    title="Volver al inicio"
                    variant="primary"
                    style={styles.button}
                />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: colors.textDark,
    },
    score: {
        fontSize: 48,
        fontWeight: "800",
        color: colors.primaryShadow,
    },
    footer: {
        paddingHorizontal: 24,
        paddingBottom: 36,
    },
    button: {
        width: "100%",
    },
});