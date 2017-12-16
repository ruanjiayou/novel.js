module.exports = function (sequelize, TYPE) {
    const model = sequelize.define('BookCatalogMap',
        {
            id: {
                type: TYPE.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            bookId: {
                type: TYPE.BIGINT,
                allowNull: true
            },
            catalogId: {
                type: TYPE.BIGINT,
                allowNull: false
            }
        }, {
            comment: 'book和catalog的中间表',
            charset: 'utf8',
            paranoid: false,
            timestamp: false,
            engine: 'MYISAM',
            indexes: [
                {
                    fields: ['bookId'],
                    name: 'bookId'
                },
                {
                    fields: ['catalogId'],
                    name: 'catalogId'
                }
            ],
            freezeTableName: true,
            getterMethods: {},
            setterMethods: {},
            defaultScope: {},
            scopes: {

            },
        });
    // 类级方法

    // 实例方法

    model.associate = function (models) {
        model.belongsTo(models.Book, {
            foreignKey: 'id',
            target: 'bookId',
            constraints: false
        });
        model.belongsTo(models.Catalog, {
            foreignKey: 'catalogId',
            target: 'id',
            constraints: false
        });
    };
    return model;
};