// WelcomeScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import globalStyle from "../../styles/globalStyles";
import colors from "../../styles/colors";
import typography from "../../styles/typography";
import images from "../../../assets/images";
import Button from "../../components/Button";
import LogoSlogan from "../../components/logo/logo";

const SLIDES = [
  {
    title: "¡Hola soy Riku!",
    text: "Voy a ser tu compañero en esta aventura. Te voy a ayudar a aprender y a seguir tu tratamiento paso a paso.",
  },
  {
    title: "¡Aprender puede ser divertido!",
    text: "Completá actividades, descubrí­ consejos y conseguí­ nuevos logros mientras avanzas.",
  },
  {
    title: "¡Registrá tu tratamiento!",
    text: "Guardá la informacion de tus sesiones de diálisis y seguí tu progreso día a día.",
  },
  {
    title: "Siempre acompañando",
    text: "Tu familia, tus médicos y Riku van a estar con vos durante todo el camino.",
  },
];

export default function Introduction({ navigation }) {
  const [step, setStep] = useState(0);

  const isLast = step === SLIDES.length - 1;
  const isFirst = step === 0;

  const goNext = () => {
    if (!isLast) setStep((prev) => prev + 1);
  };

  const goPrev = () => {
    if (!isFirst) setStep((prev) => prev - 1);
  };

  const handleContinue = () => {
    navigation.navigate("Welcome");
  };

  return (
    <SafeAreaView style={globalStyle.container}>
      {/* Zonas tÃ¡ctiles para avanzar/retroceder */}
      <View style={styles.touchZonesContainer} pointerEvents="box-none">
        <Pressable style={styles.touchZoneLeft} onPress={goPrev} />
        <Pressable style={styles.touchZoneRight} onPress={goNext} />
      </View>

      <View style={styles.content}>
        {/* Progress bar */}
        <View style={styles.progressContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressBar,
                {
                  backgroundColor:
                    index <= step ? colors.secondaryShadow : colors.secondary,
                },
              ]}
            />
          ))}
        </View>

        {/* Logo */}
        <LogoSlogan/>

        {/* Text content */}
        <View style={styles.textContainer}>
          <Text style={[typography.title, styles.title]}>
            {SLIDES[step].title}
          </Text>
          <Text style={[typography.subtitle, styles.subtitle]}>
            {SLIDES[step].text}
          </Text>
        </View>

        {/* Character */}
        <View style={styles.characterContainer}>
          <Image
            source={images.confusedRiku}
            style={[
              styles.characterImage,
              isLast && styles.characterImageLast,
            ]}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Continue button */}
      {isLast && (
        <View style={styles.buttonContainer}>
          <Button
            title="Continuar"
            onPress={handleContinue}
            variant="secondary"
            style={styles.button}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  touchZonesContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    zIndex: 1,
  },
  touchZoneLeft: {
    flex: 1,
  },
  touchZoneRight: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  progressContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 28,
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  textContainer: {
    marginBottom: 8,
  },
  title: {
    color: colors.primaryShadow,
    marginBottom: 10,
  },
  subtitle: {
    color: colors.textDark,
    lineHeight: 24,
  },
  characterContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  characterImage: {
    width: 300,
    height: 500,
    marginLeft:100
  },
  characterImageLast: {
  width: 220,
  height: 360,
  marginLeft: 150,
},
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
    zIndex: 2,
  },
  buttonText: {
    color: colors.textLight,
  },
});
