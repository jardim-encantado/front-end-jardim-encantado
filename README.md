# 🌼 Front end Jardim Encantado
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/css-%23663399.svg?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![MaterialUI](https://img.shields.io/badge/Material%20UI-%23FFFFFF?style=for-the-badge&logo=MUI&logoColor=#007FFF)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)


Plataforma escolar para apoiar o dia a dia do ensino fundamental com foco em comunicação, acompanhamento acadêmico e organização administrativa.

URL do site: [https://front-end-jardim-encantado.vercel.app/](https://front-end-jardim-encantado.vercel.app/)

## 🎯 Objetivo do projeto

Este projeto digitaliza processos da escola para facilitar o acesso de responsáveis, professores e equipe administrativa às informações mais importantes da rotina escolar.

## 👥 Perfis de acesso

1. **Responsável**
   Acompanha boletim, cronograma, avisos e equipe docente.
2. **Professor**
   Acompanha estudantes, cria avisos e consulta informações da turma.
3. **Administrador**
   Cadastra estudantes e professores, organiza cronograma e gerencia dados gerais.

## 🗺️ Mapa de rotas

1. **Acesso inicial**
   `/`
2. **Área do responsável**
   `/responsavel/home`
   `/responsavel/visualizarProfessor`
   `/responsavel/boletim`
   `/responsavel/perfil`
3. **Área do professor**
   `/professor/home`
   `/professor/visualizarEstudante`
   `/professor/adicionarAviso`
   `/professor/Perfil`
4. **Área administrativa**
   `/admin/visualizarEstudante`
   `/admin/criarEstudante`
   `/admin/visualizarProfessor`
   `/admin/criarProfessor`
   `/admin/cronogramaEscolar`
   `/admin/adicionarAviso`

## 🧭 Telas e funcionalidades

### 🔐 Tela de login

1. Recebe CPF com máscara e senha.
2. Valida o perfil do usuário para direcionar ao fluxo correto.
3. Salva dados essenciais da sessão para uso nas demais telas.

### 🏠 Telas do responsável

1. **Início do responsável**
   Mostra saudação, mural de avisos e cronograma escolar.
2. **Visualização de professores**
   Exibe cartões com dados dos docentes e disciplinas.
3. **Boletim**
   Permite escolher o estudante e consultar notas por disciplina e bimestre.
4. **Perfil**
   Apresenta dados de identificação e contato do responsável.

### 👩‍🏫 Telas do professor

1. **Início do professor**
   Exibe mural com avisos e cronograma de atividades.
2. **Visualização de estudantes**
   Oferece busca por nome e abertura de janela com detalhes do estudante.
3. **Criação de aviso**
   Permite cadastrar avisos com tipo, data, título e descrição.
4. **Perfil**
   Existe rota dedicada, com reaproveitamento da página de perfil já existente.

### 🧑‍💼 Telas da administração

1. **Visualizar estudantes**
   Lista estudantes, permite pesquisa e remoção.
2. **Cadastrar estudante**
   Separa dados do estudante e dados do responsável em etapas de formulário.
3. **Visualizar professores**
   Mostra listagem com busca e ações de gerenciamento.
4. **Cadastrar professor**
   Coleta dados pessoais e associa disciplinas ao docente.
5. **Cronograma escolar**
   Exibe cronograma editável para organização da rotina.
6. **Adicionar aviso**
   Compartilha o fluxo de criação de avisos com o perfil de professor.

## ⚙️ Funcionalidades gerais

1. **Carregamento inteligente**
   As páginas usam carregamento sob demanda com tela de espera.
2. **Camada de serviços de API**
   A comunicação com backend usa serviços por domínio com operações de cadastro, consulta, edição e remoção.
3. **Máscaras e sanitização de dados**
   O CPF recebe máscara visual e limpeza de caracteres antes do envio.
4. **Navegação por barra lateral**
   Cada perfil possui atalhos próprios para as telas de sua rotina.
5. **Componentes reutilizáveis**
   Mural, cronograma, boletim, cartões de informação e formulários são reutilizados em diferentes fluxos.

## 🧱 Organização do projeto

1. **`src/pages`**
   Reúne as páginas principais por perfil.
2. **`src/components`**
   Guarda componentes visuais reutilizáveis e blocos de interface.
3. **`src/api`**
   Centraliza configuração de requisições, esquemas e serviços.
4. **`src/hooks`**
   Contém regras reutilizáveis de estado e sessão.
5. **`src/assets`**
   Armazena imagens e recursos visuais.

## 🛠️ Tecnologias utilizadas

1. **React** com **Vite** para a base da aplicação.
2. **React Router** para navegação entre páginas.
3. **Material UI** e **React Select** para componentes visuais.
4. **Axios** para comunicação com API.
5. **ESLint** para qualidade de código.

## 🚀 Como executar localmente

```bash
npm install
npm run dev
```

Para gerar versão de produção

```bash
npm run build
npm run preview
```

## 📌 Pontos de atenção

1. A rota `/professor/Perfil` reaproveita a página de perfil do responsável.
2. A tela de cronograma possui estrutura visual pronta para evolução de persistência.
3. A home do responsável pode evoluir para consumir avisos dinâmicos da API, assim como já ocorre na home do professor.

## 🎨 Design e prototipação

Protótipos de interface em Figma

[Adicionar link do protótipo aqui](https://www.figma.com/design/hCJ1xyfX9gip546YjYM97B/Escola-infantil?node-id=0-1&t=YGWjWKsvTalitzLx-1)

## 📄 Licença

Este projeto possui finalidade educacional e está licenciado sob a licença MIT.

[Acessar licença](LICENSE)

## 💚 Equipe

Projeto desenvolvido pela equipe Jardim Encantado.
