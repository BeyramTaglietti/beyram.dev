FROM oven/bun:latest

WORKDIR /


COPY bun.lockb ./
COPY package.json . 

RUN bun install

COPY . .

RUN bun run build

CMD ["bun", "start"]