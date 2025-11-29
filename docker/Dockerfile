FROM node:24-alpine AS test
WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .
RUN npm run test

FROM node:24-alpine AS builder
WORKDIR /app

COPY package*.json .
RUN npm ci --ignore-scripts

COPY . .
RUN npm run build

FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4500

COPY --from=builder /app/.output ./.output
COPY --from=builder /app/.nuxt ./.nuxt
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 4500

ENTRYPOINT ["npm", "run", "preview"]