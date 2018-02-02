var mysql = require('mysql');
var credentials = require('../models/credentials.js');


function newConnection(cb) {
	var conn = mysql.createConnection({
		host	: credentials.host,
		user	: credentials.user,
		password: credentials.password,
		database: credentials.database
	});
	conn.connect(function(err) {
		try {
			cb(err, conn);
		}
		catch(e){
			console.log("database error: " + e);
		}
	});
}

module.exports = {
	newConnection: newConnection
}

/**Use this format in other models that interact with DB**/
// db.newConnection(function(err, conn) {
// 	if (err) {
// 		console.log(err);
// 	}
// 	else {
// 		conn.query();
// 	}
// });