import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

const Questions = ({ level, questionController }) => {

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);

        const data = await questionController.getLevelQuestions(
          level.id,
          3
        );

        setQuestions(data);
      } catch (err) {
        console.log("error loading questions", err);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [level]);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!questions.length) {
    return (
      <View>
        <Text>No hay preguntas disponibles</Text>
      </View>
    );
  }

  const current = questions[index];

  const answers = [
    {
      text: current.correct_answer,
      isCorrect: true,
      feedback: current.correct_feedback
    },
    {
      text: current.incorrect_answer1,
      isCorrect: false,
      feedback: current.incorrect_feedback1
    },
    current.incorrect_answer2 && {
      text: current.incorrect_answer2,
      isCorrect: false,
      feedback: current.incorrect_feedback2
    },
    current.incorrect_answer3 && {
      text: current.incorrect_answer3,
      isCorrect: false,
      feedback: current.incorrect_feedback3
    }
  ].filter(Boolean);

  const handleAnswer = (answer) => {

    setSelected(answer);

    if (answer.isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setIndex(prev => prev + 1);
  };

  const finish = index >= questions.length;

  if (finish) {
    return (
      <View>
        <Text>Score final: {score} / {questions.length}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>{current.question}</Text>

      {answers.map((a, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => handleAnswer(a)}
          disabled={selected !== null}
        >
          <Text>{a.text}</Text>
        </TouchableOpacity>
      ))}

      {selected && (
        <View>
          <Text>{selected.feedback}</Text>

          <TouchableOpacity onPress={nextQuestion}>
            <Text>Siguiente</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Questions;