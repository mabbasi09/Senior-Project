//BASE SETUP FOR SERVER, DATABASE AND UTILITIES

//Initialize express object
const express = require('express');
const app = express();

//Initialize MySQL and create connection
const mysql = require('mysql');
const db = mysql.createConnection({
	host	: 'localhost',
	user	: 'Mohammad',
	password: '111111',
	// database: 'ssa-db' 
});

db.connect(function(err){
	// if(err){
	// 	throw err;
	// }
	console.log('MySQL connected...');
});

//body-parser utility
const bodyParser = require('body-parser');

//path utility
const path = require('path');

// var logger = function(req, res, next){
// 	console.log('Logging...');
// 	next();
// }

// app.use(logger);

//View engine
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/createdb', function(req, res){

// 	let sql = 'CREATE DATABASE ssa-db';

// 	db.query(sql, function(err, result){
// 		// if(err){
// 		// 	throw err;
// 		// }
// 		console.log(result);
// 		res.send('database created...')
// 	});
// });

app.listen(3000, function(){
	console.log("server started on port 3000");
});
