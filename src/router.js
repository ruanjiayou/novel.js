const cors = require('../src/lib/CORS');

// 角色-模块 路由文件
const adminAuthRoute = require('./BLL/auth/admin');
const adminAuthorRoute = require('./routes/admin/author');
const adminBookRoute = require('./routes/admin/book');
const adminChapterRoute = require('./routes/admin/chapter');

const publicBookRoute = require('./routes/public/book');

module.exports = function (server) {
    server.use('*', cors);
    server.get('/', function (req, res) {
        res.send('小说站启动');
    });
    // 登录
    server.post('/auth/admin/login', adminAuthRoute.login);
    //server.use('/admin/*', adminAuthRoute.auth);
    // 角色:admin 模块:author
    server.patch('/admin/author', adminAuthorRoute.findOrCreate);
    server.post('/admin/author', adminAuthorRoute.create);
    server.get('/admin/author', adminAuthorRoute.list);
    server.get('/admin/author/:authorId([0-9]+)', adminAuthorRoute.show);
    server.put('/admin/author/:authorId([0-9]+)', adminAuthorRoute.update);
    server.delete('/admin/author/:authorId([0-9]+)', adminAuthorRoute.destroy);
    // 角色:admin 模块:book
    server.patch('/admin/book', adminBookRoute.findOrCreate);
    server.post('/admin/book', adminBookRoute.create);
    server.get('/admin/book', adminBookRoute.list);
    server.get('/admin/book/:bookId([0-9]+)', adminBookRoute.show);
    server.put('/admin/book/:bookId([0-9]+)', adminBookRoute.update);
    server.delete('/admin/book/:bookId([0-9]+)', adminBookRoute.destroy);
    // 角色:admin 模块:chapter
    server.post('/admin/book/:bookId([0-9]+)/chapter', adminChapterRoute.create);
    server.get('/admin/book/:bookId([0-9]+)/chapter', adminChapterRoute.list);
    server.get('/admin/book/:bookId([0-9]+)/chapter/:chapterId([0-9]+)', adminChapterRoute.show);
    server.put('/admin/book/:bookId([0-9]+)/chapter/:chapterId([0-9]+)', adminChapterRoute.update);
    server.delete('/admin/book/:bookId([0-9]+)/chapter/:chapterId([0-9]+)', adminChapterRoute.destroy);

    // 
    server.get('/book/:bookId([0-9]+)/down', publicBookRoute.down);

};