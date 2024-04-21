# API

The API layer exposes an API to the user. This is done with an OpenAPI 3 configuration `openapi.yaml`, which calls the functions in the `api` directory.

## openapi.yaml

This is an [OpenAPI 3](https://swagger.io/docs/specification/about/) configuration file, which is used to describe the endpoints in the API.
This configuration is an open standard, which allows us to pull in some dependencies, for example a full UI, that can be used to
try the endpoints (see `/docs`) or a TypeScript type generator.

For more information of the OpenAPI Schema, you should consult [the specification](https://swagger.io/docs/specification/about/) and the
[Swagger Editor](https://editor.swagger.io/). Some recommendations how we use OpenAPI are listed here (not exhaustive):

- Always check if the `openapi.yaml` is valid: a missing space can break the whole application.
- Use IDE or extensions to get autocomplete and linting on the configuration.
- Use `#/` references to schemas everywhere (e.g. in params, request and response bodies, errors) for reusability.
- If your schema exists in your codebase (e.g. database models), make them as close as possible to avoid bugs.
- Make necessary keys of your schema required and set `additionalProperties` to `false` for most places.
- Enable responseType checking to make sure that correct formats are returned always.
- Add descriptions at least to endpoints, but even to schemas and other parameters.

## Endpoints

Endpoints are structured under the `api/` directory. Every endpoint should be one separate function in one separate file.
These can be structured into directories to add namespacing. These are often separated with the resource for RESTful applications.

Every endpoint should export a nested function. The difference between the inner function and outer function are that
the outer function injects the dependencies, e.g. models, services (same for every call), while the inner function
injects the parameters, body and user (different between calls).

```js
function Operation({ models, services }) {
    return async function operation({ params, data, user } }) {
        // ...
    }
}
```

The endpoint should return the same format as the OpenAPI defines. It can also throw errors from the [http-errors](https://www.npmjs.com/package/http-errors) library,
which will be handled as a JSON object, with the correct status and message. If TypeScript is used, the API types should be imported
from the `swagger-typescript-api.ts` file, so they are consistent with the `openapi.yaml` schema.

```js
function Operation({ models, services }) {
    return async function operation({ params: { id } } }) {
        const user = models.Users.findOneBy({ id });
        if (user === null) {
            // Return 404 error with JSON error object
            throw new NotFound(`User with id ${id} not found`);
        }
        // Return the user as JSON string
        return user;
    }
}
```
