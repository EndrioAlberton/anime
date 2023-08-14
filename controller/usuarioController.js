const bcrypt = require('bcrypt');
const path = require('path');  
var formidable = require('formidable');
var form = new formidable.IncomingForm();

const usuarioModel = require("../model/usuario"); 

module.exports = { 
    registrar: function(req, res) {
        res.render('usuario/registrar', {mensagem: null});
    }, 
    store: function(req, res) {
        form.parse(req, (err, fields, files) => {
        bcrypt.hash(fields['senha'], 10, function(err, hash) {
                usuarioModel.create({
                    nome: fields['nome'], email: fields['email'], senha: hash
                })
            });
        }),
        res.redirect('/')  
    },  
    logar: function(req, res) {
        res.render('usuario/login', {mensagem: null});
    },  
    validate: function(req, res) {  

        form.parse(req, async (err, fields, files) => { 
        const data = await usuarioModel.findAll({where: {nome: fields['nome']}})  

        if (data.length) 
            bcrypt.compare(fields['senha'], data[0].senha, function(err, resultado) { 
                if(resultado){ 
                    req.session.loggedin = true;
                    req.session.username = data[0].nome;
                    res.redirect('/');    
                }
                else{ 
                res.render('usuario/login', {mensagem: 'Senha incorreta'});
                 }    
            }); 
            else{ 
                res.render('usuario/registrar', {mensagem: 'Não existe este úsuario'});
            }
        }) 
    },  
    logout: async function(req, res) {
        req.session.destroy(function(err) {
            // cannot access session here
            })        
        res.redirect('/logar'); 
    }
}
        
        
