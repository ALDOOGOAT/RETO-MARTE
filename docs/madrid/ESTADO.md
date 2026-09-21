# ESTADO · preparación para Madrid

**Sesión:** S0 revisada; S1/P3 siguiente. **Fecha:** 20 sep 2026.
**Rama:** `preparacion-madrid-p1`. Base `0177a7a`; P0 `7ea6b3f`, P1 `508f30a`, P2 `e8ffad4`.
El historial anterior ya estaba publicado; esta ejecución crea checkpoints locales, sin push.

## Alcance y pruebas

Se leyeron continuidad, misión, contexto, matriz, P1/P2, configuración y el flujo del simulador.
P0, P1 y P2 se reprodujeron: salida correcta y ningún diff al regenerar la base P2.
P0 reproduce el diseño de `c3e0ad3`, no certifica el diseño actual. P1 reproduce escenarios
con hipótesis; no hay nueva medición física. Se preservan los cinco archivos del usuario
sin seguimiento (`AGENTS.md` y cuatro presupuestos), con hashes previos.

## Hallazgos y decisiones de S0

| Prioridad | Afirmación / archivo | Evidencia y corrección | Verificación |
|---|---|---|---|
| Crítica | Digestor integrado, agua limpia, musgo certifica inocuidad; fichas y tubos HTML | P1 D3–D7: reactores separados; salmuera retenida; rutas de digestato y larva cerradas; riego desde depósito independiente; sin llama en cabina | Sintaxis JS comprobada; inspección visual en S2 |
| Crítica | Acceso resuelto; P2 | Piso 0.62 m y techo 2.20 m dejan 1.58 m; figura de 1.75 m no cabe erguida. B19 nuevo. Se retira conclusión de mantenimiento validado | Resta reproducible; aún sin redimensionar |
| Alta | Mínimo entre cartuchos 41 mm; generador P2 | Se medía arco exterior; mínimo euclídeo interior =29.8 mm. Supera criterio nominal de 20 mm; no tolerancia de fabricación | `python3 analysis/verificar_geometria.py`: falló antes y pasa después |
| Alta | Giro de cartucho con margen de 22 mm; P2 | Envolvente curva tiene fondo 0.617 m, diagonal ~0.890 m; margen nominal ~10 mm. No prueba maniobra en pasillo curvo | Misma regresión; maniobra pendiente |
| Alta | Posición lógica bajo estación; HTML | Signo de rotación opuesto a las estaciones dibujadas. Corregida orientación del anillo y goteros | Comprobación con escena real pendiente S2 |
| Alta | Casco de 2.20 m; HTML | Cúpula añadía ~0.96 m no declarados. Techo nominal alineado con P2; insuficiencia interior visible | Concordancia algebraica; no diseño de recipiente a presión |
| Alta | 730 soles, 2.9 kWh, 56 soles y pérdidas prefijadas como defensa vigente | Plan maestro, sistema y memoria formal identificados como históricos. Fichas activas remiten a P1/P2; P04/P05 y deck históricos hasta regeneración | Diff y búsqueda de afirmaciones |
| Alta | Daño reversible, gas independiente de pausa, reloj circular; HTML | Confirmados en código. Corregir en S1 con modelo separado del render | Pruebas causales S1 pendientes |

La configuración conserva D1 (anillo único) y D2 (539 días de dimensionado). Los ~355 días
son un escenario híbrido de bases aproximadas y tránsitos DRA, **no una duración prescrita**.
Los ciclos pueden quedar incompletos al final: conservar inventarios y cosechas pendientes.
Se mantienen ecuaciones e historial; no se reescribió P0 como si el nuevo diseño fuera el original.

Se reabrió Harris et al. (2021), doi:10.1038/s41598-021-91882-0, resultados de metanogénesis:
10–20 mM redujeron la producción bajo las condiciones del estudio. Apoya separar la salmuera;
no valida nuestro consorcio. PMC10113653 quedó detrás de comprobación del sitio: esta sesión
reutiliza las tablas citadas en P1 y no las presenta como nueva lectura independiente.

## Estado por requisito y bloqueos

RU-P1-02, RU-P2-02/03, RU-P3-01/03 y RU-E1 siguen parciales o pendientes según la matriz.
Eliminar afirmaciones falsas mejora trazabilidad, no convierte el requisito en cumplido.
P2 tiene geometría nominal disponible; **no se acepta como mecanismo ni habitabilidad cerrados**.
B1–B6 requieren reglas, equipo, feedback y recursos; B7–B9, medición/fuentes/divulgación;
B10, ratificación de D1/D2; B11–B14, datos técnicos P1; B15–B18, dosel/equipos/estructura;
B19, altura interior y ruta de entrada/mantenimiento. Ninguno se representa como cero.

## Siguiente acción exacta

Ejecutar S1 de `PLAN-CONTINUIDAD-ASTRA.md`: estado por lote, autorización explícita,
reloj con paso fijo, inventarios y cuatro fallos. Comparación de siembra con recursos iguales
y daño persistente, etiquetada ilustrativa. Después S2: interfaz técnica, Three.js local,
capturas y prueba real de controles/offline. Registrar hardware; WebGL por software no mide
el equipo del evento. El alcance de esta reentrada es S0–S2; P4/P5 quedan para sus sesiones.
