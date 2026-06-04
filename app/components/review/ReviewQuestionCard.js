import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import ReviewOptionButton from "./ReviewOptionButton";
import colors from "../../styles/colors";

export default function ReviewQuestionCard({ question, selectedAnswer, onSelect }) {

    const answers = useMemo(() => {
        return [
            question.correct_answer,
            question.incorrect_answer1,
            question.incorrect_answer2,
            question.incorrect_answer3,
        ]
        .filter(Boolean)
        .sort(() => Math.random() - 0.5);
    }, [question]);

    return (
        <View style={styles.card}>

            {/* Altura fija: pregunta siempre ocupa el mismo espacio */}
            <View style={styles.questionContainer}>
                <Text style={styles.question}>
                    {question.question}
                </Text>
            </View>

            {/* minHeight reserva espacio para 4 opciones aunque haya menos */}
            <View style={styles.answersContainer}>
                {answers.map(answer => (
                    <ReviewOptionButton
                        key={answer}
                        text={answer}
                        selected={selectedAnswer === answer}
                        onPress={() => onSelect(answer)}
                    />
                ))}
            </View>

        </View>
    );
}

const BUTTON_HEIGHT = 52;
const GAP = 12;
const MAX_OPTIONS = 4;

const styles = StyleSheet.create({
    card: {
        flex: 1,
    },
    questionContainer: {
        height: 160,
        justifyContent: "center",
        marginBottom: 24,
    },
    question: {
        fontSize: 24,
        fontWeight: "700",
        color: colors.textDark,
        textAlign: "center",
        lineHeight: 34,
    },
    answersContainer: {
        gap: GAP,
        minHeight: BUTTON_HEIGHT * MAX_OPTIONS + GAP * (MAX_OPTIONS - 1),
    },
});
/*import React, { useMemo } from "react";
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
    gap: 25
  },

  question: {
    fontSize: 34,
    fontWeight: "700",
    color: "#215B4A",
    textAlign: "left",
    lineHeight: 42,
    marginBottom: 40
  },

  answersContainer: {
    gap: 12
  }
});*/