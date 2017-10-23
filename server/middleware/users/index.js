'use strict';

const Sequelize = require('sequelize');
const Users = require('../../src/models/users.js')
const routes = [];

/**
 * @action list
 * @method get
 * @return Users[]
 */
routes.push({
    meta: {
        name: 'userList',
        method: 'GET',
        paths: [
            '/user'
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        Users.findAll({
            order: [
                ['id', 'DESC']
            ],
            attributes: [
                ['id', 'uid'],
                'created_at',
                'name',
                'type',
                'active'
            ]
        }).then((data) => {
            res.json(data);
            return next();
        });
    }
});

/**
 * @action read
 * @method get
 * @param id
 * @return Users
 */
routes.push({
    meta: {
        name: 'userRead',
        method: 'GET',
        paths: [
            '/user/:id'
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        Users.findOne({
            where: {
                id: {
                    [Sequelize.Op.eq]: req.params.id
                }
            },
            attributes: [
                ['id', 'uid'],
                'created_at',
                'name',
                'type',
                'active'
            ],
            limit: 1,
            raw: true
        }).then((data) => {
            res.json(data);
            return next();
        });
    }
});

/**
 * @action create
 * @method post
 * @return Users
 */
routes.push({
    meta: {
        name: 'userCreate',
        method: 'POST',
        paths: [
            '/user'
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        // object
        const form = {
            name: req.body.name,
            password: req.body.password,
            type: req.body.type,
            active: req.body.active
        };

        // create record
        Users.create(form).then((data) => {
            res.json(data);
            return next();
        }).catch((err) => {
            if (err.name === 'SequelizeValidationError') {
                res.json({
                    message: err.message,
                    type: err.type,
                    path: err.path
                });
            } else {
                res.json(err);
            }

            return next();
        });
    }
});

/**
 * @action update
 * @method put
 * @param id
 * @return Users
 */
routes.push({
    meta: {
        name: 'userUpdate',
        method: 'PUT',
        paths: [
            '/user/:id'
        ],
        version: '1.0.0'
    },
    middleware: (req, res, next) => {
        const id = req.params.id;
        // object
        const form = {
            name: req.body.name,
            password: req.body.password,
            type: req.body.type,
            active: req.body.active
        };

        // update record
        Users.find({
            where: {
                id: {
                    [Sequelize.Op.eq]: req.params.id
                }
            }
        }).then(data => {
            return data.updateAttributes(form);
        }).then((data) => {
            res.json(data);
            return next();
        }).catch((err) => {
            if (err.name === 'SequelizeValidationError') {
                res.json({
                    message: err.message,
                    type: err.type,
                    path: err.path
                });
            } else {
                res.json(err);
            }

            return next();
        });
    }
});

module.exports = routes;