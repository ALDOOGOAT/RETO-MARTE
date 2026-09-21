# ESTADO · preparación para Madrid

**Sesión:** revisión visual V2 después del cierre acumulado S0–S5/B19.
**Fecha:** 21 sep 2026. **Rama:** `preparacion-madrid-p1`; base `9552f04`.
El commit que contiene este archivo identifica el checkpoint. Push autorizado en esta rama.
**Aceptación:** candidata digital para revisión. La mejora visual no cierra ingeniería,
validación física, presupuesto ni condiciones finales de Madrid.

## Decisiones vigentes

Aldo pidió priorizar todos los modelos activos y facilitar su presentación en español
e inglés. Se conserva arquitectura B: 20 cartuchos idénticos, ocho estaciones de
regeneración y doce posiciones de cultivo, Ø4.56 m, piso 0 y cama 0.62 m. La
configuración dimensional y `milpa360-modelo.js` no cambiaron en V2. B19 mantiene
su vestíbulo como candidata separada; no se incorpora como acceso aceptado.

Siguen D1/D2, provisiones completas sin descontar cosechas, reservas de 30 días y
separación de salmuera/metanogénesis. El aporte nominal es 2.46% de kcal; 25.26 kWh/d
es un subtotal eléctrico con hipótesis y cargas omitidas. Las decisiones y límites
acumulados están en `CIERRE-ACUMULADO.md` y `CALCULOS-CIERRE.md`. El piloto Tuxtla
permanece exploratorio, sin sitio, operador ni datos inventados.

## Cambios entregados

El simulador organiza Marte, módulo, acceso y atlas en una navegación común. Añade
introducción breve, recorrido de cinco pasos, vistas rápidas, ayuda, teclado,
pantalla completa, calidad gráfica y adaptación móvil. Las fichas distinguen datos
publicados, cálculos, propuestas y escenarios. La inspección agrupa información
avanzada y permite conservar lote/fallo/escenario al cambiar idioma.

`milpa360-contenido.js` comparte las cifras vigentes entre ambos idiomas y atlas.
Se sustituyeron valores históricos incrustados: 6.30 L/d de transpiración, 10.48 kWh/d
de luz y 0.199 kWh/d de biogás químico, entre otros. `milpa360-idiomas.js`,
`milpa360-traducciones.js` y `milpa360-interfaz.css` mantienen traducción local y estilo
común. ES/EN cubre controles, fichas, mensajes y rótulos del modelo. Las fuentes,
memoria y deck conservan español; no se presenta una traducción documental completa.

El módulo incorpora materiales y acabados de equipos, juntas, bridas e instrumentación
esquemática. Se corrigieron rótulos invertidos al mirar el dorso de las placas. B19
muestra con mayor claridad cargas, reserva del núcleo y pasos de la maniobra. El
atlas reemplaza la antigua calculadora simplificada de blindaje por límites explícitos,
retardo interactivo y una explicación del ciclo y aporte alimentario.

El globo usa el JPEG Viking de NASA/JPL-Caltech procesado por USGS, archivado con
URL, fecha, crédito y SHA-256. Los marcadores se ajustan a las UV de SphereGeometry;
son referencias aproximadas, no cartografía de precisión ni selección validada de sitio.
El terreno local sigue siendo ilustrativo. `COMPARACION-VISUAL-V2.html` conserva
capturas anteriores y actuales. No se instalaron dependencias innecesarias.

## Verificación y archivos de presentación

Pasaron los tests P3/B19 y geometría. Chrome verificó controles, fallos, inventarios,
cambio de idioma, formularios, móvil, teclado y atlas sin red. Las pruebas y capturas
están en `PRUEBA-P3-NAVEGADOR.json`, `PRUEBA-B19-NAVEGADOR.json` y
`PRUEBA-VISUAL-V2.json`; no hay errores de consola ni solicitudes HTTP en esos recorridos.
Los tres recorridos pasaron desde extracción limpia; S6 coteja los archivos del paquete.
SwiftShader es renderizado por software; no acredita el objetivo de 30 FPS del evento.

Blender 5.2/MCP está conectado. La exportación conserva normales y texturas; reimportar
el GLB verificó 1,267 mallas y cotas del piso a 1e-5 m de tolerancia digital. Se añadió
`MILPA360_V2_REVISION` en la aplicación, conservando `MILPA360_S5_REVISION`.
El generador guarda BLEND/GLB y render; no sobrescribe la sesión abierta del usuario.
Memoria de diez páginas, nueve diapositivas y respaldo de 300 segundos se sincronizan
con los nuevos visuales. Manifiestos SHA-256 y verificador S6 identifican la entrega.

## Siguiente acción exacta

Abrir `prototipo-3d/milpa360-simulador.html`, elegir ES/EN y ensayar el recorrido ante
una persona que no conozca el proyecto. Medir GPU/proyector y legibilidad reales.
Después continuar B14–B19 y ensayo E4 según `CIERRE-ACUMULADO.md`; incorporar reglas,
recursos, cotizaciones y mediciones cuando existan. No repetir S0–S5 ni volver a
instalar Blender. La matriz mantiene 27 obligatorios: uno documental con evidencia,
24 parciales, uno pendiente y uno por confirmar. Los cinco archivos preexistentes del
usuario conservan sus hashes y quedan fuera del commit. La revisión independiente y
la aceptación física siguen abiertas.
