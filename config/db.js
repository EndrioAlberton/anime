const Sequelize = require('sequelize');
const sequelize = new Sequelize('node', 'root', '', {dialect: 'mysql', host:
'localhost', port: '3306', query:{raw:true}, define:{timestamps: false}});
module.exports = sequelize;