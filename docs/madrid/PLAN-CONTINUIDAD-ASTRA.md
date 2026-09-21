# Continuidad para Astra · MILPA-360 rumbo a Madrid

**Corte técnico revisado:** S3, 20 sep 2026, rama `preparacion-madrid-p1`, base S2 `e23bb12`. **Este archivo es un relevo de trabajo, no una validación científica ni una orden para ejecutar tareas en segundo plano.** Al retomar, verificar otra vez HEAD, fecha, rama, estado de Git, herramientas, fuentes y reglas de la final.

**Especificación principal:** [`MISION-MADRID-MILPA360.md`](../../MISION-MADRID-MILPA360.md), especialmente §5 A–O y §6. **Checkpoint vigente:** [`ESTADO.md`](ESTADO.md). No copiar el prompt largo de P0 como instrucción nueva: P0 ya tiene commit. Este plan conserva la intención del prompt y la aplica al trabajo restante.

## 1. Dónde estamos realmente · actualización 20 sep 2026

| Paquete | Estado verificable | Brecha vigente |
|---|---|---|
| P0 · auditoría | `7ea6b3f`, reproducido en S0/S2 | Bloqueos documentales y externos siguen visibles |
| P1 · ingeniería | `508f30a`, cálculos reutilizados por P3 | Tasas y balances parciales, sin mediciones; se retiró la inferencia de refrigeración sin envolvente |
| P2 · geometría | `e8ffad4`, corregido por S0 `25f39e4` | **Aceptación mecánica/humana abierta:** B15–B19. Pasillo en planta no prueba mantenimiento |
| P3 · simulación y relato | S1 `5959333`; S2 `e23bb12`; correcciones geométricas S3 | Modelo ilustrativo por lotes, UI técnica, comparación y demo local. Falta prueba de GPU/equipo del evento y calibración física |
| P4 · validación y costes | S3 documental ejecutada; siguiente S4 | Cálculos y protocolos en P4-MECANICA-ENSAYOS.md; sin mediciones físicas, entrada completa ni precios cerrados |
| P5 · defensa y entrega | Pendiente | El deck y material histórico aún no son la defensa vigente; usar las capturas vigentes tras la corrección S3 al integrarlos |

### Resultado de la revisión S0–S3

- Plan maestro, sistema y memoria anterior identificados como históricos; se conservó el proceso.
- Fichas corregidas: alimento complementario, electricidad externa, reactor de salmuera separado,
  musgo/MFC sin autoridad sanitaria, circuitos y válvulas coherentes con esos límites.
- Holgura mínima corregida de 41 a 29.8 mm. Envolvente de cartucho: margen nominal de unos 10 mm,
  **sin demostrar maniobra en pasillo curvo**. No hay aceptación de estructura ni ergonomía.
- **B19 actualizado en S3:** S2 confundía piso y cama en el HTML, mientras P-02 situaba al
  operario abajo. D8 separa piso 0 y cama 0.62: quedan 2.20 m sobre el piso y 1.58 sobre la
  cama. Falta entrada/evacuación a través del anillo; no se declara resuelto por esa resta.
- **D9:** se descuenta el reborde de 35 mm ya dibujado. Cultivo útil 3.086 m² y 84.9 kg de
  sustrato/cartucho nominal; P1/P2/P3 regenerados. Extrusiones de Three corregidas y probadas.
- S3 produce cargas, inercia, par, sensibilidad, volumen candidato del digestor y protocolos
  con plantillas vacías. Los resultados siguen condicionados a hipótesis; ningún ensayo inventado.
- Reloj con paso fijo, sin reinicio implícito al acabar misión. Daño persistente, cuatro fallos,
  autorización por lote y cuarentena con repuestos finitos. Biología/tiempos de maniobra ilustrativos.
- Three.js fijado en 0.160.0, fuentes y licencias locales. Prueba funcional sin red y capturas
  en `docs/madrid/capturas/`; medición con SwiftShader no sustituye al hardware del evento.
- P04/P05 y deck siguen históricos. La demo P3 tiene su propio ZIP y manifiesto, **no es la entrega P5**.
- `AGENTS.md` y los cuatro presupuestos preexistentes siguen intactos y sin seguimiento; no usar `git add -A`.

## 2. Regla de reentrada y decisiones

- La próxima sesión empieza con `git status --short --branch`, `git log -4 --oneline`, lectura de `AGENTS.md`, `MISION-MADRID-MILPA360.md`, `ESTADO.md`, P1/P2, matriz y diff desde `e8ffad4`. Si cambió el repo, actualizar este corte antes de editar. No hacer reset/clean, publicación, carga a plataforma, compras ni contacto externo. El usuario autorizó push el 20 sep en esta continuación: permitido únicamente para checkpoints revisados en esta rama, sin force-push.
- Reproducir `python3 analysis/p0_verificacion.py`, `python3 analysis/milpa360_p1.py` y `python3 analysis/milpa360_p2.py`; comprobar `git diff` después del generador. Repetir fuente original sólo donde una afirmación vigente sea crítica, esté en disputa o haya cambiado. No rehacer P0/P1 enteros por haber recibido el prompt original.
- Abrir un **registro breve de hallazgos priorizados** dentro de `ESTADO.md` o el documento del paquete correspondiente: afirmación, archivo, fuente/cálculo, impacto, decisión y prueba. Resolver primero contradicciones que podrían hacer falsa la defensa; después añadir funciones.
- Mantener como fronteras separadas **concepto marciano**, **demostrador terrestre**, **hábitat completo** y **módulo agrícola**. Etiquetar cada dato como requisito, literatura, cálculo, hipótesis, escenario ilustrativo, medición propia o pendiente. Nunca convertir una animación o una fórmula en ensayo.
- D1/D2 permiten continuar, pero B10 necesita ratificación humana. B1–B6 requieren reglamento, feedback, recursos y decisiones del equipo; B15–B18 requieren datos de dosel/equipos/mecánica. Registrar el dato exacto faltante y avanzar con lo independiente.

## 3. Sesiones de trabajo después de la recarga

Una sesión significa un bloque con salida revisable y checkpoint; no una promesa de que un límite de tokens dure cierta cantidad de horas. **Astra conduce las decisiones y la integración científica; Sol o Terra pueden ejecutar tareas delimitadas con criterio de aceptación.** Una revisión independiente con Opus, si se usa, recibe sólo diff, cálculos y fuentes del hito y no edita simultáneamente. No iniciar subagentes automáticamente.

| Sesión | Objetivo y archivos de partida | Salida y criterio para pasar |
|---|---|---|
| **S0 · reentrada y revisión de verdad** | Git, `MISION`, `ESTADO`, P0–P2, configuración, matriz, plan maestro, simulador, P-05 y deck. Reproducir los tres scripts. | Lista priorizada de contradicciones **vigentes**, no otra auditoría histórica. Corregir únicamente las que bloquean P3 o inducen al jurado a error; tests y diff revisados. Actualizar `ESTADO.md` con el alcance preciso. |
| **S1 · P3 modelo** | Reglas actuales del simulador, balances P1, `config/milpa360.parameters.json` y afirmaciones depuradas en S0. | Estado por cartucho/lote, inventarios con unidades, reloj reproducible, reinicio explícito y fallos mínimos: menos energía/luz, bomba parada, atasco y lote rechazado. Igual área y recursos al comparar siembra escalonada y sincronizada; daño y recuperación persistentes. Una comprobación ejecutable debe fallar si reaparecen masas negativas, reinicios mágicos o un porcentaje prefijado. |
| **S2 · P3 interfaz, captura y offline** | Simulador 3D y `deck/LEEME.md`; conservar interacción directa y estilo existentes. | Recorrido Marte→módulo y vista técnica legibles, unidades y tipo de evidencia en fichas, controles de pausa/reinicio y reducción de movimiento. Three.js local con versión única. Capturas nuevas del anillo único; probar controles, consola, reinicio y desconexión en Chrome y medir FPS en el equipo real. Sin prueba física, informar sólo funcionamiento digital. |
| **S3 · P4 ensayos y mecánica** | B7, B15–B18, modelos y fuentes primarias de agronomía, operación y seguridad. | Cálculos de cargas, par de arranque, bloqueo y espacio de equipos **con supuestos trazables**; protocolos mínimos para indexado con carga, riego/recuperación y aislamiento de lote. Si el equipo aporta mediciones, conservar datos crudos, instrumentos, fecha e incertidumbre; de lo contrario dejar resultados como pendientes. Biología, animales, digestión y percloratos sólo con laboratorio/supervisión competente. |
| **S4 · P4 costes y caso Chiapas** | Presupuestos del usuario como borradores, geometría vigente, recursos reales y precios fechados. | Tres presupuestos separados: demostrador Madrid, piloto Chiapas y concepto marciano. Hoja con fórmulas, unidades, IVA/envío/contingencia y estado de cada precio. Sin precio verificable: «pendiente de cotizar», nunca cero. Elegir un caso piloto de Chiapas con indicador base y comparación; no prometer ROI ni ahorro de masa refutado por P1. |
| **S5 · P5 evidencia y defensa** | Matriz, registro de afirmaciones, P3/P4, reglas de Madrid si llegaron, materiales del hackathon y feedback real. | Memoria modular, Documento Concepto, planos, deck, guion de 5 min provisional, respuestas técnicas y video de respaldo. Cada cifra del pitch debe rastrearse a fuente, cálculo o medición. PDF/diapositivas renderizados y revisados visualmente. Si falta formato oficial, marcarlo pendiente sin fingir conformidad. |
| **S6 · cierre independiente** | Versión candidata completa y diff por paquetes. | Ejecutar demo **sin Internet** desde carpeta limpia, comprobar manifiesto/versiones, controles, enlaces, fuentes, cifras, vídeo y backups. Revisión crítica independiente de máximo 10 hallazgos con evidencia. Resolver los críticos y registrar límites restantes; sólo llamar «listo para revisión del equipo» a lo que cumpla §5 O de `MISION`. |

**Modelo por sesión (revisar disponibilidad al empezar):** S0 y S1, **Astra high** por las contradicciones y el modelo causal; S2, **Sol medium/high** para interfaz, capturas y offline, con revisión puntual de Astra en afirmaciones científicas; S3, **Astra high** y `xhigh` sólo si una contradicción físico-química cambia el diseño; S4, **Terra medium** para hojas y cotejo de precios bajo fórmulas definidas, con **Astra high** para aprobar hipótesis y conclusiones; S5, **Astra high** para integrar evidencia y defensa, **Sol medium** para pulido delimitado; S6, **Astra high** para cierre y, si está disponible, **Opus como revisor de sólo lectura**. Luna queda para extracción o formato repetible con plantilla, nunca para decidir viabilidad. No cambiar de modelo a mitad de una decisión sin dejar un checkpoint.

Al finalizar cada sesión: actualizar `docs/madrid/ESTADO.md` con archivos/commit, requisitos afectados, decisiones, pruebas realmente ejecutadas, bloqueos y siguiente comando; crear commit local sólo del paquete revisado. No mezclar los archivos preexistentes sin seguimiento por Git. Si un paquete no supera su criterio de aceptación, dejarlo «en curso» con causa concreta y continuar tareas independientes.

## 4. Herramientas previstas, según necesidad

| Necesidad | Recurso | Límite de uso |
|---|---|---|
| Plan y revisión | Skill `superpowers:writing-plans` (usada para este relevo), `superpowers:systematic-debugging` al hallar fallos y `superpowers:verification-before-completion` antes de cada cierre. | Leer la skill al aplicarla en la sesión futura; no agregar ceremonias sin una prueba útil. |
| Bases y artículos | Skill `pdf:pdf`, `pdftotext`/`pdfinfo` y búsqueda web en fuentes primarias (NASA, ESA, FAO, trabajos originales, organizador). | Citar página, revisión y condiciones. Las bases locales mandan sobre la interpretación del reto; una norma no certifica el diseño. |
| Cálculo físico y químico | Python estándar y scripts de `analysis/`, configuración JSON y ecuaciones con unidades en Markdown/LaTeX. | La fórmula visible acompaña al código que reproduce el número; comprobar dimensión, conservación y sensibilidad. **No hay motor LaTeX ni MCP de LaTeX comprobado en este equipo al 19 sep**; incorporarlo sólo si la memoria final necesita una exportación matemática que las herramientas presentes no logren. |
| Simulador y geometría | Chrome/headless y, sólo si hace falta para una pieza vigente, Blender/MCP de Blender instalado. Skill `frontend-design:frontend-design` si se revisa la interfaz. | Three.js existente primero; Blender anterior sigue histórico. Medir rendimiento en el hardware objetivo, no extrapolar WebGL por software. |
| Presupuestos y entrega | Skill `spreadsheets:Spreadsheets` para hoja con fórmulas; `presentations:Presentations` y `pdf:pdf` para exportar/verificar P5. | No usar conectores de publicación, Canva/Figma ni nuevas dependencias salvo que resuelvan una necesidad concreta. |

`/graphify` sólo activa la skill `graphify` si el usuario la invoca. No instalar una colección de MCP «por si acaso». La disponibilidad de plugins, modelo y autenticación puede cambiar: verificarla al retomar. El modo **Plan** y **GPT-6 Astra** se seleccionan en la interfaz de la próxima sesión; este archivo no puede activarlos ni reservar cuota automáticamente. Usar Plan Mode para revisar S0 y ajustar la secuencia; pasar a modo de ejecución antes de editar P3–P5.

## 5. Mensaje listo para la próxima sesión

> Lee `MISION-MADRID-MILPA360.md`, este plan, `ESTADO.md` y `P4-MECANICA-ENSAYOS.md`.
> Verifica Git y el checkpoint S3. Ejecuta **S4/P4**, con Terra medium para hoja y precios y
> Astra high para hipótesis: lista preliminar del demostrador, tres presupuestos separados,
> fuentes de precios/IVA/envío y un caso concreto de Chiapas. Los presupuestos previos del
> usuario son borradores intactos, no cotizaciones. No declares cerrado el diseño marciano:
> B19 requiere una ruta completa, B15–B18 equipos/dosel/estructura y B7 pesajes.
> Si hay datos humanos nuevos, intégralos en S3 y vuelve a probar P3. Mantén las cifras S3
> (3.086 m² útiles) y distingue maqueta pequeña de banco a carga real. No repitas P0/P1.
> Después aplica la dirección visual de §6 al integrar S5; no adelantes el acabado a decisiones
> mecánicas aún no resueltas. No comprar ni publicar. Push sólo de checkpoints revisados.


**Pendiente de S2:** abrir la demo en el hardware que se llevará a Madrid, registrar GPU/navegador,
probar controles y medir el criterio propuesto de 30 FPS a 1080p. El resultado con renderizado por
software no confirma ni refuta ese rendimiento con la GPU real.

**Datos humanos que no pueden inventarse:** reglas de Madrid, feedback, delegación, presupuesto,
recursos de laboratorio, mediciones y ratificación de D1/D2. Se solicitaron durante esta ejecución;
si aún faltan, conservar el bloqueo exacto y avanzar con lo independiente.

## 6. Dirección visual autorizada por el usuario · 20 sep 2026

El usuario pide una transformación visual **profunda y muy perceptible** del modelo. Queda
como requisito de integración en **S5**, apoyado en las correcciones P2/P3 de S3 y la selección
de recursos S4. No se limita a cambiar colores. Tampoco autoriza representar un mecanismo
imposible ni convertir imágenes en evidencia científica.

Salida prevista: escena Marte→superficie→módulo con escala legible, casco/entrada/colectores
coherentes con la revisión adoptada, piezas funcionales detalladas, materiales y luz cuidados,
corte/explosión útiles, seguimiento de lote y vistas que expliquen mantenimiento y fallos.
Conservar rótulos sobre piezas, tubos seleccionables, tipografía y controles accesibles.
Integrar el relato y las nuevas capturas en el deck de S5; conservar versiones anteriores.

Criterios para aceptar la mejora: comparación visual antes/después en las mismas poses;
cotas y estado coincidentes con la configuración; núcleo/acceso sin trucos de cámara;
fuentes y licencias locales; arranque sin Internet; reducción de movimiento; prueba de
legibilidad en proyector y objetivo de 30 FPS en GPU del evento medido, no supuesto.
No migrar de Three.js ni añadir `transmission` para conseguir el acabado.

**Herramientas comprobadas:** Blender MCP conectado, Blender 5.2.0 LTS, addon 1.6/protocolo 5;
lectura de escena realizada. No se modificó la escena abierta. En S5, geometría técnica por
Python desde la configuración; exportación/importación y dimensiones verificadas antes del uso.
Búsqueda web y Chrome disponibles; no requieren otro MCP de búsqueda.

**Google:** Google Drive (incluye Docs/Sheets/Slides) localizado y ofrecido para instalación;
su conexión requiere la cuenta del usuario y no se ha confirmado. Mientras tanto, cálculos,
documentación y futuros presupuestos se preparan localmente. No instalar Gmail/Calendar ni
otros conectores sin una tarea concreta. No hay compilador LaTeX comprobado: las ecuaciones
ya están en Markdown/LaTeX; evaluar motor sólo al exportar la memoria S5.
