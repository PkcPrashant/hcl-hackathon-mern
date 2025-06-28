# Express TypeScript Template

This project is a boilerplate for building RESTful APIs using [Express](https://expressjs.com/) and [TypeScript](https://www.typescriptlang.org/). It includes basic project structure, scripts for development and production, integration with a database, and [Prisma](https://www.prisma.io/) as an ORM.

## Features

- Express.js server
- TypeScript support
- Environment variable management
- Database integration (see below)
- Prisma ORM integration
- Ready-to-use scripts for development and production

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v24.2.0+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (v1.22.22+ recommended)
- [Docker](https://www.docker.com/) (v28.2.2+ for running the database)

### Installation

1. Clone the repository:
    ```bash
    git clone <repo-url>
    cd express-ts-template
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Database

The project uses Docker to run the database. Make sure Docker is installed and running.

Start the database container:
```bash
docker-compose up
```

This will start the database defined in the `docker-compose.yml` file.

### Prisma

This project uses [Prisma](https://www.prisma.io/) (`prisma` v6.10.1, `@prisma/client` v6.10.1) for database access.

#### Main Prisma Commands:

- **Generate Prisma client** (after changing the schema):
    ```bash
    npx prisma generate
    ```

- **Apply migrations to the database**:
    ```bash
    npx prisma migrate dev
    ```

- **Open Prisma Studio (GUI for working with the database):**
    ```bash
    npx prisma studio
    ```

### Running the Project

#### Development

Start the server in development mode (with hot-reloading):
```bash
npm run dev
# or
yarn dev
```

#### Production

Build the project:
```bash
npm run build
# or
yarn build
```

Start the server in production mode:
```bash
npm start
# or
yarn start
```

### Useful Scripts from `package.json`

- `dev` — Runs the server in development mode with hot-reloading.
- `build` — Compiles TypeScript to JavaScript.
- `start` — Runs the compiled server in production mode.
- `prisma:generate` — Runs `prisma generate` to regenerate the Prisma client.
- `prisma:migrate` — Runs `prisma migrate dev` to apply migrations to the database.

## Environment Variables

Configuration is managed via the `.env` file. Copy `.env.example` to `.env` and adjust values as needed.

```bash
cp .env.example .env
```

## Important for Production

**Do not commit your `.env` file to version control in production!**

By default, `.env` is commented out in `.gitignore`.
**Uncomment the `.env` line in `.gitignore` before deploying to production** to ensure sensitive data is not tracked by git.

## License

MIT
