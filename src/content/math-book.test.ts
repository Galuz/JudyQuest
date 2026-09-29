import "fake-indexeddb/auto";
import { describe, expect, it } from "vitest";
import { bookTopics } from "./math-book";
import {
  mathTopics,
  mathExamQuestions,
  mathReviewQuestions,
  pendingMathErrors,
} from "./math-exam";
import { grade } from "../domain/engines";
import { createRepositories, JudyDatabase } from "../data/repositories";
import type { LearningSession } from "../domain/types";

const session = (id: string, topic = mathTopics[0]): LearningSession => ({
  id,
  subject: "math",
  title: topic.title,
  mode: `math-study-book:${topic.id}`,
  questions: structuredClone(topic.questions),
  attempts: [],
  index: 0,
  createdAt: "2026-09-28T23:00:00Z",
  phase: "running",
  feedbackPending: false,
});

describe("complemento del libro", () => {
  it("mantiene el temario original y ofrece respuestas inequívocas en los nuevos ejercicios", () => {
    expect(mathTopics).toHaveLength(8);
    expect(mathExamQuestions()).toHaveLength(16);
    const questions = bookTopics.flatMap((t) => t.questions);
    expect(questions).toHaveLength(20);
    const ids = [...mathTopics, ...bookTopics].flatMap((t) =>
      t.questions.map((q) => q.id),
    );
    expect(new Set(ids).size).toBe(ids.length);
    for (const q of questions) {
      expect(q.choices?.filter((a) => grade(q, a).correct)).toEqual([
        q.correct,
      ]);
      if (q.divisionDiagram) {
        const d = q.divisionDiagram;
        expect(d.divisor * d.quotient + d.remainder).toBe(d.dividend);
        expect(d.remainder).toBeLessThan(d.divisor);
      }
      for (const b of q.fractionBars ?? [])
        expect(b.numerator).toBeLessThanOrEqual(b.denominator);
    }
    // Independent checks include the power-of-ten boundary and multi-step problems.
    const expected = [
      `${String(Math.floor(936 / 8)).length} cifras`,
      `${String(Math.floor(1560 / 24)).length} cifras`,
      `${String(2400 / 24).length} cifras`,
      "Menor que 300",
      "Un entero y un medio",
      "3/4",
      String(15 / 5),
      "2/3",
      "8/12",
      "2/3",
      "3/8",
      "Restar (−)",
      "1/4 de metro",
      "2 kilómetros",
      "3/4 de litro",
      `${Math.ceil(240 / 25)} hojas`,
      "Dividendo",
      "Divisor",
      "Cociente",
      "Residuo",
    ];
    expect(questions.map((q) => q.correct)).toEqual(expected);
    expect(1 / 3 + 1 / 4 + 1 / 12).toBeCloseTo(2 / 3);
    expect(3 / 4 - 1 / 8 - 1 / 4).toBeCloseTo(3 / 8);
    expect(3 / 4 + 1 / 2 - 2 * (1 / 4)).toBeCloseTo(3 / 4);
  });
  it("incluye los errores nuevos en el refuerzo y reconoce su recuperación", () => {
    const s = session("book", bookTopics[0]),
      q = s.questions[0];
    s.attempts = [
      {
        questionId: q.id,
        skill: q.skill,
        answer: "otra",
        correct: false,
        responseMs: 1000,
        at: s.createdAt,
        retry: false,
      },
    ];
    const review = mathReviewQuestions([s]);
    expect(review).toHaveLength(1);
    expect(review[0].studyTopic).toBe("book-digits");
    expect(review[0].id).not.toBe(q.id);
    expect(review[0].reviewOf).toBe(q.id);
    const recovered = {
      ...session("review"),
      questions: review,
      attempts: [
        {
          ...s.attempts[0],
          questionId: review[0].id,
          answer: review[0].correct,
          correct: true,
          at: "2026-09-28T23:10:00Z",
        },
      ],
    };
    expect(pendingMathErrors([s, recovered])).toHaveLength(0);
  });
  it("conserva una sesión original en curso al guardar y reabrir el complemento", async () => {
    const db = new JudyDatabase(`book-${crypto.randomUUID()}`),
      repo = createRepositories(db);
    const original = {
      ...session("original"),
      mode: "math-study-topic:parts",
      index: 2,
    };
    const extra = session("extra", bookTopics[4]);
    try {
      await repo.sessions.create(original);
      await repo.sessions.create(extra);
      await repo.useHelp(extra.id, 0);
      await repo.answer(extra.id, 0, extra.questions[0].correct, 1000);
      await repo.next(extra.id);
      db.close();
      await db.open();
      expect(await repo.sessions.get(original.id)).toEqual(original);
      const restored = await repo.sessions.get(extra.id);
      expect(restored?.index).toBe(1);
      expect(restored?.attempts[0].assisted).toBe(true);
      expect(restored?.questions[0].divisionDiagram).toEqual(
        extra.questions[0].divisionDiagram,
      );
      expect(await repo.rewards.all()).toEqual([]);
    } finally {
      await db.delete();
    }
  });
});
