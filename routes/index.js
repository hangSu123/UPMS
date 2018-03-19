var express = require('express');
var router = express.Router();
var connect = require('./conn');


// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Ifb399!@",
//   port:"3306",
//   database: "UPMS"
// });

/* GET home page. */
router.get('/', function(req, res, next) {

  connect().connect(function(err) {
	  if (err) res.render('login1', { database: 'check your database connection' });
	  res.render('login1', { database: 'Database connected' });
	});
  


});



module.exports = router;
