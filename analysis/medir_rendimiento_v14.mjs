// MILPA_GPU=1 MILPA_VISIBLE=1 node --experimental-websocket analysis/medir_rendimiento_v14.mjs /tmp/milpa-v14-intel.json
// Misma escena y poses en cada pasada. Sin GPU Intel, sólo son métricas proxy.
import {spawn} from 'node:child_process';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';

const raiz=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const salida=process.argv[2];
if(!salida)throw Error('Indique el JSON de salida');
const perfil=await mkdtemp(path.join(os.tmpdir(),'milpa-v14-'));
const gpuReal=process.env.MILPA_GPU==='1';
const visible=process.env.MILPA_VISIBLE==='1';
const chrome=spawn('google-chrome',[
  ...(visible?['--ozone-platform=x11','--window-size=1920,1080']:['--headless=new']),
  ...(gpuReal?['--enable-gpu','--use-gl=angle','--use-angle=gl']:['--enable-unsafe-swiftshader','--use-angle=swiftshader']),
  '--no-sandbox',
  '--disable-dev-shm-usage','--allow-file-access-from-files','--autoplay-policy=no-user-gesture-required','--disable-background-networking',
  '--no-first-run','--no-default-browser-check','--remote-debugging-port=0',
  '--user-data-dir='+perfil,'about:blank'
],{stdio:['ignore','ignore','pipe']});
let socket;
try{
  const puerto=await new Promise((resolve,reject)=>{
    let stderr='';const limite=setTimeout(()=>reject(Error('Chrome no arrancó: '+stderr.slice(-1500))),20000);
    chrome.stderr.on('data',data=>{stderr+=data;const m=stderr.match(/DevTools listening on ws:\/\/127\.0\.0\.1:(\d+)/);
      if(m){clearTimeout(limite);resolve(Number(m[1]));}});
    chrome.on('exit',code=>{clearTimeout(limite);reject(Error('Chrome terminó '+code+': '+stderr.slice(-1500)));});
  });
  const paginas=await(await fetch(`http://127.0.0.1:${puerto}/json/list`)).json();
  socket=new WebSocket(paginas.find(p=>p.type==='page').webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject;});
  let id=0;const pendientes=new Map(),errores=[];
  socket.onmessage=e=>{const m=JSON.parse(e.data);
    if(m.id){const p=pendientes.get(m.id);pendientes.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);}
    else if(m.method==='Runtime.exceptionThrown')errores.push(m.params.exceptionDetails.text);
  };
  const cdp=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pendientes.set(n,{resolve,reject});socket.send(JSON.stringify({id:n,method,params}));});
  const evaluar=async expression=>{const r=await cdp('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
    if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
  const esperar=async expression=>{for(let i=0;i<240;i++){try{if(await evaluar(expression))return;}catch{}await new Promise(r=>setTimeout(r,250));}throw Error('Carga incompleta: '+expression+' '+errores);};
  await cdp('Runtime.enable');
  await cdp('Network.enable');
  await cdp('Network.setBlockedURLs',{urls:['http://*','https://*']});
  await cdp('Emulation.setDeviceMetricsOverride',{width:1920,height:1080,deviceScaleFactor:1,mobile:false});
  await cdp('Page.navigate',{url:pathToFileURL(path.join(raiz,'prototipo-3d/milpa360-simulador.html')).href+'?vista=habitat&play=0&sol=0&lang=es'});
  await esperar('typeof refsHab!=="undefined"&&refsHab&&!document.getElementById("carga")');
  const gpu=await evaluar('(()=>{const gl=renderer.getContext(),e=gl.getExtension("WEBGL_debug_renderer_info");return e?gl.getParameter(e.UNMASKED_RENDERER_WEBGL):"desconocida"})()');
  if(gpuReal&&!/Intel/i.test(gpu))throw Error('La medición solicitada no usa Intel: '+gpu);
  // Envolver el callback ya existente mide actualización + envío de render, sin editar el bucle.
  await evaluar(`(()=>{const raf=window.requestAnimationFrame.bind(window);window.__v14=[];
    window.requestAnimationFrame=fn=>raf(t=>{const a=performance.now();fn(t);if(fn===bucle)window.__v14.push(performance.now()-a);});
    S.reducido=false;S.play=false;S.presentacion=false;return true;})()`);
  const poses=[
    ['general',`Object.assign(orbe,{theta:-.62,phi:1,dist:11.4});mira.set(0,1,0);MILPA_DESPIECE.armar();`],
    ['despiece',`MILPA_DESPIECE.estallar();`],
    ['detalle',`MILPA_DESPIECE.armar();Object.assign(orbe,{theta:-.62,phi:.85,dist:1.6});mira.set(1.4,.7,0);`],
    ['inspeccion_despiece',`Object.assign(orbe,{theta:-.62,phi:1,dist:11.4});mira.set(0,1,0);MILPA_DESPIECE.estallar();MILPA_INSPECCION.entrar('cartucho-09');`]
  ];
  const medidas=[];
  for(const [pose,accion] of poses){
    await evaluar(accion);await new Promise(r=>setTimeout(r,2500));
    await evaluar('window.__v14.length=0;window.__v14Inicio=performance.now()');await new Promise(r=>setTimeout(r,4000));
    medidas.push(await evaluar(`(()=>{const t=window.__v14.slice().sort((a,b)=>a-b),r=renderer.info.render;
      const duracionMs=performance.now()-window.__v14Inicio;
      return {pose:${JSON.stringify(pose)},frames:t.length,duracionMs:+duracionMs.toFixed(1),
        fpsIntel:${gpuReal}?+(t.length*1000/duracionMs).toFixed(1):null,
        jsMedianaMs:+t[Math.floor(t.length/2)].toFixed(3),jsP95Ms:+t[Math.floor(t.length*.95)].toFixed(3),
        drawCalls:r.calls,triangulos:r.triangles,pixelRatio:renderer.getPixelRatio(),
        gotas:MILPA_VFX.instancias.gotas,gotasInspeccion:MILPA_VFX.instancias.gotasInspeccion,
        piezas:MILPA_DESPIECE.piezas().length,despieceT:MILPA_DESPIECE.t};})()`));
  }
  const informe={fecha:new Date().toISOString(),tipo:gpuReal?'GPU Intel':'proxy',gpu,
    metodo:'Chrome 1920x1080 DPR1, sol0, play=0, ES, VFX por defecto; 2.5 s estabilización y 4 s muestreo por pose. Tiempo JS: callback bucle completo, incluida llamada renderer.render. renderer.info.render del último fotograma.',medidas,errores};
  await writeFile(salida,JSON.stringify(informe,null,2)+'\n');console.log(JSON.stringify(informe));
}finally{socket?.close();chrome.kill('SIGTERM');await rm(perfil,{recursive:true,force:true}).catch(()=>{});}
