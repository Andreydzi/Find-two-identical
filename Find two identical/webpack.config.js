var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		app: './src/app.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /.jsx?$/,
				exclude: [/node_modules/],
				use: [
					"babel-loader"
				]
			},
			{
				test: /.json$/,
				exclude: [/node_modules/],
				use: [
					"json-loader"
				]
			},
			{
				test: /.scss$/,
				exclude: [/node_modules/],
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
						'sass-loader'
					]
				})
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			template: './src/index.html'
		}),
		new ExtractTextPlugin('style.css')
	]
};