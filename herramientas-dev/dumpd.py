import os as _os
ROOT = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), '..', 'generador')
OUTDIR = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), 'salida')
_os.makedirs(_os.path.join(OUTDIR, 'steps'), exist_ok=True)
import sys,re,importlib
sys.path.insert(0, ROOT)
from lxml import etree
for f in sys.argv[1:]:
    m,fn=f.split('.'); s=getattr(importlib.import_module(m),fn)()
    root=etree.fromstring(s.encode())
    out={}
    for el in root.iter():
        st=el.get('style') or ''
        mm=re.search(r'--d:([\d.]+)s',st)
        if not mm: continue
        txt=' '.join(t.strip() for t in el.itertext() if t.strip())[:200]
        tag=etree.QName(el).localname
        out.setdefault(float(mm.group(1)),[]).append(txt or tag)
    print('==',f)
    for d in sorted(out): print(' ',d,'|',' ; '.join(out[d])[:400])
