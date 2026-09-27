import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { glossaryParts, type GlossaryEntry } from "../content/glossary";
import { repositories } from "../data/repositories";
import { useApp } from "../state";

type BeforeHelp = () => Promise<void>;
const GlossaryContext = createContext<
  (entry: GlossaryEntry, before?: BeforeHelp) => void
>(() => {});
const HelpContext = createContext<BeforeHelp | undefined>(undefined);
export function GlossaryHelpScope({
  children,
  beforeOpen,
}: {
  children: ReactNode;
  beforeOpen: BeforeHelp;
}) {
  return (
    <HelpContext.Provider value={beforeOpen}>{children}</HelpContext.Provider>
  );
}

export function GlossaryProvider({ children }: { children: ReactNode }) {
  const app = useApp();
  const [error, setError] = useState("");
  const opening = useRef(false);
  const [entry, setEntry] = useState<GlossaryEntry | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (entry && !dialog.current?.open) dialog.current?.showModal();
  }, [entry]);
  async function show(entry: GlossaryEntry, before?: BeforeHelp) {
    if (opening.current) return;
    opening.current = true;
    setError("");
    try {
      // Save assistance before displaying the answer, including across reloads.
      await before?.();
      if (entry.vocabularyId)
        await repositories.vocabulary.consult(entry.vocabularyId);
      await app.refresh();
      setEntry(entry);
    } catch {
      setError("No pudimos abrir la palabra. Intenta tocarla otra vez.");
    } finally {
      opening.current = false;
    }
  }
  return (
    <GlossaryContext.Provider
      value={(entry, before) => void show(entry, before)}
    >
      {children}
      {error && (
        <p role="alert" className="glossary-error">
          {error}
        </p>
      )}
      <dialog
        ref={dialog}
        className="glossary-dialog"
        aria-labelledby="glossary-title"
        aria-describedby="glossary-meaning"
        onClose={() => setEntry(null)}
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close();
        }}
      >
        {entry && (
          <div className="glossary-card">
            <p className="eyebrow">DESCUBRE UNA PALABRA</p>
            <h2 id="glossary-title">{entry.word}</h2>
            <p id="glossary-meaning">{entry.meaning}</p>
            <div className="example">
              <strong>Por ejemplo</strong>
              <p>{entry.example}</p>
            </div>
            <button
              type="button"
              className="primary full"
              autoFocus
              onClick={() => dialog.current?.close()}
            >
              ¡Entendido! Volver
            </button>
          </div>
        )}
      </dialog>
    </GlossaryContext.Provider>
  );
}

export function GlossaryText({ children }: { children: string }) {
  const show = useContext(GlossaryContext);
  const before = useContext(HelpContext);
  return (
    <>
      {glossaryParts(children).map((part, index) =>
        part.entry ? (
          <button
            key={index}
            type="button"
            className="glossary-word"
            aria-label={part.text}
            aria-description="Ver el significado de esta palabra"
            aria-haspopup="dialog"
            onClick={(event) => {
              event.stopPropagation();
              show(part.entry!, before);
            }}
          >
            {part.text}
          </button>
        ) : (
          part.text
        ),
      )}
    </>
  );
}

// The answer button and word buttons are siblings: looking up a word must never
// select an answer. The answer button still covers the rest of the option card.
export function AnswerOption({
  text,
  letter,
  selected,
  correct,
  disabled,
  onChoose,
}: {
  text: string;
  letter?: string;
  selected?: boolean;
  correct?: boolean;
  disabled: boolean;
  onChoose: () => void;
}) {
  return (
    <div
      className={`option option-with-glossary ${selected ? "selected" : ""} ${correct ? "correct-option" : ""}`}
    >
      <button
        type="button"
        className="option-answer"
        disabled={disabled}
        aria-label={text}
        aria-pressed={selected}
        onClick={onChoose}
      />
      {letter && (
        <span className="option-letter" aria-hidden="true">
          {letter}
        </span>
      )}
      <span className="option-text">
        <GlossaryText>{text}</GlossaryText>
      </span>
      {correct && <span aria-label="Respuesta correcta">✓</span>}
    </div>
  );
}
