#!/usr/bin/env bash
# Herramienta histórica del modelo anterior; no produce el pitch vigente.
# Los frames se archivaron en V4. Ver docs/madrid/LIMPIEZA-V4.json.
# Para el vídeo vigente: python3 analysis/video_s5.py.
# Arma el video del prototipo a partir de los frames regenerados de Blender.
# uso: ./hacer-video.sh
set -e
cd "$(dirname "$0")"
IN=fotos-para-subir/anim
OUT=fotos-para-subir/MILPA-360-prototipo.mp4

[ -d "$IN" ] || { echo "Faltan los frames en $IN — corre primero el render de Blender."; exit 1; }
N=$(ls "$IN"/f*.png | wc -l)
echo "Armando video con $N frames..."

# 3 vueltas completas a 24 fps -> ~12 s, en bucle perfecto
ffmpeg -y -loglevel error \
  -stream_loop 2 -framerate 24 -i "$IN/f%04d.png" \
  -c:v libx264 -pix_fmt yuv420p -crf 18 -preset medium \
  -movflags +faststart "$OUT"

echo "Listo: $OUT"
ls -lh "$OUT"
