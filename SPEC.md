# JudyQuest — Product Specification

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

## 2. Product Philosophy

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

## 3. Subjects Roadmap

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

## 4. Future Learning Modules

Los siguientes módulos forman parte oficial del roadmap, aunque no son necesarios para liberar el MVP.

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

## 5. Module Architecture

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

## 6. Shared Platform Core

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

## 7. User Roles

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

## 8. Shared Weekly Reward Budget

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

## 9. Weekly Reset

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

## 10. Anti-Farming System

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

## 11. Reward Periods

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

## 12. Reward Ledger

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

## 13. Weekly Cap

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

## 14. Partial Rewards

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

## 15. No Money for Normal Practice

Una respuesta correcta puede generar:

XP

pero no dinero.

El dinero proviene de:

- challenges;
- bosses;
- milestones;
- achievements.

## 16. XP Economy

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

## 17. Streak System

Registrar:

currentStreak

bestStreak

Debe existir actividad mínima para que una sesión cuente.

Abrir la aplicación y contestar una sola pregunta no mantiene la racha.

## 18. Mathematics Module

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

## 19. Mathematics Learning Mode

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

## 20. Mathematics Practice

Registrar:

fact

answer

correct

responseTime

sessionId

timestamp

Los errores deben reaparecer posteriormente mediante spaced retry.

## 21. Mathematics Mastery

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

## 22. Mathematics Speed Mode

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

## 23. Mathematics Bosses

Un boss por tabla.

Primera victoria:

- badge;
- XP;
- reward.

Replay:

- XP reducido;
- récord;
- sin dinero adicional.

## 24. Reading Module

Forma parte de:

LanguageModule → ReadingModule.

Objetivo:

comprender lo leído.

No medir únicamente velocidad.

## 25. Reading Skills

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

## 26. Reading Learning Mode

Cada habilidad debe explicar:

qué es

↓

ejemplo guiado

↓

ejercicio asistido

↓

ejercicio independiente

## 27. Reading Practice

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

## 28. Reading Detective Mode

Objetivo:

encontrar evidencia dentro del texto.

Ejemplo:

“¿Qué frase demuestra que Ana tenía miedo?”

El sistema evalúa:

- respuesta;
- evidencia seleccionada.

## 29. Reading Inference Mode

La respuesta no aparece literalmente.

Debe enseñarse:

pistas

+

conocimiento contextual

=

inferencia

## 30. Reading Mastery

Dominio independiente por skill.

Ejemplo:

Literal: 94%  
Sequence: 82%  
Main Idea: 91%  
Cause & Effect: 78%  
Inference: 57%  
Vocabulary: 69%

## 31. Reading Adaptive Learning

Priorizar:

- habilidades débiles;
- errores recientes;
- nuevas habilidades;
- habilidades olvidadas.

Reducir progresivamente:

- contenido consistentemente dominado.

## 32. Reading Difficulty

Considerar:

- longitud;
- vocabulario;
- estructura;
- número de personajes;
- cantidad de información;
- complejidad inferencial;
- distractores;
- pasos de razonamiento.

## 33. Reading Timers

En comprensión lectora:

PRECISIÓN  
→ COMPRENSIÓN  
→ CONSISTENCIA  
→ EFICIENCIA

El cronómetro solo aparece después de cierto dominio.

Nunca premiar lectura apresurada con baja comprensión.

## 34. Reading Bosses

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

## 35. Future Module Pattern

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

## 36. Cross-Module Missions

Ejemplo:

Misión Escolar Semanal

- 3 sesiones de Matemáticas;
- 3 sesiones de Español;
- dominar 5 facts;
- completar 3 textos con >= 80%.

Reward:

$15 MXN.

Permite incentivar equilibrio entre materias.

## 37. Child Dashboard

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

## 38. Subject Dashboard

Cada materia muestra:

- skills;
- mastery;
- weak skills;
- strong skills;
- retos;
- bosses;
- progreso reciente.

## 39. Parent Dashboard

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

## 40. Reward Goals

“Estoy ahorrando para…”

Ejemplos:

Helado — $40  
Cine — $100  
Juguete — $300

No realiza transacciones reales.

## 41. Adventure Mode

Post-MVP.

Debe reutilizar los motores educativos.

Puede combinar materias.

Ejemplos:

- multiplicaciones para atacar;
- lectura para descubrir pistas;
- ciencias para resolver acertijos;
- geografía para viajar;
- historia para ordenar eventos.

## 42. MVP Scope

El MVP incluye únicamente:

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
- Cause/Effect;
- Inference;
- Vocabulary;
- Evidence;
- Adaptive Learning;
- Reading Boss.

## 43. Post-MVP Roadmap

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

## 44. Critical Product Rules

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
