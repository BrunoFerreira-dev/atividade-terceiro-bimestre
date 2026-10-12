const { DataTypes } = require('sequelize');
const sequelize = require('../config/banco');

const Loja = sequelize.define('Loja', {
   id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Loja