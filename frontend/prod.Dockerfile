FROM node:16 AS base

WORKDIR /usr/src/app

COPY . .

RUN npm install --legacy-peer-deps

FROM base as build-stage

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api

RUN npm run build