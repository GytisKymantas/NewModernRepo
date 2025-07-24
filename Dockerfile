# build environment
FROM node:18.14.2 as build

WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Configure Node.js for containerized environments
ENV NODE_OPTIONS="--max-old-space-size=4096 --max-semi-space-size=128"
ENV UV_THREADPOOL_SIZE=4

# Configure npm proxy settings
RUN npm config set proxy http://httpUser:httpPassword@91.199.55.3:3128 && \
    npm config set https-proxy http://httpsUser:httpsPassword@91.199.55.3:3128 && \
    npm config set registry https://registry.npmjs.org/

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm ci --legacy-peer-deps --no-audit --no-fund
COPY . /usr/src/app

RUN npm run build:standalone

# production environment
FROM nginx:1.23.3-alpine

RUN rm -v /etc/nginx/conf.d/default.conf
ADD ./.docker/nginx/conf.d/default.conf /etc/nginx/conf.d/
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
