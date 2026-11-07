"""Notas del expositor estructuradas."""
def N(idea, pasos=None, datos=None, examen=None, clinica=None, tabla=None, extra=None):
    h = f'<h5>Idea central</h5><p>{idea}</p>'
    if pasos:
        h += '<h5>Explicación paso a paso</h5><ol>' + ''.join(f'<li>{x}</li>' for x in pasos) + '</ol>'
    if datos:
        h += '<h5>Datos que hay que saber</h5><ul>' + ''.join(f'<li>{x}</li>' for x in datos) + '</ul>'
    if tabla:
        head, rows = tabla
        h += '<table><tr>' + ''.join(f'<th>{x}</th>' for x in head) + '</tr>' + ''.join('<tr>' + ''.join(f'<td>{c}</td>' for c in r) + '</tr>' for r in rows) + '</table>'
    if extra:
        for tit, body in extra:
            h += f'<h5>{tit}</h5>' + (body if body.startswith('<') else f'<p>{body}</p>')
    # clinica: se omite a propósito (sin casos clínicos; nivel de las diapositivas del profesor)
    if examen:
        h += '<h5>Para el examen</h5><ul>' + ''.join(f'<li>{x}</li>' for x in examen) + '</ul>'
    return h
