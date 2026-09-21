# ESTADO · preparación para Madrid

**Sesión:** S0 y S1 ejecutadas; S2 digital verificada, aceptación en equipo del evento pendiente.
**Fecha:** 20 sep 2026 (prueba final 21 sep UTC). **Rama:** `preparacion-madrid-p1`.
Base `0177a7a`; correcciones S0 `25f39e4`; modelo S1 `5959333`; S2 en el commit que acompaña
este checkpoint. Los commits de esta ejecución son locales, sin push.

## Alcance y archivos

Se aplicó el arranque del plan de continuidad: revisar P0–P2 y ejecutar P3 en S1/S2.
P0, P1 y P2 se reprodujeron; regenerar la base P2 inicialmente no produjo diferencias.
P0 conserva el diagnóstico de `c3e0ad3`, no certifica la geometría actual. P1 sigue siendo
cálculo con hipótesis. No se ejecutaron P4/P5 ni se generaron mediciones físicas.

El modelo independiente está en `prototipo-3d/milpa360-modelo.js`; `analysis/milpa360_p3.py`
reutiliza P1/P2 y genera `milpa360-datos.js`. La configuración identifica cada supuesto.
`P3-SIMULACION.md` explica ecuaciones, fronteras y límites. El HTML conserva Three.js y
la interacción existente, con inspección técnica, recorrido guiado, fallos y comparación.
Three.js 0.160.0, fuentes y licencias quedan locales. `LEEME-P3.md` documenta el arranque.
El ZIP `entregas/madrid-p3.zip` y `MANIFIESTO-P3.json` contienen el demostrador P3;
**no constituyen la entrega final P5**. Las seis capturas nuevas están en `capturas/`.

## Hallazgos y decisiones vigentes

- Se separaron salmuera, digestor y riego acondicionado externo; las rutas sanitarias no
  autorizadas permanecen cerradas. Se retiraron llama en cabina y afirmaciones de
  autosuficiencia, inocuidad por musgo y alimentación completa.
- Holgura mínima entre sectores corregida de 41 a **29.8 mm**: distancia interior euclídea.
  La envolvente del cartucho tiene fondo **0.617 m** y diagonal aproximada **0.890 m**.
  Su margen nominal de unos 10 mm no demuestra giro dentro de un pasillo curvo.
- **B19 crítico:** techo 2.20 m menos piso 0.62 m deja **1.58 m libres**. La figura de
  referencia de 1.75 m no cabe erguida. Se corrigió el techo visual antes sobredimensionado;
  no se eligió arbitrariamente una nueva cota. P2 queda abierto en acceso y mantenimiento.
- Se corrigió el signo del giro: cartuchos, goteros y estaciones coinciden ahora también
  en la escena ejecutada. Se conserva D1, anillo único, y D2, dimensionado de 539 días.
  Su ratificación humana B10 continúa pendiente; 355 días es otro escenario, no un requisito.
- Reloj de paso fijo, daño persistente, horizonte sin reinicio implícito y cuarentena con
  repuestos finitos. Autorizaciones didácticas explícitamente simuladas; sin autorización,
  S8 retiene el avance. Crecimiento, daño y maniobras no están calibrados físicamente.
- Agua, almacén de gas y sustrato tienen inventarios comprobables. La entrada nominal de
  gas proviene de P1; no simula digestión durante fallos. Faltan balances biológicos,
  térmica y auxiliares. Los cultivos precargados no demuestran arranque desde semillas.

Se releyeron resultados de Harris et al. (2021), doi:10.1038/s41598-021-91882-0;
la inhibición observada apoya separar salmuera sin validar nuestro consorcio. PMC10113653
no permitió una nueva lectura por comprobación del sitio: se identifica como referencia
previamente utilizada en P1. No se añadieron avales ni resultados experimentales.

## Verificación ejecutada

`python3 analysis/verificar_geometria.py`, `node analysis/verificar_p3.cjs` y `npm test`
pasaron. Cubren geometría mínima, determinismo, pausa, límites temporales, cuatro fallos,
daño persistente, autorización, cuarentena, reservas y conservación numérica. El comparador
usa parcelas fijas separadas del carrusel: mismos recursos/biomasa inicial y controles
nominales propios; cambia la fase, sin resultado ganador prefijado.

`analysis/verificar_p3_navegador.mjs` pasó en Chrome 148, a 1920×1080, abriendo una copia
extraída del ZIP con red deshabilitada: controles, reinicio, posiciones reales de mallas,
fichas, vistas y recorrido; **cero errores y cero solicitudes HTTP**. Las seis capturas se
inspeccionaron visualmente. `PRUEBA-P3-NAVEGADOR.json` registra **1.26 FPS con SwiftShader**
en 30 fotogramas: prueba de render por software, no del equipo del evento. El criterio
propuesto de 30 FPS con la GPU real sigue pendiente. El ZIP verifica sus hashes SHA-256.

## Requisitos, bloqueos y siguiente acción

La matriz conserva 27 requisitos obligatorios: 22 parciales, 3 pendientes, 1 cumplido con
evidencia documental y 1 por confirmar. RU-P3-03 mejora a parcial; software funcionando
no implica validación física. B1–B19 siguen abiertos según su dato faltante. Se pidieron
reglas, feedback, presupuesto, recursos y ratificación D1/D2; no se inventaron respuestas.
Plan maestro, memoria anterior, P04/P05 y deck están identificados como históricos.
`AGENTS.md` y los cuatro presupuestos preexistentes permanecen intactos y sin seguimiento.

**Siguiente:** ejecutar S3/P4 con Astra high según el prompt actualizado de
`PLAN-CONTINUIDAD-ASTRA.md`: resolver primero B19 y B15–B18 mediante alternativas de
altura/entrada/mantenimiento, cargas, par y protocolos de ensayo. Después S4 costes y S5/S6
integración y cierre. Conservar P3 y volver a probarlo si cambia la geometría. No hacer push.
