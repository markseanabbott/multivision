var express = require('express'),
	stylus = require('stylus'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	cookieParser=require('cookie-parser'),
	session=require('express-session'),
	passport=require('passport');

//passing the app variable created using the express object into
// the exports function
module.exports = function(app, config) {
	//This is the express app
	//sets the stylus compiler
	function compile(str, path) {
		return stylus(str).set('filename', path);
	};

	//configuration section

	//app is the object connected with the expresss module
	app.set('views', config.rootPath + '/server/views');
	app.set('view engine', 'jade');
	app.use(logger('dev'));
	app.use(cookieParser());
	app.use(session({secret:'multi vision unicorn'}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(stylus.middleware({
		src: config.rootPath + '/public',
		compile: compile
	}));
	app.use(express.static(config.rootPath + '/public'));
}
