[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://img.shields.io/badge/node.js-v18+-green" target="_blank"><img src="https://img.shields.io/badge/node.js-v18+-green" alt="Node.js Version" /></a>
  <a href="https://img.shields.io/badge/nestjs-v9.0-red" target="_blank"><img src="https://img.shields.io/badge/nestjs-v9.0-red" alt="NestJS Version" /></a>
  <a href="https://img.shields.io/badge/license-MIT-blue" target="_blank"><img src="https://img.shields.io/badge/license-MIT-blue" alt="License" /></a>
  <a href="https://img.shields.io/badge/docker-compatible-blue" target="_blank"><img src="https://img.shields.io/badge/docker-compatible-blue" alt="Docker" /></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->



# **EducaGame — Back-End**

## **Descrição**
O **EducaGame** é uma plataforma gamificada desenvolvida para auxiliar professores(as) da rede pública no gerenciamento de turmas, avaliações e desempenho dos alunos. Além disso, a plataforma utiliza elementos de gamificação para aumentar o engajamento e a motivação dos estudantes.

Este repositório contém a implementação do back-end do sistema, desenvolvido utilizando o framework **NestJS** e o ORM **Prisma**. O back-end gerencia toda a lógica de negócios, persistência de dados e comunicação com o front-end.

## **Sobre o EducaGame**

O **EducaGame** é uma plataforma gamificada inovadora desenvolvida para auxiliar professores da rede pública no processo de ensino e aprendizagem. Através de atividades personalizadas e desafios interativos, o EducaGame busca tornar a aquisição de conhecimento mais envolvente e motivadora para os alunos.

### **Principais Características**
- Atividades personalizadas pelos professores para cada matéria.
- Sistema de recompensas com moedas virtuais para incentivar o engajamento dos alunos.
- Possibilidade de trocar moedas por pontos extras no boletim ao final do bimestre.
- Abordagem gamificada para tornar o ensino mais dinâmico e interativo.

### **Desafios e Aprendizados**

Durante o desenvolvimento do EducaGame, a equipe enfrentou alguns desafios, como a gestão eficiente do tempo e a necessidade de reuniões frequentes para manter a produtividade. Além disso, a arquitetura do projeto se mostrou um elemento essencial para o sucesso da solução.

Um dos principais desafios foi inovar em um mundo em constante evolução tecnológica, buscando oferecer uma ferramenta que realmente fizesse a diferença na experiência de ensino e aprendizagem.

### **Visão para o Futuro**
A equipe do EducaGame tem uma visão ambiciosa para o futuro da plataforma. Alguns dos objetivos incluem:
- Expandir a gamificação, integrando uma ampla variedade de conteúdos dinâmicos e interações entre alunos e professores.
- Criar uma biblioteca virtual rica em materiais específicos e gratuitos para potencializar o aprendizado.
- Simplificar e otimizar a gestão acadêmica, facilitando o controle de notas, provas e trabalhos em tempo real.
- Aprimorar o monitoramento da frequência dos alunos e tornar o compartilhamento de feedbacks com os pais mais eficiente.

Essas melhorias visam proporcionar uma experiência ainda mais completa e eficaz para alunos, professores e gestores educacionais.

### **Arquitetura e Entrega**

O EducaGame foi desenvolvido seguindo uma arquitetura modular e organizada, visando facilitar a manutenção e escalabilidade do sistema. A equipe se dedicou a entregar um MVP (Minimum Viable Product) funcional que demonstra o potencial da plataforma em auxiliar no processo de ensino e aprendizagem.

## **Arquitetura do Sistema**
O back-end segue uma arquitetura modular, organizada para facilitar a adição de novas funcionalidades e manutenção. A estrutura do projeto está organizada da seguinte forma:


```plaintext
EducaGame-back
├── .idea/
├── coverage/
├── dist/
├── node_modules/
├── prisma/
│   ├── schema.prisma      # Definição do banco de dados
├── src/
│   ├── mocks/             # Mocks para testes
│   ├── modules/           # Módulos principais do sistema
│   │   ├── activities/    # Gestão de atividades
│   │   ├── auth/          # Autenticação e autorização
│   │   ├── gamification/  # Lógica de gamificação
│   │   ├── notifications/ # Gestão de notificações
│   │   ├── quizzes/       # Gestão de quizzes
│   │   ├── turmas/        # Gestão de turmas e alunos
│   │   ├── users/         # Gestão de usuários
│   ├── shared/            # Serviços e utilitários compartilhados
├── test/                  # Arquivos de testes unitários
├── .env                   # Variáveis de ambiente
├── Dockerfile             # Configuração do Docker
├── docker-compose.yml     # Configuração do Docker Compose
├── package.json           # Dependências e scripts do projeto
├── tsconfig.json          # Configuração do TypeScript

```


## **Tecnologias Utilizadas**
- **Node.js**: Ambiente de execução para o back-end.
- **NestJS**: Framework para construção de aplicativos escaláveis e modulares.
- **Prisma ORM**: Gerenciamento de banco de dados relacional.
- **PostgreSQL**: Banco de dados utilizado no projeto.
- **JWT (JSON Web Token)**: Autenticação e autorização.
- **Docker**: Containerização para desenvolvimento e produção.
- **TypeScript**: Linguagem principal para o projeto.
- **Jest**: Framework de testes para JavaScript e TypeScript.

### **Funcionalidades de Destaque**
- Login seguro com autenticação JWT.
- Gerenciamento de turmas, usuários e avaliações.
- Sistema de gamificação motivacional com recompensas e rankings.
- Correção automática de quizzes e geração de relatórios.
- Notificações automáticas e feedback para alunos.
- Arquitetura modular e escalável para adição de novas funcionalidades.

## **Principais Módulos**
### **Auth (Autenticação e Autorização)**
O módulo de autenticação e autorização é responsável por gerenciar o acesso seguro ao sistema. Ele possui as seguintes funcionalidades:

- **Funcionalidades**:
    - Login de usuários com e-mail e senha.
    - Geração de tokens JWT para autenticação.
    - Controle de acesso baseado em papéis (alunos, professores, administradores).

### **Users (Gestão de Usuários)**
O módulo de gestão de usuários é responsável por gerenciar as informações de professores, alunos e administradores. Ele oferece as seguintes funcionalidades:

- **Funcionalidades**:
    - Cadastro, leitura, atualização e exclusão de usuários.
    - Diferenciação entre os tipos de usuários, como professores e alunos.

### **Activities (Gestão de Atividades)**
O módulo de gestão de atividades permite que os professores criem e organizem atividades pedagógicas. Ele possui as seguintes funcionalidades:

- **Funcionalidades**:
    - CRUD de atividades pedagógicas.
    - Associação de atividades a turmas e alunos.

### **Gamification (Gamificação)**
O módulo de gamificação é responsável por gerenciar os elementos gamificados do sistema, como pontos, conquistas e rankings. Ele oferece as seguintes funcionalidades:

- **Funcionalidades**:
    - Atribuição de pontos e recompensas digitais aos alunos.
    - Rankings individuais e por turma.
    - Configuração de regras de gamificação pelos professores.

### **Quizzes (Gestão de Avaliações)**
O módulo de gestão de avaliações permite a criação e organização de quizzes e provas interativas. Ele possui as seguintes funcionalidades:

- **Funcionalidades**:
    - Criação de quizzes personalizados.
    - Correção automática e geração de relatórios de desempenho.

### **Turmas (Gestão de Turmas e Alunos)**
O módulo de gestão de turmas e alunos é responsável por gerenciar turmas, incluindo a associação entre alunos e professores. Ele oferece as seguintes funcionalidades:

- **Funcionalidades**:
    - Cadastro e organização de turmas.
    - Associação de avaliações a turmas específicas.

### **Notifications (Notificações)**
O módulo de notificações é responsável por gerenciar o envio de mensagens automáticas para alunos, professores e responsáveis. Ele possui as seguintes funcionalidades:

- **Funcionalidades**:
    - Notificações automáticas sobre atividades, quizzes e relatórios.
    - Feedback instantâneo para alunos ao final das avaliações.

## **Banco de Dados**
O banco de dados foi modelado utilizando o **Prisma ORM** com o **PostgreSQL**. O arquivo `schema.prisma` define as tabelas e seus relacionamentos.

### **Entidades Principais**
- **User**: Registra informações de professores, alunos e administradores.
- **Turma**: Armazena informações sobre as turmas e seus membros.
- **Activity**: Representa as atividades pedagógicas criadas pelos professores.
- **Quiz**: Registra os quizzes criados e seus resultados.
- **Gamification**: Armazena dados sobre pontos, níveis e conquistas dos alunos.

## **Configuração do Projeto**
### **Pré-Requisitos**
- **Node.js** (versão 18 ou superior)
- **Docker** (opcional, para execução em container)
- **PostgreSQL** (se executado localmente)

### **Instalação**
1. Clone o repositório:
   ```bash
   git clone https://github.com/FullStack24/EducaGame-back.git
   cd EducaGame-back
   ```
2. Instale as dependências:
   ```bash
    npm install
    ```
3. Crie um arquivo `.env` na raiz do projeto com as variáveis de ambiente necessárias. Você pode utilizar o arquivo `.env.example` como base.

### **Exemplo do Arquivo `.env`**
```plaintext
DATABASE_URL=postgresql://user:password@localhost:5432/educagame
JWT_SECRET=seu_segredo_jwt
PORT=3000
```
4. Execute as migrações do banco de dados:
   ```bash
  Npx prisma generate && npx prisma db push
   ```
5. Inicie o servidor de desenvolvimento:
   ```bash
    npm run start:dev
    ```
6. O servidor estará disponível em `http://localhost:3000`.
7. Para executar os testes, utilize o comando:
   ```bash
    npm run test
    ```
### **Execução com Docker**
1. Certifique-se de que o Docker está instalado e funcionando corretamente.
2. Execute o comando:
   ```bash
   docker-compose up
   ```
3. O servidor estará disponível em `http://localhost:3000`.

### **Rotas Principais**
### **Autenticação**
- **POST /auth/login**: Realiza o login de um usuário e retorna um token JWT.
- **POST /auth/register**: Cadastra um novo usuário no sistema.

### **Usuários**
- **GET /users**: Retorna a lista de usuários cadastrados.
- **GET /users/:id**: Retorna os detalhes de um usuário específico.
- **POST /users**: Cadastra um novo usuário.
- **PUT /users/:id**: Atualiza os dados de um usuário.
- **DELETE /users/:id**: Remove um usuário do sistema.

### **Atividades**
- **GET /activities**: Retorna a lista de atividades cadastradas.
- **GET /activities/:id**: Retorna os detalhes de uma atividade específica.
- **POST /activities**: Cadastra uma nova atividade.
- **PUT /activities/:id**: Atualiza os dados de uma atividade.
- **DELETE /activities/:id**: Remove uma atividade do sistema.

### **Gamificação**
- **GET /gamification**: Retorna os dados de gamificação dos alunos.
- **POST /gamification**: Atualiza os pontos e níveis dos alunos.
- **GET /gamification/ranking**: Retorna o ranking dos alunos.
- **GET /gamification/:id**: Retorna os detalhes da gamificação de um aluno específico.

### **Quizzes**
- **GET /quizzes**: Retorna a lista de quizzes cadastrados.
- **GET /quizzes/:id**: Retorna os detalhes de um quiz específico.
- **POST /quizzes**: Cadastra um novo quiz.
- **PUT /quizzes/:id**: Atualiza os dados de um quiz.
- **DELETE /quizzes/:id**: Remove um quiz do sistema.

### **Contribuição**
- **Crie uma branch**: `git checkout -b feature/nova-funcionalidade`
- **Commit suas mudanças**: `git commit -am 'Adiciona nova funcionalidade'`
- **Push para a branch**: `git push origin feature/nova-funcionalidade`
- **Envie um Pull Request**
- **Issues**: Reporte problemas ou sugira melhorias na seção de Issues.
- **Contato**: Entre em contato com os desenvolvedores em caso de dúvidas ou sugestões.

## Equipe

- Ariel Andrielli Rodrigues da Silva
- José Luccas Gabriel Francisco de Andrade Santos
- Vitor Vilton Laurentino
- Thwany Leles

### **Referências**
- Protótipo no Figma: [Link para o Figma](https://www.figma.com)
- Repositório do Front-End: [EducaGame Front-End](https://github.com/FullStack24/EducaGame-front)
- Documentação do Prisma ORM: [Prisma Docs](https://www.prisma.io/docs)

### **Licença**
Este projeto está licenciado sob a licença MIT.
