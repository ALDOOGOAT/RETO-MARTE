/* Acabado V6. Sólo representación: no modifica el modelo ni sus parámetros. */
(function(){
  const T=THREE;
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
    const batches=new Map(),matrix=new T.Matrix4(),parentMatrix=new T.Matrix4(),zero=new T.Vector3();
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
        items.forEach(({b,plant,mesh},i)=>{
          mesh.updateMatrix();parentMatrix.multiplyMatrices(b.g.matrix,b.plantas.matrix);
          matrix.multiplyMatrices(parentMatrix,plant.matrix).multiply(mesh.matrix);
          if(!b.plantas.visible)matrix.scale(zero);
          instances.setMatrixAt(i,matrix);instances.setColorAt(i,mesh.material.color);
        });
        instances.instanceMatrix.needsUpdate=true;
        if(instances.instanceColor)instances.instanceColor.needsUpdate=true;
      }
    };
  }
  window.MILPA_VISUAL={entorno,vegetacion};
})();
