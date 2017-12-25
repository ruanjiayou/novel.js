const AuthorBLL = require('../../BLL/author');
const DEBUG = require('debug')('APP:PUBLIC_AUTHOR');

/**
 * @api {get} /author 作者列表
 * @apiName list
 * @apiGroup public author
 * 
 * @apiParam {string} [name] 姓名
 * @apiParam {number} [roleId=2] 类型
 * 
 * @apiSuccess {number} id
 * @apiSuccess {string} name
 */
function list(req, res, next) {

    if (req.query.roleId === undefined) {
        req.query.roleId = 2;
    }

    return AuthorBLL.list(req, res, next);
}

function show(req, res, next) {
    DEBUG('enter public author show route!');

    return AuthorBLL.show(req, res, next);
}

module.exports = {
    list,
    show
};