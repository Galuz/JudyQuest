export type Subject = "spanish" | "math";
export type Question = {
  id: string;
  skill: string;
  prompt: string;
  kind: "choice" | "number" | "word" | "bv" | "sequence";
  choices?: string[];
  correct: string;
  explanation: string;
  evidence?: string;
  passageId?: string;
  dictationSentence?: string;
  a?: number;
  b?: number;
  retry?: boolean;
  vocabularyWordId?: string;
  vocabularyActivity?: number;
  readingText?: string;
  readingTitle?: string;
  studyTopic?: string;
  reviewOf?: string;
  helpUsed?: boolean;
  fractionBars?: { numerator: number; denominator: number }[];
};
export type Attempt = {
  questionId: string;
  skill: string;
  answer: string;
  correct: boolean;
  errorType?: string;
  responseMs: number;
  at: string;
  retry: boolean;
  assisted?: boolean;
};
export type LearningSession = {
  id: string;
  subject: Subject;
  title: string;
  mode: string;
  questions: Question[];
  attempts: Attempt[];
  index: number;
  createdAt: string;
  finishedAt?: string;
  weekId?: string;
  phase: "intro" | "running" | "done";
  feedbackPending: boolean;
};
export type WordEntry = {
  id: string;
  word: string;
  level: number;
  dictationSentence: string;
  completion: { prompt: string; answers: string[] };
  feedback: string;
};
export type ParentSettings = {
  id: "parent";
  weeklyLimit: number;
  rewardAmount: number;
  pinSalt?: string;
  pinHash?: string;
  failedAttempts: number;
  lockedUntil: number;
  customWords?: WordEntry[];
};
export type Reward = {
  recoveredAt?: string;
  sessionId?: string;
  id: string;
  challengeId: string;
  profileId: string;
  moduleId: string;
  amountRequested: number;
  amountGranted: number;
  earnedAt: string;
  periodId: string;
  weekId: string;
  status: "EARNED" | "PAID";
  reason: string;
  paidAt?: string;
};
export type ChildProfile = { id: "judy"; name: string };
export type Progress = {
  xp: number;
  completed: number;
  bySkill: Record<string, { correct: number; total: number }>;
  bySubject: Record<
    Subject,
    { correct: number; total: number; sessions: number }
  >;
};
export type Passage = {
  id: string;
  title: string;
  type: string;
  paragraphs: string[];
  source?: { label: string; url: string };
  questions: Question[];
};
export type VocabularyStatus =
  "discover" | "learning" | "practicing" | "remembered" | "retained" | "review";
export type VocabularyProgress = {
  id: string;
  status: VocabularyStatus;
  attempts: number;
  independentCorrect: number;
  helpCount: number;
  lastHelpAt?: string;
  firstPracticedAt?: string;
  lastPracticedAt?: string;
  nextReviewAt?: string;
  lastActivity?: number;
  reviewStep: number;
  evidence: { activity: number; at: string }[];
};
