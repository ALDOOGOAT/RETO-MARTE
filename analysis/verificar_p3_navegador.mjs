// node --experimental-websocket analysis/verificar_p3_navegador.mjs
// Chrome aislado, sin red; sólo stdlib y el cliente WebSocket nativo de Node 20.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp,writeFile,appendFile,mkdir,readFile} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const raiz=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const perfil=await mkdtemp(path.join(os.tmpdir(),'milpa-chrome-'));
const gpu=process.env.MILPA_GPU==='1';
const graficos=gpu?['--enable-gpu','--use-gl=angle','--use-angle=gl']:['--enable-unsafe-swiftshader','--use-angle=swiftshader'];
const ventana=process.env.MILPA_VISIBLE==='1'?['--ozone-platform=x11','--window-size=1920,1080']:['--headless=new'];
const chrome=spawn('google-chrome',[...ventana,'--mute-audio','--no-sandbox',...(process.env.MILPA_FILE_ESTRICTO==='1'?[]:['--allow-file-access-from-files']),'--disable-dev-shm-usage',...graficos,'--remote-debugging-port=0','--no-first-run','--no-default-browser-check','--disable-background-networking','--user-data-dir='+perfil,'about:blank'],{stdio:['ignore','ignore','pipe']});
let socket;
try {
  console.log('Chrome: arranque aislado');
  const puerto=await new Promise((resolve,reject)=>{
    let salida='';chrome.stderr.on('data',d=>{salida+=d;const m=salida.match(/DevTools listening on ws:\/\/127.0.0.1:(\d+)/);if(m)resolve(Number(m[1]));});
    chrome.on('exit',c=>reject(new Error('Chrome terminó '+c)));setTimeout(()=>reject(new Error('Chrome no arrancó')),20000).unref();
  });
  const paginas=await(await fetch(`http://127.0.0.1:${puerto}/json/list`)).json();
  socket=new WebSocket(paginas.find(p=>p.type==='page').webSocketDebuggerUrl);
  await new Promise((r,j)=>{socket.onopen=r;socket.onerror=j;});
  let id=0;const pendientes=new Map(),errores=[],peticiones=[];
  socket.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pendientes.get(m.id);pendientes.delete(m.id);if(!p)return;m.error?p.reject(new Error(JSON.stringify(m.error))):p.resolve(m.result);}else if(m.method==='Runtime.consoleAPICalled'&&['error','assert'].includes(m.params.type))errores.push(m.params);else if(m.method==='Runtime.exceptionThrown')errores.push(m.params.exceptionDetails);else if(m.method==='Log.entryAdded'&&m.params.entry.level==='error')errores.push(m.params.entry);else if(m.method==='Network.requestWillBeSent')peticiones.push(m.params.request.url);};
  const cdp=(method,params={})=>new Promise((resolve,reject)=>{const numero=++id;const limite=setTimeout(()=>{pendientes.delete(numero);reject(new Error("Timeout CDP: "+method));},60000);pendientes.set(numero,{resolve:r=>{clearTimeout(limite);resolve(r)},reject:e=>{clearTimeout(limite);reject(e)}});socket.send(JSON.stringify({id:numero,method,params}));});
  const evaluar=async expression=>{const r=await cdp('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true,userGesture:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
  const esperar=async expression=>{const limite=Date.now()+60000;while(Date.now()<limite){try{if(await evaluar(expression))return;}catch{}await new Promise(r=>setTimeout(r,250));}throw new Error('No se cumplió: '+expression+' errores '+JSON.stringify(errores));};
  await cdp('Runtime.enable');await cdp('Log.enable');await cdp('Network.enable');
  await cdp('Network.emulateNetworkConditions',{offline:true,latency:0,downloadThroughput:0,uploadThroughput:0});
  await cdp('Network.setBlockedURLs',{urls:['http://*','https://*']});
  await cdp('Emulation.setDeviceMetricsOverride',{width:1920,height:1080,deviceScaleFactor:1,mobile:false});
  if(process.env.MILPA_VISUAL_V6==='1'){
    const base=process.env.MILPA_DEMO_DIR||path.join(raiz,'prototipo-3d');
    const dir=path.join(raiz,'docs/madrid/capturas-v6');await mkdir(dir,{recursive:true});
    const cap=async name=>{await evaluar('new Promise(r=>setTimeout(r,800))');const im=await cdp('Page.captureScreenshot',{format:'png'});await writeFile(path.join(dir,name+'.png'),Buffer.from(im.data,'base64'));};
    await cdp('Page.navigate',{url:pathToFileURL(path.join(base,'milpa360-simulador.html')).href+'?vista=habitat&play=0&sol=62&lang=es'});
    await esperar('typeof refsHab!=="undefined"&&refsHab&&!document.getElementById("carga")');
    const hardware=await evaluar(`(()=>{const gl=renderer.getContext(),e=gl.getExtension('WEBGL_debug_renderer_info');return e?gl.getParameter(e.UNMASKED_RENDERER_WEBGL):'desconocido';})()`);
    if(gpu)assert.ok(!/SwiftShader|llvmpipe/i.test(hardware),'La prueba GPU cayó a software');
    const initial=await evaluar('JSON.stringify(modelo.estado)');
    assert.ok(await evaluar('comprobarVisual().every(c=>c.ok)'));
    assert.ok(await evaluar('carrusel.grupo.children.filter(c=>c.name==="vegetacion-instanciada").length<=12'));
    // Instancias: mismo transform y color que su planta fuente, conservados en despiece.
    const instances=await evaluar(`(()=>{gHabitat.updateMatrixWorld(true);let error=0,count=0,maxError=0;for(const batch of carrusel.grupo.children.filter(c=>c.isInstancedMesh&&c.name==='vegetacion-instanciada')){const m=new T.Matrix4(),sources=carrusel.bandejas.flatMap(b=>b.plantas.children.flatMap(pl=>pl.children.filter(o=>o.geometry===batch.geometry).map(o=>({o,b}))));for(let i=0;i<batch.count;i++){batch.getMatrixAt(i,m);if(!m.elements.every(Number.isFinite))error++;if(sources[i].b.plantas.visible){m.premultiply(batch.matrixWorld);maxError=Math.max(maxError,...m.elements.map((v,j)=>Math.abs(v-sources[i].o.matrixWorld.elements[j])));}count++;}}return {error,count,maxError};})()`);
    assert.equal(instances.error,0);assert.ok(instances.count>200);assert.ok(instances.maxError<1e-5);
    await cap('01-estudio');
    await evaluar('document.getElementById("ver-entorno").click()');
    assert.equal(await evaluar('refsHab.terreno.visible&&!refsHab.sueloEstudio.visible'),true);await cap('02-marte');
    assert.equal(await evaluar('JSON.stringify(modelo.estado)'),initial);
    await evaluar('document.getElementById("ver-entorno").click();document.getElementById("ver-exterior").click()');await esperar('refsHab.cierre===1');await cap('03-exterior');
    await evaluar('document.getElementById("ver-interior").click()');await esperar('refsHab.cierre===0');
    await evaluar('document.getElementById("ver-validacion").click();document.getElementById("validar-ejecutar").click()');
    await esperar('informeVisual&&document.getElementById("validar-exportar").disabled===false');
    const validacion=await evaluar('informeVisual');assert.ok(validacion.rendimiento.fotogramas>0);assert.ok(validacion.comprobaciones.every(c=>c.ok));await cap('04-validacion');
    await evaluar('MILPA_I18N.set("en")');assert.equal(await evaluar('document.getElementById("f-tit").textContent'),'What we can check');
    assert.equal(await evaluar('document.getElementById("ver-entorno").textContent'),'Martian setting');
    await evaluar('document.getElementById("cerrar").click();MILPA_I18N.set("es");');
    const zoom=await evaluar('orbe.dist');await evaluar('lienzo.dispatchEvent(new KeyboardEvent("keydown",{key:"+",bubbles:true}))');assert.ok(await evaluar('orbe.dist')<zoom);
    // Pinza real mediante eventos CDP, incluido final/cancelación del gesto.
    await cdp('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:850,y:440,id:1},{x:1050,y:440,id:2}]});
    const pinch=await evaluar('orbe.dist');
    await cdp('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:790,y:440,id:1},{x:1110,y:440,id:2}]});
    await cdp('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    assert.ok(await evaluar('orbe.dist')<pinch);assert.equal(await evaluar('punteros.size'),0);
    await evaluar('vistaTecnica("orbita");Object.assign(orbe,{theta:-.62,phi:1,dist:11.4});mira.set(0,1,0);');
    const medidas=[];
    for(const estudio of [false,true]){
      await evaluar(`S.estudio=${estudio};actualizarAmbiente();document.getElementById('calidad').value='alta';document.getElementById('calidad').dispatchEvent(new Event('change'));S.presentacion=true;`);
      await evaluar('new Promise(r=>setTimeout(r,1200))');
      const measure=await evaluar(`new Promise(resolve=>{let times=[],prev=performance.now(),begin=prev,raf;function f(now){times.push(now-prev);prev=now;raf=requestAnimationFrame(f);}raf=requestAnimationFrame(f);setTimeout(()=>{cancelAnimationFrame(raf);times.sort((a,b)=>a-b);resolve({fps:times.length*1000/(performance.now()-begin),p95Ms:times[Math.floor(times.length*.95)],drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,pixelRatio:renderer.getPixelRatio(),viewport:[innerWidth,innerHeight],fotogramas:times.length});},6000);})`);
      medidas.push({estudio,...measure});
    }
    await evaluar('S.presentacion=false;S.play=true;modelo.avanzar(8);');await evaluar('new Promise(r=>setTimeout(r,700))');
    assert.ok(await evaluar('carrusel.grupo.children.filter(c=>c.name==="vegetacion-instanciada").every(c=>c.instanceMatrix.array.every(Number.isFinite))'));
    await evaluar('S.play=false;document.getElementById("ayuda-reducir").checked=true;document.getElementById("ayuda-reducir").dispatchEvent(new Event("change"));');
    assert.equal(await evaluar('S.reducido&&!S.play&&!S.presentacion'),true);
    await evaluar('S.reducido=false;window.personaRevision=MILPA_PERSONA(1.75);escena.add(personaRevision);gHabitat.visible=false;Object.assign(orbe,{theta:1.2,phi:1.35,dist:3.1});mira.set(0,.95,0);');await cap('05-persona');await evaluar('escena.remove(personaRevision);gHabitat.visible=true;');
    await evaluar('vistaTecnica("orbita");Object.assign(orbe,{theta:-.62,phi:1,dist:11.4});mira.set(0,1,0);');
    for(const width of [390,800,1024]){
      await cdp('Emulation.setDeviceMetricsOverride',{width,height:844,deviceScaleFactor:1,mobile:false});
      await evaluar('medir()');await cap('06-pantalla-'+width);
      assert.ok(await evaluar('document.documentElement.scrollWidth<=innerWidth+1'),'Overflow '+width);
      const boxes=await evaluar(`['barra','transporte','ruta-proceso'].map(id=>{const r=document.getElementById(id).getBoundingClientRect();return {id,x:r.x,right:r.right,top:r.top,bottom:r.bottom};})`);
      for(const b of boxes)assert.ok(b.x>=0&&b.right<=width+1&&b.top>=0&&b.bottom<=844,'Control fuera de pantalla '+JSON.stringify(b));
    }
    await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});
    await evaluar('abrirValidacion()');await cap('07-validacion-movil');
    assert.ok(await evaluar('ficha.getBoundingClientRect().bottom<=innerHeight'));
    await evaluar('document.getElementById("cerrar").click();cine.start()');await esperar('S.vista==="planeta"&&S.transicion===0');await evaluar('cine.state.voz=false;cine.audio.pause();cine.go(1)');await esperar('refsHab.cierre===1');await cap('08-proyeccion-movil');
    await evaluar('cine.stop()');
    await cdp('Emulation.setDeviceMetricsOverride',{width:1920,height:1080,deviceScaleFactor:1,mobile:false});
    await cdp('Page.navigate',{url:pathToFileURL(path.join(base,'milpa360-acceso.html')).href+'?lang=es'});await esperar('typeof B19!=="undefined"');await cap('09-acceso');
    assert.equal(await evaluar('!!escena.environment&&humano.userData.alturaDeclarada===1.75'),true);
    assert.deepEqual(errores,[]);assert.deepEqual(peticiones.filter(u=>/^https?:/.test(u)),[]);
    const result={revision:'V6',fecha:new Date().toISOString(),hardware,modo:process.env.MILPA_VISIBLE==='1'?'ventana X11':'headless',medidas,validacion,instances,errores,solicitudesHTTP:0,verificado:'Geometría real, instancias finitas, invariancia del modelo, estudio/Marte/exterior, inspección, ES/EN, teclado, pinza táctil, movimiento reducido, tres anchos, validación y proyección móvil, acceso y figura común',limite:'Validación digital local. No demuestra ensayos físicos ni FPS del equipo del evento.'};
    await writeFile(path.join(raiz,'docs/madrid/PRUEBA-VISUAL-V6.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
  }else
  if(process.env.MILPA_VISUAL_V5==='1'){
    const base=process.env.MILPA_DEMO_DIR||path.join(raiz,'prototipo-3d');
    const dir=process.env.MILPA_REGRESION_V6==='1'?path.join(os.tmpdir(),'milpa-regresion-v5'):path.join(raiz,'docs/madrid/capturas-v5');await mkdir(dir,{recursive:true});
    const medirFPS=()=>evaluar('new Promise(resolve=>{let n=0,raf;const inicio=performance.now();function f(){n++;raf=requestAnimationFrame(f);}raf=requestAnimationFrame(f);setTimeout(()=>{cancelAnimationFrame(raf);const ms=performance.now()-inicio;resolve({fps:n*1000/ms,duracionMs:ms,llamadas:renderer.info.render.calls});},5000);})');
    const cap=async name=>{await new Promise(r=>setTimeout(r,2200));const im=await cdp('Page.captureScreenshot',{format:'png'});await writeFile(path.join(dir,name+'.png'),Buffer.from(im.data,'base64'));};
    await cdp('Page.navigate',{url:pathToFileURL(path.join(base,'milpa360-simulador.html')).href+'?vista=habitat&play=0&sol=62&lang=es'});
    await esperar('typeof refsHab!=="undefined"&&refsHab&&!document.getElementById("carga")');
    const initial=await evaluar('JSON.stringify(modelo.estado)');
    await evaluar('abrirFicha("aviario")');await cap('ficha-es');
    assert.ok(await evaluar('parseFloat(getComputedStyle(document.querySelector("#ficha .idea-publico")).fontSize)>=20'));
    assert.equal(await evaluar('[...document.querySelectorAll("#ficha a")].filter(a=>/\\.md(?:$|#)/.test(a.href)).length'),0);
    await evaluar('MILPA_I18N.set("en")');await cap('ficha-en');
    await evaluar('MILPA_I18N.set("es");document.getElementById("cerrar").click();document.getElementById("intro-cine").click()');
    await esperar('cine.state.audioListo&&cine.audio.currentTime>.5');await cap('cine-marte-es');
    await evaluar('cine.pause()');const paused=await evaluar('cine.audio.currentTime'),cameraPaused=await evaluar('camara.position.toArray()');
    await new Promise(r=>setTimeout(r,600));assert.ok(Math.abs(await evaluar('cine.audio.currentTime')-paused)<.05);
    assert.deepEqual(await evaluar('camara.position.toArray()'),cameraPaused,'La cámara continuó durante la pausa');
    await evaluar('MILPA_I18N.set("en");cine.pause(false)');await esperar('cine.state.audioListo&&cine.audio.currentTime>.5');await cap('cine-marte-en');
    assert.equal(await evaluar('document.getElementById("cine-title").textContent'),'Growing on another world');
    await evaluar('document.getElementById("cine-voice").click()');const mutedTime=await evaluar('cine.state.tiempo');
    await new Promise(r=>setTimeout(r,400));assert.ok(await evaluar('cine.state.tiempo')>mutedTime);
    await evaluar('document.getElementById("cine-voice").click()');await esperar('cine.state.audioListo');
    assert.ok(await evaluar('cine.audio.currentTime')>=mutedTime-.1,'La voz se reinició al reactivarla');
    await evaluar('cine.audio.currentTime=cine.audio.duration-.15');await esperar('cine.state.indice===1');
    await esperar('S.vista==="habitat"&&refsHab.cierre===1');await cap('cine-exterior');
    await evaluar('cine.go(2)');await esperar('refsHab.cierre===0');await cap('cine-anillo');
    const pared=await evaluar('gHabitat.getObjectByName("placa-exterior").visible');assert.equal(pared,true,'La placa exterior desaparece al abrir el corte');
    await evaluar('cine.go(3)');await cap('cine-aves');
    assert.equal(await evaluar('JSON.stringify(modeloExploracion.estado)'),initial,'El recorrido cambió los inventarios de exploración');
    const humano=await evaluar('(()=>{const h=gHabitat.getObjectByName("referencia-humana"),b=new THREE.Box3().setFromObject(MILPA_PERSONA(1.75));return {mallas:h.getObjectsByProperty("isMesh",true).length,altura:h.userData.alturaDeclarada,alturaErguida:b.max.y-b.min.y,articulado:typeof h.userData.animar==="function"};})()');
    assert.ok(humano.mallas>25&&humano.articulado);
    assert.ok(Math.abs(humano.alturaErguida-1.75)<1e-6,'Estatura erguida incorrecta');
    await evaluar('cine.go(4)');await cap('cine-tratamiento');
    await evaluar('cine.go(5)');await cap('cine-cultivo');
    await evaluar('cine.go(6);cine.state.voz=false;cine.audio.pause()');
    await esperar('document.getElementById("acceso-cine").classList.contains("activo")');await cap('cine-acceso');
    if(process.env.MILPA_V5_SMOKE!=='1'){
      await esperar('cine.state.indice===7');
      assert.equal(await evaluar('estadoAccesoCine.ocupado'),false);
      assert.equal(await evaluar('estadoAccesoCine.energia'),false);
    }
    await evaluar('cine.go(7)');await cap('cine-energia');
    await evaluar('cine.go(8)');await cap('cine-chiapas');
    await evaluar('cine.state.voz=false;cine.audio.pause();cine.state.tiempo=cine.duracion()');await esperar('cine.state.terminado');
    assert.equal(await evaluar('cine.state.reproduciendo'),false);
    await evaluar('cine.stop()');
    assert.equal(await evaluar('JSON.stringify(modelo.estado)'),initial,'No se restauró la exploración');
    const rendimientoModulo=await medirFPS();
    await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});
    await evaluar('cine.start();cine.state.voz=false;cine.audio.pause();cine.go(1)');await esperar('S.vista==="habitat"&&refsHab.cierre===1');await cap('cine-movil');
    assert.equal(await evaluar('document.documentElement.scrollWidth<=innerWidth+1'),true);
    assert.ok(await evaluar('document.querySelector(".cine-heading").getBoundingClientRect().bottom<document.getElementById("cine-subtitle").getBoundingClientRect().top'));
    await evaluar('cine.stop()');await new Promise(r=>setTimeout(r,800));
    assert.equal(await evaluar('document.getElementById("cine").hidden'),true);
    await cdp('Emulation.setDeviceMetricsOverride',{width:1920,height:1080,deviceScaleFactor:1,mobile:false});
    await cdp('Page.navigate',{url:pathToFileURL(path.join(base,'milpa360-acceso.html')).href+'?lang=es'});
    await esperar('typeof B19!=="undefined"');await cap('acceso-inicial');
    const rendimientoAcceso=await medirFPS();
    await evaluar('B19.accion("bloquear");B19.accion("igualar");B19.accion("aislar")');await esperar('puertaVisual>.98');
    await evaluar('B19.accion("extraer")');await esperar('B19.estudio.estado.movimiento?.progreso>.2');
    await evaluar('B19.accion("cortar_energia")');const load=await evaluar('B19.carros[datos.acceso.retirados[0]].position.toArray()');
    await new Promise(r=>setTimeout(r,300));assert.deepEqual(await evaluar('B19.carros[datos.acceso.retirados[0]].position.toArray()'),load);
    await evaluar('B19.accion("restaurar_energia");document.getElementById("continuar").click()');await esperar('!B19.estudio.estado.movimiento');
    await evaluar('B19.accion("estacionar")');await esperar('!B19.estudio.estado.movimiento');
    await evaluar('B19.accion("abrir_paso");B19.accion("entrar")');const x0=await evaluar('B19.humano.position.x');
    await new Promise(r=>setTimeout(r,800));const xm=await evaluar('B19.humano.position.x');assert.ok(xm<x0&&xm>1.13,'La persona saltó al destino');
    await cap('acceso-caminando');await esperar('!B19.caminando');
    await evaluar('B19.accion("cortar_energia");B19.accion("salir")');assert.equal(await evaluar('B19.estudio.estado.ocupado'),true,'Se liberó la ruta antes de completar la salida');
    await esperar('!B19.caminando');assert.equal(await evaluar('B19.estudio.estado.ocupado'),false);
    await evaluar('document.getElementById("acceso-cine-iniciar").click()');await esperar('B19.cine.state.audioListo');await cap('acceso-narrado');
    await evaluar('B19.cine.pause();MILPA_I18N.set("en");B19.cine.pause(false)');await esperar('B19.cine.audio.currentTime>.3');await cap('acceso-narrado-en');
    await evaluar('B19.cine.stop()');
    await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});await cap('acceso-movil');
    assert.equal(await evaluar('document.documentElement.scrollWidth<=innerWidth+1'),true);
    assert.deepEqual(errores,[]);assert.deepEqual(peticiones.filter(u=>/^https?:/.test(u)),[]);
    const gpuInfo=await evaluar('(()=>{const gl=renderer.getContext(),e=gl.getExtension("WEBGL_debug_renderer_info");return e?gl.getParameter(e.UNMASKED_RENDERER_WEBGL):"no disponible";})()');
    const report={fecha:new Date().toISOString(),revision:process.env.MILPA_REGRESION_V6==='1'?'V6, regresión V5':'V5',carpetaProbada:base,navegador:await cdp('Browser.getVersion'),gpu:gpuInfo,resolucion:[1920,1080],humano,rendimiento:{modulo:rendimientoModulo,acceso:rendimientoAcceso},archivoLocalSinPermisoExtra:process.env.MILPA_FILE_ESTRICTO==='1',audio:'MP3 local ES/EN: reproducción, pausa, reactivar voz, cambio de idioma y avance comprobados',acceso:'Persona continua, retención de ocupación, parada de carga y salida sin energía',recorridoCompleto:process.env.MILPA_V5_SMOKE!=='1',alcanceRecorrido:'Nueve vistas visitadas; avance automático entre capítulos, fin y secuencia de acceso completa. No se reprodujo toda la narración de principio a fin.',errores,solicitudesHTTP:0,limite:'Prueba digital local, sin proyector ni ensayo físico. Audio del navegador silenciado durante automatización. FPS de cinco segundos: no garantizan mínimo sostenido.'};
    await writeFile(path.join(raiz,process.env.MILPA_REGRESION_V6==='1'?'docs/madrid/PRUEBA-REGRESION-V5-V6.json':'docs/madrid/PRUEBA-PROYECCION-V5.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
  }else if(process.env.MILPA_VISUAL_V4==='1'){
    const base=process.env.MILPA_DEMO_DIR||path.join(raiz,'prototipo-3d');
    const dir=path.join(raiz,'docs/madrid/capturas-v4');await mkdir(dir,{recursive:true});
    await cdp('Page.navigate',{url:pathToFileURL(path.join(base,'milpa360-simulador.html')).href+'?vista=habitat&play=0&sol=62'});
    await esperar('typeof refsHab!=="undefined"&&refsHab&&!document.getElementById("carga")');
    const cap=async n=>{await evaluar('new Promise(r=>setTimeout(r,900))');const im=await cdp('Page.captureScreenshot',{format:'png'});await writeFile(path.join(dir,n+'.png'),Buffer.from(im.data,'base64'));};
    await evaluar('document.getElementById("calidad").value="alta";document.getElementById("calidad").dispatchEvent(new Event("change"))');
    const state=await evaluar('JSON.stringify(modelo.estado)');
    await cap('interior-es');
    await evaluar('document.getElementById("ver-exterior").click()');await esperar('refsHab.cierre===1');
    assert.equal(await evaluar('JSON.stringify(modelo.estado)'),state);
    const cerrado=await evaluar(`(()=>{gHabitat.updateMatrixWorld(true);const wall=gHabitat.getObjectByName('casco-360'),roof=gHabitat.getObjectByName('techo-cerrado'),b=new THREE.Box3().setFromObject(roof);const wb=new THREE.Box3().setFromObject(wall);return {arco:wall.geometry.parameters.thetaLength,techo:b.max.y,juntaPared:wb.max.y,juntaTecho:b.min.y,interioresVisibles:refsHab.interiores.filter(x=>x.o.visible).length,llamadas:renderer.info.render.calls};})()`);
    assert.ok(Math.abs(cerrado.arco-2*Math.PI)<1e-10);assert.ok(Math.abs(cerrado.techo-2.2)<1e-5);assert.equal(cerrado.interioresVisibles,0);assert.ok(Math.abs(cerrado.juntaPared-cerrado.juntaTecho)<1e-5,'Pared y faldón se solapan o separan');await cap('exterior-es');
    await evaluar(`(()=>{const p=new THREE.Vector3(Math.cos(-.62)*2.28,1.35,Math.sin(-.62)*2.28).project(camara);picar({clientX:(p.x*.5+.5)*innerWidth,clientY:(-.5*p.y+.5)*innerHeight});})()`);
    assert.equal(await evaluar('fichaActual'),'envolvente','Seleccionó una pieza oculta tras el casco');
    await evaluar('document.getElementById("cerrar").click();document.getElementById("calidad").value="auto";renderer.setPixelRatio(1);framesCalidad=0;inicioCalidad=performance.now()-4000;');
    await esperar('renderer.getPixelRatio()<1');assert.ok(await evaluar('renderer.getPixelRatio()')>=.65);
    assert.equal(await evaluar('Math.abs(lienzo.getBoundingClientRect().width-innerWidth)<1&&Math.abs(lienzo.getBoundingClientRect().height-innerHeight)<1'),true,'La calidad cambió el tamaño CSS del lienzo');
    assert.equal(await evaluar('JSON.stringify(modelo.estado)'),state);
    await evaluar('document.getElementById("calidad").value="alta";document.getElementById("calidad").dispatchEvent(new Event("change"))');
    await evaluar('document.getElementById("giro-camara").click()');const thetaInicio=await evaluar('orbe.theta');
    await evaluar('new Promise(r=>setTimeout(r,300))');assert.ok(await evaluar('orbe.theta')>thetaInicio);
    assert.equal(await evaluar('JSON.stringify(modelo.estado)'),state,'Giro de cámara alteró el proceso');
    await evaluar('document.getElementById("ayuda-reducir").checked=true;document.getElementById("ayuda-reducir").dispatchEvent(new Event("change"))');
    assert.equal(await evaluar('S.presentacion||S.play'),false);
    await evaluar('document.getElementById("ayuda-reducir").checked=false;document.getElementById("ayuda-reducir").dispatchEvent(new Event("change"));envolvente(true)');
    await evaluar('MILPA_I18N.set("en")');assert.equal(await evaluar('document.getElementById("ver-exterior").textContent'),'Closed exterior');await cap('exterior-en');
    await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});await cap('exterior-movil');assert.equal(await evaluar('document.documentElement.scrollWidth<=innerWidth+1'),true);
    await cdp('Emulation.setDeviceMetricsOverride',{width:1920,height:1080,deviceScaleFactor:1,mobile:false});
    await evaluar('document.getElementById("ver-interior").click()');await esperar('refsHab.cierre===0');assert.equal(await evaluar('JSON.stringify(modelo.estado)'),state);
    await evaluar('document.getElementById("ver-ciencia").click()');await cap('fundamentos-en');assert.equal(await evaluar('document.querySelectorAll(".formula math").length'),2);
    await evaluar('document.getElementById("cerrar").click();S.play=true;');await evaluar('new Promise(r=>setTimeout(r,700))');await evaluar('S.play=false');
    const pose=await evaluar('JSON.stringify(codornices.map(q=>[q.rotation.y,q.userData.cuello.rotation.z]))');await evaluar('new Promise(r=>setTimeout(r,400))');assert.equal(await evaluar('JSON.stringify(codornices.map(q=>[q.rotation.y,q.userData.cuello.rotation.z]))'),pose,'Pausa cambia las aves');
    await evaluar('modelo.reiniciar();modelo.avanzar(7.99);');await esperar('Math.abs(carrusel.grupo.rotation.y)<1e-5');
    await evaluar('modelo.avanzar(.02)');await evaluar('new Promise(r=>requestAnimationFrame(r))');const intermedio=await evaluar('carrusel.grupo.rotation.y');assert.ok(intermedio<=0&&intermedio> -Math.PI/10,'Indexado salta al destino');await esperar('Math.abs(carrusel.grupo.rotation.y+Math.PI/10)<1e-5');
    await evaluar('MILPA_I18N.set("es");document.getElementById("quick-explosion").click()');await esperar('carrusel.grupo.position.y===.55');await cap('despiece');
    await evaluar('S.explosion=false;modelo.reiniciar();modelo.avanzar(62);vistaTecnica("orbita");');
    await esperar('carrusel.grupo.position.y===0');
    const mediciones=[];
    for(const exterior of [false,true]){
      await evaluar('envolvente('+exterior+');S.play=true');await esperar('refsHab.cierre==='+Number(exterior));
      const v=await evaluar('new Promise(resolve=>{const times=[];let last=performance.now(),raf;const start=last;const frame=t=>{times.push(t-last);last=t;raf=requestAnimationFrame(frame)};raf=requestAnimationFrame(frame);setTimeout(()=>{cancelAnimationFrame(raf);times.sort((a,b)=>a-b);const ms=performance.now()-start;resolve({fps:times.length*1000/ms,duracionMs:ms,p95ms:times[Math.floor(times.length*.95)],llamadas:renderer.info.render.calls,triangulos:renderer.info.render.triangles});},8000);})');mediciones.push({vista:exterior?'exterior':'interior',...v});
    }
    await evaluar('S.play=false;aplicarVista("planeta");');await cap('marte');
    const hardware=await evaluar(`(()=>{const gl=renderer.getContext(),e=gl.getExtension('WEBGL_debug_renderer_info');return e?gl.getParameter(e.UNMASKED_RENDERER_WEBGL):'desconocido';})()`);
    assert.deepEqual(errores,[]);assert.deepEqual(peticiones.filter(u=>/^https?:/.test(u)),[]);
    const r={fecha:new Date().toISOString(),hardware,pantalla:[1920,1080],modo:process.env.MILPA_VISIBLE==='1'?'ventana X11':'headless',cerrado,mediciones,errores,solicitudesHTTP:0,verificado:'envolvente 360°, altura, ocultación y selección interior, calidad automática, ES/EN, móvil, MathML, pausa sin salto, giro de cámara y movimiento reducido, interpolación de indexado y despiece, inventarios conservados',limite:'Visualización y cálculo; no prueba física, presión, blindaje ni proyector.'};
    await writeFile(path.join(raiz,'docs/madrid/PRUEBA-VISUAL-V4.json'),JSON.stringify(r,null,2)+'\n');console.log(JSON.stringify(r,null,2));
  }else if(process.env.MILPA_REFINAMIENTO_V3==='1'){
    const base=process.env.MILPA_DEMO_DIR||path.join(raiz,'prototipo-3d');
    const dir=path.join(raiz,'docs/madrid/capturas-v3');await mkdir(dir,{recursive:true});
    await cdp('Page.navigate',{url:pathToFileURL(path.join(base,'milpa360-simulador.html')).href+'?vista=habitat&play=0&sol=62'});
    await esperar('typeof refsHab!=="undefined" && refsHab && !document.getElementById("carga")');
    const cap=async n=>{await evaluar('new Promise(r=>setTimeout(r,700))');const im=await cdp('Page.captureScreenshot',{format:'png'});await writeFile(path.join(dir,n+'.png'),Buffer.from(im.data,'base64'));};
    const hardware=await evaluar(`(()=>{const gl=renderer.getContext(),ex=gl.getExtension('WEBGL_debug_renderer_info');return {renderer:ex?gl.getParameter(ex.UNMASKED_RENDERER_WEBGL):'desconocido',pantalla:[innerWidth,innerHeight],dpr:devicePixelRatio};})()`);
    if(gpu)assert.ok(!/SwiftShader|llvmpipe/i.test(hardware.renderer),'La prueba GPU cayó a software');
    const rotulado={};
    for(const lang of ['es','en']){
      await evaluar(`MILPA_I18N.set('${lang}')`);
      rotulado[lang]=await evaluar(`rotulos.map(t=>({aspecto:t.userData.aspecto,ancho:t.image.width,alto:t.image.height,lineas:t.userData.lineas}))`);
      for(const r of rotulado[lang]){
        assert.ok(Math.abs(r.ancho/r.alto-r.aspecto)<.06,'Proporción deformada');
        for(const l of r.lineas)assert.ok(l.ancho<=l.max+.1&&l.y-l.px/2>=0&&l.y+l.px/2<=l.alto,'Texto fuera de placa: '+l.texto);
      }
    }
    assert.equal(await evaluar(`document.fonts.check('700 20px Archivo')&&document.fonts.check('600 20px "IBM Plex Mono"')`),true);
    const aves=await evaluar(`codornices.map(q=>{const b=new THREE.Box3().setFromObject(q),s=b.getSize(new THREE.Vector3());return {dimensionesM:s.toArray(),baseM:b.min.y,cuello:q.userData.cuello.name,mallas:q.getObjectsByProperty('isMesh',true).length};})`);
    const pisoAve=await evaluar('aviario.localToWorld(new THREE.Vector3(0,.629,0)).y');
    assert.equal(aves.length,7);for(const a of aves){assert.equal(a.cuello,'cuello-articulado');assert.ok(a.baseM>=pisoAve&&a.baseM-pisoAve<.015);}
    await evaluar('MILPA_I18N.set("es")');await cap('modulo');
    await evaluar('abrirFicha("aviario");document.getElementById("ver-aves").click()');
    assert.equal(await evaluar('S.detalle&&!S.play'),true);await cap('aviario-es');
    await evaluar('MILPA_I18N.set("en")');assert.equal(await evaluar('document.getElementById("ver-aves").textContent'),'Inspect birds');await cap('aviario-en');
    await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});
    await evaluar('document.getElementById("ver-aves").click()');
    assert.equal(await evaluar('document.documentElement.scrollWidth<=innerWidth+1&&ficha.classList.contains("oculto")'),true);await cap('aviario-movil');
    await cdp('Emulation.setDeviceMetricsOverride',{width:1920,height:1080,deviceScaleFactor:1,mobile:false});
    const zoom=await evaluar('orbe.dist');await evaluar('lienzo.dispatchEvent(new KeyboardEvent("keydown",{key:"+",bubbles:true}))');assert.ok(await evaluar('orbe.dist')<zoom);
    await evaluar('document.getElementById("cerrar").click();orbe.dist=.62;mira.copy(codornices[0].localToWorld(new THREE.Vector3(.01,.11,0)));');await cap('codorniz');
    await evaluar('vistaTecnica("orbita");MILPA_I18N.set("es");');assert.equal(await evaluar('!!S.detalle'),false);
    for(const lang of ['es','en'])for(let paso=0;paso<5;paso++){
      await evaluar(`MILPA_I18N.set('${lang}');mostrarPaso(${paso})`);
      assert.equal(await evaluar('fichaActual'),await evaluar(`recorrido[${paso}]`));
      assert.equal(await evaluar('document.getElementById("tour-next").textContent'),lang==='es'?(paso===4?'Terminar recorrido':'Siguiente'):(paso===4?'Finish tour':'Next'));
    }
    await evaluar('document.getElementById("cerrar").click();vistaTecnica("orbita");Object.assign(orbe,{theta:-.62,phi:1.02,dist:8.4});mira.set(0,1,0);');
    const mediciones=[];
    for(const calidad of ['alta','fluida']){
      await evaluar(`document.getElementById('calidad').value='${calidad}';document.getElementById('calidad').dispatchEvent(new Event('change'));S.play=true;S.vel=1;`);
      await evaluar('new Promise(r=>setTimeout(r,1500))');
      const medida=await evaluar('new Promise(resolve=>{let n=0,raf;const inicio=performance.now();function contar(){n++;raf=requestAnimationFrame(contar);}raf=requestAnimationFrame(contar);setTimeout(()=>{cancelAnimationFrame(raf);const ms=performance.now()-inicio;resolve({fotogramas:n,duracionMs:ms,fps:n*1000/ms,llamadas:renderer.info.render.calls,triangulos:renderer.info.render.triangles});},8000);})');
      mediciones.push({calidad,...medida});
    }
    await evaluar('S.play=false');assert.deepEqual(errores,[]);assert.deepEqual(peticiones.filter(u=>/^https?:/.test(u)),[]);
    const report={fecha:new Date().toISOString(),navegador:await cdp('Browser.getVersion'),modo:process.env.MILPA_VISIBLE==='1'?'ventana X11':'headless',...hardware,cpu:os.cpus()[0].model,rotulado,aves,mediciones,errores,solicitudesHTTP:0,limite:'GPU local a 1080p; sin proyector conectado ni prueba del equipo de Madrid. Aves y soportes ilustrativos.'};
    await writeFile(path.join(raiz,'docs/madrid/PRUEBA-REFINAMIENTO-V3.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({...report,rotulado:Object.fromEntries(Object.entries(rotulado).map(([k,v])=>[k,v.length]))},null,2));
  }else if(process.env.MILPA_VISUAL_V2==='1'){
    const base=process.env.MILPA_DEMO_DIR?path.resolve(process.env.MILPA_DEMO_DIR,'..'):raiz;
    const dir=path.join(raiz,'docs/madrid/capturas-v2');await mkdir(dir,{recursive:true});
    const cap=async n=>{await new Promise(r=>setTimeout(r,350));const im=await cdp('Page.captureScreenshot',{format:'png'});await writeFile(path.join(dir,n+'.png'),Buffer.from(im.data,'base64'));};
    await cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
    await cdp('Page.navigate',{url:pathToFileURL(path.join(base,'prototipo-3d/milpa360-simulador.html')).href+'?play=0&lang=es'});
    await esperar('typeof refsHab!=="undefined" && refsHab && !document.getElementById("carga")');
    assert.equal(await evaluar('FICHAS.agua.d[0][1]'), '6.30 L/d');
    await cap('planeta-es');
    const state=await evaluar('JSON.stringify(modelo.estado)');
    await evaluar('MILPA_I18N.set("en")');
    assert.equal(await evaluar('document.documentElement.lang'),'en');
    assert.equal(await evaluar('FICHAS.agua.tit'),'Recover water and check its quality');
    assert.equal(await evaluar('JSON.stringify(modelo.estado)'),state);
    await cap('planeta-en');
    await evaluar('aplicarVista("habitat");');
    await new Promise(r=>setTimeout(r,800));await cap('habitat-en');
    await evaluar('mostrarPaso(2)');await cap('recorrido-en');
    assert.equal(await evaluar('$("tour-next").textContent'),'Next');
    await evaluar('$("tour-next").click()');assert.equal(await evaluar('pasoRecorrido'),3);
    await evaluar('$("cerrar").click();pasoRecorrido=-1;abrirTecnica();');
    await cap('tecnica-en');
    const inventario={tecnica:await evaluar('$("ficha").innerText')};
    assert.ok(!inventario.tecnica.includes('gas almacenado'),'Telemetría sin traducir');
    await evaluar('$("lote-elegido").value="L07";$("tipo-fallo").value="atasco";MILPA_I18N.set("es");MILPA_I18N.set("en")');
    assert.equal(await evaluar('$("lote-elegido").value'),'L07');
    assert.equal(await evaluar('$("tipo-fallo").value'),'atasco');

    await evaluar('abrirComparacion()');inventario.comparacion=await evaluar('$("ficha").innerText');
    await evaluar('$("cmp-inicio").value="30";MILPA_I18N.set("es");MILPA_I18N.set("en")');
    assert.equal(await evaluar('$("cmp-inicio").value'),'30');

    await evaluar('MILPA_I18N.set("es");$("cerrar").click();aplicarVista("habitat")');await cap('habitat-es');
    await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});
    await cap('movil-es');
    assert.equal(await evaluar('document.documentElement.scrollWidth<=innerWidth+1'),true);
    await evaluar('MILPA_I18N.set("en");mostrarPaso(0)');await cap('movil-en');
    const focus=await evaluar('(()=>{lienzo.focus();return document.activeElement.id})()');assert.equal(focus,'lienzo');
    const theta=await evaluar('orbe.theta');await evaluar('lienzo.dispatchEvent(new KeyboardEvent("keydown",{key:"ArrowRight",bubbles:true}))');assert.ok(await evaluar('orbe.theta')>theta);
    await evaluar('$("ayuda-reducir").checked=true;$("ayuda-reducir").dispatchEvent(new Event("change"))');assert.equal(await evaluar('S.play||!S.reducido'),false);
    await cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
    await cdp('Page.navigate',{url:pathToFileURL(path.join(base,'prototipo-3d/milpa360-acceso.html')).href+'?lang=en'});
    await esperar('typeof B19!=="undefined"');await cap('acceso-en');
    assert.equal(await evaluar('document.getElementById("siguiente").textContent'),'Lock ring');
    await evaluar('document.getElementById("siguiente").click()');
    assert.equal(await evaluar('B19.estudio.estado.fase'),1);
    await evaluar('MILPA_I18N.set("es")');assert.equal(await evaluar('B19.estudio.estado.fase'),1);await cap('acceso-es');
    inventario.acceso=await evaluar('document.body.innerText');
    await cdp('Page.navigate',{url:pathToFileURL(path.join(base,'visuales/atlas-marciano.html')).href+'?lang=es'});
    await esperar('document.getElementById("coverage")?.textContent.includes("2.46")');await cap('atlas-es');
    await evaluar('MILPA_I18N.set("en")');assert.equal(await evaluar('document.querySelector("h1").textContent'),'Life, on another world.');await cap('atlas-en');
    await evaluar('document.getElementById("retardo").value="22";signal();document.getElementById("demora").scrollIntoView({behavior:"instant"})');
    assert.equal(await evaluar('document.getElementById("vuelta").value'),'44 min');await cap('atlas-delay-en');
    await evaluar(`document.querySelector('[data-process="cultivo"]').click();document.getElementById("ciclo").scrollIntoView({behavior:"instant"})`);
    assert.equal(await evaluar('document.querySelectorAll(".ring path.active").length'),12);await cap('atlas-cycle-en');
    await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});
    await evaluar('document.getElementById("retorno").scrollIntoView({behavior:"instant"})');await cap('atlas-mobile-en');
    assert.equal(await evaluar('document.documentElement.scrollWidth<=innerWidth+1'),true);
    const v=await evaluar('document.getElementById("retardo").value');await evaluar('MILPA_I18N.set("es")');assert.equal(await evaluar('document.getElementById("retardo").value'),v);

    assert.deepEqual(errores,[]);assert.deepEqual(peticiones.filter(u=>/^https?:/.test(u)),[]);
    await writeFile(path.join(dir,'inventario-texto.json'),JSON.stringify(inventario,null,2));
    const report={fecha:new Date().toISOString(),navegador:await cdp('Browser.getVersion'),idiomas:['es','en'],controles:'recorrido, fichas, inspección, comparación, acceso, atlas, móvil, teclado y reducción de movimiento',estado_conservado:true,errores,solicitudesHTTP:0,limite:'Prueba local; no prueba del equipo del evento ni validación física'};
    await writeFile(path.join(raiz,'docs/madrid/PRUEBA-VISUAL-V2.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
  }else
  if(process.env.MILPA_SOLO_ACCESO==='1'){
    const html=path.join(process.env.MILPA_DEMO_DIR||path.join(raiz,'prototipo-3d'),'milpa360-acceso.html');
    await cdp('Page.navigate',{url:pathToFileURL(html).href});
    await esperar('typeof B19!=="undefined"');
    const reservaHumana=await evaluar('(()=>{const b=new THREE.Box3().setFromObject(reserva),v=b.getSize(new THREE.Vector3());return {altura:v.y,diametro:v.x,alturaNominal:p.altura_persona_equipo,diametroNominal:p.diametro_persona_equipo};})()');
    assert.ok(Math.abs(reservaHumana.altura-reservaHumana.alturaNominal)<1e-6&&Math.abs(reservaHumana.diametro-reservaHumana.diametroNominal)<1e-6,'La postura de la persona cambió la reserva de acceso');
    const dir=path.join(raiz,'docs/madrid/capturas-b19');await mkdir(dir,{recursive:true});
    const capturar=async nombre=>{const im=await cdp('Page.captureScreenshot',{format:'png'});await writeFile(path.join(dir,nombre+'.png'),Buffer.from(im.data,'base64'));};
    await capturar('ensamblado');
    for(const k of ['bloquear','igualar','aislar'])await evaluar(`B19.accion('${k}')`);
    await esperar('puertaVisual>.98');
    await evaluar(`B19.accion('extraer')`);
    await esperar('B19.estudio.estado.movimiento && B19.estudio.estado.movimiento.progreso>0.15');
    await evaluar(`B19.accion('cortar_energia')`);
    const detenida=await evaluar('JSON.stringify(B19.estudio.estado)');
    await new Promise(r=>setTimeout(r,500));
    assert.equal(await evaluar('JSON.stringify(B19.estudio.estado)'),detenida);
    await capturar('fallo-traslado');
    await evaluar(`B19.accion('restaurar_energia')`);
    assert.equal(await evaluar('B19.estudio.estado.movimiento.progreso'),JSON.parse(detenida).movimiento.progreso);
    await evaluar(`document.getElementById('continuar').click()`);
    await esperar('!B19.estudio.estado.movimiento');
    await evaluar(`B19.accion('estacionar')`);await esperar('!B19.estudio.estado.movimiento');
    await evaluar(`B19.accion('abrir_paso');B19.accion('entrar');B19.accion('cortar_energia')`);
    assert.equal(await evaluar('B19.estudio.estado.ocupado'),true);
    await esperar('!B19.caminando');
    await capturar('ocupado-sin-energia');
    await evaluar(`document.getElementById('planta').click()`);await capturar('planta');
    await evaluar(`B19.accion('salir')`);
    await esperar('!B19.caminando');
    assert.equal(await evaluar('B19.estudio.estado.ocupado'),false);
    assert.equal(await evaluar('B19.estudio.estado.energia'),false);
    await evaluar(`B19.accion('restaurar_energia');B19.accion('cerrar_paso');B19.accion('centrar')`);
    await esperar('!B19.estudio.estado.movimiento');
    await evaluar(`B19.accion('insertar')`);await esperar('!B19.estudio.estado.movimiento');
    await evaluar(`B19.accion('conectar');B19.accion('desbloquear')`);
    assert.equal(await evaluar('B19.estudio.estado.fase'),0);
    const geometria=await evaluar(`(()=>{B19.escena.updateMatrixWorld(true);return B19.datos.acceso.retirados.map(i=>{const o=B19.carros[i];return {posicion:o.position.toArray(),limites:new THREE.Box3().setFromObject(o).min.toArray().concat(new THREE.Box3().setFromObject(o).max.toArray())};});})()`);
    assert.ok(geometria.every(o=>o.limites.every(Number.isFinite)&&o.posicion.every(v=>Math.abs(v)<1e-8)));
    // Vista estrecha: controles en flujo y sin desbordamiento horizontal.
    await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});
    await new Promise(r=>setTimeout(r,300));
    assert.equal(await evaluar('document.documentElement.scrollWidth<=innerWidth+1'),true);
    await capturar('movil');
    await cdp('Emulation.setDeviceMetricsOverride',{width:1600,height:1100,deviceScaleFactor:1,mobile:false});
    const base=process.env.MILPA_DEMO_DIR?path.resolve(process.env.MILPA_DEMO_DIR,'..'):raiz;
    await cdp('Page.navigate',{url:pathToFileURL(path.join(base,'prototipo/planos/madrid/P06-acceso-servicio.html')).href});
    await esperar('document.title.includes("P06")');await capturar('plano');
    assert.deepEqual(errores,[]);assert.deepEqual(peticiones.filter(u=>/^https?:/.test(u)),[]);
    const informe={fecha:new Date().toISOString(),prueba:'B19 Chrome offline file://',browser:await cdp('Browser.getVersion'),
      controles:'extracción, paro en traslado, recuperación explícita, estacionamiento, ocupación, salida sin energía, retorno completo y móvil',
      geometria,reservaHumana,errores,solicitudesHTTP:0,limite:'Sólo candidata digital; sin validación física ni prueba de GPU del evento'};
    await writeFile(path.join(raiz,'docs/madrid/PRUEBA-B19-NAVEGADOR.json'),JSON.stringify(informe,null,2)+'\n');
    console.log(JSON.stringify(informe,null,2));
  }else{
  const html=path.join(process.env.MILPA_DEMO_DIR||path.join(raiz,'prototipo-3d'),'milpa360-simulador.html');
  const url=pathToFileURL(html).href;
  await cdp('Page.navigate',{url:url+'?vista=habitat&play=0&sol=62'});
  await esperar('typeof refsHab!=="undefined" && refsHab && !document.getElementById("carga")');
  assert.equal(await evaluar('modelo.estado.sol'),62);
  const cotas=await evaluar(`(()=>{gHabitat.updateMatrixWorld(true);const h=gHabitat.getObjectByName('referencia-humana'),b=new THREE.Box3().setFromObject(h);GEO.suelo.computeBoundingBox();GEO.marco.computeBoundingBox();return {piso:GEOM.casco.piso,pies:b.min.y,cabeza:b.max.y,techo:GEOM.casco.altura,figura:GEOM.casco.altura_figura,sueloMin:GEO.suelo.boundingBox.min.y,sueloMax:GEO.suelo.boundingBox.max.y,prof:GEOM.cartucho.profundidad_sustrato,marcoMax:GEO.marco.boundingBox.max.y,caja:GEOM.cartucho.altura_caja};})()`);
  assert.ok(cotas.cabeza<cotas.techo,'Figura no cabe bajo techo');
  assert.ok(Math.abs(cotas.sueloMin)<1e-6&&Math.abs(cotas.sueloMax-cotas.prof)<1e-6,'Sustrato sin profundidad nominal');
  assert.ok(Math.abs(cotas.marcoMax-cotas.caja)<1e-6,'Caja sin altura nominal');
  // V5: la figura tiene postura articulada; inclinar la cabeza modifica su cota.
  // La estatura erguida se normaliza a 1.75 m, sin tratar esa postura como otra dimensión.
  assert.ok(Math.abs(cotas.cabeza-cotas.piso-cotas.figura)<.02,'Escala humana inconsistente');
  assert.ok(Math.abs(cotas.pies-cotas.piso)<.005,'La figura no apoya en el piso');
  const piso=await evaluar(`(()=>{const b=new THREE.Box3().setFromObject(gHabitat.getObjectByName('piso-modulo'));return {base:b.min.y,cara:b.max.y,terreno:gHabitat.getObjectByName('terreno').position.y};})()`);
  assert.ok(piso.terreno<=piso.base+1e-6&&Math.abs(piso.cara-cotas.piso)<1e-6,'Terreno invade piso transitable');
  console.log('Chrome: escena cargada sin red');
  if(process.env.MILPA_SOLO_CAPTURAS!=='1'){
  const snap=await evaluar('JSON.stringify(modelo.estado)');
  await new Promise(r=>setTimeout(r,500));
  assert.equal(await evaluar('JSON.stringify(modelo.estado)'),snap,'Pausa muta el modelo');
  const alineacion=await evaluar(`(()=>{carrusel.grupo.updateMatrixWorld(true);return modelo.estado.lotes.map((l,i)=>{const p=new THREE.Vector3(R_MED,0,0);carrusel.bandejas[i].g.localToWorld(p);return Math.hypot(p.x-Math.cos(l.pos/N_POS*TAU)*R_MED,p.z-Math.sin(l.pos/N_POS*TAU)*R_MED);});})()`);
  assert.ok(alineacion.every(x=>x<1e-8),'Escena y posición del lote no coinciden');
  await evaluar('document.getElementById("b-tecnica").click()');
  await esperar('document.getElementById("datos-vivos")');
  await evaluar('document.getElementById("vista-explosion").click()');
  await esperar('carrusel.grupo.position.y===.55');
  assert.equal(await evaluar('S.play'),false);
  await evaluar('document.getElementById("vista-explosion").click();document.getElementById("seguir-lote").click()');
  await esperar('gHabitat.getObjectByName("lote-seleccionado").visible');
  await esperar('carrusel.grupo.position.y===0');
  assert.equal(await evaluar('carrusel.grupo.position.y'),0);
  await evaluar('document.getElementById("cam-planta").click()');
  assert.equal(await evaluar('camara.isOrthographicCamera'),true);
  await evaluar('document.getElementById("cam-lateral").click();document.getElementById("cam-orbita").click()');
  await evaluar('document.getElementById("aplicar-fallo").click();modelo.avanzar(1)');
  assert.equal(await evaluar('modelo.estado.aguaFraccion'),0);
  await evaluar('document.getElementById("reparar-fallo").click();modelo.avanzar(1)');
  assert.ok(await evaluar('modelo.estado.aguaFraccion>0'));
  await evaluar('document.getElementById("b-tormenta").click();modelo.avanzar(1)');
  assert.equal(await evaluar('modelo.estado.luz'),0.25);
  await evaluar('document.getElementById("b-tormenta").click();document.getElementById("b-reset").click()');
  assert.equal(await evaluar('modelo.estado.sol'),0);
  await evaluar('document.getElementById("tipo-fallo").value="lote";document.getElementById("aplicar-fallo").click();modelo.avanzar(9)');
  assert.equal(await evaluar('modelo.estado.pasos'),0);
  await evaluar('document.getElementById("aislar-lote").click();modelo.avanzar(1);modelo.verificar()');
  assert.equal(await evaluar('modelo.estado.cuarentena.length'),1);
  await evaluar('document.getElementById("comparar-siembras").click()');
  assert.ok((await evaluar('document.getElementById("cmp-resultado").textContent')).includes('escalonada'));
  await evaluar('document.getElementById("cmp-duracion").value=0;document.getElementById("cmp-calcular").click()');
  assert.ok((await evaluar('document.getElementById("cmp-resultado").textContent')).includes('0 kcal'));
  await evaluar('document.getElementById("cerrar").click();document.getElementById("b-reset").click();document.getElementById("b-play").click()');
  await esperar('modelo.estado.sol>0');await evaluar('document.getElementById("b-play").click()');
  await evaluar('document.getElementById("v-planeta").click()');await esperar('S.vista==="planeta"&&S.transicion===0');
  await evaluar('document.getElementById("v-habitat").click()');await esperar('S.vista==="habitat"&&S.transicion===0');
  const fichaErrores=await evaluar(`Object.keys(FICHAS).filter(k=>{abrirFicha(k);return !document.getElementById('f-viz').textContent;})`);assert.deepEqual(fichaErrores,[]);
  await evaluar('document.getElementById("cerrar").click()');
  await evaluar('document.getElementById("b-recorrido").click()');
  assert.equal(await evaluar('fichaActual'),'sitio');
  assert.equal(await evaluar('document.getElementById("f-tit").textContent'),await evaluar('FICHAS.sitio.tit'));
  await evaluar('document.getElementById("cerrar").click()');
  console.log('Chrome: controles y geometría verificados');
  }
  const hardware=await evaluar(`(()=>{const gl=renderer.getContext(),ext=gl.getExtension('WEBGL_debug_renderer_info');return {three:THREE.REVISION,renderer:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):'no disponible',pantalla:[innerWidth,innerHeight],dpr:devicePixelRatio};})()`);
  // Ventana temporal: exigir 30 fotogramas puede agotar CDP con SwiftShader.
  const rendimiento=await evaluar('new Promise(resolve=>{let n=0,raf;const inicio=performance.now();function contar(){n++;raf=requestAnimationFrame(contar);}raf=requestAnimationFrame(contar);setTimeout(()=>{cancelAnimationFrame(raf);const ms=performance.now()-inicio;resolve({fotogramas:n,duracionMs:ms,fps:n*1000/ms});},5000);})');
  assert.equal(hardware.three,'160');
  const capturas=path.join(raiz,'docs/madrid/capturas');await mkdir(capturas,{recursive:true});
  const poses={hero:'vista=habitat&ui=0&sol=62&theta=-0.62&phi=1.08&dist=10.4&play=0',planta:'vista=habitat&ui=0&piso=0&casco=0&sol=62&theta=-1.5708&phi=0.12&dist=11.5&play=0',nucleo:'vista=habitat&ui=0&piso=0&sol=62&theta=-0.78&phi=1.16&dist=5.4&play=0',tormenta:'vista=habitat&ui=0&sol=62&storm=1&play=0&theta=-0.62&phi=1.04&dist=10',planeta:'ui=0&theta=0.95&phi=1.30&dist=18.5&play=0',tecnica:'vista=habitat&play=0&sol=62'};
  poses.exterior='vista=habitat&ui=0&cerrado=1&sol=62&play=0';
  poses.explosion='vista=habitat&ui=0&sol=62&theta=-0.62&phi=1.10&dist=12.4&play=0&explosion=1';
  if(process.env.MILPA_CAPTURA){assert.ok(process.env.MILPA_CAPTURA in poses);for(const n of Object.keys(poses))if(n!==process.env.MILPA_CAPTURA)delete poses[n];}
  // Revalidar una extracción sin volver a renderizar las capturas ya revisadas.
  for(const [nombre,q] of Object.entries(process.env.MILPA_SIN_CAPTURAS==='1'?{}:poses)){
    await cdp('Page.navigate',{url:url+'?'+q});await esperar('typeof refsHab!=="undefined"&&refsHab&&!document.getElementById("carga")');
    await evaluar('camara.position.copy(new THREE.Vector3(mira.x+orbe.dist*Math.sin(orbe.phi)*Math.cos(orbe.theta),mira.y+orbe.dist*Math.cos(orbe.phi),mira.z+orbe.dist*Math.sin(orbe.phi)*Math.sin(orbe.theta)))');
    await evaluar('document.getElementById("calidad").value="alta";document.getElementById("calidad").dispatchEvent(new Event("change"))');
    if(nombre==='tecnica')await evaluar('abrirTecnica()');
    await evaluar('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');
    console.log('Captura: '+nombre);
    const imagen=await cdp('Page.captureScreenshot',{format:'png'});
    await writeFile(path.join(capturas,nombre+'.png'),Buffer.from(imagen.data,'base64'));
    if(['hero','exterior'].includes(nombre)&&process.env.MILPA_EXPORT_GLB==='1'){
      // Exportación de mallas ya evaluadas; Blender aplica el cambio Y-arriba → Z-arriba.
      // Sin un segundo motor ni un cargador añadido a la demo offline.
      const largo=await evaluar(`(()=>{gHabitat.updateMatrixWorld(true);const geometrias={},materiales={},texturas={},objetos=[];gHabitat.traverseVisible(o=>{if(!o.isMesh||!o.material.visible||Array.isArray(o.material))return;const g=o.geometry,m=o.material;if(!g.attributes.position)return;if(!geometrias[g.uuid])geometrias[g.uuid]={pos:Array.from(g.attributes.position.array),normales:g.attributes.normal?Array.from(g.attributes.normal.array):null,uv:g.attributes.uv?Array.from(g.attributes.uv.array):null,index:g.index?Array.from(g.index.array):null};if(!materiales[m.uuid]){materiales[m.uuid]={color:m.color.toArray(),metal:m.metalness||0,rough:m.roughness??1,alpha:m.opacity,map:m.map?.uuid};if(m.map&&!texturas[m.map.uuid]&&m.map.image?.toDataURL)texturas[m.map.uuid]={png:m.map.image.toDataURL('image/png'),repeat:m.map.repeat.toArray()};}const add=(matrix,nombre)=>objetos.push({nombre,geometria:g.uuid,material:m.uuid,matrix:matrix.toArray()});if(o.isInstancedMesh){for(let i=0;i<o.count;i++){const mat=new THREE.Matrix4();o.getMatrixAt(i,mat);add(o.matrixWorld.clone().multiply(mat),(o.name||'pieza')+'-'+i);}}else add(o.matrixWorld,o.name||'pieza');});globalThis.mallasExport=JSON.stringify({tipo:'Mallas nominales Three160, no CAD ni fabricación',parametros:GEOM,sol:modelo.estado.sol,geometrias,materiales,texturas,objetos});return mallasExport.length;})()`);
      await mkdir(path.join(raiz,'outputs/madrid-s5'),{recursive:true});
      const salida=path.join(raiz,'outputs/madrid-s5',nombre==='exterior'?'escena-exterior.json':'escena-three.json');await writeFile(salida,'');
      console.log('Exportando '+largo+' caracteres en bloques');
      for(let i=0;i<largo;i+=65536)await appendFile(salida,await evaluar(`mallasExport.slice(${i},${i+65536})`));
      console.log('Mallas de escena nominal exportadas para Blender');
    }
  }
  assert.deepEqual(errores,[],'Errores de consola');
  assert.deepEqual(peticiones.filter(u=>/^https?:/.test(u)),[],'La demo solicita Internet');
  const informe={fecha:new Date().toISOString(),prueba:(process.env.MILPA_VISIBLE==='1'?'Chrome visible X11':'Chrome headless')+', red deshabilitada, file://',browser:await cdp('Browser.getVersion'),cpu:os.cpus()[0].model,plataforma:os.platform(),...hardware,cotas,piso,rendimiento,limite:gpu?'GPU local; no prueba del equipo del evento':'SwiftShader por software; NO prueba del equipo del evento',controles:process.env.MILPA_SOLO_CAPTURAS==='1'?'omitidos; sólo capturas':'pausa, avance, reset, fallos, cuarentena, vistas, fichas, despiece, selección y comparación comprobados',errores,solicitudesHTTP:0};
  if(process.env.MILPA_SOLO_CAPTURAS!=='1')await writeFile(path.join(raiz,'docs/madrid/PRUEBA-P3-NAVEGADOR.json'),JSON.stringify(informe,null,2)+'\n');
  console.log(JSON.stringify(informe,null,2));
  }
} finally {if(socket)socket.close();chrome.kill('SIGTERM');}
