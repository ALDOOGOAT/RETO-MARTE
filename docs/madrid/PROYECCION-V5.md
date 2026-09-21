# V5 · presentación narrada y acceso comprensible

Base: `f3b61e2`, 21 sep 2026. Revisión autorizada de interfaz y representación;
las dimensiones, inventarios y condiciones de acceso mantienen su autoridad.

## Diseño elegido

La escena ocupa el espacio principal. Archivo conserva la identidad del proyecto,
con ancho normal para lectura, texto de 18–22 px y títulos de 32–48 px. Azul profundo
`#081521`, marfil `#edf3f2`, azul claro `#90d7ec`, verde vegetal `#b9d393` y cobre
`#ffbc83` separan contexto, interacción, cultivo y acción. Los textos se alinean
a la izquierda; cada explicación comienza por qué hace la pieza y por qué importa.
Los números detallados y fuentes se consultan dentro de la interfaz.

El modo de proyección usa capítulos con cámara continua, un título y subtítulos
grandes, pausa, anterior/siguiente, volumen, idioma y salida. El usuario inicia el
audio; no se reproduce sonido al abrir la página. Se incluye audio local generado
con Piper para evitar depender de voces del navegador o de Internet en Madrid.
La narración es sintética y se identifica; créditos y versiones acompañan los audios.

El acceso tiene una demostración de su secuencia real: bloquear, comprobar la condición
de presión, aislar, extraer, estacionar, entrar y salir. La persona camina; puertas y
carga se desplazan. La salida conserva la regla de operación sin energía. La secuencia
visual no certifica fuerzas, sellos, presión, evacuación ni ergonomía física.

El recorrido ejecuta un escenario ilustrativo propio con el mismo modelo de proceso,
iniciado en el sol 62. Sólo en los capítulos del anillo y cultivo avanza 0.65 soles
por segundo de exposición. Es una compresión temporal declarada, no una velocidad
de máquina. El estado de exploración se guarda sin modificar y se restaura al salir.
La pausa detiene narración, cámara y avance de ese escenario.

Las figuras humanas usan articulaciones y tareas visibles. La figura del módulo
consulta un instrumento en su posición de referencia: no se inventa una ruta de
entrada aprobada. Las plantas interpolan la transición entre estados del modelo;
un cambio de lote o cosecha se explica como tiempo acelerado. El corte es una
herramienta de inspección, no la apertura de un hábitat presurizado.

## Cómo proyectar

1. Copiar **toda** la carpeta `prototipo-3d`, con `vendor/` y `audio/`. Abrir
   `milpa360-simulador.html` en Chrome, elegir ES o EN y pulsar **Proyección con voz**.
2. Activar pantalla completa con ⛶. La voz empieza tras pulsar el botón; se puede
   desactivar, cambiar volumen o dejar sólo subtítulos. No se instala una voz en el
   equipo de presentación ni se consulta un servicio remoto.
3. Espacio pausa/continúa; flechas cambian capítulo; Escape sale. **Repetición**
   mantiene el recorrido para una exposición continua. Al ocultar la pestaña, pausa.
4. `milpa360-acceso.html` ofrece **Ver maniobra con voz** para explicar sólo el acceso.
   Los controles manuales siguen disponibles al salir del recorrido.

| Recorrido | Español | Inglés | Capítulos |
|---|---:|---:|---:|
| Módulo completo | 236.5 s | 239.3 s | 9 |
| Acceso independiente | 98.0 s | 94.5 s | 6 |

Son sumas de duración de clips y permanencia mínima, sin contar cargas/transiciones
o pausas. No constituyen un ensayo cronometrado frente al jurado. La narración
completa está en `milpa360-guion.js`; sus subtítulos y tiempos reales, en
`milpa360-audio.js`. [Créditos del audio](../../prototipo-3d/audio/CREDITOS.md)
identifica Piper 1.3.0, las voces, atribución, normalización y regeneración.

## Archivos y límites de revisión

- `milpa360-personas.js`: figura compartida de 30 mallas, estatura erguida normalizada
  a 1.75 m; la caja envolvente varía con la postura. El apoyo considera rodilla, bota
  y suela. La reserva dimensional del acceso se dibuja aparte, sin heredar escala
  ni oscilación de la figura. No son tolerancias de fabricación ni validación antropométrica.
- `milpa360-proyeccion.js`: controles y sincronización de audio/subtítulos comunes.
- `milpa360-interfaz.css`, contenido y traducciones: presentación accesible ES/EN.
- Los dos HTML coordinan cámara y estados. B19 bloquea la extracción hasta abrir
  las puertas y retiene ocupación mientras camina la persona.
- El modelo científico y los JSON dimensionales no cambian. Los fundamentos LaTeX
  anteriores siguen disponibles; esta sesión no introduce resultados científicos.

**La revisión interactiva es V5.** Blender/GLB, memoria, deck y vídeo de respaldo
conservan instantánea V4; no incluyen las personas ni la voz V5. Sus cotas y cálculos
continúan vigentes. El MP4 anterior no se presenta como una grabación de este tour.

## Verificación ejecutada

| Comprobación | Evidencia |
|---|---|
| Modelo y enclavamientos | `npm test --prefix prototipo-3d`: determinismo, conservación, cuatro fallos, autorización y acceso |
| Dimensiones Three.js | `node analysis/verificar_modelo_geometrico.cjs`: extrusiones y cotas |
| Audio | 30 MP3 decodificados completos con FFmpeg; hashes y subtítulos cotejados |
| Proyección | `PRUEBA-PROYECCION-V5.json`: nueve vistas, avance automático, fin, pausa, voz ES/EN y acceso completo |
| Regresión | `PRUEBA-P3-NAVEGADOR.json` y `PRUEBA-B19-NAVEGADOR.json`: controles, inventarios, geometría, parada y retorno |
| Presentación | Capturas reales de 1920×1080 y 390×844, revisadas por legibilidad y recortes |
| Sin Internet | Chrome en modo offline, HTTP/HTTPS bloqueados, apertura `file://` sin permiso especial de archivos |
| Paquetes | Manifiestos SHA-256 y cotejo S6 con la carpeta limpia realmente ejecutada |

El verificador recorre las nueve vistas y prueba las transiciones automáticas, pero
no escucha toda la narración de principio a fin. Chrome se silencia durante la
automatización; la decodificación no acredita la calidad por altavoces. La prueba
con el proyector y sonido del evento corresponde al ensayo del equipo.

Se mide la RTX 4060 Laptop con Chrome visible X11; las muestras FPS son de cinco
segundos, no un mínimo sostenido. En la última muestra: 55.4 FPS en módulo y 68.6 en acceso. Valores exactos y versión del navegador en el
JSON. No extrapolar a otra GPU o equipo. Las animaciones son ilustrativas y no
cierran las brechas físicas documentadas en B19/CIERRE-ACUMULADO.

S6 verificó 243 archivos con hash en el paquete de revisión y cotejó 62 archivos
de aplicación idénticos a la carpeta probada. El ZIP P3 contiene 200 archivos con
hash. Las versiones y huellas están en `MANIFIESTO-S5.json` y `MANIFIESTO-P3.json`.

### Reproducir la prueba de proyección

Desde la raíz, con Chrome y Node 20 instalados:

```sh
env __NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia \
  MILPA_VISIBLE=1 MILPA_GPU=1 MILPA_FILE_ESTRICTO=1 MILPA_VISUAL_V5=1 \
  MILPA_DEMO_DIR=/ruta/extraida/prototipo-3d \
  node --experimental-websocket analysis/verificar_p3_navegador.mjs
```

Las dos variables NVIDIA seleccionan la GPU usada aquí. Para otro equipo, elegir
su configuración gráfica y registrar qué se probó. `analysis/empaquetar_p3.py` y
`analysis/empaquetar_s5.py` regeneran los ZIP; `analysis/verificar_entrega_s6.py`
coteja la carpeta probada con el paquete S5 (requiere Python con `pypdf`).
