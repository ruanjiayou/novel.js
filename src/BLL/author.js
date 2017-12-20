'use strict';

// model
const models = require('../models/index');

// lib
const _ = require('utils2/lib/_');
const DEBUG = require('debug')('APP:BLL_AUTHOR');

async function findOrCreate(req, res, next) {
    DEBUG('admin find or create author method!');
    const input = {
        name: req.body.name,
        roleId: 2,
        createdAt: Date.now(),
        updatedAt: Date.now()
    };
    const t = await models.sequelize.transaction();
    try {
        let result = await models.User.findOne({ where: { name: input.name } }, { transaction: t });
        if (_.isNil(result)) {
            result = await models.User.create(input, {
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
    DEBUG('create author!');
    //const rules = {};
    //let input;
    try {
        // input = validator.validate(req.body, rules);
    } catch (err) {
        return next(err);
    }
    const t = await models.sequelize.transaction();
    try {
        let result = await models.User.findOne({ where: { roleId: 2, name: req.body.name } }, { transaction: t });
        if (_.isNil(result)) {
            result = await models.User.create({ roleId: 2, name: req.body.name }, { transaction: t });
        } else {
            throw new Error('not found');
        }
        await t.commit();
        return res.return(result);
    } catch (err) {
        await t.rollback();
        next(err);
    }
}

async function list(req, res, next) {
    req.paging();
    const filter = {
        where: {
            roleId: 2
        },
        attributes: ['id', 'name'],
        limit: req.query.limit,
        offset: (req.query.page - 1) * 50
    };

    try {
        const result = await models.User.findAndCountAll(filter);
        return res.paging(result, req.query);
    } catch (err) {
        return next(err);
    }
}

async function show(req, res, next) {
    DEBUG('admin show author method!');

    const filter = {
        where: {
            id: req.params.authorId,
            roleId: 2
        }
    };
    const t = await models.sequelize.transaction();
    try {
        const result = await models.User.findOne(filter, { transaction: t });
        if (_.isNil(result)) {
            throw new Error('not Found');
        }
        await t.commit();
        return res.return(result);
    } catch (err) {
        await t.rollback();
        next(err);
    }


}

async function update(req, res, next) {

}

async function destroy(req, res, next) {

}

module.exports = {
    findOrCreate,
    create,
    list,
    show,
    update,
    destroy
};