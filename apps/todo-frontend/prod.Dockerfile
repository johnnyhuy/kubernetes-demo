FROM --platform=linux/amd64 node:16-alpine as build

WORKDIR /opt/app

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY public/ .
COPY src/ .
COPY .env .
COPY .eslintrc.js .
COPY index.html .
COPY postcss.config.js .
COPY tailwind.config.js .
COPY tsconfig.json .
COPY vite.config.ts .
RUN yarn build

FROM --platform=linux/amd64 nginx:alpine as run

COPY ./docker/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /opt/app/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
