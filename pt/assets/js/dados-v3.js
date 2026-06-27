/**
 * Saeb360 RN v3.0 - Dados + Loader
 * Carrega escolas.json, municipios.json e geojson-rn.json via fetch.
 * Fallback para dados de amostra se fetch falhar.
 */

const DADOS_BASE = {
  meta: {
    nome: "Saeb360 RN",
    versao: "3.0",
    atualizado: "2025-06-25",
    nota: "Resultados SAEB 2025 preliminares. IDEB estimado. Divulgação oficial INEP prevista para final de junho/2026."
  },

  panorama: {
    n_escolas: 1921,
    n_municipios: 167,
    n_diretorias: 16,
    ideb: {
      ai: [{ano:2017,ideb:4.3,meta:4.5},{ano:2019,ideb:4.7,meta:5.0},{ano:2021,ideb:4.8,meta:5.5},{ano:2023,ideb:5.0,meta:5.5},{ano:2025,ideb:5.3,meta:6.0,e:true}],
      af: [{ano:2017,ideb:3.2,meta:3.5},{ano:2019,ideb:3.6,meta:4.0},{ano:2021,ideb:3.7,meta:4.5},{ano:2023,ideb:3.7,meta:4.5},{ano:2025,ideb:4.1,meta:5.0,e:true}],
      em: [{ano:2017,ideb:2.8,meta:3.0},{ano:2019,ideb:3.2,meta:3.5},{ano:2021,ideb:3.2,meta:4.0},{ano:2023,ideb:3.2,meta:4.0},{ano:2025,ideb:3.9,meta:4.5,e:true}]
    },
    prof: {
      "5EF":{LP:[{a:2017,p:185.2},{a:2019,p:188.5},{a:2021,p:189.0},{a:2023,p:195.0},{a:2025,p:204.0,e:true}],MT:[{a:2017,p:191.0},{a:2019,p:194.3},{a:2021,p:196.0},{a:2023,p:199.1},{a:2025,p:211.2,e:true}]},
      "9EF":{LP:[{a:2017,p:230.0},{a:2019,p:233.0},{a:2021,p:235.0},{a:2023,p:238.6},{a:2025,p:246.2,e:true}],MT:[{a:2017,p:232.0},{a:2019,p:235.0},{a:2021,p:236.0},{a:2023,p:238.6},{a:2025,p:241.9,e:true}]},
      "3EM":{LP:[{a:2017,p:245.0},{a:2019,p:248.0},{a:2021,p:250.0},{a:2023,p:254.3},{a:2025,p:264.6,e:true}],MT:[{a:2017,p:248.0},{a:2019,p:251.0},{a:2021,p:253.0},{a:2023,p:257.3},{a:2025,p:257.4,e:true}]}
    }
  },

  padroes: {
    "5EF": {LP:{ab:29.9,ba:36.3,ad:25.5,av:8.2},MT:{ab:43.3,ba:34.6,ad:17.5,av:4.6}},
    "9EF": {LP:{ab:35.8,ba:35.3,ad:23.9,av:5.2},MT:{ab:38.3,ba:51.5,ad:8.6,av:1.7}},
    "3EM": {LP:{ab:39.3,ba:34.8,ad:22.3,av:3.7},MT:{ab:46.4,ba:39.6,ad:11.3,av:2.6}}
  },

  equidade: {
    gaps: {
      "5EF": {rlp:5.9,rmt:6.1,glp:12.2,gmt:-4.9,nse:38.1},
      "9EF": {rlp:13.0,rmt:8.8,glp:14.7,gmt:-6.5,nse:40.1},
      "3EM": {rlp:11.1,rmt:7.8,glp:14.6,gmt:-7.6,nse:64.4}
    },
    evoAB: {
      "5EF_LP": [{a:2017,p:38.5},{a:2019,p:36.0},{a:2021,p:35.0},{a:2023,p:32.0},{a:2025,p:29.9,e:true}],
      "5EF_MT": [{a:2017,p:52.0},{a:2019,p:48.0},{a:2021,p:47.0},{a:2023,p:45.0},{a:2025,p:43.3,e:true}],
      "9EF_LP": [{a:2017,p:42.0},{a:2019,p:40.0},{a:2021,p:38.0},{a:2023,p:37.0},{a:2025,p:35.8,e:true}],
      "9EF_MT": [{a:2017,p:45.0},{a:2019,p:43.0},{a:2021,p:42.0},{a:2023,p:40.0},{a:2025,p:38.3,e:true}]
    }
  },

  noticias: [
    {id:1,data:"2025-06-25",titulo:"RN avança na redução do 'Abaixo do Básico' no 5º ano: queda de 8,6 pp desde 2017",cat:"equidade",tags:["abaixo do básico","5º ano","evolução","equidade"],resumo:"A rede pública do RN registrou 29,9% de estudantes no padrão 'Abaixo do Básico' em LP no 5º ano em 2025, contra 38,5% em 2017. O avanço reflete esforços de alfabetização e reforço pedagógico, mas desafios persistem em Matemática (43,3% no AB).",detalhe:"<h3>Análise Detalhada</h3><p>A redução de 8,6 pontos percentuais no 'Abaixo do Básico' em Língua Portuguesa do 5º ano do Ensino Fundamental é um dos avanços mais significativos da educação do Rio Grande do Norte na última década. Em 2017, 38,5% dos estudantes da rede pública não conseguiam ler e compreender textos simples adequados à sua etapa. Em 2025, este percentual caiu para 29,9%.</p><p><strong>Fatores associados ao avanço:</strong></p><ul><li><strong>Programa de Alfabetização na Idade Certa:</strong> investimento em formação de professores dos Anos Iniciais em metodologias de alfabetização;</li><li><strong>Acompanhamento pedagógico nas DREs prioritárias:</strong> foco em municípios com maiores taxas de 'Abaixo do Básico';</li><li><strong>Biblioteca de sala e leitura diária:</strong> universalização do acesso a livros em escolas de baixa proficiência;</li><li><strong>Diagnóstico formativo bimestral:</strong> identificação precoce de estudantes em dificuldade e reagrupamento por habilidade.</li></ul><p><strong>Desafios persistentes:</strong> Em Matemática, 43,3% dos estudantes ainda estão no 'Abaixo do Básico', o que indica que o reforço em consciência numérica e operações fundamentais ainda não atingiu a escala necessária. O gap entre LP e MT no 5º ano (13,4 pp no AB) é um dos maiores do Brasil e demanda intervenção específica.</p>",comparativo:"<p><strong>Comparativo regional:</strong> O RN ainda está abaixo da média brasileira (IDEB AI 2023: BR 5,8 vs RN 5,0), mas a trajetória de crescimento (4,3→5,3 em 8 anos) supera a de estados com perfil socioeconômico similar, como Alagoas (4,0→4,8) e Sergipe (4,2→5,0).</p>"},
    {id:2,data:"2025-06-25",titulo:"IDEB estimado do RN cresce 0,7 ponto em Anos Finais entre 2023 e 2025, maior alta da série",cat:"resultados",tags:["ideb","9º ano","crescimento","pós-pandemia"],resumo:"O IDEB estimado da rede estadual no 9º ano saltou de 3,7 (2023) para 4,1 (2025), impulsionado pela melhora de proficiência (+7,6 pts em LP) e pelo incremento da taxa de aprovação (80%→92%). A recuperação pós-pandemia mostra sinais consistentes.",detalhe:"<h3>Análise Detalhada</h3><p>O crescimento de 0,7 ponto no IDEB dos Anos Finais do RN entre 2023 e 2025 representa a maior alta da série histórica para esta etapa. O IDEB é calculado multiplicando a proficiência média (escala 0-500) pela taxa de aprovação (0-100%).</p><p><strong>Decomposição do crescimento:</strong></p><ul><li><strong>Proficiência em Língua Portuguesa:</strong> +7,6 pontos (238,6→246,2), indicando melhora na leitura e interpretação de textos mais complexos;</li><li><strong>Proficiência em Matemática:</strong> +3,3 pontos (238,6→241,9), avanço modesto mas consistente;</li><li><strong>Taxa de aprovação:</strong> +12 pontos percentuais (80%→92%), reflexo da recuperação do fluxo escolar pós-pandemia.</li></ul><p><strong>Interpretação pedagógica:</strong> O crescimento foi impulsionado tanto pela melhora de aprendizagem quanto pela recuperação do fluxo. Isso é positivo, pois indica que a escola não está apenas 'passando' estudantes sem aprendizagem (efeito 'efeito fábrica'), mas sim recuperando o ritmo de aprendizagem interrompido pela pandemia.</p><p><strong>Alerta:</strong> O IDEB de 4,1 ainda está abaixo da meta de 5,0 para 2025 e da média brasileira de 4,6. A distância para a meta é de 0,9 ponto, o que exige aceleração nas políticas de reforço escolar.</p>",comparativo:"<p><strong>Comparativo histórico:</strong> O crescimento de 0,7 pp em 2 anos supera o crescimento de 0,5 pp observado entre 2019-2021 (que foi afetado pela pandemia) e iguala o crescimento de 2017-2019 (0,4 pp). Se mantida esta taxa, o RN atingiria a meta do PNE de 5,0 em 2027.</p>"},
    {id:3,data:"2025-06-25",titulo:"Gap racial de 13 pontos no 9º ano de LP alerta para desigualdade educacional no RN",cat:"equidade",tags:["gap racial","9º ano","desigualdade","SIMAIS"],resumo:"Dados do SIMAIS Contextual 2025 revelam que estudantes PPI do 9º ano têm proficiência média de 226,8 pts em LP, contra 239,7 de brancos/amarelos. A diferença de 13 pts é a maior da série SIMAIS e demanda políticas afirmativas pedagógicas.",detalhe:"<h3>Análise Detalhada</h3><p>O gap racial de 13 pontos de proficiência em Língua Portuguesa no 9º ano do Ensino Fundamental é um indicador crítico de desigualdade educacional no Rio Grande do Norte. Para contextualizar: 13 pontos na escala SAEB correspondem a aproximadamente 1,3 anos de escolaridade — ou seja, estudantes pretos, pardos e indígenas (PPI) estão, em média, 1,3 anos 'atrasados' em relação a brancos e amarelos na mesma etapa.</p><p><strong>Dados do SIMAIS Contextual 2025:</strong></p><ul><li><strong>PPI:</strong> 226,8 pontos (perfil predominante: 'Básico'/'Abaixo do Básico');</li><li><strong>Brancos/Amarelos:</strong> 239,7 pontos (perfil predominante: 'Básico'/'Adequado');</li><li><strong>Diferença:</strong> 13,0 pontos (a maior da série, que iniciou em 2019).</li></ul><p><strong>Por que o gap aumentou?</strong></p><ul><li><strong>Efeito pandemia:</strong> estudantes PPI tinham menos acesso a internet e dispositivos durante o ensino remoto, ampliando a distância;</li><li><strong>Baixa expectativa do professorado:</strong> pesquisas indicam que professores tendem a atribuir menor capacidade a estudantes PPI, afetando o feedback e o nível de desafio das atividades;</li><li><strong>Currículo pouco contextualizado:</strong> ausência de referências culturais afro-indígenas no material didático e na biblioteca escolar.</li></ul><p><strong>Proposições de intervenção:</strong></p><ul><li>Adotar biblioteca com acervo afro-indígena e literatura produzida no RN (Lei 10.639/2003);</li><li>Formar professorado em didática antirracista e práticas de letramento crítico;</li><li>Criar programa de tutoria entre estudantes do 3º EM (alto desempenho) e 9º EF (em dificuldade);</li><li>Implementar avaliação de clima escolar por recorte racial (Questionário do Estudante do SAEB).</li></ul>",comparativo:"<p><strong>Comparativo nacional:</strong> O gap racial no RN (13 pts) está acima da média brasileira (aproximadamente 10 pts no 9º EF de LP), indicando que a desigualdade racial na educação potiguar é mais intensa que a média nacional. Estados com políticas afirmativas robustas, como Bahia e Rio de Janeiro, apresentam gaps menores (8-9 pts).</p>"},
    {id:4,data:"2025-06-25",titulo:"Matemática do 3º EM: 46,4% no 'Abaixo do Básico' é o maior desafio da educação média no RN",cat:"desafio",tags:["ensino médio","matemática","abaixo do básico","desafio"],resumo:"O Ensino Médio matricial do RN mantém gargalo histórico em Matemática, com quase metade dos estudantes no padrão mais baixo. A proficiência média de 257,4 pts está estagnada desde 2023, indicando que ganhos de fluxo escolar não se traduziram em aprendizagem efetiva.",detalhe:"<h3>Análise Detalhada</h3><p>O padrão 'Abaixo do Básico' em Matemática do 3º ano do Ensino Médio atinge 46,4% dos estudantes da rede pública do RN — quase metade. Este é o maior percentual entre todas as etapas e disciplinas avaliadas pelo SAEB no estado. Para contextualizar: um estudante no 'Abaixo do Básico' em Matemática do 3º EM não consegue resolver problemas com equações do 1º grau, interpretar gráficos de funções ou calcular probabilidades simples — habilidades esperadas para o ensino médio.</p><p><strong>Por que a Matemática do EM é o gargalo?</strong></p><ul><li><strong>Déficits acumulados:</strong> estudantes que chegam ao 1º EM com proficiência <250 no 9º EF (equivalente ao 'Básico') nunca recuperam a lacuna sem intervenção específica;</li><li><strong>Descontinuidade curricular:</strong> transição do 9º EF (álgebra elementar) para o 1º EM (funções, logaritmos, trigonometria) sem ponte pedagógica;</li><li><strong>Falta de conexão com o mundo do trabalho:</strong> Matemática ensinada de forma abstrata, sem conexão com EPT, finanças pessoais ou ciências aplicadas;</li><li><strong>Estagnação da proficiência:</strong> 257,4 pts em 2023 → 257,4 pts em 2025, indicando que o aumento do IDEB (3,2→3,9) foi impulsionado apenas pela taxa de aprovação, não pela aprendizagem.</li></ul><p><strong>Proposições de intervenção:</strong></p><ul><li>Estabelecer componente de 'Matemática de Recuperação' no 1º EM para alunos com proficiência <250 no 9º EF;</li><li>Integrar Matemática ao componente de Vida e Saúde (orçamento, financiamento, energia, água);</li><li>Utilizar plataformas adaptativas (Khan Academy, Brasil Mais Escola) no contraturno;</li><li>Avaliar impacto do currículo integrado (EPT + Matemática) nas escolas de tempo integral.</li></ul>",comparativo:"<p><strong>Comparativo regional:</strong> O RN (46,4% no AB em MT/3EM) está alinhado com estados do Nordeste como Pernambuco (45%) e Ceará (44%), mas abaixo de estados com políticas de ensino médio reformulado, como Minas Gerais (38%) e São Paulo (35%).</p>"}
  ],

  destaques: [
    {etapa:"5EF",tipo:"reducao_AB",titulo:"Rede com maior queda no 'Abaixo do Básico' em LP",desc:"A rede estadual do RN reduziu o AB em LP do 5º ano de 32% (2023) para 29,9% (2025), queda de 2,1 pp. Impulsionado pelo fortalecimento da alfabetização e acompanhamento pedagógico nas DREs prioritárias.",metrica:"-2,1 pp no AB (LP)",pratica:"Acompanhamento pedagógico intensificado nas DREs prioritárias"},
    {etapa:"9EF",tipo:"crescimento_ideb",titulo:"Maior crescimento do IDEB em Anos Finais",desc:"O IDEB estimado da rede estadual no 9º ano cresceu de 3,7 (2023) para 4,1 (2025), incremento de 0,4 ponto. Resultado conjunto da melhora de proficiência (+7,6 pts em LP) e elevação da taxa de aprovação (80%→92%).",metrica:"+0,4 ponto de IDEB",pratica:"Integração entre avaliação diagnóstica e intervenção pedagógica diferenciada"},
    {etapa:"3EM",tipo:"distribuicao",titulo:"Melhor distribuição entre padrões de desempenho em LP",desc:"O padrão 'Adequado' em LP do 3º EM cresceu de 20% (2023) para 22,3% (2025), enquanto o 'Abaixo do Básico' se manteve estável. Indica que mais estudantes estão consolidando habilidades de leitura e interpretação textual.",metrica:"+2,3 pp no Adequado (LP)",pratica:"Leitura orientada e análise textual integrada ao currículo"}
  ],

  diretorias: [
    {id:"01",nome:"DRE Natal",tipo:"metropolitana"},
    {id:"02",nome:"DRE Mossoró",tipo:"metropolitana"},
    {id:"03",nome:"DRE Caicó",tipo:"não-metropolitana"},
    {id:"04",nome:"DRE Currais Novos",tipo:"não-metropolitana"},
    {id:"05",nome:"DRE Apodi",tipo:"não-metropolitana"},
    {id:"06",nome:"DRE Pau dos Ferros",tipo:"não-metropolitana"},
    {id:"07",nome:"DRE João Câmara",tipo:"não-metropolitana"},
    {id:"08",nome:"DRE Macau",tipo:"não-metropolitana"},
    {id:"09",nome:"DRE Santa Cruz",tipo:"não-metropolitana"},
    {id:"10",nome:"DRE Assu",tipo:"não-metropolitana"},
    {id:"11",nome:"DRE Parelhas",tipo:"não-metropolitana"},
    {id:"12",nome:"DRE Nova Cruz",tipo:"não-metropolitana"},
    {id:"13",nome:"DRE Canguaretama",tipo:"não-metropolitana"},
    {id:"14",nome:"DRE Areia Branca",tipo:"não-metropolitana"},
    {id:"15",nome:"DRE Touros",tipo:"não-metropolitana"},
    {id:"16",nome:"DRE Extremoz",tipo:"metropolitana"}
  ]
};

// Dados dinâmicos (carregados via fetch)
let DADOS = JSON.parse(JSON.stringify(DADOS_BASE));
DADOS.escolas = [];
DADOS.municipios = [];
DADOS.geojson = null;

// Amostra de fallback (15 escolas) se fetch falhar
const ESCOLAS_FALLBACK = [
  ["24012056","ESCOLA MUNICIPAL DE EDUCACAO INFANTIL RAIMUNDO ALVES DA SILVA","Acari","MUNICIPAL","5EF",null,null,null,null],
  ["24011840","ESCOLA ESTADUAL ALUIZIO ALVES","Acari","ESTADUAL","5EF",null,null,null,null],
  ["24027022","ESCOLA ESTADUAL PROFESSORA MARIA TEREZA","Cerro Corá","ESTADUAL","5EF",null,null,null,null],
  ["24041023","ESCOLA ESTADUAL DEPUTADO ELIZEU VIEIRA","Extremoz","ESTADUAL","5EF",193.43,196.67,"56",0.48],
  ["24056367","ESCOLA ESTADUAL FELIPE CAMARAO","Extremoz","ESTADUAL","5EF",200.43,194.81,"56",105.7],
  ["24056499","ESCOLA ESTADUAL JOAQUIM ALEXANDRE DE ARAUJO","Extremoz","ESTADUAL","5EF",192.32,191.19,"57",35.1],
  ["24056350","ESCOLA ESTADUAL LAMARTINE BABO","Extremoz","ESTADUAL","5EF",200.51,186.75,"56",59.0],
  ["24056375","ESCOLA ESTADUAL MANOEL PINTO DE MORAIS","Extremoz","ESTADUAL","5EF",199.81,195.82,"56",7.1],
  ["24056359","ESCOLA ESTADUAL MARTINHO GUERRA","Extremoz","ESTADUAL","5EF",203.81,203.15,"56",42.0],
  ["24056383","ESCOLA ESTADUAL PROFESSOR PEDRO DE PAULA","Extremoz","ESTADUAL","5EF",195.24,196.39,"56",0.0],
  ["24056391","ESCOLA ESTADUAL TEREZINHA DE BRITO MONTE","Extremoz","ESTADUAL","5EF",208.02,197.25,"56",26.8],
  ["24056340","ESCOLA ESTADUAL VARGEM GRANDE","Extremoz","ESTADUAL","5EF",201.95,199.07,"56",14.3],
  ["24041031","ESCOLA ESTADUAL VENANCIO DA CUNHA GARCIA","Extremoz","ESTADUAL","5EF",193.44,191.99,"56",17.9],
  ["24056140","ESCOLA MUNICIPAL DE EDUCACAO INFANTIL FRANCISCO ALVES","Extremoz","MUNICIPAL","5EF",null,null,null,null],
  ["24056255","ESCOLA MUNICIPAL DE EDUCACAO INFANTIL MARIA DE LOURDES DE ARAUJO","Extremoz","MUNICIPAL","5EF",null,null,null,null]
];

const MUNICIPIOS_FALLBACK = [
  ["Acari",null,null,2],["Cerro Corá",null,null,1],["Extremoz",197.12,195.07,11]
];

function carregarDados() {
  const base = (document.querySelector('base') && document.querySelector('base').href) || '';
  const prefix = base + 'assets/data/';

  const p1 = fetch(prefix + 'escolas.json').then(r => r.json()).catch(e => { console.warn('escolas.json falhou', e); return null; });
  const p2 = fetch(prefix + 'municipios.json').then(r => r.json()).catch(e => { console.warn('municipios.json falhou', e); return null; });
  const p3 = fetch(prefix + 'geojson-rn.json').then(r => r.json()).catch(e => { console.warn('geojson-rn.json falhou', e); return null; });

  return Promise.all([p1, p2, p3]).then(([escolas, municipios, geojson]) => {
    if (escolas && escolas.data) {
      DADOS.escolas = escolas.data;
    } else if (escolas && Array.isArray(escolas)) {
      DADOS.escolas = escolas;
    } else {
      DADOS.escolas = ESCOLAS_FALLBACK;
      console.warn('Usando escolas fallback');
    }

    if (municipios && municipios.data) {
      DADOS.municipios = municipios.data;
    } else if (municipios && Array.isArray(municipios)) {
      DADOS.municipios = municipios;
    } else {
      DADOS.municipios = MUNICIPIOS_FALLBACK;
      console.warn('Usando municípios fallback');
    }

    if (geojson && geojson.features) {
      DADOS.geojson = geojson;
    } else {
      DADOS.geojson = null;
    }

    return DADOS;
  });
}

// Garante que DADOS está disponível globalmente
window.DADOS = DADOS;
window.DADOS_BASE = DADOS_BASE;
window.carregarDados = carregarDados;
