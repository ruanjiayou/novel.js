module.exports = function (sequelize, TYPE) {
    const model = sequelize.define('UserRoleMap',
        {
            id: {
                type: TYPE.BIGINT,
                allowNull: false,
                primaryKey: true
            },
            userId: {
                type: TYPE.BIGINT,
                allowNull: false
            },
            roleId: {
                type: TYPE.BIGINT,
                allowNull: false
            }
        }, {
            charset: 'utf8',
            paranoid: false,
            timestamp: false,
            //engine: 'MYISAM',
            indexes: [
                {
                    fields: ['userId'],
                    name: 'userId'
                },
                {
                    fields: ['roleId'],
                    name: 'roleId'
                }
            ],
            freezeTableName: true,
            getterMethods: {},
            setterMethods: {},
            defaultScope: {},
            scopes: {

            }
        });
    // 类级方法

    // 实例方法

    model.associate = function (models) {
        model.belongsTo(models.User, {
            foreignKey: 'userId',
            targetKey: 'id',
            constraints: false
        });
        model.belongsTo(models.Role, {
            foreignKey: 'roleId',
            targetKey: 'id',
            constraints: false
        });
    };
    return model;
};