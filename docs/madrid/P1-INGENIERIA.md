> **Actualización S3:** se conserva aquí el estudio P1 y sus tablas del corte anterior.
> `milpa360_p1.py` ya descuenta el reborde del cartucho B: 3.086 m² cultivables.
> Usar los resultados regenerados en `milpa360-datos.js` y [P4/S3](P4-MECANICA-ENSAYOS.md)
> para cifras activas; 4.00 m² y las tablas alimentarias/energéticas asociadas quedan históricas.

# P1 · Ingeniería: parámetros, balances y arquitectura — MILPA-360

**Rama:** `preparacion-madrid-p1` · **Fecha:** 15 sep 2026
**Fuente única de parámetros:** [`config/milpa360.parameters.json`](../../config/milpa360.parameters.json), validado por [`config/milpa360.parameters.schema.json`](../../config/milpa360.parameters.schema.json)
**Reproducir:** `python3 analysis/milpa360_p1.py`

Todo lo que sigue es **cálculo** sobre datos publicados y supuestos declarados en ese archivo. No hay mediciones propias.
Cada cifra lleva su tipo de evidencia en el JSON. Los escenarios **conservador / nominal / favorable** no son probabilidades.

---

## 0. Decisiones de P1

| # | Decisión propuesta | Estado | Por qué, en una línea |
|---|---|---|---|
| D1 | **Arquitectura B:** un solo anillo de 20 cartuchos idénticos contra el casco, pasillo central y estaciones fijas | **Pendiente de aprobación del equipo** | Elimina el trasvase entre piezas distintas y deja un pasillo nominal. La entrada al pasillo y evacuación siguen abiertas (B19); no se acredita acceso completo. |
| D2 | Horizonte de diseño en superficie de **539 días** (DRA 5.0) y escenario de bases de **≈355 días** | Pendiente de aprobación y de confirmación del organizador | Las bases hablan de ~2 años en total; 730 soles en superficie más los tránsitos dan 3.1 años (§2) |
| D3 | La salmuera de perclorato va a un **reactor separado**, no a una cámara del digestor metanogénico | Propuesta técnica | La salmuera calculada (20–40 mM) está en o por encima del rango que inhibe a los metanógenos (§6) |
| D4 | La **desintoxicación inicial** del regolito es un proceso ISRU **fuera del módulo**; el módulo solo verifica y reacondiciona | Propuesta técnica | Un lavado inicial pide 1.8–13 m³ de agua según el escenario (§6) |
| D5 | El musgo deja de ser «semáforo de seguridad». La liberación de un lote a cultivo exige **análisis** | Propuesta técnica | Un indicador más tolerante que el cultivo da falsos «apto» (AUD C4) |
| D6 | El biogás se presenta como **producto de la Parte 2**, no como fuente de energía | Propuesta de discurso | Aporta 0.3–1.5 % de lo que consume la iluminación (§5) |
| D7 | La **cobertura alimentaria** se comunica como 2–3 % de las kcal, con valor de alimento fresco y proteína | Propuesta de discurso | Es lo que da el cálculo con BVAD y USDA (§4) |

Nada de esto abandona el concepto clasificado: el sustrato sigue girando bajo estaciones biológicas fijas y las tres partes siguen encadenadas.
D1 cambia la **forma** (dos anillos por uno), no el **principio**.

---

## 1. Fronteras del sistema

| Frontera | Incluye | Cruza la frontera (debe contabilizarse) |
|---|---|---|
| **Módulo agrícola** | Cartuchos de sustrato, aviario, larvario, digestor, reactor de salmuera, riego, luces | Entra: ración de aves, electricidad, agua de reposición, semillas e inóculos, cartuchos pretratados. Sale: huevo, cosecha, agua condensada, gas tratado, purgas de salmuera y descarte controlado |
| **Hábitat** | Cabina, ECLSS, tripulación | Da energía, calor y agua al módulo. Recibe alimento y agua recuperada (no potable por defecto) |
| **Provisiones iniciales** | Alimento empacado, ración de aves, repuestos, cartuchos de reserva | Cubren el arranque (≥ 85 d) y la fracción no producida |
| **Exterior (ISRU)** | Extracción y pretratamiento de regolito | Entrega cartuchos lavados y verificados; recibe la salmuera para tratar |

Las heces de la tripulación (0.18 kg/d de sólidos) **no entran** en el caso base: el reto exige el 100 % de los residuos de la Parte 1, que son los animales.
El script informa ese flujo aparte, para que el equipo decida si lo incluye.

---

## 2. Escenario temporal

| Escenario | Superficie | Soles | Fuente |
|---|---:|---:|---|
| Bases: ~730 d en total menos tránsitos DRA (174 + 201 d) | **355 d** | 345 | CALC |
| DRA 5.0, clase conjunción (perfil 2037; total 914 d) | **539 d** | 525 | NASA-SP-2009-566 §4 (leído) |
| Clase oposición (alcance del límite de polvo V2 6253) | 30 d | 29 | DRA 5.0 §6; Rev. F p.63 |
| Plan actual: 730 soles en superficie | 750 d | 730 | Decisión anterior del equipo |

El plan actual suma 1,125 días con los tránsitos, unos **3.1 años**, frente a los «aprox. 2 años» de las bases.

**Propuesta D2:**

- Consumibles y reservas se dimensionan a **539 d**. Es la envolvente conservadora y, además, la arquitectura de referencia de NASA.
- El escenario de las bases (**355 d**) se presenta como caso nominal del concurso.
- El reloj del simulador deja de ser un 730 fijo y pasa a leerse de `mision.horizonte_diseno_superficie` (P3).

---

## 3. Arquitectura y geometría

### 3.1 Opciones comparadas (misma función: tres partes encadenadas)

Supuestos de acceso, que están en el JSON y deben confirmarse:

- Pasillo de **0.90 m**. HIDH da 81 × 114 cm como trayectoria de emergencia en la ISS, en microgravedad.
- Alcance desde un solo lado de **0.60 m**, pendiente de antropometría.
- Holgura de pared de **0.10 m**.

| Opción | Ø casco | Huella | Regeneración | Cultivo | Formas de bandeja | Anillos que giran | Acceso |
|---|---:|---:|---:|---:|---:|---:|---|
| Actual (dos anillos) | 4.56 m | 16.3 m² | 4.02 m² | 6.26 m² | 2 | 2 | **No** |
| **A** · dos anillos + pasillo entre anillos + un hueco de servicio por anillo | 6.05 m | 28.7 m² | 4.02 m² | 6.26 m² | 2 | 2 | Sí |
| **B** · un anillo de cartuchos idénticos, Ø actual | **4.56 m** | 16.3 m² | 2.66 m² | 4.00 m² | **1** | 1 | Sí |
| B′ · cartuchos con la misma área que hoy | 6.61 m | 34.3 m² | 4.12 m² | 6.17 m² | 1 | 1 | Sí |
| **C** · bandejas fijas + aviario móvil sobre riel | 4.56 m | 16.3 m² | 2.66 m² | 4.00 m² | 1 | 0 | Sí |

Evaluación cualitativa (sin puntuaciones numéricas):

| Criterio | A | **B** | C |
|---|---|---|---|
| Acceso y mantenimiento | Por huecos que hay que girar hasta la puerta | Pasillo central continuo | Pasillos fijos |
| Trasvase regeneración → cultivo | **Sin resolver**: formas distintas, hay que palear sustrato | **Resuelto**: el mismo cartucho avanza de posición | Manual, por bolsas |
| Aislar un lote fallido | Difícil (la bandeja es parte del anillo) | Cambio por cartucho de repuesto en S8 | Tapar la bandeja |
| Masa de sustrato (nominal) | 3,395 kg | 2,199 kg (110 kg por cartucho) | 2,199 kg |
| Mecanismos que giran | 2 coronas, 2 juntas rotativas de riego | 1 corona, 1 junta | Riel del aviario |
| Fidelidad al concepto «mueves el suelo» | Alta | Alta | **Baja** (mueve al animal, que es el ejemplo literal de las bases) |
| Demostrable en 30 días a escala | Baja | **Media-alta** (un anillo de cartuchos iguales) | Alta |
| Área de cultivo | 6.26 m² | 4.00 m² (−36 %) | 4.00 m² |

**Recomendación: B.**

- Resuelve los dos bloqueos de P0 (acceso y trasvase) sin cambiar el diámetro ni el principio.
- Perder área cuesta poco en alimento: la cobertura nominal baja de 3.0 % a 2.6 % de las kcal (§4).
- Si el equipo exige conservar el área, B′ lo logra con Ø 6.61 m.
- **C es el respaldo** si el presupuesto mecánico del demostrador no alcanza.

### 3.2 Tabla dimensional de B (nominal digital; sale del JSON)

| Magnitud | Valor | Evidencia |
|---|---|---|
| Casco | Ø 4.56 m × 2.2 m | geometria_digital |
| Anillo de cartuchos | r 1.58 → 2.18 m (ancho 0.60 m) | CALC desde supuestos de acceso |
| Cartuchos | 20 idénticos + 2 de repuesto · 18° × 0.94 cada uno · 0.333 m² · 22 cm | decision_equipo + CALC |
| Masa por cartucho | 88 / 110 / 132 kg (ρ 1,200 / 1,500 / 1,800) | CALC, densidad supuesta |
| Peso por cartucho | 408 N en Marte · 1,079 N en la Tierra (nominal) | CALC: la Tierra exige polipasto |
| Espacio central | Ø 3.16 m; equipos centrales hasta Ø 1.36 m con pasillo de 0.90 m alrededor | CALC |
| Paso | 1 posición cada 8 soles · 18° | decision_equipo |
| Par de rodadura | 82 N·m y ≈43 J por paso en la geometría actual (μ = 0.005 supuesto) | CALC; arranque y bloqueo sin calcular |

### 3.3 Ciclo de un cartucho en B

| Posición | Estación | Soles | Qué entra | Qué sale | Condición para avanzar |
|---|---|---:|---|---|---|
| S1 | Reacondicionamiento (lavado de verificación) | 8 | Cartucho de cultivo cosechado | Cartucho + salmuera al reactor separado | — |
| S2 | Aviario (deposición) | 8 | Estiércol | Cartucho con estiércol | — |
| S3 | Larvario | 8 | Larvas | Frass + larvas cosechadas | — |
| S4 | Descanso + inóculo | 8 | Cóctel microbiano | — | — |
| S5 | Cobertura de musgo (hipótesis antipolvo) | 8 | — | — | — |
| S6 | Consolidación | 8 | — | — | — |
| S7 | Muestreo | 8 | — | Muestra a análisis (ClO₄⁻, conductividad, patógenos) | — |
| S8 | **Compuerta de liberación** | 8 | Resultado de análisis | Pasa a cultivo **o** sale a cuarentena y entra un repuesto | Análisis dentro de especificación (umbrales pendientes) |
| C1–C12 | Cultivo con luz fija y goteo | 96 | Luz, agua, digestato tratado | Camote, frijol, rábano y rastrojo | — |

El ciclo completo dura **160 soles**. Cada cartucho recibe estiércol **una vez cada 160 soles**: 152 soles de intervalo, frente a los «56 soles» del diseño de dos anillos.
Los 96 soles de cultivo (≈ 99 d) cubren los 85 días del camote y los del frijol, y admiten 3 siembras de rábano (25 d).

---

## 4. Aporte alimentario y provisiones (arquitectura B)

| Por día | Conservador | Nominal | Favorable | Fuentes |
|---|---:|---:|---:|---|
| Huevo | 185 g | 226 g | 276 g | PMC10113653 (postura y peso) |
| Energía del huevo | 292 kcal | 357 kcal | 437 kcal | USDA 172191 |
| Energía del cultivo (4.00 m²) | 73 kcal | 117 kcal | 161 kcal | BVAD Tabla 4-90 × factor 0.5 / 0.8 / 1.1; USDA |
| **Cobertura de 18,210 kcal/d (6 × 3,035)** | **2.0 %** | **2.6 %** | **3.3 %** | NASA-STD-3001 Rev. F [V2 7003] |
| Proteína de huevo | 24 g (4.0 g/persona) | 29 g (4.9 g/persona) | 36 g (6.0 g/persona) | USDA |
| Ración de aves importada | 0.77 kg | 0.77 kg | 0.77 kg | PMC10113653 (32.1 g/ave/d) |

Con las dos áreas de cultivo actuales (6.26 m²) la cobertura sería 2.2–3.8 %.

**Provisiones (nominal):**

| Horizonte | kcal a llevar | Ración de aves | Alimento empacado ahorrado | **Masa neta importada** |
|---|---:|---:|---:|---:|
| 355 d (bases) | 6.3 millones | 273 kg | 133 kg | **+141 kg** |
| 539 d (diseño) | 9.6 millones | 415 kg | 201 kg | **+214 kg** |

**Hallazgo P1:** con la ración importada, el aviario **aumenta** la masa a lanzar. Esto es sin contar el hardware.
El argumento «ahorra masa de lanzamiento» no se sostiene. El valor real del módulo está en otras tres cosas:

- **Alimento fresco y proteína animal** a los meses 12–18.
- **Cierre demostrable** de las tres partes del reto.
- **Retorno a Chiapas.**

Sustituir parte de la ración con larvas podría cambiar el signo. Está sin cuantificar y es candidato a ensayo en P4.

**Arranque:** el primer huevo llega a los ~51 d y la primera cosecha de camote a los ~85 d. Hasta entonces las provisiones cubren el 100 %.

---

## 5. Energía

| Por día (arquitectura B) | Conservador | Nominal | Favorable |
|---|---:|---:|---:|
| SV de estiércol generados | 0.062 kg | 0.142 kg | 0.170 kg |
| SV que llegan al digestor tras las larvas (62.5 % degradado) | 0.023 kg | 0.053 kg | 0.064 kg |
| Rastrojo al digestor | 0.028 kg MS | 0.044 kg MS | 0.061 kg MS |
| Metano | 0.012 m³ | 0.024 m³ | 0.046 m³ |
| **Biogás · energía química** | **0.12 kWh** | **0.24 kWh** | **0.46 kWh** |
| Biogás · electricidad bruta (40 %) | 0.05 kWh | 0.10 kWh | 0.19 kWh |
| **Iluminación de 4.00 m²** | **19.3 kWh** | **13.6 kWh** | **12.2 kWh** |
| Biogás eléctrico / iluminación | 0.25 % | 0.71 % | 1.51 % |

Cómo leer la tabla:

- **El plan decía 2 kg SV/d y 2.864 kWh/d químicos.** El estiércol de 24 codornices aporta unas 14 veces menos SV, y el biogás nominal queda 12 veces por debajo.
- **Se retira el «colchón térmico».** La iluminación entrega ~0.57 kW medios de carga interna y el biogás equivale a ~10 W medios. **Esto no determina por sí solo calefacción o refrigeración:** faltan pérdidas por envolvente y condiciones de contorno. La necesidad térmica neta sigue pendiente.
- **Sin calcular (no son cero):** bombas, ventilación, HEPA, control, calefacción del digestor y carrusel. El módulo es **consumidor neto** de la energía del hábitat.

Fuentes leídas:

- BVAD Rev2, Tablas 4-86 y 4-89.
- Kusuma et al. 2020.
- PMC4176306 (metano de estiércol avícola).
- FAO 2019, Cuadro 14 (rastrojo) y p.63 (conversión eléctrica).
- ASABE D384.2 vía VT BSE-359 (relación SV/ST).
- Diola et al. 2024.

Supuesto crítico: sólidos excretados = 0.20 / 0.25 / 0.30 × ración. **Falta una fuente de codorniz.**

---

## 6. Agua y perclorato

**Agua**

- La transpiración nominal es de **8.2 L/d**; hay que condensarla y recuperarla. Como referencia, la tripulación necesita 15 L/d de agua potable mínima. Los dos circuitos van separados y el agua recuperada no es potable.
- **Lavado inicial** de los 20 cartuchos, con relación líquido/sólido **ilustrativa** de 1–5: **1.8–13.2 m³ de agua** y **7–26 kg de ClO₄⁻** (0.4–1 %). Por eso D4: es un proceso ISRU con recirculación, no una estación del módulo.

**Concentración de la salmuera por cartucho:** **20–40 mM**.

- *M. barkeri* redujo su producción de CH₄ con 10–20 mM de perclorato (Sci. Rep. 2021, leído).
- Por eso D3: **reactor de salmuera separado**, con organismos reductores de perclorato (DPRB).
- La sinergia con el digestor se conserva de otra forma: el **efluente del digestor puede aportar el donador de electrones** a ese reactor. Es una hipótesis para ensayo con laboratorio competente.
- El cloruro resultante se acumula: hacen falta purga y balance de salinidad (pendiente).

**Criterio de liberación en S8:** análisis de ClO₄⁻ residual, conductividad y patógenos, con umbrales **pendientes de fuente**. Ni el musgo ni una MFC sustituyen ese análisis.

---

## 7. Riesgos principales

| # | Riesgo | Efecto | Mitigación propuesta | Cómo se verifica |
|---|---|---|---|---|
| R1 | Aporte alimentario marginal (2–3 % de las kcal) | Críticas a la validez si se sobrevende | Comunicar fresco, proteína y cierre; no «alimenta a la tripulación» | Registro A61 |
| R2 | La ración importada supera el ahorro de alimento (+214 kg) | Cae el argumento económico y de masa | Ensayar la sustitución parcial con larvas; revisar el número de aves | Ensayo P4 |
| R3 | La iluminación domina la energía (12–19 kWh/d) | El módulo depende del hábitat | Declararlo; evaluar luz solar canalizada o fotoperiodos | Balance P1 ampliado |
| R4 | Salmuera inhibitoria y lavado inicial con toneladas de agua | La Parte 2 falla si se mezcla con el digestor | D3 + D4 | Ensayo con laboratorio |
| R5 | Liberar un lote contaminado a cultivo | Riesgo de perclorato en alimentos (Rev. F lo menciona) | Compuerta S8 con análisis y cuarentena | Protocolo P4 |
| R6 | Patógenos al reintegrar frass, digestato y larvas | Sanidad de tripulación y aves | Criterios sanitarios; rutas separadas | Pendiente de fuente |
| R7 | Biología no validada en 0.38 g | Incertidumbre máxima | Declararla; ensayos terrestres limitados | — |
| R8 | Supuestos críticos sin medir (densidad, excreción, pasillo, alcance) | Cambian masas y geometría | Medir sustrato (B7); fuentes de excreción y antropometría | JSON: `supuesto` → `medido` |
| R9 | Cambiar dos anillos por uno | Rechazo del equipo o confusión con lo presentado | Presentarlo como aprendizaje tras la auditoría (criterio 5) | Aprobación del equipo |
| R10 | Límite de polvo de Rev. F solo hasta 30 d | Sin referencia normativa para 355–539 d | Declararlo y citar la reevaluación que pide NASA | Registro A40 |

---

## 8. Frases que dejan de ser defendibles (para P5)

| Retirar | Sustituir por |
|---|---|
| «2.9 kWh/día, energéticamente autosuficiente» | «Produce biogás a escala demostrativa (~0.2 kWh/d); el módulo consume energía del hábitat, sobre todo en luz» |
| «Cero masa de lanzamiento» / «se paga evitando toneladas» | «Aporta alimento fresco y proteína; con la ración importada no reduce masa todavía» |
| «El biodigestor es el reactor de percloratos» | «El digestor aporta el carbono que necesita un reactor de salmuera separado» (hipótesis) |
| «Descanso de 56 soles» | «Cada lote recibe estiércol una vez cada 160 soles» (arquitectura B) |
| «Si el musgo verdea, la bandeja es segura» | «Ningún lote pasa a cultivo sin análisis» |
| «25 % frente a 100 %» | Esperar al modelo por estados de P3 |
| «Lunar Palace 1: 97 % de cierre» | «Lunar Palace 1 regeneró el 55 % del alimento en 105 días» (Fu et al. 2016) |

---

## 9. Pendientes que siguen abiertos tras P1

- Fuente específica de excreción de codorniz (ST y SV por ave).
- Umbrales de liberación de ClO₄⁻ en sustrato y agua de riego.
- Relación líquido/sólido y eficiencia de lavado revisadas por pares; el Coker et al. 2026 que cita el plan no fue accesible.
- Antropometría para pasillo y alcance en 0.38 g (OCHMO-TB-049).
- Consumos de bombas, ventilación, HEPA y calefacción del digestor; envolvente térmica.
- Micronutrientes: vitamina C, K, folato. Es el argumento original del plan y sigue sin calcular.
- Sanidad de reintegración de frass, digestato y larvas.
- Aprobación del equipo de D1–D2 y confirmación del organizador (B1–B5).

## 10. Fuentes nuevas leídas en P1

| Fuente | Qué aporta | Lectura |
|---|---|---|
| NASA/TP-2015-218570/REV2 (BVAD, feb 2022) | Productividad, fotones, ciclo y transpiración por cultivo; eficiencia de iluminación | Leído, Tablas 4-86 y 4-89 a 4-91 · sha `b9eab584c2bc88b5` |
| NASA-SP-2009-566 (DRA 5.0) | Tránsitos 174/201 d, estancia 539 d, total 914 d | Leído §4 · sha `1b3f956984f527c7` |
| NASA-STD-3001 Vol. 2 Rev. F | [V2 7003] 3,035 kcal/d; [V2 8013] trayectorias sin cifra | Leído |
| NASA/SP-2010-3407/REV1 (HIDH) | Trayectoria de emergencia ISS 81 × 114 cm | Leído · sha `a6a8758b9116984d` |
| Ewert & Stromgren 2019, ICES-2019-126 | Heces 0.03 kg/d de sólidos; orina 0.06 kg/d | Leído |
| PMC10113653 (codorniz, Tamil Nadu 2023) | Primer huevo, postura, peso del huevo, ración | Leído, Tablas 5–8 |
| USDA FoodData Central 172191, 168482, 173734, 169276 | kcal y proteína | Leído (API) |
| Kusuma, Pattison & Bugbee 2020 | Eficacia LED 1.9–3.0 µmol/J | Leído |
| PMC4176306 | CH₄ de estiércol avícola 0.061–0.12 m³/kg SV | Leído |
| Virginia Tech BSE-359 (ASABE D384.2) | Ponedora: ST 0.049 y SV 0.036 lb/d | Leído, Tabla 2 |
| Sci. Rep. 2021, s41598-021-91882-0 | Inhibición de CH₄ con 10–20 mM de perclorato | Leído |
| FAO 2019 ca5082es, Cuadro 14 | CH₄ de rastrojo 0.39–0.41 m³/kg MS | Leído (P0) |
