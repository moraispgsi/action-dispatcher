/**
 * Created by Ricardo Morais on 10/07/2017.
 */

module.exports = (sequelize, DataType) => {
    const Namespaces = sequelize.define('Namespaces', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        namespace: {
            type: DataType.STRING,
            allowNull: false,
            defaultValue: false,
        },
        url: {
            type: DataType.STRING,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        classMethods: {
            associate: (models) => {

            },
        },
    });
    return Namespaces;
};
