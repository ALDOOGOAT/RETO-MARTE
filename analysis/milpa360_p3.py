#!/usr/bin/env python3
"""Genera entradas de P3 desde configuración y funciones P1/P2, sin copiar sus balances."""
import contextlib, io, json
from pathlib import Path
import milpa360_p1 as p1
import milpa360_p2 as p2
import milpa360_acceso as acceso

raiz = Path(__file__).resolve().parent.parent
with contextlib.redirect_stdout(io.StringIO()):
    balances = p1.main()
    p2.main()
g = json.loads((raiz/'config/milpa360.geometria.json').read_text())
datos = dict(version=p1.CFG['meta']['version'], parametros=p1.CFG['parametros'],
             geometria=g, balance=balances[('B','nominal')], acceso=acceso.calcular())
salida = ('// GENERADO: python3 analysis/milpa360_p3.py; no editar.\n'
          'globalThis.MILPA_DATOS = ' + json.dumps(datos,ensure_ascii=False,separators=(',',':')) + ';\n'
          'if (typeof module !== "undefined") module.exports = globalThis.MILPA_DATOS;\n')
(raiz/'prototipo-3d/milpa360-datos.js').write_text(salida)
print(f"P3 generado desde {datos['version']}; balance nominal P1 y geometría P2, sin mediciones propias.")
