import React, { useState } from "react";
import { View, Text } from "react-native";

import FeelingSelector from "./FeelingSelector";
import BodySelector from "./BodySelector";
import ColorOptions from "./ColorOptions";
import { mapUrineColor } from "../../helpers/CheckInHelper";

const QUESTIONS = [

  {
    id: "mood",
    type: "feeling",
    question:
      "¿Cómo te sentís hoy?"
  },

  {
    id: "pain",
    type: "body",
    question:
      "¿Te duele algo?"
  },

  {
    id: "urineColor",
    type: "color",
    question:
      "¿De qué color es tu orina?"
  }

];

export default function CheckInForm({
  onFinish
}) {

  const [currentIndex,
    setCurrentIndex] =
    useState(0);

  const [answers,
    setAnswers] =
    useState({});

  async function handleAnswer(value) {

    const currentQuestion =
      QUESTIONS[currentIndex];

    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]:
        value
    };

    setAnswers(updatedAnswers);

    const isLastQuestion =
      currentIndex ===
      QUESTIONS.length - 1;

    if (isLastQuestion) {

      console.log("Guardando checkin");
      await onFinish({
        general_mood:
          updatedAnswers.mood,
        pain_location:
          updatedAnswers.pain,
        urine_color:
            updatedAnswers.urineColor
      });
      console.log("Checkin guardado");
      return;
    }

    setCurrentIndex(
      currentIndex + 1
    );
  }

  const currentQuestion =
    QUESTIONS[currentIndex];

  return (

    <View>

      <Text>
        {currentQuestion.question}
      </Text>

      {currentQuestion.type ===
        "feeling" && (
          <FeelingSelector
            onSelect={
              handleAnswer
            }
          />
        )}

      {currentQuestion.type ===
        "body" && (
          <BodySelector
            onSelect={
              handleAnswer
            }
          />
        )}

      {currentQuestion.type ===
        "color" && (
          <ColorOptions
            onSelect={
              handleAnswer
            }
          />
        )}

    </View>
  );
}