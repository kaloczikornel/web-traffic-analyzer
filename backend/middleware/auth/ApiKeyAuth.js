const { UnauthorizedError } = require('../../common/errors');

function ApiKeyAuth({ models }) {
    return async function apiKeyAuth(req) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedError('No authorization header found');
        }
        const [format, token] = authHeader.split(' ');

        if (!format || format !== 'Bearer' || !token) {
            throw new UnauthorizedError('Authorization header should be in Bearer format');
        }

        // TODO: check token with one from the ENV
        // throw new UnauthorizedError('Invalid token');
        return true;
    };
}

module.exports = ApiKeyAuth;
