# PRESUPUESTO · Sistema MILPA-360

## Prototipo funcional a escala 1:1 · Chiapas

**BioMars Chiapas** · Reto Marte UNACH 2026 · Precios en pesos mexicanos (MXN), septiembre 2026

---

## 0. Qué presupuesta este documento — y qué no

Este es el costo de **construir el prototipo funcional en la Tierra**: el módulo de Ø 4.56 m que
cierra el ciclo completo (codorniz → larva → biodigestor → cultivo) y que sostiene el argumento
de retorno a Chiapas. Es el que se puede armar, medir y enseñar.

**No es** el costo del hardware de vuelo. En una misión marciana la moneda no es el peso
mexicano sino la **masa de lanzamiento**, y ese número sí está documentado: el sistema existe
para evitar lanzar **7.4 a 10.9 toneladas** de alimento (`PLAN-MAESTRO-BIOMARS.md` §5, dato 2).
Poner un precio en dólares a hardware calificado para vuelo sería inventar una cifra.

### Cómo leer la columna «F» (fuente)

| Código | Significado |
|---|---|
| **C** | **Cotizado** — precio real de un proveedor consultado. La lista de fuentes va al final. |
| **D** | **Derivado** — calculado a partir de un dato cotizado (peso por m², precio por kg). |
| **E** | **Estimado de mercado** — precio de referencia. **Pedir cotización antes de comprometerlo.** |

De 27 partidas, **9 están cotizadas o derivadas** y cubren el **58 % del monto total**. Las
partidas E son las de menor riesgo (consumibles y comerciales de catálogo), pero conviene cerrar
las tres marcadas con ⚠ antes de fijar el presupuesto.

---

## 1. Parte 1 del reto · Aviario de codornices

*Regeneración del suelo por el animal. 24 aves en presión negativa sobre el anillo interior.*

| Concepto | Material / tipo | Cant. | Unitario | Total | F |
|---|---|---:|---:|---:|:-:|
| Pie de cría *Coturnix japonica*, hembras 3 semanas | Animal vivo, 4 líneas familiares | 24 | 30 | 720 | C |
| Módulo de jaula de postura (12 aves c/u) | Malla galvanizada + charola de recolección | 2 | 1,200 | 2,400 | C |
| Comederos y bebederos | Polipropileno grado alimenticio | 6 | 110 | 660 | E |
| Extractor 4" + filtro HEPA H13 | Fibra de vidrio plisada, carcasa ABS | 1 | 3,200 | 3,200 | E ⚠ |
| Panel acústico | Fibra mineral 50 mm | 4 m² | 290 | 1,160 | E |
| Ración de postura, 3 meses de operación | 24 aves × 23 g/día × 90 días = 50 kg | 50 kg | 18 | 900 | D |
| | | | | **9,040** | |

---

## 2. Parte 1b · Larvario de mosca soldado negra

*El puente que cierra el círculo: come el estiércol y devuelve frass y proteína.*

| Concepto | Material / tipo | Cant. | Unitario | Total | F |
|---|---|---:|---:|---:|:-:|
| Pie de cría *Hermetia illucens* | Animal vivo | 1 lote | 1,500 | 1,500 | E |
| Cubetas de cría 60 L | Polietileno de alta densidad | 6 | 260 | 1,560 | E |
| Malla mosquitera con marco | Poliéster + PTR ligero | — | 450 | 450 | E |
| Rampa de autocosecha | Lámina galvanizada doblada | 1 | 600 | 600 | E |
| | | | | **4,110** | |

---

## 3. Parte 2 del reto · Biodigestor y biosensores

*Convertir el 100 % del residuo en energía y abono — y, de paso, desactivar el perclorato.*

| Concepto | Material / tipo | Cant. | Unitario | Total | F |
|---|---|---:|---:|---:|:-:|
| **Biodigestor tubular llave en mano** (cámara B, metanogénica) | Reactor de geomembrana + tanques de entrada y salida + filtro de H₂S + válvula de alivio + trampas de agua + estufa de biogás | 1 | 25,000 | 25,000 | C |
| Cámara A anóxica (reactor de perclorato) | Tambo PEAD 200 L + sellos + bridas | 1 | 1,800 | 1,800 | E |
| Electrodos para celdas MFC | Fieltro de carbono 20 × 20 cm | 6 | 150 | 900 | E |
| Separadores MFC | Cerámica porosa | 3 | 180 | 540 | E |
| Cableado, resistencias de carga, LED testigo | Cable estañado + electrónica pasiva | — | 300 | 300 | E |
| | | | | **28,540** | |

> **Alternativa económica.** El biodigestor llave en mano es la partida más cara del proyecto.
> Autoconstruido —geomembrana por metro, dos tambos, válvulas y trampas de PVC— sale entre
> **7,000 y 9,000 MXN**, un ahorro de ~17,000. Se pierde la garantía, el filtro de H₂S de
> fábrica y la puesta en marcha asistida. Para un prototipo de demostración es defendible;
> para operación continua con tripulación, no.

---

## 4. Parte 3 del reto · Carrusel, riego y cultivo

*Cultivo estable pese al clima extremo. Aquí vive el diferenciador: la cinemática.*

### 4.1 Las 20 bandejas en sector anular

La partida más específica del proyecto, y la que hay que calcular en vez de estimar:

| Paso | Cálculo | Resultado |
|---|---|---|
| Superficie de lámina por bandeja interior | piso 0.50 m² + 2.84 m de perímetro × 0.22 m de alto | 1.13 m² |
| Superficie por bandeja exterior | piso 0.52 m² + 2.91 m × 0.22 m | 1.16 m² |
| Total 8 interiores + 12 exteriores | 9.0 + 13.9 | **23.0 m²** |
| Con 20 % de desperdicio (los sectores no anidan bien) | 23.0 × 1.20 | **27.6 m²** |
| Peso en calibre 20 | 27.6 m² × 6.80 kg/m² | **188 kg** |
| Material, a 8–14 MXN/kg | 188 kg × 8 … × 14 | **1,500 – 2,630 MXN** |

A eso se suma la **maquila**: corte por plantilla, rolado de los dos arcos, dobleces y soldadura,
en 20 piezas de forma no estándar. Es donde está el costo real, no en el acero.

| Concepto | Material / tipo | Cant. | Unitario | Total | F |
|---|---|---:|---:|---:|:-:|
| Lámina para bandejas | Galvanizada cal. 20 (0.95 mm, 6.80 kg/m²) | 188 kg | 12 | 2,250 | D |
| Maquila de bandejas | Corte, rolado, doblez y soldadura | 20 pzas | 300 | 6,000 | E ⚠ |
| Estructura y base | PTR galvanizado 1½" + placa | ~40 m | — | 4,800 | E |
| Corona giratoria y eje | Rodamiento de bolas + acero 1045 | 1 | 3,500 | 3,500 | E |
| Motorreductor de avance | 24 V CD, alta reducción (1 paso / 8 soles) | 1 | 2,800 | 2,800 | E ⚠ |
| Sustrato | Suelo degradado local + tezontle + composta | 2.3 m³ | 390 | 900 | D |
| Riego por goteo sobre pivote | Cinta PE, goteros, unión rotativa, bomba 12 V, filtro | — | 2,600 | 2,600 | E |
| Barras LED de cultivo | LED full-spectrum + disipador de aluminio | 6 | 520 | 3,120 | E |
| Semilla | Camote, frijol, rábano | — | 400 | 400 | E |
| Inoculante biológico | Micorrizas · *Rhizobium* · *Trichoderma* · *Bacillus* | — | 1,800 | 1,800 | E |
| | | | | **28,170** | |

---

## 5. Control y energía

| Concepto | Material / tipo | Cant. | Unitario | Total | F |
|---|---|---:|---:|---:|:-:|
| Controlador y sensores | ESP32 + DHT22 + 4 sondas de humedad + OLED + gabinete | 1 | 1,600 | 1,600 | E |
| Autonomía eléctrica | Panel 100 W + batería AGM 100 Ah + controlador 20 A | 1 | 6,500 | 6,500 | E |
| | | | | **8,100** | |

---

## 6. Resumen

| Bloque | MXN | % |
|---|---:|---:|
| 1 · Aviario de codornices | 9,040 | 12 % |
| 2 · Larvario de mosca soldado | 4,110 | 5 % |
| 3 · Biodigestor y biosensores MFC | 28,540 | 37 % |
| 4 · Carrusel, riego y cultivo | 28,170 | 36 % |
| 5 · Control y energía | 8,100 | 10 % |
| **Subtotal de materiales** | **77,960** | |
| Imprevistos y fletes (15 %) | 11,694 | |
| **TOTAL** | **≈ 89,700 MXN** | |

**≈ 4,850 USD** al tipo de cambio de referencia (18.5 MXN/USD, verificar a la fecha de compra).

### Variantes

| Escenario | Cambio | Total |
|---|---|---:|
| **Presentado arriba** | Biodigestor llave en mano | 89,700 |
| **Económico** | Biodigestor autoconstruido (−17,000) | ≈ 70,000 |
| **Mínimo demostrativo** | Además: 8 bandejas en vez de 20, sin LED, sin panel solar | ≈ 45,000 |

---

## 7. Maqueta de la hackathon (Fase 7, 45 minutos)

No confundir con lo anterior. Esto es el prototipo de cartón que se gira delante del jurado:

| Concepto | Material | MXN |
|---|---|---:|
| Dos discos de cartón (Ø 50 cm y Ø 30 cm) | Cartón corrugado / ilustración | 60 |
| Tornillo central con separadores | Ferretería | 25 |
| Tapitas y vasitos como bandejas | Plástico reciclado | 0 |
| Plastilina (codornices, plantas, larvas) | Plastilina escolar | 80 |
| Palillos y abatelenguas | Madera | 30 |
| Estambre de 5 colores (código de flujos) | Acrílico | 60 |
| Etiquetas y plumón | Papelería | 35 |
| LED con pila de botón (testigo MFC) | Electrónica | 25 |
| **Total** | | **315** |

---

## 8. Qué falta cerrar antes de comprometer el presupuesto

Tres partidas ⚠ concentran el mayor riesgo de desviación:

1. **Maquila de las 20 bandejas (6,000).** Es trabajo de forma no estándar; el precio por pieza
   puede duplicarse si el taller no tiene roladora. **Pedir tres cotizaciones** y llevar el plano
   acotado. Alternativa: termoformado en polietileno, que puede salir más barato en serie.
2. **Motorreductor (2,800).** Depende del par requerido, que a su vez depende de la masa total
   girando: **3.4 toneladas de sustrato** en el prototipo terrestre. Hay que calcular el par
   antes de cotizar; un motor subdimensionado no mueve el carrusel.
3. **Filtro HEPA H13 con extractor (3,200).** El precio varía mucho según caudal. Especificar
   primero el volumen del aviario y las renovaciones por hora.

---

## 9. Nota de honestidad sobre las cifras

Las partidas **C** y **D** provienen de proveedores consultados en septiembre de 2026 y de
cálculos hechos sobre la geometría verificada del módulo (§4.1 del plan maestro). Las partidas
**E** son precios de referencia de mercado: sirven para dimensionar el proyecto y pedir
financiamiento, **no** para firmar una orden de compra.

El precio del acero fluctúa con el mercado internacional; los proveedores consultados advierten
explícitamente que sus rangos cambian. Cualquier cifra de este documento con más de tres meses
debe re-cotizarse.

---

## Fuentes consultadas

- **Biodigestor tubular llave en mano** — Sistema.bio (Sistema Biobolsa), catálogo de producto:
  rango de 25,000 a 260,000 MXN según capacidad; el paquete incluye reactor, tanques de entrada
  y salida, filtro de H₂S, válvula de alivio, trampas de agua y estufa de biogás.
  <https://sistema.bio/nuestro-catalogo/>
- **Biodigestor rotomoldeado 1,300 L** — Tecnotanques: 16,662 MXN, polietileno bicapa reforzado.
  Referencia de comparación (es unidad de saneamiento, no de biogás).
  <https://tecnotanques.com/producto/biodigestor-1300-litros/>
- **Jaulas de postura para codorniz** — MercadoLibre México: rango de 950 a 2,000 MXN por módulo.
  <https://listado.mercadolibre.com.mx/animales/aves/jaulas-de-postura-para-codorniz>
- **Codorniz japónica viva** — 25 MXN por ave sin sexar (2 semanas); 30 MXN por hembra de
  3 semanas. Huevo fértil 3 MXN; codornaza 5 MXN/kg.
  <https://www.planetamexico.com.mx/venta-de-codorniz-japonica-de-dos-semanas-a-un-mes-disponibles-F120CC00F1ED747>
- **Lámina galvanizada, especificación y peso** — Aceros Crea: calibre 20 = 0.95 mm y
  6.80 kg/m²; calibre 22 = 0.80 mm y 5.64 kg/m².
  <https://aceroscrea.com/lamina-de-acero/lamina-galvanizada/>
- **Lámina galvanizada, precio por kilogramo** — QuiMiNet, cotizaciones por plaza: 8 MXN/kg
  (Puebla), 10 MXN/kg (San Luis Potosí), 14 MXN/kg (Urique, Chihuahua); 10,000 MXN por tonelada
  (San Nicolás). <https://www.quiminet.com/productos/lamina-galvanizada-2758174365/precios.htm>
- **Geometría del módulo y masa de sustrato** — `PLAN-MAESTRO-BIOMARS.md` §4.1 (comprobación de
  los 10 m² de bandeja en Ø 4.56 m; 2.3 m³ ≈ 3.4 t de regolito in situ).
- **Consumo de ración y masa de alimento evitada** — `PLAN-MAESTRO-BIOMARS.md` §5, datos 2 y 4.

---

*Documento generado para el Reto Marte UNACH 2026. Las cifras marcadas E requieren cotización
formal antes de su uso contractual.*
