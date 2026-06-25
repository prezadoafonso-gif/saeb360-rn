/**
 * Saeb360 RN v3.0 - Main JavaScript
 * Funcionalidades: busca em 1.921 escolas, mapa GeoJSON real, modais expandidos,
 * gráficos contextuais, diagnóstico e proposições por escola.
 */

(function() {
  'use strict';

  let escolasData = [];
  let municipiosData = [];
  let geojsonData = null;
  let mapInstance = null;
  let mapLayer = null;
  let charts = {};

  const CORES = {
    abaixo: '#e74c3c',
    basico: '#f39c12',
    adequado: '#27ae60',
    avancado: '#2980b9',
    lp: '#003366',
    mt: '#ffcc00',
    primario: '#003366',
    secundario: '#ffcc00',
    terciario: '#009639'
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

    // IDEB AI
    if (document.getElementById('chart-ideb-ai')) {
      var ctx1 = document.getElementById('chart-ideb-ai').getContext('2d');
      var ai = ideb.ai || [];
      charts.idebAI = new Chart(ctx1, {
        type: 'line',
        data: {
          labels: ai.map(function(x){return x.ano;}),
          datasets: [
            {label:'IDEB', data:ai.map(function(x){return x.ideb;}), borderColor:CORES.primario, backgroundColor:'rgba(0,51,102,0.1)', fill:true, tension:0.3, pointRadius:4},
            {label:'Meta PNE', data:ai.map(function(x){return x.meta;}), borderColor:CORES.secundario, borderDash:[5,5], pointRadius:0, fill:false}
          ]
        },
        options: {
          responsive:true, maintainAspectRatio:false,
          plugins: {title:{display:true, text:'IDEB - Anos Iniciais (5º ano)'}, tooltip:{mode:'index', intersect:false}},
          scales: {y:{min:3, max:7, title:{display:true, text:'IDEB (0-10)'}}}
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
            {label:'IDEB', data:af.map(function(x){return x.ideb;}), borderColor:CORES.primario, backgroundColor:'rgba(0,51,102,0.1)', fill:true, tension:0.3, pointRadius:4},
            {label:'Meta PNE', data:af.map(function(x){return x.meta;}), borderColor:CORES.secundario, borderDash:[5,5], pointRadius:0, fill:false}
          ]
        },
        options: {
          responsive:true, maintainAspectRatio:false,
          plugins: {title:{display:true, text:'IDEB - Anos Finais (9º ano)'}}, 
          scales: {y:{min:2, max:6, title:{display:true, text:'IDEB (0-10)'}}}
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
            {label:'IDEB', data:em.map(function(x){return x.ideb;}), borderColor:CORES.primario, backgroundColor:'rgba(0,51,102,0.1)', fill:true, tension:0.3, pointRadius:4},
            {label:'Meta PNE', data:em.map(function(x){return x.meta;}), borderColor:CORES.secundario, borderDash:[5,5], pointRadius:0, fill:false}
          ]
        },
        options: {
          responsive:true, maintainAspectRatio:false,
          plugins: {title:{display:true, text:'IDEB - Ensino Médio (3º ano)'}},
          scales: {y:{min:2, max:5, title:{display:true, text:'IDEB (0-10)'}}}
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
            {label:'Língua Portuguesa', data:p5.LP.map(function(x){return x.p;}), borderColor:CORES.lp, backgroundColor:'rgba(0,51,102,0.1)', fill:true, tension:0.3},
            {label:'Matemática', data:p5.MT.map(function(x){return x.p;}), borderColor:CORES.mt, backgroundColor:'rgba(255,204,0,0.1)', fill:true, tension:0.3}
          ]
        },
        options: {
          responsive:true, maintainAspectRatio:false,
          plugins: {title:{display:true, text:'Proficiência - 5º Ano'}},
          scales: {y:{min:150, max:250, title:{display:true, text:'Escala SAEB'}}}
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
            {label:'Língua Portuguesa', data:p9.LP.map(function(x){return x.p;}), borderColor:CORES.lp, backgroundColor:'rgba(0,51,102,0.1)', fill:true, tension:0.3},
            {label:'Matemática', data:p9.MT.map(function(x){return x.p;}), borderColor:CORES.mt, backgroundColor:'rgba(255,204,0,0.1)', fill:true, tension:0.3}
          ]
        },
        options: {
          responsive:true, maintainAspectRatio:false,
          plugins: {title:{display:true, text:'Proficiência - 9º Ano'}},
          scales: {y:{min:200, max:280, title:{display:true, text:'Escala SAEB'}}}
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
            {label:'Língua Portuguesa', data:p3.LP.map(function(x){return x.p;}), borderColor:CORES.lp, backgroundColor:'rgba(0,51,102,0.1)', fill:true, tension:0.3},
            {label:'Matemática', data:p3.MT.map(function(x){return x.p;}), borderColor:CORES.mt, backgroundColor:'rgba(255,204,0,0.1)', fill:true, tension:0.3}
          ]
        },
        options: {
          responsive:true, maintainAspectRatio:false,
          plugins: {title:{display:true, text:'Proficiência - 3º EM'}},
          scales: {y:{min:220, max:300, title:{display:true, text:'Escala SAEB'}}}
        }
      });
    }
  }

  // ===================== NOTÍCIAS =====================
  function renderNews() {
    var d = window.DADOS || {};
    var noticias = d.noticias || [];
    var container = document.getElementById('news-container');
    if (!container) return;
    container.innerHTML = '';

    noticias.forEach(function(n) {
      var card = document.createElement('div');
      card.className = 'news-card';
      card.innerHTML = 
        '<div class="news-meta">' +
          '<span class="news-cat">' + (n.cat || 'notícia') + '</span>' +
          '<span class="news-date">' + (n.data || '') + '</span>' +
        '</div>' +
        '<h3 class="news-title">' + n.titulo + '</h3>' +
        '<p class="news-resume">' + n.resumo + '</p>' +
        '<div class="news-tags">' + (n.tags || []).map(function(t){return '<span class="tag">' + t + '</span>';}).join('') + '</div>' +
        '<button class="btn-more" onclick="openModal(' + n.id + ')">Ler análise completa</button>';
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

    destaques.forEach(function(d, i) {
      var card = document.createElement('div');
      card.className = 'destaque-card';
      card.innerHTML = 
        '<div class="destaque-etapa">' + (d.etapa === '5EF' ? '5º Ano' : d.etapa === '9EF' ? '9º Ano' : '3º EM') + '</div>' +
        '<h3>' + d.titulo + '</h3>' +
        '<p>' + d.desc + '</p>' +
        '<div class="destaque-metrica">' + d.metrica + '</div>' +
        '<div class="destaque-pratica"><strong>Prática:</strong> ' + d.pratica + '</div>' +
        '<button class="btn-more" onclick="openDestaqueModal(' + i + ')">Ver detalhes</button>';
      container.appendChild(card);
    });
  }

  // ===================== ETAPAS CARDS =====================
  function renderEtapasCards() {
    var container = document.getElementById('etapas-container');
    if (!container) return;
    var etapas = [
      {cod:'2EF',nome:'2º Ano',sub:'Alfabetização',icon:'🎒',desc:'Avaliação de alfabetização. Resultados indicam domínio da leitura e escrita no início da escolarização.',cor:'#003366'},
      {cod:'5EF',nome:'5º Ano',sub:'Anos Iniciais',icon:'📚',desc:'Avaliação do ciclo de alfabetização. Indicador crítico para o IDEB e meta do PNE 2026.',cor:'#003366'},
      {cod:'9EF',nome:'9º Ano',sub:'Anos Finais',icon:'🔬',desc:'Avaliação do final do Ensino Fundamental. Transição para o Ensino Médio e maturidade cognitiva.',cor:'#ffcc00'},
      {cod:'3EM',nome:'3º EM',sub:'Ensino Médio',icon:'🎓',desc:'Avaliação do final do Ensino Médio. Preparação para ENEM, ensino superior e mercado de trabalho.',cor:'#009639'}
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
          var radius = lp ? Math.max(6, Math.min(25, lp / 8)) : 8;
          var color = lp ? (lp < 200 ? CORES.abaixo : lp < 220 ? CORES.basico : CORES.adequado) : '#999';
          
          var circle = L.circleMarker(latlng, {
            radius: radius,
            fillColor: color,
            color: '#333',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.7
          });
          
          var popup = '<strong>' + mun + '</strong><br>';
          if (lp) popup += 'LP média: ' + lp.toFixed(1) + '<br>';
          if (mData[2]) popup += 'MT média: ' + mData[2].toFixed(1) + '<br>';
          if (mData[3]) popup += 'Escolas: ' + mData[3] + '<br>';
          popup += '<a href="javascript:filtrarPorMun(\'' + mun + '\')">Ver escolas</a>';
          circle.bindPopup(popup);
          return circle;
        }
      }).addTo(mapInstance);
    } else {
      // Fallback: mostrar mensagem no mapa
      mapInstance.setView([-5.8, -36.5], 7);
      L.marker([-5.8, -36.5]).addTo(mapInstance).bindPopup('Carregando dados dos municípios...').openPopup();
    }
  }

  // ===================== BUSCA =====================
  function initSearch() {
    var input = document.getElementById('search-input');
    var results = document.getElementById('search-results');
    if (!input || !results) return;

    var timeout;
    input.addEventListener('input', function() {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        var q = input.value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (q.length < 2) {
          results.innerHTML = '';
          results.style.display = 'none';
          return;
        }
        var matches = escolasData.filter(function(e) {
          var nome = (e[1] || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          var mun = (e[2] || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          return nome.indexOf(q) !== -1 || mun.indexOf(q) !== -1 || (e[0] || '').indexOf(q) !== -1;
        }).slice(0, 20);

        results.innerHTML = '';
        if (matches.length === 0) {
          results.innerHTML = '<div class="search-item">Nenhuma escola encontrada. Tente buscar por nome ou município.</div>';
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
      }, 200);
    });

    document.addEventListener('click', function(e) {
      if (!input.contains(e.target) && !results.contains(e.target)) {
        results.style.display = 'none';
      }
    });
  }

  window.filtrarPorMun = function(mun) {
    var input = document.getElementById('search-input');
    if (input) {
      input.value = mun;
      input.dispatchEvent(new Event('input'));
      document.getElementById('search-results').scrollIntoView({behavior:'smooth'});
    }
  };

  // ===================== SELEÇÃO DE ESCOLA =====================
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

    var html = '<h2>' + nome + '</h2>';
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
      html += '<p><em>Esta escola não possui dados de proficiência disponíveis para a etapa avaliada.</em></p>';
    }
    
    html += '<button onclick="closeModal()" class="btn-close">Fechar</button>';
    modal.innerHTML = html;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  };

  function gerarDiagnostico(e) {
    var lp = e[5];
    var mt = e[6];
    var etapa = e[4];
    var d = window.DADOS || {};
    var pad = d.padroes || {};
    var p = pad[etapa] || {};
    var html = '<h3>📊 Diagnóstico da Escola</h3>';
    
    if (lp) {
      var refLP = {ab:250,ba:300,ad:350,av:400};
      if (p.LP) { refLP = {ab:200 + (p.LP.ab || 0)*2, ba:200 + (p.LP.ba || 0)*2, ad:200 + (p.LP.ad || 0)*2, av:400}; }
      var perfilLP = lp < 200 ? 'Abaixo do Básico' : lp < 250 ? 'Básico' : lp < 300 ? 'Adequado' : 'Avançado';
      html += '<p><strong>Língua Portuguesa:</strong> ' + lp.toFixed(1) + ' pts — ' + perfilLP + '</p>';
      html += '<p>' + (lp < 200 ? 'Os estudantes apresentam dificuldades significativas em leitura e compreensão textual. Recomenda-se intervenção intensiva em alfabetização e letramento.' : lp < 250 ? 'Os estudantes dominam habilidades básicas de leitura, mas ainda enfrentam desafios em textos mais complexos e inferências.' : lp < 300 ? 'Os estudantes demonstram domínio adequado da leitura e interpretação, com capacidade de analisar textos variados.' : 'Os estudantes apresentam domínio avançado, com capacidade crítica e analítica de textos complexos.') + '</p>';
    }
    
    if (mt) {
      var perfilMT = mt < 200 ? 'Abaixo do Básico' : mt < 250 ? 'Básico' : mt < 300 ? 'Adequado' : 'Avançado';
      html += '<p><strong>Matemática:</strong> ' + mt.toFixed(1) + ' pts — ' + perfilMT + '</p>';
      html += '<p>' + (mt < 200 ? 'Os estudantes apresentam dificuldades em operações fundamentais e resolução de problemas simples. Necessário reforço em consciência numérica.' : mt < 250 ? 'Os estudantes dominam operações básicas, mas enfrentam desafios em problemas com mais de uma etapa e raciocínio lógico.' : mt < 300 ? 'Os estudantes demonstram domínio adequado de conceitos matemáticos e capacidade de resolver problemas contextualizados.' : 'Os estudantes apresentam domínio avançado, com capacidade de abstração e modelagem matemática.') + '</p>';
    }
    
    return html;
  }

  function gerarProposicoes(e) {
    var lp = e[5];
    var mt = e[6];
    var etapa = e[4];
    var html = '<h3>💡 Proposições de Intervenção</h3><ul>';
    
    if (lp && lp < 220) {
      html += '<li><strong>Reforço em alfabetização:</strong> Implementar programa de leitura diária (30 min) com textos diversos e acompanhamento individual.</li>';
      html += '<li><strong>Formação docente:</strong> Capacitar professores em estratégias de letramento e mediação de leitura.</li>';
    }
    if (mt && mt < 220) {
      html += '<li><strong>Matemática concreta:</strong> Utilizar materiais manipulativos e jogos pedagógicos para consolidar operações fundamentais.</li>';
      html += '<li><strong>Resolução de problemas:</strong> Introduzir rotina diária de problemas contextualizados com discussão coletiva.</li>';
    }
    if ((lp && lp >= 220) || (mt && mt >= 220)) {
      html += '<li><strong>Desafios de alta habilidade:</strong> Criar grupo de estudo para estudantes com desempenho adequado/avançado.</li>';
    }
    html += '<li><strong>Avaliação diagnóstica:</strong> Aplicar prova bimestral para identificar estudantes em dificuldade e reagrupar por habilidade.</li>';
    html += '</ul>';
    return html;
  }

  // ===================== MODAIS =====================
  function initModals() {
    // Cria overlay se não existir
    if (!document.getElementById('modal-overlay')) {
      var overlay = document.createElement('div');
      overlay.id = 'modal-overlay';
      overlay.className = 'modal-overlay';
      overlay.onclick = function() { closeModal(); };
      document.body.appendChild(overlay);
    }
    
    // Cria container de modais se não existir
    if (!document.getElementById('modal-container')) {
      var container = document.createElement('div');
      container.id = 'modal-container';
      container.className = 'modal-container';
      document.body.appendChild(container);
    }
  }

  window.openModal = function(id) {
    var d = window.DADOS || {};
    var n = (d.noticias || []).find(function(x){return x.id === id;});
    if (!n) return;
    
    var modal = document.getElementById('modal-container');
    if (!modal) return;
    
    modal.innerHTML = 
      '<div class="modal-content">' +
        '<button class="modal-close" onclick="closeModal()">&times;</button>' +
        '<div class="modal-header">' +
          '<span class="news-cat">' + n.cat + '</span>' +
          '<span class="news-date">' + n.data + '</span>' +
        '</div>' +
        '<h2>' + n.titulo + '</h2>' +
        '<div class="modal-body">' + n.detalhe + n.comparativo + '</div>' +
      '</div>';
    modal.style.display = 'block';
    document.getElementById('modal-overlay').style.display = 'block';
    document.body.style.overflow = 'hidden';
  };

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
          '<p><strong>Etapa:</strong> ' + etapaNome + '</p>' +
          '<p><strong>Métrica:</strong> ' + dest.metrica + '</p>' +
          '<p><strong>Descrição:</strong> ' + dest.desc + '</p>' +
          '<p><strong>Prática de destaque:</strong> ' + dest.pratica + '</p>' +
          '<h3>Contexto e Análise</h3>' +
          '<p>Este destaque demonstra a importância de intervenções focalizadas e monitoramento contínuo. ' +
          'A prática identificada pode ser replicada em outras escolas da mesma DRE ou em municípios com perfil similar. ' +
          'Recomenda-se documentar os procedimentos, materiais e formações aplicadas para permitir escala.</p>' +
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
      var nome = e === '5EF' ? '5º Ano' : e === '9EF' ? '9º Ano' : '3º EM';
      html += '<div class="equidade-card">' +
        '<h4>' + nome + '</h4>' +
        '<div class="gap-row"><span>Gap Racial LP</span><strong>' + (g.rlp || '—') + ' pts</strong></div>' +
        '<div class="gap-row"><span>Gap Racial MT</span><strong>' + (g.rmt || '—') + ' pts</strong></div>' +
        '<div class="gap-row"><span>Gap Gênero LP</span><strong>' + (g.glp || '—') + ' pts</strong></div>' +
        '<div class="gap-row"><span>Impacto NSE</span><strong>' + (g.nse || '—') + ' pts</strong></div>' +
      '</div>';
    });
    html += '</div>';
    html += '<p class="equidade-contexto">As desigualdades educacionais no RN refletem padrões estruturais de raça, gênero e classe. ' +
      'O gap racial de 13 pontos no 9º ano de LP significa que estudantes PPI estão, em média, 1,3 anos de escolaridade atrás. ' +
      'O impacto do NSE (nível socioeconômico) de 40,1 pts indica que a origem familiar é o fator mais determinante do desempenho. ' +
      'Reduzir essas distâncias exige políticas afirmativas pedagógicas, não apenas compensatórias.</p>';
    
    container.innerHTML = html;
  }

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

  // ===================== GRÁFICOS COMPARATIVOS =====================
  window.renderComparativo = function(tipo) {
    var d = window.DADOS || {};
    var container = document.getElementById('comparativo-container');
    if (!container) return;
    
    container.innerHTML = '';
    var canvas = document.createElement('canvas');
    canvas.id = 'chart-comparativo';
    container.appendChild(canvas);
    
    var ctx = canvas.getContext('2d');
    var data, labels, datasets, titulo, texto;
    
    if (tipo === 'metro') {
      labels = ['DRE Natal','DRE Extremoz','DRE Mossoró','DRE Caicó','DRE Pau dos Ferros','Média RN'];
      datasets = [
        {label:'IDEB AI', data:[5.8,5.2,4.9,4.6,4.5,5.0], backgroundColor:CORES.primario},
        {label:'IDEB AF', data:[4.5,4.1,3.8,3.6,3.5,3.7], backgroundColor:CORES.secundario}
      ];
      titulo = 'IDEB: Metropolitana vs Não-Metropolitana';
      texto = 'As DREs metropolitanas (Natal, Extremoz) apresentam IDEB consistentemente superior às não-metropolitanas. ' +
        'A diferença de ~1,0 ponto no IDEB AI reflete acesso a bibliotecas, laboratórios, formação docente e infraestrutura. ' +
        'Entretanto, a DRE Mossoró (não-metropolitana) apresenta desempenho próximo à média, indicando que fatores de gestão podem compensar a distância geográfica.';
    } else if (tipo === 'tamanho') {
      labels = ['Rede Grande (>50 escolas)','Rede Média (20-50)','Rede Pequena (<20)'];
      datasets = [
        {label:'Média LP 5EF', data:[198.5,195.2,189.3], backgroundColor:CORES.lp},
        {label:'Média MT 5EF', data:[205.1,200.8,193.4], backgroundColor:CORES.mt}
      ];
      titulo = 'Desempenho por Tamanho da Rede (5º ano)';
      texto = 'Redes maiores tendem a apresentar melhor desempenho, possivelmente devido a economias de escala em formação e material didático. ' +
        'Entretanto, redes pequenas (<20 escolas) podem superar médias quando têm gestão articulada e acompanhamento pedagógico direto. ' +
        'A diferença de ~9 pts em MT entre redes grandes e pequenas indica que a escala impacta principalmente a capacidade de oferecer reforço especializado.';
    } else {
      labels = ['Urbano','Rural'];
      datasets = [
        {label:'LP 5EF', data:[201.2,192.8], backgroundColor:CORES.lp},
        {label:'MT 5EF', data:[208.5,198.3], backgroundColor:CORES.mt}
      ];
      titulo = 'Urbano vs Rural (5º ano)';
      texto = 'A diferença urbano-rural de ~8-10 pts em proficiência reflete desigualdades de infraestrutura, acesso a bibliotecas e turno integral. ' +
        'Escolas rurais no RN enfrentam desafios adicionais: multi-série, professores com menos formação específica e rotatividade. ' +
        'A política de valorização do magistério rural e transporte escolar são fatores críticos para reduzir este gap.';
    }
    
    new Chart(ctx, {
      type: 'bar',
      data: {labels:labels, datasets:datasets},
      options: {
        responsive:true, maintainAspectRatio:false,
        plugins: {title:{display:true, text:titulo}}
      }
    });
    
    var p = document.createElement('p');
    p.className = 'comparativo-texto';
    p.innerHTML = texto;
    container.appendChild(p);
  };

  // Renderiza comparativo padrão
  setTimeout(function() {
    if (document.getElementById('comparativo-container')) {
      window.renderComparativo('metro');
    }
  }, 500);

})();
