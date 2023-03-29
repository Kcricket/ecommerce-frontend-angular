FROM node:latest as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

RUN npm run build

# Serve the app with nginx

FROM nginx:latest

COPY --from=build /usr/local/app/dist/ecommerce-frontend /usr/share/nginx/html

EXPOSE 80
