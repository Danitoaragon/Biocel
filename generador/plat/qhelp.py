"""Ayudantes para escribir preguntas. En MC/ID la primera opción es la correcta (se barajan al mostrar)."""
Q = []
_cnt = {}
TEMA = None
def _id(t):
    _cnt[t] = _cnt.get(t, 0) + 1
    return f'{t}-{_cnt[t]:03d}'
def tema(t):
    global TEMA; TEMA = t
def _base(sub, dif, cat, tipo, q, exp, concepto):
    d = dict(id=_id(TEMA), tema=TEMA, sub=sub, tipo=tipo, dif=dif, cat=cat, q=q, exp=exp)
    if concepto: d['concepto'] = concepto
    return d
def MC(sub, dif, cat, q, opts, exp, concepto=None):
    d = _base(sub, dif, cat, 'mc', q, exp, concepto)
    d['opts'] = [o for o, w in opts]; d['why'] = [w for o, w in opts]
    Q.append(d)
def ID(sub, dif, cat, svg, q, opts, exp, concepto=None):
    d = _base(sub, dif, cat, 'id', q, exp, concepto)
    d['svg'] = svg; d['opts'] = [o for o, w in opts]; d['why'] = [w for o, w in opts]
    Q.append(d)
def TF(sub, dif, cat, q, truth, exp, corr=None, concepto=None):
    d = _base(sub, dif, cat, 'tf', q, exp, concepto)
    d['ans'] = truth
    if corr: d['corr'] = corr
    Q.append(d)
def FILL(sub, dif, cat, q, answers, exp, concepto=None):
    d = _base(sub, dif, cat, 'fill', q, exp, concepto)
    d['ans'] = answers
    Q.append(d)
def MATCH(sub, dif, cat, q, pairs, exp, concepto=None):
    d = _base(sub, dif, cat, 'match', q, exp, concepto)
    d['pairs'] = pairs
    Q.append(d)
def ORDER(sub, dif, cat, q, items, exp, concepto=None):
    d = _base(sub, dif, cat, 'order', q, exp, concepto)
    d['items'] = items
    Q.append(d)
B, I, A = 1, 2, 3
CON, COMP, MEC, INT, APL, CLIN, RAZ = 'Concepto', 'Comprensión', 'Mecanismo', 'Integración', 'Aplicación', 'Caso clínico', 'Razonamiento'
