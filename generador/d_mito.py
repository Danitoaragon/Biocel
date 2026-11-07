from sv import *
import math

# ---------- piezas reutilizables ----------
def mito_small(x, y, s=1.0, d=0, cls='pp'):
    inner = (f'<ellipse cx="0" cy="0" rx="70" ry="34" fill="#f3e3bf" stroke="{TAND}" stroke-width="3"/>'
             f'<ellipse cx="0" cy="0" rx="60" ry="25" fill="#fbefd2" stroke="{TAND}" stroke-width="2.5"/>')
    for i, xx in enumerate([-40, -20, 0, 20, 40]):
        y0, y1 = (-25, 2) if i % 2 == 0 else (25, -2)
        yy0 = -math.sqrt(max(0, 1 - (xx/60)**2)) * 25 if i % 2 == 0 else math.sqrt(max(0, 1 - (xx/60)**2)) * 25
        inner += f'<path d="M{xx},{yy0:.1f} L{xx},{y1}" stroke="{TAND}" stroke-width="5" stroke-linecap="round"/>'
    return f'<g transform="translate({x},{y}) scale({s})"><g{st(cls, d)}>{inner}</g></g>'

def membrane(y0, y1, x0=20, x1=900, d=0, label=True):
    out = r(x0, y0, x1 - x0, y1 - y0, '#f1dca8', 'none', 0, 6, 'fi', d)
    out += p(f'M{x0},{y0} L{x1},{y0}', TAND, 4, 'dr', d) + p(f'M{x0},{y1} L{x1},{y1}', TAND, 4, 'dr', d)
    return out

def hp(x, y, size=22, col=RED):
    return f'<text x="{x}" y="{y}" font-size="{size}" font-weight="700" fill="{col}" text-anchor="middle">H⁺</text>'

def big_mito(d=0):
    cx, cy, RX, RY = 430, 300, 370, 180
    out = f'<ellipse cx="{cx}" cy="{cy}" rx="{RX}" ry="{RY}" fill="#f3e3bf" stroke="{TAND}" stroke-width="6" pathLength="1"{st("dr", d)}/>'
    rx, ry = RX - 26, RY - 24
    out += f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="#fbefd2" stroke="{TAND}" stroke-width="5" pathLength="1"{st("dr", d + .5)}/>'
    cr = ''
    xs = [-260, -170, -80, 10, 100, 190, 270]
    for i, dx in enumerate(xs):
        yb = ry * math.sqrt(1 - (dx/rx)**2)
        top = i % 2 == 0
        depth = 0.62 * yb * 2 * 0.55
        if top:
            y0 = cy - yb; y1 = y0 + depth
            cr += f'<rect x="{cx+dx-13}" y="{y0-5:.1f}" width="26" height="{depth+5:.1f}" rx="13" fill="#f3e3bf"/>'
            cr += f'<path d="M{cx+dx-13},{y0+1:.1f} L{cx+dx-13},{y1-13:.1f} A13,13 0 0 0 {cx+dx+13},{y1-13:.1f} L{cx+dx+13},{y0+1:.1f}" fill="none" stroke="{TAND}" stroke-width="5"/>'
        else:
            y0 = cy + yb; y1 = y0 - depth
            cr += f'<rect x="{cx+dx-13}" y="{y1:.1f}" width="26" height="{depth+5:.1f}" rx="13" fill="#f3e3bf"/>'
            cr += f'<path d="M{cx+dx-13},{y0-1:.1f} L{cx+dx-13},{y1+13:.1f} A13,13 0 0 1 {cx+dx+13},{y1+13:.1f} L{cx+dx+13},{y0-1:.1f}" fill="none" stroke="{TAND}" stroke-width="5"/>'
    out += g(cr, 'fi', d + 1.1)
    return out

# ---------- figuras ----------
def F_para_que():
    o = e(440, 300, 400, 250, '#fbf6ea', COB, 3, 'fi', 0)
    o += c(300, 300, 85, LCOB, COB, 3, 'pp', .2) + t(300, 308, 'núcleo', 24, COB, 'middle', 700, 'fi', .4)
    for (x, y, rot, dl) in [(560, 170, -20, .4), (640, 400, 15, .5), (220, 470, 10, .6), (460, 450, -10, .7)]:
        o += f'<g transform="rotate({rot} {x} {y})">{mito_small(x, y, .8, dl)}</g>'
    o += mito_small(640, 270, 1.15, .9)
    o += r(30, 30, 230, 64, CARD, OCRE, 2.5, 12, 'pp', 1.2) + t(145, 70, 'glucosa · grasas', 22, INK, 'middle', 700, 'fi', 1.3)
    o += r(30, 110, 230, 52, CARD, OCRE, 2.5, 12, 'pp', 1.35) + t(145, 145, 'O₂', 24, INK, 'middle', 700, 'fi', 1.45)
    o += carrow('M260,70 C420,60 520,140 585,240', 585, 240, 60, OCRE, 4, 1.5)
    o += carrow('M260,136 C400,150 500,190 580,255', 580, 255, 40, OCRE, 4, 1.7)
    for i in range(5):
        o += mover(f'<g transform="translate(715,265)"><rect x="-26" y="-15" width="52" height="30" rx="15" fill="{GREEN}"/><text x="0" y="7" font-size="17" fill="#fff" text-anchor="middle" font-weight="700">ATP</text></g>', 150, -150 + i*60, 2.4 + i*.5, 2.6)
    o += t(740, 560, 'ATP para toda la célula', 22, GREEN, 'middle', 700, 'fi', 2.6)
    o += t(640, 340, 'mitocondria', 22, TAND, 'middle', 700, 'fi', 1.0)
    return svg(o, label='Célula con mitocondrias que convierten glucosa, grasas y oxígeno en ATP')

def F_atp():
    o = ''
    # adenina
    o += f'<polygon points="90,170 140,140 190,170 190,230 140,260 90,230" fill="{LCOB}" stroke="{COB}" stroke-width="3"{st("pp", .1)}/>'
    o += t(140, 208, 'adenina', 22, COB, 'middle', 700, 'fi', .3)
    o += f'<polygon points="215,300 265,262 315,300 297,360 233,360" fill="{LOCRE}" stroke="{TAND}" stroke-width="3"{st("pp", .4)}/>'
    o += t(265, 322, 'ribosa', 22, TAND, 'middle', 700, 'fi', .6)
    o += p('M175,245 L232,282', INK, 3, 'dr', .5)
    xs = [400, 520, 640]
    o += p('M315,300 L370,300', INK, 3, 'dr', .7)
    for i, x in enumerate(xs):
        o += c(x, 300, 34, '#fff', COB, 3, 'pp', .8 + i*.2) + t(x, 309, 'P', 26, COB, 'middle', 700, 'fi', .9 + i*.2)
        o += t(x, 360, ['α', 'β', 'γ'][i], 24, MUT, 'middle', 700, 'fi', .9 + i*.2)
    o += p('M434,300 L486,300', INK, 3, 'dr', 1.0) + p('M554,300 L606,300', OCRE, 6, 'dr', 1.2)
    o += t(580, 230, 'enlace de alta energía', 18, TAND, 'middle', 700, 'fi', 1.5) + p('M580,238 L580,290', TAND, 2, 'dr', 1.5)
    o += f'<g class="mv1" style="--d:2.3s;--t:1.4s;--dx:-150px;--dy:0px"><g transform="translate(150,0)"></g></g>'
    o += f'<g class="pp" style="--d:2.4s"><text x="780" y="260" font-size="26" fill="{RED}" font-weight="700" text-anchor="middle">+ H₂O</text></g>'
    o += arrow(140, 430, 760, 430, OCRE, 4, 'dr', 2.6)
    o += t(450, 470, 'hidrólisis: ATP + H₂O → ADP + Pᵢ + energía', 26, INK, 'middle', 700, 'fi', 3.0)
    o += f'<g class="pu" style="--d:3.4s"><text x="450" y="540" font-size="26" fill="{GREEN}" text-anchor="middle" font-weight="700">esa energía paga contracción, transporte y síntesis</text></g>'
    o += t(450, 540, '', 1)
    return svg(o, label='Estructura del ATP: adenina, ribosa y tres fosfatos')

def F_endo():
    o = ''
    o += c(170, 300, 140, '#fbf6ea', COB, 3, 'pp', .1) + c(130, 280, 45, LCOB, COB, 2, 'pp', .3) + t(170, 480, '1. célula ancestral', 22, INK, 'middle', 700, 'fi', .4)
    o += f'<g class="mv1" style="--d:.6s;--t:1.6s;--dx:-90px;--dy:-120px"><rect x="235" y="300" width="60" height="30" rx="15" fill="{LGREEN}" stroke="{GREEN}" stroke-width="3"/></g>'
    o += t(300, 250, 'bacteria aerobia', 20, GREEN, 'middle', 700, 'fi', .7)
    o += arrow(330, 300, 390, 300, OCRE, 4, 'dr', 1.6)
    o += c(520, 300, 120, '#fbf6ea', COB, 3, 'pp', 1.8) + c(480, 270, 38, LCOB, COB, 2, 'pp', 1.9)
    o += f'<rect x="540" y="310" width="66" height="34" rx="17" fill="{LGREEN}" stroke="{GREEN}" stroke-width="3"{st("pp", 2.0)}/>'
    o += f'<rect x="532" y="302" width="82" height="50" rx="25" fill="none" stroke="{COB}" stroke-width="3" pathLength="1"{st("dr", 2.3)}/>'
    o += tl(520, 470, ['2. la engulle y queda', 'con doble membrana'], 20, INK, 'middle', 700, 'fi', 2.4)
    o += arrow(650, 300, 700, 300, OCRE, 4, 'dr', 2.8)
    o += mito_small(800, 300, 1.15, 3.0)
    o += tl(800, 470, ['3. mitocondria'], 22, INK, 'middle', 700, 'fi', 3.2)
    o += t(800, 375, 'ADN propio + ribosomas', 18, TAND, 'middle', 700, 'fi', 3.4)
    return svg(o, label='Origen endosimbiótico de la mitocondria en tres pasos')

def F_estructura():
    o = big_mito(0)
    o += f'<circle cx="300" cy="300" r="34" fill="none" stroke="{COB}" stroke-width="4" pathLength="1"{st("dr", 1.8)}/>'
    for (x, y) in [(560, 290), (585, 305), (610, 285), (380, 330), (230, 260)]:
        o += c(x, y, 6, COB, 'none', 0, 'pp', 2.0)
    labs = [
        (120, 50, 'Membrana externa', 150, 135, .0),
        (470, 50, 'Espacio intermembrana', 500, 128, .2),
        (840, 50, 'Crestas', 700, 180, .4),
        (120, 565, 'Membrana interna', 200, 430, .6),
        (470, 565, 'Matriz', 470, 380, .8),
        (840, 565, 'ADNmt y ribosomas', 600, 310, 1.0),
    ]
    for (lx, ly, s, px, py, dd) in labs:
        o += p(f'M{lx},{ly + (12 if ly < 300 else -32)} L{px},{py}', INK, 2, 'dr', 2.2 + dd)
        o += t(lx, ly, s, 23, INK, 'middle', 700, 'fi', 2.2 + dd)
    return svg(o, label='Corte de una mitocondria con sus regiones')

def F_matriz():
    o = f'<ellipse cx="460" cy="300" rx="420" ry="250" fill="#f3e3bf" stroke="{TAND}" stroke-width="6"{st("pp", 0)}/>'
    o += f'<ellipse cx="460" cy="300" rx="390" ry="222" fill="#fbefd2" stroke="{TAND}" stroke-width="5"{st("pp", .2)}/>'
    chips = [('Ciclo de Krebs', 300, 200), ('Piruvato deshidrogenasa', 620, 200), ('β-oxidación de ácidos grasos', 460, 300),
             ('ADN mitocondrial', 280, 400), ('Ribosomas y ARNt propios', 640, 400)]
    for i, (s, x, y) in enumerate(chips):
        w = len(s) * 12.5 + 40
        o += r(x - w/2, y - 30, w, 60, CARD, COB, 2.5, 30, 'pp', .5 + i*.3) + t(x, y + 8, s, 24, COB, 'middle', 700, 'fi', .6 + i*.3)
    return svg(o, label='Contenido de la matriz mitocondrial')

def F_adnmt():
    o = f'<circle cx="250" cy="295" r="170" fill="none" stroke="{SOFT}" stroke-width="34"{st("fi", 0)}/>'
    segs = [(0, .30, COB), (.30, .62, OCRE), (.62, .80, GREEN), (.80, 1.0, COB)]
    for i, (a0, a1, col) in enumerate(segs):
        circ = 2 * math.pi * 170
        o += (f'<circle cx="250" cy="295" r="170" fill="none" stroke="{col}" stroke-width="34" pathLength="1" '
              f'stroke-dasharray="{a1-a0:.3f} {1-(a1-a0):.3f}" stroke-dashoffset="{-a0:.3f}" transform="rotate(-90 250 295)"{st("fi", .3 + i*.25)}/>')
    o += counter(250, 290, 16569, 46, INK, 'middle', .4)
    o += t(250, 330, 'pares de bases', 22, MUT, 'middle', 600, 'fi', .5)
    o += t(250, 520, 'círculo cerrado, sin histonas', 22, INK, 'middle', 600, 'fi', 1.0)
    rows = [('genes en total', 37, INK), ('proteínas de la cadena respiratoria', 13, COB), ('ARN de transferencia', 22, OCRE), ('ARN ribosomales', 2, GREEN)]
    for i, (s, n, col) in enumerate(rows):
        y = 150 + i*95
        o += counter(560, y, n, 52, col, 'end', .8 + i*.3)
        o += t(580, y - 6, s, 22, INK, 'start', 600, 'fi', .9 + i*.3)
    o += p('M520,170 L880,170', LINE, 2, 'dr', 1.0)
    o += t(700, 540, 'la colorida cinta del círculo es ilustrativa, no un mapa', 16, MUT, 'middle', 500, 'fi', 1.8, True)
    return svg(o, label='ADN mitocondrial humano con su número de pares de bases y genes')

def F_panorama():
    o = r(10, 10, 900, 160, '#efe8d8', 'none', 0, 16, 'fi', 0) + t(30, 45, 'CITOSOL', 20, MUT, 'start', 700, 'fi', .1)
    o += r(10, 185, 900, 395, '#f7ebcd', 'none', 0, 16, 'fi', .1) + t(30, 220, 'MITOCONDRIA', 20, TAND, 'start', 700, 'fi', .2)
    o += box(150, 70, 230, 70, 'Glucosa', None, CARD, COB, INK, .3, 26)
    o += arrow(385, 105, 520, 105, OCRE, 4, 'dr', .6) + t(452, 92, 'glucólisis', 18, MUT, 'middle', 600, 'fi', .7)
    o += box(525, 70, 260, 70, '2 piruvato', None, CARD, COB, INK, .9, 26)
    o += arrow(655, 145, 655, 245, OCRE, 4, 'dr', 1.2) + t(670, 205, 'PDH', 18, MUT, 'start', 700, 'fi', 1.3)
    o += box(525, 250, 260, 66, 'Acetil-CoA', None, CARD, COB, INK, 1.5, 25)
    o += arrow(520, 283, 410, 283, OCRE, 4, 'dr', 1.8)
    o += box(150, 250, 255, 66, 'Ciclo de Krebs', None, CARD, COB, INK, 2.0, 25)
    o += arrow(278, 320, 278, 380, OCRE, 4, 'dr', 2.3) + t(295, 360, 'NADH · FADH₂', 18, MUT, 'start', 700, 'fi', 2.4)
    o += box(150, 385, 255, 70, 'Cadena respiratoria', 'bombea H⁺', CARD, COB, INK, 2.6, 24)
    o += arrow(410, 420, 520, 420, OCRE, 4, 'dr', 2.9)
    o += box(525, 385, 260, 70, 'ATP sintasa', 'usa el gradiente', CARD, COB, INK, 3.1, 24)
    o += arrow(655, 460, 655, 500, GREEN, 4, 'dr', 3.4)
    o += f'<g class="pp" style="--d:3.6s"><rect x="585" y="505" width="140" height="52" rx="26" fill="{GREEN}"/><text x="655" y="539" font-size="26" fill="#fff" text-anchor="middle" font-weight="700">ATP</text></g>'
    return svg(o, label='Panorama de la respiración celular desde la glucosa hasta el ATP')

def F_krebs():
    cx, cy, R = 300, 320, 160
    o = f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="none" stroke="{COB}" stroke-width="6" pathLength="1"{st("dr", .2)}/>'
    names = ['citrato', 'isocitrato', 'α-cetoglutarato', 'succinil-CoA', 'succinato', 'fumarato', 'malato', 'oxalacetato']
    for i, n in enumerate(names):
        a = math.radians(-90 + 45*i + 22.5)
        x, y = cx + R*math.cos(a), cy + R*math.sin(a)
        o += c(x, y, 9, OCRE, 'none', 0, 'pp', .5 + i*.12)
        lx, ly = cx + (R + 24)*math.cos(a), cy + (R + 24)*math.sin(a)
        anc = 'start' if math.cos(a) > .25 else ('end' if math.cos(a) < -.25 else 'middle')
        o += t(lx, ly + 7 + (10 if math.sin(a) > .8 else (-6 if math.sin(a) < -.8 else 0)), n, 19, INK, anc, 600, 'fi', .6 + i*.12)
    o += f'<g class="sp" style="--d:1.6s;--t:6s"><circle cx="{cx}" cy="{cy}" r="{R}" fill="none" stroke="none"/><circle cx="{cx}" cy="{cy-R}" r="13" fill="{COB}"/></g>'
    o += r(150, 12, 300, 74, CARD, COB, 2.5, 14, 'pp', 0) + t(300, 45, 'Acetil-CoA (2 C)', 22, INK, 'middle', 700, 'fi', .1) + t(300, 72, 'entra y se une al oxalacetato', 17, MUT, 'middle', 500, 'fi', .2)
    o += arrow(300, 90, 300, 150, OCRE, 4, 'dr', .3)
    o += t(cx, cy - 8, 'por cada', 20, MUT, 'middle', 600, 'fi', 1.2) + t(cx, cy + 22, 'acetil-CoA', 22, INK, 'middle', 700, 'fi', 1.2)
    o += r(620, 110, 280, 420, CARD, LINE, 2, 16, 'fi', 1.4) + t(760, 150, 'Salen por vuelta', 22, COB, 'middle', 700, 'fi', 1.5)
    outs = [(3, 'NADH', COB), (1, 'FADH₂', COB), (1, 'GTP (≈ ATP)', GREEN), (2, 'CO₂', MUT)]
    for i, (n, s, col) in enumerate(outs):
        y = 220 + i*80
        o += counter(690, y, n, 48, col, 'end', 1.8 + i*.35)
        o += t(705, y - 4, s, 26, INK, 'start', 700, 'fi', 1.9 + i*.35)
    o += t(760, 505, 'los NADH y FADH₂ alimentan la cadena', 17, MUT, 'middle', 500, 'fi', 3.4)
    return svg(o, label='Ciclo del ácido cítrico con sus intermediarios y productos por vuelta')

def etc_base(d=0):
    o = t(30, 60, 'ESPACIO INTERMEMBRANA', 19, MUT, 'start', 700, 'fi', d)
    o += t(30, 560, 'MATRIZ', 19, MUT, 'start', 700, 'fi', d)
    o += membrane(250, 340, 20, 900, d)
    return o

def F_cadena():
    o = etc_base()
    comps = [('I', 140, 120, 150, COB), ('III', 450, 120, 150, COB), ('IV', 690, 110, 150, COB)]
    for i, (n, x, w, h, col) in enumerate(comps):
        o += r(x - w/2, 220, w, h, LCOB, COB, 3, 18, 'pp', .3 + i*.2) + t(x, 305, n, 34, COB, 'middle', 700, 'fi', .4 + i*.2)
    o += r(250, 300, 90, 70, LOCRE, TAND, 3, 16, 'pp', .5) + t(295, 345, 'II', 30, TAND, 'middle', 700, 'fi', .6)
    o += c(355, 285, 20, OCRE, TAND, 2, 'pp', .9) + t(355, 292, 'Q', 20, INK, 'middle', 700, 'fi', 1.0)
    o += c(570, 200, 20, '#e9b3a6', RED, 2, 'pp', 1.0) + t(570, 207, 'c', 20, RED, 'middle', 700, 'fi', 1.1)
    o += r(40, 440, 130, 48, CARD, COB, 2, 12, 'pp', 1.2) + t(105, 472, 'NADH', 22, COB, 'middle', 700, 'fi', 1.3)
    o += carrow('M120,440 L130,375', 130, 375, -80, COB, 3, 1.3)
    o += r(220, 440, 130, 48, CARD, TAND, 2, 12, 'pp', 1.4) + t(285, 472, 'FADH₂', 22, TAND, 'middle', 700, 'fi', 1.5)
    o += carrow('M285,440 L290,375', 290, 375, -85, TAND, 3, 1.5)
    o += r(690, 440, 200, 48, CARD, COB, 2, 12, 'pp', 1.6) + t(790, 472, 'O₂ → H₂O', 22, COB, 'middle', 700, 'fi', 1.7)
    o += carrow('M720,375 L760,440', 760, 440, 58, COB, 3, 1.7)
    path = 'M140,300 L355,285 L450,285 L570,200 L690,300'
    o += p(path, OCRE, 3, 'dr fl', 1.8)
    segs = [(140, 300, 215, -15), (355, 285, 95, 0), (450, 285, 120, -85), (570, 200, 120, 100)]
    for i, (x, y, dx, dy) in enumerate(segs):
        o += mover(f'<circle cx="{x}" cy="{y}" r="9" fill="{OCRE}" stroke="{TAND}" stroke-width="2"/>', dx, dy, 2.2 + i*.35, 1.4)
    for i, x in enumerate([140, 450, 690]):
        o += mover(hp(x, 190, 24), 0, -110, 2.4 + i*.5, 2.2)
        o += t(x + 45, 150, '', 1)
    o += t(460, 120, 'e⁻ (amarillo) viajan de complejo en complejo · I, III y IV bombean H⁺ hacia arriba', 18, INK, 'middle', 600, 'fi', 2.0)
    return svg(o, label='Cadena de transporte de electrones en la membrana interna')

def F_gradiente():
    o = etc_base()
    import random
    random.seed(4)
    for i in range(26):
        x, y = random.randint(60, 760), random.randint(90, 225)
        o += f'<g{st("pp", .3 + i*.06)}>{hp(x, y, 22)}</g>'
    for i, x in enumerate([200, 520, 800]):
        o += f'<g{st("pp", .5 + i*.3)}>{hp(x, 460, 22)}</g>'
    o += t(890, 150, '+ + +', 40, RED, 'end', 700, 'fi', 1.8)
    o += t(860, 520, '− − −', 40, COB, 'end', 700, 'fi', 2.0)
    o += r(30, 380, 330, 90, CARD, OCRE, 2.5, 14, 'pp', 2.3) + tl(195, 418, ['diferencia química', '(más H⁺ arriba: ΔpH)'], 21, INK, 'middle', 700, 'fi', 2.4)
    o += r(380, 380, 330, 90, CARD, OCRE, 2.5, 14, 'pp', 2.6) + tl(545, 418, ['diferencia eléctrica', '(arriba +, matriz −)'], 21, INK, 'middle', 700, 'fi', 2.7)
    o += t(370, 525, '= fuerza protón-motriz', 30, COB, 'middle', 700, 'fi', 3.0)
    return svg(o, label='Gradiente electroquímico de protones a través de la membrana interna')

def F_sintasa():
    o = etc_base()
    o += f'<ellipse cx="420" cy="295" rx="120" ry="38" fill="{LCOB}" stroke="{COB}" stroke-width="4"{st("pp", .2)}/>'
    o += f'<ellipse cx="420" cy="295" rx="120" ry="38" fill="none" stroke="{COB}" stroke-width="10" stroke-dasharray="14 14" opacity=".55" class="fl"/>'
    o += t(420, 302, 'F₀ (anillo c)', 20, COB, 'middle', 700, 'fi', .4)
    o += r(410, 333, 20, 95, COB, 'none', 0, 6, 'gy', .5)
    hx, hy = 420, 470
    for k in range(6):
        a = math.radians(-90 + 60*k)
        col = '#c9d4fa' if k % 2 else LOCRE
        o += c(hx + 58*math.cos(a)*1.35, hy + 46*math.sin(a)*.95, 40, col, COB if k % 2 else TAND, 3, 'pp', .7 + k*.08)
    o += t(hx, hy + 8, 'F₁', 26, INK, 'middle', 700, 'fi', 1.3)
    o += r(560, 260, 22, 250, '#c9d4fa', COB, 2, 8, 'gy', .9) + p('M571,512 L520,512', COB, 6, 'dr', 1.0)
    o += t(600, 230, 'estator', 18, MUT, 'start', 600, 'fi', 1.1)
    for i in range(4):
        o += mover(hp(380 + i*25, 150, 24), 0, 150, 1.6 + i*.55, 1.8)
    for i in range(3):
        o += mover(f'<g transform="translate(560,470)"><rect x="-30" y="-16" width="60" height="32" rx="16" fill="{GREEN}"/><text x="0" y="7" font-size="17" fill="#fff" text-anchor="middle" font-weight="700">ATP</text></g>', 250, 30 - i*20, 2.4 + i*.9, 2.2)
    o += t(170, 470, 'ADP + Pᵢ', 24, INK, 'middle', 700, 'fi', 1.8) + arrow(240, 470, 330, 470, OCRE, 3, 'dr', 1.9)
    o += t(700, 150, 'H⁺ bajan a favor', 20, RED, 'middle', 700, 'fi', 1.5) + t(700, 176, 'del gradiente', 20, RED, 'middle', 700, 'fi', 1.5)
    o += t(420, 580, 'el rotor gira; cada vuelta completa produce 3 ATP', 20, INK, 'middle', 600, 'fi', 2.8)
    return svg(o, label='ATP sintasa: F0 en la membrana y F1 en la matriz')

def F_transport():
    o = etc_base()
    items = [(170, 'ADP/ATP', 'antiportador', [('ATP', GREEN, -1), ('ADP', COB, 1)]),
             (460, 'Fosfato', 'simportador con H⁺', [('Pᵢ', TAND, 1), ('H⁺', RED, 1)]),
             (750, 'Piruvato', 'simportador con H⁺', [('piruvato', COB, 1), ('H⁺', RED, 1)])]
    for i, (x, n, sub, mol) in enumerate(items):
        o += r(x - 55, 225, 110, 140, LCOB, COB, 3, 22, 'pp', .2 + i*.25)
        o += t(x, 205 - 0, n, 22, COB, 'middle', 700, 'fi', .3 + i*.25)
        o += t(x, 420 + 80, sub, 19, MUT, 'middle', 600, 'fi', .4 + i*.25)
        for j, (m, col, dirn) in enumerate(mol):
            xx = x - 37 + j*74
            y0 = 130 if dirn == 1 else 450
            lab = f'<g><rect x="{xx-34}" y="{y0-16}" width="68" height="32" rx="16" fill="{col}"/><text x="{xx}" y="{y0+7}" font-size="16" fill="#fff" text-anchor="middle" font-weight="700">{m}</text></g>'
            o += mover(lab, 0, 320*dirn, 1.2 + i*.6 + j*.3, 2.6)
    o += t(470, 560, '', 1)
    return svg(o, label='Transportadores de la membrana interna')

def F_rendimiento():
    o = p('M120,500 L860,500', INK, 3, 'dr', 0) + p('M120,500 L120,60', INK, 3, 'dr', 0)
    o += r(220, 500 - 2*12, 180, 2*12, OCRE, 'none', 0, 4, 'gy', .4)
    o += counter(310, 460, 2, 46, TAND, 'middle', .5)
    o += tl(310, 540, ['solo glucólisis', '(sin O₂)'], 22, INK, 'middle', 700, 'fi', .5)
    o += r(560, 500 - 30*14, 180, 30*14, GREEN, 'none', 0, 4, 'gy', 1.0)
    o += counter(650, 60, 30, 52, GREEN, 'middle', 1.1, 0, ' aprox.')
    o += tl(650, 540, ['oxidación completa', '(con O₂)'], 22, INK, 'middle', 700, 'fi', 1.1)
    o += t(130, 40, 'ATP por glucosa', 22, MUT, 'start', 700, 'fi', 0)
    return svg(o, label='ATP por glucosa con y sin mitocondria')

def F_import():
    o = t(30, 50, 'CITOSOL', 19, MUT, 'start', 700, 'fi', 0)
    o += r(20, 150, 880, 40, '#f1dca8', TAND, 3, 8, 'fi', .1) + t(890, 140, 'membrana externa', 18, TAND, 'end', 700, 'fi', .2)
    o += r(20, 330, 880, 40, '#f1dca8', TAND, 3, 8, 'fi', .2) + t(890, 320, 'membrana interna', 18, TAND, 'end', 700, 'fi', .3)
    o += t(30, 560, 'MATRIZ', 19, MUT, 'start', 700, 'fi', .3)
    o += r(380, 135, 70, 70, LCOB, COB, 3, 10, 'pp', .5) + t(415, 178, 'TOM', 20, COB, 'middle', 700, 'fi', .6)
    o += r(380, 315, 70, 70, LCOB, COB, 3, 10, 'pp', .7) + t(415, 358, 'TIM', 20, COB, 'middle', 700, 'fi', .8)
    chain = f'<g><path d="M0,0 L0,40" stroke="{OCRE}" stroke-width="10" stroke-linecap="round"/><path d="M0,40 C10,70 -10,90 0,120" stroke="{COB}" stroke-width="8" fill="none" stroke-linecap="round"/></g>'
    o += f'<g class="mv1" style="--d:1.0s;--t:2.6s;--dx:-260px;--dy:-300px"><g transform="translate(415,430)">{chain}</g></g>'
    o += t(160, 90, 'proteína hecha en el citosol', 20, INK, 'middle', 700, 'fi', .9)
    o += t(160, 115, 'con secuencia señal (ocre)', 18, TAND, 'middle', 600, 'fi', 1.0)
    o += r(540, 450, 300, 70, CARD, RED, 2.5, 14, 'pp', 3.4) + tl(690, 478, ['peptidasa corta la señal', 'y la proteína se pliega'], 19, INK, 'middle', 700, 'fi', 3.5)
    return svg(o, label='Importación de proteínas a la mitocondria por TOM y TIM')

def F_control():
    steps = [('Mucho ADP (la célula gasta ATP)', None), ('La ATP sintasa trabaja y deja pasar H⁺', None), ('El gradiente baja', None), ('La cadena acelera y consume más O₂', None)]
    o = flow(steps, 30, 30, 600, 92, 40, .2)
    o += carrow('M640,470 C760,470 760,76 640,76', 642, 76, 180, OCRE, 4, 2.2)
    o += tl(830, 270, ['y se', 'vuelve', 'a hacer', 'ATP'], 20, TAND, 'middle', 700, 'fi', 2.6)
    return svg(o, label='Control respiratorio por la disponibilidad de ADP')

def F_ucp1():
    o = etc_base()
    o += r(220, 225, 110, 140, LCOB, COB, 3, 22, 'pp', .2) + t(275, 300, 'ATP', 20, COB, 'middle', 700, 'fi', .3) + t(275, 322, 'sintasa', 18, COB, 'middle', 700, 'fi', .3)
    o += r(560, 225, 110, 140, LRED, RED, 3, 22, 'pp', .5) + t(615, 300, 'UCP1', 22, RED, 'middle', 700, 'fi', .6)
    o += t(615, 200, 'termogenina', 20, RED, 'middle', 700, 'fi', .7)
    for i in range(5):
        o += mover(hp(600 + (i % 2)*30, 140, 24), 0, 330, 1.0 + i*.45, 1.6)
    for i in range(3):
        o += f'<path d="M{575 + i*40},500 q10,-15 0,-30 q-10,-15 0,-30" stroke="{RED}" stroke-width="4" fill="none" class="pu" style="--d:{1.6 + i*.2}s"/>'
    o += t(615, 560, 'calor', 26, RED, 'middle', 700, 'fi', 1.8)
    o += t(275, 450, 'sin ATP', 20, MUT, 'middle', 600, 'fi', 2.0)
    o += t(580, 60, 'los H⁺ regresan sin pasar por la ATP sintasa', 22, INK, 'middle', 700, 'fi', .9)
    return svg(o, label='Termogenina: los protones regresan y su energía se libera como calor')

def F_apopt():
    o = mito_small(130, 160, 1.5, .1)
    for i in range(6):
        o += mover(c(190, 160, 8, RED, 'none', 0, ''), 110 + (i % 3)*20, -40 + i*18, .6 + i*.3, 2.4)
    o += t(130, 245, 'mitocondria', 20, TAND, 'middle', 700, 'fi', .3)
    o += t(330, 90, 'citocromo c sale', 20, RED, 'middle', 700, 'fi', .8)
    o += r(30, 300, 230, 70, LCOB, COB, 2.5, 14, 'pp', .4) + tl(145, 328, ['Bax / Bak abren', 'la membrana externa'], 19, COB, 'middle', 700, 'fi', .5)
    o += r(30, 400, 230, 70, CARD, GREEN, 2.5, 14, 'pp', .6) + tl(145, 428, ['Bcl-2 lo impide', '(antiapoptótica)'], 19, GREEN, 'middle', 700, 'fi', .7)
    steps = [('Apoptosoma', 'citocromo c + Apaf-1'), ('Caspasa 9', 'iniciadora'), ('Caspasas ejecutoras', 'cortan proteínas'), ('Apoptosis', 'muerte ordenada')]
    o += flow(steps, 470, 150, 420, 76, 30, 1.6)
    o += carrow('M300,160 C380,150 420,180 465,188', 465, 188, 15, RED, 3, 1.4)
    return svg(o, label='Vía mitocondrial de la apoptosis')

def F_mat_herencia():
    o = t(230, 40, 'Madre afectada', 24, COB, 'middle', 700, 'fi', 0) + t(690, 40, 'Padre afectado', 24, COB, 'middle', 700, 'fi', 0)
    def fam(cx, mom_aff, dad_aff, kids_aff, d):
        s = ''
        s += r(cx - 120, 80, 56, 56, COB if dad_aff else CARD, COB, 3, 4, 'pp', d)
        s += c(cx + 92, 108, 28, COB if mom_aff else CARD, COB, 3, 'pp', d + .1)
        s += p(f'M{cx-64},108 L{cx+64},108', INK, 3, 'dr', d + .2) + p(f'M{cx},108 L{cx},190', INK, 3, 'dr', d + .3)
        s += p(f'M{cx-150},190 L{cx+150},190', INK, 3, 'dr', d + .4)
        for k, kx in enumerate([cx-150, cx-50, cx+50, cx+150]):
            s += p(f'M{kx},190 L{kx},225', INK, 3, 'dr', d + .5)
            fill = COB if kids_aff else CARD
            if k % 2 == 0:
                s += r(kx - 26, 225, 52, 52, fill, COB, 3, 4, 'pp', d + .7 + k*.1)
            else:
                s += c(kx, 251, 26, fill, COB, 3, 'pp', d + .7 + k*.1)
        return s
    o += fam(230, True, False, True, .3) + fam(690, False, True, False, 1.4)
    o += tl(230, 340, ['todos los hijos heredan', 'las mitocondrias de la madre'], 21, INK, 'middle', 700, 'fi', 1.2)
    o += tl(690, 340, ['no lo transmite:', 'sus mitocondrias no pasan'], 21, INK, 'middle', 700, 'fi', 2.2)
    o += r(60, 430, 800, 120, CARD, OCRE, 2.5, 16, 'pp', 2.6)
    o += tl(460, 470, ['Heteroplasmia: mezcla de mitocondrias sanas y mutadas;', 'la enfermedad aparece al pasar un umbral'], 22, INK, 'middle', 600, 'fi', 2.8)
    return svg(o, label='Herencia materna del ADN mitocondrial')

def tbl_membranas():
    return table(['', 'Membrana externa', 'Membrana interna'], [
        ['Permeabilidad', 'Alta: las porinas dejan pasar moléculas de hasta ~5000 Da', 'Muy baja: casi todo cruza con transportadores'],
        ['Lípido característico', '—', 'Cardiolipina'],
        ['Proteínas clave', 'Porinas, TOM', 'Cadena respiratoria, ATP sintasa, TIM'],
        ['Función', 'Separa del citosol', 'Crea y usa el gradiente de H⁺'],
    ])

def tbl_inhib():
    return table(['Sitio', 'Sustancia', 'Consecuencia'], [
        ['Complejo I', 'Rotenona', 'Se frena la entrada de electrones del NADH'],
        ['Complejo IV', 'Cianuro, monóxido de carbono', 'No se usa el O₂: hipoxia histotóxica'],
        ['ATP sintasa', 'Oligomicina', 'Se bloquea el paso de H⁺ y la síntesis de ATP'],
        ['Membrana interna', '2,4-dinitrofenol (desacoplante)', 'H⁺ regresan sin ATP: calor, hipertermia'],
    ])

def wrapfig(html_):
    return f'<div style="width:100%">{html_}</div>'

DECK = dict(
  page_title='Mitocondria', materia='Biología Celular', title='La mitocondria',
  subtitle='Estructura, respiración celular y producción de ATP, desde las piezas hasta la clínica',
  cover_notes='Buenos días. Hoy vamos a explicar la mitocondria: qué es, cómo está construida, cómo produce ATP y qué pasa cuando falla. Vamos a ir de lo más básico a lo clínico en seis niveles. La fuente principal es el Alberts, capítulo de conversión de energía.',
  index_notes='Esta es la ruta. Primero los fundamentos: por qué la célula necesita una mitocondria. Luego sus piezas, después cómo funciona, cómo se integra con el resto de la célula, cómo se regula y al final su importancia clínica. Las diapositivas marcadas como "Un paso más" profundizan; las "Básico" son lo que hay que dominar.',
  levels=[
    dict(name='Fundamentos', desc='Para qué existe y de dónde viene', intro='Qué problema resuelve la mitocondria y de dónde viene.', notes='Empezamos por la pregunta más simple: para qué necesita la célula una mitocondria.', slides=[
      dict(title='La central de energía de la célula', tag='b', chain=2, fig=F_para_que(),
           text='<p class="lead">La mitocondria convierte la energía de los alimentos en <b>ATP</b>, la forma de energía que usa la célula.</p><ul><li>Entran glucosa, ácidos grasos y O₂.</li><li>Salen ATP, CO₂ y agua.</li><li>Las células que gastan más energía tienen más mitocondrias.</li></ul>',
           notes='La mitocondria es el organelo donde se oxida el combustible que comemos, glucosa y grasas, usando oxígeno. Esa oxidación libera energía y la mitocondria la guarda en forma de ATP. Fíjense en la animación: entra combustible y oxígeno y sale ATP hacia toda la célula. Por eso un músculo cardíaco o una neurona tienen muchísimas mitocondrias.'),
      dict(title='El ATP: la moneda de energía', tag='b', chain=0, fig=F_atp(),
           text='<p class="lead">El ATP tiene adenina, ribosa y <b>tres fosfatos</b>.</p><ul><li>El enlace entre los fosfatos β y γ guarda mucha energía.</li><li>Al hidrolizarlo queda ADP + fosfato y se libera energía.</li><li>La mitocondria hace lo contrario: vuelve a unir ADP + Pᵢ.</li></ul>',
           notes='Antes de ver cómo se fabrica, veamos qué es el ATP. Es un nucleótido: adenina, ribosa y tres fosfatos llamados alfa, beta y gamma. Cuando se rompe el enlace del último fosfato con agua, se libera energía que la célula usa para contraerse, transportar moléculas o sintetizar. La mitocondria recicla el ADP: le vuelve a poner el fosfato. Por eso decimos que es la moneda de energía: se gasta y se recarga continuamente.'),
      dict(title='Una bacteria que se quedó a vivir', tag='b', chain=0, fig=F_endo(),
           text='<p class="lead">Según la <b>teoría endosimbiótica</b>, la mitocondria desciende de una bacteria aerobia engullida por una célula ancestral.</p><ul><li>Por eso tiene <b>doble membrana</b>.</li><li>Tiene su propio ADN circular.</li><li>Tiene ribosomas parecidos a los bacterianos.</li></ul>',
           notes='¿Por qué la mitocondria tiene dos membranas y su propio ADN? La explicación aceptada es que hace más de mil millones de años una célula engulló a una bacteria capaz de usar oxígeno y, en lugar de digerirla, se asociaron. Las pruebas: doble membrana, ADN circular propio y ribosomas parecidos a los bacterianos. Este último dato será clínico: algunos antibióticos que atacan ribosomas bacterianos también afectan a las mitocondrias.'),
    ]),
    dict(name='Piezas', desc='Membranas, matriz y ADN propio', intro='Cada compartimento de la mitocondria tiene una tarea distinta.', notes='Ahora desarmamos la mitocondria en sus piezas.', slides=[
      dict(title='Cuatro compartimentos', tag='b', chain=0, fig=F_estructura(),
           text='<p class="lead">Dos membranas delimitan dos espacios.</p><ul><li><b>Membrana externa</b> y <b>espacio intermembrana</b>.</li><li><b>Membrana interna</b>, plegada en <b>crestas</b>.</li><li><b>Matriz</b>, con ADN y ribosomas propios.</li></ul><p class="note-v">Las crestas aumentan la superficie; el músculo cardíaco tiene muchas.</p>',
           notes='Este es el corte clásico. La membrana externa envuelve todo. Entre las dos membranas queda el espacio intermembrana. La membrana interna se pliega hacia adentro formando crestas, que aumentan mucho la superficie donde están las máquinas que producen ATP. En el centro está la matriz, con enzimas, ADN mitocondrial y ribosomas. Una regla útil: más crestas significa más capacidad de producir ATP, y por eso las células del corazón tienen mitocondrias llenas de crestas.'),
      dict(title='Dos membranas muy distintas', tag='b', chain=2, fig=wrapfig(tbl_membranas()),
           text='<p class="lead">La externa es un colador; la interna es una barrera casi perfecta.</p><ul><li>La impermeabilidad de la interna es lo que permite acumular H⁺.</li><li>Si la interna dejara pasar iones, no habría gradiente ni ATP.</li></ul>',
           notes='Las dos membranas no son iguales. La externa tiene porinas, canales que dejan pasar moléculas pequeñas, así que el espacio intermembrana se parece químicamente al citosol. La interna es muy impermeable: tiene un lípido especial, la cardiolipina, y casi todo la cruza mediante transportadores. Esa impermeabilidad es la clave de todo lo que viene: permite acumular protones de un lado y usarlos para hacer ATP.'),
      dict(title='La matriz: el taller metabólico', tag='b', chain=2, fig=F_matriz(),
           text='<p class="lead">En la matriz se oxida el combustible.</p><ul><li>Piruvato deshidrogenasa y <b>ciclo de Krebs</b>.</li><li><b>β-oxidación</b> de ácidos grasos.</li><li>ADN, ribosomas y ARNt mitocondriales.</li></ul>',
           notes='La matriz es un compartimento muy concentrado en enzimas. Aquí el piruvato se convierte en acetil-CoA, aquí gira el ciclo de Krebs y aquí se oxidan los ácidos grasos. También está el material genético propio de la mitocondria y la maquinaria para traducirlo.'),
      dict(title='El ADN mitocondrial', tag='m', chain=0, fig=F_adnmt(),
           text='<p class="lead">Un genoma pequeño, circular y <b>heredado de la madre</b>.</p><ul><li>En humanos codifica 13 proteínas de la cadena respiratoria.</li><li>El resto de las proteínas mitocondriales vienen del núcleo.</li></ul>',
           notes='El ADN mitocondrial humano es un círculo de 16 569 pares de bases con 37 genes: 13 proteínas, todas de la cadena respiratoria y la ATP sintasa, 22 ARN de transferencia y 2 ARN ribosomales. Es poquísimo: más del 99 % de las proteínas mitocondriales se fabrican con genes del núcleo y se importan. Se hereda casi exclusivamente de la madre, y esto lo retomaremos en clínica. La cinta de colores del dibujo es solo ilustrativa, no un mapa de genes.'),
    ]),
    dict(name='Funcionamiento', desc='Del combustible al ATP', intro='La respiración celular paso a paso: Krebs, cadena respiratoria y ATP sintasa.', notes='Este es el corazón del tema: cómo se hace el ATP.', slides=[
      dict(title='El camino completo', tag='b', chain=1, fig=F_panorama(),
           text='<p class="lead">La glucosa se oxida por etapas.</p><ul><li>Glucólisis en el citosol: glucosa → 2 piruvato.</li><li>En la mitocondria: acetil-CoA → Krebs → NADH y FADH₂.</li><li>La cadena y la ATP sintasa convierten esos electrones en ATP.</li></ul>',
           notes='Este es el mapa general; los siguientes pasos son el zoom de cada caja. La glucólisis ocurre en el citosol y deja dos piruvatos. El piruvato entra a la mitocondria y la piruvato deshidrogenasa lo convierte en acetil-CoA. El ciclo de Krebs oxida el acetilo y guarda los electrones en NADH y FADH2. La cadena respiratoria usa esos electrones para bombear protones y la ATP sintasa usa los protones para fabricar ATP.'),
      dict(title='Ciclo del ácido cítrico', tag='b', chain=1, fig=F_krebs(),
           text='<p class="lead">El acetilo se une al oxalacetato y da una vuelta completa.</p><ul><li>El oxalacetato se regenera: es un <b>ciclo</b>.</li><li>Sale poco ATP directo.</li><li>Lo valioso son los electrones en <b>NADH y FADH₂</b>.</li></ul>',
           notes='El acetil-CoA, de dos carbonos, se une al oxalacetato, de cuatro, y forma citrato. En una vuelta se liberan dos CO2, que es el CO2 que exhalamos, y se regenera el oxalacetato. Por cada vuelta salen 3 NADH, 1 FADH2 y 1 GTP. Noten que el ciclo casi no produce ATP directamente: su producto real son electrones de alta energía cargados en NADH y FADH2.'),
      dict(title='La cadena de transporte de electrones', tag='b', chain=1, fig=F_cadena(),
           text='<p class="lead">Los electrones bajan por cuatro complejos hasta el <b>O₂</b>.</p><ul><li>NADH entra por el complejo I; FADH₂ por el II.</li><li>Q y citocromo c los acarrean.</li><li>I, III y IV <b>bombean H⁺</b> al espacio intermembrana.</li></ul>',
           notes='En la membrana interna hay cuatro complejos. El NADH entrega electrones al complejo I y el FADH2 al complejo II. La ubiquinona, Q, los lleva al complejo III, y el citocromo c al complejo IV, donde el oxígeno los recibe y se forma agua. Por eso respiramos oxígeno: es el aceptor final. Mientras los electrones pasan, los complejos I, III y IV usan esa energía para bombear protones hacia el espacio intermembrana. El complejo II no bombea.'),
      dict(title='Un gradiente de protones', tag='b', chain=2, fig=F_gradiente(),
           text='<p class="lead">El bombeo crea una batería a través de la membrana interna.</p><ul><li>Más H⁺ afuera: diferencia de <b>pH</b>.</li><li>Afuera positivo, matriz negativa: diferencia de <b>voltaje</b>.</li><li>Juntas forman la <b>fuerza protón-motriz</b>.</li></ul>',
           notes='Al bombear protones se acumulan en el espacio intermembrana. Eso crea dos diferencias a la vez: una química, porque hay más protones afuera, y una eléctrica, porque afuera queda positivo y la matriz negativa. Juntas forman el gradiente electroquímico o fuerza protón-motriz. Es como una presa llena de agua: los protones quieren regresar a la matriz, y esa tendencia es la energía que se va a usar.'),
      dict(title='La ATP sintasa, un motor rotatorio', tag='b', chain=1, fig=F_sintasa(),
           text='<p class="lead">Los H⁺ regresan por la ATP sintasa y la hacen girar.</p><ul><li><b>F₀</b>, en la membrana, es el rotor.</li><li><b>F₁</b>, en la matriz, une ADP + Pᵢ.</li><li>Esto es la <b>fosforilación oxidativa</b>.</li></ul>',
           notes='Aquí los protones regresan a la matriz, pero solo pueden hacerlo a través de la ATP sintasa. Al pasar por la parte F0, que está en la membrana, la hacen girar como una turbina. Ese giro cambia la forma de la cabeza F1, en la matriz, que une ADP y fosfato para formar ATP. Cada vuelta completa produce tres ATP. A este acoplamiento entre cadena y ATP sintasa se le llama fosforilación oxidativa, y la idea de que el gradiente es el intermediario es la teoría quimiosmótica de Mitchell.'),
      dict(title='Puertas de la membrana interna', tag='m', chain=2, fig=F_transport(),
           text='<p class="lead">La membrana interna necesita transportadores específicos.</p><ul><li>El ATP sale y el ADP entra (antiportador).</li><li>El fosfato y el piruvato entran junto con H⁺.</li><li>Parte del gradiente se gasta en este transporte.</li></ul>',
           notes='Como la membrana interna es impermeable, el ATP fabricado en la matriz tiene que salir por un transportador que lo intercambia por ADP. El fosfato y el piruvato entran acompañados de protones, aprovechando el mismo gradiente. Este detalle explica por qué el rendimiento real de ATP es menor que el teórico: parte del gradiente se usa para mover sustratos.'),
    ]),
    dict(name='Integración', desc='Rendimiento y relación con el núcleo', intro='Cuánto rinde y cómo depende del resto de la célula.', notes='Integremos: cuánto ATP sale y de dónde salen las piezas de la mitocondria.', slides=[
      dict(title='¿Cuánto ATP por glucosa?', tag='b', chain=3, fig=F_rendimiento(),
           text='<p class="lead">Con oxígeno, una glucosa rinde unos <b>30 ATP</b>; sin oxígeno, solo 2.</p><ul><li>Casi todo viene de la fosforilación oxidativa.</li><li>Por eso la falta de O₂ es tan grave para el cerebro y el corazón.</li></ul>',
           notes='Comparemos. Si solo hay glucólisis, sin oxígeno, una glucosa da 2 ATP. Si la glucosa se oxida completamente en la mitocondria, da alrededor de 30. La cifra exacta es aproximada; el Alberts da unos 30, y libros más antiguos dicen 36 a 38, porque el cálculo depende del costo de transportar sustratos. Lo importante: la mitocondria multiplica unas quince veces el rendimiento, y por eso los tejidos que dependen de ella sufren tanto con la hipoxia.'),
      dict(title='Importar proteínas del citosol', tag='m', chain=1, fig=F_import(),
           text='<p class="lead">Casi todas las proteínas mitocondriales se fabrican fuera.</p><ul><li>Llevan una <b>secuencia señal</b> en su extremo.</li><li>Cruzan por <b>TOM</b> (externa) y <b>TIM</b> (interna).</li><li>En la matriz se corta la señal.</li></ul>',
           notes='Ya vimos que el ADN mitocondrial solo codifica 13 proteínas. Las demás se sintetizan en ribosomas del citosol con una etiqueta en su extremo, la secuencia señal. Los complejos TOM, en la membrana externa, y TIM, en la interna, las reconocen y las meten desplegadas. En la matriz una peptidasa corta la señal y la proteína se pliega. La mitocondria depende, entonces, del núcleo.'),
    ]),
    dict(name='Regulación', desc='Control, calor y apoptosis', intro='La mitocondria ajusta su ritmo, puede producir calor y decide la muerte celular.', notes='La mitocondria no trabaja a ciegas: se regula.', slides=[
      dict(title='El ADP marca el ritmo', tag='b', chain=2, fig=F_control(),
           text='<p class="lead">La respiración se acelera cuando la célula gasta ATP.</p><ul><li>Esto se llama <b>control respiratorio</b>.</li><li>Cadena y ATP sintasa están acopladas por el gradiente.</li></ul>',
           notes='Cuando hacemos ejercicio gastamos ATP y aumenta el ADP. Con más ADP, la ATP sintasa trabaja más y deja pasar más protones; el gradiente baja y la cadena se acelera para reponerlo, consumiendo más oxígeno. En reposo pasa lo contrario. Así, la producción de ATP se ajusta sola a la demanda.'),
      dict(title='Termogenina: energía en calor', tag='b', chain=4, fig=F_ucp1(),
           text='<p class="lead">En la <b>grasa parda</b>, la proteína UCP1 deja regresar los H⁺ sin hacer ATP.</p><ul><li>La energía del gradiente se libera como calor.</li><li>Importante en recién nacidos para mantener la temperatura.</li></ul>',
           notes='Hay un caso en que el desacoplamiento es útil. En la grasa parda existe la termogenina o UCP1, un canal que deja regresar los protones a la matriz sin pasar por la ATP sintasa. La energía del gradiente no se convierte en ATP sino en calor. Los recién nacidos tienen grasa parda para mantener su temperatura.'),
      dict(title='La mitocondria decide la apoptosis', tag='m', chain=3, fig=F_apopt(),
           text='<p class="lead">Al salir el <b>citocromo c</b>, se activa la muerte celular programada.</p><ul><li>Bax y Bak abren la membrana externa.</li><li>Bcl-2 lo impide.</li><li>El apoptosoma activa a las caspasas.</li></ul>',
           notes='La mitocondria también controla la vía intrínseca de la apoptosis. Ante daño grave, proteínas como Bax y Bak abren la membrana externa y el citocromo c sale al citosol. Allí se une a Apaf-1 y forma el apoptosoma, que activa la caspasa 9 y esta a las caspasas ejecutoras, que desmantelan la célula de forma ordenada. Bcl-2 protege a la mitocondria. Muchos cánceres sobreexpresan Bcl-2 para no morir.'),
    ]),
    dict(name='Clínica', desc='Tóxicos y enfermedades mitocondriales', intro='Qué pasa cuando la mitocondria falla.', notes='Cerramos con la aplicación médica.', slides=[
      dict(title='Venenos de la cadena respiratoria', tag='b', chain=4, fig=wrapfig(tbl_inhib()),
           text='<p class="lead">Bloquear la cadena deja a la célula sin ATP aunque haya oxígeno.</p><ul><li>El <b>cianuro</b> bloquea el complejo IV.</li><li>Las células no usan el O₂: <b>hipoxia histotóxica</b>.</li><li>Se recurre a la glucólisis: <b>acidosis láctica</b>.</li></ul>',
           notes='El ejemplo clínico clásico es el cianuro, por ejemplo en incendios. Bloquea el complejo IV: el oxígeno llega a los tejidos pero no se puede usar. Es una hipoxia histotóxica. La célula solo puede hacer glucólisis, produce lactato y aparece acidosis láctica. El monóxido de carbono también inhibe el complejo IV, además de unirse a la hemoglobina. Los desacoplantes, como el dinitrofenol, dejan regresar los protones sin hacer ATP y causan hipertermia.'),
      dict(title='Enfermedades mitocondriales', tag='m', chain=4, fig=F_mat_herencia(),
           text='<p class="lead">Las mutaciones del ADNmt se heredan por <b>vía materna</b>.</p><ul><li>Afectan más a cerebro, músculo, corazón y retina.</li><li>Ejemplos: MELAS y la neuropatía óptica hereditaria de Leber.</li></ul>',
           notes='Como las mitocondrias del espermatozoide no se transmiten, el ADN mitocondrial se hereda de la madre: una madre afectada puede transmitirlo a todos sus hijos y un padre afectado no lo transmite. Además existe la heteroplasmia: cada célula tiene mitocondrias sanas y mutadas, y la enfermedad aparece cuando las mutadas superan un umbral. Por eso la gravedad varía entre hermanos. Los tejidos que más ATP consumen, cerebro, músculo, corazón y retina, son los más afectados. Ejemplos: MELAS y la neuropatía óptica hereditaria de Leber.'),
    ]),
  ],
  close=[
    'La mitocondria convierte la energía de glucosa y grasas en <strong>ATP</strong>, usando O₂.',
    'Desciende de una <strong>bacteria</strong>: doble membrana, ADN circular y ribosomas propios.',
    'La <strong>membrana interna</strong> es impermeable y se pliega en crestas.',
    'El <strong>ciclo de Krebs</strong> produce sobre todo NADH y FADH₂.',
    'La <strong>cadena respiratoria</strong> bombea H⁺ y entrega los electrones al O₂.',
    'La <strong>ATP sintasa</strong> usa el regreso de H⁺ para fabricar ATP.',
    'Con O₂, una glucosa rinde <strong>~30 ATP</strong>; sin O₂, solo 2.',
    'Cianuro y CO bloquean el complejo IV: <strong>hipoxia histotóxica</strong>.',
    'El ADNmt se hereda de la <strong>madre</strong>; existe heteroplasmia.',
  ],
  close_notes='Para cerrar, estos son los conceptos que hay que llevarse. Si entienden la secuencia combustible, electrones, gradiente de protones y ATP, entienden la mitocondria. Gracias.',
)
