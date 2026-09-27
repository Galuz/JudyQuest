import { describe, it, expect } from "vitest";
import { grade, mathQuestions, weekId } from "./engines";
import {
  passages,
  lessons,
  proverbs,
  punctuation,
  words,
  classroomWords,
  supplementalVWords,
  bvQuestions,
  dictationQuestions,
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
    expect(words).toHaveLength(34);
    expect(new Set(words.map((w) => w.word)).size).toBe(words.length);
    for (const w of words) {
      let i = 0;
      expect(
        w.completion.prompt.replace(/_/g, () => w.completion.answers[i++]),
      ).toBe(w.word);
    }
  });
  it("includes every confirmed notebook word in both full-list practice modes", () => {
    expect(classroomWords.map((w) => w.word)).toEqual([
      "bebamos",
      "cabían",
      "cabemos",
      "deberíamos",
      "habría",
      "sabiendo",
      "saben",
    ]);
    expect(supplementalVWords.map((w) => w.word)).toEqual([
      "vivir",
      "volver",
      "vamos",
      "venimos",
      "ventana",
      "vecino",
      "viajar",
    ]);
    expect(
      bvQuestions(classroomWords, 7)
        .map((q) => q.id)
        .sort(),
    ).toEqual(classroomWords.map((w) => `bv-${w.id}`).sort());
    const dictation = dictationQuestions(classroomWords, 7);
    expect(dictation.map((q) => q.correct).sort()).toEqual(
      classroomWords.map((w) => w.word).sort(),
    );
    for (const q of dictation) {
      expect(q.dictationSentence?.toLocaleLowerCase("es-MX")).toContain(
        q.correct,
      );
      expect(
        grade(q, ` ${q.correct.toLocaleUpperCase("es-MX")} `).correct,
      ).toBe(true);
    }
    for (const word of ["cabían", "deberíamos", "habría"]) {
      const q = dictation.find((q) => q.correct === word)!;
      expect(grade(q, word.replace("í", "i")).errorType).toBe("tilde");
      expect(grade(q, word.replace("b", "v")).errorType).toBe("b/v");
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
