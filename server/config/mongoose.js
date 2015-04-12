var mongoose = require('mongoose');
module.exports = function(config) {
	//connect to local mongo connection and use multivision db, will be created if does not exist
	//mongoose.connect('mongodb://localhost/multivision')
	//use the ENV variable assigned define whether we are in development (local) or published (heroku)

	//connect to the mongo db based on the above environment variable provided by the config object created in config.js
	mongoose.connect(config.db)
		//create variable to connect to db
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback() {
		console.log('multivision db opened successfully');
	});

	//database schema for User model
	var userSchema = mongoose.Schema({
		firstName:String,
		lastName:String,
		username:String
	});
	//using the above schema to create a user model
	var User = mongoose.model("User",userSchema);
	//if it doesn't return any users, it creates a default
	User.find({}).exec(function(err,collection){
		if(collection.length === 0) {
			User.create({firstName:'Mark',lastName:'Abbott',username:'mabbott'});
			User.create({firstName:'bob',lastName:'smith',username:'bsmith'});
			User.create({firstName:'slimy',lastName:'greasy',username:'test'});
		}
	});
};
