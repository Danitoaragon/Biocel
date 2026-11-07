"""Preguntas nuevas basadas en las diapositivas del profesor (citoesqueleto). Se agregan al final para no cambiar los id existentes."""
from qhelp import *
tema('cito')

# ---- contracción muscular y Ca2+ ----
MC('miosina', B, CON, '¿De dónde proviene el Ca²⁺ que inicia la contracción del músculo esquelético?', [
 ('Del retículo sarcoplásmico, que lo almacena', 'Correcta: el RS acumula Ca²⁺ en concentración alta y lo libera al citosol ante la excitación eléctrica.'),
 ('De las mitocondrias, que lo liberan con el ATP', 'Las mitocondrias aportan ATP, pero no son la fuente del Ca²⁺ que dispara la contracción.'),
 ('Del núcleo, a través de los poros nucleares', 'El núcleo no es un reservorio de Ca²⁺ para la contracción.'),
 ('Del aparato de Golgi, por exocitosis rápida', 'El Golgi procesa proteínas; no libera el Ca²⁺ de la contracción.')],
 'El retículo sarcoplásmico es el reservorio de Ca²⁺ de la fibra muscular.', 'Retículo sarcoplásmico')
MC('miosina', I, MEC, '¿Qué hace la tropomiosina en un músculo en reposo?', [
 ('Cubre los sitios de unión de la miosina en la actina', 'Correcta: es una varilla rígida en el surco de la hélice de actina que cubre siete monómeros y bloquea a la miosina.'),
 ('Une Ca²⁺ y cambia de forma para activar la miosina', 'Eso lo hace la troponina, que es el sensor de Ca²⁺.'),
 ('Hidroliza ATP para separar la miosina de la actina', 'La hidrólisis de ATP la hace la cabeza de la miosina.'),
 ('Ancla los filamentos de actina a los discos Z', 'La tropomiosina no ancla la actina al disco Z.')],
 'Tropomiosina = bloqueo; troponina = sensor de Ca²⁺.', 'Tropomiosina')
MC('miosina', I, MEC, 'Cuando aumenta el Ca²⁺ citosólico en una fibra muscular, ¿qué ocurre primero?', [
 ('El Ca²⁺ se une a la troponina y cambia su conformación', 'Correcta: la troponina tiene una subunidad sensible a Ca²⁺; su cambio de forma desplaza a la tropomiosina.'),
 ('El Ca²⁺ se une directamente a la cabeza de la miosina', 'En el músculo esquelético el Ca²⁺ actúa sobre la troponina, no sobre la miosina.'),
 ('El Ca²⁺ despolimeriza los filamentos de actina', 'El Ca²⁺ no desarma la actina; libera sus sitios de unión.'),
 ('El Ca²⁺ se une a la tropomiosina y la degrada', 'La tropomiosina solo se desplaza ligeramente; no se degrada.')],
 'Ca²⁺ → troponina → cambio conformacional → la tropomiosina se desplaza → la miosina se une.', 'Troponina')
ORDER('miosina', I, MEC, 'Ordena los pasos que inician la contracción del músculo esquelético.', [
 'Excitación eléctrica: cambia el voltaje de la membrana', 'Se abren canales del retículo sarcoplásmico', 'Sube el Ca²⁺ en el citosol', 'El Ca²⁺ se une a la troponina', 'La tropomiosina se desplaza del surco', 'Las cabezas de miosina se unen a la actina'],
 'Cadena causal: señal eléctrica → liberación de Ca²⁺ → interruptor troponina-tropomiosina → unión actina-miosina.', 'Inicio de la contracción')
TF('miosina', I, COMP, 'La troponina es la proteína que bloquea directamente los sitios de unión de la miosina en la actina.', False,
 'La que bloquea es la tropomiosina. La troponina es el sensor de Ca²⁺ que, al cambiar de forma, la desplaza.',
 corr='La tropomiosina bloquea los sitios de unión; la troponina detecta el Ca²⁺ y mueve a la tropomiosina.', concepto='Tropomiosina y troponina')
FILL('miosina', B, CON, 'En el músculo, el Ca²⁺ se une a un "interruptor molecular" formado por proteínas accesorias de la actina. La proteína que contiene la subunidad sensible a Ca²⁺ es la ______.', ['troponina'],
 'La troponina se ubica en el extremo de la tropomiosina y tiene una subunidad que une Ca²⁺.', 'Troponina')
MC('miosina', A, RAZ, 'Si la troponina de una fibra muscular no pudiera unir Ca²⁺, ¿qué se esperaría?', [
 ('No habría contracción aunque hubiera ATP y Ca²⁺', 'Correcta: la tropomiosina seguiría cubriendo los sitios de unión y la miosina no podría unirse a la actina.'),
 ('Contracción continua sin posibilidad de relajarse', 'Ocurriría lo contrario: el bloqueo de la tropomiosina nunca se retiraría.'),
 ('Contracción normal, porque la miosina no usa Ca²⁺', 'Sin el interruptor de troponina la miosina no accede a la actina.'),
 ('Despolimerización de todos los filamentos de actina', 'La troponina regula el acceso de la miosina, no la polimerización.')],
 'Sin sensor de Ca²⁺ el interruptor queda en "apagado".', 'Troponina')
MC('miosina', I, COMP, '¿Por qué se dice que el Ca²⁺ es una "señal intracelular universal"?', [
 ('Porque traduce estímulos externos en respuestas internas', 'Correcta: en muchas células, un aumento de Ca²⁺ citosólico transmite el mensaje del exterior a la maquinaria interna.'),
 ('Porque es la fuente de energía de todas las proteínas', 'La energía la aporta el ATP, no el Ca²⁺.'),
 ('Porque forma parte de la estructura de todos los filamentos', 'El Ca²⁺ no es un componente estructural de los filamentos.'),
 ('Porque atraviesa libremente todas las membranas celulares', 'El Ca²⁺ necesita canales y bombas para cruzar membranas.')],
 'El Ca²⁺ es un mensajero: su aumento brusco activa respuestas como la contracción.', 'Ca²⁺ como señal')
# ---- miosina ----
MC('miosina', B, CON, 'Según la cadena simplificada del funcionamiento de la miosina, ¿qué sigue después de "ATP → energía"?', [
 ('Cambio conformacional de la miosina', 'Correcta: ATP → energía → cambio conformacional de miosina → desplazamiento sobre actina.'),
 ('Polimerización de nueva actina', 'La miosina no polimeriza actina; se desplaza sobre ella.'),
 ('Liberación de Ca²⁺ del retículo', 'El Ca²⁺ inicia la contracción, pero no es el paso que sigue al uso del ATP por la miosina.'),
 ('Hidrólisis del GTP de la tubulina', 'La tubulina pertenece a los microtúbulos, no al ciclo de la miosina.')],
 'El ATP cambia la forma de la cabeza de la miosina y ese cambio la desplaza sobre la actina.', 'Miosina')
MC('miosina', B, CON, '¿Para cuál de estos procesos NO es particularmente importante la miosina II?', [
 ('El transporte de vesículas hacia el extremo + de los microtúbulos', 'Correcta: ese transporte lo hace la cinesina sobre microtúbulos.'),
 ('La contracción muscular', 'La miosina II es la base de la contracción muscular.'),
 ('La contracción de células no musculares', 'La miosina II contrae fibras de estrés y la parte trasera de células que migran.'),
 ('La citocinesis', 'La miosina II forma con la actina el anillo contráctil.')],
 'Miosina II: contracción muscular, contracción de células no musculares y citocinesis.', 'Miosina II')
# ---- actina ----
MC('actina', B, CON, '¿Cómo se llaman en inglés los extremos + y − del filamento de actina?', [
 ('Barbed end (+) y pointed end (−)', 'Correcta: extremo barbado (+) y extremo puntiagudo (−), por su aspecto al decorarse con miosina.'),
 ('Pointed end (+) y barbed end (−)', 'Está invertido: el + es el barbado.'),
 ('Leading end (+) y trailing end (−)', 'Esos no son los nombres de los extremos de la actina.'),
 ('Plus cap (+) y minus cap (−)', 'No son los nombres usados para la actina.')],
 'Extremo + = barbed end; extremo − = pointed end.', 'Polaridad de la actina')
FILL('actina', B, CON, 'El recambio de la actina en el que el extremo + gana subunidades mientras el − las pierde se llama treadmilling o "cinta ______ molecular".', ['transportadora'],
 'Treadmilling = cinta transportadora molecular: el filamento conserva su largo y sus subunidades avanzan.', 'Treadmilling')
MC('actina', I, COMP, '¿Qué proteína forma filamentos de actina LINEALES?', [
 ('Las forminas', 'Correcta: las forminas participan en la formación de filamentos de actina lineales.'),
 ('El complejo Arp2/3', 'Arp2/3 nuclea ramas y forma redes ramificadas.'),
 ('La cofilina', 'La cofilina favorece el recambio y el desensamblaje.'),
 ('La profilina', 'La profilina favorece la incorporación de actina-G al filamento.')],
 'Formina = lineales; Arp2/3 = ramificadas.', 'Proteínas asociadas a actina')
MATCH('actina', I, COMP, 'Relaciona cada proteína asociada a actina con lo que favorece.', [
 ['Forminas', 'Filamentos de actina lineales'], ['Complejo Arp2/3', 'Nucleación y redes ramificadas'], ['Profilina', 'Incorporación de actina-G al filamento'], ['Cofilina', 'Recambio y desensamblaje de filamentos']],
 'Son las cuatro proteínas que destaca el profesor.', 'Proteínas asociadas a actina')
MC('actina', I, APL, '¿Por qué el complejo Arp2/3 es muy importante en la migración celular?', [
 ('Forma redes ramificadas que empujan la membrana del frente', 'Correcta: la red ramificada del lamelipodio empuja la membrana hacia adelante.'),
 ('Corta los filamentos viejos de la parte trasera', 'Cortar y desensamblar es tarea de la cofilina.'),
 ('Forma los filamentos gruesos de miosina II', 'Arp2/3 actúa sobre la actina, no sobre la miosina.'),
 ('Ancla los microtúbulos al centrosoma', 'Eso lo hace la γ-tubulina, no Arp2/3.')],
 'Arp2/3 nuclea ramas sobre filamentos existentes; esa red es la base del lamelipodio.', 'Arp2/3')
MC('actina', B, CON, '¿Cuál de estos movimientos NO depende de la actina?', [
 ('El batido de un cilio', 'Correcta: el cilio bate gracias a microtúbulos y dineína axonemal.'),
 ('La migración de una célula inmunitaria', 'Depende de la actina (lamelipodios, filopodios, contracción trasera).'),
 ('La citocinesis', 'El anillo contráctil es de actina y miosina II.'),
 ('El cambio de forma de una célula', 'La corteza de actina determina la forma celular.')],
 'Actina: migración, protrusiones, contracción, citocinesis, células inmunitarias y forma celular.', 'Actina y movimiento')
TF('actina', B, CON, 'La polimerización y la despolimerización de la actina dependen de ATP.', True,
 'La actina-G une ATP; tras incorporarse se hidroliza a ADP, lo que marca la edad del filamento y favorece su despolimerización.', concepto='Actina y ATP')
# ---- filamentos intermedios ----
MATCH('fi', B, CON, 'Relaciona cada filamento intermedio con su localización.', [
 ['Queratinas', 'Células epiteliales'], ['Vimentina', 'Células de origen mesenquimal'], ['Desmina', 'Músculo'], ['Neurofilamentos', 'Neuronas'], ['Láminas nucleares', 'Núcleo']],
 'La composición de los filamentos intermedios es muy diversa y cambia según el tejido.', 'Tipos de filamentos intermedios')
MC('fi', B, COMP, '¿Qué diferencia a los filamentos intermedios de la actina y los microtúbulos en cuanto a su ensamblaje?', [
 ('No dependen de ATP ni GTP para ensamblarse', 'Correcta: sus subunidades no unen nucleótidos; por eso son más estables.'),
 ('Dependen de GTP igual que la tubulina', 'El GTP es de la tubulina; los intermedios no lo usan.'),
 ('Dependen de ATP igual que la actina', 'El ATP es de la actina; los intermedios no lo usan.'),
 ('Usan a la miosina como motor para ensamblarse', 'No tienen motor equivalente.')],
 'Sin nucleótido y sin polaridad funcional: estables, sin motores, función de resistencia.', 'Filamentos intermedios')
# ---- microtúbulos ----
MATCH('mt', I, COMP, 'Relaciona cada fenómeno de la inestabilidad dinámica con su descripción.', [
 ['Crecimiento', 'El extremo conserva un casquete de tubulina-GTP'], ['Catástrofe', 'Se pierde el casquete y empieza la despolimerización rápida'], ['Rescate', 'El microtúbulo que se acortaba vuelve a crecer'], ['Tubulina-GDP', 'Tubulina ya incorporada cuyo GTP se hidrolizó']],
 'Inestabilidad dinámica = crecimiento, acortamiento, catástrofe y rescate.', 'Inestabilidad dinámica')
MC('mt', B, CON, '¿Qué componente del centrosoma contiene las proteínas que nuclean los microtúbulos?', [
 ('El material pericentriolar, con γ-tubulina', 'Correcta: la γ-tubulina forma complejos que funcionan como sitios de nucleación.'),
 ('El par central de microtúbulos', 'El par central pertenece al axonema 9 + 2, no al centrosoma.'),
 ('Los brazos de dineína de los centriolos', 'Los centriolos no tienen brazos de dineína.'),
 ('La lámina nuclear adyacente', 'La lámina nuclear es un filamento intermedio del núcleo.')],
 'Centrosoma = par de centriolos + material pericentriolar (γ-tubulina).', 'Centrosoma')
MC('motores', B, CON, 'En la analogía "microtúbulo = vía, proteína motora = vehículo", ¿qué representa la energía?', [
 ('El ATP que hidroliza el motor', 'Correcta: cinesinas y dineínas usan ATP para avanzar.'),
 ('El GTP del casquete del microtúbulo', 'El casquete de GTP regula la estabilidad, no mueve al motor.'),
 ('El Ca²⁺ liberado del retículo', 'El Ca²⁺ regula la contracción muscular, no el transporte por cinesina.'),
 ('La carga que transporta el motor', 'La carga es lo transportado, no la energía.')],
 'Microtúbulo = vía; proteína motora = vehículo; ATP = energía.', 'Transporte intracelular')
MC('cilios', I, MEC, 'Según el profesor, ¿cómo genera la dineína axonemal la curvatura del cilio?', [
 ('Desliza dobletes y el axonema convierte eso en curvatura', 'Correcta: las restricciones estructurales (nexina, cuerpo basal) transforman el deslizamiento en flexión.'),
 ('Empuja directamente la membrana del cilio hacia un lado', 'La dineína no "empuja" el cilio; desliza microtúbulos.'),
 ('Despolimeriza los dobletes de un solo lado del axonema', 'El axonema no se dobla por despolimerización.'),
 ('Contrae el par central como lo hace la miosina', 'El par central no se contrae; la miosina no participa.')],
 'Deslizamiento entre microtúbulos + restricciones del axonema = curvatura.', 'Axonema')
# ---- importancia médica (nivel diapositiva) ----
MC('clinica', I, MEC, '¿Cómo alteran los taxanos (como el paclitaxel) la dinámica de los microtúbulos?', [
 ('Los estabilizan e impiden que se acorten', 'Correcta: los taxanos estabilizan los microtúbulos.'),
 ('Impiden que la tubulina se polimerice', 'Eso hacen la colchicina, la vincristina y la vinblastina.'),
 ('Cortan los microtúbulos en fragmentos', 'Los taxanos no cortan microtúbulos.'),
 ('Bloquean el ATP de la cinesina', 'No actúan sobre los motores.')],
 'Taxanos = estabilizan; vinca y colchicina = impiden polimerizar.', 'Taxanos')
MC('clinica', I, RAZ, '¿Por qué los fármacos que alteran la dinámica de los microtúbulos afectan más a las células que se dividen rápidamente?', [
 ('Porque dependen de reorganizar sus microtúbulos en la mitosis', 'Correcta: el huso mitótico necesita microtúbulos que crezcan y se acorten.'),
 ('Porque tienen más filamentos intermedios que las demás', 'Los fármacos no actúan sobre los filamentos intermedios.'),
 ('Porque carecen por completo de filamentos de actina', 'Todas las células tienen actina.'),
 ('Porque no tienen centrosoma para formar el huso', 'Sí tienen centrosoma; el problema es la dinámica de los microtúbulos.')],
 'Sin dinámica de microtúbulos no hay huso funcional y la célula se detiene en la mitosis.', 'Fármacos y mitosis')
MATCH('clinica', B, CON, 'Relaciona cada fármaco con su efecto sobre los microtúbulos.', [
 ['Colchicina', 'Interfiere con la dinámica; impide polimerizar'], ['Vincristina y vinblastina', 'Impiden polimerizar; antineoplásicos'], ['Taxanos (paclitaxel)', 'Estabilizan los microtúbulos']],
 'Diapositiva "Importancia médica" del profesor.', 'Fármacos sobre microtúbulos')
# ---- tabla comparativa ----
MATCH('general', I, COMP, 'Según la tabla comparativa, relaciona cada filamento con su papel en la mitosis.', [
 ['Actina', 'Citocinesis'], ['Microtúbulos', 'Huso mitótico'], ['Filamentos intermedios', 'Soporte estructural']],
 'Actina divide el citoplasma; los microtúbulos separan los cromosomas; los intermedios dan soporte.', 'Tabla comparativa')
MATCH('general', B, CON, 'Relaciona cada filamento con su nucleótido asociado.', [
 ['Actina', 'ATP'], ['Microtúbulos', 'GTP'], ['Filamentos intermedios', 'No dependen de ATP/GTP']],
 'El nucleótido es la base de la dinámica; los intermedios no lo usan.', 'Tabla comparativa')
MC('general', B, CON, '¿Cuál es el diámetro aproximado de los microtúbulos?', [
 ('≈25 nm', 'Correcta: son los filamentos más gruesos.'),
 ('≈7 nm', 'Ese es el diámetro de los microfilamentos de actina.'),
 ('≈10 nm', 'Ese es el diámetro de los filamentos intermedios.'),
 ('≈2 nm', 'Corresponde aproximadamente al diámetro de la doble hélice del ADN.')],
 'Actina ≈7 nm · intermedios ≈10 nm · microtúbulos ≈25 nm.', 'Tabla comparativa')
