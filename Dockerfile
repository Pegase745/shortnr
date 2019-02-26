FROM node:lts-slim

WORKDIR /srv/shortnr

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000 8080

CMD ["npm", "start"]
