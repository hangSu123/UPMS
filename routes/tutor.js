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



router.get('/project/getProjects/:userId', function(req, res, next) {
   if (req.xhr){
     var user = req.params.userId;
      connect().connect(function(err) {
      if (err) res.send('0');
        var sql = "SELECT * FROM `project` WHERE project_id = (SELECT project_id From `group` WHERE tutor_email = (SELECT email_address From `tutor` where username = '"+user+"')) ";
        connect().query(sql,function(err,results){
          if (err) console.log(err);
          var temp ="";
          for (var i = results.length - 1; i >= 0; i--) {
            temp += projectTemp(results[i].project_id,results[i].project_name,results[i].difficulty_level,results[i].super_name,results[i].simple_description);
          }
          res.send(temp);
        })
      });
   }
   else {
   res.send("Page not avalible");
  }
});


router.get('/project_detail/:projectId', function(req, res, next) {
  connect().connect(function(err) {
      if (err) res.send('0');
        var sql = "SELECT * FROM project WHERE project_id = '"+req.params.projectId+"'";
        connect().query(sql,function(err,result){
          if (err) res.send('1');
          res.render('tutor/project_detail',{filePath:result[0].out_line_link, projectName:result[0].project_name});
        })
      });


});
function projectTemp(projectId,projectName,level,superName,description){

        var projectTemp = "";
        projectTemp = '<div class="panel-body">\
                          <div class="panel-body-t link">\
                           <a href="project_detail/'+projectId+'">'+projectName+'</a>\
                          </div>\
                          <div class="panel-body-t-score"><br>\
                            <p>Difficulty level: '+level+'</p>\
                            Supervisor: '+superName+'\
                          </div>\
                          <div class="panel-body-b">\
                            '+description+'\
                          </div>\
                        </div>';
        return projectTemp;
    }








module.exports = router;
