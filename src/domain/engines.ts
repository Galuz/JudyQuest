import type { LearningSession, Question, Progress } from "./types";
export const normalize = (s: string) =>
  s.normalize("NFC").trim().toLocaleLowerCase("es-MX");
const unaccent = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
export function grade(q: Question, answer: string) {
  const value = normalize(answer),
    expected = normalize(q.correct);
  const correct =
    q.kind === "choice"
      ? answer.normalize("NFC").trim() === q.correct.normalize("NFC").trim()
      : q.kind === "number"
        ? /^\d+$/.test(value) && Number(value) === Number(expected)
        : value === expected;
  if (correct) return { correct, errorType: undefined };
  let errorType = "respuesta";
  if (q.kind === "word") {
    const a = unaccent(value),
      b = unaccent(expected);
    errorType =
      a === b
        ? "tilde"
        : a.replace(/[bv]/g, "#") === b.replace(/[bv]/g, "#")
          ? "b/v"
          : "ortografía";
  } else if (q.kind === "bv") errorType = "b/v";
  return { correct, errorType };
}
export function weekId(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Mexico_City",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (key: string) => parts.find((p) => p.type === key)!.value;
  const local = new Date(
    `${get("year")}-${get("month")}-${get("day")}T12:00:00Z`,
  );
  local.setUTCDate(local.getUTCDate() - ((local.getUTCDay() + 6) % 7));
  return local.toISOString().slice(0, 10);
}
export function summarize(sessions: LearningSession[]): Progress {
  const p: Progress = {
    xp: 0,
    completed: 0,
    bySkill: {},
    bySubject: {
      spanish: { correct: 0, total: 0, sessions: 0 },
      math: { correct: 0, total: 0, sessions: 0 },
    },
  };
  for (const s of sessions) {
    if (s.phase === "done") {
      p.completed++;
      p.bySubject[s.subject].sessions++;
    }
    for (const a of s.attempts.filter((a) => !a.retry)) {
      p.bySkill[a.skill] ??= { correct: 0, total: 0 };
      p.bySkill[a.skill].total++;
      p.bySubject[s.subject].total++;
      if (a.correct) {
        p.xp += 2;
        p.bySkill[a.skill].correct++;
        p.bySubject[s.subject].correct++;
      }
    }
  }
  return p;
}
export function challengeProgress(
  sessions: LearningSession[],
  week = weekId(),
) {
  const eligible = sessions
    .filter(
      (s) =>
        s.phase === "done" &&
        s.weekId === week &&
        !s.mode.startsWith("vocabulary"),
    )
    .filter((s) => {
      const a = s.attempts.filter((a) => !a.retry);
      return (
        a.length >= 4 && a.filter((a) => a.correct).length / a.length >= 0.8
      );
    });
  return {
    spanish: eligible.some((s) => s.subject === "spanish"),
    math: eligible.some((s) => s.subject === "math"),
  };
}
export const shuffle = <T>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};
export function mathQuestions(table: number, count = 8): Question[] {
  const pool = Array.from({ length: 100 }, (_, i) => ({
    a: Math.floor(i / 10) + 1,
    b: (i % 10) + 1,
  })).filter((f) => !table || f.a === table);
  return shuffle(pool)
    .slice(0, count)
    .map(({ a, b }) => ({
      id: `math-${a}-${b}`,
      skill: `TABLE_${a}`,
      kind: "number",
      a,
      b,
      prompt: `${a} × ${b}`,
      correct: String(a * b),
      explanation: `${a} grupos de ${b}: ${Array(a).fill(b).join(" + ")} = ${a * b}. También ${b} × ${a} da ${a * b}.`,
    }));
}
