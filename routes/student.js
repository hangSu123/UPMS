var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('student/index');
});


router.get('/group', function(req, res, next) {
  res.render('student/group');
});
router.get('/project', function(req, res, next) {
  res.render('student/project');
});
router.get('/group_detail', function(req, res, next) {
  res.render('student/group_detail');
});
router.get('/manage_meeting_time', function(req, res, next) {
  res.render('student/manage_meeting_time');
});
router.get('/manage_presentation_time', function(req, res, next) {
  res.render('student/manage_presentation_time');
});
router.get('/profile', function(req, res, next) {
  res.render('student/profile');
});
router.get('/self_reflection', function(req, res, next) {
  res.render('student/self_reflection');
});
router.get('/project_detail', function(req, res, next) {
  res.render('student/project_detail');
});
router.get('/assessment', function(req, res, next) {
  res.render('student/assessment');
});



module.exports = router;