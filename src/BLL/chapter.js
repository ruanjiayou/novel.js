'use strict';

// model
const models = require('../models/index');

// lib
const _ = require('utils2/lib/_');
const Validator = require('utils2/lib/validator');
const DEBUG = require('debug')('APP:BLL_CHAPTER');


async function create(req, res, next) {
    DEBUG('BLL chapterBLL create() method!');
    const validator = new Validator({
        rules: {
            bookId: 'required|int',
            title: 'required|string|minlength:1',
            content: 'nullable|string|minlength:1',
            url: 'required|string|minlength:1',
            order: 'required|int'
        }
    });
    const input = validator.filter(req.body);
    try {
        validator.check(input);
        input.createdAt = Date.now();
        input.updatedAt = Date.now();
    } catch (err) {
        res.errors(new HinterError('validator', 'validate', err.message));
    }
    const filter = {
        where: {
            id: input.bookId
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
    const t = await models.sequelize.transaction();
    try {
        console.log(new Date().toLocaleString()); 
        const result = await models.Chapter.findAndCountAll(filter, { transaction: t});
        await t.commit();
        console.log(result.count);
        console.log(result.rows.length);
        console.log(new Date().toLocaleString());

        return res.paging(result, req.query);
    } catch (err) {
        await t.rollback();
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
        if (_.isNil(result)) {
            throw new Error('not found');
        }
        let prevOne = await models.Chapter.findOne({
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
        let nextOne = await models.Chapter.findOne({
            where: {
                bookId: filter.where.bookId,
                id: {
                    [models.sequelize.Op.gt]: filter.where.id
                }
            },
            attributes: ['id', 'title'],
            limit: 1
        });
        return res.return(result, {
            prev: prevOne,
            next: nextOne
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