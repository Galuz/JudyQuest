# JudyQuest

Primera versión de la app educativa para Judy: Español y Matemáticas, instalada como PWA y con progreso guardado en el dispositivo.

## Qué funciona

- Aprender palabras nuevas: 20 palabras iniciales, 80 actividades, comprobación inicial, definiciones y repasos guardados por palabra.
- Español: repaso del libro, lecturas adicionales, b/v y dictado asistido por un adulto.
- Repaso del libro (pp. 12–31): ocho temas, 48 preguntas base y 16 alternativas, con explicaciones originales y adaptaciones de las dos fábulas de clase. Incluye fuentes, resúmenes, párrafos, puntos y comas, orden temporal, causa/consecuencia, moralejas y refranes.
- Repaso mixto de 20 preguntas: dos por tema, dos palabras confirmadas con b y dos complementarias con v. No incluye el punto y coma como tema del examen.
- «Repasar mis errores» reconstruye pendientes desde las respuestas locales, propone hasta seis preguntas y prioriza otros ejemplos. Un reintento inmediato o un acierto con ayuda no resuelve el pendiente. No equivale a dominio permanente.
- Matemáticas: aprendizaje de las tablas 1–10, práctica por tabla o mixta, explicaciones y repaso espaciado de errores.
- Examen de Matemáticas (temario pp. 12–22): ocho misiones y 64 ejercicios originales sobre lectura y representación de fracciones, equivalencias, comparación, suma/resta, multiplicación, división, sus partes/residuo y problemas de reparto. Incluye barras visuales, explorador de fracciones, guías cortas, repaso mixto de 16 preguntas y repaso de errores. Las ayudas se registran; no concede premios monetarios de Español. Se basa en la foto del temario, no en las páginas del libro, que no se proporcionaron.
- Ejemplos guiados, texto consultable, corrección después de cada pregunta y resumen de resultados.
- Sesiones reanudables, respuestas, precisión por habilidad y XP persistidos en IndexedDB. Cada acierto original suma 2 XP; los reintentos no suman y los XP no equivalen a dominio ni a premio monetario.
- Modo adulto con PIN: presupuesto, entrega de recompensas y edición del banco de palabras.
- Recursos de la app, contenido y tipografías incluidos en el precache de la PWA. No hay APIs de contenido ni fuentes remotas.

## Estado y validación

La evidencia técnica, el despliegue confirmado y la lista para la tablet están en [docs/validacion-r1.md](docs/validacion-r1.md). R1 está implementada; la aceptación con Judy sigue pendiente.

## Desarrollo

Node.js 22 o superior; npm.

```bash
npm ci
npm run dev
npm test
npm run lint
npm run build
node scripts/check-pwa.mjs
npm run preview
```

El service worker se genera en producción, no en el servidor de desarrollo. Para comprobar instalación/offline usa el build servido por HTTPS o un origen local de confianza. El PIN usa Web Crypto y requiere ese contexto seguro.

## Instalar en la tablet

Al pie de cada pantalla aparece **Versión AAAA.MM.DD-HHMMSS**. El identificador se genera automáticamente al compilar, con fecha y hora de Ciudad de México, y queda incluido en el código de esa versión. Una PWA antigua o sin conexión muestra su propia versión; no consulta la última publicada para rellenar la etiqueta. Para actualizar, abre la app con internet y pulsa **Actualizar ahora** cuando aparezca el aviso fuera de una sesión.

1. Abre la dirección publicada con conexión a internet.
2. En **Adultos**, crea un PIN de 4–8 dígitos y guárdalo: todavía no hay recuperación automática.
3. Espera a que aparezca **Lista para usar sin conexión**.
4. En iPad: Safari → Compartir → Añadir a pantalla de inicio. En Android: Chrome → menú → Instalar aplicación.
5. Abre desde el nuevo icono. Completa una actividad de Español y otra de Matemáticas.
6. Cierra y vuelve a abrir para verificar el progreso. Después prueba en modo avión.

No uses navegación privada ni borres los datos del navegador: el progreso es local. Cambiar de dominio, navegador o dispositivo crea otro almacenamiento. No hay sincronización ni respaldo remoto. La versión inicial no incluye exportación/restauración. El PIN es un control familiar local; no protege contra alguien que manipule el almacenamiento del dispositivo.

## Dictado

En Español, elige **Dictado con un adulto**. En cada palabra, el adulto abre la tarjeta con su PIN, lee la frase y pulsa **Ocultar y dar la tablet a Judy** antes de devolverla. Se ocultan tanto la palabra como la frase escrita. Judy escribe la palabra; se distinguen errores b/v de tildes y otros errores.

El banco general contiene 34 palabras: las 24 iniciales, siete con b confirmadas del cuaderno y tres nuevas con v. No se presenta como ranking de frecuencia. Se puede reemplazar en Adultos; las sesiones ya empezadas conservan su contenido original.

En Español → **Palabras de mi cuaderno** se pueden practicar o dictar las siete confirmadas juntas: bebamos, cabían, cabemos, deberíamos, habría, sabiendo y saben. La práctica adicional con v usa vivir, volver, vamos, venimos, ventana, vecino y viajar; no se presenta como lista confirmada del salón. Estos accesos usan las listas del cuaderno/práctica adicional incluso si el adulto personalizó el banco general, sin modificar esa personalización. La corrección del dictado distingue tildes y b/v. No requiere migrar ni borrar el avance guardado.

## Economía: preparación del examen

- Todo el presupuesto semanal (por defecto $100 MXN) se dedica temporalmente a Español. Matemáticas y otras prácticas dan XP, pero ya no habilitan el premio combinado anterior.
- Ocho retos de tema: 10% del presupuesto cada uno ($10 por defecto). Repaso mezclado: el resto ($20). Se calcula en centavos enteros, sin perder redondeos.
- Cada tema requiere 5/6 aciertos originales sin ayuda; el repaso requiere 16/20. Reintentos inmediatos y respuestas asistidas no cuentan como aciertos para dinero. Se permite estudiar de nuevo y completar otra sesión para conseguir un reto pendiente.
- Premio único por reto/perfil/semana, registrado atómicamente al terminar una nueva sesión. Al abrir o refrescar la app, se recuperan premios faltantes de sesiones terminadas que cumplan los requisitos. La recuperación usa el presupuesto configurado, respeta la semana original de finalización y los importes ya registrados (incluso $0 o entregados). No modifica sesiones, XP ni premios existentes. Una transacción y claves únicas impiden duplicados entre pestañas o aperturas. El historial y premios anteriores, incluso entregados, cuentan en el límite semanal. El premio se recorta al saldo disponible.
- Un reto completado sin saldo queda registrado a $0 y no puede cobrarse otra vez esa semana. Cambiar el presupuesto no recalcula premios previos. `rewardAmount` se conserva únicamente por compatibilidad con datos anteriores.
- Semana en America/Mexico_City, de lunes a lunes. No cambia el calendario existente ni el guardado local. El dinero lo entrega un adulto; la app solo lleva el registro.
- Al ganar un premio positivo en una sesión activa, aparece una celebración, suena una caja musical creada con Web Audio y una voz anuncia el importe realmente concedido. Sonido opcional, silenciable y con botón para volver a escucharlo sin conceder dinero. Reabrir resultados no reproduce automáticamente la celebración. La disponibilidad de voz depende del dispositivo; el importe siempre se muestra escrito.
- Las tarjetas y la lista muestran práctica completada por separado del premio semanal. Ver mi resultado permite reabrir una sesión guardada sin volver a hacerla; los resultados explican los aciertos independientes y los premios pendientes.
- Probar sonido permite comprobar y activar audio sin ganar dinero. La voz se invoca directamente desde el toque de prueba/reproducción, sin temporizador; los tonos esperan a que AudioContext termine de reanudarse, también después de una interrupción. Los fallos de audio no se presentan como fallos de guardado.
- Audio iniciado desde un toque para compatibilidad móvil. Animación limitada y respetuosa de movimiento reducido. No usa audios remotos ni requiere red para el sonido de caja.
- Las protecciones evitan duplicados de uso normal, no la manipulación deliberada del reloj o almacenamiento local.

## Arquitectura

`src/domain`: modelos, calificación, progreso, semanas y PIN.

`src/data`: interfaces de repositorios, adaptadores Dexie y motor transaccional de recompensas. Los módulos educativos no acceden a IndexedDB.

`src/content`: lecciones, relatos, preguntas y generadores; `content/spanish` contiene el banco editable inicial.

`src/components`: sesión, feedback, lección matemática y acceso adulto. `src/screens.tsx`: inicio y paneles.

`SPEC.md`, `PLAN.md` y `TASKS.md` mantienen el alcance y pendientes de R1/R2/R3. Bosses, adaptación avanzada, rachas y nuevas materias quedan para después de la primera prueba.

## Publicación

Compatible con hosting estático HTTPS. Para Vercel, importa este repositorio: `npm run build`, directorio `dist`. La configuración está en `vercel.json`. Las rutas internas usan hash para facilitar recargas y hosting estático.

Durante la transición se mantienen dos instalaciones independientes:

- [Sites](https://judyquest.german-glz01.chatgpt.site): conserva la dirección y la PWA que Judy ya tiene instalada. La publicación en Sites sigue siendo manual; su configuración permanece en `.openai/hosting.json`.
- [GitHub Pages](https://galuz.github.io/JudyQuest/): `.github/workflows/ci.yml` publica automáticamente cada push a `main`, incluidos los merges, después de aprobar lint, pruebas y ambas compilaciones/PWA. También permite ejecución manual desde Actions sobre `main`. Los PR se verifican sin publicar.

Sites permanece activo hasta que el adulto indique expresamente retirarlo. Publicar Pages no actualiza ni redirige la instalación de Sites. Cada dominio conserva su propio progreso: no hay sincronización ni transferencia automática. Antes de cambiar la instalación de Judy, resolver el traslado de su avance; no desinstalar ni borrar datos de Sites durante la transición.

El build predeterminado usa `/` para Sites. Para Pages se usa `JUDY_BASE_PATH=/JudyQuest/ npm run build`, y `node scripts/check-pwa.mjs /JudyQuest/` comprueba el manifest, los iconos, el shell y el fallback offline bajo esa ruta. La CI conserva el build de Sites como artefacto durante siete días y despliega a Pages el build con su subruta. No intercambiar los dos artefactos.

En GitHub, Settings → Pages → Source debe estar en **GitHub Actions**. El job de despliegue usa el token efímero de GitHub (`pages: write` e `id-token: write`); no requiere un PAT ni credenciales de Sites. Los despliegues se serializan y no se cancela uno que ya está en curso. El enlace de la ejecución muestra la URL publicada. El aviso **Actualizar ahora** de la PWA sigue apareciendo fuera de las sesiones.

Ninguna publicación requiere backend de progreso ni cuentas infantiles.

## Fuentes de los relatos históricos

Los textos y preguntas son originales, basados en hechos verificados:

- [NASA: lanzamiento de Apolo 11](https://www.nasa.gov/image-article/50-years-ago-apollo-11-launches-into-history/).
- [NASA: Apolo 11 y su regreso](https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo11.html).
- [National Park Service: cuatro vuelos de los Wright](https://www.nps.gov/places/3-four-powered-flights.htm).
- [National Park Service: cuarto vuelo](https://www.nps.gov/places/000/fourth-flight-landing.htm).

El temario de Español fue proporcionado por el adulto. No se han reproducido las páginas del libro ni se afirma conocer las preguntas del examen.

## Palabras con ayuda

Las palabras educativas subrayadas abren un significado sencillo y un ejemplo sin salir de la misión. El glosario se incluye en la app para uso offline. Agregar términos y variantes en `src/content/glossary.ts`; usar `GlossaryText` en nuevos textos y `AnswerOption` para opciones consultables sin anidar botones ni elegir una respuesta al tocar una palabra. Mantener lenguaje para 10 años según SPEC.md.


## Aprender palabras nuevas

Desde Inicio → **Mis palabras** o Español → **Aprender palabras nuevas**. Se presentan hasta dos palabras nuevas por día y hasta tres repasos vencidos por sesión, sin tiempo límite. Primero se pregunta qué significa una palabra; **Todavía no la conozco** enseña la respuesta y prepara otro ejemplo guiado. La colección muestra el estado de las 20 entradas y la próxima fecha de repaso. **Leer con mis palabras**, dentro de Español, elige hasta tres palabras ya practicadas y cambia su contexto.

El catálogo revisado de 120 candidatas está en `docs/vocabulario-4to-5to-analisis.md`. Esta entrega implementa únicamente las primeras 20; no es una prueba oficial de grado ni mide producción oral o escritura libre. Sexto sigue fuera de alcance.

IndexedDB versión 3 añade `vocabulary` sin modificar sesiones, ajustes, perfiles ni recompensas existentes. Cada palabra tiene intentos, ayudas, historial acotado de recuerdos independientes y próxima fecha. La respuesta y el avance de la palabra se guardan juntos. Las sesiones conservan sus preguntas al reabrirse.

Reglas de esta primera versión:

- Consultar una definición guarda la ayuda antes de abrirla. No cuenta como acierto ni error. Si se consulta durante una pregunta, esa respuesta se registra con ayuda; las consultas a una palabra y el feedback también hacen que sus siguientes intentos de ese día sean práctica apoyada.
- «La recuerdo» requiere tres actividades distintas acertadas sin ayuda en tres días distintos, incluyendo una lectura. Solo los repasos que ya correspondían ese día añaden evidencia; practicar antes no pospone su fecha.
- «La sigo recordando» añade otra recuperación independiente en un día distinto, al menos siete días después de la primera evidencia. El calendario habitual hace que sea posterior.
- Intervalos progresivos de 1, 3, 7, 14 y 30 días, según el calendario de Ciudad de México. Son reglas iniciales del producto, ajustables tras probar con Judy.
- Un error vuelve a programar para el día siguiente y reinicia la evidencia de la racha, conservando totales históricos. Pedir ayuda no borra lo ya aprendido. Los reintentos guiados nunca demuestran recuerdo independiente.
- Los primeros veinte significados se practican con opciones y lecturas curadas; no se modifica automáticamente el texto de lecciones empezadas ni se generan relatos con IA en ejecución.

Verificación: pruebas de migración v2→v3, atomicidad/doble respuesta, ayudas antes y durante la misión, desconocimiento/reintento, fechas, diversidad, retención y separación del premio monetario. La instalación y el uso offline reales en la tablet siguen pendientes del adulto.
