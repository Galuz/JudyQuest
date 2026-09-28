import { describe, it, expect } from "vitest";
import {
  studyTopics,
  studyPool,
  studyExamQuestions,
  pendingStudyErrors,
  studyReviewQuestions,
} from "./exam-study";
import { bvQuestions, classroomWords, supplementalVWords } from "./spanish";
import { grade } from "../domain/engines";
import type { LearningSession, Question } from "../domain/types";

const session = (
  q: Question,
  correct: boolean,
  at: string,
  assisted = false,
): LearningSession => ({
  id: at,
  subject: "spanish",
  title: "Repaso",
  mode: "study-review",
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
      retry: !!q.retry,
      assisted,
      responseMs: 1000,
      at,
    },
  ],
});
describe("repaso del libro de español", () => {
  it("cada opción tiene una única respuesta correcta, incluso cuando cambia solo una mayúscula", () => {
    expect(studyTopics).toHaveLength(8);
    expect(studyPool).toHaveLength(64);
    expect(new Set(studyPool.map((q) => q.id)).size).toBe(64);
    for (const t of studyTopics) expect(t.questions).toHaveLength(6);
    for (const q of studyPool) {
      expect(q.explanation.length).toBeGreaterThan(20);
      expect(grade(q, q.correct).correct).toBe(true);
      if (q.kind === "choice") {
        expect(q.choices!.filter((c) => grade(q, c).correct)).toEqual([
          q.correct,
        ]);
      } else {
        expect(q.correct.split(" | ").sort()).toEqual([...q.choices!].sort());
        expect(grade(q, [...q.choices!].reverse().join(" | ")).correct).toBe(
          false,
        );
      }
    }
    const capital = studyPool.find((q) => q.id === "book-punctuation-1")!;
    expect(grade(capital, "después").correct).toBe(false);
    expect(grade(capital, "Después").correct).toBe(true);
  });
  it("mezcla 20 preguntas, cubre todos los temas y conserva lecturas y las dos listas b/v", () => {
    const spelling = [
      ...bvQuestions(classroomWords, 2),
      ...bvQuestions(supplementalVWords, 2),
    ];
    const exam = studyExamQuestions(spelling);
    expect(exam).toHaveLength(20);
    expect(new Set(exam.map((q) => q.id)).size).toBe(20);
    for (const t of studyTopics)
      expect(exam.filter((q) => q.studyTopic === t.id)).toHaveLength(2);
    expect(
      exam
        .filter((q) => q.studyTopic === "spelling")
        .map((q) => q.id)
        .sort(),
    ).toEqual(spelling.map((q) => q.id).sort());
    expect(exam.some((q) => q.skill === "SEMICOLON")).toBe(false);
    for (const q of exam.filter((q) => q.studyTopic !== "spelling")) {
      expect(q.readingText).toBe(
        studyPool.find((p) => p.id === q.id)!.readingText,
      );
    }
  });
  it("un reintento inmediato o una respuesta con ayuda no borran el error; otro ejemplo independiente sí", () => {
    const q = studyTopics[0].questions[0];
    const original = session(q, false, "2026-09-27T20:00:00Z");
    const retry = session(
      { ...q, id: q.id + "-retry", retry: true },
      true,
      "2026-09-27T20:01:00Z",
    );
    const review = studyReviewQuestions([original, retry])[0];
    expect(review.prompt).not.toBe(q.prompt);
    expect(review.reviewOf).toBe(q.id);
    const assisted = session(review, true, "2026-09-27T20:02:00Z", true);
    expect(pendingStudyErrors([original, retry, assisted])).toHaveLength(1);
    const success = session(review, true, "2026-09-27T20:03:00Z");
    expect(
      pendingStudyErrors([success, original, retry, assisted]),
    ).toHaveLength(0);
    const anotherMiss = session(q, false, "2026-09-27T20:04:00Z");
    expect(
      pendingStudyErrors([original, retry, assisted, success, anotherMiss]),
    ).toHaveLength(1);
  });
  it("conserva errores al reabrir y prepara dictado como elección sin revelar palabras antes de responder", () => {
    const q: Question = {
      id: "dict-es-bv-026",
      skill: "DICTATION",
      kind: "word",
      prompt: "Escucha",
      correct: "cabían",
      explanation: "Cabían lleva b y tilde en la í.",
    };
    const reopened: LearningSession[] = JSON.parse(
      JSON.stringify([session(q, false, "2026-09-27T20:00:00Z")]),
    );
    const [review] = studyReviewQuestions(reopened);
    expect(review.kind).toBe("choice");
    expect(review.choices).toContain("cabían");
    expect(review.choices).toContain("cavían");
    expect(review.choices).toContain("cabian");
    expect(
      pendingStudyErrors([
        ...reopened,
        session(review, true, "2026-09-27T20:10:00Z"),
      ]),
    ).toHaveLength(0);
  });
});
