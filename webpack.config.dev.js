var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'eventsource-polyfill', // necessary for hot reloading with IE
		'webpack-hot-middleware/client',
		'./js/app'
	],
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?/,
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
	    new webpack.ProvidePlugin({
	    	$: "jquery",
			jQuery: "jquery",
			'window.jQuery': 'jquery'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')})
	]
};
