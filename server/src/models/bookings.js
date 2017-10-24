'use strict';

const Sequelize = require('sequelize');
const Rooms = require('./rooms.js');
const Customers = require('./customers.js');
const Users = require('./users.js');

module.exports = function(sequelize, DataTypes) {
    const Bookings = sequelize.define('bookings', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        arrival: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: true
        },
        departure: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: true
        },
        checkin: {
            type: Sequelize.DATE,
            validate: {
                isDate: true
            }
        },
        checkout: {
            type: Sequelize.DATE,
            validate: {
                isDate: true
            }
        },
        breakfast: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
            get() {
                const hasBreakfast = this.getDataValue('breakfast');
                return (hasBreakfast) ? true : false
            }
        },
        nights: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        adults: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        children: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        comments: {
            type: Sequelize.TEXT,
            validate: {
                notEmpty: true,
            }
        },
        room_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Rooms,
                key: 'id',
            }
        },
        customer_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Customers,
                key: 'id',
            }
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Users,
                key: 'id',
            }
        }
    });

    // Bookings.associate = function(models) {
    //     Bookings.belongsTo(models.User);
    // }

    return Bookings;
};
