"""Exporta memoria S5, flujos vigentes y PDF de respaldo del deck (si hay PNG).
Usa ReportLab instalado en el runtime de Codex; no modifica los planos históricos.
"""
import html, json, re, subprocess, sys, tempfile
from urllib.parse import urlparse
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, PageBreak
from reportlab.pdfgen import canvas

ROOT=Path(__file__).resolve().parents[1]; OUT=ROOT/'outputs/madrid-s5'; OUT.mkdir(exist_ok=True,parents=True)
source=(ROOT/'docs/madrid/P5-DEFENSA.md').read_text()
datos=json.loads((ROOT/'prototipo-3d/milpa360-datos.js').read_text().split(' = ',1)[1].split(';\n',1)[0])
g,b=datos['geometria'],datos['balance']
assert f"{g['areas']['cultivo']:.4f}" in source
assert f"{b['cobertura_kcal']*100:.2f}%" in source
assert abs(2*g['anillo']['r0']*__import__('math').sin(__import__('math').pi/10)-.97649)<.0001
font='/usr/share/fonts/truetype/dejavu/'
pdfmetrics.registerFont(TTFont('Deja',font+'DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('DejaBold',font+'DejaVuSans-Bold.ttf'))
pdfmetrics.registerFontFamily('Deja',normal='Deja',bold='DejaBold',italic='Deja',boldItalic='DejaBold')
styles=getSampleStyleSheet()
for s in styles.byName.values(): s.fontName='Deja'
styles['BodyText'].fontSize=10;styles['BodyText'].leading=15;styles['BodyText'].spaceAfter=8
styles['Heading1'].fontName='DejaBold';styles['Heading1'].fontSize=23;styles['Heading1'].leading=29
styles['Heading2'].fontName='DejaBold';styles['Heading2'].fontSize=15;styles['Heading2'].leading=20;styles['Heading2'].spaceBefore=14
styles['Heading3'].fontSize=11;styles['Heading3'].leading=16
for name in ('Heading1','Heading2','Heading3'): styles[name].keepWithNext=True
styles.add(ParagraphStyle('Cell',fontName='Deja',fontSize=8,leading=11))
def markup(s):
    s=html.escape(s)
    # Conservar URL externas: prefijarlas rompía las fuentes del PDF.
    s=re.sub(r'\[([^\]]+)\]\(([^)]+)\)',lambda m:f'<a href="{m[2] if urlparse(m[2]).scheme or m[2].startswith("#") else "../../docs/madrid/"+m[2]}" color="#26667c">{m[1]}</a>',s)
    return re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',s)
story=[];lines=source.splitlines();i=0
while i<len(lines):
    s=lines[i].strip()
    if not s: i+=1;continue
    if s.startswith('# '):
        story.append(Paragraph(markup(s[2:]),styles['Heading1']))
        hero=ROOT/'docs/madrid/capturas/hero.png'
        if hero.exists(): story += [Spacer(1,12),Image(str(hero),width=510,height=286.875),Paragraph('Render digital S5. Sección de inspección; acceso y equipos por validar.',styles['Cell']),Spacer(1,14)]
        i+=1;continue
    if s.startswith('##'):
        level=3 if s.startswith('###') else 2
        story.append(Paragraph(markup(s[level+1:]),styles['Heading'+str(level)]));i+=1;continue
    if s.startswith('|'):
        rows=[]
        while i<len(lines) and lines[i].strip().startswith('|'):
            row=[c.strip() for c in lines[i].strip().strip('|').split('|')];i+=1
            if all(re.fullmatch(r'[-: ]+',c) for c in row): continue
            rows.append([Paragraph(markup(c),styles['Cell']) for c in row])
        n=len(rows[0]); widths=([139,106,265] if n==3 else [510/n]*n)
        table=Table(rows,colWidths=widths,repeatRows=1,hAlign='LEFT')
        table.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#e3ecee')),
          ('VALIGN',(0,0),(-1,-1),'TOP'),('BOTTOMPADDING',(0,0),(-1,-1),7),('TOPPADDING',(0,0),(-1,-1),7),
          ('LINEBELOW',(0,0),(-1,0),.8,colors.HexColor('#385866')),('LINEBELOW',(0,1),(-1,-1),.3,colors.HexColor('#b6c4c8'))]))
        story += [table,Spacer(1,12)];continue
    paragraph=[s];i+=1
    while i<len(lines) and lines[i].strip() and not lines[i].startswith(('#','|')):
        paragraph.append(lines[i].strip());i+=1
    story.append(Paragraph(markup(' '.join(paragraph)),styles['BodyText']))
def footer(canvas,doc):
    canvas.setFont('Deja',8);canvas.setFillColor(colors.HexColor('#52626b'))
    canvas.drawString(42,26,'MILPA-360 / S5 · Revisión del equipo · Sin validación física')
    canvas.drawRightString(A4[0]-42,26,str(doc.page))
SimpleDocTemplate(str(OUT/'MEMORIA-MILPA360-S5.pdf'),pagesize=A4,rightMargin=42,leftMargin=42,
 topMargin=36,bottomMargin=46,title='MILPA-360 / Memoria y defensa S5',author='BioMars Chiapas').build(story,onFirstPage=footer,onLaterPages=footer)

# Láminas de flujos actuales, separadas de los P04/P05 del hackathon.
plans=ROOT/'prototipo/planos/madrid';plans.mkdir(exist_ok=True)
def sheet(number,title,content):
    css='body{margin:0;padding:54px;background:#eee9de;color:#182b31;font:22px Arial;width:1492px;min-height:980px}h1{font-size:44px;margin:15px 0}h2{font-size:27px}small{font-size:18px}table{border-collapse:collapse;width:100%;margin:28px 0}td,th{text-align:left;border-bottom:1px solid #adb7b5;padding:20px;vertical-align:top}th{background:#d7e1de}.linea{font-size:27px;padding:24px 0;border-bottom:2px solid #b78953}.nota{margin-top:30px;color:#70492e}.tag{letter-spacing:4px;color:#536963}@page{size:1600px 1100px;margin:0}'
    (plans/(number+'.html')).write_text('<!doctype html><html lang="es"><meta charset="utf-8"><title>'+title+'</title><style>'+css+'</style><div class="tag">BIOMARS CHIAPAS / '+number+' / S5</div><h1>'+title+'</h1>'+content+'<p><small>Fuente: config/milpa360.parameters.json · P1/P4/S3 · Datos calculados o propuestas; sin mediciones físicas.</small></p></html>')
sheet('P04-flujos','Materia y energía: fronteras abiertas',f'''
<div class="linea">Ración externa {b['alimento_kg']:.4f} kg/d → aves → huevo + residuo asignado</div>
<div class="linea">Residuo → larvario / digestor → gas + digestato retenido</div>
<div class="linea">Agua externa acondicionada → depósito → pivote + goteo → cultivo</div>
<div class="linea">Electricidad externa → iluminación {b['luz_kwh']:.3f} kWh/d + auxiliares pendientes</div>
<table><tr><th>Resultado nominal</th><th>Valor</th><th>Lo que no incluye</th></tr>
<tr><td>Alimento humano</td><td>{b['kcal_total']:.1f} kcal/d · {b['cobertura_kcal']*100:.2f}%</td><td>Arranque, fallo, nutrición completa; ración animal importada</td></tr>
<tr><td>Biogás</td><td>{b['biogas_kwh_quimico']:.4f} kWh químicos/d</td><td>No electricidad neta ni autosuficiencia</td></tr></table>
<p class="nota">Día terrestre. Repartir cada flujo una sola vez. Purga, agua recuperada, salinidad, calor y auxiliares por cerrar. El requisito «100%» conserva una brecha.</p>''')
sheet('P05-procesos','Salmuera y digestión: procesos separados','''
<h2>Ruta de sustrato</h2><div class="linea">Pretratamiento inicial ISRU → cartucho → muestreo → análisis → liberación o cuarentena</div>
<h2>Ruta de salmuera</h2><div class="linea">Lavado → reactor separado → retención → análisis + purga por diseñar</div>
<h2>Ruta orgánica</h2><div class="linea">Residuo asignado → digestor → gas a equipo exterior + digestato retenido</div>
<table><tr><th>Control</th><th>Condición antes de reintegrar</th></tr>
<tr><td>Perclorato / sales</td><td>Concentración residual, salinidad y método de análisis definidos</td></tr>
<tr><td>Digestato / larvas</td><td>Tratamiento y control sanitario; rutas a alimento cerradas</td></tr>
<tr><td>Musgo / MFC</td><td>Señal experimental. No autorizan inocuidad</td></tr></table>
<p class="nota">No se ofrece oxígeno respirable ni agua potable como salida probada. Volumen de salmuera pendiente. Digestor nominal: 63.86 L útiles / 85.15 L totales, condicionado al escenario S3.</p>''')
pngs=sorted((OUT/'diapositivas').glob('*.png'))
if pngs:
    pdf=canvas.Canvas(str(OUT/'DECK-MILPA360-S5.pdf'),pagesize=(960,540))
    pdf.setTitle('MILPA-360 · Deck S5');pdf.setAuthor('BioMars Chiapas')
    for p in pngs: pdf.drawImage(str(p),0,0,width=960,height=540);pdf.showPage()
    pdf.save()
if '--planos' in sys.argv:
    target=OUT/'planos';target.mkdir(exist_ok=True)
    files=[ROOT/'prototipo/planos/P02-corte-transversal.html',ROOT/'prototipo/planos/P03-planta-carrusel.html',*sorted(plans.glob('*.html'))]
    for p in files:
        with tempfile.TemporaryDirectory(prefix='milpa-plano-') as profile:
            subprocess.run(['google-chrome','--headless=new','--no-sandbox','--disable-gpu','--hide-scrollbars',
              '--user-data-dir='+profile,'--window-size=1600,1100','--screenshot='+str(target/(p.stem+'.png')),p.as_uri()],
              check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
print('Memoria PDF y láminas actuales S5 generadas; tablas/cifras cotejadas.')
