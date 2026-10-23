import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FeelingSelector from "./FeelingSelector";
import BodySelector from "./BodySelector";
import ColorOptions from "./ColorOptions";
import Button from "../Button";
import colors from "../../styles/colors";
import { useSQLiteContext } from "expo-sqlite";
import { useUser } from "../../context/UserContext";
import UserController from "../../../back/controllers/userController";

const QUESTIONS = [
  { id: "mood",       type: "feeling", question: "¿Cómo te sentís hoy?" },
  { id: "pain",       type: "body",    question: "¿Te duele algo?" },
  { id: "urineColor", type: "color",   question: "¿De qué color es tu orina?" },
];

export default function CheckInForm({ onFinish }) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedValue, setSelectedValue] = useState(null);
  const [child, setChild] = useState(null);

  const db = useSQLiteContext();
  const { user } = useUser();

  const currentQuestion = QUESTIONS[currentIndex];

  // Preguntas visibles: si el niño/a NO orina, removemos la pregunta de color
  const questions = child && child.urinates === 0
    ? QUESTIONS.filter((q) => q.id !== "urineColor")
    : QUESTIONS;

  useEffect(() => {
    async function loadChild() {
      if (!user || !db) return;
      try {
        const controller = new UserController(db);
        const c = await controller.getUserById(user.childId);
        setChild(c || null);
      } catch (e) {
        setChild(null);
      }
    }
    loadChild();
  }, [user, db]);

  // Mantener currentIndex válido si cambia la lista de preguntas
  useEffect(() => {
    if (currentIndex >= questions.length) {
      setCurrentIndex(Math.max(0, questions.length - 1));
    }
  }, [questions.length]);

  function handleSelect(value) {
    setSelectedValue(value);
  }

  function handlePrevious() {
    if (currentIndex === 0) return;

    const previousIndex = currentIndex - 1;
    const previousQuestionId = QUESTIONS[previousIndex].id;

    setSelectedValue(answers[previousQuestionId] ?? null);
    setCurrentIndex(previousIndex);
  }

  async function handleNext() {
    const currentQuestion = questions[currentIndex];

    // Validación: para preguntas de dolor, debe haber al menos una selección
    if (currentQuestion.id === "pain") {
      if (!selectedValue || (Array.isArray(selectedValue) && selectedValue.length === 0)) {
        return;
      }
    } else if (!selectedValue) {
      return;
    }

    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: selectedValue,
    };

    setAnswers(updatedAnswers);

    const isLastQuestion = currentIndex === questions.length - 1;

    if (isLastQuestion) {
      // Si la pregunta de color fue removida por configuración (niño/a no orina),
      // guardamos 'no_urine' automáticamente.
      const urineColor = updatedAnswers.urineColor ?? (child && child.urinates === 0 ? 'no_urine' : undefined);

      await onFinish({
        general_mood:  updatedAnswers.mood,
        pain_location: JSON.stringify(updatedAnswers.pain || []), // Serializar array a JSON
        urine_color:   urineColor,
      });
      return;
    }

    setSelectedValue(null);
    setCurrentIndex(currentIndex + 1);
  }

  const isValid = () => {
    const cq = questions[currentIndex];
    if (cq.id === "pain") {
      return Array.isArray(selectedValue) && selectedValue.length > 0;
    }
    return !!selectedValue;
  };

  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === questions.length - 1;

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
          <Text style={styles.question}>{questions[currentIndex].question}</Text>
        </View>

        {/* Opciones */}
        <View style={styles.optionsContainer}>
          {questions[currentIndex].type === "feeling" && (
            <FeelingSelector
              selected={selectedValue}
              onSelect={handleSelect}
            />
          )}
          {questions[currentIndex].type === "body" && (
            <BodySelector
              selected={selectedValue}
              onSelect={handleSelect}
            />
          )}
          {questions[currentIndex].type === "color" && (
            <ColorOptions
              selected={selectedValue}
              onSelect={handleSelect}
            />
          )}
        </View>

      </View>

      {/* Botón siguiente */}
      <View style={styles.footer}>
        {!isLastQuestion ? (
          <Button
            title="Siguiente pregunta"
            variant="secondary"
            onPress={handleNext}
            style={[styles.nextButton, !isValid() && styles.disabled]}
          />
        ) : (
          <Button
            title="Guardar"
            variant="secondary"
            onPress={handleNext}
            style={[styles.nextButton, !isValid() && styles.disabled]}
          />
        )}

        {!isFirstQuestion && (
          <Button
            title="Pregunta anterior"
            variant="primary"
            onPress={handlePrevious}
            style={styles.prevButton}
          />
        )}
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
    marginTop: -30,
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
    fontSize: 32,
    fontWeight: "700",
    color: colors.primaryShadow,
  },
  questionContainer: {
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  question: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.textDark,
    textAlign: "center",
    lineHeight: 35,
    letterSpacing: 0.3,
  },
  optionsContainer: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 36,
    paddingTop: 12,
    gap: 12,
  },
  prevButton: {
    width: "100%",
    alignSelf: "center",
    borderRadius: 28,
  },
  nextButton: {
    width: "100%",
    alignSelf: "center",
    borderRadius: 28,
  },
  disabled: {
    opacity: 0.4,
  },
});