
const ChapterBLL = require('../../BLL/chapter');
const DEBUG = require('debug')('APP:ADMIN_CHAPTER');

function create(req, res, next) {
    DEBUG('admin chapter create method!');

    req.body.bookId = req.params.bookId;

    return ChapterBLL.create(req, res, next);
}

function list(req, res, next) {
    DEBUG('admin chapter list method!');

    req.query.bookId = req.params.bookId;

    return ChapterBLL.list(req, res, next);
}

function show(req, res, next) {
    DEBUG('admin chapter show method!');

    req.query.bookId = req.params.bookId;

    return ChapterBLL.show(req, res, next);
}

function update(req, res, next) {

    req.query.bookId = req.params.bookId;

    return ChapterBLL.creupdatete(req, res, next);
}

function destroy(req, res, next) {

    req.query.bookId = req.params.bookId;

    return ChapterBLL.destroy(req, res, next);
}

module.exports = {
    create,
    list,
    show,
    update,
    destroy
};