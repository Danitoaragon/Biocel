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
