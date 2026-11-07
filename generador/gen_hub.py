import sys, importlib, re
import os
ROOT = os.path.dirname(os.path.abspath(__file__))
HUB = os.path.join(os.path.dirname(ROOT), 'hub')
sys.path.insert(0, ROOT)
from engine import build, b64
decks = [('d_mito2', 'mitocondria.html', 'La mitocondria', 'Estructura, respiración celular y la cuenta de NADH, FADH₂ y ATP en cada etapa.', 'mito'),
         ('d_dogma2', 'dogma_central.html', 'El dogma central', 'Replicación, transcripción y traducción con todo el material del profesor.', 'dna'),
         ('d_cito2', 'citoesqueleto.html', 'El citoesqueleto', 'Actina, microtúbulos y filamentos intermedios: forma, movimiento y transporte.', 'cito'),
         ('d_reg2', 'regulacion.html', 'Regulación génica', 'Operones lac y trp, atenuación, fagos, niveles eucariotas y epigenética.', 'reg'),
         ('d_senal2', 'senalizacion.html', 'Señalización celular', 'Comunicación celular, receptores, proteínas G, segundos mensajeros y tirosina cinasas.', 'senal')]
cards = ''
DIAPOS = []
TEMA_DE = {'mitocondria.html': 'mito', 'dogma_central.html': 'dogma', 'citoesqueleto.html': 'cito', 'regulacion.html': 'reg', 'senalizacion.html': 'senal'}
def _strip(x): return re.sub(r'\s+', ' ', re.sub(r'<svg.*?</svg>|<[^>]+>', ' ', str(x), flags=re.S)).strip()
for mod, out, title, desc, ic in decks:
    m = importlib.import_module(mod)
    n = build(m.DECK, os.path.join(HUB, out), home='index.html', full=True)
    lv = ''.join(f'<li>{l["name"]}</li>' for l in m.DECK['levels'])
    ncont = sum(len(l['slides']) for l in m.DECK['levels'])
    cards += f'''<a class="card" href="{out}" target="_self">
  <div class="ic ic-{ic}" aria-hidden="true"></div>
  <span class="kick">Biología Celular</span>
  <h2>{title}</h2><p>{desc}</p>
  <ol class="lv">{lv}</ol>
  <div class="foot"><span>{n} diapositivas · {len(m.DECK["levels"])} niveles</span><span class="go">Abrir presentación →</span></div></a>'''
    print(out, n)
    _n = 2
    for lev in m.DECK['levels']:
        _n += 1
        DIAPOS.append(dict(tema=TEMA_DE[out], deck=title, file=out, n=_n, title=_strip(lev['name']), text=_strip(lev.get('intro', ''))))
        for sl in lev['slides']:
            _n += 1
            DIAPOS.append(dict(tema=TEMA_DE[out], deck=title, file=out, n=_n, title=_strip(sl['title']), text=(_strip(sl.get('text', '')) + ' ' + _strip(sl.get('notes', '')))[:700]))
import json as _j
open(HUB + '/datos/diapos.js', 'w').write('window.DIAPOS=' + _j.dumps(DIAPOS, ensure_ascii=False) + ';')
_lib = _j.loads(open(HUB + '/datos/libro.js').read()[len('window.LIBRO='):-1])
_b = open(HUB + '/datos/banco.js').read().split(';\n')[0][len('window.BANCO='):]
_banco = _j.loads(_b)
libro_cards = ''
banco_cards = ''
for t, ic in (('cito', 'cito'), ('mito', 'mito'), ('dogma', 'dna'), ('reg', 'reg'), ('senal', 'senal')):
    L = _lib[t]
    libro_cards += f'''<a class="card" href="estudio.html#libro-{t}" target="_self"><div class="ic ic-{ic}" aria-hidden="true"></div><span class="kick">Capítulo</span><h2>{L["titulo"]}</h2><p>{L["desc"]}</p><div class="foot"><span>{len(L["secciones"])} partes · ≈{round(L["palabras"]/200)} min</span><span class="go">Leer capítulo →</span></div></a>'''
    n = sum(1 for q in _banco if q['tema'] == t)
    nm = {'cito': 'Citoesqueleto', 'mito': 'Mitocondria', 'dogma': 'Dogma central', 'reg': 'Regulación génica', 'senal': 'Señalización celular'}[t]
    banco_cards += f'''<a class="card" href="estudio.html#banco-{t}" target="_self"><div class="ic ic-{ic}" aria-hidden="true"></div><span class="kick">Banco</span><h2>{nm}</h2><p>{n} preguntas escritas + variantes generadas sin límite, de básicas a razonamiento.</p><div class="foot"><span>Modo práctica</span><span class="go">Practicar →</span></div></a>'''
fm, ua = b64(ROOT + '/assets/fm.png'), b64(ROOT + '/assets/uaem.png')
html = f'''<title>Página de estudio Medicina</title>
<script>try{{const t=localStorage.getItem('bc-theme');if(t)document.documentElement.dataset.theme=t}}catch(e){{}}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,500;1,600&family=DM+Sans:wght@400;500;700&display=swap">
<style>
:root{{--cob:#1B3FD0;--cream:#F5F0E4;--ocre:#E8B94B;--ink:#1d2340;--mut:#5a5f78;--card:#fffdf7;--line:#d9d1bd;--lcob:#dbe3fb;color-scheme:light}}
*{{box-sizing:border-box}}
body{{margin:0;background:var(--cream);color:var(--ink);font-family:"DM Sans",Inter,system-ui,sans-serif}}
header{{background:var(--cob);color:#F5F0E4;padding:28px 16px 40px;position:relative;overflow:hidden}}
header::after{{content:"";position:absolute;left:0;right:0;bottom:0;height:8px;background:var(--ocre)}}
.wrap{{max-width:1100px;margin:0 auto;padding:0 8px}}
.logos{{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:26px}}
.logos span{{background:#F5F0E4;border-radius:14px;padding:10px 14px;display:inline-flex}}
.logos img{{height:64px;width:auto;display:block}}
.k{{font-size:14px;letter-spacing:.18em;text-transform:uppercase;font-weight:700;color:var(--ocre)}}
h1{{font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-weight:600;font-size:clamp(40px,7vw,78px);line-height:1;margin:8px 0 14px}}
.who{{font-size:clamp(18px,2.4vw,24px);font-weight:700}}
.who small{{display:block;font-weight:500;font-size:15px;opacity:.85;margin-top:4px}}
main{{padding:36px 16px 48px}}
.intro{{font-size:17px;color:var(--mut);margin:0 0 22px}}
.grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px}}
.card{{display:flex;flex-direction:column;text-decoration:none;color:inherit;background:var(--card);border:2px solid var(--line);border-radius:18px;padding:22px;transition:transform .2s,border-color .2s,box-shadow .2s}}
.card:hover,.card:focus-visible{{transform:translateY(-3px);border-color:var(--cob);box-shadow:0 12px 30px rgba(27,63,208,.14);outline:none}}
.kick{{font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:var(--mut)}}
.card h2{{font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-weight:600;font-size:40px;color:var(--cob);margin:4px 0 6px;line-height:1.05}}
.card p{{margin:0 0 12px;font-size:16px;line-height:1.45}}
.lv{{margin:0 0 16px;padding-left:20px;font-size:14px;color:var(--mut);columns:2;column-gap:18px}}
.lv li{{margin:2px 0}}
.foot{{margin-top:auto;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;font-size:14px;color:var(--mut)}}
.go{{background:var(--cob);color:#fff;font-weight:700;padding:9px 14px;border-radius:10px}}
.secnav{{display:flex;flex-wrap:wrap;gap:8px;align-items:center;background:var(--card);border:2px solid var(--line);border-radius:14px;padding:10px 12px;margin:0 0 26px;position:sticky;top:8px;z-index:5;box-shadow:0 6px 18px rgba(20,30,80,.08)}}.secnav .lbl{{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:600;font-size:22px;color:var(--cob);margin-right:6px}}.secnav a{{text-decoration:none;color:var(--cob);font-weight:700;font-size:14px;padding:7px 11px;border-radius:9px;background:#eef2fd}}.secnav a:hover{{background:#dbe3fb}}
section{{margin-bottom:38px;scroll-margin-top:90px}}h2.sh{{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:600;font-size:38px;color:var(--ink);margin:0 0 6px}}.card.mini .go{{align-self:flex-start;margin-top:auto}}.card.mini h3{{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:600;font-size:30px;color:var(--cob);margin:4px 0 6px;line-height:1.05}}.card .go2{{background:var(--lcob);color:var(--cob)}}
.ic{{height:86px;margin-bottom:12px;border-radius:12px;background:#f3ead4 center/contain no-repeat}}
.keys{{margin-top:30px;background:var(--card);border:2px solid var(--line);border-radius:16px;padding:18px 20px}}
.keys h3{{margin:0 0 8px;font-size:15px;letter-spacing:.1em;text-transform:uppercase;color:var(--cob)}}
.keys ul{{margin:0;padding-left:18px;columns:2;column-gap:28px;font-size:15px;line-height:1.7}}
kbd{{background:#efe8d8;border:1px solid var(--line);border-radius:6px;padding:1px 7px;font-family:inherit;font-weight:700}}
@media (max-width:560px){{.keys ul,.lv{{columns:1}}.logos img{{height:46px}}}}
@media (prefers-color-scheme:dark){{:root:not([data-theme=light]){{--cream:#12162a;--card:#1b2040;--line:#323a66;--ink:#e7e9f5;--mut:#a9afcc;--lcob:#26306b;color-scheme:dark}}:root:not([data-theme=light]) .card h2,:root:not([data-theme=light]) .card.mini h3,:root:not([data-theme=light]) .secnav .lbl,:root:not([data-theme=light]) .keys h3,:root:not([data-theme=light]) .secnav a{{color:#a3b5ff}}:root:not([data-theme=light]) .secnav a{{background:#26306b}}:root:not([data-theme=light]) kbd{{background:#272e55}}:root:not([data-theme=light]) .go{{background:#3b5bdb}}}}
:root[data-theme=dark]{{--cream:#12162a;--card:#1b2040;--line:#323a66;--ink:#e7e9f5;--mut:#a9afcc;--lcob:#26306b;color-scheme:dark}}:root[data-theme=dark] .card h2,:root[data-theme=dark] .card.mini h3,:root[data-theme=dark] .secnav .lbl,:root[data-theme=dark] .keys h3,:root[data-theme=dark] .secnav a{{color:#a3b5ff}}:root[data-theme=dark] .secnav a{{background:#26306b}}:root[data-theme=dark] kbd{{background:#272e55}}:root[data-theme=dark] .go{{background:#3b5bdb}}
.thm{{position:absolute;top:14px;right:14px;border:0;background:rgba(245,240,228,.18);color:#fff;border-radius:10px;padding:7px 11px;font-size:16px;cursor:pointer;z-index:3}}header{{position:relative}}
</style>
<header><button class="thm" id="thm" aria-label="Cambiar entre modo claro y oscuro">🌙</button><div class="wrap">
 <div class="logos"><span><img src="data:image/png;base64,{ua}" alt="Logo de la Universidad Autónoma del Estado de Morelos"></span><span><img src="data:image/png;base64,{fm}" alt="Logo de la Facultad de Medicina"></span></div>
 <div class="k">Página de estudio · Biología Celular</div>
 <h1>Medicina</h1>
 <div class="who">Aragón Ramírez Ángel Daniel<small>Facultad de Medicina · UAEM · Primer semestre</small></div>
</div></header>
<main><div class="wrap">
 <nav class="secnav" aria-label="Secciones de la plataforma"><span class="lbl">Biología Celular</span><a href="#hoy">Hoy</a><a href="#presentaciones">Presentaciones</a><a href="#libro">📖 Estudiar como libro</a><a href="#banco">🧠 Banco de preguntas</a><a href="estudio.html#examen" target="_self">📝 Simulador de examen</a><a href="estudio.html#errores" target="_self">❌ Repasar errores</a></nav>
 <section id="presentaciones"><h2 class="sh">Presentaciones</h2>
 <p class="intro">Elige un tema para abrir su presentación. Cada una va de lo básico a la integración, al nivel de las diapositivas del profesor, y trae notas del expositor en cada diapositiva.</p>
 <div class="grid">{cards}</div></section>
 <section id="libro"><h2 class="sh">📖 Estudiar como libro</h2>
 <p class="intro">Cada tema como un capítulo con texto corrido: introducción, conceptos, estructura, mecanismo, integración, importancia médica, puntos de alto rendimiento, errores frecuentes y resumen.</p>
 <div class="grid">{libro_cards}</div></section>
 <section id="banco"><h2 class="sh">🧠 Banco de preguntas</h2>
 <p class="intro">Opción múltiple, verdadero o falso, completar, relacionar, ordenar, identificar estructuras y razonamiento, con explicación de cada opción y variantes nuevas sin límite.</p>
 <div class="grid">{banco_cards}</div></section>
 <section id="examen"><h2 class="sh">📝 Simulador y ❌ errores</h2>
 <div class="grid">
  <a class="card mini" href="estudio.html#examen" target="_self"><span class="kick">Modo examen</span><h3>📝 Simulador de examen</h3><p>10, 20, 30, 50 o 100 preguntas de uno o varios temas, sin ver respuestas hasta el final. Calificación, errores explicados y subtemas más débiles.</p><span class="go">Hacer un examen →</span></a>
  <a class="card mini" href="estudio.html#errores" target="_self"><span class="kick">Repaso</span><h3>❌ Repasar errores</h3><p>Las preguntas que contestaste mal: tu respuesta, la correcta, la explicación y la opción de volver a contestarlas.</p><span class="go">Ver mis errores →</span></a>
 </div></section>
 <div class="keys"><h3>Cómo usar las presentaciones</h3><ul>
  <li><kbd>→</kbd> <kbd>←</kbd>, clic o deslizar: avanzar y retroceder</li>
  <li><kbd>N</kbd>: mostrar u ocultar las notas</li>
  <li><kbd>F</kbd>: pantalla completa</li>
  <li>Botón <b>⌂ Temas</b>: volver a esta página</li>
 </ul></div>
</div></main>
<script>(function(){{const b=document.getElementById('thm');const dark=()=>{{const t=document.documentElement.dataset.theme;return t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches}};const ic=()=>b.textContent=dark()?'☀️':'🌙';b.onclick=()=>{{const t=dark()?'light':'dark';document.documentElement.dataset.theme=t;try{{localStorage.setItem('bc-theme',t)}}catch(e){{}}ic()}};ic()}})();</script>'''
# iconos SVG simples
icons = {
 'senal': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 86"><rect x="10" y="40" width="180" height="14" rx="4" fill="#f1dca8" stroke="#a77d2c" stroke-width="2"/>' + ''.join(f'<rect x="{60+k*7}" y="30" width="6" height="34" rx="3" fill="#ece3fa" stroke="#6b3fb8" stroke-width="1.2"/>' for k in range(7)) + '<polygon points="85,10 95,20 85,30 75,20" fill="#E8B94B"/><ellipse cx="92" cy="74" rx="14" ry="8" fill="#d5ebdf" stroke="#2f7d5b" stroke-width="2"/><path d="M110 74 L150 74" stroke="#1B3FD0" stroke-width="3"/><circle cx="160" cy="74" r="7" fill="#b8412e"/></svg>',
 'reg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 86"><path d="M10 60 L190 60" stroke="#1B3FD0" stroke-width="5"/><rect x="20" y="48" width="30" height="24" rx="4" fill="#f7e6b8" stroke="#a77d2c" stroke-width="2"/><rect x="50" y="48" width="26" height="24" rx="4" fill="#f4d6cf" stroke="#b8412e" stroke-width="2"/><rect x="82" y="48" width="100" height="24" rx="4" fill="#dbe3fb" stroke="#1B3FD0" stroke-width="2"/><ellipse cx="63" cy="30" rx="22" ry="13" fill="#e9b3a6" stroke="#b8412e" stroke-width="2.5"/><circle cx="150" cy="24" r="12" fill="#E8B94B"/><path d="M138 24 L100 28" stroke="#a77d2c" stroke-width="2" stroke-dasharray="4 3"/></svg>',
 'mito': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 86"><ellipse cx="100" cy="43" rx="80" ry="32" fill="#f3e3bf" stroke="#a77d2c" stroke-width="4"/><path d="M40 43 C55 20 60 66 75 43 S95 20 105 43 S125 66 135 43 S155 20 162 43" fill="none" stroke="#a77d2c" stroke-width="4"/></svg>',
 'dna': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 86"><path d="M20 20 C60 20 60 66 100 66 S140 20 180 20" fill="none" stroke="#1B3FD0" stroke-width="5"/><path d="M20 66 C60 66 60 20 100 20 S140 66 180 66" fill="none" stroke="#E8B94B" stroke-width="5"/><g stroke="#5a5f78" stroke-width="2"><line x1="40" y1="24" x2="40" y2="62"/><line x1="70" y1="34" x2="70" y2="52"/><line x1="130" y1="34" x2="130" y2="52"/><line x1="160" y1="24" x2="160" y2="62"/></g></svg>',
 'cito': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 86"><rect x="20" y="14" width="160" height="16" rx="5" fill="#dbe3fb" stroke="#1B3FD0" stroke-width="3"/><g fill="#f4d6cf" stroke="#b8412e" stroke-width="2">' + ''.join(f'<circle cx="{28+i*12}" cy="{48 + (4 if i%2 else -4)}" r="6"/>' for i in range(13)) + '</g><path d="M20 72 Q40 62 60 72 T100 72 T140 72 T180 72" fill="none" stroke="#a77d2c" stroke-width="4"/></svg>',
}
import base64
css_ic = ''.join(f'.ic-{k}{{background-image:url("data:image/svg+xml;base64,{base64.b64encode(v.encode()).decode()}")}}' for k, v in icons.items())
html = html.replace('</style>', css_ic + '</style>', 1)
_dash = open(ROOT + '/plat/dash.html').read()
_dcss = open(ROOT + '/plat/dash.css').read()
html = html.replace('</style>', _dcss + '</style>', 1)
assert html.count('<main><div class="wrap">') == 1
html = html.replace('<main><div class="wrap">', '<main><div class="wrap">\n' + _dash, 1)
open(HUB + '/index.html', 'w').write(html)
