FROM node:14-alpine

WORKDIR /usr/src/backend

COPY . .

RUN npm install

ENV NODE_ENV=production

CMD npm start