var express = require('express');
var router = express.Router();
var db = require('../models/db');


$("#addCourse").on("click", function(){
   var data = {'title':'programming',
                'code':'CMPS 101'};
   $.ajax({
    url: '/addCourse',
    type: 'POST',
    data: data
   });
})

$("#removeCourse").on("click", function(){
   var data = {'title':'programming',
                'code':'CMPS 101' '*REMOVED FROM SCHEDULE*'};
   $.ajax({
    url: '/removeCourse',
    type: 'POST',
    data: data
   });
})


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

// Schedule

// Add course
router.post('/addCourse', function(req, res){
    var title = res.body.title
    var sql = 'INSERT INTO Schedule title WHERE studentId = "56";';
    var query = db.db.query(sql, function(err, results, fields){
        console.log(results);
});

// Remove course
router.post('/removeCourse', function(req, res){
    var title = res.body.title
    var sql = 'DELETE FROM Schedule title WHERE studentId = "56";';
    var query = db.db.query(sql, function(err, results, fields){
        console.log(results);
});	

// View progress

	
	
module.exports = router;
