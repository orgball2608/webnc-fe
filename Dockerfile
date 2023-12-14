# BUILD FOR PRODUCTION
FROM node:18-alpine As build

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY . .

COPY .env.docker ./.env

RUN npm install

RUN npm run build

# PRODUCTION
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]