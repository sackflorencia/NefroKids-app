import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";

import QuestionController from "../../back/controllers/QuestionController";
import ProgressController from "../../back/controllers/progressController";
import { useUser } from "../context/UserContext";
import Button from "../components/Button";
import colors from "../styles/colors";
import typography from "../styles/typography";


export default function Questions() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  const db = useSQLiteContext();
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useUser();

  const routeParams = route?.params || {};
  const { levelId = "level1", sectionId = "level1_section2" } = routeParams;

  const questionController = new QuestionController(db);
  const progressController = new ProgressController(db);

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [revealedAnswers, setRevealedAnswers] = useState([]);
  const [firstTryCorrectCount, setFirstTryCorrectCount] = useState(0);

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    if (questions.length === 0 || index >= questions.length) {
      return;
    }

    const question = questions[index];

    const shuffled = [
      {
        text: question.correct_answer,
        correct: true,
        feedback: question.correct_feedback,
      },
      {
        text: question.incorrect_answer1,
        correct: false,
        feedback: question.incorrect_feedback1,
      },
      question.incorrect_answer2 && {
        text: question.incorrect_answer2,
        correct: false,
        feedback: question.incorrect_feedback2,
      },
      question.incorrect_answer3 && {
        text: question.incorrect_answer3,
        correct: false,
        feedback: question.incorrect_feedback3,
      },
    ]
      .filter(Boolean)
      .sort(() => Math.random() - 0.5);

    setCurrentAnswers(shuffled);
    setSelected(null);
    setRevealedAnswers([]);
  }, [index, questions]);

  async function loadQuestions() {
    try {
      const data = await questionController.getSectionQuestions(sectionId, 3);
      setQuestions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleAnswer(answer) {
    const alreadySelected = revealedAnswers.some((item) => item.text === answer.text);

    if (alreadySelected) {
      return;
    }

    const isFirstAttempt = revealedAnswers.length === 0;

    if (isFirstAttempt && answer.correct) {
      setFirstTryCorrectCount((prev) => prev + 1);
    }

    setRevealedAnswers((prev) => [...prev, answer]);
    setSelected(answer);
  }

  const selectedAnswerText = selected?.text;
  const correctAnswer = revealedAnswers.find((answer) => answer.correct) || null;
  const hasCorrectAnswer = Boolean(correctAnswer);
  const activeFeedback = correctAnswer || selected;

  const score = hasCorrectAnswer ? 1 : 0;

  async function nextQuestion() {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      return;
    }

    await finishQuiz();
  }

  async function finishQuiz() {
    await progressController.completeSection(user.childId, levelId, sectionId, {
      score,
      total: questions.length,
      firstTryCorrectCount,
    });

    navigation.navigate("Levels");
  }

  const progressWidth = useMemo(() => {
    if (!questions.length) return 0;
    return (((index + 1) / questions.length) * 100);
  }, [index, questions.length]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primaryShadow} />
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No hay preguntas disponibles.</Text>
      </View>
    );
  }

  const question = questions[index];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          title=""
          variant="back"
          colorVariant="secondary"
          direction="left"
          onPress={() => navigation.navigate("Levels")}
        />

        <Text style={[typography.title, styles.title]}>Niveles</Text>

        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <Text style={styles.questionTitle}>{question.question}</Text>

        <View style={styles.progressWrap}>
          <View style={styles.progressBackground}>
            <View style={[styles.progressFill, { width: `${progressWidth}%` }]} />
          </View>
        </View>

        <View style={styles.optionsWrap}>
          {currentAnswers.map((answer, optionIndex) => {
            const isSelected = revealedAnswers.some((item) => item.text === answer.text);
            const isWrongSelected = isSelected && !answer.correct;
            const isCorrectSelected = isSelected && answer.correct;

            return (
              <Button
                key={`${answer.text}-${optionIndex}`}
                title={answer.text}
                variant={
                  isCorrectSelected
                    ? "primary"
                    : isWrongSelected
                      ? "secondary"
                      : "option"
                }
                selected={isSelected}
                onPress={() => handleAnswer(answer)}
                style={styles.optionButton}
              />
            );
          })}
        </View>

        {hasCorrectAnswer && (
          <View style={styles.feedbackCard}>
            <Text style={styles.feedbackText}>{activeFeedback.feedback}</Text>
            <Text style={styles.explanationText}>{question.explanation}</Text>

            <Button
              title={index === questions.length - 1 ? "Finalizar" : "Siguiente"}
              variant="secondary"
              onPress={nextQuestion}
              style={styles.nextButton}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingTop: 50,
  },
  header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
      elevation: 4,
      zIndex: 10,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.textDark,
    },
    headerSpacer: {
      width: 24,
      height: 24,
    },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 28,
    paddingTop: 10,
    paddingBottom: 18,
  },
  questionTitle: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "700",
    color: "#1F1F1F",
    textAlign: "center",
    marginBottom: 12,
  },
  title: {
      color: colors.textDark,
      textAlign: "center",
      flex: 1,
  },
  progressWrap: {
    width: "100%",
    marginBottom: 16,
  },
  progressBackground: {
    height: 20,
    borderRadius: 18,
    backgroundColor: "#D7F5EC",
    overflow: "hidden",
    width: "100%",
  },
  progressFill: {
    height: "100%",
    borderRadius: 18,
    backgroundColor: colors.primary,
  },
  optionsWrap: {
    gap: 12,
  },
  optionButton: {
    width: "100%",
  },
  feedbackCard: {
    marginTop: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  feedbackText: {
    fontSize: 18,
    color: "#1F1F1F",
    marginBottom: 8,
    fontWeight: "600",
  },
  explanationText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
    lineHeight: 20,
  },
  nextButton: {
    marginTop: 4,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});