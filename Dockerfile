FROM node:16-alpine3.14

WORKDIR /app

COPY . .

# TODO: use pnpm
RUN yarn install && yarn build

EXPOSE 3000

ENTRYPOINT [ "node", "./dist/main.js" ]
