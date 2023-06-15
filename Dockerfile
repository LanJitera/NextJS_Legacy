FROM node:14.17-alpine

COPY . /app

WORKDIR /app

RUN yarn initial

RUN yarn build

EXPOSE 80