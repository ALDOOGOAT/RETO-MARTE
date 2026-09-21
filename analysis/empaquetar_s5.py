"""Candidata S5 para revisión; empaqueta fuentes, demo y defensa con SHA-256."""
from pathlib import Path
import hashlib, json, subprocess, zipfile
ROOT=Path(__file__).resolve().parents[1]
paths=[]
def add(pattern): paths.extend(p for p in ROOT.glob(pattern) if p.is_file())
for p in ['config/*.json','analysis/*.py','analysis/*.cjs','analysis/*.mjs',
          'docs/madrid/*.md','docs/madrid/*.csv','docs/madrid/capturas/*.png',
          'docs/madrid/capturas-s3/*.png','docs/madrid/capturas-b19/*.png','docs/madrid/ensayos/*.csv','docs/madrid/COMPARACION-S3-S5.html',
          'docs/madrid/capturas-v2/*.png','docs/madrid/capturas-s5-previas/*.png','docs/madrid/PRUEBA-VISUAL-V2.json','docs/madrid/COMPARACION-VISUAL-V2.html',
          'docs/madrid/capturas-v3/*.png','docs/madrid/PRUEBA-REFINAMIENTO-V3.json','docs/madrid/RENDIMIENTO-V3-INTEL.json',
          'visuales/atlas-marciano.html','prototipo-3d/milpa360-interfaz.css',
          'prototipo-3d/vendor/*','prototipo-3d/milpa360-*.js','prototipo-3d/milpa360-simulador.html','prototipo-3d/milpa360-acceso.html',
          'prototipo-3d/LEEME-P3.md','prototipo-3d/package*.json','prototipo/planos/P02*.html',
          'prototipo/planos/P03*.html','prototipo/planos/_estilo.css','prototipo/planos/madrid/*.html','prototipo/planos/madrid/*.svg',
          'outputs/madrid-s4-20260920/*.xlsx','outputs/madrid-s5/diapositivas/*.png',
          'outputs/madrid-s5/planos/*.png','outputs/madrid-s5/*.pdf','outputs/madrid-s5/*.pptx',
          'outputs/madrid-s5/*.blend','outputs/madrid-s5/*.glb','outputs/madrid-s5/*.mp4',
          'outputs/madrid-s5/VERIFICACION-*.json','outputs/madrid-s5/LEEME.md','outputs/madrid-s5/blender-S5.png',
          'MISION-MADRID-MILPA360.md','CONTEXTO-RETO-MARTE.md','INVESTIGACION-MARTE.md']:
    add(p)
add('docs/madrid/PRUEBA-P3-NAVEGADOR.json')
add('docs/madrid/PRUEBA-B19-NAVEGADOR.json')
required=['MEMORIA-MILPA360-S5.pdf','DECK-MILPA360-S5.pdf','DECK-MILPA360-S5.pptx',
          'RESPALDO-PITCH-S5.mp4','MILPA360-S5.blend','MILPA360-S5.glb','VERIFICACION-BLENDER.json','VERIFICACION-DECK.json','VERIFICACION-VIDEO.json']
for name in required: assert ROOT/'outputs/madrid-s5'/name in paths, name
records={str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(set(paths))}
manifest=ROOT/'docs/madrid/MANIFIESTO-S5.json'
manifest.write_text(json.dumps({'estado':'Candidata digital revisada; aceptación física y reglamento Madrid abiertos. Ver CIERRE-ACUMULADO.md.',
 'revision_calculos':json.loads((ROOT/'config/milpa360.parameters.json').read_text())['meta']['version'],
 'geometria_blender':'V3 regenerada desde la escena actual: materiales y acabados nuevos, mismas cotas nominales. B19 permanece separado.',
 'base_git':subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True).strip(),
 'sha256':records},ensure_ascii=False,indent=2)+'\n')
output=ROOT/'entregas/madrid-s5-revision.zip';output.parent.mkdir(exist_ok=True)
with zipfile.ZipFile(output,'w',zipfile.ZIP_DEFLATED) as z:
    for name in records: z.write(ROOT/name,name)
    z.write(manifest,str(manifest.relative_to(ROOT)))
with zipfile.ZipFile(output) as z:
    assert z.testzip() is None
    for name,h in records.items(): assert hashlib.sha256(z.read(name)).hexdigest()==h
print(f'{output}: {len(records)} archivos con SHA-256 verificado')
