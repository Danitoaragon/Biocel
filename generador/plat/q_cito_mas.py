"""Más preguntas generales de citoesqueleto (cobertura de todo el capítulo). Se agregan al final para no cambiar ids."""
from qhelp import *
tema('cito')

# ---- generalidades ----
MATCH('general', B, CON, 'Relaciona cada gran tarea del citoesqueleto con un ejemplo.', [
 ['Forma y resistencia mecánica', 'Soportar estiramiento sin romperse'], ['Organizar el interior', 'Colocar el núcleo y el Golgi en su sitio'], ['Vía de transporte', 'Motores que llevan vesículas'], ['Generar movimiento', 'Contracción muscular y batido de cilios']],
 'Las cuatro grandes funciones del citoesqueleto.', 'Funciones del citoesqueleto')
MC('general', I, COMP, '¿Por qué es ventajoso que los filamentos del citoesqueleto se formen con uniones no covalentes entre subunidades?', [
 ('Se pueden armar y desarmar rápido sin sintetizar proteína nueva', 'Correcta: la célula reutiliza una reserva de subunidades libres.'),
 ('Así son imposibles de romper', 'Las uniones no covalentes son reversibles, no irrompibles.'),
 ('Así no necesitan nucleótidos', 'Actina y tubulina sí usan nucleótidos.'),
 ('Así solo se forman una vez en la vida celular', 'Al contrario: se forman y desarman constantemente.')],
 'Polímeros de subunidades unidas de forma no covalente = dinamismo.', 'Polímeros')
TF('general', B, CON, 'El citoesqueleto es una estructura fija, como el esqueleto óseo.', False,
 'Es dinámico: muchos filamentos se ensamblan y desensamblan en segundos o minutos.',
 corr='El citoesqueleto es dinámico y se reorganiza según las necesidades de la célula.', concepto='Dinamismo')
MC('general', I, RAZ, 'Usando la tabla comparativa, ¿por qué los filamentos intermedios no tienen motor equivalente?', [
 ('Porque no son funcionalmente polares', 'Correcta: un motor necesita un filamento polar para avanzar en un sentido.'),
 ('Porque son demasiado delgados', 'Son más gruesos que la actina, que sí tiene motor.'),
 ('Porque son exclusivos del núcleo', 'Solo las láminas están en el núcleo.'),
 ('Porque se forman con GTP', 'No dependen de ATP ni GTP.')],
 'Polaridad → motores; sin polaridad → sin motores.', 'Tabla comparativa')
MATCH('general', I, COMP, 'Relaciona cada filamento con su dinámica según la tabla del profesor.', [
 ['Actina', 'Alta'], ['Microtúbulos', 'Muy alta'], ['Filamentos intermedios', 'Más estable']],
 'La dinámica depende del nucleótido.', 'Tabla comparativa')
# ---- actina: estructura ----
MC('actina', I, CON, '¿Qué isoforma de actina es típica del músculo?', [
 ('α-actina', 'Correcta: β- y γ-actinas son de células no musculares.'),
 ('β-actina', 'Es de células no musculares.'),
 ('γ-actina', 'Es de células no musculares.'),
 ('δ-actina', 'No es una isoforma descrita en el texto.')],
 'La actina es de las proteínas más conservadas de la evolución.', 'Isoformas de actina')
FILL('actina', I, CON, 'La actina G es una proteína de aproximadamente ______ kDa que une ATP junto con Mg²⁺.', ['42'],
 'Tiene 375 aminoácidos y cuatro subdominios alrededor de la hendidura del ATP.', 'Actina G')
MC('actina', I, COMP, '¿Qué es la concentración crítica de un extremo del filamento de actina?', [
 ('La concentración de monómero a la que ese extremo ni crece ni se acorta', 'Correcta: por encima crece, por debajo se acorta.'),
 ('La concentración de ATP necesaria para que la actina se una', 'Se define con el monómero libre, no con el ATP.'),
 ('El número de filamentos que caben en una microvellosidad', 'No tiene relación.'),
 ('La concentración de Ca²⁺ que activa a la troponina', 'Eso pertenece a la contracción.')],
 'El extremo + tiene menor concentración crítica que el −: base del treadmilling.', 'Concentración crítica')
ORDER('actina', I, MEC, 'Ordena las fases de la polimerización de la actina.', [
 'Nucleación (lenta)', 'Elongación (rápida)', 'Estado estacionario'],
 'La nucleación es lenta porque los núcleos de 2–3 monómeros son inestables.', 'Polimerización')
MC('actina', A, RAZ, 'Si la actina no pudiera hidrolizar su ATP, ¿qué se esperaría?', [
 ('Filamentos más estables y difíciles de desarmar', 'Correcta: la actina-ADP es la que se une débilmente y facilita la despolimerización.'),
 ('Que la actina no pudiera polimerizar en absoluto', 'La unión es espontánea; la hidrólisis viene después.'),
 ('Que el filamento perdiera la polaridad', 'La polaridad depende de la orientación de los monómeros.'),
 ('Que se convirtiera en microtúbulo', 'Son proteínas distintas.')],
 'La hidrólisis marca la edad del filamento y favorece su recambio.', 'Actina y ATP')
MATCH('actina', I, COMP, 'Relaciona cada proteína de unión a actina con su efecto.', [
 ['Timosina β4', 'Secuestra actina G como reserva'], ['Proteína de casquete (CapZ)', 'Tapa el extremo + y detiene el crecimiento'], ['Fimbrina y villina', 'Agrupan filamentos en haces paralelos'], ['Filamina', 'Entrecruza filamentos en redes']],
 'Además de nuclear y cortar, hay proteínas que secuestran, tapan y organizan.', 'Proteínas asociadas a actina')
MC('actina', I, COMP, '¿Qué hace la profilina además de entregar actina al filamento?', [
 ('Promueve el intercambio de ADP por ATP en la actina G', 'Correcta: así entrega actina-ATP lista para incorporarse.'),
 ('Corta los filamentos con ADP', 'Eso lo hace la cofilina.'),
 ('Ramifica los filamentos a 70°', 'Eso lo hace Arp2/3.'),
 ('Tapa el extremo menos', 'No es función de la profilina.')],
 'Profilina: favorece la incorporación de actina-G.', 'Profilina')
TF('actina', I, COMP, 'La cofilina se une preferentemente a las zonas de actina-ADP, las tuerce y corta el filamento.', True,
 'Así acelera el recambio y desensamblaje de los filamentos viejos.', concepto='Cofilina')
MC('actina', B, CON, '¿Qué es el velo terminal de una microvellosidad?', [
 ('Una red de actina y espectrina en la base del haz', 'Correcta: ahí se inserta el haz de actina de cada microvellosidad.'),
 ('Un casquete de GTP en la punta', 'El casquete de GTP es de los microtúbulos.'),
 ('El cuerpo basal de un cilio', 'Los cilios nacen de cuerpos basales; las microvellosidades no.'),
 ('Una capa de queratina sobre la membrana', 'No es queratina.')],
 'Microvellosidad: 20–30 filamentos paralelos con el + hacia la punta.', 'Microvellosidades')
FILL('actina', B, CON, 'El haz de una microvellosidad tiene entre 20 y ______ filamentos de actina paralelos.', ['30'],
 'Unidos por fimbrina y villina, con el extremo + hacia la punta.', 'Microvellosidades')
# ---- miosina y sarcómero ----
MATCH('miosina', I, CON, 'Relaciona cada miosina con su función.', [
 ['Miosina I', 'Une la actina a la membrana'], ['Miosina II', 'Filamentos bipolares que contraen'], ['Miosina V', 'Transporta vesículas sobre actina']],
 'La mayoría de las miosinas avanzan hacia el extremo + de la actina.', 'Tipos de miosina')
MC('miosina', I, CON, '¿Cómo está formada la miosina II?', [
 ('Dos cadenas pesadas y cuatro cadenas ligeras', 'Correcta: es un hexámero con dos cabezas motoras.'),
 ('Una sola cadena con una cabeza', 'Eso se parece más a la miosina I.'),
 ('Trece protofilamentos en tubo', 'Esa es la estructura del microtúbulo.'),
 ('Ocho tetrámeros en forma de cuerda', 'Esa es la estructura de un filamento intermedio.')],
 'En músculo liso y células no musculares se activa al fosforilar la cadena ligera reguladora.', 'Miosina II')
MATCH('miosina', I, CON, 'Relaciona cada región del sarcómero con lo que contiene o hace.', [
 ['Banda A', 'Longitud de los filamentos gruesos; no cambia'], ['Banda I', 'Solo filamentos finos; se acorta'], ['Zona H', 'Solo filamentos gruesos; se acorta'], ['Línea M', 'Une los filamentos gruesos en el centro']],
 'Al contraerse, banda I y zona H se acortan; la banda A no.', 'Sarcómero')
MATCH('miosina', A, CON, 'Relaciona cada proteína gigante del sarcómero con su función.', [
 ['Titina', 'Resorte del disco Z a la línea M'], ['Nebulina', 'Acompaña y mide los filamentos finos']],
 'Completan la estructura del sarcómero.', 'Sarcómero')
TF('miosina', I, COMP, 'Durante la contracción, la banda A del sarcómero se acorta.', False,
 'La banda A corresponde a los filamentos gruesos, que no cambian de longitud.',
 corr='Se acortan la banda I y la zona H; la banda A se mantiene.', concepto='Sarcómero')
MC('miosina', I, COMP, '¿Por qué la relajación muscular también gasta ATP?', [
 ('Las bombas del RS usan ATP para regresar el Ca²⁺', 'Correcta: sin recaptura de Ca²⁺, la tropomiosina no vuelve a cubrir los sitios.'),
 ('La tropomiosina necesita ATP para moverse', 'La tropomiosina se mueve por el cambio de la troponina.'),
 ('La actina se despolimeriza en cada relajación', 'El filamento fino no se despolimeriza.'),
 ('La troponina hidroliza ATP para soltar el Ca²⁺', 'La troponina no hidroliza ATP.')],
 'Además, la miosina necesita ATP para soltarse de la actina.', 'Relajación')
MC('miosina', I, CON, '¿Qué conecta la membrana plasmática de la fibra muscular con su interior para transmitir la señal eléctrica al RS?', [
 ('Los túbulos T', 'Correcta: son invaginaciones de la membrana pegadas al RS.'),
 ('Los desmosomas', 'Unen células epiteliales vecinas.'),
 ('Los microtúbulos astrales', 'Pertenecen al huso mitótico.'),
 ('Las microvellosidades', 'Son proyecciones apicales de epitelios.')],
 'El cambio de voltaje viaja por los túbulos T y abre los canales del RS.', 'Túbulos T')
# ---- movimiento celular ----
MATCH('actina', I, COMP, 'Relaciona cada estructura de una célula que migra con su organización de actina.', [
 ['Lamelipodio', 'Red ramificada (Arp2/3)'], ['Filopodio', 'Haz paralelo (forminas)'], ['Fibras de estrés', 'Actina con miosina II, contráctiles'], ['Adhesiones focales', 'Integrinas conectadas a la actina']],
 'Protruir, adherirse y contraer.', 'Movimiento celular')
# ---- filamentos intermedios ----
MATCH('fi', I, CON, 'Relaciona cada tipo de filamento intermedio (por secuencia) con sus proteínas.', [
 ['Tipos I y II', 'Queratinas ácidas y básicas'], ['Tipo III', 'Vimentina, desmina, GFAP'], ['Tipo IV', 'Neurofilamentos'], ['Tipo V', 'Láminas nucleares']],
 'El tipo VI es la nestina de las células madre neurales.', 'Clasificación de FI')
MC('fi', I, COMP, '¿Cómo se ensamblan las queratinas?', [
 ('Siempre en pares de una queratina ácida con una básica', 'Correcta: tipo I (ácida) + tipo II (básica).'),
 ('Solas, como homodímeros de una sola queratina', 'Las queratinas siempre forman heterodímeros ácida-básica.'),
 ('Sobre un molde de γ-tubulina', 'La γ-tubulina nuclea microtúbulos.'),
 ('Unidas a ATP como la actina', 'No dependen de nucleótidos.')],
 'Los epitelios cambian el par que expresan según la capa.', 'Queratinas')
MC('fi', I, COMP, '¿Qué propiedad mecánica distingue a los filamentos intermedios de actina y microtúbulos?', [
 ('Pueden estirarse a más del doble de su longitud sin romperse', 'Correcta: su organización en cuerda los hace muy extensibles.'),
 ('Son los más rígidos de los tres', 'Los más rígidos son los microtúbulos.'),
 ('Se desarman en segundos', 'Son los más estables.'),
 ('Generan fuerza con un motor propio', 'No tienen motor.')],
 'Resistencia mecánica = función principal.', 'Filamentos intermedios')
FILL('fi', I, CON, 'En un filamento intermedio, ______ tetrámeros en corte transversal forman la cuerda.', ['8', 'ocho'],
 'Monómero → dímero enrollado → tetrámero antiparalelo → 8 tetrámeros.', 'Ensamblaje de FI')
MC('fi', I, COMP, '¿Cómo se regula el ensamblaje y desensamblaje de los filamentos intermedios?', [
 ('Principalmente por fosforilación', 'Correcta: por ejemplo, la fosforilación de las láminas desarma la envoltura nuclear.'),
 ('Por hidrólisis de GTP', 'Eso regula a los microtúbulos.'),
 ('Por hidrólisis de ATP', 'Eso participa en la dinámica de la actina.'),
 ('Por unión de Ca²⁺ a la troponina', 'Eso regula la contracción muscular.')],
 'Las cinasas dependientes de ciclina fosforilan las láminas al inicio de la mitosis.', 'Regulación de FI')
MC('fi', B, CON, '¿Qué función tiene la desmina en el músculo?', [
 ('Conecta los discos Z de sarcómeros vecinos', 'Correcta: da integridad mecánica a la fibra.'),
 ('Bloquea los sitios de unión de la miosina', 'Eso lo hace la tropomiosina.'),
 ('Libera Ca²⁺ al citosol', 'Eso lo hace el RS.'),
 ('Forma los filamentos gruesos', 'Los forma la miosina II.')],
 'Desmina = filamento intermedio del músculo.', 'Desmina')
MC('fi', I, COMP, '¿Qué determinan los neurofilamentos en una neurona?', [
 ('El diámetro del axón y la velocidad de conducción', 'Correcta: más neurofilamentos, axón más grueso.'),
 ('La dirección del transporte axonal', 'La dirección la dan la polaridad de los microtúbulos y los motores.'),
 ('La liberación de neurotransmisores', 'No es su función.'),
 ('El número de dendritas', 'No lo determinan.')],
 'Neurofilamentos = tipo IV.', 'Neurofilamentos')
MATCH('fi', I, COMP, 'Relaciona cada unión con el filamento al que se ancla.', [
 ['Desmosoma', 'Filamentos intermedios de célula a célula'], ['Hemidesmosoma', 'Filamentos intermedios a la lámina basal'], ['Unión adherente', 'Cinturón de actina'], ['Adhesión focal', 'Actina a la matriz extracelular']],
 'Los FI reparten la tensión por toda la lámina de células.', 'Uniones')
# ---- microtúbulos ----
MC('mt', I, CON, '¿Cuál es el diámetro de la luz (hueco) de un microtúbulo?', [
 ('≈15 nm', 'Correcta: 25 nm externos con una luz de ≈15 nm.'),
 ('≈25 nm', 'Es el diámetro externo.'),
 ('≈7 nm', 'Es el diámetro de la actina.'),
 ('≈2 nm', 'Es aproximadamente el diámetro del ADN.')],
 'El dímero α/β mide ≈8 nm de largo.', 'Microtúbulos')
TF('mt', I, COMP, 'La acetilación de la α-tubulina marca a los microtúbulos estables y de larga vida, como los del axón y los cilios.', True,
 'Las modificaciones de la tubulina también cambian cómo la reconocen los motores.', concepto='Modificaciones de tubulina')
MC('mt', I, COMP, '¿Por qué la tubulina-GDP favorece la despolimerización?', [
 ('Tiende a curvarse y se une peor a sus vecinas', 'Correcta: los protofilamentos con GDP se curvan hacia afuera y se separan.'),
 ('Se une con más fuerza que la tubulina-GTP', 'Es al revés.'),
 ('Atrae a la dineína, que corta el microtúbulo', 'La dineína no corta microtúbulos.'),
 ('Pierde la β-tubulina', 'El dímero se conserva.')],
 'Tubulina-GTP recta (estable) vs tubulina-GDP curva (inestable).', 'Inestabilidad dinámica')
MATCH('mt', I, COMP, 'Relaciona cada proteína asociada a microtúbulos (MAP) con su efecto.', [
 ['Tau', 'Estabiliza microtúbulos del axón'], ['MAP2', 'Estabiliza microtúbulos de las dendritas'], ['Cinesina-13', 'Desestabiliza curvando los protofilamentos'], ['Proteínas del extremo +', 'Conectan el extremo + con la corteza o los cromosomas']],
 'Las MAP modifican la estabilidad y las interacciones de los microtúbulos.', 'MAP')
MC('mt', I, COMP, '¿Para qué le sirve al huso mitótico la inestabilidad dinámica?', [
 ('Para que los microtúbulos exploren y capturen los cinetocoros', 'Correcta: solo se estabilizan los que encuentran un cinetocoro.'),
 ('Para formar el anillo contráctil', 'El anillo es de actina y miosina II.'),
 ('Para fabricar nuevos centriolos', 'Los centriolos se duplican en otro proceso.'),
 ('Para fosforilar las láminas', 'Eso lo hacen cinasas.')],
 'Crecer en todas direcciones y estabilizar solo lo útil.', 'Inestabilidad dinámica')
# ---- centrosoma y cilios ----
MC('cilios', I, COMP, '¿Por qué las células vegetales pueden formar un huso sin centriolos?', [
 ('Porque quien nuclea es la γ-tubulina, no el centriolo', 'Correcta: los anillos de γ-tubulina son los nucleadores.'),
 ('Porque usan actina para separar cromosomas', 'Los cromosomas los separan microtúbulos.'),
 ('Porque no tienen microtúbulos', 'Sí los tienen.'),
 ('Porque sus cromosomas no tienen cinetocoros', 'Sí tienen cinetocoros.')],
 'Los centriolos organizan el material pericentriolar, pero no son indispensables para nuclear.', 'Centrosoma')
TF('cilios', I, COMP, 'El centriolo madre puede convertirse en cuerpo basal para formar un cilio primario.', True,
 'Sus apéndices anclan microtúbulos y le permiten actuar como cuerpo basal.', concepto='Centriolos')
MC('cilios', I, COMP, '¿Qué es el cilio primario?', [
 ('Un cilio 9 + 0 sin dineína que funciona como antena sensorial', 'Correcta: no se mueve; detecta señales como el flujo en el túbulo renal.'),
 ('El primer cilio móvil que se forma en el epitelio respiratorio', 'Los cilios respiratorios son 9 + 2 y móviles.'),
 ('El flagelo del espermatozoide', 'El flagelo es 9 + 2 y móvil.'),
 ('Un cilio con dos pares centrales', 'No existe esa organización.')],
 'Casi todas las células tienen un cilio primario.', 'Cilio primario')
MATCH('cilios', A, CON, 'Relaciona cada componente del axonema con su descripción.', [
 ['Túbulo A', 'Microtúbulo completo de 13 protofilamentos'], ['Túbulo B', 'Incompleto, comparte pared con el A'], ['Nexina', 'Puentes entre dobletes vecinos'], ['Radios', 'Salen del par central y regulan los brazos de dineína']],
 'Los brazos de dineína salen del túbulo A.', 'Axonema')
MATCH('cilios', B, CON, 'Relaciona cada estructura con un ejemplo en el cuerpo humano.', [
 ['Cilios móviles', 'Epitelio respiratorio y trompa uterina'], ['Flagelo', 'Espermatozoide'], ['Cilio primario', 'Antena sensorial del túbulo renal']],
 'Cilios: cortos y numerosos; flagelos: largos, uno por célula.', 'Cilios y flagelos')
# ---- motores ----
MC('motores', I, CON, '¿Cuánto avanza la cinesina-1 en cada paso y cuánto ATP gasta?', [
 ('8 nm por paso, un ATP por paso', 'Correcta: 8 nm es la longitud de un dímero de tubulina.'),
 ('25 nm por paso, diez ATP por paso', 'No corresponde.'),
 ('1 nm por paso, sin gastar ATP', 'Los motores siempre gastan ATP.'),
 ('37 nm por paso, un GTP por paso', 'No corresponde a la cinesina.')],
 'Camina "mano sobre mano" sobre un protofilamento.', 'Cinesina')
MC('motores', I, COMP, '¿Qué necesita la dineína citoplasmática para unirse a muchas de sus cargas?', [
 ('El complejo adaptador dinactina', 'Correcta: dinactina conecta la dineína con su carga.'),
 ('El casquete de GTP', 'Regula la estabilidad del microtúbulo.'),
 ('La troponina', 'Es del músculo.'),
 ('La timosina β4', 'Secuestra actina.')],
 'La dineína es enorme (≈1.5 MDa) y su cadena pesada forma un anillo de seis dominios.', 'Dineína')
MATCH('motores', I, COMP, 'Relaciona cada motor con el organelo que ayuda a posicionar.', [
 ['Cinesinas', 'Extienden el retículo endoplásmico hacia la periferia'], ['Dineína', 'Mantiene el Golgi cerca del centrosoma']],
 'Los motores no solo transportan: también colocan organelos.', 'Posición de organelos')
MC('motores', I, INT, 'En la periferia celular, una carga pasa de un microtúbulo a un filamento de actina. ¿Qué motor la lleva sobre la actina?', [
 ('Miosina V', 'Correcta: transporta vesículas sobre la actina, sobre todo en la periferia.'),
 ('Dineína ciliar', 'Está en el axonema.'),
 ('Cinesina-13', 'Desestabiliza microtúbulos.'),
 ('Miosina II', 'Forma filamentos contráctiles; no transporta vesículas.')],
 'Como un viaje en carretera (microtúbulos) que termina en calles locales (actina).', 'Transporte')
# ---- división ----
ORDER('division', I, MEC, 'Ordena lo que hacen los microtúbulos y la actina durante la división de una célula animal.', [
 'Se desarma la red de microtúbulos de interfase', 'Los centrosomas se separan y forman el huso', 'Los microtúbulos capturan los cinetocoros', 'En anafase se acortan y separan las cromátidas', 'El anillo de actina y miosina II divide el citoplasma'],
 'Microtúbulos separan cromosomas; actina divide la célula.', 'División celular')
MC('division', B, CON, '¿Qué es el cinetocoro?', [
 ('Una estructura proteica sobre el centrómero que une microtúbulos', 'Correcta: a él se une el extremo + de los microtúbulos cinetocóricos.'),
 ('El centro organizador de microtúbulos', 'Ese es el centrosoma.'),
 ('El anillo que divide el citoplasma', 'Ese es el anillo contráctil.'),
 ('Un tipo de filamento intermedio', 'No es un filamento.')],
 'Cada cromátida tiene su cinetocoro.', 'Cinetocoro')
TF('division', I, COMP, 'Los microtúbulos astrales se dirigen hacia la corteza celular y ayudan a posicionar el huso.', True,
 'Los polares se solapan en el ecuador y los cinetocóricos se unen a los cromosomas.', concepto='Huso mitótico')
MC('division', I, COMP, '¿Por qué es necesario duplicar el centrosoma antes de la mitosis?', [
 ('Para formar los dos polos del huso', 'Correcta: cada centrosoma organiza un polo.'),
 ('Para duplicar el ADN', 'El ADN se replica en la fase S, sin el centrosoma.'),
 ('Para formar el anillo contráctil', 'El anillo es de actina.'),
 ('Para fragmentar la envoltura nuclear', 'Eso ocurre por fosforilación de las láminas.')],
 'Los centriolos se duplican una vez por ciclo.', 'Centrosoma')
# ---- integración y regulación ----
MATCH('integracion', I, CON, 'Relaciona cada proteína con su papel como interruptor de las GTPasas Rho.', [
 ['GEF', 'Activa: cambia GDP por GTP'], ['GAP', 'Apaga: estimula la hidrólisis de GTP'], ['GTPasa con GTP', 'Activa'], ['GTPasa con GDP', 'Inactiva']],
 'Rho, Rac y Cdc42 son interruptores moleculares.', 'GTPasas Rho')
MC('integracion', I, COMP, '¿Qué hacen las plaquinas como la plectina?', [
 ('Unen filamentos intermedios con microtúbulos y actina', 'Correcta: integran los tres sistemas en una sola red.'),
 ('Cortan los filamentos de actina', 'Eso lo hace la cofilina.'),
 ('Nuclean microtúbulos', 'Eso lo hace la γ-tubulina.'),
 ('Liberan Ca²⁺ del RS', 'No tienen relación con el Ca²⁺.')],
 'Los tres sistemas funcionan como una sola red.', 'Integración')
MC('integracion', A, INT, '¿Qué es la mecanotransducción?', [
 ('La conversión de fuerzas mecánicas en cambios de expresión génica', 'Correcta: la cadena matriz–integrinas–citoesqueleto–núcleo permite "sentir" la rigidez.'),
 ('El transporte de vesículas por cinesina', 'Eso es transporte intracelular.'),
 ('La traducción de ARNm en el citoesqueleto', 'No es la definición.'),
 ('La contracción del músculo por Ca²⁺', 'Eso es excitación-contracción.')],
 'Ej.: células madre mesenquimatosas se diferencian según la rigidez de su sustrato.', 'Mecanotransducción')
MC('integracion', I, COMP, '¿Qué conecta el complejo de la distrofina en el músculo?', [
 ('La actina bajo la membrana con la matriz extracelular', 'Correcta: transmite la fuerza al tejido sin romper la membrana.'),
 ('Los microtúbulos con el núcleo', 'No es la función de la distrofina.'),
 ('La miosina con la troponina', 'No es su función.'),
 ('Los desmosomas con las queratinas', 'Eso no lo hace la distrofina.')],
 'Integración citoesqueleto–membrana–matriz.', 'Distrofina')
# ---- fármacos y toxinas como herramientas ----
MATCH('clinica', I, CON, 'Relaciona cada toxina de actina con su efecto.', [
 ['Citocalasina', 'Se une al extremo + e impide polimerizar'], ['Faloidina', 'Estabiliza la actina F; se usa para teñirla']],
 'Son herramientas de laboratorio.', 'Toxinas de actina')
TF('clinica', I, COMP, 'La colchicina y el paclitaxel actúan igual: los dos impiden que la tubulina se polimerice.', False,
 'La colchicina impide la polimerización; el paclitaxel (taxano) estabiliza los microtúbulos.',
 corr='Efectos opuestos, mismo resultado: ambos bloquean el huso.', concepto='Fármacos sobre microtúbulos')
