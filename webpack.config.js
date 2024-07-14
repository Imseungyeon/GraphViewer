const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    renderer: './renderer/index.jsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'electron-renderer',
  plugins: [
    new HtmlWebpackPlugin({
      template: './renderer/index.html',
      filename: 'index.html',
      chunks: ['renderer'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
