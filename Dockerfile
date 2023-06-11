FROM node:14-alpine3.17 as builder
RUN apk add g++ make python
WORKDIR '/app'
COPY ./package.json ./
RUN npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
RUN npm --registry=https://registry.npm.taobao.org install
RUN npm install
COPY . .
RUN npm run build:prod

FROM nginx
EXPOSE 9527
COPY nginx.conf /etc/nginx/
COPY --from=builder /app/dist /usr/share/nginx/html/
