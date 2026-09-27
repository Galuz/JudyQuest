import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "./state";
import { repositories } from "./data/repositories";
import { shuffle } from "./domain/engines";
import type { Question, Subject } from "./domain/types";
export function useStart() {
  const app = useApp(),
    navigate = useNavigate();
  const [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  return {
    busy,
    error,
    start: async (
      subject: Subject,
      title: string,
      mode: string,
      questions: Question[],
    ) => {
      if (busy || questions.length === 0) return;
      setBusy(true);
      setError("");
      try {
        const id =
          crypto.randomUUID?.() ??
          Array.from(crypto.getRandomValues(new Uint8Array(16)), (n) =>
            n.toString(16).padStart(2, "0"),
          ).join("");
        await repositories.sessions.create({
          id,
          subject,
          title,
          mode,
          questions: questions.map((q) => ({
            ...q,
            choices: q.choices ? shuffle(q.choices) : undefined,
          })),
          attempts: [],
          index: 0,
          createdAt: new Date().toISOString(),
          phase: mode.startsWith("vocabulary") ? "running" : "intro",
          feedbackPending: false,
        });
        await app.refresh();
        navigate(`/sesion/${id}`);
      } catch {
        setError("No se pudo iniciar la misión. Intenta de nuevo.");
      } finally {
        setBusy(false);
      }
    },
  };
}
