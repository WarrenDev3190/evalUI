import webpack from 'webpack';
import path from 'path';
import config  from './config';

const webpackConfig = {
	entry: config.entry,
	output: {
		filename: 'bundle.js',
		path: config.outputPath,
		publicPath: '/static/'
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				loaders: ['babel'],
				exclude: /node_modules/,
				include: config.src
			},
			{
				test: /\.scss?$/,
				loaders: ['style','css','sass']
			}
		]
	}
}

export default webpackConfig;