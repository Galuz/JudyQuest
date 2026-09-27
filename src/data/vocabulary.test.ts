import "fake-indexeddb/auto";
import Dexie from "dexie";
import { afterEach, beforeEach, expect, it } from "vitest";
import { createRepositories, defaults, JudyDatabase } from "./repositories";
import { vocabulary, vocabularyQuestion } from "../content/vocabulary";
import { UNKNOWN_WORD } from "../domain/vocabulary";
import { challengeProgress, weekId } from "../domain/engines";
import type { LearningSession } from "../domain/types";
const now = new Date("2026-09-27T18:00:00Z");
let db: JudyDatabase, r: ReturnType<typeof createRepositories>;
beforeEach(() => {
  db = new JudyDatabase(`vocabulary-${crypto.randomUUID()}`);
  r = createRepositories(db);
});
afterEach(async () => {
  await db.delete();
});
const session = (id: string): LearningSession => ({
  id,
  subject: "spanish",
  title: "Mis palabras",
  mode: "vocabulary-daily",
  createdAt: now.toISOString(),
  phase: "running",
  index: 0,
  feedbackPending: false,
  attempts: [],
  questions: [vocabularyQuestion(vocabulary[0], 0)],
});

it("saves assistance before the definition, resumes it and never awards independent recall", async () => {
  await r.sessions.create(session("help"));
  await r.useHelp("help", 0);
  db.close();
  await db.open();
  expect((await r.sessions.get("help"))?.questions[0].helpUsed).toBe(true);
  const correct = session("help").questions[0].correct;
  await Promise.all([
    r.answer("help", 0, correct, 100, now),
    r.answer("help", 0, correct, 100, now),
  ]);
  expect((await r.sessions.get("help"))?.attempts).toHaveLength(1);
  expect((await r.sessions.get("help"))?.attempts[0].assisted).toBe(true);
  const p = await r.vocabulary.get("identificar");
  expect(p?.attempts).toBe(1);
  expect(p?.evidence).toHaveLength(0);
  expect(await r.rewards.all()).toHaveLength(0);
});
it("an unknown answer teaches with a different guided example; reloading preserves both records", async () => {
  await r.sessions.create(session("unknown"));
  await r.answer("unknown", 0, UNKNOWN_WORD, 100, now);
  let s = (await r.sessions.get("unknown"))!;
  expect(s.questions[1].vocabularyActivity).toBe(1);
  expect(s.questions[1].helpUsed).toBe(true);
  expect((await r.vocabulary.get("identificar"))?.status).toBe("learning");
  await r.next("unknown", now);
  db.close();
  await db.open();
  s = (await r.sessions.get("unknown"))!;
  expect(s.index).toBe(1);
  await r.answer(s.id, 1, s.questions[1].correct, 100, now);
  expect((await r.vocabulary.get("identificar"))?.independentCorrect).toBe(0);
  expect((await r.vocabulary.get("identificar"))?.status).toBe("practicing");
  expect((await r.progress.get()).xp).toBe(0);
});
it("records an unaided answer atomically once and does not turn a later lookup into failure", async () => {
  await r.sessions.create(session("solo"));
  await Promise.all([
    r.answer("solo", 0, session("solo").questions[0].correct, 100, now),
    r.answer("solo", 0, session("solo").questions[0].correct, 100, now),
  ]);
  await r.vocabulary.consult("identificar", now);
  db.close();
  await db.open();
  const p = (await r.vocabulary.get("identificar"))!;
  expect(p.independentCorrect).toBe(1);
  expect(p.evidence).toHaveLength(1);
  expect(p.helpCount).toBe(1);
  expect(p.status).toBe("practicing");
  expect((await r.sessions.get("solo"))?.attempts[0].assisted).toBe(false);
});
it("a lookup outside a mission is retained as help that day without inventing a test result", async () => {
  await r.vocabulary.consult("identificar", now);
  expect((await r.vocabulary.get("identificar"))?.attempts).toBe(0);
  await r.sessions.create(session("later"));
  await r.answer("later", 0, session("later").questions[0].correct, 100, now);
  expect((await r.sessions.get("later"))?.attempts[0].assisted).toBe(true);
  expect((await r.vocabulary.get("identificar"))?.independentCorrect).toBe(0);
});
it("vocabulary checks never qualify for the money challenge, even with four correct answers", () => {
  const s = session("no-money");
  s.phase = "done";
  s.weekId = weekId(now);
  s.attempts = Array.from({ length: 4 }, (_, i) => ({
    questionId: String(i),
    skill: "VOCABULARY",
    answer: "correct",
    correct: true,
    responseMs: 100,
    at: now.toISOString(),
    retry: false,
  }));
  expect(challengeProgress([s], weekId(now)).spanish).toBe(false);
});
it("migrates v2 without changing saved missions, settings, profile or paid rewards", async () => {
  const old = new Dexie(db.name);
  old.version(2).stores({
    sessions: "id,subject,phase,weekId",
    settings: "id",
    rewards: "id,weekId,status",
    profiles: "id",
  });
  const saved = { ...session("existing"), mode: "exam" };
  const paid = {
    id: "paid",
    weekId: "2026-09-21",
    status: "PAID",
    amountGranted: 1000,
  };
  await old.table("sessions").add(saved);
  await old.table("settings").add({ ...defaults, weeklyLimit: 5000 });
  await old.table("rewards").add(paid);
  await old.table("profiles").add({ id: "judy", name: "Judy" });
  old.close();
  expect(await r.sessions.get("existing")).toEqual(saved);
  expect((await r.settings.get()).weeklyLimit).toBe(5000);
  expect(await r.rewards.all()).toEqual([paid]);
  expect(await r.profiles.get()).toEqual({ id: "judy", name: "Judy" });
  expect(await r.vocabulary.all()).toEqual([]);
});
