# B19 · extracción, almacenamiento y acceso

**21 sep 2026 · base S5 `589ca5b` · estudio digital autorizado al continuar el plan.**
La candidata es revisable; **B19 permanece parcial**. Su cribado geométrico y sus
enclavamientos digitales no acreditan evacuación real, resistencia ni estanqueidad.
El casco nominal sigue en Ø4.56 × 2.20 m y el anillo conserva 20 posiciones.

Abrir [estudio interactivo](../../prototipo-3d/milpa360-acceso.html). Usa el mismo
JSON de parámetros, Three 0.160 y fuentes locales del simulador. El recorrido
se detiene al cortar energía y exige reanudación explícita. No consume tiempo
biológico ni registra producción durante la inspección.
El [plano P06](../../prototipo/planos/madrid/P06-acceso-servicio.html) muestra la planta
acotada y la tabla generada desde los mismos parámetros.

## 1. Resultado y decisión

Se desarrolla un vestíbulo lateral **presurizado**, conectado al hábitat principal.
Los cartuchos de C11 y C12 salen radialmente con sus segmentos de soporte, guía
y riego; después se separan hacia dos depósitos laterales. Las piezas permanecen
identificadas L19/L20 en el caso inicial. No se vuelca ni desaparece el sustrato.
El paso central sólo se habilita una vez aparcadas y retenidas ambas cargas.

<!-- CALCULOS:B19 -->

| Magnitud calculada | Resultado nominal |
|---|---|
| Paso bruto / con herraje | 0.976 / 0.916 m |
| Margen frente al objetivo de 0.90 m | 16.5 mm |
| Carga con reserva / portal | 1.388 / 1.50 m |
| Huella / volumen adicionales | 6.663 m² / 14.66 m³ |
| Longitud total con vestíbulo | 6.76 m |
| Incremento de huella / herraje máximo por lado | 40.8% / 38.2 mm |
| Dos cartuchos: favorable / nominal / conservador | 139.8 / 179.7 / 219.7 kg |
| Casetes y útil | Masa pendiente; no incluida en las cargas anteriores |
| Cultivo en anillo / retirado | 2.5715 / 0.5143 m² |
| Paso entre depósitos con reserva | 1.350 m |
| Error de circunscripción digital | 0.0103 mm |

<!-- /CALCULOS:B19 -->

**Hallazgo decisivo:** 30 mm de herraje por lado dejan un margen de sólo unos
16 mm respecto al objetivo geométrico de 0.90 m. Con 40 mm ya no se alcanza.
No se eligió el límite de 0.90 m como norma de evacuación; proviene del pasillo
supuesto del proyecto. Antes de adoptar la solución, medir la envolvente del
conjunto, deformación, uniones, ropa y herramientas. No ajustar la cifra para
marcar cumplimiento. Si la reserva real no cabe, comparar tres posiciones de
servicio o una disposición abierta/fija, con sus cambios de área y ciclo.

El vestíbulo aumenta sustancialmente huella y volumen presurizado. Su masa,
presurización, energía, limpieza y coste son **pendientes**, nunca cero.
Los aproximadamente 180 kg nominales son cartuchos y sustrato; faltan casetes,
acoples, contención, útil y parte de la biomasa. No se propone levantarlos a mano.
El dato conservador del cálculo se presenta para dimensionar el siguiente banco,
sin convertir el supuesto en capacidad de un equipo comprado.

## 2. Interfaces físicas que requiere la candidata

| Interfaz | Propuesta concreta | Evidencia que falta |
|---|---|---|
| Anillo y casetes | Dos sectores independientes, extraíbles sin giro; el resto del anillo inmovilizado | Uniones, rigidez con sectores ausentes, cargas, fatiga y apoyos reales |
| Útil de traslado | Dos carros guiados con apoyo continuo; primero radial, luego lateral | Actuador/freno, esfuerzo de extracción, retención sin energía y operación de rescate |
| Riego | Cerrar ramales, desconectar con retención de líquido y retirar su sección con cada casete | Acoples, presión, fuga, limpieza y reconexión; no doblar ni atravesar un tubo rígido |
| Piso | Ruta al datum 0, sin guías ni umbrales que crucen el paso | Suelo resistente, ranuras, riesgo de tropiezo y drenaje |
| Puertas | Portal de carga al módulo y puerta al hábitat, ambos a presión compatible | Sellos, estructura, cierre manual desde ambos lados, fuerzas y tiempos |
| Almacenamiento | Dos bahías laterales; retención mecánica y contención de sustrato | Dosel, carga completa, riego/iluminación si se exige mantener cultivo fuera |
| Bloqueo | Pasador positivo, aislamiento del accionamiento y retención de cargas/puertas | Independencia del software, supervisión de posición, fallo único y prueba mecánica |
| Persona | Cilindro de cribado Ø0.80 × 2.00 m; ruta recta y giro dentro del pasillo | Antropometría, trajes, herramientas, acompañante y evacuación asistida |

La escena técnica muestra una **reserva** cilíndrica de núcleo y cargas sin dosel
real. Es distinta del detalle ilustrativo de los equipos de S5. B15–B18 continúan:
aviario, luminarias, tuberías, raíces, plantas y útiles tienen que respetar esa
reserva en la instalación completa. No se han ocultado sus conflictos bajo una
declaración de acceso resuelto.

La puerta del extremo da a un volumen habitable presurizado. Este vestíbulo **no
está dimensionado como esclusa EVA** ni contiene una secuencia de despresurización.
Una conexión exterior exige otra arquitectura y otro análisis. No abrir al vacío
ni tratar una casilla digital como lectura de presión.

## 3. Operación, corte de energía y retorno

1. Detener indexado, impedir ocupación interior y enclavar el pasador.
2. Declarar presión compatible únicamente como escenario digital; en la instalación
   se necesitarán indicación de presión y operación manual verificadas.
3. Aislar ramales, sellar acoples y preparar puertas con la carga apoyada.
4. Trasladar radialmente 1.00 m; el paso continúa cerrado.
5. Separar las cargas 0.70 m hacia cada lado y retenerlas.
6. Retener puertas abiertas, comprobar la ruta y habilitar ocupación.
7. Salir incluso sin alimentación eléctrica. Ninguna orden mueve casetes, libera
   el pasador o cierra la ruta mientras figure una persona dentro.
8. Sin ocupación, cerrar el acceso, centrar y reinsertar cargas, reconectar e
   inspeccionar. Restaurar energía por sí solo no reinicia ni reanuda la maniobra.

El modelo comprueba órdenes, presión desconocida y estados incompatibles. El fallo
durante una traslación congela su progreso; al volver la energía, hace falta una
orden explícita para continuarlo. La retención mecánica que representa ese estado
sigue siendo un requisito por demostrar. La salida sin energía se prueba desde
un estado ocupado con puertas ya abiertas; no prueba salida frente a fuego,
depresurización, atasco de puerta o persona incapacitada.

## 4. Método de cálculo y alcance de las pruebas

`analysis/milpa360_acceso.py` reutiliza radios, ángulos, masa y piso de P2. Construye
polígonos convexos conservadores de los cartuchos; circunscribe su borde exterior
con un error geométrico explícito. Para cada tramo recto, la envolvente convexa de
inicio y fin representa **todo el barrido traslacional**. SAT comprueba separación
frente a los 18 vecinos, y una prueba con obstáculo entre extremos demuestra que
el verificador detecta colisiones intermedias.

Se verifica carga extraída fuera del casco, portal de carga, contención de depósitos,
ruta horizontal y altura bajo los supuestos declarados. El traslado lateral de las
dos piezas diverge y conserva su separación. No es análisis de colisión de todos
los equipos S5 ni prueba estructural. El espesor de herrajes y el error numérico
son magnitudes distintas; la tolerancia de fabricación continúa pendiente.

Durante el acceso quedan diez recipientes de cultivo en el anillo y dos fuera.
No se mantiene automáticamente la producción de doce. La escena de mantenimiento
pausa su reloj; el balance P1 de régimen nominal no cambia. Un servicio prolongado
necesita cuantificar duración, interrupción de estaciones, luz, riego y pérdidas.
No se extrapola un rendimiento diario de este recorrido geométrico.

## 5. Referencia de diseño y ensayo que sigue

Se leyó [NASA-STD-3001 Vol. 2, capítulo 8](https://www.nasa.gov/reference/8-0-architecture-vol-2/)
el 21 sep 2026, apartados 8.3–8.4: V2 8013/8014 exigen estudiar tareas y rutas
despejadas; 8020 incluye acceso asistido; 8022/8028 tratan operación manual e
igualación de presión; 8027 requiere considerar persona, traje y equipo. Son
referencias de diseño, no reglas de la final ni evidencia de conformidad. No dan
por aprobado el ancho elegido aquí. La referencia E del concurso se conserva.

El siguiente ensayo viable es una plantilla de piso a escala 1:1 con cartuchos
vacíos, obstáculos y útil simulado: medir el paso real y los movimientos antes
de añadir cargas. Registrar ropa/equipo, instrumentos, dimensiones, incertidumbre,
intentos, roces y tiempo. La carga representativa exige banco revisado y apoyos
dimensionados; evitar personas bajo cargas. La simulación no sustituye esa prueba.

**Condición de adopción pendiente:** confirmar espacio adicional, cerrar envolventes
con componentes elegidos, comprobar acceso normal y asistido, y demostrar retención
mecánica/salida sin energía. La aprobación del estudio no aprueba fabricación.

## 6. Reproducir

```sh
python3 analysis/milpa360_acceso.py
python3 analysis/milpa360_p3.py
npm test --prefix prototipo-3d
MILPA_SOLO_ACCESO=1 node --experimental-websocket analysis/verificar_p3_navegador.mjs
```

Config: `acceso_servicio` en `config/milpa360.parameters.json`. Resultados:
`config/milpa360.acceso.json`. La vista y plano usan esos mismos datos. Las
capturas y `PRUEBA-B19-NAVEGADOR.json` registran únicamente pruebas ejecutadas.
Memoria/PPTX/BLEND/GLB de S5 y su ZIP permanecen como revisión `589ca5b`; aún no
incorporan el vestíbulo como arquitectura adoptada. Reexportarlos después de esa decisión.
