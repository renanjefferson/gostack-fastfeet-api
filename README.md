<h1 align="center">
  <img alt="Fastfeet" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/blob/master/.github/logo.png" width="300px" />
</h1>

## Desafio 2: Iniciando aplicação

Este projeto é dedicado à construção da aplicação FastFeet que será utilizada como avalição no Bootcamp GoStack da Rocketseat


## Sobre o projeto

Este projeto é uma aplicação completa (Back-end, Front-end e Mobile), que consiste em criar um sistema para uma transportadora fictícia.


## Para desenvolvimento
### Pré-requisitos / Tecnologias envolvidas

* [Node.js](https://nodejs.org/en/) (versão utilizada 12.14.1 LTS);
* [Yarn](https://legacy.yarnpkg.com/lang/en/) (opcional - versão utilizada 1.21.1);
* [Insomnia](https://insomnia.rest/) (REST client);

- Node.js;
- Express;
- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Docker;
- Sequelize (Utilizando PostgreSQL);
- Yup;
- JWT + Bcrypt;

## Funcionalidades da aplicação

***1. Cadastro de usuários*** - Esta funcionalidade é responsável por cadastrar os usuários que terão acesso ao sistema (administradores).

***2. Autenticação de usuários*** - Esta funcionalidade é responsável por autenticar o acesso dos usuários cadastrados para que estes possam ter acesso às funcionalidades de edição de dados do usuário, cadastro e edição de destinatários.

***3. Cadastro e edição de destinatários*** - Esta funcionalidade permite cadastrar e editar destinatários da transportadora. Esta funcionalidade é acessível apenas para usuários que estejam autenticados no sistema.

## Instalação

Clone o repositório:
```sh
$ git clone https://github.com/renanjefferson/gostack-fastfeet-api.git
```

Navege até a pasta do projeto:
```sh
$ cd gostack-fastfeet-api
```

Instale as dependências:
```sh
yarn
```

Em seguida, você deve criar seu banco de dados do postgres (ou outro se desejar) e preencher seus próprios campos no arquivo .env.

Agora, você precisa criar tabelas com o comando:
```sh
yarn sequelize db:migrate
```

Inicie o servidor:
```sh
$ yarn dev
```
## Agradecimentos

### Renan Jefferson :wave:

