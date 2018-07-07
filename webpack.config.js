const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
	entry: "./src/client/index.tsx",
	output: {
		filename: "bundle.js",
		path: __dirname + "/public/"
	},
	devtool: "source-map",

	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},

	module: {
		rules: [
			{ 
				test: /\.tsx?$/, loader: "ts-loader"
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100000'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "public", "template.html")
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new ForkTsCheckerWebpackPlugin({
			async: false,
			watch: "public",
			tsconfig: "tsconfig.json",
			tslint: "tslint.json",
		}),
	],
	devServer: {
		compress: true,
		hot: true,
		proxy: {
			"/api": "http://localhost:3000"
		}
	},
	mode: "development",
	performance: {
		hints: false
	}
}