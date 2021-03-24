FROM node:14
MAINTAINER Sungmin Kim kim@sungmin.dev

RUN mkdir -p /app

WORKDIR /app

ADD ./ /app

RUN npm install

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]