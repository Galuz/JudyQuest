export function FractionNumber({
  numerator,
  denominator,
}: {
  numerator: string | number;
  denominator: string | number;
}) {
  return (
    <span
      className="fraction-number"
      role="img"
      aria-label={`${numerator} sobre ${denominator}`}
    >
      <span className="fraction-numerator" aria-hidden="true">
        {numerator}
      </span>
      <span className="fraction-denominator" aria-hidden="true">
        {denominator}
      </span>
    </span>
  );
}

// Use school notation for display while preserving stored questions and answers.
export function MathText({ children }: { children: string }) {
  return (
    <>
      {children.split(/(\d+\s*\/\s*\d+|\d+\s*÷\s*\d+|÷)/g).map((part, i) => {
        if (/^\d+\s*\/\s*\d+$/.test(part)) {
          const [numerator, denominator] = part.split("/");
          return (
            <FractionNumber
              key={i}
              numerator={numerator.trim()}
              denominator={denominator.trim()}
            />
          );
        }
        if (!part.includes("÷")) return part;
        const [left, right] = part.split("÷");
        return (
          <span className="division-expression" key={i}>
            {left.trim()}
            {left && " "}
            <span className="division-sign">÷</span>
            {right && " "}
            {right.trim()}
          </span>
        );
      })}
    </>
  );
}
