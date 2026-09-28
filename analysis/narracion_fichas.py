"""Voz de cada ficha (ES/EN) para la isla de voz del visor.

~/.local/share/milpa-voz/bin/python analysis/narracion_fichas.py

Lee lo que dice cada ficha, cada fase de Acceso y cada sección del Atlas (analysis/textos_fichas.mjs),
sintetiza por frase con Piper (mismas voces que el pitch), y escribe
prototipo-3d/audio/fichas/<clave>-<idioma>.mp3 y prototipo-3d/milpa360-voces.js con los tiempos de
cada frase para el subtítulo. Una entrada sólo se vuelve a sintetizar si cambió su texto.
"""
from pathlib import Path
import hashlib, json, re, subprocess, wave
from piper import PiperVoice, SynthesisConfig

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'prototipo-3d/audio/fichas'
MANIFIESTO = ROOT / 'prototipo-3d/milpa360-voces.js'
CACHE = Path.home() / '.cache/milpa-voz'
VOCES = {'es': 'es_ES-davefx-medium', 'en': 'en_GB-alba-medium'}
CONFIG = dict(length_scale=1.08, noise_scale=.42, noise_w_scale=.55)


def textos():
    return json.loads(subprocess.check_output(['node', str(ROOT / 'analysis/textos_fichas.mjs')]))


def previo():
    if not MANIFIESTO.exists():
        return {}
    return json.loads(MANIFIESTO.read_text().split('window.MILPA_VOCES = ', 1)[1].strip().removesuffix(';'))


if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    antes, manifiesto = previo(), {}
    for lang, entradas in textos().items():
        voz = PiperVoice.load(str(CACHE / (VOCES[lang] + '.onnx')))
        rate = voz.config.sample_rate
        manifiesto[lang] = {}
        for clave, texto in entradas.items():
            firma = hashlib.sha256(json.dumps([VOCES[lang], CONFIG, texto]).encode()).hexdigest()[:16]
            mp3 = OUT / f'{clave}-{lang}.mp3'
            viejo = antes.get(lang, {}).get(clave)
            if viejo and viejo['firma'] == firma and mp3.exists():
                manifiesto[lang][clave] = viejo
                continue
            pcm, frases, muestras = [], [], round(rate * .12)
            pcm.append(b'\0\0' * muestras)
            for frase in re.split(r'(?<=[.!?;])\s+', texto):
                crudo = b''.join(c.audio_int16_bytes for c in voz.synthesize(frase, syn_config=SynthesisConfig(**CONFIG)))
                n = len(crudo) // 2
                frases.append([round(muestras / rate, 3), round((muestras + n) / rate, 3), frase])
                pausa = round(rate * .2)
                pcm += [crudo, b'\0\0' * pausa]
                muestras += n + pausa
            wav = mp3.with_suffix('.wav')
            with wave.open(str(wav), 'wb') as f:
                f.setnchannels(1); f.setsampwidth(2); f.setframerate(rate); f.writeframes(b''.join(pcm))
            subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', str(wav), '-af', 'loudnorm=I=-18:TP=-2:LRA=9',
                            '-ac', '1', '-codec:a', 'libmp3lame', '-b:a', '56k', str(mp3)], check=True)
            wav.unlink()
            dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                                                 '-of', 'default=nw=1:nk=1', str(mp3)]))
            manifiesto[lang][clave] = {'src': f'audio/fichas/{clave}-{lang}.mp3', 'dur': round(dur, 3),
                                       'frases': frases, 'firma': firma}
            print(lang, clave, round(dur, 1), 's', flush=True)
    for f in OUT.glob('*.mp3'):   # fichas retiradas
        clave, lang = f.stem.rsplit('-', 1)
        if clave not in manifiesto.get(lang, {}):
            f.unlink()
    MANIFIESTO.write_text('/* Voz sintética local (Piper) de cada ficha; tiempos por frase. '
                          'Generado por analysis/narracion_fichas.py */\nwindow.MILPA_VOCES = '
                          + json.dumps(manifiesto, ensure_ascii=False, separators=(',', ':')) + ';\n')
    total = sum(f.stat().st_size for f in OUT.glob('*.mp3'))
    print(MANIFIESTO, 'audio', round(total / 1e6, 2), 'MB')
