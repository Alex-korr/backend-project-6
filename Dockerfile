FROM node:18-slim

WORKDIR /project

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .

ENV NODE_ENV=production
RUN npm run build || true

CMD ["bash", "-c", "npx knex migrate:latest && npm start"]
