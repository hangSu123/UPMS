var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var db = require('../db'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

var Student = require('../dbModules/db_student');
var Tutor = require('../dbModules/db_tutor');
var Supervisor = require('../dbModules/db_supervisor');
var Coordinator = require('../dbModules/db_coordinator');

const Op = Sequelize.Op;


router.post('/', function(req, res, next) {
    var username= req.body.username;
    var password = req.body.password;
    var portal = "";
    var page = [];

    if (username.substr(0,1) === 'n'){
        portal = Student;
        page.push("student");
    }else if(username.substr(0,1) === 't'){
        portal = Tutor;
        page.push("tutor");
    }else if(username.substr(0,1) === 's'){
        portal = Supervisor;
        page.push("supervisor");
    }else if(username.substr(0,1) === 'c'){
        portal = Coordinator;
        page.push("coord");
    }else{
        res.send('Wrong username');
        return;
    }
    sequelize.sync()
        .then(function(){
            portal.findOne({
                where: {username:username}
                 })
                 .then(function(results){
                    if(results == null || results == undefined || results == ""){
                        res.send('fail');
                    }else{
                        var secret = results.dataValues.salt;
                        var hashPassword = crypto.createHmac('sha256', secret)
                                            .update(password)
                                            .digest('hex');
                        portal.findOne({
                                    where: {
                                        [Op.and]: [{username: username}, {password: hashPassword}]
                                    }
                                })
                            .then(function(return_data){
                                if(return_data == null || return_data == undefined || return_data == ""){
                                    res.send('fail');
                                }else{
                                    page.push(return_data.dataValues.first_name);
                                    page.push(return_data.dataValues.last_name);        
                                    res.send(page);
                                }
                            })
                        }
                    })
             })
    });


module.exports = router;