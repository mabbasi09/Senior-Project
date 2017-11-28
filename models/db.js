var mysql = require('mysql');
var credentials = require('../models/credentials.js');

const db = mysql.createConnection({
	host	: credentials.host,
	user	: credentials.user,
	password: credentials.password,
	database: credentials.database
});

var connection = db.connect(function(err){
	if(err){
		console.log(err.stack);
	} else {
		console.log('MySQL connected...');
	}
});

module.exports = {
	db : db,
	connection : connection,
}