# JudyQuest — Implementation Plan

## Estado de implementación

R1 implementada en React/TypeScript: Español, Matemáticas, sesiones persistentes, XP, nueve retos semanales de Español, PIN y PWA. Validación del 28 de septiembre: 45 pruebas, tipos/build, lint y precache aprobados. Ver evidencia y pendientes en docs/validacion-r1.md. La prueba de instalación/offline en la tablet corresponde a R1.5 y no se marca realizada. README.md documenta reglas concretas, uso y límites.

## Mantenimiento de vocabulario

Antes de publicar contenido nuevo, revisar el lenguaje para 10 años. Simplificar instrucciones y registrar en el glosario las palabras educativas que conviene aprender, con definición y ejemplo. Comprobar que consultar una palabra no selecciona respuestas ni aumenta el dominio; registrar la ayuda en el seguimiento de vocabulario.

## Ampliación autorizada: aprender palabras nuevas

Implementadas las primeras 20 palabras tras el análisis previo: contenido, comprobación inicial, ayudas registradas, calendario y persistencia v3. Integración en Español mediante lecturas curadas seleccionadas con el historial. Los 100 candidatos restantes y sexto grado quedan pendientes. Esta ampliación no activa el resto de R2/R3. Siguiente validación de producto: probar las instrucciones y la carga de dos palabras nuevas con Judy.

## Prioridad y regla de ejecución

Actualizado el 28 de septiembre de 2026. Examen de Español: 28 de septiembre de 2026.

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
- Aplicar las fotografías del libro recibidas el 27 de septiembre: ocho temas de las pp. 12–31, con 48 preguntas base y 16 alternativas; ver docs/repaso-espanol-libro.md. El tema de puntuación es puntos y comas, no el signo «;».
- Conservar las siete palabras con b confirmadas del cuaderno y la práctica complementaria con v. El banco general editable contiene 34 palabras y no reemplaza las listas del cuaderno. Falta únicamente el Recortable 1, que no bloquea las actividades originales.
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
3. Puntos y comas: mayúscula tras punto, seguido/aparte/final, enumeraciones, vocativo y aclaración. Conservar el historial antiguo de «;» sin incluirlo en el examen.
4. Fábulas y refranes: identificar moralejas y relacionar significado implícito con situaciones.
5. Ortografía: completar b/v, corregir con explicación y repetir palabras falladas.
6. Dictado offline con adulto: consultar palabra en Parent Mode, ocultarla al volver a la pantalla infantil, dictar, recibir respuesta escrita y corregir.

Registrar habilidades por tema, incluyendo fuentes, resumen/paráfrasis, párrafos, puntos/comas, orden temporal, causa/consecuencia, moralejas/refranes y ortografía. Mantener SEMICOLON solo por compatibilidad histórica. No construir todavía SpellingModule ni GrammarModule completos.

Integrar el banco content/spanish/bv-common-words.v1.json: 34 palabras (24 iniciales, siete con b del cuaderno y tres adicionales con v), frases para dictado, huecos b/v y feedback. Permitir edición desde Parent Mode. Sesiones sugeridas de 6–8 palabras, repitiendo errores después de otras preguntas. Diferenciar errores b/v de tildes u otros errores; normalizar espacios y mayúsculas. El adulto lee la frase y repite la palabra; ocultar frase escrita y solución durante la respuesta infantil. No enseñar una distinción artificial de sonido entre b y v.

Añadir repaso mixto de 20 preguntas y una cola de hasta seis errores que priorice ejemplos alternativos; ayuda y reintentos no resuelven pendientes.

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

- Mostrar progreso básico de ambas materias y 2 XP por acierto original (los reintentos no suman). Los XP son práctica; no acreditan dominio ni sustituyen los requisitos sin ayuda de los premios.
- Dedicar temporalmente el presupuesto a nueve retos de Español: ocho temas (10% cada uno, redondeado hacia abajo en centavos) y repaso mixto (resto). Exigir 5/6 o 16/20 aciertos originales sin ayuda. Matemáticas y práctica ordinaria no conceden dinero.
- Implementar RewardEngine central con límite global de $100 MXN por defecto, periodos, duplicados, recompensa parcial y ledger.
- Usar America/Mexico_City para el periodo semanal, de lunes 00:00 hasta el siguiente lunes 00:00 exclusivo.
- Registrar finalización y recompensa de forma atómica con unicidad por perfil/reto/periodo; no generar dinero directamente desde las materias.
- Registrar retos sin saldo a $0, conservar importes previos al cambiar presupuesto y contar pagos anteriores dentro del límite. Recuperar premios faltantes de sesiones terminadas atómicamente, en su semana original y sin alterar XP ni sesiones.
- Parent Mode mínimo con PIN: resultados por materia, presupuesto, ledger y marcado como pagado.
- No descontar del gasto semanal una recompensa por marcarla como pagada.
- Mantener práctica y XP disponibles al alcanzar el límite.

Salida: progreso de ambas materias y premios semanales de Español integrados con un presupuesto global.

## R1.4 — Verificación técnica y preparación de entrega

Estas comprobaciones corresponden al desarrollo; la instalación y prueba del adulto siguen después de terminar ambos módulos.

- Compilar y comprobar tipos.
- Verificar flujo completo de Lectura y Matemáticas, corrección y persistencia.
- Revisar contenido lector, cobertura de las ocho habilidades y todos los bloques del temario confirmado.
- Verificar los ocho temas del libro, b/v y dictado con respuesta oculta.
- Comprobar que el banco de palabras se puede editar y los errores se clasifican correctamente.
- Probar pago duplicado, concurrencia, cap entre materias, recompensa parcial, cambio de semana y continuidad de práctica sin dinero.
- Comprobar inicio y sesiones de ambas materias offline después de preparar caché.
- Comprobar cierre/reapertura y actualización segura sin perder datos.
- Revisar navegación y controles táctiles en tamaños de tablet y móvil.
- Despliegue actual en Sites: https://judyquest.german-glz01.chatgpt.site. Confirmar versión y publicación antes de dar una entrega por desplegada; conservar compatibilidad con hosting estático.
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

Priorizar la utilidad del repaso de Español, basado en las páginas y las siete palabras confirmadas. No presentar las actividades originales como reproducción del examen.

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

No añadir nuevas materias antes de estabilizar Matemáticas y Lectura con uso real. CHARACTER_INTENT y AUTHOR_INTENT siguen pendientes; resumen/paráfrasis ya tienen práctica acotada dentro del repaso del libro.

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
