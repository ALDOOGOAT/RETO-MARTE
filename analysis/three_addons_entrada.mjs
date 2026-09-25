// Entrada de vendor/three-addons.js. `three` se resuelve al THREE global (build UMD):
// el visor se abre por file:// y Chrome no carga módulos ES desde ahí.
export {GLTFLoader} from '../prototipo-3d/node_modules/three/examples/jsm/loaders/GLTFLoader.js';
export {clone as clonarEsqueleto} from '../prototipo-3d/node_modules/three/examples/jsm/utils/SkeletonUtils.js';
export {EffectComposer} from '../prototipo-3d/node_modules/three/examples/jsm/postprocessing/EffectComposer.js';
export {RenderPass} from '../prototipo-3d/node_modules/three/examples/jsm/postprocessing/RenderPass.js';
export {ShaderPass} from '../prototipo-3d/node_modules/three/examples/jsm/postprocessing/ShaderPass.js';
export {OutputPass} from '../prototipo-3d/node_modules/three/examples/jsm/postprocessing/OutputPass.js';
export {UnrealBloomPass} from '../prototipo-3d/node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js';
export {GTAOPass} from '../prototipo-3d/node_modules/three/examples/jsm/postprocessing/GTAOPass.js';
