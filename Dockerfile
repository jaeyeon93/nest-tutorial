FROM node:10.19-alpine

MAINTAINER Jimmy KIM <jimmyjaeyeon@gmail.com>

RUN apk update && apk upgrade
RUN apk --no-cache add --virtual builds-deps build-base python

RUN mkdir app
# set app directroy as workdirectory
WORKDIR /app
# copy current file to app directroy
COPY package*.json ./
COPY .env ./
RUN ls /app
# npm module install
RUN npm install
RUN npm rebuild bcrypt --build-from-source
COPY . .
RUN npm run build
RUN ls

# run command npm start
CMD ["node", "dist/main"]
