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
