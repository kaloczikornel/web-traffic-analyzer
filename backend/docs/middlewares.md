# Middlewares

Middlewares represent functions that should run before all or some endpoints. It is not rarely necessary to add middlewares manually.

## Generic middleware

The project can use any Express compatible middleware. The `Application.ts` (or `index.js`) file is the place to add the middlewares,
if you want it to run before every endpoint. For example adding [Cors](https://expressjs.com/en/resources/middleware/cors.html)
or [Helmet.js](https://github.com/helmetjs/helmet) before all endpoints:

```ts
class Application {
    setupMiddleware() {
        // ...
        this.app.use(cors());
        this.app.use(helmet());
        // ...
    }
}
```

## Authentication middleware

The only middleware that is supported to be configured from the `openapi.yaml` file is the Authentication. To create an authentication middleware,
write a function that returns true on an authenticated user, and throws an error on failure. Set this function in the `registerOpenAPIRoutes.ts` file:

```ts
app.use(
    oasMiddleware({
        // ...
        validateSecurity: {
            handlers: {
                ApiKeyAuth: middleware.apiKeyAuth,
            },
        },
    })
);
```

If you set it, this middleware can be set in a case-by-case basis with [OpenAPI](https://swagger.io/docs/specification/authentication/):

```yaml
paths:
  /users/me:
    get:
      summary: Get data for current user
      operationId: getCurrentUser
      responses:
        # ...
      security:
        - ApiKeyAuth: []
```
