# V8 · Personas escaneadas, luz de cine y cámara continua

25 sep 2026. Sólo representación: no cambian parámetros, arquitectura B, balances, inventarios ni guion.
Abrir `prototipo-3d/milpa360-simulador.html`; el pitch y el recorrido funcionan igual que en V7.

## Qué cambió

- **Personas.** La figura procedural se sustituye por dos avatares escaneados de Microsoft Rocketbox (MIT) con esqueleto Biped (80 huesos) y animación capturada: reposo, marcha, consulta de tableta y explicación con gestos, mezclados sin saltos. El **operador** (overol azul pizarra, 1.75 m) conserva la cota de referencia; la **científica** (bata, 1.68 m) explica en el pasillo y alterna con la consulta. La marcha se sincroniza con el avance para que los pies no patinen. Respiran aunque el proceso esté en pausa; el movimiento reducido los fija.
- **Luz.** Render HDR con MSAA → oclusión ambiental GTAO → brillo de luminarias y pantallas → ACES → viñeta y tramado anti-bandas. Fondos y nieblas se corrigen para verse igual que antes pese a la curva de tono.
- **Entorno marciano.** Suelo laterítico escaneado con variación a escala de decenas de metros; rocas erosionadas con textura de roca y 60 guijarros junto al módulo; neblina del color del horizonte que funde el borde del terreno y se cierra durante la tormenta; HDRI normalizado y virado a cielo marciano para los reflejos.
- **Materiales.** Chapa estriada escaneada en la cubierta, sustrato con relieve de barro seco, relieve de paneles y remaches en la piel exterior.
- **Vida y fluidez.** Las plantas se mecen con la ventilación; codornices y larvas se mueven en tiempo real. La cámara del simulador y del acceso sigue un resorte críticamente amortiguado sobre ángulo, altura, distancia y mira: describe arcos alrededor del módulo en vez de rectas que atraviesan el casco, y arranca y frena sin tirones en recorrido, clic y arrastre.

## Calidad y rendimiento

- **Automática** empieza con todo; si baja de 30 FPS suelta primero la oclusión y después la resolución.
- **Máxima · 2×** calcula la oclusión a media resolución (4K).
- **Más fluidez** vuelve al render directo, para gráficos integrados. `?post=0` fuerza lo mismo por URL.

Medición local (RTX 4060 portátil, 1920 × 1080, cuatro segundos, proceso pausado): **137.7 FPS en detalle alto** y **94.7 FPS en máxima** (V7: 112.1 y 72.7). Regresión V5: 148 FPS módulo y 164 FPS acceso. Muestras locales, no mínimos garantizados ni el equipo del evento.

## Evidencia

- `PRUEBA-VISUAL-V8.json` y `capturas-v8/`: pitch ES 47.27 s y EN 51.95 s sin recargas de audio, sin errores de consola ni peticiones de red, comprobaciones de cartuchos, área, altura 1.75 m y ausencia de transmisión en verde.
- `PRUEBA-REGRESION-V5-V8.json`: recorrido de nueve capítulos, acceso B19 completo, audio ES/EN, `file://` estricto, esqueleto y clips del avatar.
- Vídeo: `outputs/pitch-v8/MILPA-360-pitch-es.mp4`, 47.37 s, Full HD, H.264/AAC.
- `npm --prefix prototipo-3d test` y `node analysis/verificar_modelo_geometrico.cjs` en verde.

```bash
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia MILPA_VISIBLE=1 MILPA_GPU=1 \
MILPA_FILE_ESTRICTO=1 MILPA_REVISION=V8 node --experimental-websocket analysis/verificar_pitch_v7.mjs --exportar
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia MILPA_VISIBLE=1 MILPA_GPU=1 \
MILPA_FILE_ESTRICTO=1 MILPA_VISUAL_V5=1 MILPA_REGRESION_V8=1 node --experimental-websocket analysis/verificar_p3_navegador.mjs
```

## Recursos y reproducción

| Archivo | Origen | Regenerar |
|---|---|---|
| `vendor/tripulacion.js` (5.8 MB) | Microsoft Rocketbox, MIT | `python3 analysis/preparar_tripulacion.py` (Blender 5.2 vía `analysis/rocketbox_a_glb.py`) |
| `vendor/texturas-pbr.js` (5.7 MB) | Poly Haven, CC0 | `python3 analysis/preparar_texturas_pbr.py` |
| `vendor/three-addons.js` (95 KB) | three r160 `examples/jsm`, MIT | `node analysis/empaquetar_three_addons.mjs` |

Créditos en `vendor/CREDITOS-PERSONA.md` y `vendor/ORIGEN.md`. Todo va en base64 dentro de `.js`: el visor se abre por `file://` sin red.

## Límites

Las personas son referencia visual: no representan al equipo ni validan antropometría. Suelo, rocas y cielo son ilustrativos. Oclusión y brillo son efectos de pantalla, no simulación de iluminación. No cierra ensayos físicos.

Se probó una sonda de reflejos horneada de la propia escena. Con el terreno escaneado dentro, Chrome dejaba de entregar capturas y screencast aunque la página seguía a ~150 FPS; se retiró para no romper pruebas ni vídeo. El rostro V7 (`vendor/rostro-lee-perry.js`) queda sin uso, conservado como registro.
