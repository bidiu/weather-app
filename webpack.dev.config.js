var webpack = require("webpack");
var path = require("path");

var DEV = path.resolve(__dirname, "dev");
var OUTPUT = path.resolve(__dirname, "public");

var config = {
  entry: DEV + "/index.jsx",

  output: {
    path: OUTPUT + '/javascripts',
    filename: "bundle.js",
    publicPath: '/public/'
  },
  
  module: {
    loaders: [{
        include: DEV,
        loader: "babel-loader",
    }]
  }
};

module.exports = config;
