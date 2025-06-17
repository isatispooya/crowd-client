FROM node:18

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps

RUN npm run build

RUN npm install -g vite

EXPOSE 8110

CMD ["npm", "start"]
