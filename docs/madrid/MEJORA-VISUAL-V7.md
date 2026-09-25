# V7 · Pitch breve y detalle visual

23 sep 2026. Abrir `prototipo-3d/milpa360-simulador.html` y pulsar **Pitch con voz · menos de 1 min**. **Recorrido completo** conserva la explicación extensa. El guion corto tiene ocho escenas y una pista continua por idioma: el cambio de capítulo no recarga la voz.

- Español: audio de **47.064 s**. Inglés: **51.744 s**. Ambos incluyen pausas entre escenas, subtítulos alineados y controles de pausa, avance e idioma. La duración interactiva se mide desde el inicio de la voz, después de preparar las escenas; la carga inicial depende del equipo. El MP4 tiene duración fija.
- Vídeo listo para insertar: `outputs/pitch-v7/MILPA-360-pitch-es.mp4`, **47.367 s**, Full HD, H.264/AAC, 30 fps de salida. `VERIFICACION-VIDEO.json` registra duración, resolución y cantidad real de capturas; el vídeo no acredita 30 fotogramas distintos por segundo en todo instante.
- Persona con rostro escaneado, mapas de color y normales, gafas, ropa con volumen y microtextura, manos alineadas con la tableta, suelas redondeadas y transición gradual entre reposo y marcha. Se mantiene la altura erguida de 1.75 m.
- Hojas con superficie subdividida, curvatura interior y texturas 512 × 1024; regolito 1024²; detalle de metal cepillado, suelo, musgo y tejido. Vegetación sigue instanciada; no se añade transmisión ni posprocesado.
- Encuadres dedicados al pitch, acercamiento al cultivo, jerarquía tipográfica y cuenta atrás. **Máxima · 2×** permite renderizar a doble resolución por eje; **Automática** adapta la resolución al equipo.

## Alcance del recorrido

Anillo y trazabilidad, animales y residuos, tratamiento separado de salmuera, biogás/nutrientes, cultivo/goteo, fallos y comparación, acceso B19 y retorno a Chiapas. El audio dice expresamente que es aporte complementario, requiere energía externa y quedan ensayos pendientes.

En el capítulo B19 el paso empieza **ya preparado**, con los cartuchos apartados. Se muestra la salida completa sin energía a la velocidad de animación existente (0.60 m/s). La maniobra completa sigue en el recorrido largo y el visor de acceso. Esa velocidad y los tiempos visuales no son tiempos mecánicos medidos. El pitch ejecuta un escenario independiente y restaura los inventarios de exploración al salir.

## Evidencia y reproducción

`PRUEBA-VISUAL-V7.json`: recorridos ES/EN completos por debajo de 58 s, sin recargas de audio entre capítulos; pausa, salto, cambio de idioma, reproducción sin voz, conservación del escenario, tamaño móvil y ejecución `file://` sin permisos extra y con HTTP/HTTPS bloqueado. Capturas en `capturas-v7/`. Prueba de voz automatizada con navegador silenciado: comprueba reproducción y sincronización, no altavoces del evento.

```bash
npm --prefix prototipo-3d test
node analysis/verificar_modelo_geometrico.cjs
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia \
MILPA_VISIBLE=1 MILPA_GPU=1 MILPA_FILE_ESTRICTO=1 \
node --experimental-websocket analysis/verificar_pitch_v7.mjs --exportar
```

Las variables PRIME corresponden a la RTX 4060 local. El informe mide cuatro segundos por calidad a 1920 × 1080, proceso pausado; no garantiza mínimos sostenidos ni el rendimiento del proyector. **Máxima** renderiza 3840 × 2160 internamente y cuesta más que **Detalle alto**. Son opciones explícitas; el arranque conserva la calidad automática. En la última pasada local: **112.1 FPS en detalle alto** y **72.7 FPS en máxima**, con 575 llamadas de dibujo en ambos casos. Las pasadas anteriores oscilaron aproximadamente entre 91–112 y 59–73 FPS, respectivamente; son muestras locales, no mínimos garantizados.

Regresión de la explicación extensa y acceso:

```bash
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia \
MILPA_VISIBLE=1 MILPA_GPU=1 MILPA_FILE_ESTRICTO=1 MILPA_VISUAL_V5=1 MILPA_REGRESION_V7=1 \
node --experimental-websocket analysis/verificar_p3_navegador.mjs
```

Audio: `analysis/narracion_pitch.py`, con Piper instalado en el entorno documentado de V5. La generación vuelve a medir los MP3 con ffprobe y rechaza una duración de 55 s o más. Rostro: `analysis/preparar_rostro.py`. Reproducir estos generadores puede cambiar los binarios; regenerar después el MP4 y el informe.

## Créditos y límites

Rostro **Infinite, 3D Head Scan**, **Lee Perry-Smith / triplegangers.com**, CC BY 3.0. [Fuente, licencia y adaptación](../../prototipo-3d/vendor/CREDITOS-PERSONA.md). El escaneo no representa al equipo; su uso es una referencia visual. El cuerpo sigue siendo procedural, no un humano digital fotorrealista completo.

No cambian los parámetros nominales, la arquitectura B ni los balances. Comprobar área/altura y animar el acceso no valida resistencia, presión, antropometría ni procesos biológicos. Los ZIP y publicaciones anteriores conservan su revisión: esta entrega actualiza el repositorio y añade el MP4.
