import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { repositories, defaults } from "./data/repositories";
import { summarize } from "./domain/engines";
import type { LearningSession, ParentSettings, Reward } from "./domain/types";
type State = {
  sessions: LearningSession[];
  rewards: Reward[];
  settings: ParentSettings;
  refresh: () => Promise<void>;
  parentUnlocked: boolean;
  unlock: () => void;
  lock: () => void;
  error: string;
  loading: boolean;
};
const Context = createContext<State>(null!);
export const useApp = () => useContext(Context);
export const useProgress = () => summarize(useApp().sessions);
export function AppProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<LearningSession[]>([]),
    [rewards, setRewards] = useState<Reward[]>([]),
    [settings, setSettings] = useState(defaults),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [parentUnlocked, setParentUnlocked] = useState(false);
  async function refresh() {
    try {
      const [s, r, c] = await Promise.all([
        repositories.sessions.all(),
        repositories.rewards.all(),
        repositories.settings.get(),
      ]);
      setSessions(s);
      setRewards(r);
      setSettings(c);
      setError("");
    } catch {
      setError(
        "No pudimos abrir el guardado en este dispositivo. Comprueba que el navegador permita almacenar datos y vuelve a intentarlo.",
      );
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void refresh();
    const handle = () => {
      if (document.hidden) setParentUnlocked(false);
      else void refresh();
    };
    document.addEventListener("visibilitychange", handle);
    return () => document.removeEventListener("visibilitychange", handle);
  }, []);
  useEffect(() => {
    if (!parentUnlocked) return;
    const timer = window.setTimeout(
      () => setParentUnlocked(false),
      5 * 60 * 1000,
    );
    return () => clearTimeout(timer);
  }, [parentUnlocked]);
  return (
    <Context.Provider
      value={{
        sessions,
        rewards,
        settings,
        refresh,
        parentUnlocked,
        unlock: () => setParentUnlocked(true),
        lock: () => setParentUnlocked(false),
        error,
        loading,
      }}
    >
      {children}
    </Context.Provider>
  );
}
