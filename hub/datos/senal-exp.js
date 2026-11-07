/* Lectura editorial: «Señalización y comunicación celular».
   Se carga sólo al abrir este capítulo. No modifica el texto académico: reorganiza su presentación
   y agrega figuras interactivas dibujadas a partir de lo que dice cada sección.
   Principios de movimiento tomados de wheresryan22/anatomy (MIT): todo lo que se ve sale de un estado,
   el movimiento tiene propósito, se detiene fuera de pantalla y respeta «reducir movimiento». */
(function(){
'use strict';
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const REF={
  A:{short:'Alberts et al., 2022, cap. 15',apa:'Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., &amp; Walter, P. (2022). <i>Molecular biology of the cell</i> (7th ed.). W. W. Norton &amp; Company.'},
  L:{short:'Lodish et al., 2021',apa:'Lodish, H., Berk, A., Kaiser, C., Krieger, M., Bretscher, A., Ploegh, H., Martin, K., Yaffe, M., &amp; Amon, A. (2021). <i>Molecular cell biology</i> (9th ed.). W. H. Freeman.'}};
// referencias por sección: el propio capítulo indica que sigue al Alberts y usa al Lodish para las vías de los receptores
const SECREF=[['A'],['A'],['A','L'],['A','L'],['A','L'],['A','L'],['A'],['A'],['A'],['A']];
const src=keys=>`<span class="ex-src"><span class="ex-k">Fuente</span> ${keys.map(k=>`<a href="#ed-refs" data-ref="${k}">[${k==='A'?1:2}]</a> ${REF[k].short}`).join(' · ')}</span>`;
// ---------- primitivas de dibujo (colores por clase → tokens del tema) ----------
const S={
  t:(x,y,s,c='',a='middle',fs)=>`<text x="${x}" y="${y}" class="tx ${c}" text-anchor="${a}"${fs?` style="font-size:${fs}px"`:''}>${s}</text>`,
  memH:(x1,x2,y,h=34)=>`<g class="mem"><rect class="memf" x="${x1}" y="${y}" width="${x2-x1}" height="${h}"/><line class="memt" x1="${x1}" y1="${y+h/2}" x2="${x2}" y2="${y+h/2}"/><line class="memh" x1="${x1}" y1="${y+5}" x2="${x2}" y2="${y+5}"/><line class="memh" x1="${x1}" y1="${y+h-5}" x2="${x2}" y2="${y+h-5}"/></g>`,
  memV:(x,y1,y2,w=34)=>`<g class="mem"><rect class="memf" x="${x}" y="${y1}" width="${w}" height="${y2-y1}"/><line class="memt" x1="${x+w/2}" y1="${y1}" x2="${x+w/2}" y2="${y2}"/><line class="memh" x1="${x+5}" y1="${y1}" x2="${x+5}" y2="${y2}"/><line class="memh" x1="${x+w-5}" y1="${y1}" x2="${x+w-5}" y2="${y2}"/></g>`,
  lig:(x,y,r=9,c='sg')=>`<polygon class="f-${c} st-${c}d" points="${x},${y-r} ${x+r},${y} ${x},${y+r} ${x-r},${y}"/>`,
  dot:(x,y,r=4,c='sg')=>`<circle class="f-${c} st-${c}d" cx="${x}" cy="${y}" r="${r}"/>`,
  P:(x,y,r=7)=>`<g class="pb"><circle cx="${x}" cy="${y}" r="${r}"/><text x="${x}" y="${y+r*.45}" text-anchor="middle" style="font-size:${r*1.35}px">P</text></g>`,
  prot:(x,y,rx,ry,c,label,fs)=>`<ellipse class="pr f-${c}l st-${c}" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/>${label?S.t(x,y+(fs||13)*.36,label,'b c-'+c,'middle',fs):''}`,
  helices:(x,y,n=7,gap=11,w=8,h=60,c='rc')=>Array.from({length:n},(_,i)=>`<rect class="hx f-${c}l st-${c}" x="${x+i*gap}" y="${y}" width="${w}" height="${h}" rx="3.5"/>`).join('')+`<path class="loop st-${c}" d="${Array.from({length:n-1},(_,i)=>`M${x+i*gap+w/2} ${i%2?y+h:y} q${gap/2} ${i%2?10:-10} ${gap} 0`).join(' ')}"/>`,
  arrow:(x1,y1,x2,y2,c='mu',cls='')=>{const a=Math.atan2(y2-y1,x2-x1),L=7,p1=[x2-L*Math.cos(a-.42),y2-L*Math.sin(a-.42)],p2=[x2-L*Math.cos(a+.42),y2-L*Math.sin(a+.42)];return `<g class="ar ${cls}"><line class="st-${c}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><polygon class="f-${c}" points="${x2},${y2} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}"/></g>`},
};
// observador de visibilidad compartido
const IO='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{const f=e.target._onview;if(f)f(e.isIntersecting,e)}),{threshold:[0,.35]}):null;
function onView(el,f){el._onview=f;if(IO)IO.observe(el);else f(true,{intersectionRatio:1})}
function frame(id,n,title,body,caption,refs,extra=''){return `<figure class="ex" id="ex-${id}" data-blk="keep"><figcaption class="ex-h"><span class="ex-n">Fig. ${n}</span><span class="ex-t">${title}</span></figcaption>${body}<p class="ex-c">${caption} ${src(refs)}</p>${extra}</figure>`}
const SX={RM,esc,REF,SECREF,src,S,onView,frame};
window.__SX=SX;
})();
/* Librería de dibujo biológico de la lectura de Señalización.
   Todo lo que se dibuja aquí representa una estructura real: la bicapa tiene cabezas polares y colas
   hidrofóbicas, las hélices transmembrana son cilindros, las proteínas globulares tienen volumen,
   los segundos mensajeros se dibujan con su forma química simplificada (anillo de inositol con 3 fosfatos,
   purina del AMPc, núcleo de cuatro anillos de un esteroide…).
   La proyección isométrica y los principios de movimiento (estado → dibujo, seguimiento exponencial,
   detenerse fuera de pantalla, «reducir movimiento») vienen de wheresryan22/anatomy (MIT). */
(function(){
'use strict';
const X=window.__SX;
const f1=v=>Math.round(v*10)/10;
const P=p=>f1(p[0])+' '+f1(p[1]);
const rng=seed=>{let s=(seed*9301+49297)%233280||7;return()=>{s=(s*9301+49297)%233280;return s/233280}};
const COLS=['sg','rc','td','rs','of','mu','lh','dk'];
// ---------- definiciones globales (un solo <svg> dentro del artículo para que hereden los colores del tema) ----------
function defs(){
  const cm=(c,p,to)=>`color-mix(in srgb,var(--e-${c}) ${p}%,${to})`;
  let g='';
  COLS.forEach(c=>{
    g+=`<radialGradient id="bv-${c}" cx=".38" cy=".32" r=".78" fx=".32" fy=".26"><stop offset="0" style="stop-color:${cm(c,22,'#fff')}"/><stop offset=".42" style="stop-color:${cm(c,55,'#fff')}"/><stop offset=".86" style="stop-color:${cm(c,92,'#fff')}"/><stop offset="1" style="stop-color:${cm(c,82,'#000')}"/></radialGradient>`;
    g+=`<linearGradient id="bc-${c}" x1="0" x2="1" y1="0" y2="0"><stop offset="0" style="stop-color:${cm(c,85,'#000')}"/><stop offset=".32" style="stop-color:${cm(c,40,'#fff')}"/><stop offset=".55" style="stop-color:${cm(c,62,'#fff')}"/><stop offset="1" style="stop-color:${cm(c,78,'#000')}"/></linearGradient>`;
    g+=`<linearGradient id="bh-${c}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" style="stop-color:${cm(c,40,'#fff')}"/><stop offset=".45" style="stop-color:${cm(c,70,'#fff')}"/><stop offset="1" style="stop-color:${cm(c,80,'#000')}"/></linearGradient>`});
  g+=`<radialGradient id="bv-ion" cx=".35" cy=".3" r=".8"><stop offset="0" style="stop-color:#fff"/><stop offset=".5" style="stop-color:var(--e-td)"/><stop offset="1" style="stop-color:${cm('td',70,'#000')}"/></radialGradient>`;
  g+=`<radialGradient id="bg-glow" r=".5"><stop offset="0" style="stop-color:var(--e-sg);stop-opacity:.55"/><stop offset="1" style="stop-color:var(--e-sg);stop-opacity:0"/></radialGradient>`;
  g+=`<radialGradient id="bg-glowtd" r=".5"><stop offset="0" style="stop-color:var(--e-td);stop-opacity:.45"/><stop offset="1" style="stop-color:var(--e-td);stop-opacity:0"/></radialGradient>`;
  g+=`<linearGradient id="bg-ec" x1="0" x2="0" y1="0" y2="1"><stop offset="0" style="stop-color:var(--e-exo)"/><stop offset=".42" style="stop-color:var(--e-exo)"/><stop offset=".62" style="stop-color:var(--e-cyt)"/><stop offset="1" style="stop-color:var(--e-cyt)"/></linearGradient>`;
  g+=`<filter id="b-sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="1.6" stdDeviation="1.6" flood-color="#0b1020" flood-opacity=".22"/></filter>`;
  g+=`<filter id="b-soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6"/></filter>`;
  return `<svg class="b-defs" aria-hidden="true" focusable="false" width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden"><defs>${g}</defs></svg>`;
}
// ---------- geometría ----------
function smooth(Pts,closed=true){const n=Pts.length;let d=`M${P(Pts[0])}`;const last=closed?n:n-1;
  for(let i=0;i<last;i++){const p0=Pts[closed?(i-1+n)%n:Math.max(0,i-1)],p1=Pts[i],p2=Pts[(i+1)%n],p3=Pts[closed?(i+2)%n:Math.min(n-1,i+2)];
    d+=`C${P([p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6])} ${P([p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6])} ${P(p2)}`}
  return d+(closed?'Z':'')}
// muestrea una curva paramétrica a intervalos iguales de longitud; devuelve [x,y,nx,ny] con la normal hacia el exterior
function sample(fn,t0,t1,step){const raw=[];const N=400;for(let i=0;i<=N;i++)raw.push(fn(t0+(t1-t0)*i/N));
  const L=[0];for(let i=1;i<raw.length;i++)L.push(L[i-1]+Math.hypot(raw[i][0]-raw[i-1][0],raw[i][1]-raw[i-1][1]));
  const out=[];let j=0;for(let s=step/2;s<L[L.length-1];s+=step){while(L[j+1]<s)j++;const a=raw[j],b=raw[j+1],u=(s-L[j])/((L[j+1]-L[j])||1);
    const tx=b[0]-a[0],ty=b[1]-a[1],l=Math.hypot(tx,ty)||1;out.push([a[0]+tx*u,a[1]+ty*u,ty/l,-tx/l])}return out}
const line=(x1,x2,y,step=8)=>{const o=[];for(let x=x1+step/2;x<x2;x+=step)o.push([x,y,0,-1]);return o};
const vline=(x,y1,y2,step=8)=>{const o=[];for(let y=y1+step/2;y<y2;y+=step)o.push([x,y,-1,0]);return o};
// ---------- bicapa lipídica: núcleo hidrofóbico, colas y cabezas polares ----------
function bilayer(pts,o={}){
  const T=o.t||12,r=o.r||3.3,skip=o.skip||(()=>false),cls=o.cls||'';
  const up=[],dn=[];pts.forEach(p=>{up.push([p[0]+p[2]*(T-r*.4),p[1]+p[3]*(T-r*.4)]);dn.push([p[0]-p[2]*(T-r*.4),p[1]-p[3]*(T-r*.4)])});
  let core=`<path class="b-core" d="M${up.map(P).join('L')}L${dn.reverse().map(P).join('L')}Z"/>`;
  let td='',heads='';const R=rng(o.seed||3);
  pts.forEach((p,i)=>{const [x,y,nx,ny]=p;if(skip(x,y))return;const tx=-ny,ty=nx;
    [1,-1].forEach(s=>{const jit=(R()-.5)*1.2;const hx=x+nx*s*(T+jit*.3),hy=y+ny*s*(T+jit*.3);
      if(o.tails!==false){const a=[hx-nx*s*r*.9,hy-ny*s*r*.9];
        [-1.15,1.15].forEach((k,q)=>{const kink=q===1&&((i+(s>0?0:1))%3===0)?1.6:0;const m=[x+nx*s*(T*.48)+tx*(k+kink*.7),y+ny*s*(T*.48)+ty*(k+kink*.7)],e=[x+nx*s*1.1+tx*(k*.8+kink),y+ny*s*1.1+ty*(k*.8+kink)];
          td+=`M${P([a[0]+tx*k*.8,a[1]+ty*k*.8])}L${P(m)}L${P(e)}`})}
      heads+=`<circle cx="${f1(hx)}" cy="${f1(hy)}" r="${r}"/>`})});
  return `<g class="b-mem ${cls}">${core}${o.tails!==false?`<path class="b-tail" d="${td}"/>`:''}<g class="b-head">${heads}</g></g>`;
}
// ---------- proteínas ----------
function blobPath(cx,cy,rx,ry,seed=1,rough=.12,n=10,rot=0){const R=rng(seed);const pts=[];const cr=Math.cos(rot),sr=Math.sin(rot);
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2,k=1+(R()-.5)*2*rough;const x=Math.cos(a)*rx*k,y=Math.sin(a)*ry*k;pts.push([cx+x*cr-y*sr,cy+x*sr+y*cr])}return smooth(pts)}
const blob=(cx,cy,rx,ry,c,o={})=>`<path class="b-prot${o.cls?' '+o.cls:''}" d="${blobPath(cx,cy,rx,ry,o.seed||1,o.rough??.12,o.n||10,o.rot||0)}" fill="url(#bv-${c})" style="stroke:color-mix(in srgb,var(--e-${c}) 75%,#000)"${o.f===false?'':' filter="url(#b-sh)"'}/>`;
// cilindro (hélice α transmembrana) con las vueltas de la hélice
function helix(x,y,w,h,c,o={}){let t='';const step=o.step||5.2;for(let k=step*.6;k<h-2;k+=step)t+=`M${f1(x+.6)} ${f1(y+k)}L${f1(x+w-.6)} ${f1(y+k+step*.55)}`;
  return `<g class="b-hx${o.cls?' '+o.cls:''}"${o.attr||''}><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(w/2)}" fill="url(#bc-${c})" style="stroke:color-mix(in srgb,var(--e-${c}) 70%,#000)"/><path class="b-turn" d="${t}" style="stroke:color-mix(in srgb,var(--e-${c}) 60%,#000)"/></g>`}
// asa (loop) entre hélices
const loop=(a,b,bulge,c)=>`<path class="b-loop" d="M${P(a)}C${P([a[0],a[1]+bulge])} ${P([b[0],b[1]+bulge])} ${P(b)}" style="stroke:color-mix(in srgb,var(--e-${c}) 80%,#000)"/>`;
// receptor de 7 hélices (GPCR). Devuelve SVG; la hélice 6 (índice 5) lleva la clase tm6 para el cambio conformacional
function tm7(x,y,o={}){const c=o.c||'rc',h=o.h||66,w=o.w||9,gap=o.gap||10.5;let back='',front='',lps='';const xs=[];
  for(let i=0;i<7;i++){const xx=x+i*gap,yy=y+(i%2?-2.5:2.5);xs.push([xx,yy]);
    const H=helix(xx,yy,w,h,i%2?c:c,{cls:(i===5?'tm6 ':'')+(i%2?'bk':'fr'),attr:i===5?' data-r="tm6"':''});if(i%2)back+=H;else front+=H}
  for(let i=0;i<6;i++){const [x1,y1]=xs[i],[x2,y2]=xs[i+1];if(i%2===0)lps+=loop([x1+w/2,y1+h-2],[x2+w/2,y2+h-2],i===4?16:9,c);else lps+=loop([x1+w/2,y1+2],[x2+w/2,y2+2],-10,c)}
  const nt=`<path class="b-loop" d="M${P([xs[0][0]+w/2,xs[0][1]+2])}C${P([xs[0][0]-6,xs[0][1]-14])} ${P([xs[0][0]-14,xs[0][1]-4])} ${P([xs[0][0]-20,xs[0][1]-16])}" style="stroke:color-mix(in srgb,var(--e-${c}) 80%,#000)"/>`;
  const ct=`<path class="b-loop" d="M${P([xs[6][0]+w/2,xs[6][1]+h-2])}C${P([xs[6][0]+w/2+4,xs[6][1]+h+12])} ${P([xs[6][0]+w+12,xs[6][1]+h+4])} ${P([xs[6][0]+w+18,xs[6][1]+h+14])}" style="stroke:color-mix(in srgb,var(--e-${c}) 80%,#000)"/>`;
  return `<g class="b-tm7">${back}${lps}${nt}${ct}${front}</g>`}
// nucleótido de guanina: base + 2 fosfatos (GDP) o 3 (GTP)
function gnuc(x,y,n,o={}){const k=o.s||1.25;let s=`<g class="b-nuc${o.cls?' '+o.cls:''}"${o.attr||''}><g transform="translate(${f1(x)} ${f1(y)}) scale(${k})"><path d="M-5 0l2.5-4.3h5l2.5 4.3-2.5 4.3h-5z" class="b-base"/>`;for(let i=0;i<n;i++)s+=`<circle cx="${f1(7+i*4.6)}" cy="0" r="2.3" class="b-pi"/>`;s+='</g>';if(o.label)s+=`<text class="b-ntag" x="${f1(x+(7+n*4.6)*k+2)}" y="${f1(y+3.5)}">${n===3?'GTP':'GDP'}</text>`;return s+`</g>`}
// fosfato unido a una proteína
const phos=(x,y,r=5.2,o={})=>`<g class="b-P${o.cls?' '+o.cls:''}"${o.attr||''}><circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="url(#bv-sg)"/><text x="${f1(x)}" y="${f1(y+r*.42)}" text-anchor="middle" style="font-size:${f1(r*1.25)}px">P</text></g>`;
// proteína G trimérica αβγ: α con el nucleótido en su hendidura, β en hélice de 7 aspas, γ pequeña; α y γ anclados por lípidos
function gprot(x,y,o={}){const mem=o.mem??(y-24);const n=o.gtp?3:2;
  const a=`<g class="b-ga" data-r="ga"><path class="b-anchor" d="M${f1(x-8)} ${f1(y-13)}l-3-4 3-4-3-4 3-4" />${blob(x,y,17,14,'td',{seed:5})}${blob(x+9,y+9,9,7,'td',{seed:8,f:false,cls:'hd'})}${gnuc(x-10,y+2,2,{cls:'gdp',attr:' data-r="gdp"',label:o.label})}${gnuc(x-10,y+2,3,{cls:'gtp',attr:' data-r="gtp"',label:o.label})}<text class="b-lab" x="${f1(x+2)}" y="${f1(y-4)}">α</text></g>`;
  let blades='';for(let i=0;i<7;i++){const t=i/7*Math.PI*2;blades+=`M${P([x+28+Math.cos(t)*3.5,y+7+Math.sin(t)*3.5])}L${P([x+28+Math.cos(t)*10,y+7+Math.sin(t)*10])}`}
  const bg=`<g class="b-bg" data-r="bg"><path class="b-anchor" d="M${f1(x+40)} ${f1(y-3)}l3-4-3-4 3-4-3-4"/>${blob(x+28,y+7,12.5,12,'rs',{seed:11,rough:.06})}<path class="b-blade" d="${blades}"/>${helix(x+38,y-6,5,15,'rs',{step:4})}<text class="b-lab" x="${f1(x+28)}" y="${f1(y+28)}">βγ</text></g>`;
  return `<g class="b-g">${bg}${a}</g>`}
// adenilil ciclasa: 2×6 hélices en la membrana y dos dominios catalíticos en el citosol
function acyc(x,y,o={}){const c=o.c||'sg';let s='';for(let i=0;i<6;i++)s+=helix(x+i*5.5-2,y+(i%2?-1.5:1.5),5,o.h||44,c,{step:4.5});for(let i=0;i<6;i++)s+=helix(x+40+i*5.5-2,y+(i%2?1.5:-1.5),5,o.h||44,c,{step:4.5});
  return `<g class="b-ac">${s}${blob(x+16,y+(o.h||44)+16,17,12,c,{seed:21})}${blob(x+52,y+(o.h||44)+16,17,12,c,{seed:23})}</g>`}
// ---------- moléculas pequeñas (forma química simplificada) ----------
const hex=(x,y,r)=>{let d='';for(let i=0;i<6;i++){const a=Math.PI/6+i*Math.PI/3;d+=(i?'L':'M')+P([x+r*Math.cos(a),y+r*Math.sin(a)])}return d+'Z'};
const pent=(x,y,r,rot=-Math.PI/2)=>{let d='';for(let i=0;i<5;i++){const a=rot+i*2*Math.PI/5;d+=(i?'L':'M')+P([x+r*Math.cos(a),y+r*Math.sin(a)])}return d+'Z'};
function mol(kind,x,y,s=1,o={}){const k=o.cls?' '+o.cls:'',at=o.attr||'';
  switch(kind){
  case 'amine':// catecolamina (adrenalina): anillo de catecol + cadena con la amina
    return `<g class="b-mol m-sg${k}"${at}><path class="m-ring" d="${hex(x-3*s,y,5.4*s)}"/><path class="m-bond" d="M${P([x+1.7*s,y-2.7*s])}l${f1(5*s)} ${f1(-3*s)}l${f1(5*s)} ${f1(3*s)}M${P([x-7.7*s,y-2.7*s])}l${f1(-3.5*s)} ${f1(-2.2*s)}M${P([x-7.7*s,y+2.7*s])}l${f1(-3.5*s)} ${f1(2.2*s)}"/><circle class="m-n" cx="${f1(x+12*s)}" cy="${f1(y)}" r="${f1(2.3*s)}"/><circle class="m-o" cx="${f1(x-11.6*s)}" cy="${f1(y-5*s)}" r="${f1(1.9*s)}"/><circle class="m-o" cx="${f1(x-11.6*s)}" cy="${f1(y+5*s)}" r="${f1(1.9*s)}"/></g>`;
  case 'ach':// acetilcolina: éster + amonio cuaternario
    return `<g class="b-mol m-sg${k}"${at}><path class="m-bond" d="M${P([x-9*s,y+2*s])}l${f1(4*s)} ${f1(-4*s)}l${f1(4*s)} ${f1(4*s)}l${f1(4*s)} ${f1(-4*s)}l${f1(4*s)} ${f1(4*s)}"/><circle class="m-o" cx="${f1(x-5*s)}" cy="${f1(y-5*s)}" r="${f1(1.9*s)}"/><circle class="m-n" cx="${f1(x+9*s)}" cy="${f1(y+2.5*s)}" r="${f1(3.2*s)}"/></g>`;
  case 'steroid':// núcleo de cuatro anillos (tres de seis y uno de cinco)
    return `<g class="b-mol m-ster${k}"${at}><path class="m-ring" d="${hex(x-9.5*s,y+2.7*s,4.6*s)}${hex(x-1.6*s,y+2.7*s,4.6*s)}${hex(x+2.4*s,y-4.2*s,4.6*s)}${pent(x+10.2*s,y-3.6*s,3.9*s,Math.PI)}"/><circle class="m-o" cx="${f1(x-15.5*s)}" cy="${f1(y+5*s)}" r="${f1(1.8*s)}"/></g>`;
  case 'gf':// factor de crecimiento: proteína pequeña globular
    return `<g class="b-mol${k}"${at}>${blob(x,y,9*s,7.5*s,'sg',{seed:31,rough:.16,f:false})}</g>`;
  case 'no':return `<g class="b-mol${k}"${at}><circle cx="${f1(x-2.6*s)}" cy="${f1(y)}" r="${f1(3.6*s)}" fill="url(#bv-td)"/><circle cx="${f1(x+2.8*s)}" cy="${f1(y)}" r="${f1(3.3*s)}" fill="url(#bv-of)"/></g>`;
  case 'camp':// AMPc: purina (6+5) unida a la ribosa con el fosfato cíclico
    return `<g class="b-mol m-td${k}"${at}><path class="m-ring" d="${hex(x-4.4*s,y,3.3*s)}${pent(x+.6*s,y-.4*s,2.8*s,Math.PI)}${pent(x+6.4*s,y+3.2*s,2.6*s)}"/><circle class="m-p" cx="${f1(x+9.6*s)}" cy="${f1(y+6*s)}" r="${f1(1.9*s)}"/></g>`;
  case 'atp':return `<g class="b-mol m-mu${k}"${at}><path class="m-ring" d="${hex(x-4*s,y,3*s)}${pent(x+1*s,y,2.6*s,Math.PI)}"/>${[0,1,2].map(i=>`<circle class="m-p" cx="${f1(x+6*s+i*3.8*s)}" cy="${f1(y)}" r="${f1(1.7*s)}"/>`).join('')}</g>`;
  case 'ip3':// inositol (anillo de seis) con tres fosfatos
    return `<g class="b-mol m-rc${k}"${at}><path class="m-ring" d="${hex(x,y,4.2*s)}"/>${[-90,30,150].map(a=>{const t=a*Math.PI/180;return `<circle class="m-p" cx="${f1(x+Math.cos(t)*7.4*s)}" cy="${f1(y+Math.sin(t)*7.4*s)}" r="${f1(2.1*s)}"/>`}).join('')}</g>`;
  case 'pip2':return `<g class="b-mol m-rc${k}"${at}><path class="m-ring" d="${hex(x,y,3.6*s)}"/><circle class="m-p" cx="${f1(x-5.6*s)}" cy="${f1(y-3*s)}" r="${f1(1.8*s)}"/><circle class="m-p" cx="${f1(x+5.6*s)}" cy="${f1(y-3*s)}" r="${f1(1.8*s)}"/></g>`;
  case 'dag':// diacilglicerol: glicerol + dos colas de ácido graso
    return `<g class="b-mol m-sg${k}"${at}><circle class="m-o" cx="${f1(x)}" cy="${f1(y)}" r="${f1(2.6*s)}"/><path class="m-bond" d="M${P([x-1.4*s,y+2*s])}l${f1(-1.2*s)} ${f1(4*s)} ${f1(1.2*s)} ${f1(4*s)} ${f1(-1.2*s)} ${f1(4*s)}M${P([x+1.4*s,y+2*s])}l${f1(1.2*s)} ${f1(4*s)} ${f1(-1.2*s)} ${f1(4*s)} ${f1(1.2*s)} ${f1(4*s)}"/></g>`;
  case 'ca':return `<circle class="b-ion m-ca${k}"${at} cx="${f1(x)}" cy="${f1(y)}" r="${f1(3.3*s)}"/>`;
  case 'ion':return `<circle class="b-ion${k}"${at} cx="${f1(x)}" cy="${f1(y)}" r="${f1(3*s)}" fill="url(#bv-ion)"/>`;
  case 'gmpc':return `<g class="b-mol m-rs${k}"${at}><path class="m-ring" d="${hex(x-4.4*s,y,3.3*s)}${pent(x+.6*s,y-.4*s,2.8*s,Math.PI)}${pent(x+6.4*s,y+3.2*s,2.6*s)}"/><circle class="m-p" cx="${f1(x+9.6*s)}" cy="${f1(y+6*s)}" r="${f1(1.9*s)}"/></g>`;
  }}
// ADN de doble hélice con un segmento resaltado (HRE / CRE)
function dna(x1,x2,y,o={}){const A=o.a||5.5,per=o.per||22;let s1='',s2='',bp='';for(let x=x1;x<=x2;x+=2){const t=(x-x1)/per*Math.PI*2;s1+=(x===x1?'M':'L')+P([x,y+Math.sin(t)*A]);s2+=(x===x1?'M':'L')+P([x,y-Math.sin(t)*A])}
  for(let x=x1+3;x<x2;x+=per/5)bp+=`M${f1(x)} ${f1(y+Math.sin((x-x1)/per*Math.PI*2)*A)}L${f1(x)} ${f1(y-Math.sin((x-x1)/per*Math.PI*2)*A)}`;
  const hl=o.hl?`<rect class="b-hre" x="${o.hl[0]}" y="${y-A-4}" width="${o.hl[1]-o.hl[0]}" height="${2*A+8}" rx="3"/>`:'';
  return `<g class="b-dna">${hl}<path class="b-bp" d="${bp}"/><path class="b-s1" d="${s1}"/><path class="b-s2" d="${s2}"/></g>`}
const mrna=(x,y,len,o={})=>{let d=`M${f1(x)} ${f1(y)}`;for(let i=1;i<=len/6;i++)d+=`Q${f1(x+i*6-3)} ${f1(y+(i%2?-4:4))} ${f1(x+i*6)} ${f1(y)}`;return `<path class="b-mrna${o.cls?' '+o.cls:''}"${o.attr||''} d="${d}"/>`};
// ---------- movimiento ----------
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const ease=u=>u<.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2;
const seg=(t,a,b)=>ease(clamp((t-a)/(b-a)));
const lerp=(a,b,u)=>a+(b-a)*u;
// difusión: desplazamiento aleatorio suave que se apaga al acercarse al destino
const wob=(t,seed,amp)=>amp*(Math.sin(t*1.7+seed)*.6+Math.sin(t*3.1+seed*2.3)*.3+Math.sin(t*5.3+seed*.7)*.1);
// Reproductor: una escena es una función render(t) pura; el reproductor sólo avanza t.
// Controles: reproducir/pausa, reiniciar, saltar a una fase. Se detiene fuera de pantalla y respeta «reducir movimiento».
function player(o){const {dur,render,phases=[],onPhase}=o;let t=0,playing=false,raf=0,last=0,visible=true,cur=-1,stopAt=dur;
  const phaseAt=tt=>{let k=-1;phases.forEach((p,i)=>{if(tt>=p.t-1e-6)k=i});return k};
  const draw=()=>{render(t);const k=phaseAt(t);if(k!==cur){cur=k;onPhase&&onPhase(k)}o.onTick&&o.onTick(t,playing)};
  const tick=now=>{const dt=last?Math.min((now-last)/1000,1/30):1/60;last=now;t=Math.min(stopAt,t+dt);draw();
    if(t>=stopAt){playing=false;raf=0;o.onTick&&o.onTick(t,false);return}raf=visible&&playing?requestAnimationFrame(tick):0};
  const api={get t(){return t},get playing(){return playing},
    play(from,to){if(from!=null)t=from;stopAt=to??dur;if(t>=stopAt)t=from??0;if(X.RM()){t=stopAt;draw();playing=false;return}playing=true;last=0;if(!raf&&visible)raf=requestAnimationFrame(tick);draw()},
    pause(){playing=false;if(raf)cancelAnimationFrame(raf);raf=0;draw()},
    toggle(){playing?api.pause():api.play(t>=dur?0:t)},
    seek(v){t=clamp(v,0,dur);draw()},
    phase(i,go=true){const a=phases[i]?phases[i].t:0,b=phases[i+1]?phases[i+1].t:dur;if(go)api.play(a,b);else{api.pause();t=b-1e-3;draw()}},
    reset(){api.pause();t=0;draw()},
    visible(v){visible=v;if(v&&playing&&!raf){last=0;raf=requestAnimationFrame(tick)}if(!v&&raf){cancelAnimationFrame(raf);raf=0}},
    draw};
  return api}
// controles de reproducción con el lenguaje visual de la lectura (texto, sin iconos de software)
function ctlHTML(phases){return `<div class="b-ctl"><button type="button" class="act" data-p="play" aria-label="Reproducir">Reproducir</button><button type="button" data-p="reset">Reiniciar</button><span class="b-prog" aria-hidden="true"><i></i></span></div><ol class="b-ph">${phases.map((p,i)=>`<li><button type="button" data-ph="${i}"><span>${String(i+1).padStart(2,'0')}</span>${p.label}</button></li>`).join('')}</ol>`}
function wireCtl(root,pl,phases){const pb=root.querySelector('[data-p=play]'),bar=root.querySelector('.b-prog i'),lis=[...root.querySelectorAll('.b-ph li')];
  pb.onclick=()=>pl.toggle();root.querySelector('[data-p=reset]').onclick=()=>{pl.reset();pl.play(0)};
  root.querySelectorAll('[data-ph]').forEach(b=>b.onclick=()=>pl.phase(+b.dataset.ph));
  return {tick:(t,playing,dur)=>{pb.textContent=playing?'Pausa':(t>=dur-1e-3?'Repetir':(t>0?'Continuar':'Reproducir'));pb.setAttribute('aria-label',pb.textContent);bar.style.width=(t/dur*100).toFixed(1)+'%'},
    phase:k=>lis.forEach((li,i)=>{li.classList.toggle('on',i<=k);li.classList.toggle('cur',i===k)})}}
// ---------- proyección isométrica (de anatomy/kit/iso-kit.mjs, MIT) ----------
const RAD=Math.PI/180,UNIT=Math.sqrt(1.6);
function cam(p){const a=p.azimuth*RAD,e=p.elevation*RAD;return {sA:Math.sin(a),cA:Math.cos(a),sE:Math.sin(e),cE:Math.cos(e),k:p.scale*UNIT}}
function iso([x,y,z],p){const c=cam(p);return [p.origin[0]+(x*c.sA-y*c.cA)*c.k,p.origin[1]+((x*c.cA+y*c.sA)*c.sE-z*c.cE)*c.k]}
function depth([x,y,z],p){const c=cam(p);return (x*c.cA+y*c.sA)*c.cE+z*c.sE}
function fit(points,w,h,{pad=24,azimuth=45,elevation=30}={}){const u={origin:[0,0],scale:1,azimuth,elevation};const fl=points.map(q=>iso(q,u));
  const xs=fl.map(q=>q[0]),ys=fl.map(q=>q[1]);const l=Math.min(...xs),r=Math.max(...xs),t=Math.min(...ys),b=Math.max(...ys);const s=Math.min((w-pad*2)/(r-l),(h-pad*2)/(b-t));
  return {origin:[w/2-(l+r)/2*s,h/2-(t+b)/2*s],scale:s,azimuth,elevation}}
// visibilidad para bucles de animación (lee la entrada más reciente, como pide anatomy)
function seen(el,f){if(!('IntersectionObserver' in window)){f(true);return {disconnect(){}}}const o=new IntersectionObserver(es=>f(es[es.length-1].isIntersecting,es[es.length-1]),{rootMargin:'120px 0px',threshold:[0,.35]});o.observe(el);return o}

X.bioCSS=`
.ed .b-core{fill:var(--e-core)}
.ed .b-tail{fill:none;stroke:var(--e-lt);stroke-width:.85;stroke-linecap:round;stroke-linejoin:round;opacity:.9}
.ed .b-head circle{fill:url(#bv-lh);stroke:color-mix(in srgb,var(--e-lh) 70%,#000);stroke-width:.45}
.ed .b-prot{stroke-width:.8}
.ed .b-prot.hd{opacity:.92}
.ed .b-turn{fill:none;stroke-width:.7;opacity:.32}
.ed .b-hx rect{stroke-width:.7}
.ed .b-tm7 .bk rect{filter:brightness(.86)}
.ed .b-loop{fill:none;stroke-width:2.3;stroke-linecap:round;opacity:.85}
.ed .b-anchor{fill:none;stroke:var(--e-lt);stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round}
.ed .b-lab{font:600 11px var(--e-mono);fill:#141a2f;text-anchor:middle;pointer-events:none}
.ed .b-base{fill:var(--e-rsl);stroke:var(--e-rs);stroke-width:1}
.ed .b-pi{fill:var(--e-sg);stroke:var(--e-paper);stroke-width:.6}
.ed .b-nuc.gtp .b-pi:last-of-type{fill:var(--e-of)}
.ed .b-ntag{font:600 9px var(--e-mono);fill:var(--e-ink);paint-order:stroke;stroke:var(--e-paper);stroke-width:2.5px}
.ed .b-P text{font-family:var(--e-mono);font-weight:700;fill:#1c1407;pointer-events:none}
.ed .b-P circle{stroke:color-mix(in srgb,var(--e-sg) 60%,#000);stroke-width:.6}
.ed .b-blade{fill:none;stroke:color-mix(in srgb,var(--e-rs) 55%,#000);stroke-width:.9;opacity:.55}
.ed .b-mol{--mc:var(--e-sg)}.ed .b-mol.m-td{--mc:var(--e-td)}.ed .b-mol.m-rc{--mc:var(--e-rc)}.ed .b-mol.m-rs{--mc:var(--e-rs)}.ed .b-mol.m-mu{--mc:var(--e-mu)}.ed .b-mol.m-ster{--mc:var(--e-sg)}
.ed .b-mol .m-ring{fill:color-mix(in srgb,var(--mc) 28%,var(--e-paper));stroke:var(--mc);stroke-width:1.25;stroke-linejoin:round}
.ed .b-mol .m-bond{fill:none;stroke:var(--mc);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
.ed .b-mol .m-n{fill:url(#bv-td)}.ed .b-mol .m-o{fill:url(#bv-of)}.ed .b-mol .m-p{fill:url(#bv-sg);stroke:color-mix(in srgb,var(--e-sg) 60%,#000);stroke-width:.5}
.ed .b-ion{stroke:color-mix(in srgb,var(--e-td) 60%,#000);stroke-width:.4}.ed .b-ion.m-ca{fill:url(#bv-rs);stroke:color-mix(in srgb,var(--e-rs) 60%,#000)}
.ed .b-dna .b-s1,.ed .b-dna .b-s2{fill:none;stroke-width:2.2;stroke-linecap:round}.ed .b-dna .b-s1{stroke:var(--e-rc)}.ed .b-dna .b-s2{stroke:color-mix(in srgb,var(--e-rc) 55%,var(--e-paper))}
.ed .b-dna .b-bp{stroke:var(--e-mu);stroke-width:1;opacity:.55}.ed .b-hre{fill:var(--e-sgl);stroke:var(--e-sg);stroke-width:1}
.ed .b-mrna{fill:none;stroke:var(--e-rs);stroke-width:2.2;stroke-linecap:round}
.ed .b-ctl{display:flex;align-items:center;gap:6px 18px;flex-wrap:wrap;margin:12px 0 0}
.ed .b-ctl button{background:none;border:0;border-bottom:2px solid transparent;padding:8px 0;font:500 12px/1.3 var(--e-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--e-mut);cursor:pointer;min-height:36px}
.ed .b-ctl button.act{color:var(--e-td)}.ed .b-ctl button:hover{color:var(--e-ink)}
.ed .b-ctl button:focus-visible,.ed .b-ph button:focus-visible{outline:2px solid var(--e-td);outline-offset:3px}
.ed .b-prog{flex:1;min-width:80px;height:2px;background:var(--e-rule);position:relative}.ed .b-prog i{position:absolute;left:0;top:0;bottom:0;background:var(--e-td);width:0}
.ed .b-ph{list-style:none;padding:0;margin:4px 0 0;display:grid;grid-template-columns:repeat(var(--n,4),minmax(0,1fr));gap:0;border-top:1px solid var(--e-rule)}
.ed .b-ph>li{margin:0!important;padding:0!important}.ed .b-ph>li::before{display:none!important}
.ed .b-ph button{display:block;width:100%;text-align:left;background:none;border:0;border-top:3px solid transparent;margin-top:-2px;padding:10px 12px 10px 0;font:400 14.5px/1.4 var(--e-body);color:var(--e-mut);cursor:pointer;transition:color .3s,border-color .3s}
.ed .b-ph button span{display:block;font:500 11px var(--e-mono);letter-spacing:.12em;margin-bottom:4px}
.ed .b-ph li.on button{color:var(--e-ink)}.ed .b-ph li.cur button{border-color:var(--e-td)}
@media (max-width:640px){.ed .b-ph{grid-template-columns:1fr 1fr}.ed .b-ph button{font-size:14px}}
.ed .b-zone{font:500 10.5px var(--e-mono);letter-spacing:.16em;text-transform:uppercase;fill:var(--e-mut)}
.ed .b-exo{fill:var(--e-exo)}.ed .b-cyto{fill:var(--e-cyt)}
.ed .b-hit{fill:transparent;cursor:pointer}
`;
X.B={defs,smooth,sample,line,vline,bilayer,blob,blobPath,helix,loop,tm7,gnuc,phos,gprot,acyc,mol,dna,mrna,hex,pent,clamp,ease,seg,lerp,wob,player,ctlHTML,wireCtl,iso,depth,fit,seen,rng,f1,P};
})();
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
(function(){
'use strict';
const css=String.raw`
/* Identidad de esta lectura: revista científica. Papel neutro, tinta azul noche, cuatro colores que
   codifican siempre la misma etapa: señal (ámbar) · receptor (violeta) · transducción (cobalto) · respuesta (verde);
   el apagado en óxido. Fraunces para títulos, Source Serif para el texto, IBM Plex Mono para rótulos de figura. */
article.book.ed{
  --e-paper:#fbfaf7;--e-ink:#141a2f;--e-mut:#5e6377;--e-rule:#dcd8ce;--e-plate:#f3f1ec;--e-plate2:#ebe8e1;
  --e-sg:#b9790f;--e-sgl:#f6e3bd;--e-rc:#5d43a6;--e-rcl:#e7e0f6;--e-td:#2346c4;--e-tdl:#dfe6fb;--e-rs:#25725a;--e-rsl:#d7ece3;--e-of:#a8442f;--e-ofl:#f5ddd5;
  --e-mem:#ead9b4;--e-memh:#c9ae74;--e-cyt:#fbfaf7;--e-nuc:#efeaf7;--e-mu:#8a8fa3;--e-lh:#d99a55;--e-lt:#c9a96a;--e-core:#f7eed8;--e-exo:#eef2f3;--e-dk:#5e6377;
  --e-disp:"Fraunces","Cormorant Garamond",Georgia,serif;--e-body:"Source Serif 4",Georgia,serif;--e-mono:"IBM Plex Mono",ui-monospace,Menlo,monospace;
  background:var(--e-paper);color:var(--e-ink);border:0;border-radius:0;max-width:1080px;padding:0 0 48px;font-family:var(--e-body);box-shadow:none}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) article.book.ed{
  --e-paper:#11141f;--e-ink:#e9e6dd;--e-mut:#9ca1b6;--e-rule:#2b3044;--e-plate:#171b29;--e-plate2:#1e2333;
  --e-sg:#e2a646;--e-sgl:#3d311b;--e-rc:#a892ee;--e-rcl:#2c2547;--e-td:#7f9cff;--e-tdl:#1f2a52;--e-rs:#5fc39d;--e-rsl:#173a30;--e-of:#e3846c;--e-ofl:#43241d;
  --e-mem:#4a3f29;--e-memh:#8a7446;--e-cyt:#141826;--e-nuc:#1d1a2e;--e-mu:#6f7590;--e-lh:#c08a4a;--e-lt:#76623d;--e-core:#2a2519;--e-exo:#0f1520;--e-dk:#9ca1b6;color-scheme:dark}}
:root[data-theme="dark"] article.book.ed{
  --e-paper:#11141f;--e-ink:#e9e6dd;--e-mut:#9ca1b6;--e-rule:#2b3044;--e-plate:#171b29;--e-plate2:#1e2333;
  --e-sg:#e2a646;--e-sgl:#3d311b;--e-rc:#a892ee;--e-rcl:#2c2547;--e-td:#7f9cff;--e-tdl:#1f2a52;--e-rs:#5fc39d;--e-rsl:#173a30;--e-of:#e3846c;--e-ofl:#43241d;
  --e-mem:#4a3f29;--e-memh:#8a7446;--e-cyt:#141826;--e-nuc:#1d1a2e;--e-mu:#6f7590;--e-lh:#c08a4a;--e-lt:#76623d;--e-core:#2a2519;--e-exo:#0f1520;--e-dk:#9ca1b6;color-scheme:dark}
@media (min-width:901px){.reader.ed-r:not(.noside){grid-template-columns:190px minmax(0,1fr)}}
.ed .crumb,.ed>h1.ct{display:none}
.ed b{color:inherit;font-weight:650}
/* ---------- portada ---------- */
.ed-hero{position:relative;background:#0c1122;color:#ece8de;margin:0 0 64px;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);align-items:stretch;overflow:hidden;min-height:440px}
.ed-hero .hx{padding:clamp(28px,5vw,64px) clamp(22px,4vw,56px);display:flex;flex-direction:column;justify-content:space-between;gap:28px;position:relative;z-index:1}
.ed-hero .kk{font:500 12px/1.5 var(--e-mono);letter-spacing:.18em;text-transform:uppercase;color:#9fa8c8}
.ed-hero h1{font:400 clamp(40px,5.4vw,68px)/.98 var(--e-disp);font-variation-settings:"opsz" 144,"SOFT" 30;letter-spacing:-.015em;margin:14px 0 18px;color:#f4f0e6;text-wrap:balance}
.ed-hero h1 i{font-style:italic;color:#f0c46c}
.ed-hero p{font:400 19px/1.55 var(--e-body);color:#c9cbd8;max-width:30em;margin:0}
.ed-hero .q{border-top:1px solid #2c3556;padding-top:18px}
.ed-hero .q span{display:block;font:italic 400 22px/1.3 var(--e-disp);color:#f4f0e6;margin-bottom:12px}
.ed-chain{display:flex;flex-wrap:wrap;gap:6px 0;align-items:center;font:500 12px/1 var(--e-mono);letter-spacing:.12em;text-transform:uppercase}
.ed-chain a{color:#c9cbd8;text-decoration:none;padding:6px 0;border-bottom:2px solid transparent}
.ed-chain a:hover,.ed-chain a:focus-visible{color:#fff;border-color:currentColor;outline:none}
.ed-chain i{font-style:normal;color:#5d6688;padding:0 10px}
.ed-chain a[data-c=sg]{border-color:#e2a646}.ed-chain a[data-c=rc]{border-color:#a892ee}.ed-chain a[data-c=td]{border-color:#7f9cff}.ed-chain a[data-c=rs]{border-color:#5fc39d}
.ed-hero .art{position:relative;min-height:300px}
.ed .ed-hero .b-core{fill:#3b3424}.ed .ed-hero .b-tail{stroke:#a88d55;opacity:.75}.ed .ed-hero .b-head circle{fill:#c9ae74;stroke:#6b5a33}
.ed-hero svg{position:absolute;inset:0;width:100%;height:100%}
.ed-hero .art .lgd{position:absolute;right:16px;bottom:12px;font:500 10.5px/1.6 var(--e-mono);color:#7e88aa;text-align:right;letter-spacing:.06em}
@keyframes edDrift{0%{transform:translate(0,0)}50%{transform:translate(var(--dx),var(--dy))}100%{transform:translate(0,0)}}
@keyframes edDock{0%,18%{transform:translate(var(--dx),var(--dy))}46%,70%{transform:translate(0,0)}100%{transform:translate(var(--dx),var(--dy))}}
@keyframes edGlow{0%,40%{opacity:0}55%,72%{opacity:.9}100%{opacity:0}}
.ed-hero .drift{animation:edDrift var(--t,11s) ease-in-out infinite;transform-box:fill-box}
.ed-hero .dock{animation:edDock 9s cubic-bezier(.4,0,.2,1) infinite}
.ed-hero .glow{animation:edGlow 9s ease-in-out infinite}
.ed-hero.paused *{animation-play-state:paused!important}
@media (max-width:820px){.ed-hero{grid-template-columns:1fr;min-height:0}.ed-hero .art{min-height:250px;order:-1}}
/* ---------- composición de secciones ---------- */
.ed .bsec{display:grid;grid-template-columns:150px minmax(0,1fr);column-gap:40px;padding:0 clamp(18px,3vw,40px);margin:0 0 72px;align-items:start}
.ed .bsec>*{grid-column:2;max-width:690px;min-width:0}
.ed .bsec>.pk{grid-column:1;grid-row:1 / span 80;position:sticky;top:130px;font:500 11px/1.5 var(--e-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--e-mut);padding-top:8px;max-width:none}
.ed .bsec>.pk b{display:block;font:300 64px/1 var(--e-disp);letter-spacing:-.02em;color:var(--e-ink);font-variation-settings:"opsz" 144;margin-bottom:6px}
.ed .bsec>h2{font:400 clamp(34px,4.4vw,52px)/1.02 var(--e-disp);font-style:italic;font-variation-settings:"opsz" 144,"SOFT" 50;color:var(--e-ink);margin:0 0 26px;letter-spacing:-.01em;text-wrap:balance;border-bottom:1px solid var(--e-ink);padding-bottom:18px}
.ed .bsec>h3{font:600 25px/1.2 var(--e-disp);font-variation-settings:"opsz" 48;color:var(--e-ink);border:0;margin:46px 0 12px;padding:0;text-wrap:balance}
.ed .bsec>h3::before{content:"";display:block;width:34px;height:2px;background:var(--e-ink);margin-bottom:14px}
.ed .bsec p,.ed .bsec li{font-size:clamp(17px,1.6vw,18.5px);line-height:1.72;color:var(--e-ink)}
.ed .bsec p.lead{font:400 clamp(21px,2.2vw,25px)/1.5 var(--e-disp);font-variation-settings:"opsz" 36;color:var(--e-ink)}
.ed .bsec ol{counter-reset:ed;list-style:none;padding-left:0}
.ed .bsec ol>li{counter-increment:ed;position:relative;padding-left:40px;margin:12px 0}
.ed .bsec ol>li::before{content:counter(ed,decimal-leading-zero);position:absolute;left:0;top:.28em;font:500 12px/1 var(--e-mono);color:var(--e-td);letter-spacing:.06em}
.ed .bsec ul{padding-left:20px}.ed .bsec ul>li::marker{color:var(--e-mu)}
.ed .bsec>.tw,.ed .bsec>figure,.ed .bsec>.vizhost,.ed .bsec>.ed-wide,.ed .bsec>.ed-static{grid-column:2;max-width:none}
/* tablas */
.ed .tw{overflow-x:auto;margin:22px 0 30px}
.ed table.cmp{border-collapse:collapse;width:100%;font:400 15.5px/1.5 var(--e-body);background:transparent;border:0}
.ed table.cmp th{font:500 11px/1.4 var(--e-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--e-mut);text-align:left;background:transparent;border:0;border-bottom:1px solid var(--e-ink);padding:8px 14px 8px 0}
.ed table.cmp td{border:0;border-bottom:1px solid var(--e-rule);padding:12px 14px 12px 0;vertical-align:top;background:transparent;color:var(--e-ink)}
.ed table.cmp tr:nth-child(even) td{background:transparent}
.ed .tbl-err td:first-child{color:var(--e-of);font-style:italic}
/* recuadros del capítulo */
.ed .box{background:transparent;border:0;border-radius:0;padding:0;margin:30px 0;box-shadow:none;color:var(--e-ink)}
.ed .box>b:first-child{display:block;font:500 11px/1.4 var(--e-mono);letter-spacing:.16em;text-transform:uppercase;margin-bottom:8px}
.ed .box.concepto{border-left:3px solid var(--e-td);padding:6px 0 6px 24px;font:400 21px/1.5 var(--e-disp);font-variation-settings:"opsz" 36}
.ed .box.concepto>b:first-child{color:var(--e-td)}
.ed .box.concepto b{font-weight:600}
.ed .box.ojo{border-top:1px solid var(--e-of);padding-top:12px;font-size:16.5px;line-height:1.6;max-width:600px}
.ed .box.ojo>b:first-child{color:var(--e-of)}.ed .box.ojo>b:first-child::before{content:"Error frecuente · "}
.ed .box.examen{border-top:1px solid var(--e-ink);border-bottom:1px solid var(--e-rule);padding:12px 0 16px;font-size:16.5px;line-height:1.6}
.ed .box.examen>b:first-child::before{content:"Para el examen · ";color:var(--e-ink)}
.ed .box.examen>b:first-child{color:var(--e-mut)}
.ed .box.examen .btn,.ed .box.quiz .btn{background:transparent;color:var(--e-td);border:0;border-bottom:1px solid currentColor;border-radius:0;padding:2px 0;margin:10px 18px 0 0;font:500 12px/1.4 var(--e-mono);letter-spacing:.1em;text-transform:uppercase;box-shadow:none}
.ed .box.quiz{border:1px solid var(--e-ink);padding:18px 22px}
.ed .box.quiz>b:first-child{color:var(--e-ink)}
.ed details.why{background:transparent;border:0;border-left:1px solid var(--e-rule);border-radius:0;padding:0 0 0 18px;margin:22px 0}
.ed details.why summary{font:italic 400 19px/1.35 var(--e-disp);color:var(--e-ink);padding:2px 0;cursor:pointer}
.ed details.why summary::after{content:"  +";font:500 13px var(--e-mono);color:var(--e-mut)}.ed details.why[open] summary::after{content:"  −"}
.ed details.why ol{padding:4px 0 0}
.ed .clin{border-left:3px solid var(--e-rs);padding-left:22px!important}
.ed h3.clin::before{content:"Relación clínica";display:block;width:auto;height:auto;background:none;font:500 11px/1.4 var(--e-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--e-rs);margin-bottom:8px}
.ed .imp{background:transparent!important;color:var(--e-mut)!important;font:500 10.5px/1 var(--e-mono)!important;letter-spacing:.1em;text-transform:uppercase;padding:0!important;margin-left:10px;vertical-align:middle}
.ed .imp::before{content:"";display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:6px;vertical-align:1px;background:var(--e-mu)}
.ed .imp-r::before{background:var(--e-of)}.ed .imp-y::before{background:var(--e-sg)}
.ed .htools button{background:transparent;border:1px solid var(--e-rule);color:var(--e-mut);opacity:.75;padding:3px 6px;border-radius:2px;display:inline-grid;place-items:center}
.ed .htools button svg{width:14px;height:14px;display:block}
.ed .htools button.on{color:var(--e-sg);border-color:var(--e-sg);background:transparent;opacity:1}
.ed ul.hy{columns:2;column-gap:40px;list-style:none;padding:0;counter-reset:hy}
.ed ul.hy li{break-inside:avoid;counter-increment:hy;padding:0 0 12px 34px;position:relative;font-size:16.5px;line-height:1.55;margin:0}
.ed ul.hy li::before{content:counter(hy,decimal-leading-zero);position:absolute;left:0;top:.25em;font:500 11.5px var(--e-mono);color:var(--e-of)}
.ed .bsec>ul.hy{max-width:none;grid-column:2 / -1}
@media (max-width:760px){.ed ul.hy{columns:1}}
.ed figure.fig{background:var(--e-plate);border:0;border-radius:2px;padding:14px;margin:30px 0}
.ed figure.fig figcaption{font:400 14.5px/1.55 var(--e-body);font-style:italic;color:var(--e-mut)}
.ed .ed-static{margin:8px 0 26px}
.ed .ed-static>summary{font:500 11.5px/1.6 var(--e-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--e-mut);cursor:pointer}
.ed .vizhost{margin:30px 0}
.ed .viz{border-radius:2px}
.ed .bsec-ref{grid-column:2;font:400 12px/1.6 var(--e-mono);color:var(--e-mut);border-top:1px solid var(--e-rule);padding-top:10px;margin-top:34px;max-width:690px}
.ed .ex-src{font:400 11.5px/1.6 var(--e-mono);color:var(--e-mut);letter-spacing:.02em;font-style:normal;white-space:normal}
.ed .ex-src .ex-k{text-transform:uppercase;letter-spacing:.14em;margin-right:4px}
.ed .ex-src a,.ed .bsec-ref a{color:var(--e-td);text-decoration:none}
.ed .secnav{padding:0 clamp(18px,3vw,40px)}
.ed .ed-fin .ed-finx{padding:0 clamp(18px,3vw,40px)}
/* ---------- figuras interactivas ---------- */
.ed figure.ex{margin:40px 0 46px;border-top:1px solid var(--e-ink);padding-top:12px}
.ed .ex-h{display:flex;gap:16px;align-items:baseline;flex-wrap:wrap;margin:0 0 16px}
.ed .ex-n{font:500 11.5px/1 var(--e-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--e-mut)}
.ed .ex-t{font:italic 400 clamp(22px,2.4vw,28px)/1.15 var(--e-disp);font-variation-settings:"opsz" 72;color:var(--e-ink);text-wrap:balance}
.ed .ex-c{font:italic 400 15.5px/1.55 var(--e-body);color:var(--e-mut);margin:14px 0 0;max-width:760px}
.ed .ex-c .ex-src{display:block;margin-top:6px}
.ed .ex-plate{background:var(--e-plate);position:relative;border-radius:2px}
.ed .ex-plate svg{display:block;width:100%;height:auto}
.ed .ce-row{display:block}
.ed .ex-row{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:0;align-items:stretch}
.ed .ex-side{border-left:1px solid var(--e-rule);padding:18px 20px;background:var(--e-plate);font-size:16px;line-height:1.55}
.ed .ex-side h4{font:600 20px/1.2 var(--e-disp);margin:0 0 8px;color:var(--e-ink)}
.ed .ex-side dl{margin:0}.ed .ex-side dt{font:500 10.5px/1.4 var(--e-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--e-mut);margin-top:12px}
.ed .ex-side dd{margin:2px 0 0;font-size:15.5px;line-height:1.5}
@media (max-width:860px){.ed .ex-row{grid-template-columns:1fr}.ed .ex-side{border-left:0;border-top:1px solid var(--e-rule)}}
.ed .ex-ctl{display:flex;flex-wrap:wrap;gap:4px 18px;align-items:center;margin:0 0 12px}
.ed .ex-ctl button,.ed .ex-tab{background:none;border:0;border-bottom:2px solid transparent;padding:6px 0;font:500 12px/1.3 var(--e-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--e-mut);cursor:pointer;border-radius:0}
.ed .ex-ctl button:hover,.ed .ex-tab:hover{color:var(--e-ink)}
.ed .ex-ctl button.on,.ed .ex-tab.on,.ed .ex-tab[aria-selected="true"]{color:var(--e-ink);border-color:var(--e-ink)}
.ed .ex-ctl button:focus-visible,.ed .ex-tab:focus-visible,.ed .ex [tabindex]:focus-visible{outline:2px solid var(--e-td);outline-offset:3px}
.ed .ex-ctl .sep{flex:1}
.ed .ex-ctl .act{color:var(--e-td)}
.ed .ex-readout{font:500 12px/1.5 var(--e-mono);color:var(--e-ink);letter-spacing:.04em;padding:10px 14px;border-top:1px solid var(--e-rule);background:var(--e-plate);min-height:20px}
.ed .ex-readout b{color:var(--e-td);font-weight:600}
/* etapas (fig. idea) */
.ed .stg{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid var(--e-rule);margin-bottom:0}
.ed .stg button{background:none;border:0;text-align:left;padding:12px 14px 12px 0;cursor:pointer;color:var(--e-mut);font:500 11.5px/1.3 var(--e-mono);letter-spacing:.12em;text-transform:uppercase;border-top:3px solid transparent;margin-top:-1px}
.ed .stg button span{display:block;font:400 22px/1.1 var(--e-disp);letter-spacing:0;text-transform:none;color:var(--e-ink);margin-top:6px}
.ed .stg button[data-c=sg].on{border-color:var(--e-sg);color:var(--e-sg)}.ed .stg button[data-c=rc].on{border-color:var(--e-rc);color:var(--e-rc)}.ed .stg button[data-c=td].on{border-color:var(--e-td);color:var(--e-td)}.ed .stg button[data-c=rs].on{border-color:var(--e-rs);color:var(--e-rs)}
.ed .stg-txt{padding:14px 0 0;font-size:17px;line-height:1.6;min-height:84px;max-width:760px}
@media (max-width:560px){.ed .stg{grid-template-columns:repeat(2,1fr)}.ed .stg button span{font-size:18px}}
/* clases de dibujo */
.ed .ex svg .tx{font-family:var(--e-mono);font-size:12.5px;fill:var(--e-mut);letter-spacing:.02em}
.ed .ex svg .tx.b{font-weight:600;fill:var(--e-ink)}
.ed .ex svg .tx.lg{font-family:var(--e-disp);font-size:20px;font-style:italic;fill:var(--e-ink);letter-spacing:0}
.ed .ex svg .tx.cap{text-transform:uppercase;letter-spacing:.14em;font-size:11px}
.ed .ex svg .c-sg{fill:var(--e-sg)}.ed .ex svg .c-rc{fill:var(--e-rc)}.ed .ex svg .c-td{fill:var(--e-td)}.ed .ex svg .c-rs{fill:var(--e-rs)}.ed .ex svg .c-of{fill:var(--e-of)}.ed .ex svg .c-mu{fill:var(--e-mut)}
.ed .ex svg .f-sg{fill:var(--e-sg)}.ed .ex svg .f-rc{fill:var(--e-rc)}.ed .ex svg .f-td{fill:var(--e-td)}.ed .ex svg .f-rs{fill:var(--e-rs)}.ed .ex svg .f-of{fill:var(--e-of)}.ed .ex svg .f-mu{fill:var(--e-mu)}
.ed .ex svg .f-sgl{fill:var(--e-sgl)}.ed .ex svg .f-rcl{fill:var(--e-rcl)}.ed .ex svg .f-tdl{fill:var(--e-tdl)}.ed .ex svg .f-rsl{fill:var(--e-rsl)}.ed .ex svg .f-ofl{fill:var(--e-ofl)}.ed .ex svg .f-mul{fill:var(--e-plate2)}
.ed .ex svg [class*="st-"]{stroke-width:1.6}
.ed .ex svg .st-sg{stroke:var(--e-sg)}.ed .ex svg .st-rc{stroke:var(--e-rc)}.ed .ex svg .st-td{stroke:var(--e-td)}.ed .ex svg .st-rs{stroke:var(--e-rs)}.ed .ex svg .st-of{stroke:var(--e-of)}.ed .ex svg .st-mu{stroke:var(--e-mu)}
.ed .ex svg .st-sgd{stroke:var(--e-paper);stroke-width:1.2}
.ed .ex svg .loop{fill:none;stroke-width:1.4}
.ed .ex svg .ar line{stroke-width:1.6}
.ed .ex svg .mem .memf{fill:var(--e-mem)}.ed .ex svg .mem .memh{stroke:var(--e-memh);stroke-width:7;stroke-linecap:round;stroke-dasharray:0 10}.ed .ex svg .mem .memt{stroke:var(--e-memh);stroke-width:1;opacity:.6;stroke-dasharray:2 4}
.ed .ex svg .cyt{fill:var(--e-cyt)}.ed .ex svg .nucf{fill:var(--e-nuc);stroke:var(--e-rc);stroke-width:1.4}
.ed .ex svg .pb circle{fill:var(--e-sg);stroke:var(--e-paper);stroke-width:1.2}.ed .ex svg .pb text{font-family:var(--e-mono);font-weight:600;fill:#1c1407}
.ed .ex svg .cell{fill:var(--e-cyt);stroke:var(--e-ink);stroke-width:1.4}.ed .ex svg .cell.far{opacity:.35}
.ed .ex svg .cell-n{fill:var(--e-nuc);stroke:var(--e-rc);stroke-width:1}
.ed .ex svg .rng{fill:none;stroke:var(--e-mu);stroke-dasharray:4 6}
.ed .ex svg .vessel{fill:var(--e-ofl);stroke:var(--e-of);stroke-width:1.4}
.ed .ex svg .dim{opacity:.18}
.ed .ex .anim{transition:transform .9s cubic-bezier(.3,.7,.2,1),opacity .5s ease;transform-box:view-box;transform-origin:0 0}
@media (prefers-reduced-motion:reduce){.ed .ex .anim,.ed .ex svg *{transition:none!important;animation:none!important}}
@media (max-width:640px){.ed .bsec{grid-template-columns:minmax(0,1fr);padding:0 4px}.ed .bsec>*{grid-column:1}.ed .bsec>.pk{position:static;grid-row:auto}.ed .bsec>.pk b{font-size:44px;display:inline;margin-right:10px}.ed .bsec>ul.hy,.ed .bsec-ref,.ed .bsec>.tw,.ed .bsec>figure,.ed .bsec>.vizhost,.ed .bsec>.ed-wide,.ed .bsec>.ed-static{grid-column:1}.ed .ex-scroll{overflow-x:auto}.ed .ex-scroll>svg{min-width:640px}}
@media (min-width:641px) and (max-width:1100px){.ed .bsec{grid-template-columns:96px minmax(0,1fr);column-gap:26px}.ed .bsec>.pk b{font-size:48px}}
`;
window.__SX.css=css;
})();
(function(){
'use strict';
const X=window.__SX,{S,esc,frame,onView,RM}=X;const B=X.B;
// ======================= PORTADA =======================
function hero(){
  const C=[560,520],R=470,rad=d=>d*Math.PI/180,pt=(r,d)=>[C[0]+r*Math.cos(rad(d)),C[1]+r*Math.sin(rad(d))];
  let rnd=7;const rand=()=>{rnd=(rnd*16807)%2147483647;return rnd/2147483647};
  let chrom='';for(let i=0;i<70;i++){const a=200+rand()*95,r=rand()*225;const [x,y]=pt(r,a);if(x>540||y>460)continue;chrom+=`<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${(3+rand()*9).toFixed(1)}" ry="${(2+rand()*5).toFixed(1)}" transform="rotate(${(rand()*180).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})" fill="#332d5c" opacity="${(.45+rand()*.4).toFixed(2)}"/>`}
  let pores='';for(let d=196;d<=300;d+=9){const [x,y]=pt(244,d);pores+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.2" fill="#141a31"/>`}
  let er='';[275,292,309].forEach((r,j)=>{er+=`<circle cx="${C[0]}" cy="${C[1]}" r="${r}" fill="none" stroke="#2f6b57" stroke-width="2.2" stroke-dasharray="${36-j*6} ${10+j*4}" stroke-dashoffset="${j*17}" opacity=".85"/>`});
  let cyto='';for(let i=0;i<9;i++){const a=205+rand()*80;const [x1,y1]=pt(450,a),[x2,y2]=pt(330+rand()*40,a+(rand()-.5)*10);cyto+=`<line x1="${x1.toFixed(0)}" y1="${y1.toFixed(0)}" x2="${x2.toFixed(0)}" y2="${y2.toFixed(0)}" stroke="#24305a" stroke-width="1.2"/>`}
  const gpcr=`<g transform="scale(.62) translate(-36 -38)">${B.tm7(0,0,{h:76})}</g>`;
  const rtk=`<g>${[-7,7].map((x,i)=>`${B.blob(x,-26,6,8,'rc',{seed:411+i,f:false})}${B.helix(x-2,-17,4,32,'rc',{step:4})}${B.blob(x,24,7,9,'rc',{seed:413+i,f:false})}`).join('')}</g>`;
  const chan=`<g>${B.helix(-11,-18,8,36,'rc',{step:4})}${B.helix(3,-18,8,36,'rc',{step:4})}</g>`;
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
   <circle cx="${C[0]}" cy="${C[1]}" r="${R}" fill="#141a31"/>
   ${B.bilayer(B.sample(t=>{const a=rad(178+t*130);return [C[0]+R*Math.cos(a),C[1]+R*Math.sin(a)]},0,1,8),{t:12,r:3.4,skip:(x,y)=>[212,224,236,249,262,274].some(d=>{const q=pt(R,d);return Math.hypot(x-q[0],y-q[1])<22})})}
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
   ${B.bilayer(B.vline(318,0,320,8),{t:14})}
   <circle class="nucf" cx="1010" cy="170" r="230"/>
   <g class="k k4">${B.dna(796,900,212,{a:5,per:18,hl:[828,878]})}${S.t(853,240,'gen','c-rs')}
     <path class="mrna st-rs" d="M842 196 q8 -10 16 0 t16 0 t16 0" fill="none" stroke-width="2.2"/>${S.t(868,176,'ARNm','c-rs')}${S.arrow(860,150,860,92,'rs')}${S.t(860,82,'respuesta','c-rs b')}</g>
   <g class="k k3"><path class="link st-td" pathLength="1" d="M376 160 C 410 160 420 120 450 120 S 520 200 560 205 S 640 128 670 125 S 750 150 790 170" fill="none" stroke-width="2"/>
     ${B.blob(450,120,24,17,'td',{seed:401})}${B.gnuc(438,121,3,{s:1.1})}${B.blob(560,205,24,17,'td',{seed:403})}${B.phos(578,190,6)}${B.blob(670,125,24,17,'td',{seed:405})}${B.phos(688,110,6)}
     ${[[500,262],[528,282],[556,258],[590,290],[618,264],[470,288]].map(([x,y],i)=>`<g class="msg" style="transition-delay:${(.6+i*.08).toFixed(2)}s">${B.mol('camp',x,y,1.35)}</g>`).join('')}${S.t(545,312,'segundos mensajeros','c-td')}
     ${S.t(450,92,'interruptor','c-td')}${S.t(620,240,'cinasas','c-td')}</g>
   <g class="k k2"><g transform="rotate(90 318 160)">${B.tm7(282,122,{h:76})}</g>${S.t(318,226,'receptor','c-rc b')}</g>
   <g class="k k1"><g class="lig">${B.mol('amine',268,158,1.5)}</g>${S.t(120,252,'molécula señalizadora','c-sg b')}</g>
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
.ed #ex-idea .tm6{transform-box:fill-box;transform-origin:50% 0;transition:transform 1.1s cubic-bezier(.4,0,.2,1) .5s}
.ed #ex-idea svg.s2 .tm6{transform:rotate(-13deg)}
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
function cell(x,y,r,cls='',nuc=true){const ry=r*.8,nx=x+r*.12,ny=y+r*.08;let ch='';if(nuc)for(let i=0;i<12;i++){const a=i*2.4,q=Math.sqrt((i+1)/12)*.8;ch+=`<circle cx="${(nx+Math.cos(a)*r*.3*q).toFixed(1)}" cy="${(ny+Math.sin(a)*r*.26*q).toFixed(1)}" r="${(r*.022+1).toFixed(1)}"/>`}
  return `<g class="cellg ${cls}"><ellipse class="cell ${cls}" cx="${x}" cy="${y}" rx="${r}" ry="${ry.toFixed(1)}"/><ellipse class="cellm" cx="${x}" cy="${y}" rx="${r}" ry="${ry.toFixed(1)}"/>${nuc?`<ellipse class="cell-n" cx="${nx}" cy="${ny}" rx="${(r*.3).toFixed(1)}" ry="${(r*.26).toFixed(1)}"/><g class="chr">${ch}</g>`:''}</g>`}
function rmark(x,y,ang){return `<g transform="translate(${x} ${y}) rotate(${ang})"><path class="st-rc" d="M0 0 V-9 M0 -9 l-4 -5 M0 -9 l4 -5" stroke-width="2" fill="none"/></g>`}
function particles(path,n,dur,cls='sg',r=4.2,rep=3){let o=`<path d="${path}" class="trail" fill="none"/>`;for(let i=0;i<n;i++){const b=(i*dur/n).toFixed(2);o+=`<g opacity="0"><circle r="${r}" fill="url(#bv-${cls})"/><animateMotion dur="${dur}s" begin="${b}s" repeatCount="${rep}" path="${path}" fill="freeze"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.85;1" dur="${dur}s" begin="${b}s" repeatCount="${rep}" fill="freeze"/></g>`}return o}
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
.ed #ex-com .cell{stroke:var(--e-lh)!important;stroke-width:4.5!important}.ed #ex-com .cellm{fill:none;stroke:var(--e-core);stroke-width:1.4}.ed #ex-com .cellg.far{opacity:.4}.ed #ex-com .chr circle{fill:var(--e-rc);opacity:.35}
.ed #ex-com .trail{stroke:var(--e-mu);stroke-width:1.2;stroke-dasharray:2 6;opacity:.7}
.ed #ex-com .ex-tab .dist{display:block;height:3px;width:var(--w);background:var(--e-sg);margin-bottom:6px;opacity:.85}
.ed #ex-com .ex-side{min-height:240px}
`;
Object.assign(X,{hero,idea,wireIdea,comm,wireComm});
})();
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
function rec(n){
  const body=`<div class="ex-ctl" role="tablist" aria-label="Tipo de receptor">${RT.map((r,i)=>`<button type="button" class="ex-tab rc-t${i===1?' on':''}" data-r="${r.id}" role="tab" aria-selected="${i===1}">${r.n}</button>`).join('')}</div>
   <div class="rc-host"></div>
   <div class="tw"><table class="cmp rtab"><tr><th>Receptor</th><th>Cómo funciona</th><th>Ejemplo</th></tr>${RT.map(r=>`<tr data-r="${r.id}"><td><b>${r.n}</b></td><td>${r.how}</td><td>${r.ex}</td></tr>`).join('')}</table></div>`;
  return frame('rec',n,'Cuatro maneras de recibir una señal',body,'Cada receptor recorre la misma secuencia: ligando → unión → cambio de forma → señal dentro de la célula. Lo que cambia es qué hace el receptor al cambiar de forma. Toca una fase para verla, o reproduce la secuencia completa. Estructuras dibujadas a partir de modelos atómicos publicados (PDB 3SN6, 2BG9), simplificadas.',['A','L']);
}
function wireRec(fig){
  const host=fig.querySelector('.rc-host');let pl=null,seen=false,vis=false;
  const show=(id,auto)=>{if(pl){pl.pause();pl.obs&&pl.obs.disconnect()}pl=X.SC.mount(host,X.SC[id]());
    fig.querySelectorAll('.rc-t').forEach(b=>{const on=b.dataset.r===id;b.classList.toggle('on',on);b.setAttribute('aria-selected',on)});fig.querySelectorAll('.rtab tr[data-r]').forEach(tr=>tr.classList.toggle('on',tr.dataset.r===id));
    fig._r=id;if(auto)pl.play(0)};
  fig.querySelectorAll('.rc-t').forEach(b=>b.onclick=()=>show(b.dataset.r,true));
  show('gpcr',false);
  X.B.seen(fig,(v,e)=>{if(v&&!seen&&e&&e.intersectionRatio>=.35){seen=true;pl.play(0)}});
}
X.recCSS=`
.ed #ex-rec .rtab tr.on td{background:var(--e-rcl)}
.ed #ex-rec .rc-host{margin-top:6px}
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
const LOC={gs:{l:'ex',r:'mem',g:'mem',e:'mem',m:'cyt',k:'cyt',t1:'cyt',t2:'nuc',x1:'cyt',x2:'nuc',o:'cyt'},
 gq:{l:'ex',r:'mem',g:'mem',e:'mem',s:'mem',m1:'cyt',m2:'mem',c:'er',ca:'cyt',pkc:'cyt',cam:'cyt',ck:'cyt',o:'er'},
 rtk:{l:'ex',r:'mem',p:'mem',a:'cyt',s:'cyt',ras:'mem',k1:'cyt',x:'nuc',pi:'mem',ak:'cyt',x2:'cyt',o:'cyt'}};
const LOCN={ex:'Exterior',mem:'Membrana',cyt:'Citosol',nuc:'Núcleo',er:'Retículo'};
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
  // riel de ubicación: dónde ocurre cada paso (según el nodo de la columna izquierda de cada fila)
  const L=LOC[pid]||{};const rowLoc={};P.nodes.forEach(nd=>{if(nd[2]===0)rowLoc[nd[1]]=L[nd[0]]||'cyt'});
  let rail='',prev=null,segs=[];Object.keys(rowLoc).map(Number).sort((a,b)=>a-b).forEach(r=>{const lc=rowLoc[r];if(lc!==prev){segs.push([lc,r,r]);prev=lc}else segs[segs.length-1][2]=r});
  segs.forEach(([lc,a,b])=>{const y0=top+a*rowH-rowH/2+4,y1=top+b*rowH+rowH/2-4;rail+=`<rect class="loc l-${lc}" x="146" y="${y0}" width="8" height="${y1-y0}" rx="4"/><title>${LOCN[lc]}</title>`});
  // fondo del núcleo para los nodos de la columna derecha que ocurren allí
  let nucbg='';P.nodes.forEach(nd=>{if(L[nd[0]]==='nuc'&&nd[2]===1){const {x,y}=pos[nd[0]];nucbg+=`<rect class="nucbg" x="${x-24}" y="${y-22}" width="${Math.min(176,lw[nd[0]]+40)}" height="44" rx="14"/>`}});
  return {svg:`<svg viewBox="0 0 640 ${H}" role="img" aria-label="Cascada ${esc(P.n)}">${nucbg}${rail}${roles}${edges}${nodes}<circle class="pulse" r="7" cx="-20" cy="-20" fill="url(#bg-glowtd)"/><circle class="pulsec" r="3.4" cx="-20" cy="-20"/></svg>`,H};
}
function cas(n){
  const body=`<div class="ex-ctl" role="tablist" aria-label="Vía">${Object.entries(PW).map(([k,p],i)=>`<button type="button" class="ex-tab cs-t${i?'':' on'}" data-p="${k}" role="tab" aria-selected="${!i}">${p.n}</button>`).join('')}<span class="sep"></span>
   <button type="button" class="act" data-a="play">Reproducir</button><button type="button" data-a="pause">Pausa</button><button type="button" data-a="reset">Reiniciar</button></div>
   <div class="ex-plate cs-plate"></div><div class="cs-leg"><span>Dónde ocurre:</span>${Object.entries(LOCN).map(([k,v])=>`<span><i class="l-${k}"></i>${v}</span>`).join('')}</div><div class="ex-readout" aria-live="polite"></div>`;
  return frame('cas',n,'La cascada, molécula por molécula',body,'Baja con el scroll y cada componente se activa al cruzar la mitad de la pantalla; también puedes reproducirla sola, pausarla o reiniciarla. Toca cualquier molécula para ver qué hace. En rojo, lo que apaga la vía.',['A','L']);
}
function wireCas(fig){
  let pid='gs',k=-1,mode='scroll',timer=null,raf=0,live=false;const plate=fig.querySelector('.cs-plate'),ro=fig.querySelector('.ex-readout');
  const order=()=>PW[pid].nodes;
  let praf=0;const pulse=i=>{const svg=plate.querySelector('svg');if(!svg||X.RM())return;const e=svg.querySelector(`.cl[data-i="${i}"]`);const p=svg.querySelector('.pulse'),c=svg.querySelector('.pulsec');if(!e||!p)return;cancelAnimationFrame(praf);const L=e.getTotalLength(),t0=performance.now();
    const st=now=>{const u=Math.min(1,(now-t0)/650);const q=e.getPointAtLength(L*X.B.ease(u));[p,c].forEach(n=>{n.setAttribute('cx',q.x);n.setAttribute('cy',q.y)});if(u<1)praf=requestAnimationFrame(st);else[p,c].forEach(n=>n.setAttribute('cx',-20))};praf=requestAnimationFrame(st)};
  let lastK=-1;
  const paint=()=>{const N=order();if(k>lastK&&k>0)pulse(k);lastK=k;fig.querySelectorAll('.cn').forEach(g=>{const i=+g.dataset.i;g.classList.toggle('on',i<=k);g.classList.toggle('cur',i===k)});
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
.ed #ex-cas .loc{opacity:.85}.ed #ex-cas .l-ex{fill:var(--e-exo);stroke:var(--e-rule)}.ed #ex-cas .l-mem{fill:var(--e-lh)}.ed #ex-cas .l-cyt{fill:var(--e-plate2);stroke:var(--e-rule)}.ed #ex-cas .l-nuc{fill:var(--e-rc);opacity:.55}.ed #ex-cas .l-er{fill:var(--e-rs);opacity:.55}
.ed #ex-cas .cs-leg{display:flex;flex-wrap:wrap;gap:4px 16px;padding:8px 14px;background:var(--e-plate);font:500 11px var(--e-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--e-mut)}
.ed #ex-cas .cs-leg i{display:inline-block;width:8px;height:14px;border-radius:4px;vertical-align:-3px;margin-right:6px}.ed #ex-cas .cs-leg i.l-ex{background:var(--e-exo);border:1px solid var(--e-rule)}.ed #ex-cas .cs-leg i.l-mem{background:var(--e-lh)}.ed #ex-cas .cs-leg i.l-cyt{background:var(--e-plate2);border:1px solid var(--e-rule)}.ed #ex-cas .cs-leg i.l-nuc{background:var(--e-rc);opacity:.55}.ed #ex-cas .cs-leg i.l-er{background:var(--e-rs);opacity:.55}
.ed #ex-cas .nucbg{fill:var(--e-nuc);stroke:var(--e-rc);stroke-width:.8;stroke-dasharray:3 3}
.ed #ex-cas .pulsec{fill:var(--e-td);stroke:var(--e-paper);stroke-width:1.2}
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
.ed #ex-cas .cn.on.c-td .nb{fill:url(#bv-td)}.ed #ex-cas .cn.on.c-rc .nb{fill:url(#bv-rc)}.ed #ex-cas .cn.on.c-rs .nb{fill:url(#bv-rs)}.ed #ex-cas .cn.on.c-mu .nb{fill:url(#bv-mu)}
@media (max-width:640px){.ed #ex-cas .cn .nl{font-size:24px}.ed #ex-cas .tx.cap,.ed #ex-cas .rl{display:none}.ed #ex-cas .cn .nb{r:15px}}
`;
// ======================= FIG. 5 · SEGUNDOS MENSAJEROS =======================
const MSG=[
 {id:'ampc',n:'AMPc',shape:'dia',from:'Adenilil ciclasa, activada por Gαs, a partir de ATP',act:'PKA: se une a sus subunidades R y libera a las C',eff:'Fosforilación de enzimas (degradación del glucógeno) y de CREB (genes)',off:'AMPc fosfodiesterasa: AMPc → AMP',src:[200,92],dst:[470,214]},
 {id:'ip3',n:'IP₃',shape:'tri',from:'Fosfolipasa C-β: corta el PIP₂ de la membrana',act:'Canales de Ca²⁺ del retículo endoplásmico',eff:'El Ca²⁺ sale al citosol',src:[320,96],dst:[176,232]},
 {id:'dag',n:'DAG',shape:'lip',from:'Fosfolipasa C-β: la otra mitad del PIP₂; queda en la membrana',act:'Proteína cinasa C (PKC), junto con el Ca²⁺',eff:'La PKC fosforila otras proteínas',src:[340,90],dst:[440,90]},
 {id:'ca',n:'Ca²⁺',shape:'cir',from:'Retículo endoplásmico (y exterior), donde está miles de veces más concentrado que en el citosol (≈10⁻⁷ M)',act:'Calmodulina (4 sitios de unión) → CaM-cinasas; con DAG, la PKC',eff:'Fosforilación de muchas dianas; en el músculo, se une a la troponina',off:'Bombas que gastan ATP mantienen bajo el Ca²⁺ citosólico',src:[176,240],dst:[478,214]},
 {id:'gmpc',n:'GMPc',shape:'sq',from:'Guanilil ciclasa, activada por el óxido nítrico',act:'PKG',eff:'Baja el Ca²⁺ y el músculo liso se relaja: el vaso se dilata',src:[300,186],dst:[478,214]}];
function msgShape(sh,x,y,c){const B=X.B;const k={dia:'camp',tri:'ip3',lip:'dag',cir:'ca',sq:'gmpc'}[sh];if(k)return B.mol(k,x,y,k==='ca'?1.3:1.25);const r=5.5;return sh==='dia'?`<polygon class="f-${c}" points="${x},${y-r} ${x+r},${y} ${x},${y+r} ${x-r},${y}"/>`:sh==='tri'?`<polygon class="f-${c}" points="${x},${y-r} ${x+r},${y+r*.8} ${x-r},${y+r*.8}"/>`:sh==='lip'?`<g class="st-${c}" stroke-width="2.4"><path d="M${x-2} ${y-8} V${y+4} M${x+2} ${y-8} V${y+4}"/></g><circle class="f-${c}" cx="${x}" cy="${y+6}" r="3.6"/>`:sh==='sq'?`<rect class="f-${c}" x="${x-4.5}" y="${y-4.5}" width="9" height="9" rx="1.5"/>`:`<circle class="f-${c}" cx="${x}" cy="${y}" r="${r-1}"/>`}
function msgBase(){
  const B=X.B;return `<rect class="b-exo" width="640" height="60"/>`+B.bilayer(B.line(0,640,78,8),{t:13,skip:x=>(x>176&&x<224)})+S.t(14,40,'EXTERIOR','cap','start')+S.t(14,122,'CITOSOL','cap','start')+
   `<path class="er" d="M30 330 V264 Q30 232 62 232 H250 Q282 232 282 264 V330"/>${S.t(46,316,'RETÍCULO ENDOPLÁSMICO','cap c-rs','start')}`+
   `<g class="src s-ampc"><g transform="translate(182 56) scale(.5)">${B.acyc(0,0,{h:44})}</g>${S.t(200,130,'adenilil ciclasa','c-mu')}</g>`+
   `<g class="src s-ip3 s-dag">${B.blob(321,107,26,12,'sg',{seed:421})}${S.t(321,111,'PLC-β','c-sg b')}</g>`+
   `<g class="src s-ca">${B.helix(166,224,8,24,'rs',{step:4})}${B.helix(182,224,8,24,'rs',{step:4})}${S.t(186,268,'canal de Ca²⁺','c-rs')}</g>`+
   `<g class="src s-gmpc">${B.blob(300,186,40,16,'td',{seed:423})}${S.t(300,190,'guanilil ciclasa','c-td')}</g>`+
   `<g class="tgt t-ampc">${B.blob(470,214,34,20,'of',{seed:425})}${S.t(470,218,'PKA','c-of b')}</g>`+
   `<g class="tgt t-ca t-gmpc">${B.blob(478,214,44,20,'rs',{seed:427})}${S.t(478,218,'','')}</g>`+
   `<g class="tgt t-dag">${B.blob(452,112,30,16,'of',{seed:429})}${S.t(452,116,'PKC','c-of b')}</g>`;
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
.ed #ex-msg .er{fill:var(--e-rsl);stroke:color-mix(in srgb,var(--e-lh) 80%,#000);stroke-width:3.4}
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
  add('ip3',{x:470,y:330,n:'IP₃',z:'Citoplasma',d:'Hidrosoluble: difunde por el citosol y abre canales de Ca²⁺ del retículo endoplásmico.',g:(x,y)=>[[60,-80],[20,-30],[-30,30],[-90,90]].map(([a,b])=>B.mol('ip3',x+a,y+b,1.1)).join('')});
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
   <ol class="ce-stg">${STG.map(s=>`<li data-s="${s}">${s}</li>`).join('')}</ol>
   <div class="ce-row"><div class="ce-pw"><div class="ex-plate ce-plate" tabindex="0" role="group" aria-label="Célula explorable. Más y menos para acercar o alejar, flechas para desplazarte, cero para ver la célula completa."></div><div class="ce-zoom"><button type="button" data-zm="-1" aria-label="Alejar">−</button><span class="ce-sc" aria-live="polite"></span><button type="button" data-zm="1" aria-label="Acercar">+</button><button type="button" data-zm="0" class="ce-fit">Célula completa</button><span class="ce-tip">Toca una estructura · pellizca o usa + y − para acercarte</span></div></div>
   <aside class="ex-side ce-side" aria-live="polite"><h4>Toca cualquier estructura</h4><p>Verás su nombre, qué hace, dónde actúa y qué ocurre después. Acércate con + y −, pellizcando o con Ctrl + rueda; arrastra para desplazarte. Con «Seguir una ruta» recorres el camino completo de una señal dentro de esta misma célula.</p></aside></div>`;
  return frame('cel',n,'La célula completa',body,'Resumen visual del capítulo: cada vía se dibuja sobre la misma célula, de la señal externa a la respuesta. Esquema propio, simplificado y no a escala; la vía del NO ocurre en el músculo liso vecino al endotelio.',['A','L']);
}
function wireCell(fig){
  const B=B_();const E=cellDefs();const plate=fig.querySelector('.ce-plate');plate.insertAdjacentHTML('afterbegin',cellSVG(E));const svg=plate.querySelector('svg'),side=fig.querySelector('.ce-side'),route=svg.querySelector('.route'),sigp=svg.querySelector('.sigp'),sigc=svg.querySelector('.sigc'),scl=fig.querySelector('.ce-sc');
  svg.querySelectorAll('.ce').forEach(g=>{try{const b=g.getBBox();const r=document.createElementNS('http://www.w3.org/2000/svg','rect');r.setAttribute('x',b.x-6);r.setAttribute('y',b.y-6);r.setAttribute('width',b.width+12);r.setAttribute('height',b.height+12);r.setAttribute('class','hit');g.insertBefore(r,g.firstChild)}catch(e){}});
  const inRoutes=id=>Object.entries(ROUTES).filter(([k,r])=>r.steps.some(s=>s[1]===id));
  // ---------- cámara (viewBox) ----------
  const VW=1000,VH=680,ZMAX=5;let cam={x:500,y:340,w:1000},tgt={...cam},raf=0,last=0,visible=true;
  const clampCam=c=>{c.w=Math.max(VW/ZMAX,Math.min(VW,c.w));const h=c.w*VH/VW;c.x=Math.max(c.w/2,Math.min(VW-c.w/2,c.x));c.y=Math.max(h/2,Math.min(VH-h/2,c.y));return c};
  const scaleName=z=>z<1.4?'Célula':z<2.6?'Membrana y citoplasma':'Complejo molecular';
  const apply=()=>{const h=cam.w*VH/VW;svg.setAttribute('viewBox',`${(cam.x-cam.w/2).toFixed(2)} ${(cam.y-h/2).toFixed(2)} ${cam.w.toFixed(2)} ${h.toFixed(2)}`);const z=VW/cam.w;svg.classList.toggle('z2',z>=1.35);svg.classList.toggle('z3',z>=2.4);plate.classList.toggle('zin',z>1.03);scl.textContent=`${scaleName(z)} · ×${z.toFixed(1)}`};
  const tick=now=>{const dt=last?Math.min((now-last)/1000,1/30):1/60;last=now;const k=X.RM()?1:1-Math.exp(-dt/.22);let busy=false;
    ['x','y','w'].forEach(p=>{cam[p]+=(tgt[p]-cam[p])*k;if(Math.abs(tgt[p]-cam[p])>.05)busy=true;else cam[p]=tgt[p]});apply();
    if(sig.on){sig.t=Math.min(1,sig.t+dt/(X.RM()?.01:1.1));const L=route.getTotalLength();const p0=sig.from*L,p1=L;const pt=route.getPointAtLength(p0+(p1-p0)*B.ease(sig.t));sigp.setAttribute('cx',pt.x);sigp.setAttribute('cy',pt.y);sigc.setAttribute('cx',pt.x);sigc.setAttribute('cy',pt.y);if(sig.t<1)busy=true;else sig.on=false}
    raf=busy&&visible?requestAnimationFrame(tick):0};
  const kick=()=>{if(!raf&&visible){last=0;raf=requestAnimationFrame(tick)}};
  const zoomTo=(w,cx,cy)=>{tgt=clampCam({x:cx??tgt.x,y:cy??tgt.y,w});kick()};
  const toSvg=(cx,cy,c=cam)=>{const r=svg.getBoundingClientRect();const h=c.w*VH/VW;return [c.x-c.w/2+(cx-r.left)/r.width*c.w,c.y-h/2+(cy-r.top)/r.height*h]};
  const zoomAt=(f,cx,cy)=>{const p=toSvg(cx,cy,tgt);const w=Math.max(VW/ZMAX,Math.min(VW,tgt.w/f));const k=w/tgt.w;tgt=clampCam({x:p[0]+(tgt.x-p[0])*k,y:p[1]+(tgt.y-p[1])*k,w});kick()};
  const fitIds=ids=>{const P=ids.map(i=>E[i]);const xs=P.map(p=>p.x),ys=P.map(p=>p.y);const x0=Math.min(...xs)-70,x1=Math.max(...xs)+70,y0=Math.min(...ys)-60,y1=Math.max(...ys)+60;zoomTo(Math.max(x1-x0,(y1-y0)*VW/VH),(x0+x1)/2,(y0+y1)/2)};
  fig.querySelectorAll('[data-zm]').forEach(b=>b.onclick=()=>{const v=+b.dataset.zm;if(!v)zoomTo(VW,500,340);else zoomTo(tgt.w/(v>0?1.6:1/1.6))});
  plate.addEventListener('keydown',e=>{if(e.target!==plate)return;const st=tgt.w*.12;const m={ArrowLeft:[-st,0],ArrowRight:[st,0],ArrowUp:[0,-st],ArrowDown:[0,st]}[e.key];
    if(m){e.preventDefault();tgt=clampCam({...tgt,x:tgt.x+m[0],y:tgt.y+m[1]});kick()}else if(e.key==='+'||e.key==='='){e.preventDefault();zoomTo(tgt.w/1.6)}else if(e.key==='-'){e.preventDefault();zoomTo(tgt.w*1.6)}else if(e.key==='0'){e.preventDefault();zoomTo(VW,500,340)}});
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
  const info=id=>{const e=E[id];const R=inRoutes(id);side.innerHTML=`<h4>${esc(e.n)}</h4><dl><dt>Qué hace</dt><dd>${esc(e.d)}</dd><dt>Dónde actúa</dt><dd>${esc(e.z)}</dd>${R.length?`<dt>Qué ocurre después</dt><dd>${after(id)}</dd><dt>Forma parte de</dt><dd>${R.map(([k,r])=>`<button type="button" class="lnk" data-go="${k}">${esc(r.n)}</button>`).join(' · ')}</dd>`:''}</dl>`;
    side.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{setMode('route');pickRoute(b.dataset.go);go(0)})};
  const hl=ids=>{svg.classList.toggle('hl',!!ids);svg.querySelectorAll('.ce').forEach(g=>g.classList.toggle('on',!!ids&&ids.includes(g.dataset.id)))};
  const stgOn=s=>fig.querySelectorAll('.ce-stg li').forEach(li=>{li.classList.toggle('on',li.dataset.s===s)});
  const drawRoute=k=>{const st=ROUTES[rk].steps.slice(0,k+1);const P=st.map(s=>E[s[1]]);if(P.length<2){route.setAttribute('d','');sigp.setAttribute('cx',-50);sigc.setAttribute('cx',-50);return}let d=`M${P[0].x} ${P[0].y}`;for(let i=1;i<P.length;i++){const a=P[i-1],b=P[i];d+=` Q${(a.x+b.x)/2+(b.y-a.y)*.15} ${(a.y+b.y)/2-(b.x-a.x)*.15} ${b.x} ${b.y}`}route.setAttribute('d',d);
    // la señal recorre el último tramo
    const L=route.getTotalLength();let Lp=0;if(P.length>2){const tmp=document.createElementNS('http://www.w3.org/2000/svg','path');let d2=`M${P[0].x} ${P[0].y}`;for(let i=1;i<P.length-1;i++){const a=P[i-1],b=P[i];d2+=` Q${(a.x+b.x)/2+(b.y-a.y)*.15} ${(a.y+b.y)/2-(b.x-a.x)*.15} ${b.x} ${b.y}`}tmp.setAttribute('d',d2);svg.appendChild(tmp);Lp=tmp.getTotalLength();tmp.remove()}
    sig.from=L?Lp/L:0;sig.t=0;sig.on=true;kick()};
  const go=k=>{const S2=ROUTES[rk].steps;si=Math.max(0,Math.min(S2.length-1,k));const s=S2[si];hl(S2.slice(0,si+1).map(x=>x[1]));svg.querySelectorAll('.ce').forEach(g=>g.classList.toggle('cur',g.dataset.id===s[1]));stgOn(s[0]);drawRoute(si);
    side.innerHTML=`<h4>${esc(ROUTES[rk].n)} · paso ${si+1} de ${S2.length}</h4><p class="stp"><span class="tag">${s[0]}</span> ${esc(s[2])}</p><dl><dt>${esc(E[s[1]].n)}</dt><dd>${esc(E[s[1]].d)}</dd><dt>Dónde actúa</dt><dd>${esc(E[s[1]].z)}</dd>${S2[si+1]?`<dt>Qué ocurre después</dt><dd>${esc(S2[si+1][2])}</dd>`:''}</dl>`;playUI()};
  const playBtn=fig.querySelector('[data-a=play]');const playUI=()=>{playBtn.textContent=timer?'Pausa':(si>=ROUTES[rk].steps.length-1?'Repetir':'Reproducir')};
  const stop=()=>{if(timer){clearInterval(timer);timer=null}playUI()};
  const pickRoute=k=>{rk=k;fig.querySelectorAll('.ce-r').forEach(b=>b.classList.toggle('on',b.dataset.r===k));fitIds(ROUTES[k].steps.map(s=>s[1]))};
  const setMode=m=>{mode=m;stop();fig.querySelectorAll('[data-md]').forEach(b=>b.classList.toggle('on',b.dataset.md===m));fig.querySelector('.ce-routes').hidden=m!=='route';
    if(m==='exp'){hl(null);svg.querySelectorAll('.ce.cur').forEach(g=>g.classList.remove('cur'));route.setAttribute('d','');sig.on=false;sigp.setAttribute('cx',-50);sigc.setAttribute('cx',-50);stgOn('')}else{fitIds(ROUTES[rk].steps.map(s=>s[1]));go(0)}};
  fig.querySelectorAll('[data-md]').forEach(b=>b.onclick=()=>setMode(b.dataset.md));
  fig.querySelectorAll('.ce-r').forEach(b=>b.onclick=()=>{stop();pickRoute(b.dataset.r);go(0)});
  fig.querySelector('[data-a=prev]').onclick=()=>{stop();go(si-1)};fig.querySelector('[data-a=next]').onclick=()=>{stop();go(si+1)};
  fig.querySelector('[data-a=reset]').onclick=()=>{stop();go(0)};
  playBtn.onclick=()=>{if(timer){stop();return}if(si>=ROUTES[rk].steps.length-1)go(0);timer=setInterval(()=>{if(si>=ROUTES[rk].steps.length-1)return stop();go(si+1)},X.RM()?2200:1900);playUI()};
  const pick=id=>{if(mode==='route'){const R=inRoutes(id);if(R.length){stop();if(R[0][0]!==rk)pickRoute(R[0][0]);go(ROUTES[rk].steps.findIndex(s=>s[1]===id))}}else{hl([id]);info(id);const e=E[id];if(VW/tgt.w<2.2)zoomTo(VW/2.4,e.x,e.y);else zoomTo(tgt.w,e.x,e.y)}};
  svg.querySelectorAll('.ce').forEach(g=>{const id=g.dataset.id;g.addEventListener('mouseenter',()=>{if(mode==='exp'&&!svg.classList.contains('hl'))g.classList.add('hov')});g.addEventListener('mouseleave',()=>g.classList.remove('hov'));
    g.addEventListener('click',()=>pick(id));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(id)}})});
  B.seen(fig,v=>{visible=v;if(!v)stop();else kick()});
  apply();
}
X.cellCSS=`
.ed #ex-cel .exo{fill:var(--e-exo)}.ed #ex-cel .cyt{fill:var(--e-cyt)}
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
.ed #ex-cel .ce-row{display:grid;grid-template-columns:minmax(0,1fr) 290px;gap:0;align-items:stretch}
.ed #ex-cel .ce-side{border-left:1px solid var(--e-rule);min-height:0}
.ed #ex-cel .ce-side dt{margin-top:14px}
.ed #ex-cel .ce-side .muted{color:var(--e-mut)}
@media (max-width:1100px){.ed #ex-cel .ce-row{grid-template-columns:1fr}.ed #ex-cel .ce-side{border-left:0;border-top:1px solid var(--e-rule)}.ed #ex-cel .ce-side dl{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0 24px}}
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
Object.assign(X,{amp,wireAmp,term,wireTerm,cellFig,wireCell,summary,refs});
})();
/* Figura de escalas: de la célula diana a la molécula.
   Cada escala responde una pregunta del texto («¿Dónde ocurre?», «¿Qué molécula recibe la señal?»…).
   El paso de una escala a otra es un acercamiento continuo: la región enfocada crece hasta convertirse en la
   escala siguiente. La bicapa de la escala 3 es un bloque en proyección isométrica (anatomy, MIT) que se puede girar. */
(function(){
'use strict';
const X=window.__SX,B=X.B,SC=X.SC;const {seg,lerp,wob,f1,clamp}=B;
const W=900,H=520,C=[W/2,H/2],F=5;
const LV=[
 {n:'Célula',q:'¿Dónde ocurre?',a:'En la <b>célula diana</b>. Una molécula señalizadora producida por otra célula (la célula señalizadora) llega por el líquido extracelular.'},
 {n:'Membrana',q:'¿Qué la separa del exterior?',a:'La <b>membrana plasmática</b>: una bicapa lipídica con proteínas transmembrana. Las señales hidrosolubles o grandes no la cruzan; se unen a <b>receptores de superficie</b>.'},
 {n:'Bicapa',q:'¿Qué molécula recibe la señal?',a:'Depende de la química de la señal. Elige una señal y observa si cruza la bicapa.'},
 {n:'Receptor',q:'¿Quién participa?',a:'Un <b>receptor de siete hélices</b> que cruza la membrana y, en la cara citosólica, una <b>proteína G trimérica</b> (α, β y γ) anclada a la membrana por lípidos, junto a la enzima que va a regular.'},
 {n:'Mecanismo',q:'¿Qué cambia?',a:'Reproduce el mecanismo: ligando → unión → cambio de forma → activación de la proteína G → transducción.'}];
const myM=x=>250+26*Math.sin((x-80)/260);
const FOC=[[478,172],[452,myM(452)],[0,0]];// foco de cada escala (se calcula para la bicapa)
// ---------- escala 1: tejido con la célula diana y un capilar ----------
function lvCell(){
  const R=B.rng(5);let cells='';
  const cl=[[250,120,120,96,1],[640,96,150,90,2],[800,330,120,140,3],[150,390,110,100,4],[560,300,170,140,0]];
  cl.forEach(([x,y,rx,ry,s],i)=>{const tgt=i===4;const d=B.blobPath(x,y,rx,ry,30+s,.07,14);
    let chrom='';for(let k=0;k<26;k++){const a=R()*Math.PI*2,r=Math.sqrt(R())*.28;chrom+=`<circle cx="${f1(x+rx*.12+Math.cos(a)*rx*r)}" cy="${f1(y+Math.sin(a)*ry*r)}" r="${f1(1+R()*2.2)}"/>`}
    cells+=`<g class="sc-cell${tgt?' tgt':''}"><path class="sc-cyt" d="${d}"/><path class="sc-pm" d="${d}"/>${tgt?`<path class="sc-pm2" d="${d}"/>`:''}
      <ellipse class="sc-nuc" cx="${x+rx*.12}" cy="${y}" rx="${f1(rx*.34)}" ry="${f1(ry*.32)}"/><g class="sc-chr">${chrom}</g><circle class="sc-nl" cx="${f1(x+rx*.2)}" cy="${f1(y-ry*.06)}" r="${f1(rx*.06)}"/>
      ${tgt?`<g class="sc-org">${[0,1,2,3].map(k=>`<ellipse cx="${f1(x-rx*.55+k*18)}" cy="${f1(y+ry*.45-k*6)}" rx="14" ry="5.5" transform="rotate(${-20+k*12} ${f1(x-rx*.55+k*18)} ${f1(y+ry*.45-k*6)})"/>`).join('')}</g>`:''}</g>`});
  let rbc='';[[60,250],[110,226],[40,206],[160,214]].forEach(([x,y],i)=>rbc+=`<g class="sc-rbc"><ellipse cx="${x}" cy="${y}" rx="15" ry="9"/><ellipse class="in" cx="${x}" cy="${y}" rx="7" ry="3.6"/></g>`);
  let hor='';for(let i=0;i<14;i++){const t=i/13;hor+=`<circle class="sc-h" cx="${f1(200+t*240+R()*30)}" cy="${f1(236-t*60+R()*30)}" r="2.6"/>`}
  return `<rect class="sc-ecm" width="${W}" height="${H}"/>
   <path class="sc-cap" d="M-20 178 C 120 168 210 200 240 260 L 220 280 C 180 222 110 254 -20 264 Z"/>${rbc}${cells}${hor}
   <text class="b-zone" x="24" y="${H-18}">Tejido · célula diana</text><text class="b-tag" x="30" y="160">capilar</text><text class="b-tag" x="560" y="470" text-anchor="middle">célula diana</text>
   <g class="sc-foc" data-go="1" role="button" tabindex="0" aria-label="Acercarse a la membrana"><circle cx="${FOC[0][0]}" cy="${FOC[0][1]}" r="28"/><text class="b-tag" x="${FOC[0][0]+34}" y="${FOC[0][1]-30}">membrana plasmática</text></g>`;
}
// ---------- escala 2: un tramo de membrana con sus proteínas ----------
function lvMem(){
  const my=myM;
  const prot=[[150,'b'],[262,'r'],[452,'r'],[600,'c'],[760,'b']];
  const skip=(x)=>prot.some(([px,k])=>Math.abs(x-px)<(k==='r'?36:k==='c'?26:22));
  const pts=B.sample(t=>[t,my(t)],-20,W+20,9);
  let p='';prot.forEach(([x,k],i)=>{const y=my(x);if(k==='r')p+=`<g transform="translate(${x-34} ${y-38}) scale(1)">${B.tm7(0,0,{h:76,gap:9.5,w:8})}</g>`;
    else if(k==='c')p+=`${B.blob(x-12,y,13,30,'rs',{seed:101})}${B.blob(x+12,y,13,30,'rs',{seed:103})}`;
    else p+=B.blob(x,y,20,34,'mu',{seed:105+i,rough:.1})});
  const per=`${B.blob(330,my(330)+30,20,12,'td',{seed:111})}${B.blob(690,my(690)+28,17,11,'of',{seed:113})}`;
  let act='';for(let k=0;k<4;k++){let d='';for(let x=-20;x<W+20;x+=7){const y=my(x)+52+k*20+Math.sin(x/40+k)*6;d+=`<circle cx="${x}" cy="${f1(y)}" r="2.6"/>`}act+=`<g class="sc-act">${d}</g>`}
  let ligs='';[[120,90],[300,60],[520,110],[700,70],[840,120]].forEach(([x,y],i)=>ligs+=B.mol(i%2?'amine':'gf',x,y,1.2));
  return `<rect class="b-exo" width="${W}" height="${H}"/><path class="b-cyto" d="M-20 ${my(-20)} ${Array.from({length:50},(_,i)=>{const x=-20+i*19;return `L${x} ${f1(my(x))}`}).join(' ')} L${W+20} ${H} L-20 ${H}Z"/>
   ${act}${B.bilayer(pts,{t:14,r:3.8,skip})}${p}${per}${ligs}
   <text class="b-zone" x="24" y="30">Exterior</text><text class="b-zone" x="24" y="${H-18}">Citoplasma</text>
   <text class="b-tag" x="150" y="${f1(my(150)-46)}" text-anchor="middle">proteína integral</text><text class="b-tag" x="330" y="${f1(my(330)+60)}" text-anchor="middle">proteína periférica</text>
   <text class="b-tag" x="${W-24}" y="420" text-anchor="end">filamentos del citoesqueleto</text>
   <g class="sc-foc" data-go="2" role="button" tabindex="0" aria-label="Acercarse a la bicapa y al receptor"><circle cx="${FOC[1][0]}" cy="${FOC[1][1]}" r="44"/><text class="b-tag" x="${FOC[1][0]}" y="${FOC[1][1]-54}" text-anchor="middle">receptor en la bicapa</text></g>`;
}
// ---------- escala 3: bloque de bicapa en proyección isométrica ----------
const BW=120,BD=84,BH=26,HR=2.7,GAP=6.2;
const RC=[60,42];// receptor (siete cilindros en anillo)
function blockGeo(az){const P=B.fit([[0,0,-34],[BW,0,-34],[0,BD,-34],[BW,BD,-34],[0,0,54],[BW,BD,54],[BW,0,54],[0,BD,54]],W,H,{pad:26,azimuth:az,elevation:30});return P}
function lvBlock(az,sig){
  const P=blockGeo(az);const I=q=>B.iso(q,P),D=q=>B.depth(q,P);const k=P.scale*Math.sqrt(1.6);const pp=q=>{const v=I(q);return f1(v[0])+' '+f1(v[1])};
  const items=[];// [depth, svg]
  // cara superior (fondo) y caras de corte
  const top=`<path class="bk-top" d="M${pp([0,0,BH])}L${pp([BW,0,BH])}L${pp([BW,BD,BH])}L${pp([0,BD,BH])}Z"/>`;
  const faceY=`<path class="bk-face" d="M${pp([0,BD,0])}L${pp([BW,BD,0])}L${pp([BW,BD,BH])}L${pp([0,BD,BH])}Z"/>`;
  const faceX=`<path class="bk-face x" d="M${pp([BW,0,0])}L${pp([BW,BD,0])}L${pp([BW,BD,BH])}L${pp([BW,0,BH])}Z"/>`;
  let tails='',fh='';
  const faceRow=(a,b,fix)=>{for(let s=GAP/2;s<(fix==='y'?BW:BD);s+=GAP){const at=z=>fix==='y'?[s,BD,z]:[BW,s,z];[[BH-HR,BH/2+1.2],[HR,BH/2-1.2]].forEach(([zh,zm])=>{const h=I(at(zh));fh+=`<circle cx="${f1(h[0])}" cy="${f1(h[1])}" r="${f1(HR*k)}"/>`;
    [-.9,.9].forEach(o=>{const q1=fix==='y'?[s+o,BD,zh+(zh>zm?-HR:HR)]:[BW,s+o,zh+(zh>zm?-HR:HR)],q2=fix==='y'?[s+o*.6,BD,zm]:[BW,s+o*.6,zm];tails+=`M${pp(q1)}L${pp(q2)}`})})}};
  faceRow(0,0,'y');faceRow(0,0,'x');
  // cabezas de la cara superior (ordenadas de atrás hacia adelante)
  const heads=[];for(let j=0;j*GAP*.87<BD-HR;j++)for(let i=0;i*GAP<BW-HR;i++){const x=HR+i*GAP+(j%2?GAP/2:0),y=HR+j*GAP*.87;if(x>BW-HR)continue;if(Math.hypot(x-RC[0],y-RC[1])<12.5)continue;if(Math.hypot(x-24,y-20)<9||Math.hypot(x-98,y-60)<8)continue;heads.push([x,y,BH])}
  heads.forEach(q=>{const v=I(q);items.push([D(q),`<circle class="bk-h" cx="${f1(v[0])}" cy="${f1(v[1])}" r="${f1(HR*k)}"/>`])});
  // cilindros (hélices) del receptor y otras proteínas integrales
  const cyl=(cx,cy,r,z0,z1,c,cls='')=>{const a=I([cx,cy,z1]),b=I([cx,cy,z0]);const rx=r*k,ry=r*k*Math.sin(30*Math.PI/180);
    return `<g class="bk-cyl ${cls}"><path d="M${f1(a[0]-rx)} ${f1(a[1])}L${f1(b[0]-rx)} ${f1(b[1])}A${f1(rx)} ${f1(ry)} 0 0 0 ${f1(b[0]+rx)} ${f1(b[1])}L${f1(a[0]+rx)} ${f1(a[1])}Z" fill="url(#bc-${c})" style="stroke:color-mix(in srgb,var(--e-${c}) 70%,#000)"/><ellipse cx="${f1(a[0])}" cy="${f1(a[1])}" rx="${f1(rx)}" ry="${f1(ry)}" fill="url(#bv-${c})" style="stroke:color-mix(in srgb,var(--e-${c}) 70%,#000)"/></g>`};
  const below=[],above=[];
  for(let i=0;i<7;i++){const a=i/7*Math.PI*2+.3,cx=RC[0]+Math.cos(a)*6.4,cy=RC[1]+Math.sin(a)*6.4;const d=D([cx,cy,BH]);
    below.push([D([cx,cy,-12]),cyl(cx,cy,2.5,-16,0,'rc')]);above.push([d+.01,cyl(cx,cy,2.6,BH,BH+15+(i%3)*1.5,'rc')])}
  [[24,20,7,'mu'],[98,60,6,'rs']].forEach(([x,y,r,c])=>{const v=I([x,y,BH+3]);above.push([D([x,y,BH]),`<path class="b-prot" d="${B.blobPath(v[0],v[1]-r*k*.5,r*k*1.1,r*k*1.05,x,.1)}" fill="url(#bv-${c})" style="stroke:color-mix(in srgb,var(--e-${c}) 75%,#000)"/>`])});
  // receptor intracelular (bajo la esquina frontal del bloque)
  const ir=I([104,78,-26]);
  const irS=`<g class="bk-ir">${B.blob(ir[0],ir[1],22,15,'rc',{seed:121})}<text class="b-tag halo" x="${f1(ir[0]+30)}" y="${f1(ir[1]+4)}">receptor intracelular</text></g>`;
  const rl=I([RC[0]+9,RC[1]-4,BH+18]);
  // señal (posición en el mundo según el estado de la animación)
  let sigS='',sigFront=false;if(sig){const q=sig.q;const v=I(q);const g=B.mol(sig.kind,v[0],v[1],1.6);sigS=`<g class="bk-sig">${sig.glow?`<circle cx="${f1(v[0])}" cy="${f1(v[1])}" r="18" fill="url(#bg-glow)"/>`:''}${g}</g>`;sigFront=q[2]>BH||q[1]>BD-3||q[0]>BW-3;if(q[2]<0)sigFront='below'}
  items.sort((a,b)=>a[0]-b[0]);above.sort((a,b)=>a[0]-b[0]);below.sort((a,b)=>a[0]-b[0]);
  return `<rect width="${W}" height="${H}" fill="url(#bg-ec)"/>
   ${below.map(x=>x[1]).join('')}${irS}<g class="b-mem">${faceY}${faceX}<path class="b-tail" d="${tails}"/><g class="b-head">${fh}</g></g>${top}
   <g class="b-head">${items.map(x=>x[1]).join('')}</g>${above.map(x=>x[1]).join('')}${sigS}
   <text class="b-tag halo" x="${f1(rl[0]+14)}" y="${f1(rl[1])}" text-anchor="start">receptor de superficie</text>
   <text class="b-zone" x="24" y="30">Exterior</text><text class="b-zone" x="24" y="${H-18}">Citosol</text>
   <text class="b-tag sc-hint" x="${W-24}" y="30" text-anchor="end">arrastra para girar</text>`;
}
// trayectorias de las señales en el mundo (x, y, z)
const SIG={
 ady:{n:'Adrenalina',k:'amine',t:'hidrosoluble',res:'Es hidrosoluble: no puede atravesar la bicapa lipídica. Se une a un <b>receptor de superficie</b>, una proteína transmembrana que transmite la información al interior.',
  path:u=>{const a=seg(u,0,.35),b=seg(u,.35,.55),c=seg(u,.55,1);let q=[lerp(10,30,a),lerp(20,64,a),lerp(78,BH+5,a)];if(u>.35)q=[30+wob(u*9,1,1.5),64,BH+5+4*Math.sin(b*Math.PI)];if(u>.55)q=[lerp(30,RC[0],c),lerp(64,RC[1],c),lerp(BH+5,BH+16,c)];return q}},
 cor:{n:'Cortisol',k:'steroid',t:'hidrofóbica',res:'Es una hormona esteroidea, pequeña e hidrofóbica: se disuelve en el centro de la bicapa, la cruza y se une a un <b>receptor intracelular</b>.',
  path:u=>{const a=seg(u,0,.3),b=seg(u,.3,.7),c=seg(u,.7,1);let q=[lerp(76,104,a),lerp(40,BD-1,a),lerp(80,BH+3,a)];if(u>.3)q=[104,BD-1,lerp(BH+3,-3,b)];if(u>.7)q=[104,lerp(BD-1,78,c),lerp(-3,-23,c)];return q}},
 no:{n:'Óxido nítrico',k:'no',t:'gas',res:'Es un gas pequeño: cruza la membrana con facilidad y actúa sobre un <b>receptor intracelular</b> (la guanilil ciclasa).',
  path:u=>{const a=seg(u,0,.25),b=seg(u,.25,.55),c=seg(u,.55,1);let q=[lerp(90,108,a),lerp(30,BD-1,a),lerp(76,BH+3,a)];if(u>.25)q=[108,BD-1,lerp(BH+3,-3,b)];if(u>.55)q=[lerp(108,104,c),lerp(BD-1,78,c),lerp(-3,-23,c)];return q}}};
function scale(n){
  const rail=LV.map((l,i)=>`<li><button type="button" data-lv="${i}" aria-pressed="false"><span class="nn">${i+1}</span><span class="nm">${l.n}</span><span class="qq">${l.q}</span></button></li>`).join('');
  const body=`<div class="sc-wrap"><ol class="sc-rail" aria-label="Escala">${rail}</ol>
    <div class="sc-main"><div class="ex-plate sc-plate" tabindex="0" role="group" aria-label="Figura con cinco escalas. Usa las teclas más y menos, o las flechas, para acercarte o alejarte."><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Acercamiento progresivo de la célula diana a la molécula receptora">
      <defs><radialGradient id="sc-vg" r=".75"><stop class="a" offset=".4" stop-color="#fff"/><stop class="b" offset=".62" stop-color="#000"/></radialGradient><mask id="sc-mk" maskContentUnits="userSpaceOnUse"><rect width="${W}" height="${H}" fill="url(#sc-vg)"/></mask></defs><g data-l="0">${lvCell()}</g><g data-l="1">${lvMem()}</g><g data-l="2"></g><g data-l="3"></g></svg>
</div><div class="sc-zoom"><button type="button" data-z="-1" aria-label="Alejar">−</button><span class="sc-lv" aria-hidden="true"></span><button type="button" data-z="1" aria-label="Acercar">+</button><span class="sc-tip">Toca la zona resaltada o pellizca para acercarte</span></div>
    <div class="sc-sig" hidden><span class="lbl">Elige una señal</span>${Object.entries(SIG).map(([k,s])=>`<button type="button" data-s="${k}"><b>${s.n}</b> <i>${s.t}</i></button>`).join('')}</div>
    <div class="sc-mech" hidden></div>
    <div class="sc-qa" aria-live="polite"><p class="q"></p><p class="a"></p></div></div></div>`;
  return X.frame('esc',n,'De la célula a la molécula: ¿dónde se recibe la señal?',body,'Acércate escala por escala con los números, los botones + y −, pellizcando en una pantalla táctil o tocando la zona resaltada. Cada escala responde una pregunta. Esquema propio, no a escala; las moléculas se dibujan con su forma simplificada.',['A','L']);
}
function wireScale(fig){
  const svg=fig.querySelector('svg'),vg=[...fig.querySelectorAll('#sc-vg stop')],plate=fig.querySelector('.sc-plate'),L=[...svg.querySelectorAll('[data-l]')];
  const qa=fig.querySelector('.sc-qa'),sigBox=fig.querySelector('.sc-sig'),mech=fig.querySelector('.sc-mech'),lvl=fig.querySelector('.sc-lv');
  // escala 4-5: la escena del GPCR, escalada para llenar la lámina
  const sc=SC.gpcr();const s3=Math.min(W/sc.W,H/sc.H)*.98;
  L[3].innerHTML=`<rect class="b-cyto" width="${W}" height="${H}"/><g transform="translate(${f1((W-sc.W*s3)/2)} ${f1((H-sc.H*s3)/2)}) scale(${s3.toFixed(4)})">${sc.svg}</g>`;
  const render3=sc.bind(L[3]);render3(0);
  mech.innerHTML=B.ctlHTML(sc.phases)+'<p class="b-say" aria-live="polite"></p>';mech.querySelector('.b-ph').style.setProperty('--n',sc.phases.length);
  let ui;const say=mech.querySelector('.b-say');
  const pl=B.player({dur:sc.dur,render:render3,phases:sc.phases,onPhase:k=>{ui&&ui.phase(k);const p=sc.phases[Math.max(0,k)];say.innerHTML=`<b>${p.label}.</b> ${p.txt}`},onTick:(t,pg)=>ui&&ui.tick(t,pg,sc.dur)});
  ui=B.wireCtl(mech,pl,sc.phases);pl.draw();
  // bloque isométrico
  let az=45,azT=45,sig=null,sigU=0,sigK=null;
  const drawBlock=()=>{const s=sigK?{kind:SIG[sigK].k,q:SIG[sigK].path(sigU),glow:sigU>=1}:null;L[2].innerHTML=lvBlock(az,s);
    const P=blockGeo(az);FOC[2]=B.iso([RC[0],RC[1],BH],P)};
  drawBlock();
  // cámara
  let z=0,zT=0,mode=0,raf=0,last=0,visible=true,sigT0=0;
  const lvOf=v=>Math.round(clamp(v,0,3));
  const place=()=>{L.forEach((g,i)=>{const rel=z-i;if(rel<=-1||rel>=1.0001&&i<3||(i===3&&rel<=-1)){g.style.display='none';return}g.style.display='';
      let tr,op;if(rel>=0){const f=FOC[i]||C;const s=Math.pow(F,rel);const px=lerp(f[0],C[0],clamp(rel)),py=lerp(f[1],C[1],clamp(rel));tr=`translate(${f1(px)} ${f1(py)}) scale(${s.toFixed(4)}) translate(${f1(-f[0])} ${f1(-f[1])})`;op=i===3?1:1-seg(rel,.5,.92)}
      else{const f=FOC[i-1];const s=Math.pow(F,rel);const px=lerp(f[0],C[0],1+rel),py=lerp(f[1],C[1],1+rel);tr=`translate(${f1(px)} ${f1(py)}) scale(${s.toFixed(4)}) translate(${f1(-C[0])} ${f1(-C[1])})`;op=seg(rel,-.8,-.3)}
      if(rel<0&&rel>-1){g.setAttribute('mask','url(#sc-mk)');const u=1+rel;vg[0].setAttribute('offset',lerp(.38,1,u).toFixed(3));vg[1].setAttribute('offset',lerp(.6,1.01,u).toFixed(3))}else g.removeAttribute('mask');
      g.setAttribute('transform',tr);g.style.opacity=op.toFixed(3);g.style.pointerEvents=op>.6?'':'none'})};
  const ui2=()=>{const lv=mode===4?4:lvOf(zT);fig.querySelectorAll('[data-lv]').forEach(b=>{const on=+b.dataset.lv===lv;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
    qa.querySelector('.q').textContent=LV[lv].q;if(!(lv===2&&sigK))qa.querySelector('.a').innerHTML=LV[lv].a;lvl.textContent=`Escala ${lv+1} de 5 · ${LV[lv].n}`;
    sigBox.hidden=lv!==2;mech.hidden=lv!==4;plate.classList.toggle('zin',zT>0)};
  const tick=now=>{const dt=last?Math.min((now-last)/1000,1/30):1/60;last=now;let busy=false;
    if(X.RM())z=zT;else{z+=(zT-z)*(1-Math.exp(-dt/.32));if(Math.abs(zT-z)<.0015)z=zT;else busy=true}
    if(Math.abs(azT-az)>.05){az+=(azT-az)*(1-Math.exp(-dt/.12));busy=true;drawBlock()}
    if(sigK&&sigU<1){sigU=X.RM()?1:Math.min(1,sigU+dt/3.6);drawBlock();busy=busy||sigU<1}
    place();raf=busy&&visible?requestAnimationFrame(tick):0};
  const kick=()=>{if(!raf&&visible){last=0;raf=requestAnimationFrame(tick)}};
  const go=lv=>{mode=lv;zT=Math.min(lv,3);if(lv===4){pl.reset();pl.play(0)}else{pl.pause();if(lv<3)pl.seek(0)}ui2();kick()};
  fig.querySelectorAll('[data-lv]').forEach(b=>b.onclick=()=>go(+b.dataset.lv));
  fig.querySelectorAll('[data-z]').forEach(b=>b.onclick=()=>go(clamp((mode===4?4:lvOf(zT))+(+b.dataset.z),0,4)));
  svg.addEventListener('click',e=>{const f=e.target.closest('[data-go]');if(f)go(+f.dataset.go)});
  svg.addEventListener('keydown',e=>{const f=e.target.closest('[data-go]');if(f&&(e.key==='Enter'||e.key===' ')){e.preventDefault();go(+f.dataset.go)}});
  plate.addEventListener('keydown',e=>{if(e.target!==plate)return;const cur=mode===4?4:lvOf(zT);if(e.key==='+'||e.key==='='||e.key==='ArrowRight'){e.preventDefault();go(Math.min(4,cur+1))}else if(e.key==='-'||e.key==='ArrowLeft'){e.preventDefault();go(Math.max(0,cur-1))}else if(e.key==='Home'){e.preventDefault();go(0)}else if(e.key==='End'){e.preventDefault();go(4)}});
  // pellizco (dos dedos) y rueda con Ctrl/gesto de trackpad; un dedo en la escala 3 gira el bloque
  const pts=new Map();let d0=0,z0=0,ax0=0,az0=45;
  plate.addEventListener('pointerdown',e=>{pts.set(e.pointerId,[e.clientX,e.clientY]);if(pts.size===2){const [a,b]=[...pts.values()];d0=Math.hypot(a[0]-b[0],a[1]-b[1]);z0=z}else if(pts.size===1&&lvOf(zT)===2&&mode!==4&&e.target.closest('[data-l="2"]')){ax0=e.clientX;az0=azT;try{plate.setPointerCapture(e.pointerId)}catch(_){}}});
  plate.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId))return;pts.set(e.pointerId,[e.clientX,e.clientY]);
    if(pts.size===2){const [a,b]=[...pts.values()];const d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(d0>0){zT=clamp(z0+Math.log(d/d0)/Math.log(2.2),0,3);mode=lvOf(zT);ui2();kick()}}
    else if(pts.size===1&&lvOf(zT)===2&&mode!==4&&plate.hasPointerCapture&&plate.hasPointerCapture(e.pointerId)){azT=clamp(az0+(e.clientX-ax0)*.25,22,68);kick()}});
  const up=e=>{pts.delete(e.pointerId);if(pts.size<2&&d0){d0=0;go(lvOf(zT))}};
  plate.addEventListener('pointerup',up);plate.addEventListener('pointercancel',up);
  plate.addEventListener('wheel',e=>{if(!e.ctrlKey&&!e.metaKey)return;e.preventDefault();zT=clamp(zT-e.deltaY*.01,0,3);mode=lvOf(zT);ui2();kick();clearTimeout(plate._wt);plate._wt=setTimeout(()=>go(lvOf(zT)),260)},{passive:false});
  plate.addEventListener('dblclick',e=>{if(!e.target.closest('button'))go(Math.min(4,(mode===4?4:lvOf(zT))+1))});
  // señales en la bicapa
  sigBox.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{sigK=b.dataset.s;sigU=0;sigBox.querySelectorAll('[data-s]').forEach(x=>x.classList.toggle('on',x===b));
    qa.querySelector('.a').innerHTML=`<b>${SIG[sigK].n}.</b> ${SIG[sigK].res}`;drawBlock();kick()});
  B.seen(fig,v=>{visible=v;pl.visible(v);if(v)kick()});
  place();ui2();
}
X.escCSS=`
.ed #ex-esc .sc-wrap{display:grid;grid-template-columns:170px minmax(0,1fr);gap:0 22px}
.ed #ex-esc .sc-rail{list-style:none;padding:0;margin:0;border-top:1px solid var(--e-rule)}
.ed #ex-esc .sc-rail>li{margin:0!important;padding:0!important}.ed #ex-esc .sc-rail>li::before{display:none!important}
.ed #ex-esc .sc-rail button{display:grid;grid-template-columns:26px 1fr;width:100%;text-align:left;background:none;border:0;border-bottom:1px solid var(--e-rule);padding:12px 0;cursor:pointer;color:var(--e-mut);position:relative;min-height:44px}
.ed #ex-esc .sc-rail .nn{font:500 11px var(--e-mono);padding-top:4px}.ed #ex-esc .sc-rail .nm{font:400 20px/1.1 var(--e-disp);color:var(--e-ink)}
.ed #ex-esc .sc-rail .qq{grid-column:2;font:italic 400 13.5px/1.35 var(--e-body);margin-top:3px}
.ed #ex-esc .sc-rail button.on{color:var(--e-ink)}.ed #ex-esc .sc-rail button.on::before{content:"";position:absolute;left:-12px;top:10px;bottom:10px;width:3px;background:var(--e-td)}
.ed #ex-esc .sc-rail button.on .nm{font-style:italic}
.ed #ex-esc .sc-rail button:focus-visible,.ed #ex-esc .sc-plate:focus-visible,.ed #ex-esc .sc-zoom button:focus-visible,.ed #ex-esc .sc-sig button:focus-visible{outline:2px solid var(--e-td);outline-offset:3px}
.ed #ex-esc .sc-plate{position:relative;overflow:hidden;touch-action:pan-y;outline:none;user-select:none;-webkit-user-select:none}
.ed #ex-esc .sc-plate svg{display:block;width:100%;height:auto}
.ed #ex-esc .sc-zoom{display:flex;align-items:center;flex-wrap:wrap;gap:2px;padding:6px 4px;background:var(--e-plate);border-top:1px solid var(--e-rule)}.ed #ex-esc .sc-tip{font:italic 400 14px var(--e-body);color:var(--e-mut);margin-left:auto;padding:0 10px}
.ed #ex-esc .sc-zoom button{width:38px;height:38px;border:0;background:none;border-radius:50%;font:400 22px/1 var(--e-disp);color:var(--e-ink);cursor:pointer}
.ed #ex-esc .sc-zoom button:hover{background:var(--e-plate2)}
.ed #ex-esc .sc-lv{font:500 10.5px var(--e-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--e-mut);padding:0 8px;white-space:nowrap}
.ed #ex-esc .sc-qa{padding:14px 0 0;max-width:760px}.ed #ex-esc .sc-qa .q{font:italic 400 22px/1.25 var(--e-disp);margin:0 0 6px;color:var(--e-ink)}.ed #ex-esc .sc-qa .a{margin:0;font-size:17px;line-height:1.6}
.ed #ex-esc .sc-sig{display:flex;flex-wrap:wrap;gap:8px 10px;align-items:center;margin:12px 0 0}
.ed #ex-esc .sc-sig[hidden],.ed #ex-esc .sc-mech[hidden]{display:none}
.ed #ex-esc .sc-sig .lbl{font:500 11px var(--e-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--e-mut);margin-right:6px}
.ed #ex-esc .sc-sig button{background:none;border:1px solid var(--e-rule);border-radius:999px;padding:8px 14px;cursor:pointer;color:var(--e-ink);font:400 15px var(--e-body);min-height:40px}
.ed #ex-esc .sc-sig button i{color:var(--e-mut);font-size:13.5px}.ed #ex-esc .sc-sig button.on{border-color:var(--e-sg);background:var(--e-sgl)}
.ed #ex-esc .sc-ecm{fill:color-mix(in srgb,var(--e-exo) 70%,var(--e-sgl))}
.ed #ex-esc .sc-cap{fill:var(--e-ofl);stroke:var(--e-of);stroke-width:1.2}
.ed #ex-esc .sc-rbc ellipse{fill:color-mix(in srgb,var(--e-of) 70%,var(--e-paper));stroke:var(--e-of);stroke-width:.8}.ed #ex-esc .sc-rbc .in{fill:color-mix(in srgb,var(--e-of) 45%,var(--e-paper));stroke:none}
.ed #ex-esc .sc-cell{opacity:.55}.ed #ex-esc .sc-cell.tgt{opacity:1}
.ed #ex-esc .sc-cyt{fill:var(--e-cyt)}.ed #ex-esc .sc-pm{fill:none;stroke:var(--e-lh);stroke-width:3.2}.ed #ex-esc .sc-pm2{fill:none;stroke:var(--e-core);stroke-width:1}
.ed #ex-esc .sc-nuc{fill:var(--e-nuc);stroke:var(--e-rc);stroke-width:1.2}.ed #ex-esc .sc-chr circle{fill:var(--e-rc);opacity:.28}.ed #ex-esc .sc-nl{fill:var(--e-rc);opacity:.45}
.ed #ex-esc .sc-org ellipse{fill:var(--e-ofl);stroke:var(--e-of);stroke-width:.8;opacity:.8}
.ed #ex-esc .sc-h{fill:url(#bv-sg)}
.ed #ex-esc .sc-act circle{fill:var(--e-rs);opacity:.35}
.ed #ex-esc .sc-foc{cursor:pointer}.ed #ex-esc .sc-foc circle{fill:transparent;stroke:var(--e-td);stroke-width:1.6;stroke-dasharray:4 4}
.ed #ex-esc .sc-foc:hover circle,.ed #ex-esc .sc-foc:focus-visible circle{stroke-width:2.6;fill:color-mix(in srgb,var(--e-td) 8%,transparent)}.ed #ex-esc .sc-foc:focus{outline:none}
.ed #ex-esc .bk-top{fill:color-mix(in srgb,var(--e-lh) 55%,var(--e-core))}.ed #ex-esc .bk-face{fill:var(--e-core);stroke:color-mix(in srgb,var(--e-lh) 60%,#000);stroke-width:.6}.ed #ex-esc .bk-face.x{fill:color-mix(in srgb,var(--e-core) 85%,#000)}
.ed #ex-esc .bk-h{fill:url(#bv-lh);stroke:color-mix(in srgb,var(--e-lh) 70%,#000);stroke-width:.4}
.ed #ex-esc .bk-cyl path,.ed #ex-esc .bk-cyl ellipse{stroke-width:.6}
.ed #ex-esc [data-l="2"]{cursor:grab}
.ed #ex-esc .sc-hint{opacity:.8}
@media (max-width:760px){.ed #ex-esc .sc-wrap{grid-template-columns:1fr}.ed #ex-esc .sc-rail{display:flex;overflow-x:auto;border-top:0;margin-bottom:10px;gap:4px;scrollbar-width:none}
 .ed #ex-esc .sc-rail button{display:block;border:1px solid var(--e-rule);border-radius:999px;padding:8px 12px;white-space:nowrap;min-height:40px}.ed #ex-esc .sc-rail .qq{display:none}.ed #ex-esc .sc-rail .nm{font-size:16px}.ed #ex-esc .sc-rail .nn{margin-right:6px}
 .ed #ex-esc .sc-rail button.on{border-color:var(--e-td);background:var(--e-tdl)}.ed #ex-esc .sc-rail button.on::before{display:none}.ed #ex-esc .sc-tip{display:none}}
`;
Object.assign(X,{scale,wireScale});
})();
(function(){
'use strict';
const X=window.__SX;
const PICT=/\p{Extended_Pictographic}️?\s?/gu,HAS=/\p{Extended_Pictographic}/u;
function stripPict(root){if(!root)return;if(root.nodeType===3){if(HAS.test(root.data))root.data=root.data.replace(PICT,'');return}if(root.nodeType!==1||root.closest&&root.closest('svg'))return;
  const tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const L=[];while(tw.nextNode())L.push(tw.currentNode);L.forEach(n=>{if(HAS.test(n.data))n.data=n.data.replace(PICT,'')})}
const ICON={bm:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2h8v12l-4-3-4 3z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
 nt:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 13l1-3.2 7-7 2.2 2.2-7 7z M9.6 4.2l2.2 2.2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>'};
let cleanups=[];
function wrapStatic(fig,label){if(!fig)return null;const d=document.createElement('details');d.className='ed-static';if(fig.dataset.blk)d.dataset.blk=fig.dataset.blk;d.innerHTML=`<summary>${label}</summary>`;fig.before(d);d.appendChild(fig);return d}
function place(html,ref,where='before'){const t=document.createElement('template');t.innerHTML=html.trim();const el=t.content.firstElementChild;ref[where==='before'?'before':'after'](el);return el}
function enhance(art,ctx){
  if(!art||art.dataset.ed)return;art.dataset.ed='1';
  cleanups.forEach(f=>{try{f()}catch(e){}});cleanups=[];
  if(!document.getElementById('ed-fonts')){const l=document.createElement('link');l.id='ed-fonts';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..700,0..100;1,9..144,300..700,0..100&family=IBM+Plex+Mono:wght@400;500;600&display=swap';document.head.appendChild(l)}
  if(!document.getElementById('ed-css')){const s=document.createElement('style');s.id='ed-css';s.textContent=X.css+X.bioCSS+X.scCSS+X.escCSS+X.ideaCSS+X.commCSS+X.recCSS+X.casCSS+X.msgCSS+X.ampCSS+X.termCSS+X.cellCSS+X.sumCSS;document.head.appendChild(s)}
  art.classList.add('ed');
  if(!art.querySelector(':scope>.b-defs'))art.insertAdjacentHTML('afterbegin',X.B.defs());const rd=art.closest('.reader');if(rd)rd.classList.add('ed-r');
  // ---- portada ----
  art.insertAdjacentHTML('afterbegin',X.hero());
  const hero=art.querySelector('.ed-hero');
  X.onView(hero,v=>hero.classList.toggle('paused',!v));
  // ---- secciones: folio, referencias, recuadros ----
  const secs=[...art.querySelectorAll('section.bsec')],N=secs.length;
  secs.forEach((sec,k)=>{const pk=sec.querySelector(':scope>.pk');if(pk)pk.innerHTML=`<b>${String(k+1).padStart(2,'0')}</b>Parte ${k+1} de ${N}`;
    sec.insertAdjacentHTML('beforeend',`<div class="bsec-ref" data-blk="keep">${X.src(X.SECREF[k]||['A'])}</div>`)});
  const S0=secs[0],S1=secs[1],S2=secs[2],S3=secs[3],S6=secs[6],S8=secs[8];
  const h3=(sec,txt)=>[...sec.querySelectorAll(':scope>h3')].find(h=>h.textContent.trim().startsWith(txt));
  // relación clínica (contenido ya existente en el capítulo)
  const clinBlock=h=>{if(!h)return;h.classList.add('clin');let n=h.nextElementSibling;while(n&&n.tagName!=='H3'&&!n.matches('.bsec-ref,figure,.box')){if(!n.classList.contains('notes'))n.classList.add('clin');n=n.nextElementSibling}};
  clinBlock(h3(S0,'¿Por qué importa'));clinBlock(h3(S6,'Importancia médica'));
  if(S8){const t=S8.querySelector('table.cmp');if(t)t.classList.add('tbl-err')}
  // ---- figuras interactivas ----
  let n=0;
  const fIdea=S0.querySelector(':scope>.box.concepto');
  if(fIdea){const el=place(X.idea(++n),fIdea,'after');X.wireIdea(el)}
  wrapStatic(S0.querySelector('figure.fig[data-f="d_senal.F_esquema"]'),'Figura estática: esquema general');
  const fT=S1.querySelector('figure.fig[data-f="d_senal.F_tipos"]');
  if(fT){const el=place(X.comm(++n),fT,'before');X.wireComm(el);wrapStatic(fT,'Figura estática: formas de comunicación')}
  // escalas: de la célula a la molécula (antes de la figura estática de receptores)
  const fR=S2.querySelector('figure.fig[data-f="d_senal.F_receptores"]');
  if(fR){const el=place(X.scale(++n),fR,'before');X.wireScale(el);wrapStatic(fR,'Figura estática: receptores de superficie e intracelulares')}
  const hTres=h3(S2,'Tres clases');
  if(hTres){let anchor=hTres.nextElementSibling;while(anchor&&anchor.classList.contains('notes'))anchor=anchor.nextElementSibling;
    const el=place(X.rec(++n),anchor||hTres,anchor?'before':'after');
    if(anchor&&anchor.classList.contains('tw')){const old=el.querySelector('.tw');old.replaceWith(anchor);const tb=anchor.querySelector('table');tb.classList.add('rtab');[...tb.querySelectorAll('tr')].slice(1).forEach((tr,i)=>tr.dataset.r=['canal','gpcr','rtk'][i])}
    X.wireRec(el)}
  const vz=S3.querySelector(':scope>.vizhost');
  if(vz){const el=place(X.cas(++n),vz,'before');X.wireCas(el);cleanups.push(()=>el._cleanup&&el._cleanup())}
  const hAmp=h3(S3,'Amplificación');
  if(hAmp){const el=place(X.msg(++n),hAmp,'before');X.wireMsg(el)}
  const fA=S3.querySelector('figure.fig[data-f="d_senal.F_amplif"]');
  if(fA){const el=place(X.amp(++n),fA,'before');X.wireAmp(el);wrapStatic(fA,'Figura estática: amplificación')}
  const fOff=S6.querySelector('figure.fig[data-f="d_senal.F_apagar"]');
  if(fOff){const el=place(X.term(++n),fOff,'before');X.wireTerm(el);wrapStatic(fOff,'Figura estática: mecanismos de apagado')}
  // ---- final: célula completa, síntesis y referencias ----
  const nav=art.querySelector(':scope>.secnav');
  const fin=document.createElement('div');fin.className='ed-fin';fin.dataset.blk='keep';
  fin.innerHTML=`<div class="ed-finx">${X.cellFig(++n)}</div>`+X.summary()+X.refs();
  art.insertBefore(fin,nav);X.wireCell(fin.querySelector('#ex-cel'));
  // ---- enlaces internos: no cambian la ruta de la página ----
  art.addEventListener('click',e=>{const a=e.target.closest('a[href^="#ex-"],a[href="#ed-refs"]');if(!a)return;e.preventDefault();const id=a.getAttribute('href').slice(1);const t=document.getElementById(id);if(!t)return;
    const top=document.querySelector('.top');window.scrollTo({top:t.getBoundingClientRect().top+scrollY-(top?top.offsetHeight:0)-60,behavior:'smooth'});
    if(a.dataset.st&&X.ideaGo)X.ideaGo(+a.dataset.st)});
  // ---- sin emojis en esta lectura; iconos de guardar y nota en trazo ----
  art.querySelectorAll('.htools [data-bm]').forEach(b=>b.innerHTML=ICON.bm);art.querySelectorAll('.htools [data-nt]').forEach(b=>b.innerHTML=ICON.nt);
  stripPict(art);const rb=document.querySelector('.readbar');stripPict(rb);
  const mo=new MutationObserver(ms=>ms.forEach(m=>{if(m.type==='characterData')stripPict(m.target);else m.addedNodes.forEach(stripPict)}));
  mo.observe(art,{childList:true,subtree:true,characterData:true});if(rb)mo.observe(rb,{childList:true,subtree:true,characterData:true});
  cleanups.push(()=>mo.disconnect());
}
window.SENALX={enhance};
})();
