// Prueba automática de humo: levanta el servidor local y recorre la plataforma en Chromium.
// Requiere: npm install  y  npx playwright install chromium  (una sola vez).
// Uso: npm run verificar
import { spawn } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

let chromium;
try { ({ chromium } = await import('playwright')); }
catch { console.error('Falta Playwright. Ejecuta: npm install && npx playwright install chromium'); process.exit(1); }

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 5199;
const B = `http://localhost:${PORT}/`;
const srv = spawn(process.execPath, ['scripts/serve.mjs', '--port', String(PORT)], { cwd: ROOT, stdio: 'pipe' });
await new Promise((ok) => srv.stdout.on('data', (d) => String(d).includes('localhost') && ok()));

const results = [];
const check = (name, ok, info = '') => { results.push({ name, ok, info }); console.log(`${ok ? '✔' : '✘'} ${name}${info ? ' — ' + info : ''}`); };
const errs = [];
const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const pg = await ctx.newPage();
  pg.on('pageerror', (e) => errs.push(`${pg.url()} :: ${e.message}`));
  const externo = (u) => /fonts\.(googleapis|gstatic)\.com/.test(u || '');
  const sinRed = [];
  pg.on('requestfailed', (r) => { if (externo(r.url())) sinRed.push(r.url()); });
  pg.on('console', (m) => { if (m.type() === 'error' && !externo(m.location()?.url) && !externo(m.text())) errs.push(`${pg.url()} :: ${m.text()}`); });
  const imgsOk = () => pg.evaluate(() => [...document.images].filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.alt || i.src.slice(0, 60)));

  // 1. Portada (índice general)
  await pg.goto(B + 'index.html'); await pg.waitForTimeout(500);
  check('index.html carga', (await pg.title()).length > 0, await pg.title());
  let bad = await imgsOk(); check('index.html: imágenes', bad.length === 0, bad.join(', '));
  const th0 = await pg.evaluate(() => document.documentElement.dataset.theme || '');
  await pg.click('#thm'); await pg.waitForTimeout(200);
  const th1 = await pg.evaluate(() => document.documentElement.dataset.theme || '');
  check('index.html: modo oscuro alterna', th0 !== th1, `${th0 || '(sistema)'} → ${th1}`);
  await pg.click('#thm');

  // 2. Presentaciones
  for (const d of ['citoesqueleto', 'mitocondria', 'dogma_central', 'regulacion', 'senalizacion']) {
    await pg.goto(B + d + '.html'); await pg.waitForTimeout(400);
    const n = await pg.evaluate(() => document.querySelectorAll('.slide').length);
    await pg.keyboard.press('ArrowRight'); await pg.waitForTimeout(150);
    const on = await pg.evaluate(() => [...document.querySelectorAll('.slide')].findIndex((s) => s.classList.contains('on')));
    bad = await imgsOk();
    check(`presentación ${d}`, n > 5 && on === 1 && bad.length === 0, `${n} diapositivas, navegación → ${on + 1}`);
  }

  // 3. Plataforma: rutas principales
  await pg.goto(B + 'estudio.html#libro'); await pg.waitForTimeout(500);
  const temas = await pg.evaluate(() => Object.keys(LIB));
  check('estudio.html: capítulos', temas.length === 5, temas.join(', '));
  const rutas = ['libro', 'banco', 'examen', 'errores', 'panel', 'visual', 'progreso', 'reforzar', 'comparar', 'buscar', 'plan', 'guardados', 'continuar'];
  for (const r of rutas) {
    const e0 = errs.length;
    await pg.goto(B + 'estudio.html#' + r); await pg.waitForTimeout(250);
    const len = await pg.evaluate(() => document.getElementById('app')?.innerText.length || document.body.innerText.length);
    check(`ruta #${r}`, len > 40 && errs.length === e0, `${len} caracteres`);
  }

  // 4. Lecturas completas (todas las secciones) + figuras + índice lateral
  for (const t of temas) {
    const ns = await pg.evaluate((t) => LIB[t].secciones.length, t);
    let figs = 0, vacias = 0; const e0 = errs.length;
    await pg.goto(B + `estudio.html#libro-${t}`); await pg.waitForTimeout(200);
    for (let i = 0; i < ns; i++) {
      await pg.goto(B + `estudio.html#libro-${t}-${i}`); await pg.waitForTimeout(t === 'senal' && i === 0 ? 1200 : 250);
      const r = await pg.evaluate(() => ({ f: document.querySelectorAll('figure, svg').length, txt: (document.querySelector('article') || document.body).innerText.length, toc: document.querySelectorAll('[data-s]').length }));
      figs += r.f; if (r.txt < 200) { vacias++; console.log(`  sección ${t}-${i}: ${r.txt} caracteres`); }
      if (i === 0) check(`lectura ${t}: índice del tema`, r.toc > 0, `${r.toc} enlaces`);
    }
    check(`lectura ${t}: ${ns} secciones`, vacias === 0 && errs.length === e0, `${figs} figuras/SVG en total${errs.length > e0 ? ' · ' + errs.slice(e0, e0 + 3).join(' | ') : ''}`);
  }
  // 4b. Lectura editorial de Señalización (módulos interactivos)
  await pg.goto(B + 'estudio.html#libro-senal-0'); await pg.waitForTimeout(1500);
  const sx = await pg.evaluate(() => ({ ok: !!window.SENALX, plates: document.querySelectorAll('.ex-plate').length, ctl: document.querySelectorAll('.ex-ctl button, .ex-ctl input').length }));
  check('Señalización: módulos interactivos', sx.ok && sx.plates > 0, `${sx.plates} láminas, ${sx.ctl} controles`);
  if (sx.ctl) { const e0 = errs.length; await pg.locator('.ex-ctl button').first().click().catch(() => {}); await pg.waitForTimeout(300); check('Señalización: interacción sin errores', errs.length === e0); }
  {
    const e0 = errs.length;
    // escalas: de la célula a la molécula
    await pg.locator('#ex-esc').scrollIntoViewIfNeeded();
    for (const lv of [1, 2]) { await pg.click(`#ex-esc [data-lv="${lv}"]`); await pg.waitForTimeout(1300); }
    await pg.click('#ex-esc [data-s="cor"]'); await pg.waitForTimeout(400);
    await pg.click('#ex-esc [data-lv="4"]'); await pg.waitForTimeout(1500);
    const esc = await pg.evaluate(() => ({ lv: document.querySelector('#ex-esc [data-lv].on')?.dataset.lv, mech: !document.querySelector('#ex-esc .sc-mech').hidden, q: document.querySelector('#ex-esc .sc-qa .q').textContent }));
    check('Señalización: figura de escalas (5 niveles)', esc.lv === '4' && esc.mech && esc.q.length > 3, `nivel ${+esc.lv + 1} · «${esc.q}»`);
    // receptores: cada escena se reproduce y llega a su última fase
    let okR = 0;
    for (const r of ['canal', 'gpcr', 'rtk', 'nuc']) {
      await pg.click(`#ex-rec .rc-t[data-r="${r}"]`); await pg.waitForTimeout(150);
      await pg.locator('#ex-rec .b-ph [data-ph]').last().click(); await pg.waitForTimeout(400);
      if (await pg.evaluate(() => document.querySelector('#ex-rec .b-ph li.cur') === [...document.querySelectorAll('#ex-rec .b-ph li')].pop())) okR++;
    }
    check('Señalización: receptores con fases (canal, GPCR, RTK, nuclear)', okR === 4, `${okR}/4`);
    // amplificación: los contadores crecen hasta el final
    await pg.locator('#ex-amp').scrollIntoViewIfNeeded(); await pg.locator('#ex-amp .b-ph [data-ph]').last().click(); await pg.waitForTimeout(3200);
    const amp = await pg.evaluate(() => [...document.querySelectorAll('#ex-amp [data-r=num]')].map((n) => +n.textContent));
    check('Señalización: amplificación visible', amp[0] === 1 && amp[amp.length - 1] === 18, amp.join(' → '));
    // célula final: seleccionar, acercar, ruta, pausa
    await pg.locator('#ex-cel').scrollIntoViewIfNeeded();
    await pg.locator('#ex-cel .ce[data-id="pka"]').dispatchEvent('click'); await pg.waitForTimeout(900);
    const cel = await pg.evaluate(() => ({ h: document.querySelector('#ex-cel .ce-side h4').textContent, dt: [...document.querySelectorAll('#ex-cel .ce-side dt')].map((d) => d.textContent), vb: document.querySelector('#ex-cel svg').getAttribute('viewBox') }));
    check('Señalización: célula explorable (tarjeta y acercamiento)', /PKA/.test(cel.h) && cel.dt.includes('Qué ocurre después') && !/^0\.00 0\.00 1000/.test(cel.vb), `${cel.h} · viewBox ${cel.vb}`);
    await pg.click('#ex-cel [data-md="route"]'); await pg.click('#ex-cel .ce-r[data-r="rtk"]'); await pg.click('#ex-cel [data-a="play"]'); await pg.waitForTimeout(2200); await pg.click('#ex-cel [data-a="play"]');
    const st = await pg.evaluate(() => ({ t: document.querySelector('#ex-cel [data-a=play]').textContent, h: document.querySelector('#ex-cel .ce-side h4').textContent }));
    check('Señalización: rutas con reproducir/pausa', /paso [2-9]/.test(st.h) && st.t !== 'Pausa', `${st.h} · botón «${st.t}»`);
    check('Señalización: figuras nuevas sin errores', errs.length === e0, errs.slice(e0).join(' | '));
  }
  // 4c. Índice lateral: se oculta y se vuelve a abrir (desktop, iPad y móvil)
  for (const [nm, vp] of [['escritorio', { width: 1366, height: 900 }], ['iPad', { width: 1024, height: 1366 }], ['iPad vertical', { width: 820, height: 1180 }], ['móvil', { width: 390, height: 844 }]]) {
    const p2 = await ctx.newPage(); await p2.setViewportSize(vp); p2.on('pageerror', (e) => errs.push(`índice ${nm} :: ${e.message}`));
    await p2.goto(B + 'estudio.html#libro-senal-1'); await p2.waitForTimeout(900);
    const st = () => p2.evaluate(() => { const r = document.querySelector('.reader'), t = document.querySelector('aside.toc'), a = document.querySelector('article.book').getBoundingClientRect(); const c = document.elementFromPoint(innerWidth / 2, innerHeight * 0.7); return { vis: getComputedStyle(t).display !== 'none', w: Math.round(a.width), free: !!(c && c.closest('article.book')), exp: document.querySelector('#rt-side').getAttribute('aria-expanded') }; });
    const s0 = await st(); await p2.click('#rt-side'); await p2.waitForTimeout(300); const s1 = await st();
    if (s1.vis && vp.width <= 900) { await p2.click('.toc-x'); } else { await p2.click('#rt-side'); }
    await p2.waitForTimeout(300); const s2 = await st();
    const ok = vp.width > 900 ? (s0.vis && !s1.vis && s1.w > s0.w && s1.free && s2.vis) : (!s0.vis && s1.vis && !s2.vis && s2.free && s2.exp === 'false');
    check(`índice ${nm}: se oculta y se vuelve a abrir`, ok, `${s0.vis ? 'visible' : 'oculto'} → ${s1.vis ? 'visible' : 'oculto'} → ${s2.vis ? 'visible' : 'oculto'} · lectura ${s0.w}→${s1.w}px`);
    await p2.close();
  }

  // 5. Animaciones
  await pg.goto(B + 'estudio.html#libro-mito-2'); await pg.waitForTimeout(400);
  await pg.evaluate(() => { const f = document.querySelectorAll('figure'); (f[2] || f[0])?.scrollIntoView({ block: 'center' }); });
  await pg.waitForTimeout(800);
  const anim = await pg.evaluate(() => ({ css: document.getAnimations().length, keyframes: [...document.styleSheets].reduce((n, s) => { try { return n + [...s.cssRules].filter((r) => r.type === 7).length } catch { return n } }, 0) }));
  check('animaciones', anim.keyframes > 0, `${anim.keyframes} @keyframes, ${anim.css} activas`);

  // 6. Modo oscuro en la plataforma
  const d0 = await pg.evaluate(() => document.documentElement.dataset.theme || '');
  await pg.click('#thm'); await pg.waitForTimeout(200);
  const d1 = await pg.evaluate(() => [document.documentElement.dataset.theme || '', localStorage.getItem('bc-theme'), getComputedStyle(document.body).backgroundColor]);
  check('estudio.html: modo oscuro', d1[0] !== d0 && d1[1] === d1[0], `${d0 || '(sistema)'} → ${d1[0]} · fondo ${d1[2]}`);
  await pg.click('#thm');

  // 7. Banco de preguntas: corrección automática de todas las preguntas
  const g = await pg.evaluate(() => {
    const cr = (q) => q.tipo === 'mc' || q.tipo === 'id' ? 0 : q.tipo === 'tf' ? q.ans : q.tipo === 'fill' ? q.ans[0] : q.tipo === 'match' ? q.pairs.map((p) => p[1]) : q.items.slice();
    return { n: BANCO.length, malas: BANCO.filter((q) => !grade(q, cr(q)).ok).map((q) => q.id) };
  });
  check('banco: todas las preguntas califican bien', g.malas.length === 0, `${g.n} preguntas${g.malas.length ? ', fallan: ' + g.malas.slice(0, 5) : ''}`);

  // 8. Cuestionario interactivo (práctica)
  await pg.goto(B + 'estudio.html#banco-cito'); await pg.waitForTimeout(300);
  await pg.click('#go'); await pg.waitForTimeout(300);
  let resp = 0;
  for (let k = 0; k < 6; k++) {
    const tipo = await pg.evaluate(() => SES.items[SES.i].q.tipo);
    if (tipo === 'mc' || tipo === 'id') await pg.click('#qb .opt >> nth=0');
    else if (tipo === 'tf') await pg.click('#qb [data-tf] >> nth=0');
    else if (tipo === 'fill') { await pg.fill('#fillv', 'prueba'); await pg.click('[data-act=check]'); }
    else if (tipo === 'match') { const c = await pg.locator('#qb select').count(); for (let i = 0; i < c; i++) await pg.locator('#qb select').nth(i).selectOption({ index: 1 }); await pg.click('[data-act=check]'); }
    else if (tipo === 'order') await pg.click('[data-act=check]');
    await pg.waitForTimeout(120); resp++;
    if (await pg.locator('#next').count()) await pg.click('#next');
  }
  const ses = await pg.evaluate(() => [SES.ok, SES.bad]);
  check('cuestionario: responde y retroalimenta', ses[0] + ses[1] === resp, `aciertos ${ses[0]}, errores ${ses[1]}`);
  const nerr = await pg.evaluate(() => Object.keys(ST.errs).length);
  await pg.goto(B + 'estudio.html#errores'); await pg.waitForTimeout(300);
  check('errores se guardan en «Repasar errores»', ses[1] === 0 || nerr > 0, `${nerr} guardados`);

  // 9. Simulador de examen
  await pg.goto(B + 'estudio.html#examen'); await pg.waitForTimeout(300);
  await pg.click('#ego'); await pg.waitForTimeout(300);
  const ex = await pg.evaluate(() => EX.items.length);
  check('simulador de examen inicia', ex > 0, `${ex} preguntas`);

  // 10. Persistencia del progreso
  const ls = await pg.evaluate(() => !!localStorage.getItem('bc-plataforma-v1'));
  check('progreso guardado en localStorage', ls);

  // 11. Móvil
  const m = await ctx.newPage(); await m.setViewportSize({ width: 390, height: 844 });
  m.on('pageerror', (e) => errs.push('móvil :: ' + e.message));
  for (const h of ['index.html', 'estudio.html#libro-dogma-3', 'estudio.html#libro-senal-2']) {
    await m.goto(B + h); await m.waitForTimeout(700);
    const [sw, iw] = await m.evaluate(() => [document.documentElement.scrollWidth, innerWidth]);
    check(`móvil ${h}: sin desplazamiento horizontal`, sw <= iw + 1, `${sw}/${iw}`);
  }

  check('sin errores de JavaScript', errs.length === 0, errs.slice(0, 5).join(' | '));
  if (sinRed.length) console.log(`  (aviso) Google Fonts no respondió ${sinRed.length} vez/veces: sin internet se usan las fuentes de respaldo del sistema.`);
} finally {
  await browser.close(); srv.kill();
}
const fail = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - fail}/${results.length} comprobaciones correctas`);
process.exit(fail ? 1 : 0);
