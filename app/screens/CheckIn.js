import React, { useState } from "react";
import { View, Text } from "react-native";
import ColorOptions from "../components/ColorOptions";
import BodySelector from "../components/BodySelector";
import FeelingSelector from "../components/FeelingSelector";


export default function CheckIn() {
    const QUESTIONS = [
        {
            id: "mood",
            type: "feeling",
            question: "¿Cómo te sentís hoy?"
        },
        {
            id: "pain",
            type: "body",
            question: "¿Te duele algo?"
        },
        {
            id: "urineColor",
            type: "color",
            question: "¿De qué color es tu orina?",
            options: ["#F7E27C", "#F2C94C", "#D4A017", "#8B4513"]
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    const handleAnswer = (value) => {
        const currentQuestion = QUESTIONS[currentIndex];

        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: value
        }));

        setCurrentIndex(prev => prev + 1);
    };

    const currentQuestion = QUESTIONS[currentIndex];

    return (
        <View>
            <Text>{currentIndex + 1}</Text>
            <Text>{currentQuestion.question}</Text>

            {currentQuestion.type === "color" && (
                <ColorOptions
                    options={currentQuestion.options}
                    onSelect={handleAnswer}
                />
            )}

            {currentQuestion.type === "body" && (
                <BodySelector onSelect={handleAnswer} />
            )}

            {currentQuestion.type === "feeling" && (
                <FeelingSelector onSelect={handleAnswer} />
            )}
        </View>
    );
}