# MILPA-360 · memoria y defensa para revisión

BioMars Chiapas · Aldo Fabio Contreras Marroquín · S5, 21 sep 2026 UTC.
Base de ingeniería: P4-S3-2026-09-20. Base Git de esta integración: a24a687.
**Versión de trabajo. Formato de Madrid, acceso B19 y validación física pendientes.**

## 1. Resumen de la propuesta

MILPA-360 propone recuperar sustrato y residuos animales mediante estaciones de
tratamiento y cultivo conectadas por un carrusel de cartuchos. La revisión B emplea
un anillo de 20 recipientes idénticos: ocho posiciones de regeneración y doce de
cultivo. Cada lote conserva identidad, historial y una autorización explícita antes
de entrar a cultivo. Sin un resultado aceptable, debe permanecer retenido.

El resultado disponible es un concepto de ingeniería con cálculos reproducibles y
un demostrador digital. No existe evidencia registrada de funcionamiento físico,
seguridad alimentaria ni operación marciana. El aporte calculado es complementario:
447 kcal/día entre huevo y vegetales para seis personas, bajo supuestos terrestres
de régimen productivo. Equivale a 2.46% de 18,210 kcal/día, con ración de aves externa.

Las tres partes del Reto Unificado siguen representadas: intervención animal en el
sustrato, aprovechamiento de residuos y cultivo resistente. La conexión conceptual
no demuestra cumplimiento del 100% de residuos ni inocuidad. La matriz mantiene
esas brechas y las condiciones específicas de Madrid por confirmar.

## 2. Requisitos y fronteras

Las bases originales del repositorio son autoridad para el concurso local. No se
sustituyen por la interpretación de un agente. Los nueve criterios conocidos tienen
igual peso: impacto, creatividad, diseño, culminación, aprendizaje, validez,
relevancia técnica, presentación y retorno a la humanidad. El formato provisional
del pitch es cinco minutos; fecha, idioma, entrega y delegación requieren confirmación.

La matriz contiene 27 requisitos obligatorios: uno documentado con evidencia,
24 parciales, uno pendiente y uno por confirmar. Esa clasificación no constituye
un porcentaje de validación científica ni una probabilidad de ganar.

La frontera agrícola recibe electricidad, agua acondicionada, semillas, materiales,
ración de aves y sustrato pretratado. El hábitat aporta servicios que aún deben
dimensionarse. ISRU incluye extracción y descontaminación inicial fuera del módulo.
Las provisiones iniciales cubren arranque y la alimentación no producida. Las heces
humanas están fuera del caso nominal y no se contabilizan como recurso gratuito.

Fuentes de requisitos y páginas: [matriz-requisitos.md](matriz-requisitos.md).
La referencia NASA documenta alcance de diseño, no certificación del proyecto.

## 3. Geometría y mecanismos

| Magnitud nominal | Valor | Tipo / límite |
|---|---:|---|
| Diámetro / altura del casco | 4.56 / 2.20 m | Geometría digital |
| Piso / borde del cartucho | 0 / 0.62 m | Datum común |
| Radios de cartucho | 1.58 a 2.18 m | Un anillo |
| Sector / paso | 16.92° / 18° | Holgura angular de proyecto |
| Área útil por cartucho | 0.25715 m² | Reborde de 35 mm descontado |
| Cultivo / sustrato total | 3.0858 / 5.1429 m² | No son área de piso |
| Sustrato por cartucho | 84.9 kg | Densidad operativa nominal supuesta |
| Masa móvil total | 1977.2 kg | Incluye supuestos de tara y estructura |
| Pasillo central nominal | 0.90 m | Entrada/evacuación sin demostrar |
| Figura de escala | 1.75 m | No representa toda la población |

La geometría de sectores procede de A = (ro² - ri²) × ángulo (rad) / 2. La superficie útil
descuenta radios y ángulos del reborde; masa = área útil × profundidad × densidad.
Gravedad menor reduce peso, pero no masa ni inercia. El cálculo de accionamiento
aplica I = m(ro² + ri²)/2 y par de inercia I × aceleración angular, más resistencias
y un factor de diseño supuesto. El par preliminar nominal es 379.6 N m en Tierra
y 152.9 N m en Marte. No selecciona un motor ni verifica estructura.

El mismo cartucho pasa de etapa al indexar; no se teletransporta sustrato entre
sectores incompatibles. El riego acompaña al anillo y opera con independencia del
indexado. Junta rotativa, extracción, guiado, bloqueo y limpieza requieren diseño.
El despiece de pantalla separa grupos para verlos: no representa una maniobra real.

### B19: comparación adicional de entrada

| Candidata | Qué resuelve | Qué falta / decisión |
|---|---|---|
| Cruce elevado a 0.80 m, techo 2.90 m | 2.10 m sobre puente | Choca con dosel y estaciones; aumenta envolvente. No adoptada |
| Sector de servicio desmontable de dos posiciones | Abertura angular nominal de 36°: cuerda interior 0.976 m antes de estructura | Extraer unos 180 kg de cartuchos, retirar guía, depósito exterior, esclusa y enclavamientos. Preferida para estudiar, sin adoptar |
| Carrusel abierto o recipientes fijos | Evita cruzar un anillo continuo | Cambia transporte, número de posiciones y ciclo. Alternativa si falla el sector desmontable |

La cifra 0.976 m = 2 × 1.58 × sin(18°) es geométrica. No equivale a ancho útil de
evacuación: falta descontar herrajes, ropa, manos, herramientas y condiciones de
emergencia. La retirada de dos recipientes de cultivo deja provisionalmente diez,
es decir 2.5715 m², si no se cultivan fuera. No se mantienen rendimientos de doce
recipientes en un escenario que sólo tenga diez activos.

La candidata desmontable requiere carrusel detenido y bloqueo mecánico independiente
del software, entrada sólo después de retirar obstáculos, y ruta que permanezca
abierta durante toda ocupación, incluso al fallar energía. Se necesita una revisión
de seguridad y un diseño medido del útil de extracción. S5 conserva la geometría
vigente y señala la intercepción del anillo; **B19 sigue abierto**.

### Envolventes B15–B18

No hay datos suficientes para autorizar dosel, aviario ni instalaciones sobre la
trayectoria. S5 sustituye postes de estaciones que atravesaban el barrido nominal
por ménsulas esquemáticas desde el casco. Falta comprobar la envolvente completa,
las cargas y el dosel antes de fabricar. El tendido de tuberías tampoco demuestra altura libre humana. La malla
permite ver estas brechas y no las oculta como una instalación terminada.

El digestor necesita 63.86 L útiles / 85.15 L totales en el caso nominal preliminar;
la envolvente combinada HRT/ST llega a 178.3 / 237.7 L. Los tanques de la escena
siguen siendo símbolos de equipos, con dimensionado pendiente. El reactor de
salmuera no tiene volumen definido. No deducir capacidad de un render.

## 4. Balances y fundamentos

| Salida o entrada nominal | Resultado diario terrestre | Límite |
|---|---:|---|
| Vegetales comestibles | 90.2 kcal | Área repartida entre especies |
| Huevos | 357.2 kcal | Postura supuesta; datos terrestres |
| Total humano | 447.4 kcal | 2.46% de necesidad de seis personas |
| Ración importada de aves | 0.7704 kg | No se descuenta por larvas no validadas |
| Luz de cultivo | 10.476 kWh eléctricos | Sin auxiliares ni térmica |
| Metano | 0.02005 m³ | Rendimientos y condiciones de gas supuestos |
| Biogás | 0.1994 kWh químicos | No son kWh eléctricos netos |
| Conversión eléctrica hipotética | 0.07975 kWh brutos | 40% supuesto, antes de auxiliares |
| Transpiración de cultivo | 6.30 L | No equivale a recuperación potable |

Energía química del gas = volumen de CH4 × PCI / 3.6. La electricidad depende de
eficiencia y auxiliares. La luz se calcula a partir de PPFD, fotoperiodo, superficie
y eficacia de luminaria; no se escala energía por una animación. La comparación
con nominal es sensible a rendimiento, fracción comestible, fotones y ciclos.

Los residuos se reparten entre rutas antes de estimar productos. Materia húmeda,
materia seca y sólidos volátiles no se intercambian. La misma masa no aporta a la
vez su rendimiento íntegro de larvas y de metano. Los balances de agua, sales,
elementos, gases y térmica aún no cierran el hábitat completo.

Lavar transfiere perclorato al agua; no lo destruye. La reducción de perclorato a
cloruro necesita un donador de electrones y control de condiciones. El balance
formal ClO4⁻ + 8 H⁺ + 8 e⁻ → Cl⁻ + 4 H2O expresa reducción, no producción de
oxígeno respirable disponible. Deben verificarse residual, salinidad, subproductos
y seguridad del proceso. Salmuera y metanogénesis se mantienen separadas.

Musgo verde o una señal MFC no certifican ausencia de percloratos, patógenos ni
seguridad del alimento. Los umbrales y métodos analíticos deben fijarse con un
laboratorio competente antes de liberar sustrato. El control digital puede retener
un lote, pero no reemplaza el análisis químico o microbiológico.

Fuentes, especies, condiciones y limitaciones se conservan en
[registro-afirmaciones.csv](registro-afirmaciones.csv) y
[P1-INGENIERIA.md](P1-INGENIERIA.md). Sus tablas históricas de 4.00 m² están superadas;
las cifras anteriores usan la configuración S3 regenerada.

## 5. Simulación y evidencia disponible

El simulador tiene reloj de paso fijo, lotes e inventarios reproducibles. Incluye
bomba detenida, atasco, autorización rechazada y menor disponibilidad energética
durante tormenta. El daño persiste después de reparar. La comparación de siembra
escalonada/sincronizada emplea iguales recursos y controles sin fallo; no programa
el porcentaje ganador. Las reglas de respuesta siguen siendo ilustrativas.

Las pruebas digitales verifican áreas, alturas, posiciones, exportación de mallas,
determinismo, inventarios no negativos, controles y arranque sin conexión. No son
ensayos mecánicos, agronómicos ni de resistencia. El objetivo de 30 FPS a 1080p debe
medirse en el equipo del evento; SwiftShader sólo prueba funcionamiento por software.

La escena S5 añade cartuchos identificables, soporte y juntas ilustrativos, corte
del casco, señal física de acceso pendiente y selección de lote. La explosión
separa grupos visualmente y pausa el modelo. El paisaje es procedural, no topografía
de un emplazamiento medido. Las piezas y fotos digitales se rotulan como renders.

## 6. Validación terrestre, costes y Chiapas

Están preparados protocolos de indexado con carga, agua limpia, aislamiento de
lote y cultivo exploratorio. Los CSV de ensayos siguen vacíos. Registrar datos
crudos, instrumentos, calibración, fecha, incertidumbre y repeticiones independientes
antes de sacar conclusiones. La maqueta 1:10 no prueba mover 1.98 toneladas.

El piloto propuesto para un huerto periurbano de Tuxtla compara riego manual y
goteo con aislamiento en seis recipientes de rábano, tres pares independientes.
Sitio, operador y variedad están por confirmar. Indicadores: agua nueva/kg de
cosecha utilizable, tiempo/kg, energía y supervivencia. Sin cosecha no se calcula
L/kg. El diseño es exploratorio, no una demostración del sistema completo.

S4 separa presupuesto Madrid, piloto Chiapas y recursos del concepto marciano.
Hay 19 partidas Madrid y 20 Chiapas. Las sumas conocidas con fiscalidad resuelta
son 1,050.96 y 139.20 MXN respectivamente: **subtotales incompletos, no costes de
proyecto**. Faltan fabricación, análisis, integración, horas, fletes y límite de gasto.
Ocho referencias públicas no equivalen a cotizaciones. La contingencia provisional
del 20% sólo se aplica a una base completa. No hay ROI ni precio de vuelo defendible.

Ver [P4-PRESUPUESTO-CHIAPAS.md](P4-PRESUPUESTO-CHIAPAS.md) y el XLSX S4. El dato de
INEGI sobre riego estatal contextualiza el piloto; no demuestra ahorro en Tuxtla.

### ODS: contribución propuesta y límite

**ODS 2, hambre cero:** estudiar producción de alimento fresco. El módulo no cubre
la dieta de la tripulación ni demuestra seguridad alimentaria comunitaria.
**ODS 6, agua limpia y saneamiento:** medir riego y recuperación en el piloto.
No produce agua potable demostrada ni ha tratado efluentes pecuarios.
**ODS 12, producción y consumo responsables:** seguir materiales y descartes por
lote. No acredita recuperación del 100% ni sustituye ración animal importada.
Estos vínculos son objetivos del proyecto, no impactos medidos.

## 7. Documento Concepto: qué aprendimos

El pase a la final es información comunicada por el equipo. Esta cronología no
atribuye cambios a comentarios del jurado que aún no se han recibido documentalmente.

| Corte | Cambio | Evidencia / aprendizaje |
|---|---|---|
| Hackathon | Dos anillos y narrativa integrada de residuos/cultivo | Se conserva como historial; no se presenta como validación |
| P0 | Auditoría de bases y registro de afirmaciones | Separar requisito, hipótesis, cálculo y medición |
| P1/P2 | Anillo B; reactor de salmuera separado; control por lote | Eliminar incompatibilidad de piezas y evitar mezclar procesos sin evidencia |
| S1/S2 | Estado reproducible, daños persistentes y demo local | Una comparación debe usar recursos iguales y mostrar su modelo |
| S3 | Piso y cama separados; área útil con reborde | La geometría redujo alimento estimado y dejó visible la entrada pendiente |
| S4 | Presupuesto trazable y piloto limitado | Precio parcial no es presupuesto cerrado; render no es experimento |
| S5 | Defensa y modelo visual sincronizados | Mostrar mecanismos y brechas en la misma revisión |

La hipótesis diferencial es vincular historia del lote, tratamiento y autorización,
con aislamiento para limitar contaminación cruzada. Debe compararse contra sistemas
más simples. MELiSSA y otros ciclos biológicos son antecedentes, no avales del equipo.
No se declara patente ni originalidad absoluta. Una revisión profesional de propiedad
industrial y cronología de divulgación sigue pendiente; el repositorio ya es público.

## 8. Guion provisional de cinco minutos

### 0:00–0:30 · Lámina 1 · La propuesta

Somos BioMars Chiapas. MILPA-360 es una propuesta para conectar recuperación de
sustrato, aprovechamiento de residuos animales y cultivo. Presentamos un concepto
de ingeniería y su demostrador digital. Nuestro objetivo hoy es explicar cómo
funciona, cuánto puede aportar y qué falta demostrar antes de construir un piloto.

### 0:30–1:00 · Lámina 2 · Las tres funciones

Un lote de sustrato recibe un tratamiento, pasa por estaciones y llega a cultivo
sólo después de control de calidad. Los residuos se asignan a rutas concretas:
larvario, digestión y retención. La salmuera permanece en un reactor separado.
Este esquema conserva las tres partes del reto; todavía no demuestra recuperación
del cien por ciento ni seguridad sanitaria. Son requisitos que mantenemos abiertos.

### 1:00–1:40 · Lámina 3 · Mecanismo y escala

Ahora usamos veinte cartuchos idénticos en un solo anillo. El mismo recipiente
cambia de etapa: evitamos transferencias imaginarias entre bandejas distintas.
La configuración tiene 3.086 metros cuadrados útiles de cultivo y un diámetro
nominal de 4.56 metros. La masa móvil estimada es casi dos toneladas. La figura
humana da escala, pero el anillo aún corta la entrada. Estudiamos un sector de
servicio desmontable; no presentamos el acceso ni la resistencia como resueltos.

### 1:40–2:15 · Lámina 4 · Control por lote

Cada lote conserva historial. Sin análisis aceptable permanece retenido. Si se
rechaza, el modelo permite aislarlo con recursos de reemplazo limitados. Una bomba
averiada reduce agua disponible y una tormenta reduce energía para iluminación.
El daño no desaparece al pulsar reparar. Estas reglas permiten discutir operación
y fallos, pero todavía no están calibradas con cultivos reales.

### 2:15–2:55 · Lámina 5 · Aporte y dependencias

Con los supuestos terrestres actuales, huevo y vegetales suman unas 447 kilocalorías
al día: 2.46 por ciento de lo necesario para seis personas. Las aves consumen
ración importada. La iluminación requiere unas 10.48 kilovatios hora eléctricos
al día. El biogás aporta 0.199 kilovatios hora químicos; no es electricidad neta.
Por eso necesitamos provisiones y energía externa. El valor a investigar está en
alimento fresco y recuperación controlada, con sus costes medidos.

### 2:55–3:25 · Lámina 6 · Qué se verificó

Ya podemos regenerar parámetros, cálculos y planos, ejecutar la demo sin Internet
y repetir escenarios. No tenemos todavía ensayos físicos registrados. Preparamos
pruebas de movimiento con carga, riego y aislamiento. Primero debemos comprobar
el mecanismo y la medición; los procesos biológicos y sanitarios exigen supervisión
competente. Una captura del modelo no reemplaza esos resultados.

### 3:25–4:05 · Lámina 7 · Chiapas

Proponemos comenzar en un huerto de Tuxtla con una comparación pequeña de riego
manual y goteo con aislamiento. Son seis recipientes, en tres pares independientes.
Mediremos agua nueva por kilo utilizable, trabajo y energía. Sitio, operador y
línea base están pendientes. Así podremos decidir con datos si una función del
concepto merece crecer. No prometemos ahorro antes de obtener una cosecha comparable.

### 4:05–4:35 · Lámina 8 · Recursos

Separamos los costes de la maqueta Madrid, el piloto Chiapas y el concepto marciano.
Tenemos partidas y algunas referencias públicas; faltan cotizaciones y fabricación.
No usamos un subtotal como precio del proyecto ni un precio comercial como coste
de equipo espacial. El siguiente gasto debe responder a la incertidumbre que
queramos reducir, especialmente acceso, accionamiento y medición del agua.

### 4:35–5:00 · Lámina 9 · Siguiente demostración

La siguiente evidencia que necesitamos es una transferencia o acceso practicable,
un indexado medido y una prueba independiente de riego e aislamiento. MILPA-360
conserva la idea de conectar procesos mediante el movimiento del sustrato. Ahora
la acompañamos con límites, trazabilidad y ensayos que permitirán decidir si esa
complejidad aporta una ventaja real frente a una solución más simple.

## 9. Respuestas para el jurado

**¿Por qué un carrusel?** Para que un recipiente pase por estaciones fijas sin
trasvasar su contenido. Debe demostrar que esa ventaja compensa masa, limpieza y
mantenimiento frente a recipientes fijos; la comparación física está pendiente.

**¿Cómo se mueve el sustrato?** Dentro del mismo cartucho, con indexado de 18°.
La extracción de mantenimiento necesita un útil y una ruta diseñados. Los rodillos
dibujados sólo explican el soporte propuesto, no son componentes seleccionados.

**¿Cómo entra una persona?** Hoy no hay ruta de entrada y evacuación completa.
El anillo interrumpe el paso. Se estudia un sector desmontable con bloqueo del
carrusel y espacio de depósito, sujeto a ingeniería y revisión de seguridad.

**¿Alimenta a seis personas?** El nominal calculado cubre 2.46% de sus kcal, en
régimen productivo supuesto; el arranque y el resto necesitan provisiones externas.

**¿Qué comen las aves?** Se contabilizan 0.7704 kg/d de ración externa. No contamos
larvas como sustitución hasta verificar nutrición y seguridad.

**¿Es autosuficiente en energía?** No. Sólo la luz demanda 10.48 kWh eléctricos/d;
el biogás nominal contiene 0.199 kWh químicos/d antes de conversión y auxiliares.

**¿Cómo descontaminan el regolito?** Se propone pretratamiento inicial completo
fuera del módulo y reacondicionamiento posterior. Lavado y biorreducción necesitan
balances y ensayos. Ningún color de musgo sustituye una medición del contaminante.

**¿Qué ocurre con sales y patógenos?** Salmueras, digestato y biomasa se retienen;
requieren tratamiento, análisis y purgas. HEPA no elimina contaminantes disueltos.

**¿Qué sucede al atascarse o contaminarse?** El modelo detiene indexado o retiene
el lote. La reparación no borra daño. Falta demostrar físicamente bloqueo seguro,
acceso, aislamiento y capacidad real de reservas.

**¿Quién mantiene el sistema?** No hay operador ni carga de trabajo medidos.
El piloto debe registrar minutos por tarea, instrumentos y mantenimiento. La ruta
de extracción no se acepta por una cámara que oculte obstáculos.

**¿Cuánto cuesta?** Los tres presupuestos están incompletos. Hay una lista trazable
y precios públicos fechados, pero no un total de compra ni una estimación de vuelo
suficientemente respaldados.

**¿Qué es nuevo?** Se plantea evaluar control e historial por lote asociados al
carrusel y al aislamiento. Conectar organismos no demuestra novedad: faltan
comparación de antecedentes por mecanismo y revisión profesional.

**¿Qué demostraron?** Funcionamiento digital, cálculos y geometría bajo supuestos.
No se han documentado ensayos físicos, inocuidad, productividad marciana ni seguridad.

## 10. Trazabilidad de la defensa

| Lámina / afirmación | Evidencia reproducible | Tipo |
|---|---|---|
| 2: tres funciones y requisitos | Matriz RU y PDF original, páginas indicadas | Requisito / propuesta |
| 3: 20 cartuchos, área, escala | parameters.json; milpa360_p2.py; P-02/P-03 | Cálculo geométrico |
| 3: masa / acceso | milpa360_p4.py; mecánica S3; §3 de esta memoria | Cálculo / pendiente |
| 4: retención, daño y fallos | milpa360-modelo.js; verificar_p3.cjs | Prueba digital |
| 5: alimento y energía | milpa360_p1.py; balance en milpa360-datos.js | Cálculo con literatura |
| 6: pruebas / ensayos | PRUEBA-P3-NAVEGADOR.json; protocolos y CSV vacíos | Digital / pendiente físico |
| 7: piloto | P4-PRESUPUESTO-CHIAPAS.md §caso; no resultados | Propuesta |
| 8: presupuesto | presupuesto_s4.mjs; JSON; XLSX S4 | Estimación parcial |
| 9: novedad y siguiente prueba | Registro de afirmaciones; antecedentes P0/P1 | Hipótesis |

## 11. Fuentes y reproducción

Esta integración reutiliza fuentes leídas y registradas en P0/P1/S4; no presenta una
revisión bibliográfica nueva. El CSV conserva URLs, páginas y condiciones. Fuentes
decisivas: NASA BVAD Rev.2, tablas 4-86 y 4-89 a 4-91; DRA 5.0 §4; NASA-STD-3001
Vol.2 Rev.F, requisito V2 7003 y alcance V2 6253; PMC10113653, tablas 5–8; USDA
FoodData Central; estudio doi:10.1038/s41598-021-91882-0; INEGI CA2022 Chiapas p.15.

Ejecutar desde la raíz: python3 analysis/milpa360_p1.py; python3 analysis/milpa360_p2.py;
python3 analysis/milpa360_p4.py; python3 analysis/milpa360_p3.py; npm test --prefix
prototipo-3d. La prueba de navegador está en analysis/verificar_p3_navegador.mjs.
Los scripts de S5 y el LEEME del paquete detallan exportación y verificación.

No ejecutar todos los generadores sin revisar el diff. La configuración y su esquema
son la fuente dimensional; los archivos oficiales y versiones del hackathon se conservan.
La demo, el archivo Blender, los planos y la memoria son entregables digitales.
P5 queda abierto hasta validar brechas de aceptación; S6 será el cierre independiente.
