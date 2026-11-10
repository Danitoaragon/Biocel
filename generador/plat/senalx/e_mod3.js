(function(){
'use strict';
const X=window.__SX,{S,esc,frame,onView,RM,REF}=X;
// ======================= FIG. 6 · AMPLIFICACIÓN =======================
function amp(n){
  const B=X.B,W=560,H=450,my=104;
  const Gx=[170,310,450],Pk=[[190,300],[330,300],[470,300]];
  const Cx=Array.from({length:6},(_,i)=>70+i*86+20),Ex=Array.from({length:18},(_,i)=>36+i*28.4);
  const skip=x=>(x>48&&x<130)||Gx.some(g=>x>g+30&&x<g+86);
  let s=`<rect class="b-exo" width="560" height="${my}"/><rect class="b-cyto" y="${my}" width="560" height="${H-my}"/>${B.bilayer(B.line(0,560,my,8),{t:12,skip})}
   <text class="b-zone" x="12" y="20">Exterior</text><text class="b-zone" x="12" y="${H-10}">Citosol</text>`;
  s+=`<g transform="translate(60 ${my-34}) scale(.82)">${B.tm7(0,0,{h:68})}</g>`;
  Gx.forEach((g,i)=>{s+=`<g transform="translate(${g+36} ${my-24}) scale(.62)">${B.acyc(0,0,{h:40})}</g>`});
  Gx.forEach((g,i)=>{s+=`<g data-r="g${i}"><g transform="translate(${g} ${my+40}) scale(.72) translate(${-g} ${-(my+40)})">${B.gprot(g,my+40)}</g></g><circle data-r="pu${i}" class="am-pulse" cx="${g}" cy="${my+30}" r="20" fill="url(#bg-glowtd)" style="opacity:0"/>`});
  s+=`<g data-r="lig"><circle data-r="lg" cx="94" cy="${my-18}" r="14" fill="url(#bg-glow)" style="opacity:0"/>${B.mol('amine',94,my-18,1.1)}</g>`;
  for(let i=0;i<12;i++)s+=`<g data-r="cm" style="opacity:0">${B.mol('camp',0,0,1.15)}</g>`;
  Pk.forEach(([x,y],i)=>{s+=`<g data-r="pk${i}">${B.blob(x-9,y-8,13,9,'of',{seed:131+i,f:false})}${B.blob(x-9,y+9,13,9,'of',{seed:134+i,f:false})}</g>`;
    [0,1].forEach(j=>s+=`<g data-r="c${i*2+j}">${B.blob(x+14,y-9+j*18,9,8,'rs',{seed:140+i*2+j})}</g>`)});
  Ex.forEach((x,i)=>{s+=`<g>${B.blob(x,410,10,8,'mu',{seed:150+i,f:false})}<g data-r="ea" style="opacity:0">${B.blob(x,410,10,8,'rs',{seed:150+i,f:false})}</g><g data-r="ep" style="opacity:0">${B.phos(x+7,401,4.2)}</g></g>`});
  s+=`<text class="b-tag" x="${Pk[0][0]-60}" y="${Pk[0][1]+4}" text-anchor="end">PKA</text><text class="b-tag" x="18" y="388">enzimas</text>`;
  const T=[['1 hormona',1,40,'sg'],['1 receptor',1,86,'rc'],['varias proteínas G',3,132,'td'],['cada una activa una adenilil ciclasa',3,176,'td'],['muchas moléculas de AMPc',12,236,'td'],['PKA activas (subunidades C libres)',6,320,'of'],['muchas enzimas fosforiladas',18,404,'rs']];
  const cnt=`<ol class="am-cnt" aria-label="Moléculas activas en este esquema">`+T.map(([l,k,y,c],i)=>`<li data-c="${c}"><span class="l">${l}</span><span class="bar"><i data-r="bar" data-w="${k}"></i></span><b data-r="num">0</b></li>`).join('')+`</ol>`;
  const body=`<div class="am-grid"><div class="ex-plate am-plate"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Amplificación: una hormona activa un receptor, varias proteínas G, varias adenilil ciclasas, muchas moléculas de AMPc, varias PKA y muchas enzimas">${s}</svg></div>${cnt}</div>${B.ctlHTML(AMPH)}<p class="b-say" aria-live="polite"></p>`;
  return frame('amp',n,'Una señal pequeña, una respuesta grande',body,'En una cascada, cada componente activo activa a muchas moléculas del siguiente: un receptor activa varias proteínas G, cada adenilil ciclasa forma muchas moléculas de AMPc, cada PKA fosforila muchas enzimas. Las barras cuentan las moléculas activas dibujadas en este esquema; el número es ilustrativo.',['A']);
}
const AMPH=[{t:0,label:'1 hormona, 1 receptor',txt:'Una sola molécula de hormona activa un receptor.'},
 {t:2.6,label:'Varias proteínas G',txt:'El receptor activo actúa como GEF una y otra vez: activa varias proteínas G, cada una de las cuales activa una adenilil ciclasa.'},
 {t:5.6,label:'Muchas moléculas de AMPc',txt:'Cada adenilil ciclasa forma muchas moléculas de AMPc; el AMPc se une a las subunidades R de la PKA y libera a las C, ahora activas.'},
 {t:8.6,label:'Muchas enzimas fosforiladas',txt:'Cada PKA fosforila muchas enzimas. Por eso concentraciones bajísimas de hormona producen respuestas grandes.'}];
function wireAmp(fig){const B=X.B,{seg,lerp,wob}=B,svg=fig.querySelector('svg'),say=fig.querySelector('.b-say');fig.querySelector('.b-ph').style.setProperty('--n',AMPH.length);
  const R=X.SC.refs(fig),T=X.SC.T,O=X.SC.O;const cms=[].concat(R.cm),bars=[].concat(R.bar),nums=[].concat(R.num),ea=[].concat(R.ea),ep=[].concat(R.ep);
  const my=104,Gx=[170,310,450],Pk=[[190,300],[330,300],[470,300]],Ex=Array.from({length:18},(_,i)=>36+i*28.4);
  const Cdst=Array.from({length:6},(_,i)=>[Ex[i*3+1],378]);
  const cnt=(i,v)=>{const k=+bars[i].dataset.w;const w=v*k;bars[i].style.width=(w/18*100).toFixed(1)+'%';nums[i].textContent=Math.round(w)};
  const render=t=>{const u=seg(t,0,2.2),d=1-u;T(R.lig,lerp(-40,0,u)+wob(t,1,10*d),lerp(-60,0,u)+wob(t,2,6*d));O(R.lg,seg(t,2,2.6));
    cnt(0,seg(t,.2,.8));cnt(1,seg(t,2,2.6));
    Gx.forEach((g,i)=>{const a=2.8+i*.8;O(R['pu'+i],seg(t,a,a+.3)*(1-seg(t,a+.5,a+1)));const m=seg(t,a+.4,a+1.2);
      const G=R['g'+i];const ga=G.querySelector('[data-r=ga]'),gdp=G.querySelector('[data-r=gdp]'),gtp=G.querySelector('[data-r=gtp]');O(gdp,1-seg(t,a,a+.35));O(gtp,seg(t,a+.2,a+.5));T(ga,lerp(0,52,m),lerp(0,-4,m))});
    cnt(2,seg(t,2.8,4.8));cnt(3,seg(t,3.4,5.6));
    cms.forEach((e,i)=>{const ac=Math.floor(i/4),j=i%4,t0=5.6+ac*.35+j*.22;const a=seg(t,t0,t0+1.5);const src=[Gx[ac]+60,my+44],pk=Pk[Math.floor(i/4)];const dst=[pk[0]-9+(j%2?12:-14),pk[1]+(j<2?-20:20)];
      T(e,lerp(src[0],dst[0],a)+wob(t,i,7*a*(1-a)*4),lerp(src[1],dst[1],a)+wob(t,i+2,6*a*(1-a)*4));O(e,seg(t,t0-.1,t0+.15))});
    cnt(4,seg(t,5.6,7.6));
    [0,1,2].forEach(k=>{const c=seg(t,7.6+k*.3,8.6+k*.3);[0,1].forEach(j=>{const i=k*2+j;const x0=Pk[k][0]+14,y0=Pk[k][1]-9+j*18;T(R['c'+i],lerp(0,Cdst[i][0]-x0,c)+wob(t,i,3*c*(1-c)*4),lerp(0,Cdst[i][1]-y0,c))})});
    cnt(5,seg(t,7.8,9.2));
    ea.forEach((e,i)=>{const t0=8.8+i*.12;O(e,seg(t,t0,t0+.3));O(ep[i],seg(t,t0,t0+.3))});cnt(6,seg(t,8.8,11.2));
  };
  let ui;const pl=B.player({dur:12,render,phases:AMPH,onPhase:k=>{ui&&ui.phase(k);const p=AMPH[Math.max(0,k)];say.innerHTML=`<b>${p.label}.</b> ${p.txt}`},onTick:(t,pg)=>ui&&ui.tick(t,pg,12)});
  ui=B.wireCtl(fig,pl,AMPH);pl.seek(12);pl.seek(0);let seen=false;
  B.seen(fig,(v,e)=>{pl.visible(v);if(v&&!seen&&e&&e.intersectionRatio>=.35){seen=true;pl.play(0)}})}
X.ampCSS=`
.ed #ex-amp .am-grid{display:grid;grid-template-columns:minmax(0,1fr) 250px;gap:0;align-items:stretch}
.ed #ex-amp .am-cnt{list-style:none;margin:0;padding:14px 18px;background:var(--e-plate);border-left:1px solid var(--e-rule);display:flex;flex-direction:column;justify-content:space-around;gap:8px}
.ed #ex-amp .am-cnt>li{margin:0!important;padding:0!important;display:grid;grid-template-columns:1fr 34px;gap:2px 8px;align-items:center;font-size:14px!important;line-height:1.3!important}.ed #ex-amp .am-cnt>li::before{display:none!important}
.ed #ex-amp .am-cnt .l{grid-column:1 / -1;color:var(--e-ink)}.ed #ex-amp .am-cnt .bar{height:7px;background:var(--e-plate2);border-radius:4px;overflow:hidden}
.ed #ex-amp .am-cnt .bar i{display:block;height:100%;width:0;border-radius:4px;background:var(--c)}
.ed #ex-amp .am-cnt b{font:600 14px var(--e-mono);text-align:right}
.ed #ex-amp .am-cnt li[data-c=sg]{--c:var(--e-sg)}.ed #ex-amp .am-cnt li[data-c=rc]{--c:var(--e-rc)}.ed #ex-amp .am-cnt li[data-c=td]{--c:var(--e-td)}.ed #ex-amp .am-cnt li[data-c=of]{--c:var(--e-of)}.ed #ex-amp .am-cnt li[data-c=rs]{--c:var(--e-rs)}
@media (max-width:760px){.ed #ex-amp .am-grid{grid-template-columns:1fr}.ed #ex-amp .am-cnt{border-left:0;border-top:1px solid var(--e-rule)}}
.ed #ex-amp .am-plate svg{display:block;width:100%;height:auto}
`;
// ======================= FIG. 7 · TERMINACIÓN =======================
const OFF=[['GTPasa de la α','La α hidroliza su GTP en segundos o minutos: temporizador incorporado.'],['Fosfodiesterasa','Degrada el AMPc a AMP.'],['Fosfatasas','Quitan los fosfatos que pusieron las cinasas.'],['Bombas de Ca²⁺','Gastan ATP y regresan el Ca²⁺ fuera del citosol.'],['Ras-GAP','Acelera la hidrólisis del GTP de Ras.'],['PTEN','Quita el fosfato al PIP₃ y apaga la vía PI3K-Akt.'],['Desensibilización','GRK fosforila al receptor y la arrestina impide que active a la proteína G.']];
const FAIL={gs:['La α no puede hidrolizar su GTP','La adenilil ciclasa produce AMPc sin parar y la PKA sigue activa aunque ya no haya señal (es lo que hace la toxina del cólera sobre Gαs).'],ras:['Ras no puede hidrolizar su GTP','La cascada Raf-MEK-ERK sigue enviando señales de proliferación sin factor de crecimiento (Ras mutado).']};
function term(n){
  const X0=60,X1=600,Y0=210,Y1=60,tx=t=>X0+(X1-X0)*t/10;
  const curve=fail=>{const p=[];for(let t=0;t<=10;t+=.1){let v=0;if(t>1)v=Math.min(1,(t-1)/1.2);if(t>6&&!fail)v=Math.max(0,1-(t-6)/1.5);p.push(`${tx(t).toFixed(1)},${(Y0-(Y0-Y1)*v*(t>1&&t<6?(.92+.08*Math.cos((t-1)*2)):1)).toFixed(1)}`)}return 'M'+p.join(' L')};
  const svg=`<svg viewBox="0 0 640 250" role="img" aria-label="Actividad de la vía en el tiempo"><line class="ax" x1="${X0}" y1="${Y0}" x2="${X1}" y2="${Y0}"/><line class="ax" x1="${X0}" y1="${Y0}" x2="${X0}" y2="${Y1-20}"/>
   ${S.t(X0-8,Y1-24,'actividad de la vía','','start')}${S.t(X1,Y0+22,'tiempo','','end')}
   <rect class="ph p-a" x="${tx(1)}" y="30" width="${tx(2.2)-tx(1)}" height="${Y0-30}"/><rect class="ph p-r" x="${tx(2.2)}" y="30" width="${tx(6)-tx(2.2)}" height="${Y0-30}"/><rect class="ph p-t" x="${tx(6)}" y="30" width="${tx(7.6)-tx(6)}" height="${Y0-30}"/>
   ${S.t((tx(1)+tx(2.2))/2,24,'ACTIVACIÓN','cap c-sg')}${S.t((tx(2.2)+tx(6))/2,24,'RESPUESTA','cap c-rs')}${S.t((tx(6)+tx(7.6))/2+20,24,'TERMINACIÓN','cap c-of')}
   <line class="mk" x1="${tx(1)}" y1="${Y0}" x2="${tx(1)}" y2="${Y0+8}"/>${S.t(tx(1),Y0+34,'llega la señal','c-sg')}<line class="mk" x1="${tx(6)}" y1="${Y0}" x2="${tx(6)}" y2="${Y0+8}"/>${S.t(tx(6),Y0+34,'se retira la señal','c-of')}
   <path class="cv ok" pathLength="1" d="${curve(false)}"/><path class="cv bad" pathLength="1" d="${curve(true)}"/></svg>`;
  const B=X.B;const vesC=(x,y,r)=>B.bilayer(B.sample(t=>[x+r*Math.cos(t*Math.PI*2),y+r*Math.sin(t*Math.PI*2)],0,1,7),{t:7,r:2.2,tails:false});
  const desens=`<svg viewBox="0 0 640 160" class="dsn" role="img" aria-label="Desensibilización del receptor">${[0,1,2,3].map(i=>{const x=i*160;return `<g class="dp" data-i="${i}">${i<3?B.bilayer(B.line(x+6,x+154,46,7),{t:10,r:2.6,skip:xx=>Math.abs(xx-(x+71))<26}):B.bilayer(B.line(x+6,x+154,46,7),{t:10,r:2.6})}${i===3?vesC(x+71,102,32):''}<g transform="translate(${x+71} ${i===3?70:46}) scale(.55,${i===3?-.55:.55}) translate(-36 -38)">${B.tm7(0,0,{h:76})}</g>${i===3?B.mol('amine',x+68,92,.9):''}${i<3?B.mol('amine',x+64,30,1):''}${i===1||i===2?B.phos(x+100,74,6):''}${i===2?B.blob(x+90,94,20,11,'of',{seed:431}):''}${i===0?B.blob(x+98,82,13,10,'td',{seed:433}):''}${i===1?B.blob(x+120,84,13,10,'mu',{seed:435}):''}${S.t(x+80,152,['receptor activo','GRK lo fosforila','se une la arrestina','endocitosis'][i],'c-mu')}</g>`}).join('')}</svg>`;
  const body=`<div class="ex-ctl"><button type="button" class="act" data-a="play">Reproducir</button><span class="sep"></span><label class="tg"><input type="checkbox" data-a="fail"> Si el apagado falla</label><select data-a="which" aria-label="Qué falla"><option value="gs">α no hidroliza GTP</option><option value="ras">Ras no hidroliza GTP</option></select></div>
   <div class="ex-row"><div class="ex-plate">${svg}</div><aside class="ex-side tm-side"><h4>Lo que apaga cada paso</h4><ol class="offl">${OFF.map(([a,b],i)=>`<li data-i="${i}"><b>${a}</b> ${b}</li>`).join('')}</ol><div class="failtx" aria-live="polite"></div></aside></div>
   <div class="ex-plate dsn-w ex-scroll">${desens}</div>`;
  return frame('term',n,'Una señal no se queda encendida',body,'Una señal útil debe terminar cuando desaparece el estímulo: cada paso que enciende tiene otro que apaga. Abajo, la desensibilización: si la señal persiste, el receptor se retira de la membrana; puede regresar o degradarse en los lisosomas.',['A','L']);
}
function wireTerm(fig){
  const svg=fig.querySelector('svg'),fb=fig.querySelector('[data-a=fail]'),sel=fig.querySelector('[data-a=which]'),ft=fig.querySelector('.failtx');let timers=[];
  const run=()=>{timers.forEach(clearTimeout);timers=[];const fail=fb.checked;svg.classList.toggle('fail',fail);fig.classList.toggle('isfail',fail);
    const f=FAIL[sel.value];ft.innerHTML=fail?`<b>${f[0]}.</b> ${f[1]}`:'';
    svg.classList.remove('go');void svg.getBoundingClientRect();
    const lis=[...fig.querySelectorAll('.offl li')],dps=[...fig.querySelectorAll('.dp')];lis.forEach(l=>l.classList.remove('on'));dps.forEach(d=>d.classList.remove('on'));
    if(RM()){svg.classList.add('go','done');if(!fail)lis.forEach(l=>l.classList.add('on'));dps.forEach(d=>d.classList.add('on'));return}
    svg.classList.add('go');if(!fail)lis.forEach((l,i)=>timers.push(setTimeout(()=>l.classList.add('on'),2500+i*220)));dps.forEach((d,i)=>timers.push(setTimeout(()=>d.classList.add('on'),600+i*700)))};
  fig.querySelector('[data-a=play]').onclick=run;fb.onchange=run;sel.onchange=()=>{if(fb.checked)run()};
  svg.classList.add('go','done');fig.querySelectorAll('.offl li,.dp').forEach(l=>l.classList.add('on'));
  let seen=false;onView(fig,(v,e)=>{if(v&&!seen&&e.intersectionRatio>=.35){seen=true;svg.classList.remove('done');run()}});
}
X.termCSS=`
.ed #ex-term .ax{stroke:var(--e-ink);stroke-width:1}.ed #ex-term .mk{stroke:var(--e-ink)}
.ed #ex-term .ph{opacity:.5}.ed #ex-term .p-a{fill:var(--e-sgl)}.ed #ex-term .p-r{fill:var(--e-rsl)}.ed #ex-term .p-t{fill:var(--e-ofl)}
.ed #ex-term .cv{fill:none;stroke-width:3;stroke-dasharray:1;stroke-dashoffset:1}
.ed #ex-term .cv.ok{stroke:var(--e-td)}.ed #ex-term .cv.bad{stroke:var(--e-of);display:none}
.ed #ex-term svg.fail .cv.ok{display:none}.ed #ex-term svg.fail .cv.bad{display:inline}
.ed #ex-term svg.go .cv{animation:edDraw 3.4s linear forwards}.ed #ex-term svg.done .cv{animation:none;stroke-dashoffset:0}
.ed #ex-term .offl{list-style:none;padding:0;margin:0}.ed #ex-term .offl li{padding:5px 0 5px 16px;margin:0;font-size:14.5px;line-height:1.45;color:var(--e-mut);position:relative;transition:color .4s}
.ed #ex-term .offl li::before{content:"";position:absolute;left:0;top:.75em;width:7px;height:7px;border-radius:50%;background:var(--e-rule);transition:background .4s}
.ed #ex-term .offl li.on{color:var(--e-ink)}.ed #ex-term .offl li.on::before{background:var(--e-of)}
.ed #ex-term .offl li b{display:inline;color:inherit}
.ed #ex-term.isfail .offl li{opacity:.4}
.ed #ex-term .failtx{margin-top:10px;font-size:15px;color:var(--e-of)}
.ed #ex-term .tg{font:500 12px var(--e-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--e-ink);display:inline-flex;gap:6px;align-items:center}
.ed #ex-term select{font:500 12px var(--e-mono);background:var(--e-paper);color:var(--e-ink);border:1px solid var(--e-rule);padding:4px 6px}
.ed #ex-term .dsn-w{margin-top:14px;padding:6px 0}
.ed #ex-term .dp{opacity:.25;transition:opacity .5s}.ed #ex-term .dp.on{opacity:1}
.ed #ex-term .ves{fill:none;stroke:var(--e-memh);stroke-width:5;stroke-dasharray:0 8;stroke-linecap:round}
`;
// ======================= FIG. · LA CÉLULA COMPLETA (explorable) =======================
const my=x=>150+7*Math.sin(x/120);
const B_=()=>X.B;
const tg=(x,y,s,c='')=>`<text class="ce-l ${c}" x="${x}" y="${y}" text-anchor="middle">${s}</text>`;
function cellDefs(){
  const B=B_();const E={};const add=(id,o)=>{E[id]=o};const yy=x=>my(x);
  const sc=(x,y,k,inner)=>`<g transform="translate(${x} ${y}) scale(${k}) translate(${-x} ${-y})">${inner}</g>`;
  // exterior
  add('ach',{x:110,y:66,n:'Acetilcolina',z:'Exterior',d:'Neurotransmisor. En el músculo esquelético se une a un receptor que es un canal iónico.',g:(x,y)=>B.mol('ach',x,y,1.5)});
  add('adr',{x:236,y:60,n:'Adrenalina',z:'Exterior',d:'Hormona hidrosoluble: no cruza la membrana, usa un GPCR acoplado a Gs.',g:(x,y)=>B.mol('amine',x,y,1.4)});
  add('sq',{x:456,y:60,n:'Señal de un GPCR acoplado a Gq',z:'Exterior',d:'Activa la vía de la fosfolipasa C.',g:(x,y)=>B.blob(x,y,9,7,'sg',{seed:201,f:false})});
  add('gf',{x:690,y:58,n:'Factor de crecimiento',z:'Exterior',d:'EGF, PDGF, FGF, NGF o insulina: une dos receptores tirosina cinasa.',g:(x,y)=>B.blob(x-9,y,10,8,'sg',{seed:203,f:false})+B.blob(x+9,y,10,8,'sg',{seed:205,f:false})});
  add('est',{x:800,y:56,n:'Hormona esteroidea',z:'Exterior',d:'Pequeña e hidrofóbica: cruza la membrana (cortisol, estradiol, testosterona).',g:(x,y)=>B.mol('steroid',x,y,1.2)});
  add('no',{x:884,y:62,n:'Óxido nítrico (NO)',z:'Exterior',d:'Gas que actúa como mediador local; cruza la membrana y dura sólo unos segundos.',g:(x,y)=>B.mol('no',x,y,1.6)+tg(x,y-12,'NO')});
  // membrana
  add('ch',{x:110,y:yy(110),n:'Receptor nicotínico (canal iónico)',z:'Membrana',d:'El receptor es un canal: la señal lo abre y cambia el paso de iones y el potencial de membrana.',g:(x,y)=>[-1,1].map(s=>`${B.blob(x+s*11,y-24,10,12,'rc',{seed:210+s,f:false})}${B.helix(x+s*8-3.5+(s>0?2:-2),y-13,7,28,'rc',{step:4})}${B.blob(x+s*10,y+20,7,6,'rc',{seed:214+s,f:false})}`).join('')});
  add('gsr',{x:236,y:yy(236),n:'GPCR acoplado a Gs',z:'Membrana',d:'Siete hélices transmembrana. Al unir la señal actúa como GEF sobre la proteína G.',g:(x,y)=>sc(x,y,.72,B.tm7(x-36,y-38,{h:76}))+tg(x,y-38,'GPCR · Gs','lod')});
  add('ac',{x:336,y:yy(336),n:'Adenilil ciclasa',z:'Membrana',d:'Enzima de membrana que convierte ATP en AMPc. No es una cinasa.',g:(x,y)=>sc(x,y,.55,B.acyc(x-40,y-24,{h:46}))+tg(x,y-26,'adenilil ciclasa','lod')});
  add('gqr',{x:456,y:yy(456),n:'GPCR acoplado a Gq',z:'Membrana',d:'Activa una Gq, que activa la fosfolipasa C-β.',g:(x,y)=>sc(x,y,.72,B.tm7(x-36,y-38,{h:76}))+tg(x,y-38,'GPCR · Gq','lod')});
  add('plc',{x:556,y:yy(556)+30,n:'Fosfolipasa C-β',z:'Membrana (cara citosólica)',d:'Corta el PIP₂ de la membrana en IP₃ y DAG.',g:(x,y)=>B.blob(x,y,24,11,'sg',{seed:220})+tg(x,y+4,'PLC-β')});
  add('rtk',{x:690,y:yy(690),n:'Receptor tirosina cinasa (dímero)',z:'Membrana',d:'La señal une dos receptores; cada dominio cinasa fosforila tirosinas del otro (autofosforilación cruzada).',g:(x,y)=>[-11,11].map((o,i)=>`${B.blob(x+o,y-32,8,12,'rc',{seed:230+i,f:false})}${B.helix(x+o-2.5,y-18,5,34,'rc',{step:4})}${B.blob(x+o,y+26,9,12,'rc',{seed:233+i,f:false})}`).join('')+B.phos(x-11,y+42,4.6)+B.phos(x+11,y+42,4.6)});
  // citoplasma: vía AMPc
  add('gsa',{x:280,y:212,n:'Gαs-GTP y βγ',z:'Citoplasma (cara interna de la membrana)',d:'La α cambió GDP por GTP y se separó de βγ; activa a la adenilil ciclasa. Su actividad GTPasa la apaga.',g:(x,y)=>`${B.blob(x,y,17,13,'td',{seed:240})}${B.gnuc(x-8,y+2,3,{s:.9})}${tg(x+4,y-16,'αs-GTP','lod')}${B.blob(x-34,y+5,11,10,'rs',{seed:242})}${tg(x-34,y+26,'βγ','lod')}`});
  add('camp',{x:390,y:262,n:'AMPc',z:'Citoplasma',d:'Segundo mensajero: en segundos su concentración puede aumentar unas veinte veces.',g:(x,y)=>[[-26,-10],[-8,4],[10,-14],[24,6],[-16,20],[6,22],[30,-24]].map(([a,b])=>B.mol('camp',x+a,y+b,1.15)).join('')});
  add('pka',{x:430,y:330,n:'PKA (R₂C₂)',z:'Citoplasma',d:'El AMPc se une a las subunidades R y libera a las C, que fosforilan serinas y treoninas.',g:(x,y)=>`${B.blob(x-10,y-9,15,10,'of',{seed:250,f:false})}${B.blob(x-10,y+11,15,10,'of',{seed:251,f:false})}${B.blob(x+18,y-12,9,8,'rs',{seed:252})}${B.blob(x+20,y+14,9,8,'rs',{seed:253})}${tg(x-10,y+38,'PKA')}`});
  add('glu',{x:282,y:392,n:'Enzimas del glucógeno',z:'Citoplasma',d:'Respuesta rápida: la PKA fosforila enzimas que inician la degradación del glucógeno y frenan su síntesis.',g:(x,y)=>{let r='';for(let i=0;i<22;i++){const a=i*2.4,rr=3+Math.sqrt(i)*4.2;r+=`<circle class="gly" cx="${(x-22+Math.cos(a)*rr).toFixed(1)}" cy="${(y+Math.sin(a)*rr*.8).toFixed(1)}" r="2.2"/>`}return r+B.blob(x+22,y-2,15,11,'rs',{seed:256})+B.phos(x+36,y-12,5)+tg(x,y+30,'glucógeno')}});
  add('pde',{x:168,y:300,n:'Fosfodiesterasa',z:'Citoplasma',d:'Degrada el AMPc a AMP y apaga la señal.',g:(x,y)=>B.blob(x,y,26,13,'of',{seed:258})+tg(x,y+4,'PDE')});
  // vía Gq / Ca2+
  add('gqa',{x:500,y:216,n:'Gαq-GTP',z:'Citoplasma (cara interna de la membrana)',d:'Activa a la fosfolipasa C-β.',g:(x,y)=>`${B.blob(x,y,17,13,'td',{seed:260})}${B.gnuc(x-8,y+2,3,{s:.9})}${tg(x+4,y-16,'αq-GTP','lod')}`});
  add('dag',{x:600,y:yy(600)+6,n:'DAG',z:'Membrana',d:'Diacilglicerol: queda en la membrana y, junto con el Ca²⁺, activa a la PKC.',g:(x,y)=>B.mol('dag',x,y,1.3)});
  add('pkc',{x:600,y:238,n:'Proteína cinasa C (PKC)',z:'Citoplasma',d:'DAG + Ca²⁺ la activan en la membrana; fosforila otras proteínas.',g:(x,y)=>B.blob(x,y,22,13,'of',{seed:262})+tg(x,y+4,'PKC')});
  add('ip3',{x:470,y:330,n:'IP₃',z:'Citoplasma',d:'Hidrosoluble: difunde por el citosol y abre canales de Ca²⁺ del retículo endoplásmico.',g:(x,y)=>[[22,-26],[6,-8],[-10,10],[-26,28]].map(([a,b])=>B.mol('ip3',x+a,y+b,1.05)).join('')});
  add('erch',{x:316,y:474,n:'Canal de Ca²⁺ del retículo',z:'Citoplasma (membrana del retículo endoplásmico)',d:'Se abre cuando une IP₃: el Ca²⁺ sale al citosol a favor de su gradiente.',g:(x,y)=>B.helix(x-11,y-13,7,26,'rs',{step:4})+B.helix(x+4,y-13,7,26,'rs',{step:4})});
  add('ca',{x:368,y:446,n:'Ca²⁺',z:'Citoplasma',d:'En el citosol está muy bajo (≈10⁻⁷ M); basta abrir unos canales para que suba rápido.',g:(x,y)=>[[-22,8],[-6,-6],[10,6],[24,-10],[2,18],[-14,-18]].map(([a,b])=>B.mol('ca',x+a,y+b,1.15)).join('')+tg(x+30,y+20,'Ca²⁺','lod')});
  add('cam',{x:458,y:446,n:'Calmodulina',z:'Citoplasma',d:'Proteína con cuatro sitios de unión a Ca²⁺; al unirlo cambia de forma y activa dianas.',g:(x,y)=>`${B.blob(x-16,y,12,10,'rs',{seed:270})}${B.blob(x+16,y,12,10,'rs',{seed:272})}<path class="ce-hl" d="M${x-6} ${y}h12"/>${[[-22,-6],[-12,6],[12,-6],[22,6]].map(([a,b])=>B.mol('ca',x+a,y+b,.7)).join('')}${tg(x,y+24,'CaM')}`});
  add('camk',{x:462,y:508,n:'CaM-cinasas',z:'Citoplasma',d:'Cinasas dependientes de Ca²⁺/calmodulina: fosforilan muchas proteínas.',g:(x,y)=>B.blob(x,y,30,13,'rs',{seed:274})+tg(x,y+4,'CaM-cinasa')});
  add('pump',{x:132,y:468,n:'Bomba de Ca²⁺',z:'Citoplasma (membrana del retículo endoplásmico)',d:'Gasta ATP para regresar el Ca²⁺ y mantenerlo bajo en el citosol: apaga la señal.',g:(x,y)=>B.blob(x,y,17,15,'of',{seed:276})+B.mol('atp',x+20,y-20,.9)+tg(x,y+4,'bomba')});
  // vía RTK
  add('grb',{x:660,y:262,n:'Grb2 (SH2) y Sos (GEF)',z:'Citoplasma',d:'Grb2 se une a una tirosina fosforilada y trae a Sos, que cambia el GDP de Ras por GTP.',g:(x,y)=>`${B.blob(x-14,y,16,11,'td',{seed:280})}${tg(x-14,y+4,'Grb2')}${B.blob(x+22,y+14,15,11,'td',{seed:282})}${tg(x+22,y+18,'Sos')}`});
  add('ras',{x:760,y:yy(760)+30,n:'Ras-GTP',z:'Membrana (cara citosólica)',d:'GTPasa monomérica anclada a la membrana: activa con GTP.',g:(x,y)=>`<path class="b-anchor" d="M${x} ${y-12}l-3-4 3-4"/>${B.blob(x,y,18,12,'td',{seed:284})}${tg(x,y+4,'Ras')}`});
  add('mapk',{x:800,y:300,n:'Raf → MEK → ERK',z:'Citoplasma',d:'Módulo de MAP cinasa: cada cinasa fosforila y activa a la siguiente.',g:(x,y)=>[['Raf',-34,-34],['MEK',-6,4],['ERK',18,42]].map(([l,a,b],i)=>B.blob(x+a,y+b,19,11,'td',{seed:286+i})+tg(x+a,y+b+4,l)).join('')});
  add('rgap',{x:690,y:352,n:'Ras-GAP',z:'Citoplasma',d:'Acelera la hidrólisis del GTP de Ras: la apaga.',g:(x,y)=>B.blob(x,y,26,12,'of',{seed:290})+tg(x,y+4,'Ras-GAP')});
  add('akt',{x:616,y:330,n:'PI3K → PIP₃ → Akt',z:'Citoplasma',d:'Otra vía del mismo receptor: Akt promueve supervivencia (fosforila a Bad), crecimiento (mTOR) y captación de glucosa (GLUT4). PTEN la apaga.',g:(x,y)=>B.blob(x,y,20,12,'td',{seed:292})+tg(x,y+4,'Akt')});
  // receptores intracelulares
  add('nr',{x:862,y:236,n:'Receptor nuclear con Hsp90',z:'Citoplasma',d:'Espera en el citosol unido a la chaperona Hsp90; al unir la hormona se libera y entra al núcleo.',g:(x,y)=>`${B.blob(x+18,y+12,11,8,'mu',{seed:294,f:false})}${B.blob(x+26,y-2,11,8,'mu',{seed:295,f:false})}${B.blob(x,y,18,13,'rc',{seed:296})}${tg(x,y-18,'receptor + Hsp90','lod')}`});
  add('gc',{x:900,y:330,n:'Guanilil ciclasa',z:'Citoplasma',d:'Receptor intracelular del NO (no es un receptor nuclear): produce GMPc.',g:(x,y)=>B.blob(x,y,22,13,'td',{seed:298})+tg(x,y+4,'GC')});
  add('pkg',{x:900,y:400,n:'GMPc → PKG',z:'Citoplasma',d:'El GMPc activa a la PKG, baja el Ca²⁺ y el músculo liso se relaja (en una célula muscular lisa).',g:(x,y)=>B.blob(x,y,22,12,'rs',{seed:300})+tg(x,y+4,'PKG')+B.mol('gmpc',x-34,y-16,1)});
  // núcleo
  add('creb',{x:610,y:586,n:'CREB sobre CRE',z:'Núcleo',d:'La PKA fosforila al factor de transcripción CREB, que se une a CRE y enciende genes (respuesta lenta).',g:(x,y)=>B.blob(x,y,20,11,'of',{seed:302})+B.phos(x+18,y-10,4.6)+tg(x,y+4,'CREB')});
  add('erkn',{x:740,y:586,n:'ERK en el núcleo',z:'Núcleo',d:'Fosforila reguladores de genes que favorecen la proliferación y la diferenciación.',g:(x,y)=>B.blob(x,y,18,11,'td',{seed:304})+tg(x,y+4,'ERK')});
  add('hre',{x:880,y:586,n:'Receptor nuclear sobre HRE',z:'Núcleo',d:'Se une a los elementos de respuesta a la hormona y recluta coactivadores: transcripción de genes diana (horas).',g:(x,y)=>B.blob(x,y,18,12,'rc',{seed:306})+B.mol('steroid',x,y,.6)+tg(x,y-17,'HRE','lod')});
  add('mrna',{x:700,y:470,n:'ARNm → proteínas nuevas',z:'Núcleo → citoplasma',d:'Las respuestas lentas requieren transcribir genes y traducir proteínas nuevas.',g:(x,y)=>B.mrna(x-30,y+20,66)+tg(x,y+6,'ARNm','lod')});
  add('ions',{x:110,y:250,n:'Iones',z:'Citoplasma',d:'Al abrirse el canal entran iones y cambia el potencial de membrana: respuesta en milisegundos a segundos.',g:(x,y)=>[[-10,-26],[8,-12],[-6,4],[10,18]].map(([a,b])=>B.mol('ion',x+a,y+b,1.2)).join('')});
  return E;
}
const ROUTES={
 canal:{n:'Canal iónico',steps:[['Señal','ach','La acetilcolina llega a su receptor.'],['Receptor','ch','El receptor es un canal: al unir la señal se abre.'],['Respuesta','ions','Pasan iones y cambia el potencial de membrana.']]},
 ampc:{n:'Gs → AMPc',steps:[['Señal','adr','La adrenalina no cruza la membrana: busca su receptor.'],['Receptor','gsr','El GPCR cambia de forma y actúa como GEF.'],['Transducción','gsa','La α cambia GDP por GTP y se separa de βγ.'],['Transducción','ac','La adenilil ciclasa convierte ATP en AMPc.'],['Amplificación','camp','El AMPc sube unas veinte veces en segundos.'],['Amplificación','pka','El AMPc libera las subunidades C de la PKA.'],['Respuesta','glu','Rápida: la PKA fosforila enzimas del glucógeno.'],['Respuesta','creb','Lenta: la PKA fosforila a CREB, que enciende genes.'],['Terminación','pde','La fosfodiesterasa degrada el AMPc a AMP.']]},
 ca:{n:'Gq → Ca²⁺',steps:[['Señal','sq','La señal llega a su GPCR.'],['Receptor','gqr','El receptor activa una Gq.'],['Transducción','gqa','Gαq-GTP activa a la fosfolipasa C-β.'],['Transducción','plc','La PLC-β corta el PIP₂ en IP₃ y DAG.'],['Transducción','ip3','El IP₃ difunde por el citosol.'],['Transducción','erch','Abre los canales de Ca²⁺ del retículo.'],['Amplificación','ca','El Ca²⁺ citosólico sube rápido.'],['Respuesta','cam','El Ca²⁺ se une a la calmodulina…'],['Respuesta','camk','…que activa a las CaM-cinasas.'],['Respuesta','pkc','DAG + Ca²⁺ activan a la PKC.'],['Terminación','pump','Las bombas regresan el Ca²⁺ al retículo.']]},
 rtk:{n:'RTK → Ras → ERK',steps:[['Señal','gf','El factor de crecimiento une dos receptores.'],['Receptor','rtk','Dímero: autofosforilación cruzada de tirosinas.'],['Transducción','grb','Grb2 se ancla por su SH2 y trae a Sos (GEF).'],['Transducción','ras','Sos cambia el GDP de Ras por GTP.'],['Amplificación','mapk','Raf → MEK → ERK: cada cinasa activa a la siguiente.'],['Respuesta','erkn','ERK entra al núcleo: proliferación y diferenciación.'],['Respuesta','akt','Otra rama: PI3K → PIP₃ → Akt (supervivencia, crecimiento, GLUT4).'],['Terminación','rgap','La Ras-GAP acelera la hidrólisis del GTP de Ras.']]},
 nuc:{n:'Receptor nuclear',steps:[['Señal','est','La hormona esteroidea cruza la membrana.'],['Receptor','nr','Se une a su receptor, que estaba con Hsp90 en el citosol.'],['Transducción','hre','El receptor entra al núcleo y se une al HRE.'],['Respuesta','mrna','Transcripción de genes diana: respuesta lenta (horas).']]},
 no:{n:'Óxido nítrico',steps:[['Señal','no','El NO, un gas, cruza la membrana.'],['Receptor','gc','Se une a la guanilil ciclasa, que produce GMPc.'],['Respuesta','pkg','El GMPc activa a la PKG: baja el Ca²⁺ y el músculo liso se relaja.']]}};
const STG=['Señal','Receptor','Transducción','Amplificación','Respuesta','Terminación'];
// recorrido: la cámara se acerca sin cambiar la orientación isométrica
const TOUR=[['Célula completa',null,'Una célula animal cortada, vista desde arriba en tres cuartos: en el borde, la membrana plasmática con sus receptores; dentro, el citoplasma, el retículo endoplásmico, las mitocondrias y el núcleo (también cortado).'],
 ['Membrana',['ch','gsr','ac','gqr','adr','sq','ach'],'La membrana plasmática en el borde del corte: la bicapa (cabezas polares y colas) con proteínas transmembrana. Las señales hidrosolubles se quedan afuera y se unen a receptores de superficie.'],
 ['Receptor',['gsr','adr','gsa'],'Un receptor acoplado a proteína G: siete hélices que cruzan la membrana. Por fuera une la adrenalina; por dentro activa a la proteína G.'],
 ['Moléculas',['gsa','ac','camp','pka','pde'],'La transducción en la cara citosólica: Gαs-GTP, la adenilil ciclasa, el AMPc que se multiplica y la PKA que libera sus subunidades C.'],
 ['Mecanismo','ampc','Sigue la vía completa paso a paso: señal → receptor → proteína G → enzima → segundo mensajero → cinasa → respuesta → terminación.'],
 ['Núcleo y respuesta',['creb','erkn','hre','mrna'],'Las respuestas lentas ocurren en el núcleo: CREB, ERK y los receptores nucleares actúan sobre el ADN y se transcribe ARNm.']];
function cellSVG(E){
  const B=B_();
  // contorno de la membrana: lado izquierdo, borde superior ondulado y lado derecho
  const poly=[];for(let y=680;y>=240;y-=10)poly.push([14,y]);for(let k=0;k<=10;k++){const u=k/10;poly.push([(1-u)*(1-u)*14+2*u*(1-u)*14+u*u*100,(1-u)*(1-u)*240+2*u*(1-u)*my(100)+u*u*my(100)])}
  for(let x=110;x<=890;x+=10)poly.push([x,my(x)]);for(let k=0;k<=10;k++){const u=k/10;poly.push([(1-u)*(1-u)*900+2*u*(1-u)*986+u*u*986,(1-u)*(1-u)*my(900)+2*u*(1-u)*my(900)+u*u*240])}for(let y=250;y<=680;y+=10)poly.push([986,y]);
  const L=[0];for(let i=1;i<poly.length;i++)L.push(L[i-1]+Math.hypot(poly[i][0]-poly[i-1][0],poly[i][1]-poly[i-1][1]));
  const at=t=>{const s=t*L[L.length-1];let j=0;while(j<L.length-2&&L[j+1]<s)j++;const u=(s-L[j])/((L[j+1]-L[j])||1);return [poly[j][0]+(poly[j+1][0]-poly[j][0])*u,poly[j][1]+(poly[j+1][1]-poly[j][1])*u]};
  const mem=B.sample(at,0,1,8.4);
  const gaps=[[110,22],[236,30],[336,28],[456,30],[690,24]];
  const skip=(x,y)=>y<200&&gaps.some(([gx,w])=>Math.abs(x-gx)<w);
  const m=`M${poly.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join('L')}`;
  let rnd=11;const r=()=>{rnd=(rnd*16807)%2147483647;return rnd/2147483647};
  let chrom='';for(let i=0;i<120;i++){const a=Math.PI+r()*Math.PI,rr=Math.sqrt(r());const x=740+222*rr*Math.cos(a),y=560+114*rr*Math.sin(a);if(y<452||y>660)continue;chrom+=`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(1.2+r()*2.6).toFixed(1)}"/>`}
  const env=k=>B.sample(t=>{const a=Math.PI*(.6+t*1.8);return [740+k[0]*Math.cos(a),560+k[1]*Math.sin(a)]},0,1,6.2);
  const pore=(x,y)=>{const a=Math.atan2((y-560)/124,(x-740)/234);const d=((a*180/Math.PI)+360)%360;return [212,246,282,318,346].some(p=>Math.abs(d-p)<2.2)};
  const nenv=B.bilayer(env([238,128]),{t:3.4,r:1.8,tails:false,skip:pore,cls:'nenv'})+B.bilayer(env([226,116]),{t:3.4,r:1.8,tails:false,skip:pore,cls:'nenv'});
  const er=[0,1,2].map(i=>{const d=`M${44+i*6} 690 V${512+i*22} Q${44+i*6} ${492+i*22} ${76+i*6} ${492+i*22} H${300-i*28} Q${330-i*28} ${492+i*22} ${330-i*28} ${522+i*22} V690`;return `<path class="erl" d="${d}"/><path class="erm" d="${d}"/>`}).join('');
  let ribo='';for(let x=86;x<290;x+=11)ribo+=`<circle class="ribo" cx="${x}" cy="${487+((x*7)%3)}" r="2.3"/>`;
  let mt='';for(let i=0;i<7;i++){const x1=40+r()*900,y1=200+r()*120,x2=x1+(r()-.5)*260,y2=y1+120+r()*160;mt+=`<path class="mt" d="M${x1.toFixed(0)} ${y1.toFixed(0)} Q${((x1+x2)/2+40).toFixed(0)} ${((y1+y2)/2).toFixed(0)} ${x2.toFixed(0)} ${y2.toFixed(0)}"/>`}
  const mito=(x,y,a)=>`<g class="mito" transform="rotate(${a} ${x} ${y})"><rect class="mo" x="${x-36}" y="${y-15}" width="72" height="30" rx="15"/><path class="mi" d="M${x-26} ${y+9}c4-14 8-14 9 0s6 14 9 0 6-14 9 0 6 14 9 0 6-14 9 0"/></g>`;
  let els='';Object.entries(E).forEach(([id,e])=>{els+=`<g class="ce" data-id="${id}" tabindex="0" role="button" aria-label="${esc(e.n)}">${e.g(e.x,e.y)}</g>`});
  return `<svg viewBox="0 0 1000 680" role="img" aria-label="Célula completa con sus vías de señalización">
   <rect class="exo" x="-1000" y="-1000" width="3000" height="3000"/><path class="cyt" d="${m}Z"/>
   ${mt}${mito(206,474,-18)}${mito(952,430,-72)}${er}${ribo}
   <ellipse class="nucf" cx="740" cy="560" rx="232" ry="122"/><g class="chr">${chrom}</g><circle class="nl" cx="800" cy="520" r="20"/>${nenv}
   ${B.dna(540,960,606,{a:4.5,per:18})}
   ${B.bilayer(mem,{t:12,r:3.1,skip})}
   <g class="zl">${tg(40,26,'EXTERIOR','z')}${tg(60,214,'MEMBRANA PLASMÁTICA','z')}${tg(46,244,'CITOPLASMA','z')}${tg(60,636,'RETÍCULO ENDOPLÁSMICO','z')}${tg(940,520,'NÚCLEO','z')}</g>
   <path class="route" pathLength="1" d=""/>${els}<circle class="sigp" r="7" cx="-50" cy="-50" fill="url(#bg-glow)"/><circle class="sigc" r="3.2" cx="-50" cy="-50"/></svg>`;
}
function cellFig(n){
  const body=`<div class="ex-ctl"><button type="button" class="ex-tab on" data-md="exp">Explorar la célula</button><button type="button" class="ex-tab" data-md="route">Seguir una ruta</button></div>
   <div class="ce-routes ex-ctl" hidden>${Object.entries(ROUTES).map(([k,r],i)=>`<button type="button" class="ex-tab ce-r${i===1?' on':''}" data-r="${k}">${r.n}</button>`).join('')}<span class="sep"></span><button type="button" data-a="prev">Anterior</button><button type="button" class="act" data-a="play">Reproducir</button><button type="button" data-a="next">Siguiente</button><button type="button" data-a="reset">Reiniciar</button></div>
   <div class="ce-tour" role="group" aria-label="Recorrido guiado por escalas"><span class="lbl">Recorrido</span>${TOUR.map((t,i)=>`<button type="button" data-tour="${i}"><span>${i+1}</span>${t[0]}</button>`).join('')}</div>
   <div class="ce-row"><div class="ce-pw"><div class="ce-stage"><div class="ex-plate ce-plate" tabindex="0" role="group" aria-label="Célula explorable. Más y menos para acercar o alejar, flechas para desplazarte, cero para ver la célula completa."></div><aside class="ce-side ce-card" aria-live="polite"><button type="button" class="ce-x" aria-label="Cerrar la información">×</button><div class="ce-body"><h4>Toca cualquier estructura</h4><p>Verás aquí mismo su nombre, qué hace, dónde actúa y qué ocurre después.</p></div></aside></div><div class="ce-zoom"><button type="button" data-zm="-1" aria-label="Alejar">−</button><span class="ce-sc" aria-live="polite"></span><button type="button" data-zm="1" aria-label="Acercar">+</button><button type="button" data-zm="0" class="ce-fit">Célula completa</button><span class="ce-tip">Toca una estructura · pellizca o usa + y − para acercarte</span></div></div>
   </div>`;
  return frame('cel',n,'La célula completa',body,'Resumen visual del capítulo en un modelo tridimensional: cada vía se coloca en su sitio dentro de la misma célula, de la señal externa a la respuesta. La cámara se mantiene en tres cuartos; al acercarte conservas la orientación. Esquema propio, simplificado y no a escala; la vía del NO ocurre en el músculo liso vecino al endotelio.',['A','L']);
}
function wireCell(fig){
  const B=B_();const E=cellDefs();const plate=fig.querySelector('.ce-plate');
  const C3=X.cell3D.build(E,{el:(id,e)=>`<g class="ce${X.cell3D.RIM.has(id)?' mem':''}" data-id="${id}" tabindex="0" role="button" aria-label="${esc(e.n)}"><g class="lift"><g${e.rot?` transform="rotate(${e.rot.toFixed(1)} ${e.x.toFixed(1)} ${e.y.toFixed(1)})"`:''}>${e.g(e.x,e.y)}</g></g></g>`});
  plate.insertAdjacentHTML('afterbegin',C3.svg);const svg=plate.querySelector('svg'),side=fig.querySelector('.ce-body'),card=fig.querySelector('.ce-card'),stage=fig.querySelector('.ce-stage'),route=svg.querySelector('.route'),sigp=svg.querySelector('.sigp'),sigc=svg.querySelector('.sigc'),scl=fig.querySelector('.ce-sc');
  svg.querySelectorAll('.ce').forEach(g=>{try{const b=g.getBBox();const r=document.createElementNS('http://www.w3.org/2000/svg','rect');r.setAttribute('x',b.x-6);r.setAttribute('y',b.y-6);r.setAttribute('width',b.width+12);r.setAttribute('height',b.height+12);r.setAttribute('class','hit');g.insertBefore(r,g.firstChild)}catch(e){}});
  const inRoutes=id=>Object.entries(ROUTES).filter(([k,r])=>r.steps.some(s=>s[1]===id));
  // ---------- cámara (viewBox) ----------
  const VW=1000,VH=700,ZMAX=6;let cam={x:500,y:350,w:1000},tgt={...cam},raf=0,last=0,visible=true;
  const clampCam=c=>{c.w=Math.max(VW/ZMAX,Math.min(VW,c.w));const h=c.w*VH/VW;c.x=Math.max(c.w/2,Math.min(VW-c.w/2,c.x));c.y=Math.max(h/2,Math.min(VH-h/2,c.y));return c};
  const scaleName=z=>z<1.4?'Célula':z<2.6?'Membrana y citoplasma':z<4?'Receptores y proteínas':'Complejo molecular';
  const apply=()=>{const h=cam.w*VH/VW;svg.setAttribute('viewBox',`${(cam.x-cam.w/2).toFixed(2)} ${(cam.y-h/2).toFixed(2)} ${cam.w.toFixed(2)} ${h.toFixed(2)}`);const z=VW/cam.w;svg.classList.toggle('z2',z>=1.35);svg.classList.toggle('z3',z>=2.4);plate.classList.toggle('zin',z>1.03);scl.textContent=`${scaleName(z)} · ×${z.toFixed(1)}`;placeCard()};
  let cardFor=null;
  const placeCard=()=>{if(!card||innerWidth<700){card.style.left=card.style.top='';return}const r=plate.getBoundingClientRect();const cw=card.offsetWidth,ch=card.offsetHeight;
    if(!cardFor){card.style.left='14px';card.style.top='14px';card.classList.remove('l','r');return}
    const e=E[cardFor];const h=cam.w*VH/VW;const px=(e.x-(cam.x-cam.w/2))/cam.w*r.width,py=(e.y-(cam.y-h/2))/h*r.height;
    const right=px<r.width*.56;let x=right?px+34:px-34-cw;x=Math.max(10,Math.min(r.width-cw-10,x));const y=Math.max(10,Math.min(r.height-ch-10,py-ch/2));
    card.style.left=x.toFixed(0)+'px';card.style.top=y.toFixed(0)+'px';card.classList.toggle('r',right);card.classList.toggle('l',!right);card.style.setProperty('--ay',Math.max(16,Math.min(ch-16,py-y)).toFixed(0)+'px')};
  const showCard=(id,html)=>{cardFor=id;side.innerHTML=html;card.hidden=false;card.classList.add('open');requestAnimationFrame(placeCard)};
  const tick=now=>{const dt=last?Math.min((now-last)/1000,1/30):1/60;last=now;const k=X.RM()?1:1-Math.exp(-dt/.22);let busy=false;
    ['x','y','w'].forEach(p=>{cam[p]+=(tgt[p]-cam[p])*k;if(Math.abs(tgt[p]-cam[p])>.05)busy=true;else cam[p]=tgt[p]});apply();
    if(sig.on){sig.t=Math.min(1,sig.t+dt/(X.RM()?.01:1.1));const L=route.getTotalLength();const p0=sig.from*L,p1=L;const pt=route.getPointAtLength(p0+(p1-p0)*B.ease(sig.t));sigp.setAttribute('cx',pt.x);sigp.setAttribute('cy',pt.y);sigc.setAttribute('cx',pt.x);sigc.setAttribute('cy',pt.y);if(sig.t<1)busy=true;else sig.on=false}
    raf=busy&&visible?requestAnimationFrame(tick):0};
  const kick=()=>{if(!raf&&visible){last=0;raf=requestAnimationFrame(tick)}};
  const zoomTo=(w,cx,cy)=>{tgt=clampCam({x:cx??tgt.x,y:cy??tgt.y,w});kick()};
  const toSvg=(cx,cy,c=cam)=>{const r=svg.getBoundingClientRect();const h=c.w*VH/VW;return [c.x-c.w/2+(cx-r.left)/r.width*c.w,c.y-h/2+(cy-r.top)/r.height*h]};
  const zoomAt=(f,cx,cy)=>{const p=toSvg(cx,cy,tgt);const w=Math.max(VW/ZMAX,Math.min(VW,tgt.w/f));const k=w/tgt.w;tgt=clampCam({x:p[0]+(tgt.x-p[0])*k,y:p[1]+(tgt.y-p[1])*k,w});kick()};
  const fitIds=ids=>{const P=ids.map(i=>E[i]);const xs=P.map(p=>p.x),ys=P.map(p=>p.y);const x0=Math.min(...xs)-60,x1=Math.max(...xs)+60,y0=Math.min(...ys)-55,y1=Math.max(...ys)+55;zoomTo(Math.max(x1-x0,(y1-y0)*VW/VH),(x0+x1)/2,(y0+y1)/2)};
  fig.querySelectorAll('[data-zm]').forEach(b=>b.onclick=()=>{const v=+b.dataset.zm;if(!v)zoomTo(VW,500,350);else zoomTo(tgt.w/(v>0?1.6:1/1.6))});
  plate.addEventListener('keydown',e=>{if(e.target!==plate)return;const st=tgt.w*.12;const m={ArrowLeft:[-st,0],ArrowRight:[st,0],ArrowUp:[0,-st],ArrowDown:[0,st]}[e.key];
    if(m){e.preventDefault();tgt=clampCam({...tgt,x:tgt.x+m[0],y:tgt.y+m[1]});kick()}else if(e.key==='+'||e.key==='='){e.preventDefault();zoomTo(tgt.w/1.6)}else if(e.key==='-'){e.preventDefault();zoomTo(tgt.w*1.6)}else if(e.key==='0'){e.preventDefault();zoomTo(VW,500,350)}});
  plate.addEventListener('wheel',e=>{if(!e.ctrlKey&&!e.metaKey)return;e.preventDefault();zoomAt(Math.exp(-e.deltaY*.006),e.clientX,e.clientY)},{passive:false});
  plate.addEventListener('dblclick',e=>{if(e.target.closest('button'))return;e.preventDefault();zoomAt(1.8,e.clientX,e.clientY)});
  // arrastre con un dedo (cuando hay acercamiento) y pellizco con dos
  const pts=new Map();let pan=null,pin=null,moved=false;
  plate.addEventListener('pointerdown',e=>{pts.set(e.pointerId,[e.clientX,e.clientY]);moved=false;
    if(pts.size===1)pan={x:e.clientX,y:e.clientY,c:{...tgt}};if(pts.size===2){const [a,b]=[...pts.values()];pin={d:Math.hypot(a[0]-b[0],a[1]-b[1]),w:tgt.w,m:[(a[0]+b[0])/2,(a[1]+b[1])/2]};pan=null}});
  plate.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId))return;pts.set(e.pointerId,[e.clientX,e.clientY]);
    if(pin&&pts.size===2){const [a,b]=[...pts.values()];const d=Math.hypot(a[0]-b[0],a[1]-b[1]);const w=Math.max(VW/ZMAX,Math.min(VW,pin.w*pin.d/d));const p=toSvg(pin.m[0],pin.m[1],tgt);const k=w/tgt.w;tgt=clampCam({x:p[0]+(tgt.x-p[0])*k,y:p[1]+(tgt.y-p[1])*k,w});moved=true;kick();return}
    if(pan&&tgt.w<VW-1){const dx=e.clientX-pan.x,dy=e.clientY-pan.y;if(!moved&&Math.hypot(dx,dy)<5)return;moved=true;try{plate.setPointerCapture(e.pointerId)}catch(_){}const r=svg.getBoundingClientRect();tgt=clampCam({...pan.c,x:pan.c.x-dx/r.width*pan.c.w,y:pan.c.y-dy/r.height*pan.c.w*VH/VW,w:pan.c.w});cam={...tgt};apply()}});
  const up=e=>{pts.delete(e.pointerId);if(pts.size<2)pin=null;if(!pts.size)pan=null};
  plate.addEventListener('pointerup',up);plate.addEventListener('pointercancel',up);
  plate.addEventListener('click',e=>{if(moved){e.stopPropagation();e.preventDefault();moved=false}},true);
  // ---------- selección y rutas ----------
  let mode='exp',rk='ampc',si=-1,timer=null;const sig={on:false,t:0,from:0};
  const after=id=>{const R=inRoutes(id);if(!R.length)return '';const [k,r]=R[0];const i=r.steps.findIndex(s=>s[1]===id);const nx=r.steps[i+1];
    if(r.steps[i][0]==='Terminación')return 'Apaga la señal: la vía regresa a su estado inactivo.';return nx?`${esc(nx[2])} <span class="muted">(${esc(E[nx[1]].n)})</span>`:'Es la respuesta final de esta ruta.'};
  const info=id=>{const e=E[id];const R=inRoutes(id);showCard(id,`<h4>${esc(e.n)}</h4><dl><dt>Qué hace</dt><dd>${esc(e.d)}</dd><dt>Dónde actúa</dt><dd>${esc(e.z)}</dd>${R.length?`<dt>Qué ocurre después</dt><dd>${after(id)}</dd><dt>Forma parte de</dt><dd>${R.map(([k,r])=>`<button type="button" class="lnk" data-go="${k}">${esc(r.n)}</button>`).join(' · ')}</dd>`:''}</dl>`);
    side.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{setMode('route');pickRoute(b.dataset.go);go(0)})};
  const hl=ids=>{svg.classList.toggle('hl',!!ids);svg.querySelectorAll('.ce').forEach(g=>g.classList.toggle('on',!!ids&&ids.includes(g.dataset.id)))};
  
  const drawRoute=k=>{const st=ROUTES[rk].steps.slice(0,k+1);const P=st.map(s=>E[s[1]]);if(P.length<2){route.setAttribute('d','');sigp.setAttribute('cx',-50);sigc.setAttribute('cx',-50);return}let d=`M${P[0].x} ${P[0].y}`;for(let i=1;i<P.length;i++){const a=P[i-1],b=P[i];d+=` Q${(a.x+b.x)/2+(b.y-a.y)*.15} ${(a.y+b.y)/2-(b.x-a.x)*.15} ${b.x} ${b.y}`}route.setAttribute('d',d);
    // la señal recorre el último tramo
    const L=route.getTotalLength();let Lp=0;if(P.length>2){const tmp=document.createElementNS('http://www.w3.org/2000/svg','path');let d2=`M${P[0].x} ${P[0].y}`;for(let i=1;i<P.length-1;i++){const a=P[i-1],b=P[i];d2+=` Q${(a.x+b.x)/2+(b.y-a.y)*.15} ${(a.y+b.y)/2-(b.x-a.x)*.15} ${b.x} ${b.y}`}tmp.setAttribute('d',d2);svg.appendChild(tmp);Lp=tmp.getTotalLength();tmp.remove()}
    sig.from=L?Lp/L:0;sig.t=0;sig.on=true;kick()};
  const go=k=>{const S2=ROUTES[rk].steps;si=Math.max(0,Math.min(S2.length-1,k));const s=S2[si];hl(S2.slice(0,si+1).map(x=>x[1]));svg.querySelectorAll('.ce').forEach(g=>g.classList.toggle('cur',g.dataset.id===s[1]));drawRoute(si);
    showCard(s[1],`<p class="ce-rt">${esc(ROUTES[rk].n)}</p><ol class="ce-dots" aria-label="Paso ${si+1} de ${S2.length}">${S2.map((x,i)=>`<li class="${i<si?'d':''}${i===si?' c':''}"></li>`).join('')}</ol><h4><span class="tag">${si+1}/${S2.length} · ${s[0]}</span>${esc(E[s[1]].n)}</h4><p class="stp">${esc(s[2])}</p><dl><dt>Qué hace</dt><dd>${esc(E[s[1]].d)}</dd><dt>Dónde actúa</dt><dd>${esc(E[s[1]].z)}</dd>${S2[si+1]?`<dt>Qué ocurre después</dt><dd>${esc(S2[si+1][2])}</dd>`:''}</dl>`);if(cardFor){const e=E[s[1]],w=Math.min(tgt.w,VW/1.7);zoomTo(w,e.x+(innerWidth>=700?w*.17:0),e.y)}playUI()};
  const playBtn=fig.querySelector('[data-a=play]');const playUI=()=>{playBtn.textContent=timer?'Pausa':(si>=ROUTES[rk].steps.length-1?'Repetir':'Reproducir')};
  const stop=()=>{if(timer){clearInterval(timer);timer=null}playUI()};
  const pickRoute=k=>{rk=k;fig.querySelectorAll('.ce-r').forEach(b=>b.classList.toggle('on',b.dataset.r===k));fitIds(ROUTES[k].steps.map(s=>s[1]))};
  const setMode=m=>{mode=m;stop();fig.querySelectorAll('[data-md]').forEach(b=>b.classList.toggle('on',b.dataset.md===m));fig.querySelector('.ce-routes').hidden=m!=='route';
    if(m==='exp'){hl(null);svg.querySelectorAll('.ce.cur').forEach(g=>g.classList.remove('cur'));route.setAttribute('d','');sig.on=false;sigp.setAttribute('cx',-50);sigc.setAttribute('cx',-50)}else{fitIds(ROUTES[rk].steps.map(s=>s[1]));go(0)}};
  fig.querySelectorAll('[data-md]').forEach(b=>b.onclick=()=>setMode(b.dataset.md));
  fig.querySelectorAll('.ce-r').forEach(b=>b.onclick=()=>{stop();pickRoute(b.dataset.r);go(0)});
  fig.querySelector('[data-a=prev]').onclick=()=>{stop();go(si-1)};fig.querySelector('[data-a=next]').onclick=()=>{stop();go(si+1)};
  fig.querySelector('[data-a=reset]').onclick=()=>{stop();go(0)};
  playBtn.onclick=()=>{if(timer){stop();return}if(si>=ROUTES[rk].steps.length-1)go(0);timer=setInterval(()=>{if(si>=ROUTES[rk].steps.length-1)return stop();go(si+1)},X.RM()?2200:1900);playUI()};
  const pick=id=>{if(mode==='route'){const R=inRoutes(id);if(R.length){stop();if(R[0][0]!==rk)pickRoute(R[0][0]);go(ROUTES[rk].steps.findIndex(s=>s[1]===id))}}else{hl([id]);info(id);const e=E[id];const w=VW/tgt.w<2.2?VW/2.4:tgt.w;zoomTo(w,e.x+(innerWidth>=700?w*.17:0),e.y)}};
  svg.querySelectorAll('.ce').forEach(g=>{const id=g.dataset.id;g.addEventListener('mouseenter',()=>{if(mode==='exp'&&!svg.classList.contains('hl'))g.classList.add('hov')});g.addEventListener('mouseleave',()=>g.classList.remove('hov'));
    g.addEventListener('click',()=>pick(id));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(id)}})});
  const tourBtns=[...fig.querySelectorAll('[data-tour]')];
  tourBtns.forEach(b=>b.onclick=()=>{const i=+b.dataset.tour,t=TOUR[i];tourBtns.forEach(x=>x.classList.toggle('on',x===b));
    if(t[1]==='ampc'){setMode('route');pickRoute('ampc');go(0);playBtn.onclick();return}
    if(mode!=='exp')setMode('exp');if(!t[1]){hl(null);zoomTo(VW,500,350)}else{hl(t[1]);fitIds(t[1])}
    showCard(t[1]&&t[1].length?t[1][0]:null,`<h4>${i+1}. ${t[0]}</h4><p>${t[2]}</p><p class="muted">Toca cualquier estructura para ver qué hace.</p>`)});
  fig.querySelector('.ce-x').onclick=()=>{card.classList.remove('open');cardFor=null;if(mode==='exp')hl(null)};
  addEventListener('resize',()=>placeCard());
  B.seen(fig,v=>{visible=v;if(!v)stop();else kick()});
  apply();
}
X.cellCSS=`
.ed #ex-cel .exo{fill:var(--e-exo)}.ed #ex-cel .cyt{fill:var(--e-cyt)}
.ed #ex-cel .ce .lift{transition:transform .45s cubic-bezier(.3,.7,.2,1)}.ed #ex-cel .ce.on:not(.mem) .lift,.ed #ex-cel .ce.cur:not(.mem) .lift{transform:translateY(-5px)}
.ed #ex-cel .ce-tour{display:flex;flex-wrap:wrap;align-items:center;gap:6px 6px;margin:0 0 10px}
.ed #ex-cel .ce-tour .lbl{font:500 11px var(--e-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--e-mut);margin-right:6px}
.ed #ex-cel .ce-tour button{background:none;border:1px solid var(--e-rule);border-radius:999px;padding:7px 13px 7px 8px;font:400 14.5px var(--e-body);color:var(--e-ink);cursor:pointer;min-height:38px}
.ed #ex-cel .ce-tour button span{display:inline-grid;place-items:center;width:20px;height:20px;border-radius:50%;background:var(--e-plate2);font:500 11px var(--e-mono);margin-right:7px}
.ed #ex-cel .ce-tour button.on{border-color:var(--e-td);background:var(--e-tdl)}.ed #ex-cel .ce-tour button.on span{background:var(--e-td);color:#fff}
.ed #ex-cel .ce-tour button:focus-visible{outline:2px solid var(--e-td);outline-offset:2px}
@media (max-width:640px){.ed #ex-cel .ce-tour{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;padding-bottom:2px}.ed #ex-cel .ce-tour button{white-space:nowrap;flex:none}}
.ed #ex-cel .ce-plate{position:relative;overflow:hidden;touch-action:pan-y;outline:none;user-select:none;-webkit-user-select:none}
.ed #ex-cel .ce-plate.zin{touch-action:none;cursor:grab}
.ed #ex-cel .ce-plate svg{display:block;width:100%;height:auto}
.ed #ex-cel .ce-plate:focus-visible{outline:2px solid var(--e-td);outline-offset:3px}
.ed #ex-cel .erl{fill:var(--e-rsl);stroke:color-mix(in srgb,var(--e-lh) 80%,#000);stroke-width:3.4;opacity:.9}.ed #ex-cel .erm{fill:none;stroke:var(--e-core);stroke-width:1.2}
.ed #ex-cel .ribo{fill:color-mix(in srgb,var(--e-rc) 55%,var(--e-paper))}
.ed #ex-cel .nucf{fill:var(--e-nuc)}.ed #ex-cel .chr circle{fill:var(--e-rc);opacity:.16}.ed #ex-cel .nl{fill:var(--e-rc);opacity:.22}
.ed #ex-cel .nenv .b-core{fill:color-mix(in srgb,var(--e-core) 70%,var(--e-nuc))}
.ed #ex-cel .mt{fill:none;stroke:var(--e-td);stroke-width:1.2;opacity:.13}
.ed #ex-cel .mito .mo{fill:var(--e-ofl);stroke:var(--e-of);stroke-width:1.2;opacity:.7}.ed #ex-cel .mito .mi{fill:none;stroke:var(--e-of);stroke-width:1.1;opacity:.55}
.ed #ex-cel .gly{fill:var(--e-rs);opacity:.45}
.ed #ex-cel .ce-hl{stroke:color-mix(in srgb,var(--e-rs) 70%,#000);stroke-width:3}
.ed #ex-cel .ce-l{font:600 11px var(--e-mono);fill:#141a2f;pointer-events:none}
.ed #ex-cel .ce-l.z{font:500 12px var(--e-mono);letter-spacing:.16em;fill:var(--e-mut);text-anchor:start}
.ed #ex-cel svg:not(.z2) .ce-l:not(.z){opacity:0}.ed #ex-cel svg.z2 .ce-l.lod{opacity:0}.ed #ex-cel svg.z3 .ce-l.lod{opacity:1}
.ed #ex-cel .ce-l{transition:opacity .3s}
.ed #ex-cel .ce{cursor:pointer;outline:none;transition:opacity .35s}
.ed #ex-cel svg.hl .ce:not(.on){opacity:.18}
.ed #ex-cel .ce.on>*:not(.hit),.ed #ex-cel .ce:focus-visible>*:not(.hit),.ed #ex-cel .ce.hov>*:not(.hit){filter:drop-shadow(0 0 3px var(--e-sgl)) drop-shadow(0 0 2px var(--e-sg))}
.ed #ex-cel .ce.cur>*:not(.hit){filter:drop-shadow(0 0 3px var(--e-sg)) drop-shadow(0 0 7px var(--e-sg))}
.ed #ex-cel .route{fill:none;stroke:var(--e-sg);stroke-width:2.4;stroke-dasharray:5 5;opacity:.75;pointer-events:none}
.ed #ex-cel .sigc{fill:var(--e-sg);stroke:var(--e-paper);stroke-width:1.2;pointer-events:none}.ed #ex-cel .sigp{pointer-events:none}
.ed #ex-cel .ce-stg{list-style:none;padding:0;margin:0 0 10px;display:flex;flex-wrap:wrap;gap:0}
.ed #ex-cel .ce-stg>li{font:500 11px/1 var(--e-mono)!important;letter-spacing:.12em;text-transform:uppercase;color:var(--e-mut);padding:8px 14px 8px 0!important;margin:0!important;position:relative}
.ed #ex-cel .ce-stg>li::before{display:none!important}.ed #ex-cel .ce-stg li:not(:last-child)::after{content:"→";margin-left:14px;color:var(--e-rule)}
.ed #ex-cel .ce-stg li.on{color:var(--e-ink);text-decoration:underline;text-decoration-color:var(--e-sg);text-decoration-thickness:3px;text-underline-offset:6px}
.ed #ex-cel .ce-row{display:grid;grid-template-columns:minmax(0,1fr);gap:0}
.ed #ex-cel .ce-stage{position:relative}
.ed #ex-cel .ce-card{position:absolute;z-index:3;width:min(330px,42%);max-height:calc(100% - 20px);overflow:auto;background:color-mix(in srgb,var(--e-paper) 94%,transparent);backdrop-filter:blur(6px);border:1px solid var(--e-rule);border-radius:14px;padding:16px 18px 14px;box-shadow:0 12px 34px rgba(12,18,40,.18);font-size:15px;line-height:1.5;transition:left .35s cubic-bezier(.3,.7,.2,1),top .35s cubic-bezier(.3,.7,.2,1),opacity .25s;opacity:0;pointer-events:none}
.ed #ex-cel .ce-card.open{opacity:1;pointer-events:auto}
.ed #ex-cel .ce-card::before{content:"";position:absolute;top:var(--ay,24px);width:12px;height:12px;background:inherit;border:inherit;border-width:0 0 1px 1px;transform:translateY(-50%) rotate(45deg);display:none}
.ed #ex-cel .ce-card.r::before{display:block;left:-7px}.ed #ex-cel .ce-card.l::before{display:block;right:-7px;transform:translateY(-50%) rotate(225deg)}
.ed #ex-cel .ce-card h4{font:600 19px/1.2 var(--e-disp);margin:0 24px 8px 0;color:var(--e-ink)}
.ed #ex-cel .ce-card h4 .tag{display:block;font:500 10.5px var(--e-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--e-sg);margin-bottom:4px}
.ed #ex-cel .ce-card p{margin:0 0 8px}.ed #ex-cel .ce-card .ce-rt{font:500 11px var(--e-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--e-mut);margin:0 24px 6px 0}
.ed #ex-cel .ce-x{position:absolute;right:8px;top:6px;width:32px;height:32px;border:0;background:none;font:400 22px/1 var(--e-disp);color:var(--e-mut);cursor:pointer;border-radius:50%}.ed #ex-cel .ce-x:hover{background:var(--e-plate2)}
.ed #ex-cel .ce-dots{list-style:none;display:flex;gap:5px;padding:0;margin:0 0 10px}.ed #ex-cel .ce-dots>li{width:9px;height:9px;border-radius:50%;background:var(--e-rule);margin:0!important;padding:0!important}.ed #ex-cel .ce-dots>li::before{display:none!important}.ed #ex-cel .ce-dots li.d{background:var(--e-sg);opacity:.55}.ed #ex-cel .ce-dots li.c{background:var(--e-sg);box-shadow:0 0 0 3px var(--e-sgl)}
.ed #ex-cel svg.hl .ce:not(.on) .ce-l{display:none}
@media (max-width:699px){.ed #ex-cel .ce-card{position:static;width:auto;max-height:none;opacity:1;pointer-events:auto;border-radius:0;box-shadow:none;border-width:1px 0 0;background:var(--e-plate)}.ed #ex-cel .ce-card::before{display:none!important}.ed #ex-cel .ce-x{display:none}}
.ed #ex-cel .ce-side{min-height:0}.ed #ex-cel .ce-side dl{display:block;margin:0}.ed #ex-cel .ce-side dl dt{font:500 10px/1.4 var(--e-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--e-mut);margin:10px 0 2px!important}.ed #ex-cel .ce-side dl dt{margin:0!important}.ed #ex-cel .ce-side dl dd{margin:0!important}
@media (max-width:640px){.ed #ex-cel .ce-side dl{grid-template-columns:1fr;gap:2px}.ed #ex-cel .ce-side dl dt{margin-top:10px!important}}
.ed #ex-cel .ce-side dt{margin-top:14px}
.ed #ex-cel .ce-side .muted{color:var(--e-mut)}

.ed #ex-cel .ce-routes[hidden]{display:none}
.ed #ex-cel svg>:not(.ce){pointer-events:none}.ed #ex-cel .hit{fill:transparent}
.ed #ex-cel .lnk{background:none;border:0;padding:4px 0;color:var(--e-td);font:inherit;cursor:pointer;text-decoration:underline}
.ed #ex-cel .stp .tag{font:500 10.5px var(--e-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--e-sg);margin-right:6px}
.ed #ex-cel .ce-zoom{display:flex;align-items:center;flex-wrap:wrap;gap:2px;padding:6px 4px;border-top:1px solid var(--e-rule);background:var(--e-plate)}.ed #ex-cel .ce-tip{font:italic 400 14px var(--e-body);color:var(--e-mut);margin-left:auto;padding:0 10px}
.ed #ex-cel .ce-zoom button{min-width:38px;height:38px;border:0;background:none;border-radius:999px;font:400 22px/1 var(--e-disp);color:var(--e-ink);cursor:pointer}
.ed #ex-cel .ce-zoom .ce-fit{font:500 10.5px var(--e-mono);letter-spacing:.08em;text-transform:uppercase;padding:0 12px;color:var(--e-td)}
.ed #ex-cel .ce-zoom button:hover{background:var(--e-plate2)}.ed #ex-cel .ce-zoom button:focus-visible{outline:2px solid var(--e-td)}
.ed #ex-cel .ce-sc{font:500 10.5px var(--e-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--e-mut);padding:0 6px;white-space:nowrap}
@media (max-width:640px){.ed #ex-cel .ce-sc,.ed #ex-cel .ce-tip{display:none}}
`;
// ======================= RESUMEN · EN UNA VISTA =======================
function summary(){
  const St=[['sg','Señal','Hidrosoluble o grande → receptor de superficie. Pequeña e hidrofóbica, o gas → receptor intracelular.'],
   ['rc','Receptor','Canal iónico, acoplado a proteína G, acoplado a enzima (RTK) o intracelular. Al unir la señal cambia de forma.'],
   ['td','Transducción','Interruptores: fosforilación (cinasa/fosfatasa) y unión de GTP (el GEF enciende, la GAP apaga). Segundos mensajeros: AMPc, Ca²⁺, IP₃, DAG, GMPc.'],
   ['td','Amplificación','Cada componente activo activa a muchas moléculas del siguiente.'],
   ['rc','Integración','Las vías forman una red: Ca²⁺ y AMPc regulan las mismas proteínas; andamiajes e integradores dirigen la señal.'],
   ['rs','Respuesta','Rápida: modifica proteínas que ya existen. Lenta: cambia la expresión génica (CREB, ERK, receptores nucleares).'],
   ['of','Terminación','GTPasas, fosfodiesterasas, fosfatasas, bombas de Ca²⁺ y desensibilización (GRK + arrestina).']];
  return `<section class="ed-sum ed-wide" data-blk="keep" aria-labelledby="ed-sum-h"><div class="ex-n">Síntesis</div><h2 id="ed-sum-h">Señalización celular en una vista</h2>
   <ol>${St.map(([c,n,t],i)=>`<li data-c="${c}"><span class="nn">0${i+1}</span><b>${n}</b><p>${t}</p></li>`).join('')}</ol></section>`;
}
X.sumCSS=`
.ed .ed-sum{padding:0 clamp(18px,3vw,40px);margin:10px 0 56px}
.ed .ed-sum h2{font:400 clamp(30px,3.6vw,44px)/1.05 var(--e-disp);font-style:italic;margin:8px 0 24px;color:var(--e-ink);border-bottom:1px solid var(--e-ink);padding-bottom:16px}
.ed .ed-sum ol{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:0;counter-reset:none}
.ed .ed-sum li{padding:0 14px 0 0;margin:0;position:relative;border-top:4px solid var(--c)}
.ed .ed-sum li::before{display:none}
.ed .ed-sum li[data-c=sg]{--c:var(--e-sg)}.ed .ed-sum li[data-c=rc]{--c:var(--e-rc)}.ed .ed-sum li[data-c=td]{--c:var(--e-td)}.ed .ed-sum li[data-c=rs]{--c:var(--e-rs)}.ed .ed-sum li[data-c=of]{--c:var(--e-of)}
.ed .ed-sum .nn{display:block;font:500 11px var(--e-mono);color:var(--e-mut);margin:10px 0 6px;letter-spacing:.1em}
.ed .ed-sum b{display:block;font:600 19px/1.15 var(--e-disp);color:var(--e-ink);margin-bottom:6px}
.ed .ed-sum p{font-size:14.5px!important;line-height:1.5!important;color:var(--e-mut)!important;margin:0}
.ed .ed-sum li:not(:last-child)::after{content:"→";position:absolute;right:2px;top:8px;font:400 14px var(--e-mono);color:var(--e-mu)}
@media (max-width:1000px){.ed .ed-sum ol{grid-template-columns:repeat(4,minmax(0,1fr));row-gap:22px}}
@media (max-width:560px){.ed .ed-sum ol{grid-template-columns:1fr}.ed .ed-sum li{border-top:0;border-left:4px solid var(--c);padding:2px 0 14px 16px}.ed .ed-sum .nn{margin-top:0}.ed .ed-sum li::after{display:none}}
.ed .ed-refs{padding:0 clamp(18px,3vw,40px);margin:0 0 30px;border-top:1px solid var(--e-ink);padding-top:16px}
.ed .ed-refs h3{font:500 11.5px var(--e-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--e-mut);margin:0 0 12px}
.ed .ed-refs ol{list-style:none;padding:0;margin:0}.ed .ed-refs li{font-size:15.5px;line-height:1.6;padding-left:38px;text-indent:-38px;margin:0 0 10px}
.ed .ed-refs li span{font:500 12px var(--e-mono);color:var(--e-td);display:inline-block;width:38px;text-indent:0}
.ed .ed-refs p{font-size:14px;color:var(--e-mut);font-style:italic}
.ed .ed-refs h3.vref{margin-top:22px}.ed .ed-refs ol.vref li span{width:38px}
`;
function refs(){return `<section class="ed-refs ed-wide" id="ed-refs" data-blk="keep"><h3>Referencias</h3><ol><li id="ed-ref-A"><span>[1]</span>${REF.A.apa} Capítulo 15, «Cell Signaling».</li><li id="ed-ref-L"><span>[2]</span>${REF.L.apa}</li></ol><p>El texto de este capítulo sigue al Alberts [1], con apoyo del Lodish [2] para las vías de los receptores. Las figuras interactivas son esquemas propios, simplificados y no a escala, construidos a partir del texto de cada sección.</p>
   <h3 class="vref">Referencias visuales</h3><p>Consultadas sólo para dibujar la forma y la disposición de las moléculas; no son fuente del texto.</p><ol class="vref"><li><span>[V1]</span>Rasmussen, S. G. F., et al. (2011). Crystal structure of the β<sub>2</sub> adrenergic receptor–Gs protein complex. <i>Nature, 477</i>, 549–555. Estructura PDB 3SN6 (receptor de 7 hélices con la proteína G).</li><li><span>[V2]</span>Unwin, N. (2005). Refined structure of the nicotinic acetylcholine receptor at 4 Å resolution. <i>Journal of Molecular Biology, 346</i>(4), 967–989. Estructura PDB 2BG9 (canal iónico activado por ligando).</li><li><span>[V3]</span>Zhang, X., Gureasko, J., Shen, K., Cole, P. A., &amp; Kuriyan, J. (2006). An allosteric mechanism for activation of the kinase domain of epidermal growth factor receptor. <i>Cell, 125</i>(6), 1137–1149 (dímero de dominios cinasa de un RTK).</li><li><span>[V4]</span>Clark, M. A., Douglas, M., &amp; Choi, J. (2018). <i>Biology 2e</i>, cap. 9, «Cell Communication». OpenStax.</li></ol>
   <p>Proyección isométrica de la bicapa y principios de movimiento adaptados de <i>Anatomy</i> (wheresryan22/anatomy, licencia MIT).</p></section>`}
Object.assign(X,{amp,wireAmp,term,wireTerm,cellFig,wireCell,summary,refs,cellDefs});
})();
