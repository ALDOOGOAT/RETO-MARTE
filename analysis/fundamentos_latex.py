#!/usr/bin/env python3
"""Compila fundamentos V4 con valores actuales; requiere Tectonic en PATH."""
from pathlib import Path
import json, shutil, subprocess
ROOT=Path(__file__).resolve().parents[1]
g=json.loads((ROOT/'config/milpa360.geometria.json').read_text())
c=json.loads((ROOT/'config/milpa360.cierre.json').read_text())
d=json.loads((ROOT/'prototipo-3d/milpa360-datos.js').read_text().split(' = ',1)[1].split(';\n',1)[0])
out=ROOT/'outputs/madrid-s5'
values={'BiogasNominal':d['balance']['biogas_kwh_quimico'],
        'RelacionLuz':round(c['energia']['nominal']['luz_kWh_d']/d['balance']['biogas_kwh_quimico'],1),
        'AreaCartucho':g['cartucho']['area'],'AreaCultivo':g['areas']['cultivo'],
        'AreaTotal':g['areas']['total'],'MasaCartucho':g['cartucho']['masa_kg']['nominal'],
        'LuzNominal':c['energia']['nominal']['luz_kWh_d'],
        'EnergiaNominal':c['energia']['nominal']['subtotal_modelado_electrico_kWh_d'],
        'EnergiaSol':c['energia']['nominal']['subtotal_modelado_por_sol_kWh']}
assert 0<values['AreaCultivo']<values['AreaTotal']
(out/'valores.tex').write_text('\n'.join('\\newcommand{\\'+k+'}{'+f'{v:.4f}'.rstrip('0').rstrip('.')+'}' for k,v in values.items())+'\n')
# Mantener rutas relativas a la carpeta de salida; fuentes editables en docs.
tex=out/'FUNDAMENTOS-MILPA360.tex'
tex.write_text((ROOT/'docs/madrid/latex/fundamentos.tex').read_text().replace('../../../docs/','../../docs/'))
engine=shutil.which('tectonic') or str(Path.home()/'.local/bin/tectonic')
subprocess.run([engine,'--keep-logs',str(tex),'--outdir',str(out)],check=True,cwd=ROOT)
print(out/'FUNDAMENTOS-MILPA360.pdf')
