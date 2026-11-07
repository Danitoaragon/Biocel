"""Figuras animadas: Regulación de la expresión génica (procariotas, fagos, eucariotas y epigenética)."""
from sv import *
import math
PUR = '#6b3fb8'; LPUR = '#ece3fa'

def gene(x, y, w, label, fill=LCOB, col=COB, d=0, h=40, size=16):
    return r(x, y - h/2, w, h, fill, col, 2, 6, 'fi', d) + t(x + w/2, y + 6, label, size, col, 'middle', 700, 'fi', d + .1)

def dna_line(x0, x1, y, d=0, col=COB, w=6):
    return p(f'M{x0},{y} L{x1},{y}', col, w, 'dr', d)

def blob(cx, cy, rx, ry, label, fill, col, d=0, size=13, cls='pp'):
    return e(cx, cy, rx, ry, fill, col, 3, cls, d) + t(cx, cy + 5, label, size, col, 'middle', 700, 'fi', d + .1)

def xmark(x, y, d=0, s=14):
    return p(f'M{x-s},{y-s} L{x+s},{y+s} M{x+s},{y-s} L{x-s},{y+s}', RED, 4, 'dr', d)

def mrna(x0, x1, y, d=0, col=TAND, label=None, size=15):
    o = p(f'M{x0},{y} C{x0+40},{y-12} {x0+80},{y+12} {x0+120},{y} S{x0+200},{y+12} {x1},{y}', col, 5, 'dr', d, t_=1.4)
    if label: o += t((x0 + x1)/2, y + 30, label, size, col, 'middle', 700, 'fi', d + .8)
    return o

# ---------------- 1. estructura de un operón ----------------
def F_operon():
    o = t(30, 40, 'Estructura de un operón bacteriano', 22, INK, 'start', 700, 'fi', 0)
    o += dna_line(20, 900, 200, .1)
    o += gene(40, 200, 120, 'gen i', LPUR, PUR, .3, size=15)
    o += t(30, 168, 'gen regulador (propio promotor)', 13, PUR, 'start', 700, 'fi', .4)
    o += gene(250, 200, 70, 'P', LOCRE, TAND, .5) + gene(320, 200, 60, 'O', LRED, RED, .6)
    for i, (n, x, w) in enumerate([('gen z', 395, 160), ('gen y', 560, 150), ('gen a', 715, 160)]):
        o += gene(x, 200, w, n, LCOB, COB, .8 + i*.1)
    o += p('M240,150 L880,150', LINE, 2, 'dr', 1.0) + t(560, 140, 'OPERÓN: promotor + operador + genes estructurales', 15, COB, 'middle', 700, 'fi', 1.0)
    o += t(285, 250, 'promotor', 13, TAND, 'middle', 700, 'fi', .6) + t(392, 262, 'operador', 13, RED, 'start', 700, 'fi', .7)
    # proteína reguladora
    o += arrow(100, 225, 100, 330, PUR, 3, 'dr', 1.2)
    o += blob(100, 365, 70, 32, 'proteína reguladora', LPUR, PUR, 1.6, 13)
    o += carrow('M170,365 C260,365 330,330 345,232', 345, 232, -80, PUR, 3, 1.9)
    o += t(320, 400, 'se une al operador', 14, PUR, 'start', 700, 'fi', 2.2)
    o += mrna(400, 875, 470, 2.4, TAND, 'un solo ARNm policistrónico (z, y, a)')
    o += r(30, 528, 860, 48, CARD, LINE, 2, 10, 'fi', 2.8)
    o += t(460, 558, 'Según si el operador está libre u ocupado, la ARN polimerasa transcribe o no los genes estructurales.', 15, INK, 'middle', 600, 'fi', 2.9)
    return svg(o, label='Estructura de un operón: gen regulador, promotor, operador y genes estructurales')

# ---------------- 2. CAP-AMPc y represión catabólica ----------------
def F_cap():
    o = t(460, 34, 'Operón lac: dos controles al mismo tiempo', 22, INK, 'middle', 700, 'fi', 0)
    head = ['Medio', 'AMPc', 'CAP-AMPc', 'Represor', 'Transcripción']
    xs = [30, 250, 390, 560, 730]
    for x, h in zip(xs, head):
        o += t(x + 10, 80, h, 16, MUT, 'start', 700, 'fi', .1)
    rows = [('Glucosa, sin lactosa', 'bajo', 'no unida', 'en el operador', 'NO', RED),
            ('Glucosa + lactosa', 'bajo', 'no unida', 'suelto', 'Muy baja', OCRE),
            ('Sin glucosa, sin lactosa', 'alto', 'unida', 'en el operador', 'NO', RED),
            ('Sin glucosa + lactosa', 'alto', 'unida', 'suelto', 'ALTA', GREEN)]
    for i, rw in enumerate(rows):
        y = 100 + i*95; d = .4 + i*.5
        o += r(20, y, 880, 80, CARD if i % 2 == 0 else '#faf6ec', LINE, 2, 10, 'fi', d)
        o += t(40, y + 47, rw[0], 16, INK, 'start', 700, 'fi', d + .1)
        o += t(260, y + 47, rw[1], 16, GREEN if rw[1] == 'alto' else MUT, 'start', 700, 'fi', d + .15)
        o += t(400, y + 47, rw[2], 16, GREEN if rw[2] == 'unida' else MUT, 'start', 700, 'fi', d + .2)
        o += t(570, y + 47, rw[3], 16, RED if 'operador' in rw[3] else GREEN, 'start', 700, 'fi', d + .25)
        o += f'<g{st("pp", d + .35)}><rect x="740" y="{y + 20}" width="140" height="40" rx="20" fill="{rw[5]}"/><text x="810" y="{y + 46}" font-size="16" fill="#fff" text-anchor="middle" font-weight="700">{rw[4]}</text></g>'
    o += t(460, 500, 'Represor (control negativo) responde a la lactosa · CAP-AMPc (control positivo) responde a la glucosa', 15, INK, 'middle', 700, 'fi', 2.6)
    o += t(460, 528, 'Con glucosa el AMPc es bajo: CAP no ayuda a la ARN polimerasa = represión catabólica', 15, TAND, 'middle', 700, 'fi', 2.9)
    o += t(460, 560, 'CAP-AMPc se une cerca de la posición −60 del promotor', 14, MUT, 'middle', 600, 'fi', 3.1)
    return svg(o, label='Operón lac según la presencia de glucosa y lactosa: AMPc, CAP y represor')

# ---------------- 3. operón trp: represión ----------------
def F_trp():
    def row(y, high, d):
        s = dna_line(20, 900, y, d)
        s += gene(60, y, 60, 'P', LOCRE, TAND, d + .1) + gene(120, y, 55, 'O', LRED, RED, d + .15) + gene(175, y, 80, 'líder', '#f1eadb', MUT, d + .2, size=13)
        for i, n in enumerate(['trpE', 'trpD', 'trpC', 'trpB', 'trpA']):
            s += gene(265 + i*125, y, 115, n, LCOB, COB, d + .25 + i*.05)
        return s
    o = t(30, 38, 'Poco triptófano: el represor está inactivo → se transcribe', 18, GREEN, 'start', 700, 'fi', 0)
    o += row(140, False, .1)
    o += blob(150, 85, 55, 24, 'represor TrpR', '#e9b3a6', RED, .6, 12)
    o += t(220, 90, 'sin triptófano no se une al operador', 14, RED, 'start', 600, 'fi', .8)
    o += mrna(270, 880, 205, 1.1, TAND, 'ARNm de las 5 enzimas de síntesis de triptófano')
    o += p('M20,265 L900,265', LINE, 2, 'dr', 1.5)
    o += t(30, 300, 'Mucho triptófano: trp (correpresor) activa al represor → apagado', 18, RED, 'start', 700, 'fi', 1.7)
    o += row(420, True, 1.8)
    o += f'<g class="mv1" style="--d:2.4s;--t:1.4s;--dx:-640px;--dy:15px"><ellipse cx="788" cy="355" rx="55" ry="24" fill="#e9b3a6" stroke="{RED}" stroke-width="3"/><text x="788" y="360" font-size="12" text-anchor="middle" font-weight="700" fill="{RED}">represor</text><circle cx="846" cy="342" r="13" fill="{OCRE}"/><text x="846" y="347" font-size="10" text-anchor="middle" font-weight="700">trp</text></g>'
    o += blob(80, 470, 45, 22, 'ARN pol', LCOB, COB, 3.6, 12) + xmark(140, 470, 3.8, 10)
    o += t(300, 480, 'el complejo represor-trp ocupa el operador', 15, RED, 'start', 700, 'fi', 3.9)
    o += t(460, 560, 'Sistema represible (anabólico): el producto final apaga su propia síntesis', 16, INK, 'middle', 700, 'fi', 4.2)
    return svg(o, label='Operón triptófano: represión por el complejo represor-triptófano')

# ---------------- 4. atenuación ----------------
def _leader(x0, y, d, pair):
    o = ''
    segs = [('1', x0, LCOB, COB), ('2', x0 + 120, LOCRE, TAND), ('3', x0 + 240, LGREEN, GREEN), ('4', x0 + 360, LRED, RED)]
    for n, x, f, c in segs:
        o += r(x, y - 16, 100, 32, f, c, 2, 6, 'fi', d) + t(x + 50, y + 6, n, 16, c, 'middle', 700, 'fi', d + .1)
    o += r(x0 + 470, y - 16, 70, 32, '#f1eadb', MUT, 2, 6, 'fi', d) + t(x0 + 505, y + 6, 'UUUU', 12, MUT, 'middle', 700, 'fi', d + .1)
    if pair == '34':
        o += p(f'M{x0+290},{y-18} C{x0+300},{y-90} {x0+400},{y-90} {x0+410},{y-18}', RED, 4, 'dr', d + 1.2)
        o += t(x0 + 350, y - 95, 'horquilla 3:4 + poli-U = terminador', 14, RED, 'middle', 700, 'fi', d + 1.4)
    else:
        o += p(f'M{x0+170},{y-18} C{x0+180},{y-90} {x0+280},{y-90} {x0+290},{y-18}', GREEN, 4, 'dr', d + 1.2)
        o += t(x0 + 230, y - 95, 'horquilla 2:3 = antiterminador', 14, GREEN, 'middle', 700, 'fi', d + 1.4)
    return o

def F_aten():
    o = t(30, 34, 'Atenuación del operón trp: transcripción y traducción acopladas', 19, INK, 'start', 700, 'fi', 0)
    o += t(30, 70, 'A · Mucho triptófano', 17, RED, 'start', 700, 'fi', .1)
    o += _leader(150, 200, .2, '34')
    o += f'<g class="mv1" style="--d:.6s;--t:1.4s;--dx:120px;--dy:0px"><ellipse cx="200" cy="240" rx="50" ry="22" fill="#d8d0ff" stroke="{PUR}" stroke-width="3"/><text x="200" y="245" font-size="12" text-anchor="middle" font-weight="700" fill="{PUR}">ribosoma</text></g>'
    o += t(40, 290, 'Hay ARNt-trp: el ribosoma traduce la región 1 (dos codones trp) y queda sobre la región 2 →', 14, INK, 'start', 600, 'fi', 1.8)
    o += t(40, 310, 'la 3 se aparea con la 4 → la ARN polimerasa termina antes de los genes estructurales.', 14, INK, 'start', 600, 'fi', 1.9)
    o += p('M20,330 L900,330', LINE, 2, 'dr', 2.0)
    o += t(30, 365, 'B · Poco triptófano', 17, GREEN, 'start', 700, 'fi', 2.1)
    o += _leader(150, 490, 2.2, '23')
    o += blob(200, 530, 50, 22, 'ribosoma', '#d8d0ff', PUR, 2.5, 12) + t(265, 538, 'detenido en 1', 13, PUR, 'start', 700, 'fi', 2.6)
    o += t(40, 572, 'Faltan ARNt-trp: el ribosoma se detiene en la región 1 → se forma 2:3 → no hay terminador → se transcribe todo el operón.', 14, INK, 'start', 600, 'fi', 3.6)
    return svg(o, label='Atenuación: horquilla 3:4 terminadora con mucho triptófano y 2:3 antiterminadora con poco')

# ---------------- 5. cis y trans en diploides parciales ----------------
def F_cistrans_bact():
    o = t(460, 34, 'Diploides parciales (merodiploides): ¿cis o trans?', 21, INK, 'middle', 700, 'fi', 0)
    def mol(y, lab, oc, d):
        s = t(30, y - 30, lab, 15, MUT, 'start', 700, 'fi', d)
        s += dna_line(30, 880, y, d)
        s += gene(60, y, 90, 'i⁺', LPUR, PUR, d + .1) + gene(260, y, 60, 'P', LOCRE, TAND, d + .15)
        s += gene(320, y, 60, 'Oᶜ' if oc else 'O', '#ffd1c4' if oc else LRED, RED, d + .2)
        s += gene(390, y, 470, 'z⁺ y⁺ a⁺', LCOB, COB, d + .25)
        return s
    o += mol(140, 'Cromosoma', False, .2)
    o += mol(330, 'Plásmido F′', True, .6)
    o += blob(350, 95, 45, 20, 'represor', '#e9b3a6', RED, 1.2, 12)
    o += mrna(400, 860, 390, 1.6, GREEN, 'Oᶜ: se transcribe SIEMPRE, solo en su propia molécula (cis)')
    o += xmark(560, 200, 1.4, 10) + t(600, 205, 'reprimido sin inductor', 14, RED, 'start', 700, 'fi', 1.5)
    o += r(30, 450, 860, 120, CARD, LINE, 2, 12, 'fi', 2.2)
    o += t(50, 485, 'Operador = elemento cis: secuencia de ADN, no difusible; Oᶜ es dominante en cis.', 15, RED, 'start', 700, 'fi', 2.4)
    o += t(50, 515, 'Gen regulador = elemento trans: produce una proteína difusible que actúa en ambas moléculas.', 15, PUR, 'start', 700, 'fi', 2.6)
    o += t(50, 545, 'Por eso i⁺ es dominante sobre i⁻: el represor normal se une a los dos operadores.', 15, INK, 'start', 600, 'fi', 2.8)
    return svg(o, label='Elementos cis (operador) y trans (gen regulador) en un diploide parcial')

# ---------------- 6. fago T7 y SP01 ----------------
def F_t7():
    o = t(30, 36, 'Fago T7: una ARN polimerasa nueva (regulación en cascada)', 19, INK, 'start', 700, 'fi', 0)
    o += dna_line(30, 890, 120, .1)
    for i, (n, x, w, f, c) in enumerate([('Clase I · tempranos', 40, 240, LOCRE, TAND), ('Clase II · medios', 290, 280, LGREEN, GREEN), ('Clase III · tardíos', 580, 300, LCOB, COB)]):
        o += gene(x, 120, w, n, f, c, .2 + i*.1, 44, 15)
    steps = [(70, 'ARN pol de E. coli transcribe la clase I', TAND, .8),
             (140, 'gen 1 → ARN polimerasa del fago T7 · gen 0.7 → cinasa que inactiva la pol bacteriana', TAND, 1.4),
             (210, 'la pol de T7 transcribe la clase II: replicación (2, 4, 5), degradación del ADN bacteriano (3, 6), lisozima (3.5)', GREEN, 2.0),
             (280, 'después la clase III: cabeza, cola, maduración del ADN y ensamblaje', COB, 2.6)]
    for k, (dy, s, c, d) in enumerate(steps):
        o += f'<g{st("fi", d)}><circle cx="52" cy="{170 + dy - 6}" r="14" fill="{c}"/><text x="52" y="{170 + dy}" font-size="14" fill="#fff" text-anchor="middle" font-weight="700">{k+1}</text></g>'
        o += t(78, 170 + dy, s, 15, INK, 'start', 600, 'fi', d)
    o += r(30, 480, 860, 90, CARD, LINE, 2, 12, 'fi', 3.0)
    o += t(50, 512, 'Fago SP01 (Bacillus subtilis): no fabrica una polimerasa nueva; añade subunidades a la de la bacteria.', 15, PUR, 'start', 700, 'fi', 3.2)
    o += t(50, 540, 'Tempranos → polipéptido 28 (reconoce medios) → medios → polipéptidos 33 y 34 (reconocen tardíos) → tardíos.', 15, INK, 'start', 600, 'fi', 3.4)
    return svg(o, label='Regulación en cascada del fago T7 y del fago SP01')

# ---------------- 7. fago lambda: lisis vs lisogenia ----------------
def F_lambda():
    o = t(460, 32, 'Fago λ: la región OR decide entre lisogenia y lisis', 20, INK, 'middle', 700, 'fi', 0)
    def region(y, mode, d):
        s = dna_line(40, 880, y, d)
        s += gene(60, y, 150, 'cI', LPUR, PUR, d + .1)
        for i, n in enumerate(['OR3', 'OR2', 'OR1']):
            s += gene(300 + i*110, y, 100, n, '#f1eadb', MUT, d + .15 + i*.05, 36, 14)
        s += gene(680, y, 180, 'cro', LGREEN, GREEN, d + .3)
        s += carrow(f'M300,{y+40} C260,{y+60} 230,{y+60} 210,{y+40}', 210, y + 40, 200, PUR, 3, d + .4)
        s += t(255, y + 78, 'PRM', 13, PUR, 'middle', 700, 'fi', d + .4)
        s += carrow(f'M630,{y+40} C650,{y+60} 670,{y+60} 690,{y+40}', 690, y + 40, -20, GREEN, 3, d + .4)
        s += t(660, y + 78, 'PR', 13, GREEN, 'middle', 700, 'fi', d + .4)
        if mode == 'lis':
            for i in (1, 2):
                s += blob(300 + i*110 + 50, y - 46, 40, 20, 'cI', '#d9c9f5', PUR, d + .8 + i*.2, 13)
            s += t(460, y - 82, 'Lisogenia: dímeros del represor cI en OR1 y OR2; OR3 libre', 15, PUR, 'middle', 700, 'fi', d + .7)
            s += t(255, y + 100, 'se transcribe cI (autorregulación)', 13, PUR, 'middle', 700, 'fi', d + 1.4) + xmark(770, y + 70, d + 1.4, 10) + t(790, y + 100, 'cro apagado', 13, RED, 'middle', 700, 'fi', d + 1.4)
        else:
            s += blob(350, y - 46, 40, 20, 'Cro', LGREEN, GREEN, d + .8, 13)
            s += t(460, y - 82, 'Lisis: Cro se une primero a OR3 (OR3 > OR2 = OR1)', 15, GREEN, 'middle', 700, 'fi', d + .7)
            s += xmark(310, y + 74, d + 1.4, 9) + t(255, y + 100, 'PRM bloqueado: sin cI', 13, RED, 'middle', 700, 'fi', d + 1.4) + t(780, y + 100, 'se transcribe desde PR', 13, GREEN, 'middle', 700, 'fi', d + 1.4)
        return s
    o += region(150, 'lis', .1)
    o += p('M20,282 L900,282', LINE, 2, 'dr', 1.8)
    o += region(400, 'lit', 2.0)
    o += t(460, 575, 'Inducción: daño del ADN → RecA (respuesta SOS) corta al represor cI → se liberan OR1 y OR2 → se expresa cro → ciclo lítico', 14, INK, 'middle', 700, 'fi', 3.6)
    return svg(o, label='Fago lambda: represor cI y Cro compiten por OR1, OR2 y OR3')

def F_lambda_flujo():
    steps = [('Infección: ARN pol de E. coli en PL y PR', 'temprano-inmediata: genes N y cro'),
             ('N = antiterminador', 'temprano-retrasada: cII, O, P, Q (derecha) y cIII (izquierda)'),
             ('Ciclo lítico: Q activa los genes tardíos', 'S, R (lisis) · cabeza · cola → nuevas partículas'),
             ('Lisogenia: cII + cIII activan PRE y PINT', 'represor cI + integrasa (int) → profago integrado'),
             ('Mantenimiento: cI se activa a sí mismo desde PRM', 'autorregulación; bloquea PR y PL')]
    o = flow(steps, 30, 20, 860, 90, 22, .2, [CARD, LOCRE, LGREEN, LPUR, LPUR])
    return svg(o, label='Secuencia de transcripción del fago lambda: ciclo lítico y lisogenia')

# ---------------- 8. niveles de regulación eucariota ----------------
def F_niveles():
    o = t(460, 32, 'Niveles de regulación de la expresión génica en eucariotas', 20, INK, 'middle', 700, 'fi', 0)
    o += r(20, 60, 520, 470, '#eef2fd', COB, 2.5, 22, 'fi', .1) + t(40, 90, 'NÚCLEO', 15, COB, 'start', 700, 'fi', .1)
    o += t(560, 90, 'CITOPLASMA', 15, TAND, 'start', 700, 'fi', .1)
    lv = [('1', 'Cromatina', 'condensación, acetilación, metilación del ADN', 60, 110, PUR, LPUR),
          ('2', 'Transcripcional', 'promotor, enhancers, factores (cis y trans)', 60, 215, COB, LCOB),
          ('3', 'Postranscripcional', 'splicing alternativo, UTR, estabilidad, ARN pequeños', 60, 320, GREEN, LGREEN),
          ('4', 'Traduccional', 'IRE, eIF2, ARNt, ribosomas', 560, 215, TAND, LOCRE),
          ('5', 'Postraduccional', 'modificaciones, péptido señal, precursores', 560, 320, RED, LRED)]
    for i, (n, ti, su, x, y, c, f) in enumerate(lv):
        d = .3 + i*.45
        o += r(x, y, 440 if x < 500 else 340, 84, f, c, 2.5, 14, 'pp', d)
        o += f'<g{st("pp", d)}><circle cx="{x + 34}" cy="{y + 42}" r="20" fill="{c}"/><text x="{x + 34}" y="{y + 49}" font-size="18" fill="#fff" text-anchor="middle" font-weight="700">{n}</text></g>'
        o += t(x + 66, y + 38, ti, 20, c, 'start', 700, 'fi', d + .1) + t(x + 66, y + 64, su, 13, INK, 'start', 500, 'fi', d + .15)
    o += arrow(500, 362, 556, 257, OCRE, 4, 'dr', 2.0)
    o += t(280, 470, 'el ARNm maduro sale por los poros nucleares', 14, MUT, 'middle', 600, 'fi', 2.1)
    o += r(560, 430, 340, 100, CARD, LINE, 2, 14, 'fi', 2.4)
    o += tl(730, 465, ['El paso más común y', 'más importante: el inicio', 'de la transcripción'], 15, INK, 'middle', 700, 'fi', 2.5)
    return svg(o, label='Cinco niveles de regulación de la expresión génica en eucariotas')

# ---------------- 9. cromatina: acetilación ----------------
def _nucs(x0, y, n, gap, d, ac):
    o = ''
    pts = []
    for i in range(n):
        x = x0 + i*gap
        pts.append(x)
    path = 'M' + ' L'.join(f'{x},{y + (12 if k % 2 else -12)}' for k, x in enumerate([x0 - 30] + pts + [pts[-1] + 30]))
    o += p(path, COB, 4, 'dr', d)
    for k, x in enumerate(pts):
        o += c(x, y, 26, '#f4dfb6', TAND, 2.5, 'pp', d + .2 + k*.05)
        if ac:
            o += f'<g{st("pp", d + .8 + k*.05)}><circle cx="{x + 20}" cy="{y - 24}" r="10" fill="{GREEN}"/><text x="{x + 20}" y="{y - 20}" font-size="10" fill="#fff" text-anchor="middle" font-weight="700">Ac</text></g>'
    return o

def F_cromatina():
    o = t(30, 40, 'Heterocromatina: compacta e inactiva', 19, RED, 'start', 700, 'fi', 0)
    o += _nucs(90, 130, 12, 58, .1, False)
    o += t(30, 200, 'histonas hipoacetiladas (+) muy unidas al ADN (−); el promotor no es accesible', 14, INK, 'start', 600, 'fi', .8)
    o += blob(780, 250, 70, 26, 'HDAC', LRED, RED, 1.0, 14) + t(780, 292, 'quita acetilos: compacta', 13, RED, 'middle', 700, 'fi', 1.1)
    o += blob(140, 250, 70, 26, 'HAT', LGREEN, GREEN, 1.3, 14) + t(140, 292, 'añade acetilos a lisinas', 13, GREEN, 'middle', 700, 'fi', 1.4)
    o += t(460, 256, 'HAT abre ⇄ HDAC cierra', 15, MUT, 'middle', 700, 'fi', 1.2)
    o += t(30, 345, 'Eucromatina: laxa y activa', 19, GREEN, 'start', 700, 'fi', 1.8)
    o += _nucs(90, 440, 6, 130, 1.9, True)
    o += blob(420, 510, 60, 24, 'ARN pol', LCOB, COB, 2.9, 13) + t(500, 516, 'el promotor queda libre', 14, COB, 'start', 700, 'fi', 3.0)
    o += t(460, 572, 'La acetilación neutraliza las cargas positivas de las lisinas: las histonas se unen menos al ADN.', 14, INK, 'middle', 600, 'fi', 3.2)
    return svg(o, label='Acetilación de histonas: de heterocromatina compacta a eucromatina accesible')

# ---------------- 10. metilación del ADN ----------------
def _strand(x0, y, met, d, col=COB):
    o = p(f'M{x0},{y} L{x0 + 360},{y}', col, 5, 'dr', d)
    for i in range(3):
        x = x0 + 50 + i*120
        o += t(x, y - 12 if y < 1000 else y, 'CG', 15, INK, 'middle', 700, 'fi', d + .1)
        if met[i]:
            o += f'<g{st("pp", d + .4 + i*.1)}><circle cx="{x - 8}" cy="{y - 34}" r="9" fill="{PUR}"/><text x="{x - 8}" y="{y - 30}" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">CH₃</text></g>'
    return o

def F_metil():
    o = t(30, 34, 'Herencia del patrón de metilación (CpG)', 20, INK, 'start', 700, 'fi', 0)
    o += t(30, 70, 'ADN original: ambas hebras metiladas en los CpG', 15, MUT, 'start', 700, 'fi', .1)
    o += _strand(40, 120, [1, 1, 1], .2) + _strand(40, 165, [1, 1, 1], .3, TAND)
    o += arrow(420, 140, 500, 140, OCRE, 4, 'dr', 1.0) + t(460, 120, 'replicación', 13, TAND, 'middle', 700, 'fi', 1.0)
    o += t(520, 70, 'Hemimetilado: la hebra nueva sin CH₃', 15, MUT, 'start', 700, 'fi', 1.2)
    o += _strand(520, 120, [1, 1, 1], 1.3) + _strand(520, 165, [0, 0, 0], 1.4, GREEN)
    o += blob(700, 240, 140, 30, 'metiltransferasa de mantenimiento', LPUR, PUR, 2.0, 13)
    o += arrow(700, 272, 700, 310, PUR, 3, 'dr', 2.2)
    o += _strand(520, 360, [1, 1, 1], 2.4) + _strand(520, 405, [1, 1, 1], 2.6, GREEN)
    o += t(700, 445, 'el patrón se conserva en las células hijas', 14, PUR, 'middle', 700, 'fi', 3.0)
    o += r(30, 260, 440, 200, CARD, LINE, 2, 12, 'fi', 1.6)
    o += tl(50, 292, ['5-metilcitosina: CH₃ en el C5 de una', 'citosina seguida de guanina (CpG).', '', 'Silencia: desplaza activadores y atrae', 'proteínas que se unen a metil-CpG', '(que traen desacetilasas de histonas).'], 15, INK, 'start', 600, 'fi', 1.7, 1.3)
    o += r(30, 490, 860, 80, '#f7f2ff', PUR, 2, 12, 'fi', 3.2)
    o += t(460, 522, 'De novo: metila posiciones nuevas · De mantenimiento: copia el patrón tras la replicación', 15, PUR, 'middle', 700, 'fi', 3.3)
    o += t(460, 550, 'Islas CpG de los promotores: no metiladas en genes que se expresan (p. ej., genes de mantenimiento)', 14, INK, 'middle', 600, 'fi', 3.4)
    return svg(o, label='Metilación del ADN: de novo y de mantenimiento tras la replicación')

# ---------------- 11. regulación transcripcional: cis, trans, enhancer ----------------
def F_trans_euc():
    o = t(30, 34, 'Regulación transcripcional: elementos cis y factores trans', 19, INK, 'start', 700, 'fi', 0)
    o += p('M30,420 C200,420 230,250 380,250 C530,250 560,420 890,420', COB, 6, 'dr', .1, t_=1.6)
    o += r(330, 232, 100, 36, '#f1eadb', MUT, 2, 6, 'pp', .9) + t(380, 256, 'enhancer', 14, MUT, 'middle', 700, 'fi', 1.0)
    o += t(380, 290, 'elemento cis lejano', 13, MUT, 'middle', 600, 'fi', 1.0)
    o += r(560, 402, 120, 36, LOCRE, TAND, 2, 6, 'pp', .9) + t(620, 426, 'CAAT · GC · TATA', 12, TAND, 'middle', 700, 'fi', 1.0)
    o += r(690, 402, 190, 36, LCOB, COB, 2, 6, 'pp', .9) + t(785, 426, 'gen', 14, COB, 'middle', 700, 'fi', 1.0)
    # activador con dos dominios
    o += e(380, 207, 50, 24, LGREEN, GREEN, 3, 'pp', 1.4) + t(380, 212, 'unión ADN', 12, GREEN, 'middle', 700, 'fi', 1.5)
    o += e(470, 190, 46, 24, '#cdeedd', GREEN, 3, 'pp', 1.6) + t(470, 195, 'activación', 12, GREEN, 'middle', 700, 'fi', 1.7)
    o += t(420, 150, 'activador (factor trans): 2 dominios', 14, GREEN, 'middle', 700, 'fi', 1.7)
    o += r(520, 300, 120, 50, LPUR, PUR, 2.5, 12, 'pp', 2.2) + t(580, 331, 'Mediador', 15, PUR, 'middle', 700, 'fi', 2.3)
    o += e(640, 375, 70, 30, LCOB, COB, 3, 'pp', 2.6) + t(640, 380, 'ARN pol II', 14, COB, 'middle', 700, 'fi', 2.7)
    o += carrow('M510,200 C560,225 590,260 585,298', 585, 298, 90, GREEN, 3, 2.0)
    o += t(30, 500, 'Cis: secuencia contigua al gen (promotor, cajas, enhancers). Trans: proteína difusible que se une a ellas.', 15, INK, 'start', 700, 'fi', 3.0)
    o += t(30, 530, 'Activadores aumentan la transcripción; silenciadores la inhiben. El ADN forma un bucle que acerca el enhancer.', 15, INK, 'start', 600, 'fi', 3.2)
    o += t(30, 560, 'Los factores se agrupan en familias según su dominio de unión al ADN; los dominios son intercambiables.', 15, MUT, 'start', 600, 'fi', 3.4)
    return svg(o, label='Regulación transcripcional eucariota: enhancer, activador con dos dominios, Mediador y ARN polimerasa II')

# ---------------- 12. GAL4 / GAL80 ----------------
def F_gal4():
    def row(y, gal, d):
        s = dna_line(30, 890, y, d)
        s += r(150, y - 18, 140, 36, '#f1eadb', MUT, 2, 6, 'fi', d + .1) + t(220, y + 6, 'UAS (17 pb)', 13, MUT, 'middle', 700, 'fi', d + .15)
        s += gene(400, y, 470, 'genes GAL (cinasa, transferasa, epimerasa)', LCOB, COB, d + .2, 40, 14)
        s += blob(220, y - 50, 55, 24, 'GAL4', LGREEN, GREEN, d + .5, 13)
        if not gal:
            s += blob(300, y - 72, 48, 22, 'GAL80', LRED, RED, d + .8, 12) + xmark(460, y - 60, d + 1.1, 10)
            s += t(510, y - 55, 'GAL80 tapa el dominio de activación de GAL4', 14, RED, 'start', 700, 'fi', d + 1.1)
        else:
            s += f'<g class="mv1" style="--d:{d+.8}s;--t:1.2s;--dx:200px;--dy:-30px"><ellipse cx="300" cy="{y-72}" rx="48" ry="22" fill="{LRED}" stroke="{RED}" stroke-width="3"/><text x="300" y="{y-67}" font-size="12" text-anchor="middle" font-weight="700" fill="{RED}">GAL80</text><polygon points="345,{y-90} 358,{y-82} 358,{y-66} 345,{y-58} 332,{y-66} 332,{y-82}" fill="{OCRE}"/></g>'
            s += mrna(410, 860, y + 60, d + 1.8, TAND, 'se transcriben los genes GAL')
        return s
    o = t(30, 36, 'Sin galactosa', 18, RED, 'start', 700, 'fi', 0) + row(170, False, .1)
    o += p('M20,260 L900,260', LINE, 2, 'dr', 1.4)
    o += t(30, 300, 'Con galactosa (inductor)', 18, GREEN, 'start', 700, 'fi', 1.5) + row(430, True, 1.6)
    o += t(460, 572, 'GAL80 es un represor que no se une al ADN sino al activador GAL4.', 15, INK, 'middle', 700, 'fi', 3.6)
    return svg(o, label='Regulación de los genes GAL de levadura por GAL4 y GAL80')

# ---------------- 13. ARNm maduro y regiones regulatorias ----------------
def F_utr():
    o = t(30, 36, 'Regulación postranscripcional: el ARNm maduro tiene regiones que deciden su destino', 17, INK, 'start', 700, 'fi', 0)
    y = 150
    o += c(70, y, 22, LPUR, PUR, 3, 'pp', .1) + t(70, y + 5, 'cap', 12, PUR, 'middle', 700, 'fi', .2)
    o += r(95, y - 22, 210, 44, LOCRE, TAND, 2, 8, 'fi', .3) + t(200, y + 6, "5′ UTR", 16, TAND, 'middle', 700, 'fi', .35)
    o += r(305, y - 22, 330, 44, LCOB, COB, 2, 8, 'fi', .4) + t(470, y + 6, 'región codificante (AUG … paro)', 15, COB, 'middle', 700, 'fi', .45)
    o += r(635, y - 22, 170, 44, LGREEN, GREEN, 2, 8, 'fi', .5) + t(720, y + 6, "3′ UTR", 16, GREEN, 'middle', 700, 'fi', .55)
    o += t(855, y + 6, 'AAAA…', 18, TAND, 'middle', 700, 'fi', .6)
    o += tl(200, 230, ['IRES · sitios para represores', 'o activadores · estructura', 'secundaria · uAUG y uORF', '· entorno del AUG'], 14, TAND, 'middle', 600, 'fi', 1.0)
    o += tl(720, 230, ['sitio de poliadenilación', 'alternativo · región rica', 'en AU (desestabiliza) ·', 'horquilla 3′ (histonas)'], 14, GREEN, 'middle', 600, 'fi', 1.3)
    o += tl(470, 230, ['splicing alternativo:', 'exones que se sustituyen,', 'añaden o eliminan'], 14, COB, 'middle', 600, 'fi', 1.6)
    o += r(30, 410, 860, 160, CARD, LINE, 2, 12, 'fi', 2.0)
    o += t(50, 444, 'Cuatro mecanismos postranscripcionales (según el documento):', 15, INK, 'start', 700, 'fi', 2.1)
    for i, s in enumerate(['1. Corte y empalme alternativo (splicing diferencial)', '2. Regiones regulatorias del ARNm (5′ y 3′ UTR)', '3. Estabilidad y almacenamiento del ARNm (cap y poli-A lo protegen)', '4. Silenciamiento por ARN pequeños (microARN)']):
        o += t(70, 474 + i*25, s, 14, INK, 'start', 600, 'fi', 2.3 + i*.2)
    return svg(o, label='ARNm maduro: cap, 5 prima UTR, región codificante, 3 prima UTR y cola poli-A como puntos de regulación')

# ---------------- 14. microARN ----------------
def F_mirna():
    o = r(20, 20, 420, 250, '#eef2fd', COB, 2, 18, 'fi', 0) + t(40, 46, 'NÚCLEO', 14, COB, 'start', 700, 'fi', 0)
    o += p('M60,110 C120,90 180,130 240,110 S360,90 400,110', PUR, 5, 'dr', .2) + t(230, 82, 'pri-miARN', 15, PUR, 'middle', 700, 'fi', .3)
    o += blob(230, 160, 85, 22, 'Microprocesador', LPUR, PUR, .8, 13)
    o += p('M190,220 L270,220 C300,220 300,250 270,250 L190,250', PUR, 5, 'dr', 1.3) + tl(320, 212, ['pre-miARN', '(horquilla)'], 13, PUR, 'start', 700, 'fi', 1.4)
    o += arrow(440, 235, 520, 235, OCRE, 4, 'dr', 1.8) + t(480, 220, 'exporta', 12, TAND, 'middle', 700, 'fi', 1.9)
    o += t(560, 46, 'CITOPLASMA', 14, TAND, 'start', 700, 'fi', 0)
    o += blob(640, 235, 60, 26, 'DICER', LOCRE, TAND, 2.2, 14)
    o += p('M720,220 L860,220 M720,232 L860,232', PUR, 5, 'dr', 2.6) + t(790, 205, 'dúplex corto', 13, PUR, 'middle', 700, 'fi', 2.7)
    o += arrow(790, 250, 790, 300, OCRE, 4, 'dr', 3.0)
    o += e(760, 345, 110, 40, LGREEN, GREEN, 3, 'pp', 3.2) + t(760, 340, 'RISC (Argonauta)', 14, GREEN, 'middle', 700, 'fi', 3.3) + t(760, 360, 'conserva la hebra guía', 12, GREEN, 'middle', 600, 'fi', 3.3)
    o += mrna(420, 880, 450, 3.6, COB, 'ARNm blanco con secuencia complementaria')
    o += arrow(700, 388, 650, 436, GREEN, 3, 'dr', 4.0)
    o += r(30, 500, 860, 70, CARD, LINE, 2, 12, 'fi', 4.2)
    o += t(460, 528, 'Resultado: degradación del ARNm o bloqueo de su traducción (mecanismo antisentido).', 15, INK, 'middle', 700, 'fi', 4.3)
    o += t(460, 553, 'microARN: 18–25 nucleótidos, endógenos, no codificantes. Regulación fina y poco costosa.', 14, MUT, 'middle', 600, 'fi', 4.4)
    o += tl(150, 330, ['El silenciamiento por ARN', 'pequeños es mucho menos', 'demandante que regular', 'la transcripción.'], 14, INK, 'middle', 600, 'fi', 4.6)
    return svg(o, label='Biogénesis y acción de un microARN: pri-miARN, Microprocesador, pre-miARN, Dicer, RISC y ARNm blanco')

# ---------------- 15. IRE: ferritina y receptor de transferrina ----------------
def F_ire():
    o = t(240, 34, 'Hierro BAJO', 18, RED, 'middle', 700, 'fi', 0) + t(690, 34, 'Hierro ALTO', 18, GREEN, 'middle', 700, 'fi', 0)
    o += p('M460,50 L460,560', LINE, 2, 'dr', .1)
    def ferr(x, y, bound, d):
        s = t(x, y - 80, 'ARNm de ferritina (IRE en 5′)', 14, INK, 'middle', 700, 'fi', d)
        s += p(f'M{x-190},{y} L{x+190},{y}', COB, 5, 'dr', d)
        s += p(f'M{x-150},{y-4} C{x-150},{y-40} {x-110},{y-40} {x-110},{y-4}', TAND, 4, 'dr', d + .2)
        if bound:
            s += blob(x - 130, y - 52, 50, 20, 'aconitasa', LRED, RED, d + .5, 12) + xmark(x + 60, y - 30, d + .8, 10)
            s += t(x, y + 34, 'no se ensambla la maquinaria: no se traduce', 13, RED, 'middle', 700, 'fi', d + .9)
        else:
            s += blob(x + 40, y - 26, 50, 20, 'ribosoma', '#d8d0ff', PUR, d + .5, 12)
            s += t(x, y + 34, 'se traduce: más ferritina para guardar Fe', 13, GREEN, 'middle', 700, 'fi', d + .9)
        return s
    def rtf(x, y, bound, d):
        s = t(x, y - 80, 'ARNm del receptor de transferrina (IRE en 3′)', 14, INK, 'middle', 700, 'fi', d)
        s += p(f'M{x-190},{y} L{x+190},{y}', COB, 5, 'dr', d)
        s += p(f'M{x+110},{y-4} C{x+110},{y-40} {x+150},{y-40} {x+150},{y-4}', TAND, 4, 'dr', d + .2)
        s += t(x + 172, y + 20, 'AU', 12, MUT, 'middle', 700, 'fi', d + .2)
        if bound:
            s += blob(x + 130, y - 52, 50, 20, 'aconitasa', LRED, RED, d + .5, 12)
            s += blob(x - 60, y - 26, 50, 20, 'ribosoma', '#d8d0ff', PUR, d + .7, 12)
            s += t(x, y + 34, 'ARNm protegido: se traduce (más captación de Fe)', 13, GREEN, 'middle', 700, 'fi', d + .9)
        else:
            s += xmark(x, y - 20, d + .7, 12)
            s += t(x, y + 34, 'se degrada rápido: menos receptor', 13, RED, 'middle', 700, 'fi', d + .9)
        return s
    o += ferr(240, 160, True, .3) + rtf(240, 380, True, 1.2)
    o += ferr(690, 160, False, 2.2) + rtf(690, 380, False, 3.0)
    o += f'<g{st("pp", 2.0)}><circle cx="500" cy="248" r="12" fill="{OCRE}"/><text x="500" y="253" font-size="11" text-anchor="middle" font-weight="700">Fe</text></g>' + t(520, 253, 'el Fe se une a la aconitasa y la suelta del IRE', 12, TAND, 'start', 700, 'fi', 2.0)
    o += r(30, 480, 860, 90, CARD, LINE, 2, 12, 'fi', 3.8)
    o += t(460, 512, 'IRE (elemento de respuesta al hierro): ≈30 nucleótidos. La aconitasa citosólica se une a él cuando falta Fe.', 14, INK, 'middle', 700, 'fi', 3.9)
    o += t(460, 540, 'Mismo sensor, efecto opuesto según la posición del IRE: en 5′ bloquea la traducción; en 3′ estabiliza el ARNm.', 14, INK, 'middle', 600, 'fi', 4.0)
    return svg(o, label='Regulación traduccional por hierro: IRE de ferritina en 5 prima y del receptor de transferrina en 3 prima')

# ---------------- 16. NMD y EJC ----------------
def F_nmd():
    o = t(30, 34, 'Degradación mediada por mutaciones sin sentido (NMD)', 19, INK, 'start', 700, 'fi', 0)
    def row(y, prem, d):
        s = ''
        for i in range(4):
            s += r(80 + i*190, y - 20, 170, 40, LCOB, COB, 2, 6, 'fi', d + i*.05) + t(165 + i*190, y + 6, f'exón {i+1}', 14, COB, 'middle', 700, 'fi', d + i*.05)
            if i < 3:
                s += f'<g{st("pp", d + .3)}><rect x="{232 + i*190}" y="{y - 52}" width="36" height="24" rx="6" fill="{OCRE}"/><text x="{250 + i*190}" y="{y - 35}" font-size="11" text-anchor="middle" font-weight="700">EJC</text></g>'
        stop = 790 if not prem else 360
        s += f'<g{st("pp", d + .5)}><rect x="{stop - 18}" y="{y + 26}" width="36" height="24" rx="6" fill="{RED}"/><text x="{stop}" y="{y + 43}" font-size="11" fill="#fff" text-anchor="middle" font-weight="700">STOP</text></g>'
        return s
    o += t(30, 80, 'ARNm normal: el paro está en el último exón; el ribosoma retira todos los EJC', 15, GREEN, 'start', 700, 'fi', .1)
    o += row(150, False, .2)
    o += f'<g class="mv1" style="--d:1s;--t:2.4s;--dx:620px;--dy:0px"><ellipse cx="110" cy="205" rx="40" ry="18" fill="#d8d0ff" stroke="{PUR}" stroke-width="3"/></g>'
    o += t(30, 300, 'Paro prematuro: el ribosoma se desensambla antes y quedan EJC sin retirar → el ARNm se degrada', 15, RED, 'start', 700, 'fi', 1.8)
    o += row(380, True, 1.9)
    o += f'<g class="mv1" style="--d:2.6s;--t:1.2s;--dx:220px;--dy:0px"><ellipse cx="110" cy="435" rx="40" ry="18" fill="#d8d0ff" stroke="{PUR}" stroke-width="3"/></g>'
    o += r(30, 490, 860, 80, CARD, LINE, 2, 12, 'fi', 3.4)
    o += t(460, 522, 'EJC = complejo de unión de exones: se coloca aguas arriba de cada unión exón-exón durante el splicing.', 14, INK, 'middle', 700, 'fi', 3.5)
    o += t(460, 548, 'Control de calidad: evita fabricar proteínas truncadas (ejemplo del documento: talasemia β⁰).', 14, MUT, 'middle', 600, 'fi', 3.6)
    return svg(o, label='NMD: los EJC no retirados por un paro prematuro marcan el ARNm para degradación')

# ---------------- 17. mecanismos epigenéticos ----------------
def F_epi():
    o = t(460, 34, 'Epigenética: cambios heredables en la expresión sin cambiar la secuencia del ADN', 17, INK, 'middle', 700, 'fi', 0)
    o += c(460, 310, 92, '#f4dfb6', TAND, 3, 'pp', .2) + t(460, 305, 'CROMATINA', 16, TAND, 'middle', 700, 'fi', .3) + t(460, 327, 'abierta ⇄ cerrada', 13, MUT, 'middle', 600, 'fi', .3)
    items = [('Metilación del ADN', 'CH₃ en citosinas de CpG → silencia', PUR, LPUR),
             ('Modificación de histonas', 'acetilación (HAT/HDAC), metilación… = código de histonas', GREEN, LGREEN),
             ('ARN no codificante', 'microARN: degradan o bloquean ARNm; ayudan a formar heterocromatina', COB, LCOB),
             ('Remodelado dependiente de ATP', 'deslizan nucleosomas sin disociarlos: exponen u ocultan ADN', TAND, LOCRE),
             ('Polycomb y Trithorax', 'Polycomb cierra (represor) · Trithorax abre (activador)', RED, LRED)]
    pos = [(30, 70), (560, 70), (560, 430), (30, 430), (30, 250)]
    pos = [(30, 70), (560, 70), (575, 250), (300, 470), (30, 250)]
    for i, ((ti, su, col, f), (x, y)) in enumerate(zip(items, pos)):
        d = .6 + i*.45
        w = 330
        o += r(x, y, w, 92, f, col, 2.5, 14, 'pp', d)
        o += t(x + 16, y + 32, ti, 17, col, 'start', 700, 'fi', d + .1)
        lines = su.split(': ') if ': ' in su else [su]
        ws, ls_, cur = su.split(' '), [], ''
        for wd in ws:
            if len(cur) + len(wd) > 40: ls_.append(cur.strip()); cur = ''
            cur += wd + ' '
        ls_.append(cur.strip())
        o += tl(x + 16, y + 56, ls_, 13, INK, 'start', 500, 'fi', d + .15, 1.25)
    o += arrow(360, 140, 400, 245, MUT, 2, 'dr', 2.9) + arrow(590, 140, 525, 245, MUT, 2, 'dr', 2.9)
    o += arrow(590, 296, 555, 305, MUT, 2, 'dr', 2.9) + arrow(360, 296, 367, 305, MUT, 2, 'dr', 2.9) + arrow(460, 468, 460, 404, MUT, 2, 'dr', 2.9)
    return svg(o, label='Cinco mecanismos epigenéticos que regulan el estado de la cromatina')
