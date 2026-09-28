import { Link } from "react-router-dom";
import { useState } from "react";
import { useApp } from "../state";
import { weekId } from "../domain/engines";
import { examChallenges, examPrize } from "../domain/exam-rewards";
import { soundEnabled, setRewardSound } from "../reward-sound";

export const prizeMoney = (cents: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
    cents / 100,
  );

export function ExamRewards({ compact = false }: { compact?: boolean }) {
  const app = useApp();
  const [sound, setSound] = useState(soundEnabled);
  const rewards = app.rewards.filter((r) => r.weekId === weekId());
  const earned = rewards.reduce((n, r) => n + r.amountGranted, 0);
  const remaining = Math.max(0, app.settings.weeklyLimit - earned);
  return (
    <section className="panel exam-rewards" aria-label="Premios para mi examen">
      <span className="chip">MIS PREMIOS DE ESPAÑOL</span>
      <h2>¡Aprender tiene premio!</h2>
      <p>
        Todo el presupuesto de esta semana es para preparar tu examen. Cada tema
        tiene un premio y el repaso mezclado tiene otro.
      </p>
      <div className="reward-totals">
        <strong>{prizeMoney(earned)} ganados</strong>
        <span>{prizeMoney(remaining)} disponibles</span>
      </div>
      <progress
        aria-label="Presupuesto ganado esta semana"
        max={Math.max(1, app.settings.weeklyLimit)}
        value={Math.min(earned, app.settings.weeklyLimit)}
      />
      <p>
        Gana con <strong>5 de 6</strong> respuestas correctas en cada tema o{" "}
        <strong>16 de 20</strong> en el repaso: al primer intento y sin pistas.
        Puedes estudiar con ayuda y volver a practicar para ganar.
      </p>
      {!compact && (
        <ul className="reward-milestones">
          {examChallenges.map((c) => {
            const reward = rewards.find((r) => r.challengeId === c.id);
            return (
              <li key={c.id}>
                <span>{c.title}</span>
                <strong>
                  {reward
                    ? reward.amountGranted > 0
                      ? `✓ ${prizeMoney(reward.amountGranted)}`
                      : "Completado · sin presupuesto"
                    : `Hasta ${prizeMoney(Math.min(examPrize(app.settings.weeklyLimit, c.id), remaining))}`}
                </strong>
              </li>
            );
          })}
        </ul>
      )}
      <p className="fine-print">
        Cada premio se gana una vez por semana. Repetirlo da práctica, no más
        dinero. Los premios anteriores también cuentan para el límite. Un adulto
        te entrega el dinero.
      </p>
      <div className="button-row">
        <button
          className="secondary"
          aria-pressed={sound}
          onClick={() => {
            setRewardSound(!sound);
            setSound(!sound);
          }}
        >
          {sound ? "Sonido y voz: activados" : "Sonido y voz: apagados"}
        </button>
        {compact && (
          <Link className="primary" to="/espanol">
            Ver mis retos de Español
          </Link>
        )}
      </div>
    </section>
  );
}
