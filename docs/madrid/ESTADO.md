# ESTADO · preparación para Madrid

**Sesión:** S3/P4, mecánica y protocolos documentados; validación física pendiente.
**Fecha:** 20 sep 2026 (pruebas del 21 sep UTC). **Rama:** `preparacion-madrid-p1`.
Base S2 `e23bb12`; el commit que incluye este checkpoint identifica S3. Antecedentes:
S0 `25f39e4`, S1 `5959333`, P2 `e8ffad4`. El usuario autorizó push de checkpoints revisados
el 20 sep; se conserva esa autorización para esta rama, sin force-push.

## Alcance y archivos

Se ejecutó S3 del plan de continuidad: cargas, movimiento, bloqueo, volumen candidato,
acceso y ensayos mínimos. `P4-MECANICA-ENSAYOS.md` concentra resultados y límites;
`analysis/milpa360_p4.py` reutiliza P1/P2 y genera `config/milpa360.mecanica.json`.
Los nuevos supuestos tienen unidad, evidencia y fuente en `milpa360.parameters.json`.
Las cuatro plantillas CSV de `ensayos/` contienen sólo encabezados: no existen datos físicos.

P1/P2/P3, planos P02/P03 y datos del simulador se regeneraron. P1/P2 conservan tablas
históricas identificadas; su cabecera remite a la revisión S3. Se actualizaron contexto,
matriz, registro de afirmaciones y continuidad. El ZIP `entregas/madrid-p3.zip` y su
manifiesto contienen la demo y fuentes revisadas; **no son la entrega final P5**.
Los cinco archivos preexistentes sin seguimiento —AGENTS y cuatro presupuestos— siguen
intactos y fuera del commit. No se hicieron compras ni contactos externos.

## Decisiones y resultados vigentes

- **D8:** S2 confundía piso y cama en el HTML; P02 situaba al operario abajo. Se separan
  piso 0, borde de cubeta 0.62 y techo 2.20 m. Hay 2.20 m sobre el piso, 1.58 sobre la
  cama. Se conserva la figura de referencia de 1.75 m; no acredita ergonomía poblacional.
  **B19 sigue abierto:** el anillo interrumpe la entrada radial y falta evacuación completa.
- **D9:** el reborde supuesto de 35 mm ya dibujado debe descontarse del cultivo.
  Área exterior por cartucho 0.33311 m²; lecho útil 0.25715 m². Doce cartuchos aportan
  **3.086 m² útiles**, sustituyendo los 4.00 anteriores. Sustrato nominal **84.9 kg/cartucho**,
  con tara adicional supuesta de 5 kg. Se corrigió también la traslación doble de extrusiones.
- Masa móvil nominal **1.98 t**; par preliminar terrestre **380 N·m**, giro de 18° en 60 s,
  rozamiento supuesto y margen 2. Sensibilidad al coeficiente: 88–744 N·m. No se ha
  seleccionado motor, corona, pasador ni estructura; masa e inercia no disminuyen con g.
- Digestor candidato: **63.9 L útiles / 85.1 L totales** nominales; envolvente combinada
  178.3 / 237.7 L. HRT y concentración ST son hipótesis, no validación del consorcio.
  Salmuera, dosel, servicios y volúmenes reales de equipos siguen pendientes B15–B18.
- P1 nominal corregido: **0.199 kWh químicos/d** de gas, **10.48 kWh eléctricos/d** de
  iluminación y **2.46 %** de cobertura calórica para seis tripulantes. Faltan auxiliares
  y arranque; no son autosuficiencia ni alimentación completa.
- Se conserva D1, anillo único, y D2, dimensionado de 539 días; ratificación humana B10
  pendiente. El modelo continúa ilustrativo, con daño persistente, permisos simulados,
  inventarios y repuestos finitos; ningún resultado constituye ensayo biológico.

## Evidencia y comprobaciones

Se leyeron NASA-STD-3001 Vol.2 §8.3 (V2 8013/8014), portada y secciones pertinentes de
OCHMO-HB-004 Rev.A, y patrones de selección de Oriental Motor. Son referencias para
rutas, antropometría y accionamiento, sin certificación ni rozamiento medido.

Pasaron `verificar_p4.py`, `verificar_geometria.py`, `verificar_modelo_geometrico.cjs`
y `npm test --prefix prototipo-3d`. Comprueban casos analíticos, gravedad, perfil de giro,
volúmenes, límites de la trayectoria, extrusiones reales y área triangulada de Three;
P3 conserva determinismo, fallos, recuperación y balances numéricos. La primera prueba
Chrome detectó un autotest que comparaba área bruta con útil; se corrigió la referencia.
La repetición final pasó desde un ZIP extraído, con red deshabilitada: cero errores y cero
solicitudes HTTP. Se corrigió la superposición terreno/piso detectada en capturas; las seis
se revisaron visualmente. Chrome 148, 1080p, SwiftShader: **1.27 FPS** en 30 fotogramas.
Es render por software; el objetivo de 30 FPS en la GPU del evento permanece pendiente.

## Requisitos, herramientas y siguiente acción

La matriz conserva 27 requisitos obligatorios: 22 parciales, 3 pendientes, 1 con evidencia
documental y 1 por confirmar. B1–B19 mantienen sus datos faltantes; protocolos preparados
no cierran ensayos ni requisitos físicos. Reglas, feedback, recursos y presupuesto real
siguen pendientes del equipo. No se inventaron respuestas ni cotizaciones.

Blender MCP conectado y consultado: Blender 5.2.0 LTS, addon 1.6/protocolo 5. Google Drive
se ofreció para instalación; la conexión de la cuenta no está confirmada. El trabajo puede
seguir localmente. LaTeX se evaluará al exportar S5, si resulta necesario.

**Siguiente acción exacta:** leer continuidad §5 y ejecutar **S4/P4**: presupuestos separados
del demostrador, piloto Chiapas y concepto marciano, con fórmulas, fuentes y pendientes.
Terra medium para hoja/precios y Astra high para hipótesis, según disponibilidad. La mejora
visual profunda solicitada queda pautada en **S5**, con comparación antes/después, geometría
coherente, accesibilidad y prueba offline; la prueba de GPU del evento sigue pendiente.
