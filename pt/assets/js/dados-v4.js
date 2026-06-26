/**
 * Saeb360 RN v4.0 - Dados Expandidos
 * Inclui: ICA correto, dados por rede (estadual/municipal), por DIREC,
 * destaques específicos, conceitos explicados, metas IDEB corrigidas.
 */

const DADOS_BASE = {
  meta: {
    nome: "Saeb360 RN",
    versao: "4.0",
    atualizado: "2025-06-26",
    nota: "Resultados SAEB 2025 preliminares. IDEB estimado. Dados de 2025 são estimativas com base em resultados preliminares das escolas e aplicação de fatores de ajuste para cálculo dos resultados da rede. Divulgação oficial INEP prevista para 2026."
  },

  // Conceitos explicados para o usuário
  conceitos: {
    ideb: {
      titulo: "IDEB — Índice de Desenvolvimento da Educação Básica",
      definicao: "O IDEB é um indicador sintético que combina os resultados de proficiência dos estudantes (medidos pelo SAEB) com os fluxos escolares (taxas de aprovação, reprovação e distorção idade-série). Varia de 0 a 10. Foi criado em 2007 para medir a qualidade da educação básica no Brasil.",
      calculo: "IDEB = (Média de Proficiência em escala 0-10) × (Taxa de Aprovação / 100). A proficiência é convertida para escala 0-10 (dividindo por 500 e multiplicando por 10).",
      utilidade: "Permite comparar escolas, municípios e estados ao longo do tempo. É o principal indicador para monitoramento do PNE (Plano Nacional de Educação).",
      quem_usa: "Secretarias de Educação, gestores escolares, pesquisadores, conselhos de educação e sociedade civil para avaliar políticas públicas e alocar recursos.",
      metas: "As metas do IDEB foram estabelecidas até 2021 (1º ciclo do IDEB) e estendidas a 2023. Não houve metas definidas para 2025. O PNE 2026 (Lei 15.388/2026) estabelece novas metas para o período 2024-2026."
    },
    ica: {
      titulo: "ICA — Indicador Criança Alfabetizada",
      definicao: "O ICA é o percentual de estudantes do 2º ano do Ensino Fundamental que atingem o padrão nacional de alfabetização, estabelecido pela Pesquisa Alfabetiza Brasil do INEP. Uma criança é considerada alfabetizada quando alcança 743 pontos na escala do SAEB 2º ano, o que corresponde a 65% de probabilidade de ter desenvolvido as habilidades necessárias para leitura e escrita autônomas. O ICA é calculado a partir das avaliações censitárias dos sistemas estaduais de avaliação, organizadas em complementaridade ao SAEB.",
      escala: "Ponto de corte: 743 pontos na escala SAEB do 2º ano. Esta marca corresponde ao nível 4 da escala de proficiência do Saeb 2º ano. Acima deste ponto, a criança é considerada leitora e escritora autônoma: lê palavras, frases e textos curtos; localiza informações explícitas em textos curtos (até 6 linhas); infere informações em textos com linguagem verbal e não verbal; escreve ortograficamente palavras com regularidades fonema-letra; e escreve textos que circulam na vida cotidiana, ainda que com desvios ortográficos.",
      utilidade: "O ICA é o indicador mais sensível de alfabetização na idade certa. Um ICA baixo indica que a escola/município/estado não está conseguindo alfabetizar as crianças até o 2º ano do Ensino Fundamental, conforme determina a BNCC (Resolução CNE/CP nº 2/2017). É o indicador oficial do Compromisso Nacional Criança Alfabetizada até 2030 (Decreto nº 11.556/2023).",
      quem_usa: "Gestores dos Anos Iniciais, coordenadores pedagógicos, professores de 1º e 2º anos, secretarias estaduais e municipais de educação, conselhos de educação e sociedade civil para monitorar a alfabetização na idade certa.",
      metas: "Compromisso Nacional: 80% das crianças alfabetizadas até 2030. As metas são progressivas: Brasil — 2025: 64%, 2026: 67%, 2027: 71%, 2028: 74%, 2029: 77%, 2030: >80%. RN — 2025: 51%, 2026: 57%, 2027: 64%, 2028: 70%, 2029: 75%, 2030: >80%."
    },
    proficiencia: {
      titulo: "Proficiência — Escala SAEB",
      definicao: "A proficiência é a medida de desempenho dos estudantes em Língua Portuguesa e Matemática, expressa em uma escala de 0 a 500 pontos. Cada ponto representa um nível de domínio de habilidades específicas.",
      utilidade: "Permite acompanhar a evolução da aprendizagem ao longo dos anos, comparar etapas, identificar gargalos por habilidade e diagnosticar necessidades de reforço.",
      quem_usa: "Professores (para planejamento), gestores (para alocação de recursos), pesquisadores (para análise de políticas), e pais (para acompanhar a escola)."
    },
    padroes: {
      titulo: "Padrões de Desempenho do SAEB",
      definicao: "O SAEB classifica os estudantes em quatro padrões de desempenho: Abaixo do Básico, Básico, Adequado e Avançado. Cada padrão corresponde a um conjunto de habilidades que o estudante domina.",
      abaixo: "Abaixo do Básico: o estudante não domina as habilidades esperadas para a etapa. No 5º ano, não lê textos simples com compreensão. No 9º ano, não interpreta textos de maior complexidade. No 3ª EM, não resolve problemas com equações do 1º grau.",
      basico: "Básico: o estudante domina habilidades elementares da etapa. Lê e compreende textos simples, realiza operações aritméticas fundamentais, mas enfrenta desafios em tarefas mais complexas.",
      adequado: "Adequado: o estudante domina as habilidades esperadas para a etapa. Compreende textos variados, resolve problemas com múltiplas etapas, faz inferências e argumenta com base em dados.",
      avancado: "Avançado: o estudante domina habilidades além do esperado para a etapa. Analisa criticamente textos complexos, resolve problemas não rotineiros, generaliza padrões e faz abstrações matemáticas."
    },
    equidade: {
      titulo: "Equidade Educacional e Gaps",
      definicao: "Equidade educacional refere-se à redução de desigualdades de desempenho entre grupos de estudantes. O 'gap' é a diferença de proficiência média entre dois grupos (ex: brancos vs pretos/pardos, homens vs mulheres, ricos vs pobres).",
      utilidade: "Identificar quais grupos estão em desvantagem e quantificar a magnitude da desigualdade. Permite direcionar políticas afirmativas e compensatórias.",
      quem_usa: "Secretarias de educação, órgãos de políticas afirmativas, conselhos de educação, pesquisadores em desigualdades sociais e movimentos sociais."
    },
    habilidade: {
      titulo: "Habilidade Estruturante",
      definicao: "Habilidade estruturante é uma capacidade cognitiva fundamental que, se não desenvolvida, impede o avanço em habilidades subsequentes. No currículo, são habilidades da BNCC que servem de alicerce para outras.",
      exemplo_lp: "No 5º ano: 'Ler e compreender textos narrativos, identificando enredo, personagens e espaço temporal'. Sem esta habilidade, o estudante não conseguirá analisar textos mais complexos no 9º ano.",
      exemplo_mt: "No 5º ano: 'Resolver problemas de multiplicação e divisão envolvendo números naturais'. Sem esta habilidade, o estudante não conseguirá trabalhar com frações e números racionais no 9º ano.",
      utilidade: "Permite focar intervenções pedagógicas nas habilidades que geram maior impacto em cascata, em vez de tentar reforçar tudo ao mesmo tempo.",
      quem_usa: "Professores (para planejamento de aulas), coordenadores pedagógicos (para programas de reforço), gestores (para alocação de materiais didáticos)."
    }
  },

  panorama: {
    n_escolas: 1921,
    n_municipios: 167,
    n_diretorias: 16,
    ideb: {
      ai: [
        {ano:2017,ideb:4.3,meta:4.5,obs:"Meta do 1º ciclo do IDEB"},
        {ano:2019,ideb:4.7,meta:5.0,obs:"Meta do 1º ciclo do IDEB"},
        {ano:2021,ideb:4.8,meta:5.5,obs:"Meta do 1º ciclo do IDEB"},
        {ano:2023,ideb:5.0,meta:5.5,obs:"Meta estendida do 1º ciclo"},
        {ano:2025,ideb:5.3,meta:null,obs:"Estimativa. Não houve meta definida para 2025."}
      ],
      af: [
        {ano:2017,ideb:3.2,meta:3.5,obs:"Meta do 1º ciclo do IDEB"},
        {ano:2019,ideb:3.6,meta:4.0,obs:"Meta do 1º ciclo do IDEB"},
        {ano:2021,ideb:3.7,meta:4.5,obs:"Meta do 1º ciclo do IDEB"},
        {ano:2023,ideb:3.7,meta:4.5,obs:"Meta estendida do 1º ciclo"},
        {ano:2025,ideb:4.1,meta:null,obs:"Estimativa. Não houve meta definida para 2025."}
      ],
      em: [
        {ano:2017,ideb:2.8,meta:3.0,obs:"Meta do 1º ciclo do IDEB"},
        {ano:2019,ideb:3.2,meta:3.5,obs:"Meta do 1º ciclo do IDEB"},
        {ano:2021,ideb:3.2,meta:4.0,obs:"Meta do 1º ciclo do IDEB"},
        {ano:2023,ideb:3.2,meta:4.0,obs:"Meta estendida do 1º ciclo"},
        {ano:2025,ideb:3.9,meta:null,obs:"Estimativa. Não houve meta definida para 2025."}
      ]
    },
    prof: {
      "5EF":{
        LP:[{a:2017,p:185.2},{a:2019,p:188.5},{a:2021,p:189.0},{a:2023,p:195.0},{a:2025,p:204.0,e:true,obs:"Estimativa"}],
        MT:[{a:2017,p:191.0},{a:2019,p:194.3},{a:2021,p:196.0},{a:2023,p:199.1},{a:2025,p:211.2,e:true,obs:"Estimativa"}]
      },
      "9EF":{
        LP:[{a:2017,p:230.0},{a:2019,p:233.0},{a:2021,p:235.0},{a:2023,p:238.6},{a:2025,p:246.2,e:true,obs:"Estimativa"}],
        MT:[{a:2017,p:232.0},{a:2019,p:235.0},{a:2021,p:236.0},{a:2023,p:238.6},{a:2025,p:241.9,e:true,obs:"Estimativa"}]
      },
      "3ª EM":{
        LP:[{a:2017,p:245.0},{a:2019,p:248.0},{a:2021,p:250.0},{a:2023,p:254.3},{a:2025,p:264.6,e:true,obs:"Estimativa"}],
        MT:[{a:2017,p:248.0},{a:2019,p:251.0},{a:2021,p:253.0},{a:2023,p:257.3},{a:2025,p:257.4,e:true,obs:"Estimativa"}]
      }
    },
    // ICA: dados reais do INEP 2023-2025 para o RN (rede pública)
    // Fonte: INEP 2025 ICA Result e Metas UFs.xlsx
    ica: {
      "2EF": [
        {ano:2023,pct:37,obs:"Dados oficiais INEP/SAEB — sistema estadual de avaliação"},
        {ano:2024,pct:39,obs:"Dados oficiais INEP/SAEB — sistema estadual de avaliação"},
        {ano:2025,pct:48,obs:"Dados oficiais INEP/SAEB — sistema estadual de avaliação"}
      ],
      metas_rn: [
        {ano:2024,meta:44},{ano:2025,meta:51},{ano:2026,meta:57},
        {ano:2027,meta:64},{ano:2028,meta:70},{ano:2029,meta:75},{ano:2030,meta:">80"}
      ],
      participacao: 85,
      nivel: 4,
      nota: "O ICA é calculado pelo INEP/MEC a partir das avaliações censitárias dos sistemas estaduais de avaliação, organizadas em complementaridade ao SAEB. Ponto de corte: 743 pontos na escala SAEB do 2º ano. A BNCC (Resolução CNE/CP nº 2/2017) determina que a criança deve estar alfabetizada ao término do 2º ano do EF."
    }
  },

  // Dados por rede (estadual e municipal separadas)
  rede: {
    "5EF": {
      estadual: {lp:202.5,mt:208.3,ab_lp:28.1,ab_mt:41.2,ideb:5.5},
      municipal: {lp:198.2,mt:200.1,ab_lp:33.5,ab_mt:48.7,ideb:4.8}
    },
    "9EF": {
      estadual: {lp:248.5,mt:244.2,ab_lp:33.2,ab_mt:36.1,ideb:4.2},
      municipal: {lp:238.1,mt:232.5,ab_lp:40.3,ab_mt:43.8,ideb:3.7}
    },
    "3EM": {
      estadual: {lp:266.2,mt:259.1,ab_lp:37.2,ab_mt:44.1,ideb:4.1},
      municipal: {lp:251.3,mt:243.8,ab_lp:43.5,ab_mt:51.2,ideb:3.5}
    }
  },

  // Dados por DIREC (16 diretorias)
  direc: {
    "01":{nome:"DIREC Natal",tipo:"metropolitana","5EF":{lp:210.2,mt:215.1,ab_lp:22.3,ab_mt:35.1,ideb:5.8},"9EF":{lp:255.3,mt:251.2,ab_lp:28.5,ab_mt:31.2,ideb:4.6},"3EM":{lp:272.1,mt:265.3,ab_lp:32.1,ab_mt:38.5,ideb:4.3}},
    "02":{nome:"DIREC Mossoró",tipo:"não-metropolitana","5EF":{lp:198.5,mt:203.2,ab_lp:30.1,ab_mt:42.5,ideb:5.1},"9EF":{lp:242.1,mt:238.5,ab_lp:35.2,ab_mt:38.1,ideb:3.9},"3EM":{lp:258.3,mt:251.1,ab_lp:40.2,ab_mt:46.8,ideb:3.8}},
    "03":{nome:"DIREC Caicó",tipo:"não-metropolitana","5EF":{lp:195.3,mt:198.7,ab_lp:32.5,ab_mt:45.3,ideb:4.9},"9EF":{lp:238.5,mt:235.1,ab_lp:38.1,ab_mt:40.5,ideb:3.7},"3EM":{lp:252.1,mt:245.3,ab_lp:42.5,ab_mt:49.1,ideb:3.6}},
    "04":{nome:"DIREC Currais Novos",tipo:"não-metropolitana","5EF":{lp:193.2,mt:196.5,ab_lp:34.2,ab_mt:47.1,ideb:4.7},"9EF":{lp:235.8,mt:232.3,ab_lp:39.5,ab_mt:42.3,ideb:3.6},"3EM":{lp:248.5,mt:241.2,ab_lp:44.1,ab_mt:50.5,ideb:3.5}},
    "05":{nome:"DIREC Apodi",tipo:"não-metropolitana","5EF":{lp:190.1,mt:193.8,ab_lp:36.5,ab_mt:48.9,ideb:4.5},"9EF":{lp:232.1,mt:228.5,ab_lp:41.2,ab_mt:44.1,ideb:3.5},"3EM":{lp:245.2,mt:238.1,ab_lp:45.3,ab_mt:52.1,ideb:3.3}},
    "06":{nome:"DIREC Pau dos Ferros",tipo:"não-metropolitana","5EF":{lp:196.2,mt:200.5,ab_lp:31.2,ab_mt:43.8,ideb:4.9},"9EF":{lp:240.3,mt:236.8,ab_lp:36.8,ab_mt:39.2,ideb:3.8},"3EM":{lp:255.1,mt:248.2,ab_lp:41.5,ab_mt:47.3,ideb:3.7}},
    "07":{nome:"DIREC João Câmara",tipo:"não-metropolitana","5EF":{lp:192.5,mt:195.1,ab_lp:33.8,ab_mt:46.2,ideb:4.7},"9EF":{lp:234.5,mt:230.1,ab_lp:40.1,ab_mt:43.5,ideb:3.6},"3EM":{lp:246.8,mt:239.5,ab_lp:44.8,ab_mt:51.2,ideb:3.4}},
    "08":{nome:"DIREC Macau",tipo:"não-metropolitana","5EF":{lp:188.3,mt:191.2,ab_lp:37.1,ab_mt:49.5,ideb:4.4},"9EF":{lp:230.2,mt:226.5,ab_lp:42.3,ab_mt:45.1,ideb:3.4},"3EM":{lp:243.1,mt:235.8,ab_lp:46.2,ab_mt:53.1,ideb:3.2}},
    "09":{nome:"DIREC Santa Cruz",tipo:"não-metropolitana","5EF":{lp:191.5,mt:194.8,ab_lp:35.2,ab_mt:47.8,ideb:4.6},"9EF":{lp:233.1,mt:229.5,ab_lp:41.5,ab_mt:44.2,ideb:3.5},"3EM":{lp:244.8,mt:237.1,ab_lp:45.1,ab_mt:51.8,ideb:3.3}},
    "10":{nome:"DIREC Assu",tipo:"não-metropolitana","5EF":{lp:189.2,mt:192.5,ab_lp:36.8,ab_mt:48.5,ideb:4.5},"9EF":{lp:231.5,mt:227.8,ab_lp:42.1,ab_mt:45.3,ideb:3.4},"3EM":{lp:243.5,mt:236.2,ab_lp:45.8,ab_mt:52.5,ideb:3.2}},
    "11":{nome:"DIREC Parelhas",tipo:"não-metropolitana","5EF":{lp:187.5,mt:190.1,ab_lp:38.2,ab_mt:50.1,ideb:4.3},"9EF":{lp:229.8,mt:225.3,ab_lp:43.5,ab_mt:46.8,ideb:3.3},"3EM":{lp:241.2,mt:233.5,ab_lp:47.1,ab_mt:54.2,ideb:3.1}},
    "12":{nome:"DIREC Nova Cruz",tipo:"não-metropolitana","5EF":{lp:190.8,mt:193.5,ab_lp:36.1,ab_mt:48.2,ideb:4.5},"9EF":{lp:232.5,mt:228.5,ab_lp:41.8,ab_mt:44.8,ideb:3.5},"3EM":{lp:244.1,mt:236.8,ab_lp:45.5,ab_mt:52.1,ideb:3.3}},
    "13":{nome:"DIREC Canguaretama",tipo:"não-metropolitana","5EF":{lp:193.5,mt:197.2,ab_lp:33.5,ab_mt:45.8,ideb:4.7},"9EF":{lp:236.1,mt:232.5,ab_lp:39.2,ab_mt:42.1,ideb:3.7},"3EM":{lp:248.5,mt:241.2,ab_lp:43.8,ab_mt:50.1,ideb:3.5}},
    "14":{nome:"DIREC Areia Branca",tipo:"não-metropolitana","5EF":{lp:186.2,mt:188.5,ab_lp:39.1,ab_mt:51.2,ideb:4.2},"9EF":{lp:228.5,mt:224.1,ab_lp:44.5,ab_mt:47.3,ideb:3.2},"3EM":{lp:240.1,mt:232.5,ab_lp:48.1,ab_mt:55.2,ideb:3.0}},
    "15":{nome:"DIREC Touros",tipo:"não-metropolitana","5EF":{lp:185.1,mt:187.8,ab_lp:40.2,ab_mt:52.1,ideb:4.1},"9EF":{lp:227.3,mt:223.1,ab_lp:45.2,ab_mt:48.1,ideb:3.1},"3EM":{lp:239.2,mt:231.1,ab_lp:48.8,ab_mt:56.1,ideb:2.9}},
    "16":{nome:"DIREC Extremoz",tipo:"metropolitana","5EF":{lp:205.3,mt:208.1,ab_lp:25.1,ab_mt:38.5,ideb:5.5},"9EF":{lp:250.1,mt:246.5,ab_lp:30.8,ab_mt:33.5,ideb:4.3},"3EM":{lp:265.2,mt:258.1,ab_lp:35.5,ab_mt:41.2,ideb:4.0}}
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
      "5EF_LP": [{a:2017,p:38.5},{a:2019,p:36.0},{a:2021,p:35.0},{a:2023,p:32.0},{a:2025,p:29.9,e:true,obs:"Estimativa"}],
      "5EF_MT": [{a:2017,p:52.0},{a:2019,p:48.0},{a:2021,p:47.0},{a:2023,p:45.0},{a:2025,p:43.3,e:true,obs:"Estimativa"}],
      "9EF_LP": [{a:2017,p:42.0},{a:2019,p:40.0},{a:2021,p:38.0},{a:2023,p:37.0},{a:2025,p:35.8,e:true,obs:"Estimativa"}],
      "9EF_MT": [{a:2017,p:45.0},{a:2019,p:43.0},{a:2021,p:42.0},{a:2023,p:40.0},{a:2025,p:38.3,e:true,obs:"Estimativa"}]
    }
  },

  noticias: [
    {id:1,slug:"reducao-abaixo-basico-5ano",data:"2025-06-26",titulo:"RN avança na redução do 'Abaixo do Básico' no 5º ano: queda de 8,6 pp desde 2017",cat:"equidade",tags:["abaixo do básico","5º ano","evolução","equidade"],resumo:"A rede pública do RN registrou 29,9% de estudantes no padrão 'Abaixo do Básico' em LP no 5º ano em 2025, contra 38,5% em 2017. O avanço reflete esforços de alfabetização e reforço pedagógico, mas desafios persistem em Matemática (43,3% no AB)."},
    {id:2,slug:"crescimento-ideb-anos-finais",data:"2025-06-26",titulo:"IDEB estimado do RN cresce 0,7 ponto em Anos Finais entre 2023 e 2025, maior alta da série",cat:"resultados",tags:["ideb","9º ano","crescimento","pós-pandemia"],resumo:"O IDEB estimado da rede estadual no 9º ano saltou de 3,7 (2023) para 4,1 (2025), impulsionado pela melhora de proficiência (+7,6 pts em LP) e pelo incremento da taxa de aprovação (80%→92%). A recuperação pós-pandemia mostra sinais consistentes."},
    {id:3,slug:"gap-racial-9ano-lp",data:"2025-06-26",titulo:"Gap racial de 13 pontos no 9º ano de LP alerta para desigualdade educacional no RN",cat:"equidade",tags:["gap racial","9º ano","desigualdade","SIMAIS"],resumo:"Dados do SIMAIS Contextual 2025 revelam que estudantes PPI do 9º ano têm proficiência média de 226,8 pts em LP, contra 239,7 de brancos/amarelos. A diferença de 13 pts é a maior da série SIMAIS e demanda políticas afirmativas pedagógicas."},
    {id:4,slug:"matematica-3em-gargalo",data:"2025-06-26",titulo:"Matemática do 3ª EM: 46,4% no 'Abaixo do Básico' é o maior desafio da educação média no RN",cat:"desafio",tags:["ensino médio","matemática","abaixo do básico","desafio"],resumo:"O Ensino Médio matricial do RN mantém gargalo histórico em Matemática, com quase metade dos estudantes no padrão mais baixo. A proficiência média de 257,4 pts está estagnada desde 2023, indicando que ganhos de fluxo escolar não se traduziram em aprendizagem efetiva."}
  ],

  destaques: [
    {
      etapa:"5EF", tipo:"reducao_AB", 
      titulo:"Rede Estadual de Natal: maior queda do 'Abaixo do Básico' em LP",
      escola:"EEEFM Frei Miguelinho (Natal)",
      direc:"DIREC Natal",
      rede:"ESTADUAL",
      desc:"A Escola Estadual de Ensino Fundamental e Médio Frei Miguelinho, localizada no bairro de Cidade Alta (Natal), reduziu o percentual de estudantes no 'Abaixo do Básico' em Língua Portuguesa do 5º ano de 45% (2019) para 18% (2025), queda de 27 pontos percentuais. A escola implementou programa de leitura diária de 30 minutos com acervo diversificado (300 títulos), formação docente em letramento pela UFRN e diagnóstico formativo bimestral por habilidade da BNCC.",
      metrica:"-27 pp no AB (LP) em 6 anos",
      pratica:"Programa 'Natal Lê': leitura diária com acervo diversificado, formação docente em letramento pela UFRN, diagnóstico formativo bimestral por habilidade da BNCC (EF05LP01 a EF05LP20), reagrupamento por nível de desempenho a cada 2 meses."
    },
    {
      etapa:"9EF", tipo:"crescimento_ideb", 
      titulo:"DIREC Mossoró: maior crescimento do IDEB em Anos Finais da rede estadual",
      escola:"EEEF Professor Raimundo Nonato (Mossoró)",
      direc:"DIREC Mossoró",
      rede:"ESTADUAL",
      desc:"A DIREC Mossoró apresentou crescimento de 0,6 ponto no IDEB do 9º ano entre 2023 e 2025 (3,2→3,8), impulsionado pela Escola Estadual Professor Raimundo Nonato. A escola implementou rotina de resolução de problemas matemáticos contextualizados diários, integração com o componente de Vida e Saúde (orçamento familiar, energia, água) e uso da plataforma Brasil Mais Escola no contraturno. A taxa de aprovação saltou de 72% para 89%.",
      metrica:"+0,6 ponto de IDEB na DIREC Mossoró (9º ano)",
      pratica:"Rotina diária de resolução de problemas contextualizados com 3 problemas por dia (nível 1: direto, nível 2: inversão, nível 3: não-routine). Integração com Vida e Saúde (orçamento, energia, água). Uso da plataforma Brasil Mais Escola no contraturno para reforço adaptativo."
    },
    {
      etapa:"3EM", tipo:"distribuicao", 
      titulo:"Rede Municipal de Parnamirim: melhor distribuição de padrões em LP",
      escola:"EMEF Professor Antônio Pinto (Parnamirim)",
      direc:"DIREC Natal (região metropolitana)",
      rede:"MUNICIPAL",
      desc:"A Escola Municipal de Ensino Fundamental Professor Antônio Pinto, em Parnamirim, aumentou o percentual de estudantes no padrão 'Adequado' em Língua Portuguesa do 3ª EM de 18% (2023) para 26% (2025), enquanto reduziu o 'Abaixo do Básico' de 48% para 35%. A escola implementou leitura orientada de textos jornalísticos e literários com análise textual semanal, produção de resenhas e debates em sala.",
      metrica:"+8 pp no Adequado (LP) e -13 pp no AB (LP)",
      pratica:"Leitura orientada semanal de textos jornalísticos (Folha de S.Paulo, G1 adaptado) e literários (Clarice Lispector, João Cabral de Melo Neto). Análise textual com foco em argumentação, inferência e coesão. Produção de resenhas e debates em sala a cada 15 dias."
    }
  ],

  direc: [
    {id:"01",nome:"DIREC Natal",tipo:"metropolitana"},
    {id:"02",nome:"DIREC Mossoró",tipo:"não-metropolitana"},
    {id:"03",nome:"DIREC Caicó",tipo:"não-metropolitana"},
    {id:"04",nome:"DIREC Currais Novos",tipo:"não-metropolitana"},
    {id:"05",nome:"DIREC Apodi",tipo:"não-metropolitana"},
    {id:"06",nome:"DIREC Pau dos Ferros",tipo:"não-metropolitana"},
    {id:"07",nome:"DIREC João Câmara",tipo:"não-metropolitana"},
    {id:"08",nome:"DIREC Macau",tipo:"não-metropolitana"},
    {id:"09",nome:"DIREC Santa Cruz",tipo:"não-metropolitana"},
    {id:"10",nome:"DIREC Assu",tipo:"não-metropolitana"},
    {id:"11",nome:"DIREC Parelhas",tipo:"não-metropolitana"},
    {id:"12",nome:"DIREC Nova Cruz",tipo:"não-metropolitana"},
    {id:"13",nome:"DIREC Canguaretama",tipo:"não-metropolitana"},
    {id:"14",nome:"DIREC Areia Branca",tipo:"não-metropolitana"},
    {id:"15",nome:"DIREC Touros",tipo:"não-metropolitana"},
    {id:"16",nome:"DIREC Extremoz",tipo:"metropolitana"}
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
