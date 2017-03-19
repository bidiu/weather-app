var webpack = require("webpack");
var path = require("path");
var fs = require('fs');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var DEV = path.resolve(__dirname, "dev");
var OUTPUT = path.resolve(__dirname, "public");

// TODO make it a webpack plguin
// based on https://gist.github.com/liangzan/807712, altered
function cleanDir(dirPath, opt) {
  if (opt.ignore === undefined) opt.ignore = [];
  if (opt.dry === undefined) opt.dry = false;
  try { var files = fs.readdirSync(dirPath); }
  catch(e) { console.log("Custom clean script: \n" + e); return; }

  if (files.length > 0) {
    for (var i = 0; i < files.length; i++) {
      var fileName = files[i];
      var filePath = dirPath + '/' + fileName;
      if (fs.statSync(filePath).isFile() && !opt.ignore.includes(fileName)) {
        console.log("Custom clean script: going to delete " + filePath);
        if (!opt.dry) fs.unlinkSync(filePath)
      } else if (! fs.statSync(filePath).isFile()) {
        cleanDir(filePath, opt);
      }
    }
  }
}

console.log("This is a development build, for production build, execute: ");
console.log("\n\twebpack --config webpack.production.config.js\n");

// clean previous build - custom script
cleanDir(OUTPUT, {
  ignore: ['.gitkeep'],
  dry: false
});

var config = {
  entry: {
    'javascripts/bundle.js': DEV + '/index.jsx',
  },

  output: {
    path: OUTPUT + '/',
    filename: '[name]',
    publicPath: '/public/'
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: DEV + '/images', to: OUTPUT + '/images' },
      { from: DEV + '/css', to: OUTPUT + '/stylesheets' },
      { from: path.resolve(__dirname, 'index.html'), to: OUTPUT }
    ])
  ],

  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel-loader'
    }]
  }
};

module.exports = config;
