## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Building and running the docker image

`docker-compose up -d`

Cleanup intermediate images
`docker image prune -f`

Then visit `http://localhost:8080/graphql` in a browser.
