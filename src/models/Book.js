module.exports = function (sequelize, TYPE) {
    const model = sequelize.define('Book',
        {
            id: {
                type: TYPE.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            authorId: {
                type: TYPE.BIGINT,
                allowNull: false,
                comment: '作者表的主键id'
            },
            name: {
                type: TYPE.STRING,
                allowNull: false,
                comment: '书名'
            },
            poster: {
                type: TYPE.STRING,
                allowNull: true,
                comment: '书籍封面'
            },
            description: {
                type: TYPE.TEXT,
                allowNull: true,
                comment: '书籍描述'
            },
            status: {
                type: TYPE.ENUM('ing', 'end'),
                allowNull: false,
                defaultValue: 'ing',
                comment: '书籍的状态,ing:进行中,end:已完成'
            },
            count: {
                type: TYPE.BIGINT,
                allowNull: false,
                defaultValue: 0,
                comment: '字数统计'
            },
            isApproved: {
                type: TYPE.BOOLEAN,
                allowNull: false,
                defaultValue: true,
                comment: '是否展示'
            }
        }, {
            charset: 'utf8',
            //paranoid: true,
            timestamp: true,
            deletedAt: false,
            timezone: '+08:00',
            engine: 'MYISAM',
            indexes: [
                {
                    fields: ['authorId'],
                    name: 'authorId'
                }
            ],
            freezeTableName: true,
            unique: true,
            initialAutoIncrement: 1000000,
            getterMethods: {},
            setterMethods: {},
            defaultScope: {},
            scopes: {
                // includeAuthor: function () {
                //     return {
                //         include: [
                //             {
                //                 model: sequelize.models.User,
                //                 where: { roleId: 2 },
                //                 attributes: ['id', 'name'],
                //                 required: true
                //             }
                //         ]
                //     };
                // }
            },
        });
    // 类级方法

    // 实例方法

    model.associate = function (models) {
        model.belongsTo(models.User);
        model.belongsTo(models.Catalog, {
            foreignKey: 'id',
            otherKey: 'bookId',
            through: {
                model: models.BookCatelogMap
            }
        });
        model.hasMany(models.Chapter, {
            foreignKey: 'id',
            targetKey: 'bookId',
        });
    };
    return model;
};