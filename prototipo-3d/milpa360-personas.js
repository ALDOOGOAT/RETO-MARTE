/* Figura articulada para explicar tareas. Altura declarada; no maniquí antropométrico. */
(function(){
  const T=THREE;
  window.MILPA_PERSONA=function(altura=1.75){
    const root=new T.Group();root.name='persona-articulada';
    const lienzo=document.createElement('canvas');lienzo.width=lienzo.height=128;const ctx=lienzo.getContext('2d');ctx.fillStyle='#e9eeee';ctx.fillRect(0,0,128,128);
    for(let n=0;n<1600;n++){ctx.fillStyle=n%2?'#e1e7e7':'#f0f3f1';ctx.fillRect(n*43%128,n*71%128,1,2);}
    const trama=new T.CanvasTexture(lienzo);trama.colorSpace=T.SRGBColorSpace;trama.wrapS=trama.wrapT=T.RepeatWrapping;trama.repeat.set(3,3);
    const tela=new T.MeshStandardMaterial({color:0xcbd9d7,map:trama,roughness:.87});
    const azul=new T.MeshStandardMaterial({color:0x274655,roughness:.83});
    const piel=new T.MeshStandardMaterial({color:0xc49b78,roughness:.84});
    const oscuro=new T.MeshStandardMaterial({color:0x25313a,roughness:.62});
    const vidrio=new T.MeshStandardMaterial({color:0x77bbce,roughness:.26,metalness:.25});
    const m=(geo,mat,pos,parent=root)=>{const o=new T.Mesh(geo,mat);o.position.set(...pos);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;};
    const oval=(size,mat,pos,parent)=>{const o=m(new T.SphereGeometry(1,16,12),mat,pos,parent);o.scale.set(...size);return o;};
    const torso=new T.Group();torso.position.y=1.13;root.add(torso);
    oval([.205,.285,.115],tela,[0,.10,0],torso);
    oval([.17,.11,.11],azul,[0,-.15,0],torso);
    m(new T.BoxGeometry(.015,.32,.008),azul,[0,.12,.112],torso);
    m(new T.BoxGeometry(.085,.06,.014),azul,[.10,.19,.111],torso);
    const cabeza=new T.Group();cabeza.position.set(0,.37,0);torso.add(cabeza);
    m(new T.CylinderGeometry(.047,.055,.08,12),piel,[0,.02,0],cabeza);
    oval([.091,.116,.089],piel,[0,.125,0],cabeza);
    oval([.094,.055,.092],oscuro,[0,.201,-.004],cabeza);
    oval([.018,.023,.017],piel,[0,.116,.084],cabeza);
    for(const s of [-1,1]){
      oval([.018,.027,.014],piel,[s*.088,.123,0],cabeza);
      oval([.009,.006,.005],oscuro,[s*.031,.146,.084],cabeza);
    }
    const brazos=[],piernas=[];
    for(const s of [-1,1]){
      const brazo=new T.Group();brazo.position.set(s*.205,.27,0);torso.add(brazo);
      m(new T.CapsuleGeometry(.051,.215,4,10),tela,[0,-.135,0],brazo);
      const codo=new T.Group();codo.position.y=-.27;brazo.add(codo);
      m(new T.CapsuleGeometry(.041,.185,4,10),tela,[0,-.115,0],codo);
      m(new T.CylinderGeometry(.044,.043,.043,10),azul,[0,-.223,0],codo);
      oval([.032,.062,.028],piel,[0,-.276,.008],codo);
      brazos.push({brazo,codo,s});
      const pierna=new T.Group();pierna.position.set(s*.09,.93,0);root.add(pierna);
      m(new T.CapsuleGeometry(.074,.32,4,12),tela,[0,-.20,0],pierna);
      const rodilla=new T.Group();rodilla.position.y=-.42;pierna.add(rodilla);
      m(new T.CapsuleGeometry(.057,.30,4,12),tela,[0,-.195,0],rodilla);
      oval([.073,.062,.135],oscuro,[0,-.445,.045],rodilla);
      m(new T.BoxGeometry(.142,.018,.25),oscuro,[0,-.498,.04],rodilla);
      piernas.push({pierna,rodilla,s});
    }
    const tablet=m(new T.BoxGeometry(.19,.125,.016),oscuro,[.06,-.015,.28],torso);
    m(new T.PlaneGeometry(.165,.098),vidrio,[0,0,.009],tablet);
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
      tablet.position.lerp(new T.Vector3(consultando?.06:-.22,consultando?-.015:-.18,consultando?.28:.07),k);
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
