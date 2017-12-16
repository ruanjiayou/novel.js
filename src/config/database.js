// TODO: 根据process的变量做处理: 1.dev 2.test 3.product
module.exports = {
    //数据库登录名
    username: 'root',
    //数据库登录密码
    password: '',
    //数据库url地址
    host: 'localhost',
    //数据库url端口
    port: '3306',
    //数据库方言
    dialect: 'mysql',
    //数据库名
    database: 'novel',
    session: {
        secret: 'session_cookie_name',
        key: 'session_cookie_secret',
        maxAge: 2592000000
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};