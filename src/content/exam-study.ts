import type { LearningSession, Question } from "../domain/types";
import { shuffle } from "../domain/engines";

// Original teaching text and questions, based on the user-provided pages 12–31.
// Handwritten answers and teacher marks are not used as an answer key.
export type StudyTopic = {
  id: string;
  title: string;
  pages: string;
  body: string;
  example: string;
  questions: Question[];
  extra: Question[];
};
const choice = (
  id: string,
  skill: string,
  prompt: string,
  options: string[],
  explanation: string,
  readingText?: string,
  readingTitle?: string,
): Question => ({
  id: `book-${id}`,
  skill,
  kind: "choice",
  prompt,
  choices: options,
  correct: options[0],
  explanation,
  readingText,
  readingTitle,
});
const order = (
  id: string,
  items: string[],
  explanation: string,
  readingText?: string,
): Question => ({
  id: `book-${id}`,
  skill: "SEQUENCE",
  kind: "sequence",
  prompt: "Toca los hechos desde el primero hasta el último.",
  choices: items,
  correct: items.join(" | "),
  explanation,
  readingText,
  readingTitle: "Un proyecto para aprender a leer",
});
const history =
  "En 1920, José Vasconcelos inició un programa para enseñar a leer y escribir. En 1921, la Secretaría de Educación Pública se hizo cargo del programa.\n\nEn 1924, Vasconcelos dejó la Secretaría y el programa se detuvo. Mientras tanto, los muralistas continuaron contando la historia de México con sus pinturas.\n\nEn 1934, Lázaro Cárdenas retomó el programa. Tres años después comenzó la Campaña Nacional de Educación Popular, que invitaba a las personas a enseñar a leer y donar libros o recursos.";
const murals =
  "A principios del siglo XX, muchas personas de México no sabían leer. Diego Rivera y otros muralistas pintaron escenas de la historia en grandes paredes. Así, las personas podían conocer parte de su historia al observar las imágenes.\n\nLos lugares, la ropa y los personajes pintados dan pistas sobre la época representada. Para preparar sus obras, los pintores consultaban libros, fotografías, mapas y otras fuentes de información.";
const education =
  "Aprender a leer y escribir ayuda a las personas a comunicarse y participar en su comunidad. También les permite conocer ideas nuevas.\n\nPara impulsar la educación, José Vasconcelos apoyó la creación de bibliotecas y escuelas. También organizó una feria del libro.";
const roosters =
  "Dos gallos peleaban por la preferencia de las gallinas. Uno venció y el otro se escondió entre los arbustos.\n\nEl ganador, muy presumido, subió a una tapia y cantó con fuerza para mostrar su triunfo. Un águila lo vio desde arriba y se lo llevó.\n\nEl gallo que se había escondido volvió y se quedó con el gallinero. La historia nos invita a disfrutar los logros sin presumir ni dejar de ser cuidadosos.";
const shepherd =
  "Un zagal cuidaba sus ovejas cerca de un cerro. Para hacer una broma, gritó que venía un lobo. Los labradores dejaron su trabajo y corrieron a ayudar, pero no había ningún lobo.\n\nEl joven repitió el engaño. Cuando el lobo llegó de verdad, volvió a pedir ayuda. Esta vez los labradores no le creyeron y el lobo atacó al rebaño.\n\nLa enseñanza es que, si mentimos muchas veces, los demás pueden dejar de creernos incluso cuando decimos la verdad.";
const topic = (t: StudyTopic): StudyTopic => ({
  ...t,
  questions: t.questions.map((q) => ({ ...q, studyTopic: t.id })),
  extra: t.extra.map((q) => ({ ...q, studyTopic: t.id })),
});

export const studyTopics: StudyTopic[] = [
  topic({
    id: "sources",
    title: "Historias y pistas del pasado",
    pages: "12–15",
    body: "Un relato histórico cuenta hechos reales del pasado. Busca quién participó, dónde y cuándo ocurrió. Una fuente de información puede ser un libro, una fotografía o un mapa. Comparar varias fuentes ayuda a conocer más y comprobar datos.",
    example:
      "Si buscas información sobre los murales, revisa el título, las palabras clave y las imágenes. Un libro sobre pintura puede ayudarte más que uno de recetas.",
    questions: [
      choice(
        "sources-1",
        "HISTORICAL_SOURCES",
        "¿Qué cuenta un relato histórico?",
        [
          "Hechos reales del pasado",
          "Solo aventuras inventadas",
          "Instrucciones para cocinar",
        ],
        "Un relato histórico explica acontecimientos que sucedieron. Puede incluir fechas, lugares y personas reales.",
      ),
      choice(
        "sources-2",
        "HISTORICAL_SOURCES",
        "Quieres aprender sobre los murales de Diego Rivera. ¿Qué título te sirve más?",
        [
          "La pintura de Diego Rivera",
          "Recetas para el desayuno",
          "Cómo cuidar un pez",
        ],
        "El título te ayuda a reconocer si la fuente trata el tema que buscas.",
      ),
      choice(
        "sources-3",
        "HISTORICAL_SOURCES",
        "¿Para qué conviene consultar dos fuentes sobre el mismo hecho?",
        [
          "Para comparar datos y completar la información",
          "Para elegir siempre el texto más largo",
          "Para copiar sin leer",
        ],
        "Dos fuentes pueden aportar datos diferentes. Compararlos ayuda a comprender y comprobar la información.",
      ),
      choice(
        "sources-4",
        "LITERAL",
        "Según esta lectura, ¿quién pintaba escenas de la historia de México?",
        [
          "Diego Rivera y otros muralistas",
          "Solo José Vasconcelos",
          "Los personajes de una fábula",
        ],
        "La primera parte nombra a Diego Rivera y a otros muralistas.",
        murals,
        "Pinturas que cuentan historias",
      ),
      choice(
        "sources-5",
        "HISTORICAL_SOURCES",
        "¿Qué detalle de una pintura puede dar pistas sobre la época?",
        [
          "La ropa que usan sus personajes",
          "El color de la pared del museo",
          "El precio de la entrada",
        ],
        "La vestimenta, los objetos y los personajes representados ayudan a reconocer una época.",
        murals,
        "Pinturas que cuentan historias",
      ),
      choice(
        "sources-6",
        "HISTORICAL_SOURCES",
        "Dos textos mencionan murales, pintores e historia de México. ¿Qué te ayuda a relacionarlos?",
        [
          "Sus palabras clave y las ideas que comparten",
          "Que tengan el mismo número de letras",
          "Que todas sus oraciones sean iguales",
        ],
        "Las palabras clave y las ideas parecidas ayudan a reconocer un tema común.",
      ),
    ],
    extra: [
      choice(
        "sources-r1",
        "HISTORICAL_SOURCES",
        "Para saber cómo era una plaza hace cien años, ¿qué fuente puede ayudarte?",
        [
          "Una fotografía de esa plaza tomada en aquella época",
          "Una receta de pastel",
          "El horario de tu clase de mañana",
        ],
        "Una fotografía antigua puede mostrar cómo era un lugar en el pasado.",
      ),
      choice(
        "sources-r2",
        "HISTORICAL_SOURCES",
        "¿Qué pregunta te ayuda a encontrar el lugar de un hecho?",
        ["¿Dónde sucedió?", "¿Cuántas palabras tiene?", "¿Qué color me gusta?"],
        "¿Dónde? pregunta por el lugar. ¿Cuándo? pregunta por el tiempo y ¿quién? por las personas.",
      ),
    ],
  }),
  topic({
    id: "summary",
    title: "Lo importante, con mis palabras",
    pages: "16–17",
    body: "La idea principal dice lo más importante del texto. Un resumen conserva esa información y deja fuera detalles que no necesita. Parafrasear es explicar una idea con tus propias palabras sin cambiar su significado. Una cita textual copia las palabras exactas y usa comillas.",
    example:
      "Texto: «La lectura permite conocer ideas nuevas». Con mis palabras: «Al leer descubrimos otras ideas». Cambiaron las palabras, pero se mantiene el mensaje.",
    questions: [
      choice(
        "summary-1",
        "MAIN_IDEA",
        "¿Cuál es la idea principal del primer párrafo?",
        [
          "Leer y escribir ayuda a comunicarse y participar",
          "Todos los libros tienen dibujos",
          "Las ferias venden comida",
        ],
        "Todo el primer párrafo explica para qué sirven la lectura y la escritura.",
        education,
        "Leer abre posibilidades",
      ),
      choice(
        "summary-2",
        "SUMMARY",
        "¿Qué debe conservar un resumen?",
        [
          "Las ideas principales y los datos necesarios",
          "Todas las palabras del texto",
          "Solo la oración que más me gusta",
        ],
        "Resumir es contar lo esencial de forma más breve, sin cambiar los datos.",
      ),
      choice(
        "summary-3",
        "SUMMARY",
        "¿Qué oración dice con otras palabras «Aprender a leer permite conocer ideas nuevas»?",
        [
          "Cuando aprendemos a leer podemos descubrir otras ideas",
          "Leer impide aprender",
          "Solo aprendemos cuando no leemos",
        ],
        "La primera opción mantiene el significado. Eso es una paráfrasis.",
      ),
      choice(
        "summary-4",
        "SUMMARY",
        "Copias exactamente una frase del autor. ¿Cómo debes señalarlo?",
        [
          "Con comillas e indicando de dónde viene",
          "Cambiando la fecha del texto",
          "Diciendo que tú la inventaste",
        ],
        "Las comillas señalan las palabras copiadas exactamente. También se indica su fuente.",
      ),
      choice(
        "summary-5",
        "SUMMARY",
        "¿Cuál resume mejor el segundo párrafo?",
        [
          "Vasconcelos impulsó la educación con escuelas, bibliotecas y una feria del libro",
          "Vasconcelos solo organizó una fiesta",
          "Vasconcelos cerró todas las escuelas",
        ],
        "Este resumen reúne las acciones educativas que sí aparecen en el párrafo.",
        education,
        "Leer abre posibilidades",
      ),
      choice(
        "summary-6",
        "SUMMARY",
        "¿Cómo revisas si tu resumen está bien?",
        [
          "Compruebo que conserve lo importante y se entienda",
          "Cuento solo cuántas letras tiene",
          "Agrego hechos que no aparecen en el texto",
        ],
        "Un buen resumen es claro, conserva las ideas principales y respeta el significado del texto.",
      ),
    ],
    extra: [
      choice(
        "summary-r1",
        "SUMMARY",
        "«El perro bebió agua porque tenía sed». ¿Qué versión mantiene la idea?",
        [
          "Como tenía sed, el perro tomó agua",
          "El perro bebió porque tenía sueño",
          "El perro no tomó nada",
        ],
        "Podemos cambiar las palabras y el orden sin cambiar la razón por la que bebió.",
      ),
      choice(
        "summary-r2",
        "MAIN_IDEA",
        "Ana recoge basura, riega las plantas y limpia el patio de su escuela. ¿Qué reúne las tres acciones?",
        [
          "Ana ayuda a cuidar su escuela",
          "Ana solo estudia plantas",
          "Ana compra una mochila",
        ],
        "Cuidar la escuela reúne las tres acciones, no solo un detalle.",
      ),
    ],
  }),
  topic({
    id: "paragraphs",
    title: "Armo un párrafo",
    pages: "18–19",
    body: "Un párrafo reúne oraciones sobre una misma idea. La idea principal puede estar al inicio, en medio o al final. Las ideas secundarias añaden ejemplos, datos o explicaciones. Los nexos son palabras que unen ideas, como después o porque.",
    example:
      "«En la biblioteca podemos aprender muchas cosas. Hay libros de animales, historia y plantas». La primera oración es la idea principal. La segunda da ejemplos.",
    questions: [
      choice(
        "paragraphs-1",
        "PARAGRAPHS",
        "¿Qué es un párrafo?",
        [
          "Un grupo de oraciones relacionadas con una misma idea",
          "Una sola letra grande",
          "Cualquier lista de palabras sin relación",
        ],
        "Las oraciones de un párrafo desarrollan una idea.",
      ),
      choice(
        "paragraphs-2",
        "MAIN_IDEA",
        "¿Dónde puede aparecer la idea principal?",
        [
          "Al inicio, en medio o al final",
          "Siempre en la primera palabra",
          "Únicamente en el título",
        ],
        "Hay que leer el párrafo completo. La idea principal no siempre está al principio.",
      ),
      choice(
        "paragraphs-3",
        "SECONDARY_IDEA",
        "La idea principal es «Vasconcelos impulsó la educación». ¿Qué dato la explica?",
        [
          "Apoyó la creación de escuelas y bibliotecas",
          "Nació un día de febrero",
          "Tenía un nombre largo",
        ],
        "Crear escuelas y bibliotecas es una acción que ayuda a la educación. Su fecha de nacimiento no explica esa idea.",
      ),
      choice(
        "paragraphs-4",
        "SECONDARY_IDEA",
        "¿Para qué sirven las ideas secundarias?",
        [
          "Para explicar y completar la idea principal",
          "Para cambiar siempre de tema",
          "Para repetir exactamente el título",
        ],
        "Añaden ejemplos, explicaciones o datos relacionados con la idea principal.",
      ),
      choice(
        "paragraphs-5",
        "PARAGRAPHS",
        "«La biblioteca tiene libros de muchos temas». ¿Qué oración continúa el mismo tema?",
        [
          "Hay libros sobre animales y sobre el espacio",
          "Mi bicicleta tiene una rueda desinflada",
          "Ayer hice una ensalada",
        ],
        "Los ejemplos de libros completan la idea sobre la biblioteca.",
      ),
      choice(
        "paragraphs-6",
        "PARAGRAPHS",
        "«Ana leyó el texto ___ quería conocer la historia». ¿Qué palabra une las ideas y explica la razón?",
        ["porque", "finalmente", "mientras tanto"],
        "Porque une la acción de leer con la razón: conocer la historia.",
      ),
    ],
    extra: [
      choice(
        "paragraphs-r1",
        "SECONDARY_IDEA",
        "«La escuela ofrece actividades deportivas». ¿Cuál es un ejemplo que completa esta idea?",
        [
          "Hay clases de fútbol y natación",
          "Mi tía vive lejos",
          "La Luna se ve de noche",
        ],
        "Fútbol y natación son ejemplos de actividades deportivas.",
      ),
      choice(
        "paragraphs-r2",
        "PARAGRAPHS",
        "Un párrafo explica cómo es tu gato. Otro explica cómo lo cuidas. ¿Por qué separarlos?",
        [
          "Porque cada uno desarrolla una idea diferente",
          "Porque nunca se puede escribir sobre gatos",
          "Porque todas las palabras necesitan otra línea",
        ],
        "Organizar cada idea en un párrafo facilita la lectura.",
      ),
    ],
  }),
  topic({
    id: "punctuation",
    title: "Puntos y comas",
    pages: "20–21",
    body: "El punto y seguido separa oraciones del mismo párrafo. El punto y aparte termina un párrafo y el siguiente empieza en otra línea. El punto final termina el texto. Después de un punto se empieza con mayúscula. La coma separa elementos de una lista, rodea aclaraciones y separa el nombre de la persona a quien hablamos.",
    example:
      "«Judy, guarda lápices, colores y hojas». La primera coma separa el nombre de la persona a quien hablamos. Las otras separan elementos de la lista. «Diego Rivera, pintor mexicano, creó murales»: las dos comas rodean una aclaración.",
    questions: [
      choice(
        "punctuation-1",
        "PUNCTUATION",
        "«Terminamos de leer. ___ escribimos un resumen». ¿Cómo empieza la nueva oración?",
        ["Después", "después", "dESPUÉS"],
        "Después del punto, la primera palabra comienza con mayúscula: Después.",
      ),
      choice(
        "punctuation-2",
        "PUNCTUATION",
        "¿Qué punto termina una oración y permite seguir en el mismo párrafo?",
        ["Punto y seguido", "Punto y aparte", "Coma"],
        "El punto y seguido separa oraciones dentro del mismo párrafo.",
      ),
      choice(
        "punctuation-3",
        "PUNCTUATION",
        "Terminas un párrafo y comienzas otro en una nueva línea. ¿Qué usas?",
        ["Punto y aparte", "Solo una coma", "Ningún signo"],
        "El punto y aparte separa dos párrafos. El punto final termina todo el texto.",
      ),
      choice(
        "punctuation-4",
        "PUNCTUATION",
        "¿Qué signo cierra la última oración de todo el texto?",
        [
          "Punto final",
          "Coma de una lista",
          "Punto y aparte para abrir otro párrafo",
        ],
        "El punto final señala que el texto terminó.",
      ),
      choice(
        "punctuation-5",
        "PUNCTUATION",
        "¿Cuál lista está bien escrita?",
        [
          "Traje libros, lápices y hojas.",
          "Traje, libros lápices y hojas.",
          "Traje libros lápices y hojas.",
        ],
        "La coma separa libros de lápices. La y une los dos últimos elementos de esta lista sencilla.",
      ),
      choice(
        "punctuation-6",
        "PUNCTUATION",
        "Le pides ayuda a Luisa. ¿Cuál oración usa bien la coma?",
        [
          "Luisa, ayúdame a leer.",
          "Luisa ayúdame, a leer.",
          "Luisa ayúdame a, leer.",
        ],
        "Luisa es la persona a quien te diriges: el vocativo. Se separa con una coma.",
      ),
    ],
    extra: [
      choice(
        "punctuation-r1",
        "PUNCTUATION",
        "¿Qué oración encierra correctamente una aclaración entre comas?",
        [
          "Diego Rivera, pintor mexicano, creó murales.",
          "Diego, Rivera pintor mexicano creó murales.",
          "Diego Rivera pintor mexicano, creó, murales.",
        ],
        "Pintor mexicano añade una aclaración sobre Diego Rivera. Las comas van antes y después de esa aclaración.",
      ),
      choice(
        "punctuation-r2",
        "PUNCTUATION",
        "¿Cuál oración está bien puntuada?",
        [
          "Mi escuela está cerca de mi casa.",
          "Mi escuela, está cerca de mi casa.",
          "Mi, escuela está cerca de mi casa.",
        ],
        "No separamos con una coma el sujeto Mi escuela y lo que decimos sobre él: está cerca de mi casa.",
      ),
    ],
  }),
  topic({
    id: "sequence",
    title: "¿Qué pasó primero?",
    pages: "22–23",
    body: "Las fechas y palabras como antes, después y finalmente ayudan a ordenar los hechos. Mientras tanto, a la vez y simultáneamente indican que dos cosas ocurren al mismo tiempo. En una línea del tiempo colocamos los sucesos del más antiguo al más reciente.",
    example:
      "1920: comenzó el programa. 1921: la SEP se hizo cargo. Un año después de 1920 es 1921. Mientras alguien lee, otra persona puede dibujar: sucede al mismo tiempo.",
    questions: [
      order(
        "sequence-1",
        [
          "1920: comenzó el programa",
          "1921: la SEP se hizo cargo",
          "1924: el programa se detuvo",
          "1934: se retomó el programa",
        ],
        "Ordenamos las fechas de la menor a la mayor: 1920, 1921, 1924 y 1934.",
        history,
      ),
      choice(
        "sequence-2",
        "SEQUENCE",
        "El programa se retomó en 1934. Tres años después comenzó otra campaña. ¿En qué año?",
        ["1937", "1931", "1924"],
        "Después indica que avanzamos en el tiempo: 1934 + 3 = 1937.",
        history,
        "Un proyecto para aprender a leer",
      ),
      choice(
        "sequence-3",
        "SEQUENCE",
        "¿Qué expresión indica que dos cosas pasan al mismo tiempo?",
        ["Mientras tanto", "Muchos años después", "Finalmente"],
        "Mientras tanto indica que algo ocurre al mismo tiempo que otro hecho.",
      ),
      choice(
        "sequence-4",
        "SEQUENCE",
        "___ de salir de casa, preparé la mochila. Luego salí. ¿Qué falta?",
        ["Antes", "Después", "Al final"],
        "Preparó la mochila primero y salió luego: fue antes de salir.",
      ),
      choice(
        "sequence-5",
        "SEQUENCE",
        "¿Qué expresión ayuda a contar el último hecho?",
        ["Finalmente", "Al principio", "Antes de empezar"],
        "Finalmente anuncia lo que ocurrió al final de la secuencia.",
      ),
      choice(
        "sequence-6",
        "SEQUENCE",
        "¿Por qué sirve ordenar los hechos de una historia?",
        [
          "Para entender qué pasó primero y qué ocurrió después",
          "Para cambiar lo que ocurrió",
          "Para quitar todas las fechas",
        ],
        "El orden temporal ayuda a seguir y comprender la historia.",
      ),
    ],
    extra: [
      order(
        "sequence-r1",
        ["Elegí un libro", "Leí el libro", "Escribí su resumen"],
        "Primero elegimos qué leer, después leemos y al final resumimos lo leído.",
      ),
      choice(
        "sequence-r2",
        "SEQUENCE",
        "«Ana leía mientras Leo dibujaba». ¿Qué sabemos?",
        [
          "Las dos actividades ocurrían al mismo tiempo",
          "Leo dibujó un año después",
          "Ana nunca leyó",
        ],
        "Mientras relaciona dos actividades que suceden al mismo tiempo.",
      ),
    ],
  }),
  topic({
    id: "causes",
    title: "¿Por qué pasó y qué ocurrió?",
    pages: "24–25",
    body: "La causa responde por qué pasó algo. La consecuencia es lo que ocurrió por esa razón. Porque, ya que y debido a presentan causas. Así que, por tanto y por consiguiente presentan consecuencias. Que un hecho pase después de otro no significa, por sí solo, que el primero lo haya causado.",
    example:
      "«Como muchas personas no sabían leer, los muralistas contaban la historia con imágenes». La dificultad para leer es la causa. Usar imágenes para contar la historia es la consecuencia.",
    questions: [
      choice(
        "causes-1",
        "CAUSE_EFFECT",
        "«El patio se mojó porque llovió». ¿Cuál es la causa?",
        ["Llovió", "El patio se mojó", "Alguien barrió"],
        "Preguntamos por qué se mojó: porque llovió. Esa es la causa.",
      ),
      choice(
        "causes-2",
        "CAUSE_EFFECT",
        "«Ana practicó la lectura, así que pudo leer con más facilidad». ¿Cuál es la consecuencia?",
        ["Pudo leer con más facilidad", "Decidió practicar", "Perdió su libro"],
        "La consecuencia es el resultado de practicar: leer con más facilidad.",
      ),
      choice(
        "causes-3",
        "CAUSE_EFFECT",
        "¿Por qué los murales podían ayudar a quienes no sabían leer?",
        [
          "Porque mostraban parte de la historia mediante imágenes",
          "Porque todas las personas ya leían",
          "Porque no tenían dibujos",
        ],
        "Las imágenes permitían conocer parte de la historia sin tener que leer un texto.",
        murals,
        "Pinturas que cuentan historias",
      ),
      choice(
        "causes-4",
        "CAUSE_EFFECT",
        "«No pudimos salir ___ llovía mucho». ¿Qué palabra presenta la causa?",
        ["porque", "finalmente", "por tanto"],
        "Porque introduce la razón por la que no pudimos salir.",
      ),
      choice(
        "causes-5",
        "CAUSE_EFFECT",
        "«Olvidé regar la planta varios días, ___ se marchitó». ¿Qué expresión presenta el resultado?",
        ["así que", "antes de", "mientras tanto"],
        "Así que presenta una consecuencia: la planta se marchitó por falta de agua.",
      ),
      choice(
        "causes-6",
        "CAUSE_EFFECT",
        "Después de abrir un libro, sonó una campana. ¿Eso demuestra que abrir el libro hizo sonar la campana?",
        [
          "No; pasar después no demuestra que sea la causa",
          "Sí; todo lo que pasa después es consecuencia",
          "Sí; todos los libros hacen sonar campanas",
        ],
        "Para reconocer una causa necesitamos una relación que explique el hecho, no solo saber cuál pasó primero.",
      ),
    ],
    extra: [
      choice(
        "causes-r1",
        "CAUSE_EFFECT",
        "«El camión no llegó, por tanto caminamos a la escuela». ¿Qué ocurrió como consecuencia?",
        ["Caminamos a la escuela", "El camión no llegó", "La escuela cerró"],
        "No llegó el camión es la causa. Caminar a la escuela fue el resultado.",
      ),
      choice(
        "causes-r2",
        "CAUSE_EFFECT",
        "«Me puse un suéter debido al frío». ¿Qué explica la causa?",
        ["El frío", "El color del suéter", "La hora del desayuno"],
        "Debido a presenta la razón: hacía frío.",
      ),
    ],
  }),
  topic({
    id: "fables",
    title: "Fábulas que nos enseñan",
    pages: "26–29",
    body: "Una fábula es una historia breve que deja una enseñanza llamada moraleja. Sus personajes suelen ser animales, pero también pueden ser personas u objetos. Mira lo que hacen y qué les ocurre por hacerlo. La moraleja puede aparecer al principio o al final, o puede entenderse a partir de la historia.",
    example:
      "En El zagal y las ovejas, la enseñanza no es solo «el lobo». Lo que aprendemos es que mentir puede hacer que los demás dejen de creernos.",
    questions: [
      choice(
        "fables-1",
        "FABLE",
        "¿Qué caracteriza a una fábula?",
        [
          "Es breve y comunica una enseñanza",
          "Siempre cuenta hechos históricos reales",
          "Solo describe lugares y nunca enseña algo",
        ],
        "La fábula nos invita a aprender de las acciones de sus personajes.",
      ),
      choice(
        "fables-2",
        "EVIDENCE",
        "Según la lectura, ¿por qué peleaban los gallos?",
        [
          "Por la preferencia de las gallinas",
          "Para decidir quién cantaba mejor",
          "Para ayudar al águila",
        ],
        "La primera oración dice que peleaban por la preferencia de las gallinas. Cantar después no fue la razón de la pelea.",
        roosters,
        "El águila y los gallos · adaptación de Esopo",
      ),
      choice(
        "fables-3",
        "MORAL",
        "¿Qué enseñanza se relaciona con lo que hizo el gallo ganador?",
        [
          "Disfrutar los logros sin presumir ni descuidarse",
          "Cantar siempre hace que ganes",
          "Nunca debemos alegrarnos de un logro",
        ],
        "El gallo se expuso al subir y presumir su triunfo. Podemos alegrarnos sin presumir ni dejar de cuidarnos.",
        roosters,
        "El águila y los gallos · adaptación de Esopo",
      ),
      choice(
        "fables-4",
        "CAUSE_EFFECT",
        "¿Por qué los labradores no ayudaron al joven cuando el lobo llegó de verdad?",
        [
          "Porque sus mentiras anteriores hicieron que dejaran de creerle",
          "Porque el joven nunca pidió ayuda",
          "Porque las ovejas ya no existían",
        ],
        "Los labradores ya habían sido engañados. Por eso no creyeron la nueva llamada.",
        shepherd,
        "El zagal y las ovejas · adaptación de Samaniego",
      ),
      choice(
        "fables-5",
        "MORAL",
        "¿Cuál es la moraleja de El zagal y las ovejas?",
        [
          "Las mentiras pueden hacer que perdamos la confianza de los demás",
          "Los lobos son el nombre de una enseñanza",
          "Hacer bromas siempre resuelve los problemas",
        ],
        "La moraleja expresa lo que aprendemos, no solo nombra un personaje.",
        shepherd,
        "El zagal y las ovejas · adaptación de Samaniego",
      ),
      choice(
        "fables-6",
        "MORAL",
        "¿Qué situación se parece a la enseñanza del zagal?",
        [
          "Alguien inventa problemas muchas veces y luego no le creen cuando necesita ayuda",
          "Una niña pide ayuda por primera vez y la ayudan",
          "Dos amigas comparten un libro",
        ],
        "Las mentiras repetidas pueden dañar la confianza. Esa es la relación con la fábula.",
      ),
    ],
    extra: [
      choice(
        "fables-r1",
        "FABLE",
        "¿Una fábula puede tener personajes humanos?",
        [
          "Sí; también puede tener personas u objetos",
          "No; siempre deben ser dos gallos",
          "No; solo puede haber lobos",
        ],
        "Muchos personajes son animales, pero una fábula también puede usar personas u objetos para dejar una enseñanza.",
      ),
      choice(
        "fables-r2",
        "MORAL",
        "Un ratón ayuda a un león y después el león lo ayuda. ¿Qué enseñanza encaja?",
        [
          "Todos podemos ayudar, aunque seamos diferentes",
          "Solo los grandes pueden ayudar",
          "Nunca hay que aceptar ayuda",
        ],
        "Las acciones de ambos muestran que cada uno puede ayudar. Relacionamos la enseñanza con lo que sucede.",
      ),
    ],
  }),
  topic({
    id: "proverbs",
    title: "¿Qué nos quiere decir el refrán?",
    pages: "30–31",
    body: "Los refranes son dichos populares que dan consejos, advertencias o ideas para pensar. Se transmiten de generación en generación y normalmente no se conoce su autor. Su significado implícito es el mensaje que entendemos aunque no esté dicho directamente.",
    example:
      "«Camarón que se duerme, se lo lleva la corriente» aconseja estar atentos y actuar a tiempo. Puede hablar de una persona que pierde el autobús por distraerse: no necesita haber un camarón de verdad.",
    questions: [
      choice(
        "proverbs-1",
        "PROVERB_MEANING",
        "«El que mucho abarca, poco aprieta». ¿Qué consejo da?",
        [
          "Evitar hacer tantas cosas a la vez que no podamos hacerlas bien",
          "Nunca intentar aprender algo nuevo",
          "Apretar fuerte todos los objetos",
        ],
        "Abarcar mucho es intentar atender demasiadas cosas. El refrán aconseja concentrarse en lo que sí podemos hacer bien.",
      ),
      choice(
        "proverbs-2",
        "PROVERB_MEANING",
        "¿Qué situación representa «Camarón que se duerme, se lo lleva la corriente»?",
        [
          "Alguien se distrae y pierde el autobús",
          "Una niña llega a tiempo porque se preparó",
          "Una familia cocina camarones",
        ],
        "El consejo es estar atentos y actuar a tiempo para no perder oportunidades.",
      ),
      choice(
        "proverbs-3",
        "PROVERB_MEANING",
        "«¿A quién le dan pan que llore?». ¿Qué quiere decir?",
        [
          "Por lo general, recibimos con gusto algo que nos beneficia",
          "El pan siempre nos hace llorar",
          "Nunca debemos recibir regalos",
        ],
        "El pan representa algo bueno que recibimos. Es una expresión popular, no una obligación de aceptar todo.",
      ),
      choice(
        "proverbs-4",
        "PROVERB_MEANING",
        "«Más sabe el diablo por viejo que por diablo». ¿Qué destaca?",
        [
          "Que la experiencia permite aprender muchas cosas",
          "Que solo los diablos pueden aprender",
          "Que las personas jóvenes nunca saben nada",
        ],
        "Habla del conocimiento que se obtiene al vivir experiencias. También las personas jóvenes pueden saber mucho.",
      ),
      choice(
        "proverbs-5",
        "PROVERB_MEANING",
        "¿Cuál es una característica de los refranes?",
        [
          "Se transmiten entre generaciones y contienen enseñanzas",
          "Solo pueden aprenderse en revistas",
          "Siempre sabemos quién los escribió",
        ],
        "Son dichos de origen popular, compartidos a lo largo del tiempo.",
      ),
      choice(
        "proverbs-6",
        "PROVERB_MEANING",
        "¿Cómo encuentras el mensaje de un refrán?",
        [
          "Relaciono sus palabras con el consejo y una situación cotidiana",
          "Pienso que todas sus palabras deben ocurrir exactamente",
          "Solo cuento cuántas palabras tiene",
        ],
        "El significado implícito es el mensaje que entendemos más allá de lo que las palabras dicen literalmente.",
      ),
    ],
    extra: [
      choice(
        "proverbs-r1",
        "PROVERB_MEANING",
        "Luis intenta armar tres rompecabezas a la vez y no termina ninguno. ¿Qué refrán encaja?",
        [
          "El que mucho abarca, poco aprieta",
          "¿A quién le dan pan que llore?",
          "Más sabe el diablo por viejo que por diablo",
        ],
        "Luis intenta hacer demasiadas cosas al mismo tiempo y no consigue terminarlas bien.",
      ),
      choice(
        "proverbs-r2",
        "PROVERB_MEANING",
        "Una abuela sabe cuidar las plantas por los años que lleva haciéndolo. ¿Qué refrán encaja?",
        [
          "Más sabe el diablo por viejo que por diablo",
          "Camarón que se duerme, se lo lleva la corriente",
          "¿A quién le dan pan que llore?",
        ],
        "Los años de práctica le han dado experiencia. Ese es el mensaje del refrán.",
      ),
    ],
  }),
];

export const studyPool = studyTopics.flatMap((t) => [
  ...t.questions,
  ...t.extra,
]);

export function topicQuestions(t: StudyTopic): Question[] {
  // Punctuation rotates in explanations and subject/predicate practice too.
  return t.id === "punctuation"
    ? [
        t.questions[0],
        ...shuffle([...t.questions.slice(1), ...t.extra]).slice(0, 5),
      ]
    : [...t.questions];
}

export function studyExamQuestions(spelling: Question[]): Question[] {
  // Every exam has all eight topics plus four b/v items. Keep reading contexts.
  return shuffle([
    ...studyTopics.flatMap((t) =>
      shuffle([...t.questions, ...t.extra]).slice(0, 2),
    ),
    ...spelling.slice(0, 4).map((q) => ({ ...q, studyTopic: "spelling" })),
  ]);
}

export function pendingStudyErrors(sessions: LearningSession[]): Question[] {
  const pending = new Map<string, Question>();
  const events = sessions
    .filter((s) => s.subject === "spanish")
    .flatMap((s) =>
      s.attempts
        .filter((a) => !a.retry)
        .map((a) => ({ a, q: s.questions.find((q) => q.id === a.questionId) })),
    )
    .sort((a, b) => a.a.at.localeCompare(b.a.at));
  for (const { a, q } of events) {
    if (
      !q ||
      !(q.studyTopic || /^((bv|dict)-es-bv-0(2[5-9]|3[01]))$/.test(q.id))
    )
      continue;
    const key = q.reviewOf ?? q.id;
    if (a.correct && !a.assisted) pending.delete(key);
    else if (!a.correct && !pending.has(key))
      pending.set(key, { ...q, reviewOf: key });
  }
  return [...pending.values()];
}

export function studyReviewQuestions(sessions: LearningSession[]): Question[] {
  const seen = new Set(
    sessions.flatMap((s) =>
      s.attempts.map(
        (a) => s.questions.find((q) => q.id === a.questionId)?.prompt,
      ),
    ),
  );
  const used = new Set<string>();
  return pendingStudyErrors(sessions)
    .slice(0, 6)
    .map((missed) => {
      const candidates = shuffle(
        studyPool.filter(
          (q) =>
            q.studyTopic === missed.studyTopic &&
            q.id !== missed.id &&
            !used.has(q.id),
        ),
      );
      const fresh =
        candidates.find(
          (q) => q.skill === missed.skill && !seen.has(q.prompt),
        ) ??
        candidates.find((q) => !seen.has(q.prompt)) ??
        candidates.find(
          (q) => q.skill === missed.skill && q.prompt !== missed.prompt,
        ) ??
        candidates.find((q) => q.prompt !== missed.prompt);
      // Dictation errors can also be practiced safely as a written choice.
      const chosen =
        fresh ??
        (missed.kind === "word"
          ? {
              ...missed,
              kind: "choice" as const,
              prompt: "¿Cuál palabra está bien escrita?",
              choices: [
                missed.correct,
                missed.correct.replace(/b/g, "v"),
                missed.correct.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
              ].filter((v, i, all) => all.indexOf(v) === i),
            }
          : missed);
      used.add(chosen.id);
      return {
      ...chosen,
      studyTopic: chosen.studyTopic ?? "spelling",
      id: `review-${missed.reviewOf ?? missed.id}`,
        reviewOf: missed.reviewOf ?? missed.id,
        retry: false,
        helpUsed: false,
      };
    });
}
