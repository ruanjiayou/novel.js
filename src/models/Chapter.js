module.exports = function (sequelize, TYPE) {
    const model = sequelize.define('Chapter',
        {
            id: {
                type: TYPE.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            bookId: {
                type: TYPE.BIGINT,
                allowNull: false
            },
            title: {
                type: TYPE.STRING,
                allowNull: false,
                comment: '章节标题'
            },
            content: {
                type: TYPE.TEXT,
                defaultValue: '',
                comment: '章节内容'
            },
            order: {
                type: TYPE.INTEGER,
                allowNull: false,
                comment: '排序用'
            },
            url: {
                type: TYPE.STRING,
                allowNull: true,
                defaultValue: null,
                comment: '章节的url来源,下载失败或等待更新时用'
            }
        }, {
            comment: '书籍章节(没分卷~~)',
            charset: 'utf8',
            paranoid: false,
            timestamp: true,
            deletedAt: false,
            timezone: '+08:00',
            //engine: 'MYISAM',
            indexes: [
                // {
                //     fileds: 'bookId',
                //     name: 'bookId',
                //     method: 'BTREE'
                // },
                // {
                //     fileds: 'url',
                //     name: 'url',
                //     method: 'HASH'
                // }
            ],
            freezeTableName: true,
            getterMethods: {},
            setterMethods: {},
            defaultScope: {},
            scopes: {

            },
            hooks: {

            }
        });
    // 类级方法

    // 实例方法
    //model.increment(['id'], { by: 2 });

    model.associate = function (models) {
        model.belongsTo(models.Book, {
            foreignKey: 'bookId',
            targetKey: 'id',
            constraints: false
        });
        model.hasMany(models.Comment, {
            foreignKey: 'chapterId',
            constraints: false
        });
    };
    return model;
};