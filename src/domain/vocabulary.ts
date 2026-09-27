import {
  vocabulary,
  vocabularyQuestion,
  type VocabularyWord,
} from "../content/vocabulary";
import type { Question, VocabularyProgress, VocabularyStatus } from "./types";

export const UNKNOWN_WORD = "Todavía no la conozco";
export const vocabularyStatus: Record<VocabularyStatus, string> = {
  discover: "Por descubrir",
  learning: "La estoy conociendo",
  practicing: "La estoy practicando",
  remembered: "La recuerdo",
  retained: "La sigo recordando",
  review: "Vamos a repasarla",
};
export const studyDay = (date: Date | string) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Mexico_City",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
function afterDays(now: Date, days: number) {
  const date = new Date(`${studyDay(now)}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
export const freshWord = (id: string): VocabularyProgress => ({
  id,
  status: "discover",
  attempts: 0,
  independentCorrect: 0,
  helpCount: 0,
  reviewStep: 0,
  evidence: [],
});
export function consultWord(
  previous: VocabularyProgress,
  now: Date,
): VocabularyProgress {
  return {
    ...previous,
    status: previous.status === "discover" ? "learning" : previous.status,
    helpCount: previous.helpCount + 1,
    lastHelpAt: now.toISOString(),
  };
}
export function usedHelp(p: VocabularyProgress, q: Question, now: Date) {
  return (
    !!q.helpUsed || (!!p.lastHelpAt && studyDay(p.lastHelpAt) === studyDay(now))
  );
}
export function recordVocabulary(
  previous: VocabularyProgress,
  q: Question,
  correct: boolean,
  now: Date,
): VocabularyProgress {
  const p = structuredClone(previous),
    today = studyDay(now);
  const assisted = usedHelp(p, q, now);
  p.attempts++;
  p.firstPracticedAt ??= now.toISOString();
  p.lastPracticedAt = now.toISOString();
  p.lastActivity = q.vocabularyActivity;
  const due = !p.nextReviewAt || p.nextReviewAt <= today;
  if (!q.retry && !correct) {
    p.status = p.independentCorrect ? "review" : "learning";
    p.evidence = [];
    p.reviewStep = 0;
    p.nextReviewAt = afterDays(now, 1);
  } else if (
    !q.retry &&
    correct &&
    !assisted &&
    due &&
    !p.evidence.some((e) => studyDay(e.at) === today)
  ) {
    p.independentCorrect++;
    // Keep a small, bounded window. Repeated contexts alone cannot prove recall.
    p.evidence = [
      ...p.evidence,
      { activity: q.vocabularyActivity ?? 0, at: now.toISOString() },
    ].slice(-12);
    const varied = new Set(p.evidence.map((e) => e.activity)).size >= 3;
    const hasReading = p.evidence.some((e) => e.activity >= 2);
    const days = new Set(p.evidence.map((e) => studyDay(e.at))).size;
    const firstDay = studyDay(p.evidence[0].at);
    const weekLater =
      Date.parse(`${today}T12:00:00Z`) - Date.parse(`${firstDay}T12:00:00Z`) >=
      7 * 86400000;
    p.status =
      p.status === "remembered" ||
      p.status === "retained" ||
      (varied && hasReading && days >= 3)
        ? p.status === "retained" || (days >= 4 && weekLater)
          ? "retained"
          : "remembered"
        : "practicing";
    const intervals = [1, 3, 7, 14, 30];
    p.nextReviewAt = afterDays(
      now,
      intervals[Math.min(p.reviewStep, intervals.length - 1)],
    );
    p.reviewStep = Math.min(p.reviewStep + 1, intervals.length - 1);
  } else {
    if (correct && (p.status === "discover" || p.status === "learning"))
      p.status = "practicing";
    if (due) p.nextReviewAt = afterDays(now, 1);
  }
  // Feedback teaches the meaning; further attempts today are supported practice.
  p.lastHelpAt = now.toISOString();
  return p;
}

export function nextActivity(
  entry: VocabularyWord,
  p?: VocabularyProgress,
  reading = false,
) {
  if (!reading && !p?.attempts) return 0;
  const choices = reading ? [2, 3] : [1, 2, 3, 0];
  // Prefer a context not yet remembered, avoiding the one just answered.
  return (
    choices.find(
      (a) =>
        a !== p?.lastActivity && !p?.evidence.some((e) => e.activity === a),
    ) ??
    choices[(choices.indexOf(p?.lastActivity ?? -1) + 1) % choices.length] ??
    entry.activities.length - 1
  );
}
export function vocabularyPlan(
  progress: VocabularyProgress[],
  now = new Date(),
) {
  const byId = new Map(progress.map((p) => [p.id, p]));
  const due = vocabulary
    .filter((w) => {
      const p = byId.get(w.id);
      return (
        p?.attempts && (!p.nextReviewAt || p.nextReviewAt <= studyDay(now))
      );
    })
    .sort((a, b) =>
      (byId.get(a.id)?.nextReviewAt ?? "").localeCompare(
        byId.get(b.id)?.nextReviewAt ?? "",
      ),
    );
  // Two new words per local calendar day, even if several sessions are opened.
  const todayCount = progress.filter(
    (p) => p.firstPracticedAt && studyDay(p.firstPracticedAt) === studyDay(now),
  ).length;
  const fresh = vocabulary
    .filter((w) => !byId.get(w.id)?.attempts)
    .slice(0, Math.max(0, 2 - todayCount));
  return {
    fresh,
    due,
    questions: [...due.slice(0, 3), ...fresh].map((w) =>
      vocabularyQuestion(w, nextActivity(w, byId.get(w.id))),
    ),
  };
}
export function readingVocabulary(
  progress: VocabularyProgress[],
  now = new Date(),
) {
  return progress
    .filter((p) => p.attempts > 0 && vocabulary.some((w) => w.id === p.id))
    .sort((a, b) => {
      const aDue = !!a.nextReviewAt && a.nextReviewAt <= studyDay(now);
      const bDue = !!b.nextReviewAt && b.nextReviewAt <= studyDay(now);
      return (
        Number(bDue) - Number(aDue) ||
        (a.lastPracticedAt ?? "").localeCompare(b.lastPracticedAt ?? "")
      );
    })
    .slice(0, 3)
    .map((p) => {
      const entry = vocabulary.find((w) => w.id === p.id)!;
      return vocabularyQuestion(entry, nextActivity(entry, p, true));
    });
}
