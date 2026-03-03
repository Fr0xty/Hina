FROM node:24.13.0-bookworm AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn run docker:build

FROM node:24.13.0-bookworm-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./
COPY package.json ./

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/app.js"]
