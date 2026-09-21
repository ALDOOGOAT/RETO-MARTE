> **Corte vigente 21 sep:** D1/D2 ratificadas; B15–B19 siguen como brechas físicas/de ingeniería,
> con disposición exacta en [cierre acumulado](CIERRE-ACUMULADO.md). P07 prepara el ensayo E4.
> **Revisión S3:** piso y cama separados; superficie útil descontando reborde 35 mm.
> Valores vigentes: cartucho 0.25715 m² útiles (0.33311 de huella), cultivo 3.086 m²,
> total de sustrato 5.143 m²; masa nominal 84.9 kg/cartucho sin tara. Piso 0, cama 0.62,
> techo 2.20 m. Las tablas y comparación originales de P2 de abajo conservan su corte histórico;
> resultados actuales en `config/milpa360.geometria.json` y [P4/S3](P4-MECANICA-ENSAYOS.md).
> Entrada, equipos, resistencia y ergonomía siguen pendientes; ver B19 actualizado.
> **21 sep · B19:** [candidata de acceso](B19-ACCESO.md), con trayectorias continuas,
> vestíbulo y depósitos parametrizados en P06/visor. No cambia la aceptación física de P2.

# P2 · Geometría, interferencias y modelo paramétrico — MILPA-360

**Rama:** `preparacion-madrid-p1` · **Fecha:** 19 sep 2026
**Fuente única de parámetros:** [`config/milpa360.parameters.json`](../../config/milpa360.parameters.json) v`P2-2026-09-19`
**Generador:** `python3 analysis/milpa360_p2.py`
**Geometría resuelta (generada, no editar):** [`config/milpa360.geometria.json`](../../config/milpa360.geometria.json)

Todo lo que sigue es **cálculo** sobre los parámetros declarados. No hay mediciones propias.
Ni las láminas ni la escena 3D son prueba de resistencia, de estanqueidad ni de que el
mecanismo funcione: son la geometría nominal dibujada a escala.

---

## 0. Decisiones adoptadas en P2; aceptación física pendiente

| # | Decisión | Estado |
|---|---|---|
| **D1** | **Arquitectura B**: un anillo de 20 cartuchos idénticos en Ø 4.56 m, pasillo central | **Ratificada por delegación, 21 sep.** B10 cerrado como decisión, no validación |
| **D2** | **Horizonte de diseño 539 d** (DRA 5.0); caso nominal del concurso ≈355 d | **Ratificada por delegación, 21 sep.** Confirmación del organizador (B1) pendiente |

### Por qué B y no otra

P2 priorizó conservar la rotación del sustrato y eliminar el trasvase entre anillos.
**S0 reabre la aceptación del acceso:** la holgura en planta no resuelve B15–B19.
Esta comparación no demuestra una solución mecánica ni una optimización exhaustiva.

| | Actual | A | **B** | B′ | C |
|---|---:|---:|---:|---:|---:|
| Ø casco | 4.56 | 6.05 | **4.56** | 6.61 | 4.56 |
| Huella (m²) | 16.3 | 28.7 | **16.3** | 34.3 | 16.3 |
| Cultivo (m²) | 6.26 | 6.26 | **4.00** | 6.17 | 4.00 |
| Pasillo nominal en planta (no valida acceso) | **no** | sí | **sí** | sí | sí |
| Trasvase entre anillos | **sin resolver** | **sin resolver** | **eliminado** | eliminado | manual |

- **A se descarta en esta comparación:** cuesta 28.7 m² de huella (+76 %) para conservar el área de cultivo
  y **sigue sin resolver el trasvase**. Se descarta.
- **B′ no se prioriza con los criterios actuales:** duplica la huella (16.3 → 34.3 m²) para recuperar 2.17 m² de
  cultivo, que a productividad nominal valen ~64 kcal/d. Un módulo presurizado no se
  agranda por eso.
- **C rompe el diferenciador.** Mover el aviario sobre un riel es mover al animal, que es
  justo el ejemplo literal de las bases. La rotación invertida —estaciones fijas, gira el
  sustrato— es lo que distingue al equipo (`PLAN-MAESTRO-BIOMARS.md` §0.5). Queda como
  **respaldo** sólo si el presupuesto mecánico del demostrador no alcanza.
- **Lo que cuesta B** es −36 % de área de cultivo: la cobertura baja de 3.0 % a **2.6 %** de
  las kcal. Esa cifra ya está dentro del ruido de sus propios supuestos (el escenario de
  productividad la mueve entre 2.0 y 3.3 %), y P1 ya estableció que el aporte calórico **no
  es** la propuesta de valor. Se paga poco por resolver dos bloqueos.

**Lo que B conserva íntegro:** la rotación invertida, las 12 etapas de cultivo simultáneas
(hipótesis de resiliencia por desfase), el digestor encadenado y el retorno a Chiapas. Cambia la **forma**,
no el principio.

### Por qué 539 d

Los 730 soles del plan dan 3.1 años con tránsitos, frente a los «aprox. 2 años» de las bases:
es indefendible y se retira. Entre las dos cifras restantes no hay que elegir, hay que separar
funciones, que es la práctica normal de ingeniería:

- **Se dimensiona a 539 d** (DRA 5.0, perfil 2037). Es la envolvente conservadora y es la
  arquitectura de referencia de la NASA.
- **Se presenta 355 d** como caso nominal del concurso, porque es lo que se deriva de las
  bases (730 − 174 − 201).

El ciclo del cartucho dura 160 soles ≈ 164 d, así que **caben 3.28 vueltas** en el horizonte
de diseño y 2.16 en el de las bases. Ambos terminan durante un ciclo: se requiere inventario de cierre y cosecha pendiente.

---

## 1. Geometría resuelta

Nada de esta tabla está escrito a mano: sale de `milpa360_p2.py` y es lo que consumen las
láminas y el simulador.

| Magnitud | Valor | Origen |
|---|---|---|
| Casco | Ø 4.56 × 2.20 m | `geometria_digital` |
| Anillo de cartuchos | r 1.58 → 2.18 m | CALC: `r1 = r_casco − holgura_pared`, `r0 = r1 − alcance` |
| Ancho del cartucho | 0.60 m | **= el alcance supuesto desde un solo lado** |
| Cartuchos | 20 + 2 de repuesto | `decision_equipo` |
| Sector útil | 16.92° de 18° | holgura angular 0.94 |
| Área por cartucho | 0.3331 m² | CALC |
| Cuerda exterior | 0.641 m | CALC |
| **Área de cultivo** | **4.00 m²** | 12 posiciones |
| **Área de regeneración** | **2.66 m²** | 8 posiciones |
| Área total de sustrato | 6.66 m² | 20 posiciones |
| Hueco central libre | Ø 3.16 m | CALC |
| **Envolvente para equipos centrales** | **Ø 1.36 m** | CALC con pasillo de 0.90 m |
| Altura libre sobre el cartucho | 1.58 m | CALC: 2.20 − 0.62 |

### Masa

| Escenario de densidad | Por cartucho | En Marte | En la Tierra |
|---|---:|---:|---:|
| Conservador (1 800 kg/m³) | 132 kg | 489 N | 1 294 N |
| **Nominal (1 500 kg/m³)** | **110 kg** | **408 N** | 1 078 N |
| Favorable (1 200 kg/m³) | 88 kg | 326 N | 863 N |

Anillo completo nominal: **2 199 kg**; con los dos repuestos, 2 418 kg.
La densidad sigue siendo un **supuesto sin medir** (bloqueo B7): es el parámetro que más
mueve la masa del sistema.

---

## 2. Transferencia de sustrato: resuelta por construcción

Éste era el bloqueo de P0 que ninguna otra opción cerraba.

Con dos anillos de formas distintas, pasar un lote de regeneración a cultivo exigía **palear
sustrato** de una bandeja a otra: una operación manual, sucia, con polvo en un módulo cuyo
límite es 0.1 mg/m³, y sin forma de trazar el lote.

Con un solo anillo de cartuchos idénticos **no hay trasvase**: el mismo cartucho avanza de la
posición S8 a la C1 sin cambiar de pieza. La operación desaparece porque desaparece el motivo.

| Posición | Estación | Soles | Sale |
|---|---|---:|---|
| S1 | Reacondicionamiento | 8 | salmuera al reactor separado |
| S2 | Aviario | 8 | cartucho con estiércol |
| S3 | Larvario | 8 | frass y larva cosechada |
| S4 | Descanso + inóculo | 8 | — |
| S5 | Cobertura de musgo | 8 | — |
| S6 | Consolidación | 8 | — |
| S7 | Muestreo | 8 | muestra a análisis |
| S8 | **Compuerta de liberación** | 8 | a cultivo **o** a cuarentena |
| C1–C12 | Cultivo | 96 | camote, frijol, rábano y rastrojo |

Ciclo completo **160 soles** (164.4 d). Cada cartucho entra al aviario cada **160 soles**; pasa **152 soles fuera** de él.
El intervalo sin deposición no acredita regeneración biológica.
El tramo de cultivo (96 soles ≈ 98.6 d) cubre el camote (85 d), el frijol (85 d) y admite
3.95 siembras de rábano (25 d). El script lo comprueba con aserciones.

---

## 3. Interferencias a lo largo del giro

Barrido de **160 pasos** (20 posiciones × 8 soles), midiendo cada holgura en cada paso.

| Holgura | Mínimo | ¿Varía en el giro? | |
|---|---:|---|---|
| Entre cartuchos vecinos (mínimo interior) | 30 mm | constante | ✓ sobre el criterio de 20 mm |
| Cartucho ↔ casco | 100 mm | constante | ✓ estructura, aislamiento y tubería |
| Ancho del pasillo central | 900 mm | constante | ✓ |

El barrido confirma que los cartuchos nominales no se solapan entre sí, con el casco ni con
el núcleo durante el giro. **No modela la huella de los equipos fijos**: su interferencia en
planta sigue pendiente de dimensionarlos. Tampoco comprueba las holguras verticales.

### Lo que NO queda verificado

La interferencia vertical tampoco se puede cerrar con los datos actuales:

| Falta | Por qué bloquea |
|---|---|
| `estaciones.altura_dosel_maxima` | BVAD Rev2 no da altura de dosel de camote, frijol ni rábano |
| `estaciones.altura_libre_bajo_equipo` | No hay diseño mecánico de aviario, larvario ni muestreo |

Presupuesto disponible a repartir entre ambas: **1.58 m**. Hasta que los dos tengan fuente,
la lámina P-02 marca esa holgura con «¿?» y no se afirma que el dosel pase bajo el equipo.

---

## 4. Acceso humano y cambio de cartucho

| Comprobación | Resultado | |
|---|---|---|
| Huella del cartucho | 0.641 × 0.617 m (envolvente rectangular) | |
| Ancho nominal frente al pasillo | 0.641 < 0.90 m | margen 259 mm; ruta pendiente |
| Diagonal (girarlo en el pasillo) | 0.890 vs 0.90 m | **10 mm nominales; giro sin verificar** |
| Alcance necesario desde el pasillo | 0.60 m | **= el alcance supuesto. Sin margen** |

Dos advertencias que hay que poder defender ante el jurado:

1. **El ancho del cartucho es exactamente el alcance supuesto.** No hay holgura: si la
   antropometría en 0.38 g (OCHMO-TB-049, sin leer) da menos de 0.60 m, hay que estrechar el
   cartucho y se pierde área. El parámetro está marcado `supuesto`, con rango 0.50–0.70 m.
2. **La masa no está validada.** Un cartucho nominal son 110 kg (408 N en Marte). No existe
   fuente leída del límite de manipulación manual de un tripulante en 0.38 g
   (`acceso.masa_max_manipulable`, pendiente). En la Tierra el mismo cartucho pesa 1 078 N y
   el demostrador **necesita una ayuda mecánica dimensionada**.

El envolvente central de **Ø 1.36 m** es un resultado de P2 que pasa a ser **requisito**: el
digestor y el reactor de salmuera separado (D3) tienen que caber ahí sin invadir el pasillo.
Ninguno de los dos está dimensionado todavía (`digestor.diametro_envolvente`, pendiente).

---

## 5. Los cinco diámetros: retirados

P0 encontró cinco diámetros distintos circulando a la vez. En el simulador y las láminas
P-02/P-03 actualizadas, el diámetro sale del generador y se **inyecta** entre marcadores.
Los documentos históricos y las capturas anteriores aún conservan cifras superadas.

| Diámetro | Dónde estaba | Ahora |
|---|---|---|
| Ø 3.5 m | comentario en `milpa360-simulador.html` | eliminado |
| Ø 4.76 m | ficha del sitio, ficha de datos y **placa pintada en el casco** | generado desde `GEOM` |
| Ø 5.40 m | lámina P-03 | lámina regenerada |
| Ø 6.00 m | lámina P-02 (cota y nota) | lámina regenerada |
| Ø 4.56 m | simulador, plan maestro, presupuesto | **valor nominal vigente; aún hay textos manuales e históricos** |

También se retiraron, por la misma vía: «10 m² de bandeja» (son 6.66 m² de cartucho, 4.00 de
cultivo), «8 interiores + 12 exteriores» y el reloj fijo de «730 soles», que ahora lee el
horizonte de diseño (525 soles ≈ 539 d).

---

## 6. Qué cambió en el simulador

`prototipo-3d/milpa360-simulador.html` pasa de dos anillos contrarrotantes a **uno**:

- La geometría vive en un bloque `GEOM` **generado** entre `/*←P2:GEOM*/` y `/*P2:GEOM→*/`.
  El simulador tiene que abrir sin servidor, así que no puede hacer `fetch` de un JSON: la
  única forma de que no se desincronice es que el generador lo escriba.
- Un solo anillo de 20 cartuchos. **Cada cartucho lleva su planta y su musgo** desde que se
  construye, y se muestra lo que toca según su posición: al pasar de S8 a C1 el mismo
  cartucho deja de ser regeneración y pasa a ser cultivo. Es el trasvase resuelto, visible.
- Las luminarias fijas cubren **sólo el arco de cultivo** (posiciones 8–19).
- El aviario se escala a 0.75: el domo de 0.40 m de radio no cabía sobre un cartucho de
  0.64 × 0.60 m. Las plantas bajan de 9 a 6 por cartucho y su escala máxima de 2.05 a 1.45,
  por la misma razón y para no pasar de 180 grupos vegetales en escena.
- La telemetría lista las 20 posiciones y el descanso llega a 152 soles, no a 56.
- Las aserciones ya no comprueban un 56 fijo: comprueban que el área del anillo **en escena**
  coincida con la generada, que el cartucho no invada el casco y que el pasillo no baje de
  0.90 m. Si alguien toca un radio, salta.

Verificado en navegador: consola sin errores y
`MILPA-360 · 20 cartuchos · descanso 0–152 soles · cultivo 96 soles · 6.66 m² (4.00 de cultivo)`.

---

## 7. Reproducir

```bash
git switch preparacion-madrid-p1
python3 analysis/milpa360_p2.py     # geometría, interferencias, láminas y bloque GEOM
python3 analysis/milpa360_p1.py     # balances (sin cambios)
python3 analysis/p0_verificacion.py
cd prototipo/planos && ./render.sh  # PNG de las láminas (requiere google-chrome)
```

## 8. Pendientes que P2 deja abiertos

- Altura de dosel y altura libre bajo el equipo de estación → sin ellas no hay comprobación vertical.
- Límite de manipulación manual en 0.38 g → condiciona el cambio de cartucho en S8.
- Antropometría de pasillo y alcance en 0.38 g (OCHMO-TB-049) → el alcance va sin margen.
- Dimensionado del digestor y del reactor de salmuera contra el envolvente de Ø 1.36 m.
- Densidad del sustrato medida (B7) → mueve toda la masa.
- Cálculo estructural del deck giratorio, del par de arranque y del bloqueo: **no hechos**.
  Una malla no es prueba de resistencia.
- Láminas P-01 y P-05: P-01 sólo existe como JPG, sin fuente HTML. P04 se corrigió a mano y
  volverá a divergir; conviene generarla como P-02 y P-03.
- `prototipo/fotos-para-subir/P02-*.jpg` y `P03-*.jpg` son exportaciones **anteriores** y
  contradicen las láminas nuevas. Están sin borrar, a la espera de decisión del equipo.

## Revisión S0 · 20 sep 2026

- La holgura mínima es `2 r0 sin(gap/2) = 29.8 mm`; 41 mm era el arco exterior.
- El fondo de la envolvente rectangular es `r1 − r0 cos(sector/2) = 0.617 m`;
  una diagonal menor que el ancho no demuestra un giro en un pasillo curvo con persona,
  equipos, paredes ni ayuda de elevación. Retirada la conclusión «pasa» como validación.
- Con suelo a 0.62 m y techo a 2.20 m hay **1.58 m libres**: la figura de 1.75 m
  no cabe erguida. **B19:** definir altura interior/suelo/entrada y repetir geometría.
  No se aumenta el casco a ciegas: afecta estructura, masa y concepto.
- La cúpula de la escena excedía la cota de 2.20 m en 0.96 m. S0 la hace coincidir
  con el techo nominal; el conflicto de habitabilidad se deja visible.
- El signo del giro Three.js invertía la posición de las bandejas respecto a las
  estaciones fijas. Corregido para que la posición lógica coincida con el sector físico.
- P-04/P-05 y deck permanecen identificados como históricos hasta su regeneración.

Prueba: `python3 analysis/verificar_geometria.py` falló antes de corregir el mínimo,
y pasa después. No verifica fabricación, resistencia ni mantenimiento.
