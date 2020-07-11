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

## Building a docker image

`docker build --tag cypher-graphql .`

Cleanup intermediate images
`docker image prune -f`

## Running the docker image

`docker run --detach --name cypher-graphql --publish 8080:8080 cypher-graphql`

Stop and cleanup the docker container
`docker stop cypher-graphql && docker container prune -f`

Then visit `http://localhost:8080/chris` in a browser
