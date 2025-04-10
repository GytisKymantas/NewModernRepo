# build environment
FROM node:18.14.2-alpine as build

WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm ci --silent
COPY . /usr/src/app

RUN npm run build

# production environment
FROM nginx:1.23.3-alpine

RUN rm -v /etc/nginx/conf.d/default.conf
ADD ./.docker/nginx/conf.d/default.conf /etc/nginx/conf.d/
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
