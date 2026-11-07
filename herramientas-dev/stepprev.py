import os as _os
ROOT = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), '..', 'generador')
OUTDIR = _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), 'salida')
_os.makedirs(_os.path.join(OUTDIR, 'steps'), exist_ok=True)
import sys,re,importlib
sys.path.insert(0, ROOT)
from playwright.sync_api import sync_playwright
def phases(ds,gap=.3):
    th=[];prev=None
    for d in ds:
        if prev is not None and d-prev>=gap: th.append(round((d+prev)/2,2))
        prev=d
    th.append(ds[-1]+1); return th
css='<style>body{margin:0;background:#F5F0E4;font-family:DM Sans,sans-serif}div.f{width:440px;display:inline-block;margin:4px;background:#fffdf9;border:1px solid #ccc;vertical-align:top}svg{width:100%;height:auto}.fi,.pp,.gr,.gy,.sl,.sr,.mv,.mv1{opacity:1!important}.dr{stroke-dasharray:none!important}.hid{display:none}p{margin:2px 6px;font-size:13px}</style>'
with sync_playwright() as p:
    b=p.chromium.launch()
    for f in sys.argv[1:]:
        m,fn=f.split('.'); s=getattr(importlib.import_module(m),fn)()
        ds=sorted(set(float(x) for x in re.findall(r'--d:([\d.]+)s',s)))
        th=phases(ds)
        html=css
        for i,t in enumerate(th):
            html+=f'<div class=f><p>{f} paso {i+1} ≤ {t}</p><div class=sv data-t="{t}">{s}</div></div>'
        html+='<script>document.querySelectorAll(".sv").forEach(w=>{const t=+w.dataset.t;w.querySelectorAll("[style*=\\"--d\\"]").forEach(el=>{const m=/--d:([\\d.]+)s/.exec(el.getAttribute("style"));if(m&&+m[1]>t)el.classList.add("hid")})})</script>'
        open(OUTDIR + '/step.html','w').write(html)
        pg=b.new_page(viewport={'width':1800,'height':600});pg.goto('file://' + OUTDIR + '/step.html');pg.wait_for_timeout(200)
        pg.screenshot(path=OUTDIR + f'/steps/{fn}.png',full_page=True);pg.close()
        print(f,th)
    b.close()
