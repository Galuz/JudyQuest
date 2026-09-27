# JudyQuest — Implementation Plan

## Estado de implementación

R1 implementada en React/TypeScript: Español, Matemáticas, sesiones persistentes, XP, reto semanal, PIN y PWA. Se verifican tipos, build, lint, pruebas automatizadas y recorridos en navegador. La prueba de instalación/offline en la tablet corresponde a R1.5 y no se marca realizada. README.md documenta reglas concretas, uso y límites.

## Mantenimiento de vocabulario

Antes de publicar contenido nuevo, revisar el lenguaje para 10 años. Simplificar instrucciones y registrar en el glosario las palabras educativas que conviene aprender, con definición y ejemplo. Comprobar que consultar una palabra no selecciona respuestas ni cambia el avance.

## Prioridad y regla de ejecución

Actualizado el 27 de septiembre de 2026. Examen de Español: 28 de septiembre de 2026.

Entregar primero R1 con Matemáticas y Comprensión Lectora completas en el alcance de SPEC.md, sección 0. Priorizar Lectura por la urgencia escolar. El adulto instalará y probará después de terminar ambos módulos.

Orden: base mínima → Lectura → Matemáticas → integración y controles → verificación técnica → instalación y prueba → MVP completo → nuevas materias.

No interpretar el catálogo de funcionalidades futuras como trabajo obligatorio antes de R1. Mantener TASKS.md actualizado con evidencia real; no marcar implementación por haber escrito documentación.

## R1.0 — Base mínima e inicio

- Crear React + TypeScript + Vite, linting, pruebas unitarias y routing.
- Crear inicio touch-first para tablet con dos accesos: Lectura y Matemáticas.
- Configurar perfil infantil y ajustes del adulto; evitar construir dashboards completos.
- Implementar solo los contratos necesarios: ProfileRepository, SettingsRepository, SessionRepository, ProgressRepository, RewardRepository y ChallengeRepository.
- Usar IndexedDB, con Dexie recomendado, detrás de los repositories.
- Crear esquema versionado y persistencia desde el primer recorrido funcional.
- Preparar manifest, iconos, service worker, caché del shell y del contenido inicial, fallback offline y actualización que no interrumpa sesiones.
- Mantener MathModule y LanguageModule/ReadingModule independientes de IndexedDB y del dinero.
- Sin backend ni sincronización cloud en R1 o en el MVP.

Salida: inicio navegable y base persistente preparada para construir las dos materias. No solicitar todavía la instalación del usuario.

## R1.1 — Español: Lectura y repaso del temario (primera prioridad)

### Contenido inicial

- Modelo ReadingText/ReadingQuestion con identificador estable, texto, dificultad, habilidad, opciones, respuesta, explicación y evidencia.
- Catálogo: 2 relatos históricos breves, 2 fábulas y 4 refranes con situaciones. Al menos 4 preguntas por relato/fábula y una interpretación por refrán.
- Cubrir LITERAL, SEQUENCE, MAIN_IDEA, DETAILS, CAUSE_EFFECT, INFERENCE, CONTEXT_VOCABULARY y EVIDENCE al menos una vez en el conjunto.
- Añadir un ejemplo guiado por habilidad.
- Revisar claridad, respuestas y evidencia antes de habilitar el contenido.
- Aplicar el temario recibido el 27 de septiembre: relatos históricos (orden temporal, causa/consecuencia, párrafos y punto y coma; pp. 12–27), fábulas/refranes (moraleja y significado implícito; pp. 28–31) y dictado/b-v con palabras de clase.
- Las páginas del libro y palabras exactas no se han proporcionado. El adulto autorizó vocabulario cotidiano; usar content/spanish/bv-common-words.v1.json sin esperar la lista escolar y sin afirmar correspondencia exacta con el libro.
- Verificar los hechos de los relatos históricos reales y la interpretación de fábulas/refranes antes de publicar.

### Recorrido completo

Explicación guiada → texto → pregunta → respuesta → feedback → evidencia y explicación → resumen → guardado → inicio.

- Mantener el texto consultable y no usar cronómetro.
- Resolver secuencias con un formato verificable y evidencia mediante selección de frases.
- Registrar aciertos y errores por habilidad, diferenciando ejemplos guiados de práctica independiente.
- Conservar respuestas y resultados al reiniciar.
- No esperar a motores adaptativos, bosses ni mastery avanzado para completar este recorrido.

### Repaso específico del examen — obligatorio en R1

1. Relatos: ordenar hechos, identificar marcadores temporales y vincular causas/consecuencias.
2. Párrafos: reconocer separaciones y agrupar oraciones por idea.
3. Punto y coma: explicar y practicar el signo «;» con ejercicios inequívocos.
4. Fábulas y refranes: identificar moralejas y relacionar significado implícito con situaciones.
5. Ortografía: completar b/v, corregir con explicación y repetir palabras falladas.
6. Dictado offline con adulto: consultar palabra en Parent Mode, ocultarla al volver a la pantalla infantil, dictar, recibir respuesta escrita y corregir.

Registrar PARAGRAPHS, SEMICOLON, MORAL, PROVERB_MEANING, BV_SPELLING y DICTATION separadamente de las habilidades lectoras. No construir todavía SpellingModule ni GrammarModule completos.

Integrar el banco content/spanish/bv-common-words.v1.json: 24 palabras cotidianas en tres niveles, frases para dictado, huecos b/v y feedback. Permitir edición desde Parent Mode. Sesiones sugeridas de 6–8 palabras, repitiendo errores después de otras preguntas. Diferenciar errores b/v de tildes u otros errores; normalizar espacios y mayúsculas. El adulto lee la frase y repite la palabra; ocultar frase escrita y solución durante la respuesta infantil. No enseñar una distinción artificial de sonido entre b y v.

No depender de audio automático, reconocimiento de voz ni conexión para dictado. Incluir repaso de todos los bloques con feedback por tema y sin cronómetro.

Salida: sesión lectora y actividades de todos los temas de Español, con explicaciones y resultados persistentes.

## R1.2 — Matemáticas funcionales

- Modelos MultiplicationFact, MathAttempt y MathSession.
- Tablas del 1 al 10; aprendizaje de grupos, suma repetida, patrones y conmutatividad.
- Progresión sugerida: ×1, ×2, ×5, ×10, ×3, ×4, ×6, ×9, ×7, ×8.
- Práctica por tabla y mixta, entrada numérica y prevención de repeticiones inmediatas.
- Registrar respuestas, precisión y tiempos sin convertir la velocidad en barrera de acceso.
- Ofrecer corrección explicativa y reintroducir errores después de otras preguntas.
- Guardar sesión, resumen y resultados por tabla.
- Posponer Speed, tiers, bosses y mastery/adaptación avanzados.

Salida: una sesión matemática completa, desde aprendizaje hasta resumen guardado.

## R1.3 — Integración mínima compartida

- Mostrar progreso básico de ambas materias y XP de respuestas correctas independientes.
- Añadir un único reto semanal sencillo; concretar condiciones y monto configurado antes de activarlo.
- Implementar RewardEngine central con límite global de $100 MXN por defecto, periodos, duplicados, recompensa parcial y ledger.
- Usar America/Mexico_City para el periodo semanal, de lunes 00:00 hasta el siguiente lunes 00:00 exclusivo.
- Registrar finalización y recompensa de forma atómica con unicidad por perfil/reto/periodo; no generar dinero directamente desde las materias.
- Precisar antes de activar el reto cómo se registra una finalización con presupuesto agotado, los cambios del límite y el estado pagado.
- Parent Mode mínimo con PIN: resultados por materia, presupuesto, ledger y marcado como pagado.
- No descontar del gasto semanal una recompensa por marcarla como pagada.
- Mantener práctica y XP disponibles al alcanzar el límite.

Salida: aprendizaje, progreso y un reto integrados para ambas materias.

## R1.4 — Verificación técnica y preparación de entrega

Estas comprobaciones corresponden al desarrollo; la instalación y prueba del adulto siguen después de terminar ambos módulos.

- Compilar y comprobar tipos.
- Verificar flujo completo de Lectura y Matemáticas, corrección y persistencia.
- Revisar contenido lector, cobertura de las ocho habilidades y todos los bloques del temario confirmado.
- Verificar ejercicios de párrafos, signo «;», moralejas/refranes, b/v y dictado con respuesta oculta.
- Comprobar que el banco de palabras se puede editar y los errores se clasifican correctamente.
- Probar pago duplicado, concurrencia, cap entre materias, recompensa parcial, cambio de semana y continuidad de práctica sin dinero.
- Comprobar inicio y sesiones de ambas materias offline después de preparar caché.
- Comprobar cierre/reapertura y actualización segura sin perder datos.
- Revisar navegación y controles táctiles en tamaños de tablet y móvil.
- Preparar despliegue HTTPS, preferentemente Vercel, compatible con cualquier hosting estático.
- Crear README con ejecución, alcance R1, instalación, uso offline y límites del almacenamiento local.
- Entregar URL e instrucciones solamente cuando ambos módulos cumplan la aceptación R1.

Salida: versión candidata R1 con verificación documentada; no equivale a aprobación del usuario ni a instalación realizada.

## R1.5 — Instalación y prueba con Judy

Ahora sí, después de terminar ambos módulos:

1. El adulto instala desde la URL en la tablet.
2. Verifica apertura desde la pantalla de inicio.
3. Judy completa una sesión lectora, el repaso de Español (incluido dictado con el adulto) y una sesión matemática.
4. Comprueban resultados y conservación al cerrar/reabrir.
5. Prueban sin conexión con el contenido ya descargado.
6. Registran errores, claridad de instrucciones, dificultad y comprensión de los textos.
7. Corregir fallos que impidan estudiar antes de ampliar funcionalidades.

Priorizar la utilidad para el repaso de Español. El temario general está confirmado y se ha aprobado un banco de vocabulario cotidiano. No se dispone de las páginas del libro ni de la lista exacta de clase; no son dependencias para continuar. No presentar la práctica general como reproducción del examen.

## R2 — Completar el MVP después de la primera prueba

Implementar incrementalmente y validar cada mejora:

1. Definir criterios medibles de mastery por habilidad: intentos mínimos, precisión, sesiones/días, dificultad, ayudas y desempeño reciente.
2. MathMasteryEngine y MathAdaptiveEngine; ReadingMasteryEngine y ReadingAdaptiveEngine.
3. Ampliar y revisar catálogo lector; variar textos para distinguir comprensión de memorización.
4. Math Speed: precisión mínima, tiempos, tiers Bronze/Silver/Gold/Platinum y récords.
5. Bosses por tabla y boss lector multi-skill con first-clear reward y replay sin dinero.
6. Ampliar ChallengeEngine y tipos de recompensas: ONCE, DAILY, WEEKLY, SKILL_MILESTONE, MODULE_MILESTONE, ACHIEVEMENT y BOSS.
7. Completar reglas de ledger, cancelaciones, idempotencia y pruebas de abuso.
8. Niveles, rachas con actividad mínima, logros y celebraciones.
9. Misiones entre materias, dashboards completos, estadísticas y metas de ahorro.
10. Modos Detective e Inferencia especializados, reutilizando la práctica básica de evidencia e inferencia de R1.
11. Respaldo/restauración local, recuperación del PIN y endurecimiento frente a cambios de reloj.
12. Consolidar pruebas de contratos de módulos y criterios del MVP completo.

No añadir nuevas materias antes de estabilizar Matemáticas y Lectura con uso real. CHARACTER_INTENT, AUTHOR_INTENT y SUMMARY son expansiones posteriores de Lectura, no requisitos R1.

## R3 — Nuevas materias y expansión

El orden puede ajustarse según las necesidades reales de Judy. Las siguientes fases conservan sus identificadores históricos como referencia; todas comienzan después de R1 y del MVP estabilizado.

## Phase 29 — Spelling Module

Post-MVP.

Crear:

SpellingSkill

SpellingExercise

SpellingAttempt

SpellingMasteryEngine

Habilidades iniciales:

b/v

c/s/z

g/j

ll/y

h

accent marks

punctuation

capitalization

dictation

## Phase 30 — Vocabulary Module

Crear:

- synonyms;
- antonyms;
- definitions;
- contextual meaning;
- prefixes;
- suffixes;
- word families.

Puede compartir contenido con ReadingModule.

## Phase 31 — English Module

Crear arquitectura para:

Vocabulary

Reading

Spelling

Grammar

Sentence Building

Comprehension

Debe tener mastery independiente por skill.

## Phase 32 — Science Module

Crear:

ScienceTopic

ScienceConcept

ScienceQuestion

ScienceMastery

Priorizar comprensión conceptual.

Temas iniciales:

living things

human body

ecosystems

matter

energy

solar system

environment

## Phase 33 — Geography Module

Crear:

GeographySkill

LocationQuestion

MapExercise

Topics:

continents

oceans

countries

capitals

Mexico states

climate

relief

orientation

## Phase 34 — History Module

Crear:

HistoricalEvent

HistoricalPeriod

TimelineExercise

HistoryQuestion

Skills:

chronology

cause/effect

people

events

comparison

source interpretation

## Phase 35 — Grammar Module

Fase posterior.

Skills:

nouns

verbs

adjectives

pronouns

subject

predicate

verb tenses

sentence structure

## Phase 36 — Mathematics Expansion

Añadir:

- addition;
- subtraction;
- division;
- fractions;
- mental math;
- word problems;
- geometry;
- percentages.

## Phase 37 — Adventure Mode

Construir una vez validados varios módulos.

Debe reutilizar:

Learning Engines

Mastery Engines

ChallengeEngine

RewardEngine

XPSystem


## Evolución técnica posterior

- Mantener la persistencia detrás de repositories para añadir un SyncProvider cuando sea necesario.
- Cloud sync, consulta desde el teléfono del adulto, recuperación remota y múltiples dispositivos quedan fuera del MVP.
- Evaluar proveedor cloud en esa fase, sin incorporarlo como dependencia anticipada.
- Registrar sesiones, respuestas, progreso y recompensas desde R1; las gráficas y análisis avanzados llegan en R2.
- Ejecutar pruebas relevantes con cada entrega; no posponerlas hasta acabar el roadmap.
