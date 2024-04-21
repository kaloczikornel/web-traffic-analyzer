# Configuration

The project should be fully configured from the environment variables (see [Twelve Factor App Config](https://12factor.net/config)).
These variables should be always read in the `config.ts` file, and only used from there.

## .env files

The variables can be configured either from the environment or simply read from the `.env` file. In development (and in many cases in production too),
we usually use `.env` files. These files represent the local state and hence should never be commited to git. A template of this file, `.env.example`
can be modified if a new variable has to be added.

Usually the `.env.example` file can be copied on project start, and changed to suit the development environment:

```sh
cp .env.example .env
```

## Config files

Env files are great, but they are not typesafe (you can't make it sure if a variable is set), and it can lead to subtle bugs. To make this simpler,
`config.ts` files are defined, which read the env files using [dotenv](https://www.npmjs.com/package/dotenv) and parse them to specific formats.
The variable `process.env` should only be used in this file, and it should export the contents of `.env` as typesafe variables. If the configuration
is missing, this file should throw an exception and stop the program from running (e.g. for example in a case of a missing database password).

There are a few helper functions to make it simpler to parse the variable to the correct format.

* `parseEnvNumber`: reads the variable and parses it into a number or if missing falls back to the default value
* `requiredEnvValue`: reads the variable and fails if it is not set.
