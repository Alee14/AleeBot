FROM node:lts-alpine

WORKDIR /bot

COPY yarn.lock .
COPY package.json .

RUN yarn install

COPY . .

ENTRYPOINT ["yarn", "start"]
