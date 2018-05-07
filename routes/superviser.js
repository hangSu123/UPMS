var express = require('express');
var router = express.Router();
var connect = require('./conn');
const fs = require('fs');


router.get('/', function(req, res, next) {
  res.render('superviser/index');
});

router.get('/project_detail/:projectId', function(req, res, next) {
  connect().connect(function(err) {
      if (err) res.send('0');
        var sql = "SELECT * FROM project WHERE project_id = '"+req.params.projectId+"'";
        connect().query(sql,function(err,result){
          if (err) res.send('1');
          res.render('superviser/project',{projectId:req.params.projectId,filePath:result[0].out_line_link, projectName:result[0].project_name});
        })
      });

router.get('/project_detail/projectUploads/:name', function(req, res){
  
        fs.readFile(__dirname + "/../projectUploads/"+req.params.name+"", function (err,data){
            res.contentType("application/pdf");
            res.send(data);
        });
    });

router.get('/project/project_link/:name', function(req, res){
  
      fs.readFile(__dirname + "/../ApplicationUploads/"+req.params.name+"", function (err,data){
          res.contentType("application/pdf");
          res.send(data);
      });
});
 
});
router.get('/project/getProjects/:userId', function(req, res, next) {
  if (req.xhr){
     connect().connect(function(err) {
     if (err) console.log(err);
       var sql = "SELECT * FROM `project`,`supervisor` WHERE project.supervisor_email = supervisor.email_address and supervisor.username = '"+req.params.userId+"'";
       console.log(sql)
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


router.get('/project/getProjects/getApplication/:projectId', function(req, res, next) {
  connect().connect(function(err) {
      if (err) res.send('0');
        var sql = "SELECT * FROM `application` WHERE project_id = '"+req.params.projectId+"'";
        connect().query(sql,function(err,results){
          if (err) res.send('1');
          var temp ="";
          if (results == "" || results == null || results == undefined){
            temp = "No Application yet"
          }else{
            for(var i = results.length - 1; i>= 0; i--){
              temp += applicationTemp(results[i].application_id,results[i].group_id,results[i].application_link,results[i].supervisor_preference,results[i].assigned)
            }
          }
          
          res.send(temp);
        })
      })
    });


router.get('/projects/setPreference/:applicationId/:mark', function(req, res, next) {
  connect().connect(function(err) {
      if (err) res.send('0');
        var sql = "UPDATE `application` SET supervisor_preference = '"+req.params.mark+"' WHERE application_id = "+req.params.applicationId+"";
        connect().query(sql,function(err,result){
          if (err) res.send('1');
          res.send('succ');
        })
      })
});

function projectTemp(projectId,projectName,level,superName,description){
        
  var projectTemp = "";
  projectTemp = '<div class="panel-body">\
                    <div class="panel-body-t link">\
                     <a href="/superviser/project_detail/'+projectId+'">'+projectName+'</a>\
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


function applicationTemp(applicationId,groupId,link,perference,assigned){
  var applicationTemp = "";
  applicationTemp = ' <tr>\
                        <th>'+groupId+'</th>\
                        <th class = "link"><a href="/superviser/project/project_link/'+link+'">'+link+'</th>\
                        <th><input id = "'+applicationId+'" type="number" class="marks" value="'+perference+'"></th>\
                        <th>'+assigned+'</th>\
                        <th> <button id = '+applicationId+' class="btn btn-blue" onclick="save(this)">SAVE</button></th>\
                     </tr>';
  return applicationTemp;
}

module.exports = router;