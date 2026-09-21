# ESTADO · preparación para Madrid

**Sesión:** S4/P4, presupuestos preliminares y caso Chiapas documentados.
**Fecha:** 20 sep 2026 (verificaciones del 21 sep UTC).
**Rama:** `preparacion-madrid-p1`. Base S3 `b71a1b8`; el commit que contiene este
checkpoint identifica S4. Antecedentes S2 `e23bb12`, S1 `5959333`, S0 `25f39e4`.
El usuario autorizó push de checkpoints revisados el 20 sep, sin force-push.

## Alcance y archivos

Se ejecutó el bloque documental S4: costes separados y caso terrestre concreto.
`P4-PRESUPUESTO-CHIAPAS.md` reúne decisiones, fuentes, fórmulas, opciones, protocolo y
datos faltantes. `config/milpa360.presupuesto.json` contiene ocho referencias públicas
fechadas y listas preliminares: 19 partidas Madrid y 20 Chiapas. No son cotizaciones.

`analysis/presupuesto_s4.mjs` genera
`outputs/madrid-s4-20260920/PRESUPUESTOS-MILPA360-S4.xlsx`, con cinco pestañas:
Resumen, Madrid, Chiapas, Marte y Precios. Reutiliza los JSON técnicos S3 para recursos
marcianos. No agrega dependencias al proyecto ni cambia geometría, simulación o renders.
Se actualizaron contexto, matriz, afirmaciones, referencia S3 y continuidad. Los cinco
archivos preexistentes sin seguimiento —AGENTS y cuatro presupuestos— conservan sus hashes
y quedan fuera del commit. No hubo compras ni contactos externos.

## Decisiones y resultados

- **Madrid:** maqueta propuesta 1:10, Ø456 mm nominal, 20 cartuchos y dos repuestos,
  control local y agua limpia. Dos kg de PLA son provisión pendiente de laminado. El
  NEMA17 es candidato para maqueta; su ficha discrepa en el par. No selecciona el motor
  de las 1.98 t del carrusel. Un banco E1 a carga real requiere diseño/cotización propios.
  Se describe también una opción manual de menor alcance.
- **Hoja económica:** IVA incluido/excluido/desconocido, fletes por pedido y trabajo
  separados. Recursos propios/donados/prestados/voluntarios empiezan pendientes;
  desembolso y reposición son distintos. Contingencia provisional 20%, sin significado
  probabilístico, aplicable sólo a base completa. Falta límite MXN del equipo.
- Cuatro líneas Madrid y una Chiapas tienen cantidad, precio e IVA resueltos: suman
  1,050.96 y 139.20 MXN. **No son costes de los proyectos**: faltan fabricación, equipos,
  horas, impuestos y envíos. Los totales siguen como Pendiente.
- **Chiapas:** propuesta exploratoria para huerto periurbano de Tuxtla, seis recipientes
  de rábano en tres pares independientes, manual frente a goteo e aislamiento. Primero
  agua limpia, después cultivo revisado por agrónomo. Sitio, operador, variedad y línea base
  no confirmados. Indicadores: agua nueva/kg utilizable, tiempo/kg, energía, cosecha y
  supervivencia. Sin cosecha, no inventar L/kg. No valida residuos pecuarios.
- **Marte:** 17 entradas de recursos/brechas, sin coste de misión defendible. Masa móvil
  no es masa lanzada; útil/total del digestor no se suman. Los antiguos millones USD,
  sustitución de siete toneladas de comida y retorno al sol 150 no se usan como conclusiones
  vigentes. Faltan estructura, integración, energía total, consumibles y mantenimiento.

## Evidencia y pruebas

Se abrieron fichas de 3DMarket, Lionchip, Steren y Home Depot, alternativa de motor Teckali
y condiciones comerciales. IVA de Steren/Home Depot y entrega a Chiapas siguen pendientes.
SAT artículo 1 respalda 16% general aplicado al PLA anunciado más IVA. INEGI CA2022
Chiapas, lámina 15 del PDF, registra 4.5% de superficie agrícola activa de riego:
contexto estatal, no línea base del piloto.

El generador pasó comprobaciones de cantidades vacías/cero/negativas, IVA, recursos,
contingencia y límite de gasto con cambios temporales restaurados. Se comprobaron subtotales
y ausencia de errores de fórmula. La inspección visual de cinco hojas detectó títulos
recortados; se corrigieron y revisaron de nuevo, junto con fuentes y notas. El XLSX se
reabrió con un lector independiente, verificando subtotales y conservación de fórmulas.

LibreOffice 24.2 está presente **sin Calc instalado**; no pudo verificar recálculo nativo.
`sudo -n` requiere contraseña. Las pruebas de cálculo ejecutadas son las de Artifact Tool;
no se presenta una apertura en Calc como realizada ni se alteró el sistema. El CSV de
afirmaciones conserva 16 columnas e IDs únicos. Los scripts P3 no se modificaron.

## Estado, bloqueos y siguiente acción

P4 sigue abierto para validación física y presupuesto de compra. La matriz conserva 27
obligatorios: 22 parciales, tres pendientes, uno con evidencia documental y uno por confirmar.
RU-T-01/G-C9 incorporan el piloto propuesto sin cambiar a cumplimiento probado. Persisten
B6/inventario, cotizaciones/plazos, sitio/operador, B7, B10, B15–B19 y reglas/feedback.
La solicitud de presupuesto y recursos no recibió respuesta; se avanzó con lo independiente.

**Siguiente acción exacta: S5/P5**, continuidad §5–6. Astra high para decisiones e integración;
Sol medium para pulido delimitado si está disponible. Tratar primero B19, entrada/evacuación,
y envolventes que cambien geometría; después la transformación visual profunda con
Blender/Three y comparación antes/después. Integrar memoria, Documento Concepto, planos,
deck, guion y vídeo. Conservar cifras S3: 3.086 m², 2.46% kcal y aportes externos.
Blender MCP se verificó en S3, no se reconectó en S4; Google sigue sin autenticación
confirmada. Sin datos físicos, avanzar tareas independientes con brechas visibles. El objetivo
de 30 FPS sigue pendiente en la GPU del equipo del evento.
