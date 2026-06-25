# Saeb360 RN - Avaliação Educacional do Rio Grande do Norte

## 🌐 Visão Geral

**Saeb360 RN** é um painel digital completo, gratuito e interativo, dedicado ao acompanhamento dos resultados do **SAEB** (Sistema de Avaliação da Educação Básica), **IDEB** (Índice de Desenvolvimento da Educação Básica), **ICA** (Indicador Criança Alfabetizada) e **SIMAIS** (Sistema de Avaliação do RN) para todas as escolas, redes e municípios do estado do **Rio Grande do Norte**, Brasil.

O site oferece:
- 📊 **Dashboards interativos** com gráficos de evolução histórica (2017–2025)
- 🗺️ **Mapa interativo** do RN com resultados por município
- 🔍 **Busca por escola** com ficha de diagnóstico
- ⚖️ **Análise de equidade educacional** (gaps racial, de gênero, NSE, territorial)
- 📰 **Notícias e análises** geradas automaticamente a partir dos dados
- ⭐ **Casos de destaque** com critérios qualitativos de qualidade e boas práticas
- 💡 **Proposições de intervenção** baseadas em evidências (INEP, SEEC-RN, BNCC)
- 🌍 **Três idiomas**: Português, English, Español

---

## 📁 Estrutura do Projeto

```
saeb360-rn/
├── index.html              # Redirecionamento para pt/
├── pt/
│   ├── index.html          # Página principal (home)
│   ├── assets/
│   │   ├── css/style.css   # Design system completo
│   │   ├── js/i18n.js      # Sistema de traduções PT/EN/ES
│   │   ├── js/main.js      # Lógica: dados, gráficos, mapa, busca
│   │   └── data/           # JSONs com dados processados
│   │       ├── dados-consolidados.json      # Panorama, equidade, notícias, destaques
│   │       ├── escolas_saeb2025.json        # 1.921 escolas avaliadas
│   │       ├── municipios_saeb2025.json     # 1.188 registros municipais
│   │       └── estadual_saeb2025.json       # 733 registros estaduais
│   └── pages/
│       ├── metodologia.html  # Fontes, metodologia, referências ABNT
│       ├── sobre.html        # Sobre o projeto, público-alvo, alinhamento PNE/BNCC
│       ├── equidade.html     # Análise completa de equidade educacional
│       └── noticias.html     # Página completa de notícias (a desenvolver)
├── en/                     # Versão em inglês (redireciona para PT com i18n)
│   ├── index.html
│   └── assets/             # Copiar de pt/assets
├── es/                     # Versão em espanhol (redireciona para PT com i18n)
│   ├── index.html
│   └── assets/             # Copiar de pt/assets
└── README.md               # Este arquivo
```

---

## 🚀 Como Publicar no GitHub Pages (Passo a Passo)

O **GitHub Pages** é um serviço de hospedagem de sites estáticos oferecido gratuitamente pelo GitHub. Como o Saeb360 RN é um site 100% estático (HTML/CSS/JS, sem banco de dados nem backend), ele é ideal para o GitHub Pages.

### Pré-requisitos
1. Uma conta gratuita no GitHub: [https://github.com/signup](https://github.com/signup)
2. Git instalado no seu computador (opcional, mas recomendado): [https://git-scm.com/downloads](https://git-scm.com/downloads)

### Passo 1: Criar um novo repositório no GitHub

1. Acesse [https://github.com/new](https://github.com/new)
2. Em **Repository name**, digite: `saeb360-rn`
3. Em **Description** (opcional): `Painel interativo de acompanhamento do SAEB e IDEB no Rio Grande do Norte`
4. Marque a opção **Public** (repositório público — necessário para GitHub Pages gratuito)
5. **NÃO** marque "Add a README file" (já temos um)
6. Clique em **Create repository**

### Passo 2: Enviar os arquivos do projeto para o GitHub

#### Opção A: Via upload direto no navegador (mais simples para iniciantes)

1. No repositório criado, clique em **"Add file"** → **"Upload files"**
2. Clique em **"choose your files"** e selecione **toda a pasta** `saeb360-rn` do seu computador
   - No Windows: arraste a pasta `saeb360-rn` inteira para a área de upload
   - O GitHub aceita upload de até 100 arquivos por vez; se necessário, faça em lotes
3. Em **Commit changes**, escreva uma mensagem como: `Primeira versão do Saeb360 RN`
4. Clique em **Commit changes**

#### Opção B: Via Git (recomendado para atualizações futuras)

Abra o terminal (Prompt de Comando, PowerShell ou Git Bash) e execute:

```bash
# 1. Navegue até a pasta do projeto
cd "C:\Users\SeuUsuario\Documents\saeb360-rn"

# 2. Inicialize o Git
git init

# 3. Adicione todos os arquivos
git add .

# 4. Faça o primeiro commit
git commit -m "Primeira versão do Saeb360 RN"

# 5. Conecte ao repositório remoto (substitua SEU_USUARIO pelo seu nome de usuário do GitHub)
git remote add origin https://github.com/SEU_USUARIO/saeb360-rn.git

# 6. Envie os arquivos
git branch -M main
git push -u origin main
```

### Passo 3: Ativar o GitHub Pages

1. No seu repositório no GitHub, clique na aba **Settings** (canto superior direito)
2. No menu lateral esquerdo, clique em **Pages** (seção "Code and automation")
3. Em **Source**, selecione: **Deploy from a branch**
4. Em **Branch**, selecione: `main` e pasta `/ (root)`
5. Clique em **Save**
6. Aguarde 1–2 minutos. O GitHub irá construir e publicar seu site.

### Passo 4: Acessar seu site

- O endereço será: `https://SEU_USUARIO.github.io/saeb360-rn/`
- Exemplo: `https://afonsogomes.github.io/saeb360-rn/`
- **Custo total: R$ 0,00** ✅
- **HTTPS incluso** ✅
- **Domínio próprio opcional** (você pode configurar um domínio personalizado posteriormente nas Settings → Pages → Custom domain)

---

## 🔄 Como atualizar o site no futuro

Sempre que quiser atualizar dados ou conteúdo:

### Opção A: Upload direto (simples)

1. No GitHub, acesse o arquivo que deseja atualizar
2. Clique no ícone de lápis (✏️) para editar
3. Faça as alterações e clique em **Commit changes**

### Opção B: Git (recomendado)

```bash
cd "C:\Users\SeuUsuario\Documents\saeb360-rn"

# Após fazer alterações nos arquivos localmente:
git add .
git commit -m "Atualização: novos dados SAEB 2025"
git push origin main
```

O GitHub Pages atualiza automaticamente em 1–2 minutos após o push.

---

## 📊 Atualização de Dados

Os dados do site estão em arquivos JSON na pasta `pt/assets/data/`. Para atualizar:

1. **Substitua os arquivos JSON** por novos dados processados (a partir de planilhas do INEP/SEEC)
2. **Edite o arquivo `dados-consolidados.json`** para refletir novos indicadores, notícias e destaques
3. **Commit e push** no GitHub

> **Dica**: Se você não tem familiaridade com JSON, pode usar o Excel → [https://csvjson.com/csv2json](https://csvjson.com/csv2json) para converter planilhas CSV para JSON.

---

## 🎨 Paleta de Cores do RN

O design utiliza as cores oficiais do estado do Rio Grande do Norte:
- **Azul**: `#003366` (mar, céu)
- **Amarelo**: `#ffcc00` (sol, energia)
- **Verde**: `#009639` (vegetação, esperança, crescimento)
- **Branco**: `#ffffff` (paz, clareza)

---

## 🔒 Segurança e Privacidade

- Todos os dados são **públicos** e agregados, conforme a Lei de Acesso à Informação (LAI - Lei 12.527/2011)
- Não há exposição de dados individuais de estudantes, professores ou gestores
- Não há coleta de cookies nem rastreamento de usuários
- O site é 100% estático: nenhum dado pessoal é processado em servidor

---

## 📚 Referências

- INEP - [https://www.gov.br/inep/pt-br](https://www.gov.br/inep/pt-br)
- SAEB - [https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacoes-e-exames-educacionais/saeb](https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacoes-e-exames-educacionais/saeb)
- IDEB - [https://www.gov.br/inep/pt-br/areas-de-atuacao/pesquisas-estatisticas-e-indicadores/ideb](https://www.gov.br/inep/pt-br/areas-de-atuacao/pesquisas-estatisticas-e-indicadores/ideb)
- BNCC - [http://basenacionalcomum.mec.gov.br/](http://basenacionalcomum.mec.gov.br/)
- QEdu - [https://qedu.org.br/uf/24-rio-grande-do-norte](https://qedu.org.br/uf/24-rio-grande-do-norte)
- Todos pela Educação - [https://todospelaeducacao.org.br](https://todospelaeducacao.org.br)

---

## 👤 Responsável

Projeto desenvolvido por **Afonso Gomes Ferreira Filho** (SUAVE/SEEC/RN), com apoio de dados da Secretaria de Estado da Educação e da Cultura do Rio Grande do Norte (SEEC-RN) e do Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira (INEP).

---

**Licença**: Dados públicos. Código-fonte: uso livre para fins educacionais e públicos.

**Última atualização**: 24 de junho de 2025
