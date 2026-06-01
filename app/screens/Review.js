import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSQLiteContext } from "expo-sqlite";

import ReviewController from "../../back/controllers/ReviewController";

import ReviewQuestionCard from "../components/review/ReviewQuestionCard";
import ReviewResultCard from "../components/review/ReviewResultCard";
import ReviewProgressBar from "../components/review/ReviewProgressBar";

export default function Review() {

    const db = useSQLiteContext();

    const controller = useMemo(() => {
        return new ReviewController(db);
    }, [db]);

    const [questions, setQuestions] = useState([]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const [score, setScore] = useState(0);

    const [finished, setFinished] = useState(false);

    useEffect(() => {

        async function loadReviews() {

            const data = await controller.getAllReviews();

            setQuestions(data);
        }

        loadReviews();

    }, []);

    const currentQuestion = questions[currentIndex];

    async function handleAnswer(selectedAnswer) {

        const isCorrect =
            selectedAnswer === currentQuestion.correct_answer;

        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        const isLastQuestion =
            currentIndex >= questions.length - 1;

        if (isLastQuestion) {
            setFinished(true);
            return;
        }

        setCurrentIndex(prev => prev + 1);
    }

    if (questions.length === 0) {
        return (
            <View style={styles.center}>
                <Text>Cargando preguntas...</Text>
            </View>
        );
    }

    if (finished) {
        return (
            <ReviewResultCard
                score={score}
                total={questions.length}
            />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header} />
            <ReviewProgressBar
                current={currentIndex + 1}
                total={questions.length}
            />

            <ReviewQuestionCard
                question={currentQuestion}
                onAnswer={handleAnswer}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    
        header: {
        height: 70,
        backgroundColor: "#B7F0D6",
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});