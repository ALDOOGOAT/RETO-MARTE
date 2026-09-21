# ESTADO · preparación para Madrid

**Sesión:** continuación S5/P5, estudio B19. **Fecha:** 21 sep 2026.
**Rama:** `preparacion-madrid-p1`; base S5 `589ca5b`. El commit de este checkpoint
identifica la revisión B19. Push de checkpoints autorizado, sin force-push.
**Aceptación:** B19 parcial; B15–B18, pruebas físicas, reglas finales y S6 abiertos.

## Resultado revisable

`B19-ACCESO.md` documenta la candidata de dos casetes extraíbles. El nuevo visor
`prototipo-3d/milpa360-acceso.html`, enlazado desde inspección técnica, permite
bloquear, declarar presión compatible como escenario, aislar, extraer, estacionar,
habilitar paso, entrar, salir y restituir el anillo. Muestra carga, guías segmentadas,
ramales desconectables, depósitos, puertas y reserva humana. Los apoyos y ruedas
son ilustrativos; no hay componentes seleccionados ni capacidad demostrada.

El estudio es independiente del reloj biológico. Conserva identidad y masa de los
dos lotes, y no cuenta producción mientras se inspecciona la maniobra. Al cortar
energía durante traslado congela el progreso; restaurarla exige orden explícita
para continuar. Con ocupación interior se rechazan órdenes que muevan la carga,
cierren acceso o liberen el pasador. La salida desde puertas abiertas funciona
sin electricidad en el modelo. La retención mecánica correspondiente sigue pendiente.

La configuración `acceso_servicio` concentra los supuestos; el cálculo reutiliza
P2 y alimenta JSON, datos de navegador, tabla del informe y plano P06. Se conservaron
el casco nominal y las 20 posiciones. P1/P2/P3/P4 se regeneraron y el modelo agrícola
conserva sus resultados; cambió la revisión y se añadió la candidata, sin sustituir
dimensiones de régimen por las de mantenimiento.

## Hallazgos que cambian la decisión

**H1 · margen frágil:** dos posiciones dan 0.97649 m de cuerda. Con herrajes
supuestos de 30 mm/lado quedan 0.91649 m, sólo 16.49 mm sobre el objetivo de 0.90 m.
Con 40 mm quedan 0.89649 m. El máximo geométrico es 38.25 mm por lado antes de
justificar tolerancias. No es ancho certificado ni permite inferir rescate asistido.

**H2 · espacio adicional:** el vestíbulo de 3.0 × 2.2 m más cuello añade 6.663 m²
(40.8% de la huella circular) y 14.66 m³ interiores. La longitud del conjunto es
6.76 m. Faltan estructura, espesores exteriores, masa, acondicionamiento y presupuesto.
Su puerta conduce al hábitat presurizado; no se dimensionó una esclusa EVA.

**H3 · carga:** ambos cartuchos suman 179.7 kg nominales, con intervalo de escenarios
139.8–219.7 kg. Casetes, útil y parte de la biomasa no están incluidos; su masa es
`null`, no cero. No se propone izado manual. El dimensionado de apoyos, frenos,
acoples y extracción sigue siendo trabajo mecánico con datos reales.

**H4 · cultivo:** permanecen 2.5715 m² dentro y 0.5143 m² fuera durante mantenimiento.
No se conserva automáticamente la producción de doce recipientes. Un servicio
prolongado necesita duración, luz, riego, pérdidas y ciclo; aquí no se inventan.

## Verificaciones y fuentes

El cálculo comprueba barridos traslacionales completos mediante polígonos convexos
conservadores y SAT, vecinos, separación entre cargas, portal y depósitos. Incluye
un obstáculo entre extremos como autocomprobación. La reserva humana Ø0.80 × 2.00 m
es un supuesto de cribado; dosel e instalaciones reales no están verificados.

Pasaron verificaciones de geometría, mallas Three, mecánica P4 y pruebas del modelo
agrícola. Las pruebas B19 cubren secuencia, presión desconocida, estados rechazados
sin mutación, conservación, corte durante traslado, ocupación, salida sin energía
y ausencia de rearranque automático. Chrome verificó controles, retorno y vista
móvil sin errores ni solicitudes HTTP. Capturas e informe en `capturas-b19/` y
`PRUEBA-B19-NAVEGADOR.json`. No acredita rendimiento del hardware del evento.
Se repitió B19 desde el ZIP extraído en carpeta limpia, con red deshabilitada;
pasaron los controles y se revisaron visualmente el plano y las capturas.

Se leyó NASA Vol.2 web §8.3–8.4 sobre rutas, acceso asistido y puertas, con fuente
en B19. Se añadieron cuatro afirmaciones trazables. La matriz mantiene 27 obligatorios:
uno con evidencia documental, 24 parciales, uno pendiente y uno por confirmar.

## Continuidad exacta

Reproducir `python3 analysis/milpa360_acceso.py`, `python3 analysis/milpa360_p3.py`
y `npm test --prefix prototipo-3d`. El ZIP P3 incluye el estudio actualizado. El paquete
S5, PDF/PPTX/BLEND/GLB de `589ca5b`, conserva su corte; no adopta aún el vestíbulo.

**Siguiente acción:** cerrar envolventes de herrajes/útil/dosel y disponibilidad de
espacio presurizado; preparar plantilla 1:1 sin carga y revisión del banco con carga.
Si faltan esos datos, comparar tres posiciones o disposición abierta/fija con los
costes espaciales ya calculados. Ratificar arquitectura antes de reexportar S5.
S6 sigue pendiente. Los cinco archivos preexistentes del usuario permanecen intactos.
