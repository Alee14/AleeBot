FROM oven/bun:latest

WORKDIR /web

COPY bun.lockb .
COPY package.json .

RUN bun install

COPY . .

RUN bun run build

ENTRYPOINT ["bun", "start"]

