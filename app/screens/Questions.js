import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useSQLiteContext } from "expo-sqlite";
import { useRoute } from "@react-navigation/native";

import QuestionController from "../../back/controllers/QuestionController";

export default function Questions() {

  const db = useSQLiteContext();
  const route = useRoute();

  const { level } = route.params;

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {

    async function loadQuestions() {

      try {

        const controller = new QuestionController(db);

        const data = await controller.getLevelQuestions(level.id, 3);

        console.log("QUESTIONS:");
        console.log(data);

        setQuestions(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    loadQuestions();

  }, []);

  useEffect(() => {

    if (questions.length === 0) return;
    if (index >= questions.length) return;

    const current = questions[index];

    const shuffledAnswers = [
      {
        text: current.correct_answer,
        correct: true,
        feedback: current.correct_feedback,
      },
      {
        text: current.incorrect_answer1,
        correct: false,
        feedback: current.incorrect_feedback1,
      },
      current.incorrect_answer2 && {
        text: current.incorrect_answer2,
        correct: false,
        feedback: current.incorrect_feedback2,
      },
      current.incorrect_answer3 && {
        text: current.incorrect_answer3,
        correct: false,
        feedback: current.incorrect_feedback3,
      },
    ]
      .filter(Boolean)
      .sort(() => Math.random() - 0.5);

    setAnswers(shuffledAnswers);
    setSelected(null);

  }, [index, questions]);

  function handleAnswer(answer) {

    setSelected(answer);

    if (answer.correct) {
      setScore((prev) => prev + 1);
    }

  }

  function nextQuestion() {

    setIndex((prev) => prev + 1);

  }

  if (loading) {
    return <ActivityIndicator />;
  }

  if (questions.length === 0) {
    return (
      <View>
        <Text>No hay preguntas disponibles.</Text>
      </View>
    );
  }

  if (index >= questions.length) {
    return (
      <View>
        <Text>
          Puntaje: {score} / {questions.length}
        </Text>
      </View>
    );
  }

  const current = questions[index];

  return (
    <View>

      <Text>
        Pregunta {index + 1} de {questions.length}
      </Text>

      <Text>{current.question}</Text>

      {answers.map((answer, i) => (

        <TouchableOpacity
          key={i}
          onPress={() => handleAnswer(answer)}
          disabled={selected !== null}
        >

          <Text>{answer.text}</Text>

        </TouchableOpacity>

      ))}

      {selected && (

        <View>

          <Text>{selected.feedback}</Text>

          <Text>{current.explanation}</Text>

          <TouchableOpacity onPress={nextQuestion}>

            <Text>
              {index === questions.length - 1 ? "Finalizar" : "Siguiente"}
            </Text>

          </TouchableOpacity>

        </View>

      )}

    </View>
  );

}