// seeds/reviewSeed.js

import ReviewRepository from "../repositories/ReviewRepository";

const reviews = [

  // NIVEL 1 - RIÑONES

  {
    id: "1",
    question: "¿Para qué sirven los riñones?",
    correct_answer: "Para limpiar la sangre",
    incorrect_answer1: "Para respirar",
    incorrect_answer2: "Para mover los brazos",
    incorrect_answer3: null
  },

  {
    id: "2",
    question: "¿Por qué son importantes los riñones?",
    correct_answer: "Porque ayudan al cuerpo a funcionar bien",
    incorrect_answer1: "Porque cambian el color del pelo",
    incorrect_answer2: null,
    incorrect_answer3: null
  },

  // NIVEL 2 - QUÉ ME ESTÁ PASANDO

  {
    id: "3",
    question: "¿Qué pasa cuando los riñones dejan de funcionar?",
    correct_answer: "El cuerpo necesita ayuda para limpiarse",
    incorrect_answer1: "Los ojos dejan de ver",
    incorrect_answer2: "Las manos desaparecen",
    incorrect_answer3: null
  },

  {
    id: "4",
    question: "¿Qué es la diálisis peritoneal?",
    correct_answer: "Un tratamiento que ayuda a limpiar el cuerpo",
    incorrect_answer1: "Un videojuego",
    incorrect_answer2: "Una comida especial",
    incorrect_answer3: null
  },

  // LAVADO DE MANOS

  {
    id: "5",
    question: "¿Qué es lo primero antes del tratamiento?",
    correct_answer: "Lavarse bien las manos",
    incorrect_answer1: "Jugar",
    incorrect_answer2: "Salir corriendo",
    incorrect_answer3: null
  },

  {
    id: "6",
    question: "¿Qué hay que ponerse en las manos para limpiarlas?",
    correct_answer: "Jabón",
    incorrect_answer1: "Tierra",
    incorrect_answer2: "Pintura",
    incorrect_answer3: null
  },

  {
    id: "7",
    question: "¿Qué accesorio hay que sacarse antes del tratamiento?",
    correct_answer: "Anillos y pulseras",
    incorrect_answer1: "Las zapatillas",
    incorrect_answer2: null,
    incorrect_answer3: null
  },

  {
    id: "8",
    question: "¿Qué elemento ayuda a mantener la higiene?",
    correct_answer: "Barbijo",
    incorrect_answer1: "Pelota",
    incorrect_answer2: "Auriculares",
    incorrect_answer3: null
  },

  // MATERIALES

  {
    id: "9",
    question: "¿Por qué hay que preparar bien los materiales?",
    correct_answer: "Para hacer el tratamiento de forma segura",
    incorrect_answer1: "Para decorar la habitación",
    incorrect_answer2: null,
    incorrect_answer3: null
  },

  // BOLSAS

  {
    id: "10",
    question: "¿Qué bolsa debemos usar?",
    correct_answer: "La que está limpia y no rota",
    incorrect_answer1: "La que está pinchada",
    incorrect_answer2: "La más sucia",
    incorrect_answer3: null
  },

  {
    id: "11",
    question: "¿Qué debemos revisar en la bolsa?",
    correct_answer: "La claridad y el volumen",
    incorrect_answer1: "El color favorito",
    incorrect_answer2: "El dibujo de la bolsa",
    incorrect_answer3: null
  },

  // SEGUNDA HIGIENE

  {
    id: "12",
    question: "¿Qué se usa para volver a higienizarse?",
    correct_answer: "Alcohol",
    incorrect_answer1: "Jugo",
    incorrect_answer2: "Chocolate",
    incorrect_answer3: null
  },

  // DISCO

  {
    id: "13",
    question: "¿Qué hay que aprender a usar correctamente?",
    correct_answer: "El disco",
    incorrect_answer1: "El televisor",
    incorrect_answer2: null,
    incorrect_answer3: null
  },

  // DESCONEXIÓN

  {
    id: "14",
    question: "¿Qué hacemos al finalizar el tratamiento?",
    correct_answer: "Cerrar el disco con la tapa protectora",
    incorrect_answer1: "Dejar todo abierto",
    incorrect_answer2: "Tirar los materiales al piso",
    incorrect_answer3: null
  },

  // EMERGENCIAS

  {
    id: "15",
    question: "¿Qué hay que hacer si una bolsa se rompe?",
    correct_answer: "Avisar a un adulto o médico",
    incorrect_answer1: "Usarla igual",
    incorrect_answer2: "Esconderla",
    incorrect_answer3: null
  },

  {
    id: "16",
    question: "¿Qué hacemos si sentimos dolor durante el tratamiento?",
    correct_answer: "Avisar inmediatamente",
    incorrect_answer1: "No decir nada",
    incorrect_answer2: "Seguir jugando",
    incorrect_answer3: null
  },

  {
    id: "17",
    question: "¿Qué significa un cambio en el color del líquido?",
    correct_answer: "Que hay que avisar y revisarlo",
    incorrect_answer1: "Que todo está perfecto",
    incorrect_answer2: null,
    incorrect_answer3: null
  }

];

export async function seedReviews(db) {

  const repository = new ReviewRepository(db);

  for (const review of reviews) {

    const existing = await repository.getById(review.id);

    if (!existing) {
      await repository.insert(review);
    }
  }

  console.log("REVIEWS SEEDED");
}