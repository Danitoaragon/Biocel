// Genera publicar/senalizacion.html: la lectura de Señalización como página independiente
// (texto completo del capítulo + figuras interactivas de senal-exp.js), lista para compartir por enlace.
// Uso: npm run build && node scripts/publicar-senal.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ctx = { window: {} };
vm.runInNewContext(readFileSync(join(ROOT, 'hub/datos/libro.js'), 'utf8'), ctx);
const L = ctx.window.LIBRO.senal;
const sx = readFileSync(join(ROOT, 'hub/datos/senal-exp.js'), 'utf8');
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const N = L.secciones.length;

const secs = L.secciones.map((s, k) => {
  let h = 0;
  const body = s.html
    .replace(/<button class="replay"[^>]*>[^<]*<\/button>/g, '')
    .replace(/<table class="cmp">/g, '<div class="tw"><table class="cmp">').replace(/<\/table>/g, '</table></div>')
    .replace(/<h3>/g, () => `<h3 id="s${k}h${h++}">`);
  return `<section class="bsec" id="s${k}" data-k="${k}"><div class="pk">Parte ${k + 1} de ${N}</div><h2>${esc(s.titulo)}</h2>${body}</section>`;
}).join('\n');
const toc = '<ol>' + L.secciones.map((s, i) => `<li data-k="${i}"><a href="#s${i}" data-s="${i}">${esc(s.titulo)}</a>${s.subs.length ? '<ul>' + s.subs.map((x, j) => `<li><a href="#s${i}h${j}" data-s="${i}" data-h="${j}">${x}</a></li>`).join('') + '</ul>' : ''}</li>`).join('') + '</ol>';

const css = `
:root{--bg:#f4f0e6;--card:#fffdf8;--ink:#141a2f;--mut:#5e6377;--line:#e2dccf;--acc:#2346c4;--bfs:18.5px}
:root[data-theme="dark"]{--bg:#0d1020;--card:#151a2c;--ink:#e9e6dd;--mut:#9ca1b6;--line:#2b3044;--acc:#7f9cff;color-scheme:dark}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#0d1020;--card:#151a2c;--ink:#e9e6dd;--mut:#9ca1b6;--line:#2b3044;--acc:#7f9cff;color-scheme:dark}}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:400 16px/1.6 "DM Sans",system-ui,sans-serif}
.top{position:sticky;top:0;z-index:30;background:#1c3fd1;color:#f6f1e3;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px clamp(12px,3vw,28px);box-shadow:0 2px 10px rgba(20,30,80,.18)}
.top b{font:italic 600 24px/1 "Cormorant Garamond",Georgia,serif}.top span{font-size:13px;opacity:.85}
.top button{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.3);color:#fff;border-radius:10px;padding:7px 11px;font:600 14px "DM Sans",sans-serif;cursor:pointer}
main{max-width:1320px;margin:0 auto;padding:16px clamp(10px,2.5vw,26px) 60px}
.reader{display:grid;grid-template-columns:205px minmax(0,1fr);gap:26px;align-items:start}.reader>*{min-width:0}
.reader.noside{grid-template-columns:minmax(0,1fr)}.reader.noside>.toc{display:none}.reader.noside article.book{margin:0 auto}
.toc{position:sticky;top:76px;max-height:calc(100vh - 96px);overflow:auto;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:10px 10px 10px 6px}
.toc h4{margin:0 0 6px 8px;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--mut)}
.toc ol{margin:0;padding-left:24px}.toc li{margin:2px 0;font-size:13px;line-height:1.35}.toc a{text-decoration:none;color:var(--ink)}.toc a.on{color:var(--acc);font-weight:700}
.toc ul{margin:2px 0 6px;padding-left:12px;list-style:none}.toc ul li{font-size:11.5px}.toc ul a{color:var(--mut)}.toc li ul{display:none}.toc li.act>ul{display:block}
.toc-x,.toc-bk{display:none}
.readbar{position:sticky;top:52px;z-index:20;background:color-mix(in srgb,var(--bg) 92%,transparent);backdrop-filter:blur(4px);border-bottom:1px solid var(--line);padding:8px 4px;margin:-6px 0 14px;font-size:14px;color:var(--mut);display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px}
.readbar b{color:var(--acc)}.rtools{display:flex;gap:6px;flex-wrap:wrap}
.rtools button{background:var(--card);border:1px solid var(--line);color:var(--acc);border-radius:9px;padding:6px 10px;font:700 13px "DM Sans",sans-serif;cursor:pointer}.rtools button.on{background:color-mix(in srgb,var(--acc) 12%,var(--card))}
article.book{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:clamp(20px,4vw,48px);font-family:"Source Serif 4",Georgia,serif;font-size:var(--bfs);line-height:1.75;max-width:900px}
article.book h3{scroll-margin-top:120px}
.box.examen .btn,.box.quiz .row{display:none}.vizhost:empty{display:none!important}
figure.fig svg{max-width:100%;height:auto}figure.fig *{opacity:1!important}
.secnav{display:flex;justify-content:center;padding-top:10px}.secnav button{background:none;border:1px solid var(--line);border-radius:10px;padding:9px 14px;color:var(--acc);font:600 14px "DM Sans",sans-serif;cursor:pointer}
.nota{max-width:900px;margin:18px auto 0;font-size:13px;color:var(--mut);text-align:center}
@media (max-width:900px){.reader{grid-template-columns:minmax(0,1fr)}.toc{display:none}
 .reader.drawer>.toc{display:block;position:fixed;z-index:60;left:0;top:0;bottom:0;width:min(330px,86vw);max-height:none;border-radius:0 14px 14px 0;padding:18px 14px 24px 8px;box-shadow:0 10px 40px rgba(0,0,0,.28);overscroll-behavior:contain}
 .reader.drawer>.toc li{font-size:15px;margin:6px 0}.reader.drawer>.toc ul li{font-size:13.5px}
 .reader.drawer>.toc .toc-x{display:block;margin:0 0 10px auto;background:var(--bg);border:1px solid var(--line);color:var(--ink);border-radius:999px;padding:8px 14px;font:600 13px "DM Sans",sans-serif;cursor:pointer}
 .reader.drawer>.toc-bk{display:block;position:fixed;inset:0;z-index:59;background:rgba(10,14,30,.38)}body.toc-lock{overflow:hidden}article.book{font-size:17.5px}.top span{display:none}}
`;
const js = `
(function(){
var art=document.querySelector('article.book'),rd=document.querySelector('.reader'),toc=document.querySelector('aside.toc'),bt=document.getElementById('rt-side');
var RP={side:true,fs:18.5};try{Object.assign(RP,JSON.parse(localStorage.getItem('bc-senal-pub')||'{}'))}catch(e){}
var sv=function(){try{localStorage.setItem('bc-senal-pub',JSON.stringify(RP))}catch(e){}};
var mob=function(){return innerWidth<=900};
function sync(){var o=mob()?rd.classList.contains('drawer'):!rd.classList.contains('noside');bt.setAttribute('aria-expanded',String(o));bt.classList.toggle('on',o)}
function apply(){rd.classList.toggle('noside',!RP.side&&!mob());if(!mob()){rd.classList.remove('drawer');document.body.classList.remove('toc-lock')}document.documentElement.style.setProperty('--bfs',RP.fs+'px');sync()}
function shut(){rd.classList.remove('drawer');document.body.classList.remove('toc-lock');sync()}
bt.onclick=function(){if(mob()){var o=!rd.classList.contains('drawer');rd.classList.toggle('drawer',o);document.body.classList.toggle('toc-lock',o);sync();return}RP.side=!RP.side;sv();apply()};
document.querySelector('.toc-x').onclick=function(){shut();bt.focus()};document.querySelector('.toc-bk').onclick=shut;
addEventListener('keydown',function(e){if(e.key==='Escape'&&rd.classList.contains('drawer'))shut()});
var rt=0;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(apply,120)});
document.getElementById('rt-m').onclick=function(){RP.fs=Math.max(15,RP.fs-1);sv();apply()};document.getElementById('rt-p').onclick=function(){RP.fs=Math.min(24,RP.fs+1);sv();apply()};
var th=document.getElementById('thm');th.onclick=function(){var d=document.documentElement,cur=d.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');d.dataset.theme=cur==='dark'?'light':'dark';try{localStorage.setItem('bc-senal-theme',d.dataset.theme)}catch(e){}};
try{var t=localStorage.getItem('bc-senal-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}
var hh=function(){return document.querySelector('.top').offsetHeight};
document.querySelector('.readbar').style.top=hh()+'px';
function jump(id){var el=document.getElementById(id);if(el)scrollTo({top:el.getBoundingClientRect().top+scrollY-hh()-50,behavior:'smooth'})}
toc.querySelectorAll('[data-s]').forEach(function(a){a.onclick=function(e){e.preventDefault();jump(a.dataset.h!=null?'s'+a.dataset.s+'h'+a.dataset.h:'s'+a.dataset.s);if(mob())shut()}});
document.getElementById('top').onclick=function(){scrollTo({top:0,behavior:'smooth'})};
var secs=[].slice.call(document.querySelectorAll('.bsec')),last=-1,T=${JSON.stringify(L.secciones.map((s) => s.titulo))};
function upd(){var k=0;secs.forEach(function(el,j){if(el.getBoundingClientRect().top<hh()+140)k=j});if(k!==last){last=k;toc.querySelectorAll('li[data-k]').forEach(function(li){var on=+li.dataset.k===k;li.classList.toggle('act',on);li.querySelector('a').classList.toggle('on',on)});document.getElementById('rb-p').textContent='Parte '+(k+1)+' de '+secs.length+' · '+T[k]}}
addEventListener('scroll',upd,{passive:true});apply();upd();
try{window.SENALX.enhance(art,{t:'senal'})}catch(e){console.error(e)}
})();`;

const html = `<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Señalización y comunicación celular · Biología Celular</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,600&family=DM+Sans:wght@400;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,650;1,8..60,400&display=swap">
<style>${css}</style></head>
<body><header class="top"><b>Biología Celular</b><span>Medicina · Lectura 5</span><button id="thm" type="button" aria-label="Cambiar modo claro u oscuro">Modo claro / oscuro</button></header>
<main><div class="reader"><aside class="toc" id="toc-lat"><button type="button" class="toc-x" aria-label="Cerrar el índice">✕ Cerrar</button><h4>${esc(L.titulo)}</h4>${toc}</aside>
<div><div class="readbar"><span><b>${esc(L.titulo)}</b> · <span id="rb-p"></span></span><span class="rtools"><button id="rt-side" type="button" aria-controls="toc-lat">☰ Índice</button><button id="rt-m" type="button" aria-label="Letra más pequeña">A−</button><button id="rt-p" type="button" aria-label="Letra más grande">A+</button></span></div>
<article class="book"><div class="crumb">Capítulo · Biología Celular</div><h1 class="ct">${esc(L.titulo)}</h1>
${secs}
<div class="secnav"><button type="button" id="top">↑ Volver al inicio del capítulo</button></div></article>
<p class="nota">Versión de lectura para compartir. El banco de preguntas, el simulador y el progreso están en la plataforma completa.</p></div><div class="toc-bk" aria-hidden="true"></div></div></main>
<script>${sx}</script><script>${js}</script></body></html>`;
mkdirSync(join(ROOT, 'publicar'), { recursive: true });
writeFileSync(join(ROOT, 'publicar/senalizacion.html'), html);
console.log('publicar/senalizacion.html · ' + Math.round(html.length / 1024) + ' KB');
