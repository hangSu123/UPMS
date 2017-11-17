var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {
  res.render('superviser/index');
});
router.get('/project', function(req, res, next) {
  res.render('superviser/project');
});





module.exports = router;