(function(){
'use strict';
const X=window.__SX,{S,esc,frame,onView,RM,REF}=X;
// ======================= FIG. 6 · AMPLIFICACIÓN =======================
function amp(n){
  const tiers=[['1 hormona',1,'sg'],['1 receptor',1,'rc'],['varias proteínas G',3,'td'],['cada una activa una adenilil ciclasa',3,'td'],['muchas moléculas de AMPc',12,'td'],['varias PKA activas',4,'of'],['muchas enzimas fosforiladas',16,'rs']];
  let g='',lines='';const pts=[];
  tiers.forEach(([lab,k,c],i)=>{const y=34+i*52,w=Math.min(400,k*26),x0=380-w/2+13;const row=[];for(let j=0;j<k;j++){const x=k===1?380:x0+j*(w-26)/(k-1);row.push([x,y])}pts.push(row);
    g+=`<g class="tier" style="--d:${(i*.55).toFixed(2)}s">${S.t(20,y+4,lab,'b','start')}${row.map(([x,y])=>i===0?S.lig(x,y,9):i===1?`<rect class="f-rcl st-rc" x="${x-7}" y="${y-12}" width="14" height="24" rx="4"/>`:i===4?S.lig(x,y,5.5,'td'):i===6?`<g>${S.P(x,y,6.5)}</g>`:`<circle class="f-${c}l st-${c}" cx="${x}" cy="${y}" r="${i===5?9:8}"/>`).join('')}</g>`});
  for(let i=1;i<pts.length;i++){const prev=pts[i-1],cur=pts[i];cur.forEach(([x,y],j)=>{const p=prev[Math.min(prev.length-1,Math.floor(j*prev.length/cur.length))];lines+=`<line class="fan" style="--d:${(i*.55-.25).toFixed(2)}s" x1="${p[0]}" y1="${p[1]+9}" x2="${x}" y2="${y-9}"/>`})}
  const body=`<div class="ex-ctl"><button type="button" class="act" data-a="play">Reproducir</button></div><div class="ex-plate ex-scroll"><svg viewBox="0 0 640 380" role="img" aria-label="Amplificación de la señal">${lines}${g}</svg></div>`;
  return frame('amp',n,'Una señal pequeña, una respuesta grande',body,'En una cascada, cada componente activo activa a muchas moléculas del siguiente: un receptor activa varias proteínas G, cada adenilil ciclasa forma muchas moléculas de AMPc, cada PKA fosforila muchas enzimas. El número de moléculas dibujado es ilustrativo.',['A']);
}
function wireAmp(fig){const svg=fig.querySelector('svg');const go=()=>{svg.classList.remove('go');void svg.getBoundingClientRect();if(!RM())svg.classList.add('go')};
  fig.querySelector('[data-a=play]').onclick=go;let seen=false;onView(fig,(v,e)=>{if(v&&!seen&&e.intersectionRatio>=.35){seen=true;go()}})}
X.ampCSS=`
.ed #ex-amp .fan{stroke:var(--e-mu);stroke-width:1;opacity:.55}
.ed #ex-amp svg.go .tier{animation:edTier .6s ease both;animation-delay:var(--d)}
.ed #ex-amp svg.go .fan{animation:edTier .5s ease both;animation-delay:var(--d)}
@keyframes edTier{from{opacity:.08}to{opacity:1}}
.ed #ex-amp .tier .tx.b{font-family:var(--e-body);font-size:15px}
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
  const desens=`<svg viewBox="0 0 640 150" class="dsn" role="img" aria-label="Desensibilización del receptor">${[0,1,2,3].map(i=>{const x=i*160;return `<g class="dp" data-i="${i}">${S.memH(x+8,x+152,40,26)}${Array.from({length:7},(_,j)=>`<rect class="f-rcl st-rc" x="${x+50+j*7}" y="${i===3?78:32}" width="5" height="42" rx="2"/>`).join('').replace(/^/, i===3?`<circle class="ves" cx="${x+71}" cy="99" r="34"/>`:'')}${i<3?S.lig(x+71,24,7):''}${i===1||i===2?S.P(x+104,84,7):''}${i===2?`<ellipse class="f-ofl st-of" cx="${x+92}" cy="108" rx="22" ry="11"/>`:''}${i===0?`<ellipse class="f-tdl st-td" cx="${x+104}" cy="94" rx="15" ry="11"/>`:''}${S.t(x+80,142,['receptor activo','GRK lo fosforila','se une la arrestina','endocitosis'][i],'c-mu')}</g>`}).join('')}</svg>`;
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
// ======================= FIG. 8 · LA CÉLULA COMPLETA =======================
const my=x=>150+7*Math.sin(x/120);
function cellDefs(){
  const E={};const add=(id,o)=>{E[id]=o};
  const yy=x=>my(x);
  // exterior
  add('ach',{x:110,y:62,n:'Acetilcolina',z:'Exterior',d:'Neurotransmisor. En el músculo esquelético se une a un receptor que es un canal iónico.',g:(x,y)=>S.lig(x,y,9)});
  add('adr',{x:236,y:56,n:'Adrenalina',z:'Exterior',d:'Hormona hidrosoluble: no cruza la membrana, usa un GPCR acoplado a Gs.',g:(x,y)=>S.lig(x,y,9)});
  add('sq',{x:456,y:56,n:'Señal de un GPCR acoplado a Gq',z:'Exterior',d:'Activa la vía de la fosfolipasa C.',g:(x,y)=>S.lig(x,y,9)});
  add('gf',{x:690,y:50,n:'Factor de crecimiento',z:'Exterior',d:'EGF, PDGF, FGF, NGF o insulina: une dos receptores tirosina cinasa.',g:(x,y)=>`<circle class="f-sg" cx="${x-8}" cy="${y}" r="8"/><circle class="f-sg" cx="${x+8}" cy="${y}" r="8"/>`});
  add('est',{x:800,y:52,n:'Hormona esteroidea',z:'Exterior',d:'Pequeña e hidrofóbica: cruza la membrana (cortisol, estradiol, testosterona).',g:(x,y)=>S.lig(x,y,8)});
  add('no',{x:880,y:58,n:'Óxido nítrico (NO)',z:'Exterior',d:'Gas que actúa como mediador local; cruza la membrana y dura sólo unos segundos.',g:(x,y)=>S.t(x,y+5,'NO','c-td b','middle',15)});
  // membrana
  add('ch',{x:110,y:yy(110),n:'Receptor nicotínico (canal iónico)',z:'Membrana',d:'El receptor es un canal: la señal lo abre y cambia el paso de iones y el potencial de membrana.',g:(x,y)=>`<rect class="f-rcl st-rc" x="${x-14}" y="${y-24}" width="12" height="48" rx="4"/><rect class="f-rcl st-rc" x="${x+2}" y="${y-24}" width="12" height="48" rx="4"/>`});
  const gp=(x,y)=>Array.from({length:7},(_,i)=>`<rect class="f-rcl st-rc" x="${x-24+i*7}" y="${y-24}" width="5.5" height="48" rx="2.5"/>`).join('');
  add('gsr',{x:236,y:yy(236),n:'GPCR acoplado a Gs',z:'Membrana',d:'Siete hélices transmembrana. Al unir la señal actúa como GEF sobre la proteína G.',g:gp});
  add('ac',{x:336,y:yy(336),n:'Adenilil ciclasa',z:'Membrana',d:'Enzima de membrana que convierte ATP en AMPc. No es una cinasa.',g:(x,y)=>`<rect class="f-sgl st-sg" x="${x-16}" y="${y-26}" width="32" height="52" rx="9"/>`});
  add('gqr',{x:456,y:yy(456),n:'GPCR acoplado a Gq',z:'Membrana',d:'Activa una Gq, que activa la fosfolipasa C-β.',g:gp});
  add('plc',{x:556,y:yy(556)+32,n:'Fosfolipasa C-β',z:'Membrana (cara citosólica)',d:'Corta el PIP₂ de la membrana en IP₃ y DAG.',g:(x,y)=>`<rect class="f-sgl st-sg" x="${x-26}" y="${y-11}" width="52" height="22" rx="9"/>${S.t(x,y+4,'PLC-β','c-sg b')}`});
  add('rtk',{x:690,y:yy(690),n:'Receptor tirosina cinasa (dímero)',z:'Membrana',d:'La señal une dos receptores; cada dominio cinasa fosforila tirosinas del otro (autofosforilación cruzada).',g:(x,y)=>[-11,11].map(o=>`<ellipse class="f-rcl st-rc" cx="${x+o}" cy="${y-34}" rx="9" ry="13"/><rect class="f-rc" x="${x+o-2}" y="${y-22}" width="4" height="40"/><rect class="f-rcl st-rc" x="${x+o-8}" y="${y+18}" width="16" height="34" rx="4"/>`).join('')+S.P(x-11,y+30,5.5)+S.P(x+11,y+42,5.5)});
  // citoplasma: vía AMPc
  add('gsa',{x:280,y:212,n:'Gαs-GTP y βγ',z:'Citoplasma',d:'La α cambió GDP por GTP y se separó de βγ; activa a la adenilil ciclasa. Su actividad GTPasa la apaga.',g:(x,y)=>`<ellipse class="f-tdl st-td" cx="${x}" cy="${y}" rx="18" ry="13"/>${S.t(x,y+4,'αs','c-td b')}<ellipse class="f-rsl st-rs" cx="${x-32}" cy="${y+4}" rx="11" ry="10"/>`});
  add('camp',{x:390,y:262,n:'AMPc',z:'Citoplasma',d:'Segundo mensajero: en segundos su concentración puede aumentar unas veinte veces.',g:(x,y)=>[[-26,-10],[-8,4],[10,-14],[24,6],[-16,20],[6,22],[30,-24]].map(([a,b])=>S.lig(x+a,y+b,5.5,'td')).join('')});
  add('pka',{x:430,y:330,n:'PKA (R₂C₂)',z:'Citoplasma',d:'El AMPc se une a las subunidades R y libera a las C, que fosforilan serinas y treoninas.',g:(x,y)=>`<ellipse class="f-ofl st-of" cx="${x-10}" cy="${y-9}" rx="16" ry="10"/><ellipse class="f-ofl st-of" cx="${x-10}" cy="${y+11}" rx="16" ry="10"/><circle class="f-rsl st-rs" cx="${x+18}" cy="${y-12}" r="9"/><circle class="f-rsl st-rs" cx="${x+20}" cy="${y+14}" r="9"/>${S.t(x-10,y+40,'PKA','c-of b')}`});
  add('glu',{x:282,y:392,n:'Enzimas del glucógeno',z:'Citoplasma',d:'Respuesta rápida: la PKA fosforila enzimas que inician la degradación del glucógeno y frenan su síntesis.',g:(x,y)=>`<rect class="f-rsl st-rs" x="${x-48}" y="${y-15}" width="96" height="30" rx="4"/>${S.t(x,y+4,'glucógeno','c-rs b')}${S.P(x+46,y-14,6)}`});
  add('pde',{x:168,y:300,n:'Fosfodiesterasa',z:'Citoplasma',d:'Degrada el AMPc a AMP y apaga la señal.',g:(x,y)=>`<ellipse class="f-ofl st-of" cx="${x}" cy="${y}" rx="38" ry="14" stroke-dasharray="4 3"/>${S.t(x,y+4,'PDE','c-of b')}`});
  // vía Gq / Ca2+
  add('gqa',{x:500,y:216,n:'Gαq-GTP',z:'Citoplasma',d:'Activa a la fosfolipasa C-β.',g:(x,y)=>`<ellipse class="f-tdl st-td" cx="${x}" cy="${y}" rx="18" ry="13"/>${S.t(x,y+4,'αq','c-td b')}`});
  add('dag',{x:596,y:yy(596)+12,n:'DAG',z:'Membrana',d:'Diacilglicerol: queda en la membrana y, junto con el Ca²⁺, activa a la PKC.',g:(x,y)=>`<path class="st-sg" d="M${x-2} ${y-12} V${y} M${x+2} ${y-12} V${y}" stroke-width="2.4"/><circle class="f-sg" cx="${x}" cy="${y+3}" r="4.5"/>`});
  add('pkc',{x:596,y:238,n:'Proteína cinasa C (PKC)',z:'Citoplasma',d:'DAG + Ca²⁺ la activan en la membrana; fosforila otras proteínas.',g:(x,y)=>`<ellipse class="f-ofl st-of" cx="${x}" cy="${y}" rx="24" ry="14"/>${S.t(x,y+4,'PKC','c-of b')}`});
  add('ip3',{x:470,y:330,n:'IP₃',z:'Citoplasma',d:'Hidrosoluble: difunde por el citosol y abre canales de Ca²⁺ del retículo endoplásmico.',g:(x,y)=>[[60,-80],[20,-30],[-30,30],[-90,90]].map(([a,b])=>`<polygon class="f-rcl st-rc" points="${x+a},${y+b-6} ${x+a+6},${y+b+5} ${x+a-6},${y+b+5}"/>`).join('')});
  add('erch',{x:316,y:474,n:'Canal de Ca²⁺ del retículo',z:'Citoplasma (retículo endoplásmico)',d:'Se abre cuando une IP₃: el Ca²⁺ sale al citosol a favor de su gradiente.',g:(x,y)=>`<rect class="f-rsl st-rs" x="${x-14}" y="${y-12}" width="11" height="24" rx="3"/><rect class="f-rsl st-rs" x="${x+3}" y="${y-12}" width="11" height="24" rx="3"/>`});
  add('ca',{x:368,y:446,n:'Ca²⁺',z:'Citoplasma',d:'En el citosol está muy bajo (≈10⁻⁷ M); basta abrir unos canales para que suba rápido.',g:(x,y)=>[[-22,8],[-6,-6],[10,6],[24,-10],[2,18],[-14,-18]].map(([a,b])=>`<circle class="f-rs" cx="${x+a}" cy="${y+b}" r="4"/>`).join('')});
  add('cam',{x:458,y:446,n:'Calmodulina',z:'Citoplasma',d:'Proteína con cuatro sitios de unión a Ca²⁺; al unirlo cambia de forma y activa dianas.',g:(x,y)=>`<ellipse class="f-rsl st-rs" cx="${x}" cy="${y}" rx="30" ry="13"/>${S.t(x,y+4,'CaM','c-rs b')}`});
  add('camk',{x:462,y:508,n:'CaM-cinasas',z:'Citoplasma',d:'Cinasas dependientes de Ca²⁺/calmodulina: fosforilan muchas proteínas.',g:(x,y)=>`<rect class="f-rsl st-rs" x="${x-34}" y="${y-13}" width="68" height="26" rx="4"/>${S.t(x,y+4,'CaM-cinasa','c-rs b')}`});
  add('pump',{x:132,y:468,n:'Bomba de Ca²⁺',z:'Citoplasma (retículo endoplásmico)',d:'Gasta ATP para regresar el Ca²⁺ y mantenerlo bajo en el citosol: apaga la señal.',g:(x,y)=>`<rect class="f-ofl st-of" x="${x-16}" y="${y-12}" width="32" height="24" rx="5" stroke-dasharray="4 3"/>${S.t(x,y+4,'ATP','c-of')}`});
  // vía RTK
  add('grb',{x:660,y:262,n:'Grb2 (SH2) y Sos (GEF)',z:'Citoplasma',d:'Grb2 se une a una tirosina fosforilada y trae a Sos, que cambia el GDP de Ras por GTP.',g:(x,y)=>`<ellipse class="f-tdl st-td" cx="${x-14}" cy="${y}" rx="18" ry="11"/>${S.t(x-14,y+4,'Grb2','c-td')}<ellipse class="f-tdl st-td" cx="${x+22}" cy="${y+14}" rx="16" ry="11"/>${S.t(x+22,y+18,'Sos','c-td')}`});
  add('ras',{x:760,y:yy(760)+30,n:'Ras-GTP',z:'Membrana (cara citosólica)',d:'GTPasa monomérica anclada a la membrana: activa con GTP.',g:(x,y)=>`<ellipse class="f-tdl st-td" cx="${x}" cy="${y}" rx="20" ry="13"/>${S.t(x,y+4,'Ras','c-td b')}`});
  add('mapk',{x:800,y:300,n:'Raf → MEK → ERK',z:'Citoplasma',d:'Módulo de MAP cinasa: cada cinasa fosforila y activa a la siguiente.',g:(x,y)=>[['Raf',-34,-34],['MEK',-6,4],['ERK',18,42]].map(([l,a,b])=>`<rect class="f-tdl st-td" x="${x+a-20}" y="${y+b-11}" width="40" height="22" rx="4"/>${S.t(x+a,y+b+4,l,'c-td b')}`).join('')});
  add('rgap',{x:690,y:352,n:'Ras-GAP',z:'Citoplasma',d:'Acelera la hidrólisis del GTP de Ras: la apaga.',g:(x,y)=>`<ellipse class="f-ofl st-of" cx="${x}" cy="${y}" rx="28" ry="12" stroke-dasharray="4 3"/>${S.t(x,y+4,'Ras-GAP','c-of')}`});
  add('akt',{x:616,y:330,n:'PI3K → PIP₃ → Akt',z:'Citoplasma',d:'Otra vía del mismo receptor: Akt promueve supervivencia (fosforila a Bad), crecimiento (mTOR) y captación de glucosa (GLUT4). PTEN la apaga.',g:(x,y)=>`<ellipse class="f-tdl st-td" cx="${x}" cy="${y}" rx="22" ry="12"/>${S.t(x,y+4,'Akt','c-td b')}`});
  // receptores intracelulares
  add('nr',{x:862,y:236,n:'Receptor nuclear con Hsp90',z:'Citoplasma',d:'Espera en el citosol unido a la chaperona Hsp90; al unir la hormona se libera y entra al núcleo.',g:(x,y)=>`<ellipse class="f-rcl st-rc" cx="${x}" cy="${y}" rx="20" ry="14"/><ellipse class="f-mul st-mu" cx="${x+20}" cy="${y+14}" rx="14" ry="9"/>`});
  add('gc',{x:900,y:330,n:'Guanilil ciclasa',z:'Citoplasma',d:'Receptor intracelular del NO (no es un receptor nuclear): produce GMPc.',g:(x,y)=>`<ellipse class="f-tdl st-td" cx="${x}" cy="${y}" rx="24" ry="13"/>${S.t(x,y+4,'GC','c-td b')}`});
  add('pkg',{x:900,y:400,n:'GMPc → PKG',z:'Citoplasma',d:'El GMPc activa a la PKG, baja el Ca²⁺ y el músculo liso se relaja (en una célula muscular lisa).',g:(x,y)=>`<rect class="f-rsl st-rs" x="${x-26}" y="${y-12}" width="52" height="24" rx="4"/>${S.t(x,y+4,'PKG','c-rs b')}`});
  // núcleo
  add('creb',{x:610,y:578,n:'CREB sobre CRE',z:'Núcleo',d:'La PKA fosforila al factor de transcripción CREB, que se une a CRE y enciende genes (respuesta lenta).',g:(x,y)=>`<ellipse class="f-ofl st-of" cx="${x}" cy="${y}" rx="24" ry="12"/>${S.t(x,y+4,'CREB','c-of b')}<rect class="f-sgl st-sg" x="${x-18}" y="${y+16}" width="36" height="12" rx="2"/>`});
  add('erkn',{x:740,y:578,n:'ERK en el núcleo',z:'Núcleo',d:'Fosforila reguladores de genes que favorecen la proliferación y la diferenciación.',g:(x,y)=>`<rect class="f-tdl st-td" x="${x-20}" y="${y-11}" width="40" height="22" rx="4"/>${S.t(x,y+4,'ERK','c-td b')}`});
  add('hre',{x:880,y:578,n:'Receptor nuclear sobre HRE',z:'Núcleo',d:'Se une a los elementos de respuesta a la hormona y recluta coactivadores: transcripción de genes diana (horas).',g:(x,y)=>`<ellipse class="f-rcl st-rc" cx="${x}" cy="${y}" rx="20" ry="12"/><rect class="f-sgl st-sg" x="${x-18}" y="${y+16}" width="36" height="12" rx="2"/>`});
  add('mrna',{x:700,y:470,n:'ARNm → proteínas nuevas',z:'Núcleo → citoplasma',d:'Las respuestas lentas requieren transcribir genes y traducir proteínas nuevas.',g:(x,y)=>`<path class="st-rs" d="M${x-30} ${y+20} q8 -10 16 0 t16 0 t16 0 t16 0" fill="none" stroke-width="2.4"/>`});
  add('ions',{x:110,y:250,n:'Iones',z:'Citoplasma',d:'Al abrirse el canal entran iones y cambia el potencial de membrana: respuesta en milisegundos a segundos.',g:(x,y)=>[[-10,-26],[8,-12],[-6,4],[10,18]].map(([a,b])=>`<circle class="f-td" cx="${x+a}" cy="${y+b}" r="4"/>`).join('')});
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
function cellSVG(E){
  const pts=[];for(let x=100;x<=900;x+=20)pts.push(`${x},${my(x).toFixed(1)}`);
  const m=`M14 680 L14 240 Q14 ${my(100)} 100 ${my(100)} L`+pts.join(' L')+` Q986 ${my(900)} 986 240 L986 680`;
  let rnd=11;const r=()=>{rnd=(rnd*16807)%2147483647;return rnd/2147483647};
  let chrom='';for(let i=0;i<90;i++){const a=Math.PI+r()*Math.PI,rr=Math.sqrt(r());const x=740+225*rr*Math.cos(a),y=560+118*rr*Math.sin(a);if(y<450||y>598)continue;chrom+=`<ellipse class="chr" cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${(3+r()*8).toFixed(1)}" ry="${(2+r()*4).toFixed(1)}" transform="rotate(${(r()*180).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})"/>`}
  let pores='';for(let a=200;a<=340;a+=14){const t=a*Math.PI/180;pores+=`<circle class="pore" cx="${(740+232*Math.cos(t)).toFixed(1)}" cy="${(560+124*Math.sin(t)).toFixed(1)}" r="4"/>`}
  const er=[0,1,2].map(i=>`<path class="erc" d="M${44+i*6} ${640} V${512+i*22} Q${44+i*6} ${492+i*22} ${76+i*6} ${492+i*22} H${300-i*28} Q${330-i*28} ${492+i*22} ${330-i*28} ${522+i*22} V640"/>`).join('');
  let mt='';for(let i=0;i<7;i++){const x1=40+r()*900,y1=200+r()*120,x2=x1+(r()-.5)*260,y2=y1+120+r()*160;mt+=`<path class="mt" d="M${x1.toFixed(0)} ${y1.toFixed(0)} Q${((x1+x2)/2+40).toFixed(0)} ${((y1+y2)/2).toFixed(0)} ${x2.toFixed(0)} ${y2.toFixed(0)}"/>`}
  const mito=(x,y,a)=>`<g class="mito" transform="rotate(${a} ${x} ${y})"><rect x="${x-34}" y="${y-13}" width="68" height="26" rx="13"/><path d="M${x-22} ${y+8} v-12 M${x-10} ${y-8} v12 M${x+2} ${y+8} v-12 M${x+14} ${y-8} v12 M${x+24} ${y+6} v-8"/></g>`;
  let els='';Object.entries(E).forEach(([id,e])=>{els+=`<g class="ce" data-id="${id}" tabindex="0" role="button" aria-label="${esc(e.n)}">${e.g(e.x,e.y)}</g>`});
  return `<svg viewBox="0 0 1000 680" role="img" aria-label="Célula completa con sus vías de señalización">
   <rect class="exo" x="0" y="0" width="1000" height="680"/><path class="cyt" d="${m} Z"/>
   ${mt}${mito(206,474,-18)}${mito(952,430,-72)}${er}<ellipse class="nuc2" cx="740" cy="560" rx="238" ry="128"/><ellipse class="nucf" cx="740" cy="560" rx="230" ry="120"/>${chrom}${pores}<path class="st-mu" d="M540 604 H960 M540 611 H960" stroke-width="2"/>
   <path class="memb" d="${m}"/><path class="memh" d="${m}" transform="translate(0,-13)"/><path class="memh" d="${m}" transform="translate(0,13)"/>
   <g class="zl">${S.t(40,26,'EXTERIOR','cap','start')}${S.t(40,206,'MEMBRANA PLASMÁTICA','cap','start')}${S.t(40,236,'CITOPLASMA','cap','start')}${S.t(56,628,'RETÍCULO ENDOPLÁSMICO','cap c-rs','start')}${S.t(950,520,'NÚCLEO','cap c-rc','end')}</g>
   <path class="route" pathLength="1" d=""/>${els}</svg>`;
}
function cellFig(n){
  const body=`<div class="ex-ctl"><button type="button" class="ex-tab on" data-md="exp">Explorar la célula</button><button type="button" class="ex-tab" data-md="route">Seguir una ruta</button></div>
   <div class="ce-routes ex-ctl" hidden>${Object.entries(ROUTES).map(([k,r],i)=>`<button type="button" class="ex-tab ce-r${i===1?' on':''}" data-r="${k}">${r.n}</button>`).join('')}<span class="sep"></span><button type="button" data-a="prev">Anterior</button><button type="button" class="act" data-a="play">Reproducir</button><button type="button" data-a="next">Siguiente</button><button type="button" data-a="reset">Reiniciar</button></div>
   <ol class="ce-stg">${STG.map(s=>`<li data-s="${s}">${s}</li>`).join('')}</ol>
   <div class="ce-row"><div class="ex-plate ex-scroll ce-plate"></div><aside class="ex-side ce-side" aria-live="polite"><h4>Toca cualquier estructura</h4><p>Verás qué es, qué función tiene en la señalización y a qué ruta pertenece. Con «Seguir una ruta» recorres el camino completo de una señal dentro de esta misma célula.</p></aside></div>`;
  return frame('cel',n,'La célula completa',body,'Resumen visual del capítulo: cada vía se dibuja sobre la misma célula, de la señal externa a la respuesta. Esquema propio, simplificado y no a escala; la vía del NO ocurre en el músculo liso vecino al endotelio.',['A','L']);
}
function wireCell(fig){
  const E=cellDefs();const plate=fig.querySelector('.ce-plate');plate.innerHTML=cellSVG(E);const svg=plate.querySelector('svg'),side=fig.querySelector('.ce-side'),route=svg.querySelector('.route');
  svg.querySelectorAll('.ce').forEach(g=>{try{const b=g.getBBox();const r=document.createElementNS('http://www.w3.org/2000/svg','rect');r.setAttribute('x',b.x-6);r.setAttribute('y',b.y-6);r.setAttribute('width',b.width+12);r.setAttribute('height',b.height+12);r.setAttribute('class','hit');g.insertBefore(r,g.firstChild)}catch(e){}});
  const inRoutes=id=>Object.entries(ROUTES).filter(([k,r])=>r.steps.some(s=>s[1]===id));
  let mode='exp',rk='ampc',si=-1,timer=null;
  const info=id=>{const e=E[id];const R=inRoutes(id);side.innerHTML=`<h4>${esc(e.n)}</h4><dl><dt>Zona</dt><dd>${esc(e.z)}</dd><dt>Función en la señalización</dt><dd>${esc(e.d)}</dd>${R.length?`<dt>Forma parte de</dt><dd>${R.map(([k,r])=>`<button type="button" class="lnk" data-go="${k}">${esc(r.n)}</button>`).join(' · ')}</dd>`:''}</dl>`;
    side.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{setMode('route');pickRoute(b.dataset.go);go(0)})};
  const hl=ids=>{svg.classList.toggle('hl',!!ids);svg.querySelectorAll('.ce').forEach(g=>g.classList.toggle('on',!!ids&&ids.includes(g.dataset.id)))};
  const stgOn=s=>fig.querySelectorAll('.ce-stg li').forEach(li=>{li.classList.toggle('on',li.dataset.s===s)});
  const drawRoute=k=>{const st=ROUTES[rk].steps.slice(0,k+1);const P=st.map(s=>E[s[1]]);if(P.length<2){route.setAttribute('d','');return}let d=`M${P[0].x} ${P[0].y}`;for(let i=1;i<P.length;i++){const a=P[i-1],b=P[i];d+=` Q${(a.x+b.x)/2+(b.y-a.y)*.15} ${(a.y+b.y)/2-(b.x-a.x)*.15} ${b.x} ${b.y}`}route.setAttribute('d',d);route.classList.remove('dr');void route.getBoundingClientRect();if(!RM())route.classList.add('dr')};
  const go=k=>{const S2=ROUTES[rk].steps;si=Math.max(0,Math.min(S2.length-1,k));const s=S2[si];hl(S2.slice(0,si+1).map(x=>x[1]));svg.querySelectorAll('.ce').forEach(g=>g.classList.toggle('cur',g.dataset.id===s[1]));stgOn(s[0]);drawRoute(si);
    side.innerHTML=`<h4>${esc(ROUTES[rk].n)} · paso ${si+1} de ${S2.length}</h4><p class="stp"><span class="tag">${s[0]}</span> ${esc(s[2])}</p><dl><dt>${esc(E[s[1]].n)}</dt><dd>${esc(E[s[1]].d)}</dd></dl>`};
  const stop=()=>{if(timer){clearInterval(timer);timer=null}};
  const pickRoute=k=>{rk=k;fig.querySelectorAll('.ce-r').forEach(b=>b.classList.toggle('on',b.dataset.r===k))};
  const setMode=m=>{mode=m;stop();fig.querySelectorAll('[data-md]').forEach(b=>b.classList.toggle('on',b.dataset.md===m));fig.querySelector('.ce-routes').hidden=m!=='route';
    if(m==='exp'){hl(null);svg.querySelectorAll('.ce.cur').forEach(g=>g.classList.remove('cur'));route.setAttribute('d','');stgOn('');}else go(0)};
  fig.querySelectorAll('[data-md]').forEach(b=>b.onclick=()=>setMode(b.dataset.md));
  fig.querySelectorAll('.ce-r').forEach(b=>b.onclick=()=>{stop();pickRoute(b.dataset.r);go(0)});
  fig.querySelector('[data-a=prev]').onclick=()=>{stop();go(si-1)};fig.querySelector('[data-a=next]').onclick=()=>{stop();go(si+1)};
  fig.querySelector('[data-a=reset]').onclick=()=>{stop();go(0)};
  fig.querySelector('[data-a=play]').onclick=()=>{stop();go(0);timer=setInterval(()=>{if(si>=ROUTES[rk].steps.length-1)return stop();go(si+1)},1700)};
  svg.querySelectorAll('.ce').forEach(g=>{const id=g.dataset.id;const f=()=>{if(mode==='exp'){hl([id]);info(id)}};g.onmouseenter=f;g.onfocus=f;g.onclick=()=>{if(mode==='route'){const R=inRoutes(id);if(R.length){pickRoute(R[0][0]);go(ROUTES[rk].steps.findIndex(s=>s[1]===id))}}else{hl([id]);info(id)}};
    g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();g.onclick()}}});
  svg.onmouseleave=()=>{if(mode==='exp')hl(null)};
  onView(fig,v=>{if(!v)stop()});
}
X.cellCSS=`
.ed #ex-cel .exo{fill:var(--e-plate)}.ed #ex-cel .cyt{fill:var(--e-cyt)}
.ed #ex-cel .memb{fill:none;stroke:var(--e-mem);stroke-width:30}.ed #ex-cel .memh{fill:none;stroke:var(--e-memh);stroke-width:6;stroke-linecap:round;stroke-dasharray:0 9}
.ed #ex-cel .erc{fill:var(--e-rsl);stroke:var(--e-rs);stroke-width:1.4;opacity:.75}
.ed #ex-cel .nuc2{fill:none;stroke:var(--e-rc);stroke-width:.8;opacity:.6}.ed #ex-cel .chr{fill:var(--e-rc);opacity:.13}.ed #ex-cel .pore{fill:var(--e-cyt)}
.ed #ex-cel .ce{cursor:pointer;outline:none;transition:opacity .35s}
.ed #ex-cel svg.hl .ce:not(.on){opacity:.16}
.ed #ex-cel .ce.on>*,.ed #ex-cel .ce:focus-visible>*{filter:drop-shadow(0 0 4px var(--e-sgl))}
.ed #ex-cel .ce.cur>*{filter:drop-shadow(0 0 3px var(--e-sg)) drop-shadow(0 0 7px var(--e-sg))}
.ed #ex-cel .route{fill:none;stroke:var(--e-sg);stroke-width:2.6;stroke-dasharray:1;stroke-dashoffset:0;opacity:.9;pointer-events:none}
.ed #ex-cel .route.dr{animation:edDraw .9s ease both}
.ed #ex-cel .ce-stg{list-style:none;padding:0;margin:0 0 10px;display:flex;flex-wrap:wrap;gap:0}
.ed #ex-cel .ce-stg li{font:500 11px/1 var(--e-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--e-mut);padding:8px 14px 8px 0;margin:0;position:relative}
.ed #ex-cel .ce-stg li::before{display:none}.ed #ex-cel .ce-stg li:not(:last-child)::after{content:"→";margin-left:14px;color:var(--e-rule)}
.ed #ex-cel .ce-stg li.on{color:var(--e-ink);text-decoration:underline;text-decoration-color:var(--e-sg);text-decoration-thickness:3px;text-underline-offset:6px}
.ed #ex-cel .ce-side{min-height:0;border-left:0;border-top:1px solid var(--e-rule)}
.ed #ex-cel .ce-routes[hidden]{display:none}
.ed #ex-cel svg>:not(.ce){pointer-events:none}.ed #ex-cel .hit{fill:transparent}
.ed #ex-cel .mt{fill:none;stroke:var(--e-td);stroke-width:1;opacity:.12}
.ed #ex-cel .mito rect{fill:var(--e-ofl);stroke:var(--e-of);stroke-width:1;opacity:.45}.ed #ex-cel .mito path{stroke:var(--e-of);stroke-width:1;fill:none;opacity:.4}
.ed #ex-cel .ce-side dl{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0 24px}
.ed #ex-cel .lnk{background:none;border:0;padding:0;color:var(--e-td);font:inherit;cursor:pointer;text-decoration:underline}
.ed #ex-cel .stp .tag{font:500 10.5px var(--e-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--e-sg);margin-right:6px}
@media (max-width:640px){.ed #ex-cel .ex-scroll>svg{min-width:820px}}
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
`;
function refs(){return `<section class="ed-refs ed-wide" id="ed-refs" data-blk="keep"><h3>Referencias</h3><ol><li id="ed-ref-A"><span>[1]</span>${REF.A.apa} Capítulo 15, «Cell Signaling».</li><li id="ed-ref-L"><span>[2]</span>${REF.L.apa}</li></ol><p>El texto de este capítulo sigue al Alberts [1], con apoyo del Lodish [2] para las vías de los receptores. Las figuras interactivas son esquemas propios, simplificados y no a escala, construidos a partir del texto de cada sección.</p></section>`}
Object.assign(X,{amp,wireAmp,term,wireTerm,cellFig,wireCell,summary,refs});
})();
