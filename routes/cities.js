var express = require('express');
var City = require('../models/city.js');

var router = express.Router();

/* GET city list */
router.get('/', function(req, res, next) {
  const offset = getQueryParamOffset(req);
  const size = getQueryParamSize(req);

  res.json(City.all(offset, size));
});

/* GET matched city list */
router.get('/:name', function(req, res, next) {
  const name = req.params.name;
  const size = getQueryParamSize(req);

  res.json(City.prefixMatched(name, size));
});


// following..
//
// .. is super simple param validation
// if not valid, correct it with some reasonable values

const DEFAULT_RES_SIZE = 8;
const DEFAULT_OFFSET = 0;

function getQueryParamSize(req) {
  var size = req.query.size;
  if (size) size = size.trim();
  return (size && isPostiveInt(size)) ? parseInt(size) : DEFAULT_RES_SIZE;
}

function getQueryParamOffset(req) {
  var offset = req.query.offset;
  if (offset) offset = offset.trim();
  return (offset && isNaturalNum(offset)) ? parseInt(offset) : DEFAULT_OFFSET;
}

// 0, 1, 2, 3, ..
function isNaturalNum(str) {
  return str.match(/^\+?\d+$/);
}

// 1, 2, 3, ..
function isPostiveInt(str) {
  return str.match(/^\+?\d*[1-9]\d*$/);
}

module.exports = router;
