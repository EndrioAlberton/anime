const fs = require('fs');
const crypto = require('crypto');
const path = require('path'); 

const animeModel = require("../model/anime"); 

module.exports = { 
    index: async function(req, res) {
        let dados = await animeModel.findAll();
        res.render('animes/mostraAnime', {dadosAnime: dados})
    },
    create: function(req, res) {
        res.render('animes/adicionaAnime');
    }, 
    store: function(req, res) {
        var formidable = require('formidable');
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            var oldpath = files.imagem.filepath;
            var hash = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
            var nomeimg = hash +'.'+files.imagem.mimetype.split('/')[1];
            var newpath = path.join(__dirname, '../public/imagens/', nomeimg); 
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
            });
            const animeCreate = animeModel.create({
                titulo: fields['titulo'], sinopse: fields['sinopse'], imagem: nomeimg
                })
        }) 
        res.redirect('/')  
    }, 
    edit: async function(req, res) {
        var id= req.params.id;   
        let dados = await animeModel.findAll({ 
            where: {id}
        })

        res.render('animes/editaAnime', {dadosAnime: dados})

    },  
    update: function(req, res) { 
        if (req.session.loggedin) {
            var formidable = require('formidable');
            var form = new formidable.IncomingForm();
            form.parse(req, (err, fields, files) => {   
                var id= req.params.id; 
                 
                animeModel.findAll({
                    where: { id: id }
                    }).then(result=>{
                        var img = path.join(__dirname, '../public/imagens/', result[0]['imagem']);
                        fs.unlink(img, (err) => {});
                    })
                .catch(err=>
                    console.error(err)
                    );   
        
                var oldpath = files.imagem.filepath;
                var hash = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
                var nomeimg = hash +'.'+files.imagem.mimetype.split('/')[1]
                var newpath = path.join(__dirname, '../public/imagens/', nomeimg); 
                        
                fs.rename(oldpath, newpath, function (err) {
                    if (err) throw err;
                });
                        
                var titulo = fields['titulo'];
                var sinopse = fields['sinopse'];  
    
                animeModel.update( 
                    {titulo: titulo, sinopse: sinopse, imagem: nomeimg}, 
                    {where: {id: id}}
                );    
            }) 
        res.redirect('/');  
        }else res.redirect('/logar'); 
    },         
    destroy: async function(req, res) {
        if (req.session.loggedin) { 
        var id= req.params.id; 

        animeModel.findAll({
            where: { id: id }
            }).then(result=>{
            var img = path.join(__dirname, '../public/imagens/', result[0]['imagem']);
            fs.unlink(img, (err) => {});
            })
            .catch(err=>
            console.error(err)
            );
            animeModel.destroy({
            where: { id: id }
            });
        }else{ 
            res.redirect('/logar');
        }  
    }
}
        
        
