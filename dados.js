const DADOS = {
  meta: {
    nome_projeto: "Saeb360 RN",
    versao: "2.0.0",
    atualizado_em: "2025-06-24",
    fontes: [
      "INEP - SAEB/IDEB 2017, 2019, 2021, 2023, 2025 (preliminar)",
      "SEEC-RN - SIMAIS Alfa e Somativa 2025",
      "SEEC-RN - IDERN 2024",
      "Sigeduc/SEEC-RN - Taxas de Aprovação 2025",
      "Qedu.org.br - Dados Educacionais RN",
      "Todos pela Educação - Panorama RN 2023",
      "IBGE - GeoJSON municípios RN"
    ],
    responsavel: "SUAVE/SEEC/RN - Afonso Gomes Ferreira Filho",
    nota_2025: "Resultados SAEB 2025 preliminares. IDEB estimado. Divulgação oficial INEP prevista para 08/06/2026."
  },

  panorama: {
    uf: "Rio Grande do Norte",
    sigla: "RN",
    n_municipios: 167,
    n_diretorias: 16,
    n_escolas_estaduais_2025: { "5EF": 177, "9EF": 248, "3EM": 308 },
    n_escolas_municipais_2025: { "5EF": 737, "9EF": 451, "3EM": 0 },
    ideb_historico: {
      anos_iniciais: [
        { ano: 2017, ideb: 4.3, meta: 4.5 },
        { ano: 2019, ideb: 4.7, meta: 5.0 },
        { ano: 2021, ideb: 4.8, meta: 5.5 },
        { ano: 2023, ideb: 5.0, meta: 5.5 },
        { ano: 2025, ideb: 5.3, meta: 6.0, estimado: true }
      ],
      anos_finais: [
        { ano: 2017, ideb: 3.2, meta: 3.5 },
        { ano: 2019, ideb: 3.6, meta: 4.0 },
        { ano: 2021, ideb: 3.7, meta: 4.5 },
        { ano: 2023, ideb: 3.7, meta: 4.5 },
        { ano: 2025, ideb: 4.1, meta: 5.0, estimado: true }
      ],
      ensino_medio: [
        { ano: 2017, ideb: 2.8, meta: 3.0 },
        { ano: 2019, ideb: 3.2, meta: 3.5 },
        { ano: 2021, ideb: 3.2, meta: 4.0 },
        { ano: 2023, ideb: 3.2, meta: 4.0 },
        { ano: 2025, ideb: 3.9, meta: 4.5, estimado: true }
      ]
    },
    proficiencia: {
      "5EF": {
        LP: [{ano: 2017, pts: 185.2}, {ano: 2019, pts: 188.5}, {ano: 2021, pts: 189.0}, {ano: 2023, pts: 195.0}, {ano: 2025, pts: 204.0, estimado: true}],
        MT: [{ano: 2017, pts: 191.0}, {ano: 2019, pts: 194.3}, {ano: 2021, pts: 196.0}, {ano: 2023, pts: 199.1}, {ano: 2025, pts: 211.2, estimado: true}]
      },
      "9EF": {
        LP: [{ano: 2017, pts: 230.0}, {ano: 2019, pts: 233.0}, {ano: 2021, pts: 235.0}, {ano: 2023, pts: 238.6}, {ano: 2025, pts: 246.2, estimado: true}],
        MT: [{ano: 2017, pts: 232.0}, {ano: 2019, pts: 235.0}, {ano: 2021, pts: 236.0}, {ano: 2023, pts: 238.6}, {ano: 2025, pts: 241.9, estimado: true}]
      },
      "3EM": {
        LP: [{ano: 2017, pts: 245.0}, {ano: 2019, pts: 248.0}, {ano: 2021, pts: 250.0}, {ano: 2023, pts: 254.3}, {ano: 2025, pts: 264.6, estimado: true}],
        MT: [{ano: 2017, pts: 248.0}, {ano: 2019, pts: 251.0}, {ano: 2021, pts: 253.0}, {ano: 2023, pts: 257.3}, {ano: 2025, pts: 257.4, estimado: true}]
      }
    }
  },

  padroes: {
    nomenclatura_inep: ["Abaixo do Básico", "Básico", "Adequado", "Avançado"],
    "5EF": { LP: { abaixo: 29.9, basico: 36.3, adequado: 25.5, avancado: 8.2 }, MT: { abaixo: 43.3, basico: 34.6, adequado: 17.5, avancado: 4.6 } },
    "9EF": { LP: { abaixo: 35.8, basico: 35.3, adequado: 23.9, avancado: 5.2 }, MT: { abaixo: 38.3, basico: 51.5, adequado: 8.6, avancado: 1.7 } },
    "3EM": { LP: { abaixo: 39.3, basico: 34.8, adequado: 22.3, avancado: 3.7 }, MT: { abaixo: 46.4, basico: 39.6, adequado: 11.3, avancado: 2.6 } }
  },

  equidade: {
    gaps: {
      "5EF": { racial_LP: 5.9, racial_MT: 6.1, genero_LP: 12.2, genero_MT: -4.9, nse_baixo: 38.1 },
      "9EF": { racial_LP: 13.0, racial_MT: 8.8, genero_LP: 14.7, genero_MT: -6.5, nse_baixo: 40.1 },
      "3EM": { racial_LP: 11.1, racial_MT: 7.8, genero_LP: 14.6, genero_MT: -7.6, nse_baixo: 64.4 }
    },
    evolucao_AB: {
      "5EF_LP": [{ano: 2017, pct: 38.5}, {ano: 2019, pct: 36.0}, {ano: 2021, pct: 35.0}, {ano: 2023, pct: 32.0}, {ano: 2025, pct: 29.9, estimado: true}],
      "5EF_MT": [{ano: 2017, pct: 52.0}, {ano: 2019, pct: 48.0}, {ano: 2021, pct: 47.0}, {ano: 2023, pct: 45.0}, {ano: 2025, pct: 43.3, estimado: true}],
      "9EF_LP": [{ano: 2017, pct: 42.0}, {ano: 2019, pct: 40.0}, {ano: 2021, pct: 38.0}, {ano: 2023, pct: 37.0}, {ano: 2025, pct: 35.8, estimado: true}],
      "9EF_MT": [{ano: 2017, pct: 45.0}, {ano: 2019, pct: 43.0}, {ano: 2021, pct: 42.0}, {ano: 2023, pct: 40.0}, {ano: 2025, pct: 38.3, estimado: true}]
    }
  },

  diretorias: [
    { id: "01", nome: "DRE Natal", tipo: "metropolitana" },
    { id: "02", nome: "DRE Mossoró", tipo: "não-metropolitana" },
    { id: "03", nome: "DRE Caicó", tipo: "não-metropolitana" },
    { id: "04", nome: "DRE Currais Novos", tipo: "não-metropolitana" },
    { id: "05", nome: "DRE Apodi", tipo: "não-metropolitana" },
    { id: "06", nome: "DRE Pau dos Ferros", tipo: "não-metropolitana" },
    { id: "07", nome: "DRE João Câmara", tipo: "não-metropolitana" },
    { id: "08", nome: "DRE Macau", tipo: "não-metropolitana" },
    { id: "09", nome: "DRE Santa Cruz", tipo: "não-metropolitana" },
    { id: "10", nome: "DRE Assu", tipo: "não-metropolitana" },
    { id: "11", nome: "DRE Parelhas", tipo: "não-metropolitana" },
    { id: "12", nome: "DRE Nova Cruz", tipo: "não-metropolitana" },
    { id: "13", nome: "DRE Canguaretama", tipo: "não-metropolitana" },
    { id: "14", nome: "DRE Areia Branca", tipo: "não-metropolitana" },
    { id: "15", nome: "DRE Touros", tipo: "não-metropolitana" },
    { id: "16", nome: "DRE Extremoz", tipo: "metropolitana" }
  ],

  municipios: [
    { nome: "Natal", cod: "240810", ideb_2023_ai: 5.2, ideb_2023_af: 3.9, ideb_2023_em: 3.5, pop: 896708, tipo: "metropolitana", direc: "01" },
    { nome: "Mossoró", cod: "240800", ideb_2023_ai: 4.8, ideb_2023_af: 3.5, ideb_2023_em: 3.1, pop: 300618, tipo: "não-metropolitana", direc: "02" },
    { nome: "Parnamirim", cod: "240325", ideb_2023_ai: 5.0, ideb_2023_af: 3.7, ideb_2023_em: 3.3, pop: 267036, tipo: "metropolitana", direc: "01" },
    { nome: "São Gonçalo do Amarante", cod: "241200", ideb_2023_ai: 4.6, ideb_2023_af: 3.4, ideb_2023_em: 3.0, pop: 109253, tipo: "metropolitana", direc: "16" },
    { nome: "Macau", cod: "240710", ideb_2023_ai: 4.5, ideb_2023_af: 3.3, ideb_2023_em: 2.9, pop: 62309, tipo: "não-metropolitana", direc: "08" },
    { nome: "Caicó", cod: "240200", ideb_2023_ai: 4.9, ideb_2023_af: 3.6, ideb_2023_em: 3.2, pop: 68627, tipo: "não-metropolitana", direc: "03" },
    { nome: "Currais Novos", cod: "240310", ideb_2023_ai: 5.1, ideb_2023_af: 3.8, ideb_2023_em: 3.4, pop: 45247, tipo: "não-metropolitana", direc: "04" },
    { nome: "Apodi", cod: "240100", ideb_2023_ai: 4.4, ideb_2023_af: 3.2, ideb_2023_em: 2.8, pop: 36120, tipo: "não-metropolitana", direc: "05" },
    { nome: "Pau dos Ferros", cod: "240940", ideb_2023_ai: 4.7, ideb_2023_af: 3.5, ideb_2023_em: 3.1, pop: 29450, tipo: "não-metropolitana", direc: "06" },
    { nome: "João Câmara", cod: "240580", ideb_2023_ai: 4.3, ideb_2023_af: 3.1, ideb_2023_em: 2.7, pop: 32316, tipo: "não-metropolitana", direc: "07" },
    { nome: "Acari", cod: "240010", ideb_2023_ai: 6.8, ideb_2023_af: 4.5, ideb_2023_em: 4.0, pop: 11269, tipo: "não-metropolitana", direc: "03" },
    { nome: "Ipueira", cod: "240490", ideb_2023_ai: 5.5, ideb_2023_af: 4.0, ideb_2023_em: 3.5, pop: 2192, tipo: "não-metropolitana", direc: "03" },
    { nome: "Lajes Pintadas", cod: "240790", ideb_2023_ai: 5.2, ideb_2023_af: 3.8, ideb_2023_em: 3.3, pop: 4656, tipo: "não-metropolitana", direc: "06" },
    { nome: "Cerro Corá", cod: "240270", ideb_2023_ai: 5.0, ideb_2023_af: 3.7, ideb_2023_em: 3.2, pop: 10263, tipo: "não-metropolitana", direc: "04" },
    { nome: "Touros", cod: "241440", ideb_2023_ai: 4.6, ideb_2023_af: 3.4, ideb_2023_em: 3.0, pop: 34698, tipo: "não-metropolitana", direc: "15" },
    { nome: "Canguaretama", cod: "240220", ideb_2023_ai: 4.8, ideb_2023_af: 3.5, ideb_2023_em: 3.1, pop: 34347, tipo: "não-metropolitana", direc: "13" },
    { nome: "Nova Cruz", cod: "240820", ideb_2023_ai: 4.7, ideb_2023_af: 3.4, ideb_2023_em: 3.0, pop: 38356, tipo: "não-metropolitana", direc: "12" },
    { nome: "Assu", cod: "240020", ideb_2023_ai: 4.9, ideb_2023_af: 3.6, ideb_2023_em: 3.2, pop: 58328, tipo: "não-metropolitana", direc: "10" },
    { nome: "Santa Cruz", cod: "241120", ideb_2023_ai: 4.5, ideb_2023_af: 3.3, ideb_2023_em: 2.9, pop: 42396, tipo: "não-metropolitana", direc: "09" },
    { nome: "Areia Branca", cod: "240110", ideb_2023_ai: 4.6, ideb_2023_af: 3.4, ideb_2023_em: 3.0, pop: 27771, tipo: "não-metropolitana", direc: "14" }
  ],

  escolas: [],

  noticias: [
    { id: 1, data: "2025-06-24", titulo: "RN avança na redução do 'Abaixo do Básico' no 5º ano: queda de 8,6 pp desde 2017", categoria: "equidade", tags: ["abaixo do básico", "5º ano", "evolução", "equidade"], resumo: "A rede pública do RN registrou 29,9% de estudantes no padrão 'Abaixo do Básico' em LP no 5º ano em 2025, contra 38,5% em 2017. O avanço reflete esforços de alfabetização e reforço pedagógico, mas desafios persistem em Matemática (43,3% no AB)." },
    { id: 2, data: "2025-06-24", titulo: "IDEB estimado do RN cresce 0,7 ponto em Anos Finais entre 2023 e 2025, maior alta da série", categoria: "resultados", tags: ["ideb", "9º ano", "crescimento", "pós-pandemia"], resumo: "O IDEB estimado da rede estadual no 9º ano saltou de 3,7 (2023) para 4,1 (2025), impulsionado pela melhora de proficiência (+7,6 pts em LP) e pelo incremento da taxa de aprovação (80% → 92%)." },
    { id: 3, data: "2025-06-24", titulo: "Gap racial de 13 pontos no 9º ano de LP alerta para desigualdade educacional no RN", categoria: "equidade", tags: ["gap racial", "9º ano", "desigualdade", "SIMAIS"], resumo: "Dados do SIMAIS Contextual 2025 revelam que estudantes PPI do 9º ano têm proficiência média de 226,8 pts em LP, contra 239,7 de brancos/amarelos. A diferença de 13 pts é a maior da série SIMAIS." },
    { id: 4, data: "2025-06-24", titulo: "Matemática do 3º EM: 46,4% no 'Abaixo do Básico' é o maior desafio da educação média no RN", categoria: "desafio", tags: ["ensino médio", "matemática", "abaixo do básico", "desafio"], resumo: "O Ensino Médio matricial do RN mantém gargalo histórico em Matemática, com quase metade dos estudantes no padrão mais baixo. A proficiência média de 257,4 pts está estagnada desde 2023." },
    { id: 5, data: "2025-06-24", titulo: "Redes menores do RN mostram maior homogeneidade de desempenho e agilidade pedagógica", categoria: "boas praticas", tags: ["redes menores", "homogeneidade", "boas práticas", "Acari"], resumo: "Municípios com menos de 15 escolas apresentam menor variabilidade interna de IDEB e são mais ágeis na implementação de políticas uniformes. Acari alcançou IDEB de 6,8 em AI (2019)." },
    { id: 6, data: "2025-06-24", titulo: "Escolas rurais com gestão participativa superam média urbana de outras redes no SIMAIS 2025", categoria: "boas praticas", tags: ["rural", "gestão participativa", "superação", "território"], resumo: "Embora a média geral das escolas rurais do RN ainda esteja 18,5 pts abaixo das urbanas no 5º ano de LP, escolas rurais com professorado estabilizado e gestão participativa superam a média urbana de redes maiores." }
  ],

  destaques: [
    { etapa: "5EF", tipo: "melhor_reducao_AB", titulo: "Rede com maior queda no 'Abaixo do Básico' em LP", descricao: "A rede estadual do RN reduziu o AB em LP do 5º ano de 32% (2023) para 29,9% (2025), queda de 2,1 pp. Impulsionado pelo fortalecimento da alfabetização e acompanhamento pedagógico nas DREs prioritárias.", metrica: "-2,1 pp no AB (LP)", pratica: "Acompanhamento pedagógico intensificado nas DREs prioritárias" },
    { etapa: "9EF", tipo: "melhor_crescimento_ideb", titulo: "Maior crescimento do IDEB em Anos Finais", descricao: "O IDEB estimado da rede estadual no 9º ano cresceu de 3,7 (2023) para 4,1 (2025), incremento de 0,4 ponto. Resultado conjunto da melhoria de proficiência (+7,6 pts em LP) e elevação da taxa de aprovação (80% → 92%).", metrica: "+0,4 ponto de IDEB", pratica: "Integração entre avaliação diagnóstica e intervenção pedagógica diferenciada" },
    { etapa: "3EM", tipo: "melhor_distribuicao", titulo: "Melhor distribuição entre padrões de desempenho em LP", descricao: "O padrão 'Adequado' em LP do 3º EM cresceu de 20% (2023) para 22,3% (2025), enquanto o 'Abaixo do Básico' se manteve estável. Indica que mais estudantes estão consolidando habilidades de leitura e interpretação textual.", metrica: "+2,3 pp no Adequado (LP)", pratica: "Leitura orientada e análise textual integrada ao currículo" }
  ],

  proposicoes: {
    abaixo_basico_mt_5ef: {
      situacao: "43,3% dos estudantes da rede estadual no 5º ano estão no padrão 'Abaixo do Básico' em Matemática",
      causas: ["Falta de consciência numérica nos primeiros anos", "Transição inadequada da alfabetização matemática para operações", "Falta de materiais manipulativos"],
      proposicoes: [
        "Implementar 'Números e Operações' como eixo estruturante no 1º ao 3º ano (BNCC EF01MA01 a EF03MA08)",
        "Realizar diagnóstico formativo em Matemática no início de cada bimestre, com reagrupamento por habilidade",
        "Capacitar professores dos Anos Iniciais em resolução de problemas e modelagem matemática",
        "Incentivar aulas de Matemática no contraturno para estudantes no Nível 0-2 do SAEB"
      ]
    },
    gap_racial_9ef: {
      situacao: "Gap de 13 pontos de proficiência entre estudantes PPI e brancos/amarelos no 9º ano de LP",
      causas: ["Menor acesso a literatura diversificada", "Currículo pouco contextualizado", "Baixa expectativa do professorado"],
      proposicoes: [
        "Adotar biblioteca com acervo afro-indígena e literatura produzida no RN (Lei 10.639/2003)",
        "Formar professorado em didática antirracista e práticas de letramento crítico",
        "Criar programa de tutoria entre estudantes do 3º EM e 9º EF com média superior",
        "Implementar avaliação de clima escolar por recorte racial"
      ]
    },
    ensino_medio_matematica: {
      situacao: "46,4% dos estudantes do 3º EM no padrão 'Abaixo do Básico' em Matemática",
      causas: ["Déficits acumulados dos Anos Iniciais", "Descontinuidade curricular", "Falta de conexão com currículo profissionalizante"],
      proposicoes: [
        "Estabelecer 'matemática de recuperação' no 1º EM para alunos com proficiência <250 no 9º EF",
        "Integrar Matemática ao componente de vida e saúde (água, energia, finanças pessoais)",
        "Utilizar plataformas adaptativas (Khan Academy, Brasil Mais Escola) no contraturno",
        "Avaliar impacto do currículo integrado (EPT + Matemática) nas escolas de tempo integral"
      ]
    }
  }
};
