import { ExamRewards } from "./components/ExamRewards";
import { useStart } from "./useStart";
import { VocabularyInvitation } from "./components/VocabularyScreen";
import { ExamStudy } from "./components/ExamStudy";
import { MathExam } from "./components/MathExam";
import { mathTopics } from "./content/math-exam";
import { studyTopics } from "./content/exam-study";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Check,
  Compass,
  Flag,
  Headphones,
  Leaf,
  Lightbulb,
  LockKeyhole,
  PencilLine,
  RotateCcw,
  Sparkles,
  Star,
  Target,
  Trophy,
} from "lucide-react";
import { useApp, useProgress } from "./state";
import { mathQuestions, weekId } from "./domain/engines";
import { repositories } from "./data/repositories";
import {
  bvQuestions,
  classroomWords,
  supplementalVWords,
  dictationQuestions,
  lessons,
  passages,
  proverbs,
  punctuation,
  skillNames,
  words,
} from "./content/spanish";
import type { WordEntry } from "./domain/types";
import { PinGate } from "./components/PinGate";
import { MathLesson } from "./components/SessionRunner";
import { GlossaryText } from "./components/Glossary";
export const money = (cents: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 2,
  }).format(cents / 100);
const pct = (c: number, t: number) =>
  t ? `${Math.round((c / t) * 100)}%` : "—";
export function Home() {
  const app = useApp(),
    progress = useProgress();
  const pending = app.sessions
    .filter((s) => s.phase !== "done")
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
  return (
    <>
      <div className="welcome">
        <div>
          <p className="eyebrow">TU AVENTURA DE APRENDIZAJE</p>
          <h1>
            ¿Qué descubrimos
            <br />
            hoy, <span>Judy?</span>
          </h1>
          <p>Una pequeña misión. Algo nuevo que aprender.</p>
        </div>
        <div className="welcome-stats">
          <div>
            <Star size={19} />
            <strong>{progress.xp}</strong>
            <span>Puntos (XP)</span>
          </div>
          <div>
            <Flag size={19} />
            <strong>{progress.completed}</strong>
            <span>Misiones listas</span>
          </div>
        </div>
      </div>
      {pending && (
        <Link className="resume" to={`/sesion/${pending.id}`}>
          <RotateCcw size={22} />
          <div>
            <strong>Continúa donde te quedaste</strong>
            <span>{pending.title}</span>
          </div>
          <ArrowRight />
        </Link>
      )}
      <div className="section-heading">
        <h2>Elige tu próxima misión</h2>
        <span>A tu ritmo, sin límite de tiempo</span>
      </div>
      <div className="subject-grid">
        <Link className="subject-card spanish-card" to="/espanol">
          <div className="card-top">
            <span className="subject-icon">
              <BookOpen size={30} />
            </span>
            <span className="pill">EMPIEZA POR AQUÍ</span>
          </div>
          <div>
            <p className="eyebrow">PALABRAS QUE CUENTAN HISTORIAS</p>
            <h2>Español</h2>
            <p>
              Lee historias, encuentra pistas
              <br className="desktop" /> y entiende lo que cuentan.
            </p>
          </div>
          <div className="card-bottom">
            <span>Lectura · Fábulas · Ortografía</span>
            <span className="round-arrow">
              <ArrowRight />
            </span>
          </div>
        </Link>
        <Link className="subject-card math-card" to="/matematicas">
          <div className="card-top">
            <span className="subject-icon">
              <Calculator size={30} />
            </span>
            <span className="pill">PREPARO MI EXAMEN</span>
          </div>
          <div>
            <p className="eyebrow">PEQUEÑOS NÚMEROS, GRANDES IDEAS</p>
            <h2>Matemáticas</h2>
            <p>
              Fracciones, multiplicaciones
              <br className="desktop" /> y divisiones paso a paso.
            </p>
          </div>
          <div className="card-bottom">
            <span>Guías · Ejercicios · Repaso de examen</span>
            <span className="round-arrow">
              <ArrowRight />
            </span>
          </div>
        </Link>
      </div>
      <VocabularyInvitation />
      <div className="home-bottom">
        <section className="panel study-note">
          <span className="icon-tile amber">
            <Lightbulb />
          </span>
          <div>
            <p className="eyebrow">UN PASO A LA VEZ</p>
            <h3>Equivocarte también es aprender</h3>
            <p>
              Te explicaremos cada respuesta. Lo que cueste un poquito volverá a
              aparecer para practicar.
            </p>
            <Link className="inline-link" to="/espanol">
              Preparar mi repaso de Español <ArrowRight size={17} />
            </Link>
          </div>
        </section>
        <ExamRewards compact />
      </div>
    </>
  );
}
export function Spanish() {
  const app = useApp(),
    { start, busy, error } = useStart();
  const bank = app.settings.customWords ?? words;
  const [showLessons, setShowLessons] = useState(false);
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">MUNDO DE LAS PALABRAS</p>
          <h1>Español</h1>
          <p>Lee con calma. Busca pistas. Explica lo que entendiste.</p>
        </div>
        <span className="big-subject amber">
          <BookOpen size={36} />
        </span>
      </div>
      <ExamStudy />
      <section className="panel">
        <p className="eyebrow">REPASO DE ORTOGRAFÍA</p>
        <h2>Palabras de mi cuaderno</h2>
        <p>
          Estas siete palabras con b están en tu cuaderno:{" "}
          <strong>{classroomWords.map((w) => w.word).join(", ")}</strong>.
        </p>
        <div className="button-row">
          <button
            className="primary"
            disabled={busy}
            onClick={() =>
              void start(
                "spanish",
                "Las 7 palabras con b de mi cuaderno",
                "bv",
                bvQuestions(classroomWords, classroomWords.length),
              )
            }
          >
            Practicar las 7 con b
          </button>
          <button
            className="secondary"
            disabled={busy}
            onClick={() =>
              void start(
                "spanish",
                "Dictado: las 7 palabras de mi cuaderno",
                "dictation",
                dictationQuestions(classroomWords, classroomWords.length),
              )
            }
          >
            Dictar las 7 con b <Headphones size={18} />
          </button>
        </div>
        <p>
          También puedes practicar con v:{" "}
          {supplementalVWords.map((w) => w.word).join(", ")}. Son palabras
          extra; no sabemos cuáles anotaron en clase.
        </p>
        <button
          className="secondary"
          disabled={busy}
          onClick={() =>
            void start(
              "spanish",
              "Palabras extra con v",
              "bv",
              bvQuestions(supplementalVWords, supplementalVWords.length),
            )
          }
        >
          Practicar palabras con v
        </button>
      </section>
      <VocabularyInvitation reading />
      <div className="section-heading">
        <h2>Lee y descubre</h2>
        <button
          className="text-button"
          onClick={() => setShowLessons(!showLessons)}
        >
          <Lightbulb size={17} />{" "}
          {showLessons ? "Cerrar guía" : "¿Cómo encuentro las respuestas?"}
        </button>
      </div>
      {showLessons && (
        <section className="panel lesson-grid">
          {lessons
            .filter((l) =>
              [
                "LITERAL",
                "SEQUENCE",
                "MAIN_IDEA",
                "DETAILS",
                "CAUSE_EFFECT",
                "INFERENCE",
                "CONTEXT_VOCABULARY",
                "EVIDENCE",
              ].includes(l.skill),
            )
            .map((l) => (
              <details key={l.skill}>
                <summary>{l.title}</summary>
                <p>
                  <GlossaryText>{l.body}</GlossaryText>
                </p>
                <div className="example">
                  <GlossaryText>{l.example}</GlossaryText>
                </div>
              </details>
            ))}
        </section>
      )}
      <div className="reading-grid">
        {passages.map((p, i) => (
          <button
            key={p.id}
            disabled={busy}
            className="reading-card"
            onClick={() =>
              void start("spanish", p.title, "reading", p.questions)
            }
          >
            <span className={`reading-mark mark-${i}`}>
              <BookOpen size={25} />
              <span>0{i + 1}</span>
            </span>
            <span className="eyebrow">{p.type}</span>
            <h3>{p.title}</h3>
            <span className="card-caption">
              {p.questions.length} preguntas <ArrowRight size={17} />
            </span>
          </button>
        ))}
      </div>
      <div className="section-heading">
        <h2>Elige qué practicar</h2>
      </div>
      <div className="practice-grid">
        <button
          className="practice-card"
          disabled={busy}
          onClick={() =>
            void start("spanish", "Párrafos, puntos y comas", "punctuation", [
              ...punctuation.filter((q) => q.skill === "PARAGRAPHS"),
              ...studyTopics.find((t) => t.id === "punctuation")!.questions,
            ])
          }
        >
          <PencilLine />
          <div>
            <h3>Párrafos, puntos y comas</h3>
            <p>Organiza tus ideas y practica los signos.</p>
          </div>
          <ArrowRight />
        </button>
        <button
          className="practice-card"
          disabled={busy}
          onClick={() =>
            void start(
              "spanish",
              "El significado de los refranes",
              "proverbs",
              proverbs,
            )
          }
        >
          <Lightbulb />
          <div>
            <h3>Refranes</h3>
            <p>Descubre qué consejo te dan.</p>
          </div>
          <ArrowRight />
        </button>
        <button
          className="practice-card"
          disabled={busy}
          onClick={() =>
            void start("spanish", "Detective de b y v", "bv", bvQuestions(bank))
          }
        >
          <span className="letter-icon">b/v</span>
          <div>
            <h3>Detective de b y v</h3>
            <p>Completa palabras de casa y escuela.</p>
          </div>
          <ArrowRight />
        </button>
        <button
          className="practice-card"
          disabled={busy}
          onClick={() =>
            void start(
              "spanish",
              "Escucha y escribe",
              "dictation",
              dictationQuestions(bank),
            )
          }
        >
          <Headphones />
          <div>
            <h3>Dictado con un adulto</h3>
            <p>Escucha, escribe y revisa la palabra.</p>
          </div>
          <ArrowRight />
        </button>
      </div>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
    </>
  );
}
export function MathScreen() {
  const [table, setTable] = useState(2),
    [show, setShow] = useState(true);
  const { start, busy, error } = useStart();
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">MUNDO DE LOS NÚMEROS</p>
          <h1>Matemáticas</h1>
          <p>Aprende con ejemplos y luego practica. No hay prisa.</p>
        </div>
        <span className="big-subject mint">
          <Calculator size={36} />
        </span>
      </div>
      <MathExam />
      <div className="section-heading">
        <h2>También practico mis tablas</h2>
      </div>
      <div className="math-layout">
        <section className="panel">
          <h2>¿Qué tabla quieres practicar?</h2>
          <p>Elige una tabla o practica todas juntas.</p>
          <div className="table-picker">
            {[1, 2, 5, 10, 3, 4, 6, 9, 7, 8].map((n) => (
              <button
                key={n}
                aria-pressed={table === n}
                className={table === n ? "selected" : ""}
                onClick={() => {
                  setTable(n);
                  setShow(true);
                }}
              >
                ×{n}
              </button>
            ))}
          </div>
          <button
            className={`mixed-button ${table === 0 ? "selected" : ""}`}
            aria-pressed={table === 0}
            onClick={() => setTable(0)}
          >
            <Sparkles size={18} /> Mezclar todas las tablas
          </button>
          <button
            className="primary full"
            disabled={busy}
            onClick={() =>
              void start(
                "math",
                table ? `La tabla del ${table}` : "Mezcla de tablas",
                `math:${table}`,
                mathQuestions(table),
              )
            }
          >
            Practicar {table ? `la tabla del ${table}` : "una mezcla"}{" "}
            <ArrowRight size={18} />
          </button>
          {error && <p className="error">{error}</p>}
        </section>
        <section className="panel">
          <div className="section-heading">
            <h2>Una pista antes de empezar</h2>
            <button className="text-button" onClick={() => setShow(!show)}>
              {show ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          {show && <MathLesson table={table} />}
        </section>
      </div>
    </>
  );
}
export function ProgressScreen() {
  const app = useApp(),
    p = useProgress();
  const sessions = [...app.sessions]
    .filter((s) => s.phase === "done")
    .sort((a, b) => b.finishedAt!.localeCompare(a.finishedAt!));
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">CADA PASO CUENTA</p>
          <h1>Mis descubrimientos</h1>
          <p>
            Tu avance se guarda aquí, en la tablet, el celular o la computadora
            que usas.
          </p>
        </div>
        <Compass size={44} />
      </div>
      <div className="stat-grid">
        <div className="panel stat">
          <Star />
          <strong>{p.xp}</strong>
          <span>Puntos ganados (XP)</span>
        </div>
        <div className="panel stat">
          <Flag />
          <strong>{p.completed}</strong>
          <span>Misiones terminadas</span>
        </div>
        <div className="panel stat">
          <Target />
          <strong>
            {pct(
              p.bySubject.spanish.correct + p.bySubject.math.correct,
              p.bySubject.spanish.total + p.bySubject.math.total,
            )}
          </strong>
          <span>Aciertos al primer intento</span>
        </div>
      </div>
      <div className="progress-columns">
        <section className="panel">
          <h2>Así vas por tema</h2>
          {!Object.keys(p.bySkill).length ? (
            <div className="empty">
              <Leaf />
              <p>Tu aventura está por comenzar.</p>
              <Link to="/espanol" className="inline-link">
                Elegir una misión <ArrowRight size={17} />
              </Link>
            </div>
          ) : (
            Object.entries(p.bySkill)
              .sort(
                (a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total,
              )
              .map(([skill, score]) => (
                <div className="skill-row" key={skill}>
                  <div>
                    <span>
                      <GlossaryText>
                        {skillNames[skill] ??
                          mathTopics.find((t) => t.id === skill)?.title ??
                          skill.replace("TABLE_", "Tabla del ")}
                      </GlossaryText>
                    </span>
                    <strong>
                      {score.correct}/{score.total}
                    </strong>
                  </div>
                  <div className="progress-track">
                    <span
                      style={{
                        width: `${(score.correct / score.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))
          )}
          <p className="fine-print">
            Aquí ves cómo te fue al practicar. No es una calificación de la
            escuela.
          </p>
        </section>
        <section className="panel">
          <h2>Mis últimas misiones</h2>
          {sessions.length === 0 ? (
            <p>Tus misiones terminadas aparecerán aquí.</p>
          ) : (
            sessions.slice(0, 12).map((s) => (
              <Link className="history-row" to={`/sesion/${s.id}`} key={s.id}>
                <span className="icon-tile small">
                  {s.subject === "math" ? (
                    <Calculator size={18} />
                  ) : (
                    <BookOpen size={18} />
                  )}
                </span>
                <div>
                  <strong>{s.title}</strong>
                  <span>
                    {new Intl.DateTimeFormat("es-MX", {
                      dateStyle: "medium",
                    }).format(new Date(s.finishedAt!))}
                  </span>
                </div>
                <ArrowRight size={17} />
              </Link>
            ))
          )}
        </section>
      </div>
    </>
  );
}
export function ParentScreen() {
  const app = useApp();
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">ACOMPAÑAR SU APRENDIZAJE</p>
          <h1>Zona de adultos</h1>
          <p>Progreso, recompensas y palabras para practicar.</p>
        </div>
        {app.parentUnlocked && (
          <button className="secondary" onClick={app.lock}>
            <LockKeyhole size={18} /> Bloquear
          </button>
        )}
      </div>
      <PinGate>
        <ParentControls />
      </PinGate>
    </>
  );
}
function ParentControls() {
  const app = useApp(),
    p = useProgress();
  const [limit, setLimit] = useState(String(app.settings.weeklyLimit / 100)),
    [message, setMessage] = useState(""),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [editing, setEditing] = useState(false),
    [bankText, setBankText] = useState(
      (app.settings.customWords ?? words)
        .map((w) => `${w.word} | ${w.dictationSentence}`)
        .join("\n"),
    );
  const week = weekId(),
    earned = app.rewards
      .filter((r) => r.weekId === week)
      .reduce((n, r) => n + r.amountGranted, 0),
    pending = app.rewards
      .filter((r) => r.status === "EARNED")
      .reduce((n, r) => n + r.amountGranted, 0);
  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setBusy(true);
    try {
      await repositories.settings.save({
        ...(await repositories.settings.get()),
        weeklyLimit: Math.round(Number(limit) * 100),
      });
      await app.refresh();
      setMessage("Ajustes guardados.");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function saveBank() {
    setBusy(true);
    setError("");
    try {
      const lines = bankText.split("\n").filter((s) => s.trim());
      if (lines.length < 8 || lines.length > 100)
        throw Error("Incluye entre 8 y 100 palabras.");
      const entries: WordEntry[] = lines.map((line, i) => {
        const [raw, ...rest] = line.split("|"),
          word = raw.trim().toLocaleLowerCase("es-MX"),
          sentence = rest.join("|").trim();
        if (
          !/^[a-záéíóúüñ]+$/i.test(word) ||
          !/[bv]/.test(word) ||
          !sentence.toLocaleLowerCase("es-MX").includes(word)
        )
          throw Error(
            `Revisa la línea ${i + 1}: palabra con b/v y una frase que la incluya.`,
          );
        return {
          id: `custom-${i}-${word}`,
          word,
          level: 1,
          dictationSentence: sentence,
          completion: {
            prompt: word.replace(/[bv]/g, "_"),
            answers: [...word].filter((c) => /[bv]/.test(c)),
          },
          feedback: `Así se escribe: «${word}». Mira cada letra con calma.`,
        };
      });
      if (new Set(entries.map((w) => w.word)).size !== entries.length)
        throw Error("Hay palabras repetidas.");
      await repositories.settings.save({
        ...(await repositories.settings.get()),
        customWords: entries,
      });
      await app.refresh();
      setEditing(false);
      setMessage(
        "Lista de palabras guardada. Se usará en las nuevas misiones.",
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <div className="stat-grid">
        <div className="panel stat">
          <Trophy />
          <strong>{money(earned)}</strong>
          <span>Ganado esta semana</span>
        </div>
        <div className="panel stat">
          <Flag />
          <strong>{money(pending)}</strong>
          <span>Pendiente de entregar</span>
        </div>
        <div className="panel stat">
          <Star />
          <strong>{p.completed}</strong>
          <span>Sesiones terminadas</span>
        </div>
      </div>
      <div className="progress-columns">
        <section className="panel">
          <h2>Recompensa semanal</h2>
          <p>
            Presupuesto dedicado al examen de Español: 10% por cada uno de los
            ocho temas y el resto para el repaso de 20 preguntas. Requiere 5 de
            6 o 16 de 20 aciertos al primer intento sin ayuda. Matemáticas y
            otras prácticas conservan sus puntos, pero no conceden dinero por
            ahora.
          </p>
          <form onSubmit={save}>
            <label>
              Máximo para premios por semana (pesos)
              <input
                type="number"
                min="0"
                max="10000"
                step="0.01"
                required
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              />
            </label>

            <button className="primary" disabled={busy}>
              Guardar ajustes
            </button>
          </form>
          <p className="fine-print">
            Cada premio se gana una sola vez por semana. Si queda poco dinero
            para premios, se guarda solo esa cantidad. Si ya no queda dinero, el
            premio es de $0 y ese reto cuenta como terminado esa semana. Lo que
            falte no pasa a la siguiente semana. Cambiar estos ajustes no cambia
            los premios que ya se ganaron.
          </p>
        </section>
        <section className="panel">
          <h2>Historial de recompensas</h2>
          {!app.rewards.length ? (
            <p>
              Aún no hay premios. Judy puede seguir ganando puntos (XP) al
              practicar.
            </p>
          ) : (
            [...app.rewards]
              .sort((a, b) => b.earnedAt.localeCompare(a.earnedAt))
              .map((r) => (
                <div className="reward-row" key={r.id}>
                  <div>
                    <strong>{money(r.amountGranted)}</strong>
                    <span>Semana del {r.weekId}</span>
                    <small>{r.reason}</small>
                  </div>
                  {r.status === "PAID" ? (
                    <span className="chip">
                      <Check size={14} /> Entregado
                    </span>
                  ) : r.amountGranted > 0 ? (
                    <button
                      disabled={busy}
                      className="secondary"
                      onClick={async () => {
                        setBusy(true);
                        setError("");
                        try {
                          await repositories.rewards.markPaid(r.id);
                          await app.refresh();
                        } catch {
                          setError("No se pudo registrar el pago.");
                        } finally {
                          setBusy(false);
                        }
                      }}
                    >
                      Marcar entregado
                    </button>
                  ) : (
                    <span className="chip">Sin dinero para entregar</span>
                  )}
                </div>
              ))
          )}
          <p className="fine-print">
            Un adulto entrega el dinero. Aquí anotas qué premios ya entregaste.
            Aunque marques un premio como entregado, ese dinero sigue contando
            dentro del máximo de la semana.
          </p>
        </section>
      </div>
      <section className="panel bank-panel">
        <div className="section-heading">
          <div>
            <h2>Palabras para b/v y dictado</h2>
            <p>
              {(app.settings.customWords ?? words).length} palabras · Práctica
              general
            </p>
          </div>
          <button className="secondary" onClick={() => setEditing(!editing)}>
            {editing ? "Cerrar editor" : "Editar palabras"}
          </button>
        </div>
        {editing ? (
          <>
            <label>
              Una palabra y su frase por línea, separadas por |
              <textarea
                rows={12}
                value={bankText}
                onChange={(e) => setBankText(e.target.value)}
              />
            </label>
            <button
              className="primary"
              disabled={busy}
              onClick={() => void saveBank()}
            >
              Guardar palabras
            </button>
          </>
        ) : (
          <div className="word-tags">
            {(app.settings.customWords ?? words).map((w) => (
              <span key={w.id}>{w.word}</span>
            ))}
          </div>
        )}
      </section>
      {message && (
        <p className="notice" role="status">
          {message}
        </p>
      )}
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <Link className="inline-link" to="/progreso">
        Ver resultados por tema <ArrowRight size={18} />
      </Link>
    </>
  );
}
