FROM oven/bun:latest

WORKDIR /bot

COPY bun.lockb .
COPY package.json .

RUN bun install

COPY . .

ENTRYPOINT ["bun", "start"]
