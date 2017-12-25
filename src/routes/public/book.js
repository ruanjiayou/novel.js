
const BookBLL = require('../../BLL/book');
const DEBUG = require('debug')('APP:PUBLIC_BOOK');

/**
 * @api {get} /book 获取书籍列表
 * @apiName list
 * @apiGroup public book
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

function down(req, res, next) {
    DEBUG('public book down');

    BookBLL.down(req, res, next);
}

module.exports = {
    list,
    show,
    down
};