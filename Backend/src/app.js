const app = require("./config/express");
const express = require('express'); 
const path = require('path'); 

// Inicializa o banco de dados SQLite puro
const db = require("./database/sqlite");
db.init();

// Todas as rotas da aplicação
const routes = require("./routes");
// Configura o middleware de tratamento de erros
const errorHandler = require("./middlewares/errorHandler");

// Configura as rotas
app.use("/api", routes);

//Servir capas para o FrontEnd
app.use('/capas', express.static(path.join(__dirname, '../src/data/uploads/capas')));

app.use(errorHandler);

// Handler para rotas não encontradas (404)
app.use((req, res) => {
    res.status(404).json({ erro: "Endpoint não encontrado" });
});


module.exports = app;