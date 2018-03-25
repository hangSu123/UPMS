var express = require('express');
var router = express.Router();
var connect = require('./conn');
var md5 = require('md5');

router.post('/', function(req, res, next) {
    var username= req.body.username;
    var password = req.body.password;
    var portal = "";
    var page = [];

    if (username.substr(0,1) === 'n'){
        portal = "student";
        page.push("student");
    }else if(username.substr(0,1) === 't'){
        portal = "tutor";
        page.push("tutor");
    }else if(username.substr(0,1) === 's'){
        portal = "supervisor";
        page.push("supervisor");
    }else if(username.substr(0,1) === 'c'){
        portal = "coordinator";
        page.push("coord");
    }else{
        res.send('Wrong username');
        return;
    }

  connect().connect(function(err) {
      if (err) console.log(err);
      var sql = "SELECT * FROM `"+portal+"` WHERE username = '"+username+"' AND password = '"+md5(password)+"'";
      connect().query(sql,function(err,results){
        if (err) console.log(err);
        if(results[0] == null || results[0] == undefined || results[0] == ""){
            res.send('fail');
        }else{
            page.push(results[0].first_name);
            page.push(results[0].last_name);        
            res.send(page);
        }
     })
  })
});


module.exports = router;