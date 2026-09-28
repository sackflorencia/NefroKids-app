// Welcome.js
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import globalStyle from "../../styles/globalStyles";
import colors from "../../styles/colors";
import typography from "../../styles/typography";
import images from "../../../assets/images";
import SpeechBubble from "../../components/speechBubble.js/SpeechBubble";
import Logo from "../../components/logo/logo";
import Button from "../../components/Button";

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
          <SpeechBubble message="¡Hola, Explorador!" />
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
          <Button
            title="Iniciar sesion"
            variant="secondary"
            onPress={handleLogin}
            style={styles.buttonOutline}
          />

          <Button
            title="Crear cuenta"
            variant="primary"
            onPress={handleSignUp}
            style={styles.buttonFilled}
          />
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
    gap: 12,
    paddingBottom: 32,
  },
  buttonOutline: {
    width: "100%",
  },
  buttonFilled: {
    width: "100%",
  },
});
