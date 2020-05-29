FROM node

EXPOSE 3001

WORKDIR /usr/app/back

COPY . .

RUN npm i -g @adonisjs/cli

RUN npm install

CMD ["adonis", "serve", "--dev"]
