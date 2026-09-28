import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';

const require = createRequire(import.meta.url);
const T = require('../prototipo-3d/vendor/three.min.js');
const html = readFileSync(new URL('../prototipo-3d/milpa360-simulador.html', import.meta.url), 'utf8');
const inicio = html.indexOf("const inspeccion={estado:'LIBRE'");
const fin = html.indexOf('window.MILPA_INSPECCION=', inicio);
assert(inicio > 0 && fin > inicio, 'bloque de inspección localizable');

const escena = new T.Scene(), padre = new T.Group(), pieza = new T.Group(), subgrupo = new T.Group();
escena.add(padre); padre.position.set(1, .4, -2); padre.rotation.y = .3; padre.add(pieza);
pieza.name = 'pieza-prueba'; pieza.position.set(.2, 1.3, -.4); pieza.rotation.set(.1, .2, .3);
pieza.scale.set(.8, 1.1, .9); pieza.renderOrder = 2; pieza.add(subgrupo); subgrupo.renderOrder = 3;
subgrupo.add(new T.Mesh(new T.BoxGeometry(1, 2, .6), new T.MeshBasicMaterial({transparent:true, opacity:.5})));
const original = { pos: pieza.position.clone(), quat: pieza.quaternion.clone(), esc: pieza.scale.clone() };
const camara = new T.PerspectiveCamera(55, 16/9, .1, 100); camara.position.set(4, 3, 8); camara.lookAt(0, 1, 0); camara.updateMatrixWorld();
const S = {vista:'habitat', cerrado:false, reducido:false, play:true};
const contexto = {T, Q:new URLSearchParams(), escena, DESPIECE:[{o:pieza,ficha:'prueba'}],
  carrusel:{bandejas:[{g:new T.Group(),plantas:new T.Group()}],actualizarVegetacion(){}},
  contorno:()=>[], document:{body:{classList:{add(){},remove(){}}}}, controles(){},
  vistaTecnica(){}, abrirFicha(){}, $:()=>({querySelector:()=>null}),
  performance:{now:()=>0}, camara, perspectiva:camara, orbe:{dist:10},
  ficha:{classList:{contains:()=>true}}, S, window:{}};
vm.createContext(contexto);
const bloque=html.slice(inicio,fin)+'\nreturn {entrarPieza,devolverPieza,actualizarInspeccion,inspeccion,aroInspeccion,fondoInspeccion};';
const api=vm.runInContext(`(function(){${bloque}})()`,contexto);
assert.equal(api.entrarPieza('pieza-prueba'),true);
assert.equal(pieza.parent?.type,'Object3D');
assert.equal(pieza.renderOrder,5); assert.equal(subgrupo.renderOrder,5);
for(let i=0;i<80;i++)api.actualizarInspeccion(.05,2000+i*50);
const normal=new T.Vector3(0,0,1).applyQuaternion(api.aroInspeccion.quaternion);
assert(Math.abs(normal.y-1)<1e-10 && Math.abs(normal.x)<1e-10 && Math.abs(normal.z)<1e-10,'aro horizontal tras girar');
let caja=new T.Box3().setFromObject(pieza);
assert(Math.abs(api.aroInspeccion.scale.x-.5*Math.hypot(caja.max.x-caja.min.x,caja.max.z-caja.min.z)*1.1)<1e-10,'radio proporcional al ancho');
api.inspeccion.yaw=Math.PI/2;api.inspeccion.pitch=.4;
for(let i=0;i<80;i++)api.actualizarInspeccion(.05,6000+i*50);
const baseReal=new T.Box3().setFromObject(pieza).min.y;
assert(api.aroInspeccion.position.y<baseReal,'pedestal bajo la pieza con yaw y pitch');
assert(Math.abs(new T.Vector3(0,0,1).applyQuaternion(api.aroInspeccion.quaternion).y-1)<1e-10,'el pedestal no se inclina');
assert.equal(api.fondoInspeccion.renderOrder,4);
assert(api.fondoInspeccion.material.opacity>.59,'fondo visible');
api.devolverPieza(true);
assert.equal(pieza.parent,padre); assert.deepEqual(pieza.position.toArray(),original.pos.toArray());
assert.deepEqual(pieza.quaternion.toArray(),original.quat.toArray());
assert.deepEqual(pieza.scale.toArray(),original.esc.toArray());
assert.equal(pieza.renderOrder,2); assert.equal(subgrupo.renderOrder,3);
console.log('Inspección V12: orientación, tamaño, fondo y restauración exacta OK');
