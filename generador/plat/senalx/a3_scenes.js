/* Escenas moleculares animadas. Cada escena es: SVG estático + render(t) puro + fases con el texto de la lectura.
   Revisión científica de cada una (Alberts cap. 15; Lodish; estructuras PDB 3SN6, 2BG9 como guía visual):
   · GPCR: el ligando entra a un bolsillo entre las hélices del lado extracelular; el cambio de forma más
     visible es el giro hacia afuera del extremo citosólico de la hélice 6, que abre la cavidad donde se acopla la
     proteína G; el dominio helicoidal de α se separa, sale el GDP, entra GTP (abundante en el citosol);
     α-GTP se separa de βγ (ambas siguen ancladas a la membrana por lípidos) y regula a la enzima efectora.
   · Canal nicotínico: la acetilcolina se une al dominio extracelular, el poro (revestido por la hélice M2) se abre
     y pasan iones a favor de su gradiente.
   · RTK: la señal une dos receptores; cada dominio cinasa fosforila tirosinas del OTRO (cruzada);
     una proteína con dominio SH2 (Grb2) se ancla a una tirosina fosforilada.
   · Receptor nuclear: la hormona hidrofóbica atraviesa la bicapa, se une a su receptor (con Hsp90 en el citosol),
     el receptor se libera de Hsp90, entra por un poro nuclear y se une al HRE; se transcribe ARNm. */
(function(){
'use strict';
const X=window.__SX,B=X.B;const {seg,lerp,wob,f1}=B;
const T=(el,x=0,y=0,r=0,cx=0,cy=0,s=1)=>{if(el)el.setAttribute('transform',`translate(${f1(x)} ${f1(y)})${r?` rotate(${f1(r)} ${f1(cx)} ${f1(cy)})`:''}${s!==1?` scale(${s.toFixed(3)})`:''}`)};
const O=(el,v)=>{if(el)el.style.opacity=v.toFixed(3)};
const refs=svg=>{const m={};svg.querySelectorAll('[data-r]').forEach(e=>{const k=e.dataset.r;if(m[k]){if(!Array.isArray(m[k]))m[k]=[m[k]];m[k].push(e)}else m[k]=e});return m};
const zone=(x,y,s,a='start')=>`<text class="b-zone" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
const lab=(x,y,s,a='middle',r)=>`<text class="b-tag" x="${x}" y="${y}" text-anchor="${a}"${r?` data-r="${r}"`:''}>${s}</text>`;
const bg=(W,H,my,T0=13)=>`<rect class="b-exo" x="0" y="0" width="${W}" height="${my}"/><rect class="b-cyto" x="0" y="${my}" width="${W}" height="${H-my}"/>`;
// ===================== GPCR + proteína G + enzima efectora =====================
function gpcr(o={}){
  const W=640,H=340,my=150,rx=196,ry=112;
  const skip=(x)=>(x>184&&x<278)||(x>424&&x<502);
  const ligPocket=[230,124];
  const back=B.tm7(rx,ry,{h:76});
  // ligando en la ranura entre las hélices de atrás y las de adelante
  const tm=back+`<g data-r="lig"><circle class="b-glow" data-r="lglow" cx="${ligPocket[0]}" cy="${ligPocket[1]}" r="16" fill="url(#bg-glow)" style="opacity:0"/>${B.mol('amine',ligPocket[0],ligPocket[1],1.15)}</g>`;
  const camp=Array.from({length:6},(_,i)=>`<g data-r="cm">${B.mol('camp',470,214,1.4)}</g>`).join('');
  const atp=Array.from({length:6},(_,i)=>`<g data-r="atp">${B.mol('atp',470,214,.95)}</g>`).join('');
  const svg=`${bg(W,H,my)}${B.bilayer(B.line(0,W,my,8),{t:13,skip})}
   ${zone(14,24,'Exterior')}${zone(14,H-14,'Citosol')}
   ${B.acyc(430,128,{h:44})}${lab(468,108,'enzima efectora')}
   ${tm}${lab(232,92,'receptor de 7 hélices','middle','rlab')}
   <g data-r="G">${B.gprot(340,190,{label:true})}${lab(354,240,'proteína G (α · βγ)','middle','glab')}</g>
   ${atp}${camp}<g data-r="clab" style="opacity:0">${lab(560,262,'AMPc')}</g>`;
  const phases=[{t:0,label:'Llega la señal',txt:'La molécula señalizadora (aquí, una amina como la adrenalina) es hidrosoluble: no cruza la bicapa y busca su receptor.'},
   {t:2.6,label:'Se une al receptor de 7 hélices',txt:'Entra a un bolsillo entre las hélices del lado extracelular. Al unirla, el receptor cambia de forma: el extremo citosólico de la hélice 6 gira hacia afuera.'},
   {t:4.4,label:'Actúa como GEF: α cambia GDP por GTP',txt:'La proteína G se acopla a la cavidad que se abrió. El receptor actúa como GEF: la α suelta el GDP y une GTP.'},
   {t:9.2,label:'α-GTP se separa de βγ y regula la enzima',txt:'α-GTP se separa de βγ (ambas siguen ancladas a la membrana) y activa a la enzima efectora; aquí, la adenilil ciclasa, que convierte ATP en AMPc.'}];
  const bind=svg=>{const R=refs(svg);const cms=[].concat(R.cm),atps=[].concat(R.atp);const hd=svg.querySelector('[data-r=ga] .hd');
    const tm6=R.tm6,piv=[rx+5*10.5+4.5,ry-2.5];
    const camT=cms.map((_,i)=>[[392,248],[440,290],[500,300],[560,280],[590,238],[520,246]][i]);
    return t=>{
      // 1. difusión del ligando hacia el bolsillo
      const u=seg(t,0,2.6),d=1-u;O(R.lglow,seg(t,2.4,3.2));const lx=lerp(60-ligPocket[0],0,u)+wob(t,1,10*d),ly=lerp(28-ligPocket[1],0,u)+wob(t,2.4,8*d);T(R.lig,lx,ly);
      // 2. cambio conformacional: TM6 gira hacia afuera
      const c=seg(t,2.9,4.4);T(tm6,0,0,-13*c,piv[0],piv[1]);
      // 3. la proteína G difunde lateralmente hasta la cavidad del receptor
      const g=seg(t,4.4,5.9);T(R.G,lerp(0,-106,g)+wob(t,4,2*(1-g))*(t<5.9?1:0),0);O(R.glab,1-seg(t,4.4,5));
      // dominio helicoidal de α se separa → sale GDP → entra GTP → se cierra
      const op=seg(t,6,6.7)-seg(t,8.3,9);if(hd)T(hd,6*op,7*op,28*op,340,190);
      const gd=seg(t,6.6,7.6);T(R.gdp,gd*-14,gd*46+wob(t,7,3*gd));O(R.gdp,1-seg(t,7.1,7.8));
      const gt=seg(t,7.4,8.4);T(R.gtp,(1-gt)*-40,(1-gt)*60+wob(t,9,4*(1-gt)));O(R.gtp,seg(t,7.2,7.7));
      // 4. α-GTP se separa de βγ y llega a la adenilil ciclasa
      const s=seg(t,9.2,10.4),m=seg(t,10.4,12);T(R.ga,lerp(0,8,s)+lerp(0,176,m)+wob(t,3,2*s*(1-m)),lerp(0,6,s)-lerp(0,0,m));
      // ATP → AMPc
      atps.forEach((e,i)=>{const a=seg(t,12+i*.25,12.5+i*.25),b=seg(t,12.5+i*.25,12.9+i*.25);T(e,(1-a)*(-60+i*20),(1-a)*(70+i*4));O(e,a*(1-b))});
      cms.forEach((e,i)=>{const a=seg(t,12.6+i*.25,14.6+i*.25),k=i*1.7;T(e,lerp(0,camT[i][0]-470,a)+wob(t,k,6*a),lerp(0,camT[i][1]-214,a)+wob(t,k+1,6*a));O(e,seg(t,12.5+i*.25,12.8+i*.25))});
      O(R.clab,seg(t,14,14.8));
    }};
  return {W,H,svg,phases,dur:16,bind,label:'Receptor acoplado a proteína G en la bicapa, con la proteína G trimérica y la adenilil ciclasa'};
}
// ===================== Canal iónico activado por ligando (receptor nicotínico) =====================
function canal(){
  const W=640,H=340,my=170,cx=320;
  const skip=x=>x>cx-48&&x<cx+48;
  const sub=(s)=>{// una subunidad vista en corte: dominio extracelular, 4 hélices transmembrana (M2 hacia el poro) y dominio intracelular
    const sx=cx+s*14;let hx='';[3,2,1,0].forEach(i=>{const xx=sx+s*(i*9)-4.5;hx+=B.helix(xx,my-30,9,60,'rc',{cls:i===0?'m2':'',attr:i===0?` data-r="m2${s>0?'R':'L'}"`:''})});
    return `<g data-r="sub${s>0?'R':'L'}">${B.blob(sx+s*16,my-62,30,34,'rc',{seed:s>0?41:43,rough:.09})}${hx}${B.blob(sx+s*18,my+48,18,16,'rc',{seed:s>0?45:47})}
      <path class="b-site" d="${B.blobPath(sx+s*38,my-66,10,8,3,.05)}"/></g>`};
  const ach=[-1,1].map(s=>`<g data-r="ach">${B.mol('ach',cx+s*52,my-66,1.5)}</g>`).join('');
  const ions=Array.from({length:9},()=>`<g data-r="ion">${B.mol('ion',cx,my-150,1.1)}</g>`).join('');
  const signs=[...Array.from({length:6},(_,i)=>`<text class="b-chg pos" x="${60+i*40+(i>2?260:0)}" y="${my-24}" text-anchor="middle">+</text>`),...Array.from({length:6},(_,i)=>`<text class="b-chg neg" data-r="neg" x="${60+i*40+(i>2?260:0)}" y="${my+34}" text-anchor="middle">−</text>`),...Array.from({length:4},(_,i)=>`<text class="b-chg pos" data-r="ipos" x="${cx-90+i*60}" y="${my+70}" text-anchor="middle" style="opacity:0">+</text>`)].join('');
  const svg=`${bg(W,H,my)}${B.bilayer(B.line(0,W,my,8),{t:13,skip})}${zone(14,24,'Exterior')}${zone(14,H-14,'Citosol')}${signs}
    ${ions}${sub(-1)}${sub(1)}${ach}${lab(W-16,H-14,'receptor nicotínico de acetilcolina','end')}${lab(cx+150,112,'iones','middle')}`;
  const phases=[{t:0,label:'Llega la acetilcolina',txt:'El neurotransmisor difunde desde la terminal nerviosa hasta el receptor.'},
   {t:2.4,label:'Se une al canal',txt:'La acetilcolina se une al dominio extracelular del receptor, que es a la vez el canal.'},
   {t:3.8,label:'El canal se abre',txt:'Las subunidades giran ligeramente y las hélices que revisten el poro se separan: el canal queda abierto.'},
   {t:5.2,label:'Pasan iones: cambia el potencial',txt:'Pasan iones a través del poro y cambia el potencial de membrana: respuesta en milisegundos.'}];
  const bind=svg=>{const R=refs(svg);const ions=[].concat(R.ion),achs=[].concat(R.ach),negs=[].concat(R.neg),ipos=[].concat(R.ipos);
    return t=>{achs.forEach((e,i)=>{const s=i?1:-1,u=seg(t,0,2.6),d=1-u;T(e,lerp(s*60,0,u)+wob(t,i*3,9*d),lerp(-90,0,u)+wob(t,i*3+1,7*d))});
      const o=seg(t,3.8,5);T(R.subL,-8*o,0,-4*o,cx-14,my);T(R.subR,8*o,0,4*o,cx+14,my);T(R.m2L,-3*o,0,-6*o,cx-18,my);T(R.m2R,3*o,0,6*o,cx+18,my);
      ions.forEach((e,i)=>{const t0=5.2+i*.55,u=B.clamp((t-t0)/2.4);const sx0=-230+i*56+((i*29)%17),sy0=10+((i*37)%70);const x=u<.35?lerp(sx0,0,seg(u,0,.35))+wob(t,i,6*(1-u)):(u>.85?(i%2?1:-1)*(u-.85)*260:0)+wob(t,i,u>.85?10:1);const y=u<.35?lerp(sy0,90,seg(u,0,.35)):lerp(90,300,(u-.35)/.65);T(e,x+(u===0?wob(t,i+3,6):0),y+(u===0?wob(t,i+5,5):0))});
      negs.forEach((e,i)=>O(e,1-.75*seg(t,6+i*.3,7.5+i*.3)));ipos.forEach((e,i)=>O(e,seg(t,6.4+i*.35,7.6+i*.35)));
    }};
  return {W,H,svg,phases,dur:11,bind,label:'Receptor nicotínico de acetilcolina en la bicapa: dos subunidades en corte y el poro central'};
}
// ===================== Receptor tirosina cinasa =====================
function rtk(){
  const W=640,H=340,my=120;
  const mono=(x,s,k)=>{let tail='';[0,1].forEach(j=>tail+=`<circle class="b-tyr" cx="${x+s*6}" cy="${my+150+j*22}" r="4.2"/><text class="b-tyrl" x="${x+s*6}" y="${my+152.5+j*22}" text-anchor="middle">Y</text>`);
    return `<g data-r="mo${k}">${B.blob(x-s*2,my-74,17,21,'rc',{seed:51+k,rough:.1})}${B.blob(x+s*3,my-38,13,15,'rc',{seed:53+k})}${B.helix(x-3.5,my-24,7,48,'rc',{step:4.5})}
      ${B.blob(x,my+48,20,16,'rc',{seed:55+k})}${B.blob(x+s*2,my+84,24,21,'rc',{seed:57+k})}<path class="b-loop" d="M${x+s*6} ${my+104}C${x+s*14} ${my+120} ${x} ${my+130} ${x+s*6} ${my+146}L${x+s*6} ${my+176}" style="stroke:color-mix(in srgb,var(--e-rc) 80%,#000)"/>${tail}
      ${[0,1].map(j=>`<g data-r="p${k}${j}" style="opacity:0">${B.phos(x+s*6,my+150+j*22,5.2)}</g>`).join('')}</g>`};
  const skip=()=>false;
  const flying=[0,1].map(k=>[0,1].map(j=>`<g data-r="fly" style="opacity:0">${B.phos(0,0,5.2)}</g>`).join('')).join('');
  const lig=`<g data-r="lig">${B.blob(306,40,13,11,'sg',{seed:61,f:false})}${B.blob(334,40,13,11,'sg',{seed:63,f:false})}</g>`;
  const grb=`<g data-r="grb">${B.blob(520,300,20,14,'td',{seed:71})}${B.blob(500,288,9,8,'td',{seed:73,f:false})}${B.blob(542,288,9,8,'td',{seed:75,f:false})}${lab(520,330,'Grb2 · dominio SH2')}</g>`;
  const svg=`${bg(W,H,my)}${B.bilayer(B.line(0,W,my,8),{t:13,skip})}${zone(14,24,'Exterior')}${zone(14,H-14,'Citosol')}
    ${mono(227,-1,0)}${mono(415,1,1)}${lig}${flying}${grb}${lab(120,my+60,'dominio cinasa','middle')}${lab(120,my-70,'dominio que une la señal','middle')}`;
  const phases=[{t:0,label:'Llega el factor de crecimiento',txt:'Un factor de crecimiento (EGF, PDGF, FGF, NGF) llega a dos receptores que están separados en la membrana.'},
   {t:2.6,label:'La señal une dos receptores',txt:'Al unirse, junta a los dos receptores: se forma un dímero y los dominios cinasa quedan uno frente al otro.'},
   {t:4.8,label:'Autofosforilación cruzada',txt:'Cada dominio cinasa fosforila tirosinas del OTRO receptor (transautofosforilación): los fosfatos cruzan de un lado al otro.'},
   {t:7.6,label:'Las tirosinas-P anclan proteínas SH2',txt:'Las tirosinas fosforiladas son sitios de anclaje: Grb2 se une por su dominio SH2 e inicia una vía (Ras-MAP cinasa).'}];
  const bind=svg=>{const R=refs(svg);const fly=[].concat(R.fly);
    return t=>{const u=seg(t,0,2.6),d=1-u;T(R.lig,wob(t,1,12*d),lerp(-60,0,u)+wob(t,2,8*d));
      const m=seg(t,2.6,4.6);T(R.mo0,lerp(0,48,m)+wob(t,5,3*(1-m)),0);T(R.mo1,lerp(0,-48,m)+wob(t,6,3*(1-m)),0);T(R.lig,wob(t,1,12*d),lerp(-60,0,u)+wob(t,2,8*d)+lerp(0,36,m));
      // fosfatos que cruzan: del dominio cinasa izquierdo a las tirosinas del derecho y viceversa
      const L=[227+48,my+84],Rk=[415-48,my+84];const tgt=[[415-48+6,my+150],[415-48+6,my+172],[227+48-6,my+150],[227+48-6,my+172]];const src=[L,L,Rk,Rk];
      fly.forEach((e,i)=>{const a=seg(t,4.9+i*.45,6+i*.45);const s=src[i],g=tgt[i];const x=lerp(s[0],g[0],a),y=lerp(s[1],g[1],a)-Math.sin(a*Math.PI)*24;T(e,x,y);O(e,a>0&&a<1?1:0)});
      [['p10',0],['p11',1],['p00',2],['p01',3]].forEach(([k,i])=>O(R[k],seg(t,5.9+i*.45,6.1+i*.45)));
      const g=seg(t,7.8,9.8),dg=1-g;T(R.grb,lerp(0,-(520-(415-48+6))-24,g)+wob(t,8,10*dg),lerp(0,(my+172)-300+2,g)+wob(t,9,8*dg));
    }};
  return {W,H,svg,phases,dur:11,bind,label:'Dos receptores tirosina cinasa en la membrana, el factor de crecimiento y la proteína adaptadora Grb2'};
}
// ===================== Receptor nuclear =====================
function nuc(){
  const W=640,H=360,my=54;
  const env=t=>[60+t*560,250-Math.sin(t*Math.PI)*40];
  const pore=x=>Math.abs(x-340)<16;
  const envO=B.sample(t=>{const p=env(t);return [p[0],p[1]-7]},0,1,7),envI=B.sample(t=>{const p=env(t);return [p[0],p[1]+9]},0,1,7);
  const ne=B.bilayer(envO,{t:5.5,r:2.1,skip:x=>pore(x),tails:false,cls:'nenv'})+B.bilayer(envI,{t:5.5,r:2.1,skip:x=>pore(x),tails:false,cls:'nenv'});
  const pc=`${B.blob(322,212,7,13,'mu',{seed:81,f:false})}${B.blob(358,212,7,13,'mu',{seed:83,f:false})}`;
  const svg=`<rect class="b-exo" x="0" y="0" width="${W}" height="${my}"/><rect class="b-cyto" x="0" y="${my}" width="${W}" height="${H-my}"/><path class="b-nucl" d="M60 250 Q340 170 620 250 L620 ${H} L60 ${H}Z"/>
    ${B.bilayer(B.line(0,W,my,8),{t:13})}${ne}${pc}${zone(14,20,'Exterior')}${zone(14,140,'Citosol')}${zone(600,H-12,'Núcleo','end')}
    ${B.dna(120,600,314,{hl:[380,430]})}${lab(405,342,'HRE')}
    <g data-r="mr" style="opacity:0">${B.mrna(440,292,84)}${lab(486,278,'ARNm')}</g>
    <g data-r="hsp">${B.blob(232,150,14,11,'mu',{seed:91})}${B.blob(246,166,14,11,'mu',{seed:93})}${lab(266,190,'Hsp90','start')}</g>
    <g data-r="nr">${B.blob(210,140,19,14,'rc',{seed:95})}<g data-r="lig">${B.mol('steroid',210,140,.75)}</g></g>${lab(170,118,'receptor','end','rl')}
    <g data-r="coa" style="opacity:0">${B.blob(445,300,13,10,'rs',{seed:97})}</g>`;
  const phases=[{t:0,label:'La hormona cruza la membrana',txt:'Es pequeña e hidrofóbica: se disuelve en el centro de la bicapa y la atraviesa sin receptor de superficie.'},
   {t:3.2,label:'Se une a su receptor',txt:'En el citosol encuentra a su receptor, que espera unido a la chaperona Hsp90.'},
   {t:5,label:'Se libera de Hsp90 y entra al núcleo',txt:'Al unir la hormona, el receptor cambia de forma, se libera de Hsp90 y entra al núcleo por un poro.'},
   {t:8.6,label:'Se une al HRE y activa la transcripción',txt:'Se une al elemento de respuesta a la hormona (HRE) del ADN y recluta coactivadores: se transcriben los genes diana (horas).'}];
  const bind=svg=>{const R=refs(svg);
    return t=>{// hormona: exterior → bicapa (más lenta en el centro hidrofóbico) → citosol → receptor
      const a=seg(t,0,1.2),b=seg(t,1.2,2.2),c=seg(t,2.2,3.4);
      const p0=[90,-120],p1=[120,-86],p2=[110,-56],p3=[0,0];
      let x=lerp(p0[0],p1[0],a),y=lerp(p0[1],p1[1],a);if(t>1.2){x=lerp(p1[0],p2[0],b);y=lerp(p1[1],p2[1],b)}if(t>2.2){x=lerp(p2[0],p3[0],c);y=lerp(p2[1],p3[1],c)}
      const fr=t<1.2?1:t<2.2?.3:(1-c);T(R.lig,x+wob(t,1,8*fr),y+wob(t,2,6*fr));
      // cambio de forma + salida de Hsp90
      const k=seg(t,4.2,5.2);const h=seg(t,5,6.4);T(R.hsp,lerp(0,40,h),lerp(0,-26,h));O(R.hsp,1-seg(t,5.6,6.6));
      // translocación: al poro (340,212) y luego al HRE (405,306)
      const m1=seg(t,5.6,7.4),m2=seg(t,7.4,8.4),m3=seg(t,8.6,9.8);
      const tx=lerp(0,130,m1)+lerp(0,0,m2)+lerp(0,65,m3),ty=lerp(0,50,m1)+lerp(0,40,m2)+lerp(0,76,m3);
      T(R.nr,tx+wob(t,4,4*(m1-m1*m1*1)),ty,-10*k+10*m3,210,140);O(R.rl,1-seg(t,5.4,6));
      O(R.coa,seg(t,9.6,10.4));T(R.coa,lerp(40,0,seg(t,9.6,10.6)),lerp(20,0,seg(t,9.6,10.6)));
      O(R.mr,seg(t,10.6,11.4));T(R.mr,lerp(-30,0,seg(t,10.6,12.2)),0);
    }};
  return {W,H,svg,phases,dur:13,bind,label:'Hormona esteroidea que atraviesa la bicapa, su receptor con Hsp90, el poro nuclear y el ADN con el HRE'};
}
// montaje genérico: escena + controles de reproducción
function mount(host,sc,o={}){
  host.innerHTML=`<div class="ex-plate b-stage"><svg viewBox="0 0 ${sc.W} ${sc.H}" role="img" aria-label="${X.esc(sc.label)}">${sc.svg}</svg></div>${B.ctlHTML(sc.phases)}<p class="b-say" aria-live="polite"></p>`;
  host.querySelector('.b-ph').style.setProperty('--n',sc.phases.length);
  const svg=host.querySelector('svg'),say=host.querySelector('.b-say');const render=sc.bind(svg);
  let ui;const pl=B.player({dur:sc.dur,render,phases:sc.phases,onPhase:k=>{ui&&ui.phase(k);const p=sc.phases[Math.max(0,k)];say.innerHTML=`<b>${p.label}.</b> ${p.txt}`},onTick:(t,pg)=>ui&&ui.tick(t,pg,sc.dur)});
  ui=B.wireCtl(host,pl,sc.phases);pl.draw();
  pl.obs=B.seen(host,v=>pl.visible(v));
  return pl}
X.SC={gpcr,canal,rtk,nuc,mount,refs,T,O};
X.scCSS=`
.ed .b-tag{font:500 11.5px var(--e-mono);fill:var(--e-mut);letter-spacing:.02em}.ed .b-tag.halo{paint-order:stroke;stroke:var(--e-paper);stroke-width:3px;fill:var(--e-ink)}
.ed .b-site{fill:none;stroke:color-mix(in srgb,var(--e-rc) 70%,#000);stroke-width:1;stroke-dasharray:2 2;opacity:.7}
.ed .b-chg{font:600 15px var(--e-mono)}.ed .b-chg.pos{fill:var(--e-of)}.ed .b-chg.neg{fill:var(--e-td)}
.ed .b-tyr{fill:var(--e-plate);stroke:var(--e-rc);stroke-width:1}.ed .b-tyrl{font:600 6.5px var(--e-mono);fill:var(--e-rc)}
.ed .b-nucl{fill:var(--e-nuc)}
.ed .nenv .b-core{fill:color-mix(in srgb,var(--e-core) 70%,var(--e-nuc))}
.ed .b-stage svg{display:block;width:100%;height:auto}
@media (max-width:640px){.ed .b-stage{overflow-x:auto;-webkit-overflow-scrolling:touch}.ed .b-stage svg{min-width:600px}.ed #ex-amp .am-plate{overflow-x:auto}.ed #ex-amp .am-plate svg{min-width:520px}}
.ed .b-say{font-size:16.5px;line-height:1.6;margin:12px 0 0;min-height:3.2em;max-width:760px}
.ed .b-say b{font-weight:650}
`;
})();
