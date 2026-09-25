"""Texturas PBR V8 (Poly Haven, CC0) → prototipo-3d/vendor/texturas-pbr.js

python3 analysis/preparar_texturas_pbr.py

Cada material lleva color (con la oclusión ya multiplicada), normal OpenGL y rugosidad, en WebP
1024 y base64 (file:// no deja subir imágenes de disco a WebGL). `sustrato` y `cubierta` se
guardan en gris de media 0.8: el visor los tiñe con el color de cada estación, como antes.
El HDRI de Goegap se reduce a 512 × 256 en RGBE: sólo alimenta reflejos, nunca se ve de fondo.
"""
import base64, io, json, os, pathlib, subprocess
import numpy as np
from PIL import Image

RAIZ = pathlib.Path(__file__).resolve().parent.parent
CACHE = pathlib.Path(os.environ.get('MILPA_CACHE', pathlib.Path.home() / '.cache/milpa-v8')) / 'ph'
MATERIALES = {'terreno': ('red_laterite_soil_stones', False), 'roca': ('rock_boulder_dry', False),
              'sustrato': ('brown_mud_dry', True), 'cubierta': ('metal_plate', True)}
MAPAS = {'diff': 'Diffuse', 'nor': 'nor_gl', 'rough': 'Rough', 'ao': 'AO'}


def api(ruta):
    return json.loads(subprocess.check_output(['curl', '-sfL', 'https://api.polyhaven.com/' + ruta]))


def bajar(ident, mapa):
    f = CACHE / f'{ident}_{mapa}_2k.jpg'
    if not f.exists():
        CACHE.mkdir(parents=True, exist_ok=True)
        subprocess.check_call(['curl', '-sfL', '-o', str(f), api('files/' + ident)[MAPAS[mapa]]['2k']['jpg']['url']])
    return Image.open(f).convert('RGB').resize((1024, 1024), Image.LANCZOS)


def webp(im, q=86):
    b = io.BytesIO()
    im.save(b, 'WEBP', quality=q, method=6)
    return 'data:image/webp;base64,' + base64.b64encode(b.getvalue()).decode()


def material(ident, gris):
    color = np.asarray(bajar(ident, 'diff')).astype(np.float32) / 255
    ao = np.asarray(bajar(ident, 'ao').convert('L')).astype(np.float32)[..., None] / 255
    color *= 0.25 + 0.75 * ao
    if gris:
        lum = color @ np.array([0.2126, 0.7152, 0.0722])
        color = np.repeat((lum / lum.mean() * 0.8)[..., None], 3, -1)
    return {'map': webp(Image.fromarray((np.clip(color, 0, 1) * 255).astype(np.uint8))),
            'normalMap': webp(bajar(ident, 'nor'), 90), 'roughnessMap': webp(bajar(ident, 'rough'), 80)}


def leer_hdr(ruta):
    """Radiance .hdr con RLE nuevo → float32 (alto, ancho, 3)."""
    d = ruta.read_bytes()
    fin = d.index(b'\n\n') + 2
    linea_fin = d.index(b'\n', fin)
    _, alto, _, ancho = d[fin:linea_fin].split()
    alto, ancho, i = int(alto), int(ancho), linea_fin + 1
    px = np.zeros((alto, ancho, 4), np.uint8)
    for y in range(alto):
        assert d[i] == 2 and d[i + 1] == 2, 'RLE antiguo no soportado'
        i += 4
        for c in range(4):
            x = 0
            while x < ancho:
                n = d[i]; i += 1
                if n > 128:
                    px[y, x:x + n - 128, c] = d[i]; i += 1; x += n - 128
                else:
                    px[y, x:x + n, c] = np.frombuffer(d[i:i + n], np.uint8); i += n; x += n
    e = px[..., 3].astype(np.float32)
    return px[..., :3].astype(np.float32) * np.where(e > 0, np.ldexp(1.0, (e - 136).astype(int)), 0)[..., None]


def rgbe(f):
    m = f.max(-1)
    e = np.where(m > 1e-32, np.ceil(np.log2(np.maximum(m, 1e-32))), -128)
    mant = np.clip(np.round(f / np.ldexp(1.0, e.astype(int))[..., None] * 255), 0, 255)
    return np.concatenate([mant, np.clip(e + 136, 0, 255)[..., None]], -1).astype(np.uint8)


if __name__ == '__main__':
    datos = {k: material(*v) for k, v in MATERIALES.items()}
    hdr = CACHE / 'goegap_1k.hdr'
    if not hdr.exists():
        subprocess.check_call(['curl', '-sfL', '-o', str(hdr), api('files/goegap')['hdri']['1k']['hdr']['url']])
    f = leer_hdr(hdr)
    f = f.reshape(256, 2, 512, 2, 3).mean((1, 3))
    datos['cielo'] = {'ancho': 512, 'alto': 256, 'rgbe': base64.b64encode(rgbe(f).tobytes()).decode()}
    salida = RAIZ / 'prototipo-3d/vendor/texturas-pbr.js'
    salida.write_text('/* Poly Haven CC0: red_laterite_soil_stones, rock_boulder_dry, brown_mud_dry, metal_plate, '
                      'goegap. Generado por analysis/preparar_texturas_pbr.py */\n'
                      'globalThis.MILPA_PBR=' + json.dumps(datos, separators=(',', ':')) + ';\n')
    print(salida, round(salida.stat().st_size / 1e6, 2), 'MB')
