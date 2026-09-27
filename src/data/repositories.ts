import Dexie, { type EntityTable } from "dexie";
import type {
  ChildProfile,
  LearningSession,
  ParentSettings,
  Progress,
  Reward,
} from "../domain/types";
import { challengeProgress, grade, summarize, weekId } from "../domain/engines";
import { upgradeSessionWording } from "./plain-language-upgrade";
export interface SessionRepository {
  all(): Promise<LearningSession[]>;
  get(id: string): Promise<LearningSession | undefined>;
  create(s: LearningSession): Promise<void>;
}
export interface ProgressRepository {
  get(): Promise<Progress>;
}
export interface SettingsRepository {
  get(): Promise<ParentSettings>;
  save(value: ParentSettings): Promise<void>;
}
export interface RewardRepository {
  all(): Promise<Reward[]>;
  markPaid(id: string): Promise<void>;
}
export interface ProfileRepository {
  get(): Promise<ChildProfile>;
}
export interface ChallengeRepository {
  progress(): Promise<{ spanish: boolean; math: boolean }>;
}
export class JudyDatabase extends Dexie {
  sessions!: EntityTable<LearningSession, "id">;
  settings!: EntityTable<ParentSettings, "id">;
  rewards!: EntityTable<Reward, "id">;
  profiles!: EntityTable<ChildProfile, "id">;
  constructor(name = "judyquest-v1") {
    super(name);
    this.version(1).stores({
      sessions: "id,subject,phase,weekId",
      settings: "id",
      rewards: "id,weekId,status",
      profiles: "id",
    });
    this.version(2)
      .stores({})
      .upgrade((transaction) =>
        transaction
          .table<LearningSession>("sessions")
          .toCollection()
          .modify(upgradeSessionWording),
      );
  }
}
export const defaults: ParentSettings = {
  id: "parent",
  weeklyLimit: 10000,
  rewardAmount: 1000,
  failedAttempts: 0,
  lockedUntil: 0,
};
export function createRepositories(db = new JudyDatabase()) {
  const settings: SettingsRepository = {
    get: async () => (await db.settings.get("parent")) ?? { ...defaults },
    save: async (v) => {
      if (
        !Number.isSafeInteger(v.weeklyLimit) ||
        v.weeklyLimit < 0 ||
        !Number.isSafeInteger(v.rewardAmount) ||
        v.rewardAmount < 0
      )
        throw Error("Escribe cantidades válidas.");
      await db.settings.put(v);
    },
  };
  const sessions: SessionRepository = {
    all: () => db.sessions.toArray(),
    get: (id) => db.sessions.get(id),
    create: async (s) => {
      await db.sessions.add(s);
    },
  };
  const rewards: RewardRepository = {
    all: () => db.rewards.toArray(),
    markPaid: async (id) => {
      await db.transaction("rw", db.rewards, async () => {
        const r = await db.rewards.get(id);
        if (r && r.amountGranted > 0 && r.status === "EARNED")
          await db.rewards.put({
            ...r,
            status: "PAID",
            paidAt: new Date().toISOString(),
          });
      });
    },
  };
  const progress: ProgressRepository = {
    get: async () => summarize(await sessions.all()),
  };
  const profiles: ProfileRepository = {
    get: async () =>
      (await db.profiles.get("judy")) ?? { id: "judy", name: "Judy" },
  };
  const challenges: ChallengeRepository = {
    progress: async () => challengeProgress(await sessions.all()),
  };
  // Only this engine writes monetary rewards. It is called inside the finishing transaction.
  async function awardWeekly(now: Date) {
    const week = weekId(now),
      id = `judy:weekly-explorer:${week}`;
    if (await db.rewards.get(id)) return;
    const p = challengeProgress(await sessions.all(), week);
    if (!p.spanish || !p.math) return;
    const config = await settings.get(),
      earned = (await db.rewards.where("weekId").equals(week).toArray()).reduce(
        (n, r) => n + r.amountGranted,
        0,
      );
    const grant = Math.max(
      0,
      Math.min(config.rewardAmount, config.weeklyLimit - earned),
    );
    await db.rewards.add({
      id,
      challengeId: "weekly-explorer",
      profileId: "judy",
      moduleId: "cross-module",
      amountRequested: config.rewardAmount,
      amountGranted: grant,
      earnedAt: now.toISOString(),
      periodId: week,
      weekId: week,
      status: "EARNED",
      reason:
        grant === 0
          ? "Límite semanal alcanzado"
          : grant < config.rewardAmount
            ? "Recompensa parcial por límite semanal"
            : "Una sesión de cada materia con al menos 80% de aciertos",
    });
  }
  return {
    db,
    sessions,
    settings,
    rewards,
    progress,
    profiles,
    challenges,
    async begin(id: string) {
      await db.sessions.update(id, { phase: "running" });
    },
    async answer(
      id: string,
      index: number,
      answer: string,
      responseMs: number,
      now = new Date(),
    ) {
      return db.transaction("rw", db.sessions, async () => {
        const s = await db.sessions.get(id);
        if (
          !s ||
          s.phase !== "running" ||
          s.index !== index ||
          s.feedbackPending
        )
          return s;
        const q = s.questions[index];
        const result = grade(q, answer);
        s.attempts.push({
          questionId: q.id,
          skill: q.skill,
          answer,
          ...result,
          responseMs: Math.max(0, responseMs),
          at: now.toISOString(),
          retry: !!q.retry,
        });
        if (!result.correct && !q.retry) {
          const retry = { ...q, id: `${q.id}-retry`, retry: true };
          s.questions.splice(Math.min(index + 3, s.questions.length), 0, retry);
        }
        s.feedbackPending = true;
        await db.sessions.put(s);
        return s;
      });
    },
    async next(id: string, now = new Date()) {
      return db.transaction(
        "rw",
        db.sessions,
        db.settings,
        db.rewards,
        async () => {
          const s = await db.sessions.get(id);
          if (!s || s.phase !== "running" || !s.feedbackPending) return s;
          s.index++;
          s.feedbackPending = false;
          if (s.index >= s.questions.length) {
            s.phase = "done";
            s.finishedAt = now.toISOString();
            s.weekId = weekId(now);
          }
          await db.sessions.put(s);
          if (s.phase === "done") await awardWeekly(now);
          return s;
        },
      );
    },
  };
}
export const repositories = createRepositories();
