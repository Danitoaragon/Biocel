import os as _os
ROOT = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), '..', 'generador')
OUTDIR = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), 'salida')
_os.makedirs(_os.path.join(OUTDIR, 'steps'), exist_ok=True)
import sys, importlib
sys.path.insert(0, ROOT)
from engine import build
name = sys.argv[1]
m = importlib.import_module(name)
n = build(m.DECK, OUTDIR + f'/{name}.html')
print(name, n, 'diapositivas')
