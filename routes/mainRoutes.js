var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var user = require('../models/user');
var db = require('../models/db').db;
var dbConnect = require('../models/db').connection;

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
		newUser.password = password;

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

passport.use(new LocalStrategy(
  function(username, password, done) {

    user.getUserByUsername(username, function(err, results){
			if(err){
				console.log(err);
			} 
			if(results.length == 0){
				console.log("username not found");
				return done(null, false, {message: 'Unknown User'});
			}

    	user.comparePassword(password, results[0].password, function(err, isMatch){
    		if(err){
    			console.log(err);
    		}
    		if(isMatch){
    			console.log("congrats! you are logged in!");
    			return done(null, user);
    		} else {
    			console.log("invalid password for that username");
    			return done(null, false, {message: 'Invalid password'});
    		}
    	});
	});

}));

passport.serializeUser(function(user, done) {
	console.log("inside serializeUser function");

 	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	console.log("inside deserializeUser function");

	user.getUserById(id, function(err, user) {
    	done(err, user);
  	});

});

// Login process
router.post('/login', 
	passport.authenticate('local', {successRedirect: '/',
									failureRedirect: '/login', 
									failureFlash: true}
						 ), function(req, res) {
    							res.redirect('/');
							}
			);

//Course catalog data API
router.get('/catalog', function(req, res){

	var sql = 'SELECT courseID, year, term, code, title FROM Course WHERE instructorLast = "Voortman";';
	var query = db.query(sql, function(err, results, fields){
		res.json(results);
	});

});

//Add a course to schedule
router.post('/updateSchedule', function(req, res){

	var courseCodes = req.body.data;
	var action = req.body.action;
	var studentId = "1"

	//Tells us which courses to drop/add
	console.log("User has requested to " + action + " course: " + courseCodes);

	if (action == "add"){

		for(var i = 0; i < courseCodes.length; i++){
			var sql = 'INSERT INTO Schedule (Student_studentId, Course_courseId)'
					+ 'Values (?, ?)';
			var inserts = [studentId, courseCodes[i]];
			var query = db.query(sql, inserts, function(err, results, fields){
				console.log(results);
				console.log(err);
			});
		}
		res.send('done');

	} else if (action == "drop"){

		for(var i = 0; i < courseCodes.length; i++){
			var sql = 'DELETE FROM Schedule '
					+ 'WHERE Student_studentId = ? '
					+ 'AND Course_courseId = ?;';
			var inserts = [studentId, courseCodes[i]];
			var query = db.query(sql, inserts, function(err, results, fields){
				console.log(results);
				console.log(err);
			});
		}
		res.send('done');

	} else {
		console.log("nothing to do!");
		res.redirect('main');
	}
});

//Course catalog data API
router.get('/schedule', function(req, res){

	var studentId = "1";
	var sql = 'SELECT Schedule.Course_courseId, year, term, code, title '
			+ 'FROM Course '
			+ 'JOIN Schedule ' 
			+ 	'ON Course_courseId = Course.courseId '
			+	'WHERE Student_studentId = ?;';
	var inserts = [studentId];
	var query = db.query(sql, inserts, function(err, results, fields){
		console.log(err);
		console.log(results);
		res.json(results);
	});

});

module.exports = router;