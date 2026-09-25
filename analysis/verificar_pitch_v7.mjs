// node --experimental-websocket analysis/verificar_p3_navegador.mjs
// Chrome aislado, sin red; sólo stdlib y el cliente WebSocket nativo de Node 20.
import assert from 'node:assert/strict';
import {spawn,execFileSync} from 'node:child_process';
import {mkdtemp,writeFile,appendFile,mkdir,readFile} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const raiz=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const perfil=await mkdtemp(path.join(os.tmpdir(),'milpa-chrome-'));
const gpu=process.env.MILPA_GPU==='1';
const graficos=gpu?['--enable-gpu','--use-gl=angle','--use-angle=gl']:['--enable-unsafe-swiftshader','--use-angle=swiftshader'];
const ventana=process.env.MILPA_VISIBLE==='1'?['--ozone-platform=x11','--window-size=1920,1080']:['--headless=new'];
const chrome=spawn('google-chrome',[...ventana,'--mute-audio','--autoplay-policy=no-user-gesture-required','--no-sandbox',...(process.env.MILPA_FILE_ESTRICTO==='1'?[]:['--allow-file-access-from-files']),'--disable-dev-shm-usage',...graficos,'--remote-debugging-port=0','--no-first-run','--no-default-browser-check','--disable-background-networking','--user-data-dir='+perfil,'about:blank'],{stdio:['ignore','ignore','pipe']});
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
  let onFrame=()=>{};let id=0;const pendientes=new Map(),errores=[],peticiones=[];
  socket.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pendientes.get(m.id);pendientes.delete(m.id);if(!p)return;m.error?p.reject(new Error(JSON.stringify(m.error))):p.resolve(m.result);}else if(m.method==='Page.screencastFrame')onFrame(m.params);else if(m.method==='Runtime.consoleAPICalled'&&['error','assert'].includes(m.params.type))errores.push(m.params);else if(m.method==='Runtime.exceptionThrown')errores.push(m.params.exceptionDetails);else if(m.method==='Log.entryAdded'&&m.params.entry.level==='error')errores.push(m.params.entry);else if(m.method==='Network.requestWillBeSent')peticiones.push(m.params.request.url);};
  const cdp=(method,params={})=>new Promise((resolve,reject)=>{const numero=++id;const limite=setTimeout(()=>{pendientes.delete(numero);reject(new Error("Timeout CDP: "+method));},60000);pendientes.set(numero,{resolve:r=>{clearTimeout(limite);resolve(r)},reject:e=>{clearTimeout(limite);reject(e)}});socket.send(JSON.stringify({id:numero,method,params}));});
  const evaluar=async expression=>{const r=await cdp('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true,userGesture:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
  const esperar=async expression=>{const limite=Date.now()+60000;while(Date.now()<limite){try{if(await evaluar(expression))return;}catch{}await new Promise(r=>setTimeout(r,250));}throw new Error('No se cumplió: '+expression+' errores '+JSON.stringify(errores));};
  await cdp('Runtime.enable');await cdp('Log.enable');await cdp('Network.enable');
  await cdp('Network.emulateNetworkConditions',{offline:true,latency:0,downloadThroughput:0,uploadThroughput:0});
  await cdp('Network.setBlockedURLs',{urls:['http://*','https://*']});
  await cdp('Emulation.setDeviceMetricsOverride',{width:1920,height:1080,deviceScaleFactor:1,mobile:false});

  // MILPA_REVISION=V8 escribe en carpetas propias y conserva la evidencia de revisiones anteriores.
  const REV=process.env.MILPA_REVISION||'V7',rev=REV.toLowerCase();
  const out=path.join(raiz,'outputs/pitch-'+rev),caps=path.join(raiz,'docs/madrid/capturas-'+rev);await mkdir(out,{recursive:true});await mkdir(caps,{recursive:true});
  const snap=async name=>writeFile(path.join(caps,name+'.png'),Buffer.from((await cdp('Page.captureScreenshot',{format:'png'})).data,'base64'));
  await cdp('Page.navigate',{url:pathToFileURL(path.join(raiz,'prototipo-3d/milpa360-simulador.html')).href+'?vista=habitat&play=0&sol=62'});
  await esperar('typeof refsHab!=="undefined"&&refsHab&&!document.getElementById("carga")');
  const gpuName=await evaluar(`(()=>{const gl=renderer.getContext();return gl.getParameter(gl.getExtension('WEBGL_debug_renderer_info').UNMASKED_RENDERER_WEBGL)})()`);
  if(gpu)assert.ok(!/SwiftShader|llvmpipe/i.test(gpuName));
  assert.ok(await evaluar('comprobarVisual().every(c=>c.ok)'));
  await evaluar('document.getElementById("calidad").value="alta";document.getElementById("calidad").dispatchEvent(new Event("change"));');
  await snap('01-interior');
  await evaluar('window.personaRevision=MILPA_PERSONA(1.75);escena.add(personaRevision);gHabitat.visible=false;Object.assign(orbe,{theta:1.35,phi:1.36,dist:3.1});mira.set(0,.94,0);personaRevision.userData.animar(0,0,"inspeccion",0);document.body.classList.add("captura");medir();');
  await new Promise(r=>setTimeout(r,1000));await snap('02-persona');
  await evaluar('escena.remove(personaRevision);gHabitat.visible=true;document.body.classList.remove("captura");aplicarVista("habitat");');
  assert.ok(await evaluar(`(()=>{const h=gHabitat.getObjectByName('rostro-escaneado');let disposed=false;const mark=()=>disposed=true;h.geometry.addEventListener('dispose',mark);h.material.addEventListener('dispose',mark);comprobarVisual();h.geometry.removeEventListener('dispose',mark);h.material.removeEventListener('dispose',mark);return !disposed})()`),'Validación liberó recursos compartidos del rostro');
  const baseline=await evaluar('JSON.stringify(modelo.estado)');
  const perf=[];
  for(const quality of ['alta','maxima']){
    await evaluar(`document.getElementById('calidad').value='${quality}';document.getElementById('calidad').dispatchEvent(new Event('change'));`);
    await new Promise(r=>setTimeout(r,900));
    perf.push(await evaluar(`new Promise(resolve=>{const t0=performance.now(),frames=[];let last=t0;function frame(t){frames.push(t-last);last=t;if(t-t0<4000)requestAnimationFrame(frame);else{frames.sort((a,b)=>a-b);resolve({quality:'${quality}',fps:frames.length*1000/(t-t0),p95:frames[Math.floor(frames.length*.95)],calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,resolution:[lienzo.width,lienzo.height]})}}requestAnimationFrame(frame)})`));
  }
  console.log('Rendimiento',JSON.stringify(perf));
  // Precarga de GPU y acceso antes de medir la narración. No depende de red ni permisos file://.
  await evaluar('document.getElementById("intro-cine").click();');await esperar('cine.state.audioListo');
  await evaluar('cine.pause();');
  for(let i=0;i<8;i++){await evaluar(`cine.go(${i});`);await new Promise(r=>setTimeout(r,160));assert.equal(await evaluar('document.getElementById("cine-alert").textContent'),'');}
  await evaluar('cine.stop();');assert.equal(await evaluar('JSON.stringify(modelo.estado)'),baseline);
  const durations=[];
  for(const lang of ['es','en']){
    await evaluar(`MILPA_I18N.set('${lang}');document.body.classList.add('grabando');cine.start(true);`);await esperar('cine.state.audioListo');await evaluar('cine.pause();cine.go(0);');await esperar('cine.audio.readyState>=3');
    await evaluar('refsHab.cierre=1;');
    const capture=process.argv.includes('--exportar')&&lang==='es',frames=[],writes=[];
    let frameDir;
    if(capture){
      frameDir=await mkdtemp(path.join(os.tmpdir(),'milpa-'+rev+'-frames-'));
      onFrame=p=>{const f=path.join(frameDir,String(frames.length).padStart(5,'0')+'.jpg');frames.push({f,t:p.metadata.timestamp});writes.push(writeFile(f,Buffer.from(p.data,'base64')));cdp('Page.screencastFrameAck',{sessionId:p.sessionId}).catch(()=>{});};
      await cdp('Page.startScreencast',{format:'jpeg',quality:92,maxWidth:1920,maxHeight:1080,everyNthFrame:1});
    }
    await evaluar('window.pitchStarted=performance.now();window.pitchLog=[];window.pitchLoads=0;cine.audio.addEventListener("loadstart",()=>pitchLoads++);cine.pause(false);');
    const start=Date.now();let chapter=-1;
    while(Date.now()-start<58000){
      const status=await evaluar('({i:cine.state.indice,t:cine.state.tiempo,done:cine.state.terminado,alert:document.getElementById("cine-alert").textContent,a:estadoAccesoCine,paused:!cine.state.reproduciendo,loads:pitchLoads})');
      assert.equal(status.alert,'');assert.ok(!status.paused||status.done,'Pitch interrumpido');
      if(status.i!==chapter){if(chapter===6)assert.equal(status.a.ocupado,false,'La salida no terminó dentro de su capítulo');chapter=status.i;durations.push({lang,chapter,time:status.t,wall:(Date.now()-start)/1000});console.log(lang,chapter,status.t.toFixed(2));if(!capture&&lang==='en'){await snap('pitch-'+String(chapter+1).padStart(2,'0'));}}
      if(status.done){durations.push({lang,fin:true,tiempo:status.t,wall:(Date.now()-start)/1000});assert.equal(chapter,7);assert.equal(status.loads,0,'La pista se volvió a cargar entre capítulos');break;}
      await new Promise(r=>setTimeout(r,100));
    }
    assert.ok(await evaluar('cine.state.terminado'),'No terminó en menos de un minuto');assert.ok(Date.now()-start<58000);
    if(capture){
      await cdp('Page.stopScreencast');await Promise.all(writes);onFrame=()=>{};
      assert.ok(frames.length>500,'Captura insuficiente');
      const list=frames.map((f,i)=>`file '${f.f}'\nduration ${i<frames.length-1?Math.max(.001,frames[i+1].t-f.t):1/30}\n`).join('')+`file '${frames.at(-1).f}'\n`;
      const concat=path.join(frameDir,'frames.txt');await writeFile(concat,list);
      const duration=await evaluar('MILPA_AUDIO["pitch-es"].duracion');
      execFileSync('ffmpeg',['-y','-v','error','-f','concat','-safe','0','-i',concat,'-i',path.join(raiz,'prototipo-3d/audio/pitch-es.mp3'),'-t',String(duration+.3),'-vf','fps=30,format=yuv420p','-c:v','libx264','-preset','fast','-crf','18','-c:a','aac','-b:a','192k','-movflags','+faststart',path.join(out,'MILPA-360-pitch-es.mp4')],{timeout:60000});
      const file=path.join(out,'MILPA-360-pitch-es.mp4');const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-show_entries','format=duration:stream=codec_type,width,height,r_frame_rate','-of','json',file],{encoding:'utf8'}));assert.ok(Number(probe.format.duration)<60);await writeFile(path.join(out,'VERIFICACION-VIDEO.json'),JSON.stringify({capturas:frames.length,duracionCaptura:frames.at(-1).t-frames[0].t,...probe},null,2));console.log('MP4',frames.length,'fotogramas capturados');
    }
    await evaluar('cine.stop();document.body.classList.remove("grabando");');assert.equal(await evaluar('JSON.stringify(modelo.estado)'),baseline);
  }
  await evaluar('MILPA_I18N.set("es");cine.start(true);');await esperar('cine.state.audioListo');await evaluar('cine.pause();');
  const paused=await evaluar('cine.state.tiempo');await new Promise(r=>setTimeout(r,350));assert.equal(await evaluar('cine.state.tiempo'),paused);
  await evaluar('cine.go(5);');await esperar('cine.state.indice===5');assert.ok(await evaluar('modelo.estado.bomba'));
  await evaluar('MILPA_I18N.set("en");');await esperar('cine.audio.src.endsWith("pitch-en.mp3")');
  await evaluar('document.getElementById("cine-voice").click();cine.go(7);cine.pause(false);');await esperar('cine.state.tiempo>MILPA_AUDIO["pitch-en"].capitulos[7].inicio+.25');
  await evaluar('cine.stop();');
  await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  assert.ok(await evaluar('document.documentElement.scrollWidth<=innerWidth'));assert.ok(await evaluar('(()=>{const r=document.getElementById("intro-cine").getBoundingClientRect();return r.width>=210&&r.height<=52})()'));await snap('03-movil');
  const remote=peticiones.filter(u=>/^https?:/.test(u));assert.deepEqual(remote,[]);assert.deepEqual(errores,[]);
  const report={revision:REV,gpu:gpuName,rendimiento:perf,capitulos:durations,errores,red:remote,checks:await evaluar('comprobarVisual()'),pruebas:['ES/EN completos <58 s','pista continua sin recargas','pausa, salto, cambio de idioma y sin voz','restauración del modelo','file:// estricto sin red','móvil 390 × 844'],limite:'Simulación digital; acceso y procesos pendientes de prueba física.'};
  await writeFile(path.join(raiz,'docs/madrid/PRUEBA-VISUAL-'+REV+'.json'),JSON.stringify(report,null,2)+'\n');console.log(REV+': verificación completa.');
} finally {socket?.close();chrome.kill('SIGTERM');}
