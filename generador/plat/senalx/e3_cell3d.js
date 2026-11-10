/* Modelo tridimensional de una célula animal, cortada horizontalmente y vista desde arriba en tres cuartos
   (cámara fija de anatomy: azimut 80°, elevación 50°). Composición de atlas: la célula llena la lámina, el
   corte deja ver el citoplasma y los orgánulos con volumen; el núcleo tiene a su vez una cuña retirada.
   · Borde: membrana plasmática en sección (bicapa: cabezas polares y colas) y su cara lateral.
   · Núcleo: cúpula con poros, cuña cortada con envoltura doble, cromatina, nucleolo y ADN.
   · Retículo endoplásmico: cisternas concéntricas alrededor del núcleo, con ribosomas.
   · Mitocondrias cortadas con su membrana externa, matriz y crestas; citoesqueleto y ribosomas libres.
   · Cada molécula de señalización ocupa su sitio: receptores atravesando la membrana del borde (orientados
     hacia afuera), proteínas citosólicas sobre el citoplasma, factores de transcripción sobre el ADN.
   No incluye estructuras que no aparezcan en el capítulo o que no sean propias de una célula animal. */
(function(){
'use strict';
const X=window.__SX,B=X.B;const {f1}=B;
const VB=[1000,700];
const A=330,Bm=245,T=46;                 // semiejes del contorno y grosor del corte
const AZ=80,EL=50;
const NUC={c:[40,-40],R:104,w:[10,110],h:.34};  // núcleo y cuña retirada (ángulos)
const rr=th=>{const t=th*Math.PI/180;const e=A*Bm/Math.hypot(Bm*Math.cos(t),A*Math.sin(t));return e*(1+.045*Math.sin(3*t+.5)+.03*Math.sin(5*t+1.7)+.018*Math.sin(7*t+.3))};
const rim=(th,d=0)=>{const t=th*Math.PI/180,r=rr(th)-d;return [r*Math.cos(t),r*Math.sin(t)]};
const pol=(c,ang,r)=>{const t=ang*Math.PI/180;return [c[0]+r*Math.cos(t),c[1]+r*Math.sin(t)]};
// posiciones: [x, y, z]; 'rim' = sobre la membrana del borde (se orienta hacia afuera)
const at=(p,z=T+10)=>[p[0],p[1],z];
const RIM=new Set(['ch','gsr','ac','gqr','dag','rtk']);
const P3={
 ach:at(rim(-170,-52),T+22),ch:at(rim(-170),T),ions:at(rim(-170,62)),
 adr:at(rim(-142,-70),T+26),gsr:at(rim(-142),T),gsa:at(rim(-142,98)),ac:at(rim(-120),T),
 camp:at([-150,-74]),pka:at([-200,-6]),pde:at([-104,-160]),glu:at([-262,64]),
 sq:at(rim(-26,-70),T+26),gqr:at(rim(-26),T),dag:at(rim(-12),T),gqa:at(rim(-28,74)),plc:at(rim(-6,44)),pkc:at(rim(14,52)),
 ip3:at([250,-22]),erch:at(pol(NUC.c,-14,NUC.R+40)),ca:at([262,38]),cam:at([220,66]),camk:at([186,110]),pump:at(pol(NUC.c,26,NUC.R+42)),
 gf:at(rim(58,-72),T+26),rtk:at(rim(58),T),grb:at([122,156]),ras:at(rim(74,50)),mapk:at([100,92]),rgap:at([250,124]),akt:at([40,150]),
 est:at(rim(104,-54),T+24),nr:at(rim(104,76)),no:at(rim(130,-52),T+22),gc:at(rim(130,72)),pkg:at(rim(130,138)),
 creb:at(pol(NUC.c,30,62),T+NUC.R*NUC.h+4),erkn:at(pol(NUC.c,62,76),T+NUC.R*NUC.h+4),hre:at(pol(NUC.c,94,58),T+NUC.R*NUC.h+4),mrna:at([-84,20],T+12)};
const ONNUC=new Set(['creb','erkn','hre']);
function proj(){const pts=[];for(let th=0;th<360;th+=10){const p=rim(th);pts.push([p[0],p[1],0],[p[0],p[1],T+30])}pts.push([NUC.c[0],NUC.c[1],T+NUC.R]);return B.fit(pts,VB[0],VB[1],{pad:22,azimuth:AZ,elevation:EL})}
function build(E,o={}){
  const Pj=proj(),I=q=>B.iso(q,Pj),Dp=q=>B.depth(q,Pj),k=Pj.scale*Math.sqrt(1.6),sE=Math.sin(EL*Math.PI/180);
  const P2=v=>f1(v[0])+' '+f1(v[1]),pp=q=>P2(I(q));
  const ring=(z,d=0,n=180)=>{const a=[];for(let i=0;i<n;i++){const th=-180+i*360/n;const p=rim(th,d);a.push([p[0],p[1],z])}return a};
  const path=pts=>`M${pts.map(pp).join('L')}Z`;
  const m=(o3,u3,v3)=>{const a=I(o3),b=I(u3),c=I(v3);return [b[0]-a[0],b[1]-a[1],c[0]-a[0],c[1]-a[1],a[0],a[1]].map(v=>v.toFixed(4)).join(' ')};
  const R0=I([0,0,0]),Rt=I([0,0,T]);
  const top=path(ring(T)),bot=path(ring(0));
  const defs=`<defs>
   <clipPath id="c3-clip"><path d="${top}"/></clipPath>
   <radialGradient id="c3-cyt" cx=".42" cy=".38" r=".7"><stop offset="0" class="c3-cy0"/><stop offset=".75" class="c3-cy1"/><stop offset="1" class="c3-cy2"/></radialGradient>
   <linearGradient id="c3-wall" x1="0" x2="1" y1="0" y2="0"><stop offset="0" class="c3-w0"/><stop offset=".45" class="c3-w1"/><stop offset="1" class="c3-w0"/></linearGradient>
   <radialGradient id="c3-nuc" cx=".36" cy=".24" r=".85"><stop offset="0" class="c3-n0"/><stop offset=".6" class="c3-n1"/><stop offset="1" class="c3-n2"/></radialGradient>
   <radialGradient id="c3-sh" r=".5"><stop offset="0" stop-color="#0b1020" stop-opacity=".3"/><stop offset="1" stop-color="#0b1020" stop-opacity="0"/></radialGradient>
   <filter id="c3-tex" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".022 .034" numOctaves="3" seed="7"/><feColorMatrix values="0 0 0 0 .35  0 0 0 0 .3  0 0 0 0 .5  0 0 0 .55 -.1"/></filter>
   <filter id="c3-soft" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#0b1020" flood-opacity=".25"/></filter></defs>`;
  // ---------- cuerpo: sombra, cara lateral, cara de corte ----------
  const gc=I([0,0,0]);
  let s=`<ellipse cx="${f1(gc[0])}" cy="${f1(gc[1]+26)}" rx="${f1(A*k*1.05)}" ry="${f1(Bm*k*sE*1.1)}" fill="url(#c3-sh)"/>`;
  s+=`<path class="c3-side" d="${bot}" fill="url(#c3-wall)"/>`;
  // bandas verticales de la cara lateral (curvatura) y la cara lateral de la membrana (cabezas polares)
  let fl='';ring(0,0,120).forEach((p,i)=>{if(i%2)return;const q=I(p),q2=I([p[0],p[1],T]);fl+=`M${P2(q)}L${P2(q2)}`});
  s+=`<path class="c3-sideln" d="${fl}"/>`;
  s+=`<path class="c3-cut" d="${top}" fill="url(#c3-cyt)"/><rect x="0" y="0" width="${VB[0]}" height="${VB[1]}" filter="url(#c3-tex)" clip-path="url(#c3-clip)" class="c3-texr"/>`;
  // citoesqueleto y ribosomas libres sobre la superficie del corte
  const R=B.rng(23);let cs='',rb='';
  const inN=(x,y,pad=10)=>Math.hypot(x-NUC.c[0],y-NUC.c[1])<NUC.R+70+pad;
  for(let i=0;i<9;i++){const a=R()*360,b=a+90+R()*120;const p0=pol(NUC.c,a,NUC.R+70),p1=rim(b,30);const pts=[];for(let j=0;j<=14;j++){const t=j/14;pts.push(I([p0[0]+(p1[0]-p0[0])*t+Math.sin(t*3+i)*18,p0[1]+(p1[1]-p0[1])*t+Math.cos(t*2+i)*14,T+1]))}cs+=`M${pts.map(P2).join('L')}`}
  for(let i=0;i<260;i++){const th=R()*360,d=20+R()*(rr(th)-30);const t=th*Math.PI/180;const x=Math.cos(t)*d,y=Math.sin(t)*d;if(inN(x,y))continue;const v=I([x,y,T+1]);rb+=`<circle cx="${f1(v[0])}" cy="${f1(v[1])}" r="${f1(1+R()*1.2)}"/>`}
  s+=`<path class="c3-cs" d="${cs}"/><g class="c3-rb">${rb}</g>`;
  // membrana del borde en sección (bicapa), siguiendo el contorno proyectado
  const rimS=ring(T,0,360).map(I);const mem=B.sample(t=>{const f=t*rimS.length,i=Math.floor(f)%rimS.length,j=(i+1)%rimS.length,u=f-Math.floor(f);return [rimS[i][0]+(rimS[j][0]-rimS[i][0])*u,rimS[i][1]+(rimS[j][1]-rimS[i][1])*u]},0,1,6.4);
  const memSkip=(x,y)=>[...RIM].some(id=>{const q=E[id]&&P3[id];if(!q)return false;const v=I(q);return Math.hypot(x-v[0],y-v[1])<(id==='dag'?0:17)});
  s+=`<g class="c3-rim">${B.bilayer(mem,{t:8,r:2.6,skip:memSkip})}</g>`;
  // ---------- objetos con volumen (orden del pintor) ----------
  const items=[];
  // retículo endoplásmico: cisternas concéntricas detrás del núcleo, con ribosomas
  {let er='';for(let i=2;i>=0;i--){const r0=NUC.R+18+i*14,h=12-i*1.5;const arc=[];for(let a=150;a<=395;a+=5)arc.push(pol(NUC.c,a,r0+Math.sin(a/18+i)*3));
    const topA=arc.map(p=>I([p[0],p[1],T+h])),botA=arc.map(p=>I([p[0],p[1],T])).reverse();const inA=arc.map(p=>{const d=Math.hypot(p[0]-NUC.c[0],p[1]-NUC.c[1]);return pol(NUC.c,Math.atan2(p[1]-NUC.c[1],p[0]-NUC.c[0])*180/Math.PI,d-7)});
    const topIn=inA.map(p=>I([p[0],p[1],T+h])).reverse();
    er+=`<path class="c3-erw" d="M${topA.map(P2).join('L')}L${botA.map(P2).join('L')}Z"/><path class="c3-ert" d="M${topA.map(P2).join('L')}L${topIn.map(P2).join('L')}Z"/>`;
    topA.forEach((v,j)=>{if(j%2)return;er+=`<circle class="c3-ribo" cx="${f1(v[0])}" cy="${f1(v[1]-.5)}" r="1.7"/>`})}
   items.push([Dp([NUC.c[0],NUC.c[1]-NUC.R-40,T])-1,`<g class="c3-erg">${er}</g>`])}
  // núcleo: cúpula con poros y cuña retirada
  {const [cx,cy]=NUC.c,Rn=NUC.R,C=I([cx,cy,T]),Rs=Rn*k,ry=Rn*k*sE;const [w1,w2]=NUC.w;const h0=Rn*NUC.h,Rf=Math.sqrt(Rn*Rn-h0*h0),ua=Math.asin(NUC.h)*180/Math.PI;
   const wpts=[[cx,cy,T+h0],[cx,cy,T+Rn]];for(let a=w1;a<=w2;a+=5)for(let u=ua;u<=90;u+=6){const r=Rn*Math.cos(u*Math.PI/180);wpts.push([...pol(NUC.c,a,r),T+Rn*Math.sin(u*Math.PI/180)])}
   const hull=(P)=>{P=P.slice().sort((a,b)=>a[0]-b[0]||a[1]-b[1]);const cr=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);const lo=[],up=[];for(const p of P){while(lo.length>=2&&cr(lo[lo.length-2],lo[lo.length-1],p)<=0)lo.pop();lo.push(p)}for(const p of P.slice().reverse()){while(up.length>=2&&cr(up[up.length-2],up[up.length-1],p)<=0)up.pop();up.push(p)}return lo.slice(0,-1).concat(up.slice(0,-1))};
   const wh=hull(wpts.map(I));
   let n=`<mask id="c3-nmask" maskUnits="userSpaceOnUse" x="0" y="0" width="${VB[0]}" height="${VB[1]}"><rect width="${VB[0]}" height="${VB[1]}" fill="#fff"/><path d="M${wh.map(P2).join('L')}Z" fill="#000"/></mask><g class="c3-nucg" filter="url(#c3-soft)"><path mask="url(#c3-nmask)" class="c3-ndome" d="M${f1(C[0]-Rs)} ${f1(C[1])}A${f1(Rs)} ${f1(Rs)} 0 0 1 ${f1(C[0]+Rs)} ${f1(C[1])}A${f1(Rs)} ${f1(ry)} 0 0 1 ${f1(C[0]-Rs)} ${f1(C[1])}Z" fill="url(#c3-nuc)"/></g>`;
   const tw=[Math.cos(AZ*Math.PI/180),Math.sin(AZ*Math.PI/180)];
   for(let i=0;i<120;i++){const th=Math.acos(1-((i+.5)/120)),ph=i*2.399;const q=[cx+Rn*Math.sin(th)*Math.cos(ph),cy+Rn*Math.sin(th)*Math.sin(ph),T+Rn*Math.cos(th)];
     const nrm=[Math.sin(th)*Math.cos(ph),Math.sin(th)*Math.sin(ph),Math.cos(th)];if(nrm[0]*tw[0]*Math.cos(EL*Math.PI/180)+nrm[1]*tw[1]*Math.cos(EL*Math.PI/180)+nrm[2]*sE<.12)continue;
     let a=(ph*180/Math.PI)%360;if(a>w1&&a<w2)continue;const v=I(q);n+=`<circle class="c3-pore" cx="${f1(v[0])}" cy="${f1(v[1])}" r="${f1(1.6+1.2*nrm[2])}"/>`}
   // caras de la cuña: piso horizontal y dos caras verticales
   const sect=(pts)=>`M${pts.map(P2).join('L')}Z`;
   const floorP=[I([cx,cy,T+h0])];for(let a=w1;a<=w2;a+=3)floorP.push(I([...pol(NUC.c,a,Rf),T+h0]));
   const vface=a=>{const p=[I([cx,cy,T+h0])];for(let u=ua;u<=90;u+=3){const r=Rn*Math.cos(u*Math.PI/180),z=Rn*Math.sin(u*Math.PI/180);p.push(I([...pol(NUC.c,a,r),T+z]))}return p};
   const chrom=(mm,seed,rad)=>{const g=B.rng(seed);let c='';for(let i=0;i<140;i++){const a=g()*Math.PI/2,r=Math.sqrt(g())*rad*.92;if(Math.sin(a)*r<h0+3)continue;c+=`<circle cx="${f1(Math.cos(a)*r)}" cy="${f1(Math.sin(a)*r)}" r="${f1(.9+g()*2.6)}"/>`}return `<g class="c3-chr" transform="matrix(${mm})">${c}<path class="c3-nedge" d="M${f1(Rf)} ${f1(h0)}A${rad} ${rad} 0 0 1 0 ${rad}"/><path class="c3-nedge2" d="M${f1(Math.sqrt((rad-5)**2-h0*h0))} ${f1(h0)}A${rad-5} ${rad-5} 0 0 1 0 ${rad-5}"/></g>`};
   const u1=pol([0,0],w1,1),u2=pol([0,0],w2,1);
   const fA=vface(w1),fB=vface(w2);
   n+=`<path class="c3-nfloor" d="${sect(floorP)}"/>`;
   // ADN sobre el piso de la cuña
   const fm=m([cx,cy,T+h0],[cx+u1[0],cy+u1[1],T+h0],[cx+u2[0],cy+u2[1],T+h0]);
   n+=`<g transform="matrix(${fm})"><g class="c3-chr">${(()=>{const g=B.rng(41);let c='';for(let i=0;i<60;i++){const a=g()*Math.PI/2,r=Math.sqrt(g())*Rf*.9;c+=`<circle cx="${f1(Math.cos(a)*r)}" cy="${f1(Math.sin(a)*r)}" r="${f1(.9+g()*2.2)}"/>`}return c})()}</g>${B.dna(10,Rf*.95,Rf*.45,{a:5,per:17}).replace('<g class="b-dna">','<g class="b-dna" transform="rotate(38) translate(-6 -20)">')}</g>`;
   const faces=[[fA,w1,m([cx,cy,T],[cx+u1[0],cy+u1[1],T],[cx,cy,T+1]),11],[fB,w2,m([cx,cy,T],[cx+u2[0],cy+u2[1],T],[cx,cy,T+1]),13]];// la cromatina de las caras se recorta a la parte por encima de h0
   faces.sort((a,b)=>Dp([...pol(NUC.c,a[1],Rn/2),T+Rn/3])-Dp([...pol(NUC.c,b[1],Rn/2),T+Rn/3]));
   faces.forEach(([f,a,mm,sd],i)=>{n+=`<path class="c3-nface${i?' b':''}" d="${sect(f)}"/>`;const mv=mm.split(' ').map(Number);n+=chrom([mv[0],mv[1],-mv[2],-mv[3],mv[4],mv[5]].map(v=>v.toFixed(4)).join(' '),sd,Rn)});
   const nl=I([cx,cy,T+h0+Rn*.2]);n+=`<circle class="c3-nl" cx="${f1(nl[0])}" cy="${f1(nl[1])}" r="${f1(Rn*k*.2)}" fill="url(#bv-rc)"/>`;
   items.push([Dp([cx,cy,T]),n])}
  // mitocondrias cortadas (membrana externa, matriz, crestas)
  const mito=(c,ang,L,w,h)=>{const t=ang*Math.PI/180,u=[Math.cos(t)*L/2,Math.sin(t)*L/2],v=[-Math.sin(t)*w/2,Math.cos(t)*w/2];
    const el=(z,sc=1)=>{const p=[];for(let i=0;i<48;i++){const a=i/48*Math.PI*2;p.push(I([c[0]+u[0]*Math.cos(a)*sc+v[0]*Math.sin(a)*sc,c[1]+u[1]*Math.cos(a)*sc+v[1]*Math.sin(a)*sc,z]))}return `M${p.map(P2).join('L')}Z`};
    let cr='';for(let j=-5;j<=5;j++){const f=j/6.2;const a=I([c[0]+u[0]*f-v[0]*.62,c[1]+u[1]*f-v[1]*.62,T+h]),b=I([c[0]+u[0]*f+v[0]*.62,c[1]+u[1]*f+v[1]*.62,T+h]);const mx=(a[0]+b[0])/2+(j%2?3:-3),my=(a[1]+b[1])/2;cr+=`M${P2(a)}Q${f1(mx)} ${f1(my)} ${P2(b)}`}
    const sh=I([c[0],c[1],T]);
    return `<ellipse cx="${f1(sh[0])}" cy="${f1(sh[1]+4)}" rx="${f1(L*k*.55)}" ry="${f1(w*k*.5)}" fill="url(#c3-sh)"/><path class="c3-mside" d="${el(T)}"/><path class="c3-mtop" d="${el(T+h)}"/><path class="c3-mmat" d="${el(T+h,.82)}"/><path class="c3-mcr" d="${cr}"/>`};
  [[[-266,-74],-30,86,38,15],[[-250,150],26,70,32,14],[[52,222],-4,70,32,13]].forEach(a=>items.push([Dp([a[0][0],a[0][1],T]),mito(...a)]));
  // ---------- estructuras de señalización ----------
  const shadows=[];const order=[];
  Object.entries(E).forEach(([id,e])=>{const q=P3[id];if(!q)return;const v=I(q);e.x=v[0];e.y=v[1];e.p3=q;e.rot=0;
    if(RIM.has(id)){let th=Math.atan2(q[1],q[0])*180/Math.PI;const a=I(rim(th-1).concat(T)),b=I(rim(th+1).concat(T));const tx=b[0]-a[0],ty=b[1]-a[1],l=Math.hypot(tx,ty);const nx=ty/l,ny=-tx/l;e.rot=Math.atan2(nx,-ny)*180/Math.PI}
    if(!RIM.has(id)&&!ONNUC.has(id)){const out=q[2]>T+15;const g=out?I([q[0],q[1],0]):I([q[0],q[1],T]);const hgt=out?q[2]:q[2]-T;shadows.push(`<ellipse cx="${f1(g[0])}" cy="${f1(g[1])}" rx="${f1(15+hgt*.05)}" ry="${f1(6+hgt*.02)}" fill="url(#c3-sh)" style="opacity:${Math.max(.25,1-hgt/120).toFixed(2)}"/>`)}
    items.push([ONNUC.has(id)?Dp([NUC.c[0],NUC.c[1],T])+.5+Dp(q)*1e-4:Dp(q)+(RIM.has(id)?-.3:0),o.el?o.el(id,e):'']);order.push(id)});
  items.sort((a,b)=>a[0]-b[0]);
  const lab3=(q,txt,a='middle')=>{const v=I(q);return `<text class="ce-l z" x="${f1(v[0])}" y="${f1(v[1])}" text-anchor="${a}">${txt.toUpperCase()}</text>`};
  const labels=o.labels===false?'':`<g class="zl">${lab3([...rim(-100,-70),T+10],'Membrana plasmática')}${lab3([...rim(-78,-30),T+2],'Exterior')}${lab3([-150,110,T+2],'Citoplasma')}${lab3([NUC.c[0]-NUC.R*.55,NUC.c[1]+NUC.R*.1,T+NUC.R*.95],'Núcleo','end')}${lab3([...pol(NUC.c,-150,NUC.R+95),T+4],'Retículo endoplásmico','end')}${lab3([-266,-118,T+4],'Mitocondria')}</g>`;
  const svg=`<svg viewBox="0 0 ${VB[0]} ${VB[1]}" role="img" aria-label="Modelo tridimensional de una célula animal cortada, con la membrana, el núcleo, el retículo endoplásmico, las mitocondrias y las moléculas de las vías de señalización">${defs}
   <rect class="exo" x="-2000" y="-2000" width="5000" height="5000"/>
   <g class="c3-body">${s}</g><g class="c3-shadows">${shadows.join('')}</g>
   <path class="route" d=""/>
   <g class="c3-in">${items.map(x=>x[1]).join('')}</g>${labels}
   <circle class="sigp" r="9" cx="-50" cy="-50" fill="url(#bg-glow)"/><circle class="sigc" r="3.6" cx="-50" cy="-50"/></svg>`;
  const pf=o.idp||'c3';const out=pf==='c3'?svg:svg.replace(/(id="|url\(#)c3-/g,'$1'+pf+'-');
  return {svg:out,VB,P3,order};
}
X.cell3D={build,P3,VB,RIM};
X.c3CSS=`
.ed .c3-side{stroke:color-mix(in srgb,var(--e-lh) 55%,#2a2010);stroke-width:1}
.ed .c3-w0{stop-color:color-mix(in srgb,var(--e-lh) 55%,#5a4626)}.ed .c3-w1{stop-color:color-mix(in srgb,var(--e-lh) 85%,#fff)}
.ed .c3-sideln{fill:none;stroke:color-mix(in srgb,var(--e-lh) 50%,#3a2c14);stroke-width:.6;opacity:.35}
.ed .c3-cy0{stop-color:color-mix(in srgb,var(--e-cyt) 70%,#fff3e0)}.ed .c3-cy1{stop-color:color-mix(in srgb,var(--e-cyt) 82%,var(--e-rs))}.ed .c3-cy2{stop-color:color-mix(in srgb,var(--e-cyt) 70%,var(--e-rs))}
.ed .c3-cut{stroke:none}.ed .c3-texr{opacity:.28;pointer-events:none;mix-blend-mode:multiply}
.ed .c3-cs{fill:none;stroke:color-mix(in srgb,var(--e-rs) 60%,var(--e-td));stroke-width:1.3;opacity:.28;stroke-linecap:round}
.ed .c3-rb circle{fill:color-mix(in srgb,var(--e-rc) 55%,var(--e-cyt));opacity:.55}
.ed .c3-erw{fill:color-mix(in srgb,var(--e-rc) 52%,#2a1f4a);stroke:color-mix(in srgb,var(--e-rc) 60%,#000);stroke-width:.6}
.ed .c3-ert{fill:color-mix(in srgb,var(--e-rc) 38%,#fff);stroke:color-mix(in srgb,var(--e-rc) 70%,#000);stroke-width:.7}
.ed .c3-ribo{fill:color-mix(in srgb,var(--e-sg) 70%,#5a3a10)}
.ed .c3-n0{stop-color:color-mix(in srgb,var(--e-rc) 20%,#fff)}.ed .c3-n1{stop-color:color-mix(in srgb,var(--e-rc) 55%,#fff)}.ed .c3-n2{stop-color:color-mix(in srgb,var(--e-rc) 80%,#000)}
.ed .c3-ndome{stroke:color-mix(in srgb,var(--e-rc) 70%,#000);stroke-width:1.2}
.ed .c3-pore{fill:color-mix(in srgb,var(--e-rc) 65%,#120a30);opacity:.6}
.ed .c3-nfloor{fill:color-mix(in srgb,var(--e-rc) 26%,#fff);stroke:color-mix(in srgb,var(--e-rc) 60%,#000);stroke-width:.8}
.ed .c3-nface{fill:color-mix(in srgb,var(--e-rc) 42%,#fff);stroke:color-mix(in srgb,var(--e-rc) 60%,#000);stroke-width:.8}.ed .c3-nface.b{fill:color-mix(in srgb,var(--e-rc) 34%,#fff)}
.ed .c3-chr circle{fill:color-mix(in srgb,var(--e-rc) 80%,#000);opacity:.22}
.ed .c3-nedge{fill:none;stroke:color-mix(in srgb,var(--e-rc) 70%,#000);stroke-width:1.8}.ed .c3-nedge2{fill:none;stroke:color-mix(in srgb,var(--e-rc) 60%,#000);stroke-width:1;opacity:.7}
.ed .c3-nl{stroke:color-mix(in srgb,var(--e-rc) 70%,#000);stroke-width:.8}
.ed .c3-mside{fill:color-mix(in srgb,var(--e-of) 70%,#3a1408);stroke:color-mix(in srgb,var(--e-of) 60%,#000);stroke-width:.7}
.ed .c3-mtop{fill:color-mix(in srgb,var(--e-of) 70%,#fff);stroke:color-mix(in srgb,var(--e-of) 75%,#000);stroke-width:1}
.ed .c3-mmat{fill:color-mix(in srgb,var(--e-sg) 32%,#fff6ea);stroke:color-mix(in srgb,var(--e-of) 60%,#000);stroke-width:.8}
.ed .c3-mcr{fill:none;stroke:color-mix(in srgb,var(--e-of) 80%,#000);stroke-width:1.6;stroke-linecap:round;opacity:.75}
.ed .c3-rim .b-core{fill:color-mix(in srgb,var(--e-core) 85%,var(--e-lh))}
:root[data-theme="dark"] .ed .c3-texr{mix-blend-mode:screen;opacity:.12}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .ed .c3-texr{mix-blend-mode:screen;opacity:.12}}
`;
})();
