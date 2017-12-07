var express = require('express');
var router = express.Router();
var user = require('../models/user');
var db = require('../models/db').db;
var dbConnect = require('../models/db').connection;


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

// Register a user page
router.get('/register', function(req, res){
	res.render('register');
});

// Register a user process
router.post('/register', function(req, res){
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var cpassword = req.body.cpassword;

	//Validation
	req.checkBody('firstName', 'First name is required!').notEmpty();
	req.checkBody('lastName', 'Last name is required!').notEmpty();
	req.checkBody('email', 'E-mail is invalid!').isEmail();
	req.checkBody('username', 'Username is required!').notEmpty();
	req.checkBody('password', 'Password is required!').notEmpty();
	req.checkBody('cpassword', 'Passwords do not match!').equals(password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register', {
			errors: errors
		});
		console.log(errors);
	} else {
		var newUser = user;

		newUser.firstName = firstName;
		newUser.lastName = lastName;
		newUser.email = email;
		newUser.username = username;

		newUser.createUser(newUser, function(err, user){
			if(err) throw err;
		});
		console.log(newUser);

		req.flash('success_msg', 'You are now registered!');
		res.redirect('login');
	}
});

// Login page
router.get('/login', function(req, res){
	res.render('login');
});

// Login process
router.post('/login', function(req, res){
	// res.render('login');
});

//Course catalog data API
router.get('/catalog', function(req, res){

	var sql = 'SELECT courseID, year, term, code, title FROM Course WHERE instructorLast = "Voortman";';
	var query = db.query(sql, function(err, results, fields){
		res.json(results);
	});
});

//Add a course to schedule
router.post('/updateSchedule', function(req, res){

	//Tells us which courses to drop/add
	var courseCodes = req.body.data;
	var action = req.body.action;
	console.log("User has requested to " + action + " course: " + courseCodes);

	if (action == "add"){

		for(var i = 0; i < courseCodes.length; i++){
			// var sql = 'INSERT INTO Schedule title WHERE studentId = "56";';
			// var query = db.query(sql, function(err, results, fields){
			// 	console.log(results);
			// });
		}
		res.send('done');

	} else if (action == "drop"){
		
		for(var i = 0; i < courseCodes.length; i++){
			// var sql = 'DELETE FROM Schedule title WHERE studentId = "56";';
			// var query = db.query(sql, function(err, results, fields){
			// 	console.log(results);
			// });
		}
		res.send('done');

	} else {
		console.log("nothing to do!");
		res.redirect('main');
	}
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
