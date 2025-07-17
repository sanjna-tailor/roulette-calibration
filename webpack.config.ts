// import * as HtmlWebpackPlugin from 'html-webpack-plugin';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');
const path = require('path');

module.exports = (env: any) => {
	const isDevelopment = env.development === true;
	const isProduction = !isDevelopment;

	console.warn(`DEVELOPMENT ${isDevelopment}`);

	return {
		entry: './src/index.ts',
		mode: isDevelopment ? 'development' : 'production',
		devtool: 'inline-source-map',
		devServer: {
			liveReload: true,
			hot: true,
			static: './dist',
			client: {
				overlay: {
					errors: true,
					warnings: false,
				},
			},
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.html$/,
					loader: 'html-loader',
				},
			],
		},
		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
			alias: {
				'@sandsb2b/areax-pixi-core': path.resolve('./node_modules/@sandsb2b/areax-pixi-core'),
			},
		},
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'dist'),
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: 'src/index.html',
			}),
			new DefinePlugin({
				__DEV__: isDevelopment,
				__PROD__: isProduction,
				// __VER__: JSON.stringify(gameVersion)
			}),
			new CopyPlugin({
				patterns: [{ from: 'assets', to: 'assets' }],
			}),
		],
	};
};
