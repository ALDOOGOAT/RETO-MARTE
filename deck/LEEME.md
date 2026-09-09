# Deck · pitch de 5 minutos

**Publicado:** https://claude.ai/code/artifact/9df5f219-932c-4c41-a091-3119dbebf37b
Exportar PDF baja las nueve diapositivas, una por página. Formato 1600 × 900 (16:9).

## Orden

Se lee de izquierda a derecha, fila por fila. Las diapositivas 01–04 y 06–08 siguen el guion de
`PLAN-MAESTRO-BIOMARS.md` §11. **La 05 (El diferenciador) no va en el video**: es la que se enseña
en la semifinal si el jurado —u otro equipo— nombra las mismas especies.

## Las imágenes salen del simulador, no de un banco

Los cinco renders son fotogramas del propio simulador Three.js en modo captura. Para repetirlos
con otra pose, abre el simulador con estos parámetros, toma captura y reescala a <70 KB:

| Imagen | Parámetros |
|---|---|
| `hero.jpg` (portada) | `?vista=habitat&ui=0&sol=62&theta=-0.62&phi=1.08&dist=10.4&play=0` |
| `planeta.jpg` (diapositiva 02) | `?ui=0&theta=-0.62&phi=1.30&dist=18.5` |
| `planta.jpg` (mecanismo, cenital) | `?vista=habitat&ui=0&piso=0&casco=0&sol=62&theta=-1.5708&phi=0.12&dist=11.5&play=0` |
| `nucleo.jpg` (biodigestor) | `?vista=habitat&ui=0&piso=0&sol=62&theta=-0.78&phi=1.16&dist=5.4&play=0` |
| `tormenta.jpg` | `?vista=habitat&ui=0&sol=62&storm=1&play=0&theta=-0.62&phi=1.04&dist=10.0` |

**Parámetros del simulador:**

| Parámetro | Qué hace |
|---|---|
| `vista=planeta\|habitat` | con qué escena abre |
| `ui=0` | oculta barra, riel, transporte y etiquetas |
| `piso=0` | quita terreno y cielo — el módulo flota en negro |
| `casco=0` | **quita el casco y la cúpula** — es la vista de mecanismo, se ven los dos anillos |
| `sol=<n>` | fija el sol de misión (0–729) |
| `theta` | acimut en radianes · `phi` inclinación (0.05 cenital → 1.50 casi a ras) · `dist` distancia |
| `storm=1` | tormenta de polvo activa · `play=0` pausado |

Dentro del hábitat, **tocar cualquier tubería abre su ficha**: qué recurso lleva, de qué
estación a cuál y con qué cifras. También los tanques, el aviario, el larvario y las placas.

> **Al capturar, espera ~2 s** después de cargar: la cámara entra suavizada y las texturas de
> Marte se generan por código al arrancar.

## Para cambiar una diapositiva

Editar el `.dc.html`, re-sembrar y republicar a la misma URL:

```bash
D="…/skills/design"   # ruta que imprime la skill `design`
node "$D/seed-canvas.mjs" --template "$D/payload.template.html" \
  --out pitch-milpa-360.html --title "Pitch MILPA-360" \
  --artboard Main.dc.html --artboard Problema.dc.html --artboard CausaRaiz.dc.html \
  --artboard Mecanismo.dc.html --artboard Diferenciador.dc.html --artboard Perclorato.dc.html \
  --artboard Desfase.dc.html --artboard Chiapas.dc.html --artboard Limites.dc.html \
  --image logo.png --image hero.jpg --image planta.jpg --image nucleo.jpg \
  --image tormenta.jpg --image planeta.jpg --canvas canvas.json
```

Para ver las diapositivas sin el canvas (son HTML estático): concatenar los cuerpos entre
`<x-dc>` y `</x-dc>` en un archivo con `<base href>` apuntando a esta carpeta.
