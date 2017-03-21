var webpack = require("webpack");
var path = require("path");
var fs = require('fs');
var jsStringEscape = require('js-string-escape');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var StringReplacePlugin = require('string-replace-webpack-plugin');

var DEV = path.resolve(__dirname, "dev");
var OUTPUT = path.resolve(__dirname, "public");
var DOCS = path.resolve(__dirname, 'docs');

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

// prompt dev build info
console.log("This is a development build, for production build, execute: ");
console.log("\n\twebpack --config webpack.production.config.js\n");

// clean previous build - custom script
cleanDir(OUTPUT, {
  ignore: ['.gitkeep'],
  dry: false
});

// prepare for replacing some strings later in the loader
var aboutDoc = fs.readFileSync(DOCS + '/about.md', { encoding: 'utf8' });
aboutDoc = jsStringEscape(aboutDoc);

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
    ]),
    new StringReplacePlugin()
  ],

  module: {
    loaders: [{
      test: /about-page\.jsx$/,
      loaders: [
        StringReplacePlugin.replace({
          replacements: [{
            pattern: /#{ ABOUT_DOC_TO_BE_REPLACED }/g,
            replacement: function() {
              return aboutDoc;
            }
          }]
        }),
        'babel-loader'
      ]
    }, {
      test: /\.jsx$/,
      loader: 'babel-loader'
    }]
  }
};

module.exports = config;
