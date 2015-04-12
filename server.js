var express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	//Strategy defines how the server will authenticate. Local strategy is local.
	LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();
//create object calls config, witha ppropriate vairables for application
//pass the environment variable into the config.js files
//ENV must be production or development to pull the correct object from config.js
var config = require('./server/config/config')[env];
//require the express.js file after APP has been created above. Passing the object
//and the config variable into the function without express.js
require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
//in order to look up the user we first need to grab the user model
var User = mongoose.model('User');
passport.use(new LocalStrategy(
	//uses username, password and the done callback
	function(username, password, done) {
		User.findOne({username: username}).exec(function(err, user) {
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		})
	}
));
passport.serializeUser(function(user, done) {
	if (user) {
		done(null, user._id);
	}
});
passport.deserializeUser(function(id, done) {
	User.findOne({_id: id}).exec(function(err, user) {
		if (user) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	})
});
require('./server/config/routes')(app);
//retrieve the port for the application from the environment, if no port exists, use 3030
app.listen(config.port);
console.log('listening on port ' + config.port + '...');
