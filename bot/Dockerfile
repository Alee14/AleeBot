FROM oven/bun:latest

WORKDIR /bot

#RUN apt-get update && apt-get install -y build-essential libtool autoconf automake python3

COPY package.json ./

COPY bun.lockb ./

RUN bun run build

COPY . .

ENTRYPOINT ["node", "bot_discord.js"]

