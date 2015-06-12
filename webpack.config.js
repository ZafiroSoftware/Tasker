// webpack.config.js
module.exports = {
  entry: './src/js/CustomerOrder.js',
  output: {
    path: __dirname + "/src/js",
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader?harmony' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ]
  },
    resolve: {
            extensions: ['', '.js', '.htm']
        }
};
