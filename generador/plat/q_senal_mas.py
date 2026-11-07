"""Más preguntas de señalización celular para cubrir todo el capítulo."""
from qhelp import *
tema('senal')

MC('principios', B, CON, '¿Cómo se llama la célula que recibe una señal y responde a ella?', [
 ('Célula diana', 'Correcta: tiene el receptor para esa señal.'),
 ('Célula señalizadora', 'Es la que produce la señal.'),
 ('Célula madre', 'No tiene relación.'),
 ('Célula efectora', 'No es el término usado para la que recibe la señal.')],
 'Señalizadora → señal → diana.', 'Célula diana')
MC('principios', I, COMP, '¿Por qué la señalización sináptica es más rápida y precisa que la endocrina?', [
 ('El neurotransmisor recorre una distancia minúscula y se elimina enseguida', 'Correcta.'),
 ('Porque los neurotransmisores son esteroides', 'No lo son.'),
 ('Porque no necesita receptores', 'Sí necesita.'),
 ('Porque viaja por la sangre más rápido', 'No viaja por la sangre.')],
 'La neurona llega lejos con su axón, pero la señal actúa en la sinapsis.', 'Sináptica')
TF('principios', B, CON, 'En la señalización por contacto, la molécula señalizadora está unida a la membrana de la célula señalizadora.', True,
 'Ejemplo: Delta (señal) y Notch (receptor) en el desarrollo.', concepto='Señalización por contacto')
MATCH('principios', I, CON, 'Relaciona cada forma de señalización con un ejemplo.', [
 ['Endocrina', 'Insulina, adrenalina, cortisol'], ['Sináptica', 'Acetilcolina en la unión neuromuscular'], ['Por contacto', 'Notch-Delta'], ['Paracrina', 'Factores de crecimiento locales']],
 'Ejemplos del capítulo.', 'Formas de señalización')
MC('receptores', B, CON, '¿Qué característica define a un receptor?', [
 ('Une su señal con gran especificidad y afinidad y cambia de forma', 'Correcta.'),
 ('Siempre es un canal iónico', 'Hay varias clases.'),
 ('Siempre está en el núcleo', 'Muchos están en la membrana.'),
 ('Produce la señal', 'Eso lo hace la célula señalizadora.')],
 'El cambio de forma inicia la transducción.', 'Receptor')
MATCH('receptores', I, CON, 'Relaciona cada señal hidrofóbica con su tipo.', [
 ['Cortisol, estradiol, testosterona', 'Hormonas esteroideas'], ['T3 y T4', 'Hormonas tiroideas'], ['Ácido retinoico', 'Retinoides'], ['Calcitriol', 'Vitamina D']],
 'Todas usan receptores nucleares.', 'Señales hidrofóbicas')
MC('receptores', I, COMP, 'El receptor nicotínico de acetilcolina del músculo esquelético es…', [
 ('Un receptor acoplado a canal iónico', 'Correcta: la acetilcolina abre el canal.'),
 ('Un receptor acoplado a proteína G', 'Ese es el receptor cardíaco (muscarínico).'),
 ('Un receptor tirosina cinasa', 'No.'),
 ('Un receptor nuclear', 'No.')],
 'Receptor ionotrópico.', 'Receptor nicotínico')
TF('interruptores', I, COMP, 'Una fosforilación siempre activa a la proteína que la recibe.', False,
 'Puede activarla o inactivarla según la proteína.',
 corr='El fosfato cambia la forma de la proteína: el efecto depende de cuál sea.', concepto='Fosforilación')
MC('interruptores', I, COMP, '¿Qué es una cascada de cinasas?', [
 ('Una serie de cinasas en la que cada una fosforila y activa a la siguiente', 'Correcta: ejemplo Raf → MEK → ERK.'),
 ('Un grupo de receptores juntos', 'No.'),
 ('Una vía que solo usa GTP', 'No.'),
 ('La degradación de cinasas', 'No.')],
 'Las cascadas amplifican y permiten regular en varios puntos.', 'Cascada de cinasas')
MATCH('interruptores', A, INT, 'Relaciona cada GTPasa con su GEF o activador.', [
 ['Proteína G trimérica', 'El GPCR activado'], ['Ras', 'Sos']],
 'El GEF siempre cambia GDP por GTP.', 'GEF')
MC('gpcr', I, CON, '¿Cómo están unidas a la membrana las subunidades de la proteína G?', [
 ('Por anclajes lipídicos en la cara citosólica', 'Correcta.'),
 ('Por siete hélices transmembrana', 'Esas son del receptor.'),
 ('No están unidas a la membrana', 'Sí lo están.'),
 ('Por puentes disulfuro con el ADN', 'No.')],
 'La proteína G es periférica, el receptor es transmembrana.', 'Proteína G')
MC('gpcr', I, COMP, '¿Qué relación hay entre el receptor y la proteína G?', [
 ('Son proteínas distintas: el receptor activa a la proteína G', 'Correcta.'),
 ('Son la misma proteína', 'No.'),
 ('La proteína G activa al receptor', 'Es al revés.'),
 ('La proteína G degrada al receptor', 'No.')],
 'Receptor (7 hélices) ≠ proteína G (αβγ).', 'GPCR y proteína G')
TF('gpcr', B, CON, 'Los receptores acoplados a proteínas G forman la familia más grande de receptores de superficie.', True,
 'Hay cientos en el ser humano.', concepto='GPCR')
MC('gpcr', A, RAZ, 'Una toxina impide que la Gαi se active. ¿Qué pasa con el AMPc en respuesta a señales inhibidoras?', [
 ('No baja como debería, porque la Gi no puede inhibir a la adenilil ciclasa', 'Correcta: es el mecanismo de la toxina de la tos ferina.'),
 ('Baja más de lo normal', 'Al revés.'),
 ('Se convierte en GMPc', 'No.'),
 ('Se forma IP₃', 'No.')],
 'Gi normalmente inhibe la adenilil ciclasa.', 'Gi')
MC('ampc', I, CON, '¿Cuánto puede aumentar la concentración de AMPc en segundos tras la señal?', [
 ('Unas veinte veces', 'Correcta (dato del Alberts).'),
 ('Nada: es constante', 'No.'),
 ('Un millón de veces', 'No.'),
 ('Solo un 1 %', 'No.')],
 'Por eso es un buen segundo mensajero.', 'AMPc')
MATCH('ampc', I, COMP, 'Relaciona cada componente de la vía del AMPc con su tipo de molécula.', [
 ['Gαs', 'Proteína de unión a GTP'], ['Adenilil ciclasa', 'Enzima de membrana'], ['AMPc', 'Segundo mensajero'], ['PKA', 'Serina/treonina cinasa']],
 'Distinguir el tipo de cada componente evita errores.', 'Vía del AMPc')
MC('ampc', A, INT, '¿Cómo conecta la vía del AMPc la señalización con la regulación génica?', [
 ('La PKA fosforila a CREB, que se une a elementos CRE y activa genes', 'Correcta: factor trans sobre elemento cis.'),
 ('El AMPc se une directamente al ADN', 'No.'),
 ('La adenilil ciclasa entra al núcleo', 'No.'),
 ('La fosfodiesterasa metila el ADN', 'No.')],
 'Respuesta lenta del AMPc.', 'CREB')
MC('calcio', I, COMP, '¿Dónde se almacena el Ca²⁺ que libera el IP₃?', [
 ('En el retículo endoplásmico', 'Correcta: el IP₃ abre sus canales de Ca²⁺.'),
 ('En el núcleo', 'No.'),
 ('En los ribosomas', 'No.'),
 ('En el aparato de Golgi exclusivamente', 'No es el reservorio principal descrito.')],
 'En el músculo, el equivalente es el retículo sarcoplásmico.', 'Reservorio de Ca2+')
MC('calcio', I, CON, '¿Qué fosfolípido de membrana corta la fosfolipasa C?', [
 ('PIP₂ (fosfatidilinositol 4,5-bisfosfato)', 'Correcta: da IP₃ y DAG.'),
 ('Cardiolipina', 'Es de la membrana interna mitocondrial.'),
 ('Colesterol', 'No es un fosfolípido.'),
 ('Fosfatidilcolina exclusivamente', 'No es el sustrato descrito.')],
 'Fosfolípido de inositol.', 'PIP2')
MATCH('calcio', I, COMP, 'Relaciona cada fosfolipasa C con su activador.', [
 ['PLC-β', 'Gαq (receptores acoplados a proteína G)'], ['PLC-γ', 'Receptores tirosina cinasa (dominio SH2)']],
 'Ambas producen IP₃ y DAG.', 'Fosfolipasas C')
MC('rtk', I, CON, '¿Cuántas hélices transmembrana tiene un receptor tirosina cinasa?', [
 ('Una', 'Correcta: un dominio extracelular, una hélice y un dominio cinasa citosólico.'),
 ('Siete', 'Así son los GPCR.'),
 ('Doce', 'No.'),
 ('Ninguna', 'Es transmembrana.')],
 'Estructura de un RTK.', 'RTK')
MATCH('rtk', B, CON, 'Relaciona cada factor de crecimiento con su sigla.', [
 ['Factor de crecimiento epidérmico', 'EGF'], ['Factor de crecimiento derivado de plaquetas', 'PDGF'], ['Factor de crecimiento nervioso', 'NGF'], ['Factor de crecimiento de fibroblastos', 'FGF']],
 'Todos actúan sobre RTK.', 'Factores de crecimiento')
MC('rtk', I, COMP, '¿A qué respuesta celular se asocia principalmente la vía Ras-MAP cinasa?', [
 ('Proliferación y diferenciación', 'Correcta: ERK regula genes en el núcleo.'),
 ('Relajación del músculo liso', 'Eso es la vía del NO.'),
 ('Degradación de glucógeno', 'Eso es la vía del AMPc.'),
 ('Contracción del músculo esquelético', 'Eso es Ca²⁺ y troponina.')],
 'Señales de factores de crecimiento.', 'Ras-MAPK')
MC('rtk', I, APL, '¿Cómo aumenta la insulina la entrada de glucosa al músculo?', [
 ('Su RTK activa PI3K-Akt, que lleva GLUT4 a la membrana', 'Correcta.'),
 ('Activa la adenilil ciclasa', 'No es su vía principal.'),
 ('Entra al núcleo como un esteroide', 'Es una proteína: usa receptor de membrana.'),
 ('Abre canales de Ca²⁺ del RE', 'No es el mecanismo.')],
 'GLUT4 está en vesículas intracelulares.', 'Insulina')
MC('rtk', I, CON, '¿Cómo funciona la vía JAK-STAT?', [
 ('Cinasas JAK asociadas al receptor fosforilan a las STAT, que dimerizan y van al núcleo', 'Correcta.'),
 ('Las STAT son proteínas G triméricas', 'No.'),
 ('JAK es un receptor nuclear', 'No.'),
 ('Produce AMPc', 'No.')],
 'Receptores de citocinas sin actividad cinasa propia.', 'JAK-STAT')
MC('rtk', I, CON, 'En la vía Wnt, ¿qué le pasa a la β-catenina cuando NO hay Wnt?', [
 ('Se degrada', 'Correcta: con Wnt se acumula y activa genes.'),
 ('Entra al núcleo y activa genes', 'Ocurre con Wnt.'),
 ('Se une al ADN directamente siempre', 'No.'),
 ('Se convierte en un receptor', 'No.')],
 'Vía Wnt/β-catenina (profundización).', 'Wnt')
MC('intracel', I, CON, '¿Dónde se encuentra el receptor de cortisol antes de unir la hormona?', [
 ('En el citosol, unido a chaperonas como Hsp90', 'Correcta.'),
 ('En la membrana plasmática', 'No: es intracelular.'),
 ('En la mitocondria', 'No.'),
 ('En la sangre', 'No.')],
 'Otros receptores nucleares ya están en el núcleo.', 'Receptor de cortisol')
MC('intracel', I, COMP, '¿Qué hace un receptor nuclear después de unirse a un HRE?', [
 ('Recluta coactivadores (o correpresores) que cambian la transcripción', 'Correcta.'),
 ('Fosforila tirosinas', 'No.'),
 ('Produce AMPc', 'No.'),
 ('Abre canales iónicos', 'No.')],
 'Actúa como factor de transcripción.', 'Receptores nucleares')
MC('intracel', A, INT, 'Desde el punto de vista de la regulación génica, el HRE y el receptor nuclear son respectivamente…', [
 ('Un elemento cis y un factor trans', 'Correcta.'),
 ('Un factor trans y un elemento cis', 'Al revés.'),
 ('Dos elementos cis', 'El receptor es una proteína difusible.'),
 ('Un operón y su represor', 'Los operones son bacterianos.')],
 'Integración con el tema de regulación.', 'HRE')
MC('intracel', I, COMP, '¿Qué enzima activa el GMPc en el músculo liso?', [
 ('La PKG (proteína cinasa dependiente de GMPc)', 'Correcta: baja el Ca²⁺ y relaja el músculo.'),
 ('La PKA', 'Responde al AMPc.'),
 ('La PKC', 'Responde a DAG y Ca²⁺.'),
 ('La Akt', 'Responde al PIP₃.')],
 'Vía del NO.', 'PKG')
MATCH('integracion', B, CON, 'Relaciona cada cinasa con el mensajero que la activa.', [
 ['PKA', 'AMPc'], ['PKC', 'DAG + Ca²⁺'], ['PKG', 'GMPc'], ['CaM-cinasa', 'Ca²⁺-calmodulina'], ['Akt', 'PIP₃ (y otras cinasas)']],
 'Cada segundo mensajero tiene su cinasa.', 'Cinasas')
