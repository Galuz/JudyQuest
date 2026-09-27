import { useState, type ReactNode } from "react";
import { LockKeyhole } from "lucide-react";
import { useApp } from "../state";
import { repositories } from "../data/repositories";
import { createPin, verifyPin } from "../domain/pin";
export function PinGate({ children }: { children: ReactNode }) {
  const app = useApp();
  const [pin, setPin] = useState(""),
    [confirm, setConfirm] = useState(""),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  if (app.parentUnlocked) return <>{children}</>;
  const setup = !app.settings.pinHash;
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const settings = await repositories.settings.get();
      if (settings.lockedUntil > Date.now())
        throw Error("Espera 30 segundos antes de volver a intentarlo.");
      if (!settings.pinHash) {
        if (pin !== confirm) throw Error("Los dos PIN deben ser iguales.");
        await repositories.settings.save({
          ...settings,
          ...(await createPin(pin)),
        });
      } else {
        if (!(await verifyPin(pin, settings))) {
          const failed = settings.failedAttempts + 1;
          await repositories.settings.save({
            ...settings,
            failedAttempts: failed >= 5 ? 0 : failed,
            lockedUntil: failed >= 5 ? Date.now() + 30000 : 0,
          });
          throw Error("PIN incorrecto. Inténtalo de nuevo.");
        }
        await repositories.settings.save({
          ...settings,
          failedAttempts: 0,
          lockedUntil: 0,
        });
      }
      await app.refresh();
      setPin("");
      setConfirm("");
      app.unlock();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="panel pin-panel">
      <span className="icon-tile">
        <LockKeyhole />
      </span>
      <h2>{setup ? "Un momento para el adulto" : "Zona de adultos"}</h2>
      <p>
        {setup
          ? "Crea una clave de 4 a 8 números (PIN) para proteger los ajustes y preparar los dictados. Guárdala en un lugar seguro."
          : "Escribe tu clave de números (PIN) para entrar."}
      </p>
      <form onSubmit={submit}>
        <label>
          PIN {setup ? "nuevo" : ""}
          <input
            type="password"
            inputMode="numeric"
            autoComplete="off"
            minLength={4}
            maxLength={8}
            pattern="[0-9]{4,8}"
            required
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
        </label>
        {setup && (
          <label>
            Repite el PIN
            <input
              type="password"
              inputMode="numeric"
              autoComplete="off"
              required
              minLength={4}
              maxLength={8}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </label>
        )}
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <button className="primary" disabled={busy}>
          {busy ? "Comprobando…" : setup ? "Crear PIN y continuar" : "Entrar"}
        </button>
      </form>
      <p className="fine-print">
        El PIN protege los controles de esta app en este dispositivo.
      </p>
    </section>
  );
}
