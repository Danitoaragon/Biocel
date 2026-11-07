// =====================================================================
// FUNCIONES ADAPTATIVAS (se suman a lo anterior; no reemplazan nada)
// =====================================================================
const M=window.META||{},DIAPOS=window.DIAPOS||[],PR=window.PROG;
const QI={};BANCO.forEach(q=>QI[q.id]=q);
const enc=s=>encodeURIComponent(s).replace(/-/g,'%2D');
const dec=s=>{try{return decodeURIComponent(s)}catch(e){return s}};
const fdate=ts=>ts?new Date(ts).toLocaleDateString('es-MX',{day:'numeric',month:'short',year:'numeric'}):'—';
const IMPL={r:'🔴 Alto rendimiento',y:'🟡 Importante',w:'⚪ Complementario'};
const PANELR=['panel','progreso','reforzar','comparar','buscar','plan','guardados','mapa','continuar','concepto'];
function persist(){try{localStorage.setItem(KEY,JSON.stringify(ST))}catch(e){}}
function subOfConcept(t,c){const q=BANCO.find(q=>q.tema===t&&q.con===c);if(q)return q.sub;const f=(CONC[t]||[]).find(f=>f[0]===c);return f?f[2]:null}
function conceptLoc(t,c,s){if(c&&c[0]==='§')s=c.slice(1);else{const L=M.CONLOC&&M.CONLOC[t]&&M.CONLOC[t][c];if(L)return L;s=s||subOfConcept(t,c)}return (s&&M.SUBLOC[t][s])||[0,-1]}
function studyHref(q){return `#concepto-${q.tema}-${enc(q.con||('§'+q.sub))}`}
function practHref(t,c,s){return `#reforzar-${t}-${enc(c||('§'+s))}`}
function conLabel(t,c,s){return c||('Subtema: '+(SUB[t][s]||s))}
const NEWR={
  panel:()=>vPanel(),
  progreso:()=>vProgreso(),
  reforzar:h=>h[1]&&T[h[1]]?runReforzar(h[1],dec(h.slice(2).join('-'))):vReforzar(),
  comparar:()=>vComparar(),
  buscar:h=>vBuscar(dec(h.slice(1).join('-'))),
  plan:()=>vPlan(),
  guardados:()=>vGuardados(),
  mapa:h=>vMapa(h[1]&&T[h[1]]?h[1]:''),
  continuar:()=>{const c=ST.cont;if(c&&LIB[c.t]){vRead(c.t,c.k)}else{vLibros();app.insertAdjacentHTML('afterbegin','<div class="empty" style="margin-bottom:16px">Todavía no hay una lectura guardada en este navegador. Elige un capítulo para empezar.</div>')}},
  concepto:h=>{const t=h[1];if(!T[t])return vLibros();const c=dec(h.slice(2).join('-'));const L=conceptLoc(t,c);vRead(t,L[0],L[1],c[0]==='§'?'':c)}
};
// ---------- LIBRO: prioridad, guardar, notas, «explicación del mecanismo», paso a paso ----------
function enhanceBook(t,art,i,hh,term){
  const imp=(M.IMP||{})[t]||{};
  art.querySelectorAll('section.bsec').forEach(sec=>{
    const k=+sec.dataset.k,secImp=imp[String(k)];let h=-1,cur=secImp||'pre',anyR=secImp==='r';
    [...sec.children].forEach(el=>{
      if(el.tagName==='H2'){decorateHead(t,k,-1,el,secImp);el.dataset.blk='keep';return}
      if(el.classList.contains('pk')){el.dataset.blk='keep';return}
      if(el.tagName==='H3'){h++;cur=secImp||imp[k+'.'+h]||'n';if(cur==='r')anyR=true;decorateHead(t,k,h,el,secImp?null:imp[k+'.'+h])}
      el.dataset.blk=cur;el.dataset.hb=h;
    });
    if(!anyR)sec.classList.add('nor');
    sec.querySelectorAll(':scope>.box.prof').forEach(b=>{const n=b.nextElementSibling;if(n&&/^(P|UL|OL|FIGURE|DIV)$/.test(n.tagName)&&!n.classList.contains('box')&&!n.classList.contains('notes')){const d=document.createElement('div');d.className='mechlbl';d.dataset.blk=b.dataset.blk;d.dataset.hb=b.dataset.hb;d.textContent='🔬 Explicación del mecanismo';b.after(d)}});
  });
  // solo alto rendimiento
  const rb=$('#rt-r');const setR=on=>{art.classList.toggle('onlyr',on);rb.classList.toggle('on',on);rb.textContent=on?'🔴 Mostrar todo':'🔴 Solo alto rendimiento';let nb=art.querySelector('.onlyr-note');
    if(on&&!nb){nb=document.createElement('div');nb.className='onlyr-note';nb.innerHTML='Mostrando sólo lo marcado como <b>🔴 alto rendimiento</b> (prioridad de estudio sugerida, no indicada por el profesor). <button type="button">Mostrar todo</button>';nb.querySelector('button').onclick=()=>{RP.onlyr=false;svRP();setR(false)};art.querySelector('h1.ct').after(nb)}if(!on&&nb)nb.remove()};
  rb.onclick=()=>{RP.onlyr=!RP.onlyr;svRP();setR(RP.onlyr)};setR(!!RP.onlyr);
  // animaciones paso a paso
  art.querySelectorAll('figure.fig[data-f]').forEach(f=>{const st=(M.PASOS||{})[f.dataset.f];if(st)setupStepper(f,st)});
}
function svRP(){try{localStorage.setItem('bc-read',JSON.stringify(RP))}catch(e){}}
function decorateHead(t,k,h,el,imp){
  const key=t+'|'+k+'|'+h,tit=el.textContent.trim();
  if(imp&&IMPL[imp])el.insertAdjacentHTML('beforeend',` <span class="imp imp-${imp}" title="Prioridad de estudio sugerida">${IMPL[imp]}</span>`);
  const tools=document.createElement('span');tools.className='htools';
  tools.innerHTML=`<button type="button" data-bm title="Guardar para repasar" aria-label="Guardar para repasar">🔖</button><button type="button" data-nt title="Agregar una nota personal" aria-label="Agregar una nota">📝</button>`;
  el.appendChild(tools);
  const nb=document.createElement('div');nb.className='notes';el.after(nb);
  const bm=tools.querySelector('[data-bm]');const paint=()=>{const on=!!ST.marks[key];bm.classList.toggle('on',on);bm.title=on?'Guardado · pulsa para quitar':'Guardar para repasar'};paint();
  bm.onclick=()=>{if(ST.marks[key])delete ST.marks[key];else ST.marks[key]={t,k,h,tit,when:Date.now()};persist();paint()};
  const draw=()=>{const N=ST.notes[key];nb.innerHTML=(N&&N.items.length?N.items.map((x,j)=>`<div class="note"><div>${esc(x.txt).replace(/\n/g,'<br>')}</div><div class="muted" style="font-size:12px">📝 Mi nota · ${fdate(x.when)} <button type="button" data-del="${j}">Borrar</button></div></div>`).join(''):'');
    nb.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{N.items.splice(+b.dataset.del,1);if(!N.items.length)delete ST.notes[key];persist();draw()})};draw();
  tools.querySelector('[data-nt]').onclick=()=>{if(nb.querySelector('textarea'))return;const w=document.createElement('div');w.className='note edit';w.innerHTML=`<textarea rows="3" placeholder="Escribe tu nota sobre «${esc(tit)}»"></textarea><div class="row"><button class="btn" type="button">Guardar nota</button><button class="btn ghost" type="button">Cancelar</button></div>`;nb.appendChild(w);const ta=w.querySelector('textarea');ta.focus();
    const [ok,no]=w.querySelectorAll('button');no.onclick=()=>w.remove();ok.onclick=()=>{const v=ta.value.trim();if(!v){ta.focus();return}const N=ST.notes[key]||(ST.notes[key]={t,k,h,tit,items:[]});N.items.push({txt:v,when:Date.now()});persist();draw()}};
}
function flashTerm(art,k,hh,term){
  const sec=art.querySelector('#s'+k);if(!sec)return;
  const els=[...sec.children].filter(el=>hh==null||hh<0||+el.dataset.hb===hh);
  const cands=[term,term.split(' (')[0],term.split(/[\/(]/)[0].trim()].filter((x,j,a)=>x&&x.length>2&&a.indexOf(x)===j);
  let n=0;
  for(const c of cands){const re=new RegExp(c.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i');
    for(const el of els){if(n>=3)break;const tw=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,{acceptNode:x=>x.parentElement.closest('svg,.htools,.notes,mark')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});const nodes=[];while(tw.nextNode())nodes.push(tw.currentNode);
      for(const tn of nodes){if(n>=3)break;const m=re.exec(tn.data);if(!m)continue;const r=document.createRange();r.setStart(tn,m.index);r.setEnd(tn,m.index+m[0].length);const mk=document.createElement('mark');mk.className='hl';r.surroundContents(mk);n++}}
    if(n)break}
  const hd=hh!=null&&hh>=0?art.querySelector('#s'+k+'h'+hh):sec.querySelector('h2');if(hd){hd.classList.add('flash');setTimeout(()=>hd.classList.remove('flash'),2600)}
}
const ONESHOT=['fi','sl','sr','pp','dr','gr','gy','mv1'];
function setupStepper(f,steps){
  const els=[...f.querySelectorAll('[style*="--d"]')].map(el=>{const m=/--d:\s*([\d.]+)s/.exec(el.getAttribute('style')||'');return m?{el,d:+m[1]}:null}).filter(Boolean);
  const box=document.createElement('div');box.className='stepper';
  box.innerHTML=`<div class="stxt"><b>▶ Animación paso a paso</b> · Avanza a tu ritmo: cada paso explica una parte del proceso.</div><div class="sctl"><button type="button" data-s="prev" disabled>◀ Anterior</button><button type="button" data-s="play">▶ Reproducir</button><button type="button" data-s="next">Siguiente ▶</button><span class="snum muted"></span></div>`;
  f.appendChild(box);
  const txt=box.querySelector('.stxt'),num=box.querySelector('.snum'),bp=box.querySelector('[data-s=prev]'),bn=box.querySelector('[data-s=next]'),bpl=box.querySelector('[data-s=play]');
  let i=-1,timer=null;
  function reset(){stop();i=-1;delete f.dataset.step;els.forEach(o=>{const s=o.el.style;s.display='';s.animation='';s.opacity='';s.strokeDashoffset='';s.setProperty('--d',o.d+'s')});
    txt.innerHTML='<b>▶ Animación paso a paso</b> · Avanza a tu ritmo: cada paso explica una parte del proceso.';num.textContent='';bp.disabled=true;bn.disabled=false}
  function show(n){i=Math.max(0,Math.min(steps.length-1,n));const lo=i>0?steps[i-1][0]:-1,hi=steps[i][0],base=i>0?lo:0;f.dataset.step=i;f.classList.remove('on');void f.offsetWidth;
    els.forEach(o=>{const s=o.el.style;if(o.d>hi){s.display='none';return}s.display='';
      if(o.d<=lo){if(ONESHOT.some(c=>o.el.classList.contains(c))){s.animation='none';s.opacity='1';if(o.el.classList.contains('dr'))s.strokeDashoffset='0'}s.setProperty('--d',o.d+'s')}
      else{s.animation='';s.opacity='';s.strokeDashoffset='';s.setProperty('--d',Math.max(0,o.d-base).toFixed(2)+'s')}});
    f.classList.add('on');txt.innerHTML=`<b>Paso ${i+1} de ${steps.length}.</b> ${esc(steps[i][1])}`;num.textContent='';bp.disabled=i===0;bn.disabled=i===steps.length-1}
  function stop(){if(timer){clearTimeout(timer);timer=null}bpl.textContent=i>=0&&i<steps.length-1?'▶ Continuar':'▶ Reproducir'}
  function play(){if(timer){stop();return}if(i>=steps.length-1)i=-1;const tick=()=>{show(i+1);const lo=i>0?steps[i-1][0]:0,dur=(steps[i][0]-lo)*1000+2600;if(i<steps.length-1){timer=setTimeout(tick,dur)}else{timer=null;bpl.textContent='▶ Reproducir'}};bpl.textContent='⏸ Pausa';tick()}
  bp.onclick=()=>{stop();show(i-1)};bn.onclick=()=>{stop();show(i+1)};bpl.onclick=play;
  const rp=f.querySelector('.replay');if(rp)rp.onclick=()=>{reset();playFig(f)};
  f._stp={reset};
}
// ---------- conceptos de una lista de respuestas (resultados) ----------
function endConcepts(res,host,donde){
  if(!host)return;const G={};res.forEach(({q,ok})=>{const k=q.tema+'|'+(q.con||('§'+q.sub));const g=G[k]||(G[k]={t:q.tema,s:q.sub,c:q.con||'',y:0,x:0});g.y++;if(!ok)g.x++});
  const W=Object.values(G).filter(g=>g.x).sort((a,b)=>b.x-a.x||b.x/b.y-a.x/a.y).slice(0,8);if(!W.length)return;
  const d=document.createElement('div');d.className='cpanel';
  d.innerHTML=`<h3>⚠️ Conceptos a reforzar ${donde}</h3><table class="tbl2"><tr><th>Concepto</th><th>Errores</th><th></th></tr>${W.map(g=>`<tr><td><b>${esc(conLabel(g.t,g.c,g.s))}</b><br><span class="muted" style="font-size:13px">${esc(T[g.t])} · ${esc(SUB[g.t][g.s]||'')}</span></td><td>${g.x} ${g.x===1?'error':'errores'} de ${g.y} ${g.y===1?'pregunta':'preguntas'}</td><td class="acts"><a href="${studyHref({tema:g.t,con:g.c,sub:g.s})}">📖 Estudiar</a> <a href="${practHref(g.t,g.c,g.s)}">🧠 Practicar</a></td></tr>`).join('')}</table>`;
  host.appendChild(d);
}
// ---------- errores agrupados por concepto ----------
function errConcepts(E,el){
  if(!E.length)return;const G={};
  E.forEach(e=>{const q=QI[e.q.id]||e.q;const k=q.tema+'|'+(q.con||('§'+q.sub));const g=G[k]||(G[k]={t:q.tema,s:q.sub,c:q.con||'',nq:0,n:0,last:0});g.nq++;g.n+=e.n||1;g.last=Math.max(g.last,e.when||0)});
  const L=Object.values(G).sort((a,b)=>b.n-a.n||b.last-a.last);
  const d=document.createElement('div');d.className='cpanel';d.style.marginBottom='18px';
  d.innerHTML=`<h3>Errores pendientes por concepto (${L.length})</h3><p class="muted" style="margin:0 0 8px;font-size:14px">«Practicar concepto» arma preguntas distintas sobre la misma idea (básica, mecanismo, comparación, otra forma y más difícil) en vez de repetir la misma.</p><div class="tw"><table class="tbl2"><tr><th>Concepto</th><th>Tema · subtema</th><th>Veces fallado</th><th>Último fallo</th><th></th></tr>${L.map(g=>`<tr><td><b>${esc(conLabel(g.t,g.c,g.s))}</b></td><td>${esc(T[g.t])} · ${esc(SUB[g.t][g.s]||'')}</td><td>${g.n} (${g.nq} ${g.nq===1?'pregunta':'preguntas'})</td><td>${fdate(g.last)}</td><td class="acts"><a class="btn sec sm" href="${studyHref({tema:g.t,con:g.c,sub:g.s})}">📖 Estudiar concepto</a> <a class="btn sm" href="${practHref(g.t,g.c,g.s)}">🧠 Practicar concepto</a></td></tr>`).join('')}</table></div>`;
  el.before(d);
}
// ---------- refuerzo adaptativo de un concepto ----------
function reinforceList(t,c){
  const nc=norm(c);const same=BANCO.filter(q=>q.tema===t&&q.con&&norm(q.con)===nc);const facts=(CONC[t]||[]).filter(f=>norm(f[0])===nc);
  const sub=(same[0]&&same[0].sub)||(facts[0]&&facts[0][2])||null;const near=sub?BANCO.filter(q=>q.tema===t&&q.sub===sub&&!same.includes(q)):[];
  const failed=Object.values(ST.errs).map(e=>QI[e.q.id]||e.q).filter(q=>q.tema===t&&q.con&&norm(q.con)===nc);
  const used=new Set(failed.map(q=>q.id)),out=[];
  const take=(arr,pred,stage)=>{const x=shuffle(arr.filter(q=>!used.has(q.id)&&pred(q)))[0];if(!x)return false;used.add(x.id);out.push(Object.assign({},x,{stage}));return true};
  const gen=(ty,stage)=>{if(!facts.length)return false;for(let k=0;k<8;k++){const q=genQ(t,null,facts[0],ty);if(q&&q.tipo!=='order'&&!used.has(q.id)){used.add(q.id);out.push(Object.assign(q,{stage}));return true}}return false};
  const S1='1 · Pregunta básica',S2='2 · Mecanismo',S3='3 · Comparación con conceptos parecidos',S4='4 · La misma idea, de otra forma',S5='5 · Más difícil';
  take(same,q=>q.dif===1,S1)||gen('mcT',S1)||take(same,()=>true,S1)||take(near,q=>q.dif===1,S1);
  take(same,q=>q.cat==='Mecanismo'||q.cat==='Comprensión',S2)||take(near,q=>q.cat==='Mecanismo',S2)||take(near,q=>q.cat==='Comprensión',S2);
  take(same,q=>q.tipo==='match',S3)||gen('mcD',S3)||take(near,q=>q.tipo==='match',S3);
  const ty0=new Set(out.map(q=>q.tipo));
  take(same,q=>!ty0.has(q.tipo),S4)||gen('tf',S4)||gen('fill',S4)||take(near,q=>!ty0.has(q.tipo),S4);
  take(same,q=>q.dif===3||/Razonamiento|Aplicación|Integración/.test(q.cat),S5)||take(near,q=>q.dif===3,S5)||take(near,q=>/Razonamiento|Aplicación|Integración/.test(q.cat),S5);
  while(out.length<5&&take(same.concat(near),()=>true,'Refuerzo'));
  failed.forEach(q=>out.push(Object.assign({},q,{stage:'6 · La pregunta que fallaste'})));
  return {out,sub,nSame:same.length,nFacts:facts.length};
}
function runReforzar(t,c){
  if(!c)return vReforzar();
  if(c[0]==='§'){const s=c.slice(1);if(!SUB[t][s])return vReforzar();return startPractice({tema:t,n:10,sub:s,dif:0,tipos:null,gen:true})}
  const R=reinforceList(t,c);
  if(!R.out.length){app.innerHTML=`<div class="qwrap"><div class="empty">No encontré preguntas sobre «${esc(c)}». <a href="${studyHref({tema:t,con:c})}">Estudiar el concepto</a></div></div>`;return}
  startPractice({tema:t,refuerzo:c},R.out);
}
// ---------- PANEL ----------
function vPanel(){
  const nE=Object.keys(ST.errs).length,nM=Object.keys(ST.marks).length,nN=Object.values(ST.notes).reduce((a,n)=>a+n.items.length,0);
  const it=(href,ic,tt,tx)=>`<a class="card tool" href="${href}"><h3>${ic} ${tt}</h3><p>${tx}</p></a>`;
  app.innerHTML=`<div class="kick">Panel de estudio</div><h1 class="pt">📊 Panel</h1><p class="lead2">Herramientas para estudiar según tu desempeño real. Todo se guarda sólo en este navegador.</p>
  <form class="sbox" id="pfs"><input type="search" id="pq" placeholder="Buscar en libro, presentaciones, preguntas, errores y notas…" aria-label="Buscar"><button class="btn">🔎 Buscar</button></form>
  <div class="tgrid">
   ${it('#continuar','📖','Continuar estudiando',ST.cont&&LIB[ST.cont.t]?'Volver a «'+esc(LIB[ST.cont.t].titulo)+'», parte '+(ST.cont.k+1)+'.':'Aún no hay una lectura guardada.')}
   ${it('#progreso','📊','Mi progreso','Dominio por tema y subtema, calculado con tus respuestas.')}
   ${it('#reforzar','⚠️','Reforzar temas débiles','Conceptos y subtemas donde más fallas, con práctica dirigida.')}
   ${it('#errores','❌','Repasar mis errores',nE?nE+' preguntas pendientes.':'No hay errores pendientes.')}
   ${it('#examen','📝','Simulador de examen','10 a 100 preguntas, por tema, dificultad y tipo.')}
   ${it('#plan','🚨','Tengo examen mañana','Una ruta de estudio según el tiempo que tienes.')}
   ${it('#comparar','⚖️','Comparar conceptos','Tablas armadas con las comparaciones del libro.')}
   ${it('#mapa','🗺️','Mapas conceptuales','Cómo se conectan los conceptos de cada tema.')}
   ${it('#guardados','🔖','Guardados y notas',nM+' guardados · '+nN+' notas.')}
  </div>`;
  $('#pfs').onsubmit=e=>{e.preventDefault();const v=$('#pq').value.trim();if(v)go('buscar-'+enc(v))};
}
// ---------- PROGRESO ----------
function vProgreso(){
  const rows=Object.keys(T).map(t=>{const x=PR.temaStats(ST,t,SUB[t]);const nr=(ST.read[t]||[]).length,ns=LIB[t].secciones.length;
    const head=x.ok?`<div class="pline"><div class="pbar2" style="flex:1"><i style="width:${x.pct}%"></i></div><b>${x.pct}%</b></div><div class="muted" style="font-size:14px">Dominio estimado con ${x.n} preguntas distintas (${x.att} respuestas) · ${x.subsCon} de ${x.subsTot} subtemas con datos · ${x.subsDom} subtemas con ≥ 80 %</div>`
      :`<div class="muted">Aún no hay suficiente información para calcular tu dominio. <span style="font-size:14px">(${x.n} de ${PR.MIN_TEMA} preguntas distintas necesarias)</span></div>`;
    const subs=Object.entries(SUB[t]).map(([s,nm])=>{const y=PR.subStats(ST,t,s);return `<tr><td>${esc(nm)}</td><td>${y.n}</td><td>${y.ok?`<div class="pline"><div class="pbar2" style="flex:1;min-width:60px"><i style="width:${y.pct}%;${y.pct<70?'background:var(--bad)':''}"></i></div><b>${y.pct}%</b></div>`:`<span class="muted">datos insuficientes (${y.n} de ${PR.MIN_SUB})</span>`}</td><td class="acts"><a href="#concepto-${t}-${enc('§'+s)}">📖</a> <a href="#banco-${t}-${s}">🧠</a></td></tr>`}).join('');
    return `<div class="card" style="margin-bottom:14px"><h2 style="font-size:28px">${esc(T[t])}</h2>${head}<div class="muted" style="font-size:14px">Capítulo: ${nr} de ${ns} partes leídas</div>
      <details><summary>Ver por subtema</summary><div class="tw"><table class="tbl2"><tr><th>Subtema</th><th>Preguntas distintas</th><th>Dominio</th><th></th></tr>${subs}</table></div></details></div>`}).join('');
  app.innerHTML=`<div class="qwrap"><div class="kick">Panel</div><h1 class="pt">📊 Mi progreso</h1>
  <p class="lead2">El dominio se calcula con tus últimos ${PR.LAST} intentos de cada pregunta. Un subtema necesita al menos ${PR.MIN_SUB} preguntas distintas y un tema al menos ${PR.MIN_TEMA}; con menos, no se muestra porcentaje. Registro de respuestas desde el ${fdate(ST.since)}.</p>${rows}
  <div class="cpanel"><h3>💾 Respaldo de tu progreso</h3><p class="muted" style="margin:0 0 8px;font-size:14px">El progreso vive en este navegador. Para pasarlo a otro dispositivo (iPad, celular), descarga el respaldo aquí y cárgalo allá. Al cargar, se combina con lo que ya haya.</p>
   <div class="row"><button class="btn sec" id="bexp">⬇️ Descargar respaldo</button><label class="btn sec" style="cursor:pointer">⬆️ Cargar respaldo<input type="file" id="bimp" accept="application/json,.json" hidden></label><button class="btn ghost" id="bcop">📋 Copiar como texto</button></div><div id="bmsg" class="muted" style="margin-top:8px"></div></div></div>`;
  $('#bexp').onclick=()=>{try{const b=new Blob([JSON.stringify(ST)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='progreso-biologia-celular-'+new Date().toISOString().slice(0,10)+'.json';document.body.appendChild(a);a.click();a.remove();$('#bmsg').textContent='Respaldo descargado.'}catch(e){$('#bmsg').textContent='Este navegador no permitió la descarga; usa «Copiar como texto».'}};
  $('#bcop').onclick=()=>{const ta=document.createElement('textarea');ta.value=JSON.stringify(ST);ta.style.width='100%';ta.rows=4;$('#bmsg').innerHTML='Copia este texto y guárdalo; para cargarlo en otro dispositivo, pégalo en un archivo .json:';$('#bmsg').appendChild(ta);ta.select();try{navigator.clipboard&&navigator.clipboard.writeText(ta.value)}catch(e){}};
  $('#bimp').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const D=JSON.parse(r.result);mergeST(D);save();$('#bmsg').textContent='Respaldo cargado y combinado.';setTimeout(vProgreso,700)}catch(err){$('#bmsg').textContent='El archivo no es un respaldo válido.'}};r.readAsText(f)};
}
function mergeST(D){if(!D||typeof D!=='object'||!D.seen)throw 0;
  ['seen','read'].forEach(k=>Object.entries(D[k]||{}).forEach(([t,a])=>{const S=new Set(ST[k][t]||[]);(a||[]).forEach(x=>S.add(x));ST[k][t]=[...S]}));
  Object.entries(D.errs||{}).forEach(([id,e])=>{if(!ST.errs[id]||(e.when||0)>(ST.errs[id].when||0))ST.errs[id]=e});
  Object.entries(D.log||{}).forEach(([id,e])=>{if(!ST.log[id]||(e.last||0)>(ST.log[id].last||0))ST.log[id]=e});
  Object.entries(D.marks||{}).forEach(([k,v])=>{if(!ST.marks[k])ST.marks[k]=v});
  Object.entries(D.notes||{}).forEach(([k,v])=>{const N=ST.notes[k];if(!N)ST.notes[k]=v;else v.items.forEach(x=>{if(!N.items.some(y=>y.when===x.when&&y.txt===x.txt))N.items.push(x)})});
  if(D.since&&(!ST.since||D.since<ST.since))ST.since=D.since;if(D.cont&&(!ST.cont||D.cont.when>ST.cont.when))ST.cont=D.cont}
// ---------- REFORZAR ----------
function vReforzar(){
  const temas=Object.keys(T);const WC=PR.weakConcepts(ST,temas),WS=PR.weakSubs(ST,temas,SUB);
  const EG={};Object.values(ST.errs).forEach(e=>{const q=QI[e.q.id]||e.q;const k=q.tema+'|'+(q.con||('§'+q.sub));const g=EG[k]||(EG[k]={t:q.tema,s:q.sub,c:q.con||'',n:0,nq:0});g.n+=e.n||1;g.nq++});
  const EL=Object.values(EG).sort((a,b)=>b.n-a.n).slice(0,10);
  const row=(g,txt)=>`<div class="wrow"><div><b>${esc(conLabel(g.t,g.c,g.s))}</b><div class="muted" style="font-size:13px">${esc(T[g.t])} · ${esc(SUB[g.t][g.s]||'')} · ${txt}</div></div><div class="acts"><a href="${studyHref({tema:g.t,con:g.c,sub:g.s})}">→ Estudiar este concepto</a><a href="${practHref(g.t,g.c,g.s)}">🧠 Practicar</a></div></div>`;
  app.innerHTML=`<div class="qwrap"><div class="kick">Panel</div><h1 class="pt">⚠️ Reforzar</h1><p class="lead2">Se calcula con tus respuestas reales. Un concepto aparece aquí si fallaste al menos la mitad de sus preguntas (con 2 o más) en tu último intento.</p>
  <div class="cpanel"><h3>⚠️ Necesitas reforzar: conceptos</h3>${WC.length?WC.slice(0,12).map(g=>row(g,`${g.x} ${g.x===1?'error':'errores'} de ${g.y} preguntas${g.y<3?' · pocos datos':''}`)).join(''):'<p class="muted">Aún no hay suficiente información para detectar conceptos débiles. Responde preguntas en el banco o el simulador.</p>'}</div>
  <div class="cpanel"><h3>Subtemas con menos de 70 %</h3>${WS.length?WS.map(w=>`<div class="wrow"><div><b>${esc(SUB[w.t][w.s])}</b><div class="muted" style="font-size:13px">${esc(T[w.t])} · ${w.pct}% con ${w.n} preguntas distintas</div></div><div class="acts"><a href="#concepto-${w.t}-${enc('§'+w.s)}">→ Estudiar</a><a href="#banco-${w.t}-${w.s}">🧠 Practicar</a></div></div>`).join(''):`<p class="muted">Ningún subtema tiene todavía datos suficientes (mínimo ${PR.MIN_SUB} preguntas distintas) con menos de 70 %.</p>`}</div>
  <div class="cpanel"><h3>Errores pendientes más repetidos</h3>${EL.length?EL.map(g=>row(g,`fallado ${g.n} ${g.n===1?'vez':'veces'} en ${g.nq} ${g.nq===1?'pregunta':'preguntas'}`)).join('')+'<div class="row"><a class="btn sec" href="#errores">❌ Ver todos mis errores</a></div>':'<p class="muted">No hay errores pendientes.</p>'}</div>
  ${(WC.length||WS.length||EL.length)?'<div class="row"><button class="btn" id="mixw">🧠 Practicar todos mis puntos débiles</button></div>':''}</div>`;
  if($('#mixw'))$('#mixw').onclick=()=>{const L=[],used=new Set();const add=q=>{if(q&&!used.has(q.id)&&L.length<25){used.add(q.id);L.push(q)}};
    WC.slice(0,6).forEach(g=>reinforceList(g.t,g.c).out.slice(0,3).forEach(add));
    EL.forEach(g=>Object.values(ST.errs).map(e=>QI[e.q.id]||e.q).filter(q=>q.tema===g.t&&(q.con||'')===g.c&&q.sub===g.s).forEach(add));
    WS.forEach(w=>build([w.t],4,{sub:w.s,genRatio:0}).forEach(add));
    const ts=[...new Set(L.map(q=>q.tema))];startPractice({tema:ts.length===1?ts[0]:'',temas:ts},shuffle(L))};
}
// ---------- COMPARAR ----------
let CMPE=null;
function cmpEntities(){if(CMPE)return CMPE;const E={};const add=(t,name,src)=>{name=String(name).trim();if(!name)return;const k=t+'|'+norm(name);const e=E[k]||(E[k]={k,t,name,tabs:[],def:null,sub:null});if(src.def){e.def=src.def;e.sub=src.sub}else e.tabs.push(src)};
  (M.TABLAS||[]).forEach((tb,ti)=>{if(tb.modo==='row')tb.rows.forEach((r,ri)=>add(tb.t,r[0],{ti,ri}));else tb.head.forEach((n,ci)=>{if(tb.modo==='col'&&ci===0)return;add(tb.t,n,{ti,ci})})});
  Object.entries(CONC).forEach(([t,fs])=>fs.forEach(f=>add(t,f[0],{def:f[1],sub:f[2]})));
  return CMPE=Object.values(E).sort((a,b)=>a.name.localeCompare(b.name,'es'))}
function entAttrs(e){const A=[];e.tabs.forEach(s=>{const tb=M.TABLAS[s.ti];if(s.ri!=null){tb.head.slice(1).forEach((h,j)=>A.push({ti:s.ti,a:h,v:tb.rows[s.ri][j+1]}))}else tb.rows.forEach((r,ri)=>A.push({ti:s.ti,a:tb.modo==='col'?r[0]:'Punto '+(ri+1),v:tb.modo==='col'?r[s.ci]:r[s.ci]}))});return A}
let CMPSEL=[];
function vComparar(){
  const E=cmpEntities();let ft='';
  app.innerHTML=`<div class="qwrap"><div class="kick">Panel</div><h1 class="pt">⚖️ Comparar conceptos</h1><p class="lead2">Elige dos o más conceptos. La tabla se arma sólo con las comparaciones y definiciones que ya están en el libro y el banco de conceptos; no se agregan categorías nuevas.</p>
  <div class="chips" id="cft"><button class="chip on" data-t="">Todos</button>${Object.keys(T).map(t=>`<button class="chip" data-t="${t}">${esc(T[t])}</button>`).join('')}</div>
  <input type="search" id="cq" class="inp" placeholder="Filtrar conceptos…" aria-label="Filtrar conceptos">
  <div id="csel" class="row" style="margin:10px 0"></div><div id="clist" class="clist"></div>
  <div class="row"><button class="btn" id="cgo">Comparar</button><button class="btn ghost" id="cclr">Limpiar selección</button></div><div id="cres"></div></div>`;
  const draw=()=>{const q=norm($('#cq').value||'');const L=E.filter(e=>(!ft||e.t===ft)&&(!q||norm(e.name).includes(q))).slice(0,120);
    $('#clist').innerHTML=L.map(e=>`<button type="button" class="chip ${CMPSEL.includes(e.k)?'on':''}" data-k="${esc(e.k)}" title="${esc(T[e.t])}">${esc(e.name)}${e.tabs.length?' ▦':''}</button>`).join('')||'<span class="muted">Sin resultados.</span>';
    $('#clist').querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{const k=b.dataset.k;CMPSEL=CMPSEL.includes(k)?CMPSEL.filter(x=>x!==k):CMPSEL.concat(k);draw()});
    $('#csel').innerHTML=CMPSEL.length?'<b>Seleccionados:</b> '+CMPSEL.map(k=>{const e=E.find(x=>x.k===k);return `<span class="tag t">${esc(e.name)}</span>`}).join(' '):'<span class="muted">▦ = aparece en una tabla comparativa del libro.</span>'};
  app.querySelectorAll('#cft .chip').forEach(b=>b.onclick=()=>{app.querySelectorAll('#cft .chip').forEach(x=>x.classList.remove('on'));b.classList.add('on');ft=b.dataset.t;draw()});
  $('#cq').oninput=draw;$('#cclr').onclick=()=>{CMPSEL=[];$('#cres').innerHTML='';draw()};
  $('#cgo').onclick=()=>{const S=CMPSEL.map(k=>E.find(x=>x.k===k));if(S.length<2){$('#cres').innerHTML='<p class="muted">Elige al menos dos conceptos.</p>';return}$('#cres').innerHTML=cmpHTML(S);$('#cres').scrollIntoView({behavior:'smooth',block:'start'})};
  draw();
}
function cmpHTML(S){
  let h='';const byT={};S.forEach(e=>e.tabs.forEach(s=>{(byT[s.ti]=byT[s.ti]||[]).push([e,s])}));
  const direct=Object.entries(byT).filter(([,v])=>v.length>=2);const covered=new Set();
  direct.forEach(([ti,v])=>{const tb=M.TABLAS[ti];v.forEach(([e])=>covered.add(e.k));const href=`#libro-${tb.t}-${tb.k}-${tb.h}`;
    if(v[0][1].ri!=null){h+=`<div class="cpanel"><h3>Comparación del libro · ${esc(tb.tit)}</h3><div class="tw"><table class="cmp"><tr><th></th>${v.map(([e])=>`<th>${esc(e.name)}</th>`).join('')}</tr>${tb.head.slice(1).map((a,j)=>`<tr><td>${esc(a)}</td>${v.map(([,s])=>`<td>${esc(tb.rows[s.ri][j+1]||'—')}</td>`).join('')}</tr>`).join('')}</table></div><a href="${href}">📖 Ver en el libro (${esc(T[tb.t])})</a></div>`}
    else{h+=`<div class="cpanel"><h3>Comparación del libro · ${esc(tb.tit)}</h3><div class="tw"><table class="cmp"><tr><th>${tb.modo==='col'?esc(tb.head[0]||''):''}</th>${v.map(([e])=>`<th>${esc(e.name)}</th>`).join('')}</tr>${tb.rows.map((r,ri)=>`<tr><td>${tb.modo==='col'?esc(r[0]):ri+1}</td>${v.map(([,s])=>`<td>${esc(r[s.ci]||'—')}</td>`).join('')}</tr>`).join('')}</table></div><a href="${href}">📖 Ver en el libro (${esc(T[tb.t])})</a></div>`}});
  const rest=S.filter(e=>!covered.has(e.k)||e.def);
  if(rest.length){const rows=[['Tema',e=>esc(T[e.t])],['Definición (banco de conceptos)',e=>e.def?esc(e.def):'—'],['Subtema',e=>e.sub?esc(SUB[e.t][e.sub]||e.sub):'—']];
    const extra={};S.filter(e=>!covered.has(e.k)).forEach(e=>entAttrs(e).forEach(a=>{const key=a.a;(extra[key]=extra[key]||{})[e.k]=a.v}));
    h+=`<div class="cpanel"><h3>${direct.length?'Definiciones y datos de cada concepto':'Lo que dice el material de cada concepto'}</h3>${direct.length||S.every(e=>!e.tabs.length)?'':'<p class="muted" style="font-size:14px">Estos conceptos no aparecen juntos en una misma tabla del libro; se muestran sus datos uno al lado del otro.</p>'}<div class="tw"><table class="cmp"><tr><th></th>${S.map(e=>`<th>${esc(e.name)}</th>`).join('')}</tr>${rows.map(([a,f])=>`<tr><td>${a}</td>${S.map(e=>`<td>${f(e)}</td>`).join('')}</tr>`).join('')}${Object.entries(extra).map(([a,m])=>`<tr><td>${esc(a)}</td>${S.map(e=>`<td>${m[e.k]?esc(m[e.k]):'—'}</td>`).join('')}</tr>`).join('')}<tr><td>Dónde estudiarlo</td>${S.map(e=>{let hr;if(!e.def&&e.tabs.length){const tb=M.TABLAS[e.tabs[0].ti];hr=`#libro-${tb.t}-${tb.k}-${tb.h}`}else hr=`#concepto-${e.t}-${enc(e.name)}`;return `<td><a href="${hr}">📖 Ir al libro</a></td>`}).join('')}</tr></table></div></div>`}
  return h;
}
// ---------- BUSCAR ----------
let SIDX=null;
function plain(html){return String(html).replace(/<svg[\s\S]*?<\/svg>/g,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim()}
function nchars(s){let o='';for(const ch of s){const c=ch.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();o+=c.length===1?c:(ch.toLowerCase().length===1?ch.toLowerCase():' ')}return o}
function searchIdx(){if(SIDX)return SIDX;const I=[];
  Object.entries(LIB).forEach(([t,L])=>L.secciones.forEach((s,k)=>s.html.split('<h3>').forEach((part,j)=>{const tit=j?s.subs[j-1]:s.titulo;const tx=plain(part.replace(/^.*?<\/h3>/,''));I.push({g:'libro',t,tit:L.titulo+' · '+(j?s.titulo+' · ':'')+plain(tit),tx,href:`#libro-${t}-${k}-${j-1}`})})));
  DIAPOS.forEach(d=>I.push({g:'diapo',t:d.tema,tit:d.deck+' · diapositiva '+d.n+': '+d.title,tx:d.text,href:d.file+'#s'+d.n,ext:1}));
  BANCO.forEach(q=>I.push({g:'preg',t:q.tema,tit:q.q,tx:(q.opts?q.opts[0]+' ':'')+(q.exp||''),q}));
  return SIDX=I}
function snip(tx,words){const n=nchars(tx);let p=-1;for(const w of words){p=n.indexOf(w);if(p>=0)break}if(p<0)return esc(tx.slice(0,160))+(tx.length>160?'…':'');const a=Math.max(0,p-70),b=Math.min(tx.length,p+130);let s=(a?'…':'')+tx.slice(a,b)+(b<tx.length?'…':'');let out=esc(s);
  words.forEach(w=>{if(w.length<3)return;const ns=nchars(s);let html='',i=0,q;while((q=ns.indexOf(w,i))>=0){html+=esc(s.slice(i,q))+'<mark>'+esc(s.slice(q,q+w.length))+'</mark>';i=q+w.length}if(i){html+=esc(s.slice(i));out=html;s=s}});return out}
function vBuscar(q){
  app.innerHTML=`<div class="qwrap"><div class="kick">Panel</div><h1 class="pt">🔎 Buscar</h1><form class="sbox" id="bfs"><input type="search" id="bq" value="${esc(q||'')}" placeholder="Ej.: casquete de GTP, alolactosa, Gαs…" aria-label="Buscar"><button class="btn">Buscar</button></form><div id="bres"></div></div>`;
  $('#bfs').onsubmit=e=>{e.preventDefault();const v=$('#bq').value.trim();if(v)go('buscar-'+enc(v))};
  if(!q){$('#bres').innerHTML='<p class="muted">Busca en el libro, las presentaciones, el banco de preguntas, tus errores y tus notas.</p>';return}
  const words=nchars(q).split(/\s+/).filter(Boolean);const hit=(s)=>{const n=nchars(s);return words.every(w=>n.includes(w))};
  const I=searchIdx();const G={libro:[],diapo:[],preg:[]};I.forEach(x=>{if(hit(x.tit+' '+x.tx))G[x.g].push(x)});
  const errs=Object.values(ST.errs).filter(e=>hit(e.q.q+' '+correctText(e.q)));
  const notes=[];Object.entries(ST.notes).forEach(([k,N])=>N.items.forEach(x=>{if(hit(x.txt+' '+N.tit))notes.push({N,x})}));
  const sec=(tt,n,body)=>`<div class="cpanel"><h3>${tt} <span class="muted">(${n})</span></h3>${n?body:'<p class="muted">Sin resultados.</p>'}</div>`;
  const lim=a=>a.slice(0,25);
  let h=sec('📖 Libro',G.libro.length,lim(G.libro).map(x=>`<a class="sres" href="${x.href}"><b>${esc(x.tit)}</b><span>${snip(x.tx,words)}</span></a>`).join(''));
  h+=sec('🎞️ Presentaciones',G.diapo.length,lim(G.diapo).map(x=>`<a class="sres" href="${x.href}" target="_self"><b>${esc(x.tit)}</b><span>${snip(x.tx,words)}</span></a>`).join(''));
  h+=sec('🧠 Preguntas',G.preg.length,lim(G.preg).map((x,j)=>`<button class="sres" type="button" data-qi="${esc(x.q.id)}"><b>${esc(T[x.q.tema])} · ${esc(SUB[x.q.tema][x.q.sub]||'')}</b><span>${snip(x.q.q,words)}</span></button>`).join(''));
  h+=sec('❌ Mis errores',errs.length,lim(errs).map(e=>`<a class="sres" href="#errores-${e.q.tema}"><b>${esc(T[e.q.tema])}</b><span>${snip(e.q.q,words)}</span></a>`).join(''));
  h+=sec('📝 Mis notas',notes.length,lim(notes).map(({N,x})=>`<a class="sres" href="#libro-${N.t}-${N.k}-${N.h}"><b>${esc(N.tit)}</b><span>${snip(x.txt,words)}</span></a>`).join(''));
  $('#bres').innerHTML=h;
  $('#bres').querySelectorAll('[data-qi]').forEach(b=>b.onclick=()=>{const qq=QI[b.dataset.qi];startPractice({tema:qq.tema,sub:'',n:1},[qq])});
}
// ---------- TENGO EXAMEN MAÑANA ----------
let FIGLOC=null;
function figLocs(){if(FIGLOC)return FIGLOC;FIGLOC={};Object.entries(LIB).forEach(([t,L])=>L.secciones.forEach((s,k)=>s.html.split('<h3>').forEach((part,j)=>{(part.match(/data-f="[\w.]+"/g)||[]).forEach(m=>{const f=m.slice(8,-1);if((M.PASOS||{})[f])(FIGLOC[t]=FIGLOC[t]||[]).push({f,k,h:j-1,tit:j?s.subs[j-1]:s.titulo})})})));return FIGLOC}
function vPlan(){
  app.innerHTML=`<div class="setup"><div class="kick">Panel</div><h1 class="pt">🚨 Tengo examen mañana</h1><p class="lead2">Elige los temas y el tiempo que tienes. La ruta prioriza: conceptos débiles → errores frecuentes → alto rendimiento → mecanismos fundamentales → preguntas → repaso final.</p>
  <fieldset><legend>Temas del examen</legend>${Object.entries(T).map(([k,v])=>`<label class="ck"><input type="checkbox" value="${k}"> ${esc(v)}</label>`).join('')}</fieldset>
  <fieldset><legend>Tiempo disponible</legend><div class="chips" id="ptm">${[[30,'30 min'],[60,'1 h'],[90,'1 h 30'],[120,'2 h'],[180,'3 h'],[240,'4 h']].map(([v,l])=>`<button class="chip ${v===120?'on':''}" data-v="${v}">${l}</button>`).join('')}</div></fieldset>
  <div class="row"><button class="btn" id="pgo">Generar mi ruta</button></div><div id="pres"></div></div>`;
  app.querySelectorAll('#ptm .chip').forEach(b=>b.onclick=()=>{app.querySelectorAll('#ptm .chip').forEach(x=>x.classList.remove('on'));b.classList.add('on')});
  $('#pgo').onclick=()=>{const temas=[...app.querySelectorAll('fieldset input:checked')].map(x=>x.value);if(!temas.length){alertInline(app.querySelector('.setup'),'Elige al menos un tema.');return}planHTML(temas,+app.querySelector('#ptm .on').dataset.v)};
}
function planHTML(temas,min){
  const WC=PR.weakConcepts(ST,temas),WS=PR.weakSubs(ST,temas,SUB);
  const EG={};Object.values(ST.errs).forEach(e=>{const q=QI[e.q.id]||e.q;if(!temas.includes(q.tema))return;const k=q.tema+'|'+(q.con||('§'+q.sub));const g=EG[k]||(EG[k]={t:q.tema,s:q.sub,c:q.con||'',n:0});g.n+=e.n||1});
  const EL=Object.values(EG).sort((a,b)=>b.n-a.n);
  let b1=Math.round(min*.2),b2=Math.round(min*.3),b3=Math.round(min*.15),b4=Math.round(min*.25),b5=min-b1-b2-b3-b4;
  const weakItems=[];const seen=new Set();WC.forEach(g=>{const k=g.t+'|'+g.c;if(!seen.has(k)){seen.add(k);weakItems.push({g,why:`${g.x} de ${g.y} preguntas falladas`})}});EL.forEach(g=>{const k=g.t+'|'+g.c;if(!seen.has(k)){seen.add(k);weakItems.push({g,why:`fallado ${g.n} ${g.n===1?'vez':'veces'}`})}});
  const nW=Math.min(weakItems.length,Math.max(2,Math.round(b1/6)));
  if(!weakItems.length){b2+=b1;b1=0}
  // alto rendimiento: lectura a ≈180 palabras/min
  const R=[];temas.forEach(t=>{const imp=(M.IMP||{})[t]||{};Object.entries(imp).forEach(([key,v])=>{if(v!=='r')return;const [k,h]=key.split('.').map(Number);const hh=isNaN(h)?-1:h;const w=isNaN(h)?Object.entries(M.HW[t]).filter(([kk])=>kk.split('.')[0]==k).reduce((a,[,x])=>a+x,0):(M.HW[t][k+'.'+h]||200);
    const weak=WS.some(x=>x.t===t&&M.SUBLOC[t][x.s]&&M.SUBLOC[t][x.s][0]===k&&(isNaN(h)||M.SUBLOC[t][x.s][1]===h));const alto=isNaN(h)&&/alto rendimiento/i.test(LIB[t].secciones[k].titulo);
    R.push({t,k,h:hh,tit:isNaN(h)?LIB[t].secciones[k].titulo:LIB[t].secciones[k].subs[h],min:Math.max(2,Math.round(w/180)),pri:alto?0:weak?1:2})})});
  R.sort((a,b)=>a.pri-b.pri||a.t.localeCompare(b.t)||a.k-b.k||a.h-b.h);
  let used=0;const RS=[],RX=[];R.forEach(x=>{if(used+x.min<=b2||!RS.length){RS.push(x);used+=x.min}else RX.push(x)});
  const F=[];temas.forEach(t=>(figLocs()[t]||[]).forEach(x=>F.push(Object.assign({t},x))));const nF=Math.max(1,Math.floor(b3/3));const FS=F.slice(0,nF);
  const nQ=Math.max(5,Math.round(b4/1.1));
  const li=(href,txt,extra)=>`<li><label><input type="checkbox"> <a href="${href}">${txt}</a></label>${extra?` <span class="muted">${extra}</span>`:''}</li>`;
  const blk=(n,tt,m,body)=>`<div class="cpanel plan"><h3><span class="bn">${n}</span> ${tt} <span class="muted">≈ ${m} min</span></h3>${body}</div>`;
  let h=`<h2 style="color:var(--acc);margin:22px 0 4px">Tu ruta para ${min>=60?(min/60).toString().replace('.',',')+' h':min+' min'}</h2><p class="muted" style="margin:0 0 10px">${temas.map(t=>T[t]).join(' · ')}. Marca cada paso al terminarlo.${!WC.length&&!EL.length?' Aún no hay errores ni conceptos débiles registrados, así que el tiempo del bloque 1 pasa al alto rendimiento.':''}</p>`;
  if(b1)h+=blk(1,'Conceptos débiles y errores frecuentes',b1,`<ol class="pl">${weakItems.slice(0,nW).map(({g,why})=>li(studyHref({tema:g.t,con:g.c,sub:g.s}),'📖 '+esc(conLabel(g.t,g.c,g.s)),`${esc(T[g.t])} · ${why} · <a href="${practHref(g.t,g.c,g.s)}">🧠 practicar</a>`)).join('')}</ol>`);
  h+=blk(2,'🔴 Alto rendimiento',b2,`<ol class="pl">${RS.map(x=>li(`#libro-${x.t}-${x.k}-${x.h}`,esc(x.tit),`${esc(T[x.t])} · ≈${x.min} min${x.pri===1?' · subtema débil':''}`)).join('')}</ol>${RX.length?`<details><summary>Si te sobra tiempo (${RX.length} más)</summary><ol class="pl">${RX.map(x=>li(`#libro-${x.t}-${x.k}-${x.h}`,esc(x.tit),`${esc(T[x.t])} · ≈${x.min} min`)).join('')}</ol></details>`:''}<p class="muted" style="font-size:13px">En el libro puedes activar «🔴 Solo alto rendimiento» para leer únicamente estos bloques.</p>`);
  h+=blk(3,'Mecanismos fundamentales, paso a paso',b3,FS.length?`<ol class="pl">${FS.map(x=>li(`#libro-${x.t}-${x.k}-${x.h}`,'▶ '+esc(x.tit),esc(T[x.t])+' · usa «Siguiente ▶» en la figura')).join('')}</ol>`:'<p class="muted">No hay animaciones paso a paso en estos temas.</p>');
  h+=blk(4,'Preguntas',b4,`<p style="margin:0 0 8px">${nQ} preguntas con retroalimentación${WS.length||WC.length?', con prioridad en tus puntos débiles':''}.</p><button class="btn" id="pq4">🧠 Empezar las preguntas</button> <a class="btn sec" href="#examen">📝 O un simulador sin ayudas</a>`);
  h+=blk(5,'Repaso final',b5,`<ol class="pl">${temas.map(t=>{const S=LIB[t].secciones;const ie=S.findIndex(s=>/errores frecuentes/i.test(s.titulo)),ir=S.findIndex(s=>/resumen/i.test(s.titulo));return (ie>=0?li(`#libro-${t}-${ie}`,'Errores frecuentes · '+esc(T[t])):'')+(ir>=0?li(`#libro-${t}-${ir}`,'Resumen final · '+esc(T[t])):'')}).join('')}${EL.length?li('#errores','❌ Repasar mis errores pendientes'):''}</ol>`);
  $('#pres').innerHTML=h;$('#pres').scrollIntoView({behavior:'smooth',block:'start'});
  $('#pq4').onclick=()=>{const L=[],u=new Set();const add=q=>{if(q&&!u.has(q.id)&&L.length<nQ){u.add(q.id);L.push(q)}};
    WC.slice(0,5).forEach(g=>reinforceList(g.t,g.c).out.slice(0,2).forEach(add));WS.forEach(w=>build([w.t],3,{sub:w.s,genRatio:0}).forEach(add));
    build(temas,nQ,{genRatio:.1,exclude:[...u]}).forEach(add);startPractice({tema:temas.length===1?temas[0]:'',temas,plan:1,gen:true},shuffle(L))};
}
// ---------- GUARDADOS ----------
function vGuardados(){
  const MK=Object.entries(ST.marks).sort((a,b)=>b[1].when-a[1].when),NT=Object.entries(ST.notes).sort((a,b)=>Math.max(...b[1].items.map(x=>x.when))-Math.max(...a[1].items.map(x=>x.when)));
  app.innerHTML=`<div class="qwrap"><div class="kick">Panel</div><h1 class="pt">🔖 Mis conceptos guardados</h1><p class="lead2">Guarda un apartado con 🔖 o escribe una nota con 📝 junto a cualquier encabezado del libro.</p>
  <div class="cpanel"><h3>🔖 Guardados (${MK.length})</h3>${MK.length?MK.map(([k,m])=>`<div class="wrow"><div><a href="#libro-${m.t}-${m.k}-${m.h}"><b>${esc(m.tit)}</b></a><div class="muted" style="font-size:13px">${esc(T[m.t])} · ${esc(LIB[m.t].secciones[m.k].titulo)} · ${fdate(m.when)}</div></div><div class="acts"><button type="button" class="lnk" data-um="${esc(k)}">Quitar</button></div></div>`).join(''):'<p class="muted">Aún no has guardado nada.</p>'}</div>
  <div class="cpanel"><h3>📝 Mis notas (${NT.reduce((a,[,n])=>a+n.items.length,0)})</h3>${NT.length?NT.map(([k,n])=>`<div class="wrow" style="display:block"><a href="#libro-${n.t}-${n.k}-${n.h}"><b>${esc(n.tit)}</b></a> <span class="muted" style="font-size:13px">${esc(T[n.t])}</span>${n.items.map(x=>`<div class="note">${esc(x.txt).replace(/\n/g,'<br>')}<div class="muted" style="font-size:12px">${fdate(x.when)}</div></div>`).join('')}</div>`).join(''):'<p class="muted">Aún no has escrito notas.</p>'}</div></div>`;
  app.querySelectorAll('[data-um]').forEach(b=>b.onclick=()=>{delete ST.marks[b.dataset.um];persist();vGuardados()});
}
// ---------- MAPAS CONCEPTUALES ----------
function mapSVG(t){const Mp=M.MAPAS[t];const W=190,H=50;const P={};Mp.n.forEach(n=>P[n[0]]=n);
  const wrap=s=>{if(s.length<=22)return [s];const w=s.split(' ');let a='';const out=[];w.forEach(x=>{if((a+' '+x).trim().length>22&&a){out.push(a);a=x}else a=(a+' '+x).trim()});out.push(a);return out.slice(0,2)};
  let e='',lb='',nd='';Mp.e.forEach(([a,b,l])=>{const A=P[a],B=P[b];e+=`<line x1="${A[2]}" y1="${A[3]}" x2="${B[2]}" y2="${B[3]}" class="me"/>`;if(l){const x=(A[2]+B[2])/2,y=(A[3]+B[3])/2,w=l.length*6.6+10;lb+=`<rect x="${x-w/2}" y="${y-9}" width="${w}" height="18" rx="5" class="mlb"/><text x="${x}" y="${y+4}" class="mlt">${esc(l)}</text>`}});
  Mp.n.forEach(([id,lab,x,y,k,h])=>{const ls=wrap(lab);nd+=`<a href="#libro-${t}-${k}-${h}"><g class="mn"><rect x="${x-W/2}" y="${y-H/2}" width="${W}" height="${H}" rx="11"/>${ls.map((s,j)=>`<text x="${x}" y="${y+5+(j-(ls.length-1)/2)*16}">${esc(s)}</text>`).join('')}</g></a>`});
  return `<svg viewBox="0 0 790 520" class="cmap" role="img" aria-label="Mapa conceptual de ${esc(T[t])}">${e}${lb}${nd}</svg>`}
function vMapa(t){
  app.innerHTML=`<div class="qwrap" style="max-width:980px"><div class="kick">Panel</div><h1 class="pt">🗺️ Mapa conceptual</h1><div class="chips" style="margin-bottom:12px">${Object.keys(T).map(k=>`<a class="chip ${k===t?'on':''}" href="#mapa-${k}">${esc(T[k])}</a>`).join('')}</div>
  ${t?`<div class="cpanel">${mapSVG(t)}<p class="muted" style="font-size:14px;margin:8px 0 0">Toca un concepto para ir a su sección del libro. <a href="#libro-${t}">Índice del capítulo</a></p></div>`:'<p class="muted">Elige un tema.</p>'}</div>`;
}
