"""Planeta V9: mosaico Viking MDIM 2.1 y relieve sombreado MOLA (USGS, dominio público) → vendor/marte-usgs.js

python3 analysis/preparar_marte.py

Color a 4096 × 2048 con la media y la dispersión de cada canal llevadas a las del mapa NASA que ya
usaba el visor (vendor/mars-viking.jpg): más detalle sin cambiar el tono reconocible. El relieve MOLA
es un sombreado, no una elevación: sirve de mapa de relieve para cráteres, volcanes y cañones.
Ambos van en base64 dentro de un .js porque Chrome no sube a WebGL imágenes leídas por file://.
"""
import base64, io, os, pathlib, subprocess
import numpy as np
from PIL import Image

RAIZ = pathlib.Path(__file__).resolve().parent.parent
CACHE = pathlib.Path(os.environ.get('MILPA_CACHE', pathlib.Path.home() / '.cache/milpa-v8')) / 'marte'
WMS = ('https://planetarymaps.usgs.gov/cgi-bin/mapserv?map=/maps/mars/mars_simp_cyl.map&SERVICE=WMS&VERSION=1.1.1'
       '&REQUEST=GetMap&SRS=EPSG:4326&BBOX=-180,-90,180,90&STYLES=&FORMAT=image/png&WIDTH=4096&HEIGHT=2048&LAYERS=')


def capa(nombre):
    f = CACHE / f'{nombre}-4k.png'
    if not f.exists():
        CACHE.mkdir(parents=True, exist_ok=True)
        subprocess.check_call(['curl', '-sfL', '-o', str(f), WMS + nombre])
    return Image.open(f).convert('RGB')


def jpeg(im, q):
    b = io.BytesIO()
    im.save(b, 'JPEG', quality=q, optimize=True, progressive=True)
    return 'data:image/jpeg;base64,' + base64.b64encode(b.getvalue()).decode()


if __name__ == '__main__':
    color = np.asarray(capa('MDIM21_color')).astype(np.float32)
    ref = np.asarray(Image.open(RAIZ / 'prototipo-3d/vendor/mars-viking.jpg').convert('RGB')).astype(np.float32)
    color = (color - color.mean((0, 1))) / color.std((0, 1)) * ref.std((0, 1)) + ref.mean((0, 1))
    color = Image.fromarray(np.clip(color, 0, 255).astype(np.uint8))
    relieve = capa('MOLA_bw').convert('L').resize((2048, 1024), Image.LANCZOS)
    salida = RAIZ / 'prototipo-3d/vendor/marte-usgs.js'
    salida.write_text('/* USGS Astrogeology (dominio público): mosaico Viking MDIM 2.1 y relieve sombreado MOLA. '
                      'Generado por analysis/preparar_marte.py; ver vendor/CREDITOS-MARTE.md */\n'
                      'window.MILPA_MARTE={color:"' + jpeg(color, 86) + '",relieve:"' + jpeg(relieve, 90) + '"};\n')
    print(salida, round(salida.stat().st_size / 1e6, 2), 'MB')
