import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import Button from "./Button";
import colors from "../styles/colors";

export default function LevelPreview({
  level,
  onStart,
}) {

  if (!level) return null;

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        {level.nombre}
      </Text>

      <Text style={styles.description}>
        {level.descripcion}
      </Text>

      <Text style={styles.xp}>
        ⭐ {level.xp_reward} XP
      </Text>

      <Button
        title="Iniciar"
        onPress={onStart}
      />

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
    marginBottom: 10,
    color: colors.textDark,
  },

  description: {
    fontSize: 16,
    marginBottom: 16,
    color: colors.textDark,
  },

  xp: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    color: colors.primary,
  },

});