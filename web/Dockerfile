FROM oven/bun:latest

WORKDIR /web

COPY package.json ./

COPY bun.lockb ./

COPY . .

RUN bun install

RUN bun run build

ENTRYPOINT ["bun", "start"]

