const express = require('express');
var session = require('express-session');
const app = express();   
 
(async () => {
    const database = require('./config/db');
    try {
    const resultado = await database.sync();
    console.log(resultado);
    } catch (error) {
    console.log(error);
    }
    })();

app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use( express.static("public") );
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: false,
    saveUninitialized: true
}));   

const animeController = require("./controller/animeController");   
const usuarioController = require("./controller/usuarioController");  

app.get('/adicionar',animeController.create);
app.post('/adicionar',animeController.store); 

app.get('/editar/:id',animeController.edit);
app.post('/editar/:id',animeController.update); 

app.get('/apagar/:id',animeController.destroy); 

app.get('/', animeController.index);  
 
app.get('/logar',usuarioController.logar);  
app.post('/logar',usuarioController.validate); 

app.get('/registrar',usuarioController.registrar);   
app.post('/registrar',usuarioController.store);  
 
app.get('/deslogar',usuarioController.logout); 

app.listen(3000,function(){
    console.log("Servidor utilizando a porta 3000");
}); 