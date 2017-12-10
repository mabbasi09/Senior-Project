//BASE SETUP FOR SERVER, DATABASE AND UTILITIES

//Initialize express object
var express = require('express');
var app = express();

var path = require('path');
var mysql = require('mysql');
var credentials = require('./models/credentials.js');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHandlebars = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;


//Templating engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expressHandlebars({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

//Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Express session
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

//Passport initialization
app.use(passport.initialize());
app.use(passport.session());

//Express Validator
app.use(expressValidator({
	errorFormatter: function(param, msg, value){
		var namespace = param.split('.')
		, root = namespace.shift()
		, formParam = root;

		while(namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param : formParam,
			msg : msg,
			value : value
		};
	}
}));

//Connect Flash
app.use(flash());

//Global variables
app.use(function(req, res, next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});

//Define routes
var routes = require('./routes/mainRoutes');
app.use('/', routes);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log("Server started on port " + app.get('port'));
});
