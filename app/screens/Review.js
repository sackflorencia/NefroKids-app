// import React, { useEffect, useMemo, useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useSQLiteContext } from "expo-sqlite";

// import ReviewController from "../../back/controllers/ReviewController";
// import ReviewQuestionCard from "../components/review/ReviewQuestionCard";
// import ReviewResultCard from "../components/review/ReviewResultCard";
// import ReviewProgressBar from "../components/review/ReviewProgressBar";
// import Button from "../components/Button";
// import colors from "../styles/colors";

// export default function Review() {

//     const db = useSQLiteContext();
//     const controller = useMemo(() => new ReviewController(db), [db]);

//     const [questions, setQuestions] = useState([]);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [score, setScore] = useState(0);
//     const [finished, setFinished] = useState(false);
//     const [selectedAnswer, setSelectedAnswer] = useState(null);

//     useEffect(() => {
//         async function loadReviews() {
//             const data = await controller.getAllReviews();
//             setQuestions(data);
//         }
//         loadReviews();
//     }, []);

//     const currentQuestion = questions[currentIndex];

//     function handleSelect(answer) {
//         setSelectedAnswer(answer);
//     }

//     function handleNext() {
//         if (!selectedAnswer) return;

//         const isCorrect = selectedAnswer === currentQuestion.correct_answer;
//         if (isCorrect) setScore(prev => prev + 1);

//         const isLastQuestion = currentIndex >= questions.length - 1;
//         if (isLastQuestion) {
//             setFinished(true);
//             return;
//         }

//         setSelectedAnswer(null);
//         setCurrentIndex(prev => prev + 1);
//     }

//     if (questions.length === 0) {
//         return (
//             <View style={styles.center}>
//                 <Text>Cargando preguntas...</Text>
//             </View>
//         );
//     }

//     if (finished) {
//         return <ReviewResultCard score={score} total={questions.length} />;
//     }

//     return (
//         <SafeAreaView style={styles.container}>

//             <View style={styles.content}>

//                 <TouchableOpacity style={styles.backButton}>
//                     <Text style={styles.backArrow}>‹</Text>
//                 </TouchableOpacity>

//                 <ReviewProgressBar
//                     current={currentIndex + 1}
//                     total={questions.length}
//                 />

//                 <ReviewQuestionCard
//                     question={currentQuestion}
//                     selectedAnswer={selectedAnswer}
//                     onSelect={handleSelect}
//                 />

//             </View>

//             <View style={styles.footer}>
//                 <Button
//                     title="Siguiente pregunta"
//                     variant="secondary"
//                     onPress={handleNext}
//                     style={[styles.nextButton, !selectedAnswer && styles.nextButtonDisabled]}
//                 />
//             </View>

//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: colors.background,
//     },
//     content: {
//         flex: 1,
//         paddingHorizontal: 24,
//         paddingTop: 16,
//     },
//     backButton: {
//         marginBottom: 12,
//     },
//     backArrow: {
//         fontSize: 32,
//         color: colors.textDark,
//         lineHeight: 36,
//     },
//     footer: {
//         paddingHorizontal: 24,
//         paddingBottom: 36,
//         paddingTop: 12,
//     },
//     nextButton: {
//         width: "100%",
//     },
//     nextButtonDisabled: {
//         opacity: 0.4,
//     },
//     center: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     },
// });
const Review = () =>{

}
export default Review