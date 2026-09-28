// MILPA_GPU=1 MILPA_VISIBLE=1 node --experimental-websocket analysis/verificar_despiece_fino.mjs
// V13 · despiece fino: estallar → >30 piezas fuera · agarrar una (la isla la lee en voz) · devolverla a su
// hueco · armar → posición, cuaternión, escala y padre idénticos bit a bit. También el botón «Despiece»,
// la voz en inglés y dos capturas en docs/madrid/capturas-v13/. Mismo Chrome aislado y sin red que P3.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp,writeFile,mkdir} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import vm from 'node:vm';
const raiz=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
// node analysis/verificar_despiece_fino.mjs --sintetico: Three.js local, sin Chrome ni archivos de evidencia.
if(process.argv.includes('--sintetico')){
  const T=createRequire(import.meta.url)('../prototipo-3d/vendor/three.min.js');
  const html=readFileSync(path.join(raiz,'prototipo-3d/milpa360-simulador.html'),'utf8');
  const bloque=(desde,hasta)=>{const a=html.indexOf(desde),b=html.indexOf(hasta,a);assert(a>=0&&b>a,desde);return html.slice(a,b);};
  const errores=[];
  function comprobar(nombre,prueba){try{prueba();console.log('OK '+nombre);}catch(e){errores.push(nombre+': '+e.message);}}
  function entorno(){
    const escena=new T.Scene(),gHabitat=new T.Group(),grupo=new T.Group();escena.add(gHabitat);gHabitat.add(grupo);
    gHabitat.position.set(.4,.2,-.3);gHabitat.rotation.y=.3;
    const geometria=new T.BoxGeometry(.2,.3,.1),material=new T.MeshBasicMaterial({color:0x47783a});
    // Las paredes del casco se construyen sin marcarSubarbol: la tabla debe hacer seleccionables sus piezas.
    const casco=new T.Group();casco.name='casco';casco.add(new T.Mesh(geometria,material));gHabitat.add(casco);
    const hepa=new T.Group();hepa.name='hepa-vfx';hepa.position.set(-1.86,1,.85);
    hepa.add(new T.Mesh(geometria,material),new T.Mesh(geometria,material));gHabitat.add(hepa);
    const bandejas=Array.from({length:20},(_,i)=>{
      const g=new T.Group(),plantas=new T.Group(),planta=new T.Group();grupo.add(g);g.add(plantas);plantas.add(planta);
      g.name='cartucho-'+String(i+1).padStart(2,'0');g.rotation.y=-i/20*Math.PI*2;
      g.scale.set(.8,1.1,.9);g.position.set(i*.02,.1,-.2);
      planta.position.set(1.8,.4,0);planta.add(new T.Mesh(geometria,material));
      const suelo=new T.Mesh(geometria,material);suelo.position.x=1.8;suelo.userData.ficha='carrusel';g.add(suelo);
      return {g,plantas};
    });
    const gasometro=new T.Group();gasometro.name='gasometro';gasometro.position.set(0,.8,0);
    gasometro.add(new T.Mesh(geometria,material));gHabitat.add(gasometro);
    const carrusel={grupo,bandejas},S={vista:'habitat',cerrado:false,reducido:false,play:false,explosion:false,explosionT:1,proyeccion:'orbita'};
    const camara=new T.PerspectiveCamera(38,16/9,.1,100);camara.position.set(4,3,8);camara.lookAt(0,1,0);camara.updateMatrixWorld();
    const eventos={},elementos=new Map(),$=id=>{if(!elementos.has(id))elementos.set(id,{setAttribute(){},dataset:{},querySelector:()=>null});return elementos.get(id);};
    let voz=null,lecturas=0,hit=null;
    const ctx={T,THREE:T,escena,gHabitat,carrusel,gasometro,S,camara,perspectiva:camara,orbe:{dist:8},Q:new URLSearchParams(),
      bandejaLarvas:[],goteros:[],flujos:[],focosCultivo:[],clicables:[],N_POS:20,N_REG:8,TAU:Math.PI*2,R_CASCO:2.28,
      $ ,document:{body:{classList:{add(){},remove(){}}}},performance:{now:()=>0},controles(){},resaltar(){},
      vistaTecnica(){},envolvente(cerrado){S.cerrado=cerrado;S.explosion=false;},
      abrirFicha(clave){if(!ctx.cine.state.activo){voz=clave;lecturas++;}},objetoEn:()=>hit,innerWidth:1920,innerHeight:1080,
      cine:{state:{activo:false},pause(){}},window:{MILPA_ISLA:{callar(){voz=null;}},MILPA_GESTOS:{on:(n,f)=>eventos[n]=f,ajustes:{zoom:1}}}};
    vm.createContext(ctx);
    Object.assign(ctx,{modelo:{sol:12},modeloExploracion:null,accesoCine:null,medir(){},MILPA_I18N:{pick:es=>es}});
    const proyeccion=readFileSync(path.join(raiz,'prototipo-3d/milpa360-proyeccion.js'),'utf8');
    // pause/stop y el callback de restauración reales, sin montar el visor ni reproducir audio.
    ctx.cine=vm.runInContext(`(()=>{let token=0;const state={activo:false,reproduciendo:false},panel={},prevFocus=null;
      const audio={pause(){},removeAttribute(){},load(){}},controls=()=>{},playAudio=()=>{},pausar=()=>{};
      const salir=()=>{${bloque('},salir(){','}});').slice('},salir(){'.length)}};
      ${proyeccion.match(/    function pause\(value=true\).*\n/)[0]}
      ${proyeccion.match(/    function stop\(\).*\n/)[0]}
      return {state,pause,stop};})()`,ctx);
    ctx.clicable=(o,clave)=>{o.userData.ficha=clave;ctx.clicables.push(o);return o;};
    vm.runInContext(readFileSync(path.join(raiz,'prototipo-3d/milpa360-visual.js'),'utf8'),ctx);
    carrusel.actualizarVegetacion=ctx.window.MILPA_VISUAL.vegetacion(carrusel);
    const api=vm.runInContext(`(()=>{${bloque('let DESPIECE = [],','$("cerrar").onclick =')}
      ${bloque("$('quick-explosion').onclick=", "$('giro-camara').onclick=")}
      ${bloque('$("vista-explosion").onchange=', '$("seguir-lote").onclick=')}
      ${bloque("if(!window.MILPA_GESTOS)", "$('ver-exterior').onclick=")}
      DESPIECE=tablaDespiece();return {entrarPieza,devolverPieza,moverDespiece,actualizarInspeccion,inspeccion,pivoteInspeccion,
        actualizarVegetacionInspeccion,piezaEn,estallar,armar,piezas:DESPIECE,get t(){return despieceVisual;}};})()`,ctx);
    const delta=vm.runInContext(`elapsed=>{${html.match(/const dt = cine\.state\.activo[^;]+;/)[0]}return dt;}`,ctx);
    const tick=(n=300)=>{for(let i=0;i<n;i++){const dt=delta(1/60);api.moverDespiece(dt);api.actualizarInspeccion(dt,i*1000/60);}};
    const foto=()=>api.piezas.map(p=>[p.o.parent,...p.o.position.toArray(),...p.o.quaternion.toArray(),...p.o.scale.toArray()]);
    return {...api,tick,foto,S,carrusel,gasometro,eventos,$,ctx,get t(){return api.t;},get voz(){return voz;},get lecturas(){return lecturas;},hit:p=>hit={objeto:p.o,clave:p.ficha}};
  }
  comprobar('botón rearma también la pieza en inspección',()=>{
    const e=entorno(),antes=e.foto();e.estallar();e.tick();e.entrarPieza('cartucho-01');e.tick();
    e.$('quick-explosion').onclick();e.tick();assert.equal(e.inspeccion.estado,'LIBRE');assert.deepEqual(e.foto(),antes);
  });
  comprobar('devolución inmediata usa el hueco actual antes de cambiar o reagarrar',()=>{
    const e=entorno();e.estallar();e.tick();e.entrarPieza('cartucho-01');e.tick();e.armar();
    for(let i=0;i<300;i++)e.moverDespiece(1/60); // cerrar mientras la pieza aún está devolviéndose
    e.devolverPieza(true);const p=e.piezas.find(p=>p.id==='cartucho-01');
    assert.deepEqual(p.o.position.toArray(),p.origen.toArray());assert.deepEqual(p.o.quaternion.toArray(),p.q0.toArray());
    e.entrarPieza(p);e.tick();e.devolverPieza(true);assert.deepEqual(p.o.quaternion.toArray(),p.q0.toArray());
  });
  comprobar('20 cartuchos: pinza, voz continua, palma y restauración exacta en t=0 y t=1',()=>{
    const e=entorno();
    for(const explota of [false,true]){
      if(explota)e.estallar();e.tick();const antes=e.foto();
      for(const p of e.piezas.filter(p=>p.familia==='cartuchos')){
        e.hit(p);const lecturas=e.lecturas;e.eventos.pinza_inicio({x:.5,y:.5});e.tick();
        assert.equal(e.inspeccion.estado,'AGARRADA');assert.equal(e.voz,'carrusel');
        const lotes=e.carrusel.grupo.children.filter(o=>o.isInstancedMesh);
        assert.equal(lotes.reduce((n,o)=>n+o.count,0),19,'sin duplicar plantas de la pieza');
        const b=e.carrusel.bandejas.find(b=>b.g===p.o);assert(b.plantas.children[0].children[0].visible);
        e.eventos.pinza_fin();assert.equal(e.inspeccion.estado,'INSPECCION');assert.equal(e.lecturas,lecturas+1);
        e.eventos.orbitar({dx:.3,dy:.1});e.tick();e.eventos.cerrar();e.tick();
        assert.equal(e.inspeccion.estado,'LIBRE');assert.equal(e.voz,null);assert.deepEqual(e.foto(),antes);
        assert.equal(lotes.reduce((n,o)=>n+o.count,0),20);assert(!b.plantas.children[0].children[0].visible);
      }
    }
  });
  comprobar('puño durante devolución y cambio de pieza; gasómetro conserva origen',()=>{
    const e=entorno(),antes=e.foto(),p=e.piezas.find(p=>p.gas),origen=p.origen.toArray();
    e.eventos.estallar();e.tick();e.entrarPieza('cartucho-01');e.tick();e.eventos.cerrar();e.tick(4);
    e.entrarPieza('cartucho-02');e.eventos.armar();e.tick();assert.deepEqual(e.foto(),antes);
    e.estallar();e.tick();e.gasometro.userData.gasY=.13;e.tick();const lleno=e.foto();
    e.entrarPieza(p);e.tick();e.devolverPieza();e.tick();assert.deepEqual(e.foto(),lleno);assert.deepEqual(p.origen.toArray(),origen);
  });
  comprobar('cada pieza agarrable tiene malla alcanzable por el raycast compartido',()=>{
    const e=entorno();
    for(const p of e.piezas.filter(p=>p.agarrable)){
      let alcanzable=false;p.o.traverse(o=>{if(e.ctx.clicables.includes(o))alcanzable=true;});
      assert(alcanzable,p.id+' no está en clicables');
    }
    assert.equal(new Set(e.ctx.clicables).size,e.ctx.clicables.length,'sin duplicar raycasts');
  });
  comprobar('cine: pinza/API toman control; pausa normal conserva el modelo y stop lo restaura',()=>{
    for(const gesto of [true,false]){
      const e=entorno(),original=e.ctx.modelo,antes=JSON.stringify(original),demo={sol:62};
      e.ctx.modeloExploracion=original;e.ctx.modelo=demo;
      Object.assign(e.ctx.cine.state,{activo:true,reproduciendo:true});e.ctx.cine.pause();
      assert.equal(e.ctx.cine.state.activo,true);assert.equal(e.ctx.modelo,demo);assert.equal(e.ctx.modeloExploracion,original);
      const p=e.piezas.find(p=>p.id==='cartucho-01');e.hit(p);
      if(gesto)e.eventos.pinza_inicio({x:.5,y:.5});else e.entrarPieza(p);
      assert.equal(e.ctx.cine.state.activo,false,'inspección no debe conservar cine activo');
      assert.equal(e.ctx.modelo,original);assert.equal(e.ctx.modeloExploracion,null);assert.equal(JSON.stringify(original),antes);
      assert.equal(e.voz,'carrusel');const inicio=e.pivoteInspeccion.position.clone();e.tick();
      assert(e.pivoteInspeccion.position.distanceTo(inicio)>.1,'pieza avanza con dt real');
      e.eventos.pinza_fin();e.eventos.cerrar();e.tick();assert.equal(e.inspeccion.estado,'LIBRE');
      Object.assign(e.ctx.cine.state,{activo:true,reproduciendo:true});
      e.eventos.estallar();e.tick();assert.equal(e.ctx.cine.state.activo,false);assert.equal(e.t,1);
    }
  });
  comprobar('HEPA y sus dos hijos usan atmosfera en ficha y raycast',()=>{
    const e=entorno(),piezas=e.piezas.filter(p=>p.id==='hepa-vfx'||p.padre?.id==='hepa-vfx');
    assert.equal(piezas.length,3);
    for(const p of piezas){assert.equal(p.ficha,'atmosfera',p.id);p.o.traverse(o=>{if(o.isMesh)assert.equal(o.userData.ficha,'atmosfera');});}
  });
  comprobar('contrato P3: checkbox, ola, cota .55 y retorno exacto; movimiento reducido',()=>{
    const e=entorno(),antes=e.foto();
    e.$('vista-explosion').onchange({target:{checked:true}});e.tick(20);
    const ks=e.piezas.filter(p=>p.familia==='cartuchos').map(p=>p.k);
    assert(new Set(ks).size>5&&ks.some(k=>k>0&&k<1),'ola escalonada');
    e.tick();assert.equal(e.t,1);assert.equal(e.carrusel.grupo.position.y,.55);assert.equal(e.S.play,false);
    e.entrarPieza('cartucho-01');e.$('vista-explosion').onchange({target:{checked:false}});e.tick();
    assert.equal(e.inspeccion.estado,'LIBRE');assert.equal(e.t,0);assert.deepEqual(e.foto(),antes);
    e.S.reducido=true;
    for(const t of [1,0]){
      e.eventos.despiece({t});e.tick(1);const esperado=e.foto();
      for(const p of e.piezas.filter(p=>p.agarrable)){
        e.entrarPieza(p);e.tick(1);e.devolverPieza();assert.deepEqual(e.foto(),esperado);
      }
    }
    const p3=readFileSync(path.join(raiz,'analysis/verificar_p3_navegador.mjs'),'utf8');
    assert(p3.includes("Object.entries(process.env.MILPA_SIN_CAPTURAS==='1'?{}:poses)"),'P3 mantiene su opción sin recapturas');
  });
  comprobar('fichas técnicas y voces Piper existentes completas en ES/EN (sin reproducir audio)',()=>{
    const ctx={MILPA_I18N:{lang:'es'}};ctx.window=ctx;vm.createContext(ctx);
    for(const nombre of ['datos','contenido','voces'])vm.runInContext(readFileSync(path.join(raiz,`prototipo-3d/milpa360-${nombre}.js`),'utf8'),ctx);
    const es=ctx.MILPA_FICHAS(ctx.MILPA_DATOS);ctx.MILPA_I18N.lang='en';const en=ctx.MILPA_FICHAS(ctx.MILPA_DATOS);
    for(const p of entorno().piezas)assert(es[p.ficha]&&en[p.ficha],'ficha '+p.ficha);
    const plano=s=>s.replace(/<[^>]+>/g,'').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
    for(const clave of Object.keys(es)){
      assert.notEqual(es[clave].tit,en[clave].tit,clave+' título EN');
      assert.notEqual(es[clave].txt,en[clave].txt,clave+' explicación técnica EN');
      for(const [lang,fichas] of [['es',es],['en',en]]){
        const voz=ctx.MILPA_VOCES[lang][clave];assert(voz?.dur>0&&voz.frases.length,clave+' '+lang);
        assert(readFileSync(path.join(raiz,'prototipo-3d',voz.src)).length>0);
        const texto=voz.frases.map(f=>f[2]).join(' ');
        assert(plano(texto).startsWith(plano(fichas[clave].tit)),clave+' título/voz '+lang);
        assert(plano(texto).includes(plano(fichas[clave].resumen)),clave+' resumen/voz '+lang);
      }
    }
  });
  assert.deepEqual(errores,[],'Regresiones sintéticas V13');
}else{
const perfil=await mkdtemp(path.join(os.tmpdir(),'milpa-chrome-'));
const gpu=process.env.MILPA_GPU!=='0';
const graficos=gpu?['--enable-gpu','--use-gl=angle','--use-angle=gl']:['--enable-unsafe-swiftshader','--use-angle=swiftshader'];
const ventana=process.env.MILPA_VISIBLE==='1'?['--ozone-platform=x11','--window-size=1920,1080']:['--headless=new'];
const chrome=spawn('google-chrome',[...ventana,'--mute-audio','--no-sandbox','--allow-file-access-from-files','--autoplay-policy=no-user-gesture-required','--disable-dev-shm-usage',...graficos,'--remote-debugging-port=0','--no-first-run','--no-default-browser-check','--disable-background-networking','--user-data-dir='+perfil,'about:blank'],{stdio:['ignore','ignore','pipe']});
let socket;
try{
  const puerto=await new Promise((resolve,reject)=>{
    let salida='';chrome.stderr.on('data',d=>{salida+=d;const m=salida.match(/DevTools listening on ws:\/\/127.0.0.1:(\d+)/);if(m)resolve(Number(m[1]));});
    chrome.on('exit',c=>reject(new Error('Chrome terminó '+c)));setTimeout(()=>reject(new Error('Chrome no arrancó')),20000).unref();
  });
  const paginas=await(await fetch(`http://127.0.0.1:${puerto}/json/list`)).json();
  socket=new WebSocket(paginas.find(p=>p.type==='page').webSocketDebuggerUrl);
  await new Promise((r,j)=>{socket.onopen=r;socket.onerror=j;});
  let id=0;const pendientes=new Map(),errores=[],peticiones=[];
  socket.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pendientes.get(m.id);pendientes.delete(m.id);if(!p)return;m.error?p.reject(new Error(JSON.stringify(m.error))):p.resolve(m.result);}
    else if(m.method==='Runtime.consoleAPICalled'&&['error','assert'].includes(m.params.type))errores.push(m.params);
    else if(m.method==='Runtime.exceptionThrown')errores.push(m.params.exceptionDetails);
    else if(m.method==='Network.requestWillBeSent')peticiones.push(m.params.request.url);};
  const cdp=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;const t=setTimeout(()=>{pendientes.delete(n);reject(new Error('Timeout CDP: '+method));},60000);
    pendientes.set(n,{resolve:r=>{clearTimeout(t);resolve(r);},reject:e=>{clearTimeout(t);reject(e);}});socket.send(JSON.stringify({id:n,method,params}));});
  const evaluar=async expression=>{const r=await cdp('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true,userGesture:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
  const esperar=async(expression,ms=30000)=>{const limite=Date.now()+ms;while(Date.now()<limite){try{if(await evaluar(expression))return;}catch{}await new Promise(r=>setTimeout(r,120));}throw new Error('No se cumplió: '+expression+' '+JSON.stringify(errores));};
  const pausa=ms=>new Promise(r=>setTimeout(r,ms));
  const dir=path.join(raiz,'docs/madrid/capturas-v13');await mkdir(dir,{recursive:true});
  const capturar=async nombre=>{const im=await cdp('Page.captureScreenshot',{format:'png'});await writeFile(path.join(dir,nombre+'.png'),Buffer.from(im.data,'base64'));};
  const fps=()=>evaluar('new Promise(res=>{let n=0,raf,t=[],prev=performance.now();const t0=prev;const f=a=>{t.push(a-prev);prev=a;n++;raf=requestAnimationFrame(f);};raf=requestAnimationFrame(f);setTimeout(()=>{cancelAnimationFrame(raf);t.sort((a,b)=>a-b);res({fps:+(n*1000/(performance.now()-t0)).toFixed(1),p95ms:+t[Math.floor(t.length*.95)].toFixed(1),llamadas:renderer.info.render.calls});},3000);})');
  await cdp('Runtime.enable');await cdp('Network.enable');
  await cdp('Network.setBlockedURLs',{urls:['http://*','https://*']});
  await cdp('Emulation.setDeviceMetricsOverride',{width:1920,height:1080,deviceScaleFactor:1,mobile:false});
  await cdp('Page.navigate',{url:pathToFileURL(path.join(raiz,'prototipo-3d/milpa360-simulador.html')).href+'?vista=habitat&play=0&sol=62&lang=es'});
  await esperar('typeof refsHab!=="undefined"&&refsHab&&!document.getElementById("carga")',90000);
  const hardware=await evaluar(`(()=>{const gl=renderer.getContext(),e=gl.getExtension('WEBGL_debug_renderer_info');return e?gl.getParameter(e.UNMASKED_RENDERER_WEBGL):'desconocido';})()`);
  if(gpu)assert.ok(!/SwiftShader|llvmpipe/i.test(hardware),'La prueba GPU cayó a software: '+hardware);
  await evaluar('Object.assign(orbe,{theta:-.62,phi:1.0,dist:11.4});mira.set(0,1,0);');
  // play=0: el modelo no avanza, pero la campana del gasómetro llega a su cota por interpolación; se espera a que quede fija.
  await esperar('new Promise(r=>{const a=gasometro.userData.gasY;setTimeout(()=>r(a===gasometro.userData.gasY),400);})');

  // Instantánea armada: transformación local y padre de cada pieza. Las codornices giran la cabeza y el
  // cuerpo en tiempo real (animación, no despiece): de ellas se compara posición, escala y padre.
  const FOTO=`MILPA_DESPIECE.piezas().map(p=>[p.id,p.o.parent.uuid,...p.o.position.toArray(),...(codornices.includes(p.o)?[0,0,0,0]:p.o.quaternion.toArray()),...p.o.scale.toArray()])`;
  const armado=await evaluar(FOTO);
  const piezas=armado.length,agarrables=await evaluar('MILPA_DESPIECE.piezas().filter(p=>p.agarrable).length');
  const familias=await evaluar('Object.entries(MILPA_DESPIECE.piezas().reduce((a,p)=>(a[p.familia.split("/")[0]]=(a[p.familia.split("/")[0]]||0)+1,a),{}))');
  assert.ok(piezas>60,'pocas piezas: '+piezas);
  const medidaArmado=await fps();

  // 1 · Estallar: despiece total escalonado.
  assert.equal(await evaluar('MILPA_DESPIECE.estallar()'),true);
  await pausa(450);const aMitad=await evaluar('MILPA_DESPIECE.piezas().filter(p=>p.k>0&&p.k<1).length');
  await esperar('MILPA_DESPIECE.t===1');await pausa(300);
  const estallado=await evaluar(FOTO);
  const movidas=estallado.filter((f,i)=>Math.hypot(f[2]-armado[i][2],f[3]-armado[i][3],f[4]-armado[i][4])>1e-3).length;
  assert.ok(movidas>30,'sólo se desplazaron '+movidas);
  assert.ok(aMitad>5,'el despiece no va escalonado ('+aMitad+' piezas a medio camino)');
  const medidaDespiece=await fps();
  await evaluar('document.getElementById("cerrar").click()');await pausa(200);
  await capturar('despiece-total');

  // 2 · El gasómetro sube y baja con el gas: agarrarlo no debe reescribir su origen.
  const origenGas=await evaluar('MILPA_DESPIECE.piezas().find(p=>p.id==="gasometro").origen.toArray()');
  assert.equal(await evaluar('MILPA_INSPECCION.entrar("gasometro")'),true);
  await esperar('MILPA_ISLA.clave==="digestor"');await pausa(900);
  await evaluar('MILPA_INSPECCION.salir()');await esperar('MILPA_INSPECCION.estado==="LIBRE"');
  assert.deepEqual(await evaluar('MILPA_DESPIECE.piezas().find(p=>p.id==="gasometro").origen.toArray()'),origenGas,'el origen del gasómetro cambió');

  // 3 · Agarrar con la misma ruta que la pinza: raycast en pantalla → pieza más fina → escenario.
  const agarre=await evaluar(`(()=>{const b=carrusel.bandejas[4];b.sustrato.updateWorldMatrix(true,false);
    const c=new THREE.Box3().setFromObject(b.sustrato).getCenter(new THREE.Vector3()).project(camara);
    const p=piezaEn(objetoEn((c.x*.5+.5)*innerWidth,(-c.y*.5+.5)*innerHeight));
    if(!p)return null;entrarPieza(p,true);return {id:p.id,ficha:p.ficha,estado:MILPA_INSPECCION.estado};})()`);
  assert.ok(agarre&&agarre.estado==='AGARRADA','la pinza no agarró ninguna pieza');
  await esperar(`MILPA_ISLA.clave===${JSON.stringify(agarre.ficha)}`);
  await pausa(1600);
  const voz=await evaluar('({clave:MILPA_ISLA.clave,hablando:MILPA_ISLA.hablando,segundo:MILPA_ISLA.segundo,titulo:document.querySelector("#isla .isla-titulo").textContent,frases:document.querySelectorAll("#isla .frase").length})');
  assert.ok(voz.hablando&&voz.segundo>.4,'la isla no reproduce la ficha: '+JSON.stringify(voz));
  const enEscena=await evaluar('pivoteInspeccion.position.distanceTo(inspeccion.centro)');
  assert.ok(enEscena>.5,'la pieza no salió al escenario');
  await capturar('pieza-agarrada');

  // 4 · Inglés: la misma pieza se lee con la voz inglesa y el título inglés.
  await evaluar('MILPA_I18N.set("en")');
  await evaluar(`MILPA_INSPECCION.entrar(${JSON.stringify(agarre.id)})`);
  await pausa(700);
  const vozEn=await evaluar(`({titulo:document.querySelector("#isla .isla-titulo").textContent,esperado:document.getElementById("f-tit").textContent,src:!!MILPA_VOCES.en[MILPA_ISLA.clave],hablando:MILPA_ISLA.hablando,aviso:document.getElementById("aviso-modelo").textContent})`);
  assert.ok(vozEn.src&&vozEn.hablando&&vozEn.titulo===vozEn.esperado,'voz inglesa: '+JSON.stringify(vozEn));
  assert.ok(!/pieza|Inspección/.test(vozEn.aviso),'aviso sin traducir: '+vozEn.aviso);
  await evaluar('MILPA_I18N.set("es")');

  // 5 · Devolver: vuelve a SU hueco del despiece actual y la voz se corta.
  await evaluar('MILPA_INSPECCION.salir()');
  assert.equal(await evaluar('MILPA_ISLA.clave'),null,'la voz siguió al devolver la pieza');
  await esperar('MILPA_INSPECCION.estado==="LIBRE"');await pausa(200);
  const hueco=await evaluar(`(()=>{const p=MILPA_DESPIECE.piezas().find(p=>p.id===${JSON.stringify(agarre.id)}),o=p.o.position.clone().sub(p.origen).sub(p.d.clone().multiplyScalar(p.k));return o.length();})()`);
  assert.ok(hueco<1e-9,'la pieza no volvió a su hueco del despiece: '+hueco);

  // 6 · Armar: todas vuelan a su sitio y el módulo queda armado exacto.
  await evaluar('MILPA_DESPIECE.armar()');
  await esperar('MILPA_DESPIECE.t===0');await pausa(300);
  const rearmado=await evaluar(FOTO);
  const distintas=rearmado.filter((f,i)=>f.some((v,j)=>!Object.is(v,armado[i][j]))).map(f=>f[0]);
  assert.deepEqual(distintas,[],'piezas que no volvieron bit a bit: '+JSON.stringify(rearmado.filter(f=>distintas.includes(f[0]))));

  // 7 · Ratón: el botón «Despiece» llega al total y vuelve exacto.
  await evaluar('document.getElementById("quick-explosion").click()');await esperar('MILPA_DESPIECE.t===1');
  assert.equal(await evaluar('carrusel.grupo.position.y'),.55);
  await evaluar('document.getElementById("quick-explosion").click()');await esperar('MILPA_DESPIECE.t===0');await pausa(200);
  const boton=await evaluar(FOTO);
  assert.deepEqual(boton.filter((f,i)=>f.some((v,j)=>!Object.is(v,armado[i][j]))).map(f=>f[0]),[],'el botón no rearma exacto');

  assert.deepEqual(errores,[],'errores de consola');
  assert.deepEqual(peticiones.filter(u=>/^https?:/.test(u)),[],'la demo pidió red');
  const informe={fecha:new Date().toISOString(),prueba:'V13 despiece fino · Chrome '+(process.env.MILPA_VISIBLE==='1'?'ventana X11':'headless')+', file://, sin red',
    hardware,piezas,agarrables,familias:Object.fromEntries(familias),movidas,aMitad,agarre,voz,vozEn:{titulo:vozEn.titulo},
    rendimiento:{armado:medidaArmado,despiezado:medidaDespiece},capturas:['docs/madrid/capturas-v13/despiece-total.png','docs/madrid/capturas-v13/pieza-agarrada.png'],
    verificado:'estallar escalonado, >30 piezas, gasómetro sin reescribir origen, agarre por raycast, voz Piper ES/EN, vuelta al hueco actual, armar y botón bit a bit',
    limite:'Automatización local; audio silenciado por --mute-audio (se comprueba reproducción, no se escucha). Gestos reales con cámara no probados aquí.'};
  await writeFile(path.join(raiz,'docs/madrid/PRUEBA-V13-DESPIECE.json'),JSON.stringify(informe,null,2)+'\n');
  console.log(JSON.stringify(informe,null,2));
}finally{if(socket)socket.close();chrome.kill('SIGTERM');}
}
