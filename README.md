# Events Management Backend

## App structure

- Resolvers: Map GraphQL API resolvers info to what logic needs.
- Services: Contain the business logic.
- Repositories: logic to access the database.
- Entities: Model classes.

- Normal flow: Resolver -> Service -> Repository

\*\* All entities classes must be in an `src/app/${folderName}/entities` folder, so they are detected by migrations.

\*\* All entities classes must inherit from BaseEntity (`src/common/BaseEntity.ts`).

\*\* All service classes must be in a `src/app/${folderName}/services` folder.

\*\* All resolvers classes must be in a `src/app/${folderName}/resolvers` folder.

\*\* All db operations should be in repositories. All reusable operations should be in query sets.

## Stack

- [TypeScript](https://www.typescriptlang.org) as the language
- [TypeORM](https://typeorm.io/#/) as the database ORM
- [TypeDi](https://github.com/typestack/typedi) as dependency injection container
- [Apollo](https://www.apollographql.com/docs/) as the graphql server
- [Type-graphql](https://typegraphql.com/) as the graphql library
- [Mocha](https://mochajs.org/) as testing framework
- [Chai](https://www.chaijs.com/) as testing assert framework
- [ESLint](https://eslint.org) as a linter
- [Prettier](https://prettier.io) as a formatter
- [Husky](https://typicode.github.io/husky) as the git hooks manager
- [Git](https://git-scm.com) as the source control manager

## Documentation

[http://localhost:4000/graphql](GraphQL Documentation)

## Setup

- Install node.js and npm, then run `npm install`
- Run `husky install`
- Install [Docker](https://docs.docker.com/engine/install/) and docker-compose
- Run `docker-compose up` for the first time, then `docker-compose start` every time you start development
-Env: `cp .env.example .env` and configure if necessary

## Development

- Start local server: `npm start`
- Run tests: `npm test`
- Run linter: `npm run lint`

### Migrations (SQL)

- Create migrations: `npm run makemigrations` (<bold>Only use this when you modify the entities you need to generate the migrations</bold>)
- Apply migrations: `npm run migrate`

## Scripts

To run custom scripts: `cross-env NODE_ENV=<local|dev|staging|production> ts-node src/scripts/<script>.ts <params>`

### Main branches

- `master` (production environment).
- `main` (development environment).

All pull requests should be merged into `dev` branch.

### Deployment to server for the first time

- ssh into the instance

- sudo apt-get update

- sudo apt-get install nginx docker docker-compose

- cd /var/www/html

- sudo git clone "https://gitlhub.com/njoanc/events_management"

- cd events_management

- if `staging` sudo git checkout dev , if `production` sudo git checkout main

- cp .env.example .env (Contact njoanc@gmail.com for .env variables)

- sudo docker-compose up -d --build

- Check if the app is running without any error (sudo docker-compose logs -f events_management)

- sudo nano /etc/nginx/sites-enabled/default -> Make the necessary changes to map the backend app

### Updating the server every time there is a new change (CI/CD pipeline)

- ssh into the instance

- cd /var/www/html/events_management

- sudo git fetch

- `staging` sudo git pull origin dev, `production` sudo git pull origin main

- sudo docker-compose up -d --build

- sudo systemctl restart nginx
