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
  · **HÁBITAT** — el módulo presurizado **en corte** (Ø 4.76 m × 2.2 m) sobre terreno marciano:
    carrusel de dos anillos con reloj de 730 soles, aviario con recolección de huevo, larvario con
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
  · **Las fichas llevan diagrama** (`viz`, construido con los helpers de `VIZ`): barra de
    proporción, cadena de pasos o rejilla de bandejas. Al añadir una ficha nueva, darle su `viz`.
  · **Las hojas usan textura en escala de gris y el color va en el material.** Es lo que permite
    marchitar interpolando de verde a pajizo: multiplicar una textura verde por un tinte marrón
    da casi negro. Y `geoHoja()` **normaliza las UV** — `ShapeGeometry` las escribe con las
    coordenadas crudas del contorno y sin normalizar la hoja sale negra.
  Poses de captura y parámetros de URL (`ui`, `piso`, `casco`, `sol`, `theta`, `phi`, `dist`,
  `storm`, `play`, `vista`): ver **`deck/LEEME.md`**.
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
  la única forma que tesela un anillo sin huecos ni esquinas que sobresalgan; la guía de la maqueta
  física (§10) ya decía «8 sectores / 12 sectores». Con cuadradas hacían falta Ø 4.76 m; el
  documento original decía Ø 3.5 m, que no cierra (ese círculo tiene 9.6 m² de piso *total*).
  Comprobación completa en §4.1 del plan maestro. No revertir la cifra ni volver a cajas.
- **Los 20 kg de regolito por bandeja son la capa lavada de 2.5 cm, no la cubeta.** La cubeta
  tiene 22 cm (lo que pide el camote) ≈ 165 kg; el sistema mueve ~3.3 t de regolito in situ.
