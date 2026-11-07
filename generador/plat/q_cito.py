from qhelp import *
tema('cito')

# ---------------- GENERAL ----------------
MC('general', B, COMP, '¿Qué propiedad comparten los filamentos de actina y los microtúbulos, pero no los filamentos intermedios?', [
 ('Son polares y sus subunidades unen un nucleótido', 'Correcta: la actina une ATP y la tubulina GTP, y ambos polímeros tienen extremos + y − distintos. Los intermedios no tienen ninguna de las dos propiedades.'),
 ('Están formados por proteínas fibrosas alargadas', 'Al revés: las proteínas fibrosas son las subunidades de los filamentos intermedios; actina y tubulina son globulares.'),
 ('Su función principal es la resistencia a la tensión', 'Esa es la función típica de los filamentos intermedios, no de actina y microtúbulos.'),
 ('Se anclan a los desmosomas de células vecinas', 'A los desmosomas se anclan los filamentos intermedios (queratinas).')],
 'Polaridad y unión de nucleótido son las dos propiedades que hacen a actina y microtúbulos dinámicos y aptos para que los motores se muevan en una dirección.', 'Polaridad y nucleótido')
TF('general', B, CON, 'Los extremos más (+) y menos (−) de un filamento de actina se llaman así por su carga eléctrica.', False,
 'Los nombres se refieren a la velocidad de crecimiento: el extremo + crece rápido y el − lento. No tienen relación con la carga.',
 'Los extremos + y − se llaman así porque el + crece más rápido que el −.')
MATCH('general', B, CON, 'Relaciona cada filamento con su diámetro aproximado.', [
 ['Filamento de actina', '≈7 nm'], ['Filamento intermedio', '≈10 nm'], ['Microtúbulo', '25 nm']],
 'De menor a mayor: actina (≈7 nm), intermedios (≈10 nm, de ahí su nombre) y microtúbulos (25 nm, tubos huecos).')
MATCH('general', I, COMP, 'Relaciona cada filamento con su proteína motora.', [
 ['Filamentos de actina', 'Miosinas'], ['Microtúbulos', 'Cinesinas y dineínas'], ['Filamentos intermedios', 'Ninguna (no tienen polaridad)']],
 'Los motores necesitan un riel polar. Actina → miosinas; microtúbulos → cinesinas y dineínas; los intermedios carecen de polaridad y de motores.')
MC('general', I, RAZ, 'Una célula epitelial pierde por completo sus filamentos intermedios, pero conserva actina y microtúbulos. ¿Qué problema es el más esperable?', [
 ('Se rompe con facilidad al ser estirada', 'Correcta: los intermedios reparten la tensión mecánica; sin ellos la célula es frágil.'),
 ('No puede transportar vesículas al Golgi', 'El transporte vesicular depende de microtúbulos y motores, que siguen presentes.'),
 ('No puede dividir su citoplasma en dos', 'La citocinesis la hace el anillo de actina y miosina II, que sigue presente.'),
 ('Pierde la capacidad de formar el huso', 'El huso es de microtúbulos, que siguen presentes.')],
 'Cada sistema tiene una función dominante. Los filamentos intermedios dan resistencia mecánica; por eso su pérdida produce fragilidad, no problemas de transporte ni de división.')

# ---------------- ACTINA ----------------
MC('actina', B, CON, '¿Qué diferencia a la actina G de la actina F?', [
 ('G es el monómero globular; F es el polímero', 'Correcta: G = globular (subunidad libre con ATP); F = filamentosa (polímero de dos hebras).'),
 ('G es el polímero; F es el monómero libre', 'Está invertido: la G es la forma libre y la F el filamento.'),
 ('G une GTP y F une ATP en su hendidura', 'La actina une ATP en ambas formas; el GTP lo une la tubulina.'),
 ('G está en el músculo y F en las demás células', 'Ambas formas existen en todas las células; no dependen del tejido.')],
 'La actina G (globular) une ATP y se incorpora al filamento; la actina F (filamentosa) es el polímero de dos hebras enrolladas.', 'Actina G vs F')
TF('actina', B, CON, 'La actina G se incorpora al filamento unida a ATP.', True,
 'Correcto: la actina libre tiene ATP en su hendidura. Después de incorporarse, el ATP se hidroliza a ADP.')
TF('actina', I, MEC, 'La hidrólisis del ATP de la actina es la que proporciona la energía para que el monómero se una al filamento.', False,
 'La unión es espontánea. La hidrólisis ocurre después de la incorporación y debilita las uniones, lo que marca la "edad" del filamento y facilita su despolimerización.',
 'La hidrólisis del ATP ocurre después de que el monómero se une y hace que esa zona del filamento sea más fácil de desarmar.')
FILL('actina', B, CON, 'El extremo más (+) del filamento de actina también se llama extremo ______.', ['barbado'],
 'Por cómo se ve cuando se decora con cabezas de miosina: el extremo + es el barbado y el − el puntiagudo.')
FILL('actina', I, MEC, 'El fenómeno en el que el extremo + de la actina crece mientras el extremo − se acorta, manteniendo la longitud del filamento, se llama ______.', ['treadmilling', 'recambio rotatorio', 'recambio rotatorio (treadmilling)'],
 'En el recambio rotatorio (treadmilling) las subunidades avanzan desde el extremo + hacia el −, sin que cambie la longitud.')
MC('actina', I, MEC, '¿Por qué la fase de nucleación es el paso más lento de la polimerización de actina?', [
 ('Los complejos de 2–3 monómeros son inestables', 'Correcta: los pequeños agregados se desarman con facilidad antes de alcanzar un núcleo estable de tres subunidades.'),
 ('Requiere hidrolizar primero muchas moléculas de ATP', 'La hidrólisis no es necesaria para polimerizar; ocurre después.'),
 ('La actina G está siempre unida a la miosina', 'La actina libre no está unida a miosina; la reserva la secuestra la timosina.'),
 ('El extremo − tiene una concentración crítica baja', 'El extremo − tiene la concentración crítica alta; además eso afecta la elongación, no la nucleación.')],
 'Formar un núcleo estable es energéticamente desfavorable; por eso la célula usa nucleadores como Arp2/3 y las forminas.')
MATCH('actina', I, COMP, 'Relaciona cada proteína con su función sobre la actina.', [
 ['Arp2/3', 'Nuclea ramas a ≈70°'], ['Formina', 'Nuclea filamentos rectos desde el +'], ['Profilina', 'Entrega actina-ATP al extremo +'],
 ['Timosina β4', 'Secuestra monómeros'], ['Cofilina', 'Corta filamentos con ADP']],
 'Nucleadores (Arp2/3, formina), proteínas de monómero (profilina, timosina) y de corte (cofilina): juntas controlan dónde y cuánta actina se polimeriza.')
MC('actina', I, COMP, '¿Qué proteína se requiere para formar la red ramificada de actina del lamelipodio?', [
 ('El complejo Arp2/3', 'Correcta: nuclea filamentos nuevos sobre los existentes formando ramas a unos 70°.'),
 ('La proteína de casquete', 'Tapa el extremo + y detiene el crecimiento; no forma ramas.'),
 ('La timosina β4', 'Secuestra monómeros; frena la polimerización.'),
 ('La fimbrina', 'Agrupa filamentos paralelos (microvellosidades); no ramifica.')],
 'El lamelipodio depende de una red ramificada nucleada por Arp2/3, activado por la GTPasa Rac.')
MC('actina', A, RAZ, 'Se añade a una célula un exceso de timosina β4. ¿Qué es lo más probable?', [
 ('Disminuye la polimerización de actina', 'Correcta: la timosina secuestra actina G, que deja de estar disponible para los extremos +.'),
 ('Aumenta la ramificación de los filamentos', 'La ramificación depende de Arp2/3; la timosina no la estimula.'),
 ('Se estabilizan los filamentos existentes', 'La timosina actúa sobre monómeros, no estabiliza polímeros.'),
 ('Aumenta el corte de filamentos con ADP', 'El corte lo hace la cofilina, no la timosina.')],
 'Si se secuestra el monómero, baja la concentración de actina G libre y los filamentos crecen menos.')
MC('actina', B, COMP, '¿Cuál es el eje estructural de una microvellosidad?', [
 ('Un haz de filamentos de actina paralelos', 'Correcta: 20–30 filamentos con el + hacia la punta, unidos por fimbrina y villina.'),
 ('Un axonema de microtúbulos 9 + 2', 'Ese es el eje de los cilios móviles, que sí baten.'),
 ('Una red de filamentos de queratina', 'Las queratinas están en el citoplasma y en los desmosomas, no en el eje de la microvellosidad.'),
 ('Un cuerpo basal con tripletes', 'Los cuerpos basales están en la base de los cilios.')],
 'La microvellosidad es una proyección estructural sostenida por actina; no se mueve activamente, a diferencia del cilio.', 'Microvellosidad vs cilio')
TF('actina', I, COMP, 'Las microvellosidades se mueven activamente gracias a brazos de dineína.', False,
 'Las microvellosidades no tienen motores que las hagan batir: su eje es un haz de actina y su función es aumentar la superficie de absorción.',
 'Las microvellosidades son estructuras inmóviles sostenidas por un haz de actina; quienes baten con dineína son los cilios.')

# ---------------- MIOSINA / CONTRACCIÓN ----------------
MC('miosina', B, CON, 'Durante la contracción del sarcómero, ¿qué ocurre con la longitud de los filamentos?', [
 ('No cambia: los filamentos se deslizan', 'Correcta: modelo del filamento deslizante; lo que se acorta es el sarcómero.'),
 ('Los filamentos de actina se acortan', 'La actina no se acorta; se desliza hacia el centro.'),
 ('Los filamentos de miosina se acortan', 'La miosina tampoco se acorta; sus cabezas jalan a la actina.'),
 ('Ambos filamentos se acortan por igual', 'Ninguno se acorta: se superponen más.')],
 'Las cabezas de miosina II jalan a la actina hacia el centro; los discos Z se acercan y el sarcómero se acorta, pero los filamentos conservan su longitud.', 'Filamento deslizante')
MC('miosina', I, MEC, '¿Qué paso del ciclo de la miosina requiere la unión de una nueva molécula de ATP?', [
 ('La separación de la cabeza de la actina', 'Correcta: sin ATP la cabeza queda unida (rigor); el ATP la suelta.'),
 ('El golpe de fuerza sobre el filamento', 'El golpe de fuerza se asocia a la liberación del fosfato, no a la unión de ATP.'),
 ('La unión del Ca²⁺ a la troponina', 'El Ca²⁺ se une a la troponina; no es un paso del motor ni usa ATP.'),
 ('La polimerización de la actina', 'La polimerización no forma parte del ciclo de la miosina.')],
 'El ATP suelta la cabeza; su hidrólisis la "arma"; la salida del fosfato produce el golpe de fuerza; la salida del ADP deja el estado de rigor.')
ORDER('miosina', A, MEC, 'Ordena el ciclo de la miosina sobre la actina, empezando por el estado de rigor.', [
 'Cabeza unida fuertemente a la actina (rigor)', 'Se une ATP y la cabeza se suelta', 'Se hidroliza el ATP y la cabeza se "arma"', 'La cabeza se une débilmente a un nuevo sitio', 'Se libera el fosfato: golpe de fuerza', 'Se libera el ADP y vuelve el rigor'],
 'El ciclo convierte la energía del ATP en desplazamiento: unión de ATP → separación → hidrólisis → unión → golpe de fuerza → liberación de ADP.')
MC('miosina', A, CLIN, 'Horas después de la muerte, los músculos de un cadáver quedan rígidos. ¿Cuál es la explicación molecular?', [
 ('Sin ATP, la miosina no se separa de la actina', 'Correcta: la unión de ATP es lo que suelta la cabeza; sin él queda el estado de rigor.'),
 ('Sin ATP, la actina se despolimeriza por completo', 'La despolimerización ablandaría, no endurecería, el músculo.'),
 ('El Ca²⁺ se retira y bloquea los sitios de unión', 'Si el Ca²⁺ se retirara, la tropomiosina bloquearía la unión y el músculo se relajaría.'),
 ('Los filamentos intermedios se entrecruzan', 'La rigidez cadavérica se explica por la miosina y la actina, no por los intermedios.')],
 'El rigor mortis demuestra que el ATP es necesario para que la miosina se suelte, no solo para que jale.')
TF('miosina', I, MEC, 'En el músculo esquelético, la unión de Ca²⁺ a la troponina desplaza a la tropomiosina y deja libres los sitios de unión de la miosina en la actina.', True,
 'Correcto: en reposo la tropomiosina tapa los sitios de unión; el Ca²⁺ liberado del retículo sarcoplásmico cambia la troponina y destapa esos sitios.')
FILL('miosina', B, CON, 'La unidad contráctil del músculo esquelético, limitada por dos discos Z, es el ______.', ['sarcomero', 'sarcómero'],
 'El sarcómero va de un disco Z al siguiente; los filamentos finos de actina se anclan a los discos Z.')
MC('miosina', I, INT, 'En la citocinesis de una célula animal, ¿qué estructura divide el citoplasma?', [
 ('Un anillo contráctil de actina y miosina II', 'Correcta: se contrae como el cordón de una bolsa en el ecuador celular.'),
 ('Los microtúbulos cinetocóricos del huso', 'Esos separan los cromosomas, no dividen el citoplasma.'),
 ('Una placa de filamentos intermedios', 'Los intermedios no forman el surco de división.'),
 ('Los centriolos de cada polo', 'Los centriolos organizan microtúbulos; no contraen.')],
 'Microtúbulos separan cromosomas; actina y miosina II dividen la célula.')
MC('miosina', I, MEC, 'Una célula migra sobre una superficie. ¿Qué función cumple la miosina II en este proceso?', [
 ('Contrae la parte trasera para que avance', 'Correcta: la contracción posterior desprende las adhesiones traseras y empuja el cuerpo hacia adelante.'),
 ('Polimeriza actina en el borde frontal', 'La miosina no polimeriza actina; la protrusión la generan Arp2/3 y forminas.'),
 ('Nuclea ramas en el lamelipodio', 'Esa es la función de Arp2/3.'),
 ('Ancla la célula a la matriz extracelular', 'El anclaje lo hacen las integrinas de las adhesiones focales.')],
 'Movimiento celular: protrusión (actina), adhesión (integrinas) y contracción (miosina II).')
ORDER('miosina', I, MEC, 'Ordena los pasos del movimiento de una célula que repta sobre una superficie.', [
 'Protrusión del borde frontal por polimerización de actina', 'Formación de adhesiones al sustrato con integrinas', 'Contracción de la parte posterior por miosina II', 'Desprendimiento de las adhesiones traseras y avance'],
 'Primero la célula empuja su frente, luego se agarra, después se contrae y finalmente suelta la parte trasera.')

# ---------------- FILAMENTOS INTERMEDIOS ----------------
MC('fi', I, MEC, '¿Por qué los filamentos intermedios carecen de polaridad?', [
 ('Porque sus tetrámeros son antiparalelos', 'Correcta: dos dímeros se unen en sentidos opuestos, así que ambos extremos son iguales.'),
 ('Porque no se hidroliza su nucleótido', 'No unen nucleótido; eso explica su estabilidad, no la falta de polaridad.'),
 ('Porque se anclan a la envoltura nuclear', 'Solo las láminas están en el núcleo, y eso no define la polaridad.'),
 ('Porque son huecos como los microtúbulos', 'No son huecos; son cuerdas de 8 tetrámeros.')],
 'La asociación antiparalela de los dímeros al formar el tetrámero borra la polaridad; por eso no hay motores sobre ellos.', 'Polaridad de los intermedios')
ORDER('fi', I, COMP, 'Ordena el ensamblaje de un filamento intermedio.', [
 'Monómero con hélice α central', 'Dímero en hélice enrollada (paralelo)', 'Tetrámero antiparalelo y escalonado', 'Filamento de ≈10 nm (8 tetrámeros en corte)'],
 'Monómero → dímero paralelo → tetrámero antiparalelo → filamento tipo cuerda.')
MATCH('fi', B, CON, 'Relaciona cada filamento intermedio con el tipo celular o la localización donde predomina.', [
 ['Queratinas', 'Células epiteliales'], ['Desmina', 'Células musculares'], ['GFAP', 'Astrocitos'], ['Neurofilamentos', 'Axones'], ['Láminas', 'Envoltura nuclear']],
 'Los filamentos intermedios son específicos de tejido; por eso se usan como marcadores en patología.')
TF('fi', B, CON, 'Las láminas nucleares son filamentos intermedios que forman una malla en la cara interna de la envoltura nuclear.', True,
 'Correcto: las láminas forman la lámina nuclear, que da forma al núcleo y ancla la cromatina.')
MC('fi', A, INT, 'Al inicio de la mitosis, la envoltura nuclear se fragmenta. ¿Qué evento sobre los filamentos intermedios lo permite?', [
 ('La fosforilación de las láminas', 'Correcta: las cinasas dependientes de ciclina fosforilan las láminas y desarman la lámina nuclear.'),
 ('La hidrólisis del GTP de las láminas', 'Las láminas no unen GTP; eso es propio de la tubulina.'),
 ('El corte de las láminas por cofilina', 'La cofilina actúa sobre la actina.'),
 ('La unión de dineína a las láminas', 'No hay motores sobre filamentos intermedios.')],
 'El ensamblaje de los intermedios se regula por fosforilación, no por nucleótidos.')
MC('fi', I, APL, 'Un patólogo encuentra un tumor que se tiñe intensamente para queratinas. ¿Qué origen es el más probable?', [
 ('Epitelial (carcinoma)', 'Correcta: las queratinas son los filamentos intermedios de los epitelios.'),
 ('Muscular (sarcoma)', 'Un tumor muscular expresaría desmina.'),
 ('Glial (astrocitoma)', 'Los astrocitos expresan GFAP.'),
 ('Neuronal', 'Las neuronas expresan neurofilamentos.')],
 'Como cada tejido expresa su tipo de filamento intermedio, la inmunotinción ayuda a reconocer el origen de un tumor.')
FILL('fi', B, CON, 'Los filamentos intermedios se conectan con los de la célula vecina a través de uniones llamadas ______.', ['desmosomas', 'desmosoma'],
 'En los desmosomas, cadherinas especializadas se conectan por dentro con filamentos de queratina.')
TF('fi', I, COMP, 'Existen proteínas motoras que transportan vesículas sobre los filamentos intermedios.', False,
 'Los motores necesitan un riel polar. Los intermedios no tienen polaridad, por lo que no hay motores sobre ellos.',
 'No hay proteínas motoras sobre los filamentos intermedios porque carecen de polaridad.')

# ---------------- MICROTÚBULOS ----------------
MC('mt', B, CON, '¿Cuál es la subunidad estructural de los microtúbulos?', [
 ('El heterodímero de α- y β-tubulina', 'Correcta: los dímeros α/β se unen cabeza con cola formando protofilamentos.'),
 ('El monómero de γ-tubulina', 'La γ-tubulina nuclea microtúbulos en el centrosoma; no es la subunidad del tubo.'),
 ('La actina unida a GTP', 'La actina forma microfilamentos y une ATP.'),
 ('El tetrámero de vimentina', 'La vimentina es un filamento intermedio.')],
 'α/β-tubulina con GTP → protofilamentos → tubo de 13 protofilamentos.', 'Subunidad de los microtúbulos')
FILL('mt', B, CON, 'Un microtúbulo típico está formado por ______ protofilamentos.', ['13', 'trece'],
 'Trece protofilamentos de α/β-tubulina se cierran en un tubo hueco de 25 nm.')
TF('mt', I, CON, 'En el extremo más (+) de un microtúbulo queda expuesta la α-tubulina.', False,
 'En el extremo + queda expuesta la β-tubulina; la α-tubulina queda expuesta en el extremo −.',
 'En el extremo + queda expuesta la β-tubulina; en el extremo −, la α-tubulina.')
TF('mt', I, MEC, 'El GTP de la α-tubulina nunca se hidroliza; el que se hidroliza tras la incorporación es el de la β-tubulina.', True,
 'Correcto: el GTP de α queda atrapado en la interfaz del dímero; el de β queda expuesto y se hidroliza, lo que regula la estabilidad.')
MC('mt', I, MEC, '¿Qué es el casquete de GTP de un microtúbulo?', [
 ('Una zona del extremo + con tubulina-GTP que lo estabiliza', 'Correcta: mientras exista, el extremo crece; si se pierde, ocurre la catástrofe.'),
 ('Una proteína que tapa el extremo − en el centrosoma', 'El extremo − se ancla al anillo de γ-tubulina, no a un "casquete".'),
 ('El GTP de la α-tubulina en todo el microtúbulo', 'Ese GTP no se hidroliza y no regula la dinámica.'),
 ('Una MAP que impide la despolimerización', 'Las MAP estabilizadoras existen, pero no son el casquete de GTP.')],
 'La tubulina-GTP es recta y se une bien; la tubulina-GDP se curva. El casquete de GTP mantiene el extremo estable.')
MC('mt', A, RAZ, 'Si un microtúbulo pierde su casquete de GTP, ¿qué es lo esperable?', [
 ('Se despolimeriza rápidamente (catástrofe)', 'Correcta: los protofilamentos con GDP se curvan y se separan.'),
 ('Crece más rápido por el extremo +', 'Sin casquete, el extremo deja de crecer.'),
 ('Se convierte en un filamento intermedio', 'Un microtúbulo no cambia de tipo de filamento.'),
 ('Se ancla de inmediato al centrosoma', 'El anclaje del extremo − no depende del casquete del extremo +.')],
 'Catástrofe = cambio brusco de crecimiento a acortamiento rápido; rescate = recuperación del casquete.')
ORDER('mt', I, MEC, 'Ordena la secuencia de la inestabilidad dinámica de un microtúbulo.', [
 'Llegan dímeros con GTP al extremo +', 'Se forma un casquete de GTP y el microtúbulo crece', 'La hidrólisis alcanza el extremo y se pierde el casquete', 'Catástrofe: los protofilamentos se curvan y se desarma', 'Rescate: recupera el casquete y vuelve a crecer'],
 'La inestabilidad dinámica permite que los microtúbulos exploren el citoplasma.')
MC('mt', I, COMP, '¿Cuál diferencia correctamente el treadmilling de la inestabilidad dinámica?', [
 ('El treadmilling mantiene la longitud; la inestabilidad alterna crecer y colapsar', 'Correcta: son comportamientos distintos, típicos de actina y de microtúbulos, respectivamente.'),
 ('Ambos describen el colapso por pérdida del casquete', 'El treadmilling no implica colapso.'),
 ('El treadmilling es de microtúbulos; la inestabilidad de actina', 'Está invertido.'),
 ('El treadmilling requiere GTP; la inestabilidad ATP', 'La dinámica de los microtúbulos depende de GTP, no de ATP.')],
 'Treadmilling: flujo de subunidades con longitud constante. Inestabilidad dinámica: fases aleatorias de crecimiento y colapso.', 'Treadmilling vs inestabilidad dinámica')
MC('mt', B, CON, '¿Qué proteína del centrosoma nuclea los microtúbulos?', [
 ('El complejo en anillo de γ-tubulina', 'Correcta: funciona como molde sobre el que se asientan los primeros dímeros.'),
 ('La cinesina-13', 'Desestabiliza microtúbulos; no los nuclea.'),
 ('La proteína tau', 'Estabiliza microtúbulos axonales; no los nuclea.'),
 ('El complejo Arp2/3', 'Nuclea actina, no microtúbulos.')],
 'El γ-TuRC del material pericentriolar nuclea microtúbulos con su extremo − anclado.')
MATCH('mt', I, COMP, 'Relaciona cada término con su descripción.', [
 ['Centrosoma', 'Principal MTOC de la célula animal'], ['Centriolo', '9 tripletes sin par central'], ['Material pericentriolar', 'Contiene los anillos de γ-tubulina'], ['MAP tau', 'Estabiliza microtúbulos del axón']],
 'El centrosoma (MTOC) está formado por dos centriolos y material pericentriolar; las MAP modulan la estabilidad.')
TF('mt', I, COMP, 'En la mayoría de las células, el extremo menos de los microtúbulos está en el centrosoma y el extremo más apunta a la periferia.', True,
 'Correcto: esta orientación es la que determina que la cinesina haga transporte anterógrado y la dineína retrógrado.')
MC('mt', A, APL, 'En una neurona, la proteína tau se hiperfosforila y se separa de los microtúbulos. ¿Qué consecuencia es esperable?', [
 ('Se desestabilizan los microtúbulos y falla el transporte axonal', 'Correcta: tau estabiliza los microtúbulos del axón; su pérdida altera el transporte (enfermedad de Alzheimer).'),
 ('Se forman más microvellosidades en la terminal', 'Las microvellosidades dependen de actina y no se relacionan con tau.'),
 ('Aumenta la contracción de la miosina II', 'Tau no regula a la miosina.'),
 ('Se refuerza la lámina nuclear', 'Tau no actúa sobre las láminas.')],
 'Tau hiperfosforilada forma ovillos neurofibrilares y deja microtúbulos inestables.')

# ---------------- MOTORES ----------------
MC('motores', B, CON, '¿Qué proteína motora se desplaza generalmente hacia el extremo positivo del microtúbulo?', [
 ('Cinesina', 'Correcta: la mayoría de las cinesinas caminan hacia el extremo + usando ATP (transporte anterógrado).'),
 ('Dineína', 'La dineína camina hacia el extremo −.'),
 ('Miosina', 'La miosina se mueve sobre actina, no sobre microtúbulos.'),
 ('Tubulina', 'La tubulina es la subunidad del microtúbulo, no un motor.')],
 'Cinesina → extremo + (centro a periferia); dineína → extremo − (periferia a centro).', 'Cinesina vs dineína')
TF('motores', B, CON, 'La dineína generalmente se desplaza hacia el extremo positivo del microtúbulo.', False,
 'La dineína se desplaza hacia el extremo menos (−), es decir, de la periferia hacia el centro de la célula: transporte retrógrado.',
 'La dineína generalmente se desplaza hacia el extremo negativo del microtúbulo.')
MATCH('motores', I, COMP, 'Relaciona cada elemento con su característica.', [
 ['Kinesina', 'Transporte hacia el extremo +'], ['Dineína', 'Transporte hacia el extremo −'], ['Miosina', 'Se mueve sobre actina'], ['Tubulina', 'Forma los microtúbulos']],
 'Motores de microtúbulos: cinesina (+) y dineína (−). La miosina usa actina. La tubulina es la subunidad del riel.')
MC('motores', I, APL, 'En una neurona, ¿qué motor lleva vesículas sinápticas desde el cuerpo celular hasta la terminal axónica?', [
 ('Cinesina, porque el extremo + apunta a la terminal', 'Correcta: en el axón los extremos + miran hacia la terminal; es transporte anterógrado.'),
 ('Dineína, porque el extremo − apunta a la terminal', 'En el axón el extremo − está hacia el cuerpo celular.'),
 ('Miosina II, porque el axón es rico en actina', 'El transporte axonal largo usa microtúbulos.'),
 ('Ninguno: las vesículas difunden por el axón', 'La difusión sería demasiado lenta en distancias de centímetros.')],
 'Transporte anterógrado = cinesina; retrógrado = dineína.')
MC('motores', A, RAZ, 'Se inhibe la dineína citoplasmática en un fibroblasto. ¿Qué cambio es esperable en el aparato de Golgi?', [
 ('Se dispersa lejos del centrosoma', 'Correcta: la dineína (hacia el −) mantiene el Golgi agrupado junto al centrosoma.'),
 ('Se concentra aún más en el centro', 'Esa sería la consecuencia de inhibir la cinesina.'),
 ('Se convierte en retículo endoplásmico', 'Los motores no cambian la identidad de los organelos.'),
 ('No cambia, porque el Golgi no usa motores', 'La posición del Golgi depende de la dineína.')],
 'Los motores no solo transportan: también posicionan organelos.')
FILL('motores', I, CON, 'El transporte desde la terminal axónica hacia el cuerpo celular se llama transporte ______ y lo realiza la dineína.', ['retrogrado', 'retrógrado'],
 'Anterógrado = hacia la terminal (cinesina). Retrógrado = hacia el cuerpo celular (dineína).')
MC('motores', I, MEC, '¿De dónde obtienen la energía las cinesinas y las dineínas para desplazarse?', [
 ('De la hidrólisis de ATP en sus cabezas motoras', 'Correcta: cada paso se acopla a un ciclo de unión e hidrólisis de ATP.'),
 ('De la hidrólisis del GTP de la tubulina', 'Ese GTP regula la dinámica del microtúbulo, no al motor.'),
 ('Del gradiente de protones de la mitocondria', 'Los motores no usan gradientes directamente.'),
 ('De la polimerización del microtúbulo', 'La polimerización no impulsa a los motores.')],
 'Todos los motores (miosinas, cinesinas, dineínas) son ATPasas.')

# ---------------- CENTROSOMA / CILIOS ----------------
MC('cilios', B, CON, '¿Cuál es la organización del axonema de un cilio móvil?', [
 ('9 dobletes periféricos y un par central (9 + 2)', 'Correcta: es el patrón de cilios y flagelos móviles.'),
 ('9 tripletes sin par central (9 + 0)', 'Ese es el patrón del centriolo y del cuerpo basal.'),
 ('13 protofilamentos en un solo tubo', 'Esa es la estructura de un microtúbulo individual.'),
 ('Un haz de 20–30 filamentos de actina', 'Ese es el eje de la microvellosidad.')],
 'Cilio móvil: 9 + 2 (dobletes). Centriolo / cuerpo basal: 9 + 0 (tripletes).', 'Axonema 9 + 2')
MATCH('cilios', I, COMP, 'Relaciona cada estructura con su organización.', [
 ['Axonema de cilio móvil', '9 dobletes + par central'], ['Centriolo', '9 tripletes'], ['Cuerpo basal', '9 tripletes en la base del cilio'], ['Microvellosidad', 'Haz de actina paralela']],
 'Los cuerpos basales son centriolos modificados que organizan el axonema.')
MC('cilios', I, MEC, '¿Qué convierte el deslizamiento de los dobletes en la flexión del cilio?', [
 ('Los puentes de nexina que unen los dobletes', 'Correcta: al estar amarrados, los dobletes no pueden deslizarse libremente y el axonema se dobla.'),
 ('La polimerización del par central', 'El par central no impulsa la flexión por polimerización.'),
 ('La contracción de miosina II en la base', 'La miosina no participa en el batido ciliar.'),
 ('La rotación del cuerpo basal', 'El cuerpo basal ancla y organiza; no rota.')],
 'Dineína = fuerza de deslizamiento; nexina = restricción que transforma el deslizamiento en flexión.')
ORDER('cilios', A, MEC, 'Ordena cómo se produce la flexión de un cilio.', [
 'La dineína de un doblete se une al doblete vecino', 'La dineína hidroliza ATP y "camina" sobre el vecino', 'Los dobletes tienden a deslizarse uno sobre otro', 'La nexina impide el deslizamiento libre', 'El axonema se dobla'],
 'El batido resulta de la activación alternada de los brazos de dineína en distintos lados del axonema.')
TF('cilios', I, COMP, 'El cuerpo basal de un cilio tiene la misma estructura que el axonema: 9 dobletes y un par central.', False,
 'El cuerpo basal tiene 9 tripletes sin par central (9 + 0), igual que un centriolo. El par central solo existe en el axonema.',
 'El cuerpo basal tiene 9 tripletes sin par central (9 + 0); el axonema tiene 9 dobletes y un par central (9 + 2).')
FILL('cilios', B, CON, 'Los brazos que generan el movimiento del axonema están formados por la proteína motora ______.', ['dineina', 'dineína', 'dineina ciliar', 'dineína ciliar'],
 'Los brazos de dineína ciliar salen del túbulo A de cada doblete.')
ID('cilios', I, CON, 'axonema', '¿Qué estructura señala la flecha en este corte de axonema?', [
 ('Un doblete periférico de microtúbulos', 'Correcta: cada doblete tiene un túbulo A completo y un túbulo B incompleto.'),
 ('El par central de microtúbulos', 'El par central está en el centro del corte.'),
 ('Un triplete de centriolo', 'Los tripletes están en centriolos y cuerpos basales, no en el axonema.'),
 ('Un filamento de actina', 'El axonema está formado por microtúbulos.')],
 'En el corte del axonema 9 + 2 hay nueve dobletes en la periferia y un par central.')
ID('cilios', I, CON, 'axonema_central', '¿Qué estructura señala la flecha?', [
 ('El par central', 'Correcta: dos microtúbulos individuales en el centro del axonema 9 + 2.'),
 ('Un brazo de dineína', 'Los brazos de dineína salen de los dobletes periféricos.'),
 ('El cuerpo basal', 'El cuerpo basal está en la base del cilio, no en su corte.'),
 ('Un puente de nexina', 'La nexina une dobletes vecinos en la periferia.')],
 'El par central es lo que distingue al axonema (9 + 2) del cuerpo basal (9 + 0).')
ID('mt', B, CON, 'motores', 'En el esquema, una carga avanza hacia el extremo señalado con la flecha (extremo +). ¿Qué motor la transporta?', [
 ('Cinesina', 'Correcta: la cinesina avanza hacia el extremo +.'),
 ('Dineína', 'La dineína avanza hacia el extremo −.'),
 ('Miosina II', 'La miosina II se mueve sobre actina.'),
 ('γ-tubulina', 'La γ-tubulina nuclea; no transporta.')],
 'La dirección del transporte depende del motor y de la polaridad del microtúbulo.')
ID('miosina', I, CON, 'sarcomero', '¿Qué estructura del sarcómero señala la flecha?', [
 ('El disco Z', 'Correcta: delimita el sarcómero y ancla los filamentos finos de actina.'),
 ('Un filamento grueso de miosina II', 'Los filamentos gruesos ocupan el centro del sarcómero.'),
 ('Un filamento intermedio de queratina', 'En el músculo el intermedio es la desmina, y no es lo señalado.'),
 ('Un microtúbulo cinetocórico', 'Los microtúbulos cinetocóricos pertenecen al huso mitótico.')],
 'Sarcómero = de disco Z a disco Z.')

# ---------------- DIVISIÓN ----------------
MATCH('division', I, COMP, 'Relaciona cada tipo de microtúbulo del huso con su función.', [
 ['Cinetocóricos', 'Se unen a los cromosomas y los separan'], ['Polares', 'Se solapan en el ecuador y empujan los polos'], ['Astrales', 'Se dirigen a la corteza y posicionan el huso']],
 'El huso mitótico tiene tres poblaciones de microtúbulos con funciones distintas.')
MC('division', A, RAZ, 'Una célula presenta una alteración que impide la formación adecuada de microtúbulos. ¿Qué proceso se afectaría directamente?', [
 ('La separación de los cromosomas en la mitosis', 'Correcta: el huso mitótico está hecho de microtúbulos.'),
 ('La contracción del anillo de citocinesis', 'El anillo es de actina y miosina II.'),
 ('La formación de microvellosidades', 'Las microvellosidades dependen de actina.'),
 ('La resistencia mecánica de los desmosomas', 'Los desmosomas dependen de filamentos intermedios.')],
 'Sin microtúbulos no hay huso, y sin huso los cromosomas no se separan.')
MC('division', A, MEC, '¿Cómo arrastran los microtúbulos cinetocóricos a las cromátidas durante la anafase?', [
 ('Se acortan por despolimerización mientras siguen unidos', 'Correcta: el cinetocoro se mantiene unido al extremo que se desarma y la cromátida es arrastrada al polo.'),
 ('Se alargan y empujan las cromátidas', 'Un microtúbulo que se alarga empujaría, no arrastraría hacia el polo.'),
 ('Se convierten en filamentos de actina', 'No hay conversión entre tipos de filamentos.'),
 ('La miosina II tira de ellos desde el polo', 'La miosina no participa en la separación de cromátidas.')],
 'La despolimerización controlada genera fuerza: el huso necesita poder crecer y acortarse.')
TF('division', I, INT, 'Los microtúbulos se encargan de separar los cromosomas y la actina se encarga de dividir el citoplasma.', True,
 'Correcto: huso de microtúbulos en la mitosis; anillo contráctil de actina y miosina II en la citocinesis.')
MC('division', A, APL, 'Un fármaco estabiliza los microtúbulos e impide que se desarmen. ¿Qué ocurre con la mitosis?', [
 ('Se detiene porque el huso no puede acortarse', 'Correcta: es el mecanismo del paclitaxel; las cromátidas no pueden separarse.'),
 ('Se acelera porque el huso es más estable', 'El huso necesita dinámica; estabilizarlo lo paraliza.'),
 ('Continúa normal, pero falla la citocinesis', 'El bloqueo ocurre antes, en la separación de cromátidas.'),
 ('Se forman núcleos sin envoltura nuclear', 'La envoltura depende de las láminas, no de este efecto.')],
 'Tanto impedir la polimerización (vincristina) como impedir la despolimerización (paclitaxel) detienen la mitosis.')

# ---------------- INTEGRACIÓN / REGULACIÓN ----------------
MATCH('integracion', I, COMP, 'Relaciona cada unión celular con el filamento al que se ancla.', [
 ['Unión adherente', 'Actina'], ['Desmosoma', 'Filamentos intermedios'], ['Hemidesmosoma', 'Filamentos intermedios (a la lámina basal)'], ['Adhesión focal', 'Actina (a la matriz extracelular)']],
 'Uniones adherentes y adhesiones focales → actina; desmosomas y hemidesmosomas → filamentos intermedios.')
MATCH('integracion', A, MEC, 'Relaciona cada GTPasa con la estructura de actina que induce.', [
 ['Rho', 'Fibras de estrés'], ['Rac', 'Lamelipodios'], ['Cdc42', 'Filopodios']],
 'Rho → fibras de estrés contráctiles; Rac → lamelipodios (Arp2/3); Cdc42 → filopodios (forminas).')
MC('integracion', I, MEC, '¿Cuándo está activa una GTPasa de la familia Rho?', [
 ('Cuando tiene GTP unido, gracias a un GEF', 'Correcta: los GEF intercambian GDP por GTP y la encienden.'),
 ('Cuando tiene GDP unido, gracias a un GAP', 'Con GDP está apagada; el GAP la apaga al estimular la hidrólisis.'),
 ('Cuando se une directamente a la tubulina', 'Rho regula sobre todo a la actina.'),
 ('Cuando está fosforilada por la miosina', 'La miosina no fosforila a las GTPasas.')],
 'Interruptor molecular: GEF enciende (GTP), GAP apaga (GDP).')
MC('integracion', A, INT, 'Un neutrófilo se dirige hacia una bacteria. ¿Qué combinación describe mejor lo que ocurre?', [
 ('Rac/Cdc42 al frente forman protrusiones y Rho atrás activa la contracción', 'Correcta: el frente protruye con actina y la parte trasera se contrae con miosina II.'),
 ('Los intermedios forman lamelipodios y la dineína contrae la parte trasera', 'Los intermedios no forman protrusiones y la dineína no contrae la célula.'),
 ('El huso se orienta hacia la bacteria y la célula se divide', 'La migración no implica división.'),
 ('Las microvellosidades baten y empujan a la célula', 'Las microvellosidades no baten.')],
 'La migración integra señales (GTPasas Rho), actina (protrusión) y miosina II (contracción).')

# ---------------- CLÍNICA ----------------
MC('clinica', I, CLIN, 'Un paciente presenta alteración de la función ciliar y problemas respiratorios recurrentes. ¿Qué estructura celular probablemente está afectada?', [
 ('El axonema, por falta de brazos de dineína', 'Correcta: sin dineína ciliar los cilios no baten y el moco no se elimina.'),
 ('El haz de actina de las microvellosidades', 'Las microvellosidades no limpian las vías respiratorias.'),
 ('Los filamentos de queratina de los desmosomas', 'Su falla produce fragilidad cutánea, no infecciones respiratorias.'),
 ('La lámina nuclear de las células epiteliales', 'Las laminopatías no se presentan así.')],
 'Discinesia ciliar primaria: falla del axonema (con frecuencia, dineína).')
MC('clinica', A, CLIN, 'Un niño con sinusitis y neumonías de repetición tiene el corazón a la derecha. Su padre es infértil por espermatozoides inmóviles. ¿Qué diagnóstico es el más probable?', [
 ('Síndrome de Kartagener', 'Correcta: discinesia ciliar primaria con situs inversus.'),
 ('Epidermólisis bullosa simple', 'Afecta la piel por defectos de queratinas.'),
 ('Progeria de Hutchinson-Gilford', 'Se debe a la lámina A y causa envejecimiento prematuro.'),
 ('Enfermedad de Alzheimer', 'Es neurodegenerativa del adulto y se relaciona con tau.')],
 'Los cilios del nodo embrionario determinan la lateralidad; sin ellos, la mitad de los pacientes tiene situs inversus.')
TF('clinica', I, CLIN, 'En el síndrome de Kartagener, el situs inversus se explica porque los cilios del nodo embrionario no establecen la asimetría izquierda-derecha.', True,
 'Correcto: sin flujo ciliar en el nodo, la lateralidad queda al azar.')
MC('clinica', I, CLIN, 'Un recién nacido desarrolla ampollas con el simple roce de la ropa. Se encuentra una mutación en la queratina 14. ¿Qué estructura falla?', [
 ('Los filamentos intermedios de los queratinocitos basales', 'Correcta: epidermólisis bullosa simple (K5/K14).'),
 ('Los microtúbulos del huso de la epidermis', 'Un defecto del huso no causaría ampollas por roce.'),
 ('Los filamentos de actina de las microvellosidades', 'La piel no depende de microvellosidades.'),
 ('Los brazos de dineína de los cilios', 'Eso causaría discinesia ciliar.')],
 'Las queratinas K5/K14 dan resistencia mecánica a la capa basal; si fallan, las células se rompen.')
MATCH('clinica', I, APL, 'Relaciona cada fármaco con su efecto sobre el citoesqueleto.', [
 ['Colchicina', 'Impide polimerizar microtúbulos (gota)'], ['Vincristina', 'Impide polimerizar microtúbulos (quimioterapia)'], ['Paclitaxel', 'Estabiliza microtúbulos'], ['Faloidina', 'Estabiliza actina F'], ['Citocalasina', 'Bloquea el extremo + de la actina']],
 'Impedir la polimerización o estabilizar en exceso: ambas cosas bloquean la dinámica.')
MC('clinica', I, APL, '¿Por qué la colchicina es útil en un ataque de gota?', [
 ('Altera los microtúbulos de los neutrófilos y frena su migración', 'Correcta: disminuye la respuesta inflamatoria frente a los cristales de urato.'),
 ('Disuelve los cristales de urato en la articulación', 'No actúa sobre los cristales.'),
 ('Estabiliza la actina de los condrocitos', 'No actúa sobre la actina.'),
 ('Inhibe la síntesis de ácido úrico en el hígado', 'Ese es el mecanismo de otros fármacos (alopurinol).')],
 'La colchicina se une a la tubulina e impide polimerizar microtúbulos.')
MC('clinica', A, APL, 'Un paciente tratado con vincristina presenta hormigueo y debilidad en manos y pies. ¿Cuál es la explicación más probable?', [
 ('Se altera el transporte axonal que depende de microtúbulos', 'Correcta: la neuropatía periférica es un efecto adverso típico de los fármacos que actúan sobre microtúbulos.'),
 ('Se bloquea la contracción de la miosina II', 'La vincristina no actúa sobre la miosina.'),
 ('Se destruyen los filamentos de queratina', 'No actúa sobre los intermedios.'),
 ('Se impide la formación de microvellosidades', 'No actúa sobre la actina.')],
 'Los axones largos dependen del transporte por cinesina y dineína sobre microtúbulos.')
MC('clinica', A, CLIN, 'Una niña de 8 años presenta envejecimiento acelerado: piel delgada, pérdida de cabello y aterosclerosis. Se encuentra un núcleo deformado. ¿Qué proteína es la más probablemente afectada?', [
 ('La lámina A', 'Correcta: progeria de Hutchinson-Gilford.'),
 ('La queratina 5', 'Su mutación causa epidermólisis bullosa.'),
 ('La dineína ciliar', 'Causa discinesia ciliar primaria.'),
 ('La β-tubulina', 'No se relaciona con este cuadro.')],
 'La lámina A forma la lámina nuclear; su forma anómala deforma el núcleo.')
