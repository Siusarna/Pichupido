FROM node:12.16.1

RUN mkdir -p /pichupido-api

WORKDIR /pichupido-api

COPY package*.json /pichupido-api/

RUN npm i

COPY . /pichupido-api

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
