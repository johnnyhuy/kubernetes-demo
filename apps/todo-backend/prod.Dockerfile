FROM node:16-alpine

WORKDIR /opt/app

COPY package* ./
RUN yarn
COPY . .

CMD [ "yarn", "start:dev" ]
