"""Regresión de S0: mínimo entre sectores y envolvente rectangular real (metros)."""
import math
from milpa360_p2 import geometria, barrido

g = geometria()
# Distancia euclídea entre los extremos interiores de dos bordes contiguos.
p = (g['r0'] * math.cos(g['sector']/2), g['r0'] * math.sin(g['sector']/2))
a = g['paso_ang'] - g['sector']/2
q = (g['r0'] * math.cos(a), g['r0'] * math.sin(a))
assert math.isclose(barrido(g)['vecino']['min'], math.dist(p, q), abs_tol=1e-10), 'Se está midiendo el hueco exterior, no el mínimo'
assert math.isclose(g['fondo_envolvente'], g['r1'] - p[0], abs_tol=1e-10), 'La curvatura interior aumenta el fondo de la envolvente'
print('Geometría: mínimo entre sectores y envolvente verificados; mantenimiento físico pendiente.')
