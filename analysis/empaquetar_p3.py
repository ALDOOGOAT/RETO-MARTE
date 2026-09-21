#!/usr/bin/env python3
"""ZIP offline P3 con manifiesto SHA-256; no es el paquete final P5."""
import hashlib,json,pathlib,zipfile
raiz=pathlib.Path(__file__).resolve().parent.parent
archivos=[raiz/'prototipo-3d'/n for n in ('milpa360-simulador.html','milpa360-acceso.html','milpa360-modelo.js','milpa360-datos.js','LEEME-P3.md','package.json','package-lock.json')]
archivos+=list((raiz/'prototipo-3d/vendor').glob('*'))
archivos+=list((raiz/'config').glob('*.json'))
archivos+=[raiz/'docs/madrid'/n for n in ('P1-INGENIERIA.md','P2-GEOMETRIA.md','P3-SIMULACION.md','P4-MECANICA-ENSAYOS.md','ESTADO.md','matriz-requisitos.md','registro-afirmaciones.csv','PLAN-CONTINUIDAD-ASTRA.md','PRUEBA-P3-NAVEGADOR.json')]
archivos+=[raiz/n for n in ('MISION-MADRID-MILPA360.md','INVESTIGACION-MARTE.md','CONTEXTO-RETO-MARTE.md')]
archivos+=list((raiz/'docs/madrid/capturas').glob('*.png'))
archivos+=list((raiz/'docs/madrid/capturas-b19').glob('*.png'))
archivos+=[raiz/'docs/madrid'/n for n in ('B19-ACCESO.md','PRUEBA-B19-NAVEGADOR.json','P5-DEFENSA.md','CIERRE-ACUMULADO.md','CALCULOS-CIERRE.md')]
archivos+=list((raiz/'docs/madrid/ensayos').glob('*.csv'))
# Documentos con enlaces a cálculos: se incluyen fuentes y láminas necesarias para regenerar.
archivos+=list((raiz/'analysis').glob('*.py'))+list((raiz/'analysis').glob('*.cjs'))+list((raiz/'analysis').glob('*.mjs'))
archivos+=list((raiz/'prototipo/planos').glob('*.html'))+[raiz/'prototipo/planos/_estilo.css']
archivos+=list((raiz/'prototipo/planos/madrid').glob('*.html'))
archivos+=list((raiz/'prototipo/planos/madrid').glob('*.svg'))
registros={str(p.relative_to(raiz)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(set(archivos))}
manifiesto=raiz/'docs/madrid/MANIFIESTO-P3.json'
manifiesto.write_text(json.dumps({'tipo':'P3 offline, no entrega final P5','sha256':registros},ensure_ascii=False,indent=2)+'\n')
salida=raiz/'entregas/madrid-p3.zip';salida.parent.mkdir(exist_ok=True)
with zipfile.ZipFile(salida,'w',zipfile.ZIP_DEFLATED) as z:
    for nombre in registros: z.write(raiz/nombre,nombre)
    z.write(manifiesto,str(manifiesto.relative_to(raiz)))
with zipfile.ZipFile(salida) as z:
    assert z.testzip() is None
    for nombre,h in registros.items(): assert hashlib.sha256(z.read(nombre)).hexdigest()==h
print(f'{salida}: {len(registros)} archivos verificados por SHA-256')
