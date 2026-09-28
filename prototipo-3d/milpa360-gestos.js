/* Control por gestos con la webcam (MediaPipe HandLandmarker 1.0.1), opcional y perezoso.
   Cargar este archivo no hace ninguna petición de red: MediaPipe (módulo, WASM ≈12 MB y modelo ≈8 MB)
   se descarga del CDN sólo al llamar a activar(). Funciona con doble clic (file://): la prueba C0
   comprobó import() remoto, CORS y un Worker creado desde blob:.
   La inferencia vive en un Worker (delegado CPU): detectForVideo es síncrono y tarda 20–50 ms, y el
   render sólo tiene 9–12 ms por fotograma. El hilo principal captura un cuadro (AJUSTES.anchoCuadro)
   cuando termina el anterior (sin cola); filtra, clasifica y entrega el movimiento en tick().
   API: MILPA_GESTOS.activar() · .desactivar() · .estado · .on(evento, fn) · .clasificar(manos)
   Eventos: orbitar/desplazar/pinza_mover{dx,dy}, pinza_inicio{x,y}, pinza_fin,
            deslizar{dir}, despiece/escalar{t}, cursor{x,y,progreso,visible}, seleccionar{x,y}, cerrar,
            estallar{manos:1|2} (abrir de golpe), armar (cerrar el puño de golpe). */
(function(){
  const VERSION='1.0.1',CDN=`https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${VERSION}`;
  const URLS={modulo:`${CDN}/vision_bundle.mjs`,wasm:`${CDN}/wasm`,
    modelo:'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task'};
  const LIMITE_CARGA_MS=90000;   // ≈20 MB la primera vez; después, caché del navegador
  // Perillas de calibración: distancias en tamaños de palma (muñeca–nudillo medio), ganancias por
  // fracción de imagen. Se ajustan con la mano real, no se adivinan.
  const AJUSTES={
    // Dedo por rectitud (cuerda nudillo→punta / suma de falanges): 1 recto, ≈0.4 enrollado en puño.
    // Medido con MediaPipe en fotos reales: mano abierta relajada 0.96–0.99 en los cuatro dedos, puño
    // 0.17–0.55, pinza (signo OK) con el índice en 0.72–0.87. pinzaRectoMax separa pinza y mano
    // abierta en escorzo (la punta del índice cae a <0.35 palmas del pulgar); pinzaFuera (punta del
    // índice más allá de 1.2× el nudillo, desde la muñeca) separa pinza y puño: 1.35 frente a 0.87–0.98.
    // La proximidad también se limita a una falange media del índice (1/3 de su cadena): Z puede
    // inflar la palma. La cadena evita depender de una sola falange que se acorta al filtrar poses.
    recto:.85,curvo:.7,pinza:0.35,pinzaDedo:1/3,pinzaFuera:1.2,pinzaRectoMax:.93,quietud:0.25,quietaMs:1000,
    // A ~7 Hz: cambia de gesto con votosMin de los últimos `votos` cuadros y ≥ histeresisMs; un
    // 'ninguno' breve con la mano aún en cámara se aguanta toleranciaMs sin soltar el gesto.
    histeresisMs:100,votos:3,votosMin:2,toleranciaMs:250,
    sepMin:1.5,sepMax:5,margen:0.1,esperaMs:600,radioEspera:0.035,
    orbita:4,zoom:4,desplazar:1.25,euroCorte:1.2,euroBeta:6,euroCorteD:1,emparejar:.35,
    // Golpes: apertura = rectitud media de los 4 dedos llevada de [rectPuno, rectAbierta] a [0, 1];
    // estallar/armar si cruza de <estallarBaja a >estallarAlta (o al revés) en ≤ estallarMs.
    rectPuno:.45,rectAbierta:.92,estallarBaja:.35,estallarAlta:.8,estallarMs:350,estallarEnfriaMs:800,
    golpeSilencioMs:700,despieceRetomar:.1,
    // MediaPipe: confianzas mínimas (0.5 por defecto) y ancho del cuadro que recibe el worker.
    confDeteccion:.35,confPresencia:.35,confSeguimiento:.35,anchoCuadro:384,calidadCuadro:'medium',
    intervaloMinMs:33,suavizadoMs:45,delegado:typeof location!=='undefined'&&new URLSearchParams(location.search).get('gestos')==='gpu'?'GPU':'CPU',
    manosAdaptativas:false,deslizarVel:3.5,deslizarMin:.9};
  const pick=(es,en)=>window.MILPA_I18N?MILPA_I18N.pick(es,en):es;
  const NOMBRES={abierta:['Orbitar / girar','Orbit / rotate'],pinza:['Agarrar / zoom','Grab / zoom'],puno:['Desplazar','Pan'],dos_manos:['Despiece / escalar','Explode / scale'],
    apuntar:['Apuntar','Point'],palma_quieta:['Cerrar','Close'],ninguno:['—','—']};

  /* ---------- Clasificación pura ---------- */
  const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y,(a.z||0)-(b.z||0));
  const dist2=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
  const media=(m,ids)=>({x:ids.reduce((s,i)=>s+m[i].x,0)/ids.length,y:ids.reduce((s,i)=>s+m[i].y,0)/ids.length});
  const limitar=v=>Math.min(1,Math.max(0,v));
  // Rectitud del dedo que nace en el nudillo f (f+1 articulación, f+3 punta): cuerda nudillo→punta
  // entre la suma de las tres falanges. Un dedo recto se ve recto desde cualquier ángulo, así que no la
  // engaña el escorzo (antes: punta 1.15× más lejos de la muñeca que la articulación, que con los dedos
  // hacia la cámara daba por doblado un dedo recto). Lo que sí la engaña es el dedo que se enrolla en
  // profundidad (puño con la palma a la cámara: la z de MediaPipe se queda corta y el dedo parece
  // recto); por eso, si la punta vuelve hacia la muñeca más que la articulación, cuenta como puño.
  // Si no llega a recto en 3D, también vale el retorno visible en XY: una Z inflada puede ocultarlo.
  // Un dedo recto conserva su criterio 3D para no confundir el escorzo con un pliegue.
  function rectitud(m,f){
    const l=dist(m[f],m[f+1])+dist(m[f+1],m[f+2])+dist(m[f+2],m[f+3]),r=l>1e-9?dist(m[f],m[f+3])/l:0;
    const vuelve=dist(m[0],m[f+3])<dist(m[0],m[f+1])||
      r<AJUSTES.recto&&dist2(m[0],m[f+3])<dist2(m[0],m[f+1]);
    return vuelve?Math.min(r,AJUSTES.rectPuno):r;
  }
  const apertura=r=>limitar(((r[0]+r[1]+r[2]+r[3])/4-AJUSTES.rectPuno)/(AJUSTES.rectAbierta-AJUSTES.rectPuno));
  function pose(m){
    const palma=dist(m[0],m[9])||1e-6,centro=media(m,[0,5,9,13,17]),r=[5,9,13,17].map(f=>rectitud(m,f));
    const ext=v=>v>=AJUSTES.recto,doblado=v=>v<=AJUSTES.curvo;
    let gesto='ninguno';
    // Pinza: puntas de pulgar e índice juntas, el índice por fuera de los nudillos (en el puño también
    // se tocan, con la punta dentro de la palma) y no del todo recto (en la mano abierta vista en escorzo
    // también se acercan, con el índice recto).
    const contacto=dist(m[4],m[8]),indice=dist(m[5],m[6])+dist(m[6],m[7])+dist(m[7],m[8]);
    if(contacto/palma<AJUSTES.pinza&&contacto<indice*AJUSTES.pinzaDedo&&
      dist(m[0],m[8])>dist(m[0],m[5])*AJUSTES.pinzaFuera&&r[0]<AJUSTES.pinzaRectoMax)gesto='pinza';
    else if(r.every(ext))gesto='abierta';
    else if(ext(r[0])&&r.slice(1).every(doblado))gesto='apuntar';
    else if(r.every(doblado))gesto='puno';
    return {gesto,palma,centro,punta:{x:m[8].x,y:m[8].y},pinza:media(m,[4,8]),rectitud:r,apertura:apertura(r)};
  }
  // manos: [[21 × {x,y,z}], …] en unidades isótropas. previo y t (ms) sólo hacen falta para
  // 'palma_quieta'; sin ellos la función sigue siendo pura y determinista.
  function clasificar(manos,previo=null,t=0){
    const poses=(manos||[]).filter(m=>m&&m.length>=21).map(pose);
    if(!poses.length)return {gesto:'ninguno',pose:'ninguno',manos:0};
    if(poses.length>=2&&poses[0].gesto==='abierta'&&poses[1].gesto==='abierta'){
      const [a,b]=poses,palma=(a.palma+b.palma)/2,separacion=dist2(a.centro,b.centro)/palma;
      return {gesto:'dos_manos',pose:'dos_manos',manos:2,palma,separacion,
        despiece:limitar((separacion-AJUSTES.sepMin)/(AJUSTES.sepMax-AJUSTES.sepMin)),
        centro:{x:(a.centro.x+b.centro.x)/2,y:(a.centro.y+b.centro.y)/2}};
    }
    // Con varias manos manda la más cercana (palma mayor) que haga algún gesto.
    const p=poses.filter(p=>p.gesto!=='ninguno').sort((a,b)=>b.palma-a.palma)[0]||poses[0];
    const r={...p,pose:p.gesto,manos:poses.length,indice:poses.indexOf(p)};
    if(p.gesto==='abierta'){
      const sigue=previo&&previo.pose==='abierta'&&previo.ancla&&dist2(p.centro,previo.ancla)/p.palma<AJUSTES.quietud;
      r.ancla=sigue?previo.ancla:p.centro;r.quietaDesde=sigue?previo.quietaDesde:t;
      if(t-r.quietaDesde>=AJUSTES.quietaMs)r.gesto='palma_quieta';
    }
    return r;
  }

  /* ---------- Filtro One Euro (Casiez et al. 2012) sobre cada coordenada ---------- */
  function unEuro(){
    let x=null,dx=null,tPrev=0;
    const alfa=(corte,dt)=>{const r=2*Math.PI*corte*dt;return r/(r+1);};
    return (v,t)=>{
      if(!x||x.length!==v.length){x=Float64Array.from(v);dx=new Float64Array(v.length);tPrev=t;return x;}
      const dt=Math.max(1e-3,(t-tPrev)/1000);tPrev=t;
      const aD=alfa(AJUSTES.euroCorteD,dt);
      for(let i=0;i<v.length;i++){
        dx[i]+=aD*((v[i]-x[i])/dt-dx[i]);
        x[i]+=alfa(AJUSTES.euroCorte+AJUSTES.euroBeta*Math.abs(dx[i]),dt)*(v[i]-x[i]);
      }
      return x;
    };
  }

  /* ---------- Eventos ---------- */
  const oyentes=new Map();
  function on(evento,fn){if(!oyentes.has(evento))oyentes.set(evento,new Set());oyentes.get(evento).add(fn);return ()=>oyentes.get(evento).delete(fn);}
  // Un fallo del simulador en un oyente no debe parar el bucle de gestos, pero sí verse.
  function emitir(evento,datos){for(const fn of oyentes.get(evento)||[])try{fn(datos);}catch(e){console.error(e);}}

  /* ---------- Motor: pistas → filtro → golpes → clasificación → votos → eventos ---------- */
  let pistas=[],pistaActiva=null,previo=null,activo='ninguno',votos=[],vistoActivo=-Infinity;
  let ultimoGolpe=-Infinity,enfriaGolpe=-Infinity,esperaDos=false,baseDespiece=null,golpeHud=null;
  let anterior=null,ancla=null,anclaT=0,disparado=false,cursorVisible=false,ultimoDespiece=-1,aspecto=4/3,ultimoDeltaT=0;
  const pendientes={orbitar:{dx:0,dy:0},desplazar:{dx:0,dy:0},pinza_mover:{dx:0,dy:0}};
  const tiposContinuos=['orbitar','desplazar','pinza_mover'];
  const salida={orbitar:{dx:0,dy:0},desplazar:{dx:0,dy:0},pinza_mover:{dx:0,dy:0}};
  const cursor={x:0,y:0,metaX:0,metaY:0,progreso:0,visible:false};
  let ultimoDato=-Infinity,ultimoTick=0,barrido=null,ultimoDesliz=-Infinity;
  function limpiarPendientes(){for(const tipo of tiposContinuos)pendientes[tipo].dx=pendientes[tipo].dy=0;}
  function tick(t){
    const dt=ultimoTick?Math.max(0,Math.min(50,t-ultimoTick)):16.7;ultimoTick=t;
    if(t-ultimoDato>250){limpiarPendientes();if(cursor.visible)ocultarCursor();return;}
    const f=AJUSTES.suavizadoMs<=0?1:1-Math.exp(-dt/AJUSTES.suavizadoMs);
    for(const tipo of tiposContinuos){const p=pendientes[tipo];
      if(Math.abs(p.dx)+Math.abs(p.dy)<1e-7)continue;
      const datos=salida[tipo];datos.dx=p.dx*f;datos.dy=p.dy*f;p.dx-=datos.dx;p.dy-=datos.dy;emitir(tipo,datos);
    }
    if(cursor.visible){cursor.x+=(cursor.metaX-cursor.x)*f;cursor.y+=(cursor.metaY-cursor.y)*f;
      emitir('cursor',cursor);hudCursor(cursor,cursor.progreso);}
  }
  function moverCursor(p,progreso){
    if(!cursor.visible){cursor.x=p.x;cursor.y=p.y;}
    cursor.metaX=p.x;cursor.metaY=p.y;cursor.progreso=progreso;cursor.visible=cursorVisible=true;
  }
  const aPantalla=p=>({x:p.x/aspecto,y:p.y});
  const mapear=p=>{const m=AJUSTES.margen,q=aPantalla(p);return {x:limitar((q.x-m)/(1-2*m)),y:limitar((q.y-m)/(1-2*m))};};
  function reiniciarMotor(){pistas=[];pistaActiva=null;votos=[];previo=null;activo='ninguno';vistoActivo=ultimoGolpe=enfriaGolpe=-Infinity;esperaDos=false;baseDespiece=golpeHud=null;
    anterior=ancla=barrido=null;disparado=false;ultimoDespiece=-1;ultimoDato=-Infinity;ultimoTick=ultimoDeltaT=0;ultimoDesliz=-Infinity;limpiarPendientes();ocultarCursor();}
  function ocultarCursor(){if(cursorVisible){cursorVisible=cursor.visible=false;emitir('cursor',{x:0,y:0,progreso:0,visible:false});hudCursor(null);}}
  // Cada mano conserva su pista (filtro One Euro + apertura reciente) emparejándola con la muñeca más
  // cercana del cuadro anterior: que entre o salga la otra mano ya no reinicia el filtro (ni da saltos).
  // ponytail: emparejado voraz por distancia, suficiente para 2 manos; Hungarian si algún día son más.
  function emparejar(manos,t){
    pistas=pistas.filter(p=>t-p.t<=500);
    const pares=[],suyas=[];
    manos.forEach((m,i)=>pistas.forEach(p=>{const d=dist2(m[0],p.muneca);if(d<AJUSTES.emparejar)pares.push([d,i,p]);}));
    for(const [,i,p] of pares.sort((a,b)=>a[0]-b[0]))if(!suyas[i]&&!suyas.includes(p))suyas[i]=p;
    return manos.map((m,i)=>{let p=suyas[i];if(!p)pistas.push(p={filtro:unEuro(),historia:[],apertura:0,rectitud:[]});p.muneca=m[0];p.t=t;return p;});
  }
  // Golpe: la apertura cruza de puño a abierta (estallar) o al revés (armar) en ≤ estallarMs. Se mide
  // sobre las manos crudas porque el One Euro retrasa justo ese flanco. El extremo cerrado ha de ser un
  // puño: una pinza o un índice que apunta también tienen apertura baja y no cuentan.
  function golpes(crudas,suyas,t){
    const {estallarBaja:baja,estallarAlta:alta}=AJUSTES,venia=p=>p.historia.some(h=>h.puno&&h.a<baja);
    const cruces=suyas.map((p,k)=>{
      const q=pose(crudas[k]),a=p.apertura=q.apertura,puno=q.gesto==='puno';p.rectitud=q.rectitud;
      p.historia=p.historia.filter(h=>t-h.t<=AJUSTES.estallarMs);
      const cruce=a>alta&&venia(p)?'estallar':puno&&a<baja&&p.historia.some(h=>h.a>alta)?'armar':null;
      if(cruce)p.historia=[];
      p.historia.push({t,a,puno});
      return cruce;
    });
    if(t<enfriaGolpe)return;
    const abren=cruces.filter(c=>c==='estallar').length+(esperaDos?1:0);
    if(abren){
      ultimoGolpe=t;
      // Abrió una mano y la otra venía de puño: un cuadro más por si también abre (despiece a dos manos).
      if(!esperaDos&&abren===1&&suyas.some((p,k)=>!cruces[k]&&p.apertura<=alta&&venia(p))){esperaDos=true;return;}
      esperaDos=false;baseDespiece=-1;golpe('estallar',{manos:Math.min(2,abren)},t);
    }else if(cruces.includes('armar'))golpe('armar',{},t);
  }
  function golpe(tipo,datos,t){
    limpiarPendientes();anterior=barrido=null;
    ultimoGolpe=t;enfriaGolpe=t+AJUSTES.estallarEnfriaMs;golpeHud={tipo,t};emitir(tipo,datos);
  }
  function alimentar(manos,t){
    ultimoDato=t;
    // Orden estable (de izquierda a derecha); el filtro de cada mano lo decide emparejar().
    manos=[...manos].sort((a,b)=>a[0].x-b[0].x);
    const suyas=emparejar(manos,t);
    const suaves=manos.map((m,k)=>{const v=suyas[k].filtro(m.flatMap(p=>[p.x,p.y,p.z||0]),t);return m.map((_,i)=>({x:v[i*3],y:v[i*3+1],z:v[i*3+2]}));});
    golpes(manos,suyas,t);
    const c=clasificar(suaves,previo,t);
    // La palma que se queda quieta justo después de un golpe es la cola del golpe: no cierra.
    if(c.gesto==='palma_quieta'&&c.quietaDesde<=ultimoGolpe+AJUSTES.golpeSilencioMs)c.gesto='abierta';
    votos=votos.filter(v=>t-v.t<=500);votos.push({g:c.gesto,t});if(votos.length>AJUSTES.votos)votos.shift();
    // Tolerancia: con la mano aún en cámara, un 'ninguno' breve (cuadro borroso, dedo a medio camino),
    // o una de las dos manos que se pierde un instante, no suelta el gesto: ni eventos ni limpieza.
    const aguanta=activo!=='ninguno'&&c.manos>0&&t-vistoActivo<AJUSTES.toleranciaMs&&
      (c.gesto==='ninguno'||activo==='dos_manos'&&c.manos>=2&&c.pose==='abierta');
    if(c.gesto!==activo&&!aguanta){
      const mios=votos.filter(v=>v.g===c.gesto);
      if(mios.length>=AJUSTES.votosMin&&t-mios[0].t>=AJUSTES.histeresisMs){
        if(activo==='pinza')emitir('pinza_fin');
        if(activo==='apuntar'||activo==='pinza')ocultarCursor();
        limpiarPendientes();
        activo=c.gesto;anterior=null;ancla=null;disparado=false;ultimoDeltaT=0;
        barrido=null;
        if(activo==='pinza'){const p=mapear(c.pinza);moverCursor(p,0);emitir('pinza_inicio',{x:p.x,y:p.y});}
        if(activo==='palma_quieta')emitir('cerrar');
      }
    }
    if(c.gesto===activo){
      const pista=suyas[c.indice]||null;
      // La palma dominante puede cambiar aunque el gesto sea el mismo: el delta pertenece a una
      // pista, nunca a la distancia entre dos personas/manos.
      if(pista!==pistaActiva){limpiarPendientes();anterior=ancla=barrido=null;disparado=false;ultimoDeltaT=0;pistaActiva=pista;}
      vistoActivo=t;accion(c,t);
    }
    if(!aguanta)previo=c;
    hud(suaves,c,t);
    return c;
  }
  function accion(c,t){
    const delta=p=>{const q=aPantalla(p),d=anterior&&{dx:q.x-anterior.x,dy:q.y-anterior.y,dt:t-ultimoDeltaT};anterior=q;ultimoDeltaT=t;return d;};
    if(activo==='abierta'){
      const d=delta(c.centro);
      if(!barrido)barrido={x:c.centro.x,t};
      if(d){
        const velocidad=Math.abs(d.dx)*aspecto/Math.max(1,d.dt)*1000/c.palma;
        const viaje=(c.centro.x-barrido.x)/c.palma;
        if(velocidad>AJUSTES.deslizarVel){
          pendientes.orbitar.dx=pendientes.orbitar.dy=0;
          if(Math.abs(viaje)>=AJUSTES.deslizarMin&&t-ultimoDesliz>=700&&t-ultimoGolpe>=AJUSTES.golpeSilencioMs){emitir('deslizar',{dir:Math.sign(viaje)});ultimoDesliz=t;barrido={x:c.centro.x,t};}
          return;
        }
        barrido={x:c.centro.x,t};pendientes.orbitar.dx+=d.dx*AJUSTES.orbita;pendientes.orbitar.dy+=d.dy*AJUSTES.orbita;
      }
    }
    else if(activo==='pinza'){const p=mapear(c.pinza),d=delta(c.pinza);moverCursor(p,0);
      if(d){pendientes.pinza_mover.dx+=d.dx;pendientes.pinza_mover.dy+=d.dy;}}
    else if(activo==='puno'){const d=delta(c.centro);if(d){pendientes.desplazar.dx+=d.dx*AJUSTES.desplazar;pendientes.desplazar.dy+=d.dy*AJUSTES.desplazar;}}
    else if(activo==='dos_manos'){
      // Tras estallar, la separación de las manos no pisa el despiece total hasta que se mueven de verdad.
      if(baseDespiece!==null){if(baseDespiece<0)baseDespiece=c.despiece;if(Math.abs(c.despiece-baseDespiece)<AJUSTES.despieceRetomar)return;baseDespiece=null;}
      if(Math.abs(c.despiece-ultimoDespiece)>0.002){ultimoDespiece=c.despiece;emitir('despiece',{t:c.despiece});emitir('escalar',{t:c.despiece});}}
    else if(activo==='apuntar'){
      const p=mapear(c.punta);
      if(!ancla||Math.hypot(p.x-ancla.x,p.y-ancla.y)>AJUSTES.radioEspera){ancla=p;anclaT=t;disparado=false;}
      const progreso=disparado?1:limitar((t-anclaT)/AJUSTES.esperaMs);
      moverCursor(p,progreso);
      if(progreso>=1&&!disparado){disparado=true;emitir('seleccionar',{x:p.x,y:p.y});}
    }
  }

  /* ---------- Cámara, worker y ciclo de vida ---------- */
  let estado='apagado',mensaje=()=>'',detalle='',sesion=0,promesa=null;
  let flujo=null,video=null,worker=null,cancelarCarga=null,cancelarActivacion=null,temporizador=0,ocupado=false,hiloCuadro=0;
  const muestras={hilo:[],inferencia:[],opciones:[],tiempos:[]};
  function cambiarEstado(e,textoEs,textoEn,det=''){
    estado=e;mensaje=()=>pick(textoEs,textoEn);detalle=det;
    if(det)console.warn('[gestos]',det);
    hudEstado();emitir('estado',{estado,mensaje:mensaje()});
  }
  // Todo lo que corre dentro del worker; se serializa a blob: (file:// no deja crear Worker('x.js')).
  function trabajador(){
    const errorOriginal=console.error.bind(console);
    console.error=(...a)=>{if(typeof a[0]==='string'&&a[0].includes('INFO: Created TensorFlow Lite XNNPACK delegate'))return;errorOriginal(...a);};
    const texto=e=>e instanceof Error||e instanceof DOMException?e.message:e&&e.type?`evento ${e.type}${e.target&&e.target.src?' '+e.target.src:''}`:String(e);
    let lm,numHands=2,ultimaNecesidad=0;
    onmessage=async({data})=>{
      if(data.urls){
        try{
          const {FilesetResolver,HandLandmarker}=await import(data.urls.modulo);
          const archivos=await FilesetResolver.forVisionTasks(data.urls.wasm);
          numHands=data.manosAdaptativas?1:2;
          const [minHandDetectionConfidence,minHandPresenceConfidence,minTrackingConfidence]=data.confianzas;
          lm=await HandLandmarker.createFromOptions(archivos,{baseOptions:{modelAssetPath:data.urls.modelo,delegate:data.delegado},runningMode:'VIDEO',numHands,
            minHandDetectionConfidence,minHandPresenceConfidence,minTrackingConfidence});
          postMessage({listo:true});
        }catch(e){postMessage({error:texto(e),fase:'modelo'});}
        return;
      }
      const {cuadro,ts}=data,asp=cuadro.width/cuadro.height,t0=performance.now();
      let r,opcionesMs=0;
      try{
        if(data.manosAdaptativas){
          if(data.necesitaDos)ultimaNecesidad=ts;
          const n=data.necesitaDos||ts-ultimaNecesidad<600?2:1;
          if(n!==numHands){const inicio=performance.now();await lm.setOptions({numHands:n});opcionesMs=performance.now()-inicio;numHands=n;}
        }
        r=lm.detectForVideo(cuadro,ts);
      }catch(e){postMessage({error:texto(e),fase:'inferencia'});return;}finally{cuadro.close();}
      // Espejado por coordenadas (x → 1−x, sin tocar píxeles) y x, z en unidades de alto: isótropas.
      const puntos=new Float32Array(r.landmarks.length*63);
      r.landmarks.forEach((m,k)=>m.forEach((p,i)=>puntos.set([(1-p.x)*asp,p.y,p.z*asp],k*63+i*3)));
      postMessage({puntos,n:r.landmarks.length,ts,ms:performance.now()-t0,opcionesMs,aspecto:asp},[puntos.buffer]);
    };
  }
  function explicarCamara(e){
    const n=e&&e.name;
    if(n==='NotAllowedError'||n==='SecurityError')return ['Permiso de cámara denegado: actívalo en los ajustes del sitio del navegador.','Camera permission denied: allow it in the browser site settings.'];
    if(n==='NotFoundError'||n==='OverconstrainedError')return ['No se encontró ninguna cámara.','No camera found.'];
    if(n==='NotReadableError'||n==='AbortError')return ['La cámara está en uso por otra aplicación.','The camera is in use by another application.'];
    return ['No se pudo abrir la cámara.','The camera could not be opened.'];
  }
  function explicarModelo(det){
    if(/tard|timeout/i.test(det))return ['El modelo de manos tardó demasiado en cargar.','The hand model took too long to load.'];
    if(!navigator.onLine||/fetch|network|importScripts|load|evento/i.test(det))
      return ['Sin conexión con el CDN: la primera vez hay que descargar el modelo de manos (≈20 MB).','Cannot reach the CDN: the hand model (≈20 MB) must be downloaded the first time.'];
    return ['No se pudo iniciar el reconocimiento de manos.','Hand tracking could not start.'];
  }
  async function abrirCamara(mia){
    if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw Object.assign(new Error('getUserMedia no disponible'),{name:'NotSupported'});
    // 640×480 nativos: el cuadro se reduce a anchoCuadro en createImageBitmap (pedir 320 dejaba sin
    // detalle la mano que MediaPipe recorta y amplía a 224 px).
    const s=await navigator.mediaDevices.getUserMedia({audio:false,video:{width:{ideal:640},height:{ideal:480},frameRate:{ideal:30},facingMode:'user'}});
    if(mia!==sesion){s.getTracks().forEach(p=>p.stop());throw new Error('carga cancelada');}
    const v=document.createElement('video');v.muted=true;v.playsInline=true;v.srcObject=s;
    flujo=s;video=v; // liberar() debe poder detener la cámara incluso mientras play() está pendiente.
    try{await v.play();}catch(e){s.getTracks().forEach(p=>p.stop());throw e;}
    if(mia!==sesion){s.getTracks().forEach(p=>p.stop());v.srcObject=null;throw new Error('carga cancelada');}
    return {s,v};
  }
  function cargarModelo(){
    const url=URL.createObjectURL(new Blob([`(${trabajador})()`],{type:'text/javascript'}));
    let w;
    try{w=new Worker(url);}finally{URL.revokeObjectURL(url);}
    worker=w;
    return new Promise((resolver,rechazar)=>{
      const terminar=e=>{clearTimeout(limite);cancelarCarga=null;w.onmessage=w.onerror=null;
        if(e){w.terminate();if(worker===w)worker=null;rechazar(e);}
        else {w.onerror=e=>{e.preventDefault();fallar(e.message||'error en el worker');};
          w.onmessage=({data})=>{if(data.error)fallar(data.error);};resolver(w);}};
      const limite=setTimeout(()=>terminar(new Error(`el modelo tardó más de ${LIMITE_CARGA_MS/1000} s`)),LIMITE_CARGA_MS);
      cancelarCarga=()=>terminar(new Error('carga cancelada'));
      w.onmessage=({data})=>terminar(data.listo?null:new Error(data.error));
      w.onerror=e=>{e.preventDefault();terminar(new Error(e.message||'error en el worker'));};
      try{w.postMessage({urls:URLS,delegado:AJUSTES.delegado,manosAdaptativas:AJUSTES.manosAdaptativas,
        confianzas:[AJUSTES.confDeteccion,AJUSTES.confPresencia,AJUSTES.confSeguimiento]});}catch(e){terminar(e);}
    });
  }
  function activar(){
    if(promesa)return promesa;
    const mia=++sesion;
    construirHud();reiniciarMotor();
    cambiarEstado('cargando','Cargando modelo de manos…','Loading hand model…');
    promesa=(async()=>{
      let falloCamara=null;
      try{
        const cancelada=new Promise((_,rechazar)=>{cancelarActivacion=()=>rechazar(new Error('carga cancelada'));});
        const [cam]=await Promise.race([Promise.all([abrirCamara(mia).catch(e=>{falloCamara=e;throw e;}),Promise.resolve().then(()=>{if(mia!==sesion)throw new Error('carga cancelada');return cargarModelo();})]),cancelada]);
        if(mia!==sesion){cam.s.getTracks().forEach(p=>p.stop());return;}
        cancelarActivacion=null;
      }catch(e){
        if(mia!==sesion)return;
        const det=String(e&&e.message||e),[es,en]=falloCamara?explicarCamara(e):explicarModelo(det);
        sesion++;
        liberar();cambiarEstado('error',es,en,det);return;
      }
      worker.onmessage=recibir;
      worker.onerror=e=>{e.preventDefault();fallar(e.message||'error en el worker');};
      cambiarEstado('activo','Muestra la mano a la cámara','Show your hand to the camera');
      ocupado=false;programarCaptura(0);
    })().catch(e=>{if(mia!==sesion)return;liberar();cambiarEstado('error','No se pudo iniciar el reconocimiento de manos.','Hand tracking could not start.',String(e&&e.message||e));});
    return promesa;
  }
  function fallar(det){sesion++;liberar();cambiarEstado('error','El reconocimiento de manos se detuvo.','Hand tracking stopped.',det);}
  let ultimaCaptura=-Infinity,necesitaDos=false;
  function programarCaptura(ms){clearTimeout(temporizador);temporizador=setTimeout(capturar,ms);}
  function capturar(){
    if(ocupado||!worker)return;
    if(document.hidden||!video||video.readyState<2||!video.videoWidth){programarCaptura(100);return;}
    ocupado=true;const t0=performance.now(),mia=sesion,w=worker;
    const ancho=AJUSTES.anchoCuadro,alto=Math.round(ancho*video.videoHeight/video.videoWidth);
    createImageBitmap(video,{resizeWidth:ancho,resizeHeight:alto,resizeQuality:AJUSTES.calidadCuadro}).then(cuadro=>{
      if(mia!==sesion||worker!==w){cuadro.close();return;}
      const t1=performance.now();ultimaCaptura=t1;
      try{w.postMessage({cuadro,ts:t1,necesitaDos,manosAdaptativas:AJUSTES.manosAdaptativas},[cuadro]);}
      catch(e){cuadro.close();fallar(String(e&&e.message||e));}
      hiloCuadro+=performance.now()-t1;
    },()=>{if(mia!==sesion||worker!==w)return;ocupado=false;programarCaptura(100);});
    hiloCuadro=performance.now()-t0;
  }
  function recibir({data}){
    const t0=performance.now();ocupado=false;
    if(data.error)return fallar(data.error);
    programarCaptura(Math.max(0,AJUSTES.intervaloMinMs-(t0-ultimaCaptura)));
    aspecto=data.aspecto;
    const manos=[];
    for(let k=0;k<data.n;k++){const m=[];for(let i=0;i<21;i++){const j=k*63+i*3;m.push({x:data.puntos[j],y:data.puntos[j+1],z:data.puntos[j+2]});}manos.push(m);}
    alimentar(manos,data.ts);
    necesitaDos=activo==='abierta'||activo==='dos_manos'||activo==='escalar';
    anotar(muestras.inferencia,data.ms);anotar(muestras.hilo,hiloCuadro+performance.now()-t0);
    if(data.opcionesMs)anotar(muestras.opciones,data.opcionesMs);
    muestras.tiempos.push(t0);while(muestras.tiempos[0]<t0-3000)muestras.tiempos.shift();
  }
  const anotar=(lista,v)=>{lista.push(v);if(lista.length>240)lista.shift();};
  function liberar(){
    clearTimeout(temporizador);temporizador=0;
    if(cancelarActivacion){cancelarActivacion();cancelarActivacion=null;}
    if(cancelarCarga)cancelarCarga();
    if(worker){worker.terminate();worker=null;}
    if(flujo){flujo.getTracks().forEach(p=>p.stop());flujo=null;}
    if(video){video.srcObject=null;video=null;}
    promesa=null;ocupado=false;reiniciarMotor();
  }
  function desactivar(){
    sesion++;liberar();quitarHud();
    if(estado!=='apagado')cambiarEstado('apagado','Gestos apagados','Gestures off');
  }
  // Diagnóstico para las pruebas: ms de hilo principal y de inferencia por cuadro (últimos 240).
  function diagnostico(){
    const resumen=l=>{if(!l.length)return null;const s=[...l].sort((a,b)=>a-b);return {n:s.length,mediana:+s[s.length>>1].toFixed(2),p95:+s[Math.min(s.length-1,Math.floor(s.length*.95))].toFixed(2)};};
    const ts=muestras.tiempos;
    // apertura/rectitud por mano del último cuadro (sin filtrar): con ellas se calibran recto, curvo,
    // rectPuno, rectAbierta y los umbrales de estallar con la mano real.
    const vivas=pistas.filter(p=>p.t===ultimoDato),r2=v=>+v.toFixed(2);
    return {hilo_ms:resumen(muestras.hilo),inferencia_ms:resumen(muestras.inferencia),opciones_ms:resumen(muestras.opciones),
      hz:ts.length>1?+(1000*(ts.length-1)/(ts.at(-1)-ts[0])).toFixed(1):0,
      apertura:vivas.map(p=>r2(p.apertura)),rectitud:vivas.map(p=>p.rectitud.map(r2))};
  }

  /* ---------- HUD: nodos propios, sólo CSS y un canvas 2D pequeño ---------- */
  const HUESOS=[[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[17,18],[18,19],[19,20],[0,17]];
  const LEYENDA=[['abierta','Mano abierta','Open hand'],['pinza','Pinza en vacío ↕','Pinch in empty space ↕'],
    ['pinza','Pinza sobre pieza','Pinch on a part'],['abierta','Deslizar ← →','Swipe ← →'],['puno','Puño','Fist'],
    ['dos_manos','Dos manos ↔','Two hands ↔'],['apuntar','Índice 0.6 s','Index 0.6 s'],['palma_quieta','Palma quieta 1 s','Still palm 1 s'],
    ['estallar','Abrir la mano de golpe','Open hand fast'],['armar','Cerrar el puño de golpe','Close fist fast']];
  const ACCIONES=[['Orbitar · girar pieza','Orbit · rotate part'],['Zoom','Zoom'],['Agarrar y girar','Grab and rotate'],
    ['Otra pieza','Another part'],['Desplazar','Pan'],['Despiece · escalar','Explode · scale'],['Ficha','Details'],['Devolver / cerrar','Return / close'],
    ['Despiece total','Full explode'],['Rearmar','Reassemble']];
  let raiz=null,el={},textoEstado='',gestoHud='';
  // El traductor de la página reescribe title/aria-label desde data-i18n*: se guarda ahí el texto ya traducido.
  const atributo=(n,a,v)=>{n.setAttribute(a,v);n.dataset['i18n'+a.replace(/-/g,'')]=v;};
  function construirHud(){
    if(raiz||typeof document==='undefined')return;
    raiz=document.createElement('div');raiz.className='gestos';raiz.setAttribute('translate','no');
    raiz.innerHTML=`<div class="gestos-cursor" aria-hidden="true"><svg viewBox="0 0 48 48"><circle class="gestos-aro" cx="24" cy="24" r="19"/><circle class="gestos-progreso" cx="24" cy="24" r="19" pathLength="1"/></svg><i></i></div>
      <section class="gestos-panel" role="region"><header><span class="gestos-led" aria-hidden="true"></span><b></b><button class="gestos-cerrar" type="button">×</button></header>
      <canvas width="160" height="120" aria-hidden="true"></canvas><p class="gestos-estado" aria-live="polite"></p>
      <ul class="gestos-leyenda">${LEYENDA.map(([g])=>`<li data-g="${g}"><span></span><em></em></li>`).join('')}</ul></section>`;
    document.body.appendChild(raiz);
    el={cursor:raiz.querySelector('.gestos-cursor'),progreso:raiz.querySelector('.gestos-progreso'),panel:raiz.querySelector('.gestos-panel'),
      titulo:raiz.querySelector('header b'),cerrar:raiz.querySelector('.gestos-cerrar'),lienzo:raiz.querySelector('canvas'),
      estado:raiz.querySelector('.gestos-estado'),leyenda:raiz.querySelector('.gestos-leyenda'),filas:[...raiz.querySelectorAll('li')]};
    el.ctx=el.lienzo.getContext('2d');
    el.cerrar.onclick=desactivar;
    addEventListener('milpa-language',etiquetas);
    etiquetas();
  }
  function quitarHud(){if(!raiz)return;removeEventListener('milpa-language',etiquetas);raiz.remove();raiz=null;el={};textoEstado=gestoHud='';}
  function etiquetas(){
    if(!raiz)return;
    el.titulo.textContent=pick('Gestos','Gestures');
    atributo(el.panel,'aria-label',pick('Control por gestos','Gesture control'));
    atributo(el.cerrar,'aria-label',pick('Apagar gestos','Turn gestures off'));atributo(el.cerrar,'title',el.cerrar.getAttribute('aria-label'));
    atributo(el.leyenda,'title',pick('La imagen de la cámara se procesa localmente en este equipo y no se envía. La librería MediaPipe sí envía a Google telemetría de uso (odml.pa.googleapis.com).',
      'Camera images are processed locally on this device and never uploaded. The MediaPipe library does send usage telemetry to Google (odml.pa.googleapis.com).'));
    el.filas.forEach((li,k)=>{const [,es,en]=LEYENDA[k];li.firstChild.textContent=pick(es,en);li.lastChild.textContent=pick(...ACCIONES[k]);});
    textoEstado='';hudEstado();
  }
  function hudEstado(){
    if(!raiz)return;
    raiz.dataset.estado=estado;
    const t=estado!=='activo'||!previo||!previo.manos?mensaje():pick('Mano detectada','Hand detected')+' · '+pick(...NOMBRES[activo]);
    if(t!==textoEstado){textoEstado=t;el.estado.textContent=t;}
  }
  function hudCursor(p,progreso=0){
    if(!raiz)return;
    el.cursor.classList.toggle('visible',!!p);
    if(!p)return;
    el.cursor.style.transform=`translate3d(${(p.x*innerWidth).toFixed(1)}px,${(p.y*innerHeight).toFixed(1)}px,0)`;
    el.progreso.style.strokeDashoffset=String(1-progreso);
    el.cursor.classList.toggle('lleno',progreso>=1);
  }
  function hud(manos,c,t){
    if(!raiz)return;
    // Un golpe ilumina su fila un momento; después vuelve la del gesto activo.
    const g=golpeHud&&t-golpeHud.t<700?golpeHud.tipo:activo;
    if(g!==gestoHud){gestoHud=g;raiz.dataset.gesto=g;el.filas.forEach(li=>li.classList.toggle('activo',li.dataset.g===g));}
    hudEstado();
    const {ctx,lienzo}=el,W=lienzo.width,H=lienzo.height;
    ctx.clearRect(0,0,W,H);
    ctx.lineWidth=1.5;ctx.strokeStyle='#6fe6ff';ctx.fillStyle='#d9f7ff';
    for(const m of manos){
      const P=m.map(p=>[p.x/aspecto*W,p.y*H]);
      ctx.beginPath();for(const [a,b] of HUESOS){ctx.moveTo(...P[a]);ctx.lineTo(...P[b]);}ctx.stroke();
      for(const [x,y] of P)ctx.fillRect(x-1.5,y-1.5,3,3);
    }
  }

  window.MILPA_GESTOS={activar,desactivar,tick,get estado(){return estado;},get gesto(){return activo;},on,clasificar,
    // Internos expuestos para verificar sin cámara (analysis/verificar_gestos.mjs) y calibrar.
    ajustes:AJUSTES,diagnostico,_alimentar:alimentar,_unEuro:unEuro,_reiniciar:reiniciarMotor,
    _probarCaptura:(w,v)=>{worker=w;video=v;capturar();},_recibir:recibir,_pendientes:pendientes,version:VERSION};
})();
