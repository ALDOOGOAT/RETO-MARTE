// node analysis/verificar_acceso.cjs — secuencia, conservación y fallo de energía B19.
const assert=require('node:assert/strict');
const {AccesoServicio}=require('../prototipo-3d/milpa360-modelo.js');
const datos=require('../prototipo-3d/milpa360-datos.js');
const crear=()=>new AccesoServicio(datos);
const pasos=['bloquear','igualar','aislar','extraer','estacionar','abrir_paso'];
const hacer=(a,p)=>{a.actuar(p);if(a.estado.movimiento)a.avanzarMovimiento(1);};
const a=crear(),antes=JSON.stringify(a.estado.cartuchos);
for(const accion of ['entrar','extraer','estacionar','abrir_paso','__proto__'])
  assert.throws(()=>a.actuar(accion));
a.actuar('bloquear');assert.throws(()=>a.actuar('aislar'),'No debe abrir con presión desconocida');
for(const p of pasos.slice(1))hacer(a,p);
assert.equal(a.estado.cartuchos[0].ubicacion,'deposito');
a.actuar('entrar');a.actuar('cortar_energia');
const ocupado=JSON.stringify(a.estado);
for(const p of ['desbloquear','cerrar_paso','centrar','insertar','conectar'])assert.throws(()=>a.actuar(p));
assert.equal(JSON.stringify(a.estado),ocupado,'Acción rechazada mutó el estado');
a.actuar('salir');assert.equal(a.estado.energia,false);assert.equal(a.estado.pasador,true);
assert.throws(()=>a.actuar('entrar'),'No se admite nueva entrada durante fallo');
a.actuar('cerrar_paso');assert.throws(()=>a.actuar('centrar'));
a.actuar('restaurar_energia');assert.equal(a.estado.fase,4,'La energía reinicia automáticamente');
for(const p of ['centrar','insertar','conectar','desbloquear'])hacer(a,p);
assert.equal(JSON.stringify(a.estado.cartuchos),antes);a.verificar();
// Cada estado estable conserva carga y bloqueo al cortar/restaurar energía.
for(let n=0;n<=pasos.length;n++){
  const b=crear();for(const p of pasos.slice(0,n))hacer(b,p);
  const snap=structuredClone(b.estado);
  b.actuar('cortar_energia');b.verificar();b.actuar('restaurar_energia');
  assert.deepEqual(b.estado,snap);
}
const c=crear();for(const p of pasos.slice(0,3))hacer(c,p);
c.actuar('extraer');c.avanzarMovimiento(.37);c.actuar('cortar_energia');
const detenido=JSON.stringify(c.estado);
assert.throws(()=>c.avanzarMovimiento(.5));assert.throws(()=>c.actuar('estacionar'));
assert.equal(JSON.stringify(c.estado),detenido);
c.actuar('restaurar_energia');assert.equal(c.estado.movimiento.progreso,.37);
assert.throws(()=>c.avanzarMovimiento(NaN));assert.throws(()=>c.avanzarMovimiento(.1));
c.avanzarMovimiento(1);hacer(c,'estacionar');hacer(c,'abrir_paso');c.verificar();
assert.equal(datos.acceso.colisiones.length,0);
assert.ok(Object.values(datos.acceso.comprobaciones).every(Boolean));
assert.ok(datos.acceso.resultados.ancho_con_herraje_m['0.04']<.9,'Debe conservar la sensibilidad desfavorable');
assert.equal(datos.acceso.resultados.masa_casete_y_util_kg,null);
console.log('B19: secuencia, presión desconocida, ocupación, salida sin energía, no rearranque, identidades y masa verificados.');
