FROM oven/bun:latest

WORKDIR /web

COPY . .

RUN bun run build

ENTRYPOINT ["bun", "run", "/web/dist/server/entry.mjs"]
