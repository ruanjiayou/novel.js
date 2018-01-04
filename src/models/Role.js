module.exports = function (sequelize, TYPE) {
    const model = sequelize.define('Role',
        {
            id: {
                type: TYPE.BIGINT,
                autoIncrement: false,
                primaryKey: true
            },
            type: {
                type: TYPE.ENUM('admin', 'author', 'user'),
                allowNull: false,
                comment: '用户角色'
            }
        }, {
            charset: 'utf8',
            paranoid: false,
            timestamp: false,
            timezone: '+08:00',
            //engine: 'MYISAM',
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
        model.hasMany(models.User, {
            foreignKey: 'id',
            otherKey: 'roleId',
            though: {
                model: models.User
            }
        });
    };
    model.initialize = function () {
        const data = [
            {
                id: 1,
                type: 'admin'
            },
            {
                id: 2,
                type: 'author'
            },
            {
                id: 3,
                type: 'user'
            }
        ];
        return model.bulkCreate(data, { return: true });
    };
    return model;
};