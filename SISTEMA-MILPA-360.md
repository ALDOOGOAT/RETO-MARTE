> **REGISTRO HISTÓRICO DEL HACKATHON · NO USAR COMO DEFENSA VIGENTE.**
> Esta versión conserva el proceso anterior a P0–P2. Sus cifras de dos anillos,
> 730 soles, 2.9 kWh/d, inocuidad por musgo y pérdidas prefijadas están superadas.
> Diseño vigente: [P1](docs/madrid/P1-INGENIERIA.md),
> [P2](docs/madrid/P2-GEOMETRIA.md), [checkpoint](docs/madrid/ESTADO.md).
> Se conserva la rotación del sustrato bajo estaciones fijas. La novedad es una
> hipótesis que requiere comparación con antecedentes, no una patente demostrada.

# SISTEMA MILPA-360
### Módulo Integrado de **L**arvas, **P**ostura y **A**gricultura en rotación de 360°

**Equipo BioMars Chiapas** · Mars Challenge 2026 · Elemento TIERRA · Reto Unificado UNACH
*"Chiapas perdió su suelo por dejar de rotar. Fuimos a Marte a redescubrir la rotación."*

---

## 0. La idea en una frase

> **En Marte no puedes mover el rebaño, así que mueves el suelo:** un carrusel de bandejas de
> regolito que gira bajo estaciones biológicas fijas — codornices, larvas, biodigestor, musgo,
> cultivo — de modo que cada porción de suelo recibe pastoreo intenso, descanso obligatorio y
> siembra en una secuencia que nunca se detiene. Es el pastoreo rotacional de Chiapas,
> invertido y comprimido en 10 m².

---

## 1. Verificación contra el reto (léelo primero)

El Reto Unificado UNACH **no permite resolver una sola parte**. Esta es la trazabilidad literal:

| Exigencia oficial | Cómo la cumple MILPA-360 | Sección |
|---|---|---|
| **Parte 1** · Animales que recuperan el suelo en espacio pequeño y controlado, **movidos de forma rotativa** para que el estiércol fertilice **sin agotar el terreno** | Codorniz japonesa + larva de mosca soldado negra. La rotación existe, pero **gira el sustrato, no el animal**: 8 bandejas × 8 soles = descanso obligatorio de 56 soles entre deposiciones | §4.1 |
| **Parte 2** · Mecanismo que tome el **100%** de esos residuos y produzca **energía (biogás) + abono** | Biodigestor anaerobio de dos cámaras. Coproducto exclusivo: la cámara anóxica es también el **reactor de percloratos** | §4.2 |
| **Parte 3** · Usar esa energía y ese abono para un cultivo **estable pese al clima extremo**, con sensores baratos, policultivo resistente o riego eficiente | Biogás → colchón térmico; digestato → riego; policultivo escalonado + musgo extremófilo + red de biosensores MFC de costo casi nulo | §4.3 |
| **Regla clave** · Las tres partes encadenadas; si una falla, falla todo | Cascada documentada con tiempos en soles | §7 |
| **Entregable 4** · Explicación simple de por qué si falla una parte falla todo | Diagrama de dependencia circular | §7 |
| **El retorno a la Tierra** · Ganadería que degrada, residuos de granja que contaminan, café y maíz golpeados por el clima | Los tres subsistemas se transfieren 1:1 a Chiapas | §9 |
| **Criterio 9 · Retorno a la humanidad** | 5 ODS con justificación de dónde aplica y dónde no | §9.3 |

---

## 2. La restricción que casi nadie lee: **el reloj de los 2 años**

Las bases lo dicen dos veces (`EL RETO .pdf` §1 y Guía del Participante, Anexo A):

> *"La misión es de ida y vuelta y dura aprox. 2 años, no porque vivan 2 años en Marte, sino
> porque las mejores 'ventanas' de viaje entre la Tierra y Marte no ocurren todo el tiempo."*

**Esto no es un dato de color: es la especificación de diseño.** Significa cuatro cosas que
cambian por completo la solución:

1. **Cero reabastecimiento.** No hay una segunda nave. Lo que no se produce, no existe.
2. **Todo consumible se dimensiona a ~730 soles.** Un sistema que funciona 6 meses y colapsa
   es un fracaso de misión, no un prototipo perfectible.
3. **Los organismos deben reproducirse dentro de la ventana**, no solo sobrevivir. Un sistema
   biológico que no cierra su ciclo reproductivo es un consumible más.
4. **La degradación de la comida almacenada es el enemigo real.** Vitaminas C, K, folato y
   tiamina se degradan en el almacenamiento. Al mes 20 la tripulación no tiene hambre: tiene
   déficit de micronutrientes. **Ese es el hueco que MILPA-360 llena.**

### 2.1 Reloj biológico del sistema vs. 730 soles

| Organismo | Ciclo | Generaciones en 730 soles | Implicación |
|---|---|---|---|
| *Coturnix japonica* (codorniz) | Primer huevo a los **40 días**; postura activa hasta ≥30 semanas | ~8 relevos de parvada | Se lleva parvada fundadora, no un año de huevo |
| *Hermetia illucens* (mosca soldado) | Huevo→prepupa ~**14 días**; ciclo completo ~45 días | ~16 | Biomasa proteica bajo demanda |
| Bandeja en anillo interior | **64 soles** | ~11 vueltas | 11 ciclos de regeneración de suelo |
| Bandeja en anillo exterior | **96 soles** | ~7 cosechas | Producción escalonada continua |
| *Syntrichia caninervis* | Regenera 100% en **30 días** tras desecación | continuo | Semáforo biológico permanente |

> **Riesgo declarado — cuello de botella genético.** Ocho relevos de parvada en dos años con una
> población fundadora pequeña producen consanguinidad. Mitigación: **cuatro líneas familiares no
> emparentadas en cruce rotativo** (líneas A×B, C×D, luego A×C, B×D…). Nótese que la solución al
> problema genético vuelve a ser *rotación*: es el mismo principio del sistema aplicado al ADN.

---

## 3. Qué cambió respecto al documento original del equipo (y por qué)

El documento base (`IDEAS-ORIGINALES-EQUIPO.md`) tiene cuatro ideas correctas y una virtud
enorme: **es honesto** — repite "debe validarse experimentalmente" en cada sección. Eso se
conserva íntegro. Lo que se corrige es el encaje con el reto:

| # | Problema del documento original | Corrección en MILPA-360 |
|---|---|---|
| 1 | **No hay animales, solo larvas.** El reto pide explícitamente animales *"movidos de forma rotativa"* cuyo *"estiércol fertilice"*. Una larva no se pastorea. | Se añade **codorniz japonesa** como vertebrado de postura. La larva deja de ser el animal y pasa a ser el **eslabón que convierte el estiércol de la codorniz en proteína para la codorniz** — que es un papel mucho más fuerte. |
| 2 | **No existe la rotación.** Es el verbo literal del reto y estaba ausente. | Es ahora la **arquitectura entera**: dos anillos concéntricos con descanso obligatorio. |
| 3 | **La MFC es una mala fuente de energía** y el propio documento lo admite ("previsiblemente pequeña"). El reto pide **biogás**. | La MFC se **degrada a batería y se asciende a sistema nervioso**: red de biosensores autoalimentados que detectan toxicidad y carga orgánica. La energía la da un **biodigestor**, como pide el reto. |
| 4 | **El perclorato queda como "objetivo experimental" flotando**, sin mecanismo. | Se le da mecanismo y lugar: **lavado del regolito → salmuera → cámara anóxica del biodigestor**, donde las bacterias reductoras de perclorato ya tienen la anoxia y el donador de electrones que necesitan. Dos residuos se anulan mutuamente. |
| 5 | *Syntrichia* aparece como "biofiltro" sin función de sistema. | Pasa a ser **costra biológica de cierre + indicador go/no-go visual**: bandeja verde = bandeja apta para siembra. Función operativa, no decorativa. |
| 6 | **Falta el reloj de 2 años.** | §2 completa. |
| 7 | Falta el retorno a Chiapas (criterio 9, peso igual al resto). | §9 completa, con datos oficiales. |

**Lo que se conserva tal cual porque estaba bien:** el cóctel microbiano (Idea 4) — *Trichoderma
harzianum*, *Pseudomonas fluorescens*, *Bacillus amyloliquefaciens*, micorrizas Glomeromicota,
*Rhizobium*, *B. subtilis* — y la "Tríada Marciana" camote + leguminosa + rábano, que es una
lectura agronómicamente correcta de la milpa mesoamericana. Ambas entran íntegras al diseño.

---

## 4. Arquitectura del sistema

```
                    ┌─────────────────────────────────┐
                    │   CÚPULA · AVIARIO DE CODORNICES │  ← Parte 1 (vertebrado)
                    │   HEPA · presión negativa        │
                    └───────────────┬─────────────────┘
                                    │ estiércol dirigido
   ANILLO INTERIOR (regeneración)   ▼   8 bandejas · 1 paso / 8 soles
   S1 lavado ─ S2 codorniz ─ S3 larvas ─ S4 DESCANSO+inóculo ─ S5 musgo
        │                        │              ▲                  │
        │ salmuera ClO4-         │ frass        │ digestato        │ bandeja lista
        ▼                        ▼              │                  ▼
   ┌────────────────────────────────────────────┴──┐   ANILLO EXTERIOR (cultivo)
   │  BIODIGESTOR DE DOS CÁMARAS                   │   12 bandejas · 1 paso / 8 soles
   │  A · anóxica: ClO4- → Cl- + O2                │   camote · leguminosa · rábano
   │  B · metanogénica: biogás CH4                 │        │
   └───────────────┬───────────────────────────────┘        │ rastrojo
                   │ biogás → colchón térmico ──────────────┘
                   │ digestato → riego
                   └── MFC-sensor en cada punto de trasvase (§4.3.3)
```

### 4.1 · PARTE 1 — El suelo lo regeneran los animales, en rotación

**La inversión conceptual.** El pastoreo rotacional funciona en la Tierra porque el animal
*se va* y el suelo descansa. En un hábitat marciano de 10 m² no hay a dónde ir. Solución:
**se fija el animal y se rota el suelo**. Ocho bandejas de 0.5 m² montadas en un anillo que
avanza una posición cada 8 soles. La bandeja que hoy recibe estiércol no vuelve a recibirlo
hasta dentro de **56 soles**. Ese intervalo *es* el descanso — el mecanismo real que el reto
exige cuando dice *"sin agotar el terreno"*.

**Estación S2 — Deposición dirigida.** El aviario está sobre el anillo. La rejilla del piso
deja caer el estiércol fresco directamente sobre la bandeja que esté en turno. Alta intensidad,
corta duración, descanso largo: *mob grazing* miniaturizado, sin pastor y sin corral eléctrico.

**Los dos animales y por qué esos.**

**a) *Coturnix japonica* — codorniz japonesa.** El vertebrado más pequeño con retorno útil:

| Parámetro | Valor | Por qué importa en Marte |
|---|---|---|
| Primer huevo | **40 días** | Cabe 8 veces en la misión; una gallina no cabría bien |
| Incubación | **16–17 días** | Recuperación rápida tras cualquier pérdida |
| Peso al nacer | 8–10 g | Masa de lanzamiento despreciable |
| Consumo | **~23 g/ave/día** | 24 aves = 552 g/día de ración |
| Tasa de postura | **~68%** | 24 hembras ≈ 16 huevos/día ≈ **11,900 huevos en la misión** |
| Peso del huevo | ~10.8 g | ~29 g de huevo/persona/día: proteína fresca real |
| Conversión alimenticia | ~3.4 | Referencia honesta para el balance de masa |

**b) *Hermetia illucens* — larva de mosca soldado negra.** No es "el animal del reto": es el
**puente que cierra el círculo del animal**. Existe literatura específica de bioconversión de
**estiércol de codorniz** por esta larva. Reduce la materia seca del residuo entre **44% y 82%**
y devuelve dos cosas: larva (proteína + lípido, ~36% de grasa en materia seca en dietas
adecuadas) que vuelve al comedero de las codornices, y **frass**, cuyo NPK es comparable al de
fertilizantes orgánicos comerciales.

> **El bucle que hay que decir en el pitch:** la codorniz produce el residuo que alimenta a la
> larva; la larva se convierte en la proteína que alimenta a la codorniz. La única entrada
> externa del bucle es la fracción de grano de la ración. **Reducir esa fracción es reducir
> masa de lanzamiento.**

**Sanidad ECLSS — el detalle que gana "relevancia técnica".** Meter aves en un hábitat presurizado
choca de frente con NASA-STD-3001 Vol. 2 Rev. E. El aviario debe ser un **volumen aislado a
presión negativa con filtración HEPA**, y por tres razones distintas:

| Límite normativo | Valor | Riesgo que introduce el aviario |
|---|---|---|
| Material particulado total `[V2 6052]` | **< 3 mg/m³** | Plumón y caspa de ave |
| Particulado respirable <2.5 µm `[V2 6052]` | **< 1 mg/m³** | Fracción fina del plumón |
| Polvo marciano `[V2 6053]` | **< 0.3 mg/m³** TWA | Regolito removido al girar el anillo |
| Calidad microbiana del aire `[V2 6059]` | HEPA **≥99.97% @ 0.3 µm** | Aerosoles del aviario y del digestor |
| Ruido en zona de sueño `[V2 6079]` | **NC-40** | **Las codornices cantan.** El aviario se aísla acústicamente o viola la norma |
| Ruido, dosis 24 h `[V2 6115]` | ≤100 (75 dBA TWA) | Compresor del digestor + motor del carrusel |
| CO₂ `[V2 6004]` | ppCO₂ ≤ **3 mmHg** (media 1 h) | Respiración animal: se compensa con la fotosíntesis del anillo exterior |

Y el contrapunto: ese mismo canto que hay que atenuar en la zona de sueño es, en la zona de
trabajo, **un mitigante documentado del riesgo BMed de la NASA** (cambios conductuales y
trastornos psiquiátricos por aislamiento prolongado). Plantas verdes, animales a los que cuidar
y sonido biológico son de los pocos estímulos no sintéticos disponibles a 22 minutos-luz de
casa. El sistema no solo alimenta: **sostiene la salud mental de la tripulación** — y eso conecta
con el desafío específico 6 de `EL RETO .pdf` ("relación emocional con la Tierra") sin costo extra.

---

### 4.2 · PARTE 2 — El biodigestor que además desactiva el veneno del planeta

Aquí está la aportación técnica más original de la propuesta.

**El problema doble.** (a) Hay que convertir el 100% del residuo en energía y abono. (b) El
regolito marciano contiene **0.5–1% de percloratos** (confirmado por la sonda Phoenix, 2008),
tóxicos para la tiroides humana y para la mayoría de los cultivos.

**Por qué la biorremediación del regolito sólido no funciona.** Una bandeja de 20 kg de regolito
contiene 100–200 g de perclorato. Ningún consorcio microbiano procesa eso en el sólido, en
tiempo de misión y en volumen de hábitat. Pretenderlo es donde la mayoría de las propuestas se
rompe ante un jurado técnico.

**La solución: no trates el sólido, trata la salmuera.** El perclorato es **altamente soluble**.
La estación S1 lava el regolito con agua reciclada; el perclorato sale casi por completo en el
agua de lavado. Ahora el problema ya no es un suelo tóxico: es **un litro de salmuera** — un
residuo líquido concentrado y manejable.

**La coincidencia que nadie está explotando.** Las bacterias reductoras disimilatorias de
perclorato (*Azospira suillum*, *Dechloromonas* spp.) necesitan exactamente dos cosas:
**ausencia de oxígeno** y **un donador de electrones orgánico**. Un biodigestor anaerobio
alimentado con estiércol y frass **es las dos cosas, gratis, de forma continua**. Nadie tiene
que construir un reactor de percloratos: ya lo construimos para hacer biogás.

La ruta enzimática es conocida y tiene un premio final:

```
ClO₄⁻ ──perclorato reductasa──► ClO₃⁻ ──► ClO₂⁻ ──clorito dismutasa──► Cl⁻  +  O₂
(veneno)                                                          (sal inerte) (oxígeno)
```

La **clorito dismutasa libera oxígeno molecular**. Es un coproducto medible del tratamiento del
veneno del planeta.

> **Honestidad obligatoria ante el jurado (y lo que nos hace creíbles):** ese O₂ es un
> *coproducto*, **no** una fuente de oxígeno para la tripulación. El documento original del
> equipo ya lo advertía y tenía razón: *"no se debe asumir que producirá oxígeno molecular en
> cantidades útiles sin evidencia experimental"*. Se reporta como métrica de eficacia del
> tratamiento, no como soporte vital.

**Arquitectura de dos cámaras** (el orden importa: la metanogénesis se inhibe con perclorato):

- **Cámara A — anóxica / dehalogenante.** Entrada: salmuera de lavado + lixiviado del frass.
  Salida: agua declorada reincorporable al ciclo + trazas de O₂. Es el filtro que protege a la B.
- **Cámara B — metanogénica.** Entrada: frass, estiércol excedente, rastrojo del anillo exterior,
  aguas negras de la tripulación. Salida: **biogás + digestato**.

**Números honestos de energía** *(estimación del equipo con parámetros de literatura, no medición)*:

| Variable | Valor usado | Fuente |
|---|---|---|
| Carga a cámara B | ~2 kg SV/día | Balance de masa del equipo |
| Rendimiento de biogás | 0.24 m³/kg (estiércol, base seca) | Guía FAO de biodigestores |
| Fracción de CH₄ | ~60% | ídem |
| Poder calorífico CH₄ | ~35.8 MJ/m³ | Estándar |
| **Resultado** | **≈ 10 MJ/día ≈ 2.9 kWh/día** | |

**Cómo se presenta esto sin exagerar — y por qué es más fuerte así:**

> 2.9 kWh/día **no alimentan un hábitat marciano**. Alimentan **el propio MILPA-360**: el motor
> del carrusel, las bombas de trasvase, la iluminación de mantenimiento y — lo crítico — un
> **colchón térmico de emergencia** para sostener el punto de consigna del módulo de cultivo
> durante una noche marciana o una tormenta de polvo global que deje los paneles solares
> inservibles.
>
> **MILPA-360 es el único subsistema de soporte vital del hábitat que se mueve con su propia
> basura.** No compite por la energía de la misión: la libera.

---

### 4.3 · PARTE 3 — Cultivo estable pese al clima extremo

#### 4.3.1 *Syntrichia caninervis* — la costra biológica y el semáforo

El musgo del desierto que en 2024 se documentó como candidato a planta pionera extraterrestre.
Datos duros publicados:

- **Regeneración del 100% en 30 días** tras exposición a condiciones marcianas simuladas
  (95% CO₂, −60 °C a 20 °C, alta radiación UV, baja presión).
- Sobrevive a **−196 °C** (nitrógeno líquido, 1 mes) y a **−80 °C durante 5 años**.
- **LD50 a radiación gamma ≈ 5,000 Gy** en estado desecado.
- Fue el primer estudio con **plantas enteras** y **directamente sobre suelo marciano simulado**,
  no en invernadero.

Dos funciones operativas en el anillo:

1. **Costra biológica de cierre.** Sella la superficie de la bandeja: retiene humedad y —dato
   ECLSS— **impide que el regolito suelto se resuspenda** al girar el carrusel, que es lo que
   pondría en riesgo el límite de 0.3 mg/m³ de polvo marciano `[V2 6053]`.
2. **Semáforo go/no-go.** El musgo es más tolerante que cualquier cultivo alimenticio. Si
   prospera, el sustrato está desintoxicado. **Bandeja verde = bandeja apta para siembra.**
   Es un test de toxicidad de suelo que no consume energía, no requiere reactivo y lo lee
   cualquier tripulante de un vistazo.

#### 4.3.2 La milpa reescrita: policultivo escalonado

Se adopta íntegra la "Tríada Marciana" del documento original, por estratificación radicular:

| Cultivo | Estrato | Ciclo | Función en el sistema |
|---|---|---|---|
| **Camote** | Profundo/medio | 90–120 d | Calorías y densidad nutricional; explora el fondo de la bandeja |
| **Leguminosa** (alfalfa / lenteja / frijol) | Superficial fijador | continuo | Fija N₂ vía *Rhizobium*; su rastrojo alimenta al digestor |
| **Rábano** | Superficial | **25–30 d** | Cosecha rápida: moral de tripulación y verificación temprana del sustrato |

Es la lógica de la milpa mesoamericana —una planta que da estructura, una que fija nitrógeno,
una que cubre el suelo— trasladada a una bandeja de 0.5 m². **El retorno a la Tierra no es una
metáfora: el sistema literalmente lleva de vuelta a Chiapas su propia agricultura, mejorada.**

**Cóctel biológico de siembra** (inyectado en la estación S4, con agua purificada):

| Organismo | Función | Por qué en Marte |
|---|---|---|
| *Rhizobium* | Nodula la leguminosa, fija N₂ | Fábrica de fertilizante que no ocupa masa |
| Micorrizas Glomeromicota | Multiplica hasta ×10 la absorción hídrica | Seguro contra fallo de riego |
| *Pseudomonas fluorescens* | Solubiliza P y Fe atrapados en el mineral | El regolito tiene P; no está disponible |
| *Bacillus amyloliquefaciens* | Tolerancia a salinidad | Trazas de perclorato tras el lavado |
| *Trichoderma harzianum* | Antagonista de hongos patógenos | Hábitat cerrado y húmedo = pudrición garantizada |
| *Bacillus subtilis* | Biofilm radicular como filtro osmótico | Protege tubérculos de sales residuales |

#### 4.3.3 Los "sensores baratos" que pide el reto: la MFC como sistema nervioso

La celda de combustible microbiana genera microvatios — inútil como batería. **Pero es un
biosensor autoalimentado excelente**, y ese es su lugar correcto en el diseño.

Su voltaje es proporcional a la actividad metabólica del consorcio. Por tanto:

- **Caída de voltaje con carga orgánica estable → hay un tóxico entrando al bucle.**
- **Caída de voltaje con carga orgánica baja → falta alimento en esa estación.**

La literatura de sistemas de alerta temprana en calidad de agua documenta que ambos escenarios
son distinguibles. Se coloca una MFC en cada punto de trasvase (S1→digestor, digestor→riego,
riego→bandeja). Resultado:

> Una red de detección de intoxicación del ciclo que **no consume ni un vatio de la misión,
> no requiere calibración con reactivos, y avisa antes de que el daño sea visible** — que es
> exactamente lo que necesitas cuando la respuesta de la Tierra tarda 22 minutos en llegar.

Es también el sensor perfecto para Chiapas: una comunidad sin laboratorio puede leer un LED.

#### 4.3.4 Resiliencia por desfase: por qué una tormenta no borra la cosecha

12 bandejas en el anillo exterior avanzan una posición cada 8 soles. En cualquier instante hay
bandejas en **todas** las etapas: recién sembradas, en crecimiento, en cosecha. Una tormenta de
polvo de tres semanas daña las bandejas expuestas en esa ventana — **no la producción entera**.

Es redundancia obtenida de la geometría, no de piezas de repuesto. En una misión sin
reabastecimiento, la redundancia que no pesa es la única que puedes permitirte.

---

## 5. Los 5 Por Qué → causa raíz (Fase 5)

**Declaración del problema:** una tripulación de 6 personas debe sostenerse ~730 soles sin
reabastecimiento, en un planeta cuyo suelo es estéril y tóxico.

| Nivel | Pregunta | Respuesta | Dato duro |
|---|---|---|---|
| **1** | ¿Por qué no basta con llevar la comida? | Porque la masa es prohibitiva y los micronutrientes se degradan | ~1.7–2.5 kg de alimento/persona/día → **~7.4 a 10.9 toneladas** para 6 personas × 730 días |
| **2** | ¿Por qué no se cultiva sobre el suelo de Marte y ya? | Porque el regolito no es suelo: no tiene materia orgánica y es tóxico | **0.5–1% de percloratos**, confirmado por Phoenix (2008) |
| **3** | ¿Por qué no se lleva tierra fértil o fertilizante? | Porque es el mismo problema de masa, y el fertilizante se agota | Un fertilizante enviado es un consumible finito en una misión sin segunda nave |
| **4** | ¿Por qué no basta con un huerto hidropónico cerrado? | Porque un huerto consume nutrientes y genera residuo: no cierra el ciclo. Sin un eslabón animal y uno microbiano, alguien tiene que traer los nutrientes de la Tierra | Los sistemas de referencia (MELiSSA, BIOS-3, Lunar Palace 1) cierran el ciclo **solo** al integrar animal + microorganismo + planta. Lunar Palace 1 alcanzó **97% de cierre** con esa integración |
| **5** | **CAUSA RAÍZ** | **El problema no es la falta de suelo: es la falta de un ciclo. En Marte no falta materia — falta la circulación que convierte residuo en recurso. Un suelo fértil no es una sustancia que se transporta: es un proceso que se mantiene en marcha.** | |

> **Frase de cierre de fase (la que pide la guía):** *"El problema real es que no se puede
> transportar fertilidad, y ocurre porque la fertilidad no es un material sino un ciclo
> biológico en movimiento. Lo sabemos porque los tres únicos sistemas del mundo que han cerrado
> el ciclo —BIOS-3, MELiSSA y Lunar Palace 1— solo lo lograron al conectar animal, microorganismo
> y planta; ninguno lo logró con plantas solas."*

---

## 6. Datos duros — tabla de respaldo para el pitch

| # | Dato | Uso en la narrativa |
|---|---|---|
| 1 | Misión de ida y vuelta ≈ **2 años**, sin reabastecimiento | Especificación de diseño |
| 2 | **7.4–10.9 t** de alimento para 6 personas si todo se lleva | El golpe de apertura |
| 3 | Regolito marciano: **0.5–1% de percloratos** (Phoenix, 2008) | "El suelo es veneno" |
| 4 | Codorniz: **primer huevo a los 40 días**, ~23 g de ración/día, postura ~68% | Viabilidad del animal |
| 5 | Larva BSF reduce **44–82%** de la materia seca del residuo | Viabilidad de la Parte 2 |
| 6 | Frass con **NPK comparable a fertilizantes orgánicos comerciales** | El abono es real |
| 7 | Biogás **0.24 m³/kg** (estiércol seco), CH₄ ~60%, ~35.8 MJ/m³ | La energía es real y modesta |
| 8 | *S. caninervis*: **100% de regeneración en 30 días** tras condiciones marcianas simuladas | La planta pionera es real |
| 9 | *S. caninervis*: **LD50 ≈ 5,000 Gy** gamma en desecación; sobrevive **−196 °C** | Resistencia a radiación |
| 10 | Lunar Palace 1: **97% de cierre**, 105 días, con animal + microorganismo + planta | Precedente y causa raíz |
| 11 | ECLSS: ppCO₂ ≤ **3 mmHg**; polvo marciano < **0.3 mg/m³**; HEPA ≥ **99.97% @0.3 µm**; sueño **NC-40** | Relevancia técnica |
| 12 | Agua potable mínima: **2.5 L/tripulante/día** `[V2 Tabla 6.3-1]` | Por qué el agua de lavado debe volver |
| 13 | Chiapas: ganadería ocupa **~3 millones de ha = 33%** de la superficie; **90% extensiva** | Retorno a la Tierra |
| 14 | **72%** del cambio de uso de suelo 2000–2021 en Chiapas fue por pastizales | Retorno a la Tierra |
| 15 | **35.6%** de la degradación de suelo en Chiapas se debe a deforestación (SEMARNAT) | Retorno a la Tierra |
| 16 | Café de Chiapas: pérdidas de **25–30%** de cosecha por sequía y calor extremo; **>180,000 familias** dependen del cultivo | Retorno a la Tierra |
| 17 | La roya (*Hemileia vastatrix*) subió de 800 a **1,700 msnm** desde 2012 por el cambio climático | Retorno a la Tierra |

---

## 7. Entregable 4 — Por qué si falla una parte, falla todo

**No es una cadena. Es un anillo.** Una cadena que se rompe deja dos trozos utilizables;
un anillo que se rompe deja de girar.

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
| **Las codornices** | Sin estiércol en S2 → las larvas se quedan sin sustrato → el digestor pierde carga → sin biogás → sin colchón térmico → la primera noche marciana sin respaldo mata el cultivo | **≈ 30–40 soles hasta la cascada completa** |
| **Las larvas** | El estiércol se acumula → el NH₃ sube y compromete los límites de contaminantes del hábitat → **y** las codornices pierden su fuente de proteína → mueren. Falla en las dos direcciones a la vez | **≈ 16 soles** para el primer efecto |
| **El biodigestor** | Sin biogás (sin colchón térmico) **y** sin tratar la salmuera → el perclorato no se destruye → el agua de lavado no puede reincorporarse → se empieza a gastar agua potable en lavar regolito, comprometiendo los 2.5 L/tripulante/día | **≈ 24 soles** |
| **El cultivo** | Sin rastrojo para larvas ni digestor **y** sin la fotosíntesis que compensa el CO₂ de las aves **y** desaparece el principal mitigante psicológico del riesgo BMed | Inmediato en el aire, ~8 soles en la cadena |

> **La frase para el jurado:** *"Nuestro sistema no tiene un punto único de falla — tiene un
> punto único de éxito. Cada organismo es, al mismo tiempo, el residuo de otro y el alimento
> de un tercero. Por eso no se puede diseñar una parte sin diseñar las tres: en un anillo,
> quitar un eslabón no lo acorta, lo detiene."*

---

## 8. Lienzo Canvas (Fase 6)

| Bloque | Contenido |
|---|---|
| **Propuesta de valor** | El único subsistema de soporte vital que **se alimenta de su propia basura**: convierte residuo orgánico y regolito tóxico en alimento fresco, abono, energía térmica de emergencia y agua declorada — sin reabastecimiento y sin partes críticas irreemplazables |
| **Segmento de clientes** | **Marte:** tripulación de 6 en misión de 730 soles. **Tierra:** ganaderos de pequeña escala en Chiapas; granjas avícolas y porcícolas con problema de efluentes; cafeticultores en transición agroecológica; comunidades sin red eléctrica ni laboratorio de agua |
| **Relación con clientes** | Autónoma y autorregulada. Intervención humana ~30 min/sol (traslado de bandeja, cosecha, alimentación). La red MFC alerta; el musgo da el go/no-go visual |
| **Canales** | Marte: integrado al hábitat como módulo cilíndrico de ~10 m² de bandejas. Tierra: kit modular transferido vía UNACH, INIFAP, cooperativas cafetaleras y programas de ganadería sostenible ya operando en Chiapas |
| **Actividades clave** | Mantenimiento del inóculo microbiano; cría de líneas rotativas de codorniz; control ECLSS del aviario; calibración de la red MFC; registro del ciclo de bandejas |
| **Recursos clave** | Parvada fundadora (4 líneas); colonia de *H. illucens*; cepas del cóctel; *S. caninervis*; simulante de regolito; carrusel; biodigestor de 2 cámaras; filtración HEPA |
| **Socios clave** | UNACH (biotecnología, agronomía, arquitectura); NASA/OSMED por la normativa NASA-STD-3001; FAO (biodigestores); ECOGAN Chiapas y The Nature Conservancy (ganadería sostenible); cooperativas cafetaleras del Soconusco |
| **Estructura de costos** | Marte: masa de lanzamiento del hardware + parvada fundadora + inóculos (estimación: el sistema se paga si evita **>1 t** de las 7.4–10.9 t de alimento). Tierra: biodigestor familiar de bajo costo + malla de codornices + cultivo iniciador de larvas |
| **Ingresos / financiamiento** | Marte: ahorro de masa de lanzamiento (métrica de valor de agencia). Tierra: venta de huevo y harina de larva como sustituto de alimento balanceado importado; ahorro en fertilizante; bonos de carbono por reconversión de ganadería extensiva a rotacional |

---

## 9. Fase 8 — El retorno a la Tierra: Chiapas

### 9.1 El argumento que cierra el círculo

Las bases lo plantean directamente: *"En Chiapas, la ganadería extensiva está degradando el
suelo, los residuos de granjas avícolas y porcícolas están contaminando el agua, y el cambio
climático ya está afectando los cultivos de café y maíz."*

**La ironía que hay que decir en voz alta:**

> La ganadería extensiva ocupa **~3 millones de hectáreas, el 33% de Chiapas**, y el **90%** de
> ella es extensiva. El **72%** del cambio de uso de suelo entre 2000 y 2021 fue para abrir
> pastizales. El **35.6%** de la degradación del suelo del estado viene de esa deforestación.
>
> El animal no es el problema. **La ausencia de rotación es el problema.** Un rebaño que nunca
> se mueve agota; un rebaño que rota regenera. Chiapas tiene el ganado y tiene la tierra;
> lo que perdió fue el ritmo.
>
> Tuvimos que diseñar un hábitat en Marte —donde no cabe ni una vaca ni un potrero— para
> redescubrir que la variable crítica nunca fue el espacio: era **el descanso**.

### 9.2 Transferencia, subsistema por subsistema

| En Marte | En Chiapas | Problema oficial que ataca |
|---|---|---|
| Carrusel de bandejas con descanso obligatorio de 56 soles | **Pastoreo rotacional y silvopastoril** con potreros y tiempos de descanso calculados | 33% de la superficie estatal bajo ganadería, 90% extensiva; 72% del cambio de uso de suelo |
| Biodigestor de dos cámaras | **Biodigestor familiar** en granja avícola/porcícola: gas para cocinar (sustituye leña) + biol como fertilizante | Residuos de granja contaminando el agua; deforestación por leña |
| Larva de mosca soldado sobre estiércol de codorniz | **Harina de larva** producida con el propio estiércol de la granja, sustituyendo alimento balanceado importado | Costo del alimento — el mayor gasto del pequeño productor |
| Cóctel microbiano + policultivo estratificado | **Milpa mejorada e inoculación biológica** para recuperar potreros degradados y suelos acidificados por agroquímicos | Degradación severa de la superficie agrícola |
| *Syntrichia* como costra de cierre | **Cubierta viva anti-erosión** en taludes y potreros degradados en descanso | Erosión tras la roza-tumba-quema |
| Red de biosensores MFC | **Alarma de calidad de agua de costo casi nulo y sin reactivos** para comunidades sin laboratorio | Vertidos de granja sin monitoreo |
| Resiliencia por desfase de cultivos | **Escalonamiento de siembra** frente a un calendario climático que dejó de ser predecible | Café: pérdidas de 25–30%; roya subió de 800 a 1,700 msnm; **>180,000 familias** afectadas |

### 9.3 ODS — dónde aplica y dónde no (la guía exige ambas)

| ODS | **Dónde SÍ aplica** | **Dónde NO aplica (honestidad)** |
|---|---|---|
| **2 · Hambre cero** | Produce proteína fresca (huevo, larva) y micronutrientes en el punto de consumo, sin cadena de frío ni transporte | No sustituye la producción de calorías básicas: 6 m² no alimentan a 6 personas ni a una familia. Es complemento nutricional, no seguridad alimentaria completa |
| **6 · Agua limpia y saneamiento** | Trata efluentes de granja que hoy llegan crudos a los ríos; recupera el agua de lavado; la red MFC vigila sin laboratorio | No potabiliza. No sustituye infraestructura municipal de tratamiento |
| **7 · Energía asequible y no contaminante** | Biogás para cocinar en comunidad rural, sustituyendo leña — con impacto directo en salud respiratoria y en deforestación | La escala es doméstica. No aporta a la red eléctrica ni sustituye generación centralizada |
| **12 · Producción y consumo responsables** | Convierte el 100% del residuo de granja en insumo; elimina la compra de alimento balanceado y de fertilizante sintético | Requiere cambio de práctica y capacitación: no es una tecnología que se instala y se olvida |
| **15 · Vida de ecosistemas terrestres** | Ataca la causa raíz de la degradación —ganadería sin rotación— y reduce la presión de apertura de nuevos pastizales | No revierte deforestación ya consumada ni recupera biodiversidad perdida. Frena el avance; no restaura el pasado |

---

## 10. Fase 7 — Cómo construir el prototipo en 45 minutos

**Qué debe comunicar sin que nadie lo explique:** que *gira*, y que lo que sale de una estación
entra en la siguiente.

**Materiales:** dos discos de cartón (Ø ~50 cm y Ø ~30 cm), un tornillo o palillo central que
permita girarlos de verdad, tapas de plástico o vasitos como bandejas, plastilina, palillos,
etiquetas.

1. **Disco pequeño = anillo interior.** Divide en **8 sectores** rotulados: `S1 LAVADO ·
   S2 CODORNIZ · S3 LARVAS · S4 DESCANSO · S5 MUSGO · S6 · S7 · S8`. Pega una tapita en cada uno.
2. **Disco grande = anillo exterior.** **12 sectores** con tapitas: bandejas de cultivo en
   distintas etapas (siembra, crecimiento, cosecha) — con plantitas de plastilina de tamaños
   distintos, para que el **desfase** se vea a simple vista.
3. **Cúpula sobre S2:** una jaulita de palillos con codornices de plastilina, con rejilla que
   deja caer sobre la bandeja de abajo.
4. **Base = biodigestor:** una caja o botella partida en dos cámaras rotuladas
   `A · ANÓXICA ClO₄⁻→Cl⁻+O₂` y `B · METANOGÉNICA → BIOGÁS`.
5. **Estambre de colores para los flujos** (esto es lo que gana la foto):
   café = estiércol · verde = frass/abono · azul = agua/salmuera · rojo = biogás · amarillo = proteína.
   **Cierra el bucle rojo/amarillo de vuelta al aviario** — que se vea el anillo.
6. **LED o punto rojo** en cada trasvase, rotulado `MFC`.
7. **Gíralo delante del jurado.** Ese gesto de tres segundos comunica la propuesta entera.

> Fotografía los **bocetos previos** y las versiones descartadas: la guía lo pide explícitamente
> para el Documento Concepto y cuenta en el criterio 4 (Culminación).

---

## 11. Fase 9 — Guion de 5 minutos

**[0:00–0:30] Apertura**
> "Para mantener vivas a seis personas dos años en Marte hay que lanzar entre **siete y once
> toneladas** de comida. Y aun así, al mes veinte, la tripulación no tendría hambre — tendría
> escorbuto. Las vitaminas se degradan mucho antes de que se acabe la despensa."

**[0:30–1:15] Problema con datos**
> "La respuesta obvia es cultivar. Pero el suelo de Marte no es suelo: no tiene materia orgánica
> y contiene entre **0.5 y 1% de percloratos** — sal tóxica, confirmada por la sonda Phoenix
> en 2008. Preguntamos cinco veces por qué, y la causa raíz nos sorprendió: **la fertilidad no
> es un material que se transporta. Es un ciclo que se mantiene girando.** Los únicos tres
> sistemas del mundo que han cerrado ese ciclo —BIOS-3, MELiSSA y Lunar Palace 1— lo lograron
> conectando animal, microorganismo y planta. Ninguno lo logró con plantas solas."

**[1:15–2:45] La solución**
> "Presentamos **MILPA-360**. En la Tierra, el pastoreo rotacional funciona porque el animal se
> va y el suelo descansa. En Marte no hay a dónde ir. Así que invertimos el problema:
> **fijamos al animal y rotamos el suelo.**
>
> *(girar el prototipo)*
>
> Ocho bandejas giran bajo un aviario de codornices. Cada bandeja recibe estiércol fresco y
> luego no lo vuelve a recibir en **56 soles**: ese es el descanso. Larvas de mosca soldado
> negra procesan ese estiércol y se convierten en la proteína que vuelve al comedero de las
> codornices. El bucle se cierra solo.
>
> Lo que las larvas no procesan va a un biodigestor que hace biogás y abono. Y ahí está nuestra
> aportación: **ese biodigestor es también nuestro reactor de percloratos.** No intentamos
> limpiar el suelo tóxico — lo lavamos, y metemos la salmuera a la cámara anaerobia. Las
> bacterias reductoras de perclorato necesitan exactamente dos cosas: cero oxígeno y materia
> orgánica. **El digestor ya era las dos.** El perclorato se convierte en sal inerte, y la
> enzima que cierra la reacción libera oxígeno de propina. Dos residuos que se anulan entre sí."

**[2:45–3:30] El prototipo y la resiliencia**
> "El abono y el calor van al anillo de cultivo: camote, leguminosa y rábano — una milpa
> escalonada. La cierra un musgo del desierto, *Syntrichia caninervis*, que en 2024 se demostró
> que **regenera al 100% tras exponerse a condiciones marcianas simuladas** y aguanta 5,000 Gy
> de radiación. Ese musgo es nuestro semáforo: si el musgo verdea, la bandeja es segura.
>
> ¿Y si viene una tormenta de polvo de tres semanas? Doce bandejas en doce etapas distintas.
> Se pierden las expuestas, no la cosecha. **Redundancia que no pesa** — la única que puedes
> permitirte cuando no hay segunda nave."

**[3:30–4:00] Viabilidad**
> "Tres razones. Una: cada organismo ya existe y está caracterizado — no inventamos biología.
> Dos: el sistema **se mueve con su propia basura**, 2.9 kWh al día; no compite por la energía
> de la misión, la libera. Tres: cumple NASA-STD-3001 — aviario a presión negativa con HEPA
> al 99.97%, y aislamiento acústico, porque las codornices cantan y la norma de zonas de sueño
> es NC-40. Sí, lo revisamos."

**[4:00–5:00] Retorno a la humanidad**
> "Y aquí es donde esto deja de ser sobre Marte.
>
> La ganadería ocupa **el 33% de Chiapas** y el **90%** es extensiva. El **72%** del cambio de
> uso de suelo en veinte años fue para abrir pastizales. El **35.6%** de la degradación del
> suelo viene de ahí. Mientras tanto, el café pierde **entre 25 y 30%** de la cosecha y la roya
> subió de 800 a **1,700 metros** de altitud. Son **180,000 familias**.
>
> El animal nunca fue el problema. **La ausencia de rotación fue el problema.**
>
> Tuvimos que diseñar para un planeta donde no cabe una vaca para volver a entender que la
> variable crítica nunca fue el espacio: era el descanso. Lo que traemos de Marte no es
> tecnología nueva. Es el ritmo que aquí se nos olvidó.
>
> **No construimos un huerto para escapar de la Tierra. Construimos Marte para acordarnos de
> cómo se cuida un suelo.**"

---

## 12. Fase 10 — Las cuatro preguntas de plataforma

**1. ¿Cuál es el problema y por qué importa?**
Una tripulación de seis personas debe sostenerse ~730 soles sin reabastecimiento. Llevar toda la
comida cuesta entre 7.4 y 11 toneladas, y aun así los micronutrientes se degradan antes del
regreso. Cultivar en Marte tampoco es opción directa: el regolito no tiene materia orgánica y
contiene 0.5–1% de percloratos tóxicos. La causa raíz no es la falta de suelo, es la falta de un
ciclo: la fertilidad no se transporta, se mantiene girando.

**2. ¿Cuál es su solución y cómo funciona?**
MILPA-360: un carrusel de bandejas de sustrato que gira bajo estaciones biológicas fijas.
Codornices depositan estiércol sobre cada bandeja en turno; larvas de mosca soldado negra lo
convierten en abono y en proteína que regresa al comedero de las codornices; el resto va a un
biodigestor de dos cámaras que produce biogás y abono líquido, y que en su cámara anóxica
destruye los percloratos del agua de lavado del regolito. Ese abono y esa energía sostienen un
policultivo escalonado protegido por un musgo extremófilo que además funciona como indicador de
seguridad del sustrato.

**3. ¿Qué la hace diferente?**
Cuatro cosas que no hemos encontrado combinadas en ningún sistema existente:
(a) **La rotación invertida** — los sistemas de referencia (MELiSSA, BIOS-3, Lunar Palace 1)
mantienen compartimentos fijos conectados por bombas; aquí el sustrato *es* la banda
transportadora y el descanso está garantizado por geometría, no por procedimiento.
(b) **El biodigestor como reactor de percloratos** — dos residuos que se anulan: el residuo
orgánico es exactamente el donador de electrones que la reducción de perclorato necesita, y la
anoxia ya estaba ahí gratis.
(c) **La MFC degradada de batería a sistema nervioso** — biosensor autoalimentado que distingue
toxicidad de falta de carga orgánica, con cero consumo.
(d) **La resiliencia por desfase** — redundancia obtenida de la geometría, sin masa adicional.

**4. ¿Por qué es viable? (3 razones)**
(1) **No inventamos biología:** los seis organismos están caracterizados y publicados —
regeneración del 100% de *S. caninervis* tras condiciones marcianas simuladas, 44–82% de
reducción de residuo por larvas de *H. illucens*, primer huevo de codorniz a los 40 días,
97% de cierre de ciclo en Lunar Palace 1.
(2) **Es energéticamente autosuficiente:** ~2.9 kWh/día de biogás propio mueven el carrusel y
dan colchón térmico de emergencia; no compite por la energía del hábitat.
(3) **Cumple normativa real:** el diseño se ajusta a los límites de NASA-STD-3001 Vol. 2 Rev. E
en particulado, calidad microbiana del aire, CO₂ y acústica — que es donde fallan las propuestas
que meten animales en un hábitat sin pensarlo.

---

## 13. Limitaciones declaradas (decirlas nos hace creíbles)

La guía premia la **validez**, y un jurado técnico detecta la sobreventa al instante. Estas
son las nuestras, y cada una tiene ruta de trabajo:

1. **No es autosuficiencia alimentaria.** ~6 m² de cultivo no alimentan a seis personas. El
   objetivo declarado es cubrir la fracción fresca, los micronutrientes y una fuente de proteína
   viva — no las calorías base.
2. **El O₂ de la reducción de perclorato es un coproducto, no soporte vital.** Se reporta como
   métrica de eficacia del tratamiento.
3. **El biogás no alimenta el hábitat.** Alimenta al propio módulo y da autonomía térmica de
   emergencia.
4. **Los primeros ensayos deben usar simulante de regolito, no regolito real**, con protocolo de
   seguridad. Esto ya estaba correctamente advertido en el documento original del equipo.
5. **El frass no es fertilizante listo para usar.** Requiere caracterización de nutrientes, sales
   y contaminantes antes de aplicarse. También estaba bien advertido en el documento original.
6. **Cuello de botella genético de la parvada** en 8 relevos: se mitiga con cuatro líneas
   familiares en cruce rotativo.
7. **Bioseguridad de contaminación cruzada:** introducir vertebrados, insectos y consorcios
   microbianos en un volumen cerrado exige barreras y protocolo de cuarentena entre estaciones.
8. **La gravedad marciana (0.38 g) no está validada** para el desarrollo de codornices ni para
   la sedimentación en el biodigestor. Es la incógnita más grande del diseño y debe declararse
   como tal.

---

## 14. Fuentes

**Documentos oficiales del reto** (en este repositorio)
- `EL RETO .pdf` — definición del reto, elemento TIERRA, misión de ~2 años, 7 desafíos específicos
- `El Reto Mars Challenge 2026 UNACH (1).pdf` — Reto Unificado, tres componentes obligatorios, retorno a Chiapas
- `Guia Participante Mars Challenge 2026 FINAL.docx (4).pdf` — 12 fases, 3 entregables, rúbrica de 9 criterios, Anexos A–D
- `ECLSS Requirements Mars Habitat 2026.pdf` — NASA-STD-3001 Vol. 2 Rev. E (Erik Antonsen, OSMED): §6.2 atmósfera, §6.3 agua, §6.6 acústica
- `Programa RMU2026.pdf` — agenda de los dos días

**Literatura consultada**
- Li *et al.* (2024), "The extremotolerant desert moss *Syntrichia caninervis* is a promising pioneer plant for colonizing extraterrestrial environments", *The Innovation* — https://www.cell.com/the-innovation/fulltext/S2666-6758(24)00095-X
- Fu *et al.* (2016), "How to Establish a Bioregenerative Life Support System for Long-Term Crewed Missions to the Moon or Mars", *Astrobiology* — https://pubmed.ncbi.nlm.nih.gov/27912029/
- Dong *et al.* (2017), "Element Cycling and Energy Flux Responses… Chinese Lunar Palace-1", *Astrobiology* — https://doi.org/10.1089/ast.2016.1466
- "Potential Biological Remediation Strategies for Removing Perchlorate from Martian Regolith" — https://www.researchgate.net/publication/354174712
- Coker *et al.* (2026), "Simple and effective remediation strategies of Martian perchlorates", *Soil Science Society of America Journal* — https://acsess.onlinelibrary.wiley.com/doi/10.1002/saj2.70201
- "Perchlorates on Mars: Occurrence and implications for putative life on the Red Planet", *Icarus* — https://www.sciencedirect.com/science/article/pii/S0019103524003063
- "Waste reduction and bioconversion of quail, chicken and pig manure by black soldier fly", *Philippine Journal of Science* — https://philjournalsci.dost.gov.ph/wp-content/uploads/2024/04/waste-reduction-and-bioconversion-of-quail-chicken-and-pig-manure-by-black-soldier-fly_.pdf
- "Frass derived from black soldier fly larvae treatment of biodegradable wastes: a critical review", *Waste Management* — https://www.sciencedirect.com/science/article/pii/S0956053X22000666
- "Black Soldier Fly: A Keystone Species for the Future of Sustainable Waste Management" — https://pmc.ncbi.nlm.nih.gov/articles/PMC12386371/
- "Microbial fuel cell sensors for water quality early warning systems", *Renewable and Sustainable Energy Reviews* — https://www.sciencedirect.com/science/article/abs/pii/S1364032117310420
- "Recent advances in microbial fuel cell–based self-powered biosensors", *Anal. Bioanal. Chem.* (2024) — https://link.springer.com/article/10.1007/s00216-024-05230-y
- FAO, *Guía teórico-práctica sobre el biogás y los biodigestores* — https://www.fao.org/3/ca5082es/ca5082es.pdf
- "Comportamiento productivo (fase de postura) de la codorniz *Coturnix coturnix japonica*" — https://repositorio.unas.edu.pe/items/4346288a-0eaf-48e6-8192-2d9417087d11
- "Edad al primer huevo en codorniz japonesa", *Rev. Científica* — https://ve.scielo.org/scielo.php?script=sci_arttext&pid=S0798-22592009000200012
- NASA, *Astronaut Mass Balance for Long Duration Missions* — https://ntrs.nasa.gov/api/citations/20190027563/downloads/20190027563.pdf

**Datos de Chiapas**
- "Ganadería extensiva, el cáncer ambiental en Chiapas", *Alerta Chiapas* (2026) — https://alertachiapas.com/2026/05/29/ganaderia-extensiva-el-cancer-ambiental-en-chiapas/
- SEMARNAT, *Informe del Medio Ambiente*, cap. 3 — https://apps1.semarnat.gob.mx:8443/dgeia/informe15/tema/cap3.html
- CONABIO, *Degradación del suelo en la República Mexicana 1:250,000* — http://geoportal.conabio.gob.mx/metadatos/doc/html/degra250kgw.html
- "Pérdidas del 25% al 30% en la cosecha de café en Chiapas", Business & Human Rights Resource Centre — https://www.business-humanrights.org/es/latest-news/m%C3%A9xico-p%C3%A9rdidas-en-la-cosecha-de-caf%C3%A9-en-chiapas-por-sequ%C3%ADa-y-temperaturas-extremas/
- "La roya y el futuro del café en Chiapas", *Sociedad y Ambiente* — https://www.scielo.org.mx/scielo.php?script=sci_arttext&pid=S0188-25032019000200389
- TNC, *ECOGAN Chiapas: ganadería sostenible* — https://www.tncmx.org/que-hacemos/recursos/historias-destacadas/ecogan-chiapas-ganaderia-sostenible/

---

*Documento maestro del equipo BioMars Chiapas. Fuente original de ideas:
[`IDEAS-ORIGINALES-EQUIPO.md`](IDEAS-ORIGINALES-EQUIPO.md). Contexto del reto:
[`CONTEXTO-RETO-MARTE.md`](CONTEXTO-RETO-MARTE.md).*
