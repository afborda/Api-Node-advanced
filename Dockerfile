FROM node:12

WORKDIR /app
COPY . .

RUN npm install
RUN npm i express
# Bundle app source


EXPOSE 3333


CMD [ "node", "app.js"]
