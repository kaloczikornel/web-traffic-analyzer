const { Model, DataTypes } = require('./sequelize');

class Cards extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
            },
            {
                sequelize,
                tableName: 'cards',
                underscored: true,
                charset: 'utf8',
                paranoid: true,
                timestamps: true,
            }
        );
    }

    static associate({}) {
        //...
    }
}

module.exports = Cards;
