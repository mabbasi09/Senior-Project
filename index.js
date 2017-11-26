//BASE SETUP FOR SERVER, DATABASE AND UTILITIES

//Initialize express object
const express = require('express');
const app = express();

//Initialize MySQL and create connection
const mysql = require('mysql');
const credentials = require('./models/credentials.js');

const db = mysql.createConnection({
	host	: credentials.host,
	user	: credentials.user,
	password: credentials.password,
	database: credentials.database
});

db.connect(function(err){
	if(err){
		console.log(err.stack);
	} else {
		console.log('MySQL connected...');
	}
});

var path = require('path');
//app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res){

});

app.listen(3000, function(){
	console.log("server started on port 3000");
});
