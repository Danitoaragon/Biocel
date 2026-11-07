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
(function(){
'use strict';
const css=String.raw`
/* Identidad de esta lectura: revista científica. Papel neutro, tinta azul noche, cuatro colores que
   codifican siempre la misma etapa: señal (ámbar) · receptor (violeta) · transducción (cobalto) · respuesta (verde);
   el apagado en óxido. Fraunces para títulos, Source Serif para el texto, IBM Plex Mono para rótulos de figura. */
article.book.ed{
  --e-paper:#fbfaf7;--e-ink:#141a2f;--e-mut:#5e6377;--e-rule:#dcd8ce;--e-plate:#f3f1ec;--e-plate2:#ebe8e1;
  --e-sg:#b9790f;--e-sgl:#f6e3bd;--e-rc:#5d43a6;--e-rcl:#e7e0f6;--e-td:#2346c4;--e-tdl:#dfe6fb;--e-rs:#25725a;--e-rsl:#d7ece3;--e-of:#a8442f;--e-ofl:#f5ddd5;
  --e-mem:#ead9b4;--e-memh:#c9ae74;--e-cyt:#fbfaf7;--e-nuc:#efeaf7;--e-mu:#8a8fa3;
  --e-disp:"Fraunces","Cormorant Garamond",Georgia,serif;--e-body:"Source Serif 4",Georgia,serif;--e-mono:"IBM Plex Mono",ui-monospace,Menlo,monospace;
  background:var(--e-paper);color:var(--e-ink);border:0;border-radius:0;max-width:1080px;padding:0 0 48px;font-family:var(--e-body);box-shadow:none}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) article.book.ed{
  --e-paper:#11141f;--e-ink:#e9e6dd;--e-mut:#9ca1b6;--e-rule:#2b3044;--e-plate:#171b29;--e-plate2:#1e2333;
  --e-sg:#e2a646;--e-sgl:#3d311b;--e-rc:#a892ee;--e-rcl:#2c2547;--e-td:#7f9cff;--e-tdl:#1f2a52;--e-rs:#5fc39d;--e-rsl:#173a30;--e-of:#e3846c;--e-ofl:#43241d;
  --e-mem:#4a3f29;--e-memh:#8a7446;--e-cyt:#141826;--e-nuc:#1d1a2e;--e-mu:#6f7590;color-scheme:dark}}
:root[data-theme="dark"] article.book.ed{
  --e-paper:#11141f;--e-ink:#e9e6dd;--e-mut:#9ca1b6;--e-rule:#2b3044;--e-plate:#171b29;--e-plate2:#1e2333;
  --e-sg:#e2a646;--e-sgl:#3d311b;--e-rc:#a892ee;--e-rcl:#2c2547;--e-td:#7f9cff;--e-tdl:#1f2a52;--e-rs:#5fc39d;--e-rsl:#173a30;--e-of:#e3846c;--e-ofl:#43241d;
  --e-mem:#4a3f29;--e-memh:#8a7446;--e-cyt:#141826;--e-nuc:#1d1a2e;--e-mu:#6f7590;color-scheme:dark}
@media (min-width:901px){.reader.ed-r{grid-template-columns:190px minmax(0,1fr)}}
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
  if(!document.getElementById('ed-css')){const s=document.createElement('style');s.id='ed-css';s.textContent=X.css+X.ideaCSS+X.commCSS+X.recCSS+X.casCSS+X.msgCSS+X.ampCSS+X.termCSS+X.cellCSS+X.sumCSS;document.head.appendChild(s)}
  art.classList.add('ed');const rd=art.closest('.reader');if(rd)rd.classList.add('ed-r');
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
