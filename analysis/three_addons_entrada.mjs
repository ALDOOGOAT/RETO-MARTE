// Entrada de vendor/three-addons.js. `three` se resuelve al THREE global (build UMD):
// el visor se abre por file:// y Chrome no carga módulos ES desde ahí.
// V9: sin posprocesado (costaba ~44 ms por fotograma en la Intel integrada); sólo carga de personas.
export {GLTFLoader} from '../prototipo-3d/node_modules/three/examples/jsm/loaders/GLTFLoader.js';
export {clone as clonarEsqueleto} from '../prototipo-3d/node_modules/three/examples/jsm/utils/SkeletonUtils.js';
