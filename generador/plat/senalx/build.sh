#!/bin/sh
# Une los módulos de la lectura editorial de Señalización en hub/datos/senal-exp.js
cd "$(dirname "$0")"
cat a_core.js a2_bio.js a3_scenes.js b_css.js c_mod1.js d_mod2.js e_mod3.js e2_scale.js e3_cell3d.js f_enhance.js > ../../../hub/datos/senal-exp.js
