# ESTADO · preparación para Madrid

**Sesión:** refinamiento visual V3 sobre V2 y cierre S0–S5/B19.
**Fecha:** 21 sep 2026. **Rama:** `preparacion-madrid-p1`; base `e6c989b`.
El commit que contiene este archivo identifica el checkpoint. Push autorizado.
**Aceptación:** candidata digital. La presentación visual no cierra validación física,
condiciones del organizador ni presupuesto.

## Decisiones vigentes

Aldo pidió mejorar realismo de carteles, estructura y codornices, además de comprobar
el recorrido bilingüe y la fluidez disponible. Se conserva arquitectura B: veinte
cartuchos idénticos, ocho estaciones de recuperación y doce posiciones de cultivo,
Ø4.56 m, piso 0 y cama 0.62 m. La configuración dimensional y el modelo de proceso
no cambiaron. B19 permanece separado, sin acceso físico aprobado.

Siguen D1/D2, provisiones completas sin descontar cosechas, reservas de treinta días
y separación de salmuera/metanogénesis. El aporte nominal es 2.46% de kcal; 25.26 kWh/d
es un subtotal eléctrico con hipótesis y cargas omitidas. Los límites acumulados están
en `CIERRE-ACUMULADO.md` y `CALCULOS-CIERRE.md`. La matriz conserva 27 obligatorios:
uno documental con evidencia, 24 parciales, uno pendiente y uno por confirmar.

## Cambios entregados en V3

Los 38 rótulos, con 65 líneas, adaptan el tamaño de la fuente y la proporción de su
textura a la superficie. Se elimina la compresión horizontal de glifos, se centra el
bloque tipográfico con márgenes y se corrige el contraste sobre placas claras.
Archivo identifica equipos e IBM Plex Mono códigos. Bastidores, tornillos y apoyos
hacen explícito cómo se montan los carteles; el orden de rotación conserva la
inclinación local. Las dos caras se leen sin reflejo.

Se añaden ménsulas de luminarias, apoyos fijos del aviario y una rejilla abierta.
Estos detalles siguen siendo ilustrativos: no acreditan resistencia, tolerancias,
limpieza, interferencias con cultivos o bienestar animal. Las codornices incorporan
alas plegadas, plumaje, pecho moteado, patas con dedos, ojos, pico y cuello articulado.
La referencia visual principal es Kyoto City Zoo; no se distribuyen sus fotografías.
Las siete figuras no prueban capacidad para las 24 aves propuestas. Las mallas de
cada ave llevan nombres identificables en la exportación.

La ficha del aviario ofrece «Ver aves de cerca / Inspect birds». En móvil cierra el
panel y encuadra el conjunto; «Perspectiva» recupera la vista general. Se conservan
idiomas locales, recorrido, fallos, selección e inventarios. `RECORRIDO-BILINGUE.md`
prepara el ensayo con una persona ajena al proyecto. Memoria y deck mantienen español.
La comparación histórica conserva su ruta `COMPARACION-VISUAL-V2.html`, ahora con
V2 frente a V3 y vistas de detalle de las aves.

## Pruebas y evidencia

Pasaron determinismo, conservación, cuatro fallos, recuperación y secuencia B19;
también geometría y cotas. El verificador V3 comprueba fuentes, límites de texto,
proporción de placas, apoyo de las aves, teclado, vista móvil y los cinco pasos del
recorrido en ES y EN. Las pruebas offline pasaron desde extracción limpia, con
correspondencia de archivos mediante S6. Los reportes conservan errores y solicitudes
HTTP; las pruebas superadas no registran ninguno.

Se detectaron Intel RPL-P y RTX 4060 Laptop, con pantalla interna y sin proyector.
Intel headless dio aproximadamente 24 FPS en una muestra con el modelo en marcha.
NVIDIA falló al crear contexto headless, pero funcionó en ventana X11: la primera
muestra de ocho segundos dio aproximadamente 72 FPS a 1080p en detalle alto; la
repetición final desde el ZIP limpio registró 134.75. La variación entre muestras
breves impide tratarlas como rendimiento mínimo sostenido.
`PRUEBA-REFINAMIENTO-V3.json` registra la comprobación final y `RENDIMIENTO-V3-INTEL.json`
la muestra Intel. Las condiciones difieren; no es una comparación controlada de GPU.

Se reducen llamadas de dibujo agrupando conjuntos estáticos e instanciando rocas.
Las sombras se actualizan a 10 Hz durante el movimiento y la cámara a frecuencia
completa. Blender regeneró BLEND/GLB y render con GPU. La reimportación verificó
1,242 mallas y cotas del piso a 1e-5 m de tolerancia digital. MCP añadió
`MILPA360_V3_REVISION`, conservó V2 y comprobó 63 piezas de aves. No se sobrescribió
la sesión abierta del usuario. PDFs, deck y vídeo se sincronizaron con las capturas V3; se revisaron visualmente
las diez páginas y las nueve diapositivas, y se decodificó el vídeo de 300 segundos.

## Siguiente acción exacta

Abrir la demo y revisar el aviario, después ensayar `RECORRIDO-BILINGUE.md` con alguien
ajeno al equipo. Conectar el proyector y medir legibilidad y rendimiento en el equipo
del evento. Continuar B14–B19/E4 según el cierre acumulado cuando existan recursos,
reglas, cotizaciones y mediciones. No repetir instalaciones ni auditorías ya resueltas.
Los cinco archivos preexistentes del usuario conservan sus hashes y quedan fuera del
commit. Ensayo humano, revisión independiente y aceptación física permanecen abiertos.
