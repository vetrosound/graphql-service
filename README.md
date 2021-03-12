[![Build Status](https://travis-ci.com/vetrosound/graphql-service.svg?branch=main)](https://travis-ci.com/vetrosound/graphql-service)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=vetrosound-graphql-service&metric=alert_status)](https://sonarcloud.io/dashboard?id=vetrosound-graphql-service)

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

# run tests with changes
$ yarn test:watch

# e2e tests
$ yarn test:e2e
```

## Working with docker (docker-compose must be installed)

### Build and Run
`yarn docker:build:run`

Then visit `http://localhost:8080/graphql` in a browser.

### Stop
`yarn docker:stop`
