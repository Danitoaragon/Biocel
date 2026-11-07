from qhelp import *
tema('dogma')

# ---------------- FLUJO / ÁCIDOS ----------------
ORDER('flujo', B, CON, 'Ordena el flujo de la información genética según el dogma central.', ['ADN', 'ARN mensajero', 'Proteína'],
 'Replicación copia el ADN; transcripción ADN → ARN; traducción ARN → proteína.')
MATCH('flujo', B, CON, 'Relaciona cada proceso con su molde y su producto.', [
 ['Replicación', 'ADN → ADN'], ['Transcripción', 'ADN → ARN'], ['Traducción', 'ARNm → proteína'], ['Retrotranscripción', 'ARN → ADN']],
 'La retrotranscripción es la excepción del dogma, propia de retrovirus como el VIH.')
TF('flujo', B, CON, 'Según el dogma central, la información puede fluir de una proteína hacia el ADN.', False,
 'La información no regresa de las proteínas a los ácidos nucleicos. La única excepción reconocida es ARN → ADN (retrotranscripción).',
 'La información fluye de los ácidos nucleicos a las proteínas, nunca de las proteínas al ADN.')
FILL('flujo', B, CON, 'La enzima de los retrovirus que copia ARN en ADN se llama ______.', ['transcriptasa inversa', 'retrotranscriptasa', 'transcriptasa reversa'],
 'La transcriptasa inversa del VIH es blanco de varios antirretrovirales.')
MC('acidos', B, COMP, '¿Cuál diferencia estructural explica que el ARN sea menos estable que el ADN?', [
 ('El grupo OH en el carbono 2′ de la ribosa', 'Correcta: lo hace más reactivo y susceptible a romperse.'),
 ('El uso de timina en lugar de uracilo', 'Está invertido: el ARN usa uracilo.'),
 ('Su doble cadena antiparalela', 'El ARN suele ser de cadena sencilla.'),
 ('La ausencia de enlaces fosfodiéster', 'El ARN también tiene enlaces fosfodiéster.')],
 'Ribosa (OH 2′) vs desoxirribosa: diferencia clave de estabilidad.', 'ADN vs ARN')
MATCH('acidos', B, CON, 'Relaciona cada característica con el ácido nucleico que la tiene.', [
 ['Desoxirribosa', 'ADN'], ['Uracilo', 'ARN'], ['Doble hélice estable', 'ADN'], ['Cadena sencilla que se pliega', 'ARN']],
 'ADN: desoxirribosa, T, doble hélice. ARN: ribosa, U, cadena sencilla.')
FILL('acidos', I, CON, 'Las polimerasas solo pueden añadir nucleótidos al extremo ______ de la cadena en crecimiento.', ["3'", '3′', '3', "3'-oh", '3′-oh', '3 oh', "3' oh", '3-oh'],
 'Por eso toda síntesis de ácidos nucleicos ocurre 5′→3′.')
TF('acidos', I, MEC, 'La hebra molde se lee en dirección 3′→5′ mientras la hebra nueva crece 5′→3′.', True,
 'Correcto: son antiparalelas; la enzima recorre el molde 3′→5′ y extiende la nueva cadena 5′→3′.')

# ---------------- REPLICACIÓN ----------------
ORDER('replicacion', I, MEC, 'Ordena el inicio de la replicación en E. coli.', [
 'DnaA + ATP se une a OriC', 'Se abre la región rica en A-T', 'DnaC carga la helicasa DnaB', 'DnaB separa las hebras; SSB y girasa estabilizan', 'La primasa sintetiza el cebador'],
 'DnaA reconoce, DnaC carga, DnaB abre, SSB y girasa estabilizan, primasa ceba.')
ORDER('replicacion', I, MEC, 'Ordena cómo se completa la hebra rezagada en bacterias.', [
 'La primasa coloca un cebador de ARN', 'La ADN pol III extiende el fragmento de Okazaki', 'La ADN pol I quita el cebador y rellena con ADN', 'La ADN ligasa sella la mella'],
 'En eucariotas: RNasa H y FEN1 quitan el cebador, Pol δ rellena y la ligasa I sella.')
MATCH('replicacion', I, COMP, 'Relaciona cada proteína bacteriana con su equivalente eucariota.', [
 ['DnaB (helicasa)', 'MCM'], ['SSB', 'RPA'], ['Subunidad β (abrazadera)', 'PCNA'], ['ADN pol I (quita cebadores)', 'RNasa H y FEN1'], ['DnaG (primasa)', 'Pol α-primasa']],
 'Mismas funciones, distintas proteínas.')
TF('replicacion', I, MEC, 'La hebra rezagada se sintetiza en dirección 3′→5′ porque su molde está invertido.', False,
 'Ninguna polimerasa sintetiza 3′→5′. La rezagada también se hace 5′→3′, pero en fragmentos (Okazaki) que se alejan de la horquilla.',
 'La hebra rezagada se sintetiza 5′→3′ en fragmentos de Okazaki.')
FILL('replicacion', B, CON, 'Los fragmentos cortos de ADN de la hebra rezagada se llaman fragmentos de ______.', ['okazaki'],
 'Miden 1000–2000 nt en bacterias y 100–200 nt en eucariotas.')
MC('replicacion', A, RAZ, 'Una bacteria tiene una ADN ligasa defectuosa. ¿Qué se acumularía?', [
 ('Fragmentos de Okazaki sin unir', 'Correcta: quedan mellas entre los fragmentos de la hebra rezagada.'),
 ('Cebadores de ARN en la hebra líder', 'La eliminación de cebadores depende de la pol I, no de la ligasa.'),
 ('ADN superenrollado delante de la horquilla', 'Eso dependería de la girasa.'),
 ('Hebras simples sin SSB', 'Las SSB no dependen de la ligasa.')],
 'La ligasa forma el último enlace fosfodiéster entre fragmentos.')
MC('replicacion', A, RAZ, 'Se inhibe la girasa bacteriana con una quinolona. ¿Qué ocurre en la horquilla?', [
 ('Se acumula tensión de superenrollamiento y la horquilla se detiene', 'Correcta: la girasa elimina la torsión que genera la helicasa al abrir.'),
 ('Las hebras se vuelven a aparear inmediatamente', 'Eso evitan las SSB.'),
 ('No se forman cebadores', 'Los cebadores los hace la primasa.'),
 ('La polimerasa pierde su actividad correctora', 'La corrección depende de la exonucleasa de la polimerasa.')],
 'Por eso las quinolonas son bactericidas.')
MC('replicacion', I, MEC, '¿Por qué los cromosomas eucariotas necesitan telomerasa y los bacterianos no?', [
 ('Porque son lineales y su extremo no se copia completo', 'Correcta: al quitar el último cebador no hay 3′-OH para rellenar.'),
 ('Porque tienen un solo origen de replicación', 'Tienen muchos orígenes.'),
 ('Porque su ADN polimerasa no corrige errores', 'Las polimerasas eucariotas sí corrigen.'),
 ('Porque no tienen fragmentos de Okazaki', 'Sí los tienen.')],
 'El ADN bacteriano es circular y no tiene extremos.')
MC('replicacion', A, MEC, '¿Qué garantiza que cada origen eucariota se dispare una sola vez por ciclo?', [
 ('MCM solo puede cargarse en G1 y se activa en S', 'Correcta: licenciamiento separado de la activación.'),
 ('La telomerasa cierra los orígenes usados', 'La telomerasa actúa en los extremos.'),
 ('La ligasa I sella los orígenes', 'La ligasa sella mellas.'),
 ('La PCNA bloquea el origen tras usarlo', 'La PCNA es la abrazadera de la polimerasa.')],
 'Licenciamiento (ORC, Cdc6, Cdt1 cargan MCM en G1) y activación (CDK, DDK en S).')

# ---------------- TRANSCRIPCIÓN ----------------
ORDER('transcripcion', I, MEC, 'Ordena el ensamblaje del complejo de preiniciación eucariota.', [
 'TFIID (TBP) se une a la caja TATA', 'Se unen TFIIA y TFIIB', 'Se recluta la ARN pol II unida a TFIIF', 'Se une TFIIE', 'Se une TFIIH, abre el ADN y fosforila el CTD'],
 'TFIIH es helicasa y cinasa: abre el promotor y libera a la polimerasa.')
ORDER('transcripcion', I, MEC, 'Ordena la iniciación de la transcripción en bacterias.', [
 'La holoenzima busca promotores unida débilmente al ADN', 'σ reconoce las regiones −35 y −10 (complejo cerrado)', 'Se abren ≈17 pb (complejo abierto)', 'Se sintetizan los primeros nucleótidos', 'σ se libera tras 6–10 nt'],
 'Después comienza la elongación por el núcleo de la polimerasa.')
MATCH('transcripcion', I, CON, 'Relaciona cada ARN polimerasa eucariota con sus productos.', [
 ['ARN pol I', 'ARNr 28S, 18S y 5.8S'], ['ARN pol II', 'pre-ARNm'], ['ARN pol III', 'ARNt y ARNr 5S']],
 'La pol II es la que produce los ARNm y la que tiene el CTD.')
TF('transcripcion', B, CON, 'La ARN polimerasa necesita un cebador para iniciar la síntesis de ARN.', False,
 'La ARN polimerasa puede iniciar sin cebador; por eso la primasa, que es una ARN polimerasa, fabrica los cebadores de la replicación.',
 'La ARN polimerasa no necesita cebador: inicia la cadena por sí misma.')
FILL('transcripcion', B, CON, 'En bacterias, la subunidad de la ARN polimerasa que reconoce el promotor es el factor ______.', ['sigma', 'σ'],
 'σ70 reconoce las regiones −35 y −10.')
FILL('transcripcion', I, CON, 'En los eucariotas, la caja TATA se ubica aproximadamente en la posición ______ respecto al inicio.', ['-25', '−25', 'menos 25'],
 'Es reconocida por la TBP, subunidad de TFIID.')
MC('transcripcion', I, COMP, '¿Cuál diferencia correctamente transcripción y traducción?', [
 ('La transcripción produce ARN a partir de ADN; la traducción, proteína a partir de ARNm', 'Correcta: distintos moldes, productos y maquinarias.'),
 ('Ambas ocurren en el ribosoma con distinto molde', 'La transcripción la hace la ARN polimerasa, no el ribosoma.'),
 ('La transcripción usa aminoácidos y la traducción nucleótidos', 'Está invertido.'),
 ('La traducción ocurre en el núcleo y la transcripción en el citoplasma', 'En eucariotas es al revés.')],
 'Transcribir = copiar a otro "alfabeto" de nucleótidos; traducir = cambiar a aminoácidos.', 'Transcripción vs traducción')
MC('transcripcion', A, RAZ, 'Una mutación cambia la región −10 de un promotor bacteriano para que se parezca menos al consenso TATAAT. ¿Qué es lo esperable?', [
 ('Disminuye la frecuencia de inicio de ese gen', 'Correcta: σ reconoce peor el promotor y abre peor la doble hélice.'),
 ('El ARN se sintetiza en dirección 3′→5′', 'La dirección no cambia nunca.'),
 ('El gen se transcribe desde el terminador', 'No se invierte el sentido.'),
 ('Se producen intrones en el ARN', 'Los intrones son propios de genes eucariotas.')],
 'Cuanto más se parece un promotor al consenso, más fuerte suele ser.')

# ---------------- PROCESAMIENTO ----------------
ORDER('procesamiento', I, MEC, 'Ordena los pasos de la poliadenilación.', [
 'CPSF reconoce AAUAAA', 'CstF reconoce la región rica en GU/U', 'Se corta el ARN (CFI y CFII)', 'La poli-A polimerasa añade adeninas', 'PABPN1 estabiliza la cola'],
 'La PAP no usa molde y usa ATP como sustrato.')
ORDER('procesamiento', I, MEC, 'Ordena la formación del cap 5′.', [
 'ARN trifosfatasa quita un fosfato (pppN → ppN)', 'Guanilil transferasa añade GMP (GpppN)', 'Metiltransferasa metila la guanina con SAM (m⁷GpppN)'],
 'Ocurre cuando el ARN mide 20–30 nucleótidos, tras la fosforilación de la Ser5 del CTD.')
MATCH('procesamiento', I, CON, 'Relaciona cada snRNP del espliceosoma con su función.', [
 ['U1', 'Reconoce el sitio 5′ del intrón'], ['U2', 'Reconoce el punto de ramificación'], ['U4/U6', 'Catalizan el corte'], ['U5', 'Une los exones']],
 'El espliceosoma está formado por snRNA y proteínas (snRNP).')
MC('procesamiento', B, COMP, '¿Cuál diferencia correctamente un exón de un intrón?', [
 ('El exón permanece en el ARNm maduro; el intrón se elimina', 'Correcta: el splicing quita intrones y une exones.'),
 ('El intrón se traduce; el exón no', 'Al contrario: el intrón no se traduce.'),
 ('El exón está solo en bacterias', 'Los intrones son propios de genes eucariotas.'),
 ('El intrón está en el ARNm maduro como señal de paro', 'El intrón no está en el ARNm maduro.')],
 'EXón = EXpresado; INtrón = INterrumpe.', 'Intrón vs exón')
TF('procesamiento', I, COMP, 'El splicing alternativo permite que un mismo gen produzca varias proteínas distintas.', True,
 'Correcto: al combinar los exones de diferentes maneras se obtienen distintos ARNm.')
FILL('procesamiento', B, CON, 'La cola poli-A del ARNm eucariota tiene aproximadamente entre 50 y ______ adeninas.', ['250'],
 'La añade la poli-A polimerasa sin molde.')
MATCH('procesamiento', I, COMP, 'Relaciona cada modificación del pre-ARNm con una de sus funciones.', [
 ['Cap 5′', 'Reconocimiento por eIF4E para iniciar la traducción'], ['Cola poli-A', 'Mayor estabilidad y vida media'], ['Splicing', 'Elimina intrones y une exones']],
 'Las tres modificaciones están coordinadas por el CTD de la ARN pol II.')
MC('procesamiento', A, RAZ, 'Un pre-ARNm no recibe cap 5′. ¿Qué consecuencia es la más esperable?', [
 ('Se degrada más rápido y se traduce mal', 'Correcta: el cap protege de exonucleasas y es reconocido por eIF4E.'),
 ('Se traduce en el núcleo', 'La traducción sigue siendo citoplasmática.'),
 ('Pierde todos sus exones', 'El cap no determina qué exones quedan.'),
 ('Se convierte en ARNt', 'No cambia de tipo de ARN.')],
 'El cap protege, ayuda a exportar y permite iniciar la traducción.')
MC('procesamiento', A, MEC, 'Se impide la fosforilación de la serina 5 del CTD de la ARN polimerasa II. ¿Qué proceso se afecta primero?', [
 ('El reclutamiento de las enzimas del cap', 'Correcta: Ser5-P es la señal para el capping temprano.'),
 ('La poliadenilación al final del gen', 'Se coordina más tarde.'),
 ('La traducción en el ribosoma', 'No depende directamente del CTD.'),
 ('La replicación de los telómeros', 'No tiene relación.')],
 'TFIIH fosforila la Ser5 al inicio: la polimerasa sale del promotor y se recluta la maquinaria del cap.')

# ---------------- TRADUCCIÓN ----------------
ORDER('traduccion', I, MEC, 'Ordena el ciclo de elongación de la traducción.', [
 'EF-Tu/eEF1A-GTP lleva el aminoacil-ARNt al sitio A', 'Se comprueba el apareamiento codón-anticodón y se hidroliza GTP', 'La peptidil transferasa forma el enlace peptídico', 'EF-G/eEF2-GTP transloca el ribosoma un codón', 'El ARNt vacío sale por el sitio E'],
 'El ciclo se repite por cada aminoácido.')
ORDER('traduccion', I, MEC, 'Ordena el inicio de la traducción en eucariotas.', [
 'eIF4F reconoce el cap 5′', 'Se une la subunidad 40S con el Met-ARNt iniciador (eIF2-GTP)', 'El complejo barre el ARNm hasta el AUG', 'eIF5 estimula la hidrólisis de GTP', 'Se une la subunidad 60S y se forma el 80S'],
 'eIF3 impide que la 60S se una antes de tiempo.')
MATCH('traduccion', I, CON, 'Relaciona cada sitio del ribosoma con su función.', [
 ['Sitio A', 'Entrada del aminoacil-ARNt'], ['Sitio P', 'ARNt con la cadena peptídica'], ['Sitio E', 'Salida del ARNt vacío']],
 'A = aminoacil, P = peptidil, E = exit (salida).')
MC('traduccion', B, COMP, '¿Cuál diferencia correctamente un codón de un anticodón?', [
 ('El codón está en el ARNm; el anticodón, en el ARNt', 'Correcta: se aparean de forma complementaria y antiparalela.'),
 ('El codón está en el ARNt; el anticodón, en el ARNm', 'Está invertido.'),
 ('Ambos están en el ARN ribosomal', 'El ARNr no contiene codones para leer.'),
 ('El codón tiene 3 bases y el anticodón 2', 'Ambos tienen tres bases.')],
 'El ARNt "lee" el codón con su anticodón.', 'Codón vs anticodón')
TF('traduccion', I, MEC, 'El enlace peptídico lo cataliza una proteína ribosomal con actividad peptidil transferasa.', False,
 'La actividad peptidil transferasa reside en el ARN ribosomal de la subunidad mayor (28S en eucariotas, 23S en bacterias): el ribosoma es una ribozima.',
 'El enlace peptídico lo cataliza el ARN ribosomal de la subunidad mayor; el ribosoma es una ribozima.')
FILL('traduccion', B, CON, 'La enzima que une cada aminoácido a su ARNt correspondiente es la aminoacil-ARNt ______.', ['sintetasa'],
 'Hay una para cada aminoácido; usa ATP y garantiza la fidelidad.')
MATCH('traduccion', A, COMP, 'Relaciona cada factor bacteriano con su equivalente eucariota.', [
 ['IF2', 'eIF2'], ['EF-Tu', 'eEF1A'], ['EF-G', 'eEF2'], ['RF1 / RF2', 'eRF1'], ['RF3', 'eRF3']],
 'Funciones equivalentes: llevar el iniciador, entrada del ARNt, translocación y terminación.')
MC('traduccion', A, RAZ, 'Una aminoacil-ARNt sintetasa une por error alanina a un ARNt de cisteína. ¿Qué pasará en el ribosoma?', [
 ('Se incorporará alanina donde el ARNm pide cisteína', 'Correcta: el ribosoma solo verifica codón-anticodón, no el aminoácido.'),
 ('El ribosoma rechazará el ARNt', 'El ribosoma no "ve" el aminoácido.'),
 ('El ARNt se unirá al codón de alanina', 'Se une según su anticodón (de cisteína).'),
 ('La traducción se detendrá en ese codón', 'No hay mecanismo de paro por esta causa.')],
 'La fidelidad de la traducción depende mucho de las sintetasas.')
MC('traduccion', I, INT, '¿Qué indica que una proteína tenga un péptido señal hidrofóbico en su extremo amino?', [
 ('Que se termina de sintetizar en el RER para secretarse o ir a membrana', 'Correcta: la SRP la lleva al translocón Sec61.'),
 ('Que se importará a la mitocondria por TOM', 'La señal mitocondrial es distinta (hélice anfipática con cargas +).'),
 ('Que se degradará en el proteasoma', 'La señal de degradación es la ubiquitinación.'),
 ('Que se quedará en el núcleo', 'Las proteínas nucleares tienen señales de localización nuclear.')],
 'Péptido señal → SRP → receptor → Sec61.')

# ---------------- CÓDIGO GENÉTICO ----------------
FILL('codigo', B, CON, 'Con 4 bases y codones de 3 nucleótidos existen ______ codones posibles.', ['64', 'sesenta y cuatro'],
 '4³ = 64: 61 codifican aminoácidos y 3 son de paro.')
MATCH('codigo', B, CON, 'Relaciona cada término con su significado.', [
 ['AUG', 'Codón de inicio y metionina'], ['UAA, UAG, UGA', 'Codones de paro'], ['Código degenerado', 'Varios codones para un aminoácido'], ['Marco de lectura', 'Lectura de tres en tres desde el AUG']],
 'El código es degenerado, no ambiguo, sin superposición y casi universal.')
TF('codigo', I, CON, 'Que el código genético sea degenerado significa que un codón puede codificar varios aminoácidos distintos.', False,
 'Degenerado significa que un aminoácido puede ser codificado por varios codones. Cada codón codifica un solo aminoácido (el código no es ambiguo).',
 'El código es degenerado porque un mismo aminoácido puede tener varios codones; cada codón codifica un solo aminoácido.')
MC('codigo', I, MEC, '¿Qué explica la hipótesis del bamboleo (wobble)?', [
 ('Que un ARNt reconozca varios codones sinónimos', 'Correcta: la tercera base del codón se aparea de forma menos estricta.'),
 ('Que el ribosoma pueda leer en ambas direcciones', 'El ARNm se lee 5′→3′.'),
 ('Que existan tres codones de paro', 'No se relaciona.'),
 ('Que la metionina sea el primer aminoácido', 'No se relaciona.')],
 'Por eso no se necesitan 61 ARNt distintos.')
TF('codigo', I, COMP, 'El código genético es casi universal; las mitocondrias tienen pequeñas diferencias, como que UGA codifica triptófano.', True,
 'Correcto: es una de las variantes del código mitocondrial.')
FILL('codigo', B, CON, 'El ribosoma sintetiza las proteínas desde el extremo amino hasta el extremo ______.', ['carboxilo', 'carboxilo terminal', 'c', 'cooh'],
 'El ARNm se lee 5′→3′ y la proteína crece N→C.')

# ---------------- MUTACIONES ----------------
MATCH('mutaciones', I, CON, 'Relaciona cada tipo de mutación con su efecto.', [
 ['Silenciosa', 'Mismo aminoácido'], ['Missense', 'Otro aminoácido'], ['Nonsense', 'Codón de paro prematuro'], ['Frameshift', 'Cambia el marco de lectura']],
 'El efecto depende de cómo cambia la lectura del código.')
MC('mutaciones', I, APL, 'En un gen, el codón GAA (Glu) cambia a GAG (Glu). ¿Qué tipo de mutación es?', [
 ('Silenciosa', 'Correcta: ambos codones codifican ácido glutámico.'),
 ('Missense', 'No cambia el aminoácido.'),
 ('Nonsense', 'GAG no es codón de paro.'),
 ('Frameshift', 'Es una sustitución, no inserción ni deleción.')],
 'La degeneración del código hace que muchos cambios en la tercera base sean silenciosos.')
MC('mutaciones', I, APL, 'Un codón UGG (Trp) cambia a UGA. ¿Qué tipo de mutación es y qué consecuencia tiene?', [
 ('Nonsense: proteína truncada', 'Correcta: UGA es codón de paro.'),
 ('Missense: cambia a otro aminoácido', 'UGA no codifica aminoácido en el código estándar.'),
 ('Silenciosa: sin efecto', 'Sí tiene efecto: detiene la traducción.'),
 ('Frameshift: cambia el marco', 'Es una sustitución.')],
 'Las mutaciones nonsense suelen producir proteínas no funcionales.')
MC('mutaciones', A, RAZ, '¿Cuál mutación tiene más probabilidad de anular por completo una proteína?', [
 ('Inserción de un nucleótido cerca del inicio de la región codificante', 'Correcta: frameshift temprano; cambia todos los codones siguientes.'),
 ('Sustitución en la tercera base de un codón', 'Suele ser silenciosa.'),
 ('Deleción de tres nucleótidos al final', 'Elimina un aminoácido sin cambiar el marco.'),
 ('Sustitución que cambia un aminoácido por otro parecido', 'Missense conservadora; efecto leve.')],
 'La posición y el tipo de mutación determinan su gravedad.')
TF('mutaciones', I, COMP, 'Toda deleción de nucleótidos en una región codificante produce un corrimiento del marco de lectura.', False,
 'Solo las deleciones que no son múltiplo de tres cambian el marco. Una deleción de tres nucleótidos quita un aminoácido y conserva el marco (como ΔF508 en fibrosis quística).',
 'Solo las inserciones o deleciones que no son múltiplo de tres producen frameshift.')
MC('mutaciones', A, CLIN, 'En la anemia de células falciformes, el ácido glutámico 6 de la β-globina se sustituye por valina. ¿Qué tipo de mutación es?', [
 ('Missense', 'Correcta: una sustitución que cambia un aminoácido por otro.'),
 ('Nonsense', 'No aparece un codón de paro.'),
 ('Silenciosa', 'Sí cambia el aminoácido.'),
 ('Frameshift', 'No hay inserción ni deleción.')],
 'Un solo aminoácido distinto cambia la conducta de la hemoglobina desoxigenada.')
FILL('mutaciones', I, CON, 'La mutación que convierte un codón de aminoácido en un codón de paro se llama mutación ______.', ['nonsense', 'sin sentido', 'sinsentido'],
 'Produce una proteína truncada y suele causar degradación del ARNm.')

# ---------------- REGULACIÓN ----------------
MATCH('regulacion', I, CON, 'Relaciona cada mecanismo con su efecto sobre la transcripción.', [
 ['Acetilación de histonas (HAT)', 'Activa'], ['Desacetilación (HDAC)', 'Reprime'], ['Metilación del ADN en promotores', 'Silencia'], ['Activador en un enhancer', 'Aumenta']],
 'La cromatina abierta permite la transcripción; la compacta la impide.')
ORDER('regulacion', A, MEC, 'Ordena la activación de un gen eucariota.', [
 'Los transactivadores se unen a los enhancers', 'Reclutan coactivadores con actividad HAT', 'La cromatina se relaja', 'Contactan TFIID y la TBP se une a TATA', 'Se une la ARN pol II y se forma el complejo básico', 'Inicia la transcripción'],
 'Un bucle de ADN acerca el enhancer al promotor; el Mediador comunica al activador con la polimerasa.')
MC('regulacion', I, MEC, '¿Por qué la acetilación de histonas favorece la transcripción?', [
 ('Neutraliza cargas positivas y relaja la cromatina', 'Correcta: las histonas se unen menos al ADN, que queda accesible.'),
 ('Añade cargas positivas que atraen a la polimerasa', 'La acetilación quita cargas positivas.'),
 ('Corta el ADN para que entre la polimerasa', 'No corta el ADN.'),
 ('Metila las citosinas del promotor', 'Eso es metilación del ADN y silencia.')],
 'HAT abren; HDAC cierran.')
MC('regulacion', I, COMP, '¿Qué es un operón?', [
 ('Varios genes bacterianos bajo un mismo promotor', 'Correcta: se transcriben juntos en un ARNm policistrónico.'),
 ('Un intrón que regula el splicing', 'No es un intrón.'),
 ('Un enhancer eucariota lejano', 'Los operones son bacterianos.'),
 ('Un tipo de ARN de transferencia', 'No es un ARN.')],
 'Ejemplo clásico: el operón lac, regulado por un represor que responde a la lactosa.')
MC('regulacion', A, RAZ, 'Un potenciador está a 20 000 pares de bases del promotor. ¿Cómo puede activar ese gen?', [
 ('El ADN forma un bucle que lo acerca al promotor', 'Correcta: el activador contacta al Mediador y al complejo basal.'),
 ('La ARN polimerasa transcribe desde el potenciador', 'La transcripción empieza en el promotor.'),
 ('El potenciador se corta y se traslada al promotor', 'No hay rearreglo del ADN.'),
 ('Solo funciona si está a menos de 100 pb', 'Los potenciadores actúan a grandes distancias.')],
 'Modelo del bucle: potenciador y promotor se acercan en el espacio.')
TF('regulacion', I, INT, 'En las bacterias la transcripción y la traducción pueden ocurrir al mismo tiempo sobre el mismo ARNm.', True,
 'Correcto: al no haber núcleo, los ribosomas comienzan a traducir el ARNm mientras aún se transcribe.')

# ---------------- CLÍNICA ----------------
MC('clinica', I, CLIN, 'Un paciente con tuberculosis recibe rifampicina. ¿Por qué afecta a la bacteria y no a sus células?', [
 ('Se une a la subunidad β de la ARN polimerasa bacteriana', 'Correcta: la ARN pol II humana no tiene esa subunidad.'),
 ('Bloquea los ribosomas 80S humanos', 'No actúa sobre ribosomas.'),
 ('Inhibe la telomerasa bacteriana', 'Las bacterias no tienen telomerasa.'),
 ('Impide el splicing bacteriano', 'Las bacterias casi no tienen splicing.')],
 'La selectividad se basa en diferencias moleculares.')
MC('clinica', A, CLIN, 'Una familia comió hongos silvestres; 12 horas después presentan daño hepático grave. ¿Qué proceso fue bloqueado?', [
 ('La transcripción por la ARN polimerasa II', 'Correcta: la α-amanitina de Amanita phalloides la inhibe.'),
 ('La replicación por la ADN pol III', 'La pol III es bacteriana.'),
 ('La traducción en ribosomas 70S', 'Los ribosomas 70S son bacterianos.'),
 ('La poliadenilación por la PAP', 'No es el blanco de la toxina.')],
 'Sin ARNm nuevos, las células hepáticas (muy activas) mueren.')
MATCH('clinica', I, APL, 'Relaciona cada fármaco con su blanco.', [
 ['Quinolonas', 'Girasa y topoisomerasa IV'], ['Rifampicina', 'ARN polimerasa bacteriana'], ['Tetraciclinas', 'Sitio A del ribosoma (30S)'], ['Cloranfenicol', 'Peptidil transferasa (50S)'], ['Macrólidos', 'Translocación (50S)']],
 'Cada antibiótico bloquea un paso distinto del dogma bacteriano.')
MC('clinica', I, MEC, '¿Por qué la cordicepina detiene la síntesis de ARN?', [
 ('Se incorpora y no tiene 3′-OH para continuar', 'Correcta: es un terminador de cadena.'),
 ('Se intercala entre las bases del ADN', 'Ese es el mecanismo de la actinomicina D.'),
 ('Se une a la subunidad β bacteriana', 'Ese es el mecanismo de la rifampicina.'),
 ('Imita al aminoacil-ARNt', 'Esa es la puromicina.')],
 'Sin 3′-OH no se puede formar el siguiente enlace fosfodiéster.')
MC('clinica', A, CLIN, 'Un niño con quemaduras solares graves y lesiones cutáneas precoces tiene un defecto en la reparación por escisión de nucleótidos. ¿Qué enfermedad es la más probable?', [
 ('Xeroderma pigmentoso', 'Correcta: no repara el daño por luz ultravioleta y desarrolla cáncer de piel.'),
 ('β-talasemia', 'Es una alteración de la globina.'),
 ('Síndrome de Kartagener', 'Es ciliar.'),
 ('Fibrosis quística', 'Es por mutaciones del canal CFTR.')],
 'TFIIH participa en la transcripción y en la reparación por escisión de nucleótidos.')
TF('clinica', I, CLIN, 'Muchas mutaciones que causan β-talasemia alteran los sitios de splicing del gen de la β-globina.', True,
 'Correcto: el espliceosoma reconoce mal el intrón y el ARNm resultante produce poca β-globina funcional.')
