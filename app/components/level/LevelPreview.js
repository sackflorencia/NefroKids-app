import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import Button from "../Button";
import colors from "../../styles/colors";

export default function LevelPreview({
  level,
  onStartSection,
}) {

  if (!level) {
    return null;
  }

  const firstAvailableSection =
    Array.isArray(level.sections)
      ? level.sections.find(section => section.state !== "blocked")
      : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {level.nombre}
      </Text>

      <Text style={styles.description}>
        {level.descripcion}
      </Text>

      {firstAvailableSection && (
        <Button
          title="Jugar"
          onPress={() => onStartSection(firstAvailableSection)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    color: colors.textDark,
    marginBottom: 20,
  },
});