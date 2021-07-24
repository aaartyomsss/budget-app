FROM node:14-alpine

RUN mkdir -p /usr/src/app/backend

WORKDIR /usr/src/app/backend

COPY . /usr/src/app/backend

RUN npm install

RUN npm install -g --save-dev jest 