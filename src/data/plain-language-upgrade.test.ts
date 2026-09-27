import "fake-indexeddb/auto";
import Dexie from "dexie";
import { expect, it } from "vitest";
import { createRepositories, defaults, JudyDatabase } from "./repositories";
import { passages } from "../content/spanish";
import type { LearningSession } from "../domain/types";

it("updates a version 1 saved mission and resumes it without losing progress or changing scores", async () => {
  const name = `wording-${crypto.randomUUID()}`;
  const oldDb = new Dexie(name);
  oldDb.version(1).stores({
    sessions: "id,subject,phase,weekId",
    settings: "id",
    rewards: "id,weekId,status",
    profiles: "id",
  });
  const question = {
    id: "puente-3",
    skill: "MORAL",
    kind: "choice" as const,
    prompt: "¿Qué enseñanza deja la fábula?",
    choices: [
      "Colaborar ayuda a superar dificultades",
      "No debemos cruzar ningún arroyo",
      "Solo los animales grandes pueden ayudar",
    ],
    correct: "Colaborar ayuda a superar dificultades",
    explanation:
      "La rama pudo moverse cuando ambos colaboraron. Esa acción sostiene la moraleja.",
    passageId: "puente",
  };
  const saved: LearningSession = {
    id: "saved",
    subject: "spanish",
    title: "Repaso de Español",
    mode: "exam",
    phase: "running",
    createdAt: "2026-09-27T18:00:00Z",
    index: 0,
    feedbackPending: true,
    questions: [
      question,
      {
        ...passages[0].questions[2],
        prompt: "Toca los hechos en el orden en que ocurrieron.",
        choices: [
          "Regresaron a la Tierra",
          "Descendieron a la Luna",
          "Despegaron de Florida",
        ],
        correct:
          "Despegaron de Florida | Descendieron a la Luna | Regresaron a la Tierra",
      },
      { ...question, id: "puente-3-retry", retry: true },
    ],
    attempts: [
      {
        questionId: "puente-3",
        skill: "MORAL",
        answer: "No debemos cruzar ningún arroyo",
        correct: false,
        retry: false,
        responseMs: 5000,
        at: "2026-09-27T18:01:00Z",
      },
    ],
  };
  const reward = {
    id: "existing",
    weekId: "2026-09-21",
    status: "PAID",
    amountGranted: 1000,
  };
  await oldDb.table("sessions").add(saved);
  await oldDb.table("settings").add(defaults);
  await oldDb.table("rewards").add(reward);
  oldDb.close();
  const db = new JudyDatabase(name);
  try {
    const r = createRepositories(db);
    const updated = (await r.sessions.get("saved"))!;
    expect(updated).toMatchObject({
      index: 0,
      phase: "running",
      feedbackPending: true,
      attempts: saved.attempts,
      createdAt: saved.createdAt,
    });
    expect(updated.questions.map((q) => q.id)).toEqual(
      saved.questions.map((q) => q.id),
    );
    expect(updated.questions[0].correct).toBe(passages[2].questions[2].correct);
    expect(updated.questions[0].choices?.[0]).toBe(
      updated.questions[0].correct,
    );
    expect(updated.questions[2]).toMatchObject({
      retry: true,
      correct: updated.questions[0].correct,
    });
    expect(updated.questions[1].choices).toEqual([
      "Regresaron a la Tierra",
      "Bajaron a la Luna",
      "Despegaron de Florida",
    ]);
    expect(await r.settings.get()).toEqual(defaults);
    expect(await r.rewards.all()).toEqual([reward]);
    expect((await r.progress.get()).xp).toBe(0);
    await r.next("saved");
    await r.answer("saved", 1, passages[0].questions[2].correct, 5000);
    expect((await r.sessions.get("saved"))?.attempts[1].correct).toBe(true);
    expect((await r.progress.get()).xp).toBe(2);
    db.close();
    await db.open();
    expect((await r.sessions.get("saved"))?.attempts).toHaveLength(2);
  } finally {
    await db.delete();
  }
});
