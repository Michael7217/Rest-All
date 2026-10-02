# 🍽️ Rest All

> Sistema de gestão para estabelecimentos gastronômicos, desenvolvido para centralizar e facilitar o controle das principais operações de um restaurante em uma única plataforma.

## 📋 Sobre o projeto

O **Rest All** é uma aplicação desenvolvida com o objetivo de auxiliar na **gestão de estabelecimentos gastronômicos**, oferecendo uma plataforma centralizada para gerenciamento de diferentes áreas do negócio.

A aplicação permite controlar desde o **cardápio e estoque** até **pedidos, comandas, funcionários e despesas**, além de disponibilizar um **dashboard intuitivo** para acompanhamento de informações financeiras e operacionais.

O projeto também foi uma importante experiência de aprendizado, permitindo colocar em prática conceitos de desenvolvimento web, integração entre frontend e backend, consumo de APIs e gerenciamento de dados.

---

## 🚀 Funcionalidades

### 🍔 Cardápio
- Cadastro de produtos
- Edição de produtos
- Exclusão de produtos
- Organização por categorias
- Controle de disponibilidade
- Gerenciamento de preços e informações dos produtos

### 👥 Funcionários
- Cadastro de funcionários
- Consulta de funcionários
- Atualização de informações
- Gerenciamento dos funcionários cadastrados

### 📋 Comandas
- Abertura de comandas
- Controle das comandas em andamento
- Associação de pedidos
- Acompanhamento dos valores

### 🛎️ Pedidos
- Registro de pedidos
- Gerenciamento dos pedidos
- Atualização do status
- Associação de pedidos às comandas

### 💰 Despesas
- Cadastro de despesas
- Controle dos gastos
- Consulta das despesas
- Organização das informações financeiras

### 📦 Estoque
- Controle de produtos
- Acompanhamento da quantidade disponível
- Gerenciamento de entradas e saídas
- Visualização dos itens em estoque

### 📊 Dashboard

O sistema conta com um dashboard desenvolvido para proporcionar uma visão geral do estabelecimento, apresentando informações relevantes para o acompanhamento do negócio, como:

- 💵 Receitas
- 💸 Despesas
- 📈 Lucros
- 📦 Informações de estoque
- 🛎️ Pedidos
- 📋 Comandas

---

## 🛠️ Tecnologias utilizadas

### Frontend

- **React**
- **TypeScript**
- **Tailwind CSS**
- **JavaScript**
- **HTML5**
- **CSS3**

### Backend / Integração

- **API REST**
- **Banco de dados**
- Comunicação entre frontend e backend
- Requisições HTTP

### Ferramentas

- **Git**
- **GitHub**
- **Figma**
- **Visual Studio Code**

---

## 🏗️ Arquitetura

O projeto foi desenvolvido utilizando uma arquitetura baseada na separação entre **frontend, backend e banco de dados**.

```text
┌─────────────────────┐
│      Frontend       │
│                     │
│ React + TypeScript  │
│    + Tailwind CSS   │
└──────────┬──────────┘
           │
           │ HTTP / REST
           ▼
┌─────────────────────┐
│        API          │
│                     │
│    API REST         │
└──────────┬──────────┘
           │
           │
           ▼
┌─────────────────────┐
│     Banco de Dados  │
│                     │
│ Dados da aplicação  │
└─────────────────────┘
```

Essa estrutura permitiu trabalhar com a comunicação entre diferentes camadas da aplicação e compreender melhor o fluxo de dados de um sistema completo.

---

## 🎯 Objetivos do projeto

O desenvolvimento do Rest All teve como principais objetivos:

- Desenvolver uma aplicação voltada para um problema real;
- Centralizar diferentes processos de gestão em uma única plataforma;
- Criar uma interface intuitiva e responsiva;
- Praticar desenvolvimento com React e TypeScript;
- Trabalhar com consumo e integração de APIs REST;
- Aplicar conceitos de banco de dados;
- Aprimorar a organização e estruturação de projetos;
- Desenvolver habilidades de resolução de problemas.

---

## 📚 Principais aprendizados

O Rest All foi um projeto importante para minha evolução como desenvolvedor.

Durante seu desenvolvimento, pude aprofundar conhecimentos em:

- Desenvolvimento de interfaces com **React**;
- Tipagem e organização de código utilizando **TypeScript**;
- Construção de componentes reutilizáveis;
- Estilização e responsividade com **Tailwind CSS**;
- Consumo e integração com **APIs REST**;
- Comunicação entre frontend e backend;
- Manipulação e gerenciamento de dados;
- Estruturação de aplicações;
- Git e GitHub;
- Resolução de problemas durante o desenvolvimento;
- Organização de funcionalidades e regras de negócio.

Além do conhecimento técnico, o projeto proporcionou uma experiência importante na **identificação de problemas, pesquisa de soluções e tomada de decisões durante o desenvolvimento**.

---

## 📸 Interface

> Adicione aqui imagens ou GIFs demonstrando as principais telas da aplicação.
### Home

![Home](https://media.licdn.com/dms/image/v2/D4E22AQEs873CGQulSg/feedshare-shrink_1280/B4EaD92zCMJQAQ-/0/1790965396211?e=1792627200&v=beta&t=9RWiXLUL-UOcuMv6Sp4AODm3svBYir21fp3nXr8r05Q)

### Dashboard

![Dashboard](https://media.licdn.com/dms/image/v2/D4E22AQFz-_a5wy0gaQ/feedshare-shrink_1280/B4EaD92zCXGQAM-/0/1790965396102?e=1792627200&v=beta&t=xViH33fGjkuVRZ5ulsKuhk7sxQXVm2zCXW_b04tF0A8)

### Cardápio

![Cardápio](https://media.licdn.com/dms/image/v2/D4E22AQG1X0lN9aCTAg/feedshare-shrink_1280/B4EaD92zHDH0AM-/0/1790965396391?e=1792627200&v=beta&t=II-8BgImatUilcFQZtHa-afKYZ7UOWPtQZdi17mPFIw)

### Comandas

![Comandas](https://media.licdn.com/dms/image/v2/D4E22AQFhZ2hEUe9alA/feedshare-shrink_1280/B4EaD92zGKKoAU-/0/1790965396324?e=1792627200&v=beta&t=O13xDUNpvD5XWhCNXd2HPzGOb_9CnUi1I4RS4yW_s5U)

---

## ⚙️ Como executar o projeto

### Pré-requisitos

Antes de iniciar, certifique-se de possuir instalado:

- [Node.js](https://nodejs.org/)
- npm ou outro gerenciador de pacotes
- Git

### Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### Acesse o diretório

```bash
cd Rest-All
```

### Instale as dependências

```bash
npm install
```

### Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=URL_DA_API
```

Substitua `URL_DA_API` pela URL da API utilizada pelo projeto.

### Execute a aplicação

```bash
npm run dev
```

A aplicação estará disponível no endereço informado pelo Vite no terminal.

---

## 🔄 Fluxo da aplicação

O funcionamento geral da aplicação segue o fluxo:

```text
Usuário
   │
   ▼
Interface React
   │
   ▼
Requisição HTTP
   │
   ▼
API REST
   │
   ▼
Banco de Dados
   │
   ▼
Resposta da API
   │
   ▼
Interface atualizada
```

---

## 📌 Status do projeto

🚧 **Em desenvolvimento**

Novas funcionalidades, melhorias de interface e aprimoramentos na arquitetura podem ser adicionados futuramente.

---

## 🔮 Possíveis melhorias

Algumas funcionalidades que podem ser implementadas em versões futuras:

- [ ] Sistema de autenticação
- [ ] Controle de permissões por usuário
- [ ] Relatórios financeiros
- [ ] Exportação de relatórios
- [ ] Notificações
- [ ] Melhorias no controle de estoque
- [ ] Histórico de pedidos
- [ ] Relatórios de vendas
- [ ] Integração com impressão de pedidos
- [ ] Melhorias no dashboard

---

## 👨‍💻 Desenvolvedor

**Michael Charlys Moreira da Silva**

Graduando em Ciência da Computação pela Universidade Federal do Ceará (UFC), com interesse em desenvolvimento **Full Stack**, desenvolvimento web e construção de interfaces intuitivas.

---

## ⭐ Considerações finais

O **Rest All** representa uma etapa importante da minha trajetória de aprendizado e desenvolvimento.

Mais do que aplicar tecnologias como **React, TypeScript, Tailwind CSS, API REST e banco de dados**, o projeto proporcionou a oportunidade de transformar conhecimentos teóricos em uma aplicação prática, enfrentando desafios reais de desenvolvimento e buscando soluções para cada problema encontrado.

> **Construir, errar, pesquisar, solucionar e aprender. Cada desafio do projeto foi uma oportunidade de evoluir como desenvolvedor.**
