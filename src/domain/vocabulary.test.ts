import { expect, it } from "vitest";
import { vocabulary, vocabularyQuestion } from "../content/vocabulary";
import { glossaryParts } from "../content/glossary";
import {
  consultWord,
  freshWord,
  nextActivity,
  readingVocabulary,
  recordVocabulary,
  studyDay,
  vocabularyPlan,
} from "./vocabulary";
const at = (day: number) => new Date(Date.UTC(2026, 8, 27 + day, 18));
const entry = vocabulary[0];
const q = (activity: number) => vocabularyQuestion(entry, activity);

it("has 20 unique senses with four usable, varied activities and tappable meanings", () => {
  expect(vocabulary).toHaveLength(20);
  expect(new Set(vocabulary.map((w) => w.id)).size).toBe(20);
  for (const w of vocabulary) {
    expect(w.activities).toHaveLength(4);
    expect(
      new Set(w.activities.map((a) => `${a.text ?? ""} ${a.prompt}`)).size,
    ).toBe(4);
    expect(glossaryParts(w.word)[0].entry?.vocabularyId).toBe(w.id);
    for (const [i, a] of w.activities.entries()) {
      expect(new Set(a.choices).size).toBe(3);
      expect(a.choices.every((c) => !!c.trim())).toBe(true);
      if (i >= 2) expect(a.text?.length).toBeGreaterThan(40);
    }
  }
});
it("needs three different contexts on different due days, then a later recall after a week", () => {
  let p = recordVocabulary(freshWord(entry.id), q(0), true, at(0));
  expect(p.status).toBe("practicing");
  expect(p.nextReviewAt).toBe("2026-09-28");
  p = recordVocabulary(p, q(1), true, at(1));
  expect(p.status).toBe("practicing");
  expect(p.nextReviewAt).toBe("2026-10-01");
  p = recordVocabulary(p, q(2), true, at(4));
  expect(p.status).toBe("remembered");
  expect(p.nextReviewAt).toBe("2026-10-08");
  p = recordVocabulary(p, q(3), true, at(11));
  expect(p.status).toBe("retained");
  p = recordVocabulary(p, q(1), false, at(25));
  expect(p.status).toBe("review");
  expect(p.evidence).toHaveLength(0);
  expect(p.nextReviewAt).toBe("2026-10-23");
});
it("lookups, same-day feedback, retries and early practice never advance independent evidence", () => {
  let p = consultWord(freshWord(entry.id), at(0));
  expect(p.attempts).toBe(0);
  expect(p.evidence).toEqual([]);
  p = recordVocabulary(p, q(0), true, at(0));
  expect(p.evidence).toHaveLength(0);
  p = recordVocabulary(p, q(1), true, at(1));
  const expected = structuredClone(p);
  p = recordVocabulary(p, q(2), true, at(1));
  p = recordVocabulary(p, { ...q(3), retry: true }, true, at(2));
  expect(p.evidence).toEqual(expected.evidence);
  // Establish a three-day interval, then practice before it is due.
  p = recordVocabulary(p, q(2), true, at(3));
  const scheduled = p.nextReviewAt,
    count = p.evidence.length;
  p = recordVocabulary(p, q(0), true, at(4));
  expect(p.evidence).toHaveLength(count);
  expect(p.nextReviewAt).toBe(scheduled);
});
it("repeating the same activity across days is not enough to mark a word remembered", () => {
  let p = freshWord(entry.id);
  for (const day of [0, 1, 4, 11]) p = recordVocabulary(p, q(0), true, at(day));
  expect(p.status).toBe("practicing");
  expect(nextActivity(entry, p)).not.toBe(0);
});
it("keeps established recall when old evidence leaves the bounded history, until a mistake", () => {
  let p = freshWord(entry.id);
  for (const [i, day] of [0, 1, 4, 11].entries())
    p = recordVocabulary(p, q(i), true, at(day));
  for (let i = 1; i <= 20; i++)
    p = recordVocabulary(p, q(2 + (i % 2)), true, at(11 + 31 * i));
  expect(p.evidence).toHaveLength(12);
  expect(p.status).toBe("retained");
});
it("selects up to three due reviews and two new words per Mexico City day", () => {
  const initial = vocabularyPlan([], at(0));
  expect(initial.fresh.map((w) => w.id)).toEqual(["identificar", "senalar"]);
  const p = initial.fresh.map((w) =>
    recordVocabulary(freshWord(w.id), vocabularyQuestion(w, 0), true, at(0)),
  );
  expect(vocabularyPlan(p, at(0)).questions).toHaveLength(0);
  const tomorrow = vocabularyPlan(p, at(1));
  expect(tomorrow.due).toHaveLength(2);
  expect(tomorrow.fresh.map((w) => w.id)).toEqual(["comparar", "explicar"]);
  expect(tomorrow.questions).toHaveLength(4);
  expect(
    readingVocabulary(p, at(1)).every(
      (q) => q.readingText && p.some((w) => w.id === q.vocabularyWordId),
    ),
  ).toBe(true);
  expect(studyDay("2026-09-28T02:00:00Z")).toBe("2026-09-27");
});
