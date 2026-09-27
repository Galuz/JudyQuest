import "fake-indexeddb/auto";
import { beforeEach, afterEach, describe, it, expect } from "vitest";
import { createRepositories, JudyDatabase, defaults } from "./repositories";
import type { LearningSession, Subject } from "../domain/types";
import { weekId } from "../domain/engines";
const now = new Date("2026-09-27T18:00:00Z");
let db: JudyDatabase, r: ReturnType<typeof createRepositories>;
beforeEach(() => {
  db = new JudyDatabase(`test-${crypto.randomUUID()}`);
  r = createRepositories(db);
});
afterEach(async () => {
  await db.delete();
});
const sample = (id: string, subject: Subject): LearningSession => ({
  id,
  subject,
  title: "Prueba",
  mode: "test",
  phase: "running",
  createdAt: now.toISOString(),
  index: 0,
  feedbackPending: false,
  attempts: [],
  questions: Array.from({ length: 4 }, (_, i) => ({
    id: `${id}-${i}`,
    skill: "LITERAL",
    kind: "number",
    prompt: "2 × 2",
    correct: "4",
    explanation: "4",
  })),
});
async function finish(id: string, subject: Subject, date = now) {
  await r.sessions.create(sample(id, subject));
  for (let i = 0; i < 4; i++) {
    await r.answer(id, i, "4", 1200, date);
    await r.next(id, date);
  }
}
describe("persistencia y recompensas", () => {
  it("persiste cada respuesta y continúa después de reabrir sin doble XP", async () => {
    await r.sessions.create(sample("a", "spanish"));
    await Promise.all([
      r.answer("a", 0, "4", 100, now),
      r.answer("a", 0, "4", 100, now),
    ]);
    db.close();
    await db.open();
    expect((await r.sessions.get("a"))?.attempts).toHaveLength(1);
    expect((await r.progress.get()).xp).toBe(2);
    expect((await r.sessions.get("a"))?.feedbackPending).toBe(true);
  });
  it("espacia errores sin contar el repaso como primer intento", async () => {
    await r.sessions.create(sample("a", "spanish"));
    await r.answer("a", 0, "3", 100, now);
    const s = await r.sessions.get("a");
    expect(s?.questions[3].retry).toBe(true);
    expect(s?.questions).toHaveLength(5);
    expect((await r.progress.get()).xp).toBe(0);
  });
  it("no concede dinero por una sola materia ni por práctica repetida", async () => {
    await finish("a", "spanish");
    await finish("b", "spanish");
    expect(await r.rewards.all()).toHaveLength(0);
  });
  it("concede un solo premio incluso con finalizaciones concurrentes y repeticiones", async () => {
    await finish("a", "spanish");
    await Promise.all([finish("b", "math"), finish("c", "math")]);
    for (let i = 0; i < 20; i++) await r.next("b", now);
    expect(await r.rewards.all()).toHaveLength(1);
    expect((await r.rewards.all())[0].amountGranted).toBe(1000);
    expect((await r.progress.get()).xp).toBe(24);
  });
  it("respeta el límite global y registra una recompensa parcial", async () => {
    await r.settings.save({ ...defaults, weeklyLimit: 10000 });
    await db.rewards.add({
      id: "otro-premio",
      challengeId: "other",
      profileId: "judy",
      moduleId: "spanish",
      amountRequested: 9800,
      amountGranted: 9800,
      earnedAt: now.toISOString(),
      periodId: weekId(now),
      weekId: weekId(now),
      status: "PAID",
      reason: "Anterior",
    });
    await finish("a", "spanish");
    await finish("b", "math");
    expect(
      (await r.rewards.all()).find((x) => x.challengeId === "weekly-explorer")
        ?.amountGranted,
    ).toBe(200);
    expect(
      (await r.rewards.all()).reduce((n, x) => n + x.amountGranted, 0),
    ).toBe(10000);
  });
  it("marcar pagado no libera presupuesto ni crea otro pago", async () => {
    await finish("a", "spanish");
    await finish("b", "math");
    const reward = (await r.rewards.all())[0];
    await r.rewards.markPaid(reward.id);
    await r.rewards.markPaid(reward.id);
    await finish("c", "math");
    expect(await r.rewards.all()).toHaveLength(1);
    expect((await r.rewards.all())[0].status).toBe("PAID");
    expect((await r.rewards.all())[0].amountGranted).toBe(1000);
  });
  it("presupuesto cero consume el reto, conserva XP y no cambia retroactivamente", async () => {
    await r.settings.save({ ...defaults, weeklyLimit: 0 });
    await finish("a", "spanish");
    await finish("b", "math");
    await r.settings.save(defaults);
    await finish("c", "math");
    expect(await r.rewards.all()).toHaveLength(1);
    expect((await r.rewards.all())[0].amountGranted).toBe(0);
    expect((await r.progress.get()).xp).toBe(24);
  });
  it("renueva el reto una semana después y conserva historial y XP", async () => {
    await finish("a", "spanish");
    await finish("b", "math");
    const next = new Date("2026-09-28T12:00:00Z");
    await finish("c", "spanish", next);
    await finish("d", "math", next);
    expect(await r.rewards.all()).toHaveLength(2);
    expect((await r.progress.get()).xp).toBe(32);
    expect(await r.sessions.all()).toHaveLength(4);
  });
  it("una sesión con baja precisión no habilita premio", async () => {
    const s = sample("a", "spanish");
    s.phase = "done";
    s.weekId = weekId(now);
    s.attempts = s.questions.map((q, i) => ({
      questionId: q.id,
      skill: q.skill,
      answer: "0",
      correct: i === 0,
      responseMs: 100,
      at: now.toISOString(),
      retry: false,
    }));
    await r.sessions.create(s);
    await finish("b", "math");
    expect(await r.rewards.all()).toHaveLength(0);
  });
});
