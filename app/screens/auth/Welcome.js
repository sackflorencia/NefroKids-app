import React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import Button from "../../components/Button";

export default function Welcome({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>
        ¿Estás listo para tu viaje de hoy?
      </Text>

      <Button
        title="Iniciar sesión"
        onPress={() => navigation.navigate("LogIn")}
      />

      <Button
        title="Crear cuenta"
        variant="secondary"
        onPress={() => navigation.navigate("Register")}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 16,
  },

  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 40,
  },
});