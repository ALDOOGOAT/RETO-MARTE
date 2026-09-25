// node analysis/empaquetar_three_addons.mjs  → prototipo-3d/vendor/three-addons.js (esbuild vía npx)
import {execFileSync} from 'node:child_process';
import {writeFileSync,rmSync} from 'node:fs';
import path from 'node:path';import {fileURLToPath} from 'node:url';
const raiz=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),tmp=path.join(raiz,'analysis/.three-shim.cjs');
writeFileSync(tmp,'module.exports=globalThis.THREE;');
execFileSync('npx',['--yes','esbuild@0.28.2',path.join(raiz,'analysis/three_addons_entrada.mjs'),'--bundle','--minify','--format=iife','--global-name=THREE_ADDONS',
  '--alias:three='+tmp,'--banner:js=/* three.js r160 examples/jsm (MIT) empaquetados para el THREE global. Ver vendor/ORIGEN.md */',
  '--outfile='+path.join(raiz,'prototipo-3d/vendor/three-addons.js')],{cwd:path.join(raiz,'prototipo-3d'),stdio:'inherit'});
rmSync(tmp);
