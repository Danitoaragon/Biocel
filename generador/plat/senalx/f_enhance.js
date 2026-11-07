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
  if(!document.getElementById('ed-css')){const s=document.createElement('style');s.id='ed-css';s.textContent=X.css+X.bioCSS+X.scCSS+X.escCSS+X.c3CSS+X.ideaCSS+X.commCSS+X.recCSS+X.casCSS+X.msgCSS+X.ampCSS+X.termCSS+X.cellCSS+X.sumCSS;document.head.appendChild(s)}
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
