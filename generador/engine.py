import os as _os
_ROOT = _os.path.dirname(_os.path.abspath(__file__))
import base64, html, json

CHAIN = ['Estructura', 'Mecanismo', 'Función', 'Consecuencia', 'Aplicación médica']

def b64(path):
    return base64.b64encode(open(path, 'rb').read()).decode()

CSS = r'''
:root{--cob:#1B3FD0;--cob2:#142f9e;--cream:#F5F0E4;--ocre:#E8B94B;--ink:#1d2340;--mut:#5a5f78;--card:#fffdf7;--line:#d9d1bd;--soft:#ece4d0;--red:#b8412e;--green:#2f7d5b;
 --serif:"Cormorant Garamond","EB Garamond",Georgia,"DejaVu Serif",serif;--sans:"DM Sans","Inter","Segoe UI",system-ui,sans-serif;color-scheme:light}
*{box-sizing:border-box}
html,body{height:100%;margin:0;background:#e6dfcd;overflow:hidden}
body{font-family:var(--sans);color:var(--ink)}
#viewport{position:fixed;inset:0;overflow:hidden;padding:env(safe-area-inset-top,0px) env(safe-area-inset-right,0px) env(safe-area-inset-bottom,0px) env(safe-area-inset-left,0px)}
#stage{width:1920px;height:1080px;position:absolute;left:50%;top:50%;transform-origin:center center;transform:translate(-50%,-50%) scale(.5);box-shadow:0 10px 40px rgba(20,30,80,.18)}
.slide{position:absolute;inset:0;background:var(--cream);overflow:hidden;visibility:hidden}
.slide.on{visibility:visible}
/* barra superior */
.top{position:absolute;left:90px;right:90px;top:42px;height:64px;display:flex;align-items:center;justify-content:space-between;gap:30px}
.lv{display:flex;gap:10px;align-items:flex-end;flex:0 1 auto;min-width:0}
.lv div{width:215px;flex:0 1 215px;min-width:0}
.lv i{display:block;height:8px;border-radius:4px;background:var(--soft)}
.lv div.done i{background:var(--cob)}
.lv div.cur i{background:var(--ocre)}
.lv span{display:block;font-size:15px;letter-spacing:.05em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-transform:uppercase;color:var(--mut);margin-top:8px;font-weight:500}
.lv div.cur span{color:var(--ink);font-weight:700}
.meta{flex:none;display:flex;align-items:center;gap:18px;font-size:22px;color:var(--mut)}
.tag{white-space:nowrap;font-size:20px;font-weight:700;letter-spacing:.04em;padding:8px 18px;border-radius:30px;border:2px solid var(--cob);color:var(--cob)}
.tag.m{background:var(--ocre);border-color:var(--ocre);color:#3a2a05}
h2.t{position:absolute;left:90px;right:90px;top:128px;margin:0;font-family:var(--serif);font-style:italic;font-weight:600;font-size:78px;line-height:1.02;color:var(--cob);letter-spacing:-.01em}
.body{position:absolute;left:90px;right:90px;top:300px;bottom:150px;display:grid;grid-template-columns:720px 1fr;gap:60px;align-items:start}
.body.wide{grid-template-columns:1fr}
.txt{font-size:30px;line-height:1.42}
.txt .lead{font-size:36px;line-height:1.3;font-weight:500;margin:0 0 26px;color:var(--ink)}
.txt p{margin:0 0 18px}
.txt ul{margin:0;padding:0;list-style:none}
.txt li{position:relative;padding-left:34px;margin:0 0 16px}
.txt li::before{content:"";position:absolute;left:0;top:.52em;width:14px;height:14px;border-radius:3px;background:var(--ocre)}
.txt b{color:var(--cob2);font-weight:700}
.en{color:var(--mut);font-style:italic;font-size:.86em}
.fig{background:var(--card);border:2px solid var(--line);border-radius:22px;padding:18px;height:100%;display:flex;align-items:center;justify-content:center}
.fig svg{width:100%;height:100%;overflow:visible}
.note-v{font-size:22px;color:var(--mut);margin-top:22px;border-top:2px solid var(--line);padding-top:14px}
.chain{position:absolute;left:90px;right:90px;bottom:48px;display:flex;gap:12px;align-items:center}
.chain span{font-size:19px;letter-spacing:.05em;text-transform:uppercase;padding:9px 18px;border-radius:30px;color:var(--mut);border:2px solid var(--line);font-weight:500}
.chain span.on{background:var(--cob);border-color:var(--cob);color:var(--cream);font-weight:700}
.chain em{color:var(--line);font-style:normal;font-size:22px}
.num{font-variant-numeric:tabular-nums}
/* tablas */
table.tb{width:100%;border-collapse:separate;border-spacing:0;font-size:27px;line-height:1.3;background:var(--card);border:2px solid var(--line);border-radius:18px;overflow:hidden}
.tb th{background:var(--cob);color:var(--cream);text-align:left;padding:18px 22px;font-weight:700;font-size:26px}
.tb td{padding:15px 22px;border-top:2px solid var(--soft);vertical-align:top}
svg .bal table.tb.sm{font-size:19px}svg .bal .tb.sm th{font-size:19px;padding:8px 14px}svg .bal .tb.sm td{padding:6px 14px}
table.tb.sm{font-size:22px;line-height:1.22}.tb.sm th{padding:12px 18px;font-size:22px}.tb.sm td{padding:9px 18px}
.tb td:first-child{font-weight:700;color:var(--cob2);width:24%}
/* portada, divisoria, índice, cierre */
.cover{background:var(--cream)}
.cover .band{position:absolute;left:0;top:0;bottom:0;width:22px;background:var(--cob)}
.cover .logos{position:absolute;top:70px;left:120px;right:120px;display:flex;justify-content:space-between;align-items:center}
.cover .logos img.u{height:190px}.cover .logos img.f{height:190px}
.cover .kick{position:absolute;left:120px;top:400px;font-size:30px;letter-spacing:.14em;text-transform:uppercase;color:var(--mut);font-weight:700}
.cover h1{position:absolute;left:120px;right:120px;top:450px;margin:0;font-family:var(--serif);font-style:italic;font-weight:600;font-size:150px;line-height:.98;color:var(--cob);letter-spacing:-.015em}
.cover .sub{position:absolute;left:120px;top:690px;font-size:38px;color:var(--ink);max-width:1300px;line-height:1.3}
.cover .who{position:absolute;left:120px;bottom:90px;font-size:34px;font-weight:700;color:var(--ink)}
.cover .who small{display:block;font-weight:500;color:var(--mut);font-size:26px;margin-top:6px}
.cover .rule{position:absolute;left:120px;top:660px;width:220px;height:8px;background:var(--ocre);border-radius:4px}
.div{background:var(--cob);color:var(--cream)}
.div .big{position:absolute;left:120px;top:200px;font-family:var(--serif);font-style:italic;font-size:420px;line-height:.8;color:var(--ocre);font-weight:600}
.div .lvn{position:absolute;left:120px;top:600px;font-size:30px;letter-spacing:.16em;text-transform:uppercase;font-weight:700;opacity:.8}
.div h2{position:absolute;left:120px;top:650px;margin:0;font-family:var(--serif);font-style:italic;font-weight:600;font-size:120px;line-height:1}
.div p{position:absolute;left:120px;top:810px;width:1300px;margin:0;font-size:36px;line-height:1.35;opacity:.92}
.div .lv{position:absolute;left:120px;top:70px}
.div .lv i{background:rgba(245,240,228,.25)}.div .lv div.done i{background:var(--cream)}.div .lv div.cur i{background:var(--ocre)}
.div .lv span{color:rgba(245,240,228,.7)}.div .lv div.cur span{color:var(--cream)}
.idx .list{position:absolute;left:90px;right:90px;top:300px;display:grid;grid-template-columns:repeat(3,1fr);gap:26px}
.idx .it{background:var(--card);border:2px solid var(--line);border-radius:20px;padding:26px 30px;min-height:220px}
.idx .it b{font-family:var(--serif);font-style:italic;font-size:64px;color:var(--ocre);line-height:1;display:block}
.idx .it h3{margin:8px 0 8px;font-size:34px;color:var(--cob)}
.idx .it p{margin:0;font-size:24px;color:var(--mut);line-height:1.35}
.close .grid{position:absolute;left:90px;right:90px;top:290px;display:grid;grid-template-columns:repeat(2,1fr);gap:20px 40px}
.close .k{display:grid;grid-template-columns:70px 1fr;gap:18px;align-items:start;background:var(--card);border:2px solid var(--line);border-radius:18px;padding:20px 26px;font-size:27px;line-height:1.35}
.close .k b{font-family:var(--serif);font-style:italic;font-size:54px;color:var(--ocre);line-height:.9}
.close .k strong{color:var(--cob2)}
/* controles */
#ctrl{position:fixed;right:calc(14px + env(safe-area-inset-right,0px));bottom:calc(12px + env(safe-area-inset-bottom,0px));display:flex;gap:8px;z-index:20;font-family:var(--sans)}
#ctrl button{all:unset;cursor:pointer;background:rgba(27,63,208,.92);color:#fff;font-size:15px;font-weight:600;padding:8px 12px;border-radius:8px}
#ctrl button:focus-visible{outline:3px solid var(--ocre)}
#bar{position:fixed;left:0;bottom:0;height:5px;background:var(--ocre);z-index:19;transition:width .3s}
#notes{position:fixed;left:calc(14px + env(safe-area-inset-left,0px));right:calc(14px + env(safe-area-inset-right,0px));bottom:calc(58px + env(safe-area-inset-bottom,0px));max-height:52vh;overflow:auto;background:rgba(20,26,60,.97);color:#f5f0e4;border-radius:12px;padding:16px 22px 20px;font-size:17px;line-height:1.55;z-index:21;max-width:1100px;margin:0 auto}
#notes h5{margin:14px 0 4px;font-size:14px;letter-spacing:.06em;text-transform:uppercase;color:#9fb2ff}
#notes p{margin:4px 0 8px}#notes ul,#notes ol{margin:4px 0 8px;padding-left:22px}#notes li{margin:3px 0}#notes b{color:#ffe1a0}
#notes table{border-collapse:collapse;margin:6px 0 10px;font-size:15px}#notes td,#notes th{border:1px solid rgba(245,240,228,.25);padding:4px 8px;text-align:left;vertical-align:top}#notes th{color:var(--ocre)}
#ctrl a{all:unset;cursor:pointer;background:rgba(232,185,75,.95);color:#1d2340;font-size:15px;font-weight:700;padding:8px 12px;border-radius:8px}
#notes h4{margin:0 0 6px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--ocre)}
/* ===== animaciones (empiezan al entrar a la diapositiva) ===== */
.fi,.pp,.gr,.gy,.sl,.sr{opacity:0}
.dr{stroke-dasharray:1;stroke-dashoffset:1}
.on .fi{animation:fi .8s var(--d,0s) cubic-bezier(.2,.7,.2,1) both}
.on .sl{animation:sl .8s var(--d,0s) cubic-bezier(.2,.7,.2,1) both}
.on .sr{animation:sr .8s var(--d,0s) cubic-bezier(.2,.7,.2,1) both}
.on .pp{animation:pp .6s var(--d,0s) cubic-bezier(.3,1.5,.5,1) both;transform-box:fill-box;transform-origin:center}
.on .dr{animation:dr var(--t,1.4s) var(--d,0s) ease-in-out forwards}
.on .gr{animation:gr .9s var(--d,0s) ease-out both;transform-box:fill-box;transform-origin:left center}
.on .gy{animation:gy .9s var(--d,0s) ease-out both;transform-box:fill-box;transform-origin:center bottom}
.fl{stroke-dasharray:12 10}
.on .fl{animation:fl 1s linear infinite}
.mv{opacity:0}
.on .mv{animation:mv var(--t,3s) var(--d,0s) linear infinite}
.on .mv1{animation:mv1 var(--t,2s) var(--d,0s) ease-in-out both}
.mv1{opacity:0}
.on .sp{animation:sp var(--t,4s) var(--d,0s) linear infinite;transform-box:fill-box;transform-origin:center}
.on .pu{animation:pu 1.6s var(--d,0s) ease-in-out infinite;transform-box:fill-box;transform-origin:center}
.on .wob{animation:wob 1.2s var(--d,0s) ease-in-out infinite;transform-box:fill-box;transform-origin:center bottom}
@keyframes fi{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes sl{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:none}}
@keyframes sr{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:none}}
@keyframes pp{from{opacity:0;transform:scale(.3)}to{opacity:1;transform:none}}
@keyframes dr{to{stroke-dashoffset:0}}
@keyframes gr{from{opacity:1;transform:scaleX(0)}to{opacity:1;transform:none}}
@keyframes gy{from{opacity:1;transform:scaleY(0)}to{opacity:1;transform:none}}
@keyframes fl{to{stroke-dashoffset:-22}}
@keyframes mv{0%{opacity:0;transform:translate(0,0)}10%{opacity:1}85%{opacity:1}100%{opacity:0;transform:translate(var(--dx,0px),var(--dy,0px))}}
@keyframes mv1{from{opacity:0;transform:translate(var(--dx,0px),var(--dy,0px))}20%{opacity:1}to{opacity:1;transform:none}}
@keyframes sp{to{transform:rotate(360deg)}}
@keyframes pu{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
@keyframes wob{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(8deg)}}
/* estado final (sin movimiento) */
@media (prefers-reduced-motion:reduce){.on *{animation:none!important}.fi,.pp,.gr,.gy,.sl,.sr,.mv1{opacity:1!important}.dr{stroke-dashoffset:0!important}.mv{opacity:1!important}}
body.final .on *{animation:none!important}
body.final .fi,body.final .pp,body.final .gr,body.final .gy,body.final .sl,body.final .sr,body.final .mv1,body.final .mv{opacity:1!important}
body.final .dr{stroke-dashoffset:0!important}
'''

JS = r'''
const S=[...document.querySelectorAll('.slide')], N=S.length, NOTES=window.__NOTES;
let cur=0;
const stage=document.getElementById('stage');
function fit(){const vp=document.getElementById('viewport')||document.documentElement;let w=vp.clientWidth||innerWidth||document.documentElement.clientWidth,h=vp.clientHeight||innerHeight||document.documentElement.clientHeight;if(!w||!h){w=1280;h=720}const s=Math.min(w/1920,h/1080);stage.style.transform=`translate(-50%,-50%) scale(${s})`}
addEventListener('resize',fit);addEventListener('load',fit);try{new ResizeObserver(fit).observe(document.documentElement)}catch(e){}fit();requestAnimationFrame(fit);setTimeout(fit,300);
function countUp(sl){sl.querySelectorAll('[data-n]').forEach(el=>{const to=+el.dataset.n,dec=+(el.dataset.dec||0),dl=+(el.dataset.d||0)*1000,dur=1600;
 el.textContent=(0).toFixed(dec);const t0=performance.now()+dl;
 function step(t){const p=Math.min(1,Math.max(0,(t-t0)/dur));const v=to*(1-Math.pow(1-p,3));el.textContent=v.toLocaleString('es-MX',{minimumFractionDigits:dec,maximumFractionDigits:dec});if(p<1)requestAnimationFrame(step)}
 if(document.body.classList.contains('final')||matchMedia('(prefers-reduced-motion: reduce)').matches){el.textContent=to.toLocaleString('es-MX',{minimumFractionDigits:dec,maximumFractionDigits:dec})}else requestAnimationFrame(step)})}
function go(i){i=Math.max(0,Math.min(N-1,i));S[cur].classList.remove('on');cur=i;
 const sl=S[cur];sl.classList.remove('on');void sl.offsetWidth;sl.classList.add('on');countUp(sl);
 document.getElementById('bar').style.width=((cur+1)/N*100)+'%';
 document.getElementById('pos').textContent=`${cur+1} / ${N}`;
 const n=document.getElementById('notes');n.querySelector('div').innerHTML=NOTES[cur]||'';
 try{history.replaceState(null,'','#s'+(cur+1))}catch(e){}}
function next(){go(cur+1)}function prev(){go(cur-1)}
function fs(){const d=document;if(d.fullscreenElement){d.exitFullscreen&&d.exitFullscreen().catch(()=>{})}else{const e=d.documentElement;try{const p=e.requestFullscreen&&e.requestFullscreen();p&&p.catch&&p.catch(()=>{})}catch(err){}}}
function notes(){const n=document.getElementById('notes');n.hidden=!n.hidden}
addEventListener('keydown',e=>{const k=e.key;
 if(['ArrowRight','PageDown',' ','Enter'].includes(k)){e.preventDefault();next()}
 else if(['ArrowLeft','PageUp','Backspace'].includes(k)){e.preventDefault();prev()}
 else if(k==='Home')go(0);else if(k==='End')go(N-1);
 else if(k==='f'||k==='F')fs();else if(k==='n'||k==='N')notes()});
document.getElementById('viewport').addEventListener('click',e=>{if(e.target.closest('#ctrl,#notes'))return;(e.clientX<innerWidth*0.25)?prev():next()});
let tx=null,ty=null;
addEventListener('touchstart',e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY},{passive:true});
addEventListener('touchend',e=>{if(tx===null)return;const dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)){dx<0?next():prev()}tx=null},{passive:true});
document.getElementById('b-prev').onclick=e=>{e.stopPropagation();prev()};
document.getElementById('b-next').onclick=e=>{e.stopPropagation();next()};
document.getElementById('b-fs').onclick=e=>{e.stopPropagation();fs()};
document.getElementById('b-n').onclick=e=>{e.stopPropagation();notes()};
const m=/^#s(\d+)$/.exec(location.hash||'');go(m?(+m[1]-1):0);
'''

def levels_bar(levels, cur):
    out = '<div class="lv">'
    for i, name in enumerate(levels):
        cls = 'cur' if i == cur else ('done' if i < cur else '')
        out += f'<div class="{cls}"><i></i><span>{i+1}. {name}</span></div>'
    return out + '</div>'

def chain(step):
    parts = []
    for i, c in enumerate(CHAIN):
        parts.append(f'<span class="{"on" if i == step else ""}">{c}</span>')
    return '<div class="chain">' + '<em>→</em>'.join(parts) + '</div>'

def build(deck, out, home=None, full=False):
    L = [l['name'] for l in deck['levels']]
    slides, notes = [], []
    fm, ua = b64(_os.path.join(_ROOT, 'assets', 'fm.png')), b64(_os.path.join(_ROOT, 'assets', 'uaem.png'))
    # portada
    slides.append(f'''<section class="slide cover"><div class="band"></div>
 <div class="logos"><img class="u fi" style="--d:.1s" src="data:image/png;base64,{ua}" alt="Logo de la Universidad Autónoma del Estado de Morelos"><img class="f fi" style="--d:.25s" src="data:image/png;base64,{fm}" alt="Logo de la Facultad de Medicina"></div>
 <div class="kick fi" style="--d:.4s">{deck["materia"]}</div>
 <h1 class="fi" style="--d:.55s{';font-size:112px' if len(deck["title"])>24 else ''}">{deck["title"]}</h1>
 <div class="rule gr" style="--d:.9s"></div>
 <div class="sub fi" style="--d:1s">{deck["subtitle"]}</div>
 <div class="who fi" style="--d:1.2s">Aragón Ramírez Ángel Daniel<small>Facultad de Medicina · UAEM · Primer semestre</small></div></section>''')
    notes.append(deck['cover_notes'])
    # índice
    items = ''.join(f'<div class="it fi" style="--d:{.2+i*.12:.2f}s"><b>{i+1}</b><h3>{l["name"]}</h3><p>{l["desc"]}</p></div>' for i, l in enumerate(deck['levels']))
    slides.append(f'''<section class="slide idx"><div class="top">{levels_bar(L,-1)}<div class="meta"><span class="tag">Ruta</span></div></div>
 <h2 class="t fi">De lo básico a la clínica</h2><div class="list">{items}</div></section>''')
    notes.append(deck['index_notes'])
    for li, lev in enumerate(deck['levels']):
        slides.append(f'''<section class="slide div">{levels_bar(L,li)}
 <div class="big pp">{li+1}</div><div class="lvn fi" style="--d:.2s">Nivel {li+1} de {len(L)}</div>
 <h2 class="fi" style="--d:.35s">{lev["name"]}</h2><p class="fi" style="--d:.55s">{lev["intro"]}</p></section>''')
        notes.append(lev['notes'])
        for s in lev['slides']:
            tag = '<span class="tag m">Un paso más</span>' if s.get('tag') == 'm' else '<span class="tag">Básico</span>'
            body_cls = 'body wide' if s.get('wide') else 'body'
            if s.get('wide'):
                inner = f'<div class="fi" style="--d:.2s">{s["fig"]}</div>'
            else:
                inner = f'<div class="txt sl" style="--d:.15s">{s["text"]}</div><div class="fig">{s["fig"]}</div>'
            slides.append(f'''<section class="slide">
 <div class="top">{levels_bar(L,li)}<div class="meta">{tag}<span class="num" data-pos></span></div></div>
 <h2 class="t fi">{s["title"]}</h2>
 <div class="{body_cls}">{inner}</div>{chain(s["chain"])}</section>''')
            notes.append(s['notes'])
    # cierre
    ks = ''.join(f'<div class="k fi" style="--d:{.15+i*.1:.2f}s"><b>{i+1}</b><div>{k}</div></div>' for i, k in enumerate(deck['close']))
    slides.append(f'''<section class="slide close"><div class="top">{levels_bar(L,len(L))}<div class="meta"><span class="tag">Cierre</span></div></div>
 <h2 class="t fi">Lo que hay que llevarse</h2><div class="grid">{ks}</div></section>''')
    notes.append(deck['close_notes'])
    notes = [n if n.lstrip().startswith('<') else f'<p>{n}</p>' for n in notes]
    total = len(slides)
    # número de diapositiva fijo en cada una
    for i in range(total):
        slides[i] = slides[i].replace('<span class="num" data-pos></span>', f'<span class="num">{i+1}/{total}</span>')
    doc = f'''<title>{deck["page_title"]}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,500;1,600&family=DM+Sans:wght@400;500;700&display=swap">
<style>{CSS}</style>
<div id="viewport"><div id="stage">
{chr(10).join(slides)}
</div></div>
<div id="bar"></div>
<div id="notes" hidden><h4>Notas del expositor</h4><div></div></div>
<div id="ctrl">{{homebtn}}<button id="b-prev" aria-label="Anterior">◀</button><span id="pos" style="align-self:center;font-size:14px;color:#1d2340;font-weight:600;padding:0 4px"></span><button id="b-next" aria-label="Siguiente">▶</button><button id="b-n">Notas (N)</button><button id="b-fs">Pantalla completa (F)</button></div>
<script>window.__NOTES={json.dumps(notes, ensure_ascii=False)};</script>
<script>{JS}</script>'''
    doc = doc.replace('{homebtn}', f'<a id="b-home" href="{home}" target="_self">⌂ Temas</a>' if home else '')
    if full:
        doc = '<!doctype html>\n<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + doc.replace('<div id="viewport">', '</head><body><div id="viewport">', 1) + '</body></html>'
    open(out, 'w').write(doc)
    return total
