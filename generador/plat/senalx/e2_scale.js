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
      <defs><radialGradient id="sc-vg" r=".75"><stop class="a" offset=".4" stop-color="#fff"/><stop class="b" offset=".62" stop-color="#000"/></radialGradient><mask id="sc-mk" maskContentUnits="userSpaceOnUse"><rect width="${W}" height="${H}" fill="url(#sc-vg)"/></mask></defs><g data-l="0"></g><g data-l="1"></g><g data-l="2"></g><g data-l="3"></g></svg>
</div><div class="sc-zoom"><button type="button" data-z="-1" aria-label="Alejar">−</button><span class="sc-lv" aria-hidden="true"></span><button type="button" data-z="1" aria-label="Acercar">+</button><span class="sc-tip">Toca la zona resaltada o pellizca para acercarte</span></div>
    <div class="sc-sig" hidden><span class="lbl">Elige una señal</span>${Object.entries(SIG).map(([k,s])=>`<button type="button" data-s="${k}"><b>${s.n}</b> <i>${s.t}</i></button>`).join('')}</div>
    <div class="sc-mech" hidden></div>
    <div class="sc-qa" aria-live="polite"><p class="q"></p><p class="a"></p></div></div></div>`;
  return X.frame('esc',n,'De la célula a la molécula: ¿dónde se recibe la señal?',body,'Acércate escala por escala con los números, los botones + y −, pellizcando en una pantalla táctil o tocando la zona resaltada. Cada escala responde una pregunta. Esquema propio, no a escala; las moléculas se dibujan con su forma simplificada.',['A','L']);
}
function wireScale(fig){
  const svg=fig.querySelector('svg'),vg=[...fig.querySelectorAll('#sc-vg stop')],plate=fig.querySelector('.sc-plate'),L=[...svg.querySelectorAll('[data-l]')];
  const qa=fig.querySelector('.sc-qa'),sigBox=fig.querySelector('.sc-sig'),mech=fig.querySelector('.sc-mech'),lvl=fig.querySelector('.sc-lv');
  // escalas 1-2: el mismo modelo isométrico de la célula; la 2 es un acercamiento (misma orientación) a la membrana
  {const E=X.cellDefs();const mk=(pf,lab)=>X.cell3D.build(E,{idp:pf,labels:lab,el:(id,e)=>`<g class="ce3" data-id="${id}"${e.rot?` transform="rotate(${e.rot.toFixed(1)} ${e.x.toFixed(1)} ${e.y.toFixed(1)})"`:''}>${e.g(e.x,e.y)}</g>`}).svg;
    const s0=Math.min(W/1000,H/700),ox=(W-1000*s0)/2,oy=(H-700*s0)/2;const g=E.gsr;
    L[0].innerHTML=`<rect class="b-exo" width="${W}" height="${H}"/>`+mk('e0',true).replace('<svg ',`<svg x="${f1(ox)}" y="${f1(oy)}" width="${f1(1000*s0)}" height="${f1(700*s0)}" `)+`<g class="sc-foc" data-go="1" role="button" tabindex="0" aria-label="Acercarse a la membrana"><circle cx="${f1(ox+g.x*s0)}" cy="${f1(oy+g.y*s0)}" r="26"/><text class="b-tag halo" x="${f1(ox+g.x*s0)}" y="${f1(oy+g.y*s0-34)}" text-anchor="middle">membrana plasmática</text></g>`;
    FOC[0]=[ox+g.x*s0,oy+g.y*s0];
    const z1=F*s0/(W/1000),vw=1000/z1,vh=vw*H/W;
    L[1].innerHTML=`<rect class="b-exo" width="${W}" height="${H}"/>`+mk('e1',false).replace(/<svg viewBox="[^"]*"/,`<svg x="0" y="0" width="${W}" height="${H}" viewBox="${f1(g.x-vw/2)} ${f1(g.y-vh/2)} ${f1(vw)} ${f1(vh)}"`)+`<g class="sc-foc" data-go="2" role="button" tabindex="0" aria-label="Acercarse a la bicapa y al receptor"><circle cx="${W/2}" cy="${H/2}" r="60"/><text class="b-tag halo" x="${W/2}" y="${H/2-70}" text-anchor="middle">receptor en la bicapa</text></g>`;
    FOC[1]=[W/2,H/2]}
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
.ed #ex-esc [data-l="0"] .ce-l:not(.z){display:none}.ed #ex-esc .ce-l{font:600 11px var(--e-mono);fill:#141a2f;pointer-events:none}.ed #ex-esc .ce-l.z{font:500 12px var(--e-mono);letter-spacing:.16em;fill:var(--e-mut)}.ed #ex-esc [data-l="1"] .ce-l{font-size:9px}.ed #ex-esc [data-l="1"] .ce-l.lod{display:none}
.ed #ex-esc .route,.ed #ex-esc .sigp,.ed #ex-esc .sigc{display:none}.ed #ex-esc .exo{fill:var(--e-exo)}
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
