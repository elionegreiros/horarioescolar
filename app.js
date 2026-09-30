(() => {
'use strict';

/* ═══════ HELPERS ═══════ */
function ico(id, cls='ico'){ return `<svg class="${cls}"><use href="#${id}"/></svg>`; }

const NIVEIS = [
  { id:'otimo',    nome:'Ótimo',    curto:'Ótimo',    cor:'#10b981', soft:'#d1fae5', ico:'i-star' },
  { id:'bom',      nome:'Bom',      curto:'Bom',      cor:'#65a30d', soft:'#ecfccb', ico:'i-smile' },
  { id:'atencao',  nome:'Atenção',  curto:'Atenção',  cor:'#f59e0b', soft:'#fef3c7', ico:'i-meh' },
  { id:'critico',  nome:'Crítico',  curto:'Crítico',  cor:'#ef4444', soft:'#fee2e2', ico:'i-devil' }
];
const NIVEL_MAP = {}; NIVEIS.forEach(n => { NIVEL_MAP[n.id] = n; });
const MIGRA_NIVEL = {
  otimo:'otimo', bom:'bom', regular:'atencao', desinteressado:'atencao', bagunceiro:'critico'
};

const STATUS = {
  presente:    { label:'Presente',    cor:'#10b981', soft:'#d1fae5', ico:'i-check-circle' },
  ausente:     { label:'Ausente',     cor:'#ef4444', soft:'#fee2e2', ico:'i-x-circle' },
  justificado: { label:'Justificado', cor:'#f59e0b', soft:'#fef3c7', ico:'i-info' },
  pendente:    { label:'Pendente',    cor:'#94a3b8', soft:'#e5e7eb', ico:'i-clock' }
};

const DIAS = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
const DIAS_CURTO = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const ORDEM = [1,2,3,4,5,6,0];

const ESCOLAS = [
  { nome:'Gentil Dantas', turmas:['1º ADM','1º Cont. Ambiental','2º Sistemas','2º ADM','3º Sistemas','3º Regular'] },
  { nome:'Enéas Nogueira', turmas:['8º Ano A','8º Ano B'] }
];
const TURMAS = ESCOLAS.flatMap(e => e.turmas);
const ESCOLA_DA_TURMA = {};
ESCOLAS.forEach(e => e.turmas.forEach(t => { ESCOLA_DA_TURMA[t] = e.nome; }));

const GRAD_TURMA = {
  '1º ADM':             'linear-gradient(160deg,#3b82f6,#2563eb)',
  '1º Cont. Ambiental': 'linear-gradient(160deg,#06b6d4,#0891b2)',
  '2º Sistemas':        'linear-gradient(160deg,#6366f1,#4f46e5)',
  '8º Ano A':           'linear-gradient(160deg,#0ea5e9,#0284c7)',
  '8º Ano B':           'linear-gradient(160deg,#38bdf8,#0ea5e9)',
  '2º ADM':             'linear-gradient(160deg,#64748b,#475569)',
  '3º Sistemas':        'linear-gradient(160deg,#64748b,#475569)',
  '3º Regular':         'linear-gradient(160deg,#64748b,#475569)'
};
const COR_TURMA_SOLID = {
  '1º ADM':'#3b82f6','1º Cont. Ambiental':'#06b6d4','2º Sistemas':'#6366f1',
  '8º Ano A':'#0ea5e9','8º Ano B':'#38bdf8',
  '2º ADM':'#64748b','3º Sistemas':'#64748b','3º Regular':'#64748b'
};

const SEED_ALUNOS = [
  { n:'ALICE FERREIRA DA SILVA', t:'1º ADM' },
  { n:'CARLENE MARTINS DA SILVA', t:'1º ADM' },
  { n:'DAVI DE ALENCAR MELO BEZERRA', t:'1º ADM' },
  { n:'ELIEZER LEAL BARBOSA', t:'1º ADM' },
  { n:'ENRICO SAMUEL PEREIRA HOSTERNO', t:'1º ADM' },
  { n:'FRANCISCA YARA GONCALVES DE SANTANA', t:'1º ADM' },
  { n:'FRANCISCO FÉLIX DINO JÚNIOR', t:'1º ADM' },
  { n:'FRANCISCO JHONANTAN GONÇALVES DA SILVA', t:'1º ADM' },
  { n:'HELOÁ MENDES ALVES', t:'1º ADM' },
  { n:'JOSÉ GUILHERME ALVES PIMENTEL', t:'1º ADM' },
  { n:'KELY FERNANDES DA SILVA', t:'1º ADM' },
  { n:'KEVEN VINICIUS ALVES DE OLIVEIRA', t:'1º ADM' },
  { n:'LAVINE MARIA FERREIRA FELIX', t:'1º ADM' },
  { n:'LUCAS VINICÍUS ALVES DA SILVA', t:'1º ADM' },
  { n:'LUIS ERIVAN FERNANDES DE SOUSA', t:'1º ADM' },
  { n:'MARIA ALICE FREIRE DA SILVA', t:'1º ADM' },
  { n:'MARIA CLARA DAMACENA DE SOUSA', t:'1º ADM' },
  { n:'MARIA FERNANDA DE SOUSA', t:'1º ADM' },
  { n:'MARIA JÚLIA DE SOUSA', t:'1º ADM' },
  { n:'MARIELLE PIRES DA SILVA', t:'1º ADM' },
  { n:'MIGUEL THARLEY BATISTA BARBOSA', t:'1º ADM' },
  { n:'PAULO VICTOR MOREIRA DA SILVA', t:'1º ADM' },
  { n:'PEDRO LUCAS BEZERRA DA COSTA', t:'1º ADM' },
  { n:'RANNIEL ALVES NOGUEIRA DA SILVA', t:'1º ADM' },
  { n:'RENNÃ DUARTE DA SILVA', t:'1º ADM' },
  { n:'THAYSSA DO NASCIMENTO SILVA', t:'1º ADM' },
  { n:'ALEXANDRA DUARTE LOPES DA ROCHA', t:'1º Cont. Ambiental' },
  { n:'ALICKY', t:'1º Cont. Ambiental' },
  { n:'ANA CLARA MOTA GOMES', t:'1º Cont. Ambiental' },
  { n:'ANA CLARA SOUSA SILVA', t:'1º Cont. Ambiental' },
  { n:'ANDRESSA OLIVEIRA DE SOUSA', t:'1º Cont. Ambiental' },
  { n:'ANNE VITÓRIA MARTINS CARVALHO', t:'1º Cont. Ambiental' },
  { n:'DÉBORA CAMILLE OLIVEIRA DE SOUSA', t:'1º Cont. Ambiental' },
  { n:'DEÍSE MARTINS LIMA', t:'1º Cont. Ambiental' },
  { n:'ELICKY SOARES LOIOLA', t:'1º Cont. Ambiental' },
  { n:'DAVID SILVA', t:'1º Cont. Ambiental' },
  { n:'GABRIELLY BRITO PEDROSA', t:'1º Cont. Ambiental' },
  { n:'GEOVANNA ANTONELE RIBEIRO DE SOUSA', t:'1º Cont. Ambiental' },
  { n:'JANICE VIANA DE SOUSA', t:'1º Cont. Ambiental' },
  { n:'LUIS DAVY DA SILVA RULIM', t:'1º Cont. Ambiental' },
  { n:'LUÍS GUSTAVO GOMES DE MELO', t:'1º Cont. Ambiental' },
  { n:'MAYSA ALVES SILVA', t:'1º Cont. Ambiental' },
  { n:'SARA OLIVEIRA CRIZANTINO', t:'1º Cont. Ambiental' },
  { n:'STEICIE DA SILVA LIMA', t:'1º Cont. Ambiental' },
  { n:'ANA SOPHIA GOMES DA SILVA', t:'2º Sistemas' },
  { n:'CARLOS MANOEL CAETANO', t:'2º Sistemas' },
  { n:'FRANCISCA INGRID TAINAR DA SILVA ADALBERTO', t:'2º Sistemas' },
  { n:'IAN BENÍCIO DE OLIVEIRA CARVALHO', t:'2º Sistemas' },
  { n:'JACKSON VICENTE DO NASCIMENTO', t:'2º Sistemas' },
  { n:'JOHNNATHAN RODRIGUES DA SILVA', t:'2º Sistemas' },
  { n:'JUAN LOIOLA DA SILVA', t:'2º Sistemas' },
  { n:'KAICK COSTA', t:'2º Sistemas' },
  { n:'LEO VICTOR FERREIRA LOIOLA', t:'2º Sistemas' },
  { n:'MARIA BEATRIZ XAVIER DE SOUSA', t:'2º Sistemas' },
  { n:'MIKLÊNYO JOSÉ LUSTOSA ALVES', t:'2º Sistemas' },
  { n:'NICOLAS OLIVEIRA DINIZ', t:'2º Sistemas' },
  { n:'PABLO KAUAN DE SOUSA NASCIMENTO', t:'2º Sistemas' },
  { n:'SHAUANY SOUZA LOPES', t:'2º Sistemas' },
  { n:'TAYNARA OLIVEIRA REIS', t:'2º Sistemas' },
  { n:'THIAGO LEVI NUNES PEREIRA', t:'2º Sistemas' },
  { n:'VALTER ALEXANDRE OLIVEIRA FERNANDES', t:'2º Sistemas' },
  { n:'ADÃO GUILHERMY PEREIRA DE ARAÚJO', t:'8º Ano A' },
  { n:'ALÍCYA VICTÓRIA DE OLIVEIRA MOREIRA', t:'8º Ano A' },
  { n:'ALLYSSON ZACQUEU DE SOUSA MELLO', t:'8º Ano A' },
  { n:'ANA MARIA VIEIRA MELO', t:'8º Ano A' },
  { n:'ARYELLE DE SOUSA SILVA', t:'8º Ano A' },
  { n:'CARLOS LAUAN ALVES DE SOUSA', t:'8º Ano A' },
  { n:'CAUANY MICENA DE ARAUJO', t:'8º Ano A' },
  { n:'DAVI VIEIRA NUNES', t:'8º Ano A' },
  { n:'FRANCISCO VITAL DE SOUSA', t:'8º Ano A' },
  { n:'JAILSON GONCALVES FERREIRA', t:'8º Ano A' },
  { n:'KAYK FERNANDES DE SOUSA', t:'8º Ano A' },
  { n:'KELLY GONÇALVES DE SOUSA', t:'8º Ano A' },
  { n:'LAYSA MARIA DA COSTA PIMENTEL', t:'8º Ano A' },
  { n:'LAYZA MARIA DE ARAUJO SOUSA', t:'8º Ano A' },
  { n:'LUIS FERNANDO BENVINDO DE SOUSA', t:'8º Ano A' },
  { n:'LUIS HENRIQUE BENVINDO DE SOUSA', t:'8º Ano A' },
  { n:'MARIA ALICY RODRIGUES SILVA', t:'8º Ano A' },
  { n:'MARIA SOFIA DA SILVA SOARES OLIVEIRA', t:'8º Ano A' },
  { n:'MARILUA NAYEVILEN FERREIRA SOARES', t:'8º Ano A' },
  { n:'MIRELY GABRIELE DE SOUSA SILVA', t:'8º Ano A' },
  { n:'PAULO GULAR CARVALHO ACENA', t:'8º Ano A' },
  { n:'PEDRO JOSÉ DE SOUSA MELO', t:'8º Ano A' },
  { n:'RITA LUARA FERREIRA DE SOUSA', t:'8º Ano A' },
  { n:'RUTY HELEN RODRIGUES FERREIRA', t:'8º Ano A' },
  { n:'SAMUEL ANTONIO MARTINS SANTOS', t:'8º Ano A' },
  { n:'SAMYLLA PEREIRA DE ANDRADE', t:'8º Ano A' },
  { n:'ANTONIA ISABELLY GONÇALVES DA SILVA', t:'8º Ano B' },
  { n:'ANTONIO GUILHERME DA SILVA TEIXEIRA', t:'8º Ano B' },
  { n:'ANTONIO RICHARLIS DANIEL MARQUES', t:'8º Ano B' },
  { n:'AUGUSTO NETO LIMA GOMES', t:'8º Ano B' },
  { n:'DEYVID EMANOEL RIBEIRO DE CARVALHO', t:'8º Ano B' },
  { n:'FRANCISCO HENRIQUE DE SOUSA SOARES', t:'8º Ano B' },
  { n:'GUILHERME DOS SANTOS PINHEIRO', t:'8º Ano B' },
  { n:'HELEN GABRIELA VIEIRA BARROSO', t:'8º Ano B' },
  { n:'JOÃO PEDRO ALVES GOMES DUARTE', t:'8º Ano B' },
  { n:'JOÃO PEDRO ROMÃO MOTA', t:'8º Ano B' },
  { n:'JOISE KELLY DE MORAIS SILVA', t:'8º Ano B' },
  { n:'JOSÉ MATHEUS DA SILVA PEREIRA', t:'8º Ano B' },
  { n:'JOSÉ WELLINTON LIMA ANDRADE', t:'8º Ano B' },
  { n:'KAUAN ALVES CARDOSO', t:'8º Ano B' },
  { n:'KAUENNE ROMÃO LIMA', t:'8º Ano B' },
  { n:'LIVYA RAQUEL PEREIRA DA SILVA', t:'8º Ano B' },
  { n:'MANOEL ANTAO DE CARVALHO NETO', t:'8º Ano B' },
  { n:'MANOEL NETO MENDES LIMA', t:'8º Ano B' },
  { n:'MARIA LAYSA FERREIRA GOMES', t:'8º Ano B' },
  { n:'NIVIA MARIA PINHEIRO CARVALHO', t:'8º Ano B' },
  { n:'PEDRO VICTOR GOMES DA COSTA', t:'8º Ano B' },
  { n:'RENATA VITÓRIA SOUZA NORONHA', t:'8º Ano B' },
  { n:'VANDERMILSON GALDINO LOIOLA JÚNIOR', t:'8º Ano B' },
  { n:'VITOR EMANOEL DE LIMA', t:'8º Ano B' },
  { n:'WANE MARQUES ALVES DA SILVA', t:'8º Ano B' }
];

const SEED_AULAS = [
  {dia:1,ini:'07:30',fim:'08:30',turma:'2º Sistemas',materia:'DevOps'},
  {dia:1,ini:'16:10',fim:'17:10',turma:'2º Sistemas',materia:'Manutenção de Sistemas'},
  {dia:2,ini:'10:20',fim:'11:20',turma:'8º Ano A',materia:'Computação'},
  {dia:2,ini:'12:50',fim:'13:50',turma:'2º Sistemas',materia:'Arquitetura de Microsserviços'},
  {dia:2,ini:'13:50',fim:'14:50',turma:'2º Sistemas',materia:'Mentoria Tec'},
  {dia:2,ini:'15:10',fim:'16:10',turma:'1º ADM'},
  {dia:3,ini:'07:00',fim:'08:00',turma:'8º Ano B'},
  {dia:3,ini:'08:30',fim:'09:30',turma:'1º Cont. Ambiental'},
  {dia:3,ini:'15:10',fim:'16:10',turma:'2º Sistemas',materia:'Front-end'},
  {dia:4,ini:'07:30',fim:'08:30',turma:'2º Sistemas',materia:'Sistemas DevOps'},
  {dia:4,ini:'12:50',fim:'13:50',turma:'2º Sistemas',materia:'Manutenção de Sistemas'},
  {dia:5,ini:'16:10',fim:'17:10',turma:'2º Sistemas',materia:'Pensamento Computacional'}
];

const CONFIG_DEFAULT = { tema:'auto', avisoMin:10, notifAtiva:false, feriados:[], nomeProf:'Antonio Elio dos Santos Negreiros' };
const RENOMEAR = {
  '8º Série A':'8º Ano A','8º Série B':'8º Ano B',
  '1º Cont. Amb.':'1º Cont. Ambiental','1º CONT. AMB':'1º Cont. Ambiental',
  '1º CONT AMB':'1º Cont. Ambiental'
};

const K = { aulas:'h4.aulas', geral:'h4.geral', alunos:'h4.alunos',
  vistos:'h4.vistos', config:'h4.config' };

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,7);
const hoje = () => new Date();
function horaAgora(){ const d=hoje(); return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0'); }
function chaveData(d){ return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function fmtData(c){ const [y,m,d]=c.split('-').map(Number); return String(d).padStart(2,'0')+'/'+String(m).padStart(2,'0')+'/'+y; }
function fmtDataCurto(c){ const [y,m,d]=c.split('-').map(Number); return String(d).padStart(2,'0')+'/'+String(m).padStart(2,'0'); }
function toMin(h){ const [a,b]=h.split(':').map(Number); return a*60+b; }
function diffMin(a,b){ return toMin(a)-toMin(b); }
function iniciais(nome){
  const p = nome.trim().split(/\s+/);
  return ((p[0]||'')[0] + (p[p.length-1]||'')[0] || '?').toUpperCase();
}
function corDe(str){
  const cores=['#3b82f6','#06b6d4','#6366f1','#0ea5e9','#38bdf8','#8b5cf6','#0891b2','#2563eb','#0284c7','#60a5fa'];
  let h=0; for(let i=0;i<str.length;i++) h=(h*31+str.charCodeAt(i))|0;
  return cores[Math.abs(h)%cores.length];
}

const ler = k => { try{ const r=localStorage.getItem(k); return r?JSON.parse(r):null; }catch(e){ return null; } };
const gravar = (k,v) => localStorage.setItem(k, JSON.stringify(v));

/* ═══════ ESTADO ═══════ */
const S = {
  aulas: [], geral: [], alunos: [], vistos: [], config: {...CONFIG_DEFAULT},
  tab: 'horario', sub: 'calendario', diaSel: hoje().getDay(), turmaAluno: TURMAS[0],
  filtroVisto: 'marcar', calMes: hoje().getMonth(), calAno: hoje().getFullYear(),
  calDiaSel: chaveData(hoje()), busca: '', filtroLista: 'todos',
  turmaRel: '__all', notifSessao: new Set(),
  calDiaAtivo: chaveData(hoje())
};

/* ═══════ MIGRAÇÃO E CARREGAMENTO ═══════ */
function migrarNomes(arr){ arr.forEach(a => { if(RENOMEAR[a.turma]) a.turma = RENOMEAR[a.turma]; }); }

function migrarAluno(a){
  if(MIGRA_NIVEL[a.nivel]) a.nivel = MIGRA_NIVEL[a.nivel];
  if(!NIVEL_MAP[a.nivel]) a.nivel = 'bom';
  if(!Array.isArray(a.notas)) a.notas = [];
  return a;
}

function migrarVisto(v){
  if(!v.status){
    v.status = {};
    if(Array.isArray(v.presentes)){
      v.presentes.forEach(id => { v.status[id] = 'presente'; });
    }
    delete v.presentes;
  }
  return v;
}

function carregarTudo(){
  S.aulas = ler(K.aulas) || SEED_AULAS.map((a,i)=>({id:'s'+i, ...a}));
  S.geral = ler(K.geral) || [];
  const SEED_VER = 'v5.0-112';
  const jaSalvos = ler(K.alunos);
  if(localStorage.getItem('h5.seedVer') === SEED_VER && jaSalvos){
    S.alunos = jaSalvos.map(migrarAluno);
  } else if(jaSalvos && jaSalvos.length){
    const existentes = new Set(jaSalvos.map(a => a.turma + '||' + a.nome.toUpperCase()));
    const novos = SEED_ALUNOS.filter(s => !existentes.has(s.t + '||' + s.n.toUpperCase()));
    S.alunos = [
      ...jaSalvos.map(migrarAluno),
      ...novos.map(s => ({id:uid(), nome:s.n, turma:s.t, nivel:'bom', notas:[]}))
    ];
    localStorage.setItem('h5.seedVer', SEED_VER);
  } else {
    S.alunos = SEED_ALUNOS.map(s => ({id:uid(), nome:s.n, turma:s.t, nivel:'bom', notas:[]}));
    localStorage.setItem('h5.seedVer', SEED_VER);
  }
  S.vistos = (ler(K.vistos) || []).map(migrarVisto);
  S.config = {...CONFIG_DEFAULT, ...(ler(K.config)||{})};
  migrarNomes(S.aulas); migrarNomes(S.geral);
  salvarTudo();
}
function salvarTudo(){
  gravar(K.aulas, S.aulas); gravar(K.geral, S.geral);
  gravar(K.alunos, S.alunos); gravar(K.vistos, S.vistos);
  gravar(K.config, S.config);
}

/* ═══════ TEMA ═══════ */
function aplicarTema(){
  document.documentElement.setAttribute('data-tema', S.config.tema || 'auto');
  const escuro = S.config.tema==='escuro' ||
    (S.config.tema==='auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  const meta = document.querySelector('meta[name="theme-color"]');
  if(meta) meta.setAttribute('content', escuro ? '#070c1a' : '#2563eb');
}

/* ═══════ TOAST ═══════ */
let tTimer;
function toast(msg){
  const t = $('#toast'); t.innerHTML = msg; t.classList.add('on');
  clearTimeout(tTimer); tTimer = setTimeout(()=>t.classList.remove('on'), 2400);
}

/* ═══════ MODAL ═══════ */
function abrirModal(html){
  const sheet = $('#sheet'); sheet.innerHTML = '<div class="sheet-grab"></div>' + html;
  $('#modal').classList.add('aberto');
}
function fecharModal(){ $('#modal').classList.remove('aberto'); }
$('#modal').addEventListener('click', e => { if(e.target.id === 'modal') fecharModal(); });

/* ═══════ PRESENÇA ═══════ */
function proximoStatus(atual){
  if(atual === 'presente') return 'ausente';
  if(atual === 'ausente') return 'justificado';
  if(atual === 'justificado') return 'presente';
  return 'presente';
}
function getStatusAluno(aulaId, data, alunoId){
  const v = S.vistos.find(x => x.aulaId === aulaId && x.data === data);
  if(!v || !v.status) return 'pendente';
  return v.status[alunoId] || 'pendente';
}
function setStatusAluno(aula, data, alunoId, status){
  let v = S.vistos.find(x => x.aulaId === aula.id && x.data === data);
  if(!v){
    v = { id: uid(), aulaId: aula.id, data, turma: aula.turma, status: {} };
    S.vistos.push(v);
  }
  if(!v.status) v.status = {};
  if(status === 'pendente') delete v.status[alunoId];
  else v.status[alunoId] = status;
  gravar(K.vistos, S.vistos);
}
function resumoAula(aulaId, data, turma){
  const alunos = S.alunos.filter(a => a.turma === turma);
  const v = S.vistos.find(x => x.aulaId === aulaId && x.data === data);
  let pres=0, aus=0, jus=0, pen=0;
  alunos.forEach(a => {
    const st = (v && v.status && v.status[a.id]) || 'pendente';
    if(st === 'presente') pres++;
    else if(st === 'ausente') aus++;
    else if(st === 'justificado') jus++;
    else pen++;
  });
  return { total: alunos.length, pres, aus, jus, pen };
}
function resumoTurmaHoje(turma){
  const alunos = S.alunos.filter(a => a.turma === turma);
  const chHoje = chaveData(hoje());
  const chamadasHoje = S.vistos.filter(v => v.turma === turma && v.data === chHoje);
  let pres=0, aus=0, jus=0, pen=0;
  alunos.forEach(a => {
    let st = null;
    for(const c of chamadasHoje){
      if(c.status && c.status[a.id]) { st = c.status[a.id]; break; }
    }
    if(!st) pen++;
    else if(st === 'presente') pres++;
    else if(st === 'ausente') aus++;
    else if(st === 'justificado') jus++;
  });
  return { total: alunos.length, pres, aus, jus, pen };
}
function statsAluno(alunoId, turma, dias){
  dias = dias || 90;
  const limite = new Date(); limite.setDate(limite.getDate() - dias);
  const chamadas = S.vistos.filter(v => v.turma === turma && new Date(v.data + 'T12:00') >= limite);
  let pres=0, aus=0, jus=0, tot=0;
  chamadas.forEach(v => {
    const st = v.status && v.status[alunoId];
    if(!st) return;
    tot++;
    if(st === 'presente') pres++;
    else if(st === 'ausente') aus++;
    else if(st === 'justificado') jus++;
  });
  const freq = tot ? Math.round(pres / tot * 100) : null;
  return { pres, aus, jus, tot, freq };
}

function detectarConflitos(items){
  const ids = new Set();
  for(let i=0;i<items.length;i++) for(let j=i+1;j<items.length;j++){
    const a=items[i], b=items[j];
    if(!a.sala || !b.sala) continue;
    if(a.sala.trim().toLowerCase() !== b.sala.trim().toLowerCase()) continue;
    const aFim = a.fim || '23:59', bFim = b.fim || '23:59';
    if(a.ini < bFim && b.ini < aFim){ ids.add(a.id); ids.add(b.id); }
  }
  return ids;
}

function dataDaSemana(dow){
  const hj = new Date();
  const diaHoje = hj.getDay();
  const offset = dow - diaHoje;
  const d = new Date(hj);
  d.setDate(d.getDate() + offset);
  return chaveData(d);
}

/* ═══════ CONTAGEM ═══════ */
function segundosAte(hhmm){
  const agora = new Date();
  const [h,m] = hhmm.split(':').map(Number);
  const alvo = new Date(agora);
  alvo.setHours(h, m, 0, 0);
  return Math.max(0, Math.floor((alvo - agora) / 1000));
}
function formatarContagem(seg){
  if(seg <= 0) return '00:00';
  const h = Math.floor(seg/3600);
  const m = Math.floor((seg%3600)/60);
  const s = seg%60;
  if(h > 0) return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

/* ═══════ RENDER PRINCIPAL ═══════ */
function render(){
  aplicarTema();
  renderHero();
  renderChipsCtx();
  renderBottomNav();
  renderFab();
  renderMain();
  $('#agora').textContent = horaAgora().replace(':','h');
}

function renderHero(){
  const iconEl = $('#hero-icon');
  const titulos = {
    horario: { ico:'i-calendar',      t:'Horário',  sub:'Calendário e aulas' },
    alunos:  { ico:'i-users-group',   t:'Alunos',   sub:'Gestão de turmas' },
    vistos:  { ico:'i-check-circle',  t:'Vistos',   sub:'Presença e relatórios' },
    config:  { ico:'i-settings',      t:'Ajustes',  sub:'Configurações' }
  };
  const info = titulos[S.tab] || titulos.horario;
  iconEl.innerHTML = `<svg><use href="#${info.ico}"/></svg>`;
  $('#titulo-principal').textContent = info.t;
  $('#subtitulo').textContent = info.sub;
}

function renderChipsCtx(){
  const el = $('#chips-ctx');
  if(S.tab === 'horario'){
    const subs = [
      ['calendario','i-calendar', 'Calendário'],
      ['semana',    'i-grid',     'Semana'],
      ['geral',     'i-users-group','Geral']
    ];
    el.innerHTML = `<div class="chips" style="margin-top:12px">${
      subs.map(([v,i,t]) =>
        `<button class="chip${S.sub===v?' on':''}" data-sub="${v}">${ico(i,'ico-14')}${t}</button>`).join('')
    }</div>`;
    el.querySelectorAll('button').forEach(b => {
      b.onclick = () => { S.sub = b.dataset.sub; render(); window.scrollTo({top:0,behavior:'smooth'}); };
    });
    return;
  }
  if(S.tab === 'alunos'){
    const qtdAtual = S.alunos.filter(a => a.turma === S.turmaAluno).length;
    el.innerHTML = `
      <div class="turma-selector-wrap">
        <button class="turma-selector" id="btn-turma">
          <div class="turma-selector-icon">${ico('i-users-group','ico-18')}</div>
          <div class="turma-selector-text">
            <div class="turma-selector-label">Turma</div>
            <div class="turma-selector-value">${esc(S.turmaAluno)} <span class="turma-selector-count">· ${qtdAtual} aluno${qtdAtual===1?'':'s'}</span></div>
          </div>
          <div class="turma-selector-chevron">${ico('i-chevron-down','ico-18')}</div>
        </button>
      </div>`;
    el.querySelector('#btn-turma').onclick = () => abrirSeletorTurma();
    return;
  }
  if(S.tab === 'vistos'){
    el.innerHTML = `<div class="seg-tabs" style="margin-top:12px">
      <button class="seg-tab${S.filtroVisto==='marcar'?' on':''}" data-v="marcar">${ico('i-check-circle','ico-16')} Marcar</button>
      <button class="seg-tab${S.filtroVisto==='relatorio'?' on':''}" data-v="relatorio">${ico('i-chart','ico-16')} Relatórios</button>
    </div>`;
    el.querySelectorAll('button').forEach(b => {
      b.onclick = () => { S.filtroVisto = b.dataset.v; render(); };
    });
    return;
  }
  el.innerHTML = '';
}

function renderBottomNav(){
  $$('#bottom-nav button').forEach(b => b.classList.toggle('on', b.dataset.tab === S.tab));
}
function renderFab(){
  const show = S.tab !== 'config' &&
    !(S.tab === 'horario' && S.sub === 'semana');
  $('#add').classList.toggle('hide', !show);
}
function renderMain(){
  const main = $('#main');
  main.innerHTML = '';
  if(S.tab === 'horario'){
    if(S.sub === 'calendario') renderCalendario(main);
    else if(S.sub === 'semana') renderSemana(main);
    else if(S.sub === 'geral') renderGeral(main);
  }
  else if(S.tab === 'alunos') renderAlunos(main);
  else if(S.tab === 'vistos') renderVistos(main);
  else if(S.tab === 'config') renderConfig(main);
}

/* ═══════ CALENDÁRIO ═══════ */
function renderCalendario(main){
  const card = document.createElement('div');
  card.className = 'card';

  const head = document.createElement('div');
  head.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:8px';
  head.innerHTML = `
    <button id="cal-prev" style="width:38px;height:38px;border-radius:12px;border:0;background:var(--card-2);color:var(--text);cursor:pointer;display:grid;place-items:center">
      ${ico('i-chevron-left','ico-18')}
    </button>
    <h2 style="margin:0;font-size:17px;font-weight:800;letter-spacing:-.4px;text-transform:capitalize">${MESES[S.calMes]} ${S.calAno}</h2>
    <button id="cal-next" style="width:38px;height:38px;border-radius:12px;border:0;background:var(--card-2);color:var(--text);cursor:pointer;display:grid;place-items:center">
      ${ico('i-chevron-right','ico-18')}
    </button>`;
  card.appendChild(head);

  const grid = document.createElement('div');
  grid.style.cssText = 'display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-top:6px';
  ['D','S','T','Q','Q','S','S'].forEach(dow => {
    const el = document.createElement('div');
    el.style.cssText = 'text-align:center;font-size:11px;font-weight:800;color:var(--muted);padding:8px 0;text-transform:uppercase';
    el.textContent = dow;
    grid.appendChild(el);
  });

  const primeiroDia = new Date(S.calAno, S.calMes, 1).getDay();
  const diasNoMes = new Date(S.calAno, S.calMes+1, 0).getDate();
  const diasNoMesAnt = new Date(S.calAno, S.calMes, 0).getDate();
  const dHoje = hoje();
  const chHoje = chaveData(dHoje);

  for(let i = primeiroDia - 1; i >= 0; i--){
    const el = document.createElement('button');
    el.style.cssText = 'aspect-ratio:1;border:0;background:transparent;color:var(--muted);opacity:.3;font-family:inherit;font-size:14px;font-weight:700;border-radius:12px;cursor:default';
    el.textContent = diasNoMesAnt - i;
    grid.appendChild(el);
  }
  for(let d = 1; d <= diasNoMes; d++){
    const data = new Date(S.calAno, S.calMes, d);
    const chave = chaveData(data);
    const dow = data.getDay();
    const aulasDoDia = S.aulas.filter(a => a.dia === dow);
    const feriado = S.config.feriados.includes(chave);
    const ehHoje = chave === chHoje;
    const sel = chave === S.calDiaAtivo;

    const el = document.createElement('button');
    el.style.cssText = `aspect-ratio:1;border:0;background:transparent;color:var(--text);
      font-family:inherit;font-size:14px;font-weight:700;border-radius:12px;
      cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;
      position:relative;transition:transform .12s;${ehHoje?'background:var(--grad-primary-cyan);color:#fff;':''}
      ${feriado&&!ehHoje?'background:var(--yellow-soft);color:var(--yellow);':''}
      ${sel&&!ehHoje?'box-shadow:0 0 0 2.5px var(--primary);':''}
      ${sel&&ehHoje?'box-shadow:0 0 0 2.5px #06b6d4;':''}`;
    el.innerHTML = `<span>${d}</span>`;
    if(aulasDoDia.length && !feriado){
      const dots = document.createElement('div');
      dots.style.cssText = 'display:flex;gap:2.5px;height:5px';
      [...new Set(aulasDoDia.map(a => a.turma))].slice(0,3).forEach(t => {
        const dt = document.createElement('span');
        dt.style.cssText = `width:5px;height:5px;border-radius:50%;background:${ehHoje?'rgba(255,255,255,.9)':(COR_TURMA_SOLID[t] || '#2563eb')}`;
        dots.appendChild(dt);
      });
      el.appendChild(dots);
    }
    el.onclick = () => { S.calDiaAtivo = chave; render(); };
    grid.appendChild(el);
  }
  const total = primeiroDia + diasNoMes;
  const restantes = (7 - total % 7) % 7;
  for(let i = 1; i <= restantes; i++){
    const el = document.createElement('button');
    el.style.cssText = 'aspect-ratio:1;border:0;background:transparent;color:var(--muted);opacity:.3;font-family:inherit;font-size:14px;font-weight:700;border-radius:12px;cursor:default';
    el.textContent = i;
    grid.appendChild(el);
  }
  card.appendChild(grid);
  main.appendChild(card);

  setTimeout(() => {
    const p = document.getElementById('cal-prev'), n = document.getElementById('cal-next');
    if(p) p.onclick = () => { S.calMes--; if(S.calMes<0){S.calMes=11;S.calAno--;} render(); };
    if(n) n.onclick = () => { S.calMes++; if(S.calMes>11){S.calMes=0;S.calAno++;} render(); };
  }, 0);

  const [y,m,dd] = S.calDiaAtivo.split('-').map(Number);
  const dataSel = new Date(y, m-1, dd);
  const dowSel = dataSel.getDay();
  const aulasSel = S.aulas.filter(a => a.dia === dowSel).sort((a,b)=>a.ini.localeCompare(b.ini));
  const feriadoSel = S.config.feriados.includes(S.calDiaAtivo);
  const ehHojeSel = S.calDiaAtivo === chHoje;

  const sec = document.createElement('div');
  sec.className = 'section-h';
  sec.innerHTML = `${ico('i-calendar','ico-20 lead')}<h3>${dd} de ${MESES[m-1]} · ${DIAS[dowSel]}</h3><span class="count">${aulasSel.length} aula${aulasSel.length===1?'':'s'}</span>`;
  main.appendChild(sec);

  if(feriadoSel){
    const v = document.createElement('div');
    v.className = 'vazio';
    v.innerHTML = `${ico('i-star','ico')}Feriado 🎉<br>Aproveite o descanso`;
    main.appendChild(v);
    return;
  }
  if(!aulasSel.length){
    const v = document.createElement('div');
    v.className = 'vazio';
    v.innerHTML = `${ico('i-calendar','ico')}Sem aulas neste dia.`;
    main.appendChild(v);
    return;
  }

  if(ehHojeSel){
    const cd = criarCountdownCard(aulasSel);
    main.appendChild(cd);
  }

  aulasSel.forEach(a => {
    main.appendChild(criarAulaCardComContagem(a, dowSel, ehHojeSel));
  });

  if(!ehHojeSel){
    const av = document.createElement('div');
    av.style.cssText = 'text-align:center;font-size:12px;color:var(--muted);padding:10px;font-weight:600';
    av.textContent = `Mostrando aulas de ${DIAS[dowSel]}`;
    main.appendChild(av);
  }

  iniciarTickContagem();
}

/* ═══════ COUNTDOWN ═══════ */
function criarCountdownCard(aulasSel){
  const card = document.createElement('div');
  card.className = 'countdown';
  card.id = 'countdown-card';
  atualizarConteudoCountdown(card, aulasSel);
  return card;
}
function atualizarConteudoCountdown(card, aulasSel){
  const hhmm = horaAgora();
  const atual = aulasSel.find(a => a.ini <= hhmm && hhmm < (a.fim || '23:59'));
  const prox = aulasSel.find(a => a.ini > hhmm);

  if(atual){
    const segRestantes = segundosAte(atual.fim || '23:59');
    card.innerHTML = `
      <div class="countdown-header">
        <span class="dot-live"></span>
        <span>AULA ACONTECENDO AGORA</span>
      </div>
      <div class="countdown-timer" id="cd-timer">${formatarContagem(segRestantes)}<small>restantes</small></div>
      <div class="countdown-aula">
        <div class="countdown-aula-icon">${ico('i-dot','ico-22')}</div>
        <div class="countdown-aula-info">
          <div class="countdown-aula-turma">${esc(atual.turma)}</div>
          <div class="countdown-aula-meta">${esc(atual.materia || 'Sem matéria')} · termina às ${esc(atual.fim || '?')}</div>
        </div>
      </div>`;
    card.dataset.modo = 'atual';
    card.dataset.aulaId = atual.id;
    return;
  }
  if(prox){
    const segAte = segundosAte(prox.ini);
    card.innerHTML = `
      <div class="countdown-header">
        <span class="dot-live"></span>
        <span>PRÓXIMA AULA</span>
      </div>
      <div class="countdown-timer" id="cd-timer">${formatarContagem(segAte)}<small>para começar</small></div>
      <div class="countdown-aula">
        <div class="countdown-aula-icon">${ico('i-hourglass','ico-22')}</div>
        <div class="countdown-aula-info">
          <div class="countdown-aula-turma">${esc(prox.turma)}</div>
          <div class="countdown-aula-meta">${esc(prox.materia || 'Sem matéria')} · começa às ${esc(prox.ini)}</div>
        </div>
      </div>`;
    card.dataset.modo = 'prox';
    card.dataset.aulaId = prox.id;
    return;
  }
  card.innerHTML = `
    <div class="countdown-empty">
      <div class="countdown-header"><span>FIM DO DIA</span></div>
      <div class="title">Todas as aulas terminaram 🎉</div>
      <div class="sub">Bom descanso! Volte amanhã para conferir o próximo dia.</div>
    </div>`;
  card.dataset.modo = 'fim';
  delete card.dataset.aulaId;
}

/* ═══════ AULA CARD COM CONTAGEM ═══════ */
function criarAulaCardComContagem(a, dowSel, ehHoje){
  const agora = horaAgora();
  const atual = ehHoje && a.ini <= agora && agora < (a.fim || '23:59');
  const passada = ehHoje && agora >= (a.fim || '23:59');
  const proxima = ehHoje && !atual && !passada;
  const escola = ESCOLA_DA_TURMA[a.turma];
  const grad = GRAD_TURMA[a.turma] || 'var(--grad-primary-cyan)';
  const corChip = COR_TURMA_SOLID[a.turma] || '#2563eb';

  const el = document.createElement('div');
  el.className = 'aula-card';
  el.style.position = 'relative';
  el.style.overflow = 'hidden';
  if(atual){
    el.style.boxShadow = `0 0 0 2px ${corChip}, 0 12px 28px -14px ${corChip}88`;
    el.style.background = 'var(--card)';
  } else if(passada){
    el.style.opacity = '0.62';
  }

  const barra = document.createElement('div');
  barra.style.cssText = `position:absolute;left:0;top:0;bottom:0;width:4px;background:${corChip};${passada?'opacity:.45':''}`;
  el.appendChild(barra);

  const header = document.createElement('div');
  header.className = 'aula-head';
  header.style.paddingLeft = '8px';
  header.innerHTML = `
    <div class="aula-icon" style="background:${grad}">${ico('i-book','ico-22')}</div>
    <div class="aula-body">
      <div class="aula-turma">${esc(a.turma)}</div>
      <div class="aula-sub">${a.materia?esc(a.materia):'Sem matéria'}</div>
      <div class="aula-meta">
        <span>${ico('i-clock','ico-14')} ${esc(a.ini)}${a.fim?' – '+esc(a.fim):''}</span>
        ${escola?`<span>${ico('i-school','ico-14')} ${esc(escola)}</span>`:''}
        ${a.sala?`<span>${ico('i-map-pin','ico-14')} ${esc(a.sala)}</span>`:''}
      </div>
    </div>
    <div class="aluno-chevron">${ico('i-chevron-right','ico-18')}</div>`;
  el.appendChild(header);

  if(ehHoje && (atual || proxima) && a.fim){
    const linha = document.createElement('div');
    linha.style.cssText = `
      display:flex;align-items:center;gap:8px;
      margin-top:14px;padding-top:12px;
      border-top:1px solid var(--border-2);
      font-size:12.5px;font-weight:700;
      color:${atual?'var(--green)':'var(--primary)'};`;
    const icoL = atual ? 'i-dot' : 'i-hourglass';
    const label = atual ? 'Termina em' : 'Começa em';
    linha.innerHTML = `
      ${ico(icoL,'ico-14')}
      <span style="opacity:.8">${label}</span>
      <span class="cd-inline" data-ini="${a.ini}" data-fim="${a.fim}" data-modo="${atual?'atual':'prox'}"
        style="margin-left:auto;font-variant-numeric:tabular-nums;font-size:16px;font-weight:800;letter-spacing:-.3px;color:inherit">
        --:--
      </span>`;
    el.appendChild(linha);
  } else if(passada){
    const linha = document.createElement('div');
    linha.style.cssText = `display:flex;align-items:center;gap:6px;margin-top:12px;padding-top:10px;border-top:1px solid var(--border-2);font-size:11.5px;font-weight:700;color:var(--muted);`;
    linha.innerHTML = `${ico('i-check','ico-12')} Aula encerrada`;
    el.appendChild(linha);
  } else if(!ehHoje){
    const linha = document.createElement('div');
    linha.style.cssText = `display:flex;align-items:center;gap:6px;margin-top:12px;padding-top:10px;border-top:1px solid var(--border-2);font-size:11.5px;font-weight:700;color:var(--muted);`;
    linha.innerHTML = `${ico('i-calendar','ico-12')} ${DIAS[dowSel]}`;
    el.appendChild(linha);
  }

  el.onclick = () => abrirEdicaoAula(a.id, 'aula');
  return el;
}

/* ═══════ TICK CONTAGEM ═══════ */
let tickContagemTimer = null;
function iniciarTickContagem(){
  if(tickContagemTimer) clearInterval(tickContagemTimer);
  atualizarContagens();
  tickContagemTimer = setInterval(atualizarContagens, 1000);
}
function pararTickContagem(){
  if(tickContagemTimer){ clearInterval(tickContagemTimer); tickContagemTimer = null; }
}
function atualizarContagens(){
  if(document.hidden) return;
  if(S.tab !== 'horario' || S.sub !== 'calendario') return;

  const cdCard = document.getElementById('countdown-card');
  if(cdCard){
    const [y,m,dd] = S.calDiaAtivo.split('-').map(Number);
    const dowSel = new Date(y, m-1, dd).getDay();
    const aulasSel = S.aulas.filter(a => a.dia === dowSel).sort((a,b)=>a.ini.localeCompare(b.ini));
    atualizarConteudoCountdown(cdCard, aulasSel);
  }
  document.querySelectorAll('.cd-inline').forEach(el => {
    const ini = el.dataset.ini;
    const fim = el.dataset.fim;
    const modo = el.dataset.modo;
    const seg = modo === 'atual' ? segundosAte(fim) : segundosAte(ini);
    el.textContent = formatarContagem(seg);
  });
  const elAg = document.getElementById('agora');
  if(elAg) elAg.textContent = horaAgora().replace(':','h');
}

/* ═══════ SEMANA ═══════ */
function renderSemana(main){
  const dHoje = hoje().getDay();
  let tem = false;
  ORDEM.forEach(d => {
    const lista = S.aulas.filter(a => a.dia === d).sort((a,b)=>a.ini.localeCompare(b.ini));
    if(!lista.length) return;
    tem = true;
    const sec = document.createElement('div');
    sec.className = 'section-h';
    sec.innerHTML = `${ico('i-calendar','ico-20 lead')}<h3>${DIAS[d]}${d===dHoje?' · hoje':''}</h3><span class="count">${lista.length}</span>`;
    main.appendChild(sec);
    lista.forEach(a => main.appendChild(criarAulaCardSimples(a, d)));
  });
  if(!tem){
    const v = document.createElement('div');
    v.className = 'vazio';
    v.innerHTML = `${ico('i-grid','ico')}Nenhuma aula cadastrada.`;
    main.appendChild(v);
  }
  pararTickContagem();
}

function criarAulaCardSimples(a, diaRef){
  const dHoje = hoje().getDay();
  const agora = horaAgora();
  const atual = diaRef === dHoje && a.ini <= agora && agora < (a.fim || '23:59');
  const escola = ESCOLA_DA_TURMA[a.turma];
  const grad = GRAD_TURMA[a.turma] || 'var(--grad-primary-cyan)';
  const corChip = COR_TURMA_SOLID[a.turma] || '#2563eb';

  const el = document.createElement('div');
  el.className = 'aula-card';
  if(atual) el.style.boxShadow = `0 0 0 2px ${corChip}, var(--shadow-sm)`;
  el.innerHTML = `
    <div class="aula-head">
      <div class="aula-icon" style="background:${grad}">${ico('i-book','ico-22')}</div>
      <div class="aula-body">
        <div class="aula-turma">${esc(a.turma)}</div>
        <div class="aula-sub">${a.materia?esc(a.materia):'Sem matéria'}</div>
        <div class="aula-meta">
          <span>${ico('i-clock','ico-14')} ${esc(a.ini)}${a.fim?' – '+esc(a.fim):''}</span>
          ${escola?`<span>${ico('i-school','ico-14')} ${esc(escola)}</span>`:''}
          ${a.sala?`<span>${ico('i-map-pin','ico-14')} ${esc(a.sala)}</span>`:''}
        </div>
      </div>
      <div class="aluno-chevron">${ico('i-chevron-right','ico-18')}</div>
    </div>`;
  el.onclick = () => abrirEdicaoAula(a.id, 'aula');
  return el;
}

/* ═══════ GERAL ═══════ */
function renderGeral(main){
  pararTickContagem();
  const chips = document.createElement('div');
  chips.className = 'chips';
  [['tudo','Tudo'],['minhas','Minhas'],['outras','Outras']].forEach(([v,t]) => {
    const c = document.createElement('button');
    c.className = 'chip' + ((window._fg||'tudo') === v ? ' on':'');
    c.textContent = t;
    c.onclick = () => { window._fg = v; render(); };
    chips.appendChild(c);
  });
  main.appendChild(chips);
  const filtro = window._fg || 'tudo';

  const aulasDia = S.aulas.filter(a => a.dia === S.diaSel).map(a => ({...a, _tipo:'aula'}));
  const geralDia = S.geral.filter(a => a.dia === S.diaSel).map(a => ({...a, _tipo:'geral'}));
  let todas = [...aulasDia, ...geralDia].sort((a,b)=>a.ini.localeCompare(b.ini));
  if(filtro === 'minhas') todas = todas.filter(a => a._tipo === 'aula');
  else if(filtro === 'outras') todas = todas.filter(a => a._tipo === 'geral');

  const conflitos = detectarConflitos([...aulasDia, ...geralDia]);
  if(conflitos.size){
    const aviso = document.createElement('div');
    aviso.className = 'card';
    aviso.style.cssText = 'background:linear-gradient(135deg,#fee2e2,#fff1f2);border-color:rgba(239,68,68,.3);display:flex;align-items:center;gap:14px';
    aviso.innerHTML = `
      <div class="aula-icon" style="background:linear-gradient(135deg,#ef4444,#dc2626)">${ico('i-alert','ico-22')}</div>
      <div>
        <div style="font-size:10.5px;font-weight:800;letter-spacing:1.2px;color:#dc2626">ATENÇÃO</div>
        <div style="font-size:15px;font-weight:800;margin-top:3px">${conflitos.size} aulas com choque de sala</div>
        <div style="font-size:12px;color:var(--muted);font-weight:600;margin-top:2px">Reserve o lab antes dos colegas</div>
      </div>`;
    main.appendChild(aviso);
  }

  if(!todas.length){
    const v = document.createElement('div');
    v.className = 'vazio';
    v.innerHTML = `${ico('i-users-group','ico')}
      ${filtro==='outras'?'Nenhuma aula de colega.<br>Toque em <b>+</b> para adicionar.':'Sem aulas neste dia.'}`;
    main.appendChild(v);
    return;
  }

  const agora = horaAgora();
  const dHoje = hoje().getDay();
  todas.forEach(a => {
    const ehMinha = a._tipo === 'aula';
    const temConflito = conflitos.has(a.id);
    const atual = S.diaSel === dHoje && a.ini <= agora && agora < (a.fim || '23:59');
    const escola = ESCOLA_DA_TURMA[a.turma];
    const grad = ehMinha ? (GRAD_TURMA[a.turma] || 'var(--grad-primary-cyan)') : 'linear-gradient(160deg,#94a3b8,#64748b)';

    const el = document.createElement('div');
    el.className = 'aula-card';
    if(temConflito) el.style.boxShadow = '0 0 0 2px var(--red), var(--shadow-sm)';
    else if(atual) el.style.boxShadow = '0 0 0 2px var(--primary), var(--shadow-sm)';
    el.innerHTML = `
      <div class="aula-head">
        <div class="aula-icon" style="background:${grad}">${ico('i-book','ico-22')}</div>
        <div class="aula-body">
          <div class="aula-turma">${esc(a.turma)}</div>
          <div class="aula-sub">${a.materia?esc(a.materia):'—'}</div>
          <div class="aula-meta">
            <span>${ico('i-clock','ico-14')} ${esc(a.ini)}${a.fim?' – '+esc(a.fim):''}</span>
            ${a.sala?`<span>${ico('i-map-pin','ico-14')} ${esc(a.sala)}</span>`:''}
            ${a.prof?`<span>${ico('i-user','ico-14')} ${esc(a.prof)}</span>`:''}
            ${!a.sala&&!a.prof&&escola?`<span>${ico('i-school','ico-14')} ${esc(escola)}</span>`:''}
          </div>
        </div>
        <div class="aluno-chevron">${ico('i-chevron-right','ico-18')}</div>
      </div>`;
    el.onclick = () => abrirEdicaoAula(a.id, ehMinha?'aula':'geral');
    main.appendChild(el);
  });
}

/* ═══════ ALUNOS ═══════ */
function renderAlunos(main){
  pararTickContagem();
  const turma = S.turmaAluno;
  const todos = S.alunos.filter(a => a.turma === turma).sort((a,b)=>a.nome.localeCompare(b.nome));
  if(!todos.length){
    const v = document.createElement('div');
    v.className = 'vazio';
    v.innerHTML = `${ico('i-users','ico')}Nenhum aluno em <b>${esc(turma)}</b>.<br>Toque no <b>+</b> para adicionar.`;
    main.appendChild(v);
    return;
  }

  const resumo = resumoTurmaHoje(turma);
  const pct = resumo.total ? Math.round((resumo.pres / resumo.total) * 100) : 0;
  const ringDeg = Math.round(pct * 3.6);
  const sumCard = document.createElement('div');
  sumCard.className = 'summary';
  sumCard.innerHTML = `
    <div class="donut">
      <div class="ring-bg"></div>
      <div class="ring-fg" style="background:conic-gradient(var(--green) 0deg ${ringDeg}deg, transparent ${ringDeg}deg 360deg);-webkit-mask:radial-gradient(circle, transparent 62%, #000 63%);mask:radial-gradient(circle, transparent 62%, #000 63%);"></div>
      <div class="ico-center">${ico('i-smile','ico-20')}</div>
    </div>
    <div class="summary-total">
      <div class="n">${resumo.total}</div>
      <div class="l">ALUNOS</div>
    </div>
    <div class="summary-status">
      <div class="stat-mini">
        <div class="n" style="color:var(--green)"><span class="dot" style="background:var(--green)"></span>${resumo.pres}</div>
        <div class="l">Presentes</div>
      </div>
      <div class="stat-mini">
        <div class="n" style="color:var(--yellow)"><span class="dot" style="background:var(--yellow)"></span>${resumo.aus}</div>
        <div class="l">Ausente${resumo.aus===1?'':'s'}</div>
      </div>
      <div class="stat-mini">
        <div class="n" style="color:var(--red)"><span class="dot" style="background:var(--red)"></span>${resumo.jus}</div>
        <div class="l">Justificado${resumo.jus===1?'':'s'}</div>
      </div>
    </div>`;
  main.appendChild(sumCard);

  const sec = document.createElement('div');
  sec.className = 'section-h';
  sec.innerHTML = `${ico('i-users','ico-20 lead')}<h3>Lista de Alunos</h3><span class="count">${todos.length} alunos</span>`;
  main.appendChild(sec);

  const searchRow = document.createElement('div');
  searchRow.className = 'search-row';
  searchRow.innerHTML = `
    <div class="search-box">
      ${ico('i-search','ico-18')}
      <input type="text" id="busca-aluno" placeholder="Buscar aluno..." value="${esc(S.busca||'')}">
    </div>
    <button class="filter-btn${S.filtroLista!=='todos'?' on':''}" id="filter-btn">${ico('i-filter','ico-20')}</button>`;
  main.appendChild(searchRow);

  const inp = searchRow.querySelector('#busca-aluno');
  inp.oninput = e => {
    S.busca = e.target.value;
    const pos = e.target.selectionStart;
    render();
    const novo = document.getElementById('busca-aluno');
    if(novo){ novo.focus(); try{ novo.setSelectionRange(pos,pos);}catch(_){} }
  };
  searchRow.querySelector('#filter-btn').onclick = () => abrirFiltroAlunos();

  const busca = (S.busca||'').toLowerCase().trim();
  let lista = todos.filter(a => !busca || a.nome.toLowerCase().includes(busca));

  if(S.filtroLista === 'presente' || S.filtroLista === 'ausente' || S.filtroLista === 'justificado'){
    const chHoje = chaveData(hoje());
    const chamadasHoje = S.vistos.filter(v => v.turma === turma && v.data === chHoje);
    lista = lista.filter(al => {
      let st = null;
      for(const c of chamadasHoje){ if(c.status && c.status[al.id]){ st = c.status[al.id]; break; } }
      return st === S.filtroLista;
    });
  } else if(S.filtroLista !== 'todos'){
    lista = lista.filter(a => a.nivel === S.filtroLista);
  }

  if(!lista.length){
    const v = document.createElement('div');
    v.className = 'vazio';
    v.innerHTML = `${ico('i-search','ico')}Nenhum aluno encontrado.`;
    main.appendChild(v);
    return;
  }

  const wrap = document.createElement('div');
  wrap.className = 'list-wrap';
  lista.forEach(a => {
    const n = NIVEL_MAP[a.nivel] || NIVEL_MAP.bom;
    const num = (todos.indexOf(a) + 1).toString().padStart(2, '0');
    const row = document.createElement('div');
    row.className = 'aluno-row';
    row.innerHTML = `
      <div class="avatar" style="background:linear-gradient(135deg,${corDe(a.nome)},${corDe(a.nome)}cc)">${iniciais(a.nome)}</div>
      <div class="aluno-info">
        <div class="aluno-nome">${esc(a.nome)}</div>
        <div class="aluno-meta">
          <span class="nivel-pill" style="background:${n.soft};color:${n.cor}">
            ${ico(n.ico,'ico-12')} ${n.nome}
          </span>
        </div>
      </div>
      <div class="aluno-num">#${num}</div>
      <div class="aluno-chevron">${ico('i-chevron-right','ico-18')}</div>`;
    row.onclick = () => abrirAluno(a.id);
    wrap.appendChild(row);
  });
  main.appendChild(wrap);
}

/* ═══════ SELETOR DE TURMA ═══════ */
function abrirSeletorTurma(){
  const turmas = TURMAS.filter(t => S.alunos.some(a => a.turma === t));
  const lista = turmas.map(t => {
    const qtd = S.alunos.filter(a => a.turma === t).length;
    const ativa = t === S.turmaAluno;
    const cor = COR_TURMA_SOLID[t] || '#2563eb';
    return `
      <button class="turma-opt${ativa?' on':''}" data-t="${esc(t)}">
        <span class="turma-opt-dot" style="background:${cor}"></span>
        <span class="turma-opt-info">
          <span class="turma-opt-nome">${esc(t)}</span>
          <span class="turma-opt-qtd">${qtd} aluno${qtd===1?'':'s'}</span>
        </span>
        ${ativa ? `<span class="turma-opt-check">${ico('i-check','ico-16')}</span>` : ''}
      </button>`;
  }).join('');

  abrirModal(`
    <h2>Escolher turma</h2>
    <div class="turma-opt-list">${lista}</div>
    <div class="botoes-f">
      <button class="btn-f secundario" id="btn-fechar-turma">Fechar</button>
    </div>
  `);

  $$('.turma-opt').forEach(b => {
    b.onclick = () => {
      S.turmaAluno = b.dataset.t;
      S.busca = '';
      S.filtroLista = 'todos';
      fecharModal();
      render();
      window.scrollTo({top:0,behavior:'smooth'});
    };
  });
  $('#btn-fechar-turma').onclick = fecharModal;
}

/* ═══════ FILTRO ALUNOS ═══════ */
function abrirFiltroAlunos(){
  const opcoes = [
    { v:'todos', t:'Todos' },
    { v:'presente', t:'Presentes' },
    { v:'ausente', t:'Ausentes' },
    { v:'justificado', t:'Justificados' },
    { v:'otimo', t:'Desempenho Ótimo' },
    { v:'bom', t:'Desempenho Bom' },
    { v:'atencao', t:'Atenção' },
    { v:'critico', t:'Crítico' }
  ];
  abrirModal(`
    <h2>Filtrar alunos</h2>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${opcoes.map(o => `
        <button class="cfg-btn ${S.filtroLista===o.v?'primario':'secundario'}" data-v="${o.v}" style="justify-content:space-between">
          <span>${o.t}</span>
          ${S.filtroLista===o.v?ico('i-check','ico-16'):''}
        </button>`).join('')}
    </div>
    <div class="botoes-f">
      <button class="btn-f secundario" id="btn-fechar">Fechar</button>
    </div>`);
  $$('[data-v]').forEach(b => {
    b.onclick = () => {
      S.filtroLista = b.dataset.v;
      fecharModal();
      render();
    };
  });
  $('#btn-fechar').onclick = fecharModal;
}

/* ═══════ MODAL ALUNO ═══════ */
function abrirAluno(id){
  const a = S.alunos.find(x => x.id === id);
  if(!a) return;
  const n = NIVEL_MAP[a.nivel] || NIVEL_MAP.bom;
  const stats = statsAluno(a.id, a.turma, 90);
  const freq = stats.freq !== null ? stats.freq : 0;

  const historico = S.vistos
    .filter(v => v.turma === a.turma && v.status && v.status[a.id])
    .sort((x,y) => y.data.localeCompare(x.data))
    .slice(0, 15)
    .map(v => ({ data: v.data, status: v.status[a.id] }));

  const notasHtml = (a.notas||[]).sort((x,y)=>(y.data||'').localeCompare(x.data||'')).map(nt => {
    const tipo = nt.tipo || 'neutro';
    const icoTipo = tipo === 'positivo' ? 'i-thumb-up' : tipo === 'negativo' ? 'i-thumb-down' : tipo === 'pedagogico' ? 'i-book' : 'i-info';
    const label = tipo === 'positivo' ? 'Positivo' : tipo === 'negativo' ? 'Negativo' : tipo === 'pedagogico' ? 'Pedagógico' : 'Neutro';
    return `<div class="nota tipo-${tipo}">
      <div class="nota-head">
        <span>${fmtData(nt.data)}</span>
        <div class="right">
          <span class="nota-tipo">${ico(icoTipo,'ico-12')} ${label}</span>
          <button style="background:transparent;border:0;color:var(--red);cursor:pointer;display:grid;padding:0" data-del-nota="${nt.id}">${ico('i-x','ico-14')}</button>
        </div>
      </div>
      <div class="nota-txt">${esc(nt.texto)}</div>
    </div>`;
  }).join('') || `<div style="text-align:center;color:var(--muted);font-size:13px;padding:16px">Nenhuma observação registrada</div>`;

  const historicoHtml = historico.length ? historico.map(h => {
    const s = STATUS[h.status];
    return `<div class="hist-row">
      <span class="hist-data">${fmtDataCurto(h.data)}</span>
      <span class="hist-status" style="background:${s.soft};color:${s.cor}">
        ${ico(s.ico,'ico-12')} ${s.label}
      </span>
    </div>`;
  }).join('') : `<div style="text-align:center;color:var(--muted);font-size:13px;padding:16px">Sem histórico</div>`;

  abrirModal(`
    <div class="perfil-head">
      <div class="avatar" style="background:linear-gradient(135deg,${corDe(a.nome)},${corDe(a.nome)}cc)">${iniciais(a.nome)}</div>
      <div style="flex:1;min-width:0">
        <div class="nome">${esc(a.nome)}</div>
        <div class="turma">${esc(a.turma)}</div>
      </div>
    </div>

    <div class="freq-box">
      <div class="lbl">Frequência · 90 dias</div>
      <div class="val">${freq}%</div>
      <div class="bar"><div style="width:${freq}%"></div></div>
    </div>

    <div class="perfil-stats">
      <div class="perfil-stat">
        <div class="lbl">Desempenho</div>
        <div class="val" style="color:${n.cor}">${n.nome}</div>
      </div>
      <div class="perfil-stat">
        <div class="lbl">Presenças</div>
        <div class="val" style="color:var(--green)">${stats.pres}</div>
      </div>
      <div class="perfil-stat">
        <div class="lbl">Faltas</div>
        <div class="val" style="color:${stats.aus?'var(--red)':'var(--muted)'}">${stats.aus}</div>
      </div>
      <div class="perfil-stat">
        <div class="lbl">Justificadas</div>
        <div class="val" style="color:${stats.jus?'var(--yellow)':'var(--muted)'}">${stats.jus}</div>
      </div>
    </div>

    <label class="f">Desempenho do aluno
      <div class="nivel-selector" id="nivel-sel">
        ${NIVEIS.map(nv => `<button type="button" class="nivel-btn${a.nivel===nv.id?' on':''}"
            data-nivel="${nv.id}" style="--nc:${nv.cor};--nc-soft:${nv.soft}">
            <svg><use href="#${nv.ico}"/></svg>
            <span class="txt">${nv.nome}</span>
          </button>`).join('')}
      </div>
    </label>

    <div style="margin-top:20px;margin-bottom:8px;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:var(--muted);display:flex;align-items:center;gap:6px">
      ${ico('i-clock','ico-14')} Histórico recente
    </div>
    <div class="card" style="padding:6px 14px">${historicoHtml}</div>

    <div style="margin-top:20px;margin-bottom:8px;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:var(--muted);display:flex;align-items:center;gap:6px">
      ${ico('i-note','ico-14')} Observações (${(a.notas||[]).length})
    </div>
    <div>${notasHtml}</div>

    <label class="f" style="margin-top:12px">Nova observação
      <textarea class="f" id="nova-nota" placeholder="Ex: Não fez a atividade, mas participou bem..." maxlength="500"></textarea>
    </label>
    <label class="f">Tipo
      <select class="f" id="nota-tipo">
        <option value="neutro">Neutro</option>
        <option value="positivo">Positivo</option>
        <option value="negativo">Negativo</option>
        <option value="pedagogico">Pedagógico</option>
      </select>
    </label>
    <div class="botoes-f"><button class="btn-f secundario" id="btn-add-nota">${ico('i-plus','ico-16')} Adicionar observação</button></div>

    <div class="botoes-f" style="margin-top:20px">
      <button class="btn-f perigo" id="btn-del-aluno">${ico('i-trash','ico-20')}</button>
      <button class="btn-f secundario" id="btn-fechar">Fechar</button>
      <button class="btn-f primario" id="btn-salvar-aluno">${ico('i-check','ico-18')} Salvar</button>
    </div>
  `);

  let nivelSel = a.nivel;
  $('#nivel-sel').querySelectorAll('button').forEach(b => {
    b.onclick = () => {
      nivelSel = b.dataset.nivel;
      $('#nivel-sel').querySelectorAll('button').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
    };
  });
  $$('[data-del-nota]').forEach(btn => {
    btn.onclick = () => {
      const nid = btn.dataset.delNota;
      a.notas = a.notas.filter(x => x.id !== nid);
      salvarTudo(); abrirAluno(a.id);
    };
  });
  $('#btn-add-nota').onclick = () => {
    const txt = $('#nova-nota').value.trim();
    if(!txt){ toast('Digite algo'); return; }
    a.notas = a.notas || [];
    a.notas.push({id:uid(), data:chaveData(hoje()), texto:txt, tipo:$('#nota-tipo').value});
    salvarTudo(); abrirAluno(a.id); toast('Observação salva');
  };
  $('#btn-fechar').onclick = fecharModal;
  $('#btn-del-aluno').onclick = () => {
    if(!confirm(`Excluir ${a.nome}?`)) return;
    S.alunos = S.alunos.filter(x => x.id !== a.id);
    salvarTudo(); fecharModal(); render(); toast('Aluno excluído');
  };
  $('#btn-salvar-aluno').onclick = () => {
    a.nivel = nivelSel;
    salvarTudo(); fecharModal(); render(); toast('Perfil atualizado');
  };
}

function abrirNovoAluno(){
  abrirModal(`
    <h2>Novo aluno</h2>
    <label class="f">Nome completo
      <input class="f" type="text" id="a-nome" maxlength="60" placeholder="Ex: João Silva">
    </label>
    <label class="f">Turma
      <input class="f" type="text" id="a-turma" list="lt3" value="${esc(S.turmaAluno)}" maxlength="40">
      <datalist id="lt3">${TURMAS.map(t=>`<option value="${t}">`).join('')}</datalist>
    </label>
    <label class="f">Desempenho inicial
      <div class="nivel-selector" id="nivel-novo">
        ${NIVEIS.map((nv,i) => `<button type="button" class="nivel-btn${i===1?' on':''}" data-nivel="${nv.id}"
            style="--nc:${nv.cor};--nc-soft:${nv.soft}">
            <svg><use href="#${nv.ico}"/></svg>
            <span class="txt">${nv.nome}</span>
          </button>`).join('')}
      </div>
    </label>
    <div class="botoes-f">
      <button class="btn-f secundario" id="btn-cancelar">Cancelar</button>
      <button class="btn-f primario" id="btn-salvar">${ico('i-plus','ico-18')} Adicionar</button>
    </div>`);
  let nivel = 'bom';
  $('#nivel-novo').querySelectorAll('button').forEach(b => {
    b.onclick = () => {
      nivel = b.dataset.nivel;
      $('#nivel-novo').querySelectorAll('button').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
    };
  });
  $('#btn-cancelar').onclick = fecharModal;
  $('#btn-salvar').onclick = () => {
    const nome = $('#a-nome').value.trim();
    const turma = $('#a-turma').value.trim();
    if(!nome || !turma){ toast('Preencha nome e turma'); return; }
    S.alunos.push({id:uid(), nome, turma, nivel, notas:[]});
    salvarTudo(); fecharModal(); render(); toast('Aluno adicionado');
  };
}

/* ═══════ VISTOS ═══════ */
function renderVistos(main){
  pararTickContagem();
  if(S.filtroVisto === 'marcar') renderVistosMarcar(main);
  else renderVistosRelatorio(main);
}

function renderVistosMarcar(main){
  const aulasDia = S.aulas.filter(a => a.dia === S.diaSel).sort((a,b)=>a.ini.localeCompare(b.ini));
  const dataRef = S.diaSel === hoje().getDay() ? chaveData(hoje()) : dataDaSemana(S.diaSel);

  const dayTabs = document.createElement('div');
  dayTabs.className = 'day-tabs';
  dayTabs.style.marginTop = '0';
  dayTabs.style.padding = '0';
  const dHoje = hoje().getDay();
  ORDEM.forEach(d => {
    const b = document.createElement('button');
    b.className = 'day-tab' + (d===S.diaSel?' on':'') + (d===dHoje&&d!==S.diaSel?' today':'');
    b.textContent = DIAS_CURTO[d];
    b.onclick = () => { S.diaSel = d; render(); };
    dayTabs.appendChild(b);
  });
  main.appendChild(dayTabs);

  if(!aulasDia.length){
    const v = document.createElement('div');
    v.className = 'vazio';
    v.innerHTML = `${ico('i-calendar','ico')}Sem aulas ${DIAS[S.diaSel]}.`;
    main.appendChild(v);
    return;
  }

  const searchRow = document.createElement('div');
  searchRow.className = 'search-row';
  searchRow.innerHTML = `
    <div class="search-box">
      ${ico('i-search','ico-18')}
      <input type="text" id="busca-visto" placeholder="Buscar aluno..." value="${esc(S.busca||'')}">
    </div>
    <button class="filter-btn${S.filtroLista!=='todos'?' on':''}" id="filter-visto">${ico('i-filter','ico-20')}</button>`;
  main.appendChild(searchRow);

  const inp = searchRow.querySelector('#busca-visto');
  inp.oninput = e => {
    S.busca = e.target.value;
    const pos = e.target.selectionStart;
    render();
    const novo = document.getElementById('busca-visto');
    if(novo){ novo.focus(); try{ novo.setSelectionRange(pos,pos);}catch(_){} }
  };
  searchRow.querySelector('#filter-visto').onclick = () => abrirFiltroAlunos();

  const busca = (S.busca||'').toLowerCase().trim();

  aulasDia.forEach(aula => {
    const todosAlunos = S.alunos.filter(a => a.turma === aula.turma).sort((a,b)=>a.nome.localeCompare(b.nome));
    const resumo = resumoAula(aula.id, dataRef, aula.turma);
    const grad = GRAD_TURMA[aula.turma] || 'var(--grad-primary-cyan)';
    const escola = ESCOLA_DA_TURMA[aula.turma];

    const cardAula = document.createElement('div');
    cardAula.className = 'aula-card';
    cardAula.style.cursor = 'default';
    cardAula.innerHTML = `
      <div class="aula-head">
        <div class="aula-icon" style="background:${grad}">${ico('i-book','ico-22')}</div>
        <div class="aula-body">
          <div class="aula-turma">${esc(aula.turma)}</div>
          <div class="aula-sub">${aula.materia?esc(aula.materia):'—'}</div>
          <div class="aula-meta">
            <span>${ico('i-clock','ico-14')} ${esc(aula.ini)} – ${esc(aula.fim||'?')}</span>
            ${escola?`<span>${ico('i-school','ico-14')} ${esc(escola)}</span>`:''}
          </div>
        </div>
      </div>
      <div class="aula-stats">
        <div class="aula-stat s-pres"><div class="n">${resumo.pres}</div><div class="l">Presentes</div></div>
        <div class="aula-stat s-aus"><div class="n">${resumo.aus}</div><div class="l">Ausentes</div></div>
        <div class="aula-stat s-jus"><div class="n">${resumo.jus}</div><div class="l">Justif.</div></div>
        <div class="aula-stat s-pen"><div class="n">${resumo.pen}</div><div class="l">Pendentes</div></div>
      </div>`;
    main.appendChild(cardAula);

    if(!todosAlunos.length){
      const empty = document.createElement('div');
      empty.className = 'vazio';
      empty.innerHTML = `Nenhum aluno cadastrado nessa turma.`;
      main.appendChild(empty);
      return;
    }

    const btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;gap:8px;align-items:stretch';

    const bTodos = document.createElement('button');
    bTodos.className = 'cfg-btn secundario';
    bTodos.style.cssText = 'margin-top:0;flex:1;min-width:0';
    bTodos.innerHTML = ico('i-check','ico-16') + ' Marcar todos presentes';
    bTodos.onclick = () => {
      if(!confirm(`Marcar todos os ${todosAlunos.length} alunos como presentes?`)) return;
      todosAlunos.forEach(al => setStatusAluno(aula, dataRef, al.id, 'presente'));
      render(); toast('Todos marcados como presentes');
    };

    const bLimpar = document.createElement('button');
    bLimpar.className = 'cfg-btn secundario';
    bLimpar.style.cssText = `margin-top:0;flex:0 0 48px;width:48px;height:48px;padding:0;display:grid;place-items:center;color:var(--muted);`;
    bLimpar.setAttribute('aria-label','Limpar chamada');
    bLimpar.title = 'Limpar chamada';
    bLimpar.innerHTML = ico('i-refresh','ico-18');
    bLimpar.onmouseenter = () => { bLimpar.style.color = 'var(--red)'; };
    bLimpar.onmouseleave = () => { bLimpar.style.color = 'var(--muted)'; };
    bLimpar.onclick = () => {
      if(!confirm('Limpar a chamada desta aula?')) return;
      todosAlunos.forEach(al => setStatusAluno(aula, dataRef, al.id, 'pendente'));
      render(); toast('Chamada limpa');
    };

    btnRow.appendChild(bTodos);
    btnRow.appendChild(bLimpar);
    main.appendChild(btnRow);

    const lista = todosAlunos.filter(al => !busca || al.nome.toLowerCase().includes(busca));
    if(!lista.length){
      const v = document.createElement('div');
      v.className = 'vazio';
      v.innerHTML = `Nenhum aluno encontrado.`;
      main.appendChild(v);
      return;
    }

    lista.forEach(al => {
      const st = getStatusAluno(aula.id, dataRef, al.id);
      const s = STATUS[st];
      const nivel = NIVEL_MAP[al.nivel] || NIVEL_MAP.bom;
      const stats = statsAluno(al.id, al.turma, 90);
      const freq = stats.freq !== null ? stats.freq : 0;
      const freqCls = freq >= 90 ? 'ok' : freq >= 75 ? 'warn' : 'bad';
      const atividades = (al.notas||[]).length;

      const row = document.createElement('div');
      row.className = 'visto-row';
      row.innerHTML = `
        <div class="avatar" style="background:linear-gradient(135deg,${corDe(al.nome)},${corDe(al.nome)}cc);width:42px;height:42px;flex:0 0 42px;font-size:14px">${iniciais(al.nome)}</div>
        <div class="aluno-info">
          <div class="visto-name">${esc(al.nome)}</div>
          <button class="status-pill" style="background:${s.soft};color:${s.cor}" data-toggle>
            ${ico(s.ico,'ico-12')} ${s.label}
          </button>
        </div>
        <div class="visto-stats">
          <div class="row">Desempenho: <span class="v" style="color:${nivel.cor}">${nivel.nome}</span></div>
          <div class="row">${ico('i-calendar','ico-12')} <span class="v ${freqCls}">${freq}%</span></div>
          <div class="row">${ico('i-note','ico-12')} <span class="v">${atividades}</span></div>
        </div>`;
      row.querySelector('[data-toggle]').onclick = (e) => {
        e.stopPropagation();
        const novo = proximoStatus(st);
        setStatusAluno(aula, dataRef, al.id, novo);
        render();
      };
      row.onclick = () => abrirAluno(al.id);
      main.appendChild(row);
    });
  });

  if(S.diaSel !== hoje().getDay()){
    const av = document.createElement('div');
    av.style.cssText = 'text-align:center;font-size:12px;color:var(--muted);padding:10px;font-weight:600';
    av.textContent = `Chamada referente a ${DIAS[S.diaSel]} (${fmtData(dataRef)})`;
    main.appendChild(av);
  }
}

/* ═══════ RELATÓRIOS ═══════ */
function renderVistosRelatorio(main){
  const turmasComVistos = [...new Set(S.vistos.map(v => v.turma))];
  const chips = document.createElement('div');
  chips.className = 'chips';
  const cAll = document.createElement('button');
  cAll.className = 'chip' + ((S.turmaRel === '__all') ? ' on':'');
  cAll.textContent = 'Todas';
  cAll.onclick = () => { S.turmaRel = '__all'; render(); };
  chips.appendChild(cAll);
  turmasComVistos.forEach(t => {
    const c = document.createElement('button');
    c.className = 'chip' + (S.turmaRel === t ? ' on':'');
    c.textContent = t;
    c.onclick = () => { S.turmaRel = t; render(); };
    chips.appendChild(c);
  });
  main.appendChild(chips);
  const filtro = S.turmaRel;

  const limite = new Date(); limite.setDate(limite.getDate() - 30);
  const chamadas = S.vistos.filter(v =>
    new Date(v.data + 'T12:00') >= limite &&
    (filtro === '__all' || v.turma === filtro)
  );

  let pres=0, aus=0, jus=0, tot=0;
  const statsPorAluno = {};
  const alunosFiltrados = S.alunos.filter(a => filtro === '__all' || a.turma === filtro);
  alunosFiltrados.forEach(a => { statsPorAluno[a.id] = { pres:0, aus:0, jus:0, tot:0, aluno:a }; });

  chamadas.forEach(v => {
    Object.entries(v.status || {}).forEach(([alunoId, st]) => {
      const s = statsPorAluno[alunoId];
      if(!s) return;
      s.tot++;
      if(st === 'presente') s.pres++;
      else if(st === 'ausente') s.aus++;
      else if(st === 'justificado') s.jus++;
    });
  });

  Object.values(statsPorAluno).forEach(s => {
    pres += s.pres; aus += s.aus; jus += s.jus; tot += s.tot;
  });

  const pctPres = tot ? Math.round(pres / tot * 100) : 0;
  const pctAus = tot ? Math.round(aus / tot * 100) : 0;
  const pctJus = tot ? Math.round(jus / tot * 100) : 0;

  const grid = document.createElement('div');
  grid.className = 'stat-grid';
  grid.innerHTML = `
    <div class="stat-tile">
      ${ico('i-users','ico-22')}
      <div class="n">${alunosFiltrados.length}</div><div class="l">Total de alunos</div>
    </div>
    <div class="stat-tile">
      ${ico('i-check-circle','ico-22')}
      <div class="n" style="color:var(--green)">${pctPres}%</div><div class="l">Presença</div>
    </div>
    <div class="stat-tile">
      ${ico('i-x-circle','ico-22')}
      <div class="n" style="color:var(--red)">${pctAus}%</div><div class="l">Faltas</div>
    </div>
    <div class="stat-tile">
      ${ico('i-info','ico-22')}
      <div class="n" style="color:var(--yellow)">${pctJus}%</div><div class="l">Justificadas</div>
    </div>`;
  main.appendChild(grid);

  const secDes = document.createElement('div');
  secDes.className = 'section-h';
  secDes.innerHTML = `${ico('i-chart','ico-20 lead')}<h3>Desempenho</h3>`;
  main.appendChild(secDes);

  const dist = { otimo:0, bom:0, atencao:0, critico:0 };
  alunosFiltrados.forEach(a => { dist[a.nivel] = (dist[a.nivel]||0) + 1; });

  const cardDes = document.createElement('div');
  cardDes.className = 'card';
  cardDes.innerHTML = NIVEIS.map(nv => {
    const qtd = dist[nv.id] || 0;
    const pct = alunosFiltrados.length ? Math.round(qtd / alunosFiltrados.length * 100) : 0;
    return `<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border-2)">
      <div style="width:28px;height:28px;border-radius:8px;background:${nv.soft};color:${nv.cor};display:grid;place-items:center;flex:0 0 28px">
        <svg style="width:16px;height:16px;fill:currentColor"><use href="#${nv.ico}"/></svg>
      </div>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:700">${nv.nome}</div>
        <div style="height:6px;background:var(--gray-soft);border-radius:999px;margin-top:6px;overflow:hidden">
          <div style="height:100%;width:${pct}%;background:${nv.cor};border-radius:999px"></div>
        </div>
      </div>
      <div style="font-size:14px;font-weight:800;color:${nv.cor}">${qtd}</div>
    </div>`;
  }).join('');
  main.appendChild(cardDes);

  const emRisco = Object.values(statsPorAluno)
    .filter(s => s.tot > 0 && (s.pres / s.tot) < 0.75)
    .sort((a,b) => (a.pres/a.tot) - (b.pres/b.tot));

  if(emRisco.length){
    const sec = document.createElement('div');
    sec.className = 'section-h';
    sec.innerHTML = `<svg class="lead" style="color:var(--red)"><use href="#i-alert"/></svg><h3 style="color:var(--red)">Alunos em risco</h3><span class="count">${emRisco.length}</span>`;
    main.appendChild(sec);

    emRisco.forEach(s => {
      const freq = Math.round(s.pres / s.tot * 100);
      const n = NIVEL_MAP[s.aluno.nivel] || NIVEL_MAP.bom;
      const row = document.createElement('div');
      row.className = 'aluno-row';
      row.innerHTML = `
        <div class="avatar" style="background:linear-gradient(135deg,${corDe(s.aluno.nome)},${corDe(s.aluno.nome)}cc);width:42px;height:42px;flex:0 0 42px;font-size:14px">${iniciais(s.aluno.nome)}</div>
        <div class="aluno-info">
          <div class="aluno-nome">${esc(s.aluno.nome)}</div>
          <div class="aluno-meta">
            <span class="nivel-pill" style="background:${n.soft};color:${n.cor}">${ico(n.ico,'ico-12')} ${n.nome}</span>
            <span style="font-size:11px;color:var(--muted);font-weight:600">${s.aluno.turma}</span>
          </div>
        </div>
        <div style="font-size:15px;font-weight:800;color:var(--red)">${freq}%</div>`;
      row.onclick = () => abrirAluno(s.aluno.id);
      main.appendChild(row);
    });
  }
}

/* ═══════ CONFIG ═══════ */
function renderConfig(main){
  pararTickContagem();
  main.appendChild(blocoConfig(ico('i-user','ico-16')+' Perfil', [
    linhaInput('Seu nome', S.config.nomeProf, v => { S.config.nomeProf = v; salvarTudo(); })
  ]));
  main.appendChild(blocoConfig(ico('i-palette','ico-16')+' Aparência', [
    linhaSeg('Tema', 'tema', [['auto','Auto'],['claro','Claro'],['escuro','Escuro']],
      v => { S.config.tema = v; salvarTudo(); render(); })
  ]));

  const nb = blocoConfig(ico('i-bell','ico-16')+' Notificações', []);
  nb.appendChild(linhaToggle('Ativar notificações', S.config.notifAtiva, async v => {
    if(!v){ S.config.notifAtiva = false; salvarTudo(); toast('Notificações desativadas'); render(); return; }
    if(!('Notification' in window)){ toast('Navegador não suporta'); render(); return; }
    if(Notification.permission === 'denied'){ toast('Bloqueado. Libere no Chrome'); render(); return; }
    if(Notification.permission === 'granted'){ S.config.notifAtiva = true; salvarTudo(); toast('Notificações ativadas'); render(); return; }
    let perm; try{ perm = await Notification.requestPermission(); }catch(e){ perm='erro'; }
    if(perm === 'granted'){ S.config.notifAtiva = true; salvarTudo(); toast('Notificações ativadas'); }
    else { toast('Permissão não concedida'); }
    render();
  }));
  const st = document.createElement('div');
  const pm = ('Notification' in window) ? Notification.permission : 'unsupported';
  let cls='warn', txt='';
  if(pm==='granted'){ cls='ok'; txt='Permissão concedida'; }
  else if(pm==='denied'){ cls='err'; txt='Bloqueado — Chrome → Ajustes'; }
  else if(pm==='default'){ cls='warn'; txt='Permissão não solicitada'; }
  else { cls='err'; txt='Não suportado'; }
  st.innerHTML = `<span class="status-pill-info ${cls}">${ico('i-info','ico-14')} ${txt}</span>`;
  nb.appendChild(st);
  nb.appendChild(linhaNum('Avisar antes (min)', S.config.avisoMin, v => {
    S.config.avisoMin = Math.max(1, Math.min(120, v|0)); salvarTudo(); toast('Salvo');
  }));
  const bt = document.createElement('button');
  bt.className = 'cfg-btn secundario';
  bt.innerHTML = ico('i-bell','ico-18')+' Testar notificação';
  bt.onclick = testarNotificacao;
  nb.appendChild(bt);
  main.appendChild(nb);

  const fb = blocoConfig(ico('i-calendar','ico-16')+' Feriados', []);
  const af = document.createElement('div');
  af.className = 'cfg-linha';
  af.innerHTML = `<input type="date" id="novo-feriado" style="flex:1;background:var(--card-2);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:11px 13px;font-size:14px;font-family:inherit;font-weight:700">
    <button class="cfg-btn primario" style="width:auto;margin:0;padding:11px 18px;font-size:14px">Adicionar</button>`;
  af.querySelector('button').onclick = () => {
    const v = $('#novo-feriado').value;
    if(!v) return;
    if(S.config.feriados.includes(v)){ toast('Já cadastrado'); return; }
    S.config.feriados.push(v); S.config.feriados.sort();
    salvarTudo(); toast('Feriado adicionado'); render();
  };
  fb.appendChild(af);
  if(S.config.feriados.length){
    const list = document.createElement('div');
    list.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;margin-top:12px';
    S.config.feriados.forEach(f => {
      const t = document.createElement('div');
      t.style.cssText = 'background:var(--card-2);border-radius:999px;padding:8px 12px 8px 14px;font-size:12.5px;font-weight:700;display:flex;align-items:center;gap:8px;border:1px solid var(--border-2)';
      t.innerHTML = `<span>${fmtData(f)}</span><button style="background:transparent;border:0;color:var(--red);cursor:pointer;padding:0;display:grid">${ico('i-x','ico-14')}</button>`;
      t.querySelector('button').onclick = () => {
        S.config.feriados = S.config.feriados.filter(x => x !== f);
        salvarTudo(); render();
      };
      list.appendChild(t);
    });
    fb.appendChild(list);
  } else {
    const v = document.createElement('div');
    v.style.cssText = 'font-size:13px;color:var(--muted);margin-top:10px';
    v.textContent = 'Nenhum feriado cadastrado.';
    fb.appendChild(v);
  }
  main.appendChild(fb);

  const bb = blocoConfig(ico('i-shield','ico-16')+' Backup', []);
  const bExp = document.createElement('button');
  bExp.className = 'cfg-btn primario';
  bExp.innerHTML = ico('i-download','ico-18')+' Exportar backup';
  bExp.onclick = exportar; bb.appendChild(bExp);
  const bImp = document.createElement('button');
  bImp.className = 'cfg-btn secundario';
  bImp.innerHTML = ico('i-upload','ico-18')+' Importar backup';
  bImp.onclick = () => $('#input-importar').click(); bb.appendChild(bImp);
  const bRes = document.createElement('button');
  bRes.className = 'cfg-btn perigo';
  bRes.innerHTML = ico('i-refresh','ico-18')+' Resetar tudo';
  bRes.onclick = () => {
    if(!confirm('Isso apaga TODOS os seus dados. Continuar?')) return;
    Object.values(K).forEach(k => localStorage.removeItem(k));
    localStorage.removeItem('h5.seedVer');
    carregarTudo(); render(); toast('Restaurado');
  };
  bb.appendChild(bRes);
  main.appendChild(bb);

  const sb = blocoConfig(ico('i-info','ico-16')+' Sobre', []);
  const sc = document.createElement('div');
  sc.style.cssText = 'font-size:13px;color:var(--muted);line-height:1.7';
  sc.innerHTML = `<b>Horário Profissional v5.0</b><br>PWA offline · Painel do professor<br>
    ${S.alunos.length} alunos · ${S.aulas.length} aulas · ${S.vistos.length} chamadas`;
  sb.appendChild(sc);
  main.appendChild(sb);
}

function blocoConfig(titulo, filhos){
  const b = document.createElement('div');
  b.className = 'cfg-bloco';
  b.innerHTML = `<h3>${titulo}</h3>`;
  filhos.forEach(f => b.appendChild(f));
  return b;
}
function linhaToggle(rotulo, valor, cb){
  const d = document.createElement('div');
  d.className = 'cfg-linha';
  d.innerHTML = `<label>${esc(rotulo)}</label>
    <span class="switch"><input type="checkbox"${valor?' checked':''}><span class="slider"></span></span>`;
  d.querySelector('input').onchange = e => cb(e.target.checked);
  return d;
}
function linhaNum(rotulo, valor, cb){
  const d = document.createElement('div');
  d.className = 'cfg-linha';
  d.innerHTML = `<label>${esc(rotulo)}</label><input type="number" min="1" max="120" value="${valor}">`;
  d.querySelector('input').onchange = e => cb(parseInt(e.target.value,10));
  return d;
}
function linhaSeg(rotulo, key, opcoes, cb){
  const d = document.createElement('div');
  d.className = 'cfg-linha';
  const seg = document.createElement('div');
  seg.className = 'seg';
  opcoes.forEach(([v,t]) => {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = t;
    if(S.config[key] === v) b.className = 'on';
    b.onclick = () => cb(v);
    seg.appendChild(b);
  });
  d.innerHTML = `<label>${esc(rotulo)}</label>`;
  d.appendChild(seg);
  return d;
}
function linhaInput(rotulo, valor, cb){
  const d = document.createElement('div');
  d.className = 'cfg-linha';
  d.innerHTML = `<label>${esc(rotulo)}</label>
    <input type="text" value="${esc(valor||'')}" placeholder="Opcional" maxlength="40">`;
  d.querySelector('input').onchange = e => cb(e.target.value.trim());
  return d;
}

/* ═══════ MODAIS AULA ═══════ */
function abrirEdicaoAula(id, tipo){
  const arr = tipo === 'aula' ? S.aulas : S.geral;
  const a = arr.find(x => x.id === id);
  if(!a) return;
  abrirModal(`
    <h2>Editar aula</h2>
    <label class="f">Dia<select class="f" id="f-dia">
      ${ORDEM.map(d => `<option value="${d}"${d===a.dia?' selected':''}>${DIAS[d]}</option>`).join('')}
    </select></label>
    <label class="f">Turma<input class="f" type="text" id="f-turma" list="lt" value="${esc(a.turma)}" maxlength="40"></label>
    <datalist id="lt">${TURMAS.map(t=>`<option value="${t}">`).join('')}</datalist>
    <div class="linha-f">
      <label class="f">Início<input class="f" type="time" id="f-ini" value="${esc(a.ini)}"></label>
      <label class="f">Fim<input class="f" type="time" id="f-fim" value="${esc(a.fim||'')}"></label>
    </div>
    <label class="f">Matéria<input class="f" type="text" id="f-mat" value="${esc(a.materia||'')}" maxlength="50"></label>
    <div class="linha-f">
      <label class="f">Sala<input class="f" type="text" id="f-sala" value="${esc(a.sala||'')}" maxlength="40"></label>
      <label class="f">Professor<input class="f" type="text" id="f-prof" value="${esc(a.prof||'')}" maxlength="40"></label>
    </div>
    <div class="botoes-f">
      <button type="button" class="btn-f perigo" id="btn-excluir">${ico('i-trash','ico-20')}</button>
      <button type="button" class="btn-f secundario" id="btn-cancelar">Cancelar</button>
      <button type="button" class="btn-f primario" id="btn-salvar">${ico('i-check','ico-18')} Salvar</button>
    </div>`);
  $('#btn-cancelar').onclick = fecharModal;
  $('#f-ini').addEventListener('change', () => {
    if($('#f-fim').value) return;
    const v = $('#f-ini').value; if(!v) return;
    const [h,m] = v.split(':').map(Number);
    const t = (h*60+m+60)%1440;
    $('#f-fim').value = String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0');
  });
  $('#btn-excluir').onclick = () => {
    if(!confirm('Excluir esta aula?')) return;
    S.aulas = S.aulas.filter(x => x.id !== id);
    S.geral = S.geral.filter(x => x.id !== id);
    salvarTudo(); fecharModal(); render(); toast('Aula excluída');
  };
  $('#btn-salvar').onclick = () => {
    const dados = { dia:Number($('#f-dia').value), turma:($('#f-turma').value||'').trim(),
      ini:$('#f-ini').value, fim:$('#f-fim').value, materia:$('#f-mat').value.trim(),
      sala:$('#f-sala').value.trim(), prof:$('#f-prof').value.trim() };
    if(!dados.turma || !dados.ini){ toast('Preencha turma e início'); return; }
    const i = arr.findIndex(x => x.id === id);
    if(i > -1) arr[i] = {...arr[i], ...dados};
    salvarTudo(); fecharModal(); render(); toast('Aula atualizada');
  };
}

function abrirNovaAula(){
  const ehGeral = S.tab === 'horario' && S.sub === 'geral';
  const diaPadrao = (() => {
    if(S.sub === 'calendario' && S.calDiaAtivo){
      const [y,m,d] = S.calDiaAtivo.split('-').map(Number);
      return new Date(y, m-1, d).getDay();
    }
    return S.diaSel;
  })();

  abrirModal(`
    <h2>Nova aula</h2>
    <div style="background:var(--card-2);border-radius:14px;padding:16px;display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px">
      <div style="font-size:14px;font-weight:700">É minha aula?
        <small style="display:block;font-size:11.5px;font-weight:500;color:var(--muted);margin-top:2px" id="txt-minha">
          ${ehGeral?'Não — vai para o modo Geral':'Sim — vai para Meu Horário'}
        </small>
      </div>
      <label class="switch"><input type="checkbox" id="f-minha" ${ehGeral?'':'checked'}><span class="slider"></span></label>
    </div>
    <label class="f">Dia<select class="f" id="f-dia">
      ${ORDEM.map(d => `<option value="${d}"${d===diaPadrao?' selected':''}>${DIAS[d]}</option>`).join('')}
    </select></label>
    <label class="f">Turma<input class="f" type="text" id="f-turma" list="lt2" value="${ehGeral?'':esc(TURMAS[0])}" maxlength="40"></label>
    <datalist id="lt2">${TURMAS.map(t=>`<option value="${t}">`).join('')}</datalist>
    <div class="linha-f">
      <label class="f">Início<input class="f" type="time" id="f-ini" value="${horaAgora()}"></label>
      <label class="f">Fim<input class="f" type="time" id="f-fim"></label>
    </div>
    <label class="f">Matéria<input class="f" type="text" id="f-mat" maxlength="50" placeholder="Opcional"></label>
    <div class="linha-f">
      <label class="f">Sala<input class="f" type="text" id="f-sala" maxlength="40" placeholder="Ex: Lab"></label>
      <label class="f">Professor<input class="f" type="text" id="f-prof" maxlength="40" placeholder="Ex: Bruno"></label>
    </div>
    <div class="botoes-f">
      <button type="button" class="btn-f secundario" id="btn-cancelar">Cancelar</button>
      <button type="button" class="btn-f primario" id="btn-salvar">${ico('i-plus','ico-18')} Adicionar</button>
    </div>`);
  $('#btn-cancelar').onclick = fecharModal;
  $('#f-minha').onchange = e => {
    $('#txt-minha').textContent = e.target.checked ? 'Sim — vai para Meu Horário' : 'Não — vai para o modo Geral';
  };
  $('#f-ini').addEventListener('change', () => {
    if($('#f-fim').value) return;
    const v = $('#f-ini').value; if(!v) return;
    const [h,m] = v.split(':').map(Number);
    const t = (h*60+m+60)%1440;
    $('#f-fim').value = String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0');
  });
  $('#btn-salvar').onclick = () => {
    const ehMinha = $('#f-minha').checked;
    const dados = { dia:Number($('#f-dia').value), turma:($('#f-turma').value||'').trim(),
      ini:$('#f-ini').value, fim:$('#f-fim').value, materia:$('#f-mat').value.trim(),
      sala:$('#f-sala').value.trim(), prof:$('#f-prof').value.trim() };
    if(!dados.turma || !dados.ini){ toast('Preencha turma e início'); return; }
    (ehMinha ? S.aulas : S.geral).push({id:uid(), ...dados});
    salvarTudo(); fecharModal(); render(); toast('Aula adicionada');
  };
}

/* ═══════ NOTIFICAÇÕES ═══════ */
async function mostrarNotif(t, o){
  if(!('serviceWorker' in navigator)) return false;
  try{ const r = await navigator.serviceWorker.ready; await r.showNotification(t, o); return true; }
  catch(e){ return false; }
}
async function testarNotificacao(){
  if(!('Notification' in window)){ toast('Não suportado'); return; }
  if(Notification.permission !== 'granted'){ toast('Ative o toggle primeiro'); return; }
  const ok = await mostrarNotif('Teste — Meu Horário', {
    body:'As notificações funcionam!', icon:'icon-192.png', badge:'icon-192.png', tag:'teste' });
  toast(ok ? 'Notificação enviada' : 'Falha ao enviar');
}
function verificarNotif(){
  if(!S.config.notifAtiva) return;
  if(!('Notification' in window) || Notification.permission !== 'granted') return;
  const ag = new Date(), dow = ag.getDay(), hh = horaAgora();
  const ch = chaveData(ag);
  if(S.config.feriados.includes(ch)) return;
  const av = S.config.avisoMin || 10;
  S.aulas.forEach(a => {
    if(a.dia !== dow) return;
    const diff = diffMin(a.ini, hh);
    if(diff <= 0 || diff > av) return;
    const k = a.id + '@' + ch;
    if(S.notifSessao.has(k)) return;
    S.notifSessao.add(k);
    mostrarNotif('Aula em ' + diff + ' min', {
      body: a.turma + (a.materia?' · '+a.materia:'') + '\nÀs ' + a.ini,
      icon:'icon-192.png', badge:'icon-192.png', tag:k });
  });
}

/* ═══════ BACKUP ═══════ */
function exportar(){
  const d = { versao:'5.0', exportadoEm: new Date().toISOString(),
    aulas:S.aulas, geral:S.geral, alunos:S.alunos, vistos:S.vistos,
    config:{ tema:S.config.tema, avisoMin:S.config.avisoMin,
      feriados:S.config.feriados, nomeProf:S.config.nomeProf } };
  const blob = new Blob([JSON.stringify(d, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); const h = new Date();
  a.href = url;
  a.download = 'horario-'+h.getFullYear()+String(h.getMonth()+1).padStart(2,'0')+String(h.getDate()).padStart(2,'0')+'.json';
  a.click(); URL.revokeObjectURL(url); toast('Backup baixado');
}
$('#input-importar').onchange = e => {
  const f = e.target.files[0]; if(!f) return;
  const r = new FileReader();
  r.onload = ev => {
    try{
      const d = JSON.parse(ev.target.result);
      if(!d.aulas) throw new Error('Inválido');
      if(!confirm('Substituir todos os dados atuais?')) return;
      S.aulas = d.aulas.map(a => ({id:a.id||uid(), ...a}));
      S.geral = (d.geral||[]).map(a => ({id:a.id||uid(), ...a}));
      S.alunos = (d.alunos||[]).map(a => migrarAluno({id:a.id||uid(), notas:[], ...a}));
      S.vistos = (d.vistos||[]).map(migrarVisto);
      if(d.config) S.config = {...S.config, ...d.config};
      migrarNomes(S.aulas); migrarNomes(S.geral);
      localStorage.setItem('h5.seedVer','v5.0-112');
      salvarTudo(); render(); toast('Backup importado');
    }catch(err){ toast('Arquivo inválido'); }
  };
  r.readAsText(f); e.target.value = '';
};

/* ═══════ EVENTOS GLOBAIS ═══════ */
$$('#bottom-nav button').forEach(b => {
  b.onclick = () => {
    S.tab = b.dataset.tab;
    S.busca = ''; S.filtroLista = 'todos';
    if(S.tab === 'horario') S.sub = 'calendario';
    render();
    window.scrollTo({top:0,behavior:'smooth'});
  };
});
$('#add').onclick = () => {
  if(S.tab === 'alunos') abrirNovoAluno();
  else abrirNovaAula();
};

function tick(){
  const el = document.getElementById('agora');
  if(el) el.textContent = horaAgora().replace(':','h');
  verificarNotif();
}
function init(){
  carregarTudo();
  aplicarTema();
  S.notifSessao = new Set();
  render();
  setInterval(tick, 30000);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', aplicarTema);
  document.addEventListener('visibilitychange', () => {
    if(!document.hidden && S.tab === 'horario' && S.sub === 'calendario'){
      iniciarTickContagem();
    }
  });
}
if('serviceWorker' in navigator){
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  });
}
init();
})();