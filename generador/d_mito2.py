from sv import *
from notes import N
from d_mito import (F_para_que, F_atp, F_endo, F_estructura, tbl_membranas, F_matriz, F_adnmt, F_cadena, F_gradiente, F_sintasa,
                    F_transport, F_import, F_control, F_ucp1, F_apopt, tbl_inhib, F_mat_herencia, wrapfig)
import math

NADH_C, FAD_C, ATP_C = COB, TAND, GREEN

def pill(x, y, s, fill, size=17, w=None, col='#fff'):
    w = w or (len(s) * size * .58 + 26)
    return f'<g><rect x="{x - w/2:.0f}" y="{y - size:.0f}" width="{w:.0f}" height="{size*1.9:.0f}" rx="{size*.95:.0f}" fill="{fill}"/><text x="{x}" y="{y + size*.38:.0f}" font-size="{size}" fill="{col}" text-anchor="middle" font-weight="700">{s}</text></g>'

def tally(x, y, items, d):
    """items: [(texto, color)] en fila"""
    o = ''
    cx = x
    for i, (s, col) in enumerate(items):
        w = len(s) * 17 * .58 + 26
        o += f'<g{st("pp", d + i*.15)}>{pill(cx + w/2, y, s, col, 17, w)}</g>'
        cx += w + 10
    return o

def F_panorama2():
    o = r(10, 10, 900, 150, '#efe8d8', 'none', 0, 16, 'fi', 0) + t(26, 40, 'CITOSOL', 18, MUT, 'start', 700, 'fi', .1)
    o += r(10, 170, 900, 410, '#f7ebcd', 'none', 0, 16, 'fi', .1) + t(26, 200, 'MITOCONDRIA', 18, TAND, 'start', 700, 'fi', .2)
    o += box(40, 60, 170, 64, 'Glucosa', None, CARD, COB, INK, .3, 23)
    o += arrow(215, 92, 300, 92, OCRE, 4, 'dr', .6) + t(258, 80, 'glucólisis', 15, MUT, 'middle', 600, 'fi', .6)
    o += box(305, 60, 190, 64, '2 piruvato', None, CARD, COB, INK, .8, 23)
    o += tally(515, 92, [('+2 ATP', ATP_C), ('+2 NADH', NADH_C)], 1.0)
    o += arrow(400, 128, 400, 228, OCRE, 4, 'dr', 1.3) + t(412, 190, 'PDH', 15, MUT, 'start', 700, 'fi', 1.3)
    o += box(300, 232, 200, 64, '2 acetil-CoA', None, CARD, COB, INK, 1.5, 22)
    o += tally(515, 264, [('+2 NADH', NADH_C), ('2 CO₂', MUT)], 1.7)
    o += arrow(400, 300, 400, 340, OCRE, 4, 'dr', 2.0)
    o += box(270, 344, 260, 64, 'Krebs (2 vueltas)', None, CARD, COB, INK, 2.1, 22)
    o += tally(545, 376, [('+6 NADH', NADH_C), ('+2 FADH₂', FAD_C), ('+2 GTP', ATP_C)], 2.3)
    o += arrow(400, 412, 400, 452, OCRE, 4, 'dr', 2.7)
    o += box(220, 456, 360, 64, 'Cadena + ATP sintasa', None, CARD, COB, INK, 2.8, 22)
    o += t(400, 548, '10 NADH × 2.5 + 2 FADH₂ × 1.5', 16, MUT, 'middle', 700, 'fi', 3.0)
    o += f'<g{st("pp", 3.3)}>{pill(740, 488, "≈ 30–32 ATP", ATP_C, 22, 220)}</g>'
    o += t(740, 548, 'total por glucosa', 16, GREEN, 'middle', 700, 'fi', 3.4)
    return svg(o, label='Panorama de la respiración con el conteo de NADH, FADH2 y ATP de cada etapa')

def F_gluco():
    o = box(330, 20, 260, 64, 'Glucosa (6 C)', None, CARD, COB, INK, .1, 23)
    o += arrow(460, 88, 460, 140, OCRE, 4, 'dr', .4)
    o += r(250, 145, 420, 92, LRED, RED, 2.5, 14, 'pp', .5) + t(460, 180, 'Fase de inversión', 21, RED, 'middle', 700, 'fi', .6) + t(460, 212, 'se gastan 2 ATP', 18, INK, 'middle', 600, 'fi', .6)
    o += f'<g{st("pp", .8)}>{pill(760, 191, "−2 ATP", RED, 20, 120)}</g>'
    o += arrow(460, 241, 460, 290, OCRE, 4, 'dr', 1.0)
    o += r(250, 295, 420, 110, LGREEN, GREEN, 2.5, 14, 'pp', 1.2) + t(460, 330, 'Fase de beneficio', 21, GREEN, 'middle', 700, 'fi', 1.3) + t(460, 360, '2 gliceraldehído-3-P → 2 piruvato', 18, INK, 'middle', 600, 'fi', 1.3) + t(460, 388, '(se hace dos veces)', 15, MUT, 'middle', 600, 'fi', 1.3)
    o += f'<g{st("pp", 1.5)}>{pill(760, 330, "+4 ATP", ATP_C, 20, 120)}</g>' + f'<g{st("pp", 1.7)}>{pill(760, 380, "+2 NADH", NADH_C, 20, 130)}</g>'
    o += arrow(460, 409, 460, 455, OCRE, 4, 'dr', 1.9)
    o += box(330, 460, 260, 60, '2 piruvato (3 C)', None, CARD, COB, INK, 2.0, 22)
    o += r(40, 145, 180, 375, CARD, OCRE, 2.5, 14, 'pp', 2.3)
    o += t(130, 185, 'Balance neto', 19, TAND, 'middle', 700, 'fi', 2.4)
    o += counter(130, 265, 2, 52, ATP_C, 'middle', 2.5) + t(130, 295, 'ATP', 20, ATP_C, 'middle', 700, 'fi', 2.5)
    o += counter(130, 380, 2, 52, NADH_C, 'middle', 2.8) + t(130, 410, 'NADH', 20, NADH_C, 'middle', 700, 'fi', 2.8)
    o += t(130, 480, 'sin O₂', 16, MUT, 'middle', 600, 'fi', 3.0)
    o += t(460, 565, 'ocurre en el citosol · 10 reacciones · no necesita oxígeno', 18, MUT, 'middle', 700, 'fi', 3.0)
    return svg(o, label='Glucólisis con su balance de ATP y NADH')

def F_pdh():
    o = t(30, 40, 'CITOSOL', 18, MUT, 'start', 700, 'fi', 0)
    o += r(20, 150, 880, 30, '#f1dca8', TAND, 3, 8, 'fi', .1) + t(890, 142, 'membranas mitocondriales', 16, TAND, 'end', 700, 'fi', .1)
    o += t(30, 230, 'MATRIZ', 18, MUT, 'start', 700, 'fi', .1)
    o += box(330, 60, 260, 60, 'Piruvato (3 C)', None, CARD, COB, INK, .2, 22)
    o += r(430, 140, 60, 50, LCOB, COB, 2.5, 10, 'pp', .4) + t(500, 172, 'transportador (con H⁺)', 15, COB, 'start', 700, 'fi', .5)
    o += arrow(460, 192, 460, 240, OCRE, 4, 'dr', .7)
    o += e(460, 290, 200, 46, LOCRE, TAND, 3, 'pp', .9) + t(460, 297, 'Piruvato deshidrogenasa (PDH)', 19, TAND, 'middle', 700, 'fi', 1.0)
    o += arrow(460, 338, 460, 385, OCRE, 4, 'dr', 1.2)
    o += box(330, 390, 260, 60, 'Acetil-CoA (2 C)', None, CARD, COB, INK, 1.4, 22)
    o += f'<g{st("pp", 1.6)}>{pill(740, 270, "+1 NADH", NADH_C, 20, 140)}</g>' + f'<g{st("pp", 1.8)}>{pill(740, 320, "+1 CO₂", MUT, 20, 120)}</g>'
    o += t(740, 230, 'por cada piruvato', 16, MUT, 'middle', 700, 'fi', 1.6)
    o += r(40, 480, 840, 90, CARD, OCRE, 2.5, 14, 'pp', 2.1)
    o += t(460, 515, 'Por glucosa (2 piruvatos):', 19, INK, 'middle', 700, 'fi', 2.2)
    o += tally(250, 548, [('2 acetil-CoA', COB), ('+2 NADH', NADH_C), ('2 CO₂', MUT), ('0 ATP', ATP_C)], 2.3)
    return svg(o, label='Piruvato deshidrogenasa con su balance por glucosa')

def F_krebs2():
    cx, cy, R = 220, 330, 140
    o = f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="none" stroke="{COB}" stroke-width="6" pathLength="1"{st("dr", .2)}/>'
    names = ['citrato', 'isocitrato', 'α-cetoglutarato', 'succinil-CoA', 'succinato', 'fumarato', 'malato', 'oxalacetato']
    outs = {1: ('NADH + CO₂', NADH_C), 2: ('NADH + CO₂', NADH_C), 3: ('GTP', ATP_C), 4: ('FADH₂', FAD_C), 6: ('NADH', NADH_C)}
    for i, n in enumerate(names):
        a = math.radians(-90 + 45*i + 22.5)
        x, y = cx + R*math.cos(a), cy + R*math.sin(a)
        o += c(x, y, 8, OCRE, 'none', 0, 'pp', .5 + i*.12)
        lx, ly = cx + (R + 20)*math.cos(a), cy + (R + 20)*math.sin(a)
        anc = 'start' if math.cos(a) > .25 else ('end' if math.cos(a) < -.25 else 'middle')
        o += t(lx, ly + 6 + (10 if math.sin(a) > .8 else (-4 if math.sin(a) < -.8 else 0)), n, 16, INK, anc, 600, 'fi', .6 + i*.12)
    o += f'<g class="sp" style="--d:1.6s;--t:6s;transform-origin:{cx}px {cy}px"><circle cx="{cx}" cy="{cy-R}" r="11" fill="{COB}"/></g>'
    o += r(120, 20, 260, 66, CARD, COB, 2.5, 14, 'pp', 0) + t(250, 50, 'Acetil-CoA (2 C)', 20, INK, 'middle', 700, 'fi', .1) + t(250, 74, '+ oxalacetato (4 C) → citrato', 15, MUT, 'middle', 500, 'fi', .2)
    o += arrow(250, 90, 250, 168, OCRE, 4, 'dr', .3)
    o += t(cx, cy - 6, 'por vuelta:', 17, MUT, 'middle', 600, 'fi', 1.2)
    o += t(cx, cy + 20, '3 NADH · 1 FADH₂', 17, INK, 'middle', 700, 'fi', 1.3) + t(cx, cy + 42, '1 GTP · 2 CO₂', 17, INK, 'middle', 700, 'fi', 1.4)
    o += r(500, 30, 400, 540, CARD, LINE, 2, 16, 'fi', 1.5)
    o += t(630, 72, 'por vuelta', 18, MUT, 'middle', 700, 'fi', 1.6) + t(800, 72, 'por glucosa (×2)', 18, COB, 'middle', 700, 'fi', 1.6)
    rows = [('NADH', 3, 6, NADH_C), ('FADH₂', 1, 2, FAD_C), ('GTP ≈ ATP', 1, 2, ATP_C), ('CO₂', 2, 4, MUT)]
    for i, (n, a1, a2, col) in enumerate(rows):
        y = 150 + i*100
        o += t(520, y - 26, n, 20, col, 'start', 700, 'fi', 1.8 + i*.3)
        o += counter(630, y + 22, a1, 44, col, 'middle', 1.9 + i*.3) + counter(800, y + 22, a2, 50, col, 'middle', 2.1 + i*.3)
        o += p(f'M520,{y + 40} L880,{y + 40}', LINE, 1.5, 'dr', 1.9 + i*.3)
    o += t(700, 555, 'el oxalacetato se regenera', 16, MUT, 'middle', 600, 'fi', 3.2)
    return svg(o, label='Ciclo de Krebs con su producción por vuelta y por glucosa')

def F_po():
    o = t(30, 40, 'Protones bombeados por par de electrones', 20, INK, 'start', 700, 'fi', 0)
    rows = [('NADH', NADH_C, [('I', 4), ('III', 4), ('IV', 2)], 10, '2.5'), ('FADH₂', FAD_C, [('II', 0), ('III', 4), ('IV', 2)], 6, '1.5')]
    for k, (n, col, comps, tot, atp) in enumerate(rows):
        y = 100 + k*170
        d = .2 + k*1.4
        o += f'<g{st("pp", d)}>{pill(80, y + 30, n, col, 20, 110)}</g>'
        x = 160
        for j, (cn, h) in enumerate(comps):
            o += r(x, y, 120, 60, LCOB if h else '#eee', COB if h else MUT, 2, 10, 'pp', d + .2 + j*.15) + t(x + 60, y + 38, f'{cn}: {h} H⁺', 18, COB if h else MUT, 'middle', 700, 'fi', d + .3 + j*.15)
            x += 135
        o += t(x + 10, y + 38, '=', 26, INK, 'start', 700, 'fi', d + .8)
        o += counter(x + 80, y + 42, tot, 40, RED, 'middle', d + .9, 0, ' H⁺')
        o += t(x + 80, y + 90, f'entre 4 H⁺ por ATP ≈ {atp} ATP', 17, GREEN, 'start' if False else 'middle', 700, 'fi', d + 1.1)
    o += r(40, 430, 840, 140, CARD, OCRE, 2.5, 14, 'pp', 3.2)
    o += tl(460, 465, ['La ATP sintasa necesita ≈3 H⁺ por ATP, y ≈1 H⁺ más se gasta en meter', 'el fosfato y sacar el ATP: ≈4 H⁺ por cada ATP que llega al citosol.', 'El FADH₂ entra por el complejo II, que no bombea: por eso rinde menos.'], 18, INK, 'middle', 600, 'fi', 3.4)
    return svg(o, label='Cálculo del ATP que rinde cada NADH y cada FADH2')

def tbl_balance():
    return table(['Etapa', 'NADH', 'FADH₂', 'ATP/GTP', 'ATP final*'], [
        ['Glucólisis (citosol)', '2', '0', '2', '2 + (3 a 5)'],
        ['PDH (matriz)', '2', '0', '0', '5'],
        ['Krebs ×2 (matriz)', '6', '2', '2', '20'],
        ['<b>Total</b>', '<b>10</b>', '<b>2</b>', '<b>4</b>', '<b>≈30–32</b>'],
    ], cls='tb sm')

def F_balance():
    o = f'<foreignObject x="0" y="0" width="920" height="280"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:DM Sans,Inter,sans-serif;font-size:19px" class="bal">{tbl_balance()}</div></foreignObject>'
    o += t(40, 315, 'Cómo se llega al total', 20, INK, 'start', 700, 'fi', 1.0)
    segs = [('4 directos', 4, ATP_C), ('8 NADH (PDH + Krebs) × 2.5 = 20', 20, NADH_C), ('2 FADH₂ × 1.5 = 3', 3, FAD_C), ('2 NADH de glucólisis = 3 a 5', 5, '#7f93e6')]
    x = 40
    scale = 26
    for i, (s, v, col) in enumerate(segs):
        w = v*scale
        o += r(x, 330, w, 46, col, 'none', 0, 4, 'gr', 1.2 + i*.4)
        o += t(x + w/2, 400 + (i % 2)*24, s, 15, col if col != '#7f93e6' else COB, 'middle', 700, 'fi', 1.4 + i*.4)
        x += w + 4
    o += f'<g{st("pp", 3.0)}>{pill(460, 500, "≈ 30–32 ATP por glucosa", ATP_C, 24, 380)}</g>'
    o += t(460, 560, '*Con 2.5 ATP por NADH y 1.5 por FADH₂; depende de la lanzadera del NADH citosólico', 15, MUT, 'middle', 600, 'fi', 3.2, True)
    return svg(o, label='Balance total de NADH, FADH2 y ATP por glucosa')

def F_rend2():
    o = p('M120,500 L860,500', INK, 3, 'dr', 0) + p('M120,500 L120,60', INK, 3, 'dr', 0)
    o += r(220, 500 - 2*12, 180, 2*12, OCRE, 'none', 0, 4, 'gy', .4)
    o += counter(310, 460, 2, 46, TAND, 'middle', .5)
    o += tl(310, 540, ['solo glucólisis', '(sin O₂)'], 22, INK, 'middle', 700, 'fi', .5)
    o += r(560, 500 - 32*13, 180, 32*13, GREEN, 'none', 0, 4, 'gy', 1.0)
    o += r(560, 500 - 30*13, 180, 2, '#fff', 'none', 0, 0, 'fi', 1.6)
    o += t(650, 70, '30–32', 50, GREEN, 'middle', 700, 'fi', 1.1)
    o += tl(650, 540, ['oxidación completa', '(con O₂)'], 22, INK, 'middle', 700, 'fi', 1.1)
    o += t(130, 40, 'ATP por glucosa', 22, MUT, 'start', 700, 'fi', 0)
    return svg(o, label='ATP por glucosa con y sin mitocondria')

DECK = dict(
  page_title='Mitocondria', materia='Biología Celular', title='La mitocondria',
  subtitle='Estructura, respiración celular y producción de ATP, desde las piezas hasta la clínica',
  cover_notes=N('Esta presentación explica la mitocondria: qué es, cómo está construida, cómo produce ATP y qué pasa cuando falla.', None, ['Fuente principal: Alberts, capítulo "Conversión de energía: mitocondrias y cloroplastos".', 'Colores del conteo: azul = NADH · ocre = FADH₂ · verde = ATP/GTP.']),
  index_notes=N('Seis niveles: fundamentos, piezas, funcionamiento (con la cuenta de NADH, FADH₂ y ATP en cada etapa), integración, regulación y clínica.', None, ['"Básico" = imprescindible. "Un paso más" = profundización.']),
  levels=[
    dict(name='Fundamentos', desc='Para qué existe y de dónde viene', intro='Qué problema resuelve la mitocondria y de dónde viene.', notes=N('Empezamos por la pregunta más simple: para qué necesita la célula una mitocondria.'), slides=[
      dict(title='La central de energía de la célula', tag='b', chain=2, fig=F_para_que(),
           text='<p class="lead">La mitocondria convierte la energía de los alimentos en <b>ATP</b>.</p><ul><li>Entran glucosa, ácidos grasos y O₂.</li><li>Salen ATP, CO₂ y agua.</li><li>Más gasto de energía = más mitocondrias.</li></ul>',
           notes=N('La mitocondria es el organelo donde se oxida por completo el combustible (glucosa y grasas) usando oxígeno. La energía liberada se guarda en ATP.',
                   ['El combustible llega como piruvato (de la glucosa) o como ácidos grasos.', 'Dentro, se oxida a CO₂; los electrones se cargan en NADH y FADH₂.', 'Esos electrones terminan en el O₂ formando agua, y la energía liberada se usa para hacer ATP.'],
                   ['Reacción global: glucosa + 6 O₂ → 6 CO₂ + 6 H₂O + energía (≈30–32 ATP).', 'Tejidos con mucha demanda (corazón, músculo, neuronas) tienen muchas mitocondrias.'],
                   ['Qué entra y qué sale de la mitocondria.'])),
      dict(title='El ATP: la moneda de energía', tag='b', chain=0, fig=F_atp(),
           text='<p class="lead">Adenina, ribosa y <b>tres fosfatos</b>.</p><ul><li>El enlace entre β y γ guarda mucha energía.</li><li>ATP + H₂O → ADP + Pᵢ + energía.</li><li>La mitocondria vuelve a unir ADP + Pᵢ.</li></ul>',
           notes=N('El ATP es un nucleótido que sirve como moneda de energía: se gasta y se recarga continuamente.',
                   ['Estructura: adenina + ribosa + tres fosfatos (α, β, γ).', 'Al hidrolizar el último fosfato (ATP + H₂O → ADP + Pᵢ) se libera energía que paga contracción, transporte activo y síntesis.', 'La mitocondria recicla el ADP: le vuelve a unir el fosfato (fosforilación oxidativa).'],
                   None, ['Por qué el ATP es "moneda" y no "almacén".'])),
      dict(title='Una bacteria que se quedó a vivir', tag='b', chain=0, fig=F_endo(),
           text='<p class="lead"><b>Teoría endosimbiótica</b>: desciende de una bacteria aerobia.</p><ul><li><b>Doble membrana</b>.</li><li>ADN circular propio.</li><li>Ribosomas parecidos a los bacterianos.</li></ul>',
           notes=N('La explicación aceptada del origen de la mitocondria es la endosimbiosis: una célula ancestral engulló a una bacteria capaz de usar oxígeno y ambas se asociaron.',
                   ['1) Célula ancestral. 2) Engulle a una bacteria aerobia, que queda rodeada por una membrana extra. 3) La bacteria evoluciona a mitocondria.'],
                   ['Pruebas: doble membrana, ADN circular propio, ribosomas tipo bacteriano y división por fisión.'], ['Tres pruebas de la endosimbiosis.'],
                   clinica='Algunos antibióticos que atacan ribosomas bacterianos pueden afectar también a las mitocondrias (Alberts).')),
    ]),
    dict(name='Piezas', desc='Membranas, matriz y ADN propio', intro='Cada compartimento de la mitocondria tiene una tarea distinta.', notes=N('Ahora desarmamos la mitocondria en sus piezas.'), slides=[
      dict(title='Cuatro compartimentos', tag='b', chain=0, fig=F_estructura(),
           text='<p class="lead">Dos membranas delimitan dos espacios.</p><ul><li><b>Membrana externa</b> y <b>espacio intermembrana</b>.</li><li><b>Membrana interna</b> con <b>crestas</b>.</li><li><b>Matriz</b> con ADN y ribosomas.</li></ul>',
           notes=N('La mitocondria tiene cuatro compartimentos y cada uno cumple una tarea.',
                   ['Membrana externa: envuelve al organelo.', 'Espacio intermembrana: entre ambas membranas; aquí se acumulan los H⁺ bombeados.', 'Membrana interna: plegada en crestas; contiene la cadena respiratoria y la ATP sintasa.', 'Matriz: enzimas del ciclo de Krebs y de la β-oxidación, ADN mitocondrial y ribosomas.'],
                   ['Más crestas = más superficie = más capacidad de producir ATP (por eso el músculo cardíaco tiene muchas).'], ['Ubica cada proceso en su compartimento.'])),
      dict(title='Dos membranas muy distintas', tag='b', chain=2, fig=wrapfig(tbl_membranas()),
           text='<p class="lead">La externa es un colador; la interna, una barrera.</p><ul><li>La impermeabilidad de la interna permite acumular H⁺.</li><li>Sin ella no habría gradiente ni ATP.</li></ul>',
           notes=N('Las dos membranas son químicamente y funcionalmente distintas.',
                   ['Externa: tiene porinas que dejan pasar moléculas pequeñas; el espacio intermembrana se parece al citosol en moléculas pequeñas.', 'Interna: muy impermeable; tiene cardiolipina y casi todo cruza por transportadores específicos.'],
                   None, ['Por qué la impermeabilidad de la membrana interna es indispensable.'])),
      dict(title='La matriz: el taller metabólico', tag='b', chain=2, fig=F_matriz(),
           text='<p class="lead">En la matriz se oxida el combustible.</p><ul><li>PDH y <b>ciclo de Krebs</b>.</li><li><b>β-oxidación</b>.</li><li>ADN, ribosomas y ARNt propios.</li></ul>',
           notes=N('La matriz es un compartimento muy concentrado en enzimas.', ['El piruvato se convierte en acetil-CoA (PDH).', 'Gira el ciclo de Krebs.', 'Se oxidan los ácidos grasos (β-oxidación), que también producen NADH, FADH₂ y acetil-CoA.'], None, ['Procesos de la matriz.'])),
      dict(title='El ADN mitocondrial', tag='m', chain=0, fig=F_adnmt(),
           text='<p class="lead">Pequeño, circular y <b>heredado de la madre</b>.</p><ul><li>13 proteínas de la cadena respiratoria.</li><li>El resto viene del núcleo.</li></ul>',
           notes=N('El ADN mitocondrial humano es un genoma pequeño y circular.',
                   None, ['16 569 pares de bases y 37 genes: 13 proteínas (de la cadena respiratoria y la ATP sintasa), 22 ARNt y 2 ARNr.', 'Más del 99 % de las proteínas mitocondriales se codifican en el núcleo y se importan.', 'Se hereda casi exclusivamente de la madre.', 'La cinta de colores del dibujo es ilustrativa, no un mapa de genes.'],
                   ['Números: 16 569 pb · 37 genes · 13 / 22 / 2.'])),
    ]),
    dict(name='Funcionamiento', desc='Del combustible al ATP, con la cuenta', intro='La respiración paso a paso, contando NADH, FADH₂ y ATP en cada etapa.', notes=N('Este es el corazón del tema. En cada etapa vamos a contar cuánto NADH, FADH₂ y ATP se produce por cada glucosa.'), slides=[
      dict(title='El camino completo, con la cuenta', tag='b', chain=1, fig=F_panorama2(),
           text='<p class="lead">Cada etapa deja NADH, FADH₂ o ATP.</p><ul><li>Glucólisis: <b>2 ATP + 2 NADH</b>.</li><li>PDH: <b>2 NADH</b>.</li><li>Krebs: <b>6 NADH + 2 FADH₂ + 2 GTP</b>.</li><li>Cadena: todo eso → <b>≈30–32 ATP</b>.</li></ul>',
           notes=N('Este mapa resume toda la respiración de una glucosa. Las siguientes diapositivas son el zoom de cada etapa.',
                   ['<b>Glucólisis</b> (citosol): glucosa → 2 piruvato; neto 2 ATP y 2 NADH.', '<b>PDH</b> (matriz): 2 piruvato → 2 acetil-CoA; 2 NADH y 2 CO₂.', '<b>Krebs</b> (2 vueltas): 6 NADH, 2 FADH₂, 2 GTP y 4 CO₂.', '<b>Cadena + ATP sintasa</b>: 10 NADH × 2.5 + 2 FADH₂ × 1.5 ≈ 28 ATP (26 a 28 según la lanzadera), más los 4 directos.'],
                   None, ['Total por glucosa: 10 NADH, 2 FADH₂, 4 ATP/GTP directos → ≈30–32 ATP.'],
                   tabla=(['Etapa', 'NADH', 'FADH₂', 'ATP/GTP', 'CO₂'], [['Glucólisis', '2', '0', '2', '0'], ['PDH', '2', '0', '0', '2'], ['Krebs', '6', '2', '2', '4'], ['<b>Total</b>', '<b>10</b>', '<b>2</b>', '<b>4</b>', '<b>6</b>']]))),
      dict(title='Glucólisis: el primer paso', tag='b', chain=1, fig=F_gluco(),
           text='<p class="lead">En el citosol, sin oxígeno.</p><ul><li>Se invierten <b>2 ATP</b> y se ganan <b>4 ATP</b>.</li><li>Neto: <b>2 ATP + 2 NADH</b> y 2 piruvato.</li></ul>',
           notes=N('La glucólisis rompe la glucosa (6 C) en dos piruvatos (3 C). No ocurre en la mitocondria, pero prepara su combustible.',
                   ['<b>Fase de inversión</b>: se gastan 2 ATP para fosforilar la glucosa y partirla en dos moléculas de 3 C (gliceraldehído-3-fosfato).', '<b>Fase de beneficio</b>: cada gliceraldehído-3-P produce 2 ATP y 1 NADH. Como son dos: 4 ATP y 2 NADH.', 'Balance: 4 − 2 = <b>2 ATP netos</b> y <b>2 NADH</b>.'],
                   ['El ATP de la glucólisis se forma por fosforilación a nivel de sustrato (sin cadena respiratoria).', 'El NADH citosólico no cruza la membrana interna: sus electrones entran por lanzaderas (malato-aspartato ≈2.5 ATP cada uno; glicerol-3-fosfato ≈1.5).'],
                   ['Neto de la glucólisis: 2 ATP + 2 NADH + 2 piruvato.'],
                   clinica='Sin oxígeno, el piruvato se convierte en lactato para regenerar NAD⁺: es la base de la acidosis láctica en la hipoxia.')),
      dict(title='Del piruvato al acetil-CoA', tag='b', chain=1, fig=F_pdh(),
           text='<p class="lead">La <b>piruvato deshidrogenasa</b> une la glucólisis con Krebs.</p><ul><li>Por piruvato: 1 NADH + 1 CO₂.</li><li>Por glucosa: <b>2 NADH</b> y 2 CO₂.</li></ul>',
           notes=N('El piruvato entra a la matriz y la PDH lo convierte en acetil-CoA, la molécula que alimenta el ciclo de Krebs.',
                   ['El piruvato cruza la membrana interna por un transportador acoplado a H⁺.', 'La PDH le quita un carbono como CO₂ (descarboxilación oxidativa) y carga los electrones en NADH.', 'El grupo acetilo (2 C) queda unido a la coenzima A: acetil-CoA.'],
                   ['Por glucosa: 2 acetil-CoA, 2 NADH, 2 CO₂, 0 ATP.'], ['La PDH no produce ATP directo, solo NADH.'])),
      dict(title='Ciclo de Krebs: la cuenta', tag='b', chain=1, fig=F_krebs2(),
           text='<p class="lead">Una vuelta por cada acetil-CoA; dos por glucosa.</p><ul><li>Por vuelta: <b>3 NADH, 1 FADH₂, 1 GTP</b>, 2 CO₂.</li><li>Por glucosa: <b>6 NADH, 2 FADH₂, 2 GTP</b>, 4 CO₂.</li></ul>',
           notes=N('El acetil-CoA (2 C) se une al oxalacetato (4 C) y forma citrato (6 C). En una vuelta se pierden 2 CO₂ y se regenera el oxalacetato.',
                   ['Isocitrato → α-cetoglutarato: <b>NADH + CO₂</b>.', 'α-cetoglutarato → succinil-CoA: <b>NADH + CO₂</b>.', 'Succinil-CoA → succinato: <b>GTP</b> (≈ATP).', 'Succinato → fumarato (succinato deshidrogenasa = complejo II): <b>FADH₂</b>.', 'Malato → oxalacetato: <b>NADH</b>.'],
                   ['Como cada glucosa da 2 acetil-CoA, el ciclo gira 2 veces: se duplica todo.'], ['Por glucosa: 6 NADH, 2 FADH₂, 2 GTP, 4 CO₂.'])),
      dict(title='La cadena de transporte de electrones', tag='b', chain=1, fig=F_cadena(),
           text='<p class="lead">Los electrones bajan por cuatro complejos hasta el <b>O₂</b>.</p><ul><li>NADH entra por I; FADH₂ por II.</li><li>I, III y IV <b>bombean H⁺</b>.</li></ul>',
           notes=N('En la membrana interna, los electrones del NADH y del FADH₂ pasan por una serie de complejos hasta el oxígeno.',
                   ['NADH entrega electrones al <b>complejo I</b>; FADH₂ (desde la succinato deshidrogenasa) al <b>complejo II</b>.', 'La <b>ubiquinona (Q)</b> lleva los electrones al complejo III.', 'El <b>citocromo c</b> los lleva al complejo IV, donde el O₂ los recibe y forma H₂O.', 'Los complejos I, III y IV usan esa energía para bombear H⁺ al espacio intermembrana; el II no bombea.'],
                   ['Por par de electrones: NADH bombea ≈10 H⁺ (I: 4, III: 4, IV: 2); FADH₂ ≈6 H⁺ (III: 4, IV: 2).'], ['Orden: I/II → Q → III → citocromo c → IV → O₂.'])),
      dict(title='Un gradiente de protones', tag='b', chain=2, fig=F_gradiente(),
           text='<p class="lead">El bombeo crea una batería en la membrana interna.</p><ul><li>Diferencia de <b>pH</b>.</li><li>Diferencia de <b>voltaje</b>.</li><li>= <b>fuerza protón-motriz</b>.</li></ul>',
           notes=N('Al acumular H⁺ en el espacio intermembrana se forma un gradiente electroquímico.', ['Diferencia química: más H⁺ afuera (ΔpH).', 'Diferencia eléctrica: afuera positivo, matriz negativa.', 'Juntas forman la fuerza protón-motriz: los H⁺ "quieren" volver a la matriz.'], None, ['Dos componentes del gradiente.'])),
      dict(title='La ATP sintasa, un motor rotatorio', tag='b', chain=1, fig=F_sintasa(),
           text='<p class="lead">Los H⁺ regresan por la ATP sintasa y la hacen girar.</p><ul><li><b>F₀</b>: rotor en la membrana.</li><li><b>F₁</b>: une ADP + Pᵢ.</li><li><b>Fosforilación oxidativa</b>.</li></ul>',
           notes=N('Los H⁺ solo pueden regresar a la matriz a través de la ATP sintasa; ese flujo la hace girar.',
                   ['Los H⁺ pasan por F₀ (anillo c en la membrana) y lo hacen girar.', 'El giro cambia la forma de las subunidades de F₁ (en la matriz), que unen ADP + Pᵢ → ATP.', 'Cada vuelta completa produce 3 ATP.'],
                   ['Teoría quimiosmótica (Mitchell): el gradiente es el intermediario entre la cadena y la síntesis de ATP.'], ['F₀ = rotor/canal; F₁ = síntesis.'])),
      dict(title='¿Cuánto ATP da cada NADH y FADH₂?', tag='m', chain=3, fig=F_po(),
           text='<p class="lead">Se cuenta en protones.</p><ul><li>NADH: 10 H⁺ → <b>≈2.5 ATP</b>.</li><li>FADH₂: 6 H⁺ → <b>≈1.5 ATP</b>.</li><li>≈4 H⁺ por cada ATP.</li></ul>',
           notes=N('El rendimiento de cada transportador de electrones depende de cuántos H⁺ bombea y de cuántos H⁺ cuesta cada ATP.',
                   ['NADH entra por el complejo I: se bombean ≈10 H⁺ (4 + 4 + 2).', 'FADH₂ entra por el complejo II, que no bombea: solo ≈6 H⁺ (4 + 2).', 'La ATP sintasa usa ≈3 H⁺ por ATP y ≈1 H⁺ más se gasta en meter el fosfato y sacar el ATP: ≈4 H⁺ por ATP.', 'NADH: 10 ÷ 4 = 2.5 ATP. FADH₂: 6 ÷ 4 = 1.5 ATP.'],
                   ['Libros antiguos usan 3 y 2 ATP (por eso daban 36–38 ATP por glucosa); los valores actuales son 2.5 y 1.5.'], ['Por qué el FADH₂ rinde menos que el NADH.'])),
      dict(title='Puertas de la membrana interna', tag='m', chain=2, fig=F_transport(),
           text='<p class="lead">Transportadores específicos.</p><ul><li>ATP sale y ADP entra.</li><li>Fosfato y piruvato entran con H⁺.</li><li>Cuesta parte del gradiente.</li></ul>',
           notes=N('Como la membrana interna es impermeable, todo lo que entra o sale lo hace por transportadores.', ['Antiportador ADP/ATP: saca ATP y mete ADP.', 'Simportador de fosfato con H⁺.', 'Simportador de piruvato con H⁺.'], ['Ese H⁺ extra por ATP es la razón de usar ≈4 H⁺ por ATP en la cuenta.'], ['Por qué el rendimiento real es menor que el teórico.'])),
    ]),
    dict(name='Integración', desc='La cuenta final y la relación con el núcleo', intro='Sumamos todo y vemos cómo depende del resto de la célula.', notes=N('Integramos: sumamos la cuenta completa de una glucosa.'), slides=[
      dict(title='La cuenta completa de una glucosa', tag='b', chain=3, fig=F_balance(),
           text='<p class="lead"><b>10 NADH + 2 FADH₂ + 4 ATP/GTP</b> = ≈30–32 ATP.</p><ul><li>8 NADH de la mitocondria → 20 ATP.</li><li>2 FADH₂ → 3 ATP.</li><li>2 NADH de la glucólisis → 3 a 5 ATP.</li></ul>',
           notes=N('Sumamos todo lo que produce una glucosa al oxidarse por completo.',
                   ['ATP/GTP directos: 2 (glucólisis) + 2 GTP (Krebs) = <b>4</b>.', 'NADH de la PDH y de Krebs (8) × 2.5 = <b>20 ATP</b>.', 'FADH₂ de Krebs (2) × 1.5 = <b>3 ATP</b>.', 'NADH de la glucólisis (2): con la lanzadera malato-aspartato × 2.5 = 5 ATP; con la de glicerol-3-fosfato × 1.5 = 3 ATP.', 'Total: 4 + 20 + 3 + (3 a 5) = <b>30 a 32 ATP</b>.'],
                   ['El Alberts usa ≈30 ATP; otros textos 30–32. Son estimaciones.'], ['Saber reconstruir la suma, no solo el número final.'],
                   tabla=(['Etapa', 'NADH', 'FADH₂', 'ATP/GTP', 'ATP final'], [['Glucólisis', '2', '0', '2', '2 + 3 a 5'], ['PDH', '2', '0', '0', '5'], ['Krebs (×2)', '6', '2', '2', '20'], ['<b>Total</b>', '<b>10</b>', '<b>2</b>', '<b>4</b>', '<b>≈30–32</b>']]))),
      dict(title='¿Cuánto ATP por glucosa?', tag='b', chain=3, fig=F_rend2(),
           text='<p class="lead">Con O₂: <b>≈30–32 ATP</b>; sin O₂: <b>2</b>.</p><ul><li>Casi todo viene de la fosforilación oxidativa.</li><li>Por eso la hipoxia es tan grave.</li></ul>',
           notes=N('Comparamos el rendimiento con y sin mitocondria.', ['Solo glucólisis (sin O₂): 2 ATP por glucosa.', 'Oxidación completa (con O₂): ≈30–32 ATP, unas 15 veces más.'], None, ['Por qué cerebro y corazón dependen tanto del oxígeno.'], clinica='En la hipoxia la célula queda con 2 ATP por glucosa y acumula lactato.')),
      dict(title='Importar proteínas del citosol', tag='m', chain=1, fig=F_import(),
           text='<p class="lead">Casi todas se fabrican fuera.</p><ul><li><b>Secuencia señal</b>.</li><li><b>TOM</b> y <b>TIM</b>.</li><li>Se corta la señal en la matriz.</li></ul>',
           notes=N('La mitocondria depende del núcleo para casi todas sus proteínas.', ['Se sintetizan en ribosomas del citosol con una secuencia señal en el extremo amino.', 'TOM (membrana externa) y TIM (interna) las reconocen y las meten desplegadas.', 'Una peptidasa de la matriz corta la señal y la proteína se pliega.'], None, ['TOM = externa; TIM = interna.'])),
    ]),
    dict(name='Regulación', desc='Control, calor y apoptosis', intro='La mitocondria ajusta su ritmo, puede producir calor y decide la muerte celular.', notes=N('La mitocondria se regula según la demanda de la célula.'), slides=[
      dict(title='El ADP marca el ritmo', tag='b', chain=2, fig=F_control(),
           text='<p class="lead">La respiración se acelera cuando se gasta ATP.</p><ul><li><b>Control respiratorio</b>.</li><li>Cadena y ATP sintasa acopladas.</li></ul>',
           notes=N('La producción de ATP se ajusta sola a la demanda.', ['Al gastar ATP aumenta el ADP.', 'Con más ADP, la ATP sintasa deja pasar más H⁺.', 'El gradiente baja y la cadena se acelera para reponerlo, consumiendo más O₂.'], None, ['Qué molécula marca el ritmo: el ADP.'])),
      dict(title='Termogenina: energía en calor', tag='b', chain=4, fig=F_ucp1(),
           text='<p class="lead">En la <b>grasa parda</b>, UCP1 deja regresar los H⁺ sin hacer ATP.</p><ul><li>La energía se libera como calor.</li><li>Importante en recién nacidos.</li></ul>',
           notes=N('El desacoplamiento natural produce calor.', ['La termogenina (UCP1) es un canal que deja volver los H⁺ sin pasar por la ATP sintasa.', 'La energía del gradiente se disipa como calor.'], None, ['Desacoplar = cadena funciona, ATP no se forma.'], clinica='Los recién nacidos usan grasa parda para mantener su temperatura.')),
      dict(title='La mitocondria decide la apoptosis', tag='m', chain=3, fig=F_apopt(),
           text='<p class="lead">El <b>citocromo c</b> que sale activa la muerte programada.</p><ul><li>Bax y Bak abren la membrana externa.</li><li>Bcl-2 lo impide.</li></ul>',
           notes=N('La mitocondria controla la vía intrínseca de la apoptosis.', ['Ante daño grave, Bax y Bak abren la membrana externa.', 'El citocromo c sale al citosol y se une a Apaf-1: apoptosoma.', 'El apoptosoma activa la caspasa 9, que activa a las caspasas ejecutoras.'], ['Bcl-2 es antiapoptótica: protege a la membrana externa.'], ['Secuencia: Bax/Bak → citocromo c → apoptosoma → caspasas.'], clinica='Muchos cánceres sobreexpresan Bcl-2 para no morir.')),
    ]),
    dict(name='Clínica', desc='Tóxicos y enfermedades mitocondriales', intro='Qué pasa cuando la mitocondria falla.', notes=N('Aplicación médica.'), slides=[
      dict(title='Venenos de la cadena respiratoria', tag='b', chain=4, fig=wrapfig(tbl_inhib()),
           text='<p class="lead">Sin cadena no hay ATP aunque haya oxígeno.</p><ul><li><b>Cianuro</b>: complejo IV.</li><li><b>Hipoxia histotóxica</b>.</li><li><b>Acidosis láctica</b>.</li></ul>',
           notes=N('Bloquear la cadena deja a la célula solo con la glucólisis.', ['Rotenona: complejo I.', 'Cianuro y monóxido de carbono: complejo IV; el O₂ llega pero no se usa (hipoxia histotóxica).', 'Oligomicina: ATP sintasa.', '2,4-dinitrofenol: desacoplante; los H⁺ regresan sin ATP → calor e hipertermia.'], ['Con la cadena bloqueada, el NADH no se reoxida, el piruvato pasa a lactato y aparece acidosis láctica.'], ['Sitio de acción de cada tóxico.'])),
      dict(title='Enfermedades mitocondriales', tag='m', chain=4, fig=F_mat_herencia(),
           text='<p class="lead">El ADNmt se hereda por <b>vía materna</b>.</p><ul><li>Cerebro, músculo, corazón y retina.</li><li>MELAS y Leber.</li></ul>',
           notes=N('Las mutaciones del ADN mitocondrial causan enfermedades con herencia y gravedad particulares.', ['Herencia materna: una madre afectada puede transmitirla a todos sus hijos; un padre afectado no.', 'Heteroplasmia: mezcla de mitocondrias sanas y mutadas; la enfermedad aparece al pasar un umbral, por eso varía entre hermanos.', 'Afecta a los tejidos que más ATP consumen.'], ['Ejemplos: MELAS y neuropatía óptica hereditaria de Leber.'], ['Herencia materna + heteroplasmia.'])),
    ]),
  ],
  close=[
    'La mitocondria convierte glucosa y grasas en <strong>ATP</strong> usando O₂.',
    'Desciende de una <strong>bacteria</strong>: doble membrana y ADN propio.',
    'Glucólisis: <strong>2 ATP + 2 NADH</strong> · PDH: <strong>2 NADH</strong>.',
    'Krebs por glucosa: <strong>6 NADH + 2 FADH₂ + 2 GTP</strong>.',
    'NADH ≈ <strong>2.5 ATP</strong> · FADH₂ ≈ <strong>1.5 ATP</strong>.',
    'La <strong>cadena</strong> bombea H⁺; la <strong>ATP sintasa</strong> los usa.',
    'Total: <strong>≈30–32 ATP</strong> por glucosa; sin O₂, 2.',
    'Cianuro y CO bloquean el complejo IV: <strong>hipoxia histotóxica</strong>.',
    'ADNmt: herencia <strong>materna</strong> y heteroplasmia.',
  ],
  close_notes=N('Si entiendes la secuencia combustible → NADH/FADH₂ → gradiente de H⁺ → ATP y sabes hacer la cuenta, entiendes la mitocondria.'),
)

# ======== sin nivel de casos clínicos: solo inhibidores y herencia del ADNmt ========
_L = DECK['levels'][-1]
_L['name'] = 'Importancia médica'; _L['desc'] = 'Inhibidores de la cadena y herencia del ADNmt'
_L['intro'] = 'Qué pasa si se bloquea la cadena y cómo se hereda el ADN mitocondrial.'; _L['notes'] = N('Para cerrar, la importancia médica en el nivel del tema.')
_v = _L['slides'][0]
_v['title'] = 'Inhibidores de la cadena respiratoria'
_v['text'] = '<p class="lead">Sin cadena no hay ATP aunque haya oxígeno.</p><ul><li><b>Rotenona</b>: complejo I · <b>cianuro</b> y CO: complejo IV.</li><li><b>Oligomicina</b>: ATP sintasa.</li><li><b>2,4-DNP</b>: desacoplante.</li></ul>'
_v['notes'] = N('Bloquear la cadena deja a la célula solo con la glucólisis.', ['Rotenona: complejo I; los electrones del NADH no entran.', 'Cianuro y monóxido de carbono: complejo IV; el O₂ llega pero no puede recibir electrones.', 'Oligomicina: ATP sintasa; los H⁺ no regresan, no hay ATP y la cadena se frena.', '2,4-dinitrofenol: desacoplante; los H⁺ regresan sin pasar por la ATP sintasa y la energía se pierde como calor.'], ['Con la cadena bloqueada, el NADH no se reoxida, el piruvato pasa a lactato y aparece acidosis láctica.'], ['Sitio de acción de cada inhibidor.'])
_h = _L['slides'][1]
_h['title'] = 'Herencia materna del ADN mitocondrial'
_h['text'] = '<p class="lead">El ADNmt se hereda por <b>vía materna</b>.</p><ul><li>Las mitocondrias del espermatozoide no pasan al embrión.</li><li><b>Heteroplasmia</b>: ADNmt normal y mutado en la misma célula.</li></ul>'
_h['notes'] = N('El ADN mitocondrial tiene un patrón de herencia propio.', ['En la fecundación, las mitocondrias del espermatozoide no se transmiten al embrión: todo el ADNmt viene del óvulo.', 'Por eso una mutación del ADNmt de la madre puede pasar a todos sus hijos y la del padre no se transmite.', 'Cada célula tiene muchas copias de ADNmt; pueden coexistir copias normales y mutadas: heteroplasmia.'], None, ['Herencia materna + heteroplasmia.'])
_h['tag'] = 'b'
DECK['close'] = [x.replace('Cianuro y CO bloquean el complejo IV: <strong>hipoxia histotóxica</strong>.', 'Cianuro y CO bloquean el <strong>complejo IV</strong>: no hay ATP aunque haya O₂.') for x in DECK['close']]
DECK['index_notes'] = DECK['index_notes'].replace('regulación y clínica.', 'regulación e importancia médica.')
