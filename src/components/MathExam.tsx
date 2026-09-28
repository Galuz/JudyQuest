import { useState } from "react";
import { ArrowRight, BookOpen, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../state";
import { useStart } from "../useStart";
import {
  mathTopics,
  mathExamQuestions,
  mathReviewQuestions,
  pendingMathErrors,
  type MathTopic,
} from "../content/math-exam";
import type { Question } from "../domain/types";

export function FractionBars({
  bars,
}: {
  bars: NonNullable<Question["fractionBars"]>;
}) {
  return (
    <div className="fraction-bars">
      {bars.map(({ numerator, denominator }, i) => (
        <div key={i}>
          <div
            className="fraction-bar"
            role="img"
            aria-label={`${numerator} de ${denominator} partes iguales pintadas; un entero completo es toda la barra`}
          >
            {Array.from({ length: denominator }, (_, part) => (
              <span key={part} className={part < numerator ? "painted" : ""} />
            ))}
          </div>
          <p className="fine-print">
            {numerator} de {denominator} partes pintadas · Las barras
            representan enteros del mismo tamaño.
          </p>
        </div>
      ))}
    </div>
  );
}

export function MathGuide({ topic }: { topic: MathTopic }) {
  return (
    <div className="math-guide">
      <p>
        <strong>{topic.goal}</strong>
      </p>
      <ol>
        {topic.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <div className="example">
        <strong>Lo hacemos juntos</strong>
        {topic.example.map((line) => (
          <p key={line}>{line}</p>
        ))}
        {topic.bars && <FractionBars bars={topic.bars} />}
      </div>
      <p className="math-remember">
        <strong>Recuerda:</strong> {topic.remember}
      </p>
    </div>
  );
}

function FractionExplorer() {
  const [denominator, setDenominator] = useState(4),
    [numerator, setNumerator] = useState(3);
  const names: Record<number, string> = {
    2: "medios",
    3: "tercios",
    4: "cuartos",
    5: "quintos",
    6: "sextos",
    8: "octavos",
    10: "décimos",
  };
  return (
    <details className="panel fraction-explorer">
      <summary>Prueba con una barra de fracciones</summary>
      <p>
        El entero no cambia de tamaño. Cambia cuántas partes iguales tiene y
        cuántas pintas.
      </p>
      <div className="fraction-controls">
        <label>
          Partes iguales (denominador)
          <select
            value={denominator}
            onChange={(e) => {
              const d = Number(e.target.value);
              setDenominator(d);
              setNumerator(Math.min(numerator, d));
            }}
          >
            {[2, 3, 4, 5, 6, 8, 10].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
        <label>
          Partes pintadas (numerador)
          <select
            value={numerator}
            onChange={(e) => setNumerator(Number(e.target.value))}
          >
            {Array.from({ length: denominator + 1 }, (_, n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div aria-live="polite">
        <p className="fraction-value">
          {numerator}/{denominator} · {numerator}{" "}
          {numerator === 1
            ? names[denominator].slice(0, -1)
            : names[denominator]}
        </p>
        <FractionBars bars={[{ numerator, denominator }]} />
      </div>
    </details>
  );
}

export function MathExam() {
  const app = useApp(),
    { start, busy, error } = useStart();
  const pending = pendingMathErrors(app.sessions);
  const lastExam = [...app.sessions]
    .filter((s) => s.mode === "math-study-exam" && s.phase === "done")
    .sort((a, b) =>
      (b.finishedAt ?? b.createdAt).localeCompare(a.finishedAt ?? a.createdAt),
    )[0];
  return (
    <section className="exam-study math-exam" aria-labelledby="math-exam-title">
      <div className="exam-banner">
        <div>
          <span className="chip">MI EXAMEN · TEMARIO DE LAS PÁGINAS 12–22</span>
          <h2 id="math-exam-title">Me preparo para Matemáticas</h2>
          <p>
            Primero entiende un tema. Luego practica y termina con un repaso
            mezclado. Puedes usar papel y lápiz; no hay reloj.
          </p>
        </div>
        <button
          className="primary"
          disabled={busy}
          onClick={() =>
            void start(
              "math",
              "Repaso de mi examen de Matemáticas",
              "math-study-exam",
              mathExamQuestions(),
            )
          }
        >
          Repaso de 16 preguntas <ArrowRight size={18} />
        </button>
      </div>
      {lastExam && (
        <p>
          <Link className="text-button" to={`/sesion/${lastExam.id}`}>
            Ver mi último repaso de Matemáticas
          </Link>
        </p>
      )}
      <div className="study-review panel">
        <div>
          <h3>
            <RotateCcw size={20} /> Practico lo que me costó
          </h3>
          <p>
            {pending.length
              ? `Tienes ${pending.length} ${pending.length === 1 ? "pregunta" : "preguntas"} por reforzar. Haremos hasta 6 con otros ejemplos.`
              : "Si algo te cuesta, aquí podrás practicarlo otra vez con ayuda paso a paso."}
          </p>
        </div>
        <button
          className="secondary"
          disabled={busy || !pending.length}
          onClick={() =>
            void start(
              "math",
                  "Refuerzo mis Matemáticas",
              "math-study-review",
              mathReviewQuestions(app.sessions),
            )
          }
        >
          Repasar mis errores de Matemáticas
        </button>
      </div>
      <FractionExplorer />
      <div className="section-heading">
        <h3>Un paso a la vez</h3>
        <span>8 temas · 8 preguntas por tema</span>
      </div>
      <div className="study-grid">
        {mathTopics.map((topic, i) => {
          const last = [...app.sessions]
            .filter(
              (s) =>
                s.mode === `math-study-topic:${topic.id}` && s.phase === "done",
            )
            .sort((a, b) =>
              (b.finishedAt ?? b.createdAt).localeCompare(
                a.finishedAt ?? a.createdAt,
              ),
            )[0];
          const attempts = last?.attempts.filter((a) => !a.retry);
          return (
            <article className="panel study-card" key={topic.id}>
              <span className="eyebrow">
                {i + 1}. PÁGINAS {topic.pages}
              </span>
              <h3>{topic.title}</h3>
              <p>{topic.goal}</p>
              {attempts && (
                <p className="fine-print">
                  Última práctica: {attempts.filter((a) => a.correct).length}/
                  {attempts.length} al primer intento ·{" "}
                  {attempts.filter((a) => a.assisted).length} con ayuda
                </p>
              )}
              {last && (
                <Link className="text-button" to={`/sesion/${last.id}`}>
                  Ver mi resultado
                </Link>
              )}
              <details>
                <summary>
                  <BookOpen size={17} /> Entender: {topic.title}
                </summary>
                <MathGuide topic={topic} />
              </details>
              <button
                className="secondary full"
                disabled={busy}
                onClick={() =>
                  void start(
                    "math",
                    topic.title,
                    `math-study-topic:${topic.id}`,
                    topic.questions,
                  )
                }
              >
                Practicar: {topic.title} <ArrowRight size={17} />
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
