/* Modelo isométrico de la célula: un bloque celular visto desde arriba en tres cuartos, con la esquina
   delantera retirada (corte) para ver el interior. Cámara fija de anatomy (azimut 45°, elevación 30°).
   · Cara superior: membrana plasmática apical, con la textura de las cabezas polares en su propio plano.
   · Paredes del corte: citosol en sección, con la bicapa cortada en el borde superior (cabezas + colas).
   · Dentro del corte: núcleo (también cortado, con la envoltura doble, el nucleolo y el ADN), retículo
     endoplásmico liso/rugoso en cisternas, mitocondrias con crestas, microtúbulos.
   · Las moléculas de señalización se colocan en su sitio real: receptores en la membrana del borde del corte,
     proteínas G y enzimas en la cara citosólica, mensajeros en el citosol, factores de transcripción sobre el ADN.
   Todo se ordena de atrás hacia adelante (orden del pintor) y proyecta una sombra suave sobre la superficie de abajo. */
(function(){
'use strict';
const X=window.__SX,B=X.B;const {f1}=B;
const W=520,D=440,H=230,XC=150,YC=130,ZF=26;
const NUC={c:[300,330,100],r:80};
const VB=[1000,700];
// posiciones 3D de cada estructura (x, y, z en el mundo; z hacia arriba)
const P3={
 ach:[250,YC-30,H+40],adr:[312,YC-34,H+48],sq:[422,YC-32,H+46],gf:[XC-40,212,H+48],est:[XC-42,292,H+46],no:[XC-42,382,H+40],
 ch:[250,YC,H-7],gsr:[312,YC,H-7],ac:[362,YC,H-7],gqr:[422,YC,H-7],plc:[466,YC+10,H-20],dag:[490,YC+4,H-4],
 rtk:[XC,212,H-7],ras:[XC+10,254,H-22],
 gsa:[315,YC+20,H-34],camp:[365,YC+28,H-66],pka:[352,YC+46,H-106],glu:[262,YC+44,H-146],pde:[282,YC+18,H-72],
 gqa:[428,YC+20,H-34],pkc:[498,YC+26,H-46],ip3:[452,YC+40,H-86],erch:[440,222,94],ca:[460,214,128],cam:[492,216,152],camk:[506,238,120],pump:[410,272,86],
 grb:[XC+14,234,H-40],mapk:[XC+28,240,H-92],rgap:[XC+16,196,H-64],akt:[XC+22,286,H-36],
 nr:[XC+12,392,H-26],gc:[XC+14,426,H-66],pkg:[XC+28,430,118],ions:[252,YC+14,H-46],
 creb:[318,346,NUC.c[2]],erkn:[352,364,NUC.c[2]],hre:[328,390,NUC.c[2]],mrna:[292,318,NUC.c[2]+NUC.r+12]};
const ONNUC=new Set(['creb','erkn','hre']);
function proj(){const pts=[[0,0,0],[W,0,0],[0,D,0],[W,D,0],[0,0,H+56],[W,0,H+56],[0,D,H+56],[W,D,H+56]];return B.fit(pts,VB[0],VB[1],{pad:18,azimuth:45,elevation:30})}
function build(E,o={}){
  const Pj=proj(),I=q=>B.iso(q,Pj),Dp=q=>B.depth(q,Pj),k=Pj.scale*Math.sqrt(1.6);const pp=q=>{const v=I(q);return f1(v[0])+' '+f1(v[1])};
  const poly=(pts,cls,extra='')=>`<path class="${cls}" d="M${pts.map(pp).join('L')}Z"${extra}/>`;
  // matriz afín de un plano: u→eje1, v→eje2, origen o (para texturas y secciones dibujadas en el plano)
  const m=(o3,u3,v3)=>{const a=I(o3),b=I(u3),c=I(v3);return [b[0]-a[0],b[1]-a[1],c[0]-a[0],c[1]-a[1],a[0],a[1]].map(v=>v.toFixed(4)).join(' ')};
  const defs=`<defs>
   <pattern id="c3-heads" patternUnits="userSpaceOnUse" width="6.4" height="5.6" patternTransform="matrix(${m([0,0,H],[1,0,H],[0,1,H])})"><rect width="6.4" height="5.6" class="c3-pbg"/><circle cx="1.6" cy="1.4" r="2.25" class="c3-ph"/><circle cx="4.8" cy="4.2" r="2.25" class="c3-ph"/></pattern>
   <pattern id="c3-hx" patternUnits="userSpaceOnUse" width="6.4" height="5.6" patternTransform="matrix(${m([W,0,H],[W,1,H],[W,0,H-1])})"><rect width="6.4" height="5.6" class="c3-pbg2"/><circle cx="1.6" cy="1.4" r="2.25" class="c3-ph"/><circle cx="4.8" cy="4.2" r="2.25" class="c3-ph"/></pattern>
   <pattern id="c3-hy" patternUnits="userSpaceOnUse" width="6.4" height="5.6" patternTransform="matrix(${m([0,D,H],[1,D,H],[0,D,H-1])})"><rect width="6.4" height="5.6" class="c3-pbg3"/><circle cx="1.6" cy="1.4" r="2.25" class="c3-ph"/><circle cx="4.8" cy="4.2" r="2.25" class="c3-ph"/></pattern>
   ${['A','B'].map(f=>{const mm=f==='A'?m([XC,YC,H],[XC,YC+1,H],[XC,YC,H-1]):m([XC,YC,H],[XC+1,YC,H],[XC,YC,H-1]);
     return `<pattern id="c3-bl${f}" patternUnits="userSpaceOnUse" width="5" height="13" patternTransform="matrix(${mm})"><rect width="5" height="13" class="c3-core"/><path class="c3-tl" d="M1.6 3.4L1.9 6.2M3.2 3.4L3 6.2M1.7 9.6L1.9 6.8M3.1 9.6L3.4 6.8"/><circle cx="2.5" cy="1.9" r="1.9" class="c3-ph"/><circle cx="2.5" cy="11.1" r="1.9" class="c3-ph"/></pattern>`}).join('')}
   <linearGradient id="c3-cyA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="c3-s1"/><stop offset="1" class="c3-s2"/></linearGradient>
   <radialGradient id="c3-nuc" cx=".38" cy=".3" r=".8"><stop offset="0" class="c3-n0"/><stop offset=".7" class="c3-n1"/><stop offset="1" class="c3-n2"/></radialGradient>
   <linearGradient id="c3-topg" gradientUnits="userSpaceOnUse" x1="${f1(I([0,0,H])[0])}" y1="${f1(I([0,0,H])[1])}" x2="${f1(I([W,D,H])[0])}" y2="${f1(I([W,D,H])[1])}"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#1a1408" stop-opacity=".16"/></linearGradient>
   <radialGradient id="c3-sh" r=".5"><stop offset="0" stop-color="#0b1020" stop-opacity=".28"/><stop offset="1" stop-color="#0b1020" stop-opacity="0"/></radialGradient>
   <filter id="c3-dof" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation=".6"/></filter></defs>`;
  // ---------- cuerpo de la célula ----------
  const sh=`<ellipse class="c3-ground" cx="${pp([W/2,D/2,0]).split(' ')[0]}" cy="${f1(I([W/2,D/2,0])[1]+18)}" rx="${f1(W*k*.62)}" ry="${f1(D*k*.2)}" fill="url(#c3-sh)"/>`;
  const outerX=poly([[W,0,0],[W,YC,0],[W,YC,H],[W,0,H]],'c3-wx')+poly([[W,YC,0],[W,D,0],[W,D,ZF],[W,YC,ZF]],'c3-wx');
  const outerY=poly([[0,D,0],[XC,D,0],[XC,D,H],[0,D,H]],'c3-wy')+poly([[XC,D,0],[W,D,0],[W,D,ZF],[XC,D,ZF]],'c3-wy');
  const texX=poly([[W,0,0],[W,YC,0],[W,YC,H],[W,0,H]],'c3-tex',' fill="url(#c3-hx)"')+poly([[W,YC,0],[W,D,0],[W,D,ZF],[W,YC,ZF]],'c3-tex',' fill="url(#c3-hx)"');
  const texY=poly([[0,D,0],[XC,D,0],[XC,D,H],[0,D,H]],'c3-tex',' fill="url(#c3-hy)"')+poly([[XC,D,0],[W,D,0],[W,D,ZF],[XC,D,ZF]],'c3-tex',' fill="url(#c3-hy)"');
  const top=poly([[0,0,H],[W,0,H],[W,YC,H],[XC,YC,H],[XC,D,H],[0,D,H]],'c3-top',' fill="url(#c3-heads)"');
  const topShade=poly([[0,0,H],[W,0,H],[W,YC,H],[XC,YC,H],[XC,D,H],[0,D,H]],'c3-topsh');
  // paredes del corte (citosol en sección) y piso del corte
  const faceA=poly([[XC,YC,ZF],[XC,D,ZF],[XC,D,H],[XC,YC,H]],'c3-cA');
  const faceB=poly([[XC,YC,ZF],[W,YC,ZF],[W,YC,H],[XC,YC,H]],'c3-cB');
  const floor=poly([[XC,YC,ZF],[W,YC,ZF],[W,D,ZF],[XC,D,ZF]],'c3-fl');
  const stripA=poly([[XC,YC,H-13],[XC,D,H-13],[XC,D,H],[XC,YC,H]],'c3-strip',' fill="url(#c3-blA)"');
  const stripB=poly([[XC,YC,H-13],[W,YC,H-13],[W,YC,H],[XC,YC,H]],'c3-strip',' fill="url(#c3-blB)"');
  const stripBot=poly([[XC,D,0],[W,D,0],[W,D,ZF],[XC,D,ZF]],'c3-strip2')+poly([[W,YC,0],[W,D,0],[W,D,ZF],[W,YC,ZF]],'c3-strip2');
  // secciones de orgánulos dibujadas en el plano de cada pared
  const inPlane=(mm,body)=>`<g transform="matrix(${mm})">${body}</g>`;
  const mitoS=(x,y,rx,ry,rot)=>`<g transform="rotate(${rot} ${x} ${y})"><ellipse class="c3-mo" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/><path class="c3-mi" d="M${x-rx*.7} ${y+ry*.5}c${rx*.12}-${ry*1.1} ${rx*.24}-${ry*1.1} ${rx*.28} 0s${rx*.16} ${ry*1.1} ${rx*.28} 0 ${rx*.16}-${ry*1.1} ${rx*.28} 0 ${rx*.16} ${ry*1.1} ${rx*.28} 0"/></g>`;
  const erS=(x,y,w,n)=>Array.from({length:n},(_,i)=>`<path class="c3-erS" d="M${x} ${y+i*7}q${w/4}-4 ${w/2} 0t${w/2} 0"/>`).join('');
  // pared A: coordenadas (u = y − YC, v = H − z) → u hacia adelante, v hacia abajo
  const secA=inPlane(m([XC,YC,H],[XC,YC+1,H],[XC,YC,H-1]),`${mitoS(150,150,18,8,-12)}${erS(60,120,60,3)}${mitoS(40,175,14,7,20)}<path class="c3-mt" d="M10 40 C 80 70 140 60 260 120 M30 190 C 90 150 160 170 250 150"/>`);
  const secB=inPlane(m([XC,YC,H],[XC+1,YC,H],[XC,YC,H-1]),`${mitoS(70,165,18,8,8)}${erS(170,170,80,3)}${mitoS(280,120,15,7,-14)}<path class="c3-mt" d="M20 60 C 120 40 200 90 310 70 M10 140 C 100 120 220 150 315 130"/>`);
  // ---------- objetos dentro del corte ----------
  const items=[];// [profundidad, svg]
  // núcleo con su propio corte (octante delantero retirado)
  const [nx,ny,nz]=NUC.c,nr=NUC.r;const nC=I(NUC.c);const R=nr*k;
  let nuc=`<g class="c3-nucg"><ellipse cx="${f1(I([nx,ny,ZF])[0])}" cy="${f1(I([nx,ny,ZF])[1])}" rx="${f1(R*1.05)}" ry="${f1(R*.5)}" fill="url(#c3-sh)"/>
    <circle class="c3-nenv" cx="${f1(nC[0])}" cy="${f1(nC[1])}" r="${f1(R+2.5)}"/><circle class="c3-nsur" cx="${f1(nC[0])}" cy="${f1(nC[1])}" r="${f1(R)}" fill="url(#c3-nuc)"/>`;
  // poros nucleares en la superficie visible
  for(let i=0;i<46;i++){const th=Math.acos(1-2*((i+.5)/46)),ph=i*2.399;const q=[nx+nr*Math.sin(th)*Math.cos(ph),ny+nr*Math.sin(th)*Math.sin(ph),nz+nr*Math.cos(th)];
    const nrm=[q[0]-nx,q[1]-ny,q[2]-nz];if(nrm[0]*.61+nrm[1]*.61+nrm[2]*.5<8)continue;if(q[0]>nx&&q[1]>ny&&q[2]>nz)continue;const v=I(q);nuc+=`<circle class="c3-pore" cx="${f1(v[0])}" cy="${f1(v[1])}" r="2.1"/>`}
  // tres caras del corte del núcleo (cuartos de disco)
  const qd=(mmA,mmB,lbl)=>{let d='M0 0';for(let i=0;i<=24;i++){const a=i/24*Math.PI/2;d+=`L${f1(Math.cos(a)*nr)} ${f1(Math.sin(a)*nr)}`}return `<path class="c3-nface ${lbl}" d="${d}Z" transform="matrix(${m(NUC.c,mmA,mmB)})"/>`};
  const nf=qd([nx+1,ny,nz],[nx,ny,nz+1],'fy')+qd([nx,ny+1,nz],[nx,ny,nz+1],'fx')+qd([nx+1,ny,nz],[nx,ny+1,nz],'fz');
  // contenido del núcleo en el corte: envoltura doble en el borde, cromatina, nucleolo y ADN sobre la cara horizontal
  let chrom='';const rr=B.rng(17);for(let i=0;i<70;i++){const a=rr()*Math.PI/2,r=Math.sqrt(rr())*nr*.9;chrom+=`<circle cx="${f1(Math.cos(a)*r)}" cy="${f1(Math.sin(a)*r)}" r="${f1(1+rr()*2.4)}"/>`}
  const arcEnv=`<path class="c3-nedge" d="M${nr} 0 A${nr} ${nr} 0 0 1 0 ${nr}"/><path class="c3-nedge2" d="M${nr-4} 0 A${nr-4} ${nr-4} 0 0 1 0 ${nr-4}"/>`;
  const inN=`<g class="c3-chr" transform="matrix(${m(NUC.c,[nx+1,ny,nz],[nx,ny,nz+1])})">${chrom}${arcEnv}<circle class="c3-nl" cx="${f1(nr*.4)}" cy="${f1(nr*.42)}" r="${f1(nr*.17)}"/></g>
    <g class="c3-chr" transform="matrix(${m(NUC.c,[nx,ny+1,nz],[nx,ny,nz+1])})">${chrom}${arcEnv}</g>
    <g transform="matrix(${m(NUC.c,[nx+1,ny,nz],[nx,ny+1,nz])})"><g class="c3-chr">${chrom}</g>${arcEnv}${B.dna(4,nr*.92,nr*.42,{a:4,per:16}).replace('<g class="b-dna">','<g class="b-dna" transform="rotate(32) translate(0 -8)">')}</g>`;
  nuc+=nf+inN+`</g>`;
  items.push([Dp(NUC.c),nuc]);
  // retículo endoplásmico: cisternas apiladas (rugoso: ribosomas en la cara citosólica)
  const er=(x0,y0,z0,len,wd,n)=>{let s='';for(let j=0;j<n;j++){const z=z0+j*12;const pts=[];for(let i=0;i<=20;i++){const t=i/20;pts.push([x0+t*len,y0+Math.sin(t*Math.PI*2+j)*10,z+Math.sin(t*Math.PI*3+j)*3])}
      const up=pts.map(p=>I([p[0],p[1]-wd/2,p[2]])),dn=pts.map(p=>I([p[0],p[1]+wd/2,p[2]]));
      s+=`<path class="c3-er" d="M${up.map(v=>f1(v[0])+' '+f1(v[1])).join('L')}L${dn.reverse().map(v=>f1(v[0])+' '+f1(v[1])).join('L')}Z"/>`;
      if(j===n-1)pts.forEach((p,i)=>{if(i%2)return;const v=I([p[0],p[1]-wd/2,p[2]+2]);s+=`<circle class="c3-ribo" cx="${f1(v[0])}" cy="${f1(v[1])}" r="1.6"/>`})}return s};
  items.push([Dp([450,250,60])-30,`<g class="c3-erg">${er(396,222,44,118,56,4)}</g>`]);
  // mitocondrias apoyadas en el piso del corte
  const mito=(c,ax,len,r)=>{const a=I([c[0]-ax[0]*len/2,c[1]-ax[1]*len/2,c[2]]),b=I([c[0]+ax[0]*len/2,c[1]+ax[1]*len/2,c[2]]);const cx=(a[0]+b[0])/2,cy=(a[1]+b[1])/2,ang=Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI,L=Math.hypot(b[0]-a[0],b[1]-a[1]);
    const rx=L/2+r*k,ry=r*k*.92;let cr='';for(let i=-3;i<=3;i++)cr+=`M${f1(cx+i*rx*.24)} ${f1(cy-ry*.6)}q${f1(rx*.06)} ${f1(ry*.6)} 0 ${f1(ry*1.2)}`;
    const s=I([c[0],c[1],ZF]);return `<ellipse cx="${f1(s[0])}" cy="${f1(s[1]+3)}" rx="${f1(rx)}" ry="${f1(ry*.55)}" fill="url(#c3-sh)" transform="rotate(${f1(ang*.3)} ${f1(s[0])} ${f1(s[1])})"/><g transform="rotate(${f1(ang)} ${f1(cx)} ${f1(cy)})"><ellipse class="c3-mito" cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(rx)}" ry="${f1(ry)}" fill="url(#bv-of)"/><path class="c3-cr" d="${cr}" transform="rotate(${f1(-ang)} ${f1(cx)} ${f1(cy)}) rotate(${f1(ang)} ${f1(cx)} ${f1(cy)})"/><ellipse class="c3-mhl" cx="${f1(cx-rx*.25)}" cy="${f1(cy-ry*.45)}" rx="${f1(rx*.45)}" ry="${f1(ry*.18)}"/></g>`};
  [[[470,350,ZF+12],[0,1,0],70,12],[[205,175,ZF+11],[1,0,0],50,11],[[420,395,ZF+11],[1,.2,0],50,11]].forEach(a=>items.push([Dp(a[0]),mito(...a)]));
  // microtúbulos que salen de la zona del núcleo
  let mt='';[[[300,330,60],[505,180,ZF+4]],[[250,290,90],[170,150,H-30]],[[340,280,150],[500,150,H-24]]].forEach(([a,b])=>{const p=[];for(let i=0;i<=12;i++){const t=i/12;p.push(I([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t+Math.sin(t*Math.PI)*14]))}mt+=`<path class="c3-mt3" d="M${p.map(v=>f1(v[0])+' '+f1(v[1])).join('L')}"/>`});
  // ---------- estructuras de señalización ----------
  const shadows=[];
  Object.entries(E).forEach(([id,e])=>{const q=P3[id];if(!q)return;const v=I(q);e.x=v[0];e.y=v[1];e.p3=q;
    // sombra sobre la superficie inferior: la membrana apical (ligandos) o el piso del corte (citosol)
    if(ONNUC.has(id)||id==='mrna')return;let floorZ=null;if(q[2]>H)floorZ=H;else if(q[0]>XC&&q[1]>YC&&q[2]<H-14)floorZ=ZF;
    if(floorZ!=null){const s=I([q[0],q[1],floorZ]);const hgt=q[2]-floorZ;const op=Math.max(.15,1-hgt/220);shadows.push(`<ellipse class="c3-csh" cx="${f1(s[0])}" cy="${f1(s[1])}" rx="${f1(16+hgt*.04)}" ry="${f1(6+hgt*.015)}" fill="url(#c3-sh)" style="opacity:${op.toFixed(2)}"/>`)}});
  const order=Object.keys(E).filter(id=>P3[id]).map(id=>[ONNUC.has(id)?1e6+Dp(P3[id]):Dp(P3[id]),id]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
  const membraneIds=new Set(['ch','gsr','ac','gqr','rtk','dag']);
  const svg=`<svg viewBox="0 0 ${VB[0]} ${VB[1]}" role="img" aria-label="Modelo tridimensional de una célula con un corte que muestra el citoplasma, el núcleo y las vías de señalización">${defs}
   <rect class="exo" x="-2000" y="-2000" width="5000" height="5000"/>${sh}
   <g class="c3-body">${outerX}${outerY}${texX}${texY}${stripBot}${top}${topShade}${floor}${faceB}${faceA}${secA}${secB}${stripB}${stripA}</g>
   <g class="c3-shadows">${shadows.join('')}</g>${mt}
   <g class="c3-in">${items.sort((a,b)=>a[0]-b[0]).map(x=>x[1]).join('')}</g>
   ${o.labels!==false?`<g class="zl">${lab3([40,30,H+4],'Membrana plasmática')}${lab3([W-20,20,H+40],'Exterior','end')}${lab3([XC+40,D-14,ZF+4],'Citosol')}${lab3([nx-nr*1.05,ny-nr*.5,nz+nr*.95],'Núcleo','end')}${lab3([W-6,310,ZF+6],'Retículo endoplásmico','end')}</g>`:''}
   <path class="route" d=""/>${o.els?o.els(order,membraneIds):''}<circle class="sigp" r="8" cx="-50" cy="-50" fill="url(#bg-glow)"/><circle class="sigc" r="3.4" cx="-50" cy="-50"/></svg>`;
  function lab3(q,s,a='start'){const v=I(q);return `<text class="ce-l z" x="${f1(v[0])}" y="${f1(v[1])}" text-anchor="${a}">${s.toUpperCase()}</text>`}
  const pf=o.idp||'c3';const out=pf==='c3'?svg:svg.replace(/(id="|url\(#)c3-/g,'$1'+pf+'-');
  return {svg:out,VB,P3};
}
X.cell3D={build,P3,VB,dims:{W,D,H,XC,YC,ZF,NUC}};
X.c3CSS=`
.ed .c3-ground{opacity:.9}
.ed .c3-wx{fill:color-mix(in srgb,var(--e-lh) 55%,#5a4626)}.ed .c3-wy{fill:color-mix(in srgb,var(--e-lh) 72%,#6a5530)}
.ed .c3-tex{opacity:.55}
.ed .c3-pbg{fill:color-mix(in srgb,var(--e-lh) 70%,var(--e-core))}.ed .c3-pbg2{fill:color-mix(in srgb,var(--e-lh) 55%,#4a3a20)}.ed .c3-pbg3{fill:color-mix(in srgb,var(--e-lh) 70%,#5a4626)}
.ed .c3-ph{fill:url(#bv-lh)}
.ed .c3-topsh{fill:url(#c3-topg);pointer-events:none}
.ed .c3-cA{fill:color-mix(in srgb,var(--e-cyt) 82%,var(--e-lh))}.ed .c3-cB{fill:color-mix(in srgb,var(--e-cyt) 92%,var(--e-lh))}.ed .c3-fl{fill:color-mix(in srgb,var(--e-cyt) 72%,var(--e-lh))}
.ed .c3-core{fill:var(--e-core)}.ed .c3-tl{fill:none;stroke:var(--e-lt);stroke-width:.55}
.ed .c3-strip{stroke:color-mix(in srgb,var(--e-lh) 60%,#000);stroke-width:.5}.ed .c3-strip2{fill:color-mix(in srgb,var(--e-lh) 60%,#4a3a20)}
.ed .c3-mo{fill:color-mix(in srgb,var(--e-of) 30%,var(--e-cyt));stroke:var(--e-of);stroke-width:1.2}.ed .c3-mi{fill:none;stroke:var(--e-of);stroke-width:.9;opacity:.7}
.ed .c3-erS{fill:none;stroke:color-mix(in srgb,var(--e-rs) 70%,var(--e-lh));stroke-width:2.4;opacity:.65}
.ed .c3-mt{fill:none;stroke:var(--e-td);stroke-width:1;opacity:.14}.ed .c3-mt3{fill:none;stroke:var(--e-td);stroke-width:1.6;opacity:.2;stroke-linecap:round}
.ed .c3-n0{stop-color:color-mix(in srgb,var(--e-rc) 10%,#fff)}.ed .c3-n1{stop-color:color-mix(in srgb,var(--e-rc) 30%,var(--e-nuc))}.ed .c3-n2{stop-color:color-mix(in srgb,var(--e-rc) 62%,#000)}
.ed .c3-nenv{fill:none;stroke:color-mix(in srgb,var(--e-rc) 55%,var(--e-lh));stroke-width:2.2;opacity:.8}
.ed .c3-pore{fill:color-mix(in srgb,var(--e-rc) 70%,#000);opacity:.55}
.ed .c3-nface{stroke:color-mix(in srgb,var(--e-rc) 60%,#000);stroke-width:.8}.ed .c3-nface.fy{fill:color-mix(in srgb,var(--e-nuc) 88%,var(--e-rc))}.ed .c3-nface.fx{fill:color-mix(in srgb,var(--e-nuc) 80%,var(--e-rc))}.ed .c3-nface.fz{fill:var(--e-nuc)}
.ed .c3-chr circle{fill:var(--e-rc);opacity:.2}.ed .c3-nl{fill:var(--e-rc);opacity:.35!important}
.ed .c3-nedge{fill:none;stroke:color-mix(in srgb,var(--e-lh) 80%,#000);stroke-width:1.6}.ed .c3-nedge2{fill:none;stroke:color-mix(in srgb,var(--e-lh) 80%,#000);stroke-width:1;opacity:.7}
.ed .c3-er{fill:color-mix(in srgb,var(--e-rs) 35%,var(--e-cyt));stroke:color-mix(in srgb,var(--e-lh) 70%,#3a3020);stroke-width:1.1;stroke-linejoin:round}
.ed .c3-ribo{fill:color-mix(in srgb,var(--e-rc) 60%,var(--e-paper))}
.ed .c3-mito{stroke:color-mix(in srgb,var(--e-of) 75%,#000);stroke-width:1}.ed .c3-cr{fill:none;stroke:color-mix(in srgb,var(--e-of) 60%,#000);stroke-width:1;opacity:.55}.ed .c3-mhl{fill:#fff;opacity:.18}
`;
})();
