import type { Question } from "../domain/types";

export function DivisionDiagram({
  dividend,
  divisor,
  quotient,
  remainder,
  labels = false,
}: NonNullable<Question["divisionDiagram"]> & { labels?: boolean }) {
  return (
    <figure className="division-house">
      <div
        className="division-house-grid"
        role="img"
        aria-label={`Casita: ${dividend} dentro; ${divisor} a la izquierda; ${quotient} arriba; ${remainder} debajo.`}
      >
        <span className="house-quotient">{quotient}</span>
        <span className="house-divisor">{divisor}</span>
        <span className="house-dividend">{dividend}</span>
        <span className="house-remainder">{remainder}</span>
      </div>
      <figcaption>
        {labels
          ? `Dentro: dividendo ${dividend}. Izquierda: divisor ${divisor}. Arriba: cociente ${quotient}. Debajo: residuo ${remainder}.`
          : "Observa la posición de cada número."}
      </figcaption>
    </figure>
  );
}
