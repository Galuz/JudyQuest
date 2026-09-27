# JudyQuest — Product Specification

## Criterio permanente de lenguaje y vocabulario (27 de septiembre de 2026)

Escribir para Judy, de 10 años: instrucciones directas, frases cortas y ejemplos concretos. Simplificar palabras difíciles que no aporten al aprendizaje. Cuando una palabra sí sea útil para aprender o forme parte del temario, conservarla y añadirla al glosario de `src/content/glossary.ts` con significado sencillo, ejemplo y variantes necesarias (plural o conjugación).

Mostrar esas palabras subrayadas en lecturas, preguntas, opciones, guías y explicaciones mediante `GlossaryText`. Al tocarlas, abrir su significado sin salir de la misión ni seleccionar/enviar respuestas. Permitir cerrar y volver al mismo lugar; admitir teclado y lector de pantalla. Incluir el glosario en el contenido disponible sin internet. En controles de navegación, mantener etiquetas sencillas y mostrar la ayuda dentro de la actividad, sin anidar botones.

Aplicar este criterio a todo contenido futuro de Español, Matemáticas y nuevas materias. No reemplazar automáticamente palabras escritas por Judy ni alterar respuestas o puntuaciones.


## 0. Prioridad de entrega — Matemáticas y Lectura (R1)

Decisión del 27 de septiembre de 2026: comenzar por los módulos de Matemáticas y Comprensión Lectora. El examen de Español de Judy es el 28 de septiembre de 2026; Lectura tiene prioridad dentro de la implementación.

Orden obligatorio:

1. Base mínima de la aplicación e inicio con acceso a ambas materias.
2. Comprensión Lectora funcional, con contenido y explicaciones.
3. Matemáticas funcionales, con aprendizaje y práctica de tablas 1–10.
4. Integración de progreso, XP básico, un reto semanal y controles mínimos del adulto.
5. Verificación técnica de ambos módulos y de su persistencia.
6. Entrega de URL, instalación por el adulto y prueba con Judy.
7. Mejoras del MVP completo y, después, nuevas materias.

La urgencia orienta las prioridades; no constituye una promesa de que la aplicación ya esté terminada ni sustituye las verificaciones. La instalación y la prueba del usuario ocurren después de terminar AMBOS módulos en el alcance R1. Las comprobaciones técnicas durante el desarrollo sí se realizan desde el inicio.

### Alcance R1 y significado de “módulo terminado”

| Área | Incluido en R1 | Posterior a la primera prueba |
| --- | --- | --- |
| Inicio | Elegir Lectura o Matemáticas, volver al inicio y consultar progreso básico. | Dashboards completos y personalización. |
| Lectura | Explicación guiada, lectura, preguntas, corrección, evidencia, explicación del error, resumen y guardado. Habilidades: LITERAL, SEQUENCE, MAIN_IDEA, DETAILS, CAUSE_EFFECT, INFERENCE, CONTEXT_VOCABULARY y EVIDENCE. | Adaptación avanzada, mastery formal, bosses, temporizadores y modos especializados independientes. |
| Español: repaso del examen | Párrafos, punto y coma, moralejas/refranes, b/v y dictado con apoyo del adulto; resultados por tema. | Módulos completos de Ortografía y Gramática, audio automático y reconocimiento de voz. |
| Matemáticas | Tablas 1–10; lecciones de grupos, suma repetida y conmutatividad; práctica por tabla y mixta; entrada numérica; corrección; repaso de errores; resumen y guardado. | Speed, tiers, bosses y adaptación/mastery avanzados. |
| Progreso | Sesiones, respuestas y aciertos por tabla/habilidad; XP básico. | Niveles, rachas, logros y gráficas avanzadas. |
| Recompensas | Un reto semanal sencillo, RewardEngine central, pago único por periodo, ledger, límite global y Parent Mode mínimo con PIN. | Catálogo de retos, recompensas por bosses/hitos, misiones complejas y metas de ahorro. |
| Distribución | PWA local-first, contenido inicial disponible offline y persistencia tras cerrar/reabrir. | Sincronización cloud y múltiples dispositivos. |

R1 es una primera entrega utilizable, previa al MVP completo descrito en la sección 43. Las características posteriores se conservan en el roadmap, pero no bloquean la instalación ni la primera prueba de R1.

### Contenido de Español para R1

- Catálogo inicial enfocado al examen: 2 relatos históricos breves, 2 fábulas y 4 refranes con situaciones de ejemplo. Al menos 4 preguntas por relato/fábula y una actividad de interpretación por refrán; cubrir las 8 habilidades lectoras R1 al menos una vez en el conjunto. Este catálogo sustituye el requisito anterior de 8 textos genéricos.
- Cada pregunta debe incluir respuesta verificable, explicación y evidencia textual; revisar manualmente que no haya respuestas ambiguas.
- Incorporar al menos un ejemplo guiado por habilidad. Estos ejemplos no cuentan como intentos independientes.
- Permitir consultar el texto al responder; no imponer cronómetro en Lectura R1.
- Incluir lectura de secuencias e identificación de idea principal y evidencias.
- Temario recibido del adulto mediante fotografía el 27 de septiembre de 2026. Incorporar los contenidos siguientes a R1; no tratarlos como ampliaciones opcionales.
- La imagen aporta temas y referencias de páginas, no el contenido del libro ni la lista de palabras trabajadas en clase. No afirmar que se han revisado esas páginas.

### Temario confirmado — examen de Español del 28 de septiembre

| Bloque de la fotografía | Referencia indicada | Actividad R1 |
| --- | --- | --- |
| Relatos históricos: hechos en orden temporal | pp. 12–27 | Ordenar acontecimientos e identificar expresiones de sucesión temporal en el relato. |
| Relatos históricos: causa y consecuencia | pp. 12–27 | Relacionar qué ocurrió, por qué ocurrió y qué sucedió como resultado. |
| Párrafos | pp. 12–27 | Reconocer límites de párrafo y agrupar oraciones que desarrollan una misma idea. |
| Punto y coma | pp. 12–27 | Explicación breve y ejercicios de uso del signo «;» en contextos inequívocos. Practicar específicamente «;», además de los conocimientos previos sobre punto («.») y coma («,»). |
| Fábulas y refranes: moraleja y significado implícito | pp. 28–31 | Identificar y justificar la moraleja; relacionar refranes con situaciones y explicar su sentido no literal. |
| Ortografía: dictado y uso de b y v en palabras trabajadas en clase | Sin páginas indicadas | Completar b/v y escribir palabras dictadas; explicar cada corrección y volver a practicar errores. |

### Ajuste de alcance del módulo de Español

R1 conserva ReadingModule y añade un bloque acotado de repaso de Español dentro de LanguageModule: párrafos, punto y coma, moralejas/refranes y ortografía b/v con dictado.

Estos ejercicios son obligatorios en R1. No requieren construir el SpellingModule o GrammarModule completos del roadmap. Registrar resultados con habilidades específicas (PARAGRAPHS, SEMICOLON, MORAL, PROVERB_MEANING, BV_SPELLING, DICTATION), separadas de las ocho habilidades de comprensión lectora.

- Reutilizar sesiones, corrección, guardado y controles compartidos.
- Usar contenidos originales; para relatos históricos basados en hechos reales, verificar hechos antes de publicarlos. No presentar narraciones inventadas como historia real.
- Punto y coma: aceptar variantes válidas o plantear selección de ejemplos con una respuesta inequívoca; no marcar como universal una única puntuación posible.
- Usar el banco inicial aprobado de palabras cotidianas de casa y escuela en content/spanish/bv-common-words.v1.json: 24 palabras, tres niveles, frases de dictado, huecos b/v y feedback. Es práctica general, no un ranking estadístico ni la lista exacta de clase. Permitir editarlo desde Parent Mode.
- Dictado R1: el adulto consulta la palabra en Parent Mode, vuelve a la pantalla infantil con la respuesta oculta y dicta en voz alta. Judy escribe y la aplicación corrige.
- El dictado básico debe funcionar offline; audio automático y reconocimiento de voz no son requisitos R1.
- Distinguir en el feedback un error b/v de una tilde u otro error ortográfico; no penalizar como error de b/v una diferencia de mayúsculas o espacios.
- El adulto confirmó que no dispone de la lista de clase y autorizó palabras de uso cotidiano. No esperar fotografías ni listas adicionales para continuar; una lista escolar posterior será una personalización opcional.
- El repaso integra todos los bloques del temario y muestra errores por tema; sin cronómetro ni barrera monetaria para volver a practicar.

### Banco inicial de b/v confirmado

Fuente de contenido: content/spanish/bv-common-words.v1.json.

| Nivel | Palabras |
| --- | --- |
| 1 — Primeras palabras | barco, botella, nube, abuelo, vaca, vaso, ventana, verde |
| 2 — Casa y escuela | bicicleta, biblioteca, caballo, escribir, vestido, vecino, verano, lluvia |
| 3 — Más detalles | bebé, árbol, también, abrir, volver, vivir, nuevo, avión |

La dificultad es una propuesta didáctica inicial y podrá ajustarse al desempeño de Judy. El banco contiene 12 palabras con b y 12 con v.

- Alternar completar b/v y dictado con adulto en sesiones breves sugeridas de 6–8 palabras.
- Usar la frase de contexto en el dictado, especialmente cuando existan palabras que suenen igual.
- No enseñar una diferencia artificial de pronunciación entre b y v.
- Ocultar tanto la palabra como la frase escrita y la solución durante el dictado infantil.
- Registrar las tildes por separado: una tilde omitida no implica que haya fallado la elección de b/v.
- El banco está integrado en completar b/v, dictado y edición del adulto; los intentos y resultados se guardan localmente. La instalación y validación en la tablet siguen pendientes del adulto.

### Criterios de aceptación de R1

- Judy puede completar una sesión de Lectura y una de Matemáticas, recibir explicación de errores y consultar sus resultados.
- Puede practicar todos los bloques del temario de Español: orden temporal, causa/consecuencia, párrafos, punto y coma, moralejas/refranes y b/v con dictado.
- Los resultados distinguen comprensión lectora, estructura/puntuación, interpretación y ortografía; el dictado no muestra la respuesta antes de contestar.
- Ambas materias conservan sesiones, respuestas y progreso después de cerrar y reabrir.
- Los contenidos iniciales de ambos módulos funcionan offline tras la primera carga y la preparación de su caché.
- El reto semanal utiliza el mismo RewardEngine y presupuesto global; recargar, repetir o enviar dos veces no duplica dinero.
- El adulto puede consultar resultados, configurar el presupuesto y marcar recompensas pagadas mediante Parent Mode.
- Antes de entregar la URL se comprueban los dos recorridos completos, persistencia, recompensas y funcionamiento offline.
- Después de completar ambos módulos, el adulto instala en la tablet y prueba con Judy; se registran fallos y dificultades antes de ampliar el producto.

## 1. Product Vision

JudyQuest es una plataforma educativa gamificada diseñada inicialmente para Judy, de 10 años.

Su objetivo es desarrollar habilidades escolares mediante:

- aprendizaje guiado;
- práctica adaptativa;
- dominio progresivo;
- retos;
- bosses;
- XP;
- logros;
- rachas;
- recompensas de dinero real administradas por un adulto.

La plataforma debe ser modular y crecer por materias sin duplicar la lógica principal.

## 2. Technical Product Requirements

### Application Type

JudyQuest será una Progressive Web App (PWA).

Objetivos principales:

- poder abrirse desde una URL;
- poder instalarse fácilmente en la pantalla de inicio de la tablet;
- comportarse visualmente como una aplicación independiente;
- funcionar correctamente en tablets y móviles;
- soportar funcionamiento offline para las actividades incluidas en el dispositivo;
- actualizarse desde la web sin depender de una tienda de aplicaciones.

### Official Frontend Stack

Stack inicial oficial:

- React;
- TypeScript;
- Vite;
- PWA / Service Worker;
- Web App Manifest;
- IndexedDB para persistencia local.

Se recomienda utilizar Dexie como capa de acceso a IndexedDB para simplificar consultas, migraciones y versionado de datos.

### Local-First Architecture

El MVP será local-first.

La aplicación debe poder utilizarse sin conexión después de haber sido instalada y de tener disponibles sus recursos educativos.

El dispositivo local almacenará inicialmente:

- perfiles;
- configuración;
- progreso;
- sesiones;
- intentos;
- tiempos de respuesta;
- mastery;
- XP;
- rachas;
- achievements;
- bosses;
- Challenge history;
- Reward Ledger;
- pagos marcados;
- metas de ahorro.

No se requiere backend para el MVP.

### Persistence Abstraction

Los módulos educativos no deben acceder directamente a IndexedDB.

La persistencia debe quedar detrás de interfaces/repositories como:

- ProgressRepository;
- RewardRepository;
- SessionRepository;
- SettingsRepository;
- ProfileRepository;
- ChallengeRepository.

Implementación MVP:

Repositories
↓
IndexedDB / Dexie

Evolución futura:

Repositories
↓
Local IndexedDB
+
Cloud Sync Provider

Esto permitirá añadir sincronización sin reescribir MathModule, ReadingModule, RewardEngine o Parent Mode.

### Future Cloud Synchronization

La sincronización cloud queda fuera del MVP.

Una futura fase podrá permitir:

- consultar desde otro dispositivo el progreso de Judy;
- sincronizar tablet y teléfono del adulto;
- respaldo remoto;
- recuperación de datos;
- múltiples dispositivos.

Supabase es una opción prevista para esa evolución, pero no debe ser una dependencia del MVP.

### PWA Requirements

El MVP debe incluir:

- manifest instalable;
- iconos de aplicación;
- nombre y short name;
- theme/background metadata;
- modo standalone;
- Service Worker;
- cache del application shell;
- estrategia offline;
- fallback offline apropiado;
- actualización segura de nuevas versiones.

La aplicación no debe asumir conexión permanente para realizar actividades educativas ya disponibles localmente.

### Device & UX Target

Dispositivo principal inicial:

tablet de Judy.

Prioridades:

1. tablet;
2. móvil;
3. escritorio.

La interfaz debe ser touch-first, con botones grandes y navegación sencilla.

### Deployment

El deployment inicial recomendado es Vercel por simplicidad de despliegue y previews.

La arquitectura PWA no debe depender de Vercel y debe poder hospedarse posteriormente en cualquier hosting estático compatible con HTTPS.

## 3. Product Philosophy

JudyQuest debe sentirse como:

“Estoy avanzando en un juego.”

No como:

“Estoy haciendo tarea extra.”

Ciclo principal:

APRENDER  
→ PRACTICAR  
→ MEJORAR  
→ DOMINAR  
→ SUPERAR RETO  
→ DERROTAR BOSS  
→ GANAR RECOMPENSA

El producto premia:

- dominio;
- constancia;
- precisión;
- mejora;
- dificultad;
- razonamiento;
- velocidad cuando tenga sentido pedagógico.

No premia:

- repetición infinita;
- respuestas aleatorias;
- farming;
- velocidad sin comprensión;
- repetir contenido ya dominado únicamente para ganar dinero.

## 4. Subjects Roadmap

JudyQuest contempla oficialmente las siguientes materias.

### MVP

#### 1. Matemáticas

Primera habilidad:

- tablas de multiplicar del 1 al 10.

Expansiones previstas:

- suma;
- resta;
- división;
- fracciones;
- cálculo mental;
- problemas matemáticos;
- geometría básica;
- porcentajes.

#### 2. Español / Lengua

Primer submódulo del MVP:

##### Comprensión Lectora

Habilidades:

- comprensión literal;
- secuencia de acontecimientos;
- idea principal;
- detalles relevantes;
- causa y consecuencia;
- inferencias;
- vocabulario por contexto;
- evidencia textual;
- intención de personajes;
- intención del autor;
- resumen.

## 5. Future Learning Modules

Los siguientes módulos completos forman parte oficial del roadmap, aunque no son necesarios para liberar el MVP. Excepción acotada: los ejercicios de b/v, dictado, párrafos y punto y coma del temario confirmado sí forman parte de R1 (sección 0), sin exigir estos módulos completos.

### Español / Lengua — Expansiones

#### Ortografía

Habilidades previstas:

- uso de b/v;
- c/s/z;
- g/j;
- ll/y;
- h;
- acentuación;
- mayúsculas;
- signos de puntuación;
- separación silábica;
- palabras homófonas;
- dictado.

#### Vocabulario

- significado de palabras;
- sinónimos;
- antónimos;
- familias de palabras;
- prefijos;
- sufijos;
- uso contextual.

#### Gramática

Fase posterior:

- sustantivos;
- verbos;
- adjetivos;
- pronombres;
- sujeto;
- predicado;
- tiempos verbales;
- estructura de oración.

### Inglés

Habilidades previstas:

- vocabulario;
- comprensión lectora;
- listening cuando exista soporte;
- spelling;
- sentence building;
- grammar básica;
- verbos comunes;
- comprensión contextual;
- reading comprehension;
- traducción básica;
- expresiones cotidianas.

El progreso debe dividirse por habilidades y no reducirse a una sola calificación de “Inglés”.

### Ciencias

Habilidades previstas:

- seres vivos;
- cuerpo humano;
- ecosistemas;
- materia;
- energía;
- sistema solar;
- fuerzas;
- medio ambiente;
- clasificación;
- método científico básico.

El módulo debe priorizar comprender conceptos sobre memorizar definiciones.

Tipos de actividades:

- identificación;
- clasificación;
- relaciones causa/efecto;
- escenarios;
- preguntas conceptuales;
- pequeños experimentos mentales.

### Geografía

Habilidades previstas:

- continentes;
- océanos;
- países;
- capitales;
- estados de México;
- regiones;
- clima;
- relieve;
- mapas;
- orientación;
- ubicación espacial.

El módulo podrá incluir posteriormente ejercicios visuales de mapas.

### Historia

Habilidades previstas:

- orden cronológico;
- líneas del tiempo;
- personajes;
- eventos;
- causas;
- consecuencias;
- comparación de periodos;
- interpretación de fuentes;
- relación entre acontecimientos.

El objetivo no será solo memorizar fechas.

Debe desarrollar:

qué ocurrió  
por qué ocurrió  
qué pasó después  
cómo se relacionan los acontecimientos

## 6. Module Architecture

Arquitectura conceptual:

JudyQuest Core

├── MathModule  
├── LanguageModule  
│   ├── ReadingModule  
│   ├── SpellingModule  
│   ├── VocabularyModule  
│   └── GrammarModule  
├── EnglishModule  
├── ScienceModule  
├── GeographyModule  
├── HistoryModule  
├── ChallengeEngine  
├── RewardEngine  
├── XPSystem  
├── AchievementSystem  
├── StreakSystem  
├── WeeklyBudget  
└── ParentDashboard

Los módulos educativos no implementan sus propios sistemas de dinero, XP o retos globales.

## 7. Shared Platform Core

Todos los módulos comparten:

- ChildProfile;
- ParentProfile;
- RewardEngine;
- RewardLedger;
- ChallengeEngine;
- XPSystem;
- AchievementSystem;
- StreakSystem;
- WeeklyBudget;
- SavingsGoals;
- ParentDashboard;
- analytics;
- celebrations;
- common UI components.

## 8. User Roles

### Child Profile

Judy puede:

- elegir materia;
- realizar lecciones;
- practicar;
- superar retos;
- derrotar bosses;
- ganar XP;
- subir de nivel;
- obtener logros;
- ganar recompensas elegibles;
- consultar progreso;
- consultar récords;
- consultar dinero ganado;
- consultar objetivos.

No puede:

- editar recompensas;
- cambiar presupuesto;
- marcar dinero como pagado;
- alterar estadísticas;
- borrar historial;
- entrar a configuración administrativa.

### Parent Profile

Protegido mediante PIN.

El adulto puede:

- consultar progreso general;
- consultar progreso por materia;
- identificar debilidades;
- consultar sesiones;
- modificar recompensas;
- modificar límite semanal;
- activar/desactivar retos;
- consultar Reward Ledger;
- marcar dinero como pagado;
- administrar metas de ahorro.

## 9. Shared Weekly Reward Budget

Valor predeterminado:

$100 MXN por semana.

El límite es GLOBAL.

Ejemplo:

Matemáticas: $30  
Lectura: $20  
Ortografía: $10

Total:

$60 / $100

Disponible:

$40

Agregar nuevas materias no crea nuevos presupuestos independientes.

## 10. Weekly Reset

Periodo:

Lunes 00:00  
→ Domingo 23:59

Nueva semana:

- weeklyEarned = $0;
- los retos WEEKLY vuelven a estar disponibles;
- se pueden generar nuevas misiones.

Se conservan:

- XP;
- mastery;
- historial;
- récords;
- achievements;
- bosses;
- pagos;
- estadísticas.

## 11. Anti-Farming System

Requisito crítico.

Cada reto debe tener:

challengeId

rewardPeriod

completion history

Una recompensa monetaria solo puede concederse una vez dentro de su periodo.

Repetir puede dar:

- XP;
- récord;
- práctica;
- progreso.

Pero no dinero adicional.

## 12. Reward Periods

Tipos:

ONCE

DAILY

WEEKLY

SKILL_MILESTONE

MODULE_MILESTONE

ACHIEVEMENT

BOSS

Las recompensas monetarias deben concentrarse principalmente en:

- WEEKLY;
- SKILL_MILESTONE;
- MODULE_MILESTONE;
- ACHIEVEMENT;
- BOSS.

## 13. Reward Ledger

Cada reward registra:

rewardId

challengeId

profileId

moduleId

skillId

amountRequested

amountGranted

earnedAt

periodId

weekId

status

reason

Estados:

EARNED

PAID

CANCELLED

RewardEngine es la única parte autorizada para generar dinero.

## 14. Weekly Cap

remainingBudget =
weeklyLimit - weeklyEarned

Si:

remainingBudget <= 0

entonces:

monetaryReward = 0

Pero siguen activos:

- XP;
- mastery;
- achievements;
- records;
- progression.

## 15. Partial Rewards

Ejemplo:

Weekly:
$98 / $100

Reward:
$5

Granted:
$2

Nuevo total:

$100 / $100

Los $3 restantes no se transfieren automáticamente.

## 16. No Money for Normal Practice

Una respuesta correcta puede generar:

XP

pero no dinero.

El dinero proviene de:

- challenges;
- bosses;
- milestones;
- achievements.

## 17. XP Economy

XP no tiene límite semanal.

Ejemplo inicial:

Respuesta correcta:
+2 XP

Pregunta difícil:
+3 XP

Perfect session:
+20 XP

Skill mastered:
+25 XP

Challenge:
+50 XP

Boss:
+500 XP

## 18. Streak System

Registrar:

currentStreak

bestStreak

Debe existir actividad mínima para que una sesión cuente.

Abrir la aplicación y contestar una sola pregunta no mantiene la racha.

## 19. Mathematics Module

### Initial Scope

Tablas:

×1 a ×10

Progresión sugerida:

×1  
×2  
×5  
×10  
×3  
×4  
×6  
×9  
×7  
×8

Puede adaptarse según rendimiento.

## 20. Mathematics Learning Mode

Enseñar:

- grupos;
- suma repetida;
- patrones;
- propiedad conmutativa.

Trucos:

×2 → duplicar  
×4 → duplicar dos veces  
×5 → patrones de 5  
×9 → patrones  
×10 → agregar cero

## 21. Mathematics Practice

Registrar:

fact

answer

correct

responseTime

sessionId

timestamp

Los errores deben reaparecer posteriormente mediante spaced retry.

## 22. Mathematics Mastery

Estados:

NEW

LEARNING

PRACTICING

FAMILIAR

MASTERED

Considerar:

- accuracy;
- response time;
- practice days;
- recent performance;
- attempt count.

## 23. Mathematics Speed Mode

La velocidad sí forma parte del dominio de multiplicaciones.

Ejemplo:

20 preguntas

Accuracy >= 90%

Time <= 90 sec

Tiers:

Bronze  
Silver  
Gold  
Platinum

Precisión siempre antes de velocidad.

## 24. Mathematics Bosses

Un boss por tabla.

Primera victoria:

- badge;
- XP;
- reward.

Replay:

- XP reducido;
- récord;
- sin dinero adicional.

## 25. Reading Module

Forma parte de:

LanguageModule → ReadingModule.

Objetivo:

comprender lo leído.

No medir únicamente velocidad.

## 26. Reading Skills

LITERAL

SEQUENCE

MAIN_IDEA

DETAILS

CAUSE_EFFECT

INFERENCE

CONTEXT_VOCABULARY

CHARACTER_INTENT

AUTHOR_INTENT

EVIDENCE

SUMMARY

## 27. Reading Learning Mode

Cada habilidad debe explicar:

qué es

↓

ejemplo guiado

↓

ejercicio asistido

↓

ejercicio independiente

## 28. Reading Practice

Flujo:

Texto

↓

Pregunta

↓

Respuesta

↓

Feedback

↓

Evidencia

↓

Explicación

Un error debe enseñar por qué la respuesta correcta es correcta.

## 29. Reading Detective Mode

Objetivo:

encontrar evidencia dentro del texto.

Ejemplo:

“¿Qué frase demuestra que Ana tenía miedo?”

El sistema evalúa:

- respuesta;
- evidencia seleccionada.

## 30. Reading Inference Mode

La respuesta no aparece literalmente.

Debe enseñarse:

pistas

+

conocimiento contextual

=

inferencia

## 31. Reading Mastery

Dominio independiente por skill.

Ejemplo:

Literal: 94%  
Sequence: 82%  
Main Idea: 91%  
Cause & Effect: 78%  
Inference: 57%  
Vocabulary: 69%

## 32. Reading Adaptive Learning

Priorizar:

- habilidades débiles;
- errores recientes;
- nuevas habilidades;
- habilidades olvidadas.

Reducir progresivamente:

- contenido consistentemente dominado.

## 33. Reading Difficulty

Considerar:

- longitud;
- vocabulario;
- estructura;
- número de personajes;
- cantidad de información;
- complejidad inferencial;
- distractores;
- pasos de razonamiento.

## 34. Reading Timers

En comprensión lectora:

PRECISIÓN  
→ COMPRENSIÓN  
→ CONSISTENCIA  
→ EFICIENCIA

El cronómetro solo aparece después de cierto dominio.

Nunca premiar lectura apresurada con baja comprensión.

## 35. Reading Bosses

Un boss mezcla varias habilidades.

Ejemplo:

Texto de 600 palabras.

8 preguntas:

- 2 literal;
- 2 inference;
- 1 main idea;
- 1 cause/effect;
- 1 vocabulary;
- 1 evidence.

Primera victoria:

- badge;
- XP;
- reward.

Replay:

sin dinero adicional.

## 36. Future Module Pattern

Todos los módulos futuros deben implementar:

Learning Mode

Practice Mode

Skill Mastery

Adaptive Learning

Challenges

Bosses

Analytics

Module Dashboard

pero reutilizando:

RewardEngine

XPSystem

ChallengeEngine

StreakSystem

Achievements

WeeklyBudget

## 37. Cross-Module Missions

Ejemplo:

Misión Escolar Semanal

- 3 sesiones de Matemáticas;
- 3 sesiones de Español;
- dominar 5 facts;
- completar 3 textos con >= 80%.

Reward:

$15 MXN.

Permite incentivar equilibrio entre materias.

## 38. Child Dashboard

Mostrar:

- nivel;
- XP;
- racha;
- $X / weeklyLimit;
- siguiente reward;
- materias;
- progreso;
- misión semanal;
- achievements.

## 39. Subject Dashboard

Cada materia muestra:

- skills;
- mastery;
- weak skills;
- strong skills;
- retos;
- bosses;
- progreso reciente.

## 40. Parent Dashboard

General:

- Weekly Limit;
- Weekly Earned;
- Pending Payment;
- Paid;
- Sessions;
- XP;
- Reward History.

Por materia:

- accuracy;
- mastery;
- weak skills;
- recent improvement;
- session history.

## 41. Reward Goals

“Estoy ahorrando para…”

Ejemplos:

Helado — $40  
Cine — $100  
Juguete — $300

No realiza transacciones reales.

## 42. Adventure Mode

Post-MVP.

Debe reutilizar los motores educativos.

Puede combinar materias.

Ejemplos:

- multiplicaciones para atacar;
- lectura para descubrir pistas;
- ciencias para resolver acertijos;
- geografía para viajar;
- historia para ordenar eventos.

## 43. MVP Scope — completo, posterior a R1

La primera entrega R1 se rige por la sección 0. Este es el objetivo del MVP completo a desarrollar después de instalar y probar R1; no es una condición para la primera entrega.

El MVP completo incluye únicamente:

### Core

- perfiles;
- RewardEngine;
- $100 weekly cap;
- RewardLedger;
- XP;
- streaks;
- achievements;
- challenges;
- Parent Mode.

### Mathematics

- tablas 1–10;
- Learning;
- Practice;
- Adaptive;
- Speed;
- Bosses.

### Español / Lengua

#### Comprensión Lectora

- Learning;
- Practice;
- Literal;
- Sequence;
- Main Idea;
- Details;
- Cause/Effect;
- Inference;
- Vocabulary;
- Evidence;
- Adaptive Learning;
- Reading Boss.

También se conservan las actividades de repaso de Español incluidas desde R1: párrafos, punto y coma, moralejas/refranes, b/v y dictado asistido por el adulto.

## 44. Post-MVP Roadmap

### Phase 2

Español:

- Ortografía;
- Vocabulario.

### Phase 3

- Inglés.

### Phase 4

- Ciencias.

### Phase 5

- Geografía;
- Historia.

### Phase 6

- Gramática;
- expansión Matemática;
- Adventure Mode avanzado.

El orden podrá cambiar según las necesidades reales de Judy.

## 45. Critical Product Rules

### Rule A

El dinero recompensa progreso verificable.

### Rule B

Toda recompensa pasa por RewardEngine.

### Rule C

Todas las materias comparten el límite semanal.

Default:

$100 MXN.

### Rule D

Las materias utilizan mastery independiente por habilidad.

### Rule E

El sistema debe detectar concretamente qué habilidad necesita mejorar Judy.

### Rule F

Velocidad solo se utiliza cuando tenga sentido pedagógico.

### Rule G

La práctica continúa después de alcanzar el límite monetario.

### Rule H

Agregar nuevas materias no debe requerir rehacer la economía, XP, retos o Parent Mode.
