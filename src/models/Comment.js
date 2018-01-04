module.exports = function (sequelize, TYPE) {
    const model = sequelize.define('Comment',
        {
            id: {
                type: TYPE.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            pid: {
                type: TYPE.BIGINT,
                allowNull: true
            },
            userId: {
                type: TYPE.BIGINT,
                allowNull: false
            },
            bookId: {
                type: TYPE.BIGINT,
                allowNull: false
            },
            chapterId: {
                type: TYPE.BIGINT,
                allowNull: false
            },
            content: {
                type: TYPE.TEXT,
                allowNull: false
            }
        }, {
            comment: '回复',
            charset: 'utf8',
            paranoid: true,
            timestamp: true,
            timezone: '+08:00',
            //engine: 'MYISAM',
            indexes: [
                {
                    fields: ['pid'],
                    name: 'pid'
                },
                {
                    fields: ['bookId'],
                    name: 'bookId'
                },
                {
                    fields: ['userId'],
                    name: 'userId_index'
                },
                {
                    fields: ['chapterId'],
                    name: 'chapterId'
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
        model.belongsTo(models.User, {
            foreignKey: 'userId',
            targetKey: 'id',
            constraints: false
        });
        model.belongsTo(models.Book, {
            foreignKey: 'bookId',
            targetKey: 'id',
            constraints: false
        });
        model.belongsTo(models.Chapter, {
            foreignKey: 'chapterId',
            targetKey: 'id',
            constraints: false
        });
        model.belongsTo(models.Comment, {
            foreignKey: 'pid',
            targetKey: 'id',
            constraints: false
        });
    };
    return model;
};