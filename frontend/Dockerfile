FROM node:12-alpine as builder
WORKDIR /usr/src/app

COPY . /usr/src/app

CMD ["npm", "start"]
RUN npm install 
RUN npm run 