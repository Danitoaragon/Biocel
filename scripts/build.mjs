// Regenera los archivos generados de hub/ a partir de las fuentes de generador/.
// Pasos (en este orden, porque gen_hub.py lee lo que escribe build_plat.py):
//   1. generador/plat/build_plat.py  -> hub/datos/libro.js, banco.js, meta.js
//   2. generador/gen_hub.py          -> hub/*.html (presentaciones), hub/index.html, hub/datos/diapos.js
//   3. generador/plat/senalx/*.js    -> hub/datos/senal-exp.js (lectura editorial de Señalización)
// NO toca los archivos que se editan a mano: hub/estudio.html, hub/datos/progreso.js, hub/datos/visual.js.
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, rmSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const GEN = join(ROOT, 'generador');

function findPython() {
  const candidates = process.env.PYTHON ? [process.env.PYTHON] : ['python3', 'python', 'py'];
  for (const c of candidates) {
    const r = spawnSync(c, ['-c', 'import sys; print(sys.version_info[:2] >= (3, 8))'], { encoding: 'utf8' });
    if (r.status === 0 && r.stdout.trim() === 'True') return c;
  }
  console.error('No se encontró Python 3.8 o superior. Instálalo o define la variable PYTHON.');
  process.exit(1);
}

function run(py, script, cwd) {
  console.log(`\n> ${py} ${script}`);
  const r = spawnSync(py, [script], { cwd, stdio: 'inherit', env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1', PYTHONIOENCODING: 'utf-8' } });
  if (r.status !== 0) { console.error(`Falló ${script}`); process.exit(r.status || 1); }
}

const py = findPython();
run(py, 'build_plat.py', join(GEN, 'plat'));
run(py, 'gen_hub.py', GEN);

const SX = join(GEN, 'plat', 'senalx');
const parts = ['a_core.js', 'a2_bio.js', 'a3_scenes.js', 'b_css.js', 'c_mod1.js', 'd_mod2.js', 'e_mod3.js', 'e2_scale.js', 'f_enhance.js'];
writeFileSync(join(ROOT, 'hub', 'datos', 'senal-exp.js'), parts.map((p) => readFileSync(join(SX, p), 'utf8')).join(''));
console.log('\n> senal-exp.js: ' + parts.length + ' módulos unidos');

// limpia cachés de Python
(function clean(dir) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) { if (n === '__pycache__') rmSync(p, { recursive: true, force: true }); else clean(p); }
  }
})(GEN);

console.log('\nListo. El sitio completo está en hub/ (npm run dev para verlo).');
