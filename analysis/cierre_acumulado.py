#!/usr/bin/env python3
"""Amplía los cálculos pendientes sin convertir supuestos en mediciones.

python3 analysis/cierre_acumulado.py
Reutiliza P1/P2/P4; genera un informe auditable y una plantilla 1:1 de E4.
"""
import contextlib
import io
import json
import math
from milpa360_p1 import main as balances, v, validar, CFG, RAIZ
from milpa360_p2 import geometria, masas
from milpa360_p4 import mecanica, reactores
from milpa360_acceso import calcular as acceso


def calcular():
    validar()
    with contextlib.redirect_stdout(io.StringIO()):
        b = balances()
    g = geometria()
    p = lambda k, e='nominal': v('cierre.' + k, e)
    crew = v('mision.tripulacion')
    days = [v('mision.duracion_total_bases')-v('mision.transito_ida')-v('mision.transito_vuelta'),
            v('mision.horizonte_diseno_superficie')]
    reserve = p('dias_reserva')
    assert reserve >= 0 and 0 < p('fotoperiodo_h') <= 24
    for e in ('conservador', 'nominal', 'favorable'):
        assert 0 < p('eficiencia_accionamiento', e) <= 1 and 0 < p('COP_frio', e)
        assert 0 <= p('bomba_h_d', e) <= 24 and 0 <= p('eficiencia_calor_gas', e) <= 1
        assert all(p(k, e) >= 0 for k in ('bomba_W','ventilacion_W','control_W','calefaccion_digestor_W','U_casco'))
    stocks = []
    for d in days:
        days_with_reserve = d + reserve
        stocks.append(dict(superficie_d=d, reserva_d=reserve,
            alimento_humano_kcal=days_with_reserve*crew*v('tripulacion.energia_alimento'),
            alimento_humano_kg=days_with_reserve*crew*v('tripulacion.alimento_empacado'),
            alimento_aves_kg=days_with_reserve*b['B', 'nominal']['alimento_kg'],
            credito_por_cosecha_kg=0,
            agua_potable_flujo_minimo_L_d=crew*v('tripulacion.agua_potable_minima')))
    # A incluye las dos tapas y la pared del casco cilíndrico nominal.
    area = 2*math.pi*g['r_casco']**2 + 2*math.pi*g['r_casco']*g['h_casco']
    energy = {}
    for e in ('conservador', 'nominal', 'favorable'):
        r = b['B', e]
        pump = p('bomba_W',e)*p('bomba_h_d',e)/1000
        ventilation = p('ventilacion_W',e)*24/1000
        control = p('control_W',e)*24/1000
        heater = p('calefaccion_digestor_W',e)*24/1000
        m = mecanica(e, v('mision.gravedad_marte'))
        index = (m['trabajo_resistente_por_paso_J']+m['energia_cinetica_J']) / (
            p('eficiencia_accionamiento',e)*3.6e6*v('geometria_actual.soles_por_paso')*v('mision.dias_por_sol'))
        aux = pump + ventilation + control + heater + index
        inputs = r['luz_kwh'] + aux
        transmission = p('U_casco',e)*area*(p('temperatura_interior')-p('temperatura_exterior',e))*24/1000
        # Balance térmico estacionario simplificado: toda electricidad termina como calor.
        # No sumar otra vez calor latente a las luces: la evapotranspiración lo redistribuye.
        sensible_heat = max(transmission-inputs, 0)
        sensible_cooling = max(inputs-transmission, 0)
        hvac = sensible_heat + sensible_cooling/p('COP_frio',e)
        energy[e] = dict(luz_kWh_d=r['luz_kwh'], bomba_kWh_d=pump,
            ventilacion_kWh_d=ventilation, control_kWh_d=control,
            digestor_kWh_d=heater, indexado_kWh_d=index,
            auxiliares_kWh_d=aux, transmision_casco_kWh_d=transmission,
            calefaccion_espacio_kWh_d=sensible_heat, frio_sensible_kWh_d=sensible_cooling,
            electricidad_HVAC_sensible_kWh_d=hvac,
            subtotal_modelado_electrico_kWh_d=inputs+hvac,
            pico_simultaneo_sin_HVAC_kW=r['luz_kwh']/p('fotoperiodo_h')+
                (p('bomba_W',e)+p('ventilacion_W',e)+p('control_W',e)+p('calefaccion_digestor_W',e))/1000+
                m['potencia_mecanica_max_W']/p('eficiencia_accionamiento',e)/1000,
            biogas_calor_potencial_kWh_d=r['biogas_kwh_quimico']*p('eficiencia_calor_gas',e),
            credito_biogas_electrico_kWh_d=0,
            subtotal_modelado_por_sol_kWh=(inputs+hvac)*v('mision.dias_por_sol'))
    nominal = b['B', 'nominal']
    net_water = nominal['transpiracion_L']*(1-v('simulacion.fraccion_condensada'))
    water = dict(transpiracion_L_d=nominal['transpiracion_L'],
        reposicion_por_ET_L_d=net_water,
        autonomia_inventario_sin_reposicion_d=v('simulacion.agua_inicial')/net_water,
        autonomia_sin_condensador_ni_reposicion_d=v('simulacion.agua_inicial')/nominal['transpiracion_L'],
        reserva_72h_ET_L=net_water*3,
        reserva_72h_sin_condensador_L=nominal['transpiracion_L']*3,
        limite='No incluye limpieza, purga, agua animal ni consumo humano; una bomba fallada puede impedir usar el depósito.')
    # Una carga inicial completa; el lavado transfiere el contaminante a un efluente.
    soil = []
    for e in ('conservador','nominal','favorable'):
        mass = masas(g)[e]*g['n']
        clo4 = mass*v('sustrato.fraccion_perclorato',e)
        soil.append(dict(escenario=e,sustrato_kg=mass,perclorato_inicial_kg=clo4,
            lavado_L={str(r): mass*r for r in (1,3,5)},
            cloruro_estequiometrico_kg=clo4*35.45/v('perclorato.masa_molar_clo4'),
            demanda_teorica_DQO_kg=clo4*64/v('perclorato.masa_molar_clo4'),
            limite='Estado inicial supuesto; reducción ideal completa, sin cinética, eficiencia ni dosis operativa.'))
    access=[]
    for n in (2,3):
        raw=2*g['r0']*math.sin(n*g['paso_ang']/2)
        access.append(dict(posiciones=n,paso_bruto_m=raw,paso_con_50mm_por_lado_m=raw-.1,
            area_cultivo_restante_m2=(g['n_cultivo']-n)*g['area_cartucho'],
            carga_nominal_sin_util_kg=n*(masas(g)['nominal']+v('mecanica.masa_cartucho_vacio')),
            almacenamiento_verificado=(n==2)))
    for x in energy.values():
        assert all(math.isfinite(y) and y>=0 for y in x.values())
        assert x['credito_biogas_electrico_kWh_d']==0
        assert x['subtotal_modelado_electrico_kWh_d']>=x['luz_kWh_d']
    assert stocks[1]['alimento_humano_kg']>stocks[0]['alimento_humano_kg']
    assert access[0]['paso_con_50mm_por_lado_m']<.9<access[1]['paso_con_50mm_por_lado_m']
    assert water['autonomia_sin_condensador_ni_reposicion_d']<water['autonomia_inventario_sin_reposicion_d']
    return dict(version=CFG['meta']['version'],tipo='Cálculo condicionado; no medición ni diseño de fabricación',
        reservas=stocks,energia=energy,agua=water,sustrato=soil,acceso=access,
        reactores=reactores(),area_casco_termica_m2=area)


def main():
    d=calcular()
    (RAIZ/'config/milpa360.cierre.json').write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
    lines=['# Resultados del cierre acumulado', '',
        f"Revisión {d['version']}. Generado por `python3 analysis/cierre_acumulado.py`.",
        'Todos son cálculos sobre literatura o supuestos; no resultados de ensayo.', '',
        '## Provisiones sin crédito por cosecha', '',
        '| Superficie + reserva d | kcal humanas | kg alimento empacado | kg ración animal |',
        '|---|---:|---:|---:|']
    for r in d['reservas']:
        lines.append(f"| {r['superficie_d']:.0f} + {r['reserva_d']:.0f} | {r['alimento_humano_kcal']:.0f} | {r['alimento_humano_kg']:.2f} | {r['alimento_aves_kg']:.2f} |")
    lines += ['', 'El factor 2.39 kg/persona/día procede de ICES-2019-126 p.2/BVAD y contiene 0.43 kg de empaque. No es un menú. Incluye el arranque dentro del horizonte; no sumar otros 85 días. Tránsito y reservas del hábitat completo se presupuestan aparte. No descontar los alimentos de MILPA hasta validarlos.', '',
        '## Electricidad y térmica del casco nominal', '',
        '| Escenario | Luz kWh/d | Auxiliares kWh/d | HVAC sensible kWh/d | Subtotal modelado kWh/d | kWh/sol | Pico sin HVAC kW |',
        '|---|---:|---:|---:|---:|---:|---:|']
    for e,r in d['energia'].items():
        lines.append(f"| {e} | {r['luz_kWh_d']:.3f} | {r['auxiliares_kWh_d']:.3f} | {r['electricidad_HVAC_sensible_kWh_d']:.3f} | {r['subtotal_modelado_electrico_kWh_d']:.3f} | {r['subtotal_modelado_por_sol_kWh']:.3f} | {r['pico_simultaneo_sin_HVAC_kW']:.3f} |")
    lines += ['', 'E = P × horas/1000. Transmisión = U × área × (Tinterior − Texterior) × 24/1000. Se compara con disipación eléctrica, sin añadirla otra vez a la carga total. Calefacción resistiva; frío sensible/COP. Crédito eléctrico del biogás: cero hasta seleccionar conversión y auxiliares. El calor recuperable es sólo un techo por eficiencia supuesta.', '',
        'Este subtotal excluye vestíbulo, esclusas, puentes térmicos, radiación solar, infiltración, metabolismo, tratamiento ISRU y dimensionado de deshumidificación. Los escenarios no representan una climatología ni probabilidades. No sirve para comprar HVAC o dimensionar un sistema de soporte vital.', '',
        '## Agua de cultivo', '', '| Cálculo | Valor |', '|---|---:|']
    for k,x in d['agua'].items():
        if isinstance(x,(int,float)): lines.append(f'| {k} | {x:.3f} |')
    lines += ['',d['agua']['limite'],'', '## Tratamiento inicial de todo el sustrato', '',
        '| Escenario | kg sustrato | kg ClO4 inicial | Lavado 1–5 L/kg: L | kg Cl ideal | kg DQO teórica |',
        '|---|---:|---:|---:|---:|---:|']
    for r in d['sustrato']:
        lines.append(f"| {r['escenario']} | {r['sustrato_kg']:.1f} | {r['perclorato_inicial_kg']:.3f} | {r['lavado_L']['1']:.0f}–{r['lavado_L']['5']:.0f} | {r['cloruro_estequiometrico_kg']:.3f} | {r['demanda_teorica_DQO_kg']:.3f} |")
    lines += ['', 'ClO4− requiere 8 electrones/mol: equivalente ideal de 2 mol O2 (64 g) por mol. El cloro se conserva como cloruro (35.45 g/mol). No son dosis de reactivo: aceptores competidores, crecimiento, inhibición, contaminantes y purga deben medirse. L/S=1–5 es sensibilidad, no protocolo de descontaminación. No se puede calcular volumen útil del biorreactor de salmuera sin caudal y tiempo de tratamiento verificados.', '',
        '## Alternativas de acceso', '',
        '| Posiciones retiradas | Paso bruto m | Con 50 mm/lado m | kg sin útil | Cultivo restante m² | Depósito y trayectoria |',
        '|---|---:|---:|---:|---:|---|']
    for r in d['acceso']:
        lines.append(f"| {r['posiciones']} | {r['paso_bruto_m']:.3f} | {r['paso_con_50mm_por_lado_m']:.3f} | {r['carga_nominal_sin_util_kg']:.1f} | {r['area_cultivo_restante_m2']:.4f} | {'B19 digital' if r['almacenamiento_verificado'] else 'Sin resolver: no adoptada'} |")
    lines += ['', 'Tres posiciones mejoran la garganta pero aumentan carga y exigen otro almacén. Un anillo fijo abierto evita el cruce, pero cambia transporte y ciclo. La decisión de esta revisión conserva B como concepto y B19 como estudio condicionado; no autoriza construir ni ocupar el módulo. Ampliar un hueco por sí solo no demuestra evacuación.', '']
    (RAIZ/'docs/madrid/CALCULOS-CIERRE.md').write_text('\n'.join(lines))
    # Plantilla métrica 1:1: imprimir al 100% por mosaico, comprobar testigo antes de usar.
    g=geometria();a=acceso();mm=lambda x:x*1000
    radius=mm(g['r_casco']);length=mm(v('acceso_servicio.longitud_vestibulo'));width=mm(v('acceso_servicio.ancho_vestibulo'))
    pts=lambda poly:' '.join(f'{mm(x):.3f},{mm(y):.3f}' for x,y in poly)
    footprints=[]
    for i,poly in enumerate(a['poligonos']):
        dash=' stroke-dasharray="15 15"' if i in a['retirados'] else ''
        footprints.append(f'<polygon points="{pts(poly)}"{dash}/>')
    footprints += [f'<polygon points="{pts(poly)}" stroke="#824b2d"/>' for poly in a['depositos']]
    footprints.append(f'<polygon points="{pts(a["ruta"])}" stroke="#278092" stroke-dasharray="25 15"/>')
    svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="{2*radius+length}mm" height="{2*radius}mm" viewBox="{-radius} {-radius} {2*radius+length} {2*radius}">
<g fill="none" stroke="#333" stroke-width="3"><circle r="{radius}"/><circle r="{mm(g['r_eq'])}"/>{''.join(footprints)}<path d="M{radius},{-width/2}h{length}v{width}h{-length}"/><path d="M-1500,-1900h1000m-1000,-30v60m1000,-60v60"/></g>
<g font-family="sans-serif" font-size="60"><text x="-1500" y="-1970">TESTIGO 1000 mm</text><text x="-1000" y="-1200">E4 · PLANTILLA SIN CARGA</text><text x="-1000" y="-1090">No acredita rescate ni resistencia</text><text x="2350" y="-1620">Vestíbulo B19 candidato</text><text x="2350" y="1700">Marrón: depósitos; azul: ruta supuesta</text><text x="-1000" y="1200">Herrajes/puertas/útil: añadir con P06 y medidas</text></g></svg>'''
    (RAIZ/'prototipo/planos/madrid/P07-plantilla-E4.svg').write_text(svg)
    print('Cierre: reservas, auxiliares, agua, estequiometría y alternativas verificados; sin ensayos físicos.')


if __name__=='__main__':
    main()
