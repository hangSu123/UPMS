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



module.exports = router;
