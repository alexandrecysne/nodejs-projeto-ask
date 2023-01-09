const Sequelize = require("sequelize");
const connection = require("./database");

const Respostas = connection.define('respostas',{
    corpo:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }   
});

Respostas.sync({force: false}).then(() => {
    console.log("Tabela criada respostas");
});

module.exports = Respostas;