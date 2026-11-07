/* Visualizaciones interactivas (Biología Celular).
   Motor propio en SVG + CSS, inspirado en los principios de wheresryan22/anatomy (MIT):
   tarjeta con Fig., título, pista y lectura en vivo; todo lo que se ve sale de un mismo modelo;
   movimiento suave por transiciones; se detiene fuera de pantalla; teclado; movimiento reducido. */
(function(){
"use strict";
const C={cob:'#1B3FD0',ocre:'#E8B94B',ink:'#1d2340',mut:'#5a5f78',red:'#b8412e',grn:'#2f7d5b',tan:'#a77d2c',lcob:'#dbe3fb',locre:'#f7e6b8',lred:'#f4d6cf',lgrn:'#d5ebdf',pur:'#6b3fb8',lpur:'#ece3fa',mem:'#f1dca8'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const T=(x,y,s,o={})=>`<text x="${x}" y="${y}" text-anchor="${o.a||'middle'}" font-size="${o.fs||15}" font-weight="${o.w||700}" fill="${o.c||C.ink}"${o.cls?` class="${o.cls}"`:''}${o.it?' font-style="italic"':''}>${esc(s)}</text>`;
const L=(x,y,s,o={})=>T(x,y,s,Object.assign({cls:'lbl',fs:14,w:600,c:C.mut},o));
const hex=(x,y,r,f,s)=>{let p=[];for(let i=0;i<6;i++){const a=Math.PI/3*i+Math.PI/6;p.push((x+r*Math.cos(a)).toFixed(1)+','+(y+r*Math.sin(a)).toFixed(1))}return `<polygon points="${p.join(' ')}" fill="${f}" stroke="${s}" stroke-width="1.6"/>`};
const dia=(x,y,r,f,s)=>`<polygon points="${x},${y-r} ${x+r},${y} ${x},${y+r} ${x-r},${y}" fill="${f}" stroke="${s}" stroke-width="1.4"/>`;
const pB=(x,y)=>`<g><circle cx="${x}" cy="${y}" r="9" fill="${C.ocre}" stroke="${C.tan}" stroke-width="1.5"/>${T(x,y+4.5,'P',{fs:11,c:C.ink})}</g>`;
const ell=(x,y,rx,ry,f,s,sw=2,dash)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}" stroke="${s}" stroke-width="${sw}"${dash?' stroke-dasharray="5 4"':''}/>`;
const rr=(x,y,w,h,f,s,r=6,sw=2,dash)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" stroke="${s}" stroke-width="${sw}"${dash?' stroke-dasharray="6 4"':''}/>`;
const V=(v,inner)=>`<g data-v="${v}">${inner}</g>`;
const memBand=(y1,y2,x1=20,x2=940)=>`<rect x="${x1}" y="${y1}" width="${x2-x1}" height="${y2-y1}" fill="${C.mem}" stroke="${C.tan}" stroke-width="1.5"/>`+Array.from({length:Math.floor((x2-x1)/16)},(_,i)=>`<circle cx="${x1+8+i*16}" cy="${y1+5}" r="4" fill="#e8c98a"/><circle cx="${x1+8+i*16}" cy="${y2-5}" r="4" fill="#e8c98a"/>`).join('');

// =====================================================================
// 1) OPERÓN LAC
// =====================================================================
const GENS={n:'Normal (i⁺ P O z⁺y⁺a⁺)',im:'i⁻ (represor inactivo)',oc:'Oᶜ (operador constitutivo)',is:'iˢ (superrepresor)',o0:'Oᴼ («operador cero»: promotor alterado)',ac:'Sin adenilato ciclasa (no hay AMPc)'};
function lacModel(m){
  const g=m.gen,ind=m.lac,repAct=g!=='im',bind=repAct&&g!=='oc'&&!(ind&&g!=='is'),camp=!m.glc&&g!=='ac',prom=g!=='o0';
  const expr=!prom?'nula':bind?'apagada':camp?'alta':'muy baja';
  return {ind,repAct,bind,camp,prom,expr};
}
function lacState(m,ov){
  const r=lacModel(m),S={};
  S.gi={v:m.gen==='im'?'im':m.gen==='is'?'is':'n'};S.op={v:m.gen==='oc'?'mut':'n'};S.pr={v:m.gen==='o0'?'mut':'n'};
  S.rep={x:r.bind?344:470,y:r.bind?221:155,v:!r.repAct?'mut':(r.ind&&m.gen!=='is')?'ind':'n'};
  S.cap=r.camp?{x:227,y:233,v:'on',o:1}:{x:225,y:150,v:'off',o:.6};
  for(let i=0;i<6;i++)S['cp'+i]={o:r.camp?1:(i===0&&m.gen!=='ac'?.35:0)};
  for(let i=0;i<4;i++)S['gl'+i]={o:m.glc?1:0,s:m.glc?1:.4};
  for(let i=0;i<3;i++)S['la'+i]={o:m.lac?1:0,s:m.lac?1:.4};
  const alFree=m.lac&&(m.gen==='is'||!r.repAct);for(let i=0;i<2;i++)S['al'+i]={o:alFree?1:0};
  const hi=r.expr==='alta',lo=r.expr==='muy baja';
  S.pol=hi?{x:600,y:226,o:1,v:'n'}:r.expr==='apagada'?{x:290,y:226,o:1,v:'n'}:lo?{x:300,y:155,o:.75,v:'weak'}:{x:300,y:150,o:.5,v:'weak'};
  S.blk={o:r.expr==='apagada'?1:0};
  S.mrna={o:hi?1:lo?.55:0,d:hi?0:lo?.8:1};
  ['ez1','ez2','ez3'].forEach(k=>S[k]={o:hi?1:lo?.3:0,s:hi?1:.75});
  const ro=`Represor: ${r.bind?'en el operador':!r.repAct?'inactivo':'libre'} · CAP-AMPc: ${r.camp?'unida':'no'} · Transcripción: ${r.expr}`;
  if(ov)for(const k in ov)S[k]=Object.assign({},S[k],ov[k]);
  return {S,ro,r};
}
function lacChain(m){
  const r=lacModel(m),g=m.gen,c=[];
  if(g==='im')c.push('El represor i⁻ es inactivo: no se une al operador, haya o no lactosa.');
  else if(g==='oc')c.push('El represor no reconoce al operador Oᶜ: el operador queda libre aunque no haya inductor.');
  else if(g==='is')c.push(m.lac?'Hay lactosa y se forma alolactosa, pero el represor iˢ no reconoce al inductor → sigue unido al operador.':'Sin inductor, el represor está unido al operador.');
  else c.push(m.lac?'Hay lactosa → la β-galactosidasa forma alolactosa → la alolactosa se une al represor y le cambia la forma → el represor se suelta del operador.':'Sin lactosa no hay inductor → el represor permanece unido al operador.');
  if(g==='ac')c.push('Sin adenilato ciclasa no se forma AMPc → CAP queda inactiva aunque falte la glucosa.');
  else c.push(m.glc?'Hay glucosa → AMPc bajo → CAP sin AMPc no se une al sitio CAP.':'Sin glucosa → AMPc alto → CAP-AMPc se une al sitio CAP (≈ −60) y estimula la unión de la ARN polimerasa.');
  if(g==='o0')c.push('El «operador cero» es en realidad un promotor alterado: la ARN polimerasa no lo reconoce.');
  c.push({alta:'Resultado: transcripción alta de lacZ, lacY y lacA en un solo ARNm policistrónico, que se traduce mientras se transcribe.',apagada:'Resultado: operón apagado; el represor en el operador impide que la ARN polimerasa transcriba.','muy baja':'Resultado: transcripción muy baja; el represor no estorba, pero sin CAP-AMPc la polimerasa se une mal (represión catabólica).',nula:'Resultado: no hay transcripción.'}[r.expr]);
  if(g==='im'||g==='oc')c.push('Es un mutante constitutivo: expresa los genes haya o no inductor.');
  return c;
}
function lacScene(){
  const P=[];const add=(id,o)=>P.push(Object.assign({id},o));
  // ADN y genes (fijos, seleccionables)
  add('gi',{layer:'adn',name:'Gen regulador i (lacI)',desc:'Codifica el represor. No forma parte del operón: está cerca, pero no inmediatamente al lado, y tiene su propio promotor. Su producto es una proteína difusible, por eso actúa en trans.',
    svg:rr(22,251,18,32,'#efe0b8',C.tan,3,1.5)+V('n',rr(40,250,120,34,C.locre,C.tan)+T(100,273,'i'))+V('im',rr(40,250,120,34,C.locre,C.red,6,2,1)+T(100,273,'i⁻',{c:C.red}))+V('is',rr(40,250,120,34,C.locre,C.red,6,2,1)+T(100,273,'iˢ',{c:C.red}))+L(100,305,'gen regulador (lacI)')});
  add('cs',{layer:'adn',name:'Sitio CAP',desc:'Secuencia del promotor (cerca de la posición −60) donde se une el complejo CAP-AMPc. Al unirse, CAP estimula la unión de la ARN polimerasa: es el control positivo del operón.',
    svg:rr(203,250,47,34,C.lpur,C.pur,4)+T(227,272,'CAP',{fs:12,c:C.pur})+L(227,305,'sitio CAP')});
  add('pr',{layer:'adn',name:'Promotor (P)',desc:'Secuencia que reconoce la ARN polimerasa para iniciar la transcripción. El mutante Oᴼ («operador cero») es en realidad un promotor que la polimerasa ya no reconoce.',
    svg:V('n',rr(250,250,80,34,C.locre,C.tan,4))+V('mut',rr(250,250,80,34,C.locre,C.red,4,2,1))+T(282,273,'P')+L(290,326,'promotor')});
  add('op',{layer:'adn',name:'Operador (O)',desc:'Secuencia de 17–25 nucleótidos, entre el promotor y lacZ, que reconoce el represor. Se solapa con el promotor, por eso un represor unido estorba a la polimerasa. No produce ninguna molécula: Oᶜ actúa sólo en cis.',
    svg:V('n',rr(318,250,54,34,C.lred,C.red,4))+V('mut',rr(318,250,54,34,C.lred,C.red,4,2.4,1))+T(345,273,'O',{c:C.red})+L(345,305,'operador')});
  [['z',375,235,'lacZ','β-galactosidasa','Gen z → β-galactosidasa: hidroliza la lactosa en glucosa y galactosa, y forma la alolactosa, el verdadero inductor.'],['y',614,146,'lacY','permeasa','Gen y → galactósido permeasa: transporta la lactosa al interior de la bacteria.'],['a',764,136,'lacA','transacetilasa','Gen a → tiogalactósido transacetilasa: transfiere un acetilo de la acetil-CoA a un tiogalactósido. Los apuntes aclaran que no participa directamente en el metabolismo de la lactosa.']].forEach(([k,x,w,n,e,d])=>
    add('g'+k,{layer:'adn',name:n+' (gen estructural)',desc:d,svg:rr(x,250,w,34,C.lcob,C.cob,4)+T(x+w/2,273,n,{c:C.cob,it:1})+L(x+w/2,305,e)}));
  // moléculas del medio
  [[60,95],[100,120],[140,92],[48,135]].forEach(([x,y],i)=>add('gl'+i,{layer:'mol',name:'Glucosa',desc:'Mientras hay glucosa, E. coli la usa de forma preferente y el AMPc se mantiene bajo; así no gasta energía en usar lactosa (represión catabólica).',at:{x,y},svg:hex(0,0,11,C.lgrn,C.grn)+(i===0?L(0,-18,'glucosa'):'')}));
  [[560,92],[625,118],[690,88]].forEach(([x,y],i)=>add('la'+i,{layer:'mol',name:'Lactosa',desc:'Disacárido (glucosa + galactosa). No es el inductor directo: la β-galactosidasa la convierte en alolactosa.',at:{x,y},svg:hex(-10,0,10,'#fff',C.tan)+hex(10,0,10,C.lgrn,C.grn)+(i===0?L(0,-18,'lactosa'):'')}));
  [[520,165],[545,190]].forEach(([x,y],i)=>add('al'+i,{layer:'mol',name:'Alolactosa (inductor)',desc:'Isómero de la lactosa formado por la β-galactosidasa. Se une al represor, le cambia la conformación (alosterismo) y hace que se suelte del operador. En el laboratorio se usa IPTG, un análogo sintético.',at:{x,y},svg:hex(0,0,9,C.ocre,C.tan)+(i===0?L(0,-16,'alolactosa'):'')}));
  [[160,110],[200,95],[240,118],[280,100],[315,122],[190,135]].forEach(([x,y],i)=>add('cp'+i,{layer:'mol',name:'AMPc',desc:'Segundo mensajero que la adenilato ciclasa forma a partir de ATP. Es alto cuando falta glucosa; se une a CAP y la activa.',at:{x,y},svg:dia(0,0,7,'#ffd27a',C.tan)+(i===2?L(0,-14,'AMPc'):'')}));
  // proteínas
  const four=(f,s,dash,off=0)=>[[-14,-14],[14,-14],[-14,14],[14,14]].map(([a,b])=>ell(a*(1+off),b*(1+off),14,14,f,s,2,dash)).join('');
  add('rep',{layer:'reg',name:'Represor LacI (tetrámero)',desc:'Producto del gen i: tetrámero de cuatro cadenas idénticas (≈38 000 cada una). Unido al operador impide la transcripción (control negativo). Al unir alolactosa cambia de forma y se suelta.',at:{x:344,y:221},
    svg:V('n',four('#e9b3a6',C.red))+V('ind',four('#e9b3a6',C.red,0,.22)+hex(-30,-26,7,C.ocre,C.tan)+hex(30,26,7,C.ocre,C.tan)+hex(30,-26,7,C.ocre,C.tan)+hex(-30,26,7,C.ocre,C.tan))+V('mut',four('#f3d3cb',C.red,1)+T(0,5,'✕',{c:C.red,fs:16}))+L(0,-38,'represor')});
  add('cap',{layer:'reg',name:'CAP (CRP) + AMPc',desc:'Proteína activadora por catabolitos: dímero que sólo está activo con AMPc unido. CAP-AMPc se une al sitio CAP y estimula la unión de la ARN polimerasa; sin ella, la transcripción es muy baja aunque no haya represor.',at:{x:227,y:233},
    svg:ell(-13,0,15,11,C.lpur,C.pur)+ell(13,0,15,11,C.lpur,C.pur)+V('on',dia(-13,-15,6,'#ffd27a',C.tan)+dia(13,-15,6,'#ffd27a',C.tan))+V('off','')+L(0,-26,'CAP')});
  add('pol',{layer:'reg',name:'ARN polimerasa',desc:'Reconoce el promotor y transcribe lacZ, lacY y lacA en un solo ARNm. Si el represor ocupa el operador no puede avanzar; sin CAP-AMPc se une mal al promotor.',at:{x:290,y:226},
    svg:ell(0,0,44,27,C.lcob,C.cob)+T(0,5,'ARN pol',{fs:14,c:C.cob})+V('weak',L(0,-36,'se une mal al promotor'))+V('n','')});
  add('blk',{layer:'reg',name:'Bloqueo',desc:'El represor en el operador estorba físicamente a la ARN polimerasa, porque el operador se solapa con el promotor.',at:{x:322,y:186},svg:`<path d="M-9 -9 L9 9 M9 -9 L-9 9" stroke="${C.red}" stroke-width="4" stroke-linecap="round"/>`});
  add('mrna',{layer:'prod',name:'ARNm policistrónico',desc:'Un solo ARNm con la información de lacZ, lacY y lacA. En bacterias se traduce mientras todavía se transcribe (transcripción y traducción acopladas).',
    svg:`<path class="grow" pathLength="1" d="M380 345 C430 330 470 360 520 345 S610 330 660 345 S750 360 800 345 S870 330 900 345" fill="none" stroke="${C.cob}" stroke-width="4" stroke-linecap="round"/>`+L(640,375,'ARNm policistrónico (lacZ · lacY · lacA)')});
  add('ez1',{layer:'prod',name:'β-galactosidasa',desc:'Enzima codificada por lacZ: hidroliza la lactosa en glucosa y galactosa.',at:{x:492,y:410},svg:[[-11,-9],[11,-9],[-11,9],[11,9]].map(([a,b])=>rr(a-9,b-8,18,16,C.lgrn,C.grn,4,1.6)).join('')});
  add('ez2',{layer:'prod',name:'Permeasa',desc:'Proteína de membrana codificada por lacY: transporta la lactosa al interior.',at:{x:687,y:410},svg:rr(-14,-16,28,32,C.lgrn,C.grn,8,1.6)+`<path d="M-6 -12 V12 M0 -12 V12 M6 -12 V12" stroke="${C.grn}" stroke-width="1.4"/>`});
  add('ez3',{layer:'prod',name:'Transacetilasa',desc:'Enzima codificada por lacA: tiogalactósido transacetilasa.',at:{x:832,y:410},svg:ell(-8,0,10,10,C.lgrn,C.grn,1.6)+ell(8,0,10,10,C.lgrn,C.grn,1.6)});
  const bg=T(24,30,'CITOPLASMA DE E. coli',{a:'start',fs:12,c:C.mut})+`<g stroke="${C.ink}" stroke-width="3"><path d="M20 262 H176 M194 262 H940"/><path d="M20 272 H176 M194 272 H940"/></g><path d="M174 278 L182 256 M186 278 L194 256" stroke="${C.mut}" stroke-width="2"/>`;
  const steps=[
    {m:{glc:1,lac:0,gen:'n'},t:'Hay glucosa y no hay lactosa. El represor (producto del gen i) está unido al operador y la ARN polimerasa no puede transcribir. El AMPc es bajo y CAP está libre.'},
    {m:{glc:1,lac:1,gen:'n'},ov:{rep:{x:344,y:221,v:'n'},blk:{o:1},pol:{x:290,y:226,o:1,v:'n'},al0:{o:1},al1:{o:1},mrna:{o:0,d:1},ez1:{o:0},ez2:{o:0},ez3:{o:0}},t:'Llega lactosa. La β-galactosidasa la convierte en alolactosa, el verdadero inductor.'},
    {m:{glc:1,lac:1,gen:'n'},ov:{rep:{x:344,y:221,v:'ind'},blk:{o:1},pol:{x:290,y:226,o:1,v:'n'},mrna:{o:0,d:1},ez1:{o:0},ez2:{o:0},ez3:{o:0}},t:'La alolactosa se une al represor y le cambia la conformación (alosterismo): pierde afinidad por el operador.'},
    {m:{glc:1,lac:1,gen:'n'},t:'El represor se suelta del operador. Pero todavía hay glucosa: el AMPc es bajo, CAP no se une y la polimerasa se une mal → transcripción muy baja (represión catabólica).'},
    {m:{glc:0,lac:1,gen:'n'},ov:{cap:{x:225,y:150,v:'on',o:.85},pol:{x:300,y:155,o:.75,v:'weak'},mrna:{o:.55,d:.8},ez1:{o:.3,s:.75},ez2:{o:.3,s:.75},ez3:{o:.3,s:.75}},t:'La glucosa se agota: la célula produce AMPc, que se une a CAP.'},
    {m:{glc:0,lac:1,gen:'n'},ov:{pol:{x:290,y:226,o:1,v:'n'},mrna:{o:.55,d:.8},ez1:{o:.3,s:.75},ez2:{o:.3,s:.75},ez3:{o:.3,s:.75}},t:'CAP-AMPc se une al sitio CAP (≈ −60) y estimula la unión de la ARN polimerasa al promotor.'},
    {m:{glc:0,lac:1,gen:'n'},ov:{ez1:{o:0,s:.75},ez2:{o:0,s:.75},ez3:{o:0,s:.75}},t:'La ARN polimerasa transcribe lacZ, lacY y lacA en un solo ARNm policistrónico.'},
    {m:{glc:0,lac:1,gen:'n'},t:'Mientras se transcribe, el ARNm se traduce: se forman β-galactosidasa, permeasa y transacetilasa. Expresión máxima: hay lactosa y no hay glucosa.'}];
  return {id:'lac',fig:'Fig. interactiva',title:'Operón lac: control negativo y positivo',vb:[0,0,960,440],bg,parts:P,steps:steps.map(s=>Object.assign(s,{st:()=>lacState(s.m,s.ov)})),
    layers:[['reg','Proteínas reguladoras'],['mol','Moléculas del medio'],['prod','ARNm y enzimas'],['lbl','Etiquetas']],
    views:[['Vista general',[0,0,960,440]],['Región de control',[150,60,300,280]],['Genes y productos',[360,200,580,240]]],
    explore:{init:{glc:1,lac:0,gen:'n'},state:lacState,chain:lacChain},
    links:[['📖 Leer en el capítulo','#libro-reg-2-1'],['🧬 Mutantes y diploides parciales','#libro-reg-3-0'],['🧠 Practicar: operón lac','#banco-reg-lac']],deck:['regulacion.html',/lac/i],
    caption:'Esquema (no a escala) del operón lac de E. coli. Cambia la glucosa, la lactosa o el genotipo y observa cómo cambian el represor, CAP-AMPc y la transcripción.'};
}

// =====================================================================
// 2) SEÑALIZACIÓN: Gs–AMPc–PKA · Gq–PLC–Ca²⁺ · RTK–Ras–MAP cinasa
// =====================================================================
const sigBg=(nuc)=>T(28,40,'EXTERIOR',{a:'start',fs:12,c:C.mut})+memBand(126,170)+T(28,198,'CITOSOL',{a:'start',fs:12,c:C.mut})+(nuc?`<path d="M640 470 V400 Q640 372 668 372 H950 V470" fill="#f3eefb" stroke="${C.pur}" stroke-width="2"/><path d="M648 470 V402 Q648 380 670 380 H950" fill="none" stroke="${C.pur}" stroke-width="1.2" stroke-dasharray="4 4"/>`+T(930,396,'NÚCLEO',{a:'end',fs:12,c:C.pur}):'');
const helices=(x0,f,s)=>Array.from({length:7},(_,i)=>rr(x0+i*9,120,7,56,f,s,3,1.4)).join('');
const gprot=(lab)=>V('gdp',ell(0,0,25,19,C.lcob,C.cob)+T(0,-1,lab,{fs:15,c:C.cob})+T(0,13,'GDP',{fs:9.5,c:C.mut}))+V('gtp',ell(0,0,25,19,'#bfd0ff',C.cob,2.6)+T(0,-1,lab,{fs:15,c:C.cob})+T(0,13,'GTP',{fs:9.5,c:C.red}));
function cum(base,steps){const out=[];let acc={};steps.forEach(s=>{const n={};for(const k in acc)n[k]=Object.assign({},acc[k]);for(const k in s.set)n[k]=Object.assign({},n[k]||{},s.set[k]);acc=n;out.push(Object.assign({},s,{S:n}))});return out}
function gsScene(){
  const P=[];const add=(id,o)=>P.push(Object.assign({id},o));
  add('rc',{layer:'base',name:'GPCR (receptor acoplado a proteína G)',desc:'Una sola cadena que cruza la membrana siete veces. Al unir la señal cambia de forma y actúa como GEF sobre la proteína G: hace que la α suelte GDP y una GTP. No es la proteína G.',
    svg:V('r',helices(116,C.lpur,C.pur))+V('a',helices(116,'#d9c6f7',C.pur))+L(147,200,'GPCR')});
  add('lg',{layer:'base',name:'Señal (adrenalina o glucagón)',desc:'Molécula hidrosoluble que no cruza la membrana: se une al dominio extracelular del GPCR.',at:{x:147,y:40},svg:dia(0,0,13,C.ocre,C.tan)+L(0,-20,'adrenalina')});
  add('ga',{layer:'base',name:'Gαs',desc:'Subunidad α de la proteína Gs. Inactiva con GDP; activa con GTP. Gαs-GTP activa a la adenilil ciclasa. Tiene actividad GTPasa propia: hidroliza su GTP y se apaga sola (temporizador incorporado).',at:{x:200,y:196,v:'gdp'},svg:gprot('αs')});
  add('bg',{layer:'base',name:'Complejo βγ',desc:'Subunidades β y γ, ancladas a la membrana por lípidos. Se separan de α-GTP (o cambian su relación con ella) y también pueden regular dianas.',at:{x:246,y:200},svg:ell(-10,0,14,14,C.lgrn,C.grn)+ell(12,2,12,12,C.lgrn,C.grn)+T(1,5,'βγ',{fs:13,c:C.grn})});
  add('ac',{layer:'base',name:'Adenilil ciclasa',desc:'Enzima de membrana que convierte ATP en AMPc. No es una cinasa. Gαs-GTP la activa.',
    svg:V('off',rr(372,118,46,62,C.locre,C.tan,10))+V('on',rr(372,118,46,62,'#ffe3a0',C.tan,10,3))+L(395,234,'adenilil ciclasa')});
  const cpPos=[[440,232],[470,260],[505,238],[455,292],[520,282],[490,316]];
  cpPos.forEach(([x,y],i)=>add('cp'+i,{layer:'base',name:'AMPc (segundo mensajero)',desc:'Se produce en gran cantidad (su concentración puede subir unas veinte veces en segundos) y difunde por el citosol. Se une a las subunidades R de la PKA.',at:{x:395,y:200,o:0},svg:dia(0,0,7,'#ffd27a',C.tan)+(i===0?L(0,-13,'AMPc'):'')}));
  add('pr',{layer:'base',name:'PKA: subunidades reguladoras (R)',desc:'En reposo, la PKA es un tetrámero R₂C₂. El AMPc se une a las R, que cambian de forma y liberan a las C.',at:{x:600,y:300},svg:ell(0,-16,22,14,C.lred,C.red)+ell(0,16,22,14,C.lred,C.red)+T(0,-12,'R',{fs:12,c:C.red})+T(0,20,'R',{fs:12,c:C.red})+L(-30,4,'PKA',{a:'end'})});
  add('c1',{layer:'base',name:'PKA: subunidad catalítica (C)',desc:'Cinasa activa una vez liberada: fosforila serinas y treoninas de proteínas diana.',at:{x:636,y:284},svg:ell(0,0,15,15,C.lgrn,C.grn)+T(0,5,'C',{fs:13,c:C.grn})});
  add('c2',{layer:'base',name:'PKA: subunidad catalítica (C)',desc:'Una parte de las C entra al núcleo y fosforila a CREB.',at:{x:636,y:316},svg:ell(0,0,15,15,C.lgrn,C.grn)+T(0,5,'C',{fs:13,c:C.grn})});
  add('tg',{layer:'base',name:'Enzimas del glucógeno (diana)',desc:'Respuesta rápida: en músculo e hígado, la PKA fosforila enzimas que inician la degradación del glucógeno y frenan su síntesis; así la adrenalina libera glucosa en segundos.',at:{x:800,y:240},svg:rr(-58,-20,116,40,'#fff',C.grn,8)+T(0,-2,'enzimas del',{fs:12,c:C.grn})+T(0,12,'glucógeno',{fs:12,c:C.grn})+V('p',pB(54,-18))+V('n','')});
  add('cr',{layer:'base',name:'CREB',desc:'Respuesta lenta: factor de transcripción que la PKA fosforila en el núcleo; se une a secuencias CRE y, con su coactivador, enciende genes.',at:{x:850,y:428},svg:rr(-34,-15,68,30,'#fff',C.pur,8)+T(0,5,'CREB',{fs:13,c:C.pur})+V('p',pB(32,-14)+L(0,32,'CRE → genes'))+V('n','')});
  add('pd',{layer:'off',name:'AMPc fosfodiesterasa',desc:'Degrada el AMPc a AMP y apaga la señal.',at:{x:470,y:400},svg:ell(0,0,46,18,C.lred,C.red)+T(0,5,'fosfodiesterasa',{fs:11.5,c:C.red})});
  const steps=cum({},[
    {t:'Reposo: la Gαs tiene GDP unido y está asociada a βγ. La adenilil ciclasa está inactiva y la PKA es un tetrámero R₂C₂ inactivo.',ro:'Gαs-GDP · AMPc basal · PKA inactiva',set:{lg:{x:147,y:40},rc:{v:'r'},ga:{x:200,y:196,v:'gdp'},bg:{x:246,y:200},ac:{v:'off'},c1:{x:636,y:284},c2:{x:636,y:316},tg:{v:'n'},cr:{v:'n'},pd:{x:470,y:400}}},
    {t:'La adrenalina se une al GPCR, que cambia de forma.',ro:'Receptor ocupado',set:{lg:{x:147,y:104},rc:{v:'a'}}},
    {t:'El receptor actúa como GEF: la Gαs suelta el GDP y une GTP.',ro:'Gαs-GTP · activa',set:{ga:{v:'gtp'}}},
    {t:'La Gαs-GTP se separa de βγ y se desplaza por la membrana hasta la adenilil ciclasa, que se activa.',ro:'Adenilil ciclasa activa',set:{ga:{x:338,y:200},ac:{v:'on'}}},
    {t:'La adenilil ciclasa convierte ATP en AMPc. El AMPc se acumula y difunde: es el segundo mensajero (amplificación).',ro:'AMPc ↑ (≈20 veces en segundos)',set:Object.fromEntries(cpPos.map(([x,y],i)=>['cp'+i,{x,y,o:1}]))},
    {t:'El AMPc se une a las subunidades R de la PKA, que cambian de forma y liberan a las C, ahora activas.',ro:'PKA activa: C libres',set:Object.assign(Object.fromEntries(cpPos.map((_,i)=>['cp'+i,{x:576+(i%2)*48,y:282+Math.floor(i/2)*18,o:1}])),{c1:{x:690,y:262},c2:{x:690,y:330}})},
    {t:'Respuesta rápida (citosol): la PKA fosforila enzimas que inician la degradación del glucógeno.',ro:'Enzimas fosforiladas · respuesta rápida',set:{c1:{x:726,y:240},tg:{v:'p'}}},
    {t:'Respuesta lenta (núcleo): la PKA entra al núcleo y fosforila a CREB, que activa genes con elementos CRE.',ro:'CREB-P · transcripción de genes',set:{c2:{x:790,y:428},cr:{v:'p'}}},
    {t:'Apagado: la Gαs hidroliza su GTP y vuelve con βγ; la fosfodiesterasa degrada el AMPc a AMP; las C se reasocian con las R.',ro:'Señal apagada',fail:1,set:Object.assign(Object.fromEntries(cpPos.map((_,i)=>['cp'+i,{x:450+i*8,y:400,o:0}])),{lg:{x:147,y:40},rc:{v:'r'},ga:{x:200,y:196,v:'gdp'},ac:{v:'off'},c1:{x:636,y:284},c2:{x:636,y:316},tg:{v:'n'},cr:{v:'n'}})}]);
  return {id:'gs',tab:'Gαs → AMPc → PKA',fig:'Fig. interactiva',title:'Vía del AMPc (receptor acoplado a Gs)',vb:[0,0,960,470],bg:sigBg(1),parts:P,steps,
    layers:[['off','Mecanismos de apagado'],['lbl','Etiquetas']],views:[['Vista general',[0,0,960,470]],['Membrana: receptor → proteína G → ciclasa',[60,10,440,260]],['PKA y respuestas',[520,190,440,280]]],
    fail:{lbl:'¿Y si la Gαs no pudiera hidrolizar su GTP?',t:'La Gαs queda unida a GTP: la adenilil ciclasa sigue produciendo AMPc y la PKA sigue activa aunque ya no haya señal. (Es lo que hace la toxina del cólera con la Gαs.)',ro:'Gαs-GTP permanente · AMPc alto',set:{ga:{x:338,y:200,v:'gtp'},ac:{v:'on'},c1:{x:726,y:240},c2:{x:790,y:428},tg:{v:'p'},cr:{v:'p'},...Object.fromEntries(cpPos.map(([x,y],i)=>['cp'+i,{x,y,o:1}]))}},
    links:[['📖 Leer: proteína G y AMPc','#libro-senal-3-1'],['🧠 Practicar: vía del AMPc','#banco-senal-ampc']],deck:['senalizacion.html',/AMPc/]};
}
function gqScene(){
  const P=[];const add=(id,o)=>P.push(Object.assign({id},o));
  add('rc',{layer:'base',name:'GPCR',desc:'Receptor de siete hélices acoplado a Gq. Al unir la señal actúa como GEF sobre la proteína G.',svg:V('r',helices(116,C.lpur,C.pur))+V('a',helices(116,'#d9c6f7',C.pur))+L(147,200,'GPCR')});
  add('lg',{layer:'base',name:'Señal',desc:'Ligando hidrosoluble de un GPCR acoplado a Gq.',at:{x:147,y:40},svg:dia(0,0,13,C.ocre,C.tan)+L(0,-20,'señal')});
  add('ga',{layer:'base',name:'Gαq',desc:'Subunidad α de Gq. Con GTP activa a la fosfolipasa C-β. Hidroliza su GTP y se apaga.',at:{x:200,y:196,v:'gdp'},svg:gprot('αq')});
  add('bg',{layer:'base',name:'Complejo βγ',desc:'Subunidades β y γ de la proteína G trimérica.',at:{x:246,y:200},svg:ell(-10,0,14,14,C.lgrn,C.grn)+ell(12,2,12,12,C.lgrn,C.grn)+T(1,5,'βγ',{fs:13,c:C.grn})});
  add('pl',{layer:'base',name:'Fosfolipasa C-β (PLC-β)',desc:'Enzima que corta el fosfolípido PIP₂ de la membrana en dos segundos mensajeros: IP₃ y DAG.',svg:V('off',rr(376,172,64,34,C.locre,C.tan,12))+V('on',rr(376,172,64,34,'#ffe3a0',C.tan,12,3))+T(408,194,'PLC-β',{fs:13,c:C.tan})});
  add('pip',{layer:'base',name:'PIP₂ (fosfolípido de inositol)',desc:'Fosfolípido de la cara citosólica de la membrana. La PLC-β lo corta en IP₃ (hidrosoluble) y DAG (queda en la membrana).',at:{x:0,y:0},svg:V('n',[470,492,514].map(x=>`<circle cx="${x}" cy="164" r="7" fill="${C.lpur}" stroke="${C.pur}" stroke-width="1.6"/><path d="M${x-2} 156 V132 M${x+2} 156 V132" stroke="${C.tan}" stroke-width="1.6"/>`).join('')+L(492,214,'PIP₂'))+V('cut',`<circle cx="514" cy="164" r="7" fill="${C.lpur}" stroke="${C.pur}" stroke-width="1.6"/><path d="M512 156 V132 M516 156 V132" stroke="${C.tan}" stroke-width="1.6"/>`)});
  add('dag',{layer:'base',name:'DAG (diacilglicerol)',desc:'Segundo mensajero lipídico: queda en la membrana y, junto con el Ca²⁺, activa a la proteína cinasa C (PKC).',at:{x:478,y:150,o:0},svg:`<path d="M-4 0 V-20 M4 0 V-20" stroke="${C.tan}" stroke-width="2.4"/><circle cx="0" cy="4" r="5" fill="${C.ocre}"/>`+L(0,40,'DAG')});
  const ipPos=[[470,250],[440,290],[410,320]];
  ipPos.forEach((p,i)=>add('ip'+i,{layer:'base',name:'IP₃ (inositol trifosfato)',desc:'Segundo mensajero hidrosoluble: difunde por el citosol y abre canales de Ca²⁺ del retículo endoplásmico.',at:{x:480,y:190,o:0},svg:`<polygon points="0,-8 8,6 -8,6" fill="${C.lpur}" stroke="${C.pur}" stroke-width="1.6"/>`+(i===0?L(0,-14,'IP₃'):'')}));
  add('re',{layer:'base',name:'Retículo endoplásmico',desc:'Reservorio de Ca²⁺: su concentración dentro es miles de veces mayor que en el citosol (≈10⁻⁷ M). Bombas que gastan ATP mantienen esa diferencia.',svg:`<path d="M30 470 V392 Q30 360 62 360 H330 Q362 360 362 392 V470" fill="#eaf4ee" stroke="${C.grn}" stroke-width="2"/>`+T(50,452,'RETÍCULO ENDOPLÁSMICO',{a:'start',fs:12,c:C.grn})});
  add('ch',{layer:'base',name:'Canal de Ca²⁺ sensible a IP₃',desc:'Canal de la membrana del retículo que se abre cuando une IP₃: el Ca²⁺ sale al citosol a favor de su gradiente.',at:{x:300,y:360},svg:V('c',rr(-16,-12,12,24,C.lgrn,C.grn,3)+rr(4,-12,12,24,C.lgrn,C.grn,3))+V('o',rr(-22,-12,12,24,'#bfe3cf',C.grn,3,2.6)+rr(10,-12,12,24,'#bfe3cf',C.grn,3,2.6))+L(30,4,'canal',{a:'start'})});
  const caIn=[[90,400],[130,420],[170,395],[210,425],[250,400],[110,440],[190,445],[280,430]],caOut=[[330,300],[370,270],[420,350],[560,250],[600,236],[700,300],[716,320],[740,296]];
  caIn.forEach(([x,y],i)=>add('ca'+i,{layer:'base',name:'Ca²⁺',desc:'Mensajero muy eficaz: como en el citosol está muy bajo, basta abrir unos canales para que suba rápido. Activa a la PKC (con DAG) y a la calmodulina.',at:{x,y},svg:ell(0,0,6,6,'#8fd1ad',C.grn,1.4)+(i===0?L(0,-11,'Ca²⁺'):'')}));
  add('pk',{layer:'base',name:'Proteína cinasa C (PKC)',desc:'Cinasa que se activa en la membrana cuando hay DAG y Ca²⁺; fosforila otras proteínas.',at:{x:600,y:330},svg:V('i',ell(0,0,30,18,C.lred,C.red)+T(0,5,'PKC',{fs:13,c:C.red}))+V('a',ell(0,0,30,18,'#f3b9ab',C.red,3)+T(0,5,'PKC',{fs:13,c:C.red})+pB(28,-14))});
  add('cm',{layer:'base',name:'Calmodulina',desc:'Proteína con cuatro sitios de unión a Ca²⁺. Al unirlo cambia de forma y activa dianas, como las CaM-cinasas.',at:{x:740,y:330},svg:V('i',ell(0,0,32,16,'#fff',C.grn)+T(0,5,'calmodulina',{fs:10.5,c:C.grn}))+V('a',ell(0,0,32,16,C.lgrn,C.grn,3)+T(0,5,'calmodulina',{fs:10.5,c:C.grn}))});
  add('ck',{layer:'base',name:'CaM-cinasa',desc:'Cinasa dependiente de Ca²⁺/calmodulina: fosforila proteínas diana.',at:{x:860,y:330},svg:V('i',rr(-36,-15,72,30,'#fff',C.grn,8)+T(0,5,'CaM-cinasa',{fs:11,c:C.grn}))+V('a',rr(-36,-15,72,30,C.lgrn,C.grn,8,3)+T(0,5,'CaM-cinasa',{fs:11,c:C.grn})+pB(34,-14))});
  add('bo',{layer:'off',name:'Bomba de Ca²⁺ (gasta ATP)',desc:'Regresa el Ca²⁺ al retículo (y lo saca de la célula) y mantiene su concentración citosólica muy baja: apaga la señal.',at:{x:120,y:360},svg:rr(-18,-12,36,24,C.locre,C.tan,6)+T(0,5,'ATP',{fs:10,c:C.tan})+L(0,-20,'bomba')});
  const steps=cum({},[
    {t:'Reposo: Gαq con GDP; el Ca²⁺ está guardado en el retículo; la PKC y la calmodulina están inactivas.',ro:'Ca²⁺ citosólico ≈ 10⁻⁷ M',set:Object.assign({lg:{x:147,y:40},rc:{v:'r'},ga:{x:200,y:196,v:'gdp'},bg:{x:246,y:200},pl:{v:'off'},pip:{v:'n'},dag:{o:0},ch:{v:'c'},pk:{x:600,y:330,v:'i'},cm:{v:'i'},ck:{v:'i'}},Object.fromEntries(caIn.map(([x,y],i)=>['ca'+i,{x,y,o:1}])),Object.fromEntries(ipPos.map((_,i)=>['ip'+i,{x:492,y:190,o:0}])))},
    {t:'La señal se une al GPCR, que actúa como GEF: la Gαq cambia GDP por GTP.',ro:'Gαq-GTP',set:{lg:{x:147,y:104},rc:{v:'a'},ga:{v:'gtp'}}},
    {t:'La Gαq-GTP activa a la fosfolipasa C-β.',ro:'PLC-β activa',set:{ga:{x:350,y:196},pl:{v:'on'}}},
    {t:'La PLC-β corta el PIP₂ en dos segundos mensajeros: IP₃ (sale al citosol) y DAG (queda en la membrana).',ro:'IP₃ + DAG',set:Object.assign({pip:{v:'cut'},dag:{o:1}},Object.fromEntries(ipPos.map(([x,y],i)=>['ip'+i,{x,y,o:1}])))},
    {t:'El IP₃ difunde y abre los canales de Ca²⁺ del retículo: el Ca²⁺ sale al citosol a favor de su gradiente.',ro:'Ca²⁺ citosólico ↑',set:Object.assign({ch:{v:'o'}},Object.fromEntries(ipPos.map((_,i)=>['ip'+i,{x:272+i*12,y:338,o:1}])),Object.fromEntries(caOut.map(([x,y],i)=>['ca'+i,{x,y,o:1}])))},
    {t:'El DAG, junto con el Ca²⁺, activa a la proteína cinasa C, que se une a la membrana y fosforila proteínas.',ro:'PKC activa',set:{pk:{x:540,y:205,v:'a'},ca3:{x:560,y:228},ca4:{x:520,y:232}}},
    {t:'El Ca²⁺ se une a la calmodulina (4 sitios), que cambia de forma y activa a las CaM-cinasas.',ro:'Ca²⁺-calmodulina → CaM-cinasa',set:{cm:{v:'a'},ck:{v:'a'},ca5:{x:722,y:316},ca6:{x:740,y:312},ca7:{x:758,y:316}}},
    {t:'Apagado: las bombas que gastan ATP regresan el Ca²⁺ al retículo; la Gαq hidroliza su GTP y la vía se detiene.',ro:'Señal apagada',set:Object.assign({lg:{x:147,y:40},rc:{v:'r'},ga:{x:200,y:196,v:'gdp'},pl:{v:'off'},ch:{v:'c'},pk:{x:600,y:330,v:'i'},cm:{v:'i'},ck:{v:'i'},dag:{o:0},pip:{v:'n'}},Object.fromEntries(caIn.map(([x,y],i)=>['ca'+i,{x,y,o:1}])),Object.fromEntries(ipPos.map((_,i)=>['ip'+i,{x:300,y:350,o:0}])))}]);
  return {id:'gq',tab:'Gαq → PLC → IP₃ / Ca²⁺',fig:'Fig. interactiva',title:'Vía de la fosfolipasa C, el IP₃ y el Ca²⁺',vb:[0,0,960,470],bg:sigBg(0),parts:P,steps,
    layers:[['off','Mecanismos de apagado'],['lbl','Etiquetas']],views:[['Vista general',[0,0,960,470]],['Membrana: PLC-β, PIP₂, IP₃ y DAG',[60,10,560,320]],['Retículo y Ca²⁺',[0,180,560,290]]],
    links:[['📖 Leer: PLC, IP₃ y Ca²⁺','#libro-senal-3-2'],['🧠 Practicar: Ca²⁺','#banco-senal-calcio']],deck:['senalizacion.html',/IP₃|fosfolipasa|PLC/]};
}
function rtkScene(){
  const P=[];const add=(id,o)=>P.push(Object.assign({id},o));
  const mono=(lab)=>ell(0,-74,22,26,C.lpur,C.pur)+rr(-5,-50,10,46,'#d9c6f7',C.pur,2,1.4)+rr(-17,-2,34,64,'#fff',C.pur,8)+V('n',T(0,36,'Y',{fs:12,c:C.mut}))+V('p',pB(0,18)+pB(0,44))+L(0,84,lab);
  add('r1',{layer:'base',name:'Receptor tirosina cinasa (monómero)',desc:'Dominio extracelular que une la señal, una sola hélice transmembrana y un dominio citosólico con actividad de tirosina cinasa.',at:{x:170,y:150,v:'n'},svg:mono('RTK')});
  add('r2',{layer:'base',name:'Receptor tirosina cinasa (monómero)',desc:'Al formar el dímero, cada dominio cinasa fosforila tirosinas del otro: transautofosforilación.',at:{x:300,y:150,v:'n'},svg:mono('RTK')});
  add('lg',{layer:'base',name:'Factor de crecimiento (p. ej. EGF, PDGF)',desc:'La señal une dos receptores y forma un dímero.',at:{x:235,y:30},svg:ell(-9,0,11,11,C.ocre,C.tan,1.6)+ell(9,0,11,11,C.ocre,C.tan,1.6)+L(0,-18,'factor de crecimiento')});
  add('g2',{layer:'base',name:'Grb2 (adaptador con dominio SH2)',desc:'Se une con su dominio SH2 a una tirosina fosforilada del receptor y trae a Sos.',at:{x:330,y:390,o:.45},svg:ell(0,0,26,16,'#fff',C.cob)+T(0,5,'Grb2',{fs:12,c:C.cob})});
  add('so',{layer:'base',name:'Sos (GEF de Ras)',desc:'Factor intercambiador: hace que Ras suelte GDP y una GTP. Es el que enciende a Ras.',at:{x:420,y:410,o:.45},svg:ell(0,0,26,16,'#fff',C.cob)+T(0,5,'Sos',{fs:12,c:C.cob})});
  add('ra',{layer:'base',name:'Ras (GTPasa monomérica)',desc:'Anclada a la cara citosólica de la membrana. Activa con GTP, inactiva con GDP; se apaga al hidrolizar su GTP, con ayuda de una Ras-GAP.',at:{x:470,y:196,v:'gdp'},svg:V('gdp',ell(0,0,26,18,'#fff',C.red)+T(0,-1,'Ras',{fs:13,c:C.red})+T(0,12,'GDP',{fs:9.5,c:C.mut}))+V('gtp',ell(0,0,26,18,'#f6cfc6',C.red,3)+T(0,-1,'Ras',{fs:13,c:C.red})+T(0,12,'GTP',{fs:9.5,c:C.red}))});
  [['rf','Raf (MAPKKK)',575,236,'Raf'],['mk','MEK (MAPKK)',650,290,'MEK'],['ek','ERK (MAPK)',725,340,'ERK']].forEach(([id,n,x,y,lab])=>add(id,{layer:'base',name:n,desc:id==='ek'?'Última cinasa del módulo de MAP cinasa: fosforila proteínas del citosol y entra al núcleo, donde fosforila reguladores de genes de proliferación y diferenciación.':'Cinasa del módulo de MAP cinasa: Raf → MEK → ERK. Cada una fosforila y activa a la siguiente.',at:{x,y,v:'n'},svg:V('n',rr(-28,-15,56,30,'#fff',C.grn,8)+T(0,5,lab,{fs:13,c:C.grn}))+V('p',rr(-28,-15,56,30,C.lgrn,C.grn,8,3)+T(0,5,lab,{fs:13,c:C.grn})+pB(26,-14))}));
  add('gn',{layer:'base',name:'Genes de proliferación y diferenciación',desc:'Reguladores de genes que ERK fosforila en el núcleo.',at:{x:872,y:430},svg:V('n',rr(-46,-15,92,30,'#fff',C.pur,8)+T(0,5,'genes',{fs:12,c:C.pur}))+V('p',rr(-46,-15,92,30,'#f3eefb',C.pur,8,3)+T(0,5,'genes activos',{fs:12,c:C.pur}))});
  add('pi',{layer:'base',name:'PI3K (otra vía)',desc:'También se une al receptor fosforilado: fosforila PIP₂ → PIP₃, que recluta a Akt (supervivencia, crecimiento, captación de glucosa). Está en el capítulo: «La vía PI3K-Akt».',at:{x:110,y:270,o:0},svg:ell(0,0,30,16,'#fff',C.mut,1.6,1)+T(0,5,'PI3K',{fs:12,c:C.mut})});
  add('pg',{layer:'base',name:'PLC-γ (otra vía)',desc:'Se une a otra tirosina fosforilada y, como la PLC-β, produce IP₃ y DAG.',at:{x:110,y:320,o:0},svg:ell(0,0,30,16,'#fff',C.mut,1.6,1)+T(0,5,'PLC-γ',{fs:12,c:C.mut})});
  add('gp',{layer:'off',name:'Ras-GAP',desc:'Proteína activadora de la GTPasa: acelera que Ras hidrolice su GTP, es decir, la apaga.',at:{x:470,y:300},svg:ell(0,0,30,15,C.lred,C.red)+T(0,5,'Ras-GAP',{fs:11,c:C.red})});
  const steps=cum({},[
    {t:'Dos receptores tirosina cinasa separados: inactivos. Ras tiene GDP.',ro:'Receptores separados · Ras-GDP',set:{lg:{x:235,y:30},r1:{x:170,y:150,v:'n'},r2:{x:300,y:150,v:'n'},g2:{x:330,y:390,o:.45},so:{x:420,y:410,o:.45},ra:{v:'gdp'},rf:{x:575,y:236,v:'n'},mk:{v:'n'},ek:{x:725,y:340,v:'n'},gn:{v:'n'},pi:{o:0},pg:{o:0},gp:{x:470,y:300}}},
    {t:'El factor de crecimiento une dos receptores y forma un dímero.',ro:'Dímero',set:{lg:{x:235,y:58},r1:{x:212,y:150},r2:{x:258,y:150}}},
    {t:'Los dominios cinasa quedan juntos y cada uno fosforila tirosinas del otro (transautofosforilación).',ro:'Tirosinas fosforiladas',set:{r1:{v:'p'},r2:{v:'p'}}},
    {t:'Las tirosinas fosforiladas son sitios de anclaje para proteínas con dominio SH2: Grb2 se une y trae a Sos. (Otras tirosinas reclutan a PI3K y PLC-γ: la señal se ramifica.)',ro:'Grb2–Sos en el receptor',set:{g2:{x:288,y:238,o:1},so:{x:356,y:252,o:1},pi:{x:150,y:250,o:1},pg:{x:150,y:296,o:1}}},
    {t:'Sos (un GEF) hace que Ras suelte GDP y una GTP: Ras se enciende.',ro:'Ras-GTP',set:{ra:{v:'gtp'}}},
    {t:'Ras-GTP activa una cascada de tres cinasas: Raf (MAPKKK) → MEK (MAPKK) → ERK (MAPK). Cada una fosforila a la siguiente.',ro:'Raf → MEK → ERK fosforiladas',set:{rf:{v:'p'},mk:{v:'p'},ek:{v:'p'}}},
    {t:'ERK entra al núcleo y fosforila reguladores de genes que favorecen la proliferación y la diferenciación.',ro:'ERK nuclear · genes activos',set:{ek:{x:745,y:428},gn:{v:'p'}}},
    {t:'Apagado: la Ras-GAP acelera la hidrólisis del GTP de Ras; Ras-GDP deja de activar la cascada.',ro:'Ras-GDP · señal apagada',fail:1,set:{gp:{x:470,y:236},ra:{v:'gdp'},rf:{v:'n'},mk:{v:'n'},ek:{x:725,y:340,v:'n'},gn:{v:'n'}}}]);
  return {id:'rtk',tab:'RTK → Ras → MAP cinasa',fig:'Fig. interactiva',title:'Receptor tirosina cinasa y vía Ras-MAP cinasa',vb:[0,0,960,470],bg:sigBg(1),parts:P,steps,
    layers:[['off','Mecanismos de apagado'],['lbl','Etiquetas']],views:[['Vista general',[0,0,960,470]],['Receptor y anclaje SH2',[60,0,440,300]],['Ras y cascada de cinasas',[400,150,560,320]]],
    fail:{lbl:'¿Y si Ras no pudiera hidrolizar su GTP?',t:'Ras queda siempre activa: la cascada Raf-MEK-ERK sigue enviando señales de proliferación aunque no haya factor de crecimiento (es lo que ocurre con Ras mutado).',ro:'Ras-GTP permanente · ERK activa',set:{gp:{x:470,y:236},ra:{v:'gtp'},rf:{v:'p'},mk:{v:'p'},ek:{x:745,y:428,v:'p'},gn:{v:'p'}}},
    links:[['📖 Leer: receptores tirosina cinasa','#libro-senal-4-0'],['🧠 Practicar: RTK','#banco-senal-rtk']],deck:['senalizacion.html',/tirosina|Ras/]};
}
const DEFS={lac:()=>({scenes:[lacScene()]}),senal:()=>({scenes:[gsScene(),gqScene(),rtkScene()],caption:'Esquemas (no a escala) de tres vías del capítulo. Avanza paso a paso, toca cada molécula para ver qué hace y prueba qué pasa si falla el apagado.'})};

// =====================================================================
// MOTOR
// =====================================================================
const still=matchMedia('(prefers-reduced-motion: reduce)');
function mount(host,key,opt){
  if(!DEFS[key])return;opt=opt||{};const D=DEFS[key]();let si=Math.max(0,D.scenes.findIndex(s=>s.id===opt.scene));
  const box=document.createElement('div');box.className='viz';host.appendChild(box);
  let SC,mode,step,playing=null,model,sel=null,vb,vbT,fail=false,visible=true,hidden=new Set();
  function deckLink(sc){const d=window.DIAPOS||[];if(!sc.deck)return '';const x=d.find(s=>s.file===sc.deck[0]&&sc.deck[1].test(s.title));return x?`<a href="${x.file}#s${x.n}" target="_self">🎞️ Ver en la presentación</a>`:''}
  function build(){
    SC=D.scenes[si];mode=SC.explore?'explore':'steps';step=0;model=SC.explore?Object.assign({},SC.explore.init):null;sel=null;fail=false;stop();
    vb=SC.views[0][1].slice();vbT=vb.slice();
    const parts=SC.parts.map(p=>`<g class="vp" data-part="${p.id}" data-layer="${p.layer}" tabindex="0" role="button" aria-label="${esc(p.name)}"><g class="pi">${p.svg}</g></g>`).join('');
    box.innerHTML=`<div class="vz-head"><span class="vz-fig">${SC.fig}</span><span class="vz-title">${esc(SC.title)}</span></div>
    ${D.scenes.length>1?`<div class="vz-tabs" role="tablist">${D.scenes.map((s,i)=>`<button type="button" role="tab" aria-selected="${i===si}" data-sc="${i}" class="${i===si?'on':''}">${esc(s.tab)}</button>`).join('')}</div>`:''}
    ${SC.explore?`<div class="vz-tabs"><button type="button" data-md="explore" class="on">🔬 Explorar condiciones</button><button type="button" data-md="steps">▶ Inducción paso a paso</button></div>
    <div class="vz-ctl vz-ex"><span class="vz-tg"><b>Glucosa</b><button type="button" data-tg="glc"></button></span><span class="vz-tg"><b>Lactosa</b><button type="button" data-tg="lac"></button></span><label class="vz-sel"><b>Genotipo</b><select data-gen>${Object.entries(GENS).map(([k,v])=>`<option value="${k}">${esc(v)}</option>`).join('')}</select></label></div>`:''}
    <div class="vz-main"><div class="vz-stagew"><div class="vz-stage" tabindex="0" aria-label="Ilustración interactiva: ${esc(SC.title)}. Flechas izquierda y derecha cambian de paso; Espacio reproduce o pausa."><div class="vz-scroll"><svg viewBox="${vb.join(' ')}" role="img" aria-label="${esc(SC.title)}"><g class="bg">${SC.bg}</g>${parts}</svg></div>
      <div class="vz-zoom"><button type="button" data-z="in" aria-label="Acercar">+</button><button type="button" data-z="out" aria-label="Alejar">−</button><button type="button" data-z="0" aria-label="Restablecer vista">⟲</button></div></div>
      <div class="vz-foot"><span class="vz-hint">Toca una estructura · arrastra para moverte al acercar</span><span class="vz-hintm">Desliza la figura de lado para verla completa</span><span class="vz-ro" aria-live="polite"></span></div></div>
     <aside class="vz-side"><div class="vz-info"><b>Toca una estructura</b><p>Al seleccionarla verás qué es y qué hace. Las demás se atenúan para que veas sus relaciones.</p></div><div class="vz-chain"></div></aside></div>
    <div class="vz-ctl vz-st"><button type="button" data-s="reset">↺ Reiniciar</button><button type="button" data-s="prev">◀ Anterior</button><button type="button" data-s="play">▶ Reproducir</button><button type="button" data-s="next">Siguiente ▶</button><span class="vz-n"></span></div>
    <div class="vz-cap" aria-live="polite"></div>
    ${SC.fail?`<label class="vz-fail"><input type="checkbox" data-fail> ${esc(SC.fail.lbl)}</label>`:''}
    <div class="vz-ctl vz-op"><span class="vz-k">Vista</span>${SC.views.map((v,i)=>`<button type="button" data-vw="${i}" class="${i?'':'on'}">${esc(v[0])}</button>`).join('')}<span class="vz-k">Mostrar</span>${SC.layers.map(([k,n])=>`<label><input type="checkbox" data-ly="${k}" ${hidden.has(k)?'':'checked'}> ${esc(n)}</label>`).join('')}</div>
    <div class="vz-links">${SC.links.map(([n,h])=>`<a href="${h}">${n}</a>`).join('')}${deckLink(SC)}</div>
    <p class="vz-capt">${esc(SC.caption||D.caption||'')}</p>`;
    wire();apply();
  }
  const $=s=>box.querySelector(s),$$=s=>[...box.querySelectorAll(s)];
  function stateNow(){
    if(mode==='explore'){const r=SC.explore.state(model);return {S:r.S,ro:r.ro,t:null,chain:SC.explore.chain(model)}}
    const st=SC.steps[step];let S,ro;if(st.st){const r=st.st();S=r.S;ro=r.ro}else{S=st.S;ro=st.ro}
    let t=st.t;if(SC.fail&&fail&&step>=SC.steps.findIndex(x=>x.fail)&&SC.steps.findIndex(x=>x.fail)>=0){S=Object.assign({},S);for(const k in SC.fail.set)S[k]=Object.assign({},S[k],SC.fail.set[k]);ro=SC.fail.ro;t=SC.fail.t}
    return {S,ro,t};
  }
  function apply(){
    const {S,ro,t,chain}=stateNow();
    SC.parts.forEach(p=>{const g=box.querySelector(`[data-part="${p.id}"]`);const s=Object.assign({x:0,y:0,o:1,s:1,r:0},p.at||{},S[p.id]||{});
      g.style.transform=`translate(${s.x}px,${s.y}px) rotate(${s.r}deg) scale(${s.s})`;g.style.opacity=s.o;g.style.pointerEvents=s.o<.05?'none':'';g.setAttribute('tabindex',s.o<.05?'-1':'0');
      g.querySelectorAll(':scope>.pi>[data-v]').forEach(v=>v.style.display=(v.dataset.v===(s.v||v.parentNode.querySelector('[data-v]').dataset.v))?'':'none');
      const gr=g.querySelector('.grow');if(gr)gr.style.strokeDashoffset=s.d==null?0:s.d});
    $('.vz-ro').textContent=ro||'';
    const stc=$('.vz-st');stc.style.display=mode==='steps'?'':'none';$('.vz-cap').style.display=mode==='steps'?'':'none';
    if($('.vz-ex'))$('.vz-ex').style.display=mode==='explore'?'':'none';
    if($('.vz-fail'))$('.vz-fail').style.display=mode==='steps'?'':'none';
    if(mode==='steps'){$('.vz-n').textContent=`Paso ${step+1} de ${SC.steps.length}`;$('.vz-cap').innerHTML=`<b>Paso ${step+1}.</b> ${esc(t)}`;$('[data-s=prev]').disabled=step===0;$('[data-s=next]').disabled=step===SC.steps.length-1;$('[data-s=play]').textContent=playing?'⏸ Pausa':(step>0&&step<SC.steps.length-1?'▶ Continuar':'▶ Reproducir')}
    if(model){$$('[data-tg]').forEach(b=>{const on=!!model[b.dataset.tg];b.textContent=on?'Sí':'No';b.className=on?'on':'';b.setAttribute('aria-pressed',on)});$('[data-gen]').value=model.gen}
    $('.vz-chain').innerHTML=mode==='explore'&&chain?`<b>Qué está pasando</b><ol>${chain.map(x=>`<li>${esc(x)}</li>`).join('')}</ol>`:'';
    box.classList.toggle('hassel',!!sel);$$('.vp').forEach(g=>g.classList.toggle('sel',g.dataset.part===sel));
    box.classList.toggle('nolbl',hidden.has('lbl'));SC.layers.forEach(([k])=>{if(k!=='lbl')box.classList.toggle('hide-'+k,hidden.has(k))});
  }
  function select(id){sel=sel===id?null:id;const p=SC.parts.find(x=>x.id===id);$('.vz-info').innerHTML=sel&&p?`<b>${esc(p.name)}</b><p>${esc(p.desc)}</p><button type="button" class="vz-x">Quitar selección</button>`:'<b>Toca una estructura</b><p>Al seleccionarla verás qué es y qué hace.</p>';const x=$('.vz-x');if(x)x.onclick=()=>select(sel);apply()}
  function go(n){step=Math.max(0,Math.min(SC.steps.length-1,n));apply()}
  function stop(){if(playing){clearTimeout(playing);playing=null}}
  function play(){if(playing){stop();apply();return}if(step>=SC.steps.length-1)step=-1;const tick=()=>{go(step+1);if(step<SC.steps.length-1)playing=setTimeout(()=>{if(visible)tick();else stop()},still.matches?2600:3400);else{playing=null;apply()}};playing=1;tick()}
  // vista y zoom (viewBox animado)
  let vbRaf=0;function setVB(t){vbT=t.slice();if(still.matches){vb=t.slice();drawVB();return}if(!vbRaf)vbRaf=requestAnimationFrame(animVB)}
  let lastT=0;function animVB(now){const dt=lastT?Math.min((now-lastT)/1000,1/30):1/60;lastT=now;let done=true;for(let i=0;i<4;i++){vb[i]+=(vbT[i]-vb[i])*(1-Math.exp(-dt/.18));if(Math.abs(vbT[i]-vb[i])>.3)done=false;else vb[i]=vbT[i]}drawVB();vbRaf=done?0:requestAnimationFrame(animVB);if(done)lastT=0}
  function drawVB(){const sv=$('svg');sv.setAttribute('viewBox',vb.map(v=>v.toFixed(1)).join(' '));const full=SC.vb;const z=vbT[2]<full[2]-1;$('.vz-stage').classList.toggle('zoomed',z)}
  function clampVB(v){const F=SC.vb,ar=F[3]/F[2];v[2]=Math.min(F[2],Math.max(F[2]/5,v[2]));v[3]=v[2]*ar;v[0]=Math.max(F[0],Math.min(F[0]+F[2]-v[2],v[0]));v[1]=Math.max(F[1],Math.min(F[1]+F[3]-v[3],v[1]));return v}
  function zoom(f){const c=[vbT[0]+vbT[2]/2,vbT[1]+vbT[3]/2];const w=vbT[2]*f,h=vbT[3]*f;setVB(clampVB([c[0]-w/2,c[1]-h/2,w,h]))}
  function view(i){const v=SC.views[i][1];const F=SC.vb,ar=F[3]/F[2];let [x,y,w,h]=v;if(h/w>ar){const nw=h/ar;x-=(nw-w)/2;w=nw}else{const nh=w*ar;y-=(nh-h)/2;h=nh}vbT=[x,y,w,h];setVB(clampVB([x,y,w,h]));$$('[data-vw]').forEach(b=>b.classList.toggle('on',+b.dataset.vw===i))}
  function wire(){
    $$('[data-sc]').forEach(b=>b.onclick=()=>{si=+b.dataset.sc;build()});
    $$('[data-md]').forEach(b=>b.onclick=()=>{mode=b.dataset.md;stop();step=0;$$('[data-md]').forEach(x=>x.classList.toggle('on',x===b));apply()});
    $$('[data-tg]').forEach(b=>b.onclick=()=>{model[b.dataset.tg]=model[b.dataset.tg]?0:1;apply()});
    const gs=$('[data-gen]');if(gs)gs.onchange=()=>{model.gen=gs.value;apply()};
    $('[data-s=reset]').onclick=()=>{stop();fail=false;const f=$('[data-fail]');if(f)f.checked=false;go(0)};$('[data-s=prev]').onclick=()=>{stop();go(step-1)};$('[data-s=next]').onclick=()=>{stop();go(step+1)};$('[data-s=play]').onclick=play;
    const fb=$('[data-fail]');if(fb)fb.onchange=()=>{fail=fb.checked;const k=SC.steps.findIndex(x=>x.fail);if(fail&&step<k){stop();go(k)}else apply()};
    $$('[data-vw]').forEach(b=>b.onclick=()=>view(+b.dataset.vw));
    $$('[data-ly]').forEach(c=>c.onchange=()=>{c.checked?hidden.delete(c.dataset.ly):hidden.add(c.dataset.ly);apply()});
    $$('[data-z]').forEach(b=>b.onclick=()=>{const z=b.dataset.z;if(z==='0')view(0);else zoom(z==='in'?.7:1/.7)});
    $$('.vp').forEach(g=>{g.onclick=e=>{e.stopPropagation();select(g.dataset.part)};g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(g.dataset.part)}}});
    const st=$('.vz-stage');
    st.onkeydown=e=>{if(e.target!==st)return;if(e.key==='ArrowRight'&&mode==='steps'){e.preventDefault();stop();go(step+1)}else if(e.key==='ArrowLeft'&&mode==='steps'){e.preventDefault();stop();go(step-1)}else if(e.key===' '&&mode==='steps'){e.preventDefault();play()}else if(e.key==='Escape'&&sel)select(sel)};
    // arrastrar para moverse cuando hay acercamiento
    let drag=null;st.onpointerdown=e=>{if(!st.classList.contains('zoomed')||e.target.closest('.vz-zoom'))return;drag={x:e.clientX,y:e.clientY,v:vbT.slice(),moved:false};};
    st.onpointermove=e=>{if(!drag)return;const r=st.getBoundingClientRect(),k=vbT[2]/r.width;const dx=(e.clientX-drag.x)*k,dy=(e.clientY-drag.y)*k;if(Math.abs(dx)+Math.abs(dy)>3){drag.moved=true;try{st.setPointerCapture(e.pointerId)}catch(_){}}if(drag.moved){vbT=clampVB([drag.v[0]-dx,drag.v[1]-dy,drag.v[2],drag.v[3]]);vb=vbT.slice();drawVB()}};
    st.onpointerup=st.onpointercancel=e=>{if(drag&&drag.moved){e.preventDefault()}drag=null};
    st.addEventListener('click',e=>{if(!e.target.closest('.vp')&&!e.target.closest('.vz-zoom')&&sel)select(sel)});
  }
  if('IntersectionObserver' in window)new IntersectionObserver(es=>{visible=es[es.length-1].isIntersecting;if(!visible)stop()},{rootMargin:'120px 0px'}).observe(box);
  build();
  return box;
}
window.VIZ={mount,list:{lac:'Operón lac: control negativo y positivo',senal:'Vías de señalización: AMPc, Ca²⁺ y Ras-MAP cinasa'}};
})();
