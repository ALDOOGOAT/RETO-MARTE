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
const chrome=spawn('google-chrome',[...ventana,'--no-sandbox','--allow-file-access-from-files','--disable-dev-shm-usage',...graficos,'--remote-debugging-port=0','--no-first-run','--no-default-browser-check','--disable-background-networking','--user-data-dir='+perfil,'about:blank'],{stdio:['ignore','ignore','pipe']});
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
  const evaluar=async expression=>{const r=await cdp('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
  const esperar=async expression=>{const limite=Date.now()+60000;while(Date.now()<limite){try{if(await evaluar(expression))return;}catch{}await new Promise(r=>setTimeout(r,250));}throw new Error('No se cumplió: '+expression+' errores '+JSON.stringify(errores));};
  await cdp('Runtime.enable');await cdp('Log.enable');await cdp('Network.enable');
  await cdp('Network.emulateNetworkConditions',{offline:true,latency:0,downloadThroughput:0,uploadThroughput:0});
  await cdp('Network.setBlockedURLs',{urls:['http://*','https://*']});
  await cdp('Emulation.setDeviceMetricsOverride',{width:1920,height:1080,deviceScaleFactor:1,mobile:false});
  if(process.env.MILPA_REFINAMIENTO_V3==='1'){
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
    const dir=path.join(raiz,'docs/madrid/capturas-b19');await mkdir(dir,{recursive:true});
    const capturar=async nombre=>{const im=await cdp('Page.captureScreenshot',{format:'png'});await writeFile(path.join(dir,nombre+'.png'),Buffer.from(im.data,'base64'));};
    await capturar('ensamblado');
    for(const k of ['bloquear','igualar','aislar'])await evaluar(`B19.accion('${k}')`);
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
    await capturar('ocupado-sin-energia');
    await evaluar(`document.getElementById('planta').click()`);await capturar('planta');
    await evaluar(`B19.accion('salir')`);
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
      geometria,errores,solicitudesHTTP:0,limite:'Sólo candidata digital; sin validación física ni prueba de GPU del evento'};
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
  assert.ok(Math.abs(cotas.cabeza-cotas.piso-cotas.figura)<1e-6,'Escala humana inconsistente');
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
  poses.explosion='vista=habitat&ui=0&sol=62&theta=-0.62&phi=1.10&dist=12.4&play=0&explosion=1';
  // Revalidar una extracción sin volver a renderizar las capturas ya revisadas.
  for(const [nombre,q] of Object.entries(process.env.MILPA_SIN_CAPTURAS==='1'?{}:poses)){
    await cdp('Page.navigate',{url:url+'?'+q});await esperar('typeof refsHab!=="undefined"&&refsHab&&!document.getElementById("carga")');
    await evaluar('camara.position.copy(new THREE.Vector3(mira.x+orbe.dist*Math.sin(orbe.phi)*Math.cos(orbe.theta),mira.y+orbe.dist*Math.cos(orbe.phi),mira.z+orbe.dist*Math.sin(orbe.phi)*Math.sin(orbe.theta)))');
    if(nombre==='tecnica')await evaluar('abrirTecnica()');
    await evaluar('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');
    console.log('Captura: '+nombre);
    const imagen=await cdp('Page.captureScreenshot',{format:'png'});
    await writeFile(path.join(capturas,nombre+'.png'),Buffer.from(imagen.data,'base64'));
    if(nombre==='hero'&&process.env.MILPA_EXPORT_GLB==='1'){
      // Exportación de mallas ya evaluadas; Blender aplica el cambio Y-arriba → Z-arriba.
      // Sin un segundo motor ni un cargador añadido a la demo offline.
      const largo=await evaluar(`(()=>{gHabitat.updateMatrixWorld(true);const geometrias={},materiales={},texturas={},objetos=[];gHabitat.traverseVisible(o=>{if(!o.isMesh||!o.material.visible||Array.isArray(o.material))return;const g=o.geometry,m=o.material;if(!g.attributes.position)return;if(!geometrias[g.uuid])geometrias[g.uuid]={pos:Array.from(g.attributes.position.array),normales:g.attributes.normal?Array.from(g.attributes.normal.array):null,uv:g.attributes.uv?Array.from(g.attributes.uv.array):null,index:g.index?Array.from(g.index.array):null};if(!materiales[m.uuid]){materiales[m.uuid]={color:m.color.toArray(),metal:m.metalness||0,rough:m.roughness??1,alpha:m.opacity,map:m.map?.uuid};if(m.map&&!texturas[m.map.uuid]&&m.map.image?.toDataURL)texturas[m.map.uuid]={png:m.map.image.toDataURL('image/png'),repeat:m.map.repeat.toArray()};}const add=(matrix,nombre)=>objetos.push({nombre,geometria:g.uuid,material:m.uuid,matrix:matrix.toArray()});if(o.isInstancedMesh){for(let i=0;i<o.count;i++){const mat=new THREE.Matrix4();o.getMatrixAt(i,mat);add(o.matrixWorld.clone().multiply(mat),(o.name||'pieza')+'-'+i);}}else add(o.matrixWorld,o.name||'pieza');});globalThis.mallasExport=JSON.stringify({tipo:'Mallas nominales Three160, no CAD ni fabricación',parametros:GEOM,sol:modelo.estado.sol,geometrias,materiales,texturas,objetos});return mallasExport.length;})()`);
      await mkdir(path.join(raiz,'outputs/madrid-s5'),{recursive:true});
      const salida=path.join(raiz,'outputs/madrid-s5/escena-three.json');await writeFile(salida,'');
      console.log('Exportando '+largo+' caracteres en bloques');
      for(let i=0;i<largo;i+=65536)await appendFile(salida,await evaluar(`mallasExport.slice(${i},${i+65536})`));
      console.log('Mallas de escena nominal exportadas para Blender');
    }
  }
  assert.deepEqual(errores,[],'Errores de consola');
  assert.deepEqual(peticiones.filter(u=>/^https?:/.test(u)),[],'La demo solicita Internet');
  const informe={fecha:new Date().toISOString(),prueba:'Chrome headless, red deshabilitada, file://',browser:await cdp('Browser.getVersion'),cpu:os.cpus()[0].model,plataforma:os.platform(),...hardware,cotas,piso,rendimiento,limite:gpu?'GPU local; no prueba del equipo del evento':'SwiftShader por software; NO prueba del equipo del evento',controles:process.env.MILPA_SOLO_CAPTURAS==='1'?'omitidos; sólo capturas':'pausa, avance, reset, fallos, cuarentena, vistas, fichas, despiece, selección y comparación comprobados',errores,solicitudesHTTP:0};
  await writeFile(path.join(raiz,'docs/madrid/PRUEBA-P3-NAVEGADOR.json'),JSON.stringify(informe,null,2)+'\n');
  console.log(JSON.stringify(informe,null,2));
  }
} finally {if(socket)socket.close();chrome.kill('SIGTERM');}
