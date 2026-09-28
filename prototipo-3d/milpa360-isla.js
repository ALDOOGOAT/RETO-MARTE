/* Isla de voz: cápsula bajo la barra que se abre en diálogo y lee en voz alta.
   El texto completo aparece desde el principio y se ilumina frase a frase con los tiempos exactos
   de la síntesis: nada salta ni cambia de altura mientras habla. Voces pregrabadas
   (milpa360-voces.js): funcionan sin red y suenan igual que el pitch.
   MILPA_ISLA.montar(padre, {base}) · .decir(clave, titulo) · .callar() · .pista(texto) */
(function(){
  const pick=(es,en)=>window.MILPA_I18N?MILPA_I18N.pick(es,en):es;
  const lang=()=>window.MILPA_I18N?.lang==='en'?'en':'es';
  const plano=s=>s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
  const reloj=s=>Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');
  let base='',raiz,orbe,titulo,tiempo,pistaEl,cuerpo,silencio,cerrar,progreso,audio;
  let actual=null,raf=0,cierre=0,textoPista='',frases=[],indice=-2,segundo=-1;
  let mudo=false;try{mudo=localStorage.getItem('milpa-voz')==='off';}catch{}
  const reducido=matchMedia('(prefers-reduced-motion: reduce)');
  const altavoz='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path class="onda" d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/><path class="tachado" d="M16 9.5l5 5M21 9.5l-5 5"/></svg>';

  // base: ruta hasta prototipo-3d/ desde la página que monta la isla (el Atlas vive en visuales/).
  function montar(padre=document.body,opciones={}){
    base=opciones.base||'';
    if(raiz)return api;
    raiz=document.createElement('div');raiz.id='isla';raiz.className='isla';raiz.dataset.estado='reposo';raiz.setAttribute('role','region');
    raiz.innerHTML=`<button class="isla-orbe" type="button"><span class="isla-barras" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span></button>
      <div class="isla-texto"><div class="isla-cabeza"><b class="isla-titulo"></b><span class="isla-tiempo" aria-hidden="true"></span></div>
        <p class="isla-pista"></p><p class="isla-cuerpo"></p></div>
      <div class="isla-acciones"><button class="isla-silencio" type="button">${altavoz}</button><button class="isla-cerrar" type="button" aria-hidden="true">×</button></div>
      <span class="isla-progreso" aria-hidden="true"></span>`;
    padre.appendChild(raiz);
    [orbe,titulo,tiempo,pistaEl,cuerpo,silencio,cerrar,progreso]=['.isla-orbe','.isla-titulo','.isla-tiempo','.isla-pista','.isla-cuerpo','.isla-silencio','.isla-cerrar','.isla-progreso'].map(s=>raiz.querySelector(s));
    audio=new Audio();audio.preload='auto';
    audio.addEventListener('ended',terminar);
    audio.addEventListener('pause',()=>{if(actual&&!audio.ended)estado('pausa');});
    audio.addEventListener('play',()=>{if(actual)estado('hablando');bucle();});
    orbe.onclick=()=>{if(!actual)return;if(audio.paused){if(audio.ended)audio.currentTime=0;audio.play().catch(()=>{});}else audio.pause();};
    silencio.onclick=()=>{mudo=!mudo;audio.muted=mudo;try{localStorage.setItem('milpa-voz',mudo?'off':'on');}catch{}etiquetas();};
    cerrar.onclick=callar;
    addEventListener('keydown',e=>{if(e.key==='Escape'&&actual)callar();});
    addEventListener('milpa-language',etiquetas);
    etiquetas();
    return api;
  }
  function etiquetas(){
    if(!raiz)return;
    raiz.setAttribute('aria-label',pick('Voz del recorrido','Tour voice'));
    silencio.setAttribute('aria-pressed',String(mudo));
    silencio.setAttribute('aria-label',mudo?pick('Activar la voz','Turn voice on'):pick('Silenciar la voz','Mute voice'));
    silencio.title=silencio.getAttribute('aria-label');
    cerrar.setAttribute('aria-label',pick('Cerrar','Close'));cerrar.title=cerrar.getAttribute('aria-label');
    orbe.setAttribute('aria-label',!actual?pick('Voz lista','Voice ready'):audio.paused?pick('Seguir escuchando','Resume'):pick('Pausar la voz','Pause voice'));
    raiz.classList.toggle('mudo',mudo);
    pistaEl.textContent=textoPista;
  }
  function estado(e){raiz.dataset.estado=e;document.body.classList.toggle('isla-abierta',e!=='reposo');cerrar.setAttribute('aria-hidden',String(e==='reposo'));etiquetas();}
  const voz=clave=>window.MILPA_VOCES?.[lang()]?.[clave];
  // La frase que se está diciendo se ilumina; las dichas quedan legibles y las que faltan, atenuadas.
  function marcar(i){
    if(i===indice)return;indice=i;
    titulo.classList.toggle('ahora',frases[0]?.titulo&&i===0);
    frases.forEach((f,k)=>{if(!f.el)return;f.el.classList.toggle('ahora',k===i);f.el.classList.toggle('dicha',k<i||i===frases.length);});
    const el=frases[i]?.el;
    if(el&&cuerpo.scrollHeight>cuerpo.clientHeight)cuerpo.scrollTo({top:Math.max(0,el.offsetTop-cuerpo.offsetTop-2),behavior:reducido.matches?'auto':'smooth'});
  }
  function bucle(){
    cancelAnimationFrame(raf);
    const v=actual&&voz(actual.clave);if(!v)return;
    const t=audio.currentTime,i=frases.findIndex(f=>t<f.fin+.15);
    marcar(i<0?frases.length:i);
    if(Math.floor(t)!==segundo){segundo=Math.floor(t);tiempo.textContent=reloj(t)+' / '+reloj(v.dur);}
    progreso.style.transform=`scaleX(${Math.min(1,t/Math.max(.1,v.dur))})`;
    if(!audio.paused)raf=requestAnimationFrame(bucle);
  }
  function decir(clave,tit){
    if(!raiz)montar();
    clearTimeout(cierre);cancelAnimationFrame(raf);
    const v=voz(clave);
    actual={clave};indice=-2;segundo=-1;titulo.textContent=tit||'';titulo.classList.remove('ahora');
    progreso.style.transform='scaleX(0)';cuerpo.textContent='';cuerpo.scrollTop=0;
    // La primera frase suele ser el propio título: se dice, pero no se repite en el cuerpo.
    frases=(v?.frases||[]).map(([inicio,fin,texto],k)=>({inicio,fin,texto,titulo:k===0&&plano(texto)===plano(tit||'')}));
    for(const f of frases){if(f.titulo)continue;f.el=document.createElement('span');f.el.className='frase';f.el.textContent=f.texto+' ';cuerpo.appendChild(f.el);}
    if(!v){estado('pausa');return;}
    tiempo.textContent='0:00 / '+reloj(v.dur);
    audio.src=base+v.src;audio.muted=mudo;audio.currentTime=0;
    estado('hablando');marcar(0);
    // Sin gesto previo el navegador puede negar el audio: el texto queda y el orbe lo reanuda.
    audio.play().catch(()=>estado('pausa'));
  }
  function terminar(){
    marcar(frases.length);progreso.style.transform='scaleX(1)';
    estado('fin');
    cierre=setTimeout(callar,reducido.matches?7000:4200);
  }
  function callar(){
    clearTimeout(cierre);cancelAnimationFrame(raf);
    if(audio&&!audio.paused)audio.pause();
    actual=null;frases=[];if(!raiz)return;
    titulo.textContent='';cuerpo.textContent='';tiempo.textContent='';progreso.style.transform='scaleX(0)';
    estado('reposo');
  }
  function pista(texto){textoPista=texto||'';if(raiz)pistaEl.textContent=textoPista;}
  const api={montar,decir,callar,pista,get hablando(){return !!actual&&!!audio&&!audio.paused;},get mudo(){return mudo;},
    get clave(){return actual?.clave||null;},get segundo(){return audio?audio.currentTime:0;}};
  window.MILPA_ISLA=api;
})();
