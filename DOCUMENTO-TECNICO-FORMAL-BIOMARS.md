> **REGISTRO HISTÓRICO DEL HACKATHON · NO USAR COMO DEFENSA VIGENTE.**
> Esta versión conserva el proceso anterior a P0–P2. Sus cifras de dos anillos,
> 730 soles, 2.9 kWh/d, inocuidad por musgo y pérdidas prefijadas están superadas.
> Diseño vigente: [P1](docs/madrid/P1-INGENIERIA.md),
> [P2](docs/madrid/P2-GEOMETRIA.md), [checkpoint](docs/madrid/ESTADO.md).
> Se conserva la rotación del sustrato bajo estaciones fijas. La novedad es una
> hipótesis que requiere comparación con antecedentes, no una patente demostrada.

# DOCUMENTO TÉCNICO FORMAL
## Sistema MILPA-360 — Módulo Integrado de Larvas, Postura y Agricultura en Rotación de 360°
### Equipo BioMars Chiapas · Mars Challenge 2026 · Reto Unificado UNACH

**Versión:** 1.0 · **Fecha:** 8 de septiembre de 2026
**Evento:** The Grand Jam · Centro de Convenciones "Dr. Manuel Velasco Suárez" · Chiapas

---

## ÍNDICE

1. Resumen Ejecutivo
2. Contexto y Planteamiento del Problema
3. Investigación Científica de Respaldo
4. Diseño Integral del Sistema MILPA-360
5. Justificación Técnica del Simulador 3D
6. Análisis de Viabilidad y Normativa ECLSS
7. Análisis de Falla en Cascada
8. Retorno a la Tierra — Aplicación en Chiapas
9. Limitaciones Declaradas
10. Fuentes Bibliográficas

---

## 1. RESUMEN EJECUTIVO

MILPA-360 es un sistema biológico de ciclo cerrado diseñado para producir alimento fresco, regenerar suelo, generar energía y tratar agua dentro de un hábitat marciano de ~10 m², sin reabastecimiento externo durante los 730 soles (~2 años) de una misión tripulada. El acrónimo proviene de **M**ódulo **I**ntegrado de **L**arvas, **P**ostura y **A**gricultura en rotación de **360°**.

El principio rector es una **inversión del pastoreo rotacional**: en la Tierra, el animal se mueve y el suelo descansa; en Marte, donde no hay espacio para mover al animal, se fija el animal y se rota el suelo. Un carrusel de bandejas de regolito gira bajo estaciones biológicas fijas — codornices japonesas, larvas de mosca soldado negra, biodigestor anaerobio, musgo extremófilo y policultivo escalonado — de modo que cada porción de suelo recibe estiércol fresco, luego descansa **56 soles** antes de volver a recibirlo.

El sistema resuelve **simultáneamente** las tres partes obligatorias del Reto Unificado UNACH:

| Parte del Reto | Solución MILPA-360 |
|---|---|
| **Parte 1:** Animales que recuperan el suelo en rotación | Codorniz japonesa + larva BSF sobre carrusel rotativo con 56 soles de descanso |
| **Parte 2:** 100% del residuo → energía (biogás) + abono | Biodigestor anaerobio de 2 cámaras que además destruye percloratos |
| **Parte 3:** Cultivo estable pese al clima extremo | Policultivo escalonado + musgo extremófilo + biosensores MFC |

**Cuatro diferenciadores que ningún sistema existente combina:**
1. La rotación invertida (gira el sustrato, no el animal)
2. El biodigestor como reactor de percloratos (dos residuos que se anulan)
3. La MFC como sistema nervioso biosensor (no como batería)
4. La resiliencia por desfase (12 bandejas en 12 etapas = redundancia sin masa)

---

## 2. CONTEXTO Y PLANTEAMIENTO DEL PROBLEMA

### 2.1 Especificación de la Misión

La misión a Marte es de ida y vuelta con duración aproximada de **2 años (~730 soles)**, sin posibilidad de reabastecimiento. Las ventanas de transferencia orbital entre la Tierra y Marte ocurren cada ~26 meses, lo que significa:

- **Cero reabastecimiento.** No hay una segunda nave.
- **Todo consumible se dimensiona a 730 soles.** Un sistema que colapsa a los 6 meses es un fracaso de misión.
- **Los organismos deben reproducirse,** no solo sobrevivir. Un sistema biológico que no cierra su ciclo reproductivo es un consumible más.
- **La degradación nutricional es el enemigo real.** Las vitaminas C, K, folato y tiamina se degradan en almacenamiento. Al mes 20, la tripulación no tendría hambre: tendría déficit de micronutrientes.

### 2.2 El Problema Central

Llevar toda la comida para 6 personas durante 730 soles exigiría entre **7.4 y 10.9 toneladas** de alimento (cálculo: 1.7–2.5 kg/persona/día × 6 personas × 730 días; referencia: NASA, *Astronaut Mass Balance for Long Duration Missions*, 2019).

Cultivar directamente en el suelo marciano tampoco es opción directa:

- El regolito marciano **no tiene materia orgánica**.
- Contiene entre **0.5 y 1% de percloratos** (ClO₄⁻), sal tóxica para la tiroides humana y para la mayoría de los cultivos (confirmado por la sonda Phoenix, 2008).
- La combinación perclorato + radiación UV lo convierte en un medio **bactericida** (~10× mortalidad celular; Wadsworth & Cockell, *Nature Scientific Reports*, 2017).

### 2.3 Análisis de los 5 Por Qué — Causa Raíz

| Nivel | Pregunta | Respuesta | Dato Duro |
|---|---|---|---|
| 1 | ¿Por qué no basta con llevar la comida? | La masa es prohibitiva y los micronutrientes se degradan | 7.4–10.9 toneladas para 6 personas × 730 días |
| 2 | ¿Por qué no cultivar sobre el suelo de Marte? | El regolito no es suelo: sin materia orgánica y tóxico | 0.5–1% de percloratos (Phoenix, 2008) |
| 3 | ¿Por qué no llevar tierra fértil? | Es el mismo problema de masa; el fertilizante se agota | Un fertilizante enviado es un consumible finito sin segunda nave |
| 4 | ¿Por qué no basta un huerto hidropónico? | No cierra el ciclo: consume nutrientes y genera residuos | MELiSSA, BIOS-3 y Lunar Palace 1 cierran el ciclo solo con animal + microorganismo + planta |
| **5** | **CAUSA RAÍZ** | **La fertilidad no es un material que se transporta: es un ciclo que se mantiene en marcha.** En Marte no falta materia — falta la circulación que convierte residuo en recurso | Lunar Palace 1: **97% de cierre de ciclo** con integración biológica completa |

---

## 3. INVESTIGACIÓN CIENTÍFICA DE RESPALDO

### 3.1 Condiciones Ambientales de Marte

| Parámetro | Valor | Fuente |
|---|---|---|
| Atmósfera | 95.3% CO₂, 2.7% N₂, 1.6% Ar, 0.13% O₂ | NASA Mars Fact Sheet |
| Presión superficial | ~6 mbar (~0.6% de la Tierra) | NASA Mars Fact Sheet |
| Temperatura media | −63 °C (rango −140 a +20 °C) | Instrumentos de Curiosity |
| Gravedad | 0.38 g | Constante planetaria |
| Radiación superficial | ~0.7 mSv/día (~230–300 mSv/año) | RAD/Curiosity |
| Percloratos en regolito | 0.5–1% ClO₄⁻ | Phoenix Lander, 2008 |
| Polvo | Diámetro medio ~3 µm, electrostático | Ebert *et al.*, 2026 |
| Duración del sol | 24 h 39 min | Constante planetaria |
| Retardo de comunicación | 3–22 minutos por trayecto | Según posición orbital |

### 3.2 Estado del Arte en Sistemas de Soporte Vital Bioregenerativos

| Sistema | Institución | Cierre de Ciclo | Limitación |
|---|---|---|---|
| **MELiSSA** | ESA | Compartimentos fijos conectados por bombas | Sin rotación de sustrato; sin percloratos |
| **BIOS-3** | Instituto de Biofísica, Rusia | Con microalgas, planta superior | Sin animal vertebrado; sin percloratos |
| **Lunar Palace 1** | Universidad de Beihang, China | **97%**, 105 días, con gusanos de seda como animal | Sin rotación; sin tratamiento de percloratos |
| **MILPA-360** (propuesta) | BioMars Chiapas | Diseñado para 730 soles con rotación + percloratos | Por validar experimentalmente |

**Hallazgo clave:** Los tres únicos sistemas que alcanzaron cierre de ciclo elevado lo lograron integrando **animal + microorganismo + planta**. Ninguno lo logró con plantas solas.

### 3.3 Organismos Seleccionados — Justificación Científica

#### a) *Coturnix japonica* (codorniz japonesa)

Seleccionada como el vertebrado más pequeño con retorno productivo demostrable:

| Parámetro | Valor | Fuente |
|---|---|---|
| Primer huevo | 40 días de edad | Vásquez Romero, UNAS (2011) |
| Incubación | 16–17 días | Literatura estándar avícola |
| Consumo diario | ~23 g/ave | Alcedo *et al.* (2015) |
| Tasa de postura | ~68% | Sánchez *et al.*, *Rev. Científica* (2009) |
| Peso del huevo | ~10.8 g | Literature review |
| Conversión alimenticia | ~3.4 | FAO poultry data |

**Justificación:** Con 24 hembras se obtienen ~16 huevos/día (~29 g de huevo/persona/día). En 730 soles se producen ~11,900 huevos — proteína fresca que ningún alimento almacenado puede ofrecer al mes 20 de la misión.

#### b) *Hermetia illucens* (mosca soldado negra)

No es el "animal del reto" sino el **eslabón que cierra el ciclo del animal**:

| Parámetro | Valor | Fuente |
|---|---|---|
| Ciclo huevo→prepupa | ~14 días | Philippine Journal of Science, 2024 |
| Reducción de materia seca | **44–82%** del estiércol de codorniz | Waste reduction BSF quail manure, PJS 2024 |
| Contenido proteico (larva) | ~42% proteína, ~36% grasa (materia seca) | *Waste Management*, 2022 |
| Frass — NPK | Comparable a fertilizantes orgánicos comerciales | *Waste Management*, 2022 |

**El bucle cerrado:** La codorniz produce el residuo que alimenta a la larva; la larva se convierte en la proteína que alimenta a la codorniz. La única entrada externa es la fracción de grano de la ración.

#### c) *Syntrichia caninervis* (musgo extremófilo)

Documentado en 2024 como candidato a planta pionera extraterrestre:

| Resistencia | Valor | Fuente |
|---|---|---|
| Regeneración tras condiciones marcianas simuladas | **100% en 30 días** | Li *et al.*, *The Innovation*, 2024 |
| Supervivencia a nitrógeno líquido (−196 °C) | 1 mes completo | Li *et al.*, 2024 |
| Supervivencia a −80 °C | **5 años** | Li *et al.*, 2024 |
| LD50 radiación gamma (desecado) | **≈5,000 Gy** | Li *et al.*, 2024 |
| Condiciones del ensayo | 95% CO₂, −60 a 20 °C, UV alta, baja presión | Li *et al.*, 2024 |

**Primera publicación con plantas enteras directamente sobre suelo marciano simulado**, no en invernadero controlado.

#### d) Consorcio Microbiológico — El "Cóctel Biológico"

| Organismo | Función | Justificación en Marte |
|---|---|---|
| *Rhizobium* | Fija N₂ atmosférico en raíces de leguminosa | Fábrica de fertilizante que no ocupa masa de lanzamiento |
| Micorrizas Glomeromicota | Multiplica ×10 absorción hídrica | Seguro contra fallo de riego |
| *Pseudomonas fluorescens* | Solubiliza P y Fe atrapados en minerales | El regolito marciano tiene P pero no está disponible |
| *Bacillus amyloliquefaciens* | Tolerancia a salinidad alta | Protección contra trazas residuales de perclorato |
| *Trichoderma harzianum* | Antagonista de hongos patógenos | Hábitat cerrado y húmedo = riesgo de pudrición |
| *Bacillus subtilis* | Biofilm radicular como filtro osmótico | Protege tubérculos de sales residuales |

#### e) Bacterias Reductoras de Perclorato

Organismos clave para la cámara anóxica del biodigestor:

| Organismo | Función | Fuente |
|---|---|---|
| *Azospira suillum* | Reducción disimilatoria de perclorato | Coker & Szynkiewicz, 2026 |
| *Dechloromonas* spp. | Reducción en condiciones de estricta anoxia | Literature review perchlorate bioremediation |

Ruta enzimática verificada:
```
ClO₄⁻ ──perclorato reductasa──► ClO₃⁻ ──► ClO₂⁻ ──clorito dismutasa──► Cl⁻ + O₂
(veneno)                                                           (sal inerte) (oxígeno)
```

### 3.4 La "Tríada Marciana" — Policultivo Estratificado

Inspirada en la milpa mesoamericana, adaptada por estratificación radicular:

| Cultivo | Estrato | Ciclo | Función |
|---|---|---|---|
| **Camote** (*Ipomoea batatas*) | Profundo/medio | 90–120 días | Calorías densas; explora el fondo de la bandeja |
| **Leguminosa** (alfalfa/lenteja/frijol) | Superficial | Continuo | Fija N₂ vía *Rhizobium*; rastrojo alimenta al biodigestor |
| **Rábano** (*Raphanus sativus*) | Superficial | **25–30 días** | Cosecha rápida: verificación temprana del sustrato y moral de tripulación |

**Base científica:** La alfalfa como cultivo pionero aumentó la biomasa de nabo +190%, rábano +311% y lechuga +79% en simulante basáltico marciano (Kasiviswanathan *et al.*, *PLOS One*, 2022). La simbiosis leguminosa-*Rhizobium* funciona en simulante marciano y fija N₂ (Duri *et al.*, *PLOS One*, 2021).

---

## 4. DISEÑO INTEGRAL DEL SISTEMA MILPA-360

### 4.1 Arquitectura General

El sistema se compone de un cilindro de **Ø 4.76 m × 2.2 m de alto** con dos anillos concéntricos de bandejas rotativas y estaciones biológicas fijas:

```
                    ┌──────────────────────────────────┐
                    │  CÚPULA · AVIARIO DE CODORNICES   │  ← Parte 1
                    │  HEPA 99.97% · presión negativa   │  Aislamiento acústico NC-40
                    └───────────────┬──────────────────┘
                                    │ estiércol dirigido
   ANILLO INTERIOR (regeneración)   ▼   8 bandejas · 1 paso / 8 soles · ciclo 64 soles
   S1 LAVADO → S2 CODORNIZ → S3 LARVAS → S4 DESCANSO+inóculo → S5 MUSGO → S6→S7→S8
        │                        │              ▲                  │
        │ salmuera ClO₄⁻         │ frass        │ digestato        │ bandeja apta
        ▼                        ▼              │                  ▼
   ┌────────────────────────────────────────────┴──┐   ANILLO EXTERIOR (cultivo)
   │  BIODIGESTOR DE DOS CÁMARAS                   │   12 bandejas · ciclo 96 soles
   │  A · anóxica: ClO₄⁻ → Cl⁻ + O₂              │   camote · leguminosa · rábano
   │  B · metanogénica: → BIOGÁS + DIGESTATO       │        │
   └───────────────┬───────────────────────────────┘        │ rastrojo
                   │ biogás → colchón térmico ──────────────┘
                   │ digestato → riego
                   └── MFC-biosensor en cada punto de trasvase
```

### 4.2 Dimensiones Verificadas (modelo 3D)

| Componente | Valor |
|---|---|
| Bandeja cuadrada | 0.70 m de lado = 0.49 m² |
| Total de bandejas | 20 (8 interiores + 12 exteriores) = **9.8 m²** |
| Anillo interior, R = 0.96 m | Perímetro 6.03 m; 8 bandejas ocupan 5.60 m ✓ |
| Anillo exterior, R = 1.80 m | Perímetro 11.31 m; 12 bandejas ocupan 8.40 m ✓ |
| Esquina exterior de bandeja | 2.18 m del eje |
| **Casco mínimo** | **Ø 4.76 m** (con 0.20 m de holgura) |

### 4.3 Las 8 Estaciones del Anillo Interior

| Estación | Proceso | Duración | Entrada | Salida |
|---|---|---|---|---|
| **S1 · Lavado** | El regolito se lava con agua reciclada para extraer percloratos | 8 soles | Regolito tóxico + agua | Regolito lavado + salmuera ClO₄⁻ |
| **S2 · Codorniz** | Deposición dirigida de estiércol fresco | 8 soles | Bandeja lavada bajo aviario | Bandeja con estiércol fresco |
| **S3 · Larvas** | Las larvas BSF procesan el estiércol | 8 soles | Estiércol fresco | Frass (abono) + larvas (proteína) |
| **S4 · Descanso** | Inoculación del cóctel microbiano | 8 soles | Frass + digestato + cepas | Sustrato inoculado |
| **S5 · Musgo** | *S. caninervis* forma costra biológica | 8 soles | Sustrato inoculado | Costra verde = bandeja apta |
| **S6–S8** | Maduración y preparación | 24 soles | — | Bandeja lista para cultivo |

**Ciclo completo del anillo interior:** 64 soles (8 estaciones × 8 soles). En 730 soles se completan **~11 rotaciones**.

### 4.4 El Biodigestor de Dos Cámaras

La aportación técnica más original del sistema. Cumple **doble función** con una sola infraestructura:

**Cámara A — Anóxica / Dehalogenante:**
- **Entrada:** Salmuera del lavado del regolito + lixiviado del frass
- **Proceso:** Bacterias reductoras disimilatorias (*Azospira suillum*, *Dechloromonas* spp.) destruyen los percloratos en condiciones de anoxia, usando la materia orgánica como donador de electrones
- **Salida:** Agua declorada reincorporable al ciclo + trazas de O₂
- **Función adicional:** Protege a la Cámara B (la metanogénesis se inhibe con perclorato)

**Cámara B — Metanogénica:**
- **Entrada:** Frass, estiércol excedente, rastrojo del anillo exterior, aguas negras
- **Salida:** Biogás (CH₄ ~60%) + digestato líquido (abono para riego)

**Balance energético estimado:**

| Variable | Valor | Fuente |
|---|---|---|
| Carga a cámara B | ~2 kg SV/día | Balance de masa del equipo |
| Rendimiento de biogás | 0.24 m³/kg (estiércol, base seca) | Guía FAO de biodigestores |
| Fracción de CH₄ | ~60% | FAO |
| Poder calorífico CH₄ | ~35.8 MJ/m³ | Estándar termodinámico |
| **Resultado** | **≈10 MJ/día ≈ 2.9 kWh/día** | |

**Declaración honesta:** 2.9 kWh/día **no alimentan un hábitat marciano**. Alimentan **al propio MILPA-360**: motor del carrusel, bombas de trasvase, y un **colchón térmico de emergencia** para sostener el punto de consigna durante la noche marciana o tormentas de polvo. **MILPA-360 es el único subsistema de soporte vital que se mueve con su propia basura.**

### 4.5 Red de Biosensores MFC

La celda de combustible microbiana genera microvatios — inútil como batería. **Pero es un biosensor autoalimentado excelente.** Su voltaje es proporcional a la actividad metabólica del consorcio:

- **Caída de voltaje con carga orgánica estable** → hay un tóxico entrando al bucle
- **Caída de voltaje con carga orgánica baja** → falta alimento en esa estación

Se coloca una MFC en cada punto de trasvase: S1→biodigestor, biodigestor→riego, riego→bandeja.

**Resultado:** Una red de detección de intoxicación del ciclo que no consume ni un vatio, no requiere calibración con reactivos, y avisa antes de que el daño sea visible — exactamente lo que se necesita cuando la respuesta de la Tierra tarda 22 minutos.

### 4.6 Reloj Biológico vs. 730 Soles

| Organismo / Subsistema | Ciclo | Generaciones en 730 soles | Implicación |
|---|---|---|---|
| *Coturnix japonica* | Primer huevo a los 40 días; postura ≥30 semanas | ~8 relevos de parvada | Se lleva parvada fundadora, no un año de huevo |
| *Hermetia illucens* | Huevo→prepupa ~14 días; ciclo completo ~45 días | ~16 generaciones | Biomasa proteica bajo demanda |
| Bandeja anillo interior | 64 soles | ~11 vueltas | 11 ciclos de regeneración de suelo |
| Bandeja anillo exterior | 96 soles | ~7 cosechas | Producción escalonada continua |
| *Syntrichia caninervis* | Regenera 100% en 30 días tras desecación | Continuo | Semáforo biológico permanente |

---

## 5. JUSTIFICACIÓN TÉCNICA DEL SIMULADOR 3D

### 5.1 ¿Por Qué un Simulador y No un Render Estático?

Los diferenciadores 1 (rotación invertida) y 3 (resiliencia por desfase) son **cinemáticos**: dependen del tiempo y del movimiento. Una lámina estática o una diapositiva generada con IA no puede demostrarlos — solo puede afirmarlos. Por eso se desarrollaron dos herramientas de prototipado digital:

### 5.2 Modelo 3D Procedural en Blender (`milpa360_build.py`)

**Herramienta:** Script de Python de 294 líneas ejecutado en Blender en modo *background*.
**Comando:** `blender --background --python milpa360_build.py`
**Motor de render:** EEVEE Next (o Cycles como fallback).

#### Arquitectura del Script

El modelo 3D se genera de forma **procedural** (enteramente por código, sin modelado manual), lo que garantiza reproducibilidad y permite ajustar dimensiones con exactitud geométrica. La estructura del código es:

**1. Sistema de materiales (líneas 16–52):**
Define 22 materiales PBR (Physically Based Rendering) con propiedades de rugosidad, metalicidad y emisión. Cada componente del sistema tiene un material que lo identifica visualmente: el estiércol es marrón oscuro, las larvas son doradas, el musgo es verde, el biodigestor tiene dos colores (azul para la cámara anóxica, rojo para la metanogénica), y los sensores MFC son esferas rojas brillantes con emisión de luz.

**2. Funciones geométricas primitivas (líneas 54–84):**
Cuatro funciones (`cyl`, `box`, `sph`, `cone`) generan las primitivas geométricas de Blender con asignación automática de material y relación padre-hijo para la rotación. La función `label` genera texto 3D extruido con corrección automática de espejado en la vista de planta.

**3. Base fija — La plataforma (líneas 87–92):**
La base es un cilindro metálico de R=2.95 m con borde, columna central y buje del eje. Dos bandas separadoras dividen visualmente los anillos interior y exterior. Esta estructura representa la plataforma sobre la que giran las bandejas, y no rota.

**4. Anillo interior — 8 bandejas de regeneración (líneas 98–113):**
Ocho bandejas cuadradas distribuidas en un círculo de R=1.28 m. Cada bandeja tiene un sustrato visual diferente según su estado en el ciclo: `lavado` (gris), `estier` (marrón estiércol), `larva` (dorado), `sustrato` (tierra), `musgo` (verde). Las bandejas están emparentadas al *empty* `ANILLO_INTERIOR`, lo que permite rotarlas en conjunto. En la posición de larvas (i=2) se colocan 9 esferas doradas aplanadas que representan las larvas visibles. En la posición de musgo (i=4) se colocan 7 esferas verdes aplanadas que representan la costra biológica.

**5. Anillo exterior — 12 bandejas de cultivo (líneas 115–132):**
Doce bandejas más grandes distribuidas a R=2.42 m, con **desfase progresivo de crecimiento**: la primera está rotulada "COSECHADA" y las siguientes tienen conos de altura creciente que representan plantas en distintas etapas de crecimiento (camote como raíz profunda, leguminosa, rábano). Este desfase visual es **el tercer diferenciador** hecho visible: en cualquier momento hay bandejas en todas las etapas.

**6. Aviario de codornices — Estación fija S2 (líneas 134–150):**
Estructura de jaula con 4 postes verticales, 12 barrotes cilíndricos, aros superior e inferior, techo sólido y **rejilla de caída** en la base. Sobre la rejilla se colocan 4 codornices (esferas elipsoidales con cabeza) y debajo de ella, 6 esferas pequeñas marrones que representan el estiércol cayendo hacia la bandeja inferior. Este detalle visual demuestra el mecanismo de deposición dirigida.

**7. Biodigestor de dos cámaras (líneas 152–168):**
Dos cilindros grandes separados por 1.24 m (Cámara A anóxica en azul y Cámara B metanogénica en rojo), conectados por un tubo horizontal. Tubos verticales representan la entrada de salmuera a la cámara A y la salida de biogás de la cámara B. Una esfera aplanada en la parte superior de B representa la campana de gas. Las etiquetas de texto 3D muestran las reacciones químicas: `ClO₄⁻ → Cl⁻ + O₂` en A y `BIOGÁS + DIGESTATO` en B.

**8. Etiquetas de estación y flechas de sentido (líneas 170–178):**
Las 8 estaciones (S1 LAVADO a S8 COSECHA) están rotuladas con texto 3D orientado tangencialmente al anillo, con conos naranjas emisivos que indican el sentido de rotación del carrusel.

**9. Sensores MFC (líneas 180–182):**
Tres esferas rojas brillantes con alta emisión de luz colocadas en los tres puntos de trasvase del sistema: junto al aviario, en la conexión biodigestor–plataforma, y en el anillo exterior. Estas esferas representan los biosensores autoalimentados de celda de combustible microbiana.

**10. Sistema de iluminación y render (líneas 194–242):**
Tres luces de área simulando iluminación de hábitat y una luz puntual central. El fondo del mundo tiene un tono cálido marciano (R=0.045, G=0.035, B=0.030). Se generan **7 tomas estáticas** a 1920×1080:

| Toma | Posición de cámara | Propósito |
|---|---|---|
| 01 · Vista general | (7.6, −8.4, 5.6) | Imagen principal para el pitch |
| 02 · Planta (los dos anillos) | (0, −0.3, 17.0) | Muestra la rotación y el desfase |
| 03 · Detalle aviario | (2.5, −2.9, 2.5) | Codornices y rejilla de deposición |
| 04 · Detalle biodigestor | (2.4, −7.4, 2.0) | Las dos cámaras y las reacciones |
| 05 · Vista frontal | (0, −11.0, 3.2) | Perspectiva de presentación |
| 06 · Vista lateral desfase | (10.0, 0.6, 3.4) | Muestra el crecimiento escalonado |
| 07 · Picado tres cuartos | (−7.0, −7.6, 7.4) | Contexto general del módulo |

**11. Tomas de proceso para el Documento Concepto (líneas 260–273):**
Dos tomas adicionales usando el motor Workbench:
- `08-proceso-modelo-arcilla`: Vista sólida monocolor que simula un modelo de arcilla
- `09-proceso-estructura-alambre`: Vista de estructura de alambre (wireframe)

Estas tomas documentan el proceso de construcción del modelo, que la guía del reto pide explícitamente para el criterio 4 (Culminación).

**12. Animación de rotación (líneas 275–289):**
96 frames de animación con interpolación lineal donde los dos anillos (ANILLO_INTERIOR y ANILLO_EXTERIOR) completan una vuelta completa de 360°. Estas se ensamblan en video mediante `hacer-video.sh`, que produce un bucle perfecto de ~12 segundos a 24 fps mediante `ffmpeg`.

**13. Compatibilidad multi-versión (líneas 246–258):**
La función `_fcurves()` implementa compatibilidad con Blender 4.x y 5.x, manejando el cambio de API donde las fcurves se movieron de `action.fcurves` a `layers/strips/channelbags`.

### 5.3 Planos Técnicos Digitales (`prototipo/planos/`)

Conjunto de 4 planos técnicos generados como SVG desde código HTML/CSS, renderizados a 3200×2200 px:

| Plano | Contenido | Criterio |
|---|---|---|
| **P-02** Corte transversal | Blindaje de regolito, aviario estanco, barreras de presión, cotas | 7 · Relevancia técnica |
| **P-03** Planta del carrusel | El mecanismo de rotación | 2 · Creatividad |
| **P-04** Balance de flujos | Todas las cifras con fuente + limitaciones | 6 · Validez |
| **P-05** Biodigestor y perclorato | Aportación técnica original, ruta enzimática | 2 + 7 |

---

## 6. ANÁLISIS DE VIABILIDAD Y NORMATIVA ECLSS

### 6.1 Cumplimiento NASA-STD-3001 Vol. 2 Rev. E

| Parámetro | Requisito | ID | Cumplimiento MILPA-360 |
|---|---|---|---|
| ppCO₂ | ≤ 3 mmHg (media 1 h) | 6004 | Compensado por fotosíntesis del anillo exterior |
| Particulado total | < 3 mg/m³ | 6052 | Aviario a presión negativa con HEPA |
| Particulado respirable | < 1 mg/m³ | 6052 | HEPA ≥99.97% @ 0.3 µm |
| Polvo marciano | < 0.3 mg/m³ TWA | 6053 | Costra de musgo impide resuspensión |
| Calidad microbiana aire | HEPA ≥99.97% @ 0.3 µm | 6059 | Aviario aislado con filtración dedicada |
| Ruido zona de sueño | NC-40 | 6079 | Aislamiento acústico del aviario |
| Dosis de ruido 24 h | ≤ 75 dBA TWA | 6115 | Motor del carrusel programado fuera del turno de sueño |
| Agua potable mínima | 2.5 L/tripulante/día | Tabla 6.3-1 | Agua de lavado se recicla vía biodigestor |

### 6.2 Tres Razones de Viabilidad

**1. No inventamos biología.** Los seis organismos están caracterizados y publicados: regeneración del 100% de *S. caninervis*, reducción 44–82% por larvas BSF, primer huevo a los 40 días, 97% de cierre en Lunar Palace 1.

**2. Es energéticamente autosuficiente.** ~2.9 kWh/día de biogás propio mueven el carrusel y dan colchón térmico de emergencia. No compite por la energía del hábitat.

**3. Cumple normativa real.** El diseño se ajusta a NASA-STD-3001 Vol. 2 Rev. E en CO₂, particulado, calidad microbiana del aire y acústica.

---

## 7. ANÁLISIS DE FALLA EN CASCADA

**Principio fundamental:** El sistema no es una cadena — es un anillo. Una cadena rota deja dos trozos utilizables; un anillo roto deja de girar.

```
        codornices ──estiércol──► larvas ──frass──► biodigestor
             ▲                      │                    │
             │                      │              biogás│digestato
        proteína                    │                    ▼
             │                      └──── rastrojo ◄── CULTIVO
             └──────────────────────────────────────────┘
```

| Si falla… | Consecuencia | Tiempo hasta cascada |
|---|---|---|
| **Las codornices** | Sin estiércol → larvas sin sustrato → digestor sin carga → sin biogás → sin colchón térmico → el cultivo muere la primera noche sin respaldo | **≈30–40 soles** |
| **Las larvas** | NH₃ se acumula (viola SMAC 6050) **y** las codornices pierden su fuente de proteína → mueren. Falla bidireccional | **≈16 soles** |
| **El biodigestor** | Sin biogás ni tratamiento de percloratos → se gasta agua potable en lavar regolito → compromete los 2.5 L/tripulante/día | **≈24 soles** |
| **El cultivo** | Sin rastrojo para el ciclo **y** sin fotosíntesis que compense CO₂ **y** sin mitigante psicológico (riesgo BMed) | **Inmediato** (aire), ~8 soles (cadena) |

---

## 8. RETORNO A LA TIERRA — APLICACIÓN EN CHIAPAS

### 8.1 El Problema Documentado

| Dato | Valor | Fuente |
|---|---|---|
| Ganadería en Chiapas | ~3 millones de ha = **33% de la superficie** | Alerta Chiapas, 2026 |
| Tipo de ganadería | **90% extensiva** | Alerta Chiapas, 2026 |
| Cambio de uso de suelo (2000–2021) | **72% fue para pastizales** | CONABIO |
| Degradación del suelo | **35.6% por deforestación** | SEMARNAT |
| Pérdidas en café | **25–30%** por sequía y calor extremo | Business & Human Rights |
| Familias afectadas | **>180,000** dependen del café | Datos estatales |
| Roya del café | Subió de 800 a **1,700 msnm** desde 2012 | *Sociedad y Ambiente* |

### 8.2 Transferencia Directa por Subsistema

| En Marte | En Chiapas | Problema que Ataca |
|---|---|---|
| Carrusel con 56 soles de descanso | Pastoreo rotacional y silvopastoril | 33% de superficie bajo ganadería extensiva |
| Biodigestor de dos cámaras | Biodigestor familiar: gas para cocinar + biol | Efluentes de granja sin tratar |
| Larva BSF sobre estiércol | Harina de larva como sustituto de balanceado importado | Mayor gasto del pequeño productor |
| Cóctel microbiano + policultivo | Milpa mejorada + inoculación biológica | Suelos degradados y acidificados |
| *Syntrichia* como costra | Cubierta viva anti-erosión en taludes | Erosión por roza-tumba-quema |
| Red MFC | Alarma de calidad de agua sin reactivos | Vertidos de granja sin monitoreo |
| Resiliencia por desfase | Escalonamiento de siembra | Clima impredecible para café y maíz |

### 8.3 Objetivos de Desarrollo Sostenible (5 ODS)

| ODS | Dónde SÍ Aplica | Dónde NO Aplica |
|---|---|---|
| **2 · Hambre Cero** | Proteína fresca en el punto de consumo | No sustituye calorías básicas; es complemento nutricional |
| **6 · Agua Limpia** | Trata efluentes de granja; biosensor de calidad de agua | No potabiliza; no sustituye infraestructura municipal |
| **7 · Energía Asequible** | Biogás doméstico sustituye leña; impacto en salud respiratoria | Escala doméstica; no aporta a la red eléctrica |
| **12 · Producción Responsable** | 100% del residuo se convierte en insumo | Requiere capacitación y cambio de práctica |
| **15 · Vida Terrestre** | Ataca la causa raíz: ganadería sin rotación | No revierte deforestación consumada |

---

## 9. LIMITACIONES DECLARADAS

1. **No es autosuficiencia alimentaria.** ~6 m² de cultivo no alimentan a 6 personas. Cubre la fracción fresca y micronutrientes, no las calorías base.
2. **El O₂ de la reducción de perclorato es coproducto, no soporte vital.** Se reporta como métrica de eficacia.
3. **El biogás no alimenta el hábitat.** Alimenta al propio módulo y da autonomía térmica de emergencia.
4. **Los ensayos deben usar simulante de regolito, no regolito real,** con protocolo de seguridad.
5. **El frass no es fertilizante listo para usar.** Requiere caracterización antes de aplicarse.
6. **Cuello de botella genético** de la parvada en 8 relevos: mitigado con 4 líneas familiares en cruce rotativo.
7. **Bioseguridad de contaminación cruzada** entre vertebrados, insectos y consorcios microbianos en volumen cerrado.
8. **La gravedad marciana (0.38 g) no está validada** para el desarrollo de codornices ni para la sedimentación en el biodigestor. Es la incógnita más grande del diseño.

---

## 10. FUENTES BIBLIOGRÁFICAS

### Documentos Oficiales del Reto
- `EL RETO .pdf` — Definición del reto, elemento TIERRA, misión de ~2 años
- `El Reto Mars Challenge 2026 UNACH (1).pdf` — Reto Unificado, tres partes obligatorias
- `Guia Participante Mars Challenge 2026 FINAL.docx (4).pdf` — 12 fases, 3 entregables, rúbrica
- `ECLSS Requirements Mars Habitat 2026.pdf` — NASA-STD-3001 Vol. 2 Rev. E (Erik Antonsen, OSMED)

### Literatura Científica
- Li *et al.* (2024), "The extremotolerant desert moss *Syntrichia caninervis* is a promising pioneer plant for colonizing extraterrestrial environments", *The Innovation* — https://www.cell.com/the-innovation/fulltext/S2666-6758(24)00095-X
- Fu *et al.* (2016), "How to Establish a Bioregenerative Life Support System for Long-Term Crewed Missions to the Moon or Mars", *Astrobiology* — https://pubmed.ncbi.nlm.nih.gov/27912029/
- Dong *et al.* (2017), "Element Cycling and Energy Flux Responses… Chinese Lunar Palace-1", *Astrobiology* — https://doi.org/10.1089/ast.2016.1466
- Coker *et al.* (2026), "Simple and effective remediation strategies of Martian perchlorates", *Soil Science Society of America Journal* — https://acsess.onlinelibrary.wiley.com/doi/10.1002/saj2.70201
- "Perchlorates on Mars: Occurrence and implications for putative life", *Icarus* — https://www.sciencedirect.com/science/article/pii/S0019103524003063
- "Waste reduction and bioconversion of quail, chicken and pig manure by BSF", *Philippine Journal of Science* — https://philjournalsci.dost.gov.ph/
- "Frass derived from BSF larvae treatment of biodegradable wastes", *Waste Management* — https://www.sciencedirect.com/science/article/pii/S0956053X22000666
- "BSF: A Keystone Species for Sustainable Waste Management" — https://pmc.ncbi.nlm.nih.gov/articles/PMC12386371/
- "MFC sensors for water quality early warning", *Renewable and Sustainable Energy Reviews* — https://www.sciencedirect.com/science/article/abs/pii/S1364032117310420
- "Recent advances in MFC-based self-powered biosensors", *Anal. Bioanal. Chem.* (2024) — https://link.springer.com/article/10.1007/s00216-024-05230-y
- FAO, *Guía teórico-práctica sobre el biogás y los biodigestores* — https://www.fao.org/3/ca5082es/ca5082es.pdf
- "Comportamiento productivo de la codorniz *Coturnix japonica*" — https://repositorio.unas.edu.pe/
- "Edad al primer huevo en codorniz japonesa", *Rev. Científica* — https://ve.scielo.org/scielo.php?script=sci_arttext&pid=S0798-22592009000200012
- NASA, *Astronaut Mass Balance for Long Duration Missions* — https://ntrs.nasa.gov/api/citations/20190027563/downloads/20190027563.pdf
- Kasiviswanathan *et al.* (2022), "Alfalfa as biofertilizer for Mars regolith simulant", *PLOS One* — https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0272209
- Duri *et al.* (2021), "Legume-rhizobium symbiosis in Mars regolith simulant", *PLOS One* — https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0259957

### Datos de Chiapas
- "Ganadería extensiva, el cáncer ambiental en Chiapas", *Alerta Chiapas* (2026) — https://alertachiapas.com/2026/05/29/
- SEMARNAT, *Informe del Medio Ambiente*, cap. 3 — https://apps1.semarnat.gob.mx:8443/dgeia/informe15/tema/cap3.html
- CONABIO, *Degradación del suelo en la República Mexicana 1:250,000* — http://geoportal.conabio.gob.mx/
- "Pérdidas en la cosecha de café en Chiapas", BHRRC — https://www.business-humanrights.org/es/
- "La roya y el futuro del café en Chiapas", *Sociedad y Ambiente* — https://www.scielo.org.mx/
- TNC, *ECOGAN Chiapas: ganadería sostenible* — https://www.tncmx.org/

---

*Documento Técnico Formal preparado por el Equipo BioMars Chiapas para Mars Challenge 2026.*
*"No construimos un huerto para escapar de la Tierra. Construimos Marte para acordarnos de cómo se cuida un suelo."*
