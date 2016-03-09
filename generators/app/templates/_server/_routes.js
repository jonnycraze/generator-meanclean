var express 			= require('express');
var router 				= express.Router();

// restful API routes
module.exports = function(app) {
	// route to handle all angular requests
	app.get('*', function(req, res, next) {
		res.sendfile('./client/src/index.html');
	});


	////
	//// Different methods available
	////  
	//// .get .post .delete .put
	////
	//// EX:
	//// .get('/api/route/here', function(request, response, callback){})


};