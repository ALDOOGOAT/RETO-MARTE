# P4 · S3: mecánica, acceso y ensayos terrestres

**20 sep 2026 · base S2 `e23bb12` · revisión `P4-S3-2026-09-20`.**
Resultado de ingeniería preliminar con supuestos. **No hay ensayos físicos ejecutados,
motor seleccionado, resistencia demostrada ni conformidad NASA.** S4 tratará costes.

## 1. Decisiones y correcciones verificables

**D8 — separar piso y cama.** P-02 situaba al operario en z=0; el HTML elevaba todo el piso
hasta la cara de las cubetas, z=0.62 m. La cifra S0/S2 de 1.58 m describía esa escena,
pero no demostraba que el corte P-02 tuviese la misma altura humana. Se corrige el HTML
al datum de P-02: piso nominal 0, borde de cubeta 0.62 y techo 2.20 m. Quedan 2.20 m
sobre el piso y 1.58 m sobre la cama. Una figura de 1.75 m no representa una población
con ropa, herramientas o trajes. **B19 sigue abierto en entrada, evacuación y tarea.**

Además, `geoSector` y `geoMarco` sumaban su propia altura después de extruir hacia +Y;
las piezas quedaban desplazadas. Se corrigió el origen y se comprobó el bounding box real
de Three.js. Caja 0.28 m y sustrato 0.22 m ya usan sus dimensiones declaradas.

**D9 — descontar el reborde dibujado del área útil.** Los 35 mm de borde ya aparecían en
el HTML pero no en masa ni alimento. Pasan a parámetro **supuesto de diseño**, sin afirmar
que sea un espesor fabricado. El sector exterior ocupa 0.33311 m²; el suelo interior,
**0.25715 m²**. Cultivo pasa de 4.00 a **3.086 m²**; sustrato total de 6.66 a **5.143 m²**.
El reborde también se descuenta angularmente tal como lo genera la escena. Esto no mide
la superficie real de raíces ni valida densidad de plantas. P1/P2/P3 se regeneran con el
área útil y una prueba suma el área de los triángulos superiores de la malla real.
La masa nominal de sustrato pasa de 110 a **84.9 kg/cartucho**; tara supuesta 5 kg adicional.
En régimen nominal P1 quedan **0.199 kWh químicos/d** de biogás, **10.48 kWh eléctricos/d**
para luz y **2.46 %** de cobertura calórica de seis personas. Son fronteras y unidades
distintas; faltan auxiliares, arranque y validación. No comparar gas bruto con electricidad
como si fuesen salidas intercambiables. La comida de las aves continúa siendo entrada externa.

### Tres alternativas de acceso comparadas

| Alternativa | Altura nominal de paso | Cambio | Decisión / brecha |
|---|---:|---|---|
| S2: piso y cama a 0.62, techo 2.20 | 1.58 m | Ninguno | Descartada como representación del piso de P-02 |
| D8: piso inferior a 0, techo 2.20 | 2.20 m dentro del pasillo | Separa cotas, conserva Ø y área | Adoptada como corrección digital; el anillo aún corta la entrada radial |
| Casco 2.90, piso 0.62 y cruce elevado a 0.80 | 2.10 m sobre el cruce | +11.43 m³ de cilindro y +10.03 m² de pared lateral | Candidata, no adoptada: necesita puente, apoyo, puertas, despeje de estaciones y evacuación |

Los volúmenes anteriores son cilindros nominales; no volumen habitable ni masa de casco.
Elevar el techo sin resolver la ruta de ingreso no cierra B19. Tampoco se adopta una puerta
circular de 0.88 m como acceso apto: la escotilla existente sigue siendo esquemática.

**Ruta nominal de una cubeta:** izar al menos 0.30 m para salvar el borde con holgura
de proyecto supuesta de 20 mm (no tolerancia de fabricación) y trasladar 0.630 m hacia el centro permite alojar la cubeta desnuda en
el pasillo. El barrido geométrico deja 0.270 m hasta el núcleo y 0.020 m hasta el anillo.
Rotar esa envolvente alrededor del eje conserva los radios. **No demuestra un carro,
aparejo, operario ni salida por la pared.** Una apertura recta necesitaría al menos
0.681 m de ancho sólo para la cubeta y esos márgenes; no es ancho de evacuación humana.
Se retira la flecha antigua que daba por resuelta la salida a esclusa.

## 2. Cargas, movimiento y bloqueo

Fuente única: `config/milpa360.parameters.json`, grupo `mecanica`. La densidad de cada
escenario se interpreta como **operativa total**: no añadir de nuevo agua de poro.
Tara, estructura, fluidos de tuberías y biomasa se contabilizan aparte. B7 debe sustituir
estos supuestos con pesajes. Las cubetas de reserva y equipos fijos no giran.

Para una corona uniforme, por integración de $r^2\,dm$:

$$I={m\over2}(r_o^2+r_i^2),\qquad \tau_I=I\alpha.$$

Tara/biomasa/tuberías se aproximan en el radio medio. Un giro de $\theta=18°$ en $t=60$ s
con aceleración y frenado simétricos triangulares da:

$$\alpha=4\theta/t^2,\quad\omega_{max}=2\theta/t,\quad
\tau_{req}=F_d(\mu M g r_{apoyo}+\tau_{aux}+I\alpha).$$

$\mu$ es aquí adimensional, equivalente a fuerza tangencial dividida por peso. No se
confunde con un coeficiente de rodadura expresado en longitud ni con un dato de corona
seleccionada. $F_d=2$ nominal es un margen exploratorio. Los **ocho soles** son residencia
entre movimientos, no duración del movimiento físico ni tiempo de integración del render.

$$E_k=I\omega_{max}^2/2,\quad W_f=\tau_{resistente}\theta,\quad
P_{mec,max}=(\tau_{resistente}+I\alpha)\omega_{max}.$$

Energía, potencia y par se informan separados. Estos valores no son consumo eléctrico;
faltan pérdidas de motor/reductor, control, freno y espera. No convertirlos en autosuficiencia.

<!-- CALCULOS:S3 -->

| Escenario / gravedad | Masa móvil kg | Par preliminar N·m | Apoyo desigual N | Pico mecánico W |
|---|---:|---:|---:|---:|
| conservador / Tierra | 2507 | 1224.7 | 4098 | 10.26 |
| conservador / Marte | 2507 | 506.1 | 1550 | 4.24 |
| nominal / Tierra | 1977 | 379.6 | 3233 | 1.99 |
| nominal / Marte | 1977 | 152.9 | 1223 | 0.80 |
| favorable / Tierra | 1493 | 45.0 | 2441 | 0.16 |
| favorable / Marte | 1493 | 19.3 | 923 | 0.07 |

| Digestor candidato | Q L/d | HRT d | Útil L | Total L | OLR kg SV/m³/d | Alto cilindro m |
|---|---:|---:|---:|---:|---:|---:|
| conservador | 2.64 | 40 | 105.6 | 140.7 | 0.41 | 0.72 |
| nominal | 2.13 | 30 | 63.9 | 85.1 | 1.29 | 0.43 |
| favorable | 1.67 | 20 | 33.4 | 44.6 | 2.89 | 0.23 |
| envolvente | 4.46 | 40 | 178.3 | 237.7 | 0.54 | 1.21 |

<!-- /CALCULOS:S3 -->

La masa móvil nominal corregida es **1.98 t**, incluyendo reservas mecánicas supuestas;
el par preliminar terrestre es **380 N·m**. La estimación intermedia de 2.48 t / 473 N·m
precedía al descuento del reborde: queda superada. La inercia no disminuye al cambiar g.

**Sensibilidad por separado**, manteniendo lo demás nominal en Tierra:
$\mu=0.001/0.005/0.01$ → **88/380/744 N·m**;
$t=15/60/120$ s → **454/380/376 N·m**. Medir rozamiento cambia más la decisión que hacer
el giro aún más lento. Los extremos no son probabilidades ni condiciones certificadas.

**Soportes:** 12 apoyos propuestos. Carga media $Mg/12$; escenario de reparto desigual
$2Mg/12$, sin afirmar que la reacción real sea ésa. Una cubeta ausente desplaza el centro
de masa nominal ~90 mm y, con 1° de inclinación supuesta, aporta hasta ~29 N·m en Tierra.
La máquina no debe girar durante extracción; el bloqueo tiene que evaluarse también sin carga
simétrica. No se suma este caso de mantenimiento al ciclo normal como si ambos ocurrieran juntos.

**Soporte de cubeta:** dos vigas simplemente apoyadas, luz 0.60 m, carga uniforme repartida.
Por viga: $M_{max}=WL/16$ y $EI_{min}=5(W/2)L^3/(384\delta)$, con $\delta=2$ mm como objetivo
exploratorio. Nominal terrestre: **33.1 N·m y 620 N·m²**. Faltan carga concentrada, impactos,
uniones, material, sección, fatiga y corrosión: no hay esfuerzo admisible ni resistencia aprobada.

**Accionamiento y bloqueo:** usar transmisión reductora y bloqueo positivo; la fuerza nominal
preliminar a radio 1.88 m es ~202 N. No dimensiona el pasador: falta el par máximo real del motor,
fallo de control, impactos, diámetro/sección y anclajes. No confiar en que un reductor sea
irreversible. Deben existir parada, bloqueo de energías y recuperación manual por procedimiento.
La selección de motor necesita curva par–velocidad, inercia reflejada y régimen; no basta su par
estático. La documentación del fabricante describe patrones de aceleración/frenado, no valida
nuestro rozamiento. [Oriental Motor, fórmulas de selección](https://www.orientalmotor.com.sg/sg/tech/calculation/sizing-motor04).

## 3. Espacio para procesos, dosel e interfaces

El digestor candidato se estima con el flujo seco residual de P1 después de larvas y el
rastrojo. Se conservan bases diferentes: SV del estiércol y MS del rastrojo. Sólo para OLR
se supone fracción SV/MS del rastrojo; no se cambia su rendimiento de metano por MS.

$$Q={\dot m_{ST}\over x_{ST}\rho},\quad V_u=Q\,HRT,\quad
V_t={V_u\over1-f_g},\quad OLR={\dot m_{SV}\over V_u}.$$

5 % ST y 30 días HRT nominales son **hipótesis de dimensionado**, no condiciones validadas
para nuestra mezcla. El cálculo incluye una envolvente combinando mayor entrada seca,
menor fracción ST y mayor HRT: los escenarios P1 por sí solos no delimitan el mayor tanque.
Nominal: **63.9 L útiles, 85.1 L totales**. Envolvente: **178.3 / 237.7 L**. Un cilindro de
0.50 m interior necesitaría 0.434–1.211 m de altura en esos dos casos, sin cabezales ni herrajes.
La reserva de pared/aislamiento da Ø0.56, sin cálculo resistente. Sobre base de 0.62 m,
el caso envolvente llega a 1.83 m: el margen al techo todavía debe alojar conexiones y servicio.

No se conoce humedad de entrada: **Q no es automáticamente agua adicional importada**.
No se ha dimensionado salmuera, arranque, gasómetro, calefacción, limpieza ni almacenamiento.
B17 continúa abierto. El proceso inicial ISRU y la salmuera permanecen separados del digestor;
la geometría de los tanques del simulador es esquemática, no esta lista de capacidades.

B15/B16: seleccionar variedad y registrar su dosel máximo, porte lateral, sistema de soporte
y altura inferior de cada equipo. Antes de indexar se necesita comprobación de toda la
trayectoria, incluida cosecha y retiro del follaje antes de pasar de C12 a S1. No se deduce
un dosel real de la escala de las plantas dibujadas. Filtros, cables y tubos también ocupan
el pasillo; la ayuda de izado necesita su propia envolvente.

El goteo requiere circuito móvil con junta rotativa/aislamiento y drenaje definido. Se debe
seguir regando entre indexados. Durante mantenimiento: cortar el movimiento, aislar entradas,
contener conexiones y mantener el lote identificado. El enclavamiento químico simulado de
P3 no es un controlador de seguridad ni un sensor real de perclorato.

## 4. Ensayos preparados; resultados pendientes

**No construir el anillo a escala real de dos toneladas como requisito del pitch.**
Separar demostrador didáctico (p.ej. escala 1:10, Ø0.456 m), banco mecánico de una cubeta
y experimentación biológica. A igual geometría/material, masa escala con $\lambda^3$ e
inercia con $\lambda^5$; rodamientos, tolerancias y materiales reales no escalan así. Un
ensayo pequeño no acredita el par ni la resistencia del módulo grande.

| ID / pregunta | Variable primaria y comparación | Instrumentos / calibración | Repeticiones y criterio previo |
|---|---|---|---|
| E0 · ¿Cuánto pesa realmente el lecho? | Densidad operativa kg/m³; humedad sólo si se dispone de método apropiado | Recipiente de volumen medido, balanza con masa de referencia antes/después; registrar resolución, tara y compactación | 3 preparaciones independientes por condición; informar media, dispersión y rango, sin extrapolar a regolito marciano |
| E1 · ¿Indexa sin atascar ni perder alineación? | Par de inicio y error angular; comparar vacío y cada carga autorizada | Dinamómetro tangencial a radio medido, encoder/escala angular, cronómetro; cero y cargas conocidas; vídeo de referencia | 3 montajes × 10 pasos por condición, orden alternado; objetivo exploratorio ≤0.5° y ningún contacto/derrame. Diez pasos de un montaje no son diez réplicas independientes |
| E2 · ¿Cierra el balance de agua limpia? | Entrada–salida–cambio de inventario, L; recuperación útil por separado | Pesaje de depósitos y lecho, bandeja de derrames, reloj; balanza y volumen contrastados; medir temperatura si se convierte masa a volumen | 3 montajes/rellenados independientes; fijar duración antes de empezar; residuo ≤2 incertidumbres combinadas y ausencia de fuga no contenida. No imponer 80 % como resultado |
| E3 · ¿Un lote rechazado queda aislado? | Cruces indebidos y tiempo de recuperación, frente al nominal | IDs físicos, interruptores y registro/vídeo; verificar posiciones abierto/cerrado antes/después | 3 reinicios por caso: rechazo, dato ausente, bomba detenida, atasco, recuperación; cero liberaciones sin permiso, ningún ID perdido y sustitución consume un repuesto |
| E4 · ¿Cabe la tarea y la salida? | Interferencias y maniobra completa, sin carga inicialmente | Plantilla 1:1 de suelo, puerta, cubeta y equipo; cinta y calibre; registrar dimensiones e incertidumbre | 3 montajes de recorrido; comprobar entrada, trabajo, retorno y extracción sin contacto. Pendiente de definir población y configuración; no «aprobado» por caber una figura |

Son ensayos **exploratorios**, sin potencia estadística establecida. Ajustar carga y montaje
al equipo disponible y a su responsable técnico antes de energizar. Para carga real de cubeta
usar aparejo y banco dimensionados, nunca una persona sosteniendo la carga. Toda intervención
sobre movimiento requiere bloqueo y contención. E2/E3 pueden usar agua limpia y medio inerte;
no necesitan residuos, animales, digestión ni percloratos.

**Datos crudos:** `ensayos/datos-sustrato.csv`, `datos-mecanica.csv`, `datos-agua.csv` y
`datos-aislamiento.csv` contienen sólo encabezados. Registrar ID de montaje, fecha, operador,
instrumento, calibración, unidad, incertidumbre, condición y archivo de foto/vídeo; conservar
originales. No reemplazar una casilla vacía por cero. Para E4 guardar plano anotado y vídeo,
con ruta e interferencia identificadas. Si cambia el criterio después de observar datos,
conservar la versión original y explicar el cambio.

Para E2: $R=I-O-\Delta S$; con entradas independientes,
$u_R=\sqrt{u_I^2+u_O^2+u_{\Delta S}^2}$. Si comparten tara/instrumento, incluir covarianzas
antes de usar esa fórmula. Error numérico cero no significa recuperación 100 %.
En E1: $\tau=Fr$, $u_\tau^2=r^2u_F^2+F^2u_r^2$ sólo si son independientes. El dinamómetro
mide fuerza a la velocidad/condición registrada; una lectura estática no es potencia eléctrica.

**Calendario desde la disponibilidad real:** días 1–2 caracterización y plantilla de acceso;
3–5 banco sin carga y calibración; 6–8 carga autorizada e indexado; 9–11 agua/aislamiento;
12–14 repetición, análisis y registro de límites. Si no hay taller, cerrar protocolo y banco
digital sin inventar ensayo físico. Cultivos tempranos sólo como exploración separada; un
ciclo largo no se declara terminado en 14 días. Biología/animales/percloratos requieren laboratorio
y supervisión competente, con protocolo específico aún pendiente.

## 5. Fuentes y condición de aceptación

- [NASA-STD-3001 Vol.2, §8.3, V2 8013/8014](https://www.nasa.gov/reference/8-0-architecture-vol-2/),
  leído el 20 sep: dimensionar rutas por tarea, personas/equipo y emergencias, sin obstáculos.
  Es referencia de diseño; no aporta una altura universal que certifique nuestro casco.
- [OCHMO-HB-004 Rev.A](https://www.nasa.gov/wp-content/uploads/2025/09/ochmo-hb-004.pdf),
  portada, pp.5–10 y 19–20 leídas. Población, postura, alcance y entorno importan; una figura
  de altura fija no demuestra acomodación de todos los usuarios. Sustituye §4 del HIDH Rev.1,
  no toda la norma NASA. No se presenta OCHMO-TB-049 como documento leído.
- P1/P2: se reutilizan fuentes y se recalculan resultados; no se afirma una nueva lectura de
  todas las publicaciones. HRT, ST, rozamiento, masas y reserva estructural continúan supuestos.

```bash
python3 analysis/milpa360_p3.py
python3 analysis/milpa360_p4.py
python3 analysis/verificar_p4.py
python3 analysis/verificar_geometria.py
node analysis/verificar_modelo_geometrico.cjs
node analysis/verificar_p3.cjs
node --experimental-websocket analysis/verificar_p3_navegador.mjs
```

**Cierre documental S3:** cálculos, correcciones y protocolos reproducibles. **P4 físico abierto:**
B6/B7, B15–B19 requieren recursos/datos, ruta completa y selección mecánica. S4 puede avanzar
con una lista preliminar y tres presupuestos separados, sin comprar ni dar cantidades finales
al diseño marciano. El rediseño visual profundo queda pautado en continuidad tras este hito.

**Continuación S4:** [costes y piloto Chiapas](P4-PRESUPUESTO-CHIAPAS.md) ya separa la
maqueta 1:10, el piloto terrestre y recursos marcianos con fórmulas y pendientes visibles.
Ninguno equivale al coste cerrado de un banco mecánico E1 a carga real: requiere diseño y
cotización propios. S5 es el siguiente bloque de integración; los ensayos siguen sin datos.
