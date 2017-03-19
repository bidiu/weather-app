var express = require('express');
var router = express.Router();

/* GET matched city list */
router.get('/:name', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
