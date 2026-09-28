# Validación de R1 — 28 de septiembre de 2026

Este registro describe la revisión inicial de R1. La configuración posterior de publicación simultánea en Sites y GitHub Pages se documenta en README → Publicación; conservar Sites hasta autorización expresa del adulto.

R1 está implementada. Este registro distingue comprobaciones de desarrollo, publicación y aceptación en la tablet. La prueba con Judy sigue pendiente; no se declara R1 aceptada.

## Cambios de esta revisión

- Eliminado el import sin uso de `CheckCircle2` que bloqueaba lint en `src/screens.tsx`.
- Añadido `node scripts/check-pwa.mjs` después del build en GitHub Actions.
- Alineados README, SPEC, PLAN y TASKS con los ocho temas del libro, las siete palabras confirmadas y los nueve premios semanales de Español.
- Documentada la diferencia entre XP de práctica, recuerdo independiente y requisitos monetarios. No se cambiaron reglas educativas, datos ni premios.

## Comprobaciones locales

Entorno: macOS, Node 24.13.1, npm 11.8.0. Dependencias instaladas con `npm ci` desde el lockfile. CI utiliza Node 22.

| Comprobación | Resultado |
| --- | --- |
| `npm run lint` | Aprobado, sin errores |
| `npm test` | 45 pruebas en ocho archivos, todas aprobadas |
| `npm run build` | TypeScript y build aprobados |
| `node scripts/check-pwa.mjs` | Aprobado: 15 recursos únicos verificados, incluidos shell, fuentes woff2, contenido e iconos |

El build conserva un aviso no bloqueante por el bundle principal de aproximadamente 546 kB (174 kB gzip). No se dividió el bundle en esta corrección.

Las pruebas cubren calificación, contenido, semanas de Ciudad de México, PIN, persistencia, migraciones v1→v2 y v2→v3, doble respuesta, concurrencia, premios parciales/sin saldo, recuperación de premios, ayudas y calendario de vocabulario. Las pruebas de IndexedDB usan fake-indexeddb y las de audio usan sustitutos; no demuestran comportamiento de audio o almacenamiento en la tablet real.

## Recorridos en navegador local

Build de producción `2026.09.28-143320`, servido inicialmente en `http://127.0.0.1:4173`, con almacenamiento de prueba separado del dominio publicado.

- Matemáticas: sesión mixta completa de ocho preguntas originales. Se introdujo un error intencional; apareció un reintento después de otras preguntas. La recarga conservó la respuesta y su explicación. Resultado: 7/8 y 14 XP, sin dinero. El resultado se conservó tras recargar.
- Lectura: se detuvo el servidor después de preparar la caché. Se recargó Español, se inició y completó «Doce segundos que hicieron historia», con texto consultable y feedback. Resultado: 5/5 y 10 XP. Al cerrar la pestaña y abrir nuevamente la URL del resultado, se conservó la sesión con el servidor todavía detenido.
- Progreso: dos sesiones terminadas, 24 XP y 92% de aciertos originales después de reabrir. El reintento matemático no sumó XP adicional.
- Vista de progreso revisada a 768×1024 y 390×844: sin desbordamiento horizontal. No equivale a una auditoría completa de accesibilidad ni a probar controles táctiles físicos.

La carga sin servidor verifica el uso de caché local. No simula todas las condiciones de modo avión, instalación standalone, suspensión del sistema ni actualización de una PWA instalada. No se completaron aquí dictado con PIN, edición del banco, todos los temas ni prueba audible en un dispositivo físico.

## Publicación comprobada

- URL pública: [JudyQuest](https://judyquest.german-glz01.chatgpt.site).
- Sites confirmó versión 10 con despliegue `succeeded`.
- Versión visible en la página: `2026.09.27-191028`.
- Fuente registrada por Sites: `fd69bd9d6aa3c75ff57ac4eb488c1d625a19c3af`; no se equipara este SHA con el historial de GitHub.
- Se comprobó en navegador la carga del inicio y del panel de Español con los nueve premios. No se completaron sesiones en el dominio publicado ni se modificaron sus datos de estudio.

Esta comprobación corresponde a la publicación existente. Las correcciones de lint, CI y documentación de esta revisión no implican por sí mismas una nueva publicación o un merge en `main`.

## Prueba pendiente en la tablet — adulto y Judy

Confirmación del usuario, 28 de septiembre de 2026: pudo instalar la PWA y puede actualizarla. Se dan por comprobadas ambas capacidades. Sigue pendiente confirmar conservación del avance tras actualizar, modo avión, dictado, audio y las sesiones con Judy.

Usar siempre el mismo dominio y navegador para conservar el avance. No borrar datos ni usar navegación privada.

1. Abrir la URL con internet, anotar la versión visible y esperar «Lista para usar sin internet». Si aparece «Actualizar ahora», hacerlo fuera de una sesión.
2. Instalar desde Safari → Compartir → Añadir a pantalla de inicio (iPad), o desde el menú de Chrome → Instalar aplicación (Android). Si ya está instalada, abrir desde su icono.
3. Completar una lectura, un tema del libro y una sesión matemática. Comprobar explicaciones, claridad y dificultad con Judy.
4. Hacer dictado con el adulto: abrir la tarjeta con PIN, leer y ocultar palabra/frase antes de devolver la tablet. Verificar corrección y guardado. No registrar el PIN en este documento.
5. Probar el botón de sonido, el silencio y la voz; anotar si el importe escrito corresponde al premio realmente ganado. Reabrir resultados no debe volver a conceder dinero.
6. Cerrar completamente la app y volver a abrir: conservar sesiones, respuestas, XP, ajustes y premios.
7. Activar modo avión. Abrir desde el icono y completar actividades de ambas materias; cerrar y reabrir otra vez. Volver a conectar después.
8. En la próxima actualización real, comprobar que el aviso se muestra fuera de una sesión y que actualizar conserva el avance.

Registrar: modelo de tablet, sistema/navegador, versión de JudyQuest, pasos realizados, resultado esperado/observado y cualquier instrucción que Judy no entienda. Esta evidencia permite cerrar R1.5; las casillas permanecen pendientes hasta recibirla.

Exportación/restauración, recuperación del PIN, adaptación avanzada y nuevas materias siguen en el roadmap; no se añadieron en esta revisión.
