var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('coord/index');
});


router.get('/groups', function(req, res, next) {
  res.render('coord/groups');
});
router.get('/groups_detail', function(req, res, next) {
  res.render('coord/groups_detail');
});
router.get('/project', function(req, res, next) {
  res.render('coord/project');
});
router.get('/meeting', function(req, res, next) {
  res.render('coord/meeting');
});
router.get('/profile', function(req, res, next) {
  res.render('coord/profile');
});
router.get('/project_detail', function(req, res, next) {
  res.render('coord/project_detail');
});
router.get('/upload_project', function(req, res, next) {
  res.render('coord/upload_project');
});
router.get('/assessments', function(req, res, next) {
  res.render('coord/assessments');
});



module.exports = router;