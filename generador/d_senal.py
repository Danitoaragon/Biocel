"""Figuras animadas: Comunicación celular y señalización (base: Alberts, cap. Señalización celular)."""
from sv import *
PUR = '#6b3fb8'; LPUR = '#ece3fa'
MEM = '#f1dca8'

def blob(cx, cy, rx, ry, label, fill, col, d=0, size=13, cls='pp'):
    return e(cx, cy, rx, ry, fill, col, 3, cls, d) + t(cx, cy + 5, label, size, col, 'middle', 700, 'fi', d + .1)

def lig(x, y, d=0, col=OCRE, s=11, cls='pp'):
    return f'<polygon points="{x},{y-s} {x+s},{y} {x},{y+s} {x-s},{y}" fill="{col}" stroke="{TAND}" stroke-width="1.5"{st(cls, d)}/>'

def membrane(y, x0=20, x1=900, d=0, h=34):
    return r(x0, y, x1 - x0, h, MEM, TAND, 2, 6, 'fi', d)

def cell(cx, cy, rx, ry, d=0, label=None, fill='#fbf6ea'):
    o = e(cx, cy, rx, ry, fill, INK, 2.5, 'pp', d)
    if label: o += t(cx, cy + ry + 22, label, 14, MUT, 'middle', 700, 'fi', d + .2)
    return o

def phos(x, y, d=0):
    return f'<g{st("pp", d)}><circle cx="{x}" cy="{y}" r="11" fill="{RED}"/><text x="{x}" y="{y+5}" font-size="12" fill="#fff" text-anchor="middle" font-weight="700">P</text></g>'

# ---------------- 1. formas de señalización ----------------
def F_tipos():
    o = ''
    panels = [(20, 30, 'Por contacto (yuxtacrina)'), (470, 30, 'Paracrina'), (20, 315, 'Sináptica'), (470, 315, 'Endocrina')]
    for i, (x, y, ti) in enumerate(panels):
        o += r(x, y, 430, 265, CARD, LINE, 2, 14, 'fi', i*.15) + t(x + 18, y + 30, ti, 18, COB, 'start', 700, 'fi', i*.15 + .1)
    # contacto
    o += cell(130, 180, 80, 60, .3, 'célula señalizadora') + cell(330, 180, 80, 60, .4, 'célula diana')
    o += r(205, 160, 20, 40, LPUR, PUR, 2, 4, 'pp', .7) + r(225, 160, 26, 40, LGREEN, GREEN, 2, 4, 'pp', .8)
    o += t(228, 100, 'molécula de membrana + receptor', 12, INK, 'middle', 600, 'fi', 1.0)
    # paracrina
    o += cell(560, 180, 55, 45, .5) + cell(745, 140, 45, 35, .6) + cell(760, 220, 45, 35, .6) + cell(660, 250, 40, 30, .6)
    for k, (dx, dy) in enumerate([(130, -50), (170, 40), (80, 60)]):
        o += mover(lig(600, 180, 0), dx, dy, 1.0 + k*.2, 1.6)
    o += t(660, 85, 'mediador local, alcance corto', 12, INK, 'middle', 600, 'fi', 1.2)
    # sináptica
    o += cell(110, 470, 60, 45, .7, 'neurona')
    o += p('M170,470 L330,470', INK, 5, 'dr', .9) + t(250, 490, 'axón', 12, MUT, 'middle', 600, 'fi', 1.0)
    o += cell(380, 470, 50, 45, 1.0, 'célula diana')
    o += mover(lig(335, 470, 0, OCRE, 7), 10, 0, 1.6, 1.0) + t(250, 395, 'neurotransmisor en la sinapsis', 12, INK, 'middle', 600, 'fi', 1.6)
    # endocrina
    o += cell(560, 460, 55, 40, 1.1, 'glándula')
    o += p('M620,460 C680,400 760,520 860,450', RED, 10, 'dr', 1.3)
    o += t(740, 400, 'torrente sanguíneo', 12, RED, 'middle', 700, 'fi', 1.4)
    o += mover(lig(625, 455, 0), 220, -5, 1.8, 2.2)
    o += t(700, 545, 'hormona: alcance a todo el cuerpo', 12, INK, 'middle', 600, 'fi', 2.0)
    return svg(o, label='Cuatro formas de señalización: por contacto, paracrina, sináptica y endocrina')

# ---------------- 2. esquema general ----------------
def F_esquema():
    steps = [('Señal extracelular', 'molécula señalizadora (ligando)'),
             ('Receptor', 'proteína que une la señal con alta especificidad'),
             ('Proteínas de señalización intracelular', 'relevan, amplifican, integran y distribuyen'),
             ('Proteínas efectoras', 'enzimas metabólicas · reguladores de genes · citoesqueleto'),
             ('Respuesta', 'cambio en el metabolismo, la expresión génica o la forma y movimiento')]
    return svg(flow(steps, 30, 20, 860, 90, 22, .2, [LOCRE, LGREEN, LCOB, LPUR, CARD]), label='Esquema general de una vía de señalización: señal, receptor, transducción, efectores y respuesta')

# ---------------- 3. tipos de receptores ----------------
def F_receptores():
    o = membrane(250, d=0) + t(30, 240, 'EXTERIOR', 13, MUT, 'start', 700, 'fi', 0) + t(30, 310, 'CITOSOL', 13, MUT, 'start', 700, 'fi', 0)
    # canal
    o += t(130, 60, 'Acoplado a canal iónico', 15, COB, 'middle', 700, 'fi', .2)
    o += r(100, 220, 22, 95, LCOB, COB, 2, 6, 'pp', .3) + r(138, 220, 22, 95, LCOB, COB, 2, 6, 'pp', .3) + lig(130, 190, .6)
    for k in range(3):
        o += mover(c(130, 160, 6, GREEN, 'none', 0, 'fi', 0), 0, 200, 1.0 + k*.3, 1.4)
    o += t(130, 360, 'la señal abre el canal:', 13, INK, 'middle', 600, 'fi', 1.2) + t(130, 378, 'pasan iones', 13, INK, 'middle', 600, 'fi', 1.2)
    # GPCR
    o += t(380, 60, 'Acoplado a proteína G', 15, PUR, 'middle', 700, 'fi', .5)
    for k in range(7):
        o += r(318 + k*18, 228, 14, 78, LPUR, PUR, 1.5, 6, 'pp', .6 + k*.04)
    o += lig(380, 205, .9) + t(380, 140, '7 hélices transmembrana', 12, PUR, 'middle', 600, 'fi', .9)
    o += blob(400, 335, 40, 18, 'Gα', '#d8c8f5', PUR, 1.2, 12) + blob(455, 335, 22, 16, 'βγ', '#e8defa', PUR, 1.2, 11)
    o += t(410, 378, 'activa una proteína G', 13, INK, 'middle', 600, 'fi', 1.4)
    # RTK
    o += t(640, 60, 'Acoplado a enzima (RTK)', 15, GREEN, 'middle', 700, 'fi', .8)
    for x in (615, 665):
        o += r(x - 8, 160, 16, 70, LGREEN, GREEN, 2, 6, 'pp', 1.0) + r(x - 6, 228, 12, 56, LGREEN, GREEN, 2, 4, 'pp', 1.0) + r(x - 14, 284, 28, 60, LGREEN, GREEN, 2, 8, 'pp', 1.0)
    o += lig(640, 150, 1.3)
    o += phos(600, 300, 1.6) + phos(680, 300, 1.7) + phos(600, 330, 1.8) + phos(680, 330, 1.9)
    o += t(640, 378, 'dimeriza y se autofosforila', 13, INK, 'middle', 600, 'fi', 2.0)
    # intracelular
    o += t(830, 60, 'Intracelular', 15, RED, 'middle', 700, 'fi', 1.2)
    o += lig(830, 120, 1.3, '#f2c66a') + t(830, 150, 'señal liposoluble', 12, RED, 'middle', 600, 'fi', 1.3)
    o += mover(lig(830, 200, 0, '#f2c66a'), 0, 170, 1.6, 1.6)
    o += blob(830, 420, 50, 22, 'receptor', LRED, RED, 1.4, 12) + t(830, 465, 'en citosol o núcleo', 12, INK, 'middle', 600, 'fi', 1.5)
    o += r(30, 500, 860, 75, CARD, LINE, 2, 12, 'fi', 2.2)
    o += t(460, 530, 'Señales hidrosolubles (proteínas, péptidos, aminas) no cruzan la membrana: usan receptores de superficie.', 14, INK, 'middle', 700, 'fi', 2.3)
    o += t(460, 557, 'Señales pequeñas e hidrofóbicas (esteroides, tiroideas, gases) cruzan y usan receptores intracelulares.', 14, INK, 'middle', 600, 'fi', 2.4)
    return svg(o, label='Clases de receptores: canal iónico, acoplado a proteína G, acoplado a enzima e intracelular')

# ---------------- 4. interruptores moleculares ----------------
def F_interruptores():
    o = t(230, 36, 'Por fosforilación', 19, RED, 'middle', 700, 'fi', 0) + t(690, 36, 'Por unión de GTP', 19, COB, 'middle', 700, 'fi', 0)
    o += p('M460,50 L460,560', LINE, 2, 'dr', .1)
    o += blob(120, 150, 70, 34, 'inactiva', '#eee', MUT, .2, 14) + blob(340, 150, 70, 34, 'activa', LGREEN, GREEN, .4, 14) + phos(385, 120, .6)
    o += carrow('M180,115 C220,70 260,70 290,115', 290, 115, 60, GREEN, 4, .8) + t(235, 70, 'cinasa', 15, GREEN, 'middle', 700, 'fi', 1.0) + t(235, 92, 'ATP → ADP', 12, MUT, 'middle', 600, 'fi', 1.0)
    o += carrow('M290,190 C260,235 220,235 180,190', 180, 190, 230, RED, 4, 1.2) + t(235, 252, 'fosfatasa', 15, RED, 'middle', 700, 'fi', 1.3) + t(235, 272, 'quita el fosfato', 12, MUT, 'middle', 600, 'fi', 1.3)
    o += tl(230, 330, ['Una proteína cinasa añade un fosfato', '(de ATP) a serina, treonina o tirosina.', 'Una fosfatasa lo quita.', 'Activa o inactiva según la proteína.'], 14, INK, 'middle', 600, 'fi', 1.6)
    o += blob(580, 150, 70, 34, 'GDP · inactiva', '#eee', MUT, .3, 13) + blob(800, 150, 70, 34, 'GTP · activa', LCOB, COB, .5, 13)
    o += carrow('M640,115 C680,70 720,70 750,115', 750, 115, 60, COB, 4, .9) + t(695, 70, 'GEF', 15, COB, 'middle', 700, 'fi', 1.0) + t(695, 92, 'cambia GDP por GTP', 12, MUT, 'middle', 600, 'fi', 1.0)
    o += carrow('M750,190 C720,235 680,235 640,190', 640, 190, 230, RED, 4, 1.3) + t(695, 252, 'GAP', 15, RED, 'middle', 700, 'fi', 1.4) + t(695, 272, 'estimula hidrolizar GTP', 12, MUT, 'middle', 600, 'fi', 1.4)
    o += tl(690, 330, ['Proteínas G triméricas (αβγ)', 'y GTPasas monoméricas (Ras).', 'Se apagan solas: hidrolizan', 'su GTP (temporizador).'], 14, INK, 'middle', 600, 'fi', 1.7)
    o += r(30, 470, 860, 100, CARD, LINE, 2, 12, 'fi', 2.2)
    o += t(460, 505, 'Muchas proteínas de señalización funcionan como interruptores: pasan de un estado inactivo a uno activo', 14, INK, 'middle', 700, 'fi', 2.3)
    o += t(460, 532, 'cuando reciben la señal, y vuelven al estado inactivo cuando la señal termina.', 14, INK, 'middle', 700, 'fi', 2.4)
    o += t(460, 557, 'Encender y apagar son igual de importantes.', 14, MUT, 'middle', 600, 'fi', 2.5)
    return svg(o, label='Dos tipos de interruptores moleculares: fosforilación con cinasas y fosfatasas, y unión de GTP con GEF y GAP')

# ---------------- 5. ciclo de la proteína G ----------------
def F_ciclo_g():
    o = ''
    pos = [(30, 30, '1 · Reposo'), (480, 30, '2 · Llega la señal'), (480, 310, '3 · Se separan y actúan'), (30, 310, '4 · Se apaga')]
    for i, (x, y, ti) in enumerate(pos):
        d = .2 + i*.9
        o += r(x, y, 410, 255, CARD, LINE, 2, 14, 'fi', d) + t(x + 16, y + 28, ti, 16, INK, 'start', 700, 'fi', d + .1)
        o += r(x + 10, y + 70, 390, 24, MEM, TAND, 1.5, 5, 'fi', d)
        for k in range(7):
            o += r(x + 60 + k*12, y + 62, 10, 42, LPUR, PUR, 1.2, 4, 'fi', d)
    # 1 reposo
    o += blob(150, 165, 38, 20, 'α', '#d8c8f5', PUR, .4, 14) + blob(205, 165, 22, 18, 'βγ', '#e8defa', PUR, .4, 12) + t(150, 205, 'GDP', 13, MUT, 'middle', 700, 'fi', .5)
    o += t(235, 250, 'α unida a GDP, junto a βγ: inactiva', 13, INK, 'middle', 600, 'fi', .6)
    # 2 señal
    o += lig(580, 75, 1.2) + blob(600, 165, 38, 20, 'α', '#d8c8f5', PUR, 1.3, 14) + blob(655, 165, 22, 18, 'βγ', '#e8defa', PUR, 1.3, 12)
    o += t(600, 205, 'GDP → GTP', 13, GREEN, 'middle', 700, 'fi', 1.5)
    o += t(685, 250, 'el receptor activado actúa como GEF', 13, INK, 'middle', 600, 'fi', 1.6)
    # 3 separadas
    o += blob(590, 420, 40, 20, 'α-GTP', LGREEN, GREEN, 2.1, 12) + blob(740, 380, 24, 18, 'βγ', '#e8defa', PUR, 2.1, 12)
    o += r(800, 440, 80, 30, LCOB, COB, 2, 8, 'pp', 2.3) + t(840, 460, 'diana', 12, COB, 'middle', 700, 'fi', 2.3)
    o += arrow(630, 430, 795, 452, GREEN, 3, 'dr', 2.4) + arrow(760, 395, 820, 438, PUR, 3, 'dr', 2.5)
    o += t(685, 525, 'α-GTP y βγ regulan enzimas o canales', 13, INK, 'middle', 600, 'fi', 2.6)
    # 4 apagado
    o += blob(150, 445, 38, 20, 'α', '#d8c8f5', PUR, 3.0, 14) + blob(205, 445, 22, 18, 'βγ', '#e8defa', PUR, 3.1, 12) + t(150, 485, 'GTP → GDP + Pᵢ', 13, RED, 'middle', 700, 'fi', 3.2)
    o += t(235, 525, 'α hidroliza su GTP y se reasocia a βγ', 13, INK, 'middle', 600, 'fi', 3.3)
    o += arrow(445, 160, 475, 160, OCRE, 4, 'dr', 1.0) + arrow(685, 290, 685, 305, OCRE, 4, 'dr', 1.9) + arrow(475, 440, 445, 440, OCRE, 4, 'dr', 2.8) + arrow(235, 305, 235, 290, OCRE, 4, 'dr', 3.5)
    return svg(o, label='Ciclo de activación de una proteína G trimérica')

# ---------------- 6. vía del AMPc ----------------
def F_ampc():
    o = membrane(110, d=0)
    for k in range(7):
        o += r(70 + k*12, 100, 10, 54, LPUR, PUR, 1.2, 4, 'fi', .1)
    o += lig(110, 80, .3) + t(150, 70, 'p. ej. adrenalina, glucagón', 13, TAND, 'start', 700, 'fi', .3)
    o += blob(170, 175, 34, 18, 'Gαs', LGREEN, GREEN, .7, 12)
    o += r(270, 100, 120, 64, LCOB, COB, 2, 10, 'pp', .9) + t(330, 138, 'adenilil ciclasa', 13, COB, 'middle', 700, 'fi', 1.0)
    o += arrow(205, 172, 268, 150, GREEN, 3, 'dr', 1.0)
    o += t(330, 205, 'ATP → AMPc', 15, INK, 'middle', 700, 'fi', 1.3)
    for k in range(6):
        o += mover(f'<circle cx="330" cy="225" r="8" fill="{OCRE}"/>', (k - 2.5)*30, 60, 1.5 + k*.1, 1.2)
    o += t(470, 290, 'AMPc (segundo mensajero)', 14, TAND, 'start', 700, 'fi', 1.8)
    # PKA
    o += r(220, 320, 220, 90, LPUR, PUR, 2, 14, 'pp', 2.0) + t(330, 345, 'PKA inactiva: R₂C₂', 14, PUR, 'middle', 700, 'fi', 2.1)
    o += t(330, 370, 'el AMPc se une a las R', 12, INK, 'middle', 600, 'fi', 2.2) + t(330, 392, 'y libera las subunidades C', 12, INK, 'middle', 600, 'fi', 2.2)
    o += arrow(330, 412, 200, 470, PUR, 3, 'dr', 2.5) + arrow(330, 412, 520, 470, PUR, 3, 'dr', 2.6)
    o += r(40, 470, 300, 100, CARD, LINE, 2, 12, 'fi', 2.7) + tl(190, 500, ['Respuesta rápida (citosol):', 'fosforila enzimas', 'p. ej. degradar glucógeno'], 14, INK, 'middle', 600, 'fi', 2.8)
    o += r(380, 470, 360, 100, '#eef2fd', COB, 2, 12, 'fi', 2.9) + tl(560, 500, ['Respuesta lenta (núcleo):', 'fosforila CREB, que activa', 'genes con elemento CRE'], 14, INK, 'middle', 600, 'fi', 3.0)
    o += r(620, 190, 270, 70, LRED, RED, 2, 12, 'pp', 3.2) + tl(755, 218, ['Fosfodiesterasa:', 'AMPc → AMP (apaga)'], 14, RED, 'middle', 700, 'fi', 3.3)
    return svg(o, label='Vía del AMPc: receptor, proteína Gs, adenilil ciclasa, AMPc, PKA, respuestas rápida y lenta, fosfodiesterasa')

# ---------------- 7. vía de la fosfolipasa C ----------------
def F_plc():
    o = membrane(110, d=0)
    for k in range(7):
        o += r(60 + k*12, 100, 10, 54, LPUR, PUR, 1.2, 4, 'fi', .1)
    o += lig(100, 80, .3)
    o += blob(160, 175, 34, 18, 'Gαq', LGREEN, GREEN, .6, 12)
    o += r(240, 100, 140, 64, LCOB, COB, 2, 10, 'pp', .8) + t(310, 130, 'fosfolipasa C-β', 13, COB, 'middle', 700, 'fi', .9)
    o += arrow(195, 172, 238, 150, GREEN, 3, 'dr', .9)
    o += t(470, 104, 'PIP₂ (fosfolípido de inositol)', 13, TAND, 'start', 700, 'fi', 1.1)
    o += arrow(380, 132, 465, 132, OCRE, 3, 'dr', 1.2)
    o += r(470, 116, 110, 32, LOCRE, TAND, 2, 8, 'pp', 1.4) + t(525, 137, 'DAG', 14, TAND, 'middle', 700, 'fi', 1.5) + t(600, 137, 'queda en la membrana', 12, MUT, 'start', 600, 'fi', 1.5)
    o += mover(f'<g><circle cx="320" cy="180" r="14" fill="{GREEN}"/><text x="320" y="185" font-size="11" fill="#fff" text-anchor="middle" font-weight="700">IP₃</text></g>', -60, 150, 1.6, 1.4)
    o += t(330, 230, 'IP₃ difunde por el citosol', 13, GREEN, 'start', 700, 'fi', 1.7)
    # RE
    o += f'<path d="M40,360 C40,330 300,330 300,360 L300,440 C300,470 40,470 40,440 Z" fill="#fbe9c6" stroke="{TAND}" stroke-width="3"{st("pp", 1.9)}/>'
    o += t(170, 410, 'retículo endoplásmico', 13, TAND, 'middle', 700, 'fi', 2.0)
    o += r(250, 335, 24, 30, GREEN, 'none', 0, 6, 'pp', 2.1)
    for k in range(5):
        o += mover(c(262, 350, 6, OCRE, TAND, 1, 'fi', 0), 60 + k*22, -40 + k*14, 2.4 + k*.1, 1.4)
    o += t(380, 300, 'sale Ca²⁺', 14, TAND, 'start', 700, 'fi', 2.5)
    o += r(520, 260, 170, 70, LPUR, PUR, 2, 12, 'pp', 2.8) + tl(605, 288, ['PKC', 'DAG + Ca²⁺ la activan'], 13, PUR, 'middle', 700, 'fi', 2.9)
    o += arrow(525, 150, 590, 258, TAND, 3, 'dr', 2.9)
    o += r(520, 380, 260, 70, LCOB, COB, 2, 12, 'pp', 3.1) + tl(650, 408, ['Ca²⁺ + calmodulina', '→ CaM-cinasas y otras dianas'], 13, COB, 'middle', 700, 'fi', 3.2)
    o += r(30, 500, 860, 70, CARD, LINE, 2, 12, 'fi', 3.4)
    o += t(460, 530, 'Una sola enzima (PLC-β) produce dos segundos mensajeros: IP₃ (libera Ca²⁺) y DAG (activa PKC).', 14, INK, 'middle', 700, 'fi', 3.5)
    o += t(460, 555, 'El Ca²⁺ también funciona como mensajero: casi siempre actúa a través de la calmodulina.', 14, MUT, 'middle', 600, 'fi', 3.6)
    return svg(o, label='Vía de la fosfolipasa C: IP3 libera Ca2+ del retículo y DAG activa la proteína cinasa C')

# ---------------- 8. amplificación ----------------
def F_amplif():
    o = t(460, 36, 'Amplificación: cada paso activa a muchas moléculas del siguiente', 19, INK, 'middle', 700, 'fi', 0)
    rows = [('1 molécula de señal', 1, OCRE), ('receptores y proteínas G activas', 3, PUR), ('adenilil ciclasas → muchas moléculas de AMPc', 6, COB),
            ('PKA activas', 10, GREEN), ('enzimas fosforiladas', 16, RED), ('muchísimas moléculas de producto', 28, TAND)]
    for i, (lab, n, col) in enumerate(rows):
        y = 85 + i*80; d = .3 + i*.5
        for k in range(n):
            o += c(600 + (k - (n - 1)/2)*20, y, 8, col, 'none', 0, 'pp', d + k*.02)
        o += t(30, y + 5, lab, 14, INK, 'start', 700, 'fi', d)
        if i < len(rows) - 1:
            o += arrow(600, y + 14, 600, y + 62, MUT, 2, 'dr', d + .3)
    o += t(460, 580, 'Esquema cualitativo: por eso basta una concentración muy baja de hormona para una respuesta grande.', 13, MUT, 'middle', 600, 'fi', 3.4)
    return svg(o, label='Amplificación de la señal en una cascada')

# ---------------- 9. RTK ----------------
def F_rtk():
    o = membrane(240) + t(30, 230, 'EXTERIOR', 13, MUT, 'start', 700, 'fi', 0) + t(30, 300, 'CITOSOL', 13, MUT, 'start', 700, 'fi', 0)
    def rec(x, d, ph=False):
        s = r(x - 12, 120, 24, 110, LGREEN, GREEN, 2, 8, 'pp', d) + r(x - 6, 228, 12, 50, LGREEN, GREEN, 2, 4, 'pp', d) + r(x - 18, 276, 36, 110, '#cdeedd', GREEN, 2, 10, 'pp', d)
        if ph:
            s += phos(x - 26 if x < 400 else x + 26, 300, d + .8) + phos(x - 26 if x < 400 else x + 26, 340, d + .9)
        return s
    o += t(150, 70, 'Separados: inactivos', 15, MUT, 'middle', 700, 'fi', .1)
    o += rec(110, .2) + rec(190, .3)
    o += arrow(260, 240, 330, 240, OCRE, 4, 'dr', .8)
    o += t(520, 70, 'La señal los une (dímero) → se fosforilan entre sí', 15, GREEN, 'middle', 700, 'fi', 1.0)
    o += lig(500, 100, 1.1, OCRE, 16)
    o += rec(470, 1.2, True) + rec(530, 1.2, True)
    o += blob(720, 300, 60, 22, 'Grb2 (SH2)', LPUR, PUR, 2.4, 12) + blob(720, 360, 60, 22, 'PI3K', LCOB, COB, 2.6, 12) + blob(720, 420, 60, 22, 'PLC-γ', LOCRE, TAND, 2.8, 12)
    o += arrow(560, 300, 658, 300, PUR, 3, 'dr', 2.5) + arrow(560, 340, 658, 358, COB, 3, 'dr', 2.7) + arrow(556, 360, 660, 415, TAND, 3, 'dr', 2.9)
    o += t(720, 470, 'proteínas con dominio SH2 se unen', 13, INK, 'middle', 600, 'fi', 3.0) + t(720, 488, 'a las tirosinas fosforiladas', 13, INK, 'middle', 600, 'fi', 3.0)
    o += r(30, 510, 860, 65, CARD, LINE, 2, 12, 'fi', 3.2)
    o += t(460, 538, 'Receptores tirosina cinasa: factores de crecimiento (EGF, PDGF), insulina. Cada tirosina fosforilada', 14, INK, 'middle', 700, 'fi', 3.3)
    o += t(460, 560, 'es un sitio de anclaje para una proteína distinta: la señal se ramifica en varias vías.', 14, INK, 'middle', 600, 'fi', 3.4)
    return svg(o, label='Receptor tirosina cinasa: dimerización, autofosforilación y anclaje de proteínas con dominio SH2')

# ---------------- 10. Ras-MAPK ----------------
def F_ras():
    steps = [('RTK fosforilado', 'tirosinas fosforiladas en la cola citosólica'),
             ('Grb2 (adaptador) + Sos (GEF)', 'Sos cambia GDP por GTP en Ras'),
             ('Ras-GTP (GTPasa monomérica)', 'interruptor encendido en la membrana'),
             ('Raf (MAPKKK) → MEK (MAPKK) → ERK (MAPK)', 'cascada de tres cinasas'),
             ('ERK entra al núcleo', 'fosforila reguladores de genes: proliferación y diferenciación')]
    return svg(flow(steps, 30, 20, 860, 90, 22, .2, [LGREEN, LPUR, LCOB, LOCRE, CARD]), label='Vía Ras-MAP cinasa desde un receptor tirosina cinasa hasta el núcleo')

# ---------------- 11. PI3K-Akt ----------------
def F_pi3k():
    o = membrane(110)
    o += r(70, 40, 24, 70, LGREEN, GREEN, 2, 8, 'pp', .1) + r(70, 140, 24, 60, '#cdeedd', GREEN, 2, 8, 'pp', .1) + phos(110, 170, .3)
    o += t(82, 30, 'receptor (p. ej. insulina)', 13, GREEN, 'start', 700, 'fi', .2)
    o += blob(200, 200, 45, 22, 'PI3K', LCOB, COB, .6, 13) + arrow(118, 175, 158, 192, COB, 3, 'dr', .6)
    o += t(260, 104, 'PIP₂ → PIP₃', 15, TAND, 'start', 700, 'fi', 1.0) + arrow(220, 178, 280, 146, COB, 3, 'dr', 1.0)
    o += r(380, 144, 22, 20, OCRE, TAND, 1.5, 4, 'pp', 1.2) + t(392, 185, 'PIP₃ = sitio de anclaje', 12, TAND, 'middle', 700, 'fi', 1.3)
    o += blob(470, 205, 45, 22, 'Akt', LPUR, PUR, 1.6, 14) + t(560, 210, 'se recluta y la activan otras cinasas (PDK1)', 13, PUR, 'start', 600, 'fi', 1.8)
    outs = [(170, 360, 'Supervivencia', 'fosforila a Bad: no se inhibe a Bcl-2', LRED, RED), (460, 360, 'Crecimiento celular', 'vía mTOR: más síntesis de proteínas', LGREEN, GREEN), (750, 360, 'Captación de glucosa', 'GLUT4 a la membrana (insulina)', LCOB, COB)]
    for i, (x, y, ti, su, f, col) in enumerate(outs):
        d = 2.2 + i*.3
        o += arrow(470, 230, x, y - 40, col, 3, 'dr', d)
        o += r(x - 135, y - 30, 270, 90, f, col, 2, 12, 'pp', d + .2) + t(x, y + 2, ti, 16, col, 'middle', 700, 'fi', d + .3) + t(x, y + 30, su, 12, INK, 'middle', 600, 'fi', d + .35)
    o += r(30, 490, 860, 80, CARD, LINE, 2, 12, 'fi', 3.4)
    o += t(460, 522, 'Un lípido fosforilado (PIP₃) funciona como plataforma: atrae a la membrana a proteínas con dominio PH.', 14, INK, 'middle', 700, 'fi', 3.5)
    o += t(460, 548, 'La fosfatasa PTEN quita el fosfato al PIP₃ y apaga la vía.', 14, MUT, 'middle', 600, 'fi', 3.6)
    return svg(o, label='Vía PI3K-Akt: PIP3, Akt y sus respuestas de supervivencia, crecimiento y captación de glucosa')

# ---------------- 12. receptores intracelulares ----------------
def F_nuclear():
    o = e(460, 300, 440, 280, '#fbf6ea', INK, 3, 'pp', 0) + t(460, 40, 'célula diana', 13, MUT, 'middle', 700, 'fi', .1)
    o += e(600, 330, 200, 150, '#eef2fd', COB, 3, 'pp', .2) + t(600, 200, 'NÚCLEO', 13, COB, 'middle', 700, 'fi', .3)
    o += mover(lig(60, 140, 0, '#f2c66a', 13), 150, 70, .5, 1.5)
    o += t(40, 110, 'esteroide (cortisol, estrógenos…)', 13, TAND, 'start', 700, 'fi', .4)
    o += blob(230, 260, 55, 26, 'receptor', LRED, RED, 1.0, 13) + blob(230, 315, 40, 18, 'Hsp90', '#eee', MUT, 1.0, 11)
    o += t(230, 360, 'en reposo, unido a chaperonas', 12, INK, 'middle', 600, 'fi', 1.2)
    o += carrow('M290,255 C370,230 420,260 470,300', 470, 300, 40, RED, 4, 1.8)
    o += t(380, 225, 'cambia de forma y entra', 12, RED, 'middle', 700, 'fi', 1.9)
    o += p('M470,360 L740,360', COB, 6, 'dr', 2.2) + r(510, 344, 100, 32, LOCRE, TAND, 2, 6, 'pp', 2.3) + t(560, 365, 'HRE', 13, TAND, 'middle', 700, 'fi', 2.4)
    o += r(620, 344, 110, 32, LCOB, COB, 2, 6, 'pp', 2.3) + t(675, 365, 'gen diana', 13, COB, 'middle', 700, 'fi', 2.4)
    o += blob(560, 320, 45, 20, 'R + ligando', LRED, RED, 2.6, 11)
    o += p('M630,410 C660,400 690,420 720,410', TAND, 4, 'dr', 3.0) + t(675, 440, 'ARNm', 13, TAND, 'middle', 700, 'fi', 3.1)
    o += r(120, 460, 300, 80, CARD, LINE, 2, 12, 'fi', 3.3)
    o += tl(270, 488, ['El receptor es a la vez receptor y', 'regulador de la transcripción.'], 13, INK, 'middle', 700, 'fi', 3.4)
    o += t(600, 520, 'HRE = elemento de respuesta a la hormona', 12, MUT, 'middle', 600, 'fi', 3.4)
    return svg(o, label='Receptor intracelular de hormona esteroidea: entra al núcleo y regula la transcripción de genes diana')

# ---------------- 13. óxido nítrico ----------------
def F_no():
    steps = [('Acetilcolina en el endotelio', 'receptor acoplado a proteína G → sube el Ca²⁺'),
             ('NO sintasa: arginina → NO', 'el NO es un gas que difunde a las células vecinas'),
             ('Guanilil ciclasa (en la célula muscular lisa)', 'GTP → GMPc'),
             ('GMPc activa a la PKG', 'baja el Ca²⁺ del músculo liso'),
             ('Relajación del músculo liso', 'el vaso se dilata; el NO dura segundos')]
    return svg(flow(steps, 30, 20, 860, 90, 22, .2, [LPUR, LOCRE, LCOB, LGREEN, CARD]), label='Señalización por óxido nítrico: del endotelio a la relajación del músculo liso')

# ---------------- 14. apagar la señal ----------------
def F_apagar():
    o = t(460, 36, 'Para cada paso que enciende, hay uno que apaga', 19, INK, 'middle', 700, 'fi', 0)
    rows = [('Proteína G', 'hidroliza su GTP (GTPasa intrínseca)', PUR, LPUR),
            ('Ras', 'GAP estimula la hidrólisis de GTP', COB, LCOB),
            ('AMPc', 'fosfodiesterasa: AMPc → AMP', TAND, LOCRE),
            ('Proteínas fosforiladas', 'fosfatasas quitan el fosfato', RED, LRED),
            ('Receptor', 'desensibilización: GRK + arrestina; endocitosis', GREEN, LGREEN),
            ('Ca²⁺', 'bombas lo regresan al RE o al exterior', MUT, '#eee')]
    for i, (a, b, col, f) in enumerate(rows):
        y = 70 + i*80; d = .2 + i*.35
        o += r(40, y, 250, 60, f, col, 2.5, 12, 'pp', d) + t(165, y + 37, a, 16, col, 'middle', 700, 'fi', d + .1)
        o += arrow(300, y + 30, 360, y + 30, col, 3, 'dr', d + .2)
        o += r(370, y, 510, 60, CARD, LINE, 2, 12, 'fi', d + .3) + t(390, y + 37, b, 15, INK, 'start', 600, 'fi', d + .35)
    return svg(o, label='Mecanismos que terminan la señal en cada paso')
