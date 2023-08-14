const database = require('../config/db');
const Sequelize = require('sequelize');
const animeModel = database.define('animes', {
id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
},
titulo:  
    {type: Sequelize.STRING, allowNull: false
    },  
sinopse:  
    {type: Sequelize.STRING, allowNull: false
    }, 
imagem: {type: Sequelize.STRING},
},
{timestamps: false} 
)
module.exports = animeModel;