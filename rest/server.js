var express = require('express')
// var mysql = require('mysql')

// mysql.connect('database')

var app = express;

app.get('/', function(req, res){
  res.send('working');
});

app.listen(3000);
console.log('API is running on port 3000');
