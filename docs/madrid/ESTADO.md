# ESTADO · preparación para Madrid

**Sesión:** cierre visual V4, fundamentos y entrega digital.
**Fecha:** 21 sep 2026. **Rama:** `preparacion-madrid-p1`; base `c99e151`.
El commit que contiene este archivo identifica el checkpoint; push autorizado.
**Aceptación:** candidata digital revisable. Requisitos físicos, reglas del equipo,
cotizaciones, revisión independiente y prueba del evento conservan su estado pendiente.

## Decisiones vigentes

Aldo delegó mejorar con amplitud realismo, animación, UI/UX, una vista completamente
cerrada, fundamentos LaTeX y limpieza. Se conserva arquitectura B: veinte cartuchos
iguales, ocho posiciones de recuperación y doce de cultivo; Ø4.56 m, altura 2.20 m,
piso 0 y cama 0.62 m. La configuración dimensional y el modelo científico no cambiaron.
El acceso B19 mantiene su visor separado: la fachada cerrada no valida entrada,
evacuación, resistencia ni presurización. No se borra evidencia para aparentar cierre.

D1/D2 siguen ratificadas, con provisiones completas y treinta días de reserva sin
crédito de cosechas supuestas. El alimento nominal cubre 2.46% de kcal; 25.26 kWh/d
es un subtotal eléctrico condicionado, con cargas omitidas. Salmuera y metanogénesis
permanecen separadas. La matriz sigue en 27 obligatorios: uno con evidencia documental,
24 parciales, uno pendiente y uno por confirmar. `CIERRE-ACUMULADO.md` conserva B1–B19
con datos exactos y responsables; `CIERRE-V4.md` consolida el estado por P0–P5.

## Cambios entregados

La envolvente de 360° y techo nominal permiten mostrar el objeto completo. El talud
se reconstruye como superficie continua; comparte proyección de textura con el suelo.
Se conecta el panel externo por cable y caja ilustrativos. Placas de identidad y
acceso explican su estado. Exterior/Interior son acciones explícitas; cerrar pausa
el proceso. Los materiales exteriores evitan artefactos de sombra sobre superficies
muy próximas; conservan la sombra proyectada al suelo. No se certifican espesores.

El giro de cámara opera sin avanzar inventarios. Indexado y despiece interpolan con
el tiempo; pausa conserva cuello y pose de las aves. Se fija el tamaño CSS del lienzo para evitar recortes al bajar DPR. La calidad automática ajusta
resolución y sombras cada tres segundos, sin alterar biología. Plantas y musgo
inactivos no se dibujan y los datos de interfaz se actualizan cada 120 ms. Se añade
navegación por procesos y se adapta el campo de visión al móvil. Los controles y
nuevas placas mantienen ES/EN; los documentos extensos se conservan en español.

Fundamentos abre fórmulas MathML y un PDF local de seis páginas. Se instaló Tectonic
0.17.0 desde distribución oficial y se guardó LaTeX editable. Sus valores provienen
de configuración/cálculos: área polar, masa/peso, PPFD/DLI, energía química y neta,
transmisión térmica, balances, ocho electrones del perclorato, torque, acceso e
interpolación. Los hallazgos son consecuencias calculadas de escenarios, no mediciones
ni descubrimientos experimentales. Se preservan las incertidumbres de las fuentes.

Blender interior/exterior, GLB, capturas, memoria, deck y vídeo se sincronizan con V4.
README dirige a la revisión activa, con rutas para antecedentes. Se retiran 37
fotogramas de animación antigua (42.29 MB decimales) después de verificar un ZIP fuera
del repo y todos sus hashes. `LIMPIEZA-V4.json` permite recuperarlos. PDF oficiales,
fotos clave, fuentes históricas y los cinco archivos preexistentes quedan conservados.

## Pruebas y evidencia

El verificador V4 comprueba cierre de 360°, cota del techo, ausencia de interiores
visibles, inventarios, ES/EN, móvil, MathML, giro, movimiento reducido, pausa, indexado
y despiece. `PRUEBA-VISUAL-V4.json` contiene FPS/p95, duración, GPU y resolución. Se
midió RTX 4060 Laptop con Chrome visible X11 a 1920×1080; las muestras son de ocho
segundos, no un mínimo sostenido ni prueba del proyector. No se extrapola desde Intel
headless o SwiftShader. El exterior emplea 32 llamadas de dibujo.

Se mantienen verificaciones de placas/aves, ambos idiomas, fallos, conservación,
B19 y cotas. La entrega se comprueba sin Internet desde extracción limpia; S6 coteja
los archivos realmente ejecutados con los empaquetados. Blender reimporta GLB y
verifica recuentos y dimensiones del piso. PDF y diapositivas se inspeccionan
visualmente; el vídeo de 300 segundos se decodifica completo. Los manifiestos
identifican versiones y hashes; ninguna prueba digital sustituye un ensayo físico.

## Siguiente acción exacta

Usar el paquete digital V4 para el ensayo del equipo: exterior, corte, procesos,
aves, fallo y fundamento. Incorporar reglamento/feedback real, presupuesto e inventario,
después ensayos E0–E5 y diseño detallado B14–B19 con responsables competentes. Medir
proyector y hardware del evento y efectuar revisión independiente. No repetir
auditorías o instalaciones ya resueltas. La memoria automática Claude está sin cuota;
los documentos de este checkpoint son el registro persistente de la sesión.
