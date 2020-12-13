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
