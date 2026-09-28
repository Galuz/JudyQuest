import "fake-indexeddb/auto";
import { describe, expect, it } from "vitest";
import {
  mathTopics,
  mathPool,
  mathExamQuestions,
  pendingMathErrors,
  mathReviewQuestions,
  readableMathQuestion,
  comparisonLabel,
} from "./math-exam";
import { grade } from "../domain/engines";
import { createRepositories, JudyDatabase } from "../data/repositories";
import type { LearningSession, Question } from "../domain/types";

const value = (s: string) => {
  const [n, d = 1] = s.split("/").map(Number);
  return n / d;
};
const exampleSession = (
  q: Question,
  correct: boolean,
  at: string,
  assisted = false,
): LearningSession => ({
  id: at,
  subject: "math",
  title: "Repaso",
  mode: "math-study-review",
  phase: "done",
  createdAt: at,
  index: 1,
  feedbackPending: false,
  questions: [q],
  attempts: [
    {
      questionId: q.id,
      skill: q.skill,
      answer: correct ? q.correct : "otra",
      correct,
      assisted,
      retry: !!q.retry,
      responseMs: 1000,
      at,
    },
  ],
});

describe("examen de Matemáticas", () => {
  it("adapta preguntas guardadas sin cambiar sus respuestas ni exigir símbolos", () => {
    for (const [symbol, label, n] of [
      ["<", "menor que", 1],
      ["=", "igual a", 2],
      [">", "mayor que", 3],
    ] as const) {
      const old: Question = {
        id: "old-compare",
        skill: "compare",
        studyTopic: "compare",
        kind: "choice",
        prompt: "¿Qué signo?",
        correct: symbol,
        choices: ["<", "=", ">"],
        explanation: `Usa ${symbol}`,
        fractionBars: [
          { numerator: n, denominator: 4 },
          { numerator: 2, denominator: 4 },
        ],
      };
      const display = readableMathQuestion(old);
      expect(display.explanation).toContain(`${n}/4 es ${label} 2/4`);
      expect(display.explanation).not.toMatch(/[<>=]/);
      expect(display.prompt).not.toContain("signo");
      expect(display.correct).toBe(symbol);
      expect(display.choices).toEqual(old.choices);
      expect(comparisonLabel(display.correct)).toBe(label);
      expect(grade(old, display.correct).correct).toBe(true);
      expect(old.prompt).toBe("¿Qué signo?");
    }
  });
  it("cubre ocho temas con 64 preguntas inequívocas y dibujos de partes iguales", () => {
    expect(mathTopics).toHaveLength(8);
    expect(mathPool).toHaveLength(64);
    expect(new Set(mathPool.map((q) => q.id)).size).toBe(64);
    for (const t of mathTopics) {
      expect(t.questions).toHaveLength(8);
      for (const q of t.questions) {
        expect(q.studyTopic).toBe(t.id);
        expect(new Set(q.choices).size).toBe(3);
        expect(q.choices!.filter((c) => grade(q, c).correct)).toEqual([
          q.correct,
        ]);
        for (const b of q.fractionBars ?? []) {
          expect(Number.isInteger(b.numerator)).toBe(true);
          expect(b.numerator).toBeGreaterThanOrEqual(0);
          expect(b.numerator).toBeLessThanOrEqual(b.denominator);
          expect(b.denominator).toBeGreaterThan(0);
        }
      }
    }
  });
  it("verifica aritmética y que ningún distractor sea otra respuesta equivalente", () => {
    for (const q of mathPool) {
      const fractions = [...q.prompt.matchAll(/(\d+)\/(\d+)/g)].map(
        (m) => Number(m[1]) / Number(m[2]),
      );
      if (q.studyTopic === "equivalent") {
        expect(
          q.choices!.filter((c) => Math.abs(value(c) - fractions[0]) < 1e-10),
        ).toEqual([q.correct]);
      }
      if (q.studyTopic === "compare") {
        const fractions = q.fractionBars!.map(
          (f) => f.numerator / f.denominator,
        );
        expect(q.correct).toBe(
          Math.abs(fractions[0] - fractions[1]) < 1e-10
            ? "igual a"
            : fractions[0] > fractions[1]
              ? "mayor que"
              : "menor que",
        );
      }
      if (q.studyTopic === "fractions") {
        const expected = q.prompt.includes(" − ")
          ? fractions[0] - fractions[1]
          : fractions[0] + fractions[1];
        expect(
          q.choices!.filter((c) => Math.abs(value(c) - expected) < 1e-10),
        ).toEqual([q.correct]);
      }
      if (["multiply", "divide"].includes(q.studyTopic!)) {
        const [a, b] = q.prompt.match(/\d+/g)!.map(Number);
        expect(Number(q.correct)).toBe(
          q.studyTopic === "multiply" ? a * b : a / b,
        );
      }
    }
    expect(mathPool.find((q) => q.prompt.startsWith("408 ÷"))?.correct).toBe(
      "102",
    );
    expect(
      mathPool.find((q) => q.id === "exam-math-remainder-8")?.correct,
    ).toBe("Cociente 21, residuo 1");
    expect(mathPool.find((q) => q.id === "exam-math-sharing-4")?.correct).toBe(
      "5 cajas",
    );
    expect(mathPool.find((q) => q.id === "exam-math-sharing-5")?.correct).toBe(
      "4 paquetes",
    );
    expect(mathPool.find((q) => q.id === "exam-math-sharing-8")?.correct).toBe(
      "Toca a 0 y sobran 3",
    );
  });
  it("cada repaso mezcla 16 preguntas con todos los temas, una suma y una resta", () => {
    for (let i = 0; i < 30; i++) {
      const exam = mathExamQuestions();
      expect(exam).toHaveLength(16);
      expect(new Set(exam.map((q) => q.id)).size).toBe(16);
      for (const t of mathTopics)
        expect(exam.filter((q) => q.studyTopic === t.id)).toHaveLength(2);
      expect(
        exam.some(
          (q) => q.studyTopic === "fractions" && q.prompt.includes(" + "),
        ),
      ).toBe(true);
      expect(
        exam.some(
          (q) => q.studyTopic === "fractions" && q.prompt.includes(" − "),
        ),
      ).toBe(true);
    }
  });
  it("repasa errores con otros ejemplos y solo los resuelve con un acierto independiente", () => {
    const q = mathTopics[0].questions[0];
    const missed = exampleSession(q, false, "2026-09-28T20:00:00Z");
    const retry = exampleSession(
      { ...q, id: q.id + "-retry", retry: true },
      true,
      "2026-09-28T20:01:00Z",
    );
    const [review] = mathReviewQuestions([missed, retry]);
    expect(review.prompt).not.toBe(q.prompt);
    expect(review.reviewOf).toBe(q.id);
    const helped = exampleSession(review, true, "2026-09-28T20:02:00Z", true);
    expect(pendingMathErrors([missed, retry, helped])).toHaveLength(1);
    const independent = exampleSession(review, true, "2026-09-28T20:03:00Z");
    expect(
      pendingMathErrors([independent, missed, helped, retry]),
    ).toHaveLength(0);
    expect(pendingMathErrors([{ ...missed, subject: "spanish" }])).toHaveLength(
      0,
    );
  });
  it("guarda las ayudas, los dibujos y el avance al reabrir; no concede premios de Español", async () => {
    const name = `math-exam-${crypto.randomUUID()}`;
    const db = new JudyDatabase(name);
    const r = createRepositories(db);
    const questions = mathTopics[0].questions;
    const s: LearningSession = {
      ...exampleSession(questions[0], true, "2026-09-28T20:00:00Z"),
      id: "math",
      mode: "math-study-topic:parts",
      phase: "running",
      index: 0,
      attempts: [],
      questions,
    };
    let reopened: JudyDatabase | undefined;
    try {
      await r.sessions.create(s);
      await r.useHelp(s.id, 0);
      await r.answer(s.id, 0, questions[0].correct, 1000);
      await r.next(s.id);
      db.close();
      reopened = new JudyDatabase(name);
      const after = createRepositories(reopened);
      const restored = await after.sessions.get(s.id);
      expect(restored?.index).toBe(1);
      expect(restored?.attempts[0].assisted).toBe(true);
      expect(restored?.questions[3].fractionBars).toEqual([
        { numerator: 3, denominator: 8 },
      ]);
      for (let i = 1; i < questions.length; i++) {
        await after.answer(s.id, i, questions[i].correct, 1000);
        await after.next(s.id);
      }
      expect((await after.sessions.get(s.id))?.phase).toBe("done");
      expect(await after.rewards.all()).toEqual([]);
    } finally {
      db.close();
      if (reopened) await reopened.delete();
      else await db.delete();
    }
  });
});
