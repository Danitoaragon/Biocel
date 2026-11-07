#!/bin/sh
# Une los módulos de la lectura editorial de Señalización en hub/datos/senal-exp.js
cd "$(dirname "$0")"
cat a_core.js b_css.js c_mod1.js d_mod2.js e_mod3.js f_enhance.js > ../../../hub/datos/senal-exp.js
