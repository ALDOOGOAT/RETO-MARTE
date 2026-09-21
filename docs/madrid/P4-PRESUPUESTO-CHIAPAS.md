# P4 · S4 · costes y piloto de Chiapas

**Corte:** 20 sep 2026, base técnica S3 `b71a1b8`, rama `preparacion-madrid-p1`.
**Estado:** presupuestos preliminares reproducibles y caso piloto definidos; cotizaciones,
inventario, sitio y mediciones pendientes. No hay compras, socios ni financiación confirmados.

## 1. Resultado y alcance

La hoja [PRESUPUESTOS-MILPA360-S4.xlsx](../../outputs/madrid-s4-20260920/PRESUPUESTOS-MILPA360-S4.xlsx)
contiene Resumen, Madrid, Chiapas, Marte y Precios. Su fuente editable es
[`milpa360.presupuesto.json`](../../config/milpa360.presupuesto.json); el generador está en
[`presupuesto_s4.mjs`](../../analysis/presupuesto_s4.mjs). El catálogo conserva proveedor,
modelo/SKU, URL leída, fecha, moneda, tratamiento de IVA, limitaciones y alternativa.
Las partidas añaden función, cantidad, unidad, grupo, correspondencia técnica, recurso,
subtotal, desembolso, plazo y estado. Los fletes aparecen como pedidos independientes.

| Presupuesto | Frontera | Situación |
|---|---|---|
| Madrid | Maqueta 1:10, material, fabricación, control, agua limpia, medición, preparación y embalaje | 19 partidas; 6 tienen precio público; sólo 4 tienen también IVA resuelto |
| Chiapas | Banco de riego y cultivo exploratorio de seis unidades, instalación y un ciclo de operación | 20 partidas; 4 tienen precio público; sólo 1 tiene también IVA resuelto |
| Marte | Masa, volumen, potencia, consumibles, mantenimiento e integración del concepto | 17 entradas de recursos/brechas; sin total monetario defendible |

**No existe aún un total del proyecto.** Los importes de reposición calculables son
**1,050.96 MXN en Madrid** y **139.20 MXN en Chiapas**. Son sumas parciales de unas pocas
líneas, sin fabricación ni varios equipos, horas, envíos e impuestos pendientes. No son
opciones de compra por esos importes, cotizaciones, costes mínimos garantizados ni
porcentajes de cobertura monetaria. La hoja mantiene los totales como **Pendiente**.

Los presupuestos son independientes. Si se reutiliza una balanza/controlador entre etapas,
confirmar inventario y fechas, y repartir fletes una sola vez. No sumar tres fronteras distintas.
Viajes, vuelos, alojamiento y exposición no se presupuestan aquí: requieren fechas, ruta y
delegación confirmadas y pertenecen a logística, no al coste del sistema.

## 2. Revisión de los borradores históricos

Los cuatro archivos `PRESUPUESTO-*.md/pdf` del usuario permanecen intactos y sin seguimiento.

| Afirmación histórica | Hallazgo vigente | Decisión S4 |
|---|---|---|
| Prototipo terrestre ~89,700 MXN | BOM de geometría 8+12 anterior; mezcla referencias y estimaciones | No actualizar el total por inflación ni presentarlo como cotización del diseño actual |
| Misión por ~233.4 millones USD | Masa seca, tarifa de entrega a Marte, horas y desarrollo sin alcance contratado | Retirar de las conclusiones activas; conservar como historial |
| Sustituye unas 7 t de comida y se paga antes del sol 150 | P1/S3 calcula sólo 2.46% de kcal nominales y requiere alimento externo para animales | No sostener ahorro de masa neto ni retorno económico con esas cifras |
| Biogás de 2.9 kWh/d reduce factura eléctrica | Balance corregido: 0.199 kWh químicos/d; iluminación 10.48 kWh eléctricos/d, sin auxiliares | No compensar energías de distinta calidad ni monetizar autosuficiencia inexistente |
| Trabajo o consumibles sin desembolso = coste cero | Préstamos, voluntariado y provisiones tienen valor y disponibilidad por confirmar | Separar coste de reposición y desembolso; mantener horas y tarifas faltantes |

No se ha realizado análisis económico de rentabilidad. Los resultados S3 son cálculos
condicionados a hipótesis, no mediciones físicas ni prueba de desempeño marciano.

## 3. Precios, IVA y fórmulas

Consulta de fichas de proveedores: **20 sep 2026, hora de México**. El servidor puede
registrar 21 sep UTC. Ningún precio asegura stock ni entrega para la fecha de Madrid.

| ID catálogo | Referencia | Precio publicado MXN | Tratamiento usado |
|---|---|---:|---|
| PR01 | 3DMarket, PLA ECO, 1 kg, 1.75 mm | 299.00 | Más IVA; 346.84 por kg con tasa general 16% |
| PR02 | Lionchip UNO CH340 USB-C, SKU 497 | 139.20 | Impuesto incluido |
| PR03 | Lionchip 17HS3401S, SKU 458 | 172.84 | Impuesto incluido; motor sólo candidato para maqueta |
| PR04 | Lionchip A4988, SKU 361 | 45.24 | Impuesto incluido |
| PR05 | Lionchip ESP32 USB-C, SKU 503 | 172.84 | Alternativa a PR02; no se suma al controlador principal |
| PR06 | Steren MOT-300, microbomba | 49.00 | IVA por confirmar; no se toma descuento de mayoreo |
| PR07 | Steren MED-400, balanza 5 kg | 399.00 | IVA por confirmar; no se toma descuento de mayoreo |
| PR08 | Home Depot 140348, cubeta 18.92 L | 119.00 | IVA y precio Tuxtla por confirmar; la web mostró CP 04870 |

Las URL exactas y condiciones están en la hoja **Precios** y en el JSON. Se leyeron las
fichas completas pertinentes, no sólo resultados de búsqueda. El contrato de
[Steren](https://www.steren.com.mx/contrato-adhesion), §2.2 y anexo «Precios», menciona
moneda nacional e impuestos aplicables pero no despeja el tratamiento del importe de
estas fichas. Los [términos de Home Depot](https://www.homedepot.com.mx/terminos-condiciones),
§II B/D, confirman MXN y variación por ciudad; su aviso fiscal histórico no se toma como
confirmación del IVA de la partida. Esos precios quedan fuera de la base fiscal resuelta.

La tasa general usada **sólo para PLA explícitamente anunciado más IVA** proviene del
[SAT, Ley del IVA artículo 1](https://wwwmat.sat.gob.mx/articulo/19848/articulo-1).
No se aplica automáticamente a alimentos, servicios, donaciones ni partidas desconocidas.
No se convierte a EUR/USD; no hace falta inventar tipo de cambio o comisión.

Fórmulas de la hoja:

\[
p_{final}=\begin{cases}p_{publicado}&\text{IVA incluido}\\
\operatorname{redondear}(p_{publicado}(1+t),2)&\text{IVA excluido y tasa conocida}\\
\text{pendiente}&\text{sin definición fiscal}\end{cases}
\]

\[
C_i=\operatorname{redondear}(q_i p_{final,i},2),\qquad
C_{total}=C_{base}+\operatorname{redondear}(c C_{base},2).
\]

Una cantidad desconocida no produce cero. Cantidad cero representa exclusión explícita;
cantidad negativa exige revisión. `C_total` sólo aparece con todas las líneas calculables
y la lista cerrada. La reserva `c=20%` es una **preferencia provisional de planificación**
por fabricación y transporte aún inciertos: no tiene base estadística ni absorbe partidas
sin precio. Debe ajustarse después de cotizar. Está separada y no genera otro IVA.

El recurso de cada partida empieza **Pendiente**. Si se confirma compra, desembolso = coste;
si se confirma propio/donado/prestado sin pago, desembolso = 0 y se conserva el coste de
reposición. Para voluntariado se registran horas y tarifa equivalente, aunque el desembolso
sea cero. Alquileres, honorarios o gastos asociados se incorporan como líneas propias antes
de cerrar la lista. Cambiar «recurso» no acredita que el equipo lo tenga.

## 4. Madrid: opciones antes de fabricar

**Opción propuesta:** maqueta nominal 1:10 (Ø456 mm), 20 cartuchos idénticos + 2 repuestos,
corte de casco, seguimiento de lote, motor candidato y agua limpia. El número de piezas y
escala proceden de S3; **2 kg de PLA es una provisión de planificación**, no un laminado.
Tras S5 deben revisarse masa impresa, espesores realizables, montaje, impresión, fletes y
embalaje. Una cotización de impresión con material sustituye D01+D11; no se suma encima.

**Opción de menor alcance:** indexado manual y flujos representados en la demo offline.
Omitir grupos Motor y Agua sólo tras aceptar esa reducción: desaparecen pruebas de control
y bombeo en la maqueta. Todavía requiere estructura, impresión, rotulado, embalaje y horas;
no puede presupuestarse como «cuesta sólo el PLA». No afecta el concepto clasificado.

La cifra de par del título de PR03 no coincide claramente con su descripción; falta ficha
de fabricante y ensayo a la carga de la maqueta. El NEMA17 nunca se propone para las
1.98 t del anillo real. NEMA17 de Teckali es segunda referencia abierta (267 con símbolo `$`),
pero moneda, IVA y modelo equivalentes no quedaron confirmados: alternativa pendiente,
fuera de sumas. E1 a carga representativa requiere **banco mecánico distinto** y coste por
cotizar tras resolver accionamiento/estructura B18; no está incluido como si fuera la maqueta.

PR06 sólo alcanza 1 m de altura máxima publicada; no garantiza caudal de goteo con pérdidas.
PR07 indica resolución de 1 g desde 15 g y capacidad 5 kg: requiere comprobación con masas
patrón; no puede pesar un cartucho lleno. La cubeta PR08 presenta materiales contradictorios
en su ficha, por lo que se limita a recoger drenajes, sin certificar contacto alimentario.

## 5. Caso concreto de Chiapas y comparación

**Caso elegido para desarrollar:** pequeño huerto periurbano de **Tuxtla Gutiérrez**,
producción exploratoria de **rábano en seis recipientes**, comparando riego manual con
goteo medido e aislamiento de un lote. **Sitio, operador, variedad y apoyo agronómico no
confirmados.** La elección es una propuesta del proyecto, no un convenio ni diagnóstico
medido de una explotación existente.

El [Censo Agropecuario 2022, resultados definitivos de Chiapas, lámina 15 del PDF](https://www.inegi.org.mx/contenidos/programas/ca/2022/doc/ca2022_rdCHS.pdf)
registra 1,649,917 ha agrícolas de unidades activas: 73,796 ha de riego (4.5%) y
1,576,121 ha de temporal (95.5%). Son datos estatales, no medición de Tuxtla ni evidencia
de que nuestro dispositivo ahorre agua. Justifican delimitar a quién podría servir un piloto
de riego; no extrapolarlo a toda la agricultura de temporal ni atribuir causas de degradación.

**Transferencia terrestre:** manejo de agua, identificación y separación de lotes; no requiere
casco presurizado, suelo marciano ni carrusel de dos toneladas. Esta primera fase no valida
las tres partes del Reto Unificado ni tratamiento de residuos pecuarios. Esa extensión sigue
pendiente de socio/laboratorio, sanidad y comparación propia; RU-T-01 permanece parcial.

### Protocolo mínimo, exploratorio

1. **Antes de iniciar:** obtener sitio/operador, revisar agua/sustrato con agrónomo, fijar
   variedad, área y profundidad iguales, semilla del mismo lote y criterio de cosecha/comerciabilidad.
   Levantar línea base real de riego manual: aporte, drenaje, tiempo, supervivencia y cosecha.
   Los valores iniciales son **null**, no un ahorro supuesto.
2. **Banco hidráulico:** ejecutar E2/E3 de `P4-MECANICA-ENSAYOS.md` con agua limpia y
   recipientes sin plantas. Aforar bombas a altura real, comprobar fugas y corte de un circuito;
   ningún indicador de color equivale a medir perclorato. Registrar resultados en las plantillas
   existentes. No conectar retornos entre réplicas.
3. **Diseño:** tres bloques por posición/luz, cada uno con dos unidades independientes;
   asignar al azar una a manual y otra a goteo y registrar asignación antes de observar resultados.
   Son **tres réplicas por tratamiento**, elegidas por alcance exploratorio, sin potencia
   estadística demostrada. Plantas y pesajes dentro de un recipiente son submuestras.
4. **Control de recursos:** misma área, densidad, variedad, sustrato, ambiente y regla agronómica
   para decidir necesidad de agua. Mantener igual aporte de nutrientes por unidad; ajustar la
   concentración si cambia el agua, con revisión agronómica. Tres depósitos/circuitos de goteo
   independientes; recogida separada de drenajes en las seis unidades. Sin reutilización sanitaria
   no demostrada. Registrar lluvia y evitar entradas no medidas que invaliden la comparación.
5. **Medición:** pesar aporte y drenaje por unidad/día en alícuotas compatibles con la balanza;
   anotar masa, temperatura/densidad usada para convertir a volumen, instrumento y calibración.
   Registrar kWh, minutos de operación y cosecha comestible fresca según criterio fijado.
   Contar mortalidad y descartes. El consumo de agua no es sólo la diferencia aporte−drenaje:
   hay almacenamiento, evaporación y biomasa; no declarar cierre de balance sin medirlos.
6. **Indicadores:** litros de agua nueva/kg de cosecha utilizable (incluido descarte), minutos/kg,
   kWh/kg, kg/m² y supervivencia. Si no hay cosecha, L/unidad/día y supervivencia; L/kg queda
   pendiente o no definido ante cosecha cero. Comparar cada par, publicar diferencias y rango
   de los tres pares. No presentar probabilidad de éxito poblacional ni seleccionar sólo el mejor.
7. **Criterio propuesto antes del ensayo:** buscar al menos 10% menos aporte por unidad sin
   más de 10% de reducción de cosecha y sin mortalidad adicional atribuible al tratamiento.
   Son umbrales de decisión del equipo pendientes de ratificación, no efecto esperado ni
   norma agronómica. Exigir que el efecto exceda la incertidumbre de medida. El aislamiento
   debe detener el flujo del circuito rechazado dentro del límite de detección aforado y mantener
   los otros dos operables; tiempo máximo lo fija E3 antes de probar, no después.
8. **Calendario:** días 1–3 sitio/cotización/revisión; 4–7 montaje y agua limpia; después,
   cultivo hasta el estado de cosecha definido para la variedad y ambiente reales. Al día 30,
   informar sólo datos existentes; si aún no hay cosecha, continúa el ensayo. Revisar al cierre
   incertidumbre, fallos, trabajo adicional, agua y coste del ciclo antes de ampliar.

Usar la plantilla de agua existente para aforos. Al iniciar cultivo, conservar también datos
crudos por unidad/fecha/bloque/tratamiento, área, plantas, aportes, nutrientes, drenajes,
masa de cosecha/descarte, energía, tiempo, instrumento y observaciones. No se crea un CSV
con números ficticios ni se confunden renders con fotografías del ensayo.

## 6. Presupuesto marciano

La hoja Marte se regenera desde los JSON técnicos S3; no transcribe a mano sus masas.
La masa móvil incluye sustrato y no equivale a masa de lanzamiento. El volumen útil está
incluido en el total del digestor; no se suman ambos. No se añade una tarifa de lanzamiento
por kilogramo, desarrollo, integración, EDL o valor del tiempo de tripulación sin base.

Faltan estructura y masa seca, equipos fijos, agua y salmuera, iluminación/térmica/potencia
total, consumibles externos, repuestos, mantenimiento y alcance de cualificación. El coste
de tienda de una placa o bomba no representa hardware espacial. La tabla permite cotizar
ingeniería después de cerrar esas fronteras, sin fabricar una cifra de misión.

## 7. Reproducir, editar y verificar

Desde la raíz del repositorio, con el runtime de hojas ya instalado:

```bash
/home/aldo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node analysis/presupuesto_s4.mjs
```

`ARTIFACT_RUNTIME` permite indicar otra instalación de `@oai/artifact-tool`;
`S4_OUTPUT_DIR` y `S4_PREVIEW_DIR` permiten aislar salidas. No se añaden paquetes al proyecto.
El generador comprueba IDs, precios, IVA, cantidades vacías/cero/negativas y distinción de
recursos; restaura las entradas después de sus pruebas, recalcula, inspecciona errores y
exporta el XLSX. Genera previsualizaciones de las cinco hojas en `/tmp/milpa-s4-preview`.

**Verificación de esta sesión:** pasaron las comprobaciones del generador y el barrido de
errores de fórmula. Se corrigieron títulos recortados y se inspeccionaron las cinco hojas,
notas y fuentes. Un lector independiente (openpyxl del runtime, sólo lectura) reabrió el
XLSX y verificó importes con Decimal, fórmulas de primeras/últimas líneas y cero celdas de
error. LibreOffice 24.2 no tiene Calc instalado y no pudo abrirlo: **recálculo nativo en
Calc/Excel pendiente**. La aritmética probada en esta sesión es la de Artifact Tool.

Editar cantidades/recursos sólo con evidencia y actualizar notas. Añadir cotizaciones al
catálogo y **ampliar su rango de búsqueda al regenerar**; no pegar una fila fuera del rango y
dar por actualizada la hoja. Mantener los IDs únicos. Las filas de material, impresión y
fletes separadas evitan duplicar material incluido en una cotización o varios envíos del mismo
pedido. No cerrar la lista hasta completar también montaje, validación, energía y horas.

## 8. Pendientes y relevo S5

| Falta exacta | Responsable propuesto | Siguiente acción |
|---|---|---|
| B6: máximo MXN e inventario de recursos propios, donados, prestados y horas | Aldo/equipo | Responder solicitud y respaldar disponibilidad/coste |
| Planos y laminado de maqueta, mecanismos y embalaje | Equipo técnico | Tras cierre geométrico S5, cotizar fabricación y material sin duplicación |
| IVA de PR06–08, destino, stock y plazo de todos los pedidos | Equipo/compras | Confirmar antes de comprar; no se contactó a proveedores |
| Segundo proveedor equivalente de accionamiento, fabricación e instrumentos | Equipo/compras | Cerrar equivalencia técnica antes de comparar importes |
| Sitio/operador/variedad y línea base de Tuxtla | Equipo + agrónomo por designar | Aprobar alcance exploratorio y registrar datos reales |
| B7, B10, B15–B19 y mediciones mecánicas | Equipo/mentores | Mantener hipótesis visibles; no declarar estructura/acceso aprobados |
| Reglas de exposición y fecha/formato finales B1–B4 | Organizador vía equipo | Ajustar embalaje, maqueta y entregables |

**Siguiente bloque S5:** primero tratar entrada/evacuación B19 y envolventes de equipos
que afectan geometría; luego mejora visual profunda con Blender/Three y comparación
antes/después. Integrar memoria, Documento Concepto, planos, deck y vídeo con cifras S3/S4.
Si falta información física, avanzar relato/capturas independientes con la brecha visible;
no ocultar una entrada imposible con una cámara. Astra high integra y revisa; Sol medium
puede hacer pulido delimitado según disponibilidad, sin subagentes automáticos. P4 físico
y presupuesto de compra siguen abiertos hasta datos/cotizaciones; S4 no los certifica.
