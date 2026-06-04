import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FeelingSelector from "./FeelingSelector";
import BodySelector from "./BodySelector";
import ColorOptions from "./ColorOptions";
import Button from "../Button";
import colors from "../../styles/colors";

const QUESTIONS = [
  { id: "mood",       type: "feeling", question: "¿Cómo te sentís hoy?" },
  { id: "pain",       type: "body",    question: "¿Te duele algo?" },
  { id: "urineColor", type: "color",   question: "¿De qué color es tu orina?" },
];

export default function CheckInForm({ onFinish }) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedValue, setSelectedValue] = useState(null);

  const currentQuestion = QUESTIONS[currentIndex];

  function handleSelect(value) {
    setSelectedValue(value);
  }

  async function handleNext() {
    if (!selectedValue) return;

    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: selectedValue,
    };

    setAnswers(updatedAnswers);

    const isLastQuestion = currentIndex === QUESTIONS.length - 1;

    if (isLastQuestion) {
      await onFinish({
        general_mood:  updatedAnswers.mood,
        pain_location: updatedAnswers.pain,
        urine_color:   updatedAnswers.urineColor,
      });
      return;
    }

    setSelectedValue(null);
    setCurrentIndex(currentIndex + 1);
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* Header verde */}
      <View style={styles.header} />

      <View style={styles.content}>

        {/* Círculo con número de pregunta */}
        <View style={styles.stepCircleWrapper}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepNumber}>{currentIndex + 1}</Text>
          </View>
        </View>

        {/* Pregunta */}
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{currentQuestion.question}</Text>
        </View>

        {/* Opciones */}
        <View style={styles.optionsContainer}>
          {currentQuestion.type === "feeling" && (
            <FeelingSelector
              selected={selectedValue}
              onSelect={handleSelect}
            />
          )}
          {currentQuestion.type === "body" && (
            <BodySelector
              selected={selectedValue}
              onSelect={handleSelect}
            />
          )}
          {currentQuestion.type === "color" && (
            <ColorOptions
              selected={selectedValue}
              onSelect={handleSelect}
            />
          )}
        </View>

      </View>

      {/* Botón siguiente */}
      <View style={styles.footer}>
        <Button
          title="Siguiente pregunta"
          variant="secondary"
          onPress={handleNext}
          style={[styles.nextButton, !selectedValue && styles.disabled]}
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
  header: {
    height: 50,
    backgroundColor: "#B7F0D6",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  stepCircleWrapper: {
    alignItems: "center",
    marginTop: -30, // se superpone sobre el header
    marginBottom: 24,
  },
  stepCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "#A4F1CC",
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  stepNumber: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.primaryShadow,
  },
  questionContainer: {
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  question: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.textDark,
    textAlign: "center",
    lineHeight: 30,
  },
  optionsContainer: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 36,
    paddingTop: 12,
  },
  nextButton: {
    width: "100%",
  },
  disabled: {
    opacity: 0.4,
  },
});