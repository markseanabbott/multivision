var mongoose = require('mongoose');


module.exports = function(config) {
	//connect to local mongo connection and use multivision db, will be created if does not exist
	//mongoose.connect('mongodb://localhost/multivision')
	//use the ENV variable assigned above to define whether we are in development (local) or published (heroku)

	//connect to the mongo db based on the above environment variable
	mongoose.connect(config.db)
		//create variable to connect to db
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback() {
		console.log('multivision db opened successfully');
	});
	/* commenting out since it is no longer needed. I am leaving it in place so I can review later
	// create schema with mongoose
	var messageSchema=mongoose.Schema({message:String});
	//create model variable use model mongoos function and pass the messSchema vairable
	var Message = mongoose.model('Message',messageSchema)
	//this is a variable that will hold the data that is pulled from the database
	var mongoMessage;
	//use the model object created above to find a single object
	//findone with no parameters finds first document in collection
	//it executes a callbackfunction called exec, which then assigned the line to a variable
	Message.findOne().exec(function(err, messageDoc) {
	mongoMessage = messageDoc.message;
	});
	*/

}
