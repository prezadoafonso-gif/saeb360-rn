/**
 * Saeb360 RN - Main JavaScript
 * Carrega dados, gráficos, mapa e busca
 */

let dadosConsolidados = null;
let escolasData = [];
let municipiosData = [];
let geoJsonData = null;
let mapInstance = null;

// ========================================
// DATA LOADING
// ========================================
async function loadData() {
  try {
    const [consolidado, escolas, municipios] = await Promise.all([
      fetch('assets/data/dados-consolidados.json').then(r => r.json()),
      fetch('assets/data/escolas_saeb2025.json').then(r => r.json()).catch(() => []),
      fetch('assets/data/municipios_saeb2025.json').then(r => r.json()).catch(() => [])
    ]);
    dadosConsolidados = consolidado;
    escolasData = escolas;
    municipiosData = municipios;
    
    renderHomeCharts();
    renderNews();
    renderDestaques();
    renderEtapasCards();
    initMap();
    initSearch();
    renderEquidadePreview();
  } catch (e) {
    console.error('Erro ao carregar dados:', e);
  }
}

// ========================================
// CHARTS - HOME
// ========================================
function renderHomeCharts() {
  if (!dadosConsolidados) return;
  
  // IDEB Evolution Chart
  const idebCtx = document.getElementById('chart-ideb-evolution');
  if (idebCtx) {
    const ai = dadosConsolidados.panorama_estado.ideb_historico_rede_publica.anos_iniciais;
    const af = dadosConsolidados.panorama_estado.ideb_historico_rede_publica.anos_finais;
    const em = dadosConsolidados.panorama_estado.ideb_historico_rede_publica.ensino_medio;
    
    new Chart(idebCtx, {
      type: 'line',
      data: {
        labels: ai.map(d => d.ano),
        datasets: [
          { label: 'Anos Iniciais (5º EF)', data: ai.map(d => d.ideb), borderColor: '#003366', backgroundColor: 'rgba(0,51,102,0.1)', fill: true, tension: 0.3, pointRadius: 5, pointHoverRadius: 7 },
          { label: 'Anos Finais (9º EF)', data: af.map(d => d.ideb), borderColor: '#ffcc00', backgroundColor: 'rgba(255,204,0,0.1)', fill: true, tension: 0.3, pointRadius: 5, pointHoverRadius: 7 },
          { label: 'Ensino Médio (3º EM)', data: em.map(d => d.ideb), borderColor: '#009639', backgroundColor: 'rgba(0,150,57,0.1)', fill: true, tension: 0.3, pointRadius: 5, pointHoverRadius: 7 }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top', labels: { font: { size: 12, family: 'Segoe UI' }, usePointStyle: true } },
          tooltip: { backgroundColor: '#003366', titleFont: { size: 13 }, bodyFont: { size: 12 }, padding: 12, cornerRadius: 8 }
        },
        scales: {
          y: { beginAtZero: false, min: 2, max: 7, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { size: 11 } } },
          x: { grid: { display: false }, ticks: { font: { size: 12 } } }
        }
      }
    });
  }
  
  // Abaixo do Básico Evolution Chart
  const abCtx = document.getElementById('chart-abaixo-basico');
  if (abCtx) {
    const ab = dadosConsolidados.equidade.evolucao_abaixo_basico_rede_publica;
    new Chart(abCtx, {
      type: 'bar',
      data: {
        labels: ab['5EF_LP'].map(d => d.ano),
        datasets: [
          { label: '5º EF - LP', data: ab['5EF_LP'].map(d => d.pct), backgroundColor: '#003366', borderRadius: 6 },
          { label: '5º EF - MT', data: ab['5EF_MT'].map(d => d.pct), backgroundColor: '#004d99', borderRadius: 6 },
          { label: '9º EF - LP', data: ab['9EF_LP'].map(d => d.pct), backgroundColor: '#cc3300', borderRadius: 6 },
          { label: '9º EF - MT', data: ab['9EF_MT'].map(d => d.pct), backgroundColor: '#e64d2e', borderRadius: 6 }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top', labels: { font: { size: 12 }, usePointStyle: true } },
          tooltip: { callbacks: { label: ctx => ctx.dataset.label + ': ' + ctx.raw + '%' } }
        },
        scales: {
          y: { beginAtZero: true, max: 60, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { callback: v => v + '%' } },
          x: { grid: { display: false } }
        }
      }
    });
  }
  
  // Equidade Gaps Chart
  const eqCtx = document.getElementById('chart-equidade-gaps');
  if (eqCtx) {
    const gaps = dadosConsolidados.equidade.gaps_simais_contextual_2025;
    new Chart(eqCtx, {
      type: 'bar',
      data: {
        labels: ['5º EF', '9º EF', '3º EM'],
        datasets: [
          { label: 'Gap Racial (LP)', data: [gaps['5EF'].racial_LP, gaps['9EF'].racial_LP, gaps['3EM'].racial_LP], backgroundColor: '#003366', borderRadius: 6 },
          { label: 'Gap Racial (MT)', data: [gaps['5EF'].racial_MT, gaps['9EF'].racial_MT, gaps['3EM'].racial_MT], backgroundColor: '#004d99', borderRadius: 6 },
          { label: 'Gap Gênero (LP)', data: [gaps['5EF'].genero_LP, gaps['9EF'].genero_LP, gaps['3EM'].genero_LP], backgroundColor: '#009639', borderRadius: 6 }
        ]
      },
      options: {
        responsive: true,
        indexAxis: 'y',
        plugins: { legend: { position: 'top' } },
        scales: { x: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } } }
      }
    });
  }
  
  // Padrões de Desempenho - Pizza para 5EF
  const padCtx = document.getElementById('chart-padroes-5ef');
  if (padCtx) {
    const pad5ef = dadosConsolidados.equidade.estadual_2025['5EF'];
    new Chart(padCtx, {
      type: 'doughnut',
      data: {
        labels: ['Abaixo do Básico', 'Básico', 'Adequado', 'Avançado'],
        datasets: [{
          data: [pad5ef.LP.Abaixo, pad5ef.LP.Basico, pad5ef.LP.Adequado, pad5ef.LP.Avancado],
          backgroundColor: ['#cc3300', '#ffcc00', '#009639', '#003366'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        cutout: '55%',
        plugins: {
          legend: { position: 'bottom', labels: { font: { size: 11 }, usePointStyle: true } },
          tooltip: { callbacks: { label: ctx => ctx.label + ': ' + ctx.raw + '%' } }
        }
      }
    });
  }
}

// ========================================
// NEWS
// ========================================
function renderNews() {
  if (!dadosConsolidados) return;
  const container = document.getElementById('news-container');
  if (!container) return;
  
  const news = dadosConsolidados.noticias_geradas.slice(0, 4);
  const keyTitle = currentLang === 'pt' ? 'titulo_pt' : currentLang === 'en' ? 'titulo_en' : 'titulo_es';
  const keyResumo = currentLang === 'pt' ? 'resumo_pt' : currentLang === 'en' ? 'resumo_en' : 'resumo_es';
  
  container.innerHTML = news.map(n => `
    <article class="news-card">
      <div class="news-card-header">
        <div class="news-card-date">${n.data}</div>
      </div>
      <div class="news-card-body">
        <h3>${n[keyTitle]}</h3>
        <p>${n[keyResumo]}</p>
      </div>
      <div class="news-card-footer">
        ${n.tags.map(tag => `<span class="news-tag">${tag}</span>`).join('')}
      </div>
    </article>
  `).join('');
}

// ========================================
// DESTAQUES
// ========================================
function renderDestaques() {
  if (!dadosConsolidados) return;
  const container = document.getElementById('destaques-container');
  if (!container) return;
  
  const destaques = dadosConsolidados.destaques_qualitativos.casos_estaduais_2025;
  container.innerHTML = destaques.map(d => `
    <div class="card">
      <div class="card-header">
        <span class="badge badge-destaque">${d.etapa}</span>
      </div>
      <div class="card-body">
        <h3>${d.titulo_pt}</h3>
        <p>${d.descricao_pt}</p>
        <div class="card-metric">
          <span class="card-metric-value up">${d.metrica}</span>
        </div>
        <div class="alert alert-success" style="margin-top:12px;margin-bottom:0;">
          <strong>Boa prática:</strong> ${d.pratica}
        </div>
      </div>
    </div>
  `).join('');
}

// ========================================
// ETAPAS CARDS
// ========================================
function renderEtapasCards() {
  const container = document.getElementById('etapas-container');
  if (!container) return;
  
  const etapas = [
    { key: 'alfa', badge: 'badge-alfa', icon: 'A' },
    { key: 'ai', badge: 'badge-ai', icon: '5' },
    { key: 'af', badge: 'badge-af', icon: '9' },
    { key: 'em', badge: 'badge-em', icon: '3' }
  ];
  
  container.innerHTML = etapas.map(e => `
    <div class="card">
      <div class="card-header">
        <span class="badge ${e.badge}">${e.icon}</span>
      </div>
      <div class="card-body">
        <h3 data-i18n="etapas.${e.key}.title">${t(`etapas.${e.key}.title`)}</h3>
        <p style="font-size:0.85rem;color:#666;margin-bottom:8px;">${t(`etapas.${e.key}.etapa`)}</p>
        <p data-i18n="etapas.${e.key}.desc">${t(`etapas.${e.key}.desc`)}</p>
      </div>
      <div class="card-footer">
        <a href="#" class="card-link" data-i18n="etapas.${e.key}.cta">${t(`etapas.${e.key}.cta`)} →</a>
      </div>
    </div>
  `).join('');
}

// ========================================
// EQUIDADE PREVIEW
// ========================================
function renderEquidadePreview() {
  const container = document.getElementById('equidade-preview');
  if (!container || !dadosConsolidados) return;
  
  const cards = [
    { key: 'racial', icon: '⚖️', value: '13.0 pts', label: '9º EF - LP (PPI vs Branco)' },
    { key: 'genero', icon: '♀️♂️', value: '+14.7 pts', label: '9º EF - LP (Fem vs Masc)' },
    { key: 'nse', icon: '📊', value: '40.1%', label: '9º EF - Alunos baixo NSE' },
    { key: 'territorial', icon: '🗺️', value: '-18.5 pts', label: '5º EF - Rural vs Urbano (LP)' }
  ];
  
  container.innerHTML = cards.map(c => `
    <div class="card">
      <div class="card-body" style="text-align:center;">
        <div style="font-size:2.5rem;margin-bottom:12px;">${c.icon}</div>
        <h3 data-i18n="equidade.cards.${c.key}.title">${t(`equidade.cards.${c.key}.title`)}</h3>
        <div class="card-metric" style="justify-content:center;">
          <span class="card-metric-value" style="font-size:1.8rem;">${c.value}</span>
        </div>
        <p style="font-size:0.8rem;color:#666;">${c.label}</p>
      </div>
    </div>
  `).join('');
}

// ========================================
// MAPA LEAFLET
// ========================================
async function initMap() {
  const mapEl = document.getElementById('map-rn');
  if (!mapEl) return;
  
  try {
    // GeoJSON dos municípios do RN
    const geoJsonUrl = 'https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-24-mun.json';
    const response = await fetch(geoJsonUrl);
    if (!response.ok) throw new Error('GeoJSON não carregado');
    geoJsonData = await response.json();
    
    mapInstance = L.map('map-rn').setView([-5.8, -36.5], 7);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(mapInstance);
    
    // Cor baseada em IDEB fictício para demonstração (substituir por dados reais)
    const colorScale = d => d > 5 ? '#009639' : d > 4 ? '#ffcc00' : d > 3 ? '#ff9900' : '#cc3300';
    
    L.geoJSON(geoJsonData, {
      style: feature => ({
        fillColor: colorScale(Math.random() * 6), // placeholder
        weight: 1,
        opacity: 1,
        color: '#003366',
        fillOpacity: 0.6
      }),
      onEachFeature: (feature, layer) => {
        const nome = feature.properties.name || feature.properties.nome;
        layer.bindPopup(`<strong>${nome}</strong><br>Clique para detalhes`);
        layer.on('click', () => {
          alert('Detalhes de ' + nome + ' (integração com dados em desenvolvimento)');
        });
      }
    }).addTo(mapInstance);
    
  } catch (e) {
    console.warn('Mapa não inicializado (fallback):', e);
    mapEl.innerHTML = '<div style="padding:40px;text-align:center;color:#666;"><p>Mapa interativo do RN</p><p>Carregue os dados GeoJSON para visualizar</p></div>';
  }
}

// ========================================
// SEARCH
// ========================================
function initSearch() {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;
  
  input.addEventListener('input', e => {
    const q = e.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (q.length < 3) { results.style.display = 'none'; return; }
    
    const matches = escolasData.filter(s => {
      const nome = (s.nome_escola || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const mun = (s.mun || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const cod = (s.cod_escola || '').toLowerCase();
      return nome.includes(q) || mun.includes(q) || cod.includes(q);
    }).slice(0, 10);
    
    if (matches.length === 0) {
      results.innerHTML = '<div class="search-result-item"><p>Nenhuma escola encontrada</p></div>';
    } else {
      results.innerHTML = matches.map(m => `
        <div class="search-result-item" onclick="selectEscola('${m.cod_escola}')">
          <h4>${m.nome_escola}</h4>
          <span>${m.mun} | ${m.rede} | ${m.etapa}</span>
        </div>
      `).join('');
    }
    results.style.display = 'block';
  });
  
  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !results.contains(e.target)) {
      results.style.display = 'none';
    }
  });
}

function selectEscola(cod) {
  const escola = escolasData.find(e => e.cod_escola === cod);
  if (!escola) return;
  
  const modal = document.getElementById('escola-modal');
  const body = document.getElementById('escola-modal-body');
  if (!modal || !body) return;
  
  body.innerHTML = `
    <h2>${escola.nome_escola}</h2>
    <p><strong>Código INEP:</strong> ${escola.cod_escola} | <strong>Município:</strong> ${escola.mun} | <strong>Rede:</strong> ${escola.rede} | <strong>Direc:</strong> ${escola.nome_direc}</p>
    <div class="card-grid" style="margin-top:20px;">
      <div class="card">
        <div class="card-body">
          <div class="card-metric-label">Língua Portuguesa</div>
          <div class="card-metric-value">${escola.lp_media || '-'}</div>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <div class="card-metric-label">Matemática</div>
          <div class="card-metric-value">${escola.mt_media || '-'}</div>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <div class="card-metric-label">Participação</div>
          <div class="card-metric-value">${escola.tx_particip || '-'}%</div>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <div class="card-metric-label">Etapa</div>
          <div class="card-metric-value">${escola.etapa || '-'}</div>
        </div>
      </div>
    </div>
    <div class="alert alert-info" style="margin-top:20px;">
      <strong>Diagnóstico:</strong> Ficha de diagnóstico completa em desenvolvimento. Integração com padrões de desempenho, proposições de intervenção e evolução histórica será disponibilizada na próxima versão.
    </div>
  `;
  modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('escola-modal');
  if (modal) modal.style.display = 'none';
}

// ========================================
// TABS
// ========================================
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('.tab-btn');
    const contents = tabGroup.parentElement.querySelectorAll('.tab-content');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        buttons.forEach(b => b.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const content = tabGroup.parentElement.querySelector(`.tab-content[data-tab="${target}"]`);
        if (content) content.classList.add('active');
      });
    });
  });
}

// ========================================
// MOBILE MENU
// ========================================
function toggleMobileMenu() {
  const nav = document.querySelector('.nav-container');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

// ========================================
// INIT
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  initTabs();
});

// Expose globals
window.selectEscola = selectEscola;
window.closeModal = closeModal;
window.toggleMobileMenu = toggleMobileMenu;
window.loadCharts = renderHomeCharts;
