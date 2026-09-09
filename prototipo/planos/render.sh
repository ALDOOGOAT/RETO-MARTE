#!/usr/bin/env bash
set -e; cd "$(dirname "$0")"
for f in P0*.html; do
  n="${f%.html}"
  google-chrome --headless --disable-gpu --no-sandbox --hide-scrollbars \
    --force-device-scale-factor=2 --window-size=1600,1100 \
    --screenshot="../fotos-para-subir/${n}.png" "file://$PWD/$f" 2>/dev/null
  echo "  -> ${n}.png"
done
