var express = require('express');
var router = express.Router();
var mysql = require('mysql');



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ifb399!@",
  port:"3306",
  database: "UPMS"
});


/* GET home page. */
router.get('/', function(req, res, next) {

  con.connect(function(err) {
	  if (err) res.render('login', { database: 'check your database connection' });
	  res.render('login', { database: 'Database connected' });
	});
  


});











router.post('/test', function (req, res) {
  var ip = req.connection.remoteAddress;
  var time = Date();
  var sql = "INSERT INTO connection (connectionIp, connectionTime) VALUES ('"+ip+"', '"+time+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send("1 record inserted");
  });
  
})


module.exports = router;
