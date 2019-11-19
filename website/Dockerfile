FROM node:8.10-alpine

WORKDIR /src
ADD . ./

RUN rm -rf node_modules
RUN npm install
RUN npm run build
CMD npm start