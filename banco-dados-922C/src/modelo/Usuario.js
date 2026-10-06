const { DataTypes } = require('sequelize');
const sequelize = require('../config/banco');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Usuario