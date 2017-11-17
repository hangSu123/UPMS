var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('tutor/tut-home-page', { title: 'Express' });
});

router.get('/project', function(req, res, next) {
  res.render('tutor/project', { title: 'Express' });
});
router.get('/group_detail', function(req, res, next) {
  res.render('tutor/group_detail', { title: 'Express' });
});
router.get('/selfreflection', function(req, res, next) {
  res.render('tutor/selfreflection', { title: 'Express' });
});
router.get('/tutcontact', function(req, res, next) {
  res.render('tutor/tutcontact', { title: 'Express' });
});
router.get('/tutmeeting', function(req, res, next) {
  res.render('tutor/tutmeeting', { title: 'Express' });
});
router.get('/tutprofile', function(req, res, next) {
  res.render('tutor/tutprofile', { title: 'Express' });
});
router.get('/tutgroups', function(req, res, next) {
  res.render('tutor/tutgroups', { title: 'Express' });
});









module.exports = router;