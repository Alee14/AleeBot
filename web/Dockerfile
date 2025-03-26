FROM oven/bun:latest

WORKDIR /web

COPY . .

RUN bun install

RUN bun run build

ENTRYPOINT ["bun", "start"]

