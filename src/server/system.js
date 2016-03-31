import http from 'http';
import util from 'util';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import logger from 'morgan';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import index from './routes/index';

const createApp = function(config) {
	const app = express();
	config = config || {};
	app.use(logger('combined'));
	app.use(cookieParser());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(express.static(config.public));
	app.use(session({
		secret: 's3kr3t',
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 6000000
		}
	}));

	app.set('view engine', 'ejs');
	app.set('views', config.views);

	if(app.get('env') === 'development'){
		app.use(WebpackDevMiddleware(webpack(webpackConfig),{
			publicPath: webpackConfig.output.publicPath,
			stats: {
				colors: true
			}
		}));
	}

	app.use('/', index);
	app.listen(config.port, (err) => {
		if(err){
			util.log('Failed to launch application...');
			util.log(err.stack);
			process.exit(1);
		}else{
			util.log(util.format('App running on port: %s', config.port));
		}
	});
}



module.exports = createApp;
