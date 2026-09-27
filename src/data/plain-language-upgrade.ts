import replacements from "../content/plain-language-v2.json";
import { words } from "../content/spanish";
import type { LearningSession } from "../domain/types";

const wording: Record<string, string> = replacements;
const simplify = (text: string) => wording[text] ?? text;
const builtinQuestion =
  /^(luna|vuelo|puente|semillas|refran|parrafo|punto-coma)-\d+(?:-retry)?$/;

// Update saved wording without regrading attempts or changing question order,
// progress, IDs, retries, timestamps, settings, or rewards.
export function upgradeSessionWording(session: LearningSession) {
  for (const question of session.questions) {
    if (builtinQuestion.test(question.id)) {
      question.prompt = simplify(question.prompt);
      question.explanation = simplify(question.explanation);
      if (question.evidence) question.evidence = simplify(question.evidence);
      question.choices = question.choices?.map(simplify);
      question.correct =
        question.kind === "sequence"
          ? question.correct.split(" | ").map(simplify).join(" | ")
          : simplify(question.correct);
    } else {
      const bankId = question.id.match(
        /^(?:bv|dict)-(es-bv-\d+)(?:-retry)?$/,
      )?.[1];
      const word = words.find((word) => word.id === bankId);
      if (word) question.explanation = word.feedback;
    }
  }
  for (const attempt of session.attempts) {
    if (!builtinQuestion.test(attempt.questionId)) continue;
    const question = session.questions.find((q) => q.id === attempt.questionId);
    if (question?.kind === "choice") attempt.answer = simplify(attempt.answer);
    if (question?.kind === "sequence") {
      attempt.answer = attempt.answer.split(" | ").map(simplify).join(" | ");
    }
  }
}
