"""Voces locales de exposición. Ejecutar con el entorno Piper documentado en PROYECCION-V5.
No necesita claves: descarga previa de modelos oficiales; sólo se distribuye audio.
"""
from pathlib import Path
import hashlib, json, re, subprocess, sys, wave
from piper import PiperVoice, SynthesisConfig

ROOT=Path(__file__).resolve().parents[1]
CACHE=Path.home()/'.cache/milpa-voz'
OUT=ROOT/'prototipo-3d/audio'
script=(ROOT/'prototipo-3d/milpa360-guion.js').read_text()
data=json.loads(script.split('window.MILPA_GUION = ',1)[1].rstrip().removesuffix(';'))
existing=ROOT/'prototipo-3d/milpa360-audio.js'
metadata=json.loads(existing.read_text().split('window.MILPA_AUDIO = ',1)[1].rstrip().removesuffix(';')) if len(sys.argv)>1 and existing.exists() else {}
for lang,name in [('es','es_ES-davefx-medium'),('en','en_GB-alba-medium')]:
    voice=PiperVoice.load(str(CACHE/(name+'.onnx')))
    for chapter in data['modulo']+data['acceso']:
        ident=chapter['id']+'-'+lang
        if len(sys.argv)>1 and ident not in sys.argv[1:]: continue
        cues=[];pcm=[];samples=0;rate=voice.config.sample_rate
        for sentence in re.split(r'(?<=[.!?])\s+',chapter[lang]['voz']):
            raw=b''.join(c.audio_int16_bytes for c in voice.synthesize(sentence,
                syn_config=SynthesisConfig(length_scale=1.06,noise_scale=.5,noise_w_scale=.65)))
            duration=len(raw)/2/rate
            cues.append(dict(inicio=round(samples/rate,3),fin=round(samples/rate+duration,3),texto=sentence))
            silence=b'\x00\x00'*round(rate*.25)
            pcm.extend([raw,silence]);samples+=(len(raw)+len(silence))//2
        wav=OUT/(ident+'.wav');mp3=OUT/(ident+'.mp3')
        with wave.open(str(wav),'wb') as f:
            f.setnchannels(1);f.setsampwidth(2);f.setframerate(rate);f.writeframes(b''.join(pcm))
        subprocess.run(['ffmpeg','-y','-v','error','-i',str(wav),'-af','loudnorm=I=-18:TP=-2:LRA=9','-codec:a','libmp3lame','-b:a','96k',str(mp3)],check=True)
        wav.unlink()
        measured=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',str(mp3)]))
        assert measured>3 and abs(measured-samples/rate)<.2
        metadata[ident]={'duracion':round(measured,3),'cues':cues,'voz':name,'sha256':hashlib.sha256(mp3.read_bytes()).hexdigest()}
        print(ident,round(measured,1),flush=True)
(ROOT/'prototipo-3d/milpa360-audio.js').write_text('/* Audio sintético local; sincronización por oración. */\nwindow.MILPA_AUDIO = '+json.dumps(metadata,ensure_ascii=False,indent=2)+';\n')
assert len(metadata)==30
print('30 audios ES/EN, duración y subtítulos comprobados.')
