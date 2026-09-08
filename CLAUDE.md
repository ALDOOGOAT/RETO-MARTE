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
