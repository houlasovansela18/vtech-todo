FROM --platform=linux/amd64 oven/bun:1 as base

WORKDIR /vtech-todo

COPY .next/standalone/ .
COPY .next/static .next/static
COPY public /public
COPY .env .env.production

EXPOSE 3000
CMD ["node", "server.js"]
