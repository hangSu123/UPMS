var db = require('../db'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

var Student = sequelize.define('student',  {
                    student_id: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        primaryKey: true,
                        autoIncrement: true
                 },
                    email_Address: {
                        type: Sequelize.STRING,
                        allowNull: false },
                    first_name: {
                        type: Sequelize.STRING,
                        allowNull: false },
                    last_name: {
                        type: Sequelize.STRING,
                        allowNull: false },
                    GPA: {
                        type: Sequelize.INTEGER,
                        allowNull: false },
                    major: {
                        type: Sequelize.STRING,
                        allowNull: false },
                    group_id: {
                        type: Sequelize.INTEGER,
                        allowNull: true },
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

module.exports = Student;