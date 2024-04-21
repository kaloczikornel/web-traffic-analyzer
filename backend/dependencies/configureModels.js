const Cards = require('../models/Cards');

function configureModels(sequelize) {
    Cards.init(sequelize);

    const { models } = sequelize;

    for (const modelName of Object.keys(models)) {
        sequelize.models[modelName].associate(sequelize.models);
    }

    return { Cards, sequelize };
}

module.exports = configureModels;
