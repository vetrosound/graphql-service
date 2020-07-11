FROM node:lts

# build our app from source
WORKDIR /build
COPY package.json ./
COPY yarn.lock ./
COPY nest-cli.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./
COPY .env ./.env
COPY src ./src
RUN yarn install && yarn gents && yarn build

# use docker multistage build to start with a fresh image
# then we copy only the files needed to install production
# dependencies and run the app
FROM node:lts

ENV SERVER_INTERFACE 0.0.0.0
ENV SERVER_PORT 8080

EXPOSE $SERVER_PORT

WORKDIR /usr/src/app
COPY --from=0 /build/package.json ./
COPY --from=0 /build/.env ./.env
COPY --from=0 /build/yarn.lock ./
COPY --from=0 /build/dist ./dist
RUN yarn install --production
ENTRYPOINT ["node", "dist/main"]
