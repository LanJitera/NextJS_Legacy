 
FROM node:16-alpine as base

WORKDIR /app
COPY package.json /app
COPY yalc.lock /app
COPY yarn.lock /app
COPY libraries /app/libraries
RUN yarn initial

 
FROM node:16-alpine as builder

WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . /app/
RUN yarn build:staging
