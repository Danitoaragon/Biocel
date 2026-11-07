import os as _os
ROOT = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), '..', 'generador')
OUTDIR = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), 'salida')
_os.makedirs(_os.path.join(OUTDIR, 'steps'), exist_ok=True)
import sys, math
from playwright.sync_api import sync_playwright
from PIL import Image
name = sys.argv[1]
html = open(OUTDIR + f'/{name}.html').read()
open(OUTDIR + f'/_{name}.html', 'w').write('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>[hidden]{display:none!important}</style></head><body class="final">' + html + '</body></html>')
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1920, 'height': 1080}); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto('file://' + OUTDIR + f'/_{name}.html'); pg.wait_for_timeout(400)
    n = pg.evaluate('document.querySelectorAll(".slide").length')
    # textos que se salen de su contenedor
    over = pg.evaluate('''()=>{const out=[];document.querySelectorAll('.slide').forEach((s,i)=>{s.classList.add('on');
      s.querySelectorAll('.txt,.fig,h2.t,.close .k,.idx .it').forEach(el=>{if(el.scrollHeight>el.clientHeight+4||el.scrollWidth>el.clientWidth+4)out.push([i+1,el.className,el.scrollHeight,el.clientHeight])});
      const tt=s.querySelector('h2.t');if(tt&&tt.getBoundingClientRect().height>100)out.push([i+1,'titulo 2 lineas',tt.getBoundingClientRect().height]);
      s.classList.remove('on')});return out}''')
    files = []
    for i in range(n):
        pg.evaluate(f'go({i})'); pg.wait_for_timeout(120)
        f = OUTDIR + f'/{name}_{i+1:02d}.png'; pg.screenshot(path=f); files.append(f)
    print('errores', errs); print('desbordes', over)
    b.close()
cols = 3; W = 640; H = 360
for k in range(0, len(files), 9):
    grp = files[k:k+9]; rows = math.ceil(len(grp)/cols)
    sheet = Image.new('RGB', (cols*W, rows*H), 'white')
    for j, f in enumerate(grp):
        sheet.paste(Image.open(f).resize((W, H)), ((j % cols)*W, (j//cols)*H))
    sheet.save(OUTDIR + f'/{name}_sheet{k//9+1}.png')
print(len(files))
