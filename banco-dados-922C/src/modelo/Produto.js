
const { DataTypes } = require('sequelize');
const sequelize = require('../config/banco');
const Loja = require('./Loja');

const Produto = sequelize.define('Produto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    idLoja: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Loja,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
});

Loja.hasMany(Produto, {
    foreignKey: 'idLoja',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

Produto.belongsTo(Loja, {
    foreignKey: 'idLoja'
});

module.exports = Produto;
