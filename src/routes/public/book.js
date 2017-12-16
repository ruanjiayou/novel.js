
const BookBLL = require('../../BLL/book');
const DEBUG = require('debug')('APP:PUBLIC_BOOK');

function down(req, res, next) {
    DEBUG('public book down');

    BookBLL.down(req, res, next);
}

module.exports = {
    down
};