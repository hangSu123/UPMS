var express = require('express');
var router = express.Router();
var connect = require('./conn');

const path = require('path');
const fs = require('fs');


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

router.get('/getAnnouncement/:userId', function(req, res, next) {
  if (req.xhr){
    connect().connect(function(err) {
      if (err) res.send('0');
      var sql = "SELECT * FROM announcements ORDER BY Id ASC";
      connect().query(sql,function(err,result){
        if (err) res.send('1');
        var temp="";
        for (var i = result.length - 1; i >= 0; i--) {
          temp += announcementTemp(result[i].title,result[i].content,JSON.stringify(result[i].date));

        }
         res.send(temp);
       })
    });
  } else {
   res.send("Page not avalible");
  }


});








module.exports = router;
