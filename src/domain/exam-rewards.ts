import { studyTopics } from "../content/exam-study";
import type { LearningSession } from "./types";

export const examChallenges = [
  ...studyTopics.map((t) => ({
    id: `exam-topic:${t.id}`,
    mode: `study-topic:${t.id}`,
    title: t.title,
    weight: 1,
  })),
  {
    id: "exam-mixed",
    mode: "study-exam",
    title: "Repaso de 20 preguntas",
    weight: 2,
  },
];

// Integer cents: eight tenths for topics, the remainder for the mixed exam.
export function examPrize(limit: number, challengeId: string) {
  return challengeId === "exam-mixed"
    ? limit - 8 * Math.floor(limit / 10)
    : Math.floor(limit / 10);
}

export function qualifyingExamChallenge(s: LearningSession) {
  const challenge = examChallenges.find((c) => c.mode === s.mode);
  if (!challenge || s.subject !== "spanish" || s.phase !== "done") return;
  const questions = s.questions.filter((q) => !q.retry);
  const attempts = s.attempts.filter((a) => !a.retry);
  const count = challenge.id === "exam-mixed" ? 20 : 6;
  if (
    questions.length !== count ||
    attempts.length !== count ||
    new Set(attempts.map((a) => a.questionId)).size !== count
  )
    return;
  if (!questions.every((q) => attempts.some((a) => a.questionId === q.id)))
    return;
  if (
    challenge.id !== "exam-mixed" &&
    !questions.every((q) => q.studyTopic === s.mode.split(":")[1])
  )
    return;
  if (
    challenge.id === "exam-mixed" &&
    (!studyTopics.every(
      (t) => questions.filter((q) => q.studyTopic === t.id).length >= 2,
    ) ||
      questions.filter((q) => q.kind === "bv" || q.kind === "word").length < 4)
  )
    return;
  if (attempts.filter((a) => a.correct && !a.assisted).length / count < 0.8)
    return;
  return challenge;
}
