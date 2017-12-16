'use strict';

// model
const models = require('../models/index');
const parser = require('D:/MyGitHub/html-parser/index');

// lib
const _ = require('lodash');
const DEBUG = require('debug')('APP:ADMIN_BOOK');

async function findOrCreate(req, res, next) {
    DEBUG('admin find or create book method!');
    const input = {
        authorId: req.body.authorId,
        name: req.body.name,
        createdAt: Date.now(),
        updatedAt: Date.now()
    };
    const t = await models.sequelize.transaction();
    try {
        let result = await models.Book.findOne({ where: { name: req.body.name, authorId: req.body.authorId } }, { transaction: t });
        if (_.isNil(result)) {
            result = await models.Book.create(input, {
                transaction: t
            });
        }
        await t.commit();
        res.return(result);
    } catch (err) {
        await t.rollback();
        next(err);
    }
}

async function create(req, res, next) {
    DEBUG('admin create book method!');

    const input = {
        authorId: req.body.authorId,
        name: req.body.name,
        createdAt: Date.now(),
        updatedAt: Date.now()
    };
    const t = await models.sequelize.transaction();
    try {
        // authorId name 
        let result = await models.Book.findOne({ where: { name: req.body.name, authorId: req.body.authorId } }, { transaction: t });
        if (_.isNil(result)) {
            result = await models.Book.create(input, {
                transaction: t
            });
        } else {
            throw new Error('book exists!');
        }
        await t.commit();
        res.return(result);
    } catch (err) {
        await t.rollback();
        next(err);
    }
}

async function list(req, res, next) {
    DEBUG('admin book list method!');

    req.paging();
    const filter = {
        attributes: ['id', 'name'],
        limit: req.query.limit,
        offset: (req.query.page - 1) * 50
    };
    try {
        const result = await models.Book.findAndCountAll(filter);
        return res.paging(result, req.query);
    } catch (err) {
        return next(err);
    }
}

async function show(req, res, next) {
    DEBUG('admin book show method!');

    const filter = {
        where: {
            id: req.params.bookId
        }
    };
    try {
        const result = await models.Book.findOne(filter);
        if (_.isNil(result)) {
            throw new Error('book not Found!');
        }
        return res.return(result);
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    DEBUG('admin book update method!');

    const filter = {
        where: {
            id: req.params.bookId
        }
    };
    try {
        await models.Book.update({ count: req.body.count }, filter);
        show(req, res, next);
    } catch (err) {
        next(err);
    }
}

async function destroy(req, res, next) {

}

async function down(req, res, next) {
    DEBUG('bookBLL down() method!');
    let book = await models.Book.findOne({ where: { id: req.params.bookId } });
    let result = await models.Chapter.findAll({ attributes: ['title', 'content'], order: [['id', 'ASC']], where: { bookId: book.id } });
    if (!_.isNil(result) && !_.isNil(book)) {
        res.set('content-type', 'text/plain; charset=utf-8');
        res.set('Content-disposition', `attachment; filename*=utf-8''${encodeURIComponent(book.name)}`);
        let txt = '';
        for (let i = 0; i < result.length; i++) {
            let temp = result[i];
            txt += `${temp.title}\n${temp.content}`;

        }
        txt = txt.replace(/&nbsp;/g, ' ').replace(/(<[/]?br[/]?>)|(<[/]?p>)/g, '\n');
        // doc.parse(txt.replace(/&nbsp;/g, '').replace(/<\/br>/g, '\n'));
        // txt = '';
        // doc.bfsSync(function (node) {
        //     if (node.nodeName === 'p') {
        //         txt += '\n  ';
        //     } else if (node.nodeName === '') {
        //         txt += node.text;
        //     }
        // });
        res.write(txt);
        res.end();
    } else {
        next();
    }
}

module.exports = {
    findOrCreate,
    list,
    show,
    create,
    update,
    destroy,
    down
};