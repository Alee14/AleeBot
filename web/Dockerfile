FROM node:lts-alpine

WORKDIR /web

COPY yarn.lock .
COPY package.json .

RUN yarn install

COPY . .

RUN yarn run build

ENTRYPOINT ["yarn", "start"]

