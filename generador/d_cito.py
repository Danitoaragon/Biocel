from sv import *
import math

ACT = RED            # actina
MTC = COB            # microtúbulos
IFC = TAND           # filamentos intermedios

from d_dogma import chip
def wrapfig(h): return f'<div style="width:100%">{h}</div>'

def actin_strand(x0, x1, y, d=0, cls='fi', r_=8):
    s = ''
    n = int((x1 - x0) / (r_*1.7))
    for i in range(n):
        x = x0 + i*r_*1.7
        yy = y + (r_*.55 if i % 2 else -r_*.55)
        s += f'<circle cx="{x:.1f}" cy="{yy:.1f}" r="{r_}" fill="{LRED}" stroke="{ACT}" stroke-width="2"/>'
    return g(s, cls, d)

def mt_tube(x0, x1, y, h=44, d=0, cls='fi', cap=0):
    s = f'<rect x="{x0}" y="{y-h/2}" width="{x1-x0}" height="{h}" rx="6" fill="{LCOB}" stroke="{MTC}" stroke-width="2.5"/>'
    for x in range(int(x0) + 8, int(x1) - 4, 16):
        s += f'<line x1="{x}" y1="{y-h/2+3}" x2="{x}" y2="{y+h/2-3}" stroke="{MTC}" stroke-width="1.2" opacity=".5"/>'
    if cap:
        s += f'<rect x="{x1-cap}" y="{y-h/2}" width="{cap}" height="{h}" rx="6" fill="{OCRE}" stroke="{TAND}" stroke-width="2.5"/>'
    return g(s, cls, d)

def if_rope(x0, x1, y, d=0, cls='fi'):
    s = ''
    for k in range(3):
        pts = ' '.join(f'{x},{y + 9*math.sin((x - x0)/14 + k*2.1):.1f}' for x in range(int(x0), int(x1), 4))
        s += f'<polyline points="{pts}" fill="none" stroke="{IFC}" stroke-width="4"/>'
    return g(s, cls, d)


def doublets(cx, cy, R, d=0, arms=True, rA=15):
    s = ''
    for k in range(9):
        a = math.radians(-90 + k*40)
        b = a + math.radians(10)
        ax, ay = cx + R*math.cos(a), cy + R*math.sin(a)
        bx, by = cx + R*math.cos(b), cy + R*math.sin(b)
        s += c(round(bx), round(by), rA - 2, '#c9d4fa', MTC, 2, 'pp', d + .1 + k*.06)
        s += c(round(ax), round(ay), rA, LCOB, MTC, 2.5, 'pp', d + .1 + k*.06)
        if arms:
            for dr in (-7, 7):
                ex, ey = cx + (R + dr)*math.cos(a - math.radians(13)), cy + (R + dr)*math.sin(a - math.radians(13))
                sx, sy = cx + (R + dr)*math.cos(a - math.radians(4)), cy + (R + dr)*math.sin(a - math.radians(4))
                s += p(f'M{sx:.0f},{sy:.0f} L{ex:.0f},{ey:.0f}', TAND, 5, 'dr', d + .9)
    return s

def F_celula():
    o = e(460, 300, 420, 260, '#fbf6ea', INK, 3, 'pp', 0)
    o += e(460, 300, 405, 245, 'none', ACT, 6, 'fi', 1.2)
    o += c(300, 330, 80, LCOB, COB, 3, 'pp', .2) + t(300, 338, 'núcleo', 20, COB, 'middle', 700, 'fi', .3)
    cx, cy = 520, 250
    for k in range(14):
        a = math.radians(k*360/14 + 8)
        R = 210 if abs(math.cos(a)) < .6 else 330
        x2 = cx + min(R, 330)*math.cos(a)
        y2 = cy + 200*math.sin(a) if abs(math.sin(a)) > .3 else cy + 150*math.sin(a)
        o += p(f'M{cx},{cy} L{x2:.0f},{y2:.0f}', MTC, 3, 'dr', .5 + k*.05)
    o += c(cx, cy, 14, OCRE, TAND, 2, 'pp', .4)
    for k in range(8):
        a = math.radians(k*45 + 20)
        x1, y1 = 300 + 85*math.cos(a), 330 + 85*math.sin(a)
        x2, y2 = 300 + 300*math.cos(a)*1.05, 330 + 200*math.sin(a)
        mx, my = (x1 + x2)/2 + 20*math.sin(a), (y1 + y2)/2 - 20*math.cos(a)
        o += p(f'M{x1:.0f},{y1:.0f} Q{mx:.0f},{my:.0f} {x2:.0f},{y2:.0f}', IFC, 3, 'dr', 1.6 + k*.06, extra='stroke-dasharray:0')
    o += r(600, 470, 300, 110, CARD, LINE, 2, 14, 'fi', 2.2)
    for i, (col, s) in enumerate([(ACT, 'actina (corteza)'), (MTC, 'microtúbulos'), (IFC, 'filamentos intermedios')]):
        o += p(f'M620,{500 + i*30} L660,{500 + i*30}', col, 6, 'dr', 2.3 + i*.1) + t(672, 506 + i*30, s, 19, INK, 'start', 600, 'fi', 2.3 + i*.1)
    o += r(548, 262, 110, 26, CARD, 'none', 0, 6, 'fi', 2.0) + t(556, 281, 'centrosoma', 17, TAND, 'start', 700, 'fi', 2.0)
    return svg(o, label='Célula con sus tres redes del citoesqueleto')

def F_tres():
    o = ''
    rows = [('Filamento de actina', 7, ACT, 110), ('Filamento intermedio', 10, IFC, 290), ('Microtúbulo', 25, MTC, 470)]
    o += actin_strand(70, 560, 110, .2)
    o += if_rope(70, 560, 290, .8)
    o += mt_tube(70, 560, 470, 70, 1.4)
    for i, (n, nm, col, y) in enumerate(rows):
        o += t(70, y - 45 if i < 2 else y - 52, n, 22, col, 'start', 700, 'fi', .3 + i*.6)
        o += counter(700, y + 14, nm, 52, col, 'end', .5 + i*.6, 0, '')
        o += t(712, y + 14, 'nm', 26, MUT, 'start', 700, 'fi', .5 + i*.6)
        o += t(780, y + 14, ['≈', '≈', ''][i], 1, MUT)
    o += t(460, 570, 'diámetros aproximados; el dibujo no está a escala exacta', 16, MUT, 'middle', 500, 'fi', 2.2, True)
    return svg(o, label='Los tres tipos de filamentos y su diámetro')

def F_actina():
    o = t(140, 60, 'actina G (monómero)', 22, ACT, 'middle', 700, 'fi', 0)
    o += c(140, 140, 34, LRED, ACT, 3, 'pp', .2) + chip(140, 210, 'ATP', GREEN, size=16)
    o += arrow(220, 150, 330, 150, OCRE, 4, 'dr', .6) + t(275, 130, 'polimeriza', 18, MUT, 'middle', 600, 'fi', .7)
    o += t(600, 60, 'actina F (filamento)', 22, ACT, 'middle', 700, 'fi', .8)
    o += actin_strand(360, 840, 150, 1.0, r_=14)
    o += t(350, 230, '− (puntiagudo)', 19, INK, 'start', 700, 'fi', 1.3) + t(850, 230, '+ (barbado)', 19, INK, 'end', 700, 'fi', 1.3)
    o += mover(c(900, 100, 14, LRED, ACT, 2, ''), -40, 50, 1.8, 1.6)
    o += r(60, 300, 800, 240, CARD, LINE, 2, 16, 'fi', 1.6)
    items = ['Dos hebras de monómeros enrolladas en hélice', 'Polaridad: el extremo + crece más rápido que el −',
             'Tras unirse, el ATP se hidroliza a ADP', 'Forma la corteza, microvellosidades y el anillo contráctil']
    for i, s in enumerate(items):
        o += c(95, 345 + i*52, 7, ACT, 'none', 0, 'pp', 1.8 + i*.25) + t(115, 352 + i*52, s, 21, INK, 'start', 600, 'fi', 1.8 + i*.25)
    return svg(o, label='Polimerización de actina G a actina F con polaridad')

def F_mt():
    o = t(110, 50, 'dímero', 22, MTC, 'middle', 700, 'fi', 0)
    o += c(110, 110, 30, LCOB, MTC, 3, 'pp', .1) + t(110, 117, 'β', 22, MTC, 'middle', 700, 'fi', .2)
    o += c(110, 172, 30, '#a9b9f2', MTC, 3, 'pp', .2) + t(110, 179, 'α', 22, MTC, 'middle', 700, 'fi', .3)
    o += t(110, 238, 'GTP', 16, GREEN, 'middle', 700, 'fi', .4)
    o += arrow(160, 140, 230, 140, OCRE, 4, 'dr', .5)
    o += t(330, 50, 'protofilamento', 22, MTC, 'middle', 700, 'fi', .6)
    for k in range(8):
        y = 80 + k*28
        o += c(330, y, 13, LCOB if k % 2 == 0 else '#a9b9f2', MTC, 2, 'pp', .7 + k*.06)
    o += t(360, 80, '+', 26, INK, 'start', 700, 'fi', 1.2) + t(360, 290, '−', 26, INK, 'start', 700, 'fi', 1.2)
    o += arrow(400, 180, 470, 180, OCRE, 4, 'dr', 1.3)
    o += t(690, 50, 'corte transversal', 22, MTC, 'middle', 700, 'fi', 1.4)
    for k in range(13):
        a = math.radians(-90 + k*360/13)
        o += c(690 + 95*math.cos(a), 180 + 95*math.sin(a), 21, LCOB, MTC, 2.5, 'pp', 1.5 + k*.07)
    o += counter(690, 196, 13, 46, MTC, 'middle', 1.6)
    o += t(690, 310, 'protofilamentos · 25 nm', 19, MUT, 'middle', 700, 'fi', 2.4)
    o += r(60, 360, 800, 190, CARD, LINE, 2, 16, 'fi', 2.4)
    items = ['Tubo hueco de dímeros α/β-tubulina', 'Polaridad: β-tubulina expuesta en el extremo +', 'El extremo − queda anclado en el centrosoma']
    for i, s in enumerate(items):
        o += c(95, 405 + i*50, 7, MTC, 'none', 0, 'pp', 2.6 + i*.25) + t(115, 412 + i*50, s, 21, INK, 'start', 600, 'fi', 2.6 + i*.25)
    return svg(o, label='Microtúbulo: dímeros de tubulina, protofilamento y tubo de 13 protofilamentos')

def F_fi():
    steps = [(70, 'monómero', 'hélice α central'), (290, 'dímero', 'hélice enrollada'), (510, 'tetrámero', 'antiparalelo'), (730, 'filamento', '8 tetrámeros')]
    o = ''
    for i, (x, n, sub) in enumerate(steps):
        d = .2 + i*.8
        o += t(x + 70, 60, n, 22, IFC, 'middle', 700, 'fi', d) + t(x + 70, 86, sub, 17, MUT, 'middle', 600, 'fi', d)
        if i < 3:
            o += arrow(x + 160, 220, x + 200, 220, OCRE, 3, 'dr', d + .5)
    o += g(f'<circle cx="80" cy="220" r="10" fill="{IFC}"/><rect x="88" y="214" width="110" height="12" rx="6" fill="{LOCRE}" stroke="{IFC}" stroke-width="2"/><circle cx="206" cy="220" r="8" fill="{IFC}"/>', 'pp', .3)
    pair = ''
    for k in range(2):
        pts = ' '.join(f'{x},{220 + 7*math.sin((x-300)/9 + k*math.pi):.1f}' for x in range(300, 420, 3))
        pair += f'<polyline points="{pts}" fill="none" stroke="{IFC}" stroke-width="5"/>'
    o += g(pair, 'pp', 1.1)
    tet = f'<rect x="515" y="200" width="120" height="14" rx="7" fill="{LOCRE}" stroke="{IFC}" stroke-width="2"/><rect x="555" y="226" width="120" height="14" rx="7" fill="{TAN}" stroke="{IFC}" stroke-width="2"/>'
    tet += f'<text x="520" y="192" font-size="16" fill="{MUT}" font-weight="700">N→</text><text x="670" y="262" font-size="16" fill="{MUT}" text-anchor="end" font-weight="700">←N</text>'
    o += g(tet, 'pp', 1.9)
    o += if_rope(730, 890, 220, 2.7)
    o += r(60, 330, 800, 220, CARD, LINE, 2, 16, 'fi', 3.0)
    items = ['Sin polaridad: el tetrámero es antiparalelo', 'No usa ATP ni GTP; no sirve de riel para motores', 'Resistencia mecánica: soporta estiramiento', 'Queratinas, vimentina, neurofilamentos, láminas nucleares']
    for i, s in enumerate(items):
        o += c(95, 375 + i*48, 7, IFC, 'none', 0, 'pp', 3.1 + i*.25) + t(115, 382 + i*48, s, 21, INK, 'start', 600, 'fi', 3.1 + i*.25)
    return svg(o, label='Ensamblaje de los filamentos intermedios')

def tbl_comp():
    return table(['', 'Actina', 'Microtúbulos', 'F. intermedios'], [
        ['Diámetro', '≈7 nm', '25 nm', '≈10 nm'],
        ['Subunidad', 'Actina (ATP)', 'α/β-tubulina (GTP)', 'Varias (queratina, vimentina…)'],
        ['Polaridad', 'Sí', 'Sí', 'No'],
        ['Motores', 'Miosinas', 'Cinesinas, dineínas', 'Ninguno'],
        ['Función', 'Forma, movimiento, contracción', 'Transporte, huso, cilios', 'Resistencia mecánica'],
    ], cls='tb sm')

def F_tread():
    o = t(460, 50, 'Recambio rotatorio (treadmilling)', 24, ACT, 'middle', 700, 'fi', 0)
    o += actin_strand(220, 700, 220, .2, r_=16)
    o += t(200, 290, '− pierde', 20, INK, 'middle', 700, 'fi', .6) + t(720, 290, '+ gana', 20, INK, 'middle', 700, 'fi', .6)
    o += mover(f'<g><circle cx="830" cy="150" r="16" fill="{LRED}" stroke="{ACT}" stroke-width="2"/><text x="830" y="125" font-size="14" fill="{GREEN}" text-anchor="middle" font-weight="700">ATP</text></g>', -110, 70, .8, 2.2)
    o += mover(f'<g><circle cx="200" cy="225" r="16" fill="#e7d5d0" stroke="{MUT}" stroke-width="2"/><text x="200" y="200" font-size="14" fill="{MUT}" text-anchor="middle" font-weight="700">ADP</text></g>', -120, -70, 1.4, 2.2)
    o += f'<g class="mv" style="--d:1s;--t:5s;--dx:-450px;--dy:0px"><circle cx="680" cy="220" r="12" fill="{OCRE}"/></g>'
    o += t(460, 330, 'el monómero marcado (ocre) avanza del + al −', 18, TAND, 'middle', 700, 'fi', 1.2)
    o += r(60, 380, 800, 170, CARD, LINE, 2, 16, 'fi', 1.6)
    o += tl(460, 425, ['Con ATP-actina libre, el extremo + crece y el − se acorta:', 'el filamento conserva su largo pero sus subunidades se recambian.', 'Empuja la membrana en lamelipodios y filopodios.'], 21, INK, 'middle', 600, 'fi', 1.8)
    return svg(o, label='Recambio rotatorio de los filamentos de actina')

def F_dyn():
    o = t(220, 40, 'Crecimiento', 24, MTC, 'middle', 700, 'fi', 0) + t(680, 40, 'Catástrofe', 24, RED, 'middle', 700, 'fi', 0)
    o += p('M460,60 L460,560', LINE, 2, 'dr', 0)
    o += mt_tube(60, 340, 200, 60, .2, cap=60)
    o += t(310, 155, 'casquete de GTP', 18, TAND, 'middle', 700, 'fi', .6)
    for i in range(3):
        o += mover(f'<g><circle cx="400" cy="{150 + i*40}" r="11" fill="{OCRE}" stroke="{TAND}" stroke-width="2"/></g>', -50, 0, .8 + i*.4, 1.6)
    o += tl(220, 330, ['dímeros con GTP se unen', 'más rápido de lo que', 'se hidroliza el GTP'], 20, INK, 'middle', 600, 'fi', 1.2)
    o += mt_tube(500, 760, 200, 60, 1.4)
    for k, dy in enumerate([-24, -8, 8, 24]):
        col = MTC
        o += p(f'M760,{200+dy} C800,{200+dy} 820,{200 + dy*3} 830,{200 + dy*5}', col, 5, 'dr', 1.8 + k*.1)
    o += t(680, 300, 'pierde el casquete:', 20, INK, 'middle', 700, 'fi', 2.2)
    o += t(680, 326, 'protofilamentos se curvan y se separan', 18, INK, 'middle', 600, 'fi', 2.3)
    o += r(60, 420, 800, 130, CARD, OCRE, 2.5, 16, 'pp', 2.6)
    o += tl(460, 465, ['Inestabilidad dinámica: cada microtúbulo alterna entre crecer y encogerse;', 'si recupera el casquete se "rescata". Así explora la célula y captura cromosomas.'], 20, INK, 'middle', 600, 'fi', 2.8)
    return svg(o, label='Inestabilidad dinámica de los microtúbulos con casquete de GTP')

def F_motores():
    o = mt_tube(40, 880, 330, 44, 0)
    o += t(40, 400, '− (centrosoma)', 20, INK, 'start', 700, 'fi', .3) + t(880, 400, '+ (periferia)', 20, INK, 'end', 700, 'fi', .3)
    kin = (f'<g><path d="M300,306 L292,290 M318,306 L326,290" stroke="{GREEN}" stroke-width="7" stroke-linecap="round"/>'
           f'<line x1="309" y1="288" x2="309" y2="215" stroke="{GREEN}" stroke-width="5"/>'
           f'<circle cx="309" cy="180" r="36" fill="{LGREEN}" stroke="{GREEN}" stroke-width="3"/><text x="309" y="186" font-size="15" fill="{GREEN}" text-anchor="middle" font-weight="700">vesícula</text></g>')
    o += f'<g class="mv" style="--d:.6s;--t:3.4s;--dx:380px;--dy:0px">{kin}</g>'
    o += t(300, 110, 'cinesina → hacia +', 22, GREEN, 'middle', 700, 'fi', .5)
    dyn = (f'<g><ellipse cx="640" cy="372" rx="34" ry="22" fill="{LOCRE}" stroke="{TAND}" stroke-width="3"/>'
           f'<line x1="640" y1="394" x2="640" y2="450" stroke="{TAND}" stroke-width="5"/>'
           f'<circle cx="640" cy="484" r="34" fill="{LCOB}" stroke="{COB}" stroke-width="3"/><text x="640" y="490" font-size="15" fill="{COB}" text-anchor="middle" font-weight="700">carga</text></g>')
    o += f'<g class="mv" style="--d:.9s;--t:3.4s;--dx:-380px;--dy:0px">{dyn}</g>'
    o += t(640, 560, '← dineína hacia −', 22, TAND, 'middle', 700, 'fi', .8)
    o += t(460, 60, 'Ambos usan ATP para "caminar" sobre el microtúbulo', 20, INK, 'middle', 600, 'fi', 1.4)
    return svg(o, label='Cinesina y dineína transportan cargas en sentidos opuestos sobre un microtúbulo')

def F_sarc():
    o = t(460, 40, 'Sarcómero', 24, ACT, 'middle', 700, 'fi', 0)
    z = (f'<g class="mv" style="--d:1.2s;--t:2.4s;--dx:{{dx}}px;--dy:0px">'
         f'<rect x="{{x}}" y="90" width="12" height="300" rx="4" fill="{INK}"/>'
         + ''.join(f'<line x1="{{x2}}" y1="{y}" x2="{{x3}}" y2="{y}" stroke="{ACT}" stroke-width="6"/>' for y in (130, 200, 280, 350))
         + '</g>')
    o += z.format(dx=60, x=100, x2=112, x3=380)
    o += z.format(dx=-60, x=808, x2=540, x3=808)
    o += t(106, 420, 'disco Z', 19, INK, 'middle', 700, 'fi', .3) + t(814, 420, 'disco Z', 19, INK, 'middle', 700, 'fi', .3)
    for y in (165, 240, 315):
        o += r(300, y - 9, 320, 18, '#c9d4fa', COB, 2, 9, 'fi', .4)
        for x in list(range(310, 440, 26)) + list(range(490, 615, 26)):
            ang = -1 if x < 460 else 1
            o += p(f'M{x},{y - 9} l{-8*ang},-14', COB, 3, 'dr', .6)
            o += p(f'M{x},{y + 9} l{-8*ang},14', COB, 3, 'dr', .6)
    o += t(460, 470, 'actina (fina, rojo) · miosina II (gruesa, azul)', 20, INK, 'middle', 700, 'fi', .8)
    o += r(60, 495, 800, 80, CARD, OCRE, 2.5, 14, 'pp', 1.4)
    o += tl(460, 528, ['Las cabezas de miosina, con ATP, jalan la actina hacia el centro:', 'los discos Z se acercan; los filamentos no se acortan, se deslizan.'], 19, INK, 'middle', 600, 'fi', 1.6)
    return svg(o, label='Sarcómero: deslizamiento de actina sobre miosina II')

def F_centro():
    o = t(250, 40, 'Centrosoma', 24, MTC, 'middle', 700, 'fi', 0)
    o += c(250, 260, 150, LOCRE, 'none', 0, 'pp', .1) + t(250, 440, 'material pericentriolar', 18, TAND, 'middle', 700, 'fi', .3)
    o += r(170, 230, 90, 50, '#c9d4fa', MTC, 3, 8, 'pp', .4) + r(265, 200, 50, 100, '#c9d4fa', MTC, 3, 8, 'pp', .5)
    o += t(215, 220, 'centriolos', 17, MTC, 'middle', 700, 'fi', .6)
    for k in range(10):
        a = math.radians(k*36 + 10)
        x1, y1 = 250 + 120*math.cos(a), 260 + 120*math.sin(a)
        o += f'<path d="M{x1:.0f},{y1:.0f} a5,5 0 1,0 0.1,0" stroke="{GREEN}" stroke-width="5" fill="none"{st("pp", .8)}/>'
        o += p(f'M{x1:.0f},{y1:.0f} L{250 + 230*math.cos(a):.0f},{260 + 230*math.sin(a):.0f}', MTC, 3, 'dr', 1.0 + k*.05)
    o += t(250, 500, 'γ-tubulina (verde) nuclea; el extremo − queda en el centro', 16, GREEN, 'middle', 700, 'fi', 1.4)
    o += t(700, 40, 'Centriolo en corte', 24, MTC, 'middle', 700, 'fi', 1.6)
    for k in range(9):
        a = math.radians(-90 + k*40)
        dirr = a + math.radians(60)
        for j in range(3):
            x = 700 + 105*math.cos(a) + (j - 1)*20*math.cos(dirr)
            y = 230 + 105*math.sin(a) + (j - 1)*20*math.sin(dirr)
            o += c(round(x), round(y), 10, LCOB, MTC, 2, 'pp', 1.8 + k*.1)
    o += t(700, 238, '9 tripletes', 22, MTC, 'middle', 700, 'fi', 2.8)
    o += tl(700, 420, ['9 tripletes de microtúbulos,', 'sin par central (9 + 0)'], 19, INK, 'middle', 600, 'fi', 3.0)
    return svg(o, label='Centrosoma con centriolos, gamma tubulina y corte de centriolo')

def F_cilio():
    cx, cy = 300, 300
    o = c(cx, cy, 230, '#fbf6ea', MUT, 2, 'pp', 0)
    o += doublets(cx, cy, 165, .2, True, 17)
    o += c(cx - 22, cy, 17, LCOB, MTC, 3, 'pp', 1.2) + c(cx + 22, cy, 17, LCOB, MTC, 3, 'pp', 1.2)
    o += t(cx, cy + 50, 'par central', 17, MTC, 'middle', 700, 'fi', 1.3)
    o += t(cx, 560, 'axonema 9 + 2', 26, MTC, 'middle', 700, 'fi', 1.0)
    o += t(640, 120, 'brazos de dineína (ocre)', 20, TAND, 'start', 700, 'fi', 1.8)
    o += t(640, 150, 'hacen deslizar los dobletes', 18, INK, 'start', 600, 'fi', 1.9)
    cil = f'<g class="wob" style="--d:2s;transform-origin:760px 520px"><path d="M760,520 C760,420 780,320 740,230" stroke="{MTC}" stroke-width="12" fill="none" stroke-linecap="round"/></g>'
    o += cil + r(660, 520, 200, 30, LOCRE, TAND, 2, 6, 'fi', 2.0) + t(760, 580, 'cilio batiendo', 18, MUT, 'middle', 600, 'fi', 2.1)
    o += t(640, 200, 'nexina limita el deslizamiento:', 18, INK, 'start', 600, 'fi', 2.2) + t(640, 225, 'el cilio se dobla', 18, INK, 'start', 600, 'fi', 2.2)
    return svg(o, label='Corte del axonema de un cilio con disposición 9 más 2')

def F_huso():
    o = t(230, 40, 'Metafase: huso mitótico', 22, MTC, 'middle', 700, 'fi', 0) + t(690, 40, 'Citocinesis', 22, ACT, 'middle', 700, 'fi', 0)
    o += p('M460,60 L460,560', LINE, 2, 'dr', 0)
    L, R, cy = (70, 300), (390, 300), 300
    o += c(*L, 14, OCRE, TAND, 2, 'pp', .2) + c(*R, 14, OCRE, TAND, 2, 'pp', .2)
    for k, yy in enumerate([220, 260, 300, 340, 380]):
        o += p(f'M70,300 L222,{yy}', MTC, 2.5, 'dr', .4 + k*.05) + p(f'M390,300 L238,{yy}', MTC, 2.5, 'dr', .4 + k*.05)
        o += f'<rect x="221" y="{yy - 13}" width="18" height="26" rx="7" fill="{RED}"{st("pp", .9 + k*.08)}/>'
    for a in (-150, 150, 180, -130, 130):
        rad = math.radians(a)
        o += p(f'M70,300 l{60*math.cos(rad):.0f},{60*math.sin(rad):.0f}', MTC, 2.5, 'dr', 1.2)
        o += p(f'M390,300 l{-60*math.cos(rad):.0f},{60*math.sin(rad):.0f}', MTC, 2.5, 'dr', 1.2)
    o += p('M70,300 L260,160', MTC, 2.5, 'dr', 1.3) + p('M390,300 L200,160', MTC, 2.5, 'dr', 1.3)
    o += t(230, 140, 'polares (se solapan)', 16, MUT, 'middle', 700, 'fi', 1.5)
    o += t(230, 430, 'cinetocóricos → cromosomas', 17, MUT, 'middle', 700, 'fi', 1.5) + t(70, 395, 'astrales', 16, MUT, 'middle', 700, 'fi', 1.5)
    o += tl(230, 500, ['microtúbulos separan', 'las cromátidas'], 19, INK, 'middle', 600, 'fi', 1.8)
    o += f'<path d="M520,180 C520,110 670,110 690,230 C710,110 860,110 860,180 L860,420 C860,490 710,490 690,370 C670,490 520,490 520,420 Z" fill="#fbf6ea" stroke="{INK}" stroke-width="3"{st("pp", 2.0)}/>'
    o += c(600, 300, 40, LCOB, COB, 2, 'pp', 2.2) + c(780, 300, 40, LCOB, COB, 2, 'pp', 2.2)
    o += f'<ellipse cx="690" cy="300" rx="14" ry="74" fill="none" stroke="{ACT}" stroke-width="7"{st("pu", 2.4)}/>'
    o += tl(690, 500, ['anillo contráctil de', 'actina + miosina II'], 19, ACT, 'middle', 700, 'fi', 2.6)
    return svg(o, label='Huso mitótico de microtúbulos y anillo contráctil de actina en la citocinesis')

def F_uniones():
    o = r(80, 60, 360, 420, '#fbf6ea', INK, 3, 20, 'pp', 0) + r(480, 60, 360, 420, '#fbf6ea', INK, 3, 20, 'pp', 0)
    o += r(40, 490, 840, 30, LOCRE, TAND, 2, 6, 'fi', .2) + t(460, 560, 'lámina basal', 18, TAND, 'middle', 700, 'fi', .3)
    o += p('M440,130 L480,130', INK, 0, 'dr', 0)
    o += r(428, 115, 64, 30, LRED, ACT, 2, 6, 'pp', .5)
    o += p('M428,130 L140,130', ACT, 6, 'dr', .7) + p('M492,130 L780,130', ACT, 6, 'dr', .7)
    o += t(260, 108, 'unión adherente + cinturón de actina', 17, ACT, 'middle', 700, 'fi', .9)
    o += r(428, 260, 64, 60, LOCRE, IFC, 2, 6, 'pp', 1.1)
    for k in range(4):
        o += p(f'M428,{270 + k*14} Q{360 - k*20},{230 + k*30} {300 - k*30},{200 + k*40}', IFC, 3, 'dr', 1.3 + k*.08)
        o += p(f'M492,{270 + k*14} Q{560 + k*20},{230 + k*30} {620 + k*30},{200 + k*40}', IFC, 3, 'dr', 1.3 + k*.08)
    o += t(500, 450, 'desmosoma + queratina', 17, IFC, 'start', 700, 'fi', 1.6)
    o += r(220, 470, 70, 22, LOCRE, IFC, 2, 6, 'pp', 1.8)
    for k in range(3):
        o += p(f'M{235 + k*20},470 Q{240 + k*20},420 {210 + k*30},380', IFC, 3, 'dr', 2.0 + k*.1)
    o += t(300, 465, 'hemidesmosoma', 16, IFC, 'start', 700, 'fi', 2.2)
    o += c(260, 300, 50, LCOB, COB, 2, 'pp', .1) + c(660, 300, 50, LCOB, COB, 2, 'pp', .1)
    return svg(o, label='Uniones celulares ancladas a actina y a filamentos intermedios')

def F_abp():
    o = actin_strand(80, 520, 280, .1, r_=12)
    o += actin_strand(330, 640, 280, .6, r_=12, cls='fi')
    o = actin_strand(80, 640, 300, .1, r_=12)
    o += f'<g transform="rotate(-70 360 300)">{actin_strand(360, 600, 300, 0, r_=12, cls="")}</g>'
    o += r(340, 280, 40, 30, LCOB, COB, 3, 8, 'pp', .9)
    o += t(380, 350, 'Arp2/3: ramifica (≈70°)', 18, COB, 'start', 700, 'fi', 1.0)
    o += r(632, 282, 34, 36, LGREEN, GREEN, 3, 8, 'pp', 1.2) + t(700, 300, 'formina: filamento', 17, GREEN, 'start', 700, 'fi', 1.3) + t(700, 322, 'recto en el +', 17, GREEN, 'start', 700, 'fi', 1.3)
    o += f'<g class="pp" style="--d:1.5s"><circle cx="460" cy="120" r="18" fill="{OCRE}"/><circle cx="440" cy="110" r="12" fill="{LRED}" stroke="{ACT}" stroke-width="2"/></g>'
    o += t(490, 118, 'capping: tapa el +', 17, TAND, 'start', 700, 'fi', 1.6)
    o += f'<path d="M180,280 l20,40" stroke="{RED}" stroke-width="5"{st("pu", 1.8)}/>' + t(160, 360, 'cofilina: corta', 17, RED, 'middle', 700, 'fi', 1.9) + t(160, 382, 'actina-ADP', 17, RED, 'middle', 700, 'fi', 1.9)
    o += r(40, 430, 400, 120, CARD, LINE, 2, 14, 'fi', 2.1)
    o += t(60, 470, 'Profilina: lleva actina-ATP al +', 19, INK, 'start', 600, 'fi', 2.2)
    o += t(60, 510, 'Timosina β4: secuestra monómeros', 19, INK, 'start', 600, 'fi', 2.3)
    o += r(480, 430, 400, 120, CARD, LINE, 2, 14, 'fi', 2.4)
    o += tl(680, 470, ['La célula controla dónde, cuándo', 'y cuánta actina se polimeriza'], 19, INK, 'middle', 600, 'fi', 2.5)
    return svg(o, label='Proteínas de unión a actina: Arp2/3, formina, cofilina, proteína de casquete, profilina y timosina')

def F_rho():
    o = c(140, 120, 50, '#e6e6e6', MUT, 2, 'pp', .1) + t(140, 127, 'GDP', 20, MUT, 'middle', 700, 'fi', .2) + t(140, 200, 'inactiva', 17, MUT, 'middle', 600, 'fi', .2)
    o += c(380, 120, 50, LGREEN, GREEN, 2, 'pp', .4) + t(380, 127, 'GTP', 20, GREEN, 'middle', 700, 'fi', .5) + t(380, 200, 'activa', 17, GREEN, 'middle', 600, 'fi', .5)
    o += carrow('M190,100 C240,60 280,60 330,100', 330, 100, 40, GREEN, 3, .6) + t(260, 55, 'GEF', 17, GREEN, 'middle', 700, 'fi', .7)
    o += carrow('M330,145 C280,185 240,185 190,145', 190, 145, 220, MUT, 3, .8) + t(260, 200, 'GAP', 17, MUT, 'middle', 700, 'fi', .9)
    o += t(660, 100, 'Interruptores moleculares', 22, INK, 'middle', 700, 'fi', 1.0) + t(660, 128, 'de la familia Rho', 22, INK, 'middle', 700, 'fi', 1.0)
    cards = [(40, 'Rho', 'fibras de estrés', 'y adhesiones focales', RED), (330, 'Rac', 'lamelipodios', '(red ramificada, Arp2/3)', COB), (620, 'Cdc42', 'filopodios', '(haces paralelos, formina)', GREEN)]
    for i, (x, n, a, b, col) in enumerate(cards):
        d = 1.3 + i*.5
        o += r(x, 260, 260, 290, CARD, col, 3, 16, 'pp', d) + t(x + 130, 300, n, 28, col, 'middle', 700, 'fi', d + .1)
        cx = x + 130
        if i == 0:
            for k in range(4):
                o += p(f'M{x + 30},{360 + k*28} L{x + 230},{350 + k*30}', RED, 4, 'dr', d + .3 + k*.1)
        elif i == 1:
            o += p(f'M{x + 30},{450} C{x + 60},{350} {x + 200},{350} {x + 230},{450}', COB, 4, 'dr', d + .3)
            for k in range(8):
                o += p(f'M{x + 60 + k*22},{400 - (8 if k in (3, 4) else 0)} l{8 - (k % 3)*8},-26', COB, 2.5, 'dr', d + .5)
        else:
            o += p(f'M{x + 30},{450} L{x + 230},{450}', GREEN, 4, 'dr', d + .3)
            for k in range(4):
                o += p(f'M{x + 60 + k*45},450 L{x + 60 + k*45},{370 - (k % 2)*20}', GREEN, 4, 'dr', d + .4 + k*.1)
        o += t(cx, 495, a, 19, INK, 'middle', 700, 'fi', d + .6) + t(cx, 522, b, 15, MUT, 'middle', 600, 'fi', d + .6)
    return svg(o, label='GTPasas Rho, Rac y Cdc42 y las estructuras de actina que inducen')

def tbl_farm():
    return table(['Fármaco o toxina', 'Blanco', 'Efecto y uso'], [
        ['Colchicina', 'Tubulina libre', 'Impide polimerizar MT; gota (frena neutrófilos)'],
        ['Vincristina, vinblastina', 'Tubulina', 'Impiden el huso: quimioterapia'],
        ['Paclitaxel (taxol)', 'Microtúbulos', 'Los estabiliza: bloquea la mitosis; quimioterapia'],
        ['Citocalasina', 'Extremo + de actina', 'Impide la polimerización'],
        ['Faloidina (<i>Amanita</i>)', 'Actina F', 'La estabiliza; se usa para teñir actina'],
    ], cls='tb sm')

def F_kart():
    o = t(230, 40, 'Normal', 24, GREEN, 'middle', 700, 'fi', 0) + t(690, 40, 'Discinesia ciliar primaria', 22, RED, 'middle', 700, 'fi', 0)
    for (cx, arms, d) in [(230, True, .2), (690, False, 1.0)]:
        o += c(cx, 230, 150, '#fbf6ea', MUT, 2, 'pp', d)
        o += doublets(cx, 230, 110, d, arms, 13)
        o += c(cx - 16, 230, 12, LCOB, MTC, 2, 'pp', d + .5) + c(cx + 16, 230, 12, LCOB, MTC, 2, 'pp', d + .5)
    o += t(230, 410, 'con brazos de dineína', 18, TAND, 'middle', 700, 'fi', .9)
    o += t(690, 410, 'sin brazos: el cilio no bate', 18, RED, 'middle', 700, 'fi', 1.7)
    o += r(60, 445, 800, 115, CARD, RED, 2.5, 14, 'pp', 2.0)
    o += tl(460, 482, ['Infecciones respiratorias y bronquiectasias · infertilidad;', 'si se asocia a situs inversus: síndrome de Kartagener'], 20, INK, 'middle', 600, 'fi', 2.2)
    return svg(o, label='Axonema normal frente a axonema sin brazos de dineína en la discinesia ciliar primaria')

def F_epid():
    o = t(250, 40, 'Epidermólisis bullosa simple', 21, IFC, 'middle', 700, 'fi', 0)
    o += r(40, 500, 420, 24, LOCRE, TAND, 2, 6, 'fi', .1) + t(250, 548, 'dermis', 17, TAND, 'middle', 700, 'fi', .1)
    for row in range(4):
        for k in range(6):
            x = 50 + k*68 + (row % 2)*20
            y = 420 - row*80
            if row == 0 and k in (2, 3):
                continue
            o += r(x, y, 60, 70 - row*8, '#fbf6ea', INK, 2, 10, 'pp', .2 + row*.15)
    o += e(250, 450, 80, 34, '#fff2ee', RED, 3, 'pu', 1.2) + t(250, 457, 'ampolla', 18, RED, 'middle', 700, 'fi', 1.3)
    o += tl(250, 100, ['queratinas K5/K14 mutadas', 'en la capa basal: se rompe con el roce'], 17, INK, 'middle', 600, 'fi', 1.5)
    o += p('M480,60 L480,560', LINE, 2, 'dr', 0)
    o += t(700, 40, 'Progeria (Hutchinson-Gilford)', 21, IFC, 'middle', 700, 'fi', 1.6)
    o += f'<path d="M620,180 C580,120 680,90 720,130 C780,100 830,170 800,220 C850,280 790,350 730,320 C690,380 600,350 610,290 C560,250 580,190 620,180 Z" fill="{LCOB}" stroke="{COB}" stroke-width="4"{st("pp", 1.8)}/>'
    o += t(705, 240, 'núcleo deformado', 18, COB, 'middle', 700, 'fi', 2.0)
    o += tl(700, 420, ['lámina A anómala: la lámina', 'nuclear pierde su forma →', 'envejecimiento prematuro'], 18, INK, 'middle', 600, 'fi', 2.2)
    return svg(o, label='Enfermedades de filamentos intermedios: epidermólisis bullosa simple y progeria')

DECK = dict(
  page_title='Citoesqueleto', materia='Biología Celular', title='El citoesqueleto',
  subtitle='Actina, microtúbulos y filamentos intermedios: forma, movimiento y transporte',
  cover_notes='Hoy explicamos el citoesqueleto: la red de filamentos que da forma a la célula, le permite moverse, transportar cargas y dividirse. Usamos como base el Alberts, capítulo del citoesqueleto.',
  index_notes='Seguimos seis niveles: qué es, sus tres piezas, cómo funcionan, cómo se integran en estructuras como cilios y huso, cómo se regulan y su relevancia clínica.',
  levels=[
    dict(name='Fundamentos', desc='Qué es y para qué sirve', intro='Una red dinámica de proteínas que da forma y movimiento a la célula.', notes='Empecemos por la idea general.', slides=[
      dict(title='El esqueleto que se mueve', tag='b', chain=2, fig=F_celula(),
           text='<p class="lead">El citoesqueleto es una red de filamentos proteicos en el citoplasma.</p><ul><li>Da <b>forma</b> y resistencia.</li><li>Permite el <b>movimiento</b> y la división.</li><li>Sirve de <b>riel</b> para el transporte.</li></ul><p class="note-v">A diferencia de un esqueleto óseo, se arma y se desarma constantemente.</p>',
           notes='El citoesqueleto es un sistema de filamentos de proteína que recorre el citoplasma. Organiza el interior, da forma, permite que la célula se mueva y se divida, y funciona como vía de transporte. Lo más importante: es dinámico. Sus filamentos se arman y se desarman en minutos según lo que la célula necesite. En el dibujo: actina en rojo bajo la membrana, microtúbulos en azul desde el centrosoma y filamentos intermedios en ocre desde el núcleo.'),
      dict(title='Tres tipos de filamentos', tag='b', chain=0, fig=F_tres(),
           text='<p class="lead">Se distinguen por su grosor y su subunidad.</p><ul><li><b>Actina</b>: los más delgados.</li><li><b>Intermedios</b>: grosor medio, como cuerdas.</li><li><b>Microtúbulos</b>: tubos huecos, los más gruesos.</li></ul>',
           notes='Hay tres tipos de filamentos. Los de actina, también llamados microfilamentos, son los más delgados, de unos 7 nanómetros. Los intermedios miden unos 10 nanómetros y se llaman así porque su grosor está entre los otros dos. Los microtúbulos son tubos huecos de 25 nanómetros. Cada uno está hecho de una proteína distinta y cumple funciones distintas.'),
    ]),
    dict(name='Piezas', desc='Actina, tubulina y filamentos intermedios', intro='Cada filamento se construye con una subunidad distinta.', notes='Veamos cómo se construye cada filamento.', slides=[
      dict(title='Filamentos de actina', tag='b', chain=0, fig=F_actina(),
           text='<p class="lead">Monómeros de <b>actina G</b> con ATP forman <b>actina F</b>.</p><ul><li>Filamento con <b>polaridad</b>: extremo + y −.</li><li>El + crece más rápido.</li></ul>',
           notes='La actina globular, o actina G, une ATP y se polimeriza formando la actina filamentosa, o F, que se ve como dos hebras enrolladas. Todos los monómeros apuntan en la misma dirección, así que el filamento tiene polaridad: un extremo más, o barbado, que crece rápido, y un extremo menos, o puntiagudo. Después de unirse, el ATP se hidroliza a ADP, y eso debilita al filamento viejo. La actina forma la corteza celular, las microvellosidades y el anillo contráctil.'),
      dict(title='Microtúbulos', tag='b', chain=0, fig=F_mt(),
           text='<p class="lead">Dímeros de <b>α/β-tubulina</b> con GTP forman un tubo.</p><ul><li>Los dímeros se alinean en <b>protofilamentos</b>.</li><li>13 protofilamentos forman el tubo.</li><li>Extremo + (β) y extremo − (α).</li></ul>',
           notes='La subunidad del microtúbulo es un dímero de alfa y beta tubulina, ambas unidas a GTP. Los dímeros se colocan uno tras otro formando un protofilamento, y 13 protofilamentos se cierran en un tubo hueco de 25 nanómetros. Como los dímeros tienen orientación, el microtúbulo tiene polaridad: el extremo más expone beta tubulina y crece rápido; el extremo menos expone alfa tubulina y normalmente está anclado al centrosoma.'),
      dict(title='Filamentos intermedios', tag='b', chain=0, fig=F_fi(),
           text='<p class="lead">Proteínas fibrosas que forman cuerdas resistentes.</p><ul><li>El tetrámero es <b>antiparalelo</b>: no hay polaridad.</li><li>No hay motores sobre ellos.</li><li>Su función es la <b>resistencia mecánica</b>.</li></ul>',
           notes='Los filamentos intermedios se arman de forma muy distinta. Cada monómero tiene una larga hélice alfa central. Dos monómeros se enrollan en paralelo formando un dímero; dos dímeros se unen en sentido opuesto formando un tetrámero antiparalelo. Por eso el filamento final no tiene polaridad y no sirve como riel para motores. Ocho tetrámeros se empaquetan lateralmente formando una cuerda muy resistente a la tensión. Existen distintos tipos según el tejido: queratinas en epitelios, vimentina en células mesenquimatosas, neurofilamentos en neuronas y láminas en el núcleo.'),
      dict(title='Comparación de los tres filamentos', tag='b', chain=2, fig=wrapfig(tbl_comp()),
           text='<p class="lead">Polaridad y nucleótido explican sus diferencias.</p><ul><li>Actina y microtúbulos: polares, dinámicos, con motores.</li><li>Intermedios: no polares, estables, resistentes.</li></ul>',
           notes='Esta tabla resume las diferencias. Actina y microtúbulos tienen polaridad, unen un nucleótido, ATP o GTP, son muy dinámicos y tienen motores: miosinas sobre actina, cinesinas y dineínas sobre microtúbulos. Los intermedios no tienen polaridad, no unen nucleótidos, no tienen motores y su función es soportar estiramiento.'),
    ]),
    dict(name='Funcionamiento', desc='Dinámica y motores', intro='Cómo crecen, se encogen y transportan.', notes='Ahora veamos cómo funcionan.', slides=[
      dict(title='Actina: recambio rotatorio', tag='m', chain=1, fig=F_tread(),
           text='<p class="lead">El filamento crece por el + y se pierde por el −.</p><ul><li>Se llama <b>treadmilling</b>.</li><li>El largo se mantiene, las subunidades se renuevan.</li><li>Empuja la membrana al migrar.</li></ul>',
           notes='Como el extremo más une actina-ATP más rápido que el menos, en ciertas concentraciones de monómero ocurre algo curioso: el extremo más crece mientras el menos pierde subunidades con ADP. El filamento mantiene su longitud pero sus subunidades avanzan, como en una banda rodante. Este fenómeno permite empujar la membrana en el frente de una célula que migra.'),
      dict(title='Microtúbulos: inestabilidad dinámica', tag='b', chain=1, fig=F_dyn(),
           text='<p class="lead">El <b>casquete de GTP</b> decide si crece o se derrumba.</p><ul><li>Con casquete: crece.</li><li>Sin casquete: <b>catástrofe</b>, se encoge rápido.</li><li>Puede ser <b>rescatado</b>.</li></ul>',
           notes='Los dímeros nuevos llegan con GTP. Mientras se añaden más rápido de lo que se hidroliza el GTP, el extremo conserva un casquete de GTP y el microtúbulo es estable y crece. Si el casquete se pierde, la tubulina con GDP tiende a curvarse, los protofilamentos se separan y el microtúbulo se desarma rápidamente: una catástrofe. Si recupera el casquete, se rescata. Esta inestabilidad dinámica le permite explorar el citoplasma, por ejemplo para encontrar los cinetocoros en la mitosis.'),
      dict(title='Motores sobre microtúbulos', tag='b', chain=2, fig=F_motores(),
           text='<p class="lead">Proteínas motoras usan ATP para transportar carga.</p><ul><li><b>Cinesina</b>: casi siempre hacia el extremo +.</li><li><b>Dineína</b>: hacia el extremo −.</li><li>Mueven vesículas, organelos y cromosomas.</li></ul>',
           notes='Las proteínas motoras convierten la energía del ATP en movimiento. Las cinesinas caminan, en su mayoría, hacia el extremo más, es decir, del centro a la periferia: por ejemplo, del cuerpo de una neurona hacia el axón. Las dineínas caminan hacia el extremo menos, de la periferia al centro. Así se transportan vesículas, organelos y, en la mitosis, cromosomas.'),
      dict(title='Miosina II y contracción muscular', tag='b', chain=2, fig=F_sarc(),
           text='<p class="lead">La miosina II jala filamentos de actina.</p><ul><li>En el <b>sarcómero</b>, la actina se ancla al disco Z.</li><li>La miosina desliza la actina hacia el centro.</li><li>El sarcómero se acorta: <b>contracción</b>.</li></ul>',
           notes='La miosina es el motor de la actina. La miosina II forma filamentos gruesos con cabezas hacia ambos lados. En el músculo, la unidad contráctil es el sarcómero: los filamentos finos de actina están anclados a los discos Z y los gruesos de miosina en el centro. Con ATP, las cabezas de miosina jalan la actina hacia el centro, los discos Z se acercan y el sarcómero se acorta. Ningún filamento se acorta: se deslizan unos sobre otros.'),
    ]),
    dict(name='Integración', desc='Estructuras que se construyen con el citoesqueleto', intro='Centrosomas, cilios, huso mitótico y uniones celulares.', notes='Integremos en estructuras celulares concretas.', slides=[
      dict(title='El centrosoma', tag='b', chain=0, fig=F_centro(),
           text='<p class="lead">Es el principal centro organizador de microtúbulos.</p><ul><li>Dos <b>centriolos</b> perpendiculares.</li><li>La <b>γ-tubulina</b> nuclea los microtúbulos.</li><li>El extremo − queda anclado al centrosoma.</li></ul>',
           notes='El centrosoma está junto al núcleo. Tiene dos centriolos perpendiculares rodeados de material pericentriolar, que contiene complejos de anillo de gamma tubulina. Estos anillos son el molde donde nacen los microtúbulos, con su extremo menos anclado al centrosoma y el más creciendo hacia la periferia. Cada centriolo está formado por nueve tripletes de microtúbulos sin par central. Duplicar el centrosoma es necesario para formar los dos polos del huso.'),
      dict(title='Cilios y flagelos: axonema 9 + 2', tag='b', chain=1, fig=F_cilio(),
           text='<p class="lead">Nueve dobletes periféricos y un par central.</p><ul><li>La <b>dineína ciliar</b> desliza un doblete sobre otro.</li><li>Las uniones de nexina convierten el deslizamiento en <b>flexión</b>.</li></ul>',
           notes='Los cilios y flagelos móviles tienen un esqueleto de microtúbulos llamado axonema, con nueve dobletes periféricos y un par central: el patrón 9 más 2. Del túbulo A de cada doblete salen brazos de dineína que caminan sobre el doblete vecino. Como los dobletes están unidos por nexina, no pueden deslizarse libremente y el resultado es que el cilio se dobla. Los cilios del epitelio respiratorio mueven el moco, y el flagelo mueve al espermatozoide.'),
      dict(title='División celular: huso y anillo contráctil', tag='b', chain=2, fig=F_huso(),
           text='<p class="lead">Los microtúbulos separan cromosomas; la actina divide la célula.</p><ul><li><b>Huso mitótico</b>: microtúbulos cinetocóricos, polares y astrales.</li><li><b>Anillo contráctil</b>: actina y miosina II.</li></ul>',
           notes='En la mitosis se combinan dos sistemas. Los microtúbulos forman el huso mitótico desde dos centrosomas: los cinetocóricos se unen a los cromosomas, los polares se solapan en el centro y los astrales se dirigen a la corteza. Ellos separan las cromátidas hermanas. Después, en la citocinesis, un anillo de actina y miosina II se contrae en el ecuador y divide el citoplasma en dos.'),
      dict(title='Uniones celulares', tag='m', chain=2, fig=F_uniones(),
           text='<p class="lead">El citoesqueleto se ancla en uniones para formar tejidos.</p><ul><li><b>Uniones adherentes</b>: actina.</li><li><b>Desmosomas</b>: filamentos intermedios entre células.</li><li><b>Hemidesmosomas</b>: filamentos intermedios a la lámina basal.</li></ul>',
           notes='El citoesqueleto conecta células entre sí. En las uniones adherentes, las cadherinas se conectan por dentro con un cinturón de actina. En los desmosomas, las cadherinas se conectan con filamentos intermedios de queratina, lo que da resistencia al epitelio. Los hemidesmosomas anclan los filamentos intermedios a la lámina basal mediante integrinas. Así, la tensión se reparte por todo el tejido.'),
    ]),
    dict(name='Regulación', desc='Quién decide dónde se arma', intro='Proteínas accesorias y señales controlan el citoesqueleto.', notes='Veamos cómo se regula.', slides=[
      dict(title='Proteínas que controlan la actina', tag='m', chain=1, fig=F_abp(),
           text='<p class="lead">Proteínas accesorias deciden dónde y cómo crece la actina.</p><ul><li><b>Nucleación</b>: Arp2/3 (ramas) y forminas (rectos).</li><li><b>Monómeros</b>: profilina y timosina.</li><li><b>Corte y casquete</b>: cofilina y proteína de casquete.</li></ul>',
           notes='La actina pura se polimeriza lento; la célula decide dónde mediante proteínas accesorias. Arp2/3 nuclea un nuevo filamento de lado sobre otro, formando ramas a unos 70 grados: es la red del lamelipodio. Las forminas nuclean filamentos rectos y largos desde el extremo más. La profilina entrega actina-ATP al extremo más, mientras la timosina beta 4 secuestra monómeros como reserva. La cofilina corta filamentos viejos con ADP y la proteína de casquete tapa el extremo más para detener el crecimiento.'),
      dict(title='Rho, Rac y Cdc42', tag='m', chain=4, fig=F_rho(),
           text='<p class="lead">GTPasas pequeñas actúan como interruptores.</p><ul><li><b>Rho</b>: fibras de estrés.</li><li><b>Rac</b>: lamelipodios.</li><li><b>Cdc42</b>: filopodios.</li></ul>',
           notes='Las señales externas llegan al citoesqueleto a través de GTPasas de la familia Rho. Son interruptores: activas con GTP, inactivas con GDP. Los GEF las activan y los GAP las apagan. Rho activa forma fibras de estrés con miosina; Rac activa la red ramificada de Arp2/3 en los lamelipodios; Cdc42 activa forminas y forma filopodios. Coordinadas, permiten la migración, por ejemplo de un neutrófilo hacia una bacteria.'),
    ]),
    dict(name='Clínica', desc='Fármacos y enfermedades', intro='Qué pasa cuando se bloquea o se altera el citoesqueleto.', notes='Finalmente, la clínica.', slides=[
      dict(title='Fármacos sobre el citoesqueleto', tag='b', chain=4, fig=wrapfig(tbl_farm()),
           text='<p class="lead">Bloquear microtúbulos detiene la mitosis.</p><ul><li>Útil contra el cáncer: vincristina, paclitaxel.</li><li>Colchicina en la <b>gota</b>.</li><li>Las toxinas de actina son herramientas de laboratorio.</li></ul>',
           notes='Como el huso mitótico depende de la dinámica de los microtúbulos, cualquier fármaco que la altere detiene la división. La vincristina y la vinblastina impiden polimerizar; el paclitaxel, al contrario, estabiliza demasiado los microtúbulos. Ambos bloquean la mitosis y se usan en quimioterapia. La colchicina impide la polimerización e inhibe la migración de neutrófilos, por eso se usa en la gota. La citocalasina y la faloidina actúan sobre la actina; la faloidina fluorescente se usa para teñir actina en el laboratorio.'),
      dict(title='Discinesia ciliar primaria', tag='m', chain=4, fig=F_kart(),
           text='<p class="lead">Sin brazos de dineína, los cilios no baten.</p><ul><li>El moco no se elimina: infecciones y bronquiectasias.</li><li>Espermatozoides inmóviles: infertilidad.</li><li>Con situs inversus: <b>síndrome de Kartagener</b>.</li></ul>',
           notes='Si la dineína ciliar falta o es defectuosa, el axonema no puede deslizar sus dobletes y los cilios no se mueven. El moco se acumula y aparecen sinusitis, bronquitis y bronquiectasias de repetición. Los espermatozoides tampoco se mueven. En el embrión, los cilios del nodo determinan la izquierda y la derecha; sin ellos, la lateralidad es aleatoria y cerca de la mitad tiene situs inversus. Esa combinación es el síndrome de Kartagener.'),
      dict(title='Si fallan los filamentos intermedios', tag='m', chain=4, fig=F_epid(),
           text='<p class="lead">Sin filamentos intermedios sanos, el tejido no resiste.</p><ul><li>Queratinas <b>K5/K14</b>: epidermólisis bullosa simple.</li><li>Lámina A: <b>progeria</b>.</li></ul>',
           notes='Estas enfermedades demuestran que la función de los filamentos intermedios es mecánica. En la epidermólisis bullosa simple hay mutaciones en las queratinas 5 o 14 de los queratinocitos basales: con un roce mínimo las células se rompen y se forman ampollas. En la progeria de Hutchinson-Gilford, una forma anómala de lámina A deforma el núcleo y causa envejecimiento prematuro.'),
    ]),
  ],
  close=[
    'Tres filamentos: <strong>actina</strong> (≈7 nm), <strong>intermedios</strong> (≈10 nm) y <strong>microtúbulos</strong> (25 nm).',
    'Actina y microtúbulos tienen <strong>polaridad</strong> y unen ATP o GTP.',
    'Los intermedios no son polares: dan <strong>resistencia mecánica</strong>.',
    'El <strong>casquete de GTP</strong> controla la inestabilidad dinámica.',
    '<strong>Cinesina</strong> va al +; <strong>dineína</strong> al −; <strong>miosina</strong> sobre actina.',
    'El centrosoma nuclea con <strong>γ-tubulina</strong>; los cilios son <strong>9 + 2</strong>.',
    'Huso de microtúbulos y <strong>anillo contráctil</strong> de actina dividen la célula.',
    '<strong>Rho, Rac y Cdc42</strong> controlan la forma y la migración.',
    'Vincristina y paclitaxel frenan la <strong>mitosis</strong>; colchicina en gota.',
  ],
  close_notes='Estos son los conceptos esenciales. Si recuerdan qué subunidad forma cada filamento y si tiene polaridad, pueden deducir casi todas sus funciones. Gracias.',
)
