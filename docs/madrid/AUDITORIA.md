# P0 · Auditoría de bases, fuentes y discrepancias — MILPA-360

**Versión auditada:** commit `c3e0ad3` (master) · rama de trabajo `preparacion-madrid-p0` · 15 sep 2026
**Simulador auditado:** `prototipo-3d/milpa360-simulador.html` sha256 `fef2525a9b2311d6…`
**Reproducir los cálculos:** `python3 analysis/p0_verificacion.py`

**Qué es este documento:** revisión documental y de código, más cálculos sobre las constantes digitales.
**Qué no es:** no incluye mediciones físicas, ensayos biológicos ni ejecución visual del simulador en navegador.
Tampoco valida el sistema.

Etiquetas de evidencia usadas en todo el paquete:

| Etiqueta | Significado |
|---|---|
| **REQ** | Requisito de un documento del organizador |
| **PUB** | Dato publicado leído en la fuente |
| **PUB-ind** | Dato publicado, pero leído solo por resumen o extracto indirecto (fuente original bloqueada) |
| **CALC** | Resultado calculado (script o fórmula) |
| **HIP** | Hipótesis del equipo |
| **ILUS** | Escenario ilustrativo o regla programada |
| **PEND** | Pendiente de fuente o dato |
| **MED** | Medición propia (no hay ninguna todavía) |

---

## 1. Inventario y autoridad

### 1.1 Documentos del organizador (autoridad sobre requisitos; no se modificaron)

| Archivo | Págs. | sha256 (16) | Autoridad | Estado |
|---|---:|---|---|---|
| `El Reto Mars Challenge 2026 UNACH (1).pdf` | 3 | `539ed4a87825688a` | Reto Unificado, edición Chiapas (creado 8 jul 2026) | **Activo, rige el reto local** |
| `EL RETO .pdf` | 4 | `6ba60087e93276a0` | Marco general Mars Challenge 2026 · Tierra | Activo (marco y 7 desafíos) |
| `Guia Participante Mars Challenge 2026 FINAL.docx (4).pdf` | 37 | `70b8f3c5157e10b0` | Proceso, entregables y rúbrica de The Grand Jam 2026 | Activo; no confirma el formato de Madrid |
| `Programa RMU2026.pdf` | 1 | `82e1befdacf71fbf` | Agenda local del 8–9 sep | **Superado** (evento ya realizado) |
| `ECLSS Requirements Mars Habitat 2026.pdf` | 3 | `7d582074b630cd28` | Anexo técnico del concurso, basado en NASA-STD-3001 Vol. 2 **Rev. E** | Activo como referencia de diseño |
| `Mars Challenge Human Habitation 2026.pdf` | 10 | `9329a5cc91dfe45d` | Diapositivas de E. Antonsen (28 ago 2026) | Activo como referencia; **contradice al anexo en polvo marciano** (§3.4) |

### 1.2 Documentos del equipo (afirmaciones por comprobar)

| Archivo | Estado | Nota |
|---|---|---|
| `PLAN-MAESTRO-BIOMARS.md` (+ .pdf) | **Activo · documento principal** | Único documento con la geometría en sectores. PDF sincronizado en conteo de términos clave |
| `DOCUMENTO-TECNICO-FORMAL-BIOMARS.md` (+ .pdf) | **Superado en geometría** | §4.2 «Dimensiones verificadas» trae bandejas cuadradas de 0.70 m, R 0.96/1.80 m, 9.8 m² y casco Ø 4.76 m |
| `SISTEMA-MILPA-360.md` (+ .pdf) | Duplicado extendido, parcialmente superado | Polvo 0.3 mg/m³ como «marciano»; sin corrección de sectores |
| `CONTEXTO-RETO-MARTE.md`, `CONTEXTO-TECNICO-SISTEMA.md`, `INVESTIGACION-MARTE.md`, `ANALISIS-ENTORNO-CHIAPAS.md` | Activos como contexto | `CONTEXTO` sí usa 0.1 mg/m³ |
| `FASE-1…10-*.md`, `FASE-*.pdf`, `IDEAS-ORIGINALES-EQUIPO.md`, `IDEA-DESCARTADA-MURO-CAPILAR.md`, `Justificacion_Idea_Ganadora.*`, `Documento_3_ideas_Marte.docx` | **Historial del hackathon** | Materia prima para el Documento Concepto; no son documentos de diseño vigentes |
| `PRESUPUESTO-MILPA-360.md/.pdf`, `PRESUPUESTO-CICLO-DE-VIDA.md/.pdf` | **Sin commit (cambios del usuario) · no modificados** | Observaciones en §3.9 |
| `README.md` | Activo, desactualizado | Agenda del hackathon; «máximo 5» no aparece literal en la guía (§2) |
| `CLAUDE.md`, `AGENTS.md` (sin commit) | Activos · instrucciones de agente | Contradicción interna: la línea 26 dice Ø 4.76 m y la línea 88, Ø 4.56 m |
| `md2pdf.py` | Herramienta | — |

### 1.3 Prototipo, visuales y generados

| Archivo | Estado | Nota |
|---|---|---|
| `prototipo-3d/milpa360-simulador.html` | **Activo · diferenciador** | Constante `R_CASCO = 2.28` (Ø 4.56 m), pero sus rótulos dicen 4.76 m (L967, L968, L2024) y el comentario de L1125 dice Ø 3.5 m. Carga three 0.160 por CDN, así que **no funciona sin Internet** |
| `prototipo-3d/package.json` + lockfile | **Inconsistente** | Declara three `^0.186.0`, que el HTML no usa |
| `prototipo-3d/milpa360_build.py` | **Superado** (registro de proceso) | Bandejas cuadradas: 0.50 m en R 1.28 y 0.62 m en R 2.42 |
| `prototipo-3d/fotos-para-subir/*.png`, `anim/`, `hacer-video.sh` | Generados del modelo superado | 08 «arcilla» y 09 «alambre» son **renders digitales**, no fotos de una maqueta física |
| `prototipo/planos/P02–P05.html`, `render.sh` | **Activos en la entrega, geometría superada** | P02: casco Ø 6.00 m y «enterrado bajo 2 m de regolito». P03: cubierta Ø 5.40 m. P02 suma «12 × 0.5 m²» |
| `prototipo/fotos-para-subir/*.jpg`, `planos/originales-png/` | Generados | Exportación de los HTML anteriores; P01 es ilustración |
| `deck/*.dc.html`, `canvas.json`, `*.jpg` | Activo | `Mecanismo.dc.html` usa Ø 4.56 m. Las imágenes son fotogramas del simulador |
| `deck/pitch-milpa-360.html`, `kit-diseno/kit-de-campo-reto-marte.html` | Generados (runtime del canvas) | Las coincidencias con «3.5» están en el código embebido, no en el contenido |
| `visuales/atlas-marciano.html` | Activo | Sin auditoría de cifras en P0 |
| `kit-diseno/` | Historial del hackathon | — |

### 1.4 Faltantes

| Qué falta | Por qué importa |
|---|---|
| Reglamento, rúbrica y formato de la **final de Madrid** | Precedencia sobre la guía local |
| **Retroalimentación real del jurado** local (no hay rastro en el repo) | Criterio 5 · Aprendizaje y Documento Concepto |
| Constancia del pase y lista de la delegación autorizada | Requisito M-03 |
| Documento Concepto consolidado, video entregado, fotos reales de trabajo o maqueta física | Entregables G-01, G-02 y G-05 |
| Mediciones, ensayos y cotizaciones formales | P4 |
| Texto completo de **Rev. E** | Las URL oficiales de NASA ya sirven Rev. F; la comparación se hace contra el anexo del concurso |
| Fuente única de parámetros (`config/…`) | P1 |

---

## 2. Verificación de los hallazgos del diagnóstico (MISION §2)

| # | Hallazgo del diagnóstico | Veredicto | Evidencia |
|---|---|---|---|
| D1 | Final del 3 al 5 nov 2026 en Getafe | **Confirmado, con incoherencia en la web** | thegrandjam2026.mars-challenge.com y mars-challenge.com/espana dicen 3–5 nov. La página de España **también** dice «Final Internacional en Octubre de 2026». Pedir la fecha de entrega al organizador |
| D2 | El Reto Unificado no impone codorniz ni vertebrado; la rotación es un ejemplo | **Confirmado** | Reto UNACH p.1: «por ejemplo, moviéndolos de forma rotativa». El PLAN R3 lo trata como requisito. El texto dice «animales» sin especie |
| D3 | 9 criterios de igual peso, 3 entregables, 5 min | **Confirmado** | Guía p.31 (criterios), pp.2–3 (entregables), p.30 («Hasta 5 minutos… Preguntas y respuestas») |
| D4 | ~2 años es la misión total, no la estancia en superficie; 730 soles es decisión del equipo | **Confirmado** | EL RETO p.1 y Guía p.32. El PLAN §1.2 cita bien el texto, pero concluye «todo consumible se dimensiona a ~730 soles» y el simulador opera 730 soles. **730 soles ≈ 750 días** (CALC) |
| D5 | README: 6 integrantes y «máximo 5» | **Confirmado con matiz** | La guía no fija un máximo literal. En la p.7 dice «Si el equipo cuenta con 3, 4 o 5 integrantes». El README atribuye a «reglas oficiales» un límite que no está en el PDF |
| D6 | Geometría: 4.025 + 6.263 = 10.288 m²; huella 16.331 m²; 0.301 m; 3,395 kg | **Confirmado** (CALC) | Script §1–2. Los 42.3° y 28.2° son 45° y 30° × `HOLGURA = 0.94`; sin esa holgura el área sería 10.944 m² |
| D7 | Ø 4.76 m residual y comentario de 3.5 m | **Confirmado y ampliado** | Hay **cinco valores** en uso (§3.1) |
| D8 | Los sectores de los dos anillos no son intercambiables; no se ha probado el acceso al reactor | **Confirmado y agravado** | §3.2 y §3.3 |
| D9 | 2.864 kWh/d de energía química bruta; la base de sustrato no es coherente | **Confirmado y agravado** | §3.5: el 0.24 m³/kg no aparece en la guía FAO citada |
| D10 | Balance de residuos sin dobles conteos | **Confirmado (no existe balance)** | §3.6 |
| D11 | Lavar 2.5 cm de una cubeta de 22 cm | **Confirmado** | Es el 11.4 % del volumen (CALC). Ver §3.4 |
| D12 | El «100 %» es literal de las bases | **Confirmado con matiz importante** | Reto p.1: «tome el 100% de esos residuos **de la Parte 1**» (excremento y agua sucia de los animales). El PLAN R5 amplía el alcance a aguas negras de la tripulación y rastrojo: más de lo exigido, pero sin balance |
| D13 | Afirmaciones absolutas | **Confirmado** | Índice con archivo:línea en §3.8 |
| D14 | MELiSSA es antecedente de ciclos por compartimentos | **Confirmado y agrava una afirmación** | ESA: compartimentos CI–CV con bacterias, algas, plantas y tripulación, **sin animales superiores**. El PLAN §6 dice que MELiSSA cierra el ciclo «solo integrando animal + microorganismo + planta» |
| D15 | Rev. F aprobada el 14 jul 2026; V2 6253 §6.2.8.4; 0.1 mg/m³; ≤30 días | **Confirmado; página corregida** | En el PDF está en la **p. 63 de 389**, no en la 65 (sha256 `a09e0a3853306f59`). Detalle en §3.7 |
| D16 | Tormenta y gasómetro son reglas programadas | **Confirmado y detallado** | §3.10 |
| D17 | NASA Veggie / USDA ARS | **No verificado en P0** | No cambia ninguna decisión todavía; queda para P1 (aporte alimentario) |

---

## 3. Hallazgos críticos, ordenados por efecto sobre viabilidad y credibilidad

### 3.1 C1 · Cinco diámetros activos y tres geometrías distintas

| Valor | Dónde | Qué representa |
|---|---|---|
| **Ø 4.56 m** (sectores) | `milpa360-simulador.html:1138` (constante), `PLAN-MAESTRO:335,349`, `deck/Mecanismo.dc.html:89`, `PRESUPUESTO-MILPA-360:11,223`, `CLAUDE.md:88` | Valor digital vigente |
| **Ø 4.76 m** (cajas) | `milpa360-simulador.html:967,968,2024` (rótulos visibles), `DOCUMENTO-TECNICO:195,227`, `CLAUDE.md/AGENTS.md:26,90` | Geometría de bandeja cuadrada, superada |
| **Ø 3.5 m** | `milpa360-simulador.html:1125` (comentario) | Primera versión, ya refutada en PLAN §4.1 |
| **Ø 5.40 m** | `planos/P03-planta-carrusel.html:125` | Cubierta del carrusel en la lámina P-03 subida |
| **Ø 6.00 m** | `planos/P02-corte-transversal.html:63,92` | Casco en la lámina P-02 subida, además «enterrado bajo 2 m de regolito» |

A esto se suman `DOCUMENTO-TECNICO §4.2` (cajas de 0.70 m en R 0.96/1.80) y `milpa360_build.py` (cajas en R 1.28/2.42).
El jurado local vio láminas, simulador y documento con geometrías que no coinciden.
**Corrección (P1–P2):** fuente única de parámetros de la que se generen el simulador, los planos y las tablas.

### 3.2 C2 · El acceso humano y el mantenimiento no caben en la geometría actual (CALC)

- Holgura radial entre el borde exterior de bandeja y el casco: **0.301 m**. No hay pasillo modelado.
- Separación radial entre anillos: **0.062 m**.
- Distancia del casco al borde interior del anillo interior: **1.76 m**. Alcanzar el núcleo (biodigestor, r < 0.52 m) exige cruzar 0.64 m de anillo exterior y 0.76 m de interior.
- La cubierta está a 0.62 m. Quedan 1.58 m libres bajo el borde del casco. El aviario va sobre el anillo interior.
- Consecuencia: limpieza, cosecha del anillo interior, recogida de huevo, cambio de filtros y mantenimiento del digestor **no tienen ruta física**. Una cámara favorable en el simulador lo oculta.

**Opciones a comparar en P1:** agrandar el módulo, reducir bandejas, añadir pasillo radial o anular, o reubicar el núcleo fuera del carrusel.

### 3.3 C3 · El trasvase entre anillos no está definido

- Interior: 42.3°, r 0.52–1.278 m, 0.503 m². Exterior: 28.2°, r 1.34–1.979 m, 0.522 m². **Son formas distintas.**
- La estación S8 del simulador se rotula «Trasvase», pero no hay mecanismo, recipiente, tiempo, contención ni energía.
- Masa a mover por bandeja con cubeta llena: ≈166 kg (interior) a ρ = 1,500 kg/m³ supuesta. El peso en Marte es 0.62 kN, pero la inercia no cambia.

**Decisión pendiente (P1):** mover la cubeta, un cartucho interior o el sustrato, o separar los ciclos de ambos anillos.

### 3.4 C4 · Percloratos: dato inflado, volumen no tratado y contaminante trasladado

- **Dato publicado (PUB-ind):** Phoenix midió **≈0.4–0.6 %** en masa de ClO₄⁻ lixiviado (Hecht et al. 2009, *Science* 325:64–67, resumen). Los documentos dicen «0.5–1 % (Phoenix, 2008)»: la cota superior no sale de Phoenix. Además es **un solo sitio**, no la superficie de Marte.
- **Volumen tratado (CALC):** el lavado de 2.5 cm cubre el **11.4 %** de la cubeta de 22 cm. Con 0.4–0.6 % uniforme, la cubeta interior contiene **664–996 g**; la capa lavada, 75–113 g. El PLAN habla de «100–200 g por bandeja de 20 kg».
- Las tres cosas siguientes son **HIP** sin fuente leída: que el lavado quite el perclorato «casi por completo», que la metanogénesis se inhiba y cuánto donador de electrones se consume. Tampoco hay relación líquido/sólido ni tratamiento inicial del volumen completo.
- Llamar al Cl⁻ «sal inerte» ignora que el cloruro se acumula y sala el agua de riego.
- **Rev. F, razonamiento de V2 6253 (p.64), textual:** el límite de polvo «does not account for non-airborne sources… such as in-situ resource utilization (e.g., perchlorate dissolution from Mars regolith into water and subsequent uptake by food crops)». La norma señala explícitamente el riesgo que MILPA-360 introduce.
- **Falla lógica del «semáforo» de musgo (HIP):** el PLAN §4.4 dice que *S. caninervis* «es más tolerante que cualquier cultivo; si prospera, el sustrato está desintoxicado». Un indicador **más tolerante** que el cultivo prospera donde el cultivo falla y da falsos «apto». Para una alerta hace falta un indicador **más sensible**, o análisis químico.

### 3.5 C5 · Energía: base no rastreable, química tratada como eléctrica y «autosuficiencia» sin consumos

- Cálculo del plan: 2 kg × 0.24 m³/kg × 0.60 × 35.8 MJ/m³ = **10.31 MJ/d = 2.864 kWh/d** de energía **química bruta** (CALC).
- **Guía FAO citada** (ca5082es, cuadros 12–14, pp. 62–63, leída): el **0.24 m³/kg no aparece**.
  - Cuadro 12 da metano por kg de **SV**, sin fila de aves.
  - Cuadro 13 da biogás por kg **húmedo**: aves **0.08 m³/kg**.
  - Cuadro 14 da biogás por kg de **materia seca**, sin fila de aves; porcino 0.26.
  - La FAO advierte que estas tablas «pueden distar enormemente de la realidad».
- El plan mezcla una carga en **kg SV** con un rendimiento en «**base seca**». La carga de 2 kg SV/d no sale de ningún balance.
- Según la FAO (p.63), un grupo electrógeno aprovecha ≈40 % de la energía del biogás. Eso da ≈**1.15 kWh eléctricos/d brutos**, antes de tratar el gas, calentar los digestores o mover bombas (CALC).
- EPA AgSTAR (leída): el biogás lleva **50–75 % de CH₄**, sirve para calor o electricidad y hay que acondicionarlo quitando CO₂, agua y H₂S. El digestato sirve «with appropriate treatment».
- Hay afirmaciones de «energéticamente autosuficiente» sin un solo consumo calculado: `PLAN:830`, `SISTEMA:597`, `DOCUMENTO-TECNICO:392`, `FASE-6:41`.
- El simulador pinta una «antorcha de biogás sobre el eje» (L1598) y una llama con luz. Eso es combustión abierta dentro del volumen presurizado, y V2 6024 pide monitorizar sus productos.

### 3.6 C6 · No hay balance de masa y la entrada externa principal no se contabiliza

- La ración de las aves es **552 g/d**, o **403 kg en 730 días** (CALC con cifras del plan). El PLAN dice que es «la única entrada externa», pero no la suma. `PRESUPUESTO-CICLO-DE-VIDA.md` declara «Insumos de consumo: 0 kg».
- No hay reparto cuantitativo del estiércol entre S2 (bandeja), S3 (larvas) y cámara B. El PLAN lo manda a los tres destinos.
- Tampoco hay balance de agua: lavado, evapotranspiración, purga de sales ni separación del agua potable.

### 3.7 C7 · Normativa mal atribuida y fuera de alcance temporal

- **Polvo marciano.**
  - En el anexo del concurso (Rev. E), 6053 dice «Lunar/Martian dust <0.3 mg/m³, intermitente hasta 6 meses».
  - En la **Rev. F**, 6053 es **solo lunar** (0.3 mg/m³) y el marciano pasa a **6253: <0.1 mg/m³, promedio ponderado, escenarios ≤30 días**, con pico ≤10 mg/m³.
  - Según el razonamiento de la norma, los 30 días se eligieron por la estancia corta de una misión de oposición, y el límite «will need to be reevaluated if longer surface mission stays are anticipated». Lo mismo dice NASA/SP-20260005907 (jul 2026, leído).
  - Las diapositivas de Antonsen dan 0.1 mg/m³ en 24 h.
  - Uso actual: `PLAN:210,476,562`, `SISTEMA:164,267,364` y `DOCUMENTO-TECNICO:382` usan 0.3 como «polvo marciano». El simulador (L952) cita «V2 6053» para 0.1, cuando en F es 6253.
- **HEPA ≥ 99.97 % a 0.3 µm** no es el requisito 6059. Es el enfoque histórico que cita su razonamiento; el requisito es «aire microbiológicamente seguro». Los documentos lo presentan como requisito cumplido.
- «Cumple NASA-STD-3001» (`PLAN:772,832`, `DOCUMENTO-TECNICO:394`) no está demostrado: no hay caudales, concentraciones ni niveles de ruido calculados.

### 3.8 C8 · Precedentes citados de forma inexacta y afirmaciones absolutas

- **Lunar Palace 1 «97 % de cierre en 105 días»:** el resumen de Fu et al. 2016 (*Astrobiology* 16(12):925–936; PUB-ind) reporta O₂ y agua reciclados, **55 % del alimento regenerado**, 41 % de degradación de residuo sólido, 20.5 % de recuperación de N de orina y «una pequeña producción in situ de insectos». No se encontró el 97 %; es posible que venga de otro experimento. **PEND.**
- **«Los únicos tres sistemas del mundo que han cerrado el ciclo»** (`PLAN:589,732`): sin fuente. MELiSSA no es un sistema cerrado con animales (D14).
- **BSF «44–82 %»:** Diola et al. 2024 (*Philipp. J. Sci.* 153(2):609–618, leído) mide en estiércol de **codorniz** una degradación de 62.49 % en base seca y 70.50 % en húmeda, con n = 3 réplicas, 30 °C y 77 % HR. El rango 44–82 % no está en ese artículo. **PEND.**
- ***S. caninervis*:** 100 % de regeneración en 30 días tras la simulación marciana y DL50/1 h ≈ 5,000 Gy en estado desecado. Coincide en fuentes secundarias; el original devolvió 403 (PUB-ind). Que sea el «primer estudio sobre suelo marciano simulado» **no está confirmado**, y la supervivencia no equivale a crecimiento productivo.
- **Índice de términos absolutos** (conteo bruto; incluye usos legítimos y negaciones, se depura en P1):

  | Término | Apariciones |
  |---|---:|
  | «único/a» | 52 |
  | «gratis/sin costo» | 19 |
  | «nadie» | 21 |
  | «consumo cero/cero masa» | 10 |
  | «autosuficien-» | 9 |

  Los más visibles están en el deck (`Diferenciador.dc.html:45,55`; `Perclorato.dc.html:65`), el simulador (L981, L1009) y el PLAN §0.5, §4.3 y §12.

### 3.9 C9 · Presupuestos (archivos del usuario sin commit; solo observación)

- `PRESUPUESTO-MILPA-360.md`:
  - Las partidas «C» (cotizado) son **precios públicos de catálogo o listado web**, no cotizaciones formales.
  - Faltan IVA, envío, fecha y plazo por partida.
  - El sustrato suma 3.4 t y el motorreductor está estimado en 2,800 MXN sin cálculo de par, riesgo que el propio archivo reconoce.
  - Presupuesta un «prototipo funcional 1:1» que hereda los problemas de acceso y trasvase de §3.2–3.3.
- `PRESUPUESTO-CICLO-DE-VIDA.md` trae cifras sin fuente:
  - 35,000 USD/kg a superficie
  - sistema de 2,000 kg
  - 130,000 USD/h de tripulación
  - «breakeven antes del sol 150»
  - «insumos 0 kg»

  Además, **su propio total (233.4 M USD) no se compara con el ahorro que declara**. Tratar como HIP hasta P4.

### 3.10 C10 · El simulador presenta reglas programadas como resultados (ILUS)

| Comportamiento | Implementación (líneas) | Consecuencia |
|---|---|---|
| Pérdida por tormenta | L2420: `danada = enTormenta && pc >= 8.6` | Marca **3 o 4 de 12 bandejas (25 % o 33 %)** por posición, sin importar duración, intensidad, energía ni luz. El PLAN §0.5 dice que «calcula la pérdida real» |
| Recuperación | L2421–2432: `escY` y `marchitez` vuelven a su valor sano al terminar la tormenta | **Las plantas reviven**; no hay daño acumulado |
| Comparación «100 % sincronizado» | No existe en el código | El «25 % vs 100 %» del deck no sale de la simulación |
| Gasómetro | L2449–2450: producción 0.055 y consumo 0.035/0.16 fijos, piso 0.06 | Nunca se vacía; no está ligado a la carga ni a la demanda |
| Reloj | L2364: `(S.sol + dt·2.2·vel) % 730` | Paso ligado al fotograma; reinicio silencioso a los 730 soles |
| Mecanismo polvo → energía → clima interior → cultivo | Ausente | En un hábitat cerrado, la planta no debe «sentir» el polvo exterior sin una causa modelada |
| Autotest | L2594–2606 | Solo comprueba la regla de descanso de 56 soles y el ciclo de 96 soles, ambos correctos (CALC) |

### 3.11 C11 · Aporte alimentario sin cuantificar (bloquea RU-03)

- Huevo: 16.3 huevos/d × 10.8 g ≈ **176 g/d en total, ≈29 g/persona/d**, con cifras del plan no verificadas (CALC).
- El cultivo no tiene rendimiento, calendario ni DLI. Solo la **zona exterior** (6.263 m²) cultiva alimento; el anillo interior es de regeneración.
- El propio PLAN admite que «no alimenta a seis». Falta el porcentaje de kcal y proteína, y las provisiones de arranque.

### 3.12 C12 · Divulgación pública y novedad

- `origin = https://github.com/ALDOOGOAT/RETO-MARTE`. Según MISION §4 es público; la visibilidad no se verificó porque la conexión MCP de GitHub falló en esta sesión.
- Primer commit de bases: 8 sep 2026. El diseño con sectores y goteo sobre pivote está en `c3e0ad3` (9 sep 2026).
- Las fechas de divulgación deben preservarse sin reescribir historial (P1/P4, con asesoría profesional).

---

## 4. Fuentes consultadas en P0 (15 sep 2026)

| Fuente | Forma de lectura | Uso |
|---|---|---|
| NASA-STD-3001 Vol. 2 **Rev. F** (standards.nasa.gov; también nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf) | **Leída** en pdftotext: portada, §6.2.6.5, §6.2.8.2–6.2.8.5, pp. 60–64 · sha256 `a09e0a3853306f59` | D15, C7, C4 |
| NASA/SP-20260005907 *Martian Dust Exposure Limits* (Ebert, Lowe, Francisco, jul 2026) | **Leída** por extractos: derivación 0.4 → DUF 3 → 0.1 mg/m³ y 30 días · sha256 `55daaa37eaa5ebe0` | C7 |
| FAO 2019, *Guía teórico-práctica sobre el biogás y los biodigestores* (openknowledge.fao.org/3/ca5082es) | **Leída**: cuadros 12–14, pp. 62–63 | C5 |
| EPA AgSTAR, *How does anaerobic digestion work* | **Leída** | C5 |
| ESA, *MELiSSA Closed Loop Compartments* | **Leída** | D14 |
| Ewert & Stromgren 2019, ICES-2019-126 (NTRS 20190027563) | **Leída** p. 2: BVAD 2.39 kg/persona/día empacado, −0.43 kg de empaque, −10 % | Registro A04 |
| Diola et al. 2024, *Philipp. J. Sci.* 153(2):609–618 | **Leída**: resumen, Tablas 1–2 | C8 |
| Hecht et al. 2009, *Science* 325:64–67 | **PUB-ind** (resumen vía buscador) | C4 |
| Fu et al. 2016, *Astrobiology* 16(12):925–936 | **PUB-ind** (resumen vía buscador; PubMed y SAGE bloqueados) | C8 |
| Li et al. 2024, *The Innovation* (*S. caninervis*) | **PUB-ind** (original 403; ScienceDaily y resúmenes) | C8 |
| mars-challenge.com/espana, thegrandjam2026.mars-challenge.com | **Leídas** | D1 |
| Rev. E completa | **No accesible** (las URL oficiales sirven Rev. F) | Se usa el anexo del concurso |

---

## 5. Bloqueos y datos faltantes (dato exacto → quién lo aporta)

| # | Dato que falta | Quién | Bloquea |
|---|---|---|---|
| B1 | Reglamento o rúbrica de la final de Madrid, fecha límite de entregables, formato de memoria, pitch, preguntas, video, exposición (stand, dimensiones, energía) y política de IA | Organizador (vía UNACH) | M-02, M-04, formato P5 |
| B2 | Si Madrid evalúa contra el Reto Unificado de Chiapas o contra el reto general (desafío 7) | Organizador | MG-05 |
| B3 | Lista de la delegación autorizada y número de presentadores | Organizador y equipo | M-03 |
| B4 | Retroalimentación escrita o recordada del jurado local, y qué se cambió en la Fase 11 | Equipo | G-01, criterio 5 |
| B5 | Si el organizador interpreta el «100 %» como captación, tratamiento o recuperación | Organizador | RU-P2-01 |
| B6 | Presupuesto máximo real y recursos disponibles (taller, laboratorio, mentores) | Equipo, UNACH | P4 |
| B7 | Caracterización del sustrato terrestre del demostrador (densidad húmeda y seca, humedad) | Medición del equipo | Masas, par del motor |
| B8 | Origen de: 0.24 m³/kg, 97 % Lunar Palace, 44–82 % BSF, 0.5–1 % perclorato, cifras de codorniz y cifras de Chiapas | Revisión de fuentes (P1) | Registro de afirmaciones |
| B9 | Visibilidad del repositorio y fecha de primera divulgación pública | Usuario (GitHub) | C12 |

---

## 6. Qué no se tocó

- No se modificó ningún documento, plano, deck ni el simulador. P0 es solo auditoría.
- Las correcciones van en P1 y P2 desde una fuente única de parámetros, para no arreglar a mano cinco sitios.
- Los presupuestos sin commit del usuario quedaron intactos.
