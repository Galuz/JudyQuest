import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { useApp } from "../state";
import { useStart } from "../useStart";
import { vocabulary } from "../content/vocabulary";
import {
  readingVocabulary,
  studyDay,
  vocabularyPlan,
  vocabularyStatus,
} from "../domain/vocabulary";
import { GlossaryText } from "./Glossary";

export function VocabularyInvitation({
  reading = false,
}: {
  reading?: boolean;
}) {
  const app = useApp(),
    { start, busy, error } = useStart();
  const questions = readingVocabulary(app.vocabulary);
  const pending = app.sessions.find(
    (s) => s.mode === "vocabulary-reading" && s.phase !== "done",
  );
  return (
    <section className="panel vocabulary-invitation">
      <span className="icon-tile amber">
        <BookOpen />
      </span>
      <div>
        <h2>Aprender palabras nuevas</h2>
        <p>
          Descubre qué significan y vuelve a encontrarlas en pequeñas historias.
        </p>
        <Link className="inline-link" to="/palabras">
          Mis palabras <ArrowRight size={17} />
        </Link>
      </div>
      {reading &&
        (pending ? (
          <Link className="secondary" to={`/sesion/${pending.id}`}>
            Continuar mi lectura
          </Link>
        ) : questions.length > 0 ? (
          <button
            className="secondary"
            disabled={busy}
            onClick={() =>
              void start(
                "spanish",
                "Leer con mis palabras",
                "vocabulary-reading",
                questions,
              )
            }
          >
            Leer con mis palabras
          </button>
        ) : (
          <p className="fine-print">
            Primero descubre dos palabras. Después podrás usarlas aquí.
          </p>
        ))}
      {error && <p role="alert">{error}</p>}
    </section>
  );
}

export function VocabularyScreen() {
  const app = useApp(),
    { start, busy, error } = useStart();
  const plan = vocabularyPlan(app.vocabulary);
  const byId = new Map(app.vocabulary.map((p) => [p.id, p]));
  const pending = app.sessions
    .filter((s) => s.mode.startsWith("vocabulary") && s.phase !== "done")
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
  const remembered = app.vocabulary.filter(
    (p) => p.status === "remembered" || p.status === "retained",
  ).length;
  const discovered = app.vocabulary.filter((p) => p.attempts > 0).length;
  const readings = readingVocabulary(app.vocabulary);
  const today = studyDay(new Date());
  return (
    <>
      <Link className="back-link" to="/espanol">
        ← Volver a Español
      </Link>
      <div className="page-heading">
        <div>
          <p className="eyebrow">UN POQUITO CADA DÍA</p>
          <h1>Aprender palabras nuevas</h1>
          <p>¿Ya la conoces? Pruébala. ¿Es nueva? La descubrimos juntas.</p>
        </div>
        <span className="big-subject amber">
          <Sparkles size={36} />
        </span>
      </div>
      <section className="panel vocabulary-daily">
        <div>
          <span className="chip">TU RATITO DE PALABRAS</span>
          <h2>
            {pending
              ? "Seguimos donde te quedaste"
              : plan.questions.length
                ? "Un pequeño paso para hoy"
                : "¡Por hoy ya está!"}
          </h2>
          <p>
            {pending
              ? pending.title
              : plan.questions.length
                ? `${plan.fresh.length} palabras nuevas y ${Math.min(3, plan.due.length)} para repasar. Sin reloj ni prisas.`
                : "Vuelve mañana para descubrir más palabras. Si quieres, hoy puedes leer con las que ya practicaste."}
          </p>
          <p className="fine-print">
            Puedes decir «Todavía no la conozco» o tocar una palabra subrayada.
            Pedir ayuda está bien.
          </p>
        </div>
        {pending ? (
          <Link className="primary" to={`/sesion/${pending.id}`}>
            Continuar mis palabras <ArrowRight size={18} />
          </Link>
        ) : plan.questions.length > 0 ? (
          <button
            className="primary"
            disabled={busy}
            onClick={() =>
              void start(
                "spanish",
                "Mis palabras de hoy",
                "vocabulary-daily",
                plan.questions,
              )
            }
          >
            Empezar mis palabras <ArrowRight size={18} />
          </button>
        ) : (
          readings.length > 0 && (
            <button
              className="primary"
              disabled={busy}
              onClick={() =>
                void start(
                  "spanish",
                  "Leer con mis palabras",
                  "vocabulary-reading",
                  readings,
                )
              }
            >
              Leer con mis palabras
            </button>
          )
        )}
        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}
      </section>
      <div className="section-heading">
        <h2>Mi colección de palabras</h2>
        <span>
          {discovered} exploradas · {remembered} recordadas · 20 en total
        </span>
      </div>
      <p className="glossary-hint">
        Toca una palabra para ver su significado y un ejemplo. Mirarla no la
        marca como aprendida.
      </p>
      <div className="vocabulary-grid">
        {vocabulary.map((w) => {
          const p = byId.get(w.id);
          return (
            <article className="panel vocabulary-word-card" key={w.id}>
              <span
                className={`chip word-status status-${p?.status ?? "discover"}`}
              >
                {vocabularyStatus[p?.status ?? "discover"]}
              </span>
              <h3>
                <GlossaryText>{w.word}</GlossaryText>
              </h3>
              <p className="fine-print">
                {p?.nextReviewAt
                  ? p.nextReviewAt <= today
                    ? "Lista para repasar hoy"
                    : `Volvemos a verla el ${new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "long", timeZone: "UTC" }).format(new Date(`${p.nextReviewAt}T12:00:00Z`))}`
                  : p?.helpCount
                    ? "Ya viste su significado. Pronto la practicaremos."
                    : "La iremos descubriendo paso a paso."}
              </p>
            </article>
          );
        })}
      </div>
      <details className="panel vocabulary-about">
        <summary>¿Cómo sabe la app que la recuerdo?</summary>
        <p>
          Acertar una vez es un buen comienzo. Para marcar «La recuerdo»,
          necesitas acertar sin ayuda en tres actividades diferentes y en tres
          días distintos. Una de esas actividades será una lectura.
        </p>
        <p>
          Si miras un significado, las respuestas de esa palabra durante ese día
          cuentan como práctica con ayuda. Si algo se te olvida, te lo
          explicamos y volvemos a repasarlo.
        </p>
        <p>
          Estos ejercicios comprueban si entiendes la palabra al leer.
          Escribirla bien y usarla al hablar son habilidades que se practican
          aparte.
        </p>
        <p className="fine-print">
          Tu colección se guarda en este navegador. Los repasos de palabras no
          dan premios en dinero.
        </p>
      </details>
    </>
  );
}
