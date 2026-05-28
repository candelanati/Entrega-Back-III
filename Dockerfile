FROM node:20-alpine AS production

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

COPY src ./src
COPY .env.example ./.env.example

EXPOSE 8080
CMD ["node", "src/server.js"]
