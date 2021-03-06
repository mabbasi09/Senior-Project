var bcrypt = require('bcryptjs');
var db = require('../models/db');

var User = {}

module.exports = {
	User: User,
	createUser: function(newUser, callback){
		bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(newUser.password, salt, function(err, hash) {
		        newUser.password = hash;

		        db.newConnection(function(err, conn) {
					if (err) {
						console.log(err);
					}
					else {
				        var sql = "INSERT INTO Student (firstName, lastName, username, email, password)" +
				        		  "VALUES (?, ?, ?, ?, ?);";
				        var inserts = [newUser.firstName, newUser.lastName, newUser.username, newUser.email, newUser.password];
				        sql = conn.format(sql, inserts);

				        conn.query(sql, function(err, result, fields){
				    		console.log(err, result);
				    	});
					}
				});

		    });
		});
	},
	getUserByUsername: function(username, callback){
		console.log("looking for username...");

		var sql = "SELECT * FROM Student WHERE username = ?";
		var insert = [username];
		var query = db.query(sql, insert, callback);
	},
	getUserById: function(id, callback){
		// User.findById(id, callback);//Mongoose method, need to make work for mysql
		var sql = "SELECT * FROM Student WHERE id = ?;";
		var insert = [id];
		var query = db.query(sql, insert, callback);
	},
	comparePassword: function(candidatePassword, hash, callback){

		bcrypt.compare(candidatePassword, hash, function(err, isMatch){
			if(err){
				console.log("there is an error comparing passwords");
				console.log(err);
			}
			callback(null, isMatch);
		});
	}
}