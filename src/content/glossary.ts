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
