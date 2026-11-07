"""Figuras nuevas para el libro (mismo sistema animado que las presentaciones)."""
from sv import *
import math

def F_microv():
    o = ''
    # microvellosidades vecinas (pequeñas)
    for i, x in enumerate([70, 150]):
        o += p(f'M{x-28},470 L{x-28},210 A28,28 0 0 1 {x+28},210 L{x+28},470', TAND, 4, 'dr', .1 + i*.15)
        for k in (-10, 0, 10):
            o += p(f'M{x+k},460 L{x+k},215', RED, 3, 'dr', .5 + i*.15)
    # microvellosidad principal
    cx = 300
    o += p(f'M{cx-62},500 L{cx-62},140 A62,62 0 0 1 {cx+62},140 L{cx+62},500', TAND, 5, 'dr', .2, t_=1.6)
    xs = [cx-36, cx-18, cx, cx+18, cx+36]
    for i, x in enumerate(xs):
        o += p(f'M{x},545 L{x},120', RED, 4, 'dr', .8 + i*.1, t_=1.4)
    for y in range(160, 500, 38):
        for a, b in zip(xs[:-1], xs[1:]):
            o += p(f'M{a},{y} L{b},{y+8}', OCRE, 2.5, 'dr', 2.2)
    for y in range(180, 500, 64):
        o += p(f'M{cx-36},{y} L{cx-62},{y-10}', COB, 2.5, 'dr', 2.5) + p(f'M{cx+36},{y} L{cx+62},{y-10}', COB, 2.5, 'dr', 2.5)
    # velo terminal
    o += r(30, 500, 450, 60, '#f4d6cf', 'none', 0, 10, 'fi', 1.6)
    for k in range(7):
        o += p(f'M{60+k*60},510 L{100+k*60},552', RED, 2, 'dr', 1.8) + p(f'M{100+k*60},510 L{60+k*60},552', RED, 2, 'dr', 1.8)
    # etiquetas
    labs = [(110, 'extremo + de la actina en la punta', cx, 125, 2.8), (210, 'haz de 20–30 filamentos paralelos', cx+36, 220, 3.0),
            (300, 'fimbrina y villina unen el haz (ocre)', cx+27, 300, 3.2), (390, 'puentes laterales a la membrana (azul)', cx+50, 372, 3.4),
            (480, 'membrana plasmática', cx+62, 470, 3.6), (560, 'velo terminal (actina y espectrina)', 470, 535, 3.8)]
    for y, s, px, py, d in labs:
        o += p(f'M500,{y-6} L{px+4},{py}', MUT, 1.5, 'dr', d) + t(508, y, s, 18, INK, 'start', 600, 'fi', d)
    return svg(o, label='Microvellosidad con su haz de actina, proteínas que lo unen y velo terminal')

def _myo(px, py, state, d):
    o = r(px, py, 420, 250, CARD, LINE, 2, 14, 'fi', d)
    o += r(px + 30, py + 40, 360, 16, '#c9d4fa', COB, 2, 8, 'fi', d + .1)
    shift = -26 if state == 4 else 0
    beads = ''.join(f'<circle cx="{px + 40 + k*22 + shift}" cy="{py + 190}" r="10" fill="{LRED}" stroke="{RED}" stroke-width="2"/>' for k in range(16))
    o += f'<g class="mv1" style="--d:{d+.6}s;--t:1.2s;--dx:{-shift}px;--dy:0px">{beads}</g>' if state == 4 else g(beads, 'fi', d + .1)
    ax, ay = px + 210, py + 58
    head = {1: (px + 160, py + 166), 2: (px + 200, py + 128), 3: (px + 248, py + 164), 4: (px + 160, py + 166)}[state]
    o += p(f'M{ax},{ay} L{head[0]},{head[1]}', COB, 6, 'dr', d + .3)
    o += f'<ellipse cx="{head[0]}" cy="{head[1]}" rx="28" ry="17" fill="{LCOB}" stroke="{COB}" stroke-width="3"{st("pp", d + .5)}/>'
    return o

def F_miociclo():
    o = ''
    P = [(10, 10, 1, 'Rigor: cabeza unida, sin nucleótido'), (490, 10, 2, 'Se une ATP: la cabeza se suelta'), (490, 320, 3, 'Hidrólisis: la cabeza se "arma" (ADP + Pᵢ)'), (10, 320, 4, 'Sale el Pᵢ: golpe de fuerza; luego sale el ADP')]
    for i, (px, py, s, lab) in enumerate(P):
        d = .2 + i*.9
        o += _myo(px, py, s, d)
        o += t(px + 210, py + 236, lab, 17, INK, 'middle', 700, 'fi', d + .6)
        o += c(px + 26, py + 22, 15, COB, 'none', 0, 'pp', d) + t(px + 26, py + 28, str(i + 1), 16, '#fff', 'middle', 700, 'fi', d)
    o += chip_t(460, 95, 'ATP', GREEN, 1.4)
    o += chip_t(785, 290, 'ADP·Pᵢ', COB, 2.3)
    o += arrow(435, 130, 485, 130, OCRE, 4, 'dr', 1.0) + arrow(700, 265, 700, 315, OCRE, 4, 'dr', 1.9)
    o += arrow(485, 445, 435, 445, OCRE, 4, 'dr', 2.8) + arrow(220, 315, 220, 265, OCRE, 4, 'dr', 3.6)
    o += t(330, 400, '← la actina se desplaza', 16, RED, 'middle', 700, 'fi', 3.6)
    return svg(o, 920, 590, 'Ciclo de la miosina sobre la actina en cuatro pasos')

def chip_t(x, y, s, col, d):
    w = len(s)*11 + 30
    return f'<g{st("pp", d)}><rect x="{x - w/2}" y="{y-15}" width="{w}" height="30" rx="15" fill="{col}"/><text x="{x}" y="{y+6}" font-size="16" fill="#fff" text-anchor="middle" font-weight="700">{s}</text></g>'

def F_movcel():
    o = p('M20,470 L900,470', MUT, 3, 'dr', 0) + t(30, 500, 'sustrato (matriz extracelular)', 16, MUT, 'start', 600, 'fi', 0)
    body = 'M110,470 C110,360 200,300 330,300 C450,300 560,380 660,430 L820,452 C840,456 840,470 820,470 Z'
    o += f'<path d="{body}" fill="#fbf6ea" stroke="{INK}" stroke-width="3"{st("pp", .2)}/>'
    o += e(320, 395, 70, 45, LCOB, COB, 2.5, 'pp', .4) + t(320, 401, 'núcleo', 16, COB, 'middle', 700, 'fi', .5)
    for k in range(10):
        x = 680 + k*14
        o += p(f'M{x},464 l{14 + (k % 3)*4},-{12 + (k % 2)*8}', RED, 2.5, 'dr', 1.0 + k*.05)
        o += p(f'M{x+8},458 l{-10},-{10}', RED, 2, 'dr', 1.1 + k*.05)
    for k, (dx, dy) in enumerate([(60, -8), (70, 0), (55, -16)]):
        o += p(f'M820,{460 + k*4 - 8} l{dx},{dy}', RED, 3, 'dr', 1.6 + k*.1)
    o += t(770, 380, '① protrusión: lamelipodio', 17, RED, 'middle', 700, 'fi', 1.3) + t(770, 400, '(red ramificada, Arp2/3)', 14, MUT, 'middle', 600, 'fi', 1.3)
    o += t(870, 420, 'filopodios', 15, RED, 'middle', 700, 'fi', 1.8)
    for x in (720, 790, 180):
        o += f'<path d="M{x-10},476 L{x+10},476 L{x},462 Z" fill="{GREEN}"{st("pp", 2.2)}/>'
    o += t(560, 530, '② adhesiones con integrinas (verde)', 17, GREEN, 'middle', 700, 'fi', 2.3)
    for k in range(3):
        y = 400 + k*20
        o += f'<g{st("pp", 2.8 + k*.1)}><path d="M{150+k*12},{y} l20,-6 l0,12 Z M{210+k*12},{y} l-20,-6 l0,12 Z" fill="{COB}"/></g>'
    o += arrow(140, 350, 190, 380, COB, 3, 'dr', 3.0) + t(150, 290, '③ contracción posterior', 17, COB, 'middle', 700, 'fi', 3.0) + t(150, 310, '(miosina II)', 14, MUT, 'middle', 600, 'fi', 3.0)
    o += t(150, 540, '④ se sueltan las adhesiones traseras', 16, INK, 'middle', 700, 'fi', 3.4)
    o += f'<g class="mv" style="--d:3.6s;--t:2.4s;--dx:120px;--dy:0px"><path d="M560,230 L640,230" stroke="{OCRE}" stroke-width="6"/><path d="M655,230 L636,220 L636,240 Z" fill="{OCRE}"/></g>'
    o += t(600, 210, 'dirección del movimiento', 16, TAND, 'middle', 700, 'fi', 3.6)
    return svg(o, label='Movimiento celular: protrusión, adhesión, contracción y desprendimiento')

def F_ros():
    o = r(20, 40, 360, 70, '#f1dca8', TAND, 2, 8, 'fi', 0) + t(30, 30, 'membrana interna', 15, TAND, 'start', 700, 'fi', 0)
    o += r(60, 30, 90, 90, LCOB, COB, 3, 14, 'pp', .2) + t(105, 83, 'I', 30, COB, 'middle', 700, 'fi', .3)
    o += r(250, 30, 90, 90, LCOB, COB, 3, 14, 'pp', .4) + t(295, 83, 'III', 30, COB, 'middle', 700, 'fi', .5)
    o += p('M105,125 C110,170 140,200 175,215', OCRE, 3, 'dr', .8) + p('M295,125 C290,170 230,200 200,215', OCRE, 3, 'dr', .9)
    o += t(205, 160, 'e⁻ que escapan', 15, TAND, 'middle', 700, 'fi', 1.0)
    nodes = [(190, 'O₂', MUT, 1.1), (370, 'O₂•⁻', RED, 1.6), (590, 'H₂O₂', TAND, 2.4), (820, 'H₂O', GREEN, 3.2)]
    for x, s, col, d in nodes:
        o += f'<g{st("pp", d)}><circle cx="{x}" cy="245" r="42" fill="#fff" stroke="{col}" stroke-width="4"/><text x="{x}" y="253" font-size="22" fill="{col}" text-anchor="middle" font-weight="700">{s}</text></g>'
    o += arrow(235, 245, 322, 245, OCRE, 4, 'dr', 1.4) + t(278, 228, '+ 1 e⁻', 14, MUT, 'middle', 600, 'fi', 1.4)
    o += t(370, 310, 'superóxido', 15, RED, 'middle', 700, 'fi', 1.7)
    o += arrow(415, 245, 543, 245, OCRE, 4, 'dr', 2.0) + t(479, 225, 'superóxido', 13, COB, 'middle', 700, 'fi', 2.1) + t(479, 205, 'dismutasa', 13, COB, 'middle', 700, 'fi', 2.1)
    o += arrow(635, 245, 773, 245, OCRE, 4, 'dr', 2.8) + t(704, 220, 'catalasa · glutatión', 13, COB, 'middle', 700, 'fi', 2.9)
    o += t(820, 310, 'inocuo', 15, GREEN, 'middle', 700, 'fi', 3.3)
    o += arrow(590, 290, 590, 375, RED, 4, 'dr', 3.5) + t(605, 340, '+ Fe²⁺', 15, RED, 'start', 700, 'fi', 3.5)
    o += f'<g{st("pp", 3.8)}><circle cx="590" cy="415" r="38" fill="{LRED}" stroke="{RED}" stroke-width="4"/><text x="590" y="423" font-size="22" fill="{RED}" text-anchor="middle" font-weight="700">•OH</text></g>'
    o += t(650, 410, 'radical hidroxilo:', 15, RED, 'start', 700, 'fi', 3.9) + t(650, 430, 'el más reactivo', 15, RED, 'start', 600, 'fi', 3.9)
    for i, s in enumerate(['lípidos', 'proteínas', 'ADN mitocondrial']):
        x = 320 + i*200
        o += p(f'M590,455 L{x},500', RED, 2, 'dr', 4.2) + r(x - 85, 505, 170, 46, LRED, RED, 2, 12, 'pp', 4.4 + i*.15) + t(x, 535, s, 17, RED, 'middle', 700, 'fi', 4.5 + i*.15)
    o += t(150, 540, 'daño oxidativo →', 17, INK, 'middle', 700, 'fi', 4.3)
    return svg(o, label='Formación y eliminación de especies reactivas de oxígeno en la mitocondria')

def F_beta():
    cx, cy, R = 300, 330, 150
    o = r(170, 20, 260, 64, CARD, COB, 2.5, 14, 'pp', 0) + t(300, 50, 'Acil-CoA (n carbonos)', 20, INK, 'middle', 700, 'fi', .1) + t(300, 74, 'en la matriz', 15, MUT, 'middle', 600, 'fi', .1)
    o += arrow(300, 88, 300, 170, OCRE, 4, 'dr', .3)
    o += f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="none" stroke="{COB}" stroke-width="5" pathLength="1"{st("dr", .4)}/>'
    steps = [('1. Oxidación', 'FADH₂', TAND), ('2. Hidratación', '+ H₂O', MUT), ('3. Oxidación', 'NADH', COB), ('4. Tiólisis', 'Acetil-CoA', GREEN)]
    for i, (n, out, col) in enumerate(steps):
        a = math.radians(-90 + 90*i + 45)
        x, y = cx + R*math.cos(a), cy + R*math.sin(a)
        d = 1.0 + i*.7
        o += c(x, y, 12, OCRE, 'none', 0, 'pp', d)
        right = math.cos(a) > 0
        lx = x + (22 if right else -22); anc = 'start' if right else 'end'
        o += t(lx, y + 6, n, 18, INK, anc, 700, 'fi', d)
        w = len(out)*11 + 30
        o += chip_t(lx + (w/2 if right else -w/2), y + 40, out, col, d + .3)
    o += t(cx, cy - 8, 'cada vuelta', 18, MUT, 'middle', 600, 'fi', 1.0) + t(cx, cy + 18, 'quita 2 carbonos', 18, INK, 'middle', 700, 'fi', 1.0)
    o += r(600, 110, 300, 330, CARD, LINE, 2, 16, 'fi', 3.6)
    o += tl(750, 150, ['Enzimas:', '1. acil-CoA deshidrogenasa', '2. enoil-CoA hidratasa', '3. hidroxiacil-CoA', '    deshidrogenasa', '4. tiolasa (+ CoA)', '', 'Por vuelta:', '1 FADH₂ · 1 NADH · 1 acetil-CoA', '', 'El acil-CoA (n − 2 C) vuelve', 'a empezar; el acetil-CoA', 'entra al ciclo de Krebs.'], 16, INK, 'middle', 600, 'fi', 3.8)
    return svg(o, label='Ciclo de la beta oxidación de los ácidos grasos')

def F_marco():
    rows = [('ARNm original', ['AUG', 'GAA', 'UGG', 'CAU', 'UAA'], ['Met', 'Glu', 'Trp', 'His', 'Paro'], None, INK),
            ('Silenciosa', ['AUG', 'GAG', 'UGG', 'CAU', 'UAA'], ['Met', 'Glu', 'Trp', 'His', 'Paro'], 1, GREEN),
            ('Missense', ['AUG', 'GUA', 'UGG', 'CAU', 'UAA'], ['Met', 'Val', 'Trp', 'His', 'Paro'], 1, TAND),
            ('Nonsense', ['AUG', 'GAA', 'UGA'], ['Met', 'Glu', 'Paro'], 2, RED),
            ('Frameshift (+A)', ['AUG', 'AGA', 'AUG', 'GCA', 'UUA'], ['Met', 'Arg', 'Met', 'Ala', 'Leu…'], 'all', RED)]
    o = ''
    for k, (lab, cods, aas, hi, col) in enumerate(rows):
        y = 30 + k*110; d = .2 + k*.7
        o += t(30, y + 32, lab, 19, col, 'start', 700, 'fi', d)
        for j, (cd, aa) in enumerate(zip(cods, aas)):
            x = 220 + j*135
            mark = hi == j or (hi == 'all' and j >= 1)
            o += r(x, y + 5, 110, 44, LRED if mark else LCOB, RED if mark else COB, 2.5, 8, 'pp', d + .1 + j*.08)
            o += t(x + 55, y + 35, cd, 20, RED if mark else COB, 'middle', 700, 'fi', d + .1 + j*.08)
            o += t(x + 55, y + 75, aa, 16, INK, 'middle', 600, 'fi', d + .2 + j*.08)
        if lab == 'Nonsense':
            o += t(640, y + 35, 'proteína truncada', 17, RED, 'start', 700, 'fi', d + .4)
    o += t(460, 585, 'Se lee de tres en tres desde el AUG; una inserción de 1 nt cambia todos los codones siguientes', 15, MUT, 'middle', 600, 'fi', 3.6, True)
    return svg(o, 920, 600, 'Tipos de mutaciones vistos sobre el marco de lectura')

def F_lac():
    def dna(y, d):
        s = p(f'M30,{y} L890,{y}', COB, 6, 'dr', d)
        parts = [('P', 90, 70, LOCRE, TAND), ('O', 165, 55, LRED, RED), ('lacZ', 225, 250, LCOB, COB), ('lacY', 480, 200, LCOB, COB), ('lacA', 685, 170, LCOB, COB)]
        for n, x, w, f, col in parts:
            s += r(x, y - 20, w, 40, f, col, 2, 6, 'fi', d + .2) + t(x + w/2, y + 6, n, 16, col, 'middle', 700, 'fi', d + .3)
        return s
    o = t(30, 40, 'Sin lactosa: el operón está apagado', 20, RED, 'start', 700, 'fi', 0)
    o += dna(150, .1)
    o += e(192, 110, 42, 26, '#e9b3a6', RED, 3, 'pp', .8) + t(192, 116, 'represor', 13, RED, 'middle', 700, 'fi', .9)
    o += e(110, 95, 50, 30, LCOB, COB, 3, 'pp', 1.0) + t(110, 101, 'ARN pol', 14, COB, 'middle', 700, 'fi', 1.1)
    o += p('M150,60 L175,85 M175,60 L150,85', RED, 4, 'dr', 1.4) + t(260, 75, 'la polimerasa no puede avanzar', 15, RED, 'start', 600, 'fi', 1.4)
    o += p('M20,230 L900,230', LINE, 2, 'dr', 1.6)
    o += t(30, 280, 'Con lactosa: el operón se enciende', 20, GREEN, 'start', 700, 'fi', 1.8)
    o += dna(400, 1.9)
    o += f'<g class="mv1" style="--d:2.6s;--t:1.6s;--dx:-650px;--dy:60px"><ellipse cx="842" cy="300" rx="42" ry="26" fill="#e9b3a6" stroke="{RED}" stroke-width="3"/><text x="842" y="306" font-size="13" text-anchor="middle" font-weight="700" fill="{RED}">represor</text><polygon points="882,282 896,290 896,306 882,314 868,306 868,290" fill="{OCRE}"/></g>'
    o += t(330, 312, 'la alolactosa (ocre) se une al represor y lo suelta', 15, TAND, 'start', 600, 'fi', 2.8)
    o += f'<g class="mv1" style="--d:3.2s;--t:2s;--dx:-560px;--dy:0px"><ellipse cx="670" cy="345" rx="50" ry="30" fill="{LCOB}" stroke="{COB}" stroke-width="3"/><text x="670" y="351" font-size="14" text-anchor="middle" font-weight="700" fill="{COB}">ARN pol</text></g>'
    o += p('M230,470 L860,470', TAND, 6, 'dr', 3.6, t_=1.8)
    o += t(545, 505, 'un solo ARNm policistrónico con lacZ, lacY y lacA', 16, TAND, 'middle', 700, 'fi', 4.2)
    o += t(460, 560, 'P = promotor · O = operador', 15, MUT, 'middle', 600, 'fi', 4.4)
    return svg(o, label='Operón lac apagado sin lactosa y encendido con lactosa')

# ---------- Diapositivas del profesor: contracción regulada por Ca2+ ----------
def _actin_row(x0, y, n, d):
    s = ''
    for k in range(n):
        x = x0 + k*30
        s += f'<circle cx="{x}" cy="{y + (8 if k % 2 else -8)}" r="14" fill="{LRED}" stroke="{RED}" stroke-width="2"/>'
    return g(s, 'fi', d)

def _panel_tropo(py, ca, d):
    o = r(20, py, 880, 265, CARD, LINE, 2, 14, 'fi', d)
    o += t(40, py + 34, 'Con Ca²⁺ elevado' if ca else 'En reposo (Ca²⁺ bajo)', 21, GREEN if ca else RED, 'start', 700, 'fi', d + .1)
    o += _actin_row(80, py + 150, 26, d + .2)
    trop = p(f'M70,{py+150} C250,{py+128} 450,{py+172} 860,{py+146}', TAND, 9, 'dr', d + .5)
    tn = ''.join(c(x, py + 132, 11, GREEN, '#fff', 2, 'pp', d + .9 + i*.1) + c(x + 16, py + 126, 9, '#6fbf98', '#fff', 2, 'pp', d + .95 + i*.1) for i, x in enumerate((230, 640)))
    if ca:
        o += f'<g class="mv1" style="--d:{d+1.6}s;--t:1.2s;--dx:0px;--dy:16px">{trop}{tn}</g>'
        for i, x in enumerate((230, 640)):
            o += mover(f'<g><circle cx="{x+44}" cy="{py+78}" r="12" fill="{OCRE}"/><text x="{x+44}" y="{py+83}" font-size="11" text-anchor="middle" font-weight="700" fill="{INK}">Ca</text></g>', -22, 40, d + 1.0 + i*.2, 1.2)
        # cabeza de miosina se une
        o += r(330, py + 46, 260, 14, '#c9d4fa', COB, 2, 7, 'fi', d + .1)
        head = f'<path d="M470,{py+60} L462,{py+92}" stroke="{COB}" stroke-width="6"/><ellipse cx="458" cy="{py+104}" rx="20" ry="14" fill="{COB}"/>'
        o += f'<g class="mv1" style="--d:{d+2.4}s;--t:1s;--dx:0px;--dy:14px">{head}</g>'
        o += t(610, py + 58, 'la miosina ya puede unirse', 17, COB, 'start', 700, 'fi', d + 2.8)
        o += t(460, py + 240, 'El Ca²⁺ se une a la troponina → cambio conformacional → la tropomiosina se desplaza del surco', 16, INK, 'middle', 600, 'fi', d + 3.0)
    else:
        o += trop + tn
        o += r(330, py + 46, 260, 14, '#c9d4fa', COB, 2, 7, 'fi', d + .1)
        head = f'<path d="M470,{py+60} L462,{py+92}" stroke="{COB}" stroke-width="6"/><ellipse cx="458" cy="{py+104}" rx="20" ry="14" fill="{COB}" opacity=".85"/>'
        o += g(head, 'pp', d + 1.3) + t(500, py + 112, '✕', 26, RED, 'middle', 700, 'pp', d + 1.6)
        o += t(610, py + 58, 'la miosina no puede unirse', 17, RED, 'start', 700, 'fi', d + 1.6)
        o += t(260, py + 206, 'troponina (verde)', 15, GREEN, 'middle', 700, 'fi', d + 1.1)
        o += t(760, py + 206, 'tropomiosina (ocre) en el surco', 15, TAND, 'middle', 700, 'fi', d + .8)
        o += t(460, py + 240, 'La tropomiosina cubre los sitios de unión de la miosina en ~7 monómeros de actina', 16, INK, 'middle', 600, 'fi', d + 1.8)
    return o

def F_tropo():
    o = _panel_tropo(15, False, .1) + _panel_tropo(305, True, 2.2)
    return svg(o, label='Tropomiosina y troponina: en reposo bloquean a la miosina; el Ca2+ las desplaza')

def F_calcio():
    o = ''
    # dibujo: membrana / túbulo T, retículo sarcoplásmico con Ca2+, salida al citosol
    o += r(20, 30, 290, 46, '#e9eefc', COB, 2, 8, 'fi', .1) + t(36, 59, 'membrana plasmática', 15, COB, 'start', 700, 'fi', .2)
    o += f'<g class="pu" style="--d:.6s"><path d="M262,96 l14,-24 l-6,0 l10,-20 l-4,22 l6,0 Z" fill="{OCRE}"/></g>'
    o += t(250, 112, 'excitación eléctrica', 14, TAND, 'end', 700, 'fi', .6)
    o += f'<path d="M40,150 C40,125 290,125 290,150 L290,260 C290,285 40,285 40,260 Z" fill="#fbe9c6" stroke="{TAND}" stroke-width="3"{st("pp", .4)}/>'
    o += t(165, 162, 'retículo sarcoplásmico', 15, TAND, 'middle', 700, 'fi', .5)
    import random
    random.seed(4)
    for k in range(14):
        x, y = random.randint(65, 265), random.randint(180, 252)
        o += c(x, y, 6, OCRE, TAND, 1, 'pp', .7 + k*.03)
    o += r(140, 276, 50, 22, GREEN, 'none', 0, 6, 'pp', 1.2) + t(202, 296, 'canal de Ca²⁺', 14, GREEN, 'start', 700, 'fi', 1.3) + t(202, 313, 'se abre', 14, GREEN, 'start', 700, 'fi', 1.3)
    for k in range(6):
        o += mover(c(165 + (k - 3)*10, 290, 6, OCRE, TAND, 1, 'fi', 0), (k - 3)*12, 205, 1.6 + k*.15, 1.6)
    o += _actin_row(40, 520, 9, 1.4)
    o += p('M30,520 C120,505 200,535 310,515', TAND, 6, 'dr', 1.5)
    o += t(165, 570, 'filamento de actina (citosol)', 14, RED, 'middle', 700, 'fi', 1.5)
    steps = [('Excitación eléctrica', 'cambio de voltaje en la membrana'),
             ('Se abren canales del RS', 'el RS almacena mucho Ca²⁺'),
             ('Sube el Ca²⁺ en el citosol', 'señal intracelular universal'),
             ('Ca²⁺ se une a la troponina', '"interruptor molecular"'),
             ('La tropomiosina se desplaza', 'quedan libres los sitios de unión'),
             ('Miosina + actina: contracción', 'ciclo de la miosina con ATP')]
    o += flow(steps, 340, 18, 560, 74, 22, .3, [CARD, '#fbe9c6', '#fbe9c6', LGREEN, LOCRE, LCOB])
    return svg(o, label='La contracción muscular se inicia por un aumento repentino de Ca2+ liberado del retículo sarcoplásmico')
