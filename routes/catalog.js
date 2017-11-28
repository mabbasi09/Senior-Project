var express = require('express');
var router = express.Router();

//Homepage
router.get('/catalog', function(req, res){
	res.send('hello world');
});

module.exports = router;