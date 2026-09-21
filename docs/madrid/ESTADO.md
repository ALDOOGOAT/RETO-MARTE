# ESTADO · preparación para Madrid

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
