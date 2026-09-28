import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';

const require=createRequire(import.meta.url),T=require('../prototipo-3d/vendor/three.min.js');
const html=readFileSync(new URL('../prototipo-3d/milpa360-simulador.html',import.meta.url),'utf8');
const filtro=html.match(/const VFX_ACTIVOS=([\s\S]*?);/)[1];
assert(html.includes("const Y_RAMAL = CUBIERTA + (VFX_ACTIVOS.includes('gotas')?0.060:0.015)"),'altura visual sólo con gotas');
const activos=q=>vm.runInNewContext(`const VFX_ACTIVOS=${filtro}; VFX_ACTIVOS`,{Q:new URLSearchParams(q)});
assert.deepEqual(Array.from(activos('')),['gotas','lamparas','burbujas','polvo','hojas','leds']);
assert.deepEqual(Array.from(activos('vfx=0')),[]);
assert.deepEqual(Array.from(activos('vfx=lamparas,otro')),['lamparas']);
assert.deepEqual(Array.from(activos('vfx=otro')),[]);
for(const nombre of ['gotas','lamparas','burbujas','polvo','hojas','leds'])
  assert.deepEqual(Array.from(activos(`vfx=${nombre}`)),[nombre]);

const contexto={THREE:T,window:{MILPA_PBR:{}}};vm.createContext(contexto);
vm.runInContext(readFileSync(new URL('../prototipo-3d/milpa360-visual.js',import.meta.url),'utf8'),contexto);
const crear=contexto.window.MILPA_VISUAL.efectosV12;
const geom=JSON.parse(html.match(/const GEOM = (\{[^\n]+\});/)[1]);
const N_POS=geom.anillo.n,N_REG=geom.ciclo.n_regeneracion,TAU=Math.PI*2,R0=geom.anillo.r0,R1=geom.anillo.r1,
  Y_SUELO=geom.casco.cubierta-.03,HONDO=geom.cartucho.profundidad_sustrato,reborde=geom.cartucho.reborde,
  anguloSuelo=TAU/N_POS*geom.anillo.holgura_angular-2*reborde/((R0+R1)/2);
const inicioSector=html.indexOf('function geoSector('),finSector=html.indexOf('/* marco de sector:',inicioSector);
const geoSector=vm.runInNewContext(`(${html.slice(inicioSector,finSector)})`,{T});
const suelo=geoSector(R0+reborde,R1-reborde,anguloSuelo,HONDO);
suelo.computeBoundingBox();assert(Math.abs(suelo.boundingBox.max.y-HONDO)<1e-7,'cara superior coincide con máscara de humedad');
const gHabitat=new T.Group(),carrusel={grupo:new T.Group()},bandejas=[],goteros=[];
gHabitat.add(carrusel.grupo);
for(let i=0;i<N_POS;i++){
  const g=new T.Group();g.rotation.y=-i/N_POS*TAU;carrusel.grupo.add(g);
  const sustrato=new T.Mesh(suelo,new T.MeshStandardMaterial());sustrato.position.y=Y_SUELO-HONDO;g.add(sustrato);
  bandejas.push({g,sustrato,plantas:new T.Group()});
  goteros.push({x:R0+.16,z:-.13,y0:.645},{x:R1-.16,z:.13,y0:.645});
}
const hojaMat=new T.MeshStandardMaterial({color:0x47783a,map:new T.Texture(),bumpMap:new T.Texture(),side:T.DoubleSide});
const hoja=new T.Mesh(new T.PlaneGeometry(.08,.12),hojaMat);bandejas[0].plantas.add(hoja);
const loteHojas=new T.InstancedMesh(hoja.geometry,hojaMat.clone(),2);loteHojas.name='vegetacion-instanciada';carrusel.grupo.add(loteHojas);
const lamparas=Array.from({length:6},(_,k)=>({angulo:(N_REG+k*11/5)/N_POS*TAU,y:1.56}));
const opciones={activos:['gotas','lamparas'],carrusel,bandejas,gHabitat,goteros,lamparas,N_REG,N_POS,
  Y_SUELO,HONDO,R0,R1,reborde,anguloSuelo,TAU};
const vfx=crear(opciones);
for(const archivo of ['milpa360-datos.js','milpa360-modelo.js'])
  vm.runInContext(readFileSync(new URL('../prototipo-3d/'+archivo,import.meta.url),'utf8'),contexto);
const modelo=vm.runInContext('new MILPA.Modelo(MILPA_DATOS,{autorizacionesIlustrativas:true})',contexto);
vfx.actualizar(.05,modelo.estado,-1,false,0,false);
assert.equal(vfx.instancias.gotas,72,'carga normal sol 0: gotas activas con el modelo real');
assert.equal(vfx.instancias.impactos,24,'carga normal sol 0: impactos activos con el modelo real');
const estado={lotes:Array.from({length:N_POS},(_,i)=>({pos:i,cultivos:[{activa:i>=N_REG}]})),bomba:false,luz:1,tormenta:0};
vfx.actualizar(.05,estado,-1,false,0,false);
assert.deepEqual({...vfx.instancias},{gotas:72,impactos:24,haces:6,pools:12,halos:6,burbujas:0,polvo:0,leds:0,gotasInspeccion:0,impactosInspeccion:0});
assert.equal(vfx.calls,5);assert(vfx.calls<=vfx.maxCalls);
assert.equal(gHabitat.children.filter(o=>o.isLight).length,0);
const gotas=carrusel.grupo.children.find(o=>o.isInstancedMesh&&o.count===72);
assert(gotas);assert.equal(gotas.geometry.parameters.radius,.009);
assert.equal(gotas.material.blending,T.AdditiveBlending,'gota aditiva: legible aunque sea sub-píxel');
const m=new T.Matrix4(),esperado=new T.Vector3(goteros[16].x,Y_SUELO,goteros[16].z);
bandejas[8].g.updateMatrix();esperado.applyMatrix4(bandejas[8].g.matrix);
gotas.getMatrixAt(0,m);const centro=new T.Vector3().setFromMatrixPosition(m);
assert(centro.distanceTo(esperado)<1e-6,'gota coincide con gotero girado');
const ry=gotas.geometry.parameters.radius*1.25,inicio=gotas.material.uniforms.uInicio.value;
assert(Math.abs(Y_SUELO+inicio+ry-goteros[0].y0)<1e-6,'extremo superior bajo boquilla');
assert(inicio-ry>.03,'caída visible supera 3 cm');
assert(gotas.material.vertexShader.includes(`mix(uInicio,${ry.toFixed(6)},viaje)`),'gota termina sobre sustrato (radio*1.25)');
for(let t=0;t<1;t+=.01){let visibles=0;for(let k=0;k<3;k++)if((t+k/3)%1<.94)visibles++;
  assert(visibles>=2,'dos gotas visibles por gotero');}
const impacto=carrusel.grupo.children.find(o=>o.isInstancedMesh&&o.count===24);
assert(impacto.material.vertexShader.includes('fase*3.-.64'));
const fase=.23,tLlegada=(.88-fase)/.48;
assert(Math.abs((tLlegada*1.44+fase*3-.64)%1)<1e-9,'impacto inicia al llegar la gota');
assert(Math.abs(.13*.5*.72-.0468)<.001,'anillo alcanza radio ~4.7 cm');
const t0=gotas.material.uniforms.uTiempo.value;
vfx.actualizar(.05,estado,-1,false,0,true);
assert.equal(gotas.material.uniforms.uTiempo.value,t0,'reduced congela reloj');
assert.equal(bandejas[8].sustrato.material.userData.humedad.value,1);
estado.tormenta=1;vfx.actualizar(.05,estado,-1,false,0,false);
assert.equal(gotas.count,72,'tormenta no apaga goteo');
estado.bomba=true;vfx.actualizar(.05,estado,-1,false,0,false);
assert.equal(gotas.count,0);assert.equal(bandejas[8].sustrato.material.userData.humedad.value,1);
estado.bomba=false;estado.lotes[8].cultivos[0].activa=false;
vfx.actualizar(.05,estado,-1,false,0,false);assert.equal(gotas.count,66,'sin planta no riega');
estado.lotes[8].cultivos[0].activa=true;estado.lotes[0].pos=8;estado.lotes[0].cultivos[0].activa=true;
estado.lotes[8].pos=0;vfx.actualizar(.05,estado,0,false,0,false);
assert.equal(gotas.count,66,'cartucho extraído omite gotas');
assert.equal(bandejas[0].sustrato.material.userData.humedad.value,1,'humedad sigue la pieza');
gHabitat.visible=false;assert.equal(vfx.calls,0);gHabitat.visible=true;
const material=bandejas[0].sustrato.material;
const shader={uniforms:{},vertexShader:'#include <common>\n#include <begin_vertex>',
  fragmentShader:'#include <common>\n#include <color_fragment>\n#include <roughnessmap_fragment>'};
material.onBeforeCompile(shader);
assert(shader.fragmentShader.includes('diffuseColor.rgb*=mix(1.,.45,humedadLocal)'));
assert(shader.fragmentShader.includes('roughnessFactor=mix(roughnessFactor,.20,humedadLocal)'));
assert(shader.fragmentShader.includes('vSueloLocal.y')&&shader.fragmentShader.includes('uGota1'));
assert.equal(shader.uniforms.uHumedad,material.userData.humedad);
assert.equal(shader.uniforms.uPulsoHumedad.value,1);
estado.bomba=true;vfx.actualizar(.05,estado,0,false,0,false);
assert.equal(shader.uniforms.uPulsoHumedad.value,0,'fallo de bomba detiene pulso');
estado.bomba=false;vfx.actualizar(.05,estado,0,false,0,true);
assert.equal(shader.uniforms.uPulsoHumedad.value,0,'movimiento reducido detiene pulso');
const real=()=>({uniforms:{},vertexShader:T.ShaderLib.standard.vertexShader,fragmentShader:T.ShaderLib.standard.fragmentShader});
for(const [mat,instancia] of [[material,false],[hoja.material,false],[loteHojas.material,true]]){
  const sh=real();mat.onBeforeCompile(sh);
  assert(sh.vertexShader.includes('vVfxWorld=')&&sh.fragmentShader.includes('outgoingLight+='));
  if(instancia)assert(sh.vertexShader.includes('instanceMatrix*vVfxLocal'));
  if(mat===material)assert(sh.fragmentShader.includes('mascaraHumedad()'),'humedad y lámparas compuestas');
  assert.equal(sh.uniforms.uLamparas.value.length,6);
}
assert(!hoja.material.onBeforeCompile.toString().includes('roughnessFactor='),'hoja conserva material propio');
estado.lotes[0].pos=8;estado.lotes[0].cultivos[0].activa=true;estado.lotes[8].pos=0;
const pivote=new T.Group();gHabitat.add(pivote);pivote.position.set(.3,.8,-.2);pivote.rotation.y=.4;pivote.scale.setScalar(1.7);
pivote.attach(bandejas[0].g);vfx.actualizar(.05,estado,0,false,0,false);
const auxiliar=gHabitat.children.find(o=>o.isGroup&&o.renderOrder===5);
const gotasExtra=auxiliar.children[0],impactosExtra=auxiliar.children[1];
assert.equal(gotasExtra.count,6);assert.equal(impactosExtra.count,2);
assert.equal(vfx.instancias.gotasInspeccion,6);assert.equal(vfx.instancias.impactosInspeccion,2);
assert.equal(vfx.calls,7);
gotasExtra.getMatrixAt(0,m);bandejas[0].g.updateWorldMatrix(true,false);gHabitat.updateWorldMatrix(true,false);
const centroExtra=new T.Vector3().setFromMatrixPosition(m).applyMatrix4(gHabitat.matrixWorld);
const esperadoExtra=new T.Vector3(goteros[0].x,Y_SUELO,goteros[0].z).applyMatrix4(bandejas[0].g.matrixWorld);
assert(centroExtra.distanceTo(esperadoExtra)<1e-6,'gota de inspección sigue matriz completa');
assert.equal(gotasExtra.parent.renderOrder,5,'lote auxiliar sobre fondo de inspección');
const versionQuieto=gotasExtra.instanceMatrix.version;
vfx.actualizar(.05,estado,0,false,0,false);
assert.equal(gotasExtra.instanceMatrix.version,versionQuieto,'pieza quieta no reenvía matrices de goteo');
pivote.position.x+=.01;vfx.actualizar(.05,estado,0,false,0,false);
assert.equal(gotasExtra.instanceMatrix.version,versionQuieto+1,'goteo sigue una pieza que se mueve');
pivote.position.x-=.01;vfx.actualizar(.05,estado,0,false,0,false);
assert.equal(bandejas[0].g.parent,pivote,'efecto no altera parentesco de la pieza');
// Regresión: cualquier cartucho de cultivo, no sólo el 0, conserva su goteo al inspeccionarlo.
const estadoGuardado=structuredClone(estado);
carrusel.grupo.attach(bandejas[0].g);
gHabitat.position.set(-.4,.2,.7);gHabitat.rotation.set(.1,-.3,.2);gHabitat.scale.setScalar(.9);
carrusel.grupo.rotation.y=.8;
pivote.rotation.set(.3,.4,-.2);
for(let i=0;i<N_POS;i++){
  estado.lotes=Array.from({length:N_POS},(_,j)=>({pos:j,cultivos:[{activa:j===i}]}));
  if(i<N_REG){estado.lotes[i].pos=N_REG;estado.lotes[N_REG].pos=i;}
  const pieza=bandejas[i].g,original={pos:pieza.position.clone(),quat:pieza.quaternion.clone(),esc:pieza.scale.clone()};
  pivote.attach(pieza);
  vfx.actualizar(.05,estado,i,false,0,false);
  assert.equal(gotasExtra.count,6,`cartucho ${i}: gotas de inspección`);
  assert.equal(impactosExtra.count,2,`cartucho ${i}: impactos de inspección`);
  assert.equal(gotas.count,0,'la pieza extraída no duplica agua en el carrusel');
  const enHab=new T.Matrix4().copy(gHabitat.matrixWorld).invert().multiply(pieza.matrixWorld);
  for(let j=0;j<2;j++){
    const gt=goteros[i*2+j],fase=((i*2+j)*.61803398875)%1;
    for(const [mesh,n,local] of [
      [gotasExtra,j*3,new T.Matrix4().makeTranslation(gt.x,Y_SUELO,gt.z)],
      [impactosExtra,j,new T.Matrix4().makeRotationX(-Math.PI/2).setPosition(gt.x,Y_SUELO+.0007,gt.z).scale(new T.Vector3(.13,.13,1))]
    ]){
      mesh.getMatrixAt(n,m);const exp=enHab.clone().multiply(local);
      assert(m.elements.every((v,k)=>Math.abs(v-exp.elements[k])<2e-6),`cartucho ${i}: matriz completa`);
      assert(Math.abs(mesh.geometry.attributes.fase.getX(n)-fase)<1e-6,'fase conserva el gotero de origen');
    }
  }
  estado.bomba=true;vfx.actualizar(.05,estado,i,false,0,false);
  assert.equal(gotasExtra.count+impactosExtra.count,0,'bomba averiada apaga inspección');
  estado.bomba=false;estado.lotes[i].cultivos[0].activa=false;vfx.actualizar(.05,estado,i,false,0,false);
  assert.equal(gotasExtra.count+impactosExtra.count,0,'sin cultivo no riega en inspección');
  estado.lotes[i].cultivos[0].activa=true;estado.lotes[i].pos=0;vfx.actualizar(.05,estado,i,false,0,false);
  assert.equal(gotasExtra.count+impactosExtra.count,0,'regeneración no riega en inspección');
  estado.lotes[i].pos=N_REG;
  vfx.actualizar(.05,estado,i,true,0,false);
  assert.equal(vfx.calls,0,'envolvente oculta VFX');
  for(const despiece of [.02,.5,1]){
    vfx.actualizar(.05,estado,i,false,despiece,false);
    assert(gotasExtra.visible&&impactosExtra.visible,'inspección mantiene agua con módulo despiezado');
    assert(!gotas.visible&&!impacto.visible,'despiece oculta agua del carrusel');
    assert.equal(vfx.calls,2,'inspección reutiliza sólo sus dos lotes existentes');
  }
  carrusel.grupo.add(pieza);pieza.position.copy(original.pos);pieza.quaternion.copy(original.quat);pieza.scale.copy(original.esc);
  vfx.actualizar(.05,estado,-1,false,0,false);
  assert.equal(gotas.count,6,'devolución restaura el goteo normal');
  assert.equal(gotasExtra.count+impactosExtra.count,0,'devolución vacía el lote auxiliar');
}
Object.assign(estado,estadoGuardado);
gHabitat.position.set(0,0,0);gHabitat.rotation.set(0,0,0);gHabitat.scale.setScalar(1);carrusel.grupo.rotation.y=0;
pivote.attach(bandejas[0].g);vfx.actualizar(.05,estado,0,false,0,false);
const hijosAntes=[gHabitat.children.length,carrusel.grupo.children.length];
const cero=crear({...opciones,activos:[]});cero.actualizar(.05,estado,0,false,1,false);
assert.equal(cero.calls,0);assert.equal(cero.humedad,false);
assert(Object.values(cero.instancias).every(n=>n===0),'vfx=0 no crea instancias, tampoco en inspección');
assert.deepEqual([gHabitat.children.length,carrusel.grupo.children.length],hijosAntes,'vfx=0 no añade geometría');
const gasometro=new T.Group(),control=new T.Group(),hepa=new T.Group(),bomba=new T.Group();
for(const o of [gasometro,control,hepa,bomba])gHabitat.add(o);
control.position.set(1,1,0);control.rotation.y=.3;hepa.position.set(-1.86,1,.85);bomba.position.set(.52,.74,-.4);
hepa.add(new T.Mesh(new T.BoxGeometry(),new T.MeshBasicMaterial()),new T.Mesh(new T.BoxGeometry(),new T.MeshBasicMaterial()));
bomba.add(new T.Mesh(new T.BoxGeometry(),new T.MeshBasicMaterial()));
const completos=crear({...opciones,activos:Array.from(activos('')),gasometro,control,hepa,bomba});
estado.bomba=false;completos.actualizar(.05,estado,0,false,0,false,.8);
assert.equal(completos.instancias.polvo,180);assert.equal(completos.instancias.burbujas,24);
assert.equal(completos.instancias.leds,3);assert(completos.calls<=15,`presupuesto ${completos.calls}`);
const leds=gHabitat.children.find(o=>o.isInstancedMesh&&o.count===3),anclas=[[-.064,.10,.15],[.075,.04,.10],[0,.085,0]];
assert(leds);
for(let k=0;k<3;k++){
  leds.getMatrixAt(k,m);
  const actual=new T.Vector3().setFromMatrixPosition(m).applyMatrix4(gHabitat.matrixWorld);
  const exp=new T.Vector3(...anclas[k]).applyMatrix4([control,hepa,bomba][k].matrixWorld);
  assert(actual.distanceTo(exp)<1e-6,'LED anclado en cara del equipo');
}
assert(anclas[0][0]<-.05 && anclas[1][0]>.0575 && anclas[2][1]>.07,'LED fuera del volumen opaco');
assert.equal(completos.calls,14,'incluye dos lotes de inspección y tres soportes');
console.log('VFX V12.1: carga sol 0, filtros, 20 cartuchos en inspección/despiece, matrices, estados, shaders PBR y 14 llamadas máximas estáticas OK');
