var mysql=require('mysql');

var connection;

function con(){

	connection = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "Ifb399!@",
	  port:"3306",
	  database: "UPMS"
	});

	return connection;
}


module.exports = con;