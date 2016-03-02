var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry: [
		'./js/app'
	],
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	externals: {
		'jquery': 'jQuery'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['babel'],
				exclude: /node_modules/,
				include: path.join(__dirname, 'js')
			},
			{
				test: /\.css$/,
				include: /css/,
				loaders: ['style','css']
			},
			{
				test: /.(png|gif|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
				loader:'url-loader?limit=100000'
			}
		]
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
		  'process.env': {
		    'NODE_ENV': JSON.stringify('production')
		  }
		}),
		new webpack.optimize.UglifyJsPlugin({
		  compressor: {
		    warnings: false
		  }
		})
	],
};
