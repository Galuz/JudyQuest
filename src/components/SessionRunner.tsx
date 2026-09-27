import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Lightbulb,
  RotateCcw,
  Star,
  Trophy,
} from "lucide-react";
import { repositories } from "../data/repositories";
import type { LearningSession } from "../domain/types";
import { lessons, passages, skillNames } from "../content/spanish";
import { useApp } from "../state";
import { PinGate } from "./PinGate";
export function MathLesson({ table }: { table: number }) {
  const a = table || 3,
    b = 4;
  const tricks: Record<number, string> = {
    1: "Multiplicar por 1 conserva el número.",
    2: "Multiplicar por 2 es duplicar.",
    3: "Suma el mismo número tres veces.",
    4: "Duplica el número y vuelve a duplicar.",
    5: "Los resultados terminan en 0 o 5.",
    6: "Puedes hacer ×5 y sumar una vez más.",
    7: "Puedes hacer ×5 y sumar dos veces más.",
    8: "Duplica tres veces: ×2, ×4 y ×8.",
    9: "Haz ×10 y resta una vez el número.",
    10: "Para estos números enteros positivos, añade un cero.",
  };
  return (
    <div className="math-lesson">
      <h3>
        {a} grupos de {b}
      </h3>
      <div className="groups">
        {Array.from({ length: a }, (_, i) => (
          <div
            key={i}
            className="dot-group"
            aria-label={`Grupo ${i + 1}: ${b} puntos`}
          >
            {Array.from({ length: b }, (_, j) => (
              <span key={j} />
            ))}
          </div>
        ))}
      </div>
      <p className="equation-small">
        {a} × {b} = {a * b}
      </p>
      <p>
        {Array(a).fill(b).join(" + ")} = {a * b}
      </p>
      <p>{tricks[a]}</p>
      <p>
        Cambiar el orden no cambia el resultado: {b} × {a} también es {a * b}.
      </p>
    </div>
  );
}
export function SessionRunner() {
  const { id } = useParams();
  const app = useApp();
  const [session, setSession] = useState<LearningSession | null>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [answer, setAnswer] = useState(""),
    [sequence, setSequence] = useState<string[]>([]),
    [reveal, setReveal] = useState(false),
    [dictated, setDictated] = useState(false);
  const started = useRef(performance.now());
  useEffect(() => {
    let active = true;
    repositories.sessions
      .get(id!)
      .then((s) => {
        if (active) {
          if (s) setSession(s);
          else
            setError(
              "No encontramos esta sesión. Puedes comenzar otra desde el inicio.",
            );
        }
      })
      .catch(() => setError("No pudimos abrir la sesión."));
    return () => {
      active = false;
    };
  }, [id]);
  useEffect(() => {
    setAnswer("");
    setSequence([]);
    setReveal(false);
    setDictated(false);
    started.current = performance.now();
  }, [session?.index, id]);
  async function action(fn: () => Promise<unknown>) {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await fn();
      const s = await repositories.sessions.get(id!);
      if (s) setSession(s);
      await app.refresh();
    } catch {
      setError(
        "No pudimos guardar. Tu avance anterior está seguro; intenta de nuevo.",
      );
    } finally {
      setBusy(false);
    }
  }
  if (!session)
    return (
      <div className="panel">
        <p>{error || "Abriendo tu misión…"}</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  const s = session;
  const q = s.questions[s.index];
  const last = s.attempts.at(-1);
  const original = s.attempts.filter((a) => !a.retry),
    correct = original.filter((a) => a.correct).length;
  const back = s.subject === "math" ? "/matematicas" : "/espanol";
  if (s.phase === "done")
    return (
      <section className="result panel">
        <div className="result-icon">
          <Trophy size={42} />
        </div>
        <p className="eyebrow">MISIÓN TERMINADA</p>
        <h1>
          {correct === original.length
            ? "¡Lo lograste, Judy!"
            : "Cada intento te enseña algo"}
        </h1>
        <p>{s.title}</p>
        <div className="result-stats">
          <div>
            <strong>
              {correct}/{original.length}
            </strong>
            <span>Aciertos al primer intento</span>
          </div>
          <div>
            <strong>+{correct * 2}</strong>
            <span>XP ganados</span>
          </div>
        </div>
        <p>
          Los repasos refuerzan lo aprendido; no cambian tus aciertos del primer
          intento.
        </p>
        {original.some((a) => !a.correct) && (
          <div className="review-list">
            <h3>Una pista para la próxima</h3>
            {original
              .filter((a) => !a.correct)
              .map((a) => {
                const question = s.questions.find(
                  (q) => q.id === a.questionId,
                )!;
                return (
                  <div key={a.questionId}>
                    <strong>
                      {question.kind === "bv"
                        ? question.explanation
                        : question.prompt}
                    </strong>
                    {question.kind !== "bv" && <p>{question.explanation}</p>}
                  </div>
                );
              })}
          </div>
        )}
        <div className="button-row">
          <Link className="primary" to={back}>
            Elegir otra misión <ArrowRight size={18} />
          </Link>
          <Link className="secondary" to="/progreso">
            Ver mi progreso
          </Link>
        </div>
      </section>
    );
  const topicLessons = lessons.filter((l) =>
    s.questions.some((q) => q.skill === l.skill),
  );
  if (s.phase === "intro")
    return (
      <div className="narrow">
        <Link className="back-link" to={back}>
          <ArrowLeft size={18} /> Volver
        </Link>
        <section className="panel lesson-panel">
          <p className="eyebrow">ANTES DE EMPEZAR</p>
          <h1>{s.title}</h1>
          <p>
            {s.questions.length} ejercicios · Sin prisa · Puedes volver al texto
          </p>
          {s.subject === "math" ? (
            <MathLesson table={Number(s.mode.split(":")[1])} />
          ) : (
            topicLessons.map((l) => (
              <details key={l.skill} open={topicLessons.length <= 2}>
                <summary>
                  <Lightbulb size={18} />
                  {l.title}
                </summary>
                <p>{l.body}</p>
                <div className="example">{l.example}</div>
              </details>
            ))
          )}
          {s.mode === "dictation" && (
            <p className="notice">
              Esta misión necesita un adulto para leer las palabras en voz alta.
            </p>
          )}
          <button
            className="primary full"
            disabled={busy}
            onClick={() => void action(() => repositories.begin(s.id))}
          >
            ¡Vamos a practicar! <ArrowRight size={18} />
          </button>
          {error && (
            <p role="alert" className="error">
              {error}
            </p>
          )}
        </section>
      </div>
    );
  const passage = passages.find((p) => p.id === q.passageId);
  const isDictation = s.mode === "dictation";
  const submitted = s.feedbackPending;
  const canSubmit =
    q.kind === "sequence"
      ? sequence.length === q.choices?.length
      : answer.trim().length > 0;
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || submitted || (isDictation && !dictated)) return;
    await action(() =>
      repositories.answer(
        s.id,
        s.index,
        q.kind === "sequence" ? sequence.join(" | ") : answer,
        performance.now() - started.current,
      ),
    );
  }
  return (
    <div className="session-shell">
      <div className="session-top">
        <Link className="back-link" to={back}>
          <ArrowLeft size={18} /> Guardar y salir
        </Link>
        <span>
          {s.index + 1} de {s.questions.length}
        </span>
      </div>
      <div className="progress-track" aria-label="Avance de la sesión">
        <span style={{ width: `${(s.index / s.questions.length) * 100}%` }} />
      </div>
      <div className={`exercise-layout ${passage ? "with-reader" : ""}`}>
        {passage && (
          <article className="panel reader">
            <span className="eyebrow">{passage.type}</span>
            <h2>{passage.title}</h2>
            {passage.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="fine-print">
              Puedes regresar al texto todas las veces que necesites.
            </p>
            {passage.source && (
              <a
                className="source"
                href={passage.source.url}
                target="_blank"
                rel="noreferrer"
              >
                Fuente de los hechos: {passage.source.label}
              </a>
            )}
          </article>
        )}
        <section className="panel exercise">
          <div className="exercise-label">
            <span className="eyebrow">
              {s.subject === "math" ? "MATEMÁTICAS" : skillNames[q.skill]}
            </span>
            {q.retry && (
              <span className="chip">
                <RotateCcw size={13} /> Repaso
              </span>
            )}
          </div>
          {isDictation && !submitted && !dictated ? (
            <>
              <h2>Turno del adulto</h2>
              <p>
                Entrega la tablet al adulto para preparar la palabra. Después te
                la dictará.
              </p>
              {!reveal ? (
                <button className="secondary" onClick={() => setReveal(true)}>
                  Preparar palabra
                </button>
              ) : (
                <PinGate>
                  <div className="dictation-card">
                    <span className="eyebrow">SOLO PARA EL ADULTO</span>
                    <h3>{q.correct}</h3>
                    <p>{q.dictationSentence}</p>
                    <p>
                      Lee la frase y repite la palabra. Oculta esta tarjeta
                      antes de devolver la tablet.
                    </p>
                    <button
                      className="primary"
                      onClick={() => {
                        setDictated(true);
                        setReveal(false);
                        app.lock();
                        started.current = performance.now();
                      }}
                    >
                      Ocultar y dar la tablet a Judy
                    </button>
                  </div>
                </PinGate>
              )}
            </>
          ) : (
            <>
              <h2
                className={
                  q.kind === "number"
                    ? "math-question"
                    : q.kind === "bv"
                      ? "word-question"
                      : ""
                }
              >
                {q.prompt}
              </h2>
              {q.kind === "bv" && (
                <p>
                  Completa cada espacio con <strong>b</strong> o{" "}
                  <strong>v</strong>.
                </p>
              )}
              <form onSubmit={submit}>
                {q.kind === "choice" && (
                  <div className="options">
                    {q.choices?.map((choice, i) => (
                      <button
                        key={choice}
                        type="button"
                        disabled={submitted || busy}
                        aria-pressed={answer === choice}
                        className={`option ${answer === choice ? "selected" : ""} ${submitted && choice === q.correct ? "correct-option" : ""}`}
                        onClick={() => setAnswer(choice)}
                      >
                        <span className="option-letter">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{choice}</span>
                        {submitted && choice === q.correct && (
                          <Check size={20} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
                {q.kind === "sequence" && (
                  <div className="sequence">
                    <p>Selecciona del primero al último.</p>
                    <div className="sequence-order">
                      {sequence.map((item, i) => (
                        <span key={item}>
                          {i + 1}. {item}
                        </span>
                      ))}
                    </div>
                    {q.choices?.map((choice) => (
                      <button
                        type="button"
                        className="option"
                        disabled={submitted || sequence.includes(choice)}
                        key={choice}
                        onClick={() => setSequence([...sequence, choice])}
                      >
                        {choice}
                      </button>
                    ))}
                    {!submitted && (
                      <button
                        type="button"
                        className="text-button"
                        onClick={() => setSequence([])}
                      >
                        Volver a ordenar
                      </button>
                    )}
                  </div>
                )}
                {q.kind === "bv" && (
                  <div className="bv-inputs">
                    {Array.from({ length: q.correct.length }, (_, i) => (
                      <label key={i}>
                        Espacio {i + 1}
                        <select
                          disabled={submitted}
                          aria-label={`Espacio ${i + 1}`}
                          value={
                            answer[i] && answer[i] !== "_" ? answer[i] : ""
                          }
                          onChange={(e) => {
                            const a = Array.from(
                              { length: q.correct.length },
                              (_, j) => answer[j] || "_",
                            );
                            a[i] = e.target.value || "_";
                            setAnswer(a.join(""));
                          }}
                        >
                          <option value="">Elige</option>
                          <option value="b">b</option>
                          <option value="v">v</option>
                        </select>
                      </label>
                    ))}
                  </div>
                )}
                {(q.kind === "number" || q.kind === "word") && (
                  <label className="answer-label">
                    Tu respuesta
                    <input
                      autoFocus
                      className="answer-input"
                      type="text"
                      inputMode={q.kind === "number" ? "numeric" : "text"}
                      pattern={q.kind === "number" ? "[0-9]*" : undefined}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck={false}
                      value={submitted ? (last?.answer ?? "") : answer}
                      disabled={submitted || busy}
                      onChange={(e) => setAnswer(e.target.value)}
                    />
                  </label>
                )}
                {!submitted && (
                  <button
                    className="primary full"
                    disabled={
                      !canSubmit ||
                      busy ||
                      (q.kind === "bv" &&
                        (answer.includes("_") ||
                          answer.length !== q.correct.length))
                    }
                  >
                    {busy ? "Guardando…" : "Comprobar respuesta"}
                  </button>
                )}
              </form>
            </>
          )}
          {submitted && last && (
            <div
              className={`feedback ${last.correct ? "positive" : "learning"}`}
              role="status"
            >
              <h3>
                {last.correct ? (
                  <>
                    <CheckCircle2 size={21} /> ¡Bien pensado!
                  </>
                ) : (
                  <>
                    <Lightbulb size={21} /> Vamos a descubrirlo
                  </>
                )}
              </h3>
              {!last.correct && (
                <p>
                  Tu respuesta: <strong>{last.answer}</strong>
                  {last.errorType === "tilde"
                    ? " · Revisa la tilde; elegiste bien b/v."
                    : ""}
                </p>
              )}
              <p>{q.explanation}</p>
              {q.evidence && <blockquote>“{q.evidence}”</blockquote>}
              {!last.correct && !q.retry && (
                <p className="fine-print">
                  Esta pregunta volverá a aparecer para practicar.
                </p>
              )}
              <button
                className="primary full"
                disabled={busy}
                onClick={() => void action(() => repositories.next(s.id))}
              >
                {s.index === s.questions.length - 1
                  ? "Ver mi resultado"
                  : "Siguiente"}{" "}
                {s.index === s.questions.length - 1 ? (
                  <Star size={18} />
                ) : (
                  <ArrowRight size={18} />
                )}
              </button>
            </div>
          )}
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
