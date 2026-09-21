/* P3: modelo ilustrativo determinista. Unidades d terrestres, sol, L, kg y kWh químicos.
   No es un modelo agronómico calibrado ni un balance elemental del sistema físico. */
(function (root) {
  'use strict';
  const comprobar = (c,m) => { if (!c) throw new Error(m); };
  const valor = (d,g,k) => d.parametros[g][k].valor;
  const acotar = x => Math.max(0,Math.min(1,x));
  const especies = ['camote','frijol','rabano'];
  function plantas(d,edad=0) {
    return especies.map(nombre => {
      const ciclo=valor(d,'cultivo_'+nombre,'ciclo');
      const area=d.geometria.cartucho.area*valor(d,'cultivo','reparto_area')[nombre];
      const tasa=area*valor(d,'cultivo_'+nombre,'comestible_fresco')/1000*valor(d,'cultivo','factor_productividad');
      const edadD=edad%ciclo;
      return {nombre,ciclo,tasa,edadD,biomasaKg:tasa*edadD,dano:0,deficitD:0,muerta:false,activa:true};
    });
  }
  function crecer(c,dias,suministro,d) {
    if(!c.activa) return {kg:0,kcal:0,cosecha:false};
    const danoAntes=c.dano;
    c.edadD+=dias;
    c.deficitD+=(1-suministro)*dias;
    c.dano=acotar(c.dano+valor(d,'simulacion','tasa_dano')*(1-suministro)*dias);
    if(c.deficitD>=valor(d,'simulacion','deficit_letal')) {c.muerta=true;c.dano=1;}
    // Biomasa comestible equivalente; la pérdida queda retenida como no cosechable.
    if(!c.muerta) c.biomasaKg+=c.tasa*dias*suministro*(1-c.dano);
    if(c.dano>danoAntes && danoAntes<1) c.biomasaKg*= (1-c.dano)/(1-danoAntes);
    if(c.edadD+1e-10<c.ciclo) return {kg:0,kcal:0,cosecha:false};
    const kg=c.muerta?0:c.biomasaKg;
    return {kg,kcal:kg*10*valor(d,'cultivo_'+c.nombre,'energia'),cosecha:true};
  }
  class Modelo {
    constructor(datos,opciones={}) {
      this.d=datos; this.autorizacionesIlustrativas=opciones.autorizacionesIlustrativas===true;
      this.paso=valor(datos,'simulacion','paso_modelo');
      comprobar(Number.isFinite(this.paso)&&this.paso>0,'Paso inválido');
      this.reiniciar();
    }
    reiniciar() {
      const d=this.d,g=d.geometria,sim=k=>valor(d,'simulacion',k);
      this.resto=0;
      const lote=(i,pos)=>({id:'L'+String(i+1).padStart(2,'0'),pos,masaKg:g.cartucho.masa_kg.nominal,
        calidad:pos>=g.ciclo.n_regeneracion?'apto_ilustrativo':'pendiente',
        cultivos:pos>=g.ciclo.n_regeneracion?plantas(d,(pos-g.ciclo.n_regeneracion)*g.anillo.soles_por_paso*valor(d,'mision','dias_por_sol')):[],
        historial:[{sol:0,evento:'inventario inicial ilustrativo'}]});
      this.estado={sol:0,pasos:0,espera:0,tormentaHasta:0,bomba:false,atasco:false,bloqueo:null,cambio:null,
        luz:1,aguaFraccion:1,aguaL:sim('agua_inicial'),aguaEntradaL:0,aguaRetornoL:0,aguaRiegoL:0,aguaPurgaL:0,
        gasKWh:sim('gas_inicial'),gasEntradaKWh:0,gasSalidaKWh:0,gasRetenidoExternoKWh:0,
        electricidadKWh:0,cosechaKg:0,cosechaKcal:0,descartadoKg:0,siembras:0,
        lotes:Array.from({length:g.anillo.n},(_,i)=>lote(i,i)),
        repuestos:Array.from({length:g.cartucho.repuestos},(_,i)=>lote(g.anillo.n+i,null)),cuarentena:[]};
      if(this.autorizacionesIlustrativas) this.estado.lotes[g.ciclo.n_regeneracion-1].calidad='apto_ilustrativo';
    }
    fallar(tipo) {
      const s=this.estado;
      comprobar(['tormenta','bomba','atasco','lote'].includes(tipo),'Fallo desconocido');
      if(tipo==='tormenta') s.tormentaHasta=s.sol+valor(this.d,'simulacion','duracion_tormenta');
      else if(tipo==='lote') {
        const l=s.lotes.find(l=>l.pos===this.d.geometria.ciclo.n_regeneracion-1);
        l.calidad='rechazado';l.historial.push({sol:s.sol,evento:'rechazo ilustrativo'});
      } else s[tipo]=true;
    }
    reparar(tipo) {
      comprobar(['tormenta','bomba','atasco'].includes(tipo),'No se autoriza un lote reparando una avería');
      if(tipo==='tormenta') this.estado.tormentaHasta=this.estado.sol;
      else this.estado[tipo]=false;
    }
    aislar() {
      const s=this.estado;
      const l=s.lotes.find(l=>l.pos===this.d.geometria.ciclo.n_regeneracion-1);
      comprobar(!s.cambio && s.repuestos.length>0 && l.calidad!=='apto_ilustrativo','No hay cambio disponible');
      s.cambio={id:l.id,restante:valor(this.d,'simulacion','tiempo_cambio')};
    }
    masaSustrato() {
      const s=this.estado;
      return [...s.lotes,...s.repuestos,...s.cuarentena].reduce((a,l)=>a+l.masaKg,0);
    }
    avanzar(soles) {
      comprobar(Number.isFinite(soles)&&soles>=0,'Tiempo inválido');
      const horizonte=this.d.geometria.mision.soles_horizonte;
      if(this.estado.sol>=horizonte) return;
      this.resto+=Math.min(soles,horizonte-this.estado.sol);
      while(this.resto+1e-10>=this.paso && this.estado.sol<horizonte) {
        this.tick(Math.min(this.paso,horizonte-this.estado.sol));this.resto-=this.paso;
      }
      if(this.estado.sol>=horizonte) this.resto=0;
    }
    tick(h) {
      const s=this.estado,d=this.d,g=d.geometria,sim=k=>valor(d,'simulacion',k);
      const dias=h*valor(d,'mision','dias_por_sol');
      s.luz=s.sol<s.tormentaHasta?sim('luz_tormenta'):1;
      const entrada=sim('reposicion_agua')*dias;
      s.aguaEntradaL+=entrada;s.aguaL+=entrada;
      const demanda=d.balance.transpiracion_L*dias;
      const riego=s.bomba?0:Math.min(s.aguaL,demanda);
      s.aguaL-=riego;s.aguaRiegoL+=riego;
      const retorno=riego*sim('fraccion_condensada');s.aguaRetornoL+=retorno;s.aguaL+=retorno;
      const purga=Math.max(0,s.aguaL-sim('capacidad_agua'));s.aguaL-=purga;s.aguaPurgaL+=purga;
      s.aguaFraccion=demanda>0?riego/demanda:1;
      s.electricidadKWh+=d.balance.luz_kwh*dias*s.luz;
      // Frontera del almacén: entrada nominal P1, no se simula digestión ni su arranque.
      const gas=d.balance.biogas_kwh_quimico*dias;s.gasKWh+=gas;s.gasEntradaKWh+=gas;
      const salida=Math.min(s.gasKWh,sim('salida_gas')*dias);s.gasKWh-=salida;s.gasSalidaKWh+=salida;
      const exceso=Math.max(0,s.gasKWh-sim('capacidad_gas'));s.gasKWh-=exceso;s.gasRetenidoExternoKWh+=exceso;
      for(const l of s.lotes) for(let i=0;i<l.cultivos.length;i++) {
        const c=l.cultivos[i];const resultado=crecer(c,dias,Math.min(s.luz,s.aguaFraccion),d);
        if(resultado.cosecha) {
          s.cosechaKg+=resultado.kg;s.cosechaKcal+=resultado.kcal;
          l.historial.push({sol:s.sol+h,evento:'cosecha '+c.nombre,kg:resultado.kg});
          const restante=((g.anillo.n-l.pos)*g.anillo.soles_por_paso-s.espera)*valor(d,'mision','dias_por_sol');
          const nuevo=plantas(d)[i];nuevo.activa=restante>=nuevo.ciclo;
          if(nuevo.activa) s.siembras++;
          l.cultivos[i]=nuevo;
        }
      }
      s.sol+=h;
      if(s.cambio) {
        s.cambio.restante-=h;
        if(s.cambio.restante<=1e-10) {
          const i=s.lotes.findIndex(l=>l.id===s.cambio.id),viejo=s.lotes[i],nuevo=s.repuestos.shift();
          nuevo.pos=viejo.pos;nuevo.calidad=this.autorizacionesIlustrativas?'apto_ilustrativo':'pendiente';
          nuevo.historial.push({sol:s.sol,evento:'instalación ilustrativa; maniobra física pendiente'});
          viejo.pos=null;viejo.historial.push({sol:s.sol,evento:'aislado en cuarentena'});
          s.cuarentena.push(viejo);s.lotes[i]=nuevo;s.cambio=null;
        }
        s.bloqueo='mantenimiento';return;
      }
      s.espera=Math.min(g.anillo.soles_por_paso,s.espera+h);
      if(s.atasco) {s.bloqueo='atasco';return;}
      if(s.espera<g.anillo.soles_por_paso) {s.bloqueo=null;return;}
      const salidaS8=s.lotes.find(l=>l.pos===g.ciclo.n_regeneracion-1);
      if(salidaS8.calidad!=='apto_ilustrativo') {s.bloqueo='S8: '+salidaS8.calidad;return;}
      s.pasos++;s.espera=0;s.bloqueo=null;
      for(const l of s.lotes) {
        l.pos=(l.pos+1)%g.anillo.n;
        l.historial.push({sol:s.sol,evento:'posición '+l.pos});
        if(l.pos===0) {s.descartadoKg+=l.cultivos.reduce((a,c)=>a+c.biomasaKg,0);l.cultivos=[];l.calidad='pendiente';}
        if(l.pos===g.ciclo.n_regeneracion-1 && this.autorizacionesIlustrativas && l.calidad==='pendiente') {
          l.calidad='apto_ilustrativo';l.historial.push({sol:s.sol,evento:'autorización de demostración, NO análisis real'});
        }
        if(l.pos===g.ciclo.n_regeneracion) {l.cultivos=plantas(d);s.siembras+=3;}
      }
    }
    verificar() {
      const s=this.estado,d=this.d,sim=k=>valor(d,'simulacion',k);
      const cerca=(a,b)=>comprobar(Math.abs(a-b)<1e-7,'Balance numérico sin cerrar');
      cerca(s.aguaL,sim('agua_inicial')+s.aguaEntradaL+s.aguaRetornoL-s.aguaRiegoL-s.aguaPurgaL);
      cerca(s.gasKWh,sim('gas_inicial')+s.gasEntradaKWh-s.gasSalidaKWh-s.gasRetenidoExternoKWh);
      cerca(this.masaSustrato(),(d.geometria.anillo.n+d.geometria.cartucho.repuestos)*d.geometria.cartucho.masa_kg.nominal);
      comprobar(new Set(s.lotes.map(l=>l.pos)).size===d.geometria.anillo.n,'Posiciones duplicadas');
      comprobar(s.aguaL>=-1e-9&&s.gasKWh>=-1e-9&&s.cosechaKg>=0,'Inventario negativo');
      for(const l of s.lotes) for(const c of l.cultivos) comprobar(c.biomasaKg>=0&&c.dano>=0&&c.dano<=1,'Cultivo inválido');
      return true;
    }
  }
  function comparar(d,{inicio=40,duracion=21,fraccionLuz=0.25,soles=160}={}) {
    comprobar([inicio,duracion,fraccionLuz,soles].every(Number.isFinite)&&inicio>=0&&duracion>=0&&fraccionLuz>=0&&fraccionLuz<=1&&soles>0&&soles<=2000,'Escenario inválido');
    const n=d.geometria.ciclo.n_cultivo,area=n*d.geometria.cartucho.area;
    const ejecutar=(modo,fallo)=>{
      const lotes=Array.from({length:n},(_,i)=>plantas(d));
      let inicialKcal=0,cosechaKcal=0,kWh=0,aguaL=0,primeraCosechaTrasFallo=null;
      lotes.forEach((cs,i)=>cs.forEach(c=>{
        c.edadD=c.ciclo*(modo==='escalonada'?i/n:(n-1)/(2*n));c.biomasaKg=c.tasa*c.edadD;
        inicialKcal+=c.biomasaKg*10*valor(d,'cultivo_'+c.nombre,'energia');
      }));
      const paso=valor(d,'simulacion','paso_modelo');
      for(let sol=0;sol<soles;sol+=paso) {
        const dias=Math.min(paso,soles-sol)*valor(d,'mision','dias_por_sol');
        const luz=fallo&&sol>=inicio&&sol<inicio+duracion?fraccionLuz:1;
        kWh+=d.balance.luz_kwh*dias*luz;aguaL+=d.balance.transpiracion_L*dias;
        lotes.forEach(cs=>cs.forEach((c,i)=>{
          const r=crecer(c,dias,luz,d);
          if(r.cosecha) {
            cosechaKcal+=r.kcal;
            if(r.kcal>0&&sol>=inicio+duracion&&primeraCosechaTrasFallo===null) primeraCosechaTrasFallo=sol+paso-inicio-duracion;
            cs[i]=plantas(d)[i]; // nueva siembra registrada por ciclo, no resurrección.
          }
        }));
      }
      const enPieKcal=lotes.flat().reduce((a,c)=>a+c.biomasaKg*10*valor(d,'cultivo_'+c.nombre,'energia'),0);
      return {area,inicialKcal,cosechaKcal,enPieKcal,kWh,aguaL,primeraCosechaTrasFallo};
    };
    const resultado={escenario:{inicio,duracion,fraccionLuz,soles},tipo:'ilustrativo; no mide ventaja real'};
    for(const modo of ['escalonada','sincronizada']) {
      const nominal=ejecutar(modo,false),fallo=ejecutar(modo,true);
      resultado[modo]={...fallo,referenciaKcal:nominal.cosechaKcal,
        perdidaKcal:nominal.cosechaKcal-fallo.cosechaKcal};
    }
    return resultado;
  }
  const api={Modelo,comparar};
  if(typeof module!=='undefined') module.exports=api;
  root.MILPA=api;
})(globalThis);
