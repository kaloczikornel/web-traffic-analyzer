/**
 * @typedef {function({params: object, data: object, user: object, auth0User: object}): Promise<any>} Operation
 */

const GetCards = require('../api/cards/GetCards');

function configureOperations({ models, services }) {
    const getCards = GetCards({ models });

    return {
        getCards,
    };
}

module.exports = configureOperations;
