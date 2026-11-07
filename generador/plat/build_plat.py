import sys, re, json, importlib, math
import os
PLAT = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(PLAT)
sys.path.insert(0, ROOT); sys.path.insert(0, PLAT)
OUT = os.path.join(os.path.dirname(ROOT), 'hub', 'datos')
COB, OCRE, INK, MUT, RED, GREEN, TAND, LCOB, LOCRE = '#1B3FD0', '#E8B94B', '#1d2340', '#5a5f78', '#b8412e', '#2f7d5b', '#a77d2c', '#dbe3fb', '#f7e6b8'

# ---------- figuras del libro (estáticas) ----------
from captions import CAP
import extras
_num = [0]
def fig(modfunc):
    m, f = modfunc.split('.')
    svg = getattr(importlib.import_module(m), f)()
    _num[0] += 1
    cap = CAP.get(modfunc, '')
    assert cap, modfunc
    return f'<figure class="fig" data-f="{modfunc}"><div class="fsvg">{svg}</div><figcaption><b>Figura {_num[0]}.</b> {cap} <button class="replay" type="button">↻ Repetir animación</button></figcaption></figure>'

def libro(tema, titulo, desc):
    _num[0] = 0
    src = open(os.path.join(PLAT, 'libro', f'{tema}.html')).read()
    src = src.replace('el problema de la antiparalelismo', 'el problema del antiparalelismo')
    secs = []
    for k, (sid, stit, body) in enumerate(re.findall(r'<section data-id="(\w+)" data-title="([^"]*)">(.*?)</section>', src, re.S)):
        body = re.sub(r'\{\{FIG:([\w.]+)\}\}', lambda mo: fig(mo.group(1)), body)
        body = re.sub(r'\{\{VIZ:(\w+)(?::(\w+))?\}\}', lambda mo: f'<div class="vizhost" data-viz="{mo.group(1)}" data-scene="{mo.group(2) or ""}"></div>', body)
        for (wk, wh, wq, wc) in extras.WHY.get(tema, []):
            if wk != k: continue
            box = '<details class="why"><summary>❓ ' + wq + '</summary><ol>' + ''.join('<li>' + c + '</li>' for c in wc) + '</ol></details>'
            pos = [m.start() for m in re.finditer(r'<h3>', body)]
            assert wh < len(pos), (tema, wk, wh)
            at = pos[wh + 1] if wh + 1 < len(pos) else len(body)
            body = body[:at] + box + '\n' + body[at:]
        heads = re.findall(r'<h3>(.*?)</h3>', body)
        secs.append(dict(id=sid, titulo=stit, html=body.strip(), subs=heads))
    words = len(re.sub(r'<[^>]+>', ' ', src).split())
    return dict(titulo=titulo, desc=desc, secciones=secs, palabras=words)

# ---------- esquemas para preguntas de identificación ----------
def arrow_to(x, y, fx, fy):
    a = math.atan2(y - fy, x - fx)
    h1 = (x - 16*math.cos(a - .4), y - 16*math.sin(a - .4)); h2 = (x - 16*math.cos(a + .4), y - 16*math.sin(a + .4))
    return (f'<line x1="{fx}" y1="{fy}" x2="{x}" y2="{y}" stroke="{RED}" stroke-width="4" stroke-linecap="round"/>'
            f'<path d="M{x},{y} L{h1[0]:.1f},{h1[1]:.1f} L{h2[0]:.1f},{h2[1]:.1f} Z" fill="{RED}"/>'
            f'<circle cx="{fx}" cy="{fy}" r="18" fill="{RED}"/><text x="{fx}" y="{fy+7}" font-size="20" fill="#fff" text-anchor="middle" font-weight="700">?</text>')
def S(inner, w=600, h=400, label='Esquema para identificar una estructura'):
    return f'<svg viewBox="0 0 {w} {h}" role="img" aria-label="{label}" style="font-family:DM Sans,Inter,sans-serif">{inner}</svg>'
def axonema(target):
    cx, cy = 300, 205
    o = f'<circle cx="{cx}" cy="{cy}" r="170" fill="#fbf6ea" stroke="{MUT}" stroke-width="2"/>'
    for k in range(9):
        a = math.radians(-90 + k*40); b = a + math.radians(10)
        ax, ay = cx + 125*math.cos(a), cy + 125*math.sin(a); bx, by = cx + 125*math.cos(b), cy + 125*math.sin(b)
        o += f'<circle cx="{bx:.0f}" cy="{by:.0f}" r="14" fill="#c9d4fa" stroke="{COB}" stroke-width="2"/><circle cx="{ax:.0f}" cy="{ay:.0f}" r="16" fill="{LCOB}" stroke="{COB}" stroke-width="2.5"/>'
        for dr in (-7, 7):
            sx, sy = cx + (125 + dr)*math.cos(a - math.radians(4)), cy + (125 + dr)*math.sin(a - math.radians(4))
            ex, ey = cx + (125 + dr)*math.cos(a - math.radians(12)), cy + (125 + dr)*math.sin(a - math.radians(12))
            o += f'<line x1="{sx:.0f}" y1="{sy:.0f}" x2="{ex:.0f}" y2="{ey:.0f}" stroke="{TAND}" stroke-width="4"/>'
    o += f'<circle cx="{cx-20}" cy="{cy}" r="15" fill="{LCOB}" stroke="{COB}" stroke-width="2.5"/><circle cx="{cx+20}" cy="{cy}" r="15" fill="{LCOB}" stroke="{COB}" stroke-width="2.5"/>'
    if target == 'doublet':
        a = math.radians(-90 + 2*40); tx, ty = cx + 145*math.cos(a), cy + 145*math.sin(a)
        o += arrow_to(round(tx), round(ty), 560, 80)
    else:
        o += arrow_to(cx + 30, cy - 12, 540, 40)
    return S(o)
def motores():
    o = f'<rect x="40" y="200" width="520" height="40" rx="6" fill="{LCOB}" stroke="{COB}" stroke-width="2.5"/>'
    for x in range(52, 556, 16): o += f'<line x1="{x}" y1="203" x2="{x}" y2="237" stroke="{COB}" stroke-width="1" opacity=".5"/>'
    o += f'<text x="40" y="285" font-size="22" fill="{INK}" font-weight="700">− centrosoma</text><text x="560" y="285" font-size="22" fill="{INK}" font-weight="700" text-anchor="end">periferia +</text>'
    o += f'<circle cx="260" cy="120" r="34" fill="#d5ebdf" stroke="{GREEN}" stroke-width="3"/><text x="260" y="126" font-size="15" fill="{GREEN}" text-anchor="middle" font-weight="700">carga</text>'
    o += f'<line x1="260" y1="154" x2="260" y2="196" stroke="{MUT}" stroke-width="4"/><circle cx="260" cy="196" r="9" fill="{MUT}"/><text x="290" y="186" font-size="22" fill="{MUT}" font-weight="700">?</text>'
    o += f'<line x1="320" y1="120" x2="430" y2="120" stroke="{OCRE}" stroke-width="5"/><path d="M445,120 L428,110 L428,130 Z" fill="{OCRE}"/>'
    o += arrow_to(556, 220, 560, 350)
    return S(o)
def sarcomero():
    o = ''
    for x in (60, 540):
        o += f'<rect x="{x-6}" y="60" width="12" height="280" rx="4" fill="{INK}"/>'
    for y in (100, 170, 240, 310):
        o += f'<line x1="66" y1="{y}" x2="250" y2="{y}" stroke="{RED}" stroke-width="5"/><line x1="350" y1="{y}" x2="534" y2="{y}" stroke="{RED}" stroke-width="5"/>'
    for y in (135, 205, 275):
        o += f'<rect x="170" y="{y-8}" width="260" height="16" rx="8" fill="#c9d4fa" stroke="{COB}" stroke-width="2"/>'
    o += arrow_to(62, 200, 140, 375)
    return S(o)
def mito(target):
    cx, cy = 300, 200
    o = f'<ellipse cx="{cx}" cy="{cy}" rx="260" ry="150" fill="#f3e3bf" stroke="{TAND}" stroke-width="5"/>'
    o += f'<ellipse cx="{cx}" cy="{cy}" rx="236" ry="126" fill="#fbefd2" stroke="{TAND}" stroke-width="4"/>'
    for i, dx in enumerate([-170, -100, -30, 40, 110, 175]):
        yb = 126*math.sqrt(1 - (dx/236)**2); top = i % 2 == 0; dep = yb*1.0
        if top:
            y0 = cy - yb
            o += f'<rect x="{cx+dx-11}" y="{y0-3:.0f}" width="22" height="{dep:.0f}" rx="11" fill="#f3e3bf"/><path d="M{cx+dx-11},{y0+2:.0f} L{cx+dx-11},{y0+dep-11:.0f} A11,11 0 0 0 {cx+dx+11},{y0+dep-11:.0f} L{cx+dx+11},{y0+2:.0f}" fill="none" stroke="{TAND}" stroke-width="4"/>'
        else:
            y0 = cy + yb
            o += f'<rect x="{cx+dx-11}" y="{y0-dep:.0f}" width="22" height="{dep+3:.0f}" rx="11" fill="#f3e3bf"/><path d="M{cx+dx-11},{y0-2:.0f} L{cx+dx-11},{y0-dep+11:.0f} A11,11 0 0 1 {cx+dx+11},{y0-dep+11:.0f} L{cx+dx+11},{y0-2:.0f}" fill="none" stroke="{TAND}" stroke-width="4"/>'
    if target == 'ime': o += arrow_to(cx + 140, cy - 125, 560, 25)
    elif target == 'matriz': o += arrow_to(cx + 75, cy + 15, 575, 385)
    else:
        yb = 126*math.sqrt(1 - (40/236)**2)
        o += arrow_to(cx + 40, round(cy + yb - yb + 8), 575, 385)
    return S(o)
def sintasa():
    o = f'<rect x="20" y="120" width="560" height="70" fill="#f1dca8" stroke="{TAND}" stroke-width="3"/>'
    o += f'<text x="30" y="40" font-size="18" fill="{MUT}" font-weight="700">ESPACIO INTERMEMBRANA</text><text x="30" y="385" font-size="18" fill="{MUT}" font-weight="700">MATRIZ</text>'
    o += f'<ellipse cx="300" cy="155" rx="90" ry="30" fill="{LCOB}" stroke="{COB}" stroke-width="3"/>'
    o += f'<rect x="292" y="185" width="16" height="70" fill="{COB}"/>'
    for k in range(6):
        a = math.radians(-90 + 60*k)
        o += f'<circle cx="{300 + 50*math.cos(a):.0f}" cy="{295 + 38*math.sin(a):.0f}" r="32" fill="{"#c9d4fa" if k % 2 else LOCRE}" stroke="{COB if k % 2 else TAND}" stroke-width="2.5"/>'
    o += f'<rect x="410" y="130" width="16" height="190" rx="6" fill="#c9d4fa" stroke="{COB}" stroke-width="2"/>'
    o += arrow_to(345, 310, 540, 370)
    return S(o)
SVGS = {'axonema': axonema('doublet'), 'axonema_central': axonema('central'), 'motores': motores(), 'sarcomero': sarcomero(),
        'mito_ime': mito('ime'), 'mito_matriz': mito('matriz'), 'mito_cresta': mito('cresta'), 'sintasa_f1': sintasa()}

# ---------- preguntas ----------
import qhelp
for m in ('q_cito', 'q_cito_prof', 'q_cito_mas', 'q_mito', 'q_mito_mas', 'q_dogma', 'q_dogma_mas', 'q_reg', 'q_senal', 'q_senal_mas'): importlib.import_module(m)
Q = qhelp.Q
for q in Q:
    if q['tipo'] == 'id': q['svg'] = SVGS[q['svg']]
old = json.load(open(os.path.join(PLAT, 'viejo.json')))
SUBM = {'rep': 'replicacion', 'tra': 'transcripcion', 'trd': 'traduccion'}
DIF = {1: 1, 2: 1, 3: 2, 4: 3, 5: 3}
CAT = {1: 'Concepto', 2: 'Comprensión', 3: 'Aplicación', 4: 'Integración', 5: 'Caso clínico'}
for i, (q, w) in enumerate(zip(old['Q'], old['W'])):
    Q.append(dict(id=f'dogma-b{i+1:03d}', tema='dogma', sub=SUBM[q['t']], tipo='mc', dif=DIF[q['n']], cat=CAT[q['n']], q=q['q'],
                  opts=q['o'], why=['Correcta. ' + q['e']] + w, exp=q['e']))
# --- sin casos clínicos: se quitan los casos y se dejan solo mecanismos (nivel de las diapositivas) ---
DROP = {'cito-031', 'cito-072', 'cito-073', 'cito-074', 'cito-075', 'cito-077', 'cito-078', 'cito-079',
        'mito-052', 'mito-056', 'mito-057', 'mito-062', 'mito-063', 'mito-064',
        'dogma-064', 'dogma-067', 'dogma-068', 'dogma-b039', 'dogma-b097', 'dogma-b100', 'dogma-b101'}
Q[:] = [q for q in Q if q['id'] not in DROP]
RECAT = {'cito-020': 'Mecanismo', 'mito-059': 'Aplicación', 'mito-060': 'Comprensión', 'mito-058': 'Razonamiento', 'dogma-055': 'Aplicación'}
for q in Q:
    if q['id'] in RECAT: q['cat'] = RECAT[q['id']]
    elif q['cat'] == 'Caso clínico': q['cat'] = 'Mecanismo'
    if q['id'] == 'cito-076':
        q['pairs'] = [['Colchicina', 'Se une a la tubulina libre e impide polimerizar'], ['Vincristina', 'Impide polimerizar; uso antineoplásico'], ['Paclitaxel (taxano)', 'Estabiliza los microtúbulos'], ['Faloidina', 'Estabiliza la actina F'], ['Citocalasina', 'Bloquea el extremo + de la actina']]
    if q['id'] == 'mito-059':
        q['q'] = 'Una madre tiene una mutación en su ADN mitocondrial. ¿Qué es lo esperable en su descendencia?'
    if q['id'] == 'mito-060':
        q['q'] = 'Un padre con una mutación del ADN mitocondrial la transmite a la mitad de sus hijos.'
    if q['id'] == 'dogma-063':
        q['q'] = '¿Por qué la rifampicina inhibe la transcripción bacteriana y no la de las células humanas?'
assert not any(q['cat'] == 'Caso clínico' for q in Q)
ids = [q['id'] for q in Q]; assert len(ids) == len(set(ids))
for q in Q:
    if q['tipo'] in ('mc', 'id'): assert len(q['opts']) == len(q['why']) == 4, q['id']

import conceptos
SUB = {
 'cito': {'general': 'Generalidades', 'actina': 'Actina', 'miosina': 'Miosina y contracción', 'fi': 'Filamentos intermedios', 'mt': 'Microtúbulos', 'motores': 'Motores y transporte', 'cilios': 'Centrosoma y cilios', 'division': 'División celular', 'integracion': 'Integración y regulación', 'clinica': 'Importancia médica (fármacos)'},
 'mito': {'origen': 'Origen', 'estructura': 'Estructura', 'adn': 'ADN mitocondrial', 'importacion': 'Importación de proteínas', 'cadena': 'Cadena respiratoria', 'gradiente': 'Gradiente', 'sintasa': 'ATP sintasa', 'rendimiento': 'Producción de ATP', 'metabolismo': 'Metabolismo', 'desacople': 'Acoplamiento y desacoplamiento', 'ros': 'ROS y estrés oxidativo', 'apoptosis': 'Apoptosis', 'clinica': 'Importancia médica (fármacos)'},
 'senal': {'principios': 'Principios de la comunicación', 'receptores': 'Tipos de receptores', 'interruptores': 'Interruptores moleculares', 'gpcr': 'Receptores acoplados a proteínas G', 'ampc': 'Vía del AMPc', 'calcio': 'Fosfolipasa C, IP₃ y Ca²⁺', 'rtk': 'Receptores tirosina cinasa', 'intracel': 'Receptores intracelulares y NO', 'integracion': 'Integración y apagado'},
 'reg': {'conceptos': 'Conceptos y tipos de control', 'lac': 'Operón y operón lac', 'mutantes': 'Mutantes y diploides parciales', 'trp': 'Operón trp y atenuación', 'fagos': 'Regulación en fagos', 'cromatina': 'Cromatina y metilación del ADN', 'transcripcional': 'Nivel transcripcional', 'postrans': 'Nivel postranscripcional', 'traduccional': 'Niveles traduccional y postraduccional', 'epigen': 'Mecanismos epigenéticos', 'comparacion': 'Procariotas vs eucariotas'},
 'dogma': {'flujo': 'Flujo de información', 'acidos': 'ADN y ARN', 'replicacion': 'Replicación', 'transcripcion': 'Transcripción', 'procesamiento': 'Procesamiento del ARN', 'traduccion': 'Traducción', 'codigo': 'Código genético', 'mutaciones': 'Mutaciones', 'regulacion': 'Regulación', 'clinica': 'Importancia médica (fármacos)'},
}
for q in Q: assert q['sub'] in SUB[q['tema']], (q['id'], q['sub'])
for t, fs in conceptos.F.items():
    for f in fs: assert f[2] in SUB[t], f
TEMAS = {'cito': 'Citoesqueleto', 'mito': 'Mitocondria', 'dogma': 'Dogma central', 'reg': 'Regulación génica', 'senal': 'Señalización celular'}
LIB = {'cito': libro('cito', 'El citoesqueleto', 'Actina, filamentos intermedios y microtúbulos: estructura, dinámica, motores, cilios y división.'),
       'mito': libro('mito', 'La mitocondria', 'Estructura, cadena respiratoria, ATP sintasa, metabolismo, ROS, apoptosis y herencia.'),
       'senal': libro('senal', 'Comunicación celular y señalización', 'Formas de comunicación, receptores, proteínas G, AMPc, Ca²⁺, tirosina cinasas y receptores nucleares.'),
       'reg': libro('reg', 'Regulación de la expresión génica', 'Operones lac y trp, atenuación, fagos, niveles eucariotas y mecanismos epigenéticos.'),
       'dogma': libro('dogma', 'El dogma central', 'Replicación, transcripción, procesamiento, traducción, código genético, mutaciones y regulación.')}
open(f'{OUT}/libro.js', 'w').write('window.LIBRO=' + json.dumps(LIB, ensure_ascii=False) + ';')
# ---------- metadatos para las funciones adaptativas ----------
import unicodedata
def nrm(x):
    x = unicodedata.normalize('NFD', re.sub(r'<[^>]+>', ' ', str(x)))
    return re.sub(r'\s+', ' ', ''.join(c for c in x if unicodedata.category(c) != 'Mn').lower()).strip()
def keys(term):
    t = nrm(term); ks = {t}
    for part in re.split(r'[/()·,]| o ', t):
        part = part.strip()
        if len(part) >= 4: ks.add(part)
    return ks
def found(k, txt): return re.search(r'(?<![a-z0-9])' + re.escape(k) + r'(?![a-z0-9])', txt)
# concepto de cada pregunta: el del autor o, si falta, el término del banco de conceptos que aparece en el enunciado
nauto = 0
for q in Q:
    if q.get('concepto'): q['con'] = q['concepto']; continue
    txt = nrm(q['q']); best = None
    for f in conceptos.F[q['tema']]:
        for k in keys(f[0]):
            if found(k, txt) and (not best or len(k) > len(best[1])): best = (f[0], k)
    if best: q['con'] = best[0]; nauto += 1
# bloques del libro (sección, encabezado) con texto plano y número de palabras
BLK = {}
for t, L in LIB.items():
    out = []
    for k, sec in enumerate(L['secciones']):
        parts = re.split(r'<h3>', sec['html'])
        for h, part in enumerate(parts):
            out.append(dict(k=k, h=h - 1, tit=(sec['subs'][h - 1] if h else sec['titulo']), txt=nrm(part), raw=part))
    BLK[t] = out
def locate(t, term):
    best = None
    for b in BLK[t]:
        for kk in keys(term):
            if found(kk, b['txt']):
                score = (3 if found(kk, nrm(b['tit'])) else 2 if re.search(r'<b>[^<]*' + re.escape(term.split(' (')[0]) + r'[^<]*</b>', b['raw'], re.I) else 1, len(kk))
                if not best or score > best[0]: best = (score, [b['k'], b['h']])
        if best and best[0][0] == 3: break
    return best[1] if best else None
CONLOC = {t: {} for t in LIB}
for t in LIB:
    terms = {f[0] for f in conceptos.F[t]} | {q['con'] for q in Q if q['tema'] == t and q.get('con')}
    for term in sorted(terms):
        loc = locate(t, term)
        if loc: CONLOC[t][term] = loc
HW = {t: {f"{b['k']}.{b['h']}": len(b['txt'].split()) for b in BLK[t]} for t in LIB}
# tablas comparativas del libro
COLENT = ('', 'caracteristica', 'funcion')
TABLAS = []
for t, L in LIB.items():
    for k, sec in enumerate(L['secciones']):
        parts = re.split(r'<h3>', sec['html'])
        for h, part in enumerate(parts):
            for tb in re.findall(r'<table class="cmp">(.*?)</table>', part, re.S):
                rows = [[re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', c)).strip() for c in re.findall(r'<t[hd][^>]*>(.*?)</t[hd]>', r, re.S)] for r in re.findall(r'<tr>(.*?)</tr>', tb, re.S)]
                head, body = rows[0], rows[1:]
                if nrm(head[0]).startswith('error frecuente') or all(re.fullmatch(r'\d+', r[0]) for r in body): continue
                modo = 'col' if nrm(head[0]) in COLENT else 'col0' if nrm(head[0]) == 'procariotas' else 'row'
                TABLAS.append(dict(t=t, k=k, h=h - 1, tit=(sec['subs'][h - 1] if h else sec['titulo']), modo=modo, head=head, rows=body))
SUBLOC = {t: {s: list(v) for s, v in d.items()} for t, d in extras.SUBLOC.items()}
for t in SUB: assert set(SUB[t]) == set(SUBLOC[t]), t
NQ = {t: {s: sum(1 for q in Q if q['tema'] == t and q['sub'] == s) for s in SUB[t]} for t in SUB}
META = dict(TEMAS=TEMAS, SUBTEMAS=SUB, SUBLOC=SUBLOC, IMP=extras.IMP, MAPAS=extras.MAPAS, PASOS=extras.PASOS,
            CONLOC=CONLOC, HW=HW, TABLAS=TABLAS, NQ=NQ,
            SECS={t: [dict(t=s['titulo'], h=s['subs']) for s in L['secciones']] for t, L in LIB.items()})
open(f'{OUT}/banco.js', 'w').write('window.BANCO=' + json.dumps(Q, ensure_ascii=False) + ';\nwindow.CONCEPTOS=' + json.dumps(conceptos.F, ensure_ascii=False)
     + ';\nwindow.SECUENCIAS=' + json.dumps(conceptos.S, ensure_ascii=False) + ';\nwindow.SUBTEMAS=' + json.dumps(SUB, ensure_ascii=False) + ';\nwindow.TEMAS=' + json.dumps(TEMAS, ensure_ascii=False) + ';')
open(f'{OUT}/meta.js', 'w').write('window.META=' + json.dumps(META, ensure_ascii=False) + ';')
print('conceptos auto', nauto, 'con concepto', sum(1 for q in Q if q.get('con')), 'conloc', {t: len(v) for t, v in CONLOC.items()}, 'tablas', len(TABLAS))
from collections import Counter
print('preguntas', len(Q), Counter(q['tema'] for q in Q), Counter(q['tipo'] for q in Q))
print('dif', Counter((q['tema'], q['dif']) for q in Q))
print('libro', {k: (len(v['secciones']), v['palabras']) for k, v in LIB.items()})
