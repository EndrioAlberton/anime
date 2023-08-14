const database = require('../config/db');
const Sequelize = require('sequelize');
const usuarioModel = database.define('usuario', {
id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
},
nome:  
    {type: Sequelize.STRING, allowNull: false,  
    unique: true,
    }, 
email:  
    {type: Sequelize.STRING, allowNull: false, 
    unique: true,
    },
senha: {type: Sequelize.STRING},
},
{timestamps: false} 
)
module.exports = usuarioModel;