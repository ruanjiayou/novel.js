module.exports = function (sequelize, TYPE) {
    const model = sequelize.define('Catalog',
        {
            id: {
                type: TYPE.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            pid: {
                type: TYPE.BIGINT,
                allowNull: false,
                comment: '分类的父分类'
            },
            name: {
                type: TYPE.STRING,
                allowNull: false,
                comment: '分类名称'
            }
        }, {
            charset: 'utf8',
            paranoid: false,
            timestamp: false,
            engine: 'MYISAM',
            indexes: [
                {
                    fields: ['pid'],
                    name: 'pid'
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
        model.belongsTo(models.Catalog, {
            foreignKey: 'id',
            target: 'pid',
            onDelete: 'cascade'
        });
    };
    model.initialize = async function () {
        const data = [
            {
                'id': 1,
                'pid': null,
                'name': '男生'
            },
            {
                'id': 2,
                'pid': null,
                'name': '女生'
            },
            {
                'id': 5,
                'pid': 1,
                'name': '玄幻'
            },
            {
                'id': 7,
                'pid': 1,
                'name': '奇幻'
            },
            {
                'id': 8,
                'pid': 1,
                'name': '武侠'
            },
            {
                'id': 9,
                'pid': 1,
                'name': '仙侠'
            },
            {
                'id': 10,
                'pid': 1,
                'name': '都市'
            },
            {
                'id': 11,
                'pid': 1,
                'name': '职场'
            },
            {
                'id': 12,
                'pid': 1,
                'name': '历史'
            },
            {
                'id': 13,
                'pid': 1,
                'name': '军事'
            },
            {
                'id': 14,
                'pid': 1,
                'name': '游戏'
            },
            {
                'id': 15,
                'pid': 1,
                'name': '竞技'
            },
            {
                'id': 16,
                'pid': 1,
                'name': '科幻'
            },
            {
                'id': 17,
                'pid': 1,
                'name': '灵异'
            },
            {
                'id': 18,
                'pid': 1,
                'name': '同人'
            },
            {
                'id': 19,
                'pid': 2,
                'name': '古代言情'
            },
            {
                'id': 20,
                'pid': 2,
                'name': '现代言情'
            },
            {
                'id': 21,
                'pid': 2,
                'name': '玄幻言情'
            },
            {
                'id': 22,
                'pid': 2,
                'name': '仙侠情缘'
            },
            {
                'id': 23,
                'pid': 2,
                'name': '浪漫青春'
            },
            {
                'id': 24,
                'pid': 2,
                'name': '游戏竞技'
            },
            {
                'id': 25,
                'pid': 2,
                'name': '悬疑灵异'
            },
            {
                'id': 26,
                'pid': 2,
                'name': '同人小说'
            },
            {
                'id': 28,
                'pid': 5,
                'name': '东方玄幻'
            },
            {
                'id': 29,
                'pid': 5,
                'name': '异界大陆'
            },
            {
                'id': 30,
                'pid': 5,
                'name': '异界争霸'
            },
            {
                'id': 31,
                'pid': 5,
                'name': '远古神话'
            },
            {
                'id': 32,
                'pid': 7,
                'name': '西方奇幻'
            },
            {
                'id': 33,
                'pid': 7,
                'name': '魔法校园'
            },
            {
                'id': 34,
                'pid': 7,
                'name': '亡灵异族'
            },
            {
                'id': 35,
                'pid': 7,
                'name': '领主贵族'
            },
            {
                'id': 36,
                'pid': 8,
                'name': '传统武侠'
            },
            {
                'id': 37,
                'pid': 8,
                'name': '国术武技'
            },
            {
                'id': 38,
                'pid': 8,
                'name': '新派武侠'
            },
            {
                'id': 39,
                'pid': 9,
                'name': '洪荒封神'
            },
            {
                'id': 40,
                'pid': 9,
                'name': '古典仙侠'
            },
            {
                'id': 41,
                'pid': 9,
                'name': '幻想修仙'
            },
            {
                'id': 42,
                'pid': 9,
                'name': '现代修仙'
            },
            {
                'id': 43,
                'pid': 10,
                'name': '爱情婚姻'
            },
            {
                'id': 44,
                'pid': 10,
                'name': '现实百态'
            },
            {
                'id': 45,
                'pid': 10,
                'name': '恩怨情仇'
            },
            {
                'id': 46,
                'pid': 10,
                'name': '都市生活'
            },
            {
                'id': 47,
                'pid': 10,
                'name': '青春校园'
            },
            {
                'id': 48,
                'pid': 10,
                'name': '异术超能'
            },
            {
                'id': 49,
                'pid': 11,
                'name': '官场沉浮'
            },
            {
                'id': 50,
                'pid': 11,
                'name': '娱乐明星'
            },
            {
                'id': 51,
                'pid': 11,
                'name': '商场职场'
            },
            {
                'id': 52,
                'pid': 12,
                'name': '架空历史'
            },
            {
                'id': 53,
                'pid': 12,
                'name': '上古先秦'
            },
            {
                'id': 54,
                'pid': 12,
                'name': '秦汉三国'
            },
            {
                'id': 55,
                'pid': 12,
                'name': '两晋隋唐'
            },
            {
                'id': 56,
                'pid': 12,
                'name': '五代十国'
            },
            {
                'id': 57,
                'pid': 12,
                'name': '两宋元明'
            },
            {
                'id': 58,
                'pid': 12,
                'name': '清史民国'
            },
            {
                'id': 59,
                'pid': 12,
                'name': '外国历史'
            },
            {
                'id': 60,
                'pid': 12,
                'name': '历史传记'
            },
            {
                'id': 61,
                'pid': 13,
                'name': '军事战争'
            },
            {
                'id': 62,
                'pid': 13,
                'name': '军旅生涯'
            },
            {
                'id': 63,
                'pid': 13,
                'name': '谍战特工'
            },
            {
                'id': 64,
                'pid': 13,
                'name': '抗战烽火'
            },
            {
                'id': 65,
                'pid': 13,
                'name': '战争幻想'
            },
            {
                'id': 66,
                'pid': 14,
                'name': '游戏生涯'
            },
            {
                'id': 67,
                'pid': 14,
                'name': '虚拟网游'
            },
            {
                'id': 68,
                'pid': 14,
                'name': '电子竞技'
            },
            {
                'id': 69,
                'pid': 14,
                'name': '游戏异界'
            },
            {
                'id': 70,
                'pid': 15,
                'name': '弈林春秋'
            },
            {
                'id': 71,
                'pid': 15,
                'name': '篮球运动'
            },
            {
                'id': 72,
                'pid': 15,
                'name': '体育竞技'
            },
            {
                'id': 73,
                'pid': 15,
                'name': '足球运动'
            },
            {
                'id': 81,
                'pid': 16,
                'name': '进化变异'
            },
            {
                'id': 82,
                'pid': 16,
                'name': '超级科技'
            },
            {
                'id': 83,
                'pid': 16,
                'name': '古武机甲'
            },
            {
                'id': 84,
                'pid': 16,
                'name': '时空穿梭'
            },
            {
                'id': 85,
                'pid': 16,
                'name': '未来世界'
            },
            {
                'id': 86,
                'pid': 16,
                'name': '末世危机'
            },
            {
                'id': 87,
                'pid': 16,
                'name': '星际战争'
            },
            {
                'id': 88,
                'pid': 17,
                'name': '灵异奇谈'
            },
            {
                'id': 89,
                'pid': 17,
                'name': '推理侦探'
            },
            {
                'id': 90,
                'pid': 17,
                'name': '恐怖惊悚'
            },
            {
                'id': 91,
                'pid': 17,
                'name': '悬疑探险'
            },
            {
                'id': 92,
                'pid': 18,
                'name': '影视同人'
            },
            {
                'id': 93,
                'pid': 18,
                'name': '武侠同人'
            },
            {
                'id': 94,
                'pid': 18,
                'name': '游戏同人'
            },
            {
                'id': 95,
                'pid': 18,
                'name': '动漫同人'
            },
            {
                'id': 96,
                'pid': 18,
                'name': '小说同人'
            }
        ];
        return await model.bulkCreate(data);
    };
    return model;
};