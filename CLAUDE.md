# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es este repo

Espacio de preparación para el **Reto Marte UNACH 2026 / Mars Challenge** (hackathon,
8–9 sep 2026, UNACH, Chiapas). No es un proyecto de software: contiene las bases oficiales
en PDF y documentos de contexto/investigación.

- **`CONTEXTO-RETO-MARTE.md`** — documento maestro: reglas, 12 fases, 3 entregables, roles,
  criterios de evaluación, ODS, datos técnicos ECLSS (NASA-STD-3001 Vol. 2 Rev. E) y el
  riesgo de salud conductual/psiquiátrica de NASA. **Leer esto primero.**
- **`INVESTIGACION-MARTE.md`** — investigación a fondo: marco "Tierra como sistema vivo" (Gaia),
  banco de datos duros de Marte, estado del arte de los 6 problemas de supervivencia, y un
  **banco de 15 ideas** (bio / software / hardware / socio-humano) con causa raíz, novedad,
  viabilidad y retorno a la Tierra, mapeadas a la rúbrica y a los ODS.
- **`kit-diseno/`** — kit de campo imprimible: 9 plantillas (`*.dc.html` + `canvas.json`)
  publicadas como canvas en https://claude.ai/code/artifact/44cdf842-4f7b-4b2d-9f04-50e38e272b39
  Para cambiarlas: editar el `.dc.html`, re-sembrar con el helper de la skill `design` y
  republicar `kit-de-campo-reto-marte.html` a esa misma URL.
- **`prototipo-3d/milpa360-simulador.html`** — **el diferenciador ejecutable.** Dos escenas en un
  solo archivo, sin build (three.js 0.160 por CDN, texturas y geometría generadas por código):
  · **PLANETA** — Marte con textura procedural (rasgos reales situados por lon/lat), atmósfera,
    estrellas y **puntos clicables** que sacan los datos duros de `INVESTIGACION-MARTE.md §2`.
  · **HÁBITAT** — el módulo presurizado **en corte** (Ø 4.56 m × 2.2 m) sobre terreno marciano:
    carrusel de **un solo anillo de 20 cartuchos idénticos** (arquitectura B) con pasillo central
    y reloj de 525 soles, aviario con recolección de huevo, larvario con
    lecho de frass, biodigestor de dos cámaras con **gasómetro de campana flotante** que sube y baja
    según se produce o se consume el biogás, filtración HEPA en pared, tríada marciana con hoja
    nervada, costra de musgo como semáforo, y **tormenta de polvo** que marchita en vivo las
    bandejas próximas a cosecha (≈25 % vs 100 %).
  · **El texto vive en el modelo, no flotando**: rótulos pintados en los tanques («BIODIGESTOR»,
    «CÁMARA A · ANÓXICA ClO₄⁻→Cl⁻+O₂»), en el casco y en placas de estación al borde de la cubierta.
    No añadir etiquetas HTML flotantes en la vista de hábitat.
  · **Los flujos son tubería montada en estructura** (colector en anillo + montantes + bajantes), y
    el sentido se ve por el testigo que corre dentro del tubo — no por partículas en el aire.
    **Cada tubo es clicable** y abre su ficha (qué lleva, de dónde a dónde, cifras): las siete
    fichas `f_*` de `FICHAS`. El tubo real mide 2 cm, así que lleva un volumen de selección
    invisible más grueso; si se añade un conducto nuevo, pasarle su clave de ficha.
  · **El riego es POR GOTEO sobre PIVOTE CENTRAL**, no una rampa fija. Con 12 bandejas avanzando
    un paso cada 8 soles, una rampa fija regaría cada bandeja una vez cada 96 soles. El colector
    anular gira con el anillo, con 2 goteros por bandeja tendidos sobre la cama (goteo de baja
    altura, tipo LESA): nada de aspersión, el límite de polvo dentro del hábitat es 0.1 mg/m³.
    Base documental: R11 «riego eficiente» del plan maestro + la lámina P-01 («goteo y sensores»).
  · **Rendimiento — no usar `transmission`.** El material físico con `transmission` obliga a three
    a renderizar la escena entera **dos veces**; en la Intel integrada del equipo bajaba a 13 fps.
    Con un transparente + `clearcoat` el vidrio se ve igual y va a 55. Las mallas de planta se
    fusionan por material con `fusionar()` (three no trae `BufferGeometryUtils` en la build UMD),
    y las luces puntuales están limitadas a cuatro: cada una cuesta en todos los fragmentos.
  · **Las fichas llevan diagrama** (`viz`, construido con los helpers de `VIZ`): barra de
    proporción, cadena de pasos o rejilla de bandejas. Al añadir una ficha nueva, darle su `viz`.
  · **Las hojas usan textura en escala de gris y el color va en el material.** Es lo que permite
    marchitar interpolando de verde a pajizo: multiplicar una textura verde por un tinte marrón
    da casi negro. Y `geoHoja()` **normaliza las UV** — `ShapeGeometry` las escribe con las
    coordenadas crudas del contorno y sin normalizar la hoja sale negra.
  · **V8 (25 sep 2026):** addons de three r160 empaquetados en `vendor/three-addons.js` porque
    `file://` no carga módulos ES. **Todo recurso binario va en base64 dentro de un `.js`**
    (`vendor/tripulacion.js`, `vendor/texturas-pbr.js`, `vendor/marte-usgs.js`): Chrome no sube a
    WebGL imágenes de disco.
    Personas = avatares Microsoft Rocketbox (MIT) con clips reales; API intacta
    `MILPA_PERSONA(altura, tipo).userData.animar(dt, velocidad, tarea)`. Regenerar con
    `analysis/preparar_tripulacion.py` y `analysis/preparar_texturas_pbr.py`, no a mano.
    **No volver a añadir una sonda de reflejos horneada (`PMREM.fromScene`)**: con el terreno
    escaneado Chrome deja de entregar `captureScreenshot`/screencast y se rompen pruebas y vídeo.
    La cámara de ambos visores usa `MILPA_VISUAL.camaraSuave()` (resorte sobre θ, φ, log d y mira);
    no volver al `lerp` lineal.
  · **V9 (26 sep 2026): UNA sola calidad, sin selector ni ajuste automático, y sin posprocesado.**
    Medido con temporizadores de GPU en la Intel integrada a 1080p: render 11.6 ms, y GTAO + brillo +
    MSAA en HDR sumaban ~44 ms (13–18 fps). Ahora: MSAA nativo, ACES del renderer, `pixelRatio`
    ≤ 1.25, tramado (`dithering`) en los materiales y viñeta en CSS (`#vineta`); módulo 80–106 fps.
    No reintroducir `EffectComposer`. El brillo que se pierde es mínimo (comparado en capturas).
    Trucos que sí cuestan ~0: texturas 2K con mipmaps, anisotrópico máximo, encuadre de sombra por
    vista (±4.5 m dentro del módulo, ±6.5 fuera). `fusionar()` **conserva índices** (antes
    desindexaba: 3–6× vértices) y la vegetación instanciada saca del lote las bandejas vacías en vez
    de escalarlas a cero. Codorniz con esferas compartidas `GEO.ovalo`/`GEO.ovaloChico`.
  · **Isla de voz** (`milpa360-isla.js`, en simulador, acceso y atlas): cápsula que se abre en diálogo
    y lee cada ficha. El texto completo aparece al empezar y se ilumina **por frase** con los tiempos
    exactos de Piper; no volver al resaltado palabra a palabra (se estimaba, desfasaba y en inglés
    parecía que el texto «cambiaba»). En el Atlas flota abajo y en reposo queda como orbe en la esquina. Voces locales Piper pregrabadas (`audio/fichas/`,
    `milpa360-voces.js`), generadas con `~/.local/share/milpa-voz/bin/python analysis/narracion_fichas.py`
    a partir de `analysis/textos_fichas.mjs` (título + resumen público de cada ficha, fases de acceso,
    secciones del atlas). Si cambias un resumen, vuelve a ejecutar el script; no edites los MP3.
    En el módulo, el equipo del que se habla late con un halo en el suelo (`resaltar()`); en los
    tubos, el testigo corre y brilla.
  · **Planeta V9:** mosaico Viking MDIM 2.1 a 4K y relieve MOLA (USGS, dominio público,
    `analysis/preparar_marte.py`), Sol a ~65° de la cámara para que se vea el terminador y
    atmósfera que sólo brilla del lado de día. El Atlas dibuja el mismo globo con un sombreador
    WebGL2 propio (sin three.js) que se gira arrastrando.
  · **Atlas interactivo:** Tierra frente a Marte en barras (Marte sale de las fichas; las referencias
    terrestres están citadas al pie), aviso de Marte que viaja y vuelve sobre una línea de tiempo,
    anillo legible al pasar con «Seguir un cartucho» (estaciones de `geometria.estaciones`) y retícula
    de 100 celdas de calorías con huevo y cultivo por separado. Paleta validada con la skill `dataviz`.
  · **V10 (27 sep 2026) · modo Gestos, opcional** (`milpa360-gestos.js/.css`, botón «Gestos» junto a
    «Despiece»). MediaPipe HandLandmarker 1.0.1 viene de jsdelivr y el modelo de storage.googleapis,
    **sólo al pulsar el botón**: la carga normal sigue en 0 HTTP, pero **la demo con gestos necesita
    internet** y la librería envía telemetría a Google (la imagen de la cámara no sale del equipo).
    Funciona con doble clic (`file://`, probado sin `--allow-file-access-from-files`). La inferencia va
    en un **Worker creado desde `blob:`, con delegado CPU, a ~15 Hz**: `detectForVideo` es síncrono
    (20–50 ms) y en el hilo principal se comería el presupuesto de 9–12 ms del render.
    Gestos: mano abierta orbita · pinza hace zoom · puño desplaza · dos manos despiezan · índice + 0.6 s
    abre ficha · palma quieta 1 s cierra. Los gestos son **un escritor más** de `orbe`/`mira`/
    `S.explosionT` con los mismos límites que el ratón (`limitarPhi`, `limitarDist`); no tocar
    `camaraSuave()`. Clic y gesto comparten un solo raycast (`objetoEn`/`picarEn`).
    El despiece es continuo (`S.explosionT` ∈ [0,1], tabla `DESPIECE` de 9 grupos con nombre) y con
    t=0 vuelve exacto al origen, cosa que comprueba P3. Sin etiquetas flotantes: la pieza apuntada lleva
    halo más contorno y la información sale en la ficha y la isla. Las fichas muestran costos de
    `milpa360-costos.js`, **generado** por `analysis/presupuesto_s4.mjs` («por cotizar» si no hay
    precio; no editar a mano). Prueba: `node analysis/verificar_gestos.mjs`. Las perillas de
    calibración están en `MILPA_GESTOS.ajustes`: se ajustan con la mano real, no se adivinan.
    Medido en la Intel (`docs/madrid/PRUEBA-V10-GESTOS.json`): 60 fps con gestos activos frente a 63
    apagados. La inferencia va a ~7 Hz (88 ms; el objetivo era 15) y el p95 sube a 40 ms sólo mientras
    están activos: MediaPipe usa la misma GPU para preparar la imagen. Tras la primera descarga
    funciona sin red desde la caché HTTP. **Activarlo una vez con internet en el equipo de la demo.**
    En móvil, la isla de voz en reposo queda como orbe en la esquina (antes tapaba las vistas).
  · **V11 · agarrar piezas.** La pinza sobre una pieza (7 estaciones y `cartucho-01`, con sus plantas)
    la saca a un «escenario» delante de la cámara, con fondo atenuado y pedestal cian. Mano abierta o
    pinza la giran, dos manos la escalan, deslizar cambia de pieza y la palma quieta la devuelve.
    Al entrar se abre su ficha con «qué falta comprobar» desplegado. Doble clic hace lo mismo con el
    ratón. API de pruebas: `window.MILPA_INSPECCION`. La devolución restaura padre, posición, cuaternión y
    escala **bit a bit**: no romperlo. La captura está encadenada al resultado del worker, y
    `MILPA_GESTOS.tick()` reparte el movimiento entre los fotogramas del render.
  · **V12 · realismo sin coste.** `?vfx=` (0, 1 o lista: `gotas,lamparas,burbujas,polvo,hojas,leds`).
    Gotas instanciadas, con impactos y mancha mojada, exageradas por legibilidad. Seis LED hortícolas
    rosa-magenta con halo y haz aditivos. Su **luz se finge en el shader** de follaje y sustrato:
    uniform con las 6 posiciones y caída de 0.72 m, **sin luces nuevas**. Medido en la Intel: 64 fps con
    efectos frente a 63 sin ellos, y 541 draw calls frente a 550 (`docs/madrid/PRUEBA-V12-REALISMO.json`).
    Delegado a Codex (`openai/codex-plugin-cc`), verificado aquí en Chrome real.
    Scripts CDP con `new WebSocket` en Node 20: `node --experimental-websocket`.
  Poses de captura y parámetros de URL (`ui`, `piso`, `casco`, `sol`, `theta`, `phi`, `dist`,
  `storm`, `play`, `vista` — ya no hay posprocesado que desactivar, ver V9 arriba): ver **`deck/LEEME.md`**.
  Publicado en https://claude.ai/code/artifact/74ae65a1-055b-4443-869e-178c3a40d7e7
  (`milpa360_build.py` es el modelo Blender **anterior**; se conserva como registro de proceso.)
- **`deck/`** — 9 diapositivas 16:9 del pitch de 5 min (`*.dc.html` + `canvas.json`). Las imágenes
  son fotogramas del simulador en **modo captura por URL** (`?ui=0&piso=0&theta=&phi=&dist=&storm=`);
  las poses exactas están en `deck/LEEME.md`. Publicadas en
  https://claude.ai/code/artifact/9df5f219-932c-4c41-a091-3119dbebf37b
  Para cambiarlas: editar el `.dc.html`, re-sembrar con el helper de la skill `design` y republicar
  `pitch-milpa-360.html` a esa misma URL.
- **`visuales/atlas-marciano.html`** — página animada (5 placas: planeta, números, retardo de
  comms, bucle cerrado de ECLSS, blindaje interactivo) para capturar en diapositivas y video.
  Publicada en https://claude.ai/code/artifact/2bd13ee3-fef1-46d2-9669-1b2a6647057e
  Para actualizarla: editar el archivo y republicar esa misma ruta.
- PDFs fuente (no editar): guía del participante, `ECLSS Requirements Mars Habitat 2026`,
  `Mars Challenge Human Habitation 2026`.

## Notas de trabajo

- Idioma de los entregables y de la documentación: **español**.
- El reto temático de la edición es *"La Tierra como sistema vivo"*, pero el reto específico
  del equipo lo confirma la UNACH — verificar antes de asumirlo (ver §11 de `CONTEXTO-RETO-MARTE.md`).
- La rúbrica tiene 9 criterios de igual peso; "retorno a la humanidad" (impacto en la Tierra)
  y "validez" (respaldo con datos duros) son los que más se suelen descuidar.
- Al agregar investigación nueva, actualizar `CONTEXTO-RETO-MARTE.md` en vez de crear archivos sueltos.
- **El diferenciador del equipo no son las especies** (codorniz, larva BSF, musgo, bacterias: cualquier
  equipo llega a esa lista). Es la **cinemática**: rotación invertida, digestor que además es reactor
  de percloratos, resiliencia por desfase y MFC como biosensor. El argumento está en
  **§0.5 de `PLAN-MAESTRO-BIOMARS.md`** — leerlo antes de tocar cualquier entregable.
- **Convención visual:** piezas de pantalla (simulador, atlas, deck) en oscuro; kit de campo
  impreso en claro. Deck y atlas: Bodoni Moda + Archivo + IBM Plex Mono. **El simulador usa
  Archivo variable (eje de ancho) + IBM Plex Mono, sin serif** — es una interfaz, no una revista.
- **Las bandejas son SECTORES ANULARES, no cuadradas, y el módulo mide Ø 4.56 m.** El sector es
  la única forma que tesela un anillo sin huecos ni esquinas que sobresalgan. Con cuadradas
  hacían falta Ø 4.76 m; el documento original decía Ø 3.5 m, que no cierra (ese círculo tiene
  9.6 m² de piso *total*). No revertir la cifra ni volver a cajas.
- **NINGUNA cifra de geometría se escribe a mano.** Desde P2 la fuente es
  `config/milpa360.parameters.json` → `analysis/milpa360_p2.py`, que emite
  `config/milpa360.geometria.json`, **dibuja** las láminas P-02 y P-03 e **inyecta** el bloque
  `GEOM` del simulador entre `/*←P2:GEOM*/` y `/*P2:GEOM→*/`. Si cambias un radio, ejecuta el
  script; no edites el HTML. Esto es lo que impidió que volvieran los cinco diámetros (P0 encontró
  3.5, 4.56, 4.76, 5.40 y 6.00 m circulando a la vez).
- **Arquitectura B, decidida en P2:** UN anillo de 20 cartuchos idénticos (8 de regeneración +
  12 de cultivo), no dos anillos contrarrotantes. Eso resuelve el trasvase —el mismo cartucho
  avanza de S8 a C1 sin palear sustrato— y deja un pasillo central de 0.90 m. Cuesta −36 % de
  área de cultivo. El descanso entre deposiciones es de **152 soles**, no 56. Razonamiento
  completo en `docs/madrid/P2-GEOMETRIA.md §0`.
- **Los 20 kg de regolito por bandeja son la capa lavada de 2.5 cm, no la cubeta.** La cubeta
  tiene 22 cm (lo que pide el camote) ≈ 165 kg; el sistema mueve ~3.3 t de regolito in situ.
