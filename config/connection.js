//import sequelize
const Sequelize = require('sequelize');
require('dotenv').config();


//db connection
let sequelize;
if (process.env.JAWSDB) {
    sequelize = new Sequelize(process.env.JAWSDB);
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

module.exports = sequelize;