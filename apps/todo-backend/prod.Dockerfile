FROM --platform=linux/amd64 node:16-alpine as build

WORKDIR /opt/app

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .
RUN yarn build

FROM --platform=linux/amd64 node:16-alpine as run

WORKDIR /opt/app

COPY --from=build /opt/app/dist /opt/app/dist
COPY --from=build /opt/app/node_modules /opt/app/node_modules
COPY --from=build /opt/app/.env /opt/app/.env

CMD [ "node", "/opt/app/dist/main.js" ]
