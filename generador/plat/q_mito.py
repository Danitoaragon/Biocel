from qhelp import *
tema('mito')

# ---------------- ORIGEN / ESTRUCTURA ----------------
MC('origen', B, COMP, '¿Qué característica apoya el origen bacteriano de la mitocondria?', [
 ('Tiene ADN circular propio sin histonas', 'Correcta: como las bacterias; junto con la doble membrana y los ribosomas tipo bacteriano apoya la endosimbiosis.'),
 ('Tiene una sola membrana con colesterol', 'La mitocondria tiene doble membrana.'),
 ('Sus proteínas se codifican todas en el núcleo', 'Tiene genes propios; que muchos estén en el núcleo se explica por transferencia posterior.'),
 ('Se forma de novo a partir del retículo', 'Las mitocondrias se forman por fisión de mitocondrias previas.')],
 'Pruebas de la endosimbiosis: doble membrana, ADN circular, ribosomas tipo bacteriano y fisión.')
MATCH('estructura', B, CON, 'Relaciona cada compartimento mitocondrial con su característica.', [
 ['Membrana externa', 'Permeable por porinas'], ['Espacio intermembrana', 'Acumula H⁺ y contiene citocromo c'], ['Membrana interna', 'Impermeable; cadena respiratoria'], ['Matriz', 'Ciclo de Krebs y ADNmt']],
 'Cada compartimento tiene una función: límite, reservorio de protones, conversión de energía y metabolismo.')
MC('estructura', B, COMP, '¿Cuál de las dos membranas mitocondriales es casi impermeable a iones, incluidos los protones?', [
 ('La membrana interna', 'Correcta: su impermeabilidad (con cardiolipina) permite mantener el gradiente.'),
 ('La membrana externa', 'La externa tiene porinas y deja pasar moléculas pequeñas.'),
 ('Ambas por igual', 'Son muy diferentes en permeabilidad.'),
 ('Ninguna: los protones las cruzan libremente', 'Si así fuera no habría gradiente ni ATP.')],
 'La impermeabilidad de la membrana interna es la condición indispensable de la fosforilación oxidativa.', 'Membrana interna vs externa')
TF('estructura', B, CON, 'La membrana externa mitocondrial es impermeable gracias a la cardiolipina.', False,
 'La cardiolipina es característica de la membrana interna, que es la impermeable. La externa es permeable a moléculas pequeñas por las porinas.',
 'La membrana interna es la impermeable y contiene cardiolipina; la externa es permeable por las porinas.')
FILL('estructura', B, CON, 'Los pliegues de la membrana interna que aumentan su superficie se llaman ______.', ['crestas', 'crestas mitocondriales'],
 'Más crestas = más superficie para la cadena respiratoria y la ATP sintasa.')
MC('estructura', I, RAZ, 'Las mitocondrias del músculo cardíaco tienen muchas más crestas que las de otras células. ¿Qué indica esto?', [
 ('Una mayor capacidad de fosforilación oxidativa', 'Correcta: más membrana interna = más complejos respiratorios y ATP sintasas.'),
 ('Una mayor capacidad de glucólisis', 'La glucólisis ocurre en el citosol, no en las crestas.'),
 ('Más ADN mitocondrial por mitocondria', 'Las crestas no contienen el ADNmt.'),
 ('Mayor permeabilidad de la membrana externa', 'Las crestas son de la membrana interna.')],
 'La estructura refleja la función: un tejido con alta demanda de ATP necesita más superficie de membrana interna.')
FILL('estructura', I, CON, 'El ADN mitocondrial humano contiene ______ genes, de los cuales 13 codifican proteínas.', ['37', 'treinta y siete'],
 '37 genes: 13 proteínas (cadena respiratoria y ATP sintasa), 22 ARNt y 2 ARNr.')
MC('adn', I, COMP, '¿Qué codifican las 13 proteínas del ADN mitocondrial humano?', [
 ('Subunidades de la cadena respiratoria y la ATP sintasa', 'Correcta: todas son componentes de la fosforilación oxidativa.'),
 ('Las enzimas del ciclo de Krebs', 'Esas se codifican en el núcleo y se importan.'),
 ('Las proteínas de la membrana externa', 'Como las porinas, se codifican en el núcleo.'),
 ('Las histonas del ADN mitocondrial', 'El ADNmt no tiene histonas.')],
 'El resto, más del 99 % de las proteínas mitocondriales, viene del núcleo.')
ID('estructura', B, CON, 'mito_ime', '¿Qué compartimento señala la flecha?', [
 ('Espacio intermembrana', 'Correcta: entre la membrana externa y la interna.'),
 ('Matriz mitocondrial', 'La matriz está dentro de la membrana interna.'),
 ('Cresta', 'Las crestas son pliegues de la membrana interna.'),
 ('Citosol', 'El citosol está fuera de la mitocondria.')],
 'El espacio intermembrana acumula los protones bombeados y contiene el citocromo c.')
ID('estructura', B, CON, 'mito_matriz', '¿Qué compartimento señala la flecha?', [
 ('Matriz mitocondrial', 'Correcta: el espacio interior, rico en enzimas, con ADNmt y ribosomas.'),
 ('Espacio intermembrana', 'Está entre las dos membranas.'),
 ('Membrana externa', 'Es el límite exterior.'),
 ('Retículo endoplásmico', 'No forma parte de la mitocondria.')],
 'La matriz contiene la PDH, el ciclo de Krebs y la β-oxidación.')
ID('estructura', B, CON, 'mito_cresta', '¿Qué estructura señala la flecha?', [
 ('Una cresta de la membrana interna', 'Correcta: pliegue que aumenta la superficie de la membrana interna.'),
 ('La membrana externa', 'La externa es lisa y envuelve todo el organelo.'),
 ('Un ribosoma mitocondrial', 'Los ribosomas son partículas de la matriz.'),
 ('Una porina', 'Las porinas son canales de la membrana externa.')],
 'Las crestas contienen la cadena respiratoria y la ATP sintasa.')
MC('importacion', I, MEC, '¿Cómo llega a la matriz una proteína mitocondrial codificada en el núcleo?', [
 ('Con una secuencia señal, atravesando TOM y luego TIM', 'Correcta: TOM en la membrana externa y TIM en la interna; después se corta la señal.'),
 ('Se sintetiza en ribosomas mitocondriales a partir de un ARNm nuclear', 'Los ARNm nucleares se traducen en el citosol.'),
 ('Entra por las porinas sin necesidad de señal', 'Las porinas solo dejan pasar moléculas pequeñas.'),
 ('Llega en vesículas desde el aparato de Golgi', 'La importación mitocondrial no usa la vía secretora.')],
 'Secuencia señal amino terminal → TOM → TIM → peptidasa de la matriz.')
ORDER('importacion', I, MEC, 'Ordena la importación de una proteína a la matriz mitocondrial.', [
 'Síntesis en ribosomas del citosol con secuencia señal', 'Chaperonas citosólicas la mantienen desplegada', 'Cruza la membrana externa por TOM', 'Cruza la membrana interna por TIM', 'Una peptidasa corta la señal y la proteína se pliega'],
 'Las proteínas cruzan desplegadas y se pliegan en la matriz.')

# ---------------- CADENA ----------------
MATCH('cadena', I, CON, 'Relaciona cada componente de la cadena respiratoria con su función.', [
 ['Complejo I', 'Recibe electrones del NADH'], ['Complejo II', 'Recibe electrones del succinato (FADH₂)'], ['Coenzima Q', 'Lleva electrones de I y II a III'], ['Citocromo c', 'Lleva electrones de III a IV'], ['Complejo IV', 'Entrega electrones al O₂']],
 'NADH → I → Q → III → citocromo c → IV → O₂; el FADH₂ entra por el II.')
ORDER('cadena', B, MEC, 'Ordena el recorrido de los electrones del NADH.', [
 'NADH', 'Complejo I', 'Coenzima Q (ubiquinona)', 'Complejo III', 'Citocromo c', 'Complejo IV', 'O₂ → H₂O'],
 'Cada transferencia libera un poco de energía que los complejos I, III y IV usan para bombear protones.')
MC('cadena', B, CON, '¿Cuál es el aceptor final de electrones de la cadena respiratoria?', [
 ('El oxígeno, que se reduce a agua', 'Correcta: por eso respiramos O₂.'),
 ('El NAD⁺, que se reduce a NADH', 'El NAD⁺ es un aceptor al inicio, en el ciclo de Krebs.'),
 ('El CO₂, que se reduce a glucosa', 'El CO₂ es producto, no aceptor; la glucosa no se forma aquí.'),
 ('El ADP, que se convierte en ATP', 'El ADP no recibe electrones; se fosforila.')],
 'El O₂ recibe los electrones en el complejo IV y se forma H₂O.')
TF('cadena', I, CON, 'El complejo II bombea protones igual que los complejos I, III y IV.', False,
 'El complejo II (succinato deshidrogenasa) no bombea protones. Por eso los electrones del FADH₂ generan menos ATP que los del NADH.',
 'El complejo II no bombea protones; solo los complejos I, III y IV lo hacen.')
TF('cadena', I, CON, 'La succinato deshidrogenasa del ciclo de Krebs es la misma enzima que el complejo II de la cadena respiratoria.', True,
 'Correcto: está anclada en la membrana interna y conecta directamente el ciclo de Krebs con la cadena.')
MC('cadena', I, COMP, '¿Por qué la coenzima Q puede llevar electrones entre complejos dentro de la membrana?', [
 ('Porque es una molécula liposoluble que se mueve en la bicapa', 'Correcta: se desplaza dentro de la membrana interna.'),
 ('Porque es una proteína soluble del espacio intermembrana', 'Esa descripción corresponde al citocromo c.'),
 ('Porque está fija entre los complejos I y IV', 'Es móvil, no fija.'),
 ('Porque viaja por la matriz unida a NADH', 'No viaja por la matriz.')],
 'Dos transportadores móviles: la ubiquinona (en la bicapa) y el citocromo c (soluble en el espacio intermembrana).', 'Coenzima Q vs citocromo c')
FILL('cadena', B, CON, 'La pequeña proteína soluble que lleva electrones del complejo III al complejo IV es el ______.', ['citocromo c', 'citocromo'],
 'El citocromo c está en el espacio intermembrana; en la apoptosis sale al citosol.')
MC('cadena', A, RAZ, 'Se bloquea el complejo III. ¿Qué ocurre con la ubiquinona y con el citocromo c?', [
 ('La ubiquinona queda reducida y el citocromo c oxidado', 'Correcta: lo que está antes del bloqueo se acumula reducido; lo que está después se queda sin electrones.'),
 ('Ambos quedan reducidos', 'El citocromo c está después del bloqueo; no recibe electrones.'),
 ('Ambos quedan oxidados', 'La ubiquinona sigue recibiendo electrones de I y II.'),
 ('La ubiquinona queda oxidada y el citocromo c reducido', 'Está invertido.')],
 'Regla útil: con un bloqueo, todo lo que está antes se reduce y todo lo que está después se oxida.')

# ---------------- GRADIENTE / SINTASA ----------------
MC('gradiente', I, COMP, '¿De qué dos componentes está formada la fuerza protón-motriz?', [
 ('Una diferencia de pH y una de potencial eléctrico', 'Correcta: ΔpH (más H⁺ afuera) y Δψ (matriz negativa).'),
 ('Una diferencia de ATP y una de ADP', 'Esas son concentraciones de nucleótidos, no el gradiente.'),
 ('Una diferencia de O₂ y una de CO₂', 'Son gases de la respiración, no el gradiente de protones.'),
 ('Una diferencia de NADH y una de FADH₂', 'Son transportadores de electrones.')],
 'El gradiente electroquímico de protones combina un componente químico y uno eléctrico.')
TF('gradiente', I, CON, 'Durante la respiración, la matriz mitocondrial queda con carga negativa y más alcalina que el espacio intermembrana.', True,
 'Correcto: al bombear H⁺ hacia afuera, la matriz pierde cargas positivas (negativa) y protones (más alcalina).')
MC('sintasa', B, COMP, '¿Qué función cumple la ATP sintasa?', [
 ('Usa el regreso de H⁺ a la matriz para sintetizar ATP', 'Correcta: el flujo de H⁺ por F₀ hace girar el rotor y F₁ fabrica ATP.'),
 ('Bombea H⁺ al espacio intermembrana', 'Eso lo hacen los complejos I, III y IV.'),
 ('Transfiere electrones al oxígeno', 'Eso lo hace el complejo IV.'),
 ('Saca el ATP de la matriz al citosol', 'Eso lo hace el translocador ADP/ATP.')],
 'La cadena crea el gradiente; la ATP sintasa lo usa.', 'Cadena respiratoria vs ATP sintasa')
MATCH('sintasa', I, CON, 'Relaciona cada parte de la ATP sintasa con su función.', [
 ['F₀ (anillo c)', 'Rotor en la membrana que deja pasar H⁺'], ['F₁', 'Sitios catalíticos que forman ATP'], ['Tallo central', 'Transmite el giro a F₁'], ['Estator (brazo periférico)', 'Impide que F₁ gire con el rotor']],
 'Es un motor rotatorio: el flujo de H⁺ hace girar el rotor y el giro deforma los sitios catalíticos de F₁.')
ORDER('sintasa', I, MEC, 'Ordena los pasos de la fosforilación oxidativa.', [
 'NADH y FADH₂ ceden electrones a la cadena', 'Los complejos I, III y IV bombean H⁺', 'Se forma el gradiente electroquímico', 'Los H⁺ regresan por F₀ y lo hacen girar', 'F₁ une ADP + Pᵢ y forma ATP'],
 'Oxidación → bombeo → gradiente → flujo por la sintasa → ATP (teoría quimiosmótica).')
MC('sintasa', A, RAZ, 'Si se inhibe la ATP sintasa mitocondrial con oligomicina, ¿qué consecuencia sería esperable?', [
 ('Se frena también el consumo de O₂ porque el gradiente se vuelve máximo', 'Correcta: sin regreso de H⁺ el gradiente impide seguir bombeando y los electrones dejan de fluir.'),
 ('Aumenta el consumo de O₂ y se produce calor', 'Eso pasa con un desacoplante, no con un inhibidor de la sintasa.'),
 ('El ATP sigue formándose por la cadena', 'La cadena no fabrica ATP; lo fabrica la sintasa.'),
 ('El gradiente de protones desaparece', 'Al contrario: se acumula porque los H⁺ no regresan.')],
 'Cadena y sintasa están acopladas: si una se detiene, la otra también.')
ID('sintasa', I, CON, 'sintasa_f1', 'En el esquema de la ATP sintasa, ¿qué parte señala la flecha?', [
 ('F₁, en la matriz', 'Correcta: contiene los sitios catalíticos que unen ADP + Pᵢ.'),
 ('F₀, en la membrana', 'F₀ es el rotor embebido en la membrana.'),
 ('El complejo IV', 'El complejo IV es otro complejo de la cadena.'),
 ('Una porina', 'Las porinas están en la membrana externa.')],
 'F₁ sobresale hacia la matriz y sintetiza ATP; F₀ es el canal-rotor en la membrana.')
FILL('sintasa', I, CON, 'La teoría que explica que la energía de la cadena se conserva como un gradiente de protones antes de formar ATP es la teoría ______ de Mitchell.', ['quimiosmotica', 'quimiosmótica'],
 'Peter Mitchell propuso la teoría quimiosmótica: el gradiente de H⁺ es el intermediario.')

# ---------------- RENDIMIENTO ----------------
MATCH('rendimiento', I, APL, 'Relaciona cada etapa con lo que produce por cada glucosa.', [
 ['Glucólisis', '2 ATP netos + 2 NADH'], ['Piruvato deshidrogenasa', '2 NADH + 2 CO₂'], ['Ciclo de Krebs (2 vueltas)', '6 NADH + 2 FADH₂ + 2 GTP'], ['Cadena + ATP sintasa', '≈26–28 ATP']],
 'Total por glucosa: 10 NADH, 2 FADH₂, 4 ATP/GTP directos → ≈30–32 ATP.')
FILL('rendimiento', B, APL, 'Por cada glucosa, el ciclo de Krebs produce ______ NADH (considera las dos vueltas).', ['6', 'seis'],
 '3 NADH por vuelta × 2 vueltas (una por cada acetil-CoA).')
FILL('rendimiento', I, APL, 'Cada NADH que entra a la cadena respiratoria rinde aproximadamente ______ ATP.', ['2.5', '2,5', 'dos y medio'],
 'Bombea ≈10 H⁺ y se necesitan ≈4 H⁺ por ATP: 10 ÷ 4 = 2.5.')
MC('rendimiento', I, RAZ, '¿Por qué un FADH₂ rinde menos ATP que un NADH?', [
 ('Porque sus electrones entran por el complejo II, que no bombea H⁺', 'Correcta: se bombean ≈6 H⁺ en vez de ≈10.'),
 ('Porque el FADH₂ se oxida en el citosol', 'El FADH₂ se forma y se oxida en la mitocondria.'),
 ('Porque sus electrones no llegan al oxígeno', 'Sí llegan al O₂ a través de III y IV.'),
 ('Porque necesita más ATP para entrar a la matriz', 'El FADH₂ se forma dentro (succinato deshidrogenasa).')],
 'NADH: 10 H⁺ ≈ 2.5 ATP. FADH₂: 6 H⁺ ≈ 1.5 ATP.')
MC('rendimiento', A, APL, '¿Cuántos ATP se obtienen aproximadamente por la oxidación completa de una glucosa?', [
 ('≈30–32', 'Correcta: 4 directos + 20 (8 NADH) + 3 (2 FADH₂) + 3 a 5 (NADH glucolítico).'),
 ('2', 'Eso es solo la glucólisis, sin oxígeno.'),
 ('≈12', 'Corresponde a un solo acetil-CoA con los valores antiguos, no a una glucosa.'),
 ('≈100', 'Es una sobreestimación; ni con los valores antiguos (36–38) se llega.')],
 'La cifra exacta depende de la lanzadera del NADH citosólico; textos antiguos daban 36–38.')
MC('rendimiento', A, RAZ, '¿Por qué el NADH producido en la glucólisis puede rendir 1.5 o 2.5 ATP?', [
 ('Depende de la lanzadera que lleve sus electrones a la mitocondria', 'Correcta: glicerol-3-fosfato (entra como FADH₂, ≈1.5) o malato-aspartato (como NADH, ≈2.5).'),
 ('Depende de cuánto oxígeno haya en la célula', 'El rendimiento por NADH no cambia con la cantidad de O₂ mientras haya O₂.'),
 ('Depende de si la glucosa entra con insulina', 'La insulina regula la entrada de glucosa, no el rendimiento del NADH.'),
 ('Depende del número de crestas', 'Las crestas cambian la capacidad total, no el rendimiento por NADH.')],
 'El NADH citosólico no cruza la membrana interna; sus electrones entran por lanzaderas.')
TF('rendimiento', I, COMP, 'El ciclo de Krebs es la etapa que produce directamente la mayor cantidad de ATP de la respiración.', False,
 'El ciclo de Krebs solo produce 1 GTP por vuelta. Su aporte principal son los NADH y FADH₂, que generan ATP en la fosforilación oxidativa.',
 'La fosforilación oxidativa produce la mayor parte del ATP; el ciclo de Krebs aporta sobre todo NADH y FADH₂.')
MC('metabolismo', I, MEC, '¿Qué produce la piruvato deshidrogenasa por cada piruvato?', [
 ('Acetil-CoA, NADH y CO₂', 'Correcta: descarboxilación oxidativa del piruvato.'),
 ('Lactato y NAD⁺', 'Eso es la fermentación láctica en el citosol.'),
 ('Oxalacetato y ATP', 'La PDH no forma oxalacetato ni ATP.'),
 ('Citrato y FADH₂', 'El citrato se forma en el ciclo de Krebs.')],
 'La PDH conecta la glucólisis con el ciclo de Krebs.')
TF('metabolismo', B, CON, 'El CO₂ que exhalamos proviene del oxígeno que respiramos.', False,
 'El oxígeno se reduce a agua en el complejo IV. El CO₂ proviene de los carbonos del combustible, liberados en la PDH y el ciclo de Krebs.',
 'El CO₂ proviene de los carbonos del combustible; el O₂ que respiramos termina formando agua.')
MC('metabolismo', I, INT, '¿Por qué se dice que el acetil-CoA es un punto de convergencia del metabolismo?', [
 ('Porque se forma a partir de glucosa, ácidos grasos y aminoácidos', 'Correcta: todos estos combustibles terminan en el ciclo de Krebs.'),
 ('Porque es la molécula que almacena energía a largo plazo', 'Esa función la tienen el glucógeno y los triglicéridos.'),
 ('Porque se forma solo a partir de la glucosa', 'También viene de la β-oxidación y de aminoácidos.'),
 ('Porque se exporta a la sangre como combustible', 'El acetil-CoA no se exporta a la sangre.')],
 'El acetil-CoA es la entrada común al ciclo de Krebs.')
MC('metabolismo', I, MEC, '¿Dónde ocurre la β-oxidación de los ácidos grasos y qué produce en cada vuelta?', [
 ('En la matriz: 1 acetil-CoA, 1 NADH y 1 FADH₂', 'Correcta: cada vuelta acorta el ácido graso en dos carbonos.'),
 ('En el citosol: 2 ATP y 2 piruvatos', 'Eso describe a la glucólisis.'),
 ('En el espacio intermembrana: CO₂ y agua', 'No ocurre ahí.'),
 ('En la membrana externa: citrato', 'El citrato se forma en el ciclo de Krebs.')],
 'Los ácidos grasos entran a la matriz con carnitina y se oxidan por β-oxidación.')
FILL('metabolismo', I, CON, 'Los ácidos grasos de cadena larga entran a la matriz mitocondrial mediante la lanzadera de ______.', ['carnitina'],
 'La lanzadera de carnitina transporta los grupos acilo a través de la membrana interna.')
MATCH('metabolismo', A, MEC, 'Relaciona cada paso del ciclo de Krebs con lo que produce.', [
 ['Isocitrato → α-cetoglutarato', 'NADH + CO₂'], ['α-cetoglutarato → succinil-CoA', 'NADH + CO₂'], ['Succinil-CoA → succinato', 'GTP'], ['Succinato → fumarato', 'FADH₂'], ['Malato → oxalacetato', 'NADH']],
 'Por vuelta: 3 NADH, 1 FADH₂, 1 GTP y 2 CO₂.')
MC('metabolismo', A, RAZ, 'Una célula aumenta considerablemente su demanda energética. ¿Qué cambio funcional mitocondrial sería más esperable y por qué?', [
 ('Aumenta la respiración porque sube el ADP disponible', 'Correcta: más ADP acelera la ATP sintasa, baja el gradiente y la cadena consume más O₂ (control respiratorio).'),
 ('Disminuye el consumo de O₂ para ahorrar oxígeno', 'Con más demanda el consumo de O₂ aumenta.'),
 ('Se desacopla la cadena para producir calor', 'Desacoplar reduciría el ATP, lo contrario de lo que se necesita.'),
 ('Se detiene el ciclo de Krebs para ahorrar NAD⁺', 'El ciclo se acelera para producir más NADH.')],
 'El ADP es la señal que ajusta la respiración a la demanda.')

# ---------------- DESACOPLAMIENTO ----------------
MC('desacople', I, MEC, '¿Qué hace un desacoplante como el 2,4-dinitrofenol?', [
 ('Deja regresar H⁺ sin pasar por la ATP sintasa', 'Correcta: la cadena sigue (más rápido), pero no se forma ATP y se libera calor.'),
 ('Bloquea el complejo IV', 'Eso hacen el cianuro y el CO.'),
 ('Inhibe directamente la ATP sintasa', 'Eso hace la oligomicina.'),
 ('Impide la entrada de piruvato', 'No es su mecanismo.')],
 'Desacoplar = separar el transporte de electrones de la síntesis de ATP.', 'Desacoplante vs inhibidor')
MC('desacople', A, RAZ, '¿Qué ocurre con el consumo de oxígeno cuando se añade un desacoplante a mitocondrias funcionales?', [
 ('Aumenta, porque el gradiente se disipa y la cadena se acelera', 'Correcta: sin "freno" del gradiente, los electrones fluyen más rápido.'),
 ('Disminuye, porque se detiene la cadena', 'Eso ocurre con inhibidores de la cadena o de la sintasa.'),
 ('No cambia, porque solo afecta al ATP', 'El consumo de O₂ sí cambia.'),
 ('Se vuelve cero inmediatamente', 'Eso pasaría con cianuro.')],
 'Paradoja útil para el examen: un desacoplante aumenta el consumo de O₂ y disminuye el ATP.')
FILL('desacople', B, CON, 'La proteína desacoplante de la grasa parda que produce calor se llama termogenina o ______.', ['ucp1', 'ucp-1', 'ucp 1'],
 'UCP1 deja regresar H⁺ a la matriz y la energía del gradiente se libera como calor.')
TF('desacople', I, APL, 'La grasa parda es especialmente importante en los recién nacidos para mantener la temperatura corporal.', True,
 'Correcto: la termogenina de la grasa parda genera calor sin necesidad de tiritar.')
MATCH('desacople', A, APL, 'Relaciona cada sustancia con su efecto mitocondrial.', [
 ['Rotenona', 'Bloquea el complejo I'], ['Cianuro', 'Bloquea el complejo IV'], ['Oligomicina', 'Bloquea la ATP sintasa'], ['2,4-dinitrofenol', 'Desacopla: calor sin ATP']],
 'Inhibidores frenan la cadena; los desacoplantes la aceleran sin formar ATP.')

# ---------------- ROS ----------------
MC('ros', I, MEC, '¿Dónde se forma principalmente el anión superóxido en la mitocondria?', [
 ('En los complejos I y III, por fuga de electrones', 'Correcta: algunos electrones reducen el O₂ de forma incompleta.'),
 ('En la ATP sintasa, al girar el rotor', 'La sintasa no transfiere electrones.'),
 ('En la membrana externa, en las porinas', 'Las porinas no transfieren electrones.'),
 ('En el ciclo de Krebs, al formar CO₂', 'La descarboxilación no forma superóxido.')],
 'Las ROS son subproductos de la cadena respiratoria.')
MATCH('ros', I, CON, 'Relaciona cada molécula con su papel en el estrés oxidativo.', [
 ['Superóxido (O₂•⁻)', 'Primer radical formado por la fuga de electrones'], ['Superóxido dismutasa', 'Convierte superóxido en H₂O₂'], ['Catalasa', 'Descompone el H₂O₂'], ['Radical hidroxilo', 'Especie muy reactiva que daña macromoléculas']],
 'Estrés oxidativo = producción de ROS mayor que la capacidad antioxidante.')
TF('ros', I, COMP, 'El ADN mitocondrial es especialmente vulnerable al daño oxidativo porque está cerca de la cadena respiratoria y carece de histonas.', True,
 'Correcto: por eso acumula mutaciones con mayor frecuencia que el ADN nuclear.')
MC('ros', A, CLIN, 'Tras restablecer el flujo sanguíneo de un miocardio isquémico, el daño celular aumenta. ¿Qué mecanismo mitocondrial lo explica en parte?', [
 ('Un pico de ROS al reingresar el oxígeno', 'Correcta: lesión por isquemia-reperfusión con estrés oxidativo.'),
 ('Una mayor producción de ATP por la sintasa', 'Más ATP no daña a la célula.'),
 ('La desaparición de las crestas por exceso de O₂', 'No es el mecanismo descrito.'),
 ('La inhibición de la β-oxidación por el CO₂', 'No explica el daño por reperfusión.')],
 'Cuando el oxígeno regresa a una cadena alterada, aumenta la fuga de electrones y la formación de ROS.')

# ---------------- APOPTOSIS ----------------
ORDER('apoptosis', I, MEC, 'Ordena la vía mitocondrial (intrínseca) de la apoptosis.', [
 'Daño celular grave', 'Bax y Bak permeabilizan la membrana externa', 'El citocromo c sale al citosol', 'Se forma el apoptosoma con Apaf-1', 'Se activa la caspasa 9', 'Las caspasas ejecutoras desmantelan la célula'],
 'Bcl-2 inhibe el paso de permeabilización.')
MC('apoptosis', I, MEC, '¿Qué función tiene el citocromo c cuando sale al citosol?', [
 ('Se une a Apaf-1 y forma el apoptosoma', 'Correcta: el apoptosoma activa la caspasa 9.'),
 ('Transporta electrones al complejo IV', 'Esa es su función dentro del espacio intermembrana.'),
 ('Bombea H⁺ hacia el citosol', 'No es una bomba.'),
 ('Repara el ADN dañado', 'No participa en la reparación.')],
 'El citocromo c tiene doble función: transportador de electrones y señal de muerte.')
TF('apoptosis', B, CON, 'Bcl-2 es una proteína proapoptótica que forma poros en la membrana externa.', False,
 'Bcl-2 es antiapoptótica: impide la permeabilización. Las que forman poros son Bax y Bak.',
 'Bcl-2 es antiapoptótica; Bax y Bak son las proapoptóticas que permeabilizan la membrana externa.')
MC('apoptosis', A, CLIN, 'Un tumor sobreexpresa Bcl-2. ¿Qué consecuencia es esperable?', [
 ('Sus células resisten la apoptosis', 'Correcta: Bcl-2 impide la salida del citocromo c.'),
 ('Sus células mueren con mayor facilidad', 'Sería lo contrario.'),
 ('Sus mitocondrias producen más ATP', 'Bcl-2 no aumenta la síntesis de ATP.'),
 ('Sus mitocondrias pierden el ADNmt', 'No es un efecto de Bcl-2.')],
 'Evadir la apoptosis es un rasgo del cáncer; hay fármacos que inhiben Bcl-2.')

# ---------------- CLÍNICA ----------------
MC('clinica', A, CLIN, 'Un bombero rescatado de un incendio presenta confusión, acidosis láctica y sangre venosa muy oxigenada. ¿Qué paso está bloqueado?', [
 ('El complejo IV de la cadena respiratoria', 'Correcta: intoxicación por cianuro; el O₂ llega pero no se usa (hipoxia histotóxica).'),
 ('La entrada de glucosa a la célula', 'No explicaría la sangre venosa oxigenada.'),
 ('La glucólisis en el citosol', 'La glucólisis está aumentada (de ahí el lactato).'),
 ('La β-oxidación en la matriz', 'No produce este cuadro agudo.')],
 'Sin consumo de O₂ en los tejidos, la sangre venosa queda oxigenada y la célula depende de la glucólisis anaerobia.')
MC('clinica', I, RAZ, '¿Por qué aparece acidosis láctica cuando falla la cadena respiratoria?', [
 ('El NADH no se reoxida y el piruvato se convierte en lactato', 'Correcta: la célula regenera NAD⁺ formando lactato para seguir con la glucólisis.'),
 ('El oxígeno se convierte en ácido láctico', 'El O₂ no forma lactato.'),
 ('La ATP sintasa produce ácido láctico', 'No produce lactato.'),
 ('El ciclo de Krebs se acelera y libera lactato', 'El ciclo se frena, no se acelera.')],
 'Sin cadena, la única forma de obtener ATP es la glucólisis anaerobia, que produce lactato.')
MC('clinica', I, CLIN, 'Una madre tiene una enfermedad por mutación del ADN mitocondrial. ¿Qué es lo esperable en su descendencia?', [
 ('Todos sus hijos pueden heredarla, con gravedad variable', 'Correcta: herencia materna y heteroplasmia.'),
 ('Solo la heredan los hijos varones', 'No está ligada al sexo del hijo.'),
 ('Ninguno, porque se hereda del padre', 'Las mitocondrias del espermatozoide no se transmiten.'),
 ('La mitad, como en la herencia autosómica dominante', 'No sigue patrones mendelianos.')],
 'Por la heteroplasmia, la proporción de ADNmt mutado varía entre hijos y entre tejidos.')
TF('clinica', I, CLIN, 'Un padre con una mutación del ADN mitocondrial la transmite a la mitad de sus hijos.', False,
 'El ADN mitocondrial se hereda casi exclusivamente de la madre; un padre afectado no lo transmite.',
 'Las mutaciones del ADN mitocondrial se transmiten por vía materna; un padre afectado no las transmite.')
FILL('clinica', I, CON, 'La coexistencia de ADN mitocondrial normal y mutado en una misma célula se llama ______.', ['heteroplasmia'],
 'La enfermedad aparece cuando la proporción de ADNmt mutado supera un umbral.')
MC('clinica', A, RAZ, '¿Por qué las enfermedades mitocondriales afectan sobre todo cerebro, músculo y corazón?', [
 ('Porque son los tejidos que más dependen de la fosforilación oxidativa', 'Correcta: tienen el umbral más bajo para manifestar el defecto.'),
 ('Porque son los únicos tejidos con mitocondrias', 'Casi todas las células tienen mitocondrias.'),
 ('Porque solo en ellos se expresa el ADNmt', 'El ADNmt se expresa en todas las células con mitocondrias.'),
 ('Porque no realizan glucólisis', 'Sí realizan glucólisis.')],
 'La gravedad depende de la demanda energética del tejido.')
MATCH('clinica', I, CLIN, 'Relaciona cada enfermedad o situación con su mecanismo.', [
 ['MELAS', 'Mutación del ADNmt con encefalopatía y acidosis láctica'], ['Neuropatía óptica de Leber', 'Mutación del ADNmt con pérdida visual'], ['Intoxicación por cianuro', 'Bloqueo del complejo IV'], ['Hipotermia del recién nacido evitada', 'Termogenina de la grasa parda']],
 'La mitocondria explica cuadros genéticos, tóxicos y fisiológicos.')
MC('clinica', A, CLIN, 'Un adulto joven pierde la visión central de un ojo y semanas después del otro. Su madre y un tío materno tuvieron lo mismo. ¿Cuál es el diagnóstico más probable?', [
 ('Neuropatía óptica hereditaria de Leber', 'Correcta: enfermedad del ADNmt con herencia materna que afecta el nervio óptico.'),
 ('Síndrome de Kartagener', 'Es una enfermedad ciliar con infecciones respiratorias.'),
 ('Epidermólisis bullosa simple', 'Afecta la piel.'),
 ('β-talasemia', 'Es una alteración de la globina.')],
 'Herencia por línea materna + tejido de alta demanda (nervio óptico) sugiere enfermedad mitocondrial.')
