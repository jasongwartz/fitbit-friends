# Fitbit Friends!

'Fitbit Friends' is a tool to compare your activity with that of your friends. The data is sourced from the Fitbit API.

The system is built as a Vue.js (Nuxt with TypeScript) frontend, a serverless API (also TypeScript), and AWS DynamoDB (provisioned with Terraform) for storage.

## Developing

### Prerequisites

You'll need:
- [Yarn](https://yarnpkg.com/)
- [now cli](https://zeit.co/docs/now-cli)
- [Docker](https://www.docker.com/)
- [aws-cli](https://aws.amazon.com/cli/)

### Starting

To run the project locally:

1. Run `yarn` to install dependencies.
2. In another terminal, run `yarn devdb` to start a local DynamoDB instance in a Docker container (and leave it running).
3. Run `yarn devdb-tables` to create DynamoDB tables in the local (Docker) instance.
4. Run `now dev`, which will start the Nuxt dev server as well as set up the API handlers.

### Tests

Unit tests are written in TypeScript with Jest. Run all the tests with `yarn test`.

### Linting

Eslint is configured for JavaScript, TypeScript, and Vue files. Check the linting with `yarn lint` (this will also be checked by a CI action).

## CI

Github Actions are configured for verifying linting, running unit tests, and provisioning infrastructure with Terraform.

Zeit Now will automatically deploy every commit (production for master, preview environment for all other branches).
