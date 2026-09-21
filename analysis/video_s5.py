"""Respaldo sin audio del pitch: 9 diapositivas, tiempos del guion, 5 minutos."""
from pathlib import Path
import json, subprocess
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'outputs/madrid-s5'
durations=[30,30,40,35,40,30,40,30,25]
assert sum(durations)==300
listing=[]
for i,d in enumerate(durations,1):
    p=OUT/'diapositivas'/f'{i:02}.png';assert p.is_file()
    listing += ["file '"+str(p).replace("'","'\\''")+"'",f'duration {d}']
listing += [listing[-2]]
concat=ROOT/'tmp/madrid-s5/video.ffconcat';concat.parent.mkdir(exist_ok=True,parents=True)
concat.write_text('\n'.join(listing)+'\n')
video=OUT/'RESPALDO-PITCH-S5.mp4'
subprocess.run(['ffmpeg','-y','-loglevel','warning','-f','concat','-safe','0','-i',str(concat),
 '-vf','scale=1920:1080,setsar=1','-r','25','-t','300','-c:v','libx264','-preset','fast','-crf','22',
 '-pix_fmt','yuv420p','-movflags','+faststart',str(video)],check=True)
info=json.loads(subprocess.check_output(['ffprobe','-v','quiet','-print_format','json','-show_format','-show_streams',str(video)]))
assert abs(float(info['format']['duration'])-300)<.1
s=info['streams'][0];assert (s['width'],s['height'],s['codec_name'])==(1920,1080,'h264')
subprocess.run(['ffmpeg','-v','error','-i',str(video),'-f','null','-'],check=True)
(OUT/'VERIFICACION-VIDEO.json').write_text(json.dumps({'duracion_s':300,'formato':'H264 1920x1080 25fps yuv420p',
 'audio':False,'decodificacion_completa':'sin errores','limite':'Respaldo del deck para narración en vivo; no grabación de ensayo físico ni vídeo oficial aprobado.'},ensure_ascii=False,indent=2)+'\n')
print(video)
