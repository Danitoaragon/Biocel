"""Banco: Comunicación celular y señalización (base: Alberts, cap. Señalización celular)."""
from qhelp import *
tema('senal')

# ================= PRINCIPIOS =================
MC('principios', B, CON, '¿Qué es la transducción de señales?', [
 ('Convertir una señal externa en cambios dentro de la célula', 'Correcta: el receptor recibe la señal y proteínas intracelulares la transmiten.'),
 ('Copiar el ADN antes de dividirse', 'Eso es la replicación.'),
 ('Transportar una hormona por la sangre', 'Eso es parte de la señalización endocrina, no la transducción.'),
 ('Sintetizar un neurotransmisor', 'Es solo la producción de la señal.')],
 'Señal → receptor → proteínas intracelulares → respuesta.', 'Transducción')
ORDER('principios', B, CON, 'Ordena los pasos generales de una vía de señalización.', [
 'Señal extracelular', 'Receptor', 'Proteínas de señalización intracelular', 'Proteínas efectoras', 'Respuesta celular'],
 'Es la lógica común a todas las vías.', 'Esquema general')
MATCH('principios', B, CON, 'Relaciona cada forma de señalización con su característica.', [
 ['Por contacto', 'Molécula de membrana que toca al receptor vecino'], ['Paracrina', 'Mediador local que actúa sobre células cercanas'], ['Sináptica', 'Neurotransmisor liberado en la sinapsis'], ['Endocrina', 'Hormona transportada por la sangre']],
 'La diferencia principal es la distancia que recorre la señal.', 'Formas de señalización')
MC('principios', B, CON, '¿Qué es la señalización autocrina?', [
 ('Cuando una célula responde a señales que ella misma secreta', 'Correcta.'),
 ('Cuando la señal viaja por la sangre', 'Eso es endocrina.'),
 ('Cuando dos células se tocan', 'Eso es por contacto.'),
 ('Cuando la señal es un gas', 'No es la definición.')],
 'Auto = a sí misma.', 'Autocrina')
MC('principios', I, COMP, '¿Por qué la señalización endocrina necesita receptores de muy alta afinidad?', [
 ('Porque la hormona se diluye en la sangre y llega en concentraciones muy bajas', 'Correcta.'),
 ('Porque las hormonas son siempre gases', 'No lo son.'),
 ('Porque la sinapsis es muy pequeña', 'Eso es la señalización sináptica.'),
 ('Porque las hormonas no tienen receptor', 'Sí lo tienen.')],
 'La sináptica, en cambio, usa concentraciones locales altas.', 'Endocrina')
MC('principios', I, COMP, '¿Qué permiten las uniones gap entre células vecinas?', [
 ('El paso directo de iones y moléculas pequeñas como Ca²⁺, AMPc e IP₃', 'Correcta: comunican los citoplasmas.'),
 ('El paso de proteínas grandes y ARNm', 'Solo pasan moléculas pequeñas.'),
 ('La fusión completa de las dos células', 'No se fusionan.'),
 ('El paso de hormonas por la sangre', 'No tiene relación.')],
 'Comunicación directa entre células vecinas.', 'Uniones gap')
MATCH('principios', I, COMP, 'Relaciona cada tejido con su respuesta a la acetilcolina.', [
 ['Músculo cardíaco', 'Disminuye la frecuencia y la fuerza'], ['Glándula salival', 'Estimula la secreción'], ['Músculo esquelético', 'Contracción (receptor canal iónico)']],
 'Misma señal, distintas respuestas según la célula.', 'Acetilcolina')
MC('principios', I, RAZ, '¿Qué determina principalmente la respuesta de una célula a una señal?', [
 ('El receptor y las proteínas intracelulares que expresa la célula diana', 'Correcta.'),
 ('Solo la estructura química de la señal', 'La misma señal produce respuestas distintas.'),
 ('La distancia que recorrió la señal', 'Define el tipo de señalización, no la respuesta.'),
 ('El tamaño de la célula señalizadora', 'No es determinante.')],
 'La especificidad está en la célula diana.', 'Especificidad')
TF('principios', I, COMP, 'Muchas células entran en apoptosis si no reciben las señales de supervivencia adecuadas.', True,
 'Las células dependen de una combinación de señales para sobrevivir, dividirse o diferenciarse.', concepto='Señales de supervivencia')
MATCH('principios', I, COMP, 'Relaciona cada tipo de respuesta con su mecanismo.', [
 ['Respuesta rápida (segundos-minutos)', 'Modifica proteínas que ya existen'], ['Respuesta lenta (horas)', 'Cambia la expresión génica']],
 'Por ejemplo, PKA fosforilando enzimas vs CREB activando genes.', 'Rapidez de la respuesta')
TF('principios', B, CON, 'Una misma molécula señalizadora siempre produce la misma respuesta en todas las células.', False,
 'Depende del receptor y de la maquinaria intracelular de cada célula.',
 corr='La acetilcolina contrae el músculo esquelético pero frena el corazón.', concepto='Especificidad')

# ================= RECEPTORES E INTERRUPTORES =================
MC('receptores', B, CON, '¿Por qué las hormonas esteroideas pueden usar receptores intracelulares?', [
 ('Son pequeñas e hidrofóbicas y cruzan la membrana', 'Correcta.'),
 ('Son proteínas grandes', 'Las proteínas grandes no cruzan la membrana.'),
 ('Viajan por uniones gap', 'No.'),
 ('Se unen siempre a canales iónicos', 'No.')],
 'Hidrosolubles → receptor de superficie.', 'Receptores intracelulares')
MATCH('receptores', B, CON, 'Relaciona cada señal con el tipo de receptor que usa.', [
 ['Cortisol', 'Receptor intracelular'], ['Adrenalina', 'Receptor acoplado a proteína G'], ['Factor de crecimiento (EGF)', 'Receptor tirosina cinasa'], ['Acetilcolina en el músculo esquelético', 'Receptor canal iónico']],
 'La química de la señal decide dónde está su receptor.', 'Tipos de receptores')
MATCH('receptores', B, CON, 'Relaciona cada clase de receptor de superficie con cómo funciona.', [
 ['Acoplado a canal iónico', 'La señal abre o cierra un canal'], ['Acoplado a proteína G', 'Activa una proteína G trimérica'], ['Acoplado a enzima', 'Tiene o activa actividad enzimática (cinasa)']],
 'Las tres grandes clases de receptores de superficie.', 'Receptores de superficie')
MC('receptores', I, CON, '¿Qué son los segundos mensajeros?', [
 ('Moléculas pequeñas producidas en la célula que difunden y propagan la señal', 'Correcta: AMPc, GMPc, Ca²⁺, IP₃, DAG.'),
 ('Hormonas que se secretan después de la primera', 'No.'),
 ('Los receptores de la membrana', 'No son receptores.'),
 ('Neurotransmisores de la segunda neurona', 'No.')],
 'La señal extracelular sería el "primer mensajero".', 'Segundos mensajeros')
MATCH('receptores', I, CON, 'Relaciona cada segundo mensajero con la enzima o el canal que lo genera o libera.', [
 ['AMPc', 'Adenilil ciclasa'], ['IP₃ y DAG', 'Fosfolipasa C'], ['GMPc', 'Guanilil ciclasa'], ['Ca²⁺ citosólico', 'Canales del RE abiertos por IP₃']],
 'Cada vía usa sus segundos mensajeros.', 'Segundos mensajeros')
MATCH('receptores', B, CON, 'Relaciona cada función de las proteínas de señalización intracelular.', [
 ['Relevo', 'Pasa la señal al siguiente componente'], ['Amplificación', 'Hace la señal más fuerte'], ['Integración', 'Combina señales de varias vías'], ['Andamiaje', 'Agrupa a varias proteínas de una vía']],
 'Las proteínas intracelulares no solo transmiten.', 'Proteínas de señalización')
MATCH('interruptores', B, CON, 'Relaciona cada enzima con lo que hace.', [
 ['Proteína cinasa', 'Añade un fosfato del ATP'], ['Proteína fosfatasa', 'Quita el fosfato'], ['GEF', 'Cambia GDP por GTP (enciende)'], ['GAP', 'Acelera la hidrólisis de GTP (apaga)']],
 'Dos tipos de interruptores moleculares.', 'Interruptores')
MC('interruptores', B, CON, '¿Sobre qué aminoácidos fosforilan las proteínas cinasas?', [
 ('Serina, treonina o tirosina', 'Correcta: tienen un grupo OH.'),
 ('Glicina y alanina', 'No tienen el grupo OH necesario.'),
 ('Solo cisteína', 'No.'),
 ('Solo lisina', 'La lisina se acetila, no se fosforila típicamente.')],
 'Serina/treonina cinasas y tirosina cinasas.', 'Fosforilación')
MC('interruptores', I, COMP, '¿Qué hace una GAP sobre una proteína de unión a GTP?', [
 ('Acelera la hidrólisis de su GTP y la apaga', 'Correcta: GAP = proteína activadora de la GTPasa.'),
 ('La enciende cambiando GDP por GTP', 'Eso lo hace el GEF.'),
 ('La fosforila', 'No es una cinasa.'),
 ('La degrada', 'No la degrada.')],
 'Activa la actividad GTPasa, no la proteína.', 'GAP')
TF('interruptores', I, COMP, 'Una proteína de unión a GTP está activa cuando tiene GDP unido.', False,
 'Está activa con GTP e inactiva con GDP.',
 corr='GTP = encendida; GDP = apagada.', concepto='Proteínas de unión a GTP')
MATCH('interruptores', I, CON, 'Relaciona cada proteína de unión a GTP con su tipo.', [
 ['Proteína G (αβγ)', 'Trimérica, asociada a GPCR'], ['Ras', 'Monomérica, en vías de RTK'], ['Rho, Rac, Cdc42', 'Monoméricas, controlan la actina']],
 'Todas funcionan como interruptores GTP/GDP.', 'GTPasas')
MC('interruptores', A, RAZ, '¿Por qué se dice que las proteínas de unión a GTP tienen un "temporizador" incorporado?', [
 ('Porque hidrolizan su propio GTP y se apagan solas después de un tiempo', 'Correcta.'),
 ('Porque solo funcionan de noche', 'No.'),
 ('Porque se degradan a una hora fija', 'No se degradan.'),
 ('Porque necesitan un reloj circadiano', 'No.')],
 'Su actividad GTPasa limita cuánto dura la señal.', 'Temporizador GTPasa')

# ================= GPCR =================
MC('gpcr', B, CON, '¿Cuántas veces atraviesa la membrana un receptor acoplado a proteína G?', [
 ('Siete', 'Correcta: siete hélices transmembrana.'),
 ('Una', 'Así son los RTK.'),
 ('Doce', 'No es la estructura de un GPCR.'),
 ('Ninguna', 'Es una proteína transmembrana.')],
 'GPCR = receptores de 7 hélices.', 'GPCR')
MC('gpcr', B, CON, '¿Qué subunidades tiene una proteína G trimérica?', [
 ('α, β y γ', 'Correcta: la α une GDP o GTP; βγ forman un complejo.'),
 ('Dos subunidades R y dos C', 'Esa es la PKA.'),
 ('α y β únicamente', 'Falta la γ.'),
 ('Cuatro α idénticas', 'No.')],
 'Proteína G = αβγ.', 'Proteína G')
ORDER('gpcr', I, MEC, 'Ordena el ciclo de activación de una proteína G.', [
 'La α tiene GDP y está unida a βγ', 'El ligando se une al receptor', 'El receptor hace que la α cambie GDP por GTP', 'α-GTP y βγ regulan sus dianas', 'La α hidroliza su GTP y se reasocia a βγ'],
 'El receptor activado actúa como GEF.', 'Ciclo de la proteína G')
MC('gpcr', I, MEC, '¿Qué papel tiene el receptor activado sobre la proteína G?', [
 ('Actúa como GEF: hace que la α cambie GDP por GTP', 'Correcta.'),
 ('Actúa como GAP: la apaga', 'No.'),
 ('La fosforila en tirosinas', 'No.'),
 ('La transporta al núcleo', 'No.')],
 'Receptor = intercambiador de nucleótido.', 'Activación de la proteína G')
TF('gpcr', I, COMP, 'Tanto la subunidad α-GTP como el complejo βγ pueden regular proteínas diana.', True,
 'Ejemplo: βγ de Gi abre canales de K⁺ en el corazón.', concepto='Proteína G')
MATCH('gpcr', I, CON, 'Relaciona cada proteína G con su efecto.', [
 ['Gs', 'Estimula la adenilil ciclasa'], ['Gi', 'Inhibe la adenilil ciclasa; βγ abre canales de K⁺'], ['Gq', 'Activa la fosfolipasa C-β']],
 'Familias de proteínas G según su subunidad α.', 'Familias de proteínas G')
MC('gpcr', I, MEC, '¿Cómo se apaga una proteína G?', [
 ('La α hidroliza su GTP a GDP y se reasocia a βγ', 'Correcta.'),
 ('Se degrada en el proteasoma después de cada señal', 'No.'),
 ('Se fosforila en tirosinas', 'No.'),
 ('Entra al núcleo', 'No.')],
 'La α tiene actividad GTPasa intrínseca.', 'Apagado de la proteína G')
MC('gpcr', A, RAZ, 'Si la α de una Gs no pudiera hidrolizar GTP, ¿qué ocurriría con el AMPc?', [
 ('Se produciría continuamente aunque no hubiera señal', 'Correcta: la adenilil ciclasa quedaría siempre activa.'),
 ('Desaparecería por completo', 'Al revés.'),
 ('No cambiaría', 'Sí cambia.'),
 ('Se convertiría en GMPc', 'No.')],
 'Es el mecanismo de la toxina del cólera.', 'Proteína G sin GTPasa')
MC('gpcr', I, COMP, 'En el corazón, ¿cómo disminuye la acetilcolina la frecuencia cardíaca?', [
 ('Activa una Gi cuyo complejo βγ abre canales de K⁺ y la célula se hiperpolariza', 'Correcta.'),
 ('Abre directamente canales de Na⁺', 'Eso ocurre en el músculo esquelético.'),
 ('Activa a la PLC-β y libera Ca²⁺', 'No es el mecanismo cardíaco descrito.'),
 ('Entra al núcleo y apaga genes', 'No.')],
 'Receptor acoplado a proteína G en el corazón.', 'Acetilcolina cardíaca')
MC('gpcr', I, COMP, '¿Qué es la desensibilización de un GPCR?', [
 ('La pérdida de respuesta cuando la señal persiste: GRK fosforila y se une la arrestina', 'Correcta: después el receptor puede endocitarse.'),
 ('El aumento de receptores en la membrana', 'Es lo contrario.'),
 ('La activación de la proteína G sin ligando', 'No.'),
 ('La degradación de la hormona en la sangre', 'No.')],
 'Adaptación a una señal persistente.', 'Desensibilización')
ORDER('gpcr', A, MEC, 'Ordena la desensibilización de un GPCR.', [
 'El receptor permanece activado por la señal', 'Una GRK fosforila al receptor', 'La arrestina se une al receptor fosforilado', 'El receptor deja de activar a la proteína G', 'El receptor se endocita'],
 'Puede regresar a la membrana o degradarse en lisosomas.', 'Desensibilización')
MATCH('gpcr', I, CON, 'Relaciona cada estímulo con un ejemplo de GPCR.', [
 ['Luz', 'Rodopsina'], ['Olores', 'Receptores olfativos'], ['Adrenalina', 'Receptor adrenérgico'], ['Glucagón', 'Receptor de glucagón']],
 'Los GPCR forman la familia más grande de receptores de superficie.', 'Ejemplos de GPCR')

# ================= AMPc =================
ORDER('ampc', B, MEC, 'Ordena la vía del AMPc.', [
 'La adrenalina se une a su GPCR', 'Se activa Gαs', 'Gαs activa la adenilil ciclasa', 'ATP → AMPc', 'El AMPc activa a la PKA', 'La PKA fosforila proteínas diana'],
 'Vía clásica de segundo mensajero.', 'Vía del AMPc')
MC('ampc', B, CON, '¿Qué enzima produce AMPc?', [
 ('La adenilil ciclasa', 'Correcta: ATP → AMPc.'),
 ('La fosfodiesterasa', 'Lo degrada.'),
 ('La PKA', 'Es activada por el AMPc.'),
 ('La fosfolipasa C', 'Produce IP₃ y DAG.')],
 'Enzima de membrana activada por Gαs.', 'Adenilil ciclasa')
MC('ampc', B, CON, '¿Qué enzima apaga la señal del AMPc?', [
 ('La AMPc fosfodiesterasa', 'Correcta: AMPc → AMP.'),
 ('La adenilil ciclasa', 'Lo produce.'),
 ('La PKC', 'No degrada AMPc.'),
 ('La NO sintasa', 'Produce NO.')],
 'Sin fosfodiesterasa, el AMPc se acumularía.', 'Fosfodiesterasa')
MC('ampc', I, MEC, '¿Cómo activa el AMPc a la PKA?', [
 ('Se une a las subunidades reguladoras, que liberan a las catalíticas', 'Correcta: PKA inactiva = R₂C₂.'),
 ('Fosforila a la PKA', 'El AMPc no es una cinasa.'),
 ('Corta a la PKA en dos', 'No.'),
 ('La lleva al retículo endoplásmico', 'No.')],
 'Las subunidades C libres fosforilan dianas.', 'PKA')
FILL('ampc', I, CON, 'En reposo, la PKA está formada por dos subunidades reguladoras y dos subunidades ______.', ['catalíticas', 'cataliticas'],
 'R₂C₂.', 'PKA')
MATCH('ampc', I, COMP, 'Relaciona cada respuesta de la PKA con su lugar y velocidad.', [
 ['Fosforilar enzimas del glucógeno', 'Citosol, rápida'], ['Fosforilar a CREB', 'Núcleo, lenta (genes)']],
 'La misma cinasa produce respuestas rápidas y lentas.', 'Respuestas de la PKA')
MC('ampc', I, CON, '¿Qué es CREB?', [
 ('Un factor de transcripción que fosforila la PKA y se une a secuencias CRE', 'Correcta.'),
 ('Una proteína G', 'No.'),
 ('Una fosfodiesterasa', 'No.'),
 ('Un receptor de membrana', 'No.')],
 'CRE = elemento de respuesta al AMPc.', 'CREB')
MC('ampc', I, APL, '¿Cómo libera glucosa el hígado en segundos cuando llega adrenalina o glucagón?', [
 ('La PKA fosforila enzimas que inician la degradación del glucógeno', 'Correcta: respuesta rápida sin genes nuevos.'),
 ('Se sintetizan enzimas nuevas por transcripción', 'Eso tardaría horas.'),
 ('El AMPc se convierte en glucosa', 'No.'),
 ('El receptor transporta glucosa', 'No.')],
 'Modificación de proteínas existentes.', 'Glucógeno')
TF('ampc', I, COMP, 'Un inhibidor de la fosfodiesterasa prolonga y aumenta la señal del AMPc.', True,
 'Si no se degrada el AMPc, la PKA sigue activa más tiempo.', concepto='Fosfodiesterasa')
MC('ampc', A, RAZ, 'Una célula tiene una PKA mutante cuyas subunidades R no pueden unir AMPc. ¿Qué esperas?', [
 ('La PKA queda inactiva aunque suba el AMPc', 'Correcta: las C nunca se liberan.'),
 ('La PKA queda siempre activa', 'Al revés.'),
 ('Aumenta la producción de AMPc', 'No es el efecto directo.'),
 ('Se activa la PKC en su lugar', 'No.')],
 'El AMPc actúa a través de su unión a R.', 'PKA')

# ================= CALCIO / PLC =================
ORDER('calcio', I, MEC, 'Ordena la vía de la fosfolipasa C-β.', [
 'La señal se une a un GPCR', 'Se activa Gαq', 'Gαq activa la fosfolipasa C-β', 'La PLC-β corta PIP₂ en IP₃ y DAG', 'El IP₃ libera Ca²⁺ del RE', 'DAG + Ca²⁺ activan a la PKC'],
 'Dos segundos mensajeros de una sola reacción.', 'Vía de la PLC')
MATCH('calcio', B, CON, 'Relaciona cada segundo mensajero con su función.', [
 ['IP₃', 'Abre canales de Ca²⁺ del retículo endoplásmico'], ['DAG', 'Activa a la PKC junto con el Ca²⁺'], ['Ca²⁺', 'Activa a la calmodulina y otras dianas']],
 'Productos de la fosfolipasa C.', 'IP3, DAG y Ca2+')
MC('calcio', I, COMP, '¿Por qué el DAG permanece en la membrana y el IP₃ difunde por el citosol?', [
 ('El DAG es lipídico y el IP₃ es hidrosoluble', 'Correcta.'),
 ('El DAG es una proteína y el IP₃ un lípido', 'Al revés en polaridad.'),
 ('Ambos difunden por el citosol', 'No.'),
 ('El IP₃ está anclado al ADN', 'No.')],
 'Polaridad = localización.', 'IP3 y DAG')
MC('calcio', I, CON, '¿Qué concentración aproximada tiene el Ca²⁺ en el citosol en reposo?', [
 ('Muy baja, alrededor de 10⁻⁷ M', 'Correcta: miles de veces menor que afuera y en el RE.'),
 ('Igual que en el exterior', 'No.'),
 ('Más alta que en el retículo', 'Al revés.'),
 ('No hay Ca²⁺ en el citosol', 'Hay, pero muy poco.')],
 'Por eso un aumento pequeño es una señal eficaz.', 'Ca2+')
MC('calcio', B, CON, '¿Qué proteína media la mayoría de los efectos del Ca²⁺ en las células no musculares?', [
 ('La calmodulina', 'Correcta: tiene cuatro sitios de unión a Ca²⁺.'),
 ('La troponina', 'Es el sensor de Ca²⁺ del músculo esquelético.'),
 ('La PKA', 'Responde al AMPc.'),
 ('La arrestina', 'Desensibiliza GPCR.')],
 'Ca²⁺-calmodulina activa CaM-cinasas.', 'Calmodulina')
FILL('calcio', I, CON, 'La calmodulina tiene ______ sitios de unión a Ca²⁺.', ['4', 'cuatro'],
 'Al unir Ca²⁺ cambia de forma y activa dianas.', 'Calmodulina')
MC('calcio', I, COMP, '¿Cómo mantiene la célula baja la concentración de Ca²⁺ en el citosol?', [
 ('Con bombas que gastan ATP y lo sacan al exterior o al RE', 'Correcta.'),
 ('Con la fosfodiesterasa', 'Degrada AMPc.'),
 ('Uniéndolo al ADN', 'No.'),
 ('Convirtiéndolo en IP₃', 'No.')],
 'También apagan la señal de Ca²⁺.', 'Bombas de Ca2+')
MATCH('calcio', A, INT, 'Relaciona cada sensor de Ca²⁺ con su contexto.', [
 ['Troponina', 'Contracción del músculo esquelético'], ['Calmodulina', 'Mayoría de las células: CaM-cinasas'], ['PKC', 'Junto con DAG en la membrana']],
 'Integración con el tema de citoesqueleto.', 'Sensores de Ca2+')
TF('calcio', I, COMP, 'El IP₃ activa directamente a la proteína cinasa C.', False,
 'El IP₃ libera Ca²⁺ del RE; la PKC la activan DAG + Ca²⁺.',
 corr='IP₃ → Ca²⁺; DAG + Ca²⁺ → PKC.', concepto='PKC')

# ================= RTK =================
MC('rtk', B, CON, '¿Qué tipo de señales usan principalmente los receptores tirosina cinasa?', [
 ('Factores de crecimiento e insulina', 'Correcta: EGF, PDGF, FGF, NGF, insulina.'),
 ('Hormonas esteroideas', 'Usan receptores intracelulares.'),
 ('Luz y olores', 'Usan GPCR.'),
 ('Óxido nítrico', 'Actúa sobre la guanilil ciclasa.')],
 'RTK = principal tipo de receptor acoplado a enzima.', 'RTK')
ORDER('rtk', B, MEC, 'Ordena la activación de un receptor tirosina cinasa.', [
 'La señal se une al receptor', 'Dos receptores forman un dímero', 'Cada uno fosforila tirosinas del otro', 'Proteínas con dominio SH2 se unen a las tirosinas fosforiladas', 'Se activan vías como Ras-MAPK y PI3K-Akt'],
 'Autofosforilación cruzada.', 'Activación de RTK')
MC('rtk', I, CON, '¿Qué reconocen los dominios SH2?', [
 ('Tirosinas fosforiladas', 'Correcta: son sitios de anclaje en el receptor activado.'),
 ('El GTP de Ras', 'No.'),
 ('El AMPc', 'Lo reconocen las subunidades R de la PKA.'),
 ('El PIP₃', 'Lo reconocen los dominios PH.')],
 'SH2 = fosfotirosina; PH = fosfoinosítidos.', 'Dominio SH2')
TF('rtk', I, CON, 'El receptor de insulina ya es un dímero (α₂β₂) antes de unir la hormona.', True,
 'La insulina cambia su conformación y activa la autofosforilación.', concepto='Receptor de insulina')
MC('rtk', I, COMP, '¿Por qué un solo RTK puede activar varias vías a la vez?', [
 ('Cada tirosina fosforilada ancla a una proteína distinta', 'Correcta: Grb2, PI3K, PLC-γ…'),
 ('Porque tiene siete hélices transmembrana', 'Eso es un GPCR.'),
 ('Porque produce AMPc', 'No.'),
 ('Porque entra al núcleo', 'No.')],
 'La señal se ramifica.', 'RTK')
ORDER('rtk', I, MEC, 'Ordena la vía Ras-MAP cinasa.', [
 'RTK fosforilado', 'Grb2 se une con su dominio SH2', 'Sos cambia GDP por GTP en Ras', 'Ras-GTP activa a Raf', 'Raf → MEK → ERK', 'ERK entra al núcleo y fosforila reguladores de genes'],
 'Módulo de tres cinasas.', 'Ras-MAPK')
MATCH('rtk', I, CON, 'Relaciona cada componente de la vía Ras con su función.', [
 ['Grb2', 'Adaptador con dominio SH2'], ['Sos', 'GEF de Ras'], ['Ras-GAP', 'Apaga a Ras'], ['ERK', 'MAP cinasa que entra al núcleo']],
 'Ras es una GTPasa monomérica.', 'Vía Ras')
MATCH('rtk', I, CON, 'Relaciona cada cinasa del módulo MAP con su nombre genérico.', [
 ['Raf', 'MAPKKK'], ['MEK', 'MAPKK'], ['ERK', 'MAPK']],
 'Cada una fosforila y activa a la siguiente.', 'Módulo MAP cinasa')
MC('rtk', I, COMP, '¿Qué tipo de proteína es Sos?', [
 ('Un GEF que activa a Ras', 'Correcta.'),
 ('Una GAP que apaga a Ras', 'No.'),
 ('Una cinasa de tirosinas', 'No.'),
 ('Un factor de transcripción', 'No.')],
 'Sos = Son of sevenless.', 'Sos')
MC('rtk', A, RAZ, 'Una mutación impide que Ras hidrolice su GTP. ¿Qué es lo esperable?', [
 ('Señal de proliferación continua aunque no haya factor de crecimiento', 'Correcta: Ras queda siempre activa.'),
 ('La célula deja de responder a factores de crecimiento', 'Al revés.'),
 ('Ras se degrada', 'No.'),
 ('Aumenta el AMPc', 'No es su vía.')],
 'Ras mutado es frecuente en tumores.', 'Ras siempre activa')
MC('rtk', I, MEC, '¿Qué produce la PI3K?', [
 ('PIP₃ a partir de PIP₂', 'Correcta: un sitio de anclaje en la membrana.'),
 ('IP₃ y DAG', 'Eso lo produce la fosfolipasa C.'),
 ('AMPc', 'Lo produce la adenilil ciclasa.'),
 ('GMPc', 'Lo produce la guanilil ciclasa.')],
 'PI3K = fosfoinosítido 3-cinasa.', 'PI3K')
MATCH('rtk', I, COMP, 'Relaciona cada efecto de Akt con su mecanismo.', [
 ['Supervivencia', 'Fosforila a Bad, que deja de inhibir a Bcl-2'], ['Crecimiento celular', 'Activa la vía mTOR'], ['Captación de glucosa', 'Lleva GLUT4 a la membrana']],
 'Akt = PKB.', 'Akt')
MC('rtk', I, COMP, '¿Qué fosfatasa apaga la vía PI3K-Akt?', [
 ('PTEN, que quita el fosfato al PIP₃', 'Correcta.'),
 ('La fosfodiesterasa', 'Degrada AMPc.'),
 ('La Ras-GAP', 'Apaga a Ras.'),
 ('La arrestina', 'Desensibiliza GPCR.')],
 'Cada encendido tiene su apagado.', 'PTEN')
MC('rtk', I, CON, '¿Qué dominio permite a Akt unirse al PIP₃?', [
 ('Dominio PH', 'Correcta: une fosfoinosítidos.'),
 ('Dominio SH2', 'Une fosfotirosinas.'),
 ('Hélices transmembrana', 'Akt es citosólica.'),
 ('Dedo de zinc', 'Es un dominio de unión al ADN.')],
 'PH = homología a pleckstrina.', 'Dominio PH')
MC('rtk', A, INT, '¿Cómo conecta Akt la señalización con la mitocondria?', [
 ('Fosforila a Bad e impide la apoptosis mitocondrial', 'Correcta: Bcl-2 sigue protegiendo la membrana externa.'),
 ('Produce ATP directamente', 'No.'),
 ('Abre la ATP sintasa', 'No.'),
 ('Importa proteínas por TOM', 'No.')],
 'Integración con el tema de mitocondria.', 'Akt y apoptosis')
MATCH('rtk', A, CON, 'Relaciona cada vía con su receptor y su idea clave.', [
 ['JAK-STAT', 'Citocinas; las STAT van al núcleo'], ['TGF-β', 'Receptor serina/treonina cinasa; Smad'], ['Notch', 'Contacto; la cola del receptor va al núcleo'], ['Wnt', 'La β-catenina se acumula y activa genes']],
 'Otras vías (profundización).', 'Otras vías')

# ================= INTRACELULARES Y NO =================
MATCH('intracel', B, CON, 'Relaciona cada señal con su tipo de receptor.', [
 ['Cortisol', 'Receptor nuclear'], ['Hormona tiroidea', 'Receptor nuclear'], ['Óxido nítrico', 'Guanilil ciclasa intracelular'], ['Insulina', 'Receptor tirosina cinasa']],
 'Señales hidrofóbicas y gases cruzan la membrana.', 'Receptores intracelulares')
ORDER('intracel', I, MEC, 'Ordena la acción del cortisol sobre su célula diana.', [
 'El cortisol cruza la membrana', 'Se une a su receptor en el citosol', 'El receptor se libera de Hsp90 y cambia de forma', 'El complejo entra al núcleo', 'Se une a un HRE y activa genes'],
 'Receptor y factor de transcripción a la vez.', 'Receptores nucleares')
MC('intracel', I, CON, '¿Qué es un HRE?', [
 ('Un elemento de respuesta a la hormona en el ADN', 'Correcta: un elemento cis donde se une el receptor nuclear.'),
 ('Un receptor de membrana', 'No.'),
 ('Una proteína G', 'No.'),
 ('Una enzima que degrada hormonas', 'No.')],
 'Conexión con regulación génica.', 'HRE')
MC('intracel', I, COMP, '¿Qué diferencia hay entre la respuesta primaria y la secundaria a una hormona esteroidea?', [
 ('Primaria: genes activados directamente; secundaria: genes regulados por esos productos', 'Correcta.'),
 ('Primaria: en el citosol; secundaria: en la sangre', 'No.'),
 ('Primaria: por AMPc; secundaria: por Ca²⁺', 'No.'),
 ('No hay diferencia', 'Sí la hay.')],
 'La respuesta tarda horas y se amplía en dos fases.', 'Respuesta primaria y secundaria')
TF('intracel', I, COMP, 'Los receptores nucleares funcionan a la vez como receptores y como reguladores de la transcripción.', True,
 'Unen la hormona y luego se unen al ADN.', concepto='Receptores nucleares')
ORDER('intracel', I, MEC, 'Ordena la vía del óxido nítrico en un vaso sanguíneo.', [
 'La acetilcolina actúa sobre el endotelio', 'Sube el Ca²⁺ y se activa la NO sintasa', 'Se forma NO a partir de arginina', 'El NO activa la guanilil ciclasa del músculo liso', 'Se forma GMPc', 'El músculo liso se relaja'],
 'El NO dura solo segundos.', 'Óxido nítrico')
MC('intracel', I, CON, '¿De qué aminoácido se forma el óxido nítrico?', [
 ('Arginina', 'Correcta: por la NO sintasa.'),
 ('Triptófano', 'No.'),
 ('Tirosina', 'No.'),
 ('Glicina', 'No.')],
 'Arginina → NO + citrulina.', 'Óxido nítrico')
MC('intracel', I, COMP, '¿Por qué el óxido nítrico actúa solo localmente?', [
 ('Porque es inestable y dura apenas segundos', 'Correcta.'),
 ('Porque no cruza membranas', 'Sí las cruza.'),
 ('Porque solo existe en el núcleo', 'No.'),
 ('Porque se une a la hemoglobina siempre', 'No es la razón descrita.')],
 'Mediador local gaseoso.', 'Óxido nítrico')
MATCH('intracel', I, CON, 'Relaciona cada ciclasa con su producto y su activador.', [
 ['Adenilil ciclasa', 'AMPc, activada por Gαs'], ['Guanilil ciclasa', 'GMPc, activada por NO']],
 'Dos ciclasas, dos nucleótidos cíclicos.', 'Ciclasas')

# ================= INTEGRACIÓN =================
MATCH('integracion', I, CON, 'Relaciona cada componente con su mecanismo de apagado.', [
 ['Proteína G', 'Hidroliza su GTP'], ['AMPc', 'Fosfodiesterasa'], ['Proteínas fosforiladas', 'Fosfatasas'], ['Receptor activado', 'GRK + arrestina; endocitosis'], ['Ca²⁺ citosólico', 'Bombas al RE o al exterior']],
 'Cada encendido tiene un apagado.', 'Terminación de la señal')
MC('integracion', B, COMP, '¿Por qué una concentración muy baja de hormona puede producir una respuesta grande?', [
 ('Porque las cascadas amplifican la señal en cada paso', 'Correcta.'),
 ('Porque la hormona se multiplica en la sangre', 'No.'),
 ('Porque cada receptor une miles de hormonas', 'No.'),
 ('Porque no hay mecanismos de apagado', 'Sí los hay.')],
 'Amplificación.', 'Amplificación')
MC('integracion', I, COMP, '¿Qué hacen las proteínas de andamiaje?', [
 ('Agrupan a los componentes de una vía para que la señal vaya al lugar correcto', 'Correcta.'),
 ('Degradan las hormonas', 'No.'),
 ('Forman los canales de las uniones gap', 'No.'),
 ('Producen segundos mensajeros', 'No.')],
 'Aumentan la rapidez y la especificidad.', 'Andamiaje')
MATCH('integracion', A, INT, 'Relaciona cada tema con su conexión con la señalización.', [
 ['Citoesqueleto', 'Ca²⁺ y GTPasas Rho'], ['Regulación génica', 'CREB y receptores nucleares sobre elementos cis'], ['Mitocondria', 'Akt inhibe la apoptosis vía Bad'], ['Dogma central', 'Respuestas lentas con síntesis de proteínas nuevas']],
 'La señalización integra todo lo visto.', 'Integración')
MC('integracion', I, RAZ, '¿Por qué es tan importante apagar una señal como encenderla?', [
 ('Para que la respuesta dure solo lo que dura el estímulo', 'Correcta: si no, la célula respondería sin control.'),
 ('Para ahorrar receptores', 'No es la razón principal.'),
 ('Para producir más hormona', 'No.'),
 ('Para degradar el ADN', 'No.')],
 'Ejemplo: Ras o Gs que no se apagan.', 'Terminación de la señal')
MATCH('integracion', I, MEC, 'Relaciona cada toxina o alteración con su mecanismo.', [
 ['Toxina del cólera', 'Gαs no hidroliza GTP: AMPc alto'], ['Toxina de la tos ferina', 'Gαi no se activa'], ['Ras mutado', 'Señal de proliferación continua']],
 'Importancia médica a nivel de mecanismo.', 'Alteraciones de la señalización')
MC('integracion', I, COMP, '¿Qué significa que algunas proteínas de señalización son "integradores"?', [
 ('Solo se activan cuando reciben dos o más señales a la vez', 'Correcta.'),
 ('Se integran en el ADN', 'No.'),
 ('Forman parte de la membrana', 'No necesariamente.'),
 ('Son siempre receptores', 'No.')],
 'Las vías forman una red, no líneas aisladas.', 'Integración de señales')
MC('integracion', B, CON, '¿Cuál es el segundo mensajero que produce la guanilil ciclasa?', [
 ('GMPc', 'Correcta.'),
 ('AMPc', 'Lo produce la adenilil ciclasa.'),
 ('IP₃', 'Lo produce la PLC.'),
 ('DAG', 'Lo produce la PLC.')],
 'Vía del NO.', 'GMPc')
