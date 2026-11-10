# Guía del proyecto para Claude Code

Plataforma de estudio de Biología Celular (Medicina, UAEM, 1er semestre). Sitio estático: HTML/CSS/JS puro + SVG. El contenido se genera con Python 3 (solo biblioteca estándar).

## Comandos
- `npm run dev` — sirve `hub/` en http://localhost:5173/
- `npm run build` — regenera los archivos generados de `hub/` desde `generador/` (orden: `plat/build_plat.py` → `gen_hub.py` → unión de `plat/senalx/*.js`)
- `npm run verificar` — prueba de humo con Playwright (56 comprobaciones)

## Qué se edita dónde
- Generados (NO editar en `hub/`, editar la fuente y hacer build): `hub/index.html`, las 5 presentaciones `hub/*.html`, `hub/datos/{libro,banco,meta,diapos,senal-exp}.js`.
- Editados a mano en `hub/`: `estudio.html` (SPA: rutas en `route()`, cuestionarios, examen, errores, modo oscuro, índice), `datos/visual.js`, `datos/progreso.js`.
- Lecturas: `generador/plat/libro/<tema>.html` (`{{FIG:mod.func}}`, `{{VIZ:clave}}`). Preguntas: `generador/plat/q_*.py` (en MC la 1.ª opción es la correcta).

## Reglas de contenido
- Español; explicaciones mecanísticas (estructura → mecanismo → función → consecuencia).
- Sin casos clínicos; la relevancia clínica solo como mecanismo breve.
- No eliminar contenido ni funciones existentes.
- Material del profesor, literal, en recuadros `box prof` con «📌»; marcar posibles errores con «Ojo con esto».
- No inventar estadísticas ni referencias.
- Después de cambiar algo, correr `npm run build` y `npm run verificar`.
