var express = require('express');

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

require('./server/config/passport')();

require('./server/config/routes')(app);

//retrieve the port for the application from the environment, if no port exists, use 3030
app.listen(config.port);
console.log('listening on port ' + config.port + '...');
