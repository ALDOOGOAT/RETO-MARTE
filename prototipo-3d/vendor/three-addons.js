/* three.js r160 examples/jsm (MIT) empaquetados para el THREE global. Ver vendor/ORIGEN.md */
var THREE_ADDONS=(()=>{var es=Object.create;var De=Object.defineProperty;var ts=Object.getOwnPropertyDescriptor;var ss=Object.getOwnPropertyNames;var is=Object.getPrototypeOf,ns=Object.prototype.hasOwnProperty;var rs=(f,e)=>()=>{try{return e||f((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}},os=(f,e)=>{for(var t in e)De(f,t,{get:e[t],enumerable:!0})},Ot=(f,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of ss(e))!ns.call(f,s)&&s!==t&&De(f,s,{get:()=>e[s],enumerable:!(n=ts(e,s))||n.enumerable});return f};var k=(f,e,t)=>(t=f!=null?es(is(f)):{},Ot(e||!f||!f.__esModule?De(t,"default",{value:f,enumerable:!0}):t,f)),as=f=>Ot(De({},"__esModule",{value:!0}),f);var B=rs((ws,Ut)=>{Ut.exports=globalThis.THREE});var Ss={};os(Ss,{EffectComposer:()=>Ue,GLTFLoader:()=>Ie,GTAOPass:()=>ye,OutputPass:()=>Fe,RenderPass:()=>Be,ShaderPass:()=>ne,UnrealBloomPass:()=>re,clonarEsqueleto:()=>Vt});var c=k(B(),1);var F=k(B(),1);function it(f,e){if(e===F.TrianglesDrawMode)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),f;if(e===F.TriangleFanDrawMode||e===F.TriangleStripDrawMode){let t=f.getIndex();if(t===null){let r=[],o=f.getAttribute("position");if(o!==void 0){for(let a=0;a<o.count;a++)r.push(a);f.setIndex(r),t=f.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),f}let n=t.count-2,s=[];if(e===F.TriangleFanDrawMode)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let i=f.clone();return i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),f}var Ie=class extends c.Loader{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new ut(t)}),this.register(function(t){return new Tt(t)}),this.register(function(t){return new At(t)}),this.register(function(t){return new Mt(t)}),this.register(function(t){return new ht(t)}),this.register(function(t){return new dt(t)}),this.register(function(t){return new pt(t)}),this.register(function(t){return new mt(t)}),this.register(function(t){return new ct(t)}),this.register(function(t){return new gt(t)}),this.register(function(t){return new ft(t)}),this.register(function(t){return new xt(t)}),this.register(function(t){return new vt(t)}),this.register(function(t){return new at(t)}),this.register(function(t){return new St(t)}),this.register(function(t){return new bt(t)})}load(e,t,n,s){let i=this,r;if(this.resourcePath!=="")r=this.resourcePath;else if(this.path!==""){let l=c.LoaderUtils.extractUrlBase(e);r=c.LoaderUtils.resolveURL(l,this.path)}else r=c.LoaderUtils.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){s?s(l):console.error(l),i.manager.itemError(e),i.manager.itemEnd(e)},a=new c.FileLoader(this.manager);a.setPath(this.path),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){try{i.parse(l,r,function(h){t(h),i.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let i,r={},o={},a=new TextDecoder;if(typeof e=="string")i=JSON.parse(e);else if(e instanceof ArrayBuffer)if(a.decode(new Uint8Array(e,0,4))===zt){try{r[b.KHR_BINARY_GLTF]=new wt(e)}catch(u){s&&s(u);return}i=JSON.parse(r[b.KHR_BINARY_GLTF].content)}else i=JSON.parse(a.decode(e));else i=e;if(i.asset===void 0||i.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Nt(i,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,r[u.name]=!0}if(i.extensionsUsed)for(let h=0;h<i.extensionsUsed.length;++h){let u=i.extensionsUsed[h],d=i.extensionsRequired||[];switch(u){case b.KHR_MATERIALS_UNLIT:r[u]=new lt;break;case b.KHR_DRACO_MESH_COMPRESSION:r[u]=new Rt(i,this.dracoLoader);break;case b.KHR_TEXTURE_TRANSFORM:r[u]=new Et;break;case b.KHR_MESH_QUANTIZATION:r[u]=new yt;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(r),l.setPlugins(o),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,i){n.parse(e,t,s,i)})}};function ls(){let f={};return{get:function(e){return f[e]},add:function(e,t){f[e]=t},remove:function(e){delete f[e]},removeAll:function(){f={}}}}var b={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},at=class{constructor(e){this.parser=e,this.name=b.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let i=t[n];i.extensions&&i.extensions[this.name]&&i.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,i.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let i=t.json,a=((i.extensions&&i.extensions[this.name]||{}).lights||[])[e],l,h=new c.Color(16777215);a.color!==void 0&&h.setRGB(a.color[0],a.color[1],a.color[2],c.LinearSRGBColorSpace);let u=a.range!==void 0?a.range:0;switch(a.type){case"directional":l=new c.DirectionalLight(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new c.PointLight(h),l.distance=u;break;case"spot":l=new c.SpotLight(h),l.distance=u,a.spot=a.spot||{},a.spot.innerConeAngle=a.spot.innerConeAngle!==void 0?a.spot.innerConeAngle:0,a.spot.outerConeAngle=a.spot.outerConeAngle!==void 0?a.spot.outerConeAngle:Math.PI/4,l.angle=a.spot.outerConeAngle,l.penumbra=1-a.spot.innerConeAngle/a.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+a.type)}return l.position.set(0,0,0),l.decay=2,Y(l,a),a.intensity!==void 0&&(l.intensity=a.intensity),l.name=t.createUniqueName(a.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,i=n.json.nodes[e],o=(i.extensions&&i.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(a){return n._getNodeRef(t.cache,o,a)})}},lt=class{constructor(){this.name=b.KHR_MATERIALS_UNLIT}getMaterialType(){return c.MeshBasicMaterial}extendParams(e,t,n){let s=[];e.color=new c.Color(1,1,1),e.opacity=1;let i=t.pbrMetallicRoughness;if(i){if(Array.isArray(i.baseColorFactor)){let r=i.baseColorFactor;e.color.setRGB(r[0],r[1],r[2],c.LinearSRGBColorSpace),e.opacity=r[3]}i.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",i.baseColorTexture,c.SRGBColorSpace))}return Promise.all(s)}},ct=class{constructor(e){this.parser=e,this.name=b.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let i=s.extensions[this.name].emissiveStrength;return i!==void 0&&(t.emissiveIntensity=i),Promise.resolve()}},ut=class{constructor(e){this.parser=e,this.name=b.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:c.MeshPhysicalMaterial}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let i=[],r=s.extensions[this.name];if(r.clearcoatFactor!==void 0&&(t.clearcoat=r.clearcoatFactor),r.clearcoatTexture!==void 0&&i.push(n.assignTexture(t,"clearcoatMap",r.clearcoatTexture)),r.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=r.clearcoatRoughnessFactor),r.clearcoatRoughnessTexture!==void 0&&i.push(n.assignTexture(t,"clearcoatRoughnessMap",r.clearcoatRoughnessTexture)),r.clearcoatNormalTexture!==void 0&&(i.push(n.assignTexture(t,"clearcoatNormalMap",r.clearcoatNormalTexture)),r.clearcoatNormalTexture.scale!==void 0)){let o=r.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new c.Vector2(o,o)}return Promise.all(i)}},ft=class{constructor(e){this.parser=e,this.name=b.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:c.MeshPhysicalMaterial}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let i=[],r=s.extensions[this.name];return r.iridescenceFactor!==void 0&&(t.iridescence=r.iridescenceFactor),r.iridescenceTexture!==void 0&&i.push(n.assignTexture(t,"iridescenceMap",r.iridescenceTexture)),r.iridescenceIor!==void 0&&(t.iridescenceIOR=r.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),r.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=r.iridescenceThicknessMinimum),r.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=r.iridescenceThicknessMaximum),r.iridescenceThicknessTexture!==void 0&&i.push(n.assignTexture(t,"iridescenceThicknessMap",r.iridescenceThicknessTexture)),Promise.all(i)}},ht=class{constructor(e){this.parser=e,this.name=b.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:c.MeshPhysicalMaterial}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let i=[];t.sheenColor=new c.Color(0,0,0),t.sheenRoughness=0,t.sheen=1;let r=s.extensions[this.name];if(r.sheenColorFactor!==void 0){let o=r.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],c.LinearSRGBColorSpace)}return r.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=r.sheenRoughnessFactor),r.sheenColorTexture!==void 0&&i.push(n.assignTexture(t,"sheenColorMap",r.sheenColorTexture,c.SRGBColorSpace)),r.sheenRoughnessTexture!==void 0&&i.push(n.assignTexture(t,"sheenRoughnessMap",r.sheenRoughnessTexture)),Promise.all(i)}},dt=class{constructor(e){this.parser=e,this.name=b.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:c.MeshPhysicalMaterial}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let i=[],r=s.extensions[this.name];return r.transmissionFactor!==void 0&&(t.transmission=r.transmissionFactor),r.transmissionTexture!==void 0&&i.push(n.assignTexture(t,"transmissionMap",r.transmissionTexture)),Promise.all(i)}},pt=class{constructor(e){this.parser=e,this.name=b.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:c.MeshPhysicalMaterial}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let i=[],r=s.extensions[this.name];t.thickness=r.thicknessFactor!==void 0?r.thicknessFactor:0,r.thicknessTexture!==void 0&&i.push(n.assignTexture(t,"thicknessMap",r.thicknessTexture)),t.attenuationDistance=r.attenuationDistance||1/0;let o=r.attenuationColor||[1,1,1];return t.attenuationColor=new c.Color().setRGB(o[0],o[1],o[2],c.LinearSRGBColorSpace),Promise.all(i)}},mt=class{constructor(e){this.parser=e,this.name=b.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:c.MeshPhysicalMaterial}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let i=s.extensions[this.name];return t.ior=i.ior!==void 0?i.ior:1.5,Promise.resolve()}},gt=class{constructor(e){this.parser=e,this.name=b.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:c.MeshPhysicalMaterial}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let i=[],r=s.extensions[this.name];t.specularIntensity=r.specularFactor!==void 0?r.specularFactor:1,r.specularTexture!==void 0&&i.push(n.assignTexture(t,"specularIntensityMap",r.specularTexture));let o=r.specularColorFactor||[1,1,1];return t.specularColor=new c.Color().setRGB(o[0],o[1],o[2],c.LinearSRGBColorSpace),r.specularColorTexture!==void 0&&i.push(n.assignTexture(t,"specularColorMap",r.specularColorTexture,c.SRGBColorSpace)),Promise.all(i)}},vt=class{constructor(e){this.parser=e,this.name=b.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:c.MeshPhysicalMaterial}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let i=[],r=s.extensions[this.name];return t.bumpScale=r.bumpFactor!==void 0?r.bumpFactor:1,r.bumpTexture!==void 0&&i.push(n.assignTexture(t,"bumpMap",r.bumpTexture)),Promise.all(i)}},xt=class{constructor(e){this.parser=e,this.name=b.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:c.MeshPhysicalMaterial}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let i=[],r=s.extensions[this.name];return r.anisotropyStrength!==void 0&&(t.anisotropy=r.anisotropyStrength),r.anisotropyRotation!==void 0&&(t.anisotropyRotation=r.anisotropyRotation),r.anisotropyTexture!==void 0&&i.push(n.assignTexture(t,"anisotropyMap",r.anisotropyTexture)),Promise.all(i)}},Tt=class{constructor(e){this.parser=e,this.name=b.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let i=s.extensions[this.name],r=t.options.ktx2Loader;if(!r){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,i.source,r)}},At=class{constructor(e){this.parser=e,this.name=b.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,i=s.textures[e];if(!i.extensions||!i.extensions[t])return null;let r=i.extensions[t],o=s.images[r.source],a=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(a=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,r.source,a);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Mt=class{constructor(e){this.parser=e,this.name=b.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,i=s.textures[e];if(!i.extensions||!i.extensions[t])return null;let r=i.extensions[t],o=s.images[r.source],a=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(a=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,r.source,a);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},St=class{constructor(e){this.name=b.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],i=this.parser.getDependency("buffer",s.buffer),r=this.parser.options.meshoptDecoder;if(!r||!r.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return i.then(function(o){let a=s.byteOffset||0,l=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(o,a,l);return r.decodeGltfBufferAsync?r.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(p){return p.buffer}):r.ready.then(function(){let p=new ArrayBuffer(h*u);return r.decodeGltfBuffer(new Uint8Array(p),h,u,d,s.mode,s.filter),p})})}else return null}},bt=class{constructor(e){this.name=b.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==H.TRIANGLES&&l.mode!==H.TRIANGLE_STRIP&&l.mode!==H.TRIANGLE_FAN&&l.mode!==void 0)return null;let r=n.extensions[this.name].attributes,o=[],a={};for(let l in r)o.push(this.parser.getDependency("accessor",r[l]).then(h=>(a[l]=h,a[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,p=[];for(let g of u){let M=new c.Matrix4,v=new c.Vector3,T=new c.Quaternion,A=new c.Vector3(1,1,1),w=new c.InstancedMesh(g.geometry,g.material,d);for(let x=0;x<d;x++)a.TRANSLATION&&v.fromBufferAttribute(a.TRANSLATION,x),a.ROTATION&&T.fromBufferAttribute(a.ROTATION,x),a.SCALE&&A.fromBufferAttribute(a.SCALE,x),w.setMatrixAt(x,M.compose(v,T,A));for(let x in a)if(x==="_COLOR_0"){let y=a[x];w.instanceColor=new c.InstancedBufferAttribute(y.array,y.itemSize,y.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,a[x]);c.Object3D.prototype.copy.call(w,g),this.parser.assignFinalMaterial(w),p.push(w)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}},zt="glTF",Me=12,Bt={JSON:1313821514,BIN:5130562},wt=class{constructor(e){this.name=b.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Me),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==zt)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-Me,i=new DataView(e,Me),r=0;for(;r<s;){let o=i.getUint32(r,!0);r+=4;let a=i.getUint32(r,!0);if(r+=4,a===Bt.JSON){let l=new Uint8Array(e,Me+r,o);this.content=n.decode(l)}else if(a===Bt.BIN){let l=Me+r;this.body=e.slice(l,l+o)}r+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Rt=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=b.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,i=e.extensions[this.name].bufferView,r=e.extensions[this.name].attributes,o={},a={},l={};for(let h in r){let u=Ct[h]||h.toLowerCase();o[u]=r[h]}for(let h in e.attributes){let u=Ct[h]||h.toLowerCase();if(r[h]!==void 0){let d=n.accessors[e.attributes[h]],p=ie[d.componentType];l[u]=p.name,a[u]=d.normalized===!0}}return t.getDependency("bufferView",i).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(p){for(let g in p.attributes){let M=p.attributes[g],v=a[g];v!==void 0&&(M.normalized=v)}u(p)},o,l,c.LinearSRGBColorSpace,d)})})}},Et=class{constructor(){this.name=b.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},yt=class{constructor(){this.name=b.KHR_MESH_QUANTIZATION}},Le=class extends c.Interpolant{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,i=e*s*3+s;for(let r=0;r!==s;r++)t[r]=n[i+r];return t}interpolate_(e,t,n,s){let i=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=o*2,l=o*3,h=s-t,u=(n-t)/h,d=u*u,p=d*u,g=e*l,M=g-l,v=-2*p+3*d,T=p-d,A=1-v,w=T-d+u;for(let x=0;x!==o;x++){let y=r[M+x+o],C=r[M+x+a]*h,E=r[g+x+o],D=r[g+x]*h;i[x]=A*y+w*C+v*E+T*D}return i}},cs=new c.Quaternion,_t=class extends Le{interpolate_(e,t,n,s){let i=super.interpolate_(e,t,n,s);return cs.fromArray(i).normalize().toArray(i),i}},H={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ie={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ft={9728:c.NearestFilter,9729:c.LinearFilter,9984:c.NearestMipmapNearestFilter,9985:c.LinearMipmapNearestFilter,9986:c.NearestMipmapLinearFilter,9987:c.LinearMipmapLinearFilter},kt={33071:c.ClampToEdgeWrapping,33648:c.MirroredRepeatWrapping,10497:c.RepeatWrapping},nt={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ct={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Q={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},us={CUBICSPLINE:void 0,LINEAR:c.InterpolateLinear,STEP:c.InterpolateDiscrete},rt={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function fs(f){return f.DefaultMaterial===void 0&&(f.DefaultMaterial=new c.MeshStandardMaterial({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:c.FrontSide})),f.DefaultMaterial}function se(f,e,t){for(let n in t.extensions)f[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Y(f,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(f.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function hs(f,e,t){let n=!1,s=!1,i=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(i=!0),n&&s&&i)break}if(!n&&!s&&!i)return Promise.resolve(f);let r=[],o=[],a=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):f.attributes.position;r.push(d)}if(s){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):f.attributes.normal;o.push(d)}if(i){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):f.attributes.color;a.push(d)}}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(a)]).then(function(l){let h=l[0],u=l[1],d=l[2];return n&&(f.morphAttributes.position=h),s&&(f.morphAttributes.normal=u),i&&(f.morphAttributes.color=d),f.morphTargetsRelative=!0,f})}function ds(f,e){if(f.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)f.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(f.morphTargetInfluences.length===t.length){f.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)f.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function ps(f){let e,t=f.extensions&&f.extensions[b.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ot(t.attributes):e=f.indices+":"+ot(f.attributes)+":"+f.mode,f.targets!==void 0)for(let n=0,s=f.targets.length;n<s;n++)e+=":"+ot(f.targets[n]);return e}function ot(f){let e="",t=Object.keys(f).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+f[t[n]]+";";return e}function Pt(f){switch(f){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function ms(f){return f.search(/\.jpe?g($|\?)/i)>0||f.search(/^data\:image\/jpeg/)===0?"image/jpeg":f.search(/\.webp($|\?)/i)>0||f.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}var gs=new c.Matrix4,Nt=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new ls,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=!1,i=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,s=navigator.userAgent.indexOf("Firefox")>-1,i=s?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||s&&i<98?this.textureLoader=new c.TextureLoader(this.options.manager):this.textureLoader=new c.ImageBitmapLoader(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new c.FileLoader(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,i=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(r){return r._markDefs&&r._markDefs()}),Promise.all(this._invokeAll(function(r){return r.beforeRoot&&r.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(r){let o={scene:r[0][s.scene||0],scenes:r[0],animations:r[1],cameras:r[2],asset:s.asset,parser:n,userData:{}};return se(i,o,s),Y(o,s),Promise.all(n._invokeAll(function(a){return a.afterRoot&&a.afterRoot(o)})).then(function(){e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,i=t.length;s<i;s++){let r=t[s].joints;for(let o=0,a=r.length;o<a;o++)e[r[o]].isBone=!0}for(let s=0,i=e.length;s<i;s++){let r=e[s];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),i=(r,o)=>{let a=this.associations.get(r);a!=null&&this.associations.set(o,a);for(let[l,h]of r.children.entries())i(h,o.children[l])};return i(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let i=e(t[s]);i&&n.push(i)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(i){return i.loadNode&&i.loadNode(t)});break;case"mesh":s=this._invokeOne(function(i){return i.loadMesh&&i.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(i){return i.loadBufferView&&i.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(i){return i.loadMaterial&&i.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(i){return i.loadTexture&&i.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(i){return i.loadAnimation&&i.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(i){return i!=this&&i.getDependency&&i.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(i,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[b.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(i,r){n.load(c.LoaderUtils.resolveURL(t.uri,s.path),i,void 0,function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,i=t.byteOffset||0;return n.slice(i,i+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let r=nt[s.type],o=ie[s.componentType],a=s.normalized===!0,l=new o(s.count*r);return Promise.resolve(new c.BufferAttribute(l,r,a))}let i=[];return s.bufferView!==void 0?i.push(this.getDependency("bufferView",s.bufferView)):i.push(null),s.sparse!==void 0&&(i.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),i.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(i).then(function(r){let o=r[0],a=nt[s.type],l=ie[s.componentType],h=l.BYTES_PER_ELEMENT,u=h*a,d=s.byteOffset||0,p=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,M,v;if(p&&p!==u){let T=Math.floor(d/p),A="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+T+":"+s.count,w=t.cache.get(A);w||(M=new l(o,T*p,s.count*p/h),w=new c.InterleavedBuffer(M,p/h),t.cache.add(A,w)),v=new c.InterleavedBufferAttribute(w,a,d%p/h,g)}else o===null?M=new l(s.count*a):M=new l(o,d,s.count*a),v=new c.BufferAttribute(M,a,g);if(s.sparse!==void 0){let T=nt.SCALAR,A=ie[s.sparse.indices.componentType],w=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,y=new A(r[1],w,s.sparse.count*T),C=new l(r[2],x,s.sparse.count*a);o!==null&&(v=new c.BufferAttribute(v.array.slice(),v.itemSize,v.normalized));for(let E=0,D=y.length;E<D;E++){let R=y[E];if(v.setX(R,C[E*a]),a>=2&&v.setY(R,C[E*a+1]),a>=3&&v.setZ(R,C[E*a+2]),a>=4&&v.setW(R,C[E*a+3]),a>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return v})}loadTexture(e){let t=this.json,n=this.options,i=t.textures[e].source,r=t.images[i],o=this.textureLoader;if(r.uri){let a=n.manager.getHandler(r.uri);a!==null&&(o=a)}return this.loadTextureImage(e,i,o)}loadTextureImage(e,t,n){let s=this,i=this.json,r=i.textures[e],o=i.images[t],a=(o.uri||o.bufferView)+":"+r.sampler;if(this.textureCache[a])return this.textureCache[a];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=r.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let d=(i.samplers||{})[r.sampler]||{};return h.magFilter=Ft[d.magFilter]||c.LinearFilter,h.minFilter=Ft[d.minFilter]||c.LinearMipmapLinearFilter,h.wrapS=kt[d.wrapS]||c.RepeatWrapping,h.wrapT=kt[d.wrapT]||c.RepeatWrapping,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[a]=l,l}loadImageSource(e,t){let n=this,s=this.json,i=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let r=s.images[e],o=self.URL||self.webkitURL,a=r.uri||"",l=!1;if(r.bufferView!==void 0)a=n.getDependency("bufferView",r.bufferView).then(function(u){l=!0;let d=new Blob([u],{type:r.mimeType});return a=o.createObjectURL(d),a});else if(r.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(a).then(function(u){return new Promise(function(d,p){let g=d;t.isImageBitmapLoader===!0&&(g=function(M){let v=new c.Texture(M);v.needsUpdate=!0,d(v)}),t.load(c.LoaderUtils.resolveURL(u,i.path),g,void 0,p)})}).then(function(u){return l===!0&&o.revokeObjectURL(a),u.userData.mimeType=r.mimeType||ms(r.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",a),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){let i=this;return this.getDependency("texture",n.index).then(function(r){if(!r)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(r=r.clone(),r.channel=n.texCoord),i.extensions[b.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[b.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let a=i.associations.get(r);r=i.extensions[b.KHR_TEXTURE_TRANSFORM].extendTexture(r,o),i.associations.set(r,a)}}return s!==void 0&&(r.colorSpace=s),e[t]=r,r})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,i=t.attributes.color!==void 0,r=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,a=this.cache.get(o);a||(a=new c.PointsMaterial,c.Material.prototype.copy.call(a,n),a.color.copy(n.color),a.map=n.map,a.sizeAttenuation=!1,this.cache.add(o,a)),n=a}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,a=this.cache.get(o);a||(a=new c.LineBasicMaterial,c.Material.prototype.copy.call(a,n),a.color.copy(n.color),a.map=n.map,this.cache.add(o,a)),n=a}if(s||i||r){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),i&&(o+="vertex-colors:"),r&&(o+="flat-shading:");let a=this.cache.get(o);a||(a=n.clone(),i&&(a.vertexColors=!0),r&&(a.flatShading=!0),s&&(a.normalScale&&(a.normalScale.y*=-1),a.clearcoatNormalScale&&(a.clearcoatNormalScale.y*=-1)),this.cache.add(o,a),this.associations.set(a,this.associations.get(n))),n=a}e.material=n}getMaterialType(){return c.MeshStandardMaterial}loadMaterial(e){let t=this,n=this.json,s=this.extensions,i=n.materials[e],r,o={},a=i.extensions||{},l=[];if(a[b.KHR_MATERIALS_UNLIT]){let u=s[b.KHR_MATERIALS_UNLIT];r=u.getMaterialType(),l.push(u.extendParams(o,i,t))}else{let u=i.pbrMetallicRoughness||{};if(o.color=new c.Color(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],c.LinearSRGBColorSpace),o.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",u.baseColorTexture,c.SRGBColorSpace)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),r=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}i.doubleSided===!0&&(o.side=c.DoubleSide);let h=i.alphaMode||rt.OPAQUE;if(h===rt.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===rt.MASK&&(o.alphaTest=i.alphaCutoff!==void 0?i.alphaCutoff:.5)),i.normalTexture!==void 0&&r!==c.MeshBasicMaterial&&(l.push(t.assignTexture(o,"normalMap",i.normalTexture)),o.normalScale=new c.Vector2(1,1),i.normalTexture.scale!==void 0)){let u=i.normalTexture.scale;o.normalScale.set(u,u)}if(i.occlusionTexture!==void 0&&r!==c.MeshBasicMaterial&&(l.push(t.assignTexture(o,"aoMap",i.occlusionTexture)),i.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=i.occlusionTexture.strength)),i.emissiveFactor!==void 0&&r!==c.MeshBasicMaterial){let u=i.emissiveFactor;o.emissive=new c.Color().setRGB(u[0],u[1],u[2],c.LinearSRGBColorSpace)}return i.emissiveTexture!==void 0&&r!==c.MeshBasicMaterial&&l.push(t.assignTexture(o,"emissiveMap",i.emissiveTexture,c.SRGBColorSpace)),Promise.all(l).then(function(){let u=new r(o);return i.name&&(u.name=i.name),Y(u,i),t.associations.set(u,{materials:e}),i.extensions&&se(s,u,i),u})}createUniqueName(e){let t=c.PropertyBinding.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function i(o){return n[b.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(a){return Ht(a,o,t)})}let r=[];for(let o=0,a=e.length;o<a;o++){let l=e[o],h=ps(l),u=s[h];if(u)r.push(u.promise);else{let d;l.extensions&&l.extensions[b.KHR_DRACO_MESH_COMPRESSION]?d=i(l):d=Ht(new c.BufferGeometry,l,t),s[h]={primitive:l,promise:d},r.push(d)}}return Promise.all(r)}loadMesh(e){let t=this,n=this.json,s=this.extensions,i=n.meshes[e],r=i.primitives,o=[];for(let a=0,l=r.length;a<l;a++){let h=r[a].material===void 0?fs(this.cache):this.getDependency("material",r[a].material);o.push(h)}return o.push(t.loadGeometries(r)),Promise.all(o).then(function(a){let l=a.slice(0,a.length-1),h=a[a.length-1],u=[];for(let p=0,g=h.length;p<g;p++){let M=h[p],v=r[p],T,A=l[p];if(v.mode===H.TRIANGLES||v.mode===H.TRIANGLE_STRIP||v.mode===H.TRIANGLE_FAN||v.mode===void 0)T=i.isSkinnedMesh===!0?new c.SkinnedMesh(M,A):new c.Mesh(M,A),T.isSkinnedMesh===!0&&T.normalizeSkinWeights(),v.mode===H.TRIANGLE_STRIP?T.geometry=it(T.geometry,c.TriangleStripDrawMode):v.mode===H.TRIANGLE_FAN&&(T.geometry=it(T.geometry,c.TriangleFanDrawMode));else if(v.mode===H.LINES)T=new c.LineSegments(M,A);else if(v.mode===H.LINE_STRIP)T=new c.Line(M,A);else if(v.mode===H.LINE_LOOP)T=new c.LineLoop(M,A);else if(v.mode===H.POINTS)T=new c.Points(M,A);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+v.mode);Object.keys(T.geometry.morphAttributes).length>0&&ds(T,i),T.name=t.createUniqueName(i.name||"mesh_"+e),Y(T,i),v.extensions&&se(s,T,v),t.assignFinalMaterial(T),u.push(T)}for(let p=0,g=u.length;p<g;p++)t.associations.set(u[p],{meshes:e,primitives:p});if(u.length===1)return i.extensions&&se(s,u[0],i),u[0];let d=new c.Group;i.extensions&&se(s,d,i),t.associations.set(d,{meshes:e});for(let p=0,g=u.length;p<g;p++)d.add(u[p]);return d})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new c.PerspectiveCamera(c.MathUtils.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new c.OrthographicCamera(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Y(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,i=t.joints.length;s<i;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let i=s.pop(),r=s,o=[],a=[];for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u){o.push(u);let d=new c.Matrix4;i!==null&&d.fromArray(i.array,l*16),a.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new c.Skeleton(o,a)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],i=s.name?s.name:"animation_"+e,r=[],o=[],a=[],l=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){let p=s.channels[u],g=s.samplers[p.sampler],M=p.target,v=M.node,T=s.parameters!==void 0?s.parameters[g.input]:g.input,A=s.parameters!==void 0?s.parameters[g.output]:g.output;M.node!==void 0&&(r.push(this.getDependency("node",v)),o.push(this.getDependency("accessor",T)),a.push(this.getDependency("accessor",A)),l.push(g),h.push(M))}return Promise.all([Promise.all(r),Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(h)]).then(function(u){let d=u[0],p=u[1],g=u[2],M=u[3],v=u[4],T=[];for(let A=0,w=d.length;A<w;A++){let x=d[A],y=p[A],C=g[A],E=M[A],D=v[A];if(x===void 0)continue;x.updateMatrix&&x.updateMatrix();let R=n._createAnimationTracks(x,y,C,E,D);if(R)for(let _=0;_<R.length;_++)T.push(R[_])}return new c.AnimationClip(i,void 0,T)})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(i){let r=n._getNodeRef(n.meshCache,s.mesh,i);return s.weights!==void 0&&r.traverse(function(o){if(o.isMesh)for(let a=0,l=s.weights.length;a<l;a++)o.morphTargetInfluences[a]=s.weights[a]}),r})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],i=n._loadNodeShallow(e),r=[],o=s.children||[];for(let l=0,h=o.length;l<h;l++)r.push(n.getDependency("node",o[l]));let a=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([i,Promise.all(r),a]).then(function(l){let h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(d,gs)});for(let p=0,g=u.length;p<g;p++)h.add(u[p]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let i=t.nodes[e],r=i.name?s.createUniqueName(i.name):"",o=[],a=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return a&&o.push(a),i.camera!==void 0&&o.push(s.getDependency("camera",i.camera).then(function(l){return s._getNodeRef(s.cameraCache,i.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(i.isBone===!0?h=new c.Bone:l.length>1?h=new c.Group:l.length===1?h=l[0]:h=new c.Object3D,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(i.name&&(h.userData.name=i.name,h.name=r),Y(h,i),i.extensions&&se(n,h,i),i.matrix!==void 0){let u=new c.Matrix4;u.fromArray(i.matrix),h.applyMatrix4(u)}else i.translation!==void 0&&h.position.fromArray(i.translation),i.rotation!==void 0&&h.quaternion.fromArray(i.rotation),i.scale!==void 0&&h.scale.fromArray(i.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,i=new c.Group;n.name&&(i.name=s.createUniqueName(n.name)),Y(i,n),n.extensions&&se(t,i,n);let r=n.nodes||[],o=[];for(let a=0,l=r.length;a<l;a++)o.push(s.getDependency("node",r[a]));return Promise.all(o).then(function(a){for(let h=0,u=a.length;h<u;h++)i.add(a[h]);let l=h=>{let u=new Map;for(let[d,p]of s.associations)(d instanceof c.Material||d instanceof c.Texture)&&u.set(d,p);return h.traverse(d=>{let p=s.associations.get(d);p!=null&&u.set(d,p)}),u};return s.associations=l(i),i})}_createAnimationTracks(e,t,n,s,i){let r=[],o=e.name?e.name:e.uuid,a=[];Q[i.path]===Q.weights?e.traverse(function(d){d.morphTargetInfluences&&a.push(d.name?d.name:d.uuid)}):a.push(o);let l;switch(Q[i.path]){case Q.weights:l=c.NumberKeyframeTrack;break;case Q.rotation:l=c.QuaternionKeyframeTrack;break;case Q.position:case Q.scale:l=c.VectorKeyframeTrack;break;default:n.itemSize===1?l=c.NumberKeyframeTrack:l=c.VectorKeyframeTrack;break}let h=s.interpolation!==void 0?us[s.interpolation]:c.InterpolateLinear,u=this._getArrayFromAccessor(n);for(let d=0,p=a.length;d<p;d++){let g=new l(a[d]+"."+Q[i.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),r.push(g)}return r}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Pt(t.constructor),s=new Float32Array(t.length);for(let i=0,r=t.length;i<r;i++)s[i]=t[i]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof c.QuaternionKeyframeTrack?_t:Le;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function vs(f,e,t){let n=e.attributes,s=new c.Box3;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],a=o.min,l=o.max;if(a!==void 0&&l!==void 0){if(s.set(new c.Vector3(a[0],a[1],a[2]),new c.Vector3(l[0],l[1],l[2])),o.normalized){let h=Pt(ie[o.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let i=e.targets;if(i!==void 0){let o=new c.Vector3,a=new c.Vector3;for(let l=0,h=i.length;l<h;l++){let u=i[l];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],p=d.min,g=d.max;if(p!==void 0&&g!==void 0){if(a.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),a.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),a.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),d.normalized){let M=Pt(ie[d.componentType]);a.multiplyScalar(M)}o.max(a)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}f.boundingBox=s;let r=new c.Sphere;s.getCenter(r.center),r.radius=s.min.distanceTo(s.max)/2,f.boundingSphere=r}function Ht(f,e,t){let n=e.attributes,s=[];function i(r,o){return t.getDependency("accessor",r).then(function(a){f.setAttribute(o,a)})}for(let r in n){let o=Ct[r]||r.toLowerCase();o in f.attributes||s.push(i(n[r],o))}if(e.indices!==void 0&&!f.index){let r=t.getDependency("accessor",e.indices).then(function(o){f.setIndex(o)});s.push(r)}return c.ColorManagement.workingColorSpace!==c.LinearSRGBColorSpace&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${c.ColorManagement.workingColorSpace}" not supported.`),Y(f,e),vs(f,e,t),Promise.all(s).then(function(){return e.targets!==void 0?hs(f,e.targets,t):f})}var Z=k(B(),1);function Vt(f){let e=new Map,t=new Map,n=f.clone();return Gt(f,n,function(s,i){e.set(i,s),t.set(s,i)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let i=s,r=e.get(s),o=r.skeleton.bones;i.skeleton=r.skeleton.clone(),i.bindMatrix.copy(r.bindMatrix),i.skeleton.bones=o.map(function(a){return t.get(a)}),i.bind(i.skeleton,i.bindMatrix)}),n}function Gt(f,e,t){t(f,e);for(let n=0;n<f.children.length;n++)Gt(f.children[n],e.children[n],t)}var V=k(B(),1);var $={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var Se=k(B(),1);var j=k(B(),1),O=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},xs=new j.OrthographicCamera(-1,1,1,-1,0,1),Dt=class extends j.BufferGeometry{constructor(){super(),this.setAttribute("position",new j.Float32BufferAttribute([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new j.Float32BufferAttribute([0,2,0,0,2,0],2))}},Ts=new Dt,G=class{constructor(e){this._mesh=new j.Mesh(Ts,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,xs)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var ne=class extends O{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Se.ShaderMaterial?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Se.UniformsUtils.clone(e.uniforms),this.material=new Se.ShaderMaterial({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new G(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var be=class extends O{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let s=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let r,o;this.inverse?(r=0,o=1):(r=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),i.buffers.stencil.setFunc(s.ALWAYS,r,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(s.EQUAL,1,4294967295),i.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),i.buffers.stencil.setLocked(!0)}},Oe=class extends O{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Ue=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new V.Vector2);this._width=n.width,this._height=n.height,t=new V.WebGLRenderTarget(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:V.HalfFloatType}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ne($),this.copyPass.material.blending=V.NoBlending,this.clock=new V.Clock}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let s=0,i=this.passes.length;s<i;s++){let r=this.passes[s];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let o=this.renderer.getContext(),a=this.renderer.state.buffers.stencil;a.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),a.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}be!==void 0&&(r instanceof be?n=!0:r instanceof Oe&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new V.Vector2);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var jt=k(B(),1);var Be=class extends O{constructor(e,t,n=null,s=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new jt.Color}render(e,t,n){let s=e.autoClear;e.autoClear=!1;let i,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),e.autoClear=s}};var I=k(B(),1);var Kt={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var Fe=class extends O{constructor(){super();let e=Kt;this.uniforms=I.UniformsUtils.clone(e.uniforms),this.material=new I.RawShaderMaterial({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new G(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},I.ColorManagement.getTransfer(this._outputColorSpace)===I.SRGBTransfer&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===I.LinearToneMapping?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===I.ReinhardToneMapping?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===I.CineonToneMapping?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===I.ACESFilmicToneMapping?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===I.AgXToneMapping&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var S=k(B(),1);var Xt=k(B(),1),Wt={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Xt.Color(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var re=class f extends O{constructor(e,t,n,s){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new S.Vector2(e.x,e.y):new S.Vector2(256,256),this.clearColor=new S.Color(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);this.renderTargetBright=new S.WebGLRenderTarget(i,r,{type:S.HalfFloatType}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let d=new S.WebGLRenderTarget(i,r,{type:S.HalfFloatType});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let p=new S.WebGLRenderTarget(i,r,{type:S.HalfFloatType});p.texture.name="UnrealBloomPass.v"+u,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),i=Math.round(i/2),r=Math.round(r/2)}let o=Wt;this.highPassUniforms=S.UniformsUtils.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new S.ShaderMaterial({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let a=[3,5,7,9,11];i=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(a[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new S.Vector2(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new S.Vector3(1,1,1),new S.Vector3(1,1,1),new S.Vector3(1,1,1),new S.Vector3(1,1,1),new S.Vector3(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let h=$;this.copyUniforms=S.UniformsUtils.clone(h.uniforms),this.blendMaterial=new S.ShaderMaterial({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:S.AdditiveBlending,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new S.Color,this.oldClearAlpha=1,this.basic=new S.MeshBasicMaterial,this.fsQuad=new G(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let i=0;i<this.nMips;i++)this.renderTargetsHorizontal[i].setSize(n,s),this.renderTargetsVertical[i].setSize(n,s),this.separableBlurMaterials[i].uniforms.invSize.value=new S.Vector2(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,i){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();let r=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),i&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let a=0;a<this.nMips;a++)this.fsQuad.material=this.separableBlurMaterials[a],this.separableBlurMaterials[a].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[a].uniforms.direction.value=f.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[a]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[a].uniforms.colorTexture.value=this.renderTargetsHorizontal[a].texture,this.separableBlurMaterials[a].uniforms.direction.value=f.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[a]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[a];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,i&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=r}getSeperableBlurMaterial(e){let t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new S.ShaderMaterial({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new S.Vector2(.5,.5)},direction:{value:new S.Vector2(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new S.ShaderMaterial({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};re.BlurDirectionX=new S.Vector2(1,0);re.BlurDirectionY=new S.Vector2(0,1);var m=k(B(),1);var U=k(B(),1),we={name:"GTAOShader",defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new U.Vector2},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new U.Matrix4},cameraProjectionMatrixInverse:{value:new U.Matrix4},cameraWorldMatrix:{value:new U.Matrix4},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new U.Vector3(-1,-1,-1)},sceneBoxMax:{value:new U.Vector3(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;		
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif
		
		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {  
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {   
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}
		
		void main() {
			float depth = getDepth(vUv.xy);
			if (depth >= 1.0) {
				discard;
				return;
			}
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif
			
			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0, totalWeight = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {
				
				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w); 
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));
				
				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));
				
				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);	

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}		

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);		
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},Re={name:"GTAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},ke={name:"GTAOBlendShader",uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function qt(f=5){let e=Math.floor(f)%2===0?Math.floor(f)+1:Math.floor(f),t=As(e),n=t.length,s=new Uint8Array(n*4);for(let r=0;r<n;++r){let o=t[r],a=2*Math.PI*o/n,l=new U.Vector3(Math.cos(a),Math.sin(a),0).normalize();s[r*4]=(l.x*.5+.5)*255,s[r*4+1]=(l.y*.5+.5)*255,s[r*4+2]=127,s[r*4+3]=255}let i=new U.DataTexture(s,e,e);return i.wrapS=U.RepeatWrapping,i.wrapT=U.RepeatWrapping,i.needsUpdate=!0,i}function As(f){let e=Math.floor(f)%2===0?Math.floor(f)+1:Math.floor(f),t=e*e,n=Array(t).fill(0),s=Math.floor(e/2),i=e-1;for(let r=1;r<=t;){if(s===-1&&i===e?(i=e-2,s=0):(i===e&&(i=0),s<0&&(s=e-1)),n[s*e+i]!==0){i-=2,s++;continue}else n[s*e+i]=r++;i++,s--}return n}var oe=k(B(),1),Ee={name:"PoissonDenoiseShader",defines:{SAMPLES:16,SAMPLE_VECTORS:It(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new oe.Vector2},cameraProjectionMatrixInverse:{value:new oe.Matrix4},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;
		
		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}
		
		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1    
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1    
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);
			
			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;
		
			denoised += w * neighborColor;
			totalWeight += w;
		}
		
		void main() {
			float depth = getDepth(vUv.xy);	
			vec3 viewNormal = getViewNormal(vUv);	
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);
		
			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}
		
			if (totalWeight > 0.) { 
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function It(f,e,t){let n=Ms(f,e,t),s="vec3[SAMPLES](";for(let i=0;i<f;i++){let r=n[i];s+=`vec3(${r.x}, ${r.y}, ${r.z})${i<f-1?",":")"}`}return s}function Ms(f,e,t){let n=[];for(let s=0;s<f;s++){let i=2*Math.PI*e*s/f,r=Math.pow(s/(f-1),t);n.push(new oe.Vector3(Math.cos(i),Math.sin(i),r))}return n}var He=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(e,t,n){return e[0]*t+e[1]*n}dot3(e,t,n,s){return e[0]*t+e[1]*n+e[2]*s}dot4(e,t,n,s,i){return e[0]*t+e[1]*n+e[2]*s+e[3]*i}noise(e,t){let n,s,i,r=.5*(Math.sqrt(3)-1),o=(e+t)*r,a=Math.floor(e+o),l=Math.floor(t+o),h=(3-Math.sqrt(3))/6,u=(a+l)*h,d=a-u,p=l-u,g=e-d,M=t-p,v,T;g>M?(v=1,T=0):(v=0,T=1);let A=g-v+h,w=M-T+h,x=g-1+2*h,y=M-1+2*h,C=a&255,E=l&255,D=this.perm[C+this.perm[E]]%12,R=this.perm[C+v+this.perm[E+T]]%12,_=this.perm[C+1+this.perm[E+1]]%12,P=.5-g*g-M*M;P<0?n=0:(P*=P,n=P*P*this.dot(this.grad3[D],g,M));let N=.5-A*A-w*w;N<0?s=0:(N*=N,s=N*N*this.dot(this.grad3[R],A,w));let z=.5-x*x-y*y;return z<0?i=0:(z*=z,i=z*z*this.dot(this.grad3[_],x,y)),70*(n+s+i)}noise3d(e,t,n){let s,i,r,o,l=(e+t+n)*.3333333333333333,h=Math.floor(e+l),u=Math.floor(t+l),d=Math.floor(n+l),p=1/6,g=(h+u+d)*p,M=h-g,v=u-g,T=d-g,A=e-M,w=t-v,x=n-T,y,C,E,D,R,_;A>=w?w>=x?(y=1,C=0,E=0,D=1,R=1,_=0):A>=x?(y=1,C=0,E=0,D=1,R=0,_=1):(y=0,C=0,E=1,D=1,R=0,_=1):w<x?(y=0,C=0,E=1,D=0,R=1,_=1):A<x?(y=0,C=1,E=0,D=0,R=1,_=1):(y=0,C=1,E=0,D=1,R=1,_=0);let P=A-y+p,N=w-C+p,z=x-E+p,ae=A-D+2*p,le=w-R+2*p,ce=x-_+2*p,ue=A-1+3*p,fe=w-1+3*p,L=x-1+3*p,J=h&255,ee=u&255,te=d&255,_e=this.perm[J+this.perm[ee+this.perm[te]]]%12,Ce=this.perm[J+y+this.perm[ee+C+this.perm[te+E]]]%12,Pe=this.perm[J+D+this.perm[ee+R+this.perm[te+_]]]%12,Ne=this.perm[J+1+this.perm[ee+1+this.perm[te+1]]]%12,K=.6-A*A-w*w-x*x;K<0?s=0:(K*=K,s=K*K*this.dot3(this.grad3[_e],A,w,x));let X=.6-P*P-N*N-z*z;X<0?i=0:(X*=X,i=X*X*this.dot3(this.grad3[Ce],P,N,z));let W=.6-ae*ae-le*le-ce*ce;W<0?r=0:(W*=W,r=W*W*this.dot3(this.grad3[Pe],ae,le,ce));let q=.6-ue*ue-fe*fe-L*L;return q<0?o=0:(q*=q,o=q*q*this.dot3(this.grad3[Ne],ue,fe,L)),32*(s+i+r+o)}noise4d(e,t,n,s){let i=this.grad4,r=this.simplex,o=this.perm,a=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20,h,u,d,p,g,M=(e+t+n+s)*a,v=Math.floor(e+M),T=Math.floor(t+M),A=Math.floor(n+M),w=Math.floor(s+M),x=(v+T+A+w)*l,y=v-x,C=T-x,E=A-x,D=w-x,R=e-y,_=t-C,P=n-E,N=s-D,z=R>_?32:0,ae=R>P?16:0,le=_>P?8:0,ce=R>N?4:0,ue=_>N?2:0,fe=P>N?1:0,L=z+ae+le+ce+ue+fe,J=r[L][0]>=3?1:0,ee=r[L][1]>=3?1:0,te=r[L][2]>=3?1:0,_e=r[L][3]>=3?1:0,Ce=r[L][0]>=2?1:0,Pe=r[L][1]>=2?1:0,Ne=r[L][2]>=2?1:0,K=r[L][3]>=2?1:0,X=r[L][0]>=1?1:0,W=r[L][1]>=1?1:0,q=r[L][2]>=1?1:0,Lt=r[L][3]>=1?1:0,ze=R-J+l,Ve=_-ee+l,Ge=P-te+l,je=N-_e+l,Ke=R-Ce+2*l,Xe=_-Pe+2*l,We=P-Ne+2*l,qe=N-K+2*l,Qe=R-X+3*l,Ye=_-W+3*l,Ze=P-q+3*l,$e=N-Lt+3*l,Je=R-1+4*l,et=_-1+4*l,tt=P-1+4*l,st=N-1+4*l,he=v&255,de=T&255,pe=A&255,me=w&255,Qt=o[he+o[de+o[pe+o[me]]]]%32,Yt=o[he+J+o[de+ee+o[pe+te+o[me+_e]]]]%32,Zt=o[he+Ce+o[de+Pe+o[pe+Ne+o[me+K]]]]%32,$t=o[he+X+o[de+W+o[pe+q+o[me+Lt]]]]%32,Jt=o[he+1+o[de+1+o[pe+1+o[me+1]]]]%32,ge=.6-R*R-_*_-P*P-N*N;ge<0?h=0:(ge*=ge,h=ge*ge*this.dot4(i[Qt],R,_,P,N));let ve=.6-ze*ze-Ve*Ve-Ge*Ge-je*je;ve<0?u=0:(ve*=ve,u=ve*ve*this.dot4(i[Yt],ze,Ve,Ge,je));let xe=.6-Ke*Ke-Xe*Xe-We*We-qe*qe;xe<0?d=0:(xe*=xe,d=xe*xe*this.dot4(i[Zt],Ke,Xe,We,qe));let Te=.6-Qe*Qe-Ye*Ye-Ze*Ze-$e*$e;Te<0?p=0:(Te*=Te,p=Te*Te*this.dot4(i[$t],Qe,Ye,Ze,$e));let Ae=.6-Je*Je-et*et-tt*tt-st*st;return Ae<0?g=0:(Ae*=Ae,g=Ae*Ae*this.dot4(i[Jt],Je,et,tt,st)),27*(h+u+d+p+g)}};var ye=class f extends O{constructor(e,t,n,s,i,r,o){super(),this.width=n!==void 0?n:512,this.height=s!==void 0?s:512,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=new Map,this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=qt(),this.pdNoiseTexture=this.generateNoise(),this.gtaoRenderTarget=new m.WebGLRenderTarget(this.width,this.height,{type:m.HalfFloatType}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new m.ShaderMaterial({defines:Object.assign({},we.defines),uniforms:m.UniformsUtils.clone(we.uniforms),vertexShader:we.vertexShader,fragmentShader:we.fragmentShader,blending:m.NoBlending,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.definesPERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new m.MeshNormalMaterial,this.normalMaterial.blending=m.NoBlending,this.pdMaterial=new m.ShaderMaterial({defines:Object.assign({},Ee.defines),uniforms:m.UniformsUtils.clone(Ee.uniforms),vertexShader:Ee.vertexShader,fragmentShader:Ee.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new m.ShaderMaterial({defines:Object.assign({},Re.defines),uniforms:m.UniformsUtils.clone(Re.uniforms),vertexShader:Re.vertexShader,fragmentShader:Re.fragmentShader,blending:m.NoBlending}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new m.ShaderMaterial({uniforms:m.UniformsUtils.clone($.uniforms),vertexShader:$.vertexShader,fragmentShader:$.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:m.DstColorFactor,blendDst:m.ZeroFactor,blendEquation:m.AddEquation,blendSrcAlpha:m.DstAlphaFactor,blendDstAlpha:m.ZeroFactor,blendEquationAlpha:m.AddEquation}),this.blendMaterial=new m.ShaderMaterial({uniforms:m.UniformsUtils.clone(ke.uniforms),vertexShader:ke.vertexShader,fragmentShader:ke.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:m.CustomBlending,blendSrc:m.DstColorFactor,blendDst:m.ZeroFactor,blendEquation:m.AddEquation,blendSrcAlpha:m.DstAlphaFactor,blendDstAlpha:m.ZeroFactor,blendEquationAlpha:m.AddEquation}),this.fsQuad=new G(null),this.originalClearColor=new m.Color,this.setGBuffer(i?i.depthTexture:void 0,i?i.normalTexture:void 0),r!==void 0&&this.updateGtaoMaterial(r),o!==void 0&&this.updatePdMaterial(o)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new m.DepthTexture,this.depthTexture.format=m.DepthStencilFormat,this.depthTexture.type=m.UnsignedInt248Type,this.normalRenderTarget=new m.WebGLRenderTarget(this.width,this.height,{minFilter:m.NearestFilter,magFilter:m.NearestFilter,type:m.HalfFloatType,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);let n=this.normalTexture?1:0,s=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=s,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=s,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=It(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,n){switch(this._renderGBuffer&&(this.overrideVisibility(),this.renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this.renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case f.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=m.NoBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case f.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=m.NoBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case f.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=m.NoBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case f.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case f.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=m.NoBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case f.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=m.NoBlending,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}renderPass(e,t,n,s,i){e.getClearColor(this.originalClearColor);let r=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,s!=null&&(e.setClearColor(s),e.setClearAlpha(i||0),e.clear()),this.fsQuad.material=t,this.fsQuad.render(e),e.autoClear=o,e.setClearColor(this.originalClearColor),e.setClearAlpha(r)}renderOverride(e,t,n,s,i){e.getClearColor(this.originalClearColor);let r=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,s=t.clearColor||s,i=t.clearAlpha||i,s!=null&&(e.setClearColor(s),e.setClearAlpha(i||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this.originalClearColor),e.setClearAlpha(r)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(n){t.set(n,n.visible),(n.isPoints||n.isLine)&&(n.visible=!1)})}restoreVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(n){let s=t.get(n);n.visible=s}),t.clear()}generateNoise(e=64){let t=new He,n=e*e*4,s=new Uint8Array(n);for(let r=0;r<e;r++)for(let o=0;o<e;o++){let a=r,l=o;s[(r*e+o)*4]=(t.noise(a,l)*.5+.5)*255,s[(r*e+o)*4+1]=(t.noise(a+e,l)*.5+.5)*255,s[(r*e+o)*4+2]=(t.noise(a,l+e)*.5+.5)*255,s[(r*e+o)*4+3]=(t.noise(a+e,l+e)*.5+.5)*255}let i=new m.DataTexture(s,e,e,m.RGBAFormat,m.UnsignedByteType);return i.wrapS=m.RepeatWrapping,i.wrapT=m.RepeatWrapping,i.needsUpdate=!0,i}};ye.OUTPUT={Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};return as(Ss);})();
