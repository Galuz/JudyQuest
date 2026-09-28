// Keep division expressions together and make the school-taught obelus legible.
// A slash in a fraction is fraction notation, not a division sign to replace.
export function MathText({ children }: { children: string }) {
  return (
    <>
      {children.split(/(\d+\s*÷\s*\d+|÷)/g).map((part, i) => {
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
