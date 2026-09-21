// S4: hoja de presupuesto reproducible. Datos editables en config/milpa360.presupuesto.json.
// Usa @oai/artifact-tool ya instalado; no añade dependencias al proyecto.
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const runtime = process.env.ARTIFACT_RUNTIME || '/home/aldo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node';
const { Workbook, SpreadsheetFile } = await import(createRequire(`${runtime}/package.json`).resolve('@oai/artifact-tool'));
const cfg = JSON.parse(await fs.readFile(`${root}/config/milpa360.presupuesto.json`, 'utf8'));
const geo = JSON.parse(await fs.readFile(`${root}/config/milpa360.geometria.json`, 'utf8'));
const mec = JSON.parse(await fs.readFile(`${root}/config/milpa360.mecanica.json`, 'utf8'));
const params = JSON.parse(await fs.readFile(`${root}/config/milpa360.parameters.json`, 'utf8'));
const outDir = path.resolve(process.env.S4_OUTPUT_DIR || `${root}/outputs/madrid-s4-20260920`);
const previewDir = path.resolve(process.env.S4_PREVIEW_DIR || '/tmp/milpa-s4-preview');
const pending = 'Pendiente';
assert.equal(new Set(cfg.precios.map(p => p.id)).size, cfg.precios.length, 'ID de precio duplicado');
for (const [name, b] of Object.entries(cfg.presupuestos)) {
  assert.equal(new Set(b.partidas.map(p => p[0])).size, b.partidas.length, `${name}: ID duplicado`);
  for (const p of b.partidas) {
    assert(p[3] === null || (Number.isFinite(p[3]) && p[3] >= 0), `${p[0]} cantidad inválida`);
    assert(p[2] === null || cfg.precios.some(c => c.id === p[2]), `${p[0]} precio inexistente`);
  }
}
for (const p of cfg.precios) assert(Number.isFinite(p.precio) && p.precio >= 0 && p.url.startsWith('https://'));

const wb = Workbook.create();
const sheets = Object.fromEntries(['Resumen', 'Madrid', 'Chiapas', 'Marte', 'Precios'].map(n => [n, wb.worksheets.add(n)]));
const money = '#,##0.00;[Red](#,##0.00);0.00';
function style(sh, end, widths) {
  sh.showGridLines = false;
  sh.getRange(end).format = { font: { name: 'Arial', size: 10, color: '#162D36' }, rowHeight: 32, verticalAlignment: 'center', wrapText: true };
  for (const [col, width] of Object.entries(widths)) sh.getRange(`${col}:${col}`).format.columnWidth = width;
  sh.getRange('A1').format.font = { name: 'Arial', size: 14, bold: true, color: '#162D36' };
}
function header(sh, range) {
  sh.getRange(range).format = { fill: '#173C46', font: { name: 'Arial', size: 10, bold: true, color: '#FFFFFF' }, rowHeight: 38, wrapText: true };
}
function formula(sh, address, f, cross = false) {
  sh.getRange(address).formulas = [[f]];
  sh.getRange(address).format.font.color = cross ? '#167044' : '#111111';
}
function missing(sh, range) {
  sh.getRange(range).conditionalFormats.add('containsText', { text: pending, format: { fill: '#FFF0CD', font: { color: '#855000' } } });
}
function input(sh, range) { sh.getRange(range).format.font.color = '#155FC4'; }

const sum = sheets.Resumen;
style(sum, 'A1:E39', { A: 37, B: 22, C: 22, D: 3, E: 66 });
sum.getRange('A1').values = [['MILPA-360 · Presupuestos S4']];
sum.getRange('A2:C2').merge(); sum.getRange('A2').values = [[`${cfg.revision} · MXN · precios públicos, sin compras`]];
sum.getRange('A3:C3').merge(); sum.getRange('A3').values = [['Presupuestos preliminares: una suma parcial no es el coste del proyecto.']];
sum.getRange('A3:C3').format.rowHeight = 38;
sum.getRange('A5:B9').values = [
  ['Controles de planificación', 'Valor'],
  ['IVA general (sólo precio excluido)', cfg.iva_general],
  ['Contingencia provisional', cfg.contingencia],
  ['Límite equipo MXN', cfg.limite_equipo_mxn],
  ['Fecha de consulta', new Date(`${cfg.fecha_consulta}T12:00:00Z`)]
];
header(sum, 'A5:B5'); input(sum, 'B6:B8');
sum.getRange('B6:B7').setNumberFormat('0%'); sum.getRange('B8').setNumberFormat(money); sum.getRange('B9').setNumberFormat('yyyy-mm-dd');
sum.getRange('E5:E9').values = [['Criterios'], [cfg.fuente_iva], [cfg.nota_contingencia], ['Pendiente del equipo; tampoco conocemos inventario, donaciones ni préstamos.'], ['Azul: entrada. Verde: vínculo entre hojas. Negro: cálculo. Ámbar: falta información.']];
sum.getRange('E6:E9').format.rowHeight = 52;
sum.getRange('A11:C11').merge(); sum.getRange('A11').values = [['Los tres alcances son independientes. No sumar Madrid + Chiapas + Marte.']];
sum.getRange('A13:C13').values = [['Estado / importe en MXN', 'Madrid', 'Chiapas']]; header(sum, 'A13:C13');
sum.getRange('A14:A24').values = [
  ['Base conocida de reposición'], ['Partidas con coste calculable'], ['Partidas con coste pendiente'], ['Lista de materiales cerrada'], ['Base completa de reposición'], ['Contingencia de reposición'], ['Total de reposición'], ['Base de desembolso'], ['Contingencia de desembolso'], ['Total de desembolso'], ['Frente al límite del equipo']
];
sum.getRange('E14:E24').values = [
  ['Sólo líneas con cantidad, precio e IVA resueltos; excluye todas las pendientes.'], ['Cuenta líneas, no porcentaje monetario cubierto.'], ['Incluye fabricación, fletes, horas, tarifas o fiscalidad faltantes.'], ['Cambiar a Sí sólo tras cerrar alcance, cantidades y cotizaciones.'], ['Las cantidades aún son de planificación; no constituyen orden de compra.'], ['20% provisional; no sustituye faltantes. Ajustar con riesgos y evidencia.'], ['Coste de obtener todo el alcance, incluidos recursos cedidos.'], ['Según recurso por línea. Propio/donado/prestado/voluntario requieren confirmación sin pago.'], ['Reserva monetaria separada; no gasto realizado.'], ['Pendiente mientras falten precios, recursos o lista cerrada.'], ['Evalúa cada alcance por separado; no un programa conjunto.']
];
sum.getRange('A20:C20').format.borders = { preset: 'doubleBottom', style: 'thin', color: '#173C46' };
sum.getRange('A23:C23').format.font.bold = true;

const cat = sheets.Precios;
const catLast = 5 + cfg.precios.length;
style(cat, `A1:M${catLast}`, { A: 10, B: 33, C: 24, D: 26, E: 16, F: 12, G: 19, H: 12, I: 15, J: 18, K: 65, L: 72, M: 72 });
cat.getRange('A1:J1').merge();
cat.getRange('A1').values = [['Catálogo de referencias públicas']];
cat.getRange('A2:J2').merge(); cat.getRange('A2').values = [['Precio observado el 20 sep 2026. Existencia, plazo y entrega local deben confirmarse. Ninguna cotización formal.']];
cat.getRange('A3:J3').merge(); cat.getRange('A3').values = [['PR05 es alternativa, no se suma. Fiscalidad desconocida bloquea el precio final. El envío se cotiza por pedido en cada presupuesto.']];
cat.getRange('A5:M5').values = [['ID', 'Artículo', 'Proveedor', 'Modelo / SKU', 'Precio público', 'Moneda', 'IVA', 'Tasa si excl.', 'Consultado', 'Precio final', 'URL de la ficha', 'Condición / límite', 'Alternativa']]; header(cat, 'A5:M5');
cat.getRange(`A6:M${catLast}`).values = cfg.precios.map(p => [p.id,p.pieza,p.proveedor,p.sku,p.precio,cfg.moneda,p.iva,p.tasa,new Date(`${cfg.fecha_consulta}T12:00:00Z`),null,p.url,p.nota,p.alternativa]);
cat.getRange(`A6:M${catLast}`).format.rowHeight = 88;
cat.getRange(`E6:E${catLast}`).setNumberFormat(money); cat.getRange(`J6:J${catLast}`).setNumberFormat(money);
cat.getRange(`H6:H${catLast}`).setNumberFormat('0%'); cat.getRange(`I6:I${catLast}`).setNumberFormat('yyyy-mm-dd');
for (let r = 6; r <= catLast; r++) {
  if (cfg.precios[r-6].iva === 'Excluido') formula(cat, `H${r}`, '=Resumen!$B$6', true);
  formula(cat, `J${r}`, `=IF(OR(NOT(ISNUMBER(E${r})),E${r}<0,F${r}<>"MXN"),"Pendiente",IF(G${r}="Incluido",E${r},IF(AND(G${r}="Excluido",ISNUMBER(H${r}),H${r}>=0,H${r}<=1),ROUND(E${r}*(1+H${r}),2),"Pendiente")))`);
}
input(cat, `E6:G${catLast}`); missing(cat, `J6:J${catLast}`);
input(cat, `H7:H${catLast}`);
cat.getRange(`G6:G${catLast}`).dataValidation = { rule: { type: 'list', values: ['Incluido','Excluido','Por confirmar'] } };
cat.freezePanes.freezeRows(5); cat.freezePanes.freezeColumns(2);

const ends = {};
for (const [name, b] of Object.entries(cfg.presupuestos)) {
  const sh = sheets[name], last = 5 + b.partidas.length; ends[name] = last;
  style(sh, `A1:X${last}`, { A:10, B:32, C:12, D:10, E:13, F:17, G:18, H:17, I:18, J:12, K:65, L:26, M:24, N:28, O:65, P:15, Q:11, R:17, S:19, T:12, U:23, V:70, W:37, X:38 });
  sh.getRange('A1:I1').merge();
  sh.getRange('A1').values = [[`${name} · lista preliminar`]];
  sh.getRange('A2:I2').merge(); sh.getRange('A2').values = [[b.alcance]]; sh.getRange('A2:I2').format.rowHeight = 43;
  sh.getRange('A3:I3').merge(); sh.getRange('A3').values = [['Faltante = Pendiente, nunca cero. Para cotizaciones nuevas, registrar precio/IVA y fuente en Precios; K–X contienen especificaciones y trazabilidad.']]; sh.getRange('A3:I3').format.rowHeight = 40;
  sh.getRange('A5:X5').values = [['ID','Función','Grupo','Cantidad','Unidad','Precio final/u','Reposición MXN','Recurso','Desembolso MXN','ID precio','Especificación / condición','Pieza / plano / ensayo','Proveedor','Modelo / SKU','Fuente de precio','Fecha consulta','Moneda','Precio público/u','IVA','Tasa si excl.','Plazo','Alternativa','Base de cantidad','Estado de evidencia']]; header(sh, 'A5:X5');
  sh.getRange(`A6:X${last}`).values = b.partidas.map(p => [p[0],p[1],p[5],p[3],p[4],null,null,'Pendiente',null,p[2]||'',p[6],p[7],null,null,null,null,'MXN',null,null,null,'Por confirmar',null,'Escenario propuesto S4; no inventario',p[2]?'Precio público; no cotización':'Pendiente de cotizar']);
  sh.getRange(`A6:X${last}`).format.rowHeight = 78;
  for (let r=6;r<=last;r++) {
    const lookup = index => `IFERROR(VLOOKUP(J${r},Precios!$A$6:$M$${catLast},${index},FALSE),"Pendiente")`;
    formula(sh,`F${r}`,`=${lookup(10)}`,true);
    formula(sh,`G${r}`,`=IF(NOT(ISNUMBER(D${r})),"Pendiente",IF(D${r}<0,"Revisar",IF(D${r}=0,0,IF(ISNUMBER(F${r}),ROUND(D${r}*F${r},2),"Pendiente"))))`);
    formula(sh,`I${r}`,`=IF(NOT(ISNUMBER(D${r})),"Pendiente",IF(D${r}<0,"Revisar",IF(D${r}=0,0,IF(H${r}="Comprar",G${r},IF(OR(H${r}="Propio",H${r}="Donado",H${r}="Prestado",H${r}="Voluntario"),0,"Pendiente")))))`);
    for (const [col,index] of [['M',3],['N',4],['O',11],['P',9],['R',5],['S',7],['V',13]]) formula(sh,`${col}${r}`,`=${lookup(index)}`,true);
    // VLOOKUP convierte una celda vacía en 0; la tasa no usada permanece texto explícito.
    formula(sh,`T${r}`,`=IF(S${r}="Excluido",${lookup(8)},"No aplica")`,true);
  }
  for (const col of ['F','G','I','R']) sh.getRange(`${col}6:${col}${last}`).setNumberFormat(money);
  sh.getRange(`P6:P${last}`).setNumberFormat('yyyy-mm-dd'); sh.getRange(`T6:T${last}`).setNumberFormat('0%');
  sh.getRange(`H6:H${last}`).dataValidation = { rule: { type:'list', values:['Pendiente','Comprar','Propio','Donado','Prestado','Voluntario'] } };
  input(sh,`D6:D${last}`); input(sh,`H6:H${last}`); input(sh,`J6:J${last}`);
  missing(sh,`F6:I${last}`); sh.freezePanes.freezeRows(5); sh.freezePanes.freezeColumns(2);
  const col = name === 'Madrid' ? 'B':'C';
  formula(sum,`${col}14`,`=IF(COUNT(${name}!G6:G${last})=0,"Sin base",ROUND(SUM(${name}!G6:G${last}),2))`,true);
  formula(sum,`${col}15`,`=COUNT(${name}!G6:G${last})`,true);
  formula(sum,`${col}16`,`=${b.partidas.length}-${col}15`);
  sum.getRange(`${col}17`).values = [['No']]; input(sum,`${col}17`);
  sum.getRange(`${col}17`).dataValidation={rule:{type:'list',values:['No','Sí']}};
  formula(sum,`${col}18`,`=IF(AND(${col}16=0,${col}17="Sí"),ROUND(SUM(${name}!G6:G${last}),2),"Pendiente")`,true);
  formula(sum,`${col}19`,`=IF(AND(ISNUMBER(${col}18),ISNUMBER($B$7),$B$7>=0,$B$7<=1),ROUND(${col}18*$B$7,2),"Pendiente")`);
  formula(sum,`${col}20`,`=IF(AND(ISNUMBER(${col}18),ISNUMBER(${col}19)),ROUND(${col}18+${col}19,2),"Pendiente")`);
  formula(sum,`${col}21`,`=IF(AND(COUNT(${name}!I6:I${last})=${b.partidas.length},${col}17="Sí"),ROUND(SUM(${name}!I6:I${last}),2),"Pendiente")`,true);
  formula(sum,`${col}22`,`=IF(AND(ISNUMBER(${col}21),ISNUMBER($B$7),$B$7>=0,$B$7<=1),ROUND(${col}21*$B$7,2),"Pendiente")`);
  formula(sum,`${col}23`,`=IF(AND(ISNUMBER(${col}21),ISNUMBER(${col}22)),ROUND(${col}21+${col}22,2),"Pendiente")`);
  formula(sum,`${col}24`,`=IF(NOT(ISNUMBER($B$8)),"Sin límite",IF($B$8<0,"Revisar",IF(ISNUMBER(${col}23),IF(${col}23<=$B$8,"Dentro","Excede"),"Pendiente")))`);
  for (const row of [14,18,19,20,21,22,23]) sum.getRange(`${col}${row}`).setNumberFormat(money);
}
missing(sum,'B14:C24');
sum.getRange('A27:C27').merge(); sum.getRange('A27').values = [['Marte · presupuesto de recursos, sin precio de misión']]; header(sum,'A27:C27');
sum.getRange('A28:C30').merge(); sum.getRange('A28').values = [['La hoja Marte vincula masa, geometría y reactor a S3. Faltan masa de lanzamiento, potencia total, consumibles, integración y mantenimiento. No hay base para un total económico ni ROI.']];
sum.getRange('A32:C32').merge(); sum.getRange('A32').values = [['Siguiente: cotizaciones de fabricación y validación + inventario del equipo.']];
sum.getRange('A34:C36').merge(); sum.getRange('A34').values = [['Madrid manual: omitir grupos Motor y Agua sólo si se acepta perder automatización y demostración hidráulica. Chiapas: banco con agua limpia antes de cultivo. Alcances y límites en P4-PRESUPUESTO-CHIAPAS.md.']];

const mars = sheets.Marte;
const physical = [
  ['M01','Diámetro del casco',geo.casco.diametro,'m','Nominal digital','config/milpa360.geometria.json / casco','Acceso B19 abierto; no dimensión de fabricación'],
  ['M02','Cartuchos operativos',geo.anillo.n,'pieza','Decisión de arquitectura','geometria.json / anillo','Más repuestos; no sumar masas superpuestas'],
  ['M03','Área útil de cultivo',geo.areas.cultivo,'m²','Calculado','geometria.json / areas','Incluida en área total de sustrato'],
  ['M04','Masa móvil nominal',mec.mecanica.nominal.Marte.masa_kg,'kg','Calculado con supuestos','mecanica.json / nominal / Marte','Incluye M05, taras, anillo y fluidos; no masa lanzada'],
  ['M05','Sustrato incluido en M04',mec.mecanica.nominal.Marte.masa_sustrato_kg,'kg','Calculado con supuestos','mecanica.json / nominal / Marte','Obtención in situ requiere extracción y tratamiento'],
  ['M06','Digestor útil nominal',mec.reactores.nominal.volumen_util_m3*1000,'L','Hipótesis de dimensionado','mecanica.json / reactores / nominal','ST/HRT sin ensayo; no volumen total del sistema'],
  ['M07','Digestor total nominal',mec.reactores.nominal.volumen_total_m3*1000,'L','Hipótesis de dimensionado','mecanica.json / reactores / nominal','Contiene M06; no sumar ambos'],
  ['M08','Horizonte de dimensionado',params.parametros.mision.horizonte_diseno_superficie.valor,'d terrestres','Escenario; B10 abierto','milpa360.parameters.json / mision','No duración obligatoria en superficie'],
  ['M09','Masa seca lanzada',null,'kg','Pendiente','B15–B18','Materiales, equipos, embalaje y repuestos'],
  ['M10','Potencia eléctrica pico total',null,'kW','Pendiente','P1/P4','Luces + térmica + auxiliares simultáneos'],
  ['M11','Energía eléctrica total por sol',null,'kWh/sol','Pendiente','P1/P4','Convertir día/sol; iluminación sola no es total'],
  ['M12','Salmuera y reservas de agua',null,'L','Pendiente','B15–B18','Balance, purgas, aislamiento y tratamiento'],
  ['M13','Consumibles y repuestos de misión',null,'kg','Pendiente','P1/P4','Alimento externo, arranque, pérdidas y fallos'],
  ['M14','Trabajo de operación/mantenimiento',null,'h','Pendiente','E1–E4','No extrapolar tarifa/hora de ISS'],
  ['M15','Diseño, integración y validación',null,'MXN','Pendiente de alcance','MISION §L','No extrapolar componentes comerciales a vuelo'],
  ['M16','Lanzamiento, crucero, EDL y retorno',null,'MXN','Pendiente de alcance','MISION §L','Sin proveedor, masa ni contrato; no tarifa ficticia/kg'],
  ['M17','Coste de misión completo',null,'MXN','No estimable todavía','MISION §L','No se suman magnitudes de distinta unidad ni partidas incompletas']
];
style(mars,'A1:G22',{A:10,B:40,C:19,D:19,E:34,F:55,G:65});
mars.getRange('A1:E1').merge();
mars.getRange('A1').values = [['Marte · recursos y brechas']];
mars.getRange('A2:E2').merge(); mars.getRange('A2').values = [[`Generado desde ${mec.version}. Sin componentes aptos para vuelo seleccionados ni coste de misión defendible.`]];
mars.getRange('A3:E3').merge(); mars.getRange('A3').values = [['M04 contiene M05; M07 contiene M06. Se muestran desgloses, no partidas aditivas. Ningún dato es medición propia.']];
mars.getRange('A2:E3').format.rowHeight=40;
mars.getRange('A5:G5').values = [['ID','Recurso','Valor','Unidad','Evidencia','Fuente local','Límite / dato faltante']]; header(mars,'A5:G5');
mars.getRange('A6:G22').values = physical.map(r=>r.map(v=>v===null?pending:v)); mars.getRange('A6:G22').format.rowHeight=52;
mars.getRange('C6:C22').setNumberFormat('#,##0.00'); missing(mars,'C6:C22'); mars.freezePanes.freezeRows(5);

// Comprobación financiera: aritmética independiente y cambios vivos sobre las fórmulas.
await wb.recalculate();
const value=(sh,cell)=>sheets[sh].getRange(cell).values[0][0];
assert.equal(value('Precios','J6'),346.84);
assert.equal(value('Madrid','G6'),693.68);
assert.equal(value('Resumen','B14'),1050.96);
assert.equal(value('Resumen','C14'),139.2);
assert.equal(value('Resumen','B20'),pending);
assert.equal(value('Resumen','C23'),pending);
assert.equal(value('Madrid','I6'),pending);
sheets.Madrid.getRange('H6').values=[['Comprar']]; assert.equal(value('Madrid','I6'),693.68);
sheets.Madrid.getRange('H6').values=[['Propio']]; assert.equal(value('Madrid','I6'),0); assert.equal(value('Madrid','G6'),693.68);
sheets.Madrid.getRange('D6').values=[[0]]; assert.equal(value('Madrid','G6'),0);
sheets.Madrid.getRange('D6').values=[[-1]]; assert.equal(value('Madrid','G6'),'Revisar');
sheets.Madrid.getRange('D6').values=[[null]]; assert.equal(value('Madrid','G6'),pending);
sheets.Madrid.getRange('D6').values=[[2]]; sheets.Madrid.getRange('H6').values=[[pending]];
cat.getRange('E6').values=[[null]]; assert.equal(value('Madrid','G6'),pending);
cat.getRange('E6').values=[[299]]; cat.getRange('G6').values=[['Incluido']]; assert.equal(value('Madrid','G6'),598);
cat.getRange('G6').values=[['Por confirmar']]; assert.equal(value('Madrid','G6'),pending);
cat.getRange('G6').values=[['Excluido']];
sum.getRange('B7').values=[[null]]; assert.equal(value('Resumen','B19'),pending); sum.getRange('B7').values=[[cfg.contingencia]];
// Caso completo temporal: sólo PLA comprado; todas las otras partidas excluidas explícitamente.
const savedQty=sheets.Madrid.getRange(`D6:D${ends.Madrid}`).values;
for (let r=7;r<=ends.Madrid;r++) sheets.Madrid.getRange(`D${r}`).values=[[0]];
sheets.Madrid.getRange('H6').values=[['Comprar']]; sum.getRange('B17').values=[['Sí']];
assert.equal(value('Resumen','B18'),693.68); assert.equal(value('Resumen','B19'),138.74);
assert.equal(value('Resumen','B20'),832.42); assert.equal(value('Resumen','B23'),832.42);
sum.getRange('B8').values=[[0]]; assert.equal(value('Resumen','B24'),'Excede');
sum.getRange('B8').values=[[1000]]; assert.equal(value('Resumen','B24'),'Dentro');
sum.getRange('B7').values=[[null]]; assert.equal(value('Resumen','B23'),pending);
sum.getRange('B7').values=[[cfg.contingencia]]; sum.getRange('B8').values=[[cfg.limite_equipo_mxn]];
sum.getRange('B17').values=[['No']]; sheets.Madrid.getRange(`D6:D${ends.Madrid}`).values=savedQty;
sheets.Madrid.getRange('H6').values=[[pending]];
await wb.recalculate();
assert.equal(value('Resumen','B14'),1050.96); assert.equal(value('Resumen','B20'),pending);
console.log((await wb.inspect({kind:'region',sheetId:'Resumen',range:'A13:C24',maxChars:3800,tableMaxRows:12,tableMaxCols:3})).ndjson);
const errors=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:100},maxChars:2000});
console.log(errors.ndjson);
// Inspección de valores completa; marcadores Pendiente son intencionales.
for (const [name,sh] of Object.entries(sheets)) {
  const values=sh.getUsedRange().values.flat();
  assert(!values.some(v=>typeof v==='string' && /^#(REF!|DIV\/0!|VALUE!|NAME\?|N\/A|NUM!|NULL!|SPILL!|CALC!)/.test(v)),`${name}: error de fórmula`);
}
await fs.mkdir(outDir,{recursive:true}); await fs.mkdir(previewDir,{recursive:true});
for (const [name,range,suffix=''] of [['Resumen','A1:C36'],['Resumen','E5:E24','-notas'],['Madrid','A1:I14'],['Madrid','K5:P11','-detalle'],['Chiapas','A1:I14'],['Marte','A1:E22'],['Precios','A1:J13'],['Precios','K5:M13','-fuentes']]) {
  const blob=await wb.render({sheetName:name,range,scale:1,format:'png'});
  await fs.writeFile(`${previewDir}/${name}${suffix}.png`,new Uint8Array(await blob.arrayBuffer()));
}
const output=await SpreadsheetFile.exportXlsx(wb);
await output.save(`${outDir}/PRESUPUESTOS-MILPA360-S4.xlsx`);
console.log(`S4: controles de IVA, vacíos, cero, negativos y recursos OK. XLSX: ${outDir}/PRESUPUESTOS-MILPA360-S4.xlsx`);
