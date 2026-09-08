# INVESTIGACIÓN A FONDO — "La Tierra como sistema vivo" + Marte

> Investigación para llegar a ganar el Reto Marte UNACH 2026. Cubre: el marco conceptual
> del reto, los datos duros de Marte (banco de datos para la Fase 5), el estado del arte de
> los 6 problemas de supervivencia, las palancas de innovación poco exploradas y un **banco
> de 15 ideas** (bio + software + hardware + socio-humano) con causa raíz, novedad,
> viabilidad y retorno a la Tierra. Complementa `CONTEXTO-RETO-MARTE.md`.
> Fecha: 2026-09-03.

---

## 0. Cómo usar este documento

1. **Fase 3–4 (ideas/empatía):** usa §4 (palancas) y §5 (banco de ideas) como materia prima.
   No copies una idea entera: combínalas y aterrízalas al reto exacto que confirme la UNACH.
2. **Fase 5 (problema + datos duros):** usa §2 y §3 para respaldar la causa raíz con números.
3. **Fase 8 (retorno a la Tierra + ODS):** cada idea de §5 ya trae su gancho terrestre y ODS.
4. **Fase 9 (narrativa):** usa §1 para el "porqué grande" y §6 para no dejar ningún criterio suelto.

**Tesis central que gana esta edición:** *No estás diseñando para Marte. Estás usando Marte
como el único lugar donde el ser humano se ve obligado a cerrar todos los ciclos —agua, aire,
nutrientes, energía, residuos— igual que la Tierra los cierra sola. Lo que aprendas cerrando
esos ciclos en el peor lugar posible es exactamente lo que la Tierra necesita para no romper
los suyos.*

---

## 1. El marco: "La Tierra como sistema vivo"

### La idea de Gaia / ciencia del sistema terrestre
- **Hipótesis de Gaia** (James Lovelock + Lynn Margulis, 1979): los organismos vivos, la
  atmósfera, los océanos, el suelo y las rocas forman **un solo sistema interconectado que
  se autorregula** mediante bucles de retroalimentación (sobre todo negativos) que mantienen
  el planeta habitable — p. ej. la biota regula el CO₂ atmosférico, el oxígeno, la salinidad
  de los océanos y la temperatura.
- **Ciencia del sistema terrestre:** disciplina que estudia esos bucles y los **ciclos
  biogeoquímicos** (carbono, nitrógeno, oxígeno, azufre, fósforo, agua) que mueven materia
  en circuito cerrado entre atmósfera, hidrosfera, litosfera y biosfera.
- Consenso científico (sin la parte polémica de "el planeta es un organismo"): la biosfera y
  el ambiente físico se influyen mutuamente en **bucles de retroalimentación acoplados a
  múltiples escalas de tiempo**.

### Por qué esto es la clave del reto
- Un hábitat en Marte es una **Gaia en miniatura hecha a mano**: si un ciclo se abre (el agua
  no vuelve, el CO₂ se acumula, los nutrientes se pierden como residuo), la tripulación muere.
  En la Tierra esos ciclos los cierra la vida "gratis" — y los estamos rompiendo
  (clima, nitrógeno, biodiversidad, agua).
- **Marte fuerza el pensamiento de ciclo cerrado.** Cada kilo importado desde la Tierra cuesta
  ~1 M USD de lanzamiento: no hay margen para desperdicio. Esa disciplina de "residuo = recurso"
  es literalmente la economía circular que la Tierra necesita.
- Metáfora para la narrativa: **ECLSS (soporte de vida) = servicios ecosistémicos.**
  El hábitat marciano es el banco de pruebas donde vemos, medidos y sin trampa, cuánto trabajo
  hace la biosfera por nosotros.

### NASA-STD-3001: los servicios que hay que replicar a mano
De `CONTEXTO-RETO-MARTE.md §8`: composición atmosférica (≥30% diluyente, ppCO₂ ≤3 mmHg,
ppO₂ 145–155 mmHg), presión 5–15 psia, 20–25 °C / 30–60% HR, polvo marciano <0.1 mg/m³ 24h,
2.5 L agua/persona/día, ruido ≤NC-40 en zonas de sueño, y **monitoreo + alerta continuos**.
Todos son "gratis" en la Tierra gracias a la biosfera.

---

## 2. Banco de datos duros — Marte

| Parámetro | Valor | Implicación |
|-----------|-------|-------------|
| Atmósfera | **95.3% CO₂**, 2.7% N₂, 1.6% Ar, 0.13% O₂ | CO₂ y N son recursos in situ (Sabatier, fijación biológica) |
| Presión superficial | **~6 mbar** (~0.6% de la Tierra) | Casi vacío para el cuerpo humano; agua líquida inestable |
| Temperatura media | **~ −63 °C** (rango ~ −140 a +20 °C) | Aislamiento térmico y enterrar el hábitat |
| Gravedad | **0.38 g** | Desconocidos fisiológicos a largo plazo; afecta fluidos, huesos, plantas |
| Radiación superficial | **~0.7 mSv/día** (~230–300 mSv/año); sin campo magnético global, atmósfera fina | GCR + eventos solares; límite de carrera NASA se alcanza rápido → blindaje = prioridad |
| Regolito | **0.5–1% percloratos** (ClO₄⁻); óxidos de hierro, sílice, gypsum; trazas de **arsénico, cromo, berilio, cadmio** | Tóxico para tiroides (perclorato), pulmón (sílice, partículas <3 µm), y para equipos |
| Polvo | diámetro medio **~3 µm**, electrostático, omnipresente, se mete a todo | Riesgo pulmonar tipo "efecto Apolo"; degrada sellos, paneles, filtros |
| Percloratos + UV | se vuelven **bactericidas**; sinergia con óxidos de Fe y H₂O₂ → ~10× mortalidad celular | El regolito de superficie es hostil a la biología: hay que detoxificar o ir al subsuelo |
| Agua | hielo subsuperficial extenso (mapa **SWIM** de NASA), hidratos en regolito, ~pocos % de H₂O en suelo ecuatorial | Recurso más valioso: agua + CO₂ → O₂, combustible, cultivo |
| Tormentas de polvo | estacionales, ocasionalmente globales, semanas de duración | Colapsan energía solar; obligan a almacenamiento/energía nuclear o redundancia |
| Día (sol) | 24 h 39 min | Casi terrestre — bueno para ritmos circadianos y para cultivos |
| Comunicación con la Tierra | retardo **~3 a 22 min por trayecto** (según posición orbital); blackout en conjunción solar | **No hay apoyo en tiempo real:** autonomía total de la tripulación y de los sistemas |
| Misión | ida y vuelta **~2–3 años** por ventanas de transferencia | Todo debe durar y repararse in situ; nada de reabastecimiento rápido |

Fuentes clave: NASA-STD-3001 Vol.2 Rev E; Ebert et al. 2026 (límites de polvo marciano);
SWIM (swim.psi.edu); revisiones de toxicidad de polvo marciano (PMC11815326).

---

## 3. Los 6 problemas de supervivencia — estado del arte

### (A) Aire — O₂, remoción de CO₂, presión, contaminantes
- **Físico-químico actual (ISS):** electrólisis de agua para O₂; lechos de amina o zeolita para CO₂;
  filtros HEPA + carbón activado. Fiable pero consume energía y repuestos.
- **ISRU probado:** **MOXIE** (Perseverance, 2021–2023) produjo O₂ ≥99.6% puro por electrólisis de
  óxido sólido del CO₂ atmosférico — 1ª demostración de ISRU en otro planeta. Un MOXIE a escala
  generaría las decenas de toneladas de O₂ para el cohete de regreso.
- **Biológico:** cianobacterias (**Anabaena** sp. PCC 7938) y microalgas (**Chlorella**, **Spirulina**)
  hacen O₂ por fotosíntesis y fijan N₂; estudios 2022–2024 muestran crecimiento en lixiviado de
  regolito marciano y estiman "breakeven" de recursos en pocos años.
- **Hueco (oportunidad):** integrar remoción de CO₂ + producción de O₂ + captura de contaminantes
  en **un solo sistema vivo** con control autónomo, en vez de tres cajas separadas.

### (B) Agua — reciclaje, extracción, calidad
- **ISS:** el sistema de recuperación llegó a **98% de reciclaje** de orina + sudor (2023) al
  añadir el **Brine Processor Assembly**. NASA fija 98% como mínimo para Marte — apenas alcanzable.
- **ISRU:** hielo subsuperficial (SWIM) + hidratos de regolito; agua + CO₂ → propelente (Sabatier + electrólisis).
- **Problema marciano específico:** el agua/hielo viene **contaminada con percloratos** — corrosivos,
  tóxicos, difíciles de quitar.
- **Novedad emergente:** biorreactores/catalizadores que **destruyen el perclorato** y liberan O₂
  (ver idea #2).
- **Hueco:** tratamiento de aguas grises que además genere energía y actúe de biosensor (idea #8).

### (C) Comida — producción, proteína, ciclo de nutrientes
- **Agricultura de ambiente controlado (CEA):** LED, aeroponía, hidroponía, cultivo vertical —
  gran parte nació de investigación espacial y ya se usa en la Tierra.
- **Regolito → suelo:** cultivos crecen mal en simulante puro; **alfalfa como cultivo pionero /
  biofertilizante** aumentó biomasa de nabo +190%, rábano +311%, lechuga +79% en simulante basáltico
  (PLOS One 2022). **Simbiosis leguminosa–rhizobium** funciona en simulante (fija N₂).
- **Proteína sin animales:** **fermentación de precisión** (levaduras/hongos modificados convierten
  azúcares — de residuos de cosecha — en proteína), **proteína unicelular** de bacterias
  hidrógeno-oxidantes que comen CO₂ + H₂. Levadura: 10–20× menos agua y luz que plantas.
- **Hueco:** policultivo + acuaponía + fermentación cerrados donde **el residuo de cada eslabón
  alimenta al siguiente** y nada sale del bucle (idea #12).

### (D) Energía
- **Solar:** viable pero **colapsa en tormentas de polvo globales** (semanas) y por acumulación
  de polvo en paneles (pérdida ~0.2–1%/día).
- **Nuclear:** reactores de fisión compactos (Kilopower/"Fission Surface Power") como base fiable.
- **Mitigación de polvo:** **escudo electrodinámico (EDS)** — campos electrostáticos que barren
  polvo de paneles/visores/sellos; **recubrimiento tipo Loto** (nano-textura hidrofóbica) que
  reduce la adhesión; combinados dan lo mejor de activo + pasivo.
- **Bio-energía:** **celdas de combustible microbianas (MFC)** — bacterias oxidan materia orgánica
  de aguas residuales y generan electricidad (0.1–23 W/m², 60–97% de remoción de DQO) + limpian agua.
- **Hueco:** micro-generación distribuida acoplada a los residuos del hábitat (ideas #8, #10).

### (E) Refugio y radiación
- **Blindaje pasivo:** enterrar el hábitat en regolito; hielo/agua como blindaje (también recurso);
  **regolito + aglutinante**.
- **Construcción in situ:**
  - **Impresión 3D con regolito** (sinterizado, geopolímeros).
  - **AstroCrete / biocompósitos con aglutinante in vivo:** albúmina del plasma sanguíneo del
    astronauta + regolito → "concreto" de 25 MPa; **+ urea (de orina/sudor) → hasta 40 MPa** (+300%).
    Mecanismo tipo seda de araña (red de láminas β por deshidratación).
  - **Biocementación (MICP):** bacterias con ureasa precipitan carbonato de calcio y unen el
    regolito en ladrillos **sin horno** (ver idea #14).
  - **Micotectura (NASA NIAC, Fase III, 2024, $2 M):** llevar un armazón con **hongos dormidos**;
    añadir agua → el micelio crece y forma la estructura; se puede incorporar capa de protección
    radiológica. Lynn Rothschild (NASA Ames), arquitecto Chris Maurer.
- **Blindaje vivo:** **hongos radiotróficos melanizados** (*Cladosporium sphaerospermum*) —
  experimento en ISS (2019, 30 días): una capa de ~1.7 mm atenuó ~2% de la radiación y creció
  **~21% mejor** bajo radiación (radiosíntesis vía melanina). Estimación: ~21 cm de hongo, o
  **~9 cm de mezcla melanina + regolito**, negarían la dosis anual de superficie marciana.
- **Hueco:** un escudo que además **se autorrepara** y **fabrica su propio material** (idea #1).

### (F) La mente — salud conductual (ver también `CONTEXTO §9`)
- Riesgo NASA "BMed": aislamiento, confinamiento, **retardo de comunicación**, falta de privacidad,
  monotonía, radiación sobre el SNC → ansiedad, depresión, insomnio, mala toma de decisiones.
- **Contramedidas con evidencia:** diario personal, **ventanas**, **horticultura / cultivar
  vegetales frescos** (beneficio terapéutico + recordatorio tangible de la Tierra), comunicación
  con familia, diseño para privacidad en espacio mínimo.
- **Análogos:** **HERA** (aislamiento de meses en Johnson Space Center), **CHAPEA** (misión de
  1 año simulando Marte; 1ª corrida jun-2023 a jul-2024).
- **Tendencia:** herramientas para que la tripulación **monitoree y mantenga su salud conductual
  de forma autónoma** (sin la Tierra); IA de acompañamiento/terapia para equipos incomunicados.
- **Hueco:** cerrar el bucle **jardín ↔ estado de ánimo** con sensado pasivo + IA local (idea #6).

---

## 4. Palancas de innovación poco exploradas

| Dominio | Dónde está el espacio en blanco |
|---------|--------------------------------|
| **Bio / organismos vivos** | Convertir venenos marcianos en recursos (perclorato → O₂). **Sistemas multifunción** (un organismo hace 3 trabajos). Materiales **vivos** que crecen, se reparan y sensan. Blindaje biológico. Simbiosis diseñada suelo–planta–microbio. Criptobiosis para almacenamiento sin frío. |
| **Software / IA** | **Explicabilidad para no expertos:** IA que no solo decide sino que *enseña* a una tripulación sin ingenieros por qué falla algo, con 20 min de retardo. Gemelo digital del hábitat **como ecosistema** (bucles de retroalimentación visibles). Salud conductual por sensado pasivo. Optimización de ciclo cerrado en tiempo real. |
| **Hardware / ISRU** | Sistemas **pasivos** (sin energía ni repuestos): sorbentes, recubrimientos, geometría. Cosecha de agua atmosférica. Mitigación de polvo pasiva+activa. Construcción con feedstock humano/biológico. |
| **Socio-humano** | Diseño de hábitat que **fuerza interacción positiva** y da privacidad. Gobernanza y autonomía de equipos aislados. El jardín como infraestructura social, no decorativa. Rituales y narrativa como cohesión. |

**Regla para que suene "nunca desarrollado":** casi ninguna pieza individual es nueva; **la
combinación multifunción sí lo es**. "Un muro que es a la vez blindaje, sensor y fábrica de su
propio material" no existe como producto. Ahí está el punto de creatividad de la rúbrica.

---

## 5. Banco de 15 ideas

> Formato: **Qué es · Causa raíz que ataca · Por qué es novedoso · Viabilidad en Marte ·
> Retorno a la Tierra · ODS**. Ninguna está "lista": son puntos de partida para las Fases 3–8.

### — BIO / organismos vivos —

**1. Escudo vivo autorreparable (hongo radiotrófico melanizado + regolito)**
- *Qué:* capa exterior del hábitat de micelio melanizado mezclado con regolito; tras abrasión de
  polvo o microimpacto, se le añade agua y **vuelve a crecer** cerrando la grieta.
- *Causa raíz:* la radiación (~0.7 mSv/día) y el blindaje pasivo tradicional (regolito muerto)
  que se degrada y no se repara solo.
- *Novedad:* combina blindaje + autorreparación + fabricación in situ del material en una sola
  piel viva. Los tres existen por separado (micotectura, hongo radiotrófico en ISS, AstroCrete);
  juntos, no.
- *Viabilidad:* media. Base sólida: NASA NIAC micotectura Fase III; ISS demostró atenuación y
  crecimiento +21% bajo radiación. Reto: contención biológica, tiempo de crecimiento, vacío.
- *Retorno a la Tierra:* fachadas y refugios autorreparables de bajo carbono; blindaje pasivo
  barato para salas de radioterapia, búnkeres, zonas con radón; vivienda de emergencia que
  "crece" con micelio local.
- *ODS:* 11, 9, 3.

**2. Biorreactor de perclorato: de veneno a oxígeno, agua limpia y desinfectante**
- *Qué:* *Bacillus subtilis* (cepa probada en vuelo) con genes `pcrAB` + `cld` que convierte
  perclorato/clorato del regolito y del hielo en **cloruro + O₂**; el cloruro se electroliza a
  hipoclorito para desinfección.
- *Causa raíz:* el regolito y el hielo marciano tienen 0.5–1% de perclorato → tóxico para tiroides
  (anemia aplásica), corrosivo, y bloquea usar el agua y cultivar.
- *Novedad:* trata el mayor peligro químico de Marte como **mina de tres recursos** a la vez.
  Investigación 2024 propuso el reactor biocatalítico; nadie ha cerrado el ciclo a O₂ + desinfectante.
- *Viabilidad:* media-alta. Genes y chasis conocidos; falta integración y escalado.
- *Retorno a la Tierra:* el perclorato contamina aguas subterráneas en el suroeste de EE. UU.,
  Chile (Atacama), sitios de cohetería y fuegos artificiales; hoy se trata caro. Un biorreactor
  compacto lo destruiría in situ liberando O₂.
- *ODS:* 6, 3, 12.

**3. Cianobacteria como "fábrica cero" de una bioeconomía en cascada**
- *Qué:* *Anabaena* sp. PCC 7938 alimentada con agua minada, CO₂ y N₂ atmosféricos y nutrientes
  lixiviados del regolito → produce O₂, biomasa y **fertilizante nitrogenado**; su biomasa
  alimenta levaduras (fermentación de precisión) → comida, fármacos, bioplásticos.
- *Causa raíz:* dependencia de consumibles importados (O₂, fertilizante, precursores de fármacos);
  cada eslabón hoy es una caja separada que hay que reabastecer.
- *Novedad:* diseñar la **cadena trófica industrial completa** desde un solo productor primario
  que solo necesita recursos locales; optimizada por software (idea #13).
- *Viabilidad:* media. Estudios 2022–2024: crecimiento en regolito marciano, breakeven de recursos
  en pocos años. Reto: escalar y encadenar.
- *Retorno a la Tierra:* biofertilizante y regeneración de suelos degradados a partir de roca
  molida y aire; producción descentralizada de proteína y fármacos con insumos mínimos.
- *ODS:* 2, 6, 15, 9.

**4. "Terraforming de bolsillo": micelio que hace refugio + alfalfa que hace suelo**
- *Qué:* armazón inflable recubierto de hongo que crece hasta ser la estructura; dentro, **alfalfa
  inoculada con rhizobium** como cultivo pionero que convierte regolito detoxificado en suelo vivo
  para hortalizas.
- *Causa raíz:* dos importaciones caras — estructura y suelo fértil — y un regolito estéril/tóxico.
- *Novedad:* un mismo "kit" arranca refugio y agricultura usando solo agua + biología; secuencia
  de sucesión ecológica **diseñada** (pionera → clímax) dentro del hábitat.
- *Viabilidad:* media. Micotectura (NIAC III) + alfalfa biofertilizante (+190–311% en simulante)
  están probados por separado.
- *Retorno a la Tierra:* recuperación acelerada de tierras desertificadas o degradadas por minería;
  vivienda de micelio para desplazados; agricultura regenerativa en suelos pobres.
- *ODS:* 15, 2, 11, 1.

**5. Proteínas de tardígrado (Dsup / CAHS / LEA) en cultivos, microbioma y biobanco**
- *Qué:* introducir `Dsup` (suprime ~40% del daño al ADN por rayos X) en cultivos y en bacterias
  del intestino de la tripulación; usar proteínas CAHS/LEA para conservar semillas, vacunas y
  microbios **secos, sin ultracongelador** (criptobiosis).
- *Causa raíz:* radiación crónica sobre tripulación y cultivos; y la fragilidad del biobanco
  (depende de energía para frío).
- *Novedad:* radioprotección *incorporada* al organismo, no al muro; almacenamiento biológico
  resiliente a cortes de energía. Alto riesgo/alto impacto — casi inexplorado en un sistema real.
- *Viabilidad:* baja-media (regulatorio y ético en humanos; alta en cultivos y biobanco).
- *Retorno a la Tierra:* radioprotección para pacientes de radioterapia y trabajadores de limpieza
  nuclear; **cadena de frío eliminada** para vacunas y bancos de semillas en países sin
  electricidad estable.
- *ODS:* 3, 2, 9.

### — SOFTWARE / IA —

**6. Bucle jardín ↔ mente: acompañante de salud conductual autónomo y local**
- *Qué:* IA que corre **sin conexión con la Tierra**; integra el diario del astronauta, análisis
  de voz/sueño y su **participación medida en el jardín del hábitat**; sugiere intervenciones
  (más tiempo de horticultura, luz, contacto con familia en diferido, pausa) y avisa al equipo
  médico solo si hay señal de alarma.
- *Causa raíz:* el retardo de comunicación (hasta 22 min) elimina el apoyo psicológico en tiempo
  real; el riesgo BMed requiere autonomía.
- *Novedad:* cierra el bucle **terapia hortícola ↔ estado emocional** con sensado pasivo; el jardín
  deja de ser adorno y se vuelve instrumento clínico. Fully edge, privado.
- *Viabilidad:* alta (software + sensores existentes; modelos locales pequeños).
- *Retorno a la Tierra:* salud mental para poblaciones aisladas y con poca conectividad — zonas
  rurales, adultos mayores, plataformas petroleras, bases antárticas, centros penitenciarios,
  cuidadores. Programas de "horticultura social" basados en evidencia.
- *ODS:* 3, 10, 11.

**7. Gemelo digital del hábitat con explicabilidad para no ingenieros**
- *Qué:* réplica virtual del ECLSS actualizada con datos en vivo que **predice fallas** y, sobre
  todo, **las explica en lenguaje sencillo** con opciones de acción priorizadas — para una
  tripulación sin especialistas y sin poder llamar a Houston.
- *Causa raíz:* "las correcciones por voz en tiempo real son inviables en espacio profundo"
  (retardo); la tripulación no es experta en cada subsistema.
- *Novedad:* el foco no es el gemelo (ya se investiga) sino la **capa de tutoría/decisión para
  legos**: convierte diagnóstico en aprendizaje y acción.
- *Viabilidad:* alta. SpaceOps-2025 y AIAA ya publican gemelos de ECLSS; la capa explicativa es
  el diferenciador.
- *Retorno a la Tierra:* operación de microredes de agua/energía en comunidades aisladas sin
  ingeniero de planta; respuesta a desastres; mantenimiento predictivo democratizado.
- *ODS:* 6, 7, 9, 11.

**8. Celda de combustible microbiana en el bucle de aguas grises (limpia + genera + sensa)**
- *Qué:* las aguas grises pasan por MFCs que (1) reducen la carga orgánica 60–97%, (2) generan
  un goteo de electricidad y (3) el voltaje sirve de **biosensor** de seguridad del agua en
  tiempo real.
- *Causa raíz:* el tratamiento de aguas, la generación de energía y el monitoreo de calidad son
  hoy tres sistemas con tres consumos y tres puntos de falla, sobre el mismo residuo.
- *Novedad:* triple función sobre una sola corriente de residuo, con el sensado "gratis" del
  propio proceso.
- *Viabilidad:* media. MFCs bien caracterizadas (0.1–23 W/m²); reto: robustez y escala.
- *Retorno a la Tierra:* saneamiento + electricidad + alerta de calidad de agua para los ~2 000
  millones de personas sin saneamiento seguro; letrinas que cargan una lámpara y un teléfono.
- *ODS:* 6, 7, 3.

**9. "Contabilidad Gaia": panel que gestiona el hábitat como ecosistema**
- *Qué:* software que modela los flujos de masa, energía y nutrientes del hábitat como un
  mini-sistema terrestre, **muestra los bucles de retroalimentación y dónde el ciclo está
  abierto** (dónde se pierde agua, carbono, nitrógeno), y propone cómo cerrarlo.
- *Causa raíz:* sin visibilidad del ciclo completo, la tripulación optimiza subsistemas por
  separado y el sistema global "sangra" recursos.
- *Novedad:* traslada la ciencia del sistema terrestre a una herramienta operativa **y**
  educativa; hace visible lo que la biosfera hace invisible.
- *Viabilidad:* alta (es modelado de flujos + visualización).
- *Retorno a la Tierra:* paneles de metabolismo de materiales para hogares, edificios y ciudades;
  alfabetización en sistemas para escuelas; contabilidad de economía circular para empresas.
- *ODS:* 12, 13, 4, 11.

**10. Gestión pasiva+activa de polvo orquestada por IA (paneles, filtros, trajes)**
- *Qué:* recubrimiento tipo Loto (pasivo) + escudo electrodinámico (activo) sobre superficies
  críticas; una IA decide **cuándo** activar el EDS según pronóstico de tormenta, energía
  disponible y nivel de suciedad, para gastar lo mínimo.
- *Causa raíz:* el polvo de ~3 µm degrada energía, sellos, filtros y pulmones; limpiarlo con agua
  o manualmente es carísimo en recursos.
- *Novedad:* la orquestación inteligente pasivo/activo según contexto — no solo el hardware, que
  ya existe (NASA GSFC).
- *Viabilidad:* media-alta.
- *Retorno a la Tierra:* granjas solares en desiertos pierden mucho rendimiento y agua por
  limpieza; limpieza sin agua reduce O&M y consumo hídrico; menos exposición a polvo → menos
  silicosis en minería y construcción.
- *ODS:* 7, 6, 3, 13.

### — HARDWARE / ISRU —

**11. Cosechador pasivo de agua atmosférica marciana (sorbente + regolito)**
- *Qué:* material sorbente (tipo MOF/zeolita) que captura la humedad nocturna y el agua del
  regolito de noche y la libera con el calor débil del día — **sin partes móviles ni energía**.
- *Causa raíz:* extraer agua hoy implica minar hielo o calentar regolito con mucha energía.
- *Novedad:* enfoque totalmente pasivo adaptado a la baja humedad y presión marciana; se
  "recarga" solo con el ciclo día/noche.
- *Viabilidad:* media (la atmósfera marciana es muy seca; combinar con hidratos de regolito).
- *Retorno a la Tierra:* generadores de agua atmosférica pasivos para regiones áridas y campos
  de refugiados — impacto directo en ODS 6; ya hay prototipos con MOF en la Tierra.
- *ODS:* 6, 1, 13.

**12. Bucle alimentario cerrado: policultivo + acuaponía + fermentación de residuos**
- *Qué:* intercultivo (leguminosa + hortaliza) sobre suelo hecho de regolito; peces o insectos
  (harina) que procesan restos vegetales; **fermentación de precisión** que convierte el residuo
  de cosecha en proteína y grasas; los efluentes vuelven como nutriente. Nada sale del bucle.
- *Causa raíz:* la comida importada y el "residuo" agrícola que se pierde en vez de recircular.
- *Novedad:* integración total de tres técnicas que hoy se estudian aisladas, con balance de
  nutrientes gestionado por software (idea #9).
- *Viabilidad:* media. Intercultivo en simulante ya mostró ventaja (PLOS One 2024); fermentación
  de precisión ya es industrial en la Tierra.
- *Retorno a la Tierra:* producción urbana circular de alimentos; seguridad alimentaria con
  mínima tierra, agua y desperdicio; "las granjas que alimentarán Marte transformarán la comida
  en la Tierra".
- *ODS:* 2, 12, 6, 11.

**13. Ladrillo de biocemento activado por orina (MICP + regolito, sin horno)**
- *Qué:* bacterias con ureasa + urea de la orina de la tripulación precipitan carbonato de calcio
  que cementa el regolito en ladrillos y en **reparación de grietas**, a temperatura ambiente.
- *Causa raíz:* la construcción con regolito por sinterizado/impresión consume mucha energía;
  el cemento importado no es opción.
- *Novedad:* usa un residuo humano (orina→urea) como activador y no necesita calor; combinable
  con AstroCrete (albúmina + urea → 40 MPa).
- *Viabilidad:* media-alta. MICP y AstroCrete demostrados en laboratorio; ojo: el perclorato
  inhibe algunas bacterias biocementantes → encadenar con idea #2 (detox primero).
- *Retorno a la Tierra:* el cemento es ~8% del CO₂ global; biocemento para pavimentos, control
  de erosión, reparación de grietas y estabilización de suelos con baja huella.
- *ODS:* 9, 11, 13.

**14. Muro-sensor de material vivo ingenierizado**
- *Qué:* biofilm bacteriano programado embebido en las paredes del hábitat que **cambia de color
  o fluoresce** ante una microgrieta, un pico de CO₂, un contaminante o humedad anómala. El muro
  es la alarma y, además, biomineraliza para sellar.
- *Causa raíz:* el monitoreo (requisito de sistema en NASA-STD-3001) hoy depende de sensores
  puntuales que pueden no estar donde falla algo.
- *Novedad:* sensado **distribuido y continuo en toda la superficie** + autosellado, con material
  vivo; los ELM de autorreparación existen, el muro-sensor integral no es producto.
- *Viabilidad:* baja-media (los ELM estructurales aún son jóvenes).
- *Retorno a la Tierra:* monitoreo barato de salud estructural en puentes, tuberías y presas;
  recubrimientos que avisan de fuga o corrosión antes del fallo.
- *ODS:* 9, 11, 6.

### — SOCIO-HUMANO —

**15. "El Arca viva": banco redundante de vida en criptobiosis + protocolo de custodia**
- *Qué:* biobanco distribuido (semillas, microbios del suelo y del intestino, cultivos iniciadores,
  vacunas) conservado **seco** con proteínas LEA/CAHS, sin ultracongelador; más un protocolo
  social de custodia rotativa que da a cada tripulante un rol de "guardián" de una parte del arca
  — propósito y cohesión.
- *Causa raíz:* un corte de energía prolongado (tormenta de polvo) puede matar el biobanco
  congelado; y la tripulación necesita trabajo con sentido (riesgo BMed).
- *Novedad:* almacenamiento biológico resiliente a energía **+** diseño de la custodia como
  intervención de salud conductual. Une hardware, bio y lo humano.
- *Viabilidad:* media (criptobiosis de semillas y tardígrados es real; escalar a microbios y
  vacunas es investigación activa).
- *Retorno a la Tierra:* bancos de semillas y vacunas que sobreviven sin electricidad en zonas
  vulnerables; conservación de biodiversidad de bajo costo; cadena de frío eliminada.
- *ODS:* 2, 3, 15, 13.

---

## 6. Cómo cada idea cubre la rúbrica (9 criterios, igual peso)

| Criterio | Qué tienen que enseñar | Dónde lo sacan |
|----------|------------------------|----------------|
| 1 Impacto | número de personas / magnitud del problema en Marte **y** Tierra | §5 "retorno a la Tierra" + datos §2/§3 |
| 2 Creatividad | la **combinación multifunción** que no existe como producto | §4 (regla de novedad) |
| 3 Diseño | prototipo que deja ver el mecanismo (Fase 7); bocetos del proceso | Fase 7 de la guía |
| 4 Culminación | proceso completo y coherente de Fase 1 a 12 | `CONTEXTO §3` |
| 5 Aprendizaje | qué descubrieron que cambió la idea (Fase 4 y 5) | documentar iteraciones en Documento Concepto |
| 6 Validez | causa raíz con **datos duros** (5 Por Qué) | §2 banco de datos + fuentes §7 |
| 7 Relevancia técnica | por qué es físicamente posible en Marte (gravedad, radiación, presión, perclorato) | §3 estado del arte + "viabilidad" de cada idea |
| 8 Presentación | narrativa de 5 min: gancho → problema+datos → solución → prototipo → viabilidad → retorno | §1 tesis central para el gancho |
| 9 Retorno a la humanidad | 1–5 ODS con justificación de dónde aplica **y dónde no** | ODS de cada idea en §5 |

**Errores que hunden proyectos (según la rúbrica de igual peso):** descuidar el criterio 9
(tratar la Tierra como añadido), y el criterio 6 (afirmar sin dato). Este documento existe
sobre todo para blindar esos dos.

---

## 7. Fuentes

**Marco conceptual**
- Gaia / sistema terrestre: https://www.sciencealert.com/the-strange-hypothesis-that-suggests-earth-may-be-alive · https://arxiv.org/pdf/2301.02150 (Gaian Habitable Zone)

**Condiciones de Marte**
- Atmósfera de Marte: https://www.space.com/16903-mars-atmosphere-climate-weather.html · https://en.wikipedia.org/wiki/Atmosphere_of_Mars
- Toxicidad del polvo marciano: https://pmc.ncbi.nlm.nih.gov/articles/PMC11815326/ · https://eos.org/research-spotlights/martian-dust-will-be-a-health-hazard-for-astronauts
- Percloratos + UV: https://www.nature.com/articles/s41598-017-04910-3
- Mapa de hielo subsuperficial (SWIM): https://swim.psi.edu/ · https://www.usgs.gov/publications/mars-subsurface-water-ice-mapping-20-data-products-and-results

**Aire / O₂**
- MOXIE (18 meses de operación): https://www.science.org/doi/10.1126/sciadv.abp8636 · https://en.wikipedia.org/wiki/Mars_Oxygen_ISRU_Experiment
- Cianobacterias en regolito marciano: https://www.nature.com/articles/s41526-022-00240-5 · https://www.sciencedirect.com/science/article/pii/S2211926424004132
- MELiSSA (soporte de vida bioregenerativo, ESA): https://www.esa.int/Enabling_Support/Space_Engineering_Technology/MELiSSA_life_support_project_an_innovation_network_in_support_to_space_exploration

**Agua**
- 98% de reciclaje en la ISS + Brine Processor: https://www.space.com/astronaut-pee-iss-water-recycling-98-percent-milestone · https://ntrs.nasa.gov/api/citations/20230006217/downloads/ICES%202023-097%20Status%20of%20ISS%20Water%20Management%20and%20Recovery.pdf
- Biorreactor detox de perclorato: https://phys.org/news/2024-01-scientists-biocatalytic-reactor-detoxifying-mars.html · https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11546323/ (bacteria perclorato-reductora radio-resistente)

**Comida / suelo**
- Alfalfa biofertilizante en simulante: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0272209
- Simbiosis leguminosa–rhizobium en simulante: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0259957
- Intercultivo en Marte: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0302149
- Fermentación de precisión / proteína unicelular: https://theconversation.com/the-food-systems-that-will-feed-mars-are-set-to-transform-food-on-earth-192492 · https://www.nature.com/articles/s41526-026-00576-2 (levadura en el espacio)

**Energía / polvo**
- Escudo electrodinámico + recubrimiento Loto (NASA GSFC): https://technology.nasa.gov/patent/GSC-TOPS-19 · https://ntrs.nasa.gov/api/citations/20110005671/downloads/20110005671.pdf
- Celdas de combustible microbianas (revisión 2025): https://link.springer.com/article/10.1007/s12155-025-10911-2 · https://onlinelibrary.wiley.com/doi/full/10.1002/gch2.202500004

**Refugio / radiación / materiales**
- Micotectura off-planet (NASA NIAC Fase III): https://www.nasa.gov/directorates/stmd/niac/mycotecture-off-planet-en-route-to-the-moon-and-mars/ · https://phys.org/news/2024-06-mycotecture-planet-en-route-moon.html
- Hongo radiotrófico en la ISS (escudo autorreplicante): https://www.biorxiv.org/content/10.1101/2020.07.16.205534.full.pdf · https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9294542/
- AstroCrete (sangre/orina + regolito): https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8463914/
- Biocementación (MICP) + perclorato: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12854443/
- Materiales vivos ingenierizados / bioconcreto autorreparable: https://yaleglobalhealthreview.com/2025/05/19/the-future-of-construction-living-self-healing-concrete/ · https://pubs.acs.org/doi/10.1021/accountsmr.3c00271

**Bio-extremófilos / almacenamiento**
- Biominería en la ISS (BioRock / BioAsteroid): https://www.nature.com/articles/s41467-020-19276-w · https://astrobiology.com/2026/02/microbial-biomining-from-asteroidal-material-onboard-the-international-space-station.html
- Proteína Dsup de tardígrado (radioprotección en células humanas): https://www.nature.com/articles/ncomms12808 · https://elifesciences.org/articles/47682
- Biología sintética para ISRU / fármacos a demanda: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4277073/ · https://arxiv.org/pdf/2503.23015 (simbiosis microbiana para habitabilidad de Marte)

**Software / IA / salud conductual**
- Gemelo digital de ECLSS: https://arc.aiaa.org/doi/full/10.2514/1.I011320 · https://publications.spaceops.org/2025/download_by_id.php?id=0106
- Pronóstico autónomo de salud del hábitat: https://arxiv.org/pdf/2411.12159
- Salud conductual (CHAPEA, HERA, autonomía): https://www.nasa.gov/humans-in-space/chapea/about-chapea/ · https://www.nature.com/articles/s41526-024-00437-w
- Riesgo BMed: https://humanresearchroadmap.nasa.gov/risks/risk.aspx?i=99 · https://www.nasa.gov/reference/risk-of-behavioral-changes-and-psychiatric-disorders/

**Spinoffs (retorno a la Tierra)**
- NASA Spinoff 2024: https://spinoff.nasa.gov/Spinoff_2024_Release · https://spinoff.nasa.gov/ISS-Spinoffs-2023

---

## 8. Pendientes de investigación (siguiente pasada)

- Confirmado el reto exacto de la UNACH → filtrar este banco a las 3–4 ideas alineadas.
- Profundizar en **una** idea: números de masa/energía, TRL real, qué falta para que funcione.
- Buscar el **dato duro terrestre** que dimensiona el problema (personas sin saneamiento, ha
  desertificadas, % de pérdida solar por polvo, coste de la cadena de frío de vacunas, etc.).
- Revisar `mars-challenge.com` y notificaciones de la plataforma por si publican pistas del jurado.
