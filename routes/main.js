var express = require('express');
var router = express.Router();
var db = require('../models/db');

//Homepage
router.get('/', function(req, res){
	res.render('main');
});

// Register
router.get('/register', function(req, res){
	res.render('register');
});

// Login
router.get('/login', function(req, res){
	res.render('login');
});

//Catalog API
router.get('/catalog', function(req, res){
	
	var sql = 'SELECT * FROM Course WHERE instructorLast = "Voortman";';
	var query = db.db.query(sql, function(err, result, fields){
		console.log(result);
		res.json(result)
	});
	// res.send('hello world');
});

module.exports = router;