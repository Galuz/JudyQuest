# JudyQuest — Product Specification

## Criterio permanente de lenguaje y vocabulario (27 de septiembre de 2026)

Escribir para Judy, de 10 años: instrucciones directas, frases cortas y ejemplos concretos. Simplificar palabras difíciles que no aporten al aprendizaje. Cuando una palabra sí sea útil para aprender o forme parte del temario, conservarla y añadirla al glosario de `src/content/glossary.ts` con significado sencillo, ejemplo y variantes necesarias (plural o conjugación).

Mostrar esas palabras subrayadas en lecturas, preguntas, opciones, guías y explicaciones mediante `GlossaryText`. Al tocarlas, abrir su significado sin salir de la misión ni seleccionar/enviar respuestas. Permitir cerrar y volver al mismo lugar; admitir teclado y lector de pantalla. Incluir el glosario en el contenido disponible sin internet. En controles de navegación, mantener etiquetas sencillas y mostrar la ayuda dentro de la actividad, sin anidar botones.

Aplicar este criterio a todo contenido futuro de Español, Matemáticas y nuevas materias. No reemplazar automáticamente palabras escritas por Judy ni alterar respuestas o puntuaciones.


## Vocabulario inicial — ampliación autorizada del 27 de septiembre de 2026

Implementado «Aprender palabras nuevas» con las primeras 20 entradas del análisis de 4.º/5.º, 80 actividades curadas, diagnóstico breve sin límite de tiempo, ejemplos, colección y repasos adaptados al historial local. Esta ampliación se adelanta al módulo completo de vocabulario de R3 por petición del adulto; no implica implementar sinónimos, familias, bosses ni sexto grado.

Persistencia en IndexedDB v3: estado por sentido de palabra, ayudas, primera/última práctica, evidencia independiente y próxima revisión. Tres actividades distintas en tres días, incluida una lectura, habilitan «La recuerdo»; una recuperación posterior al menos siete días después de la primera habilita «La sigo recordando». Revisiones a 1/3/7/14/30 días, sin adelantar nivel por repetir el mismo día. Las consultas y el feedback se registran como ayuda para esa palabra durante el día local. Los reintentos son guiados. Errores reinician evidencia reciente, no totales históricos. Criterios editoriales ajustables, no baremos clínicos ni escolares.

Hasta dos palabras nuevas por día y tres repasos por sesión. Español incorpora «Leer con mis palabras» para reutilizar hasta tres palabras ya practicadas en contextos distintos. Los modos `vocabulary-*` no habilitan dinero; los XP de práctica no equivalen a recuerdo independiente. La aplicación sigue siendo local, sin cuenta infantil, servidor ni sincronización. README.md detalla las reglas implementadas.

## 0. Alcance vigente de R1 — actualizado el 28 de septiembre de 2026

Esta sección refleja el código actual y sustituye el alcance inicial del 27 de septiembre. Las secciones 1–45 describen la visión y el roadmap; no implican que todas sus funciones estén implementadas. La evidencia de validación y los pendientes están en [docs/validacion-r1.md](docs/validacion-r1.md) y [TASKS.md](TASKS.md).

### Funciones implementadas

| Área | R1 actual | Pendiente después de validar R1 |
| --- | --- | --- |
| Inicio y progreso | Accesos a Español/Matemáticas, sesiones reanudables, precisión por habilidad y XP. | Niveles, rachas y dashboards avanzados. |
| Lectura | Dos relatos históricos, dos fábulas, refranes, explicación, preguntas, evidencia, feedback y resumen guardado. Ocho habilidades lectoras iniciales. | Catálogo más amplio, adaptación y dominio formal. |
| Repaso del libro | Ocho temas de pp. 12–31, 48 preguntas base y 16 alternativas, seis preguntas por tema, repaso mixto de 20 y cola de hasta seis errores. | Validar claridad/dificultad con Judy. |
| Ortografía | Banco editable de 34 palabras, práctica b/v, dictado con PIN y siete palabras confirmadas del cuaderno. | Módulos completos de ortografía y gramática. |
| Matemáticas | Tablas 1–10, grupos, suma repetida, conmutatividad, práctica por tabla/mixta y reintentos espaciados dentro de la sesión. | Speed, bosses, adaptación y dominio avanzado. |
| Vocabulario | 20 palabras y 80 actividades con ayudas registradas, calendario y lecturas contextualizadas. | Validar con Judy antes de ampliar a 100 candidatas adicionales. |
| Recompensas | Nueve retos semanales de Español, presupuesto global, ledger, PIN y recuperación de premios faltantes. | Otros retos, bosses y metas de ahorro. |
| Distribución | PWA, contenido y tipografías locales, IndexedDB v3, aviso de actualización fuera de sesiones. | Respaldo/restauración y recuperación de PIN; sincronización fuera del MVP. |

### Temario confirmado del libro

Las fotografías de Español 5, Serie Trascender, EK Editores, se recibieron el 27 de septiembre. Los ejercicios son originales y las fábulas son adaptaciones identificadas; no se publican las fotografías ni las respuestas manuscritas. Ver [cobertura y decisiones](docs/repaso-espanol-libro.md).

| Páginas | Tema |
| --- | --- |
| 12–15 | Relatos históricos, fuentes y palabras clave |
| 16–17 | Resumen, paráfrasis e ideas principales |
| 18–19 | Párrafos e ideas secundarias |
| 20–21 | Puntos y comas: mayúscula, seguido/aparte/final, listas, vocativo y aclaración |
| 22–23 | Orden temporal y simultaneidad |
| 24–25 | Causa/consecuencia |
| 26–29 | Fábulas y moralejas |
| 30–31 | Refranes y sentido implícito |

El enfoque inicial sobre el signo «;» fue corregido tras revisar el libro. Se conserva su historial, pero no forma parte del repaso del examen. El Recortable 1 no se recibió; las actividades no dependen de él. No se afirma conocer las preguntas del examen.

Las siete palabras confirmadas son bebamos, cabían, cabemos, deberíamos, habría, sabiendo y saben. La lista complementaria con v es práctica adicional. El banco general conserva las 24 palabras originales y añade las siete confirmadas y tres con v: 34 en total. La personalización del adulto no altera las listas específicas del cuaderno ni las sesiones empezadas.

En dictado, el adulto abre palabra/frase con PIN y las oculta antes de entregar la tablet. La corrección distingue b/v, tildes y otros errores; normaliza espacios exteriores y mayúsculas. No requiere reconocimiento de voz ni audio remoto. No se enseña una diferencia artificial de pronunciación entre b y v.

### Progreso y premios vigentes

- El progreso registra sesiones, intentos y precisión por habilidad. Cada acierto original suma 2 XP; los reintentos no suman. XP no equivale a dominio ni a acierto sin ayuda para dinero.
- El presupuesto semanal predeterminado es $100 MXN, dedicado temporalmente al examen de Español. Ocho temas reciben 10% cada uno (redondeado hacia abajo en centavos) y el repaso mixto recibe el resto.
- Cada tema exige 5/6 aciertos originales sin ayuda; el mixto exige 16/20. Ayuda y reintentos no cuentan para el premio. Matemáticas, vocabulario y práctica general conservan XP pero no habilitan el antiguo reto combinado.
- Un premio por perfil/reto/semana; finalización y premio se guardan juntos. El límite incluye dinero entregado y premios anteriores. Un reto sin saldo queda registrado a $0. Cambiar presupuesto no recalcula premios ya registrados.
- La recuperación de premios faltantes se ejecuta al refrescar, con claves únicas y transacción; respeta semana original y premios existentes, sin cambiar sesiones ni XP.
- Semana de lunes a lunes en America/Mexico_City. El adulto entrega el dinero; la app registra lo ganado y pagado.
- Celebración visual, tonos Web Audio y voz opcional por premio positivo; probar/repetir audio no concede dinero. Disponibilidad de voz y audio móvil debe verificarse en la tablet.

### Aceptación y orden de trabajo

R1.0–R1.3 implementan la base y ambos módulos. R1.4 verifica build, lint, pruebas, precache, recorridos, persistencia y actualización. R1.5 corresponde a instalación y uso real con Judy; no se completa por aprobar pruebas automatizadas.

1. Comprobar recorridos completos de Lectura, Matemáticas, repaso y dictado, con corrección y conservación del avance.
2. Verificar que recargas, reintentos y concurrencia no duplican XP de una misma respuesta ni dinero.
3. Comprobar carga desde caché y estudio sin servidor; completar además modo avión, cierre/reapertura y actualización en la tablet.
4. Confirmar el despliegue HTTPS y su versión. Publicación actual: https://judyquest.german-glz01.chatgpt.site.
5. El adulto instala, estudia con Judy y registra comprensión, dificultad, audio y fallos. Corregir bloqueos antes de ampliar funcionalidades.

No hay cuentas infantiles, backend de progreso, exportación/restauración ni recuperación de PIN en R1. El progreso pertenece al origen/navegador/dispositivo: cambiar dominio o borrar sus datos pierde acceso al avance. El PIN es un control familiar local.

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

Los siguientes módulos completos forman parte oficial del roadmap, aunque no son necesarios para liberar el MVP. Excepción acotada: los ejercicios de b/v, dictado, párrafos, puntos y comas del temario confirmado sí forman parte de R1 (sección 0), sin exigir estos módulos completos.

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

También se conservan las actividades de repaso de Español incluidas desde R1: párrafos, puntos y comas, moralejas/refranes, b/v y dictado asistido por el adulto.

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
