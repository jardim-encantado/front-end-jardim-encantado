# Front-end do Jardim Encantado
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/css-%23663399.svg?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

Plataforma Escolar para o Ensino Fundamental

## Overview 🌠
O projeto tem intuito de simplificar o fluxo escolar por meio da digitalização de processos em uma plataforma online simples e acessível para os alunos, estudantes e responsáveis;

### Tecnologias ✨
Para a realização, estamos fazendo uma aplicação SPA WEB usando:
- **🛠️ Construção do site**
    - HTML + CSS + JS
    - React
    - Axios para integração com api
- **🚀 DevOps**
    - Actions do github
    - Contêinerização com Docker
    - Hosting com vercel

## Telas e Features 💎
- **🔐 Login** (`/`)
    - Porta de entrada da aplicação.
    - Recebe CPF com máscara e senha do usuário.
    - Atualmente redireciona para a Home ao clicar em **Entrar**.

- **🏠 Home** (`/home` e `/professor/home`)
    - Tela inicial com saudação para o responsável/usuário.
    - Exibe o **Mural de Avisos** com comunicados da escola.
    - Mostra o **Cronograma** com eventos/agenda escolar.

- **📊 Boletim** (`/boletim`)
    - Tela para consulta de notas/desempenho escolar.
    - Permite selecionar o estudante no dropdown.
    - Exibe as informações de boletim no componente principal.

- **👩‍🏫 Professores** (`/professor`)
    - Lista os professores e equipe pedagógica em cards.
    - Mostra dados relevantes como cargo, contato e disciplina.

- **🧑‍🎓 Estudantes (visão do professor)** (`/professor/estudante`)
    - Tela de acompanhamento de alunos para o perfil professor.
    - Possui filtro por série e busca por nome.
    - Permite abrir popup com detalhes do aluno e criar avisos direcionados.

- **📝 Admin - Adicionar Estudante** (`/admin/criarEstudante`)
    - Tela administrativa para cadastro de novo aluno.
    - Separa dados do estudante e dados do responsável em formulários distintos.

- **👨‍🏫 Admin - Adicionar Professor** (`/admin/criarProfessor`)
    - Tela administrativa para cadastro de professor.
    - Coleta os dados do docente e finaliza o cadastro com ação de salvar.

## Design e Prototipação 🎨
Nós prototipamos o aplicativo WEB e mobile usando o figma [segue link do figma aqui](link)


## Licença 📃
Este projeto é um projeto de um ensino médio técnico com o objetivo de aprendizado;

Por isso, encontra-se licenciado sob a MIT, [clique aqui para acessar](LICENSE)


## Autores 💃
Feito com 💜 pelos devs do Jardim Encantado