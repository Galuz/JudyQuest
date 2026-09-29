import type { LearningSession, Question } from "../domain/types";
import { bookTopics } from "./math-book";
import { shuffle } from "../domain/engines";

// Original exercises based on the supplied syllabus, not on unseen textbook pages.
export type MathTopic = {
  id: string;
  title: string;
  pages: string;
  goal: string;
  steps: string[];
  example: string[];
  remember: string;
  divisionDiagram?: Question["divisionDiagram"];
  bars?: Question["fractionBars"];
  questions: Question[];
};
const q = (
  id: string,
  prompt: string,
  correct: string,
  others: string[],
  explanation: string,
  fractionBars?: Question["fractionBars"],
): Question => ({
  id: `exam-math-${id}`,
  skill: id.split("-")[0],
  kind: "choice",
  prompt,
  correct,
  choices: [correct, ...others],
  explanation,
  fractionBars,
});
const bar = (numerator: number, denominator: number) => ({
  numerator,
  denominator,
});
const fraction = (n: number, d: number) => `${n}/${d}`;
export function commonDenominator(a: number, b: number) {
  let d = a;
  while (d % b !== 0) d += a;
  return d;
}
function equivalent(i: number, n: number, d: number, factor: number) {
  return q(
    `equivalent-${i}`,
    `¿Cuál vale lo mismo que ${n}/${d}?`,
    fraction(n * factor, d * factor),
    [fraction(n, d * factor), fraction(n * factor, d)],
    `Multiplica arriba y abajo por ${factor}: ${n} × ${factor} = ${n * factor} y ${d} × ${factor} = ${d * factor}. Así, ${n}/${d} = ${n * factor}/${d * factor}. Cambian los pedacitos, no la cantidad.`,
    [bar(n, d)],
  );
}
export function comparisonLabel(value: string) {
  return (
    (
      { ">": "mayor que", "<": "menor que", "=": "igual a" } as Record<
        string,
        string
      >
    )[value] ?? value
  );
}

// Stored sessions keep their original answer values, so old symbol-based
// questions still grade correctly while all visible copy uses plain words.
export function readableMathQuestion(question: Question): Question {
  if (
    !question ||
    question.studyTopic !== "compare" ||
    question.fractionBars?.length !== 2
  )
    return question;
  const [a, b] = question.fractionBars;
  const common = commonDenominator(a.denominator, b.denominator);
  const left = (a.numerator * common) / a.denominator;
  const right = (b.numerator * common) / b.denominator;
  const relationship =
    left === right ? "igual a" : left > right ? "mayor que" : "menor que";
  return {
    ...question,
    prompt: "Compara la cantidad pintada de los dos pasteles.",
    explanation: `${a.numerator}/${a.denominator} es ${relationship} ${b.numerator}/${b.denominator}. ${left === right ? "Los dos tienen la misma cantidad pintada." : left > right ? "El primero tiene más cantidad pintada." : "El primero tiene menos cantidad pintada."} Si dividimos los dos pasteles en ${common} partes iguales, el primero tiene ${left} ${left === 1 ? "parte pintada" : "partes pintadas"} y el segundo ${right}.`,
  };
}

function compare(i: number, a: number, b: number, c: number, d: number) {
  const common = commonDenominator(b, d),
    left = (a * common) / b,
    right = (c * common) / d;
  const sign =
    left === right ? "igual a" : left > right ? "mayor que" : "menor que";
  return readableMathQuestion({
    ...q(
      `compare-${i}`,
      "Compara las cantidades pintadas.",
      sign,
      ["menor que", "igual a", "mayor que"].filter((s) => s !== sign),
      `Usa partes del mismo tamaño: ${a}/${b} = ${left}/${common} y ${c}/${d} = ${right}/${common}. Compara ${left} con ${right}: ${a}/${b} ${sign} ${c}/${d}.`,
      [bar(a, b), bar(c, d)],
    ),
    studyTopic: "compare",
  });
}
function fractionOperation(
  i: number,
  a: number,
  b: number,
  c: number,
  d: number,
  subtract = false,
) {
  const common = commonDenominator(b, d),
    left = (a * common) / b,
    right = (c * common) / d;
  const total = subtract ? left - right : left + right,
    sign = subtract ? "−" : "+";
  return q(
    `fractions-${i}`,
    `${a}/${b} ${sign} ${c}/${d} = ¿qué fracción?`,
    fraction(total, common),
    [fraction(total + 1, common), fraction(total + 2, common)],
    `Primero usa ${common} partes iguales: ${a}/${b} = ${left}/${common} y ${c}/${d} = ${right}/${common}. Después ${left} ${sign} ${right} = ${total}. El denominador queda en ${common}: ${total}/${common}.`,
  );
}
function multiply(i: number, a: number, b: number) {
  const tens = Math.floor(b / 10) * 10,
    units = b % 10;
  return q(
    `multiply-${i}`,
    `${a} × ${b} = ¿cuánto?`,
    String(a * b),
    [String(a * b + a), String(a * b - 1)],
    tens
      ? `Separa ${b} en ${tens} + ${units}. Calcula ${a} × ${tens} = ${a * tens} y ${a} × ${units} = ${a * units}. Junta: ${a * tens} + ${a * units} = ${a * b}.`
      : `${b} grupos de ${a}: ${Array.from({ length: b }, () => a).join(" + ")} = ${a * b}.`,
  );
}
export function divisionSteps(dividend: number, divisor: number): string[] {
  let remainder = 0;
  return [...String(dividend)].map((digit, i) => {
    const current = remainder * 10 + Number(digit),
      result = Math.floor(current / divisor);
    remainder = current % divisor;
    if (i === 0 && result === 0 && String(dividend).length > 1)
      return `La primera cifra, ${digit}, es menor que ${divisor}. Toma también la siguiente cifra antes de empezar el cociente.`;
    return `${i ? `Junta el sobrante anterior con la siguiente cifra (${digit}): tienes ${current}. ` : `Empieza por la primera cifra (${digit}). `}${divisor} cabe ${result} ${result === 1 ? "vez" : "veces"}: escribe ${result}. Resta ${current} − ${divisor * result} = ${remainder}.`;
  });
}
function divide(i: number, a: number, b: number) {
  return q(
    `divide-${i}`,
    `${a} ÷ ${b} = ¿cuánto?`,
    String(a / b),
    [String(a / b + 1), String(a / b - 1)],
    `${divisionSteps(a, b).join(" ")} El cociente es ${a / b}. Comprueba: ${b} × ${a / b} = ${a}.`,
  );
}

export const mathTopics: MathTopic[] = [
  {
    id: "parts",
    title: "Leo y dibujo fracciones",
    pages: "12–17",
    goal: "Una fracción cuenta partes iguales de un entero.",
    steps: [
      "Mira el número de abajo: es el denominador. Dice en cuántas partes iguales se dividió el entero.",
      "Mira el de arriba: es el numerador. Dice cuántas partes tomamos o pintamos.",
      "Lee primero el de arriba y luego el nombre de las partes: medios, tercios, cuartos, quintos, sextos, séptimos, octavos, novenos o décimos.",
    ],
    example: [
      "3/4: el entero se divide en 4 partes iguales.",
      "Pintamos 3. Se lee tres cuartos.",
    ],
    remember:
      "Las partes deben ser iguales. La rayita de 3/4 separa el numerador del denominador.",
    bars: [bar(3, 4)],
    questions: [
      q(
        "parts-1",
        "En 3/4, ¿cuál es el numerador?",
        "3",
        ["4", "7"],
        "El numerador está arriba: 3. Cuenta las partes que tomamos.",
      ),
      q(
        "parts-2",
        "En 2/5, ¿qué indica el 5?",
        "El entero se dividió en 5 partes iguales",
        ["Tomamos 5 partes", "Hay 5 enteros"],
        "El 5 es el denominador. Indica el total de partes iguales del entero.",
      ),
      q(
        "parts-3",
        "¿Cómo se lee 2/3?",
        "Dos tercios",
        ["Tres medios", "Dos cuartos"],
        "Lee el 2: dos. El 3 de abajo indica tercios. Juntos: dos tercios.",
      ),
      q(
        "parts-4",
        "¿Qué fracción de este pastel está pintada?",
        "3/8",
        ["8/3", "5/8"],
        "Hay 8 partes iguales en total y 3 pintadas: 3/8, tres octavos.",
        [bar(3, 8)],
      ),
      q(
        "parts-5",
        "¿Qué dibujo sirve para mostrar cuartos?",
        "Un entero dividido en 4 partes iguales",
        [
          "Un entero dividido en 4 partes de distinto tamaño",
          "Cuatro enteros sin dividir",
        ],
        "Cuartos significa 4 partes del mismo tamaño dentro de un entero.",
      ),
      q(
        "parts-6",
        "¿Cómo escribes cinco sextos?",
        "5/6",
        ["6/5", "5/7"],
        "Cinco dice cuántas partes tomamos; sextos indica 6 partes iguales: 5/6.",
      ),
      q(
        "parts-7",
        "¿Qué fracción representa todo el pastel pintado?",
        "4/4",
        ["1/4", "0/4"],
        "Tomamos las 4 partes de 4: 4/4. Eso es un entero.",
        [bar(4, 4)],
      ),
      q(
        "parts-8",
        "¿Cómo se lee 7/10?",
        "Siete décimos",
        ["Diez séptimos", "Siete novenos"],
        "El 7 indica siete partes. Si dividimos en 10, cada parte es un décimo.",
      ),
    ],
  },
  {
    id: "equivalent",
    title: "La misma cantidad, otras partes",
    pages: "12–17",
    goal: "Las fracciones equivalentes representan la misma cantidad.",
    steps: [
      "Empieza con una fracción, por ejemplo 1/2.",
      "Multiplica el número de arriba y el de abajo por el mismo número: por 2.",
      "1 × 2 = 2 y 2 × 2 = 4. Entonces 1/2 = 2/4.",
    ],
    example: [
      "Medio chocolate es lo mismo que dos cuartos del mismo chocolate.",
      "Hay más pedacitos, pero son más pequeños. La cantidad pintada es la misma.",
    ],
    remember:
      "Cambia los dos números con el mismo multiplicador. Nunca cambies solo uno.",
    bars: [bar(1, 2), bar(2, 4)],
    questions: [
      [1, 2, 2],
      [2, 3, 2],
      [3, 4, 2],
      [1, 3, 3],
      [2, 5, 2],
      [1, 4, 3],
      [3, 5, 2],
      [2, 4, 2],
    ].map(([n, d, k], i) => equivalent(i, n, d, k)),
  },
  {
    id: "compare",
    title: "¿Cuál fracción es mayor?",
    pages: "12–17",
    goal: "Comparamos partes del mismo tamaño y enteros del mismo tamaño.",
    steps: [
      "Si los números de abajo son iguales, compara los de arriba.",
      "Si son distintos, busca un número que aparezca en las dos tablas. Para 2 y 3, el primero es 6.",
      "Cambia las dos fracciones a sextos multiplicando arriba y abajo por el mismo número. Después compara los numeradores.",
    ],
    example: [
      "Un medio equivale a tres sextos. Dos tercios equivalen a cuatro sextos.",
      "3 partes son menos que 4: 1/2 es menor que 2/3.",
      "Lee de izquierda a derecha: la primera fracción es menor que, mayor que o igual a la segunda.",
    ],
    remember:
      "Mayor que significa más cantidad pintada; menor que, menos cantidad pintada; igual a, la misma cantidad. Cuenta partes solo cuando sean del mismo tamaño.",
    bars: [bar(3, 6), bar(4, 6)],
    questions: [
      [1, 4, 3, 4],
      [3, 5, 2, 5],
      [1, 2, 2, 4],
      [1, 2, 1, 4],
      [1, 2, 2, 3],
      [3, 4, 2, 3],
      [2, 3, 4, 6],
      [2, 5, 1, 2],
    ].map(([a, b, c, d], i) => compare(i, a, b, c, d)),
  },
  {
    id: "fractions",
    title: "Sumo y resto fracciones",
    pages: "12–17",
    goal: "Primero hacemos partes del mismo tamaño; después las juntamos o quitamos.",
    steps: [
      "Busca un denominador común. Escribe la tabla de cada denominador hasta encontrar un resultado compartido. Para 2 y 3: 2, 4, 6 y 3, 6.",
      "Cambia cada fracción multiplicando arriba y abajo por el mismo número: 1/2 = 3/6 y 1/3 = 2/6.",
      "Suma o resta solo los numeradores. El denominador se queda igual.",
    ],
    example: [
      "SUMA: 1/2 + 1/3 = 3/6 + 2/6 = 5/6.",
      "RESTA: 3/4 − 1/2 = 3/4 − 2/4 = 1/4.",
      "Si ya tienen el mismo denominador: 1/5 + 2/5 = 3/5.",
    ],
    remember:
      "No sumes ni restes los denominadores. Si obtienes 2/4, ya tienes una respuesta válida; también equivale a 1/2.",
    bars: [bar(3, 6), bar(2, 6)],
    questions: [
      fractionOperation(1, 1, 5, 2, 5),
      fractionOperation(2, 1, 2, 1, 4),
      fractionOperation(3, 1, 2, 1, 3),
      fractionOperation(4, 3, 4, 1, 2, true),
      fractionOperation(5, 5, 6, 1, 3, true),
      fractionOperation(6, 2, 3, 1, 6),
      fractionOperation(7, 4, 5, 2, 5, true),
      fractionOperation(8, 3, 4, 1, 3, true),
    ],
  },
  {
    id: "multiply",
    title: "Multiplico por partes",
    pages: "18–19",
    goal: "Multiplicar sirve para juntar grupos que tienen la misma cantidad.",
    steps: [
      "Lee 4 × 3 como 3 grupos de 4: 4 + 4 + 4 = 12.",
      "Para un número mayor, sepáralo en decenas y unidades: 12 = 10 + 2.",
      "Multiplica cada parte y suma los resultados.",
    ],
    example: [
      "23 × 12: calcula 23 × 10 = 230.",
      "Calcula 23 × 2 = 46.",
      "Junta 230 + 46 = 276.",
    ],
    remember:
      "Al multiplicar un número entero por 10, escribe un cero a su derecha: 23 × 10 = 230.",
    questions: [
      [4, 3],
      [6, 5],
      [8, 7],
      [14, 3],
      [23, 12],
      [32, 21],
      [17, 4],
      [25, 12],
    ].map(([a, b], i) => multiply(i, a, b)),
  },
  {
    id: "divide",
    title: "Divido paso a paso",
    pages: "18–19",
    goal: "Dividir es repartir en partes iguales. Las tablas te ayudan a saber cuánto toca.",
    steps: [
      "El signo ÷ significa dividido entre. Lee 12 ÷ 3 como doce dividido entre tres: reparte 12 en 3 grupos iguales.",
      "Ve de izquierda a derecha. Si la primera cifra es menor que el divisor, toma también la siguiente. Pregunta cuántas veces cabe el divisor sin pasarse.",
      "Escribe esa cifra en el cociente. Multiplica y resta para saber cuánto sobra.",
      "Baja la siguiente cifra junto al sobrante y repite. Si ya empezaste el cociente y ahora no cabe, escribe 0 en ese lugar. Al terminar, comprueba multiplicando.",
    ],
    example: [
      "84 ÷ 4. En el 8 cabe el 4 dos veces: escribe 2. Resta 8 − 8 = 0.",
      "Baja el 4. El 4 cabe una vez: escribe 1 junto al 2. Resta 4 − 4 = 0.",
      "Resultado: 84 ÷ 4 = 21. Comprueba: 4 × 21 = 84.",
    ],
    remember:
      "Conserva los ceros que van en medio del cociente: 408 ÷ 4 = 102. Nunca dividimos entre 0.",
    questions: [
      [12, 3],
      [24, 6],
      [42, 7],
      [84, 4],
      [96, 3],
      [156, 3],
      [408, 4],
      [125, 5],
    ].map(([a, b], i) => divide(i, a, b)),
  },
  {
    id: "remainder",
    title: "Las partes de una división",
    pages: "20–22",
    goal: "A veces repartimos y quedan objetos sin repartir: ese es el residuo.",
    steps: [
      "Dividendo: lo que vas a repartir. Divisor: entre cuántos repartes.",
      "Cociente: lo que toca a cada uno. Residuo: lo que sobra.",
      "Comprueba: divisor × cociente + residuo = dividendo. El residuo debe ser menor que el divisor.",
    ],
    example: [
      "17 fichas entre 5 niños: 17 ÷ 5 da 3 y sobran 2. Cada uno recibe 3 fichas.",
      "Dividendo 17 · divisor 5 · cociente 3 · residuo 2.",
      "Comprobamos: 5 × 3 + 2 = 17. Sobran menos de 5; no alcanza para otra ronda.",
    ],
    remember:
      "Si sobra 0, la división es exacta. Si sobra igual o más que el divisor, todavía puedes repartir otra ronda.",
    questions: [
      q(
        "remainder-1",
        "En 17 ÷ 5, ¿cuál es el dividendo?",
        "17",
        ["5", "3"],
        "17 es la cantidad que vamos a repartir: el dividendo.",
      ),
      q(
        "remainder-2",
        "En 17 ÷ 5, ¿cuál es el divisor?",
        "5",
        ["17", "2"],
        "Dividimos entre 5: ese es el divisor.",
      ),
      q(
        "remainder-3",
        "17 ÷ 5 da 3 y sobran 2. ¿Cuál es el cociente?",
        "3",
        ["2", "17"],
        "El cociente es 3: lo que toca a cada uno. El 2 es el residuo.",
      ),
      q(
        "remainder-4",
        "23 ÷ 4 da 5. ¿Cuánto sobra?",
        "3",
        ["5", "4"],
        "4 × 5 = 20. Resta 23 − 20 = 3. El residuo es 3, menor que 4.",
      ),
      q(
        "remainder-5",
        "¿Cuál división es exacta, sin residuo?",
        "24 ÷ 6",
        ["25 ÷ 6", "26 ÷ 6"],
        "6 × 4 = 24. En 24 ÷ 6 no sobra nada: residuo 0.",
      ),
      q(
        "remainder-6",
        "Leo dice: 19 ÷ 4 da 3 y sobran 7. ¿Qué falta?",
        "Repartir otra ronda: da 4 y sobran 3",
        ["Dejarlo así, porque 4 × 3 + 7 = 19", "Cambiar el divisor a 7"],
        "Sobran 7, que alcanzan para dar uno más a cada uno de los 4. Ahora toca a 4 y sobran 3. El residuo debe ser menor que 4.",
      ),
      q(
        "remainder-7",
        "¿Cómo compruebas 29 ÷ 6 = 4 y sobran 5?",
        "6 × 4 + 5 = 29",
        ["6 + 4 + 5 = 29", "29 × 6 + 5 = 4"],
        "Multiplica divisor por cociente y suma el residuo: 24 + 5 = 29.",
      ),
      q(
        "remainder-8",
        "En 85 ÷ 4, ¿cuáles son el cociente y el residuo?",
        "Cociente 21, residuo 1",
        ["Cociente 20, residuo 5", "Cociente 21, residuo 0"],
        "4 cabe 2 veces en 8; resta 8 − 8 = 0 y baja el 5. Cabe 1 vez y sobra 1. Cociente 21. Comprueba: 4 × 21 + 1 = 85.",
      ),
    ],
  },
  {
    id: "sharing",
    title: "Resuelvo problemas de reparto",
    pages: "20–22",
    goal: "Lee qué tienes, cómo lo repartes y qué te preguntan.",
    steps: [
      "Busca la cantidad total y el número de grupos, o cuántos van en cada grupo.",
      "Divide. Anota qué significa el cociente y qué significa el residuo.",
      "Vuelve a leer la pregunta: puede pedir cuánto toca, cuánto sobra o cuántos recipientes necesitas en total.",
    ],
    example: [
      "Hay 23 lápices. Caben 5 en cada caja.",
      "23 ÷ 5 da 4 y sobran 3: llenas 4 cajas y quedan 3 lápices.",
      "Para guardar TODOS los lápices, necesitas una caja más: 5 cajas.",
    ],
    remember:
      "No basta con hacer la cuenta: responde lo que pide el problema. Si son objetos que no se cortan, deja el sobrante como residuo.",
    questions: [
      q(
        "sharing-1",
        "Reparte 24 colores entre 6 niños por igual. ¿Cuántos recibe cada uno?",
        "4 colores",
        ["6 colores", "18 colores"],
        "24 ÷ 6 = 4. Comprueba: 6 niños con 4 colores cada uno tienen 24 colores.",
      ),
      q(
        "sharing-2",
        "Reparte 17 canicas entre 5 niñas sin partirlas. ¿Cuántas recibe cada una y cuántas sobran?",
        "3 cada una y sobran 2",
        ["2 cada una y sobran 3", "4 cada una y no sobra nada"],
        "5 × 3 = 15. De 17 quedan 2. Cada una recibe 3 canicas y sobran 2.",
      ),
      q(
        "sharing-3",
        "Tienes 28 galletas. Pones 4 en cada bolsa. ¿Cuántas bolsas llenas?",
        "7 bolsas",
        ["4 bolsas", "24 bolsas"],
        "28 ÷ 4 = 7. Aquí el cociente cuenta bolsas: 7 bolsas con 4 galletas hacen 28.",
      ),
      q(
        "sharing-4",
        "Hay 23 lápices y caben 5 en cada caja. ¿Cuántas cajas necesitas para guardarlos TODOS?",
        "5 cajas",
        ["4 cajas", "3 cajas"],
        "23 ÷ 5 da 4 y sobran 3. Llenas 4 cajas y necesitas otra para los 3 lápices restantes: 5 cajas.",
      ),
      q(
        "sharing-5",
        "Hay 26 estampas. Cada paquete lleva 6. ¿Cuántos paquetes COMPLETOS puedes hacer?",
        "4 paquetes",
        ["5 paquetes", "2 paquetes"],
        "6 × 4 = 24. Haces 4 paquetes completos y sobran 2 estampas. No alcanza para completar otro.",
      ),
      q(
        "sharing-6",
        "Tienes 35 cuentas y haces 8 pulseras con la misma cantidad. ¿Cuántas cuentas sobran?",
        "3 cuentas",
        ["4 cuentas", "8 cuentas"],
        "35 ÷ 8 da 4 y sobran 3, porque 8 × 4 = 32 y 35 − 32 = 3. Preguntan por el sobrante.",
      ),
      q(
        "sharing-7",
        "Cuatro mesas tienen 6 libros cada una. ¿Cuántos libros hay en total?",
        "24 libros",
        ["10 libros", "2 libros"],
        "Aquí juntamos grupos, no repartimos: 4 × 6 = 24 libros.",
      ),
      q(
        "sharing-8",
        "Hay 3 fichas para repartir entre 5 niños, sin partirlas y dando lo mismo a todos. ¿Qué pasa?",
        "Toca a 0 y sobran 3",
        ["Toca a 1 y sobran 2", "Toca a 3 y sobran 0"],
        "No alcanza para dar una a cada niño: necesitarías 5. El cociente es 0 y el residuo es 3.",
      ),
    ],
  },
].map((t) => ({
  ...t,
  questions: t.questions.map((question) => ({ ...question, studyTopic: t.id })),
}));

export const allMathTopics = [...mathTopics, ...bookTopics];
export const mathPool = mathTopics.flatMap((t) => t.questions);
// Two from each topic, including a sum and a subtraction in every mixed exam.
export function mathExamQuestions(): Question[] {
  return shuffle(
    mathTopics.flatMap((t) =>
      t.id === "fractions"
        ? [
            shuffle(t.questions.filter((q) => q.prompt.includes(" + ")))[0],
            shuffle(t.questions.filter((q) => q.prompt.includes(" − ")))[0],
          ]
        : shuffle(t.questions).slice(0, 2),
    ),
  );
}
export function pendingMathErrors(sessions: LearningSession[]): Question[] {
  const pending = new Map<string, Question>();
  const events = sessions
    .filter((s) => s.subject === "math" && s.mode.startsWith("math-study"))
    .flatMap((s) =>
      s.attempts
        .filter((a) => !a.retry)
        .map((a) => ({ a, q: s.questions.find((q) => q.id === a.questionId) })),
    )
    .sort((x, y) => x.a.at.localeCompare(y.a.at));
  for (const { a, q } of events) {
    if (!q?.studyTopic) continue;
    const key = q.reviewOf ?? q.id;
    if (a.correct && !a.assisted) pending.delete(key);
    else if (!a.correct) pending.set(key, { ...q, reviewOf: key });
  }
  return [...pending.values()];
}
export function mathReviewQuestions(sessions: LearningSession[]): Question[] {
  const used = new Set<string>();
  return pendingMathErrors(sessions)
    .slice(0, 6)
    .map((missed) => {
      const fresh =
        shuffle(
          allMathTopics
            .flatMap((t) => t.questions)
            .filter(
              (q) =>
                q.studyTopic === missed.studyTopic &&
                q.id !== missed.id &&
                !used.has(q.id),
            ),
        )[0] ?? missed;
      used.add(fresh.id);
      return {
        ...fresh,
        id: `review-${missed.reviewOf ?? missed.id}`,
        reviewOf: missed.reviewOf ?? missed.id,
        retry: false,
        helpUsed: false,
      };
    });
}
