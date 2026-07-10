import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { useSQLiteContext } from "expo-sqlite";
import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import QuestionController from "../../back/controllers/QuestionController";
import ProgressController from "../../back/controllers/progressController";
import { useUser } from "../context/UserContext";

export default function Questions() {

  const db = useSQLiteContext();
  const navigation = useNavigation();
  const route = useRoute();

  const { user } = useUser();

  const { levelId, sectionId } = route.params;

  const questionController =
    new QuestionController(db);

  const progressController =
    new ProgressController(db);

  const [loading, setLoading] = useState(true);

  const [questions, setQuestions] = useState([]);

  const [index, setIndex] = useState(0);

  const [answers, setAnswers] = useState([]);

  const [selected, setSelected] = useState(null);

  const [currentAnswers, setCurrentAnswers] =
    useState([]);

  useEffect(() => {

    loadQuestions();

  }, []);

  useEffect(() => {

    if (
      questions.length === 0 ||
      index >= questions.length
    ) {
      return;
    }

    const question =
      questions[index];

    const shuffled = [
      {
        text: question.correct_answer,
        correct: true,
        feedback:
          question.correct_feedback,
      },
      {
        text:
          question.incorrect_answer1,
        correct: false,
        feedback:
          question.incorrect_feedback1,
      },
      question.incorrect_answer2 && {
        text:
          question.incorrect_answer2,
        correct: false,
        feedback:
          question.incorrect_feedback2,
      },
      question.incorrect_answer3 && {
        text:
          question.incorrect_answer3,
        correct: false,
        feedback:
          question.incorrect_feedback3,
      },
    ]
      .filter(Boolean)
      .sort(() => Math.random() - 0.5);

    setCurrentAnswers(shuffled);

    setSelected(null);

  }, [index, questions]);

  async function loadQuestions() {

    try {

      const data =
        await questionController.getSectionQuestions(
          sectionId,
          3
        );

      setQuestions(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  function handleAnswer(answer) {

    setSelected(answer);

    setAnswers(prev => [
      ...prev,
      {
        questionId:
          questions[index].id,
        correct:
          answer.correct,
      }
    ]);

  }

  async function nextQuestion() {

    if (
      index <
      questions.length - 1
    ) {

      setIndex(index + 1);

      return;

    }

    await finishQuiz();

  }

  async function finishQuiz() {

    const score =
      answers.filter(
        a => a.correct
      ).length;

    if (
      selected?.correct
    ) {
      score++;
    }

    await progressController.completeSection(
      user.childId,
      levelId,
      sectionId,
      {
        score,
        total:
          questions.length,
      }
    );

    navigation.navigate(
      "Levels"
    );

  }

  if (loading) {

    return (
      <ActivityIndicator
        style={{
          flex: 1,
        }}
      />
    );

  }

  if (
    questions.length === 0
  ) {

    return (
      <View style={styles.center}>

        <Text>
          No hay preguntas disponibles.
        </Text>

      </View>
    );

  }

  const question =
    questions[index];

  return (

    <View style={styles.container}>

      <Text style={styles.counter}>
        Pregunta {index + 1} de{" "}
        {questions.length}
      </Text>

      <Text style={styles.question}>
        {question.question}
      </Text>

      {currentAnswers.map(
        (
          answer,
          index
        ) => (

          <TouchableOpacity
            key={index}
            style={styles.answer}
            disabled={selected}
            onPress={() =>
              handleAnswer(
                answer
              )
            }
          >

            <Text>
              {answer.text}
            </Text>

          </TouchableOpacity>

        )
      )}

      {selected && (

        <View style={styles.feedback}>

          <Text>
            {selected.feedback}
          </Text>

          <Text>
            {question.explanation}
          </Text>

          <TouchableOpacity
            style={styles.next}
            onPress={
              nextQuestion
            }
          >

            <Text>

              {index ===
              questions.length - 1
                ? "Finalizar"
                : "Siguiente"}

            </Text>

          </TouchableOpacity>

        </View>

      )}

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  counter: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },

  question: {
    fontSize: 24,
    marginBottom: 30,
  },

  answer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },

  feedback: {
    marginTop: 30,
  },

  next: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
  },

});