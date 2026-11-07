from sv import *
from notes import N
from d_dogma import (F_flujo, tbl_adn_arn, F_antipar, F_gen, tbl_pol, F_ribosoma, F_horquilla, F_okazaki, F_promotor,
                     F_termin, F_inicio, F_elong, F_term_trad, F_euc, F_proc, F_licencia, F_activ, F_ctd, F_telo, F_talas,
                     chip, mini_rib)
import math

def W(h): return f'<div style="width:100%">{h}</div>'

# ======================= TABLAS =======================
def tbl_tipos_arn():
    return table(['Grupo', 'Tipo', 'Función'], [
        ['Funcionales<br>(no se traducen)', 'ARN ribosómico (ARNr)', 'Estructura y catálisis del ribosoma'],
        ['', 'ARN de transferencia (ARNt)', 'Adaptador: lleva aminoácidos'],
        ['', 'ARN pequeño nuclear (snRNA)', 'Splicing (espliceosoma)'],
        ['', 'ARN citoplasmático pequeño (scRNA)', 'Forma parte de la SRP'],
        ['Informativos<br>(se traducen)', 'ARN mensajero (ARNm)', 'Lleva el mensaje al ribosoma'],
        ['', 'ARN heterogéneo nuclear (hnRNA)', 'Precursor del ARNm (pre-ARNm)'],
    ], cls='tb sm')

def tbl_enz_rep():
    return table(['Enzima', 'Función', 'Presente en'], [
        ['Helicasa', 'Rompe los puentes de hidrógeno y desenrolla la doble hélice', 'Procariotas y eucariotas'],
        ['Topoisomerasa', 'Alivia la tensión del desenrollamiento (en procariotas: girasa)', 'Procariotas y eucariotas'],
        ['SSB', 'Evitan que las hebras se vuelvan a unir', 'Procariotas y eucariotas'],
        ['Primasa', 'Sintetiza un cebador de ARN para iniciar', 'Procariotas y eucariotas'],
        ['ADN polimerasa III', 'Principal enzima replicativa: agrega nucleótidos', 'Procariotas'],
        ['ADN polimerasa α, δ, ε', 'α sintetiza el cebador; δ y ε extienden la hebra nueva', 'Eucariotas'],
        ['ADN polimerasa I', 'Elimina cebadores de ARN y los reemplaza por ADN', 'Procariotas'],
        ['RNasa H y FEN1', 'Eliminan cebadores de ARN', 'Eucariotas'],
        ['Ligasa', 'Une los fragmentos de Okazaki', 'Procariotas y eucariotas'],
        ['Telomerasa', 'Extiende los telómeros y evita el acortamiento', 'Eucariotas'],
    ], cls='tb sm')

def tbl_pol3():
    return table(['Subunidad', 'Función'], [
        ['α (alfa)', 'Cataliza la síntesis de ADN'],
        ['ε (épsilon)', 'Exonucleasa 3′→5′: corrige errores'],
        ['θ (theta)', 'Estabiliza a ε'],
        ['β (abrazadera deslizante)', 'Mantiene a la polimerasa unida al ADN'],
        ['τ (tau)', 'Une las dos polimerasas y coordina ambas hebras'],
    ], cls='tb sm')

def tbl_rnap_bact():
    return table(['Subunidad', 'Mr (kD)', 'n', 'Función'], [
        ['α', '36.5', '2', 'Inicio de la cadena; interacción con proteínas reguladoras y promotores'],
        ['β', '151', '1', 'Inicio y elongación: <b>centro catalítico</b>'],
        ['β′', '155', '1', 'Unión al ADN'],
        ['ω', '11', '1', 'Desconocida'],
        ['σ', '70', '1', 'Reconocimiento del promotor'],
    ], cls='tb sm')

def tbl_rnap_euk():
    return table(['Polimerasa', 'Dónde', 'Producto', 'Función'], [
        ['ARN pol I', 'Nucléolo', 'ARNr 28S, 18S y 5.8S', 'Formación de ribosomas'],
        ['ARN pol II', 'Nucleoplasma', 'pre-ARNm, algunos snRNA y miRNA', 'Síntesis de ARN mensajero'],
        ['ARN pol III', 'Nucleoplasma', 'ARNt y ARNr 5S', 'Traducción y síntesis proteica'],
    ], cls='tb sm')

def tbl_rep_comp():
    return table(['Característica', 'Procariotas', 'Eucariotas'], [
        ['Origen de replicación', 'Único (OriC en <i>E. coli</i>)', 'Múltiples por cromosoma'],
        ['Tipo de ADN', 'Circular', 'Lineal'],
        ['Velocidad', 'Rápida (≈1000 nt/s)', 'Más lenta (≈50 nt/s)'],
        ['Helicasa', 'DnaB', 'MCM'],
        ['Unión a cadena sencilla', 'SSB', 'RPA'],
        ['Primasa', 'DnaG', 'Pol α + primasa'],
        ['Polimerasa principal', 'ADN pol III', 'Pol δ (rezagada) y Pol ε (líder)'],
        ['Eliminación de cebadores', 'ADN pol I', 'RNasa H y FEN1'],
        ['Abrazadera deslizante', 'Subunidad β de pol III', 'PCNA'],
        ['Fragmentos de Okazaki', '1000–2000 nt', '100–200 nt'],
        ['Terminación', 'Secuencias Ter y proteínas Tus', 'Telomerasa en los extremos'],
    ], cls='tb sm')

def tbl_tf():
    return table(['Factor', 'Función'], [
        ['TFIID', 'Reconoce la caja TATA'],
        ['TBP', 'Subunidad de TFIID que se une al ADN'],
        ['TFIIA', 'Estabiliza la unión'],
        ['TFIIB', 'Posiciona a la ARN polimerasa'],
        ['TFIIF', 'Recluta a la ARN pol II'],
        ['TFIIE', 'Recluta a TFIIH'],
        ['TFIIH', 'Helicasa: abre el ADN · cinasa: fosforila el CTD'],
    ], cls='tb sm')

def tbl_fact_trad():
    return table(['Etapa', 'Bacterias', 'Eucariotas'], [
        ['Inicio', 'IF1: bloquea el sitio A<br>IF2-GTP: lleva fMet-ARNt al sitio P<br>IF3: evita la unión prematura de la 50S',
         'eIF2-GTP: lleva Met-ARNt iniciador<br>eIF4F (4E reconoce el cap · 4G andamio · 4A helicasa)<br>eIF3: impide la unión prematura de la 60S · eIF5: hidroliza GTP'],
        ['Elongación', 'EF-Tu-GTP: introduce aa-ARNt · EF-Ts: regenera EF-Tu<br>EF-G-GTP: translocación', 'eEF1A-GTP: introduce aa-ARNt<br>eEF2-GTP: translocación'],
        ['Enlace peptídico', 'Peptidil transferasa del ARNr 23S', 'Peptidil transferasa del ARNr 28S'],
        ['Terminación', 'RF1: UAA y UAG · RF2: UAA y UGA<br>RF3: usa GTP y ayuda a liberar', 'eRF1: reconoce UAA, UAG, UGA<br>eRF3: usa GTP para liberar la proteína'],
        ['Reciclaje', 'RRF (reciclaje) · EF-G (separa) · IF3 (mantiene separadas)', '—'],
    ], cls='tb sm')

def tbl_ptm():
    return table(['Modificación', 'Función'], [
        ['Fosforilación', 'Regulación'], ['Glucosilación', 'Señalización'], ['Acetilación', 'Estabilidad'],
        ['Hidroxilación', 'Colágeno'], ['Ubiquitinación', 'Degradación'],
    ], cls='tb sm')

def tbl_pro_euc():
    return table(['Característica', 'Procariotas', 'Eucariotas'], [
        ['Lugar de la transcripción', 'Citoplasma', 'Núcleo'],
        ['ARN polimerasas', '1 (con factor σ)', '3 (I, II, III) + factores generales'],
        ['Promotor', '−35 y −10 (Pribnow)', 'TATA (−25), CAAT y GC (−40 a −110)'],
        ['Intrones · splicing', 'No frecuentes · no', 'Sí · sí'],
        ['CAP y poli-A', 'No', 'Sí'],
        ['ARNm', 'Policistrónico', 'Monocistrónico'],
        ['Transcripción y traducción', 'Simultáneas', 'Separadas'],
        ['Ribosoma', '70S (30S + 50S)', '80S (40S + 60S)'],
        ['Inicio · 1.er aminoácido', 'Shine-Dalgarno · fMet', 'Cap 5′ · Met'],
        ['Factores de inicio', 'IF1, IF2, IF3', 'eIF múltiples'],
        ['Lugar de la traducción', 'Citoplasma', 'Citoplasma / RER'],
    ], cls='tb sm')

def tbl_reg():
    return table(['Mecanismo', 'Resultado'], [
        ['Metilación del ADN', 'Silenciamiento'],
        ['Acetilación de histonas (HAT)', 'Activación: relaja la cromatina'],
        ['Desacetilación (HDAC)', 'Compacta el ADN: represión'],
        ['Activadores (en enhancers)', 'Incrementan la transcripción'],
        ['Represores (en silencers)', 'Disminuyen o bloquean la expresión'],
        ['Remodelación cromatínica', 'Modifica el acceso al ADN'],
    ], cls='tb sm')

def tbl_inhib_tx():
    return table(['Inhibidor', 'Origen', 'Cómo actúa'], [
        ['Rifampicina', 'Derivado semisintético de la rifamicina B (<i>Streptomyces mediterranei</i>)', 'Inhibe la ARN pol procariota, no la eucariota: se une a β, bloquea la elongación e impide el desalojo del promotor'],
        ['α-amanitina', 'Seta <i>Amanita phalloides</i> (octapéptido)', 'Inhibe sobre todo la ARN pol II; forma un complejo 1:1 e impide la elongación'],
        ['Cordicepina', 'Hongo <i>Cordyceps</i>', 'Antitumoral terminador de cadena: se incorpora y no tiene 3′-OH para seguir'],
        ['Actinomicina D', '<i>Streptomyces</i>', 'Se une fuerte al ADN de doble hélice: inhibe transcripción y replicación; antibiótico y quimioterapia'],
    ], cls='tb sm')

def tbl_antib():
    return table(['Antibiótico', 'Blanco', 'Efecto'], [
        ['Tetraciclinas', 'Ribosoma bacteriano (30S)', 'Bloquean el sitio A'],
        ['Aminoglucósidos', 'Ribosoma bacteriano (30S)', 'Alteran la lectura de codones'],
        ['Cloranfenicol', 'Ribosoma bacteriano (50S)', 'Inhibe la peptidil transferasa'],
        ['Macrólidos', 'Ribosoma bacteriano (50S)', 'Bloquean la translocación'],
        ['Puromicina', 'Ribosoma (imita al aa-ARNt)', 'Terminación prematura'],
        ['Quinolonas*', 'Girasa y topoisomerasa IV', 'Bloquean la replicación bacteriana'],
    ], cls='tb sm')

def tbl_clin():
    return table(['Alteración', 'Enfermedad'], [
        ['Mutaciones en factores de transcripción', 'Cáncer'],
        ['Alteraciones del splicing', 'β-talasemia'],
        ['Defectos en reparación / transcripción', 'Xeroderma pigmentoso'],
        ['Desregulación epigenética', 'Tumores'],
        ['Reactivación de la telomerasa*', 'Inmortalidad de células cancerosas'],
    ], cls='tb sm')

# ======================= FIGURAS NUEVAS =======================
def F_semicons():
    o = t(460, 40, 'ADN original', 22, COB, 'middle', 700, 'fi', 0)
    o += p('M260,75 L660,75', COB, 9, 'dr', .1) + p('M260,115 L660,115', COB, 9, 'dr', .1)
    for x in range(280, 660, 28):
        o += p(f'M{x},80 L{x},110', MUT, 2, 'dr', .3)
    o += arrow(380, 140, 230, 210, OCRE, 4, 'dr', .8) + arrow(540, 140, 690, 210, OCRE, 4, 'dr', .8)
    for (x0, d) in [(40, 1.2), (500, 1.2)]:
        o += p(f'M{x0},240 L{x0+380},240', COB, 9, 'dr', d)
        o += p(f'M{x0},280 L{x0+380},280', GREEN, 9, 'dr', d + .5, t_=1.4)
        for x in range(x0 + 20, x0 + 380, 28):
            o += p(f'M{x},245 L{x},275', MUT, 2, 'dr', d + .8)
    o += t(230, 320, 'hija 1: 1 original + 1 nueva', 19, INK, 'middle', 700, 'fi', 2.0) + t(690, 320, 'hija 2: 1 original + 1 nueva', 19, INK, 'middle', 700, 'fi', 2.0)
    for i, (n, s) in enumerate([('1. Inicio', 'se abre el origen'), ('2. Elongación', 'se sintetizan las hebras'), ('3. Terminación', 'se separan las hijas')]):
        x = 40 + i*290
        o += r(x, 380, 260, 100, CARD, COB, 2.5, 14, 'pp', 2.4 + i*.3) + t(x + 130, 420, n, 23, COB, 'middle', 700, 'fi', 2.5 + i*.3) + t(x + 130, 452, s, 18, MUT, 'middle', 600, 'fi', 2.5 + i*.3)
    o += f'<rect x="40" y="530" width="18" height="12" fill="{COB}"/>' + t(66, 541, 'hebra original (molde)', 17, INK, 'start', 600, 'fi', 0)
    o += f'<rect x="330" y="530" width="18" height="12" fill="{GREEN}"/>' + t(356, 541, 'hebra nueva', 17, INK, 'start', 600, 'fi', 0)
    return svg(o, label='Replicación semiconservativa y sus tres etapas')

def F_oric():
    steps = [('OriC (≈245 pb): cajas DnaA ricas en A-T', 'A-T solo tiene 2 puentes de H: se separa fácil'), ('DnaA (iniciadora) + ATP se une a OriC', 'y empieza a desenrollar la doble hélice'),
             ('DnaC (cargador) coloca a la helicasa DnaB', 'sobre las hebras simples'), ('DnaB separa las hebras con ATP', '≈1 ATP cada 3–5 pb · SSB y girasa estabilizan')]
    return svg(flow(steps, 60, 25, 800, 100, 36, .2), label='Inicio de la replicación en bacterias en el origen OriC')

def F_ter():
    o = c(250, 300, 190, 'none', COB, 7, 'fi', 0)
    o += f'<path d="M250,110 A190,190 0 0,1 440,300 A190,190 0 0,1 250,490" fill="none" stroke="{GREEN}" stroke-width="7" pathLength="1"{st("dr", .4, "--t:2s")}/>'
    o += f'<path d="M250,110 A190,190 0 0,0 60,300 A190,190 0 0,0 250,490" fill="none" stroke="{GREEN}" stroke-width="7" pathLength="1"{st("dr", .4, "--t:2s")}/>'
    o += r(215, 92, 70, 36, LOCRE, TAND, 2, 8, 'pp', .1) + t(250, 117, 'OriC', 18, TAND, 'middle', 700, 'fi', .2)
    o += r(205, 470, 90, 40, LRED, RED, 2, 8, 'pp', 2.4) + t(250, 497, 'Ter + Tus', 18, RED, 'middle', 700, 'fi', 2.5)
    o += t(250, 300, 'dos horquillas', 19, INK, 'middle', 700, 'fi', .8) + t(250, 326, 'avanzan en sentidos', 17, MUT, 'middle', 600, 'fi', .8) + t(250, 348, 'opuestos', 17, MUT, 'middle', 600, 'fi', .8)
    o += t(250, 560, 'Tus bloquea a la helicasa en Ter', 18, RED, 'middle', 700, 'fi', 2.7)
    o += p('M480,60 L480,560', LINE, 2, 'dr', 0)
    o += t(690, 60, 'Cromosomas entrelazados', 20, INK, 'middle', 700, 'fi', 2.8)
    o += c(655, 160, 60, 'none', COB, 6, 'pp', 3.0) + c(725, 160, 60, 'none', GREEN, 6, 'pp', 3.0)
    o += arrow(690, 240, 690, 330, OCRE, 4, 'dr', 3.3) + t(705, 290, 'topoisomerasa IV', 18, TAND, 'start', 700, 'fi', 3.4) + t(705, 312, 'corta y religa (ATP)', 16, MUT, 'start', 600, 'fi', 3.4)
    o += c(600, 420, 60, 'none', COB, 6, 'pp', 3.8) + c(780, 420, 60, 'none', GREEN, 6, 'pp', 3.8)
    o += t(690, 520, 'cromosomas separados', 20, GREEN, 'middle', 700, 'fi', 4.0)
    return svg(o, label='Terminación de la replicación bacteriana en Ter y separación por la topoisomerasa IV')

def F_euk_rep():
    o = p('M40,110 L880,110', COB, 6, 'dr', 0) + t(40, 70, 'cromosoma lineal con muchos orígenes', 20, INK, 'start', 700, 'fi', .1)
    for i, x in enumerate([140, 340, 560, 760]):
        o += f'<ellipse cx="{x}" cy="110" rx="60" ry="22" fill="#fbf6ea" stroke="{GREEN}" stroke-width="4"{st("gr", .4 + i*.2)}/>'
    chips = [('ORC', 'reconoce el origen'), ('Cdc6 y Cdt1', 'cargan a MCM (ATP)'), ('MCM', 'helicasa'), ('RPA', 'une hebra sencilla'),
             ('Topo I y II', 'alivian la tensión'), ('Pol α-primasa', 'cebador 10 ARN + 20 ADN'), ('Pol ε', 'hebra líder'), ('Pol δ', 'hebra rezagada'),
             ('PCNA', 'abrazadera deslizante'), ('RNasa H + FEN1', 'quitan cebadores'), ('Ligasa I', 'sella con ATP'), ('Telomerasa', 'extiende telómeros')]
    for i, (n, s) in enumerate(chips):
        col, row = i % 3, i // 3
        x, y = 40 + col*290, 175 + row*100
        o += r(x, y, 270, 84, CARD, COB, 2, 12, 'pp', .9 + i*.12) + t(x + 135, y + 36, n, 21, COB, 'middle', 700, 'fi', 1.0 + i*.12) + t(x + 135, y + 64, s, 17, MUT, 'middle', 600, 'fi', 1.0 + i*.12)
    return svg(o, label='Replicación en eucariotas: múltiples orígenes y proteínas principales')

def F_energia():
    rows = [('Helicasa (abrir)', 10000), ('Girasa', 2000), ('Primasa', 1000), ('ADN pol III', 4600000), ('ADN pol I', 1000), ('Ligasa', 1000), ('Topo IV', 100)]
    o = t(30, 34, 'E. coli · ATP aproximados (escala logarítmica)', 19, MUT, 'start', 700, 'fi', 0)
    for i, (n, v) in enumerate(rows):
        y = 62 + i*50
        w = (math.log10(v) - 1)*110
        o += t(220, y + 26, n, 19, INK, 'end', 700, 'fi', .1 + i*.1)
        o += r(235, y + 6, w, 30, COB if v > 1e5 else '#8aa0ee', 'none', 0, 6, 'gr', .2 + i*.1)
        o += f'<text x="{245 + w:.0f}" y="{y + 28}" font-size="18" fill="{INK}" font-weight="700"{st("fi", .4 + i*.1)}>≈{v:,}</text>'
    o += r(40, 430, 400, 130, LCOB, COB, 2.5, 16, 'pp', 1.4) + t(240, 470, 'Total procariota', 20, COB, 'middle', 700, 'fi', 1.5)
    o += counter(240, 530, 4.6, 46, COB, 'middle', 1.6, 1, ' millones')
    o += r(480, 430, 400, 130, LOCRE, TAND, 2.5, 16, 'pp', 1.8) + t(680, 470, 'Total eucariota (humano)', 20, TAND, 'middle', 700, 'fi', 1.9)
    o += counter(680, 530, 6, 46, TAND, 'middle', 2.0, 0, ' millones')
    return svg(o, label='Gasto energético aproximado de la replicación')

def F_elong_bact():
    o = f'<ellipse cx="470" cy="280" rx="150" ry="115" fill="{LCOB}" stroke="{COB}" stroke-width="3" opacity=".7"{st("pp", .1)}/>'
    o += t(470, 150, 'núcleo de la ARN polimerasa (α₂ββ′ω)', 18, COB, 'middle', 700, 'fi', .2)
    o += p('M40,250 L380,250 C420,250 430,212 470,212 C510,212 520,250 560,250 L880,250', INK, 5, 'dr', .3)
    o += p('M40,300 L380,300 C420,300 430,338 470,338 C510,338 520,300 560,300 L880,300', INK, 5, 'dr', .3)
    o += p('M520,325 L430,325 C390,320 360,250 300,150 L260,80', TAND, 6, 'dr', .9)
    o += r(428, 316, 94, 18, 'none', RED, 2.5, 6, 'fi', 1.4) + t(475, 375, 'híbrido ARN-ADN 8–10 pb (forma A)', 16, RED, 'middle', 700, 'fi', 1.5)
    o += t(240, 70, '5′ ARN', 18, TAND, 'end', 700, 'fi', 1.2)
    o += f'<g class="mv" style="--d:1s;--t:3s;--dx:-160px;--dy:-120px"><circle cx="420" cy="215" r="18" fill="{OCRE}" stroke="{TAND}" stroke-width="2"/><text x="420" y="222" font-size="18" text-anchor="middle" font-weight="700" fill="{INK}">σ</text></g>'
    o += t(130, 215, 'σ se separa tras 6–10 nt', 17, TAND, 'middle', 700, 'fi', 1.8)
    for i, x in enumerate([680, 740, 800]):
        o += f'<path d="M{x},250 c10,-30 30,-30 30,0" fill="none" stroke="{RED}" stroke-width="3"{st("fi", 2.0 + i*.1)}/>'
    o += t(760, 200, 'superenrollamiento delante', 16, RED, 'middle', 700, 'fi', 2.2) + t(760, 345, 'girasa (topo II) lo elimina', 16, MUT, 'middle', 600, 'fi', 2.3)
    o += arrow(620, 420, 820, 420, GREEN, 4, 'dr', 2.4) + t(720, 445, 'avance de la burbuja', 16, GREEN, 'middle', 700, 'fi', 2.4)
    o += r(40, 470, 840, 100, CARD, OCRE, 2.5, 14, 'pp', 2.7)
    o += tl(460, 505, ['El tamaño del híbrido y del ADN abierto se mantiene constante mientras la burbuja avanza.', 'La ARN pol casi no corrige: tasa de error 1 en 10⁴–10⁵ bases.'], 18, INK, 'middle', 600, 'fi', 2.9)
    return svg(o, label='Elongación de la transcripción en bacterias')

def F_pic():
    o = p('M40,470 L880,470', COB, 6, 'dr', 0) + p('M40,488 L880,488', COB, 6, 'dr', 0)
    o += r(110, 455, 190, 48, LOCRE, TAND, 2, 8, 'fi', .2) + t(205, 487, 'GC · CAAT', 18, TAND, 'middle', 700, 'fi', .3) + t(205, 530, '−110 a −40', 16, MUT, 'middle', 600, 'fi', .3)
    o += r(400, 455, 100, 48, LOCRE, TAND, 2, 8, 'fi', .3) + t(450, 487, 'TATA', 18, TAND, 'middle', 700, 'fi', .4) + t(450, 530, '−25', 16, MUT, 'middle', 600, 'fi', .4)
    o += p('M620,455 L620,425 L660,425', GREEN, 4, 'dr', .5) + t(620, 530, '+1', 18, GREEN, 'middle', 700, 'fi', .5)
    parts = [(1, 'TFIID (TBP)', 395, 395, 110, 56, LCOB, COB), (2, 'TFIIA', 310, 400, 80, 50, '#e6ecfb', COB), (2, 'TFIIB', 510, 400, 80, 50, '#e6ecfb', COB)]
    for (k, n, x, y, w, h, f, s) in parts:
        o += r(x, y, w, h, f, s, 2.5, 10, 'pp', .8 + k*.6) + t(x + w/2, y + h/2 + 6, n, 16, s, 'middle', 700, 'fi', .9 + k*.6)
    o += f'<g class="pp" style="--d:2.6s"><ellipse cx="580" cy="320" rx="120" ry="62" fill="#c9d4fa" stroke="{COB}" stroke-width="3"/><text x="565" y="315" font-size="19" fill="{COB}" text-anchor="middle" font-weight="700">ARN pol II</text><text x="565" y="340" font-size="16" fill="{COB}" text-anchor="middle" font-weight="600">+ TFIIF</text></g>'
    o += r(690, 230, 90, 50, '#e6ecfb', COB, 2.5, 10, 'pp', 3.2) + t(735, 261, 'TFIIE', 16, COB, 'middle', 700, 'fi', 3.3)
    o += r(720, 300, 150, 70, LRED, RED, 2.5, 10, 'pp', 3.8) + t(795, 330, 'TFIIH', 18, RED, 'middle', 700, 'fi', 3.9) + t(795, 354, 'helicasa + cinasa', 15, RED, 'middle', 600, 'fi', 3.9)
    o += f'<path d="M690,350 C670,390 640,380 650,410" stroke="{COB}" stroke-width="5" fill="none"{st("fi", 4.0)}/>'
    for i, c_ in enumerate([(675, 395), (660, 410)]):
        o += c(c_[0], c_[1], 8, OCRE, 'none', 0, 'pp', 4.3 + i*.1)
    o += t(690, 440, 'CTD fosforilado', 15, TAND, 'start', 700, 'fi', 4.4)
    o += tl(40, 60, ['Orden de ensamblaje:', '1) TFIID (TBP en TATA) → 2) TFIIA y TFIIB', '→ 3) ARN pol II + TFIIF → 4) TFIIE → 5) TFIIH'], 19, INK, 'start', 600, 'fi', .4)
    return svg(o, label='Ensamblaje del complejo de preiniciación en un promotor eucariota')

def F_euk_term():
    o = p('M40,330 L880,330', COB, 6, 'dr', 0)
    for i, x in enumerate([650, 780]):
        o += c(x, 330, 34, LOCRE, TAND, 3, 'pp', .2 + i*.1)
    o += t(715, 400, 'nucleosomas', 17, TAND, 'middle', 700, 'fi', .3)
    o += f'<g class="mv" style="--d:1s;--t:2.6s;--dx:40px;--dy:-130px"><rect x="540" y="300" width="64" height="34" rx="8" fill="{LGREEN}" stroke="{GREEN}" stroke-width="2"/><text x="572" y="323" font-size="16" fill="{GREEN}" text-anchor="middle" font-weight="700">FACT</text></g>'
    o += t(640, 160, 'FACT desplaza histonas', 17, GREEN, 'middle', 700, 'fi', 1.4)
    o += e(440, 330, 80, 52, LCOB, COB, 3, 'pp', .4) + t(440, 337, 'ARN pol II', 17, COB, 'middle', 700, 'fi', .5)
    o += p('M400,300 C360,240 300,200 60,200', TAND, 6, 'dr', .7)
    o += r(170, 182, 96, 34, LRED, RED, 2, 8, 'pp', 1.6) + t(218, 205, 'AAUAAA', 16, RED, 'middle', 700, 'fi', 1.7)
    o += p('M300,180 L320,222 M320,180 L300,222', RED, 3, 'dr', 2.0) + t(310, 170, 'corte', 16, RED, 'middle', 700, 'fi', 2.0)
    o += t(60, 180, '5′', 18, TAND, 'start', 700, 'fi', .9)
    o += r(40, 440, 840, 130, CARD, OCRE, 2.5, 14, 'pp', 2.3)
    o += tl(460, 475, ['La transcripción eucariota suele empezar por A o G · la terminación es poco conocida', 'Señal de poliadenilación AAUAAA: marca el sitio de corte; luego se libera el ARN', 'y la polimerasa se separa · en algunos transcritos hay horquilla seguida de U'], 17, INK, 'middle', 600, 'fi', 2.5)
    return svg(o, label='Elongación y terminación de la transcripción en eucariotas')

def F_cap():
    rows = [('ARN naciente', 'pppN–', None, 'ARN trifosfatasa', 'quita un fosfato: pppN → ppN'),
            ('', 'ppN–', 'G', 'Guanilil transferasa', 'añade GMP: GpppN (enlace 5′-5′)'),
            ('', 'GpppN–', 'm⁷G', 'Metiltransferasa', 'metila la G con SAM: m⁷GpppN')]
    o = ''
    for i, (lab, mol, g_, enz, desc) in enumerate(rows):
        y = 90 + i*150
        d = .2 + i*1.0
        x = 60
        if g_:
            o += c(x + 30, y, 26, RED if g_ == 'm⁷G' else LRED, RED, 2, 'pp', d + .4) + t(x + 30, y + 7, g_, 17, '#fff' if g_ == 'm⁷G' else RED, 'middle', 700, 'fi', d + .5)
        nP = 3 if i != 1 else 2
        if i == 1: nP = 3
        for k in range(3 if i else 3):
            col = COB if not (i == 0 and k == 0) else COB
            o += c(x + 90 + k*42, y, 15, '#fff', COB, 2.5, 'pp', d + .1)
            o += t(x + 90 + k*42, y + 6, 'P', 15, COB, 'middle', 700, 'fi', d + .1)
        if i == 0:
            o += f'<g class="mv1" style="--d:{d+.6}s;--t:1.2s;--dx:0px;--dy:0px"></g>'
        o += r(x + 200, y - 20, 50, 40, LOCRE, TAND, 2, 6, 'pp', d) + t(x + 225, y + 7, 'N', 18, TAND, 'middle', 700, 'fi', d)
        o += p(f'M{x+250},{y} L{x+400},{y}', TAND, 6, 'dr', d)
        o += t(x + 410, y - 34, '', 1)
        o += r(500, y - 45, 380, 90, CARD, COB, 2.5, 14, 'pp', d + .3) + t(690, y - 8, enz, 21, COB, 'middle', 700, 'fi', d + .4) + t(690, y + 22, desc, 17, INK, 'middle', 600, 'fi', d + .5)
        if i < 2:
            o += arrow(260, y + 40, 260, y + 100, OCRE, 3, 'dr', d + .7)
    o += p('M130,72 L190,108', RED, 4, 'dr', .9)
    o += t(460, 560, 'se coloca a los 20–30 nt · señal: Ser5 del CTD fosforilada por TFIIH', 18, MUT, 'middle', 700, 'fi', 3.2)
    return svg(o, label='Formación del capuchón 5 prima en tres pasos enzimáticos')

def F_polya():
    o = t(30, 40, 'Antes del corte', 19, MUT, 'start', 700, 'fi', 0)
    o += p('M40,170 L880,170', TAND, 7, 'dr', .1) + t(40, 150, '5′', 18, TAND, 'start', 700, 'fi', .1)
    o += r(250, 155, 110, 32, LRED, RED, 2, 6, 'fi', .3) + t(305, 177, 'AAUAAA', 16, RED, 'middle', 700, 'fi', .3)
    o += r(580, 155, 120, 32, LCOB, COB, 2, 6, 'fi', .4) + t(640, 177, 'GU / U', 16, COB, 'middle', 700, 'fi', .4)
    o += t(305, 220, '10–30 nt antes del corte', 15, MUT, 'middle', 600, 'fi', .5)
    o += e(305, 105, 70, 30, '#e6ecfb', COB, 2.5, 'pp', .7) + t(305, 111, '① CPSF', 17, COB, 'middle', 700, 'fi', .8)
    o += e(640, 105, 70, 30, '#e6ecfb', COB, 2.5, 'pp', 1.0) + t(640, 111, '② CstF', 17, COB, 'middle', 700, 'fi', 1.1)
    o += e(480, 80, 76, 26, LOCRE, TAND, 2, 'pp', 1.3) + t(480, 86, 'CFI · CFII', 16, TAND, 'middle', 700, 'fi', 1.4)
    o += p('M470,150 L490,192 M490,150 L470,192', RED, 4, 'dr', 1.6) + t(480, 225, '③ corte', 16, RED, 'middle', 700, 'fi', 1.7)
    o += t(30, 290, 'Después del corte', 19, MUT, 'start', 700, 'fi', 1.9)
    o += p('M40,380 L470,380', TAND, 7, 'dr', 2.0)
    o += r(250, 365, 110, 32, LRED, RED, 2, 6, 'fi', 2.0) + t(305, 387, 'AAUAAA', 16, RED, 'middle', 700, 'fi', 2.0)
    o += r(470, 370, 360, 22, LGREEN, GREEN, 2, 11, 'gr', 2.4) + t(650, 387, 'AAAAAAAA… (50–250)', 15, GREEN, 'middle', 700, 'fi', 2.8)
    o += f'<g class="mv1" style="--d:2.3s;--t:1.6s;--dx:-330px;--dy:0px"><ellipse cx="840" cy="350" rx="42" ry="24" fill="{LOCRE}" stroke="{TAND}" stroke-width="2"/><text x="840" y="356" font-size="15" text-anchor="middle" font-weight="700" fill="{TAND}">④ PAP</text></g>'
    for k in range(4):
        o += c(520 + k*80, 410, 11, GREEN, 'none', 0, 'pp', 3.2 + k*.1)
    o += t(650, 445, '⑤ PABPN1 estabiliza la cola y regula su longitud', 16, GREEN, 'middle', 700, 'fi', 3.5)
    o += r(40, 480, 840, 90, CARD, OCRE, 2.5, 14, 'pp', 3.7)
    o += tl(460, 515, ['PAP no usa molde y usa ATP como sustrato: ATP → AMP + PPᵢ', 'Cola poli-A: estabilidad, protección, exportación y traducción'], 18, INK, 'middle', 600, 'fi', 3.9)
    return svg(o, label='Poliadenilación en cinco pasos')

def F_splice():
    o = p('M40,150 L880,150', LINE, 2, 'dr', 0)
    o += r(40, 130, 230, 40, LCOB, COB, 2, 6, 'fi', .1) + t(155, 157, 'exón 1', 18, COB, 'middle', 700, 'fi', .1)
    o += r(270, 130, 380, 40, LOCRE, TAND, 2, 6, 'fi', .2) + t(460, 157, 'intrón', 18, TAND, 'middle', 700, 'fi', .2)
    o += r(650, 130, 230, 40, LCOB, COB, 2, 6, 'fi', .3) + t(765, 157, 'exón 2', 18, COB, 'middle', 700, 'fi', .3)
    o += t(290, 200, 'GU', 18, RED, 'middle', 700, 'fi', .4) + t(560, 200, 'A', 18, RED, 'middle', 700, 'fi', .4) + t(630, 200, 'AG', 18, RED, 'middle', 700, 'fi', .4)
    o += t(290, 222, 'sitio 5′', 14, MUT, 'middle', 600, 'fi', .4) + t(560, 222, 'ramificación', 14, MUT, 'middle', 600, 'fi', .4) + t(630, 222, 'sitio 3′', 14, MUT, 'middle', 600, 'fi', .4)
    o += e(290, 90, 40, 26, '#e6ecfb', COB, 2.5, 'pp', .8) + t(290, 96, 'U1', 17, COB, 'middle', 700, 'fi', .9)
    o += e(560, 90, 40, 26, '#e6ecfb', COB, 2.5, 'pp', 1.2) + t(560, 96, 'U2', 17, COB, 'middle', 700, 'fi', 1.3)
    o += e(440, 285, 90, 34, '#c9d4fa', COB, 2.5, 'pp', 1.6) + t(440, 291, 'U4/U6 · U5', 17, COB, 'middle', 700, 'fi', 1.7)
    o += t(440, 340, 'U4/U6 catalizan el corte · U5 une los exones', 16, INK, 'middle', 600, 'fi', 1.9)
    o += f'<path d="M400,430 C340,370 520,370 470,430 Z" fill="none" stroke="{TAND}" stroke-width="5"{st("pp", 2.3)}/>' + t(440, 470, 'intrón en lazo (se degrada)', 15, TAND, 'middle', 600, 'fi', 2.4)
    o += r(560, 420, 150, 40, LCOB, COB, 2, 6, 'pp', 2.6) + r(710, 420, 150, 40, LCOB, COB, 2, 6, 'pp', 2.6)
    o += t(635, 447, 'exón 1', 17, COB, 'middle', 700, 'fi', 2.7) + t(785, 447, 'exón 2', 17, COB, 'middle', 700, 'fi', 2.7)
    o += t(710, 490, 'ARNm: exones unidos', 16, GREEN, 'middle', 700, 'fi', 2.8)
    o += t(460, 560, 'Espliceosoma = snRNA + proteínas (snRNP)', 18, MUT, 'middle', 700, 'fi', 3.0)
    return svg(o, label='Corte y empalme por el espliceosoma')

def F_alt():
    ex = [('1', COB), ('2', OCRE), ('3', GREEN), ('4', COB)]
    o = t(40, 50, 'Gen (pre-ARNm)', 20, MUT, 'start', 700, 'fi', 0)
    for i, (n, col) in enumerate(ex):
        x = 60 + i*210
        o += r(x, 75, 120, 44, LCOB if col == COB else (LOCRE if col == OCRE else LGREEN), col if col != OCRE else TAND, 2, 6, 'pp', .1 + i*.1) + t(x + 60, 104, f'E{n}', 18, INK, 'middle', 700, 'fi', .1 + i*.1)
        if i < 3:
            o += p(f'M{x+120},97 L{x+210},97', LINE, 3, 'dr', .2)
    variants = [(['1', '2', '4'], 'ARNm A', 'proteína A', 230), (['1', '3', '4'], 'ARNm B', 'proteína B', 400)]
    for j, (sel, lab, prot, y) in enumerate(variants):
        d = 1.0 + j*1.2
        o += arrow(400, y - 60, 400, y - 18, OCRE, 3, 'dr', d)
        o += t(40, y + 28, lab, 19, INK, 'start', 700, 'fi', d)
        for k, n in enumerate(sel):
            col = dict(ex)[n]
            o += r(150 + k*120, y, 120, 44, LCOB if col == COB else (LOCRE if col == OCRE else LGREEN), col if col != OCRE else TAND, 2, 4, 'pp', d + .2 + k*.1) + t(210 + k*120, y + 29, f'E{n}', 18, INK, 'middle', 700, 'fi', d + .2 + k*.1)
        o += arrow(520, y + 22, 600, y + 22, GREEN, 3, 'dr', d + .6) + r(610, y - 2, 220, 48, LGREEN, GREEN, 2, 24, 'pp', d + .7) + t(720, y + 29, prot, 19, GREEN, 'middle', 700, 'fi', d + .8)
    o += t(460, 545, 'Un mismo gen → varias proteínas: diversidad y especialización celular', 19, COB, 'middle', 700, 'fi', 3.6)
    return svg(o, label='Splicing alternativo: un gen produce distintas proteínas')

def F_mrna():
    parts = [('cap 5′', 40, 90, RED, LRED), ('UTR 5′', 130, 120, MUT, '#eee'), ('AUG', 250, 70, GREEN, LGREEN), ('región codificante', 320, 300, COB, LCOB),
             ('stop', 620, 70, RED, LRED), ('UTR 3′', 690, 90, MUT, '#eee'), ('poli-A', 780, 100, GREEN, LGREEN)]
    o = t(40, 40, 'ARNm eucariota (monocistrónico)', 20, INK, 'start', 700, 'fi', 0)
    for i, (n, x, w, col, f) in enumerate(parts):
        o += r(x, 60, w, 50, f, col, 2, 6, 'pp', .1 + i*.12) + t(x + w/2, 92, n, 16 if w < 100 else 18, col, 'middle', 700, 'fi', .2 + i*.12)
    o += t(460, 140, 'stop = UAA, UAG o UGA · bacteria: policistrónico, sin cap ni poli-A estable', 16, MUT, 'middle', 600, 'fi', 1.0)
    o += t(40, 195, 'ARNt', 20, INK, 'start', 700, 'fi', 1.1)
    o += r(40, 210, 250, 120, CARD, COB, 2, 12, 'pp', 1.2) + tl(165, 245, ['anticodón ↔ codón', 'extremo 3′ CCA: une', 'el aminoácido'], 17, INK, 'middle', 600, 'fi', 1.3)
    o += t(330, 195, 'ARNr y ribosomas', 20, INK, 'start', 700, 'fi', 1.4)
    o += r(330, 210, 260, 120, LCOB, COB, 2, 12, 'pp', 1.5) + tl(460, 240, ['Eucariota 80S', '40S: ARNr 18S', '60S: 28S, 5.8S y 5S'], 17, COB, 'middle', 700, 'fi', 1.6)
    o += r(620, 210, 260, 120, LOCRE, TAND, 2, 12, 'pp', 1.7) + tl(750, 240, ['Bacteria 70S', '30S: ARNr 16S', '50S: 23S y 5S'], 17, TAND, 'middle', 700, 'fi', 1.8)
    o += r(40, 370, 840, 190, CARD, OCRE, 2.5, 14, 'pp', 2.0)
    o += tl(460, 410, ['Sitios del ribosoma: A (entrada del aminoacil-ARNt),', 'P (enlace peptídico / cadena), E (salida del ARNt vacío).', 'El ARNr no solo es estructural: el 28S (y el 23S en bacteria)', 'es una ribozima con actividad peptidil transferasa.'], 19, INK, 'middle', 600, 'fi', 2.2)
    return svg(o, label='Piezas de la traducción: ARNm, ARNt y ARN ribosomal')

def F_aa():
    o = t(40, 45, 'Activación del aminoácido (en el citosol)', 20, INK, 'start', 700, 'fi', 0)
    o += c(120, 150, 30, LGREEN, GREEN, 3, 'pp', .2) + t(120, 157, 'aa', 18, GREEN, 'middle', 700, 'fi', .3)
    o += chip(120, 220, 'ATP', GREEN, size=16)
    o += r(70, 250, 100, 80, LCOB, COB, 2, 12, 'pp', .4) + t(120, 285, 'ARNt', 17, COB, 'middle', 700, 'fi', .5) + t(120, 312, '3′ CCA', 14, MUT, 'middle', 600, 'fi', .5)
    o += e(410, 210, 140, 90, LOCRE, TAND, 3, 'pp', .7) + tl(410, 200, ['aminoacil-ARNt', 'sintetasa'], 20, TAND, 'middle', 700, 'fi', .8)
    o += arrow(180, 210, 265, 210, OCRE, 4, 'dr', 1.0) + arrow(555, 210, 640, 210, OCRE, 4, 'dr', 1.4)
    o += r(660, 160, 110, 90, LCOB, COB, 2, 12, 'pp', 1.7) + c(715, 140, 22, GREEN, 'none', 0, 'pp', 1.9) + t(715, 212, 'aa-ARNt', 17, COB, 'middle', 700, 'fi', 1.8)
    o += t(810, 290, '+ AMP + PPᵢ', 17, MUT, 'end', 700, 'fi', 2.0)
    o += t(460, 365, 'una sintetasa por aminoácido: garantiza la fidelidad', 19, COB, 'middle', 700, 'fi', 2.2)
    o += p('M40,395 L880,395', LINE, 2, 'dr', 2.3)
    o += t(40, 435, 'Solo en bacterias: el iniciador fMet', 20, INK, 'start', 700, 'fi', 2.4)
    steps = [('Met + ARNtᶠᴹᵉᵗ', 40, 170), ('metionil-ARNt sintetasa', 245, 210), ('transformilasa (+ formilo)', 490, 220), ('fMet-ARNtᶠᴹᵉᵗ', 745, 135)]
    for i, (s_, x, w) in enumerate(steps):
        o += r(x, 470, w, 70, LGREEN if i in (0, 3) else CARD, GREEN, 2, 12, 'pp', 2.6 + i*.3) + t(x + w/2, 512, s_, 15, INK, 'middle', 700, 'fi', 2.7 + i*.3)
    o += arrow(212, 505, 241, 505, OCRE, 3, 'dr', 2.9, 9) + arrow(457, 505, 486, 505, OCRE, 3, 'dr', 3.2, 9) + arrow(712, 505, 741, 505, OCRE, 3, 'dr', 3.5, 9)
    return svg(o, label='Activación de aminoácidos por la aminoacil ARNt sintetasa y formación de fMet')

def F_energia_trad():
    rows = [('ATP', 'Activación del aminoácido (aminoacil-ARNt sintetasa)', GREEN), ('GTP', 'Inicio: IF2 / eIF2 y eIF5', COB), ('GTP', 'Entrada del ARNt al sitio A: EF-Tu / eEF1A', COB),
            ('GTP', 'Translocación: EF-G / eEF2', COB), ('GTP', 'Terminación: RF3 / eRF3', COB)]
    o = ''
    for i, (m, s, col) in enumerate(rows):
        y = 60 + i*82
        o += f'<g{st("pp", .2 + i*.3)}>{chip(80, y + 8, m, col, size=20, w=90)}</g>' + t(150, y + 15, s, 21, INK, 'start', 600, 'fi', .3 + i*.3)
    o += r(40, 470, 840, 100, CARD, OCRE, 2.5, 14, 'pp', 2.0)
    o += tl(460, 505, ['ATP: activa aminoácidos y los une al ARNt.', 'GTP: inicio, entrada del ARNt, translocación y terminación.'], 19, INK, 'middle', 700, 'fi', 2.2)
    return svg(o, label='Uso de ATP y GTP en la traducción')

def F_polisoma():
    o = p('M40,330 C200,260 300,400 460,330 C620,260 720,400 880,330', RED, 5, 'dr', 0)
    o += t(40, 380, '5′', 20, RED, 'start', 700, 'fi', .1) + t(880, 380, '3′', 20, RED, 'end', 700, 'fi', .1)
    xs = [150, 300, 450, 600, 750]
    for i, x in enumerate(xs):
        y = 330 + 35*math.sin((x - 40)/130)
        y = 320
        o += e(x, y - 22, 46, 30, '#c9d4fa', COB, 2.5, 'pp', .3 + i*.2) + e(x, y + 10, 40, 16, LOCRE, TAND, 2, 'pp', .3 + i*.2)
        nb = i + 1
        for k in range(nb):
            o += c(x - 10 + (k % 2)*16, y - 62 - k*20, 9, GREEN, 'none', 0, 'pp', .6 + i*.2 + k*.05)
    o += arrow(150, 470, 760, 470, OCRE, 4, 'dr', 1.6) + t(455, 500, 'los ribosomas avanzan 5′ → 3′; la cadena es más larga cuanto más avanzado', 18, INK, 'middle', 600, 'fi', 1.8)
    o += t(460, 560, 'Polisoma: varios ribosomas sobre un mismo ARNm → más eficiencia', 20, COB, 'middle', 700, 'fi', 2.2)
    return svg(o, label='Polisoma: varios ribosomas traducen un mismo ARNm')

def F_srp():
    o = t(30, 40, 'CITOSOL', 18, MUT, 'start', 700, 'fi', 0) + t(30, 560, 'LUMEN DEL RER', 18, MUT, 'start', 700, 'fi', 0)
    o += r(20, 380, 880, 40, '#f1dca8', TAND, 3, 8, 'fi', .1) + t(890, 372, 'membrana del RER', 16, TAND, 'end', 700, 'fi', .1)
    def rib(x, y, d):
        return e(x, y, 50, 32, '#c9d4fa', COB, 2.5, 'pp', d) + e(x, y + 36, 42, 16, LOCRE, TAND, 2, 'pp', d)
    o += rib(120, 200, .3) + p('M120,168 L120,120', OCRE, 8, 'dr', .6) + t(120, 100, '① péptido señal', 16, TAND, 'middle', 700, 'fi', .7)
    o += t(120, 300, 'hidrofóbico', 15, MUT, 'middle', 600, 'fi', .7)
    o += rib(330, 200, 1.0) + p('M330,168 L330,130', OCRE, 8, 'dr', 1.1)
    o += r(300, 100, 60, 34, LRED, RED, 2, 8, 'pp', 1.3) + t(330, 90, '② SRP', 16, RED, 'middle', 700, 'fi', 1.4) + t(330, 300, 'pausa la traducción', 15, MUT, 'middle', 600, 'fi', 1.4)
    o += rib(560, 300, 1.8) + r(520, 360, 80, 22, LRED, RED, 2, 6, 'pp', 2.0) + t(560, 220, '③ receptor de SRP', 16, RED, 'middle', 700, 'fi', 2.1)
    o += rib(780, 300, 2.4) + r(755, 378, 50, 44, LGREEN, GREEN, 2.5, 6, 'pp', 2.6) + t(780, 205, '④ Sec61', 16, GREEN, 'middle', 700, 'fi', 2.7) + t(780, 225, '(translocón)', 14, GREEN, 'middle', 600, 'fi', 2.7)
    o += p('M780,422 C800,460 760,490 790,530', OCRE, 6, 'dr', 3.0) + t(820, 500, 'entra la proteína', 15, INK, 'start', 600, 'fi', 3.1)
    o += arrow(180, 200, 270, 200, OCRE, 3, 'dr', .9) + arrow(390, 220, 500, 280, OCRE, 3, 'dr', 1.6) + arrow(620, 300, 715, 300, OCRE, 3, 'dr', 2.3)
    return svg(o, label='Dirección de proteínas al retículo endoplásmico rugoso por la SRP')

def F_pliegue():
    o = t(460, 40, 'Chaperonas moleculares', 22, COB, 'middle', 700, 'fi', 0)
    o += p('M60,130 C120,80 160,180 220,120 C270,80 300,170 360,120', GREEN, 5, 'dr', .2) + t(210, 200, 'cadena recién sintetizada', 16, MUT, 'middle', 600, 'fi', .3)
    o += arrow(380, 130, 470, 130, OCRE, 4, 'dr', .6)
    o += r(490, 80, 160, 100, LCOB, COB, 2.5, 50, 'pp', .8) + t(570, 125, 'Hsp70', 20, COB, 'middle', 700, 'fi', .9) + t(570, 150, 'Hsp60', 20, COB, 'middle', 700, 'fi', 1.0)
    o += arrow(660, 130, 740, 130, OCRE, 4, 'dr', 1.2)
    o += c(800, 130, 46, LGREEN, GREEN, 3, 'pp', 1.4) + t(800, 200, 'plegada', 16, GREEN, 'middle', 700, 'fi', 1.5)
    o += t(460, 245, 'evitan la agregación y facilitan el plegamiento correcto', 18, INK, 'middle', 600, 'fi', 1.6)
    o += f'<foreignObject x="60" y="270" width="800" height="300"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:DM Sans,Inter,sans-serif">{tbl_ptm()}</div></foreignObject>'
    return svg(o, label='Chaperonas y modificaciones postraduccionales')

# ======================= MAZO =======================
WIDE = True
def S(title, tag, chain, fig, text, notes, wide=False):
    d = dict(title=title, tag=tag, chain=chain, fig=fig, text=text, notes=notes)
    if wide: d['wide'] = True
    return d

L1 = [
 S('El flujo de la información', 'b', 2, F_flujo(),
   '<p class="lead">La información del ADN se copia, se transcribe y se traduce.</p><ul><li><b>Replicación</b>: ADN → ADN.</li><li><b>Transcripción</b>: ADN → ARN.</li><li><b>Traducción</b>: ARN → proteína.</li><li>Excepción: <b>retrotranscripción</b> (retrovirus).</li></ul>',
   N('El dogma central describe hacia dónde fluye la información genética: del ADN al ARN y del ARN a la proteína. La replicación copia el ADN antes de que la célula se divida; la transcripción copia un gen a ARN; la traducción lee el ARN y arma una proteína.',
     ['<b>Replicación</b>: cada hebra del ADN sirve de molde para una hebra nueva (semiconservativa).',
      '<b>Transcripción</b>: mecanismo por el cual la información del ADN se transfiere a una molécula de ARN. Ocurre por polimerización de ribonucleósidos trifosfato sobre una hebra molde de ADN y la cataliza la <b>ARN polimerasa</b>.',
      '<b>Traducción</b>: la información del ARNm se convierte en proteína en los ribosomas, en tres etapas: inicio, elongación y terminación.',
      '<b>Retrotranscripción</b>: excepción; los retrovirus (como el VIH) copian ARN a ADN con transcriptasa inversa.'],
     ['Reacción de la transcripción (material del profesor): n₁ATP + n₂GTP + n₃CTP + n₄UTP → ARN + (n₁+n₂+n₃+n₄) PPᵢ, con <b>Mg²⁺</b>, ARN polimerasa y ADN molde.',
      'El ARN producido inicialmente se llama <b>transcrito primario</b> o pre-ARNm.'],
     ['Sabe nombrar los tres procesos, qué molde usa cada uno y qué producto da.', 'Recuerda la excepción: retrotranscripción.'])),
 S('ADN y ARN no son iguales', 'b', 0, W(tbl_adn_arn()),
   '<p class="lead">Un OH en el carbono 2′ cambia todo.</p><ul><li>ADN estable: archivo.</li><li>ARN reactivo y de vida corta: mensaje.</li></ul>',
   N('El ARN es una macromolécula sintetizada por las ARN polimerasas a partir de un molde de ADN. Generalmente es de cadena sencilla.',
     ['Está formado por <b>ribonucleótidos unidos por enlaces fosfodiéster</b>.', 'Azúcar: <b>β-D-ribosa</b> (con OH en 2′). Bases: <b>A, U, G y C</b> (uracilo en lugar de timina).',
      'El OH en 2′ hace al ARN más reactivo e inestable: conviene para un mensaje temporal; el ADN, sin ese OH y de doble cadena, funciona como archivo.'],
     ['<b>Niveles estructurales del ARN</b>: la estructura <b>primaria</b> es la secuencia de nucleótidos.', 'Puede formar estructuras <b>secundarias</b> variadas (uniones intracatenarias); sus regiones de doble cadena se parecen al <b>ADN-A</b>.',
      'Se han observado estructuras <b>terciarias</b> en ciertos ARNt y ARNr.'],
     ['Diferencias: azúcar, bases, número de cadenas, estabilidad y función.'])),
 S('Los tipos de ARN', 'b', 2, W(tbl_tipos_arn()),
   '<p class="lead">Unos ARN se traducen; otros funcionan por sí mismos.</p><ul><li><b>Funcionales</b>: ARNr, ARNt, snRNA, scRNA.</li><li><b>Informativos</b>: ARNm y hnRNA.</li></ul>',
   N('El material del profesor divide los ARN en dos grupos: los que funcionan sin traducirse y los que llevan información para hacer proteínas.',
     ['<b>ARN funcionales</b> (no se traducen): ARN ribosómico (ARNr), ARN de transferencia (ARNt), ARN pequeño nuclear (snRNA) y ARN citoplasmático pequeño (scRNA).',
      '<b>ARN informativos</b> (se traducen): ARN mensajero (ARNm) y ARN heterogéneo nuclear (hnRNA), que es el precursor nuclear del ARNm.'],
     ['La ARN pol II también produce algunos <b>snRNA y miRNA</b> (resumen de transcripción).', 'Las funciones de la tabla (splicing para snRNA, SRP para scRNA) son explicación del Alberts para conectar con temas posteriores.'],
     ['Clasifica cada ARN como funcional o informativo.'])),
 S('Antiparalelas y siempre 5′ → 3′', 'b', 1, F_antipar(),
   '<p class="lead">Las dos cadenas corren en sentidos opuestos.</p><ul><li>Las polimerasas solo añaden al <b>3′-OH</b>.</li><li>Toda síntesis va de <b>5′ a 3′</b>.</li><li>Por eso existe la hebra retrasada.</li></ul>',
   N('Todas las polimerasas, de ADN y de ARN, comparten una regla: solo pueden unir un nucleótido nuevo al grupo 3′-OH libre de la cadena que crece. Por eso la síntesis siempre va de 5′ a 3′.',
     ['La hebra molde se lee en dirección <b>3′ → 5′</b>.', 'La hebra nueva crece <b>5′ → 3′</b> y es antiparalela al molde.',
      'Cada nucleótido entrante es un trifosfato; al unirse libera pirofosfato (PPᵢ), y esa energía impulsa la reacción.'],
     ['La ARN pol II lee el ADN 3′→5′ y sintetiza ARN 5′→3′ (resumen de transcripción).', 'Complementariedad ADN → ARN: A→U, T→A, G→C, C→G.'],
     ['Esta regla explica la hebra retrasada y los fragmentos de Okazaki.'])),
 S('La replicación es semiconservativa', 'b', 1, F_semicons(),
   '<p class="lead">Cada hebra original sirve de molde para una nueva.</p><ul><li>Cada ADN hijo tiene una hebra vieja y una nueva.</li><li>Tres etapas: <b>inicio, elongación y terminación</b>.</li></ul>',
   N('La replicación es semiconservativa: cada hebra del ADN original sirve como molde para sintetizar una hebra complementaria nueva. Cada molécula hija conserva una hebra original.',
     ['<b>Inicio</b>: se abre la doble hélice en un punto específico, el <b>origen de replicación</b>.', '<b>Elongación</b>: se sintetizan las nuevas hebras de ADN.', '<b>Terminación</b>: finaliza la síntesis y las hebras hijas se separan.'],
     None, ['Define "semiconservativa" y nombra las tres etapas.'])),
]

L2 = [
 S('Anatomía de un gen', 'b', 0, F_gen(),
   '<p class="lead">Promotor, unidad de transcripción y terminador.</p><ul><li>La polimerasa lee la <b>hebra molde</b> (antisentido).</li><li>El ARN es igual a la <b>hebra codificante</b>, con U.</li></ul>',
   N('Un gen es un segmento del ADN que codifica una proteína (vía ARNm) u otro ARN (ARNr, ARNt).',
     ['<b>Promotor</b>: sitio donde inicia la transcripción.', '<b>Sitio de inicio (+1)</b>: primer nucleótido transcrito.', '<b>Exones</b>: regiones codificantes · <b>intrones</b>: regiones no codificantes (en eucariotas).', '<b>Terminador</b>: señal de finalización.'],
     ['<b>Unidad transcripcional</b>: segmento de ADN entre el inicio y la terminación. Puede ser <b>monocistrónica</b> (un solo gen) o <b>policistrónica</b> (más de un gen).',
      '<b>Hebra sentido</b>: misma secuencia que el ARN; también llamada codificante, informativa, no molde, no transcrita o (+).',
      '<b>Hebra antisentido</b>: hebra molde de la ARN polimerasa; también llamada no codificante, transcrita, no informativa o (−).', 'La ARN polimerasa añade nucleótidos en sentido 5′ → 3′.'],
     ['Distingue hebra molde y codificante y sus sinónimos.'])),
 S('Las enzimas de la replicación', 'b', 2, W(tbl_enz_rep()), '',
   N('Esta tabla, del resumen del profesor, reúne todas las enzimas de la replicación y dónde están presentes.',
     ['Abrir: <b>helicasa</b> (rompe puentes de H) + <b>topoisomerasa</b> (alivia la tensión; en bacterias es la girasa) + <b>SSB</b> (impiden que las hebras se vuelvan a unir).',
      'Cebar: <b>primasa</b> (cebador de ARN).', 'Sintetizar: <b>ADN pol III</b> en procariotas; <b>Pol α</b> (cebador), <b>δ y ε</b> (extienden) en eucariotas.',
      'Limpiar y sellar: <b>ADN pol I</b> (procariotas) o <b>RNasa H y FEN1</b> (eucariotas) quitan cebadores; la <b>ligasa</b> une los fragmentos de Okazaki.', 'Extremos: <b>telomerasa</b> (eucariotas).'],
     None, ['Asocia cada enzima con su función y con el tipo de célula.'], ), wide=True),
 S('ADN polimerasa III y sus subunidades', 'm', 0, W(tbl_pol3()),
   '<p class="lead">La holoenzima tiene subunidades con tareas distintas.</p><ul><li>α sintetiza; ε corrige.</li><li>β es la <b>abrazadera</b>.</li><li>τ coordina las dos hebras: modelo de <b>trombón</b>.</li></ul>',
   N('La ADN polimerasa III es la principal enzima replicativa bacteriana. Funciona como holoenzima: varias subunidades con funciones específicas.',
     ['<b>α</b> cataliza la síntesis de ADN.', '<b>ε</b> tiene actividad exonucleasa 3′→5′: corrige errores.', '<b>θ</b> estabiliza a ε.', '<b>β</b> (abrazadera deslizante) mantiene a la polimerasa unida al ADN.', '<b>τ</b> une las dos polimerasas y coordina la replicación de ambas hebras.'],
     ['Se forma un complejo enzimático tipo <b>trombón</b>: la hebra rezagada forma un bucle para que ambas polimerasas avancen juntas.', 'Equivalente eucariota de β: <b>PCNA</b>.'],
     ['β = abrazadera = PCNA en eucariotas; ε = corrección.'])),
 S('Dos polimerasas, dos estrategias', 'b', 2, W(tbl_pol()),
   '<p class="lead">La ADN pol copia con precisión; la ARN pol empieza sola.</p><ul><li>La ADN pol necesita cebador.</li><li>La ARN pol no.</li></ul>',
   N('Comparar ambas polimerasas explica muchos detalles del dogma.',
     ['La ADN polimerasa necesita un cebador con extremo 3′-OH; la ARN polimerasa no necesita cebador.', 'La ADN pol corrige con exonucleasa 3′→5′; la ARN pol no tiene actividad exonucleasa (no es correctora).',
      'Por eso los cebadores de la replicación son de ARN: los hace la primasa, que es una ARN polimerasa.'],
     ['La ARN pol bacteriana es <b>procesativa</b>: no abandona el molde hasta la terminación.', 'Tasa de error de la ARN pol: 1 en 10⁴–10⁵ bases.', 'La ARN pol usa ATP, GTP, CTP y UTP.'],
     ['Pregunta típica: ¿por qué el cebador es de ARN?'])),
 S('La ARN polimerasa bacteriana', 'b', 0, W(tbl_rnap_bact()),
   '<p class="lead">Una sola ARN polimerasa hace todos los ARN.</p><ul><li>Holoenzima ≈500 kDa: <b>α₂ββ′ωσ</b>.</li><li>Sin σ queda el <b>núcleo</b> α₂ββ′ω.</li></ul>',
   N('En bacterias existe un solo tipo de ARN polimerasa para todos los tipos de ARN (descubierta por J. Hurwitz y S. Weiss de forma independiente).',
     ['La holoenzima mide unos 500 kDa y tiene 5 clases de subunidades: α₂ββ′ωσ.', 'Holoenzima α₂ββ′ωσ ⇄ núcleo de la polimerasa α₂ββ′ω + subunidad σ.',
      'Polimeriza 5′→3′, no tiene actividad exonucleasa (no corrige), no necesita cebadores y es procesativa.'],
     ['α (36.5 kD, ×2): inicio de la cadena; interacción con proteínas reguladoras y promotores.', 'β (151 kD): inicio y elongación; centro catalítico. Tiene 2 sitios de unión de NTP: sitio de iniciación (preferentemente A o G) y sitio de elongación.',
      'β′ (155 kD): unión al ADN (molde, hebra sin sentido). ω (11 kD): función desconocida. σ (70 kD): reconoce el promotor.'],
     ['Asocia cada subunidad con su función; β = catalítica, σ = promotor.'])),
 S('Las tres ARN polimerasas eucariotas', 'b', 0, W(tbl_rnap_euk()),
   '<p class="lead">Cada polimerasa reconoce promotores distintos.</p><ul><li>La más importante para proteínas: <b>ARN pol II</b>.</li><li>Su subunidad RPB1 tiene la cola <b>CTD</b>.</li></ul>',
   N('En eucariotas la transcripción la realizan tres ARN polimerasas, cada una con promotores de características específicas.',
     ['<b>Pol I</b>, en el nucléolo: ARNr 18S, 5.8S y 28S (formación de ribosomas).', '<b>Pol II</b>, en el nucleoplasma: precursores del ARNm, algunos snRNA y miRNA.', '<b>Pol III</b>, en el nucleoplasma: ARNt y ARNr 5S.'],
     ['Son complejos grandes de 8 a 12 subunidades y más de 500 kDa. Las mayores de la Pol II son <b>RPB1</b> (220 kD) y <b>RPB2</b>.',
      'El <b>CTD</b> es el dominio carboxilo terminal de RPB1, con múltiples repeticiones de <b>YSPTSPS</b> (Tyr-Ser-Pro-Thr-Ser-Pro-Ser), regulable por fosforilación.',
      '<b>CTD no fosforilado</b>: la Pol II puede iniciar pero no elongar. <b>CTD fosforilado</b>: puede elongar pero no iniciar.'],
     ['Pol I = ARNr grandes; Pol II = ARNm; Pol III = ARNt y 5S.'])),
 S('Ribosoma y ARN de transferencia', 'b', 0, F_ribosoma(),
   '<p class="lead">El ribosoma lee codones; el ARNt es el adaptador.</p><ul><li>Sitios <b>A, P y E</b>.</li><li>El anticodón reconoce el codón.</li></ul>',
   N('Los ribosomas son complejos ribonucleoproteicos que sintetizan proteínas.',
     ['Sitio <b>A</b>: entrada del aminoacil-ARNt.', 'Sitio <b>P</b>: formación del enlace peptídico; contiene la cadena peptídica.', 'Sitio <b>E</b>: salida del ARNt vacío.',
      'El <b>ARNt</b> tiene un anticodón complementario al codón y un extremo 3′ <b>CCA</b> donde se une el aminoácido. Cada ARNt es específico para un aminoácido.'],
     ['Eucariotas: 40S + 60S = 80S. Bacterias: 30S + 50S = 70S.'], ['Sitios A, P, E y su función.'])),
 S('Las piezas de la traducción', 'b', 0, F_mrna(),
   '<p class="lead">ARNm, ARNt y ARNr trabajan juntos.</p><ul><li>El ARNm lleva los codones.</li><li>El ARNr es estructura y <b>catálisis</b>.</li></ul>',
   N('La traducción necesita el mensaje (ARNm), los adaptadores (ARNt), la fábrica (ribosoma con su ARNr) y los aminoácidos activados.',
     ['<b>ARNm</b>: contiene los codones y define el orden de los aminoácidos. Tiene cap 5′, UTR 5′, codón de inicio AUG, región codificante, codón de paro (UAA, UAG, UGA) y cola poli-A.',
      'El ARNm bacteriano es generalmente <b>policistrónico</b>, no tiene cap 5′ ni cola poli-A estable, y contiene la región Shine-Dalgarno, AUG y codones stop.',
      '<b>ARNr</b>: organiza el ribosoma, reconoce el ARNm y cataliza el enlace peptídico. 40S: 18S. 60S: 28S, 5.8S y 5S. Bacteria 30S: 16S; 50S: 23S y 5S.'],
     ['El ARNr <b>28S</b> (y el <b>23S</b> en bacterias) actúa como ribozima peptidil transferasa.', 'Los aminoácidos deben activarse y unirse al ARNt; este proceso consume ATP.'],
     ['Partes del ARNm en orden; ARNr de cada subunidad.'])),
]

L3 = [
 S('Inicio en bacterias: OriC', 'b', 1, F_oric(),
   '<p class="lead">Un solo origen, rico en A-T.</p><ul><li><b>DnaA</b> abre; <b>DnaC</b> carga a la helicasa <b>DnaB</b>.</li><li><b>SSB</b> evitan el reempalme.</li><li>La <b>girasa</b> alivia la tensión.</li></ul>',
   N('En procariotas como E. coli la replicación empieza en un único origen, OriC.',
     ['<b>Identificación del origen</b>: OriC mide aprox. 245 pb y tiene secuencias repetitivas, las <b>cajas DnaA</b>, ricas en A-T (fáciles de separar porque A-T tiene dos puentes de hidrógeno).',
      '<b>Desenrollamiento</b>: DnaA (proteína iniciadora) se une a OriC y desenrolla la doble hélice con ayuda de ATP.', 'DnaC (cargador de helicasa) transporta a DnaB y la coloca en las hebras simples.',
      'DnaB (helicasa) usa ATP para romper los puentes de hidrógeno y separar las hebras.',
      '<b>Prevención del reempalme</b>: las SSB se unen a las hebras simples. La topoisomerasa II (girasa) corta y vuelve a unir el ADN para aliviar el superenrollamiento que genera la helicasa.'],
     ['Gasto: helicasa ≈1 ATP cada 3–5 pares de bases.', 'Gasto: girasa ≈2 ATP por cada corte y religado.'],
     ['Orden: DnaA → DnaC → DnaB → SSB + girasa.'])),
 S('La horquilla de replicación', 'b', 1, F_horquilla(),
   '<p class="lead">Hebra <b>adelantada</b> continua; <b>rezagada</b> en fragmentos.</p><ul><li>La primasa (DnaG) pone cebadores de ≈10 nt.</li><li>Pol III sintetiza 5′→3′.</li></ul>',
   N('En la horquilla, la síntesis es continua en una hebra y discontinua en la otra, porque la polimerasa solo trabaja 5′→3′.',
     ['<b>Cebador</b>: la primasa (DnaG) sintetiza un cebador de ARN de aprox. 10 nucleótidos. Se requiere un solo cebador en la hebra adelantada y múltiples en la rezagada (uno por fragmento de Okazaki).',
      '<b>Síntesis</b>: la holoenzima ADN pol III se une al cebador y sintetiza ADN 5′→3′: continuamente en la hebra líder y de manera discontinua en la rezagada.',
      'Las dos polimerasas se coordinan en un complejo tipo <b>trombón</b>.'],
     ['Gasto: cada ribonucleótido del cebador consume 1 ATP, UTP, CTP o GTP (≈10 ATP por cebador).', 'Gasto: la pol III usa 1 ATP (o su equivalente en dNTP) por nucleótido añadido. Hebra adelantada ≈4.6 millones de ATP (longitud del genoma de E. coli); la rezagada un poco más por los fragmentos de Okazaki.',
      'Eucariotas: MCM (helicasa), RPA, Pol α-primasa, Pol ε (líder), Pol δ (rezagada), PCNA.'],
     ['Explica por qué una hebra es discontinua.'])),
 S('Quitar cebadores y unir fragmentos', 'b', 1, F_okazaki(),
   '<p class="lead">Los cebadores de ARN se reemplazan por ADN y se sellan.</p><ul><li>Bacteria: <b>pol I</b> (exonucleasa 5′→3′).</li><li>Eucariota: <b>RNasa H y FEN1</b>; Pol δ rellena.</li><li><b>Ligasa</b>: enlace fosfodiéster.</li></ul>',
   N('Al final, cada fragmento de Okazaki tiene un cebador de ARN que hay que eliminar, y entre fragmentos queda una mella.',
     ['Bacteria: la <b>ADN pol I</b> elimina los cebadores con su actividad <b>exonucleasa 5′→3′</b> y sintetiza ADN en su lugar.', 'Eucariota: <b>RNasa H y FEN1</b> eliminan los cebadores y la <b>ADN pol δ</b> completa los espacios.',
      'La <b>ligasa</b> sella los fragmentos formando enlaces fosfodiéster; usa NAD⁺ o ATP como fuente de energía (en eucariotas, la <b>ligasa I</b> usa ATP).'],
     ['Gasto: cada nucleótido de ARN removido y reemplazado ≈1 ATP (≈1000 ATP por replicación).', 'Gasto: 1 ATP por cada unión de la ligasa (≈1000 ATP por replicación).'],
     ['Pol I (bacteria) vs RNasa H + FEN1 (eucariota).'])),
 S('Terminación bacteriana: Ter y Tus', 'm', 1, F_ter(),
   '<p class="lead">Las dos horquillas se encuentran en <b>Ter</b>.</p><ul><li>Las proteínas <b>Tus</b> bloquean a la helicasa.</li><li>La <b>topoisomerasa IV</b> separa los cromosomas entrelazados.</li></ul>',
   N('Como el cromosoma bacteriano es circular, las dos horquillas que salen de OriC se encuentran en el lado opuesto.',
     ['La replicación termina en las regiones <b>Ter</b>, donde las proteínas <b>Tus</b> bloquean a la helicasa.', 'Los dos cromosomas hijos quedan entrelazados (<b>catenados</b>).',
      'La <b>topoisomerasa IV</b> corta los cromosomas entrelazados y los separa.'],
     ['Gasto: la topoisomerasa IV consume ATP para cortar y religar (≈100 ATP).'], ['Ter + Tus = terminación bacteriana; topo IV separa.'])),
 S('Replicación en eucariotas', 'b', 1, F_euk_rep(),
   '<p class="lead">Muchos orígenes y más proteínas.</p><ul><li>Pre-RC: <b>ORC, Cdc6, Cdt1, MCM</b>.</li><li>Cebador híbrido ARN-ADN de Pol α.</li><li><b>PCNA</b> = abrazadera.</li></ul>',
   N('La replicación eucariota sigue los mismos principios, pero es más compleja por la cromatina, los múltiples orígenes y los telómeros.',
     ['<b>Inicio</b>: cada cromosoma tiene cientos o miles de orígenes, con secuencias menos conservadas que en procariotas (por ejemplo, ARS en levaduras). Antes de la fase S se forma el <b>complejo de pre-replicación (pre-RC)</b>.',
      'ORC se une al origen y recluta otras proteínas; Cdc6 y Cdt1 ayudan a cargar la helicasa MCM (requieren ATP).',
      '<b>Desenrollamiento</b>: MCM separa las hebras con ATP; RPA se une a las hebras simples; topoisomerasas I y II alivian la tensión.',
      '<b>Cebador</b>: la ADN pol α con primasa sintetiza un cebador híbrido (≈10 nt de ARN + ≈20 nt de ADN); uno en la líder y varios en la rezagada.',
      '<b>Síntesis</b>: Pol δ sintetiza la rezagada y Pol ε la líder; ambas corrigen (exonucleasa 3′→5′). <b>PCNA</b> las mantiene unidas al ADN (equivale a β).',
      '<b>Terminación</b>: RNasa H y FEN1 quitan cebadores, Pol δ rellena, ligasa I sella; la telomerasa resuelve los extremos.'],
     ['Gasto: MCM ≈1 ATP cada 3–5 pb; topoisomerasa ≈2 ATP por corte; 1 ATP o GTP por ribonucleótido del cebador (≈10 por cebador); 1 ATP por nucleótido de ADN.', 'Hebra líder ≈6 000 000 nt en humanos → ≈6 millones de ATP; fragmentos de Okazaki de 100–200 nt.'],
     ['Equivalencias: DnaB↔MCM, SSB↔RPA, DnaG↔Pol α-primasa, pol III↔δ/ε, β↔PCNA, pol I↔RNasa H + FEN1.'])),
 S('Telómeros y telomerasa', 'm', 3, F_telo(),
   '<p class="lead">El extremo del cromosoma no se copia completo.</p><ul><li>La <b>telomerasa</b> es una transcriptasa inversa con su propio ARN molde.</li><li>Muchos cánceres la reactivan.</li></ul>',
   N('En cada replicación los extremos de los cromosomas lineales se acortan, porque al quitar el último cebador de la hebra rezagada no hay de dónde extender.',
     ['La <b>telomerasa</b>, una transcriptasa inversa con su propio ARN molde, extiende los telómeros añadiendo repeticiones (TTAGGG en humanos) al extremo 3′.', 'Usa dNTP: ≈1 ATP por nucleótido añadido; el gasto total es variable porque depende del alargamiento.'],
     ['Los procariotas no tienen telomerasa (ADN circular).'],
     ['Explica por qué los telómeros se acortan.'], clinica='La mayoría de las células somáticas casi no tienen telomerasa y sus telómeros se acortan hasta la senescencia; la mayoría de los cánceres la reactivan y se dividen sin límite (Alberts).')),
 S('El costo energético de replicar', 'm', 2, F_energia(),
   '<p class="lead">Casi todo el gasto es la polimerización.</p><ul><li>E. coli: ≈4.6 millones de ATP.</li><li>Humano: ≈6 millones de ATP.</li></ul>',
   N('El resumen del profesor estima cuánta energía cuesta cada paso. Son aproximaciones expresadas en "ATP equivalentes".',
     None, None, None,
     tabla=(['Proceso (E. coli)', 'ATP aprox.'], [['Apertura (helicasa)', '≈10 000'], ['Superenrollamiento (girasa)', '≈2 000'], ['Cebadores (primasa)', '≈1 000'], ['Polimerización (pol III)', '≈4 600 000'], ['Quitar cebadores y reparar (pol I)', '≈1 000'], ['Unir Okazaki (ligasa)', '≈1 000'], ['Terminación (topo IV)', '≈100'], ['<b>Total</b>', '<b>≈4.6 millones</b>']]),
     extra=[('Eucariotas', '<table><tr><th>Proceso</th><th>ATP aprox.</th></tr><tr><td>Iniciación (ORC, Cdc6, Cdt1, helicasa)</td><td>≈10 000</td></tr><tr><td>Topoisomerasas</td><td>≈2 000</td></tr><tr><td>Cebadores (primasa y pol α)</td><td>≈1 000</td></tr><tr><td>Polimerización (pol δ y ε)</td><td>≈6 000 000</td></tr><tr><td>Quitar cebadores (RNasa H y FEN1)</td><td>≈1 000</td></tr><tr><td>Unir Okazaki (ligasa I)</td><td>≈1 000</td></tr><tr><td>Telomerasa</td><td>Variable</td></tr><tr><td><b>Total</b></td><td><b>≈6 millones</b></td></tr></table>'),
            ('Para entenderlo', 'En realidad la energía de la polimerización viene del propio dNTP: al unirse libera pirofosfato. El resumen lo expresa como "1 ATP por nucleótido" para poder compararlo. Aunque el gasto es mayor en eucariotas, es esencial para la fidelidad y la estabilidad del genoma.')])),
 S('Comparar la replicación', 'b', 3, W(tbl_rep_comp()), '',
   N('Esta tabla resume todas las diferencias de replicación del material del profesor.',
     ['Procariotas: un origen (OriC), ADN circular, rápida (≈1000 nt/s), DnaB, SSB, DnaG, pol III, pol I, abrazadera β, Okazaki de 1000–2000 nt, terminación en Ter/Tus, sin telomerasa.',
      'Eucariotas: múltiples orígenes, ADN lineal, más lenta (≈50 nt/s), MCM, RPA, Pol α + primasa, Pol δ y ε, RNasa H y FEN1, PCNA, Okazaki de 100–200 nt, telomerasa en los extremos.'],
     None, ['Es una de las tablas más preguntadas: apréndela por pares de equivalentes.']), wide=True),
]

L4 = [
 S('Transcripción bacteriana: el factor σ', 'b', 1, F_promotor(),
   '<p class="lead">σ reconoce el promotor: <b>−35</b> y <b>−10</b>.</p><ul><li>Complejo cerrado → abierto (17 bases).</li><li>Tras 6–10 nt, σ se separa.</li></ul>',
   N('La transcripción tiene tres fases (iniciación, elongación, terminación). La iniciación identifica el inicio de la unidad transcripcional y define el sentido de la transcripción.',
     ['Unión débil de la ARN polimerasa al ADN y desplazamiento en búsqueda de promotores.', 'Detección de las secuencias −35 y −10 por la subunidad σ: proceso rápido; se forma el <b>complejo promotor cerrado</b> (ADN sin desenrollar).',
      'La polimerasa separa las dos hebras por la región −10 (rica en A-T). El desenrollamiento abarca <b>17 bases</b>.', 'Se forma el <b>complejo promotor abierto</b> (muy estable) y empieza la transcripción.',
      'Tras polimerizar 6–10 nucleótidos, σ se separa de la holoenzima y busca nuevos promotores; el núcleo sigue añadiendo nucleótidos.'],
     ['Promotor: secuencias del ADN en el extremo 5′ de la unidad que determinan la localización y el sentido. Consenso: <b>TTGACA(T)</b> en −35 y <b>TATAAT</b> (caja de Pribnow) en −10; +1 = primera base transcrita.',
      'Factores σ de E. coli: <b>σ70</b> reconoce −35 y −10; <b>σ32</b> genes de choque térmico; <b>σ54</b> genes de asimilación de nitrógeno.', 'α se une a secuencias reguladoras; β une NTP y forma enlaces fosfodiéster (2 sitios: iniciación, preferentemente A o G, y elongación); β′ se une al molde (hebra sin sentido, −).',
      'No necesita cebador: el ARN empieza en 5′ con una purina trifosfato (pppG o pppA). El 3′-OH ataca al fosfato α del NTP entrante y forma el enlace fosfodiéster 5′→3′.'],
     ['Consenso −35/−10 y los 5 pasos de la iniciación.'])),
 S('Elongación bacteriana', 'b', 1, F_elong_bact(),
   '<p class="lead">La burbuja de transcripción avanza por el ADN.</p><ul><li>Híbrido ARN-ADN de <b>8–10 pb</b>.</li><li>La girasa elimina el superenrollamiento.</li></ul>',
   N('La elongación comienza tras formarse el primer enlace fosfodiéster.',
     ['Tras 6–10 nucleótidos, σ se separa: <b>despeje del promotor</b>.', 'La <b>burbuja de transcripción</b> (ARN polimerasa, ADN molde y ARN naciente) se desplaza por el ADN.',
      'Dentro hay un <b>híbrido ADN-ARN de 8–10 pb</b> con estructura de ADN-A. Su longitud y la del ADN desenrollado se mantienen constantes mientras avanza.',
      'El ADN se desenrolla delante de la burbuja y se vuelve a enrollar detrás; esto lo cataliza la <b>topoisomerasa II (ADN girasa)</b>.'],
     ['La ARN polimerasa tiene pobre actividad nucleasa: tasa de error de 1 en 10⁴–10⁵ bases.'], ['Híbrido de 8–10 pb; girasa; tasa de error.'])),
 S('Dos formas de terminar', 'b', 1, F_termin(),
   '<p class="lead">Independiente o dependiente de <b>rho (ρ)</b>.</p><ul><li>Horquilla G-C + cola de U.</li><li>Rho: hexámero con ATPasa.</li></ul>',
   N('Al terminar se paraliza la formación de enlaces fosfodiéster, se separa el híbrido ARN-ADN, se rebobina el ADN y se libera la polimerasa.',
     ['<b>Independiente de rho</b>: el ADN tiene secuencias de parada: una región palindrómica rica en GC seguida de otra rica en AT.', 'El ARN forma una <b>horquilla</b> por complementariedad en la región palindrómica, seguida de una <b>cola de poli-U</b>.',
      'Las uniones U-A (ARN-ADN) son poco estables: el híbrido se separa, se libera el ARN y se cierra la burbuja. Sin σ, el núcleo tiene menos afinidad por el ADN bicatenario y se separa.',
      '<b>Dependiente de rho</b>: rho es un <b>hexámero con actividad ATPasa</b>. Se une al ARN en una secuencia de <b>72 nucleótidos</b> (12 por subunidad) y se activa.', 'Con su ATPasa se desplaza por el ARN, debilita la interacción entre molde y transcrito y provoca su separación.'],
     None, ['Compara ambos mecanismos.'])),
 S('Complejo de preiniciación', 'b', 1, F_pic(),
   '<p class="lead">La ARN pol II no reconoce sola al promotor.</p><ul><li>Necesita los <b>factores generales TFII</b>.</li><li>Juntos forman el <b>aparato básico de transcripción</b>.</li></ul>',
   N('En eucariotas los nucleosomas reprimen la transcripción de todos los genes: solo se transcriben los activados. La ARN pol II no reconoce los promotores; necesita factores de transcripción.',
     ['<b>Promotor</b> (lado 5′ del inicio): caja <b>TATA</b> hacia −25 en la mayoría de los promotores de ARNm; otras secuencias entre −40 y −110 (<b>caja GC y CAAT</b>).',
      'Los factores se unen primero a una secuencia del ADN, luego entre ellos y a la polimerasa.', '1) TFIID se une a TATA mediante TBP. 2) Se unen TFIIA y TFIIB. 3) Se recluta la ARN pol II unida a TFIIF.',
      '4) Se unen TFIIE y TFIIH: complejo cerrado. TFIIH abre la doble hélice (helicasa), forma la burbuja y fosforila el CTD (cinasa).', '5) La fosforilación del CTD promueve la separación de la Pol II del promotor y la elongación continúa.'],
     ['Aparato básico = ARN pol II + factores generales (TFII…).', 'La caja TATA es el sitio de reconocimiento de TBP y ayuda a posicionar a la polimerasa.'],
     ['Orden de ensamblaje y doble función de TFIIH.'])),
 S('Factores generales de transcripción', 'b', 2, W(tbl_tf()),
   '<p class="lead">Cada factor TFII tiene un papel preciso.</p><ul><li>TFIID/TBP: reconocen TATA.</li><li>TFIIH: abre el ADN y fosforila el CTD.</li></ul>',
   N('Estos factores son proteínas necesarias para iniciar la transcripción por la ARN pol II.',
     ['TFIID reconoce la caja TATA; TBP es su subunidad que se une al ADN.', 'TFIIA estabiliza la unión; TFIIB posiciona a la ARN polimerasa.', 'TFIIF recluta a la ARN pol II; TFIIE recluta a TFIIH.', 'TFIIH desenrolla el ADN y fosforila la ARN pol II (CTD).'],
     None, ['Relaciona cada TFII con su función.'])),
 S('El CTD coordina el procesamiento', 'm', 1, F_ctd(),
   '<p class="lead">La cola CTD cambia de fosfatos según la etapa.</p><ul><li><b>Ser5-P</b>: recluta enzimas del cap.</li><li>Después: splicing y poli-A.</li></ul>',
   N('El CTD de la ARN pol II es la plataforma que acopla transcripción y procesamiento.',
     ['El CTD tiene múltiples repeticiones de Tyr-Ser-Pro-Thr-Ser-Pro-Ser.', 'Sin fosforilar, la Pol II puede iniciar pero no elongar; fosforilado, puede elongar pero no iniciar.',
      'Cuando TFIIH fosforila principalmente la <b>Ser5</b>, se reclutan las enzimas de capping y comienza el procesamiento co-transcripcional.', 'El CTD coordina capping, splicing y poliadenilación mientras el ARN aún se sintetiza.'],
     ['La fosforilación de la Ser2 durante la elongación, que recluta factores de splicing y poli-A, es dato del Alberts.'], ['Ser5-P → cap.'])),
 S('Elongación y terminación en eucariotas', 'b', 1, F_euk_term(),
   '<p class="lead">La Pol II avanza entre nucleosomas.</p><ul><li><b>FACT</b> desplaza histonas.</li><li>La señal <b>AAUAAA</b> marca el corte.</li></ul>',
   N('Durante la elongación la ARN pol II avanza sobre la hebra molde e incorpora ribonucleótidos complementarios en dirección 5′→3′.',
     ['Proteínas de elongación: <b>FACT</b> desplaza histonas; <b>topoisomerasas</b> eliminan el superenrollamiento; otras proteínas estabilizan a la Pol II.',
      'Terminación: la Pol II reconoce la señal de poliadenilación <b>AAUAAA</b>, que marca el sitio de corte. Luego se libera el ARN y la polimerasa se separa.'],
     ['La transcripción eucariota también suele empezar por A o G.', 'La terminación es poco conocida en eucariotas.', 'En algunos transcritos existe la horquilla seguida de residuos de uracilo.', 'La mayoría de los ARNm eucariotas maduran (cola poli-A en 3′ y otras modificaciones).'],
     ['Complementariedad: A→U, T→A, G→C, C→G.'])),
 S('Procesamiento del pre-ARNm', 'b', 1, F_proc(),
   '<p class="lead">Tres modificaciones antes de salir del núcleo.</p><ul><li><b>Cap 5′</b> · <b>splicing</b> · <b>cola poli-A</b>.</li><li>Ocurren mientras se transcribe.</li></ul>',
   N('En eucariotas el ARN recién sintetizado debe madurar. Las tres modificaciones necesitan proteínas de reconocimiento, complejos y enzimas específicas, y las coordina el CTD.',
     ['<b>Cap 5′</b>: 7-metilguanosina en el extremo 5′, colocada a los 20–30 nt.', '<b>Splicing</b>: el espliceosoma elimina intrones y une exones.', '<b>Cola poli-A</b>: 50–250 adeninas añadidas por la poli-A polimerasa.'],
     None, ['Los tres pasos y su función general.'])),
 S('El CAP 5′ paso a paso', 'b', 1, F_cap(),
   '<p class="lead">Tres enzimas forman m⁷GpppN.</p><ul><li>Trifosfatasa → guanilil transferasa → metiltransferasa (SAM).</li><li>Enlace <b>5′-5′ trifosfato</b>.</li></ul>',
   N('El CAP es una 7-metilguanosina unida al primer nucleótido por un enlace 5′-5′ trifosfato. Se agrega cuando el ARN tiene ≈20–30 nucleótidos; la señal es la fosforilación de la Ser5 del CTD por TFIIH.',
     ['<b>ARN trifosfatasa</b>: remueve un fosfato del extremo 5′: pppN → ppN.', '<b>Guanilil transferasa</b>: añade GMP y forma GpppN (enlace 5′-5′).', '<b>Metiltransferasa</b>: metila la guanina; el donador es la <b>S-adenosilmetionina (SAM)</b>. Producto: m⁷GpppN.'],
     ['Proteínas asociadas: <b>CBC</b> (Cap Binding Complex) reconoce el CAP; <b>eIF4E</b> se une al CAP en la traducción; complejos exportadores lo llevan fuera del núcleo.'],
     ['Las tres enzimas en orden y el donador de metilo.'],
     tabla=(['Función del CAP', 'Importancia'], [['Protección', 'Evita degradación por exonucleasas'], ['Traducción', 'Reconocimiento ribosomal'], ['Exportación', 'Salida del núcleo'], ['Splicing', 'Favorece el procesamiento']]))),
 S('La cola poli-A paso a paso', 'b', 1, F_polya(),
   '<p class="lead">Se corta el ARN y se añaden 50–250 A.</p><ul><li>CPSF (AAUAAA) y CstF (GU/U).</li><li>PAP sin molde · PABPN1.</li></ul>',
   N('La poliadenilación ocurre al final de la transcripción del pre-ARNm y consiste en agregar una cola de adeninas.',
     ['<b>CPSF</b> (factor de especificidad de corte y poliadenilación) reconoce <b>AAUAAA</b>, ubicada ≈10–30 nt antes del sitio de corte, y recluta proteínas de corte.',
      '<b>CstF</b> (factor de estimulación del corte) reconoce la región rica en <b>GU/U</b> después del sitio de corte y estimula el corte.', '<b>CFI y CFII</b> ayudan a cortar el ARN.',
      '<b>Poli-A polimerasa (PAP)</b> agrega adeninas al 3′: no usa molde y usa ATP como sustrato (ATP → AMP + PPᵢ).', '<b>PABPN1</b> se une a la cola, la estabiliza y regula su longitud.'],
     None, ['Los 5 pasos y quién reconoce cada señal.'],
     tabla=(['Función de la cola', 'Resultado'], [['Estabilidad', 'Mayor vida media'], ['Protección', 'Evita degradación'], ['Traducción', 'Facilita unión ribosomal'], ['Exportación', 'Transporte nuclear']]))),
 S('Splicing: corte y empalme', 'b', 1, F_splice(),
   '<p class="lead">El espliceosoma quita intrones y une exones.</p><ul><li>U1: sitio 5′ · U2: ramificación.</li><li>U4/U6: corte · U5: une exones.</li></ul>',
   N('El splicing elimina los intrones y une los exones. Lo hace el espliceosoma, formado por snRNA y proteínas (snRNP).',
     ['<b>U1</b> reconoce el sitio 5′ del intrón.', '<b>U2</b> reconoce el punto de ramificación.', '<b>U4/U6</b> catalizan el corte.', '<b>U5</b> une los exones.'],
     ['Los dinucleótidos GU (5′) y AG (3′) y la salida del intrón en lazo son explicación del Alberts.'], ['Función de cada snRNP.'])),
 S('Splicing alternativo', 'm', 3, F_alt(),
   '<p class="lead">Un gen puede producir varias proteínas.</p><ul><li>Se combinan exones de forma distinta.</li><li>Diversidad proteica y especialización celular.</li></ul>',
   N('El splicing alternativo permite producir diferentes proteínas a partir de un mismo gen.',
     ['Según el tejido o la señal, el espliceosoma incluye u omite ciertos exones.'], ['Importancia: diversidad proteica y especialización celular.'], ['Define splicing alternativo y su importancia.'])),
]

L5 = [
 S('Activar los aminoácidos', 'b', 1, F_aa(),
   '<p class="lead">La <b>aminoacil-ARNt sintetasa</b> carga cada ARNt.</p><ul><li>Gasta ATP.</li><li>Una sintetasa por aminoácido: <b>fidelidad</b>.</li></ul>',
   N('Antes de traducir, cada aminoácido debe activarse y unirse a su ARNt. Este paso garantiza que el código se lea correctamente.',
     ['Reacción: aminoácido + ARNt + ATP → aminoacil-ARNt (se liberan AMP + PPᵢ).', 'Existe una sintetasa para cada aminoácido.',
      'En bacterias el iniciador es <b>N-formilmetionina (fMet)</b>: la metionil-ARNt sintetasa une metionina al ARNt iniciador y la <b>transformilasa</b> agrega un grupo formilo → fMet-ARNtᶠᴹᵉᵗ.'],
     None, ['Reacción de activación y formación de fMet.'])),
 S('Inicio de la traducción', 'b', 1, F_inicio(),
   '<p class="lead">Encontrar el AUG correcto.</p><ul><li>Bacteria: <b>Shine-Dalgarno</b> + ARNr 16S.</li><li>Eucariota: <b>cap</b> + barrido.</li></ul>',
   N('El inicio coloca al ribosoma en el AUG correcto para leer el marco de lectura.',
     ['<b>Eucariotas</b>: 1) eIF4 reconoce el cap 5′. 2) La 40S se une al ARNm. 3) El complejo escanea hasta el AUG. 4) Se reconoce el codón de inicio. 5) Se une la 60S. 6) Se forma el ribosoma 80S.',
      'Complejo iniciador eucariota: 40S + ARNm + Met-ARNt iniciador + factores eIF + GTP.',
      '<b>Bacterias</b>: 1) la 30S se une al ARNm y reconoce Shine-Dalgarno mediante el ARNr 16S. 2) IF2-GTP lleva fMet-ARNt directamente al <b>sitio P</b>. 3) Se forma el complejo de iniciación (ARNm, 30S, IF1, IF2-GTP, IF3, fMet-ARNt). 4) Se une la 50S, se hidroliza GTP, se liberan los IF y se forma el 70S.'],
     ['Shine-Dalgarno: secuencia rica en purinas antes del AUG; se aparea con el ARNr 16S.'], ['Diferencias del inicio entre bacteria y eucariota.'])),
 S('Los factores de la traducción', 'b', 2, W(tbl_fact_trad()), '',
   N('Esta tabla junta los factores de inicio, elongación, terminación y reciclaje de bacterias y eucariotas.',
     ['eIF4F tiene eIF4E (reconoce el cap), eIF4G (andamio) y eIF4A (helicasa): desenrolla estructuras secundarias del ARNm y recluta al ribosoma.', 'eIF5 estimula la hidrólisis de GTP para ensamblar el ribosoma completo.',
      'EF-Ts regenera a EF-Tu.', 'RF1 reconoce UAA y UAG; RF2 reconoce UAA y UGA; eRF1 reconoce los tres.'],
     None, ['Equivalencias: IF2↔eIF2, EF-Tu↔eEF1A, EF-G↔eEF2, RF1/RF2↔eRF1, RF3↔eRF3.']), wide=True),
 S('El ciclo de elongación', 'b', 1, F_elong(),
   '<p class="lead">Entrada, enlace peptídico y translocación.</p><ul><li>El enlace lo forma el <b>ARNr</b>.</li><li>Se repite por cada aminoácido.</li></ul>',
   N('La elongación añade aminoácidos uno a uno.',
     ['<b>Entrada</b>: EF-Tu + GTP (eEF1A en eucariotas) lleva el aminoacil-ARNt al sitio A. Si el apareamiento codón-anticodón es correcto, se hidroliza GTP y EF-Tu se libera.',
      '<b>Enlace peptídico</b>: la actividad peptidil transferasa del ARNr 23S (28S en eucariotas) transfiere la cadena del sitio P al aminoácido del sitio A.',
      '<b>Translocación</b>: EF-G + GTP (eEF2) desplazan el ribosoma un codón: el ARNt del sitio A pasa a P y el de P pasa a E.'],
     None, ['Los tres pasos con sus factores.'])),
 S('Terminación y reciclaje', 'b', 1, F_term_trad(),
   '<p class="lead">Un codón stop en el sitio A detiene la síntesis.</p><ul><li>No hay ARNt para UAA, UAG, UGA.</li><li>Factores de liberación + GTP.</li></ul>',
   N('La terminación ocurre al llegar un codón stop al sitio A.',
     ['1) El codón stop entra al sitio A. 2) Se une el factor de liberación (RF1/RF2 en bacterias; eRF1 en eucariotas). 3) Se rompe el enlace entre la proteína y el ARNt. 4) Se libera la proteína. 5) El ribosoma se disocia.',
      'RF3 (eRF3) usa GTP y ayuda a la liberación.', 'Reciclaje bacteriano: <b>RRF</b> recicla el ribosoma, <b>EF-G</b> separa las subunidades e <b>IF3</b> las mantiene separadas.'],
     None, ['RF1: UAA/UAG · RF2: UAA/UGA.'])),
 S('La energía de la traducción', 'b', 2, F_energia_trad(),
   '<p class="lead">ATP para activar; GTP para todo lo demás.</p><ul><li>La traducción es muy costosa.</li></ul>',
   N('La traducción usa dos fuentes de energía.',
     ['<b>ATP</b>: activación de aminoácidos y unión aminoácido-ARNt.', '<b>GTP</b>: inicio, entrada de ARNt, translocación y terminación.'],
     ['Según el Alberts, cada aminoácido añadido cuesta unos 4 enlaces de alta energía (2 en la activación y 2 GTP en la elongación).'], ['Qué usa ATP y qué usa GTP.'])),
 S('Polisomas', 'b', 2, F_polisoma(),
   '<p class="lead">Varios ribosomas sobre un mismo ARNm.</p><ul><li>Más eficiencia.</li><li>En bacterias, acoplado a la transcripción.</li></ul>',
   N('Un polisoma son varios ribosomas traduciendo al mismo tiempo un mismo ARNm.',
     ['Su función es aumentar la eficiencia de la síntesis proteica.', 'En bacterias el ARNm comienza a traducirse antes de terminar su síntesis (acoplamiento transcripción-traducción), lo que aumenta la velocidad de respuesta.'],
     None, ['Define polisoma y acoplamiento.'])),
 S('Proteínas que van al RER', 'b', 1, F_srp(),
   '<p class="lead">El <b>péptido señal</b> dirige al ribosoma al RER.</p><ul><li><b>SRP</b> lo reconoce y pausa la traducción.</li><li>Receptor de SRP y translocón <b>Sec61</b>.</li></ul>',
   N('Las proteínas que se secretan o que van a la membrana se terminan de sintetizar en el RER.',
     ['<b>Péptido señal</b>: secuencia hidrofóbica inicial de la proteína.', '<b>SRP</b> (partícula de reconocimiento de señal) reconoce el péptido señal y pausa temporalmente la traducción.',
      'El <b>receptor de SRP</b>, en la membrana del RER, recibe el complejo.', 'El <b>translocón Sec61</b> es el canal por donde la proteína entra al RER.'],
     None, ['Orden: péptido señal → SRP → receptor → Sec61.'])),
 S('Plegamiento y modificaciones', 'b', 2, F_pliegue(),
   '<p class="lead">Después de traducir, la proteína se pliega y se modifica.</p><ul><li><b>Hsp70 y Hsp60</b>: chaperonas.</li><li>Modificaciones postraduccionales.</li></ul>',
   N('Una cadena recién hecha todavía no es funcional: debe plegarse y, a veces, modificarse.',
     ['Las <b>chaperonas moleculares</b> (Hsp70, Hsp60) evitan la agregación, facilitan el plegamiento y ayudan a las proteínas recién sintetizadas.'],
     None, ['Asocia cada modificación con su función.'],
     tabla=(['Modificación', 'Función'], [['Fosforilación', 'Regulación'], ['Glucosilación', 'Señalización'], ['Acetilación', 'Estabilidad'], ['Hidroxilación', 'Colágeno'], ['Ubiquitinación', 'Degradación']]))),
]

L6 = [
 S('El núcleo separa los procesos', 'b', 3, F_euc(),
   '<p class="lead">En eucariotas, transcripción y traducción ocurren en lugares distintos.</p><ul><li>En bacterias son simultáneas.</li><li>El núcleo permite procesar el ARN.</li></ul>',
   N('En la célula eucariota la transcripción ocurre en el núcleo y la traducción en el citoplasma; en bacterias son procesos simultáneos.',
     ['La cromatina con el promotor tiene que hacerse accesible a la maquinaria de transcripción.', 'La transcripción la hacen 3 ARN polimerasas.', 'La regulación es más compleja: participan numerosos factores de transcripción.', 'El ARN eucariota sufre un extenso procesamiento y maduración.'],
     None, ['Por qué la transcripción eucariota es más compleja.'])),
 S('Procariotas frente a eucariotas', 'b', 3, W(tbl_pro_euc()), '',
   N('Resumen de las diferencias de transcripción y traducción de los resúmenes del profesor.',
     ['Transcripción: lugar, número de polimerasas, intrones, CAP y poli-A, splicing y acoplamiento con la traducción.', 'Traducción: ribosoma, señal de inicio, primer aminoácido, factores, lugar y tipo de ARNm.'],
     None, ['Tabla muy preguntada: domina cada fila.']), wide=True),
 S('Replicar una sola vez por ciclo', 'm', 2, F_licencia(),
   '<p class="lead">Los orígenes se <b>licencian</b> en G1 y se disparan en S.</p><ul><li>ORC, Cdc6 y Cdt1 cargan MCM.</li></ul>',
   N('El complejo de pre-replicación (pre-RC) se forma antes de la fase S.',
     ['ORC se une al origen y recluta otras proteínas.', 'Cdc6 y Cdt1, con ATP, cargan la helicasa MCM.', 'En la fase S la helicasa se activa y se abre la horquilla.'],
     ['La activación por CDK/DDK y que la licencia no se renueva hasta el siguiente G1 son datos del Alberts que explican por qué cada origen se usa una sola vez.'], ['Componentes del pre-RC.'])),
 S('Encender un gen eucariota', 'b', 2, F_activ(),
   '<p class="lead">Transactivadores, coactivadores y aparato básico.</p><ul><li>El ADN forma un <b>bucle</b>.</li><li>Los enhancers aumentan la expresión ≈100 veces.</li></ul>',
   N('El complejo basal no basta para una transcripción rápida. Los <b>enhancers</b> aumentan unas 100 veces la expresión de un gen, incluso a miles de pares de bases de distancia; las secuencias represoras tienen el efecto opuesto.',
     ['<b>Paso 1</b>: los transactivadores de unión al ADN (DBT) se unen a los enhancers.', '<b>Paso 2</b>: los DBT se unen a coactivadores con actividad <b>HAT</b> (histona acetiltransferasa) y la cromatina se remodela.',
      '<b>Paso 3</b>: los DBT interactúan con TFIID, lo que permite que TBP se una a la caja TATA.', '<b>Paso 4</b>: se une la ARN pol II y se forma el complejo básico de transcripción.', '<b>Paso 5</b>: inicia la transcripción.'],
     ['<b>Transactivadores</b>: proteínas modulares con 1) dominio de unión al ADN (enhancers) y 2) dominio de unión a coactivadores. Aumentan la frecuencia de inicio de la Pol II vía coactivadores.',
      '<b>Coactivadores</b>: necesarios para ensamblar el aparato básico. Comunican a la Pol II con los transactivadores e integran señales de activadores y represores. Dos tipos: a) remodelan la cromatina (acetilación por HAT, metilación, fosforilación…); b) interaccionan con la Pol II.',
      '<b>Mediador</b>: complejo que conecta factores reguladores con la Pol II y facilita el ensamblaje.', 'El modelo más aceptado: un <b>bucle</b> del ADN acerca el potenciador al promotor.',
      'Los activadores acetilan histonas; los represores las desacetilan. En el resumen de la presentación participan proteínas HMG que ayudan a doblar el ADN.'],
     ['Los 5 pasos de activación en orden.'])),
 S('Mecanismos de regulación', 'b', 2, W(tbl_reg()),
   '<p class="lead">La expresión se ajusta en la cromatina.</p><ul><li><b>HAT</b> relaja; <b>HDAC</b> compacta.</li><li>Activadores en enhancers; represores en silencers.</li></ul>',
   N('La expresión génica se regula sobre todo controlando el acceso de la maquinaria al ADN.',
     ['<b>Histonas y remodeladores</b> permiten o impiden el acceso al ADN.', '<b>HAT</b> acetila histonas y relaja la cromatina; <b>HDAC</b> las desacetila y compacta el ADN.',
      '<b>Activadores</b> aumentan la transcripción; <b>represores</b> la disminuyen o bloquean. Se unen a enhancers y silencers.', '<b>Metilación del ADN</b>: silenciamiento.'],
     None, ['Acetilación = activación; metilación del ADN = silenciamiento.'])),
]

L7 = [
 S('Inhibidores de la transcripción', 'b', 4, W(tbl_inhib_tx()), '',
   N('Cuatro inhibidores de la transcripción del material del profesor; cada uno actúa en un punto distinto.',
     ['<b>Rifampicina</b>: antibiótico que inhibe la ARN pol procariota y no la eucariota; se une a β, bloquea la elongación e impide el desalojo del promotor.',
      '<b>α-amanitina</b>: toxina octapeptídica de <i>Amanita phalloides</i>; inhibe sobre todo la Pol II (complejo 1:1) e impide la elongación.',
      '<b>Cordicepina</b>: antitumoral; terminador de cadena porque no tiene 3′-OH para continuar.', '<b>Actinomicina D</b>: se une al ADN de doble hélice; inhibe transcripción y replicación; antibiótico y quimioterapia.'],
     None, ['Para cada uno: origen, blanco y mecanismo.'], clinica='La rifampicina se usa contra la tuberculosis; la intoxicación por <i>Amanita</i> daña sobre todo el hígado (Alberts).'), wide=True),
 S('Antibióticos contra la traducción', 'b', 4, W(tbl_antib()),
   '<p class="lead">Atacan diferencias entre bacteria y humano.</p><ul><li>Ribosoma 70S frente a 80S.</li><li>*Quinolonas: dato del Alberts.</li></ul>',
   N('Muchos antibióticos actúan sobre el ribosoma bacteriano, que es distinto del humano.',
     ['<b>Tetraciclinas</b>: bloquean el sitio A.', '<b>Aminoglucósidos</b>: alteran la lectura de codones.', '<b>Cloranfenicol</b>: inhibe la peptidil transferasa.', '<b>Macrólidos</b>: bloquean la translocación.', '<b>Puromicina</b>: terminación prematura.'],
     ['Las quinolonas (girasa y topoisomerasa IV) y las subunidades 30S/50S no vienen en el resumen del profesor; son del Alberts.'], ['Antibiótico ↔ paso que bloquea.'])),
 S('Un error de splicing: β-talasemia', 'm', 4, F_talas(),
   '<p class="lead">Una mutación en un sitio de corte altera el ARNm.</p><ul><li>Menos β-globina funcional.</li><li>Anemia.</li></ul>',
   N('El resumen de transcripción relaciona las alteraciones del splicing con la β-talasemia.',
     ['Una mutación cambia un sitio de corte del gen de β-globina.', 'El espliceosoma reconoce mal el límite del intrón y parte de él queda en el ARNm.', 'Se produce poca o ninguna β-globina funcional: anemia.'],
     ['El dibujo es esquemático: hay muchas mutaciones distintas que causan β-talasemia.'], ['Mecanismo: splicing → ARNm anómalo → déficit de β-globina.'])),
 S('Transcripción y enfermedad', 'b', 4, W(tbl_clin()),
   '<p class="lead">Fallas en la transcripción causan enfermedad.</p><ul><li>Cáncer, β-talasemia, xeroderma pigmentoso.</li></ul>',
   N('Importancia clínica de la transcripción según el resumen del profesor.',
     ['Mutaciones en factores de transcripción → <b>cáncer</b>.', 'Alteraciones del splicing → <b>β-talasemia</b>.', 'Defectos en reparación/transcripción → <b>xeroderma pigmentoso</b>.', 'Desregulación epigenética → <b>tumores</b>.'],
     ['*La reactivación de la telomerasa en el cáncer es dato del Alberts.'], ['Relaciona alteración ↔ enfermedad.'])),
]

DECK = dict(
  page_title='Dogma central', materia='Biología Celular', title='El dogma central',
  subtitle='Replicación, transcripción y traducción en procariotas y eucariotas',
  cover_notes=N('Esta presentación explica el dogma central: cómo la información del ADN se copia (replicación), se transcribe a ARN (transcripción) y se traduce a proteína (traducción).',
     None, ['Fuente principal: los cuatro documentos del profesor (Replicación, Transcripción, Traducción y la presentación "Tema 16. Transcripción").', 'Complemento: Alberts, Biología molecular de la célula.']),
  index_notes=N('Ruta en siete niveles: fundamentos, piezas, replicación, transcripción, traducción, integración y regulación, y clínica.', None, ['"Básico" = imprescindible. "Un paso más" = profundización.']),
  levels=[
    dict(name='Fundamentos', desc='Qué fluye y en qué dirección', intro='La información fluye del ADN al ARN y a la proteína, siempre con reglas de dirección.', notes=N('Primero las ideas generales que sostienen todo el tema.'), slides=L1),
    dict(name='Piezas', desc='Genes, polimerasas, ribosomas', intro='Las moléculas y enzimas que participan en cada proceso.', notes=N('Conozcamos las piezas antes de ver los procesos.'), slides=L2),
    dict(name='Replicación', desc='Copiar el ADN', intro='Inicio, elongación y terminación en procariotas y eucariotas.', notes=N('Funcionamiento I: la replicación paso a paso.'), slides=L3),
    dict(name='Transcripción', desc='Del ADN al ARN', intro='Iniciación, elongación, terminación y procesamiento del ARN.', notes=N('Funcionamiento II: la transcripción en bacterias y en eucariotas, y la maduración del ARNm.'), slides=L4),
    dict(name='Traducción', desc='Del ARN a la proteína', intro='Activación, inicio, elongación, terminación y destino de la proteína.', notes=N('Funcionamiento III: la traducción y lo que pasa después.'), slides=L5),
    dict(name='Integración', desc='Comparar y regular', intro='Procariotas frente a eucariotas y cómo se enciende un gen.', notes=N('Integramos todo y vemos cómo se regula.'), slides=L6),
    dict(name='Clínica', desc='Fármacos y enfermedades', intro='Qué pasa cuando el dogma se bloquea o falla.', notes=N('Aplicación médica.'), slides=L7),
  ],
  close=[
    'La información fluye <strong>ADN → ARN → proteína</strong>; los retrovirus retrotranscriben.',
    'Toda síntesis va de <strong>5′ a 3′</strong>; la ADN pol necesita cebador.',
    'Bacteria: <strong>OriC, DnaA, DnaB, pol III, pol I, Ter/Tus</strong>.',
    'Eucariota: <strong>ORC, MCM, RPA, Pol α/δ/ε, PCNA, telomerasa</strong>.',
    '<strong>σ</strong> reconoce −35 y −10; terminación con horquilla o <strong>rho</strong>.',
    'Pol II necesita <strong>TFII</strong>; TFIIH abre el ADN y fosforila el CTD.',
    'Maduración: <strong>cap, splicing y poli-A</strong>, coordinados por el CTD.',
    'Traducción: <strong>aa-ARNt sintetasa</strong>, inicio, elongación y terminación con GTP.',
    'Enhancers, transactivadores, coactivadores y <strong>HAT</strong> encienden genes.',
    'Rifampicina, α-amanitina y antibióticos ribosomales bloquean el dogma.',
  ],
  close_notes=N('Estos son los diez conceptos esenciales. Si dominas la regla 5′→3′ y las equivalencias entre procariotas y eucariotas, puedes reconstruir casi todo el tema.'),
)

# ======== sin nivel de casos clínicos: inhibidores y la lista del profesor ========
_L = DECK['levels'][-1]
_L['name'] = 'Importancia médica'; _L['desc'] = 'Inhibidores y antibióticos'
_L['intro'] = 'Qué sustancias bloquean el dogma y dónde actúan.'; _L['notes'] = N('Para cerrar, la importancia médica del material del profesor.')
_L['slides'] = [x for x in _L['slides'] if x['title'] != 'Un error de splicing: β-talasemia']
for _x in _L['slides']:
    if _x['title'] == 'Transcripción y enfermedad':
        _x['title'] = 'Importancia médica de la transcripción'
        _x['tag'] = 'm'
        _x['fig'] = W(table(['Alteración', 'Consecuencia'], [
            ['Mutaciones en factores de transcripción', 'Cáncer'], ['Alteraciones del splicing', 'β-talasemia'],
            ['Defectos en reparación / transcripción', 'Xeroderma pigmentoso'], ['Desregulación epigenética', 'Tumores']], cls='tb sm'))
        _x['text'] = '<p class="lead">Lista del resumen del profesor.</p><ul><li>Solo hay que relacionar la alteración con su consecuencia.</li></ul>'
        _x['notes'] = N('El resumen del profesor relaciona fallas de la transcripción con algunas enfermedades; basta con reconocer la relación.', ['Mutaciones en factores de transcripción → cáncer.', 'Alteraciones del splicing → β-talasemia.', 'Defectos en reparación y transcripción → xeroderma pigmentoso.', 'Desregulación epigenética → tumores.'], None, ['Alteración ↔ consecuencia.'])
DECK['index_notes'] = DECK['index_notes'].replace('integración y regulación, y clínica.', 'integración y regulación, e importancia médica.')
