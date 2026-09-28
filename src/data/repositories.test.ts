import "fake-indexeddb/auto";
import { beforeEach, afterEach, describe, it, expect } from "vitest";
import { createRepositories, JudyDatabase, defaults } from "./repositories";
import type { LearningSession, Subject } from "../domain/types";
import { examChallenges, examPrize } from "../domain/exam-rewards";
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
async function finish(
  id: string,
  subject: Subject,
  date = now,
  mode = "study-topic:sources",
  assisted = false,
) {
  const s = sample(id, subject);
  s.mode = mode;
  const count = mode === "study-exam" ? 20 : 6;
  s.questions = Array.from({ length: count }, (_, i) => ({
    ...s.questions[i % 4],
    id: `${id}-${i}`,
    studyTopic:
      mode === "study-exam"
        ? i < 16
          ? examChallenges[Math.floor(i / 2)].mode.split(":")[1]
          : undefined
        : mode.split(":")[1],
    kind: mode === "study-exam" && i >= 16 ? "bv" : "number",
  }));
  await r.sessions.create(s);
  for (let i = 0; i < count; i++) {
    if (assisted) await r.useHelp(id, i);
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
  it("no concede dinero por Matemáticas ni por práctica fuera del examen", async () => {
    await finish("a", "spanish", now, "test");
    await finish("b", "math");
    expect(await r.rewards.all()).toHaveLength(0);
  });
  it("concede un solo premio incluso con finalizaciones concurrentes y repeticiones", async () => {
    await Promise.all([finish("b", "spanish"), finish("c", "spanish")]);
    for (let i = 0; i < 20; i++) await r.next("b", now);
    expect(await r.rewards.all()).toHaveLength(1);
    expect((await r.rewards.all())[0].amountGranted).toBe(1000);
    expect((await r.progress.get()).xp).toBeGreaterThan(0);
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
      (await r.rewards.all()).find(
        (x) => x.challengeId === "exam-topic:sources",
      )?.amountGranted,
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
    await finish("c", "spanish");
    expect(await r.rewards.all()).toHaveLength(1);
    expect((await r.rewards.all())[0].status).toBe("PAID");
    expect((await r.rewards.all())[0].amountGranted).toBe(1000);
  });
  it("presupuesto cero consume el reto, conserva XP y no cambia retroactivamente", async () => {
    await r.settings.save({ ...defaults, weeklyLimit: 0 });
    await finish("a", "spanish");
    await finish("b", "math");
    await r.settings.save(defaults);
    await finish("c", "spanish");
    expect(await r.rewards.all()).toHaveLength(1);
    expect((await r.rewards.all())[0].amountGranted).toBe(0);
    expect((await r.progress.get()).xp).toBeGreaterThan(0);
  });
  it("renueva el reto una semana después y conserva historial y XP", async () => {
    await finish("a", "spanish");
    await finish("b", "math");
    const next = new Date("2026-09-28T12:00:00Z");
    await finish("c", "spanish", next);
    await finish("d", "math", next);
    expect(await r.rewards.all()).toHaveLength(2);
    expect((await r.progress.get()).xp).toBe(48);
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

describe("presupuesto del examen", () => {
  it("reparte los $100 entre ocho temas y el examen, sin duplicar al reabrir", async () => {
    for (const c of examChallenges) await finish(c.id, "spanish", now, c.mode);
    expect(
      (await r.rewards.all()).reduce((sum, x) => sum + x.amountGranted, 0),
    ).toBe(10000);
    expect(await r.rewards.all()).toHaveLength(9);
    db.close();
    await db.open();
    await finish("again", "spanish");
    expect(await r.rewards.all()).toHaveLength(9);
    expect(
      (await r.rewards.all()).find((x) => x.challengeId === "exam-mixed")
        ?.amountGranted,
    ).toBe(2000);
  });
  it("las pistas no conceden dinero y una nueva sesión independiente sí", async () => {
    await finish("help", "spanish", now, "study-topic:sources", true);
    expect(await r.rewards.all()).toHaveLength(0);
    await finish("alone", "spanish");
    expect((await r.rewards.all())[0].sessionId).toBe("alone");
  });
  it("no acredita sesiones incompletas al volver a llamar next", async () => {
    const old = sample("old", "spanish");
    old.phase = "done";
    old.mode = "study-topic:sources";
    old.weekId = weekId(now);
    await r.sessions.create(old);
    await r.next(old.id, now);
    await finish("math", "math");
    expect(await r.rewards.all()).toHaveLength(0);
  });
  it("reparte todos los centavos de presupuestos que no son múltiplos de diez", () => {
    for (const limit of [0, 1, 9, 101, 9999, 10000]) {
      expect(
        examChallenges.reduce((n, c) => n + examPrize(limit, c.id), 0),
      ).toBe(limit);
    }
  });
});

describe("recuperación de premios anteriores", () => {
  it("recupera sesiones guardadas sin repetir, sin cambiar el avance y sin duplicar entre pestañas", async () => {
    await finish("old-a", "spanish");
    await finish("old-b", "spanish", now, "study-topic:summary");
    await db.rewards.clear(); // Simulate sessions completed before monetary rewards existed.
    const before = await r.sessions.all();
    db.close();
    await db.open();
    await Promise.all([r.recoverExamRewards(now), r.recoverExamRewards(now)]);
    expect(await r.rewards.all()).toHaveLength(2);
    expect(
      (await r.rewards.all()).reduce((n, x) => n + x.amountGranted, 0),
    ).toBe(2000);
    expect(
      (await r.rewards.all()).every((x) => x.recoveredAt === now.toISOString()),
    ).toBe(true);
    expect(await r.sessions.all()).toEqual(before);
    expect(await r.recoverExamRewards(now)).toEqual([]);
  });
  it("respeta dinero ya entregado, premios parciales y el límite semanal al recuperar", async () => {
    await finish("paid", "spanish");
    const existing = (await r.rewards.all())[0];
    await r.rewards.markPaid(existing.id);
    const paid = (await r.rewards.all())[0];
    await finish("missing", "spanish", now, "study-topic:summary");
    await db.rewards.delete(`judy:exam-topic:summary:${weekId(now)}`);
    await r.settings.save({ ...defaults, weeklyLimit: 1050 });
    const restored = await r.recoverExamRewards(now);
    expect(restored[0].amountGranted).toBe(50);
    expect(await db.rewards.get(existing.id)).toEqual(paid);
    expect(
      (await r.rewards.all()).reduce((n, x) => n + x.amountGranted, 0),
    ).toBe(1050);
    await r.settings.save(defaults);
    expect(await r.recoverExamRewards(now)).toEqual([]);
  });
  it("conserva la semana original aunque se abra la app después del domingo", async () => {
    await finish("sunday", "spanish");
    await db.rewards.clear();
    const monday = new Date("2026-09-28T12:00:00Z");
    const restored = await r.recoverExamRewards(monday);
    expect(restored[0].weekId).toBe(weekId(now));
    expect(restored[0].earnedAt).toBe(now.toISOString());
    await finish("monday", "spanish", monday);
    expect(await r.rewards.all()).toHaveLength(2);
  });
  it("no inventa premios por prácticas incompletas, con ayuda o sin fecha de finalización", async () => {
    await finish("help", "spanish", now, "study-topic:sources", true);
    await r.sessions.create(sample("unfinished", "spanish"));
    const noDate = {
      ...(await r.sessions.get("help"))!,
      id: "no-date",
      finishedAt: undefined,
    };
    await r.sessions.create(noDate);
    expect(await r.recoverExamRewards(now)).toEqual([]);
    expect(await r.rewards.all()).toHaveLength(0);
  });
});
