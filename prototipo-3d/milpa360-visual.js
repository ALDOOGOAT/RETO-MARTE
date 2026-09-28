/* Acabado V6–V8. Sólo representación: no modifica el modelo ni sus parámetros. */
(function(){
  const T=THREE;
  const texturas=new Map();
  // Mapas de datos lineales compartidos: detalle de superficie sin más draw calls.
  function superficie(tipo){
    if(texturas.has(tipo))return texturas.get(tipo);
    const c=document.createElement('canvas');c.width=c.height=512;
    const ctx=c.getContext('2d'),im=ctx.createImageData(512,512);let seed=971;
    for(let y=0;y<512;y++)for(let x=0;x<512;x++){
      seed=(Math.imul(seed,1664525)+1013904223)>>>0;const n=(seed/4294967296-.5);
      let v=180+n*24;
      if(tipo==='metal')v=194+Math.sin(y*1.7)*10+n*10;
      if(tipo==='suelo')v=140+n*100+Math.sin(x*.13)*Math.cos(y*.21)*30;
      const i=(y*512+x)*4;im.data[i]=im.data[i+1]=im.data[i+2]=v;im.data[i+3]=255;
    }
    ctx.putImageData(im,0,0);const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.anisotropy=16;
    texturas.set(tipo,t);return t;
  }
  function entorno(renderer){
    const room=new T.Scene();room.background=new T.Color(0x8b9293);
    const box=new T.Mesh(new T.BoxGeometry(16,10,16),new T.MeshBasicMaterial({color:0x68777a,side:T.BackSide}));room.add(box);
    for(const [position,size,color,intensity] of [
      [[0,4.8,0],[9,.1,5],0xf4f3e9,3],
      [[-7,1,-2],[.1,5,8],0xd9e9f0,2],
      [[5,1,4],[.1,3,5],0xffe6c7,1.4]
    ]){const panel=new T.Mesh(new T.BoxGeometry(...size),new T.MeshBasicMaterial({color:new T.Color(color).multiplyScalar(intensity)}));panel.position.set(...position);room.add(panel);}
    const pmrem=new T.PMREMGenerator(renderer),target=pmrem.fromScene(room,.06,.1,60);pmrem.dispose();
    room.traverse(o=>{if(o.isMesh){o.geometry.dispose();o.material.dispose();}});
    return target.texture;
  }
  function vegetacion(carrusel){
    const batches=new Map(),matrix=new T.Matrix4(),parentMatrix=new T.Matrix4();
    for(const b of carrusel.bandejas)for(const plant of b.plantas.children){
      for(const mesh of plant.children){
        if(!mesh.isMesh)continue;
        const material=mesh.material,source=material.userData.origen||material.uuid;
        const key=mesh.geometry.uuid+'|'+source;
        if(!batches.has(key))batches.set(key,{geometry:mesh.geometry,material,items:[]});
        batches.get(key).items.push({b,plant,mesh});
        mesh.visible=false;
      }
    }
    for(const batch of batches.values()){
      const mat=batch.material.clone();mat.color.set(0xffffff);
      const instances=new T.InstancedMesh(batch.geometry,mat,batch.items.length);
      instances.name='vegetacion-instanciada';instances.receiveShadow=true;instances.castShadow=true;
      instances.frustumCulled=false;instances.instanceMatrix.setUsage(T.DynamicDrawUsage);
      carrusel.grupo.add(instances);batch.instances=instances;
    }
    return function actualizar(){
      for(const b of carrusel.bandejas){b.g.updateMatrix();b.plantas.updateMatrix();for(const plant of b.plantas.children)plant.updateMatrix();}
      for(const {items,instances} of batches.values()){
        let n=0;   // bandejas sin plantas fuera del lote: a escala cero la GPU seguía sombreando sus vértices
        for(const {b,plant,mesh} of items){
          if(!b.plantas.visible)continue;
          mesh.updateMatrix();parentMatrix.multiplyMatrices(b.g.matrix,b.plantas.matrix);
          matrix.multiplyMatrices(parentMatrix,plant.matrix).multiply(mesh.matrix);
          instances.setMatrixAt(n,matrix);instances.setColorAt(n++,mesh.material.color);
        }
        instances.count=n;instances.instanceMatrix.needsUpdate=true;
        if(instances.instanceColor)instances.instanceColor.needsUpdate=true;
      }
    };
  }
  /* V12.1: efectos agrupados; el suelo conserva su malla PBR. */
  function efectosV12({activos,carrusel,bandejas,gHabitat,goteros,lamparas,gasometro,control,hepa,bomba,N_REG,N_POS,Y_SUELO,HONDO,R0,R1,reborde,anguloSuelo,TAU}){
    const gotasActivas=activos.includes('gotas'),lamparasActivas=activos.includes('lamparas');
    const instancias={gotas:0,impactos:0,haces:0,pools:0,halos:0,burbujas:0,polvo:0,leds:0,gotasInspeccion:0,impactosInspeccion:0},lotes=[];
    const soportes=activos.includes('leds')?(hepa?.children.length||0)+(bomba?.children.length||0):0;
    const api={activos,instancias,instances:instancias,maxCalls:15,humedad:gotasActivas,
      get calls(){if(!gHabitat.visible)return 0;let n=soportes;for(const m of lotes)if(m.visible&&(m.count??1)>0)n++;return n;},
      get drawCalls(){return this.calls;}};
    const matriz=new T.Matrix4(),rotacion=new T.Quaternion(),posicion=new T.Vector3(),escala=new T.Vector3(1,1,1),euler=new T.Euler(0,0,0,'YXZ');
    const colocar=(mesh,n,x,y,z,ang,sx=1,sy=1,sz=1,horizontal=false)=>{
      posicion.set(x,y,z);euler.set(horizontal?-Math.PI/2:0,ang,0,'YXZ');rotacion.setFromEuler(euler);
      escala.set(sx,sy,sz);matriz.compose(posicion,rotacion,escala);mesh.setMatrixAt(n,matriz);
    };
    let gotas,impactos,haces,pools,halos,burbujas,sello,polvo,leds,gotasInspeccion,impactosInspeccion,tiempo=0,mascaraPrevia=-1,extraidoPrevio=-2,bombaPrevia=null;
    const reloj={value:0},pulso={value:1},luzVfx={value:1},luzPolvo={value:1},moverHojas={value:1};
    const posicionesLampara=Array.from({length:6},()=>new T.Vector3());
    const tmpLuz=new T.Vector3(),invHab=new T.Matrix4(),localInspeccion=new T.Matrix4(),piezaEnHab=new T.Matrix4(),piezaEnHabPrevia=new T.Matrix4();
    let extraidoMatrizPrevia=-1;
    function iluminar(mat,instanciado,hoja){
      const previo=mat.onBeforeCompile,clave=mat.customProgramCacheKey?.bind(mat);
      mat.onBeforeCompile=shader=>{
        if(previo)previo(shader);
        shader.uniforms.uLamparas={value:posicionesLampara};shader.uniforms.uLuzVfx=luzVfx;
        shader.uniforms.uTiempoHoja=reloj;shader.uniforms.uMoverHoja=moverHojas;
        shader.vertexShader=shader.vertexShader.replace('#include <common>',`#include <common>\nvarying vec3 vVfxWorld;uniform float uTiempoHoja,uMoverHoja;`)
          .replace('#include <begin_vertex>',`#include <begin_vertex>\n${hoja?'transformed.x += .004*uMoverHoja*sin(uTiempoHoja*1.7+position.y*19.+position.x*13.)*smoothstep(0.,.08,position.y);':''}\nvec4 vVfxLocal=vec4(transformed,1.);\n${instanciado?'#ifdef USE_INSTANCING\nvVfxLocal=instanceMatrix*vVfxLocal;\n#endif':''}\nvVfxWorld=(modelMatrix*vVfxLocal).xyz;`);
        shader.fragmentShader=shader.fragmentShader.replace('#include <common>',`#include <common>\nvarying vec3 vVfxWorld;uniform vec3 uLamparas[6];uniform float uLuzVfx;`)
          .replace('#include <opaque_fragment>',`float aporteVfx=0.;for(int i=0;i<6;i++){vec3 d=vVfxWorld-uLamparas[i];float radial=1.-smoothstep(.0,.72*.72,d.x*d.x+d.z*d.z);float vertical=smoothstep(-1.35,-1.10,d.y)*(1.-smoothstep(.05,.35,d.y));aporteVfx+=radial*vertical;}\noutgoingLight+=vec3(1.,.30,.57)*(.65*uLuzVfx*min(aporteVfx,1.35))*diffuseColor.rgb;\n#include <opaque_fragment>`);
      };
      mat.customProgramCacheKey=()=>`${clave?clave():''}|milpa-luz-v121-${instanciado}-${hoja}`;
      mat.needsUpdate=true;
    }
    if(gotasActivas){
      // Exagerado para legibilidad; caudal real ~2 L/h por gotero. Radio a .0055 era
      // sub-píxel desde la pose por defecto del hábitat (dist 11.4 m). El hueco real entre
      // boquilla y cama es de sólo ~5.5 cm, así que el radio no puede crecer mucho sin que
      // la gota ocupe toda la caída; en vez de eso también va en aditivo (abajo) para que
      // un punto de 1-2 px siga leyéndose como un destello sobre cualquier fondo.
      const capacidad=N_POS*2*3,RADIO_GOTA=.009,radioY=RADIO_GOTA*1.25,geoGota=new T.SphereGeometry(RADIO_GOTA,10,8),geoImpacto=new T.PlaneGeometry(1,1);
      const fases=new Float32Array(capacidad),fasesImpacto=new Float32Array(N_POS*2);
      geoGota.setAttribute('fase',new T.InstancedBufferAttribute(fases,1));
      geoImpacto.setAttribute('fase',new T.InstancedBufferAttribute(fasesImpacto,1));
      const caida={value:goteros[0].y0-Y_SUELO-radioY};
      gotas=new T.InstancedMesh(geoGota,new T.ShaderMaterial({uniforms:{uTiempo:reloj,uInicio:caida},transparent:true,depthWrite:false,
        blending:T.AdditiveBlending,
        vertexShader:`attribute float fase; uniform float uTiempo,uInicio; varying float vOp; varying vec3 vNormal,vVista;
          void main(){float u=fract(uTiempo*.48+fase);float viaje=clamp(u/.88,0.,1.);
            vOp=1.-smoothstep(.84,.94,u);vec3 p=position;p.y=p.y*1.25+mix(uInicio,${radioY.toFixed(6)},viaje);
            vec4 mv=modelViewMatrix*instanceMatrix*vec4(p,1.);vVista=normalize(-mv.xyz);vNormal=normalize(normalMatrix*mat3(instanceMatrix)*normal);
            gl_Position=projectionMatrix*mv;}`,
        fragmentShader:`varying float vOp; varying vec3 vNormal,vVista; void main(){float borde=pow(1.-abs(dot(normalize(vNormal),normalize(vVista))),2.);gl_FragColor=vec4(mix(vec3(.94,1.,1.),vec3(.22,.72,.96),borde),.9*vOp);}`}),capacidad);
      impactos=new T.InstancedMesh(geoImpacto,new T.ShaderMaterial({uniforms:{uTiempo:reloj},transparent:true,depthWrite:false,
        vertexShader:`attribute float fase; uniform float uTiempo; varying vec2 vPos; varying float vOp;
          void main(){float u=fract(uTiempo*1.44+fase*3.-.64);vOp=smoothstep(0.,.015,u)*(1.-smoothstep(.15,.24,u));
            float s=mix(.25,1.,smoothstep(0.,.14,u));vPos=uv*2.-1.;
            gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(position.xy*s,0.,1.);}`,
        fragmentShader:`varying vec2 vPos; varying float vOp; void main(){float r=length(vPos);
          float a=(1.-smoothstep(.04,.12,abs(r-.72)))*vOp*.58;gl_FragColor=vec4(.48,.82,1.,a);}`}),N_POS*2);
      for(const mesh of [gotas,impactos]){mesh.count=0;mesh.frustumCulled=false;mesh.castShadow=false;mesh.receiveShadow=false;
        mesh.instanceMatrix.setUsage(T.DynamicDrawUsage);carrusel.grupo.add(mesh);lotes.push(mesh);}
      gotasInspeccion=new T.InstancedMesh(geoGota.clone(),gotas.material,6);
      gotasInspeccion.count=0;gotasInspeccion.frustumCulled=false;gotasInspeccion.renderOrder=6;
      gotasInspeccion.instanceMatrix.setUsage(T.DynamicDrawUsage);
      impactosInspeccion=new T.InstancedMesh(geoImpacto.clone(),impactos.material,2);
      impactosInspeccion.count=0;impactosInspeccion.frustumCulled=false;impactosInspeccion.renderOrder=6;
      impactosInspeccion.instanceMatrix.setUsage(T.DynamicDrawUsage);
      const grupoInspeccion=new T.Group();grupoInspeccion.renderOrder=5;grupoInspeccion.add(gotasInspeccion,impactosInspeccion);
      gHabitat.add(grupoInspeccion);lotes.push(gotasInspeccion,impactosInspeccion);
      // Dos manchas locales por cartucho. Los uniformes existen antes del primer compile.
      const p1=new T.Vector2(goteros[0].x,goteros[0].z),p2=new T.Vector2(goteros[1].x,goteros[1].z);
      for(const b of bandejas){
        const mat=b.sustrato.material,humedad={value:0};mat.userData.humedad=humedad;
        mat.onBeforeCompile=shader=>{
          shader.uniforms.uHumedad=humedad;shader.uniforms.uTiempoHumedad=reloj;shader.uniforms.uPulsoHumedad=pulso;
          shader.uniforms.uGota1={value:p1};shader.uniforms.uGota2={value:p2};
          shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vSueloLocal;')
            .replace('#include <begin_vertex>','#include <begin_vertex>\nvSueloLocal=position;');
          shader.fragmentShader=shader.fragmentShader.replace('#include <common>',
            '#include <common>\nvarying vec3 vSueloLocal; uniform float uHumedad,uTiempoHumedad,uPulsoHumedad; uniform vec2 uGota1,uGota2; float mascaraHumedad(){if(uHumedad<=0.)return 0.;float d=min(length(vSueloLocal.xz-uGota1),length(vSueloLocal.xz-uGota2));float latido=1.+uPulsoHumedad*.035*sin(uTiempoHumedad*3.015929);return (1.-smoothstep(.025,.08,d))*step('+ (HONDO-.004).toFixed(5)+',vSueloLocal.y)*uHumedad*latido;}')
            .replace('#include <color_fragment>','#include <color_fragment>\nfloat humedadLocal=mascaraHumedad();diffuseColor.rgb*=mix(1.,.45,humedadLocal);')
            .replace('#include <roughnessmap_fragment>','#include <roughnessmap_fragment>\nroughnessFactor=mix(roughnessFactor,.20,humedadLocal);');
        };
        mat.customProgramCacheKey=()=> 'milpa-humedad-v12';
      }
    }
    if(lamparasActivas||activos.includes('hojas')){
      const vistos=new Set();
      for(const b of bandejas){
        if(lamparasActivas)iluminar(b.sustrato.material,false,false);
        b.plantas.traverse(o=>{if(o.isMesh&&!vistos.has(o.material)){
          vistos.add(o.material);iluminar(o.material,false,activos.includes('hojas')&&!!o.material.map&&!!o.material.bumpMap);
        }});
      }
      carrusel.grupo.traverse(o=>{if(o.name==='vegetacion-instanciada')iluminar(o.material,true,activos.includes('hojas')&&!!o.material.map&&!!o.material.bumpMap);});
    }
    if(lamparasActivas){
      const beamGeo=new T.BufferGeometry();
      beamGeo.setAttribute('position',new T.Float32BufferAttribute([
        -.5,0,0,.5,0,0,-.5,1,0,.5,1,0,0,0,-.5,0,0,.5,0,1,-.5,0,1,.5],3));
      beamGeo.setAttribute('uv',new T.Float32BufferAttribute([0,0,1,0,0,1,1,1,0,0,1,0,0,1,1,1],2));
      beamGeo.setIndex([0,1,2,2,1,3,4,5,6,6,5,7]);
      const luz={value:1},matHaz=new T.ShaderMaterial({uniforms:{uLuz:luz},transparent:true,depthWrite:false,
        depthTest:true,blending:T.AdditiveBlending,side:T.DoubleSide,
        vertexShader:`varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(position,1.);}`,
        fragmentShader:`uniform float uLuz; varying vec2 vUv; void main(){float borde=1.-smoothstep(.18,.5,abs(vUv.x-.5));
          float alto=smoothstep(0.,.16,vUv.y)*(1.-smoothstep(.77,1.,vUv.y));
          gl_FragColor=vec4(1.,.43,.66,.13*borde*alto*uLuz);}`});
      matHaz.forceSinglePass=true;
      haces=new T.InstancedMesh(beamGeo,matHaz,lamparas.length);
      const ancho=R1-R0-2*reborde,cuerda=(R0+R1)/2*(TAU/N_POS)*.86;
      const poolGeo=new T.PlaneGeometry(1,1),matPool=new T.ShaderMaterial({uniforms:{uLuz:luz,
        uRadio:{value:(R0+R1)/2},uAncho:{value:ancho},uCuerda:{value:cuerda},uTan:{value:Math.tan(anguloSuelo/2)}},transparent:true,
        depthWrite:false,depthTest:true,blending:T.AdditiveBlending,
        vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(position,1.);}`,
        fragmentShader:`uniform float uLuz,uRadio,uAncho,uCuerda,uTan;varying vec2 vUv;void main(){vec2 p=vUv*2.-1.;
          float limite=(uRadio+p.x*uAncho*.5)*uTan;
          float sector=1.-smoothstep(limite-.025,limite,abs(p.y*uCuerda*.5));
          float f=(1.-smoothstep(.72,1.,abs(p.x)))*(1.-smoothstep(.62,1.,abs(p.y)))*sector;
          gl_FragColor=vec4(1.,.34,.59,.095*f*uLuz);}`});
      pools=new T.InstancedMesh(poolGeo,matPool,N_POS-N_REG);
      for(let k=0;k<lamparas.length;k++){
        const a=lamparas[k].angulo;
        colocar(haces,k,Math.cos(a)*((R0+R1)/2),Y_SUELO,Math.sin(a)*((R0+R1)/2),-a,
          .62,lamparas[k].y-Y_SUELO,.62);
      }
      for(let p=N_REG;p<N_POS;p++){
        const a=p/N_POS*TAU;
        colocar(pools,p-N_REG,Math.cos(a)*((R0+R1)/2),Y_SUELO+.001,Math.sin(a)*((R0+R1)/2),-a,
          ancho,cuerda,1,true);
      }
      for(const mesh of [haces,pools]){mesh.instanceMatrix.needsUpdate=true;mesh.frustumCulled=false;
        mesh.castShadow=false;mesh.receiveShadow=false;gHabitat.add(mesh);lotes.push(mesh);}
      const haloGeo=new T.PlaneGeometry(1,1),haloMat=new T.ShaderMaterial({uniforms:{uLuz:luz},transparent:true,
        depthWrite:false,blending:T.AdditiveBlending,side:T.DoubleSide,
        vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(position,1.);}`,
        fragmentShader:`uniform float uLuz;varying vec2 vUv;void main(){vec2 p=vUv*2.-1.;float a=(1.-smoothstep(.15,1.,length(p)))*.16*uLuz;gl_FragColor=vec4(1.,.35,.62,a);}`});
      haloMat.forceSinglePass=true;
      halos=new T.InstancedMesh(haloGeo,haloMat,lamparas.length);
      for(let k=0;k<lamparas.length;k++){
        const a=lamparas[k].angulo;
        colocar(halos,k,Math.cos(a)*((R0+R1)/2),lamparas[k].y-.014,Math.sin(a)*((R0+R1)/2),-a,.14,.99,1,true);
      }
      halos.instanceMatrix.needsUpdate=true;halos.frustumCulled=false;gHabitat.add(halos);lotes.push(halos);
      instancias.haces=haces.count;instancias.pools=pools.count;
      instancias.halos=halos.count;
      api.luz=luz;
    }
    if(activos.includes('burbujas')&&gasometro){
      sello=new T.Mesh(new T.CylinderGeometry(.34,.34,.18,24,1,true),
        new T.MeshBasicMaterial({color:0x6cc7dd,transparent:true,opacity:.14,depthWrite:false}));
      sello.position.y=.06;gasometro.add(sello);lotes.push(sello);
      const mat=new T.MeshBasicMaterial({color:0xa7e9f5,transparent:true,opacity:.55,depthWrite:false});
      burbujas=new T.InstancedMesh(new T.SphereGeometry(.009,6,4),mat,24);
      for(let k=0;k<24;k++){
        const a=k/24*TAU;
        colocar(burbujas,k,Math.cos(a)*.318,.025+(k%6)*.045,Math.sin(a)*.318,0,1+(k%3)*.3,1+(k%3)*.3,1+(k%3)*.3);
      }
      burbujas.instanceMatrix.needsUpdate=true;burbujas.frustumCulled=false;gasometro.add(burbujas);lotes.push(burbujas);
      instancias.burbujas=24;
    }
    if(activos.includes('polvo')){
      const geo=new T.BufferGeometry(),coords=new Float32Array(180*3),fase=new Float32Array(180);
      for(let k=0;k<180;k++){
        const l=lamparas[k%6],r=(Math.sqrt((k*73%181)/181)-.5)*.88,a=k*2.399963;
        coords[k*3]=Math.cos(l.angulo)*((R0+R1)/2)+Math.cos(a)*r;
        coords[k*3+1]=Y_SUELO+.08+(k*37%173)/173*(l.y-Y_SUELO-.12);
        coords[k*3+2]=Math.sin(l.angulo)*((R0+R1)/2)+Math.sin(a)*r;
        fase[k]=(k*53%181)/181;
      }
      geo.setAttribute('position',new T.BufferAttribute(coords,3));geo.setAttribute('fase',new T.BufferAttribute(fase,1));
      polvo=new T.Points(geo,new T.ShaderMaterial({uniforms:{uTiempo:reloj,uLuz:luzPolvo},transparent:true,depthWrite:false,
        blending:T.AdditiveBlending,vertexShader:`attribute float fase;uniform float uTiempo,uLuz;varying float vA;
          void main(){vec3 p=position;p.y+=.025*sin(uTiempo*.4+fase*6.283);vec4 mv=modelViewMatrix*vec4(p,1.);
          gl_Position=projectionMatrix*mv;gl_PointSize=clamp(3.5/(-mv.z),1.,3.);vA=.11*uLuz;}`,
        fragmentShader:`varying float vA;void main(){float a=1.-smoothstep(.1,.5,length(gl_PointCoord-.5));gl_FragColor=vec4(1.,.62,.75,a*vA);}`}));
      polvo.frustumCulled=false;gHabitat.add(polvo);lotes.push(polvo);instancias.polvo=180;
    }
    if(activos.includes('leds')&&control&&hepa&&bomba){
      gHabitat.updateWorldMatrix(true,true);
      const sitios=[control,hepa,bomba];leds=new T.InstancedMesh(new T.SphereGeometry(.012,8,6),
        new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:1,depthWrite:false}),3);
      for(let k=0;k<3;k++){
        if(k===0)posicion.set(-.064,.10,.15);       // frente del tablero, fuera de la tapa x=-.05
        else if(k===1)posicion.set(.075,.04,.10);   // cara interior de HEPA, fuera de x=.0575
        else posicion.set(0,.085,0);                 // tapa superior de bomba, fuera de y=.07
        sitios[k].localToWorld(posicion);gHabitat.worldToLocal(posicion);
        matriz.makeTranslation(posicion.x,posicion.y,posicion.z);leds.setMatrixAt(k,matriz);
      }
      leds.setColorAt(0,new T.Color(0x75e8ff));leds.setColorAt(1,new T.Color(0x9dffc2));
      leds.setColorAt(2,new T.Color(0x75e8ff));
      leds.instanceMatrix.needsUpdate=true;leds.frustumCulled=false;gHabitat.add(leds);lotes.push(leds);instancias.leds=3;
    }
    const azulLed=new T.Color(0x75e8ff),ambarLed=new T.Color(0xffad58);
    api.actualizar=(dt,estado,extraido,cerrado,despiece,reducido,gas=0)=>{
      if(!reducido)tiempo+=dt;
      reloj.value=tiempo;luzVfx.value=lamparasActivas?estado.luz:0;luzPolvo.value=estado.luz;
      moverHojas.value=reducido?0:1;
      if(lamparasActivas){
        gHabitat.updateWorldMatrix(true,false);
        for(let k=0;k<6;k++){
          const a=lamparas[k].angulo;
          tmpLuz.set(Math.cos(a)*((R0+R1)/2),lamparas[k].y,Math.sin(a)*((R0+R1)/2));
          posicionesLampara[k].copy(tmpLuz).applyMatrix4(gHabitat.matrixWorld);
        }
      }
      if(gotasActivas){
        pulso.value=reducido||estado.bomba?0:1;
        let mascara=0;
        for(let i=0;i<N_POS;i++){
          const lote=estado.lotes[i];let planta=false;
          for(let j=0;j<lote.cultivos.length;j++)if(lote.cultivos[j].activa){planta=true;break;}
          if(planta&&lote.pos>=N_REG&&lote.pos<N_POS)mascara|=1<<i;
        }
        if(mascara!==mascaraPrevia||extraido!==extraidoPrevio||estado.bomba!==bombaPrevia){
          mascaraPrevia=mascara;extraidoPrevio=extraido;bombaPrevia=estado.bomba;let n=0,ni=0;
          for(let i=0;i<N_POS;i++){
            const cultivo=!!(mascara&(1<<i));
            bandejas[i].sustrato.material.userData.humedad.value=cultivo?1:0;
            if(!cultivo||estado.bomba||extraido===i)continue;
            for(let j=0;j<2;j++){
              const gt=goteros[i*2+j],a=i/N_POS*TAU,c=Math.cos(a),s=Math.sin(a),x=gt.x*c-gt.z*s,z=gt.x*s+gt.z*c;
              colocar(impactos,ni,x,Y_SUELO+.0007,z,0,.13,.13,1,true);
              impactos.geometry.attributes.fase.setX(ni,((i*2+j)*.61803398875)%1);ni++;
              for(let k=0;k<3;k++){
                colocar(gotas,n,x,Y_SUELO,z,0);
                gotas.geometry.attributes.fase.setX(n,((i*2+j)*.61803398875+k/3)%1);n++;
              }
            }
          }
          gotas.count=n;impactos.count=ni;instancias.gotas=n;instancias.impactos=ni;
          gotas.instanceMatrix.needsUpdate=impactos.instanceMatrix.needsUpdate=true;
          gotas.geometry.attributes.fase.needsUpdate=impactos.geometry.attributes.fase.needsUpdate=true;
        }
        gotasInspeccion.count=impactosInspeccion.count=0;
        if(extraido>=0&&extraido<N_POS&&!estado.bomba&&(mascara&(1<<extraido))){
          bandejas[extraido].g.updateWorldMatrix(true,false);
          invHab.copy(gHabitat.matrixWorld).invert();piezaEnHab.multiplyMatrices(invHab,bandejas[extraido].g.matrixWorld);
          if(extraido!==extraidoMatrizPrevia||!piezaEnHab.equals(piezaEnHabPrevia)){
            extraidoMatrizPrevia=extraido;piezaEnHabPrevia.copy(piezaEnHab);
            for(let j=0;j<2;j++){
              const indice=extraido*2+j,gt=goteros[indice];
              localInspeccion.makeRotationX(-Math.PI/2);localInspeccion.setPosition(gt.x,Y_SUELO+.0007,gt.z);
              matriz.copy(piezaEnHab).multiply(localInspeccion);
              matriz.scale(escala.set(.13,.13,1));impactosInspeccion.setMatrixAt(j,matriz);
              impactosInspeccion.geometry.attributes.fase.setX(j,(indice*.61803398875)%1);
              for(let k=0;k<3;k++){
                const n=j*3+k;
                localInspeccion.makeTranslation(gt.x,Y_SUELO,gt.z);
                matriz.copy(piezaEnHab).multiply(localInspeccion);gotasInspeccion.setMatrixAt(n,matriz);
                gotasInspeccion.geometry.attributes.fase.setX(n,(indice*.61803398875+k/3)%1);
              }
            }
            gotasInspeccion.instanceMatrix.needsUpdate=impactosInspeccion.instanceMatrix.needsUpdate=true;
            gotasInspeccion.geometry.attributes.fase.needsUpdate=impactosInspeccion.geometry.attributes.fase.needsUpdate=true;
          }
          gotasInspeccion.count=6;impactosInspeccion.count=2;
        }
        instancias.gotasInspeccion=gotasInspeccion.count;
        instancias.impactosInspeccion=impactosInspeccion.count;
      }
      if(burbujas){
        burbujas.material.opacity=.25+.3*Math.min(1,gas);
        if(!reducido&&gas>.02)for(let k=0;k<24;k++){
          const a=k/24*TAU,y=.02+((k%6)*.042+tiempo*.035)%.25;
          colocar(burbujas,k,Math.cos(a)*.318,y,Math.sin(a)*.318,0,1+(k%3)*.3,1+(k%3)*.3,1+(k%3)*.3);
        }
        if(!reducido&&gas>.02)burbujas.instanceMatrix.needsUpdate=true;
      }
      if(leds){leds.setColorAt(2,estado.bomba?ambarLed:azulLed);leds.instanceColor.needsUpdate=true;
        leds.material.opacity=reducido?.9:.76+.24*Math.sin(tiempo*2.2);}
      const mostrar=!cerrado&&despiece<.02;
      for(let i=0;i<lotes.length;i++){
        const mesh=lotes[i];if(mesh===burbujas)continue;
        const aguaInspeccion=mesh===gotasInspeccion||mesh===impactosInspeccion;
        mesh.visible=(mostrar||aguaInspeccion&&!cerrado)&&(mesh!==haces&&mesh!==pools&&mesh!==halos||estado.luz>.001);
      }
      if(burbujas)burbujas.visible=mostrar&&gas>.02;
      if(api.luz)api.luz.value=estado.luz;
    };
    return api;
  }
  /* ── V8: materiales escaneados y luz de entorno. Sin posprocesado: en la Intel integrada
     GTAO + brillo + MSAA en HDR costaban ~44 ms por fotograma frente a 12 ms del render. ── */
  const binario=b64=>{const s=atob(b64),u=new Uint8Array(s.length);for(let i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u;};
  // Poly Haven CC0 (vendor/texturas-pbr.js). Cada uso clona la textura para su propia repetición.
  const pbrBase={};
  const pbrListo=Promise.all(Object.entries(window.MILPA_PBR||{}).filter(([k])=>k!=='cielo').map(async([nombre,d])=>{
    const L=new T.TextureLoader(),carga=async(uri,color)=>{const t=await L.loadAsync(uri);t.wrapS=t.wrapT=T.RepeatWrapping;t.anisotropy=16;/* three lo recorta al máximo de la GPU */if(color)t.colorSpace=T.SRGBColorSpace;return t;};
    const [map,normalMap,roughnessMap]=await Promise.all([carga(d.map,true),carga(d.normalMap),carga(d.roughnessMap)]);
    pbrBase[nombre]={map,normalMap,roughnessMap};
  }));
  function pbr(nombre,repetir=1,rotar=0){
    const base=pbrBase[nombre];if(!base)return {};
    const out={};for(const [k,t] of Object.entries(base)){const c=t.clone();c.repeat.set(repetir,repetir);c.rotation=rotar;c.needsUpdate=true;out[k]=c;}
    return out;
  }
  // HDRI de Goegap (CC0) virado a cielo marciano: sólo reflejos, nunca fondo visible.
  function cieloMarte(renderer){
    const d=window.MILPA_PBR?.cielo;if(!d)return null;
    const b=binario(d.rgbe),n=d.ancho*d.alto,f=new Uint16Array(n*4),h=T.DataUtils.toHalfFloat,lin=new Float32Array(n*3);
    for(let i=0;i<n;i++){const e=b[i*4+3],k=e?2**(e-136):0;for(let c=0;c<3;c++)lin[i*3+c]=b[i*4+c]*k;}
    // El sol ya es la luz direccional: el mapa se normaliza (mediana 0.6) y se recorta en 4.
    const lum=i=>.2126*lin[i*3]+.7152*lin[i*3+1]+.0722*lin[i*3+2];
    const muestra=Array.from({length:4096},(_,j)=>lum(Math.floor(j*n/4096))).sort((x,y)=>x-y),escala=.6/Math.max(1e-6,muestra[2048]);
    for(let i=0;i<n;i++){
      const l=lum(i)*escala,m=(c,t)=>Math.min(4,(l*t*.8+lin[i*3+c]*escala*t*.2));   // cielo azul → butterscotch
      f[i*4]=h(m(0,1.18));f[i*4+1]=h(m(1,.74));f[i*4+2]=h(m(2,.50));f[i*4+3]=h(1);
    }
    const tex=new T.DataTexture(f,d.ancho,d.alto,T.RGBAFormat,T.HalfFloatType);
    tex.mapping=T.EquirectangularReflectionMapping;tex.magFilter=tex.minFilter=T.LinearFilter;tex.needsUpdate=true;
    const pm=new T.PMREMGenerator(renderer),rt=pm.fromEquirectangular(tex);pm.dispose();tex.dispose();return rt.texture;
  }
  // Cámara orbital con resorte críticamente amortiguado sobre (θ, φ, log d, mira): describe arcos
  // alrededor de la mira en vez de cortar en línea recta, y arranca y frena sin tirones con cualquier dt.
  function camaraSuave(){
    let x=null,v=null;const mira=new T.Vector3();
    return {mira,saltar(){x=null;},paso(camara,theta,phi,dist,objetivo,w,dt){
      const o=[theta,phi,Math.log(dist),objetivo.x,objetivo.y,objetivo.z];
      if(!x||!isFinite(w)){x=o.slice();v=o.map(()=>0);}
      else{
        x[0]=theta+((x[0]-theta+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;   // θ por el lado corto
        const e=Math.exp(-w*dt);
        for(let k=0;k<6;k++){const d=x[k]-o[k],a=v[k]+w*d;x[k]=o[k]+(d+a*dt)*e;v[k]=(v[k]-w*a*dt)*e;}
      }
      const r=Math.exp(x[2]);mira.set(x[3],x[4],x[5]);
      camara.position.set(mira.x+r*Math.sin(x[1])*Math.cos(x[0]),mira.y+r*Math.cos(x[1]),mira.z+r*Math.sin(x[1])*Math.sin(x[0]));camara.lookAt(mira);
    }};
  }
  window.MILPA_VISUAL={entorno,vegetacion,efectosV12,superficie,pbr,pbrListo,cieloMarte,camaraSuave};
})();
