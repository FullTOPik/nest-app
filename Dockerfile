FROM node:16.17.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD npm run migration:run && npm run start:prod