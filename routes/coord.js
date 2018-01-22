var express = require('express');
var router = express.Router();
var connect = require('./conn');

const upload = require('multer')({ dest: 'projectUploads/' });
const path = require('path');
const fs = require('fs');

// start home page 
router.get('/', function(req, res, next) {
	  res.render('coord/index');  
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

router.get('/getCalandar/:userId', function(req, res, next) {
  if (req.xhr){
    connect().connect(function(err) {
    if (err) res.send('0');
    var sql = "SELECT * FROM announcements ORDER BY Id ASC";
    connect().query(sql,function(err,result){
      if (err) res.send('1');
        var temp={};
        var key = "events";
        temp[key]=[];
        for (var i = result.length - 1; i >= 0; i--) {
          var data = {
          Date:result[i].date,
          Title:result[i].title,
          Link:result[i].Id
        };
        temp[key].push(data);
      }

      res.json(temp);
      })
   });
  } else {
   res.send("Page not avalible");
  }
});

router.get('/getCalandar/:userId/:Id', function(req, res, next) {
  if (req.xhr){
    connect().connect(function(err) {
    if (err) res.send('0');
      var sql = "SELECT * FROM announcements WHERE Id = '"+req.params.Id+"'";
      connect().query(sql,function(err,result){
        if (err) res.send('1');
        var temp ="";
        temp = calandarTemp(JSON.stringify(result[0].date),result[0].content,result[0].userId)
        res.send(temp);
      })
    });
  } else {
   res.send("Page not avalible");
  }
  
  
});



router.get('/createAnnouncement/:userId/:title/:content/:time', function(req, res, next) {
  if (req.xhr){
    connect().connect(function(err) {
    if (err) res.send("0");
      var sql = "INSERT INTO announcements (userId,title,content,date) VALUES ('"+req.params.userId+"','"+req.params.title+"','"+req.params.content+"','"+req.params.time+"'  )";
      connect().query(sql,function(err,result){
        if (err) res.send("1");
         res.send("2");
      })
    });
  } else {
   res.send("Page not avalible");
  }
	
  
});



/// Ends home page


router.get('/groups', function(req, res, next) {
  res.render('coord/groups');
});
router.get('/groups_detail', function(req, res, next) {
  res.render('coord/groups_detail');
});



/////start project page
router.get('/project', function(req, res, next) {
  res.render('coord/project');
});

router.get('/project/getProjects/:userId', function(req, res, next) {
   if (req.xhr){
      connect().connect(function(err) {
      if (err) res.send('0');
        var sql = "SELECT * FROM project";
        connect().query(sql,function(err,results){
          if (err) res.send('1');
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




////Ends project page


/// Starts project detailPage 
router.get('/project_detail/:projectId', function(req, res, next) {
  connect().connect(function(err) {
      if (err) res.send('0');
        var sql = "SELECT * FROM project WHERE project_id = '"+req.params.projectId+"'";
        connect().query(sql,function(err,result){
          if (err) res.send('1');
          res.render('coord/project_detail',{filePath:result[0].out_line_link, projectName:result[0].project_name});
        })
      });

 
});




router.get('/project_detail/projectUploads/:name', function(req, res){
  
    fs.readFile(__dirname + "/../projectUploads/"+req.params.name+"", function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
});




///Ends project Detail
router.get('/meeting', function(req, res, next) {
  res.render('coord/meeting');
});
router.get('/profile', function(req, res, next) {
  res.render('coord/profile');
});



////start upload project page
router.get('/upload_project', function(req, res, next) {
  res.render('coord/upload_project');
});

router.post('/upload_project/uploadFile',upload.single('file'), function(req, res, next) {
    if (!req.file.originalname.match(/\.(pdf)$/)) {
        res.send("not pdf");
    }else{
      let oldPath = path.join(__dirname,'../', req.file.path);
      let newPath = path.join(__dirname, '../','projectUploads/' + req.file.originalname);
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          res.send('name error');
        } else {
          res.send(req.file.originalname);
        }
      });
    }
    
});



router.post('/upload_project/uploadProject', function(req, res, next) {
    var projectName = req.body.projectName;
    var level = req.body.level;
    var space = req.body.space;
    var superName = req.body.superName;
    var superEmail = req.body.superEmail;
    var description = req.body.description;
    var fileName = req.body.fileName;
    
    connect().connect(function(err) {
    if (err) res.send("0");
      var sql = "INSERT INTO project (project_name,simple_description,space_available,out_line_link,difficulty_level,super_name,supervisor_email)\
                 VALUES ('"+projectName+"','"+description+"','"+space+"','"+fileName+"','"+level+"','"+superName+"','"+superEmail+"')";
      connect().query(sql,function(err,result){
        if (err) res.send("1");
         res.send("2");
      })
    });

});



////end  upload project page
router.get('/assessments', function(req, res, next) {
  res.render('coord/assessments');
});





function announcementTemp(title,content,date){
        var announcementTemp = "";
        var time = date;
        announcementTemp = '<div class="panel-body">\
                                <div class="panel-body-t">\
                                      '+title+'\
                                </div>\
                                <div class="panel-body-b">\
                                      '+content+'\
                                </div>\
                                <div class="panel-body-f">\
                                      <span>Time: '+sqlToJsDate(time)+'<span>\
                                </div>\
                            </div>';
        return announcementTemp;
    }
function calandarTemp(date,content,userId){
        var calandarTemp = "";
        calandarTemp = '<div class="panel-body-t">\
                              '+sqlToJsDate(date)+'\
                            </div>\
                            <div class="panel-body-b" style="font-size: 15px; font-weight: lighter;">\
                              '+content+'\
                            </div>\
                            <div class="panel-body-f" style="font-size: 15px; font-weight: lighter;">\
                             <span class="link">@ '+userId+'</span>\
                            </div>';
        return calandarTemp;
    }

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


    function sqlToJsDate(sqlDate){
    //sqlDate in SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
      var sqlDateArr1 = sqlDate.split("-");
      //format of sqlDateArr1[] = ['yyyy','mm','dd hh:mm:ms']
      var sYear = sqlDateArr1[0].substr(1,4);
      var sMonth = (Number(sqlDateArr1[1])).toString();
      var sqlDateArr2 = sqlDateArr1[2].split("T");
      //format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']
      var sDay = (Number(sqlDateArr2[0]) + 1).toString();
      return sYear+"-"+sMonth+"-"+sDay;
    }






module.exports = router;