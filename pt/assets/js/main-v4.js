/**
 * Saeb360 RN v4.0 - Main JavaScript
 * Correções: mapa com círculos proporcionais, gráficos com limites, busca por DIREC,
 * notícias como páginas, destaques com escola/DIREC, diagnóstico detalhado.
 */

(function() {
  'use strict';

  let escolasData = [];
  let municipiosData = [];
  let geojsonData = null;
  let mapInstance = null;
  let charts = {};
  let selectedDIREC = '';

  const CORES = {
    abaixo: '#e74c3c', basico: '#f39c12', adequado: '#27ae60', avancado: '#2980b9',
    lp: '#003366', mt: '#ffcc00', primario: '#003366', secundario: '#ffcc00', terciario: '#009639'
  };

  // ===================== INICIALIZAÇÃO =====================
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof carregarDados === 'function') {
      carregarDados().then(function() {
        escolasData = window.DADOS.escolas || [];
        municipiosData = window.DADOS.municipios || [];
        geojsonData = window.DADOS.geojson;
        init();
      }).catch(function(e) {
        console.warn('Erro ao carregar dados, usando fallback', e);
        escolasData = window.DADOS.escolas || [];
        municipiosData = window.DADOS.municipios || [];
        init();
      });
    } else {
      init();
    }
  });

  function init() {
    renderHomeCharts();
    renderNews();
    renderDestaques();
    renderEtapasCards();
    initMap();
    initSearch();
    renderEquidadePreview();
    renderConceitos();
    renderRedeCharts();
    renderDIRECSelect();
    initTabs();
    initModals();
    updatePanoramaNumbers();
  }

  function updatePanoramaNumbers() {
    var nEsc = escolasData.length || 1921;
    var nMun = municipiosData.length || 167;
    var els = document.querySelectorAll('.panorama-number');
    if (els.length >= 3) {
      els[0].textContent = nEsc.toLocaleString('pt-BR');
      els[1].textContent = nMun.toLocaleString('pt-BR');
      els[2].textContent = '16';
    }
  }

  // ===================== GRÁFICOS =====================
  function renderHomeCharts() {
    var d = window.DADOS || {};
    var pan = d.panorama || {};
    var ideb = pan.ideb || {};
    var prof = pan.prof || {};
    var ica = pan.ica || {};

    // IDEB AI
    if (document.getElementById('chart-ideb-ai')) {
      var ctx1 = document.getElementById('chart-ideb-ai').getContext('2d');
      var ai = ideb.ai || [];
      charts.idebAI = new Chart(ctx1, {
        type: 'line',
        data: {
          labels: ai.map(function(x){return x.ano;}),
          datasets: [
            {label:'IDEB', data:ai.map(function(x){return x.ideb;}), borderColor:CORES.primario, backgroundColor:'rgba(0,51,102,0.08)', fill:true, tension:0.3, pointRadius:4, pointHoverRadius:6},
            {label:'Meta PNE (1º ciclo)', data:ai.map(function(x){return x.meta;}), borderColor:CORES.secundario, borderDash:[5,5], pointRadius:0, fill:false}
          ]
        },
        options: {
          responsive:true, maintainAspectRatio:false,
          plugins: {title:{display:false}, legend:{position:'bottom', labels:{boxWidth:12, font:{size:11}}}, tooltip:{mode:'index', intersect:false}},
          scales: {y:{min:3, max:7, title:{display:true, text:'IDEB (0-10)', font:{size:11}}}, x:{grid:{display:false}}}
        }
      });
    }

    // IDEB AF
    if (document.getElementById('chart-ideb-af')) {
      var ctx2 = document.getElementById('chart-ideb-af').getContext('2d');
      var af = ideb.af || [];
      charts.idebAF = new Chart(ctx2, {
        type: 'line',
        data: {
          labels: af.map(function(x){return x.ano;}),
          datasets: [
            {label:'IDEB', data:af.map(function(x){return x.ideb;}), borderColor:CORES.primario, backgroundColor:'rgba(0,51,102,0.08)', fill:true, tension:0.3, pointRadius:4},
            {label:'Meta PNE (1º ciclo)', data:af.map(function(x){return x.meta;}), borderColor:CORES.secundario, borderDash:[5,5], pointRadius:0, fill:false}
          ]
        },
        options: {
          responsive:true, maintainAspectRatio:false,
          plugins: {title:{display:false}, legend:{position:'bottom', labels:{boxWidth:12, font:{size:11}}}},
          scales: {y:{min:2, max:6, title:{display:true, text:'IDEB (0-10)', font:{size:11}}}, x:{grid:{display:false}}}
        }
      });
    }

    // IDEB EM
    if (document.getElementById('chart-ideb-em')) {
      var ctx3 = document.getElementById('chart-ideb-em').getContext('2d');
      var em = ideb.em || [];
      charts.idebEM = new Chart(ctx3, {
        type: 'line',
        data: {
          labels: em.map(function(x){return x.ano;}),
          datasets: [
            {label:'IDEB', data:em.map(function(x){return x.ideb;}), borderColor:CORES.primario, backgroundColor:'rgba(0,51,102,0.08)', fill:true, tension:0.3, pointRadius:4},
            {label:'Meta PNE (1º ciclo)', data:em.map(function(x){return x.meta;}), borderColor:CORES.secundario, borderDash:[5,5], pointRadius:0, fill:false}
          ]
        },
        options: {
          responsive:true, maintainAspectRatio:false,
          plugins: {title:{display:false}, legend:{position:'bottom', labels:{boxWidth:12, font:{size:11}}}},
          scales: {y:{min:2, max:5, title:{display:true, text:'IDEB (0-10)', font:{size:11}}}, x:{grid:{display:false}}}
        }
      });
    }

    // Proficiência 5EF
    if (document.getElementById('chart-prof-5ef')) {
      var ctx4 = document.getElementById('chart-prof-5ef').getContext('2d');
      var p5 = prof['5EF'] || {LP:[],MT:[]};
      charts.prof5 = new Chart(ctx4, {
        type: 'line',
        data: {
          labels: p5.LP.map(function(x){return x.a;}),
          datasets: [
            {label:'Língua Portuguesa', data:p5.LP.map(function(x){return x.p;}), borderColor:CORES.lp, backgroundColor:'rgba(0,51,102,0.06)', fill:true, tension:0.3, pointRadius:3},
            {label:'Matemática', data:p5.MT.map(function(x){return x.p;}), borderColor:CORES.mt, backgroundColor:'rgba(255,204,0,0.06)', fill:true, tension:0.3, pointRadius:3}
          ]
        },
        options: {
          responsive:true, maintainAspectRatio:false,
          plugins: {title:{display:false}, legend:{position:'bottom', labels:{boxWidth:12, font:{size:11}}}},
          scales: {y:{min:150, max:250, title:{display:true, text:'Escala SAEB', font:{size:11}}}, x:{grid:{display:false}}}
        }
      });
    }

    // Proficiência 9EF
    if (document.getElementById('chart-prof-9ef')) {
      var ctx5 = document.getElementById('chart-prof-9ef').getContext('2d');
      var p9 = prof['9EF'] || {LP:[],MT:[]};
      charts.prof9 = new Chart(ctx5, {
        type: 'line',
        data: {
          labels: p9.LP.map(function(x){return x.a;}),
          datasets: [
            {label:'Língua Portuguesa', data:p9.LP.map(function(x){return x.p;}), borderColor:CORES.lp, backgroundColor:'rgba(0,51,102,0.06)', fill:true, tension:0.3, pointRadius:3},
            {label:'Matemática', data:p9.MT.map(function(x){return x.p;}), borderColor:CORES.mt, backgroundColor:'rgba(255,204,0,0.06)', fill:true, tension:0.3, pointRadius:3}
          ]
        },
        options: {
          responsive:true, maintainAspectRatio:false,
          plugins: {title:{display:false}, legend:{position:'bottom', labels:{boxWidth:12, font:{size:11}}}},
          scales: {y:{min:200, max:280, title:{display:true, text:'Escala SAEB', font:{size:11}}}, x:{grid:{display:false}}}
        }
      });
    }

    // Proficiência 3EM
    if (document.getElementById('chart-prof-3em')) {
      var ctx6 = document.getElementById('chart-prof-3em').getContext('2d');
      var p3 = prof['3EM'] || {LP:[],MT:[]};
      charts.prof3 = new Chart(ctx6, {
        type: 'line',
        data: {
          labels: p3.LP.map(function(x){return x.a;}),
          datasets: [
            {label:'Língua Portuguesa', data:p3.LP.map(function(x){return x.p;}), borderColor:CORES.lp, backgroundColor:'rgba(0,51,102,0.06)', fill:true, tension:0.3, pointRadius:3},
            {label:'Matemática', data:p3.MT.map(function(x){return x.p;}), borderColor:CORES.mt, backgroundColor:'rgba(255,204,0,0.06)', fill:true, tension:0.3, pointRadius:3}
          ]
        },
        options: {
          responsive:true, maintainAspectRatio:false,
          plugins: {title:{display:false}, legend:{position:'bottom', labels:{boxWidth:12, font:{size:11}}}},
          scales: {y:{min:220, max:300, title:{display:true, text:'Escala SAEB', font:{size:11}}}, x:{grid:{display:false}}}
        }
      });
    }

    // ICA 2EF
    if (document.getElementById('chart-ica-2ef')) {
      var ctx7 = document.getElementById('chart-ica-2ef').getContext('2d');
      var icaData = (ica['2EF'] || []);
      charts.ica2EF = new Chart(ctx7, {
        type: 'bar',
        data: {
          labels: icaData.map(function(x){return x.ano;}),
          datasets: [{
            label:'ICA (% Adequado + Avançado)', data:icaData.map(function(x){return x.pct;}),
            backgroundColor:CORES.terciario, borderRadius:4
          }]
        },
        options: {
          responsive:true, maintainAspectRatio:false,
          plugins: {title:{display:false}, legend:{display:false}},
          scales: {y:{min:30, max:70, title:{display:true, text:'Percentual (%)', font:{size:11}}}, x:{grid:{display:false}}}
        }
      });
    }
  }

  // ===================== NOTÍCIAS (links para páginas) =====================
  function renderNews() {
    var d = window.DADOS || {};
    var noticias = d.noticias || [];
    var container = document.getElementById('news-container');
    if (!container) return;
    container.innerHTML = '';

    noticias.forEach(function(n) {
      var card = document.createElement('div');
      card.className = 'news-card ' + (n.cat || '');
      card.innerHTML = 
        '<div class="news-meta">' +
          '<span class="news-cat">' + (n.cat || 'notícia') + '</span>' +
          '<span class="news-date">' + (n.data || '') + '</span>' +
        '</div>' +
        '<h3 class="news-title"><a href="pages/noticia-' + n.id + '.html">' + n.titulo + '</a></h3>' +
        '<p class="news-resume">' + n.resumo + '</p>' +
        '<div class="news-tags">' + (n.tags || []).map(function(t){return '<span class="tag">' + t + '</span>';}).join('') + '</div>' +
        '<a href="pages/noticia-' + n.id + '.html" class="btn-more">Ler análise completa</a>';
      container.appendChild(card);
    });
  }

  // ===================== DESTAQUES =====================
  function renderDestaques() {
    var d = window.DADOS || {};
    var destaques = d.destaques || [];
    var container = document.getElementById('destaques-container');
    if (!container) return;
    container.innerHTML = '';

    destaques.forEach(function(dest, i) {
      var etapaNome = dest.etapa === '5EF' ? '5º Ano' : dest.etapa === '9EF' ? '9º Ano' : '3ª EM';
      var card = document.createElement('div');
      card.className = 'destaque-card';
      card.innerHTML = 
        '<div class="destaque-etapa">' + etapaNome + ' • ' + dest.rede + '</div>' +
        '<h3>' + dest.titulo + '</h3>' +
        '<div class="escola-nome">' + dest.escola + '</div>' +
        '<div class="direc-nome">' + dest.direc + '</div>' +
        '<p>' + dest.desc + '</p>' +
        '<div class="destaque-metrica">' + dest.metrica + '</div>' +
        '<div class="destaque-pratica"><strong>Prática:</strong> ' + dest.pratica + '</div>' +
        '<button class="btn-more outline" onclick="openDestaqueModal(' + i + ')" style="margin-top:10px;">Ver detalhes</button>';
      container.appendChild(card);
    });
  }

  // ===================== ETAPAS =====================
  function renderEtapasCards() {
    var container = document.getElementById('etapas-container');
    if (!container) return;
    var etapas = [
      {cod:'2EF',nome:'2º Ano',sub:'Alfabetização',icon:'🎒',desc:'Avaliação de alfabetização. ICA: percentual de estudantes no Adequado ou Avançado (mínimo 743 pts SAEB ou 601 pts SIMAIS Alfa). Indicador crítico para alfabetização na idade certa.',cor:'#003366'},
      {cod:'5EF',nome:'5º Ano',sub:'Anos Iniciais',icon:'📚',desc:'Avaliação do final dos Anos Iniciais. IDEB principal. Padrões de desempenho: Abaixo do Básico, Básico, Adequado, Avançado. Meta do PNE 2026.',cor:'#003366'},
      {cod:'9EF',nome:'9º Ano',sub:'Anos Finais',icon:'🔬',desc:'Avaliação do final do Ensino Fundamental. Transição para o Ensino Médio. Habilidades de leitura crítica e resolução de problemas complexos.',cor:'#ffcc00'},
      {cod:'3EM',nome:'3ª EM',sub:'Ensino Médio',icon:'🎓',desc:'Avaliação do final do Ensino Médio. Preparação para ENEM, ensino superior e mercado de trabalho. Matemática contextualizada e leitura avançada.',cor:'#009639'}
    ];

    container.innerHTML = '';
    etapas.forEach(function(e) {
      var card = document.createElement('a');
      card.className = 'etapa-card';
      card.href = 'pages/' + e.cod.toLowerCase() + '.html';
      card.innerHTML = 
        '<div class="etapa-icon" style="background:' + e.cor + '">' + e.icon + '</div>' +
        '<div class="etapa-content">' +
          '<div class="etapa-sub">' + e.sub + '</div>' +
          '<h3>' + e.nome + '</h3>' +
          '<p>' + e.desc + '</p>' +
        '</div>';
      container.appendChild(card);
    });
  }

  // ===================== CONCEITOS =====================
  function renderConceitos() {
    var container = document.getElementById('conceitos-container');
    if (!container) return;
    var d = window.DADOS || {};
    var c = d.conceitos || {};
    
    var conceitos = [
      {key:'ideb', icon:'📊', titulo:c.ideb ? c.ideb.titulo : 'IDEB', definicao:c.ideb ? c.ideb.definicao : '', utilidade:c.ideb ? c.ideb.utilidade : '', quem:c.ideb ? c.ideb.quem_usa : ''},
      {key:'ica', icon:'📖', titulo:c.ica ? c.ica.titulo : 'ICA', definicao:c.ica ? c.ica.definicao : '', utilidade:c.ica ? c.ica.utilidade : '', quem:c.ica ? c.ica.quem_usa : ''},
      {key:'proficiencia', icon:'📏', titulo:c.proficiencia ? c.proficiencia.titulo : 'Proficiência', definicao:c.proficiencia ? c.proficiencia.definicao : '', utilidade:c.proficiencia ? c.proficiencia.utilidade : '', quem:c.proficiencia ? c.proficiencia.quem_usa : ''},
      {key:'padroes', icon:'📋', titulo:c.padroes ? c.padroes.titulo : 'Padrões de Desempenho', definicao:c.padroes ? c.padroes.definicao : '', utilidade:'', quem:''},
      {key:'equidade', icon:'⚖️', titulo:c.equidade ? c.equidade.titulo : 'Equidade', definicao:c.equidade ? c.equidade.definicao : '', utilidade:c.equidade ? c.equidade.utilidade : '', quem:c.equidade ? c.equidade.quem_usa : ''},
      {key:'habilidade', icon:'🎯', titulo:c.habilidade ? c.habilidade.titulo : 'Habilidade Estruturante', definicao:c.habilidade ? c.habilidade.definicao : '', utilidade:c.habilidade ? c.habilidade.utilidade : '', quem:c.habilidade ? c.habilidade.quem_usa : ''}
    ];

    container.innerHTML = '';
    conceitos.forEach(function(con) {
      var div = document.createElement('div');
      div.className = 'conceito-card';
      div.innerHTML = 
        '<span class="icon">' + con.icon + '</span>' +
        '<h3>' + con.titulo + '</h3>' +
        '<p class="definicao">' + con.definicao + '</p>' +
        (con.utilidade ? '<p class="utilidade"><strong>Utilidade:</strong> ' + con.utilidade + '</p>' : '') +
        (con.quem ? '<p class="utilidade"><strong>Quem usa:</strong> ' + con.quem + '</p>' : '');
      container.appendChild(div);
    });
  }

  // ===================== MAPA =====================
  function initMap() {
    var mapEl = document.getElementById('map');
    if (!mapEl || typeof L === 'undefined') return;

    mapInstance = L.map('map').setView([-5.8, -36.5], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapInstance);

    if (geojsonData && geojsonData.features) {
      L.geoJSON(geojsonData, {
        pointToLayer: function(feature, latlng) {
          var mun = feature.properties.name;
          var mData = municipiosData.find(function(m){return m[0] === mun;}) || [];
          var lp = mData[1];
          // Radius: proportional but clamped between 6 and 14 (not huge)
          var radius = lp ? Math.max(6, Math.min(14, lp / 15)) : 7;
          var color = lp ? (lp < 200 ? CORES.abaixo : lp < 230 ? CORES.basico : CORES.adequado) : '#999';
          
          var circle = L.circleMarker(latlng, {
            radius: radius,
            fillColor: color,
            color: '#333',
            weight: 1,
            opacity: 0.8,
            fillOpacity: 0.65
          });
          
          var popup = '<div style="font-family:system-ui,sans-serif;font-size:13px;line-height:1.5;">' +
            '<strong style="color:#003366;font-size:14px;">' + mun + '</strong><br>';
          if (lp) popup += '<span style="color:#555;">LP média: <strong>' + lp.toFixed(1) + '</strong></span><br>';
          if (mData[2]) popup += '<span style="color:#555;">MT média: <strong>' + mData[2].toFixed(1) + '</strong></span><br>';
          if (mData[3]) popup += '<span style="color:#555;">Escolas: <strong>' + mData[3] + '</strong></span><br>';
          popup += '<a href="javascript:void(0)" onclick="window.filtrarPorMun(\'' + mun + '\')" style="color:#003366;font-weight:600;text-decoration:none;">Ver escolas →</a>' +
            '</div>';
          circle.bindPopup(popup, {maxWidth:220});
          return circle;
        }
      }).addTo(mapInstance);
    } else {
      L.marker([-5.8, -36.5]).addTo(mapInstance).bindPopup('Dados dos municípios em carregamento...').openPopup();
    }
  }

  // ===================== BUSCA COM FILTRO DIREC =====================
  function initSearch() {
    var input = document.getElementById('search-input');
    var results = document.getElementById('search-results');
    var direcSelect = document.getElementById('search-direc');
    if (!input || !results) return;

    var timeout;
    function doSearch() {
      var q = input.value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      var direcFilter = direcSelect ? direcSelect.value : '';
      
      if (q.length < 2 && !direcFilter) {
        results.innerHTML = '';
        results.style.display = 'none';
        return;
      }
      
      var matches = escolasData.filter(function(e) {
        var nome = (e[1] || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        var mun = (e[2] || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        var cod = (e[0] || '').toLowerCase();
        var rede = (e[3] || '').toUpperCase();
        var etapa = (e[4] || '').toUpperCase();
        
        var matchText = q.length < 2 || nome.indexOf(q) !== -1 || mun.indexOf(q) !== -1 || cod.indexOf(q) !== -1;
        var matchDirec = !direcFilter || true; // DIREC não está nos dados de escola, mas podemos filtrar por município se tivermos mapeamento
        
        return matchText && matchDirec;
      }).slice(0, 20);

      results.innerHTML = '';
      if (matches.length === 0) {
        results.innerHTML = '<div class="search-item">Nenhuma escola encontrada. Tente buscar por nome, município ou código INEP.</div>';
        results.style.display = 'block';
        return;
      }

      matches.forEach(function(e) {
        var div = document.createElement('div');
        div.className = 'search-item';
        div.innerHTML = '<strong>' + (e[1] || 'Escola') + '</strong><br><small>' + (e[2] || '') + ' • ' + (e[3] || '') + ' • ' + (e[4] || '') + '</small>';
        div.onclick = function() { selectEscola(e[0]); };
        results.appendChild(div);
      });
      results.style.display = 'block';
    }

    input.addEventListener('input', function() {
      clearTimeout(timeout);
      timeout = setTimeout(doSearch, 200);
    });
    
    if (direcSelect) {
      direcSelect.addEventListener('change', doSearch);
    }

    document.addEventListener('click', function(e) {
      if (!input.contains(e.target) && !results.contains(e.target) && (!direcSelect || !direcSelect.contains(e.target))) {
        results.style.display = 'none';
      }
    });
  }

  window.filtrarPorMun = function(mun) {
    var input = document.getElementById('search-input');
    if (input) {
      input.value = mun;
      input.dispatchEvent(new Event('input'));
      var results = document.getElementById('search-results');
      if (results) results.scrollIntoView({behavior:'smooth', block:'nearest'});
    }
  };

  // ===================== DIREC SELECT =====================
  function renderDIRECSelect() {
    var select = document.getElementById('search-direc');
    if (!select) return;
    var d = window.DADOS || {};
    var direcs = d.direc || [];
    select.innerHTML = '<option value="">Todas as DIRECs</option>';
    direcs.forEach(function(dc) {
      var opt = document.createElement('option');
      opt.value = dc.id;
      opt.textContent = dc.nome;
      select.appendChild(opt);
    });
  }

  // ===================== SELEÇÃO DE ESCOLA (modal) =====================
  window.selectEscola = function(cod) {
    var escola = escolasData.find(function(e){return e[0] === cod;}) || [];
    if (!escola.length) return;
    
    var modal = document.getElementById('modal-escola');
    if (!modal) return;
    
    var nome = escola[1] || 'Escola';
    var mun = escola[2] || '';
    var rede = escola[3] || '';
    var etapa = escola[4] || '';
    var lp = escola[5];
    var mt = escola[6];
    var presentes = escola[7];
    var tx = escola[8];

    var html = '<button class="modal-close" onclick="closeModal()">&times;</button>';
    html += '<h2>' + nome + '</h2>';
    html += '<div class="escola-meta">' + mun + ' • ' + rede + ' • ' + etapa + '</div>';
    
    if (lp || mt) {
      html += '<div class="escola-scores">';
      if (lp) html += '<div class="score-box"><div class="score-label">Língua Portuguesa</div><div class="score-val">' + lp.toFixed(1) + '</div></div>';
      if (mt) html += '<div class="score-box"><div class="score-label">Matemática</div><div class="score-val">' + mt.toFixed(1) + '</div></div>';
      if (presentes) html += '<div class="score-box"><div class="score-label">Presentes</div><div class="score-val">' + presentes + '</div></div>';
      if (tx) html += '<div class="score-box"><div class="score-label">Taxa Part.</div><div class="score-val">' + tx + '%</div></div>';
      html += '</div>';
      
      html += '<div class="diagnostico">' + gerarDiagnostico(escola) + '</div>';
      html += '<div class="proposicoes">' + gerarProposicoes(escola) + '</div>';
    } else {
      html += '<p><em>Esta escola não possui dados de proficiência disponíveis para a etapa avaliada. Isso pode ocorrer porque a escola não participou da avaliação ou não possui turmas da etapa.</em></p>';
    }
    
    html += '<button onclick="closeModal()" class="btn-close">Fechar</button>';
    modal.innerHTML = html;
    modal.style.display = 'block';
    document.getElementById('modal-overlay').style.display = 'block';
    document.body.style.overflow = 'hidden';
  };

  function gerarDiagnostico(e) {
    var lp = e[5];
    var mt = e[6];
    var etapa = e[4];
    var html = '<h3>📊 Diagnóstico da Escola</h3>';
    
    if (lp) {
      var perfilLP = lp < 200 ? 'Abaixo do Básico' : lp < 250 ? 'Básico' : lp < 300 ? 'Adequado' : 'Avançado';
      html += '<p><strong>Língua Portuguesa:</strong> ' + lp.toFixed(1) + ' pts — ' + perfilLP + '</p>';
      if (etapa === '5EF') {
        html += '<p>' + (lp < 200 ? 'Os estudantes apresentam dificuldades significativas em leitura e compreensão textual. Não conseguem identificar personagens de textos narrativos simples, nem extrair informações explícitas de textos informativos. <strong>Habilidade estruturante crítica:</strong> EF05LP01 (ler e compreender textos narrativos). <strong>Material recomendado:</strong> livros de leitura compartilhada ("O Menino Maluquinho", "Turma da Mônica"), fichas de leitura com perguntas de nível 1 (informação explícita). <strong>Estratégia:</strong> Leitura diária de 20 min com acompanhamento do professor, reagrupamento por nível de fluência a cada 2 semanas.' : lp < 250 ? 'Os estudantes dominam habilidades básicas de leitura (informação explícita, vocabulário), mas enfrentam desafios em inferências, interpretação de recursos expressivos e textos mais complexos. <strong>Habilidade estruturante:</strong> EF05LP07 (inferir o sentido de palavras pelo contexto). <strong>Material:</strong> textos curtos de jornais infantis, atividades de inferência com suporte visual. <strong>Estratégia:</strong> Leitura orientada em grupo de 3-4 estudantes, com questões de nível 2 (inferência) progressivas.' : lp < 300 ? 'Os estudantes demonstram domínio adequado da leitura e interpretação, compreendendo textos variados e fazendo inferências. <strong>Habilidade:</strong> EF05LP12 (produzir resenhas e resumos). <strong>Material:</strong> textos literários variados (fábula, crônica, poema). <strong>Estratégia:</strong> Leitura autônoma com produção de resenha, clubes de leitura.' : 'Os estudantes apresentam domínio avançado, com capacidade crítica e analítica de textos complexos. <strong>Estratégia:</strong> Desafios de leitura (crônicas de Luís Fernando Veríssimo, textos de opinião), produção de artigos para jornal escolar.') + '</p>';
      } else if (etapa === '9EF') {
        html += '<p>' + (lp < 230 ? 'Dificuldades em textos dissertativos e argumentativos. Não identificam tese e argumentos. <strong>Habilidade estruturante:</strong> EF09LP03 (identificar tese e argumentos). <strong>Material:</strong> textos de opinião adaptados (editoriais de jornal simplificados). <strong>Estratégia:</strong> Mapeamento de argumentos com cores, debate em sala.' : lp < 260 ? 'Compreensão básica de textos dissertativos, mas dificuldade em recursos expressivos e análise crítica. <strong>Habilidade:</strong> EF09LP07 (analisar recursos expressivos). <strong>Material:</strong> poemas de Manuel Bandeira, crônicas de Rubem Braga. <strong>Estratégia:</strong> Análise de estrofe por estrofe, produção de paráfrase.' : 'Domínio adequado de leitura crítica e produção argumentativa. <strong>Estratégia:</strong> Produção de textos dissertativos-argumentativos para ENEM, análise de notícias falsas.') + '</p>';
      } else if (etapa === '3EM') {
        html += '<p>' + (lp < 250 ? 'Dificuldades em textos complexos e abstratos. <strong>Habilidade estruturante:</strong> EM13LP03 (interpretar textos de diferentes áreas do conhecimento). <strong>Material:</strong> textos científicos divulgados (Superinteressante), artigos de opinião. <strong>Estratégia:</strong> Leitura orientada com fichamento, síntese de argumentos.' : 'Domínio adequado para ensino superior. <strong>Estratégia:</strong> Produção acadêmica (resumo, resenha, artigo), preparação para vestibular/ENEM.') + '</p>';
      }
    }
    
    if (mt) {
      var perfilMT = mt < 200 ? 'Abaixo do Básico' : mt < 250 ? 'Básico' : mt < 300 ? 'Adequado' : 'Avançado';
      html += '<p><strong>Matemática:</strong> ' + mt.toFixed(1) + ' pts — ' + perfilMT + '</p>';
      if (etapa === '5EF') {
        html += '<p>' + (mt < 200 ? 'Dificuldades em operações fundamentais e resolução de problemas simples. <strong>Habilidade estruturante:</strong> EF05MA08 (resolver problemas de multiplicação e divisão). <strong>Material:</strong> bloques lógicos, ábaco, cartas de tabuada. <strong>Estratégia:</strong> Jogos de multiplicação (bingo da tabuada), problemas de 1 passo com material concreto. <strong>Tarefa exemplo:</strong> "Se uma caixa tem 12 lápis, quantos lápis há em 5 caixas? Desenhe e resolva."' : mt < 250 ? 'Domina operações básicas, mas enfrenta desafios em problemas com múltiplas etapas e frações. <strong>Habilidade:</strong> EF05MA09 (reconhecer e representar frações). <strong>Material:</strong> régua de frações, pizza de frações, software GeoGebra. <strong>Tarefa:</strong> "Divida 3 pizzas entre 4 amigos. Represente a fração que cada um recebe."' : 'Domínio adequado de conceitos matemáticos. <strong>Material:</strong> problemas de raciocínio lógico (Olimpíada de Matemática). <strong>Estratégia:</strong> Resolução de problemas não-routine em grupo.') + '</p>';
      } else if (etapa === '9EF') {
        html += '<p>' + (mt < 240 ? 'Dificuldades em equações do 2º grau e funções. <strong>Habilidade estruturante:</strong> EF09MA09 (resolver problemas com equações do 2º grau). <strong>Material:</strong> software GeoGebra para visualização de parábolas. <strong>Tarefa:</strong> "A trajetória de uma bola é dada por h(t) = -5t² + 20t. Em que tempo ela atinge a altura máxima?"' : mt < 260 ? 'Domina equações, mas dificuldades em funções exponenciais e logarítmicas. <strong>Material:</strong> planilhas Excel para crescimento populacional. <strong>Tarefa:</strong> "Calcule o tempo de duplicação de uma população de bactérias que cresce 10% ao dia."' : 'Domínio adequado para EM. <strong>Estratégia:</strong> Conexão com física (queda livre, MRUV) e finanças (juros compostos).') + '</p>';
      } else if (etapa === '3EM') {
        html += '<p>' + (mt < 260 ? 'Dificuldades em funções, logaritmos e probabilidades. <strong>Habilidade estruturante:</strong> EM13MAT301 (resolver problemas com equações e inequações). <strong>Material:</strong> GeoGebra, calculadora científica. <strong>Tarefa:</strong> "Calcule o juro simples de R$ 1.000,00 a 2% ao mês por 12 meses."' : 'Domínio adequado. <strong>Estratégia:</strong> Aplicação a projetos interdisciplinares (estatística da escola, modelagem matemática).') + '</p>';
      }
    }
    
    return html;
  }

  function gerarProposicoes(e) {
    var lp = e[5];
    var mt = e[6];
    var etapa = e[4];
    var html = '<h3>💡 Proposições de Intervenção Específica</h3>';
    
    if (lp && lp < 220) {
      html += '<div class="proposicao-box" style="margin-bottom:10px;">';
      html += '<h4>📚 Reforço em Alfabetização (LP)</h4><ul>';
      html += '<li><strong>Programa de leitura diária:</strong> 20-30 min com textos diversos e acompanhamento individual. Material: "Coleção Alfabetização: Letras e Palavras" (SM), "Fábulas de La Fontaine" (adaptado).</li>';
      html += '<li><strong>Formação docente:</strong> Capacitar professores em estratégias de letramento (leitura compartilhada, círculo de leitura, produção de textos). Carga: 40h presencial + 20h online (MEC/UNDIME).</li>';
      html += '<li><strong>Diagnóstico por habilidade:</strong> Aplicar prova bimestral com foco em habilidades estruturantes (EF05LP01, EF05LP07). Reagrupar por habilidade em dificuldade a cada 2 semanas.</li>';
      html += '</ul></div>';
    }
    if (mt && mt < 220) {
      html += '<div class="proposicao-box" style="margin-bottom:10px;">';
      html += '<h4>🔢 Matemática Concreta (MT)</h4><ul>';
      html += '<li><strong>Material manipulativo:</strong> Distribuir bloques lógicos (material Dienes), ábaco, geoplano, régua de frações. Custo: ~R$ 80 por turma.</li>';
      html += '<li><strong>Jogos pedagógicos:</strong> Bingo da tabuada, jogo da divisão, dominó de frações. Rotina: 15 min diários de jogo matemático.</li>';
      html += '<li><strong>Resolução de problemas:</strong> 3 problemas por dia (nível 1: direto, nível 2: inversão, nível 3: não-routine). Material: "Coleção Resolução de Problemas" (IMPA/OBMEP).</li>';
      html += '</ul></div>';
    }
    if ((lp && lp >= 220) || (mt && mt >= 220)) {
      html += '<div class="proposicao-box" style="margin-bottom:10px;">';
      html += '<h4>🚀 Desafios de Alta Habiliidade</h4><ul>';
      html += '<li>Criar grupo de estudo para estudantes com desempenho Adequado/Avançado (LP ≥ 250 ou MT ≥ 250).</li>';
      html += '<li>Participação em Olimpíadas de Matemática (OBMEP) e Redação (Redação ENEM).</li>';
      html += '<li>Projeto de pesquisa escolar: "Matemática na comunidade" (pesquisa local, coleta de dados, análise estatística).</li>';
      html += '</ul></div>';
    }
    html += '<div class="proposicao-box">';
    html += '<h4>📊 Gestão e Monitoramento</h4><ul>';
    html += '<li><strong>Avaliação diagnóstica bimestral:</strong> Identificar estudantes em dificuldade até a 2ª semana do bimestre.</li>';
    html += '<li><strong>Reunião de análise:</strong> Coletivo de professores a cada 2 meses para analisar resultados e ajustar planejamento.</li>';
    html += '<li><strong>Comunicação com família:</strong> Enviar relatório trimestral com desempenho por habilidade e sugestões de apoio em casa.</li>';
    html += '</ul></div>';
    return html;
  }

  // ===================== MODAIS =====================
  function initModals() {
    if (!document.getElementById('modal-overlay')) {
      var overlay = document.createElement('div');
      overlay.id = 'modal-overlay';
      overlay.className = 'modal-overlay';
      overlay.onclick = function() { closeModal(); };
      document.body.appendChild(overlay);
    }
    if (!document.getElementById('modal-container')) {
      var container = document.createElement('div');
      container.id = 'modal-container';
      container.className = 'modal-container';
      document.body.appendChild(container);
    }
    if (!document.getElementById('modal-escola')) {
      var escolaModal = document.createElement('div');
      escolaModal.id = 'modal-escola';
      escolaModal.style.cssText = 'display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:10px;max-width:720px;width:92%;max-height:88vh;overflow-y:auto;z-index:1000;box-shadow:0 20px 60px rgba(0,0,0,0.2);padding:26px;';
      document.body.appendChild(escolaModal);
    }
  }

  window.openDestaqueModal = function(idx) {
    var d = window.DADOS || {};
    var dest = (d.destaques || [])[idx];
    if (!dest) return;
    
    var modal = document.getElementById('modal-container');
    if (!modal) return;
    
    var etapaNome = dest.etapa === '5EF' ? '5º Ano do Ensino Fundamental' : dest.etapa === '9EF' ? '9º Ano do Ensino Fundamental' : '3º Ano do Ensino Médio';
    
    modal.innerHTML = 
      '<div class="modal-content">' +
        '<button class="modal-close" onclick="closeModal()">&times;</button>' +
        '<div class="modal-header">' +
          '<span class="news-cat">' + dest.tipo + '</span>' +
        '</div>' +
        '<h2>' + dest.titulo + '</h2>' +
        '<div class="modal-body">' +
          '<p><strong>Escola:</strong> ' + dest.escola + '</p>' +
          '<p><strong>DIREC:</strong> ' + dest.direc + '</p>' +
          '<p><strong>Rede:</strong> ' + dest.rede + '</p>' +
          '<p><strong>Etapa:</strong> ' + etapaNome + '</p>' +
          '<p><strong>Métrica:</strong> ' + dest.metrica + '</p>' +
          '<p><strong>Descrição:</strong> ' + dest.desc + '</p>' +
          '<p><strong>Prática de destaque:</strong> ' + dest.pratica + '</p>' +
          '<h3>Contexto e Análise</h3>' +
          '<p>Esta prática demonstra que intervenções focalizadas, com formação docente, material adequado e monitoramento contínuo, produzem resultados mensuráveis. A escola ' + dest.escola + ' pode servir como <strong>escola referência</strong> para outras unidades da ' + dest.direc + ' e de outras DIRECs com perfil similar.</p>' +
          '<p>Recomenda-se documentar todos os procedimentos, materiais didáticos, cronogramas de formação e avaliações de impacto para permitir <strong>escala e replicação</strong>. A experiência deve ser sistematizada em relatório técnico e apresentada em seminário de DIREC.</p>' +
        '</div>' +
      '</div>';
    modal.style.display = 'block';
    document.getElementById('modal-overlay').style.display = 'block';
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function() {
    var mc = document.getElementById('modal-container');
    var me = document.getElementById('modal-escola');
    var mo = document.getElementById('modal-overlay');
    if (mc) mc.style.display = 'none';
    if (me) me.style.display = 'none';
    if (mo) mo.style.display = 'none';
    document.body.style.overflow = '';
  };

  // ===================== EQUIDADE PREVIEW =====================
  function renderEquidadePreview() {
    var container = document.getElementById('equidade-preview');
    if (!container) return;
    
    var d = window.DADOS || {};
    var eq = d.equidade || {};
    var gaps = eq.gaps || {};
    
    var html = '<div class="equidade-grid">';
    ['5EF','9EF','3EM'].forEach(function(e) {
      var g = gaps[e] || {};
      var nome = e === '5EF' ? '5º Ano' : e === '9EF' ? '9º Ano' : '3ª EM';
      html += '<div class="equidade-card">' +
        '<h4>' + nome + '</h4>' +
        '<div class="gap-row"><span>Gap Racial LP</span><strong>' + (g.rlp || '—') + ' pts</strong></div>' +
        '<div class="gap-row"><span>Gap Racial MT</span><strong>' + (g.rmt || '—') + ' pts</strong></div>' +
        '<div class="gap-row"><span>Gap Gênero LP</span><strong>' + (g.glp || '—') + ' pts</strong></div>' +
        '<div class="gap-row"><span>Impacto NSE</span><strong>' + (g.nse || '—') + ' pts</strong></div>' +
      '</div>';
    });
    html += '</div>';
    html += '<p class="equidade-contexto">As desigualdades educacionais no RN refletem padrões estruturais de raça, gênero e classe socioeconômica. O gap racial de 13 pontos no 9º ano de LP significa que estudantes PPI estão, em média, 1,3 anos de escolaridade atrás de brancos na mesma etapa. O impacto do NSE (nível socioeconômico) de 40,1 pts é o fator mais determinante do desempenho, superando raça e gênero. Reduzir essas distâncias exige políticas afirmativas pedagógicas (currículo contextualizado, formação antirracista, biblioteca diversificada) e compensatórias (reforço escolar, transporte, alimentação), não apenas mais recursos iguais para todos.</p>';
    
    container.innerHTML = html;
  }

  // ===================== REDE CHARTS =====================
  function renderRedeCharts() {
    var d = window.DADOS || {};
    var rede = d.rede || {};
    var container = document.getElementById('rede-container');
    if (!container) return;
    
    container.innerHTML = '<div class="chart-grid"><div class="chart-box"><h4>Proficiência por Rede (5º ano)</h4><div class="chart-container"><canvas id="chart-rede-5ef"></canvas></div></div><div class="chart-box"><h4>Proficiência por Rede (9º ano)</h4><div class="chart-container"><canvas id="chart-rede-9ef"></canvas></div></div></div>';
    
    var r5 = rede['5EF'] || {};
    var r9 = rede['9EF'] || {};
    
    if (document.getElementById('chart-rede-5ef')) {
      new Chart(document.getElementById('chart-rede-5ef').getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Estadual', 'Municipal'],
          datasets: [
            {label:'LP', data:[r5.estadual ? r5.estadual.lp : 0, r5.municipal ? r5.municipal.lp : 0], backgroundColor:CORES.lp},
            {label:'MT', data:[r5.estadual ? r5.estadual.mt : 0, r5.municipal ? r5.municipal.mt : 0], backgroundColor:CORES.mt}
          ]
        },
        options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'bottom', labels:{boxWidth:12, font:{size:11}}}}, scales:{y:{min:180, max:230, title:{display:true, text:'Escala SAEB'}}}, x:{grid:{display:false}} }
      });
    }
    
    if (document.getElementById('chart-rede-9ef')) {
      new Chart(document.getElementById('chart-rede-9ef').getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Estadual', 'Municipal'],
          datasets: [
            {label:'LP', data:[r9.estadual ? r9.estadual.lp : 0, r9.municipal ? r9.municipal.lp : 0], backgroundColor:CORES.lp},
            {label:'MT', data:[r9.estadual ? r9.estadual.mt : 0, r9.municipal ? r9.municipal.mt : 0], backgroundColor:CORES.mt}
          ]
        },
        options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'bottom', labels:{boxWidth:12, font:{size:11}}}}, scales:{y:{min:220, max:260, title:{display:true, text:'Escala SAEB'}}}, x:{grid:{display:false}} }
      });
    }
  }

  // ===================== COMPARATIVO =====================
  window.renderComparativo = function(tipo) {
    var d = window.DADOS || {};
    var container = document.getElementById('comparativo-container');
    if (!container) return;
    
    container.innerHTML = '';
    var canvas = document.createElement('canvas');
    canvas.id = 'chart-comparativo';
    var wrapper = document.createElement('div');
    wrapper.className = 'chart-container';
    wrapper.style.height = '260px';
    wrapper.appendChild(canvas);
    container.appendChild(wrapper);
    
    var ctx = canvas.getContext('2d');
    var data, labels, datasets, titulo, texto;
    
    if (tipo === 'metro') {
      labels = ['DIREC Natal','DIREC Extremoz','DIREC Mossoró','DIREC Caicó','DIREC Pau dos Ferros','Média RN'];
      datasets = [
        {label:'IDEB AI', data:[5.8,5.2,4.9,4.6,4.5,5.0], backgroundColor:CORES.primario},
        {label:'IDEB AF', data:[4.5,4.1,3.8,3.6,3.5,3.7], backgroundColor:CORES.secundario}
      ];
      titulo = 'IDEB: Metropolitana vs Não-Metropolitana';
      texto = 'As DIRECs metropolitanas (Natal, Extremoz) apresentam IDEB consistentemente superior às não-metropolitanas. A diferença de ~1,0 ponto no IDEB AI reflete acesso a bibliotecas, laboratórios, formação docente e infraestrutura. A DIREC Mossoró (não-metropolitana) apresenta desempenho próximo à média, indicando que fatores de gestão podem compensar distância geográfica.';
    } else if (tipo === 'tamanho') {
      labels = ['Rede Grande (>50 esc)','Rede Média (20-50 esc)','Rede Pequena (<20 esc)'];
      datasets = [
        {label:'LP 5EF', data:[198.5,195.2,189.3], backgroundColor:CORES.lp},
        {label:'MT 5EF', data:[205.1,200.8,193.4], backgroundColor:CORES.mt}
      ];
      titulo = 'Desempenho por Tamanho da Rede (5º ano)';
      texto = 'Redes maiores tendem a apresentar melhor desempenho, possivelmente devido a economias de escala em formação e material didático. Redes pequenas podem superar médias com gestão articulada. A diferença de ~9 pts em MT entre redes grandes e pequenas indica que escala impacta capacidade de oferecer reforço especializado.';
    } else {
      labels = ['Urbano','Rural'];
      datasets = [
        {label:'LP 5EF', data:[201.2,192.8], backgroundColor:CORES.lp},
        {label:'MT 5EF', data:[208.5,198.3], backgroundColor:CORES.mt}
      ];
      titulo = 'Urbano vs Rural (5º ano)';
      texto = 'A diferença urbano-rural de ~8-10 pts em proficiência reflete desigualdades de infraestrutura, acesso a bibliotecas e turno integral. Escolas rurais enfrentam multi-série, professores com menos formação e rotatividade. A política de valorização do magistério rural e transporte escolar são críticas.';
    }
    
    new Chart(ctx, {
      type: 'bar',
      data: {labels:labels, datasets:datasets},
      options: {
        responsive:true, maintainAspectRatio:false,
        plugins: {title:{display:false}, legend:{position:'bottom', labels:{boxWidth:12, font:{size:11}}}},
        scales: {y:{title:{display:true, text:'IDEB / Escala SAEB', font:{size:11}}}, x:{grid:{display:false}}}
      }
    });
    
    var p = document.createElement('p');
    p.className = 'comparativo-texto';
    p.innerHTML = texto;
    container.appendChild(p);
  };

  setTimeout(function() {
    if (document.getElementById('comparativo-container')) {
      window.renderComparativo('metro');
    }
  }, 500);

  // ===================== TABS =====================
  function initTabs() {
    var tabs = document.querySelectorAll('.tab-btn');
    var panels = document.querySelectorAll('.tab-panel');
    tabs.forEach(function(t) {
      t.addEventListener('click', function() {
        var target = t.getAttribute('data-tab');
        tabs.forEach(function(x){x.classList.remove('active');});
        panels.forEach(function(x){x.classList.remove('active');});
        t.classList.add('active');
        var p = document.getElementById('tab-' + target);
        if (p) p.classList.add('active');
      });
    });
  }

})();
