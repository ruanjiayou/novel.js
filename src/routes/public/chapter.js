
const ChapterBLL = require('../../BLL/chapter');
const DEBUG = require('debug')('APP:PUBLIC_CHAPTER');

function list(req, res, next) {
    DEBUG('public chapter list method!');

    req.query.bookId = req.params.bookId;

    return ChapterBLL.list(req, res, next);
}

function show(req, res, next) {
    DEBUG('public chapter show method!');

    req.query.bookId = req.params.bookId;

    return ChapterBLL.show(req, res, next);
}

module.exports = {
    list,
    show,
};