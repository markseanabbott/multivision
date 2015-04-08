var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

//defining object variables to pass to
module.exports = {
	development: {
		db: 'mongodb://localhost/multivision',
		rootPath: rootPath,
		port: process.env.PORT || 3030
	},
	production: {
		db: "mongodb://mabbott:multivision@ds059661.mongolab.com:59661/multivision",
		rootPath: rootPath,
		port: process.env.PORT || 80
	}
}
