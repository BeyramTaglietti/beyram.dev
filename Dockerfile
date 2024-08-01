FROM node:20-slim AS base

WORKDIR /


COPY pnpm-lock.yaml . 
COPY package.json . 

RUN npx pnpm i

COPY . .

RUN npx pnpm build

CMD ["npm", "start"]