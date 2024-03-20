FROM --platform=linux/amd64 oven/bun:1 as base

WORKDIR /vtech-todo

COPY .next/standalone/ .
COPY .next/static .next/static
COPY public /public
ARG ENV
COPY .env.${ENV} .env.production

EXPOSE 3000
CMD ["node", "server.js"]
