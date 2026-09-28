// node analysis/verificar_gestos.mjs
// Clasificación, filtro One Euro, histéresis y eventos del control por gestos, sin navegador ni
// cámara: se carga prototipo-3d/milpa360-gestos.js en un contexto vm y se le dan manos sintéticas
// de 21 puntos (misma topología que MediaPipe HandLandmarker).
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const ctx=vm.createContext({console,setTimeout,clearTimeout,performance,document:{hidden:false},
  createImageBitmap:async()=>({width:320,height:240,close(){}})});ctx.window=ctx;
vm.runInContext(readFileSync(new URL('../prototipo-3d/milpa360-gestos.js',import.meta.url),'utf8'),ctx,{filename:'milpa360-gestos.js'});
const G=ctx.MILPA_GESTOS;
assert.equal(G.estado,'apagado','cargar el módulo no debe arrancar nada');

// Mano en unidades de palma (muñeca en el origen, dedos hacia arriba = y negativa), escalada,
// girada y colocada en la imagen: la clasificación no debe depender de ninguna de las tres cosas.
const MCP={5:[-.35,-.95],9:[0,-1],13:[.3,-.95],17:[.55,-.85]};
function mano({cx=.5,cy=.6,s=.12,giro=0,dedos=[1,1,1,1],pulgar='fuera',pinza=false}={}){
  const L=Array.from({length:21},()=>[0,0]);
  const pul={fuera:[[-.35,-.2],[-.6,-.4],[-.8,-.55],[-.95,-.7]],dentro:[[-.3,-.25],[-.45,-.5],[-.35,-.65],[-.1,-.75]]}[pulgar];
  pul.forEach((p,i)=>L[1+i]=p);
  [5,9,13,17].forEach((m,k)=>{
    const [mx,my]=MCP[m],n=Math.hypot(mx,my),u=[mx/n,my/n];
    const a=dedos[k]?[.45,.75,1]:[.3,.1,-.3];         // doblado: la punta vuelve hacia la palma
    L[m]=[mx,my];a.forEach((f,i)=>L[m+1+i]=[mx+u[0]*f,my+u[1]*f]);
  });
  if(pinza){L[6]=[-.45,-1.35];L[7]=[-.65,-1.5];L[8]=[-.8,-1.4];L[3]=[-.8,-.9];L[4]=[-.85,-1.35];}
  const c=Math.cos(giro),sn=Math.sin(giro);
  return L.map(([x,y])=>({x:cx+(x*c-y*sn)*s,y:cy+(x*sn+y*c)*s,z:0}));
}
const ABIERTA={},PINZA={pinza:true,dedos:[0,0,0,0],pulgar:'dentro'},PUNO={dedos:[0,0,0,0],pulgar:'dentro'};
const APUNTAR={dedos:[1,0,0,0],pulgar:'dentro'},VICTORIA={dedos:[1,1,0,0],pulgar:'dentro'};
const gesto=(manos,...r)=>G.clasificar(manos,...r).gesto;

// 1. Clasificación pura a tres escalas y dos giros.
for(const s of [.05,.12,.25])for(const giro of [0,.5]){
  assert.equal(gesto([mano({...ABIERTA,s,giro})]),'abierta',`abierta s=${s} giro=${giro}`);
  assert.equal(gesto([mano({...PINZA,s,giro})]),'pinza',`pinza s=${s} giro=${giro}`);
  assert.equal(gesto([mano({...PUNO,s,giro})]),'puno',`puño s=${s} giro=${giro}`);
  assert.equal(gesto([mano({...APUNTAR,s,giro})]),'apuntar',`apuntar s=${s} giro=${giro}`);
}
// Inclinación en profundidad y espejo: distancias 3D, también con la palma hacia la cámara.
for(const [opciones,esperado] of [[ABIERTA,'abierta'],[PUNO,'puno'],[PINZA,'pinza']])
  for(const inclinacion of [0,Math.PI/3,Math.PI/2])for(const espejo of [-1,1]){
    const m=mano(opciones).map(p=>({x:.5+espejo*(p.x-.5),y:.6+(p.y-.6)*Math.cos(inclinacion),z:(p.y-.6)*Math.sin(inclinacion)}));
    assert.equal(gesto([m]),esperado,`${esperado}, inclinación ${inclinacion}, espejo ${espejo}`);
  }
assert.equal(gesto([]),'ninguno','sin manos');
assert.equal(gesto(null),'ninguno','sin datos');
assert.equal(gesto([mano(VICTORIA)]),'ninguno','dos dedos no es ningún gesto');
// Pinza y puño juntan pulgar e índice; sólo la pinza deja el índice fuera de la palma.
assert.ok(G.clasificar([mano(PUNO)]).gesto!=='pinza');
// Landmarks reales archivados por el subagente a2e18204f8b37db24 (28 sep 2026),
// medidas.json / medidas_abiertas_ok.json, MediaPipe CPU sobre fotos. Sólo coordenadas,
// redondeadas a 9 decimales; la prueba no depende de /tmp, fotos, red ni navegador.
// puno3p es la misma foto puno3 con margen: cambió la reconstrucción Z del detector.
const fotosReales=[
  ["puno1.jpg","puno",[[0.340894818,0.710785806,-7.91e-07],[0.414807603,0.655592442,-0.043323501],[0.463368461,0.570789099,-0.068818035],[0.420225263,0.490401804,-0.094747234],[0.345578,0.460060507,-0.111674286],[0.466818608,0.48981601,-0.007405849],[0.470830277,0.413241565,-0.062212944],[0.46136228,0.477782965,-0.094918907],[0.449683405,0.51943469,-0.110071957],[0.404476404,0.484519303,-0.006217457],[0.404668607,0.406543911,-0.056713717],[0.398616023,0.484226108,-0.068434864],[0.393926561,0.52070725,-0.066589834],[0.342944965,0.49141857,-0.016334793],[0.340972513,0.414361626,-0.062017707],[0.348049074,0.486063153,-0.048572911],[0.35265702,0.522571087,-0.029284959],[0.28462556,0.508350015,-0.031886905],[0.294973791,0.452304721,-0.056069534],[0.302971244,0.497394353,-0.045889551],[0.304086283,0.527003288,-0.032954307]]],
  ["puno2.jpg","puno",[[0.326477185,0.635061681,-7.42e-07],[0.431156762,0.558154345,-0.044366922],[0.499075793,0.457959503,-0.060442843],[0.525416493,0.353274524,-0.070348129],[0.518891349,0.283450663,-0.065005023],[0.431941442,0.364259481,-0.018418729],[0.455440477,0.314589709,-0.059101034],[0.442964852,0.404423863,-0.073736055],[0.423961222,0.414856315,-0.081549386],[0.360828817,0.375228405,-0.008042653],[0.389959663,0.322486103,-0.050790673],[0.390554175,0.422143072,-0.049287071],[0.374423459,0.418391794,-0.042041285],[0.298852175,0.398315728,-0.006080487],[0.325035766,0.348766357,-0.043162365],[0.34131901,0.437293738,-0.012310765],[0.325181589,0.440526545,0.013983737],[0.251937702,0.425216407,-0.008916679],[0.270266041,0.396289885,-0.023814367],[0.296597064,0.449961841,-0.001782588],[0.284940943,0.456677198,0.017309862]]],
  ["puno3.jpg","puno",[[0.781910509,0.592387795,-2.97e-07],[1.03411299,0.543380976,-0.214579649],[1.176469043,0.421933472,-0.410558403],[1.146224275,0.318108529,-0.578769565],[0.997952253,0.248688042,-0.751014948],[0.998771533,0.465737075,-0.531909943],[0.984867945,0.258801341,-0.735511243],[0.969399244,0.318928778,-0.821909934],[0.971240401,0.380656213,-0.866618693],[0.817393363,0.475776732,-0.51890865],[0.680210799,0.224960178,-0.744910911],[0.73755607,0.357231289,-0.80254823],[0.830419689,0.467128366,-0.830866992],[0.634361386,0.504063606,-0.509578183],[0.502344668,0.253263175,-0.718191281],[0.573756963,0.4337852,-0.768875331],[0.67467615,0.579978228,-0.78891778],[0.468459427,0.556905568,-0.510215655],[0.363128275,0.382228196,-0.70423159],[0.422795177,0.499214232,-0.785665959],[0.518486202,0.618667245,-0.833955914]]],
  ["puno3p.jpg","puno",[[0.732385212,0.844456196,-1.238e-06],[0.877413857,0.727830946,-0.112885855],[0.978285825,0.536620975,-0.175789988],[0.941163814,0.352990389,-0.235485718],[0.798840088,0.32026279,-0.271567401],[0.858521819,0.371886224,-0.021337328],[0.827714288,0.234786466,-0.148974903],[0.854768687,0.383987278,-0.215302867],[0.859743476,0.447492808,-0.241944331],[0.74283697,0.400879532,-0.005079784],[0.71447826,0.281845987,-0.145877108],[0.748414868,0.474260062,-0.186215273],[0.766938949,0.517605186,-0.179285061],[0.630439079,0.437208116,-0.014589828],[0.587360656,0.309744537,-0.154262063],[0.645448267,0.491081029,-0.141690148],[0.67913245,0.548451841,-0.093626256],[0.524077332,0.478633493,-0.033934175],[0.497187948,0.396206975,-0.118098894],[0.553200245,0.513159215,-0.109283011],[0.586398435,0.566069484,-0.077803887]]],
  ["woman_hands.jpg","abierta",[[0.404815912,0.707408547,-2.2e-07],[0.437896033,0.75109911,-0.013396415],[0.485851248,0.774035573,-0.018450826],[0.5280328,0.779757321,-0.024969255],[0.56236729,0.782867372,-0.030947889],[0.532226831,0.72833997,0.004405252],[0.577978849,0.743162453,-0.011118331],[0.603328904,0.758653104,-0.02740738],[0.623455803,0.774331629,-0.038140463],[0.538415412,0.701034188,0.001308105],[0.592536906,0.707716942,-0.010353496],[0.626976738,0.720034778,-0.023632102],[0.654151658,0.735357583,-0.033421236],[0.53391543,0.677264333,-0.005878634],[0.584881559,0.67625761,-0.017667133],[0.617437909,0.68591696,-0.028519193],[0.644320687,0.699445546,-0.035379974],[0.519286652,0.654767215,-0.015066682],[0.559511185,0.646456838,-0.023093594],[0.58631597,0.647993207,-0.028493834],[0.611124431,0.6550228,-0.032474943]]],
  ["woman_hands.jpg","abierta",[[0.354429603,0.399844199,1.86e-07],[0.319434643,0.440749764,-0.013156405],[0.277940194,0.461025298,-0.01381212],[0.237451951,0.456479281,-0.014811308],[0.222099741,0.433088183,-0.01626134],[0.249420643,0.429638892,0.010459968],[0.216461221,0.428195089,0.003106416],[0.198804617,0.424353898,-0.0085481],[0.183529377,0.420467675,-0.018037948],[0.252125223,0.40388307,0.009077569],[0.218186816,0.398430467,0.001863146],[0.196188887,0.394829422,-0.013127733],[0.178773801,0.390507847,-0.025189626],[0.263458133,0.379937917,0.0045033],[0.2325327,0.371713877,-0.005164416],[0.214457949,0.369384646,-0.018282838],[0.200993419,0.367736161,-0.027372082],[0.280787349,0.355570197,-0.001669451],[0.255412261,0.346720606,-0.010294133],[0.238775492,0.344876885,-0.01742291],[0.22472775,0.345691234,-0.023049769]]],
  ["ok1.jpg","pinza",[[0.855032404,0.457731456,4.39e-07],[0.806544065,0.431044459,-0.014203998],[0.765423814,0.390315264,-0.022728647],[0.727366686,0.366140336,-0.033520706],[0.702799002,0.334989697,-0.042785351],[0.817460656,0.310330987,-0.006463283],[0.772234837,0.28132841,-0.035073541],[0.737733364,0.298242986,-0.057159533],[0.712982893,0.321698815,-0.068868746],[0.832482934,0.298854798,-0.015424428],[0.807691574,0.231671795,-0.033471803],[0.777930299,0.191769004,-0.048901091],[0.753139377,0.160516664,-0.059653858],[0.85184598,0.303154558,-0.02947925],[0.844525099,0.232807547,-0.049782718],[0.828440229,0.186990649,-0.06312637],[0.812993646,0.153670982,-0.070560033],[0.872117837,0.321592331,-0.045534129],[0.882225593,0.270371765,-0.065427224],[0.882724603,0.228313521,-0.073959202],[0.880459229,0.193554819,-0.077905099]]],
  ["ok2p.jpg","pinza",[[0.782820254,0.656143486,1.157e-06],[0.687406703,0.654137373,-0.078927535],[0.607666601,0.608767152,-0.102280903],[0.546767045,0.563609958,-0.101055538],[0.521702986,0.507182837,-0.08814646],[0.704294601,0.481463879,-0.101116775],[0.611511627,0.419610679,-0.108313931],[0.567851654,0.451274455,-0.095388957],[0.551568278,0.49366495,-0.078821075],[0.747303704,0.462746173,-0.048266055],[0.684487631,0.365167201,-0.059055517],[0.633270732,0.327872485,-0.057345737],[0.59625467,0.302604765,-0.052480535],[0.772024284,0.465050161,0.003948769],[0.728098733,0.377873152,-0.001749491],[0.692081675,0.334267914,-0.004824197],[0.665121845,0.308043659,-0.003270511],[0.77770181,0.477574825,0.052411252],[0.748361993,0.411453307,0.052334937],[0.729374794,0.377843887,0.051845735],[0.71070299,0.359780967,0.054583323]]]
].map(([foto,esperado,puntos])=>({foto,esperado,m:puntos.map(([x,y,z])=>({x,y,z}))}));
for(const {foto,esperado,m} of fotosReales){
  assert.equal(gesto([m]),esperado,`foto real ${foto}`);
  // Trasladar, escalar, girar en pantalla y reflejar conserva la geometría del gesto.
  for(const escala of [.4,2])for(const espejo of [-1,1]){
    const giro=.7,c=Math.cos(giro),s=Math.sin(giro),w=m[0];
    const transformada=m.map(p=>{const x=p.x-w.x,y=p.y-w.y;return {x:.5+escala*espejo*(x*c-y*s),y:.5+escala*(x*s+y*c),z:escala*(p.z-w.z)};});
    assert.equal(gesto([transformada]),esperado,`${foto}, escala ${escala}, espejo ${espejo}`);
  }
}
const punoFrontal=fotosReales.find(h=>h.foto==='puno3.jpg').m;
const distancia3=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z);
const distanciaXY=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const fuera3=distancia3(punoFrontal[0],punoFrontal[8])/distancia3(punoFrontal[0],punoFrontal[5]);
const fueraXY=distanciaXY(punoFrontal[0],punoFrontal[8])/distanciaXY(punoFrontal[0],punoFrontal[5]);
assert.ok(fuera3>1.5&&fueraXY<1.2,'Z convierte punta replegada en falsa extensión fuera de nudillos');
for(const factorZ of [.5,.75,1,1.25,1.5]){
  assert.equal(gesto([punoFrontal.map(p=>({...p,z:p.z*factorZ}))]),'puno',`puño frontal con Z × ${factorZ}`);
}
// Ablación: sin la puerta local, incluso con el retorno XY corregido vuelve la falsa pinza.
const pinzaDedo=G.ajustes.pinzaDedo;
G.ajustes.pinzaDedo=Infinity;assert.equal(gesto([punoFrontal]),'pinza');G.ajustes.pinzaDedo=pinzaDedo;
// Una puerta radial XY incondicional falla en esta pinza inclinada; conservar la geometría 3D
// del contacto evita esa regresión. Giro compuesto, también en las pinzas y abiertas reales.
function inclinar(m,ax,ay){
  const w=m[0],a=ax*Math.PI/180,b=ay*Math.PI/180;
  return m.map(p=>{const x=p.x-w.x,y=p.y-w.y,z=p.z-w.z,Y=y*Math.cos(a)-z*Math.sin(a),Z=y*Math.sin(a)+z*Math.cos(a);
    return {x:.5+x*Math.cos(b)+Z*Math.sin(b),y:.5+Y,z:-x*Math.sin(b)+Z*Math.cos(b)};});
}
const pinzaInclinada=inclinar(mano(PINZA),75,-45);
assert.ok(distanciaXY(pinzaInclinada[0],pinzaInclinada[8])/distanciaXY(pinzaInclinada[0],pinzaInclinada[5])<G.ajustes.pinzaFuera);
assert.equal(gesto([pinzaInclinada]),'pinza','la puerta radial XY habría rechazado una pinza válida');
const posesInclinadas=[...fotosReales.filter(h=>h.esperado!=='puno'),
  ...[[ABIERTA,'abierta'],[PINZA,'pinza'],[PUNO,'puno'],[APUNTAR,'apuntar']].map(([o,esperado])=>({foto:'sintética '+esperado,esperado,m:mano(o)}))];
for(const {foto,esperado,m} of posesInclinadas)for(let ax=-90;ax<=90;ax+=15)for(let ay=-90;ay<=90;ay+=15){
  assert.equal(gesto([inclinar(m,ax,ay)]),esperado,`${foto}, giro X=${ax} Y=${ay}`);
}
console.table(fotosReales.map(({foto,m})=>({foto,gesto:gesto([m]),
  'fuera 3D':+(distancia3(m[0],m[8])/distancia3(m[0],m[5])).toFixed(3),
  'fuera XY':+(distanciaXY(m[0],m[8])/distanciaXY(m[0],m[5])).toFixed(3),
  'contacto/índice':+(distancia3(m[4],m[8])/(distancia3(m[5],m[6])+distancia3(m[6],m[7])+distancia3(m[7],m[8]))).toFixed(3)})));

// 2. Dos manos abiertas: el despiece crece con la separación y se queda en [0, 1].
let antes=-1;
for(const sep of [.16,.24,.32,.40,.48,.56]){
  const r=G.clasificar([mano({cx:.5-sep/2,s:.1}),mano({cx:.5+sep/2,s:.1})]);
  assert.equal(r.gesto,'dos_manos',`dos manos a ${sep}`);
  assert.ok(r.despiece>=0&&r.despiece<=1,'despiece fuera de rango');
  assert.ok(r.despiece>antes,`el despiece no crece: ${r.despiece} tras ${antes}`);antes=r.despiece;
}
assert.equal(gesto([mano({cx:.3,s:.08}),mano({...PUNO,cx:.7,s:.12})]),'puno','dos manos que no están abiertas: manda la más cercana (palma mayor)');
// 3. Palma quieta: pura si se le pasa el resultado anterior y el tiempo.
let prev=null;for(let t=0;t<=1100;t+=100)prev=G.clasificar([mano()],prev,t);
assert.equal(prev.gesto,'palma_quieta');
prev=G.clasificar([mano({cx:.62})],prev,1200);assert.equal(prev.gesto,'abierta','al moverse deja de estar quieta');

// 4. Filtro One Euro: con la mano quieta y ruido de ±3 px (en 320 px) la salida tiembla menos.
const f=G._unEuro();let sube=0,e=[],sOut=[];
for(let i=0;i<150;i++){sube=(sube*16807)%2147483647||1;const r=(sube/2147483647-.5)*.02;const v=f([.5+r],i*66.7)[0];if(i>30){e.push(r);sOut.push(v-.5);}}
const desv=a=>Math.sqrt(a.reduce((s,x)=>s+x*x,0)/a.length);
assert.ok(desv(sOut)<desv(e)*.6,`One Euro no suaviza: ${desv(sOut)} frente a ${desv(e)}`);

// 5. Motor: histéresis, eventos discretos y deltas entregados por fotograma.
const ev=[];for(const n of ['orbitar','pinza_inicio','pinza_mover','pinza_fin','deslizar','desplazar','despiece','escalar','cursor','seleccionar','cerrar','estallar','armar'])
  G.on(n,d=>ev.push([n,d&&{...d}]));
const paso=1000/15;let t=0;
const correr=(ms,hacer)=>{const t0=t;for(const fin=t+ms;t<fin;t+=paso){G._alimentar(hacer(t-t0),t);G.tick(t);}};
const cuenta=n=>ev.filter(e=>e[0]===n);
G._reiniciar();ev.length=0;
correr(400,t=>[mano({cx:.3+t*2e-4})]);
assert.equal(G.gesto,'abierta');
assert.ok(cuenta('orbitar').length>0&&cuenta('orbitar').every(([,d])=>d.dx>0),'la mano hacia la derecha orbita con dx>0');
G._alimentar([mano(PUNO)],t);t+=paso;
assert.equal(G.gesto,'abierta','un solo cuadro distinto no cambia el gesto (histéresis 100 ms)');
G._reiniciar();ev.length=0;
correr(500,t=>[mano({...PINZA,cy:.4+t*2e-4})]);
assert.equal(G.gesto,'pinza');assert.equal(cuenta('pinza_inicio').length,1);
assert.ok(cuenta('pinza_mover').length&&cuenta('pinza_mover').every(([,d])=>d.dy>=0),'pinza hacia abajo mueve dy positivo');
correr(250,()=>[mano(PUNO)]);assert.equal(cuenta('pinza_fin').length,1,'la pinza termina una vez');
G._reiniciar();ev.length=0;
correr(500,t=>[mano({...PUNO,cx:.6-t*2e-4})]);
assert.equal(G.gesto,'puno');assert.ok(cuenta('desplazar').length&&cuenta('desplazar').every(([,d])=>d.dx<0),'puño a la izquierda desplaza con dx<0');
G._reiniciar();ev.length=0;
correr(800,t=>{const sep=.16+t*4e-4;return [mano({cx:.5-sep/2,s:.1}),mano({cx:.5+sep/2,s:.1})];});
const ts=cuenta('despiece').map(([,d])=>d.t);
assert.ok(ts.length>3&&ts.every((v,i)=>i===0||v>ts[i-1]),'el despiece sube al separar las manos');
assert.deepEqual(cuenta('escalar').map(([,d])=>d.t),ts,'escalar comparte t con despiece');
G._reiniciar();ev.length=0;
correr(1100,()=>[mano(APUNTAR)]);
assert.equal(cuenta('seleccionar').length,1,'apuntar quieto 0.6 s selecciona una sola vez');
const cur=cuenta('cursor').map(([,d])=>d);
assert.ok(cur.every(c=>c.visible&&c.x>=0&&c.x<=1&&c.y>=0&&c.y<=1),'cursor dentro de la pantalla');
assert.ok(cur.at(-1).progreso===1&&cur[0].progreso<.5,'el anillo de espera se llena');
correr(300,()=>[mano(PUNO)]);
assert.equal(cuenta('cursor').at(-1)[1].visible,false,'al dejar de apuntar el cursor se oculta');
G._reiniciar();ev.length=0;
correr(1500,()=>[mano()]);
assert.equal(cuenta('cerrar').length,1,'palma quieta 1 s cierra una vez');
assert.equal(G.estado,'apagado','nada de esto arranca la cámara');

// 6. Barrido rápido: una sola dirección, enfriamiento y órbita bloqueada durante el barrido.
G._reiniciar();ev.length=0;
G.ajustes.deslizarVel=2;G.ajustes.deslizarMin=.5;
correr(250,()=>[mano({cx:.2})]);ev.length=0;
correr(200,dt=>[mano({cx:.2+dt*.0012})]);
assert.equal(cuenta('deslizar').length,1);assert.equal(cuenta('deslizar')[0][1].dir,1);
assert.equal(cuenta('orbitar').length,0,'sin órbita durante el barrido');
correr(200,dt=>[mano({cx:.45+dt*.0012})]);
assert.equal(cuenta('deslizar').length,1,'respeta 700 ms de enfriamiento');
G.ajustes.deslizarVel=3.5;G.ajustes.deslizarMin=.9;

// 7. La suma emitida conserva el delta y la espera de 250 ms descarta restos.
G._reiniciar();ev.length=0;
correr(250,()=>[mano({cx:.3})]);ev.length=0;
const inicio=t;G._alimentar([mano({cx:.315})],t);t+=paso;
const total=G._pendientes.orbitar.dx;
for(let i=0;i<13;i++)G.tick(inicio+i*16);
const emitido=cuenta('orbitar').reduce((s,[,d])=>s+d.dx,0);
assert.ok(total>0&&Math.abs(emitido-total)<total*.01,`convergencia: ${emitido} de ${total}`);
G._alimentar([mano({cx:.33})],t);ev.length=0;G.tick(t+300);
assert.equal(cuenta('orbitar').length,0,'el pendiente caduca a los 250 ms');

// 8. Órbita → pinza rápida: la pieza recién agarrada no recibe la cola de giro.
G._reiniciar();ev.length=0;
correr(250,()=>[mano({cx:.3})]);
G._alimentar([mano({cx:.32})],t);t+=paso;
assert.ok(G._pendientes.orbitar.dx>0,'la órbita deja un delta pendiente');
let agarrada=false,giroResidual=0;
const soltarInicio=G.on('pinza_inicio',()=>{agarrada=true;});
const soltarGiro=G.on('orbitar',({dx})=>{if(agarrada)giroResidual+=dx;});
for(let i=0;i<12&&G.gesto!=='pinza';i++,t+=paso)G._alimentar([mano({...PINZA,cx:.32})],t);
assert.equal(G.gesto,'pinza','la pinza confirma tras la histéresis');
G.tick(t);
assert.equal(giroResidual,0,'la pieza agarrada no recibe giro residual de la órbita');
assert.equal(G._pendientes.orbitar.dx,0,'la transición descarta la cola de órbita');
soltarInicio();soltarGiro();

// V13. Votos y tolerancia: un ninguno aislado con mano visible no suelta la pinza.
G._reiniciar();ev.length=0;
correr(400,()=>[mano(PINZA)]);
G._alimentar([mano(VICTORIA)],t);t+=paso;
assert.equal(G.gesto,'pinza');assert.equal(cuenta('pinza_fin').length,0);
correr(400,()=>[mano(PINZA)]);
assert.equal(cuenta('pinza_inicio').length,1,'recuperar la pose no vuelve a agarrar');
correr(600,()=>[mano(VICTORIA)]);
assert.equal(G.gesto,'ninguno');assert.equal(cuenta('pinza_fin').length,1);

// 1 → 2 → 1: cambiar el orden de detección conserva las pistas y no mueve la cámara.
G._reiniciar();ev.length=0;
correr(300,()=>[mano({cx:.25})]);
correr(300,()=>[mano({cx:.75}),mano({cx:.25})]);
assert.equal(G.gesto,'dos_manos');
correr(300,()=>[mano({cx:.75})]);
assert.equal(G.gesto,'abierta');
assert.equal(cuenta('orbitar').length,0);assert.equal(cuenta('deslizar').length,0);

// Golpes de una/dos manos, juntos y desfasados un cuadro, y armar con payload vacío.
for(const n of [1,2])for(const desfasado of [false,true]){
  if(n===1&&desfasado)continue;
  G._reiniciar();ev.length=0;
  const manos=o=>Array.from({length:n},(_,k)=>mano({...o,cx:.3+k*.4}));
  G._alimentar(manos(PUNO),t);t+=100;
  G._alimentar(desfasado?[mano({cx:.3}),mano({...PUNO,cx:.7})]:manos(ABIERTA),t);t+=100;
  G._alimentar(manos(ABIERTA),t);t+=100;
  assert.deepEqual(cuenta('estallar').map(([,d])=>d),[{manos:n}]);
  // El cierre durante el cooldown no debe ejecutar armar.
  G._alimentar(manos(PUNO),t);t+=100;
  assert.equal(cuenta('armar').length,0);
  t+=G.ajustes.estallarEnfriaMs;
  G._alimentar(manos(ABIERTA),t);t+=100;
  G._alimentar(manos(PUNO),t);t+=100;
  assert.deepEqual(cuenta('armar').map(([,d])=>d),[{}]);
}
// Apertura/cierre lentos y pinza/índice no producen golpes.
for(const origen of [PUNO,PINZA,APUNTAR]){
  G._reiniciar();ev.length=0;
  G._alimentar([mano(origen)],t);t+=origen===PUNO?G.ajustes.estallarMs+1:100;
  G._alimentar([mano()],t);t+=G.ajustes.estallarMs+1;
  G._alimentar([mano(origen)],t);t+=100;
  assert.equal(cuenta('estallar').length+cuenta('armar').length,0);
}
G._reiniciar();ev.length=0;
correr(300,()=>[mano(PUNO)]);
correr(1600,dt=>[mano({cx:.5+Math.min(dt,200)*.001})]);
assert.equal(cuenta('estallar').length,1);
assert.equal(cuenta('deslizar').length,0,'la cola del golpe no cambia de pieza');
assert.equal(cuenta('cerrar').length,0,'la palma que queda tras abrir de golpe no cierra');

// Un golpe descarta los deltas anteriores antes de que el renderer llame a tick().
G._reiniciar();ev.length=0;
correr(300,()=>[mano({cx:.3})]);
G._alimentar([mano({cx:.315})],t);t+=paso;
assert.ok(G._pendientes.orbitar.dx>0);
G._alimentar([mano({...PUNO,cx:.315})],t);t+=paso;
assert.equal(cuenta('armar').length,1);
assert.equal(G._pendientes.orbitar.dx,0,'armar elimina la cola de órbita');

// Cambia la mano dominante sin cambiar el gesto: tampoco es un desplazamiento ni un barrido.
for(const [opciones,movimiento] of [[PUNO,'desplazar'],[ABIERTA,'orbitar'],[PINZA,'pinza_mover']]){
  G._reiniciar();ev.length=0;
  correr(300,()=>[mano({...opciones,cx:.25,s:.1})]);ev.length=0;
  G._alimentar([mano({...opciones,cx:.25,s:.1}),mano({...opciones,cx:.75,s:.15})],t);G.tick(t);t+=paso;
  G._alimentar([mano({...opciones,cx:.75,s:.15})],t);G.tick(t);t+=paso;
  assert.equal(cuenta(movimiento).length,0,`cambiar de mano no emite ${movimiento}`);
  assert.equal(cuenta('deslizar').length,0,'cambiar de mano no desliza');
}

// Cadencia de integración (~7 Hz): golpe a dos manos, bloqueo de despiece y reanudación voluntaria.
const cuadro7=manos=>{G._alimentar(manos,t);G.tick(t);t+=140;};
const par=(opciones={},sep=.4)=>[mano({...opciones,cx:.5-sep/2}),mano({...opciones,cx:.5+sep/2})];
G._reiniciar();ev.length=0;
cuadro7(par(PUNO));cuadro7(par(PUNO));
cuadro7(par());cuadro7(par());cuadro7(par());
assert.deepEqual(cuenta('estallar').map(([,d])=>d),[{manos:2}]);
assert.equal(cuenta('despiece').length,0,'la separación inicial no pisa estallar');
cuadro7(par({},.6));cuadro7(par({},.6));
assert.ok(cuenta('despiece').length>0,'separar voluntariamente retoma despiece');
for(let i=0;i<8;i++)cuadro7(par({},.6));
ev.length=0;cuadro7(par(PUNO,.6));cuadro7(par(PUNO,.6));
assert.deepEqual(cuenta('armar').map(([,d])=>d),[{}]);
assert.equal(cuenta('despiece').length,0,'cerrar los puños no pisa armar');
G._reiniciar();ev.length=0;
cuadro7([mano(PINZA)]);cuadro7([mano(PINZA)]);cuadro7([mano(PINZA)]);
cuadro7([mano(VICTORIA)]);
assert.equal(G.gesto,'pinza','ninguno aislado tolerado a 7 Hz');
cuadro7([mano(PINZA)]);cuadro7([mano(PINZA)]);
assert.equal(cuenta('pinza_fin').length,0);
assert.equal(cuenta('pinza_inicio').length,1);

// 9. Worker simulado a 88 ms: captura encadenada, un solo cuadro en vuelo.
G._reiniciar();let vuelo=0,maxVuelo=0,capturas=0;const inicios=[];
const falso={postMessage({ts}){vuelo++;maxVuelo=Math.max(maxVuelo,vuelo);capturas++;inicios.push(performance.now());
  setTimeout(()=>{vuelo--;G._recibir({data:{puntos:new Float32Array(0),n:0,ts,ms:88,aspecto:4/3}});},88);},terminate(){}};
G._probarCaptura(falso,{readyState:4,videoWidth:320,videoHeight:240});
await new Promise(r=>setTimeout(r,430));G.desactivar();
assert.equal(maxVuelo,1,'nunca más de un cuadro en vuelo');
assert.ok(capturas>=4,`captura encadenada: ${capturas} en 430 ms`);
assert.ok(inicios.slice(1).every((v,i)=>v-inicios[i]<125),'el resultado programa la captura siguiente');

// 10. Permiso pendiente y denegación: ambos terminan el worker sin esperar el modelo.
const nodo=()=>({dataset:{},classList:{toggle(){}},atributos:{},hijos:new Map(),
  setAttribute(k,v){this.atributos[k]=v;},getAttribute(k){return this.atributos[k]||'';},
  querySelector(k){if(!this.hijos.has(k))this.hijos.set(k,nodo());return this.hijos.get(k);},
  querySelectorAll(){return this.filas||=Array.from(this.innerHTML.matchAll(/data-g="([^"]+)"/g),m=>({...nodo(),dataset:{g:m[1]}}));},
  getContext(){return {clearRect(){},beginPath(){},moveTo(){},lineTo(){},stroke(){},fillRect(){}};},remove(){},firstChild:{},lastChild:{}});
let raizHud,idioma='es';const listeners=new Map();
ctx.MILPA_I18N={pick:(es,en)=>idioma==='en'?en:es};
ctx.document.createElement=()=>nodo();ctx.document.body={appendChild(n){raizHud=n;}};
ctx.addEventListener=(n,f)=>listeners.set(n,f);ctx.removeEventListener=n=>listeners.delete(n);
ctx.URL={createObjectURL:()=> 'blob:prueba',revokeObjectURL(){}};ctx.Blob=Blob;
const workers=[];
ctx.Worker=class{constructor(){this.terminado=false;this.mensajes=[];workers.push(this);}postMessage(d){this.mensajes.push(d);}terminate(){this.terminado=true;}};
ctx.navigator={onLine:true,mediaDevices:{getUserMedia:()=>new Promise(()=>{})}};
const cargaPendiente=G.activar();
await Promise.resolve();
assert.equal(G.estado,'cargando');assert.equal(workers.length,1);
assert.deepEqual(Array.from(workers[0].mensajes[0].confianzas),[G.ajustes.confDeteccion,G.ajustes.confPresencia,G.ajustes.confSeguimiento]);
assert.equal(workers[0].mensajes[0].manosAdaptativas,false);
// Todas las filas del HUD (incluidos golpes) y atributos accesibles cambian ES → EN → ES.
const hudTextos=()=>raizHud.filas.map(n=>[n.firstChild.textContent,n.lastChild.textContent]);
const textosEs=hudTextos();assert.equal(textosEs.length,10);
idioma='en';listeners.get('milpa-language')();
assert.deepEqual(hudTextos(),[
  ['Open hand','Orbit · rotate part'],['Pinch in empty space ↕','Zoom'],['Pinch on a part','Grab and rotate'],
  ['Swipe ← →','Another part'],['Fist','Pan'],['Two hands ↔','Explode · scale'],['Index 0.6 s','Details'],
  ['Still palm 1 s','Return / close'],['Open hand fast','Full explode'],['Close fist fast','Reassemble']]);
assert.equal(raizHud.querySelector('.gestos-panel').getAttribute('aria-label'),'Gesture control');
assert.equal(raizHud.querySelector('.gestos-cerrar').getAttribute('title'),'Turn gestures off');
assert.equal(raizHud.querySelector('.gestos-estado').textContent,'Loading hand model…');
assert.ok(raizHud.querySelector('.gestos-leyenda').getAttribute('title').startsWith('Camera images are processed locally'));
idioma='es';listeners.get('milpa-language')();assert.deepEqual(hudTextos(),textosEs);
G.desactivar();await cargaPendiente;
assert.ok(workers[0].terminado,'apagar termina el worker aunque el permiso siga pendiente');
assert.equal(G.estado,'apagado');
const sinWorker=G.activar();G.desactivar();await sinWorker;
assert.equal(workers.length,1,'apagar de inmediato impide crear un worker tardío');
ctx.navigator.mediaDevices.getUserMedia=async()=>{throw Object.assign(new Error('denegado'),{name:'NotAllowedError'});};
await G.activar();
assert.equal(G.estado,'error','el rechazo de cámara no espera al modelo');
assert.ok(workers[1].terminado,'el fallo de cámara termina el worker');
G.desactivar();
// 11. Una captura resuelta después de apagar no puede entrar en el worker de la siguiente sesión.
const bitmapOriginal=ctx.createImageBitmap;
let resolverBitmap,cerrados=0,enviadosViejos=0,enviadosNuevos=0;
ctx.createImageBitmap=()=>new Promise(r=>{resolverBitmap=r;});
G._probarCaptura({postMessage(){enviadosViejos++;},terminate(){}},{readyState:4,videoWidth:640,videoHeight:480});
const terminarBitmap=resolverBitmap;
G.desactivar();
G._probarCaptura({postMessage(){enviadosNuevos++;},terminate(){}},{readyState:4,videoWidth:640,videoHeight:480});
terminarBitmap({close(){cerrados++;}});await Promise.resolve();
assert.equal(enviadosViejos+enviadosNuevos,0,'el bitmap viejo nunca se transfiere al worker nuevo');
assert.equal(cerrados,1,'se libera el bitmap cancelado');
G.desactivar();resolverBitmap({close(){cerrados++;}});await Promise.resolve();
ctx.createImageBitmap=bitmapOriginal;

// 12. Worker listo pero cámara pendiente: un error del hilo debe cancelar la carga.
let resolverCamara;
ctx.navigator.mediaDevices.getUserMedia=()=>new Promise(r=>{resolverCamara=r;});
const cargaConError=G.activar();await Promise.resolve();
const listo=workers.at(-1);
listo.onmessage({data:{listo:true}});await Promise.resolve();
assert.equal(typeof listo.onerror,'function','el worker conserva manejador de errores mientras espera cámara');
listo.onerror({preventDefault(){},message:'worker caído'});
await cargaConError;
assert.equal(G.estado,'error');assert.ok(listo.terminado);
let paradas=0;
resolverCamara({getTracks:()=>[{stop(){paradas++;}}]});
await Promise.resolve();await Promise.resolve();
assert.equal(paradas,1,'la cámara concedida tras morir el worker se cierra');
G.desactivar();
// 13. El permiso ya concedido también se libera si video.play() sigue pendiente.
const crearNodo=ctx.document.createElement;
let resolverPlay,paradasPlay=0;
const vPendiente={muted:false,playsInline:false,srcObject:null,play:()=>new Promise(r=>{resolverPlay=r;})};
ctx.document.createElement=tipo=>tipo==='video'?vPendiente:crearNodo(tipo);
ctx.navigator.mediaDevices.getUserMedia=async()=>({getTracks:()=>[{stop(){paradasPlay++;}}]});
const cargaPlay=G.activar();await new Promise(setImmediate);
workers.at(-1).onmessage({data:{listo:true}});await Promise.resolve();
G.desactivar();
assert.equal(paradasPlay,1,'apagar no espera a play para detener la cámara');
assert.equal(vPendiente.srcObject,null);
await cargaPlay;resolverPlay();await new Promise(setImmediate);
assert.equal(G.estado,'apagado','play tardío no reactiva gestos');
ctx.document.createElement=crearNodo;
// 14. Contrato de captura/configuración y error del worker ya activo.
const videoListo={readyState:4,videoWidth:640,videoHeight:480,play:async()=>{},srcObject:null};
ctx.document.createElement=tipo=>tipo==='video'?videoListo:crearNodo(tipo);
let paradasActivo=0,peticionBitmap;
ctx.navigator.mediaDevices.getUserMedia=async()=>({getTracks:()=>[{stop(){paradasActivo++;}}]});
ctx.createImageBitmap=async(v,opciones)=>{peticionBitmap=opciones;return {close(){}};};
const cargaActiva=G.activar();await new Promise(setImmediate);
const wActivo=workers.at(-1);
wActivo.onmessage({data:{listo:true}});await cargaActiva;
await new Promise(r=>setTimeout(r,10));
assert.equal(G.estado,'activo');
assert.equal(peticionBitmap.resizeWidth,384);assert.equal(peticionBitmap.resizeHeight,288);
assert.equal(peticionBitmap.resizeQuality,G.ajustes.calidadCuadro);
wActivo.onerror({preventDefault(){},message:'worker activo caído'});
assert.equal(G.estado,'error');assert.ok(wActivo.terminado);assert.equal(paradasActivo,1);
assert.equal(videoListo.srcObject,null);G.desactivar();
// Fallar al transferir el cuadro termina el motor sin rechazos asíncronos sin manejar.
let bitmapLiberado=0;
ctx.createImageBitmap=async()=>({close(){bitmapLiberado++;}});
G._probarCaptura({postMessage(){throw new Error('transferencia fallida');},terminate(){}},videoListo);
await Promise.resolve();
assert.equal(G.estado,'error');assert.equal(bitmapLiberado,1);G.desactivar();
console.log('verificar_gestos: clasificación 3D, votos, pistas, golpes, tick, captura y ciclo de carga correctos');
