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

  const anterior=process.argv[2];if(!anterior)throw Error('Indique la carpeta de la versión anterior como primer argumento.');
  const resultados=[];
  for(const [revision,base] of [['V5',path.resolve(anterior)],['V6',path.join(raiz,'prototipo-3d')],['V6',path.join(raiz,'prototipo-3d')],['V5',path.resolve(anterior)]]){
    await cdp('Page.navigate',{url:pathToFileURL(path.join(base,'milpa360-simulador.html')).href+'?vista=habitat&play=0&sol=62&ambiente=marte&lang=es'});
    await esperar('typeof refsHab!=="undefined"&&refsHab&&!document.getElementById("carga")');
    await evaluar('document.getElementById("calidad").value="alta";document.getElementById("calidad").dispatchEvent(new Event("change"));Object.assign(orbe,{theta:-.62,phi:1,dist:11.4});mira.set(0,1,0);S.reducido=false;S.play=false;S.presentacion=true;');
    await evaluar('new Promise(r=>setTimeout(r,2000))');
    const datos=await evaluar(`new Promise(resolve=>{let times=[],previous=performance.now(),begin=previous,raf;function f(now){times.push(now-previous);previous=now;raf=requestAnimationFrame(f);}raf=requestAnimationFrame(f);setTimeout(()=>{cancelAnimationFrame(raf);const duration=performance.now()-begin,gl=renderer.getContext(),ext=gl.getExtension('WEBGL_debug_renderer_info');times.sort((a,b)=>a-b);resolve({fps:times.length*1000/duration,p95Ms:times[Math.floor(times.length*.95)],frames:times.length,duracionMs:duration,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,viewport:[innerWidth,innerHeight],resolucion:[lienzo.width,lienzo.height],gpu:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):'desconocido',hidden:document.hidden});},6000);})`);
    assert.equal(datos.hidden,false);if(gpu)assert.ok(!/SwiftShader|llvmpipe/.test(datos.gpu));
    resultados.push({revision,...datos});console.log(revision,JSON.stringify(datos));
  }
  assert.deepEqual(errores,[]);assert.deepEqual(peticiones.filter(u=>/^https?:/.test(u)),[]);
  const informe={fecha:new Date().toISOString(),metodo:'V5/V6/V6/V5, mismo Chrome aislado y GPU, 1920x1080, DPR1, detalle alto, sombras activas, sol62, proceso pausado y órbita de cámara, entorno marciano en ambas; calentamiento2s y muestreo6s por pasada',resultados,limite:'Medición local bajo carga variable; no acredita el equipo del evento.'};
  await writeFile(path.join(raiz,'docs/madrid/COMPARACION-RENDIMIENTO-V6.json'),JSON.stringify(informe,null,2)+'\n');
}finally{socket?.close();chrome.kill('SIGTERM');}
