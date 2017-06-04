var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'dist/rx-simple.js',
    libraryTarget: 'umd',
    library: 'Rx'
  },
  module: {
    loaders: [{
      test   : /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: 'es2015'
      }
    }]
  }
};
