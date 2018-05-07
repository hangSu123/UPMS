var Sequelize = require('sequelize');

var sequelize = new Sequelize('upms', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port:'3306',
    logging: false,
    define: {
        timestamps: false
    }
});

var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
