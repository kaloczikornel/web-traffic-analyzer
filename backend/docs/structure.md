## Structure

The basic structure of this project is made of the base framework files (`index.js`, `config.js`, `Application.ts`) and the different components (`api`, `middlewares`, `models`, `services`). These components are registered (wired together) in the `dependencies` directory.

```
project/
├── api/                    list of API endpoints
│   ├── cards/
│   │   └── GetCards.js     endpoint function
│   ├── openapi.yaml        description of endpoints in OpenAPI 3 format
├── common/                 generic functions
├── dependencies/           registration of 
├── middleware/             express middlewares
├── models/                 list of database-specific files
├── services/               list of services
├── .env                    definitions of environment variables
├── config.js               configuration files
└── index.js                entrypoint to the whole server
```

If you want to read more about the specific components, see:

* [Configuration](configuration.md) for more information about the .env and config files
* [API](api.md) for more information about the API configuration
* [Middlewares](middlewares.md) for more information about the middleware configuration
* [Models](models.md) for more information about the models configuration
* [Services](services.md) for more information about the services configuration
