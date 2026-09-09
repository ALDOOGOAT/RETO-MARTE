# PLAN MAESTRO · BioMars Chiapas

## Sistema MILPA-360
### Módulo Integrado de **L**arvas, **P**ostura y **A**gricultura en rotación de 360°

**Mars Challenge 2026 · The Grand Jam · Elemento TIERRA · Reto Unificado UNACH**
Centro de Convenciones Universitario "Dr. Manuel Velasco Suárez" · Chiapas · 8–9 de septiembre de 2026

> *"En Marte no puedes mover el rebaño, así que mueves el suelo."*
>
> **Eslogan del equipo:** *Sembrando vida, reciclando el futuro.*

---

## 0. Cómo usar este documento

Este es el **documento único** del equipo. Contiene el reto, los requerimientos que la solución
debe cumplir, el diseño completo, los datos duros con fuente, y el texto listo para copiar a la
plataforma en cada fase.

| Si necesitas… | Ve a |
|---|---|
| **Saber qué nos diferencia de los otros equipos** | **§0.5** |
| Saber qué exige exactamente el reto | §1 |
| La lista de requerimientos técnicos (ECLSS) y de evaluación | §2 |
| Entender el sistema | §4 |
| Un dato duro para defender algo ante el jurado | §5 |
| Texto listo para pegar en la plataforma | §6 |
| Construir el prototipo (físico) | §9 |
| El simulador 3D del carrusel | §0.5 |
| El guion del pitch | §10 |
| Qué falta por entregar | §13 |

**Documentos de apoyo en el repositorio:** `SISTEMA-MILPA-360.md` (versión extendida del diseño),
`IDEAS-ORIGINALES-EQUIPO.md` (fuente), `IDEA-DESCARTADA-MURO-CAPILAR.md` (registro de descarte),
`CONTEXTO-RETO-MARTE.md`, `INVESTIGACION-MARTE.md`, `ANALISIS-ENTORNO-CHIAPAS.md`.

---

## 0.5 El diferenciador — léelo antes de presentar

**Asume que no somos los únicos con codorniz, larva, musgo y bacterias.** Esa lista de especies
es lo que cualquier equipo obtiene al investigar el reto: la codorniz es el vertebrado más
pequeño con retorno útil, *Hermetia illucens* es el reciclador estándar, *Syntrichia caninervis*
salió en la prensa científica en 2024 y *Bacillus subtilis* aparece en cualquier búsqueda de
biorremediación. **Un catálogo de organismos no es un diseño, y no diferencia a nadie.**

Si en la semifinal otros equipos nombran los mismos organismos, esto no nos resta — nos confirma
la selección. Lo que nos separa es que nosotros no presentamos una lista: presentamos **un
mecanismo que se puede describir en una frase, dibujar en un plano y hacer girar delante del
jurado.**

### Los cuatro diferenciadores, en orden de fuerza

| # | Diferenciador | La pregunta que responde y nadie más responde |
|---|---|---|
| **1** | **La rotación invertida.** Las estaciones biológicas están fijas y **gira el sustrato**. Una bandeja no vuelve a recibir estiércol hasta **56 soles** después. | *"¿Cómo garantizan el descanso del suelo en 10 m² donde el animal no tiene a dónde irse?"* — El descanso no es un procedimiento que alguien pueda olvidar: **es geometría.** MELiSSA, BIOS-3 y Lunar Palace 1 mantienen compartimentos fijos conectados por bombas; ninguno mueve el sustrato. |
| **2** | **El biodigestor es también el reactor de percloratos.** No tratamos el sólido: lavamos el regolito y tratamos **la salmuera**. | *"¿Cómo quitan 100–200 g de perclorato por bandeja en tiempo de misión?"* — Las bacterias reductoras de perclorato necesitan anoxia y un donador de electrones orgánico. Un digestor de estiércol **ya es las dos cosas, gratis.** Dos residuos que se anulan. Aquí es donde se rompe la mayoría de las propuestas. |
| **3** | **La resiliencia por desfase.** 12 bandejas en 12 etapas distintas. | *"¿Y si hay una tormenta de polvo de tres semanas?"* — Se pierden las bandejas próximas a cosecha, **≈25 %**, no la producción entera. Redundancia obtenida de la geometría, **sin masa adicional** — la única que puedes permitirte en una misión sin reabastecimiento. |
| **4** | **La MFC degradada de batería a sistema nervioso.** | *"¿Cómo saben que el ciclo se está intoxicando, a 22 minutos-luz de la Tierra?"* — Como batería da microvatios y es inútil; como **biosensor autoalimentado** distingue toxicidad de falta de carga orgánica con **consumo cero**. |

### La prueba que ningún otro equipo va a poder enseñar

Los diferenciadores 1 y 3 son **cinemáticos**: dependen del tiempo y del movimiento. Una lámina
estática o una diapositiva generada con IA **no puede demostrarlos** — solo puede afirmarlos.
Por eso el prototipo digital es un **simulador con reloj de misión**, no un render:

📐 **[`prototipo-3d/milpa360-simulador.html`](prototipo-3d/milpa360-simulador.html)**
· publicado en https://claude.ai/code/artifact/74ae65a1-055b-4443-869e-178c3a40d7e7

- El carrusel **gira de verdad** contra un reloj de 730 soles y las bandejas cambian de estado al
  pasar por cada estación.
- La tabla de la izquierda muestra, bandeja por bandeja, **cuántos soles lleva sin recibir
  estiércol** — el número que el reto exige, en vivo.
- El botón **“Lanzar tormenta de polvo”** ejecuta 21 soles de tormenta y calcula la pérdida
  real: **≈25 % frente al 100 % de un cultivo sincronizado.**

> **Cómo usarlo en la semifinal:** no lo expliques. Gíralo, y luego lanza la tormenta. Son diez
> segundos y contestan las dos preguntas que el jurado iba a hacer.

### La frase que ordena todo el pitch

> Las especies las tiene cualquiera. **La cinemática no.**
> Nuestro aporte no es *qué* organismos elegimos — es **en qué orden, con qué tiempos y sobre qué
> mecanismo los pusimos a girar.**

---

# PARTE I · EL RETO Y SUS REQUERIMIENTOS

## 1. El reto exacto

### 1.1 Marco general (`EL RETO .pdf`)

Mantener con vida a una tripulación de **6 personas** en Marte diseñando una solución vinculada
al elemento **TIERRA** — *"todo lo que hace posible la vida: suelo, recursos naturales, equilibrio
del entorno y condiciones para habitar."*

Condiciones que **toda** solución debe contemplar:
**recursos muy limitados · entorno hostil · aislamiento prolongado · cero margen de error.**

### 1.2 ⏱ La restricción de los 2 años — la especificación que casi nadie lee

Las bases lo dicen dos veces (`EL RETO .pdf` §1 y Guía del Participante, Anexo A):

> *"La misión es de ida y vuelta y dura aprox. 2 años, no porque vivan 2 años en Marte, sino
> porque las mejores 'ventanas' de viaje entre la Tierra y Marte no ocurren todo el tiempo.
> Se viaja, se opera en Marte y se espera el momento seguro/eficiente para regresar."*

**No es un dato de color: es la especificación de diseño.** Implica cuatro cosas:

1. **Cero reabastecimiento.** No hay una segunda nave. Lo que no se produce, no existe.
2. **Todo consumible se dimensiona a ~730 soles.** Un sistema que funciona 6 meses y colapsa es
   un fracaso de misión, no un prototipo perfectible.
3. **Los organismos deben reproducirse dentro de la ventana**, no solo sobrevivir. Un sistema
   biológico que no cierra su ciclo reproductivo es un consumible más.
4. **La degradación de la comida almacenada es el enemigo real.** Vitaminas C, K, folato y tiamina
   se degradan en almacenamiento. Al mes 20 la tripulación no tiene hambre: tiene déficit de
   micronutrientes. **Ese es el hueco que MILPA-360 llena.**

### 1.3 El Reto Unificado UNACH — las tres partes obligatorias

⚠️ **El reto de UNACH sustituye a los 7 desafíos del reto general.** Confirmado en
`El Reto Mars Challenge 2026 UNACH (1).pdf`:

> *"Vas a diseñar un sistema vivo dentro de un hábitat en Marte. En ese sistema, plantas y
> animales van a trabajar juntos para que nada se desperdicie… Tu sistema debe lograr tres cosas
> al mismo tiempo: recuperar el suelo, eliminar la basura, y producir comida de forma estable
> aunque el clima sea extremo. Las tres partes deben estar conectadas — no puedes resolver
> solo una."*

| Parte | Exigencia literal | Dato oficial que la justifica |
|---|---|---|
| **1 · Recuperar el suelo con ayuda de los animales** | *"Diseña un sistema donde los animales, en un espacio pequeño y controlado, ayuden a mejorar el suelo en vez de dañarlo — por ejemplo, **moviéndolos de forma rotativa** para que su estiércol fertilice **sin agotar el terreno**."* | El suelo de Marte no tiene nutrientes y contiene sal tóxica (Phoenix, 2008) |
| **2 · Convertir todo residuo en algo útil** | *"Un mecanismo (puede ser un biodigestor o compostaje con microorganismos) que tome el **100%** de esos residuos y los convierta en dos cosas útiles: **energía (biogás)** y **abono**. **Si esta parte falla, todo el sistema falla.**"* | Todo residuo acumulado contamina el sistema completo |
| **3 · Cultivar de forma inteligente y resistente** | *"Usa la energía y el abono de la Parte 2. Propón **sensores baratos**, **mezclar varios cultivos resistentes**, o un **riego muy eficiente**, para que la producción sea estable aunque el clima sea difícil."* | Radiación, frío y poca luz solar (instrumentos de Curiosity) |

> **REGLA CLAVE:** *"Las tres partes están conectadas como una cadena: la Parte 1 alimenta a la
> Parte 2, y la Parte 2 alimenta a la Parte 3. No se aceptan proyectos que resuelvan solo una
> parte sin conectarla con las otras dos."*

### 1.4 Los 4 entregables que exige el Reto Unificado

1. El diseño del sistema animal-vegetal (cómo se conectan las tres partes) → **§4**
2. Cómo se convierte el residuo en energía y abono → **§4.2**
3. Cómo la zona de cultivo resiste el clima extremo de Marte → **§4.3**
4. Una explicación simple de por qué, si falla una parte, falla todo → **§7**

### 1.5 El retorno a la Tierra (obligatorio, texto oficial)

> *"En Chiapas, la ganadería extensiva está degradando el suelo, los residuos de granjas avícolas
> y porcícolas están contaminando el agua, y el cambio climático ya está afectando los cultivos de
> café y maíz de miles de familias. Tu sistema marciano — animales que regeneran en vez de dañar,
> residuos que se transforman en energía y abono, cultivos que resisten el clima extremo — es
> exactamente el tipo de solución que Chiapas necesita hoy."*

→ Desarrollado en **§8**.

---

## 2. Requerimientos que la solución debe cumplir

### 2.1 Requerimientos del reto (checklist de cumplimiento)

| # | Requerimiento | Cumplimiento MILPA-360 | ✔ |
|---|---|---|---|
| R1 | Sistema vivo con **≥3 componentes biológicos conectados** | Codorniz + larva BSF + consorcio microbiano + musgo + policultivo = **5** | ✔ |
| R2 | Animales en espacio pequeño y controlado | Aviario de codornices sobre el carrusel, volumen aislado | ✔ |
| R3 | Animales **movidos de forma rotativa** | Rotación invertida: gira el sustrato (8 bandejas, 1 paso/8 soles) | ✔ |
| R4 | Estiércol fertiliza **sin agotar el terreno** | 56 soles de descanso obligatorio por bandeja, garantizado por geometría | ✔ |
| R5 | Tomar el **100%** de los residuos | Larva BSF (fracción blanda) + biodigestor (fracción lignocelulósica, estiércol excedente, aguas negras, lixiviado) | ✔ |
| R6 | Producir **energía (biogás)** | Cámara metanogénica: ~10 MJ/día ≈ 2.9 kWh/día | ✔ |
| R7 | Producir **abono** | Frass (larvas) + digestato líquido (biodigestor) | ✔ |
| R8 | Usar esa energía y abono en el cultivo | Biogás → colchón térmico del módulo; digestato → riego | ✔ |
| R9 | **Sensores baratos** | Red de biosensores MFC autoalimentados (consumo cero) | ✔ |
| R10 | **Mezclar cultivos resistentes** | Policultivo estratificado camote + leguminosa + rábano | ✔ |
| R11 | **Riego eficiente** | **Goteo de baja altura sobre pivote central**: el colector anular gira con el anillo, 2 goteros por bandeja tendidos sobre la cama. Nada de aspersión (límite de polvo 0.1 mg/m³). Digestato dosificado + micorrizas (×10 absorción hídrica) + costra de musgo que retiene humedad | ✔ |
| R12 | Producción **estable** pese al clima extremo | Resiliencia por desfase: 12 bandejas en 12 etapas | ✔ |
| R13 | Las 3 partes **encadenadas** | Dependencia circular documentada con tiempos (§7) | ✔ |
| R14 | Explicación de falla en cascada | §7 | ✔ |
| R15 | Retorno a la Tierra con datos reales | §8, datos SEMARNAT/TNC/prensa | ✔ |
| R16 | 1–5 ODS con justificación de dónde aplica **y dónde no** | 5 ODS con doble columna (§8.3) | ✔ |
| R17 | Operar **~730 soles sin reabastecimiento** | §1.2 y reloj biológico (§2.3) | ✔ |

### 2.2 Requerimientos técnicos NASA-STD-3001 Vol. 2 Rev. E
*(fuente: `ECLSS Requirements Mars Habitat 2026.pdf`, compilado por Erik Antonsen, OSMED)*

Estos son los límites reales que un jurado técnico puede citar. **Los relevantes para MILPA-360
están marcados.**

#### Atmósfera

| Parámetro | Requisito | ID | Impacto en MILPA-360 |
|---|---|---|---|
| Gas diluyente | ≥30% (resto O₂) | 6002 | — |
| ppO₂ inspirado | 145–155 mmHg (normoxia); mín. 127 mmHg | 6003 | El O₂ de la reducción de perclorato **no** se contabiliza aquí |
| **ppCO₂** | **≤3 mmHg** (media 1 h) | **6004** | ⚠️ Respiración de las codornices; se compensa con la fotosíntesis del anillo exterior |
| Presión total | 5.0–15.0 psia (34.5–103 kPa) | 6006 | Aviario y digestor a la misma presión del hábitat |
| **Temperatura (desempeño)** | **~20–25 °C, 30–60% HR** | **6013** | ⚠️ Es el punto de consigna que sostiene el colchón térmico de biogás |
| Límite de salud (cabina) | 18 °C/75% HR a 27 °C/25% HR | 6012 | El módulo de cultivo debe operar dentro de esta envolvente |
| Ventilación nominal | 4.57–36.58 m/min | 6107 | Evita bolsas de CO₂/NH₃ sobre el aviario |

#### Contaminación — **la sección crítica al meter animales**

| Parámetro | Requisito | ID | Impacto en MILPA-360 |
|---|---|---|---|
| Contaminantes gaseosos | Bajo límites SMAC (JSC-20584) | 6050 | ⚠️ **NH₃ del estiércol acumulado.** Si las larvas fallan, esto se viola |
| **Particulado total** | **<3 mg/m³** | **6052** | ⚠️ Plumón y caspa de las codornices |
| **Particulado respirable (<2.5 µm)** | **<1 mg/m³** | **6052** | ⚠️ Fracción fina del plumón |
| **Polvo lunar/marciano** | **<0.3 mg/m³** TWA (<10 µm) | **6053** | ⚠️ Regolito resuspendido al girar el carrusel → lo sella la costra de musgo |
| **Calidad microbiana del aire** | **HEPA ≥99.97% @ 0.3 µm** | **6059** | ⚠️ Aerosoles del aviario y del biodigestor |
| VOC traza | Monitoreo y alerta | 6023 | Compuestos volátiles de la fermentación |
| Alerta de polvo celeste | Monitoreo/alerta | 6153 | El carrusel es una fuente activa de polvo |

#### Agua

| Parámetro | Requisito | ID | Impacto en MILPA-360 |
|---|---|---|---|
| Calidad de agua potable | Química y microbiológicamente segura en el punto de uso | 6026 | El agua declorada regresa al ciclo **no potable** (riego) |
| Control de contaminación | Prevenir contaminación microbiana, atmosférica y química | 6051 | Barrera entre el lazo del digestor y el lazo potable |
| **Agua potable mínima** | **2.5 L/tripulante/día** | **Tabla 6.3-1** | ⚠️ Si el digestor falla, se gasta agua potable en lavar regolito |
| Monitoreo de calidad | Capacidad de monitorear y alertar | 6046 | **Lo cubre la red MFC** |

#### Acústica — **el requisito que nadie ve venir**

| Parámetro | Requisito | ID | Impacto en MILPA-360 |
|---|---|---|---|
| **Ruido continuo, zona de sueño** | **NC-40** (misiones >30 días) | **6079** | ⚠️ **Las codornices cantan.** El aviario se aísla acústicamente o viola la norma |
| Ruido continuo, zona de trabajo | NC-50 | 6078 | Compresor del digestor + motor del carrusel |
| **Dosis 24 h** | **≤100 (75 dBA TWA)** | **6115** | ⚠️ Suma de todas las fuentes del módulo |
| Molestia durante el sueño | ≤10 dB sobre el fondo | 6082 | Programar el giro del carrusel fuera del turno de sueño |
| Techo de ruido peligroso | <85 dBA | 6077 | Mantenimiento del sistema |

> **Cómo usar esta tabla en la ronda de preguntas:** si el jurado pregunta *"¿no contaminan los
> animales el aire del hábitat?"*, la respuesta es: **"Sí, y por eso el aviario es un volumen a
> presión negativa con filtración HEPA al 99.97% a 0.3 micras, según el requisito 6059, y está
> aislado acústicamente porque las zonas de sueño se limitan a NC-40 por el 6079."** Esa respuesta
> gana el criterio 7 (Relevancia técnica) sola.

### 2.3 Reloj biológico del sistema vs. 730 soles

| Organismo / subsistema | Ciclo | Generaciones en 730 soles | Implicación de diseño |
|---|---|---|---|
| *Coturnix japonica* | Primer huevo a los **40 días**; postura activa ≥30 semanas | ~8 relevos de parvada | Se lleva parvada fundadora, no un año de huevo |
| *Hermetia illucens* | Huevo→prepupa ~14 días; ciclo completo ~45 días | ~16 | Biomasa proteica bajo demanda |
| Bandeja, anillo interior | **64 soles** | ~11 vueltas | 11 ciclos de regeneración de suelo |
| Bandeja, anillo exterior | **96 soles** | ~7 cosechas | Producción escalonada continua |
| *Syntrichia caninervis* | Regenera 100% en 30 días tras desecación | continuo | Semáforo biológico permanente |

> **Riesgo declarado — cuello de botella genético.** Ocho relevos de parvada con población
> fundadora pequeña producen consanguinidad. Mitigación: **cuatro líneas familiares no
> emparentadas en cruce rotativo** (A×B, C×D → A×C, B×D…). La solución al problema genético vuelve
> a ser *rotación*: es el principio del sistema aplicado al ADN.

### 2.4 Criterios de evaluación — 9 criterios de igual peso

| # | Criterio | Qué observa el jurado | Dónde lo cubrimos |
|---|---|---|---|
| 1 | **Impacto** | Diferencia real en la vida de las personas, en Marte y en la Tierra | §4, §8 |
| 2 | **Creatividad** | Original e innovadora, más allá de lo obvio | §4.4 (las 4 originalidades) |
| 3 | **Diseño** | Bien pensada; el prototipo comunica con claridad | §9 |
| 4 | **Culminación** | Proceso completo, coherente y profundo | Registro de ideas descartadas + Documento Concepto |
| 5 | **Aprendizaje** | El equipo aprendió algo real | §3 (qué cambió y por qué) |
| 6 | **Validez** | Problemática respaldada con datos; viable | §5 (17 datos con fuente), §12 (limitaciones) |
| 7 | **Relevancia técnica** | Viable en el contexto de Marte | §2.2 (ECLSS) |
| 8 | **Presentación** | Clara y convincente en 5 minutos | §10 |
| 9 | **Retorno a la humanidad** | Contribuye a un futuro mejor en la Tierra | §8 |

> Los dos criterios que más se descuidan son **6 · Validez** y **9 · Retorno a la humanidad**.
> Ambos tienen sección propia y completa en este documento.

---

# PARTE II · EL EQUIPO

## 3. Identidad, fortalezas y roles

**Nombre oficial:** BioMars Chiapas · **Eslogan:** *Sembrando vida, reciclando el futuro.*

| Integrante | Formación | Rol | Fortaleza que lo justifica | Fases clave |
|---|---|---|---|---|
| **Aldo Fabio Contreras Marroquín** | Ing. Desarrollo de Software | **CEO / HR Manager** | Liderazgo estratégico, pensamiento estructurado, decisión bajo presión | 1, 2, 11 |
| **Valeria Sherlyn Jiménez Pérez** | Agronegocios | **CMO / Product Manager** | Visión de viabilidad y cadenas productivas; es la voz del astronauta | 4, 5 |
| **Angélica Vázquez Esquinca** | Arquitectura | **UX / UI Designer** | Visualización espacial, maquetación rápida, diseño en espacio reducido | 7, 9 |
| **María Fernanda Fernández Mandujano** | Ing. Biomédica | **Deep Space Communications Specialist** | Documentación rigurosa, síntesis de papers, redacción estructurada | Todas (plataforma) y 9 |
| **Diego Martín Cruz Vázquez** | Ing. Desarrollo de Software | **Ingeniero de Soporte Vital** | Análisis de datos duros, automatización, detección de fantasías técnicas | 5, 6, 7 |
| **Francisco Javier Olivera Palacios** | Biotecnología | **Científico Planetario / Arquitecto Espacial** | Rigor científico, microorganismos, coherencia ecosistémica | 5, 6, 8 |

**Reparto por subsistema durante la defensa:**
Parte 1 (animales/rotación) → Valeria + Francisco ·
Parte 2 (biodigestor/percloratos) → Francisco + Diego ·
Parte 3 (cultivo/sensores) → Diego + Angélica ·
ECLSS y datos duros → Diego · Retorno a Chiapas y ODS → Francisco + Valeria ·
Narrativa y plataforma → María Fernanda · Coordinación y cierre → Aldo.

---

# PARTE III · LA SOLUCIÓN

## 4. Sistema MILPA-360

### 4.0 La idea en una frase

> **En Marte no puedes mover el rebaño, así que mueves el suelo:** un carrusel de bandejas de
> regolito que gira bajo estaciones biológicas fijas — codornices, larvas, biodigestor, musgo,
> cultivo — de modo que cada porción de suelo recibe pastoreo intenso, descanso obligatorio y
> siembra en una secuencia que nunca se detiene. Es el pastoreo rotacional de Chiapas, invertido
> y comprimido en 10 m².

### 4.1 Arquitectura

```
                    ┌──────────────────────────────────┐
                    │  CÚPULA · AVIARIO DE CODORNICES   │  ← Parte 1 (vertebrado)
                    │  HEPA 99.97% · presión negativa   │     aislamiento acústico NC-40
                    └───────────────┬──────────────────┘
                                    │ estiércol dirigido
   ANILLO INTERIOR (regeneración)   ▼   8 bandejas · 1 paso / 8 soles · ciclo 64 soles
   S1 lavado ─ S2 codorniz ─ S3 larvas ─ S4 DESCANSO+inóculo ─ S5 musgo ─ S6 ─ S7 ─ S8
        │                        │              ▲                  │
        │ salmuera ClO₄⁻         │ frass        │ digestato        │ bandeja apta
        ▼                        ▼              │                  ▼
   ┌────────────────────────────────────────────┴──┐   ANILLO EXTERIOR (cultivo)
   │  BIODIGESTOR DE DOS CÁMARAS                   │   12 bandejas · ciclo 96 soles
   │  A · anóxica:  ClO₄⁻ → ClO₃⁻ → ClO₂⁻ → Cl⁻+O₂ │   camote · leguminosa · rábano
   │  B · metanogénica: → BIOGÁS + DIGESTATO       │        │
   └───────────────┬───────────────────────────────┘        │ rastrojo
                   │ biogás → colchón térmico ──────────────┘
                   │ digestato → riego
                   └── MFC-biosensor en cada punto de trasvase
```

**Dimensiones de referencia:** anillo interior 8 bandejas × 0.5 m² = 4 m²; anillo exterior
12 × 0.5 m² = 6 m². Total ≈ **10 m² de superficie de bandeja**, en un cilindro de
**Ø 4.56 m × 2.2 m de alto**, con el aviario como cúpula sobre S2 y el biodigestor en el núcleo.

> **Las bandejas son sectores anulares, no cajas cuadradas.** En un carrusel de anillos
> concéntricos es la única forma que **tesela el anillo sin dejar huecos**: no hay esquinas que
> sobresalgan, no hay triángulos muertos entre bandeja y bandeja, y la geometría garantiza por
> construcción que ninguna choque al girar. La guía de la maqueta física (§10) ya decía
> «8 sectores» y «12 sectores» — el sector es la forma correcta y la que hay que enseñar.
>
> | Comprobación | Valor |
> |---|---|
> | Anillo interior · 8 sectores de 42.3° | r 0.52 → 1.278 m · **0.50 m² cada uno** |
> | Anillo exterior · 12 sectores de 28.2° | r 1.34 → 1.979 m · **0.52 m² cada uno** |
> | Total de bandeja | **10.3 m²** |
> | Hueco central libre | r = 0.52 m — ahí va el biodigestor |
> | **Casco** | **Ø 4.56 m** · el piso son 16.3 m², la bandeja ocupa el 63 % |
>
> **Corrección de dos cifras propias.** (1) El documento decía «Ø ~3.5 m»: **no cierra**, porque
> un círculo de 3.5 m tiene 9.6 m² de piso *total*. Con bandejas cuadradas hacían falta Ø 4.76 m;
> con sectores bastan **Ø 4.56 m**, porque la esquina de una bandeja cuadrada era justo lo que
> obligaba a agrandar el casco. (2) Los **20 kg de regolito por bandeja** no son la bandeja
> entera: a 1 500 kg/m³ eso es una **capa de 2.5 cm** — que es exactamente la que se lava en cada
> ciclo. La cubeta es de **22 cm**, la profundidad que pide el camote, así que contiene ~165 kg.
> **En total el sistema mueve ~3.3 t de regolito, todo obtenido in situ: cero masa de lanzamiento.**
>
> Decirlo así **suma** en el criterio de validez: las cifras salen de una comprobación, no de una
> estimación. Si alguien pregunta por qué cambiaron, la respuesta es que se midieron.

### 4.2 PARTE 1 — El suelo lo regeneran los animales, en rotación

**La inversión conceptual.** El pastoreo rotacional funciona en la Tierra porque el animal *se va*
y el suelo descansa. En un hábitat de 10 m² no hay a dónde ir. Solución: **se fija el animal y se
rota el suelo.** La bandeja que hoy recibe estiércol no vuelve a recibirlo hasta dentro de
**56 soles**. Ese intervalo *es* el descanso — el mecanismo real que el reto exige al decir
*"sin agotar el terreno"*.

**Estación S2 · Deposición dirigida.** El aviario está sobre el anillo; la rejilla del piso deja
caer el estiércol fresco directamente sobre la bandeja en turno. Alta intensidad, corta duración,
descanso largo: *mob grazing* miniaturizado, sin pastor y sin cerca eléctrica.

**a) *Coturnix japonica* — codorniz japonesa.** El vertebrado más pequeño con retorno útil:

| Parámetro | Valor | Por qué importa en Marte |
|---|---|---|
| Primer huevo | **40 días** | Cabe 8 veces en la misión; una gallina no cabría bien |
| Incubación | 16–17 días | Recuperación rápida ante cualquier pérdida |
| Peso al nacer | 8–10 g | Masa de lanzamiento despreciable |
| Consumo | **~23 g/ave/día** | 24 aves = 552 g/día de ración |
| Tasa de postura | **~68%** | 24 hembras ≈ 16 huevos/día ≈ **~11,900 huevos en la misión** |
| Peso del huevo | ~10.8 g | ≈29 g de huevo/persona/día: proteína fresca real |
| Conversión alimenticia | ~3.4 | Referencia para el balance de masa |

**b) *Hermetia illucens* — larva de mosca soldado negra.** No es "el animal del reto": es el
**puente que cierra el círculo del animal**. Existe literatura específica de bioconversión de
**estiércol de codorniz** por esta larva. Reduce la materia seca del residuo entre **44% y 82%**
y devuelve larva (proteína + lípido) que vuelve al comedero, y **frass** con NPK comparable al de
fertilizantes orgánicos comerciales.

> **El bucle para el pitch:** la codorniz produce el residuo que alimenta a la larva; la larva se
> convierte en la proteína que alimenta a la codorniz. La única entrada externa es la fracción de
> grano de la ración. **Reducir esa fracción es reducir masa de lanzamiento.**

**Sanidad ECLSS.** Ver §2.2: aviario a presión negativa, HEPA ≥99.97% @0.3 µm, aislamiento
acústico NC-40.

**Y el contrapunto psicológico.** Ese mismo canto que hay que atenuar en la zona de sueño es, en
la zona de trabajo, **un mitigante documentado del riesgo BMed de la NASA** (cambios conductuales
y trastornos psiquiátricos por aislamiento prolongado). Plantas verdes, animales a los que cuidar
y sonido biológico son de los pocos estímulos no sintéticos disponibles a 22 minutos-luz de casa.
El sistema no solo alimenta: **sostiene la salud mental de la tripulación.**

### 4.3 PARTE 2 — El biodigestor que además desactiva el veneno del planeta

**El problema doble.** (a) Convertir el 100% del residuo en energía y abono. (b) El regolito
marciano contiene **0.5–1% de percloratos** (Phoenix, 2008), tóxicos para la tiroides humana y
para la mayoría de los cultivos.

**Por qué no funciona biorremediar el sólido.** Una bandeja de 20 kg de regolito contiene
100–200 g de perclorato. Ningún consorcio microbiano procesa eso en el sólido, en tiempo de misión
y en volumen de hábitat. Pretenderlo es donde la mayoría de las propuestas se rompe.

**La solución: no trates el sólido, trata la salmuera.** El perclorato es **altamente soluble**.
S1 lava el regolito con agua reciclada; el perclorato sale casi por completo en el agua de lavado.
El problema deja de ser un suelo tóxico y pasa a ser **un litro de salmuera**: concentrada,
acotada, manejable.

**La coincidencia que nadie está explotando.** Las bacterias reductoras disimilatorias de
perclorato (*Azospira suillum*, *Dechloromonas* spp.) necesitan exactamente dos cosas:
**ausencia de oxígeno** y **un donador de electrones orgánico**. Un biodigestor anaerobio
alimentado con estiércol y frass **es las dos cosas, gratis y de forma continua**. Nadie tiene
que construir un reactor de percloratos: ya lo construimos para hacer biogás.

```
ClO₄⁻ ──perclorato reductasa──► ClO₃⁻ ──► ClO₂⁻ ──clorito dismutasa──► Cl⁻  +  O₂
(veneno)                                                          (sal inerte)  (oxígeno)
```

> **Honestidad obligatoria:** ese O₂ es un **coproducto**, no una fuente de oxígeno para la
> tripulación. Se reporta como métrica de eficacia del tratamiento, no como soporte vital.

**Arquitectura de dos cámaras** (el orden importa: la metanogénesis se inhibe con perclorato):

- **Cámara A · anóxica / dehalogenante.** Entrada: salmuera de lavado + lixiviado del frass.
  Salida: agua declorada reincorporable al ciclo de riego + trazas de O₂. Protege a la cámara B.
- **Cámara B · metanogénica.** Entrada: frass, estiércol excedente, rastrojo del anillo exterior,
  aguas negras de la tripulación. Salida: **biogás + digestato**.

**Balance energético** *(estimación del equipo con parámetros de literatura, no medición)*:

| Variable | Valor | Fuente |
|---|---|---|
| Carga a cámara B | ~2 kg SV/día | Balance de masa del equipo |
| Rendimiento de biogás | 0.24 m³/kg (estiércol, base seca) | Guía FAO de biodigestores |
| Fracción de CH₄ | ~60% | ídem |
| Poder calorífico CH₄ | ~35.8 MJ/m³ | Estándar |
| **Resultado** | **≈10 MJ/día ≈ 2.9 kWh/día** | |

> **Cómo se presenta sin exagerar — y por qué es más fuerte así:** 2.9 kWh/día no alimentan un
> hábitat marciano. Alimentan **el propio MILPA-360**: motor del carrusel, bombas de trasvase,
> iluminación de mantenimiento y —lo crítico— un **colchón térmico de emergencia** para sostener
> el punto de consigna del módulo de cultivo durante una noche marciana o una tormenta de polvo
> global que deje los paneles inservibles.
>
> **MILPA-360 es el único subsistema de soporte vital del hábitat que se mueve con su propia
> basura. No compite por la energía de la misión: la libera.**

### 4.4 PARTE 3 — Cultivo estable pese al clima extremo

#### *Syntrichia caninervis* — costra biológica y semáforo

El musgo del desierto documentado en 2024 como candidato a planta pionera extraterrestre:

- **Regeneración del 100% en 30 días** tras condiciones marcianas simuladas (95% CO₂, −60 °C a
  20 °C, alta radiación UV, baja presión).
- Sobrevive a **−196 °C** (nitrógeno líquido, 1 mes) y **−80 °C durante 5 años**.
- **LD50 a radiación gamma ≈ 5,000 Gy** en estado desecado.
- Primer estudio con **plantas enteras** y **directamente sobre suelo marciano simulado**.

Dos funciones operativas:

1. **Costra biológica de cierre.** Sella la superficie: retiene humedad e **impide que el regolito
   suelto se resuspenda** al girar el carrusel — que es lo que pondría en riesgo el límite de
   0.3 mg/m³ de polvo marciano `[V2 6053]`.
2. **Semáforo go/no-go.** Es más tolerante que cualquier cultivo alimenticio. Si prospera, el
   sustrato está desintoxicado. **Bandeja verde = bandeja apta para siembra.** Un test de
   toxicidad de suelo que no consume energía, no requiere reactivo y lo lee cualquier tripulante
   de un vistazo.

#### La milpa reescrita: policultivo escalonado

| Cultivo | Estrato | Ciclo | Función en el sistema |
|---|---|---|---|
| **Camote** | Profundo/medio | 90–120 d | Calorías y densidad nutricional; explora el fondo de la bandeja |
| **Leguminosa** (alfalfa/lenteja/frijol) | Superficial fijador | continuo | Fija N₂ vía *Rhizobium*; su rastrojo alimenta al digestor |
| **Rábano** | Superficial | **25–30 d** | Cosecha rápida: moral de la tripulación y verificación temprana del sustrato |

Es la lógica de la milpa mesoamericana —una planta que da estructura, una que fija nitrógeno, una
que cubre el suelo— trasladada a una bandeja de 0.5 m². **El retorno a la Tierra no es una
metáfora: el sistema literalmente lleva de vuelta a Chiapas su propia agricultura, mejorada.**

#### Cóctel biológico de siembra (inyectado en S4)

| Organismo | Función | Por qué en Marte |
|---|---|---|
| *Rhizobium* | Nodula la leguminosa, fija N₂ | Fábrica de fertilizante que no ocupa masa |
| Micorrizas Glomeromicota | Multiplica hasta ×10 la absorción hídrica | Seguro contra fallo de riego |
| *Pseudomonas fluorescens* | Solubiliza P y Fe atrapados en el mineral | El regolito tiene P; no está disponible |
| *Bacillus amyloliquefaciens* | Tolerancia a salinidad | Trazas de perclorato tras el lavado |
| *Trichoderma harzianum* | Antagonista de hongos patógenos | Hábitat cerrado y húmedo = pudrición garantizada |
| *Bacillus subtilis* | Biofilm radicular como filtro osmótico | Protege tubérculos de sales residuales |

#### Los "sensores baratos": la MFC como sistema nervioso

La celda de combustible microbiana genera microvatios — inútil como batería. **Pero es un
biosensor autoalimentado excelente.** Su voltaje es proporcional a la actividad metabólica del
consorcio:

- **Caída de voltaje con carga orgánica estable → hay un tóxico entrando al bucle.**
- **Caída de voltaje con carga orgánica baja → falta alimento en esa estación.**

La literatura de alerta temprana en calidad de agua documenta que ambos escenarios son
distinguibles. Se coloca una MFC en cada punto de trasvase (S1→digestor, digestor→riego,
riego→bandeja).

> Una red de detección de intoxicación del ciclo que **no consume ni un vatio de la misión, no
> requiere calibración con reactivos y avisa antes de que el daño sea visible** — que es
> exactamente lo que necesitas cuando la respuesta de la Tierra tarda 22 minutos en llegar.
> Es también el sensor perfecto para Chiapas: una comunidad sin laboratorio puede leer un LED.

#### Resiliencia por desfase

12 bandejas avanzan una posición cada 8 soles. En cualquier instante hay bandejas en **todas** las
etapas. Una tormenta de polvo de tres semanas daña las bandejas expuestas en esa ventana — **no la
producción entera.** Es redundancia obtenida de la geometría, no de piezas de repuesto. En una
misión sin reabastecimiento, la redundancia que no pesa es la única que puedes permitirte.

### 4.5 Las cuatro originalidades (criterio 2 · Creatividad)

> **Estas cuatro son nuestro diferenciador real frente a los demás equipos.** El argumento
> completo —por qué la lista de especies no diferencia a nadie y estas cuatro sí— está en
> **§0.5**, que es lo que hay que leer antes de presentar.

1. **La rotación invertida.** MELiSSA, BIOS-3 y Lunar Palace 1 mantienen compartimentos fijos
   conectados por bombas. Aquí **el sustrato es la banda transportadora** y el descanso está
   garantizado por geometría, no por procedimiento.
2. **El biodigestor como reactor de percloratos.** Dos residuos que se anulan: el residuo orgánico
   es exactamente el donador de electrones que la reducción de perclorato necesita, y la anoxia ya
   estaba ahí gratis.
3. **La MFC degradada de batería a sistema nervioso.** Biosensor autoalimentado que distingue
   toxicidad de falta de carga orgánica, con consumo cero.
4. **La resiliencia por desfase.** Redundancia obtenida de la geometría, sin masa adicional.

---

## 5. Datos duros — tabla de respaldo

| # | Dato | Uso en la narrativa |
|---|---|---|
| 1 | Misión de ida y vuelta ≈ **2 años**, sin reabastecimiento | Especificación de diseño |
| 2 | **7.4–10.9 t** de alimento para 6 personas si todo se lleva (1.7–2.5 kg/persona/día × 730 d) | El golpe de apertura |
| 3 | Regolito marciano: **0.5–1% de percloratos** (Phoenix, 2008) | "El suelo es veneno" |
| 4 | Codorniz: primer huevo a los **40 días**, ~23 g de ración/día, postura ~68%, huevo ~10.8 g | Viabilidad del animal |
| 5 | Larva BSF reduce **44–82%** de la materia seca del residuo | Viabilidad de la Parte 2 |
| 6 | Frass con **NPK comparable a fertilizantes orgánicos comerciales** | El abono es real |
| 7 | Biogás **0.24 m³/kg** (estiércol seco), CH₄ ~60%, ~35.8 MJ/m³ | La energía es real y modesta |
| 8 | *S. caninervis*: **100% de regeneración en 30 días** tras condiciones marcianas simuladas | La planta pionera es real |
| 9 | *S. caninervis*: **LD50 ≈ 5,000 Gy** gamma desecado; sobrevive **−196 °C** | Resistencia a radiación |
| 10 | Lunar Palace 1: **97% de cierre** de ciclo, 105 días, con animal + microorganismo + planta | Precedente y causa raíz |
| 11 | ECLSS: ppCO₂ ≤**3 mmHg**; polvo marciano <**0.3 mg/m³**; HEPA ≥**99.97% @0.3 µm**; sueño **NC-40** | Relevancia técnica |
| 12 | Agua potable mínima: **2.5 L/tripulante/día** `[V2 Tabla 6.3-1]` | Por qué el agua de lavado debe volver |
| 13 | Chiapas: ganadería ocupa **~3 millones de ha = 33%** de la superficie; **90% extensiva** | Retorno a la Tierra |
| 14 | **72%** del cambio de uso de suelo 2000–2021 en Chiapas fue por pastizales | Retorno a la Tierra |
| 15 | **35.6%** de la degradación de suelo en Chiapas se debe a deforestación (SEMARNAT) | Retorno a la Tierra |
| 16 | Café de Chiapas: pérdidas de **25–30%** por sequía y calor extremo; **>180,000 familias** dependen | Retorno a la Tierra |
| 17 | La roya (*Hemileia vastatrix*) subió de 800 a **1,700 msnm** desde 2012 por el cambio climático | Retorno a la Tierra |

---

# PARTE IV · LAS FASES

## 6. Fase 5 — Los 5 Por Qué → causa raíz

**Declaración del problema:** una tripulación de 6 personas debe sostenerse ~730 soles sin
reabastecimiento, en un planeta cuyo suelo es estéril y tóxico.

| Nivel | Pregunta | Respuesta | Dato duro |
|---|---|---|---|
| **1** | ¿Por qué no basta con llevar la comida? | La masa es prohibitiva y los micronutrientes se degradan | 1.7–2.5 kg/persona/día → **7.4–10.9 t** para 6 personas × 730 días |
| **2** | ¿Por qué no se cultiva sobre el suelo de Marte y ya? | El regolito no es suelo: sin materia orgánica y tóxico | **0.5–1% de percloratos** (Phoenix, 2008) |
| **3** | ¿Por qué no se lleva tierra fértil o fertilizante? | Mismo problema de masa, y el fertilizante se agota | Un fertilizante enviado es un consumible finito sin segunda nave |
| **4** | ¿Por qué no basta un huerto hidropónico cerrado? | Un huerto consume nutrientes y genera residuo: no cierra el ciclo. Sin eslabón animal y microbiano, alguien tiene que traer los nutrientes de la Tierra | MELiSSA, BIOS-3 y Lunar Palace 1 cierran el ciclo **solo** integrando animal + microorganismo + planta. Lunar Palace 1: **97% de cierre** |
| **5** | **CAUSA RAÍZ** | **El problema no es la falta de suelo: es la falta de un ciclo. En Marte no falta materia — falta la circulación que convierte residuo en recurso. Un suelo fértil no es una sustancia que se transporta: es un proceso que se mantiene en marcha.** | |

> **Frase de cierre que pide la guía:** *"El problema real es que no se puede transportar
> fertilidad, y ocurre porque la fertilidad no es un material sino un ciclo biológico en
> movimiento. Lo sabemos porque los tres únicos sistemas del mundo que han cerrado el ciclo
> —BIOS-3, MELiSSA y Lunar Palace 1— solo lo lograron al conectar animal, microorganismo y planta;
> ninguno lo logró con plantas solas."*

**Stakeholders afectados:** tripulación de 6 · agencia espacial (masa de lanzamiento) ·
ganaderos y cafeticultores de Chiapas · comunidades rurales sin saneamiento ni laboratorio.

**Soluciones existentes y su límite:** ECLSS de la ISS (98% de agua, pero físico-químico y con
repuestos constantes) · MOXIE (solo O₂, consume electricidad) · MELiSSA (compartimentos separados
unidos por bombas) · BIOS-3 y Lunar Palace 1 (cierran el ciclo, pero sin rotación de sustrato ni
tratamiento de percloratos).

**Criterios de éxito:** el sistema opera 730 soles sin reabastecimiento · cubre la fracción fresca
y de micronutrientes · trata el 100% del residuo orgánico · se mueve con su propia energía ·
cumple los límites ECLSS citados en §2.2.

---

## 7. Entregable 4 — Por qué si falla una parte, falla todo

**No es una cadena. Es un anillo.** Una cadena rota deja dos trozos utilizables; un anillo roto
deja de girar.

```
        codornices ──estiércol──► larvas ──frass──► biodigestor
             ▲                      │                    │
             │                      │              biogás│digestato
        proteína                    │                    ▼
             │                      └──── rastrojo ◄── CULTIVO
             └──────────────────────────────────────────┘
```

| Si falla… | Qué pasa | En cuántos soles |
|---|---|---|
| **Las codornices** | Sin estiércol en S2 → las larvas se quedan sin sustrato → el digestor pierde carga → sin biogás → sin colchón térmico → la primera noche marciana sin respaldo mata el cultivo | **≈30–40 soles** hasta la cascada completa |
| **Las larvas** | El estiércol se acumula → el NH₃ sube y compromete los límites SMAC `[6050]` → **y** las codornices pierden su proteína → mueren. Falla en las dos direcciones a la vez | **≈16 soles** para el primer efecto |
| **El biodigestor** | Sin biogás (sin colchón térmico) **y** sin tratar la salmuera → el perclorato no se destruye → el agua de lavado no se reincorpora → se gasta agua potable en lavar regolito, comprometiendo los 2.5 L/tripulante/día | **≈24 soles** |
| **El cultivo** | Sin rastrojo para larvas ni digestor **y** sin la fotosíntesis que compensa el CO₂ de las aves **y** desaparece el principal mitigante psicológico del riesgo BMed | Inmediato en el aire; ~8 soles en la cadena |

> **La frase para el jurado:** *"Nuestro sistema no tiene un punto único de falla — tiene un punto
> único de éxito. Cada organismo es, al mismo tiempo, el residuo de otro y el alimento de un
> tercero. Por eso no se puede diseñar una parte sin diseñar las tres: en un anillo, quitar un
> eslabón no lo acorta, lo detiene."*

---

## 8. Fase 6 — Lienzo Canvas

| Bloque | Contenido |
|---|---|
| **Propuesta de valor** | El único subsistema de soporte vital que **se alimenta de su propia basura**: convierte residuo orgánico y regolito tóxico en alimento fresco, abono, energía térmica de emergencia y agua declorada — sin reabastecimiento y sin partes críticas irreemplazables |
| **Segmento de clientes** | **Marte:** tripulación de 6 en misión de 730 soles. **Tierra:** ganaderos de pequeña escala en Chiapas; granjas avícolas y porcícolas con problema de efluentes; cafeticultores en transición agroecológica; comunidades sin red eléctrica ni laboratorio de agua |
| **Relación con clientes** | Autónoma y autorregulada. Intervención humana ~30 min/sol (traslado de bandeja, cosecha, alimentación). La red MFC alerta; el musgo da el go/no-go visual |
| **Canales** | Marte: módulo cilíndrico de ~10 m² de bandejas integrado al hábitat. Tierra: kit modular transferido vía UNACH, INIFAP, cooperativas cafetaleras y programas de ganadería sostenible ya operando en Chiapas |
| **Actividades clave** | Mantenimiento del inóculo microbiano; cría de líneas rotativas de codorniz; control ECLSS del aviario; calibración de la red MFC; registro del ciclo de bandejas |
| **Recursos clave** | Parvada fundadora (4 líneas); colonia de *H. illucens*; cepas del cóctel; *S. caninervis*; simulante de regolito; carrusel; biodigestor de 2 cámaras; filtración HEPA |
| **Socios clave** | UNACH (biotecnología, agronomía, arquitectura); NASA/OSMED (NASA-STD-3001); FAO (biodigestores); ECOGAN Chiapas y The Nature Conservancy; cooperativas cafetaleras del Soconusco |
| **Estructura de costos** | Marte: masa de lanzamiento del hardware + parvada fundadora + inóculos. **El sistema se paga si evita >1 t de las 7.4–10.9 t de alimento.** Tierra: biodigestor familiar de bajo costo + malla de codornices + cultivo iniciador de larvas |
| **Ingresos / financiamiento** | Marte: ahorro de masa de lanzamiento. Tierra: venta de huevo y harina de larva como sustituto de alimento balanceado importado; ahorro en fertilizante; bonos de carbono por reconversión de ganadería extensiva a rotacional |

---

## 9. Fase 8 — El retorno a la Tierra: Chiapas

### 9.1 El argumento que cierra el círculo

> La ganadería extensiva ocupa **~3 millones de hectáreas, el 33% de Chiapas**, y el **90%** es
> extensiva. El **72%** del cambio de uso de suelo entre 2000 y 2021 fue para abrir pastizales.
> El **35.6%** de la degradación del suelo del estado viene de esa deforestación.
>
> **El animal no es el problema. La ausencia de rotación es el problema.** Un rebaño que nunca se
> mueve agota; un rebaño que rota regenera. Chiapas tiene el ganado y tiene la tierra; lo que
> perdió fue el ritmo.
>
> Tuvimos que diseñar un hábitat en Marte —donde no cabe ni una vaca ni un potrero— para
> redescubrir que la variable crítica nunca fue el espacio: era **el descanso**.

### 9.2 Transferencia, subsistema por subsistema

| En Marte | En Chiapas | Problema oficial que ataca |
|---|---|---|
| Carrusel con descanso obligatorio de 56 soles | **Pastoreo rotacional y silvopastoril** con potreros y tiempos de descanso calculados | 33% de la superficie bajo ganadería, 90% extensiva; 72% del cambio de uso de suelo |
| Biodigestor de dos cámaras | **Biodigestor familiar** en granja avícola/porcícola: gas para cocinar (sustituye leña) + biol como fertilizante | Residuos de granja contaminando el agua; deforestación por leña |
| Larva BSF sobre estiércol de codorniz | **Harina de larva** con el propio estiércol de la granja, sustituyendo alimento balanceado importado | Costo del alimento — el mayor gasto del pequeño productor |
| Cóctel microbiano + policultivo estratificado | **Milpa mejorada e inoculación biológica** para recuperar potreros degradados y suelos acidificados | Degradación severa de la superficie agrícola |
| *Syntrichia* como costra de cierre | **Cubierta viva anti-erosión** en taludes y potreros en descanso | Erosión tras la roza-tumba-quema |
| Red de biosensores MFC | **Alarma de calidad de agua de costo casi nulo y sin reactivos** para comunidades sin laboratorio | Vertidos de granja sin monitoreo |
| Resiliencia por desfase | **Escalonamiento de siembra** frente a un calendario climático que dejó de ser predecible | Café: pérdidas de 25–30%; roya de 800 a 1,700 msnm; **>180,000 familias** |

### 9.3 ODS — dónde aplica y dónde no

*(La guía exige explicar ambas cosas: "expliquen en qué aplica y en qué no".)*

| ODS | **Dónde SÍ aplica** | **Dónde NO aplica** |
|---|---|---|
| **2 · Hambre cero** | Produce proteína fresca (huevo, larva) y micronutrientes en el punto de consumo, sin cadena de frío ni transporte | No sustituye la producción de calorías básicas: 6 m² no alimentan a 6 personas ni a una familia. Es complemento nutricional, no seguridad alimentaria completa |
| **6 · Agua limpia y saneamiento** | Trata efluentes de granja que hoy llegan crudos a los ríos; recupera el agua de lavado; la red MFC vigila sin laboratorio | No potabiliza. No sustituye infraestructura municipal de tratamiento |
| **7 · Energía asequible y no contaminante** | Biogás para cocinar en comunidad rural sustituyendo leña — impacto directo en salud respiratoria y en deforestación | La escala es doméstica. No aporta a la red eléctrica ni sustituye generación centralizada |
| **12 · Producción y consumo responsables** | Convierte el 100% del residuo de granja en insumo; elimina la compra de alimento balanceado y fertilizante sintético | Requiere cambio de práctica y capacitación: no es una tecnología que se instala y se olvida |
| **15 · Vida de ecosistemas terrestres** | Ataca la causa raíz de la degradación —ganadería sin rotación— y reduce la presión de apertura de nuevos pastizales | No revierte deforestación consumada ni recupera biodiversidad perdida. Frena el avance; no restaura el pasado |

---

## 10. Fase 7 — Cómo construir el prototipo en 45 minutos

**Qué debe comunicar sin que nadie lo explique:** que **gira**, y que lo que sale de una estación
entra en la siguiente.

**Materiales:** dos discos de cartón (Ø ~50 cm y Ø ~30 cm), un tornillo o palillo central que
permita girarlos **de verdad**, tapas de plástico o vasitos como bandejas, plastilina, palillos,
estambre de colores, etiquetas.

1. **Disco pequeño = anillo interior.** 8 sectores rotulados: `S1 LAVADO · S2 CODORNIZ ·
   S3 LARVAS · S4 DESCANSO · S5 MUSGO · S6 · S7 · S8`. Una tapita en cada uno.
2. **Disco grande = anillo exterior.** 12 sectores con tapitas: bandejas en distintas etapas
   (siembra, crecimiento, cosecha), con plantitas de plastilina de tamaños distintos para que
   **el desfase se vea a simple vista**.
3. **Cúpula sobre S2:** jaulita de palillos con codornices de plastilina y rejilla que deja caer
   sobre la bandeja de abajo.
4. **Base = biodigestor:** caja o botella partida en dos cámaras rotuladas
   `A · ANÓXICA ClO₄⁻→Cl⁻+O₂` y `B · METANOGÉNICA → BIOGÁS`.
5. **Estambre de colores para los flujos** (esto gana la foto): café = estiércol · verde =
   frass/abono · azul = agua/salmuera · rojo = biogás · amarillo = proteína.
   **Cierra el bucle amarillo de vuelta al aviario** — que se vea el anillo.
6. **LED o punto rojo** en cada trasvase, rotulado `MFC`.
7. **Gíralo delante del jurado.** Ese gesto de tres segundos comunica la propuesta entera.

> Fotografía los **bocetos previos y las versiones descartadas**: la guía lo pide explícitamente
> para el Documento Concepto y cuenta en el criterio 4 (Culminación).

---

## 11. Fase 9 — Guion de 5 minutos

**[0:00–0:30] Apertura**
> "Para mantener vivas a seis personas dos años en Marte hay que lanzar entre **siete y once
> toneladas** de comida. Y aun así, al mes veinte, la tripulación no tendría hambre — tendría
> escorbuto. Las vitaminas se degradan mucho antes de que se acabe la despensa."

**[0:30–1:15] Problema con datos**
> "La respuesta obvia es cultivar. Pero el suelo de Marte no es suelo: no tiene materia orgánica y
> contiene entre **0.5 y 1% de percloratos** — sal tóxica, confirmada por la sonda Phoenix en 2008.
> Preguntamos cinco veces por qué, y la causa raíz nos sorprendió: **la fertilidad no es un
> material que se transporta. Es un ciclo que se mantiene girando.** Los únicos tres sistemas del
> mundo que han cerrado ese ciclo —BIOS-3, MELiSSA y Lunar Palace 1— lo lograron conectando animal,
> microorganismo y planta. Ninguno lo logró con plantas solas."

**[1:15–2:45] La solución**
> "Presentamos **MILPA-360**. En la Tierra, el pastoreo rotacional funciona porque el animal se va
> y el suelo descansa. En Marte no hay a dónde ir. Así que invertimos el problema: **fijamos al
> animal y rotamos el suelo.**
>
> *(girar el prototipo físico — y, si hay pantalla, el simulador en la misma pose)*
>
> Ocho bandejas giran bajo un aviario de codornices. Cada bandeja recibe estiércol fresco y luego
> no lo vuelve a recibir en **56 soles**: ese es el descanso. Larvas de mosca soldado negra
> procesan ese estiércol y se convierten en la proteína que vuelve al comedero de las codornices.
> El bucle se cierra solo.
>
> Lo que las larvas no procesan va a un biodigestor que hace biogás y abono. Y ahí está nuestra
> aportación: **ese biodigestor es también nuestro reactor de percloratos.** No intentamos limpiar
> el suelo tóxico — lo lavamos, y metemos la salmuera a la cámara anaerobia. Las bacterias
> reductoras de perclorato necesitan exactamente dos cosas: cero oxígeno y materia orgánica.
> **El digestor ya era las dos.** El perclorato se convierte en sal inerte, y la enzima que cierra
> la reacción libera oxígeno de propina. Dos residuos que se anulan entre sí."

**[2:45–3:30] El prototipo y la resiliencia**
> "El abono y el calor van al anillo de cultivo: camote, leguminosa y rábano — una milpa escalonada.
> La cierra un musgo del desierto, *Syntrichia caninervis*, que en 2024 se demostró que **regenera
> al 100% tras exponerse a condiciones marcianas simuladas** y aguanta 5,000 Gy de radiación. Ese
> musgo es nuestro semáforo: si el musgo verdea, la bandeja es segura.
>
> ¿Y si viene una tormenta de polvo de tres semanas? Doce bandejas en doce etapas distintas. Se
> pierden las expuestas, no la cosecha. **Redundancia que no pesa** — la única que puedes
> permitirte cuando no hay segunda nave."
>
> *(lanzar la tormenta en el simulador y dejar el número en pantalla: **25 % frente a 100 %**.
> No lo expliques — el número lo explica. Son diez segundos y contesta la pregunta que el jurado
> iba a hacer.)*

**[3:30–4:00] Viabilidad**
> "Tres razones. Una: cada organismo ya existe y está caracterizado — no inventamos biología.
> Dos: el sistema **se mueve con su propia basura**, 2.9 kWh al día; no compite por la energía de
> la misión, la libera. Tres: cumple NASA-STD-3001 — aviario a presión negativa con HEPA al 99.97%,
> y aislamiento acústico, porque las codornices cantan y la norma de zonas de sueño es NC-40.
> Sí, lo revisamos."

**[4:00–5:00] Retorno a la humanidad**
> "Y aquí es donde esto deja de ser sobre Marte.
>
> La ganadería ocupa **el 33% de Chiapas** y el **90%** es extensiva. El **72%** del cambio de uso
> de suelo en veinte años fue para abrir pastizales. El **35.6%** de la degradación del suelo viene
> de ahí. Mientras tanto, el café pierde **entre 25 y 30%** de la cosecha y la roya subió de 800 a
> **1,700 metros** de altitud. Son **180,000 familias**.
>
> El animal nunca fue el problema. **La ausencia de rotación fue el problema.**
>
> Tuvimos que diseñar para un planeta donde no cabe una vaca para volver a entender que la variable
> crítica nunca fue el espacio: era el descanso. Lo que traemos de Marte no es tecnología nueva.
> Es el ritmo que aquí se nos olvidó.
>
> **No construimos un huerto para escapar de la Tierra. Construimos Marte para acordarnos de cómo
> se cuida un suelo.**"

---

## 12. Fase 10 — Las cuatro preguntas de plataforma

**1. ¿Cuál es el problema y por qué es importante?**
Una tripulación de seis personas debe sostenerse ~730 soles sin reabastecimiento. Llevar toda la
comida cuesta entre 7.4 y 11 toneladas, y aun así los micronutrientes se degradan antes del
regreso. Cultivar en Marte tampoco es opción directa: el regolito no tiene materia orgánica y
contiene 0.5–1% de percloratos tóxicos. La causa raíz no es la falta de suelo, es la falta de un
ciclo: la fertilidad no se transporta, se mantiene girando.

**2. ¿Cuál es su solución y cómo funciona?**
MILPA-360: un carrusel de bandejas de sustrato que gira bajo estaciones biológicas fijas.
Codornices depositan estiércol sobre cada bandeja en turno; larvas de mosca soldado negra lo
convierten en abono y en proteína que regresa al comedero de las codornices; el resto va a un
biodigestor de dos cámaras que produce biogás y abono líquido, y que en su cámara anóxica destruye
los percloratos del agua de lavado del regolito. Ese abono y esa energía sostienen un policultivo
escalonado protegido por un musgo extremófilo que además funciona como indicador de seguridad del
sustrato.

**3. ¿Qué hace diferente a su solución?**
Cuatro cosas que no hemos encontrado combinadas en ningún sistema existente:
**(a) La rotación invertida** — MELiSSA, BIOS-3 y Lunar Palace 1 mantienen compartimentos fijos
conectados por bombas; aquí el sustrato *es* la banda transportadora y el descanso está garantizado
por geometría, no por procedimiento.
**(b) El biodigestor como reactor de percloratos** — dos residuos que se anulan: el residuo
orgánico es exactamente el donador de electrones que la reducción de perclorato necesita, y la
anoxia ya estaba ahí gratis.
**(c) La MFC degradada de batería a sistema nervioso** — biosensor autoalimentado que distingue
toxicidad de falta de carga orgánica, con consumo cero.
**(d) La resiliencia por desfase** — redundancia obtenida de la geometría, sin masa adicional.

**4. ¿Por qué su solución es viable?**
**(1) No inventamos biología:** los seis organismos están caracterizados y publicados —
regeneración del 100% de *S. caninervis* tras condiciones marcianas simuladas, 44–82% de reducción
de residuo por larvas de *H. illucens*, primer huevo de codorniz a los 40 días, 97% de cierre de
ciclo en Lunar Palace 1.
**(2) Es energéticamente autosuficiente:** ~2.9 kWh/día de biogás propio mueven el carrusel y dan
colchón térmico de emergencia; no compite por la energía del hábitat.
**(3) Cumple normativa real:** el diseño se ajusta a los límites de NASA-STD-3001 Vol. 2 Rev. E en
particulado, calidad microbiana del aire, CO₂ y acústica — que es donde fallan las propuestas que
meten animales en un hábitat sin pensarlo.

---

## 13. Limitaciones declaradas

La guía premia la **validez**, y un jurado técnico detecta la sobreventa al instante. Declararlas
nos hace creíbles:

1. **No es autosuficiencia alimentaria.** ~6 m² de cultivo no alimentan a seis personas. El
   objetivo declarado es cubrir la fracción fresca, los micronutrientes y una fuente de proteína
   viva — no las calorías base.
2. **El O₂ de la reducción de perclorato es un coproducto, no soporte vital.**
3. **El biogás no alimenta el hábitat.** Alimenta al propio módulo y da autonomía térmica de
   emergencia.
4. **Los primeros ensayos deben usar simulante de regolito, no regolito real**, con protocolo de
   seguridad.
5. **El frass no es fertilizante listo para usar.** Requiere caracterización de nutrientes, sales y
   contaminantes antes de aplicarse.
6. **Cuello de botella genético de la parvada** en 8 relevos: se mitiga con cuatro líneas
   familiares en cruce rotativo.
7. **Bioseguridad de contaminación cruzada:** vertebrados, insectos y consorcios microbianos en un
   volumen cerrado exigen barreras y cuarentena entre estaciones.
8. **La gravedad marciana (0.38 g) no está validada** para el desarrollo de codornices ni para la
   sedimentación en el biodigestor. Es la incógnita más grande del diseño y se declara como tal.

> Los puntos 4 y 5 provienen del documento original del equipo, que ya los advertía correctamente.
> Se conservan íntegros.

---

# PARTE V · OPERACIÓN

## 14. Checklist de entregables y agenda del Día 2

### 14.1 Los tres entregables

| Entregable | Se sube en | Estado | Contenido requerido |
|---|---|---|---|
| 🔧 **Prototipo Esquemático** | Fase 7 | ☐ | Fotos del carrusel desde varios ángulos + **bocetos y versiones descartadas** |
| 🎤 **Presentación del Proyecto** | Fase 9 (borrador) · Fase 11 (definitivo) | ☐ | **Video de 5 min OBLIGATORIO** + diapositivas |
| 📄 **Documento Concepto** | Fase 10 | ☐ | Fotos del trabajo físico, ideas descartadas y por qué, retroalimentación recibida y cómo se aplicó, lo que aprendió el equipo |

### 14.2 Fases y su registro

| Fase | Qué se registra en plataforma | Fuente en este documento |
|---|---|---|
| 1 · Fortalezas | Fortalezas y áreas de cada integrante | `FASE-1-FORTALEZAS.md` |
| 2 · Roles y nombre | Nombre, eslogan, roles asignados | §3 |
| 3 · Diálogo de ideas | Lluvia de ideas + idea ganadora | `FASE-3-IDEAS.md` |
| 4 · Empatía | Mapa Dice/Piensa/Hace/Siente de **un astronauta concreto** | Definir nombre, edad, rol y situación |
| 5 · Problema | 5 Por Qué, causa raíz, stakeholders, soluciones existentes, criterios de éxito | §6 |
| 6 · Canvas | 9 bloques + solución en una frase | §8 |
| 7 · Prototipo | Tipo, descripción y **fotos (obligatorio)** | §10 |
| 8 · Retorno a la Tierra | Impacto terrestre + ODS con justificación | §9 |
| 9 · Historia | Guion + **video (campo obligatorio)** | §11 |
| 10 · Q&A | Las 4 preguntas + Documento Concepto | §12 |
| 11 · Perfeccionamiento | Aplicar feedback del jurado, subir video definitivo | — |
| 12 · Final | Semifinal por aulas + final ante jurado | — |

### 14.3 Agenda Día 2 (9 de septiembre)

| Horario | Actividad |
|---|---|
| 08:00–09:00 | Registro |
| **09:00–10:30** | **Fase 11 · Retoma y perfeccionamiento** (pitch y diapositivas) — 90 min |
| **10:30–12:00** | **Semifinal por aulas** — 24 equipos, 7 aulas, **15 min por equipo** |
| 12:00–12:30 | Selección de finalistas · Break |
| 12:30–13:00 | Resultados y preparación de la final |
| **13:00–13:30** | **FINAL** — 3 finalistas, **5 min de pitch** |
| 13:30–14:00 | Deliberación |
| 14:00–14:30 | Premiación y clausura |

### 14.4 Advertencias operativas

- ⚠️ **Cada apartado de la plataforma tiene su propio botón de Guardar.** Si no guardas antes de
  salir, los cambios se pierden. Responsable: María Fernanda.
- ⚠️ **El video es obligatorio** en presencial y virtual. Borrador en Fase 9, definitivo en Fase 11.
- ⚠️ La Fase 11 **no es visible en la plataforma**: los cambios se hacen regresando a cada fase.
- ⚠️ Se puede volver a cualquier fase ya activa para editar antes del cierre.

---

## 15. Fuentes

**Documentos oficiales del reto** (en este repositorio)
- `EL RETO .pdf` — elemento TIERRA, misión de ~2 años, 7 desafíos específicos
- `El Reto Mars Challenge 2026 UNACH (1).pdf` — **Reto Unificado**, tres componentes obligatorios, retorno a Chiapas
- `Guia Participante Mars Challenge 2026 FINAL.docx (4).pdf` — 12 fases, 3 entregables, rúbrica de 9 criterios, Anexos A–D
- `ECLSS Requirements Mars Habitat 2026.pdf` — NASA-STD-3001 Vol. 2 Rev. E (Erik Antonsen, OSMED)
- `Programa RMU2026.pdf` — agenda de los dos días
- `Mars Challenge Human Habitation 2026.pdf`

**Literatura consultada**
- Li *et al.* (2024), *The Innovation* — https://www.cell.com/the-innovation/fulltext/S2666-6758(24)00095-X
- Fu *et al.* (2016), *Astrobiology* — https://pubmed.ncbi.nlm.nih.gov/27912029/
- Dong *et al.* (2017), Lunar Palace-1, *Astrobiology* — https://doi.org/10.1089/ast.2016.1466
- "Potential Biological Remediation Strategies for Removing Perchlorate from Martian Regolith" — https://www.researchgate.net/publication/354174712
- Coker *et al.* (2026), *Soil Science Society of America Journal* — https://acsess.onlinelibrary.wiley.com/doi/10.1002/saj2.70201
- "Perchlorates on Mars", *Icarus* — https://www.sciencedirect.com/science/article/pii/S0019103524003063
- "Waste reduction and bioconversion of quail, chicken and pig manure by black soldier fly", *Philippine Journal of Science* — https://philjournalsci.dost.gov.ph/wp-content/uploads/2024/04/waste-reduction-and-bioconversion-of-quail-chicken-and-pig-manure-by-black-soldier-fly_.pdf
- "Frass derived from black soldier fly larvae treatment of biodegradable wastes", *Waste Management* — https://www.sciencedirect.com/science/article/pii/S0956053X22000666
- "Microbial fuel cell sensors for water quality early warning systems", *Renew. Sustain. Energy Rev.* — https://www.sciencedirect.com/science/article/abs/pii/S1364032117310420
- "Recent advances in microbial fuel cell–based self-powered biosensors" (2024) — https://link.springer.com/article/10.1007/s00216-024-05230-y
- FAO, *Guía teórico-práctica sobre el biogás y los biodigestores* — https://www.fao.org/3/ca5082es/ca5082es.pdf
- "Comportamiento productivo (fase de postura) de la codorniz" — https://repositorio.unas.edu.pe/items/4346288a-0eaf-48e6-8192-2d9417087d11
- "Edad al primer huevo en codorniz japonesa" — https://ve.scielo.org/scielo.php?script=sci_arttext&pid=S0798-22592009000200012
- NASA, *Astronaut Mass Balance for Long Duration Missions* — https://ntrs.nasa.gov/api/citations/20190027563/downloads/20190027563.pdf

**Datos de Chiapas**
- "Ganadería extensiva, el cáncer ambiental en Chiapas", *Alerta Chiapas* (2026) — https://alertachiapas.com/2026/05/29/ganaderia-extensiva-el-cancer-ambiental-en-chiapas/
- SEMARNAT, *Informe del Medio Ambiente*, cap. 3 — https://apps1.semarnat.gob.mx:8443/dgeia/informe15/tema/cap3.html
- CONABIO, *Degradación del suelo en la República Mexicana 1:250,000* — http://geoportal.conabio.gob.mx/metadatos/doc/html/degra250kgw.html
- "Pérdidas del 25% al 30% en la cosecha de café en Chiapas", BHRRC — https://www.business-humanrights.org/es/latest-news/m%C3%A9xico-p%C3%A9rdidas-en-la-cosecha-de-caf%C3%A9-en-chiapas-por-sequ%C3%ADa-y-temperaturas-extremas/
- "La roya y el futuro del café en Chiapas", *Sociedad y Ambiente* — https://www.scielo.org.mx/scielo.php?script=sci_arttext&pid=S0188-25032019000200389
- TNC, *ECOGAN Chiapas: ganadería sostenible* — https://www.tncmx.org/que-hacemos/recursos/historias-destacadas/ecogan-chiapas-ganaderia-sostenible/

---

**Equipo BioMars Chiapas** · *Sembrando vida, reciclando el futuro.*
Mars Challenge 2026 · UNACH · Chiapas, México
