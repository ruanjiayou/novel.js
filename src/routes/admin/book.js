
const BookBLL = require('../../BLL/book');
const DEBUG = require('debug')('APP:ADMIN_BOOK');

/**
 * @api {patch} /admin/book 查找或添加书籍
 * @apiName create
 * @apiGroup admin book
 * 
 * @apiParam {number} authorId 作者id
 * @apiParam {string} name 书籍名称
 * @apiParam {string} [poster] 封面
 * @apiParam {string} [description] 书籍描述
 * @apiParam {string="ing", "end"} [status] 书籍状态:ing表示连载中,end表示完结
 * 
 * @apiSuccess {number} id
 */
function findOrCreate(req, res, next) {
    // log
    DEBUG('enter admin book create route!');

    return BookBLL.findOrCreate(req, res, next);
}

/**
 * @api {post} /admin/book 创建书籍
 * @apiName create
 * @apiGroup admin book
 * 
 * @apiParam {number} authorId 作者id
 * @apiParam {string} name 书籍名称
 * @apiParam {string} [poster] 封面
 * @apiParam {string} [description] 书籍描述
 * @apiParam {string="ing", "end"} [status] 书籍状态:ing表示连载中,end表示完结
 * 
 * @apiSuccess {boolean} status 是否创建成功
 */
function create(req, res, next) {
    DEBUG('admin create book route!');
    // log

    return BookBLL.create(req, res, next);
}

/**
 * @api {get} /admin/book 获取书籍列表
 * @apiName list
 * @apiGroup admin book
 * 
 * @apiParam {string} search
 * @apiParam {string="", ""} sortby
 * @apiParam {} limit
 * @apiParam {} page
 * @apiParam {string=""} type
 * @apiParam {string} author
 * 
 * @apiSuccess {} paging
 * @apiSuccess {} paging.total
 * @apiSuccess {} paging.count
 * @apiSuccess {} paging.limit
 * @apiSuccess {} paging.pages
 * @apiSuccess {} paging.page
 */
function list(req, res, next) {
    //console.log(req.headers['x-access-token']);
    return BookBLL.list(req, res, next);
}

function show(req, res, next) {
    return BookBLL.show(req, res, next);
}

function update(req, res, next) {
    return BookBLL.update(req, res, next);
}

function destroy(req, res, next) {
    return BookBLL.destroy(req, res, next);
}

module.exports = {
    findOrCreate,
    create,
    list,
    show,
    update,
    destroy
};