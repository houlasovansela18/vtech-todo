## Getting Started

For development process, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`mysql:8.2.0`](https://hub.docker.com/_/mysql) as database for this project.
[`drizzleORM`](https://orm.drizzle.team/docs/overview) as ORM for this project.

## Deploy on local machine

1. Make sure that `docker` is install on your local machine:

- Run `docker --version` #expect `Docker version x.x.x, build xxxx`.

2. Run project using `docker-compose` on local machine:

- Run `docker-compose up -d development` for development env.
- Run `docker-compose up -d production` for production env.
