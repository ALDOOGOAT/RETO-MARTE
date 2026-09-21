#!/usr/bin/env python3
"""B19: cribado geométrico continuo de extracción y almacenamiento, sin ensayo físico.

python3 analysis/milpa360_acceso.py
Polígonos convexos conservadores y suma de Minkowski con un segmento: se comprueba
todo el recorrido recto, no sólo sus extremos. No representa dosel/equipos medidos.
"""
import json, math
from milpa360_p2 import RAIZ, CFG, geometria, masas, v, validar


def hull(points):
    points = sorted(set(points))
    def cross(o, a, b):
        return (a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0])
    def half(seq):
        out = []
        for p in seq:
            while len(out)>1 and cross(out[-2], out[-1], p)<=0:
                out.pop()
            out.append(p)
        return out
    return half(points)[:-1]+half(points[::-1])[:-1]


def shift(poly, x, y):
    return [(a+x,b+y) for a,b in poly]


def separated(a, b):
    """SAT para polígonos convexos; contacto cuenta como colisión, salvo 1e-10 m."""
    for p in (a,b):
        for u,w in zip(p,p[1:]+p[:1]):
            nx,ny=-(w[1]-u[1]),w[0]-u[0]
            aa=[nx*x+ny*y for x,y in a];bb=[nx*x+ny*y for x,y in b]
            if max(aa)<min(bb)-1e-10 or max(bb)<min(aa)-1e-10:
                return True
    return False


def rect(x0,y0,x1,y1):
    return [(x0,y0),(x1,y0),(x1,y1),(x0,y1)]


def bounds(p):
    return [min(x for x,y in p),min(y for x,y in p),max(x for x,y in p),max(y for x,y in p)]


def calcular():
    validar();g=geometria();p=lambda k:v('acceso_servicio.'+k)
    n=p('posiciones_retiradas');start=p('primera_posicion')
    assert n==2 and int(start)==start and g['n_regeneracion']<=start<g['n']-1
    keys=['herraje_lateral','traslacion_radial','traslacion_lateral','margen_deposito',
          'ancho_vestibulo','longitud_vestibulo','ancho_portal_carga',
          'ancho_puerta_habitat','altura_portal','diametro_persona_equipo',
          'altura_persona_equipo','altura_carga']
    assert all(math.isfinite(p(k)) and p(k)>0 for k in keys)
    # Se circunscribe la curva exterior con tangentes; error acotado e identificado.
    pasos=48;da=g['sector']/pasos;ro=g['r1']/math.cos(da/2)
    def sector(angle):
        return hull([(r*math.cos(angle-g['sector']/2+i*da),
                      r*math.sin(angle-g['sector']/2+i*da))
                     for r in (g['r0'],ro) for i in range(pasos+1)])
    gate=(start+.5)*g['paso_ang']
    polys=[sector(i*g['paso_ang']-gate) for i in range(g['n'])]
    dx,dy=p('traslacion_radial'),p('traslacion_lateral')
    removed=[start,start+1];fixed=[poly for i,poly in enumerate(polys) if i not in removed]
    parked=[];sweeps=[];collisions=[]
    for j,i in enumerate(removed):
        sign=2*j-1;origin=polys[i];out=shift(origin,dx,0);end=shift(out,0,sign*dy)
        sweep1=hull(origin+out);sweep2=hull(out+end)
        for step,shape in [('extraccion',sweep1),('estacionamiento',sweep2)]:
            if any(not separated(shape,ob) for ob in fixed): collisions.append(f'{i}:{step}:vecino')
        parked.append(end);sweeps.append([sweep1,sweep2])
    assert separated(polys[start],polys[start+1])  # El tramo radial común preserva separación.
    assert separated(sweeps[0][1],sweeps[1][1])   # Los barridos laterales tampoco se cruzan.
    assert separated(parked[0],parked[1])
    outer=g['r_casco']+p('longitud_vestibulo');w=p('ancho_vestibulo')
    margin=p('margen_deposito')
    boxes=[bounds(poly) for poly in parked]
    stored=[rect(b[0]-margin,b[1]-margin,b[2]+margin,b[3]+margin) for b in boxes]
    for i,box in enumerate(stored):
        b=bounds(box)
        if b[0]<g['r_casco'] or b[2]>outer or b[1]<-w/2 or b[3]>w/2:
            collisions.append(f'{i}:deposito_fuera_vestibulo')
    # Ruta humana hasta el centro del pasillo: cilindro de cribado, sin traje/rescate.
    cx=g['r_eq']+g['pasillo']/2;radius=p('diametro_persona_equipo')/2
    route=rect(cx-radius,-radius,outer,radius)
    if any(not separated(route,ob) for ob in fixed+stored): collisions.append('ruta_humana')
    radial_sweep=hull(sweeps[0][0]+sweeps[1][0]);bb=bounds(radial_sweep)
    cargo_width=bb[3]-bb[1]+2*margin
    width_raw=2*g['r0']*math.sin(n*g['paso_ang']/2)
    width=width_raw-2*p('herraje_lateral')
    half=p('ancho_portal_carga')/2
    assert half<g['r_casco']
    # Cuello entre tangente y superficie circular; no se duplica la huella del módulo.
    neck=2*g['r_casco']*half-(half*math.sqrt(g['r_casco']**2-half**2)+g['r_casco']**2*math.asin(half/g['r_casco']))
    extra=w*p('longitud_vestibulo')+neck
    checks={
        'barridos_sin_vecinos':not collisions,
        'portal_carga':cargo_width<=p('ancho_portal_carga'),
        'dosel_supuesto':p('altura_carga')<=p('altura_portal'),
        'paso_objetivo_09':width>=g['pasillo'],
        'persona_equipo_supuestos':p('diametro_persona_equipo')<=min(width,p('ancho_puerta_habitat')) and p('altura_persona_equipo')<=p('altura_portal'),
        'giro_persona_en_pasillo':radius<g['pasillo']/2,
        'carga_extraida_fuera_casco':min(x for poly in polys[start:start+2] for x,y in shift(poly,dx,0))-margin>g['r_casco'],
    }
    load={e:n*(masas(g)[e]+v('mecanica.masa_cartucho_vacio',e)) for e in ('conservador','nominal','favorable')}
    return dict(version=CFG['meta']['version'],tipo='Candidata geométrica B19; no aceptada físicamente',
        gate_rad=gate,poligonos=polys,retirados=removed,depositos=stored,ruta=route,
        barridos=sweeps,herraje=p('herraje_lateral'),parametros={k:p(k) for k in keys},
        resultados=dict(ancho_bruto_m=width_raw,ancho_libre_m=width,margen_objetivo_m=width-g['pasillo'],
            ancho_carga_m=cargo_width,area_adicional_m2=extra,volumen_adicional_m3=extra*g['h_casco'],
            incremento_huella_fraccion=extra/(math.pi*g['r_casco']**2),
            herraje_max_por_lado_objetivo_m=(width_raw-g['pasillo'])/2,
            ancho_deposito_libre_m=bounds(stored[1])[1]-bounds(stored[0])[3],
            longitud_total_m=2*g['r_casco']+p('longitud_vestibulo'),
            carga_dos_cartuchos_kg=load,masa_casete_y_util_kg=p('masa_casete_y_util'),
            area_cultivo_en_anillo_m2=(g['n_cultivo']-n)*g['area_cartucho'],
            area_retirada_m2=n*g['area_cartucho'],persona_x_interior_m=cx,
            error_circunscripcion_m=ro-g['r1'],
            ancho_con_herraje_m={str(h):width_raw-2*h for h in [.02,.03,.04,.05]}),
        comprobaciones=checks,colisiones=collisions,
        limite='Cartuchos desnudos, reservas y recorridos rectos. Sin instalaciones/dosel medidos, rescate, resistencia ni estanqueidad.')


def main():
    # Autocomprobación del algoritmo: un obstáculo entre extremos sí debe detectarse.
    a=rect(0,0,1,1);b=rect(2,.2,3,.8)
    assert separated(a,b) and separated(shift(a,4,0),b)
    assert not separated(hull(a+shift(a,4,0)),b)
    assert not separated(a,a) and separated(a,shift(a,0,2))
    d=calcular()
    (RAIZ/'config/milpa360.acceso.json').write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
    r=d['resultados'];g=geometria();p=d['parametros']
    rows=[('Paso bruto / con herraje',f"{r['ancho_bruto_m']:.3f} / {r['ancho_libre_m']:.3f} m"),
          ('Margen frente al objetivo de 0.90 m',f"{1000*r['margen_objetivo_m']:.1f} mm"),
          ('Carga con reserva / portal',f"{r['ancho_carga_m']:.3f} / {p['ancho_portal_carga']:.2f} m"),
          ('Huella / volumen adicionales',f"{r['area_adicional_m2']:.3f} m² / {r['volumen_adicional_m3']:.2f} m³"),
          ('Longitud total con vestíbulo',f"{r['longitud_total_m']:.2f} m"),
          ('Incremento de huella / herraje máximo por lado',f"{r['incremento_huella_fraccion']*100:.1f}% / {r['herraje_max_por_lado_objetivo_m']*1000:.1f} mm"),
          ('Dos cartuchos: favorable / nominal / conservador',
           ' / '.join(f"{r['carga_dos_cartuchos_kg'][e]:.1f}" for e in ('favorable','nominal','conservador'))+' kg'),
          ('Casetes y útil', 'Masa pendiente; no incluida en las cargas anteriores'),
          ('Cultivo en anillo / retirado',f"{r['area_cultivo_en_anillo_m2']:.4f} / {r['area_retirada_m2']:.4f} m²"),
          ('Paso entre depósitos con reserva',f"{r['ancho_deposito_libre_m']:.3f} m"),
          ('Error de circunscripción digital',f"{r['error_circunscripcion_m']*1000:.4f} mm")]
    doc=RAIZ/'docs/madrid/B19-ACCESO.md'
    if doc.exists():
        text=doc.read_text();start='<!-- CALCULOS:B19 -->';end='<!-- /CALCULOS:B19 -->'
        table='\n\n| Magnitud calculada | Resultado nominal |\n|---|---|\n'+'\n'.join(f'| {k} | {v} |' for k,v in rows)+'\n\n'
        doc.write_text(text[:text.index(start)+len(start)]+table+text[text.index(end):])
    # Plano de la candidata, derivado de los mismos polígonos que consume Three.
    def pts(poly): return ' '.join(f'{330+x*110:.2f},{350-y*110:.2f}' for x,y in poly)
    radio=g['r_casco'];half_portal=p['ancho_portal_carga']/2;ang=math.asin(half_portal/radio)
    pared=[(radio*math.cos(ang+i*(2*math.pi-2*ang)/160),radio*math.sin(ang+i*(2*math.pi-2*ang)/160)) for i in range(161)]
    cuello=rect(math.sqrt(radio**2-half_portal**2),-half_portal,radio,half_portal)
    svg=[f'<circle cx="330" cy="350" r="{radio*110}" fill="#e8ece8"/>',
         f'<polygon points="{pts(cuello)}" fill="#e8ece8"/>',
         f'<polyline points="{pts(pared)}" fill="none" stroke="#364849"/>',
         f'<rect x="{330+g["r_casco"]*110}" y="{350-p["ancho_vestibulo"]*55}" width="{p["longitud_vestibulo"]*110}" height="{p["ancho_vestibulo"]*110}" fill="#e8ece8" stroke="#364849"/>',
         f'<circle cx="330" cy="350" r="{g["r_eq"]*110}" fill="#899b9a"/>']
    for i,poly in enumerate(d['poligonos']):
        if i not in d['retirados']: svg.append(f'<polygon points="{pts(poly)}" fill="#a5b291" stroke="#56634e"/>')
        else: svg.append(f'<polygon points="{pts(poly)}" fill="none" stroke="#ae673e" stroke-dasharray="5 5"/>')
    for box in d['depositos']: svg.append(f'<polygon points="{pts(box)}" fill="#cd8c5c" stroke="#824b2d"/>')
    svg.append(f'<polygon points="{pts(d["ruta"])}" fill="#77becb" opacity=".6"/>')
    for j,i in enumerate(d['retirados']):
        poly=shift(d['poligonos'][i],p['traslacion_radial'],(2*j-1)*p['traslacion_lateral'])
        svg.append(f'<polygon points="{pts(poly)}" fill="#e4b383" stroke="#824b2d"/>')
        x=g['r0']+(g['r1']-g['r0'])/2
        z=(2*j-1)*.3
        svg.append(f'<polyline points="{pts([(x,z),(x+p["traslacion_radial"],z),(x+p["traslacion_radial"],z+(2*j-1)*p["traslacion_lateral"])])}" fill="none" stroke="#a4552d" stroke-width="2" stroke-dasharray="5 4"/>')
    svg.append(f'<text x="505" y="330">Paso {r["ancho_libre_m"]:.3f} m*</text><text x="600" y="550">Vestíbulo {p["longitud_vestibulo"]:.2f} × {p["ancho_vestibulo"]:.2f} m</text>')
    table=''.join(f'<tr><td>{k}</td><td>{v}</td></tr>' for k,v in rows)
    html=f'''<!doctype html><html lang="es"><meta charset="utf-8"><title>P06 · B19</title>
<style>body{{margin:35px;background:#f2efe7;color:#223b41;font:17px Arial}}h1{{font-size:31px}}main{{display:flex;gap:28px;align-items:center}}svg{{width:62%;max-height:760px}}table{{border-collapse:collapse;width:38%}}td{{padding:12px;border-bottom:1px solid #bcc6c6}}small{{font-size:14px}}@media print{{@page{{size:A3 landscape;margin:12mm}}body{{margin:0}}}}</style>
<small>BIOMARS CHIAPAS · P06 · {d['version']}</small><h1>Acceso B19 · extracción y depósito lateral</h1>
<p>Candidata dimensional. Casco Ø{g['r_casco']*2:.2f} m; núcleo reservado Ø{g['r_eq']*2:.2f} m. Sin aceptación física.</p>
<main><svg viewBox="50 60 850 610" role="img" aria-label="Planta con dos cartuchos aparcados y ruta central libre">{''.join(svg)}</svg><table>{table}</table></main>
<p>*Herraje {p['herraje_lateral']*1000:.0f} mm/lado supuesto. Con 40 mm, el ancho es {r['ancho_con_herraje_m']['0.04']:.3f} m: no alcanza el objetivo de 0.90 m.</p>
<p>Azul: envolvente de cribado humano Ø{p['diametro_persona_equipo']:.2f} × {p['altura_persona_equipo']:.2f} m. Naranja: casetes y reserva de depósito. Trazos: extracción radial y lateral.</p>
<small>Fuente: config/milpa360.parameters.json · python3 analysis/milpa360_acceso.py. Faltan dosel, equipos, útil, cargas, sellos y rescate. No CAD de fabricación.</small></html>'''
    (RAIZ/'prototipo/planos/madrid/P06-acceso-servicio.html').write_text(html)
    print(json.dumps({k:d[k] for k in ['resultados','comprobaciones','colisiones','limite']},ensure_ascii=False,indent=2))
    return d


if __name__=='__main__': main()
