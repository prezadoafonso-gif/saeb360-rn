# Saeb360 RN - Panorama da Educação Básica do Rio Grande do Norte

## 🌐 Visão Geral

**Saeb360 RN** é um painel digital completo, gratuito e interativo, dedicado ao acompanhamento dos resultados do **SAEB** (Sistema de Avaliação da Educação Básica), **IDEB** (Índice de Desenvolvimento da Educação Básica), **ICA** (Indicador Criança Alfabetizada) e **SIMAIS** (Sistema de Avaliação do RN) para todas as escolas estaduais e municipais, redes públicas de ensino e municípios do estado do **Rio Grande do Norte**, Brasil.

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

> **Você já tem o repositório criado?** Se sim, pule para a seção **"🔄 Como atualizar para a Versão 2.0"** abaixo.

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

## 🔄 Como atualizar para a Versão 2.0 (se você já tem o site no ar)

Se você já publicou a versão anterior e quer atualizar para a **Versão 2.0** (com dados embutidos, PNE 2026, páginas de etapa funcionais, ficha de diagnóstico completa e créditos atualizados), siga os passos abaixo:

### Passo 1: Apagar os arquivos antigos

1. Acesse seu repositório `saeb360-rn` no GitHub: `https://github.com/prezadoafonso-gif/saeb360-rn`
2. Clique na aba **"<> Code"** (canto superior esquerdo)
3. Você verá a lista de arquivos e pastas (index.html, pt/, en/, es/, README.md, etc.)
4. Para cada arquivo/pasta, clique no nome, depois no ícone de **lixeira** (🗑️) no canto superior direito
5. Confirme a exclusão digitando o nome do repositório e clicando em **I understand, delete this file**
6. Repita para **todos** os arquivos e pastas antigos
7. Após apagar tudo, faça um commit com a mensagem: `Removendo versão antiga para atualização v2.0`

> **Dica**: Se houver muitos arquivos, você pode apagar a pasta `pt/` inteira (e suas subpastas) de uma vez, depois `en/`, `es/`, etc.

### Passo 2: Enviar os arquivos novos (v2.0)

1. No repositório agora vazio (ou após remover os arquivos antigos), clique em **"Add file"** → **"Upload files"**
2. Clique em **"choose your files"**
3. No Windows Explorer, navegue até:
   ```
   C:\Users\Cliente\OneDrive\Documentos\Kimi\Workspaces\SAEB-RN\saeb360-rn
   ```
4. **Selecione TODOS os arquivos e pastas** dentro dessa pasta:
   - `README.md`
   - `index.html` (o redirecionador)
   - `pt/` (pasta inteira, com todos os arquivos)
   - `en/` (pasta inteira)
   - `es/` (pasta inteira)
5. **Arraste** tudo para a área de upload do GitHub (ou use Ctrl+A para selecionar todos e depois clique em Abrir)
6. Em **Commit changes**, escreva:
   ```
   Versão 2.0 - Dados embutidos, PNE 2026, páginas de etapa, ficha diagnóstico completa
   ```
7. Clique em **Commit changes**

> ⚠️ **Importante**: Se o GitHub limitar a 100 arquivos por upload, faça em dois lotes: primeiro envie a pasta `pt/assets/`, depois o restante.

### Passo 3: Verificar se o GitHub Pages está ativo

1. No repositório, clique na aba **Settings** (canto superior direito)
2. No menu lateral esquerdo, clique em **Pages**
3. Verifique se está configurado como:
   - **Source**: Deploy from a branch
   - **Branch**: `main` e pasta `/ (root)`
4. Se estiver diferente, corrija e clique em **Save**
5. Aguarde **1–2 minutos** para o GitHub reconstruir o site

### Passo 4: Acessar o site atualizado

- O endereço continua o mesmo: `https://prezadoafonso-gif.github.io/saeb360-rn/`
- Acesse e teste a busca por escola, os gráficos, o mapa e os links das etapas
- **Custo total: R$ 0,00** ✅

---

## 📋 O que mudou na Versão 2.0

| Problema reportado | Solução implementada |
|---|---|
| Gráficos não carregavam | Dados embutidos em `dados.js` — elimina falhas de fetch/CORS |
| Mapa mostrava "em desenvolvimento" | Mapa funcional com dados reais dos 167 municípios do RN |
| Links dos cards não funcionavam | Criadas páginas reais para cada etapa (2ºEF, 5ºEF, 9ºEF, 3ºEM) |
| Ficha de diagnóstico incompleta | Implementada ficha completa com proposições de intervenção automáticas |
| DREs apareciam como 7 | Corrigido para 16 Diretorias Regionais de Educação |
| Créditos davam impressão institucional | Atualizados para refletir natureza particular e independente |
| PNE antigo (2014) | Alinhado com novo PNE 2026 (Lei 15.388/2026) |

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

## 🔒 Segurança, Privacidade e Base Legal

- Todos os dados são **públicos** e agregados, conforme a **Lei de Acesso à Informação (LAI - Lei 12.527/2011)** e a **Lei 15.388/2026 (Art. 11, §2º)**, que determina a divulgação de dados e microdados agregados e desagregados pelo INEP, observada a **Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018)**
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

## 👤 Responsável e Natureza do Projeto

**Saeb360 RN** é um projeto de iniciativa particular, desenvolvido de forma independente por **Afonso Gomes**, sem vínculo institucional formal com o INEP, a SEEC-RN ou qualquer órgão público.

O projeto é oferecido gratuitamente em sua fase inicial, sem fins lucrativos, com o propósito de democratizar o acesso a informações educacionais públicas. A depender das condições legais e da viabilidade técnica, poderá ser monetizado futuramente (por exemplo, por meio de publicidade, serviços premium ou parcerias institucionais), sempre respeitando a legislação vigente, a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018) e os direitos autorais das fontes de dados.

As análises, proposições, interpretações e notícias geradas são de responsabilidade exclusiva do mantenedor do projeto. Os dados oficiais devem ser sempre consultados nos portais do INEP para fins decisórios formais.

---

**Licença**: Dados públicos. Código-fonte: uso livre para fins educacionais e públicos.

**Última atualização**: 24 de junho de 2025
