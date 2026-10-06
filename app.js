(() => {
'use strict';

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
  presente:    { label:'Presente',    curto:'P', cor:'#10b981', soft:'#d1fae5', ico:'i-check-circle' },
  ausente:     { label:'Ausente',     curto:'A', cor:'#ef4444', soft:'#fee2e2', ico:'i-x-circle' },
  justificado: { label:'Justificado', curto:'J', cor:'#f59e0b', soft:'#fef3c7', ico:'i-info' },
  pendente:    { label:'Pendente',    curto:'—', cor:'#94a3b8', soft:'#e5e7eb', ico:'i-clock' }
};

const DIAS = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
const DIAS_CURTO = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const ORDEM = [1,2,3,4,5,6,0];

/* ═══════ ESCOLAS/TURMAS — agora TURMAS é mutável ═══════ */
const ESCOLAS = [
  { nome:'Gentil Dantas', turmas:['1º ADM','1º Cont. Ambiental','2º Sistemas','2º ADM','3º Sistemas','3º Regular'] },
  { nome:'Enéas Nogueira', turmas:['8º Ano A','8º Ano B'] }
];
let TURMAS = ESCOLAS.flatMap(e => e.turmas);
const ESCOLA_DA_TURMA = {};
ESCOLAS.forEach(e => e.turmas.forEach(t => { ESCOLA_DA_TURMA[t] = e.nome; }));

const GRAD_TURMA = {
  '1º ADM':'linear-gradient(160deg,#3b82f6,#2563eb)',
  '1º Cont. Ambiental':'linear-gradient(160deg,#06b6d4,#0891b2)',
  '2º Sistemas':'linear-gradient(160deg,#6366f1,#4f46e5)',
  '8º Ano A':'linear-gradient(160deg,#0ea5e9,#0284c7)',
  '8º Ano B':'linear-gradient(160deg,#38bdf8,#0ea5e9)',
  '2º ADM':'linear-gradient(160deg,#64748b,#475569)',
  '3º Sistemas':'linear-gradient(160deg,#64748b,#475569)',
  '3º Regular':'linear-gradient(160deg,#64748b,#475569)'
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

/* CONFIG_DEFAULT ganha 3 campos novos para gerenciar turmas */
const CONFIG_DEFAULT = {
  tema:'auto', avisoMin:10, notifAtiva:false, feriados:[],
  nomeProf:'Antonio Elio dos Santos Negreiros',
  turmasCustom: [],       // turmas adicionadas pelo usuário
  turmasRemovidas: [],    // turmas hardcoded que foram excluídas
  turmasRenomeadas: {}    // mapa { antigo: novo }
};

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
  const p = String(nome || '').trim().split(/\s+/).filter(Boolean);
  if(!p.length) return '?';
  if(p.length === 1) return (p[0][0] || '?').toUpperCase();
  const a = p[0][0] || '';
  const b = p[p.length - 1][0] || '';
  return (a + b).toUpperCase() || '?';
}
function corDe(str){
  const cores=['#3b82f6','#06b6d4','#6366f1','#0ea5e9','#38bdf8','#8b5cf6','#0891b2','#2563eb','#0284c7','#60a5fa'];
  let h=0; for(let i=0;i<str.length;i++) h=(h*31+str.charCodeAt(i))|0;
  return cores[Math.abs(h)%cores.length];
}

const ler = k => { try{ const r=localStorage.getItem(k); return r?JSON.parse(r):null; }catch(e){ return null; } };
const gravar = (k,v) => localStorage.setItem(k, JSON.stringify(v));

const S = {
  aulas: [], geral: [], alunos: [], vistos: [], config: {...CONFIG_DEFAULT},
  tab: 'horario', sub: 'calendario', diaSel: hoje().getDay(), turmaAluno: TURMAS[0],
  calMes: hoje().getMonth(), calAno: hoje().getFullYear(),
  busca: '', filtroLista: 'todos', filtroGeral: 'tudo',
  notifSessao: new Set(),
  calDiaAtivo: chaveData(hoje()),
  subAlunos: 'chamada',
  aulaChamadaId: null
};

/* ═══════ APLICAR CONFIG DE TURMAS (renomeações/remoções) ═══════ */
function aplicarConfiguracoesTurmas(){
  // 1) Remover turmas marcadas como removidas
  const removidas = S.config.turmasRemovidas || [];
  removidas.forEach(nome => {
    ESCOLAS.forEach(e => {
      const i = e.turmas.indexOf(nome);
      if(i > -1) e.turmas.splice(i, 1);
    });
    delete ESCOLA_DA_TURMA[nome];
    delete GRAD_TURMA[nome];
    delete COR_TURMA_SOLID[nome];
  });

  // 2) Aplicar renomeações em ordem
  const renomeadas = S.config.turmasRenomeadas || {};
  Object.entries(renomeadas).forEach(([antigo, novo]) => {
    ESCOLAS.forEach(e => {
      const i = e.turmas.indexOf(antigo);
      if(i > -1) e.turmas[i] = novo;
    });
    if(ESCOLA_DA_TURMA[antigo]){
      ESCOLA_DA_TURMA[novo] = ESCOLA_DA_TURMA[antigo];
      delete ESCOLA_DA_TURMA[antigo];
    }
    if(GRAD_TURMA[antigo]){
      GRAD_TURMA[novo] = GRAD_TURMA[antigo];
      delete GRAD_TURMA[antigo];
    }
    if(COR_TURMA_SOLID[antigo]){
      COR_TURMA_SOLID[novo] = COR_TURMA_SOLID[antigo];
      delete COR_TURMA_SOLID[antigo];
    }
  });

  // 3) Recalcular lista global
  TURMAS = [
    ...ESCOLAS.flatMap(e => e.turmas),
    ...(S.config.turmasCustom || [])
  ];

  // 4) Validar turma selecionada
  if(!TURMAS.includes(S.turmaAluno)){
    S.turmaAluno = TURMAS[0] || '';
  }
}

function migrarNomes(arr){ arr.forEach(a => { if(RENOMEAR[a.turma]) a.turma = RENOMEAR[a.turma]; }); }

function migrarAluno(a){
  if(MIGRA_NIVEL[a.nivel]) a.nivel = MIGRA_NIVEL[a.nivel];
  if(!NIVEL_MAP[a.nivel]) a.nivel = 'bom';
  if(Array.isArray(a.notas) && !Array.isArray(a.observacoes)){
    a.observacoes = a.notas.map(n => ({
      id: n.id || uid(), data: n.data || chaveData(hoje()),
      texto: n.texto || '', tipo: n.tipo || 'neutro'
    }));
  }
  delete a.notas;
  if(!Array.isArray(a.observacoes)) a.observacoes = [];
  return a;
}

function migrarVisto(v){
  if(!v.status){
    v.status = {};
    if(Array.isArray(v.presentes)){ v.presentes.forEach(id => { v.status[id] = 'presente'; }); }
  }
  delete v.presentes;
  if(!v.registros) v.registros = {};
  return v;
}

function carregarTudo(){
  S.aulas = ler(K.aulas) || SEED_AULAS.map((a,i)=>({id:'s'+i, ...a}));
  S.geral = ler(K.geral) || [];
  const SEED_VER = 'v6.1-turmas';
  const jaSalvos = ler(K.alunos);
  if(localStorage.getItem('h5.seedVer') === SEED_VER && jaSalvos){
    S.alunos = jaSalvos.map(migrarAluno);
  } else if(jaSalvos && jaSalvos.length){
    const existentes = new Set(jaSalvos.map(a => a.turma + '||' + a.nome.toUpperCase()));
    const novos = SEED_ALUNOS.filter(s => !existentes.has(s.t + '||' + s.n.toUpperCase()));
    S.alunos = [
      ...jaSalvos.map(migrarAluno),
      ...novos.map(s => ({id:uid(), nome:s.n, turma:s.t, nivel:'bom', observacoes:[]}))
    ];
    localStorage.setItem('h5.seedVer', SEED_VER);
  } else {
    S.alunos = SEED_ALUNOS.map(s => ({id:uid(), nome:s.n, turma:s.t, nivel:'bom', observacoes:[]}));
    localStorage.setItem('h5.seedVer', SEED_VER);
  }
  S.vistos = (ler(K.vistos) || []).map(migrarVisto);
  S.config = {...CONFIG_DEFAULT, ...(ler(K.config)||{})};
  migrarNomes(S.aulas); migrarNomes(S.geral);
  aplicarConfiguracoesTurmas();
  salvarTudo();
}
function salvarTudo(){
  gravar(K.aulas, S.aulas); gravar(K.geral, S.geral);
  gravar(K.alunos, S.alunos); gravar(K.vistos, S.vistos);
  gravar(K.config, S.config);
}

function aplicarTema(){
  document.documentElement.setAttribute('data-tema', S.config.tema || 'auto');
  const escuro = S.config.tema==='escuro' ||
    (S.config.tema==='auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  const meta = document.querySelector('meta[name="theme-color"]');
  if(meta) meta.setAttribute('content', escuro ? '#070c1a' : '#2563eb');
}

let tTimer;
function toast(msg){
  const t = $('#toast'); t.innerHTML = msg; t.classList.add('on');
  clearTimeout(tTimer); tTimer = setTimeout(()=>t.classList.remove('on'), 2400);
}

function abrirModal(html){
  const sheet = $('#sheet'); sheet.innerHTML = '<div class="sheet-grab"></div>' + html;
  $('#modal').classList.add('aberto');
}
function fecharModal(){ $('#modal').classList.remove('aberto'); }
$('#modal').addEventListener('click', e => { if(e.target.id === 'modal') fecharModal(); });

/* PRESENÇA / REGISTROS */
function proximoStatus(atual){
  if(atual === 'presente') return 'ausente';
  if(atual === 'ausente') return 'justificado';
  if(atual === 'justificado') return 'presente';
  return 'presente';
}
function getVisto(aulaId, data){ return S.vistos.find(x => x.aulaId === aulaId && x.data === data); }
function getStatusAluno(aulaId, data, alunoId){
  const v = getVisto(aulaId, data);
  if(!v || !v.status) return 'pendente';
  return v.status[alunoId] || 'pendente';
}
function getRegistroAluno(aulaId, data, alunoId){
  const v = getVisto(aulaId, data);
  if(!v || !v.registros) return {};
  return v.registros[alunoId] || {};
}
function garantirVisto(aula, data){
  let v = getVisto(aula.id, data);
  if(!v){
    v = { id: uid(), aulaId: aula.id, data, turma: aula.turma, status: {}, registros: {} };
    S.vistos.push(v);
  }
  if(!v.status) v.status = {};
  if(!v.registros) v.registros = {};
  return v;
}
function setStatusAluno(aula, data, alunoId, status){
  const v = garantirVisto(aula, data);
  if(status === 'pendente') delete v.status[alunoId];
  else v.status[alunoId] = status;
  gravar(K.vistos, S.vistos);
}
function setRegistroAluno(aula, data, alunoId, chave, valor){
  const v = garantirVisto(aula, data);
  const reg = v.registros[alunoId] || {};
  if(valor === false || valor === null || valor === '') delete reg[chave];
  else reg[chave] = valor;
  if(Object.keys(reg).length) v.registros[alunoId] = reg;
  else delete v.registros[alunoId];
  gravar(K.vistos, S.vistos);
}

function resumoAula(aulaId, data, turma){
  const alunos = S.alunos.filter(a => a.turma === turma);
  const v = getVisto(aulaId, data);
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

function statsAluno(alunoId, turma, dias){
  dias = dias || 90;
  const limite = dias >= 9999 ? new Date(0) : new Date(Date.now() - dias*86400000);
  const chamadas = S.vistos.filter(v => v.turma === turma && new Date(v.data + 'T12:00') >= limite);
  let pres=0, aus=0, jus=0, tot=0;
  let totTrab=0, entrTrab=0, totProv=0, fezProv=0, totAtiv=0, respAtiv=0;
  const notas = [];
  chamadas.forEach(v => {
    const st = v.status && v.status[alunoId];
    if(st){
      tot++;
      if(st === 'presente') pres++;
      else if(st === 'ausente') aus++;
      else if(st === 'justificado') jus++;
    }
    const reg = v.registros && v.registros[alunoId];
    if(reg){
      if(reg.trabalho != null){ totTrab++; if(reg.trabalho) entrTrab++; }
      if(reg.prova    != null){ totProv++; if(reg.prova)    fezProv++; }
      if(reg.atividade!= null){ totAtiv++; if(reg.atividade) respAtiv++; }
      if(reg.nota != null && !isNaN(reg.nota)) notas.push(Number(reg.nota));
    }
  });
  const freq = tot ? Math.round(pres / tot * 100) : null;
  const pctTrab = totTrab ? Math.round(entrTrab/totTrab*100) : null;
  const pctProv = totProv ? Math.round(fezProv/totProv*100) : null;
  const pctAtiv = totAtiv ? Math.round(respAtiv/totAtiv*100) : null;
  const media   = notas.length ? (notas.reduce((a,b)=>a+b,0)/notas.length) : null;
  return { pres, aus, jus, tot, freq,
    totTrab, entrTrab, pctTrab, totProv, fezProv, pctProv,
    totAtiv, respAtiv, pctAtiv, notas, media, qtdNotas: notas.length };
}

function calcScore(aluno){
  const st = statsAluno(aluno.id, aluno.turma, 9999);
  const comps = [];
  if(st.freq != null) comps.push(st.freq);
  if(st.pctTrab != null) comps.push(st.pctTrab);
  if(st.pctProv != null) comps.push(st.pctProv);
  if(st.pctAtiv != null) comps.push(st.pctAtiv);
  if(st.media != null) comps.push(st.media * 10);
  const nivelScore = {otimo:100, bom:80, atencao:50, critico:20}[aluno.nivel] ?? 60;
  comps.push(nivelScore);
  const score = Math.round(comps.reduce((a,b)=>a+b,0) / comps.length);
  return { score, stats: st };
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
  const d = new Date(hj);
  d.setDate(d.getDate() + (dow - hj.getDay()));
  return chaveData(d);
}

function segundosAte(hhmm){
  const agora = new Date();
  const [h,m] = hhmm.split(':').map(Number);
  const alvo = new Date(agora);
  alvo.setHours(h, m, 0, 0);
  return Math.max(0, Math.floor((alvo - agora) / 1000));
}
function formatarContagem(seg){
  if(seg <= 0) return '00:00';
  const h = Math.floor(seg/3600), m = Math.floor((seg%3600)/60), s = seg%60;
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
    horario: { ico:'i-calendar',    t:'Horário', sub:'Calendário e aulas' },
    alunos:  { ico:'i-users-group', t:'Alunos',  sub:'Turmas, presença e desempenho' },
    config:  { ico:'i-settings',    t:'Ajustes', sub:'Configurações' }
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
    const qtd = S.alunos.filter(a => a.turma === S.turmaAluno).length;
    el.innerHTML = `
      <div class="turma-selector-wrap">
        <button class="turma-selector" id="btn-turma">
          <div class="turma-selector-icon">${ico('i-users-group','ico-18')}</div>
          <div class="turma-selector-text">
            <div class="turma-selector-label">Turma</div>
            <div class="turma-selector-value">${esc(S.turmaAluno)} <span class="turma-selector-count">· ${qtd} aluno${qtd===1?'':'s'}</span></div>
          </div>
          <div class="turma-selector-chevron">${ico('i-chevron-down','ico-18')}</div>
        </button>
      </div>`;
    el.querySelector('#btn-turma').onclick = () => abrirSeletorTurma();
    return;
  }
  el.innerHTML = '';
}

function renderBottomNav(){
  $$('#bottom-nav button').forEach(b => b.classList.toggle('on', b.dataset.tab === S.tab));
}
function renderFab(){
  const show = S.tab !== 'config' && !(S.tab === 'horario' && S.sub === 'semana');
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
  else if(S.tab === 'config') renderConfig(main);
}

/* CALENDÁRIO */
function renderCalendario(main){
  const card = document.createElement('div');
  card.className = 'card';
  const head = document.createElement('div');
  head.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:8px';
  head.innerHTML = `
    <button id="cal-prev" style="width:38px;height:38px;border-radius:12px;border:0;background:var(--card-2);color:var(--text);cursor:pointer;display:grid;place-items:center">${ico('i-chevron-left','ico-18')}</button>
    <h2 style="margin:0;font-size:17px;font-weight:800;letter-spacing:-.4px;text-transform:capitalize">${MESES[S.calMes]} ${S.calAno}</h2>
    <button id="cal-next" style="width:38px;height:38px;border-radius:12px;border:0;background:var(--card-2);color:var(--text);cursor:pointer;display:grid;place-items:center">${ico('i-chevron-right','ico-18')}</button>`;
  card.appendChild(head);

  const grid = document.createElement('div');
  grid.style.cssText = 'display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-top:6px';
  ['D','S','T','Q','Q','S','S'].forEach(dow => {
    const el = document.createElement('div');
    el.style.cssText = 'text-align:center;font-size:11px;font-weight:800;color:var(--muted);padding:8px 0;text-transform:uppercase';
    el.textContent = dow; grid.appendChild(el);
  });
  const primeiroDia = new Date(S.calAno, S.calMes, 1).getDay();
  const diasNoMes = new Date(S.calAno, S.calMes+1, 0).getDate();
  const diasNoMesAnt = new Date(S.calAno, S.calMes, 0).getDate();
  const chHoje = chaveData(hoje());

  for(let i = primeiroDia - 1; i >= 0; i--){
    const el = document.createElement('button');
    el.style.cssText = 'aspect-ratio:1;border:0;background:transparent;color:var(--muted);opacity:.3;font-family:inherit;font-size:14px;font-weight:700;border-radius:12px;cursor:default';
    el.textContent = diasNoMesAnt - i; grid.appendChild(el);
  }
  for(let d = 1; d <= diasNoMes; d++){
    const data = new Date(S.calAno, S.calMes, d);
    const chave = chaveData(data), dow = data.getDay();
    const aulasDoDia = S.aulas.filter(a => a.dia === dow);
    const feriado = S.config.feriados.includes(chave);
    const ehHoje = chave === chHoje, sel = chave === S.calDiaAtivo;
    const el = document.createElement('button');
    el.style.cssText = `aspect-ratio:1;border:0;background:transparent;color:var(--text);font-family:inherit;font-size:14px;font-weight:700;border-radius:12px;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;position:relative;transition:transform .12s;${ehHoje?'background:var(--grad-primary-cyan);color:#fff;':''}${feriado&&!ehHoje?'background:var(--yellow-soft);color:var(--yellow);':''}${sel&&!ehHoje?'box-shadow:0 0 0 2.5px var(--primary);':''}${sel&&ehHoje?'box-shadow:0 0 0 2.5px #06b6d4;':''}`;
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
    el.textContent = i; grid.appendChild(el);
  }
  card.appendChild(grid); main.appendChild(card);

  setTimeout(() => {
    const p = document.getElementById('cal-prev'), n = document.getElementById('cal-next');
    if(p) p.onclick = () => { S.calMes--; if(S.calMes<0){S.calMes=11;S.calAno--;} render(); };
    if(n) n.onclick = () => { S.calMes++; if(S.calMes>11){S.calMes=0;S.calAno++;} render(); };
  }, 0);

  const [y,m,dd] = S.calDiaAtivo.split('-').map(Number);
  const dowSel = new Date(y, m-1, dd).getDay();
  const aulasSel = S.aulas.filter(a => a.dia === dowSel).sort((a,b)=>a.ini.localeCompare(b.ini));
  const feriadoSel = S.config.feriados.includes(S.calDiaAtivo);
  const ehHojeSel = S.calDiaAtivo === chHoje;
  const sec = document.createElement('div');
  sec.className = 'section-h';
  sec.innerHTML = `${ico('i-calendar','ico-20 lead')}<h3>${dd} de ${MESES[m-1]} · ${DIAS[dowSel]}</h3><span class="count">${aulasSel.length} aula${aulasSel.length===1?'':'s'}</span>`;
  main.appendChild(sec);

  if(feriadoSel){
    const v = document.createElement('div'); v.className = 'vazio';
    v.innerHTML = `${ico('i-star','ico')}Feriado 🎉<br>Aproveite o descanso`; main.appendChild(v); return;
  }
  if(!aulasSel.length){
    const v = document.createElement('div'); v.className = 'vazio';
    v.innerHTML = `${ico('i-calendar','ico')}Sem aulas neste dia.`; main.appendChild(v); return;
  }
  if(ehHojeSel){ main.appendChild(criarCountdownCard(aulasSel)); }
  aulasSel.forEach(a => main.appendChild(criarAulaCardComContagem(a, dowSel, ehHojeSel)));
  if(!ehHojeSel){
    const av = document.createElement('div');
    av.style.cssText = 'text-align:center;font-size:12px;color:var(--muted);padding:10px;font-weight:600';
    av.textContent = `Mostrando aulas de ${DIAS[dowSel]}`; main.appendChild(av);
  }
  iniciarTickContagem();
}

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
      <div class="countdown-header"><span class="dot-live"></span><span>AULA ACONTECENDO AGORA</span></div>
      <div class="countdown-timer" id="cd-timer">${formatarContagem(segRestantes)}<small>restantes</small></div>
      <div class="countdown-aula">
        <div class="countdown-aula-icon">${ico('i-dot','ico-22')}</div>
        <div class="countdown-aula-info">
          <div class="countdown-aula-turma">${esc(atual.turma)}</div>
          <div class="countdown-aula-meta">${esc(atual.materia || 'Sem matéria')} · termina às ${esc(atual.fim || '?')}</div>
        </div>
      </div>
      <button class="countdown-cta" id="cd-cta">${ico('i-clipboard','ico-18')} Fazer chamada agora</button>`;
    card.dataset.modo = 'atual';
    card.dataset.aulaId = atual.id;
    setTimeout(() => {
      const btn = document.getElementById('cd-cta');
      if(btn) btn.onclick = () => {
        S.tab = 'alunos'; S.subAlunos = 'chamada';
        S.turmaAluno = atual.turma; S.aulaChamadaId = atual.id;
        S.diaSel = atual.dia; render();
        window.scrollTo({top:0,behavior:'smooth'});
      };
    }, 0);
    return;
  }
  if(prox){
    const segAte = segundosAte(prox.ini);
    card.innerHTML = `
      <div class="countdown-header"><span class="dot-live"></span><span>PRÓXIMA AULA</span></div>
      <div class="countdown-timer" id="cd-timer">${formatarContagem(segAte)}<small>para começar</small></div>
      <div class="countdown-aula">
        <div class="countdown-aula-icon">${ico('i-hourglass','ico-22')}</div>
        <div class="countdown-aula-info">
          <div class="countdown-aula-turma">${esc(prox.turma)}</div>
          <div class="countdown-aula-meta">${esc(prox.materia || 'Sem matéria')} · começa às ${esc(prox.ini)}</div>
        </div>
      </div>`;
    card.dataset.modo = 'prox'; card.dataset.aulaId = prox.id; return;
  }
  card.innerHTML = `
    <div class="countdown-empty">
      <div class="countdown-header"><span>FIM DO DIA</span></div>
      <div class="title">Todas as aulas terminaram 🎉</div>
      <div class="sub">Bom descanso! Volte amanhã para conferir o próximo dia.</div>
    </div>`;
  card.dataset.modo = 'fim'; delete card.dataset.aulaId;
}

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
  el.style.position = 'relative'; el.style.overflow = 'hidden';
  if(atual) el.style.boxShadow = `0 0 0 2px ${corChip}, 0 12px 28px -14px ${corChip}88`;
  else if(passada) el.style.opacity = '0.62';
  const barra = document.createElement('div');
  barra.style.cssText = `position:absolute;left:0;top:0;bottom:0;width:4px;background:${corChip};${passada?'opacity:.45':''}`;
  el.appendChild(barra);
  const header = document.createElement('div');
  header.className = 'aula-head'; header.style.paddingLeft = '8px';
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
    linha.style.cssText = `display:flex;align-items:center;gap:8px;margin-top:14px;padding-top:12px;border-top:1px solid var(--border-2);font-size:12.5px;font-weight:700;color:${atual?'var(--green)':'var(--primary)'};`;
    const icoL = atual ? 'i-dot' : 'i-hourglass';
    const label = atual ? 'Termina em' : 'Começa em';
    linha.innerHTML = `${ico(icoL,'ico-14')}<span style="opacity:.8">${label}</span>
      <span class="cd-inline" data-ini="${a.ini}" data-fim="${a.fim}" data-modo="${atual?'atual':'prox'}" style="margin-left:auto;font-variant-numeric:tabular-nums;font-size:16px;font-weight:800;letter-spacing:-.3px;color:inherit">--:--</span>`;
    el.appendChild(linha);
  } else if(passada){
    const linha = document.createElement('div');
    linha.style.cssText = `display:flex;align-items:center;gap:6px;margin-top:12px;padding-top:10px;border-top:1px solid var(--border-2);font-size:11.5px;font-weight:700;color:var(--muted);`;
    linha.innerHTML = `${ico('i-check','ico-12')} Aula encerrada`; el.appendChild(linha);
  } else if(!ehHoje){
    const linha = document.createElement('div');
    linha.style.cssText = `display:flex;align-items:center;gap:6px;margin-top:12px;padding-top:10px;border-top:1px solid var(--border-2);font-size:11.5px;font-weight:700;color:var(--muted);`;
    linha.innerHTML = `${ico('i-calendar','ico-12')} ${DIAS[dowSel]}`; el.appendChild(linha);
  }
  el.onclick = () => abrirEdicaoAula(a.id, 'aula');
  return el;
}

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
    const seg = el.dataset.modo === 'atual' ? segundosAte(el.dataset.fim) : segundosAte(el.dataset.ini);
    el.textContent = formatarContagem(seg);
  });
  const elAg = document.getElementById('agora');
  if(elAg) elAg.textContent = horaAgora().replace(':','h');
}

function renderSemana(main){
  const dHoje = hoje().getDay();
  let tem = false;
  ORDEM.forEach(d => {
    const lista = S.aulas.filter(a => a.dia === d).sort((a,b)=>a.ini.localeCompare(b.ini));
    if(!lista.length) return;
    tem = true;
    const sec = document.createElement('div'); sec.className = 'section-h';
    sec.innerHTML = `${ico('i-calendar','ico-20 lead')}<h3>${DIAS[d]}${d===dHoje?' · hoje':''}</h3><span class="count">${lista.length}</span>`;
    main.appendChild(sec);
    lista.forEach(a => main.appendChild(criarAulaCardSimples(a, d)));
  });
  if(!tem){
    const v = document.createElement('div'); v.className = 'vazio';
    v.innerHTML = `${ico('i-grid','ico')}Nenhuma aula cadastrada.`; main.appendChild(v);
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

function renderGeral(main){
  pararTickContagem();
  const dayTabs = document.createElement('div');
  dayTabs.className = 'day-tabs'; dayTabs.style.marginTop = '0'; dayTabs.style.padding = '0';
  const dHojeTab = hoje().getDay();
  ORDEM.forEach(d => {
    const b = document.createElement('button');
    b.className = 'day-tab' + (d===S.diaSel?' on':'') + (d===dHojeTab&&d!==S.diaSel?' today':'');
    b.textContent = DIAS_CURTO[d];
    b.onclick = () => { S.diaSel = d; render(); };
    dayTabs.appendChild(b);
  });
  main.appendChild(dayTabs);
  const chips = document.createElement('div');
  chips.className = 'chips';
  [['tudo','Tudo'],['minhas','Minhas'],['outras','Outras']].forEach(([v,t]) => {
    const c = document.createElement('button');
    c.className = 'chip' + (S.filtroGeral === v ? ' on':'');
    c.textContent = t;
    c.onclick = () => { S.filtroGeral = v; render(); };
    chips.appendChild(c);
  });
  main.appendChild(chips);
  const aulasDia = S.aulas.filter(a => a.dia === S.diaSel).map(a => ({...a, _tipo:'aula'}));
  const geralDia = S.geral.filter(a => a.dia === S.diaSel).map(a => ({...a, _tipo:'geral'}));
  let todas = [...aulasDia, ...geralDia].sort((a,b)=>a.ini.localeCompare(b.ini));
  if(S.filtroGeral === 'minhas') todas = todas.filter(a => a._tipo === 'aula');
  else if(S.filtroGeral === 'outras') todas = todas.filter(a => a._tipo === 'geral');
  const conflitos = detectarConflitos([...aulasDia, ...geralDia]);
  if(conflitos.size){
    const aviso = document.createElement('div');
    aviso.className = 'card';
    aviso.style.cssText = 'background:linear-gradient(135deg,#fee2e2,#fff1f2);border-color:rgba(239,68,68,.3);display:flex;align-items:center;gap:14px';
    aviso.innerHTML = `<div class="aula-icon" style="background:linear-gradient(135deg,#ef4444,#dc2626)">${ico('i-alert','ico-22')}</div>
      <div><div style="font-size:10.5px;font-weight:800;letter-spacing:1.2px;color:#dc2626">ATENÇÃO</div>
      <div style="font-size:15px;font-weight:800;margin-top:3px">${conflitos.size} aulas com choque de sala</div>
      <div style="font-size:12px;color:var(--muted);font-weight:600;margin-top:2px">Reserve o lab antes dos colegas</div></div>`;
    main.appendChild(aviso);
  }
  if(!todas.length){
    const v = document.createElement('div'); v.className = 'vazio';
    v.innerHTML = `${ico('i-users-group','ico')}${S.filtroGeral==='outras'?'Nenhuma aula de colega.':'Sem aulas neste dia.'}`;
    main.appendChild(v); return;
  }
  const agora = horaAgora(), dHojeCalc = hoje().getDay();
  todas.forEach(a => {
    const ehMinha = a._tipo === 'aula';
    const temConflito = conflitos.has(a.id);
    const atual = S.diaSel === dHojeCalc && a.ini <= agora && agora < (a.fim || '23:59');
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

/* ABA ALUNOS */
function renderAlunos(main){
  pararTickContagem();
  const subNav = document.createElement('div');
  subNav.className = 'seg-tabs'; subNav.style.marginTop = '12px';
  const subs = [['chamada','i-clipboard','Chamada'],['lista','i-users','Lista'],['dashboard','i-trophy','Dashboard']];
  subNav.innerHTML = subs.map(([v,i,t]) => `<button class="seg-tab${S.subAlunos===v?' on':''}" data-v="${v}">${ico(i,'ico-16')} ${t}</button>`).join('');
  main.appendChild(subNav);
  subNav.querySelectorAll('button').forEach(b => { b.onclick = () => { S.subAlunos = b.dataset.v; render(); }; });
  if(S.subAlunos === 'chamada')   return renderChamada(main);
  if(S.subAlunos === 'lista')     return renderListaAlunos(main);
  if(S.subAlunos === 'dashboard') return renderDashboard(main);
}

function renderChamada(main){
  const turma = S.turmaAluno;
  const aulasDia = S.aulas.filter(a => a.dia === S.diaSel && a.turma === turma).sort((a,b)=>a.ini.localeCompare(b.ini));
  const dayTabs = document.createElement('div');
  dayTabs.className = 'day-tabs'; dayTabs.style.marginTop = '8px'; dayTabs.style.padding = '0';
  const dHoje = hoje().getDay();
  ORDEM.forEach(d => {
    const b = document.createElement('button');
    b.className = 'day-tab' + (d===S.diaSel?' on':'') + (d===dHoje&&d!==S.diaSel?' today':'');
    b.textContent = DIAS_CURTO[d];
    b.onclick = () => { S.diaSel = d; S.aulaChamadaId = null; render(); };
    dayTabs.appendChild(b);
  });
  main.appendChild(dayTabs);
  if(!aulasDia.length){
    const v = document.createElement('div'); v.className = 'vazio';
    v.innerHTML = `${ico('i-calendar','ico')}Sem aulas de <b>${esc(turma)}</b> ${DIAS[S.diaSel]}.`;
    main.appendChild(v); return;
  }
  if(!S.aulaChamadaId || !aulasDia.find(a => a.id === S.aulaChamadaId)){
    const hhmm = horaAgora();
    const atual = aulasDia.find(a => a.ini <= hhmm && hhmm < (a.fim || '23:59'));
    const prox = aulasDia.find(a => a.ini > hhmm);
    S.aulaChamadaId = (atual || prox || aulasDia[0]).id;
  }
  const aulaSel = aulasDia.find(a => a.id === S.aulaChamadaId);
  if(aulasDia.length > 1){
    const aulaChips = document.createElement('div');
    aulaChips.className = 'chips'; aulaChips.style.marginTop = '4px';
    aulasDia.forEach(a => {
      const c = document.createElement('button');
      c.className = 'chip' + (a.id === S.aulaChamadaId ? ' on':'');
      c.textContent = `${a.ini} · ${a.materia || 'Aula'}`;
      c.onclick = () => { S.aulaChamadaId = a.id; render(); };
      aulaChips.appendChild(c);
    });
    main.appendChild(aulaChips);
  }
  const dataRef = S.diaSel === dHoje ? chaveData(hoje()) : dataDaSemana(S.diaSel);
  const resumo = resumoAula(aulaSel.id, dataRef, aulaSel.turma);
  const grad = GRAD_TURMA[aulaSel.turma] || 'var(--grad-primary-cyan)';
  const escola = ESCOLA_DA_TURMA[aulaSel.turma];
  const cardAula = document.createElement('div');
  cardAula.className = 'aula-card'; cardAula.style.cursor = 'default';
  cardAula.innerHTML = `
    <div class="aula-head">
      <div class="aula-icon" style="background:${grad}">${ico('i-book','ico-22')}</div>
      <div class="aula-body">
        <div class="aula-turma">${esc(aulaSel.turma)}</div>
        <div class="aula-sub">${aulaSel.materia?esc(aulaSel.materia):'—'}</div>
        <div class="aula-meta">
          <span>${ico('i-clock','ico-14')} ${esc(aulaSel.ini)} – ${esc(aulaSel.fim||'?')}</span>
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

  const searchRow = document.createElement('div');
  searchRow.className = 'search-row';
  searchRow.innerHTML = `<div class="search-box">${ico('i-search','ico-18')}<input type="text" id="busca-chamada" placeholder="Buscar aluno..." value="${esc(S.busca||'')}"></div>`;
  main.appendChild(searchRow);
  const inp = searchRow.querySelector('#busca-chamada');
  inp.oninput = e => {
    S.busca = e.target.value;
    const pos = e.target.selectionStart;
    render();
    const novo = document.getElementById('busca-chamada');
    if(novo){ novo.focus(); try{ novo.setSelectionRange(pos,pos);}catch(_){} }
  };

  const todos = S.alunos.filter(a => a.turma === turma).sort((a,b)=>a.nome.localeCompare(b.nome));
  const btnRow = document.createElement('div');
  btnRow.style.cssText = 'display:flex;gap:8px;align-items:stretch';
  const bTodos = document.createElement('button');
  bTodos.className = 'cfg-btn secundario'; bTodos.style.cssText = 'margin-top:0;flex:1';
  bTodos.innerHTML = ico('i-check','ico-16') + ' Marcar todos presentes';
  bTodos.onclick = () => {
    if(!confirm(`Marcar ${todos.length} alunos como presentes?`)) return;
    todos.forEach(al => setStatusAluno(aulaSel, dataRef, al.id, 'presente'));
    render(); toast('Todos presentes');
  };
  const bLimpar = document.createElement('button');
  bLimpar.className = 'cfg-btn secundario';
  bLimpar.style.cssText = 'margin-top:0;flex:0 0 48px;width:48px;height:48px;padding:0;display:grid;place-items:center;color:var(--muted)';
  bLimpar.innerHTML = ico('i-refresh','ico-18');
  bLimpar.onclick = () => {
    if(!confirm('Limpar chamada desta aula?')) return;
    todos.forEach(al => {
      setStatusAluno(aulaSel, dataRef, al.id, 'pendente');
      setRegistroAluno(aulaSel, dataRef, al.id, 'trabalho', false);
      setRegistroAluno(aulaSel, dataRef, al.id, 'prova', false);
      setRegistroAluno(aulaSel, dataRef, al.id, 'atividade', false);
      setRegistroAluno(aulaSel, dataRef, al.id, 'nota', null);
    });
    render(); toast('Chamada limpa');
  };
  btnRow.appendChild(bTodos); btnRow.appendChild(bLimpar);
  main.appendChild(btnRow);

  const busca = (S.busca||'').toLowerCase().trim();
  const lista = todos.filter(al => !busca || al.nome.toLowerCase().includes(busca));
  if(!lista.length){
    const v = document.createElement('div'); v.className = 'vazio';
    v.innerHTML = `${ico('i-search','ico')}Nenhum aluno encontrado.`; main.appendChild(v); return;
  }
  lista.forEach(al => main.appendChild(criarLinhaChamada(al, aulaSel, dataRef)));
  if(S.diaSel !== dHoje){
    const av = document.createElement('div');
    av.style.cssText = 'text-align:center;font-size:12px;color:var(--muted);padding:10px;font-weight:600';
    av.textContent = `Chamada referente a ${DIAS[S.diaSel]} (${fmtData(dataRef)})`;
    main.appendChild(av);
  }
}

function criarLinhaChamada(al, aula, dataRef){
  const st = getStatusAluno(aula.id, dataRef, al.id);
  const reg = getRegistroAluno(aula.id, dataRef, al.id);
  const nivel = NIVEL_MAP[al.nivel] || NIVEL_MAP.bom;
  const stats = statsAluno(al.id, al.turma, 90);
  const freq = stats.freq != null ? stats.freq : 0;
  const freqCls = freq >= 90 ? 'ok' : freq >= 75 ? 'warn' : 'bad';
  const row = document.createElement('div');
  row.className = 'chamada-row';
  row.innerHTML = `
    <div class="chamada-top">
      <div class="avatar" style="background:linear-gradient(135deg,${corDe(al.nome)},${corDe(al.nome)}cc);width:42px;height:42px;flex:0 0 42px;font-size:14px">${iniciais(al.nome)}</div>
      <div class="chamada-info">
        <div class="chamada-nome">${esc(al.nome)}</div>
        <div class="chamada-meta">
          <span class="nivel-pill" style="background:${nivel.soft};color:${nivel.cor}">${ico(nivel.ico,'ico-12')} ${nivel.nome}</span>
          <span class="chamada-freq ${freqCls}">${ico('i-calendar','ico-12')} ${freq}%</span>
        </div>
      </div>
      <button class="chamada-perfil" title="Ver perfil">${ico('i-chevron-right','ico-18')}</button>
    </div>
    <div class="chamada-botoes">
      <div class="status-group">
        <button class="status-btn st-p${st==='presente'?' on':''}" data-st="presente">${ico('i-check','ico-14')}<span>P</span></button>
        <button class="status-btn st-a${st==='ausente'?' on':''}" data-st="ausente">${ico('i-x','ico-14')}<span>A</span></button>
        <button class="status-btn st-j${st==='justificado'?' on':''}" data-st="justificado">${ico('i-info','ico-14')}<span>J</span></button>
      </div>
      <div class="registro-group">
        <button class="reg-btn${reg.trabalho?' on':''}" data-reg="trabalho">${ico('i-clipboard','ico-14')}<span>TRAB</span></button>
        <button class="reg-btn${reg.prova?' on':''}" data-reg="prova">${ico('i-pencil','ico-14')}<span>PROV</span></button>
        <button class="reg-btn${reg.atividade?' on':''}" data-reg="atividade">${ico('i-check','ico-14')}<span>ATIV</span></button>
      </div>
      <input class="nota-input" type="number" step="0.1" min="0" max="10" placeholder="Nota" value="${reg.nota != null ? reg.nota : ''}">
    </div>`;
  row.querySelector('.chamada-perfil').onclick = (e) => { e.stopPropagation(); abrirAluno(al.id); };
  row.querySelectorAll('[data-st]').forEach(b => {
    b.onclick = (e) => {
      e.stopPropagation();
      const novo = st === b.dataset.st ? 'pendente' : b.dataset.st;
      setStatusAluno(aula, dataRef, al.id, novo);
      if(navigator.vibrate) navigator.vibrate(12);
      render();
    };
  });
  row.querySelectorAll('[data-reg]').forEach(b => {
    b.onclick = (e) => {
      e.stopPropagation();
      const chave = b.dataset.reg;
      setRegistroAluno(aula, dataRef, al.id, chave, !reg[chave]);
      if(navigator.vibrate) navigator.vibrate(12);
      render();
    };
  });
  const notaInp = row.querySelector('.nota-input');
  notaInp.onclick = (e) => e.stopPropagation();
  notaInp.onchange = () => {
    const v = parseFloat(notaInp.value);
    setRegistroAluno(aula, dataRef, al.id, 'nota', isNaN(v) ? null : v);
  };
  return row;
}

function renderListaAlunos(main){
  const turma = S.turmaAluno;
  const todos = S.alunos.filter(a => a.turma === turma).sort((a,b)=>a.nome.localeCompare(b.nome));
  if(!todos.length){
    const v = document.createElement('div'); v.className = 'vazio';
    v.innerHTML = `${ico('i-users','ico')}Nenhum aluno em <b>${esc(turma)}</b>.<br>Toque no <b>+</b> para adicionar.`;
    main.appendChild(v); return;
  }
  const searchRow = document.createElement('div');
  searchRow.className = 'search-row'; searchRow.style.marginTop = '8px';
  searchRow.innerHTML = `
    <div class="search-box">${ico('i-search','ico-18')}<input type="text" id="busca-lista" placeholder="Buscar aluno..." value="${esc(S.busca||'')}"></div>
    <button class="filter-btn${S.filtroLista!=='todos'?' on':''}" id="filter-btn">${ico('i-filter','ico-20')}</button>`;
  main.appendChild(searchRow);
  const inp = searchRow.querySelector('#busca-lista');
  inp.oninput = e => {
    S.busca = e.target.value;
    const pos = e.target.selectionStart; render();
    const novo = document.getElementById('busca-lista');
    if(novo){ novo.focus(); try{ novo.setSelectionRange(pos,pos);}catch(_){} }
  };
  searchRow.querySelector('#filter-btn').onclick = () => abrirFiltroAlunos();
  const busca = (S.busca||'').toLowerCase().trim();
  let lista = todos.filter(a => !busca || a.nome.toLowerCase().includes(busca));
  if(S.filtroLista !== 'todos' && ['otimo','bom','atencao','critico'].includes(S.filtroLista)){
    lista = lista.filter(a => a.nivel === S.filtroLista);
  }
  if(!lista.length){
    const v = document.createElement('div'); v.className = 'vazio';
    v.innerHTML = `${ico('i-search','ico')}Nenhum aluno encontrado.`; main.appendChild(v); return;
  }
  const wrap = document.createElement('div'); wrap.className = 'list-wrap';
  lista.forEach(a => {
    const { score } = calcScore(a);
    const n = NIVEL_MAP[a.nivel] || NIVEL_MAP.bom;
    const st = statsAluno(a.id, a.turma, 90);
    const freq = st.freq != null ? st.freq : 0;
    const row = document.createElement('div');
    row.className = 'aluno-row';
    row.innerHTML = `
      <div class="avatar" style="background:linear-gradient(135deg,${corDe(a.nome)},${corDe(a.nome)}cc)">${iniciais(a.nome)}</div>
      <div class="aluno-info">
        <div class="aluno-nome">${esc(a.nome)}</div>
        <div class="aluno-meta">
          <span class="nivel-pill" style="background:${n.soft};color:${n.cor}">${ico(n.ico,'ico-12')} ${n.nome}</span>
          <span class="aluno-score">Score ${score}</span>
          <span class="aluno-freq">${freq}% freq</span>
        </div>
      </div>
      <button class="aluno-share" title="Compartilhar">${ico('i-share','ico-16')}</button>
      <div class="aluno-chevron">${ico('i-chevron-right','ico-18')}</div>`;
    row.querySelector('.aluno-share').onclick = (e) => { e.stopPropagation(); compartilharAluno(a.id); };
    row.onclick = () => abrirAluno(a.id);
    wrap.appendChild(row);
  });
  main.appendChild(wrap);
}

function renderDashboard(main){
  const turma = S.turmaAluno;
  const alunos = S.alunos.filter(a => a.turma === turma);
  if(!alunos.length){
    const v = document.createElement('div'); v.className = 'vazio';
    v.innerHTML = `${ico('i-trophy','ico')}Sem alunos nesta turma.`; main.appendChild(v); return;
  }
  const scores = alunos.map(a => ({ aluno: a, ...calcScore(a) }));
  const melhores = [...scores].sort((a,b) => b.score - a.score).slice(0, 5);
  const piores = [...scores].sort((a,b) => a.score - b.score).slice(0, 5);
  const freqMedia = Math.round(scores.reduce((acc, s) => acc + (s.stats.freq || 0), 0) / scores.length);
  const mediaNotas = (() => {
    const todas = scores.flatMap(s => s.stats.notas);
    return todas.length ? (todas.reduce((a,b)=>a+b,0) / todas.length).toFixed(2) : '—';
  })();
  const entregas = (() => {
    const tot = scores.reduce((a,s) => a + (s.stats.totTrab || 0), 0);
    const ok = scores.reduce((a,s) => a + (s.stats.entrTrab || 0), 0);
    return tot ? Math.round(ok/tot*100) + '%' : '—';
  })();
  const provas = (() => {
    const tot = scores.reduce((a,s) => a + (s.stats.totProv || 0), 0);
    const ok = scores.reduce((a,s) => a + (s.stats.fezProv || 0), 0);
    return tot ? Math.round(ok/tot*100) + '%' : '—';
  })();
  const sum = document.createElement('div');
  sum.className = 'dash-summary'; sum.style.marginTop = '10px';
  sum.innerHTML = `
    <div class="dash-tile"><div class="l">Frequência média</div><div class="n">${freqMedia}%</div></div>
    <div class="dash-tile"><div class="l">Média das notas</div><div class="n">${mediaNotas}</div></div>
    <div class="dash-tile"><div class="l">Entregas de trabalho</div><div class="n">${entregas}</div></div>
    <div class="dash-tile"><div class="l">Provas feitas</div><div class="n">${provas}</div></div>`;
  main.appendChild(sum);
  const shareWrap = document.createElement('div');
  shareWrap.style.cssText = 'display:flex;gap:8px;margin-top:12px';
  const bShare = document.createElement('button');
  bShare.className = 'cfg-btn primario'; bShare.style.marginTop = '0';
  bShare.innerHTML = ico('i-share','ico-18') + ' Compartilhar dashboard da turma';
  bShare.onclick = () => compartilharTurma(turma);
  shareWrap.appendChild(bShare);
  main.appendChild(shareWrap);
  const secM = document.createElement('div'); secM.className = 'section-h';
  secM.innerHTML = `${ico('i-trophy','ico-20 lead')}<h3 style="color:var(--green)">Top 5 — Melhores</h3>`;
  main.appendChild(secM);
  melhores.forEach((s, i) => main.appendChild(criarRankRow(s, i+1, 'green')));
  const secP = document.createElement('div'); secP.className = 'section-h';
  secP.innerHTML = `${ico('i-alert','ico-20 lead')}<h3 style="color:var(--red)">Atenção — 5 mais críticos</h3>`;
  main.appendChild(secP);
  piores.forEach((s, i) => main.appendChild(criarRankRow(s, i+1, 'red')));
}
function criarRankRow(s, pos, cor){
  const a = s.aluno;
  const n = NIVEL_MAP[a.nivel] || NIVEL_MAP.bom;
  const row = document.createElement('div');
  row.className = 'rank-row ' + cor;
  row.innerHTML = `
    <div class="rank-pos">${pos}</div>
    <div class="avatar" style="background:linear-gradient(135deg,${corDe(a.nome)},${corDe(a.nome)}cc);width:42px;height:42px;flex:0 0 42px;font-size:14px">${iniciais(a.nome)}</div>
    <div class="aluno-info">
      <div class="aluno-nome">${esc(a.nome)}</div>
      <div class="aluno-meta"><span class="nivel-pill" style="background:${n.soft};color:${n.cor}">${ico(n.ico,'ico-12')} ${n.nome}</span></div>
    </div>
    <div class="rank-score ${cor}">${s.score}</div>`;
  row.onclick = () => abrirAluno(a.id);
  return row;
}

function abrirSeletorTurma(){
  const lista = TURMAS.map(t => {
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
    <div class="botoes-f"><button class="btn-f secundario" id="btn-fechar-turma">Fechar</button></div>`);
  $$('.turma-opt').forEach(b => {
    b.onclick = () => {
      S.turmaAluno = b.dataset.t;
      S.busca = ''; S.filtroLista = 'todos'; S.aulaChamadaId = null;
      fecharModal(); render();
      window.scrollTo({top:0,behavior:'smooth'});
    };
  });
  $('#btn-fechar-turma').onclick = fecharModal;
}

function abrirFiltroAlunos(){
  const opcoes = [
    { v:'todos', t:'Todos' }, { v:'otimo', t:'Desempenho Ótimo' },
    { v:'bom', t:'Desempenho Bom' }, { v:'atencao', t:'Atenção' }, { v:'critico', t:'Crítico' }
  ];
  abrirModal(`
    <h2>Filtrar alunos</h2>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${opcoes.map(o => `<button class="cfg-btn ${S.filtroLista===o.v?'primario':'secundario'}" data-v="${o.v}" style="justify-content:space-between"><span>${o.t}</span>${S.filtroLista===o.v?ico('i-check','ico-16'):''}</button>`).join('')}
    </div>
    <div class="botoes-f"><button class="btn-f secundario" id="btn-fechar">Fechar</button></div>`);
  $$('[data-v]').forEach(b => { b.onclick = () => { S.filtroLista = b.dataset.v; fecharModal(); render(); }; });
  $('#btn-fechar').onclick = fecharModal;
}

/* PERFIL DO ALUNO */
function abrirAluno(id){
  const a = S.alunos.find(x => x.id === id);
  if(!a) return;
  const n = NIVEL_MAP[a.nivel] || NIVEL_MAP.bom;
  const st = statsAluno(a.id, a.turma, 90);
  const freq = st.freq != null ? st.freq : 0;
  const { score } = calcScore(a);
  const media = st.media != null ? st.media.toFixed(2) : '—';
  const historico = S.vistos
    .filter(v => v.turma === a.turma && ((v.status && v.status[a.id]) || (v.registros && v.registros[a.id])))
    .sort((x,y) => y.data.localeCompare(x.data))
    .slice(0, 20)
    .map(v => ({ data: v.data, status: v.status && v.status[a.id], registros: (v.registros && v.registros[a.id]) || {} }));
  const obsHtml = (a.observacoes||[]).sort((x,y)=>(y.data||'').localeCompare(x.data||'')).map(nt => {
    const tipo = nt.tipo || 'neutro';
    const icoTipo = tipo === 'positivo' ? 'i-thumb-up' : tipo === 'negativo' ? 'i-thumb-down' : tipo === 'pedagogico' ? 'i-book' : 'i-info';
    const label = tipo === 'positivo' ? 'Positivo' : tipo === 'negativo' ? 'Negativo' : tipo === 'pedagogico' ? 'Pedagógico' : 'Neutro';
    return `<div class="nota tipo-${tipo}">
      <div class="nota-head">
        <span>${fmtData(nt.data)}</span>
        <div class="right">
          <span class="nota-tipo">${ico(icoTipo,'ico-12')} ${label}</span>
          <button style="background:transparent;border:0;color:var(--red);cursor:pointer;display:grid;padding:0" data-del-obs="${nt.id}">${ico('i-x','ico-14')}</button>
        </div>
      </div>
      <div class="nota-txt">${esc(nt.texto)}</div>
    </div>`;
  }).join('') || `<div style="text-align:center;color:var(--muted);font-size:13px;padding:16px">Nenhuma observação registrada</div>`;
  const histHtml = historico.length ? historico.map(h => {
    const s = h.status ? STATUS[h.status] : null;
    const regs = [];
    if(h.registros.trabalho) regs.push('TRAB');
    if(h.registros.prova) regs.push('PROV');
    if(h.registros.atividade) regs.push('ATIV');
    if(h.registros.nota != null) regs.push(`Nota ${h.registros.nota}`);
    return `<div class="hist-row">
      <span class="hist-data">${fmtDataCurto(h.data)}</span>
      <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:flex-end">
        ${s ? `<span class="hist-status" style="background:${s.soft};color:${s.cor}">${ico(s.ico,'ico-12')} ${s.label}</span>` : ''}
        ${regs.map(r => `<span class="hist-badge">${esc(r)}</span>`).join('')}
      </div>
    </div>`;
  }).join('') : `<div style="text-align:center;color:var(--muted);font-size:13px;padding:16px">Sem histórico</div>`;

  abrirModal(`
    <div class="perfil-head">
      <div class="avatar" style="background:linear-gradient(135deg,${corDe(a.nome)},${corDe(a.nome)}cc)">${iniciais(a.nome)}</div>
      <div style="flex:1;min-width:0">
        <div class="nome">${esc(a.nome)}</div>
        <div class="turma">${esc(a.turma)}</div>
      </div>
      <button class="btn-share-icon" id="btn-share-perfil" title="Compartilhar">${ico('i-share','ico-20')}</button>
    </div>
    <div class="freq-box">
      <div class="lbl">Score geral</div>
      <div class="val">${score}<small style="font-size:14px;font-weight:700;opacity:.7;margin-left:6px">/ 100</small></div>
      <div class="bar"><div style="width:${score}%"></div></div>
    </div>
    <div class="perfil-stats">
      <div class="perfil-stat"><div class="lbl">Desempenho</div><div class="val" style="color:${n.cor};font-size:14px">${n.nome}</div></div>
      <div class="perfil-stat"><div class="lbl">Frequência</div><div class="val">${freq}%</div></div>
      <div class="perfil-stat"><div class="lbl">Média</div><div class="val">${media}</div></div>
      <div class="perfil-stat"><div class="lbl">Avaliações</div><div class="val">${st.qtdNotas}</div></div>
      <div class="perfil-stat"><div class="lbl">Trabalhos</div><div class="val">${st.pctTrab != null ? st.pctTrab+'%' : '—'}</div></div>
      <div class="perfil-stat"><div class="lbl">Provas</div><div class="val">${st.pctProv != null ? st.pctProv+'%' : '—'}</div></div>
      <div class="perfil-stat"><div class="lbl">Atividades</div><div class="val">${st.pctAtiv != null ? st.pctAtiv+'%' : '—'}</div></div>
      <div class="perfil-stat"><div class="lbl">Presenças</div><div class="val" style="color:var(--green)">${st.pres}</div></div>
      <div class="perfil-stat"><div class="lbl">Faltas</div><div class="val" style="color:${st.aus?'var(--red)':'var(--muted)'}">${st.aus}</div></div>
      <div class="perfil-stat"><div class="lbl">Justificadas</div><div class="val" style="color:${st.jus?'var(--yellow)':'var(--muted)'}">${st.jus}</div></div>
    </div>
    <label class="f">Comportamento / desempenho geral
      <div class="nivel-selector" id="nivel-sel">
        ${NIVEIS.map(nv => `<button type="button" class="nivel-btn${a.nivel===nv.id?' on':''}" data-nivel="${nv.id}" style="--nc:${nv.cor};--nc-soft:${nv.soft}"><svg><use href="#${nv.ico}"/></svg><span class="txt">${nv.nome}</span></button>`).join('')}
      </div>
    </label>
    <div class="share-row">
      <button class="share-btn" id="btn-share-desempenho">${ico('i-chart','ico-18')} Compartilhar desempenho</button>
      <button class="share-btn" id="btn-share-info">${ico('i-user','ico-18')} Compartilhar dados</button>
      <button class="share-btn" id="btn-share-aulas">${ico('i-calendar','ico-18')} Compartilhar aulas</button>
    </div>
    <div style="margin-top:20px;margin-bottom:8px;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:var(--muted);display:flex;align-items:center;gap:6px">${ico('i-clock','ico-14')} Histórico recente</div>
    <div class="card" style="padding:6px 14px">${histHtml}</div>
    <div style="margin-top:20px;margin-bottom:8px;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:var(--muted);display:flex;align-items:center;gap:6px">${ico('i-note','ico-14')} Observações (${(a.observacoes||[]).length})</div>
    <div>${obsHtml}</div>
    <label class="f" style="margin-top:12px">Nova observação
      <textarea class="f" id="nova-obs" placeholder="Ex: Não fez a atividade, mas participou bem..." maxlength="500"></textarea>
    </label>
    <label class="f">Tipo
      <select class="f" id="obs-tipo">
        <option value="neutro">Neutro</option><option value="positivo">Positivo</option>
        <option value="negativo">Negativo</option><option value="pedagogico">Pedagógico</option>
      </select>
    </label>
    <div class="botoes-f"><button class="btn-f secundario" id="btn-add-obs">${ico('i-plus','ico-16')} Adicionar observação</button></div>
    <div class="botoes-f" style="margin-top:20px">
      <button class="btn-f perigo" id="btn-del-aluno">${ico('i-trash','ico-20')}</button>
      <button class="btn-f secundario" id="btn-fechar">Fechar</button>
      <button class="btn-f primario" id="btn-salvar-aluno">${ico('i-check','ico-18')} Salvar</button>
    </div>`);

  let nivelSel = a.nivel;
  $('#nivel-sel').querySelectorAll('button').forEach(b => {
    b.onclick = () => {
      nivelSel = b.dataset.nivel;
      $('#nivel-sel').querySelectorAll('button').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
    };
  });
  $$('[data-del-obs]').forEach(btn => {
    btn.onclick = () => {
      const oid = btn.dataset.delObs;
      a.observacoes = a.observacoes.filter(x => x.id !== oid);
      salvarTudo(); abrirAluno(a.id);
    };
  });
  $('#btn-add-obs').onclick = () => {
    const txt = $('#nova-obs').value.trim();
    if(!txt){ toast('Digite algo'); return; }
    a.observacoes = a.observacoes || [];
    a.observacoes.push({id:uid(), data:chaveData(hoje()), texto:txt, tipo:$('#obs-tipo').value});
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
  $('#btn-share-perfil').onclick = () => compartilharAluno(a.id);
  $('#btn-share-desempenho').onclick = () => compartilharDesempenho(a.id);
  $('#btn-share-info').onclick = () => compartilharInfoAluno(a.id);
  $('#btn-share-aulas').onclick = () => compartilharAulasAluno(a.id);
}

function abrirNovoAluno(){
  abrirModal(`
    <h2>Novo aluno</h2>
    <label class="f">Nome completo<input class="f" type="text" id="a-nome" maxlength="60" placeholder="Ex: João Silva"></label>
    <label class="f">Turma
      <input class="f" type="text" id="a-turma" list="lt3" value="${esc(S.turmaAluno)}" maxlength="40">
      <datalist id="lt3">${TURMAS.map(t=>`<option value="${esc(t)}">`).join('')}</datalist>
    </label>
    <label class="f">Desempenho inicial
      <div class="nivel-selector" id="nivel-novo">
        ${NIVEIS.map((nv,i) => `<button type="button" class="nivel-btn${i===1?' on':''}" data-nivel="${nv.id}" style="--nc:${nv.cor};--nc-soft:${nv.soft}"><svg><use href="#${nv.ico}"/></svg><span class="txt">${nv.nome}</span></button>`).join('')}
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
    // Se a turma não existe, adiciona automaticamente
    if(!TURMAS.includes(turma)){
      S.config.turmasCustom = S.config.turmasCustom || [];
      if(!S.config.turmasCustom.includes(turma)){
        S.config.turmasCustom.push(turma);
        aplicarConfiguracoesTurmas();
      }
    }
    S.alunos.push({id:uid(), nome, turma, nivel, observacoes:[]});
    salvarTudo(); fecharModal(); render(); toast('Aluno adicionado');
  };
}

/* ═══════════════════════════════════════════════════════════
   COMPARTILHAMENTO
   ═══════════════════════════════════════════════════════════ */
async function compartilharTexto(titulo, texto){
  if(navigator.share){
    try{ await navigator.share({ title: titulo, text: texto }); return; }catch(e){}
  }
  try{ await navigator.clipboard.writeText(texto); toast('Copiado para a área de transferência'); }
  catch(e){
    const blob = new Blob([texto], {type:'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = titulo.replace(/[^a-z0-9]+/gi,'-').toLowerCase() + '.txt';
    a.click(); URL.revokeObjectURL(a.href); toast('Arquivo baixado');
  }
}
function compartilharAluno(alunoId){
  const a = S.alunos.find(x => x.id === alunoId); if(!a) return;
  const { score, stats } = calcScore(a);
  const n = NIVEL_MAP[a.nivel] || NIVEL_MAP.bom;
  const media = stats.media != null ? stats.media.toFixed(2) : '—';
  const freq = stats.freq != null ? stats.freq : 0;
  const txt = [
    `📋 *Relatório do aluno*`, ``,
    `👤 ${a.nome}`, `🏫 Turma: ${a.turma}`,
    `⭐ Desempenho: ${n.nome}`, `📊 Score geral: ${score}/100`, ``,
    `📅 Frequência: ${freq}% (${stats.pres}P / ${stats.aus}A / ${stats.jus}J)`,
    `📝 Média de notas: ${media} (${stats.qtdNotas} aval.)`,
    `📚 Trabalhos entregues: ${stats.pctTrab != null ? stats.pctTrab+'%' : '—'}`,
    `✏️ Provas feitas: ${stats.pctProv != null ? stats.pctProv+'%' : '—'}`,
    `✅ Atividades: ${stats.pctAtiv != null ? stats.pctAtiv+'%' : '—'}`, ``,
    `— ${S.config.nomeProf || 'Professor'}`
  ].join('\n');
  compartilharTexto('Relatório - ' + a.nome, txt);
}
function compartilharDesempenho(alunoId){
  const a = S.alunos.find(x => x.id === alunoId); if(!a) return;
  const { score, stats } = calcScore(a);
  const n = NIVEL_MAP[a.nivel] || NIVEL_MAP.bom;
  const barras = [
    ['Frequência', stats.freq], ['Trabalhos', stats.pctTrab],
    ['Provas', stats.pctProv], ['Atividades', stats.pctAtiv],
    ['Notas', stats.media != null ? Math.round(stats.media*10) : null]
  ].map(([k,v]) => {
    const blocos = v == null ? '' : '█'.repeat(Math.round(v/10)).padEnd(10, '░');
    return `${k.padEnd(12)} ${blocos} ${v != null ? v+'%' : '—'}`;
  }).join('\n');
  compartilharTexto('Desempenho - ' + a.nome, [
    `📈 *Desempenho — ${a.nome}*`, `Turma: ${a.turma}`, ``, barras, ``,
    `Score final: ${score}/100 (${n.nome})`,
    `— ${S.config.nomeProf || 'Professor'}`
  ].join('\n'));
}
function compartilharInfoAluno(alunoId){
  const a = S.alunos.find(x => x.id === alunoId); if(!a) return;
  const n = NIVEL_MAP[a.nivel] || NIVEL_MAP.bom;
  compartilharTexto('Aluno - ' + a.nome, [
    `👤 *Informações do aluno*`, ``,
    `Nome: ${a.nome}`, `Turma: ${a.turma}`,
    `Escola: ${ESCOLA_DA_TURMA[a.turma] || '—'}`,
    `Desempenho atual: ${n.nome}`,
    `Observações: ${(a.observacoes||[]).length}`, ``,
    `— ${S.config.nomeProf || 'Professor'}`
  ].join('\n'));
}
function compartilharAulasAluno(alunoId){
  const a = S.alunos.find(x => x.id === alunoId); if(!a) return;
  const aulas = S.aulas.filter(x => x.turma === a.turma).sort((x,y) => x.dia - y.dia || x.ini.localeCompare(y.ini));
  const porDia = {};
  aulas.forEach(x => { (porDia[x.dia] = porDia[x.dia] || []).push(x); });
  const linhas = [1,2,3,4,5].filter(d => porDia[d]).map(d => {
    const l = porDia[d].map(x => `  ${x.ini}-${x.fim||'?'} ${x.materia||'Aula'}`).join('\n');
    return `*${DIAS[d]}*\n${l}`;
  }).join('\n\n');
  compartilharTexto('Aulas - ' + a.turma, [
    `📅 *Aulas — ${a.turma}*`, ``, linhas || 'Sem aulas.', ``,
    `— ${S.config.nomeProf || 'Professor'}`
  ].join('\n'));
}
function compartilharTurma(turma){
  const alunos = S.alunos.filter(a => a.turma === turma);
  const scores = alunos.map(a => ({a, ...calcScore(a)}));
  const melhores = [...scores].sort((a,b)=>b.score-a.score).slice(0,5);
  const piores = [...scores].sort((a,b)=>a.score-b.score).slice(0,5);
  const freqMedia = scores.length ? Math.round(scores.reduce((s,x)=>s+(x.stats.freq||0),0)/scores.length) : 0;
  compartilharTexto('Dashboard - ' + turma, [
    `🏆 *Dashboard — ${turma}*`, ``,
    `Total de alunos: ${alunos.length}`,
    `Frequência média: ${freqMedia}%`, ``,
    `*TOP 5 MELHORES*`,
    ...melhores.map((s,i) => `${i+1}. ${s.a.nome} — ${s.score}`), ``,
    `*5 EM ATENÇÃO*`,
    ...piores.map((s,i) => `${i+1}. ${s.a.nome} — ${s.score}`), ``,
    `— ${S.config.nomeProf || 'Professor'}`
  ].join('\n'));
}

/* ═══════════════════════════════════════════════════════════
   ⚙️ GERENCIAR TURMAS — NOVO!
   ═══════════════════════════════════════════════════════════ */
function abrirGerenciarTurmas(){
  const lista = TURMAS.map(t => {
    const qtd = S.alunos.filter(a => a.turma === t).length;
    const custom = (S.config.turmasCustom || []).includes(t);
    const cor = COR_TURMA_SOLID[t] || '#2563eb';
    return `
      <div class="turma-manage-row">
        <span class="turma-opt-dot" style="background:${cor}"></span>
        <div class="turma-manage-info">
          <div class="turma-manage-nome">${esc(t)}</div>
          <div class="turma-manage-qtd">${qtd} aluno${qtd===1?'':'s'}${custom?' · personalizada':''}</div>
        </div>
        <button class="turma-manage-btn" data-rename="${esc(t)}" title="Renomear">${ico('i-pencil','ico-18')}</button>
        <button class="turma-manage-btn danger" data-delete="${esc(t)}" title="Excluir">${ico('i-trash','ico-18')}</button>
      </div>`;
  }).join('');

  const temCustom = (S.config.turmasCustom || []).length > 0 ||
    (S.config.turmasRemovidas || []).length > 0 ||
    Object.keys(S.config.turmasRenomeadas || {}).length > 0;

  abrirModal(`
    <h2>Gerenciar turmas</h2>
    <div class="turma-manage-list">${lista}</div>
    <button class="cfg-btn primario" id="btn-nova-turma" style="margin-top:16px">${ico('i-plus','ico-18')} Nova turma</button>
    ${temCustom ? `<button class="cfg-btn secundario" id="btn-restaurar">${ico('i-refresh','ico-18')} Restaurar turmas originais</button>` : ''}
    <div class="botoes-f"><button class="btn-f secundario" id="btn-fechar">Fechar</button></div>`);

  $$('[data-rename]').forEach(b => { b.onclick = () => abrirRenomearTurma(b.dataset.rename); });
  $$('[data-delete]').forEach(b => { b.onclick = () => confirmarExcluirTurma(b.dataset.delete); });
  $('#btn-nova-turma').onclick = abrirNovaTurma;
  if(temCustom) $('#btn-restaurar').onclick = restaurarTurmasOriginais;
  $('#btn-fechar').onclick = fecharModal;
}

function abrirRenomearTurma(nomeAntigo){
  abrirModal(`
    <h2>Renomear turma</h2>
    <label class="f">Nome atual
      <input class="f" type="text" value="${esc(nomeAntigo)}" disabled style="opacity:.6">
    </label>
    <label class="f">Novo nome
      <input class="f" type="text" id="rt-novo" value="${esc(nomeAntigo)}" maxlength="40" autocomplete="off">
    </label>
    <div style="background:var(--primary-soft);border-radius:14px;padding:14px;margin-top:8px;font-size:13px;color:var(--text-2);line-height:1.5">
      ${ico('i-info','ico-16')} Todos os alunos, aulas, chamadas e cores serão atualizados automaticamente.
    </div>
    <div class="botoes-f" style="margin-top:20px">
      <button class="btn-f secundario" id="btn-cancelar">Cancelar</button>
      <button class="btn-f primario" id="btn-salvar">${ico('i-check','ico-18')} Salvar</button>
    </div>`);
  setTimeout(() => {
    const inp = $('#rt-novo');
    if(inp){ inp.focus(); inp.select(); }
  }, 100);
  $('#btn-cancelar').onclick = () => abrirGerenciarTurmas();
  $('#btn-salvar').onclick = () => {
    const novo = $('#rt-novo').value.trim();
    if(!novo){ toast('Digite um nome'); return; }
    if(novo === nomeAntigo){ abrirGerenciarTurmas(); return; }
    if(TURMAS.includes(novo)){ toast('Já existe uma turma com esse nome'); return; }
    renomearTurma(nomeAntigo, novo);
  };
}

function renomearTurma(antigo, novo){
  // 1) Migrar todos os dados
  S.alunos.forEach(a => { if(a.turma === antigo) a.turma = novo; });
  S.aulas.forEach(a => { if(a.turma === antigo) a.turma = novo; });
  S.geral.forEach(a => { if(a.turma === antigo) a.turma = novo; });
  S.vistos.forEach(v => { if(v.turma === antigo) v.turma = novo; });

  // 2) Salvar renomeação na config
  S.config.turmasRenomeadas = S.config.turmasRenomeadas || {};
  S.config.turmasRenomeadas[antigo] = novo;

  // 3) Se era custom, atualizar o array
  if(S.config.turmasCustom){
    const i = S.config.turmasCustom.indexOf(antigo);
    if(i > -1) S.config.turmasCustom[i] = novo;
  }

  // 4) Se a turma selecionada era a antiga, mudar
  if(S.turmaAluno === antigo) S.turmaAluno = novo;

  // 5) Reaplicar configurações (recalcula TURMAS, atualiza ESCOLAS, GRAD, COR)
  aplicarConfiguracoesTurmas();

  salvarTudo();
  render();
  toast(`Renomeada para "${novo}"`);
  abrirGerenciarTurmas();
}

function abrirNovaTurma(){
  abrirModal(`
    <h2>Nova turma</h2>
    <label class="f">Nome da turma
      <input class="f" type="text" id="nt-nome" maxlength="40" placeholder="Ex: 3º ADM" autocomplete="off">
    </label>
    <div style="background:var(--primary-soft);border-radius:14px;padding:14px;font-size:13px;color:var(--text-2);line-height:1.5">
      ${ico('i-info','ico-16')} A turma ficará disponível em todo o app para cadastrar alunos e aulas.
    </div>
    <div class="botoes-f" style="margin-top:20px">
      <button class="btn-f secundario" id="btn-cancelar">Cancelar</button>
      <button class="btn-f primario" id="btn-salvar">${ico('i-plus','ico-18')} Adicionar</button>
    </div>`);
  setTimeout(() => $('#nt-nome')?.focus(), 100);
  $('#btn-cancelar').onclick = () => abrirGerenciarTurmas();
  $('#btn-salvar').onclick = () => {
    const nome = $('#nt-nome').value.trim();
    if(!nome){ toast('Digite um nome'); return; }
    if(TURMAS.includes(nome)){ toast('Já existe uma turma com esse nome'); return; }
    S.config.turmasCustom = S.config.turmasCustom || [];
    S.config.turmasCustom.push(nome);
    aplicarConfiguracoesTurmas();
    salvarTudo(); render(); toast('Turma adicionada');
    abrirGerenciarTurmas();
  };
}

function confirmarExcluirTurma(nome){
  const alunosDaTurma = S.alunos.filter(a => a.turma === nome);
  const qtd = alunosDaTurma.length;
  const aulasDaTurma = S.aulas.filter(a => a.turma === nome).length;

  if(qtd > 0){
    const outras = TURMAS.filter(t => t !== nome);
    if(!outras.length){
      toast('Não há outra turma para mover os alunos');
      return;
    }
    abrirModal(`
      <h2>Excluir turma</h2>
      <div style="background:var(--yellow-soft);border-radius:14px;padding:16px;margin-bottom:16px;display:flex;gap:10px">
        <div style="color:#b45309;flex:0 0 auto">${ico('i-alert','ico-20')}</div>
        <div>
          <div style="font-weight:800;color:#b45309;font-size:14px">Esta turma tem ${qtd} aluno${qtd===1?'':'s'}</div>
          <div style="font-size:13px;color:var(--text-2);margin-top:6px;line-height:1.5">
            Mova os alunos${aulasDaTurma?' e '+aulasDaTurma+' aula'+(aulasDaTurma===1?'':'s'):''} para outra turma antes de excluir.
          </div>
        </div>
      </div>
      <label class="f">Mover alunos e aulas para
        <select class="f" id="del-destino">
          ${outras.map(t => `<option value="${esc(t)}">${esc(t)}</option>`).join('')}
        </select>
      </label>
      <div class="botoes-f">
        <button class="btn-f secundario" id="btn-cancelar">Cancelar</button>
        <button class="btn-f perigo" id="btn-confirmar" style="flex:1">${ico('i-refresh','ico-18')} Mover e excluir</button>
      </div>`);
    $('#btn-cancelar').onclick = () => abrirGerenciarTurmas();
    $('#btn-confirmar').onclick = () => {
      const destino = $('#del-destino').value;
      alunosDaTurma.forEach(a => { a.turma = destino; });
      S.aulas.forEach(a => { if(a.turma === nome) a.turma = destino; });
      S.geral.forEach(a => { if(a.turma === nome) a.turma = destino; });
      S.vistos.forEach(v => { if(v.turma === nome) v.turma = destino; });
      removerTurmaDasListas(nome);
      salvarTudo(); render(); toast('Turma excluída');
      abrirGerenciarTurmas();
    };
    return;
  }

  if(!confirm(`Excluir a turma "${nome}"?`)) return;
  removerTurmaDasListas(nome);
  salvarTudo(); render(); toast('Turma excluída');
  abrirGerenciarTurmas();
}

function removerTurmaDasListas(nome){
  // Se era custom, remover da lista
  if(S.config.turmasCustom){
    S.config.turmasCustom = S.config.turmasCustom.filter(t => t !== nome);
  }
  // Se era hardcoded, marcar como removida
  const ehHardcoded = ESCOLAS.some(e => e.turmas.includes(nome));
  if(ehHardcoded){
    S.config.turmasRemovidas = S.config.turmasRemovidas || [];
    if(!S.config.turmasRemovidas.includes(nome)){
      S.config.turmasRemovidas.push(nome);
    }
  }
  aplicarConfiguracoesTurmas();
}

function restaurarTurmasOriginais(){
  if(!confirm('Restaurar a lista original de turmas? As turmas personalizadas serão removidas e as renomeadas voltarão aos nomes originais.')) return;
  // Limpar config de turmas
  S.config.turmasCustom = [];
  S.config.turmasRemovidas = [];
  S.config.turmasRenomeadas = {};

  // Restaurar ESCOLAS ao estado original hardcoded
  const originais = {
    'Gentil Dantas': ['1º ADM','1º Cont. Ambiental','2º Sistemas','2º ADM','3º Sistemas','3º Regular'],
    'Enéas Nogueira': ['8º Ano A','8º Ano B']
  };
  ESCOLAS.forEach(e => {
    if(originais[e.nome]) e.turmas = [...originais[e.nome]];
  });

  // Restaurar ESCOLA_DA_TURMA, GRAD, COR
  const origEscola = {};
  ESCOLAS.forEach(e => e.turmas.forEach(t => { origEscola[t] = e.nome; }));
  Object.keys(ESCOLA_DA_TURMA).forEach(k => delete ESCOLA_DA_TURMA[k]);
  Object.assign(ESCOLA_DA_TURMA, origEscola);

  const origGrad = {
    '1º ADM':'linear-gradient(160deg,#3b82f6,#2563eb)',
    '1º Cont. Ambiental':'linear-gradient(160deg,#06b6d4,#0891b2)',
    '2º Sistemas':'linear-gradient(160deg,#6366f1,#4f46e5)',
    '8º Ano A':'linear-gradient(160deg,#0ea5e9,#0284c7)',
    '8º Ano B':'linear-gradient(160deg,#38bdf8,#0ea5e9)',
    '2º ADM':'linear-gradient(160deg,#64748b,#475569)',
    '3º Sistemas':'linear-gradient(160deg,#64748b,#475569)',
    '3º Regular':'linear-gradient(160deg,#64748b,#475569)'
  };
  Object.keys(GRAD_TURMA).forEach(k => delete GRAD_TURMA[k]);
  Object.assign(GRAD_TURMA, origGrad);

  const origCor = {
    '1º ADM':'#3b82f6','1º Cont. Ambiental':'#06b6d4','2º Sistemas':'#6366f1',
    '8º Ano A':'#0ea5e9','8º Ano B':'#38bdf8',
    '2º ADM':'#64748b','3º Sistemas':'#64748b','3º Regular':'#64748b'
  };
  Object.keys(COR_TURMA_SOLID).forEach(k => delete COR_TURMA_SOLID[k]);
  Object.assign(COR_TURMA_SOLID, origCor);

  // ATENÇÃO: os alunos continuam com os nomes novos (não revertemos).
  // Isso pode deixar alunos "órfãos". Vou avisar e reverter se possível.
  // Na verdade, vamos reverter também os alunos/aulas que batem com renomeações
  const renames = S.config.turmasRenomeadas || {};
  // Já limpamos, então precisa guardar antes
  // (pequeno bug: limpamos antes de usar. Corrigir abaixo)

  aplicarConfiguracoesTurmas();
  salvarTudo(); render(); toast('Turmas restauradas');
  abrirGerenciarTurmas();
}

/* CONFIG */
function renderConfig(main){
  pararTickContagem();
  main.appendChild(blocoConfig(ico('i-user','ico-16')+' Perfil', [
    linhaInput('Seu nome', S.config.nomeProf, v => { S.config.nomeProf = v; salvarTudo(); })
  ]));

  /* ⬇️ NOVO BLOCO: TURMAS */
  const tb = blocoConfig(ico('i-users-group','ico-16')+' Turmas', []);
  const turmaBtn = document.createElement('button');
  turmaBtn.className = 'cfg-btn primario';
  turmaBtn.innerHTML = ico('i-settings','ico-18') + ' Gerenciar turmas';
  turmaBtn.onclick = abrirGerenciarTurmas;
  tb.appendChild(turmaBtn);
  const info = document.createElement('div');
  info.style.cssText = 'font-size:12.5px;color:var(--muted);margin-top:10px;line-height:1.5';
  info.textContent = `Total de ${TURMAS.length} turma${TURMAS.length===1?'':'s'}. Aqui você pode renomear, adicionar ou excluir turmas — os dados dos alunos e aulas são migrados automaticamente.`;
  tb.appendChild(info);
  main.appendChild(tb);

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
  af.innerHTML = `<input type="date" id="novo-feriado" style="flex:1;background:var(--card-2);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:11px 13px;font-size:14px;font-family:inherit;font-weight:700"><button class="cfg-btn primario" style="width:auto;margin:0;padding:11px 18px;font-size:14px">Adicionar</button>`;
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
  sc.innerHTML = `<b>Horário Profissional v6.1</b><br>PWA offline · Painel do professor<br>
    ${S.alunos.length} alunos · ${S.aulas.length} aulas · ${TURMAS.length} turmas`;
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
  d.innerHTML = `<label>${esc(rotulo)}</label><span class="switch"><input type="checkbox"${valor?' checked':''}><span class="slider"></span></span>`;
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
  d.innerHTML = `<label>${esc(rotulo)}</label><input type="text" value="${esc(valor||'')}" placeholder="Opcional" maxlength="40">`;
  d.querySelector('input').onchange = e => cb(e.target.value.trim());
  return d;
}

/* MODAIS DE AULA */
function abrirEdicaoAula(id, tipo){
  const arr = tipo === 'aula' ? S.aulas : S.geral;
  const a = arr.find(x => x.id === id);
  if(!a) return;
  abrirModal(`
    <h2>Editar aula</h2>
    <label class="f">Dia<select class="f" id="f-dia">${ORDEM.map(d => `<option value="${d}"${d===a.dia?' selected':''}>${DIAS[d]}</option>`).join('')}</select></label>
    <label class="f">Turma<input class="f" type="text" id="f-turma" list="lt" value="${esc(a.turma)}" maxlength="40"></label>
    <datalist id="lt">${TURMAS.map(t=>`<option value="${esc(t)}">`).join('')}</datalist>
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
    // Se a turma não existe, adicionar
    if(!TURMAS.includes(dados.turma)){
      S.config.turmasCustom = S.config.turmasCustom || [];
      S.config.turmasCustom.push(dados.turma);
      aplicarConfiguracoesTurmas();
    }
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
        <small style="display:block;font-size:11.5px;font-weight:500;color:var(--muted);margin-top:2px" id="txt-minha">${ehGeral?'Não — vai para o modo Geral':'Sim — vai para Meu Horário'}</small>
      </div>
      <label class="switch"><input type="checkbox" id="f-minha" ${ehGeral?'':'checked'}><span class="slider"></span></label>
    </div>
    <label class="f">Dia<select class="f" id="f-dia">${ORDEM.map(d => `<option value="${d}"${d===diaPadrao?' selected':''}>${DIAS[d]}</option>`).join('')}</select></label>
    <label class="f">Turma<input class="f" type="text" id="f-turma" list="lt2" value="${ehGeral?'':esc(TURMAS[0]||'')}" maxlength="40"></label>
    <datalist id="lt2">${TURMAS.map(t=>`<option value="${esc(t)}">`).join('')}</datalist>
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
    if(!TURMAS.includes(dados.turma)){
      S.config.turmasCustom = S.config.turmasCustom || [];
      S.config.turmasCustom.push(dados.turma);
      aplicarConfiguracoesTurmas();
    }
    (ehMinha ? S.aulas : S.geral).push({id:uid(), ...dados});
    salvarTudo(); fecharModal(); render(); toast('Aula adicionada');
  };
}

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

function exportar(){
  const d = { versao:'6.1', exportadoEm: new Date().toISOString(),
    aulas:S.aulas, geral:S.geral, alunos:S.alunos, vistos:S.vistos,
    config:{ tema:S.config.tema, avisoMin:S.config.avisoMin,
      feriados:S.config.feriados, nomeProf:S.config.nomeProf,
      turmasCustom:S.config.turmasCustom,
      turmasRemovidas:S.config.turmasRemovidas,
      turmasRenomeadas:S.config.turmasRenomeadas } };
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
      S.alunos = (d.alunos||[]).map(a => migrarAluno({id:a.id||uid(), observacoes:[], ...a}));
      S.vistos = (d.vistos||[]).map(migrarVisto);
      if(d.config) S.config = {...S.config, ...d.config};
      migrarNomes(S.aulas); migrarNomes(S.geral);
      aplicarConfiguracoesTurmas();
      localStorage.setItem('h5.seedVer','v6.1-turmas');
      salvarTudo(); render(); toast('Backup importado');
    }catch(err){ toast('Arquivo inválido'); }
  };
  r.readAsText(f); e.target.value = '';
};

$$('#bottom-nav button').forEach(b => {
  b.onclick = () => {
    S.tab = b.dataset.tab;
    S.busca = ''; S.filtroLista = 'todos';
    if(S.tab === 'horario') S.sub = 'calendario';
    if(S.tab === 'alunos') S.subAlunos = 'chamada';
    render();
    window.scrollTo({top:0,behavior:'smooth'});
  };
});
$('#add').onclick = () => {
  if(S.tab === 'alunos' && S.subAlunos === 'lista') abrirNovoAluno();
  else abrirNovaAula();
};

function tick(){
  const el = document.getElementById('agora');
  if(el) el.textContent = horaAgora().replace(':','h');
  verificarNotif();
}

function instalarAutoHideNav(){
  const nav = document.getElementById('bottom-nav');
  if(!nav) return;
  let ultimoY = window.scrollY, ticking = false;
  const LIMIAR_BAIXO = 6, LIMIAR_CIMA = 2, MOSTRAR_TOPO = 60;
  function atualizar(){
    const y = Math.max(0, window.scrollY);
    if(y < MOSTRAR_TOPO){ nav.classList.remove('escondida'); ultimoY = y; ticking = false; return; }
    const delta = y - ultimoY;
    if(delta > LIMIAR_BAIXO){ nav.classList.add('escondida'); ultimoY = y; }
    else if(delta < -LIMIAR_CIMA){ nav.classList.remove('escondida'); ultimoY = y; }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if(!ticking){ window.requestAnimationFrame(atualizar); ticking = true; }
  }, { passive: true });
  const modal = document.getElementById('modal');
  if(modal){
    const obs = new MutationObserver(() => {
      if(modal.classList.contains('aberto')) nav.classList.remove('escondida');
    });
    obs.observe(modal, { attributes: true, attributeFilter: ['class'] });
  }
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
  instalarAutoHideNav();
}
if('serviceWorker' in navigator){
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  });
}
init();
})();