"""Banco: Regulación de la expresión génica (basado en los tres documentos del tema)."""
from qhelp import *
tema('reg')

# ================= CONCEPTOS =================
MC('conceptos', B, CON, '¿Qué es la regulación de la expresión génica?', [
 ('El control de qué genes se expresan, cuándo y cuánto', 'Correcta: permite o no la transcripción y traducción de determinados genes en cada momento.'),
 ('La copia del ADN antes de la división celular', 'Eso es la replicación.'),
 ('El cambio permanente de la secuencia del ADN', 'Eso es una mutación.'),
 ('La unión de aminoácidos en el ribosoma', 'Eso es la traducción.')],
 'Ningún gen se necesita siempre en la misma cantidad: la célula ajusta su expresión.', 'Regulación')
MC('conceptos', B, COMP, 'Si todas las células somáticas tienen el mismo ADN, ¿qué determina el fenotipo de cada tipo celular?', [
 ('Qué genes se expresan y cuáles están silenciados', 'Correcta: es la expresión selectiva de genes.'),
 ('El número de cromosomas de cada célula', 'Todas las somáticas tienen el mismo número.'),
 ('La cantidad de ADN de cada célula', 'Es la misma.'),
 ('Las mutaciones propias de cada tejido', 'El fenotipo normal no depende de mutaciones.')],
 'Un mismo ADN se usa de forma distinta en cada tipo celular.', 'Expresión selectiva')
MC('conceptos', B, CON, '¿Cuál es el paso de la expresión génica que se regula con más frecuencia?', [
 ('El inicio de la transcripción', 'Correcta: es el punto de control más importante en procariotas y eucariotas.'),
 ('La terminación de la traducción', 'Se regula poco.'),
 ('La replicación del ADN', 'No es el paso más regulado de la expresión.'),
 ('La degradación de proteínas', 'Es un control posterior.')],
 'Regular al inicio evita gastar energía en productos innecesarios.', 'Regulación')
MATCH('conceptos', B, CON, 'Relaciona cada tipo de gen con su característica.', [
 ['Gen constitutivo', 'Se expresa siempre ("guarda la casa")'], ['Gen adaptativo', 'Se expresa solo en ciertas condiciones ambientales']],
 'Constitutivo no significa "no regulado".', 'Constitutivos y adaptativos')
TF('conceptos', I, COMP, 'Los genes constitutivos no están sometidos a ningún tipo de regulación.', False,
 'Están regulados de forma que se expresan siempre.',
 corr='Los genes constitutivos sí están regulados; su regulación los mantiene encendidos.', concepto='Genes constitutivos')
MATCH('conceptos', B, CON, 'Relaciona cada sistema con sus características.', [
 ['Sistema inducible', 'El sustrato (inductor) enciende la síntesis; vías catabólicas'], ['Sistema represible', 'El producto final (correpresor) apaga la síntesis; vías anabólicas']],
 'Inducible: apagado por defecto. Represible: encendido por defecto.', 'Inducible vs represible')
MC('conceptos', B, CON, '¿Cómo se llama la molécula que impide la expresión de un operón represible?', [
 ('Correpresor', 'Correcta: suele ser el producto final de la vía (por ejemplo, el triptófano).'),
 ('Inductor', 'El inductor enciende los sistemas inducibles.'),
 ('Operador', 'Es una secuencia de ADN, no una molécula efectora.'),
 ('Promotor', 'Es la secuencia donde se une la ARN polimerasa.')],
 'Correpresor + represor = complejo que se une al operador.', 'Correpresor')
MC('conceptos', I, COMP, '¿Por qué los sistemas inducibles corresponden a vías catabólicas?', [
 ('Conviene fabricar enzimas de degradación solo si el sustrato está presente', 'Correcta: el sustrato actúa como señal (inductor).'),
 ('Porque las vías catabólicas no necesitan enzimas', 'Sí necesitan enzimas.'),
 ('Porque el producto final siempre es tóxico', 'No es la razón.'),
 ('Porque solo ocurren en eucariotas', 'Ocurren en bacterias, como el operón lac.')],
 'Principio de economía celular.', 'Sistemas inducibles')
MATCH('conceptos', B, CON, 'Relaciona cada tipo de control con lo que hace la proteína reguladora.', [
 ['Control negativo', 'La proteína reguladora es un represor'], ['Control positivo', 'La proteína reguladora es un activador']],
 'Negativo: se expresa salvo que el represor lo impida. Positivo: solo se expresa si el activador lo estimula.', 'Control positivo y negativo')
MATCH('conceptos', I, COMP, 'Relaciona cada tipo de sistema con su ejemplo.', [
 ['Inducible, control negativo', 'Operón lactosa y galactosa'], ['Inducible, control positivo', 'Operón arabinosa y maltosa'], ['Represible, control negativo', 'Operón triptófano e histidina'], ['Represible, control positivo', 'No se han descrito']],
 'El operón lac está además bajo control positivo (CAP).', 'Tipos de sistemas')
MC('conceptos', I, CON, 'En E. coli, ¿cuánta β-galactosidasa hay en presencia de galactósido comparado con su ausencia?', [
 ('Hasta 10 000 unidades frente a 1–10 unidades por mg', 'Correcta: es el ejemplo de inducción de los apuntes.'),
 ('La misma cantidad en ambos casos', 'Es un sistema inducible: cambia muchísimo.'),
 ('El doble', 'El aumento es de miles de veces.'),
 ('Ninguna en presencia de galactósido', 'Es al revés.')],
 'Inducción: el sustrato dispara la síntesis de la enzima.', 'Inducción')
MC('conceptos', I, COMP, '¿Cuántos genes tiene aproximadamente un organismo procariota según el documento?', [
 ('Unos 4000, de los cuales solo se expresa una pequeña parte a la vez', 'Correcta: depende del ambiente en que crece la bacteria.'),
 ('Unos 20 000, todos expresados', 'Esa cifra se acerca a los genes humanos.'),
 ('Unos 400, todos constitutivos', 'No corresponde.'),
 ('Unos 4 millones', 'No corresponde.')],
 'Las bacterias usan su dotación genética según su entorno.', 'Procariotas')
TF('conceptos', B, CON, 'Un mismo operón puede estar bajo control negativo y positivo a la vez.', True,
 'El operón lac: represor (negativo) y CAP-AMPc (positivo).', concepto='Control positivo y negativo')

# ================= OPERÓN Y LAC =================
MATCH('lac', B, CON, 'Relaciona cada elemento del operón con su definición.', [
 ['Promotor', 'Secuencia donde se une la ARN polimerasa'], ['Operador', 'Secuencia donde se une la proteína reguladora'], ['Genes estructurales', 'Codifican los polipéptidos regulados'], ['Gen regulador', 'Codifica la proteína reguladora; tiene su propio promotor']],
 'Promotor + operador + genes estructurales = operón.', 'Elementos del operón')
TF('lac', B, CON, 'El gen regulador forma parte del operón.', False,
 'Está cerca, pero no forma parte del operón: tiene su propio promotor.',
 corr='El operón incluye promotor, operador y genes estructurales; el gen regulador está fuera.', concepto='Gen regulador')
MC('lac', B, CON, '¿Dónde se ubica el operador?', [
 ('Entre el promotor y los genes estructurales', 'Correcta: a menudo se solapa con el promotor.'),
 ('Después del último gen estructural', 'Ahí estaría el terminador.'),
 ('Dentro del gen regulador', 'El gen regulador es aparte.'),
 ('En otro cromosoma', 'Está junto a los genes que controla.')],
 'Por eso el represor unido al operador impide el paso de la ARN polimerasa.', 'Operador')
FILL('lac', B, CON, 'Los genes estructurales de un operón se transcriben juntos en un solo ARNm llamado ______.', ['policistronico', 'policistrónico', 'poligenico', 'poligénico', 'multigenico', 'multigénico'],
 'En eucariotas los ARNm suelen ser monocistrónicos.', 'ARNm policistrónico')
MC('lac', B, CON, '¿Quiénes propusieron el modelo del operón?', [
 ('François Jacob y Jacques Monod', 'Correcta: Premio Nobel en 1965.'),
 ('Watson y Crick', 'Describieron la doble hélice.'),
 ('Lederberg y Tatum', 'Lederberg aisló los primeros mutantes estructurales del lac, pero no propuso el modelo.'),
 ('Charles Yanofsky', 'Estudió la atenuación del operón trp.')],
 'Estudiaron el sistema de la lactosa en E. coli.', 'Jacob y Monod')
MATCH('lac', B, CON, 'Relaciona cada gen del operón lac con su enzima.', [
 ['Gen z', 'β-galactosidasa'], ['Gen y', 'Galactósido permeasa'], ['Gen a', 'Tiogalactósido transacetilasa']],
 'Orden en el cromosoma: z-y-a.', 'Operón lac')
MC('lac', B, CON, '¿Qué hace la β-galactosidasa?', [
 ('Hidroliza la lactosa en glucosa y galactosa', 'Correcta: además forma la alolactosa.'),
 ('Transporta la lactosa al interior', 'Eso lo hace la permeasa.'),
 ('Transfiere acetilos a tiogalactósidos', 'Eso lo hace la transacetilasa.'),
 ('Se une al operador', 'Eso lo hace el represor.')],
 'Gen z → β-galactosidasa.', 'β-galactosidasa')
MC('lac', I, CON, '¿Cuál es el verdadero inductor del operón lac?', [
 ('La alolactosa', 'Correcta: la β-galactosidasa la forma a partir de la lactosa.'),
 ('La glucosa', 'La glucosa reprime el operón por represión catabólica.'),
 ('El AMPc', 'El AMPc activa a CAP, no al represor.'),
 ('La galactosa', 'No es el inductor del operón lac.')],
 'En el laboratorio se usa el IPTG, un análogo sintético.', 'Inductor')
TF('lac', I, CON, 'El IPTG necesita a la galactósido permeasa para entrar a la bacteria.', False,
 'El IPTG no necesita la permeasa; por eso es útil como inductor experimental.',
 corr='El IPTG entra sin la permeasa.', concepto='IPTG')
ORDER('lac', B, MEC, 'Ordena lo que ocurre cuando se añade lactosa a una bacteria sin glucosa.', [
 'La lactosa entra y se forma alolactosa', 'La alolactosa se une al represor', 'El represor cambia de conformación y se suelta del operador', 'La ARN polimerasa transcribe z, y, a', 'Se produce un ARNm policistrónico'],
 'Inducción del operón lac.', 'Inducción del operón lac')
MC('lac', I, COMP, 'Sin lactosa, ¿por qué no se transcriben los genes del operón lac?', [
 ('El represor unido al operador impide el paso de la ARN polimerasa', 'Correcta: control negativo.'),
 ('El promotor está metilado', 'Esa forma de regulación no es la del operón lac.'),
 ('No existe ARN polimerasa en la bacteria', 'Sí existe.'),
 ('La transacetilasa degrada el ARNm', 'No es su función.')],
 'Represor del gen i unido al operador = apagado.', 'Operón lac')
MC('lac', I, CON, '¿Qué estructura tiene la proteína represora del operón lac?', [
 ('Un tetrámero de cuatro cadenas idénticas', 'Correcta: cada cadena de unos 38 000 de peso molecular.'),
 ('Un monómero pequeño', 'No es así.'),
 ('Un dímero unido a AMPc', 'Esa es CAP.'),
 ('Una molécula de ARN', 'Es una proteína.')],
 'La estructura tetramérica explica la dominancia de iˢ e i⁻ᵈ.', 'Represor lac')
MC('lac', I, MEC, '¿Qué hace el complejo CAP-AMPc?', [
 ('Se une cerca del promotor y estimula la unión de la ARN polimerasa', 'Correcta: es el control positivo del operón lac.'),
 ('Se une al operador y bloquea la transcripción', 'Eso lo hace el represor.'),
 ('Degrada la glucosa', 'No es su función.'),
 ('Convierte lactosa en alolactosa', 'Eso lo hace la β-galactosidasa.')],
 'CAP es un dímero activo solo con AMPc.', 'CAP')
MC('lac', I, COMP, '¿Qué pasa con el AMPc cuando E. coli crece con glucosa?', [
 ('Está bajo, y CAP no activa los operones de otros azúcares', 'Correcta: represión catabólica.'),
 ('Está alto y activa al operón lac', 'Ocurre cuando falta la glucosa.'),
 ('Se une al represor', 'El AMPc se une a CAP.'),
 ('Se convierte en lactosa', 'No ocurre.')],
 'A medida que se agota la glucosa, sube el AMPc.', 'Represión catabólica')
MATCH('lac', A, INT, 'Relaciona cada condición del medio con la transcripción del operón lac.', [
 ['Glucosa sin lactosa', 'No hay transcripción'], ['Glucosa con lactosa', 'Muy baja'], ['Sin glucosa ni lactosa', 'No hay (represor unido)'], ['Sin glucosa, con lactosa', 'Alta']],
 'Se necesitan lactosa (sin represor) y falta de glucosa (CAP-AMPc).', 'Doble control lac')
MC('lac', A, RAZ, 'Un mutante de la adenilato ciclasa crece sin glucosa y con lactosa. ¿Qué esperas del operón lac?', [
 ('Muy baja expresión, porque no hay AMPc para activar a CAP', 'Correcta: sin AMPc el control positivo falla.'),
 ('Expresión máxima, porque hay lactosa', 'Falta el control positivo.'),
 ('Expresión constitutiva aun sin lactosa', 'No afecta al represor.'),
 ('Expresión solo si se añade glucosa', 'La glucosa la bajaría aún más.')],
 'Sin AMPc o sin CAP, el sistema permanece apagado.', 'Adenilato ciclasa')
FILL('lac', I, CON, 'Cuando E. coli prefiere la glucosa y bloquea los operones de otros azúcares, el fenómeno se llama represión ______.', ['catabolica', 'catabólica', 'por catabolitos'],
 'Afecta a lac, arabinosa, maltosa, galactosa…', 'Represión catabólica')
TF('lac', I, COMP, 'La represión catabólica es un sistema general de control positivo que afecta a varios operones de azúcares.', True,
 'Lac, arabinosa, maltosa y galactosa necesitan AMPc alto.', concepto='Represión catabólica')

# ================= MUTANTES =================
MC('mutantes', B, CON, '¿Qué es un mutante constitutivo del operón lac?', [
 ('Uno que expresa los genes haya o no inductor', 'Correcta: ejemplo, i⁻ y Oᶜ.'),
 ('Uno que nunca expresa los genes', 'Ese sería, por ejemplo, iˢ o un mutante del promotor.'),
 ('Uno que solo expresa con glucosa', 'No es la definición.'),
 ('Uno que pierde el gen z', 'Eso es un mutante estructural.')],
 'Constitutivo = siempre encendido.', 'Mutantes constitutivos')
MATCH('mutantes', I, COMP, 'Relaciona cada mutante con su efecto.', [
 ['i⁻', 'Represor inactivo: constitutivo'], ['Oᶜ', 'El represor no reconoce el operador: constitutivo'], ['iˢ', 'El represor no reconoce al inductor: siempre reprimido'], ['Oᴼ', 'Promotor no reconocido: no hay transcripción']],
 'Recuerda que Oᴼ ("operador cero") afecta en realidad al promotor.', 'Mutantes lac')
MC('mutantes', I, COMP, '¿Qué es un diploide parcial (merodiploide)?', [
 ('Una bacteria con parte de sus genes en dos copias', 'Correcta: por ejemplo, mediante un plásmido F′ con el operón lac.'),
 ('Una bacteria con dos cromosomas completos', 'Solo una parte está duplicada.'),
 ('Una célula eucariota haploide', 'No es la definición.'),
 ('Una bacteria sin plásmidos', 'El F′ es el que aporta la segunda copia.')],
 'Permite estudiar dominancia y cis/trans.', 'Diploide parcial')
MC('mutantes', I, RAZ, 'En el diploide i⁺ P O z⁺y⁺a⁺ / i⁺ P Oᶜ z⁺y⁺a⁺, ¿qué ocurre sin lactosa?', [
 ('Se expresan los genes de la molécula con Oᶜ', 'Correcta: Oᶜ es dominante en cis.'),
 ('No se expresa nada', 'La molécula con Oᶜ no puede reprimirse.'),
 ('Solo se expresan los genes de la molécula con O normal', 'Es al revés.'),
 ('Se expresa el gen regulador del plásmido solamente', 'No es lo que se mide.')],
 'El operador actúa solo sobre su propia molécula.', 'Cis')
MC('mutantes', I, RAZ, 'En el diploide i⁺ P O z⁺y⁺a⁺ / i⁻ P O z⁺y⁺a⁺, ¿qué ocurre sin lactosa?', [
 ('No hay expresión: el represor normal actúa en ambas moléculas', 'Correcta: i⁺ es dominante en trans.'),
 ('Se expresa la molécula con i⁻', 'El represor del i⁺ la reprime también.'),
 ('Se expresan ambas', 'Hay represor funcional difusible.'),
 ('Se degrada el plásmido', 'No ocurre.')],
 'El gen regulador produce una proteína difusible.', 'Trans')
MATCH('mutantes', B, CON, 'Relaciona cada elemento con su modo de acción.', [
 ['Operador', 'Actúa en cis (secuencia no difusible)'], ['Gen regulador', 'Actúa en trans (proteína difusible)']],
 'Base del análisis de diploides parciales.', 'Cis y trans')
MC('mutantes', A, RAZ, 'En un diploide i⁺/i⁻ᵈ, ¿qué fracción de tetrámeros del represor es totalmente normal?', [
 ('1/16', 'Correcta: (1/2)⁴; los otros 15/16 llevan al menos una cadena mutante y no se unen al operador.'),
 ('1/2', 'Ignora que el represor es un tetrámero.'),
 ('1/4', 'Ignora que son cuatro cadenas.'),
 ('15/16', 'Esa es la fracción con al menos una cadena mutante.')],
 'Por eso i⁻ᵈ es dominante sobre i⁺.', 'Mutante i-d')
MC('mutantes', I, COMP, '¿Por qué el mutante iˢ es dominante sobre i⁺?', [
 ('Su represor se queda unido a los dos operadores y no se suelta con el inductor', 'Correcta: bloquea ambas copias.'),
 ('Porque produce más ARN polimerasa', 'No es la razón.'),
 ('Porque destruye al represor normal', 'No lo destruye.'),
 ('Porque está en el operador', 'iˢ afecta al gen del represor.')],
 'iˢ = superrepresor (zona de unión al inductor alterada).', 'Mutante iS')
FILL('mutantes', I, CON, 'Según los apuntes, el operador del operón lac mide entre 17 y ______ nucleótidos.', ['25'],
 'Está justo antes del gen z y después del promotor.', 'Operador')
MC('mutantes', B, CON, '¿Qué plásmido se usó para obtener diploides parciales estables del operón lac?', [
 ('El factor F′ con los genes del operón', 'Correcta: lleva parte del cromosoma bacteriano.'),
 ('El plásmido Ti', 'Es de bacterias de plantas.'),
 ('Un fago λ integrado', 'No es el método descrito.'),
 ('Un ARNm policistrónico', 'No es un plásmido.')],
 'Los diploides obtenidos solo por conjugación F⁺ × F⁻ eran inestables.', 'Plásmido F prima')
MC('mutantes', A, RAZ, 'Cepa A⁺ B⁺ C⁻ / F′ A⁻ B⁻ C⁺ (A = represor, B = operador, C = enzima). ¿Hay enzima sin inductor?', [
 ('Sí: el C⁺ está en cis con el operador mutado', 'Correcta: síntesis constitutiva.'),
 ('No: el represor normal del cromosoma la reprime', 'No puede unirse al operador mutado.'),
 ('No: el gen C del cromosoma está mutado', 'El C⁺ del plásmido sí funciona.'),
 ('Solo si se añade glucosa', 'No depende de la glucosa.')],
 'Ejercicio resuelto del documento (cepa 6).', 'Ejercicio merodiploides')
MC('mutantes', A, RAZ, 'Cepa A⁻ B⁺ C⁺ / F′ A⁺ B⁻ C⁻. ¿Cómo se comporta?', [
 ('Enzima solo con inductor: el represor del F′ actúa en trans', 'Correcta: la mutación A⁻ es recesiva.'),
 ('Enzima siempre', 'El cromosoma tiene operador normal y recibe represor del F′.'),
 ('Nunca hay enzima', 'El cromosoma tiene C⁺.'),
 ('Enzima solo sin inductor', 'Es al revés.')],
 'Ejercicio resuelto del documento (cepa 5).', 'Ejercicio merodiploides')

# ================= TRP Y ATENUACIÓN =================
MC('trp', B, CON, '¿Qué tipo de sistema es el operón triptófano?', [
 ('Represible, con control negativo', 'Correcta: el triptófano es el correpresor.'),
 ('Inducible, con control negativo', 'Ese es el operón lac.'),
 ('Inducible, con control positivo', 'Ese es el arabinosa o maltosa.'),
 ('Constitutivo sin regulación', 'Sí se regula.')],
 'Vía anabólica: síntesis de triptófano.', 'Operón trp')
FILL('trp', B, CON, 'El operón triptófano tiene ______ genes estructurales.', ['5', 'cinco'],
 'trpE, trpD, trpC, trpB, trpA.', 'Operón trp')
ORDER('trp', I, CON, 'Ordena los genes estructurales del operón trp tal como están en el cromosoma.', [
 'trpE', 'trpD', 'trpC', 'trpB', 'trpA'],
 'Actúan en la ruta en el mismo orden en que están en el cromosoma.', 'Operón trp')
MC('trp', I, MEC, '¿Cuándo se une el represor TrpR al operador?', [
 ('Solo cuando tiene unido triptófano', 'Correcta: el triptófano le cambia la conformación.'),
 ('Solo cuando no hay triptófano', 'Es al revés.'),
 ('Siempre, sin importar el triptófano', 'Entonces no habría regulación.'),
 ('Solo cuando hay lactosa', 'La lactosa regula el operón lac.')],
 'Diferencia esencial con el lac.', 'Represor trp')
MC('trp', I, COMP, '¿Cuál es la diferencia esencial entre el represor lac y el represor trp?', [
 ('El lac se une al operador sin su efector; el trp solo con su efector', 'Correcta.'),
 ('El lac es una proteína y el trp un ARN', 'Ambos son proteínas.'),
 ('El trp actúa en trans y el lac en cis', 'Ambos son proteínas difusibles (trans).'),
 ('El lac usa AMPc y el trp usa GTP', 'No es la diferencia.')],
 'Inducible vs represible.', 'Lac vs trp')
FILL('trp', B, CON, 'El gen regulador del operón triptófano se llama ______.', ['trpR'],
 'Está en otra región del cromosoma, no muy lejos del operón.', 'trpR')
MC('trp', B, CON, '¿Quién descubrió la atenuación del operón trp?', [
 ('Charles Yanofsky', 'Correcta: estudiando mutantes trpR⁻.'),
 ('Jacques Monod', 'Trabajó en el operón lac.'),
 ('Peter Mitchell', 'Propuso la teoría quimiosmótica.'),
 ('Francis Crick', 'Formuló el dogma central.')],
 'Observó un aumento de ~10 veces del ARNm al quitar el triptófano aun sin represor.', 'Yanofsky')
MC('trp', I, CON, '¿Dónde está el atenuador?', [
 ('En la región líder, entre el operador y el gen trpE', 'Correcta: unas 160 bases que no se traducen a la proteína estructural.'),
 ('Después de trpA', 'Está antes de los genes estructurales.'),
 ('En el gen trpR', 'El gen regulador está en otra región.'),
 ('En el promotor del operón lac', 'Es del operón trp.')],
 'Una deleción de ~30 bases (130–160) eliminaba la atenuación.', 'Atenuador')
MC('trp', I, CON, '¿Qué característica tiene el péptido líder del operón trp?', [
 ('14 aminoácidos con dos triptófanos seguidos', 'Correcta: los codones trp son el sensor.'),
 ('Ningún triptófano', 'Si no tuviera, no sentiría el nivel de triptófano.'),
 ('Es la enzima trpE completa', 'Es un péptido pequeño, no la enzima.'),
 ('Se une al operador', 'No se une al ADN.')],
 'El ribosoma se detiene o no en esos codones.', 'Péptido líder')
MATCH('trp', I, MEC, 'Relaciona cada nivel de triptófano con la horquilla que se forma.', [
 ['Mucho triptófano', 'Horquilla 3:4 (terminador)'], ['Poco triptófano', 'Horquilla 2:3 (antiterminador)']],
 'Con 3:4 la transcripción termina antes de los genes estructurales.', 'Atenuación')
ORDER('trp', A, MEC, 'Ordena lo que ocurre en la atenuación cuando hay mucho triptófano.', [
 'Hay ARNt cargados con triptófano', 'El ribosoma traduce la región 1 sin detenerse', 'El ribosoma queda sobre la región 2', 'La región 3 se aparea con la 4', 'Se forma el terminador y la ARN polimerasa se detiene'],
 'Terminación independiente de Rho (horquilla + poli-U).', 'Atenuación')
MC('trp', A, RAZ, '¿Por qué la atenuación no podría ocurrir en una célula eucariota?', [
 ('Porque requiere que traducción y transcripción estén acopladas', 'Correcta: en eucariotas ocurren en compartimentos distintos.'),
 ('Porque los eucariotas no tienen triptófano', 'Sí lo tienen.'),
 ('Porque los eucariotas no tienen ribosomas', 'Sí los tienen.'),
 ('Porque los ARNm eucariotas no forman horquillas', 'Pueden formarlas; el problema es el acoplamiento.')],
 'Integración entre regulación y organización celular.', 'Atenuación')
TF('trp', I, COMP, 'Con mucho triptófano, el atenuador permite que todos los ARNm del operón se completen.', False,
 'Con mucho triptófano solo 1 de cada 10 ARNm llega al final; el atenuador funciona como terminador.',
 corr='Sin triptófano el atenuador se desactiva y todos los ARNm se completan.', concepto='Atenuación')
MC('trp', I, COMP, '¿Qué otros operones usan atenuación según los documentos?', [
 ('His, phe y leu (síntesis de aminoácidos)', 'Correcta: su péptido líder es rico en el aminoácido que controlan.'),
 ('Lac, arabinosa y maltosa', 'Son operones catabólicos de azúcares.'),
 ('Los genes GAL de levadura', 'Son eucariotas.'),
 ('Los genes tardíos del fago T7', 'No usan atenuación.')],
 'La atenuación es típica de operones biosintéticos de aminoácidos.', 'Atenuación')
MATCH('trp', I, CON, 'Relaciona cada tipo de interacción entre operones con su definición.', [
 ['Dependientes', 'La presencia de uno es necesaria para la del otro'], ['Excluyentes', 'La presencia de uno impide la del otro'], ['Alternativos', 'Uno no depende del otro']],
 'Se explica porque el producto de una enzima puede inducir o correprimir otro sistema.', 'Interacción entre operones')

# ================= FAGOS =================
MATCH('fagos', B, CON, 'Relaciona cada fago con su estrategia de regulación.', [
 ['T7', 'Fabrica una ARN polimerasa nueva'], ['SP01', 'Fabrica subunidades nuevas para la polimerasa bacteriana'], ['λ (lambda)', 'Produce activadores y represores de sus operones']],
 'Todas son regulación temporal o en cascada.', 'Fagos')
MC('fagos', B, CON, '¿Qué significa "regulación en cascada"?', [
 ('Los genes se expresan en grupos ordenados y cada grupo enciende al siguiente', 'Correcta: tempranos → medios → tardíos.'),
 ('Todos los genes se expresan a la vez', 'Es lo contrario.'),
 ('Los genes se expresan al azar', 'Hay un orden fijo.'),
 ('Solo se expresan los genes bacterianos', 'Se expresan los del fago.')],
 'Regulación temporal.', 'Regulación en cascada')
MC('fagos', I, CON, '¿Qué codifica el gen 1 del fago T7?', [
 ('Una ARN polimerasa viral', 'Correcta: transcribe los genes de clase II y III.'),
 ('Una lisozima', 'Es el gen 3.5.'),
 ('Una ADN ligasa', 'Es el gen 1.3.'),
 ('Una metilasa', 'Es el gen 0.3.')],
 'El gen 1 es un gen de clase I (temprano).', 'Fago T7')
MC('fagos', I, MEC, '¿Cómo apaga T7 la expresión de los genes bacterianos?', [
 ('La cinasa del gen 0.7 fosforila e inactiva la ARN polimerasa bacteriana', 'Correcta.'),
 ('Degrada el promotor de cada gen bacteriano', 'No es el mecanismo descrito.'),
 ('Produce un represor tipo cI', 'Eso es del fago λ.'),
 ('Usa el AMPc', 'No interviene.')],
 'Después solo funciona la polimerasa de T7.', 'Fago T7')
MATCH('fagos', I, CON, 'Relaciona cada clase de genes de T7 con sus funciones.', [
 ['Clase I (tempranos)', 'Metilasa, cinasa, ARN polimerasa, ligasa'], ['Clase II (medios)', 'Replicación del ADN viral, degradación del ADN bacteriano, lisozima'], ['Clase III (tardíos)', 'Cabeza, cola, maduración del ADN y ensamblaje']],
 'Los genes están en el cromosoma en el orden en que se expresan.', 'Fago T7')
MC('fagos', I, MEC, 'En el fago SP01, ¿qué hace el polipéptido 28?', [
 ('Se une a la ARN polimerasa bacteriana y le hace reconocer los promotores de los genes medios', 'Correcta: y deja de reconocer los bacterianos.'),
 ('Es una ARN polimerasa nueva', 'Eso es la estrategia de T7.'),
 ('Corta al represor cI', 'Eso lo hace RecA en λ.'),
 ('Reconoce los promotores tardíos', 'Eso lo hacen los polipéptidos 33 y 34.')],
 'SP01 infecta a Bacillus subtilis.', 'Fago SP01')
MATCH('fagos', I, COMP, 'Relaciona cada respuesta del fago λ con lo que ocurre.', [
 ['Respuesta lítica', 'El ADN se replica y la bacteria se lisa'], ['Respuesta lisogénica', 'El ADN se integra como profago'], ['Inducción', 'El profago se suelta, se replica y lisa la bacteria']],
 'λ: ADN lineal de doble hélice con extremos cohesivos.', 'Fago lambda')
MC('fagos', I, MEC, '¿Qué función tiene la proteína N del fago λ?', [
 ('Es un antiterminador: permite transcribir los genes temprano-retrasados', 'Correcta: cII, O, P, Q y cIII.'),
 ('Es el represor que establece la lisogenia', 'Ese es cI.'),
 ('Es la integrasa', 'Esa es int.'),
 ('Lisa la bacteria', 'Eso lo hacen S y R.')],
 'N es inestable: el ciclo lítico requiere su expresión continua.', 'Proteína N')
MATCH('fagos', I, CON, 'Relaciona cada gen o proteína de λ con su función.', [
 ['cI', 'Represor λ: mantiene la lisogenia'], ['cro', 'Antirrepresor: necesario para la lisis'], ['Q', 'Activa los genes tardíos'], ['int', 'Integra el ADN del fago'], ['cIII', 'Protege a cII de la proteólisis']],
 'O y P replican el ADN; S y R lisan la bacteria.', 'Genes de lambda')
MC('fagos', A, MEC, 'En la lisogenia, ¿qué sitios del operador ocupa el represor cI?', [
 ('OR1 y OR2, dejando libre OR3', 'Correcta: así se transcribe cI desde PRM y no cro.'),
 ('Solo OR3', 'Eso hace Cro a baja concentración.'),
 ('Ninguno', 'Entonces no habría lisogenia.'),
 ('OR3 y PRM', 'PRM es un promotor, no un sitio del operador.')],
 'Autorregulación del represor.', 'Lisogenia')
MC('fagos', A, MEC, '¿Cuál es el orden de afinidad de Cro por los sitios del operador derecho?', [
 ('OR3 > OR2 = OR1', 'Correcta: a baja concentración ocupa OR3 y bloquea PRM.'),
 ('OR1 > OR2 > OR3', 'Esa no es la afinidad de Cro.'),
 ('Igual por los tres', 'No es igual.'),
 ('Solo se une a OL', 'También se une a OR.')],
 'A alta concentración bloquea OR2 y OR1 y frena su propia transcripción.', 'Cro')
ORDER('fagos', A, MEC, 'Ordena la inducción de un profago λ.', [
 'Daño del ADN bacteriano', 'Se activa RecA (respuesta SOS)', 'RecA inactiva al represor cI', 'Se liberan OR1 y OR2', 'Se transcribe cro y empieza el ciclo lítico'],
 'Cambio de lisogenia a lisis.', 'Inducción del profago')
MATCH('fagos', I, CON, 'Relaciona cada promotor de λ con su función.', [
 ['PRE', 'Establecimiento del represor (activado por cII y cIII)'], ['PRM', 'Mantenimiento del represor (autorregulación)'], ['PR', 'Transcripción de cro hacia la derecha'], ['PINT', 'Genes de integración']],
 'PRM se solapa con OR3.', 'Promotores de lambda')
TF('fagos', I, COMP, 'La integración del fago λ requiere las proteínas int y xis, y la escisión solo int.', False,
 'Es al revés: la integración requiere solo int; la escisión requiere int y xis.',
 corr='Integración: int. Escisión: int + xis.', concepto='Integración y escisión')
FILL('fagos', I, CON, 'La regulación en la que una proteína controla su propia expresión, como el represor λ desde PRM, se llama ______.', ['autorregulacion', 'autorregulación', 'regulacion autogena', 'regulación autógena'],
 'El represor cI activa su propia transcripción.', 'Autorregulación')

# ================= CROMATINA Y METILACIÓN =================
MATCH('cromatina', B, CON, 'Relaciona cada nivel de regulación eucariota con un ejemplo.', [
 ['Cromatina', 'Acetilación de histonas'], ['Transcripcional', 'Factores que se unen a enhancers'], ['Postranscripcional', 'Splicing alternativo'], ['Traduccional', 'IRE de la ferritina'], ['Postraduccional', 'Corte de precursores inactivos']],
 'Cinco niveles según el documento de la UNLP.', 'Niveles eucariotas')
MC('cromatina', B, CON, '¿Cuál es el primer nivel de regulación en eucariotas?', [
 ('La descondensación de la cromatina', 'Correcta: decide qué genes podrán transcribirse.'),
 ('El splicing', 'Es postranscripcional.'),
 ('La traducción', 'Ocurre después.'),
 ('La glicosilación', 'Es postraduccional.')],
 'Sin cromatina abierta, la maquinaria no accede al promotor.', 'Cromatina')
MATCH('cromatina', B, CON, 'Relaciona cada tipo de cromatina con su característica.', [
 ['Heterocromatina', 'Compacta, muy teñida, transcripcionalmente inactiva'], ['Eucromatina', 'Laxa, menos teñida, transcripcionalmente activa']],
 'La heterocromatina está más metilada e hipoacetilada.', 'Eucromatina y heterocromatina')
MC('cromatina', I, MEC, '¿Por qué la acetilación de histonas favorece la transcripción?', [
 ('Neutraliza las cargas positivas de las lisinas y las histonas se unen menos al ADN', 'Correcta: la cromatina se relaja y el promotor queda accesible.'),
 ('Añade cargas positivas que atraen a la polimerasa', 'Elimina cargas positivas.'),
 ('Corta el ADN en el promotor', 'No corta el ADN.'),
 ('Metila las citosinas', 'Eso es la metilación del ADN.')],
 'HAT: acetila lisinas del extremo N-terminal.', 'Acetilación')
MATCH('cromatina', B, CON, 'Relaciona cada enzima con su efecto.', [
 ['Histona acetiltransferasa (HAT)', 'Relaja la cromatina y activa el gen'], ['Histona desacetilasa (HDAC)', 'Condensa la cromatina y silencia el gen'], ['ADN metiltransferasa', 'Forma 5-metilcitosina y silencia']],
 'Son las enzimas epigenéticas más estudiadas.', 'Enzimas epigenéticas')
MC('cromatina', B, CON, '¿Dónde ocurre la mayoría de la metilación del ADN?', [
 ('En citosinas de dinucleótidos CpG', 'Correcta: la citosina pasa a 5-metilcitosina.'),
 ('En adeninas de las cajas TATA', 'No es lo descrito en mamíferos.'),
 ('En el uracilo del ARN', 'Hablamos del ADN.'),
 ('En las histonas H1', 'Eso sería modificación de histonas.')],
 'CpG = citosina seguida de guanina.', 'Metilación del ADN')
MATCH('cromatina', I, CON, 'Relaciona cada tipo de metilación con su definición.', [
 ['De mantenimiento', 'Metila la hebra nueva copiando el patrón de la parental'], ['De novo', 'Metila posiciones nuevas y cambia el patrón']],
 'Ambas reprimen la expresión.', 'Tipos de metilación')
MATCH('cromatina', I, CON, 'Relaciona cada dato de metilación con su valor según el documento.', [
 ['Citosinas metiladas en vertebrados', 'Hasta 10 %'], ['Citosinas metiladas en plantas', 'Hasta 30 %'], ['Genes humanos cerca de islas CpG', '40–50 %']],
 'El estado de la isla CpG refleja la expresión del gen vecino.', 'Metilación del ADN')
MC('cromatina', I, COMP, '¿Cómo están las islas CpG de los genes de mantenimiento?', [
 ('No metiladas, porque se expresan en todos los tejidos', 'Correcta.'),
 ('Totalmente metiladas', 'Entonces estarían silenciados.'),
 ('Sin citosinas', 'Las islas CpG son ricas en CpG.'),
 ('Unidas a GAL4', 'GAL4 es un activador de levadura.')],
 'Ausencia de metilos = posibilidad de transcribir.', 'Islas CpG')
MC('cromatina', A, RAZ, 'En el experimento con el gen de β-globina, ¿qué concluyeron sobre la metilación?', [
 ('No existe un único sitio crítico; se necesitan varios sitios sin metilar cerca del promotor', 'Correcta: sitios entre el 1 y el 16.'),
 ('Un solo sitio controla toda la expresión', 'Ninguna construcción con pocos sitios libres funcionó al 100 %.'),
 ('La metilación no afecta la expresión', 'Metilado por completo no se expresa.'),
 ('El patrón de metilación se pierde en las células hijas', 'Se comprobó que se heredó.')],
 'Ejercicio del documento de la UNLP.', 'Experimento β-globina')
TF('cromatina', I, COMP, 'Las enzimas CfoI y HpaII no cortan el ADN si su sitio de reconocimiento está metilado.', True,
 'Por eso sirven para comprobar el patrón de metilación.', concepto='Enzimas sensibles a metilación')

# ================= TRANSCRIPCIONAL =================
MATCH('transcripcional', B, CON, 'Relaciona cada concepto con su definición.', [
 ['Elemento cis', 'Secuencia contigua al gen que regula su transcripción'], ['Factor trans', 'Proteína difusible que se une a elementos cis'], ['Enhancer (amplificador)', 'Elemento cis alejado del promotor que aumenta la transcripción'], ['Silenciador', 'Proteína o elemento que inhibe la transcripción']],
 'Cajas CAAT y GC son elementos cis del promotor.', 'Cis y trans')
MC('transcripcional', I, CON, '¿Qué dos dominios tiene como mínimo un factor de transcripción?', [
 ('Uno de unión al ADN y otro de acción sobre la transcripción', 'Correcta: el segundo se une a la ARN pol II o a mediadores.'),
 ('Uno de unión al ARN y otro de unión al ribosoma', 'No actúan sobre el ribosoma.'),
 ('Uno catalítico de ATP y otro de GTP', 'No es la definición.'),
 ('Uno de metilación y otro de acetilación', 'No es la definición.')],
 'Se agrupan en familias según su dominio de unión al ADN.', 'Factores de transcripción')
TF('transcripcional', I, COMP, 'Un dominio de activación de un factor de mamífero unido al dominio de unión al ADN de una levadura puede formar un factor funcional.', True,
 'Los dominios son intercambiables mediante ingeniería genética.', concepto='Factores de transcripción')
MC('transcripcional', I, COMP, '¿Cómo se encienden a la vez todos los genes de choque térmico?', [
 ('Comparten una secuencia consenso (HSE) reconocida por un mismo factor', 'Correcta: un solo elemento cis controla muchos genes.'),
 ('Están en un solo operón', 'Los eucariotas no usan operones así.'),
 ('Se cortan del mismo ARNm policistrónico', 'Los ARNm eucariotas son monocistrónicos.'),
 ('Pierden la metilación con el calor', 'No es el mecanismo descrito.')],
 'HSE = elemento de choque térmico.', 'Choque térmico')
MATCH('transcripcional', I, CON, 'Relaciona cada componente del sistema GAL de levadura con su papel.', [
 ['GAL4', 'Activador que se une al UAS'], ['GAL80', 'Represor que se une a GAL4'], ['UAS', 'Secuencia activadora (enhancer) de 17 pb'], ['Galactosa', 'Inductor que separa GAL80 de GAL4']],
 'Los genes GAL codifican cinasa, transferasa y epimerasa.', 'Sistema GAL')
MC('transcripcional', I, MEC, 'Sin galactosa, ¿por qué no se transcriben los genes GAL si GAL4 está unido al UAS?', [
 ('Porque GAL80 está unido a GAL4 y le impide activar', 'Correcta.'),
 ('Porque GAL4 no puede unirse al ADN sin galactosa', 'GAL4 sí está unido.'),
 ('Porque GAL80 se une al promotor', 'GAL80 no se une al ADN.'),
 ('Porque la levadura no tiene ARN pol II', 'Sí la tiene.')],
 'El represor actúa sobre el activador, no sobre el ADN.', 'GAL80')
MC('transcripcional', B, CON, 'Según el documento, ¿en qué parte de la transcripción eucariota hay evidencia de control?', [
 ('En el inicio', 'Correcta: no hay evidencias de control en otras etapas.'),
 ('Solo en la terminación', 'No es lo que dice el documento.'),
 ('En la elongación únicamente', 'No es lo que dice el documento.'),
 ('En ninguna', 'El inicio es el punto clave.')],
 'Interacción ARN polimerasa-promotor.', 'Nivel transcripcional')
TF('transcripcional', I, COMP, 'En Drosophila se usa el sistema GAL4-UAS cruzando una línea con GAL4 y otra con UAS para estudiar cuándo y dónde se expresa un gen.', True,
 'Aplicación experimental del mecanismo de levadura.', concepto='Sistema GAL4-UAS')

# ================= POSTRANSCRIPCIONAL =================
MATCH('postrans', B, CON, 'Relaciona cada mecanismo postranscripcional con un ejemplo.', [
 ['Splicing diferencial', 'Sensor infrarrojo del murciélago vampiro'], ['Regiones UTR', 'IRES, uORF y 5′ UTR alternativas'], ['Estabilidad del ARNm', 'ARNm de histonas acoplado a la replicación'], ['ARN pequeños', 'microARN que silencian un ARNm']],
 'Cuatro mecanismos según el documento.', 'Nivel postranscripcional')
MC('postrans', I, COMP, '¿Qué cambios pueden ocurrir en el splicing alternativo?', [
 ('Exones internos que se sustituyen, añaden o eliminan', 'Correcta: un gen produce varios ARNm maduros.'),
 ('Se agregan intrones al ARNm maduro siempre', 'No es lo que ocurre.'),
 ('Se cambia la secuencia del ADN', 'El ADN no cambia.'),
 ('Se elimina el cap', 'No es la definición.')],
 'También puede introducir un paro o cambiar el marco de lectura.', 'Splicing alternativo')
MC('postrans', I, COMP, 'En el murciélago vampiro, ¿qué logra el splicing alternativo del gen del sensor térmico?', [
 ('Bajar el umbral de detección de 60 °C a 30 °C en el rostro', 'Correcta: así detecta presas a 36–37 °C.'),
 ('Que el gen se exprese en todo el cuerpo', 'Es específico de tejido.'),
 ('Que el sensor detecte luz visible', 'Detecta radiación infrarroja (calor).'),
 ('Que el gen desaparezca', 'El gen existe en todos los mamíferos.')],
 'Splicing específico de especie y de tejido.', 'Splicing alternativo')
MATCH('postrans', I, CON, 'Relaciona cada elemento regulador con la región del ARNm donde está.', [
 ['IRES', '5′ UTR'], ['uORF y uAUG', '5′ UTR'], ['Sitio de poliadenilación alternativo', '3′ UTR'], ['Región rica en AU', '3′ UTR']],
 'UTR = regiones no traducidas.', 'UTR')
MC('postrans', I, COMP, '¿Qué efecto puede tener elegir un sitio de poliadenilación distinto?', [
 ('Modificar el extremo carboxilo-terminal de la proteína', 'Correcta: pueden resultar polipéptidos con actividades distintas.'),
 ('Cambiar el promotor del gen', 'No.'),
 ('Eliminar el cap', 'No.'),
 ('Metilar el ADN', 'No.')],
 'Otra forma de obtener varios ARNm de un solo transcrito.', 'Poliadenilación alternativa')
MC('postrans', I, COMP, '¿Qué dos estructuras protegen al ARNm de una degradación prematura?', [
 ('El cap 5′ y la cola poli-A', 'Correcta.'),
 ('El promotor y el terminador', 'Están en el ADN.'),
 ('Los intrones y el operador', 'No protegen al ARNm maduro.'),
 ('La SRP y el translocón', 'Participan en el destino de la proteína.')],
 'La región rica en AU, en cambio, puede desestabilizarlo.', 'Estabilidad del ARNm')
MC('postrans', A, RAZ, '¿Por qué la vida media del ARNm de histonas se desploma si se bloquea la replicación?', [
 ('Para acoplar la cantidad de histonas a la cantidad de ADN sintetizado', 'Correcta: depende de una horquilla en su extremo 3′.'),
 ('Porque las histonas ya no tienen ARNm', 'Sí tienen.'),
 ('Porque el ARNm de histonas tiene poli-A muy larga', 'No tiene poli-A.'),
 ('Porque el núcleo deja de exportar todos los ARNm', 'No es el mecanismo.')],
 'Durante la división, su vida media es de 15–60 minutos.', 'ARNm de histonas')
TF('postrans', I, CON, 'Los ARNm de las histonas tienen una cola poli-A larga que los estabiliza.', False,
 'No son poliadenilados; su estabilidad depende de una horquilla en el extremo 3′.',
 corr='ARNm de histonas: sin poli-A, con horquilla 3′.', concepto='ARNm de histonas')
ORDER('postrans', I, MEC, 'Ordena la vía de los microARN.', [
 'Síntesis del pri-miARN en el núcleo', 'El Microprocesador forma el pre-miARN (horquilla)', 'El pre-miARN se exporta al citoplasma', 'DICER lo corta en un dúplex corto', 'Se carga en RISC (Argonauta) y queda la hebra guía', 'RISC silencia el ARNm blanco'],
 'Degradación o bloqueo de la traducción.', 'microARN')
MC('postrans', B, CON, '¿Cuántos nucleótidos mide un microARN?', [
 ('18–25', 'Correcta: son ARN pequeños, endógenos y no codificantes.'),
 ('80', 'Es aproximadamente el tamaño de un ARNt.'),
 ('2000', 'Es demasiado grande.'),
 ('3', 'Es el tamaño de un codón.')],
 'Dato del artículo de epigenética.', 'microARN')
MC('postrans', I, COMP, '¿Por qué el silenciamiento por ARN pequeños es una regulación "económica"?', [
 ('Es mucho menos demandante que regular la transcripción', 'Correcta: regulación fina.'),
 ('Porque no usa ninguna proteína', 'Usa Dicer y Argonauta.'),
 ('Porque produce ATP', 'No produce ATP.'),
 ('Porque solo ocurre en bacterias', 'Ocurre en eucariotas superiores.')],
 'Según el documento de la UNLP.', 'microARN')
MATCH('postrans', I, CON, 'Relaciona cada componente de la vía de los microARN con su papel.', [
 ['Microprocesador', 'Procesa el pri-miARN en el núcleo'], ['DICER', 'Corta el pre-miARN en el citoplasma'], ['Argonauta / RISC', 'Retiene la hebra guía y se une al ARNm blanco']],
 'La helicasa de RISC separa las dos hebras.', 'microARN')

# ================= TRADUCCIONAL Y POSTRADUCCIONAL =================
MATCH('traduccional', I, CON, 'Relaciona cada ARNm con la posición de su IRE.', [
 ['Ferritina', 'IRE en el extremo 5′'], ['Receptor de transferrina', 'IRE en el extremo 3′']],
 'El IRE mide unos 30 nucleótidos.', 'IRE')
MC('traduccional', I, MEC, 'Con hierro bajo, ¿qué ocurre con la ferritina?', [
 ('La aconitasa se une al IRE en 5′ e impide su traducción', 'Correcta: no se fabrica más proteína de almacenamiento.'),
 ('Se traduce más ferritina', 'Ocurre con hierro alto.'),
 ('Se degrada el gen de la ferritina', 'Los genes no se degradan.'),
 ('El hierro se une al IRE directamente', 'El hierro se une a la aconitasa.')],
 'Sin hierro no tiene sentido fabricar la proteína que lo almacena.', 'Ferritina')
MC('traduccional', A, MEC, 'Con hierro bajo, ¿qué ocurre con el ARNm del receptor de transferrina?', [
 ('La aconitasa unida al IRE en 3′ lo estabiliza y se traduce más receptor', 'Correcta: la célula capta más hierro.'),
 ('Se degrada rápidamente', 'Ocurre con hierro alto.'),
 ('Se bloquea su traducción en 5′', 'Su IRE está en 3′.'),
 ('Se exporta al núcleo', 'No ocurre.')],
 'Protege la secuencia desestabilizadora rica en AU.', 'Receptor de transferrina')
MC('traduccional', B, CON, '¿Qué proteína actúa como sensor del hierro uniéndose al IRE?', [
 ('La aconitasa citosólica', 'Correcta: con hierro cambia de forma y suelta el IRE.'),
 ('La transferrina', 'Transporta hierro en la sangre.'),
 ('La ferritina', 'Almacena hierro.'),
 ('La SRP', 'Reconoce el péptido señal.')],
 'Mismo sensor, efecto opuesto según la posición del IRE.', 'Aconitasa')
MC('traduccional', I, COMP, '¿Qué hace la prolactina con el ARNm de la caseína?', [
 ('Se une a él y lo estabiliza; sin ella, se degrada', 'Correcta.'),
 ('Lo corta', 'No lo corta.'),
 ('Lo metila', 'No lo metila.'),
 ('Bloquea su exportación', 'No es el mecanismo descrito.')],
 'Ejemplo de proteína que regula la estabilidad de otro ARNm.', 'Prolactina y caseína')
MC('traduccional', I, MEC, '¿Qué marca a un ARNm para degradación por NMD?', [
 ('Complejos EJC que quedan sin retirar por un codón de paro prematuro', 'Correcta: el ribosoma se desensambla antes de llegar a ellos.'),
 ('La falta de cap 5′ exclusivamente', 'No es el mecanismo NMD.'),
 ('La presencia de una cola poli-A', 'Es normal.'),
 ('Un IRE en el extremo 3′', 'Eso es la regulación por hierro.')],
 'EJC = complejo de unión de exones.', 'NMD')
MC('traduccional', I, CON, '¿Dónde se coloca el complejo de unión de exones (EJC)?', [
 ('Aguas arriba de cada unión exón-exón durante el splicing', 'Correcta.'),
 ('En el promotor del gen', 'No.'),
 ('En la cola poli-A', 'No.'),
 ('En el anticodón del ARNt', 'No.')],
 'El ribosoma los retira al traducir de 5′ a 3′.', 'EJC')
ORDER('traduccional', I, MEC, 'Ordena el ciclo de eIF2 en el inicio de la traducción.', [
 'eIF2 unido a GTP recluta al ARNt iniciador con metionina', 'Se asocia con la subunidad ribosómica menor', 'El complejo se une al ARNm y busca el AUG hacia 3′', 'El ARNt se aparea con el AUG', 'El GTP se hidroliza y se libera eIF2-GDP'],
 'eIF2 es una proteína G trimérica.', 'eIF2')
MC('traduccional', B, CON, '¿Qué tipo de proteína es eIF2?', [
 ('Una proteína G trimérica', 'Correcta: alterna entre GTP y GDP.'),
 ('Una ARN polimerasa', 'No.'),
 ('Una histona', 'No.'),
 ('Un microARN', 'No es ARN.')],
 'Regular su ciclo GTP/GDP regula el inicio de la traducción.', 'eIF2')
MATCH('traduccional', B, CON, 'Relaciona cada proteína con su precursor inactivo o proceso.', [
 ['Caspasas', 'Se sintetizan como procaspasas'], ['Insulina y glucagón', 'Hormonas que se activan por corte'], ['Tripsina y quimotripsina', 'Enzimas que se activan por corte'], ['Proteínas de secreción', 'Péptido señal reconocido por la SRP']],
 'Nivel postraduccional.', 'Postraduccional')
MC('traduccional', I, CON, '¿Qué reconoce la partícula de reconocimiento de señal (SRP)?', [
 ('El péptido señal hidrofóbico del extremo N-terminal', 'Correcta: lleva el ribosoma al retículo endoplásmico.'),
 ('El cap del ARNm', 'Lo reconoce eIF4E.'),
 ('El IRE', 'Lo reconoce la aconitasa.'),
 ('El operador', 'Lo reconoce el represor.')],
 'La cadena entra al lumen del RE conforme se sintetiza.', 'SRP')
TF('traduccional', I, COMP, 'La concentración de ARNt y de subunidades ribosomales también regula la expresión génica a nivel traduccional.', True,
 'Según el documento de la UNLP.', concepto='Nivel traduccional')

# ================= EPIGENÉTICA =================
MC('epigen', B, CON, '¿Cómo define el artículo la epigenética?', [
 ('El estudio de cambios heredables en la expresión sin cambios en la secuencia del ADN', 'Correcta.'),
 ('El estudio de las mutaciones del ADN', 'Las mutaciones sí cambian la secuencia.'),
 ('El estudio de los genes de bacterias', 'No es la definición.'),
 ('El estudio de la traducción', 'No es la definición.')],
 'Se conocen más de veinte mecanismos epigenéticos.', 'Epigenética')
MATCH('epigen', B, CON, 'Relaciona cada mecanismo epigenético con lo que hace.', [
 ['Metilación del ADN', 'CH₃ en citosinas de CpG: silencia'], ['Modificación de histonas', 'Código de histonas: activa o silencia'], ['ARN no codificante', 'Degrada o bloquea ARNm; forma heterocromatina'], ['Remodelado dependiente de ATP', 'Desliza nucleosomas sin disociarlos'], ['Polycomb y Trithorax', 'Cierran o abren la cromatina']],
 'Todos actúan sobre el estado de la cromatina.', 'Mecanismos epigenéticos')
MATCH('epigen', I, MEC, 'Relaciona cada forma en que la metilación silencia un gen.', [
 ['Forma directa', 'Desplaza a los factores activadores del ADN'], ['Forma indirecta', 'Atrae proteínas que se unen a citosinas metiladas y reprimen']],
 'Ambas llevan al silenciamiento.', 'Metilación del ADN')
FILL('epigen', B, CON, 'La metilación del ADN consiste en añadir un grupo metilo en la posición ______ de una citosina.', ['5', 'cinco'],
 'Forma 5-metilcitosina.', 'Metilación del ADN')
MC('epigen', I, COMP, 'Según el artículo, ¿cómo están habitualmente las islas CpG de los promotores?', [
 ('No metiladas', 'Correcta: los CpG fuera de las islas son los que suelen estar metilados.'),
 ('Totalmente metiladas', 'No es lo habitual.'),
 ('Sin citosinas', 'Son ricas en CpG.'),
 ('Unidas a histona H1', 'No es la característica descrita.')],
 'Islas CpG = regiones promotoras ricas en CpG.', 'Islas CpG')
MC('epigen', I, MEC, '¿Por qué el patrón de metilación puede heredarse a las células hijas?', [
 ('CpG es simétrico y las metiltransferasas metilan la hebra complementaria', 'Correcta: reconocen 5′-metil-CpG-3′.'),
 ('Porque la metilación cambia la secuencia del ADN', 'No cambia la secuencia.'),
 ('Porque los metilos viajan en el ARNm', 'No.'),
 ('Porque las histonas copian los metilos', 'Lo hacen las ADN metiltransferasas.')],
 'Estructural (simetría) + funcional (enzimas de mantenimiento).', 'Herencia de la metilación')
MATCH('epigen', I, CON, 'Relaciona cada función fisiológica con la metilación del ADN.', [
 ['Inactivación del cromosoma X', 'En las mujeres'], ['Impronta', 'Silenciamiento de genes "imprintados"'], ['Defensa', 'Silenciar secuencias de virus y parásitos'], ['Genoma', 'Mantener su estabilidad']],
 'También participa en la diferenciación celular.', 'Funciones de la metilación')
MC('epigen', I, CON, '¿Qué hace el bisulfito de sodio en la detección de la metilación?', [
 ('Convierte la citosina no metilada en uracilo', 'Correcta: después se secuencia y se comparan.'),
 ('Metila todas las citosinas', 'No.'),
 ('Corta el ADN metilado', 'Eso hacen (o no) enzimas de restricción.'),
 ('Acetila las histonas', 'No.')],
 'Otros métodos: enzimas de restricción e inmunoprecipitación.', 'Detección de metilación')
MATCH('epigen', I, CON, 'Relaciona cada modificación de histonas con su efecto general.', [
 ['Hiperacetilación', 'Eucromatina activa'], ['Hipoacetilación', 'Heterocromatina inactiva'], ['Metilación de histonas', 'Puede activar o reprimir según el residuo']],
 'Las marcas se combinan como un código.', 'Código de histonas')
MC('epigen', I, COMP, '¿Qué es el "código de histonas"?', [
 ('Combinaciones de modificaciones de histonas que indican si la cromatina está activa o inactiva', 'Correcta.'),
 ('La secuencia de aminoácidos de las histonas', 'No es la idea.'),
 ('El código genético de los ARNt', 'No.'),
 ('Los genes que codifican histonas', 'No.')],
 'La información no está solo en la secuencia del ADN.', 'Código de histonas')
MC('epigen', A, INT, '¿Cómo cooperan la metilación del ADN y las histonas?', [
 ('Proteínas de unión a metil-CpG llevan HDAC a las regiones metiladas', 'Correcta: el ADN metilado termina en cromatina compacta.'),
 ('Las HAT metilan el ADN', 'No.'),
 ('El ADN metilado activa a las HAT', 'Es lo contrario.'),
 ('No hay relación entre ambos', 'Actúan en conjunto.')],
 'Varios mecanismos epigenéticos actúan juntos.', 'Cooperación epigenética')
MC('epigen', I, MEC, '¿Qué hacen los complejos de remodelado dependientes de ATP?', [
 ('Desplazan los nucleosomas sin disociarlos para exponer u ocultar ADN', 'Correcta: regulan en ambos sentidos.'),
 ('Degradan las histonas', 'No las degradan.'),
 ('Metilan las citosinas', 'Eso hacen las metiltransferasas.'),
 ('Sintetizan ARNm', 'No.')],
 'Usan la energía de la hidrólisis de ATP.', 'Remodelado de cromatina')
MATCH('epigen', B, CON, 'Relaciona cada complejo con su efecto sobre la cromatina.', [
 ['Polycomb', 'Represor: cromatina menos accesible'], ['Trithorax', 'Activador: cromatina más accesible']],
 'Descritos en Drosophila melanogaster, con homólogos humanos.', 'Polycomb y Trithorax')
MC('epigen', I, COMP, 'Además de silenciar ARNm, ¿qué funciones epigenéticas tienen los microARN según el artículo?', [
 ('Modificar el patrón de metilación y ayudar a formar heterocromatina', 'Correcta: también corrigen errores de metilación.'),
 ('Sintetizar histonas', 'No.'),
 ('Replicar el ADN', 'No.'),
 ('Formar el cap del ARNm', 'No.')],
 'Protegerían contra la pérdida transgeneracional del patrón de metilación.', 'microARN epigenéticos')
FILL('epigen', B, CON, 'En el nucleosoma, alrededor de ______ pares de bases se enrollan sobre un octámero de histonas (según el artículo).', ['146'],
 'Los nucleosomas están separados por la histona H1.', 'Nucleosoma')
TF('epigen', I, COMP, 'La metilación del ADN es una mutación porque cambia la secuencia de bases.', False,
 'La metilación es una marca química que no cambia la secuencia: por eso es epigenética.',
 corr='Metilación = cambio epigenético, no mutación.', concepto='Epigenética')
MATCH('epigen', I, CON, 'Relaciona cada hallazgo mencionado en el artículo con su mecanismo.', [
 ['Hipometilación global', 'Inestabilidad del genoma y activación de oncogenes'], ['Hipermetilación de un supresor de tumores', 'Silenciamiento del gen'], ['Azacitidina', 'Fármaco desmetilante']],
 'Importancia médica mencionada en el artículo.', 'Epigenética e importancia médica')

# ================= COMPARACIÓN =================
MATCH('comparacion', I, COMP, 'Relaciona cada característica con el tipo de organismo según la tabla del documento.', [
 ['ARNm policistrónicos', 'Procariotas'], ['Regulación por condensación de cromatina', 'Eucariotas'], ['Transcripción y traducción acopladas', 'Procariotas'], ['Splicing diferencial', 'Eucariotas']],
 'Tabla 1 del documento de la UNLP.', 'Procariotas vs eucariotas')
MC('comparacion', B, CON, '¿Cuál de estos niveles de regulación existe en eucariotas pero no en procariotas?', [
 ('La regulación a nivel de cromatina', 'Correcta: el ADN procariota está poco empaquetado.'),
 ('El inicio de la transcripción', 'Existe en ambos.'),
 ('La unión de un represor a una secuencia', 'Existe en ambos.'),
 ('El uso de ARN polimerasa', 'Existe en ambos.')],
 'En procariotas el ADN está disponible para la transcripción.', 'Procariotas vs eucariotas')
MC('comparacion', I, COMP, '¿Por qué en eucariotas no existe un modelo general de regulación como el operón?', [
 ('Porque cada gen puede regularse por muchos mecanismos en varias etapas', 'Correcta: los sistemas son múltiples y ramificados.'),
 ('Porque los eucariotas no regulan sus genes', 'Sí los regulan.'),
 ('Porque no tienen promotores', 'Cada gen tiene su promotor.'),
 ('Porque no tienen ARN polimerasa', 'Tienen tres.')],
 'Cromatina, transcripción, procesamiento, traducción y proteína.', 'Regulación eucariota')
TF('comparacion', B, CON, 'En eucariotas, cada gen suele tener su propio promotor.', True,
 'En procariotas, varios genes comparten un promotor en el operón.', concepto='Promotores')
MC('comparacion', I, RAZ, '¿Qué ventaja da a los eucariotas separar transcripción y traducción?', [
 ('Permite procesar, transportar y almacenar el ARNm como puntos de control', 'Correcta.'),
 ('Hace innecesarios los promotores', 'No.'),
 ('Elimina la necesidad de ribosomas', 'No.'),
 ('Permite la atenuación', 'La atenuación requiere acoplamiento (procariotas).')],
 'Más etapas = más puntos de regulación.', 'Procariotas vs eucariotas')
