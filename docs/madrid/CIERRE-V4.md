# Cierre V4 · entrega digital y aceptación pendiente

21 sep 2026 · base `c99e151` · rama `preparacion-madrid-p1`.
El commit que contiene este documento identifica la revisión. Aldo delegó decisiones,
mejora visual, documentación, limpieza y continuidad. Se termina esta revisión digital;
no se cambia la definición de cumplimiento para declarar el sistema físico terminado.

## Decisiones y resultado

| Área | Hecho en V4 | Condición que conserva |
|---|---|---|
| Exterior | Pared de 360°, techo, juntas, placa de acceso y conexión de energía; cotas del casco desde configuración | Apariencia nominal; puerta, sellos, estructura y presión por dimensionar |
| Corte | Exterior/interior explícitos, selección de piezas visibles, despiece interpolado | Corte y despiece son herramientas de inspección |
| Terreno | Talud continuo en contacto con casco y explanada; UV y tono compartidos con el terreno | Relieve procedural, sin afirmar espesor de blindaje ni topografía medida |
| Navegación | Procesos seleccionables, vista de aves, giro de cámara, estado de vista y ficha de fundamentos | Giro no avanza inventarios; cerrar el casco pausa el proceso |
| Fluidez | Cámara e indexado interpolados, pausa conserva pose, actualización de datos cada 120 ms, calidad automática | Ajusta píxeles/sombras; no cambia tasas biológicas ni geometría nominal |
| ES/EN | Controles, fichas, rótulos nuevos y fundamentos breves traducidos localmente | Documentos largos en español; no se afirma traducción íntegra de la memoria |
| Matemáticas | Seis páginas compiladas con Tectonic 0.17.0; fórmulas y valores derivados del JSON | Supuestos identificados; no son descubrimientos experimentales |
| Entrega | Capturas reales, Blender interior/exterior, GLB, memoria, PPTX/PDF y vídeo sincronizados | Vídeo de respaldo sin narración; formato final del equipo por confirmar |
| Limpieza | 37 fotogramas históricos intermedios retirados, 42,294,233 bytes | Respaldo ZIP verificado, Git y fuentes originales conservados |

## Fundamento de las decisiones

La animación conserva el estado determinista del proceso. Para aproximar una coordenada
visual al objetivo se usa `α = 1 − exp(−λ Δt)`, con λ=9 s⁻¹ en el indexado y despiece.
La solución de `dx/dt = λ(x_obj − x)` da el mismo decaimiento acumulado al variar la
frecuencia de renderizado mientras el objetivo permanezca fijo. No asigna una velocidad
mecánica al carrusel. El paso visual se limita a 50 ms; con menos de 20 FPS puede
ralentizarse sin alterar el reloj del proceso. La cámara usa λ=12 s⁻¹; la inspección reducida evita estos recorridos.

El modo automático toma ventanas de tres segundos, reduce resolución si cae de 28 FPS y
la aumenta sobre 52 FPS dentro de 0.65–min(DPR,1.25). El umbral es una preferencia de
presentación, no una medida fisiológica. No vuelve a ejecutar la biología al cambiar calidad.
Se elimina la superposición coplanar entre faldón del techo y pared que producía
rayas de z-fighting; ambos se encuentran a 2.12 m y el techo termina a 2.20 m.
El canvas tiene ancho/alto CSS del 100%: variar DPR modifica sólo su resolución interna,
no su tamaño visible. Se corrigió el encogimiento que recortaba vistas al ajustar calidad.
Las sombras permanecen en caché; se recalculan al cambiar ensamblaje, indexado o vista.

La geometría nominal permanece: veinte sectores idénticos, altura y radios únicos.
La integral polar `A = ∫∫ r dr dθ = θ(ro²−ri²)/2` y el descuento de bordes reproducen
la superficie útil. Masa `m=ρAd` no cambia con la gravedad; peso `W=mg` sí. Los detalles
del acabado (nervios, tornillos, pintura) no son tolerancias ni espesores de fabricación.

Los fundamentos conectan PPFD, fotoperíodo, DLI y eficiencia de luminaria; distinguen
kWh químicos, calor y electricidad; mantienen entradas externas, acumulación y purgas.
La semirreacción de perclorato se balancea por ocho electrones y separa transferencia
por lavado de destrucción química. También se documentan torque, cuerda de acceso y
las variables faltantes para resistencia del casco. [PDF](../../outputs/madrid-s5/FUNDAMENTOS-MILPA360.pdf)
y [LaTeX editable](latex/fundamentos.tex).

### Hallazgos calculados de interés

- Un casco de 4.56 m no equivale a 16.33 m² cultivados: quedan 3.0858 m² útiles de cultivo.
- La iluminación nominal (~10.48 kWh/d) supera unas 52.5 veces la energía química del
  biogás (~0.1994 kWh/d), incluso antes de pérdidas de conversión. No se propone autonomía.
- El subtotal eléctrico modelado de 25.26 kWh/d sigue omitiendo cargas identificadas.
- Ampliar una puerta no despeja el anillo: B19 y la prueba de tareas siguen necesarios.

Son consecuencias de los escenarios registrados, no datos medidos en un prototipo.
Las ecuaciones de casco tampoco establecen que una tapa plana soporte presión.

## Pruebas reproducibles y alcance

`PRUEBA-VISUAL-V4.json` registra el hardware real, resolución, duración, FPS, tiempos
p95 y llamadas de dibujo. Se comprueban casco completo, altura del techo, ocultación
interior, inventarios al cambiar vista, ES/EN, móvil de 390×844, fórmulas MathML, giro,
movimiento reducido, pausa de aves y transiciones de indexado/despiece. Es una muestra
local; no mide el proyector ni garantiza una frecuencia mínima sostenida. La ejecución
desde carpeta limpia registró 58.68 FPS interior y 68.75 FPS exterior.

`PRUEBA-REFINAMIENTO-V3.json` conserva el nombre del verificador de placas/aves y se
actualiza contra la aplicación V4. `PRUEBA-VISUAL-V2.json` comprueba idioma, navegación,
B19 y atlas. `PRUEBA-P3-NAVEGADOR.json` y `PRUEBA-B19-NAVEGADOR.json` comprueban controles,
fallos, cotas y operación offline. El chequeo final S6 coteja el contenido empaquetado
contra los archivos realmente ejecutados desde extracción limpia.

Blender MCP importó 1,003 mallas interiores y 124 exteriores en escenas nuevas,
conservando S5/V2/V3 y Scene; `VERIFICACION-MCP-V4.json` registra la operación.
Las verificaciones Blender comprueban configuración, cantidad de mallas y dimensiones
del piso al reimportar GLB; no acreditan resistencia ni interferencias físicas completas.
Las capturas provienen del navegador y los renders de Blender. No se usaron imágenes
sintéticas como sustituto de la geometría comprobable. No se instaló una colección de
plugins: Three160/Chrome/Blender/MCP existentes y Tectonic cubren la entrega.

## Estado por paquete

| Paquete | Resultado disponible | Qué falta para aceptación completa |
|---|---|---|
| P0 | Auditoría, requisitos, fuentes, afirmaciones y checkpoints | Confirmación de condiciones/delegación y feedback real |
| P1 | Parámetros, balances, alternativas y decisiones documentadas | Valores físicos, equipos seleccionados y cargas omitidas B11–B18 |
| P2 | Modelo paramétrico, planos nominales, estudios de movimiento y B19 | Fabricación, cargas, acceso/rescate, sellos y mantenimiento comprobados |
| P3 | Demo offline, estados/fallos, V4 ES/EN y verificaciones locales | Ensayo humano y GPU/proyector del evento |
| P4 | Presupuestos con fórmulas, escenarios y protocolos/plantillas E0–E5 | Recursos, precios finales, mediciones originales y responsables de laboratorio |
| P5 | Memoria, Documento Concepto integrado, deck, guion, vídeo y paquete con hashes | Adaptar a las reglas confirmadas, narración/ensayo final y revisión independiente |

**No hay mediciones nuevas ni avales que permitan cerrar esas filas por decisión del agente.**
La matriz permanece en 27 requisitos: 1 con evidencia documental, 24 parciales,
1 pendiente y 1 por confirmar. El registro B1–B19 de [CIERRE-ACUMULADO.md](CIERRE-ACUMULADO.md)
identifica quién y con qué evidencia puede cerrar cada punto, incluidos los trabajos
de ingeniería pendientes. No se presentan todos como bloqueos externos.

## Limpieza y recuperación

Se conservaron PDF oficiales, scripts históricos, documentos de fases, fotografías
clave, antecedentes y cinco archivos preexistentes del usuario. Los intermedios de
LaTeX, JSON de intercambio Blender y fotogramas regenerables quedan ignorados.
Se retiraron además 356 intermedios regenerables (160,337,962 bytes);
los recursos finales permanecen empaquetados en BLEND/GLB y PDF.
El ZIP de respaldo está junto al repositorio; su hash y los 37 hashes están en
`LIMPIEZA-V4.json`. No se reescribe el historial ni se borra ninguna medición.

Para recuperar un fotograma sin modificar el árbol: `git show
c99e151:prototipo-3d/fotos-para-subir/anim/f0001.png > /ruta/de/respaldo/f0001.png`.
El respaldo de animación no es parte de la entrega vigente.
