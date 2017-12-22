const express = require('express');
const Server = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router');
const ejs = require('ejs');
const sysCfg = require('./config/site');
const present = require('./lib/present');

// 1.设置express模板引擎
Server.set('views', path.join(__dirname, 'template', 'views'));
Server.set('view engine', 'html');
Server.engine('.html', ejs.__express);
ejs.delimiter = '$';
// 2.静态目录
Server.use(express.static(path.join(__dirname, './public')));
// 3.解析请求
Server.use(bodyParser.json());
Server.use(bodyParser.urlencoded({ extended: false }));
// 4.session验证
//auth(Server);
// 4.全局变量
Server.use(function (req, res, next) {
    res.locals.sys = sysCfg.sys;
    next();
});

// 5.添加自定义响应方法(自动处理json:status与result)
Server.use(present({
    page: 'page',
    limit: 'limit',
    search: 'search',
    order: 'order',
    errDir: path.join(__dirname, 'template/errors')
}));
// 6.路由 含token验证
router(Server);
// 7.error异常处理
Server.use(function (err, req, res, next) {
    if (err instanceof HinterError) {
        res.errors(err);
    } else if (err) {
        res.status(500).send({ status: 'failed', message: `${err.message}` });
    } else {
        next();
    }
});
// 8.404
Server.use(function (req, res) {
    if (!res.headersSent) {
        res.status(404).render('404');
    }
});


if (module.parent) {
    module.exports = Server;
} else {
    // 监听端口，启动程序
    Server.listen(sysCfg.port, '0.0.0.0', function () {
        console.log(`小说站后台API 监听端口:${sysCfg.port}`);
    });
}