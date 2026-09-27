import { describe, it, expect } from "vitest";
import { grade, mathQuestions, weekId } from "./engines";
import {
  passages,
  lessons,
  proverbs,
  punctuation,
  words,
} from "../content/spanish";
describe("aprendizaje", () => {
  it("cubre habilidades lectoras y todos los temas con respuestas verificables", () => {
    const all = [
      ...passages.flatMap((p) => p.questions),
      ...proverbs,
      ...punctuation,
    ];
    for (const skill of [
      "LITERAL",
      "SEQUENCE",
      "MAIN_IDEA",
      "DETAILS",
      "CAUSE_EFFECT",
      "INFERENCE",
      "CONTEXT_VOCABULARY",
      "EVIDENCE",
      "MORAL",
      "PROVERB_MEANING",
      "PARAGRAPHS",
      "SEMICOLON",
    ]) {
      expect(all.some((q) => q.skill === skill)).toBe(true);
      expect(lessons.some((l) => l.skill === skill)).toBe(true);
    }
    for (const p of passages) {
      expect(p.questions.length).toBeGreaterThanOrEqual(4);
      for (const q of p.questions) {
        if (q.kind === "choice") expect(q.choices).toContain(q.correct);
        if (q.evidence) expect(p.paragraphs.join(" ")).toContain(q.evidence);
      }
    }
    expect(new Set(all.map((q) => q.id)).size).toBe(all.length);
  });
  it("separa tildes y confusión b/v en dictado", () => {
    const q = {
      id: "x",
      skill: "DICTATION",
      kind: "word" as const,
      prompt: "",
      correct: "bebé",
      explanation: "",
    };
    expect(grade(q, " BEBÉ ").correct).toBe(true);
    expect(grade(q, "bebe").errorType).toBe("tilde");
    expect(grade(q, "vebé").errorType).toBe("b/v");
    expect(grade(q, "perro").errorType).toBe("ortografía");
  });
  it("cada palabra del banco puede reconstruirse a partir de sus huecos", () => {
    expect(words).toHaveLength(24);
    for (const w of words) {
      let i = 0;
      expect(
        w.completion.prompt.replace(/_/g, () => w.completion.answers[i++]),
      ).toBe(w.word);
    }
  });
  it("genera tablas sin duplicados y rechaza respuestas numéricas ambiguas", () => {
    for (let t = 0; t <= 10; t++) {
      const qs = mathQuestions(t);
      expect(qs).toHaveLength(8);
      expect(new Set(qs.map((q) => q.id)).size).toBe(8);
      for (const q of qs) {
        expect(Number(q.correct)).toBe(q.a! * q.b!);
        if (t) expect(q.a).toBe(t);
        expect(grade(q, "").correct).toBe(false);
      }
    }
  });
  it("calcula semanas en Ciudad de México al cruzar lunes y año", () => {
    expect(weekId(new Date("2026-09-28T05:59:59Z"))).toBe("2026-09-21");
    expect(weekId(new Date("2026-09-28T06:00:00Z"))).toBe("2026-09-28");
    expect(weekId(new Date("2027-01-01T12:00:00Z"))).toBe("2026-12-28");
  });
});
