# Prototipo · Dibujo Digital — juego de láminas

Sube **las 5 imágenes de `fotos-para-subir/` en este orden**. Juntas cubren lo que ninguna
sola alcanza a explicar.

| Lámina | Qué aporta | Criterio que refuerza |
|---|---|---|
| **P-01** Lámina general | La imagen que engancha: el módulo por dentro, el ciclo cerrado, la vista exterior | 3 · Diseño · 8 · Presentación |
| **P-02** Corte transversal | Blindaje de regolito, aviario estanco, barreras de presión, cotas | 7 · Relevancia técnica |
| **P-03** Planta del carrusel | **El mecanismo de rotación** — lo que hace única a la propuesta | 2 · Creatividad |
| **P-04** Balance de flujos | Todas las cifras con fuente + las limitaciones declaradas | 6 · Validez |
| **P-05** Biodigestor y perclorato | La aportación técnica original, con la ruta enzimática | 2 · Creatividad · 7 · Relevancia técnica |

## Cómo se generaron

- **P-01** — ilustración digital del equipo.
- **P-02 a P-05** — planos técnicos generados desde código (SVG en `planos/*.html`,
  renderizados con `planos/render.sh` a 3200 × 2200 px y convertidos a JPG de 2000 px para subir (los PNG originales quedan en `planos/originales-png/`)). Los archivos fuente quedan en el
  repositorio como registro de proceso para el **Documento Concepto**.

Para regenerarlos tras un cambio:

```bash
cd prototipo/planos && ./render.sh
```

## Material extra de proceso (opcional)

`../prototipo-3d/fotos-para-subir/` tiene 9 renders de una maqueta 3D previa, incluidos dos de
estructura de alambre y modelo de arcilla. Súbelos como versiones anteriores si quieres reforzar
el criterio 4 · Culminación — la guía pide explícitamente subir el proceso, no solo el resultado.
