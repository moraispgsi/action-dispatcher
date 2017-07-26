'use strict';

/**
 * Created by Ricardo Morais on 10/07/2017.
 */

module.exports = function (sequelize, DataType) {
    var Namespaces = sequelize.define('Namespaces', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        namespace: {
            type: DataType.STRING,
            allowNull: false,
            defaultValue: false
        },
        url: {
            type: DataType.STRING,
            allowNull: false,
            defaultValue: false
        }
    }, {
        timestamps: false,
        classMethods: {
            associate: function associate(models) {}
        }
    });
    return Namespaces;
};