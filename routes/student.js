var express = require('express');
var router = express.Router();
var connect = require('./conn');
const applicationUploads = require('multer')({ dest: 'ApplicationUploads/' });
const selfreflectionUploads = require('multer')({ dest: 'selfreflectionUploads/' });
const path = require('path');
const fs = require('fs');

router.get('/', function(req, res, next) {
  res.render('student/index');
});


router.get('/group', function(req, res, next) {
  res.render('student/group');
});
router.get('/project', function(req, res, next) {
  res.render('student/project');
});
router.get('/manage_meeting_time', function(req, res, next) {
  res.render('student/manage_meeting_time');
});
router.get('/manage_presentation_time', function(req, res, next) {
  res.render('student/presentation');
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




router.get('/getAssignment/:userId', function(req, res, next) {
  connect().connect(function(err) {
    if (err) res.send("0");
    var sql = "SELECT * FROM `assignment` ORDER BY assignment_id ASC ";
    connect().query(sql,function(err,results){
      if (err) console.log(err);
      var temp ="";
      for (var i = results.length - 1; i >= 0; i--) {
        temp += assignmentTemp(results[i].assignment_id,results[i].assignment_name,results[i].assignment_weight,JSON.stringify(results[i].submission_date),results[i].CRA_link);
      }
      res.send(temp);
    })
  });

});
router.get('/project_detail/:projectId', function(req, res, next) {
  connect().connect(function(err) {
    if (err) res.send('0');
    var sql = "SELECT * FROM project WHERE project_id = '"+req.params.projectId+"'";
    connect().query(sql,function(err,result){
      if (err) res.send('1');
      res.render('student/project_detail',{filePath:result[0].out_line_link, projectName:result[0].project_name, projectId:req.params.projectId});
    })
  });


});

router.get('/project_detail/projectUploads/:name', function(req, res){

  fs.readFile(__dirname + "/../projectUploads/"+req.params.name+"", function (err,data){
    res.contentType("application/pdf");
    res.send(data);
  });
});


router.post('/upload_project/uploadFile',applicationUploads.single('file'), function(req, res, next) {
  if (!req.file.originalname.match(/\.(pdf)$/)) {
    res.send("not pdf");
  }else{
    let oldPath = path.join(__dirname,'../', req.file.path);
    let newPath = path.join(__dirname, '../','ApplicationUploads/' + req.file.originalname);
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        res.send('name error');
      } else {
        res.send(req.file.originalname);
      }
    });
  }

});

router.post('/upload_project/uploadApplication', function(req, res, next) {
  var fileName = req.body.fileName;
  var student = req.body.student;
  var projectId = req.body.projectName;

  connect().connect(function(err) {
    if (err) console.log(err);
    var sql = "INSERT INTO `application` (application_link, project_id, group_id)\
    VALUES ('"+fileName+"','"+projectId+"',(SELECT group_id from `student` WHERE username = '"+student+"'))";
    connect().query(sql,function(err,result){
      if (err) console.log(err);
      res.send("2");
    })
  });

});





router.get('/group/getGroup/:user', function(req, res, next) {
  if (req.xhr){
    connect().connect(function(err){
      if (err) res.Status(500).console.log(error);
      var sql = "SELECT * FROM `group` ORDER BY group_id ASC";
      connect().query(sql,function(err, result){
        if (err) console.log(err)
        var temp = "";
        for (var i = result.length - 1; i >= 0; i--) {
          console.log(result[i].group_id);
          temp += groupTemp(result[i].group_id, result[i].available_place, result[i].tutor_email);

        }
        res.send(temp);


      })
    })
  } else {
    res.send('\
    <!DOCTYPE html>\
    <html>\
    <body>\
    <p style="color:red"><b>Page is not available</b></p>\
    </body>\
    </html>');
  }

})


router.post('/upload_Assignment/uploadFile',applicationUploads.single('file'), function(req, res, next) {
  if (!req.file.originalname.match(/\.(pdf)$/)) {
    res.send("not pdf");
  }else{
    let oldPath = path.join(__dirname,'../', req.file.path);
    let newPath = path.join(__dirname, '../','assignmentUploads/' + req.file.originalname);
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        res.send('name error');
      } else {
        res.send(req.file.originalname);
      }
    });
  }

});


router.post('/upload_Assignment/uploadAssignmentFile', function(req, res, next) {

  var student = req.body.student;
  var fileName = req.body.fileName;
  /*var projectId = req.body.projectName;*/

  connect().connect(function(err) {
    if (err) console.log(err);
    var sql = "INSERT INTO `result` (student_id, submission_link)\
    VALUES ('"+student+"','"+fileName+"')";
    connect().query(sql,function(err,result){
      if (err) console.log(err);
      res.send("2");
    })
  });

});


/*router.get('/group/group_detail/:id', function(req,res,next){
connect().connect(function(err) {
if (err) console.log(err);
var sql = "SELECT * FROM `student` WHERE group_id= '"+req.params.id+"'";
//  var sql2 = "SELECT * FROM student WHERE group_id= '"+req.params.id+"'";

connect().query(sql,function(err,results){
if (err) console.log(err);
//res.render('student/group_detail',{id:req.params.id});

var temp = "";
for (var i = results.length - 1; i >= 0; i--) {
console.log(results[i].group_id);
temp += memberTemp(results[i].email_address, results[i].first_name, results[i].last_name,results[i].major, results[i].gpa);

}
res.send(temp);
})


});
})*/

router.get('/group/group_detail/:id',function(req,res,next){
  res.render('student/group_detail',{id:req.params.id});
})



router.get('/group/getDetail/:id/:userId',function(req,res,next){
  connect().connect(function(err) {
    if (err) res.send('0');
    var sql = "SELECT * FROM student WHERE group_id= '"+req.params.id+"'";
    connect().query(sql,function(err,results){
      if (err) res.send('1');
      var temp ="";
      for (var i = results.length - 1; i >= 0; i--) {
        temp += memberTemp(results[i].email_address,results[i].first_name,results[i].last_name,results[i].major,results[i].GPA)}
        res.send(temp);
      })
    });
  })


  router.get('/self_reflection/getGroupMember/:userId',function(req,res,next){
    connect().connect(function(err) {
      if (err) res.send('0');
      var sql = "SELECT first_name, last_name FROM student WHERE username <> '"+req.params.userId+"' AND group_id = (SELECT group_id FROM student WHERE username = '"+req.params.userId+"') LIMIT 4";
    /*  var sql = "SELECT * FROM student WHERE group_id= '"+req.params.id+"'";*/
      connect().query(sql,function(err,results){
        if (err) res.send('1');
        var temp ="";
        console.log(results);
        console.log(results.length);
        for (var i = results.length - 1; i >= 0; i--) {
        /*  temp += memberTemp(results[i].email_address,results[i].first_name,results[i].last_name,results[i].major,results[i].GPA)*/
          temp += commentTeamMemberTemp(results[i].first_name, results[i].last_name);
          console.log(results[i].first_name);
        }

          res.send(temp);
        })
      });
    })


    router.post('/upload_selfreflection/uploadFile',selfreflectionUploads.single('file'), function(req, res, next) {
      if (!req.file.originalname.match(/\.(pdf)$/)) {
        res.send("not pdf");
      }else{
        let oldPath = path.join(__dirname,'../', req.file.path);
        let newPath = path.join(__dirname, '../','selfreflectionUploads/' + req.file.originalname);
        fs.rename(oldPath, newPath, (err) => {
          if (err) {
            res.send('name error');
          } else {
            res.send(req.file.originalname);
          }
        });
      }

    });


    router.post('/upload_selfreflection/uploadSelfreflection', function(req, res, next) {

      var student = req.body.student;
      var fileName = req.body.fileName;
      /*var projectId = req.body.projectName;*/

      connect().connect(function(err) {
        if (err) console.log(err);
        var sql = "INSERT INTO `result` (username,submission_date, submission_link)\
        VALUES ('"+student+"',CURRENT_TIMESTAMP,'"+fileName+"')";
        connect().query(sql,function(err,result){
          console.log(result);
          if (err) console.log(err);
          res.send("2");
        })
      });

    });

    router.get('/group/getAppliedProjects/:id/:userId',function(req,res,next){
      connect().connect(function(err) {
        if (err) res.send('0');
        var sql = "SELECT project_name FROM project WHERE project_id IN (SELECT project_id FROM application WHERE group_id = '"+req.params.id+"')";
      /*  var sql = "SELECT first_name, last_name FROM student WHERE username <> '"+req.params.userId+"' AND group_id = (SELECT group_id FROM student WHERE username = '"+req.params.userId+"') LIMIT 4";*/
      /*  var sql = "SELECT * FROM student WHERE group_id= '"+req.params.id+"'";*/
        connect().query(sql,function(err,results){
          if (err) res.send('1');
          var temp ="";
          console.log(results);
          console.log(results.length);
          for (var i = results.length - 1; i >= 0; i--) {
          /*  temp += memberTemp(results[i].email_address,results[i].first_name,results[i].last_name,results[i].major,results[i].GPA)*/
            temp += getAppliedProjects(results[i].project_name);
            console.log(results[i].project_name);
          }

            res.send(temp);
          })
        });
      })

  var noRowReturn = '<!DOCTYPE html>'+
  '<html>'+
  '<head>'+
  '<meta name="viewport" content="width=device-width, initial-scale=1">'+
  '<style>'+
  '.alert {'+
  '    padding: 20px;'+
  '    background-color: #f44336;'+
  '    color: white;'+
  '}'+
  ''+
  '.closebtn {'+
  '    margin-left: 15px;'+
  '    color: white;'+
  '    font-weight: bold;'+
  '    float: right;'+
  '    font-size: 22px;'+
  '    line-height: 20px;'+
  '    cursor: pointer;'+
  '    transition: 0.3s;'+
  '}'+
  ''+
  '.closebtn:hover {'+
  '    color: black;'+
  '}'+
  '</style>'+
  '</head>'+
  '<body>'+
  '<div class="alert">'+
  '  <span class="closebtn" onclick="this.parentElement.style.display=\'none\';">×</span> '+
  '  <strong>Danger!</strong> Indicates a dangerous or potentially negative action.'+
  '</div>'+
  ''+
  '</body>'+
  '</html>';



  router.get('/group/getDetail/addStudentTogroup/:groupId/:userId',function(req,res,next){
    connect().connect(function(err) {
      var places = req.params.places - 1;
      var sql = "UPDATE student SET group_id = '"+req.params.groupId+"' WHERE student.username = '"+req.params.userId+"' and student.group_id IS NULL";
      /*  var sql1 = "UPDATE student SET group_id = '"+req.params.groupId+"' WHERE username = '"+req.params.userId+"'";*/
      connect().query(sql,function(err,results){
        numRows = results.length;
        if (err) {
          console.log(err)
        }
        console.log(numRows);
        res.send('succ');

    })
  });
})


router.get('/meeting/getTimeSlots/:userId',function(req, res, next){
  if (req.xhr){
    var userId = req.params.userId;
    connect().connect(function(err){
      if (err) console.log(err);
        var sql = "SELECT * FROM `meeting` WHERE type = 'tutor' order by time DESC";
        connect().query(sql,function(err,result){
          if (err) console.log(err);
            var temp = "";
            var temps = "<tr>"
            var tempM="<th>";
            var tempT="</th><th>";
            var tempW="</th><th>";
            var tempTh="</th><th>";
            var tempF="</th><th>";
            var tempe= "</th></tr>";
            for (var i = result.length - 1; i >= 0; i--) {
              if (result[i].day == "Monday"){
                 tempM += timeSlotTemp(result[i].meeting_id,result[i].tutor_id,result[i].time,result[i].duration,result[i].space_ava)
              }if (result[i].day == "Tuesday"){
                tempT += timeSlotTemp(result[i].meeting_id,result[i].tutor_id,result[i].time,result[i].duration,result[i].space_ava)
              }if (result[i].day == "Wednesday"){
                tempW += timeSlotTemp(result[i].meeting_id,result[i].tutor_id,result[i].time,result[i].duration,result[i].space_ava)
              }if (result[i].day == "Thursday"){
                tempTh += timeSlotTemp(result[i].meeting_id,result[i].tutor_id,result[i].time,result[i].duration,result[i].space_ava)
              }if (result[i].day == "Friday"){
                tempF += timeSlotTemp(result[i].meeting_id,result[i].tutor_id,result[i].time,result[i].duration,result[i].space_ava)
              }
            }
            temp = temps+tempM+tempT+tempW+tempTh+tempF+tempe;
            res.send(temp);
          })

      })
  }else{
    res.send('page not avalible')
  }
})



router.get('/presentation/getTimeSlots/:userId',function(req, res, next){
  if (req.xhr){
    var userId = req.params.userId;
    connect().connect(function(err){
      if (err) console.log(err);
        var sql = "SELECT * FROM `meeting` WHERE type = 'demo' order by Date ASC";
        connect().query(sql,function(err,result){
          if (err) res.send('1');
            var temp={};
            var key = "events";
            temp[key]=[];
            for (var i = result.length - 1; i >= 0; i--) {
              var newDate = sqlToJsDate(JSON.stringify(result[i].date));
              var data = {
              Date:result[i].date,
              Title:newDate,
              Link:newDate
            };
            temp[key].push(data);
          }
    
          res.json(temp);
          })
      })
  }else{
    res.send('page not avalible')
  }
})


router.get('/presentation/getCalandar/:userId/:Id', function(req, res, next) {
  if (req.xhr){
    connect().connect(function(err) {
    if (err) console.log(err);
      var sql = "SELECT * FROM `meeting` WHERE date = '"+req.params.Id+"'";
      connect().query(sql,function(err,results){
        if (err) console.log(err);
        var temp ="";
        for (var i = results.length - 1; i >= 0; i--) {
          temp += presentationTimeTemp(JSON.stringify(results[i].meeting_id),results[i].time, parseInt(i+1));
        }
        res.send(temp);
      })
    });
  } else {
   res.send("Page not avalible");
  }
});





router.get('/presentation/getTimeSlots/addMeeting/:userId/:demo_meeting_id', function(req, res, next) {
  if (req.xhr){
    connect().connect(function(err) {
    if (err) console.log(err);
    var sql = "SELECT group_id FROM `student` WHERE username = '"+req.params.userId+"'";
    connect().query(sql,function(err,result){
      if (err) console.log(err);
      if (result == "" || result == null || result == undefined){
        res.send("noGroup")
      }else{
        var sql = "SELECT * FROM `group` WHERE group_id = (SELECT group_id FROM `student` WHERE username = '"+req.params.userId+"')";
        console.log(sql)
        connect().query(sql,function(err,result){
          if (err) console.log(err);
          if (result[0].demo_meeting_id == "" || result[0].demo_meeting_id == null || result[0].demo_meeting_id == undefined){
            var sql = "UPDATE `group` SET demo_meeting_id = '"+req.params.demo_meeting_id+"' WHERE group_id = (SELECT group_id FROM `student` WHERE username = '"+req.params.userId+"')";
            connect().query(sql,function(err,result){
              if (err) console.log(err);
              res.send("succ");
            })
          }else{
            res.send("already");
          }
        })
      }
    })
    });
  } else {
   res.send("Page not avalible");
  }
});




router.get('/tutorMeeting/getTimeSlots/addMeeting/:userId/:meeting_id', function(req, res, next) {
  if (req.xhr){
    connect().connect(function(err) {
    if (err) console.log(err);
    var sql = "SELECT group_id FROM `student` WHERE username = '"+req.params.userId+"'";
    connect().query(sql,function(err,result){
      if (err) console.log(err);
      if (result == "" || result == null || result == undefined){
        res.send("noGroup")
      }else{
        var sql = "SELECT * FROM `group` WHERE group_id = (SELECT group_id FROM `student` WHERE username = '"+req.params.userId+"')";
        console.log(sql)
        connect().query(sql,function(err,result){
          if (err) console.log(err);
          if (result[0].meeting_id == "" || result[0].meeting_id == null || result[0].meeting_id == undefined){
            var sql = "UPDATE `group` SET meeting_id = '"+req.params.meeting_id+"' WHERE group_id = (SELECT group_id FROM `student` WHERE username = '"+req.params.userId+"')";
            connect().query(sql,function(err,result){
              if (err) console.log(err);
              res.send("succ");
            })
          }else{
            res.send("already");
          }
        })
      }
    })
    });
  } else {
   res.send("Page not avalible");
  }
});



router.get('/presentation/getTimeSlots/getMyTime/:userId', function(req, res, next) {
  if (req.xhr){
    connect().connect(function(err) {
    if (err) console.log(err);
      var sql = "SELECT * FROM `group`,`meeting` WHERE group.demo_meeting_id = meeting.meeting_id and group_id = (SELECT group_id FROM `student` WHERE username = '"+req.params.userId+"')";
      connect().query(sql,function(err,result){
        if (err) console.log(err);
        var temp = "";
        if (result == "" || result == null || result == undefined){
          temp = "Please register a time"
        }else{
           temp ='<div class="input_row">\
                      <label>Date:</label>\
                      <input type="text" value = "'+sqlToJsDate(JSON.stringify(result[0].date))+'" disabled>\
                  </div>\
                  <div class="input_row">\
                      <label>Time:</label>\
                      <input type="text" value = "'+result[0].time+'" disabled>\
                  </div>\
                  <div class="input_row">\
                      <label>Room:</label>\
                      <input type="text"  value = "'+result[0].room_num+'" disabled>\
                  </div>';
        }
        res.send(temp);
      })
    });
  } else {
   res.send("Page not avalible");
  }
});




router.get('/tutorMeeting/getTimeSlots/getMyTime/:userId', function(req, res, next) {
  if (req.xhr){
    connect().connect(function(err) {
    if (err) console.log(err);
      var sql = "SELECT * FROM `group`,`meeting` WHERE group.meeting_id = meeting.meeting_id and group_id = (SELECT group_id FROM `student` WHERE username = '"+req.params.userId+"')";
      connect().query(sql,function(err,result){
        if (err) console.log(err);
        var temp = "";
        if (result == "" || result == null || result == undefined){
          temp = "Please register a time"
        }else{
           temp ='<div class="input_row">\
                      <label>Day:</label>\
                      <input type="text" value = "'+result[0].day+'" disabled>\
                  </div>\
                  <div class="input_row">\
                      <label>Time:</label>\
                      <input type="text" value = "'+result[0].time+'" disabled>\
                  </div>\
                  <div class="input_row">\
                      <label>Duration:</label>\
                      <input type="text"  value = "'+result[0].duration+'" disabled>\
                  </div>';
        }
        res.send(temp);
      })
    });
  } else {
   res.send("Page not avalible");
  }
});


function presentationTimeTemp(meetingId,time,section){
  var presentationTimeTemp = '<div style="display:block; clear:both"><div class="panel-body-t">\
                                section: '+section+'\
                              </div>\
                              <div class="panel-body-b" style="font-size: 15px; font-weight: lighter;">\
                                <button class = "btn" onClick="addMeeting(this)" id ="'+meetingId+'" >Register</button>\
                                <div id = "allGroups'+meetingId+'"></div>\
                              </div>\
                              <div class="panel-body-f" style="font-size: 15px; font-weight: lighter;">\
                              <span class="link">@ '+time+'</span>\
                              </div>\
                              </div>';
  

  return presentationTimeTemp;
}


function groupTemp(id,available_place,tutor){

  var groupTemp = "";
  groupTemp = '<tr>\
  <td><a href="/student/group/group_detail/'+id+'">'+id+'</a></td>\
  <td>'+available_place+'</td>\
  <td>'+tutor+'</td><br />\
  </tr>';
  return groupTemp;
}




function memberTemp(email,fname,lname,major,gpa){

  var memberTemp = "";
  memberTemp = '<tr>\
  <th>'+email+'</th>\
  <th>'+fname+'</th>\
  <th>'+lname+'</th>\
  <th>'+major+'</th>\
  <th>'+gpa+'</th>\
  </tr>';
  return memberTemp;
}

function commentTeamMemberTemp(first_name, last_name){
  var commentTeamMemberTemp = "";

  commentTeamMemberTemp =
  '<div class="panel-body">\
  <div class="panel-body-t">\
  '+first_name+' &nbsp' +last_name+'\
  </div>\
  <div class="panel-body-b" style="text-align: center;">\
  Grade:\
    <textarea name="" id="" cols="65" rows="2" placeholder = "please enter the number between 1  and 7"required></textarea>\
    Comment:\
    <textarea name="" id="" cols="65" rows="5" placeholder = "please enter at least 150 words"equired></textarea>\
  </div>\
</div>\
  ';
  return commentTeamMemberTemp;
}

function getAppliedProjects(projectname){
  var getAppliedProjects = "";
  getAppliedProjects =
  '<table width="80%" align="center" style=" margin-top: 20px;">\
  <tr>\
  <th>Projet Name:</th>\
  <th>Set Preference:</th>\
</tr>\
<tr>\
   <th>'+projectname+'</th>\
   <th><input type="number"  class="marks" value="1"></th>\
</tr>\
</table>\
';
  return getAppliedProjects;
}

function timeSlotTemp(id,tutor,time,duration,status){
  var classes = "registed";
  if (status > 0){
    status = status + ' groups left';
    classes = "free";
  }else if(status == 0){
    status = "Registed"
  }
  var timeSlotTemp= "";
  timeSlotTemp = '<div onclick = "registerTime(this)" id = "'+id+'" class ="link ' + classes +'">\
                    <span>Tutor: '+tutor+'</span>\
                    <span>Time:'+time+'</span>\
                    <span>'+status+'</span>\
                  </div>'
  return timeSlotTemp;

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
  <button>apply</button>\
  </div>';
  return projectTemp;
}


function assignmentTemp(id,name,weight,date,cra){
  var assignmentTemp = "";
  assignmentTemp = '<div class="panel-body">\
  <div class="panel-body-t link">\
  '+name+'\
  <input type = "file" style="width: 58%;border-radius: 4px;padding: 5px;border: 1px solid #114a81">\
  <button style="background-color: #4a86e8; border: 1px solid #4a86e8;border-radius: 8px; margin-top: 10px; color: #fff; cursor: pointer; width:100px; height:50px;">upload</button>\
  </div>\
  <div class="panel-body-t-score"><br>\
  <p>Due Date: <span style ="color:#114a81;" >'+sqlToJsDate(date)+'</span></p>\
  <p>Weight: <span style ="color:#114a81;" >'+weight+'</span></p>\
  CRA & Description:\
  </div>\
  <div class="panel-body-b">\
  <div class = "link"><li><a href="/coord/CRA/'+cra+'">'+cra+'</a></li></div>\
  </div>\
  </div>';
  return assignmentTemp;
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
