/* S3: comprobar las extrusiones reales de Three, no una fórmula duplicada. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const raiz=path.resolve(__dirname,'..');
const T=require(path.join(raiz,'prototipo-3d/vendor/three.min.js'));
const html=fs.readFileSync(path.join(raiz,'prototipo-3d/milpa360-simulador.html'),'utf8');
const caja={T};
for(const nombre of ['geoSector','geoMarco']) {
  const codigo=html.match(new RegExp('function '+nombre+'\\([^]*?^}', 'm'));
  assert.ok(codigo, nombre+' debe existir en la escena');
  vm.runInNewContext(codigo[0],caja);
}
for(const g of [caja.geoSector(1,2,0.3,0.22),caja.geoMarco(1,2,0.3,0.28,0.03)]) {
  g.computeBoundingBox();
  assert.ok(Math.abs(g.boundingBox.min.y)<1e-6,'La extrusión debe comenzar en y=0, no a una altura adicional');
  assert.ok(Math.abs(g.boundingBox.max.y-g.parameters.options.depth)<1e-6,'Altura de extrusión incorrecta');
  g.dispose();
}
const cfg=JSON.parse(fs.readFileSync(path.join(raiz,'config/milpa360.parameters.json'))).parametros;
assert.ok(cfg.geometria_actual.altura_piso.valor<cfg.geometria_actual.altura_cubierta.valor,'Piso transitable y cama son cotas distintas');
const d=require(path.join(raiz,'prototipo-3d/milpa360-datos.js')).geometria;
const reborde=cfg.arquitectura_b.reborde_cartucho?.valor??0.035;
const r0=d.anillo.r0+reborde,r1=d.anillo.r1-reborde;
const ang=d.anillo.sector_grados*Math.PI/180-2*reborde/((d.anillo.r0+d.anillo.r1)/2);
const suelo=caja.geoSector(r0,r1,ang,0.22);
const pos=suelo.attributes.position;let area=0;
for(let i=0;i<pos.count;i+=3){
 if([0,1,2].every(j=>Math.abs(pos.getY(i+j)-0.22)<1e-6)){
   area+=Math.abs((pos.getX(i+1)-pos.getX(i))*(pos.getZ(i+2)-pos.getZ(i))-(pos.getZ(i+1)-pos.getZ(i))*(pos.getX(i+2)-pos.getX(i)))/2;
 }
}
assert.ok(Math.abs(area-d.cartucho.area)<1e-4,'El área del suelo dibujado no coincide con la usada en masa/alimento');
console.log('S3: extrusiones de Three y separación de cotas verificadas.');
