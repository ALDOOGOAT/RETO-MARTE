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
    ctx.putImageData(im,0,0);const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.anisotropy=4;
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
  /* ── V8: materiales escaneados y luz de entorno. Sin posprocesado: en la Intel integrada
     GTAO + brillo + MSAA en HDR costaban ~44 ms por fotograma frente a 12 ms del render. ── */
  const binario=b64=>{const s=atob(b64),u=new Uint8Array(s.length);for(let i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u;};
  // Poly Haven CC0 (vendor/texturas-pbr.js). Cada uso clona la textura para su propia repetición.
  const pbrBase={};
  const pbrListo=Promise.all(Object.entries(window.MILPA_PBR||{}).filter(([k])=>k!=='cielo').map(async([nombre,d])=>{
    const L=new T.TextureLoader(),carga=async(uri,color)=>{const t=await L.loadAsync(uri);t.wrapS=t.wrapT=T.RepeatWrapping;t.anisotropy=8;if(color)t.colorSpace=T.SRGBColorSpace;return t;};
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
  window.MILPA_VISUAL={entorno,vegetacion,superficie,pbr,pbrListo,cieloMarte,camaraSuave};
})();
