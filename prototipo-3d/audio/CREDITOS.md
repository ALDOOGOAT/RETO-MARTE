# Narración sintética local · V5

Textos: BioMars Chiapas / MILPA-360, guion de exposición basado en la documentación
del proyecto. `milpa360-guion.js` conserva español e inglés; `milpa360-audio.js`
registra subtítulos por oración, duración, voz y SHA-256 de cada MP3.

Generación: Piper 1.3.0, instalado en un entorno local separado del repositorio.
Motor GPL-3.0: <https://github.com/OHF-Voice/piper1-gpl>. Se distribuye el audio
generado; el motor y los pesos no se incluyen en la demo. Normalización de volumen
con FFmpeg, objetivo −18 LUFS, techo −2 dBTP; MP3 mono 96 kbit/s.

## Voces y fuentes consultadas el 21 sep 2026

- Español: `es_ES-davefx-medium`, 22,050 Hz. La ficha identifica datos de
  OHF-Voice con licencia CC0. Ficha:
  <https://huggingface.co/rhasspy/piper-voices/blob/main/es/es_ES/davefx/medium/MODEL_CARD>.
- Inglés: `en_GB-alba-medium`, 22,050 Hz. Datos de voz Alba, University of Edinburgh,
  licencia Creative Commons Attribution 4.0. Se atribuye el conjunto original en
  <https://datashare.ed.ac.uk/handle/10283/3270>; ficha del modelo:
  <https://huggingface.co/rhasspy/piper-voices/blob/main/en/en_GB/alba/medium/MODEL_CARD>.

Las fichas indican ajuste desde Lessac medium. Los modelos se descargaron del
repositorio oficial de voces de Rhasspy/Piper. Esta narración es sintetizada y no
implica participación, testimonio ni aval de quienes aportaron las voces.

## Reproducir

Con `piper-tts==1.3.0` y FFmpeg instalados, colocar los `.onnx` y `.onnx.json`
de las dos voces en `~/.cache/milpa-voz/` y ejecutar desde la raíz:

```sh
~/.local/share/milpa-voz/bin/python analysis/narracion_v5.py
```

Se puede regenerar un clip indicando su ID: `... analysis/narracion_v5.py energia-es`.
Para presentar sólo hay que conservar esta carpeta junto a los HTML: no se instala
Piper en el equipo del evento ni se usa un servicio remoto de voz.
