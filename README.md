# JudyQuest

Primera versión de la app educativa para Judy: Español y Matemáticas, instalada como PWA y con progreso guardado en el dispositivo.

## Qué funciona

- Español: dos relatos históricos, dos fábulas originales, cuatro refranes, párrafos, punto y coma, b/v y dictado asistido por un adulto.
- Repaso del temario: orden temporal, causa/consecuencia, moraleja, estructura del texto, puntuación y ortografía.
- Matemáticas: aprendizaje de las tablas 1–10, práctica por tabla o mixta, explicaciones y repaso espaciado de errores.
- Ejemplos guiados, texto consultable, corrección después de cada pregunta y resumen de resultados.
- Sesiones reanudables, respuestas, precisión por habilidad y XP persistidos en IndexedDB.
- Modo adulto con PIN: presupuesto, entrega de recompensas y edición del banco de palabras.
- Recursos de la app, contenido y tipografías incluidos en el precache de la PWA. No hay APIs de contenido ni fuentes remotas.

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

1. Abre la dirección publicada con conexión a internet.
2. En **Adultos**, crea un PIN de 4–8 dígitos y guárdalo: todavía no hay recuperación automática.
3. Espera a que aparezca **Lista para usar sin conexión**.
4. En iPad: Safari → Compartir → Añadir a pantalla de inicio. En Android: Chrome → menú → Instalar aplicación.
5. Abre desde el nuevo icono. Completa una actividad de Español y otra de Matemáticas.
6. Cierra y vuelve a abrir para verificar el progreso. Después prueba en modo avión.

No uses navegación privada ni borres los datos del navegador: el progreso es local. Cambiar de dominio, navegador o dispositivo crea otro almacenamiento. No hay sincronización ni respaldo remoto. La versión inicial no incluye exportación/restauración. El PIN es un control familiar local; no protege contra alguien que manipule el almacenamiento del dispositivo.

## Dictado

En Español, elige **Dictado con un adulto**. En cada palabra, el adulto abre la tarjeta con su PIN, lee la frase y pulsa **Ocultar y dar la tablet a Judy** antes de devolverla. Se ocultan tanto la palabra como la frase escrita. Judy escribe la palabra; se distinguen errores b/v de tildes y otros errores.

El banco inicial contiene 24 palabras cotidianas. No se presenta como lista exacta del salón ni como ranking de frecuencia. Se puede reemplazar en Adultos; las sesiones ya empezadas conservan su contenido original.

## Economía R1

- Perfil local inicial: `judy`. Presupuesto global predeterminado: $100 MXN semanales.
- Reto **Exploradora de dos mundos**: terminar una sesión de cada materia, con al menos cuatro preguntas originales y 80% de aciertos al primer intento en cada una. Premio inicial: $10 MXN, configurable.
- Semana: lunes 00:00 a lunes siguiente 00:00, en `America/Mexico_City`; se asigna la sesión a la semana en que termina.
- Una transacción IndexedDB registra cierre de sesión y premio; una clave única por perfil/reto/semana evita duplicados, también entre pestañas.
- Se suman todos los importes concedidos de la semana, incluso los marcados como pagados. El premio se recorta al presupuesto restante.
- Si no hay presupuesto, se registra $0 y se consume el reto de esa semana. El resto de una recompensa parcial no se traslada.
- Cambiar límite o importe afecta a premios futuros. No revoca ni recalcula los registrados. Bajar el límite por debajo de lo ya ganado deja disponible $0.
- Cada respuesta correcta original otorga 2 XP. Los repasos de errores dentro de una sesión no alteran precisión ni generan XP adicional. La práctica habitual nunca concede dinero por sí misma.
- El reloj y los datos son locales: esta versión evita cobros duplicados en uso normal, no pretende resistir la manipulación del dispositivo. Marcar entregado solo registra un pago realizado fuera de la app.

## Arquitectura

`src/domain`: modelos, calificación, progreso, semanas y PIN.

`src/data`: interfaces de repositorios, adaptadores Dexie y motor transaccional de recompensas. Los módulos educativos no acceden a IndexedDB.

`src/content`: lecciones, relatos, preguntas y generadores; `content/spanish` contiene el banco editable inicial.

`src/components`: sesión, feedback, lección matemática y acceso adulto. `src/screens.tsx`: inicio y paneles.

`SPEC.md`, `PLAN.md` y `TASKS.md` mantienen el alcance y pendientes de R1/R2/R3. Bosses, adaptación avanzada, rachas y nuevas materias quedan para después de la primera prueba.

## Publicación

Compatible con hosting estático HTTPS. Para Vercel, importa este repositorio: `npm run build`, directorio `dist`. La configuración está en `vercel.json`. Las rutas internas usan hash para facilitar recargas y hosting estático.

La configuración de Sites, si se utiliza para la primera entrega privada, está en `.openai/hosting.json`. No requiere backend, cuentas infantiles ni servicios de pago.

## Fuentes de los relatos históricos

Los textos y preguntas son originales, basados en hechos verificados:

- [NASA: lanzamiento de Apolo 11](https://www.nasa.gov/image-article/50-years-ago-apollo-11-launches-into-history/).
- [NASA: Apolo 11 y su regreso](https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo11.html).
- [National Park Service: cuatro vuelos de los Wright](https://www.nps.gov/places/3-four-powered-flights.htm).
- [National Park Service: cuarto vuelo](https://www.nps.gov/places/000/fourth-flight-landing.htm).

El temario de Español fue proporcionado por el adulto. No se han reproducido las páginas del libro ni se afirma conocer las preguntas del examen.
