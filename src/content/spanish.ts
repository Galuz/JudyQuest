import type { Passage, Question, WordEntry } from "../domain/types";
import bank from "../../content/spanish/bv-common-words.v1.json";
import { shuffle } from "../domain/engines";
export const words: WordEntry[] = bank.words;
export const skillNames: Record<string, string> = {
  LITERAL: "Lo que dice el texto",
  SEQUENCE: "Orden de los hechos",
  MAIN_IDEA: "Idea principal",
  DETAILS: "Detalles",
  CAUSE_EFFECT: "Causa y consecuencia",
  INFERENCE: "Inferencias",
  CONTEXT_VOCABULARY: "Vocabulario",
  EVIDENCE: "Pistas en el texto",
  PARAGRAPHS: "Párrafos",
  SEMICOLON: "Punto y coma",
  MORAL: "Moralejas",
  PROVERB_MEANING: "Refranes",
  BV_SPELLING: "Uso de b y v",
  DICTATION: "Dictado",
};
export const lessons = [
  {
    skill: "LITERAL",
    title: "Encuentra la respuesta",
    body: "Una pregunta literal se responde con información que aparece escrita. Vuelve al texto y busca quién, qué, dónde o cuándo.",
    example: "«Ana llegó el lunes». ¿Cuándo llegó? El lunes: está escrito.",
  },
  {
    skill: "SEQUENCE",
    title: "Primero, después, al final",
    body: "Los hechos tienen un orden. Las fechas y palabras como primero, después, luego y finalmente te ayudan a reconstruirlo.",
    example: "Primero sembró. Después regó. Finalmente nació una planta.",
  },
  {
    skill: "MAIN_IDEA",
    title: "¿De qué trata principalmente?",
    body: "La idea principal reúne lo más importante de todo el texto. Un detalle puede ser verdadero sin explicar el texto completo.",
    example:
      "Un texto cuenta cómo una niña cuidó y recuperó un jardín. La idea principal es la recuperación del jardín, no el color de su regadera.",
  },
  {
    skill: "DETAILS",
    title: "Mira con atención",
    body: "Los detalles dan información precisa: un número, un lugar, un objeto o una característica.",
    example:
      "«Llevó tres libros azules». ¿Cuántos libros? Tres. ¿De qué color? Azules.",
  },
  {
    skill: "CAUSE_EFFECT",
    title: "¿Por qué pasó?",
    body: "La causa explica por qué sucede algo. La consecuencia es lo que ocurre como resultado. Busca porque, por eso y así que.",
    example:
      "Llovió mucho → el patio se mojó. La lluvia es la causa; el patio mojado, la consecuencia.",
  },
  {
    skill: "INFERENCE",
    title: "Une las pistas",
    body: "Inferir es entender algo que no se dice directamente, usando pistas del texto. No es adivinar: tu idea debe tener apoyo.",
    example:
      "«Luis tomó su paraguas al ver las nubes oscuras». Podemos inferir que cree que puede llover.",
  },
  {
    skill: "CONTEXT_VOCABULARY",
    title: "Una palabra entre pistas",
    body: "Si no conoces una palabra, lee lo que está antes y después. Ese contexto te ayuda a entenderla.",
    example:
      "«El sendero era estrecho: solo cabía una persona». Estrecho significa poco ancho.",
  },
  {
    skill: "EVIDENCE",
    title: "Demuestra tu respuesta",
    body: "La evidencia es la frase que apoya lo que dices. Elige la que realmente demuestra tu respuesta, no una que solo menciona al personaje.",
    example:
      "Para demostrar que alguien tiene frío, «se puso una chamarra y temblaba» sirve mejor que «se llamaba Ana».",
  },
  {
    skill: "PARAGRAPHS",
    title: "Una idea en cada párrafo",
    body: "Un párrafo agrupa oraciones relacionadas. Se separa del siguiente con punto y aparte. Cuando cambia la idea central, puede comenzar otro párrafo.",
    example:
      "Un párrafo describe un jardín. Otro cuenta cómo cuidarlo. Cada uno desarrolla una idea.",
  },
  {
    skill: "SEMICOLON",
    title: "Conoce el punto y coma ;",
    body: "El punto y coma puede separar oraciones muy relacionadas. También separa elementos de una lista cuando esos elementos ya tienen comas.",
    example:
      "«Ana llevó libros, lápices y hojas; Luis, agua y fruta». El signo ; separa los dos grupos de la lista. A veces un punto también es válido: aquí practicamos cómo usar ;.",
  },
  {
    skill: "MORAL",
    title: "La enseñanza de una fábula",
    body: "Una fábula es un relato breve que deja una enseñanza llamada moraleja. Sus personajes pueden ser animales con comportamientos humanos.",
    example:
      "Si un personaje logra algo gracias a la ayuda de otros, la moraleja puede ser que cooperar nos ayuda a superar dificultades.",
  },
  {
    skill: "PROVERB_MEANING",
    title: "Los refranes no siempre son literales",
    body: "Un refrán expresa una enseñanza popular. Piensa qué consejo da y en qué situación podrías usarlo.",
    example:
      "«Más vale prevenir que lamentar»: llevar agua a una caminata es prepararte antes de tener un problema.",
  },
  {
    skill: "BV_SPELLING",
    title: "Las palabras con b y v",
    body: "En nuestro español, b y v suenan igual. Aprende cómo se escribe cada palabra al verla, leerla y escribirla; el sonido por sí solo no te dice la letra.",
    example:
      "«Barco» se escribe con b y «vaso» con v. En «bebé» hay dos b. Las tildes se revisan por separado.",
  },
  {
    skill: "DICTATION",
    title: "Escucha, escribe y revisa",
    body: "Un adulto leerá una frase y repetirá la palabra. Escucha la palabra completa, escríbela y comprueba cada letra.",
    example:
      "Si escuchas «La vaca come pasto. Vaca», escribe solo vaca. El contexto ayuda a saber de qué palabra se trata.",
  },
];
const q = (
  id: string,
  skill: string,
  prompt: string,
  choices: string[],
  correct: number,
  explanation: string,
  evidence?: string,
): Question => ({
  id,
  skill,
  prompt,
  choices,
  correct: choices[correct],
  explanation,
  evidence,
  kind: "choice",
});
export const passages: Passage[] = [
  {
    id: "luna",
    title: "Un viaje hasta la Luna",
    type: "Relato histórico",
    source: {
      label: "NASA · Apollo 11",
      url: "https://www.nasa.gov/image-article/50-years-ago-apollo-11-launches-into-history/",
    },
    paragraphs: [
      "El 16 de julio de 1969, la misión Apolo 11 despegó de Florida. En la nave viajaban Neil Armstrong, Buzz Aldrin y Michael Collins. Su objetivo era llegar a la Luna.",
      "Después, Armstrong y Aldrin descendieron a la superficie lunar en el módulo Eagle. Collins permaneció en órbita: viajaba alrededor de la Luna en otra parte de la nave. Armstrong fue el primero en pisar la superficie; Aldrin lo siguió.",
      "Finalmente, el 24 de julio, los tres astronautas regresaron a la Tierra. El relato de este viaje puede ordenarse con sus fechas y con expresiones como después y finalmente.",
    ],
    questions: [
      q(
        "luna-1",
        "LITERAL",
        "¿Cuándo despegó la misión?",
        [
          "El 16 de julio de 1969",
          "El 24 de julio de 1969",
          "En diciembre de 1903",
        ],
        0,
        "El primer párrafo indica la fecha del despegue.",
        "El 16 de julio de 1969, la misión Apolo 11 despegó de Florida.",
      ),
      q(
        "luna-2",
        "MAIN_IDEA",
        "¿Cuál es la idea principal del relato?",
        [
          "El color de la Luna",
          "El viaje de Apolo 11 a la Luna y su regreso",
          "La infancia de Collins",
        ],
        1,
        "Todo el relato sigue el viaje: salida, llegada y regreso. Un dato aislado no resume el texto.",
      ),
      {
        id: "luna-3",
        skill: "SEQUENCE",
        kind: "sequence" as const,
        prompt: "Toca los hechos en el orden en que ocurrieron.",
        choices: [
          "Descendieron a la Luna",
          "Regresaron a la Tierra",
          "Despegaron de Florida",
        ],
        correct:
          "Despegaron de Florida | Descendieron a la Luna | Regresaron a la Tierra",
        explanation:
          "Primero salieron de la Tierra, después llegaron a la Luna y finalmente regresaron.",
      },
      q(
        "luna-4",
        "DETAILS",
        "¿Qué astronauta permaneció en órbita?",
        ["Buzz Aldrin", "Michael Collins", "Neil Armstrong"],
        1,
        "Collins no bajó con sus compañeros.",
        "Collins permaneció en órbita: viajaba alrededor de la Luna en otra parte de la nave.",
      ),
      q(
        "luna-5",
        "CONTEXT_VOCABULARY",
        "En este relato, estar «en órbita» significa…",
        [
          "Estar dormido",
          "Caminar por la superficie",
          "Viajar alrededor de la Luna",
        ],
        2,
        "La explicación aparece después de los dos puntos.",
        "viajaba alrededor de la Luna",
      ),
      q(
        "luna-6",
        "EVIDENCE",
        "¿Qué frase demuestra que volvieron todos?",
        [
          "Su objetivo era llegar a la Luna.",
          "Los tres astronautas regresaron a la Tierra.",
          "Armstrong fue el primero en pisar la superficie.",
        ],
        1,
        "La expresión «los tres» indica que todos regresaron.",
        "los tres astronautas regresaron a la Tierra.",
      ),
    ],
  },
  {
    id: "vuelo",
    title: "Doce segundos que hicieron historia",
    type: "Relato histórico",
    source: {
      label: "National Park Service · Los primeros vuelos",
      url: "https://www.nps.gov/places/3-four-powered-flights.htm",
    },
    paragraphs: [
      "El 17 de diciembre de 1903, los hermanos Orville y Wilbur Wright realizaron cuatro vuelos con su avión. Orville pilotó el primero. El aparato se mantuvo en el aire durante doce segundos.",
      "Después hicieron otros vuelos ese mismo día. En el cuarto, Wilbur estuvo en el aire durante cincuenta y nueve segundos. Ese fue el vuelo más largo de la jornada.",
      "Aunque estos tiempos parecen pequeños, los vuelos fueron un paso importante en la historia de la aviación. Para entender el orden del relato, conviene fijarse en primero, después y cuarto.",
    ],
    questions: [
      q(
        "vuelo-1",
        "LITERAL",
        "¿Cuántos vuelos realizaron ese día?",
        ["Dos", "Cuatro", "Doce"],
        1,
        "La cantidad aparece en la primera oración.",
        "realizaron cuatro vuelos con su avión.",
      ),
      q(
        "vuelo-2",
        "DETAILS",
        "¿Cuánto duró el primer vuelo?",
        ["Doce segundos", "Cincuenta y nueve minutos", "Cuatro horas"],
        0,
        "Doce es la duración en segundos, no la cantidad de vuelos.",
        "El aparato se mantuvo en el aire durante doce segundos.",
      ),
      q(
        "vuelo-3",
        "SEQUENCE",
        "¿Qué palabra indica que un hecho ocurrió más tarde?",
        ["Avión", "Después", "Pequeños"],
        1,
        "«Después» es una expresión temporal que ayuda a ordenar acontecimientos.",
        "Después hicieron otros vuelos ese mismo día.",
      ),
      q(
        "vuelo-4",
        "INFERENCE",
        "¿Qué podemos deducir al comparar doce y cincuenta y nueve segundos?",
        [
          "El último vuelo duró más que el primero",
          "El primero duró una hora",
          "Nunca lograron volar",
        ],
        0,
        "Comparamos los dos datos: 59 es mayor que 12. La deducción está apoyada en el texto.",
      ),
      q(
        "vuelo-5",
        "MAIN_IDEA",
        "¿Qué título alternativo resume mejor el texto?",
        [
          "Cómo elegir una bicicleta",
          "Los primeros vuelos de los hermanos Wright",
          "La vida de todos los pilotos",
        ],
        1,
        "El relato cuenta los vuelos de un día histórico, no toda la vida de los pilotos.",
      ),
    ],
  },
  {
    id: "puente",
    title: "La ardilla y el puente",
    type: "Fábula original",
    paragraphs: [
      "Una ardilla quería cruzar un arroyo para recoger nueces. Encontró una rama larga, pero pesaba demasiado para moverla sola. Empujó una vez y otra vez; la rama apenas se movió.",
      "Un erizo que pasaba le ofreció ayuda. La ardilla pensaba que, por ser pequeño, no podría hacer mucho. Sin embargo, aceptó intentarlo juntos. El erizo levantó un extremo y ella empujó el otro. Así colocaron la rama sobre el arroyo.",
      "La ardilla cruzó, recogió las nueces y compartió algunas con su compañero. Al volver, entendió que no había necesitado ser más fuerte: había necesitado colaborar.",
    ],
    questions: [
      q(
        "puente-1",
        "CAUSE_EFFECT",
        "¿Por qué la ardilla no podía mover la rama sola?",
        [
          "Porque estaba dormida",
          "Porque la rama pesaba demasiado",
          "Porque no había arroyo",
        ],
        1,
        "El peso era la dificultad; necesitar ayuda fue una consecuencia.",
        "pesaba demasiado para moverla sola.",
      ),
      q(
        "puente-2",
        "INFERENCE",
        "¿Qué cambió en la manera de pensar de la ardilla?",
        [
          "Comprendió que alguien pequeño también puede ayudar",
          "Decidió que nadie sirve para ayudar",
          "Pensó que las nueces vuelan",
        ],
        0,
        "Primero dudó del erizo; después lograron su objetivo juntos. Esas pistas muestran un cambio.",
      ),
      q(
        "puente-3",
        "MORAL",
        "¿Qué enseñanza deja la fábula?",
        [
          "Solo los animales grandes pueden ayudar",
          "No debemos cruzar ningún arroyo",
          "Colaborar ayuda a superar dificultades",
        ],
        2,
        "La rama pudo moverse cuando ambos colaboraron. Esa acción sostiene la moraleja.",
      ),
      q(
        "puente-4",
        "EVIDENCE",
        "Elige la frase que demuestra que trabajaron juntos.",
        [
          "Una ardilla quería cruzar un arroyo.",
          "El erizo levantó un extremo y ella empujó el otro.",
          "Encontró una rama larga.",
        ],
        1,
        "La frase describe la contribución de los dos personajes.",
        "El erizo levantó un extremo y ella empujó el otro.",
      ),
      q(
        "puente-5",
        "CONTEXT_VOCABULARY",
        "En la última frase, «colaborar» significa…",
        ["Trabajar juntos", "Correr sin parar", "Esconder las nueces"],
        0,
        "La historia muestra que ambos aportaron una parte del trabajo.",
      ),
    ],
  },
  {
    id: "semillas",
    title: "El conejo y las semillas",
    type: "Fábula original",
    paragraphs: [
      "Un conejo y una tortuga recibieron semillas para plantar. El conejo las sembró y enseguida quiso ver flores. Como no aparecieron ese día, dejó de regarlas.",
      "La tortuga regó sus semillas un poco cada mañana. Revisaba la tierra y esperaba con paciencia. Al cabo de varios días, pequeños brotes verdes salieron de su maceta.",
      "El conejo se acercó sorprendido. La tortuga le explicó que crecer toma tiempo y necesita cuidados. Entonces, él volvió a sembrar y esta vez decidió cuidar sus plantas todos los días.",
    ],
    questions: [
      q(
        "semillas-1",
        "LITERAL",
        "¿Qué hacía la tortuga cada mañana?",
        [
          "Escondía su maceta",
          "Regaba un poco sus semillas",
          "Cortaba todas las flores",
        ],
        1,
        "Es una acción escrita en el segundo párrafo.",
        "La tortuga regó sus semillas un poco cada mañana.",
      ),
      q(
        "semillas-2",
        "CAUSE_EFFECT",
        "¿Por qué el conejo dejó de regar?",
        [
          "Porque no vio flores el mismo día",
          "Porque la tortuga se lo ordenó",
          "Porque sus plantas ya eran grandes",
        ],
        0,
        "El texto conecta su impaciencia con dejar de cuidar las semillas.",
        "Como no aparecieron ese día, dejó de regarlas.",
      ),
      q(
        "semillas-3",
        "MORAL",
        "¿Qué moraleja corresponde a esta historia?",
        [
          "Las semillas crecen sin ningún cuidado",
          "La paciencia y la constancia ayudan a lograr resultados",
          "Siempre hay que terminar todo en un minuto",
        ],
        1,
        "La tortuga cuida las semillas durante varios días. La enseñanza se apoya en su conducta.",
      ),
      q(
        "semillas-4",
        "PARAGRAPHS",
        "¿De qué trata principalmente el segundo párrafo?",
        [
          "De los cuidados de la tortuga y sus primeros brotes",
          "De un viaje al mar",
          "De los regalos del conejo",
        ],
        0,
        "Las oraciones del segundo párrafo desarrollan una misma idea: el cuidado constante y su resultado.",
      ),
      q(
        "semillas-5",
        "DETAILS",
        "¿Cómo eran los brotes que salieron?",
        ["Grandes y rojos", "Pequeños y verdes", "Azules y cuadrados"],
        1,
        "Busca las características precisas en el segundo párrafo.",
        "pequeños brotes verdes salieron de su maceta.",
      ),
    ],
  },
].map((p) => ({
  ...p,
  questions: p.questions.map((q) => ({ ...q, passageId: p.id })),
}));
export const proverbs: Question[] = [
  q(
    "refran-1",
    "PROVERB_MEANING",
    "«Más vale prevenir que lamentar». ¿En qué situación usarías este refrán?",
    [
      "Preparar la mochila la noche anterior para no olvidar materiales",
      "Esperar a perder un cuaderno para buscarlo",
      "Salir sin agua a una caminata larga",
    ],
    0,
    "Prevenir significa tomar precauciones antes de que aparezca un problema.",
  ),
  q(
    "refran-2",
    "PROVERB_MEANING",
    "«No dejes para mañana lo que puedes hacer hoy». ¿Qué consejo da?",
    [
      "Nunca descansar",
      "Hacer a tiempo lo que ya puedes resolver",
      "Hacer toda la tarea del año hoy",
    ],
    1,
    "Aconseja no posponer sin necesidad. No significa que nunca puedas descansar.",
  ),
  q(
    "refran-3",
    "PROVERB_MEANING",
    "«No todo lo que brilla es oro». ¿Qué situación se relaciona?",
    [
      "Un juguete se ve bonito, pero se rompe muy fácilmente",
      "Una lámpara ilumina el cuarto",
      "Todas las cosas amarillas son oro",
    ],
    0,
    "El significado no es literal: una apariencia atractiva no garantiza buena calidad o valor.",
  ),
  q(
    "refran-4",
    "PROVERB_MEANING",
    "«Al mal tiempo, buena cara». ¿Qué quiere decir?",
    [
      "Sonreír solamente si hace sol",
      "Ignorar todos los problemas",
      "Mantener una buena actitud ante las dificultades",
    ],
    2,
    "Invita a enfrentar una dificultad con ánimo; no exige ocultar lo que sientes ni negar el problema.",
  ),
];
export const punctuation: Question[] = [
  q(
    "parrafo-1",
    "PARAGRAPHS",
    "¿Qué es un párrafo?",
    [
      "Un conjunto de oraciones sobre una idea",
      "Cualquier palabra larga",
      "Solo la primera línea de una hoja",
    ],
    0,
    "Un párrafo desarrolla una idea mediante oraciones relacionadas.",
  ),
  q(
    "parrafo-2",
    "PARAGRAPHS",
    "«El gato tiene pelaje blanco. Sus ojos son verdes». ¿Qué oración continúa la misma idea de describir al gato?",
    [
      "Mañana habrá examen",
      "Su cola es larga",
      "Los planetas giran alrededor del Sol",
    ],
    1,
    "El pelaje, los ojos y la cola describen al mismo animal.",
  ),
  q(
    "parrafo-3",
    "PARAGRAPHS",
    "¿Qué signo se usa al terminar un párrafo y comenzar otro?",
    ["Coma", "Punto y aparte", "Signo de interrogación siempre"],
    1,
    "El punto y aparte separa párrafos. Después se comienza en otra línea.",
  ),
  q(
    "punto-coma-1",
    "SEMICOLON",
    "¿Cuál de estos signos es el punto y coma?",
    [":", ";", ","],
    1,
    "El punto y coma tiene un punto arriba y una coma debajo: ;.",
  ),
  q(
    "punto-coma-2",
    "SEMICOLON",
    "En «Ana llevó libros, lápices y hojas; Luis, agua y fruta», ¿qué separa el signo ;?",
    [
      "Las letras de una palabra",
      "Los objetos que llevó cada persona",
      "Una pregunta de su respuesta",
    ],
    1,
    "Hay comas dentro de los grupos. El punto y coma permite distinguir lo que llevó Ana de lo que llevó Luis.",
  ),
  q(
    "punto-coma-3",
    "SEMICOLON",
    "¿En qué ejemplo el punto y coma está colocado entre dos oraciones relacionadas?",
    [
      "Yo; tengo una mochila",
      "Estudié con atención; ahora entiendo mejor el tema",
      "El gato de; mi vecina",
    ],
    1,
    "Separa dos oraciones completas y relacionadas. En los otros ejemplos corta un grupo de palabras que debe permanecer unido. Un punto también podría funcionar entre esas oraciones.",
  ),
];
export function bvQuestions(entries = words, count = 8): Question[] {
  return shuffle(entries)
    .slice(0, count)
    .map((w) => ({
      id: `bv-${w.id}`,
      skill: "BV_SPELLING",
      kind: "bv",
      prompt: w.completion.prompt,
      correct: w.completion.answers.join(""),
      explanation: w.feedback,
    }));
}
export function dictationQuestions(entries = words, count = 6): Question[] {
  return shuffle(entries)
    .slice(0, count)
    .map((w) => ({
      id: `dict-${w.id}`,
      skill: "DICTATION",
      kind: "word",
      prompt: "Escucha al adulto y escribe solo la palabra.",
      correct: w.word,
      dictationSentence: w.dictationSentence,
      explanation: w.feedback,
    }));
}
export function examQuestions(entries = words): Question[] {
  return [
    passages[0].questions[2],
    passages[0].questions[0],
    passages[2].questions[0],
    passages[2].questions[2],
    punctuation[0],
    punctuation[4],
    ...shuffle(proverbs).slice(0, 2),
    ...bvQuestions(entries, 4),
  ];
}
