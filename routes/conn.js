var mysql=require('mysql');

var connection;

function con(){

	connection = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "root",//Ifb399!@
	  port:"8889",
	  database: "UPMS"
	});

	return connection;
}


module.exports = con;
