'use strict';

// model
const models = require('../models/index');

// lib
const _ = require('utils2/lib/_');
const Validator = require('utils2/lib/validator');
const DEBUG = require('debug')('APP:BLL_AUTHOR');

async function findOrCreate(req, res, next) {
    DEBUG('BLL find or create author method!');

    const validator = new Validator({
        rules: {
            name: 'required|string|min:1',
            roleId: 'required|int'
        }
    });
    const input = validator.filter(req.body);
    try {
        validator.check(input);
        input.createdAt = Date.now();
        input.updatedAt = Date.now();
    } catch (err) {
        return next(err);
    }

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
    DEBUG('BLL create author method!');

    const validator = new Validator({
        rules: {
            name: 'required|string|min:1',
            roleId: 'required|int'
        }
    });
    const input = validator.filter(req.body);
    try {
        validator.check(input);
        input.createdAt = Date.now();
        input.updatedAt = Date.now();
    } catch (err) {
        return next(err);
    }

    const t = await models.sequelize.transaction();
    try {
        let result = await models.User.findOne({ where: { roleId: input.roleId, name: input.name } }, { transaction: t });
        if (_.isNil(result)) {
            result = await models.User.create({ roleId: input.roleId, name: input.name }, { transaction: t });
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
    DEBUG('BLL author list method!');
    req.paging();

    const validator = new Validator({
        rules: {
            name: 'nullable|string|min:1',
            roleId: 'nullable|int'
        }
    });
    const input = validator.filter(req.query);
    try {
        validator.check(input);
    } catch (err) {
        return next(err);
    }

    const filter = {
        where: {},
        attributes: ['id', 'name'],
        limit: req.query.limit,
        offset: (req.query.page - 1) * 50
    };
    if (input.name) {
        filter.where.name = {
            [models.Op.like]: `%${input.name}%`
        };
    }
    if (input.roleId) {
        filter.where.roleId = input.roleId;
    }

    try {
        const result = await models.User.findAndCountAll(filter);

        return res.paging(result, req.query);
    } catch (err) {
        return next(err);
    }
}

async function show(req, res, next) {
    DEBUG('BLL show author method!');

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