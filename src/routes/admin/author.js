const AuthorBLL = require('../../BLL/author');
const DEBUG = require('debug')('APP:AMIN_AUTHOR');

/**
 * @api {patch} /admin/author 查找或添加作者
 * @apiName create
 * @apiGroup admin author
 * 
 * @apiParam {string} name
 * 
 * @apiSuccess {number} id
 */
function findOrCreate(req, res, next) {
    DEBUG('enter admin author create route!');

    req.body.roleId = 2;

    return AuthorBLL.findOrCreate(req, res, next);
}

/**
 * @api {post} /admin/author 添加作者
 * @apiName create
 * @apiGroup admin author
 * 
 * @apiParam {string} name
 * 
 * @apiSuccess {number} id
 */
function create(req, res, next) {
    // log
    DEBUG('enter admin author create route!');

    req.body.roleId = 2;

    return AuthorBLL.create(req, res, next);
}

/**
 * @api {get} /admin/author 作者列表
 * @apiName list
 * @apiGroup admin author
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
    DEBUG('enter admin author show route!');

    return AuthorBLL.show(req, res, next);
}

function update(req, res, next) {
    return AuthorBLL.creupdatete(req, res, next);
}

function destroy(req, res, next) {
    return AuthorBLL.destroy(req, res, next);
}

module.exports = {
    findOrCreate,
    create,
    list,
    show,
    update,
    destroy
};