// Deck editable S5. Runtime @oai/artifact-tool ya instalado; no dependencias nuevas.
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createRequire} from 'node:module';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const runtime='/home/aldo/.cache/codex-runtimes/codex-primary-runtime/dependencies';
process.env.RUNTIME_NODE_MODULES=runtime+'/node/node_modules';
const skill='/home/aldo/.codex/plugins/cache/openai-primary-runtime/presentations/26.909.12148/skills/presentations';
const {Presentation,PresentationFile}=await import(pathToFileURL(runtime+'/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs'));
const {finalizePresentation,resolvePresentationFont}=await import(pathToFileURL(skill+'/container_tools/artifact_tool_utils.mjs'));
const out=path.join(root,'outputs/madrid-s5'),tmp=path.join(root,'tmp/madrid-s5/deck');
await fs.mkdir(tmp,{recursive:true});await fs.mkdir(out+'/diapositivas',{recursive:true});
for(const f of ['Bodoni Moda','Archivo','IBM Plex Mono'])resolvePresentationFont({fontFamily:f});
const d=createRequire(import.meta.url)(root+'/prototipo-3d/milpa360-datos.js');
const memory=await fs.readFile(root+'/docs/madrid/P5-DEFENSA.md','utf8');
const notes=memory.split('## 8. Guion')[1].split('## 9.')[0].split(/### /).slice(1);
const p=Presentation.create({slideSize:{width:1280,height:720}});
const C={bg:'#0B171D',ink:'#EDF0E9',muted:'#A7BDC3',rust:'#E89D64',green:'#A8C98C'};
function text(s,content,x,y,w,h,size=28,font='Archivo',color=C.ink){
  const b=s.shapes.add({geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
  b.text=content;b.text.style={typeface:font,fontSize:size,color,autoFit:'none'};return b;
}
function slide(title,i,source){
  const s=p.slides.add();s.background.fill=C.bg;
  text(s,'BIOMARS CHIAPAS / MADRID · S5',56,26,900,24,16,'IBM Plex Mono',C.muted);
  text(s,title,56,74,1170,90,54,'Bodoni Moda');
  text(s,String(i).padStart(2,'0')+' / 09',1110,663,115,30,17,'IBM Plex Mono',C.muted);
  text(s,'Concepto y cálculo · sin validación física',56,663,940,30,17,'Archivo',C.muted);
  s.speakerNotes.textFrame.setText((notes[i-1]||'')+'\n\nTrazabilidad: '+source+'\nRevisión base P4-S3-2026-09-20; capturas S5. B15-B19 abiertos.');
  return s;
}
async function photo(s,name,x,y,w,h){
  const file=name==='blender'?out+'/blender-S5.png':root+'/docs/madrid/capturas/'+name+'.png';
  s.images.add({blob:new Uint8Array(await fs.readFile(file)),contentType:'image/png',alt:'Render digital MILPA-360; no fotografía de prototipo',fit:'contain',position:{left:x,top:y,width:w,height:h}});
}
let s=slide('MILPA-360',1,'P5-DEFENSA.md §1; captura hero, escena nominal S5');
text(s,'Sustrato en movimiento',56,177,430,100,38,'Archivo',C.green);
text(s,'Recuperación de sustrato\nResiduos animales\nCultivo complementario',56,304,390,180,27);
text(s,'Aldo Fabio Contreras Marroquín\nEquipo BioMars Chiapas',56,550,500,70,21,'Archivo',C.muted);
await photo(s,'hero',470,170,760,455);
s=slide('Procesos conectados y separados',2,'Matriz RU, P1 D3–D5, P5 §2/4; P05-procesos S5');
text(s,'Animal → residuo → cultivo',56,189,1140,55,34,'Archivo',C.green);
text(s,'Salmuera: reactor separado\nDigestato: retención y análisis\nLiberación: autorización del lote',56,280,555,200,30);
text(s,'El requisito de 100%\nsigue sin demostrarse.',56,540,500,70,26,'Archivo',C.rust);
await photo(s,'nucleo',655,230,570,390);
s=slide('Veinte cartuchos, una trayectoria',3,'parameters.json; milpa360_p2.py; milpa360_p4.py; P5 §3');
text(s,'20',56,180,220,125,92,'Bodoni Moda',C.green);
text(s,'8 regeneración + 12 cultivo',56,304,495,60,29);
text(s,`${d.geometria.areas.cultivo.toFixed(3)} m² útiles de cultivo\nØ ${d.geometria.casco.diametro.toFixed(2)} m nominal\n≈1.98 t de masa móvil`,56,398,510,150,30);
text(s,'Entrada / evacuación pendiente',56,585,650,45,26,'Archivo',C.rust);
await photo(s,'planta',650,177,575,455);
s=slide('Cada lote conserva su historia',4,'milpa360-modelo.js; verificar_p3.cjs; P5 §5; captura tormenta');
text(s,'Tratamiento → muestra → decisión',56,187,1150,65,35,'Archivo',C.green);
text(s,'Sin análisis: retención\nFallo: daño persistente\nReemplazo: recursos limitados',56,294,580,180,30);
text(s,'Respuesta biológica ilustrativa.\nEl control no es un análisis químico.',56,552,590,70,24,'Archivo',C.rust);
await photo(s,'tormenta',665,255,560,355);
s=slide('Alimento complementario, energía externa',5,'milpa360_p1.py; MILPA_DATOS.balance; P5 §4, fuentes BVAD/USDA/PMC');
text(s,(d.balance.cobertura_kcal*100).toFixed(2)+'%',56,182,410,140,108,'Bodoni Moda',C.green);
text(s,'de las kcal de seis personas',56,330,560,50,30);
text(s,Math.round(d.balance.kcal_total)+' kcal/d entre huevo y vegetales\n0.7704 kg/d de ración animal importada',56,409,600,110,26);
text(s,d.balance.luz_kwh.toFixed(2)+' kWh eléctricos/d',719,205,510,65,34);
text(s,'Sólo iluminación',719,280,500,45,26,'Archivo',C.muted);
text(s,d.balance.biogas_kwh_quimico.toFixed(3)+' kWh químicos/d',719,389,510,65,34,'Archivo',C.rust);
text(s,'Biogás antes de conversión',719,466,500,50,26,'Archivo',C.muted);
text(s,'Régimen supuesto; arranque, fallos, auxiliares y térmica por cerrar.',56,581,1130,55,24,'Archivo',C.rust);
s=slide('Evidencia disponible',6,'Pruebas P1/P2/P3/P4; VERIFICACION-BLENDER.json; ensayos CSV sin mediciones');
text(s,'Verificado digitalmente',56,196,570,50,33,'Archivo',C.green);
text(s,'Cálculos y geometría\nEstado reproducible\nDemo sin Internet',56,279,550,160,30);
text(s,'Pendiente: carga real, acceso,\nagua medida e inocuidad.',56,535,580,90,27,'Archivo',C.rust);
await photo(s,'blender',670,181,555,450);
s=slide('Un piloto acotado en Tuxtla',7,'P4-PRESUPUESTO-CHIAPAS.md; protocolo exploratorio, sitio y operador pendientes');
text(s,'6 recipientes / 3 pares independientes',56,195,1180,65,42,'Archivo',C.green);
text(s,'Riego manual',56,305,530,65,38);
text(s,'Goteo + aislamiento',674,305,550,65,38);
text(s,'Misma especie, sustrato y condiciones comparables',56,399,1120,65,29,'Archivo',C.muted);
text(s,'Medir agua nueva/kg utilizable, tiempo y energía.',56,483,1140,65,31);
text(s,'Sitio, operador, línea base y resultados pendientes.',56,583,1130,55,26,'Archivo',C.rust);
s=slide('Costes separados por alcance',8,'P4 presupuesto S4; XLSX con fórmulas. No precio total ni cotización formal.');
const rows=[['Alcance','Disponibilidad','Brecha'],['Maqueta Madrid','19 partidas preliminares','Fabricación y recursos'],['Piloto Chiapas','20 partidas preliminares','Sitio, análisis y operación'],['Concepto marciano','Recursos dimensionales','Integración y ciclo de vida']];
const tab=s.tables.add({rows:4,columns:3,left:56,top:200,width:1168,height:315,columnWidths:[355,410,403],values:rows});
for(let r=0;r<4;r++)for(let c=0;c<3;c++){
 const cell=tab.getCell(r,c);cell.fill=r===0?'#23404A':C.bg;cell.text.style={typeface:'Archivo',fontSize:25,color:r===0?C.green:C.ink};
}
text(s,'Precios públicos parciales. Total de compra pendiente.',56,570,1140,65,28,'Archivo',C.rust);
s=slide('La siguiente demostración',9,'P4 protocolos E1–E4; P5 §3/6; hipótesis, sin patente ni ensayos concluidos');
text(s,'Acceso y extracción practicables\nIndexado con carga medida\nRiego e aislamiento verificables',56,211,1120,230,38,'Archivo',C.green);
text(s,'Comparar el carrusel con una solución más simple.\nDecidir con mediciones y conservar los límites visibles.',56,509,1140,108,30);

const candidate=tmp+'/candidate.pptx';await(await PresentationFile.exportPptx(p)).save(candidate);
const final=out+'/DECK-MILPA360-S5.pptx';
const receipt=tmp+'/validacion-'+Date.now()+'.json';
// Finalizer no sobrescribe: se reemplaza únicamente un artefacto generado por este script.
try{await fs.rename(final,tmp+'/anterior.pptx');}catch(e){if(e.code!=='ENOENT')throw e;}
await finalizePresentation({workspaceDir:root,candidatePath:candidate,finalPath:final,
 pythonExecutable:runtime+'/python/bin/python',integrityValidatorPath:skill+'/container_tools/inspect_presentation_package_integrity.py',
 layoutValidatorPath:skill+'/container_tools/inspect_presentation_layout_geometry.py',layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit','--require-native-table-slide','8'],
 explicitTotalSlideCount:9,requiredNativeTableOwnerSlides:[8],fontPolicy:{basis:'user_request',families:['Bodoni Moda','Archivo','IBM Plex Mono']},
 verifyArtifactToolImport:true,receiptPath:receipt});
await fs.copyFile(receipt,out+'/VERIFICACION-DECK.json');
for(let i=0;i<p.slides.items.length;i++){
 const slide=p.slides.items[i];const png=await p.export({slide,format:'png',scale:1});
 await fs.writeFile(out+'/diapositivas/'+String(i+1).padStart(2,'0')+'.png',new Uint8Array(await png.arrayBuffer()));
}
console.log('Deck S5: 9 láminas editables, notas con guion y fuentes, finalizador ejecutado.');
