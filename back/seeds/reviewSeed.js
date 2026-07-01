// seeds/questionSeedLevel1.js

import QuestionRepository from "../repositories/QuestionRepository";

const questions = [

  {
    id: "q1",
    game_id: "level1",
    question: "¿Qué es lo primero que hay que hacer antes de lavarse las manos?",
    correct_answer: "Retirar anillos, pulseras y reloj",
    incorrect_answer1: "Mojarse las manos directamente",
    incorrect_answer2: "Ponerse jabón",
    incorrect_answer3: null,
    correct_feedback: "Correcto, los accesorios pueden acumular microorganismos.",
    incorrect_feedback1: "No es el primer paso del procedimiento.",
    incorrect_feedback2: "No corresponde antes del lavado.",
    incorrect_feedback3: null,
    explanation: "Los accesorios pueden impedir una correcta higiene de todas las superficies de la mano.",
    difficulty: 2
  },

  {
    id: "q2",
    game_id: "level1",
    question: "¿Por qué es importante lavarse las manos antes del tratamiento?",
    correct_answer: "Para evitar transmitir microorganismos",
    incorrect_answer1: "Para que se vean limpias",
    incorrect_answer2: null,
    incorrect_answer3: null,
    correct_feedback: "Correcto, reduce el riesgo de infecciones.",
    incorrect_feedback1: "La higiene no depende de lo visual.",
    incorrect_feedback2: null,
    incorrect_feedback3: null,
    explanation: "El lavado de manos es una de las principales barreras de prevención de infecciones.",
    difficulty: 1
  },

  {
    id: "q3",
    game_id: "level1",
    question: "¿Qué se hace primero al comenzar el lavado de manos?",
    correct_answer: "Mojar las manos con agua",
    incorrect_answer1: "Secarlas",
    incorrect_answer2: "Aplicar jabón sin agua",
    incorrect_answer3: null,
    correct_feedback: "Correcto, el agua prepara la superficie.",
    incorrect_feedback1: "No corresponde en el inicio.",
    incorrect_feedback2: "El jabón se usa con agua.",
    incorrect_feedback3: null,
    explanation: "El agua permite distribuir mejor el jabón y eliminar suciedad inicial.",
    difficulty: 1
  },

  {
    id: "q4",
    game_id: "level1",
    question: "¿Cuánto tiempo debe durar un lavado de manos completo?",
    correct_answer: "Aproximadamente 1 minuto",
    incorrect_answer1: "5 segundos",
    incorrect_answer2: "10 minutos",
    incorrect_answer3: null,
    correct_feedback: "Correcto, el tiempo asegura una limpieza efectiva.",
    incorrect_feedback1: "Es insuficiente.",
    incorrect_feedback2: "Es excesivo para el procedimiento.",
    incorrect_feedback3: null,
    explanation: "El tiempo permite cubrir todas las zonas de la mano correctamente.",
    difficulty: 2
  },

  {
    id: "q5",
    game_id: "level1",
    question: "¿Qué hay que hacer con la canilla mientras se enjabonan las manos?",
    correct_answer: "Cerrar la canilla",
    incorrect_answer1: "Dejarla abierta",
    incorrect_answer2: "Aumentar el flujo de agua",
    incorrect_answer3: null,
    correct_feedback: "Correcto, ayuda a ahorrar agua y evitar contaminación.",
    incorrect_feedback1: "No es necesario mantenerla abierta.",
    incorrect_feedback2: "No mejora la higiene.",
    incorrect_feedback3: null,
    explanation: "Cerrar la canilla reduce desperdicio y mantiene el control del proceso.",
    difficulty: 2
  },

  {
    id: "q6",
    game_id: "level1",
    question: "¿Por qué hay que secarse bien las manos?",
    correct_answer: "Porque la humedad favorece bacterias",
    incorrect_answer1: "Porque es más cómodo",
    incorrect_answer2: "Para enfriarlas",
    incorrect_answer3: null,
    correct_feedback: "Correcto, la humedad favorece microorganismos.",
    incorrect_feedback1: "No es el objetivo.",
    incorrect_feedback2: "No tiene relación con la higiene.",
    incorrect_feedback3: null,
    explanation: "Las manos húmedas pueden facilitar la proliferación de bacterias.",
    difficulty: 2
  },

  {
    id: "q7",
    game_id: "level1",
    question: "¿Cuál es el orden correcto del inicio del procedimiento?",
    correct_answer: "Retirar accesorios → mojar manos → usar jabón",
    incorrect_answer1: "Jabón → accesorios → agua",
    incorrect_answer2: "Secar → mojar → jabón",
    incorrect_answer3: null,
    correct_feedback: "Correcto, es el orden seguro del proceso.",
    incorrect_feedback1: "El orden no es adecuado.",
    incorrect_feedback2: "El secado no va al inicio.",
    incorrect_feedback3: null,
    explanation: "El orden correcto garantiza una higiene efectiva y completa.",
    difficulty: 3
  },

  {
    id: "q8",
    game_id: "level1",
    question: "¿Qué puede pasar si no nos lavamos bien las manos?",
    correct_answer: "Aumenta el riesgo de infecciones",
    incorrect_answer1: "Nada importante",
    incorrect_answer2: "Mejora la salud",
    incorrect_answer3: null,
    correct_feedback: "Correcto, se facilita la transmisión de microorganismos.",
    incorrect_feedback1: "Sí tiene consecuencias.",
    incorrect_feedback2: "Es incorrecto.",
    incorrect_feedback3: null,
    explanation: "La falta de higiene es una de las principales causas de infecciones evitables.",
    difficulty: 2
  },

  {
    id: "q9",
    game_id: "level1",
    question: "¿Qué enseña la frase de Riku: 'Primero lo más importante, la limpieza'?",
    correct_answer: "La higiene es la base del procedimiento",
    incorrect_answer1: "Que lo importante es terminar rápido",
    incorrect_answer2: "Que el agua no es necesaria",
    incorrect_answer3: null,
    correct_feedback: "Correcto, la higiene es fundamental.",
    incorrect_feedback1: "No es el mensaje.",
    incorrect_feedback2: "El agua sí es necesaria.",
    incorrect_feedback3: null,
    explanation: "El personaje refuerza la importancia de la bioseguridad antes de cualquier acción.",
    difficulty: 3
  },

  {
    id: "q10",
    game_id: "level1",
    question: "¿Qué se debe hacer al finalizar el lavado de manos?",
    correct_answer: "Secarse completamente las manos",
    incorrect_answer1: "Volver a usar accesorios",
    incorrect_answer2: "Dejar las manos húmedas",
    incorrect_answer3: null,
    correct_feedback: "Correcto, el secado completa el proceso.",
    incorrect_feedback1: "No es seguro.",
    incorrect_feedback2: "La humedad no es adecuada.",
    incorrect_feedback3: null,
    explanation: "El secado es la última etapa del lavado de manos seguro.",
    difficulty: 1
  }

];

export async function seedQuestions(db) {
  const repository = new QuestionRepository(db);

  for (const q of questions) {
    const existing = await repository.getById(q.id);

    if (!existing) {
      await repository.insert(q);
    }
  }

  console.log("LEVEL 1 QUESTIONS SEEDED");
}