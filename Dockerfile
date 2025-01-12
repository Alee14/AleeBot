FROM node:latest

WORKDIR /usr/src/bot

RUN apt-get update && apt-get install -y build-essential libtool autoconf automake python3

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

ENTRYPOINT ["node", "bot_discord.js", "--beta"]
