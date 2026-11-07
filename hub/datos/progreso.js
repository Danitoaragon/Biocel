/* Cálculo del dominio a partir del registro real de respuestas (localStorage de este navegador).
   No inventa datos: si no hay suficientes respuestas, lo dice. */
(function(){
"use strict";
const KEY='bc-plataforma-v1';
const MIN_SUB=5;   // preguntas distintas necesarias para dar un % de un subtema
const MIN_TEMA=10; // preguntas distintas necesarias para dar un % de un tema
const LAST=3;      // cada pregunta cuenta por sus últimos 3 intentos
function load(){let S={seen:{},errs:{},read:{},log:{},marks:{},notes:{}};try{const r=localStorage.getItem(KEY);if(r)S=Object.assign(S,JSON.parse(r))}catch(e){}S.log=S.log||{};return S}
function qscore(e){const h=(e.h||[]).slice(-LAST);return h.length?h.reduce((a,b)=>a+b,0)/h.length:0}
function entries(ST,f){return Object.entries(ST.log||{}).filter(([id,e])=>!f||f(e,id))}
function stats(list){const n=list.length;const att=list.reduce((a,[,e])=>a+(e.n||0),0);const pct=n?Math.round(list.reduce((a,[,e])=>a+qscore(e),0)/n*100):null;return {n,att,pct}}
function subStats(ST,t,s){const r=stats(entries(ST,e=>e.t===t&&e.s===s));r.ok=r.n>=MIN_SUB;return r}
function temaStats(ST,t,subs){const r=stats(entries(ST,e=>e.t===t));r.ok=r.n>=MIN_TEMA;
  const ks=Object.keys(subs||{});r.subsTot=ks.length;r.subsCon=ks.filter(s=>entries(ST,e=>e.t===t&&e.s===s).length>0).length;
  r.subsOk=ks.filter(s=>subStats(ST,t,s).ok).length;r.subsDom=ks.filter(s=>{const x=subStats(ST,t,s);return x.ok&&x.pct>=80}).length;return r}
// subtemas con datos suficientes y menos de 70 %
function weakSubs(ST,temas,SUB){const out=[];temas.forEach(t=>Object.keys(SUB[t]||{}).forEach(s=>{const x=subStats(ST,t,s);if(x.ok&&x.pct<70)out.push({t,s,pct:x.pct,n:x.n,att:x.att})}));return out.sort((a,b)=>a.pct-b.pct)}
// conceptos: Y = preguntas distintas respondidas del concepto, X = de ésas, cuántas fallaste en tu último intento
function conceptStats(ST,temas){const G={};entries(ST,e=>e.c&&(!temas||temas.includes(e.t))).forEach(([id,e])=>{const k=e.t+'|'+e.c;const g=G[k]||(G[k]={t:e.t,s:e.s,c:e.c,y:0,x:0,att:0,bad:0,last:0});g.y++;g.att+=e.n||0;g.bad+=(e.h||[]).filter(v=>!v).length;if((e.h||[]).slice(-1)[0]===0)g.x++;g.last=Math.max(g.last,e.lastBad||0)});return Object.values(G)}
function weakConcepts(ST,temas){return conceptStats(ST,temas).filter(g=>g.x>=1&&(g.x>=3||(g.y>=2&&g.x/g.y>=.5))).sort((a,b)=>b.x-a.x||b.x/b.y-a.x/a.y)}
window.PROG={KEY,MIN_SUB,MIN_TEMA,LAST,load,qscore,subStats,temaStats,weakSubs,conceptStats,weakConcepts};
})();
