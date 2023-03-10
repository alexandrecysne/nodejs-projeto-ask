const Sequelize = require("sequelize");
const connection = require("./database");

const Perguntas = connection.define('perguntas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }   
});

Perguntas.sync({force: false}).then(() => {
    console.log("Tabela criada perguntas");
});

module.exports = Perguntas;