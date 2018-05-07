var db = require('../db'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

var Tutor = sequelize.define('tutor',  {
                    supervisor_id: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        primaryKey: true,
                        autoIncrement: true},
                    email_Address: {
                        type: Sequelize.STRING,
                        allowNull: false },
                    first_name: {
                        type: Sequelize.STRING,
                        allowNull: false },
                    last_name: {
                        type: Sequelize.STRING,
                        allowNull: false },
                    phone_number:{
                        type: Sequelize.INTEGER,
                        allowNull: false },
                    username: {
                        type: Sequelize.STRING,
                        allowNull: false },
                    password: {
                        type: Sequelize.STRING,
                        allowNull: false },
                    salt: {
                        type: Sequelize.STRING,
                        allowNull: false }
                    },{
                        charset: 'utf8',
                        collate: 'utf8_unicode_ci',
                        freezeTableName: true
                      }
                    );

module.exports = Tutor;