import { vocabulary } from "./vocabulary";
export type GlossaryEntry = {
  vocabularyId?: string;
  word: string;
  forms: string[];
  meaning: string;
  example: string;
};

// Keep explanations concrete and useful to a ten-year-old reader.
// Add word forms here when introducing new educational vocabulary.
const existingGlossary: GlossaryEntry[] = [
  {
    word: "Paráfrasis",
    forms: ["paráfrasis", "parafrasear"],
    meaning:
      "Es explicar una idea con tus propias palabras, sin cambiar lo que significa.",
    example:
      "«El niño estaba contento» puede decirse «El pequeño se sentía feliz».",
  },
  {
    word: "Resumen",
    forms: ["resumen", "resúmenes", "resumir"],
    meaning:
      "Es una versión más corta de un texto que conserva lo más importante.",
    example:
      "Después de leer una historia, cuentas sus hechos principales en pocas oraciones.",
  },
  {
    word: "Cita textual",
    forms: ["cita textual", "citas textuales"],
    meaning:
      "Son las palabras exactas que tomamos de un texto o de una persona. Se escriben entre comillas y se dice de dónde vienen.",
    example:
      "Ana dijo: «Me gusta leer». Las comillas señalan sus palabras exactas.",
  },
  {
    word: "Idea secundaria",
    forms: ["idea secundaria", "ideas secundarias"],
    meaning:
      "Es un dato, ejemplo o explicación que completa la idea principal.",
    example:
      "«Hay libros de animales y plantas» da ejemplos de los libros de una biblioteca.",
  },
  {
    word: "Nexo",
    forms: ["nexo", "nexos"],
    meaning: "Es una palabra o expresión que une ideas.",
    example:
      "En «Leo porque quiero aprender», porque une lo que hago con la razón.",
  },
  {
    word: "Fuente de información",
    forms: [
      "fuente de información",
      "fuentes de información",
      "fuente",
      "fuentes",
    ],
    meaning:
      "Es de donde obtenemos información sobre un tema: un libro, una fotografía, un mapa o una persona que sabe de él.",
    example:
      "Una fotografía antigua puede servir como fuente para conocer cómo era una plaza.",
  },
  {
    word: "Palabras clave",
    forms: ["palabras clave", "palabra clave"],
    meaning:
      "Son palabras importantes que ayudan a reconocer de qué trata un texto.",
    example:
      "Murales, pinturas y pinceles son pistas de un texto sobre pintura.",
  },
  {
    word: "Alfabetización",
    forms: ["alfabetización", "alfabetizar"],
    meaning: "Es aprender o enseñar a leer y escribir.",
    example:
      "En una campaña de alfabetización se ayuda a las personas a aprender a leer y escribir.",
  },
  {
    word: "Mural",
    forms: ["mural", "murales"],
    meaning: "Es una pintura hecha sobre una pared o un muro.",
    example: "Un mural puede contar una historia mediante imágenes.",
  },
  {
    word: "Muralista",
    forms: ["muralista", "muralistas"],
    meaning: "Es una persona que pinta murales.",
    example: "Diego Rivera fue un muralista mexicano.",
  },
  {
    word: "Época",
    forms: ["época", "épocas"],
    meaning: "Es un periodo de la historia o de la vida.",
    example:
      "La ropa de una fotografía puede dar pistas de la época en que se tomó.",
  },
  {
    word: "Vocativo",
    forms: ["vocativo", "vocativos"],
    meaning:
      "Es el nombre o la palabra con la que llamamos a quien estamos hablando. Se separa con comas.",
    example: "En «Judy, ven a leer», Judy es el vocativo.",
  },
  {
    word: "Aclaración",
    forms: ["aclaración", "aclaraciones"],
    meaning: "Es información que añadimos para explicar algo mejor.",
    example: "En «Luna, mi gata, duerme», mi gata aclara quién es Luna.",
  },
  {
    word: "Enumeración",
    forms: ["enumeración", "enumeraciones"],
    meaning: "Es nombrar varios elementos, uno tras otro.",
    example: "«Traje libros, lápices y hojas» contiene una enumeración.",
  },
  {
    word: "Simultáneamente",
    forms: ["simultáneamente", "simultáneo", "simultáneos"],
    meaning: "Quiere decir que dos o más cosas pasan al mismo tiempo.",
    example: "Mientras tú lees, yo dibujo. Lo hacemos simultáneamente.",
  },
  {
    word: "Significado implícito",
    forms: ["significado implícito", "implícito", "implícita"],
    meaning:
      "Es un mensaje que entendemos con las pistas, aunque no esté dicho directamente.",
    example:
      "Un refrán sobre un camarón puede aconsejarnos estar atentos, aunque no diga «pon atención».",
  },
  {
    word: "Zagal",
    forms: ["zagal"],
    meaning:
      "Es una palabra que significa muchacho. En esta fábula, el muchacho cuida ovejas.",
    example: "El zagal llevó a sus ovejas a comer pasto.",
  },
  {
    word: "Tapia",
    forms: ["tapia"],
    meaning: "Es una pared o muro.",
    example: "El gallo se subió a la tapia para cantar.",
  },
  {
    word: "Collado",
    forms: ["collado"],
    meaning: "En esta lectura, es un cerro o una elevación del terreno.",
    example: "Desde el collado, el muchacho podía ver sus ovejas.",
  },
  {
    word: "Chanza",
    forms: ["chanza"],
    meaning: "Es una broma.",
    example: "El joven dijo que había un lobo, pero solo era una chanza.",
  },
  {
    word: "Apacentar",
    forms: ["apacentar", "apacentando"],
    meaning: "Es llevar o dejar a los animales a comer pasto.",
    example: "El pastor salió a apacentar a las ovejas.",
  },
  {
    word: "Escarmentar",
    forms: ["escarmentar", "escarmentada", "escarmentados"],
    meaning:
      "Es aprender de una experiencia desagradable para no repetir el mismo error.",
    example:
      "Después de creer dos bromas, los labradores quedaron escarmentados.",
  },
  {
    word: "Labrador",
    forms: ["labrador", "labradores"],
    meaning:
      "En esta fábula, es una persona que trabaja la tierra para cultivar.",
    example: "Los labradores dejaron su trabajo en el campo para ayudar.",
  },
  {
    word: "Rebaño",
    forms: ["rebaño", "rebaños"],
    meaning: "Es un grupo de ovejas u otros animales que se cuidan juntos.",
    example: "El pastor cuidaba un rebaño de veinte ovejas.",
  },
  {
    word: "Presumir",
    forms: ["presumir", "presumido", "presunción", "alarde"],
    meaning:
      "Es mostrar lo que tienes o logras para que los demás te admiren, a veces creyéndote mejor que ellos.",
    example:
      "Podemos alegrarnos de ganar sin presumir ni burlarnos de quien perdió.",
  },
  {
    word: "Generación",
    forms: ["generación", "generaciones"],
    meaning:
      "Es un grupo de personas de edades parecidas. Los abuelos, los padres y los hijos pertenecen a distintas generaciones.",
    example:
      "Un refrán puede pasar de los abuelos a sus hijos y después a sus nietos.",
  },
  {
    word: "Cotidiano",
    forms: ["cotidiano", "cotidiana", "cotidianas", "cotidianos"],
    meaning: "Es algo que forma parte de la vida de todos los días.",
    example: "Preparar la mochila es una actividad cotidiana.",
  },
  {
    word: "Moraleja",
    forms: ["moraleja", "moralejas"],
    meaning: "Es la enseñanza que nos deja una historia.",
    example:
      "Una historia donde dos amigos se ayudan puede enseñar que trabajar juntos hace las cosas más fáciles.",
  },
  {
    word: "Fábula",
    forms: ["fábula", "fábulas"],
    meaning:
      "Es una historia corta que nos enseña algo. Muchas tienen animales que hablan y actúan como personas.",
    example: "Una tortuga y un conejo pueden ser los personajes de una fábula.",
  },
  {
    word: "Refrán",
    forms: ["refrán", "refranes"],
    meaning: "Es una frase conocida que nos da un consejo o una enseñanza.",
    example:
      "«No dejes para mañana lo que puedes hacer hoy» nos aconseja hacer las cosas a tiempo.",
  },
  {
    word: "Párrafo",
    forms: ["párrafo", "párrafos"],
    meaning:
      "Es un grupo de oraciones que hablan de una misma idea. Al terminar, usamos punto y aparte.",
    example:
      "Puedes escribir un párrafo sobre cómo es tu mascota y otro sobre cómo la cuidas.",
  },
  {
    word: "Oración",
    forms: ["oración", "oraciones"],
    meaning:
      "En una lectura, es un grupo de palabras que expresa una idea completa.",
    example: "«El gato duerme en el sillón» es una oración.",
  },
  {
    word: "Punto y coma",
    forms: ["punto y coma"],
    meaning:
      "Es este signo: ;. Sirve para separar dos oraciones que tienen que ver entre sí o grupos de una lista que ya tiene comas.",
    example:
      "«Ana llevó libros, lápices y hojas; Luis, agua y fruta». El ; separa lo que llevó cada persona.",
  },
  {
    word: "Causa",
    forms: ["causa", "causas"],
    meaning:
      "Es la razón por la que pasa algo. Responde a la pregunta: ¿por qué pasó?",
    example: "El patio se mojó porque llovió. La lluvia fue la causa.",
  },
  {
    word: "Consecuencia",
    forms: ["consecuencia", "consecuencias"],
    meaning: "Es lo que pasa por algo que ocurrió antes.",
    example: "Llovió y el patio se mojó. El patio mojado fue la consecuencia.",
  },
  {
    word: "Idea principal",
    forms: ["idea principal", "ideas principales"],
    meaning: "Es lo más importante que nos cuenta un texto.",
    example:
      "Si toda la lectura cuenta cómo cuidar un perro, esa es su idea principal.",
  },
  {
    word: "Relato histórico",
    forms: ["relato histórico", "relatos históricos"],
    meaning: "Es una historia que cuenta hechos reales del pasado.",
    example:
      "Un texto que cuenta el viaje de los primeros astronautas que pisaron la Luna es un relato histórico.",
  },
  {
    word: "Órbita",
    forms: ["órbita", "órbitas"],
    meaning:
      "Es el camino que sigue algo en el espacio al dar vueltas alrededor de otro cuerpo.",
    example: "La Luna sigue una órbita alrededor de la Tierra.",
  },
  {
    word: "Astronauta",
    forms: ["astronauta", "astronautas"],
    meaning: "Es una persona preparada para viajar y trabajar en el espacio.",
    example: "Un astronauta puede hacer experimentos en una nave espacial.",
  },
  {
    word: "Despegar",
    forms: ["despegar", "despegó", "despegaron", "despegue"],
    meaning: "Es separarse del suelo y empezar a volar.",
    example: "El avión despegó: dejó el suelo y subió al aire.",
  },
  {
    word: "Arroyo",
    forms: ["arroyo", "arroyos"],
    meaning: "Es una corriente de agua pequeña, parecida a un río pequeño.",
    example: "Después de la lluvia, el agua corría por el arroyo.",
  },
  {
    word: "Erizo",
    forms: ["erizo", "erizos"],
    meaning:
      "En esta historia, es un animal pequeño con púas en la espalda. Las púas le ayudan a protegerse.",
    example: "Un erizo puede hacerse bolita cuando siente peligro.",
  },
  {
    word: "Brote",
    forms: ["brote", "brotes"],
    meaning: "Es una parte nueva que empieza a crecer en una planta.",
    example: "De la semilla salió un pequeño brote verde.",
  },
  {
    word: "Colaborar",
    forms: ["colaborar", "colabora", "colaboraron"],
    meaning: "Es trabajar con otras personas para lograr algo juntos.",
    example:
      "Tú recoges los lápices y yo guardo los libros. Así colaboramos para ordenar.",
  },
  {
    word: "Prevenir",
    forms: ["prevenir"],
    meaning: "Es hacer algo antes para evitar un problema.",
    example:
      "Revisar tu mochila antes de salir ayuda a prevenir que olvides un cuaderno.",
  },
  {
    word: "Lamentar",
    forms: ["lamentar"],
    meaning:
      "Es sentir tristeza por algo que pasó o desear que hubiera pasado de otra manera.",
    example: "Puedo lamentar haber roto sin querer el dibujo de un amigo.",
  },
  {
    word: "Estrecho",
    forms: ["estrecho", "estrecha", "estrechos", "estrechas"],
    meaning: "Quiere decir que algo tiene poco espacio de un lado al otro.",
    example: "En un camino estrecho quizá solo cabe una persona a la vez.",
  },
  {
    word: "Sembrar",
    forms: ["sembrar", "sembró", "sembraron"],
    meaning: "Es poner semillas en la tierra para que crezcan plantas.",
    example: "Voy a sembrar una semilla y regarla un poco cada día.",
  },
  {
    word: "Paciencia",
    forms: ["paciencia"],
    meaning: "Es saber esperar con calma cuando algo necesita tiempo.",
    example: "Necesitas paciencia para cuidar una semilla hasta que crezca.",
  },
  {
    word: "Constancia",
    forms: ["constancia"],
    meaning:
      "Es seguir practicando o cuidando algo con frecuencia, aunque tome tiempo.",
    example: "Practicar una tabla un rato cada día es tener constancia.",
  },
  {
    word: "Multiplicar",
    forms: ["multiplicar", "multiplicación", "multiplicaciones"],
    meaning:
      "En estas tablas, es una manera de sumar varias veces el mismo número.",
    example: "3 × 4 es lo mismo que 4 + 4 + 4. El resultado es 12.",
  },
  {
    word: "Duplicar",
    forms: ["duplicar", "duplica", "doble"],
    meaning:
      "Es tener dos veces una cantidad. Puedes sumar esa cantidad consigo misma.",
    example: "El doble de 3 es 6, porque 3 + 3 = 6.",
  },
  {
    word: "Tilde",
    forms: ["tilde", "tildes"],
    meaning:
      "Es la rayita que se escribe sobre una vocal en algunas palabras: á, é, í, ó, ú.",
    example: "«Bebé» lleva tilde en la última é.",
  },
  {
    word: "Ortografía",
    forms: ["ortografía"],
    meaning:
      "Son las reglas que nos ayudan a escribir bien las palabras y a usar los signos al escribir.",
    example:
      "Aprender que «barco» lleva b y «vaso» lleva v es practicar ortografía.",
  },
  {
    word: "Deducir",
    forms: ["deducir", "deducción"],
    meaning:
      "Es usar lo que ya sabes y las pistas que tienes para entender algo más.",
    example:
      "Ves un paraguas mojado y botas con lodo. Puedes deducir que afuera llovió.",
  },
  {
    word: "Inferir",
    forms: ["inferir", "inferencia", "inferencias"],
    meaning:
      "Es entender algo que el texto no dice directamente, usando sus pistas.",
    example:
      "«Ana bostezó y cerró los ojos». Esas pistas te ayudan a pensar que tenía sueño.",
  },
];

export const glossary: GlossaryEntry[] = [
  ...existingGlossary.filter(
    (e) =>
      !vocabulary.some((w) => w.word === e.word.toLocaleLowerCase("es-MX")),
  ),
  ...vocabulary.map((w) => ({
    vocabularyId: w.id,
    word: w.word,
    forms: [
      ...new Set([
        ...w.forms,
        ...(existingGlossary.find(
          (e) => e.word.toLocaleLowerCase("es-MX") === w.word,
        )?.forms ?? []),
      ]),
    ],
    meaning: w.meaning,
    example: w.example,
  })),
];

const entriesByForm = new Map(
  glossary.flatMap((entry) =>
    entry.forms.map((form) => [form, entry] as const),
  ),
);
const escapePattern = (text: string) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const pattern = [...entriesByForm.keys()]
  .sort((a, b) => b.length - a.length)
  .map(escapePattern)
  .join("|");
export type GlossaryPart = { text: string; entry?: GlossaryEntry };
export function glossaryParts(text: string): GlossaryPart[] {
  // Match whole words, including accented Spanish letters, with the longest phrase first.
  const matches = text.matchAll(
    new RegExp(`(?<![\\p{L}\\p{N}_])(?:${pattern})(?![\\p{L}\\p{N}_])`, "giu"),
  );
  const parts: GlossaryPart[] = [];
  let from = 0;
  for (const match of matches) {
    if (match.index > from) parts.push({ text: text.slice(from, match.index) });
    parts.push({
      text: match[0],
      entry: entriesByForm.get(match[0].toLocaleLowerCase("es-MX")),
    });
    from = match.index + match[0].length;
  }
  if (from < text.length) parts.push({ text: text.slice(from) });
  return parts;
}
