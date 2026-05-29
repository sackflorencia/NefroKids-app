import React, { useState } from "react";
import { View, Text } from "react-native";
import ColorOptions from "../components/checkIn/ColorOptions";
import BodySelector from "../components/checkIn/BodySelector";
import FeelingSelector from "../components/checkIn/FeelingSelector";
import { useSQLiteContext } from "expo-sqlite";
import SymptomLogController from "../../back/controllers/symptomsController";

export default function CheckIn() {

    const db = useSQLiteContext();

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

    const handleAnswer = async (value) => {

        const currentQuestion = QUESTIONS[currentIndex];

        const updatedAnswers = {
            ...answers,
            [currentQuestion.id]: value
        };

        setAnswers(updatedAnswers);

        const isLastQuestion =
            currentIndex === QUESTIONS.length - 1;

        if (isLastQuestion) {

            const controller =
                new SymptomLogController(db);

            await controller.createCheckIn({

                child_id: "1",

                general_mood:
                    updatedAnswers.mood,

                urine_color:
                    mapUrineColor(updatedAnswers.urineColor),

                notes:
                    updatedAnswers.pain
                        ? `Dolor en ${updatedAnswers.pain}`
                        : "",

                pain_level: 0,
                energy_level: 5,
                is_swollen: 0
            });

            console.log("Check-in guardado");
            console.log(updatedAnswers);

            return;
        }

        setCurrentIndex(prev => prev + 1);
    };

    const currentQuestion = QUESTIONS[currentIndex];

    return (
        <View>
            <Text>{currentIndex + 1}</Text>

            <Text>
                {currentQuestion.question}
            </Text>

            {currentQuestion.type === "color" && (
                <ColorOptions
                    options={currentQuestion.options}
                    onSelect={handleAnswer}
                />
            )}

            {currentQuestion.type === "body" && (
                <BodySelector
                    onSelect={handleAnswer}
                />
            )}

            {currentQuestion.type === "feeling" && (
                <FeelingSelector
                    onSelect={handleAnswer}
                />
            )}
        </View>
    );
}

function mapUrineColor(color) {

    switch (color) {

        case "#F7E27C":
            return "normal";

        case "#F2C94C":
            return "oscura";

        case "#D4A017":
            return "rojiza";

        case "#8B4513":
            return "sin_orina";

        default:
            return "normal";
    }
}