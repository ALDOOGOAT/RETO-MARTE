# ESTADO · preparación para Madrid

**Paquete cerrado:** P2 · geometría (documental y de cálculo; no valida el sistema físico)
**Fecha:** 19 sep 2026 · **Rama:** `preparacion-madrid-p1`, local y sin push
**Commits:** P0 en `7ea6b3f`; P1 en `508f30a`; P2 en el commit que acompaña a este archivo
**Final:** 3–5 nov 2026, Getafe. La fecha de entrega está sin confirmar.

## Archivos de P2

| Archivo | Contenido |
|---|---|
| `config/milpa360.parameters.json` | v`P2-2026-09-19`: D1 y D2 registradas, más 6 parámetros nuevos (4 pendientes declarados) |
| `analysis/milpa360_p2.py` | Geometría paramétrica, barrido de interferencias, láminas y bloque `GEOM` |
| `config/milpa360.geometria.json` | **Generado.** Geometría resuelta que consumen láminas y simulador |
| `docs/madrid/P2-GEOMETRIA.md` | Decisiones, tabla dimensional, interferencias, acceso y pendientes |
| `prototipo/planos/P02-corte-transversal.html` | **Regenerada** desde el JSON |
| `prototipo/planos/P03-planta-carrusel.html` | **Regenerada** desde el JSON |
| `prototipo/planos/P04-balance-flujos.html` | Corregida a mano: «10 m²» → 6.66 m² |
| `prototipo-3d/milpa360-simulador.html` | Un anillo de 20 cartuchos; geometría inyectada |
| `prototipo/fotos-para-subir/P0*.png` | PNG regenerados de las cuatro láminas |

Sin cambios en deck, atlas, kit de campo ni documentos del plan. Los presupuestos del usuario
siguen sin commit e intactos.

## Decisiones tomadas en P2

- **D1 · Arquitectura B.** Un anillo de 20 cartuchos idénticos en Ø 4.56 m, con pasillo
  central de 0.90 m. Es la única opción evaluada que resuelve acceso **y** trasvase sin
  agrandar el módulo. A cambio: −36 % de área de cultivo (6.26 → 4.00 m²), que baja la
  cobertura de 3.0 % a 2.6 % de las kcal — dentro del ruido de sus propios supuestos.
  A queda descartada (dominada: +76 % de huella y el trasvase sigue abierto), B′ también
  (duplica la huella por 64 kcal/d) y **C queda como respaldo** para el demostrador.
- **D2 · Horizonte de 539 d** para dimensionar y **≈355 d** como caso nominal del concurso.
  Los 730 soles del plan se retiran: daban 3.1 años contra los «aprox. 2 años» de las bases.

Ambas se tomaron por delegación del usuario sobre la recomendación de P1. **El equipo puede
revocarlas** (B10). D3–D7 de P1 siguen vigentes.

## Pruebas ejecutadas

- `python3 analysis/milpa360_p2.py` — valida el JSON contra el esquema y reproduce **todas**
  las cifras de P1 §3 (0.3331 m²/cartucho, 4.00 y 2.66 m², 110 kg, Ø 1.36 m). Aserciones:
  regeneración + cultivo = anillo, las tres especies caben en el tramo de cultivo, y los dos
  parámetros verticales siguen nulos (si alguien les pone valor, la comprobación falla y
  obliga a rehacer el análisis vertical).
- `python3 analysis/milpa360_p1.py` sigue pasando sin cambios.
- `python3 analysis/p0_verificacion.py` **se repuntó al commit auditado** `c3e0ad3`: leía del
  simulador las constantes de dos anillos, que P2 eliminó. Ahora las lee con `git show`, así
  que el acta de P0 vuelve a ser reproducible y lo seguirá siendo aunque el diseño cambie.
  Su sección 7 sí recorre el árbol actual: encuentra Ø 4.56 m en los artefactos P2, y también
  diámetros anteriores en documentos históricos o todavía sin actualizar. No interpreta esas
  coincidencias textuales como geometría activa del simulador.
- Simulador en navegador (headless, WebGL por software): **consola sin errores**, y las
  aserciones nuevas dan `20 cartuchos · descanso 0–152 soles · cultivo 96 soles · 6.66 m²
  (4.00 de cultivo)`.
- Las cuatro láminas se renderizaron y se revisaron a la vista: sin recortes ni solapamientos.

## Resultados principales

1. **El trasvase queda resuelto por construcción.** Con un anillo de cartuchos idénticos, un
   lote pasa de S8 a C1 sin cambiar de pieza: la operación de palear sustrato desaparece
   porque desaparece su motivo. Era el bloqueo que ninguna otra opción cerraba.
2. **Sin solapamiento nominal entre cartuchos, casco y núcleo durante el giro.** Barrido de
   160 pasos: hueco entre cartuchos 41 mm, holgura al casco 100 mm, pasillo 900 mm, los tres
   constantes. Falta modelar la huella de los equipos fijos.
3. **La holgura vertical NO está verificada** y no puede estarlo: faltan la altura de dosel y
   la cara inferior del equipo de estación. Presupuesto a repartir: 1.58 m.
4. **Dos márgenes muy justos.** El ancho del cartucho (0.60 m) es exactamente el alcance
   supuesto, sin holgura; y girar un cartucho en el pasillo deja 22 mm.
5. **La masa del cartucho no está validada**: 110 kg (408 N en Marte) sin fuente del límite
   de manipulación en 0.38 g. En la Tierra son 1 078 N y el demostrador exigirá polipasto.
6. **El envolvente central de Ø 1.36 m pasa a ser requisito** del digestor y del reactor de
   salmuera, ninguno dimensionado todavía.
7. **Los cinco diámetros están retirados.** 3.5, 4.76, 5.40 y 6.00 m han desaparecido; el
   4.56 m ya no se escribe a mano en ningún sitio: el generador lo inyecta en el simulador
   entre marcadores y dibuja las láminas. El reloj pasa de 730 fijo a 525 soles.

## Bloqueos

Siguen abiertos **B1–B9** de P0 (reglamento de Madrid, reto evaluado, delegación,
retroalimentación del jurado, interpretación del 100 %, presupuesto, medición del sustrato,
fuentes y visibilidad del repo) y **B11–B14** de P1.

**B10 baja a ratificación:** D1 y D2 están tomadas y todo el paquete está construido sobre
ellas; el equipo puede revocarlas, pero ya no bloquean el trabajo.

Nuevos:

| # | Qué falta |
|---|---|
| B15 | Altura de dosel de camote, frijol y rábano (sin fuente) |
| B16 | Altura libre bajo el equipo de cada estación (sin diseño mecánico) |
| B17 | Dimensionado del digestor y del reactor contra el envolvente de Ø 1.36 m |
| B18 | Cálculo estructural del deck giratorio, par de arranque y bloqueo |

## Siguiente acción exacta

1. **P3 · simulación y relato visual**, que es el paquete que toca:
   - Conectar las animaciones al estado del modelo y mostrar unidades y tipo de evidencia.
   - Recuperar el pulido visual que P2 dejó a medias: la densidad de planta en el cartucho
     nuevo se ve escasa, y las fichas siguen diciendo «40 días» y «23 g» de codorniz cuando
     P1 midió 50.8 d y 32.1 g.
   - Comparar escenarios sin programar el resultado favorable; probar fallos, reinicio y uso
     sin Internet.
2. **En paralelo**, cerrar B15 y B16: sin ellos no hay comprobación vertical y la lámina P-02
   seguirá marcando esa holgura con «¿?».
3. **Recapturar las imágenes del deck.** `deck/hero.jpg`, `nucleo.jpg`, `planta.jpg` y
   `tormenta.jpg` son fotogramas del simulador **de dos anillos**: hoy contradicen al
   simulador, a las láminas y a la memoria. Las poses por URL están en `deck/LEEME.md` y
   siguen siendo válidas; hay que volver a dispararlas y republicar el deck.
4. **Decisión del equipo** sobre los JPG superados de `prototipo/fotos-para-subir/`
   (P02 y P03 de sep 8 contradicen las láminas nuevas y siguen sin borrar).

## Reproducir

```bash
git switch preparacion-madrid-p1
python3 analysis/milpa360_p2.py
python3 analysis/milpa360_p1.py
python3 analysis/p0_verificacion.py
cd prototipo/planos && ./render.sh
```
