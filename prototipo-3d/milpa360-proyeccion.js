/* Recorrido narrado compartido. Audio local; el reloj de exposición no altera la biología. */
(function(){
  const pick=(es,en)=>MILPA_I18N.pick(es,en);
  window.MILPA_PROYECCION=function({tipo,entrar,fotograma,salir,pausar}){
    const chapters=MILPA_GUION[tipo],audio=new Audio();audio.preload='auto';audio.volume=.85;
    const panel=document.createElement('section');panel.id='cine';panel.hidden=true;panel.setAttribute('aria-label','Recorrido narrado');
    panel.innerHTML=`<div class="cine-top"><b>MILPA-360 <span>BioMars Chiapas</span></b><span id="cine-count"></span><button id="cine-full" aria-label="Pantalla completa">⛶</button><button id="cine-close"></button></div>
      <div class="cine-heading"><p id="cine-idea"></p><h2 id="cine-title"></h2></div>
      <div class="cine-bottom"><p id="cine-subtitle" aria-live="off"></p><div id="cine-progress"></div>
      <div class="cine-controls"><button id="cine-prev"></button><button id="cine-play"></button><button id="cine-next"></button>
      <button id="cine-voice" aria-pressed="true"></button><label class="cine-volume"><span id="cine-volume-label"></span><input id="cine-volume" type="range" min="0" max="1" step=".05" value=".85"></label>
      <button id="cine-language"></button><button id="cine-loop" aria-pressed="false"></button></div>
      <p id="cine-note"></p><p id="cine-alert" role="status"></p></div>`;
    document.body.appendChild(panel);
    const $=id=>document.getElementById(id);
    const state={activo:false,reproduciendo:false,indice:0,tiempo:0,voz:true,bucle:false,terminado:false,audioListo:false};
    let token=0,prevFocus=null,subtitle='',ready=false;
    function info(){return window.MILPA_AUDIO?.[chapters[state.indice].id+'-'+MILPA_I18N.lang];}
    function duracion(){return Math.max(chapters[state.indice].min,(info()?.duracion||25)+2);}
    function controls(){
      $('cine-close').textContent=pick('Salir del recorrido','Exit tour');
      $('cine-prev').textContent=pick('Anterior','Previous');$('cine-next').textContent=pick('Siguiente','Next');
      $('cine-play').textContent=state.terminado?pick('Repetir recorrido','Replay tour'):state.reproduciendo?pick('Pausar','Pause'):pick('Continuar','Continue');
      $('cine-prev').disabled=state.indice===0;$('cine-next').disabled=state.indice===chapters.length-1;
      $('cine-voice').textContent=state.voz?pick('Voz activada','Voice on'):pick('Activar voz','Enable voice');$('cine-voice').setAttribute('aria-pressed',String(state.voz));
      $('cine-language').textContent=MILPA_I18N.lang==='es'?'English':'Español';
      $('cine-loop').textContent=pick('Repetición','Loop');$('cine-loop').setAttribute('aria-pressed',String(state.bucle));
      $('cine-volume-label').textContent=pick('Volumen','Volume');$('cine-volume').setAttribute('aria-label',pick('Volumen de narración','Narration volume'));
      $('cine-note').textContent=pick('Voz sintética · concepto en evaluación · Escape para salir','Synthetic voice · concept under evaluation · Escape to exit');
    }
    function audioError(){
      if(!state.activo||!state.voz)return;
      state.voz=false;audio.pause();state.audioListo=false;
      $('cine-alert').textContent=pick('No se pudo reproducir la voz. Continúa con subtítulos o pulsa «Voz» para reintentar.','Voice could not play. Continue with captions or press “Voice” to retry.');controls();
    }
    audio.addEventListener('error',audioError);
    function playAudio(){
      if(!state.activo||!state.reproduciendo||!state.voz||audio.ended)return;
      const n=token;audio.play().then(()=>{if(n===token)state.audioListo=true;}).catch(e=>{if(n===token&&e.name!=='AbortError')audioError();});
    }
    function cargarAudio(){
      ++token;audio.pause();state.audioListo=false;
      audio.src='audio/'+chapters[state.indice].id+'-'+MILPA_I18N.lang+'.mp3';audio.load();playAudio();
    }
    async function capitulo(index){
      state.indice=Math.max(0,Math.min(chapters.length-1,index));state.tiempo=0;state.terminado=false;subtitle='';ready=false;
      const n=++token;audio.pause();$('cine-alert').textContent='';
      const c=chapters[state.indice],copy=c[MILPA_I18N.lang];
      $('cine-title').textContent=copy.titulo;$('cine-idea').textContent=copy.idea;
      $('cine-subtitle').textContent=copy.voz.split(/(?<=[.!?])\s+/)[0];
      $('cine-count').textContent=pick('Capítulo','Chapter')+' '+(state.indice+1)+' / '+chapters.length;
      $('cine-progress').innerHTML=chapters.map((c,i)=>`<button aria-label="${pick('Capítulo','Chapter')} ${i+1}" aria-current="${i===state.indice?'step':'false'}" data-chapter="${i}"><i style="width:${i<state.indice?'100':'0'}%"></i></button>`).join('');
      $('cine-progress').querySelectorAll('button').forEach(b=>b.onclick=()=>capitulo(Number(b.dataset.chapter)));
      controls();
      try{await entrar(c.id,state.indice);}catch(e){if(n!==token)return;$('cine-alert').textContent=pick('No se pudo preparar esta vista. Puedes avanzar al siguiente capítulo.','This view could not be prepared. You can move to the next chapter.');console.error(e);}
      if(n!==token||!state.activo)return;
      ready=true;cargarAudio();
    }
    function pause(value=true){state.reproduciendo=!value&&!state.terminado;if(value)audio.pause();else playAudio();pausar?.(value);controls();}
    function start(){prevFocus=document.activeElement;state.activo=true;state.reproduciendo=true;state.terminado=false;panel.hidden=false;document.body.classList.add('proyectando');capitulo(0);$('cine-play').focus();}
    function stop(){++token;audio.pause();audio.removeAttribute('src');audio.load();state.activo=false;state.reproduciendo=false;panel.hidden=true;document.body.classList.remove('proyectando');salir?.();prevFocus?.focus();}
    $('cine-close').onclick=stop;$('cine-prev').onclick=()=>capitulo(state.indice-1);$('cine-next').onclick=()=>capitulo(state.indice+1);
    $('cine-play').onclick=()=>state.terminado?(state.reproduciendo=true,capitulo(0)):pause(state.reproduciendo);
    $('cine-voice').onclick=()=>{state.voz=!state.voz;$('cine-alert').textContent='';if(state.voz){cargarAudio();audio.currentTime=Math.min(state.tiempo,info()?.duracion||0);}else audio.pause();controls();};
    $('cine-volume').oninput=e=>{audio.volume=Number(e.target.value);};
    $('cine-full').onclick=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{});
    $('cine-language').onclick=()=>MILPA_I18N.set(MILPA_I18N.lang==='es'?'en':'es');
    $('cine-loop').onclick=()=>{state.bucle=!state.bucle;controls();};
    addEventListener('milpa-language',()=>{if(state.activo)capitulo(state.indice);else controls();});
    document.addEventListener('visibilitychange',()=>{if(document.hidden&&state.activo)pause();});
    addEventListener('keydown',e=>{if(!state.activo||e.target.matches('input,select'))return;
      if(e.key==='Escape'){e.preventDefault();stop();}
      if(e.code==='Space'){e.preventDefault();$('cine-play').click();}
      if(e.key==='ArrowRight'){e.preventDefault();if(state.indice<chapters.length-1)capitulo(state.indice+1);}
      if(e.key==='ArrowLeft'){e.preventDefault();if(state.indice>0)capitulo(state.indice-1);}
    });
    controls();
    return {state,audio,start,stop,pause,go:capitulo,duracion,tick(dt){
      if(!state.activo||!ready)return;
      if(state.reproduciendo){
        // La voz manda el reloj mientras se reproduce: una carga lenta no adelanta los subtítulos.
        if(state.voz&&!audio.ended)state.tiempo=audio.currentTime;
        else state.tiempo+=Math.min(dt,.1);
      }
      const t=state.tiempo,d=duracion();fotograma?.(chapters[state.indice].id,t/d,state.reproduciendo?Math.min(dt,.1):0,t);
      const cues=info()?.cues||[],cue=cues.find(c=>t>=c.inicio&&t<c.fin)||cues.find(c=>t<c.inicio)||cues.at(-1);
      const text=cue?.texto||chapters[state.indice][MILPA_I18N.lang].idea;
      if(text!==subtitle){subtitle=text;$('cine-subtitle').textContent=text;}
      const bar=$('cine-progress').children[state.indice]?.firstElementChild;if(bar)bar.style.width=Math.min(100,t/d*100)+'%';
      if(t>=d&&state.reproduciendo){if(state.indice<chapters.length-1)capitulo(state.indice+1);else if(state.bucle)capitulo(0);else {state.terminado=true;pause();}}
    }};
  };
})();
