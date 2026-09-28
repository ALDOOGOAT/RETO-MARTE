# Mejora visual V9 · una calidad, fluida, con voz

26 sep 2026. Sólo representación: no cambia parámetros, balances ni ensayos pendientes.

## 1. Una sola calidad, medida en la GPU del equipo

Se quitó el selector de calidad y el ajuste automático (bajaba la resolución hasta 0.65 y la imagen
se veía borrosa). Medido con `EXT_disjoint_timer_query_webgl2` en la Intel integrada
(Mesa RPL-P), 1920 × 1080, módulo en entorno marciano:

| Pase | ms por fotograma |
|---|---|
| Render de la escena (MSAA en HDR) | 21.2 |
| GTAO (incluye un segundo render de normales) | 21.6 |
| Brillo | 5.0 |
| Salida ACES | 6.0 |
| Viñeta | 1.7 |
| **Render directo con MSAA nativo** | **11.6** |

El posprocesado costaba ~44 ms (13–18 fps) y, en capturas comparadas, sólo aportaba un halo leve en
las lámparas. Se retiró. Queda: MSAA nativo, ACES del renderer, `pixelRatio` ≤ 1.25, tramado en los
materiales (sin bandas) y viñeta en CSS.

## 2. Polígonos y vértices

| | Antes | Ahora |
|---|---|---|
| Triángulos visibles (módulo en Marte) | 689 k | 402 k |
| Codornices (7) | 165 k | 52 k |
| `fusionar()` | desindexaba: 3 vértices por triángulo | conserva índices |
| Vegetación de bandejas vacías | escalada a cero, pero sombreada | fuera del lote instanciado |

Hojas con la mitad de segmentos de contorno (la subdivisión de `cerrarHoja` ya redondea), rocas un
nivel menos de detalle. Revisado en primer plano: no se aprecian facetas.

## 3. Calidad que no cuesta fotogramas

- Texturas escaneadas de terreno, sustrato y cubierta a 2048 (color y normal); con mipmaps la
  resolución sólo ocupa memoria.
- Filtrado anisotrópico al máximo de la GPU: suelo y rótulos en ángulo rasante.
- Encuadre de la sombra según la vista: ±4.5 m dentro del módulo, 1.44× más nítida con el mismo mapa.
- Planeta: mosaico Viking MDIM 2.1 a 4K y relieve MOLA (USGS), Sol a ~65° de la cámara para que se
  vea el terminador, atmósfera y velo de polvo iluminados sólo del lado de día.

## 4. Resultado (Chrome 148, Wayland, vsync 165 Hz, cámara girando, 8 s)

| Vista | FPS | p95 |
|---|---|---|
| Módulo, estudio | 105.6 | 12.2 ms |
| Módulo, entorno marciano | 80.2 | 18.2 ms |
| Exterior cerrado | 108.3 | 12.2 ms |
| Planeta | 164.7 | 6.1 ms |
| Acceso | 164.7 | 6.1 ms |

Pruebas: `verificar_p3_navegador.mjs` (general y acceso) y `verificar_pitch_v7.mjs` con
`MILPA_REVISION=V9` en verde; pitch a 60 fps en la ventana sin cabecera limitada a 60 Hz.

## 5. Isla de voz

Cápsula bajo la barra superior (`milpa360-isla.js`) en simulador, acceso y atlas. Al tocar un equipo,
un tubo, un punto del planeta, una fase de acceso o al llegar a una sección del atlas, se abre y lo lee
en voz alta (ver §6). Voz local Piper, la misma del pitch: 78 locuciones ES/EN
(4.8 MB) en `prototipo-3d/audio/fichas/`, generadas desde los textos del visor por
`analysis/narracion_fichas.py`. Sin red. Se puede pausar tocando el orbe y silenciar (se recuerda).
En el módulo, el equipo del que se habla late con un halo en el suelo y el tubo resaltado brilla.
La ficha se lee en tres tiempos: la idea, hasta tres cifras en burbujas y cómo se conecta.

## 6. Diálogo legible y Atlas interactivo (misma fecha, segunda pasada)

- La isla deja de resaltar palabra a palabra: esa cuenta se estimaba (Piper sólo da tiempos por
  frase), se desfasaba —más en inglés, con frases largas— y la cápsula cambiaba de alto. Ahora es un
  diálogo de altura fija con el texto completo a 18.5 px, la frase en curso iluminada con su tiempo
  exacto, contador y botón de cerrar. El título no se repite en el cuerpo.
- Atlas: globo que se gira arrastrando; cada dato del entorno comparado con la Tierra (38 % de la
  gravedad, 0.6 % de la presión, ≈106 veces la dosis natural media) y leído en voz al tocarlo; un aviso
  de Marte viaja a la Tierra y vuelve sobre una línea de tiempo mientras el módulo ya decidió; el
  anillo muestra qué pasa en cada posición y un cartucho lo recorre en 160 soles; 100 celdas reparten
  las calorías (huevo 1.96 %, cultivo 0.50 % para seis personas) y cambian con la tripulación.
- Barrido de inglés en todas las vistas y paneles: sin texto en español salvo los enlaces marcados
  «(ES)». Añadidas las traducciones de las estaciones del anillo.

## Límite

Comprobación local en un equipo. El proyector y el equipo del evento siguen sin medir.
