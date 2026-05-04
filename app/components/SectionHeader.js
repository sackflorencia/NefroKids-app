import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";
import typography from "../styles/typography";

export default function SectionHeader({ title, section }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Text style={styles.section}>Sección {section}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.shadow} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: colors.secondary,
    borderRadius: 20,
    padding: 16,
    zIndex: 2,
  },
  shadow: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    height: "100%",
    backgroundColor: colors.secondaryShadow,
    borderRadius: 20,
    zIndex: 1,
  },
  section: {
    ...typography.button,
    color: colors.textLight,
    marginBottom: 4,
  },
  title: {
    ...typography.title,
    color: colors.textLight,
  },
});