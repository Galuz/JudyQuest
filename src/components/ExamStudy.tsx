import { ArrowRight, BookOpen, RotateCcw } from "lucide-react";
import { useApp } from "../state";
import { Link } from "react-router-dom";
import { weekId } from "../domain/engines";
import { useStart } from "../useStart";
import {
  bvQuestions,
  classroomWords,
  supplementalVWords,
} from "../content/spanish";
import {
  pendingStudyErrors,
  studyExamQuestions,
  studyReviewQuestions,
  studyTopics,
  topicQuestions,
} from "../content/exam-study";
import { GlossaryText } from "./Glossary";
import { ExamRewards } from "./ExamRewards";

export function ExamStudy() {
  const app = useApp();
  const { start, busy, error } = useStart();
  const pending = pendingStudyErrors(app.sessions);
  return (
    <section className="exam-study" aria-labelledby="study-title">
      <ExamRewards />
      <div className="exam-banner">
        <div>
          <span className="chip">MI LIBRO · PÁGINAS 12–31</span>
          <h2 id="study-title">Me preparo para Español</h2>
          <p>
            Empieza por un tema o mezcla lo que has aprendido. Puedes leer con
            calma y tocar las palabras subrayadas.
          </p>
        </div>
        <button
          className="primary"
          disabled={busy}
          onClick={() =>
            void start(
              "spanish",
              "Repaso de mi examen de Español",
              "study-exam",
              studyExamQuestions([
                ...bvQuestions(classroomWords, 2),
                ...bvQuestions(supplementalVWords, 2),
              ]),
            )
          }
        >
          Repaso de 20 preguntas <ArrowRight size={18} />
        </button>
      </div>
      <div className="study-review panel">
        <div>
          <h3>
            <RotateCcw size={20} /> Repasar mis errores
          </h3>
          <p>
            {pending.length
              ? `Tienes ${pending.length} ${pending.length === 1 ? "pregunta por reforzar" : "preguntas por reforzar"}. Practicaremos hasta 6 con otros ejemplos cuando sea posible.`
              : "Aquí aparecerá lo que necesites practicar después de responder. Equivocarte también te ayuda a aprender."}
          </p>
        </div>
        <button
          className="secondary"
          disabled={busy || !pending.length}
          onClick={() =>
            void start(
              "spanish",
              "Practico lo que me costó",
              "study-review",
              studyReviewQuestions(app.sessions),
            )
          }
        >
          Practicar mis errores
        </button>
      </div>
      <div className="section-heading">
        <h3>Un tema a la vez</h3>
        <span>6 preguntas por misión</span>
      </div>
      <div className="study-grid">
        {studyTopics.map((t, i) => {
          const sessions = app.sessions
            .filter(
              (s) => s.mode === `study-topic:${t.id}` && s.phase === "done",
            )
            .sort((a, b) =>
              (b.finishedAt ?? b.createdAt).localeCompare(
                a.finishedAt ?? a.createdAt,
              ),
            );
          const attempts = sessions[0]?.attempts.filter((a) => !a.retry);
          const reward = app.rewards.find(
            (r) =>
              r.challengeId === `exam-topic:${t.id}` && r.weekId === weekId(),
          );
          return (
            <article className="panel study-card" key={t.id}>
              <span className="eyebrow">
                {i + 1}. PÁGINAS {t.pages}
              </span>
              <h3>{t.title}</h3>
              {sessions.length > 0 && (
                <span className="chip">✓ Tema completado</span>
              )}
              {reward && (
                <p className="fine-print">
                  {reward.amountGranted > 0
                    ? "✓ Premio de esta semana ganado"
                    : "Reto de esta semana completado sin presupuesto"}
                </p>
              )}
              <p className="fine-print">
                {attempts
                  ? `Última práctica: ${attempts.filter((a) => a.correct).length}/${attempts.length} al primer intento`
                  : "Explicación, ejemplo y práctica"}
              </p>
              {sessions[0] && (
                <Link className="text-button" to={`/sesion/${sessions[0].id}`}>
                  Ver mi resultado
                </Link>
              )}
              <details>
                <summary>
                  <BookOpen size={17} /> Entender el tema
                </summary>
                <p>
                  <GlossaryText>{t.body}</GlossaryText>
                </p>
                <div className="example">
                  <GlossaryText>{t.example}</GlossaryText>
                </div>
              </details>
              <button
                className="secondary full"
                disabled={busy}
                onClick={() =>
                  void start(
                    "spanish",
                    t.title,
                    `study-topic:${t.id}`,
                    topicQuestions(t),
                  )
                }
              >
                {sessions.length ? "Volver a practicar" : "Practicar este tema"}{" "}
                <ArrowRight size={17} />
              </button>
            </article>
          );
        })}
      </div>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
