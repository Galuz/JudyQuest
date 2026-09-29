import type { Question } from "../domain/types";
import type { MathTopic } from "./math-exam";

// Original practice aligned to the supplied textbook photos, pages 12–22.
const question = (
  id: string,
  prompt: string,
  correct: string,
  others: string[],
  explanation: string,
  extra: Partial<Question> = {},
): Question => ({
  id: `book-math-${id}`,
  skill: `book-${id.split("-")[0]}`,
  kind: "choice",
  prompt,
  correct,
  choices: [correct, ...others],
  explanation,
  ...extra,
});

export const bookTopics: MathTopic[] = [
  {
    id: "book-digits",
    title: "¿Cuántas cifras tendrá?",
    pages: "18–21",
    goal: "Descubre el tamaño del resultado sin hacer toda la división.",
    steps: [
      "Una cifra es un dígito: 7 tiene una; 35 tiene dos; 128 tiene tres. Los números del 100 al 999 tienen tres cifras.",
      "Multiplica el divisor por 10, luego por 100 y después por 1000. Para multiplicar un entero, añade uno, dos o tres ceros.",
      "Detente en el primer producto que sea MAYOR que el dividendo. Si es igual, sigue al siguiente.",
      "Si te pasaste al multiplicar por 10, el cociente tiene una cifra; por 100, dos; por 1000, tres. Cuenta los ceros del multiplicador que te hizo pasar.",
    ],
    example: [
      "1024 ÷ 8: 8 × 10 = 80, todavía no nos pasamos.",
      "8 × 100 = 800, todavía no nos pasamos.",
      "8 × 1000 = 8000, ahora sí. El cociente tiene 3 cifras. Al comprobar: 1024 ÷ 8 = 128.",
    ],
    remember:
      "No cuentes las cifras del dividendo. Busca cuándo el producto se pasa. Escribe los productos en tu cuaderno.",
    questions: [
      question(
        "digits-1",
        "Sin hacer toda la división: ¿cuántas cifras tiene el cociente de 936 ÷ 8?",
        "3 cifras",
        ["2 cifras", "4 cifras"],
        "8 × 100 = 800, todavía no se pasa de 936. 8 × 1000 = 8000, sí se pasa. El cociente tiene 3 cifras.",
      ),
      question(
        "digits-2",
        "¿Cuántas cifras tiene el cociente de 1560 ÷ 24?",
        "2 cifras",
        ["1 cifra", "3 cifras"],
        "24 × 10 = 240. 24 × 100 = 2400: este es el primer producto mayor que 1560. El cociente tiene 2 cifras.",
      ),
      question(
        "digits-3",
        "¿Cuántas cifras tiene el cociente de 2400 ÷ 24?",
        "3 cifras",
        ["2 cifras", "4 cifras"],
        "24 × 100 = 2400 es IGUAL al dividendo: aún no nos pasamos. 24 × 1000 = 24000 sí es mayor. El cociente es 100 y tiene 3 cifras.",
      ),
      question(
        "digits-4",
        "Sin resolver toda la división, 848 ÷ 3 dará un resultado…",
        "Menor que 300",
        ["Mayor que 300", "Igual a 300"],
        "3 × 300 = 900. Como solo tenemos 848, no alcanza para que toque a 300. El cociente será menor que 300.",
      ),
    ],
  },
  {
    id: "book-wholes",
    title: "Más de un entero y simplificar",
    pages: "13–17",
    goal: "Reconoce enteros completos y escribe la misma cantidad con números más pequeños.",
    steps: [
      "Si arriba y abajo hay el mismo número, tienes un entero: 4/4 = 1.",
      "Si arriba hay más, la cantidad pasa de un entero. Por ejemplo, 6/4 contiene 4/4 y quedan 2/4.",
      "Simplificar es dividir el número de arriba y el de abajo entre el mismo número, sin sobrantes. La cantidad no cambia.",
    ],
    example: [
      "6/4 son un pastel completo y medio pastel más.",
      "Para simplificar 6/4: 6 ÷ 2 = 3 y 4 ÷ 2 = 2. Entonces 6/4 = 3/2.",
      "Para 20/10: cada entero tiene 10 partes. Hay dos grupos de 10; por eso 20/10 = 2.",
    ],
    bars: [
      { numerator: 4, denominator: 4 },
      { numerator: 2, denominator: 4 },
    ],
    remember:
      "Los dos pasteles son del mismo tamaño. Simplificar no significa quitar cantidad: divide arriba y abajo por el mismo número.",
    questions: [
      question(
        "wholes-1",
        "¿Cuánto representa 3/2?",
        "Un entero y un medio",
        ["Solo un medio", "Tres enteros"],
        "2/2 forman un entero. De los 3 medios queda 1/2 más: un entero y un medio.",
        {
          fractionBars: [
            { numerator: 2, denominator: 2 },
            { numerator: 1, denominator: 2 },
          ],
        },
      ),
      question(
        "wholes-2",
        "Simplifica 6/8 dividiendo arriba y abajo entre 2.",
        "3/4",
        ["3/8", "6/4"],
        "6 ÷ 2 = 3 y 8 ÷ 2 = 4. Divide ambos números: 6/8 = 3/4.",
      ),
      question(
        "wholes-3",
        "¿Cuántos enteros son 15/5?",
        "3",
        ["5", "15"],
        "Cada entero contiene 5 quintos. 15 ÷ 5 = 3: son 3 enteros.",
      ),
      question(
        "wholes-4",
        "Simplifica 10/15 dividiendo arriba y abajo entre 5.",
        "2/3",
        ["2/15", "5/10"],
        "10 ÷ 5 = 2 y 15 ÷ 5 = 3. Entonces 10/15 = 2/3; conservamos la misma cantidad.",
      ),
    ],
  },
  {
    id: "book-operations",
    title: "Completo las cuentas del libro",
    pages: "15–16",
    goal: "Usa partes del mismo tamaño para sumar o restar hasta tres fracciones.",
    steps: [
      "Mira el denominador más grande. Si está en las tablas de los otros, úsalo para todos. Por ejemplo, 12 sirve para 3, 4 y 12.",
      "Multiplica arriba y abajo de cada fracción para llegar a ese denominador. 1/3 = 4/12 y 1/4 = 3/12.",
      "Cuando todos los números de abajo son iguales, suma o resta los de arriba de izquierda a derecha. El de abajo se queda igual.",
      "En tu cuaderno escribe primero las equivalencias y luego la cuenta. Si puedes, simplifica el resultado.",
    ],
    example: [
      "1/3 + 1/4 + 1/12 = 4/12 + 3/12 + 1/12.",
      "Arriba: 4 + 3 + 1 = 8. Abajo queda 12: obtenemos 8/12.",
      "Simplificamos entre 4: 8 ÷ 4 = 2 y 12 ÷ 4 = 3. Resultado: 2/3.",
    ],
    remember:
      "El denominador mayor solo sirve si es múltiplo de todos los demás. Si no, busca el primer número que aparezca en sus tablas. Nunca sumes los denominadores.",
    questions: [
      question(
        "operations-1",
        "Completa el paso: 2/3 = ¿cuántos doceavos?",
        "8/12",
        ["2/12", "6/12"],
        "De 3 a 12 multiplicas por 4. Haz lo mismo arriba: 2 × 4 = 8. Por eso 2/3 = 8/12.",
      ),
      question(
        "operations-2",
        "Resuelve en papel: 1/3 + 1/4 + 1/12.",
        "2/3",
        ["3/19", "1/2"],
        "Usa doceavos: 4/12 + 3/12 + 1/12 = 8/12. Simplifica arriba y abajo entre 4: 2/3.",
      ),
      question(
        "operations-3",
        "Resuelve en papel: 3/4 − 1/8 − 1/4.",
        "3/8",
        ["1/8", "5/8"],
        "Usa octavos: 6/8 − 1/8 − 2/8. Arriba: 6 − 1 − 2 = 3. Resultado: 3/8.",
      ),
      question(
        "operations-4",
        "¿Qué signo falta? 1/2 □ 1/4 = 1/4.",
        "Restar (−)",
        ["Sumar (+)", "Las dos opciones sirven"],
        "1/2 = 2/4. Para pasar de 2/4 a 1/4, quitamos 1/4. El signo es restar: 2/4 − 1/4 = 1/4.",
      ),
    ],
  },
  {
    id: "book-problems",
    title: "Fracciones en problemas",
    pages: "12–17, 21",
    goal: "Decide si debes juntar cantidades, quitar o buscar lo que falta.",
    steps: [
      "Lee la pregunta y di con tus palabras qué buscas: el total, lo que sobra o lo que falta.",
      "Si juntas cantidades, suma. Si quitas o buscas una diferencia, resta. Escribe primero la operación.",
      "Usa fracciones con el mismo denominador. Resuelve un paso a la vez y escribe la unidad: litros, kilómetros o parte del entero.",
    ],
    example: [
      "Hay 3/4 de litro de agua y añadimos 1/2 de litro. Juntamos: 3/4 + 2/4 = 5/4 de litro.",
      "Servimos dos vasos de 1/4 de litro: quitamos 2/4.",
      "Quedan 5/4 − 2/4 = 3/4 de litro. Primero juntamos y después quitamos.",
    ],
    remember:
      "Un entero también se puede escribir como 6/6, 8/8 o la fracción que necesites. Para saber qué parte falta, resta del entero lo que ya usaste.",
    questions: [
      question(
        "problems-1",
        "Una cinta mide 1 metro. Usas 1/2 y luego 1/4 de metro. ¿Cuánto queda?",
        "1/4 de metro",
        ["3/4 de metro", "1/2 de metro"],
        "Usaste 2/4 + 1/4 = 3/4. La cinta completa es 4/4. Queda 4/4 − 3/4 = 1/4 de metro.",
      ),
      question(
        "problems-2",
        "Caminas 6/5 de kilómetro y después 8/10 de kilómetro. ¿Cuánto caminas en total?",
        "2 kilómetros",
        ["14/15 de kilómetro", "20 kilómetros"],
        "Junta las distancias: 6/5 = 12/10. Luego 12/10 + 8/10 = 20/10. Cada 10 décimos es un kilómetro: son 2 kilómetros.",
      ),
      question(
        "problems-3",
        "Mezclas 3/4 de litro de agua con 1/2 de litro de jugo. Sirves dos vasos de 1/4 de litro cada uno. ¿Cuánto queda?",
        "3/4 de litro",
        ["5/4 de litro", "1/4 de litro"],
        "Primero: 3/4 + 2/4 = 5/4. Dos vasos sacan 1/4 + 1/4 = 2/4. Quedan 5/4 − 2/4 = 3/4 de litro.",
      ),
      question(
        "problems-4",
        "Tienes 240 estampas. Caben 25 en cada hoja. ¿Cuántas hojas necesitas para guardarlas TODAS?",
        "10 hojas",
        ["9 hojas", "24 hojas"],
        "25 × 9 = 225. Faltan 15 estampas por guardar. Necesitas una hoja más, aunque no quede llena: 10 hojas.",
      ),
    ],
  },
  {
    id: "book-house",
    title: "Las partes en la casita",
    pages: "22",
    goal: "Encuentra dividendo, divisor, cociente y residuo en el dibujo.",
    steps: [
      "Dentro de la casita va el dividendo: lo que repartes.",
      "A la izquierda, afuera, va el divisor: entre cuántos repartes.",
      "Arriba va el cociente: cuánto toca. Debajo va el residuo: lo que sobra.",
    ],
    example: [
      "23 ÷ 5 da 4 y sobran 3.",
      "Repartimos 23 entre 5. Toca a 4 y quedan 3 sin repartir.",
      "Comprobamos: 5 × 4 + 3 = 23.",
    ],
    divisionDiagram: { dividend: 23, divisor: 5, quotient: 4, remainder: 3 },
    remember:
      "El residuo debe ser menor que el divisor. Mira el dibujo y explica en voz alta qué significa cada número.",
    questions: [
      question(
        "house-1",
        "En esta casita, ¿qué nombre tiene el 23 que está dentro?",
        "Dividendo",
        ["Divisor", "Cociente"],
        "El 23 está dentro: es la cantidad que repartimos, el dividendo.",
      ),
      question(
        "house-2",
        "En esta casita, ¿qué nombre tiene el 5 que está a la izquierda?",
        "Divisor",
        ["Residuo", "Dividendo"],
        "El 5 está afuera, a la izquierda: dividimos entre 5. Es el divisor.",
      ),
      question(
        "house-3",
        "En esta casita, ¿qué nombre tiene el 4 que está arriba?",
        "Cociente",
        ["Dividendo", "Residuo"],
        "El 4 de arriba es lo que toca a cada uno: el cociente.",
      ),
      question(
        "house-4",
        "En esta casita, ¿qué nombre tiene el 3 que queda debajo?",
        "Residuo",
        ["Divisor", "Cociente"],
        "El 3 que queda debajo es lo que sobra: el residuo. Comprobamos: 5 × 4 + 3 = 23.",
      ),
    ].map((q) => ({
      ...q,
      divisionDiagram: { dividend: 23, divisor: 5, quotient: 4, remainder: 3 },
    })),
  },
].map((topic) => ({
  ...topic,
  questions: topic.questions.map((q) => ({ ...q, studyTopic: topic.id })),
}));
