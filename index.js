const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Perguntas");
const Resposta = require("./database/Respostas");

//database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

//estou dizendo para o Express usar o EJS como View engine
app.set('view engine','ejs');

//estou dizendo para o Express a pastas com os arquivos estaticos
app.use(express.static('public'));

//configuração body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//rota principal
app.get("/",(req,res) => {
    //findAll = select
    Pergunta.findAll( {raw: true, order:[
        ['id','desc']
    ]} ).then(perguntas => {
        res.render("index",{
            perguntas: perguntas
        }); 
    });
});

//rota perguntar
app.get("/perguntar",(req,res) => {
    res.render("perguntar");
});

//rota listar pergunta por id
app.get("/pergunta/:id",(req,res) => {
    var id = req.params.id;
    Pergunta.findOne({ 
        where: {id: id} 
    }).then(pergunta => {
        if (pergunta != undefined){

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[ ['id','DESC'] ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            })

        }else{
            res.redirect("/");
        }      
    })	
});

//rota salvar pergunta
app.post("/salvarpergunta",(req,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    // create = insert 
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        console.log("Pergunta criada na tabela");
        res.redirect("/");
    })
})

//rota salvar resposta
app.post("/salvarresposta",(req,res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.id;
    // create = insert 
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        console.log("Resposta criada na tabela");
        res.redirect("/pergunta/"+perguntaId);
    })
})

//configuração da porta
app.listen(8080,()=>{console.log("App rodando!");});