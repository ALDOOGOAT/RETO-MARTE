"""Empaqueta el escaneo CC BY 3.0 con texturas locales; sin cargador glTF en runtime."""
from pathlib import Path
import base64,json,struct,urllib.request
ROOT=Path(__file__).resolve().parents[1]
BASE='https://raw.githubusercontent.com/mrdoob/three.js/r160/examples/models/gltf/LeePerrySmith/'
files={name:urllib.request.urlopen(BASE+name,timeout=30).read() for name in ['LeePerrySmith.glb','Map-COL.jpg','Infinite-Level_02_Tangent_SmoothUV.jpg','LeePerrySmith_License.txt']}
b=files['LeePerrySmith.glb'];n=struct.unpack_from('<I',b,12)[0];d=json.loads(b[20:20+n]);buf=b[28+n:];mesh=d['meshes'][0]['primitives'][0]
attributes={}
for key,i in {'index':mesh['indices'],**{dict(POSITION='position',NORMAL='normal',TEXCOORD_0='uv')[k]:v for k,v in mesh['attributes'].items()}}.items():
 a=d['accessors'][i];v=d['bufferViews'][a['bufferView']];raw=buf[v.get('byteOffset',0):v.get('byteOffset',0)+v['byteLength']]
 assert not a.get('byteOffset') and not v.get('byteStride')
 attributes[key]=list(struct.unpack('<'+str(len(raw)//(2 if key=='index' else 4))+('H' if key=='index' else 'f'),raw))
# Recorte de triángulos contra el plano del cuello; interpolar UV evita bordes dentados.
result={k:[] for k in ['position','normal','uv']};idx=[];unique={}
for t in range(0,len(attributes['index']),3):
 polygon=[]
 for i in attributes['index'][t:t+3]:polygon.append(tuple(attributes['position'][i*3:i*3+3]+attributes['normal'][i*3:i*3+3]+attributes['uv'][i*2:i*2+2]))
 clipped=[]
 for current,previous in zip(polygon,polygon[-1:]+polygon[:-1]):
  inside=current[1]>=-1.5;was_inside=previous[1]>=-1.5
  if inside!=was_inside:
   u=(-1.5-previous[1])/(current[1]-previous[1]);cross=tuple(a+(b-a)*u for a,b in zip(previous,current));clipped.append(cross)
  if inside:clipped.append(current)
 for j in range(1,len(clipped)-1):
  for v in [clipped[0],clipped[j],clipped[j+1]]:
   if v not in unique:
    unique[v]=len(unique);result['position'].extend(v[:3]);result['normal'].extend(v[3:6]);result['uv'].extend(v[6:])
   idx.append(unique[v])
assert len(unique)<65536 and idx
result['index']=idx;data={k:base64.b64encode(struct.pack('<'+str(len(v))+('H' if k=='index' else 'f'),*v)).decode() for k,v in result.items()}
for key,name in [('color','Map-COL.jpg'),('normalMap','Infinite-Level_02_Tangent_SmoothUV.jpg')]:data[key]='data:image/jpeg;base64,'+base64.b64encode(files[name]).decode()
(ROOT/'prototipo-3d/vendor/rostro-lee-perry.js').write_text('/* Infinite, 3D Head Scan: Lee Perry-Smith / triplegangers.com, CC BY 3.0. Ver CREDITOS-PERSONA.md. */\nwindow.MILPA_ROSTRO = '+json.dumps(data,separators=(',',':'))+';\n')
(ROOT/'prototipo-3d/vendor/LeePerrySmith-LICENSE.txt').write_bytes(files['LeePerrySmith_License.txt'])
