# Controle de Notas - Professor Carlos

Esse é um sistema de controle de notas e frequências para uma turma. Ele permite adicionar alunos com suas notas e frequências, calcular médias gerais, além de mostrar alunos com desempenho acima da média em pelo menos uma disciplina.

O sistema é composto por uma API backend desenvolvida com **Node.js e Express** e um frontend desenvolvido com **React.js.**

## Pré-requisitos

É necessário garantir que as seguintes ferramentas estejam instaladas:

- [Node.js](https://nodejs.org/)
- [NPM (Node Package Manager)](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- **Navegador:** Testado no navegador [Brave](https://brave.com/pt-br/)
  - Não testado em outros navegadores, embora o funcionamento seja esperado.

## Funcionalidades

- **Adicionar Alunos:** O professor pode adicionar alunos informando o nome, as notas (de 0 a 10) e a frequência em porcentagem (de 0 a 100) nas 5 disciplinas.
- **Média Geral da Turma:** A média geral da turma é calculada com base nas médias individuais de cada aluno.
- **Média por Disciplina:** Exibe a média de notas para cada disciplina.
- **Situação do Aluno:** A situação de cada aluno é exibida com base na média e na frequência. Alunos com frequência abaixo de 75% são destacados.

## Tecnologias Usadas

### Frontend

- **React.js:** Para construção da interface do usúario.
- **CSS:** Para estilização da interface.
- **Axios:** Para fazer requisições HTTP ao backend.

### Backend

- **Node.js:** Ambiente de execução JavaScript
- **Express:** Framework para a criação da API RESTful.
- **CORS:** Middleware para permitir a comunicação entre o frontend e o backend (diferentes origens).

## Como rodar o projeto

### 1. Clonar o repositório

Primeiro, clone este repositório em sua máquina:

```bash
git clone https://github.com//marinastefane/teste-dti.git
cd teste-dti
```

### 2. Configuração do Backend (API)

1. Navegue até a pasta do backend:

```bash
cd backend
```

2. Instale as dependências do backend:

```bash
npm install
```

3. Inicie o servidor do backend:

```bash
node server.js
```

O backend estará rodando em `http://localhost:5000`

### 3. Configuração do Frontend

(Use um segundo terminal)

1. No segundo terminal, navegue até a pasta frontend:

```bash
cd frontend
```

2. Instale as dependências do frontend:

```bash
npm install
```

3. Inicie o servidor do frontend:

```bash
npm start
```

O frontend estará rodando em `http://localhost:3000`

## Endpoints da API

### `POST /alunos`

**Descrição:** Adiciona um novo aluno com nome, notas e frequências.
**Requisição:**

```json
{
  "nome": "Nome do Aluno",
  "notas": [7.5, 8.0, 6.0, 9.0, 7.2],
  "presencas": [85, 90, 80, 95, 88]
}
```

**Resposta:**

`201 Created` se o aluno for adicionado com sucesso.

### `GET /alunos`

**Descrição:** Retorna a lista de todos os alunos com suas notas, frequências e médias.

**Resposta:**

```json
[
  {
    "nome": "Aluno 1",
    "notas": [7.5, 8.0, 6.0, 9.0, 7.2],
    "frequencia": "88.00",
    "media": "7.54"
  },
  {
    "nome": "Aluno 2",
    "notas": [5.0, 6.5, 7.8, 6.9, 5.5],
    "frequencia": "85.00",
    "media": "6.34"
  }
]
```

### `GET /media-geral`

**Descrição:** Retorna a média geral da turma com base nas médias dos alunos.

**Resposta:**

```json
{
  "mediaGeral": "6.94"
}
```

### `GET /media-por-disciplina`

**Descrição:** Retorna a média das notas de cada disciplina.

**Resposta:**

```json
{
  "medias": ["6.75", "7.25", "6.90", "7.50", "6.85"]
}
```

## Premissas Assumidas

1. **Frontend e Backend Separados:** O frontend (React) e o backend (Node.js + Express) são separados para modularidade, facilitando o desenvolvimento e a escalabilidade.

2. **Comunicação via API:** A comunicação entre o frontend e o backend é feita via uma API RESTful, utilizando Axios para as requisições HTTP.

## Decisões do Projeto

1. **Frontend com React:** Escolhido por ser fácil de usar, modular e interativo, perfeito para construir interfaces dinâmicas.

2. **Backend com Express:** Optado por sua simplicidade, facilitando a criação de rotas e manipulação de requisições.

3. **Estrutura do Frontend:** O frontend é organizado de forma simples, com um arquivo principal `App.js` para gerenciar a interação com a API.

## Estrutura do Projeto

- `/frontend`: Contém o codigo do frontend (React.js)
  - `src/App.js`: Componente principal do frontend, onde ocorre a interação com o backend e a renderização da interface.
  - `src/index.css`: Arquivo CSS para a estilização do frontend.
- `backend`: Contém o código do backend (Node.js e Express).
  - `server.js`: Arquivo principal do servidor, onde são configuradas as rotas e lógica do backend.

## Informações Adicionais
- **Contato:** Para quaisquer dúvidas, me contate pelo email [marinadelfino03@gmail.com](mailto:marinadelfino03@gmail.com)

## Agradecimentos
- Gostaria de expressar minha gratidão pela oportunidade de demonstrar meus conhecimentos, especialmente com o convite da empresa. Espero que o projeto atenda às expectativas! ;)
