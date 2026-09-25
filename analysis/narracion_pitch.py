"""Genera una pista continua ES/EN, con capítulos y subtítulos alineados. Objetivo <55 s."""
from pathlib import Path
import hashlib,json,re,subprocess,wave
from piper import PiperVoice,SynthesisConfig
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'prototipo-3d/audio';CACHE=Path.home()/'.cache/milpa-voz'
def readjs(name,key):return json.loads((ROOT/'prototipo-3d'/name).read_text().split(key+' = ',1)[1].strip().removesuffix(';'))
data=readjs('milpa360-guion.js','window.MILPA_GUION');meta=readjs('milpa360-audio.js','window.MILPA_AUDIO')
for lang,name in [('es','es_ES-davefx-medium'),('en','en_GB-alba-medium')]:
 voice=PiperVoice.load(str(CACHE/(name+'.onnx')));rate=voice.config.sample_rate
 pcm=[];cues=[];chapters=[];samples=0
 for chapter in data['pitch']:
  begin=samples/rate
  for sentence in re.split(r'(?<=[.!?])\s+',chapter[lang]['voz']):
   raw=b''.join(c.audio_int16_bytes for c in voice.synthesize(sentence,syn_config=SynthesisConfig(length_scale=1.17,noise_scale=.42,noise_w_scale=.55)))
   duration=len(raw)/2/rate;cues.append(dict(inicio=samples/rate,fin=samples/rate+duration,texto=sentence))
   silence=b'\0\0'*round(rate*.13);pcm.extend([raw,silence]);samples+=(len(raw)+len(silence))//2
  pause=.8 if chapter['id']=='acceso' else .22
  pcm.append(b'\0\0'*round(rate*pause));samples+=round(rate*pause)
  chapters.append(dict(id=chapter['id'],inicio=begin,fin=samples/rate))
 # Compresión suave y acotada; no recortar ninguna oración ni acelerar el caminar.
 speed=max(1,(samples/rate)/53.5)
 if speed>1.20:raise RuntimeError('El guion debe abreviarse; requiere velocidad excesiva')
 wav=OUT/('pitch-'+lang+'.wav');mp3=OUT/('pitch-'+lang+'.mp3')
 with wave.open(str(wav),'wb') as f:f.setnchannels(1);f.setsampwidth(2);f.setframerate(rate);f.writeframes(b''.join(pcm))
 subprocess.run(['ffmpeg','-y','-v','error','-i',str(wav),'-af',f'atempo={speed:.8f},loudnorm=I=-18:TP=-2:LRA=9','-codec:a','libmp3lame','-b:a','160k',str(mp3)],check=True);wav.unlink()
 duration=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',str(mp3)]))
 for item in cues+chapters:
  for k in ['inicio','fin']:item[k]=round(item[k]/speed,3)
 chapters[-1]['fin']=round(duration+.2,3)
 assert duration<55
 meta['pitch-'+lang]=dict(duracion=round(duration,3),cues=cues,capitulos=chapters,voz=name,velocidad=speed,sha256=hashlib.sha256(mp3.read_bytes()).hexdigest())
 print(lang,duration,'s',flush=True)
(ROOT/'prototipo-3d/milpa360-audio.js').write_text('/* Audio sintético local; sincronización por oración. */\nwindow.MILPA_AUDIO = '+json.dumps(meta,ensure_ascii=False,indent=2)+';\n')
