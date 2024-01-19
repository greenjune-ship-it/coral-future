FROM node:14-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install

# Copy the rest of the application code
COPY . .

CMD ["npm", "start"]

