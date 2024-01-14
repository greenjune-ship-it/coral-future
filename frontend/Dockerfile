FROM node:12-alpine as builder
WORKDIR /usr/src/app/frontend

COPY package.json /usr/src/app/frontend/package.json
COPY package-lock.json /usr/src/app/frontend/package.json
RUN npm install 
COPY . /usr/src/app/frontend/
RUN npm run 