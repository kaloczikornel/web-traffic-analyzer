function GetCards({ models }) {
    return async function getCards({ params: { offset, limit }, data: { name, after, before } }) {
        const result = await models.Cards.findAndCountAll({
            offset,
            limit,
        });

        return {
            total: result.count,
            cards: result.rows.map((row) => {
                return row;
            }),
        };
    };
}

module.exports = GetCards;
