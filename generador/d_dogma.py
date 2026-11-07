from sv import *

def wrapfig(h): return f'<div style="width:100%">{h}</div>'

def chip(x, y, s, fill, col='#fff', size=18, w=None):
    w = w or (len(s) * size * .62 + 26)
    return f'<g><rect x="{x - w/2:.0f}" y="{y - size*.95:.0f}" width="{w:.0f}" height="{size*1.8:.0f}" rx="{size*.9:.0f}" fill="{fill}"/><text x="{x}" y="{y + size*.35:.0f}" font-size="{size}" fill="{col}" text-anchor="middle" font-weight="700">{s}</text></g>'

def F_flujo():
    o = box(50, 250, 210, 96, 'ADN', None, LCOB, COB, COB, .1, 36)
    o += box(355, 250, 210, 96, 'ARN', None, LOCRE, TAND, TAND, .8, 36)
    o += box(660, 250, 210, 96, 'Proteína', None, LGREEN, GREEN, GREEN, 1.5, 34)
    o += arrow(265, 298, 348, 298, COB, 5, 'dr', .5) + t(306, 238, 'transcripción', 20, INK, 'middle', 700, 'fi', .6)
    o += arrow(570, 298, 653, 298, COB, 5, 'dr', 1.2) + t(612, 238, 'traducción', 20, INK, 'middle', 700, 'fi', 1.3)
    o += carrow('M110,248 C70,110 240,110 205,244', 205, 244, 100, OCRE, 5, 1.8)
    o += t(155, 110, 'replicación', 22, TAND, 'middle', 700, 'fi', 2.0)
    o += p('M460,352 C430,470 210,470 170,352', RED, 4, 'dr', 2.4, extra='stroke-dasharray:0')
    o += f'<path d="M170,352 L166,370 L182,364 Z" fill="{RED}"{st("fi", 3.2)}/>'
    o += tl(315, 500, ['retrotranscripción', '(retrovirus como el VIH)'], 19, RED, 'middle', 700, 'fi', 2.6)
    for i in range(3):
        o += mover(c(265, 298, 8, OCRE, 'none', 0, ''), 390, 0, 3.0 + i*.8, 2.4)
    return svg(o, label='Flujo de la información: replicación, transcripción, traducción y retrotranscripción')

def tbl_adn_arn():
    return table(['', 'ADN', 'ARN'], [
        ['Azúcar', 'Desoxirribosa (sin OH en 2′)', 'Ribosa (con OH en 2′)'],
        ['Bases', 'A, G, C, <b>T</b>', 'A, G, C, <b>U</b>'],
        ['Cadenas', 'Doble hélice', 'Casi siempre sencilla; se pliega'],
        ['Estabilidad', 'Muy estable: archivo', 'Más lábil: mensaje temporal'],
        ['Función', 'Guardar la información', 'Mensajero, adaptador (ARNt), ribosoma (ARNr)'],
    ])

def F_antipar():
    seq = 'TACGGATCCATG'
    comp = {'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G'}
    o = t(40, 70, 'cadena molde', 20, MUT, 'start', 700, 'fi', 0)
    o += p('M90,140 L850,140', COB, 8, 'dr', .1)
    o += t(60, 148, '3′', 24, COB, 'middle', 700, 'fi', .2) + t(880, 148, '5′', 24, COB, 'middle', 700, 'fi', .2)
    for i, b in enumerate(seq):
        x = 130 + i*62
        o += p(f'M{x},146 L{x},180', COB, 3, 'dr', .3) + t(x, 205, b, 22, COB, 'middle', 700, 'fi', .3)
    # cadena nueva
    o += t(60, 338, '5′', 24, GREEN, 'middle', 700, 'fi', .6)
    for i, b in enumerate(seq[:9]):
        x = 130 + i*62
        d = .7 + i*.25
        o += p(f'M{x},290 L{x},250', GREEN, 3, 'dr', d) + t(x, 240, comp[b], 22, GREEN, 'middle', 700, 'fi', d)
        o += p(f'M{x-31 if i else 90},330 L{x+31},330', GREEN, 8, 'dr', d)
    o += t(735, 338, '3′-OH', 22, GREEN, 'start', 700, 'fi', 3.0)
    o += f'<g class="mv1" style="--d:.7s;--t:2.3s;--dx:-496px;--dy:0px"><ellipse cx="660" cy="320" rx="70" ry="48" fill="{LOCRE}" stroke="{TAND}" stroke-width="3" opacity=".85"/><text x="660" y="327" font-size="18" fill="{TAND}" text-anchor="middle" font-weight="700">polimerasa</text></g>'
    o += mover(chip(780, 470, 'dNTP', COB, size=18), -100, -130, 3.2, 2.2)
    o += arrow(150, 420, 560, 420, GREEN, 5, 'dr', 2.6) + t(355, 400, 'síntesis 5′ → 3′', 22, GREEN, 'middle', 700, 'fi', 2.8)
    o += tl(460, 520, ['cada nucleótido nuevo se une al 3′-OH libre;', 'la cadena nueva es antiparalela al molde'], 21, INK, 'middle', 600, 'fi', 3.4)
    return svg(o, label='Cadenas antiparalelas y síntesis en dirección 5 prima a 3 prima')

def F_gen():
    o = t(330, 132, 'cadena codificante (sentido)', 19, MUT, 'start', 700, 'fi', 0) + t(22, 168, '5′', 19, COB, 'middle', 700, 'fi', 0) + t(22, 258, '3′', 19, COB, 'middle', 700, 'fi', 0)
    o += t(40, 335, 'cadena molde (antisentido)', 19, MUT, 'start', 700, 'fi', 0)
    o += p('M40,160 L880,160', COB, 7, 'dr', .1) + p('M40,250 L880,250', COB, 7, 'dr', .1)
    o += r(80, 145, 170, 120, LOCRE, TAND, 3, 10, 'fi', .5) + t(165, 212, 'promotor', 22, TAND, 'middle', 700, 'fi', .6)
    o += r(760, 145, 110, 120, LRED, RED, 3, 10, 'fi', .7) + tl(815, 200, ['termi-', 'nador'], 19, RED, 'middle', 700, 'fi', .8)
    o += p('M250,145 L250,95 L300,95', GREEN, 4, 'dr', 1.0) + f'<path d="M300,95 L286,87 L286,103 Z" fill="{GREEN}"{st("fi", 1.6)}/>' + t(262, 80, '+1', 20, GREEN, 'start', 700, 'fi', 1.2)
    o += p('M250,295 L760,295', LINE, 2, 'dr', 1.1) + t(505, 320, 'unidad de transcripción', 18, MUT, 'middle', 700, 'fi', 1.2)
    o += p('M250,420 L760,420', TAND, 9, 'dr', 1.6, t_=1.6)
    o += t(240, 427, '5′', 22, TAND, 'end', 700, 'fi', 1.6) + t(772, 427, '3′', 22, TAND, 'start', 700, 'fi', 3.0)
    o += t(505, 395, 'ARN', 24, TAND, 'middle', 700, 'fi', 2.0)
    o += carrow('M505,262 L505,375', 505, 375, 90, OCRE, 3, 1.4)
    o += r(110, 470, 700, 90, CARD, OCRE, 2.5, 14, 'pp', 3.0)
    o += tl(460, 505, ['El ARN copia la cadena molde y queda con la misma', 'secuencia que la codificante (U en lugar de T)'], 21, INK, 'middle', 600, 'fi', 3.2)
    return svg(o, label='Estructura de un gen: promotor, unidad de transcripción y terminador')

def tbl_pol():
    return table(['', 'ADN polimerasa', 'ARN polimerasa'], [
        ['Produce', 'ADN (dNTP)', 'ARN (NTP)'],
        ['¿Necesita cebador?', '<b>Sí</b>, un extremo 3′-OH', '<b>No</b>, empieza sola'],
        ['¿Abre la doble hélice?', 'No: lo hace la helicasa', 'Sí, forma su propia burbuja'],
        ['Corrección de errores', 'Exonucleasa 3′→5′: muy fiel', 'Mínima: comete más errores'],
        ['Qué copia', 'Todo el genoma, una vez por ciclo', 'Solo los genes que se necesitan'],
    ])

def trna(x, y, aa=None, col=COB, fill=LCOB, anti='', d=0):
    s = f'<rect x="{x-24}" y="{y}" width="48" height="96" rx="14" fill="{fill}" stroke="{col}" stroke-width="3"/>'
    s += f'<text x="{x}" y="{y+86}" font-size="15" fill="{col}" text-anchor="middle" font-weight="700">{anti}</text>'
    if aa: s += f'<circle cx="{x}" cy="{y-16}" r="16" fill="{aa}"/>'
    return s

def F_ribosoma():
    o = f'<path d="M190,300 C170,140 300,70 460,70 C620,70 750,140 730,300 Z" fill="#e6ecfb" stroke="{COB}" stroke-width="4"{st("pp", .1)}/>'
    o += t(460, 112, 'subunidad mayor (50S / 60S)', 21, COB, 'middle', 700, 'fi', .3)
    o += f'<path d="M230,330 C230,430 690,430 690,330 Z" fill="{LOCRE}" stroke="{TAND}" stroke-width="4"{st("pp", .3)}/>'
    o += t(460, 400, 'subunidad menor (30S / 40S)', 21, TAND, 'middle', 700, 'fi', .5)
    o += p('M60,318 L860,318', RED, 6, 'dr', .6) + t(70, 300, 'ARNm 5′', 18, RED, 'start', 700, 'fi', .7) + t(860, 300, '3′', 18, RED, 'end', 700, 'fi', .7)
    for i, (n, x) in enumerate([('E', 340), ('P', 460), ('A', 580)]):
        o += r(x - 50, 150, 100, 160, 'none', MUT, 2, 10, 'fi', .8, 'stroke-dasharray:6 6')
        o += t(x, 175, n, 26, MUT, 'middle', 700, 'fi', .9)
    o += g(trna(460, 210, None, GREEN, LGREEN, 'UAC'), 'pp', 1.2)
    for k in range(3):
        o += c(460 - 0, 196 - k*28, 12, GREEN if k == 0 else COB, 'none', 0, 'pp', 1.4 + k*.1)
    o += p('M460,140 L460,80', 'none', 0, '', 0)
    o += mover(trna(580, 210, OCRE, COB, LCOB, 'CGA'), 260, -200, 2.0, 2.4)
    for i, (cod, x) in enumerate([('AUG', 460), ('GCU', 580)]):
        o += t(x, 350, cod, 20, RED, 'middle', 700, 'fi', 1.0)
    o += tl(460, 470, ['El anticodón del ARNt se aparea con el codón del ARNm;', 'el ARNt lleva su aminoácido correspondiente'], 21, INK, 'middle', 600, 'fi', 2.6)
    o += t(800, 120, 'péptido', 18, GREEN, 'middle', 700, 'fi', 1.6) + p('M770,128 L485,180', GREEN, 2, 'dr', 1.6)
    return svg(o, label='Ribosoma con sitios E, P y A y ARNt apareados con el ARNm')

def F_horquilla():
    o = p('M30,280 L300,280', COB, 6, 'dr', 0) + p('M30,320 L300,320', COB, 6, 'dr', 0)
    o += p('M300,280 L360,190 L890,190', COB, 6, 'dr', .2) + p('M300,320 L360,410 L890,410', COB, 6, 'dr', .2)
    o += c(310, 300, 30, OCRE, TAND, 3, 'pp', .6) + t(292, 258, 'helicasa', 19, TAND, 'end', 700, 'fi', .7)
    o += f'<g class="sp" style="--d:1s;--t:2s;transform-origin:310px 300px"><path d="M290,300 L330,300" stroke="{TAND}" stroke-width="4"/></g>'
    o += c(140, 300, 28, LRED, RED, 3, 'pp', .8) + t(140, 365, 'topoisomerasa', 18, RED, 'middle', 700, 'fi', .9)
    # adelantada
    o += p('M880,215 L400,215', GREEN, 7, 'dr', 1.2, t_=1.6) + f'<path d="M390,215 L408,206 L408,224 Z" fill="{GREEN}"{st("fi", 2.6)}/>'
    o += e(430, 222, 48, 30, '#cfe8db', GREEN, 3, 'pp', 2.2) + t(430, 228, 'pol', 17, GREEN, 'middle', 700, 'fi', 2.3)
    o += t(640, 160, 'hebra adelantada (continua)', 20, GREEN, 'middle', 700, 'fi', 1.4)
    # retrasada
    frags = [(700, 860, 1.4), (540, 680, 2.2), (410, 520, 3.0)]
    for (a, b, d) in frags:
        o += p(f'M{a},385 L{a+22},385', RED, 7, 'dr', d)
        o += p(f'M{a+22},385 L{b},385', GREEN, 7, 'dr', d + .3)
        o += f'<path d="M{b+8},385 L{b-8},377 L{b-8},393 Z" fill="{GREEN}"{st("fi", d + .9)}/>'
    for x in [340, 362, 384]:
        o += c(x - 6, 372 + (x - 340)*0.0, 7, '#bdbdbd', MUT, 1, 'pp', 3.4)
    o += c(415, 445, 20, LOCRE, TAND, 3, 'pp', 3.0) + t(415, 487, 'primasa', 18, TAND, 'middle', 700, 'fi', 3.1)
    o += t(640, 460, 'hebra retrasada: fragmentos de Okazaki', 20, GREEN, 'middle', 700, 'fi', 2.0)
    o += t(350, 350, 'SSB', 15, MUT, 'middle', 700, 'fi', 3.5)
    o += f'<rect x="20" y="520" width="18" height="12" fill="{RED}"/>' + t(46, 531, 'cebador de ARN', 17, INK, 'start', 600, 'fi', 0)
    o += f'<rect x="220" y="520" width="18" height="12" fill="{GREEN}"/>' + t(246, 531, 'ADN nuevo', 17, INK, 'start', 600, 'fi', 0)
    o += arrow(160, 230, 60, 230, MUT, 3, 'dr', 3.6) + t(110, 215, 'avance', 16, MUT, 'middle', 600, 'fi', 3.6)
    return svg(o, label='Horquilla de replicación con hebra adelantada, hebra retrasada y enzimas')

def F_okazaki():
    o = ''
    rows = [('1. Fragmentos con su cebador', 90), ('2. Se quita el cebador y se rellena', 270), ('3. La ligasa sella la mella', 450)]
    for i, (s, y) in enumerate(rows):
        d = i*1.1
        o += t(40, y - 40, s, 22, COB, 'start', 700, 'fi', d)
        o += p(f'M40,{y} L880,{y}', COB, 5, 'dr', d + .1)
    # fila 1
    y = 110
    o += p(f'M60,{y} L420,{y}', GREEN, 8, 'dr', .2) + p(f'M430,{y} L500,{y}', RED, 8, 'dr', .4) + p(f'M500,{y} L860,{y}', GREEN, 8, 'dr', .5)
    # fila 2
    y = 290
    o += p(f'M60,{y} L420,{y}', GREEN, 8, 'dr', 1.3) + p(f'M500,{y} L860,{y}', GREEN, 8, 'dr', 1.3)
    o += p(f'M420,{y} L496,{y}', '#6aa98a', 8, 'dr', 1.9)
    o += e(470, y + 40, 80, 26, LOCRE, TAND, 2, 'pp', 1.5) + t(470, y + 46, 'pol I / RNasa H + FEN1', 15, TAND, 'middle', 700, 'fi', 1.6)
    # fila 3
    y = 470
    o += p(f'M60,{y} L860,{y}', GREEN, 8, 'dr', 2.4)
    o += c(498, y, 16, 'none', RED, 3, 'pu', 2.9)
    o += e(498, y + 46, 70, 24, LCOB, COB, 2, 'pp', 2.6) + t(498, y + 52, 'ADN ligasa', 17, COB, 'middle', 700, 'fi', 2.7)
    return svg(o, label='Eliminación de cebadores y unión de fragmentos de Okazaki')

def F_promotor():
    o = t(40, 50, 'Complejo cerrado', 22, COB, 'start', 700, 'fi', 0)
    def dna(y, d, bubble=False):
        s = ''
        if bubble:
            s += p(f'M40,{y-6} L470,{y-6} C500,{y-50} 600,{y-50} 630,{y-6} L880,{y-6}', COB, 5, 'dr', d)
            s += p(f'M40,{y+6} L470,{y+6} C500,{y+50} 600,{y+50} 630,{y+6} L880,{y+6}', COB, 5, 'dr', d)
        else:
            s += p(f'M40,{y-6} L880,{y-6}', COB, 5, 'dr', d) + p(f'M40,{y+6} L880,{y+6}', COB, 5, 'dr', d)
        s += r(180, y - 18, 120, 36, LOCRE, TAND, 2, 8, 'fi', d + .3) + t(240, y + 7, '−35', 20, TAND, 'middle', 700, 'fi', d + .3)
        s += r(420, y - 18, 120, 36, LOCRE, TAND, 2, 8, 'fi', d + .4) + t(480, y + 7, '−10', 20, TAND, 'middle', 700, 'fi', d + .4)
        s += t(600, y + (78 if bubble else 48), '+1', 20, GREEN, 'middle', 700, 'fi', d + .5)
        return s
    o += dna(200, .1)
    o += t(240, 250, 'TTGACA', 17, MUT, 'middle', 600, 'fi', .5) + t(480, 250, 'TATAAT', 17, MUT, 'middle', 600, 'fi', .5)
    pol = f'<g><ellipse cx="420" cy="112" rx="230" ry="52" fill="{LCOB}" stroke="{COB}" stroke-width="3" opacity=".9"/><text x="420" y="110" font-size="20" fill="{COB}" text-anchor="middle" font-weight="700">ARN polimerasa (α₂ββ′ω)</text><ellipse cx="360" cy="164" rx="150" ry="18" fill="{OCRE}" stroke="{TAND}" stroke-width="2"/><text x="360" y="171" font-size="18" fill="{INK}" text-anchor="middle" font-weight="700">σ</text></g>'
    o += f'<g class="mv1" style="--d:.8s;--t:1.4s;--dx:0px;--dy:-120px">{pol}</g>'
    o += t(40, 330, 'Complejo abierto', 22, COB, 'start', 700, 'fi', 2.2)
    o += dna(450, 2.3, True)
    o += t(550, 392, 'burbuja', 18, RED, 'middle', 700, 'fi', 3.0)
    o += tl(460, 555, ['σ reconoce −35 y −10; la polimerasa desenrolla ~17 pb y empieza en +1'], 19, INK, 'middle', 600, 'fi', 3.2)
    return svg(o, label='Reconocimiento del promotor bacteriano por el factor sigma')

def F_termin():
    o = t(220, 40, 'Intrínseca', 24, COB, 'middle', 700, 'fi', 0) + t(680, 40, 'Dependiente de Rho', 24, COB, 'middle', 700, 'fi', 0)
    o += p('M460,60 L460,560', LINE, 2, 'dr', 0)
    # horquilla
    o += p('M40,460 L120,460 L140,420', TAND, 6, 'dr', .2)
    o += p('M140,420 L140,250 C140,200 210,200 210,250 L210,420', TAND, 6, 'dr', .6)
    for y in range(270, 420, 30):
        o += p(f'M146,{y} L204,{y}', TAND, 3, 'dr', 1.2)
    o += p('M210,420 L230,460 L340,460', TAND, 6, 'dr', 1.4)
    o += t(300, 450, 'UUUUUU', 18, RED, 'middle', 700, 'fi', 1.6)
    o += e(405, 455, 52, 40, LCOB, COB, 3, 'pp', 1.0) + t(405, 462, 'pol', 18, COB, 'middle', 700, 'fi', 1.1)
    o += tl(220, 525, ['tallo rico en G-C + U', 'débiles → la pol se suelta'], 19, INK, 'middle', 600, 'fi', 2.0)
    o += t(250, 230, 'horquilla', 18, TAND, 'start', 700, 'fi', 1.4)
    # rho
    o += p('M490,400 L880,400', TAND, 6, 'dr', .3)
    o += e(840, 395, 50, 42, LCOB, COB, 3, 'pp', .5) + t(840, 402, 'pol', 18, COB, 'middle', 700, 'fi', .6)
    rho = f'<g><circle cx="540" cy="400" r="34" fill="{LRED}" stroke="{RED}" stroke-width="4"/><circle cx="540" cy="400" r="12" fill="{CARD}"/><text x="540" y="350" font-size="20" fill="{RED}" text-anchor="middle" font-weight="700">Rho</text></g>'
    o += f'<g class="mv" style="--d:1s;--t:2.6s;--dx:220px;--dy:0px">{rho}</g>'
    o += r(500, 410, 120, 12, OCRE, 'none', 0, 4, 'fi', .7) + t(560, 450, 'sitio rut', 16, TAND, 'middle', 700, 'fi', .8)
    o += tl(680, 525, ['helicasa con ATP: corre por el', 'ARN y separa a la polimerasa'], 19, INK, 'middle', 600, 'fi', 2.0)
    return svg(o, label='Terminación de la transcripción bacteriana intrínseca y dependiente de Rho')

def F_inicio():
    o = t(40, 45, 'Bacteria', 24, COB, 'start', 700, 'fi', 0)
    o += p('M40,190 L880,190', RED, 6, 'dr', .1)
    o += r(220, 172, 130, 36, LOCRE, TAND, 2, 8, 'fi', .3) + t(285, 197, 'Shine-Dalgarno', 15, TAND, 'middle', 700, 'fi', .3)
    o += t(440, 230, 'AUG', 22, GREEN, 'middle', 700, 'fi', .4)
    o += f'<path d="M210,180 C210,95 520,95 520,170 Z" fill="{LOCRE}" stroke="{TAND}" stroke-width="3"{st("pp", .7)}/>' + t(365, 140, '30S (ARNr 16S se aparea)', 18, INK, 'middle', 700, 'fi', .9)
    o += t(700, 150, 'IF1, IF2-GTP, IF3', 20, MUT, 'middle', 600, 'fi', 1.0) + t(700, 176, 'fMet-ARNt', 20, MUT, 'middle', 600, 'fi', 1.1)
    o += p('M40,290 L880,290', LINE, 2, 'dr', 1.2)
    o += t(40, 335, 'Eucariota', 24, COB, 'start', 700, 'fi', 1.3)
    o += p('M80,470 L880,470', RED, 6, 'dr', 1.4)
    o += c(70, 470, 18, COB, 'none', 0, 'pp', 1.5) + t(70, 515, 'cap', 18, COB, 'middle', 700, 'fi', 1.6)
    o += t(720, 510, 'AUG', 22, GREEN, 'middle', 700, 'fi', 1.6)
    o += r(90, 420, 110, 36, LCOB, COB, 2, 8, 'pp', 1.7) + t(145, 444, 'eIF4F', 17, COB, 'middle', 700, 'fi', 1.8)
    scan = f'<g><path d="M120,460 C120,370 340,370 340,460 Z" fill="{LOCRE}" stroke="{TAND}" stroke-width="3"/><text x="230" y="425" font-size="17" fill="{INK}" text-anchor="middle" font-weight="700">40S + Met-ARNt</text></g>'
    o += f'<g class="mv" style="--d:2s;--t:3s;--dx:480px;--dy:0px">{scan}</g>'
    o += arrow(400, 370, 620, 370, MUT, 3, 'dr', 2.0) + t(510, 355, 'barrido hasta el AUG', 18, MUT, 'middle', 600, 'fi', 2.1)
    o += t(460, 565, 'eIF2-GTP lleva el ARNt iniciador; eIF3 impide la unión prematura de la 60S', 17, INK, 'middle', 600, 'fi', 2.6)
    return svg(o, label='Inicio de la traducción en bacterias y en eucariotas')

def mini_rib(x0, d, state):
    """state: lista de (sitio, color, etiqueta) en E P A"""
    s = f'<path d="M{x0},250 C{x0},140 {x0+260},140 {x0+260},250 Z" fill="#e6ecfb" stroke="{COB}" stroke-width="3"/>'
    s += f'<path d="M{x0+10},262 C{x0+10},320 {x0+250},320 {x0+250},262 Z" fill="{LOCRE}" stroke="{TAND}" stroke-width="3"/>'
    s += f'<line x1="{x0-10}" y1="256" x2="{x0+270}" y2="256" stroke="{RED}" stroke-width="4"/>'
    for k, n in enumerate('EPA'):
        s += f'<text x="{x0+50+k*80}" y="300" font-size="17" fill="{MUT}" text-anchor="middle" font-weight="700">{n}</text>'
    for (site, col, lab) in state:
        xx = x0 + 50 + 'EPA'.index(site)*80
        s += f'<rect x="{xx-18}" y="180" width="36" height="70" rx="10" fill="{CARD}" stroke="{col}" stroke-width="3"/>'
        if lab:
            s += f'<g>' + ''.join(f'<circle cx="{xx}" cy="{168 - j*22}" r="10" fill="{GREEN}"/>' for j in range(lab)) + '</g>'
    return g(s, 'pp', d)

def F_elong():
    o = mini_rib(20, .1, [('P', COB, 3), ('A', OCRE, 1)])
    o += mini_rib(330, 1.2, [('P', COB, 0), ('A', OCRE, 4)])
    o += mini_rib(640, 2.3, [('E', MUT, 0), ('P', OCRE, 4)])
    o += arrow(290, 220, 325, 220, OCRE, 4, 'dr', 1.0) + arrow(600, 220, 635, 220, OCRE, 4, 'dr', 2.1)
    caps = [(150, ['1. Entra el aa-ARNt', 'al sitio A', 'EF-Tu-GTP / eEF1A']), (460, ['2. Enlace peptídico', 'peptidil transferasa', '(ARNr: ribozima)']), (770, ['3. Translocación', 'el ribosoma avanza 1 codón', 'EF-G-GTP / eEF2'])]
    for i, (x, ls) in enumerate(caps):
        o += tl(x, 380, ls, 19, INK, 'middle', 600, 'fi', .4 + i*1.1)
    o += carrow('M770,470 C770,560 150,560 150,470', 150, 470, -90, COB, 3, 3.2)
    o += t(460, 580, 'se repite por cada aminoácido', 19, COB, 'middle', 700, 'fi', 3.6)
    return svg(o, label='Ciclo de elongación de la traducción en tres pasos')

def F_term_trad():
    o = mini_rib(80, .1, [('P', COB, 5)])
    o += t(290, 345, 'UAA', 20, RED, 'middle', 700, 'fi', .3)
    o += mover(f'<g><rect x="272" y="180" width="36" height="70" rx="8" fill="{LRED}" stroke="{RED}" stroke-width="3"/></g>', 0, -160, .8, 1.6)
    o += t(380, 140, 'factor de liberación', 18, RED, 'start', 700, 'fi', 1.4) + t(380, 162, 'RF1/RF2 · eRF1', 17, MUT, 'start', 600, 'fi', 1.4)
    o += arrow(400, 230, 520, 230, OCRE, 4, 'dr', 1.8)
    o += p('M560,250 L880,250', RED, 4, 'dr', 2.0)
    o += f'<g class="mv1" style="--d:2.2s;--t:1.4s;--dx:0px;--dy:30px"><path d="M560,180 C560,100 820,100 820,180 Z" fill="#e6ecfb" stroke="{COB}" stroke-width="3"/></g>'
    o += f'<g class="mv1" style="--d:2.2s;--t:1.4s;--dx:0px;--dy:-30px"><path d="M570,300 C570,360 810,360 810,300 Z" fill="{LOCRE}" stroke="{TAND}" stroke-width="3"/></g>'
    o += f'<g class="mv1" style="--d:2.6s;--t:1.6s;--dx:-120px;--dy:40px">' + ''.join(f'<circle cx="{760 + j*22}" cy="{90 - j*12}" r="10" fill="{GREEN}"/>' for j in range(5)) + '</g>'
    o += t(720, 400, 'proteína liberada; subunidades se separan', 18, INK, 'middle', 700, 'fi', 3.0)
    o += r(80, 450, 760, 100, CARD, OCRE, 2.5, 14, 'pp', 3.2)
    o += tl(460, 488, ['Ningún ARNt reconoce UAA, UAG o UGA: entra un factor de liberación', 'que hace que se hidrolice el enlace con el último ARNt'], 19, INK, 'middle', 600, 'fi', 3.4)
    return svg(o, label='Terminación de la traducción con factor de liberación')

def F_euc():
    o = t(220, 40, 'Bacteria', 24, COB, 'middle', 700, 'fi', 0) + t(670, 40, 'Eucariota', 24, COB, 'middle', 700, 'fi', 0)
    o += r(30, 70, 380, 420, '#fbf6ea', COB, 3, 120, 'pp', .1)
    o += p('M70,250 C130,210 200,290 260,250 C320,210 350,280 380,250', COB, 5, 'dr', .4)
    o += p('M150,250 L150,320 C200,340 260,340 330,330', TAND, 4, 'dr', .9)
    for i, x in enumerate([200, 250, 300]):
        o += e(x, 335, 18, 12, GREEN, 'none', 0, 'pp', 1.3 + i*.2)
    o += tl(220, 420, ['transcripción y traducción', 'al mismo tiempo, en el citoplasma'], 18, INK, 'middle', 600, 'fi', 1.6)
    o += r(450, 70, 440, 420, '#fbf6ea', COB, 3, 60, 'pp', .3)
    o += c(610, 240, 130, LCOB, COB, 3, 'pp', .5) + t(610, 140, 'núcleo', 20, COB, 'middle', 700, 'fi', .6)
    o += p('M520,250 C560,220 600,280 650,250 C690,225 700,260 710,250', COB, 5, 'dr', .7)
    o += t(610, 300, 'pre-ARNm → ARNm', 18, TAND, 'middle', 700, 'fi', 1.0)
    o += t(610, 325, 'cap · splicing · poli-A', 16, MUT, 'middle', 600, 'fi', 1.1)
    o += r(728, 225, 16, 30, CREAM, COB, 2, 4, 'fi', .9)
    o += f'<g class="mv1" style="--d:1.4s;--t:1.6s;--dx:-110px;--dy:0px"><path d="M770,240 L840,240" stroke="{TAND}" stroke-width="5"/><ellipse cx="800" cy="242" rx="16" ry="11" fill="{GREEN}"/></g>'
    o += t(790, 300, 'poro nuclear', 16, MUT, 'middle', 600, 'fi', 1.2)
    o += t(800, 200, 'ribosoma', 16, GREEN, 'middle', 700, 'fi', 2.4)
    o += tl(670, 420, ['separadas en espacio y tiempo:', 'núcleo → citoplasma'], 18, INK, 'middle', 600, 'fi', 1.8)
    o += t(460, 545, 'Eucariotas: ARN pol I (ARNr), II (ARNm), III (ARNt, 5S)', 20, COB, 'middle', 700, 'fi', 2.4)
    return svg(o, label='Comparación de la expresión génica en bacteria y eucariota')

def F_proc():
    o = t(40, 50, 'pre-ARNm', 22, MUT, 'start', 700, 'fi', 0)
    seg = [(100, 260, 'E1', True), (260, 400, 'intrón', False), (400, 560, 'E2', True), (560, 680, 'intrón', False), (680, 840, 'E3', True)]
    for i, (a, b, s, ex) in enumerate(seg):
        o += r(a, 75, b - a, 44, LCOB if ex else LOCRE, COB if ex else TAND, 2, 4, 'fi', .1 + i*.1)
        o += t((a + b)/2, 104, s, 18, COB if ex else TAND, 'middle', 700, 'fi', .2 + i*.1)
    o += c(80, 97, 20, RED, 'none', 0, 'pp', 1.0) + t(80, 160, 'cap 5′ (m⁷G)', 18, RED, 'middle', 700, 'fi', 1.1)
    o += t(80, 182, 'a los 20–30 nt', 16, MUT, 'middle', 600, 'fi', 1.1)
    o += t(470, 200, 'espliceosoma: U1, U2, U4/U6, U5', 20, INK, 'middle', 700, 'fi', 1.6)
    for i, (a, b) in enumerate([(260, 400), (560, 680)]):
        m = (a + b)/2
        o += p(f'M{a},250 C{a},330 {b},330 {b},250', TAND, 6, 'dr', 1.8 + i*.3)
        o += c(m, 310, 10, 'none', TAND, 3, 'pp', 2.2 + i*.3)
    o += t(470, 360, 'los intrones salen como lazo (lariat)', 17, TAND, 'middle', 600, 'fi', 2.4)
    o += t(40, 420, 'ARNm maduro', 22, MUT, 'start', 700, 'fi', 2.6)
    mat = [(100, 260, 'E1'), (260, 420, 'E2'), (420, 580, 'E3')]
    o += c(80, 467, 20, RED, 'none', 0, 'pp', 2.7)
    for i, (a, b, s) in enumerate(mat):
        o += r(a, 445, b - a, 44, LCOB, COB, 2, 4, 'pp', 2.8 + i*.15) + t((a + b)/2, 474, s, 18, COB, 'middle', 700, 'fi', 2.9 + i*.15)
    o += r(580, 452, 260, 30, LGREEN, GREEN, 2, 15, 'gr', 3.4) + t(710, 473, 'AAAAA… (50–250)', 17, GREEN, 'middle', 700, 'fi', 3.6)
    o += t(710, 530, 'cola poli-A: CPSF y CstF cortan, la PAP añade', 16, MUT, 'middle', 600, 'fi', 3.8)
    return svg(o, label='Procesamiento del pre-ARNm: capuchón, corte y empalme y cola poli-A')

def tbl_pro_euc():
    return table(['', 'Procariota', 'Eucariota'], [
        ['Orígenes de replicación', 'Uno (oriC)', 'Muchos por cromosoma'],
        ['ARN polimerasas', 'Una, con factor σ', 'Tres (I, II, III) + factores generales'],
        ['Promotor', '−35 y −10', 'Caja TATA (−25), CAAT, GC'],
        ['Procesamiento del ARNm', 'Casi nulo', 'Cap 5′, splicing, cola poli-A'],
        ['Inicio de traducción', 'Shine-Dalgarno; fMet', 'Cap y barrido; Met'],
        ['Ribosoma', '70S (30S + 50S)', '80S (40S + 60S)'],
        ['Extremos del cromosoma', 'Circular: no hay', 'Telómeros y telomerasa'],
    ], cls='tb sm')

def F_licencia():
    steps = [('G1: ORC se une al origen', 'complejo de reconocimiento del origen'), ('Cdc6 y Cdt1 cargan la helicasa MCM', 'origen "licenciado", aún inactivo'),
             ('Fase S: CDK y DDK activan MCM', 'se abre la horquilla'), ('La licencia no se renueva hasta el siguiente G1', 'cada origen se usa una sola vez')]
    return svg(flow(steps, 60, 30, 800, 98, 40, .2), label='Licencia de los orígenes de replicación en eucariotas')

def F_activ():
    o = p('M30,520 L170,520 C260,520 220,160 420,160 C600,160 600,520 700,520 L890,520', COB, 7, 'dr', .1)
    for i, x in enumerate([60, 120]):
        o += c(x, 500, 26, LOCRE, TAND, 3, 'pp', .4 + i*.1)
        o += f'<g{st("pp", 2.4 + i*.2)}>{chip(x, 455, "Ac", GREEN, size=15, w=40)}</g>'
    o += t(90, 400, 'HAT (Gcn5) acetila', 17, GREEN, 'middle', 700, 'fi', 2.2) + t(90, 420, 'histonas: se abre', 17, GREEN, 'middle', 700, 'fi', 2.2)
    o += r(560, 318, 60, 44, LOCRE, TAND, 3, 8, 'pp', .7) + t(548, 312, 'potenciador', 17, TAND, 'end', 700, 'fi', .8)
    o += e(660, 345, 40, 30, LGREEN, GREEN, 3, 'pp', 1.2) + t(660, 300, '', 1)
    o += t(660, 395, 'activador', 17, GREEN, 'middle', 700, 'fi', 1.3)
    o += r(705, 330, 160, 70, LCOB, COB, 3, 14, 'pp', 1.6) + t(785, 372, 'Mediador', 19, COB, 'middle', 700, 'fi', 1.7)
    o += r(705, 420, 160, 90, '#c9d4fa', COB, 3, 14, 'pp', 1.9) + tl(785, 455, ['TFIID · TFIIB', 'Pol II · TFIIH'], 17, COB, 'middle', 700, 'fi', 2.0)
    o += t(785, 560, 'TATA (−25)', 17, TAND, 'middle', 700, 'fi', 2.0)
    o += t(420, 130, 'el ADN forma un bucle', 18, MUT, 'middle', 600, 'fi', 1.0)
    return svg(o, label='Activación de la transcripción eucariota: potenciador, activador, Mediador y complejo de preiniciación')

def F_ctd():
    o = t(220, 40, 'Inicio', 24, COB, 'middle', 700, 'fi', 0) + t(680, 40, 'Elongación', 24, COB, 'middle', 700, 'fi', 0)
    o += p('M460,60 L460,560', LINE, 2, 'dr', 0)
    for k, (cx, ser, lab, col, recruits, dd) in enumerate([(220, 'Ser5-P', 'Ser5', OCRE, ['enzimas del cap'], .2), (680, 'Ser2-P', 'Ser2', GREEN, ['factores de splicing', 'y de poli-A'], 1.6)]):
        o += e(cx, 170, 120, 75, LCOB, COB, 3, 'pp', dd) + t(cx, 178, 'ARN pol II', 22, COB, 'middle', 700, 'fi', dd + .1)
        path = f'M{cx},245 C{cx-40},300 {cx+40},340 {cx},390'
        o += p(path, COB, 5, 'dr', dd + .3)
        for j, yy in enumerate([270, 305, 340, 375]):
            o += c(cx + (14 if j % 2 else -14), yy, 9, col, 'none', 0, 'pp', dd + .6 + j*.12)
        o += t(cx + 70, 330, ser, 20, col if col != OCRE else TAND, 'start', 700, 'fi', dd + .8)
        o += r(cx - 140, 430, 280, 74, CARD, col, 2.5, 14, 'pp', dd + 1.0)
        o += tl(cx, 460 if len(recruits) == 1 else 458, ['recluta: ' + recruits[0]] + recruits[1:], 19, INK, 'middle', 700, 'fi', dd + 1.1)
    o += t(460, 560, 'cola CTD: repeticiones de YSPTSPS', 18, MUT, 'middle', 600, 'fi', 2.8)
    return svg(o, label='Fosforilación del dominio carboxilo terminal de la ARN polimerasa II')

def tbl_farm():
    return table(['Proceso', 'Fármaco', 'Blanco y efecto'], [
        ['Replicación', 'Quinolonas (ciprofloxacino)', 'ADN girasa y topoisomerasa IV bacterianas'],
        ['Transcripción', 'Rifampicina', 'Subunidad β de la ARN pol bacteriana'],
        ['Transcripción', 'α-amanitina (hongo <i>Amanita</i>)', 'ARN pol II: insuficiencia hepática'],
        ['Transcripción', 'Actinomicina D', 'Se intercala en el ADN y frena la elongación'],
        ['Traducción', 'Tetraciclinas · aminoglucósidos', 'Subunidad 30S'],
        ['Traducción', 'Cloranfenicol · macrólidos', 'Subunidad 50S'],
        ['Traducción', 'Puromicina', 'Imita al aa-ARNt: libera péptidos incompletos'],
    ], cls='tb sm')

def F_telo():
    o = p('M40,250 L760,250', COB, 7, 'dr', .1) + p('M40,290 L600,290', COB, 7, 'dr', .1)
    o += t(30, 230, '5′', 20, COB, 'start', 700, 'fi', .2) + t(30, 315, '3′', 20, COB, 'start', 700, 'fi', .2)
    o += t(886, 258, '3′', 20, COB, 'start', 700, 'fi', 2.0) + t(610, 318, '5′', 20, COB, 'start', 700, 'fi', .3)
    for i, x in enumerate(range(80, 740, 110)):
        o += t(x + 50, 225, 'TTAGGG', 16, MUT, 'middle', 600, 'fi', .4 + i*.08)
    o += t(680, 330, 'extremo 3′ sobresaliente', 17, MUT, 'middle', 600, 'fi', .8)
    tel = f'<g><ellipse cx="760" cy="165" rx="120" ry="58" fill="{LOCRE}" stroke="{TAND}" stroke-width="3" opacity=".92"/><text x="760" y="160" font-size="20" fill="{TAND}" text-anchor="middle" font-weight="700">telomerasa</text><rect x="680" y="258" width="200" height="24" rx="6" fill="{RED}"/><text x="780" y="276" font-size="15" fill="#fff" text-anchor="middle" font-weight="700">molde ARN 3′-AAUCCC</text></g>'
    o += g(tel, 'pp', 1.0)
    o += p('M760,250 L880,250', GREEN, 7, 'dr', 1.8)
    o += t(820, 240, '+TTAGGG', 16, GREEN, 'middle', 700, 'fi', 2.2)
    o += r(40, 400, 400, 150, CARD, MUT, 2, 14, 'pp', 2.6)
    o += tl(240, 440, ['Células somáticas: casi sin', 'telomerasa; el telómero se acorta', 'con cada división → senescencia'], 19, INK, 'middle', 600, 'fi', 2.7)
    o += r(480, 400, 400, 150, LRED, RED, 2, 14, 'pp', 3.0)
    o += tl(680, 440, ['Cáncer: la mayoría reactiva la', 'telomerasa y la célula se divide', 'sin límite'], 19, INK, 'middle', 600, 'fi', 3.1)
    return svg(o, label='Telomerasa extendiendo el extremo del cromosoma y su relación con el cáncer')

def F_talas():
    o = t(40, 50, 'Gen de β-globina', 22, COB, 'start', 700, 'fi', 0)
    def gene(y, d, mut=False):
        s = ''
        for i, (a, b, ex) in enumerate([(60, 220, 1), (220, 360, 0), (360, 520, 1), (520, 660, 0), (660, 820, 1)]):
            s += r(a, y, b - a, 40, LCOB if ex else LOCRE, COB if ex else TAND, 2, 4, 'fi', d + i*.08)
        if mut:
            s += f'<g class="pu" style="--d:{d+.8}s"><path d="M226,{y-26} L240,{y-6} L212,{y-6} Z" fill="{RED}"/></g>'
            s += t(232, y - 34, 'mutación en el sitio de corte', 17, RED, 'start', 700, 'fi', d + .8)
        return s
    o += t(40, 120, 'Normal', 20, GREEN, 'start', 700, 'fi', .1)
    o += gene(135, .2)
    o += arrow(440, 185, 440, 225, OCRE, 3, 'dr', .7)
    for i, (a, b) in enumerate([(160, 320), (320, 480), (480, 640)]):
        o += r(a, 235, b - a, 34, LCOB, COB, 2, 4, 'pp', .9 + i*.1)
    o += t(720, 258, '→ β-globina normal', 18, GREEN, 'start', 700, 'fi', 1.2)
    o += t(40, 340, 'Mutante', 20, RED, 'start', 700, 'fi', 1.5)
    o += gene(355, 1.6, True)
    o += arrow(440, 405, 440, 445, OCRE, 3, 'dr', 2.6)
    for i, (a, b, ex) in enumerate([(100, 260, 1), (260, 400, 0), (400, 560, 1), (560, 720, 1)]):
        o += r(a, 455, b - a, 34, LCOB if ex else LOCRE, COB if ex else TAND, 2, 4, 'pp', 2.8 + i*.1)
    o += tl(460, 535, ['se conserva parte del intrón → ARNm anómalo', 'menos β-globina → β-talasemia'], 19, RED, 'middle', 700, 'fi', 3.4)
    return svg(o, label='Mutación de corte y empalme en el gen de beta globina')

DECK = dict(
  page_title='Dogma central', materia='Biología Celular', title='El dogma central',
  subtitle='Replicación, transcripción y traducción en procariotas y eucariotas',
  cover_notes='Hoy explicamos el dogma central de la biología molecular: cómo la información del ADN se copia, se transcribe a ARN y se traduce a proteína. Usamos como base los resúmenes y la presentación del profesor, complementados con el Alberts.',
  index_notes='Avanzaremos en seis niveles: fundamentos, piezas, funcionamiento de cada proceso, integración comparando procariotas y eucariotas, regulación y finalmente clínica. Lo marcado "Un paso más" es profundización.',
  levels=[
    dict(name='Fundamentos', desc='Qué fluye y en qué dirección', intro='La información fluye del ADN al ARN y a la proteína, siempre con reglas de dirección.', notes='Empecemos por la idea general.', slides=[
      dict(title='El flujo de la información', tag='b', chain=2, fig=F_flujo(),
           text='<p class="lead">La información del ADN se copia, se transcribe y se traduce.</p><ul><li><b>Replicación</b>: ADN → ADN.</li><li><b>Transcripción</b>: ADN → ARN.</li><li><b>Traducción</b>: ARN → proteína.</li><li>Excepción: la <b>retrotranscripción</b> de los retrovirus.</li></ul>',
           notes='El dogma central dice que la información genética fluye del ADN al ARN y del ARN a la proteína. Antes de dividirse, la célula copia su ADN: replicación. Para usar un gen, lo copia a ARN: transcripción. Y el ribosoma lee ese ARN para hacer una proteína: traducción. Hay una excepción importante: los retrovirus como el VIH tienen transcriptasa inversa y copian ARN a ADN.'),
      dict(title='ADN y ARN no son iguales', tag='b', chain=0, fig=wrapfig(tbl_adn_arn()),
           text='<p class="lead">Un OH en el carbono 2′ cambia todo.</p><ul><li>Sin ese OH, el ADN es más estable: sirve de archivo.</li><li>El ARN es más reactivo y vive poco: sirve de mensaje.</li></ul>',
           notes='La diferencia química clave está en el azúcar. La ribosa del ARN tiene un grupo OH en el carbono 2 prima; la desoxirribosa del ADN no. Ese OH hace al ARN más reactivo e inestable, lo que conviene para un mensaje temporal. El ADN, más estable y de doble cadena, funciona como archivo. Además el ARN usa uracilo en lugar de timina.'),
      dict(title='Antiparalelas y siempre 5′ → 3′', tag='b', chain=1, fig=F_antipar(),
           text='<p class="lead">Las dos cadenas corren en sentidos opuestos.</p><ul><li>Las polimerasas solo añaden nucleótidos al <b>extremo 3′-OH</b>.</li><li>Por eso toda síntesis va de <b>5′ a 3′</b>.</li><li>Esta regla explica la hebra retrasada.</li></ul>',
           notes='Las dos cadenas del ADN son antiparalelas: una va de 5 prima a 3 prima y la otra al revés. Todas las polimerasas tienen la misma limitación: solo pueden añadir un nucleótido nuevo al grupo 3 prima OH libre de la cadena que crece. Por eso la síntesis siempre es 5 prima a 3 prima. Guarden esta regla, porque explica por qué en la replicación una hebra se hace en fragmentos.'),
    ]),
    dict(name='Piezas', desc='Genes, polimerasas y ribosomas', intro='Las piezas que participan en cada proceso.', notes='Ahora conozcamos las piezas.', slides=[
      dict(title='Anatomía de un gen', tag='b', chain=0, fig=F_gen(),
           text='<p class="lead">Un gen tiene un <b>promotor</b>, una unidad de transcripción y un <b>terminador</b>.</p><ul><li>La polimerasa lee la <b>cadena molde</b> (antisentido).</li><li>El ARN es igual a la <b>cadena codificante</b>, con U.</li></ul>',
           notes='El promotor es la secuencia donde se une la ARN polimerasa e indica dónde empezar, en la posición +1. La polimerasa lee la cadena molde, también llamada antisentido, y fabrica un ARN complementario a ella. Por eso el ARN tiene la misma secuencia que la otra cadena, la codificante o sentido, solo que con uracilo en lugar de timina. El terminador indica dónde parar.'),
      dict(title='Dos polimerasas, dos estrategias', tag='b', chain=2, fig=wrapfig(tbl_pol()),
           text='<p class="lead">La ADN polimerasa copia con precisión; la ARN polimerasa empieza sola.</p><ul><li>La ADN pol necesita un cebador.</li><li>La ARN pol no, y por eso la primasa (que es una ARN pol) hace los cebadores.</li></ul>',
           notes='Esta comparación se pregunta mucho. La ADN polimerasa no puede empezar una cadena desde cero: necesita un cebador con un extremo 3 prima OH. Además revisa su trabajo con su actividad exonucleasa 3 prima a 5 prima, por eso es muy fiel. La ARN polimerasa sí puede empezar sola y abre ella misma la doble hélice, pero corrige mucho menos. Por eso los cebadores de la replicación son de ARN: los hace la primasa, que es una ARN polimerasa.'),
      dict(title='Ribosoma y ARN de transferencia', tag='b', chain=0, fig=F_ribosoma(),
           text='<p class="lead">El ribosoma lee codones; el ARNt es el adaptador.</p><ul><li>Tres sitios: <b>A</b> (entrada), <b>P</b> (péptido) y <b>E</b> (salida).</li><li>El anticodón del ARNt reconoce el codón.</li><li>Ribosoma 70S en bacterias, 80S en eucariotas.</li></ul>',
           notes='El ribosoma tiene dos subunidades. La menor lee el ARNm; la mayor forma los enlaces peptídicos. Tiene tres sitios: A, donde entra el aminoacil ARNt; P, donde está el ARNt que sostiene la cadena; y E, por donde sale el ARNt vacío. El ARNt es el adaptador: por un lado tiene el anticodón que se aparea con el codón, y por el otro lleva el aminoácido correcto, cargado por su aminoacil ARNt sintetasa.'),
    ]),
    dict(name='Funcionamiento', desc='Los tres procesos paso a paso', intro='Cómo ocurren la replicación, la transcripción y la traducción.', notes='Pasamos a los mecanismos.', slides=[
      dict(title='La horquilla de replicación', tag='b', chain=1, fig=F_horquilla(),
           text='<p class="lead">La replicación es <b>semiconservativa</b> y bidireccional.</p><ul><li>Helicasa abre; SSB estabiliza; topoisomerasa alivia la torsión.</li><li>Primasa pone cebadores de ARN.</li><li>Hebra <b>adelantada</b> continua; <b>retrasada</b> en fragmentos de Okazaki.</li></ul><p class="note-v">Eucariota: MCM, RPA, Pol α-primasa, Pol ε y δ, PCNA.</p>',
           notes='En la horquilla, la helicasa separa las cadenas usando ATP; en bacterias es DnaB y en eucariotas MCM. Las proteínas SSB, o RPA en eucariotas, evitan que se vuelvan a unir. Delante, la topoisomerasa o girasa alivia el superenrollamiento. La primasa coloca un cebador corto de ARN. Como la polimerasa solo trabaja 5 prima a 3 prima, una hebra se sintetiza continua hacia la horquilla, la adelantada, y la otra en fragmentos alejándose de ella, la retrasada. En bacterias la polimerasa principal es Pol III; en eucariotas Pol épsilon en la adelantada y Pol delta en la retrasada, sujetas por la pinza PCNA.'),
      dict(title='Unir los fragmentos de Okazaki', tag='b', chain=1, fig=F_okazaki(),
           text='<p class="lead">Los cebadores de ARN se reemplazan por ADN y se sellan.</p><ul><li>Bacteria: la <b>Pol I</b> quita el cebador y rellena.</li><li>Eucariota: <b>RNasa H y FEN1</b> lo quitan; Pol δ rellena.</li><li>La <b>ADN ligasa</b> sella la mella.</li></ul>',
           notes='Cada fragmento de Okazaki empieza con un cebador de ARN, que hay que eliminar. En bacterias lo hace la ADN polimerasa I con su actividad exonucleasa 5 prima a 3 prima y rellena con ADN. En eucariotas lo quitan la RNasa H y la endonucleasa FEN1, y la Pol delta rellena. Queda una mella: falta un enlace fosfodiéster. La ADN ligasa, ligasa I en eucariotas, la sella.'),
      dict(title='Transcripción bacteriana: el factor σ', tag='b', chain=1, fig=F_promotor(),
           text='<p class="lead">El factor <b>σ</b> lleva a la polimerasa al promotor.</p><ul><li>Reconoce las cajas <b>−35</b> y <b>−10</b>.</li><li>Complejo cerrado → abierto: se desenrolla el ADN.</li><li>Tras iniciar, σ se libera.</li></ul>',
           notes='En bacterias hay una sola ARN polimerasa, con núcleo alfa dos, beta, beta prima y omega. Sola no reconoce promotores; necesita el factor sigma, formando la holoenzima. Sigma 70 es el general; sigma 32 se usa en choque térmico y sigma 54 en limitación de nitrógeno. Sigma reconoce las secuencias −35 y −10. Primero se forma el complejo cerrado, luego la polimerasa desenrolla unos 17 pares de bases: complejo abierto. Tras sintetizar los primeros nucleótidos, sigma se libera y comienza la elongación.'),
      dict(title='Dos formas de terminar', tag='m', chain=1, fig=F_termin(),
           text='<p class="lead">En bacterias, la transcripción termina de dos maneras.</p><ul><li><b>Intrínseca</b>: horquilla G-C seguida de U.</li><li><b>Dependiente de Rho</b>: helicasa que alcanza a la polimerasa.</li></ul>',
           notes='En la terminación intrínseca, el ARN forma una horquilla rica en G y C que frena a la polimerasa, seguida de una serie de uracilos que se aparean débilmente con adeninas del molde; el híbrido se rompe y el ARN se libera. En la dependiente de Rho, la proteína Rho se une al ARN en un sitio rico en C, se desplaza usando ATP, alcanza a la polimerasa y la separa.'),
      dict(title='Inicio de la traducción', tag='b', chain=1, fig=F_inicio(),
           text='<p class="lead">Lo difícil es encontrar el <b>AUG</b> correcto.</p><ul><li>Bacteria: la secuencia <b>Shine-Dalgarno</b> posiciona la 30S.</li><li>Eucariota: la 40S se une al <b>cap</b> y barre hasta el AUG.</li></ul>',
           notes='El ribosoma tiene que empezar en el AUG correcto para leer el marco correcto. En bacterias, el ARNr 16S de la subunidad 30S se aparea con la secuencia Shine-Dalgarno, justo antes del AUG; participan IF1, IF2 con GTP e IF3, y el primer aminoácido es formilmetionina. En eucariotas, eIF4F reconoce el capuchón 5 prima, la subunidad 40S con eIF2 y el Met-ARNt iniciador se carga y barre el ARNm hasta encontrar el AUG. eIF3 impide que la 60S se una antes de tiempo; al encontrar el AUG, eIF5 hidroliza el GTP y se une la 60S.'),
      dict(title='El ciclo de elongación', tag='b', chain=1, fig=F_elong(),
           text='<p class="lead">Tres pasos que se repiten por cada aminoácido.</p><ul><li>Entrada del aa-ARNt al sitio A.</li><li>Enlace peptídico, catalizado por el <b>ARNr</b>.</li><li><b>Translocación</b>: el ribosoma avanza un codón.</li></ul>',
           notes='Primero, el factor EF-Tu en bacterias o eEF1A en eucariotas, unido a GTP, lleva el aminoacil ARNt al sitio A. Si el anticodón es correcto, hidroliza GTP y lo suelta. Segundo, la peptidil transferasa transfiere la cadena del ARNt del sitio P al aminoácido del sitio A; esta actividad la hace el ARN ribosómico, por eso el ribosoma es una ribozima. Tercero, EF-G o eEF2 con GTP mueven el ribosoma un codón: el ARNt vacío pasa a E y el que tiene la cadena pasa a P. El sitio A queda libre para el siguiente.'),
      dict(title='Terminación de la traducción', tag='b', chain=1, fig=F_term_trad(),
           text='<p class="lead">Un codón de paro en el sitio A detiene la síntesis.</p><ul><li>UAA, UAG, UGA no tienen ARNt.</li><li>Entra un <b>factor de liberación</b>.</li><li>Se libera la proteína y se separan las subunidades.</li></ul>',
           notes='Cuando llega un codón de paro al sitio A, ningún ARNt lo reconoce. Entra un factor de liberación: RF1 o RF2 en bacterias, eRF1 en eucariotas, ayudados por RF3 o eRF3 con GTP. El factor hace que la peptidil transferasa use agua y libere la cadena. Luego el ribosoma se desarma; en bacterias con el factor de reciclaje RRF y EF-G.'),
    ]),
    dict(name='Integración', desc='Procariotas frente a eucariotas', intro='Mismos principios, organización distinta.', notes='Integremos todo comparando procariotas y eucariotas.', slides=[
      dict(title='El núcleo separa los procesos', tag='b', chain=3, fig=F_euc(),
           text='<p class="lead">En eucariotas, transcripción y traducción ocurren en lugares distintos.</p><ul><li>En bacterias son simultáneas.</li><li>El núcleo da tiempo para <b>procesar</b> el ARN.</li><li>Tres ARN polimerasas con funciones distintas.</li></ul>',
           notes='En bacterias no hay núcleo: mientras el ARNm se transcribe, los ribosomas ya lo están traduciendo. En eucariotas, la transcripción ocurre en el núcleo y la traducción en el citoplasma. Esa separación permite procesar el ARN antes de exportarlo. Además, los eucariotas tienen tres ARN polimerasas: la I hace ARN ribosomal, la II los ARN mensajeros y la III los ARNt y el ARNr 5S.'),
      dict(title='Procesamiento del ARN mensajero', tag='b', chain=1, fig=F_proc(),
           text='<p class="lead">El pre-ARNm se modifica tres veces.</p><ul><li><b>Cap 5′</b>: protege y permite la traducción.</li><li><b>Corte y empalme</b>: salen los intrones.</li><li><b>Cola poli-A</b>: estabilidad y exportación.</li></ul>',
           notes='El transcrito primario se modifica mientras se sintetiza. Cuando mide 20 a 30 nucleótidos, recibe el capuchón de 7-metilguanosina en el extremo 5 prima. El espliceosoma, formado por las ribonucleoproteínas U1, U2, U4/U6 y U5, quita los intrones, que salen en forma de lazo, y une los exones. Al final, CPSF y CstF reconocen la señal AAUAAA, cortan el ARN y la poli-A polimerasa añade entre 50 y 250 adeninas.'),
      dict(title='Procariota frente a eucariota', tag='b', chain=3, fig=wrapfig(tbl_pro_euc()),
           text='<p class="lead">Mismos principios; distinta complejidad.</p><ul><li>El genoma eucariota es lineal y mucho más grande.</li><li>Más orígenes, más polimerasas y más control.</li></ul>',
           notes='Esta tabla resume todo. El genoma bacteriano es circular, con un solo origen. El eucariota es lineal, con muchos orígenes por cromosoma y telómeros en los extremos. La transcripción eucariota usa tres polimerasas y factores generales. El ARNm eucariota se procesa y su traducción empieza en el cap, con metionina, en ribosomas 80S.'),
    ]),
    dict(name='Regulación', desc='Cuándo copiar y qué genes leer', intro='La célula controla cuándo replica y qué genes transcribe.', notes='Pasemos a la regulación.', slides=[
      dict(title='Replicar una sola vez por ciclo', tag='m', chain=2, fig=F_licencia(),
           text='<p class="lead">Los orígenes se <b>licencian</b> en G1 y se disparan en S.</p><ul><li>ORC, Cdc6 y Cdt1 cargan la helicasa MCM.</li><li>CDK y DDK la activan.</li><li>Así nada se copia dos veces.</li></ul>',
           notes='En eucariotas hay miles de orígenes y ninguno debe usarse dos veces. En G1, el complejo ORC marca el origen y, con Cdc6 y Cdt1, carga la helicasa MCM inactiva: el origen queda licenciado. En la fase S, las cinasas CDK y DDK activan la helicasa y se abre la horquilla. Mientras la actividad de CDK sea alta, no se pueden licenciar nuevos orígenes. Así cada origen se dispara una sola vez por ciclo.'),
      dict(title='Encender un gen eucariota', tag='b', chain=2, fig=F_activ(),
           text='<p class="lead">Activador, cromatina abierta y complejo de preiniciación.</p><ul><li>Las <b>HAT</b> acetilan histonas y abren la cromatina; las HDAC la cierran.</li><li>El activador en el potenciador contacta al <b>Mediador</b>.</li><li>Se ensamblan TFIID, TFIIB, Pol II, TFIIE y TFIIH.</li></ul>',
           notes='Para encender un gen eucariota, un activador se une a una secuencia potenciadora, que puede estar lejos del promotor. El activador recluta acetiltransferasas de histonas, como Gcn5, que neutralizan las cargas de las histonas y abren la cromatina; las desacetilasas como Rpd3 hacen lo contrario. El ADN forma un bucle y el activador contacta al Mediador, que ayuda a ensamblar el complejo de preiniciación en la caja TATA: TFIID primero, luego TFIIB, la Pol II con TFIIF, TFIIE y finalmente TFIIH.'),
      dict(title='El código de la cola CTD', tag='m', chain=1, fig=F_ctd(),
           text='<p class="lead">La cola de la ARN pol II cambia sus fosfatos según la etapa.</p><ul><li><b>Ser5-P</b> al inicio: recluta las enzimas del cap.</li><li><b>Ser2-P</b> en elongación: recluta splicing y poli-A.</li></ul>',
           notes='La subunidad mayor de la ARN polimerasa II tiene una cola, el dominio carboxilo terminal, formada por repeticiones del heptapéptido YSPTSPS. TFIIH fosforila la serina 5 al inicio, lo que libera a la polimerasa del promotor y recluta las enzimas del capuchón. Durante la elongación se fosforila la serina 2, que recluta factores de splicing y de poliadenilación. Así el procesamiento se acopla a la transcripción.'),
    ]),
    dict(name='Clínica', desc='Fármacos, cáncer y enfermedades', intro='Cómo se aplica el dogma central en la medicina.', notes='Finalmente, la clínica.', slides=[
      dict(title='Fármacos que bloquean el dogma', tag='b', chain=4, fig=wrapfig(tbl_farm()),
           text='<p class="lead">Muchos antibióticos atacan diferencias entre bacteria y humano.</p><ul><li>Por eso afectan a la bacteria y poco al paciente.</li><li>Ribosoma 70S frente a 80S; ARN pol con σ frente a pol II.</li></ul>',
           notes='Los antibióticos aprovechan las diferencias entre bacterias y humanos. Las quinolonas inhiben la girasa y la topoisomerasa IV. La rifampicina, usada en tuberculosis, se une a la subunidad beta de la ARN polimerasa bacteriana. Tetraciclinas y aminoglucósidos actúan sobre la subunidad 30S; cloranfenicol y macrólidos sobre la 50S. En cambio, la alfa-amanitina del hongo Amanita inhibe nuestra ARN pol II y causa daño hepático grave. La actinomicina D se intercala en el ADN y se usa en quimioterapia.'),
      dict(title='Telómeros, telomerasa y cáncer', tag='m', chain=4, fig=F_telo(),
           text='<p class="lead">El extremo del cromosoma no se copia completo.</p><ul><li>La <b>telomerasa</b> usa su propio ARN como molde.</li><li>Sin ella, los telómeros se acortan: envejecimiento celular.</li><li>Muchos cánceres la reactivan.</li></ul>',
           notes='Al quitar el último cebador de la hebra retrasada, el extremo del cromosoma queda sin copiar y se acorta con cada división. La telomerasa es una transcriptasa inversa que lleva un ARN molde y añade repeticiones TTAGGG al extremo 3 prima. Las células germinales y las madre la tienen; la mayoría de las somáticas casi no, y sus telómeros se acortan hasta la senescencia. La mayoría de los cánceres reactiva la telomerasa, lo que les permite dividirse indefinidamente.'),
      dict(title='Un error de splicing: β-talasemia', tag='m', chain=4, fig=F_talas(),
           text='<p class="lead">Una mutación en un sitio de corte altera el ARNm.</p><ul><li>El espliceosoma reconoce mal el intrón.</li><li>Se produce menos β-globina funcional.</li><li>Resultado: anemia (β-talasemia).</li></ul>',
           notes='Este ejemplo une procesamiento y clínica. En algunas beta-talasemias, una mutación cambia un sitio de corte del gen de beta-globina. El espliceosoma no reconoce bien el límite del intrón y parte de él se queda en el ARNm. Ese ARNm produce poca o ninguna beta-globina funcional, y el paciente tiene anemia. El dibujo es esquemático: hay muchas mutaciones distintas que causan beta-talasemia.'),
    ]),
  ],
  close=[
    'La información fluye <strong>ADN → ARN → proteína</strong>; los retrovirus retrotranscriben.',
    'Toda síntesis de ácidos nucleicos va de <strong>5′ a 3′</strong>.',
    'La ADN pol necesita <strong>cebador</strong>; la ARN pol no.',
    'Replicación: hebra <strong>adelantada</strong> continua y <strong>retrasada</strong> en Okazaki.',
    'En bacterias, <strong>σ</strong> reconoce −35 y −10.',
    'El ribosoma tiene sitios <strong>A, P y E</strong>; el ARNr forma el enlace peptídico.',
    'El ARNm eucariota recibe <strong>cap, splicing y poli-A</strong>.',
    'Activadores, <strong>Mediador</strong> y acetilación encienden genes eucariotas.',
    'Antibióticos aprovechan las diferencias <strong>70S/80S</strong> y de polimerasas.',
    'La <strong>telomerasa</strong> protege los extremos; el cáncer la reactiva.',
  ],
  close_notes='Estos son los diez conceptos para llevarse. La regla 5 prima a 3 prima y la diferencia entre procariotas y eucariotas explican casi todo el tema. Gracias.',
)
