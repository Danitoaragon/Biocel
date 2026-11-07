# Biología Celular · Plataforma de estudio (Facultad de Medicina, UAEM)

Copia completa y editable de la página publicada («Página de estudio Medicina»): portada, 5 presentaciones, plataforma de estudio con 5 capítulos de lectura, banco de 826 preguntas, simulador de examen, repaso de errores, mapas, panel de progreso, visualizaciones interactivas, lectura editorial de Señalización y modo oscuro.

La carpeta `hub/` de este proyecto es **idéntica byte por byte** a la versión publicada (v12), y `npm run build` la vuelve a generar exactamente igual desde las fuentes.

---

## 1. Tecnología

| Parte | Tecnología |
|---|---|
| Sitio | **HTML + CSS + JavaScript puro** (sin React, sin Vite, sin Tailwind, sin TypeScript). Todo el CSS y el JS van dentro de cada `.html` o en `hub/datos/*.js`. |
| Ilustraciones y animaciones | **SVG** escrito a mano y animado con CSS (`@keyframes`, transiciones) y JS. |
| Generación del contenido | **Python 3** (solo biblioteca estándar): convierte las lecturas, preguntas y diapositivas en los archivos de `hub/`. |
| Servidor local y build | **Node.js** (scripts sin dependencias en `scripts/`). |
| Datos del usuario | `localStorage` del navegador (claves `bc-plataforma-v1`, `bc-read`, `bc-theme`). No hay base de datos ni backend. |
| Fuentes | Google Fonts (Cormorant Garamond, DM Sans, Source Serif 4, Fraunces, IBM Plex Mono). |

No se cambió el stack para exportarlo: es el mismo con el que se construyó la página.

## 2. Requisitos

- **Node.js 18 o superior** (para `npm run dev` y `npm run build`).
- **Python 3.8 o superior** (solo para `npm run build`, es decir, cuando cambias lecturas, preguntas o diapositivas). Sin paquetes extra.
- Opcional: Playwright, para `npm run verificar` (prueba automática).

No hace falta ninguna variable de entorno, clave ni API key, por eso no hay `.env.example`. Opcionales: `PORT` (puerto del servidor) y `PYTHON` (ruta a tu Python si no se llama `python3`/`python`).

## 3. Instalación y ejecución

```bash
cd biologia-celular-uaem
npm install            # solo instala Playwright (para la verificación); el sitio no tiene dependencias
npm run dev            # abre http://localhost:5173/
```

`npm install` es opcional: `npm run dev` funciona aunque no lo ejecutes. También puedes abrir `hub/index.html` con doble clic, o servir `hub/` con `python3 -m http.server -d hub 5173`.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Sirve `hub/` en http://localhost:5173/ (sin caché, para ver tus cambios al recargar). |
| `npm run build` | Regenera los archivos generados de `hub/` a partir de `generador/`. |
| `npm run preview` | `build` y después sirve en http://localhost:4173/. |
| `npm run verificar` | Prueba automática: rutas, lecturas, imágenes, animaciones, modo oscuro, índice, cuestionarios, examen, móvil. Requiere `npm install` y `npx playwright install chromium` una vez. |

### Build para producción

```bash
npm run build
```

El resultado es la carpeta **`hub/`**: es un sitio estático completo. Para publicarlo, sube el contenido de `hub/` a cualquier hosting estático (GitHub Pages, Netlify, Vercel, Cloudflare Pages o un servidor). La página de inicio es `hub/index.html`.

## 4. Estructura de carpetas

```
biologia-celular-uaem/
├── hub/                         ← EL SITIO (lo que se publica)
│   ├── index.html               portada / tablero (generado)
│   ├── estudio.html             plataforma de estudio (SPA) — SE EDITA A MANO
│   ├── citoesqueleto.html       presentación (generada)
│   ├── mitocondria.html         presentación (generada)
│   ├── dogma_central.html       presentación (generada)
│   ├── regulacion.html          presentación (generada)
│   ├── senalizacion.html        presentación (generada)
│   └── datos/
│       ├── libro.js             lecturas de los 5 capítulos (generado)
│       ├── banco.js             banco de preguntas + generador (generado)
│       ├── meta.js              conceptos, mapas, pasos, subtemas (generado)
│       ├── diapos.js            índice de diapositivas para el buscador (generado)
│       ├── senal-exp.js         lectura editorial de Señalización (generado por unión de módulos)
│       ├── visual.js            visualizaciones interactivas — SE EDITA A MANO
│       └── progreso.js          cálculo de dominio y progreso — SE EDITA A MANO
├── generador/                   ← FUENTES del contenido
│   ├── engine.py                motor de las presentaciones (diseño de diapositivas, portada, notas)
│   ├── gen_hub.py               genera las 5 presentaciones, index.html y diapos.js
│   ├── d_cito.py, d_mito.py, d_dogma.py, d_reg.py, d_senal.py   figuras SVG de cada tema
│   ├── d_cito2.py, d_mito2.py, d_dogma2.py, d_reg2.py, d_senal2.py  contenido de cada presentación
│   ├── d_libro.py               figuras SVG adicionales de las lecturas
│   ├── sv.py                    utilidades para dibujar SVG
│   ├── notes.py                 notas del presentador
│   ├── assets/                  logos de la UAEM y de la Facultad (se incrustan en las presentaciones)
│   └── plat/
│       ├── build_plat.py        genera libro.js, banco.js y meta.js
│       ├── libro/               TEXTO DE LAS LECTURAS: cito.html, mito.html, dogma.html, reg.html, senal.html
│       ├── q_*.py               BANCOS DE PREGUNTAS por tema
│       ├── qhelp.py             funciones para escribir preguntas (MC, TF, FILL, MATCH, ORDER, ID)
│       ├── captions.py          pies de figura
│       ├── conceptos.py         glosario de conceptos
│       ├── extras.py            subtemas, puntos de alto rendimiento, mapas, pasos
│       ├── viejo.json           preguntas de la versión anterior (se fusionan en el banco)
│       ├── dash.html, dash.css  tablero de la portada (se incrusta en index.html)
│       ├── nuevo.js             histórico: ya está integrado dentro de estudio.html
│       └── senalx/              módulos de la lectura editorial de Señalización (a_core, a2_bio, a3_scenes, b_css, c_mod1, d_mod2, e_mod3, e2_scale, f_enhance)
├── scripts/
│   ├── serve.mjs                servidor local sin dependencias
│   ├── build.mjs                build (llama a Python en el orden correcto)
│   └── verificar.mjs            prueba automática con Playwright
├── herramientas-dev/            utilidades de desarrollo opcionales (capturas de diapositivas, etc.; requieren Playwright/Pillow/lxml en Python)
├── CLAUDE.md                    guía rápida del proyecto para Claude Code
├── package.json
└── README.md
```

### Dónde está cada sección importante

| Quieres cambiar… | Archivo |
|---|---|
| Texto de una lectura | `generador/plat/libro/<tema>.html` → `npm run build` |
| Preguntas | `generador/plat/q_<tema>.py` (y `q_<tema>_mas.py`) → `npm run build` |
| Figuras SVG de las lecturas | `generador/d_<tema>.py` o `generador/d_libro.py` → `npm run build` |
| Pies de figura | `generador/plat/captions.py` |
| Diapositivas | `generador/d_<tema>2.py` (contenido) y `generador/engine.py` (diseño) → `npm run build` |
| Portada / tablero | `generador/gen_hub.py`, `generador/plat/dash.html`, `generador/plat/dash.css` → `npm run build` |
| Navegación, rutas, cuestionarios, examen, errores, modo oscuro, índice lateral, buscador | `hub/estudio.html` (editar directamente; no se regenera) |
| Visualizaciones interactivas | `hub/datos/visual.js` (editar directamente) |
| Cálculo de dominio / progreso | `hub/datos/progreso.js` (editar directamente) |
| Lectura editorial de Señalización (Fig. 1–9) | `generador/plat/senalx/*.js` → `npm run build` |

Rutas de la plataforma (`estudio.html#…`): `#libro`, `#libro-<tema>`, `#libro-<tema>-<sección>`, `#banco`, `#banco-<tema>`, `#examen`, `#errores`, `#panel`, `#visual`, `#progreso`, `#reforzar`, `#comparar`, `#buscar`, `#plan`, `#guardados`, `#mapa-<tema>`, `#concepto-…`, `#continuar`. Temas: `cito`, `mito`, `dogma`, `reg`, `senal`. El enrutador es la función `route()` en `estudio.html`.

**Importante:** `npm run build` **sobrescribe** los archivos marcados como «generado». Si editas a mano `hub/index.html`, `hub/datos/libro.js`, etc., perderás el cambio en el siguiente build: edita su fuente en `generador/`. Los archivos marcados «SE EDITA A MANO» nunca se tocan.

### Figuras de la lectura de Señalización

| Módulo | Contenido |
|---|---|
| `a2_bio.js` | Dibujo biológico: bicapa lipídica (cabezas y colas), hélices transmembrana, proteínas globulares con volumen, proteína G αβγ con GDP/GTP, adenilil ciclasa, moléculas pequeñas (AMPc, IP₃, DAG, Ca²⁺, esteroide, NO…), ADN y ARNm; reproductor de escenas (reproducir, pausa, reiniciar, fases) y proyección isométrica de *Anatomy* (MIT). |
| `a3_scenes.js` | Escenas animadas de los receptores: GPCR + proteína G + enzima, canal nicotínico, RTK y receptor nuclear. |
| `e2_scale.js` | Figura de escalas: célula → membrana → bicapa (bloque isométrico que se gira) → receptor → mecanismo. |
| `e_mod3.js` | Amplificación, terminación y la célula final explorable (zoom, desplazamiento, pellizco, rutas). |

Cada escena es una función pura `render(t)`: el tiempo decide la posición de cada molécula, así que pausar, reiniciar o saltar a una fase es sólo cambiar `t`. Todo se detiene fuera de pantalla y respeta «reducir movimiento».

## 5. Cómo modificar las lecturas

Cada capítulo es un HTML en `generador/plat/libro/`. Cada `<section>` es una parte del capítulo:

```html
<section data-id="fundamentos" data-title="Conceptos fundamentales">
  <h3>Subtítulo (aparece en el índice lateral)</h3>
  <p>Texto…</p>
  <div class="box prof"><b>📌 Diapositiva del profesor · Tema</b><p>Texto literal del profesor.</p></div>
  <div class="box ojo">…</div>        <!-- advertencia / error frecuente -->
  <div class="box examen">…</div>     <!-- lo que entra en examen -->
  <div class="box concepto">…</div>
  {{FIG:d_mito.F_atp}}                <!-- inserta una figura SVG: módulo.función -->
  {{VIZ:clave}}                       <!-- inserta una visualización interactiva de visual.js -->
</section>
```

Después ejecuta `npm run build` y recarga la página.

## 6. Cómo agregar imágenes

- **Figura SVG nueva (recomendado, es el estilo del proyecto):** crea una función que devuelva el SVG en `generador/d_<tema>.py` o `generador/d_libro.py`, por ejemplo `def F_mi_figura(): return '<svg …>…</svg>'`, agrega su pie en `generador/plat/captions.py` con la clave `'d_<tema>.F_mi_figura'` (el build exige que exista) y colócala en la lectura con `{{FIG:d_<tema>.F_mi_figura}}`.
- **Imagen de archivo (PNG/JPG/SVG):** crea `hub/img/` y copia ahí el archivo; en la lectura usa `<img src="img/mi-imagen.png" alt="Descripción">`. Las rutas son relativas a `hub/`. Usa solo imágenes propias o con licencia que permita redistribuirlas.
- **Logos:** están en `generador/assets/` y se incrustan en base64 en las presentaciones y la portada.

## 7. Cómo agregar preguntas

En `generador/plat/q_<tema>.py` (las funciones están en `qhelp.py`). En opción múltiple, **la primera opción es la correcta** (se barajan al mostrarse) y cada opción lleva su retroalimentación:

```python
MC('principios', B, CON, '¿Qué es la transducción de señales?', [
 ('Convertir una señal externa en cambios dentro de la célula', 'Correcta: …'),
 ('Copiar el ADN antes de dividirse', 'Eso es la replicación.'),
 ('Transportar una hormona por la sangre', '…'),
 ('Sintetizar un neurotransmisor', '…')],
 'Explicación general.', 'Concepto relacionado')

TF('principios', I, MEC, 'Enunciado…', True, 'Explicación…')
FILL('principios', B, CON, 'La enzima que … es la ___.', ['adenilato ciclasa', 'adenilil ciclasa'], 'Explicación…')
MATCH('principios', B, CON, 'Relaciona…', [['A', 'definición A'], ['B', 'definición B']], 'Explicación…')
ORDER('principios', B, CON, 'Ordena…', ['paso 1', 'paso 2', 'paso 3'], 'Explicación…')
```

- Primer argumento: subtema (debe existir en `SUBLOC` de `extras.py`, que también enlaza con la sección de lectura).
- Dificultad: `B` básico, `I` intermedio, `A` avanzado.
- Categoría: `CON`, `COMP`, `MEC`, `INT`, `APL`, `RAZ`.
- Para un tema nuevo: crea `q_<tema>.py` y agrégalo a la lista de módulos de `build_plat.py`.

Luego `npm run build`. `npm run verificar` comprueba que todas las preguntas se califiquen bien.

## 8. Recursos externos

- **Google Fonts** (`fonts.googleapis.com` / `fonts.gstatic.com`): es el único recurso externo. Sin internet, la página funciona completa y usa fuentes de respaldo del sistema. Las fuentes tienen licencia libre (SIL OFL), así que si quieres un modo 100 % sin conexión puedes descargarlas y servirlas desde `hub/`, pero eso cambia el código, por lo que no se hizo en esta copia.
- No hay CDNs, librerías externas, APIs ni analítica.

## 9. Contenido y licencias

- Los textos, preguntas, figuras SVG y código son contenido propio de esta plataforma de estudio. Los recuadros «📌 Diapositiva del profesor» reproducen apuntes de clase para uso académico personal.
- Los logos de la UAEM y de la Facultad de Medicina son marcas institucionales; se incluyen solo porque ya forman parte de la página.
- Las referencias bibliográficas (Alberts, Lodish, etc.) son citas; no se incluye material de los libros.
