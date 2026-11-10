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
const bctx = { window: {} };
vm.runInNewContext(readFileSync(join(ROOT, 'hub/datos/banco.js'), 'utf8'), bctx);
const Q = bctx.window.BANCO.filter((q) => q.tema === 'senal').map(({ id, sub, tipo, dif, q, exp, opts, why, items, pairs, ans, corr, con }) => ({ id, sub, tipo, dif, q, exp, opts, why, items, pairs, ans, corr, con }));
const SUBT = bctx.window.SUBTEMAS.senal;
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
.box.examen .btn{display:none}.box .gopr{display:inline-block;margin-top:10px;color:var(--acc);font:700 14px "DM Sans",sans-serif}.vizhost:empty{display:none!important}
figure.fig svg{max-width:100%;height:auto}figure.fig *{opacity:1!important}
.secnav{display:flex;justify-content:center;padding-top:10px}.secnav button{background:none;border:1px solid var(--line);border-radius:10px;padding:9px 14px;color:var(--acc);font:600 14px "DM Sans",sans-serif;cursor:pointer}
.nota{max-width:900px;margin:18px auto 0;font-size:13px;color:var(--mut);text-align:center}
.tabs{display:flex;gap:6px}.tabs a{color:#fff;text-decoration:none;font:600 14px "DM Sans",sans-serif;padding:7px 12px;border-radius:10px;opacity:.85}.tabs a.on{background:rgba(255,255,255,.18);opacity:1}
.view[hidden]{display:none!important}
body.lect-fs .top{display:none}body.lect-fs .readbar{top:0!important}body.lect-fs .toc{top:58px}
.pr{max-width:820px;margin:0 auto;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:clamp(18px,4vw,40px)}
.pr h1{font:italic 600 clamp(34px,5vw,48px)/1.05 "Cormorant Garamond",Georgia,serif;margin:0 0 6px}.pr .lead{color:var(--mut);margin:0 0 18px}
.pr fieldset{border:0;padding:0;margin:0 0 16px}.pr legend{font:700 12px "DM Sans",sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--mut);margin-bottom:8px}
.chips{display:flex;flex-wrap:wrap;gap:8px}.chip{background:var(--bg);border:1px solid var(--line);border-radius:999px;padding:8px 14px;font:600 14px "DM Sans",sans-serif;color:var(--ink);cursor:pointer;min-height:40px}.chip.on{background:var(--acc);border-color:var(--acc);color:#fff}
.btn{background:var(--acc);color:#fff;border:0;border-radius:12px;padding:12px 18px;font:700 15px "DM Sans",sans-serif;cursor:pointer;min-height:44px}.btn.sec{background:var(--bg);color:var(--acc);border:1px solid var(--line)}.btn:disabled{opacity:.5;cursor:default}
.row{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}
.qbar{height:6px;background:var(--line);border-radius:6px;overflow:hidden;margin:0 0 16px}.qbar i{display:block;height:100%;background:var(--acc);transition:width .3s}
.qmeta{font:600 12px "DM Sans",sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--mut);margin-bottom:8px}
.qtext{font:400 21px/1.45 "Source Serif 4",Georgia,serif;margin:0 0 16px}
.opt{display:block;width:100%;text-align:left;background:var(--bg);border:1.5px solid var(--line);border-radius:12px;padding:12px 14px;margin:0 0 8px;font:400 17px/1.4 "Source Serif 4",Georgia,serif;color:var(--ink);cursor:pointer}
.opt:hover:not(:disabled){border-color:var(--acc)}.opt.ok{border-color:#25725a;background:color-mix(in srgb,#25725a 12%,var(--card))}.opt.bad{border-color:#a8442f;background:color-mix(in srgb,#a8442f 12%,var(--card))}.opt:disabled{cursor:default}
.opt small{display:block;font:400 14px/1.4 "DM Sans",sans-serif;color:var(--mut);margin-top:4px}
.fb{border-radius:12px;padding:12px 14px;margin:12px 0 0;font-size:15.5px;line-height:1.55}.fb.ok{background:color-mix(in srgb,#25725a 14%,var(--card))}.fb.bad{background:color-mix(in srgb,#a8442f 12%,var(--card))}.fb b{display:block;margin-bottom:2px}
.fill input{width:100%;max-width:420px;padding:12px 14px;border:1.5px solid var(--line);border-radius:12px;font:400 17px "Source Serif 4",Georgia,serif;background:var(--bg);color:var(--ink)}
.mt{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);gap:8px 12px;align-items:center}.mt select{width:100%;padding:10px;border-radius:10px;border:1.5px solid var(--line);background:var(--bg);color:var(--ink);font:400 15px "DM Sans",sans-serif}.mt .l{font:600 15.5px "DM Sans",sans-serif}
.mt select.ok{border-color:#25725a}.mt select.bad{border-color:#a8442f}
@media (max-width:600px){.mt{grid-template-columns:1fr}.mt .l{margin-top:6px}}
.ord{list-style:none;padding:0;margin:0}.ord li{display:flex;align-items:center;gap:8px;background:var(--bg);border:1.5px solid var(--line);border-radius:12px;padding:8px 10px;margin:0 0 6px;font:400 16px/1.35 "Source Serif 4",Georgia,serif}.ord li span{flex:1}
.ord button{border:1px solid var(--line);background:var(--card);border-radius:8px;width:36px;height:36px;cursor:pointer;color:var(--acc);font-size:16px}.ord li.ok{border-color:#25725a}.ord li.bad{border-color:#a8442f}
.score{font:italic 600 54px/1 "Cormorant Garamond",Georgia,serif;color:var(--acc);margin:6px 0}
.miss{list-style:none;padding:0}.miss li{border-top:1px solid var(--line);padding:10px 0;font-size:15px}.miss li b{display:block;font:400 16px "Source Serif 4",Georgia,serif}
@media (max-width:700px){.tabs a{padding:6px 8px;font-size:13px}.top b{font-size:20px}}
@media (max-width:900px){.reader{grid-template-columns:minmax(0,1fr)}.toc{display:none}
 .reader.drawer>.toc{display:block;position:fixed;z-index:60;left:0;top:0;bottom:0;width:min(330px,86vw);max-height:none;border-radius:0 14px 14px 0;padding:18px 14px 24px 8px;box-shadow:0 10px 40px rgba(0,0,0,.28);overscroll-behavior:contain}
 .reader.drawer>.toc li{font-size:15px;margin:6px 0}.reader.drawer>.toc ul li{font-size:13.5px}
 .reader.drawer>.toc .toc-x{display:block;margin:0 0 10px auto;background:var(--bg);border:1px solid var(--line);color:var(--ink);border-radius:999px;padding:8px 14px;font:600 13px "DM Sans",sans-serif;cursor:pointer}
 .reader.drawer>.toc-bk{display:block;position:fixed;inset:0;z-index:59;background:rgba(10,14,30,.38)}body.toc-lock{overflow:hidden}article.book{font-size:17.5px}.top span{display:none}}
@media (max-width:520px){#thm{display:none}}
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
var hh=function(){var t=document.querySelector('.top');return document.body.classList.contains('lect-fs')?0:t.offsetHeight};
document.querySelector('.readbar').style.top=hh()+'px';
function jump(id){var el=document.getElementById(id);if(el)scrollTo({top:el.getBoundingClientRect().top+scrollY-hh()-50,behavior:'smooth'})}
toc.querySelectorAll('[data-s]').forEach(function(a){a.onclick=function(e){e.preventDefault();jump(a.dataset.h!=null?'s'+a.dataset.s+'h'+a.dataset.h:'s'+a.dataset.s);if(mob())shut()}});
document.getElementById('top').onclick=function(){scrollTo({top:0,behavior:'smooth'})};
var secs=[].slice.call(document.querySelectorAll('.bsec')),last=-1,T=${JSON.stringify(L.secciones.map((s) => s.titulo))};
function upd(){var k=0;secs.forEach(function(el,j){if(el.getBoundingClientRect().top<hh()+140)k=j});if(k!==last){last=k;toc.querySelectorAll('li[data-k]').forEach(function(li){var on=+li.dataset.k===k;li.classList.toggle('act',on);li.querySelector('a').classList.toggle('on',on)});document.getElementById('rb-p').textContent='Parte '+(k+1)+' de '+secs.length+' · '+T[k]}}
addEventListener('scroll',upd,{passive:true});apply();upd();
try{window.SENALX.enhance(art,{t:'senal'})}catch(e){console.error(e)}
// ---- pantalla completa ----
var fb=document.getElementById('rt-fs'),api=!!(document.documentElement.requestFullscreen||document.documentElement.webkitRequestFullscreen);
function fsSet(v){document.body.classList.toggle('lect-fs',v);fb.setAttribute('aria-pressed',String(v));fb.textContent=v?'✕ Salir':'⛶ Pantalla completa';document.querySelector('.readbar').style.top=(v?0:hh())+'px'}
fb.onclick=function(){var cur=document.fullscreenElement||document.webkitFullscreenElement;if(document.body.classList.contains('lect-fs')){if(cur)(document.exitFullscreen||document.webkitExitFullscreen).call(document);fsSet(false);return}fsSet(true);if(api){try{var el=document.documentElement,r=(el.requestFullscreen||el.webkitRequestFullscreen).call(el);if(r&&r.catch)r.catch(function(){})}catch(e){}}};
['fullscreenchange','webkitfullscreenchange'].forEach(function(ev){document.addEventListener(ev,function(){if(!(document.fullscreenElement||document.webkitFullscreenElement)&&document.body.classList.contains('lect-fs'))fsSet(false)})});
addEventListener('keydown',function(e){if(e.key==='Escape'&&document.body.classList.contains('lect-fs'))fsSet(false)});
// ---- vistas ----
function view(){var v=location.hash==='#practicar'?'practicar':'lectura';document.getElementById('v-lectura').hidden=v!=='lectura';document.getElementById('v-practicar').hidden=v!=='practicar';document.querySelectorAll('.tabs a').forEach(function(a){a.classList.toggle('on',a.dataset.v===v)});if(v==='practicar'){if(document.body.classList.contains('lect-fs'))fb.onclick();PR.home()}}
addEventListener('hashchange',function(){if(location.hash==='#lectura'||location.hash==='#practicar'||location.hash===''){view();scrollTo(0,0)}});
art.querySelectorAll('.box.examen,.box.quiz').forEach(function(b){var a=document.createElement('a');a.href='#practicar';a.className='gopr';a.textContent=b.classList.contains('quiz')?'Practicar con las preguntas del tema →':'Practicar este tema →';if(b.dataset.sub)a.onclick=function(){PR.pref=b.dataset.sub==='intracel'?'intracel':b.dataset.sub};b.appendChild(a)});
// ---- práctica ----
var Q=${JSON.stringify(Q)},SUB=${JSON.stringify(SUBT)};
var PR=(function(){var root=document.getElementById('pr'),st={},KEY='bc-senal-err';
 var E=function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
 var shuf=function(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a};
 var norm=function(s){return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim()};
 var errs=function(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return []}},saveErr=function(a){try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}};
 var cfg={sub:'',n:10,tipo:'all'};
 function home(){if(api.pref){cfg.sub=api.pref;api.pref=null}var er=errs();
  root.innerHTML='<h1>Practicar · Señalización</h1><p class="lead">'+Q.length+' preguntas del tema con respuesta y explicación inmediatas: opción múltiple, verdadero o falso, completar, relacionar y ordenar.</p>'+
  '<fieldset><legend>Subtema</legend><div class="chips" id="cs">'+[['','Todos']].concat(Object.entries(SUB)).map(function(x){return '<button type="button" class="chip'+(cfg.sub===x[0]?' on':'')+'" data-v="'+x[0]+'">'+E(x[1])+'</button>'}).join('')+'</div></fieldset>'+
  '<fieldset><legend>Número de preguntas</legend><div class="chips" id="cn">'+[10,20,'Todas'].map(function(n){return '<button type="button" class="chip'+(String(cfg.n)===String(n)?' on':'')+'" data-v="'+n+'">'+n+'</button>'}).join('')+'</div></fieldset>'+
  '<div class="row"><button class="btn" id="go" type="button">Comenzar</button>'+(er.length?'<button class="btn sec" id="ge" type="button">Repasar mis errores ('+er.length+')</button>':'')+'<a class="btn sec" href="#lectura" style="text-decoration:none">Volver a la lectura</a></div>';
  [['cs','sub'],['cn','n']].forEach(function(p){root.querySelectorAll('#'+p[0]+' .chip').forEach(function(b){b.onclick=function(){cfg[p[1]]=b.dataset.v;root.querySelectorAll('#'+p[0]+' .chip').forEach(function(x){x.classList.toggle('on',x===b)})}})});
  root.querySelector('#go').onclick=function(){var P=Q.filter(function(q){return !cfg.sub||q.sub===cfg.sub});P=shuf(P);if(cfg.n!=='Todas')P=P.slice(0,+cfg.n);start(P)};
  var ge=root.querySelector('#ge');if(ge)ge.onclick=function(){var ids=errs();start(shuf(Q.filter(function(q){return ids.indexOf(q.id)>=0})))}}
 function start(P){st={P:P,i:0,ok:0,miss:[]};show()}
 function show(){var q=st.P[st.i],n=st.P.length;
  var head='<div class="qbar"><i style="width:'+(st.i/n*100)+'%"></i></div><div class="qmeta">Pregunta '+(st.i+1)+' de '+n+' · '+E(SUB[q.sub]||'')+' · '+['','Básica','Intermedia','Avanzada'][q.dif||1]+'</div><p class="qtext">'+E(q.q)+'</p>';
  var body='';
  if(q.tipo==='mc'){st.ord=shuf(q.opts.map(function(o,i){return i}));body=st.ord.map(function(i){return '<button type="button" class="opt" data-i="'+i+'">'+E(q.opts[i])+'</button>'}).join('')}
  else if(q.tipo==='tf'){body='<button type="button" class="opt" data-v="1">Verdadero</button><button type="button" class="opt" data-v="0">Falso</button>'}
  else if(q.tipo==='fill'){body='<div class="fill"><input type="text" id="fi" autocomplete="off" placeholder="Escribe tu respuesta"></div><div class="row"><button class="btn" type="button" id="ck">Comprobar</button></div>'}
  else if(q.tipo==='match'){var R=shuf(q.pairs.map(function(p){return p[1]}));body='<div class="mt">'+q.pairs.map(function(p,i){return '<div class="l">'+E(p[0])+'</div><select data-i="'+i+'" aria-label="'+E(p[0])+'"><option value="">Elige…</option>'+R.map(function(r){return '<option>'+E(r)+'</option>'}).join('')+'</select>'}).join('')+'</div><div class="row"><button class="btn" type="button" id="ck">Comprobar</button></div>'}
  else if(q.tipo==='order'){st.cur=shuf(q.items);if(st.cur.join()===q.items.join())st.cur.reverse();body='<ol class="ord" id="od"></ol><div class="row"><button class="btn" type="button" id="ck">Comprobar</button></div>'}
  root.innerHTML=head+body+'<div id="fbk"></div>';
  if(q.tipo==='order')drawOrd();
  root.querySelectorAll('.opt').forEach(function(b){b.onclick=function(){if(q.tipo==='mc'){var i=+b.dataset.i,ok=i===0;root.querySelectorAll('.opt').forEach(function(x){x.disabled=true;var j=+x.dataset.i;if(j===0)x.classList.add('ok');if(x===b&&!ok)x.classList.add('bad');if(q.why&&q.why[j]&&(j===0||x===b))x.insertAdjacentHTML('beforeend','<small>'+E(q.why[j])+'</small>')});done(ok)}
   else{var v=b.dataset.v==='1',ok=v===q.ans;root.querySelectorAll('.opt').forEach(function(x){x.disabled=true;if((x.dataset.v==='1')===q.ans)x.classList.add('ok');else if(x===b)x.classList.add('bad')});done(ok,!q.ans&&q.corr?q.corr:'')}}});
  var ck=root.querySelector('#ck');if(ck)ck.onclick=function(){var ok;
   if(q.tipo==='fill'){var v=norm(root.querySelector('#fi').value);if(!v)return;ok=q.ans.some(function(a){return norm(a)===v});root.querySelector('#fi').disabled=true;done(ok,ok?'':'Respuesta: '+q.ans[0])}
   else if(q.tipo==='match'){var ss=[].slice.call(root.querySelectorAll('.mt select'));if(ss.some(function(x){return !x.value}))return;ok=true;ss.forEach(function(x){var g=x.value===q.pairs[+x.dataset.i][1];x.classList.add(g?'ok':'bad');x.disabled=true;if(!g){ok=false;x.insertAdjacentHTML('afterend','')}});done(ok,ok?'':'Correcto: '+q.pairs.map(function(p){return p[0]+' → '+p[1]}).join(' · '))}
   else if(q.tipo==='order'){ok=st.cur.join('|')===q.items.join('|');root.querySelectorAll('#od li').forEach(function(li,i){li.classList.add(st.cur[i]===q.items[i]?'ok':'bad');li.querySelectorAll('button').forEach(function(b){b.disabled=true})});done(ok,ok?'':'Orden correcto: '+q.items.map(function(x,i){return (i+1)+'. '+x}).join(' · '))}
   ck.disabled=true};
  var fi=root.querySelector('#fi');if(fi){fi.focus();fi.onkeydown=function(e){if(e.key==='Enter')ck.click()}}}
 function drawOrd(){var od=root.querySelector('#od');od.innerHTML=st.cur.map(function(x,i){return '<li><span>'+E(x)+'</span><button type="button" data-u="'+i+'" aria-label="Subir">↑</button><button type="button" data-d="'+i+'" aria-label="Bajar">↓</button></li>'}).join('');
  od.querySelectorAll('[data-u]').forEach(function(b){b.onclick=function(){var i=+b.dataset.u;if(i>0){var t=st.cur[i];st.cur[i]=st.cur[i-1];st.cur[i-1]=t;drawOrd()}}});
  od.querySelectorAll('[data-d]').forEach(function(b){b.onclick=function(){var i=+b.dataset.d;if(i<st.cur.length-1){var t=st.cur[i];st.cur[i]=st.cur[i+1];st.cur[i+1]=t;drawOrd()}}})}
 function done(ok,extra){var q=st.P[st.i];var er=errs();if(ok){st.ok++;er=er.filter(function(x){return x!==q.id})}else{st.miss.push(q);if(er.indexOf(q.id)<0)er.push(q.id)}saveErr(er);
  var last=st.i>=st.P.length-1;root.querySelector('#fbk').innerHTML='<div class="fb '+(ok?'ok':'bad')+'"><b>'+(ok?'Correcto':'Incorrecto')+'</b>'+(extra?E(extra)+'<br>':'')+E(q.exp||'')+(q.con?' <i>('+E(q.con)+')</i>':'')+'</div><div class="row"><button class="btn" type="button" id="nx">'+(last?'Ver resultado':'Siguiente')+'</button></div>';
  var nx=root.querySelector('#nx');nx.focus({preventScroll:true});nx.onclick=function(){if(last)end();else{st.i++;show();scrollTo({top:0})}}}
 function end(){var n=st.P.length;root.innerHTML='<h1>Resultado</h1><p class="score">'+st.ok+' / '+n+'</p><p class="lead">'+(st.miss.length?'Las preguntas que fallaste quedan guardadas en «Repasar mis errores» (en este navegador).':'¡Todas correctas!')+'</p>'+(st.miss.length?'<ul class="miss">'+st.miss.map(function(q){return '<li><b>'+E(q.q)+'</b>'+E(q.exp||'')+'</li>'}).join('')+'</ul>':'')+'<div class="row"><button class="btn" type="button" id="again">Practicar de nuevo</button><a class="btn sec" href="#lectura" style="text-decoration:none">Volver a la lectura</a></div>';root.querySelector('#again').onclick=home}
 var api={home:home,pref:null};return api})();
view();
})();`;

const html = `<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Señalización y comunicación celular · Biología Celular</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,600&family=DM+Sans:wght@400;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,650;1,8..60,400&display=swap">
<style>${css}</style></head>
<body><header class="top"><b>Biología Celular</b><nav class="tabs" aria-label="Secciones"><a href="#lectura" data-v="lectura">Lectura</a><a href="#practicar" data-v="practicar">Practicar</a></nav><button id="thm" type="button" aria-label="Cambiar modo claro u oscuro">Claro / oscuro</button></header>
<main><div class="view" id="v-lectura"><div class="reader"><aside class="toc" id="toc-lat"><button type="button" class="toc-x" aria-label="Cerrar el índice">✕ Cerrar</button><h4>${esc(L.titulo)}</h4>${toc}</aside>
<div><div class="readbar"><span><b>${esc(L.titulo)}</b> · <span id="rb-p"></span></span><span class="rtools"><button id="rt-side" type="button" aria-controls="toc-lat">☰ Índice</button><button id="rt-fs" type="button" aria-pressed="false">⛶ Pantalla completa</button><button id="rt-m" type="button" aria-label="Letra más pequeña">A−</button><button id="rt-p" type="button" aria-label="Letra más grande">A+</button></span></div>
<article class="book"><div class="crumb">Capítulo · Biología Celular</div><h1 class="ct">${esc(L.titulo)}</h1>
${secs}
<div class="secnav"><button type="button" id="top">↑ Volver al inicio del capítulo</button></div></article>
<p class="nota">Lectura 5 de la plataforma de estudio de Biología Celular. Practica con las ${Q.length} preguntas del tema en «Practicar».</p></div><div class="toc-bk" aria-hidden="true"></div></div></div>
<div class="view" id="v-practicar" hidden><div class="pr" id="pr"></div></div></main>
<script>${sx}</script><script>${js}</script></body></html>`;
mkdirSync(join(ROOT, 'publicar'), { recursive: true });
writeFileSync(join(ROOT, 'publicar/senalizacion.html'), html);
console.log('publicar/senalizacion.html · ' + Math.round(html.length / 1024) + ' KB');
