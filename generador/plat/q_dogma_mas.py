"""Más preguntas generales del dogma central (cobertura de todo el capítulo). Se agregan al final para no cambiar ids."""
from qhelp import *
tema('dogma')

# ---- flujo ----
MC('flujo', B, CON, '¿Quién formuló el dogma central de la biología molecular?', [
 ('Francis Crick', 'Correcta: describió el sentido del flujo de la información genética.'),
 ('Peter Mitchell', 'Propuso la teoría quimiosmótica.'),
 ('Gregor Mendel', 'Describió las leyes de la herencia.'),
 ('Erwin Chargaff', 'Describió las proporciones de bases del ADN.')],
 'ADN → ARN → proteína.', 'Dogma central')
MATCH('flujo', B, CON, 'Relaciona cada proceso con lo que hace.', [
 ['Replicación', 'ADN → ADN'], ['Transcripción', 'ADN → ARN'], ['Traducción', 'ARNm → proteína'], ['Retrotranscripción', 'ARN → ADN']],
 'La retrotranscripción es la excepción de los retrovirus.', 'Flujo de información')
MC('flujo', I, COMP, '¿Qué tienen en común las tres polimerizaciones del dogma (ADN, ARN y proteína)?', [
 ('Usan un molde, siguen complementariedad y avanzan en una dirección fija', 'Correcta: es la idea central del capítulo.'),
 ('Ocurren todas en el núcleo', 'La traducción ocurre en el citoplasma.'),
 ('Usan todas la misma enzima', 'Cada una usa enzimas distintas.'),
 ('No necesitan energía', 'Todas consumen enlaces de alta energía.')],
 'Molde + dirección + quién cataliza = puedes reconstruir los tres procesos.', 'Dogma central')
TF('flujo', B, CON, 'Una neurona y un hepatocito de la misma persona tienen prácticamente el mismo ADN; la diferencia está en qué genes se expresan.', True,
 'La expresión génica diferencial explica la diferenciación celular.', concepto='Expresión génica')
MATCH('flujo', I, INT, 'Relaciona cada proceso con la etapa o lugar al que está acoplado.', [
 ['Replicación', 'Fase S del ciclo celular'], ['Transcripción', 'Cromatina y señalización'], ['Traducción de proteínas con péptido señal', 'Retículo endoplásmico y vía secretora']],
 'El dogma está conectado con el resto de la célula.', 'Conexiones')
FILL('flujo', I, CON, 'Cada aminoácido incorporado a una proteína cuesta aproximadamente ______ enlaces de alta energía.', ['4', 'cuatro'],
 'Dos en su activación (ATP) y dos GTP en la elongación.', 'Costo energético')
# ---- ácidos nucleicos ----
MATCH('acidos', B, CON, 'Relaciona cada base con su tipo.', [
 ['Adenina', 'Purina'], ['Guanina', 'Purina'], ['Citosina', 'Pirimidina'], ['Uracilo', 'Pirimidina']],
 'Purinas: dos anillos (A, G). Pirimidinas: un anillo (C, T, U).', 'Bases nitrogenadas')
MC('acidos', B, CON, '¿Cuántos puentes de hidrógeno forma el par G-C?', [
 ('Tres', 'Correcta: A-T forma dos.'),
 ('Dos', 'Ese es el par A-T.'),
 ('Uno', 'Ningún par forma uno solo.'),
 ('Cuatro', 'No corresponde.')],
 'Por eso las regiones ricas en G-C son más estables.', 'Apareamiento de bases')
MC('acidos', I, RAZ, '¿Por qué los orígenes de replicación y las cajas de los promotores suelen ser ricos en A-T?', [
 ('Porque A-T tiene solo dos puentes de hidrógeno y se separa más fácil', 'Correcta: abrir la doble hélice cuesta menos.'),
 ('Porque A-T es más estable que G-C', 'Es al revés.'),
 ('Porque la polimerasa no lee G ni C', 'Sí las lee.'),
 ('Porque el uracilo sustituye a la timina ahí', 'En el ADN no hay uracilo.')],
 'Abrir el ADN es el primer paso de la replicación y de la transcripción.', 'Apareamiento de bases')
TF('acidos', B, CON, 'Según la regla de Chargaff, en el ADN de doble cadena la cantidad de A es igual a la de T y la de G igual a la de C.', True,
 'Se debe al apareamiento complementario purina-pirimidina.', concepto='Regla de Chargaff')
MC('acidos', I, COMP, '¿Por qué la doble hélice tiene un ancho constante?', [
 ('Porque siempre se aparea una purina con una pirimidina', 'Correcta: cada par tiene tres anillos en total.'),
 ('Porque solo existen pares A-T', 'También hay pares G-C.'),
 ('Porque las histonas la aprietan', 'El ancho depende del apareamiento, no de las histonas.'),
 ('Porque el ADN es de cadena sencilla', 'Es de doble cadena.')],
 'Purina (2 anillos) + pirimidina (1 anillo).', 'Doble hélice')
MATCH('acidos', I, CON, 'Relaciona cada medida de la forma B del ADN con su valor.', [
 ['Diámetro', '≈2 nm'], ['Pares de bases por vuelta', '≈10.5'], ['Longitud de una vuelta', '≈3.4 nm'], ['Sentido de la hélice', 'Dextrógira']],
 'La forma B es la más común en la célula.', 'Forma B del ADN')
MC('acidos', I, COMP, '¿Desde dónde "leen" las bases los factores de transcripción sin separar las cadenas?', [
 ('Desde el surco mayor', 'Correcta: ahí quedan más expuestos los bordes de las bases.'),
 ('Desde el surco menor exclusivamente', 'El surco mayor es el principal sitio de lectura.'),
 ('Desde el esqueleto azúcar-fosfato', 'Ahí no se distingue la secuencia.'),
 ('Desde el extremo 3′-OH', 'No leen desde los extremos.')],
 'El giro de la hélice deja un surco mayor y uno menor.', 'Surcos del ADN')
MC('acidos', B, CON, '¿Cómo están unidos los nucleótidos en una cadena de ADN?', [
 ('Por enlaces fosfodiéster entre el C3′ de un azúcar y el C5′ del siguiente', 'Correcta: por eso la cadena tiene extremos 5′ y 3′.'),
 ('Por puentes de hidrógeno entre azúcares', 'Los puentes de hidrógeno unen las bases de cadenas opuestas.'),
 ('Por enlaces peptídicos', 'Esos unen aminoácidos.'),
 ('Por enlaces glucosídicos entre bases', 'El enlace glucosídico une la base con su azúcar.')],
 'Extremo 5′ con fosfato, extremo 3′ con OH.', 'Enlace fosfodiéster')
MATCH('acidos', I, CON, 'Relaciona cada componente de la cromatina con su descripción.', [
 ['Nucleosoma', '≈147 pb alrededor de un octámero de histonas'], ['Octámero', 'Dos copias de H2A, H2B, H3 y H4'], ['Histona H1', 'Sella la entrada y salida del ADN'], ['Heterocromatina', 'Muy compactada y casi silenciosa']],
 'La eucromatina es poco compactada y activa.', 'Cromatina')
MATCH('acidos', B, CON, 'Relaciona cada tipo de ARN con su función.', [
 ['ARNm', 'Lleva la información del gen al ribosoma'], ['ARNr', 'Estructura y centro catalítico del ribosoma'], ['ARNt', 'Adaptador que lleva cada aminoácido'], ['snRNA', 'Forma el espliceosoma'], ['miRNA', 'Regula la expresión génica']],
 'Los ARN que no se traducen se llaman funcionales o no codificantes.', 'Tipos de ARN')
MC('acidos', I, COMP, '¿Por qué el ARN es adecuado como mensaje temporal y el ADN como archivo permanente?', [
 ('El OH en 2′ hace al ARN más reactivo y menos estable', 'Correcta: el ADN, sin ese OH, es más estable.'),
 ('El ARN tiene timina y el ADN uracilo', 'Es al revés.'),
 ('El ARN es siempre de doble cadena', 'Suele ser de cadena sencilla.'),
 ('El ARN no puede plegarse', 'Sí puede plegarse en estructuras 3D.')],
 'Estructura → estabilidad → función.', 'ADN vs ARN')
MC('acidos', B, CON, '¿Qué determina la secuencia de aminoácidos (estructura primaria) de una proteína?', [
 ('La secuencia de nucleótidos del ARNm', 'Correcta: y la secuencia determina el plegamiento y la función.'),
 ('El número de ribosomas que la traducen', 'Varios ribosomas producen la misma secuencia.'),
 ('La cantidad de ATP disponible', 'No determina la secuencia.'),
 ('La forma del retículo endoplásmico', 'No determina la secuencia.')],
 'Secuencia → plegamiento → función.', 'Proteínas')
MC('acidos', I, MEC, '¿Qué se libera cada vez que una polimerasa añade un nucleótido a la cadena?', [
 ('Pirofosfato (PPᵢ)', 'Correcta: su hidrólisis hace la reacción prácticamente irreversible.'),
 ('Un fosfato inorgánico (Pᵢ) solamente', 'Se libera pirofosfato, dos fosfatos unidos.'),
 ('Una molécula de agua y GTP', 'No se libera GTP.'),
 ('Un aminoácido', 'Eso no ocurre en la síntesis de ácidos nucleicos.')],
 'El nucleótido entra como trifosfato (dNTP o NTP).', 'Polimerización 5′→3′')
# ---- gen ----
MATCH('transcripcion', B, CON, 'Relaciona cada parte de un gen con su función.', [
 ['Promotor', 'Indica dónde y en qué dirección empezar'], ['Sitio +1', 'Primer nucleótido transcrito'], ['Exón', 'Permanece en el ARN maduro'], ['Intrón', 'Se elimina en el splicing'], ['Terminador', 'Indica dónde terminar']],
 'Exones e intrones son típicos de los eucariotas.', 'Anatomía de un gen')
MC('transcripcion', I, COMP, 'El ARN tiene la misma secuencia que ¿cuál hebra del ADN (cambiando T por U)?', [
 ('La hebra codificante (sentido)', 'Correcta: porque es complementario a la hebra molde.'),
 ('La hebra molde (antisentido)', 'El ARN es complementario a la molde, no igual.'),
 ('Ambas hebras por igual', 'Las hebras son complementarias entre sí; el ARN solo es igual a una.'),
 ('Ninguna, porque el ARN tiene ribosa', 'La secuencia de bases sí coincide con la codificante.')],
 'Molde = transcrita; codificante = igual al ARN.', 'Hebras molde y codificante')
MATCH('transcripcion', B, CON, 'Relaciona cada tipo de unidad de transcripción con su característica.', [
 ['Monocistrónica', 'Un solo gen; típica de eucariotas'], ['Policistrónica', 'Varios genes; típica de bacterias']],
 'Los operones bacterianos producen ARNm policistrónicos.', 'Unidad de transcripción')
# ---- procesamiento ----
MATCH('procesamiento', I, CON, 'Relaciona cada enzima del cap 5′ con lo que hace.', [
 ['ARN trifosfatasa', 'Quita un fosfato del extremo 5′'], ['Guanilil transferasa', 'Añade GMP'], ['Metiltransferasa', 'Metila con S-adenosilmetionina']],
 'El cap es una 7-metilguanosina unida por un enlace 5′-5′ trifosfato.', 'Cap 5′')
FILL('procesamiento', I, CON, 'El cap 5′ se añade cuando el ARN mide aproximadamente entre 20 y ______ nucleótidos.', ['30'],
 'El procesamiento ocurre mientras se transcribe, coordinado por el CTD.', 'Cap 5′')
MC('procesamiento', I, COMP, '¿Qué proteína reconoce el cap para iniciar la traducción?', [
 ('eIF4E', 'Correcta: es el factor que une el cap.'),
 ('PABP', 'Se une a la cola poli-A.'),
 ('CPSF', 'Reconoce la señal AAUAAA.'),
 ('U1', 'Reconoce el sitio 5′ del intrón.')],
 'Cap: protección, exportación y traducción.', 'Cap 5′')
MATCH('procesamiento', I, CON, 'Relaciona cada factor de la poliadenilación con su función.', [
 ['CPSF', 'Reconoce la señal AAUAAA'], ['CstF', 'Reconoce una región rica en GU/U'], ['Poli-A polimerasa', 'Añade adeninas sin molde'], ['PABP', 'Se une a la cola y estabiliza el ARNm']],
 'El corte ocurre 10–30 nt después de AAUAAA.', 'Cola poli-A')
TF('procesamiento', I, COMP, 'La poli-A polimerasa usa el ADN como molde para añadir la cola de adeninas.', False,
 'Añade las adeninas sin molde.',
 corr='La cola poli-A se añade sin molde, después de cortar el ARN.', concepto='Cola poli-A')
MC('procesamiento', I, CON, '¿Qué secuencia marca el sitio 5′ de un intrón y qué la reconoce?', [
 ('GU, reconocida por U1', 'Correcta: U2 reconoce el punto de ramificación.'),
 ('AAUAAA, reconocida por CPSF', 'Esa es la señal de poliadenilación.'),
 ('TATA, reconocida por TBP', 'Esa es la caja del promotor.'),
 ('AUG, reconocida por el ARNt iniciador', 'Ese es el codón de inicio.')],
 'Intrón: GU en 5′, A de ramificación, sale en lazo.', 'Splicing')
MC('procesamiento', I, COMP, '¿En qué forma sale el intrón durante el splicing?', [
 ('En forma de lazo', 'Correcta: la A del punto de ramificación forma el lazo.'),
 ('Como una cadena lineal con cap', 'No recibe cap.'),
 ('Como un ARN de doble cadena', 'No es de doble cadena.'),
 ('Unido al exón siguiente', 'Los exones se unen entre sí; el intrón sale.')],
 'Lazo = lariat.', 'Splicing')
MC('procesamiento', A, RAZ, '¿Por qué el splicing debe ser preciso a nivel de un solo nucleótido?', [
 ('Un error desplazaría el marco de lectura', 'Correcta: cambiaría todos los codones siguientes.'),
 ('Porque el intrón se traduce si queda un nucleótido', 'El problema es el marco de lectura.'),
 ('Porque el cap se perdería', 'El cap no depende del splicing.'),
 ('Porque la cola poli-A se acortaría', 'No es la consecuencia.')],
 'Precisión del espliceosoma = marco de lectura correcto.', 'Splicing')
FILL('procesamiento', I, CON, 'Los humanos tienen unos ______ genes codificantes, pero muchas más proteínas gracias al splicing alternativo.', ['20 000', '20000', '20,000', '20.000'],
 'El splicing alternativo combina exones según el tejido o la etapa.', 'Splicing alternativo')
MATCH('procesamiento', I, CON, 'Relaciona cada snRNP del espliceosoma con su papel.', [
 ['U1', 'Reconoce el sitio 5′ del intrón'], ['U2', 'Reconoce el punto de ramificación'], ['U4/U6 y U5', 'Completan el espliceosoma catalítico']],
 'El espliceosoma está formado por snRNP y muchas proteínas.', 'Espliceosoma')
# ---- código genético y ARNt ----
MATCH('codigo', B, CON, 'Relaciona cada característica del código genético con su significado.', [
 ['Degenerado', 'Un aminoácido puede tener varios codones'], ['No ambiguo', 'Cada codón codifica un solo aminoácido'], ['Sin superposición', 'Se lee de tres en tres sin solapar'], ['Casi universal', 'Es el mismo en casi todos los organismos']],
 'Los codones sinónimos suelen diferir en la tercera base.', 'Código genético')
MC('codigo', B, CON, '¿Cuáles son los codones de paro?', [
 ('UAA, UAG y UGA', 'Correcta: no codifican aminoácidos.'),
 ('AUG, UAA y UAG', 'AUG es el codón de inicio.'),
 ('UUU, UUC y UUA', 'Codifican aminoácidos.'),
 ('GUA, GUG y GAU', 'Codifican aminoácidos.')],
 '64 codones: 61 con aminoácido + 3 de paro.', 'Codones de paro')
FILL('codigo', B, CON, 'De los 64 codones, ______ codifican aminoácidos.', ['61'],
 'Los otros 3 son codones de paro.', 'Código genético')
MC('codigo', B, CON, '¿Qué codifica el codón AUG?', [
 ('Metionina, y es el codón de inicio', 'Correcta: fija el marco de lectura.'),
 ('Un codón de paro', 'Los de paro son UAA, UAG, UGA.'),
 ('Triptófano', 'El triptófano es UGG.'),
 ('Ningún aminoácido', 'Codifica metionina.')],
 'En bacterias el iniciador es fMet.', 'Codón de inicio')
MATCH('codigo', I, CON, 'Relaciona cada parte del ARNt con su función.', [
 ['Anticodón', 'Se aparea con el codón del ARNm'], ['Extremo 3′ CCA', 'Une el aminoácido'], ['Brazos D y TΨC', 'Contribuyen al plegamiento en "L"'], ['Inosina en el anticodón', 'Permite el bamboleo']],
 'El ARNt mide unos 80 nucleótidos.', 'ARNt')
MC('codigo', I, COMP, '¿Por qué se dice que las aminoacil-ARNt sintetasas son las verdaderas "traductoras" del código?', [
 ('Porque unen cada aminoácido a su ARNt correcto', 'Correcta: si se equivocan, el ribosoma pondría el aminoácido equivocado.'),
 ('Porque leen directamente el ARNm', 'El ARNm lo lee el ribosoma con los anticodones.'),
 ('Porque forman el enlace peptídico', 'Eso lo hace el ARNr (peptidil transferasa).'),
 ('Porque eliminan los intrones', 'Eso lo hace el espliceosoma.')],
 'Cada sintetasa gasta ATP para cargar su aminoácido.', 'Aminoacil-ARNt sintetasas')
TF('codigo', I, COMP, 'El codón y el anticodón se aparean de forma antiparalela.', True,
 'El codón está en el ARNm y el anticodón en el ARNt.', concepto='Codón y anticodón')
MC('codigo', I, COMP, '¿Qué distancia separa el anticodón del aminoácido en el ARNt plegado en "L"?', [
 ('≈7 nm, la distancia entre los centros de lectura y catalítico del ribosoma', 'Correcta: la forma del ARNt encaja con el ribosoma.'),
 ('≈2 nm, el diámetro del ADN', 'No corresponde.'),
 ('≈25 nm, el diámetro de un microtúbulo', 'No corresponde.'),
 ('≈80 nm, uno por cada nucleótido', 'No corresponde.')],
 'Lectura en la subunidad menor; catálisis en la mayor.', 'ARNt')
TF('codigo', B, CON, 'Se necesitan exactamente 61 ARNt distintos, uno para cada codón con aminoácido.', False,
 'Gracias al bamboleo, un ARNt puede reconocer varios codones sinónimos.',
 corr='El bamboleo en la tercera base reduce el número de ARNt necesarios.', concepto='Bamboleo')
# ---- mutaciones ----
TF('mutaciones', B, CON, 'Una mutación silenciosa cambia el codón pero no el aminoácido, gracias a la degeneración del código.', True,
 'Suele ocurrir en la tercera base.', concepto='Mutación silenciosa')
MC('mutaciones', I, RAZ, 'Se eliminan exactamente tres nucleótidos dentro de un exón. ¿Qué es lo más esperable?', [
 ('Se pierde un aminoácido pero se conserva el marco de lectura', 'Correcta: tres nucleótidos = un codón.'),
 ('Corrimiento del marco de lectura', 'Solo ocurre si no es múltiplo de tres.'),
 ('Ningún cambio en la proteína', 'Se pierde un aminoácido.'),
 ('Se forma siempre un codón de paro', 'No necesariamente.')],
 'Ejemplo: ΔF508 en la fibrosis quística.', 'Deleciones')
MC('mutaciones', I, COMP, '¿Qué ocurre con un ARNm que tiene un codón de paro prematuro?', [
 ('Suele degradarse por NMD', 'Correcta: la degradación mediada por codones sin sentido evita proteínas truncadas.'),
 ('Se traduce normalmente hasta el final', 'El ribosoma se detiene en el paro prematuro.'),
 ('Se convierte en ARNt', 'No ocurre.'),
 ('Se exporta de regreso al núcleo para repararse', 'No existe ese mecanismo.')],
 'NMD = control de calidad del ARN.', 'NMD')
MATCH('mutaciones', I, COMP, 'Relaciona cada mutación con el cambio en el ADN que la produce.', [
 ['Silenciosa', 'Sustitución que conserva el aminoácido'], ['Missense', 'Sustitución que cambia el aminoácido'], ['Nonsense', 'Sustitución que crea un codón de paro'], ['Frameshift', 'Inserción o deleción no múltiplo de 3']],
 'El efecto depende de cómo cambia la lectura del código.', 'Tipos de mutación')
MC('mutaciones', I, RAZ, 'Se inserta un nucleótido al inicio de la región codificante de un gen. ¿Qué efecto es el más probable?', [
 ('Cambia la lectura de todos los codones siguientes', 'Correcta: es un corrimiento del marco; suele aparecer pronto un paro.'),
 ('Solo cambia un aminoácido', 'Eso es una missense.'),
 ('La proteína queda igual', 'Se altera todo lo posterior.'),
 ('Se añade un aminoácido extra y nada más', 'Eso pasaría con tres nucleótidos.')],
 'Frameshift = suele anular la proteína.', 'Frameshift')
FILL('mutaciones', B, CON, 'Una mutación es un cambio ______ en la secuencia del ADN.', ['permanente'],
 'Su efecto depende de dónde ocurre y de cómo cambia la lectura.', 'Mutación')
# ---- regulación ----
MC('regulacion', B, CON, '¿Cuál es el paso de control más importante de la expresión génica?', [
 ('El inicio de la transcripción', 'Correcta: la célula puede regular cada paso, pero este es el principal.'),
 ('La terminación de la traducción', 'Se regula menos.'),
 ('La replicación del ADN', 'No es regulación de la expresión.'),
 ('La degradación de proteínas', 'Es un control posterior.')],
 'Regular al inicio evita gastar energía.', 'Regulación')
ORDER('regulacion', I, MEC, 'Ordena qué ocurre en el operón lac cuando aparece la lactosa.', [
 'La lactosa (alolactosa) se une al represor', 'El represor se suelta del operador', 'La ARN polimerasa transcribe los genes', 'Se produce un ARNm policistrónico'],
 'Sin lactosa, el represor ocupa el operador.', 'Operón lac')
MATCH('regulacion', I, COMP, 'Relaciona cada elemento de la regulación eucariota con su papel.', [
 ['Potenciador (enhancer)', 'Secuencia donde se une un activador, a veces lejos'], ['Silenciador', 'Secuencia donde se une un represor'], ['Mediador', 'Comunica al activador con la ARN polimerasa II'], ['Islas CpG metiladas', 'Silencian genes de forma estable']],
 'El ADN forma un bucle que acerca el potenciador al promotor.', 'Regulación eucariota')
MC('regulacion', I, MEC, '¿Por qué las HDAC (desacetilasas de histonas) reprimen la transcripción?', [
 ('Restauran las cargas positivas de las histonas y compactan la cromatina', 'Correcta: el ADN (negativo) se une más a las histonas.'),
 ('Degradan la ARN polimerasa II', 'No degradan la polimerasa.'),
 ('Metilan el ARNm', 'No actúan sobre el ARNm.'),
 ('Cortan los potenciadores', 'No cortan el ADN.')],
 'HAT relaja; HDAC compacta.', 'Histonas')
MATCH('regulacion', A, INT, 'Relaciona cada nivel de regulación postranscripcional con un ejemplo.', [
 ['Procesamiento', 'Splicing alternativo'], ['Transporte', 'Exportación por los poros nucleares'], ['Estabilidad', 'Vida media del ARNm'], ['Traducción', 'Inhibición por microARN']],
 'La expresión también se regula después de transcribir.', 'Regulación postranscripcional')
TF('regulacion', I, COMP, 'En los eucariotas, la cromatina de entrada favorece la transcripción, por lo que los activadores no son necesarios.', False,
 'La cromatina de entrada reprime; los activadores reclutan coactivadores que la relajan.',
 corr='La cromatina reprime de entrada; se necesitan activadores y coactivadores (HAT).', concepto='Cromatina')
# ---- procariotas vs eucariotas ----
MATCH('regulacion', I, INT, 'Relaciona cada característica con el tipo de célula.', [
 ['Genoma circular con un origen', 'Procariota'], ['Muchos orígenes y telómeros', 'Eucariota'], ['Shine-Dalgarno y fMet', 'Procariota'], ['Cap y barrido; Met', 'Eucariota']],
 'Los principios son los mismos; la organización cambia.', 'Procariotas vs eucariotas')
MATCH('regulacion', I, CON, 'Relaciona cada promotor o ribosoma con su tipo celular.', [
 ['Cajas −35 y −10', 'Procariota'], ['Caja TATA (−25), CAAT y GC', 'Eucariota'], ['Ribosoma 70S (30S + 50S)', 'Procariota'], ['Ribosoma 80S (40S + 60S)', 'Eucariota']],
 'Diferencias clave entre procariotas y eucariotas.', 'Procariotas vs eucariotas')
MC('regulacion', I, COMP, '¿Qué ventaja le da al eucariota separar la transcripción (núcleo) de la traducción (citoplasma)?', [
 ('Permite procesar y controlar el ARN antes de usarlo', 'Correcta: cap, splicing, poli-A y control de exportación.'),
 ('Hace la traducción más rápida', 'No es la ventaja principal.'),
 ('Evita tener que usar ribosomas', 'Siempre se usan ribosomas.'),
 ('Elimina la necesidad de promotores', 'Los promotores siguen siendo necesarios.')],
 'En la bacteria, transcripción y traducción son simultáneas.', 'Procariotas vs eucariotas')
# ---- control de calidad ----
MATCH('mutaciones', I, INT, 'Relaciona cada etapa con su mecanismo de control de calidad.', [
 ['Replicación', 'Corrección 3′→5′ y reparación de errores de apareamiento'], ['ARN', 'Degradación mediada por codones sin sentido (NMD)'], ['Traducción', 'Corrección de las aminoacil-ARNt sintetasas'], ['Proteína', 'Chaperonas, ubiquitina y proteasoma']],
 'La célula revisa su trabajo en cada etapa.', 'Control de calidad')
FILL('mutaciones', I, CON, 'Gracias a la corrección y a la reparación de errores, la replicación deja alrededor de un error por cada 10⁹–10¹⁰ ______ copiados.', ['nucleotidos', 'nucleótidos'],
 'Corrección 3′→5′ + mismatch repair.', 'Fidelidad de la replicación')
# ---- después del ribosoma ----
ORDER('traduccion', I, MEC, 'Ordena el destino de una proteína con péptido señal.', [
 'El péptido señal sale del ribosoma', 'La SRP lo reconoce y pausa la traducción', 'El complejo llega al receptor de SRP en el RER', 'La cadena entra por el translocón Sec61'],
 'Después sigue la vía secretora hacia el Golgi.', 'Péptido señal')
MATCH('traduccion', I, CON, 'Relaciona cada proceso posterior a la traducción con su función.', [
 ['Chaperonas (Hsp70, Hsp60)', 'Ayudan al plegamiento'], ['Fosforilación', 'Ajusta la actividad'], ['Glucosilación', 'Añade azúcares'], ['Ubiquitinación', 'Marca para degradación en el proteasoma']],
 'Las modificaciones postraduccionales ajustan función, localización y vida media.', 'Modificaciones postraduccionales')
MC('traduccion', I, COMP, '¿Por qué se dice que el ribosoma es una ribozima?', [
 ('El ARNr de la subunidad mayor cataliza el enlace peptídico', 'Correcta: 28S en eucariotas, 23S en bacterias.'),
 ('Sus proteínas leen el ARNm', 'La catálisis la hace el ARN, no las proteínas.'),
 ('Porque está hecho solo de proteína', 'Está hecho de ARNr y proteínas.'),
 ('Porque degrada el ARNm al terminar', 'No es la razón.')],
 'Peptidil transferasa = ARNr.', 'Ribozima')
# ---- importancia médica (mecanismo) ----
MC('clinica', I, COMP, '¿En qué se basa la selectividad de los antibióticos que bloquean el dogma?', [
 ('En diferencias moleculares entre bacterias y humanos', 'Correcta: ribosoma 70S vs 80S, ARN polimerasa con σ vs ARN polimerasa II.'),
 ('En que las bacterias no tienen ADN', 'Las bacterias sí tienen ADN.'),
 ('En que los humanos no traducen proteínas', 'Sí traducen.'),
 ('En que los antibióticos solo entran al núcleo', 'Las bacterias no tienen núcleo.')],
 'Cuando la selectividad no es perfecta aparecen efectos adversos.', 'Antibióticos')
MATCH('clinica', I, CON, 'Relaciona cada antibiótico con su efecto sobre el ribosoma bacteriano.', [
 ['Tetraciclinas', 'Bloquean el sitio A (30S)'], ['Aminoglucósidos', 'Alteran la lectura de codones (30S)'], ['Cloranfenicol', 'Inhibe la peptidil transferasa (50S)'], ['Macrólidos', 'Bloquean la translocación (50S)']],
 'Atacan al ribosoma 70S.', 'Antibióticos')
MC('clinica', I, COMP, '¿Por qué algunos antibióticos que atacan el ribosoma bacteriano pueden afectar a células humanas?', [
 ('Porque los ribosomas mitocondriales se parecen a los bacterianos', 'Correcta: es una huella del origen endosimbiótico.'),
 ('Porque los ribosomas citosólicos humanos son 70S', 'Son 80S.'),
 ('Porque las bacterias viven dentro del núcleo', 'No es así.'),
 ('Porque el ARNm humano no tiene cap', 'Sí tiene cap.')],
 'Integración con el tema de mitocondria.', 'Antibióticos y mitocondria')
MATCH('clinica', B, CON, 'Según el resumen del profesor, relaciona cada alteración con su consecuencia.', [
 ['Mutaciones en factores de transcripción', 'Cáncer'], ['Alteraciones del splicing', 'β-talasemia'], ['Defectos en reparación / transcripción', 'Xeroderma pigmentoso'], ['Desregulación epigenética', 'Tumores']],
 'Importancia médica de la transcripción.', 'Importancia médica')
