import type { Question } from "../domain/types";
import { comparisonLabel } from "../content/math-exam";

type Fraction = NonNullable<Question["fractionBars"]>[number];

export function FractionPie({ numerator, denominator }: Fraction) {
  const point = (part: number) => {
    const angle = (part / denominator) * Math.PI * 2 - Math.PI / 2;
    return `${50 + 46 * Math.cos(angle)},${50 + 46 * Math.sin(angle)}`;
  };
  return (
    <svg
      className="fraction-pie"
      viewBox="0 0 100 100"
      role="img"
      aria-label={`Pastel dividido en ${denominator} partes iguales; ${numerator} ${numerator === 1 ? "pintada" : "pintadas"}`}
    >
      {denominator === 1 ? (
        <circle cx="50" cy="50" r="46" className={numerator ? "painted" : ""} />
      ) : (
        Array.from({ length: denominator }, (_, i) => (
          <path
            key={i}
            className={i < numerator ? "painted" : ""}
            d={`M50,50 L${point(i)} A46,46 0 0,1 ${point(i + 1)} Z`}
          />
        ))
      )}
    </svg>
  );
}

export function FractionPies({
  bars,
}: {
  bars: NonNullable<Question["fractionBars"]>;
}) {
  return (
    <div className="fraction-pies">
      {bars.map((f, i) => (
        <figure key={i}>
          <FractionPie {...f} />
          <figcaption>
            {f.numerator} de {f.denominator} partes pintadas
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function FractionComparison({
  question,
  answer,
  disabled,
  onChange,
}: {
  question: Question;
  answer: string;
  disabled: boolean;
  onChange: (value: string) => void;
}) {
  const [left, right] = question.fractionBars!;
  const fraction = (f: Fraction) => `${f.numerator}/${f.denominator}`;
  return (
    <fieldset className="fraction-comparison">
      <legend>
        Elige las palabras para completar la frase de izquierda a derecha.
      </legend>
      <p id="comparison-instruction">
        Los dos pasteles tienen el mismo tamaño. Compara la cantidad pintada.
      </p>
      <div className="comparison-row">
        <figure>
          <figcaption className="comparison-number">
            {fraction(left)}
          </figcaption>
          <FractionPie {...left} />
        </figure>
        <label className="comparison-select">
          es
          <select
            aria-label={`Compara ${fraction(left)} con ${fraction(right)}: elige mayor que, menor que o igual a`}
            aria-describedby="comparison-instruction comparison-sentence"
            value={answer}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">Elige…</option>
            {question.choices?.map((value) => (
              <option key={value} value={value}>
                {comparisonLabel(value)}
              </option>
            ))}
          </select>
        </label>
        <figure>
          <figcaption className="comparison-number">
            {fraction(right)}
          </figcaption>
          <FractionPie {...right} />
        </figure>
      </div>
      <p
        id="comparison-sentence"
        className="comparison-sentence"
        aria-live="polite"
      >
        {fraction(left)} es{" "}
        <strong>{answer ? comparisonLabel(answer) : "…"}</strong>{" "}
        {fraction(right)}.
      </p>
    </fieldset>
  );
}
