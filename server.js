var express = require('express'),
	stylus = require('stylus'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

//sets the stylus compiler
function compile(str, path) {
	return stylus(str).set('filename', path);
};

//configuration section

//app is the object connected with the expresss module
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: compile
}));
app.use(express.static(__dirname + '/public'));

//connect to local mongo connection and use multivision db, will be created if does not exist
//mongoose.connect('mongodb://localhost/multivision')
//use the ENV variable assigned above to define whether we are in development (local) or published (heroku)
if (env === 'development'){
	mongoose.connect('mongodb://localhost/multivision')
}
else
{
	mongoose.connect('mongodb://mabbott:multivision@ds059661.mongolab.com:59661/multivision')
}


//create variable to connect to db
var db=mongoose.connection;
db.on('error', console.error.bind(console,'connection error...'));
db.once('open', function callback(){
	console.log('multivision db openend');
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
//routing sub section. The catch all route should remain at the end. Which will catch all routes if they arent defined previously

//this defines the routes for partials. this will render the sub file name under the partials directory
app.get('/partials/:partialPath', function(req, res) {
		res.render('partials/' + req.params.partialPath);
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
//retrieve the port for the application from the environment, if no port exists, use 3030
var port = process.env.PORT || 3030;
app.listen(port);
console.log('listening on port ' + port + '...');
