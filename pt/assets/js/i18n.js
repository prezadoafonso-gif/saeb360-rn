/**
 * Saeb360 RN - Sistema de Internacionalização (i18n)
 * Idiomas: Português (PT), English (EN), Español (ES)
 */

const i18n = {
  pt: {
    site_name: 'Saeb360 RN',
    tagline: 'Panorama da Educação Básica do Rio Grande do Norte',
    nav: {
      home: 'Início',
      etapas: 'Etapas',
      escola: 'Buscar Escola',
      equidade: 'Equidade',
      noticias: 'Notícias',
      metodologia: 'Metodologia',
      sobre: 'Sobre'
    },
    hero: {
      title: 'Acompanhamento <span class="highlight">360°</span> da Educação do RN',
      subtitle: 'Resultados do SAEB, IDEB, ICA e SIMAIS para todas as escolas, redes e municípios do Rio Grande do Norte. Dados, análises e proposições para uma educação de qualidade e equidade.',
      stats: {
        escolas: 'Escolas Avaliadas',
        municipios: 'Municípios',
        diretorias: 'Diretorias',
        etapas: 'Etapas Monitoradas'
      },
      cta_primary: 'Explorar Resultados',
      cta_secondary: 'Buscar Escola'
    },
    etapas: {
      title: 'Etapas Avaliadas',
      subtitle: 'Acompanhe os resultados do SAEB e IDEB por etapa de ensino, com evolução histórica, padrões de desempenho e análise de equidade.',
      alfa: {
        title: 'Avaliação da Alfabetização',
        etapa: '2º ano do Ensino Fundamental',
        desc: 'Indicador Criança Alfabetizada (ICA), padrões de desempenho em leitura e escrita, e fatores associados à alfabetização.',
        cta: 'Ver resultados de alfabetização'
      },
      ai: {
        title: 'Anos Iniciais',
        etapa: '5º ano do Ensino Fundamental',
        desc: 'IDEB, proficiência em Língua Portuguesa e Matemática, distribuição por padrões de desempenho e evolução desde 2017.',
        cta: 'Ver resultados dos Anos Iniciais'
      },
      af: {
        title: 'Anos Finais',
        etapa: '9º ano do Ensino Fundamental',
        desc: 'IDEB, proficiência em Língua Portuguesa e Matemática, gaps de equidade e análise de habilidades estruturantes.',
        cta: 'Ver resultados dos Anos Finais'
      },
      em: {
        title: 'Ensino Médio',
        etapa: '3ª série do Ensino Médio',
        desc: 'IDEB, proficiência em Língua Portuguesa e Matemática, desafios do ensino médio e proposições de intervenção.',
        cta: 'Ver resultados do Ensino Médio'
      }
    },
    equidade: {
      title: 'Equidade Educacional',
      subtitle: 'Reduzir desigualdades é garantir qualidade para todos. Análise de gaps raciais, de gênero, socioeconômicos e territoriais.',
      cards: {
        racial: { title: 'Gap Racial', desc: 'Diferença de proficiência entre estudantes PPI (pretos, pardos e indígenas) e brancos/amarelos' },
        genero: { title: 'Gap de Gênero', desc: 'Diferença de desempenho entre meninas e meninos em LP e MT' },
        nse: { title: 'Nível Socioeconômico', desc: 'Comparação entre alunos de baixo e alto NSE (Nível Socioeconômico)' },
        territorial: { title: 'Territorial', desc: 'Metropolitana vs não-metropolitana, urbana vs rural' }
      },
      cta: 'Ver análise completa de equidade'
    },
    noticias: {
      title: 'Notícias e Análises',
      subtitle: 'Destaques gerados automaticamente a partir dos dados do SAEB, SIMAIS e IDEB do RN.',
      cta: 'Ver todas as notícias'
    },
    destaques: {
      title: 'Destaques',
      subtitle: 'Escolas, redes e municípios que se destacaram por qualidade, equidade, crescimento e boas práticas.',
      criterios: 'Critérios de destaque: redução do Abaixo do Básico, equilíbrio entre padrões, crescimento sustentado, redução de desigualdades e engajamento da comunidade.'
    },
    mapa: {
      title: 'Mapa Interativo do RN',
      subtitle: 'Explore os resultados por município. Clique para ver detalhes de escolas, redes e evolução.',
      filtros: {
        ideb: 'IDEB',
        proficiencia: 'Proficiência',
        abaixo_basico: '% Abaixo do Básico'
      }
    },
    busca: {
      title: 'Buscar Escola',
      placeholder: 'Digite o nome da escola, código INEP ou município...',
      label: 'Encontre sua escola e veja a ficha de diagnóstico completa'
    },
    footer: {
      fontes: 'Fontes de Dados',
      creditos: 'Créditos',
      contato: 'Contato',
      legal: 'Todos os dados são públicos, conforme Lei de Acesso à Informação (LAI). Fontes: INEP, SEEC-RN, IBGE, Qedu, Todos pela Educação.'
    },
    padroes: {
      abaixo: 'Abaixo do Básico',
      basico: 'Básico',
      adequado: 'Adequado',
      avancado: 'Avançado',
      proficiente: 'Proficiente'
    }
  },

  en: {
    site_name: 'Saeb360 RN',
    tagline: 'Overview of Basic Education in Rio Grande do Norte',
    nav: {
      home: 'Home',
      etapas: 'Stages',
      escola: 'Search School',
      equidade: 'Equity',
      noticias: 'News',
      metodologia: 'Methodology',
      sobre: 'About'
    },
    hero: {
      title: '<span class="highlight">360°</span> Monitoring of RN Education',
      subtitle: 'SAEB, IDEB, ICA and SIMAIS results for all schools, networks and municipalities of Rio Grande do Norte. Data, analysis and proposals for quality and equitable education.',
      stats: {
        escolas: 'Schools Assessed',
        municipios: 'Municipalities',
        diretorias: 'Directorates',
        etapas: 'Monitored Stages'
      },
      cta_primary: 'Explore Results',
      cta_secondary: 'Search School'
    },
    etapas: {
      title: 'Assessed Stages',
      subtitle: 'Follow SAEB and IDEB results by educational stage, with historical evolution, performance standards and equity analysis.',
      alfa: {
        title: 'Literacy Assessment',
        etapa: '2nd year of Elementary School',
        desc: 'Child Literacy Indicator (ICA), performance standards in reading and writing, and factors associated with literacy.',
        cta: 'See literacy results'
      },
      ai: {
        title: 'Early Years',
        etapa: '5th year of Elementary School',
        desc: 'IDEB, proficiency in Portuguese and Mathematics, distribution by performance standards and evolution since 2017.',
        cta: 'See Early Years results'
      },
      af: {
        title: 'Final Years',
        etapa: '9th year of Elementary School',
        desc: 'IDEB, proficiency in Portuguese and Mathematics, equity gaps and analysis of structuring skills.',
        cta: 'See Final Years results'
      },
      em: {
        title: 'High School',
        etapa: '3rd year of High School',
        desc: 'IDEB, proficiency in Portuguese and Mathematics, high school challenges and intervention proposals.',
        cta: 'See High School results'
      }
    },
    equidade: {
      title: 'Educational Equity',
      subtitle: 'Reducing inequalities is ensuring quality for all. Analysis of racial, gender, socioeconomic and territorial gaps.',
      cards: {
        racial: { title: 'Racial Gap', desc: 'Proficiency difference between Black/Brown/Indigenous and White/Asian students' },
        genero: { title: 'Gender Gap', desc: 'Performance difference between girls and boys in Portuguese and Math' },
        nse: { title: 'Socioeconomic Level', desc: 'Comparison between low and high SES students' },
        territorial: { title: 'Territorial', desc: 'Metropolitan vs non-metropolitan, urban vs rural' }
      },
      cta: 'See full equity analysis'
    },
    noticias: {
      title: 'News & Analysis',
      subtitle: 'Highlights automatically generated from SAEB, SIMAIS and IDEB data from RN.',
      cta: 'See all news'
    },
    destaques: {
      title: 'Spotlights',
      subtitle: 'Schools, networks and municipalities that stood out for quality, equity, growth and good practices.',
      criterios: 'Spotlight criteria: reduction of Below Basic, balance between standards, sustainable growth, reduction of inequalities and community engagement.'
    },
    mapa: {
      title: 'Interactive Map of RN',
      subtitle: 'Explore results by municipality. Click to see details of schools, networks and evolution.',
      filtros: {
        ideb: 'IDEB',
        proficiencia: 'Proficiency',
        abaixo_basico: '% Below Basic'
      }
    },
    busca: {
      title: 'Search School',
      placeholder: 'Type school name, INEP code or municipality...',
      label: 'Find your school and see the complete diagnostic report'
    },
    footer: {
      fontes: 'Data Sources',
      creditos: 'Credits',
      contato: 'Contact',
      legal: 'All data is public, under the Access to Information Law (LAI). Sources: INEP, SEEC-RN, IBGE, Qedu, Todos pela Educação.'
    },
    padroes: {
      abaixo: 'Below Basic',
      basico: 'Basic',
      adequado: 'Adequate',
      avancado: 'Advanced',
      proficiente: 'Proficient'
    }
  },

  es: {
    site_name: 'Saeb360 RN',
    tagline: 'Panorama general de la Educación Básica en Río Grande del Norte',
    nav: {
      home: 'Inicio',
      etapas: 'Etapas',
      escola: 'Buscar Escuela',
      equidade: 'Equidad',
      noticias: 'Noticias',
      metodologia: 'Metodología',
      sobre: 'Acerca de'
    },
    hero: {
      title: 'Monitoreo <span class="highlight">360°</span> de la Educación de RN',
      subtitle: 'Resultados de SAEB, IDEB, ICA y SIMAIS para todas las escuelas, redes y municipios de Río Grande del Norte. Datos, análisis y propuestas para una educación de calidad y equidad.',
      stats: {
        escolas: 'Escuelas Evaluadas',
        municipios: 'Municipios',
        diretorias: 'Directorias',
        etapas: 'Etapas Monitoreadas'
      },
      cta_primary: 'Explorar Resultados',
      cta_secondary: 'Buscar Escuela'
    },
    etapas: {
      title: 'Etapas Evaluadas',
      subtitle: 'Siga los resultados de SAEB e IDEB por etapa educativa, con evolución histórica, estándares de desempeño y análisis de equidad.',
      alfa: {
        title: 'Evaluación de la Alfabetización',
        etapa: '2º año de la Enseñanza Fundamental',
        desc: 'Indicador Niño Alfabetizado (ICA), estándares de desempeño en lectura y escritura, y factores asociados a la alfabetización.',
        cta: 'Ver resultados de alfabetización'
      },
      ai: {
        title: 'Años Iniciales',
        etapa: '5º año de la Enseñanza Fundamental',
        desc: 'IDEB, proficiency en Lengua Portuguesa y Matemáticas, distribución por estándares de desempeño y evolución desde 2017.',
        cta: 'Ver resultados de Años Iniciales'
      },
      af: {
        title: 'Años Finales',
        etapa: '9º año de la Enseñanza Fundamental',
        desc: 'IDEB, proficiency en Lengua Portuguesa y Matemáticas, brechas de equidad y análisis de habilidades estructurantes.',
        cta: 'Ver resultados de Años Finales'
      },
      em: {
        title: 'Enseñanza Media',
        etapa: '3ª serie de la Enseñanza Media',
        desc: 'IDEB, proficiency en Lengua Portuguesa y Matemáticas, desafíos de la enseñanza media y propuestas de intervención.',
        cta: 'Ver resultados de Enseñanza Media'
      }
    },
    equidade: {
      title: 'Equidad Educacional',
      subtitle: 'Reducir las desigualdades es garantizar calidad para todos. Análisis de brechas raciales, de género, socioeconómicas y territoriales.',
      cards: {
        racial: { title: 'Brecha Racial', desc: 'Diferencia de proficiency entre estudiantes PPI y blancos/amarillos' },
        genero: { title: 'Brecha de Género', desc: 'Diferencia de desempeño entre niñas y niños en LP y MT' },
        nse: { title: 'Nivel Socioeconómico', desc: 'Comparación entre alumnos de bajo y alto NSE' },
        territorial: { title: 'Territorial', desc: 'Metropolitana vs no-metropolitana, urbana vs rural' }
      },
      cta: 'Ver análisis completo de equidad'
    },
    noticias: {
      title: 'Noticias y Análisis',
      subtitle: 'Destacados generados automáticamente a partir de los datos de SAEB, SIMAIS e IDEB de RN.',
      cta: 'Ver todas las noticias'
    },
    destaques: {
      title: 'Destaques',
      subtitle: 'Escuelas, redes y municipios que se destacaron por calidad, equidad, crecimiento y buenas prácticas.',
      criterios: 'Criterios de destaque: reducción del Por Debajo del Básico, equilibrio entre estándares, crecimiento sostenido, reducción de desigualdades y compromiso de la comunidad.'
    },
    mapa: {
      title: 'Mapa Interactivo de RN',
      subtitle: 'Explore los resultados por municipio. Haga clic para ver detalles de escuelas, redes y evolución.',
      filtros: {
        ideb: 'IDEB',
        proficiencia: 'Proficiency',
        abaixo_basico: '% Por Debajo del Básico'
      }
    },
    busca: {
      title: 'Buscar Escuela',
      placeholder: 'Escriba el nombre de la escuela, código INEP o municipio...',
      label: 'Encuentre su escuela y vea el informe de diagnóstico completo'
    },
    footer: {
      fontes: 'Fuentes de Datos',
      creditos: 'Créditos',
      contato: 'Contacto',
      legal: 'Todos los datos son públicos, conforme a la Ley de Acceso a la Información (LAI). Fuentes: INEP, SEEC-RN, IBGE, Qedu, Todos pela Educação.'
    },
    padroes: {
      abaixo: 'Por Debajo del Básico',
      basico: 'Básico',
      adequado: 'Adecuado',
      avancado: 'Avanzado',
      proficiente: 'Proficiente'
    }
  }
};

let currentLang = 'pt';

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en' : 'es';
  applyTranslations();
  updateLangButtons();
  if (typeof loadCharts === 'function') loadCharts();
}

function t(key) {
  const keys = key.split('.');
  let value = i18n[currentLang];
  for (const k of keys) {
    if (value && value[k] !== undefined) {
      value = value[k];
    } else {
      return key;
    }
  }
  return value;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (key.includes('title') || key.includes('label') || key.includes('cta')) {
      el.innerHTML = val;
    } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });
}

function updateLangButtons() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const urlLang = document.documentElement.lang?.substring(0,2) || 'pt';
  if (i18n[urlLang]) currentLang = urlLang;
  applyTranslations();
  updateLangButtons();
});
