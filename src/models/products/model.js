'use strict';

const product = (sequelize, DataTypes) => sequelize.define('products', {
    cateAssociation: { type: DataTypes.STRING, required: true },
    name: { type: DataTypes.STRING, required: true },
    description: { type: DataTypes.STRING, required: true },
    price: { type: DataTypes.INTEGER, required: true },
    count: { type: DataTypes.INTEGER, required: true },

});

module.exports = product;