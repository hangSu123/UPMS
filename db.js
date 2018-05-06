var Sequelize = require('sequelize');

var sequelize = new Sequelize('upms', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;