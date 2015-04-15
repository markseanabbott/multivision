var mongoose = require('mongoose'),
	crypto = require('crypto');
module.exports = function(config) {
	//connect to local mongo connection and use multivision db, will be created if does not exist
	//mongoose.connect('mongodb://localhost/multivision')
	//use the ENV variable assigned define whether we are in development (local) or published (heroku)

	//connect to the mongo db based on the above environment variable provided by the config object created in config.js
	mongoose.connect(config.db)
		//create variable to connect to db
	var db = mongoose.connection;
	db.on('error',function (err){
		console.log('mongoose could not connect: ' + err);
		mongoose.disconnect();
		process.exit(1);
	});

	db.once('open', function callback() {
		console.log('multivision db opened successfully');

	});

	//database schema for User model
	var userSchema = mongoose.Schema({
		firstName:String,
		lastName:String,
		username:String,
		salt:String,
		hash_pwd:String,
		// [String] implies and ARRAY of potential roles
		roles:[String]
	});
	userSchema.methods = {
		authenticate: function(passwordToMatch){
			//THIS access the current use object.
			return hashPwd(this.salt, passwordToMatch) === this.hash_pwd;
		}
	}
	//using the above schema to create a user model
	var User = mongoose.model("User",userSchema);
	//if it doesn't return any users, it creates a default
	User.find({}).exec(function(err,collection){
		if(collection.length === 0) {
			var salt, hash;
			salt=createSalt();
			hash = hashPwd(salt, 'mabbott')
			User.create({firstName:'Mark',lastName:'Abbott',username:'mabbott', salt:salt, hash_pwd:hash, roles:['admin']});
			salt=createSalt();
			hash = hashPwd(salt, 'bsmith')
			User.create({firstName:'bob',lastName:'smith',username:'bsmith', salt:salt, hash_pwd:hash, roles:['gm']});
			salt=createSalt();
			hash = hashPwd(salt, 'test')
			User.create({firstName:'slimy',lastName:'greasy',username:'test', salt:salt, hash_pwd:hash});
		}
	});
};

function createSalt(){
	return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt,pwd){
	var hmac = crypto.createHmac('sha1', salt);
	return hmac.update(pwd).digest('hex');
}
