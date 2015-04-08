module.exports = function(app) {
	//routing sub section. The catch all route should remain at the end. Which will catch all routes if they arent defined previously

	//this defines the routes for partials. this will render the sub file name under the partials directory
	//using * to ignify to open any partial sub directory file
	//using req.params[0] to open the 0th file
	//essentially fixing the routing to adapt to the new sub folder directory in the partials directory
	app.get('/partials/*', function(req, res) {
		res.render('../../public/app/' + req.params[0]);
	});

	/* commenting out since it is no longer needed. I am leaving it in place so I can review later
	app.get('*', function(req, res) {
	res.render('index', {
	  //assign a variable to be passed to the index file from the mongo db constructor
	  mongoMessage: mongoMessage
	});
	});
	*/
	//add route for ALL. This essentially makes the client side the routing tool. This is the index view
	app.get('*', function(req, res) {
		res.render('index');
	});
}