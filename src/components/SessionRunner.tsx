import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
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
import { AnswerOption, GlossaryText, GlossaryHelpScope } from "./Glossary";
import { vocabulary } from "../content/vocabulary";
import { UNKNOWN_WORD, vocabularyStatus } from "../domain/vocabulary";
export function MathLesson({ table }: { table: number }) {
  const a = table || 3,
    b = 4;
  const tricks: Record<number, string> = {
    1: "Al multiplicar por 1, el número queda igual: 1 × 4 = 4.",
    2: "Multiplicar por 2 es sumar el número dos veces: 4 + 4 = 8.",
    3: "Multiplicar por 3 es sumar el número tres veces: 4 + 4 + 4 = 12.",
    4: "Suma el número consigo mismo. Luego suma el resultado consigo mismo: 4 + 4 = 8 y 8 + 8 = 16.",
    5: "Cuenta de 5 en 5: 5, 10, 15, 20… Los resultados terminan en 0 o 5.",
    6: "Para 6 × 4, calcula 5 × 4 = 20 y suma otro 4: 20 + 4 = 24.",
    7: "Para 7 × 4, calcula 5 × 4 = 20 y suma dos veces más el 4: 20 + 4 + 4 = 28.",
    8: "Para 8 × 4, empieza con 4 y suma cada resultado consigo mismo: 4 + 4 = 8, 8 + 8 = 16 y 16 + 16 = 32.",
    9: "Para 9 × 4, calcula 10 × 4 = 40 y quita un 4: 40 − 4 = 36.",
    10: "En las tablas del 1 al 10, basta con poner un cero al final del otro número: 10 × 4 = 40.",
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
      <p>
        <GlossaryText>{tricks[a]}</GlossaryText>
      </p>
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
              "No encontramos esta misión. Puedes empezar otra desde el inicio.",
            );
        }
      })
      .catch(() => setError("No pudimos abrir la misión."));
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
  const isVocabulary = s.mode.startsWith("vocabulary");
  const back =
    s.mode === "vocabulary-daily"
      ? "/palabras"
      : s.subject === "math"
        ? "/matematicas"
        : "/espanol";
  if (s.phase === "done" && isVocabulary) {
    const ids = [...new Set(s.questions.map((q) => q.vocabularyWordId))];
    return (
      <section className="panel result">
        <div className="result-icon">
          <Star size={42} />
        </div>
        <p className="eyebrow">UN PASO MÁS</p>
        <h1>¡Tu colección está creciendo!</h1>
        <p>
          Hoy practicaste {ids.length} palabras. Las volveremos a encontrar poco
          a poco.
        </p>
        <div className="review-list">
          {ids.map((id) => {
            const word = vocabulary.find((w) => w.id === id);
            const p = app.vocabulary.find((p) => p.id === id);
            return (
              word && (
                <div key={id}>
                  <strong>
                    <GlossaryText>{word.word}</GlossaryText>
                  </strong>
                  <p>{vocabularyStatus[p?.status ?? "discover"]}</p>
                </div>
              )
            );
          })}
        </div>
        <p>
          Recordar una palabra lleva varios días. Pedir ayuda también sirve para
          aprender.
        </p>
        <div className="button-row">
          <Link className="primary" to="/palabras">
            Ver mis palabras <ArrowRight size={18} />
          </Link>
          <Link className="secondary" to="/espanol">
            Volver a Español
          </Link>
        </div>
      </section>
    );
  }
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
            <span>Puntos ganados (XP)</span>
          </div>
        </div>
        <p>
          Volver a intentar te ayuda a aprender. Aquí contamos las respuestas
          correctas de la primera vez.
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
                      <GlossaryText>
                        {question.kind === "bv"
                          ? question.explanation
                          : question.prompt}
                      </GlossaryText>
                    </strong>
                    {question.kind !== "bv" && (
                      <p>
                        <GlossaryText>{question.explanation}</GlossaryText>
                      </p>
                    )}
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
          <h1>
            <GlossaryText>{s.title}</GlossaryText>
          </h1>
          <p className="glossary-hint">
            Toca las palabras subrayadas para saber qué significan.
          </p>
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
                <p>
                  <GlossaryText>{l.body}</GlossaryText>
                </p>
                <div className="example">
                  <GlossaryText>{l.example}</GlossaryText>
                </div>
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
  const targetWord = vocabulary.find((w) => w.id === q.vocabularyWordId);
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
    <GlossaryHelpScope
      beforeOpen={async () => {
        const updated = await repositories.useHelp(s.id, s.index);
        if (updated) setSession(updated);
      }}
    >
      <div className="session-shell">
        <div className="session-top">
          <Link className="back-link" to={back}>
            <ArrowLeft size={18} /> Guardar y salir
          </Link>
          <span>
            {s.index + 1} de {s.questions.length}
          </span>
        </div>
        <div className="progress-track" aria-label="Avance de la misión">
          <span style={{ width: `${(s.index / s.questions.length) * 100}%` }} />
        </div>
        <div
          className={`exercise-layout ${passage || q.readingText ? "with-reader" : ""}`}
        >
          {q.readingText && (
            <article className="panel reader">
              <p className="eyebrow">LEER CON MIS PALABRAS</p>
              <h2>Una pequeña historia</h2>
              {q.readingText.split("\n\n").map((p, i) => (
                <p key={i}>
                  <GlossaryText>{p}</GlossaryText>
                </p>
              ))}
              <p className="fine-print">
                Puedes volver a leer todas las veces que quieras.
              </p>
            </article>
          )}
          {passage && (
            <article className="panel reader">
              <span className="eyebrow">
                <GlossaryText>{passage.type}</GlossaryText>
              </span>
              <h2>
                <GlossaryText>{passage.title}</GlossaryText>
              </h2>
              {passage.paragraphs.map((p, i) => (
                <p key={i}>
                  <GlossaryText>{p}</GlossaryText>
                </p>
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
                  ¿De dónde viene esta historia? {passage.source.label}
                </a>
              )}
            </article>
          )}
          <section className="panel exercise">
            <div className="exercise-label">
              <span className="eyebrow">
                <GlossaryText>
                  {s.subject === "math"
                    ? "MATEMÁTICAS"
                    : (skillNames[q.skill] ?? "Español")}
                </GlossaryText>
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
                  Dale la tablet a un adulto. Él leerá una palabra para que tú
                  la escribas.
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
                  <GlossaryText>{q.prompt}</GlossaryText>
                </h2>
                {targetWord && !submitted && (
                  <p className="glossary-hint">
                    ¿Quieres una pista? Toca:{" "}
                    <GlossaryText>{targetWord.word}</GlossaryText>.{" "}
                    {q.helpUsed
                      ? "Esta vez practicamos con ayuda."
                      : "También puedes decir que aún no la conoces."}
                  </p>
                )}
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
                        <AnswerOption
                          key={choice}
                          text={choice}
                          disabled={submitted || busy}
                          selected={answer === choice}
                          correct={submitted && choice === q.correct}
                          letter={String.fromCharCode(65 + i)}
                          onChoose={() => setAnswer(choice)}
                        />
                      ))}
                    </div>
                  )}
                  {q.kind === "sequence" && (
                    <div className="sequence">
                      <p>
                        Toca las opciones en orden: primero, después y al final.
                      </p>
                      <div className="sequence-order">
                        {sequence.map((item, i) => (
                          <span key={item}>
                            {i + 1}. <GlossaryText>{item}</GlossaryText>
                          </span>
                        ))}
                      </div>
                      {q.choices?.map((choice) => (
                        <AnswerOption
                          text={choice}
                          disabled={
                            submitted || busy || sequence.includes(choice)
                          }
                          key={choice}
                          onChoose={() => setSequence([...sequence, choice])}
                        />
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
                      {busy ? "Guardando…" : "Revisar mi respuesta"}
                    </button>
                  )}
                </form>
                {targetWord && !submitted && (
                  <button
                    className="text-button unknown-word"
                    disabled={busy}
                    onClick={() =>
                      void action(() =>
                        repositories.answer(
                          s.id,
                          s.index,
                          UNKNOWN_WORD,
                          performance.now() - started.current,
                        ),
                      )
                    }
                  >
                    {UNKNOWN_WORD}
                  </button>
                )}
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
                      ? " · Usaste bien la b y la v. Revisa el acento escrito (la tilde)."
                      : ""}
                  </p>
                )}
                <p>
                  <GlossaryText>{q.explanation}</GlossaryText>
                </p>
                {targetWord && last.assisted && (
                  <p className="fine-print">
                    Esta respuesta fue con ayuda. ¡También cuenta como práctica!
                    Otro día veremos si la recuerdas.
                  </p>
                )}
                {q.evidence && (
                  <blockquote>
                    “<GlossaryText>{q.evidence}</GlossaryText>”
                  </blockquote>
                )}
                {!last.correct && !q.retry && (
                  <p className="fine-print">
                    {targetWord
                      ? "Probaremos otro ejemplo para practicar esta palabra."
                      : "Esta pregunta volverá a aparecer para practicar."}
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
    </GlossaryHelpScope>
  );
}
