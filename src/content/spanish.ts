import type { Passage, Question, WordEntry } from "../domain/types";
import bank from "../../content/spanish/bv-common-words.v1.json";
import { shuffle } from "../domain/engines";
export const words: WordEntry[] = bank.words;
export const skillNames: Record<string, string> = {
  VOCABULARY: "Aprender palabras nuevas",
  LITERAL: "Lo que dice el texto",
  SEQUENCE: "Orden de los hechos",
  MAIN_IDEA: "Idea principal",
  DETAILS: "Detalles",
  CAUSE_EFFECT: "Causa y consecuencia",
  INFERENCE: "Entender las pistas",
  CONTEXT_VOCABULARY: "Significado de las palabras",
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
    body: "La respuesta está escrita en la lectura. Busca quién hizo algo, qué pasó, dónde pasó o cuándo pasó.",
    example: "«Ana llegó el lunes». ¿Cuándo llegó? El lunes: está escrito.",
  },
  {
    skill: "SEQUENCE",
    title: "Primero, después, al final",
    body: "Busca qué pasó primero, qué pasó después y qué pasó al final. Las fechas también te ayudan a saber el orden.",
    example: "Primero sembró. Después regó. Finalmente nació una planta.",
  },
  {
    skill: "MAIN_IDEA",
    title: "¿Qué es lo más importante del texto?",
    body: "La idea principal es lo más importante que cuenta el texto. Piensa en toda la historia, no solo en una parte.",
    example:
      "Una niña cuida un jardín y logra que vuelvan a crecer flores. Lo más importante es cómo cuidó el jardín. El color de su regadera es solo un detalle.",
  },
  {
    skill: "DETAILS",
    title: "Mira con atención",
    body: "Los detalles nos cuentan más: cuántas cosas hay, dónde están o cómo son.",
    example:
      "«Llevó tres libros azules». ¿Cuántos libros? Tres. ¿De qué color? Azules.",
  },
  {
    skill: "CAUSE_EFFECT",
    title: "¿Por qué pasó?",
    body: "La causa es por qué pasó algo. La consecuencia es lo que pasó por esa razón. Busca palabras como «porque» y «por eso».",
    example:
      "Llovió mucho → el patio se mojó. La lluvia es la causa; el patio mojado, la consecuencia.",
  },
  {
    skill: "INFERENCE",
    title: "Une las pistas",
    body: "A veces la lectura no dice todo. Usa las pistas para entender qué pasa. Pregúntate: ¿qué parte del texto me ayuda a saberlo?",
    example:
      "«Luis tomó su paraguas al ver las nubes oscuras». Las nubes y el paraguas nos ayudan a saber que Luis cree que va a llover.",
  },
  {
    skill: "CONTEXT_VOCABULARY",
    title: "¿Qué significa esta palabra?",
    body: "Si no conoces una palabra, lee lo que está antes y después. Esas otras palabras te pueden ayudar a entender qué significa.",
    example:
      "«El camino era estrecho: solo cabía una persona». Estrecho significa poco ancho.",
  },
  {
    skill: "EVIDENCE",
    title: "Busca la pista en el texto",
    body: "Busca la parte del texto que te ayuda a saber la respuesta. Esa es tu pista.",
    example:
      "«Ana se puso una chamarra y temblaba». Ponerse la chamarra y temblar son pistas de que Ana tiene frío.",
  },
  {
    skill: "PARAGRAPHS",
    title: "Una idea en cada párrafo",
    body: "Un párrafo es un grupo de oraciones que hablan de una misma idea. Termina con punto y aparte. El siguiente empieza en otra línea.",
    example:
      "Un párrafo cuenta cómo es un jardín. Otro explica cómo cuidarlo. Cada párrafo habla de una idea.",
  },
  {
    skill: "SEMICOLON",
    title: "Conoce el punto y coma ;",
    body: "El punto y coma (;) puede separar dos oraciones que hablan de algo relacionado. También ayuda a separar grupos en una lista que ya tiene comas.",
    example:
      "«Ana llevó libros, lápices y hojas; Luis, agua y fruta». El punto y coma separa lo que llevó Ana de lo que llevó Luis.",
  },
  {
    skill: "MORAL",
    title: "La enseñanza de una fábula",
    body: "Una fábula es una historia corta que nos enseña algo. Esa enseñanza se llama moraleja. En las fábulas, los animales pueden hablar y actuar como personas.",
    example:
      "Si dos personajes resuelven un problema al ayudarse, la moraleja puede ser: trabajar juntos nos ayuda a resolver problemas.",
  },
  {
    skill: "PROVERB_MEANING",
    title: "¿Qué consejo nos da el refrán?",
    body: "Un refrán es una frase conocida que nos da un consejo. A veces habla de una cosa para enseñarnos otra. Piensa: ¿qué me quiere enseñar?",
    example:
      "«Más vale prevenir que lamentar»: llevar agua a una caminata es prepararte antes de tener un problema.",
  },
  {
    skill: "BV_SPELLING",
    title: "Las palabras con b y v",
    body: "La b y la v suenan igual cuando hablamos. Para saber cuál usar, mira la palabra, léela y practica cómo se escribe.",
    example:
      "«Barco» lleva b y «vaso» lleva v. «Bebé» lleva dos b y un acento escrito sobre la é. Ese acento se llama tilde.",
  },
  {
    skill: "DICTATION",
    title: "Escucha, escribe y revisa",
    body: "Un adulto leerá una frase y repetirá una palabra. Escucha con calma, escribe esa palabra y revisa sus letras.",
    example:
      "Si escuchas «La vaca come pasto. Vaca», escribe solo vaca. La frase te ayuda a entender la palabra.",
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
      "El 16 de julio de 1969, la nave Apolo 11 despegó de Florida. En ella viajaban Neil Armstrong, Buzz Aldrin y Michael Collins. Querían llegar a la Luna.",
      "Después, Armstrong y Aldrin bajaron a la Luna en una nave pequeña llamada Eagle. Collins se quedó en órbita: viajaba alrededor de la Luna en otra parte de la nave. Armstrong fue el primero en pisar el suelo de la Luna; Aldrin lo siguió.",
      "Finalmente, el 24 de julio, los tres astronautas regresaron a la Tierra. Las fechas y las palabras «después» y «finalmente» nos ayudan a saber qué pasó primero y qué pasó después.",
    ],
    questions: [
      q(
        "luna-1",
        "LITERAL",
        "¿Qué día despegó la nave Apolo 11?",
        [
          "El 16 de julio de 1969",
          "El 24 de julio de 1969",
          "En diciembre de 1903",
        ],
        0,
        "La fecha está al principio de la lectura. Ese día la nave salió de la Tierra.",
        "El 16 de julio de 1969, la nave Apolo 11 despegó de Florida.",
      ),
      q(
        "luna-2",
        "MAIN_IDEA",
        "¿De qué trata toda la historia?",
        [
          "El color de la Luna",
          "El viaje de Apolo 11 a la Luna y su regreso",
          "La vida de Collins cuando era niño",
        ],
        1,
        "La historia cuenta cómo salieron, llegaron a la Luna y volvieron a la Tierra. Esa es la idea principal.",
      ),
      {
        id: "luna-3",
        skill: "SEQUENCE",
        kind: "sequence" as const,
        prompt:
          "Toca primero lo que pasó al inicio, luego lo que siguió y al final lo último.",
        choices: [
          "Bajaron a la Luna",
          "Regresaron a la Tierra",
          "Despegaron de Florida",
        ],
        correct:
          "Despegaron de Florida | Bajaron a la Luna | Regresaron a la Tierra",
        explanation:
          "Primero salieron de la Tierra, después llegaron a la Luna y finalmente regresaron.",
      },
      q(
        "luna-4",
        "DETAILS",
        "¿Qué astronauta se quedó viajando alrededor de la Luna?",
        ["Buzz Aldrin", "Michael Collins", "Neil Armstrong"],
        1,
        "Collins no bajó con sus compañeros.",
        "Collins se quedó en órbita: viajaba alrededor de la Luna en otra parte de la nave.",
      ),
      q(
        "luna-5",
        "CONTEXT_VOCABULARY",
        "¿Qué quiere decir «en órbita» en esta historia?",
        [
          "Estar dormido",
          "Caminar por el suelo de la Luna",
          "Viajar alrededor de la Luna",
        ],
        2,
        "El texto explica qué hacía Collins: viajaba alrededor de la Luna.",
        "viajaba alrededor de la Luna",
      ),
      q(
        "luna-6",
        "EVIDENCE",
        "¿Qué parte del texto nos dice que los tres volvieron a la Tierra?",
        [
          "Querían llegar a la Luna.",
          "Los tres astronautas regresaron a la Tierra.",
          "Armstrong fue el primero en pisar el suelo de la Luna.",
        ],
        1,
        "Dice «los tres», así que sabemos que todos volvieron.",
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
      "El 17 de diciembre de 1903, los hermanos Orville y Wilbur Wright hicieron cuatro vuelos con su avión. Orville manejó el avión en el primer vuelo. El avión estuvo en el aire durante doce segundos.",
      "Después hicieron otros vuelos ese mismo día. En el cuarto, Wilbur estuvo en el aire durante cincuenta y nueve segundos. Ese fue el vuelo más largo del día.",
      "Aunque duraron poco, estos vuelos fueron muy importantes en la historia de los aviones. Las palabras «primero», «después» y «cuarto» nos ayudan a seguir el orden de lo que pasó.",
    ],
    questions: [
      q(
        "vuelo-1",
        "LITERAL",
        "¿Cuántos vuelos hicieron ese día?",
        ["Dos", "Cuatro", "Doce"],
        1,
        "Al principio del texto dice cuántos vuelos hicieron.",
        "hicieron cuatro vuelos con su avión.",
      ),
      q(
        "vuelo-2",
        "DETAILS",
        "¿Cuánto duró el primer vuelo?",
        ["Doce segundos", "Cincuenta y nueve minutos", "Cuatro horas"],
        0,
        "El primer vuelo duró doce segundos. Ese número nos dice cuánto tiempo estuvieron en el aire.",
        "El avión estuvo en el aire durante doce segundos.",
      ),
      q(
        "vuelo-3",
        "SEQUENCE",
        "¿Qué palabra nos ayuda a contar lo que pasó más tarde?",
        ["Avión", "Después", "Hermanos"],
        1,
        "«Después» nos ayuda a contar qué pasó luego de otra cosa.",
        "Después hicieron otros vuelos ese mismo día.",
      ),
      q(
        "vuelo-4",
        "INFERENCE",
        "El primer vuelo duró 12 segundos y el último, 59. ¿Cuál duró más?",
        [
          "El último vuelo duró más que el primero",
          "El primero duró una hora",
          "Nunca lograron volar",
        ],
        0,
        "59 segundos son más que 12. Por eso sabemos que el último vuelo duró más.",
      ),
      q(
        "vuelo-5",
        "MAIN_IDEA",
        "¿Qué otro título le pondrías a esta historia?",
        [
          "Cómo elegir una bicicleta",
          "Los primeros vuelos de los hermanos Wright",
          "La vida de todos los pilotos",
        ],
        1,
        "El texto cuenta los primeros vuelos de los hermanos Wright. Ese título nos dice de qué trata la historia.",
      ),
    ],
  },
  {
    id: "puente",
    title: "La ardilla y el puente",
    type: "Fábula original",
    paragraphs: [
      "Una ardilla quería cruzar un arroyo, un río pequeño, para recoger nueces. Encontró una rama larga, pero pesaba demasiado para moverla sola. Empujó una vez y otra vez; la rama apenas se movió.",
      "Un erizo que pasaba le ofreció ayuda. Era un animal pequeño con púas en la espalda. La ardilla pensaba que él era demasiado pequeño para ayudar, pero decidió intentarlo con él. El erizo levantó una punta de la rama y ella empujó la otra. Así pusieron la rama sobre el arroyo.",
      "La ardilla cruzó, recogió las nueces y compartió algunas con su compañero. Al volver, entendió que no necesitaba ser más fuerte. Necesitaba colaborar: trabajar junto con alguien más.",
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
        "La rama pesaba mucho. Esa era la causa del problema. Por eso la ardilla necesitaba ayuda.",
        "pesaba demasiado para moverla sola.",
      ),
      q(
        "puente-2",
        "INFERENCE",
        "¿Qué cambió en la manera de pensar de la ardilla?",
        [
          "Entendió que alguien pequeño también puede ayudar",
          "Pensó que nadie podía ayudarla",
          "Pensó que las nueces vuelan",
        ],
        0,
        "Al principio creyó que el erizo no podía ayudar. Después vio que juntos sí podían mover la rama.",
      ),
      q(
        "puente-3",
        "MORAL",
        "¿Qué nos enseña esta fábula?",
        [
          "Solo los animales grandes pueden ayudar",
          "No debemos cruzar ningún arroyo",
          "Trabajar juntos nos ayuda a resolver problemas",
        ],
        2,
        "Pudieron mover la rama al trabajar juntos. La moraleja, o enseñanza, es que ayudarnos hace más fácil resolver problemas.",
      ),
      q(
        "puente-4",
        "EVIDENCE",
        "¿Qué parte de la historia nos dice que los dos ayudaron a mover la rama?",
        [
          "Una ardilla quería cruzar un arroyo para recoger nueces.",
          "El erizo levantó una punta de la rama y ella empujó la otra.",
          "Encontró una rama larga.",
        ],
        1,
        "Nos cuenta lo que hizo cada uno para ayudar: el erizo levantó y la ardilla empujó.",
        "El erizo levantó una punta de la rama y ella empujó la otra.",
      ),
      q(
        "puente-5",
        "CONTEXT_VOCABULARY",
        "En esta historia, ¿qué significa «colaborar»?",
        ["Trabajar juntos", "Correr sin parar", "Esconder las nueces"],
        0,
        "Colaborar es trabajar juntos. Cada uno ayudó a mover la rama.",
      ),
    ],
  },
  {
    id: "semillas",
    title: "El conejo y las semillas",
    type: "Fábula original",
    paragraphs: [
      "Un conejo y una tortuga recibieron semillas para plantar. El conejo las sembró y enseguida quiso ver flores. Como no aparecieron ese día, dejó de regarlas.",
      "La tortuga regó sus semillas un poco cada mañana. Revisaba la tierra y esperaba con paciencia. Después de varios días, salieron pequeños brotes verdes de su maceta: eran las primeras partes de las plantas.",
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
        "El segundo párrafo dice que la tortuga regaba las semillas cada mañana.",
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
        "El conejo quería ver flores de inmediato. Como no salieron ese día, dejó de regar.",
        "Como no aparecieron ese día, dejó de regarlas.",
      ),
      q(
        "semillas-3",
        "MORAL",
        "¿Cuál es la moraleja, o enseñanza, de esta historia?",
        [
          "Las semillas crecen sin ningún cuidado",
          "Esperar con paciencia y cuidar algo cada día ayuda a que salga bien",
          "Siempre hay que terminar todo en un minuto",
        ],
        1,
        "La tortuga cuidó sus semillas todos los días y supo esperar. Por eso sus plantas empezaron a crecer.",
      ),
      q(
        "semillas-4",
        "PARAGRAPHS",
        "¿Qué nos cuenta el segundo párrafo?",
        [
          "De cómo la tortuga cuidó sus semillas y vio crecer las plantas",
          "De un viaje al mar",
          "De los regalos del conejo",
        ],
        0,
        "Ese párrafo cuenta cómo la tortuga cuidó sus semillas cada día y cómo empezaron a crecer.",
      ),
      q(
        "semillas-5",
        "DETAILS",
        "¿Cómo eran los brotes, las primeras partes de las plantas?",
        ["Grandes y rojos", "Pequeños y verdes", "Azules y cuadrados"],
        1,
        "Busca en el segundo párrafo cómo eran y de qué color eran los brotes.",
        "salieron pequeños brotes verdes de su maceta",
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
    "«Más vale prevenir que lamentar». ¿Cuál de estos ejemplos sigue ese consejo?",
    [
      "Preparar la mochila por la noche para no olvidar mis útiles",
      "Esperar a perder un cuaderno para buscarlo",
      "Salir sin agua a una caminata larga",
    ],
    0,
    "Prevenir es prepararte para evitar un problema. Si preparas tu mochila antes, es más fácil que no olvides nada.",
  ),
  q(
    "refran-2",
    "PROVERB_MEANING",
    "«No dejes para mañana lo que puedes hacer hoy». ¿Qué consejo da?",
    [
      "Nunca descansar",
      "Hacer hoy la tarea que ya puedes hacer",
      "Hacer toda la tarea del año hoy",
    ],
    1,
    "Nos aconseja hacer las cosas a tiempo, en vez de dejarlas para después. También podemos descansar.",
  ),
  q(
    "refran-3",
    "PROVERB_MEANING",
    "«No todo lo que brilla es oro». ¿Qué ejemplo nos ayuda a entender este refrán?",
    [
      "Un juguete se ve bonito, pero se rompe muy fácilmente",
      "Una lámpara ilumina el cuarto",
      "Todas las cosas amarillas son oro",
    ],
    0,
    "Algo puede verse muy bonito y aun así no ser bueno. El refrán nos aconseja mirar más allá de cómo se ven las cosas.",
  ),
  q(
    "refran-4",
    "PROVERB_MEANING",
    "«Al mal tiempo, buena cara». ¿Qué quiere decir?",
    [
      "Sonreír solamente si hace sol",
      "Ignorar todos los problemas",
      "Tratar de mantener el ánimo cuando algo sale mal",
    ],
    2,
    "Nos anima a buscar cómo salir adelante cuando algo sale mal. Eso no quiere decir que tengas que esconder tu tristeza.",
  ),
];
export const punctuation: Question[] = [
  q(
    "parrafo-1",
    "PARAGRAPHS",
    "¿Qué es un párrafo?",
    [
      "Un grupo de oraciones que hablan de una misma idea",
      "Cualquier palabra larga",
      "Solo la primera línea de una hoja",
    ],
    0,
    "Las oraciones de un párrafo hablan de una misma idea. Al terminar el párrafo, escribimos punto y aparte.",
  ),
  q(
    "parrafo-2",
    "PARAGRAPHS",
    "«El gato tiene pelo blanco. Sus ojos son verdes». ¿Qué oración sigue contando cómo es el gato?",
    [
      "Mañana habrá examen",
      "Su cola es larga",
      "Los planetas giran alrededor del Sol",
    ],
    1,
    "El pelo, los ojos y la cola nos cuentan cómo es el gato. Las tres oraciones hablan de la misma idea.",
  ),
  q(
    "parrafo-3",
    "PARAGRAPHS",
    "¿Qué signo se usa al terminar un párrafo y comenzar otro?",
    ["Coma", "Punto y aparte", "Siempre un signo de pregunta (?)"],
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
    "Las comas separan los objetos. El punto y coma separa lo que llevó Ana de lo que llevó Luis.",
  ),
  q(
    "punto-coma-3",
    "SEMICOLON",
    "¿En cuál ejemplo el punto y coma separa dos oraciones que tienen que ver entre sí?",
    [
      "Yo; tengo una mochila",
      "Estudié con atención; ahora entiendo mejor el tema",
      "El gato de; mi vecina",
    ],
    1,
    "«Estudié con atención» y «ahora entiendo mejor el tema» son dos oraciones que tienen que ver entre sí. Podemos separarlas con ;. También podríamos usar un punto. En las otras opciones, el ; corta una oración a la mitad.",
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
