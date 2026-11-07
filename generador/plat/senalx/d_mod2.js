(function(){
'use strict';
const X=window.__SX,{S,esc,frame,onView,RM}=X;
// ======================= FIG. 3 · RECEPTORES =======================
const RT=[
 {id:'canal',n:'Canal iónico',how:'El receptor es un canal: la señal lo abre o lo cierra y cambia el paso de iones y el potencial de membrana.',ex:'Receptor nicotínico de acetilcolina del músculo esquelético',
  ph:['Llega la acetilcolina','Se une al canal','El canal se abre','Pasan iones: cambia el potencial de membrana']},
 {id:'gpcr',n:'Acoplado a proteína G',how:'Siete hélices transmembrana; al unir la señal activa una proteína G trimérica que regula una enzima o un canal.',ex:'Receptores de adrenalina, glucagón, acetilcolina cardíaca, rodopsina, olfato',
  ph:['Llega la señal','Se une al receptor de 7 hélices','Cambia de forma y actúa como GEF: α cambia GDP por GTP','α-GTP se separa de βγ y regula una enzima o un canal']},
 {id:'rtk',n:'Acoplado a enzima (RTK)',how:'Son enzimas o se asocian a enzimas; la más importante: tirosina cinasa. La señal une dos receptores que se fosforilan entre sí.',ex:'Receptores de factores de crecimiento (EGF, PDGF) e insulina',
  ph:['Llega el factor de crecimiento','La señal une dos receptores','Dímero: autofosforilación cruzada de tirosinas','Las tirosinas fosforiladas anclan proteínas con dominio SH2']},
 {id:'nuc',n:'Intracelular (nuclear)',how:'La señal, pequeña e hidrofóbica, cruza la membrana. El receptor es a la vez receptor y regulador de la transcripción.',ex:'Cortisol, estradiol, testosterona, hormonas tiroideas, vitamina D, retinoides',
  ph:['La hormona cruza la membrana','Se une a su receptor (en el citosol, unido a Hsp90)','Se libera de Hsp90 y entra al núcleo','Se une al HRE y activa la transcripción']}];
function recScene(id){
  const lab=(x,y,s,c)=>S.t(x,y,s,c);
  switch(id){
  case 'canal':return S.memH(0,640,130,40)+S.t(16,116,'EXTERIOR','cap','start')+S.t(16,200,'CITOSOL','cap','start')+
   `<g class="anim chL"><rect class="f-rcl st-rc" x="290" y="110" width="28" height="80" rx="6"/></g><g class="anim chR"><rect class="f-rcl st-rc" x="320" y="110" width="28" height="80" rx="6"/><path class="st-rc" d="M334 110 v-8" stroke-width="3"/></g>`+
   [[300,62],[318,48],[336,70],[352,54],[286,48]].map(([x,y],i)=>`<g class="anim ion" style="--x:${319-x}px;--y:${250+i*8-y}px;transition-delay:${(i*.12).toFixed(2)}s">${S.dot(x,y,5,'td')}</g>`).join('')+lab(400,58,'iones','c-td')+
   `<g class="anim lg">${S.lig(334,94,10)}</g>`+lab(334,236,'receptor nicotínico de acetilcolina','c-rc')+`<g class="p4o">${lab(470,286,'cambia el potencial de membrana','c-td b')}</g>`;
  case 'gpcr':return S.memH(0,640,120,40)+S.t(16,106,'EXTERIOR','cap','start')+S.t(16,190,'CITOSOL','cap','start')+
   `<g>${Array.from({length:7},(_,i)=>`<rect class="hx f-rcl st-rc${i===5?' anim h6':''}" x="${248+i*13}" y="104" width="9" height="72" rx="4"/>`).join('')}</g>`+lab(290,96,'','')+
   `<rect class="f-sgl st-sg" x="452" y="114" width="44" height="52" rx="10"/>`+lab(474,98,'enzima o canal','c-mu')+
   `<g class="anim ga"><ellipse class="f-tdl st-td" cx="300" cy="206" rx="24" ry="17"/><text class="tx b c-td gdp" x="300" y="210.5" text-anchor="middle">GDP</text><text class="tx b c-of gtp" x="300" y="210.5" text-anchor="middle">GTP</text></g>`+
   `<ellipse class="f-rsl st-rs" cx="338" cy="210" rx="14" ry="13"/>${S.t(338,214,'βγ','c-rs b')}${S.t(300,250,'proteína G αβγ','c-td')}`+
   `<g class="anim lg">${S.lig(292,92,10)}</g>`+lab(290,300,'receptor acoplado a proteína G (7 hélices)','c-rc')+`<g class="p4o">${lab(474,232,'α-GTP regula la enzima','c-td b')}</g>`;
  case 'rtk':{const mono=(x,c)=>`<g class="anim ${c}"><ellipse class="f-rcl st-rc" cx="${x}" cy="84" rx="18" ry="24"/><rect class="f-rc" x="${x-3}" y="108" width="6" height="44"/><rect class="f-rcl st-rc" x="${x-17}" y="152" width="34" height="64" rx="6"/>${S.t(x,190,'Tyr','c-mu')}<g class="pp">${S.P(x,170,8)}${S.P(x,200,8)}</g></g>`;
   return S.memH(0,640,110,40)+S.t(16,98,'EXTERIOR','cap','start')+S.t(16,180,'CITOSOL','cap','start')+mono(250,'m1')+mono(410,'m2')+
   `<g class="anim lg"><ellipse class="f-sg" cx="318" cy="48" rx="12" ry="12"/><ellipse class="f-sg" cx="342" cy="48" rx="12" ry="12"/></g>`+
   `<g class="anim sh2"><ellipse class="f-tdl st-td" cx="520" cy="282" rx="40" ry="19"/>${S.t(520,286,'Grb2 · SH2','c-td b')}</g>`+lab(330,316,'receptor tirosina cinasa','c-rc')}
  case 'nuc':return S.memH(0,640,46,36)+S.t(16,36,'EXTERIOR','cap','start')+S.t(16,108,'CITOSOL','cap','start')+
   `<ellipse class="nucf" cx="470" cy="250" rx="170" ry="80"/>${S.t(600,196,'NÚCLEO','cap c-rc')}<path class="st-mu" d="M320 272 H620 M320 279 H620" stroke-width="2"/><rect class="f-sgl st-sg" x="422" y="266" width="52" height="19" rx="2"/>${S.t(448,304,'HRE','c-sg b')}`+
   `<g class="anim hsp"><ellipse class="f-mul st-mu" cx="206" cy="222" rx="20" ry="13"/>${S.t(206,226,'Hsp90','c-mu')}</g>`+
   `<g class="anim nr"><ellipse class="f-rcl st-rc" cx="180" cy="196" rx="24" ry="18"/>${S.t(180,200,'receptor','c-rc b')}</g>`+
   `<g class="anim lg">${S.lig(160,180,9)}</g>`+`<g class="p4o"><path class="st-rs" d="M480 262 q8 -10 16 0 t16 0 t16 0 t16 0" fill="none" stroke-width="2.4"/>${S.t(560,240,'ARNm','c-rs b')}</g>`;
  }
}
function rec(n){
  const body=`<div class="ex-ctl" role="tablist" aria-label="Tipo de receptor">${RT.map((r,i)=>`<button type="button" class="ex-tab rc-t${i===1?' on':''}" data-r="${r.id}" role="tab" aria-selected="${i===1}">${r.n}</button>`).join('')}<span class="sep"></span><button type="button" class="act" data-a="replay">Repetir</button></div>
   <ol class="rph"></ol><div class="ex-plate ex-scroll"><svg viewBox="0 0 640 330" role="img" aria-label="Animación del receptor"></svg></div>
   <div class="tw"><table class="cmp rtab"><tr><th>Receptor</th><th>Cómo funciona</th><th>Ejemplo</th></tr>${RT.map(r=>`<tr data-r="${r.id}"><td><b>${r.n}</b></td><td>${r.how}</td><td>${r.ex}</td></tr>`).join('')}</table></div>`;
  return frame('rec',n,'Cuatro maneras de recibir una señal',body,'Cada receptor recorre la misma secuencia: ligando → unión → cambio de forma → señal dentro de la célula. Lo que cambia es qué hace el receptor al cambiar de forma.',['A','L']);
}
function wireRec(fig){
  let timers=[];
  const setP=(svg,p,r)=>{svg.setAttribute('class','t-'+r.id+' '+[1,2,3,4].filter(i=>i<=p).map(i=>'p'+i).join(' '));fig.querySelectorAll('.rph li').forEach((li,i)=>{li.classList.toggle('on',i<p);li.classList.toggle('cur',i===p-1)})};
  const show=(id,anim=true)=>{timers.forEach(clearTimeout);timers=[];const r=RT.find(x=>x.id===id);const old=fig.querySelector('.ex-plate svg');const ns=old.cloneNode(false);ns.innerHTML=recScene(id);old.replaceWith(ns);
    fig.querySelector('.rph').innerHTML=r.ph.map((p,i)=>`<li><span>0${i+1}</span>${p}</li>`).join('');
    fig.querySelectorAll('.rc-t').forEach(b=>{const on=b.dataset.r===id;b.classList.toggle('on',on);b.setAttribute('aria-selected',on)});fig.querySelectorAll('.rtab tr[data-r]').forEach(tr=>tr.classList.toggle('on',tr.dataset.r===id));
    fig._r=id;
    if(!anim||RM()){setP(ns,4,r);return}
    setP(ns,0,r);void ns.getBoundingClientRect();[1,2,3,4].forEach((p,i)=>timers.push(setTimeout(()=>setP(ns,p,r),250+i*1250)))};
  fig.querySelectorAll('.rc-t').forEach(b=>b.onclick=()=>show(b.dataset.r));
  fig.querySelector('[data-a=replay]').onclick=()=>show(fig._r);
  show('gpcr',false);
  let seen=false;onView(fig,(v,e)=>{if(v&&!seen&&e.intersectionRatio>=.35){seen=true;show(fig._r)}});
}
X.recCSS=`
.ed #ex-rec .rph{list-style:none;padding:0;margin:0 0 10px;display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-top:1px solid var(--e-rule)}
.ed #ex-rec .rph li{padding:10px 12px 10px 0;font-size:14.5px;line-height:1.4;color:var(--e-mut);border-top:3px solid transparent;margin:-2px 0 0;transition:color .3s,border-color .3s}
.ed #ex-rec .rph li::before{display:none}.ed #ex-rec .rph li span{display:block;font:500 11px var(--e-mono);letter-spacing:.12em;margin-bottom:4px}
.ed #ex-rec .rph li.on{color:var(--e-ink)}.ed #ex-rec .rph li.cur{border-color:var(--e-rc)}
@media (max-width:640px){.ed #ex-rec .rph{grid-template-columns:1fr 1fr}}
.ed #ex-rec .rtab tr.on td{background:var(--e-rcl)}
.ed #ex-rec svg .p4o{opacity:0;transition:opacity .6s}.ed #ex-rec svg.p4 .p4o{opacity:1}
.ed #ex-rec svg:not(.p2) .lg{transform:translate(-170px,-40px)}.ed #ex-rec svg:not(.p1) .lg{opacity:.25}
.ed #ex-rec svg.t-canal.p3 .chL{transform:translate(-12px,0)}.ed #ex-rec svg.t-canal.p3 .chR{transform:translate(12px,0)}
.ed #ex-rec svg.t-canal.p4 .ion{transform:translate(var(--x),var(--y))}
.ed #ex-rec svg.t-gpcr .h6{transform-box:fill-box;transform-origin:50% 100%}.ed #ex-rec svg.t-gpcr.p3 .h6{transform:rotate(14deg)}
.ed #ex-rec svg .gtp{opacity:0;transition:opacity .4s}.ed #ex-rec svg.p3 .gtp{opacity:1}.ed #ex-rec svg.p3 .gdp{opacity:0}.ed #ex-rec svg .gdp{transition:opacity .4s}
.ed #ex-rec svg.t-gpcr.p4 .ga{transform:translate(174px,-20px)}
.ed #ex-rec svg.t-rtk.p3 .m1{transform:translate(55px,0)}.ed #ex-rec svg.t-rtk.p3 .m2{transform:translate(-55px,0)}
.ed #ex-rec svg.t-rtk .pp{opacity:0;transition:opacity .5s .2s}.ed #ex-rec svg.t-rtk.p3 .pp{opacity:1}
.ed #ex-rec svg.t-rtk:not(.p2) .lg{transform:translate(-160px,-30px)}
.ed #ex-rec svg.t-rtk.p4 .sh2{transform:translate(-128px,-50px)}
.ed #ex-rec svg.t-nuc:not(.p1) .lg{transform:translate(-60px,-170px)}.ed #ex-rec svg.t-nuc.p1:not(.p2) .lg{transform:translate(-40px,-60px)}
.ed #ex-rec svg.t-nuc.p3 .hsp{transform:translate(30px,70px);opacity:0}
.ed #ex-rec svg.t-nuc.p3 .nr,.ed #ex-rec svg.t-nuc.p3 .lg{transform:translate(268px,62px)}
`;
// ======================= FIG. 4 · CASCADAS =======================
const PW={
 gs:{n:'Gs → AMPc → PKA',nodes:[
  ['l',0,0,'Ligando','sg','Adrenalina o glucagón','Activan su receptor acoplado a proteína G.'],
  ['r',1,0,'Receptor','rc','GPCR','Une su ligando, cambia de forma y actúa como GEF sobre la proteína G.','l'],
  ['g',2,0,'Proteína G','td','Gαs-GTP','La α suelta el GDP, une GTP y se separa de βγ.','r'],
  ['e',3,0,'Enzima','td','Adenilil ciclasa','Enzima de membrana que convierte ATP en AMPc. No es una cinasa.','g'],
  ['m',4,0,'2.º mensajero','td','AMPc','En segundos su concentración puede aumentar unas veinte veces.','e'],
  ['k',5,0,'Cinasa','td','PKA','El AMPc se une a las subunidades R y libera a las C, ahora activas.','m'],
  ['t1',6,0,'Proteína blanco','rs','Enzimas del glucógeno','La PKA fosforila enzimas que inician la degradación del glucógeno y frenan su síntesis.','k'],
  ['t2',6,1,'','rs','CREB, en el núcleo','La PKA entra al núcleo y fosforila a CREB, que se une a secuencias CRE.','k'],
  ['x1',7,0,'Respuesta','rs','Glucosa en segundos','Respuesta rápida: modifica proteínas que ya existen.','t1'],
  ['x2',7,1,'','rs','Genes encendidos','Respuesta lenta: CREB y su coactivador encienden genes.','t2'],
  ['o',4,1,'','of','Fosfodiesterasa','Degrada el AMPc a AMP y apaga la señal.','m','off']]},
 gq:{n:'Gq → PLC-β → IP₃ / DAG',nodes:[
  ['l',0,0,'Ligando','sg','Señal','Activa un GPCR acoplado a Gq.'],
  ['r',1,0,'Receptor','rc','GPCR','Actúa como GEF sobre la proteína Gq.','l'],
  ['g',2,0,'Proteína G','td','Gαq-GTP','Activa a la fosfolipasa C-β.','r'],
  ['e',3,0,'Enzima','td','Fosfolipasa C-β','Corta el PIP₂, un fosfolípido de inositol de la membrana.','g'],
  ['s',4,0,'Sustrato','mu','PIP₂','Da dos segundos mensajeros a la vez.','e'],
  ['m1',5,0,'2.º mensajero','td','IP₃','Hidrosoluble: difunde por el citosol.','s'],
  ['m2',5,1,'','td','DAG','Queda en la membrana.','s'],
  ['c',6,0,'Canal','td','Canal de Ca²⁺ del RE','El IP₃ lo abre: el Ca²⁺ sale al citosol.','m1'],
  ['ca',7,0,'2.º mensajero','td','Ca²⁺','En el citosol está muy bajo (≈10⁻⁷ M): basta abrir unos canales para que suba rápido.','c'],
  ['pkc',7,1,'Cinasa','td','PKC','DAG + Ca²⁺ la activan; fosforila otras proteínas.','m2'],
  ['cam',8,0,'Proteína blanco','rs','Calmodulina','Tiene cuatro sitios de unión a Ca²⁺; al unirlo cambia de forma.','ca'],
  ['ck',9,0,'Respuesta','rs','CaM-cinasas','Cinasas dependientes de Ca²⁺/calmodulina: fosforilan muchas dianas.','cam'],
  ['o',9,1,'','of','Bombas de Ca²⁺','Gastan ATP y mantienen bajo el Ca²⁺ citosólico.','ca','off']],extra:[['ca','pkc']]},
 rtk:{n:'RTK → Ras → MAP cinasa',nodes:[
  ['l',0,0,'Ligando','sg','Factor de crecimiento','EGF, PDGF, FGF, NGF o insulina.'],
  ['r',1,0,'Receptor','rc','RTK: dímero','La señal une dos receptores (el de insulina ya es un dímero).','l'],
  ['p',2,0,'Autofosforilación','rc','Tirosinas-P','Cada dominio cinasa fosforila tirosinas del otro.','r'],
  ['a',3,0,'Adaptadora','td','Grb2 (SH2)','Se une a una tirosina fosforilada y trae a Sos.','p'],
  ['s',4,0,'GEF','td','Sos','Cambia el GDP de Ras por GTP.','a'],
  ['ras',5,0,'GTPasa','td','Ras-GTP','GTPasa monomérica anclada a la membrana.','s'],
  ['k1',6,0,'Cinasas','td','Raf → MEK → ERK','Módulo de MAP cinasa: MAPKKK → MAPKK → MAPK.','ras'],
  ['x',7,0,'Respuesta','rs','Proliferación y diferenciación','ERK entra al núcleo y fosforila reguladores de genes.','k1'],
  ['pi',3,1,'','td','PI3K','Se une al receptor fosforilado y forma PIP₃.','p'],
  ['ak',4,1,'','td','Akt','Se ancla al PIP₃ y es activada por otras cinasas.','pi'],
  ['x2',5,1,'','rs','Supervivencia · crecimiento · GLUT4','Fosforila a Bad, activa mTOR y lleva GLUT4 a la membrana.','ak'],
  ['o',6,1,'','of','Ras-GAP','Acelera la hidrólisis del GTP de Ras: la apaga.','ras','off']]}};
function casSVG(pid){
  const P=PW[pid],cx=[214,446],rowH=62,top=34;const pos={};P.nodes.forEach(nd=>pos[nd[0]]={x:cx[nd[2]],y:top+nd[1]*rowH});
  const H=top+Math.max(...P.nodes.map(n=>n[1]))*rowH+44;
  let edges='',nodes='',roles='';const drawn=new Set();
  const lw={};P.nodes.forEach(nd=>lw[nd[0]]=nd[5].length*8.4+30);
  const edge=(a,b,off,idx)=>{const A=pos[a],B=pos[b];if(off&&A.y!==B.y){const x0=A.x+lw[a];return `<path class="cl off" data-i="${idx}" pathLength="1" d="M${x0} ${A.y} C${B.x} ${A.y} ${B.x} ${A.y} ${B.x} ${B.y-15}"/>`}if(A.y===B.y){const x0=A.x+lw[a];return `<path class="cl${off?' off':''}" data-i="${idx}" pathLength="1" d="M${x0} ${A.y} L${B.x-16} ${B.y}"/>`}const d=A.x===B.x?`M${A.x} ${A.y+14} L${B.x} ${B.y-15}`:`M${A.x} ${A.y+14} C${A.x} ${(A.y+B.y)/2} ${B.x} ${(A.y+B.y)/2} ${B.x} ${B.y-15}`;
    return `<path class="cl${off?' off':''}" data-i="${idx}" pathLength="1" d="${d}"/>`};
  P.nodes.forEach((nd,i)=>{const [id,row,col,role,c,label,desc,from,off]=nd;const {x,y}=pos[id];
    if(role&&!drawn.has(row)){drawn.add(row);roles+=S.t(18,y+4,role.toUpperCase(),'cap','start')}
    if(from)edges+=edge(from,id,off,i);
    const g=c==='sg'?S.lig(x,y,11):c==='of'?`<rect class="nb" x="${x-12}" y="${y-12}" width="24" height="24" rx="3"/>`:`<circle class="nb" cx="${x}" cy="${y}" r="13"/>`;
    nodes+=`<g class="cn c-${c}${off?' off':''}" data-i="${i}" tabindex="0" role="button" aria-label="${esc(label)}">${g}<text class="tx b nl" x="${x+22}" y="${y+4.5}" text-anchor="start">${esc(label)}</text></g>`});
  (P.extra||[]).forEach(([a,b])=>edges+=edge(a,b,false,P.nodes.findIndex(n=>n[0]===b)));
  return {svg:`<svg viewBox="0 0 640 ${H}" role="img" aria-label="Cascada ${esc(P.n)}"><line class="rl" x1="150" y1="10" x2="150" y2="${H-10}"/>${roles}${edges}${nodes}</svg>`,H};
}
function cas(n){
  const body=`<div class="ex-ctl" role="tablist" aria-label="Vía">${Object.entries(PW).map(([k,p],i)=>`<button type="button" class="ex-tab cs-t${i?'':' on'}" data-p="${k}" role="tab" aria-selected="${!i}">${p.n}</button>`).join('')}<span class="sep"></span>
   <button type="button" class="act" data-a="play">Reproducir</button><button type="button" data-a="pause">Pausa</button><button type="button" data-a="reset">Reiniciar</button></div>
   <div class="ex-plate cs-plate"></div><div class="ex-readout" aria-live="polite"></div>`;
  return frame('cas',n,'La cascada, molécula por molécula',body,'Baja con el scroll y cada componente se activa al cruzar la mitad de la pantalla; también puedes reproducirla sola, pausarla o reiniciarla. Toca cualquier molécula para ver qué hace. En rojo, lo que apaga la vía.',['A','L']);
}
function wireCas(fig){
  let pid='gs',k=-1,mode='scroll',timer=null,raf=0,live=false;const plate=fig.querySelector('.cs-plate'),ro=fig.querySelector('.ex-readout');
  const order=()=>PW[pid].nodes;
  const paint=()=>{const N=order();fig.querySelectorAll('.cn').forEach(g=>{const i=+g.dataset.i;g.classList.toggle('on',i<=k);g.classList.toggle('cur',i===k)});
    fig.querySelectorAll('.cl').forEach(p=>p.classList.toggle('on',+p.dataset.i<=k));
    const nd=N[Math.max(0,Math.min(k,N.length-1))];ro.innerHTML=k<0?'Baja para ver la cascada activarse, o pulsa Reproducir.':`<b>Ahora actúa: ${esc(nd[5])}</b> · ${esc(nd[6])}`};
  const load=p=>{pid=p;const {svg}=casSVG(p);plate.innerHTML=svg;fig.querySelectorAll('.cs-t').forEach(b=>{const on=b.dataset.p===p;b.classList.toggle('on',on);b.setAttribute('aria-selected',on)});
    fig.querySelectorAll('.cn').forEach(g=>{const f=()=>{const nd=order()[+g.dataset.i];ro.innerHTML=`<b>${esc(nd[5])}</b> · ${esc(nd[6])}`};g.onmouseenter=f;g.onfocus=f;g.onclick=()=>{stop();mode='manual';k=+g.dataset.i;paint()}});
    k=-1;paint();onScroll()};
  const stop=()=>{if(timer){clearInterval(timer);timer=null}};
  const play=()=>{stop();mode='auto';if(k>=order().length-1)k=-1;const step=()=>{k++;paint();if(k>=order().length-1)stop()};if(RM()){k=order().length-1;paint();return}step();timer=setInterval(step,950)};
  function onScroll(){if(!fig.isConnected){removeEventListener('scroll',onScroll);return}if(mode!=='scroll'||!live)return;cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const line=innerHeight*.58;let kk=-1;fig.querySelectorAll('.cn').forEach(g=>{const r=g.getBoundingClientRect();if(r.top+r.height/2<line)kk=Math.max(kk,+g.dataset.i)});
    // los nodos de apagado sólo se activan cuando ya pasó la parte principal
    if(kk!==k){k=kk;paint()}})}
  fig.querySelectorAll('.cs-t').forEach(b=>b.onclick=()=>{stop();mode='scroll';load(b.dataset.p)});
  fig.querySelector('[data-a=play]').onclick=play;
  fig.querySelector('[data-a=pause]').onclick=()=>{stop();mode='manual'};
  fig.querySelector('[data-a=reset]').onclick=()=>{stop();mode='scroll';k=-1;paint();onScroll()};
  addEventListener('scroll',onScroll,{passive:true});
  onView(fig,v=>{live=v;if(!v)stop();else onScroll()});
  load('gs');
  fig._cleanup=()=>removeEventListener('scroll',onScroll);
}
X.casCSS=`
.ed #ex-cas .rl{stroke:var(--e-rule);stroke-width:1}
.ed #ex-cas .cl{fill:none;stroke:var(--e-rule);stroke-width:2;stroke-dasharray:1;stroke-dashoffset:0}
.ed #ex-cas .cl.off{stroke-dasharray:.03 .03}
.ed #ex-cas .cl.on{stroke:var(--e-td);animation:edDraw .7s ease both}
.ed #ex-cas .cl.off.on{stroke:var(--e-of);animation:none}
@keyframes edDraw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
.ed #ex-cas .cn{cursor:pointer;outline:none}
.ed #ex-cas .cn .nb{fill:var(--e-paper);stroke:var(--e-mu);stroke-width:1.6;transition:fill .4s,stroke .4s}
.ed #ex-cas .cn polygon{fill:var(--e-paper);stroke:var(--e-sg);stroke-width:1.6;transition:fill .4s}
.ed #ex-cas .cn .nl{font-family:var(--e-body);font-size:16px;font-weight:600;fill:var(--e-mut);transition:fill .4s}
.ed #ex-cas .cn.on .nl{fill:var(--e-ink)}
.ed #ex-cas .cn.on.c-sg polygon{fill:var(--e-sg)}.ed #ex-cas .cn.on.c-rc .nb{fill:var(--e-rc);stroke:var(--e-rc)}.ed #ex-cas .cn.on.c-td .nb{fill:var(--e-td);stroke:var(--e-td)}.ed #ex-cas .cn.on.c-rs .nb{fill:var(--e-rs);stroke:var(--e-rs)}.ed #ex-cas .cn.on.c-mu .nb{fill:var(--e-mu)}
.ed #ex-cas .cn.c-of .nb{stroke:var(--e-of);stroke-dasharray:3 3}.ed #ex-cas .cn.on.c-of .nb{fill:var(--e-ofl)}.ed #ex-cas .cn.c-of .nl{font-style:italic}
.ed #ex-cas .cn.cur .nb,.ed #ex-cas .cn.cur polygon{stroke-width:4;filter:drop-shadow(0 0 6px var(--e-tdl))}
.ed #ex-cas .cn:focus-visible .nb{stroke:var(--e-ink);stroke-width:3}
.ed #ex-cas .tx.cap{font-size:10.5px}
@media (max-width:640px){.ed #ex-cas .cn .nl{font-size:24px}.ed #ex-cas .tx.cap,.ed #ex-cas .rl{display:none}.ed #ex-cas .cn .nb{r:15px}}
`;
// ======================= FIG. 5 · SEGUNDOS MENSAJEROS =======================
const MSG=[
 {id:'ampc',n:'AMPc',shape:'dia',from:'Adenilil ciclasa, activada por Gαs, a partir de ATP',act:'PKA: se une a sus subunidades R y libera a las C',eff:'Fosforilación de enzimas (degradación del glucógeno) y de CREB (genes)',off:'AMPc fosfodiesterasa: AMPc → AMP',src:[200,92],dst:[470,214]},
 {id:'ip3',n:'IP₃',shape:'tri',from:'Fosfolipasa C-β: corta el PIP₂ de la membrana',act:'Canales de Ca²⁺ del retículo endoplásmico',eff:'El Ca²⁺ sale al citosol',src:[320,96],dst:[176,232]},
 {id:'dag',n:'DAG',shape:'lip',from:'Fosfolipasa C-β: la otra mitad del PIP₂; queda en la membrana',act:'Proteína cinasa C (PKC), junto con el Ca²⁺',eff:'La PKC fosforila otras proteínas',src:[340,78],dst:[452,78]},
 {id:'ca',n:'Ca²⁺',shape:'cir',from:'Retículo endoplásmico (y exterior), donde está miles de veces más concentrado que en el citosol (≈10⁻⁷ M)',act:'Calmodulina (4 sitios de unión) → CaM-cinasas; con DAG, la PKC',eff:'Fosforilación de muchas dianas; en el músculo, se une a la troponina',off:'Bombas que gastan ATP mantienen bajo el Ca²⁺ citosólico',src:[176,240],dst:[478,214]},
 {id:'gmpc',n:'GMPc',shape:'sq',from:'Guanilil ciclasa, activada por el óxido nítrico',act:'PKG',eff:'Baja el Ca²⁺ y el músculo liso se relaja: el vaso se dilata',src:[300,186],dst:[478,214]}];
function msgShape(sh,x,y,c){const r=5.5;return sh==='dia'?`<polygon class="f-${c}" points="${x},${y-r} ${x+r},${y} ${x},${y+r} ${x-r},${y}"/>`:sh==='tri'?`<polygon class="f-${c}" points="${x},${y-r} ${x+r},${y+r*.8} ${x-r},${y+r*.8}"/>`:sh==='lip'?`<g class="st-${c}" stroke-width="2.4"><path d="M${x-2} ${y-8} V${y+4} M${x+2} ${y-8} V${y+4}"/></g><circle class="f-${c}" cx="${x}" cy="${y+6}" r="3.6"/>`:sh==='sq'?`<rect class="f-${c}" x="${x-4.5}" y="${y-4.5}" width="9" height="9" rx="1.5"/>`:`<circle class="f-${c}" cx="${x}" cy="${y}" r="${r-1}"/>`}
function msgBase(){
  return S.memH(0,640,60,36)+S.t(14,48,'EXTERIOR','cap','start')+S.t(14,122,'CITOSOL','cap','start')+
   `<path class="er" d="M30 330 V264 Q30 232 62 232 H250 Q282 232 282 264 V330"/>${S.t(46,316,'RETÍCULO ENDOPLÁSMICO','cap c-rs','start')}`+
   `<g class="src s-ampc"><rect class="f-sgl st-sg" x="182" y="56" width="36" height="44" rx="8"/>${S.t(200,130,'adenilil ciclasa','c-mu')}</g>`+
   `<g class="src s-ip3 s-dag"><rect class="f-sgl st-sg" x="296" y="96" width="50" height="22" rx="8"/>${S.t(321,111,'PLC-β','c-sg b')}</g>`+
   `<g class="src s-ca"><rect class="f-rsl st-rs" x="164" y="226" width="12" height="20" rx="2"/><rect class="f-rsl st-rs" x="180" y="226" width="12" height="20" rx="2"/>${S.t(186,268,'canal de Ca²⁺','c-rs')}</g>`+
   `<g class="src s-gmpc"><ellipse class="f-tdl st-td" cx="300" cy="186" rx="40" ry="16"/>${S.t(300,190,'guanilil ciclasa','c-td')}</g>`+
   `<g class="tgt t-ampc"><ellipse class="f-ofl st-of" cx="470" cy="214" rx="34" ry="20"/>${S.t(470,218,'PKA','c-of b')}</g>`+
   `<g class="tgt t-ca t-gmpc"><ellipse class="f-rsl st-rs" cx="478" cy="214" rx="44" ry="20"/>${S.t(478,218,'','')}</g>`+
   `<g class="tgt t-dag"><ellipse class="f-ofl st-of" cx="452" cy="112" rx="30" ry="16"/>${S.t(452,116,'PKC','c-of b')}</g>`;
}
function msg(n){
  const body=`<div class="ex-ctl" role="tablist" aria-label="Segundo mensajero">${MSG.map((m,i)=>`<button type="button" class="ex-tab ms-t${i?'':' on'}" data-m="${m.id}" role="tab" aria-selected="${!i}">${m.n}</button>`).join('')}</div>
   <div class="ex-row"><div class="ex-plate ex-scroll"><svg viewBox="0 0 640 330" role="img" aria-label="Origen y destino del segundo mensajero">${msgBase()}<g class="parts"></g><text class="tx b tlab" x="478" y="250" text-anchor="middle"></text></svg></div>
   <aside class="ex-side ms-side" aria-live="polite"></aside></div>`;
  return frame('msg',n,'Segundos mensajeros: de dónde vienen y qué activan',body,'Moléculas pequeñas que se producen en gran cantidad y difunden rápido para llevar la señal por la célula.',['A','L']);
}
function wireMsg(fig){
  const svg=fig.querySelector('svg'),parts=svg.querySelector('.parts'),side=fig.querySelector('.ms-side'),tl=svg.querySelector('.tlab');
  const show=(id,anim=true)=>{const m=MSG.find(x=>x.id===id);svg.setAttribute('data-m',id);
    fig.querySelectorAll('.ms-t').forEach(b=>{const on=b.dataset.m===id;b.classList.toggle('on',on);b.setAttribute('aria-selected',on)});
    tl.textContent=id==='ca'?'calmodulina':id==='gmpc'?'PKG':'';tl.setAttribute('y',id==='ca'||id==='gmpc'?218:250);tl.setAttribute('class','tx b '+(id==='ca'?'c-rs':'c-rs'));
    let p='';const [sx,sy]=m.src,[dx,dy]=m.dst;
    for(let i=0;i<8;i++){const ox=((i*37)%23)-11,oy=((i*53)%19)-9;const x1=dx+ox*1.6-sx,y1=dy+oy*1.2-sy;
      p+=`<g class="mp${anim&&!RM()?' go':''}" style="--x:${x1.toFixed(0)}px;--y:${y1.toFixed(0)}px;animation-delay:${(i*.14).toFixed(2)}s">${msgShape(m.shape,sx+((i*7)%9)-4,sy+((i*5)%7)-3,id==='ca'?'rs':id==='dag'?'sg':'td')}</g>`}
    if(id==='gmpc')p+=`<g class="mp go no" style="--x:0px;--y:110px">${S.t(300,40,'NO','c-td b')}</g>`;
    parts.innerHTML=p;
    side.innerHTML=`<h4>${m.n}</h4><dl><dt>De dónde viene</dt><dd>${m.from}</dd><dt>Qué activa</dt><dd>${m.act}</dd><dt>Qué efecto produce</dt><dd>${m.eff}</dd>${m.off?`<dt>Qué lo apaga</dt><dd>${m.off}</dd>`:''}</dl>`};
  fig.querySelectorAll('.ms-t').forEach(b=>b.onclick=()=>show(b.dataset.m));
  show('ampc',false);
  let seen=false;onView(fig,(v,e)=>{if(v&&!seen&&e.intersectionRatio>=.35){seen=true;show(svg.dataset.m)}});
}
X.msgCSS=`
.ed #ex-msg .er{fill:var(--e-rsl);stroke:var(--e-rs);stroke-width:1.4}
.ed #ex-msg .src,.ed #ex-msg .tgt{opacity:.28;transition:opacity .4s}
.ed #ex-msg svg[data-m=ampc] .s-ampc,.ed #ex-msg svg[data-m=ampc] .t-ampc,.ed #ex-msg svg[data-m=ip3] .s-ip3,.ed #ex-msg svg[data-m=ip3] .s-ca,.ed #ex-msg svg[data-m=dag] .s-dag,.ed #ex-msg svg[data-m=dag] .t-dag,.ed #ex-msg svg[data-m=ca] .s-ca,.ed #ex-msg svg[data-m=ca] .t-ca,.ed #ex-msg svg[data-m=gmpc] .s-gmpc,.ed #ex-msg svg[data-m=gmpc] .t-gmpc{opacity:1}
.ed #ex-msg .mp{transform:translate(var(--x),var(--y))}
.ed #ex-msg .mp.go{animation:edMsg 1.8s cubic-bezier(.3,.6,.25,1) both}
.ed #ex-msg .mp.no{animation-duration:1.2s}
@keyframes edMsg{from{transform:translate(0,0);opacity:0}15%{opacity:1}to{transform:translate(var(--x),var(--y));opacity:1}}
.ed #ex-msg .ms-side{min-height:260px}
`;
Object.assign(X,{rec,wireRec,cas,wireCas,msg,wireMsg});
})();
