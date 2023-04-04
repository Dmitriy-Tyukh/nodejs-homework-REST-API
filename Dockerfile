FROM node:16.20.0

WORKDIR /app

COPY . .

RUN npm install

# удаляем bcrypt from packaje.json и добавляем 
# RUN npm i bcrypt
# после этого билдим images

EXPOSE 8080

CMD ["node", "server"]

