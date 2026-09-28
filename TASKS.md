# JudyQuest — Tasks

## Estado actual

Módulo del examen de Matemáticas añadido a partir del temario enviado el 28 de septiembre: ocho temas, 64 preguntas, guías y dibujos, repaso mixto de 16 y repaso de errores. Contenido original; páginas del libro no proporcionadas. La práctica en el dispositivo de Judy sigue pendiente. Mantiene las tablas existentes y el presupuesto de Español.

Transición de hosting autorizada: mantener Sites activo para la instalación actual de Judy y publicar GitHub Pages automáticamente desde `main`. Retirar Sites solo cuando el adulto lo indique; el progreso entre dominios no se sincroniza. Ver README → Publicación.

Código R1 implementado. El 28 de septiembre se corrigió lint y se aprobaron 45 pruebas, tipos/build y precache; este último se añadió a CI. Evidencia y límites en [docs/validacion-r1.md](docs/validacion-r1.md). El usuario confirmó instalación y actualización; siguen pendientes las demás comprobaciones en tablet, offline real y prueba con Judy. Los checks de implementación no significan aceptación del usuario.

## Vocabulario con ayuda

- [x] Añadir glosario local con significados sencillos y ejemplos.
- [x] Subrayar palabras consultables en lecturas, preguntas, opciones y explicaciones.
- [x] Abrir y cerrar la ayuda sin salir de la misión.
- [x] Verificar en navegador que consultar una palabra no selecciona una respuesta (abrir «oraciones», cerrar, elegir y comprobar respuesta).
- [ ] Probar con Judy qué definiciones necesitan más claridad.
- Criterio permanente: revisar y ampliar el glosario al agregar contenido nuevo.

## Aprender palabras nuevas — ampliación autorizada

- [x] Analizar candidatas de 4.º/5.º antes de implementar; sexto queda para después.
- [x] Preparar las primeras 20 fichas con 80 actividades y lecturas distintas.
- [x] Añadir diagnóstico breve, opción de desconocimiento y ejemplos guiados.
- [x] Persistir estados, ayudas, respuestas y calendario en IndexedDB v3.
- [x] Evitar dominio por consultas, reintentos, práctica temprana o repetición el mismo día.
- [x] Integrar «Leer con mis palabras» en Español y reanudar sesiones guardadas.
- [x] Probar migración conservando sesiones, ajustes, perfil y recompensas.
- [x] Aprobar 45 pruebas automatizadas, tipos/build, lint y verificación del precache.
- [x] Comprobar en navegador desconocimiento, ayuda, acierto, salida y reanudación tras cerrar la pestaña.
- [x] Verificar que Español habilita lecturas con palabras practicadas y contextos nuevos.
- [ ] Validar con Judy las primeras 20 palabras antes de ampliar a las otras 100 candidatas.
- [ ] Comprobar instalación/offline y conservación en su tablet.

## Cómo ejecutar este backlog

Actualizado el 28 de septiembre de 2026. Examen de Español: 28 de septiembre de 2026.

Ejecutar R1.0 → R1.1 Lectura → R1.2 Matemáticas → R1.3 integración → R1.4 verificación → R1.5 instalación y prueba del adulto.

R1 se considera terminado según SPEC.md, sección 0. Las funcionalidades R2 y R3 se mantienen pendientes y NO bloquean la primera entrega. Las comprobaciones técnicas se hacen durante el desarrollo; no pedir al adulto instalar/probar antes de completar ambos módulos.

## Preparación ya realizada

- [x] Create repository
- [x] Select React + TypeScript + Vite as frontend stack
- [x] Add SPEC.md
- [x] Add PLAN.md
- [x] Add TASKS.md

## R1.0 — Base mínima e inicio

- [x] Crear aplicación React + TypeScript + Vite.
- [x] Configurar linting, formato, comprobación de tipos y pruebas unitarias.
- [x] Configurar routing e inicio con accesos a Lectura y Matemáticas.
- [x] Implementar navegación de vuelta al inicio y diseño touch-first para tablet.
- [x] Crear ChildProfile, ParentSettings, Subject, Skill, LearningSession y Attempt.
- [x] Registrar MathModule y LanguageModule/ReadingModule sin implementar materias futuras.
- [x] Crear interfaces ProfileRepository, SettingsRepository, SessionRepository, ProgressRepository, RewardRepository y ChallengeRepository.
- [x] Implementar IndexedDB; evaluar/añadir Dexie y definir esquema/migraciones.
- [x] Asegurar que los módulos no accedan directamente a IndexedDB.
- [x] Preparar manifest, nombre, short name, theme/background, iconos y display standalone.
- [x] Configurar service worker, caché del shell y contenido inicial, fallback y estrategia offline.
- [x] Definir actualización segura que no interrumpa sesiones.
- [x] Comprobar restauración de sesiones y migraciones v1→v2 y v2→v3 en pruebas con fake-indexeddb; validación real en R1.5.

## R1.1 — Español: Lectura y repaso del temario confirmado

### Contenido y aprendizaje

- [x] Crear ReadingText, ReadingQuestion, ReadingAttempt, ReadingSession y ReadingSkill.
- [x] Definir IDs estables, título, texto, edad, dificultad, wordCount, contentType y habilidades.
- [x] Definir opciones, correctAnswer, distractores, explicación y referencia de evidencia por pregunta.
- [x] Crear y revisar 2 relatos históricos breves, 2 fábulas y 4 refranes con situaciones de ejemplo.
- [x] Incluir al menos 4 preguntas por relato/fábula y una actividad de interpretación por refrán.
- [x] Cubrir LITERAL, SEQUENCE, MAIN_IDEA, DETAILS, CAUSE_EFFECT, INFERENCE, CONTEXT_VOCABULARY y EVIDENCE al menos una vez en el conjunto.
- [x] Verificar hechos de los relatos históricos reales; no presentar ficción como historia real.
- [x] Incluir un ejemplo guiado por cada habilidad, separado de intentos independientes.
- [x] Revisar exactitud, claridad y ausencia de respuestas ambiguas.
- [x] Dejar el catálogo disponible offline junto con la primera versión.

### Recorrido funcional

- [x] Implementar explicación guiada → lector → preguntas → feedback → resumen.
- [x] Permitir consultar el texto mientras se responde.
- [x] Implementar preguntas con respuestas verificables, secuencias y selección de evidencia por frases.
- [x] Mostrar explicación y evidencia tanto en respuestas correctas como incorrectas.
- [x] Implementar inferencias con pistas y explicación del razonamiento.
- [x] Mantener Lectura R1 sin cronómetro.
- [x] Guardar respuestas, sesión, aciertos y errores por habilidad.
- [x] Mostrar resultados básicos sin etiquetar precisión como mastery definitivo.
- [x] Recuperar progreso después de cerrar/reabrir.
- [x] Verificar una sesión lectora completa con contenido real.

### Repaso específico de Español — obligatorio en R1

Temario actualizado con las fotografías de las pp. 12–31: fuentes, resumen/paráfrasis, párrafos, puntos y comas, orden temporal, causa/consecuencia, fábulas y refranes. Se recibieron siete palabras con b del cuaderno. Ver docs/repaso-espanol-libro.md; el Recortable 1 sigue sin recibirse y no bloquea las actividades.

- [x] Implementar ocho temas, 48 preguntas base, 16 alternativas y repaso mixto de 20 preguntas.
- [x] Añadir cola de hasta seis errores con ejemplos alternativos; ayuda/reintento no resuelven pendientes.
- [x] Incorporar las siete palabras confirmadas y práctica adicional con v sin sobrescribir personalizaciones.
- [x] Añadir orden de acontecimientos y reconocimiento de expresiones de sucesión temporal.
- [x] Añadir relaciones de causa y consecuencia.
- [x] Explicar y practicar separación de párrafos y agrupación por idea.
- [x] Corregir el enfoque inicial de «;» por puntos y comas según el libro, preservando sesiones históricas.
- [x] Evitar penalizar otras puntuaciones válidas en preguntas abiertas.
- [x] Practicar moralejas con justificación en la fábula.
- [x] Relacionar refranes con situaciones y explicar su sentido implícito.
- [x] Añadir práctica de completar b/v con feedback y repaso de errores.
- [x] Crear content/spanish/bv-common-words.v1.json con 34 palabras (24 originales, siete confirmadas y tres nuevas con v), frases, huecos b/v y feedback; validar estructura y soluciones.
- [x] Integrar el banco inicial en completar b/v y dictado; identificarlo como práctica general.
- [x] Añadir edición de palabras desde Parent Mode.
- [x] Alternar sesiones de 6–8 palabras y reintroducir las falladas después de otras preguntas.
- [x] Ocultar palabra, frase escrita y solución durante el dictado infantil; el adulto lee el contexto en voz alta.
- [x] Evitar enseñar una distinción artificial de pronunciación entre b y v.
- [x] Implementar dictado con el adulto: consulta protegida, regreso a pantalla infantil sin respuesta visible, respuesta escrita y corrección.
- [x] Hacer funcionar el dictado básico offline sin audio automático ni reconocimiento de voz.
- [x] Diferenciar errores b/v, tildes y otros; normalizar espacios y mayúsculas.
- [x] Registrar habilidades de los ocho temas, BV_SPELLING y DICTATION; conservar SEMICOLON en el historial anterior.
- [x] Integrar un repaso de todos los bloques con resumen de errores por tema.
- [x] Mantener estos ejercicios acotados dentro de LanguageModule; posponer SpellingModule/GrammarModule completos.

## R1.2 — Matemáticas: tablas 1–10

- [x] Crear MultiplicationFact, MathAttempt, MathSession y progreso por tabla.
- [x] Crear lecciones de ×1, ×2, ×5, ×10, ×3, ×4, ×6, ×9, ×7 y ×8.
- [x] Enseñar grupos, suma repetida, patrones y propiedad conmutativa.
- [x] Implementar práctica por tabla y práctica mixta.
- [x] Generar preguntas válidas sin repeticiones inmediatas.
- [x] Implementar entrada numérica y validación de respuestas.
- [x] Registrar precisión y tiempo de respuesta sin exigir velocidad para aprender.
- [x] Mostrar feedback y explicación de errores.
- [x] Reintroducir errores después de otras preguntas.
- [x] Mostrar resumen y guardar sesión, respuestas y resultados por tabla.
- [x] Recuperar progreso después de cerrar/reabrir.
- [x] Verificar una sesión matemática completa.

## R1.3 — Progreso y recompensa mínima compartida

- [x] Mostrar progreso básico de Lectura y Matemáticas desde el inicio.
- [x] Implementar 2 XP por acierto original, sin XP por reintentos; no equiparar XP con dominio ni elegibilidad monetaria.
- [x] Persistir XP, sesiones y progreso de ambas materias.
- [x] Implementar nueve retos semanales de Español: ocho temas (5/6 sin ayuda, 10% cada uno) y repaso mixto (16/20, resto). Desactivar el premio combinado anterior.
- [x] Crear Challenge, ChallengeResult, RewardLedgerEntry, WeeklyBudget y PaymentRecord.
- [x] Implementar RewardEngine como única vía para conceder dinero.
- [x] Configurar presupuesto global predeterminado de $100 MXN y edición por el adulto.
- [x] Definir periodos semanales en America/Mexico_City, de lunes 00:00 al siguiente lunes 00:00 exclusivo.
- [x] Implementar clave única por perfil/reto/periodo y procesamiento idempotente.
- [x] Guardar finalización, recompensa y consumo de presupuesto en una operación atómica.
- [x] Aplicar recompensas parciales sin trasladar automáticamente el resto.
- [x] Definir y comprobar finalización con presupuesto agotado y cambios del límite a mitad de semana.
- [x] Registrar amountRequested, amountGranted, earnedAt, periodId, weekId, status y reason.
- [x] Implementar PIN, consulta de resultados, presupuesto, ledger y marcado como pagado.
- [x] Evitar que marcar PAID libere presupuesto semanal.
- [x] Mantener práctica y XP activos después del límite.
- [x] Evitar dinero por Matemáticas, vocabulario, práctica normal o repetición del reto.
- [x] Recuperar premios faltantes atómicamente en la semana original, conservando premios previos y avance.
- [x] Añadir celebración, voz/sonido opcional y botón de prueba sin conceder dinero.

## R1.4 — Verificación técnica antes de entregar

- [x] Compilar y comprobar tipos.
- [x] Corregir lint y añadir comprobación del precache al workflow de CI.
- [x] Verificar respuestas y feedback de Matemáticas y Lectura.
- [x] Verificar cobertura de las ocho habilidades lectoras, temas del examen y revisión editorial.
- [ ] Verificar los ocho temas del libro, moralejas/refranes, b/v y dictado con respuesta oculta.
- [ ] Comprobar edición del banco de palabras, clasificación de errores y guardado por tema.
- [ ] Comprobar dictado con adulto y repaso específico de Español offline.
- [x] Comprobar recorridos completos de Lectura y Matemáticas con guardado en navegador local (28 de septiembre; docs/validacion-r1.md).
- [ ] Comprobar cierre/reapertura y conservación de sesiones, XP, ledger y ajustes.
- [x] Probar reto repetido dos veces y veinte veces: una sola recompensa.
- [ ] Probar recarga, reinicio, navegación atrás y solicitud duplicada sin doble recompensa.
- [x] Probar dos solicitudes concurrentes sin doble pago ni exceso del presupuesto.
- [x] Probar límite compartido entre materias, recompensa parcial y presupuesto agotado.
- [x] Probar cambio de semana sin borrar historial, XP ni pagos.
- [x] Comprobar que la práctica normal no concede dinero.
- [x] Comprobar recarga y sesión completa de Lectura desde caché con servidor local detenido; modo avión real pendiente en R1.5.
- [ ] Comprobar inicio y sesión de Matemáticas offline tras preparar caché.
- [ ] Comprobar actualización segura y persistencia.
- [ ] Revisar controles táctiles, contraste, lenguaje infantil, navegación y layout de tablet/móvil.
- [x] Respetar preferencia de movimiento reducido si hay animaciones.
- [x] Confirmar despliegue HTTPS en Sites: versión 10 publicada correctamente; URL y evidencia en docs/validacion-r1.md.
- [x] Añadir README con ejecución, alcance, instalación, preparación offline y límites del almacenamiento local.
- [ ] Verificar ambos módulos en la versión desplegada.
- [ ] Entregar URL e instrucciones cuando ambos módulos cumplan aceptación R1.

## R1.5 — Instalación y prueba del adulto con Judy

Este bloque se realiza DESPUÉS de terminar ambos módulos. No marcarlo completado por una comprobación del desarrollador.

- [x] El adulto instala la PWA en la tablet (confirmado por el usuario el 28 de septiembre de 2026).
- [x] El adulto confirma que puede actualizar la PWA (28 de septiembre de 2026); conservación del avance tras actualizar pendiente de confirmación.
- [ ] El adulto verifica apertura desde la pantalla de inicio.
- [ ] Judy completa una sesión de Lectura y el repaso de los temas de Español.
- [ ] El adulto realiza un dictado con Judy y revisan sus errores.
- [ ] Judy completa una sesión de Matemáticas.
- [ ] El adulto comprueba resultados y conservación al cerrar/reabrir.
- [ ] El adulto prueba offline con contenido previamente disponible.
- [ ] Registrar fallos, comprensión de instrucciones, dificultad y utilidad para estudiar.
- [ ] Corregir bloqueos detectados antes de ampliar funcionalidades.

## R2 — Completar el MVP después de la primera prueba

### Dominio y adaptación

- [ ] Definir umbrales de mastery: intentos, precisión, días/sesiones, dificultad, ayudas y rendimiento reciente.
- [ ] Implementar estados matemáticos NEW, LEARNING, PRACTICING, FAMILIAR y MASTERED.
- [ ] Implementar MathMasteryEngine, MathAdaptiveEngine, weak facts y strong facts.
- [ ] Implementar ReadingSkillProgress, ReadingMasteryEngine y ReadingAdaptiveEngine.
- [ ] Ponderar precisión, dificultad, variedad de textos y desempeño reciente en Lectura.
- [ ] Evitar mastery por repetir preguntas fáciles o memorizar un solo texto.
- [ ] Priorizar habilidades débiles, errores recientes y habilidades olvidadas.
- [ ] Ampliar y revisar el catálogo lector según uso real.
- [ ] Completar modos Detective e Inferencia especializados.
- [ ] Mantener CHARACTER_INTENT y AUTHOR_INTENT como expansión posterior; resumen/paráfrasis ya tienen práctica acotada en el libro.

### Velocidad y bosses

- [ ] Math Speed: timer, accuracy gate, Bronze, Silver, Gold, Platinum y récords personales.
- [ ] Boss genérico de tabla y bosses ×1–×10.
- [ ] Boss lector multi-skill, puntuación, precisión mínima y mejor resultado.
- [ ] Primera victoria con badge, XP y recompensa elegible; replay sin dinero.
- [ ] Documentar tratamiento de primera victoria sin presupuesto disponible.
- [ ] Condicionar cualquier timer lector a dominio demostrado; precisión antes que rapidez.

### Sistemas compartidos

- [ ] Completar contratos LearningEngine, MasteryEngine, AdaptiveEngine, ChallengeProvider, ProgressProvider y ContentProvider.
- [ ] Ampliar ChallengeEngine para Math, Reading y misiones entre materias.
- [ ] Soportar condiciones de precisión, mastery, sesiones, tiempo, racha, bosses y combinaciones.
- [ ] Completar ONCE, DAILY, WEEKLY, SKILL_MILESTONE, MODULE_MILESTONE, ACHIEVEMENT y BOSS.
- [ ] Definir cancelaciones y eventos del ledger preservando trazabilidad.
- [ ] Completar pruebas de abuso para todos los tipos de recompensa.
- [ ] Completar XP por dificultad, sesión perfecta, mastery, retos y bosses; reducir XP de replay donde corresponda.
- [ ] Implementar niveles y progresión.
- [ ] Implementar actividad mínima de racha, currentStreak y bestStreak; una pregunta no basta.
- [ ] Implementar achievements y celebraciones.
- [ ] Implementar misión semanal con condiciones de Matemáticas y Lectura.
- [ ] Conservar XP, mastery, bosses, logros, pagos e historial al cambiar la semana.
- [ ] Resolver cambios de reloj y límites de protección local; el PIN no equivale a seguridad de servidor.

### Paneles, metas y calidad

- [ ] Completar Child Home: nivel, racha, dinero semanal, disponible, siguiente reto, misión y logros.
- [ ] Crear dashboard reusable por materia con fortalezas, debilidades, mastery y progreso reciente.
- [ ] Completar Parent Dashboard: actividad, mejora, estadísticas por materia, pagos y ajustes de recompensas.
- [ ] Permitir activar/desactivar retos desde Parent Mode.
- [ ] Implementar SavingsGoal: nombre, objetivo, progreso, edición del adulto y completado.
- [ ] Añadir exportación/restauración local y recuperación del PIN.
- [ ] Completar animaciones de bosses/recompensas, controles de sonido y reduced motion.
- [ ] Revisar analytics locales de sesiones, intentos, habilidad, tiempos, retos y recompensas.
- [ ] Completar pruebas de XP, rachas, mastery, contratos de módulos y persistencia.
- [ ] Validar utilidad, duración de sesiones, dificultad y equilibrio de recompensas con uso real.
- [ ] Aceptar el MVP completo antes de iniciar nuevas materias.

## R3 — Nuevas materias; no bloquean R1 ni su instalación

Las secciones siguientes conservan identificadores históricos. Ejecutarlas después de estabilizar Matemáticas y Lectura; ajustar el orden según las necesidades de Judy.

## 30. Phase 2 — Spelling Module

- [ ] SpellingModule
- [ ] SpellingSkill
- [ ] SpellingAttempt
- [ ] SpellingMasteryEngine
- [ ] b/v exercises
- [ ] c/s/z exercises
- [ ] g/j exercises
- [ ] ll/y exercises
- [ ] h exercises
- [ ] accent marks
- [ ] capitalization
- [ ] punctuation
- [ ] dictation
- [ ] Spelling Boss
- [ ] Spelling analytics

## 31. Phase 2 — Vocabulary Module

- [x] VocabularyModule inicial (20 palabras; alcance completo pendiente)
- [x] Definitions iniciales (20 palabras)
- [ ] Synonyms
- [ ] Antonyms
- [x] Context meaning inicial (lecturas de las primeras 20 palabras)
- [ ] Prefixes
- [ ] Suffixes
- [ ] Word families
- [x] Vocabulary mastery inicial (reglas locales descritas en README; ampliar tras validación)
- [ ] Vocabulary Boss

## 32. Phase 3 — English Module

- [ ] EnglishModule
- [ ] Vocabulary skill
- [ ] Reading skill
- [ ] Spelling skill
- [ ] Grammar skill
- [ ] Sentence building
- [ ] Comprehension
- [ ] English Mastery
- [ ] Adaptive learning
- [ ] English Boss
- [ ] English analytics

## 33. Phase 4 — Science Module

- [ ] ScienceModule
- [ ] ScienceTopic
- [ ] ScienceConcept
- [ ] ScienceQuestion
- [ ] ScienceMasteryEngine
- [ ] Living things
- [ ] Human body
- [ ] Ecosystems
- [ ] Matter
- [ ] Energy
- [ ] Solar system
- [ ] Environment
- [ ] Science Boss
- [ ] Science analytics

## 34. Phase 5 — Geography Module

- [ ] GeographyModule
- [ ] GeographySkill
- [ ] Continents
- [ ] Oceans
- [ ] Countries
- [ ] Capitals
- [ ] States of Mexico
- [ ] Climate
- [ ] Relief
- [ ] Orientation
- [ ] Map exercises
- [ ] Geography Boss
- [ ] Geography analytics

## 35. Phase 5 — History Module

- [ ] HistoryModule
- [ ] HistoricalEvent
- [ ] HistoricalPeriod
- [ ] Timeline exercises
- [ ] Chronology skill
- [ ] Cause/effect skill
- [ ] Historical figures
- [ ] Event relationships
- [ ] Period comparisons
- [ ] Basic source interpretation
- [ ] History Boss
- [ ] History analytics

## 36. Phase 6 — Grammar Module

- [ ] GrammarModule
- [ ] Nouns
- [ ] Verbs
- [ ] Adjectives
- [ ] Pronouns
- [ ] Subject
- [ ] Predicate
- [ ] Verb tenses
- [ ] Sentence structure
- [ ] Grammar Mastery
- [ ] Grammar Boss

## 37. Phase 6 — Math Expansion

- [ ] Addition
- [ ] Subtraction
- [ ] Division
- [ ] Fractions
- [ ] Mental math
- [ ] Word problems
- [ ] Geometry
- [ ] Percentages

## 38. Adventure Mode — Post MVP

- [ ] Adventure framework
- [ ] Character
- [ ] World progression
- [ ] Math encounters
- [ ] Reading clues
- [ ] Science puzzles
- [ ] Geography travel
- [ ] History timelines
- [ ] Mixed bosses
- [ ] Unlockable areas


## Evolución técnica fuera del MVP

- [ ] Documentar sincronización futura entre dispositivos y consulta del adulto desde su teléfono.
- [ ] Incorporar SyncProvider solo cuando corresponda implementar sincronización.
- [ ] Evaluar proveedor cloud, respaldo y recuperación remotos en esa fase.
- [ ] Mantener cloud sync deshabilitado y sin dependencias cloud en el MVP.
