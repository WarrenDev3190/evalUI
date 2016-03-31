import path from 'path';

const config = {
	port: process.env.PORT || 5000,
	src: path.join(__dirname, 'app'),
	public: path.join(__dirname, 'public'),
	views: path.join(__dirname, 'views'),
	entry: path.join(__dirname, 'app/index'),
	outputPath: path.join(__dirname, 'public/dist/js')
}

module.exports = config;

