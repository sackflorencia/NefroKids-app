import QuestionRepository from "../repositories/QuestionRepository";

const questions = [

  {
    id: "q1",
    section_id: "level1_section2",
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
    section_id: "level1_section2",
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
    section_id: "level1_section2",
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
    section_id: "level1_section2",
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
    section_id: "level1_section2",
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
    section_id: "level1_section2",
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
    section_id: "level1_section2",
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
    section_id: "level1_section2",
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
    section_id: "level1_section2",
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
    section_id: "level1_section2",
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
  },
  // =========================
  // LEVEL 2 - PREPARACIÓN DE MATERIALES
  // =========================

  {
    id: "q11",
    section_id: "level2_section2",
    question: "¿Qué material contiene la solución que se utiliza durante el procedimiento?",
    correct_answer: "La bolsa de solución de diálisis",
    incorrect_answer1: "La jeringa",
    incorrect_answer2: "El alcohol",
    incorrect_answer3: "El spray desinfectante",
    correct_feedback: "Correcto, la bolsa contiene la solución que se utilizará durante el procedimiento.",
    incorrect_feedback1: "La jeringa se utiliza para administrar medicamentos cuando corresponde.",
    incorrect_feedback2: "El alcohol se utiliza para la desinfección.",
    incorrect_feedback3: "El spray se utiliza para desinfectar superficies o elementos.",
    explanation: "Las bolsas contienen la solución de diálisis que será utilizada durante el tratamiento.",
    difficulty: 1
  },

  {
    id: "q12",
    section_id: "level2_section2",
    question: "¿Para qué se utiliza la jeringa durante la preparación?",
    correct_answer: "Para administrar medicamentos cuando corresponde",
    incorrect_answer1: "Para cortar las bolsas",
    incorrect_answer2: "Para limpiar las manos",
    incorrect_answer3: "Para pesar las bolsas",
    correct_feedback: "Correcto, la jeringa permite administrar medicamentos como la heparina cuando está indicado.",
    incorrect_feedback1: "Las tijeras o pinzas son las que permiten manipular o cortar determinados elementos.",
    incorrect_feedback2: "La higiene de manos se realiza mediante el procedimiento correspondiente.",
    incorrect_feedback3: "El peso se controla utilizando una balanza.",
    explanation: "La jeringa es un elemento utilizado para administrar medicamentos durante la preparación cuando corresponde.",
    difficulty: 2
  },

  {
    id: "q13",
    section_id: "level2_section2",
    question: "¿Qué medicamento puede formar parte de los materiales preparados para el procedimiento?",
    correct_answer: "Heparina",
    incorrect_answer1: "Paracetamol",
    incorrect_answer2: "Ibuprofeno",
    incorrect_answer3: "Antibiótico en comprimidos",
    correct_feedback: "Correcto, la heparina puede utilizarse durante la preparación cuando está indicada.",
    incorrect_feedback1: "No es el medicamento indicado en este procedimiento.",
    incorrect_feedback2: "No es el medicamento indicado en este procedimiento.",
    incorrect_feedback3: "No corresponde a este procedimiento.",
    explanation: "La heparina es uno de los medicamentos que puede utilizarse durante la preparación de la diálisis según la indicación correspondiente.",
    difficulty: 1
  },

  {
    id: "q14",
    section_id: "level2_section2",
    question: "¿Para qué se utiliza el alcohol durante la preparación?",
    correct_answer: "Para desinfectar",
    incorrect_answer1: "Para limpiar la solución de diálisis",
    incorrect_answer2: "Para llenar la jeringa",
    incorrect_answer3: "Para pesar las bolsas",
    correct_feedback: "Correcto, el alcohol se utiliza como elemento de desinfección.",
    incorrect_feedback1: "La solución de diálisis no se limpia con alcohol.",
    incorrect_feedback2: "El alcohol no se coloca dentro de la jeringa.",
    incorrect_feedback3: "El alcohol no se utiliza para pesar las bolsas.",
    explanation: "La desinfección de los elementos es fundamental para reducir el riesgo de contaminación durante el procedimiento.",
    difficulty: 1
  },

  {
    id: "q15",
    section_id: "level2_section2",
    question: "¿Qué elementos pueden utilizarse para manipular o cortar determinados materiales?",
    correct_answer: "Las tijeras o pinzas",
    incorrect_answer1: "Los tapones",
    incorrect_answer2: "Las bolsas de solución",
    incorrect_answer3: "El spray desinfectante",
    correct_feedback: "Correcto, las tijeras y pinzas permiten manipular determinados elementos durante la preparación.",
    incorrect_feedback1: "Los tapones sirven para proteger las conexiones.",
    incorrect_answer2: "Las bolsas contienen la solución de diálisis.",
    incorrect_answer3: "El spray se utiliza para desinfectar.",
    correct_feedback: "Correcto, las tijeras y pinzas permiten manipular determinados elementos durante la preparación.",
    correct_feedback: "Correcto, las tijeras y pinzas permiten manipular determinados elementos durante la preparación.",
    incorrect_feedback1: "Los tapones sirven para proteger las conexiones.",
    incorrect_feedback2: "Las bolsas contienen la solución de diálisis.",
    incorrect_feedback3: "El spray se utiliza para desinfectar.",
    explanation: "Las tijeras y pinzas son elementos de manipulación que forman parte de los materiales preparados para el procedimiento.",
    difficulty: 1
  },

  {
    id: "q16",
    section_id: "level2_section2",
    question: "¿Para qué sirven los tapones durante la preparación?",
    correct_answer: "Para proteger las conexiones",
    incorrect_answer1: "Para administrar heparina",
    incorrect_answer2: "Para pesar las bolsas",
    incorrect_answer3: "Para desinfectar las manos",
    correct_feedback: "Correcto, los tapones ayudan a proteger las conexiones de contaminación.",
    incorrect_feedback1: "La heparina se administra utilizando la jeringa cuando corresponde.",
    incorrect_feedback2: "El peso se controla con una balanza.",
    incorrect_feedback3: "Los tapones no se utilizan para la higiene de manos.",
    explanation: "Los tapones protegen las conexiones y ayudan a mantener las condiciones de higiene del sistema.",
    difficulty: 2
  },

  {
    id: "q17",
    section_id: "level2_section2",
    question: "¿Por qué es importante preparar todos los materiales antes de comenzar?",
    correct_answer: "Para tener todo listo y evitar interrupciones durante el procedimiento",
    incorrect_answer1: "Para poder saltear pasos",
    incorrect_answer2: "Para usar más materiales de los necesarios",
    incorrect_answer3: "Para evitar revisar los materiales",
    correct_feedback: "Correcto, tener los materiales preparados permite realizar el procedimiento de forma ordenada y segura.",
    incorrect_feedback1: "Preparar los materiales no significa saltear pasos.",
    incorrect_feedback2: "Los materiales deben prepararse según lo indicado, sin utilizar elementos innecesarios.",
    incorrect_feedback3: "Los materiales siempre deben revisarse antes de utilizarlos.",
    explanation: "La preparación previa permite contar con los elementos necesarios y realizar el procedimiento de manera organizada.",
    difficulty: 2
  },

  {
    id: "q18",
    section_id: "level2_section2",
    question: "¿Qué elemento se utiliza para desinfectar una superficie o material durante la preparación?",
    correct_answer: "Spray desinfectante",
    incorrect_answer1: "Jeringa",
    incorrect_answer2: "Tijera",
    incorrect_answer3: "Tapón",
    correct_feedback: "Correcto, el spray desinfectante se utiliza para realizar la desinfección correspondiente.",
    incorrect_feedback1: "La jeringa se utiliza para administrar medicamentos cuando corresponde.",
    incorrect_feedback2: "La tijera sirve para manipular determinados materiales.",
    incorrect_feedback3: "El tapón protege una conexión.",
    explanation: "El spray desinfectante forma parte de los materiales necesarios para mantener la higiene durante la preparación.",
    difficulty: 1
  },

  {
    id: "q19",
    section_id: "level2_section2",
    question: "¿Cuál de estos grupos contiene solamente materiales utilizados en la preparación?",
    correct_answer: "Bolsa de solución, jeringa, heparina y elementos de desinfección",
    incorrect_answer1: "Vaso, cuchara, algodón y comida",
    incorrect_answer2: "Libro, lápiz, tijera y botella",
    incorrect_answer3: "Teléfono, cargador, agua y jabón",
    correct_feedback: "Correcto, esos elementos forman parte de los materiales necesarios para la preparación.",
    incorrect_feedback1: "Esos elementos no corresponden al procedimiento.",
    incorrect_feedback2: "Esos elementos no corresponden al procedimiento.",
    incorrect_feedback3: "Esos elementos no corresponden al procedimiento.",
    explanation: "Reconocer los materiales necesarios permite preparar correctamente el procedimiento antes de comenzar.",
    difficulty: 2
  },

  {
    id: "q20",
    section_id: "level2_section2",
    question: "¿Qué debemos hacer si falta un material necesario antes de comenzar?",
    correct_answer: "Conseguir el material antes de iniciar el procedimiento",
    incorrect_answer1: "Comenzar igual y buscarlo después",
    incorrect_answer2: "Reemplazarlo por cualquier objeto",
    incorrect_answer3: "Ignorar que falta",
    correct_feedback: "Correcto, es importante contar con todos los materiales necesarios antes de comenzar.",
    incorrect_feedback1: "Comenzar sin todos los materiales puede interrumpir el procedimiento.",
    incorrect_feedback2: "No se deben utilizar objetos que no correspondan.",
    incorrect_feedback3: "Los materiales necesarios deben estar disponibles antes de comenzar.",
    explanation: "La preparación previa permite verificar que todos los materiales necesarios estén disponibles antes de iniciar.",
    difficulty: 2
  },


  // =========================
  // LEVEL 3 - PREPARADO DE BOLSAS
  // =========================

  {
    id: "q21",
    section_id: "level3_section2",
    question: "¿Cuál de estas bolsas podemos utilizar para el procedimiento?",
    correct_answer: "La bolsa limpia, íntegra y sin perforaciones",
    incorrect_answer1: "La bolsa rota",
    incorrect_answer2: "La bolsa pinchada",
    incorrect_answer3: "La bolsa con signos de daño",
    correct_feedback: "Correcto, debemos elegir una bolsa limpia, íntegra y sin daños.",
    incorrect_feedback1: "Una bolsa rota no debe utilizarse.",
    incorrect_feedback2: "Una bolsa pinchada está dañada y no debe utilizarse.",
    incorrect_feedback3: "Una bolsa dañada no debe utilizarse.",
    explanation: "Antes de utilizar una bolsa es necesario comprobar que esté íntegra y en condiciones adecuadas.",
    difficulty: 1
  },

  {
    id: "q22",
    section_id: "level3_section2",
    question: "¿Qué debemos revisar antes de utilizar una bolsa de diálisis?",
    correct_answer: "Que esté íntegra y sin daños",
    incorrect_answer1: "Que tenga una perforación",
    incorrect_answer2: "Que esté rota",
    incorrect_answer3: "Que tenga suciedad visible",
    correct_feedback: "Correcto, debemos verificar que la bolsa esté en buenas condiciones antes de utilizarla.",
    incorrect_feedback1: "Una perforación indica que la bolsa está dañada.",
    incorrect_feedback2: "Una bolsa rota no debe utilizarse.",
    incorrect_feedback3: "La suciedad puede indicar contaminación y debe evitarse.",
    explanation: "La inspección de la bolsa permite identificar daños que podrían comprometer la seguridad del procedimiento.",
    difficulty: 1
  },

  {
    id: "q23",
    section_id: "level3_section2",
    question: "¿Qué se debe hacer con la bolsa correcta antes de continuar con el procedimiento?",
    correct_answer: "Prepararla siguiendo los pasos indicados",
    incorrect_answer1: "Pincharla sin revisarla",
    incorrect_answer2: "Descartarla aunque esté en buenas condiciones",
    incorrect_answer3: "Dejarla en el suelo",
    correct_feedback: "Correcto, una vez seleccionada la bolsa adecuada debemos continuar con la preparación indicada.",
    incorrect_feedback1: "No debemos realizar acciones sin seguir el procedimiento.",
    incorrect_feedback2: "Una bolsa adecuada no debe descartarse sin motivo.",
    incorrect_feedback3: "Los materiales deben mantenerse en condiciones adecuadas de higiene.",
    explanation: "Después de seleccionar la bolsa correcta, se continúa con los pasos de preparación establecidos.",
    difficulty: 2
  },

  {
    id: "q24",
    section_id: "level3_section2",
    question: "¿Qué medicamento se puede inyectar en la bolsa cuando está indicado?",
    correct_answer: "Heparina",
    incorrect_answer1: "Alcohol",
    incorrect_answer2: "Spray desinfectante",
    incorrect_answer3: "Agua",
    correct_feedback: "Correcto, la heparina puede incorporarse a la bolsa cuando está indicada.",
    incorrect_feedback1: "El alcohol se utiliza para desinfectar y no se inyecta en la bolsa.",
    incorrect_feedback2: "El spray desinfectante no se introduce en la bolsa.",
    incorrect_feedback3: "No corresponde agregar agua de esta manera.",
    explanation: "La heparina puede agregarse a la solución cuando existe una indicación para hacerlo y siguiendo el procedimiento correspondiente.",
    difficulty: 1
  },

  {
    id: "q25",
    section_id: "level3_section2",
    question: "¿Qué elemento se utiliza para administrar la heparina en la bolsa?",
    correct_answer: "Una jeringa",
    incorrect_answer1: "Una tijera",
    incorrect_answer2: "Un tapón",
    incorrect_answer3: "Un pañuelo",
    correct_feedback: "Correcto, la jeringa permite administrar la heparina cuando corresponde.",
    incorrect_feedback1: "La tijera no se utiliza para administrar medicamentos.",
    incorrect_feedback2: "El tapón protege las conexiones.",
    incorrect_feedback3: "El pañuelo se utiliza en tareas de desinfección según corresponda.",
    explanation: "La jeringa es el elemento utilizado para administrar la heparina cuando está indicada.",
    difficulty: 1
  },

  {
    id: "q26",
    section_id: "level3_section2",
    question: "¿Qué se debe hacer antes de conectar la bolsa de diálisis al set de transferencia?",
    correct_answer: "Preparar y revisar correctamente los elementos de conexión",
    incorrect_answer1: "Conectar sin revisar",
    incorrect_answer2: "Pinchar la bolsa en cualquier lugar",
    incorrect_answer3: "Tocar las conexiones con las manos sucias",
    correct_feedback: "Correcto, las conexiones deben prepararse y revisarse antes de realizar la conexión.",
    incorrect_feedback1: "Las conexiones deben revisarse antes de utilizarlas.",
    incorrect_feedback2: "No se debe pinchar la bolsa en cualquier lugar.",
    incorrect_feedback3: "La higiene es fundamental para evitar contaminación.",
    explanation: "La preparación adecuada de las conexiones ayuda a mantener la seguridad y evitar contaminación durante el procedimiento.",
    difficulty: 2
  },

  {
    id: "q27",
    section_id: "level3_section2",
    question: "¿Qué se debe retirar antes de realizar la conexión del set de transferencia?",
    correct_answer: "El tapón protector y el minicap",
    incorrect_answer1: "La bolsa completa",
    incorrect_answer2: "La etiqueta de la bolsa",
    incorrect_answer3: "El organizador",
    correct_feedback: "Correcto, el tapón protector y el minicap deben retirarse como parte del procedimiento de conexión.",
    incorrect_feedback1: "La bolsa es necesaria para el procedimiento.",
    incorrect_feedback2: "La etiqueta permite identificar la bolsa.",
    incorrect_feedback3: "El organizador no corresponde a este paso.",
    explanation: "El retiro del tapón protector y del minicap forma parte de la preparación para conectar la bolsa con el set de transferencia.",
    difficulty: 2
  },

  {
    id: "q28",
    section_id: "level3_section2",
    question: "¿Qué debemos hacer después de conectar la bolsa de diálisis al set de transferencia?",
    correct_answer: "Continuar con el procedimiento indicado y controlar la preparación",
    incorrect_answer1: "Desconectarla inmediatamente sin motivo",
    incorrect_answer2: "Tocar las conexiones",
    incorrect_answer3: "Dejarla en cualquier lugar",
    correct_feedback: "Correcto, después de la conexión debemos continuar siguiendo los pasos indicados.",
    incorrect_feedback1: "No corresponde desconectar sin una indicación.",
    incorrect_feedback2: "Debemos evitar tocar las conexiones innecesariamente.",
    incorrect_feedback3: "Los materiales deben mantenerse correctamente ubicados.",
    explanation: "Cada paso debe realizarse de forma ordenada para mantener la seguridad del procedimiento.",
    difficulty: 2
  },

  {
    id: "q29",
    section_id: "level3_section2",
    question: "¿Qué debemos hacer con la bolsa para controlar su peso?",
    correct_answer: "Pesarla",
    incorrect_answer1: "Sacudirla",
    incorrect_answer2: "Pincharla",
    incorrect_answer3: "Abrirla",
    correct_feedback: "Correcto, el peso de la bolsa debe controlarse según el procedimiento.",
    incorrect_feedback1: "Sacudir la bolsa no permite controlar su peso.",
    incorrect_feedback2: "No se debe pinchar la bolsa para pesarla.",
    incorrect_feedback3: "No es necesario abrirla para pesarla.",
    explanation: "El pesaje permite obtener información necesaria para el control del procedimiento.",
    difficulty: 1
  },

  {
    id: "q30",
    section_id: "level3_section2",
    question: "¿Cómo debemos desinfectar el palo del gotero?",
    correct_answer: "Aplicando spray desinfectante sobre un pañuelo y luego limpiándolo",
    incorrect_answer1: "Aplicando el spray directamente sobre cualquier conexión",
    incorrect_answer2: "Limpiándolo con las manos",
    incorrect_answer3: "No desinfectándolo",
    correct_feedback: "Correcto, primero se aplica el spray sobre el pañuelo y luego se utiliza para desinfectar.",
    incorrect_feedback1: "El spray debe utilizarse de la manera indicada en el procedimiento.",
    incorrect_feedback2: "Las manos no reemplazan la desinfección.",
    incorrect_feedback3: "La desinfección es necesaria antes de colocar la bolsa.",
    explanation: "La desinfección del soporte ayuda a mantener un entorno adecuado antes de colocar la bolsa.",
    difficulty: 2
  },

  {
    id: "q31",
    section_id: "level3_section2",
    question: "¿Qué debemos evitar tocar al colocar la bolsa en el gotero?",
    correct_answer: "El disco",
    incorrect_answer1: "La bolsa por fuera",
    incorrect_answer2: "El soporte externo",
    incorrect_answer3: "El lugar donde se sostiene la bolsa",
    correct_feedback: "Correcto, debemos evitar tocar el disco para reducir el riesgo de contaminación.",
    incorrect_feedback1: "La manipulación externa de la bolsa puede realizarse siguiendo el procedimiento.",
    incorrect_feedback2: "El soporte debe utilizarse de manera adecuada.",
    incorrect_feedback3: "El soporte se utiliza para colocar la bolsa.",
    explanation: "Evitar tocar superficies críticas ayuda a mantener las condiciones de higiene del procedimiento.",
    difficulty: 3
  },


  // =========================
  // LEVEL 4 - CONEXIÓN Y PROCEDIMIENTO
  // =========================

  {
    id: "q32",
    section_id: "level4_section2",
    question: "¿Qué debemos hacer antes de comenzar a manipular las bolsas?",
    correct_answer: "Desinfectarnos las manos",
    incorrect_answer1: "Conectar las bolsas directamente",
    incorrect_answer2: "Tocar el disco",
    incorrect_answer3: "Abrir los tapones",
    correct_feedback: "Correcto, la higiene de manos es fundamental antes de comenzar.",
    incorrect_feedback1: "Primero debemos realizar la higiene de manos.",
    incorrect_feedback2: "No debemos tocar el disco sin realizar la preparación correspondiente.",
    incorrect_feedback3: "No corresponde comenzar abriendo los tapones.",
    explanation: "La higiene de manos es una medida fundamental para reducir el riesgo de contaminación durante el procedimiento.",
    difficulty: 1
  },

  {
    id: "q33",
    section_id: "level4_section2",
    question: "¿Cuántas bolsas deben colocarse en el organizador durante este paso?",
    correct_answer: "Dos bolsas",
    incorrect_answer1: "Una bolsa",
    incorrect_answer2: "Tres bolsas",
    incorrect_answer3: "Ninguna",
    correct_feedback: "Correcto, durante este paso se colocan las dos bolsas indicadas.",
    incorrect_feedback1: "Se necesitan dos bolsas.",
    incorrect_feedback2: "No corresponden tres bolsas.",
    incorrect_feedback3: "Las bolsas son necesarias para continuar el procedimiento.",
    explanation: "Las dos bolsas deben estar disponibles y colocarse correctamente antes de continuar con las conexiones.",
    difficulty: 1
  },

  {
    id: "q34",
    section_id: "level4_section2",
    question: "¿Es necesario respetar un orden específico para colocar las bolsas 1 y 2?",
    correct_answer: "No, pueden colocarse en cualquiera de los dos lugares correspondientes",
    incorrect_answer1: "Sí, la bolsa 1 siempre debe colocarse primero",
    incorrect_answer2: "Sí, la bolsa 2 siempre debe colocarse primero",
    incorrect_answer3: "No se deben colocar las bolsas",
    correct_feedback: "Correcto, no es necesario respetar un orden específico para colocarlas.",
    incorrect_feedback1: "En este paso no se exige ese orden.",
    incorrect_feedback2: "En este paso no se exige ese orden.",
    incorrect_feedback3: "Las bolsas son necesarias para continuar.",
    explanation: "Las bolsas pueden colocarse en los lugares correspondientes sin necesidad de respetar un orden entre bolsa 1 y bolsa 2.",
    difficulty: 1
  },

  {
    id: "q35",
    section_id: "level4_section2",
    question: "¿Qué debemos tener en cuenta al acomodar el disco organizador?",
    correct_answer: "No tocar el tapón de conexión",
    incorrect_answer1: "Tocarlo para asegurarnos de que está colocado",
    incorrect_answer2: "Retirarlo inmediatamente",
    incorrect_answer3: "Golpearlo para acomodarlo",
    correct_feedback: "Correcto, debemos evitar tocar el tapón de conexión.",
    incorrect_feedback1: "Tocar el tapón puede contaminarlo.",
    incorrect_feedback2: "No corresponde retirarlo en este paso.",
    incorrect_feedback3: "El disco debe manipularse cuidadosamente.",
    explanation: "Evitar tocar las conexiones ayuda a mantener la higiene del sistema.",
    difficulty: 2
  },

  {
    id: "q36",
    section_id: "level4_section2",
    question: "¿Dónde se conecta el cable de la bolsa de drenaje en el disco?",
    correct_answer: "En el lado izquierdo",
    incorrect_answer1: "En el lado derecho",
    incorrect_answer2: "En el centro de la bolsa",
    incorrect_answer3: "No se conecta al disco",
    correct_feedback: "Correcto, la línea de drenaje se conecta al lado izquierdo del disco.",
    incorrect_feedback1: "El lado indicado para la línea de drenaje es el izquierdo.",
    incorrect_feedback2: "La conexión se realiza en el disco.",
    incorrect_feedback3: "La línea de drenaje sí debe conectarse al disco.",
    explanation: "La línea de drenaje debe ubicarse correctamente para organizar las conexiones del sistema.",
    difficulty: 1
  },

  {
    id: "q37",
    section_id: "level4_section2",
    question: "¿Qué debemos hacer con el cable de la bolsa de drenaje?",
    correct_answer: "Desplegarlo y conectarlo al disco",
    incorrect_answer1: "Dejarlo enrollado",
    incorrect_answer2: "Cortarlo",
    incorrect_answer3: "Desconectarlo del sistema",
    correct_feedback: "Correcto, primero se despliega la línea de drenaje y luego se conecta al disco.",
    incorrect_feedback1: "La línea debe desplegarse para realizar correctamente la conexión.",
    incorrect_feedback2: "No se debe cortar el cable.",
    incorrect_feedback3: "La línea debe conectarse al disco.",
    explanation: "Desplegar correctamente la línea permite realizar la conexión de manera ordenada.",
    difficulty: 1
  },

  {
    id: "q38",
    section_id: "level4_section2",
    question: "¿Qué cable se conecta después de conectar la línea de drenaje?",
    correct_answer: "El cable de la bolsa de infusión",
    incorrect_answer1: "El cable del organizador",
    incorrect_answer2: "El cable del alcohol",
    incorrect_answer3: "No se conecta ningún otro cable",
    correct_feedback: "Correcto, después se conecta el cable correspondiente a la bolsa de infusión.",
    incorrect_feedback1: "El organizador no tiene ese cable.",
    incorrect_feedback2: "El alcohol no tiene un cable.",
    incorrect_feedback3: "Todavía falta realizar la conexión de la bolsa de infusión.",
    explanation: "Una vez conectada la línea de drenaje, se continúa con la conexión de la bolsa de infusión.",
    difficulty: 2
  },

  {
    id: "q39",
    section_id: "level4_section2",
    question: "¿Qué se conecta al lado izquierdo del disco al finalizar este paso?",
    correct_answer: "El tapón desinfectante",
    incorrect_answer1: "La jeringa",
    incorrect_answer2: "La bolsa de solución",
    incorrect_answer3: "El spray desinfectante",
    correct_feedback: "Correcto, el tapón desinfectante se conecta al lado izquierdo del disco.",
    incorrect_feedback1: "La jeringa no se conecta al disco en este paso.",
    incorrect_feedback2: "La bolsa se conecta mediante su línea correspondiente.",
    incorrect_feedback3: "El spray se utiliza para desinfectar, no se conecta al disco.",
    explanation: "El tapón desinfectante ayuda a proteger la conexión y debe colocarse en el lugar indicado.",
    difficulty: 2
  },

  {
    id: "q40",
    section_id: "level4_section2",
    question: "¿Por qué es importante no tocar las conexiones durante el procedimiento?",
    correct_answer: "Para evitar contaminarlas",
    incorrect_answer1: "Para que pesen menos",
    incorrect_answer2: "Para que cambien de color",
    incorrect_answer3: "Para que las bolsas tengan más solución",
    correct_feedback: "Correcto, evitar tocar las conexiones ayuda a prevenir la contaminación.",
    incorrect_feedback1: "El peso no depende de tocar las conexiones.",
    incorrect_feedback2: "Las conexiones no deben cambiar de color.",
    incorrect_feedback3: "La cantidad de solución no depende de esto.",
    explanation: "La manipulación innecesaria de las conexiones puede aumentar el riesgo de contaminación, por eso deben protegerse.",
    difficulty: 2
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