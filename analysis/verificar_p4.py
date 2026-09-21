"""Casos analíticos y límites de los cálculos mecánicos S3."""
import importlib.util, math
assert importlib.util.find_spec('milpa360_p4'), 'Falta el cálculo reproducible P4'
from milpa360_p4 import inercia_anular, perfil_triangular, mecanica, reactores, alternativas, trayectoria_nominal, validar
validar()
assert inercia_anular(5,1,3)==25
alfa,omega=perfil_triangular(math.pi/10,60)
assert math.isclose(omega*60/2,math.pi/10)
assert math.isclose(alfa*30,omega)
for args in [(1,0),(1,-1)]:
    try: perfil_triangular(*args)
    except ValueError: pass
    else: raise AssertionError('Duración inválida aceptada')
t=mecanica('nominal',9.81);m=mecanica('nominal',3.71)
assert t['masa_kg']==m['masa_kg'] and t['inercia_kg_m2']==m['inercia_kg_m2']
assert t['par_inercial_Nm']==m['par_inercial_Nm']
assert math.isclose(t['par_rodadura_Nm']/m['par_rodadura_Nm'],9.81/3.71)
assert math.isclose(t['energia_cinetica_J'],.5*t['inercia_kg_m2']*t['omega_max_rad_s']**2)
assert t['masa_kg']>t['masa_sustrato_kg']>0
for e,r in reactores().items():
    assert r['volumen_util_m3']>0 and r['volumen_total_m3']>r['volumen_util_m3']
    assert math.isclose(r['caudal_m3_d']*r['hrt_d'],r['volumen_util_m3'])
    assert 0<r['sv_kg_d']<=r['st_kg_d']
a=alternativas()
assert math.isclose(a[0]['altura_paso_m'],1.58)
assert math.isclose(a[1]['altura_paso_m'],2.20)
assert math.isclose(a[2]['altura_paso_m'],2.10)
assert all(x['acceso_validado'] is False for x in a)
tr=trayectoria_nominal()
assert tr['margen_nucleo_m']>0.26 and math.isclose(tr['margen_anillo_m'],0.02)
assert math.isclose(tr['altura_izado_min_m'],0.30)
assert tr['salida_exterior_resuelta'] is False
print('P4: unidades, inercia, perfil, gravedad, volúmenes y límites comprobados.')
