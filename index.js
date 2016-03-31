require('babel-register');
var createApp = require('./src/server/system'),
	   config = require('./src/server/config');

createApp(config);