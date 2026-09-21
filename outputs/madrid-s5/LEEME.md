# MILPA-360 · paquete S5 para revisión

**Estado:** defensa provisional. B15–B19, ensayos físicos, presupuesto cerrado,
formato de Madrid y prueba en equipo del evento siguen pendientes. No es una
entrega oficial aprobada ni un sistema validado. S6 será una revisión independiente.

## Abrir

- `MEMORIA-MILPA360-S5.pdf`: memoria modular; incluye Documento Concepto, guion y preguntas.
- `DECK-MILPA360-S5.pptx`: nueve láminas editables con guion y fuentes en notas.
- `DECK-MILPA360-S5.pdf`: respaldo visual del deck; para editar usar PPTX/fuente.
- `RESPALDO-PITCH-S5.mp4`: 300 segundos, sin audio, para narración en vivo. No es grabación
  de ensayo ni vídeo oficial final. Los tiempos coinciden con el guion provisional.
- `../../prototipo-3d/milpa360-simulador.html`: demo local, sin Internet; abrir con Chrome.
  Órbita por arrastre y rueda. Inspección técnica permite planta/lateral, resaltar lote,
  fallos y despiece visual; reanudar vuelve al ensamblaje. El movimiento no valida biología.
- `../../docs/madrid/COMPARACION-S3-S5.html`: comparación interactiva con las mismas poses.
- `MILPA360-S5.blend`: escena editable en Blender 5.2; texturas empaquetadas, unidades m.
  Elegir escena `MILPA360_S5`. El archivo conserva también la escena inicial del proceso.
- `MILPA360-S5.glb`: mallas para visualización; no CAD sólido ni planos de fabricación.
- `../../prototipo/planos/P02-corte-transversal.html` y `P03-planta-carrusel.html`: cotas nominales.
- `../../prototipo/planos/madrid/`: flujos P04/P05 actuales; los del directorio superior son históricos.
- `../madrid-s4-20260920/PRESUPUESTOS-MILPA360-S4.xlsx`: presupuestos con fórmulas y faltantes.

Todos los rótulos de equipos esquemáticos conservan límites. El mayor corte del casco,
la separación de ensamblaje y la posición de cámaras son herramientas de inspección.
El paisaje es procedural. Ninguna imagen representa topografía ni maqueta construida.

## Reproducir desde la raíz del repo

```sh
python3 analysis/milpa360_p1.py
python3 analysis/milpa360_p2.py
python3 analysis/milpa360_p4.py
python3 analysis/milpa360_p3.py
MILPA_EXPORT_GLB=1 node --experimental-websocket analysis/verificar_p3_navegador.mjs
/home/aldo/.local/bin/blender -b --python "$PWD/analysis/blender_s5.py"
/home/aldo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node analysis/deck_s5.mjs
/home/aldo/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python analysis/documentos_s5.py --planos
python3 analysis/video_s5.py
python3 analysis/empaquetar_s5.py
```

Las rutas de runtime son las comprobadas en este equipo; en otro equipo se adaptan.
La demo y el MP4 no requieren esos runtimes. Blender lee las mallas evaluadas de Three
y coteja configuración, piso, recuento de mallas y reimportación GLB. Tolerancia digital
de 1e-5 m en la prueba del piso: **no tolerancia de fabricación**. Los tanques no
adquieren capacidad certificada por exportarlos. `escena-three.json` y PNG de texturas
son intermedios regenerables; el BLEND/GLB incluye las texturas necesarias.

El finalizador del PPTX comprueba estructura, tamaño, tabla y fuentes, y reabre el
archivo con Artifact Tool. No se probó en PowerPoint nativo. Fuentes Bodoni Moda,
Archivo e IBM Plex Mono disponibles con OFL en `prototipo-3d/vendor/`; instalarlas si
el programa de presentación las sustituye. El PDF/MP4 conserva la apariencia.

No subir el ZIP a la convocatoria sin revisión del equipo y reglas finales. El
manifiesto SHA-256 identifica exactamente los archivos de esta candidata; no prueba
requisitos físicos ni sustituye S6. Los presupuestos históricos del usuario no forman
parte del paquete de defensa vigente.
