'use strict';

// model
const models = require('../models/index');

// lib
const _ = require('lodash');
const DEBUG = require('debug')('APP:ADMIN_CHAPTER');

/**
 * @api {post} /admin/book/:bookId([0-9]+)/chapter 添加章节
 * @apiName create
 * @apiGroup admin-chapter
 * 
 * @apiParam {number} bookId 书籍id
 * @apiParam {string} title 章节名称
 * @apiParam {string} content 章节内容
 * 
 * @apiSuccess {object} result 
 */
async function create(req, res, next) {
    DEBUG('admin chapterBLL create() method!');
    const input = {
        bookId: req.body.bookId,
        title: req.body.title,
        content: req.body.content,
        createdAt: Date.now(),
        updatedAt: Date.now()
    };
    const filter = {
        where: {
            id: req.body.bookId
        }
    };
    const t = await models.sequelize.transaction();
    try {
        let result = await models.Book.findOne(filter, {
            transaction: t
        });
        if (_.isNil(result)) {
            throw new Error('not Found!');
        } else {
            result = await models.Chapter.create(input, {
                transaction: t
            });
            // if (await models.Chapter.update({ id: result.id + 2 }, { where: { id: result.id }, transaction: t })) {
            //     result.id = result.id + 2;
            //     console.log(`result.id:${result.id}`);
            // };
        }
        await t.commit();
        res.return(result);
    } catch (err) {
        await t.rollback();
        next(err);
    }
}

async function list(req, res, next) {
    req.paging();
    const filter = {
        where: {
            bookId: req.query.bookId
        },
        attributes: ['id', 'title'],
        limit: req.query.limit,
        offset: (req.query.page - 1) * 50
    };
    try {
        const result = await models.Chapter.findAndCountAll(filter);
        return res.paging(result, req.query);
    } catch (err) {
        return next(err);
    }
}

async function show(req, res, next) {
    const filter = {
        where: {
            bookId: req.params.bookId,
            id: req.params.chapterId
        }
    };
    try {
        const result = await models.Chapter.findOne(filter);
        let prev, next;
        if (_.isNil(result)) {
            throw new Error('not found');
        } else {
            prev = await models.Chapter.findOne({
                where: {
                    bookId: filter.where.bookId,
                    id: {
                        [models.sequelize.Op.lt]: filter.where.id
                    }
                },
                attributes: ['id', 'title'],
                order: [['id', 'DESC']],
                limit: 1
            });
            next = await models.Chapter.findOne({
                where: {
                    bookId: filter.where.bookId,
                    id: {
                        [models.sequelize.Op.gt]: filter.where.id
                    }
                },
                attributes: ['id', 'title'],
                limit: 1
            });
        }
        return res.return(result, {
            prev: prev,
            next: next
        });
    } catch (err) {
        return next(err);
    }
}

async function update(req, res, next) {

}

async function destroy(req, res, next) {

}

module.exports = {
    list,
    show,
    create,
    update,
    destroy
};