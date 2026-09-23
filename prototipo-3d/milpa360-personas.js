/* Figura articulada para explicar tareas. Altura declarada; no maniquí antropométrico. */
(function(){
  const T=THREE;
  window.MILPA_PERSONA=function(altura=1.75){
    const root=new T.Group();root.name='persona-articulada';
    const lienzo=document.createElement('canvas');lienzo.width=lienzo.height=128;const ctx=lienzo.getContext('2d');ctx.fillStyle='#e9eeee';ctx.fillRect(0,0,128,128);
    for(let n=0;n<1600;n++){ctx.fillStyle=n%2?'#e1e7e7':'#f0f3f1';ctx.fillRect(n*43%128,n*71%128,1,2);}
    const trama=new T.CanvasTexture(lienzo);trama.colorSpace=T.SRGBColorSpace;trama.wrapS=trama.wrapT=T.RepeatWrapping;trama.repeat.set(3,3);
    const tela=new T.MeshStandardMaterial({color:0xcbd9d7,map:trama,roughness:.87});
    const azul=new T.MeshStandardMaterial({color:0x344c58,map:trama,roughness:.94});
    const piel=new T.MeshStandardMaterial({color:0xbc896b,roughness:.86});
    const labios=new T.MeshStandardMaterial({color:0x925f50,roughness:.94});
    const blanco=new T.MeshStandardMaterial({color:0xd6d3c6,roughness:.9});
    const oscuro=new T.MeshStandardMaterial({color:0x25313a,roughness:.62});
    const vidrio=new T.MeshStandardMaterial({color:0x77bbce,roughness:.26,metalness:.25});
    const m=(geo,mat,pos,parent=root)=>{const o=new T.Mesh(geo,mat);o.position.set(...pos);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;};
    const oval=(size,mat,pos,parent)=>{const o=m(new T.SphereGeometry(1,16,12),mat,pos,parent);o.scale.set(...size);return o;};
    // Secciones elípticas: hombros, caja torácica y cintura con proporciones propias.
    const perfil=(secciones,depth,mat,pos,parent)=>{
      const geo=new T.LatheGeometry(secciones.map(([r,y])=>new T.Vector2(r,y)),24);
      geo.scale(1,1,depth);return m(geo,mat,pos,parent);
    };
    const torso=new T.Group();torso.position.y=1.13;root.add(torso);
    perfil([[.14,-.18],[.158,-.12],[.155,-.02],[.18,.13],[.203,.25],[.174,.30],[.072,.32]],.61,tela,[0,0,0],torso);
    perfil([[.13,-.24],[.166,-.18],[.164,-.10],[.144,-.06]],.68,azul,[0,0,0],torso);
    m(new T.BoxGeometry(.009,.38,.004),oscuro,[0,.08,.106],torso); // cremallera
    m(new T.BoxGeometry(.018,.019,.010),vidrio,[0,.248,.113],torso);
    for(const side of [-1,1]){
      const bolsillo=m(new T.BoxGeometry(.085,.091,.009),tela,[side*.103,.145,.108],torso);bolsillo.rotation.z=-side*.07;
      m(new T.BoxGeometry(.085,.007,.010),azul,[side*.103,.18,.115],torso);
      const costura=m(new T.BoxGeometry(.004,.265,.004),azul,[side*.144,.025,.072],torso);costura.rotation.z=side*.055;
    }
    // Identificación bordada y cuello de tela, sin casco EVA dentro del módulo.
    m(new T.BoxGeometry(.061,.023,.003),azul,[-.105,.23,.111],torso);
    for(let i=0;i<3;i++)m(new T.BoxGeometry(.012,.013,.002),i===1?blanco:i===0?azul:labios,[-.125+i*.014,.23,.114],torso);
    const cuello=m(new T.TorusGeometry(.062,.016,6,24),azul,[0,.32,0],torso);cuello.rotation.x=Math.PI/2;
    const cabeza=new T.Group();cabeza.position.set(0,.34,0);torso.add(cabeza);
    m(new T.CylinderGeometry(.044,.052,.10,16),piel,[0,.02,0],cabeza);
    // Superficie continua: frente, pómulos, mandíbula y puente nasal esculpidos.
    const cabezaGeo=new T.SphereGeometry(1,48,36),verts=cabezaGeo.attributes.position;
    const campana=(x,y,cx,cy,sx,sy)=>Math.exp(-(((x-cx)/sx)**2)-((y-cy)/sy)**2);
    for(let i=0;i<verts.count;i++){
      const nx=verts.getX(i),ny=verts.getY(i),nz=verts.getZ(i);
      const jaw=ny<-.25?1-(Math.min(1,(-ny-.25)/.75))*.26:1;
      const x=nx*.086*jaw,y=.135+ny*.114;
      let z=nz*.081-.003;
      if(nz>0){
        z+=.021*campana(x,y,0,.134,.014,.042)+.017*campana(x,y,0,.113,.019,.013);
        for(const side of [-1,1])z+=.008*campana(x,y,side*.043,.119,.025,.025)-.004*campana(x,y,side*.032,.151,.018,.014);
        z+=.010*campana(x,y,0,.073,.032,.024);
      }
      verts.setXYZ(i,x,y,z);
    }
    cabezaGeo.computeVertexNormals();m(cabezaGeo,piel,[0,0,0],cabeza).name='rostro-continuo';
    // Cabello recortado sobre la calota; no una esfera apoyada en la cabeza.
    const cabelloGeo=new T.SphereGeometry(1,32,20,0,Math.PI*2,0,1),cab=cabelloGeo.attributes.position,cabUV=cabelloGeo.attributes.uv;
    for(let i=0;i<cab.count;i++){
      const phi=cabUV.getX(i)*Math.PI*2,front=Math.sin(phi);
      const theta=(1-cabUV.getY(i))*(1.53-.43*Math.max(0,front)+.30*Math.max(0,-front));
      cab.setXYZ(i,-Math.cos(phi)*Math.sin(theta)*.089,.141+Math.cos(theta)*.118,Math.sin(phi)*Math.sin(theta)*.087-.003);
    }
    cabelloGeo.computeVertexNormals();m(cabelloGeo,oscuro,[0,0,0],cabeza);
    for(const side of [-1,1]){
      oval([.011,.027,.018],piel,[side*.085,.125,-.006],cabeza);
      oval([.004,.015,.010],labios,[side*.094,.125,-.004],cabeza);
      oval([.012,.0035,.003],blanco,[side*.032,.147,.071],cabeza);
      oval([.003,.0035,.0018],oscuro,[side*.031,.147,.074],cabeza);
      const ceja=oval([.017,.002,.002],oscuro,[side*.033,.157,.074],cabeza);ceja.rotation.z=side*.11;
    }
    for(const side of [-1,1])oval([.003,.0015,.002],labios,[side*.008,.105,.107],cabeza);
    oval([.018,.0018,.002],labios,[0,.087,.085],cabeza);
    oval([.016,.0016,.002],piel,[0,.083,.084],cabeza);
    const brazos=[],piernas=[];
    for(const s of [-1,1]){
      const brazo=new T.Group();brazo.position.set(s*.205,.27,0);torso.add(brazo);
      perfil([[.038,-.265],[.047,-.23],[.056,-.1],[.058,-.02],[.036,.022]],.93,tela,[0,0,0],brazo);
      oval([.050,.028,.050],azul,[0,-.019,0],brazo);
      const codo=new T.Group();codo.position.y=-.27;brazo.add(codo);
      perfil([[.030,-.225],[.039,-.15],[.045,-.045],[.040,.01]],.94,tela,[0,0,0],codo);
      m(new T.CylinderGeometry(.044,.043,.043,10),azul,[0,-.223,0],codo);
      oval([.031,.043,.018],piel,[0,-.27,.006],codo);
      for(let f=0;f<4;f++){const dedo=m(new T.CapsuleGeometry(.006,.034-(f===3?.008:0),3,6),piel,[(f-1.5)*.014,-.308,.01],codo);dedo.rotation.x=-.18;}
      const pulgar=m(new T.CapsuleGeometry(.009,.030,3,6),piel,[-s*.034,-.268,.02],codo);pulgar.rotation.z=-s*.5;
      brazos.push({brazo,codo,s});
      const pierna=new T.Group();pierna.position.set(s*.09,.93,0);root.add(pierna);
      perfil([[.054,-.42],[.066,-.31],[.082,-.08],[.073,.035]],.94,azul,[0,0,0],pierna);
      m(new T.BoxGeometry(.02,.11,.09),azul,[s*.077,-.17,.008],pierna);
      const rodilla=new T.Group();rodilla.position.y=-.42;pierna.add(rodilla);
      perfil([[.044,-.4],[.049,-.31],[.059,-.13],[.055,.015]],.93,azul,[0,0,0],rodilla);
      oval([.048,.070,.019],tela,[0,-.04,.044],rodilla);
      oval([.073,.062,.135],oscuro,[0,-.445,.045],rodilla);
      m(new T.BoxGeometry(.142,.018,.25),oscuro,[0,-.498,.04],rodilla);
      for(let l=0;l<4;l++)m(new T.BoxGeometry(.054,.005,.006),tela,[0,-.406-l*.009,.093+l*.006],rodilla);
      piernas.push({pierna,rodilla,s});
    }
    const tablet=m(new T.BoxGeometry(.19,.125,.016),oscuro,[.06,-.015,.28],torso);
    m(new T.PlaneGeometry(.165,.098),vidrio,[0,0,.009],tablet);
    for(let i=0;i<3;i++)m(new T.PlaneGeometry(.095-i*.016,.005),blanco,[-.019,.025-i*.021,.010],tablet);
    // Compactar piezas rígidas por material, conservando cada articulación.
    function compacter(parent){
      [...parent.children].filter(o=>!o.isMesh).forEach(compacter);
      const batches=new Map();
      for(const o of [...parent.children])if(o.isMesh&&!o.children.length){const list=batches.get(o.material)||[];list.push(o);batches.set(o.material,list);}
      for(const [mat,list] of batches){if(list.length<2)continue;const attrs={position:[],normal:[],uv:[]};
        for(const o of list){o.updateMatrix();const geo=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();geo.applyMatrix4(o.matrix);for(const name of Object.keys(attrs))attrs[name].push(...geo.attributes[name].array);geo.dispose();o.geometry.dispose();parent.remove(o);}
        const geo=new T.BufferGeometry();for(const name of Object.keys(attrs))geo.setAttribute(name,new T.Float32BufferAttribute(attrs[name],name==='uv'?2:3));m(geo,mat,[0,0,0],parent);
      }
    }
    compacter(root);
    const tabletTarget=new T.Vector3();
    const neutral=new T.Box3().setFromObject(root);
    root.scale.setScalar(altura/(neutral.max.y-neutral.min.y));
    root.userData.alturaDeclarada=altura;root.userData.tarea='inspeccion';
    let paso=0;
    root.userData.animar=function(dt,velocidad=0,tarea='inspeccion',tiempo=0){
      const caminando=Math.min(1,Math.abs(velocidad)/.45);paso+=Math.abs(velocidad)*dt*10;
      torso.position.y=1.13+Math.sin(paso*2)*.014*caminando;
      cabeza.rotation.y=Math.sin(tiempo*.45)*.09*(1-caminando);
      cabeza.rotation.x=tarea==='inspeccion'?.14:0;
      const consultando=tarea==='inspeccion'&&caminando<.05,k=1-Math.exp(-dt*6);
      tablet.position.lerp(tabletTarget.set(consultando?.06:-.22,consultando?-.015:-.18,consultando?.28:.07),k);
      tablet.rotation.y=T.MathUtils.lerp(tablet.rotation.y,consultando?0:-Math.PI/2,k);
      for(const {pierna,rodilla,s} of piernas){const a=paso+(s<0?Math.PI:0);pierna.rotation.x=Math.sin(a)*.40*caminando;rodilla.rotation.x=Math.max(0,-Math.sin(a))*.62*caminando;}
      root.userData.piso??=root.position.y;
      const apoyo=Math.min(...piernas.map(({pierna,rodilla})=>{
        const a=pierna.rotation.x,b=a+rodilla.rotation.x,c=Math.cos(b),s=Math.sin(b);
        const suela=-.498*c-.04*s-.009*Math.abs(c)-.125*Math.abs(s);
        const bota=-.445*c-.045*s-Math.hypot(.062*c,.135*s);
        return .93-.42*Math.cos(a)+Math.min(suela,bota);
      }));
      root.position.y=root.userData.piso-apoyo*root.scale.y;
      for(const {brazo,codo,s} of brazos){brazo.rotation.z=-s*.07;brazo.rotation.x=-Math.sin(paso+(s<0?Math.PI:0))*.29*caminando;codo.rotation.x=-.12;
        if(!caminando&&tarea==='inspeccion'){brazo.rotation.x=-.34;codo.rotation.x=-.96+(s>0?Math.sin(tiempo*1.3)*.10:0);}
        if(!caminando&&tarea==='explicar'&&s>0){brazo.rotation.z=-.55;brazo.rotation.x=-.25;codo.rotation.x=-.8+Math.sin(tiempo)*.08;}
      }
    };
    return root;
  };
})();
