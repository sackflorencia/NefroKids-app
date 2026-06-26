// Welcome.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import globalStyle from "../../styles/globalStyles";
import colors from "../../styles/colors";
import typography from "../../styles/typography";
import images from "../../../assets/images";
import SpeechBubble from "../../components/home/SpeechBubble";
import Logo from "../../components/logo/logo";

export default function Welcome({ navigation }) {
  const handleLogin = () => {
    navigation.navigate("LogIn");
  };

  const handleSignUp = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      {/* Character - fondo, superpuesto por todo lo demÃ¡s */}
      <Image
        source={images.happyRiku}
        style={styles.characterImage}
        resizeMode="contain"
      />

      <View style={styles.content}>
        {/* Logo */}
        {/* PONER LOGOOOO */}
        <Logo/>

        {/* Speech bubble */}
        <View style={styles.bubbleContainer}>
          <SpeechBubble text="¡Hola, Explorador!" />
        </View>

        {/* Spacer para empujar el texto y los botones hacia abajo,
            dejando a Riku visible en el medio */}
        <View style={styles.spacer} />

        {/* Question text */}
        <Text style={[typography.subtitle, styles.question]}>
          ¿Estas listo para tu viaje de hoy?
        </Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonOutline]}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <Text style={[typography.button, styles.buttonOutlineText]}>
              Iniciar sesion
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonFilled]}
            onPress={handleSignUp}
            activeOpacity={0.85}
          >
            <Text style={[typography.button, styles.buttonFilledText]}>
              Crear cuenta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
    position: "relative",
  },
  characterImage: {
    position: "absolute",
    top: 160,
    left: -160,
    right: 0,
    bottom: 0,
    width: 600,
    height: 600,
    opacity: 0.6,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  bubbleContainer: {
    alignItems: "flex-end",
    paddingRight: 8,
  },
  spacer: {
    flex: 1,
  },
  question: {
    color: colors.secondaryShadow,
    textAlign: "center",
    marginBottom: 24,
  },
  buttonContainer: {
    gap: 14,
    paddingBottom: 32,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonOutline: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.secondaryShadow,
    borderBottomWidth: 4,
    borderBottomColor: colors.secondaryShadow,
  },
  buttonOutlineText: {
    color: colors.textLight,
  },
  buttonFilled: {
    backgroundColor: colors.secondary,
    borderBottomColor: colors.secondaryShadow,
  },
  buttonFilledText: {
    color: colors.textLight,
  },
});
