"""Tripulación V8: dos avatares Microsoft Rocketbox (MIT) con animación real.

python3 analysis/preparar_tripulacion.py  →  prototipo-3d/vendor/tripulacion.js

Descarga (si falta) avatares, texturas y clips de github.com/microsoft/Microsoft-Rocketbox,
convierte con Blender (analysis/rocketbox_a_glb.py) y empaqueta GLB + texturas WebP en base64:
el visor se abre por file:// y Chrome no deja subir a WebGL imágenes cargadas desde disco.
El overol del operador pasa de marrón a azul pizarra y las botas amarillas a gris; nada más cambia.
"""
import base64, io, json, os, pathlib, subprocess, urllib.parse
import numpy as np
from PIL import Image

RAIZ = pathlib.Path(__file__).resolve().parent.parent
CACHE = pathlib.Path(os.environ.get('MILPA_CACHE', pathlib.Path.home() / '.cache/milpa-v8'))
REPO = 'https://raw.githubusercontent.com/microsoft/Microsoft-Rocketbox/master/Assets/'
ESTATICA = 'Animations/all_animations_max_motextr_static/'
MARCHA = 'Animations/all_animations_max_motextr_xy/'   # sin avance horizontal: el visor mueve la raíz
AVATARES = {
    'operador': ('Professions/Gardener_Male_01', 'm106', {
        'reposo': ESTATICA + 'm_idle_neutral_01', 'marcha': MARCHA + 'm_walk_slow_01',
        'consulta': ESTATICA + 'm_documents_check'}),
    'cientifica': ('Professions/Medical_Female_02', 'f153', {
        'reposo': ESTATICA + 'f_idle_neutral_01', 'marcha': MARCHA + 'f_walk_slow_01',
        'consulta': ESTATICA + 'f_documents_check', 'explica': ESTATICA + 'f_gestic_talk_neutral_01:420'}),
}


def bajar(rel):
    destino = CACHE / 'rb' / rel
    if not destino.exists():
        destino.parent.mkdir(parents=True, exist_ok=True)
        subprocess.check_call(['curl', '-sfL', '-o', str(destino), REPO + urllib.parse.quote(rel)])
    return destino


def webp(im, lado, calidad=88):
    k = lado / max(im.size)
    if k < 1:
        im = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
    b = io.BytesIO()
    im.save(b, 'WEBP', quality=calidad, method=6)
    return 'data:image/webp;base64,' + base64.b64encode(b.getvalue()).decode()


def rugosidad(spec):
    # Especular de 3ds Max → rugosidad PBR: brillo alto = superficie lisa.
    s = np.asarray(spec.convert('L')).astype(np.float32) / 255
    return Image.fromarray((np.clip(0.94 - 0.62 * s, 0.32, 0.95) * 255).astype(np.uint8)).convert('RGB')


def overol_tripulacion(im):
    a = np.asarray(im.convert('RGB')).astype(np.float32) / 255
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mx, mn = a.max(-1), a.min(-1)
    d = np.maximum(mx - mn, 1e-6)
    s = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    h = np.where(mx == r, ((g - b) / d) % 6, np.where(mx == g, (b - r) / d + 2, (r - g) / d + 4)) * 60
    lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
    cafe = (h > 10) & (h < 48) & (s > 0.18) & (mx < 0.62)
    botas = (h > 35) & (h < 62) & (s > 0.45) & (mx >= 0.45)
    a[cafe] = np.clip(np.array([0.36, 0.50, 0.60]) * (lum[cafe] / lum[cafe].mean())[:, None] * 0.62, 0, 1)
    a[botas] = np.clip(np.array([0.20, 0.22, 0.24]) * (lum[botas] / lum[botas].mean())[:, None], 0, 1)
    return Image.fromarray((a * 255).astype(np.uint8))


def avatar(nombre, carpeta, prefijo, clips):
    fbx = bajar(f'Avatars/{carpeta}/Export/{carpeta.split("/")[-1]}.fbx')
    args = []
    for clip, rel in clips.items():
        rel, _, tope = rel.partition(':')
        args.append(f'{clip}={bajar(rel + ".max.fbx")}' + (f':{tope}' if tope else ''))
    glb = CACHE / f'{nombre}.glb'
    subprocess.check_call(['blender', '-b', '--factory-startup', '--python-exit-code', '1', '-P', str(RAIZ / 'analysis/rocketbox_a_glb.py'),
                           '--', str(glb), str(fbx), *args], stdout=subprocess.DEVNULL if os.environ.get('MILPA_DEPURAR') is None else None)
    tex = lambda parte, tipo: Image.open(bajar(f'Avatars/{carpeta}/Textures/{prefijo}_{parte}_{tipo}.tga'))
    materiales = {}
    for parte in ('body', 'head', 'stetoskop'):
        try:
            color = tex(parte, 'color')
        except subprocess.CalledProcessError:
            continue
        lado = 1024 if parte != 'stetoskop' else 256
        if nombre == 'operador' and parte == 'body':
            color = overol_tripulacion(color)
        materiales[f'{prefijo}_{parte}'] = {
            'map': webp(color.convert('RGB'), lado),
            'normalMap': webp(tex(parte, 'normal').convert('RGB'), lado, 92),
            'roughnessMap': webp(rugosidad(tex(parte, 'specular')), lado // 2, 80)}
    opacidad = tex('opacity', 'color').convert('RGBA')
    materiales[f'{prefijo}_opacity'] = {'map': webp(opacidad, min(1024, opacidad.width), 90), 'alfa': True}
    return {'glb': base64.b64encode(glb.read_bytes()).decode(), 'materiales': materiales}


if __name__ == '__main__':
    datos = {n: avatar(n, *v) for n, v in AVATARES.items()}
    salida = RAIZ / 'prototipo-3d/vendor/tripulacion.js'
    salida.write_text('/* Avatares Microsoft Rocketbox (MIT, ver vendor/CREDITOS-PERSONA.md). '
                      'Generado por analysis/preparar_tripulacion.py */\n'
                      'globalThis.MILPA_TRIPULACION=' + json.dumps(datos, separators=(',', ':')) + ';\n')
    print(salida, round(salida.stat().st_size / 1e6, 2), 'MB')
