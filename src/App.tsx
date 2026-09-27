import { useEffect, useState } from "react";
import {
  HashRouter,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  BookOpen,
  Compass,
  Home as HomeIcon,
  LockKeyhole,
  WifiOff,
  CheckCircle2,
  Download,
} from "lucide-react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { AppProvider, useApp } from "./state";
import {
  Home,
  MathScreen,
  ParentScreen,
  ProgressScreen,
  Spanish,
} from "./screens";
import { SessionRunner } from "./components/SessionRunner";
import { GlossaryProvider } from "./components/Glossary";
import { VocabularyScreen } from "./components/VocabularyScreen";
function Shell() {
  const app = useApp(),
    location = useLocation();
  const [online, setOnline] = useState(navigator.onLine),
    [installHelp, setInstallHelp] = useState(false);
  const {
    offlineReady: [offlineReady],
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW();
  useEffect(() => {
    const f = () => setOnline(navigator.onLine);
    window.addEventListener("online", f);
    window.addEventListener("offline", f);
    return () => {
      window.removeEventListener("online", f);
      window.removeEventListener("offline", f);
    };
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <NavLink className="brand" to="/">
            <span className="brand-mark">J</span>Judy<span>Quest</span>
          </NavLink>
          <nav aria-label="Navegación principal">
            <NavLink to="/" end>
              <HomeIcon size={18} />
              Inicio
            </NavLink>
            <NavLink to="/espanol">
              <BookOpen size={18} />
              Aprender
            </NavLink>
            <NavLink to="/progreso">
              <Compass size={18} />
              Mi progreso
            </NavLink>
          </nav>
          <NavLink
            className="parent-link"
            to="/adultos"
            aria-label="Zona de adultos"
          >
            <LockKeyhole size={18} />
            <span>Adultos</span>
          </NavLink>
        </div>
      </header>
      <main>
        {app.loading ? (
          <section className="panel">
            <p>Preparando tu aventura…</p>
          </section>
        ) : app.error ? (
          <section className="panel">
            <h1>No pudimos abrir tus datos</h1>
            <p role="alert">{app.error}</p>
            <button className="primary" onClick={() => void app.refresh()}>
              Intentar de nuevo
            </button>
          </section>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/espanol" element={<Spanish />} />
            <Route path="/palabras" element={<VocabularyScreen />} />
            <Route path="/matematicas" element={<MathScreen />} />
            <Route path="/progreso" element={<ProgressScreen />} />
            <Route path="/adultos" element={<ParentScreen />} />
            <Route path="/sesion/:id" element={<SessionRunner />} />
            <Route path="*" element={<Home />} />
          </Routes>
        )}
        {needRefresh && !location.pathname.startsWith("/sesion/") && (
          <div className="update-notice">
            <p>Hay una nueva versión de la app. Tu avance seguirá guardado.</p>
            <button
              className="secondary"
              onClick={() => void updateServiceWorker(true)}
            >
              Actualizar ahora
            </button>
          </div>
        )}
        {installHelp && (
          <section className="panel install-help">
            <h2>Lleva JudyQuest a tu tablet</h2>
            <p>
              <strong>iPad:</strong> abre esta dirección en Safari → Compartir →
              Añadir a pantalla de inicio.
            </p>
            <p>
              <strong>Android:</strong> abre en Chrome → menú ⋮ → Instalar
              aplicación o Añadir a pantalla de inicio.
            </p>
            <p>
              La primera vez necesitas internet. Espera el aviso «Lista para
              usar sin internet» antes de desconectarte. Tus datos se guardan en
              este navegador. Pide ayuda a un adulto para instalar la app. No
              borren sus datos ni usen el modo privado para estudiar.
            </p>
            <button className="secondary" onClick={() => setInstallHelp(false)}>
              Entendido
            </button>
          </section>
        )}
      </main>
      <footer>
        <span>
          {!online ? (
            <>
              <WifiOff size={15} /> Sin internet · puedes seguir practicando
            </>
          ) : offlineReady ? (
            <>
              <CheckCircle2 size={15} /> Lista para usar sin internet
            </>
          ) : (
            <>JudyQuest · Aprende a tu ritmo</>
          )}
        </span>
        <button
          className="text-button"
          onClick={() => setInstallHelp(!installHelp)}
        >
          <Download size={15} /> Cómo instalar
        </button>
      </footer>
    </>
  );
}
export default function App() {
  return (
    <AppProvider>
      <GlossaryProvider>
        <HashRouter>
          <Shell />
        </HashRouter>
      </GlossaryProvider>
    </AppProvider>
  );
}
