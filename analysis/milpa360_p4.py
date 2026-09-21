#!/usr/bin/env python3
"""S3: envolventes, cargas, accionamiento y volumen candidato; NO validación física."""
import contextlib, io, json, math
from milpa360_p2 import RAIZ, CFG, v, validar, geometria, masas
from milpa360_p1 import main as balance_p1


def inercia_anular(m, r0, r1):
    if not all(math.isfinite(x) for x in (m,r0,r1)) or m<0 or not 0<=r0<r1:
        raise ValueError('Masa/radios inválidos')
    return m*(r0*r0+r1*r1)/2


def perfil_triangular(angulo, tiempo):
    if not all(math.isfinite(x) and x>0 for x in (angulo,tiempo)):
        raise ValueError('Ángulo y tiempo deben ser positivos y finitos')
    return 4*angulo/tiempo**2, 2*angulo/tiempo


def mecanica(escenario='nominal', gravedad=9.81, coef=None, tiempo=None):
    if escenario not in ('conservador','nominal','favorable') or not math.isfinite(gravedad) or gravedad<=0:
        raise ValueError('Escenario/gravedad inválidos')
    g=geometria();p=lambda k:v('mecanica.'+k,escenario)
    sustrato=masas(g)[escenario]*g['n']
    tara=p('masa_cartucho_vacio')*g['n']; estructura=p('masa_anillo')
    fluidos=p('masa_fluido_movil');biomasa=p('masa_biomasa_movil')
    masa=sustrato+tara+estructura+fluidos+biomasa
    rm=(g['r0']+g['r1'])/2
    # Anillo y lecho distribuidos en corona uniforme; tara, fluidos y biomasa en radio medio.
    inercia=inercia_anular(sustrato,g['r0_suelo'],g['r1_suelo'])+inercia_anular(estructura,g['r0'],g['r1'])+(tara+fluidos+biomasa)*rm**2
    alfa,omega=perfil_triangular(g['paso_ang'],p('tiempo_indexado') if tiempo is None else tiempo)
    mu=p('coef_resistencia_rodadura') if coef is None else coef
    if not math.isfinite(mu) or mu<0: raise ValueError('Coeficiente inválido')
    rodadura=mu*masa*gravedad*p('radio_apoyos')
    inercial=inercia*alfa;resistente=rodadura+p('par_auxiliar')
    demanda=(resistente+inercial)*p('factor_dimensionado')
    n=p('n_apoyos')
    if int(n)!=n or n<3: raise ValueError('Se requieren al menos tres apoyos')
    cartucho=masas(g)[escenario]+p('masa_cartucho_vacio')
    # Centroide radial del sector, no su radio medio aproximado.
    centroide=4*math.sin(g['sector']/2)/(3*g['sector'])*(g['r1']**3-g['r0']**3)/(g['r1']**2-g['r0']**2)
    w=cartucho*gravedad;L=g['ancho_radial'];flecha=p('deformacion_objetivo')
    if flecha<=0: raise ValueError('Objetivo de flecha inválido')
    return dict(masa_kg=masa,masa_sustrato_kg=sustrato,masa_cartucho_cargado_kg=cartucho,
        inercia_kg_m2=inercia,alfa_rad_s2=alfa,omega_max_rad_s=omega,
        par_rodadura_Nm=rodadura,par_auxiliar_Nm=p('par_auxiliar'),par_inercial_Nm=inercial,
        par_arranque_preliminar_Nm=demanda,potencia_mecanica_max_W=(resistente+inercial)*omega,
        energia_cinetica_J=.5*inercia*omega**2,
        trabajo_resistente_por_paso_J=resistente*g['paso_ang'],
        reaccion_media_apoyo_N=masa*gravedad/n,
        reaccion_sensibilidad_apoyo_N=masa*gravedad/n*p('factor_reparto_apoyos'),
        carga_cartucho_N=w,momento_por_viga_Nm=w*L/16,
        EI_por_viga_min_Nm2=5*(w/2)*L**3/(384*flecha),
        fuerza_bloqueo_preliminar_N=demanda/p('radio_bloqueo'),
        centro_masa_sin_cartucho_m=cartucho*centroide/(masa-cartucho),
        par_desbalance_inclinado_Nm=cartucho*gravedad*centroide*math.sin(math.radians(p('desnivel_eje'))),
        capacidad_motor_real_Nm=None,capacidad_estructura_N=None)


def reactores():
    with contextlib.redirect_stdout(io.StringIO()): balances=balance_p1()
    salida={}
    for e in ('conservador','nominal','favorable'):
        b=balances['B',e];p=lambda k:v('mecanica.'+k,e)
        st_frass=b['estiercol_st']*(1-v('larvas.fraccion_estiercol_a_larvas')*v('larvas.degradacion_materia_seca'))
        st=st_frass+b['rastrojo_ms'];sv=b['sv_a_digestor']+b['rastrojo_ms']*p('fraccion_sv_rastrojo')
        flujo=st/(p('fraccion_st_alimentacion')*p('densidad_mezcla'))
        volumen=flujo*p('retencion_digestor');total=volumen/(1-p('fraccion_gas_reactor'))
        diam=p('diametro_interior_digestor');altura=total/(math.pi*diam**2/4)
        salida[e]=dict(st_kg_d=st,sv_kg_d=sv,caudal_m3_d=flujo,hrt_d=p('retencion_digestor'),
            volumen_util_m3=volumen,volumen_total_m3=total,OLR_kgSV_m3_d=sv/volumen,
            diametro_interior_m=diam,altura_cilindro_m=altura,
            diametro_reserva_m=diam+2*p('margen_radial_reactor'),
            volumen_salmuera_m3=None,caudal_agua_adicional_m3_d=None)
    # Los escenarios P1 combinan productividad y otros supuestos: su caso conservador
    # NO es necesariamente el mayor volumen. Cruce independiente para el techo de diseño.
    techo=salida['favorable'].copy()
    techo['hrt_d']=v('mecanica.retencion_digestor','conservador')
    techo['caudal_m3_d']=techo['st_kg_d']/(v('mecanica.fraccion_st_alimentacion','conservador')*v('mecanica.densidad_mezcla'))
    techo['volumen_util_m3']=techo['caudal_m3_d']*techo['hrt_d']
    techo['volumen_total_m3']=techo['volumen_util_m3']/(1-v('mecanica.fraccion_gas_reactor'))
    techo['altura_cilindro_m']=techo['volumen_total_m3']/(math.pi*techo['diametro_interior_m']**2/4)
    techo['OLR_kgSV_m3_d']=techo['sv_kg_d']/techo['volumen_util_m3']
    salida['envolvente']=techo
    return salida


def alternativas():
    g=geometria();a=math.pi*g['r_casco']**2
    # Casos de comparación, no dimensiones adoptadas ni antropometría certificada.
    casos=[('S2 histórico: piso=cama',2.2,.62,.62),
           ('D8: piso inferior de P-02',g['h_casco'],g['piso'],g['piso']),
           ('Casco alto + cruce elevado (candidato)',v('acceso.altura_casco_alternativa'),v('acceso.altura_piso_alternativa'),v('acceso.cota_cruce_alternativa'))]
    return [dict(nombre=n,techo_m=h,piso_m=p,cota_cruce_m=c,altura_paso_m=h-c,
            altura_sobre_cama_m=h-g['cubierta'],volumen_cilindro_m3=a*h,
            incremento_envolvente_lateral_m2=2*math.pi*g['r_casco']*(h-2.2),
            acceso_validado=False) for n,h,p,c in casos]


def trayectoria_nominal():
    """Sólo cartucho rígido desnudo: barrido de traslado radial al pasillo y giro orbital.

    No incluye persona, carro, aparejo, equipos fijos ni la salida a través del casco.
    """
    g=geometria();margen=v('acceso.margen_maniobra')
    # Desplazamiento para que todos los puntos de la envolvente externa queden dentro de r0.
    a=g['sector']/2
    d=g['r1']*math.cos(a)-math.sqrt((g['r0']-margen)**2-(g['r1']*math.sin(a))**2)
    puntos=[(r*math.cos(-a+2*a*k/100)-d,r*math.sin(-a+2*a*k/100)) for r in (g['r0'],g['r1']) for k in range(101)]
    radios=[math.hypot(x,y) for x,y in puntos]
    # Girar el conjunto completo alrededor del eje conserva todos estos radios.
    return dict(traslacion_radial_m=d,margen_nucleo_m=min(radios)-g['r_eq'],
                margen_anillo_m=g['r0']-max(radios),
                altura_izado_min_m=g['caja']+margen,
                abertura_salida_min_sin_carro_m=g['cuerda']+2*margen,
                salida_exterior_resuelta=False)


def main():
    validar()
    m={e:{l:mecanica(e,g) for l,g in [('Tierra',9.81),('Marte',v('mision.gravedad_marte'))]}
       for e in ('conservador','nominal','favorable')}
    datos=dict(version=CFG['meta']['version'],tipo='cálculo con supuestos, no medición',
               mecanica=m,reactores=reactores(),alternativas=alternativas(),trayectoria=trayectoria_nominal(),
               sensibilidad_mu={str(x):mecanica(coef=x)['par_arranque_preliminar_Nm'] for x in (.001,.005,.01)},
               sensibilidad_tiempo={str(x):mecanica(tiempo=x)['par_arranque_preliminar_Nm'] for x in (15,60,120)})
    (RAIZ/'config/milpa360.mecanica.json').write_text(json.dumps(datos,ensure_ascii=False,indent=2)+'\n')
    filas=['| Escenario / gravedad | Masa móvil kg | Par preliminar N·m | Apoyo desigual N | Pico mecánico W |',
           '|---|---:|---:|---:|---:|']
    for e,gr in m.items():
        for lugar,r in gr.items():
            filas.append(f"| {e} / {lugar} | {r['masa_kg']:.0f} | {r['par_arranque_preliminar_Nm']:.1f} | {r['reaccion_sensibilidad_apoyo_N']:.0f} | {r['potencia_mecanica_max_W']:.2f} |")
    filas+=['','| Digestor candidato | Q L/d | HRT d | Útil L | Total L | OLR kg SV/m³/d | Alto cilindro m |','|---|---:|---:|---:|---:|---:|---:|']
    for e,r in datos['reactores'].items():
        filas.append(f"| {e} | {r['caudal_m3_d']*1000:.2f} | {r['hrt_d']:.0f} | {r['volumen_util_m3']*1000:.1f} | {r['volumen_total_m3']*1000:.1f} | {r['OLR_kgSV_m3_d']:.2f} | {r['altura_cilindro_m']:.2f} |")
    doc=RAIZ/'docs/madrid/P4-MECANICA-ENSAYOS.md'
    if doc.exists():
        s=doc.read_text();a,b='<!-- CALCULOS:S3 -->','<!-- /CALCULOS:S3 -->'
        i,j=s.index(a)+len(a),s.index(b)
        doc.write_text(s[:i]+'\n\n'+'\n'.join(filas)+'\n\n'+s[j:])
    print(json.dumps(datos,ensure_ascii=False,indent=2))


if __name__=='__main__': main()
