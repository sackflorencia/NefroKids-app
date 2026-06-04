import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        async function loadReviews() {
            const data = await controller.getAllReviews();
            setQuestions(data);
        }
        loadReviews();
    }, []);

    const currentQuestion = questions[currentIndex];

    function handleSelect(answer) {
        setSelectedAnswer(answer);
    }

    function handleNext() {
        if (!selectedAnswer) return;

        const isCorrect = selectedAnswer === currentQuestion.correct_answer;
        if (isCorrect) setScore(prev => prev + 1);

        const isLastQuestion = currentIndex >= questions.length - 1;
        if (isLastQuestion) {
            setFinished(true);
            return;
        }

        setSelectedAnswer(null);
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

            {/* Header verde */}
            <View style={styles.header} />

            <View style={styles.content}>

                {/* Back arrow */}
                <TouchableOpacity style={styles.backButton}>
                    <Text style={styles.backArrow}>‹</Text>
                </TouchableOpacity>

                {/* Barra de progreso */}
                <ReviewProgressBar
                    current={currentIndex + 1}
                    total={questions.length}
                />

                {/* Tarjeta de pregunta */}
                <ReviewQuestionCard
                    question={currentQuestion}
                    selectedAnswer={selectedAnswer}
                    onSelect={handleSelect}
                />

            </View>

            {/* Botón siguiente fijo abajo */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[
                        styles.nextButton,
                        !selectedAnswer && styles.nextButtonDisabled
                    ]}
                    onPress={handleNext}
                    disabled={!selectedAnswer}
                >
                    <Text style={styles.nextButtonText}>Siguiente pregunta</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    header: {
        height: 60,
        backgroundColor: "#B7F0D6",
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    backButton: {
        marginBottom: 12,
    },
    backArrow: {
        fontSize: 32,
        color: "#333",
        lineHeight: 36,
    },
    footer: {
        paddingHorizontal: 24,
        paddingBottom: 36,
        paddingTop: 12,
    },
    nextButton: {
        backgroundColor: "#F5A623",
        borderRadius: 30,
        paddingVertical: 18,
        alignItems: "center",
    },
    nextButtonDisabled: {
        opacity: 0.5,
    },
    nextButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});