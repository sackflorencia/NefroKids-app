import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";

import ReviewOptionButton from "./ReviewOptionButton";

export default function ReviewQuestionCard({
  question,
  onAnswer
}) {

  const answers = useMemo(() => {

    const array = [
      question.correct_answer,
      question.incorrect_answer1,
      question.incorrect_answer2,
      question.incorrect_answer3
    ]
    .filter(Boolean)
    .sort(() => Math.random() - 0.5);

    return array;

  }, [question]);

  return (
    <View style={styles.card}>

      <Text style={styles.question}>
        {question.question}
      </Text>

      <View style={styles.answersContainer}>

        {answers.map(answer => (
          <ReviewOptionButton
            key={answer}
            text={answer}
            onPress={() => onAnswer(answer)}
          />
        ))}

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    gap: 20
  },

  question: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center"
  },

  answersContainer: {
    gap: 12
  }
});