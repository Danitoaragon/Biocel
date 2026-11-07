"""Más preguntas generales de mitocondria (cobertura de todo el capítulo). Se agregan al final para no cambiar ids."""
from qhelp import *
tema('mito')

# ---- conceptos base: oxidación, ATP ----
MC('metabolismo', B, CON, '¿Qué significa oxidar una molécula?', [
 ('Quitarle electrones', 'Correcta: oxidar es quitar electrones; reducir es darlos.'),
 ('Agregarle electrones', 'Eso es reducir.'),
 ('Agregarle oxígeno siempre', 'La oxidación no requiere oxígeno; se define por la pérdida de electrones.'),
 ('Quitarle un grupo fosfato', 'Quitar un fosfato es una hidrólisis o desfosforilación.')],
 'Cuando la glucosa se oxida, sus electrones pasan a NAD⁺ y FAD.', 'Oxidación y reducción')
MATCH('metabolismo', B, CON, 'Relaciona cada transportador con su forma reducida.', [
 ['NAD⁺', 'NADH'], ['FAD', 'FADH₂'], ['Ubiquinona (Q)', 'Ubiquinol (QH₂)'], ['O₂', 'H₂O']],
 'Las formas reducidas llevan los electrones; el O₂ reducido termina como agua.', 'Transportadores de electrones')
MC('metabolismo', I, COMP, '¿Por qué la mitocondria libera la energía de los electrones en pasos pequeños y no de golpe?', [
 ('Para aprovechar cada paso en bombear protones', 'Correcta: de golpe la energía se perdería como calor; en pasos se usa para bombear H⁺.'),
 ('Porque el NADH no puede ceder electrones directamente', 'El NADH sí cede sus electrones (al complejo I).'),
 ('Porque el oxígeno no acepta electrones del NADH', 'El O₂ es el mejor aceptor; el problema es la pérdida como calor.'),
 ('Para producir más CO₂ en cada paso', 'El CO₂ se produce en la PDH y el ciclo de Krebs, no en la cadena.')],
 'Muchos transportadores con afinidad creciente por los electrones = energía liberada en pasos útiles.', 'Cadena respiratoria')
MC('metabolismo', B, CON, '¿Qué enlace del ATP se hidroliza para liberar energía útil para la célula?', [
 ('El enlace del último fosfato (ATP → ADP + Pᵢ)', 'Correcta: la hidrólisis del fosfato terminal libera la energía que se acopla a otras reacciones.'),
 ('El enlace entre la adenina y la ribosa', 'Ese enlace no se rompe en el uso energético del ATP.'),
 ('El enlace entre la ribosa y el primer fosfato', 'Ese enlace se mantiene en el ADP y el AMP.'),
 ('Los puentes de hidrógeno de la adenina', 'El ATP no almacena energía en puentes de hidrógeno.')],
 'ATP + H₂O → ADP + Pᵢ + energía.', 'ATP')
TF('metabolismo', B, CON, 'El ATP se almacena en grandes cantidades en la célula como reserva de energía de largo plazo.', False,
 'El ATP no se almacena en grandes cantidades: se recicla continuamente, y la mitocondria vuelve a unir el fosfato al ADP.',
 corr='El ATP se recicla constantemente; las reservas son glucógeno y grasas.', concepto='ATP')
MATCH('metabolismo', I, COMP, 'Relaciona cada forma de producir ATP con su característica.', [
 ['Fosforilación a nivel de sustrato', 'Transfiere un fosfato desde un intermediario; rinde poco'], ['Fosforilación oxidativa', 'Usa un gradiente de protones; produce la mayoría del ATP']],
 'Sustrato: glucólisis y un paso de Krebs. Oxidativa: membrana interna.', 'Formas de hacer ATP')
MC('metabolismo', I, COMP, '¿En qué paso del ciclo de Krebs ocurre fosforilación a nivel de sustrato?', [
 ('Succinil-CoA → succinato (forma GTP)', 'Correcta: es el único paso del ciclo que forma directamente GTP/ATP.'),
 ('Isocitrato → α-cetoglutarato', 'Ese paso forma NADH y CO₂.'),
 ('Succinato → fumarato', 'Ese paso forma FADH₂ (complejo II).'),
 ('Malato → oxalacetato', 'Ese paso forma NADH.')],
 '1 GTP por vuelta, en la succinil-CoA sintetasa.', 'Ciclo de Krebs')
# ---- origen ----
MATCH('origen', B, CON, 'Relaciona cada característica de la mitocondria con lo que la asemeja a una bacteria.', [
 ['Doble membrana', 'Restos de la membrana de la bacteria englobada'], ['ADN circular sin histonas', 'Genoma parecido al bacteriano'], ['Ribosomas propios', 'Más parecidos a los bacterianos que a los citosólicos'], ['Fisión', 'Se divide como una bacteria']],
 'Todas son pruebas de la teoría endosimbiótica.', 'Teoría endosimbiótica')
TF('origen', B, CON, 'La cardiolipina se encuentra en la membrana interna mitocondrial y también en membranas bacterianas, lo que apoya el origen endosimbiótico.', True,
 'Es prácticamente exclusiva de la membrana interna y de las bacterias.', concepto='Cardiolipina')
MC('origen', I, COMP, 'Si la mitocondria desciende de una bacteria, ¿por qué hoy depende del núcleo para casi todas sus proteínas?', [
 ('Porque la mayoría de los genes bacterianos pasaron al núcleo', 'Correcta: con el tiempo hubo transferencia de genes al genoma nuclear.'),
 ('Porque el ADNmt se perdió por completo', 'El ADNmt existe: conserva 37 genes.'),
 ('Porque los ribosomas mitocondriales no traducen', 'Sí traducen las 13 proteínas del ADNmt.'),
 ('Porque la membrana interna no deja pasar ARNm', 'La causa es la transferencia de genes, no el paso de ARNm.')],
 'Por eso >99 % de las proteínas mitocondriales se importan.', 'Origen')
# ---- estructura ----
MC('estructura', B, CON, '¿Qué proteína hace permeable a la membrana externa?', [
 ('La porina (VDAC)', 'Correcta: forma canales que dejan pasar moléculas de hasta ≈5000 Da.'),
 ('La ATP sintasa', 'Está en la membrana interna.'),
 ('El complejo TIM', 'TIM está en la membrana interna e importa proteínas.'),
 ('La termogenina (UCP1)', 'Es un canal de protones de la membrana interna de la grasa parda.')],
 'Porinas = membrana externa permeable a moléculas pequeñas.', 'Membrana externa')
FILL('estructura', B, CON, 'La porina deja pasar moléculas de hasta aproximadamente ______ Da.', ['5000', '5 000', '5,000'],
 'Por eso el espacio intermembrana se parece al citosol en iones y metabolitos pequeños.', 'Porina')
MATCH('estructura', I, COMP, 'Relaciona cada enzima o proteína con la membrana o compartimento donde se encuentra.', [
 ['Monoamino oxidasa', 'Membrana externa'], ['Citocromo c', 'Espacio intermembrana'], ['ATP sintasa', 'Membrana interna'], ['Piruvato deshidrogenasa', 'Matriz']],
 'La MAO es marcadora de la membrana externa.', 'Compartimentos')
MC('estructura', I, COMP, '¿Por qué la composición en iones del espacio intermembrana se parece a la del citosol?', [
 ('Porque la membrana externa es permeable a moléculas pequeñas', 'Correcta: las porinas equilibran iones y metabolitos pequeños.'),
 ('Porque la membrana interna deja pasar todo', 'La interna es muy impermeable.'),
 ('Porque no tiene ninguna proteína propia', 'Sí tiene proteínas propias, como el citocromo c.'),
 ('Porque ahí se sintetizan las proteínas del citosol', 'No se sintetizan proteínas en el espacio intermembrana.')],
 'Las proteínas grandes no pasan las porinas, por eso su contenido proteico sí es propio.', 'Espacio intermembrana')
MC('estructura', I, COMP, '¿Qué función cumple la creatina cinasa mitocondrial del espacio intermembrana?', [
 ('Pasa el fosfato del ATP a la creatina (fosfocreatina)', 'Correcta: forma una reserva rápida de energía en músculo y cerebro.'),
 ('Bombea protones hacia la matriz', 'Ninguna cinasa bombea protones.'),
 ('Transporta electrones al complejo IV', 'Eso lo hace el citocromo c.'),
 ('Corta la secuencia señal de las proteínas importadas', 'Eso lo hace una peptidasa de la matriz.')],
 'Fosfocreatina = reserva rápida de fosfatos de alta energía.', 'Espacio intermembrana')
MATCH('estructura', I, CON, 'Relaciona cada característica de la cardiolipina.', [
 ['Estructura', 'Cuatro cadenas de ácidos grasos y dos cargas negativas'], ['Abundancia', '≈20 % de los lípidos de la membrana interna'], ['Permeabilidad', 'Hace a la membrana menos permeable a H⁺'], ['Citocromo c', 'Lo mantiene anclado a la membrana interna']],
 'La cardiolipina es el lípido característico de la membrana interna.', 'Cardiolipina')
MC('estructura', A, RAZ, '¿Qué ocurre cuando la cardiolipina se oxida?', [
 ('El citocromo c se suelta con más facilidad (paso temprano de la apoptosis)', 'Correcta: la cardiolipina ancla al citocromo c; oxidada, lo libera.'),
 ('La membrana externa se vuelve impermeable', 'La cardiolipina está en la interna y no controla a la externa.'),
 ('La ATP sintasa gira más rápido', 'No es una consecuencia de oxidar la cardiolipina.'),
 ('El ADNmt se duplica', 'No hay relación directa con la replicación del ADNmt.')],
 'Cardiolipina oxidada → citocromo c libre → puede salir al citosol.', 'Cardiolipina')
TF('estructura', B, CON, 'La membrana interna mitocondrial es una de las más ricas en proteína de la célula: cerca de tres cuartas partes de su masa son proteínas.', True,
 'Refleja la gran cantidad de complejos respiratorios, ATP sintasas y transportadores.', concepto='Membrana interna')
MC('estructura', A, MEC, '¿Qué función tienen las uniones de las crestas (organizadas por MICOS)?', [
 ('Hacen que cada cresta funcione casi como un compartimento propio', 'Correcta: los cuellos estrechos concentran protones cerca de la ATP sintasa.'),
 ('Unen la membrana externa con el núcleo', 'Las crestas no se unen al núcleo.'),
 ('Fabrican la cardiolipina de la membrana externa', 'MICOS organiza las crestas; no sintetiza lípidos.'),
 ('Son poros por donde sale el ATP al citosol', 'El ATP sale por el translocador ADP/ATP y las porinas.')],
 'Membrana limitante interna + membrana de las crestas, comunicadas por las uniones de las crestas.', 'Crestas')
TF('estructura', I, COMP, 'Las ATP sintasas forman dímeros que se alinean en los bordes de las crestas y ayudan a curvar la membrana.', True,
 'Las hileras de dímeros de ATP sintasa contribuyen a la forma de las crestas.', concepto='Crestas')
MC('estructura', I, CON, '¿Cuál de estas vías NO tiene pasos en la matriz mitocondrial?', [
 ('La glucólisis', 'Correcta: la glucólisis ocurre en el citosol.'),
 ('El ciclo de Krebs', 'Está en la matriz (salvo la succinato deshidrogenasa).'),
 ('La β-oxidación', 'Ocurre en la matriz.'),
 ('El ciclo de la urea', 'Sus dos primeros pasos ocurren en la matriz del hepatocito.')],
 'Matriz: PDH, Krebs, β-oxidación, parte de la urea y del hemo.', 'Matriz')
MC('estructura', I, COMP, '¿Por qué el pH de la matriz es ligeramente alcalino (≈7.8)?', [
 ('Porque los protones se bombean de la matriz hacia afuera', 'Correcta: al sacar H⁺, la matriz queda más alcalina.'),
 ('Porque la matriz acumula los protones bombeados', 'Al revés: se acumulan en el espacio intermembrana.'),
 ('Porque el ATP es una base fuerte', 'El pH lo determina el bombeo de H⁺.'),
 ('Porque las porinas expulsan ácidos', 'Las porinas están en la membrana externa.')],
 'El ΔpH es parte de la fuerza protón-motriz.', 'Matriz')
FILL('estructura', I, CON, 'Las enzimas del ciclo de Krebs están en la matriz, excepto la succinato ______, que está en la membrana interna.', ['deshidrogenasa'],
 'La succinato deshidrogenasa es también el complejo II.', 'Matriz')
# ---- ADN mitocondrial ----
FILL('adn', B, CON, 'El ADN mitocondrial humano es una molécula circular de ______ pares de bases.', ['16 569', '16569', '16,569', '16.569'],
 'Contiene 37 genes.', 'ADN mitocondrial')
MATCH('adn', B, CON, 'Relaciona cada producto con el número de genes del ADNmt que lo codifican.', [
 ['Proteínas', '13'], ['ARN de transferencia', '22'], ['ARN ribosomales', '2'], ['Total de genes', '37']],
 '13 + 22 + 2 = 37.', 'ADN mitocondrial')
MC('adn', I, COMP, '¿Por qué el ADNmt acumula mutaciones con más frecuencia que el ADN nuclear?', [
 ('Carece de histonas y está expuesto a las ROS de la cadena', 'Correcta: está cerca de la fuente de ROS y sin la protección de las histonas.'),
 ('Se replica solo una vez en la vida', 'El ADNmt se replica continuamente.'),
 ('Tiene mucho ADN no codificante', 'Al contrario, tiene muy poco ADN no codificante.'),
 ('Está dentro del núcleo, junto a los cromosomas', 'Está en la matriz mitocondrial.')],
 'Sin histonas + cerca de las ROS = más mutaciones.', 'ADN mitocondrial')
FILL('adn', I, CON, 'El ADNmt se organiza con proteínas como TFAM en estructuras compactas llamadas ______.', ['nucleoides', 'nucleoide'],
 'Los nucleoides están anclados a la membrana interna.', 'Nucleoides')
MC('adn', I, CON, '¿Qué diferencia tiene el código genético mitocondrial respecto al "universal"?', [
 ('UGA codifica triptófano en lugar de ser codón de paro', 'Correcta: es el ejemplo clásico.'),
 ('AUG codifica leucina en lugar de metionina', 'AUG sigue siendo inicio y metionina.'),
 ('Usa codones de cuatro nucleótidos', 'Los codones siguen siendo de tres nucleótidos.'),
 ('No tiene codones de paro', 'Sí tiene codones de paro.')],
 'El código es casi universal; la mitocondria tiene pequeñas excepciones.', 'Código mitocondrial')
MC('adn', I, CON, '¿Cuál es el coeficiente de sedimentación de los ribosomas mitocondriales de los mamíferos?', [
 ('55S (28S + 39S)', 'Correcta: más ricos en proteína y pobres en ARN que los bacterianos.'),
 ('80S (40S + 60S)', 'Esos son los ribosomas citosólicos eucariotas.'),
 ('70S (30S + 50S)', 'Esos son los ribosomas bacterianos.'),
 ('60S (40S + 20S)', 'No corresponde a ningún ribosoma.')],
 'Su semejanza funcional con los bacterianos explica efectos de algunos antibióticos.', 'Ribosomas mitocondriales')
TF('adn', B, CON, 'Más del 99 % de las proteínas mitocondriales se codifican en el núcleo, se sintetizan en el citosol y se importan.', True,
 'El ADNmt solo codifica 13 proteínas.', concepto='Importación de proteínas')
# ---- importación ----
MATCH('importacion', I, COMP, 'Relaciona cada elemento de la importación de proteínas con su función.', [
 ['Secuencia señal', 'Hélice anfipática con cargas positivas en el extremo amino'], ['Complejo TOM', 'Puerta de la membrana externa'], ['Complejo TIM', 'Lleva la proteína a la matriz'], ['Peptidasa de la matriz', 'Corta la secuencia señal']],
 'Las chaperonas mantienen la proteína desplegada y la ayudan a plegarse al final.', 'Importación')
MC('importacion', A, MEC, '¿Qué impulsa la entrada de la proteína a través de TIM hacia la matriz?', [
 ('El potencial de membrana y chaperonas de la matriz que usan ATP', 'Correcta: la secuencia señal positiva es atraída por la matriz negativa; las chaperonas jalan con ATP.'),
 ('El GTP de la tubulina', 'La tubulina no participa en la importación.'),
 ('La luz que absorbe la membrana interna', 'La mitocondria no usa luz.'),
 ('La fuerza de la contracción de actina', 'La actina no participa.')],
 'Δψ (matriz negativa) + ATP de las chaperonas de la matriz.', 'Importación')
TF('importacion', I, COMP, 'Las proteínas que se importan a la mitocondria deben estar desplegadas para atravesar TOM y TIM.', True,
 'Chaperonas citosólicas las mantienen desplegadas; en la matriz se pliegan.', concepto='Importación')
# ---- transporte de metabolitos ----
MATCH('metabolismo', I, COMP, 'Relaciona cada sustancia con la forma en que cruza la membrana interna.', [
 ['Piruvato', 'Entra junto con un protón'], ['ATP / ADP', 'Translocador de nucleótidos de adenina (intercambio)'], ['Ácidos grasos', 'Unidos a carnitina'], ['NADH del citosol', 'Solo sus electrones, por lanzaderas']],
 'La membrana interna es impermeable: cada sustrato tiene su transportador.', 'Transporte de metabolitos')
MC('metabolismo', I, COMP, '¿Por qué el NADH formado en la glucólisis necesita lanzaderas para aprovecharse en la mitocondria?', [
 ('Porque el NADH no cruza la membrana interna', 'Correcta: solo sus electrones entran (malato-aspartato o glicerol-3-fosfato).'),
 ('Porque el NADH citosólico no tiene electrones', 'Sí tiene; el problema es que no cruza.'),
 ('Porque las lanzaderas producen ATP directamente', 'Las lanzaderas transfieren electrones, no forman ATP.'),
 ('Porque la membrana externa es impermeable al NADH', 'La barrera es la membrana interna.')],
 'La lanzadera usada cambia el rendimiento: 2.5 o 1.5 ATP por NADH.', 'Lanzaderas')
TF('metabolismo', I, COMP, 'Parte de la energía del gradiente de protones se gasta en transportar metabolitos como el fosfato y el piruvato.', True,
 'Por eso se necesitan ≈4 H⁺ por ATP que llega al citosol.', concepto='Transporte de metabolitos')
# ---- glucólisis, PDH, Krebs, β-oxidación ----
MC('metabolismo', B, CON, '¿Cuál es el balance neto de la glucólisis por cada glucosa?', [
 ('2 piruvatos, 2 ATP y 2 NADH', 'Correcta: es la ganancia neta en el citosol.'),
 ('2 acetil-CoA, 2 NADH y 2 CO₂', 'Ese es el balance de la PDH.'),
 ('6 NADH, 2 FADH₂ y 2 GTP', 'Ese es el balance del ciclo de Krebs.'),
 ('30–32 ATP', 'Es el total de la oxidación completa.')],
 'Glucólisis: citosol, sin O₂.', 'Glucólisis')
FILL('metabolismo', B, CON, 'En el ciclo de Krebs, el acetil-CoA (2 C) se condensa con el oxalacetato (4 C) para formar ______ (6 C).', ['citrato', 'acido citrico', 'ácido cítrico'],
 'El ciclo regenera el oxalacetato al final.', 'Ciclo de Krebs')
MC('metabolismo', I, COMP, '¿Cuántas veces gira el ciclo de Krebs por cada glucosa y por qué?', [
 ('Dos, porque cada glucosa forma dos acetil-CoA', 'Correcta: una glucosa → 2 piruvatos → 2 acetil-CoA.'),
 ('Una, porque la glucosa entra completa al ciclo', 'La glucosa no entra al ciclo; entra el acetil-CoA.'),
 ('Seis, una por cada carbono de la glucosa', 'Los carbonos salen como CO₂ en PDH y Krebs, pero el ciclo gira dos veces.'),
 ('Cuatro, una por cada CO₂ liberado', 'No gira una vez por cada CO₂.')],
 'Por eso las cifras por vuelta se duplican.', 'Ciclo de Krebs')
MATCH('metabolismo', I, CON, 'Relaciona cada enzima del ciclo de Krebs con su producto.', [
 ['Isocitrato deshidrogenasa', 'NADH + CO₂'], ['α-cetoglutarato deshidrogenasa', 'NADH + CO₂ (forma succinil-CoA)'], ['Succinato deshidrogenasa', 'FADH₂'], ['Malato deshidrogenasa', 'NADH (regenera oxalacetato)']],
 '3 NADH, 1 FADH₂ y 1 GTP por vuelta.', 'Ciclo de Krebs')
MC('metabolismo', I, COMP, '¿Por qué se dice que el ciclo de Krebs es anfibólico?', [
 ('Participa en la degradación y en la síntesis de moléculas', 'Correcta: sus intermediarios sirven para sintetizar ácidos grasos, aminoácidos y hemo.'),
 ('Funciona con y sin oxígeno por igual', 'El ciclo depende de la cadena para reoxidar NADH.'),
 ('Ocurre tanto en el citosol como en la matriz', 'Ocurre en la matriz.'),
 ('Produce ATP y consume ATP en la misma vuelta', 'Esa no es la definición de anfibólico.')],
 'Anfibólico = catabólico + anabólico.', 'Ciclo de Krebs')
MATCH('metabolismo', A, INT, 'Relaciona cada intermediario del ciclo de Krebs con lo que se sintetiza a partir de él.', [
 ['Citrato', 'Ácidos grasos (sale al citosol)'], ['α-cetoglutarato', 'Aminoácidos (glutamato)'], ['Succinil-CoA', 'Grupo hemo'], ['Oxalacetato', 'Aminoácidos (aspartato)']],
 'Ejemplos del carácter anfibólico del ciclo.', 'Ciclo de Krebs')
MC('metabolismo', I, COMP, '¿Qué produce cada vuelta de la β-oxidación de un ácido graso?', [
 ('Un acetil-CoA, un NADH y un FADH₂', 'Correcta: separa dos carbonos y carga electrones.'),
 ('Dos piruvatos y dos ATP', 'Eso se parece a la glucólisis.'),
 ('Un GTP y dos CO₂', 'Eso no es la β-oxidación.'),
 ('Un citrato y un oxalacetato', 'Esos son intermediarios del ciclo de Krebs.')],
 'Por eso las grasas son un combustible muy rico.', 'β-oxidación')
TF('metabolismo', B, CON, 'El corazón obtiene la mayor parte de su energía de la oxidación de ácidos grasos.', True,
 'Los ácidos grasos generan muchos más electrones que una glucosa.', concepto='β-oxidación')
# ---- cadena ----
MATCH('cadena', I, CON, 'Relaciona cada complejo con sus grupos prostéticos característicos.', [
 ['Complejo I', 'FMN y centros hierro-azufre'], ['Complejo II', 'FAD y centros hierro-azufre'], ['Complejo III', 'Citocromos b y c₁ y centro de Rieske'], ['Complejo IV', 'Citocromos a y a₃ y centros de cobre']],
 'Los grupos prostéticos aceptan y ceden electrones.', 'Complejos respiratorios')
MATCH('cadena', I, COMP, 'Relaciona cada complejo con los protones que bombea por cada par de electrones.', [
 ['Complejo I', '4 H⁺'], ['Complejo II', '0 H⁺'], ['Complejo III', '4 H⁺'], ['Complejo IV', '2 H⁺']],
 'NADH: 10 H⁺; FADH₂: 6 H⁺.', 'Bombeo de protones')
FILL('cadena', I, CON, 'Por cada par de electrones que entra desde el NADH se bombean aproximadamente ______ protones.', ['10', 'diez'],
 '4 + 4 + 2 = 10.', 'Bombeo de protones')
MC('cadena', I, CON, '¿Cuál es el único complejo de la cadena cuyas subunidades se codifican todas en el núcleo?', [
 ('El complejo II', 'Correcta: no tiene subunidades codificadas en el ADNmt.'),
 ('El complejo I', 'Tiene subunidades codificadas en el ADNmt.'),
 ('El complejo IV', 'Tiene subunidades codificadas en el ADNmt.'),
 ('La ATP sintasa', 'Tiene subunidades codificadas en el ADNmt.')],
 'El complejo II tampoco bombea protones.', 'Complejo II')
MC('cadena', I, COMP, '¿Qué son los supercomplejos o respirasomas?', [
 ('Agrupaciones de los complejos I, III y IV en la membrana', 'Correcta: acortan el recorrido de la ubiquinona y del citocromo c.'),
 ('Dímeros de ATP sintasa en las crestas', 'Esos dímeros curvan las crestas, pero no son respirasomas.'),
 ('Complejos de TOM y TIM en los sitios de contacto', 'Eso participa en la importación.'),
 ('Grupos de ribosomas mitocondriales', 'Los ribosomas no forman respirasomas.')],
 'La cardiolipina ayuda a mantenerlos agrupados.', 'Supercomplejos')
TF('cadena', B, CON, 'El citocromo c transporta los electrones de uno en uno del complejo III al complejo IV.', True,
 'Es una proteína pequeña y soluble del espacio intermembrana.', concepto='Citocromo c')
MC('cadena', B, CON, '¿En qué se convierte el oxígeno al final de la cadena respiratoria?', [
 ('En agua', 'Correcta: el complejo IV reduce el O₂ a H₂O.'),
 ('En CO₂', 'El CO₂ viene de los carbonos del combustible.'),
 ('En ATP', 'El O₂ no forma parte del ATP.'),
 ('En glucosa', 'Eso no ocurre en la mitocondria.')],
 'O₂ = aceptor final de electrones.', 'Complejo IV')
TF('cadena', I, COMP, 'En los citocromos, el hierro del grupo hemo alterna entre Fe³⁺ y Fe²⁺ al aceptar y ceder electrones.', True,
 'Así transportan electrones.', concepto='Citocromos')
# ---- gradiente y sintasa ----
MC('gradiente', I, COMP, '¿Qué componente aporta la mayor parte de la fuerza protón-motriz en la mitocondria?', [
 ('El potencial eléctrico (Δψ)', 'Correcta: la mayor parte corresponde al componente eléctrico.'),
 ('La diferencia de pH (ΔpH)', 'Contribuye, pero es la menor parte.'),
 ('La presión osmótica de la matriz', 'No es un componente de la fuerza protón-motriz.'),
 ('La concentración de ATP', 'El ATP es producto, no componente del gradiente.')],
 'Fuerza protón-motriz = ΔpH + Δψ.', 'Gradiente')
MC('gradiente', A, RAZ, '¿Por qué es indispensable que la membrana interna sea impermeable a los protones?', [
 ('Sin ella los protones regresarían y no habría gradiente', 'Correcta: el gradiente solo existe si los H⁺ regresan por vías específicas.'),
 ('Para que no entre el oxígeno a la matriz', 'El O₂ difunde; el punto es que no regresen los H⁺.'),
 ('Para que el ATP no pueda salir', 'El ATP sale por su translocador.'),
 ('Para impedir la entrada del piruvato', 'El piruvato entra con su transportador.')],
 'Impermeabilidad + cardiolipina = gradiente utilizable.', 'Gradiente')
MATCH('sintasa', I, CON, 'Relaciona cada subunidad de la ATP sintasa con su papel.', [
 ['α₃β₃', 'Cabeza F₁; los sitios catalíticos están en las β'], ['γ (tallo central)', 'Gira y deforma los sitios catalíticos'], ['Anillo c', 'Rotor de F₀ que gira con los H⁺'], ['Subunidad a', 'Forma los semicanales de entrada y salida de H⁺']],
 'El brazo periférico (estator) impide que F₁ gire.', 'ATP sintasa')
FILL('sintasa', I, CON, 'Cada vuelta completa del rotor de la ATP sintasa produce ______ ATP.', ['3', 'tres'],
 'Hay tres sitios catalíticos (uno por subunidad β).', 'ATP sintasa')
ORDER('sintasa', A, MEC, 'Ordena los estados de una subunidad β según el mecanismo de cambio de unión (Boyer).', [
 'Abierto: libera ATP y une ADP + Pᵢ', 'Laxo: retiene ADP + Pᵢ', 'Apretado: forma ATP'],
 'El giro de γ hace pasar cada β por los tres estados.', 'Mecanismo de Boyer')
TF('sintasa', A, RAZ, 'Si el gradiente se invierte, la ATP sintasa puede girar al revés, hidrolizar ATP y bombear protones.', True,
 'Es una enzima reversible.', concepto='ATP sintasa')
FILL('sintasa', B, CON, 'La teoría quimiosmótica fue propuesta por Peter ______.', ['Mitchell'],
 'La energía de la oxidación se conserva como gradiente de H⁺ y luego se usa para fabricar ATP.', 'Teoría quimiosmótica')
TF('sintasa', I, COMP, 'La ATP sintasa bombea protones al espacio intermembrana para fabricar ATP.', False,
 'La cadena bombea; la ATP sintasa deja regresar los protones y usa esa energía.',
 corr='La ATP sintasa es la vía de regreso de los H⁺ hacia la matriz.', concepto='ATP sintasa')
# ---- rendimiento ----
MC('rendimiento', I, MEC, '¿De dónde sale el valor de ≈2.5 ATP por NADH?', [
 ('≈10 H⁺ bombeados ÷ ≈4 H⁺ por ATP', 'Correcta: 10 ÷ 4 = 2.5.'),
 ('3 ATP por vuelta ÷ 2 electrones', 'No es el cálculo correcto.'),
 ('6 H⁺ bombeados ÷ 4 H⁺ por ATP', 'Ese cálculo corresponde al FADH₂ (1.5).'),
 ('10 NADH por glucosa ÷ 4 complejos', 'No es la base del cálculo.')],
 '≈4 H⁺ por ATP: ≈3 para la sintasa y ≈1 para el transporte.', 'Rendimiento')
MC('rendimiento', I, COMP, '¿Por qué los libros antiguos daban 36–38 ATP por glucosa?', [
 ('Usaban 3 ATP por NADH y 2 por FADH₂', 'Correcta: las cifras actuales son 2.5 y 1.5.'),
 ('No contaban la glucólisis', 'Sí la contaban.'),
 ('Pensaban que el ciclo de Krebs giraba tres veces', 'No era esa la diferencia.'),
 ('Incluían el ATP gastado en el transporte', 'Al contrario, no descontaban ese gasto.')],
 'Hoy: ≈30–32 ATP por glucosa.', 'Rendimiento')
MATCH('rendimiento', A, INT, 'Relaciona cada fuente con los ATP que aporta en la cuenta de una glucosa.', [
 ['8 NADH mitocondriales', '20 ATP'], ['2 FADH₂', '3 ATP'], ['2 NADH de la glucólisis', '3 o 5 ATP'], ['ATP/GTP directos', '4']],
 '20 + 3 + (3 o 5) + 4 = 30–32.', 'Rendimiento')
FILL('rendimiento', B, CON, 'Por cada glucosa se forman en total ______ NADH (glucólisis + PDH + Krebs).', ['10', 'diez'],
 '2 + 2 + 6 = 10 NADH, además de 2 FADH₂.', 'Rendimiento')
# ---- acoplamiento, control respiratorio ----
MC('desacople', I, MEC, '¿Qué es el control respiratorio?', [
 ('La dependencia de la respiración respecto a la disponibilidad de ADP', 'Correcta: más ADP → más ATP sintasa → baja el gradiente → se acelera la cadena.'),
 ('El control de la respiración pulmonar por el cerebro', 'Se refiere a la respiración celular, no pulmonar.'),
 ('La inhibición de la cadena por el Ca²⁺', 'El Ca²⁺ estimula enzimas del ciclo de Krebs.'),
 ('El bloqueo de la cadena por la oligomicina', 'Eso es un inhibidor, no el mecanismo fisiológico.')],
 'El ADP marca el ritmo.', 'Control respiratorio')
ORDER('desacople', I, MEC, 'Ordena qué ocurre cuando un músculo empieza a hacer ejercicio.', [
 'Se consume ATP y sube el ADP', 'La ATP sintasa trabaja más', 'Baja el gradiente de protones', 'La cadena respiratoria se acelera', 'Aumenta el consumo de oxígeno'],
 'Control respiratorio en acción.', 'Control respiratorio')
TF('desacople', I, COMP, 'El Ca²⁺ que entra a la matriz estimula deshidrogenasas del ciclo de Krebs y acopla la actividad celular con la producción de energía.', True,
 'Por ejemplo, durante la contracción muscular.', concepto='Ca²⁺ y metabolismo')
MC('desacople', I, RAZ, 'Con un desacoplante, ¿qué pasa con la energía del gradiente de protones?', [
 ('Se disipa como calor', 'Correcta: los H⁺ regresan sin pasar por la ATP sintasa.'),
 ('Se almacena como fosfocreatina', 'Sin ATP no se forma fosfocreatina.'),
 ('Se usa para fabricar más ATP', 'Al revés: no se forma ATP.'),
 ('Se conserva en el espacio intermembrana', 'El gradiente se pierde.')],
 'Desacoplar = cadena funcionando, sin ATP, con calor.', 'Desacoplamiento')
# ---- ROS ----
ORDER('ros', I, MEC, 'Ordena la formación de especies reactivas de oxígeno a partir de un electrón que escapa de la cadena.', [
 'Un electrón escapa en el complejo I o III', 'Reduce al O₂ de forma incompleta: superóxido (O₂•⁻)', 'Se forma peróxido de hidrógeno (H₂O₂)', 'Se forma radical hidroxilo (•OH)'],
 'La superóxido dismutasa convierte el superóxido en H₂O₂.', 'ROS')
MC('ros', I, COMP, '¿Cuándo se habla de estrés oxidativo?', [
 ('Cuando la producción de ROS supera las defensas', 'Correcta: SOD, catalasa y glutatión ya no alcanzan.'),
 ('Cuando la mitocondria deja de producir ROS', 'Eso no causa estrés oxidativo.'),
 ('Cuando hay mucho ATP en la célula', 'El ATP no define el estrés oxidativo.'),
 ('Cuando el O₂ se reduce completamente a agua', 'Esa es la reacción normal del complejo IV.')],
 'En concentraciones bajas, las ROS también funcionan como señales.', 'Estrés oxidativo')
MATCH('ros', I, CON, 'Relaciona cada defensa antioxidante con lo que hace.', [
 ['Superóxido dismutasa', 'Convierte el superóxido en H₂O₂'], ['Catalasa', 'Descompone el H₂O₂'], ['Glutatión', 'Sistema reductor que neutraliza peróxidos']],
 'Defensas de la mitocondria frente a las ROS.', 'Antioxidantes')
# ---- apoptosis ----
MATCH('apoptosis', I, CON, 'Relaciona cada proteína con su papel en la apoptosis mitocondrial.', [
 ['Bax y Bak', 'Forman poros en la membrana externa'], ['Bcl-2', 'Impide la permeabilización (antiapoptótica)'], ['Apaf-1', 'Se une al citocromo c y forma el apoptosoma'], ['Caspasa 9', 'Caspasa iniciadora activada por el apoptosoma']],
 'Las caspasas ejecutoras (como la 3) desmantelan la célula.', 'Apoptosis')
TF('apoptosis', B, CON, 'La apoptosis desmantela la célula de forma ordenada y sin inflamación.', True,
 'Las caspasas cortan proteínas celulares de manera controlada.', concepto='Apoptosis')
MC('apoptosis', I, COMP, '¿Qué situaciones activan la vía intrínseca (mitocondrial) de la apoptosis?', [
 ('Daño grave del ADN, falta de factores de supervivencia o estrés intenso', 'Correcta: son las señales que activan a Bax y Bak.'),
 ('Exceso de ATP y de oxígeno', 'No son señales de apoptosis.'),
 ('La división normal de la célula', 'La mitosis no activa la apoptosis.'),
 ('La entrada de piruvato a la matriz', 'Es metabolismo normal.')],
 'Vía intrínseca = decisión desde la mitocondria.', 'Apoptosis')
# ---- dinámica mitocondrial ----
MATCH('estructura', A, CON, 'Relaciona cada proteína con su papel en la dinámica mitocondrial.', [
 ['Mitofusinas', 'Fusión de las membranas externas'], ['OPA1', 'Fusión de las membranas internas'], ['Drp1', 'Fisión: forma un anillo que estrangula'], ['PINK1 y Parkin', 'Marcan mitocondrias dañadas para mitofagia']],
 'Fusión, fisión y mitofagia mantienen sana la red mitocondrial.', 'Dinámica mitocondrial')
MC('estructura', I, COMP, '¿Qué es la mitofagia?', [
 ('Autofagia selectiva de mitocondrias dañadas', 'Correcta: se marcan con PINK1/Parkin y las engloba un autofagosoma.'),
 ('La fusión de dos mitocondrias sanas', 'Eso es la fusión mitocondrial.'),
 ('La división de una mitocondria en dos', 'Eso es la fisión.'),
 ('La salida del citocromo c al citosol', 'Eso es parte de la apoptosis.')],
 'Una mitocondria que pierde su potencial de membrana acumula PINK1.', 'Mitofagia')
MC('estructura', I, COMP, '¿Para qué sirve que las mitocondrias se fusionen?', [
 ('Para mezclar contenidos y "diluir" el ADNmt dañado', 'Correcta: la fusión comparte componentes entre mitocondrias.'),
 ('Para fabricar ADN nuclear', 'Las mitocondrias no fabrican ADN nuclear.'),
 ('Para eliminar la membrana externa', 'La fusión no elimina membranas.'),
 ('Para detener la cadena respiratoria', 'La fusión no detiene la cadena.')],
 'La fisión, en cambio, reparte mitocondrias y separa porciones dañadas.', 'Dinámica mitocondrial')
TF('estructura', I, COMP, 'Si una célula aumenta su demanda energética de forma sostenida (entrenamiento), aumenta su número de mitocondrias y de crestas.', True,
 'La demanda sostenida induce más mitocondrias y más superficie de membrana interna.', concepto='Adaptación mitocondrial')
TF('estructura', I, COMP, 'La mitocondria recibe Ca²⁺ y lípidos del retículo endoplásmico a través de zonas de contacto entre ambos organelos.', True,
 'La fisión mitocondrial también suele ocurrir donde el RE rodea a la mitocondria.', concepto='Contactos RE-mitocondria')
# ---- importancia médica (mecanismo) ----
MATCH('clinica', I, MEC, 'Relaciona cada inhibidor con su sitio de acción.', [
 ['Rotenona', 'Complejo I'], ['Cianuro', 'Complejo IV'], ['Oligomicina', 'ATP sintasa (F₀)'], ['2,4-dinitrofenol', 'Membrana interna (desacoplante)']],
 'Cada uno detiene la producción de ATP por un mecanismo distinto.', 'Inhibidores')
MC('clinica', I, RAZ, '¿Qué diferencia hay entre bloquear la cadena con cianuro y añadir un desacoplante?', [
 ('Con cianuro cae el consumo de O₂; con desacoplante sube', 'Correcta: el cianuro detiene la cadena; el desacoplante la acelera sin formar ATP.'),
 ('Ambos aumentan el consumo de O₂', 'El cianuro lo detiene.'),
 ('Ambos aumentan la producción de ATP', 'Ninguno forma ATP mitocondrial.'),
 ('El cianuro produce calor y el desacoplante no', 'Es al revés: el desacoplante produce calor.')],
 'Inhibidor de la cadena ≠ desacoplante.', 'Inhibidores y desacoplantes')
MC('clinica', I, COMP, 'Con la cadena bloqueada, ¿cuántos ATP por glucosa le quedan a la célula?', [
 ('2 ATP, de la glucólisis anaerobia', 'Correcta: el piruvato pasa a lactato para regenerar NAD⁺.'),
 ('30–32 ATP', 'Ese es el rendimiento con la cadena funcionando.'),
 ('0 ATP', 'La glucólisis sigue dando 2 ATP.'),
 ('15 ATP', 'No corresponde a ninguna vía.')],
 'La respiración rinde ≈15 veces más que la glucólisis sola.', 'Glucólisis anaerobia')
