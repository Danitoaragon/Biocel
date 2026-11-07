"""Ayudantes para SVG animados de las diapositivas. viewBox estándar 920 x 590."""
COB, OCRE, INK, MUT, CREAM, CARD, LINE, SOFT = '#1B3FD0', '#E8B94B', '#1d2340', '#5a5f78', '#F5F0E4', '#fffdf7', '#d9d1bd', '#ece4d0'
RED, GREEN, TAN, TAND, LCOB, LOCRE, LRED, LGREEN = '#b8412e', '#2f7d5b', '#e9c98a', '#a77d2c', '#dbe3fb', '#f7e6b8', '#f4d6cf', '#d5ebdf'
F = "font-family:'DM Sans','Inter',system-ui,sans-serif"

def st(cls, d, extra=''):
    s = []
    if d is not None: s.append(f'--d:{d}s')
    if extra: s.append(extra)
    c = f' class="{cls}"' if cls else ''
    return c + (f' style="{";".join(s)}"' if s else '')

def svg(inner, w=920, h=590, label=''):
    return f'<svg viewBox="0 0 {w} {h}" role="img" aria-label="{label}" style="{F}">{inner}</svg>'

def t(x, y, s, size=24, col=INK, a='middle', w=500, cls='fi', d=0, it=False):
    sty = 'font-style:italic;' if it else ''
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{col}" text-anchor="{a}" font-weight="{w}"{st(cls, d, sty)}>{s}</text>'

def tl(x, y, lines, size=22, col=INK, a='middle', w=500, cls='fi', d=0, lh=1.25):
    out = f'<text x="{x}" y="{y}" font-size="{size}" fill="{col}" text-anchor="{a}" font-weight="{w}"{st(cls, d)}>'
    for i, l in enumerate(lines):
        out += f'<tspan x="{x}" dy="{0 if i == 0 else size*lh}">{l}</tspan>'
    return out + '</text>'

def p(dd, col=COB, w=4, cls='dr', d=0, fill='none', t_=None, extra=''):
    tt = f'--t:{t_}s' if t_ else ''
    pl = ' pathLength="1"' if 'dr' in (cls or '') else ''
    return f'<path d="{dd}" fill="{fill}" stroke="{col}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"{pl}{st(cls, d, tt + (";" + extra if extra else ""))}/>'

def r(x, y, w, h, fill=CARD, stroke=LINE, sw=2, rx=12, cls='fi', d=0, extra=''):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{st(cls, d, extra)}/>'

def c(x, y, rr, fill=COB, stroke='none', sw=2, cls='pp', d=0, extra=''):
    return f'<circle cx="{x}" cy="{y}" r="{rr}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{st(cls, d, extra)}/>'

def e(x, y, rx, ry, fill=COB, stroke='none', sw=2, cls='pp', d=0):
    return f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{st(cls, d)}/>'

def g(inner, cls='fi', d=0, extra='', tr=''):
    trs = f' transform="{tr}"' if tr else ''
    return f'<g{trs}{st(cls, d, extra)}>{inner}</g>'

def arrow(x1, y1, x2, y2, col=COB, w=4, cls='dr', d=0, head=14):
    import math
    a = math.atan2(y2 - y1, x2 - x1)
    hx1, hy1 = x2 - head * math.cos(a - .45), y2 - head * math.sin(a - .45)
    hx2, hy2 = x2 - head * math.cos(a + .45), y2 - head * math.sin(a + .45)
    hd = d + 0.9 if cls == 'dr' else d
    return (p(f'M{x1},{y1} L{x2},{y2}', col, w, cls, d) +
            f'<path d="M{x2},{y2} L{hx1:.1f},{hy1:.1f} L{hx2:.1f},{hy2:.1f} Z" fill="{col}"{st("fi", hd)}/>')

def carrow(dd, x2, y2, ang, col=COB, w=4, d=0, head=14):
    """flecha curva: dd es el path; (x2,y2) la punta; ang en grados de la dirección final"""
    import math
    a = math.radians(ang)
    hx1, hy1 = x2 - head * math.cos(a - .45), y2 - head * math.sin(a - .45)
    hx2, hy2 = x2 - head * math.cos(a + .45), y2 - head * math.sin(a + .45)
    return p(dd, col, w, 'dr', d) + f'<path d="M{x2},{y2} L{hx1:.1f},{hy1:.1f} L{hx2:.1f},{hy2:.1f} Z" fill="{col}"{st("fi", d + 0.9)}/>'

def mover(inner, dx, dy, d=0, t_=3):
    return f'<g class="mv" style="--d:{d}s;--t:{t_}s;--dx:{dx}px;--dy:{dy}px">{inner}</g>'

def box(x, y, w, h, title, sub=None, fill=CARD, stroke=COB, tcol=INK, d=0, size=24, cls='pp'):
    out = r(x, y, w, h, fill, stroke, 2.5, 14, cls, d)
    if sub:
        out += t(x + w/2, y + h/2 - 4, title, size, tcol, 'middle', 700, 'fi', d + .15)
        out += t(x + w/2, y + h/2 + 24, sub, size - 5, MUT, 'middle', 500, 'fi', d + .2)
    else:
        out += t(x + w/2, y + h/2 + size*0.35, title, size, tcol, 'middle', 700, 'fi', d + .15)
    return out

def counter(x, y, n, size=40, col=COB, a='middle', d=0, dec=0, suffix='', w=700):
    return (f'<text x="{x}" y="{y}" font-size="{size}" fill="{col}" text-anchor="{a}" font-weight="{w}"{st("fi", d)}>'
            f'<tspan data-n="{n}" data-d="{d}" data-dec="{dec}">0</tspan>{suffix}</text>')

def table(head, rows, d=.2, cls='tb'):
    h = ''.join(f'<th>{x}</th>' for x in head)
    b = ''.join(f'<tr class="fi" style="--d:{d + .15*i:.2f}s">' + ''.join(f'<td>{x}</td>' for x in row) + '</tr>' for i, row in enumerate(rows))
    return f'<table class="{cls}"><thead><tr class="fi" style="--d:{d-.1:.2f}s">{h}</tr></thead><tbody>{b}</tbody></table>'

def flow(steps, x0=30, y0=40, w=860, h=78, gap=34, d=.2, fills=None):
    """diagrama de flujo vertical: steps = [(titulo, sub)]"""
    out = ''
    for i, (ti, su) in enumerate(steps):
        y = y0 + i * (h + gap)
        fill = (fills[i] if fills else CARD)
        out += box(x0, y, w, h, ti, su, fill, COB, INK, d + i * .45, 25)
        if i < len(steps) - 1:
            out += arrow(x0 + w/2, y + h + 4, x0 + w/2, y + h + gap - 4, OCRE, 4, 'dr', d + i * .45 + .3, 12)
    return out
