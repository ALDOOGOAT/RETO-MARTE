# ESTADO · preparación para Madrid

> **V15 · gestos, animación y materiales, 28 sep 2026:** corregida la confirmación de gestos
> a frecuencias altas, el movimiento residual al perder la mano y el salto al reagarrar una pieza.
> Captura hasta 640 px, despiece estable y texturas con más detalle tonal. En Chrome visible con
> Intel integrada, a 1080p/DPR1: general 60.1 FPS, despiece 59.5, detalle 49.1 e inspección con
> despiece 55.3; rendimiento similar al antes. Webcam real y 28 fichas ES/EN comprobadas.
> La precisión con gestos reales del usuario aún requiere una secuencia etiquetada
> ([medidas, límites y capturas](PRUEBA-V15-PRECISION-FLUIDEZ.json)). Cambios locales sin publicar.
> El acceso local **MILPA-360** usa un perfil dedicado en Chrome con permiso de cámara guardado:
> dos aperturas verificadas sin diálogo, cámara apagada al salir de Gestos. Lanzador reproducible:
> `python3 analysis/abrir_simulador.py`.

> **Cifras de agua, 28 sep 2026:** «700 mil sin agua» sale del análisis. Viene de We Are Water
> (2024) y el INEGI no la publica. En su lugar: 24 % o menos de la población de Chiapas con agua
> diaria dentro de la vivienda frente al 53.4 % nacional (INEGI 12/26, 2024) y 8.05 % de las
> viviendas sin agua entubada (DOF, PNV 2026-2030, ENIGH 2024). P5 §6 lista candidatos para el
> piloto de Tuxtla, por contactar. Sólo texto y fuentes: no cambia parámetros ni cierra
> ensayos.

> **V11–V12 · agarrar piezas y realismo, 27 sep 2026:** con la pinza se saca una pieza del módulo
> (7 estaciones y un cartucho con sus plantas) para girarla, escalarla y leer su ficha, y vuelve
> exacta a su sitio. Riego con gotas visibles, luz LED hortícola fingida en el shader (sin luces
> nuevas), burbujas del biogás, polvo en los haces, hojas con ventilación y LEDs de estado. En la
> Intel: 64 fps con efectos frente a 63 sin ellos; P3 en verde ([evidencia](PRUEBA-V12-REALISMO.json)).
> Las gotas están exageradas por legibilidad. Sólo representación: no cambia parámetros ni cierra
> ensayos físicos.

> **V10 · gestos, 27 sep 2026:** modo opcional para controlar el módulo con la mano por webcam
> (MediaPipe desde CDN, sólo al pulsar «Gestos»): orbitar, zoom, desplazar, despiece continuo con
> dos manos (9 subsistemas) y fichas con costo por partida de `config/milpa360.presupuesto.json`
> («por cotizar» donde no hay precio). En la Intel: 60 fps con gestos frente a 63 sin ellos,
> inferencia a ~7 Hz, 0 HTTP al cargar y fallo limpio sin red
> ([evidencia](PRUEBA-V10-GESTOS.json)). Requiere internet la primera vez. Sólo interacción y
> presentación: no cambia parámetros ni cierra ensayos físicos.

> **Sustento, 26 sep 2026:** [qué cambiamos y por qué](P5-DEFENSA.md), §7 de la memoria.
> Deck 02: «7.4–10.9 t en 730 soles» pasa a 10.5 t en 730 días (2.39 kg/persona/día con
> empaque, BVAD; el 2.5 kg no tenía fuente) y el perclorato a ≈0.5 % (Phoenix: 0.4–0.6 %).
> Deck 08 deja de prometer retorno: conserva la transferencia subsistema por subsistema como
> hipótesis y añade el protocolo del piloto de Tuxtla (L/kg, min/kg, kWh/kg, partidas
> C01–C16), con INEGI en lugar de cifras de prensa (A45, A46, A48, A49). Sitio, operador,
> mentor y línea base siguen pendientes. «700 mil sin agua» queda sin fuente verificada;
> INEGI 2020 da ≈140 mil viviendas sin agua entubada. Deck histórico sin re-sembrar ni
> republicar (el PPTX S5 vigente no tenía estas cifras). Móvil: la isla de voz tapaba la
> fila de vistas (V9); en reposo queda como orbe en la esquina. Sólo texto, fuentes y
> maquetación: no cambia parámetros ni cierra ensayos físicos.

> **Actualización V9, 26 sep 2026:** [una calidad, fluida, con voz](MEJORA-VISUAL-V9.md).
> Sin selector de calidad ni posprocesado (costaba ~44 ms en la Intel integrada): módulo 80–106 FPS,
> planeta y acceso 165. Texturas 2K, planeta Viking 4K con relieve MOLA, isla de voz ES/EN.
> Sólo representación: no cambia parámetros ni cierra ensayos físicos.

> **Actualización V8, 25 sep 2026:** [personas escaneadas, luz y cámara](MEJORA-VISUAL-V8.md).
> Avatares Rocketbox con animación real, GTAO + brillo + ACES, terreno y rocas escaneados,
> cámara con resorte. 137.7 FPS alto / 94.7 FPS máxima locales; MP4 en `outputs/pitch-v8/`.
> Sólo representación: no cambia parámetros ni cierra ensayos físicos.

> **Actualización V7, 23 sep 2026:** [pitch breve y acabado visual](MEJORA-VISUAL-V7.md).
> Audio ES de 47.064 s y EN de 51.744 s; MP4 en `outputs/pitch-v7/`.
> Rostro escaneado, materiales, hojas y movimiento refinados. No cierra ensayos físicos.


> **Actualización visual V6, 23 sep 2026:** [cambios y pruebas](MEJORA-VISUAL-V6.md).
> Visores del repositorio con estudio, persona y vegetación refinadas, UI adaptable
> y comprobación digital exportable. No modifica parámetros ni cierra ensayos físicos.
> El registro V5 que sigue conserva el checkpoint anterior y sus paquetes.

**Sesión:** V5, presentación narrada y mejora de ambos visores.
**Fecha:** 21 sep 2026. **Rama:** `preparacion-madrid-p1`; base `f3b61e2`.
El commit que contiene este archivo identifica el checkpoint; push autorizado.
**Aceptación:** revisión digital para ensayo del equipo. La mejora visual no convierte
los requisitos físicos, el reglamento o las cotizaciones pendientes en cumplidos.

## Decisiones vigentes

Aldo pidió mejorar infraestructura representada, personas, legibilidad, explicaciones
y continuidad visual, terminar el visor de acceso y añadir una proyección automática
con voz en inglés y español. Se reutiliza Three.js local y la identidad Archivo/IBM
Plex; no se migra de motor ni se altera el concepto para embellecerlo. El diseño
conserva arquitectura B, veinte cartuchos, Ø4.56 m, altura 2.20 m, piso 0 y cama
0.62 m. Parámetros y `milpa360-modelo.js` permanecen sin cambios.

D1/D2 siguen ratificadas. El aporte alimentario nominal es 2.46% de las kcal; se
mantienen provisiones completas y treinta días de reserva. La narración distingue
unos 10.5 kWh/d de iluminación y 0.2 kWh/d químicos del biogás. La iluminación no
es el consumo total: el subtotal condicionado de auxiliares y térmica permanece
25.26 kWh/d, con cargas omitidas. Salmuera y metanogénesis siguen separadas.

La matriz mantiene 27 obligatorios: uno con evidencia documental, 24 parciales,
uno pendiente y uno por confirmar. Esta sesión mejora comunicación y pruebas
digitales de P3/P5; no cierra P4 ni acceso físico. `CIERRE-ACUMULADO.md` conserva
B1–B19 con responsables y datos faltantes. Las voces y animaciones no son mediciones.

## Cambios entregados

Los dos HTML comparten tipografía ampliada, fichas con una idea comprensible antes
del detalle y fuentes explicadas dentro de la aplicación. El público no necesita
abrir Markdown. La inspección técnica conserva cifras, límites y fórmulas MathML.
El acceso tiene estructura visual conectada, materiales, puertas interpoladas,
explicación por maniobra y controles con estados claros.

Una figura articulada común sustituye los bloques humanos. Consulta un instrumento,
camina con articulaciones y conserva apoyo visual en el piso. Su altura declarada
es 1.75 m; no equivale a un maniquí antropométrico validado. En B19, la ocupación
permanece activa hasta completar la salida. Carga y puertas se desplazan; extraer
requiere esperar la apertura. Las plantas interpolan crecimiento, daño y cambio de
ciclo. El exterior conserva su placa y soporte al abrir el corte.

La proyección principal tiene nueve capítulos; el acceso dispone de seis. Treinta
MP3 locales cubren ambos idiomas, con subtítulos por oración, pausa, volumen,
anterior/siguiente, pantalla completa y repetición. Piper 1.3.0 se instaló en un
entorno separado para generarlos; modelos y motor no viajan con la demo. Créditos,
fuentes de las voces, hashes y comando de regeneración están incluidos.

El recorrido principal ejecuta un escenario propio desde el sol 62. Sólo anillo
y cultivo comprimen el tiempo, a 0.65 soles por segundo de exposición. Al salir se
restaura el modelo de exploración intacto y pausado. El capítulo de acceso utiliza
el visor real embebido; su secuencia termina saliendo sin energía. El recorrido
dura unos cuatro minutos; el estudio independiente de acceso, unos cien segundos.

## Evidencia y versiones

`PROYECCION-V5.md` y `PRUEBA-PROYECCION-V5.json` reúnen las pruebas ejecutadas y sus
límites. Se revisan audio local ES/EN, pausa, recuperación de voz, cambios de idioma,
nueve vistas, acceso completo, fin del recorrido, móvil, fuentes y consola. Las
pruebas funcionales conservan determinismo, inventarios, fallos y enclavamientos.
Los treinta MP3 se decodifican completos y se cotejan con sus hashes/subtítulos.

La revisión interactiva es V5. Blender/GLB, memoria, deck y vídeo sin sonido se
conservan identificados como instantáneas V4; sus cifras siguen vigentes, pero no
contienen personas ni narración V5. Los ZIP se regeneran con manifiesto y se cotejan
contra una extracción limpia ejecutada sin Internet. Los cinco archivos preexistentes
sin seguimiento permanecen intactos. No se borraron PDFs oficiales ni evidencia.

## Siguiente acción exacta

Abrir `prototipo-3d/milpa360-simulador.html`, elegir idioma y pulsar **Proyección con
voz**. Ensayar con el equipo la lectura, sonido y comprensión de las nueve etapas.
Comprobar proyector, altavoces y GPU del evento. Después incorporar reglamento y
feedback reales, recursos, cotizaciones y ensayos E0–E5/B14–B19, con revisión
independiente. La aceptación física permanece abierta; no repetir auditorías o
instalaciones ya resueltas. El checkpoint en Git conserva el trabajo aun con la
memoria automática Claude sin cuota.
