/* Tripulación V8: avatares escaneados Microsoft Rocketbox (MIT) con esqueleto y clips reales.
   Altura declarada; no es un maniquí antropométrico validado. Mira hacia +Z, pies en y = 0. */
(function(){
  const T=THREE,A=THREE_ADDONS,modelos={},pendientes=[];
  // Avance medido de la marcha lenta a 1.75 m (desplazamiento de pelvis / duración del ciclo).
  const PASO={operador:.74,cientifica:.87};
  const binario=b64=>{const s=atob(b64),u=new Uint8Array(s.length);for(let i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u.buffer;};
  const cargador=new T.TextureLoader();
  async function textura(uri,color){
    const t=await cargador.loadAsync(uri);t.flipY=false;t.anisotropy=8;if(color)t.colorSpace=T.SRGBColorSpace;return t;
  }
  async function cargar(tipo){
    const datos=MILPA_TRIPULACION[tipo],gltf=await new A.GLTFLoader().parseAsync(binario(datos.glb),'');
    const materiales={};
    await Promise.all(Object.entries(datos.materiales).map(async([nombre,d])=>{
      const [map,normalMap,roughnessMap]=await Promise.all([textura(d.map,true),d.normalMap&&textura(d.normalMap),d.roughnessMap&&textura(d.roughnessMap)]);
      const m=new T.MeshStandardMaterial({map,roughness:1,metalness:0});
      if(normalMap){m.normalMap=normalMap;m.normalScale.set(.9,.9);}
      if(roughnessMap)m.roughnessMap=roughnessMap;
      // Pelo y pestañas en tarjetas: recorte con cobertura alfa, sin ordenar transparencias.
      if(d.alfa){m.alphaTest=.42;m.alphaToCoverage=true;m.side=T.DoubleSide;m.roughness=.62;}
      m.name=nombre;m.userData.compartido=true;materiales[nombre]=m;
    }));
    gltf.scene.traverse(o=>{if(o.isMesh){o.material=materiales[o.material.name]||o.material;o.geometry.userData.compartido=true;}});
    // Los clips traen el avance de la pelvis: se quita la deriva lineal (queda el balanceo) y el
    // visor mueve la raíz. Así el bucle no retrocede y los pies no patinan.
    for(const clip of gltf.animations)for(const t of clip.tracks.filter(t=>/Pelvis\.position$/.test(t.name))){
      const v=t.values,n=t.times.length,d=t.times[n-1]-t.times[0]||1,deriva=[0,1,2].map(c=>v[(n-1)*3+c]-v[c]);
      for(let i=0;i<n;i++)for(let c=0;c<3;c++)v[i*3+c]-=deriva[c]*(t.times[i]-t.times[0])/d;
    }
    // Se orienta por la nariz, no por convenciones del exportador: el frente queda en +Z.
    gltf.scene.updateMatrixWorld(true);
    const hueso=n=>gltf.scene.getObjectByName(n.replace(/ /g,'_'))||gltf.scene.getObjectByName(n);
    const frente=new T.Vector3().subVectors(hueso('Bip01 MNose').getWorldPosition(new T.Vector3()),hueso('Bip01 Head').getWorldPosition(new T.Vector3())).setY(0).normalize();
    modelos[tipo]={gltf,giro:Math.atan2(frente.x,frente.z)};
  }
  const listo=Promise.all(Object.keys(window.MILPA_TRIPULACION||{}).map(cargar)).then(()=>pendientes.splice(0).forEach(f=>f()));

  function montar(root,tipo,altura){
    const {gltf,giro}=modelos[tipo],cuerpo=A.clonarEsqueleto(gltf.scene),orientado=new T.Group();
    cuerpo.name='cuerpo-'+tipo;orientado.rotation.y=-giro;orientado.add(cuerpo);root.add(orientado);
    cuerpo.traverse(o=>{if(o.isMesh){o.castShadow=o.receiveShadow=true;o.frustumCulled=false;if(o.isSkinnedMesh&&!root.getObjectByName('rostro-escaneado'))o.name='rostro-escaneado';}});
    const mezcla=new T.AnimationMixer(cuerpo),acciones={};
    for(const clip of gltf.animations){const a=mezcla.clipAction(clip);a.play();a.setEffectiveWeight(0);a.time=(root.id*1.37)%clip.duration;acciones[clip.name]=a;}
    const pesos=Object.fromEntries(Object.keys(acciones).map(k=>[k,0]));
    const tableta=new T.Group();let primera=true;
    root.userData.acciones=acciones;
    root.userData.animar=function(dt,velocidad=0,tarea='inspeccion'){
      const v=Math.abs(velocidad),objetivo=v>.04?'marcha':tarea==='inspeccion'?'consulta':tarea==='explicar'&&acciones.explica?'explica':'reposo';
      const k=primera||dt===0?1:1-Math.exp(-dt*3.2);primera=false;
      for(const [nombre,a] of Object.entries(acciones)){pesos[nombre]+=((nombre===objetivo?1:0)-pesos[nombre])*k;a.setEffectiveWeight(pesos[nombre]);}
      acciones.marcha.timeScale=v>.04?v*1.75/(altura*PASO[tipo]):1;
      tableta.visible=pesos.consulta>.5;
      mezcla.update(dt);
    };
    root.userData.animar(0,0,root.userData.tarea);
    // Altura y apoyo se miden con la pose ya aplicada: las cajas de malla quedan en caché.
    const base=root.position.clone();root.position.set(0,0,0);root.updateMatrixWorld(true);
    const caja=new T.Box3().setFromObject(root);root.scale.setScalar(altura/(caja.max.y-caja.min.y));
    cuerpo.position.y=-caja.min.y;root.position.copy(base);root.updateMatrixWorld(true);
    // Tableta en la mano derecha; sólo se ve mientras consulta.
    const mano=cuerpo.getObjectByName('Bip01_R_Hand')||cuerpo.getObjectByName('Bip01 R Hand');
    const marco=new T.Mesh(new T.BoxGeometry(.2,.011,.14),new T.MeshStandardMaterial({color:0x1d262c,roughness:.45,metalness:.5}));
    const pantalla=new T.Mesh(new T.PlaneGeometry(.18,.12),new T.MeshStandardMaterial({color:0x0d1a1f,emissive:0x4fb3c8,emissiveIntensity:.9,roughness:.2}));
    pantalla.rotation.x=-Math.PI/2;pantalla.position.y=.006;marco.add(pantalla);marco.castShadow=true;tableta.add(marco);tableta.name='tableta';
    const escala=root.scale.x/mano.getWorldScale(new T.Vector3()).x;
    tableta.scale.setScalar(escala);tableta.position.set(.03,.05,.08).multiplyScalar(escala);tableta.rotation.set(0,0,Math.PI/2);
    mano.add(tableta);tableta.visible=pesos.consulta>.5;
  }

  window.MILPA_PERSONA=function(altura=1.75,tipo='operador'){
    const root=new T.Group();root.name='persona-articulada';
    Object.assign(root.userData,{alturaDeclarada:altura,tarea:'inspeccion',tipo,animar(){}});
    if(modelos[tipo])montar(root,tipo,altura);else pendientes.push(()=>montar(root,tipo,altura));
    return root;
  };
  window.MILPA_PERSONA.listo=listo;
})();
