// node analysis/textos_fichas.mjs → JSON {es:{clave:texto}, en:{...}} con lo que lee la isla de voz:
// · cada ficha: título y resumen público (si no hay resumen, las dos primeras frases del texto);
// · acceso-N: nombre y explicación de cada fase de milpa360-acceso.html;
// · atlas-*: titular y entradilla de cada sección de visuales/atlas-marciano.html.
// Todo sale de los textos que ya muestra el visor: aquí no se escribe ninguna cifra.
import vm from 'node:vm';import {readFileSync} from 'node:fs';
const raiz=new URL('../',import.meta.url),leer=f=>readFileSync(new URL(f,raiz),'utf8');
const dict=Object.create(null),patrones=[];
const ctx={lang:'es'};ctx.window=ctx;ctx.globalThis=ctx;
ctx.MILPA_I18N={get lang(){return ctx.lang;},pick:(es,en)=>ctx.lang==='en'?en:es,add:v=>Object.assign(dict,v),patterns:patrones,
  t(s){if(ctx.lang!=='en')return s;const c=s.trim().replace(/\s+/g,' ');if(dict[c]!==undefined)return dict[c];for(const [re,fn] of patrones)if(re.test(c))return c.replace(re,fn);return s;}};
vm.createContext(ctx);
for(const f of ['milpa360-datos.js','milpa360-contenido.js','milpa360-traducciones.js'])vm.runInContext(leer('prototipo-3d/'+f),ctx);
const limpio=s=>String(s).replace(/<br\s*\/?>/g,' ').replace(/<[^>]+>/g,'').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
const punto=s=>/[.!?]$/.test(s)?s:s+'.';
const frases=s=>limpio(s).split(/(?<=[.!?])\s+/).slice(0,2).join(' ');

// Acceso: los arreglos de nombres y explicaciones tal como están en la página.
const acceso=leer('prototipo-3d/milpa360-acceso.html');
const arreglo=n=>vm.runInNewContext(acceso.match(new RegExp('const '+n+'=(\\[[^\\n]*?\\]);'))[1]);
const [nombres,explicaciones]=[arreglo('nombres'),arreglo('textos')];

// Atlas: por sección, su titular y su entradilla (o el resumen de la ficha que la entradilla muestra).
const atlas=leer('visuales/atlas-marciano.html');
const secciones=[...atlas.matchAll(/<section class="section[^"]*"(?: id="([a-z]+)")?>([\s\S]*?)<\/section>/g)].map(([,id,html])=>({id:id||'inicio',html}));
const attr=(html,sel,lang)=>[...html.matchAll(new RegExp('<'+sel+'[^>]*data-'+lang+'="([^"]*)"','g'))].map(m=>m[1]);

const out={};
for(const lang of ['es','en']){
  ctx.lang=lang;const F=ctx.MILPA_FICHAS(ctx.MILPA_DATOS),t=ctx.MILPA_I18N.t;out[lang]={};
  for(const [k,f] of Object.entries(F))out[lang][k]=punto(limpio(f.tit))+' '+(f.resumen?limpio(f.resumen):frases(f.txt));
  nombres.forEach((n,i)=>out[lang]['acceso-'+i]=punto(t(n))+' '+t(explicaciones[i]));
  for(const {id,html} of secciones){
    const titular=attr(html,'h[12]',lang)[0],lead=attr(html,'p class="lead"',lang)[0],tarjeta=html.match(/<p class="lead" data-card="([a-z_]+)"/)?.[1];
    const hechos=id==='contexto'?attr(html,'h3',lang).join(' '):'';
    out[lang]['atlas-'+id]=[titular,lead||(tarjeta&&(F[tarjeta].resumen||frases(F[tarjeta].txt))),hechos].filter(Boolean).map(s=>punto(limpio(s))).join(' ');
  }
}
process.stdout.write(JSON.stringify(out,null,1));
