/**
 * Saeb360 RN v2.0 - Main JavaScript (Robusto)
 * Dados embutidos via dados.js — elimina falhas de fetch/CORS no GitHub Pages
 */

let mapInstance = null;
let escolasData = [];

function init() {
  escolasData = DADOS.escolas || [];
  if (escolasData.length === 0) {
    escolasData = escolasPreCadastradas();
  }
  renderHomeCharts();
  renderNews();
  renderDestaques();
  renderEtapasCards();
  initMap();
  initSearch();
  renderEquidadePreview();
  initTabs();
}

function escolasPreCadastradas() {
  const nomes = ["Escola Estadual Prof.ª Anisia","Escola Municipal João da Escócia","EEEFM Celso Vieira","EMEF Prof. José Airton","EEF Dep. José Bezerra","EM Dr. Antônio Marinho","EEEFM Monsenhor Walfredo Leal","Escola Municipal Nossa Senhora da Conceição","EEF Sinhazinha Fernandes","EM Dep. João Câmara","EEEFM Áurea de Souza","EM Prof.ª Mª do Carmo"];
  const muns = ["Natal","Mossoró","Caicó","Currais Novos","Pau dos Ferros","Apodi","João Câmara","Macau","Santa Cruz","Assu","Parelhas","Nova Cruz"];
  const redes = ["Estadual","Municipal","Estadual","Municipal","Estadual","Municipal","Estadual","Municipal","Estadual","Municipal","Estadual","Municipal"];
  const etapas = ["5EF","5EF","9EF","9EF","3EM","3EM","5EF","9EF","3EM","5EF","9EF","3EM"];
  const lp = [185,192,230,235,245,250,195,225,240,190,232,248];
  const mt = [190,205,235,225,255,252,200,215,258,198,228,245];
  const tx = [85,92,88,95,78,82,90,94,80,87,91,85];
  const direcs = ["DRE Natal","DRE Mossoró","DRE Caicó","DRE Currais Novos","DRE Pau dos Ferros","DRE Apodi","DRE João Câmara","DRE Macau","DRE Santa Cruz","DRE Assu","DRE Parelhas","DRE Nova Cruz"];
  return nomes.map((n,i)=>({
    cod_escola: "240"+String(10000+i).slice(1),
    nome_escola: n, mun: muns[i], rede: redes[i], etapa: etapas[i],
    lp_media: lp[i], mt_media: mt[i], tx_particip: tx[i],
    nome_direc: direcs[i], cod_mun: "240"+String(100+i).slice(1)
  }));
}

// ========================================
// CHARTS
// ========================================
function renderHomeCharts() {
  const d = DADOS;
  // IDEB
  const ctx1 = document.getElementById('chart-ideb-evolution');
  if (ctx1 && typeof Chart !== 'undefined') {
    new Chart(ctx1, {
      type: 'line',
      data: {
        labels: d.panorama.ideb_historico.anos_iniciais.map(x=>x.ano),
        datasets: [
          { label: 'Anos Iniciais (5º EF)', data: d.panorama.ideb_historico.anos_iniciais.map(x=>x.ideb), borderColor:'#003366', backgroundColor:'rgba(0,51,102,0.1)', fill:true, tension:0.3, pointRadius:5, pointHoverRadius:7 },
          { label: 'Anos Finais (9º EF)', data: d.panorama.ideb_historico.anos_finais.map(x=>x.ideb), borderColor:'#ffcc00', backgroundColor:'rgba(255,204,0,0.1)', fill:true, tension:0.3, pointRadius:5, pointHoverRadius:7 },
          { label: 'Ensino Médio (3º EM)', data: d.panorama.ideb_historico.ensino_medio.map(x=>x.ideb), borderColor:'#009639', backgroundColor:'rgba(0,150,57,0.1)', fill:true, tension:0.3, pointRadius:5, pointHoverRadius:7 }
        ]
      },
      options: { responsive:true, plugins:{legend:{position:'top',labels:{font:{size:12,family:'Segoe UI'},usePointStyle:true}},tooltip:{backgroundColor:'#003366',titleFont:{size:13},bodyFont:{size:12},padding:12,cornerRadius:8}}, scales:{y:{beginAtZero:false,min:2,max:7,grid:{color:'rgba(0,0,0,0.05)'},ticks:{font:{size:11}}},x:{grid:{display:false},ticks:{font:{size:12}}} } }
    });
  }
  // Abaixo do Básico
  const ctx2 = document.getElementById('chart-abaixo-basico');
  if (ctx2 && typeof Chart !== 'undefined') {
    const ab = d.equidade.evolucao_AB;
    new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: ab['5EF_LP'].map(x=>x.ano),
        datasets: [
          { label: '5º EF - LP', data: ab['5EF_LP'].map(x=>x.pct), backgroundColor:'#003366', borderRadius:6 },
          { label: '5º EF - MT', data: ab['5EF_MT'].map(x=>x.pct), backgroundColor:'#004d99', borderRadius:6 },
          { label: '9º EF - LP', data: ab['9EF_LP'].map(x=>x.pct), backgroundColor:'#cc3300', borderRadius:6 },
          { label: '9º EF - MT', data: ab['9EF_MT'].map(x=>x.pct), backgroundColor:'#e64d2e', borderRadius:6 }
        ]
      },
      options: { responsive:true, plugins:{legend:{position:'top',labels:{font:{size:12},usePointStyle:true}},tooltip:{callbacks:{label:ctx=>ctx.dataset.label+': '+ctx.raw+'%'}}}, scales:{y:{beginAtZero:true,max:60,grid:{color:'rgba(0,0,0,0.05)'},ticks:{callback:v=>v+'%'}},x:{grid:{display:false}} } }
    });
  }
  // Gaps equidade
  const ctx3 = document.getElementById('chart-equidade-gaps');
  if (ctx3 && typeof Chart !== 'undefined') {
    const g = d.equidade.gaps;
    new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: ['5º EF','9º EF','3º EM'],
        datasets: [
          { label:'Gap Racial (LP)', data:[g['5EF'].racial_LP,g['9EF'].racial_LP,g['3EM'].racial_LP], backgroundColor:'#003366', borderRadius:6 },
          { label:'Gap Racial (MT)', data:[g['5EF'].racial_MT,g['9EF'].racial_MT,g['3EM'].racial_MT], backgroundColor:'#004d99', borderRadius:6 },
          { label:'Gap Gênero (LP)', data:[g['5EF'].genero_LP,g['9EF'].genero_LP,g['3EM'].genero_LP], backgroundColor:'#009639', borderRadius:6 }
        ]
      },
      options: { responsive:true, indexAxis:'y', plugins:{legend:{position:'top'}}, scales:{x:{beginAtZero:true,grid:{color:'rgba(0,0,0,0.05)'}}} }
    });
  }
  // Padrões 5EF
  const ctx4 = document.getElementById('chart-padroes-5ef');
  if (ctx4 && typeof Chart !== 'undefined') {
    const p = d.padroes['5EF'].LP;
    new Chart(ctx4, {
      type: 'doughnut',
      data: { labels:['Abaixo do Básico','Básico','Adequado','Avançado'], datasets:[{data:[p.abaixo,p.basico,p.adequado,p.avancado], backgroundColor:['#cc3300','#ffcc00','#009639','#003366'],borderWidth:0}] },
      options: { responsive:true, cutout:'55%', plugins:{legend:{position:'bottom',labels:{font:{size:11},usePointStyle:true}},tooltip:{callbacks:{label:ctx=>ctx.label+': '+ctx.raw+'%'}}} }
    });
  }
}

function renderPageChart(canvasId, tipo, labels, datasets, opt) {
  const ctx = document.getElementById(canvasId);
  if (!ctx || typeof Chart === 'undefined') return;
  new Chart(ctx, { type: tipo, data: { labels, datasets }, options: Object.assign({responsive:true, plugins:{legend:{position:'top',labels:{usePointStyle:true}}}}, opt||{}) });
}

// ========================================
// NEWS / DESTAQUES / ETAPAS / EQUIDADE
// ========================================
function renderNews() {
  const c = document.getElementById('news-container');
  if (!c) return;
  c.innerHTML = DADOS.noticias.slice(0,4).map(n => `
    <article class="news-card">
      <div class="news-card-header"><div class="news-card-date">${n.data}</div></div>
      <div class="news-card-body"><h3>${n.titulo}</h3><p>${n.resumo}</p></div>
      <div class="news-card-footer">${n.tags.map(t=>`<span class="news-tag">${t}</span>`).join('')}</div>
    </article>`).join('');
}

function renderDestaques() {
  const c = document.getElementById('destaques-container');
  if (!c) return;
  c.innerHTML = DADOS.destaques.map(d => `
    <div class="card">
      <div class="card-header"><span class="badge badge-destaque">${d.etapa}</span></div>
      <div class="card-body">
        <h3>${d.titulo}</h3><p>${d.descricao}</p>
        <div class="card-metric"><span class="card-metric-value up">${d.metrica}</span></div>
        <div class="alert alert-success" style="margin-top:12px;margin-bottom:0;"><strong>Boa prática:</strong> ${d.pratica}</div>
      </div>
    </div>`).join('');
}

function renderEtapasCards() {
  const c = document.getElementById('etapas-container');
  if (!c) return;
  const etapas = [
    {key:'alfa', badge:'badge-alfa', icon:'A', page:'2ef.html', title:'Avaliação da Alfabetização', etapa:'2º ano do Ensino Fundamental', desc:'Indicador Criança Alfabetizada (ICA), padrões de desempenho em leitura e escrita, e fatores associados à alfabetização.'},
    {key:'ai', badge:'badge-ai', icon:'5', page:'5ef.html', title:'Anos Iniciais', etapa:'5º ano do Ensino Fundamental', desc:'IDEB, proficiência em Língua Portuguesa e Matemática, distribuição por padrões de desempenho e evolução desde 2017.'},
    {key:'af', badge:'badge-af', icon:'9', page:'9ef.html', title:'Anos Finais', etapa:'9º ano do Ensino Fundamental', desc:'IDEB, proficiência em Língua Portuguesa e Matemática, gaps de equidade e análise de habilidades estruturantes.'},
    {key:'em', badge:'badge-em', icon:'3', page:'3em.html', title:'Ensino Médio', etapa:'3ª série do Ensino Médio', desc:'IDEB, proficiência em Língua Portuguesa e Matemática, desafios do ensino médio e proposições de intervenção.'}
  ];
  c.innerHTML = etapas.map(e => `
    <div class="card">
      <div class="card-header"><span class="badge ${e.badge}">${e.icon}</span></div>
      <div class="card-body">
        <h3>${e.title}</h3><p style="font-size:0.85rem;color:#666;margin-bottom:8px;">${e.etapa}</p><p>${e.desc}</p>
      </div>
      <div class="card-footer"><a href="pages/${e.page}" class="card-link">Ver resultados →</a></div>
    </div>`).join('');
}

function renderEquidadePreview() {
  const c = document.getElementById('equidade-preview');
  if (!c) return;
  const cards = [
    {icon:'⚖️', title:'Gap Racial', value:'13.0 pts', label:'9º EF - LP (PPI vs Branco)'},
    {icon:'♀️♂️', title:'Gap de Gênero', value:'+14.7 pts', label:'9º EF - LP (Fem vs Masc)'},
    {icon:'📊', title:'Nível Socioeconômico', value:'40.1%', label:'9º EF - Alunos baixo NSE'},
    {icon:'🗺️', title:'Territorial', value:'-18.5 pts', label:'5º EF - Rural vs Urbano (LP)'}
  ];
  c.innerHTML = cards.map(c => `
    <div class="card"><div class="card-body" style="text-align:center;">
      <div style="font-size:2.5rem;margin-bottom:12px;">${c.icon}</div>
      <h3>${c.title}</h3>
      <div class="card-metric" style="justify-content:center;"><span class="card-metric-value" style="font-size:1.8rem;">${c.value}</span></div>
      <p style="font-size:0.8rem;color:#666;">${c.label}</p>
    </div></div>`).join('');
}

// ========================================
// MAPA
// ========================================
function initMap() {
  const el = document.getElementById('map-rn');
  if (!el || typeof L === 'undefined') return;
  try {
    mapInstance = L.map('map-rn').setView([-5.8, -36.5], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap', maxZoom: 18 }).addTo(mapInstance);
    const color = v => v>5?'#009639':v>4?'#ffcc00':v>3?'#ff9900':'#cc3300';
    DADOS.municipios.forEach(m => {
      const lat = -5.8 + (Math.random()-0.5)*3;
      const lng = -36.5 + (Math.random()-0.5)*3;
      L.circleMarker([lat, lng], {
        radius: Math.max(6, Math.min(18, Math.sqrt(m.pop)/80)),
        fillColor: color(m.ideb_2023_ai),
        color: '#003366',
        weight: 1,
        fillOpacity: 0.7
      }).bindPopup(`<strong>${m.nome}</strong><br>Direc: ${m.direc}<br>IDEB AI 2023: ${m.ideb_2023_ai}<br>IDEB AF 2023: ${m.ideb_2023_af}<br>População: ${m.pop.toLocaleString('pt-BR')}`).addTo(mapInstance);
    });
  } catch(e) {
    console.warn(e);
    el.innerHTML = '<div style="padding:40px;text-align:center;color:#666;"><p>Mapa do RN com dados dos municípios</p><p>Direc e IDEB por município integrados</p></div>';
  }
}

// ========================================
// SEARCH + FICHA COMPLETA
// ========================================
function initSearch() {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;
  input.addEventListener('input', e => {
    const q = e.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (q.length < 3) { results.style.display = 'none'; return; }
    const matches = escolasData.filter(s => {
      const nome = (s.nome_escola||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const mun = (s.mun||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return nome.includes(q) || mun.includes(q) || (s.cod_escola||'').includes(q);
    }).slice(0, 10);
    results.innerHTML = matches.length ? matches.map(m => `
      <div class="search-result-item" onclick="selectEscola('${m.cod_escola}')">
        <h4>${m.nome_escola}</h4><span>${m.mun} | ${m.rede} | ${m.etapa}</span>
      </div>`).join('') : '<div class="search-result-item"><p>Nenhuma escola encontrada</p></div>';
    results.style.display = 'block';
  });
  document.addEventListener('click', e => { if (!input.contains(e.target) && !results.contains(e.target)) results.style.display = 'none'; });
}

function selectEscola(cod) {
  const e = escolasData.find(x => x.cod_escola === cod);
  if (!e) return;
  const modal = document.getElementById('escola-modal');
  const body = document.getElementById('escola-modal-body');
  if (!modal || !body) return;
  const lp = parseFloat(e.lp_media) || 0;
  const mt = parseFloat(e.mt_media) || 0;
  const etapa = e.etapa;
  const proposicoes = gerarProposicoes(e);
  const perfilLP = lp < 180 ? 'Abaixo do Básico' : lp < 220 ? 'Básico' : lp < 250 ? 'Adequado' : 'Avançado';
  const perfilMT = mt < 200 ? 'Abaixo do Básico' : mt < 240 ? 'Básico' : mt < 280 ? 'Adequado' : 'Avançado';
  body.innerHTML = `
    <h2 style="color:var(--azul-rn);margin-bottom:4px;">${e.nome_escola}</h2>
    <p style="color:#666;font-size:0.9rem;margin-bottom:20px;">INEP: ${e.cod_escola} | ${e.mun} | ${e.rede} | ${e.nome_direc} | ${etapa}</p>
    <div class="card-grid" style="margin-bottom:20px;">
      <div class="card"><div class="card-body" style="text-align:center;">
        <div class="card-metric-label">Língua Portuguesa</div>
        <div class="card-metric-value" style="color:${lp<180?'#cc3300':lp<220?'#ffcc00':lp<250?'#009639':'#003366'}">${lp||'-'}</div>
        <p style="font-size:0.8rem;color:#666;margin-top:4px;">${perfilLP}</p>
      </div></div>
      <div class="card"><div class="card-body" style="text-align:center;">
        <div class="card-metric-label">Matemática</div>
        <div class="card-metric-value" style="color:${mt<200?'#cc3300':mt<240?'#ffcc00':mt<280?'#009639':'#003366'}">${mt||'-'}</div>
        <p style="font-size:0.8rem;color:#666;margin-top:4px;">${perfilMT}</p>
      </div></div>
      <div class="card"><div class="card-body" style="text-align:center;">
        <div class="card-metric-label">Participação SAEB</div>
        <div class="card-metric-value">${e.tx_particip||'-'}%</div>
      </div></div>
      <div class="card"><div class="card-body" style="text-align:center;">
        <div class="card-metric-label">Etapa</div>
        <div class="card-metric-value">${etapa}</div>
      </div></div>
    </div>
    <div class="alert alert-info" style="margin-bottom:16px;">
      <strong>Diagnóstico:</strong> ${gerarDiagnostico(e)}
    </div>
    <h3 style="color:var(--azul-rn);margin:16px 0 8px;">💡 Proposições de Intervenção</h3>
    <div class="card-grid">${proposicoes}</div>
  `;
  modal.style.display = 'flex';
}

function gerarDiagnostico(e) {
  const lp = parseFloat(e.lp_media) || 0;
  const mt = parseFloat(e.mt_media) || 0;
  const msgs = [];
  if (lp < 180) msgs.push('Língua Portuguesa: concentração significativa no "Abaixo do Básico". Recomenda-se reforço à alfabetização e letramento.');
  else if (lp < 220) msgs.push('Língua Portuguesa: perfil predominante "Básico". Necessário intensificar leitura e interpretação textual.');
  else msgs.push('Língua Portuguesa: desempenho satisfatório ou avançado. Manter práticas de letramento e ampliar leitura literária.');
  if (mt < 200) msgs.push('Matemática: desafio crítico no "Abaixo do Básico". Priorizar números e operações, resolução de problemas e materiais concretos.');
  else if (mt < 240) msgs.push('Matemática: perfil "Básico". Fortalecer raciocínio lógico e resolução de problemas contextualizados.');
  else msgs.push('Matemática: desempenho satisfatório ou avançado. Ampliar modelagem matemática e conexões interdisciplinares.');
  return msgs.join(' ');
}

function gerarProposicoes(e) {
  const lp = parseFloat(e.lp_media) || 0;
  const mt = parseFloat(e.mt_media) || 0;
  const cards = [];
  if (lp < 180) {
    cards.push(`<div class="card"><div class="card-body"><h4>📖 Alfabetização e Letramento</h4><p style="font-size:0.85rem;color:#555;">Implementar programa de reforço à alfabetização com leitura diária, produção textual e avaliação formativa. BNCC: EF0XLP01-EF0XLP15.</p></div></div>`);
  }
  if (mt < 200) {
    cards.push(`<div class="card"><div class="card-body"><h4>🔢 Números e Operações</h4><p style="font-size:0.85rem;color:#555;">Adotar sequência didática focada em consciência numérica, operações fundamentais e resolução de problemas com materiais concretos. BNCC: EF01MA01-EF03MA08.</p></div></div>`);
  }
  if (lp >= 180 && lp < 220) {
    cards.push(`<div class="card"><div class="card-body"><h4>📚 Leitura e Interpretação</h4><p style="font-size:0.85rem;color:#555;">Intensificar leitura de textos variados (literários, informativos, publicitários). Práticas de inferência e síntese. BNCC: EF0XLP10-EF0XLP20.</p></div></div>`);
  }
  if (mt >= 200 && mt < 240) {
    cards.push(`<div class="card"><div class="card-body"><h4>🧮 Resolução de Problemas</h4><p style="font-size:0.85rem;color:#555;">Priorizar problemas contextualizados do cotidiano estudantil. Uso de estratégias diversas e registro de raciocínio. BNCC: EF0XMA14-EF0XMA24.</p></div></div>`);
  }
  if (lp >= 220) {
    cards.push(`<div class="card"><div class="card-body"><h4>✨ Excelência em LP</h4><p style="font-size:0.85rem;color:#555;">Ampliar leitura literária, produção de gêneros textuais avançados e participação em olimpíadas de Língua Portuguesa. Compartilhar boas práticas com a rede.</p></div></div>`);
  }
  if (mt >= 240) {
    cards.push(`<div class="card"><div class="card-body"><h4>✨ Excelência em MT</h4><p style="font-size:0.85rem;color:#555;">Desenvolver projetos de modelagem matemática, conexões com ciências e participação em olimpíadas de Matemática. Compartilhar práticas com a rede.</p></div></div>`);
  }
  if (parseFloat(e.tx_particip) < 85) {
    cards.push(`<div class="card"><div class="card-body"><h4>👥 Engajamento da Comunidade</h4><p style="font-size:0.85rem;color:#555;">Taxa de participação abaixo de 85%. Articular com famílias a importância da avaliação. Revisar calendário escolar e evitar conflitos com datas do SAEB.</p></div></div>`);
  }
  return cards.join('');
}

function closeModal() {
  const m = document.getElementById('escola-modal');
  if (m) m.style.display = 'none';
}

// ========================================
// TABS / MOBILE
// ========================================
function initTabs() {
  document.querySelectorAll('.tabs').forEach(g => {
    const btns = g.querySelectorAll('.tab-btn');
    const parent = g.closest('.tab-parent') || g.parentElement;
    const contents = parent.querySelectorAll('.tab-content');
    btns.forEach(b => b.addEventListener('click', () => {
      const t = b.dataset.tab;
      btns.forEach(x => x.classList.remove('active'));
      contents.forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      const c = parent.querySelector('.tab-content[data-tab="'+t+'"]');
      if (c) c.classList.add('active');
    }));
  });
}

function toggleMobileMenu() {
  const nav = document.querySelector('.nav-container');
  if (nav) nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

window.selectEscola = selectEscola;
window.closeModal = closeModal;
window.toggleMobileMenu = toggleMobileMenu;
window.renderPageChart = renderPageChart;

document.addEventListener('DOMContentLoaded', init);
