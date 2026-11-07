(function(){
'use strict';
const X=window.__SX,{S,esc,frame,onView,RM}=X;
// ======================= PORTADA =======================
function hero(){
  const C=[560,520],R=470,rad=d=>d*Math.PI/180,pt=(r,d)=>[C[0]+r*Math.cos(rad(d)),C[1]+r*Math.sin(rad(d))];
  let rnd=7;const rand=()=>{rnd=(rnd*16807)%2147483647;return rnd/2147483647};
  let chrom='';for(let i=0;i<70;i++){const a=200+rand()*95,r=rand()*225;const [x,y]=pt(r,a);if(x>540||y>460)continue;chrom+=`<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${(3+rand()*9).toFixed(1)}" ry="${(2+rand()*5).toFixed(1)}" transform="rotate(${(rand()*180).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})" fill="#332d5c" opacity="${(.45+rand()*.4).toFixed(2)}"/>`}
  let pores='';for(let d=196;d<=300;d+=9){const [x,y]=pt(244,d);pores+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.2" fill="#141a31"/>`}
  let er='';[275,292,309].forEach((r,j)=>{er+=`<circle cx="${C[0]}" cy="${C[1]}" r="${r}" fill="none" stroke="#2f6b57" stroke-width="2.2" stroke-dasharray="${36-j*6} ${10+j*4}" stroke-dashoffset="${j*17}" opacity=".85"/>`});
  let cyto='';for(let i=0;i<9;i++){const a=205+rand()*80;const [x1,y1]=pt(450,a),[x2,y2]=pt(330+rand()*40,a+(rand()-.5)*10);cyto+=`<line x1="${x1.toFixed(0)}" y1="${y1.toFixed(0)}" x2="${x2.toFixed(0)}" y2="${y2.toFixed(0)}" stroke="#24305a" stroke-width="1.2"/>`}
  const gpcr=`<g>${Array.from({length:7},(_,i)=>`<rect x="${-21+i*6}" y="-16" width="4.6" height="32" rx="2" fill="#3b2f6e" stroke="#a892ee" stroke-width="1"/>`).join('')}</g>`;
  const rtk=`<g>${[-7,7].map(x=>`<ellipse cx="${x}" cy="-24" rx="6" ry="8" fill="#3b2f6e" stroke="#a892ee"/><rect x="${x-1.5}" y="-16" width="3" height="32" fill="#a892ee"/><rect x="${x-6}" y="16" width="12" height="16" rx="3" fill="#1d2448" stroke="#a892ee"/>`).join('')}</g>`;
  const chan=`<g><rect x="-11" y="-17" width="9" height="34" rx="3" fill="#3b2f6e" stroke="#a892ee"/><rect x="2" y="-17" width="9" height="34" rx="3" fill="#3b2f6e" stroke="#a892ee"/></g>`;
  let rec='';[[212,gpcr],[224,chan],[236,gpcr],[249,rtk],[262,gpcr],[274,gpcr]].forEach(([d,g])=>{const [x,y]=pt(R,d);rec+=`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${d+90})">${g}</g>`});
  const [gx,gy]=pt(R,236),[nx,ny]=[Math.cos(rad(236)),Math.sin(rad(236))];
  const bound=[gx+nx*30,gy+ny*30];
  const lig=(x,y,dx,dy,t,s=7)=>`<g class="drift" style="--dx:${dx}px;--dy:${dy}px;--t:${t}s"><polygon points="${x},${y-s} ${x+s},${y} ${x},${y+s} ${x-s},${y}" fill="#e2a646" stroke="#0c1122" stroke-width="1"/></g>`;
  let ligs=[[60,70,14,10,12],[150,36,-10,14,10],[250,64,12,-8,13],[90,180,10,12,11],[40,280,14,-10,14],[205,130,-12,8,9]].map(a=>lig(...a)).join('');
  // un ligando se acerca, se une y vuelve: movimiento con propósito (unión ligando-receptor)
  const dock=`<g class="dock" style="--dx:${(nx*80).toFixed(1)}px;--dy:${(ny*80).toFixed(1)}px"><polygon points="${bound[0]},${bound[1]-8} ${bound[0]+8},${bound[1]} ${bound[0]},${bound[1]+8} ${bound[0]-8},${bound[1]}" fill="#f0c46c" stroke="#0c1122"/></g>`;
  const inner=pt(R-40,236);let glow='';for(let i=0;i<5;i++){const [x,y]=pt(R-50-i*24,236+(i%2?3:-3));glow+=`<circle class="glow" cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${3.4}" fill="#7f9cff" style="animation-delay:${(i*.18).toFixed(2)}s"/>`}
  const svg=`<svg viewBox="0 0 520 440" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Corte de una célula: membrana con receptores, ligandos que se acercan desde el exterior, citoplasma con retículo endoplásmico y núcleo">
   <rect width="520" height="440" fill="#0c1122"/>
   <circle cx="${C[0]}" cy="${C[1]}" r="${R}" fill="#141a31" stroke="#3b3424" stroke-width="26"/>
   <circle cx="${C[0]}" cy="${C[1]}" r="${R+10}" fill="none" stroke="#c9ae74" stroke-width="5.5" stroke-linecap="round" stroke-dasharray="0 8.5"/>
   <circle cx="${C[0]}" cy="${C[1]}" r="${R-10}" fill="none" stroke="#c9ae74" stroke-width="5.5" stroke-linecap="round" stroke-dasharray="0 8.5"/>
   ${cyto}${er}
   <circle cx="${C[0]}" cy="${C[1]}" r="248" fill="none" stroke="#8d7bd6" stroke-width=".8" opacity=".6"/>
   <circle cx="${C[0]}" cy="${C[1]}" r="240" fill="#1b1934" stroke="#8d7bd6" stroke-width="1.4"/>${chrom}${pores}
   ${rec}${ligs}${dock}${glow}
   <text x="22" y="26" font-family="IBM Plex Mono,monospace" font-size="10" letter-spacing="2" fill="#5d6688">EXTERIOR</text>
   <text x="300" y="300" font-family="IBM Plex Mono,monospace" font-size="10" letter-spacing="2" fill="#5d6688">CITOPLASMA</text>
   <text x="420" y="420" font-family="IBM Plex Mono,monospace" font-size="10" letter-spacing="2" fill="#8d7bd6">NÚCLEO</text></svg>`;
  return `<header class="ed-hero" data-blk="keep"><div class="hx"><div><div class="kk">Biología Celular · Lectura 5</div>
   <h1>Señalización y <i>comunicación</i> celular</h1>
   <p>Ninguna célula trabaja sola: recibe mensajes de sus vecinas y de órganos lejanos, los convierte en cambios internos y responde.</p></div>
   <div class="q"><span>¿Cómo sabe una célula qué hacer?</span><nav class="ed-chain" aria-label="Etapas de la señalización"><a href="#ex-idea" data-c="sg" data-st="1">Señal</a><i>→</i><a href="#ex-idea" data-c="rc" data-st="2">Receptor</a><i>→</i><a href="#ex-idea" data-c="td" data-st="3">Transducción</a><i>→</i><a href="#ex-idea" data-c="rs" data-st="4">Respuesta</a></nav></div></div>
   <div class="art">${svg}<div class="lgd">Esquema · no a escala</div></div></header>`;
}
// ======================= FIG. 1 · IDEA CENTRAL =======================
const STAGES=[
 ['sg','Señal','Una molécula señalizadora producida por una célula (la <b>célula señalizadora</b>) llega a otra célula (la <b>célula diana</b>).'],
 ['rc','Receptor','La señal se une a una <b>proteína receptora</b> que la reconoce con gran especificidad y afinidad; al unirla, el receptor <b>cambia de forma</b>.'],
 ['td','Transducción','La señal externa se convierte en una señal interna: proteínas que funcionan como <b>interruptores</b> (se encienden por fosforilación o por unión de GTP) y <b>segundos mensajeros</b> la relevan y la amplifican.'],
 ['rs','Respuesta','Los <b>efectores</b> cambian lo que hace la célula: dividirse, diferenciarse, contraerse, secretar, cambiar su metabolismo o incluso morir.']];
function idea(n){
  const svg=`<svg viewBox="0 0 900 320" class="s1 s2 s3 s4" data-cur="0" role="img" aria-label="Señal, receptor, transducción y respuesta en una célula diana">
   <rect class="halo h1" x="10" y="10" width="282" height="300" rx="2"/><rect class="halo h2" x="248" y="10" width="148" height="300" rx="2"/><rect class="halo h3" x="398" y="10" width="368" height="300" rx="2"/><rect class="halo h4" x="770" y="10" width="124" height="300" rx="2"/>
   ${S.t(16,34,'EXTERIOR','cap','start')}${S.t(356,34,'CITOSOL','cap','start')}${S.t(888,34,'NÚCLEO','cap','end')}
   ${S.memV(300,0,320,36)}
   <circle class="nucf" cx="1010" cy="170" r="230"/>
   <g class="k k4"><line class="st-mu" x1="808" y1="206" x2="900" y2="206" stroke-width="2"/><line class="st-mu" x1="808" y1="214" x2="900" y2="214" stroke-width="2"/><rect class="f-rsl st-rs" x="826" y="198" width="54" height="24" rx="2"/>${S.t(853,240,'gen','c-rs')}
     <path class="mrna st-rs" d="M842 196 q8 -10 16 0 t16 0 t16 0" fill="none" stroke-width="2.2"/>${S.t(868,176,'ARNm','c-rs')}${S.arrow(860,150,860,92,'rs')}${S.t(860,82,'respuesta','c-rs b')}</g>
   <g class="k k3"><path class="link st-td" pathLength="1" d="M376 160 C 410 160 420 120 450 120 S 520 200 560 205 S 640 128 670 125 S 750 150 790 170" fill="none" stroke-width="2"/>
     ${S.prot(450,120,24,17,'td','GTP',12)}${S.prot(560,205,24,17,'td')}${S.P(574,191)}${S.prot(670,125,24,17,'td')}${S.P(684,111)}
     ${[[500,262],[528,282],[556,258],[590,290],[618,264],[470,288]].map(([x,y],i)=>`<g class="msg" style="transition-delay:${(.6+i*.08).toFixed(2)}s">${S.lig(x,y,6,'td')}</g>`).join('')}${S.t(545,312,'segundos mensajeros','c-td')}
     ${S.t(450,92,'interruptor','c-td')}${S.t(620,240,'cinasas','c-td')}</g>
   <g class="k k2"><ellipse class="f-rcl st-rc" cx="292" cy="160" rx="13" ry="26"/><rect class="f-rc" x="312" y="150" width="12" height="20" rx="2"/><g class="rin"><ellipse class="f-rcl st-rc" cx="352" cy="160" rx="16" ry="26"/></g>${S.t(318,214,'receptor','c-rc b')}</g>
   <g class="k k1"><g class="lig">${S.lig(272,160,11)}</g>${S.t(120,252,'molécula señalizadora','c-sg b')}</g>
  </svg>`;
  const body=`<div class="stg" role="tablist" aria-label="Etapas">${STAGES.map(([c,nm],i)=>`<button type="button" role="tab" data-c="${c}" data-i="${i+1}" aria-selected="false">0${i+1}<span>${nm}</span></button>`).join('')}</div>
   <div class="ex-plate ex-scroll">${svg}</div><div class="stg-txt" aria-live="polite">Toca una etapa, o deja que la animación recorra las cuatro.</div>
   <div class="ex-ctl"><button type="button" data-a="play" class="act">Reproducir de nuevo</button></div>`;
  return frame('idea',n,'Las células reciben información, la procesan y responden',body,'La misma lógica aparece en todas las vías del capítulo: señal → receptor → proteínas intracelulares (interruptores) → efectores → respuesta.',['A']);
}
function wireIdea(fig){
  const svg=fig.querySelector('svg'),txt=fig.querySelector('.stg-txt'),btns=[...fig.querySelectorAll('.stg button')];let timer=[];
  const set=(st,cur)=>{svg.setAttribute('class',[1,2,3,4].filter(i=>i<=st).map(i=>'s'+i).join(' '));svg.dataset.cur=cur;btns.forEach(b=>{const on=+b.dataset.i===cur;b.classList.toggle('on',on);b.setAttribute('aria-selected',on)});if(cur)txt.innerHTML=`<b>${STAGES[cur-1][1]}.</b> ${STAGES[cur-1][2]}`};
  const play=()=>{timer.forEach(clearTimeout);timer=[];if(RM()){set(4,4);return}set(0,0);[1,2,3,4].forEach((s,i)=>timer.push(setTimeout(()=>set(s,s),300+i*1500)))};
  btns.forEach(b=>{b.onclick=()=>{timer.forEach(clearTimeout);const i=+b.dataset.i;set(i,i)};b.onmouseenter=()=>{if(!timer.length||true){svg.dataset.cur=b.dataset.i;const i=+b.dataset.i;txt.innerHTML=`<b>${STAGES[i-1][1]}.</b> ${STAGES[i-1][2]}`}}});
  fig.querySelector('[data-a=play]').onclick=play;
  let seen=false;onView(fig,(v,e)=>{if(v&&!seen&&e.intersectionRatio>=.35){seen=true;play()}});
  X.ideaGo=i=>{timer.forEach(clearTimeout);set(i,i)};
}
X.ideaCSS=`
.ed #ex-idea .halo{fill:transparent;transition:fill .4s}
.ed #ex-idea svg[data-cur="1"] .h1{fill:var(--e-sgl)}.ed #ex-idea svg[data-cur="2"] .h2{fill:var(--e-rcl)}.ed #ex-idea svg[data-cur="3"] .h3{fill:var(--e-tdl)}.ed #ex-idea svg[data-cur="4"] .h4{fill:var(--e-rsl)}
.ed #ex-idea .k{transition:opacity .5s}
.ed #ex-idea svg:not(.s1) .k1 .tx,.ed #ex-idea svg:not(.s2) .k2,.ed #ex-idea svg:not(.s3) .k3,.ed #ex-idea svg:not(.s4) .k4{opacity:.2}
.ed #ex-idea .lig{transition:transform 1.2s cubic-bezier(.3,.7,.2,1)}
.ed #ex-idea svg:not(.s1) .lig{transform:translate(-170px,-80px)}
.ed #ex-idea .rin{transform-box:fill-box;transform-origin:50% 50%;transition:transform .7s cubic-bezier(.3,.7,.2,1)}
.ed #ex-idea svg.s2 .rin{transform:rotate(-16deg) translate(3px,-2px) scale(1.06,1)}
.ed #ex-idea .link{stroke-dasharray:1;stroke-dashoffset:0;transition:stroke-dashoffset 1.3s ease}
.ed #ex-idea svg:not(.s3) .link{stroke-dashoffset:1}
.ed #ex-idea .msg{transition:transform .8s ease,opacity .6s;transform-box:fill-box}
.ed #ex-idea svg:not(.s3) .msg{opacity:0;transform:translate(-40px,-50px)}
.ed #ex-idea .mrna{stroke-dasharray:60;stroke-dashoffset:0;transition:stroke-dashoffset 1s ease .3s}.ed #ex-idea svg:not(.s4) .mrna{stroke-dashoffset:60}
`;
// ======================= FIG. 2 · FORMAS DE COMUNICACIÓN =======================
const MODES=[
 {id:'auto',n:'Autocrina',d:1,how:'La célula responde a señales que ella misma secreta.',reach:'La misma célula'},
 {id:'cont',n:'Por contacto',d:2,how:'Molécula unida a la membrana de la célula señalizadora que se une al receptor de la célula vecina.',reach:'Células que se tocan',ex:'Notch-Delta en el desarrollo; reconocimiento entre células inmunitarias'},
 {id:'gap',n:'Uniones gap',d:2,how:'Canales (uniones de hendidura) que conectan los citoplasmas de células vecinas: comunicación directa.',reach:'Células vecinas',ex:'Dejan pasar iones y moléculas pequeñas como Ca²⁺, AMPc e IP₃'},
 {id:'para',n:'Paracrina',d:3,how:'Mediadores locales secretados al líquido extracelular.',reach:'Corto: células cercanas',ex:'Factores de crecimiento, mediadores de la inflamación'},
 {id:'sina',n:'Sináptica',d:4,how:'Neurotransmisor liberado en la sinapsis. Es rápida y precisa: recorre una distancia minúscula y se elimina enseguida.',reach:'Muy corto, pero la neurona llega lejos con su axón',ex:'Acetilcolina en la unión neuromuscular'},
 {id:'endo',n:'Endocrina',d:5,how:'Hormona secretada a la sangre. Es lenta (debe viajar y diluirse) y usa concentraciones muy bajas, por eso sus receptores tienen gran afinidad.',reach:'Todo el cuerpo',ex:'Insulina, adrenalina, cortisol'}];
function cell(x,y,r,cls='',nuc=true){return `<ellipse class="cell ${cls}" cx="${x}" cy="${y}" rx="${r}" ry="${(r*.8).toFixed(1)}"/>${nuc?`<ellipse class="cell-n" cx="${x+r*.12}" cy="${y+r*.08}" rx="${(r*.3).toFixed(1)}" ry="${(r*.26).toFixed(1)}"/>`:''}`}
function rmark(x,y,ang){return `<g transform="translate(${x} ${y}) rotate(${ang})"><path class="st-rc" d="M0 0 V-9 M0 -9 l-4 -5 M0 -9 l4 -5" stroke-width="2" fill="none"/></g>`}
function particles(path,n,dur,cls='sg',r=4.2,rep=3){let o=`<path d="${path}" class="trail" fill="none"/>`;for(let i=0;i<n;i++){const b=(i*dur/n).toFixed(2);o+=`<g opacity="0"><polygon class="f-${cls}" points="0,${-r} ${r},0 0,${r} ${-r},0"/><animateMotion dur="${dur}s" begin="${b}s" repeatCount="${rep}" path="${path}" fill="freeze"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.85;1" dur="${dur}s" begin="${b}s" repeatCount="${rep}" fill="freeze"/></g>`}return o}
function scene(id){
  switch(id){
  case 'auto':return cell(450,175,95)+rmark(523,124,40)+rmark(538,142,58)+particles('M452 100 C 440 20 600 30 528 116',5,2.6)+S.t(450,300,'la señal vuelve a la misma célula','c-mu');
  case 'cont':return cell(358,170,98)+cell(548,170,98)+`<path class="st-sg" d="M452 132 h10 M452 170 h10 M452 208 h10" stroke-width="5"/>`+`<path class="st-rc" d="M462 128 v8 M462 166 v8 M462 204 v8" stroke-width="5"/>`+`<ellipse cx="458" cy="170" rx="16" ry="58" class="f-sgl" opacity=".5"><animate attributeName="opacity" values=".1;.7;.1" dur="1.8s" repeatCount="3" fill="freeze"/></ellipse>`+S.arrow(480,170,560,170,'rc')+S.t(330,300,'molécula unida a la membrana','c-sg','middle')+S.t(590,300,'receptor de la vecina','c-rc','middle');
  case 'gap':{let ch='';[132,170,208].forEach(y=>{ch+=`<rect class="f-rsl st-rs" x="444" y="${y-8}" width="26" height="16" rx="3"/>`+particles(`M418 ${y} L 500 ${y}`,2,1.8,'td',3.4)});return cell(360,170,98)+cell(552,170,98)+ch+S.t(457,300,'canales que unen los dos citoplasmas','c-rs')}
  case 'para':return `<circle class="rng" cx="190" cy="170" r="250"/>`+cell(190,170,70)+cell(362,78,38)+cell(398,170,38)+cell(362,262,38)+rmark(326,92,-60)+rmark(360,170,-90)+rmark(326,250,-120)+cell(790,170,52,'far')+S.t(790,262,'fuera de alcance','c-mu')+
    particles('M252 140 C 280 110 300 96 322 92',3,2.2)+particles('M262 170 L 356 170',3,2.2)+particles('M252 200 C 280 230 300 246 322 250',3,2.2)+S.t(190,300,'célula señalizadora','c-mu');
  case 'sina':{const ax='M138 165 C 260 120 380 212 520 165 S 680 150 722 165';return cell(96,165,44)+`<path d="M60 140 l-30 -30 M58 192 l-28 26 M78 128 l-6 -40" class="st-mu" stroke-width="2"/><path d="${ax}" class="st-td" stroke-width="5" fill="none"/><ellipse class="f-tdl st-td" cx="736" cy="165" rx="15" ry="24"/><rect class="cell" x="770" y="110" width="112" height="110" rx="16"/>`+rmark(770,150,-90)+rmark(770,180,-90)+
    `<g opacity="0"><circle r="7" class="f-td"/><animateMotion dur="1.6s" begin="0s" repeatCount="3" path="${ax}" fill="freeze"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.9;1" dur="1.6s" repeatCount="3" fill="freeze"/></g>`+particles('M752 158 L 768 158',2,1.6,'sg',3.2)+particles('M752 174 L 768 174',2,1.6,'sg',3.2)+S.t(420,260,'axón: la neurona llega lejos','c-td')+S.t(780,250,'sinapsis','c-mu','middle')}
  case 'endo':return `<path class="vessel" d="M20 214 H880 V252 H20 Z"/>`+S.t(40,240,'SANGRE','cap c-of','start')+cell(110,92,55)+S.t(110,30,'célula endocrina','c-mu')+cell(520,92,40)+rmark(520,124,0)+cell(800,92,40)+rmark(800,124,0)+
    particles('M110 140 C 120 190 150 233 210 233 L 760 233 C 800 233 800 180 800 134',5,4.2)+particles('M110 140 C 120 190 150 233 210 233 L 480 233 C 520 233 520 180 520 134',3,3.4)+S.t(660,300,'llega a todo el cuerpo','c-mu');
  }
}
function comm(n){
  const tabs=MODES.map((m,i)=>`<button type="button" class="ex-tab cm-t${i===3?' on':''}" data-m="${m.id}" role="tab" aria-selected="${i===3}"><span class="dist" style="--w:${m.d*16}px"></span>${m.n}</button>`).join('');
  const body=`<div class="ex-ctl cm-tabs" role="tablist" aria-label="Formas de comunicación">${tabs}</div>
   <div class="ex-row"><div class="ex-plate ex-scroll"><svg viewBox="0 0 900 320" role="img" aria-label="Células comunicándose"></svg></div><aside class="ex-side" aria-live="polite"></aside></div>`;
  return frame('com',n,'¿Qué tan lejos viaja la señal?',body,'Las barras sobre cada nombre ordenan las formas de comunicación según la distancia que recorre la señal. Las partículas sólo se mueven unos segundos: vuelve a tocar la forma para repetir.',['A']);
}
function wireComm(fig){
  const side=fig.querySelector('.ex-side');
  const show=id=>{const m=MODES.find(x=>x.id===id);const old=fig.querySelector('.ex-plate svg');const ns=old.cloneNode(false);ns.innerHTML=scene(id);old.replaceWith(ns);
    fig.querySelectorAll('.cm-t').forEach(b=>{const on=b.dataset.m===id;b.classList.toggle('on',on);b.setAttribute('aria-selected',on)});
    side.innerHTML=`<h4>${m.n}</h4><dl><dt>Cómo llega la señal</dt><dd>${m.how}</dd><dt>Alcance</dt><dd>${m.reach}</dd>${m.ex?`<dt>${m.id==='gap'?'Qué pasa por ellas':'Ejemplo'}</dt><dd>${m.ex}</dd>`:''}</dl>`};
  fig.querySelectorAll('.cm-t').forEach(b=>b.onclick=()=>show(b.dataset.m));
  show('para');
  let seen=false;onView(fig,(v,e)=>{if(v&&!seen&&e.intersectionRatio>=.35){seen=true;show(fig.querySelector('.cm-t.on').dataset.m)}});
}
X.commCSS=`
.ed #ex-com .trail{stroke:var(--e-mu);stroke-width:1.2;stroke-dasharray:2 6;opacity:.7}
.ed #ex-com .ex-tab .dist{display:block;height:3px;width:var(--w);background:var(--e-sg);margin-bottom:6px;opacity:.85}
.ed #ex-com .ex-side{min-height:240px}
`;
Object.assign(X,{hero,idea,wireIdea,comm,wireComm});
})();
