## Getting Started

First, run the development server:

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

This project uses [`mysql:8.2.0`](https://nextjs.org/docs/basic-features/font-optimization) as database for this project.
[`drizzleORM`](https://nextjs.org/docs/basic-features/font-optimization) as ORM for this project.

## Deploy on local machine

1. Spin up database server

- Navigate to root dir of this project.
- Make sure that docker is install on your local machine.
- Run `docker-compose up -d mysql_host` to start mysql server.

2. Run NextJS project as above mentioned.
