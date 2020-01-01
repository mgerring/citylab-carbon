const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
  entry: {
    'story': './src/story.js',
    'explore': './src/explore.js'
	},
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    chunkFilename: '[name].[id].js'
  },
  resolve: {
		alias: {
			svelte: path.resolve('node_modules', 'svelte')
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
  plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
    new HtmlWebpackPlugin({
      chunks: ['story'],
      template:'./src/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['explore'],
      template:'./src/index.html',
      filename: 'explore.html'
    })
	],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(svg|png|jpe?g|gif|woff(2)?|ttf|eot)$/i,
        use: ['file-loader']
      },
      {
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						emitCss: true,
						hotReload: true
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					/**
					 * MiniCssExtractPlugin doesn't support HMR.
					 * For developing, use 'style-loader' instead.
					 * */
					prod ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader'
				]
			},
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true
        }
      }
    ]
  },
  mode
}
