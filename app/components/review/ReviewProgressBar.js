import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default function ReviewProgressBar({ current, total }) {

    const progress = (current / total) * 100;

    return (
        <View style={styles.container}>
            <View style={[styles.progress, { width: `${progress}%` }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 16,
        backgroundColor: "#C8F2E3",
        borderRadius: 999,
        overflow: "hidden",
        marginBottom: 32,
    },
    progress: {
        height: "100%",
        backgroundColor: colors.primaryShadow,
        borderRadius: 999,
    },
});