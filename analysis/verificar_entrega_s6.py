#!/usr/bin/env python3
"""S6 digital: integridad, enlaces activos, artefactos y extracción limpia.

Usar Python del runtime con pypdf. No sustituye revisión humana ni ensayo físico.
"""
import csv
import hashlib
import io
import json
import posixpath
import re
import sys
import tempfile
import zipfile
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
from pypdf import PdfReader

ROOT=Path(__file__).resolve().parents[1]
archive=ROOT/'entregas/madrid-s5-revision.zip'


def resolve(source, link):
    u=urlsplit(link)
    if u.scheme or not u.path: return None
    return posixpath.normpath(posixpath.join(posixpath.dirname(source),unquote(u.path)))


class Links(HTMLParser):
    def __init__(self): super().__init__(); self.links=[]
    def handle_starttag(self, tag, attrs):
        self.links += [v for k,v in attrs if k in ('src','href') and v]


with zipfile.ZipFile(archive) as z:
    names=set(z.namelist());assert z.testzip() is None
    assert all(not n.startswith('/') and '..' not in Path(n).parts for n in names)
    manifest=json.loads(z.read('docs/madrid/MANIFIESTO-S5.json'))
    for n,h in manifest['sha256'].items():
        assert hashlib.sha256(z.read(n)).hexdigest()==h,n
    for n in ('prototipo-3d/milpa360-simulador.html','prototipo-3d/milpa360-acceso.html'):
        parser=Links();parser.feed(z.read(n).decode())
        for link in parser.links:
            target=resolve(n,link)
            assert target is None or target in names,(n,link)
    checked_links=0
    for n in ('docs/madrid/P5-DEFENSA.md','docs/madrid/CIERRE-ACUMULADO.md',
              'docs/madrid/CALCULOS-CIERRE.md','docs/madrid/B19-ACCESO.md'):
        for link in re.findall(r'\[[^\]]+\]\(([^)]+)\)',z.read(n).decode()):
            target=resolve(n,link)
            assert target is None or target in names,(n,link,target)
            checked_links+=1
    pdf='outputs/madrid-s5/MEMORIA-MILPA360-S5.pdf'
    reader=PdfReader(io.BytesIO(z.read(pdf)))
    text='\n'.join(p.extract_text() or '' for p in reader.pages)
    assert '25.26' in text and 'CIERRE-ACUMULADO' in text
    uris=[]
    for page in reader.pages:
        for ref in page.get('/Annots',[]):
            action=ref.get_object().get('/A',{})
            if action.get('/URI'): uris.append(str(action['/URI']))
    assert any(u.startswith('https://patents.google.com/') for u in uris)
    assert not any('/https://' in u for u in uris), 'Fuente externa dañada'
    assert all(resolve(pdf,u) in names for u in uris if resolve(pdf,u)), 'Enlace local PDF ausente'
    deck_pdf=PdfReader(io.BytesIO(z.read('outputs/madrid-s5/DECK-MILPA360-S5.pdf')))
    assert len(deck_pdf.pages)==9
    with zipfile.ZipFile(io.BytesIO(z.read('outputs/madrid-s5/DECK-MILPA360-S5.pptx'))) as pptx:
        slides=[n for n in pptx.namelist() if re.fullmatch(r'ppt/slides/slide\d+\.xml',n)]
        assert len(slides)==9
        assert b'25.26' in pptx.read('ppt/slides/slide5.xml')
    video=json.loads(z.read('outputs/madrid-s5/VERIFICACION-VIDEO.json'))
    assert video['duracion_s']==300 and video['decodificacion_completa']=='sin errores'
    rows=list(csv.reader(io.StringIO(z.read('docs/madrid/registro-afirmaciones.csv').decode())))
    assert all(len(r)==16 for r in rows) and len({r[0] for r in rows})==len(rows)
    template=ET.fromstring(z.read('prototipo/planos/madrid/P07-plantilla-E4.svg'))
    view=[float(x) for x in template.attrib['viewBox'].split()]
    assert template.attrib['width']==f'{view[2]}mm' and template.attrib['height']==f'{view[3]}mm','Plantilla sin escala métrica 1:1'
    g=json.loads(z.read('config/milpa360.geometria.json'))
    old=json.loads(__import__('subprocess').check_output(['git','show','589ca5b:config/milpa360.geometria.json'],cwd=ROOT))
    # Reutilizar BLEND/GLB sólo si la geometría sigue idéntica; versiones separadas.
    current=g.copy()
    assert current['_fuente']=='config/milpa360.parameters.json v'+manifest['revision_calculos']
    old['_fuente']=current['_fuente']  # Sólo cambió el identificador de revisión de parámetros.
    assert old==current,'Cambio geométrico exige regenerar Blender y capturas'
    browser_evidence=None
    if len(sys.argv)>1:
        # Pasar únicamente la carpeta usada realmente por ambos verificadores Chrome.
        tested=Path(sys.argv[1])
        app_files=[n for n in names if n.startswith('prototipo-3d/')]
        for n in app_files:
            assert (tested/n).read_bytes()==z.read(n),f'Demo distinta de la probada: {n}'
        reports=['docs/madrid/PRUEBA-P3-NAVEGADOR.json','docs/madrid/PRUEBA-B19-NAVEGADOR.json']
        for n in reports:
            r=json.loads(z.read(n))
            assert not r['errores'] and r['solicitudesHTTP']==0,n
        browser_evidence=dict(carpeta_probada=str(tested),archivos_identicos=len(app_files),reportes=reports)
    clean=Path(tempfile.mkdtemp(prefix='milpa-s6-limpia-'))
    z.extractall(clean)
    result=dict(archivo=str(archive),archivos_sha256=len(manifest['sha256']),
        enlaces_documentales=checked_links,paginas_memoria=len(reader.pages),
        diapositivas=9,afirmaciones=len(rows)-1,geometria_blender_reutilizable=True,
        carpeta_limpia=str(clean),navegador=browser_evidence,
        limite='Integridad digital. La revisión visual se registra aparte; no acredita ensayo físico, revisión independiente ni rendimiento del equipo del evento.')
    (ROOT/'tmp/madrid-s5').mkdir(exist_ok=True,parents=True)
    (ROOT/'tmp/madrid-s5/verificacion-s6.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps(result,ensure_ascii=False,indent=2))
