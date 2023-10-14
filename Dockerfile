FROM node:alpine

WORKDIR /usr/src/bot

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

CMD ["node", "bot_discord.js"]
